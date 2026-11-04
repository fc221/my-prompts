---
zh: 方块拼换图片
en: Pixel swap
order: 30
---

## 是什么

切换图片时，画面先被一格格色块盖住（色块取的是新图对应位置的颜色，像一张马赛克），盖满后底图换掉，色块再一格格散开，露出新图。

## 适合

壁纸、主题、皮肤这类“换一张看看”的选择器，游戏化或像素风的品牌页，作品集里少量重点图的切换。

## 不适合

商品图库、相册这类连续翻看的场景，每次多等近一秒会烦，用直接替换或 150ms 淡入淡出；图片加载很慢时，先显示占位，加载好再开始拼换，不要拿色块掩盖加载。

## 注意

最容易漏的是连点：一轮还没播完又点了别的图，要么排队连播好几遍，要么画面卡在半截马赛克。只记住最后一次选择，这一轮播完直接拼到它。

## 要点

- 用一张 canvas 画：旧图 → 逐格盖上色块 → 盖满后换成新图 → 逐格去掉色块；方块边长 20–28px，大图也控制在四百格以内，不为每格建 DOM 节点。
- 每格的色块取新图该格中心的像素色（getImageData 只在图片就绪时读一次），盖满那一刻看到的就是新图的马赛克版。
- 每格的出现时刻在点击时一次算好存进数组，逐帧只拿当前时间去比：时刻 = 斜向位置 × 60% + 随机 × 40%，像一阵风扫过；盖上和散开各 350–450ms，中间停 60–100ms，整段不超过 1 秒。
- 新图必须先加载并画好再开始；跨域图片要带 CORS 头，否则读不到像素，退回整格纯色。
- 选项按钮用 aria-pressed 标出当前图，切换完成后 role="status" 播报“已切换到「雪岭」”。
- 减少动态效果时不拼换，直接换图（或 150ms 淡入）。

## 提示词

给{壁纸选择器}做「方块拼换图片」：用一张 canvas 显示当前{图片}，点选项按钮切换时，画面按“斜向位置 × 60% + 随机 × 40%”的顺序逐格盖上 24px 的色块（每格颜色取新图该格中心的像素色，图片就绪时只读一次像素），400ms 内盖满后换成新图，停 80ms，再按另一组顺序 400ms 内逐格去掉色块；每格的出现时刻在点击时一次算好，逐帧只比较时间；新图加载完成才开始；切换中再点别的图，只记下最后一次选择，这次播完直接拼到它；选项用 aria-pressed，完成后用 role="status" 播报新图名称；减少动态效果时直接换图。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{padding:10px;background:#e9ebf0}
.fr{position:relative;height:100%;border-radius:12px;overflow:hidden;background:#cdd5e0}
canvas{display:block;width:100%;height:100%}
.tt{position:absolute;left:10px;top:10px;margin:0;padding:2px 9px;border-radius:999px;background:rgba(18,20,26,.45);color:#fff;font-size:12px;line-height:18px;white-space:nowrap}
.seg{position:absolute;left:50%;bottom:10px;display:flex;gap:2px;padding:3px;border-radius:999px;background:rgba(255,255,255,.78);box-shadow:0 2px 10px rgba(0,0,0,.14);transform:translateX(-50%);backdrop-filter:blur(8px)}
.seg button{height:26px;padding:0 12px;border:0;border-radius:999px;background:none;color:#3d4350;font-size:12px;white-space:nowrap}
.seg button:hover{background:rgba(0,0,0,.05)}
.seg button[aria-pressed=true]{background:#1f2329;color:#fff}
@container (min-height:260px){.st{padding:14px}
.tt{left:14px;top:14px;font-size:13px;padding:3px 11px}
.seg{bottom:14px;padding:4px}
.seg button{height:30px;padding:0 16px;font-size:13px}
}
</style>

<div class="st"><div class="fr"><canvas role="img" aria-label="锁屏壁纸预览：海湾"></canvas><p class="tt" aria-hidden="true">锁屏壁纸</p><div class="seg" role="group" aria-label="选择壁纸"></div></div><p class="sr" role="status"></p></div>

<script type="module">
// 三幅壁纸都用同一个 paint() 画，只换配色和点缀
const S = [
  { name: '海湾', sky: ['#6fb8dc', '#f6e8d2'], sun: [0.76, 0.3, 0.09, '#fff1c9'], ridge: [['#8fb0bf', 0.56, 1.4, 0.16], ['#4f7f95', 0.66, 2.3, 0.12]], low: ['#3a8db0', '#1c5878'], sea: true },
  { name: '雪岭', sky: ['#9fb2d6', '#f4f5f9'], sun: [0.22, 0.24, 0.07, '#ffffff'], ridge: [['#a9b8d4', 0.5, 2.2, 0.3], ['#6f84ab', 0.66, 3.1, 0.24]], low: ['#f1f4f8', '#ccd5e3'], snow: true },
  { name: '夜港', sky: ['#121944', '#5e4f90'], sun: [0.7, 0.22, 0.06, '#f5efc8'], ridge: [['#2d3168', 0.6, 1.6, 0.12]], low: ['#1b2252', '#0b1030'], sea: true, city: true },
];
const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const paint = (g, w, h, s) => {
  let gr = g.createLinearGradient(0, 0, 0, h * 0.72); gr.addColorStop(0, s.sky[0]); gr.addColorStop(1, s.sky[1]);
  g.fillStyle = gr; g.fillRect(0, 0, w, h);
  if (s.city) { g.fillStyle = '#fff'; for (let i = 0; i < 60; i++) g.fillRect(rnd(i) * w, rnd(i + 99) * h * 0.5, 1.4, 1.4); }
  const [sx, sy, sr, sc] = s.sun;
  g.fillStyle = sc; g.globalAlpha = 0.25; g.beginPath(); g.arc(sx * w, sy * h, sr * h * 2, 0, 7); g.fill();
  g.globalAlpha = 1; g.beginPath(); g.arc(sx * w, sy * h, sr * h, 0, 7); g.fill();
  s.ridge.forEach(([c, base, f, amp], k) => {
    const y = (x) => h * base - h * amp * (s.snow ? 1 - Math.abs(Math.sin((x / w) * Math.PI * f + k * 1.3)) : 0.6 + 0.4 * Math.sin((x / w) * Math.PI * f + k * 2) * Math.cos((x / w) * 5 + k));
    g.beginPath(); g.moveTo(0, h); for (let x = 0; x <= w + 4; x += 4) g.lineTo(x, y(x)); g.lineTo(w, h); g.closePath();
    g.fillStyle = c; g.fill();
    if (s.snow) { g.save(); g.clip(); g.fillStyle = '#f4f7fb'; g.fillRect(0, 0, w, h * (base - amp * 0.62)); g.restore(); }
  });
  const top = h * 0.72;
  if (s.city) for (let x = 0, i = 0; x < w; i++) { // 岸边楼群和亮着的窗
    const bw = (0.03 + rnd(i) * 0.04) * w, bh = (0.06 + rnd(i + 7) * 0.16) * h;
    g.fillStyle = '#1a1d45'; g.fillRect(x, top - bh, bw - 1, bh);
    g.fillStyle = '#ffd98a'; for (let k = 0; k < 6; k++) if (rnd(i * 9 + k) > 0.45) g.fillRect(x + 2 + rnd(i * 5 + k) * (bw - 6), top - bh + 3 + rnd(i * 3 + k) * (bh - 6), 2, 2);
    x += bw;
  }
  gr = g.createLinearGradient(0, top, 0, h); gr.addColorStop(0, s.low[0]); gr.addColorStop(1, s.low[1]);
  g.fillStyle = gr; g.fillRect(0, top, w, h - top);
  if (s.sea) { g.fillStyle = s.city ? 'rgba(255,217,138,.55)' : 'rgba(255,255,255,.55)'; for (let i = 0; i < 14; i++) g.fillRect((s.sun[0] - 0.06 + rnd(i + 40) * 0.12) * w, top + 4 + i * (h - top) / 15, (0.02 + rnd(i) * 0.05) * w, 1.5); }
  if (s.snow) for (let i = 0; i < 9; i++) { // 雪地上的小松树
    const x = rnd(i + 3) * w, y = top + (0.04 + rnd(i + 20) * 0.18) * h, t = (0.05 + rnd(i + 8) * 0.04) * h;
    g.fillStyle = '#3d5a5c'; g.beginPath(); g.moveTo(x, y - t); g.lineTo(x + t * 0.38, y); g.lineTo(x - t * 0.38, y); g.fill();
  }
};
export default function demo(root) {
  const cv = root.querySelector('canvas'), g = cv.getContext('2d'), seg = root.querySelector('.seg'), msg = root.querySelector('[role=status]');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 0, H = 0, bs = 0, cols = 0, rows = 0, off = [], col = [], cur = 0, want = 0, busy = false;
  const fit = () => {
    const r = cv.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
    if (Math.round(r.width * d) === W && Math.round(r.height * d) === H) return;
    W = cv.width = Math.round(r.width * d); H = cv.height = Math.round(r.height * d);
    bs = Math.round(24 * d); cols = Math.ceil(W / bs); rows = Math.ceil(H / bs);
    off = S.map((s) => { const c = document.createElement('canvas'); c.width = W; c.height = H; paint(c.getContext('2d'), W, H, s); return c; });
    col = off.map((c) => { // 每格取中心像素色，只在画好时读一次
      const px = c.getContext('2d').getImageData(0, 0, W, H).data, out = [];
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) { const i = (Math.min(H - 1, y * bs + (bs >> 1)) * W + Math.min(W - 1, x * bs + (bs >> 1))) * 4; out.push(`rgb(${px[i]},${px[i + 1]},${px[i + 2]})`); }
      return out;
    });
    if (!busy) g.drawImage(off[cur], 0, 0);
  };
  // 斜向位置 × 60% + 随机 × 40%，每次切换开始时算一次
  const order = (flip) => Array.from({ length: cols * rows }, (_, i) => { const x = i % cols, y = (i / cols) | 0, diag = (flip ? cols - 1 - x + y : x + y) / (cols + rows - 2); return diag * 0.6 + Math.random() * 0.4; });
  const mark = () => { [...seg.children].forEach((b, k) => b.setAttribute('aria-pressed', String(k === want))); };
  const done = () => { cv.setAttribute('aria-label', '锁屏壁纸预览：' + S[cur].name); msg.textContent = `已切换到「${S[cur].name}」`; };
  const run = () => {
    busy = true; const to = want, IN = 400, HOLD = 80, OUT = 420, a = order(false), b = order(true), cs = col[to];
    let t0 = 0;
    const tick = (t) => {
      if (!root.host.isConnected) return;
      t0 ||= t; const e = t - t0, second = e > IN + HOLD, k = second ? (e - IN - HOLD) / OUT : e / IN;
      g.drawImage(off[second ? to : cur], 0, 0);
      for (let i = 0; i < cs.length; i++) if (second ? b[i] > k : a[i] <= k) { g.fillStyle = cs[i]; g.fillRect((i % cols) * bs, ((i / cols) | 0) * bs, bs, bs); }
      if (!second || k < 1) return requestAnimationFrame(tick);
      cur = to; busy = false; done();
      if (want !== cur) run(); // 播放中又点了别的：直接拼到最后一次的选择
    };
    requestAnimationFrame(tick);
  };
  const go = (i) => {
    want = i; mark();
    if (busy || i === cur) return;
    if (still) { cur = i; g.drawImage(off[cur], 0, 0); return done(); }
    run();
  };
  S.forEach((s, i) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = s.name; b.addEventListener('click', () => go(i)); seg.append(b); });
  mark(); fit();
  new ResizeObserver(fit).observe(cv);
  setTimeout(() => go(1), 500);
}
</script>
