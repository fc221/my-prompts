// 内容解析：把 domains/ 下的 Markdown 条目、示例 HTML、目录元信息组装成网页用的 Domain。
// 网页加载器（src/kb.ts，Vite）和校验脚本（scripts/validate.mjs，Node）共用这一份，所以只用可以直接擦除的 TS 写法。
//
//   domains/<领域>/_domain.md                    头部 name / icon / order / searchHint；正文“## 说明”“## 通用要求”
//   domains/<领域>/<板块>/_section.md            头部 name / icon / color / order；正文是板块介绍
//   domains/<领域>/<板块>/<分类>/_category.md    头部 name / order
//   domains/<领域>/<板块>/<分类>/<id>.md         条目文字：头部 zh / en / aka（别名，搜索用）/ order；正文按 ## 是什么 / 适合 / 不适合 / 注意 / 要点 / 提示词 分段
//   domains/<领域>/<板块>/<分类>/<id>.html       实时示例（可选）：<link> 共用样式、<style>、结构、<script type="module">
//   domains/<领域>/<板块>/<分类>/<id>.wire.ts    布局示意图（可选）：export const wire / wireMobile
//
// 放进去就会出现在网页上，不用登记；顺序按 order（没写的排在后面，再按名称）。
import type { Demo, Domain, Entry, Section, Wire } from '../types.ts';

export type Meta = Record<string, string>;

/** 拆出 --- 包起来的头部（每行 key: value，值可以加引号）和正文 */
export function splitFrontmatter(text: string): { meta: Meta; body: string } {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/);
  const meta: Meta = {};
  if (!m) return { meta, body: text };
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i < 0) continue;
    let v = line.slice(i + 1).trim();
    if (/^".*"$/.test(v)) v = JSON.parse(v);
    else if (/^'.*'$/.test(v)) v = v.slice(1, -1).replace(/''/g, "'");
    meta[line.slice(0, i).trim()] = v;
  }
  return { meta, body: text.slice(m[0].length) };
}

/** 正文按“## 标题”切段；第一个标题之前的文字放在 '' 下 */
export function splitSections(body: string): Map<string, string> {
  const out = new Map<string, string>();
  let name = '',
    buf: string[] = [];
  const flush = () => {
    const t = buf.join('\n').trim();
    if (t || name) out.set(name, t);
  };
  for (const line of body.split(/\r?\n/)) {
    const h = line.match(/^##\s+(.+?)\s*$/);
    if (h) {
      flush();
      name = h[1];
      buf = [];
    } else buf.push(line);
  }
  flush();
  return out;
}

/** 条目正文的段落名 → 字段 */
export const ENTRY_SECTIONS: Record<string, 'look' | 'use' | 'avoid' | 'care' | 'rules' | 'prompt'> = {
  是什么: 'look',
  适合: 'use',
  不适合: 'avoid',
  注意: 'care',
  要点: 'rules',
  提示词: 'prompt',
};

/** 解析一条的 Markdown。提示词里写 {{要点}} 会展开成编号的要点清单（自查清单用它保证清单和提示词一致） */
export function parseEntry(
  id: string,
  text: string,
  problems: string[] = [],
): { entry: Omit<Entry, 'sec' | 'cat'>; order: number } {
  const { meta, body } = splitFrontmatter(text);
  const entry: Record<string, unknown> = { id, zh: meta.zh ?? '' };
  if (meta.en) entry.en = meta.en;
  if (meta.aka) entry.aka = meta.aka;
  for (const [title, value] of splitSections(body)) {
    const field = ENTRY_SECTIONS[title];
    if (!title) {
      if (value) problems.push(`${id}：第一个“## 标题”之前不要写正文`);
      continue;
    }
    if (!field) {
      problems.push(`${id}：不认识的段落“## ${title}”，可用的有 ${Object.keys(ENTRY_SECTIONS).join(' / ')}`);
      continue;
    }
    if (field === 'rules') {
      const lines = value.split(/\r?\n/).filter((l) => l.trim());
      if (lines.some((l) => !l.startsWith('- '))) problems.push(`${id}：“## 要点”里每条用“- ”开头，一条一行`);
      entry.rules = lines.map((l) => l.replace(/^- /, ''));
    } else entry[field] = value;
  }
  if (typeof entry.prompt === 'string' && entry.prompt.includes('{{要点}}')) {
    entry.prompt = entry.prompt.replace(
      '{{要点}}',
      ((entry.rules as string[]) ?? []).map((r, i) => `${i + 1}. ${r}`).join('\n'),
    );
  }
  for (const k of Object.keys(meta))
    if (!['zh', 'en', 'aka', 'order'].includes(k))
      problems.push(`${id}：头部不认识的字段 ${k}（可用 zh / en / aka / order）`);
  return { entry: entry as Omit<Entry, 'sec' | 'cat'>, order: toOrder(meta.order) };
}

/** 拆示例 HTML：<link rel="stylesheet"> 读进来放在最前，<style> 合成 css，<script type="module"> 是示例脚本，其余是示例结构 */
export function parseDemoHtml(
  text: string,
  readLink: (href: string) => string,
): { html: string; css: string; script: string } {
  let css = '',
    script = '';
  let rest = text.replace(/<link\s+rel="stylesheet"\s+href="([^"]+)"\s*\/?>[ \t]*\r?\n?/g, (_, href: string) => {
    css += readLink(href).trim();
    return '';
  });
  rest = rest.replace(/<style>([\s\S]*?)<\/style>[ \t]*\r?\n?/g, (_, s: string) => {
    css += s.trim();
    return '';
  });
  rest = rest.replace(/<script type="module">([\s\S]*?)<\/script>[ \t]*\r?\n?/g, (_, s: string) => {
    script += s;
    return '';
  });
  return { html: rest.trim(), css, script: script.trim() };
}

const toOrder = (v?: string) => (v && Number.isFinite(+v) ? +v : Infinity);
const byOrder = <T extends { order: number; key: string }>(a: T, b: T) =>
  a.order - b.order || a.key.localeCompare(b.key);

/** 内容来源：键是相对 domains/ 的路径（不带文件名后缀），如 'frontend'、'frontend/interactions/tap-target/i-tap-vs-swipe' */
export interface ContentSource {
  domains: Record<string, string>;
  sections: Record<string, string>;
  categories: Record<string, string>;
  entries: Record<string, string>;
  demos: Record<string, Demo>;
  wires: Record<string, { wire?: Wire; wireMobile?: Wire }>;
}

/** 组装：领域 → 板块 → 分类 → 条目，按 order 排序；结构问题收进 problems（网页忽略，校验脚本报错） */
export function buildDomains(src: ContentSource): { domains: Domain[]; problems: string[] } {
  const problems: string[] = [];
  const depth = (k: string) => k.split('/').length;
  const under = (rec: Record<string, unknown>, parent: string) =>
    Object.keys(rec).filter((k) => k.startsWith(parent + '/') && depth(k) === depth(parent) + 1);
  const domains = Object.keys(src.domains).map((dk) => {
    const { meta, body } = splitFrontmatter(src.domains[dk]);
    const parts = splitSections(body);
    const sections = under(src.sections, dk)
      .map((sk) => {
        const s = splitFrontmatter(src.sections[sk]);
        const section: Section = {
          key: sk.split('/').pop()!,
          name: s.meta.name ?? sk,
          intro: s.body.trim(),
          icon: s.meta.icon,
          color: s.meta.color,
        };
        const cats = under(src.categories, sk)
          .map((ck) => ({
            key: ck,
            order: toOrder(splitFrontmatter(src.categories[ck]).meta.order),
            name: splitFrontmatter(src.categories[ck]).meta.name ?? ck,
          }))
          .sort(byOrder);
        const entries = cats.flatMap((c) =>
          under(src.entries, c.key)
            .map((ek) => {
              const id = ek.split('/').pop()!;
              const { entry, order } = parseEntry(id, src.entries[ek], problems);
              return { key: ek, order, entry };
            })
            .sort(byOrder)
            .map(({ key, entry }): Entry => {
              const e: Entry = { ...entry, sec: section.key, cat: c.name };
              if (src.demos[key]) e.demo = src.demos[key];
              if (src.wires[key]?.wire) e.wire = src.wires[key].wire;
              if (src.wires[key]?.wireMobile) e.wireMobile = src.wires[key].wireMobile;
              return e;
            }),
        );
        return { key: sk, order: toOrder(s.meta.order), section, entries };
      })
      .sort(byOrder);
    const domain: Domain = {
      key: dk,
      name: meta.name ?? dk,
      desc: parts.get('说明') ?? '',
      sections: sections.map((s) => s.section),
      entries: sections.flatMap((s) => s.entries),
    };
    if (meta.order) domain.order = toOrder(meta.order);
    if (meta.icon) domain.icon = meta.icon;
    if (meta.searchHint) domain.searchHint = meta.searchHint;
    if (parts.get('通用要求')) domain.tail = parts.get('通用要求');
    return domain;
  });
  // 放错层级、缺上级说明文件的内容，网页上不会出现
  for (const k of Object.keys(src.entries))
    if (!src.categories[k.split('/').slice(0, -1).join('/')])
      problems.push(`${k}.md：所在目录缺少 _category.md，或放错了层级（应为 <领域>/<板块>/<分类>/<id>.md）`);
  for (const k of Object.keys(src.categories))
    if (!src.sections[k.split('/').slice(0, -1).join('/')])
      problems.push(`${k}/_category.md：上一级目录缺少 _section.md`);
  for (const k of Object.keys(src.sections))
    if (!src.domains[k.split('/')[0]]) problems.push(`${k}/_section.md：领域目录缺少 _domain.md`);
  for (const k of [...Object.keys(src.demos), ...Object.keys(src.wires)])
    if (!src.entries[k]) problems.push(`${k}：有示例或示意图文件，但没有同名的 .md`);
  return { domains, problems };
}
