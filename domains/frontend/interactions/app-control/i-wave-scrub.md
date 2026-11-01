---
zh: 波形进度条
en: Waveform seek bar
order: 80
---

## 是什么

音频的波形竖条本身就是进度条，已播部分着色；按住在波形上拖动，上方气泡显示时间，松手从该处继续播放。

## 适合

播客、语音消息、录音笔记、音频剪辑这类能看出声音起伏、需要找到某一段的音频。

## 不适合

视频和超过 2 小时的音频用普通进度条加章节；拿不到真实音量数据时用普通进度条，不要用随机竖条冒充波形（示例里的随机高度只是占位）。

## 注意

拖动中只预览不跳播，松手才真正跳转；拖动期间播放进度不能把气泡和着色抢回去。

## 要点

- 竖条 2–3px 宽、间距 2px，高度按音量归一到 20%–100%，波形区高 48–64px；已播部分叠一层同样的主色竖条，用 clip-path 露出，进度可以停在半根竖条上。
- 按下即跳到手指位置并开始拖动（setPointerCapture），波形区 touch-action: pan-y，竖向滚页面不受影响。
- 拖动时上方显示时间气泡，跟着手指并夹在容器内；松手后气泡停留约 0.6 秒再淡出。
- 松手才跳转：原来在播就从新位置接着播，原来暂停就保持暂停。
- role="slider"，aria-valuenow 用秒，aria-valuetext 写“1:23 / 4:23”；左右键快退快进 5 秒，Home / End 到开头和结尾。
- 两端显示当前时间和总时长（等宽数字）；有章节时列在波形下方，点击跳转。
- 减少动态效果时气泡直接出现和消失，不做淡入淡出。

## 提示词

给{音频播放器}做「波形进度条」：用 {竖条数} 根竖条画波形（高度按音量归一到 20%–100%），波形本身就是进度条，已播部分主色（叠一层同样的竖条，用 clip-path 露出进度）；按住波形即跳到手指位置并可拖动（pointer 事件 + setPointerCapture，touch-action: pan-y），拖动时上方显示时间气泡，松手才跳转，原来在播就从新位置接着播；role="slider"，aria-valuetext 写“当前 / 总时长”，左右键快退快进 5 秒，Home / End 到两端；两端显示等宽时间；有章节时列在下方可点；减少动态效果时气泡直接出现和消失。

## 示例

<link rel="stylesheet" href="../../_shared/app-control-base.css">
<style>
.st{display:grid;place-items:center;padding:12px 16px}
.pl{display:flex;flex-direction:column;width:100%;max-width:440px}
.hd{display:flex;align-items:center;gap:10px}
.cv{flex:none;width:40px;height:40px;border-radius:8px;background:radial-gradient(circle at 30% 32%,#ffd166 0 16%,transparent 17%),linear-gradient(135deg,#3b5bdb,#7048e8 60%,#e64980)}
.tt{display:flex;flex-direction:column;flex:1;min-width:0;line-height:19px}
.tt b,.tt span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tt b{font-size:14px}
.tt span{color:#5b616e;font-size:12px}
.pp{flex:none;display:grid;place-items:center;width:40px;height:40px;padding:0;border:0;border-radius:50%;background:#1f2329;color:#fff}
.pp svg{width:18px;height:18px;fill:currentColor}
.pp .i-pl,.pp.paused .i-pa{display:none}
.pp.paused .i-pl{display:block}
.wv{position:relative;height:52px;margin-top:28px;border-radius:6px;touch-action:pan-y;cursor:pointer;user-select:none}
.bars{position:absolute;inset:0;display:flex;align-items:center;gap:2px;pointer-events:none}
.bars i{flex:1 1 0;min-width:0;border-radius:2px;background:#c9ced6}
.bars.on i{background:#3b5bdb}
.tip{position:absolute;bottom:calc(100% + 6px);left:0;padding:0 8px;border-radius:6px;background:#1f2329;color:#fff;font-size:12px;line-height:22px;font-variant-numeric:tabular-nums;white-space:nowrap;transform:translateX(-50%);opacity:0;transition:opacity .15s;pointer-events:none}
.tip::after{content:"";position:absolute;left:50%;top:100%;margin-left:-4px;border:4px solid transparent;border-top-color:#1f2329}
.tip.show{opacity:1}
.tm{display:flex;justify-content:space-between;margin-top:4px;color:#5b616e;font-size:12px;font-variant-numeric:tabular-nums}
.ch{display:none;flex-wrap:wrap;gap:6px;margin-top:12px}
.ch button{height:28px;padding:0 10px;border:1px solid #e3e6eb;border-radius:999px;background:#fff;font-size:12px}
.ch button:hover{border-color:#c9ced6}
@container (min-height:220px){.ch{display:flex}
.wv{height:60px}
}
@container (min-width:560px){.bars{gap:3px}
}
</style>

<div class="st"><div class="pl"><div class="hd"><i class="cv" aria-hidden="true"></i><div class="tt"><b>第 12 期 · 夜跑怎么配速</b><span>慢跑电台 · 主播 林舟</span></div><button type="button" class="pp" aria-label="暂停"><svg viewBox="0 0 20 20" aria-hidden="true"><path class="i-pa" d="M5.5 4h3v12h-3zM11.5 4h3v12h-3z"/><path class="i-pl" d="M6.5 4l9 6-9 6z"/></svg></button></div><div class="wv" role="slider" tabindex="0" aria-label="播放进度" aria-valuemin="0" aria-valuemax="263"><div class="bars"></div><div class="bars on"></div><span class="tip" aria-hidden="true"></span></div><div class="tm" aria-hidden="true"><span class="cur">0:00</span><span>4:23</span></div><div class="ch"><button type="button" data-t="0">开场</button><button type="button" data-t="68">热身慢跑</button><button type="button" data-t="152">节奏跑</button><button type="button" data-t="228">拉伸放松</button></div></div></div>

<script type="module">
export default function demo(root) {
  const DUR = 263, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wv = root.querySelector('.wv'), on = root.querySelector('.bars.on'), tip = root.querySelector('.tip'), cur = root.querySelector('.cur'), pp = root.querySelector('.pp');
  let seed = 11; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280; // 固定种子，每次画出来一样
  const bars = Array.from({ length: 64 }, (_, i) => `<i style="height:${Math.round(22 + 78 * rnd() * (0.6 + 0.4 * Math.sin(i / 4)))}%"></i>`).join('');
  root.querySelectorAll('.bars').forEach((b) => { b.innerHTML = bars; });
  const f = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  let t = 75, playing = false, scrub = null, last = 0, sec = -1, hide = 0;
  const paint = () => {
    const s = scrub ?? t, p = s / DUR;
    on.style.clipPath = `inset(0 ${(1 - p) * 100}% 0 0)`; cur.textContent = f(s);
    if (scrub !== null) { const w = wv.clientWidth; tip.textContent = f(s); tip.style.left = Math.max(22, Math.min(w - 22, p * w)) + 'px'; }
    if (Math.floor(s) !== sec) { sec = Math.floor(s); wv.setAttribute('aria-valuenow', sec); wv.setAttribute('aria-valuetext', `${f(s)} / ${f(DUR)}`); }
  };
  const loop = (now) => {
    if (!root.host.isConnected || !playing) return;
    if (scrub === null) { t = Math.min(DUR, t + (now - last) / 1000); if (t >= DUR) setPlay(false); }
    last = now; paint(); requestAnimationFrame(loop);
  };
  const setPlay = (v) => {
    if (v === playing) return; playing = v; pp.classList.toggle('paused', !v); pp.setAttribute('aria-label', v ? '暂停' : '播放');
    if (v) { if (t >= DUR) t = 0; last = performance.now(); requestAnimationFrame(loop); }
  };
  const at = (x) => Math.max(0, Math.min(DUR, ((x - wv.getBoundingClientRect().left) / wv.clientWidth) * DUR));
  const begin = (s) => { clearTimeout(hide); scrub = s; tip.classList.add('show'); paint(); };
  const end = () => { if (scrub === null) return; t = scrub; scrub = null; last = performance.now(); paint(); hide = setTimeout(() => tip.classList.remove('show'), 600); };
  wv.addEventListener('pointerdown', (e) => { if (e.button > 0) return; wv.setPointerCapture(e.pointerId); begin(at(e.clientX)); });
  wv.addEventListener('pointermove', (e) => { if (scrub !== null) { scrub = at(e.clientX); paint(); } });
  wv.addEventListener('pointerup', end); wv.addEventListener('pointercancel', end);
  wv.addEventListener('keydown', (e) => {
    const to = { ArrowLeft: t - 5, ArrowDown: t - 5, ArrowRight: t + 5, ArrowUp: t + 5, Home: 0, End: DUR }[e.key];
    if (to === undefined) return; e.preventDefault(); t = Math.max(0, Math.min(DUR, to)); paint();
  });
  pp.onclick = () => setPlay(!playing);
  root.querySelectorAll('.ch button').forEach((b) => { b.onclick = () => { t = +b.dataset.t; paint(); setPlay(true); }; });
  setPlay(true); paint();
  // 演示一次拖动：从当前位置拖到 2:30，松手接着播
  setTimeout(() => {
    if (!root.host.isConnected || scrub !== null) return;
    const a = t, t0 = performance.now(); begin(a);
    const step = (now) => {
      if (!root.host.isConnected) return;
      const k = still ? 1 : Math.min(1, (now - t0) / 700); scrub = a + (150 - a) * (1 - (1 - k) ** 3); paint();
      if (k < 1) requestAnimationFrame(step); else setTimeout(end, 150);
    };
    requestAnimationFrame(step);
  }, 300);
}
</script>
