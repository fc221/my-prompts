---
zh: 图片上的水纹
en: Water ripple
order: 90
---

## 是什么

指针划过或点一下图片，落点处荡开一圈圈水波，波纹经过的地方画面真的被折弯、带一点明暗，几秒后慢慢平静下来。

## 适合

酒店、温泉、饮品、海岛旅行这类和水有关的首屏大图，品牌页里一张主角图的彩蛋式互动。

## 不适合

文字多的图（海报、截图、图表）会被扭得读不清，不要用；列表里的小图、需要一直看清细节的商品图不要用；只想给按钮点击一个反馈，用按钮的「水波点击」。

## 注意

水纹靠的是折射：每个像素按波面斜率去读旁边的像素，画面才会真的弯；只在图上叠几道半透明圆环，看起来像按钮的点击反馈，不像水。没有新输入时波要自己衰减到完全平静，然后停掉动画循环。

## 要点

- 用两张高度缓冲做波动模拟（新值 = 四邻平均 × 2 − 上一帧，再乘 0.97–0.98 衰减），模拟网格取画面的 1/2，渲染时按波面斜率偏移读取原图像素。
- 偏移量上限 8–12px，再按斜率加 ±10% 的明暗，像水面反光；画面边缘一圈不偏移，避免读到图外出现裂缝。
- 点按落一个大波源，鼠标移动每隔约 10px 落一个小波源；容器 touch-action: pan-y，竖着滑仍能滚动页面。
- 每帧算一下总能量，低于阈值就清零缓冲、画回原图并停掉 requestAnimationFrame；组件卸载时也停。
- 原图只在准备好时读一次像素；跨域图片要带 CORS 头，读不到像素时退回静态图。
- 给一个“落一滴”按钮做键盘和读屏入口；减少动态效果时不做水纹，只显示静态图片。

## 提示词

给{首屏大图}加「图片上的水纹」：用 canvas 显示{图片}，图片就绪后读一次像素；以画面 1/2 的分辨率做两张高度缓冲的波动模拟（新值 = 四邻平均 × 2 − 上一帧，再乘 0.975 衰减），每帧按波面斜率偏移读取原图像素，偏移上限 10px，并按斜率加 ±10% 明暗；点按落大波源，鼠标移动每 10px 落小波源；容器 touch-action: pan-y；总能量低于阈值时画回原图并停止 requestAnimationFrame，卸载时也停；另给一个“落一滴”按钮；读不到像素或减少动态效果时只显示静态图片。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{padding:10px;background:#e6ecea}
.fr{position:relative;height:100%;border-radius:12px;overflow:hidden;background:#1d5b66;touch-action:pan-y;cursor:pointer}
canvas{display:block;width:100%;height:100%}
.tt{position:absolute;left:10px;top:10px;margin:0;padding:2px 9px;border-radius:999px;background:rgba(8,30,34,.5);color:#fff;font-size:12px;line-height:18px;white-space:nowrap}
.drop{position:absolute;right:8px;bottom:8px}
.drop.ctl{height:28px;padding:0 12px;font-size:12px}
@container (min-height:260px){.st{padding:14px}
.tt{left:14px;top:14px;padding:3px 11px;font-size:13px}
.drop{right:12px;bottom:12px}
.drop.ctl{height:32px;padding:0 14px;font-size:13px}
}
</style>

<div class="st"><div class="fr"><canvas role="img" aria-label="庭院锦鲤池：睡莲、木栈桥和三尾锦鲤"></canvas><p class="tt" aria-hidden="true">庭院 · 锦鲤池</p><button type="button" class="ctl drop">落一滴</button></div><p class="sr" role="status"></p></div>

<script type="module">
const rnd = (i) => { const x = Math.sin(i * 91.7 + 47.3) * 43758.5453; return x - Math.floor(x); };
// 俯视的锦鲤池：水色、卵石、光纹、栈桥、睡莲、锦鲤
const pond = (g, w, h) => {
  const u = Math.min(w, h);
  let gr = g.createRadialGradient(w * 0.42, h * 0.4, 0, w * 0.5, h * 0.5, Math.hypot(w, h) * 0.6);
  gr.addColorStop(0, '#3d8f8f'); gr.addColorStop(0.55, '#23646d'); gr.addColorStop(1, '#123e49');
  g.fillStyle = gr; g.fillRect(0, 0, w, h);
  for (let i = 0; i < (w * h) / 700; i++) { g.fillStyle = `rgba(210,232,214,${0.04 + rnd(i + 5) * 0.08})`; g.beginPath(); g.ellipse(rnd(i + 1) * w, rnd(i + 2) * h, 2 + rnd(i + 3) * 5, 1.5 + rnd(i + 4) * 3, rnd(i) * 3, 0, 7); g.fill(); }
  g.strokeStyle = 'rgba(205,245,235,.13)'; g.lineWidth = 1.2;
  for (let j = 0; j < 11; j++) { g.beginPath(); for (let x = 0; x <= w; x += 6) { const y = (h * (j + 0.5)) / 11 + Math.sin(x * 0.03 + j * 1.9) * u * 0.025; x ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); }
  g.save(); g.translate(w * 0.86, -u * 0.12); g.rotate(0.6);
  g.fillStyle = 'rgba(0,20,25,.3)'; g.fillRect(-u * 0.12 + 6, 0, u * 0.24, u * 0.66);
  for (let i = 0; i < 9; i++) { g.fillStyle = i % 2 ? '#bf9364' : '#a97d52'; g.fillRect(-u * 0.12, i * u * 0.074, u * 0.24, u * 0.06); }
  g.restore();
  const pad = (x, y, r, a, flower) => {
    g.fillStyle = 'rgba(0,20,25,.25)'; g.beginPath(); g.moveTo(x + 3, y + 4); g.arc(x + 3, y + 4, r, a + 0.3, a + 6.23); g.fill();
    g.fillStyle = '#5c9c4d'; g.beginPath(); g.moveTo(x, y); g.arc(x, y, r, a + 0.3, a + 6.23); g.closePath(); g.fill();
    g.strokeStyle = 'rgba(28,70,32,.35)'; g.lineWidth = 1;
    for (let k = 0; k < 7; k++) { const t = a + 0.6 + k * 0.8; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(t) * r * 0.9, y + Math.sin(t) * r * 0.9); g.stroke(); }
    if (!flower) return;
    for (let k = 0; k < 8; k++) { g.fillStyle = k % 2 ? '#f7c6d4' : '#ee9fb7'; g.beginPath(); g.ellipse(x + Math.cos(k * 0.785) * r * 0.32, y + Math.sin(k * 0.785) * r * 0.32, r * 0.34, r * 0.15, k * 0.785, 0, 7); g.fill(); }
    g.fillStyle = '#ffd973'; g.beginPath(); g.arc(x, y, r * 0.14, 0, 7); g.fill();
  };
  const koi = (x, y, L, a, body, spot) => {
    g.save(); g.translate(x, y); g.rotate(a);
    g.fillStyle = 'rgba(0,20,25,.3)'; g.beginPath(); g.ellipse(5, 7, L * 0.5, L * 0.15, 0, 0, 7); g.fill();
    g.fillStyle = body; g.globalAlpha = 0.85;
    g.beginPath(); g.moveTo(-L * 0.36, 0); g.quadraticCurveTo(-L * 0.6, -L * 0.22, -L * 0.74, -L * 0.17); g.quadraticCurveTo(-L * 0.6, 0, -L * 0.74, L * 0.17); g.quadraticCurveTo(-L * 0.6, L * 0.22, -L * 0.36, 0); g.fill();
    for (const s of [-1, 1]) { g.beginPath(); g.ellipse(L * 0.12, s * L * 0.14, L * 0.1, L * 0.04, s * -0.7, 0, 7); g.fill(); }
    g.globalAlpha = 1; g.beginPath(); g.ellipse(0, 0, L * 0.45, L * 0.13, 0, 0, 7); g.fill();
    g.save(); g.clip(); g.fillStyle = spot;
    for (const [sx, sy, rx, ry] of [[0.2, -0.05, 0.14, 0.1], [-0.12, 0.06, 0.12, 0.09], [0.36, 0.02, 0.06, 0.06]]) { g.beginPath(); g.ellipse(L * sx, L * sy, L * rx, L * ry, 0.4, 0, 7); g.fill(); }
    g.restore(); g.restore();
  };
  pad(w * 0.14, h * 0.26, u * 0.14, 0.5, true); pad(w * 0.46, h * 0.86, u * 0.11, 2); pad(w * 0.93, h * 0.62, u * 0.13, 4);
  koi(w * 0.3, h * 0.58, u * 0.36, -0.3, '#f4efe4', '#e45c27');
  koi(w * 0.62, h * 0.34, u * 0.3, 2.6, '#ef8a33', '#f7d38d');
  koi(w * 0.72, h * 0.76, u * 0.24, -2.3, '#f1ece0', '#2c2b2a');
};
export default function demo(root) {
  const fr = root.querySelector('.fr'), cv = root.querySelector('canvas'), g = cv.getContext('2d'), btn = root.querySelector('.drop'), msg = root.querySelector('[role=status]');
  let W = 0, H = 0, W2 = 0, H2 = 0, base, src, out, cur, prv, raf = 0, lx = -99, ly = -99;
  const fit = () => {
    const w = Math.round(cv.clientWidth), h = Math.round(cv.clientHeight);
    if (w === W && h === H) return;
    W = cv.width = w; H = cv.height = h; W2 = (W >> 1) + 1; H2 = (H >> 1) + 1;
    pond(g, W, H); base = g.getImageData(0, 0, W, H); src = base.data; out = g.createImageData(W, H);
    cur = new Float32Array(W2 * H2); prv = new Float32Array(W2 * H2);
  };
  fit();
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { btn.hidden = true; return; } // 减少动态效果：只显示静态图片
  const drop = (x, y, r, s) => { // x、y 是画布像素坐标；模拟网格是画面的 1/2
    const cx = x / 2, cy = y / 2;
    for (let j = Math.max(1, Math.floor(cy - r)); j <= Math.min(H2 - 2, cy + r); j++) for (let i = Math.max(1, Math.floor(cx - r)); i <= Math.min(W2 - 2, cx + r); i++) { const d = Math.hypot(i - cx, j - cy); if (d < r) cur[j * W2 + i] += s * (Math.cos((d / r) * Math.PI) + 1) / 2; }
    if (!raf) raf = requestAnimationFrame(loop);
  };
  const loop = () => {
    if (!root.host.isConnected) { raf = 0; return; }
    let e = 0;
    for (let y = 1; y < H2 - 1; y++) for (let x = 1, i = y * W2 + 1; x < W2 - 1; x++, i++) { const v = ((cur[i - 1] + cur[i + 1] + cur[i - W2] + cur[i + W2]) * 0.5 - prv[i]) * 0.975; prv[i] = v; e += v < 0 ? -v : v; }
    const t = cur; cur = prv; prv = t;
    if (e / (W2 * H2) < 0.015) { cur.fill(0); prv.fill(0); g.putImageData(base, 0, 0); raf = 0; return; } // 平静了：画回原图，停掉循环
    const o = out.data;
    for (let y = 0; y < H; y++) {
      const cy = y >> 1;
      for (let x = 0; x < W; x++) {
        const cx = x >> 1, j = (y * W + x) * 4; let dx = 0, dy = 0;
        if (cx > 0 && cy > 0 && cx < W2 - 1 && cy < H2 - 1) { const c = cy * W2 + cx; dx = cur[c - 1] - cur[c + 1]; dy = cur[c - W2] - cur[c + W2]; }
        const sx = Math.min(W - 1, Math.max(0, x + Math.max(-10, Math.min(10, dx * 0.12)) | 0)), sy = Math.min(H - 1, Math.max(0, y + Math.max(-10, Math.min(10, dy * 0.12)) | 0));
        const s = (sy * W + sx) * 4, sh = Math.max(-26, Math.min(26, (dx + dy) * 0.35));
        o[j] = src[s] + sh; o[j + 1] = src[s + 1] + sh; o[j + 2] = src[s + 2] + sh; o[j + 3] = 255;
      }
    }
    g.putImageData(out, 0, 0);
    raf = requestAnimationFrame(loop);
  };
  const pt = (e) => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * H / r.height]; };
  fr.addEventListener('pointerdown', (e) => { if (e.target === btn) return; const [x, y] = pt(e); drop(x, y, 6, 220); lx = x; ly = y; });
  fr.addEventListener('pointermove', (e) => { const [x, y] = pt(e); if (Math.hypot(x - lx, y - ly) < 10) return; lx = x; ly = y; drop(x, y, 3, 70); });
  btn.addEventListener('click', () => { drop(W * (0.25 + Math.random() * 0.5), H * (0.3 + Math.random() * 0.4), 6, 260); msg.textContent = '水面落下一滴，涟漪正在散开'; });
  new ResizeObserver(fit).observe(cv); // 尺寸变了才重画场景、清空波面
  setTimeout(() => drop(W * 0.38, H * 0.48, 6, 260), 200);
  setTimeout(() => drop(W * 0.66, H * 0.62, 5, 200), 650);
}
</script>
