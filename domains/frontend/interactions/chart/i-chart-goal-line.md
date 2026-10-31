---
zh: 拖动目标线
en: Draggable goal line
order: 70
---

## 是什么

柱状图上横着一条目标线，按住上下拖动就能改目标值；够到目标的柱子保持实色，没够到的变淡，标题实时写出“7 天里几天达标”。

## 适合

步数、睡眠、销售额、预算这类有日目标或周目标的图表，想让人直接试一试“目标定在多少合适”。

## 不适合

目标由系统或上级规定、用户不能改时，只画一条静态参考线；需要输入精确数值的场景，在旁边放数字输入框，拖动只做粗调。

## 注意

拖动中只在前端重算高亮和达标天数，松手（或键盘停下）才保存目标值；保存失败时目标线回到原值并提示。

## 要点

- 目标线 2px 虚线，右端贴一个数值标签（“目标 9,000”）；可拖热区上下各延伸到总高 ≥ 24px，光标 ns-resize，只有热区设 touch-action: none，图表其余部分照常滚动页面
- 值吸附到整步长（如 500），限制在坐标轴范围内；拖动时标签和柱子跟着步长跳，不显示小数
- 达标的柱子用强调色实心，未达标降到约 40% 不透明度，明暗差本身就能区分，不只靠色相
- 标题写“N/7 天达标”，数字用等宽数字，变化时不挤动旁边的文字
- 目标线是 role="slider"：aria-valuemin / max / now，aria-valuetext 写“目标 9,000 步，3 天达标”；↑↓ 一步、Shift+↑↓ 十步、Home / End 到最小最大
- 松手后用 role="status" 播报一次结果，拖动过程中不连续播报
- 要选一段时间看数据用「拖选一段区间」，要读每个点的值用「十字线跟随读数」，三者可以同时存在：目标线只响应自己的热区
- 减少动态效果时柱子颜色直接切换，不做过渡

## 提示词

给{柱状图，如 每日步数}加「拖动目标线」：图上横一条 2px 虚线目标线，右端贴“目标 {数值}”标签；按住线（热区总高 ≥ 24px，光标 ns-resize，只有热区 touch-action: none）上下拖动改目标，值吸附到 {步长，如 500}，限制在坐标轴范围内；够到目标的柱子保持实心强调色，没够到的降到 40% 不透明度；标题实时显示“N/{天数} 天达标”（等宽数字）；目标线 role="slider"，aria-valuetext 写目标值和达标天数，↑↓ 一步、Shift+↑↓ 十步、Home / End 到两端；拖动中只在前端重算，松手才保存，保存失败回到原值并提示，结果用 role="status" 播报一次；减少动态效果时颜色直接切换。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:10px 12px}
.box{display:grid;grid-template-rows:auto minmax(0,1fr);gap:6px;max-width:560px;height:100%;margin:0 auto;padding:8px 12px 6px;border:1px solid #e3e6eb;border-radius:12px;background:#fff}
.hd{display:flex;align-items:baseline;justify-content:space-between;gap:8px;white-space:nowrap}
.hd b{font-size:13px}
.hd span{color:#5b616e;font-size:12px}
.hd strong{color:#1f2329;font-size:14px;font-variant-numeric:tabular-nums}
.ch{position:relative;min-height:0}
svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.bar{fill:#3b5bdb;transition:fill-opacity .15s}
.bar.no{fill-opacity:.38}
.ax{fill:#5b616e;font-size:11px}
.gl{stroke:#1f2329;stroke-width:2;stroke-dasharray:5 4}
.tag rect{fill:#1f2329}
.tag text{fill:#fff;font-size:11px;font-variant-numeric:tabular-nums}
.hand{position:absolute;left:0;height:24px;border-radius:6px;cursor:ns-resize;touch-action:none}
.ch:has(.hand:focus-visible) .gl,.ch.drag .gl{stroke-width:3}
@container (min-width:560px){.box{padding:12px 16px 8px}
.hd b{font-size:14px}
}
</style>

<div class="st"><div class="box">
  <div class="hd"><b>本周步数</b><span><strong class="n">0/7</strong> 天达标</span></div>
  <div class="ch"><svg aria-hidden="true"></svg><div class="hand" tabindex="0" role="slider" aria-label="每日目标步数" aria-valuemin="2000" aria-valuemax="14000"></div></div>
  <p class="sr" role="status"></p>
</div></div>

<script type="module">
export default function demo(root) {
  const D = [6200, 8800, 7800, 10300, 5400, 11800, 8600], DAY = '一二三四五六日', MIN = 2000, MAX = 14000, STEP = 500;
  const ch = root.querySelector('.ch'), svg = root.querySelector('svg'), n = root.querySelector('.n'), hand = root.querySelector('.hand'), sr = root.querySelector('.sr');
  const NS = 'http://www.w3.org/2000/svg', mk = (t, a, p = svg) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); p.append(e); return e; };
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let goal = 8000, W = 0, H = 0, R = 0, B = 0, bars = [], line, tag, tagT, touched = false;
  const L = 4, T = 6, y = (v) => B - (v / MAX) * (B - T), fmt = (v) => v.toLocaleString('en-US'), met = () => D.filter((v) => v >= goal).length;

  const draw = () => {
    svg.replaceChildren(); R = W - (W < 360 ? 76 : 88); B = H - 18;
    const pitch = (R - L) / 7, bw = Math.min(28, pitch * 0.62);
    bars = D.map((v, i) => {
      const cx = L + pitch * (i + 0.5), t = mk('text', { class: 'ax', x: cx, y: H - 3, 'text-anchor': 'middle' }); t.textContent = DAY[i];
      return mk('rect', { class: 'bar', x: cx - bw / 2, y: y(v), width: bw, height: B - y(v), rx: Math.min(4, bw / 4) });
    });
    line = mk('line', { class: 'gl', x1: L, x2: R + 6 });
    tag = mk('g', { class: 'tag' }); mk('rect', { rx: 4, width: W - R - 10, height: 18 }, tag); tagT = mk('text', { x: 6, y: 13 }, tag);
    hand.style.width = R + 6 + 'px';
    show();
  };
  const show = () => {
    const gy = y(goal);
    line.setAttribute('y1', gy); line.setAttribute('y2', gy);
    tag.setAttribute('transform', `translate(${R + 8} ${gy - 9})`); tagT.textContent = '目标 ' + fmt(goal);
    bars.forEach((r, i) => r.classList.toggle('no', D[i] < goal));
    n.textContent = `${met()}/7`;
    hand.style.top = gy - 12 + 'px';
    hand.setAttribute('aria-valuenow', goal); hand.setAttribute('aria-valuetext', `目标 ${fmt(goal)} 步，${met()} 天达标`);
  };
  const set = (v) => { const g = Math.max(MIN, Math.min(MAX, Math.round(v / STEP) * STEP)); if (g !== goal) { goal = g; show(); } };
  // 松手或键盘停下才“保存”，结果播报一次
  const save = () => { sr.textContent = `目标改为 ${fmt(goal)} 步，7 天里 ${met()} 天达标`; };

  hand.addEventListener('pointerdown', (e) => {
    touched = true; hand.setPointerCapture(e.pointerId); ch.classList.add('drag');
    const top = ch.getBoundingClientRect().top, dy = e.clientY - top - y(goal);
    const move = (ev) => set(((B - (ev.clientY - top - dy)) / (B - T)) * MAX);
    const up = () => { hand.removeEventListener('pointermove', move); ch.classList.remove('drag'); save(); };
    hand.addEventListener('pointermove', move);
    hand.addEventListener('pointerup', up, { once: true }); hand.addEventListener('pointercancel', up, { once: true });
  });
  hand.addEventListener('keydown', (e) => {
    const s = e.shiftKey ? STEP * 10 : STEP;
    const to = { ArrowUp: goal + s, ArrowRight: goal + s, ArrowDown: goal - s, ArrowLeft: goal - s, PageUp: goal + STEP * 10, PageDown: goal - STEP * 10, Home: MIN, End: MAX }[e.key];
    if (to === undefined) return;
    e.preventDefault(); touched = true; set(to);
  });
  hand.addEventListener('keyup', (e) => { if (/^(Arrow|Page|Home|End)/.test(e.key)) save(); });

  // 自动演示：目标从 8,000 分三步提到 9,500，达标天数跟着变少；用户先动手就停
  const auto = () => { if (still) { set(9500); return; } [8500, 9000, 9500].forEach((v, i) => setTimeout(() => !touched && root.host.isConnected && set(v), 180 * i)); };
  let first = true;
  const ro = new ResizeObserver(() => {
    if (!root.host.isConnected) { ro.disconnect(); return; }
    W = ch.clientWidth; H = ch.clientHeight; if (W && H) draw();
    if (first && W) { first = false; setTimeout(() => !touched && root.host.isConnected && auto(), 500); }
  });
  ro.observe(ch);
}
</script>
