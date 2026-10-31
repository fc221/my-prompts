---
zh: 搜索框
en: Search box
order: 30
tab: 搜索框
---

## 是什么

带放大镜图标的输入框，输入即过滤，可一键清除。

## 适合

列表、表格上方按关键词过滤；顶栏全局搜索；选择器面板内搜索选项。

## 不适合

条件是固定枚举（状态、类型）时用筛选下拉；总共只有十几条内容时直接列出，不必搜索。

## 要点

- 用 type="search" + enterkeyhint="search"；左侧 16px 放大镜离边框 12px，文字左内边距 36px
- 输入防抖 250–300ms 再请求；搜索中在框内右侧显示 16px 转圈，旧结果保留不清空
- 有内容时显示清除按钮，Esc 也能清除；清除后焦点留在框内
- 区分“没有数据”和“没有符合条件的结果”，后者显示当前关键词和“清除搜索”
- 结果数量用 role="status" 播报，不抢焦点；匹配字可以浅色底高亮
- 宽 240–320px（顶栏全局搜索可到 400px），窄屏撑满或收成图标按钮点开展开；长页面下滚时也可以收成放大镜按钮，点一下在原位展开并聚焦，框里有内容时保持展开

## 提示词

在{成员列表上方}放一个搜索框：type="search"，宽 280px（窄屏撑满），高 32px，左侧 16px 放大镜，占位“搜索姓名或部门”；输入后防抖 300ms 过滤，等待时框内右侧显示转圈并保留旧结果，匹配字浅色高亮；有内容时显示清除按钮，Esc 也能清除；没有结果时显示“没有找到“{关键词}”相关成员”和“清除搜索”；结果数量用 role="status" 播报；搜索框有 aria-label。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{width:100%;max-width:300px;display:flex;flex-direction:column;gap:8px}
.sb{position:relative;display:flex}
.sb .inp{flex:1;padding:0 36px}
input::-webkit-search-cancel-button{-webkit-appearance:none}
.mg{position:absolute;left:12px;top:8px;display:flex;color:#5b616e;pointer-events:none}
.clr{position:absolute;right:4px;top:4px;display:grid;place-items:center;width:24px;height:24px;padding:0;border:0;border-radius:4px;background:none;color:#8a909c;cursor:pointer}
.clr:hover{color:#1f2329;background:#f5f6f8}
.sp{position:absolute;right:12px;top:9px;width:14px;height:14px;border:2px solid #e3e6eb;border-top-color:#3b5bdb;border-radius:50%;animation:r .8s linear infinite}
@keyframes r{to{transform:rotate(1turn)}
}
@media (prefers-reduced-motion:reduce){.sp{animation-duration:1.6s}
}
.list{list-style:none;margin:0;padding:4px;height:92px;overflow:auto;background:#fff;border:1px solid #e3e6eb;border-radius:8px}
.list li{display:flex;align-items:center;justify-content:space-between;height:28px;padding:0 8px;border-radius:4px}
.list li:hover{background:#f5f6f8}
.list small{font-size:12px;color:#5b616e}
mark{background:#edf1ff;color:#3b5bdb}
.list .none{height:auto;flex-direction:column;align-items:flex-start;padding:8px;color:#5b616e;font-size:13px}
.none:hover{background:none}
.t{height:24px;padding:0;border:0;background:none;color:#3b5bdb;cursor:pointer}
</style>

<div class="s"><div class="w"><div class="sb"><span class="mg"><svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/></svg></span><input class="inp" type="search" enterkeyhint="search" placeholder="搜索姓名或部门，试试“设计”" aria-label="搜索成员"><span class="sp" hidden></span><button class="clr" type="button" aria-label="清除搜索" hidden><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7"/></svg></button></div><ul class="list"></ul><p class="sr" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const P = [['王小明', '设计部'], ['李雪', '研发部'], ['张伟', '研发部'], ['陈静', '市场部'], ['赵磊', '设计部'], ['刘洋', '运营部']];
  const i = root.querySelector('input'), ul = root.querySelector('.list'), x = root.querySelector('.clr'), sp = root.querySelector('.sp'), st = root.querySelector('[role=status]'); let t;
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const hl = (s, q) => (q && s.includes(q) ? esc(s).replace(esc(q), () => '<mark>' + esc(q) + '</mark>') : esc(s));
  const draw = () => {
    const q = i.value.trim(), hit = P.filter((p) => !q || p.join(' ').includes(q)); sp.hidden = true; x.hidden = !i.value;
    ul.innerHTML = hit.length ? hit.map(([n, d]) => `<li><span>${hl(n, q)}</span><small>${hl(d, q)}</small></li>`).join('') : `<li class="none">没有找到“${esc(q)}”相关成员<button type="button" class="t">清除搜索</button></li>`;
    st.textContent = q ? `找到 ${hit.length} 位成员` : '';
  };
  const clear = () => { i.value = ''; draw(); i.focus(); };
  i.addEventListener('input', () => { clearTimeout(t); x.hidden = true; sp.hidden = !i.value; t = setTimeout(draw, 300); });
  i.addEventListener('keydown', (e) => { if (e.key === 'Escape' && i.value) { e.preventDefault(); clear(); } });
  x.addEventListener('click', clear);
  ul.addEventListener('click', (e) => { if (e.target.closest('.t')) clear(); });
  draw();
}
</script>
