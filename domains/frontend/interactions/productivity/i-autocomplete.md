---
zh: 搜索联想
en: Autocomplete
order: 40
---

## 是什么

在搜索框里输入时，下面实时列出匹配的建议，命中的字高亮；方向键选择、回车确认；空着时显示最近搜索。

## 适合

全局搜索、选择客户或商品、地址输入、标签输入。

## 注意

请求要防抖并丢弃过期的返回；没有匹配时给“直接搜索‘xxx’”的兜底项，不要只显示空白。

## 要点

- 输入停顿 150–200ms 再请求；新请求发出时取消旧的，旧结果晚到也不覆盖新结果。
- 建议最多 8 条，命中的字加粗或高亮；同时搜多种对象时按类型分组，并标出类型。
- 方向键在建议里移动（首尾循环），回车选中，Esc 先关列表、再按一次清空输入；鼠标悬停和键盘高亮是同一个状态。
- 输入框为空时显示最近搜索（可单条删除、可清空），有输入时换成匹配结果。
- 按 combobox 模式实现：输入框 role="combobox"、aria-expanded、aria-activedescendant，列表 role="listbox"，焦点始终留在输入框。
- 加载中在列表里显示一行“正在搜索…”，失败显示原因和重试，不清空已输入的文字。

## 提示词

给{搜索框}加「搜索联想」：输入停顿 180ms 后请求建议，新请求取消旧请求；列表最多 8 条，命中的字高亮，多种对象按类型分组；方向键移动（首尾循环）、回车选中、Esc 先关列表再清空；输入框为空时显示最近搜索（可删除、可清空）；没有匹配时给“直接搜索‘{关键词}’”兜底项；按 combobox 模式写 ARIA，焦点始终在输入框；加载中显示“正在搜索…”，失败可重试且不清空输入。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:16px 18px}
.box{position:relative;max-width:440px;margin:0 auto}
.field{display:flex;align-items:center;gap:8px;height:40px;padding:0 12px;border:1px solid #c9ced6;border-radius:10px;background:#fff}
.field:focus-within{border-color:#3b5bdb;box-shadow:0 0 0 3px rgba(59,91,219,.15)}
.ic{color:#8a8f99}
input{flex:1;min-width:0;border:0;outline:0;background:none;font-size:14px}
[role=listbox]{position:absolute;left:0;right:0;top:46px;z-index:2;margin:0;padding:6px;list-style:none;border:1px solid #e3e6eb;border-radius:10px;background:#fff;box-shadow:0 12px 28px -12px rgba(15,23,42,.3)}
.gh{padding:4px 8px;color:#8a8f99;font-size:12px}
[role=option]{display:flex;align-items:center;gap:8px;padding:7px 8px;border-radius:7px;cursor:pointer}
[role=option][aria-selected=true]{background:#edf1ff}
[role=option] em{font-style:normal;margin-left:auto;color:#8a8f99;font-size:12px}
mark{background:none;color:#3b5bdb;font-weight:700}
.res{margin:12px 2px 0;color:#5b616e}
</style>

<div class="st"><div class="box"><label class="sr" for="q">搜索客户或订单</label><div class="field"><span class="ic">⌕</span><input id="q" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="lb" autocomplete="off" placeholder="搜索客户或订单，试试“林”或“SO”"></div><ul id="lb" role="listbox" hidden></ul><p class="res" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const q = root.querySelector('#q'), lb = root.querySelector('#lb'), res = root.querySelector('.res');
  const D = [['林知科技', '客户'], ['林晓', '成员'], ['陈一鸣', '客户'], ['杭州云帆', '客户'], ['SO-20931 · 林知科技', '订单'], ['SO-20930 · 陈一鸣', '订单'], ['SO-20928 · 杭州云帆', '订单']], recent = ['星河传媒', 'SO-20917'];
  let items = [], act = -1;
  const esc = (t) => t.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  const hl = (t, k) => { const i = t.toLowerCase().indexOf(k.toLowerCase()); return i < 0 || !k ? esc(t) : esc(t.slice(0, i)) + '<mark>' + esc(t.slice(i, i + k.length)) + '</mark>' + esc(t.slice(i + k.length)); };
  const render = () => { const k = q.value.trim(); items = k ? D.filter((d) => d[0].toLowerCase().includes(k.toLowerCase())).slice(0, 8) : recent.map((r) => [r, '最近']); if (k && !items.length) items = [[`直接搜索“${k}”`, '回车']]; act = -1; lb.innerHTML = (k ? '' : '<li class="gh" role="presentation">最近搜索</li>') + items.map((d, i) => `<li id="o${i}" role="option" aria-selected="false" data-i="${i}">${hl(d[0], k)}<em>${d[1]}</em></li>`).join(''); open(true); };
  const open = (v) => { lb.hidden = !v; q.setAttribute('aria-expanded', String(v)); if (!v) q.removeAttribute('aria-activedescendant'); };
  const mark = (i) => { act = (i + items.length) % items.length; lb.querySelectorAll('[role=option]').forEach((o, j) => o.setAttribute('aria-selected', String(j === act))); q.setAttribute('aria-activedescendant', 'o' + act); };
  const pick = (i) => { const t = items[i][0]; q.value = t.startsWith('直接搜索') ? q.value : t; res.textContent = '已选择：' + (t.startsWith('直接搜索') ? '搜索 ' + q.value : t); open(false); };
  let timer; q.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(render, 180); }); q.addEventListener('focus', render);
  q.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (lb.hidden) render(); mark(act + (e.key === 'ArrowDown' ? 1 : -1)); } else if (e.key === 'Enter' && !lb.hidden) { e.preventDefault(); pick(act < 0 ? 0 : act); } else if (e.key === 'Escape') { if (!lb.hidden) open(false); else q.value = ''; } });
  lb.addEventListener('mousedown', (e) => e.preventDefault()); lb.addEventListener('click', (e) => { const o = e.target.closest('[role=option]'); if (o) pick(+o.dataset.i); }); lb.addEventListener('mousemove', (e) => { const o = e.target.closest('[role=option]'); if (o && +o.dataset.i !== act) mark(+o.dataset.i); });
  q.addEventListener('blur', () => open(false));
}
</script>
