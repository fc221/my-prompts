---
zh: 代码透视镜
en: Code lens reveal
aka: X光镜头 线框透视 界面透视 镜头揭示 x-ray
order: 70
---

## 是什么

指针处有一个圆形镜头，镜头里看到的是同一个界面的线框和代码，每块内容都在原位变成了标注；镜头外还是做好的成品。

## 适合

开发者工具、组件库、低代码平台的首屏，想说明“好看的界面背后是干净的结构”；技术文章里讲解页面结构。

## 不适合

同一张图放大看细节用「放大镜透镜」；擦掉就留痕的刮开互动用「指针擦出另一张图」；两个版本整张对比用「拖动对比前后」。

## 注意

镜头内外必须严丝合缝：线框层克隆成品的结构，只换皮，文字换成代码时保留原来的盒子，窗口怎么变都对得上。

## 要点

- 两层叠放：成品在下，线框层在上，线框层 clip-path: circle(r at x y)；x、y 放在 CSS 变量里，pointermove 用 requestAnimationFrame 合并，每帧只改变量。
- 镜头直径 130–180px，外圈单独一个空元素画白边和阴影，看得出是一块镜片；位置不加缓动，紧跟指针。
- 线框层 inert 加 aria-hidden，成品里的按钮和链接在镜头下面照常能点。
- 克隆里原文字设为透明，标注写在 ::after 的绝对定位里，每块一行 11px 等宽字；虚线框配深色蓝图底，和成品形成强对比。
- 鼠标移入淡入、移出淡出（120ms）。
- 触屏按住才出现，镜头放在手指上方（半径 + 16px）；画框 touch-action: none，所以高度控制在屏幕一半以内。
- 画框可聚焦：聚焦时出现镜头，方向键移动 10px，Shift 30px，Esc 收起。
- 另给“全部透视”按钮，半径涨到盖满画框（约 360ms），键盘、触屏、想看全貌的人都用得上；结果用 role="status" 播报。
- 减少动态效果时半径直接切换，不做自动滑动。

## 提示词

给{首屏产品示意}做「代码透视镜」：用同一份结构叠两层，成品在下，线框层在上；线框层由成品 DOM 克隆而来，原文字设为透明以保留盒子，每块用 ::after 写一行 11px 等宽的{代码标注}，虚线框配深色蓝图底，层上加 inert 和 aria-hidden，成品里的按钮照常能点；线框层用 clip-path: circle(r at x y) 只露出指针处直径 {150}px 的圆，x、y 放在 CSS 变量里，pointermove 用 requestAnimationFrame 合并，镜头紧跟指针，外圈单独一个元素画白边和阴影；鼠标移入淡入、移出淡出 120ms；触屏按住才出现，镜头放在手指上方（半径 + 16px），画框 touch-action: none；画框可聚焦，聚焦时出现镜头，方向键移动 10px、Shift 30px，Esc 收起；另给“全部透视”按钮，半径 360ms 涨到盖满画框，再点收回，用 role="status" 播报；减少动态效果时半径直接切换。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:10px;background:#e7e9f0}
.fr{--x:50%;--y:50%;--r0:64px;--r:var(--r0);position:relative;height:100%;border-radius:12px;overflow:hidden;touch-action:none;cursor:crosshair;background:#fff;box-shadow:0 1px 3px rgba(20,24,40,.12)}
.fr:focus-visible{outline-offset:-2px}
.ui{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);grid-template-rows:30px minmax(0,1fr);gap:0 12px;height:100%;padding:0 14px 12px;background:linear-gradient(170deg,#fff7ee,#fff)}
.nav{grid-column:1/-1;display:flex;align-items:center;justify-content:space-between;font-size:12px;font-weight:700;color:#2a2438}
.nav span{color:#5e5870;font-weight:500}
.hero{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:6px;min-width:0}
.h{margin:0;font-size:19px;line-height:1.25;font-weight:800;color:#2a2438}
.p{margin:0;color:#5e5870;font-size:12px;line-height:1.4}
.cta{height:30px;padding:0 12px;border:0;border-radius:8px;background:#e8590c;color:#fff;font-size:12px;font-weight:600}
.pic{align-self:center;height:calc(100% - 8px);min-height:0;border-radius:12px;background:radial-gradient(circle at 70% 25%,#ffd27a,transparent 42%),linear-gradient(150deg,#ff9a62,#d6336c 60%,#5f3dc4)}
.bp{position:absolute;inset:0;background:#0d1a2d linear-gradient(rgba(125,211,252,.08) 1px,transparent 1px) 0 0/100% 16px;clip-path:circle(var(--r) at var(--x) var(--y));opacity:0;transition:opacity .12s}
.bp.on{opacity:1}
.bp [data-c]{position:relative;color:transparent;background:none;border-radius:4px;outline:1px dashed #38bdf8;outline-offset:-1px}
.bp [data-c]::after{content:attr(data-c);position:absolute;inset:0;padding:2px 5px;overflow:hidden;color:#7dd3fc;font:500 11px/1.35 ui-monospace,SFMono-Regular,Menlo,monospace;text-align:left;white-space:pre-wrap;word-break:break-all}
.bp .nav span,.bp .logo{color:transparent}
.ring{position:absolute;left:0;top:0;width:calc(var(--r) * 2);height:calc(var(--r) * 2);margin:calc(var(--r) * -1) 0 0 calc(var(--r) * -1);border-radius:50%;box-shadow:0 0 0 2px #fff,0 0 0 3px rgba(13,26,45,.35),0 8px 20px rgba(13,26,45,.3);transform:translate(var(--x),var(--y));pointer-events:none;opacity:0;transition:opacity .12s}
.ring.on{opacity:1}
.all{position:absolute;right:18px;bottom:18px}
.all.ctl{height:28px;padding:0 10px;font-size:12px}
@container (min-height:260px){.st{padding:14px}
.fr{--r0:88px}
.ui{grid-template-rows:42px minmax(0,1fr);gap:0 22px;padding:0 24px 20px}
.nav{font-size:14px}
.hero{gap:10px}
.h{font-size:32px}
.p{font-size:14px}
.cta{height:38px;padding:0 18px;font-size:14px}
.all{right:26px;bottom:26px}
.all.ctl{height:32px;padding:0 14px;font-size:13px}
}
</style>

<div class="st"><div class="fr" tabindex="0" role="group" aria-label="成品页面，聚焦后用方向键移动透视镜，Esc 收起"><div class="ui"><div class="nav" data-c="<nav class=&quot;top&quot;>"><b class="logo">MyPrompts</b><span>模板 · 定价</span></div><div class="hero"><h4 class="h" data-c="<h1>{title}</h1>">把灵感存成模板</h4><p class="p" data-c="<p class=sub>">下次打开，直接复用</p><button type="button" class="cta" data-c="<button>">免费开始</button></div><div class="pic" role="img" aria-label="渐变插画" data-c="<img src=&quot;hero.avif&quot; loading=&quot;eager&quot; alt=&quot;&quot;>"></div></div><i class="ring" aria-hidden="true"></i></div><button type="button" class="ctl all" aria-pressed="false">全部透视</button><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const fr = root.querySelector('.fr'), ui = fr.querySelector('.ui'), ring = fr.querySelector('.ring'), all = root.querySelector('.all'), say = root.querySelector('[role=status]');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // 线框层是成品的克隆：盒子一模一样，只换皮和文字，所以镜头内外严丝合缝
  const bp = ui.cloneNode(true);
  bp.className = 'ui bp'; bp.inert = true; bp.setAttribute('aria-hidden', 'true');
  bp.querySelectorAll('[role=img]').forEach((n) => { n.removeAttribute('role'); n.removeAttribute('aria-label'); });
  fr.insertBefore(bp, ring);
  let P = { x: 0, y: 0 }, lift = 0, raf = 0, glide = 0, tween = 0, open = false;
  const paint = () => { fr.style.setProperty('--x', P.x + 'px'); fr.style.setProperty('--y', P.y - lift + 'px'); };
  const req = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; if (root.host.isConnected) paint(); }); };
  const show = (x, y, up = 0) => { P = { x: Math.max(0, Math.min(fr.clientWidth, x)), y: Math.max(0, Math.min(fr.clientHeight, y)) }; lift = up; bp.classList.add('on'); ring.classList.add('on'); req(); };
  const hide = () => { if (open) return; bp.classList.remove('on'); ring.classList.remove('on'); };
  const at = (e) => { const r = fr.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const size = () => parseFloat(getComputedStyle(fr).getPropertyValue('--r0'));
  fr.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'mouse') { cancelAnimationFrame(glide); show(...at(e)); }
    else if (fr.hasPointerCapture(e.pointerId)) show(...at(e), size() + 16); // 触屏：镜头放在手指上方
  });
  fr.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') hide(); });
  fr.addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse') return; cancelAnimationFrame(glide); fr.setPointerCapture(e.pointerId); show(...at(e), size() + 16); });
  fr.addEventListener('lostpointercapture', hide);
  fr.addEventListener('focus', (e) => { if (e.target === fr) show(P.x || fr.clientWidth / 2, P.y || fr.clientHeight / 2); });
  fr.addEventListener('blur', hide);
  fr.addEventListener('keydown', (e) => {
    if (e.target !== fr) return;
    const s = e.shiftKey ? 30 : 10, m = { ArrowLeft: [-s, 0], ArrowRight: [s, 0], ArrowUp: [0, -s], ArrowDown: [0, s] }[e.key];
    if (m) { cancelAnimationFrame(glide); show(P.x + m[0], P.y + m[1]); } else if (e.key === 'Escape') hide(); else return;
    e.preventDefault();
  });
  // “全部透视”：半径涨到盖满，给键盘、触屏和想看全貌的人
  all.addEventListener('click', () => {
    open = !open;
    all.setAttribute('aria-pressed', String(open)); all.textContent = open ? '收起透视' : '全部透视';
    say.textContent = open ? '已切到线框：导航、标题、说明、按钮、配图' : '已回到成品';
    cancelAnimationFrame(tween);
    const from = open ? size() : Math.hypot(fr.clientWidth, fr.clientHeight), to = open ? Math.hypot(fr.clientWidth, fr.clientHeight) : size(), done = () => { fr.style.removeProperty('--r'); if (open) fr.style.setProperty('--r', to + 'px'); };
    if (open) show(P.x || fr.clientWidth / 2, P.y || fr.clientHeight / 2);
    if (still) return done();
    let t0 = 0;
    const tick = (t) => {
      if (!root.host.isConnected) return;
      t0 ||= t; const k = Math.min(1, (t - t0) / 360), e = 1 - (1 - k) ** 3;
      fr.style.setProperty('--r', from + (to - from) * e + 'px');
      if (k < 1) tween = requestAnimationFrame(tick); else done();
    };
    tween = requestAnimationFrame(tick);
  });
  // 挂载后镜头滑到按钮上停住
  const cta = fr.querySelector('.ui .cta');
  const target = () => { const a = cta.getBoundingClientRect(), b = fr.getBoundingClientRect(); return [a.right - b.left + 4, a.top - b.top - 4]; };
  const from = [fr.clientWidth * 0.82, fr.clientHeight * 0.4], to = target();
  if (still) show(...to);
  else {
    let t0 = 0;
    const tick = (t) => {
      if (!root.host.isConnected) return;
      t0 ||= t; const k = Math.min(1, (t - t0) / 620), e = 1 - (1 - k) ** 3;
      show(from[0] + (to[0] - from[0]) * e, from[1] + (to[1] - from[1]) * e);
      if (k < 1) glide = requestAnimationFrame(tick);
    };
    glide = requestAnimationFrame(tick);
  }
}
</script>
