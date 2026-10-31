---
zh: 大标题收成导航栏
en: Collapsing large title
order: 10
---

## 是什么

列表页顶部是一行大号标题，上面是一条空着的紧凑导航栏。往上滚时大标题跟着内容滚走，完全躲进导航栏后，导航栏中间淡入同名的小标题，底边出现一条细分隔线；滚回顶部再反过来。

## 适合

一级页面的长列表：收藏夹、清单、联系人、订阅、植物或宠物档案这类“进来先看清自己在哪，往下翻时把空间让给内容”的页面。

## 不适合

二级详情页直接用常规导航栏标题；标题下面还挂着搜索框、筛选这类要常驻的控件时，用「分组标题依次顶住」那种多层吸顶；内容只有一屏时不需要收起，大标题一直显示。

## 注意

大标题和小标题是同一个标题的两种样子：读屏只认大标题那个 h1，小标题 aria-hidden；收起状态只看大标题有没有躲进导航栏，用 IntersectionObserver 判断，不在 scroll 里逐帧算透明度。

## 要点

- 导航栏 44px，大标题 28–32px、加粗，左对齐，和列表的左边距对齐；导航栏的小标题 15–17px、居中。
- 观察大标题：IntersectionObserver 的 rootMargin 顶部收进导航栏高度，大标题不再相交而且在上方时进入收起状态，反之展开。
- 进入收起状态：小标题 160ms 淡入并上移 4px，导航栏底边同时出现 1px 分隔线；展开时反向，不改变导航栏高度，内容不跳。
- 停在大标题区中间时吸附到完全展开或完全收起：滚动容器 scroll-snap-type: y proximity，大标题区的顶部和底部各放一个吸附点（scroll-padding-top 等于导航栏高度），列表部分不吸附。
- 收起后点导航栏的小标题平滑回到顶部；小标题按钮在展开时 visibility: hidden，不被 Tab 聚焦，名称写“回到顶部”。
- 导航栏两侧的按钮（新建、编辑）两种状态下位置不变，点按区域 ≥ 44×44px。
- 想要更连贯时可改用连续版本：大标题本身缩到约 0.55 倍、横移到导航栏中间并上移，导航栏底色的透明度一起变化，四者挂在同一个滚动进度上（animation-timeline: scroll()，不支持时在 rAF 里按 scrollTop 算），往回滚严格还原；这时不再另外淡入小标题。默认仍用上面的淡入版本，它更省也更稳。
- 减少动态效果时小标题和分隔线直接出现，回到顶部不做平滑滚动；回到顶部用 role="status" 播报一次。

## 提示词

给{列表页}做「大标题收成导航栏」：顶部 44px 导航栏下面是 30px 加粗、左对齐的大标题（h1）和一行{副标题}；往上滚时大标题跟着内容滚走，用 IntersectionObserver（rootMargin 顶部收进导航栏高度）观察 h1，h1 完全躲进导航栏后，导航栏中间的 16px 小标题 160ms 淡入、上移 4px，底边出现 1px 分隔线，滚回去再反向，不在 scroll 里逐帧算；小标题 aria-hidden，读屏只有一个 h1；滚动容器设 scroll-snap-type: y proximity，大标题区顶部和底部各放一个吸附点（scroll-padding-top 等于导航栏高度），停在中间时吸附到完全展开或完全收起，列表部分不吸附；收起后点小标题平滑回到顶部（按钮名称“回到顶部”，展开时 visibility: hidden 不可聚焦），用 role="status" 播报一次；导航栏两侧按钮位置不变；减少动态效果时直接切换，不做平滑滚动。若选连续版本：大标题的缩放（1 → 约 0.55）、横移到导航栏中间、上移和导航栏底色透明度都挂在同一个滚动进度上（animation-timeline: scroll()，不支持时在 rAF 里按 scrollTop 计算），往回滚严格还原，不再单独淡入小标题。

## 示例

<link rel="stylesheet" href="../../_shared/app-scroll-base.css">
<style>
.st{background:#e9ecf1}
.scr{position:relative;height:100%;max-width:400px;margin:0 auto;background:#fbfaf6;overflow:hidden;--nb:44px}
.bar{position:absolute;left:0;right:0;top:0;z-index:2;display:grid;grid-template-columns:44px minmax(0,1fr) 44px;align-items:center;height:var(--nb);padding:0 6px;background:rgba(251,250,246,.9);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);transition:box-shadow .16s}
.on .bar{box-shadow:0 1px 0 #e3e1da}
.top{grid-column:2;justify-self:center;max-width:100%;height:36px;padding:0 10px;border:0;border-radius:8px;background:none;font-size:16px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;visibility:hidden;opacity:0;transform:translateY(4px);transition:opacity .16s,transform .16s,visibility 0s .16s}
.on .top{visibility:visible;opacity:1;transform:none;transition:opacity .16s,transform .16s}
.add{grid-column:3;display:grid;place-items:center;width:44px;height:44px;padding:0;border:0;border-radius:50%;background:none;color:#2f7a4b}
.add svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round}
.pg{height:100%;overflow-y:auto;overscroll-behavior:contain;padding-top:var(--nb);scroll-padding-top:var(--nb);scroll-snap-type:y proximity;scrollbar-width:none;outline-offset:-2px}
.pg::-webkit-scrollbar{display:none}
.lt{padding:2px 16px 10px;scroll-snap-align:start}
h1{margin:0;font-size:30px;line-height:1.15;letter-spacing:.01em}
.lt p{margin:2px 0 0;color:#6b6f66;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mk{display:block;height:0;scroll-snap-align:start}
.ls{list-style:none;margin:0;padding:0 0 12px}
.ls li{display:flex;align-items:center;gap:12px;height:56px;padding:0 16px}
.ls li+li span{box-shadow:0 -1px #ecebe5}
.ls span{flex:1;min-width:0;align-self:stretch;display:flex;align-items:center;gap:8px}
.ls span>i{flex:1;min-width:0;font-style:normal}
.ls b,.ls small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ls b{font-weight:500;line-height:1.3}
.ls small{color:#80847a;font-size:11px;line-height:1.3}
.pl{position:relative;flex:none;width:40px;height:40px;border-radius:12px;background:hsl(var(--h) 42% 91%)}
.pl::before{content:"";position:absolute;left:8px;top:5px;width:24px;height:21px;background:radial-gradient(ellipse 34% 62% at 30% 58%,hsl(var(--h) 46% 38%) 0 97%,transparent 100%),radial-gradient(ellipse 32% 58% at 72% 52%,hsl(var(--h) 50% 48%) 0 97%,transparent 100%),radial-gradient(ellipse 22% 50% at 52% 40%,hsl(var(--h) 52% 56%) 0 97%,transparent 100%)}
.pl::after{content:"";position:absolute;left:12px;bottom:6px;width:16px;height:11px;border-radius:2px;background:#c47a52;clip-path:polygon(0 0,100% 0,84% 100%,16% 100%)}
.tag{flex:none;height:22px;font-style:normal;padding:0 8px;border-radius:11px;background:#efeee8;color:#5d6158;font-size:11px;line-height:22px;white-space:nowrap}
.tag.w{background:#e3effc;color:#1f5fa8;font-weight:600}
@container (max-height:230px){.scr{--nb:40px}
.bar{grid-template-columns:40px minmax(0,1fr) 40px}
.add{width:40px;height:40px}
h1{font-size:27px}
.ls li{height:50px}
}
@container (max-width:320px){.ls li{gap:10px;padding:0 12px}
.lt{padding-left:12px;padding-right:12px}
}
</style>

<div class="st"><div class="scr"><header class="bar"><button type="button" class="top" aria-label="回到顶部"><span aria-hidden="true">我的植物</span></button><button type="button" class="add" aria-label="添加植物"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button></header><div class="pg" tabindex="0" aria-label="植物列表"><div class="lt"><h1>我的植物</h1><p>10 盆 · 今天有 3 盆要浇水</p></div><i class="mk" aria-hidden="true"></i><ul class="ls"></ul></div><p class="sr" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const scr = root.querySelector('.scr'), bar = root.querySelector('.bar'), pg = root.querySelector('.pg'), lt = root.querySelector('.lt'), h1 = root.querySelector('h1'), msg = root.querySelector('[role=status]');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const P = [['龟背竹', '客厅 · 东窗', 0, 150], ['虎皮兰', '卧室 · 书桌', 10, 95], ['琴叶榕', '客厅 · 落地窗', 0, 120], ['绿萝', '厨房 · 冰箱顶', 2, 105], ['多肉拼盆', '阳台 · 南侧', 0, 80], ['文竹', '书房 · 窗台', 4, 135], ['鹿角蕨', '浴室 · 墙面', 1, 160], ['橡皮树', '玄关', 6, 140], ['薄荷', '阳台 · 花架', 1, 125], ['茉莉', '阳台 · 花架', 3, 110]];
  root.querySelector('.ls').innerHTML = P.map(([n, w, d, h]) => `<li><i class="pl" style="--h:${h}" aria-hidden="true"></i><span><i><b>${n}</b><small>${w}</small></i><em class="tag${d ? '' : ' w'}">${d ? (d === 1 ? '明天浇水' : d + ' 天后浇水') : '今天浇水'}</em></span></li>`).join('');
  // 大标题完全躲进导航栏（不再相交且在上方）= 收起
  new IntersectionObserver(([e]) => scr.classList.toggle('on', !e.isIntersecting && e.boundingClientRect.top < e.rootBounds.top), { root: pg, rootMargin: `-${bar.offsetHeight}px 0px 0px 0px` }).observe(h1);
  root.querySelector('.top').addEventListener('click', () => { pg.scrollTo({ top: 0, behavior: still ? 'auto' : 'smooth' }); pg.focus({ preventScroll: true }); msg.textContent = '已回到顶部'; });
  root.querySelector('.add').addEventListener('click', () => { msg.textContent = '示例：这里会打开“添加植物”'; });
  // 缩略图：滚过大标题，停在已收起的状态
  setTimeout(() => { if (root.host.isConnected) pg.scrollTo({ top: lt.offsetHeight + 60, behavior: still ? 'auto' : 'smooth' }); }, 300);
}
</script>
