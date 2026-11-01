---
zh: 轮播
en: Carousel
order: 140
---

## 是什么

同一位置轮流显示几张图片或卡片，带左右箭头和“2 / 4”的位置指示。

## 适合

内容同等重要、只看第一张也不吃亏的场景：商品图集、作品集、横滑的推荐卡片。

## 不适合

大多数人只看第一张，重要信息别放进首页焦点图，改用静态主视觉或平铺卡片；需要阅读的文字不要放进自动轮播。

## 要点

- 用组件库的轮播：Element Plus el-carousel + el-carousel-item（autoplay、interval、arrow、indicator-position、trigger、type="card"、pause-on-hover、change 事件）、Naive UI n-carousel（autoplay、interval、show-arrow、show-dots、dot-type、draggable、keyboard、slides-per-view、space-between、centered-slides、on-update:current-index）、Ant Design Vue a-carousel（autoplay、dots、dotPosition、effect、afterChange；没有现成箭头，自己放两个按钮调它的 prev() / next()）；不手写滚动容器和吸附
- 3–5 张；上一张 / 下一张按钮和位置指示：Element Plus arrow="always"，Naive UI show-arrow，Ant Design Vue 自己放；圆点用组件的指示器，“2 / 4”文字用 change / on-update:current-index / afterChange 给的索引写
- 默认不自动播放：Element Plus 默认 autoplay 为 true、间隔 3000，要显式 :autoplay="false"；Naive UI、Ant Design Vue 默认关。确需自动播放时 interval ≥ 5000，悬停、聚焦时暂停（Element Plus pause-on-hover 默认开），并有可见的暂停按钮
- 露出下一张的一部分提示可滑：Naive UI slides-per-view="auto" + space-between + centered-slides，Element Plus type="card"；Ant Design Vue 没有现成的
- 触屏滑动和一次翻一张由组件处理：Naive UI 鼠标拖还要开 draggable，键盘开 keyboard；Element Plus 文档里没有手势属性，手机端先验证能否滑动
- 自动播放时不播报；减少动态效果时关闭自动播放（autoplay 绑定媒体查询的结果）；重要信息不要放在第 2 张以后
- 可选：页面背景跟着当前这张换色，每张的主色预先写进数据（运行时读跨域图片取色会被浏览器拦下），上面的文字在每种底色上都要达到对比度

## 提示词

为{商品图 / 推荐卡片}做「轮播」，{3–5} 张：用项目组件库自带的轮播（Element Plus el-carousel :autoplay="false" arrow="always" + el-carousel-item；Naive UI n-carousel show-arrow show-dots draggable keyboard；Ant Design Vue a-carousel dots + 自己放的上一张 / 下一张按钮调 prev() / next()），不手写滚动容器。有上一张 / 下一张按钮和“2 / 4”位置文字（用 change / on-update:current-index / afterChange 的索引写）；露出下一张一部分暗示可滑（Naive UI slides-per-view="auto" + space-between，Element Plus type="card"）；默认不自动播放，若需要则 interval 5000 以上，悬停或聚焦时暂停，并有可见的暂停按钮；减少动态效果时不自动播放；重要信息不要放在第 2 张以后；如需背景随当前一张换色，主色预先写在数据里，文字在每种底色上都满足对比度。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.car{width:100%;max-width:480px;display:grid;gap:8px}
.tr{display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;scrollbar-width:none;border-radius:12px}
.sl{flex:0 0 86%;height:112px;scroll-snap-align:start;padding:14px 18px;border-radius:12px;color:#fff;display:flex;flex-direction:column;justify-content:flex-end}
.sl b{font-size:18px}
.sl span{font-size:13px}
.ctl{display:flex;align-items:center;gap:6px}
.n{margin-right:auto;font-size:12px;color:#5b616e;font-variant-numeric:tabular-nums}
.ar{width:32px;height:32px;border:1px solid #e3e6eb;border-radius:50%;background:#fff;font-size:18px;line-height:1}
.ar:hover{border-color:#c4c9d2}
@media (prefers-reduced-motion:reduce){.tr{scroll-behavior:auto}
}
</style>

<div class="s"><div class="car" role="region" aria-roledescription="轮播" aria-label="新品推荐"><div class="tr" aria-live="off"><div class="sl" role="group" aria-roledescription="幻灯片" aria-label="第 1 张，共 4 张" style="background:linear-gradient(135deg,#2f4ac0,#5b77e6)"><b>春季新品</b><span>轻薄外套 8 折</span></div><div class="sl" role="group" aria-roledescription="幻灯片" aria-label="第 2 张，共 4 张" style="background:linear-gradient(135deg,#0f6b4d,#1f8a63)"><b>会员日</b><span>满 199 减 30</span></div><div class="sl" role="group" aria-roledescription="幻灯片" aria-label="第 3 张，共 4 张" style="background:linear-gradient(135deg,#8f3a07,#b8540d)"><b>以旧换新</b><span>最高抵 500 元</span></div><div class="sl" role="group" aria-roledescription="幻灯片" aria-label="第 4 张，共 4 张" style="background:linear-gradient(135deg,#1f2329,#4a5160)"><b>新店开业</b><span>到店领取小礼物</span></div></div><div class="ctl"><span class="n">1 / 4</span><button class="b sm pp">暂停</button><button class="ar pv" aria-label="上一张">‹</button><button class="ar nx" aria-label="下一张">›</button></div></div></div>

<script type="module">
export default function demo(root) {
  const tr = root.querySelector('.tr'), sl = [...tr.children], n = root.querySelector('.n'), pp = root.querySelector('.pp'), car = root.querySelector('.car');
  let i = 0, play = !matchMedia('(prefers-reduced-motion: reduce)').matches, hold = false;
  const go = (k) => { i = (k + sl.length) % sl.length; tr.scrollTo({ left: sl[i].offsetLeft - sl[0].offsetLeft }); };
  tr.addEventListener('scroll', () => { i = Math.round(tr.scrollLeft / (sl[1].offsetLeft - sl[0].offsetLeft)); n.textContent = (i + 1) + ' / ' + sl.length; }, { passive: true });
  root.querySelector('.pv').addEventListener('click', () => go(i - 1));
  root.querySelector('.nx').addEventListener('click', () => go(i + 1));
  const sync = () => { pp.textContent = play ? '暂停' : '播放'; pp.setAttribute('aria-label', play ? '暂停自动播放' : '开始自动播放'); tr.setAttribute('aria-live', play ? 'off' : 'polite'); };
  pp.addEventListener('click', () => { play = !play; sync(); });
  car.addEventListener('pointerenter', () => (hold = true)); car.addEventListener('pointerleave', () => (hold = false));
  car.addEventListener('focusin', () => (hold = true)); car.addEventListener('focusout', () => (hold = false));
  const tick = () => { if (!root.host.isConnected) return; if (play && !hold) go(i + 1); setTimeout(tick, 5000); };
  setTimeout(tick, 5000); sync();
}
</script>
