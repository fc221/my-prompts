---
zh: 底部标签栏
en: Bottom tab bar
aka: 底部导航 tab bar
order: 80
---

## 是什么

手机屏幕底部一排 3–5 个“图标 + 文字”的入口，用来切换几个主要板块。

## 适合

移动端 H5、App 式页面的一级导航。

## 不适合

入口超过 5 个时把次要的收进“我的”或分类页；桌面端用侧栏或顶栏；“发布”“支付”这类动作不要放进标签栏。

## 要点

- 在组件库标签页或横向菜单的基础上做：按板块切换页面内容时把标签页放到底部（Element Plus el-tabs tab-position="bottom" stretch、Naive UI n-tabs placement="bottom" justify-content="space-evenly"、Ant Design Vue a-tabs tabPosition="bottom" centered），按路由跳转时用横向菜单（el-menu mode="horizontal" router、n-menu mode="horizontal"、a-menu mode="horizontal"）；三家都没有现成的底部标签栏，图标在上、文字在下和等分宽度靠样式覆盖
- 高 48–56px，另加 env(safe-area-inset-bottom) 底部安全区
- 3–5 项等分宽度，每项 24px 图标 + 12px 文字，图文都要有
- 当前项强调色 + 实心图标，其余次要文字色 + 线框图标，不只靠颜色区分
- 角标用组件库的徽标（el-badge value max is-dot、n-badge value max dot、a-badge count overflowCount dot），超过 99 显示“99+”，只提示有新内容时用小圆点
- 切换时保留每个板块的滚动位置和状态（Naive UI 面板设 display-directive="show"，Ant Design Vue 不开 destroyInactiveTabPane，路由方案用 keep-alive）；再次点当前项回到顶部
- 进入二级页面后隐藏，返回一级页面再出现；软键盘弹出时不跟着顶起

## 提示词

给{H5 / App 式页面}做「底部标签栏」：在项目组件库的标签页或横向菜单上做（切换页面内容：Element Plus el-tabs tab-position="bottom" stretch / Naive UI n-tabs placement="bottom" justify-content="space-evenly" / Ant Design Vue a-tabs tabPosition="bottom" centered；按路由跳转：el-menu / n-menu / a-menu mode="horizontal"），切换和当前项用组件的，外观靠样式覆盖。{3–5} 个一级入口等分宽度，高 56px 并加 env(safe-area-inset-bottom)；每项 24px 图标 + 12px 文字，当前项强调色 + 实心图标（其余线框图标）；消息角标用组件库的徽标（el-badge / n-badge / a-badge），超过 99 显示 99+，只提示新内容用小圆点；切换时保留各板块的滚动位置和状态，再点当前项回到顶部；进入二级页面时隐藏；软键盘弹出时不顶起；桌面宽度改为侧栏或顶栏。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{padding:10px}
.ph{position:relative;width:min(232px,100%);height:100%;display:flex;flex-direction:column;background:#fff;border:1px solid #e3e6eb;border-radius:18px;overflow:hidden}
.nb{flex:none;height:40px;display:grid;place-items:center;font-size:15px;font-weight:600;border-bottom:1px solid #eef0f3}
.ct{flex:1;padding:12px 14px;display:grid;gap:8px;align-content:start}
.ln.w{width:60%}
.tab{flex:none;display:flex;padding-bottom:calc(6px + env(safe-area-inset-bottom));border-top:1px solid #e3e6eb;background:#fff}
.tab a{flex:1;display:flex;flex-direction:column;align-items:center;gap:1px;min-height:50px;padding-top:6px;color:#5b616e;text-decoration:none;font-size:10px}
.tab svg{display:block;width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linejoin:round}
.tab a[aria-current]{color:#3b5bdb}
.tab a[aria-current] svg{fill:currentColor}
.tab a[aria-current] svg :not(:first-child){stroke:#fff}
.ico{position:relative;display:block}
.bd{position:absolute;top:-4px;left:14px;min-width:16px;height:16px;padding:0 4px;border-radius:8px;background:#d92d20;color:#fff;font:600 10px/16px system-ui;font-variant-numeric:tabular-nums}
</style>

<div class="s"><div class="ph"><div class="nb">首页</div><div class="ct"><i class="ln"></i><i class="ln"></i><i class="ln w"></i></div><nav class="tab" aria-label="主导航"><a href="#" aria-current="page"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5 12 4l8 6.5V20h-5v-6H9v6H4z"/></svg>首页</a><a href="#"><span class="ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H10l-4 4v-4H4z"/></svg><b class="bd">12<span class="sr">条未读</span></b></span>消息</a><a href="#"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="m15 9-2 4-4 2 2-4z"/></svg>发现</a><a href="#"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c1-4 4-6 8-6s7 2 8 6z"/></svg>我的</a></nav></div></div>

<script type="module">
export default function demo(root) {
  const nb = root.querySelector('.nb');
  root.querySelectorAll('.tab a').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault(); root.querySelector('[aria-current]').removeAttribute('aria-current'); a.setAttribute('aria-current', 'page');
    nb.textContent = a.lastChild.textContent; const bd = a.querySelector('.bd'); if (bd) bd.remove();
  }));
}
</script>
