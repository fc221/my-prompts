---
zh: 命令面板
en: Command palette
order: 70
---

## 是什么

按 ⌘K / Ctrl+K 弹出居中的搜索框，输入几个字就能跳到页面或执行命令。

## 适合

功能多的工具类产品和后台，给熟练用户一个键盘直达的入口。

## 不适合

不能是任何功能的唯一入口；功能很少的产品不需要。

## 要点

- ⌘K（Mac）/ Ctrl+K（其他系统）打开，再按一次或 Esc 关闭；界面上另有可见入口，并标出快捷键
- 面板在视口上方约 20% 处水平居中，宽 560–640px；结果最多 8 条后内部滚动
- 结果按“最近 / 页面 / 命令”分组，命中的字加粗，右侧显示类型或快捷键
- 焦点留在输入框，上下方向键移动高亮（aria-activedescendant），Enter 执行，关闭后焦点回到原处
- 每天用很多次的入口不加进出动画，直接出现
- 无结果时写“没有找到”，并给出帮助文档等出路；窄屏改全屏

## 提示词

给{产品}加「命令面板」：⌘K / Ctrl+K 打开或关闭，顶栏另有带快捷键提示的搜索入口；面板居中在视口上方约 20%，宽 600px，输入框在顶部，结果按“最近 / 页面 / 命令”分组、最多 8 条后内部滚动，命中字加粗，右侧显示快捷键；焦点留在输入框，上下键移动高亮（aria-activedescendant），Enter 执行，Esc 关闭并回到原焦点；不加进出动画；无结果时写“没有找到”并给出帮助入口；窄屏改全屏。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.app{display:grid;justify-items:center;gap:10px;width:100%}
.trig{display:flex;align-items:center;gap:8px;width:min(300px,100%);height:38px;padding:0 8px 0 12px;border:1px solid #e3e6eb;border-radius:10px;background:#fff;color:#5b616e;font-size:13px}
.trig:hover{border-color:#c4c9d2}
.trig span{flex:1;text-align:left}
kbd{padding:1px 6px;border:1px solid #e3e6eb;border-radius:5px;background:#f5f6f8;font:11px system-ui;color:#5b616e}
.mask.cmd,.mask.cmd[data-open]{place-items:start center;transition:none}
.cmd .panel{transform:none;transition:none}
.pal{width:min(520px,100%);max-height:100%;display:flex;flex-direction:column;overflow:hidden}
.ip{display:flex;align-items:center;gap:8px;padding:0 14px;border-bottom:1px solid #e3e6eb;color:#5b616e}
.ip input{flex:1;min-width:0;height:42px;border:0;outline:0;background:none;font-size:14px;color:#1f2329}
ul{list-style:none;padding:4px;overflow-y:auto}
li{display:flex;align-items:center;gap:10px;height:32px;padding:0 10px;border-radius:6px;font-size:13px;cursor:pointer}
li[aria-selected="true"]{background:#edf1ff;color:#3b5bdb}
.ty{margin-left:auto;font-size:12px;color:#5b616e}
mark{background:none;color:inherit;font-weight:700}
li.none{justify-content:center;color:#5b616e;cursor:default}
</style>

<div class="s"><div class="app"><button class="trig"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><span>搜索或跳转…</span><kbd class="k">⌘K</kbd></button><p class="muted out" role="status">点击入口，或在示例里按 ⌘K / Ctrl+K</p></div><div class="mask cmd" role="dialog" aria-modal="true" aria-label="命令面板"><div class="panel pal"><div class="ip"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input role="combobox" aria-expanded="true" aria-controls="ls" aria-autocomplete="list" placeholder="输入页面或命令" aria-label="搜索页面或命令"></div><ul id="ls" role="listbox" aria-label="结果"></ul></div></div></div>

<script type="module">
import { modal } from '../../_shared/components-overlay.ts';

export default function demo(root) {
  const D = [['订单列表', '页面'], ['客户详情', '页面'], ['数据报表', '页面'], ['新建订单', '命令'], ['导出报表', '命令'], ['邀请成员', '命令'], ['切换暗色主题', '命令']];
  const trig = root.querySelector('.trig'), mk = root.querySelector('.cmd'), inp = mk.querySelector('input'), ls = mk.querySelector('ul'), out = root.querySelector('.out');
  if (!/Mac|iP/.test(navigator.platform)) root.querySelector('.k').textContent = 'Ctrl K';
  let hits = [], act = 0;
  const draw = () => {
    const q = inp.value.trim(); hits = D.filter((d) => d[0].includes(q)); act = Math.min(act, Math.max(hits.length - 1, 0));
    // q 只会是静态文案的子串时才被插入，不会带进 HTML
    ls.innerHTML = hits.length ? hits.map((d, i) => `<li role="option" id="o${i}" aria-selected="${i === act}"><span>${q ? d[0].replace(q, '<mark>' + q + '</mark>') : d[0]}</span><span class="ty">${d[1]}</span></li>`).join('') : '<li class="none">没有找到相关结果，试试换个词</li>';
    inp.setAttribute('aria-activedescendant', hits.length ? 'o' + act : '');
    const a = ls.querySelector('[aria-selected="true"]'); if (a) a.scrollIntoView({ block: 'nearest' });
  };
  const m = modal(root, mk, { first: 'input', scrim: true });
  const go = (i) => { const d = hits[i]; if (!d) return; m.close(); out.textContent = '已打开：' + d[0]; };
  const open = () => { inp.value = ''; act = 0; draw(); m.open(root.activeElement || trig); };
  trig.addEventListener('click', open);
  root.addEventListener('keydown', (e) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); mk.hasAttribute('data-open') ? m.close() : open(); } });
  inp.addEventListener('input', () => { act = 0; draw(); });
  inp.addEventListener('keydown', (e) => {
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && hits.length) { e.preventDefault(); act = (act + (e.key === 'ArrowDown' ? 1 : -1) + hits.length) % hits.length; draw(); }
    else if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); go(act); }
  });
  ls.addEventListener('click', (e) => { const li = e.target.closest('li[id]'); if (li) go(+li.id.slice(1)); });
}
</script>
