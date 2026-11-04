---
zh: 侧栏导航
en: Sidebar navigation
order: 10
tab: 侧栏
---

## 是什么

页面左侧的竖向菜单，按业务分组，当前项高亮，可收起成只有图标的窄栏。

## 适合

菜单超过 7 项或有二级菜单的管理后台、工具类产品。

## 不适合

菜单不到 5 项时用顶栏导航，工作区更宽；手机上改左侧抽屉；底部标签栏只适合 App 式产品，后台不用。

## 要点

- 用组件库的竖向菜单：Element Plus el-menu（router、default-active、default-openeds、unique-opened、collapse）+ el-sub-menu / el-menu-item / el-menu-item-group、Naive UI n-menu（options、value、default-expanded-keys、accordion、collapsed、collapsed-width）、Ant Design Vue a-menu mode="inline"（items、selectedKeys、openKeys、inlineCollapsed）放在 a-layout-sider（collapsible、collapsed、collapsedWidth、width、breakpoint）里
- 菜单数据从路由表的 meta（title、icon、hidden）生成，不手写第二份；当前项跟路由走：Element Plus 开 router 或把 default-active 绑到 route.path，Naive UI 的 value、Ant Design Vue 的 selectedKeys 绑路由名，刷新后仍高亮
- 展开宽 220–240px，收起 56–64px 只留图标（collapse / collapsed / inlineCollapsed），收起状态写进本地存储；收起后每组只留一个图标、悬停弹出子菜单是组件自带的，见「图标窄栏导航」
- 分组用组件的分组项（el-menu-item-group、{ type: 'group' }、type: 'group'），组名 12px 次要文字，组与组之间留 24px，不用分割线
- 二级菜单最多两层，当前页所在的组默认展开（default-openeds / default-expanded-keys / openKeys）；同时只展开一组用 unique-opened / accordion，Ant Design Vue 自己维护 openKeys 只留一个
- 菜单项高 36–40px，当前项用强调浅底 + 强调色文字，改组件的主题变量，不在每个菜单项上写样式；只有图标时还要有形状标识，不只靠颜色
- 菜单区单独滚动，账号区和收起按钮固定在底部；n-layout-sider 的 show-trigger、a-layout-sider 的 trigger 自带收起按钮，Element Plus 自己放一个
- 菜单超过约 20 项时顶部加搜索：边输边过滤并高亮命中的字，清空后恢复原顺序和展开状态
- 窄于 1024px 收进从左侧滑出的抽屉（el-drawer direction="ltr"、n-drawer placement="left"、a-drawer placement="left"；Ant Design Vue 也可以用 a-layout-sider 的 breakpoint="lg" collapsedWidth="0"），由顶栏左侧的菜单按钮打开

## 提示词

给{产品}后台做「侧栏导航」：用项目组件库自带的竖向菜单（Element Plus el-menu router :default-active="route.path" :collapse + el-sub-menu / el-menu-item；Naive UI n-menu :options :value :collapsed accordion；Ant Design Vue a-layout-sider collapsible + a-menu mode="inline" :items :selectedKeys :openKeys），不手写菜单。菜单数据从路由表的 meta 生成，当前项跟路由走、刷新后仍高亮；展开 232px、可收起到 64px 只留图标，收起状态记进本地存储，收起后的分组悬停弹出子菜单用组件自带的；按{业务分组}分组，组名 12px 次要文字，组间留 24px；菜单项高 40px，当前项强调浅底 + 强调色文字；二级菜单最多两层，当前页所在组默认展开，同时只展开一组；菜单超过约 20 项时顶部加搜索；菜单区独立滚动，底部固定账号区和收起按钮；窄于 1024px 收进左侧抽屉（el-drawer direction="ltr" / n-drawer placement="left" / a-drawer placement="left"），由顶栏菜单按钮打开。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{padding:12px}
.app{display:flex;width:100%;max-width:560px;height:100%;background:#fff;border:1px solid #e3e6eb;border-radius:10px;overflow:hidden}
.side{flex:none;width:140px;padding:8px;border-right:1px solid #e3e6eb;display:flex;flex-direction:column;gap:2px;overflow:hidden auto;transition:width .24s cubic-bezier(.2,0,0,1)}
.g{margin:2px 8px;font-size:11px;color:#5b616e;white-space:nowrap}
.side a{display:flex;align-items:center;gap:10px;height:30px;padding:0 9px;border-radius:6px;color:#1f2329;text-decoration:none;font-size:13px;white-space:nowrap;transition:background-color .1s}
.side a:hover{background:#f5f6f8}
.side a[aria-current]{background:#edf1ff;color:#3b5bdb;font-weight:600}
.side i{font-style:normal;width:14px;text-align:center;flex:none}
.mini .side{width:48px}
.mini .g{height:1px;margin:8px 4px;background:#e3e6eb;font-size:0}
.mini .side span{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
main{flex:1;min-width:0;padding:12px 16px;display:flex;flex-direction:column;gap:10px}
.top{display:flex;align-items:center;gap:8px;margin-bottom:4px}
.fold{width:28px;height:28px;border:1px solid #e3e6eb;border-radius:6px;background:#fff;display:grid;place-items:center;color:#5b616e}
.fold:hover{color:#1f2329}
.h{font-size:15px}
.ln.w{width:60%}
@media (prefers-reduced-motion:reduce){.side{transition:none}
}
.fold{padding:0}
</style>

<div class="s"><div class="app"><nav class="side" aria-label="主导航"><p class="g">工作台</p><a href="#" aria-current="page"><i>▦</i><span>概览</span></a><a href="#"><i>▤</i><span>订单</span></a><a href="#"><i>◎</i><span>客户</span></a><a href="#"><i>⚙</i><span>设置</span></a></nav><main><div class="top"><button class="fold" aria-label="收起侧栏" aria-expanded="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/></svg></button><b class="h">概览</b></div><i class="ln"></i><i class="ln"></i><i class="ln w"></i></main></div></div>

<script type="module">
export default function demo(root) {
  const app = root.querySelector('.app'), h = root.querySelector('.h'), fold = root.querySelector('.fold'), links = root.querySelectorAll('.side a');
  const name = (a) => a.querySelector('span').textContent;
  links.forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); root.querySelector('[aria-current]').removeAttribute('aria-current'); a.setAttribute('aria-current', 'page'); h.textContent = name(a); }));
  fold.addEventListener('click', () => {
    const mini = app.classList.toggle('mini');
    fold.setAttribute('aria-expanded', String(!mini)); fold.setAttribute('aria-label', mini ? '展开侧栏' : '收起侧栏');
    links.forEach((a) => (mini ? (a.title = name(a)) : a.removeAttribute('title')));
  });
}
</script>
