---
zh: 指针擦出另一张图
en: Scratch reveal
order: 20
---

## 是什么

图片上盖着一层雾面或涂层，指针划过的地方被擦掉、露出下面的图，擦过的痕迹一直保留；擦开大半后剩下的部分自动淡去。

## 适合

活动页的刮奖、盲盒揭晓，“擦掉雾气看窗外”这类品牌互动，新品发布前的预告图。

## 不适合

要马上看清的内容（商品图、价格、表单说明）不要盖住；只想让指针附近临时透出一圈、移开就恢复，用一个跟着指针走的圆形 mask 就够，不需要 canvas；整页大面积的涂层在手机上会挡住滚动，缩小成卡片大小。

## 注意

擦除要累积：涂层画在 canvas 上，用 destination-out 把笔迹真正抹掉，抬手后不能复原；只在指针附近挖洞、移开就恢复的写法做不出“刮开”的手感。

## 要点

- 涂层是叠在图片上的 canvas，按容器尺寸 × devicePixelRatio 设像素尺寸；笔刷半径取画面短边的 10–12%，用圆头线段连接相邻两点，快速划动也不断开。
- 鼠标移过就擦，触屏按住拖动擦；画布 touch-action: none，所以涂层区域不要超过屏幕高度的一半，留出能滚动页面的地方。
- 擦开比例在停手约 250ms 后算一次：读一次像素，每隔 7 个像素看一次 alpha；在 pointermove 里读像素，手机上的笔迹会明显跟不上手指。
- 擦开超过 55–65% 时，剩下的涂层 300–400ms 淡出，并用 role="status" 播报“已全部显示”；没到时播报“已擦开 N%”。
- 另给“一键揭开”“重新盖上”这类按钮，键盘和读屏用户不用擦也能看到结果；下层图片的 alt 或说明文字在擦开前就能读到。
- 涂层上的提示（“擦一擦”）第一次落笔就隐藏；减少动态效果时去掉淡出，到阈值直接移除涂层。

## 提示词

给{活动卡片}做「指针擦出另一张图」：{揭晓图片}上盖一层 canvas 涂层（{涂层样式}，中间提示“擦一擦”），鼠标移过、手指按住拖动时用 destination-out 圆头笔刷擦掉经过的区域（半径取短边 10–12%，相邻点连线），擦过的痕迹保留；画布 touch-action: none，涂层只占卡片大小；停手 250ms 后抽样统计擦开比例，超过 60% 时剩余涂层 350ms 淡出，用 role="status" 播报“已全部显示”，否则播报“已擦开 N%”；第一次落笔后隐藏提示；另给“一键揭开”“重新盖上”按钮；揭晓内容的文字说明擦开前就对读屏可读；减少动态效果时到阈值直接移除涂层。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<link rel="stylesheet" href="../../_shared/app-card-photos.css">
<style>
.st{padding:10px;background:#e8ebef}
.rv{position:relative;height:100%;border-radius:12px;overflow:hidden;background:#cfd8e0}
.pic{position:absolute;inset:0}
canvas{position:absolute;inset:0;width:100%;height:100%;touch-action:none;cursor:crosshair;transition:opacity .35s}
canvas.gone{opacity:0;pointer-events:none}
.hint{position:absolute;left:50%;top:38%;margin:0;padding:4px 12px;border-radius:999px;background:rgba(255,255,255,.7);color:#3d4652;font-size:12px;white-space:nowrap;transform:translate(-50%,-50%);pointer-events:none}
.ops{position:absolute;right:8px;bottom:8px;display:flex;gap:6px}
.ops .ctl{height:28px;padding:0 10px;font-size:12px}
@container (min-height:260px){.st{padding:14px}
.hint{font-size:14px;padding:6px 16px}
.ops{right:12px;bottom:12px;gap:8px}
.ops .ctl{height:32px;padding:0 14px;font-size:13px}
}
</style>

<div class="st"><div class="rv"><div class="pic ph5" role="img" aria-label="车窗外的夜空和远山"></div><canvas aria-hidden="true"></canvas><p class="hint" aria-hidden="true">擦一擦车窗上的雾气</p><div class="ops"><button type="button" class="ctl all">一键擦净</button><button type="button" class="ctl cover">重新起雾</button></div></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const cv = root.querySelector('canvas'), g = cv.getContext('2d', { willReadFrequently: true }), hint = root.querySelector('.hint'), msg = root.querySelector('[role=status]');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let bw = 20, last = null, done = false, timer = 0;
  const fog = () => { // 雾面涂层：底色 + 细小水珠 + 几道流下来的水痕
    const r = cv.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2), w = cv.width = Math.round(r.width * d), h = cv.height = Math.round(r.height * d);
    bw = Math.min(r.width, r.height) * 0.22 * d;
    g.globalCompositeOperation = 'source-over';
    const lg = g.createLinearGradient(0, 0, w, h); lg.addColorStop(0, '#e3e9ee'); lg.addColorStop(1, '#c3cdd7');
    g.fillStyle = lg; g.fillRect(0, 0, w, h);
    g.fillStyle = 'rgba(255,255,255,.5)';
    for (let i = 0; i < w * h / (260 * d * d); i++) { g.beginPath(); g.arc(Math.random() * w, Math.random() * h, (0.5 + Math.random() * 1.4) * d, 0, 7); g.fill(); }
    g.globalCompositeOperation = 'destination-out'; g.strokeStyle = 'rgba(0,0,0,.45)'; g.lineCap = 'round';
    for (let i = 0; i < 7; i++) { const x = (0.08 + i * 0.14 + Math.random() * 0.05) * w, y = Math.random() * h * 0.5; g.lineWidth = (1.5 + Math.random() * 1.5) * d; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 4 * d, y + h * 0.2, x - 2 * d, y + h * (0.25 + Math.random() * 0.25)); g.stroke(); }
    cv.classList.remove('gone'); hint.hidden = false; done = false;
  };
  const scrub = (x, y) => { // canvas 像素坐标；外圈半透明一道，边缘不会太硬
    const a = last || { x: x + 0.1, y };
    g.globalCompositeOperation = 'destination-out'; g.lineCap = g.lineJoin = 'round';
    for (const [w, c] of [[bw * 1.35, 'rgba(0,0,0,.35)'], [bw, '#000']]) { g.lineWidth = w; g.strokeStyle = c; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(x, y); g.stroke(); }
    last = { x, y }; hint.hidden = true;
    clearTimeout(timer); timer = setTimeout(check, 250);
  };
  const reveal = () => { clearTimeout(timer); done = true; cv.classList.add('gone'); hint.hidden = true; msg.textContent = '已全部显示：车窗外的夜空和远山'; };
  const check = () => { // 隔 7 个像素抽样数透明像素，不读整张
    if (done) return;
    const px = g.getImageData(0, 0, cv.width, cv.height).data; let n = 0, c = 0;
    for (let i = 3; i < px.length; i += 28) { n++; if (px[i] < 128) c++; }
    if (c / n >= 0.6) reveal(); else msg.textContent = `已擦开 ${Math.round(c / n * 100)}%`;
  };
  const pt = (e) => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * cv.width / r.width, (e.clientY - r.top) * cv.height / r.height]; };
  cv.addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse' || done) return; cv.setPointerCapture(e.pointerId); last = null; scrub(...pt(e)); });
  cv.addEventListener('pointermove', (e) => { if (!done && (e.pointerType === 'mouse' || cv.hasPointerCapture(e.pointerId))) scrub(...pt(e)); });
  cv.addEventListener('pointerleave', () => { last = null; });
  root.querySelector('.all').addEventListener('click', reveal);
  root.querySelector('.cover').addEventListener('click', () => { fog(); msg.textContent = '车窗重新起雾了'; });
  fog();
  // 挂载后自动擦一道 S 形，减少动态效果时一次画完
  const path = (k) => [cv.width * (0.14 + 0.72 * k), cv.height * (0.5 + 0.18 * Math.sin(k * Math.PI * 2.2))];
  if (still) { for (let k = 0; k <= 1; k += 0.02) scrub(...path(k)); last = null; return; }
  let t0 = 0;
  const tick = (t) => {
    t0 ||= t;
    if (!root.host.isConnected || done) return;
    const k = Math.min(1, (t - t0) / 800); scrub(...path(k));
    if (k < 1) requestAnimationFrame(tick); else last = null;
  };
  setTimeout(() => requestAnimationFrame(tick), 300);
}
</script>
