---
zh: 环成一圈的画廊
en: Ring gallery
order: 10
---

## 是什么

8–12 张卡片按等角度排在一个看不见的圆柱侧面上，正对的一张最清楚，两侧依次变暗变远；左右拖动整圈转动，松手吸附到最近的一张。

## 适合

作品展、系列封面、旅行回顾、新品配色这类 6–12 项、以图为主、允许人随便“逛逛”的展示页首屏。

## 不适合

要快速找到某一项或比较信息时用网格或列表；少于 6 张排不成圈，用「扇形卡片轮换」或「吸附分页滑动」；表单页、后台页不要用。

## 注意

半径要由卡宽和张数算出来，不是随手写一个值，否则卡片要么挤在一起、要么缝很大；转到背后的卡要让出点击，不能挡住正面的卡。

## 要点

- 第 i 张 rotateY(i × 360°/N) translateZ(r)，r = 卡宽 / 2 ÷ tan(180°/N) + 卡宽的 1/4–1/3 作间隙；整圈先 translateZ(-r) 让正面的卡保持原大，外层 perspective 约为 r 的 3–4 倍，再 rotateX(-10° ~ -16°) 俯看，让背后的卡露出上沿
- 拖动时整圈跟手（每 px 转 0.3–0.5°），松手按速度多转一点再吸附到最近的一格，约 500ms 减速停稳；再次按下从当前角度接着转
- 每张按和正面的夹角调透明度（正面 1、侧面约 0.5、背面约 0.2）；夹角超过 90° 的卡 pointer-events: none，不抢正面的点击
- 点侧面的卡就转到它；正面卡的标题、序号和说明放在圆柱下方的平面文字区，打开详情也用平面页面，不在曲面上展开
- 两侧有上一张 / 下一张按钮，整圈可聚焦，左右方向键转一格，首尾无缝接续；转完用 role="status" 播报“名称，第 N / 总数 张”
- 旁边放一个“平铺”按钮（aria-pressed）：整圈摊开成普通网格，卡片回到平面按顺序排，读屏用户和不想转的人直接用它；再点收回圆柱
- 可选：拖得越快，下方标题字距略微拉开（最多 +0.06em），停下后回落
- 只在用户操作时转，不默认无限自转；窄于 360px 时把卡缩小或改成横向吸附列表，减少动态效果时直接跳到目标角度、不做惯性

## 提示词

把{作品封面}做成「环成一圈的画廊」：{张数}张卡按 rotateY(i × 360°/张数) translateZ(r) 排在圆柱侧面，r = 卡宽 / 2 ÷ tan(180°/张数) + 卡宽 × 0.3，整圈先 translateZ(-r)，外层 perspective 约 3.5 倍 r，整圈 rotateX(-14°) 俯看，让背后的卡露出上沿；左右拖动时跟手转动（每 px 约 0.4°），松手按速度多转一点后吸附到最近一张（500ms 减速）；各卡按与正面的夹角调透明度，背面的卡 pointer-events: none；点侧面卡转到它，正面卡的{标题和说明}显示在圆柱下方的平面文字区，点正面卡进入{详情页}；两侧有上一张 / 下一张按钮，整圈可聚焦并支持左右方向键，首尾无缝接续；转完用 role="status" 播报“名称，第 N / {张数} 张”；加一个“平铺”按钮（aria-pressed），把整圈摊成普通网格、再点收回；不自动旋转；减少动态效果时直接跳到目标角度。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<link rel="stylesheet" href="../../_shared/app-card-photos.css">
<style>
.st{display:flex;flex-direction:column;background:radial-gradient(ellipse 80% 70% at 50% 34%,#2c344c,#11141d 76%);color:#eef1f8}
.st :focus-visible{outline-color:#9db4ff}
.scene{position:relative;flex:1;min-height:0;border-radius:12px;touch-action:pan-y;cursor:grab;user-select:none;-webkit-user-select:none;outline-offset:-3px}
.scene::after{content:"";position:absolute;left:50%;bottom:4%;width:72%;height:22%;transform:translateX(-50%);background:radial-gradient(closest-side,rgba(150,170,235,.22),transparent);pointer-events:none}
.ring{position:absolute;left:50%;top:50%;transform-style:preserve-3d;transition:transform .55s cubic-bezier(.2,.8,.2,1)}
.cd{position:absolute;left:-30px;top:-40px;width:60px;height:80px;padding:0;border:0;border-radius:10px;box-shadow:0 10px 18px rgba(0,0,0,.42),inset 0 0 0 1px rgba(255,255,255,.2);cursor:pointer;transition:opacity .55s}
.ring.drag,.ring.drag .cd{transition:none}
.p7{background:radial-gradient(circle at 72% 22%,#fff2c2 0 7%,transparent 7.5%),linear-gradient(transparent 62%,#33416d 62% 65%,#1a2240 65%),linear-gradient(90deg,#3b4878 0 14%,transparent 14% 20%,#2f3b69 20% 38%,transparent 38% 46%,#36437a 46% 58%,transparent 58% 66%,#2c3862 66% 88%,transparent 88%) 0 100%/100% 62% no-repeat,linear-gradient(#1c2445,#565a92)}
.p8{background:radial-gradient(circle at 28% 26%,#fff6d8 0 8%,transparent 8.5%),linear-gradient(transparent 52%,#e0bc52 52% 62%,#bccb5c 62% 73%,#93b451 73% 86%,#6c9844 86%),linear-gradient(#a6d2ee,#eef6f3)}
.bar{flex:none;display:flex;align-items:center;justify-content:center;gap:12px;height:46px;padding-bottom:10px}
.nav{flex:none;display:grid;place-items:center;width:30px;height:30px;padding:0 0 2px;border:1px solid rgba(255,255,255,.28);border-radius:50%;background:rgba(255,255,255,.06);color:#fff;font-size:18px;line-height:1}
.nav:hover{background:rgba(255,255,255,.14)}
.cap{display:flex;flex-direction:column;align-items:center;min-width:104px;line-height:1.3;white-space:nowrap}
.cap b{font-size:14px;font-weight:600}
.cap small{color:#a6aec3;font-size:11px;font-variant-numeric:tabular-nums}
@container (min-height:260px){.cd{left:-48px;top:-64px;width:96px;height:128px;border-radius:14px}
.bar{height:58px;padding-bottom:14px;gap:18px}
.nav{width:36px;height:36px}
.cap b{font-size:16px}
.cap small{font-size:12px}
}
</style>

<div class="st"><div class="scene" tabindex="0" role="group" aria-roledescription="环形画廊" aria-label="去过的 8 个地方，左右方向键转动"><div class="ring"></div></div><div class="bar"><button type="button" class="nav pv" aria-label="上一张">‹</button><div class="cap"></div><button type="button" class="nav nx" aria-label="下一张">›</button></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const P = [['ph1', '雾湖', '1 月'], ['ph2', '黄昏海湾', '3 月'], ['ph3', '松林小径', '4 月'], ['ph4', '赤色沙丘', '6 月'], ['ph5', '星野营地', '7 月'], ['ph6', '南坡花季', '8 月'], ['p7', '港口夜色', '10 月'], ['p8', '稻田小站', '11 月']];
  const N = P.length, STEP = 360 / N, RAD = Math.PI / 180;
  const scene = root.querySelector('.scene'), ring = root.querySelector('.ring'), cap = root.querySelector('.cap'), live = root.querySelector('[role=status]');
  const cards = P.map(([c, n]) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'cd ' + c; b.tabIndex = -1; b.setAttribute('aria-label', n); ring.appendChild(b); return b; });
  let ang = 0, r = 0, d = null, lastDrag = 0;
  const norm = (a) => ((a % 360) + 540) % 360 - 180;
  const cur = () => ((Math.round(-ang / STEP) % N) + N) % N;
  const paint = () => {
    ring.style.transform = `translateZ(${-r}px) rotateX(-14deg) rotateY(${ang}deg)`;
    cards.forEach((c, i) => { const rel = norm(i * STEP + ang), k = (Math.cos(rel * RAD) + 1) / 2; c.style.opacity = (0.2 + 0.8 * k ** 1.3).toFixed(3); c.style.pointerEvents = Math.abs(rel) > 90 ? 'none' : ''; });
  };
  // 半径由卡宽和张数算出：相邻两张之间留出卡宽约 1/3 的缝
  const layout = () => { const w = cards[0].offsetWidth; r = w / 2 / Math.tan(Math.PI / N) + w * 0.32; scene.style.perspective = r * 3.5 + 'px'; cards.forEach((c, i) => { c.style.transform = `rotateY(${i * STEP}deg) translateZ(${r}px)`; }); paint(); };
  const say = (speak) => { const i = cur(), [, n, m] = P[i]; cap.innerHTML = `<b>${n}</b><small>${i + 1} / ${N} · ${m}</small>`; if (speak) live.textContent = `${n}，第 ${i + 1} / ${N} 张`; };
  const to = (a) => { ang = a; paint(); say(true); };
  const go = (k) => to(Math.round(ang / STEP) * STEP - k * STEP);
  const toCard = (i) => to(ang + norm(-i * STEP - ang));
  scene.addEventListener('pointerdown', (e) => { if (!e.button) d = { x: e.clientX, a: ang, lx: e.clientX, t: performance.now(), v: 0, moved: false }; });
  scene.addEventListener('pointermove', (e) => {
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) { d.moved = true; ring.classList.add('drag'); try { scene.setPointerCapture(e.pointerId); } catch {} }
    if (!d.moved) return;
    const now = performance.now(); d.v = (e.clientX - d.lx) / Math.max(1, now - d.t); d.lx = e.clientX; d.t = now;
    ang = d.a + dx * 0.42; paint();
  });
  const end = () => { if (!d) return; const { moved, v } = d; d = null; ring.classList.remove('drag'); if (moved) { lastDrag = performance.now(); to(Math.round((ang + v * 0.42 * 220) / STEP) * STEP); } };
  scene.addEventListener('pointerup', end); scene.addEventListener('pointercancel', end);
  scene.addEventListener('click', (e) => { if (performance.now() - lastDrag < 300) return; const c = e.target.closest('.cd'); if (c) toCard(cards.indexOf(c)); });
  scene.addEventListener('keydown', (e) => {
    const k = { ArrowLeft: () => go(-1), ArrowRight: () => go(1), Home: () => toCard(0), End: () => toCard(N - 1) }[e.key];
    if (k) { e.preventDefault(); k(); }
  });
  root.querySelector('.pv').addEventListener('click', () => go(-1));
  root.querySelector('.nx').addEventListener('click', () => go(1));
  new ResizeObserver(layout).observe(scene);
  layout(); say(false);
  [400, 900].forEach((ms) => setTimeout(() => root.host.isConnected && go(1), ms));
}
</script>
