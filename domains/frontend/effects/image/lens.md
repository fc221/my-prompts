---
zh: 放大镜透镜
en: Magnifier lens
order: 60
tab: 放大镜
---

## 是什么

指针停在图片上时出现一个圆形透镜，透镜里是同一张图放大 2–3 倍后的局部，跟着指针移动，用来看清缝线、刻字、纹理这类小细节。

## 适合

腕表、首饰、皮具、面料等要看做工的商品详情页，地图、版画、古籍这类细节很多的大图。

## 不适合

缩略图列表里不要用，点开再看；需要整张放大、来回拖动查看的，用「图片预览（灯箱）」的缩放；手机上手指会挡住透镜，优先点开大图用双指缩放。

## 注意

透镜里必须是同一张图对应位置的高清版本，和外面严丝合缝：放大中心就是指针所在的点，放大倍数固定；用低分辨率原图硬放大只会更糊，至少备一份 2 倍尺寸的大图（或者像示例这样用矢量重画）。

## 要点

- 透镜直径 100–150px，放大 2.5–3 倍；透镜中心对准指针，里面显示以指针为中心、边长为“直径 ÷ 倍数”的那块原图。
- 鼠标移入出现、移出消失（120ms 淡入淡出）；透镜层 pointer-events: none，事件只在画框上监听，透镜不会挡住指针、也不会自己触发移出。
- 触屏按住才出现，并把透镜放在手指上方约半个直径加 16px，放大中心仍是手指下面那一点；松手消失；画框 touch-action: none，所以只用在不大的主图上。
- 画框可聚焦：获得焦点时显示透镜，方向键每次移动 10px（Shift 30px），Esc 收起；再给“看刻字”这类按钮，直接把透镜移到值得看的细节上。
- 用 requestAnimationFrame 合并移动，每帧最多重画一次透镜；大图提前加载好，不在移动时才请求。
- 被放大的关键信息（规格、编号）同时写在文字里，读屏用户不靠透镜也能读到；减少动态效果时去掉淡入淡出和自动移动，直接出现在目标位置。

## 提示词

给{商品详情页}的{主图}加「放大镜透镜」：鼠标移到图上时出现直径 140px 的圆形透镜，里面是{高清大图}放大 3 倍后、以指针为中心的局部，跟随指针移动，移出时 120ms 淡出；触屏按住时出现，透镜放在手指上方（半个直径 + 16px），放大中心仍在手指处，松手消失，画框 touch-action: none；画框可聚焦，聚焦时显示透镜，方向键移动 10px、Shift 30px，Esc 收起；另给“看{细节名称}”按钮，把透镜直接移到{细节位置}；用 requestAnimationFrame 合并重画；被放大的关键信息同时写在文字说明里；减少动态效果时不做淡入淡出和自动移动。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{padding:10px;background:#efebe4}
.fr{position:relative;height:100%;border-radius:12px;overflow:hidden;touch-action:none;cursor:zoom-in;outline:none}
.fr:focus-visible{box-shadow:inset 0 0 0 2px #3b5bdb}
.fr>canvas{display:block;width:100%;height:100%}
.lens{--d:100px;position:absolute;left:0;top:0;width:var(--d);height:var(--d);border-radius:50%;overflow:hidden;background:#efe7d6;box-shadow:0 0 0 3px #fff,0 8px 22px rgba(40,30,20,.35);pointer-events:none;opacity:0;transition:opacity .12s}
.lens.on{opacity:1}
.lens canvas{display:block;width:100%;height:100%}
.lens::after{content:"";position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 30% 24%,rgba(255,255,255,.35),transparent 38%);box-shadow:inset 0 0 0 1px rgba(0,0,0,.12)}
.tt{position:absolute;left:10px;top:10px;margin:0;padding:2px 9px;border-radius:999px;background:rgba(40,32,24,.55);color:#fff;font-size:12px;line-height:18px;white-space:nowrap}
.go{position:absolute;right:18px;bottom:18px}
.go.ctl{height:28px;padding:0 12px;font-size:12px}
@container (min-height:260px){.st{padding:14px}
.lens{--d:140px}
.tt{left:14px;top:14px;padding:3px 11px;font-size:13px}
.go{right:26px;bottom:26px}
.go.ctl{height:32px;padding:0 14px;font-size:13px}
}
</style>

<div class="st"><div class="fr" tabindex="0" role="img" aria-label="腕表正面照片，表盘 6 点位置刻着“第 0217 / 300 号”。聚焦后用方向键移动放大镜"><canvas></canvas><div class="lens" aria-hidden="true"><canvas></canvas></div><p class="tt" aria-hidden="true">表盘细节 · 3×</p></div><button type="button" class="ctl go">看刻字</button><p class="sr" role="status"></p></div>

<script type="module">
// 腕表静物，按场景坐标画；主图和透镜都调用它，透镜只是换了一个放大的变换，所以内外严丝合缝
const watch = (g, w, h) => {
  const R = h * 0.4, cx = w * 0.5, cy = h * 0.5, f = (s, wt = 400) => `${wt} ${R * s}px system-ui,"PingFang SC",sans-serif`;
  let gr = g.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#ede6d9'); gr.addColorStop(1, '#d5cab9'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
  g.strokeStyle = 'rgba(110,90,60,.09)'; g.lineWidth = 0.5; g.beginPath();
  for (let x = 0; x < w; x += 2.2) { g.moveTo(x, 0); g.lineTo(x, h); }
  for (let y = 0; y < h; y += 2.2) { g.moveTo(0, y); g.lineTo(w, y); }
  g.stroke();
  // 表带和缝线
  gr = g.createLinearGradient(cx - R * 0.5, 0, cx + R * 0.5, 0); gr.addColorStop(0, '#5e3820'); gr.addColorStop(0.5, '#8b5634'); gr.addColorStop(1, '#5e3820');
  g.fillStyle = gr; g.fillRect(cx - R * 0.5, -1, R, h + 2);
  g.strokeStyle = '#ead9b6'; g.lineWidth = R * 0.014; g.setLineDash([R * 0.05, R * 0.034]);
  for (const s of [-1, 1]) { g.beginPath(); g.moveTo(cx + s * R * 0.41, 0); g.lineTo(cx + s * R * 0.41, h); g.stroke(); }
  g.setLineDash([]);
  // 表壳
  g.save(); g.shadowColor = 'rgba(40,25,10,.4)'; g.shadowBlur = R * 0.25; g.shadowOffsetY = R * 0.08;
  gr = g.createLinearGradient(cx - R, cy - R, cx + R, cy + R); gr.addColorStop(0, '#f7f7f4'); gr.addColorStop(0.5, '#b9bdc2'); gr.addColorStop(1, '#7d838b');
  g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, R, 0, 7); g.fill(); g.restore();
  g.fillStyle = gr; g.fillRect(cx + R * 0.96, cy - R * 0.09, R * 0.12, R * 0.18);
  g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = R * 0.008; for (let i = 1; i < 6; i++) { g.beginPath(); g.moveTo(cx + R * 0.96 + i * R * 0.02, cy - R * 0.09); g.lineTo(cx + R * 0.96 + i * R * 0.02, cy + R * 0.09); g.stroke(); }
  g.strokeStyle = 'rgba(60,64,70,.5)'; g.lineWidth = R * 0.02; g.beginPath(); g.arc(cx, cy, R * 0.91, 0, 7); g.stroke();
  // 表盘：刻度、品牌、日期窗、刻字
  gr = g.createRadialGradient(cx - R * 0.2, cy - R * 0.3, 0, cx, cy, R * 0.88); gr.addColorStop(0, '#fdfaf2'); gr.addColorStop(1, '#ece3d0');
  g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, R * 0.88, 0, 7); g.fill();
  for (let i = 0; i < 60; i++) {
    const a = (i / 60) * Math.PI * 2, big = i % 5 === 0;
    if (i === 15) continue;
    g.strokeStyle = big ? '#1e2a3d' : '#6b6f78'; g.lineWidth = R * (big ? 0.035 : 0.008);
    g.beginPath(); g.moveTo(cx + Math.sin(a) * R * (big ? 0.66 : 0.78), cy - Math.cos(a) * R * (big ? 0.66 : 0.78)); g.lineTo(cx + Math.sin(a) * R * 0.83, cy - Math.cos(a) * R * 0.83); g.stroke();
  }
  g.fillStyle = '#1e2a3d'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = f(0.12, 600); g.fillText('柏 舟', cx, cy - R * 0.42);
  g.font = f(0.05); g.fillStyle = '#7a6b55'; g.fillText('AUTOMATIC · 自动上链', cx, cy - R * 0.3);
  g.fillStyle = '#fff'; g.strokeStyle = '#9a9ea6'; g.lineWidth = R * 0.01; g.fillRect(cx + R * 0.46, cy - R * 0.07, R * 0.16, R * 0.14); g.strokeRect(cx + R * 0.46, cy - R * 0.07, R * 0.16, R * 0.14);
  g.fillStyle = '#1e2a3d'; g.font = f(0.09, 600); g.fillText('28', cx + R * 0.54, cy + R * 0.005);
  g.fillStyle = '#5b4f40'; g.font = f(0.056, 500); g.fillText('第 0217 / 300 号', cx, cy + R * 0.42);
  g.font = f(0.038); g.fillText('蓝宝石镜面 · 50 米防水', cx, cy + R * 0.51);
  // 指针（10:10:35）
  const hand = (deg, len, wd, c) => { g.save(); g.translate(cx, cy); g.rotate((deg * Math.PI) / 180); g.fillStyle = c; g.beginPath(); g.moveTo(-wd, R * 0.1); g.lineTo(-wd * 0.5, -len); g.lineTo(0, -len - wd); g.lineTo(wd * 0.5, -len); g.lineTo(wd, R * 0.1); g.fill(); g.restore(); };
  hand(305, R * 0.45, R * 0.04, '#1d2b45'); hand(60, R * 0.68, R * 0.03, '#1d2b45'); hand(210, R * 0.74, R * 0.008, '#c8452c');
  g.fillStyle = '#c8452c'; g.beginPath(); g.arc(cx, cy, R * 0.035, 0, 7); g.fill();
  // 镜面反光
  gr = g.createLinearGradient(cx - R, cy - R, cx, cy); gr.addColorStop(0, 'rgba(255,255,255,.35)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, R * 0.88, Math.PI * 0.95, Math.PI * 1.6); g.closePath(); g.fill();
};
export default function demo(root) {
  const fr = root.querySelector('.fr'), cv = fr.querySelector('canvas'), g = cv.getContext('2d'), lens = root.querySelector('.lens'), lc = lens.querySelector('canvas'), lg = lc.getContext('2d'), msg = root.querySelector('[role=status]');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches, Z = 3;
  if (still) lens.style.transition = 'none';
  let W = 0, H = 0, raf = 0, anim = 0, P = { x: 0, y: 0 }, lift = 0;
  const spot = () => ({ x: W * 0.5, y: H * 0.5 + H * 0.4 * 0.44 }); // 刻字的位置
  const d = () => Math.min(devicePixelRatio || 1, 2);
  const fit = () => {
    const w = Math.round(cv.clientWidth), h = Math.round(cv.clientHeight);
    if (w === W && h === H) return;
    W = w; H = h; cv.width = W * d(); cv.height = H * d(); g.setTransform(d(), 0, 0, d(), 0, 0); watch(g, W, H); draw();
  };
  const draw = () => {
    const D = lens.clientWidth, k = d();
    if (lc.width !== Math.round(D * k)) lc.width = lc.height = Math.round(D * k);
    lg.setTransform(k * Z, 0, 0, k * Z, k * (D / 2 - P.x * Z), k * (D / 2 - P.y * Z)); watch(lg, W, H);
    lens.style.transform = `translate(${P.x - D / 2}px,${P.y - D / 2 - lift}px)`;
  };
  const req = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; if (root.host.isConnected) draw(); }); };
  const show = (x, y, up = 0) => { P = { x: Math.max(0, Math.min(W, x)), y: Math.max(0, Math.min(H, y)) }; lift = up; lens.classList.add('on'); req(); };
  const hide = () => lens.classList.remove('on');
  const at = (e) => { const r = fr.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  fr.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'mouse') { cancelAnimationFrame(anim); show(...at(e)); }
    else if (fr.hasPointerCapture(e.pointerId)) show(...at(e), lens.clientWidth / 2 + 16);
  });
  fr.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') hide(); });
  fr.addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse') return; cancelAnimationFrame(anim); fr.setPointerCapture(e.pointerId); show(...at(e), lens.clientWidth / 2 + 16); }); // 触屏：透镜放在手指上方
  fr.addEventListener('lostpointercapture', hide);
  fr.addEventListener('focus', () => show(P.x || W / 2, P.y || H / 2));
  fr.addEventListener('blur', hide);
  fr.addEventListener('keydown', (e) => {
    const s = e.shiftKey ? 30 : 10, m = { ArrowLeft: [-s, 0], ArrowRight: [s, 0], ArrowUp: [0, -s], ArrowDown: [0, s] }[e.key];
    if (m) show(P.x + m[0], P.y + m[1]); else if (e.key === 'Escape') hide(); else return;
    e.preventDefault();
  });
  const glide = () => { // 从中心滑到刻字；减少动态效果时直接到位
    const to = spot(), from = { x: W / 2, y: H / 2 }; let t0 = 0;
    msg.textContent = '放大 3 倍：表盘 6 点位置刻着“第 0217 / 300 号”和“蓝宝石镜面 · 50 米防水”';
    if (still) return show(to.x, to.y);
    cancelAnimationFrame(anim);
    const tick = (t) => {
      if (!root.host.isConnected) return;
      t0 ||= t; const k = Math.min(1, (t - t0) / 700), e = 1 - (1 - k) ** 3;
      show(from.x + (to.x - from.x) * e, from.y + (to.y - from.y) * e);
      if (k < 1) anim = requestAnimationFrame(tick);
    };
    anim = requestAnimationFrame(tick);
  };
  root.querySelector('.go').addEventListener('click', glide);
  fit();
  new ResizeObserver(fit).observe(cv);
  setTimeout(glide, 300);
}
</script>
