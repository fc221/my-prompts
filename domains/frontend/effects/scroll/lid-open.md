---
zh: 滚动掀开屏幕
en: Scroll-opened lid
order: 100
---

## 是什么

首屏放一台合着的设备，往下滚动时屏幕绕着底边的转轴慢慢掀开，屏幕里的界面贴在屏幕上一起转；完全打开后页面才继续往下走。

## 适合

笔记本、折叠屏、翻盖硬件、礼盒开箱这类“打开”本身就是卖点的产品首屏，全页只放这一个主动效。

## 不适合

纯软件产品没有可以“打开”的实物，用「首屏不对称 / 满版图」放界面截图；手里只有一张正面产品照、拆不出机身和屏幕两层时做不出转轴，改用「图片滚动揭幕」或「滚动钉住叙事」。

## 注意

开合角度只由滚动位置算出来，不要给 transform 加 transition，否则画面会追着滚动跑、往回滚时跳一下；转的只有屏幕，机身保持不动。

## 要点

- 结构：外层区块高 2.5–3 个视口，里面的舞台 position: sticky 钉住；进度 = 区块内已滚距离 ÷（区块高 − 视口高），夹在 0–1，往回滚按同一条路径合上。
- 分段映射，每段用 smoothstep 缓动：标题在 0–0.3 淡出上移，屏幕在 0.1–0.8 从贴合（约 -88°）转到略微后仰（10–15°），屏幕内容 0.55 之后亮起，参数文字最后 0.15 出现。
- 素材：机身和屏幕各一张透明图（或 3D 模型里屏幕是独立部件），屏幕内容单独一张贴图；只有一张合成图时，改用预渲染的 30–60 帧图片序列按进度换帧。
- 只是“掀开”这一个动作，CSS 3D 两层或图片序列就够；要转动视角、看侧面厚度和金属反光时才用 WebGL 加载模型（压缩后 2–3MB 以内，先显示静态海报图）。
- 窄于 768px、低端设备、开启减少动态效果或模型加载失败时不钉住，直接显示打开状态的定格图和全部文字。
- 标题、参数用 HTML 文字，不画进图里；设备画面对读屏隐藏，配一句替代说明；导航和购买按钮全程可点，钉住区下面紧接普通内容。

## 提示词

把{产品}首屏做成「滚动掀开屏幕」：外层区块高约 2.5–3 个视口，里面的舞台 position: sticky 钉住；舞台中央放合着的{设备}，机身和屏幕分成两层，屏幕以底边中点为转轴，用 CSS 3D rotateX 从贴合（约 -88°）转到略微后仰（约 12°），机身不转，只随进度略微抬高视角；进度 = 区块内已滚距离 ÷（区块高 − 视口高），夹在 0–1，按区段映射并用 smoothstep 缓动：标题“{价值主张}”在 0–0.3 淡出上移，屏幕在 0.1–0.8 打开，{界面截图}贴在屏幕层上、0.55 之后亮起，参数文字在最后 0.15 淡入；每帧用 requestAnimationFrame 按进度直接设置 transform，不加 transition，往回滚按原路合上；进度走完放开钉住，下面接普通内容；窄于 768px、减少动态效果或素材加载失败时不钉住，直接显示打开状态的定格图和全部文字；标题和参数用 HTML 文字，设备画面对读屏隐藏并配一句替代说明。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{background:linear-gradient(180deg,#f4f2ef,#e6e7ee)}
.page{position:relative;height:100%;overflow:auto;scrollbar-width:none}
.page::-webkit-scrollbar{display:none}
.page:focus-visible{outline-offset:-3px}
.pin{position:relative;height:280cqh}
.stage{position:sticky;top:0;height:100cqh;overflow:hidden;--w:150px;--h:94px;--d:92px}
.copy{position:absolute;left:16px;top:14px;right:110px;display:grid;gap:2px}
.copy small{color:#7a6f63;font-size:11px;letter-spacing:.04em}
.copy b{font-size:16px;line-height:1.3;color:#1d1b19}
.hint{color:#8a8f98;font-size:11px}
.scene{position:absolute;inset:0;perspective:620px;perspective-origin:50% 30%}
.lap{position:absolute;left:50%;top:54%;width:var(--w);height:0;margin-left:calc(var(--w) / -2);transform-style:preserve-3d;transform-origin:50% 0 calc(var(--d) / 2)}
.base{position:absolute;left:0;top:0;width:100%;height:var(--d);border-radius:3px 3px 7px 7px;background:linear-gradient(180deg,#cfd3da,#e3e6eb);transform-origin:50% 0;transform:rotateX(90deg);transform-style:preserve-3d}
.base::after{content:"";position:absolute;left:0;top:100%;width:100%;height:5px;border-radius:0 0 6px 6px;background:linear-gradient(180deg,#aab0ba,#8d939e);transform-origin:50% 0;transform:rotateX(-90deg)}
.kb{position:absolute;left:8%;right:8%;top:9%;height:44%;border-radius:3px;background:repeating-linear-gradient(90deg,#3a3f48 0 7.4%,transparent 7.4% 8.4%),#b9bec7;-webkit-mask:repeating-linear-gradient(180deg,#000 0 15%,transparent 15% 20%);mask:repeating-linear-gradient(180deg,#000 0 15%,transparent 15% 20%)}
.pad{position:absolute;left:34%;right:34%;top:60%;height:30%;border-radius:4px;background:#d6d9df;box-shadow:inset 0 0 0 1px #bfc4cc}
.lid{position:absolute;left:0;bottom:1.5px;width:100%;height:var(--h);transform-origin:50% 100%;transform-style:preserve-3d;transform:rotateX(-88deg)}
.lid::after{content:"";position:absolute;left:1px;right:1px;bottom:100%;height:3px;border-radius:3px 3px 0 0;background:#a3a9b3;transform-origin:50% 100%;transform:rotateX(90deg)}
.scr,.shell{position:absolute;inset:0;border-radius:7px 7px 3px 3px;backface-visibility:hidden}
.scr{padding:4px;background:#0d0f14}
.shell{background:radial-gradient(circle at 50% 46%,#e9ecf0 0 5%,transparent 5.5%),linear-gradient(160deg,#dfe2e7,#bcc1c9);transform:rotateY(180deg) translateZ(3px)}
.disp{position:relative;height:100%;border-radius:3px;overflow:hidden;background:linear-gradient(135deg,#1c2433,#0f141c)}
.ui{position:absolute;inset:0;display:grid;grid-template-columns:22% 1fr;gap:5%;padding:7% 6%;background:linear-gradient(135deg,#fdf6ec,#e9eefc);opacity:0}
.ui i{display:block;border-radius:3px}
.side{background:linear-gradient(180deg,#2f3b52 0 14%,transparent 14% 24%,#c9d3e6 24% 32%,transparent 32% 40%,#c9d3e6 40% 48%,transparent 48%)}
.main{display:grid;grid-template-rows:20% 1fr;gap:8%}
.main .t{background:linear-gradient(90deg,#1f2937 0 46%,transparent 46%);transform:scaleY(.5);transform-origin:0 0}
.cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6%}
.cards i:nth-child(1){background:linear-gradient(160deg,#f59e7b,#f7c59f)}
.cards i:nth-child(2){background:linear-gradient(160deg,#7aa2f7,#b4c8fb)}
.cards i:nth-child(3){background:linear-gradient(160deg,#6cc8a6,#b6e6d2)}
.glare{position:absolute;inset:0;background:linear-gradient(115deg,rgba(255,255,255,.18),transparent 40%)}
.shadow{position:absolute;left:50%;top:54%;width:calc(var(--w) * 1.25);height:calc(var(--d) * .5);margin-left:calc(var(--w) * -.625);border-radius:50%;background:radial-gradient(closest-side,rgba(30,34,45,.22),transparent);pointer-events:none}
.cap{position:absolute;left:16px;right:16px;bottom:12px;margin:0;color:#3b3f46;font-size:12px;text-align:center;opacity:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cap b{color:#1d1b19}
.bar{position:absolute;left:16px;right:16px;bottom:5px;height:2px;border-radius:1px;background:rgba(29,27,25,.08);overflow:hidden;pointer-events:none}
.bar i{display:block;height:100%;background:#1d1b19;transform-origin:left;transform:scaleX(0)}
.next{display:grid;place-items:center;height:70cqh;margin:0;color:#5b616e;background:#fff}
.play{position:absolute;right:12px;top:12px;height:28px;padding:0 10px;font-size:12px}
.static .pin{height:auto}
.static .stage{position:relative}
.static .copy{right:48%}
.static .hint,.static .play,.static .bar{display:none}
.static .scene{transform:translate(22%,-4%) scale(.74)}
.static .cap{right:52%;opacity:1;text-align:left;white-space:normal}
@container (max-width:310px){.static .copy b{font-size:15px}
}
@container (min-height:260px){.stage{--w:236px;--h:148px;--d:140px}
.copy{left:28px;top:26px;gap:4px}
.copy b{font-size:22px}
.cap{bottom:18px;font-size:13px}
.play{right:20px;top:20px}
.static .copy{right:50%}
.static .scene{transform:translate(18%,2%) scale(.92)}
}
</style>

<div class="st"><div class="page" tabindex="0" aria-label="产品开屏演示，可上下滚动"><section class="pin"><div class="stage"><div class="copy"><small>MyPrompts Book 14</small><b>合上是一本书，<br>打开是一张工作台</b><span class="hint">向下滚动打开屏幕</span></div><div class="scene" aria-hidden="true"><i class="shadow"></i><div class="lap"><div class="base"><i class="kb"></i><i class="pad"></i></div><div class="lid"><div class="scr"><div class="disp"><div class="ui"><i class="side"></i><div class="main"><i class="t"></i><div class="cards"><i></i><i></i><i></i></div></div></div><i class="glare"></i></div></div><div class="shell"></div></div></div></div><p class="cap"><b>14 英寸 2.8K 屏</b> · 1.1&nbsp;kg · 18&nbsp;小时续航</p><span class="bar" aria-hidden="true"><i></i></span></div></section><p class="next">下一段：配置与价格</p></div><button type="button" class="ctl play">播放滚动</button><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const page = root.querySelector('.page'), pin = root.querySelector('.pin'), lap = root.querySelector('.lap'), lid = root.querySelector('.lid'), ui = root.querySelector('.ui'), copy = root.querySelector('.copy'), cap = root.querySelector('.cap'), shadow = root.querySelector('.shadow'), bar = root.querySelector('.bar i'), msg = root.querySelector('[role=status]'), play = root.querySelector('.play');
  const clamp = (x) => Math.min(1, Math.max(0, x)), lerp = (a, b, t) => a + (b - a) * t;
  const ss = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); }; // smoothstep：每个部件只在自己的进度区间里动
  let said = '', raf = 0;
  // 屏幕绕底边转轴：-88° 贴在机身上，14° 是打开后略微后仰；机身只换视角，不跟着转
  const render = (p) => {
    const o = ss(0.1, 0.8, p), fade = ss(0.02, 0.28, p);
    lid.style.transform = `rotateX(${lerp(-88, 14, o)}deg)`;
    lap.style.transform = `translateY(calc(var(--h) * ${lerp(0.04, 0.2, o)})) rotateX(${lerp(-40, -14, o)}deg)`;
    shadow.style.transform = `translateY(calc(var(--h) * ${lerp(0.1, 0.3, o)})) scale(${lerp(0.8, 1, o)})`;
    ui.style.opacity = ss(0.55, 0.85, p);
    copy.style.opacity = 1 - fade; copy.style.transform = `translateY(${-14 * fade}px)`;
    cap.style.opacity = ss(0.82, 0.98, p); bar.style.transform = `scaleX(${p})`;
    const s = p < 0.06 ? '' : p < 0.94 ? '正在打开屏幕' : '屏幕已打开：14 英寸 2.8K 屏，1.1 kg，18 小时续航';
    if (s !== said) { said = s; msg.textContent = s; }
  };
  const range = () => pin.offsetHeight - page.clientHeight;
  const progress = () => clamp((page.scrollTop - pin.offsetTop) / range());
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { root.querySelector('.st').classList.add('static'); render(1); copy.style.cssText = ''; return; }
  // 滚动位置就是唯一的状态来源：不给 transform 加 transition，每帧按进度直接算，往回滚自然按原路合上
  let queued = false;
  page.addEventListener('scroll', () => { if (queued) return; queued = true; requestAnimationFrame(() => { queued = false; render(progress()); }); }, { passive: true });
  // “播放滚动”只是替用户推进 scrollTop，效果仍然由滚动驱动；用户一动滚轮或按键就交还控制
  const stop = () => cancelAnimationFrame(raf);
  const run = () => {
    stop(); if (progress() > 0.98) page.scrollTop = 0;
    const from = page.scrollTop, to = pin.offsetTop + range(), t0 = performance.now(), dur = 2600 * (to - from) / range();
    const step = (t) => { if (!root.host.isConnected) return; const k = clamp((t - t0) / dur); page.scrollTop = from + (to - from) * (k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2); if (k < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
  };
  ['wheel', 'touchstart', 'keydown'].forEach((t) => page.addEventListener(t, stop, { passive: true }));
  play.addEventListener('click', run);
  render(0); setTimeout(() => root.host.isConnected && run(), 500);
}
</script>
