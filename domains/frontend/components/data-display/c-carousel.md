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

- 3–5 张；有上一张 / 下一张按钮和位置指示（“2 / 4”或圆点），键盘可操作
- 默认不自动播放；确需自动播放时间隔 ≥ 5 秒，悬停、聚焦时暂停，并有可见的暂停按钮
- 用原生横向滚动 + scroll-snap，露出下一张的一部分，提示可以滑动
- 圆点指示：当前点拉长成 20px 左右的胶囊，宽度和位置跟着滑动进度连续变化（读 scrollLeft 插值），松手吸附后停在新的一张
- 一次滑动默认只翻一张；快速甩动可以翻两张，最多两张
- 每张 role="group"、aria-roledescription="幻灯片"，标签写“第 2 张，共 4 张”
- 自动播放时不播报；减少动态效果时关闭自动播放和平滑滚动
- 可选：页面背景跟着当前这张换色，约 400ms 过渡；每张的主色预先写进数据（运行时读跨域图片取色会被浏览器拦下），上面的文字在每种底色上都要达到对比度

## 提示词

为{商品图 / 推荐卡片}做「轮播」，{3–5} 张：用原生横向滚动 + scroll-snap，露出下一张约 14% 暗示可滑；有上一张 / 下一张按钮（键盘可用）和“2 / 4”位置，圆点指示里当前点拉长成胶囊并随滑动进度连续移动；一次滑动翻一张，快速甩动最多翻两张；默认不自动播放，若需要则间隔 5 秒以上，悬停或聚焦时暂停，并有可见的暂停按钮；每张 role="group"、aria-roledescription="幻灯片"、标签“第 2 张，共 4 张”；减少动态效果时不自动播放、不平滑滚动；重要信息不要放在第 2 张以后；如需背景随当前一张换色，主色预先写在数据里，400ms 过渡，文字在每种底色上都满足对比度。

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
