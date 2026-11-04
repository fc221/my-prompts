---
zh: 起伏的点阵波浪
en: Dot wave field
aka: 粒子波浪 点阵海浪 波浪粒子 3D 点阵 wave dots
of: dot-ripple
tab: 3D 波浪
order: 62
---

## 是什么

一片点阵像海面一样起伏，带透视、近大远小；鼠标经过时附近的点被抬起，离开后慢慢落回。

## 适合

AI、语音、数据类产品的首屏背景，想要一片立体的粒子海面，又不想为它引入 3D 库。

## 不适合

背景平时要安静、只在点击时回应，用「点阵波纹」；要真实光照、镜头运动或上万个粒子时改用 WebGL；表单和长文区块下面不放一直在动的背景。

## 注意

这是一直在跑的 canvas 动画：离开视口要停、要给暂停按钮、点数按面积封顶。几千个点的开销主要在绘制调用上，同一种颜色的点合成一条路径一次填充，不要每个点各自 beginPath、fill 或 save/restore。

## 要点

- 网格：点在地面上按 (x, z) 平铺，共 2000–5000 个，按画布面积取，手机减半；x 方向铺得比画面宽，最远一排也能盖满整个宽度
- 高度：每个点的高度是 2–3 个正弦波叠加，参数是 x、z 和时间；主波沿 z 方向朝观众推进，周期 4–8 秒，其余的斜着交叉，打散规律感
- 透视：屏幕 x = 中心 + x × 焦距 ÷ 深度，屏幕 y = 地平线 + (相机高度 − 点的高度) × 焦距 ÷ 深度；最远一排和最近一排的深度比 3–4；点的半径、起伏幅度跟着同一个缩放变，远处的点更小、更暗
- 指针：按点的原始屏幕位置算距离，80–120px 内按 (1 − d/R)² 抬高，最多 24–48px；高度用弹簧追目标（刚度约 0.08、阻尼约 0.82），离开后自己落回，带一点过冲
- 颜色：把高度和远近合成一个亮度，分 6–8 档，从暗蓝到近白，抬起的点更亮；每档一条路径，一帧只调用 6–8 次 fill
- 循环：时间只在运行时累加，暂停后接着上次的样子继续；IntersectionObserver 离开视口时停掉 requestAnimationFrame（后台标签页本来就不跑）；devicePixelRatio 上限 2，ResizeObserver 跟着尺寸重建网格
- canvas 对读屏隐藏，文字层在上面；给暂停按钮，减少动态效果时画一帧静止的波面，指针不再抬点

## 提示词

给{首屏背景}做「起伏的点阵波浪」：canvas 铺满区块，在地面上平铺 {点数} 个点（2000–5000，按面积取，手机减半），x 方向铺得比画面宽；每个点的高度 = 2–3 个正弦波叠加 (x, z, t)，主波朝观众推进，周期 4–8 秒；按透视投影到屏幕，最远和最近一排深度比约 3.2，远处的点更小更暗，上沿用 mask 淡出；指针 100px 内的点按 (1 − d/R)² 抬高，最多 40px，用弹簧（刚度 0.08、阻尼 0.82）追目标，离开后慢慢落回；亮度由高度和远近合成，分 8 档从{暗色}到{亮色}，每档一条路径一次 fill，不逐点 save/restore；devicePixelRatio 上限 2，ResizeObserver 重建；离开视口时停止循环，给暂停按钮，暂停后从原处继续；canvas aria-hidden，标题“{标题}”放在远处的暗区上；减少动态效果时画一帧静止的波面，指针不抬点。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{background:radial-gradient(ellipse 90% 70% at 50% 20%,#0f1c38,#05080f 75%);color:#fff;touch-action:pan-y}
canvas{position:absolute;inset:0;width:100%;height:100%;-webkit-mask-image:linear-gradient(transparent 30%,#000 62%);mask-image:linear-gradient(transparent 30%,#000 62%)}
.tx{position:absolute;inset:16px 16px auto;text-align:center;pointer-events:none}
.k{margin:0;color:#8fd3ff;font-size:12px;letter-spacing:.14em}
.t{margin:2px 0 0;font-size:20px;line-height:1.3;font-weight:700}
.pz{position:absolute;right:12px;bottom:12px;display:grid;place-items:center;width:28px;height:28px;padding:0;border:1px solid rgba(255,255,255,.3);border-radius:50%;background:rgba(5,8,15,.65);color:#fff}
.pz:hover{background:rgba(20,40,80,.85)}
.pz:focus-visible{outline-color:#8fd3ff}
.pz svg{width:12px;height:12px;fill:currentColor}
.pz .pl,.paused .pz .pa{display:none}
.paused .pz .pl{display:block}
@container (min-height:260px){.tx{top:24px}
.k{font-size:13px}
.t{font-size:28px}
.pz{right:16px;bottom:16px;width:32px;height:32px}
}
@media (prefers-reduced-motion:reduce){.pz{display:none}
}
</style>

<div class="st"><canvas aria-hidden="true"></canvas><div class="tx"><p class="k">MyPrompts 声音实验室</p><h2 class="t">把声音铺成一片海</h2></div><button type="button" class="pz" aria-pressed="false" aria-label="暂停背景动画"><svg class="pa" viewBox="0 0 12 12" aria-hidden="true"><rect x="2" y="1.5" width="3" height="9" rx="1"/><rect x="7" y="1.5" width="3" height="9" rx="1"/></svg><svg class="pl" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5l7 4.5-7 4.5z"/></svg></button></div>

<script type="module">
const FAR = 3.2, LV = ['#13284a', '#1b3c6b', '#25568f', '#3576b3', '#5199d0', '#7fbde6', '#b6defa', '#eaf7ff'];
export default function demo(root) {
  const st = root.querySelector('.st'), cv = root.querySelector('canvas'), g = cv.getContext('2d'), pz = root.querySelector('.pz');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 0, H = 0, cols = 0, rows = 0, lift, vel, R = 100, L = 20, A = 12, t = 1.7, prev = 0, raf = 0, seen = true, paused = still, px = -1e4, py = -1e4, ghost = !still;
  const draw = () => {
    const K = H * 0.68 / (1 - 1 / FAR), yh = H * 1.04 - K, half = W * 0.54 * FAR, r0 = Math.max(1.6, H * 0.0075);
    const paths = LV.map(() => new Path2D()); // 每档亮度一条路径，一帧只 fill 几次
    if (ghost) { px = W * 0.64; py = H * 0.7; }
    for (let j = 0; j < rows; j++) {
      const z = FAR - (FAR - 1) * j / (rows - 1), s = 1 / z, near = (s - 1 / FAR) / (1 - 1 / FAR);
      for (let i = 0; i < cols; i++) {
        const k = j * cols + i, xw = (i / (cols - 1) * 2 - 1) * FAR * 1.08;
        const h = 0.5 * Math.sin(3.6 * z + 1.2 * t + 0.8 * Math.sin(0.45 * xw + 0.3 * t)) + 0.32 * Math.sin(1.25 * xw - 1.4 * z + 0.75 * t) + 0.18 * Math.sin(2.9 * xw + 2.6 * z - 1.5 * t);
        const x = W / 2 + xw * s * W * 0.5, y0 = yh + s * (K - h * A);
        if (!still) { // 按原始位置算距离，弹簧追目标高度
          const d = Math.hypot(x - px, y0 - py), aim = d < R ? L * (1 - d / R) ** 2 : 0;
          vel[k] = (vel[k] + (aim - lift[k]) * 0.08) * 0.82; lift[k] += vel[k];
        }
        if (x < -4 || x > W + 4) continue;
        const r = r0 * s ** 0.85, b = Math.min(1, 0.55 * (h + 1) / 2 * (0.35 + 0.65 * near) + 0.45 * near + lift[k] / L * 0.5);
        const p = paths[Math.round(b * (LV.length - 1))];
        p.moveTo(x + r, y0 - lift[k]); p.arc(x, y0 - lift[k], r, 0, 7);
      }
    }
    g.clearRect(0, 0, W, H);
    paths.forEach((p, n) => { g.fillStyle = LV[n]; g.fill(p); });
  };
  const frame = (now) => {
    raf = 0;
    if (!root.host.isConnected) return;
    t += Math.min(now - prev, 50) / 1000; prev = now; // 时间只在运行时累加，暂停后接着走
    draw(); run();
  };
  const run = () => { if (!raf && !paused && seen) { if (!prev) prev = performance.now(); raf = requestAnimationFrame(frame); } };
  const fit = () => {
    const d = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight; cv.width = W * d; cv.height = H * d; g.setTransform(d, 0, 0, d, 0, 0);
    cols = Math.round(Math.min(100, Math.max(64, W / 5.2))); rows = Math.round(Math.min(44, Math.max(32, H / 7)));
    lift = new Float32Array(cols * rows); vel = new Float32Array(cols * rows);
    R = Math.min(120, Math.max(80, W * 0.16)); L = Math.min(48, Math.max(24, H * 0.14)); A = H * 0.11;
    draw();
  };
  const at = (e) => { const r = cv.getBoundingClientRect(); ghost = false; px = e.clientX - r.left; py = e.clientY - r.top; };
  const off = () => { px = py = -1e4; };
  st.addEventListener('pointermove', at);
  st.addEventListener('pointerdown', at);
  st.addEventListener('pointerleave', off);
  st.addEventListener('pointercancel', off);
  st.addEventListener('pointerup', (e) => { if (e.pointerType !== 'mouse') off(); });
  pz.addEventListener('click', () => {
    paused = !paused; prev = 0;
    pz.setAttribute('aria-pressed', String(paused)); st.classList.toggle('paused', paused); run();
  });
  new IntersectionObserver(([e]) => { seen = e.isIntersecting; prev = 0; run(); }).observe(st);
  new ResizeObserver(fit).observe(cv);
  fit(); run();
  setTimeout(() => { if (ghost) { ghost = false; off(); } }, 2600); // 挂载后演示一次抬起，再落回
}
</script>
