---
zh: 图标窄栏导航
en: Icon rail
order: 15
---

## 是什么

只有图标的窄导航栏（56–64px）。单个入口靠提示显示名称；有分组时每组只留一个图标，悬停或点击在旁边弹出这一组的子菜单。

## 适合

侧栏收起后的状态；画布、编辑器、看板这类要把宽度让给工作区的工具；一级入口 4–8 个、图标含义清楚的产品。

## 不适合

入口很多、图标含义不直观或用户以新手为主时，用展开的「侧栏导航」；手机上收进抽屉或用底部标签栏。

## 注意

分组再多也只占一列图标，子项放进弹出的子菜单，不平铺成一长串图标。子菜单里是普通导航项，当前页加 aria-current。

## 要点

- 在组件库菜单的收起态基础上做：Element Plus el-menu collapse（子菜单悬停弹出）、Naive UI n-menu collapsed（collapsed-width、collapsed-icon-size）、Ant Design Vue a-menu mode="inline" inlineCollapsed（放在 a-layout-sider collapsedWidth 里）；分组收成一个图标、悬停弹出该组子菜单是它们自带的，不重写
- 宽 56–64px，图标 20px；当前项（或当前页所在的组）用实心强调底 + 白色图标，由路由驱动（default-active / value / selectedKeys）
- 单个入口悬停或聚焦时在旁边显示名称；收起后组件给的提示和每项的无障碍名称核对一遍，缺的用 Tooltip 补
- 子菜单移出后延迟约 200ms 再关（Element Plus hide-timeout、Ant Design Vue subMenuCloseDelay、Naive UI 在 dropdown-props 里设 duration），指针从图标移到子菜单的途中不关；点击可开关，点外面关闭
- 子菜单浮层挂到顶层（Element Plus 一级 el-sub-menu 的 teleported 默认开），不被侧栏的 overflow 裁切，别为了样式改回内嵌；减少动态效果时只淡入
- 编辑器、属性面板类工具可以把窄栏放在右侧，子菜单朝左弹出；同一产品只用一侧
- 和展开的「侧栏导航」互相切换时宽度一次到位，收起状态记住，见「侧栏导航」

## 提示词

给{产品}做「图标窄栏导航」：在项目组件库菜单的收起态上做（Element Plus el-menu collapse；Naive UI n-menu collapsed :collapsed-width="64" :collapsed-icon-size="20"；Ant Design Vue a-layout-sider :collapsedWidth="64" 里放 a-menu mode="inline" inlineCollapsed），不手写菜单。左侧固定 64px，图标 20px，当前项（或当前页所在的组）实心强调底 + 白色图标，当前项由路由驱动（default-active / value / selectedKeys）；{分组，如 内容、用户、系统} 每组只留一个图标，悬停在右侧弹出该组子菜单（组件自带），移出后延迟约 200ms 再关，点击可开关，点外面关闭；单个入口悬停或聚焦时显示名称提示；子菜单浮层挂到顶层不被侧栏裁切；减少动态效果时只淡入。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{padding:10px;place-items:stretch}
.app{position:relative;display:flex;width:100%;max-width:560px;height:100%;margin:0 auto;background:#fff;border:1px solid #e3e6eb;border-radius:10px}
.rail{flex:none;display:flex;flex-direction:column;align-items:center;gap:4px;width:52px;padding:6px 0;border-right:1px solid #e3e6eb;border-radius:10px 0 0 10px;background:#f7f8fa}
.right{flex-direction:row-reverse}
.right .rail{border-right:0;border-left:1px solid #e3e6eb;border-radius:0 10px 10px 0}
.ri{position:relative;display:grid;place-items:center;width:40px;height:40px;padding:0;border:0;border-radius:10px;background:none;color:#5b616e;transition:background-color .1s}
.ri:hover,.ri[aria-expanded="true"]{background:#e9ecf1;color:#1f2329}
.ri[aria-current],.ri.on{background:#3b5bdb;color:#fff}
.ri[data-tip]:hover::after,.ri[data-tip]:focus-visible::after{content:attr(data-tip);position:absolute;z-index:3;left:calc(100% + 8px);top:50%;transform:translateY(-50%);padding:2px 8px;border-radius:6px;background:#1f2329;color:#fff;font-size:12px;line-height:20px;white-space:nowrap;pointer-events:none}
.right .ri[data-tip]:hover::after,.right .ri[data-tip]:focus-visible::after{left:auto;right:calc(100% + 8px)}
.fly{position:absolute;z-index:2;left:58px;display:flex;flex-direction:column;gap:2px;width:140px;padding:4px;border:1px solid #e3e6eb;border-radius:10px;background:#fff;box-shadow:0 10px 24px rgba(16,24,40,.14)}
.right .fly{left:auto;right:58px}
.fly.in{animation:fl .14s cubic-bezier(0,0,.2,1)}
.right .fly.in{animation-name:fr}
@keyframes fl{from{opacity:0;transform:translateX(-4px)}
}
@keyframes fr{from{opacity:0;transform:translateX(4px)}
}
.fh{padding:2px 8px 4px;color:#5b616e;font-size:11px;font-weight:600}
.fly button{display:flex;align-items:center;height:30px;padding:0 8px;border:0;border-radius:6px;background:none;font-size:13px;text-align:left}
.fly button:hover{background:#f2f4f7}
.fly button[aria-current]{background:#edf1ff;color:#2f4ac0;font-weight:600}
main{flex:1;min-width:0;display:flex;flex-direction:column;gap:10px;padding:12px 14px}
.top{display:flex;align-items:center;justify-content:space-between;gap:8px}
.h{font-size:15px}
.ln.w{width:60%}
.msg{margin-top:auto}
@media (prefers-reduced-motion:reduce){.fly.in,.right .fly.in{animation-name:fo}
@keyframes fo{from{opacity:0}
}
}
</style>

<div class="s"><div class="app">
  <nav class="rail" aria-label="主导航">
    <button type="button" class="ri" aria-label="概览" data-tip="概览" data-go="概览"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/></svg></button>
    <button type="button" class="ri gp on" aria-label="内容" aria-expanded="false" aria-controls="rg1"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 3h8l4 4v14H6z M14 3v4h4 M9 12h6 M9 16h6"/></svg></button>
    <div class="fly" id="rg1" role="group" aria-label="内容" hidden><p class="fh">内容</p><button type="button" data-go="文章" aria-current="page">文章</button><button type="button" data-go="专题">专题</button><button type="button" data-go="评论">评论</button></div>
    <button type="button" class="ri gp" aria-label="用户" aria-expanded="false" aria-controls="rg2"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M4.5 20.5a7.5 7.5 0 0 1 15 0"/></svg></button>
    <div class="fly" id="rg2" role="group" aria-label="用户" hidden><p class="fh">用户</p><button type="button" data-go="成员">成员</button><button type="button" data-go="角色">角色</button><button type="button" data-go="权限">权限</button></div>
  </nav>
  <main>
    <div class="top"><b class="h">文章</b><button type="button" class="ctl">放到右侧</button></div>
    <i class="ln"></i><i class="ln"></i><i class="ln w"></i>
    <p class="muted msg" role="status"></p>
  </main>
</div></div>

<script type="module">
export default function demo(root) {
  const app = root.querySelector('.app'), h = root.querySelector('.h'), msg = root.querySelector('.msg'), mode = root.querySelector('.ctl');
  const groups = [...root.querySelectorAll('.gp')];
  const flyOf = (g) => root.getElementById(g.getAttribute('aria-controls'));
  const isRight = () => app.classList.contains('right');
  let openG = null, timer = 0, hoverAt = 0;
  const show = (g, focus) => {
    clearTimeout(timer);
    if (openG && openG !== g) hide();
    const f = flyOf(g);
    if (openG !== g) {
      f.hidden = false; f.classList.remove('in'); void f.offsetWidth; f.classList.add('in');
      f.style.top = `${Math.max(4, Math.min(g.offsetTop - 4, app.clientHeight - f.offsetHeight - 4))}px`; // 靠近底部时向上对齐
      g.setAttribute('aria-expanded', 'true'); openG = g;
    }
    if (focus) (f.querySelector('[aria-current]') ?? f.querySelector('button')).focus();
  };
  const hide = (back) => {
    if (!openG) return;
    clearTimeout(timer);
    const g = openG, inside = flyOf(g).contains(root.activeElement);
    flyOf(g).hidden = true; g.setAttribute('aria-expanded', 'false'); openG = null;
    if (back || inside) g.focus();
  };
  groups.forEach((g) => {
    const f = flyOf(g);
    // 悬停刚打开时紧接着的那次点击不关
    g.addEventListener('click', (e) => { if (openG !== g) show(g, e.detail === 0); else if (performance.now() - hoverAt > 400) hide(); });
    g.addEventListener('keydown', (e) => {
      if (e.key === (isRight() ? 'ArrowLeft' : 'ArrowRight')) { e.preventDefault(); show(g, true); } else if (e.key === 'Escape') hide(true);
    });
    for (const el of [g, f]) {
      el.addEventListener('pointerenter', (e) => { if (e.pointerType !== 'mouse') return; clearTimeout(timer); if (openG !== g) { show(g); hoverAt = performance.now(); } });
      el.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { clearTimeout(timer); timer = setTimeout(() => hide(), 200); } });
    }
    f.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.key === (isRight() ? 'ArrowRight' : 'ArrowLeft')) { e.preventDefault(); hide(true); return; }
      const items = [...f.querySelectorAll('button')], i = items.indexOf(root.activeElement), n = items.length;
      const to = { ArrowDown: (i + 1) % n, ArrowUp: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
      if (to !== undefined) { e.preventDefault(); items[to].focus(); }
    });
    f.addEventListener('focusout', (e) => { if (e.relatedTarget && !f.contains(e.relatedTarget) && e.relatedTarget !== g) hide(); });
  });
  root.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => {
    root.querySelectorAll('[aria-current]').forEach((x) => x.removeAttribute('aria-current'));
    groups.forEach((g) => g.classList.remove('on'));
    b.setAttribute('aria-current', 'page');
    const f = b.closest('.fly');
    if (f) root.querySelector(`[aria-controls="${f.id}"]`).classList.add('on');
    h.textContent = b.dataset.go;
    msg.textContent = `已打开 ${f ? `${f.getAttribute('aria-label')} · ` : ''}${b.dataset.go}`;
    if (f) hide(true);
  }));
  // 点外面关闭，示例外的页面点击也算
  const outside = (e) => {
    if (!root.host.isConnected) { document.removeEventListener('pointerdown', outside); return; }
    if (openG && !e.composedPath().some((n) => n === openG || n === flyOf(openG))) hide();
  };
  document.addEventListener('pointerdown', outside);
  mode.addEventListener('click', () => {
    hide();
    const r = app.classList.toggle('right');
    mode.textContent = r ? '放到左侧' : '放到右侧';
    msg.textContent = r ? '窄栏在右侧，子菜单朝左弹出' : '窄栏在左侧，子菜单朝右弹出';
  });
  setTimeout(() => root.host.isConnected && show(groups[0]), 400);
}
</script>
