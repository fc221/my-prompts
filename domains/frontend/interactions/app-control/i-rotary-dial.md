---
zh: 绕圈拨动的旋钮
en: Rotary dial
order: 30
---

## 是什么

圆形旋钮，手指绕着圆心转来改数值：每转一格吸附一下，已选的弧段亮起来，中间的数字跟着上下滚动；转到头就停住，不会从最大跳回最小。

## 适合

定时器、温度、音量、火力档位这类范围固定、二三十档以内、想要实体手感的数值，常见于智能家居、厨房电器和计时类 App。

## 不适合

要输入精确值或范围很大（如 0–10000）用数字输入；一边看预览一边细调用「横向刻度尺调参」；桌面表单里用普通滑块。

## 注意

数值由指针相对圆心的角度决定，用 atan2 算，并把相邻两次的角度差折算到 -180°～180° 再累加——这样跨过正上方或正下方时不会突然跳一大截；累加结果夹在可用弧的两端之间。

## 要点

- 直径 160–200px，可用弧 270°（从左下到右下，缺口朝下），两端是硬止点；每格 15°，数值按步长换算（如 0–90 分钟每格 5 分钟），刻度每格一根、每 3 格一根长的。
- 按在圆环上直接跳到那个位置，然后跟着转；指针离圆心太近（小于半径的 30%）时不更新，避免角度乱跳。
- 已选弧段用强调色，圆环上有一个跟随的小圆钮；中心数字用等宽数字，换格时朝转动方向滚一下（做法同「数字滚动计数」），可选每格 5ms 轻震。
- role="slider"，写 aria-valuemin / max / now 和 aria-valuetext（如“定时 25 分钟”）；←/↓ 减一格、→/↑ 加一格，PageUp / PageDown 一大格，Home / End 到两端。
- touch-action: none 只设在旋钮上，页面其余部分照常滚动。
- 减少动态效果时数字直接换，不滚动。

## 提示词

给{设置项，如 厨房定时}做「绕圈拨动的旋钮」：直径 {180}px 的圆环，可用弧 270°、缺口朝下，两端是止点；范围 {0–90 分钟}，每格 15° 对应 {5 分钟}，每格一根刻度、每 3 格一根长刻度；按在圆环上就跳到该位置并跟着转，用 atan2 算角度，相邻两次的差折算到 -180°～180° 再累加并夹在两端之间，指针离圆心不到半径 30% 时不更新；已选弧段用强调色，圆环上有跟随的小圆钮，中心大号等宽数字换格时朝转动方向滚动一下；role="slider" 带 aria-valuetext，方向键一格、PageUp / PageDown 一大格、Home / End 到两端；touch-action: none 只设在旋钮上；减少动态效果时数字直接换。

## 示例

<link rel="stylesheet" href="../../_shared/app-control-base.css">
<style>
.st{display:flex;align-items:center;justify-content:center;gap:14px;padding:10px 16px;background:#f7f4ef}
.dial{position:relative;flex:none;width:min(176px,calc(100cqh - 24px),56cqw);aspect-ratio:1;border-radius:50%;background:#fffdf9;box-shadow:0 6px 18px rgba(80,60,30,.14),inset 0 0 0 1px #ece6dc;touch-action:none;cursor:grab;outline-offset:4px}
.dial svg{position:absolute;inset:0;width:100%;height:100%}
.trk,.arc{fill:none;stroke-width:7;stroke-linecap:round}
.trk{stroke:#e7e1d7}
.arc{stroke:#e8590c}
.tk{stroke:#b9b1a5;stroke-width:1.2;stroke-linecap:round}
.tk.on{stroke:#e8590c}
.kb{fill:#fff;stroke:#e8590c;stroke-width:2.5}
.ctr{position:absolute;inset:0;display:grid;place-content:center;justify-items:center;pointer-events:none}
.num{display:block;font-size:34px;font-weight:700;line-height:1.1;font-variant-numeric:tabular-nums;color:#2b2520}
.ctr small{color:#6f665b;font-size:12px}
.side{display:grid;gap:6px;min-width:0;max-width:150px}
.side b{font-size:14px}
.side p{margin:0;color:#6f665b;font-size:12px;text-wrap:balance}
.go{justify-self:start;height:32px;padding:0 14px;border:0;border-radius:999px;background:#e8590c;color:#fff;font-weight:600}
.msg{min-height:18px;color:#6f665b;font-size:12px}
@container (max-width:320px){.st{gap:10px;padding:10px 12px}
.num{font-size:30px}
}
</style>

<div class="st">
  <div class="dial" role="slider" tabindex="0" aria-label="定时" aria-valuemin="0" aria-valuemax="90" aria-valuenow="0" aria-valuetext="定时 0 分钟">
    <svg viewBox="0 0 100 100" aria-hidden="true"><g class="tks"></g><circle class="trk" cx="50" cy="50" r="40" transform="rotate(135 50 50)"/><circle class="arc" cx="50" cy="50" r="40" transform="rotate(135 50 50)"/><circle class="kb" r="5.5"/></svg>
    <span class="ctr" aria-hidden="true"><span class="num">0</span><small>分钟</small></span>
  </div>
  <div class="side"><b>厨房定时</b><p>绕圈拖动，或按方向键</p><button type="button" class="go">开始</button><span class="msg" role="status"></span></div>
</div>

<script type="module">
const N = 18, STEP = 5, DEG = 15, R = 40, C = 2 * Math.PI * R;
export default function demo(root) {
  const dial = root.querySelector('.dial'), arc = root.querySelector('.arc'), trk = root.querySelector('.trk'), kb = root.querySelector('.kb'), num = root.querySelector('.num'), msg = root.querySelector('.msg');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // 刻度：每格一根，每 3 格一根长的
  root.querySelector('.tks').innerHTML = Array.from({ length: N + 1 }, (_, i) => { const a = (-135 + i * DEG) * Math.PI / 180, r1 = i % 3 ? 30 : 27; return `<line class="tk" data-i="${i}" x1="${50 + 33 * Math.sin(a)}" y1="${50 - 33 * Math.cos(a)}" x2="${50 + r1 * Math.sin(a)}" y2="${50 - r1 * Math.cos(a)}"/>`; }).join('');
  const tks = [...root.querySelectorAll('.tk')];
  trk.style.strokeDasharray = `${C * 0.75} ${C}`;
  let v = 0, acc = -135, last = 0, drag = false;
  const setV = (s, feel) => {
    s = Math.max(0, Math.min(N, s)); const dir = Math.sign(s - v); v = s;
    const a = (-135 + s * DEG) * Math.PI / 180;
    arc.style.strokeDasharray = `${C * 0.75 * s / N} ${C}`;
    kb.setAttribute('cx', 50 + R * Math.sin(a)); kb.setAttribute('cy', 50 - R * Math.cos(a));
    tks.forEach((t, i) => t.classList.toggle('on', i <= s));
    num.textContent = s * STEP; dial.setAttribute('aria-valuenow', s * STEP); dial.setAttribute('aria-valuetext', `定时 ${s * STEP} 分钟`);
    if (dir && !still) num.animate([{ transform: `translateY(${dir * 35}%)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 160, easing: 'ease-out' });
    if (dir && feel) navigator.vibrate?.(5);
  };
  // 角度：0° 在正上方，顺时针为正；离圆心太近返回 null
  const angle = (e) => { const r = dial.getBoundingClientRect(), dx = e.clientX - r.left - r.width / 2, dy = e.clientY - r.top - r.height / 2; return Math.hypot(dx, dy) < r.width * 0.15 ? null : Math.atan2(dx, -dy) * 180 / Math.PI; };
  const sync = (feel) => { const s = Math.round((acc + 135) / DEG); if (s !== v) setV(s, feel); };
  dial.addEventListener('pointerdown', (e) => {
    if (e.button > 0) return; const a = angle(e); drag = true; dial.setPointerCapture(e.pointerId); msg.textContent = '';
    if (a === null) { last = null; return; }
    if (a >= -135 && a <= 135) acc = a; last = a; sync(true);
  });
  dial.addEventListener('pointermove', (e) => {
    if (!drag) return; const a = angle(e); if (a === null) return;
    if (last === null) { last = a; return; }
    let d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a;
    acc = Math.max(-135, Math.min(135, acc + d)); sync(true);
  });
  const end = () => { drag = false; acc = -135 + v * DEG; };
  dial.addEventListener('pointerup', end); dial.addEventListener('pointercancel', end);
  dial.addEventListener('keydown', (e) => {
    const to = { ArrowRight: v + 1, ArrowUp: v + 1, ArrowLeft: v - 1, ArrowDown: v - 1, PageUp: v + 3, PageDown: v - 3, Home: 0, End: N }[e.key];
    if (to === undefined) return; e.preventDefault(); setV(to); acc = -135 + v * DEG;
  });
  root.querySelector('.go').addEventListener('click', () => { msg.textContent = v ? `已开始，${v * STEP} 分钟后提醒` : '先拨一个时间'; });
  setV(0);
  // 挂载后演示：拨到 25 分钟
  if (still) { setV(5); acc = -135 + 5 * DEG; return; }
  let i = 0; const t = setInterval(() => { if (!root.host.isConnected || drag || ++i > 5) { clearInterval(t); acc = -135 + v * DEG; return; } setV(i); }, 90);
}
</script>
