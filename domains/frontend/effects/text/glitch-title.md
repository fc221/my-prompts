---
zh: 信号故障标题
en: Glitch title
aka: 故障风标题 故障文字 赛博标题 RGB错位 色散抖动
order: 120
---

## 是什么

标题像信号不稳一样错开一下：字身被横向撕开几条，红青两色副本一左一右偏移，抖 0.4 秒左右就归位，之后稳稳停着。

## 适合

游戏、音乐节、赛博风活动页、发布会页面的主标题，错误页和 404 的大标题；一页一处。

## 不适合

正文、按钮、导航这类要持续阅读的文字；想要字符一位位定格用「文字乱码解码」；想要安静的入场用「由虚到实的标题」。

## 注意

故障是一个短事件：单次 300–500ms，只在进入或悬停时发生，静止时和普通标题完全一样。循环播放会累眼，也可能引起光敏不适；抖动只发生在字形上，背景和周围元素保持不动。

## 要点

- 原文上叠三份 aria-hidden 的绝对定位副本：一份原色切片、一份红、一份青。红青用 mix-blend-mode: screen，浅色背景换 multiply。布局和读屏都只认原文。
- 切片：副本用 clip-path: inset() 露出一条横带并水平错开 8–13px，原文用 polygon 挖掉同一条带，字才是真的断开。
- 色偏 3–7px，一帧比一帧小；时间轴 5–6 帧，用 steps(1) 硬切，末帧回到 none，总长约 440ms。
- 触发：进入视口一次，悬停、键盘聚焦、触屏点击各播一次；两次之间至少隔 1.5 秒，指针来回划过也只闪一次。
- 字重 700 以上、字号 28px 以上才撕得出来，细字和小字错开后只剩模糊。
- 标题多行时副本和原文同宽（inset: 0），换行才一致。
- 减少动态效果时去掉副本，标题静止显示。

## 提示词

给{主标题}做「信号故障标题」：原文上叠三份 aria-hidden 的绝对定位副本（标题色切片、红 #ff3b6b、青 #22e4ff），红青用 mix-blend-mode: screen（浅色背景改 multiply），静止时透明；触发后播一次约 440ms、steps(1) 硬切的动画，共 5–6 帧：切片副本每帧用 clip-path: inset() 换一条横带并水平错开 8–13px，原文用 polygon 挖掉同一条带并偏移 1–4px，红青副本左右偏移 3–7px，幅度逐帧收小，末帧全部归位；进入视口时播一次，悬停、键盘聚焦、触屏点击时再播，两次至少隔 1.5 秒；背景不动，不循环；减少动态效果时去掉副本，标题静止。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:flex;flex-direction:column;justify-content:center;gap:8px;padding:12px 18px;background:#0e1016;color:#f3f4f8}
.hd{display:flex;align-items:center;justify-content:space-between;gap:8px}
.kick{min-width:0;color:#98a1b6;font-size:12px;white-space:nowrap}
.re.ctl{flex:none;height:28px;padding:0 10px;font-size:12px}
h3{margin:0;font-size:32px;line-height:1.2;font-weight:800}
.g{position:relative;display:inline-block;border-radius:4px;color:inherit;text-decoration:none}
.g:focus-visible{outline-color:#7dd3fc;outline-offset:4px}
.m{display:inline-block}
.g i{position:absolute;inset:0;font-style:normal;opacity:0;pointer-events:none;white-space:nowrap}
.g .r{color:#ff3b6b;mix-blend-mode:screen}
.g .c{color:#22e4ff;mix-blend-mode:screen}
.g.on .m{animation:g-m .44s steps(1) both}
.g.on .w{animation:g-w .44s steps(1) both}
.g.on .r{animation:g-r .44s steps(1) both}
.g.on .c{animation:g-c .44s steps(1) both}
@keyframes g-m{0%{transform:translate(-3px,0);clip-path:polygon(0 0,100% 0,100% 34%,0 34%,0 58%,100% 58%,100% 100%,0 100%)}
22%{transform:translate(4px,-1px);clip-path:polygon(0 0,100% 0,100% 62%,0 62%,0 84%,100% 84%,100% 100%,0 100%)}
44%{transform:translate(-2px,1px) skewX(-7deg);clip-path:none}
64%{transform:translate(2px,0);clip-path:polygon(0 0,100% 0,100% 18%,0 18%,0 38%,100% 38%,100% 100%,0 100%)}
82%{transform:translate(-1px,0);clip-path:none}
100%{transform:none;clip-path:none}
}
@keyframes g-w{0%{opacity:1;transform:translateX(11px);clip-path:inset(34% 0 42% 0)}
22%{opacity:1;transform:translateX(-13px);clip-path:inset(62% 0 16% 0)}
44%{opacity:0}
64%{opacity:1;transform:translateX(8px);clip-path:inset(18% 0 62% 0)}
82%,100%{opacity:0}
}
@keyframes g-r{0%{opacity:1;transform:translate(-6px,1px);clip-path:inset(0 0 48% 0)}
22%{opacity:1;transform:translate(7px,0);clip-path:inset(46% 0 0 0)}
44%{opacity:1;transform:translate(-5px,-1px);clip-path:none}
64%{opacity:1;transform:translate(3px,1px);clip-path:inset(22% 0 30% 0)}
82%{opacity:1;transform:translate(-2px,0);clip-path:none}
100%{opacity:0;transform:none;clip-path:none}
}
@keyframes g-c{0%{opacity:1;transform:translate(6px,-1px);clip-path:inset(52% 0 0 0)}
22%{opacity:1;transform:translate(-7px,1px);clip-path:inset(0 0 54% 0)}
44%{opacity:1;transform:translate(5px,1px);clip-path:none}
64%{opacity:1;transform:translate(-3px,0);clip-path:inset(60% 0 8% 0)}
82%{opacity:1;transform:translate(2px,0);clip-path:none}
100%{opacity:0;transform:none;clip-path:none}
}
.fs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin:4px 0 0;padding:0;color:#98a1b6;font-size:11px;line-height:14px;list-style:none;text-align:center}
.fx{position:relative;display:grid;place-items:center;height:36px;margin-bottom:3px;border-radius:6px;background:#1a1d28;color:#f3f4f8;font-size:18px;font-weight:800;overflow:hidden}
.fx b{grid-area:1/1;font-weight:inherit}
.fx .r{color:#ff3b6b;mix-blend-mode:screen}
.fx .c{color:#22e4ff;mix-blend-mode:screen}
@container (min-height:260px){.st{gap:14px;padding:20px 32px}
.kick{font-size:13px}
h3{font-size:58px}
.fx{height:56px;font-size:28px}
.fs{gap:10px;font-size:12px}
}
@media (prefers-reduced-motion:reduce){.g i{display:none}
.g.on .m{animation:none}
}
</style>

<div class="st"><div class="hd"><span class="kick">MyPrompts 直播 · 第 12 场</span><button type="button" class="ctl re">重播</button></div><h3><a class="g" href="#"><span class="m">信号重新接通</span></a></h3><ul class="fs" aria-hidden="true"><li><span class="fx"><b style="transform:translateX(-3px) skewX(-9deg)">信号</b></span>错位</li><li><span class="fx"><b class="r" style="transform:translateX(-3px)">信号</b><b class="c" style="transform:translateX(3px)">信号</b></span>色偏</li><li><span class="fx"><b style="clip-path:polygon(0 0,100% 0,100% 42%,0 42%,0 62%,100% 62%,100% 100%,0 100%)">信号</b><b style="clip-path:inset(42% 0 38% 0);transform:translateX(5px)">信号</b></span>切片</li><li><span class="fx"><b>信号</b></span>归位</li></ul></div>

<script type="module">
export default function demo(root) {
  const g = root.querySelector('.g'), m = g.querySelector('.m');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // 三份副本只在播放时出现，读屏和布局都只认原文
  for (const k of ['w', 'r', 'c']) { const i = document.createElement('i'); i.className = k; i.textContent = m.textContent; i.setAttribute('aria-hidden', 'true'); g.append(i); }
  let free = 0; // 下一次允许自动触发的时间，悬停来回划过也不连闪
  const play = (force) => {
    const now = performance.now();
    if (still || (!force && now < free)) return;
    free = now + 1600;
    g.classList.remove('on'); void g.offsetWidth; g.classList.add('on');
  };
  g.addEventListener('animationend', (e) => { if (e.target === m) g.classList.remove('on'); });
  g.addEventListener('pointerenter', () => play());
  g.addEventListener('focus', () => play());
  g.addEventListener('click', (e) => { e.preventDefault(); play(); });
  root.querySelector('.re').addEventListener('click', () => play(true));
  setTimeout(() => play(true), 200);
}
</script>
