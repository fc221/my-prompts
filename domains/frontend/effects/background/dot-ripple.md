---
zh: 点阵波纹
en: Dot grid ripple
aka: 点阵涟漪 波点背景 交互点阵 dot ripple
order: 60
---

## 是什么

一片静止的点阵背景，点击或划过时从那一点荡开一圈波纹：波前经过的圆点被推开、放大、变色，过去后回到原位。

## 适合

开发者产品、AI 工具的首屏或空状态，背景平时要安静，又想给指针一点回应。

## 不适合

只要静态纹理用「点阵渐隐背景」，纯 CSS 零开销；按钮上的点击反馈用「水波点击」；表单和长列表页保持背景安静。

## 注意

波纹只在有输入时才跑：平时 canvas 是一张静止的图，最后一圈消失后画一帧干净状态就结束循环。文字要压得住波纹，给文字层垫一层半透明底色。

## 要点

- 点距 18–24px，半径 1.4px，中性灰；被波及时半径最大约 3.6px，偏向强调色，沿径向推开 4–7px。
- 波前半径 = 速度 × 时间（约 230px/s），带宽约 46px，带内强度用 (1 − u²)²，1.5 秒内线性衰减到 0。
- 每个点把所有波的影响相加，同时最多 6 圈，超出丢掉最早的。
- 划过时按距离和时间抽样（至少 36px、110ms 才起一圈），否则鼠标一动满屏都是波。
- 没被波及的点合成一条路径一次填充，被波及的点才单独画；devicePixelRatio 上限 2。
- 四周渐隐用 CSS mask 加在 canvas 上，写法和「点阵渐隐背景」一致，不进绘制循环。
- 文字层 pointer-events: none，事件落到舞台上；触屏用 touch-action: pan-y，保留纵向滚动，轻点起一圈。
- canvas aria-hidden；另给一个按钮从中心荡一圈，键盘也能触发。
- 减少动态效果时不扩散，点击处一圈点亮约 500ms 后恢复。

## 提示词

给{首屏背景}做「点阵波纹」：canvas 铺满区块，画点距 18px、半径 1.4px 的中性灰点阵，四周用 CSS mask 渐隐；点击时从点击处荡开一圈波纹，鼠标划过时也起波（至少隔 36px、110ms），触屏轻点起波并保留纵向滚动（touch-action: pan-y）；波前半径 = 230px/s × 时间，带宽 46px，带内强度 (1 − u²)²，1.5 秒线性衰减，被波及的点半径增大到 3.6px、偏向{强调色}、沿径向推开最多 7px，多圈叠加，同时最多 6 圈；没被波及的点合成一条路径填充；所有波结束后画一帧干净状态并结束循环，devicePixelRatio 上限 2；文字层 pointer-events: none 并垫半透明底色；canvas 对读屏隐藏，另给一个按钮从中心荡一圈；减少动态效果时不扩散，点击处一圈点亮 500ms。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;place-items:center;background:#fff;cursor:crosshair;touch-action:pan-y}
canvas{position:absolute;inset:0;width:100%;height:100%;-webkit-mask-image:radial-gradient(ellipse 78% 74% at 50% 50%,#000 46%,transparent 100%);mask-image:radial-gradient(ellipse 78% 74% at 50% 50%,#000 46%,transparent 100%)}
.cp{position:relative;display:grid;justify-items:center;gap:2px;padding:6px 14px;border-radius:12px;background:rgba(255,255,255,.82);text-align:center;pointer-events:none}
.cp small{color:#5b6172;font-size:12px}
.cp b{color:#171a24;font-size:19px;line-height:1.3}
.go{position:absolute;right:10px;bottom:10px}
.go.ctl{height:28px;padding:0 10px;font-size:12px}
@container (min-height:260px){.cp b{font-size:30px}
.cp small{font-size:13px}
.go{right:14px;bottom:14px}
}
</style>

<div class="st"><canvas aria-hidden="true"></canvas><div class="cp"><small>MyPrompts 工作台</small><b>每次改动都有回响</b></div><button type="button" class="ctl go">荡一圈</button></div>

<script type="module">
const GAP = 18, SPEED = 230, BAND = 46, LIFE = 1.5, MAX = 6, PUSH = 7;
export default function demo(root) {
  const st = root.querySelector('.st'), cv = root.querySelector('canvas'), g = cv.getContext('2d');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 0, H = 0, raf = 0, list = [], clear = 0;
  const frame = (now) => {
    raf = 0;
    if (!root.host.isConnected) return;
    list = list.filter((r) => still || (now - r.t) / 1000 < LIFE);
    g.clearRect(0, 0, W, H);
    g.fillStyle = '#c6cad3';
    g.beginPath(); // 没被波及的点一条路径画完，波及到的才单独算
    const hit = [];
    for (let y = GAP / 2; y < H; y += GAP) for (let x = GAP / 2; x < W; x += GAP) {
      let e = 0, dx = 0, dy = 0;
      for (const r of list) {
        const age = still ? 0.3 : (now - r.t) / 1000, ox = x - r.x, oy = y - r.y, d = Math.hypot(ox, oy) || 1, u = (d - age * SPEED) / BAND;
        if (u <= -1 || u >= 1) continue;
        const k = (1 - u * u) ** 2 * (1 - age / LIFE); // 只在波前那一圈起作用，越往外越弱
        e += k;
        if (!still) { dx += (ox / d) * k * PUSH; dy += (oy / d) * k * PUSH; }
      }
      if (e < 0.02) { g.moveTo(x + 1.4, y); g.arc(x, y, 1.4, 0, 7); } else hit.push(x + dx, y + dy, Math.min(1, e));
    }
    g.fill();
    for (let i = 0; i < hit.length; i += 3) {
      const a = hit[i + 2];
      g.fillStyle = `rgba(${198 - 139 * a},${202 - 122 * a},${211 + 33 * a},1)`;
      g.beginPath(); g.arc(hit[i], hit[i + 1], 1.4 + a * 2.2, 0, 7); g.fill();
    }
    if (list.length && !still) raf = requestAnimationFrame(frame);
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
  const ripple = (x, y) => {
    list.push({ x, y, t: performance.now() });
    if (list.length > MAX) list.shift();
    kick();
    if (still) { clearTimeout(clear); clear = setTimeout(() => { list = []; kick(); }, 500); } // 减少动态效果：原地亮一下，不扩散
  };
  const fit = () => {
    const d = Math.min(devicePixelRatio || 1, 2); W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * d; cv.height = H * d; g.setTransform(d, 0, 0, d, 0, 0); kick();
  };
  const at = (e) => { const r = st.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  let lx = 0, ly = 0, lt = 0;
  st.addEventListener('pointerdown', (e) => { if (e.target.closest('.go')) return; [lx, ly] = at(e); lt = e.timeStamp; ripple(lx, ly); });
  st.addEventListener('pointermove', (e) => { // 划过时按距离和时间抽样，不是每个事件都起一圈
    if (e.pointerType !== 'mouse' || e.target.closest('.go')) return;
    const [x, y] = at(e);
    if (Math.hypot(x - lx, y - ly) < 36 || e.timeStamp - lt < 110) return;
    lx = x; ly = y; lt = e.timeStamp; ripple(x, y);
  });
  root.querySelector('.go').addEventListener('click', () => ripple(W / 2, H / 2));
  new ResizeObserver(fit).observe(cv);
  fit();
  setTimeout(() => ripple(W * 0.68, H * 0.42), 120);
  setTimeout(() => ripple(W * 0.24, H * 0.66), 480);
}
</script>
