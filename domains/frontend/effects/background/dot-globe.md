---
zh: 点阵地球
en: Dotted globe
aka: 旋转地球 点阵球 地球仪背景 全球网络 globe
order: 90
---

## 是什么

由圆点组成的地球缓慢自转：陆地是密集的点，海洋留空，几条弧线在城市之间飞过。

## 适合

强调全球覆盖的首屏和数据段落：节点分布、跨境支付、海外用户量。

## 不适合

没有全球业务、只想要“科技感”的页面：地球会让人以为你有海外服务。只要氛围感，用「粒子连线背景」。

## 注意

陆地点离线算好：上线时用陆地数据预先生成点坐标数组，页面里只做旋转和投影。地球放在文字旁边，不压在文字下面。

## 要点

- 取点：斐波那契球面均匀取约 5000 个点（第 i 个点 y = 1 − 2(i + 0.5)/N，经度每次加黄金角 137.5°），只留陆地上的 800–1600 个，存成 [x, y, z] 数组。
- 投影：正交投影，只绕竖轴转，倾角固定 15–25°，北半球略朝前；背面的点透明度降到 0.12 或不画；正面的点越靠边缘越小越淡，半径和透明度都乘 0.5 + 0.5 × 深度。
- 绘制：点按深度分 6 档，同一档合成一条路径一次填充；点半径约为地球半径的 1.2%；圆盘垫一层很淡的径向渐变，海洋留空也看得出是个球。
- 转动：20–40 秒一圈；拖动时转角 = 横向位移 ÷ 半径，按下即停转；松手沿用最后几次移动的速度，约 0.8 秒内指数回到自转速度；停住超过 80ms 再松手就不带惯性。
- 弧线：城市之间走大圆，中点抬高 10–20% 半径，距离越远抬得越高，同屏最多 4–5 条；点在背面且投影落在圆盘里才算被挡住，抬高的弧翻过边缘时照样画出来。
- 亮点：每条弧上一个带短拖尾的亮点，2–3 秒走完一趟，各条错开出发。
- 交互：canvas 设 touch-action: pan-y，横拖转地球、竖拖照常滚动页面；canvas 可聚焦，左右方向键推一下；离开视口时暂停，另给一个暂停按钮。
- 减少动态效果时停在固定角度，弧线完整静止地画出，不画亮点；拖动直接跟手，不带惯性。

## 提示词

给{首屏或数据段落}做「点阵地球」：用{陆地数据}离线生成点坐标——斐波那契球面均匀取约 5000 个点，只留陆地上的 800–1600 个，存成 [x, y, z] 数组；页面里用 canvas 做正交投影，只绕竖轴转，倾角 20°，30 秒一圈；背面的点透明度 0.12，正面的点越靠边缘越小越淡，按深度分 6 档合并路径填充，圆盘垫一层很淡的径向渐变；拖动时转角 = 横向位移 ÷ 半径，松手带惯性并在 0.8 秒内回到自转速度，停住 80ms 后再松手不带惯性；在{城市对}之间画最多 5 条大圆弧，中点抬高 10–20% 半径，被球挡住的部分不画，每条弧上一个带短拖尾的亮点 2.4 秒走完、彼此错开；canvas touch-action: pan-y、可聚焦，左右方向键转动；按 devicePixelRatio（上限 2）放大，尺寸变化时重算半径；离开视口暂停，提供暂停按钮；减少动态效果时停在{固定角度}，弧线静止、不画亮点。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;grid-template-columns:minmax(0,1fr) min(54cqw,100cqh);align-items:center;background:#060a18;color:#eef3ff}
.tx{display:grid;gap:4px;padding:0 0 24px 16px}
.tx small{color:#9fb1dc;font-size:12px}
.tx b{font-size:20px;line-height:1.3}
.tx p{display:none;margin:0;color:#b8c5e6;font-size:14px}
canvas{display:block;width:100%;height:100%;background:radial-gradient(closest-side,rgba(70,110,255,.16),transparent);cursor:grab;touch-action:pan-y}
canvas:active{cursor:grabbing}
canvas:focus-visible{outline-color:#8fb3ff;outline-offset:-2px}
.pz.ctl{position:absolute;left:16px;bottom:12px;height:28px;padding:0 12px;border-color:rgba(159,177,220,.4);background:rgba(6,10,24,.75);color:#dfe7fb;font-size:12px}
.pz.ctl:hover{border-color:rgba(159,177,220,.7);background:#121c3c}
@container (min-height:260px){.tx{gap:8px;padding-left:40px}
.tx small{font-size:13px}
.tx b{font-size:28px}
.tx p{display:block}
.pz.ctl{left:40px;bottom:16px}
}
</style>

<div class="st"><div class="tx"><small>MyPrompts 全球节点</small><b>38 个地区<br>就近接入</b><p>请求自动走最近的节点，延迟低于 60ms</p></div><canvas tabindex="0" role="img" aria-label="点阵地球，城市之间有航线；可拖动或用左右方向键转动"></canvas><button type="button" class="ctl pz">暂停</button></div>

<script type="module">
// 粗略陆地轮廓 [经度, 纬度, …]，只够示意；上线时用真实陆地数据离线算好点坐标
const LAND = [
  [-166,66, -157,71, -128,70, -96,68, -94,60, -82,52, -77,62, -65,60, -56,52, -66,44, -76,35, -81,31, -80,25, -84,30, -97,27, -97,21, -87,21, -83,10, -77,8, -86,12, -105,20, -110,24, -117,32, -124,40, -124,48, -134,57, -150,60, -165,55, -165,62],
  [-73,78, -60,82, -30,83, -18,77, -22,70, -40,64, -44,60, -52,64, -56,72],
  [-90,69.5, -80,62.5, -66,61.5, -61.5,66.5, -70,71, -78,73.5, -88,73.5],
  [-125,72, -118,69, -100,69, -95,73, -82,74.5, -76,76, -62,82, -75,83, -95,81, -110,78, -120,76],
  [-77,8, -62,11, -52,5, -50,0, -35,-5, -39,-15, -48,-26, -58,-38, -65,-45, -69,-55, -74,-50, -73,-38, -70,-18, -76,-14, -81,-6, -78,2],
  [-85,21.8, -80,23.2, -74.2,20.2, -77.5,19.8],
  [-9,37, -9,43.5, -1.5,43.5, -1.5,46, -4.5,48.5, 1.5,50.5, 8,54, 8.5,57, 10.5,57.7, 11,59, 7,58, 5,61, 10,64, 14,67.5, 19,70, 26,71, 33,69.5, 41,67, 45,68.5, 60,69.5, 70,73, 80,73, 87,75, 100,77, 113,73.5, 130,71, 150,71, 170,70, 179.9,68.5, 179.9,65, 170,60, 162,56, 156.5,51, 156,57, 151,59.5, 143,59, 137,54, 141,52.5, 140,48, 133,43, 129.5,41, 129.5,35.5, 126.5,34.5, 126,37.5, 124.5,40, 121,39, 118,39, 122.5,37, 119.5,35, 121,32, 122,30, 119.5,25.5, 116.5,23, 113.5,22.2, 108.5,21.5, 106,20, 108.5,15, 109,11.5, 105,8.6, 103,10.6, 100,13.5, 99.5,10, 101.5,6.5, 104.2,1.4, 101,2.8, 98.3,8, 98.5,13, 97.6,16.5, 94.3,16, 94,19, 92.3,21, 88.5,21.7, 85,19.3, 80.3,15.5, 80,10.5, 77.5,8.1, 74.8,13, 72.8,21, 70,21, 66.6,25.4, 57.3,25.8, 56.2,27.2, 52.5,27.6, 50.3,30, 48,29.8, 51.5,24.2, 56.4,24.5, 59.8,22.5, 57.7,19, 52.2,15.9, 45,12.8, 43.5,12.7, 42.6,16.5, 39.2,21.5, 36.5,26.1, 34.9,29.5, 34.2,31.3, 35.8,35.7, 32.5,36.1, 28,36.8, 26.2,39.8, 23,40.6, 24,37.7, 22.5,36.4, 21,39.5, 19.4,40.3, 19.5,41.8, 15.8,43.8, 13.6,45.6, 12.3,44.2, 14.2,42.2, 16.1,41.9, 18.5,40.2, 15.7,37.9, 15.8,40, 12.2,41.8, 8.9,44.4, 4.5,43.4, 3.2,41.9, -0.3,39.5, -0.9,37.6, -5.6,36],
  [-5.5,50, 1.5,51, 1.7,52.7, -0.5,54, -2,57.5, -4,58.6, -6,57, -5,54.5, -4.5,52],
  [-10,51.6, -6,52, -6,55.2, -8.5,55.2, -10,54],
  [-24,64, -22,66.5, -15,66.5, -13.5,65, -18,63.3],
  [11,78.5, 18,80.5, 27,80, 22,77.3, 16,76.5],
  [52,71.2, 57.5,70.6, 62,74, 69,76.5, 67,77, 58,75.8, 54,73.5],
  [-17,21, -16,28, -10,30, -6,35.8, 10,37, 11,33, 20,31, 30,31.5, 32.5,30, 35,28, 37,22, 39,16, 43,12.5, 51,12, 51,10, 44,1, 40,-3, 40,-10, 41,-15, 35,-24, 33,-27, 28,-33, 20,-35, 18,-32, 15,-27, 12,-18, 13,-12, 9,-1, 9,4, 4,6.5, -3,5, -8,4.5, -13,8, -17,14.7],
  [43.5,-22, 44,-25, 47,-25, 50.5,-15.5, 49.3,-12, 44.5,-16.2],
  [130,31.5, 132,34, 135,33.5, 139.5,34.8, 141,38.5, 141.5,41.3, 145.5,43.3, 141.5,45.5, 140,42, 139.5,38, 137,37, 133.5,35.5, 130.5,34],
  [142,46, 143.5,49, 143,54.3, 142.2,54, 142,50],
  [120,18.5, 122.5,18.5, 124,13, 126,9, 126,6.5, 122,7, 123,11, 120,14],
  [109,1.5, 111,-3, 116,-4, 119,1, 119,5, 117,7, 115,5, 111,2],
  [95.3,5.6, 98,4, 104,-1, 106,-5.9, 102.5,-4.5, 100,-1, 97,2],
  [105.2,-6.8, 106,-5.9, 110.4,-6.9, 114.4,-7.7, 114.4,-8.7, 110,-8.2, 106,-7.5],
  [131,-1, 135,-3.5, 138,-1.5, 144,-3.8, 147.5,-6, 150.5,-10.5, 147,-10.2, 143.5,-9, 141,-9.2, 138,-8.4, 137.5,-5.5, 133,-4],
  [79.8,6, 80,9.8, 81.9,7.5, 81.5,6.2],
  [114,-22, 115,-34, 118,-35, 124,-33.5, 129,-31.5, 135,-34.8, 138,-35.5, 140,-38, 147.5,-38, 150,-37, 153,-31, 153,-25, 146,-19, 145.5,-14.5, 142.5,-10.7, 141.5,-17, 139.5,-17.5, 136,-15, 136.5,-12, 132,-11.3, 129.5,-15, 126,-14, 122.5,-17, 120,-19.8],
  [145,-40.8, 148.3,-40.9, 147,-43.6],
  [172.7,-34.4, 178.5,-37.7, 174.6,-41.4, 173,-39.5],
  [172.8,-40.5, 174.3,-41.7, 171,-44.5, 168.5,-46.6, 166.5,-46, 168,-44],
];
const SEA = [ // 黑海、里海、波罗的海
  [27.5,42, 29.5,45.5, 31.5,46.5, 33.5,44.5, 36.5,45.3, 38,47, 39.5,47, 38,44.8, 41.5,41.5, 36,41.7, 32,41.8, 29,41.2],
  [47,45.5, 49,46.5, 53,47, 53,45, 51,44.5, 52.5,41.5, 54,40.5, 54,37.5, 49.5,37, 49,38.5, 49.5,40.5, 47.5,42.5],
  [12.5,54.2, 21,55, 23.5,59.2, 29.8,60, 22.5,60.5, 25.3,65.6, 21.5,64, 17.4,62.3, 18.8,59.6, 16.4,56.2, 13,55.4],
];
const CITY = { sh: [121.5, 31.2], sf: [-122.4, 37.8], ld: [-0.1, 51.5], ny: [-74, 40.7], sg: [103.8, 1.3], sy: [151.2, -33.9], db: [55.3, 25.2], ff: [8.7, 50.1], sp: [-46.6, -23.5] };
const ROUTES = [['sh', 'sf'], ['ld', 'ny'], ['sg', 'sy'], ['db', 'ff'], ['ny', 'sp']];
const TILT = 0.35, SPIN = (Math.PI * 2) / 30, SEG = 40; // 前倾约 20°；30 秒一圈；每条弧分 40 段
const inside = (p, x, y) => { let c = false; for (let i = 0, j = p.length - 2; i < p.length; j = i, i += 2) if (p[i + 1] > y !== p[j + 1] > y && x < ((p[j] - p[i]) * (y - p[i + 1])) / (p[j + 1] - p[i + 1]) + p[i]) c = !c; return c; };
const vec = (lon, lat) => { const a = (lon * Math.PI) / 180, b = (lat * Math.PI) / 180; return [Math.cos(b) * Math.sin(a), Math.sin(b), Math.cos(b) * Math.cos(a)]; };
let model; // 第一次挂载时才算，之后的卡片共用
const build = () => {
  const dots = [];
  for (let i = 0, N = 5200; i < N; i++) { // 斐波那契球面：y 均匀分布，经度每次转一个黄金角
    const lat = (Math.asin(1 - (2 * (i + 0.5)) / N) * 180) / Math.PI, lon = ((i * 137.508) % 360) - 180;
    if (LAND.some((p) => inside(p, lon, lat)) && !SEA.some((p) => inside(p, lon, lat))) dots.push(...vec(lon, lat));
  }
  const arcs = ROUTES.map(([a, b], n) => { // 大圆弧，中点抬高 10%–20% 半径，越远越高
    const A = vec(...CITY[a]), B = vec(...CITY[b]), w = Math.acos(A[0] * B[0] + A[1] * B[1] + A[2] * B[2]), h = 0.1 + (0.1 * w) / Math.PI, p = [];
    for (let k = 0; k <= SEG; k++) {
      const t = k / SEG, u = Math.sin((1 - t) * w) / Math.sin(w), v = Math.sin(t * w) / Math.sin(w), r = 1 + h * Math.sin(Math.PI * t);
      p.push((A[0] * u + B[0] * v) * r, (A[1] * u + B[1] * v) * r, (A[2] * u + B[2] * v) * r);
    }
    return { p, phase: n * 0.64 };
  });
  return { dots: new Float32Array(dots), arcs };
};
export default function demo(root) {
  const st = root.querySelector('.st'), cv = root.querySelector('canvas'), g = cv.getContext('2d'), pz = root.querySelector('.pz');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches, { dots, arcs } = (model ??= build()), ct = Math.cos(TILT), sn = Math.sin(TILT);
  let W = 0, H = 0, R = 0, cx = 0, cy = 0, th = -1.05, om = still ? 0 : SPIN, clock = 0, raf = 0, last = 0, seen = true, paused = still, drag = null;
  const draw = () => {
    const c = Math.cos(th), s = Math.sin(th), lv = Array.from({ length: 7 }, () => new Path2D()), r0 = R * 0.012;
    // 先绕竖轴转 th，再前倾 TILT；返回屏幕坐标、深度和是否看得见（在背面且落在圆盘里才算被挡住）
    const P = (x, y, z) => { const X = x * c + z * s, Z0 = z * c - x * s, Y = y * ct - Z0 * sn, Z = y * sn + Z0 * ct; return [cx + X * R, cy - Y * R, Z, Z > 0 || X * X + Y * Y > 1]; };
    g.clearRect(0, 0, W, H);
    for (let i = 0; i < dots.length; i += 3) {
      const x = dots[i], y = dots[i + 1], z = dots[i + 2], X = x * c + z * s, Z0 = z * c - x * s, Y = y * ct - Z0 * sn, Z = y * sn + Z0 * ct, px = cx + X * R, py = cy - Y * R;
      if (Z < 0) { lv[0].rect(px - 0.5, py - 0.5, 1, 1); continue; } // 背面：很小很淡
      const k = 1 + Math.min(5, (Z * 6) | 0), r = r0 * (0.5 + 0.5 * Z); // 越靠边缘越小越淡
      lv[k].moveTo(px + r, py); lv[k].arc(px, py, r, 0, 7);
    }
    g.fillStyle = '#8fb3ff';
    lv.forEach((p, k) => { g.globalAlpha = k ? 0.2 + (0.8 * k) / 6 : 0.12; g.fill(p); });
    g.strokeStyle = '#ffb547'; g.lineCap = 'round';
    for (const a of arcs) {
      const q = [];
      for (let k = 0; k < a.p.length; k += 3) q.push(P(a.p[k], a.p[k + 1], a.p[k + 2]));
      g.globalAlpha = still ? 0.8 : 0.4; g.lineWidth = 1.2; g.beginPath();
      q.forEach(([x, y, , vis], k) => { if (vis) k && q[k - 1][3] ? g.lineTo(x, y) : g.moveTo(x, y); });
      g.stroke();
      g.globalAlpha = 1; g.fillStyle = '#ffb547';
      for (const [x, y, z] of [q[0], q[SEG]]) if (z > 0) { g.beginPath(); g.arc(x, y, 2, 0, 7); g.fill(); }
      if (still) continue;
      const f = (((clock + a.phase) % 3.2) / 2.4) * SEG; // 2.4 秒走一趟，歇 0.8 秒
      if (f > SEG) continue;
      g.lineWidth = 2;
      for (let k = Math.max(1, Math.ceil(f - 8)); k <= f; k++) { // 亮点后面的短拖尾
        if (!q[k][3] || !q[k - 1][3]) continue;
        g.globalAlpha = 1 - (f - k) / 8; g.beginPath(); g.moveTo(q[k - 1][0], q[k - 1][1]); g.lineTo(q[k][0], q[k][1]); g.stroke();
      }
      const k = Math.min(SEG - 1, Math.floor(f)), e = f - k, [x0, y0, , v0] = q[k], [x1, y1, , v1] = q[k + 1];
      if (!v0 || !v1) continue;
      const hx = x0 + (x1 - x0) * e, hy = y0 + (y1 - y0) * e;
      g.fillStyle = '#fff1d6'; g.globalAlpha = 0.3; g.beginPath(); g.arc(hx, hy, 5, 0, 7); g.fill();
      g.globalAlpha = 1; g.beginPath(); g.arc(hx, hy, 2.2, 0, 7); g.fill();
    }
    g.globalAlpha = 1;
  };
  const tick = (now) => {
    raf = 0;
    if (!root.host.isConnected || !seen) { last = 0; return; }
    const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
    last = now;
    if (!drag) { om += ((paused ? 0 : SPIN) - om) * (1 - Math.exp(-dt / 0.8)); th += om * dt; } // 松手后的惯性约 0.8 秒回到自转速度
    if (!paused) clock += dt;
    draw();
    if (drag || !paused || Math.abs(om) > 0.01) raf = requestAnimationFrame(tick);
    else last = 0;
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
  const fit = () => {
    const w = cv.clientWidth, h = cv.clientHeight;
    if (w === W && h === H) return;
    const d = Math.min(devicePixelRatio || 1, 2);
    W = w; H = h; R = Math.min(W, H) / 2 / 1.22; cx = W / 2; cy = H / 2; // 留出弧线抬高的空间
    cv.width = W * d; cv.height = H * d; g.setTransform(d, 0, 0, d, 0, 0);
    draw();
  };
  cv.addEventListener('pointerdown', (e) => { cv.setPointerCapture(e.pointerId); drag = { x: e.clientX, t: e.timeStamp }; om = 0; kick(); });
  cv.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const a = (e.clientX - drag.x) / R, dt = (e.timeStamp - drag.t) / 1000; // 转角 = 横向位移 ÷ 半径，手下的地面跟着走
    th += a;
    if (dt > 0 && !still) om = 0.5 * om + (0.5 * a) / dt;
    drag.x = e.clientX; drag.t = e.timeStamp;
  });
  const drop = (e) => {
    if (!drag) return;
    if (e.timeStamp - drag.t > 80) om = 0; // 停住再松手：不带惯性
    om = Math.max(-6, Math.min(6, om)); drag = null; kick();
  };
  cv.addEventListener('pointerup', drop);
  cv.addEventListener('pointercancel', drop);
  cv.addEventListener('keydown', (e) => {
    const k = { ArrowLeft: -1, ArrowRight: 1 }[e.key];
    if (!k) return;
    e.preventDefault();
    if (still) th += k * 0.35; else om += k * 0.8; // 方向键推一下，惯性带着转三十几度
    kick();
  });
  pz.addEventListener('click', () => { paused = !paused; pz.textContent = paused ? '继续' : '暂停'; kick(); });
  const io = new IntersectionObserver(([e]) => { if (!root.host.isConnected) return io.disconnect(); seen = e.isIntersecting; if (seen) kick(); });
  io.observe(st);
  new ResizeObserver(fit).observe(cv);
  fit();
  if (still) pz.hidden = true; // 减少动态效果：停在固定角度，弧线静止
  kick();
}
</script>
