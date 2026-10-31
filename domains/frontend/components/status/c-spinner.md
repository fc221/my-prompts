---
zh: 加载指示
en: Spinner / Loading
order: 10
---

## 是什么

一个转动的小圆环，表示正在处理；常放在按钮里、卡片角上或列表底部。

## 适合

按钮内的提交与保存、卡片和小面板的短时刷新、列表底部的“加载更多”。

## 不适合

首次加载整页内容用骨架屏；能算出进度的用进度条；不要用一个大转圈挡住整页。

## 要点

- 用组件库的加载指示：Element Plus v-loading 指令（element-loading-text，全屏用 ElLoading.service({ fullscreen, lock, text })）、Naive UI n-spin 包住内容（show、description、size、delay）、Ant Design Vue a-spin 包住内容（spinning、tip、size、delay）；按钮里直接用 el-button / n-button / a-button 的 loading
- 按钮提交：loading 置 true，文案改“保存中…”，宽度不变；完成后恢复并给结果；提交函数里自己防重复，不依赖按钮状态，见「防重复提交」
- 区域刷新保留旧内容：用 v-loading / n-spin / a-spin 包住区块，旧内容半透明盖一层转圈；不用全屏遮罩挡住整页，一个区域同一时间只有一个加载指示
- 什么时候出现：请求超过 200 至 300ms 才显示，Naive UI、Ant Design Vue 用 delay，a-button 的 loading 可传 { delay }；Element Plus 没有延迟选项，自己延迟再置 true。一旦出现至少保持 400ms，避免一闪而过
- 列表底部“加载更多”：小号转圈配“正在加载…”，到底显示“没有更多了”，失败显示“加载失败，重试”，见「无限滚动与加载更多」
- 首次加载整块内容用「骨架屏」，能算出进度用「进度条」，转圈只管短时等待

## 提示词

在{提交按钮 / 卡片刷新 / 列表加载更多}用加载指示：用项目组件库自带的（Element Plus 按钮 el-button :loading、区域 v-loading 加 element-loading-text；Naive UI n-button :loading、区域 n-spin :show 加 description；Ant Design Vue a-button :loading、区域 a-spin :spinning 加 tip），不手写转圈。按钮加载时文案改“{动作}中…”，宽度不变，完成后恢复并给结果，提交函数里防重复；区域刷新用 spin 包住区块保留旧内容，不用全屏遮罩；列表底部小号转圈配“正在加载…”，到底显示“没有更多了”，失败显示“加载失败，重试”；请求超过 300ms 才显示（delay 属性，Element Plus 自己延迟）、出现后至少保持 400ms；同一区域只有一个加载指示。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.row{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:16px}
.card{width:180px;padding:10px 12px 12px 14px;background:#fff;border:1px solid #e3e6eb;border-radius:10px;display:grid}
.hd{display:flex;align-items:center;gap:4px}
.hd .muted{flex:1}
.spin.sm{width:14px;height:14px;color:#5b616e}
.num{font-size:24px;font-variant-numeric:tabular-nums;transition:opacity .16s}
.card[aria-busy="true"] .num{opacity:.45}
.col{display:grid;gap:14px;justify-items:center}
.save{min-width:104px}
.save[aria-disabled]{opacity:1;cursor:progress}
@container (max-width:340px){.row{gap:12px}
.card{width:144px}
}
.more{display:flex;align-items:center;gap:8px;font-size:12px;color:#5b616e}
</style>

<div class="s"><div class="row"><div class="card" aria-busy="false"><div class="hd"><span class="muted">今日访问</span><span class="spin sm" hidden></span><button class="b t sm rf">刷新</button></div><b class="num">12,480</b><span class="muted">较昨日 +6.2%</span></div><div class="col"><button class="b p save"><span class="spin" hidden></span><span class="lb">保存</span></button><p class="more"><span class="spin"></span>正在加载…</p></div></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const save = root.querySelector('.save'), lb = save.querySelector('.lb'), sp = save.querySelector('.spin'), card = root.querySelector('.card'), num = card.querySelector('.num'), cs = card.querySelector('.spin'), sr = root.querySelector('.sr');
  save.addEventListener('click', () => {
    if (save.getAttribute('aria-disabled')) return;
    save.setAttribute('aria-disabled', 'true'); sp.hidden = false; lb.textContent = '保存中…';
    setTimeout(() => { sp.hidden = true; lb.textContent = '已保存 ✓'; sr.textContent = '已保存'; setTimeout(() => { lb.textContent = '保存'; save.removeAttribute('aria-disabled'); }, 1500); }, 1600);
  });
  root.querySelector('.rf').addEventListener('click', () => {
    if (card.getAttribute('aria-busy') === 'true') return;
    card.setAttribute('aria-busy', 'true'); cs.hidden = false;
    setTimeout(() => { num.textContent = (12000 + Math.round(Math.random() * 900)).toLocaleString('en-US'); card.setAttribute('aria-busy', 'false'); cs.hidden = true; sr.textContent = '数据已刷新'; }, 1200);
  });
}
</script>
