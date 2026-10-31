---
zh: 标签页
en: Tabs
order: 30
tab: 标签页
---

## 是什么

一排同级标签，点哪个下方就显示哪块内容，当前项下面有一条强调色的线。

## 适合

同一个对象下的几个同级视图，例如详情页的“基本信息 / 操作记录 / 附件”。

## 不适合

有先后顺序的流程用步骤条；需要并排对比的内容直接平铺；跨业务模块的跳转用导航；不要让一组标签同时承担导航、筛选和分步提交。

## 要点

- 标签名 2–6 个字，高 40–44px，字号 14–15px；当前项 600 字重 + 2px 强调色指示条
- 切换时指示条平移到新位置，约 240ms；放不下时横向滚动并显示左右箭头，不换行
- 标签很多（10 个以上）时末尾固定一个“全部”按钮，点开以网格列出所有标签；选中后关闭网格，标签栏把该项滚到中间
- 用 tablist / tab / tabpanel 语义和 aria-selected；左右方向键切换，Home / End 到首尾，只有当前标签在 Tab 键序列里
- 切走再回来保持原选中；可分享的视图写进 URL
- 减少动态效果时指示条直接跳到位

## 提示词

在{详情页}做「标签页」切换{视图1}、{视图2}、{视图3}：标签高 44px、名称 2–6 个字，当前项 600 字重 + 2px 强调色指示条，切换时指示条平移 240ms；用 tablist / tab / tabpanel 语义，左右方向键切换、Home/End 到首尾，只有当前标签在 Tab 序列里；切走再回来保持原选中，当前视图写进 URL；标签放不下时横向滚动并显示左右箭头，不换行，超过 10 个时末尾固定“全部”按钮，点开网格列出全部标签，选中后把该标签滚到中间；减少动态效果时指示条直接跳到位。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.box{width:100%;max-width:520px;background:#fff;border:1px solid #e3e6eb;border-radius:10px;overflow:hidden}
.tl{position:relative;display:flex;gap:4px;padding:0 12px;border-bottom:1px solid #e3e6eb;overflow-x:auto;scrollbar-width:none}
.tl button{flex:none;height:42px;padding:0 10px;border:0;background:none;color:#5b616e;font-size:14px}
.tl button:hover{color:#1f2329}
.tl [aria-selected="true"]{color:#1f2329;font-weight:600}
.ind{position:absolute;left:0;bottom:0;height:2px;width:0;background:#3b5bdb;transition:transform .24s cubic-bezier(.2,0,0,1),width .24s cubic-bezier(.2,0,0,1)}
.pn{padding:14px 22px;min-height:100px;font-size:13px}
dl{display:grid;grid-template-columns:auto 1fr;gap:6px 20px}
dt{color:#5b616e}
ul{list-style:none;padding:0;display:grid;gap:8px}
@media (prefers-reduced-motion:reduce){.ind{transition:none}
}
</style>

<div class="s"><div class="box"><div class="tl" role="tablist" aria-label="订单详情"><button role="tab" id="t1" aria-controls="p1" aria-selected="true">基本信息</button><button role="tab" id="t2" aria-controls="p2" aria-selected="false" tabindex="-1">操作记录</button><button role="tab" id="t3" aria-controls="p3" aria-selected="false" tabindex="-1">附件</button><i class="ind"></i></div><div class="pn" role="tabpanel" id="p1" aria-labelledby="t1" tabindex="0"><dl><dt>订单号</dt><dd>2041</dd><dt>客户</dt><dd>林知科技</dd><dt>金额</dt><dd>¥ 1,280.00</dd></dl></div><div class="pn" role="tabpanel" id="p2" aria-labelledby="t2" tabindex="0" hidden><ul><li><span class="muted">10-23 14:12</span>　林知 创建订单</li><li><span class="muted">10-23 15:40</span>　王敏 审核通过</li></ul></div><div class="pn" role="tabpanel" id="p3" aria-labelledby="t3" tabindex="0" hidden><ul><li>合同.pdf <span class="muted">1.2 MB</span></li><li>报价单.xlsx <span class="muted">86 KB</span></li></ul></div></div></div>

<script type="module">
export default function demo(root) {
  const tabs = [...root.querySelectorAll('[role=tab]')], ind = root.querySelector('.ind');
  const sel = (t, focus) => {
    tabs.forEach((x) => { const on = x === t; x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1; root.getElementById(x.getAttribute('aria-controls')).hidden = !on; });
    ind.style.width = t.offsetWidth + 'px'; ind.style.transform = 'translateX(' + t.offsetLeft + 'px)';
    if (focus) t.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => sel(t));
    t.addEventListener('keydown', (e) => { const n = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key]; if (n === undefined) return; e.preventDefault(); sel(tabs[(n + tabs.length) % tabs.length], true); });
  });
  requestAnimationFrame(() => sel(tabs[0])); // 详情对话框里挂载时还没显示，下一帧再量位置
}
</script>
