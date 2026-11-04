---
zh: 视频悬浮小窗
en: Floating mini video
order: 60
---

## 是什么

视频播放中往下滚，视频区离开屏幕时缩成右下角的悬浮小窗接着播；原位置留着同样高度，点小窗滚回顶部恢复。

## 适合

视频详情页、直播间、课程播放页这类“边看边往下翻简介、评论、推荐”的页面。

## 不适合

暂停状态不出小窗；纯音频改用“标签栏播放碟”；整页就是全屏沉浸视频流时不需要小窗。

## 注意

用 IntersectionObserver 判断视频区还剩多少在屏幕里，不在 scroll 事件里逐帧计算；视频移走后原位置保留占位高度，下面的内容不能上移。

## 要点

- 正在播放且视频区可见不到 1/3 时缩成小窗，回到可见范围立即回原位；用 IntersectionObserver（threshold 0.33）判断，不监听 scroll 逐帧算。
- 原位置保留同高的 16:9 占位块，视频移走后下面的内容不上移、不跳动。
- 小窗约 128×72，距屏幕边 12px（底部再让出底栏和安全区），圆角 8px 带阴影；出现时从 0.9 缩放淡入，200ms 缓出。
- 小窗上只放播放 / 暂停和关闭；点其余区域平滑滚回顶部恢复。关闭 = 暂停并收回原位，再次播放前不会弹出。
- 可拖到四个角，松手按中心点吸附到最近的角（240ms 缓出，只动 transform）；移动超过 6px 才算拖动，否则当作点击；小窗聚焦时方向键也能换角。
- 暂停状态下滚走不出小窗；缩小、恢复、关闭各用 role="status" 播报一次。
- 减少动态效果时小窗直接出现，滚回顶部不做平滑滚动，吸附直接到角。

## 提示词

给{视频详情页}做「视频悬浮小窗」：用 IntersectionObserver 监听视频区（threshold 0.33），正在播放且可见不到 1/3 时把视频缩成右下角约 128×72 的悬浮小窗继续播放，原位置保留同高占位，下面的内容不跳动；小窗距屏幕边 12px（底部让出底栏和安全区）、圆角 8px 带阴影，从 0.9 缩放淡入 200ms；小窗上只有播放 / 暂停和关闭，点其余区域平滑滚回顶部恢复原位；关闭即暂停并收回，再次播放前不弹出；小窗可拖到四个角，松手吸附到最近的角（超过 6px 才算拖动，240ms 只动 transform），聚焦时方向键也能换角；暂停状态滚走不出小窗；缩小、恢复、关闭用 role="status" 播报一次；减少动态效果时小窗直接出现、直接跳转，不做缩放和平滑滚动。

## 示例

<link rel="stylesheet" href="../../_shared/app-scroll-base.css">
<style>
.st{background:#e9ecf1}
.scr{position:relative;height:100%;max-width:400px;margin:0 auto;background:#fff;overflow:hidden}
.pg{height:100%;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none}
.pg::-webkit-scrollbar{display:none}
.slot{position:relative;aspect-ratio:16/9;background:#1d1a30}
.vid{position:absolute;inset:0;overflow:hidden;background:#1d1a30;user-select:none;transition:none}
.pic{position:absolute;inset:0;background:linear-gradient(#2b3a67,#b5657c 58%,#f0a982)}
.pic i{position:absolute}
.sun{left:60%;top:30%;width:24%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#fff6dc 0 34%,#ffd08a 35% 52%,rgba(255,208,138,0) 70%);animation:rise 9s ease-in-out infinite alternate paused}
.mist{left:-30%;right:-30%;top:52%;height:18%;background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,236,226,.45),rgba(255,255,255,0));animation:drift 7s ease-in-out infinite alternate paused}
.m1{left:0;right:0;bottom:0;height:56%;background:linear-gradient(#6a5687,#3a3158);clip-path:polygon(0 62%,16% 30%,32% 56%,52% 10%,70% 50%,86% 28%,100% 50%,100% 100%,0 100%)}
.m2{left:0;right:0;bottom:0;height:34%;background:linear-gradient(#2c2645,#1a1729);clip-path:polygon(0 42%,22% 72%,44% 30%,63% 64%,82% 22%,100% 50%,100% 100%,0 100%)}
.on .sun,.on .mist{animation-play-state:running}
@keyframes rise{to{transform:translateY(-34%)}
}
@keyframes drift{to{transform:translateX(18%)}
}
.pp{position:absolute;left:50%;top:50%;z-index:2;display:grid;place-items:center;width:44px;height:44px;margin:-22px 0 0 -22px;padding:0;border:0;border-radius:50%;background:rgba(10,12,20,.5);color:#fff}
.pp svg,.x svg{width:22px;height:22px;fill:currentColor}
.pp .i2,.on .pp .i1{display:none}
.on .pp .i2{display:block}
.on:not(.mini) .pp{opacity:.8}
.tm{position:absolute;right:8px;bottom:8px;color:#fff;font-size:11px;font-variant-numeric:tabular-nums;text-shadow:0 1px 2px rgba(0,0,0,.5)}
.bar{position:absolute;left:0;right:0;bottom:0;height:3px;background:rgba(255,255,255,.25)}
.bar i{display:block;height:100%;background:#ff6b5e;transform-origin:left;transform:scaleX(.05);transition:transform .25s linear}
.back,.x{display:none}
.mini{inset:auto;z-index:3;width:128px;height:72px;border-radius:8px;box-shadow:0 6px 20px rgba(15,20,30,.3);touch-action:none;animation:pop .2s cubic-bezier(.2,0,0,1)}
.mini[data-c$=r]{right:12px}
.mini[data-c$=l]{left:12px}
.mini[data-c^=t]{top:12px}
.mini[data-c^=b]{bottom:12px}
.mini .back{display:block;position:absolute;inset:0;z-index:1;padding:0;border:0;border-radius:inherit;background:none;cursor:grab}
.mini .back:focus-visible{outline:2px solid #fff;outline-offset:-3px}
.mini .x{display:grid;place-items:center;position:absolute;right:2px;top:2px;z-index:2;width:24px;height:24px;padding:0;border:0;border-radius:50%;background:rgba(10,12,20,.5);color:#fff}
.mini .x svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round}
.mini .pp{width:30px;height:30px;margin:-15px 0 0 -15px}
.mini .pp svg{width:16px;height:16px}
.mini .tm{display:none}
.drag{cursor:grabbing;box-shadow:0 12px 28px rgba(15,20,30,.36)}
.snap{transition:transform .24s cubic-bezier(.2,0,0,1)}
@keyframes pop{from{opacity:0;transform:scale(.9)}
}
.info{padding:10px 14px 2px}
.info b,.rel b{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.info b{font-size:15px}
.info small,.rel small{display:block;color:#5b616e;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
h4{margin:10px 14px 2px;font-size:13px}
.rel{list-style:none;margin:0;padding:0 14px 12px}
.rel li{display:flex;align-items:center;gap:10px;padding:6px 0}
.rel span{min-width:0}
.rel b{font-weight:500}
.rel small{font-size:11px}
.th{flex:none;width:80px;height:45px;border-radius:6px;background:linear-gradient(#9fc5e8,#e8d5b5 60%,#7a9a6a 61%)}
.rel li:nth-child(2) .th{background:radial-gradient(circle at 70% 30%,#fff2c4 0 10%,transparent 11%),linear-gradient(#5a7d9a,#a8c3d6 55%,#556b4a 56%)}
.rel li:nth-child(3) .th{background:radial-gradient(circle at 50% 75%,#ffb35c 0 12%,transparent 13%),linear-gradient(#1f2a48,#3d4c7a 60%,#20283a 61%)}
.rel li:nth-child(4) .th{background:linear-gradient(120deg,#f6d6c8,#e9a68f 50%,#6d8f7b 51%)}
.rel li:nth-child(5) .th{background:radial-gradient(circle at 30% 60%,#ffcf7a 0 14%,transparent 15%),linear-gradient(#f28d6b,#f7c59f 50%,#3f7ca6 51%)}
.rel li:nth-child(6) .th{background:linear-gradient(#c8e6c9,#a5d6a7 55%,#5b8c5a 56%)}
</style>

<div class="st"><div class="scr"><div class="pg"><div class="slot"><div class="vid" data-c="br"><div class="pic" aria-hidden="true"><i class="sun"></i><i class="mist"></i><i class="m1"></i><i class="m2"></i></div><button type="button" class="back" aria-label="回到视频原位，方向键移动小窗"></button><button type="button" class="pp" aria-label="播放"><svg class="i1" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg><svg class="i2" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg></button><button type="button" class="x" aria-label="关闭小窗"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17"/></svg></button><span class="tm">00:12 / 03:40</span><div class="bar" aria-hidden="true"><i></i></div></div></div><div class="info"><b>雾散之前：山间晨跑五公里</b><small>青岩户外 · 2.3 万次播放 · 3 天前</small></div><h4>相关推荐</h4><ul class="rel"><li><i class="th"></i><span><b>湖边夜骑：二十公里城市环线</b><small>青岩户外 · 8.1 千次播放</small></span></li><li><i class="th"></i><span><b>雨后爬山，装备怎么选</b><small>山野笔记 · 1.2 万次播放</small></span></li><li><i class="th"></i><span><b>第一次露营就上手的五件事</b><small>周末出发 · 3.4 万次播放</small></span></li><li><i class="th"></i><span><b>晨跑前后的拉伸，十分钟版</b><small>跑者小林 · 6.7 千次播放</small></span></li><li><i class="th"></i><span><b>海岸线徒步，日落前下山</b><small>远行社 · 2.0 万次播放</small></span></li><li><i class="th"></i><span><b>城市公园一日：拍照路线</b><small>慢镜头 · 9.3 千次播放</small></span></li></ul></div><p class="sr" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const scr = root.querySelector('.scr'), pg = root.querySelector('.pg'), slot = root.querySelector('.slot'), vid = root.querySelector('.vid'), pp = root.querySelector('.pp'), back = root.querySelector('.back'), x = root.querySelector('.x'), bar = root.querySelector('.bar i'), tm = root.querySelector('.tm'), msg = root.querySelector('[role=status]');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches, LEN = 220;
  let playing = false, mini = false, t = 12, drag = null, moved = false;
  const fmt = (s) => String(s / 60 | 0).padStart(2, '0') + ':' + String(s % 60 | 0).padStart(2, '0');
  const paint = () => { vid.classList.toggle('on', playing); pp.setAttribute('aria-label', playing ? '暂停' : '播放'); };
  // 同一个视频节点在原位占位块和屏幕层之间搬动；占位块高度不变，内容不跳
  const setMini = (on, say) => {
    if (on === mini) return;
    const had = vid.contains(root.activeElement);
    mini = on;
    if (on) { scr.append(vid); vid.classList.add('mini'); } else { slot.append(vid); vid.classList.remove('mini', 'snap', 'drag'); vid.style.transform = ''; }
    if (had) pp.focus({ preventScroll: true });
    msg.textContent = say;
  };
  new IntersectionObserver(([e]) => {
    const away = e.intersectionRatio < 0.33;
    if (away && playing && !mini) setMini(true, '视频已缩成小窗，可拖到其它角');
    else if (!away && mini) setMini(false, '视频已回到原位');
  }, { root: pg, threshold: 0.33 }).observe(slot);
  const tick = setInterval(() => {
    if (!root.host.isConnected) return clearInterval(tick);
    if (!playing) return;
    t = (t + 0.25) % LEN; bar.style.transform = `scaleX(${t / LEN})`; tm.textContent = fmt(t) + ' / ' + fmt(LEN);
  }, 250);
  pp.addEventListener('click', () => { playing = !playing; paint(); });
  x.addEventListener('click', () => { playing = false; paint(); setMini(false, '已关闭小窗，视频已暂停'); });
  // 换角：先记下当前位置，换角后用 transform 从旧位置滑到新角（FLIP）
  const snap = (c) => {
    const a = vid.getBoundingClientRect();
    vid.classList.remove('snap'); vid.dataset.c = c; vid.style.transform = '';
    const b = vid.getBoundingClientRect();
    if (still) return;
    vid.style.transform = `translate(${a.left - b.left}px,${a.top - b.top}px)`; vid.getBoundingClientRect();
    vid.classList.add('snap'); vid.style.transform = '';
  };
  back.addEventListener('pointerdown', (e) => { if (e.button > 0) return; drag = { x: e.clientX, y: e.clientY }; moved = false; back.setPointerCapture(e.pointerId); });
  back.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!moved && Math.hypot(dx, dy) < 6) return;
    moved = true; vid.classList.remove('snap'); vid.classList.add('drag'); vid.style.transform = `translate(${dx}px,${dy}px)`;
  });
  const up = () => {
    if (!drag) return;
    drag = null; vid.classList.remove('drag');
    if (!moved) return;
    const r = vid.getBoundingClientRect(), s = scr.getBoundingClientRect();
    snap((r.top + r.height / 2 < s.top + s.height / 2 ? 't' : 'b') + (r.left + r.width / 2 < s.left + s.width / 2 ? 'l' : 'r'));
  };
  back.addEventListener('pointerup', up); back.addEventListener('pointercancel', up);
  back.addEventListener('click', () => { if (moved) { moved = false; return; } pg.scrollTo({ top: 0, behavior: still ? 'auto' : 'smooth' }); });
  back.addEventListener('keydown', (e) => {
    const c = vid.dataset.c, k = { ArrowUp: 't' + c[1], ArrowDown: 'b' + c[1], ArrowLeft: c[0] + 'l', ArrowRight: c[0] + 'r' }[e.key];
    if (!k) return;
    e.preventDefault(); if (k !== c) snap(k);
  });
  // 缩略图：开播后自动往下滚，停在已经缩成小窗的状态
  playing = true; paint();
  setTimeout(() => pg.scrollTo({ top: slot.offsetHeight + 40, behavior: still ? 'auto' : 'smooth' }), 300);
}
</script>
