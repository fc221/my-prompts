---
zh: 页内横幅提示
en: Inline alert / Banner
order: 100
---

## 是什么

页面或区块顶部的一条浅色提示条，常驻显示，不挡任何操作。

## 适合

当前页面或区域的持续状态：试用期剩余、数据同步延迟、即将维护、表单整体的错误汇总。

## 不适合

一闪而过的结果用轻提示；字段级错误放在字段下方；不要每次打开页面都无差别弹出同一条。

## 要点

- 用组件库的横幅：Element Plus el-alert（title、description、type、show-icon、closable、close-text、@close），Naive UI n-alert（title、type、show-icon、closable、bordered、@close，正文放默认插槽），Ant Design Vue a-alert（message、description、type、show-icon、closable、banner、action 插槽、@close）；颜色、图标、关闭按钮、收起动画、读屏角色由组件负责
- 放在相关内容正上方，宽度同所在区域；作为普通块级元素把下方内容推下去，不用 position 浮在内容上；Ant Design Vue 的 banner 模式去圆角和边框，只给页面最顶上的通栏
- 四种语气用 type：信息、成功、警告、错误（Element Plus 和 Ant Design Vue 是 info / success / warning / error，Naive UI 还有 default）；图标要显式开，Element Plus 和 Ant Design Vue 的 show-icon 默认关，Naive UI 默认开；不只靠颜色区分
- 一句话说清状态，最多带一个操作（“立即续费”“查看详情”）：Ant Design Vue 放 action 插槽，Element Plus 和 Naive UI 写在 title / 默认插槽里的链接
- 可不可关闭要显式写：Element Plus closable 默认开，Naive UI 和 Ant Design Vue 默认关；关闭后在 @close 里记住（本地存储或用户设置），不反复出现；错误汇总在问题解决前 closable=false
- 横幅跟着状态走：状态消失时用 v-if 撤掉，不要每次打开页面都无差别弹同一条

## 提示词

在{页面或区块}顶部加「页内横幅提示」说明{持续状态}：用项目组件库自带的横幅（Element Plus el-alert show-icon；Naive UI n-alert；Ant Design Vue a-alert show-icon），不手写提示条。作为块级元素放在相关内容正上方，宽同所在区域，把下方内容推下去而不是盖住；语气用 type {info / success / warning / error}，图标显式打开；一句话说状态，最多一个操作“{立即续费}”（Ant Design Vue 放 action 插槽，另两家写在标题里的链接）；{可关闭时}显式写 closable，@close 里记住不再出现；错误汇总 closable=false，问题解决后随状态用 v-if 撤掉；不要每次打开页面都无差别弹同一条；窄屏文字换行、关闭按钮保持在右侧。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.area{width:100%;max-width:520px;display:grid}
.w{display:grid;grid-template-rows:1fr;transition:grid-template-rows .24s cubic-bezier(.2,0,0,1),opacity .16s}
.w.gone{grid-template-rows:0fr;opacity:0}
.al{min-height:0;overflow:hidden;display:flex;align-items:center;gap:8px;padding:0 8px 0 12px;margin-bottom:8px;border:1px solid;border-radius:8px;font-size:13px;transition:margin .24s}
.w.gone .al{margin-bottom:0;border-width:0}
.al svg{flex:none}
.al p{flex:1;padding:8px 0}
.info{background:#edf1ff;border-color:#d3dcfb}
.info svg{color:#3b5bdb}
.warn{background:#fff6e8;border-color:#f5d9ad}
.warn svg{color:#b54708}
.err{background:#fdeeec;border-color:#f6cdc8}
.err svg{color:#d92d20}
.lk{margin-left:4px;padding:0;border:0;background:none;color:#3b5bdb;text-decoration:underline;font-size:13px}
.al .x{width:28px;height:28px;font-size:18px}
.reset{justify-self:center}
@media (prefers-reduced-motion:reduce){.w,.al{transition:opacity .16s}
}
</style>

<div class="s"><div class="area"><div class="w"><div class="al info" role="status"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg><p>数据每 10 分钟同步一次。</p><button class="x" aria-label="关闭提示">×</button></div></div><div class="w"><div class="al warn" role="status"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/></svg><p>试用期剩余 3 天。<button class="lk">立即续费</button></p><button class="x" aria-label="关闭提示">×</button></div></div><div class="w"><div class="al err" role="alert"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/></svg><p>2 个字段未通过校验，请检查。</p></div></div><button class="b t sm reset" hidden>恢复示例</button></div></div>

<script type="module">
export default function demo(root) {
  // 三条横幅挂载时就常驻显示；关掉的记住不再出现，错误汇总没有关闭按钮
  const reset = root.querySelector('.reset');
  root.querySelectorAll('.al .x').forEach((x) => x.addEventListener('click', () => { x.closest('.w').classList.add('gone'); x.closest('.al').inert = true; reset.hidden = false; reset.focus(); }));
  reset.addEventListener('click', () => { root.querySelectorAll('.w').forEach((w) => { w.classList.remove('gone'); w.firstChild.inert = false; }); reset.hidden = true; });
}
</script>
