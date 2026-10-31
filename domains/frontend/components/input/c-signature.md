---
zh: 手写签名板
en: Signature pad
order: 80
---

## 是什么

一块可以用鼠标、手指或触控笔写字的区域，笔迹顺滑、粗细随速度变化；能撤销上一笔、清空重写，也能改为输入姓名；确认后导出成图片交给后端。

## 适合

签收、确认单、协议勾选后的手写确认、表单末尾的本人签名。

## 不适合

只需表示“我同意”时用复选框；对法律效力有要求的电子签约还需要身份核验和存证，签名板只负责采集笔迹；已有纸质签名扫描件时用「上传」。

## 要点

- 指针事件统一鼠标、手指和触控笔；pointermove 里用 getCoalescedEvents() 取回两帧之间丢掉的点，再以相邻两点的中点为端点、原始点为控制点画二次曲线，笔迹没有折角
- 线宽跟速度走：越快越细，约 1.5–3.5px；触控笔有压感时用压感；每一段的宽度和上一段做平滑，粗细渐变不跳
- 画布按 devicePixelRatio 放大绘制，线条在高清屏上不糊；书写区 touch-action: none，写字时页面不跟着滚
- 笔画存成点数组，坐标按画布宽高归一化，尺寸变化时整体重绘；撤销删最后一笔，清空删全部，没有笔画时这两个按钮禁用
- 墨迹总长度达到阈值才能确认，不够时就地提示“再写长一点”；确认后导出 SVG 路径（体积小、可缩放）或 PNG，页面上显示签名缩略图
- 书写区 role="img" 并写明用途；“输入姓名代替”是键盘和读屏用户的完成路径，键入后用手写风格字体预览
- 空白时书写区显示一条基线和“在此签名”，写下第一笔后提示消失

## 提示词

给{确认页}加「手写签名板」：书写区约 {480×180}px，白底，底部一条浅色基线，空白时显示“在此签名”；用指针事件同时支持鼠标、手指和触控笔，pointermove 里用 getCoalescedEvents() 补回帧间的点，以相邻两点的中点为端点画二次曲线；线宽随速度在 1.5–3.5px 之间变化（越快越细），触控笔用压感，宽度逐段平滑；画布按 devicePixelRatio 放大，书写区 touch-action: none；笔画按画布宽高归一化存储，尺寸变化时重绘；提供“撤销”“清空”，没有笔画时禁用；墨迹总长度不足时“确认”不可用并提示再写长一点；提供“输入姓名代替”，键入后用手写风格字体预览；确认后导出 SVG 交给{接口}，并在页面上显示签名缩略图；书写区 role="img" 写明用途；窄屏书写区撑满宽度、高度不低于 140px。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{display:grid;grid-template-rows:auto minmax(0,1fr) auto;gap:6px;width:100%;max-width:520px;height:100%}
.bar,.ft{display:flex;align-items:center;gap:4px}
.bar .btn{height:28px;font-size:13px}
.bar .sp{flex:1}
.btn:disabled{color:#8a909c;cursor:not-allowed;background:none}
.pad{position:relative;overflow:hidden;border:1px dashed #c9ced6;border-radius:8px;background:#fff}
canvas{position:absolute;inset:0;width:100%;height:100%;touch-action:none;cursor:crosshair}
.base{position:absolute;left:16px;right:16px;bottom:26%;border-top:1px solid #e3e6eb;pointer-events:none}
.ph{position:absolute;left:16px;bottom:calc(26% + 4px);font-size:12px;line-height:16px;color:#8a909c;pointer-events:none}
.typ{position:absolute;inset:0;display:grid;align-content:space-between;padding:8px 16px 6px}
.typ .inp{height:30px;max-width:200px}
.nm{min-height:40px;font:30px/40px "Snell Roundhand","Kaiti SC","STKaiti","KaiTi","Brush Script MT",cursive;color:#1f2a5a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ft .msg{flex:1;min-width:0;margin:0;font-size:12px;line-height:18px;color:#5b616e}
.th{height:22px;border:1px solid #e3e6eb;border-radius:4px;background:#fff}
.ft .btn{height:30px}
.pri:disabled{background:#c9ced6;border-color:#c9ced6;color:#fff}
@container (min-height:260px){.bar .btn,.ft .btn{height:32px}
.th{height:28px}
}
</style>

<div class="s"><div class="w">
  <div class="bar">
    <button type="button" class="btn txt mode">输入姓名代替</button><span class="sp"></span>
    <button type="button" class="btn txt undo" disabled>撤销</button><button type="button" class="btn txt clr" disabled>清空</button>
  </div>
  <div class="pad" data-clip>
    <span class="base"></span><span class="ph">在此签名</span>
    <canvas role="img" aria-label="签名书写区：用鼠标、手指或触控笔书写，也可以改为输入姓名"></canvas>
    <div class="typ" hidden><input class="inp" type="text" aria-label="姓名" placeholder="输入你的姓名" autocomplete="name"><div class="nm" aria-hidden="true"></div></div>
  </div>
  <div class="ft"><img class="th" alt="签名缩略图" hidden><p class="msg" role="status">用鼠标、手指或触控笔书写</p><button type="button" class="btn pri ok" disabled>确认</button></div>
</div></div>

<script type="module">
const INK = '#1f2a5a', MIN_INK = 120;
const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
export default function demo(root) {
  const $ = (q) => root.querySelector(q);
  const pad = $('.pad'), cv = $('canvas'), ctx = cv.getContext('2d'), typ = $('.typ'), inp = $('.inp'), nm = $('.nm');
  const undoB = $('.undo'), clrB = $('.clr'), okB = $('.ok'), modeB = $('.mode'), msg = $('.msg'), th = $('.th'), ph = $('.ph'), base = $('.base');
  let W = 0, H = 0, strokes = [], cur = null, last = null, mode = 'draw', auto = 0;
  // 笔画点按画布宽高归一化存储，尺寸变化时整体重绘
  const pts = (st) => st.map((p) => [p.x * W, p.y * H, p.w]);
  // 以相邻两点的中点为端点、原始点为控制点画二次曲线，每段线宽取该点的宽度
  const segs = (P, f) => P.forEach((p, i) => f(i === 0 ? P[0] : mid(P[i - 1], p), p, i === P.length - 1 ? p : mid(p, P[i + 1])));
  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (const st of strokes) segs(pts(st), (a, c, b) => { ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.quadraticCurveTo(c[0], c[1], b[0], b[1]); ctx.lineWidth = c[2]; ctx.stroke(); });
  };
  const inkLen = () => strokes.reduce((n, st) => n + pts(st).reduce((m, p, i, P) => (i ? m + Math.hypot(p[0] - P[i - 1][0], p[1] - P[i - 1][1]) : 0), 0), 0);
  const update = () => {
    const has = strokes.length > 0, enough = mode === 'draw' ? inkLen() >= MIN_INK : inp.value.trim().length > 0;
    undoB.disabled = clrB.disabled = !has; ph.hidden = has; okB.disabled = !enough; th.hidden = true;
    msg.textContent = mode === 'type' ? (enough ? '确认后按这个样式生成签名' : '输入姓名后确认') : !has ? '用鼠标、手指或触控笔书写' : enough ? '写好后点确认' : '再写长一点';
  };
  const resize = () => {
    const r = pad.getBoundingClientRect(), dpr = devicePixelRatio || 1;
    W = r.width; H = r.height; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw();
  };
  new ResizeObserver(resize).observe(pad);
  resize();

  const add = (e) => {
    const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, t = e.timeStamp;
    let w = 2.6;
    if (e.pointerType === 'pen' && e.pressure > 0) w = 1.5 + e.pressure * 2;
    else if (last) w = Math.max(1.5, Math.min(3.5, 3.5 - (Math.hypot(x - last.x, y - last.y) / Math.max(1, t - last.t)) * 1.1));
    if (last) w = last.w * 0.6 + w * 0.4; // 粗细逐段平滑，不跳变
    cur.push({ x: x / W, y: y / H, w }); last = { x, y, t, w };
  };
  cv.addEventListener('pointerdown', (e) => {
    cancelAnimationFrame(auto); auto = 0;
    try { cv.setPointerCapture(e.pointerId); } catch {}
    cur = []; strokes.push(cur); last = null; add(e); draw(); ph.hidden = true;
  });
  cv.addEventListener('pointermove', (e) => {
    if (!cur) return;
    const list = e.getCoalescedEvents?.(); // 取回两帧之间的点；拿不到时用事件本身
    for (const c of list?.length ? list : [e]) add(c);
    draw();
  });
  for (const t of ['pointerup', 'pointercancel']) cv.addEventListener(t, () => { if (cur) { cur = null; update(); } });
  undoB.addEventListener('click', () => { strokes.pop(); draw(); update(); if (undoB.disabled) modeB.focus(); });
  clrB.addEventListener('click', () => { strokes = []; draw(); update(); modeB.focus(); });

  modeB.addEventListener('click', () => {
    mode = mode === 'draw' ? 'type' : 'draw';
    const t = mode === 'type';
    typ.hidden = !t; cv.hidden = base.hidden = t; undoB.hidden = clrB.hidden = t; ph.hidden = t || strokes.length > 0;
    modeB.textContent = t ? '改为手写' : '输入姓名代替';
    update(); if (t) inp.focus();
  });
  inp.addEventListener('input', () => { nm.textContent = inp.value; update(); });

  // 确认：导出 SVG（只显示缩略图和大小，不下载）
  okB.addEventListener('click', () => {
    const head = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${Math.round(W)} ${Math.round(H)}">`;
    let body;
    if (mode === 'draw') {
      const f = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
      body = strokes.map((st) => {
        const P = pts(st); let d = `M${f(P[0])}`;
        segs(P, (a, c, b) => { d += `Q${f(c)} ${f(b)}`; });
        const w = P.reduce((n, p) => n + p[2], 0) / P.length;
        return `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w.toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"/>`;
      }).join('');
    } else body = `<text x="16" y="${Math.round(H * 0.7)}" font-family="cursive" font-size="30" fill="${INK}">${esc(inp.value.trim())}</text>`;
    const svg = head + body + '</svg>';
    th.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); th.hidden = false;
    okB.disabled = true;
    msg.textContent = `已确认 · SVG ${(new Blob([svg]).size / 1024).toFixed(1)} KB`;
  });

  // 自动演示：写一笔连笔签名和一道下划线；减少动态效果时一次画完
  const N = 70, demoPts = [
    Array.from({ length: N }, (_, k) => { const u = k / (N - 1); return { x: 0.12 + 0.6 * u + 0.035 * Math.sin(u * Math.PI * 14), y: 0.5 - 0.15 * Math.sin(u * Math.PI * 7) * (0.6 + 0.4 * Math.cos(u * Math.PI * 3)), w: 2.4 + 0.9 * Math.cos(u * Math.PI * 9) }; }),
    Array.from({ length: 24 }, (_, k) => { const u = k / 23; return { x: 0.46 + 0.4 * u, y: 0.76 - 0.05 * Math.sin(u * Math.PI), w: 2.8 - 1.2 * u }; }),
  ];
  const instant = matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(() => {
    if (!root.host.isConnected || strokes.length) return;
    if (instant) { strokes = demoPts.map((s) => s.slice()); draw(); update(); return; }
    let si = 0, k = 0;
    const step = () => {
      if (!root.host.isConnected) return;
      if (k === 0) strokes.push([]);
      strokes[strokes.length - 1].push(...demoPts[si].slice(k, k + 3)); k += 3;
      if (k >= demoPts[si].length) { si++; k = 0; }
      draw();
      if (si < demoPts.length) auto = requestAnimationFrame(step); else { auto = 0; update(); }
    };
    ph.hidden = true; auto = requestAnimationFrame(step);
  }, 300);
}
</script>
