import type { Demo, Domain, KbEntry, Section, Wire } from './types';
import { buildDomains } from './adapter';

// 按目录自动发现内容（约定见 src/adapter/content.ts）：文件放进去就会出现，不用在任何地方登记。
// import.meta.glob 的参数必须写成字面量，Vite 在构建时静态分析
// 键统一成相对 domains/ 的路径、去掉后缀，如 'frontend/interactions/tap-target/i-tap-vs-swipe'
const rel = <T>(files: Record<string, T>) =>
  Object.fromEntries(
    Object.entries(files).map(([p, v]) => [
      p.replace(/^\.\.\/domains\//, '').replace(/\/_(domain|section|category)\.md$|\.(md|html|wire\.ts)$/, ''),
      v,
    ]),
  );
const { domains: built } = buildDomains({
  domains: rel(import.meta.glob<string>('../domains/*/_domain.md', { query: '?raw', import: 'default', eager: true })),
  sections: rel(
    import.meta.glob<string>('../domains/*/*/_section.md', { query: '?raw', import: 'default', eager: true }),
  ),
  categories: rel(
    import.meta.glob<string>('../domains/*/*/*/_category.md', { query: '?raw', import: 'default', eager: true }),
  ),
  entries: rel(
    import.meta.glob<string>(['../domains/*/*/*/*.md', '!../domains/*/*/*/_*.md'], {
      query: '?raw',
      import: 'default',
      eager: true,
    }),
  ),
  // 示例 HTML 由 vite.config.ts 里的 kb-demo 插件拆成 { html, css, js }
  demos: rel(import.meta.glob<Demo>('../domains/*/*/*/*.html', { query: '?demo', import: 'default', eager: true })),
  wires: rel(import.meta.glob<{ wire?: Wire; wireMobile?: Wire }>('../domains/*/*/*/*.wire.ts', { eager: true })),
});

export const REPO_URL = 'https://github.com/fc221/my-prompts';

export const domains: Domain[] = built.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export const entries: KbEntry[] = domains.flatMap((d) =>
  d.entries.filter((e) => d.sections.some((s) => s.key === e.sec)).map((e) => ({ ...e, domain: d.key })),
);

export const byId = new Map(entries.map((e) => [e.id, e]));
/** 按中文名查条目：正文里的「名称」靠它变成链接；同名的几条都留着，调用方先挑同领域、同板块的 */
export const byZh = new Map<string, KbEntry[]>();
for (const e of entries) byZh.set(e.zh, [...(byZh.get(e.zh) ?? []), e]);

export const domainOf = (key: string): Domain => domains.find((d) => d.key === key) ?? domains[0];

export const sectionOf = (e: KbEntry): Section => domainOf(e.domain).sections.find((s) => s.key === e.sec)!;

/** 搜索：名称、英文名、一句话、适合、分类、要点里任意命中 */
export const matches = (e: KbEntry, q: string): boolean => {
  if (!q) return true;
  const hay = [e.zh, e.aka, e.en, e.look, e.use, e.cat, ...(e.rules ?? [])].join(' ').toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((w) => hay.includes(w));
};

/** 组合提示词：按领域、板块顺序排列，末尾附上涉及领域的通用要求 */
// 单条复制：提示词 + 领域的通用要求（对比度、溢出这类底线单条里不会写，测试里不带它的生成结果容易出低级错误）
export const fullPrompt = (e: KbEntry) => {
  const t = domainOf(e.domain).tail;
  return t ? `${e.prompt}\n\n通用要求（上面写了不同的具体做法时，以上面为准）：${t}` : e.prompt;
};

// 组合提示词：先一句“我要做什么”（goal，没填就留占位），说明各项属于同一个产品、要合成一个整体，并列出本次涉及的全部占位方便一次填完；
// 各项按板块顺序排；通用要求放最后，并写明某一项另有具体做法时以那一项为准（例如圆形扩散要用 clip-path）
export function combinePrompts(ids: string[], goal = ''): string {
  const rank = (e: KbEntry) =>
    domains.findIndex((d) => d.key === e.domain) * 100 + domainOf(e.domain).sections.findIndex((s) => s.key === e.sec);
  const items = ids
    .map((id) => byId.get(id))
    .filter((e): e is KbEntry => !!e)
    .sort((a, b) => rank(a) - rank(b));
  const tails = [...new Set(items.map((e) => domainOf(e.domain).tail).filter(Boolean))];
  const holes = [...new Set(items.flatMap((e) => [...e.prompt.matchAll(/\{[^}]+\}/g)].map((m) => m[0])))];
  const fe = items.some((e) => e.domain === 'frontend'); // 有前端条目时按页面说，否则按功能说
  return (
    `我要做的是：${goal.trim() || (fe ? '{一句话说明产品和页面}' : '{一句话说明产品和要做的功能}')}\n` +
    `下面几项都是这同一个产品里的要求，请合成一个整体（${fe ? '同一套配色、组件、间距和文案口径' : '同一套命名、分层和约定'}），不要做成互不相干的几块。花括号是待填的占位：已填的照做，没填的按上面这句说明合理决定，并在回复开头列出你做的假设。` +
    (items.some((e) => e.sec === 'styles')
      ? '几项给出的同类数值（颜色、圆角、阴影、字号）不一致时，以「风格」那一项为准。'
      : '') +
    (holes.length ? `\n本次涉及的占位：${holes.join('、')}` : '') +
    '\n\n' +
    items.map((e, i) => `${i + 1}.【${sectionOf(e).name} · ${e.zh}】${e.prompt}`).join('\n\n') +
    (tails.length ? '\n\n通用要求（某一项写了不同的具体做法时，以那一项为准）：' + tails.join('\n') : '')
  );
}
