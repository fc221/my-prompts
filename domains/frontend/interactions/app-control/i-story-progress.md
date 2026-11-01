---
zh: 一段段走完的连播
en: Segmented autoplay
order: 90
---

## 是什么

顶部一排细进度段，一段对应一张；当前段从左走到右，走满自动换下一张。点右边前进、点左边后退，按住暂停，往下拉关闭。

## 适合

新功能介绍、开屏引导、商品图集速览、每日简报这类一组 3–8 张、每张看几秒就够的内容。

## 不适合

要细读的长文字用手动翻页，读不完就被翻走会很烦；超过 10 张时进度段太细，换成页码。

## 注意

会自己往前走的内容必须能停：有看得见的暂停按钮，按住能暂停，切到后台自动暂停；开启减少动态效果时不自动前进。

## 要点

- 进度段高 2–3px、间隔 4px、等分宽度：看过的填满，当前段匀速走，没看的半透明；每张默认 5 秒，视频按它自己的时长。
- 点按区：左 1/3 后退，右 2/3 前进；在第一张点左边回到本张开头；最后一张走完停住，显示“重新播放”。
- 按住超过 200ms 算暂停：进度停在原处，顶部和底部的界面淡出让出画面，松手接着走；不到 200ms 松手仍按点按翻页。
- 往下拉超过 70px 松手关闭，不到就弹回；右上角同时有关闭按钮。
- 键盘：←/→ 翻页，空格暂停 / 继续；换张时用 role="status" 播报“第 2 张，共 4 张”。
- document.hidden 时暂停，回来接着走；减少动态效果时当前段直接填满、只靠点按翻页。

## 提示词

给{内容，如 新功能介绍}做「一段段走完的连播」：顶部 {4} 段等宽进度条（高 3px、间隔 4px），看过的填满、当前段 {5} 秒匀速走满后自动换下一张、没看的半透明；点左 1/3 后退、右 2/3 前进，第一张点左边回到开头，最后一张走完停住并显示“重新播放”；按住超过 200ms 暂停并淡出顶部和底部界面，松手继续，不到 200ms 按点按处理；往下拉超过 70px 关闭，不到就弹回；右上角有暂停 / 继续和关闭按钮；←/→ 翻页、空格暂停，换张时用 role="status" 播报第几张；页面切到后台时暂停；减少动态效果时不自动前进。

## 示例

<link rel="stylesheet" href="../../_shared/app-control-base.css">
<style>
.st{display:grid;place-items:center;padding:8px;background:#e9ecf1}
.sv{position:relative;width:min(100%,300px);height:100%;border-radius:14px;overflow:hidden;color:#fff;background:var(--bg);touch-action:none;user-select:none;-webkit-user-select:none;outline-offset:-3px;transition:background .3s}
.sv.pull{transition:none}
.sv.back{transition:transform .22s ease-out,background .3s}
.art{position:absolute;right:-18px;top:34%;width:120px;height:120px;border-radius:36px;background:rgba(255,255,255,.14);transform:rotate(18deg)}
.art::after{content:"";position:absolute;inset:28px;border-radius:24px;background:rgba(255,255,255,.18)}
.bars{position:absolute;left:10px;right:10px;top:8px;z-index:2;display:flex;gap:4px;transition:opacity .2s}
.bars i{flex:1;height:3px;border-radius:2px;background:rgba(255,255,255,.35);overflow:hidden}
.bars b{display:block;height:100%;background:#fff;transform-origin:left;transform:scaleX(0)}
.bars i.seen b{transform:none}
.top{position:absolute;left:12px;right:6px;top:15px;z-index:2;display:flex;align-items:center;gap:4px;transition:opacity .2s}
.top span{flex:1;min-width:0;font-size:12px;font-weight:600}
.ib{display:grid;place-items:center;width:32px;height:32px;padding:0;border:0;border-radius:50%;background:rgba(0,0,0,.2);color:#fff}
.ib svg{width:16px;height:16px;fill:currentColor}
.body{position:absolute;left:0;right:0;bottom:0;display:grid;gap:2px;padding:14px 16px 16px;background:linear-gradient(transparent,rgba(0,0,0,.28));transition:opacity .2s}
.body h3{margin:0;font-size:19px;line-height:1.3}
.body p{margin:0;font-size:12px;opacity:.92}
.hold .bars,.hold .top,.hold .body{opacity:0}
.end{position:absolute;inset:0;z-index:3;display:grid;place-content:center;justify-items:center;gap:8px;background:rgba(10,14,24,.55);font-weight:600}
@container (max-height:220px){.body h3{font-size:17px}
}
</style>

<div class="st">
  <div class="sv" tabindex="0" aria-roledescription="连播" aria-label="本周更新，←/→ 翻页，空格暂停">
    <i class="art" aria-hidden="true"></i>
    <div class="bars" aria-hidden="true"></div>
    <div class="top"><span>本周更新</span><button type="button" class="ib pz" aria-label="暂停"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 3h3v10H4zM9 3h3v10H9z"/></svg></button><button type="button" class="ib cl" aria-label="关闭"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.2 3.1 8 6.9l3.8-3.8 1.1 1.1L9.1 8l3.8 3.8-1.1 1.1L8 9.1l-3.8 3.8-1.1-1.1L6.9 8 3.1 4.2z"/></svg></button></div>
    <div class="body"><h3></h3><p></p></div>
    <div class="end" hidden><span class="et">看完了</span><button type="button" class="ctl">重新播放</button></div>
  </div>
  <p class="sr" role="status"></p>
</div>

<script type="module">
const S = [
  ['没网也能看地图', '出发前下载区域，地铁里照样导航', 'linear-gradient(160deg,#2f6fb3,#1b3d6e)'],
  ['清单可以一起编辑', '邀请家人，谁买了什么一目了然', 'linear-gradient(160deg,#2f8f6b,#155240)'],
  ['夜里自动变暗', '深色模式跟随系统，睡前不刺眼', 'linear-gradient(160deg,#5b4bb7,#2a2163)'],
  ['搜索快了一倍', '输入拼音首字母也能找到', 'linear-gradient(160deg,#c2552b,#7a2a12)'],
];
const DUR = 5000, PLAY = '<path d="M5 3l8 5-8 5z"/>', PAUSE = '<path d="M4 3h3v10H4zM9 3h3v10H9z"/>';
export default function demo(root) {
  const sv = root.querySelector('.sv'), barsEl = root.querySelector('.bars'), h3 = root.querySelector('h3'), p = root.querySelector('.body p'), pz = root.querySelector('.pz'), end = root.querySelector('.end'), et = root.querySelector('.et'), msg = root.querySelector('[role=status]');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  barsEl.innerHTML = S.map(() => '<i><b></b></i>').join('');
  const bars = [...barsEl.children];
  let i = 0, anim = null, paused = false, held = false, closed = false;
  const stopped = () => paused || held || closed || document.hidden;
  const go = (n) => {
    anim?.cancel(); anim = null; i = Math.max(0, Math.min(S.length - 1, n)); end.hidden = true;
    const [t, d, bg] = S[i]; h3.textContent = t; p.textContent = d; sv.style.setProperty('--bg', bg);
    bars.forEach((b, j) => b.classList.toggle('seen', j < i || (still && j === i)));
    msg.textContent = `第 ${i + 1} 张，共 ${S.length} 张：${t}`;
    if (still) return;
    anim = bars[i].firstChild.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: DUR, easing: 'linear', fill: 'forwards' });
    anim.onfinish = () => { if (!root.host.isConnected) return; if (i < S.length - 1) go(i + 1); else { et.textContent = '看完了'; end.hidden = false; } };
    if (stopped()) anim.pause();
  };
  const sync = () => { if (anim && anim.playState !== 'finished') stopped() ? anim.pause() : anim.play(); };
  const setPaused = (v) => { paused = v; pz.innerHTML = `<svg viewBox="0 0 16 16" aria-hidden="true">${v ? PLAY : PAUSE}</svg>`; pz.setAttribute('aria-label', v ? '继续' : '暂停'); sync(); msg.textContent = v ? '已暂停' : '继续播放'; };
  const close = () => { closed = true; sync(); et.textContent = '已关闭'; end.hidden = false; };
  pz.onclick = () => setPaused(!paused);
  root.querySelector('.cl').onclick = close;
  root.querySelector('.end .ctl').onclick = () => { closed = false; setPaused(false); go(0); sv.focus(); };
  // 点按翻页 / 按住暂停 / 下拉关闭
  let x0 = 0, y0 = 0, dy = 0, down = false, pulling = false, timer = 0;
  sv.addEventListener('pointerdown', (e) => { if (e.target.closest('button') || !end.hidden || e.button > 0) return; down = true; pulling = false; x0 = e.clientX; y0 = e.clientY; dy = 0; sv.setPointerCapture(e.pointerId); timer = setTimeout(() => { held = true; sv.classList.add('hold'); sync(); }, 200); });
  sv.addEventListener('pointermove', (e) => {
    if (!down) return; const dx = e.clientX - x0; dy = e.clientY - y0;
    if (!pulling && dy > 8 && dy > Math.abs(dx)) { pulling = true; clearTimeout(timer); held = true; sync(); sv.classList.add('pull'); }
    if (pulling) sv.style.transform = `translateY(${Math.max(0, dy) * 0.6}px)`;
  });
  const up = (e) => {
    if (!down) return; down = false; clearTimeout(timer);
    if (pulling) { sv.classList.remove('pull'); sv.classList.add('back'); sv.style.transform = ''; setTimeout(() => sv.classList.remove('back'), 240); held = false; if (dy > 70) close(); else sync(); return; }
    if (held) { held = false; sv.classList.remove('hold'); sync(); return; }
    if (e.type === 'pointercancel') return;
    const r = sv.getBoundingClientRect(); go(e.clientX - r.left < r.width / 3 ? i - (i > 0 ? 1 : 0) : i + 1 < S.length ? i + 1 : i);
  };
  sv.addEventListener('pointerup', up); sv.addEventListener('pointercancel', up);
  sv.addEventListener('keydown', (e) => {
    if (e.target !== sv) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); if (i + 1 < S.length) go(i + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
    else if (e.key === ' ') { e.preventDefault(); setPaused(!paused); }
  });
  const vis = () => { if (!root.host.isConnected) return document.removeEventListener('visibilitychange', vis); sync(); };
  document.addEventListener('visibilitychange', vis);
  go(0);
}
</script>
