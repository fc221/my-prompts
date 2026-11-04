---
zh: 星空穿梭背景
en: Starfield warp
aka: 星际穿越 曲速 星空隧道 光速穿梭 warp speed
order: 100
---

## 是什么

星点从画面中心向四周飞出，越近越大越亮并拉出光线，像正在加速穿过星空。

## 适合

发布倒计时和太空主题的首屏；点“开始”之后 1–2 秒的过渡。

## 不适合

长时间阅读的页面背景：持续向外放射的运动会让人头晕。

## 注意

这是最容易引起晕动的背景之一：常驻时只让星星低速漂浮，高速穿梭只放在 1–2 秒的过渡里，播完回落。

## 要点

- 每颗星记 (x, y, z)，z 从 1（远）减到接近 0（近）；屏幕位置 = 中心 + (x, y) ÷ z × 焦距，焦距取宽高较大值的一半；z < 0.02 或飞出画面就回到 z = 1 重生。
- 重生时 x、y 在“z = 1 时刚好铺满画面”的范围里均匀取，星星从画面各处的远方出现，不会全挤在正中心。
- 拖尾：从约 1/30 秒前的位置（z + 速度 × 0.033）画到当前位置，round 线帽；远处的星低速时就是一个点，越近、越快拉得越长，帧率不同长度也一样。线宽 0.6–2.4px、透明度都随 1 − z 增大。
- 星数按面积，每 1500px² 一颗，限制在 300–800；颜色九成白和淡蓝（#ffffff、#dfe8ff、#b9ccff），一成暖色 #ffd9a6。
- 速度按时间差算：常驻漂浮每秒 z 减 0.05–0.08；过渡时 1.6 秒内冲到约 25 倍再回落，曲线前快后慢，如 sin²(π√t)，0.4 秒到峰值。
- 用 requestAnimationFrame（标签页隐藏时自己会停），回来时时间差封顶 0.1 秒；离开视口时停掉循环；常驻漂浮也给暂停按钮。
- canvas 设 aria-hidden，按 devicePixelRatio（上限 2）放大，尺寸变化时重算焦距和星数。
- 减少动态效果时只画一帧静止星空，点“开始”直接切到下一状态，不加速。

## 提示词

给{发布倒计时首屏}做「星空穿梭背景」：canvas 铺满区块，底色用深蓝到黑的径向渐变；星数按面积每 1500px² 一颗，限制在 300–800；每颗星记 (x, y, z)，z 从 1 减到接近 0，屏幕位置 = 中心 + (x, y) ÷ z × 焦距（宽高较大值的一半），z < 0.02 或飞出画面就回到 z = 1、在铺满画面的范围里重生；每颗星从约 1/30 秒前的位置画到当前位置（round 线帽），线宽 0.6–2.4px、亮度随距离变近而增大；颜色九成白和淡蓝、一成暖色；常驻时每秒 z 减 0.06 低速漂浮，点{开始按钮}后 1.6 秒内加速到约 25 倍再回落（sin²(π√t)），然后{进入下一屏}；速度按时间差算，时间差封顶 0.1 秒，离开视口、标签页隐藏时停，提供暂停按钮；按 devicePixelRatio（上限 2）放大，尺寸变化时重算；canvas 对读屏隐藏；减少动态效果时只画一帧静止星空，点{开始按钮}直接切换，不加速。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;place-content:center;justify-items:center;gap:12px;background:radial-gradient(ellipse at 50% 45%,#14214c,#03050d 72%);color:#f3f6ff;text-align:center}
canvas{position:absolute;inset:0;width:100%;height:100%}
.tx{position:relative;display:grid;gap:4px;padding:0 16px;text-shadow:0 0 12px #03050d}
.tx small{color:#b3c0e4;font-size:12px}
.tx b{font-size:20px;line-height:1.3}
.go.ctl{position:relative;height:32px;padding:0 16px}
.pz.ctl{position:absolute;right:8px;bottom:8px;height:28px;padding:0 12px;border-color:rgba(179,192,228,.4);background:rgba(3,5,13,.7);color:#e2e8fa;font-size:12px}
.pz.ctl:hover{border-color:rgba(179,192,228,.7);background:#141d3d}
@container (min-height:260px){.st{gap:16px}
.tx{gap:8px}
.tx small{font-size:13px}
.tx b{font-size:32px}
.go.ctl{height:40px;padding:0 20px;font-size:14px}
.pz.ctl{right:12px;bottom:12px}
}
</style>

<div class="st"><canvas aria-hidden="true"></canvas><div class="tx"><small>MyPrompts 2.0 · 发布倒计时</small><b>还有 3 天，准备出发</b></div><button type="button" class="ctl go">加速穿梭</button><button type="button" class="ctl pz">暂停</button></div>

<script type="module">
const COLORS = ['#ffffff', '#dfe8ff', '#b9ccff'], WARM = '#ffd9a6';
const DRIFT = 0.06, PEAK = 25, SPAN = 1.6; // 常驻每秒 z 减多少；过渡时最高多少倍；过渡几秒
export default function demo(root) {
  const st = root.querySelector('.st'), cv = root.querySelector('canvas'), g = cv.getContext('2d'), go = root.querySelector('.go'), pz = root.querySelector('.pz');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 0, H = 0, F = 1, stars = [], raf = 0, last = 0, seen = true, paused = false, boost = -1;
  const spawn = (s, z) => { // 在这个深度上刚好铺满画面的范围里均匀取
    s.z = z; s.x = (Math.random() * 2 - 1) * (W / 2 / F) * z; s.y = (Math.random() * 2 - 1) * (H / 2 / F) * z;
    s.c = Math.random() < 0.1 ? WARM : COLORS[(Math.random() * 3) | 0];
    return s;
  };
  const speed = () => {
    const base = paused ? 0 : DRIFT;
    if (boost < 0) return base;
    if (boost >= SPAN) { boost = -1; return base; }
    return base + DRIFT * PEAK * Math.sin(Math.PI * Math.sqrt(boost / SPAN)) ** 2; // 0.4 秒冲到最快，再用 1.2 秒回落
  };
  const draw = (v) => {
    g.clearRect(0, 0, W, H);
    for (const s of stars) {
      const tz = Math.min(1, s.z + Math.max(v, 0.001) * 0.033), d = 1 - s.z; // 从约 1/30 秒前的位置画过来，帧率不同拖尾一样长；静止时是一个点
      g.globalAlpha = Math.min(1, 0.25 + d); g.lineWidth = 0.6 + 1.8 * d * d; g.strokeStyle = s.c;
      g.beginPath(); g.moveTo(W / 2 + (s.x / tz) * F, H / 2 + (s.y / tz) * F); g.lineTo(W / 2 + (s.x / s.z) * F, H / 2 + (s.y / s.z) * F); g.stroke();
    }
    g.globalAlpha = 1;
  };
  const tick = (now) => {
    raf = 0;
    if (!root.host.isConnected || !seen) { last = 0; return; }
    const dt = last ? Math.min((now - last) / 1000, 0.1) : 0; // 切回标签页时时间差封顶
    last = now;
    if (boost >= 0) boost += dt;
    const v = speed();
    for (const s of stars) {
      s.z -= v * dt;
      if (s.z < 0.02 || Math.abs(s.x / s.z) * F > W / 2 + 4 || Math.abs(s.y / s.z) * F > H / 2 + 4) spawn(s, 1);
    }
    draw(v);
    if (!paused || boost >= 0) raf = requestAnimationFrame(tick);
    else last = 0;
  };
  const kick = () => { if (!still && !raf) raf = requestAnimationFrame(tick); };
  const fit = () => {
    const w = cv.clientWidth, h = cv.clientHeight;
    if (w === W && h === H) return;
    const d = Math.min(devicePixelRatio || 1, 2);
    W = w; H = h; F = Math.max(W, H) / 2;
    cv.width = W * d; cv.height = H * d; g.setTransform(d, 0, 0, d, 0, 0); g.lineCap = 'round';
    stars = Array.from({ length: Math.round(Math.min(800, Math.max(300, (W * H) / 1500))) }, () => spawn({}, 0.05 + Math.random() * 0.95));
    draw(0);
  };
  go.addEventListener('click', () => { boost = 0; kick(); });
  pz.addEventListener('click', () => { paused = !paused; pz.textContent = paused ? '继续' : '暂停'; kick(); });
  const io = new IntersectionObserver(([e]) => { if (!root.host.isConnected) return io.disconnect(); seen = e.isIntersecting; if (seen) kick(); });
  io.observe(st);
  new ResizeObserver(fit).observe(cv);
  fit();
  if (still) { go.hidden = pz.hidden = true; return; } // 减少动态效果：只留一帧静止星空
  kick();
  setTimeout(() => { boost = 0; kick(); }, 300); // 挂载后自动穿梭一次，之后回到低速漂浮
}
</script>
