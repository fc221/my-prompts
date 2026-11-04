---
zh: 越靠中间越大
en: Center-weighted carousel
order: 90
---

## 是什么

横向滑动的一排卡片，离可视区中线越近的那张越大越清楚，两边的逐渐缩小变淡；滑动时大小连续变化，松手吸附到某一张居中。

## 适合

团课、套餐、主题皮肤、活动海报这类“一次看一张、左右还想瞄到邻居”的横滑选择。

## 不适合

要并排比较价格、参数时用等大的卡片或表格；条目有几十个时用网格或列表；自动轮播的广告位不需要这种强调。

## 注意

居中只是视觉强调，不等于选中：选中靠点按确认；缩放只动 transform，卡片的布局尺寸和间距不变，邻居不会被挤开。

## 要点

- 缩放按卡片中心到滚动容器可视中线的距离算，不用屏幕中心：距离 0 时为 1，距离一个卡位及以上时 0.82–0.88，中间线性插值；透明度最低 0.6，文字仍可读。
- 卡片中心位置在挂载和尺寸变化时量一次缓存；scroll 里只读 scrollLeft，用 requestAnimationFrame 合并写入，不逐帧读布局。
- 两端留 padding-inline: calc(50% − 卡宽 / 2)，首尾也能居中；间距按缩小后留出的空隙留够，放大的那张不压到邻居。
- scroll-snap-type: x mandatory 配 scroll-snap-align: center；点两侧的卡片先把它滚到中间，点居中的卡片才切换选中（aria-pressed）。
- 卡片是按钮，左右方向键切到上一张 / 下一张并滚到中间，Tab 聚焦到哪张就把哪张滚到中间；滚动停下后用 role="status" 播报居中的那张，滑动途中不播。
- 想把主次拉得更开：居中那张放大并提亮，其余去饱和（saturate 0.6 左右）、略缩小并模糊约 2px；模糊只加在两侧几张上，减少动态效果时去掉。
- 纵向圆柱变体：竖排列表按每项到中线的距离 rotateX（最大约 60°）、缩小并变暗，容器 perspective 600–800px，像在转一个圆柱；用在内容列表时一页只做一处，选日期、时间这类取值场景用「滚轮时间选择」。
- 减少动态效果时不缩放、不变淡，居中那张只加描边，点击跳转不做平滑滚动。

## 提示词

给{横滑卡片区}做「越靠中间越大」：容器 overflow-x: auto + scroll-snap-type: x mandatory，卡片 scroll-snap-align: center，两端 padding-inline: calc(50% − 卡宽 / 2) 让首尾也能居中；按每张卡片中心到容器可视中线的距离设置 scale（居中 1，距离一个卡位及以上 0.85）和透明度（最低 0.6），只动 transform 和 opacity，布局尺寸和间距不变；卡片中心位置在挂载和尺寸变化时缓存，scroll 里只读 scrollLeft、用 requestAnimationFrame 合并写入；点两侧的卡片先滚到中间，点居中的卡片才切换选中（aria-pressed），居中不等于选中；左右方向键和 Tab 聚焦都把对应卡片滚到中间；滚动停下后用 role="status" 播报居中的{卡片名称}；减少动态效果时不缩放，居中那张只加描边，跳转不做平滑滚动。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{display:flex;flex-direction:column;gap:6px;padding:10px 0;background:linear-gradient(#f7f8fc,#eceff7)}
.hd{display:flex;align-items:baseline;justify-content:space-between;gap:8px;padding:0 14px}
.hd b{font-size:15px}
.hd small{color:#667085;font-size:12px;font-variant-numeric:tabular-nums}
.sc{--cw:124px;position:relative;flex:1;min-height:0;display:flex;align-items:center;gap:6px;padding:0 calc(50% - var(--cw) / 2);overflow-x:auto;overscroll-behavior-x:contain;scroll-snap-type:x mandatory;scrollbar-width:none}
.sc::-webkit-scrollbar{display:none}
.cd{--d:1;position:relative;flex:none;display:flex;flex-direction:column;width:var(--cw);height:min(118px,100%);padding:0;border:0;border-radius:14px;background:#fff;text-align:left;overflow:hidden;scroll-snap-align:center;box-shadow:0 8px 18px -10px rgba(30,40,80,.45);transform:scale(calc(1 - .15 * var(--d)));opacity:calc(1 - .4 * var(--d))}
.cd:focus-visible{outline-offset:3px}
.art{position:relative;flex:1;min-height:0}
.a1{background:radial-gradient(circle at 50% 86%,#fff4dc 0 22%,transparent 23%),linear-gradient(#ffd3a1,#ff8c6a)}
.a2{background:radial-gradient(circle at 30% 62%,transparent 0 12%,#fff 13% 16%,transparent 17%),radial-gradient(circle at 70% 62%,transparent 0 12%,#fff 13% 16%,transparent 17%),linear-gradient(135deg,#5b7cfa,#8b5cf6)}
.a3{background:radial-gradient(circle at 50% 55%,transparent 0 20%,rgba(255,255,255,.9) 21% 26%,transparent 27%),linear-gradient(160deg,#5fd3b5,#1f8a80)}
.a4{background:repeating-linear-gradient(120deg,rgba(255,255,255,.2) 0 8px,transparent 8px 20px),linear-gradient(135deg,#ff7a6b,#c2255c)}
.a5{background:radial-gradient(130% 60% at 50% 105%,rgba(255,255,255,.55) 0 45%,transparent 46%),radial-gradient(130% 60% at 50% 125%,rgba(255,255,255,.4) 0 60%,transparent 61%),linear-gradient(#a9cbff,#6b8cf2)}
.a6{background:radial-gradient(circle at 50% 50%,rgba(255,255,255,.8) 0 9%,rgba(255,255,255,.28) 10% 22%,rgba(255,255,255,.12) 23% 34%,transparent 35%),linear-gradient(#8490ff,#3e3a92)}
.tx{padding:6px 10px 8px;line-height:1.35}
.tx b,.tx small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tx b{font-size:13px}
.tx small{color:#667085;font-size:11px}
.ok{position:absolute;right:7px;top:7px;display:none;place-items:center;width:22px;height:22px;border-radius:50%;background:#fff;color:#4338ca;box-shadow:0 2px 6px rgba(0,0,0,.2)}
.ok svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.cd[aria-pressed=true]{box-shadow:0 0 0 2px #4f46e5,0 8px 18px -10px rgba(30,40,80,.45)}
.cd[aria-pressed=true] .ok{display:grid}
.msg{margin:0;min-height:18px;padding:0 14px;color:#475467;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center}
@container (min-height:260px){.sc{--cw:160px;gap:10px}
.cd{height:min(200px,100%);border-radius:18px}
.tx{padding:8px 12px 10px}
.tx b{font-size:15px}
.tx small{font-size:12px}
}
@media (prefers-reduced-motion:reduce){.cd{transform:none;opacity:1}
.cd.mid{box-shadow:0 0 0 2px #98a2b3,0 8px 18px -10px rgba(30,40,80,.45)}
}
</style>

<div class="st"><div class="hd"><b>本周团课</b><small class="cnt">已选 0 节</small></div><div class="sc" aria-label="团课，左右方向键切换"><button type="button" class="cd" aria-pressed="false"><i class="art a1"></i><span class="tx"><b>晨间流瑜伽</b><small>周一 07:30 · 阿青</small></span><i class="ok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg></i></button><button type="button" class="cd" aria-pressed="false"><i class="art a2"></i><span class="tx"><b>动感单车</b><small>周二 19:00 · 大川</small></span><i class="ok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg></i></button><button type="button" class="cd" aria-pressed="false"><i class="art a3"></i><span class="tx"><b>普拉提核心</b><small>周三 12:15 · 小满</small></span><i class="ok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg></i></button><button type="button" class="cd" aria-pressed="false"><i class="art a4"></i><span class="tx"><b>搏击燃脂</b><small>周四 19:30 · 老岳</small></span><i class="ok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg></i></button><button type="button" class="cd" aria-pressed="false"><i class="art a5"></i><span class="tx"><b>拉伸放松</b><small>周五 20:30 · 阿青</small></span><i class="ok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg></i></button><button type="button" class="cd" aria-pressed="false"><i class="art a6"></i><span class="tx"><b>冥想呼吸</b><small>周六 09:00 · 一苇</small></span><i class="ok"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg></i></button></div><p class="msg" role="status">左右滑动，点居中的课程报名</p></div>

<script type="module">
export default function demo(root) {
  const sc = root.querySelector('.sc'), cards = [...sc.querySelectorAll('.cd')], msg = root.querySelector('.msg'), cnt = root.querySelector('.cnt');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let C = [], gap = 1, raf = 0, cur = 0, tgt = 0, said = 0, quiet;
  const name = (i) => cards[i].querySelector('b').textContent + ' · ' + cards[i].querySelector('small').textContent;
  // 只读 scrollLeft，和缓存的卡片中心比距离；scale 由 CSS 按 --d 算
  const paint = () => {
    raf = 0;
    const mid = sc.scrollLeft + sc.clientWidth / 2;
    let best = 0;
    C.forEach((x, i) => { const d = Math.abs(x - mid); cards[i].style.setProperty('--d', Math.min(1, d / gap).toFixed(3)); if (d < Math.abs(C[best] - mid)) best = i; });
    cur = best; cards.forEach((c, i) => c.classList.toggle('mid', i === best));
  };
  const measure = () => { C = cards.map((c) => c.offsetLeft + c.offsetWidth / 2); gap = C[1] - C[0] || 1; paint(); };
  const go = (i) => (tgt = i, sc.scrollTo({ left: C[i] - sc.clientWidth / 2, behavior: still ? 'auto' : 'smooth' }));
  sc.addEventListener('scroll', () => {
    if (!raf) raf = requestAnimationFrame(paint);
    // 停下 160ms 后才播报居中的那张，滑动途中不播
    clearTimeout(quiet); quiet = setTimeout(() => { tgt = cur; if (cur !== said) { said = cur; msg.textContent = '居中：' + name(cur); } }, 160);
  }, { passive: true });
  cards.forEach((c, i) => c.addEventListener('click', () => {
    if (i !== cur) return go(i); // 两侧的先滚到中间，居中的才算选
    const on = c.getAttribute('aria-pressed') !== 'true';
    c.setAttribute('aria-pressed', String(on));
    cnt.textContent = `已选 ${cards.filter((k) => k.getAttribute('aria-pressed') === 'true').length} 节`;
    msg.textContent = (on ? '已报名 ' : '已取消 ') + name(i);
  }));
  sc.addEventListener('focusin', (e) => { const i = cards.indexOf(e.target); if (i >= 0 && i !== cur) go(i); });
  sc.addEventListener('keydown', (e) => {
    const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!k) return;
    e.preventDefault(); cards[Math.max(0, Math.min(cards.length - 1, tgt + k))].focus({ preventScroll: true });
  });
  new ResizeObserver(measure).observe(sc);
  measure();
  // 演示：从第一张滑到第三张居中
  setTimeout(() => { if (root.host.isConnected) go(2); }, 400);
}
</script>
