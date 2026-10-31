---
zh: 粒子连线背景
en: Particle network
order: 70
---

## 是什么

许多小点在背景里漂浮，彼此靠近时连出细线，鼠标附近的点会被吸引或连线。

## 适合

科技、数据、网络类产品首屏。

## 注意

粒子数按屏幕面积缩放，手机上减半；用 requestAnimationFrame，页面隐藏时停止。

## 提示词

给{首屏}加「粒子连线背景」：用 canvas 画 40–80 个小点缓慢漂浮，两点距离小于 120px 时连一条细线，越近越清楚；鼠标附近的点也与鼠标连线；颜色用低不透明度的品牌色；减少动态效果时只画静态点阵；离开视口时暂停。

## 示例

<style>
canvas{width:100%;height:100%;display:block;background:#0f172a}
</style>

<canvas></canvas>

<script type="module">
export default function demo(root) {
  const c = root.querySelector('canvas'), g = c.getContext('2d'); let w, h, pts = [], mouse = null, raf;
  const fit = () => { w = c.width = c.clientWidth; h = c.height = c.clientHeight; pts = Array.from({ length: Math.round(w * h / 6000) }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4 })); };
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const draw = () => { g.clearRect(0, 0, w, h); for (const p of pts) { if (!still) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1; } g.fillStyle = 'rgba(148,163,255,.8)'; g.fillRect(p.x - 1, p.y - 1, 2, 2); }
    const all = mouse ? [...pts, mouse] : pts; for (let i = 0; i < all.length; i++) for (let j = i + 1; j < all.length; j++) { const d = Math.hypot(all[i].x - all[j].x, all[i].y - all[j].y); if (d < 110) { g.strokeStyle = 'rgba(148,163,255,' + (1 - d / 110) * .5 + ')'; g.beginPath(); g.moveTo(all[i].x, all[i].y); g.lineTo(all[j].x, all[j].y); g.stroke(); } }
    if (!still && c.isConnected) raf = requestAnimationFrame(draw); };
  c.addEventListener('pointermove', (e) => { const r = c.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; if (still) draw(); });
  c.addEventListener('pointerleave', () => { mouse = null; });
  fit(); draw();
}
</script>
