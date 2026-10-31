---
zh: 顶栏
en: Top bar
order: 20
tab: 顶栏
---

## 是什么

页面顶部的横条：左边产品名和一级导航，右边搜索、通知和账号头像。

## 适合

放全局高频入口（搜索、通知、账号）；一级菜单少于 5 项时直接当主导航。

## 不适合

主题、语言、密度这类低频设置收进账号菜单；页面级的“新建”“导出”放在页面标题行，不放顶栏。

## 要点

- 用组件库的布局头和横向菜单：Element Plus el-container + el-header（height）+ el-menu mode="horizontal"（router、default-active、ellipsis）、Naive UI n-layout-header（bordered、position）+ n-menu mode="horizontal"（value、responsive）、Ant Design Vue a-layout-header + a-menu mode="horizontal"（selectedKeys、theme）
- 高 56px（紧凑型 48px），吸顶，底部 1px 分割线，或滚动后才出现的浅阴影
- 左：Logo / 产品名 + 最多 5–6 个导航项，当前项由路由驱动；放不下时 Element Plus 的 ellipsis、Naive UI 的 responsive、Ant Design Vue 默认都会把溢出的收成“更多”
- 右：搜索、通知、账号，用「图标按钮」配组件库的 Tooltip 和无障碍名称；主题、语言、密度这类低频设置收进账号的「下拉菜单」
- 通知角标用组件库的徽标：Element Plus el-badge（value、max、is-dot、hidden，show-zero 默认开着要关掉）、Naive UI n-badge（value、max、dot）、Ant Design Vue a-badge（count、overflowCount、dot）；超过 99 显示“99+”，0 不显示，只提示有新内容时用小圆点
- 窄于 768px 只留标题、返回或菜单按钮和最多 1–2 个操作，其余收进菜单；顶部加安全区；手机页的写法见「手机顶栏的八种样式」

## 提示词

给{产品}做「顶栏」：用项目组件库自带的布局头和横向菜单（Element Plus el-header + el-menu mode="horizontal" router；Naive UI n-layout-header bordered + n-menu mode="horizontal" responsive；Ant Design Vue a-layout-header + a-menu mode="horizontal"），不手写导航。高 56px、吸顶，底部 1px 分割线；左侧 Logo 与最多 5 个一级导航，当前项由路由驱动；右侧依次是全局搜索、通知和账号头像菜单，图标按钮都有 Tooltip 和无障碍名称；通知角标用组件库的徽标（el-badge :max="99" :show-zero="false" / n-badge :max="99" / a-badge :overflowCount="99"），超过 99 显示 99+，0 不显示；主题、语言等低频设置收进账号的下拉菜单；窄于 768px 时只留标题、菜单或返回按钮和最多 2 个操作，其余收进菜单，并加顶部安全区。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{padding:12px}
.win{container-type:inline-size;width:100%;max-width:640px;height:100%;display:flex;flex-direction:column;background:#fff;border:1px solid #e3e6eb;border-radius:10px;overflow:hidden}
.bar{flex:none;height:48px;display:flex;align-items:center;gap:2px;padding:0 10px 0 14px;border-bottom:1px solid #e3e6eb}
.logo{font-size:15px;margin-right:12px;white-space:nowrap}
nav{display:flex;align-self:stretch;margin-right:auto;min-width:0}
nav a{display:flex;align-items:center;padding:0 10px;color:#5b616e;text-decoration:none;font-size:13px;border-bottom:2px solid transparent;white-space:nowrap}
nav a:hover{color:#1f2329}
nav a[aria-current]{color:#1f2329;font-weight:600;border-bottom-color:#3b5bdb}
.ic{position:relative;width:34px;height:34px;border:0;border-radius:8px;background:none;color:#5b616e;display:grid;place-items:center}
.ic:hover{background:#f5f6f8;color:#1f2329}
.badge{position:absolute;top:2px;right:0;min-width:16px;height:16px;padding:0 4px;border-radius:8px;background:#d92d20;color:#fff;font-size:10px;line-height:16px;font-variant-numeric:tabular-nums}
.av{width:28px;height:28px;margin-left:6px;border:0;border-radius:50%;background:#edf1ff;color:#3b5bdb;font-size:12px;font-weight:600}
.body{padding:14px 16px;display:grid;gap:10px;align-content:start}
.h{font-size:15px}
.ln.w{width:55%}
@container (max-width:330px){.logo{display:none}
}
</style>

<div class="s"><div class="win"><header class="bar"><b class="logo">MyPrompts</b><nav aria-label="主导航"><a href="#" aria-current="page">概览</a><a href="#">订单</a><a href="#">报表</a></nav><button class="ic" aria-label="搜索"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg></button><button class="ic bell" aria-label="通知，3 条未读"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/></svg><span class="badge" aria-hidden="true">3</span></button><button class="av" aria-label="账号菜单">林</button></header><div class="body"><b class="h">概览</b><i class="ln"></i><i class="ln w"></i></div></div></div>

<script type="module">
export default function demo(root) {
  const h = root.querySelector('.h'), bell = root.querySelector('.bell');
  root.querySelectorAll('nav a').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); root.querySelector('[aria-current]').removeAttribute('aria-current'); a.setAttribute('aria-current', 'page'); h.textContent = a.textContent; }));
  bell.addEventListener('click', () => { const b = bell.querySelector('.badge'); if (b) { b.remove(); bell.setAttribute('aria-label', '通知'); } });
}
</script>
