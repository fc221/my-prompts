#!/usr/bin/env node
// 知识库数据校验。字段定义见 src/types.ts。
// 用法：
//   node scripts/validate.mjs                                   数据检查：字段、id、禁用词、wire 网格、目录结构（放错位置、认不出的文件、缺 _category.md 等）
//   node scripts/validate.mjs --browser frontend.layouts        先 npm run build，再用无头 Chrome 打开 dist/index.html 的该板块，挂载全部示例，报告 JS 错误和空白示例
//     --shots <目录>     逐卡截图（每张卡一张 png）
//     --detail           截详情抽屉里的大示例
//     --width 704        视口宽度（默认 1280；704 时卡片约 320px 宽，最容易暴露挤压）
//     --theme dark       用暗色主题打开
import { spawn } from 'node:child_process';
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
  mkdirSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDomains, parseDemoHtml, splitExtras } from '../src/adapter/index.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = (k) => {
  const i = args.indexOf('--' + k);
  return i < 0 ? null : args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true;
};
const RESERVED = ['settings', 'sidebar', 'customize', 'upgrade', 'downloads'];
// 禁用词：scripts/banned-words.local 里一行正则，不进仓库；没有这个文件就跳过这项检查
const bannedFile = join(root, 'scripts/banned-words.local');
const BANNED = existsSync(bannedFile) ? new RegExp(readFileSync(bannedFile, 'utf8').trim(), 'i') : null;

const errors = [],
  warns = [];
const domains = [];
// 按目录读内容（约定见 src/adapter/content.ts），和网页用同一个 buildDomains 组装；放错位置、认不出的文件直接报错
const DOM = join(root, 'domains');
const walk = (d) =>
  readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const src = { domains: {}, sections: {}, categories: {}, entries: {}, demos: {}, wires: {} };
for (const f of walk(DOM)) {
  const r = f.slice(DOM.length + 1),
    parts = r.split('/'),
    name = parts.at(-1);
  if (name.startsWith('.')) continue;
  const key = r.replace(/\/_(domain|section|category)\.md$|\.md$/, '');
  try {
    if (parts[1] === '_shared') {
      if (!/\.(ts|css)$/.test(name) || parts.length !== 3)
        errors.push(`domains/${r}：_shared/ 里只放共用的 .css 和 .ts`);
    } else if (parts.length === 2 && name === '_domain.md') src.domains[key] = readFileSync(f, 'utf8');
    else if (parts.length === 3 && name === '_section.md') src.sections[key] = readFileSync(f, 'utf8');
    else if (parts.length === 4 && name === '_category.md') src.categories[key] = readFileSync(f, 'utf8');
    else if (parts.length === 4 && /^[^_].*\.md$/.test(name)) {
      const text = readFileSync(f, 'utf8');
      src.entries[key] = text;
      const { demo, wire } = splitExtras(text);
      if (demo) {
        const d = parseDemoHtml(demo, (href) => readFileSync(join(dirname(f), href), 'utf8'));
        if (d.script && !/^export default /m.test(d.script))
          errors.push(`domains/${r}：“## 示例”的 <script type="module"> 里要 export default function demo(root) { … }`);
        src.demos[key] = { html: d.html, css: d.css, ...(d.script ? { js: d.script } : {}) };
      }
      if (wire) {
        const m = await import('data:text/javascript;charset=utf-8,' + encodeURIComponent(wire));
        const extra = Object.keys(m).filter((k) => !['wire', 'wireMobile'].includes(k));
        if (extra.length) errors.push(`domains/${r}：“## 示意图”只导出 wire / wireMobile，多了 ${extra.join('、')}`);
        src.wires[key] = { wire: m.wire, wireMobile: m.wireMobile };
      }
    } else
      errors.push(
        `domains/${r}：认不出的文件或放错了层级（一条一个文件：<领域>/<板块>/<分类>/<id>.md，示例和示意图写在它的“## 示例”“## 示意图”里；见 CONTRIBUTING.md）`,
      );
  } catch (e) {
    errors.push(`domains/${r} 无法读取：${e.message}`);
  }
}
const built = buildDomains(src);
errors.push(...built.problems);
domains.push(...built.domains);

const strOf = (v) =>
  typeof v === 'function'
    ? v.toString()
    : typeof v === 'object' && v
      ? Object.values(v).map(strOf).join(' ')
      : String(v ?? '');
const checkWire = (w, where) => {
  if (!w || !Array.isArray(w.areas) || typeof w.boxes !== 'object')
    return errors.push(`${where}：wire 需要 areas 数组和 boxes 对象`);
  const cells = w.areas.map((r) => r.trim().split(/\s+/));
  const names = new Set(cells.flat().filter((n) => n !== '.'));
  for (const n of names) if (!(n in w.boxes)) errors.push(`${where}：areas 里的 ${n} 在 boxes 里没有定义`);
  for (const [k, v] of Object.entries(w.boxes)) {
    if (!names.has(k)) errors.push(`${where}：boxes.${k} 没出现在 areas 里`);
    if (!/^[a-z][a-z0-9]*$/i.test(k)) errors.push(`${where}：区域名 ${k} 只能用字母数字`);
    if (v && typeof v === 'object' && v.inner) checkWire(v.inner, `${where}.${k}`);
  }
  if (w.drawer) {
    const b = w.drawer.box;
    if (!w.drawer.size || !b) errors.push(`${where}.drawer：需要 size 和 box`);
    else if (typeof b === 'object' && b.inner) checkWire(b.inner, `${where}.drawer`);
  }
  const widths = cells.map((r) => r.length);
  if (new Set(widths).size > 1) errors.push(`${where}：areas 每行的格子数不一致`);
  for (const n of names) {
    // 区域不是矩形时整个 grid-template-areas 会静默失效
    const pos = [];
    cells.forEach((r, y) =>
      r.forEach((c, x) => {
        if (c === n) pos.push([x, y]);
      }),
    );
    const xs = pos.map((p) => p[0]),
      ys = pos.map((p) => p[1]);
    if ((Math.max(...xs) - Math.min(...xs) + 1) * (Math.max(...ys) - Math.min(...ys) + 1) !== pos.length)
      errors.push(`${where}：区域 ${n} 不是矩形，整个示意图会失效`);
  }
  const count = (t) => (t || '1fr').trim().split(/\s+(?![^(]*\))/).length;
  if (count(w.cols) !== widths[0]) errors.push(`${where}：cols 有 ${count(w.cols)} 列，areas 每行 ${widths[0]} 格`);
  if (count(w.rows) !== cells.length) errors.push(`${where}：rows 有 ${count(w.rows)} 行，areas 有 ${cells.length} 行`);
};
const ids = new Map();
for (const dom of domains) {
  for (const k of ['key', 'name', 'sections', 'entries']) if (!dom[k]) errors.push(`领域 ${dom.key || '?'}：缺少 ${k}`);
  const secs = (dom.sections || []).map((s) => s.key);
  for (const e of dom.entries || []) {
    const where = `${dom.key}.${e.sec || '?'}/${e.id || '?'}`;
    for (const k of ['id', 'sec', 'cat', 'zh', 'look', 'prompt'])
      if (!e[k] || typeof e[k] !== 'string') errors.push(`${where}：缺少 ${k}`);
    if (e.id && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.id)) errors.push(`${where}：id 只能用小写字母数字和连字符`);
    if (e.id && (RESERVED.includes(e.id) || e.id.startsWith('comment-'))) errors.push(`${where}：id 是保留字`);
    if (ids.has(e.id)) errors.push(`${where}：id 与 ${ids.get(e.id)} 重复`);
    else ids.set(e.id, where);
    if (e.sec && !secs.includes(e.sec)) errors.push(`${where}：领域 ${dom.key} 没有声明板块 ${e.sec}`);
    if (e.rules && (!Array.isArray(e.rules) || e.rules.some((r) => typeof r !== 'string')))
      errors.push(`${where}：rules 必须是字符串数组`);
    if (e.prompt) {
      if ((e.prompt.match(/\{/g) || []).length !== (e.prompt.match(/\}/g) || []).length)
        errors.push(`${where}：提示词里的花括号不成对`);
      if (e.prompt.length < 40) warns.push(`${where}：提示词太短（${e.prompt.length} 字），写清对象、参数和边界`);
    }
    if (e.demo) {
      if (typeof e.demo.html !== 'string' || typeof e.demo.css !== 'string')
        errors.push(`${where}：demo 需要 html 和 css 字符串`);
      const src = strOf(e.demo);
      if (/https?:\/\/(?!www\.w3\.org)/.test(src)) errors.push(`${where}：示例引用了外部资源`);
      if (/\balert\(|\bconfirm\(|\bprompt\(|new Function|\beval\(/.test(src))
        errors.push(`${where}：示例里不能用 alert / confirm / prompt / eval / new Function`);
      if (/<button>/.test(e.demo.html) && !/(^|[}\s,>])button\s*[{,:]/.test(e.demo.css))
        warns.push(
          `${where}：示例里有没写样式的 <button>，会显示成浏览器默认的灰按钮；重播、模拟操作这类控制按钮用 class="ctl"`,
        );
      if (/setInterval/.test(strOf(e.demo.js)) && !/clearInterval|isConnected/.test(strOf(e.demo.js)))
        warns.push(`${where}：setInterval 没有停止条件，卡片移除后会一直运行（检查 root.host.isConnected）`);
    }
    if (e.wire) checkWire(e.wire, where + '.wire');
    if (e.wireMobile) checkWire(e.wireMobile, where + '.wireMobile');
    const t = BANNED && strOf(e).match(BANNED);
    if (t) errors.push(`${where}：出现禁用词“${t[0]}”`);
  }
}
const total = domains.reduce((n, d) => n + (d.entries || []).length, 0);
console.log(`共 ${total} 条，${domains.length} 个领域`);
for (const d of domains) {
  console.log(`${d.name}（${d.key}）：${d.entries.length} 条`);
  for (const s of d.sections) {
    const cats = {};
    for (const e of d.entries) if (e.sec === s.key) cats[e.cat] = (cats[e.cat] || 0) + 1;
    const n = Object.values(cats).reduce((a, b) => a + b, 0);
    console.log(
      `  ${s.key}：${n} 条${
        n
          ? ' · ' +
            Object.entries(cats)
              .map(([c, k]) => `${c} ${k}`)
              .join('，')
          : ''
      }`,
    );
  }
}
for (const w of warns) console.log('  ! ' + w);
for (const e of errors) console.log('  ✗ ' + e);
if (errors.length) process.exitCode = 1;

const target = opt('browser');
if (target && target !== true) {
  const page = join(root, 'dist', 'index.html');
  if (!existsSync(page)) {
    console.log('\n✗ 还没有 dist/index.html，先运行 npm run build');
    process.exit(1);
  }
  const newest = (dir) =>
    readdirSync(dir, { withFileTypes: true }).reduce(
      (m, f) => Math.max(m, f.isDirectory() ? newest(join(dir, f.name)) : statSync(join(dir, f.name)).mtimeMs),
      0,
    );
  if (Math.max(newest(join(root, 'src')), newest(join(root, 'domains'))) > statSync(page).mtimeMs)
    console.log('\n! dist/index.html 比源码旧，结果可能不是最新的：先运行 npm run build');
  const [tDom, tSec] = target.includes('.') ? target.split('.') : [domains[0]?.key, target];
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const profile = mkdtempSync(join(tmpdir(), 'kb-'));
  const chromePath = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].find((p) => existsSync(p));
  const chrome = spawn(
    chromePath,
    ['--headless=new', '--hide-scrollbars', '--remote-debugging-port=0', '--user-data-dir=' + profile, 'about:blank'],
    { stdio: 'ignore' },
  );
  try {
    for (let i = 0; i < 100 && !existsSync(join(profile, 'DevToolsActivePort')); i++) await sleep(100);
    await sleep(200);
    const [port, path] = readFileSync(join(profile, 'DevToolsActivePort'), 'utf8').trim().split('\n');
    const ws = new WebSocket(`ws://127.0.0.1:${port}${path}`);
    await new Promise((r) => (ws.onopen = r));
    let seq = 0;
    const pend = new Map(),
      logs = [];
    ws.onmessage = (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id) {
        pend.get(m.id)?.(m);
        pend.delete(m.id);
      } else if (m.method === 'Runtime.exceptionThrown')
        logs.push(
          '异常 ' + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text).split('\n')[0],
        );
      else if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error')
        logs.push(
          'console.error ' +
            m.params.args
              .map((a) => a.value ?? a.description)
              .join(' ')
              .slice(0, 200),
        );
    };
    const send = (method, params = {}, sessionId) =>
      new Promise((r) => {
        const id = ++seq;
        pend.set(id, r);
        ws.send(JSON.stringify({ id, method, params, sessionId }));
      });
    const {
      result: { targetId },
    } = await send('Target.createTarget', { url: 'about:blank' });
    const {
      result: { sessionId },
    } = await send('Target.attachToTarget', { targetId, flatten: true });
    const s = (m, p) => send(m, p, sessionId);
    await s('Runtime.enable');
    await s('Page.enable');
    const vw = Number(opt('width')) || 1280,
      theme = opt('theme') === 'dark' ? 'dark' : 'light';
    await s('Emulation.setDeviceMetricsOverride', { width: vw, height: 900, deviceScaleFactor: 1, mobile: vw < 640 });
    await s('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: theme }] });
    await s('Page.navigate', { url: pathToFileURL(page).href + `#s.${tDom}.${tSec}` });
    await sleep(1500);
    const ev = async (expression) =>
      (await s('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.result?.value;
    await ev(`window.__kb.state.theme = 'system'; window.__kb.go(${JSON.stringify(tDom)}, ${JSON.stringify(tSec)}); 0`);
    await sleep(600);
    const list = await ev(`[...document.querySelectorAll('article.card')].map(c => c.id)`);
    const shots = opt('shots'),
      detail = !!opt('detail');
    if (shots && shots !== true) mkdirSync(shots, { recursive: true });
    // 示例区里有没有内容：实时示例看影子根，示意图看 .stage，文字预览看 .doc
    const filled = (sel) =>
      `((box) => { if (!box) return 0; const h = box.querySelector('.demo-host'); if (h) return h.shadowRoot ? h.shadowRoot.children.length : 0; return box.querySelector('.stage, .doc') ? 2 : 0; })(${sel})`;
    const bad = [];
    // 纯文字的知识条目在详情里不画预览（见 DetailDrawer.vue 的 bare）
    const bare = new Set(
      domains
        .flatMap((d) => d.entries)
        .filter((e) => !e.demo && !e.wire && !['prompts', 'checklists'].includes(e.sec) && e.rules?.length)
        .map((e) => e.id),
    );
    for (const id of list || []) {
      const before = logs.length;
      let info;
      if (detail) {
        info = await ev(
          `(async () => { window.__kb.openDetail(${JSON.stringify(id)}); await new Promise(r => setTimeout(r, 900)); const d = document.querySelector('.d-demo'); if (!d) return { none: true }; const r = d.getBoundingClientRect(); return { x: r.x, y: r.y, sx: 0, sy: 0, w: r.width, h: r.height, kids: ${filled('d')} }; })()`,
        );
      } else {
        info = await ev(
          `(async () => { const c = document.getElementById(${JSON.stringify(id)}); c.scrollIntoView({ block: 'center' }); await new Promise(r => setTimeout(r, 700)); const r = c.getBoundingClientRect(); return { x: r.x, y: r.y, sx: scrollX, sy: scrollY, w: r.width, h: r.height, kids: ${filled("c.querySelector('.demo')")} }; })()`,
        );
      }
      if (!info || info.none || info.kids < 1) {
        if (!(detail && info?.none && bare.has(id))) bad.push(`${id}：示例没有渲染出内容`);
      }
      if (logs.length > before) bad.push(`${id}：${logs.slice(before).join(' | ')}`);
      if (shots && shots !== true && info?.w) {
        const r = await s('Page.captureScreenshot', {
          format: 'png',
          captureBeyondViewport: true,
          clip: { x: info.x + info.sx, y: info.y + info.sy, width: info.w, height: info.h, scale: 1 },
        });
        writeFileSync(join(shots, `${id}.png`), Buffer.from(r.result.data, 'base64'));
      }
      if (detail) {
        await ev(`window.__kb.state.detail = null; 0`);
        await sleep(250);
      }
    }
    console.log(
      `\n浏览器检查 ${tDom}.${tSec}：${(list || []).length} 张卡片${shots && shots !== true ? '，截图在 ' + shots : ''}`,
    );
    for (const b of bad) console.log('  ✗ ' + b);
    if (!bad.length) console.log('  全部示例正常挂载，没有 JS 错误');
    else process.exitCode = 1;
  } finally {
    chrome.kill();
    await sleep(300);
    try {
      rmSync(profile, { recursive: true, force: true });
    } catch {}
  }
}
