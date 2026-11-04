---
zh: 字符雨背景
en: Code rain background
aka: 代码雨 数字雨 字符瀑布 黑客风背景 matrix rain
order: 80
---

## 是什么

一列列字符从上往下落，列头最亮，身后的字逐渐变暗拖成一条尾巴，每落到新的一行就随机换一个字。

## 适合

开发者工具、安全产品、黑客松活动页的首屏或 404 页，垫在标题后面营造“代码正在跑”的气氛。

## 不适合

正文多的页面和后台：满屏下落的字会一直抢视线。只想要安静的技术感，用「点阵渐隐背景」。

## 注意

字符雨又亮又密，最容易把上面的字淹掉：画布整体压暗，标题和按钮放在半透明深色底板上，按底板颜色核对对比度。

## 要点

- canvas 铺满区块，字号 14–16px，列宽等于字号，列数 = 宽度 ÷ 字号向上取整；每列只记下落位置（以行为单位的小数）、速度和列头的字。
- 速度按时间差算，每列每秒 8–14 行随机；起点随机错开，落出底部后从顶部上方随机高度重新开始，各列始终不同步。
- 拖尾靠每帧整张盖一层底色：60fps 时不透明度 6%–10%，越小拖尾越长；其他帧率按 1 − (1 − 不透明度)^(时间差 × 60) 换算，120Hz 屏上拖尾才一样长。
- 列头用接近白的亮色；落到新一行时先把上一个列头改回主色，再在新位置画一个随机字。字符集用数字、几个字母和 { } < > / = 这类贴合产品的符号。
- 画布 opacity 0.6–0.7 整体压暗；底板用 80% 不透明的深色、12px 圆角，标题字号照页面层级来。
- 用 requestAnimationFrame（标签页隐藏时自己会停），回来时时间差封顶 0.1 秒；离开视口用 IntersectionObserver 停掉循环；一直在动，角落给一个暂停按钮。
- 按 devicePixelRatio（上限 2）放大画布；尺寸变化时重算列数，先在后台空跑约 2 秒，画面一出来就是落满的状态。
- canvas 设 aria-hidden；减少动态效果时只画一帧静止的字符墙，隐藏暂停按钮。

## 提示词

给{首屏或 404 页}做「字符雨背景」：canvas 铺满区块，底色{深色底}，字号 16px（窄屏 14px）、列宽等于字号，列数按宽度向上取整；每列记下落位置、速度和列头的字，速度每秒 8–14 行随机，起点随机错开，落出底部后从顶部上方随机高度重新开始；每帧整张盖一层底色形成拖尾，60fps 时不透明度 7%，其他帧率按 1 − 0.93^(时间差 × 60) 换算；列头用接近白的亮色，落到新一行时随机换字，并把上一个列头改回{主色}；字符集用数字、少量字母和{产品相关符号}；画布 opacity 0.65，{标语和按钮}放在 80% 不透明的深色底板上并核对对比度；用 requestAnimationFrame，时间差封顶 0.1 秒，离开视口时停，角落放暂停按钮；按 devicePixelRatio（上限 2）放大，尺寸变化时重算列数并预跑 2 秒；canvas 对读屏隐藏；减少动态效果时只画一帧静止的字符墙。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;place-items:center;background:#040806;color:#effff5}
canvas{position:absolute;inset:0;width:100%;height:100%;opacity:.65}
.pn{position:relative;display:grid;justify-items:center;gap:4px;max-width:calc(100% - 32px);padding:12px 16px;border:1px solid rgba(110,231,160,.22);border-radius:12px;background:rgba(3,8,5,.8);text-align:center}
.pn small{color:#8ee3b2;font:12px/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.pn b{font-size:18px;line-height:1.35}
.pz.ctl{position:absolute;right:8px;bottom:8px;height:28px;padding:0 12px;border-color:rgba(142,227,178,.35);background:rgba(3,8,5,.8);color:#dcf8e8;font-size:12px}
.pz.ctl:hover{border-color:rgba(142,227,178,.6);background:#0c1d14}
@container (min-height:260px){.pn{gap:8px;padding:20px 32px}
.pn small{font-size:13px}
.pn b{font-size:28px}
.pz.ctl{right:12px;bottom:12px}
}
</style>

<div class="st"><canvas aria-hidden="true"></canvas><div class="pn"><small>&gt; MyPrompts CLI</small><b>每条提示词，都能跑通</b></div><button type="button" class="ctl pz">暂停</button></div>

<script type="module">
const CHARS = '0123456789ABCDEF{}<>/=+*#$', BG = '#040806', MAIN = '#22c55e', HEAD = '#eafff2';
export default function demo(root) {
  const st = root.querySelector('.st'), cv = root.querySelector('canvas'), g = cv.getContext('2d'), pz = root.querySelector('.pz');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 0, H = 0, fs = 16, cols = [], raf = 0, last = 0, seen = true, paused = false;
  const pick = () => CHARS[(Math.random() * CHARS.length) | 0];
  const reset = (c, inView) => { // 起点随机错开：首帧落在画面里，之后从顶部上方随机高度重来
    const rows = H / fs;
    c.y = inView ? Math.random() * rows : -Math.random() * rows * 0.6;
    c.row = Math.floor(c.y); c.v = 8 + Math.random() * 6; c.ch = pick();
    return c;
  };
  const glyph = (x, row, color, ch) => { g.fillStyle = BG; g.fillRect(x, row * fs, fs, fs); g.fillStyle = color; g.fillText(ch, x + fs / 2, row * fs); };
  const step = (dt) => {
    g.fillStyle = `rgba(4,8,6,${1 - 0.93 ** (dt * 60)})`; // 60fps 时每帧盖 7%，高刷屏按时间折算，拖尾一样长
    g.fillRect(0, 0, W, H);
    cols.forEach((c, i) => {
      c.y += c.v * dt;
      const x = i * fs;
      while (c.row < Math.floor(c.y)) {
        if (c.row >= 0) glyph(x, c.row, MAIN, c.ch); // 上一个列头改回主色
        c.row++; c.ch = pick();
        if (c.row >= 0) glyph(x, c.row, HEAD, c.ch);
      }
      if (c.row * fs > H) reset(c, false);
    });
  };
  const fit = () => {
    const w = cv.clientWidth, h = cv.clientHeight;
    if (w === W && h === H) return;
    const d = Math.min(devicePixelRatio || 1, 2);
    W = w; H = h; fs = W < 480 ? 14 : 16;
    cv.width = W * d; cv.height = H * d; g.setTransform(d, 0, 0, d, 0, 0);
    g.font = `${fs}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`; g.textAlign = 'center'; g.textBaseline = 'top';
    cols = Array.from({ length: Math.ceil(W / fs) }, () => reset({}, true));
    g.fillStyle = BG; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 60; i++) step(1 / 30); // 先空跑 2 秒，画面一出来就是落满的
  };
  const tick = (now) => {
    raf = 0;
    if (!root.host.isConnected || !seen || paused) { last = 0; return; }
    step(last ? Math.min((now - last) / 1000, 0.1) : 0); // 切回标签页时时间差封顶，不会一下落很多行
    last = now;
    raf = requestAnimationFrame(tick);
  };
  const run = () => { if (!still && !raf) raf = requestAnimationFrame(tick); };
  pz.addEventListener('click', () => { paused = !paused; pz.textContent = paused ? '继续' : '暂停'; run(); });
  const io = new IntersectionObserver(([e]) => { if (!root.host.isConnected) return io.disconnect(); seen = e.isIntersecting; run(); });
  io.observe(st);
  new ResizeObserver(fit).observe(cv);
  fit();
  if (still) pz.hidden = true; // 减少动态效果：只留上面那一帧静止的字符墙
  run();
}
</script>
