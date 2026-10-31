#!/usr/bin/env node
// 示例测试台：写示例时用，不用打包。把一条（<id>.md 或 <id>.html）或一个分类目录里的示例挂到三种尺寸的框里——
// 列表卡片 330×196、窄卡片 296×196、详情 700×320，报告 JS 错误、文字被框裁切、浏览器默认样式的按钮，并给每个条目截一张图。
//
//   node scripts/demo-harness.mjs <条目.md | 条目.html | 分类目录> <输出目录> [--ids a,b] [--tests 测试.mjs] [--reduce] [--wait 1500]
//
//   --ids      只测这几条
//   --tests    操作测试：export default { 'i-xxx': async (root, sleep) => '状态描述' }，root 是详情尺寸那一份的影子根
//   --reduce   模拟系统开启“减少动态效果”
//   --wait     挂载后等多久再检查（毫秒），自动播放的示例要等它停下
//
// 示例 HTML 用和网页相同的 parseDemoHtml 拆开；脚本按原位置提供给浏览器，里面 import 的 _shared/*.ts 用 Node 自带的 stripTypeScriptTypes 去掉类型。
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import { tmpdir } from 'node:os';
import { basename, dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

process.removeAllListeners('warning'); // stripTypeScriptTypes 的实验特性提示
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = (k, d) => {
  const i = args.indexOf(k);
  return i >= 0 ? args[i + 1] : d;
};
const [dataFile, outDir] = args.filter(
  (a, i) => !a.startsWith('--') && !['--ids', '--tests', '--wait'].includes(args[i - 1]),
);
if (!dataFile || !outDir) {
  console.error(
    '用法：node scripts/demo-harness.mjs <条目.md | 条目.html | 分类目录> <输出目录> [--ids a,b] [--tests t.mjs] [--reduce] [--wait 1500]',
  );
  process.exit(2);
}
const ids = opt('--ids', ''),
  testsFile = opt('--tests', ''),
  reduce = args.includes('--reduce'),
  wait = +opt('--wait', '1500');
mkdirSync(outDir, { recursive: true });
const { parseDemoHtml } = await import(join(root, 'src/adapter/index.ts'));
const target = resolve(dataFile);
const htmlFiles = statSync(target).isDirectory()
  ? readdirSync(target)
      .filter((f) => f.endsWith('.html'))
      .map((f) => join(target, f))
  : [target.replace(/\.(md|html)$/, '.html')].filter(existsSync);
const demos = htmlFiles.map((f) => {
  const d = parseDemoHtml(readFileSync(f, 'utf8'), (h) => readFileSync(resolve(dirname(f), h), 'utf8'));
  return { id: basename(f, '.html'), html: d.html, css: d.css, script: d.script ? `/fs${f}.mjs` : '' };
});
const scripts = new Map(htmlFiles.map((f) => [f + '.mjs', parseDemoHtml(readFileSync(f, 'utf8'), () => '').script]));
if (!demos.length) {
  console.error('没有找到示例 .html');
  process.exit(2);
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// 与 src/components/DemoHost.vue 一致的宿主样式（控制按钮 .ctl 的统一外观）
const CTL =
  ':where(button).ctl{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:32px;padding:0 14px;border:1px solid #d0d5dd;border-radius:8px;background:#fff;color:#1f2937;font:500 13px/1 system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;cursor:pointer;box-shadow:0 1px 2px rgba(16,24,40,.06);transition:background-color .15s,border-color .15s}:where(button).ctl:hover{background:#f5f6f8;border-color:#c4cad4}:where(button).ctl:active{background:#eceff3}:where(button).ctl:focus-visible{outline:2px solid #2563eb;outline-offset:2px}';
const page = `<!doctype html><meta charset="utf-8">
<style>body{margin:0;padding:16px;background:#e9ecf1;font:13px system-ui,"PingFang SC",sans-serif}.row{display:flex;gap:16px;align-items:flex-start;margin-bottom:24px}.row h3{margin:0 0 6px;font-size:13px}.f{background:#f3f4f6;border:1px solid #d5d9e0;border-radius:10px;overflow:hidden}.f>div{height:100%}.c{width:330px;height:196px}.n{width:296px;height:196px}.d{width:700px;height:320px}</style><div id="out"></div>
<script type="module">
const CTL = ${JSON.stringify(CTL)};
const data = [];
for (const d of ${JSON.stringify(demos)}) data.push({ id: d.id, demo: { html: d.html, css: d.css, js: d.script ? (await import(d.script)).default : undefined } });
const tests = ${testsFile ? `(await import('/fs${resolve(testsFile)}')).default` : '{}'};
const want = ${JSON.stringify(ids)}.split(',').filter(Boolean);
const list = data.filter((e) => e.demo && (!want.length || want.includes(e.id)));
const out = document.getElementById('out');
window.__report = [];
for (const e of list) {
  const row = document.createElement('div'); row.className = 'row'; row.id = 'row-' + e.id;
  row.innerHTML = ['c', 'n', 'd'].map((k) => '<div><h3>' + e.id + ' · ' + k + '</h3><div class="f ' + k + '"><div class="host"></div></div></div>').join('');
  out.appendChild(row);
  for (const host of row.querySelectorAll('.host')) {
    const root = host.attachShadow({ mode: 'open' });
    root.innerHTML = '<style>:host{display:block;height:100%;overflow:hidden;color-scheme:light;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}' + CTL + e.demo.css + '</style>' + e.demo.html;
    try { e.demo.js?.(root); } catch (err) { window.__report.push(e.id + ' JS 挂载报错：' + err.message); }
  }
}
await new Promise((r) => setTimeout(r, ${wait}));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
for (const e of list) {
  document.getElementById('row-' + e.id).querySelectorAll('.host').forEach((host, i) => {
    const size = ['卡片', '窄卡', '详情'][i], hr = host.getBoundingClientRect(), root = host.shadowRoot;
    const cut = new Set(), native = new Set();
    for (const el of root.querySelectorAll('*')) {
      const cs = getComputedStyle(el);
      if (el.tagName === 'BUTTON' && !el.classList.contains('ctl') && (cs.backgroundColor === 'rgb(239, 239, 239)' || cs.borderTopStyle === 'outset')) native.add((el.className || el.textContent).toString().slice(0, 20));
      const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      // data-clip：故意裁切的容器（跑马灯、滑开的列表项、露出半张的横滑卡片），里面的文字不查
      if (!own || cs.visibility === 'hidden' || +cs.opacity === 0 || el.closest('[hidden],[aria-hidden=true],[data-clip]')) continue;
      const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
      // 在可滚动容器里的是正常的滚动内容，不算裁切；否则和最近一层会裁切的容器比（没有就是示例框）
      let a = el.parentElement, scroll = false, clip = null; while (a) { const o = getComputedStyle(a); if (/(auto|scroll)/.test(o.overflowX + o.overflowY)) { scroll = true; break; } if (!clip && /(hidden|clip)/.test(o.overflowX + o.overflowY)) clip = a; a = a.parentElement; }
      const cr = clip ? clip.getBoundingClientRect() : hr;
      const inside = r.left >= cr.left - 1 && r.right <= cr.right + 1 && r.top >= cr.top - 1 && r.bottom <= cr.bottom + 1;
      const outside = r.right <= cr.left || r.left >= cr.right || r.bottom <= cr.top || r.top >= cr.bottom;
      if (!inside && !outside && !scroll) cut.add(el.textContent.trim().slice(0, 16));
      // 文字撑出了自己的框（如不换行的文字超出卡片底色）；只看文字和正常排版的子元素，绝对定位的装饰和伪元素不算
      else if (!scroll && cs.overflowX === 'visible' && cs.display !== 'inline' && el.scrollWidth > el.clientWidth + 2) {
        const rg = document.createRange(); let right = 0;
        for (const n of el.childNodes) {
          if (n.nodeType === 3 && n.textContent.trim()) { rg.selectNodeContents(n); right = Math.max(right, rg.getBoundingClientRect().right); }
          else if (n.nodeType === 1 && !/absolute|fixed/.test(getComputedStyle(n).position)) right = Math.max(right, n.getBoundingClientRect().right);
        }
        if (right > r.right - parseFloat(cs.borderRightWidth) + 2) cut.add('溢出 ' + el.textContent.trim().slice(0, 14));
      }
    }
    if (cut.size) window.__report.push(e.id + ' ' + size + ' 文字被框裁切：' + [...cut].slice(0, 6).join(' | '));
    if (native.size) window.__report.push(e.id + ' ' + size + ' 默认样式按钮：' + [...native].join(' | '));
  });
}
for (const e of list) {
  if (!tests[e.id]) continue;
  const root = document.getElementById('row-' + e.id).querySelectorAll('.host')[2].shadowRoot;
  try { window.__report.push(e.id + ' 测试：' + await tests[e.id](root, sleep)); } catch (err) { window.__report.push(e.id + ' 测试报错：' + err.message); }
}
window.__ids = list.map((e) => e.id);
window.__done = true;
</script>`;

const server = createServer((req, res) => {
  const u = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (u === '/') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    return res.end(page);
  }
  const file = u.slice(3);
  if (scripts.has(file)) {
    res.writeHead(200, { 'content-type': 'text/javascript; charset=utf-8', 'cache-control': 'no-store' });
    return res.end(scripts.get(file));
  }
  if (!u.startsWith('/fs/') || !existsSync(file)) {
    res.writeHead(404);
    return res.end();
  }
  let body = readFileSync(file, 'utf8');
  if (extname(file) === '.ts') body = stripTypeScriptTypes(body);
  res.writeHead(200, { 'content-type': 'text/javascript; charset=utf-8', 'cache-control': 'no-store' });
  res.end(body);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));

const chromePath = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => existsSync(p));
if (!chromePath) {
  console.error('没找到 Chrome / Chromium');
  process.exit(1);
}
const profile = mkdtempSync(join(tmpdir(), 'kb-demo-'));
const chrome = spawn(
  chromePath,
  ['--headless=new', '--hide-scrollbars', '--remote-debugging-port=0', '--user-data-dir=' + profile, 'about:blank'],
  { stdio: 'ignore' },
);
const quit = (code) => {
  chrome.kill();
  server.close();
  process.exit(code);
};
for (let i = 0; i < 100 && !existsSync(join(profile, 'DevToolsActivePort')); i++) await sleep(100);
await sleep(200);
const [cport, cpath] = readFileSync(join(profile, 'DevToolsActivePort'), 'utf8').trim().split('\n');
const ws = new WebSocket(`ws://127.0.0.1:${cport}${cpath}`);
await new Promise((r) => (ws.onopen = r));
let seq = 0;
const pend = new Map(),
  errs = [];
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id) {
    pend.get(m.id)?.(m);
    pend.delete(m.id);
  } else if (m.method === 'Runtime.exceptionThrown')
    errs.push(m.params.exceptionDetails.exception?.description?.split('\n')[0] ?? m.params.exceptionDetails.text);
  else if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error')
    errs.push(m.params.args.map((a) => a.value ?? a.description).join(' '));
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
await s('Emulation.setDeviceMetricsOverride', { width: 1420, height: 900, deviceScaleFactor: 1, mobile: false });
if (reduce) await s('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await s('Page.navigate', { url: `http://127.0.0.1:${server.address().port}/` });
const ev = async (x) =>
  (await s('Runtime.evaluate', { expression: x, returnByValue: true, awaitPromise: true })).result.result?.value;
let done = false;
for (let i = 0; i < 160 && !done; i++) {
  await sleep(250);
  done = await ev('!!window.__done');
}
if (!done) {
  console.log('页面没有跑完（文件导入失败或示例卡死）。页面错误：\n' + errs.join('\n'));
  quit(1);
}
const report = await ev('window.__report'),
  list = await ev('window.__ids');
for (const id of list) {
  const r = await ev(
    `(() => { const b = document.getElementById('row-${id}').getBoundingClientRect(); return [b.x, b.y + scrollY, b.width, b.height]; })()`,
  );
  const shot = await s('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: true,
    clip: { x: r[0] - 4, y: r[1] - 4, width: r[2] + 8, height: r[3] + 8, scale: 1 },
  });
  writeFileSync(join(outDir, id + '.png'), Buffer.from(shot.result.data, 'base64'));
}
console.log(`示例 ${list.length} 个；截图在 ${resolve(outDir)}`);
console.log(report.length ? report.join('\n') : '没有发现裁切、默认按钮或挂载错误');
console.log('页面错误：', errs.length ? '\n' + errs.join('\n') : '无');
quit(errs.length || report.some((x) => /报错/.test(x)) ? 1 : 0);
