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

- 展开宽 220–240px，收起 64px 只留 20px 图标；收起状态要记住，收起后每项有同名 Tooltip 和 aria-label
- 有分组时，收起后每组只留一个图标，悬停或点击在旁边弹出这一组的子菜单，做法见「图标窄栏导航」
- 菜单项高 36–40px，组名 12px 次要文字，组与组之间留 24px 空白，不用分割线
- 当前项用强调浅底 + 强调色文字，并加 aria-current="page"；只有图标时还要有形状标识，不只靠颜色
- 二级菜单最多两层，展开状态用 aria-expanded，当前页所在的组默认展开
- 菜单区单独滚动，账号区或收起按钮固定在底部
- 多个工作区时顶部放切换器，切换后强调色跟着工作区的颜色变
- 菜单项多时顶部加搜索：边输边过滤并高亮命中的字，清空后恢复原顺序和展开状态
- 常用项可以拖到分隔线上方置顶；同一时间只展开一组，展开的子项左侧有一条细引导线，子项依次进场
- 状态点可以缓慢呼吸，角标数字换值时上下滚动；进过该页后角标消失
- 窄于 1024px 收进从左侧滑出的抽屉，由顶栏左侧的菜单按钮打开

## 提示词

给{产品}后台做「侧栏导航」：固定在左侧，展开 232px、可收起到 64px（记住状态，收起后只留图标：单项有同名 Tooltip 和 aria-label，每个分组收成一个图标，悬停或点击在右侧弹出该组子菜单）；菜单按{业务分组}分组，组名 12px 次要文字，组间留 24px；菜单项高 40px，当前项强调浅底 + 强调色文字并加 aria-current="page"；二级菜单用 aria-expanded，当前页所在组默认展开，同时只展开一组；菜单超过约 20 项时顶部加搜索，边输边过滤并高亮命中，清空后恢复原样；菜单区独立滚动，底部固定账号区；窄于 1024px 收进左侧抽屉，由顶栏菜单按钮打开，Esc 或点遮罩关闭。

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
