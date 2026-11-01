---
zh: 滚轮缩放时间轴
en: Zoomable time axis
order: 40
of: i-canvas-zoom
tab: 时间轴
---

## 是什么

在时间序列图上按住 Ctrl/⌘ 滚动滚轮（或在触控板上双指捏合），以指针所在的日期为中心放大、缩小可见的时间范围，刻度从“月”细化到“周”“日”；放大后可以拖动平移，随时一键回到全部。

## 适合

一年或更长、点很密的时间序列：用电量、访问量、价格、传感器读数，既要看全年起伏，也要看某几天的细节。

## 不适合

点数少于 50 个、一屏就能看清时不需要缩放；只想挑出一段做筛选时用拖选区间；一页里有很多张图时，不要让普通滚轮去缩放，用户滚页面会被卡住。

## 注意

普通滚轮仍然滚动页面，只有按住 Ctrl/⌘（触控板捏合会自带这个修饰键）或图表获得焦点后按 +/− 才缩放；否则用户只是路过滚一下，图表就突然放大了。

## 要点

- 缩放改的是可见时间范围（数据域），然后重画曲线和刻度，不是把整张图片放大，线宽和字号保持不变
- 指针下的日期是锚点：缩放前后指针下仍是同一天；按钮和键盘缩放以当前范围的中心为锚点
- 可见范围最少 7 天、最多为全部数据，到头后停住，反复缩放不漂移
- 刻度随跨度换粒度：超过 90 天标月份，14–90 天标每周一，14 天以内标每天；刻度间距不足约 44px 时隔一个标一个
- 放大后按住拖动平移，到数据两端停住；上方显示当前范围“07-07 至 08-06 · 31 天”和“−”“＋”“重置”按钮
- 图表可聚焦：+/− 缩放、左右键平移四分之一屏、0 重置；范围停止变化约 300ms 后用 role="status" 播报一次
- 普通滚轮滚过图表时，提示一下“按住 Ctrl 滚动可缩放”；减少动态效果时按钮缩放直接跳到新范围

## 提示词

给{时间序列图}加「滚轮缩放时间轴」：按住 Ctrl/⌘ 滚动或触控板捏合时，以指针下的日期为锚点缩放可见时间范围（改数据域后重绘，线宽字号不变），普通滚轮仍滚动页面，并在图上提示“按住 Ctrl 滚动可缩放”；范围最少 {最小天数} 天、最多为全部数据，到头停住；刻度随跨度切换：超过 90 天标月份、14–90 天标每周一、14 天以内标每天，间距不足 44px 时隔一个标一个；放大后可拖动平移，到两端停住；上方显示当前起止日期和天数，旁边放“−”“＋”“重置”按钮（以中心为锚点）；图表可聚焦，+/− 缩放、左右键平移四分之一屏、0 重置，范围停止变化 300ms 后用 role="status" 播报；减少动态效果时按钮缩放直接跳到新范围。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:10px 12px}
.box{display:grid;grid-template-rows:auto minmax(0,1fr) auto;gap:6px;max-width:640px;height:100%;margin:0 auto;padding:8px 12px 8px;border:1px solid #e3e6eb;border-radius:12px;background:#fff}
.hd{display:flex;align-items:center;gap:6px;min-width:0}
.rg{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-variant-numeric:tabular-nums}
.rg small{margin-left:6px;color:#5b616e;font-size:12px;font-weight:400}
.bt{display:inline-flex;align-items:center;justify-content:center;flex:none;height:26px;min-width:28px;padding:0 8px;border:1px solid #d0d5dd;border-radius:7px;background:#fff;color:#1f2329;font-size:12px;font-weight:500;white-space:nowrap;box-shadow:0 1px 2px rgba(16,24,40,.05)}
.bt:hover{background:#f5f6f8}
.bt:disabled{opacity:.45;cursor:default;background:#fff}
.ch{position:relative;min-height:0;touch-action:pan-y;cursor:grab;user-select:none;border-radius:4px}
.ch.drag{cursor:grabbing}
.ch:focus-visible{outline-offset:3px}
svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.gl{stroke:#eceef2}
.ax{fill:#5b616e;font-size:11px;font-variant-numeric:tabular-nums}
.ar{fill:rgba(59,91,219,.12)}
.ln{fill:none;stroke:#3b5bdb;stroke-width:1.5;stroke-linejoin:round}
.pt{fill:#3b5bdb;stroke:#fff;stroke-width:1.5}
.tk{stroke:#c9ced6}
.ft{margin:0;min-width:0;color:#8a909c;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:color .2s}
.ft.flash{color:#b54708}
.cur{position:absolute;left:0;top:0;display:none;width:16px;height:16px;pointer-events:none}
@container (max-width:320px){.rg small{display:none}
}
@container (min-width:560px){.box{padding:12px 16px 10px}
.rg{font-size:14px}
}
</style>

<div class="st"><div class="box"><div class="hd"><b class="rg"></b><button type="button" class="bt" data-z="out" aria-label="缩小">−</button><button type="button" class="bt" data-z="in" aria-label="放大">＋</button><button type="button" class="bt" data-z="reset">重置</button></div><div class="ch" tabindex="0" role="group" aria-label="2025 年每日用电量折线图。+ − 缩放，左右方向键平移，0 重置"><svg aria-hidden="true"></svg><svg class="cur" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 1.5l10.5 6.8-4.6.9-2.1 4.6z" fill="#1f2329" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></svg></div><p class="ft">家庭每日用电（kWh）· Ctrl/⌘ + 滚轮缩放，拖动平移</p><p class="sr" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches, N = 365, MIN = 7, YMAX = 25;
  let seed = 5; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const g = (d, c, w) => Math.exp(-(((d - c) / w) ** 2));
  // 2025 年每日用电：夏天空调、冬天取暖，周末略高（1 月 1 日是周三）
  const D = Array.from({ length: N }, (_, d) => Math.round((8 + 10 * g(d, 205, 30) + 5 * g(d, 5, 28) + 5 * g(d, 362, 26) + ((d + 3) % 7 === 0 || (d + 3) % 7 === 6 ? 1.6 : 0) + rnd() * 2.4 - 1.2) * 10) / 10);
  const md = (d) => { const t = new Date(2025, 0, 1 + d); return String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0'); };
  const ch = root.querySelector('.ch'), svg = root.querySelector('svg'), rg = root.querySelector('.rg'), ft = root.querySelector('.ft'), sr = root.querySelector('.sr'), cur = root.querySelector('.cur');
  const NS = 'http://www.w3.org/2000/svg', mk = (t, a, p = svg) => { const n = document.createElementNS(NS, t); for (const k in a) n.setAttribute(k, a[k]); p.append(n); return n; };
  let W = 0, H = 0, L = 28, T = 6, R = 0, B = 0, d0 = 0, d1 = N, stop = false, said = 0, hinted = false;
  const x = (d) => L + ((d - d0) / (d1 - d0)) * (R - L), y = (v) => B - (v / YMAX) * (B - T);
  const dayAt = (px) => d0 + ((px - L) / (R - L)) * (d1 - d0);

  const set = (a, b) => { // 夹住范围：最少 MIN 天，不超出数据两端
    const span = Math.max(MIN, Math.min(N, b - a)); a = Math.max(0, Math.min(N - span, a)); d0 = a; d1 = a + span; draw();
    clearTimeout(said); said = setTimeout(() => { sr.textContent = `显示 ${rg.dataset.t}`; }, 300);
  };
  const zoom = (f, anchor) => { const span = Math.max(MIN, Math.min(N, (d1 - d0) / f)), k = span / (d1 - d0); set(anchor - (anchor - d0) * k, anchor - (anchor - d0) * k + span); };
  const draw = () => {
    if (!W) return;
    svg.replaceChildren(); R = W - 2; B = H - 18;
    [0, 10, 20].forEach((v) => { mk('line', { class: 'gl', x1: L, x2: R, y1: y(v), y2: y(v) }); mk('text', { class: 'ax', x: L - 6, y: y(v) + 4, 'text-anchor': 'end' }).textContent = v; });
    const span = d1 - d0, clip = mk('svg', { x: L, y: 0, width: R - L, height: H, viewBox: `${L} 0 ${R - L} ${H}` });
    const i0 = Math.max(0, Math.floor(d0) - 1), i1 = Math.min(N - 1, Math.ceil(d1));
    const pts = []; for (let i = i0; i <= i1; i++) pts.push(`${x(i + 0.5).toFixed(1)} ${y(D[i]).toFixed(1)}`);
    mk('path', { class: 'ar', d: `M${x(i0 + 0.5)} ${B}L${pts.join('L')}L${x(i1 + 0.5)} ${B}Z` }, clip);
    mk('path', { class: 'ln', d: 'M' + pts.join('L') }, clip);
    const px = (R - L) / span;
    if (px > 12) for (let i = i0; i <= i1; i++) mk('circle', { class: 'pt', cx: x(i + 0.5), cy: y(D[i]), r: 2.5 }, clip);
    // 刻度粒度随跨度变化：月 → 每周一 → 每天，间距不足 44px 就跳过
    const cand = [];
    if (span > 90) for (let m = 0; m < 12; m++) { const d = Math.round((new Date(2025, m, 1) - new Date(2025, 0, 1)) / 864e5); cand.push([d, m + 1 + ' 月']); }
    else for (let d = span > 14 ? 5 : 0; d < N; d += span > 14 ? 7 : 1) cand.push([d + 0.5, md(d)]);
    let last = -1e9;
    cand.forEach(([d, t]) => { const p = x(d); if (p < L + 14 || p > R - 14 || p - last < 44) return; last = p; mk('line', { class: 'tk', x1: p, x2: p, y1: B, y2: B + 3 }); mk('text', { class: 'ax', x: p, y: H - 3, 'text-anchor': 'middle' }).textContent = t; });
    const a = Math.round(d0), b = Math.round(d1) - 1;
    rg.dataset.t = `${md(a)} 至 ${md(b)}，共 ${b - a + 1} 天`;
    rg.innerHTML = `${md(a)} 至 ${md(b)}<small>${b - a + 1} 天</small>`;
  };
  const local = (e) => { const r = ch.getBoundingClientRect(), f = ch.clientWidth / r.width; return [(e.clientX - r.left) * f, (e.clientY - r.top) * f]; };
  const user = () => { stop = true; cur.style.display = 'none'; };

  ch.addEventListener('wheel', (e) => {
    if (!(e.ctrlKey || e.metaKey)) { // 普通滚轮留给页面滚动，只提示一下
      if (!hinted) { hinted = true; ft.classList.add('flash'); ft.textContent = '按住 Ctrl/⌘ 滚动可缩放，拖动平移'; setTimeout(() => ft.classList.remove('flash'), 1600); }
      return;
    }
    e.preventDefault(); user();
    const dy = e.deltaY * (e.deltaMode === 1 ? 16 : 1);
    zoom(Math.min(1.25, Math.max(0.8, Math.exp(-dy * 0.01))), dayAt(local(e)[0]));
  }, { passive: false });
  let drag = null;
  ch.addEventListener('pointerdown', (e) => { if (e.button) return; user(); drag = { x: local(e)[0], a: d0 }; ch.classList.add('drag'); try { ch.setPointerCapture(e.pointerId); } catch {} });
  ch.addEventListener('pointermove', (e) => { if (!drag) return; const span = d1 - d0; set(drag.a - ((local(e)[0] - drag.x) / (R - L)) * span, drag.a - ((local(e)[0] - drag.x) / (R - L)) * span + span); });
  const end = () => { drag = null; ch.classList.remove('drag'); };
  ch.addEventListener('pointerup', end); ch.addEventListener('pointercancel', end);
  const mid = () => (d0 + d1) / 2;
  const act = (k) => { user(); if (k === 'in') zoom(1.5, mid()); else if (k === 'out') zoom(1 / 1.5, mid()); else set(0, N); };
  root.querySelectorAll('[data-z]').forEach((b) => b.addEventListener('click', () => act(b.dataset.z)));
  ch.addEventListener('keydown', (e) => {
    const k = { '+': 'in', '=': 'in', '-': 'out', _: 'out', 0: 'reset' }[e.key];
    if (k) { e.preventDefault(); act(k); return; }
    const p = { ArrowLeft: -0.25, ArrowRight: 0.25 }[e.key];
    if (p) { e.preventDefault(); user(); const s = d1 - d0; set(d0 + p * s, d1 + p * s); }
  });

  // 挂载后演示一次：指针停在 7 月下旬，按住 Ctrl 连续滚动放大到一个月
  const auto = () => {
    const A = 205.5, place = () => { cur.style.display = 'block'; cur.style.transform = `translate(${x(A) - 2}px,${y(D[205]) - 26}px)`; };
    const final = () => { const k = 31 / N; set(A - A * k, A - A * k + 31); place(); };
    if (still) { final(); return; }
    place(); let n = 0;
    const t = setInterval(() => {
      if (!root.host.isConnected || stop) { clearInterval(t); return; }
      zoom(1.25, A); if (++n >= 11) { clearInterval(t); final(); }
    }, 60);
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
