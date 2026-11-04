---
zh: 十字线跟随读数
en: Crosshair readout
order: 20
---

## 是什么

指针在折线图上移动时，竖线吸附到最近的采样点、横线跟着指针的高度，两条轴上各有一个深色小标签显示时间和数值，所有系列在这一刻的读数固定列在图上方。

## 适合

几条线要对齐同一时刻比较的曲线：温度、负载、价格、库存水位，既要读“这一刻各是多少”，也要读“这个高度对应多少”。

## 不适合

单条线、点很少时直接在点上标数值；要逐个核对精确值时给表格；以触屏为主的页面改成按住拖动读数或点选某一天，不要依赖悬停。

## 注意

竖线吸附到真实的采样点，读数取原始数据，不要按像素插值出一个不存在的数；某个系列这一刻没有数据就写“—”，不要拿相邻的点顶上。

## 要点

- 竖线吸附最近的采样点，横线跟随指针高度；横轴标签显示时间，纵轴标签显示指针高度换算出的值（按纵轴单位保留一位小数）
- 读数固定在图上方，和图例合在一起：色点 + 系列名 + 数值 + 单位；不用会挡住曲线的浮动气泡
- 每条线在竖线处画 6–8px 的圆点（白色描边）；缺测的系列不画点，读数写“—”，线在缺测段断开
- 轴上的标签靠近两端时往里收，不超出绘图区；指针离开后十字线隐藏，读数回到最新一刻并标“最新”
- 图表可聚焦：左右键逐点移动，Home / End 到首尾，Esc 隐藏；键盘移动时用 role="status" 播报读数，鼠标移动不播报
- 触屏上按住后拖动读数，图表区 touch-action: pan-y，不抢页面纵向滚动
- 同一页几张图共用时间轴时联动：指向任一张，其余几张在同一时刻画竖线、显示各自的读数（图和表格之间的联动见「图表与表格联动」）
- 十字线跟手，不加缓动；顶部读数换值时数字在等宽框里上下滚一下（约 120ms），指针快速连续移动时直接替换；交点圆点外加一圈同色低透明度光晕，指针停住时轻微呼吸；减少动态效果时去掉滚动和呼吸，其余不变

## 提示词

给{多系列折线图}加「十字线跟随读数」：指针移动时竖线吸附到最近的采样点，横线跟随指针高度；横轴上显示当前时间的深色标签，纵轴上显示指针高度对应数值的标签，靠近两端时往里收；所有系列在这一刻的读数固定显示在图上方（色点 + 系列名 + 数值 + 单位），读数取原始数据，缺测的系列写“—”、不画点、线在缺测段断开；每条线在竖线处画 6px 白描边圆点；指针离开后隐藏十字线，读数回到最新一刻并标“最新”；图表可聚焦，左右键逐点移动、Home / End 到首尾、Esc 隐藏，键盘移动时用 role="status" 播报读数；触屏按住后拖动读数，touch-action: pan-y；同页共用时间轴的{其他图表}同步显示这一刻的竖线和读数；十字线直接跟手不加缓动；读数换值时数字上下滚动约 120ms，快速移动时直接替换；交点圆点带一圈同色淡光晕，停住时轻微呼吸；减少动态效果时去掉滚动和呼吸。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:10px 12px}
.box{display:grid;grid-template-rows:auto minmax(0,1fr);gap:6px;max-width:640px;height:100%;margin:0 auto;padding:8px 12px 6px;border:1px solid #e3e6eb;border-radius:12px;background:#fff}
.rd{display:flex;align-items:center;gap:12px;min-width:0;height:22px;font-size:12px;white-space:nowrap;overflow:hidden}
.tm{flex:none;min-width:40px;font-weight:600;font-variant-numeric:tabular-nums}
.tm small{margin-right:4px;color:#5b616e;font-size:11px;font-weight:400}
.it{display:inline-flex;align-items:center;gap:4px;color:#5b616e}
.it i{flex:none;width:8px;height:8px;border-radius:50%}
.it b{color:#1f2329;font-weight:600;font-variant-numeric:tabular-nums}
.it .off{color:#8a909c;font-weight:400}
.ch{position:relative;min-height:0;touch-action:pan-y;cursor:crosshair;user-select:none;border-radius:4px}
.ch:focus-visible{outline-offset:3px}
svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.gl{stroke:#eceef2}
.ax{fill:#5b616e;font-size:11px;font-variant-numeric:tabular-nums}
.ln{fill:none;stroke-width:2;stroke-linejoin:round;stroke-linecap:round}
.cx{stroke:#5b616e;stroke-width:1;stroke-dasharray:3 3}
.bd rect{fill:#1f2329}
.bd text{fill:#fff;font-size:11px;font-variant-numeric:tabular-nums}
.dot{stroke:#fff;stroke-width:2}
.k{display:none}
.on .k{display:inline}
@container (max-width:320px){.rd{gap:9px}
.tm{display:none}
}
@container (min-width:560px){.box{padding:12px 16px 8px}
.rd{font-size:13px}
}
</style>

<div class="st"><div class="box"><div class="rd" aria-hidden="true"></div><div class="ch" tabindex="0" role="group" aria-label="温室 24 小时温度折线图：A 棚、B 棚和室外三条线，B 棚 13 到 14 点传感器离线。聚焦后用左右方向键逐小时读数"><svg aria-hidden="true"></svg></div><p class="sr" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wave = (h, mid, amp, peak) => Math.round((mid + amp * Math.cos(((h - peak) / 24) * 2 * Math.PI)) * 10) / 10;
  const S = [
    { n: 'A 棚', c: '#3b5bdb', d: Array.from({ length: 24 }, (_, h) => wave(h, 22.4, 4.2, 14)) },
    { n: 'B 棚', c: '#0ca678', d: Array.from({ length: 24 }, (_, h) => (h === 13 || h === 14 ? null : wave(h, 20.6, 5.1, 13.5))) },
    { n: '室外', c: '#8a909c', d: Array.from({ length: 24 }, (_, h) => wave(h, 12.5, 6, 15)), dash: '5 4' },
  ];
  const Y0 = 5, Y1 = 30, hh = (h) => String(h).padStart(2, '0') + ':00';
  const ch = root.querySelector('.ch'), svg = root.querySelector('svg'), rd = root.querySelector('.rd'), sr = root.querySelector('.sr');
  const NS = 'http://www.w3.org/2000/svg', mk = (t, a, p = svg) => { const n = document.createElementNS(NS, t); for (const k in a) n.setAttribute(k, a[k]); p.append(n); return n; };
  let yt = [], xt = [], W = 0, H = 0, L = 34, T = 8, R = 0, B = 0, k = -1, py = 0, stop = false, cross = null;
  const x = (h) => L + (h / 23) * (R - L), y = (v) => B - ((v - Y0) / (Y1 - Y0)) * (B - T);

  const draw = () => {
    svg.replaceChildren(); R = W - 4; B = H - 20;
    yt = [10, 20, 30].map((v) => { mk('line', { class: 'gl', x1: L, x2: R, y1: y(v), y2: y(v) }); const t = mk('text', { class: 'ax', x: L - 6, y: y(v) + 4, 'text-anchor': 'end' }); t.textContent = v + '°'; return [y(v), t]; });
    xt = (W < 400 ? [0, 6, 12, 18] : [0, 6, 12, 18, 23]).map((h) => { const t = mk('text', { class: 'ax', x: x(h), y: H - 4, 'text-anchor': h ? (h === 23 ? 'end' : 'middle') : 'start' }); t.textContent = hh(h); return [x(h) + (h ? (h === 23 ? -16 : 0) : 16), t]; });
    S.forEach((s) => { // 缺测（null）处断开
      const d = s.d.map((v, h) => (v === null ? '' : `${h && s.d[h - 1] !== null ? 'L' : 'M'}${x(h)} ${y(v)}`)).join('');
      mk('path', { class: 'ln', d, stroke: s.c, 'stroke-dasharray': s.dash || 'none' });
    });
    cross = mk('g', {}); show();
  };
  const show = () => {
    cross.replaceChildren(); ch.classList.toggle('on', k >= 0);
    const at = k >= 0 ? k : 23;
    rd.innerHTML = `<span class="tm">${k < 0 ? '<small>最新</small>' : ''}${hh(at)}</span>` + S.map((s) => `<span class="it"><i style="background:${s.c}"></i>${s.n} ${s.d[at] === null ? '<b class="off">—<span class="k">（离线）</span></b>' : `<b>${s.d[at].toFixed(1)}°</b>`}</span>`).join('');
    const cx = x(k), cy = Math.max(T, Math.min(B, py)), bxc = Math.max(L + 20, Math.min(R - 20, cx)), byc = Math.max(T + 8, Math.min(B - 8, cy));
    xt.forEach(([p, t]) => { t.style.opacity = k >= 0 && Math.abs(p - bxc) < 38 ? 0 : ''; }); // 刻度让位给轴标签
    yt.forEach(([p, t]) => { t.style.opacity = k >= 0 && Math.abs(p - byc) < 14 ? 0 : ''; });
    if (k < 0) return;
    mk('line', { class: 'cx', x1: cx, x2: cx, y1: T, y2: B }, cross);
    mk('line', { class: 'cx', x1: L, x2: R, y1: cy, y2: cy }, cross);
    S.forEach((s) => { if (s.d[k] !== null) mk('circle', { class: 'dot', cx, cy: y(s.d[k]), r: 4, fill: s.c }, cross); });
    const bx = mk('g', { class: 'bd' }, cross); // 轴标签已夹在绘图区内
    mk('rect', { x: bxc - 20, y: B + 2, width: 40, height: 16, rx: 3 }, bx); mk('text', { x: bxc, y: B + 14, 'text-anchor': 'middle' }, bx).textContent = hh(k);
    const by = mk('g', { class: 'bd' }, cross);
    mk('rect', { x: 0, y: byc - 8, width: L - 3, height: 16, rx: 3 }, by); mk('text', { x: (L - 3) / 2, y: byc + 4, 'text-anchor': 'middle' }, by).textContent = (Y0 + ((B - cy) / (B - T)) * (Y1 - Y0)).toFixed(1);
  };
  const say = () => { sr.textContent = `${hh(k)}，` + S.map((s) => `${s.n} ${s.d[k] === null ? '离线' : s.d[k] + ' 度'}`).join('，'); };
  const fromPointer = (e) => {
    const r = ch.getBoundingClientRect(), f = ch.clientWidth / r.width;
    k = Math.max(0, Math.min(23, Math.round((((e.clientX - r.left) * f - L) / (R - L)) * 23))); py = (e.clientY - r.top) * f; show();
  };
  let down = false;
  ch.addEventListener('pointerdown', (e) => { stop = true; down = true; fromPointer(e); });
  ch.addEventListener('pointermove', (e) => { if (e.pointerType !== 'touch' || down) { stop = true; fromPointer(e); } });
  ['pointerup', 'pointercancel'].forEach((t) => ch.addEventListener(t, () => { down = false; }));
  ch.addEventListener('pointerleave', (e) => { if (e.pointerType !== 'touch' && root.activeElement !== ch) { k = -1; show(); } });
  const keyAt = (h) => { k = Math.max(0, Math.min(23, h)); py = y(S.map((s) => s.d[k]).find((v) => v !== null)); show(); say(); };
  ch.addEventListener('focus', () => { if (k < 0) keyAt(23); });
  ch.addEventListener('blur', () => { k = -1; show(); });
  ch.addEventListener('keydown', (e) => {
    const d = { ArrowLeft: k - 1, ArrowRight: k + 1, Home: 0, End: 23 }[e.key];
    if (d !== undefined) { e.preventDefault(); stop = true; keyAt(d); }
    else if (e.key === 'Escape' && k >= 0) { e.preventDefault(); k = -1; show(); sr.textContent = '已隐藏十字线'; }
  });

  // 挂载后演示一次：指针从 8 点扫到 13 点（B 棚这时离线）
  const auto = () => {
    const to = (h) => { k = h; py = y(18 + (h - 8) * 0.9); show(); };
    if (still) { to(13); return; }
    let h = 8;
    const t = setInterval(() => { if (!root.host.isConnected || stop) { clearInterval(t); return; } to(h); if (h++ === 13) clearInterval(t); }, 90);
  };
  let first = true;
  const ro = new ResizeObserver(() => {
    if (!root.host.isConnected) { ro.disconnect(); return; }
    W = ch.clientWidth; H = ch.clientHeight; svg.setAttribute('viewBox', `0 0 ${W} ${H}`); draw();
    if (first) { first = false; setTimeout(() => { if (!stop && root.host.isConnected) auto(); }, 400); }
  });
  ro.observe(ch);
}
</script>
