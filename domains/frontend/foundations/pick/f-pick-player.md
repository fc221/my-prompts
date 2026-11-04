---
zh: 手机播放器的六种形态
en: Six mobile player forms
aka: 播放器选型 视频播放 音频播放 小窗播放 画中画 语音条 迷你播放条 横屏全屏 章节播放
order: 70
---

## 是什么

手机上的“播放”按场景长成六种样子：聊天里的语音条、详情页里的内嵌视频、标签栏上方的迷你播放条、横屏全屏、带章节的长音频、缩到角落的小窗。组件库都没有播放器，都用原生 video / audio 加自己画的控件。示例里每种都能点。

## 适合

需求里只写了“能播放”，还没定播放器长什么样的时候：先定场景，再定样子。

## 注意

播放器只建一个，挂在页面外层：语音条、迷你播放条、小窗、全屏都是它换了个样子，不是每个页面各建一个。同一时间只有一个声音在响，切页面、缩小、展开都接着播，不从头开始。

## 要点

- 三家组件库（Element Plus、Naive UI、Ant Design Vue）都没有播放器，用原生 video / audio 加自己画的控件；能借的只有进度条：滑块 el-slider / n-slider / a-slider，拖动时只改时间文字、松手才跳（Element Plus 用 change 不用 input，Naive UI 在 on-dragend 里跳，Ant Design Vue 用 afterChange），提示用 format-tooltip / format-tooltip / tipFormatter 显示成 03:25
- 聊天里的语音条：宽度随时长变，最短 64px，最长到聊天区的 70%（60 秒封顶）；点一下播、再点停，播另一条前先停这条；播完自动接着播下一条没听过的；没听过的右侧有 8px 红点，开始播就消失
- 详情页里的内嵌视频：16:9 封面，中间 48px 播放键，右下角写时长；点了原地播放、不跳页，iOS 要加 playsinline，否则会自己进全屏；只在 Wi-Fi 下静音自动播（muted + playsinline），左上角写“点按开声音”；拿不到网络类型时（iOS Safari 没有 navigator.connection）按流量处理，不自动播
- 底部迷你播放条：离开播放页时缩成标签栏上方 56–64px 的一条，放封面、标题、播放 / 暂停、关闭，顶边一条细进度；点条身回到播放页，切页面不中断；接上 Media Session（navigator.mediaSession 的 metadata，play / pause / seekbackward / seekforward），锁屏和耳机键都能控制；以音频为主的 App 也可以做成「标签栏播放碟」
- 横屏全屏：点全屏先 requestFullscreen，再 screen.orientation.lock('landscape')，锁不上（如 iPhone）就提示“把手机横过来”；控件 3 秒没操作就隐藏，点一下画面再出来，暂停时一直显示；双击左右两侧快退 / 快进 10 秒，那一侧显示“−10 秒”“+10 秒”；退出全屏时解锁方向
- 带章节的长音频：章节列表每行写标题、时长、已听进度（已听完 / 已听 40% / 未听），当前章高亮并滚到看得见的位置；每章各记播到哪，换回来从断点接着播；倍速 0.75–2 倍，定时关闭可选“本章结束”和 15 / 30 / 60 分钟
- 缩到角落的小窗：离开页面时缩成约 128×72 的浮窗继续播，可拖到四角吸附，点小窗回到原页面原位置；自己画的浮窗只在本网页里有效，系统画中画 video.requestPictureInPicture() 能浮在别的 App 上，不支持时退回自绘浮窗；缩放和吸附的细节见「视频悬浮小窗」
- 跟 AI 说清四件事：用在什么场景（聊天、详情、边听边逛、长视频、课程、离开还要看）；放在页面哪里；离开页面后还播不播（停、缩成迷你条、缩成小窗）；回来时从哪继续（断点、原位、从头）

## 提示词

在{产品}的{页面}加播放，播的是{语音 / 视频 / 长音频}，用户通常在{场景}里用。组件库没有播放器，用原生 video / audio 加自己画的控件；进度条用项目组件库自带的滑块（Element Plus el-slider；Naive UI n-slider；Ant Design Vue a-slider），不手写，拖动时只改时间文字，松手才跳转。先判断属于哪一种，说明理由后只实现这一种：聊天里的语音消息用语音条（宽度随时长变，最短 64px、最长 70%，同一时间只播一条，播完接着播下一条没听过的，未听有红点）；详情页里的视频用内嵌播放（16:9 封面、中间播放键、右下角时长，playsinline 原地播，只在 Wi-Fi 下静音自动播，拿不到网络类型就不自动播）；边听边逛别的页面用底部迷你播放条（标签栏上方 {60}px，封面、标题、播放 / 暂停、关闭，点条身回播放页，切页面不中断，接 Media Session）；看长视频用横屏全屏（锁横屏，锁不上就提示把手机横过来，控件 3 秒无操作隐藏，双击左右两侧快退 / 快进 10 秒）；课程、有声书用带章节的长音频（章节写标题、时长、已听进度，高亮当前章，每章记断点，倍速和定时关闭）；离开页面还要接着看用小窗（自绘浮窗或 requestPictureInPicture，四角吸附，点回原页面）。写清四件事：用在{场景}；放在页面{位置}；离开页面后{停止 / 缩成迷你条 / 缩成小窗}；回来时从{断点 / 头}继续。播放器只建一个，挂在页面外层，同一时间只有一个声音；图标按钮都有文字标签；减少动态效果时去掉波纹和封面动画，控件直接显隐。

## 示例

<link rel="stylesheet" href="../../_shared/pick.css">
<style>
.x-sc{position:relative;align-self:stretch;width:100%;max-width:320px;overflow:hidden;border-radius:12px;background:#fff;box-shadow:0 0 0 1px #e3e6eb;font-size:12px;line-height:16px}
.x-sc button{padding:0;border:0;background:none;color:inherit;font:inherit;cursor:pointer}
.x-sc button:focus-visible,.x-sc:focus-visible{outline:2px solid #3b5bdb;outline-offset:-2px}
.x-sc svg{display:block;flex:none;width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.x-sc .x-f{fill:currentColor;stroke:none}
.x-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.x-pic{background:radial-gradient(circle at 78% 26%,#ffe8b0 0 7%,transparent 8%),linear-gradient(160deg,transparent 62%,#2e5e4e 62.5%),linear-gradient(200deg,transparent 54%,#477d68 54.5%),linear-gradient(#7fb3d9,#f3d3a6)}
.x-sc .x-ib{flex:none;width:32px;height:32px;display:grid;place-items:center;border-radius:16px}
.x-sc .x-ib:hover{background:rgba(127,127,127,.16)}
.x-tm{font-variant-numeric:tabular-nums}
.x-track{flex:1;min-width:0;height:4px;border-radius:2px;background:#e3e6eb;overflow:hidden}
.x-track::after{content:"";display:block;width:calc(var(--p,0) * 100%);height:100%;background:#3b5bdb}
.x-cap{position:absolute;right:6px;bottom:7px;pointer-events:none;padding:0 4px;border-radius:4px;background:rgba(15,23,42,.62);color:#fff;font-size:11px;line-height:16px;font-variant-numeric:tabular-nums}
/* 语音条 */
.x-chat{display:flex;flex-direction:column;justify-content:center;gap:6px;padding:8px 10px;background:#eef0f3}
.x-msg{display:flex;align-items:center;gap:6px}
.x-av{flex:none;width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#f6c28b,#e07a5f)}
.x-chat .x-me{display:none;flex-direction:row-reverse}
.x-me .x-av{background:linear-gradient(135deg,#9ab4f5,#3b5bdb)}
.x-sc .x-vb{display:flex;align-items:center;gap:6px;width:calc(64px + (70% - 64px) * var(--t));height:26px;padding:0 10px;border-radius:6px;background:linear-gradient(90deg,#d3defc calc(var(--p,0) * 100%),#fff 0);font-variant-numeric:tabular-nums}
.x-vb span{margin-left:auto}
.x-me .x-vb{flex-direction:row-reverse;background:linear-gradient(270deg,#bccbfa calc(var(--p,0) * 100%),#dfe6ff 0)}
.x-me .x-vb span{margin:0 auto 0 0}
.x-me .x-vb svg{transform:scaleX(-1)}
.x-dot{display:none;flex:none;width:8px;height:8px;border-radius:50%;background:#e03131}
.x-vb[data-h="0"]+.x-dot{display:block}
.x-vb[aria-pressed=true] .x-a1{animation:x-bl .9s steps(1) infinite}
.x-vb[aria-pressed=true] .x-a2{animation:x-bl .9s steps(1) .45s infinite}
@keyframes x-bl{50%{opacity:.2}}
/* 视频加文字：详情页内嵌视频、小窗的原页面 */
.x-det{display:flex;align-items:center;gap:10px;padding:8px}
.x-det .x-vd{position:relative;flex:none;height:100%;aspect-ratio:16/9;border-radius:8px;overflow:hidden;color:#fff}
.x-tx{flex:1;min-width:0;display:flex;flex-direction:column;align-items:flex-start;gap:4px}
.x-tx b{font-size:13px;line-height:18px}
.x-tx small{color:#5b616e;font-size:11px;line-height:14px}
.x-sc .x-pl{position:absolute;inset:0;display:grid;place-items:center}
.x-pl span{width:32px;height:32px;display:grid;place-items:center;border-radius:50%;background:rgba(15,23,42,.55)}
.x-vd[data-st=auto] .x-pl span,.x-vd[data-st=play] .x-pl span{visibility:hidden}
.x-sc .x-mu{position:absolute;left:6px;top:6px;display:flex;align-items:center;gap:4px;height:22px;padding:0 8px;border-radius:11px;background:rgba(15,23,42,.62);font-size:11px}
.x-mu svg{width:14px;height:14px}
.x-pr{position:absolute;left:0;right:0;bottom:0;height:3px;pointer-events:none;background:rgba(255,255,255,.35)}
.x-pr::after{content:"";display:block;width:calc(var(--p,0) * 100%);height:100%;background:#fff}
.x-net{display:flex;padding:2px;border-radius:7px;background:#f0f2f5}
.x-sc .x-net button{height:22px;padding:0 6px;border-radius:5px;color:#5b616e;font-size:11px}
.x-sc .x-net [aria-pressed=true]{background:#fff;color:#1f2329;font-weight:600;box-shadow:0 1px 2px rgba(15,17,22,.1)}
.x-sc .x-go{height:28px;padding:0 12px;border-radius:14px;background:#1f2329;color:#fff;font-weight:600}
/* 迷你播放条 */
.x-app{display:flex;flex-direction:column}
.x-page{flex:1;min-height:0;display:flex;flex-direction:column;align-items:flex-start;gap:5px;padding:6px 12px;overflow:hidden}
.x-page b{font-size:13px}
.x-ln{flex:none;display:block;width:100%;height:7px;border-radius:4px;background:#eceef2}
.x-ln+.x-ln,.x-tiles{display:none}
.x-tiles{flex:none;width:100%;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.x-tiles i{aspect-ratio:16/9;border-radius:8px;background:linear-gradient(135deg,#d0ebff,#a5d8ff)}
.x-tiles i+i{background:linear-gradient(135deg,#ffe8cc,#ffc078)}
.x-tiles i+i+i{background:linear-gradient(135deg,#d3f9d8,#8ce99a)}
.x-sc .x-re{flex:none;height:28px;padding:0 12px;border-radius:14px;background:#1f2329;color:#fff;font-weight:600}
.x-mini{position:relative;flex:none;display:flex;align-items:center;gap:2px;height:40px;padding:0 4px 0 8px;border-top:1px solid #e3e6eb;background:#fafbfc}
.x-mini::before{content:"";position:absolute;left:0;top:-1px;width:calc(var(--p,0) * 100%);height:2px;background:#3b5bdb}
.x-sc .x-open{flex:1;min-width:0;display:flex;align-items:center;gap:8px;height:100%;text-align:left}
.x-cv{flex:none;display:block;width:28px;height:28px;border-radius:6px;background:linear-gradient(135deg,#f59f00,#d9480f)}
.x-open span{min-width:0;display:flex;flex-direction:column}
.x-open b,.x-info b{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.x-open small{display:none;color:#5b616e;font-size:11px;line-height:14px}
.x-tabs{flex:none;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));height:28px;border-top:1px solid #e3e6eb}
.x-sc .x-tabs button{color:#5b616e;font-size:11px}
.x-sc .x-tabs [aria-current]{color:#3b5bdb;font-weight:600}
.x-full{position:absolute;inset:0;display:flex;align-items:center;gap:12px;padding:8px 12px 8px 44px;background:linear-gradient(160deg,#fff4e6,#fff 60%)}
.x-sc .x-down{position:absolute;left:6px;top:6px}
.x-full .x-cv{width:72px;height:72px;border-radius:10px}
.x-info{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
.x-info small{color:#5b616e;font-size:11px}
.x-seek{display:flex;align-items:center;gap:6px;color:#5b616e;font-size:11px}
.x-sc .x-big{background:#1f2329;color:#fff}
.x-sc .x-big:hover{background:#3a3f48}
/* 横屏全屏 */
.x-sc.x-land{width:auto;max-width:100%;aspect-ratio:16/9;color:#fff;font-size:11px;line-height:14px;touch-action:manipulation;user-select:none}
.x-snow{background:radial-gradient(circle at 80% 20%,#f1f3f8 0 2.4%,transparent 2.8%),linear-gradient(#0e1a34,#34507f 72%,#7f9cc8)}
.x-snow::before{content:"";position:absolute;inset:34% 0 0;background:linear-gradient(#f4f7fb 0 16%,#a9bbd6 30%,#2b3d62 62%,#1b2742);clip-path:polygon(0 100%,0 64%,16% 34%,28% 50%,46% 0,62% 42%,74% 24%,100% 60%,100% 100%)}
.x-ui{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:space-between;padding:6px 8px;background:linear-gradient(rgba(0,0,0,.5),transparent 34%,transparent 60%,rgba(0,0,0,.6));transition:opacity .24s,visibility 0s}
.x-off .x-ui{opacity:0;visibility:hidden;transition:opacity .24s,visibility 0s .24s}
.x-top b{font-weight:600}
.x-mid{display:flex;justify-content:center;gap:16px;transition:visibility 0s .16s}
.x-sc .x-mid button{width:28px;height:28px;display:grid;place-items:center;border-radius:50%;background:rgba(15,23,42,.5);font-size:10px;font-weight:600}
.x-seek2 .x-mid{visibility:hidden;transition:none}
.x-bot{display:flex;align-items:center;gap:6px}
.x-bot .x-track{background:rgba(255,255,255,.35)}
.x-bot .x-track::after{background:#fff}
.x-rip{position:absolute;top:50%;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.24);font-weight:600;opacity:0;transform:translateY(-50%);transition:opacity .16s;pointer-events:none}
.x-l{left:8%}
.x-r{right:8%}
.x-rip.on{opacity:1}
/* 章节长音频 */
.x-book{display:flex;flex-direction:column;padding:6px 8px}
.x-hd{flex:none;display:flex;align-items:center;gap:6px;height:28px;padding-left:4px}
.x-hd .x-cv{width:24px;height:24px;border-radius:5px;background:linear-gradient(135deg,#63e6be,#1c7ed6)}
.x-hd b{flex:1;min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.x-sc .x-pill{flex:none;height:22px;padding:0 6px;border-radius:11px;box-shadow:inset 0 0 0 1px #d5d9e0;font-size:11px;font-variant-numeric:tabular-nums}
.x-hd .x-ib{width:28px;height:28px}
.x-ch{position:relative;flex:1;min-height:0;margin:2px 0 0;padding:0;list-style:none;overflow-y:auto;scrollbar-width:none;overscroll-behavior:contain}
.x-sc .x-row{position:relative;width:100%;display:flex;align-items:center;gap:6px;height:24px;padding:0 6px;border-radius:6px;text-align:left}
.x-sc .x-row[aria-current=true]{background:#edf1ff;color:#2f49b8;font-weight:600}
.x-no{flex:none;width:16px;color:#5b616e;font-size:11px;font-variant-numeric:tabular-nums}
.x-nm{flex:1;min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.x-du,.x-st{flex:none;color:#5b616e;font-size:11px;font-weight:400}
.x-st{width:52px;text-align:right}
.x-row i{display:none;position:absolute;left:28px;right:6px;bottom:2px;height:2px;border-radius:1px;background:linear-gradient(90deg,#3b5bdb calc(var(--q,0) * 100%),#cfd7f3 0)}
.x-sc .x-part i{display:block}
/* 小窗 */
.x-pipw{--w:96px;--m:8px}
.x-vp{position:absolute;inset:0}
.x-cm{position:absolute;inset:0;display:flex;flex-direction:column;gap:4px;padding:8px 12px}
.x-h{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:20px}
.x-h b{font-size:13px}
.x-sc .x-lk{color:#3b5bdb;font-size:12px}
.x-cm p{margin:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#454b57}
.x-cm em{font-style:normal;color:#5b616e}
.x-pip{position:absolute;width:var(--w);aspect-ratio:16/9;border-radius:8px;overflow:hidden;box-shadow:0 6px 16px -4px rgba(15,23,42,.5);transition:left .24s cubic-bezier(.2,.8,.2,1),top .24s cubic-bezier(.2,.8,.2,1)}
.x-pip.x-drag{transition:none}
.x-tl,.x-tr{top:var(--m)}
.x-bl,.x-br{top:calc(100% - var(--w) * 9 / 16 - var(--m))}
.x-tl,.x-bl{left:var(--m)}
.x-tr,.x-br{left:calc(100% - var(--w) - var(--m))}
.x-sc .x-back{position:absolute;inset:0;cursor:grab;touch-action:none}
.x-pc{position:absolute;top:2px;right:2px;display:flex;gap:2px}
.x-sc .x-pc .x-ib{width:22px;height:22px;border-radius:11px;background:rgba(15,23,42,.5);color:#fff}
.x-pc svg{width:12px;height:12px}
.x-pip .x-cap{left:4px;right:auto;bottom:4px}
@container (max-width:310px){.x-det .x-vd{height:80px}}
@container (min-height:260px){
.x-sc{font-size:13px;line-height:18px}
.x-chat{gap:10px;padding:12px}
.x-chat .x-me{display:flex}
.x-av{width:28px;height:28px}
.x-sc .x-vb{height:32px}
.x-det{flex-direction:column;align-items:stretch;justify-content:center}
.x-det .x-vd{align-self:center;width:auto;height:160px}
.x-tx{flex:none;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;column-gap:8px}
.x-tx>:last-child{grid-column:2;grid-row:1/3}
.x-tx b{font-size:14px;line-height:20px}
.x-pl span{width:48px;height:48px}
.x-page{gap:8px;padding:12px 16px}
.x-ln+.x-ln{display:block;width:72%}
.x-tiles{display:grid}
.x-page b{font-size:15px}
.x-mini{height:56px;padding:0 6px 0 12px}
.x-mini .x-cv{width:40px;height:40px}
.x-open small{display:block}
.x-tabs{height:44px}
.x-sc .x-tabs button{font-size:12px}
.x-full{gap:16px;padding:12px 16px 12px 52px}
.x-full .x-cv{width:96px;height:96px;border-radius:12px}
.x-info b{white-space:normal}
.x-info{gap:6px}
.x-info b{font-size:15px}
.x-sc.x-land{font-size:13px;line-height:18px}
.x-ui{padding:10px 14px}
.x-mid{gap:28px}
.x-sc .x-mid button{width:44px;height:44px;font-size:12px}
.x-book{padding:8px 12px}
.x-hd{height:40px}
.x-hd .x-cv{width:32px;height:32px}
.x-sc .x-pill{height:28px;padding:0 10px;font-size:12px}
.x-hd .x-ib{width:36px;height:36px}
.x-sc .x-row{height:36px}
.x-ch{margin-top:4px}
.x-pipw{--w:128px;--m:12px}
.x-cm{gap:8px;padding:12px 16px}
.x-h b{font-size:15px}
}
@media (prefers-reduced-motion:reduce){
.x-vb[aria-pressed=true] .x-a1,.x-vb[aria-pressed=true] .x-a2{animation:none}
.x-ui,.x-off .x-ui,.x-rip,.x-pip,.x-mid{transition:none}
}
</style>

<script type="module">
import { pick } from '../../_shared/pick.ts';

const SVG = {
  play: '<path class="x-f" d="M8 5.5v13l10.5-6.5z"/>',
  pause: '<path class="x-f" d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/>',
  close: '<path d="M7 7l10 10M17 7 7 17"/>',
  wave: '<path d="M6 12h.01"/><path class="x-a1" d="M10 8.5a5 5 0 0 1 0 7"/><path class="x-a2" d="M14 5.5a9.5 9.5 0 0 1 0 13"/>',
  mute: '<path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="m16 10 4 4m0-4-4 4"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
};
const ic = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${SVG[k]}</svg>`;
const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
// 小样的计时器：切到别的种类、或整个示例被移除（node.isConnected 为 false）时停下
const every = (node, ms, fn) => {
  const t = setInterval(() => (node.isConnected ? fn() : clearInterval(t)), ms);
  return t;
};
const toggle = (b, on) => {
  b.innerHTML = ic(on ? 'pause' : 'play');
  b.setAttribute('aria-label', on ? '暂停' : '播放');
};

const bubble = (s, h, me) =>
  `<div class="x-msg${me ? ' x-me' : ''}"><i class="x-av" aria-hidden="true"></i><button type="button" class="x-vb" style="--t:${(Math.min(s, 60) / 60).toFixed(3)}" data-s="${s}" data-h="${h}">${ic('wave')}<span>${s}″</span></button><i class="x-dot" aria-hidden="true"></i></div>`;

function voice(el) {
  const btns = [...el.querySelectorAll('.x-vb')];
  let cur = null, t = 0;
  const name = (b) => `${b.closest('.x-me') ? '我' : '林夏'}的语音，${b.dataset.s} 秒${b.dataset.h === '0' ? '，未听' : ''}`;
  const stop = () => {
    if (!cur) return;
    clearInterval(t);
    cur.setAttribute('aria-pressed', 'false');
    cur.style.setProperty('--p', 0);
    cur = null;
  };
  const play = (b) => {
    stop();
    cur = b;
    b.dataset.h = '1';
    b.setAttribute('aria-pressed', 'true');
    b.setAttribute('aria-label', name(b));
    let p = 0;
    const step = 0.1 / (b.dataset.s * 0.25); // 示例加速：1 秒语音按 0.25 秒播
    t = every(b, 100, () => {
      p = Math.min(1, p + step);
      b.style.setProperty('--p', p);
      if (p < 1) return;
      const next = btns.slice(btns.indexOf(b) + 1).find((x) => x.dataset.h === '0'); // 接着播下一条没听过的
      stop();
      if (next) play(next);
    });
  };
  btns.forEach((b) => {
    b.setAttribute('aria-pressed', 'false');
    b.setAttribute('aria-label', name(b));
    b.addEventListener('click', () => (b === cur ? stop() : play(b)));
  });
  play(btns[1]);
}

function inline(el) {
  const vd = el.querySelector('.x-vd'), pl = el.querySelector('.x-pl'), mu = el.querySelector('.x-mu'), cap = el.querySelector('.x-cap'), net = [...el.querySelectorAll('.x-net button')];
  const LEN = 138;
  let s = 0, st = 'idle', t = 0;
  const paint = () => {
    vd.dataset.st = st;
    mu.hidden = st !== 'auto';
    cap.textContent = st === 'idle' ? mmss(LEN) : `${mmss(s)} / ${mmss(LEN)}`;
    vd.style.setProperty('--p', s / LEN);
    pl.setAttribute('aria-label', st === 'play' ? '暂停' : st === 'auto' ? '打开声音' : `播放视频，时长 ${mmss(LEN)}`);
  };
  const go = (next) => {
    st = next;
    clearInterval(t);
    if (st === 'auto' || st === 'play') t = every(vd, 1000, () => { s = (s + 1) % LEN; paint(); });
    paint();
  };
  pl.addEventListener('click', () => go(st === 'play' ? 'pause' : 'play')); // 静音自动播时点画面等于开声音
  mu.addEventListener('click', () => go('play'));
  net.forEach((b, i) => b.addEventListener('click', () => {
    net.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    if (i === 0 && st === 'idle') go('auto');
    if (i === 1 && st === 'auto') { s = 0; go('idle'); }
  }));
  go('auto');
}

function mini(el) {
  const sc = el.querySelector('.x-sc'), bar = el.querySelector('.x-mini'), full = el.querySelector('.x-full'), re = el.querySelector('.x-re'), open = el.querySelector('.x-open'), down = el.querySelector('.x-down'), now = el.querySelector('.x-now');
  const tgs = [...el.querySelectorAll('.x-tg')], tabs = [...el.querySelectorAll('.x-tabs button')];
  const LEN = 1100;
  let s = 372, on = true, t = 0;
  const paint = () => {
    sc.style.setProperty('--p', s / LEN);
    now.textContent = mmss(s);
    tgs.forEach((b) => toggle(b, on));
  };
  const run = (v) => {
    on = v;
    clearInterval(t);
    if (on) t = every(sc, 1000, () => { s = Math.min(LEN, s + 1); paint(); });
    paint();
  };
  const fold = () => { full.hidden = true; open.focus(); };
  tgs.forEach((b) => b.addEventListener('click', () => run(!on)));
  open.addEventListener('click', () => { full.hidden = false; down.focus(); });
  down.addEventListener('click', fold);
  full.addEventListener('keydown', (e) => { if (e.key === 'Escape') fold(); });
  el.querySelector('.x-cl').addEventListener('click', () => { run(false); bar.hidden = true; re.hidden = false; re.focus(); });
  re.addEventListener('click', () => { run(true); bar.hidden = false; re.hidden = true; open.focus(); });
  tabs.forEach((b) => b.addEventListener('click', () => {
    tabs.forEach((x) => (x === b ? x.setAttribute('aria-current', 'page') : x.removeAttribute('aria-current')));
    el.querySelector('.x-ttl').textContent = b.textContent; // 只换内容区，播放条和进度不动
  }));
  run(true);
}

function land(el) {
  const sc = el.querySelector('.x-sc'), ui = el.querySelector('.x-ui'), now = el.querySelector('.x-now'), tg = el.querySelector('.x-tg');
  const LEN = 2700;
  let s = 760, on = true, hide = 0, tap = 0, last = { at: 0, side: null };
  const paint = () => {
    sc.style.setProperty('--p', s / LEN);
    now.textContent = mmss(s);
    toggle(tg, on);
  };
  const show = () => {
    sc.classList.remove('x-off');
    clearTimeout(hide);
    hide = setTimeout(() => { if (on && !ui.matches(':focus-within')) sc.classList.add('x-off'); }, 3000); // 暂停或焦点在控件上时不藏
  };
  const seek = (d, ripple) => {
    s = Math.max(0, Math.min(LEN, s + d));
    paint();
    if (!ripple) return;
    const r = el.querySelector(d < 0 ? '.x-l' : '.x-r');
    sc.classList.add('x-seek2');
    r.classList.add('on');
    setTimeout(() => { r.classList.remove('on'); sc.classList.remove('x-seek2'); }, 600);
  };
  sc.addEventListener('pointerup', (e) => {
    if (e.target.closest('button')) return;
    const r = sc.getBoundingClientRect(), x = (e.clientX - r.left) / r.width;
    const side = x < 1 / 3 ? -10 : x > 2 / 3 ? 10 : 0;
    clearTimeout(tap);
    if (e.timeStamp - last.at < 300 && side === last.side) {
      last.at = 0;
      if (side) seek(side, true);
      else { on = !on; paint(); }
      return show();
    }
    last = { at: e.timeStamp, side };
    tap = setTimeout(() => (sc.classList.contains('x-off') ? show() : sc.classList.add('x-off')), 300); // 单击切换控件显隐
  });
  el.querySelectorAll('[data-d]').forEach((b) => b.addEventListener('click', () => { seek(+b.dataset.d); show(); }));
  tg.addEventListener('click', () => { on = !on; paint(); show(); });
  sc.addEventListener('keydown', (e) => {
    const d = { ArrowLeft: -10, ArrowRight: 10 }[e.key];
    if (d) { e.preventDefault(); seek(d, e.target === sc); }
    show();
  });
  sc.addEventListener('focusin', show);
  every(sc, 1000, () => { if (on) { s = Math.min(LEN, s + 1); paint(); } });
  paint();
  show();
}

const CH = [['河流怎样塑造城市', 1100, 1100], ['港口与航线', 1325, 530], ['铁路改变了什么', 1188, 0], ['城墙去哪了', 1046, 0], ['新城和旧城', 1262, 0]];
function book(el) {
  const rows = [...el.querySelectorAll('.x-row')], list = el.querySelector('.x-ch'), spd = el.querySelector('.x-spd'), tmr = el.querySelector('.x-tmr'), tg = el.querySelector('.x-tg'), say = el.querySelector('.x-sr');
  const pos = CH.map((c) => c[2]), SPD = [1, 1.25, 1.5, 2, 0.75], TMR = ['定时', '本章结束', '15 分钟', '30 分钟'];
  let cur = 1, on = true, si = 1, ti = 0;
  const paint = () => {
    rows.forEach((r, i) => {
      const q = pos[i] / CH[i][1];
      r.setAttribute('aria-current', String(i === cur));
      r.querySelector('.x-st').textContent = q >= 1 ? '已听完' : q > 0 ? `已听 ${Math.floor(q * 100)}%` : '未听';
      r.style.setProperty('--q', q);
      r.classList.toggle('x-part', q > 0 && q < 1);
    });
    spd.textContent = SPD[si] + '×';
    spd.setAttribute('aria-label', `倍速 ${SPD[si]} 倍`);
    tmr.textContent = TMR[ti];
    tmr.setAttribute('aria-label', `定时关闭：${ti ? TMR[ti] : '未开'}`);
    toggle(tg, on);
  };
  const reveal = () => {
    const li = rows[cur].parentElement;
    if (li.offsetTop < list.scrollTop) list.scrollTop = li.offsetTop;
    else if (li.offsetTop + li.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = li.offsetTop + li.offsetHeight - list.clientHeight;
  };
  const go = (i) => {
    cur = i;
    if (pos[i] >= CH[i][1]) pos[i] = 0; // 听完的从头，没听完的从断点接着
    on = true;
    reveal();
    paint();
    say.textContent = `第 ${i + 1} 讲，从 ${mmss(pos[i])} 接着播`;
  };
  rows.forEach((r, i) => r.addEventListener('click', () => go(i)));
  spd.addEventListener('click', () => { si = (si + 1) % SPD.length; paint(); });
  tmr.addEventListener('click', () => { ti = (ti + 1) % TMR.length; paint(); });
  tg.addEventListener('click', () => { on = !on; paint(); });
  every(list, 250, () => {
    if (!on) return;
    pos[cur] = Math.min(CH[cur][1], pos[cur] + 5 * SPD[si]); // 示例加速：每 0.25 秒走 5 秒
    if (pos[cur] >= CH[cur][1]) {
      if (TMR[ti] !== '本章结束' && cur < CH.length - 1) return go(cur + 1);
      on = false;
      ti = 0;
      say.textContent = '本章播完，已停止';
    }
    paint();
  });
  paint();
}

function pip(el) {
  const sc = el.querySelector('.x-sc'), win = el.querySelector('.x-pip'), back = el.querySelector('.x-back'), vp = el.querySelector('.x-vp'), cm = el.querySelector('.x-cm'), tg = el.querySelector('.x-pc .x-tg'), go = el.querySelector('.x-go'), lk = el.querySelector('.x-lk');
  const caps = [...el.querySelectorAll('.x-cap')];
  let s = 222, on = true, corner = 'x-br', drag = null, moved = false;
  const paint = () => {
    caps.forEach((c) => (c.textContent = mmss(s)));
    toggle(tg, on);
  };
  const place = (c) => {
    win.classList.replace(corner, c);
    corner = c;
    win.style.left = win.style.top = '';
  };
  const page = (video) => { // 回到原页面或离开，都从刚才的时间接着播
    on = true;
    paint();
    vp.hidden = !video;
    cm.hidden = video;
    win.hidden = video;
    (video ? go : lk).focus();
  };
  back.addEventListener('pointerdown', (e) => {
    drag = { x: e.clientX, y: e.clientY, l: win.offsetLeft, t: win.offsetTop };
    moved = false;
    back.setPointerCapture(e.pointerId);
  });
  back.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!moved && Math.hypot(dx, dy) < 6) return; // 超过 6px 才算拖动
    moved = true;
    win.classList.add('x-drag');
    win.style.left = Math.max(0, Math.min(sc.clientWidth - win.offsetWidth, drag.l + dx)) + 'px';
    win.style.top = Math.max(0, Math.min(sc.clientHeight - win.offsetHeight, drag.t + dy)) + 'px';
  });
  const drop = () => {
    if (!drag) return;
    drag = null;
    if (!moved) return;
    win.classList.remove('x-drag');
    const y = win.offsetTop + win.offsetHeight / 2 < sc.clientHeight / 2 ? 't' : 'b';
    const x = win.offsetLeft + win.offsetWidth / 2 < sc.clientWidth / 2 ? 'l' : 'r';
    place(`x-${y}${x}`); // 按中心点吸到最近的角
  };
  back.addEventListener('pointerup', drop);
  back.addEventListener('pointercancel', drop);
  back.addEventListener('click', () => { if (moved) moved = false; else page(true); });
  back.addEventListener('keydown', (e) => {
    const k = { ArrowUp: [0, 't'], ArrowDown: [0, 'b'], ArrowLeft: [1, 'l'], ArrowRight: [1, 'r'] }[e.key];
    if (!k) return;
    e.preventDefault();
    const c = corner.slice(2).split('');
    c[k[0]] = k[1];
    place(`x-${c.join('')}`);
  });
  tg.addEventListener('click', () => { on = !on; paint(); });
  el.querySelector('.x-pc .x-cl').addEventListener('click', () => { on = false; paint(); win.hidden = true; lk.focus(); });
  lk.addEventListener('click', () => page(true));
  go.addEventListener('click', () => page(false));
  every(sc, 1000, () => { if (on) { s++; paint(); } });
  paint();
}

export default function demo(root) {
  pick(
    root,
    [
      {
        name: '语音条',
        fit: '聊天语音：同一时间一条，播完接着播下一条',
        html: `<div class="x-sc x-chat">${bubble(3, 1)}${bubble(12, 0)}${bubble(6, 1, true)}${bubble(27, 0)}</div>`,
        init: voice,
      },
      {
        name: '内嵌视频',
        fit: '详情页视频：原地播，只在 Wi-Fi 下静音自动播',
        html: `<div class="x-sc x-det"><div class="x-vd x-pic"><button type="button" class="x-pl"><span>${ic('play')}</span></button><button type="button" class="x-mu" hidden>${ic('mute')}点按开声音</button><span class="x-cap"></span><i class="x-pr" aria-hidden="true"></i></div><div class="x-tx"><b>折叠露营椅开箱</b><small>1.2 万次播放</small><div class="x-net" role="group" aria-label="模拟当前网络"><button type="button" aria-pressed="true">Wi-Fi</button><button type="button" aria-pressed="false">流量</button></div></div></div>`,
        init: inline,
      },
      {
        name: '迷你播放条',
        fit: '边听边逛：切页面不中断，点条身回播放页',
        html: `<div class="x-sc x-app"><div class="x-page"><b class="x-ttl">发现</b><i class="x-ln"></i><i class="x-ln"></i><div class="x-tiles" aria-hidden="true"><i></i><i></i><i></i></div><button type="button" class="x-re" hidden>继续收听</button></div><div class="x-mini"><button type="button" class="x-open" aria-label="打开播放页：第 3 集 河流与城市"><i class="x-cv"></i><span><b>第 3 集 · 河流与城市</b><small>城市地理 30 讲</small></span></button><button type="button" class="x-ib x-tg"></button><button type="button" class="x-ib x-cl" aria-label="关闭播放条">${ic('close')}</button></div><nav class="x-tabs" aria-label="底部标签栏">${['首页', '发现', '书架', '我的'].map((n) => `<button type="button"${n === '发现' ? ' aria-current="page"' : ''}>${n}</button>`).join('')}</nav><div class="x-full" role="dialog" aria-label="正在播放" hidden><button type="button" class="x-ib x-down" aria-label="收起到播放条">${ic('down')}</button><i class="x-cv"></i><div class="x-info"><b>第 3 集 · 河流与城市</b><small>城市地理 30 讲</small><div class="x-seek"><span class="x-tm x-now"></span><i class="x-track"></i><span class="x-tm">18:20</span></div><button type="button" class="x-ib x-tg x-big"></button></div></div></div>`,
        init: mini,
      },
      {
        name: '横屏全屏',
        fit: '长视频：双击两侧进退 10 秒，3 秒不动藏控件',
        html: `<div class="x-sc x-land x-snow" tabindex="0" aria-label="横屏播放画面：双击左右两侧或按左右方向键快退、快进 10 秒"><div class="x-ui"><div class="x-top"><b>第 2 集 · 雪线以上</b></div><div class="x-mid"><button type="button" data-d="-10" aria-label="快退 10 秒">−10</button><button type="button" class="x-tg"></button><button type="button" data-d="10" aria-label="快进 10 秒">+10</button></div><div class="x-bot"><span class="x-tm x-now"></span><i class="x-track"></i><span class="x-tm">45:00</span></div></div><span class="x-rip x-l" aria-hidden="true">−10 秒</span><span class="x-rip x-r" aria-hidden="true">+10 秒</span></div>`,
        init: land,
      },
      {
        name: '章节音频',
        fit: '课程和有声书：每章记断点，倍速和定时关闭',
        html: `<div class="x-sc x-book"><div class="x-hd"><i class="x-cv" aria-hidden="true"></i><b>城市地理 30 讲</b><button type="button" class="x-pill x-spd"></button><button type="button" class="x-pill x-tmr"></button><button type="button" class="x-ib x-tg"></button></div><ol class="x-ch">${CH.map((c, i) => `<li><button type="button" class="x-row"><span class="x-no">${String(i + 1).padStart(2, '0')}</span><span class="x-nm">${c[0]}</span><span class="x-du x-tm">${mmss(c[1])}</span><span class="x-st"></span><i aria-hidden="true"></i></button></li>`).join('')}</ol><p class="x-sr" role="status"></p></div>`,
        init: book,
      },
      {
        name: '小窗',
        fit: '离开页面接着看：拖到四角吸附，点回原页',
        html: `<div class="x-sc x-pipw"><div class="x-vp x-det" hidden><div class="x-vd x-pic"><span class="x-cap"></span></div><div class="x-tx"><b>手冲咖啡入门 · 第 1 课</b><button type="button" class="x-go">看评论</button></div></div><div class="x-cm"><div class="x-h"><b>评论 128</b><button type="button" class="x-lk">回到视频</button></div><p><em>青柠：</em>水温 92 度刚好</p><p><em>老周：</em>滤纸要先用热水润一下吗</p><p><em>麦冬：</em>周末就照着冲一杯</p></div><div class="x-pip x-pic x-br"><button type="button" class="x-back" aria-label="小窗播放中，点按回到视频页；方向键换到别的角"></button><span class="x-cap"></span><div class="x-pc"><button type="button" class="x-ib x-tg"></button><button type="button" class="x-ib x-cl" aria-label="关闭小窗">${ic('close')}</button></div></div></div>`,
        init: pip,
      },
    ],
    '播放器形态',
  );
}
</script>
