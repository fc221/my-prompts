---
zh: 拖动光源照亮照片
en: Movable light
order: 100
---

## 是什么

照片上有一个可以拖动的光点，把它挪到哪边，画面里的物体就从哪边被照亮：迎光面变亮、背光面变暗，高光和桌上的影子也跟着换方向。

## 适合

器物、雕塑、首饰、包袋这类“材质和形体就是卖点”的展示页，博物馆和展览的线上导览，产品页里讲质感的一屏。

## 不适合

人像和场景复杂的照片做不出可信的光影，会显得假；只想让深色页面跟着鼠标亮一块，用「鼠标聚光背景」；卡片随指针倾斜反光，用「3D 倾斜卡片」。

## 注意

明暗要按表面朝向算（每个像素一条法线，和光的方向做点积），整张图盖一层跟着走的径向渐变只是“手电筒”，物体的背光面不会变暗。这只是按法线重算明暗：转不到物体背后，投影也是估出来的，宣传文案别写成“3D 扫描”或“三维重建”。

## 要点

- 准备三份同尺寸的数据：底色（不带光影的颜色）、法线（每个像素朝哪边）、可选的高度；可以由深度图算出，也可以像示例这样按球体、旋转体解析算出。
- 每个像素：环境光 0.2 左右 + 漫反射 max(0, N·L) × 距离衰减；釉面、金属另加 Blinn-Phong 高光（指数 30–60）；影子用贴着接触点、随光反向拉长的软边椭圆近似。
- 只在光源位置变化时重算一帧（requestAnimationFrame 合并多次移动），不开常驻循环；像素运算按 CSS 像素分辨率做，大图再降一档。
- 按下画面任意处光点跳过去并可继续拖；画面 touch-action: none，所以高度不超过屏幕的一半，留出滚动的地方。
- 光点是可聚焦的按钮：方向键每次移动 4%，Shift 加大到 12%，Esc 回到默认的左上方；用 role="status" 播报“光源在右上方”这类方位。
- 首次出现时光点从右上划到左上（约 1.4 秒）提示能拖；减少动态效果时不划，直接停在左上方。

## 提示词

给{器物展示页}的{主图}做「拖动光源照亮照片」：准备同尺寸的底色图和法线图（{法线来源}），用 canvas 按像素计算光照：环境光 0.2 + 漫反射 max(0, N·L) × 距离衰减，釉面另加指数约 48 的高光，桌面上的影子用随光反向拉长的软边椭圆近似；只在光源移动时用 requestAnimationFrame 重算一帧；画面上放一个可拖动的发光圆点作光源，按下画面任意处光点跳过去，画面 touch-action: none；光点是按钮，方向键移动 4%、Shift 12%、Esc 回到默认左上方，用 role="status" 播报光源方位；首次出现时光点从右上划到左上提示可拖，减少动态效果时直接停在左上方；说明文字不写成三维重建。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{padding:10px;background:#ebe7e1}
.fr{position:relative;height:100%;border-radius:12px;overflow:hidden;background:#3a3029;touch-action:none;cursor:crosshair;user-select:none;-webkit-user-select:none}
canvas{display:block;width:100%;height:100%}
.tt{position:absolute;right:10px;top:10px;margin:0;padding:2px 9px;border-radius:999px;background:rgba(30,24,20,.5);color:#fff;font-size:12px;line-height:18px;white-space:nowrap}
.hint{position:absolute;left:10px;bottom:10px;margin:0;padding:2px 8px;border-radius:6px;background:rgba(255,255,255,.8);color:#4a4038;font-size:11px;line-height:18px;white-space:nowrap}
.sun{position:absolute;left:24%;top:12%;width:24px;height:24px;margin:-12px 0 0 -12px;padding:0;border:2px solid #fff;border-radius:50%;background:radial-gradient(circle,#fffbe8 30%,#ffd679);box-shadow:0 0 0 6px rgba(255,226,150,.3),0 0 26px 6px rgba(255,214,120,.75);cursor:grab;touch-action:none}
.sun:focus-visible{outline:2px solid #3b5bdb;outline-offset:6px}
@container (min-height:260px){.st{padding:14px}
.tt{right:14px;top:14px;padding:3px 11px;font-size:13px}
.hint{left:14px;bottom:14px;font-size:12px}
.sun{width:28px;height:28px;margin:-14px 0 0 -14px}
}
</style>

<div class="st"><div class="fr"><canvas role="img" aria-label="静物照片：青瓷瓶、白瓷杯和一只柿子放在木桌上"></canvas><p class="tt" aria-hidden="true">静物 · 青瓷与柿</p><p class="hint" aria-hidden="true">拖动光点换个角度</p><button type="button" class="sun" aria-label="光源位置，方向键移动，Esc 复位"></button></div><p class="sr" role="status"></p></div>

<script type="module">
// 按像素准备底色 A、法线 N、高度 Z、高光强度 K；物体用解析形状（旋转体、圆柱、椭球）算法线
const build = (W, H) => {
  const n = W * H, A = new Float32Array(n * 3), N = new Float32Array(n * 3), Z = new Float32Array(n), K = new Float32Array(n), T = new Uint8Array(n);
  const u = H, cx = W / 2, ty = H * 0.58, yc = H * 0.86;
  const put = (x, y, c, nx, ny, nz, z, k) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const i = y * W + x, l = Math.hypot(nx, ny, nz);
    A[i * 3] = c[0]; A[i * 3 + 1] = c[1]; A[i * 3 + 2] = c[2]; N[i * 3] = nx / l; N[i * 3 + 1] = ny / l; N[i * 3 + 2] = nz / l; Z[i] = z; K[i] = k; T[i] = 0;
  };
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (y < ty) { const v = 0.92 + 0.08 * (y / ty); put(x, y, [222 * v, 210 * v, 194 * v], 0, 0, 1, 0, 0); continue; }
    const gr = 0.88 + 0.12 * Math.sin(y * 0.7 + Math.sin(x * 0.012 + y * 0.04) * 5);
    put(x, y, [126 * gr, 82 * gr, 54 * gr], 0, -0.6, 0.8, 0, 0.06); T[y * W + x] = 1;
  }
  // 青瓷瓶：旋转体，半径随高度变化（t 从底到顶）
  const P = [[0, 0.085], [0.12, 0.13], [0.38, 0.165], [0.62, 0.118], [0.8, 0.056], [0.92, 0.05], [1, 0.068]];
  const R = (t) => { t = Math.max(0, Math.min(1, t)); let k = 1; while (P[k][0] < t) k++; const [t0, r0] = P[k - 1], [t1, r1] = P[k], f = (1 - Math.cos(((t - t0) / (t1 - t0)) * Math.PI)) / 2; return (r0 + (r1 - r0) * f) * u; };
  const vx = cx - 0.32 * u, vb = yc - 0.05 * u, vh = 0.64 * u, lip = R(1);
  for (let y = Math.floor(vb - vh); y <= vb + 0.3 * R(0); y++) { // 瓶底多画一段弧，像从略高处看过去
    const t = Math.max(0, (vb - y) / vh), r = R(t), dr = y > vb ? 0 : -(R(t + 0.01) - R(t - 0.01)) / 0.02 / vh;
    const band = t > 0.5 && t < 0.54 ? 0.78 : 1;
    for (let x = Math.ceil(vx - r); x <= vx + r; x++) { const s = (x - vx) / r, nz = Math.sqrt(Math.max(0, 1 - s * s)); if (y > vb && y - vb > 0.3 * r * nz) continue; put(x, y, [150 * band, 188 * band, 170 * band], s, -dr, nz, nz * r, 0.6); }
  }
  for (let y = Math.floor(vb - vh - lip * 0.3); y <= vb - vh + lip * 0.3; y++) for (let x = Math.ceil(vx - lip); x <= vx + lip; x++) {
    const e = ((x - vx) / lip) ** 2 + ((y - (vb - vh)) / (lip * 0.3)) ** 2;
    if (e <= 1) put(x, y, e < 0.6 ? [44, 52, 46] : [170, 204, 186], 0, -0.7, 0.7, lip, e < 0.6 ? 0 : 0.5);
  }
  // 白瓷杯：圆柱，上口是椭圆
  const qx = cx + 0.4 * u, qr = 0.1 * u, qb = yc - 0.02 * u, qh = 0.17 * u, qe = 0.03 * u;
  for (let x = Math.ceil(qx - qr); x <= qx + qr; x++) {
    const s = (x - qx) / qr, nz = Math.sqrt(Math.max(0, 1 - s * s));
    for (let y = Math.floor(qb - qh - qe * nz); y <= qb + qe * nz; y++) {
      const top = y < qb - qh + qe * nz;
      if (top) put(x, y, (((x - qx) / qr) ** 2 + ((y - (qb - qh)) / qe) ** 2) < 0.7 ? [96, 58, 30] : [238, 234, 226], 0, -0.8, 0.6, qr, 0.3);
      else put(x, y, [236, 232, 224], s, 0, nz, nz * qr, 0.5);
    }
  }
  // 柿子：椭球，顶上一小块深绿的蒂
  const px = cx + 0.08 * u, pa = 0.16 * u, pb = 0.13 * u, pc = 0.15 * u, py = yc + 0.03 * u - pb;
  for (let y = Math.floor(py - pb); y <= py + pb; y++) for (let x = Math.ceil(px - pa); x <= px + pa; x++) {
    const dx = x - px, dy = y - py, q = 1 - (dx / pa) ** 2 - (dy / pb) ** 2;
    if (q < 0) continue;
    const dz = pc * Math.sqrt(q), cap = dy < -0.72 * pb && Math.abs(dx) < 0.3 * pa;
    put(x, y, cap ? [70, 78, 36] : [228, 110, 36], dx / (pa * pa), dy / (pb * pb), dz / (pc * pc), dz, cap ? 0.05 : 0.3);
  }
  return { A, N, Z, K, T, objs: [[vx, vb + 0.025 * u, 0.15 * u], [qx, qb, qr], [px, py + pb, pa]] };
};
export default function demo(root) {
  const fr = root.querySelector('.fr'), cv = root.querySelector('canvas'), g = cv.getContext('2d'), sun = root.querySelector('.sun'), msg = root.querySelector('[role=status]');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches, HOME = { x: 0.24, y: 0.12 };
  let W = 0, H = 0, M, img, raf = 0, anim = 0, L = { ...HOME };
  const fit = () => { // 按 CSS 像素算光照，高清屏会略软；要更清晰再乘 devicePixelRatio（像素数翻 4 倍）
    const w = Math.round(cv.clientWidth), h = Math.round(cv.clientHeight);
    if (w === W && h === H) return;
    W = cv.width = w; H = cv.height = h; M = build(W, H); img = g.createImageData(W, H); paint();
  };
  const paint = () => {
    const { A, N, Z, K, T, objs } = M, o = img.data, lx = L.x * W, ly = L.y * H, lz = H * 0.8, f2 = H * H * 1.2;
    const sh = objs.map(([x, y, s]) => { const ox = ((x - lx) / lz) * s * 1.3, oy = ((y - ly) / lz) * s * 0.35; return [x + ox, y + oy * 0.6 + s * 0.04, s * (1.05 + Math.abs(ox) / s * 0.4), s * 0.3]; });
    for (let y = 0, i = 0; y < H; y++) for (let x = 0; x < W; x++, i++) {
      const nx = N[i * 3], ny = N[i * 3 + 1], nz = N[i * 3 + 2];
      let vx = lx - x, vy = ly - y, vz = lz - Z[i]; const d2 = vx * vx + vy * vy + vz * vz, inv = 1 / Math.sqrt(d2); vx *= inv; vy *= inv; vz *= inv;
      let s = 1;
      if (T[i]) for (const [ex, ey, rx, ry] of sh) { const e = Math.sqrt(((x - ex) / rx) ** 2 + ((y - ey) / ry) ** 2); if (e < 1.2) s *= 1 - 0.55 * Math.min(1, (1.2 - e) / 0.5); }
      const att = 1 / (1 + d2 / f2), dif = Math.max(0, nx * vx + ny * vy + nz * vz) * att * s * 1.3;
      const hl = Math.hypot(vx, vy, vz + 1), nh = (nx * vx + ny * vy + nz * (vz + 1)) / hl, sp = nh > 0 ? Math.pow(nh, 48) * K[i] * att * s * 255 : 0;
      o[i * 4] = A[i * 3] * (0.2 + dif) + sp; o[i * 4 + 1] = A[i * 3 + 1] * (0.21 + dif * 0.95) + sp; o[i * 4 + 2] = A[i * 3 + 2] * (0.25 + dif * 0.85) + sp; o[i * 4 + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    sun.style.left = L.x * 100 + '%'; sun.style.top = L.y * 100 + '%';
  };
  const req = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; if (root.host.isConnected) paint(); }); };
  const set = (x, y) => { L = { x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) }; req(); };
  const where = () => { const h = L.x < 0.34 ? '左' : L.x > 0.66 ? '右' : '', v = L.y < 0.34 ? '上' : L.y > 0.66 ? '下' : ''; return '光源在' + (h && v ? h + v + '方' : h ? h + '侧' : v ? v + '方' : '正前方'); };
  const at = (e) => { const r = fr.getBoundingClientRect(); set((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height); };
  fr.addEventListener('pointerdown', (e) => { cancelAnimationFrame(anim); fr.setPointerCapture(e.pointerId); at(e); });
  fr.addEventListener('pointermove', (e) => { if (fr.hasPointerCapture(e.pointerId)) at(e); });
  fr.addEventListener('lostpointercapture', () => { msg.textContent = where(); });
  sun.addEventListener('keydown', (e) => {
    const st = e.shiftKey ? 0.12 : 0.04, d = { ArrowLeft: [-st, 0], ArrowRight: [st, 0], ArrowUp: [0, -st], ArrowDown: [0, st] }[e.key];
    if (d) set(L.x + d[0], L.y + d[1]); else if (e.key === 'Escape') set(HOME.x, HOME.y); else return;
    e.preventDefault(); cancelAnimationFrame(anim); msg.textContent = where();
  });
  if (still) L = { ...HOME };
  else L = { x: 0.82, y: 0.14 };
  fit();
  new ResizeObserver(fit).observe(cv);
  if (still) return;
  // 首次出现：光点沿弧线从右上划到左上
  let t0 = 0;
  const tick = (t) => {
    if (!root.host.isConnected) return;
    t0 ||= t; const k = Math.min(1, (t - t0) / 1400), e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
    set(0.82 + (HOME.x - 0.82) * e, 0.14 + (HOME.y - 0.14) * e + 0.28 * Math.sin(e * Math.PI));
    if (k < 1) anim = requestAnimationFrame(tick);
  };
  setTimeout(() => { anim = requestAnimationFrame(tick); }, 300);
}
</script>
