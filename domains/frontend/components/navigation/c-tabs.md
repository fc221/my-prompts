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

- 用组件库的标签页：Element Plus el-tabs（type、tab-position、stretch、closable、before-leave）+ el-tab-pane（name、label、lazy）、Naive UI n-tabs（type、placement、animated、closable、justify-content）+ n-tab-pane（name、tab、display-directive）、Ant Design Vue a-tabs（type、tabPosition、centered、destroyInactiveTabPane）+ a-tab-pane（key、tab、forceRender）
- 样式只定一种：后台详情页默认细线（el-tabs 不设 type、n-tabs type="line"、a-tabs type="line"），要和面板连成一体才用卡片式；几种样子怎么挑见「标签页的六种样式」
- 标签名 2–6 个字；当前项用 v-model 绑定（model-value / value / activeKey），不要靠点击事件自己记下标
- 当前标签写进 URL 的 ?tab=，刷新和分享回到同一视图；切走再回来保持原选中，见「状态放进 URL」
- 面板懒加载：Element Plus el-tab-pane lazy、Naive UI display-directive="show:lazy"、Ant Design Vue 默认只渲染当前面板（forceRender 才预渲染）；表格和图表别一进页面全请求，切走后的面板保留状态不销毁（不开 destroyInactiveTabPane）
- 离开前要校验（表单没保存）用 before-leave / on-before-leave 返回 false 拦住；Ant Design Vue 没有这个钩子，用受控的 activeKey 在 change 里决定切不切
- 可关闭的标签（closable）只给多开文档这类场景，详情页的视图不可关闭
- 放不下时三家都横向滚动（Ant Design Vue 还会把溢出的收进“更多”），不换行、不压扁文字；超过 10 个先合并视图或改成左侧菜单

## 提示词

在{详情页}做「标签页」切换{视图1}、{视图2}、{视图3}：用项目组件库自带的标签页（Element Plus el-tabs + el-tab-pane lazy；Naive UI n-tabs type="line" + n-tab-pane display-directive="show:lazy"；Ant Design Vue a-tabs + a-tab-pane），不手写。样式用细线，不加卡片底；标签名 2–6 个字；当前标签用 v-model 绑定并同步到 URL 的 ?tab=，刷新和分享回到同一视图；面板懒加载，切走后保留已加载的内容和滚动位置；{有未保存表单时}用 before-leave / on-before-leave 拦住切换并提示，Ant Design Vue 用受控的 activeKey 实现；标签不可关闭；放不下时用组件自带的横向滚动，不换行、不压扁文字。

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
