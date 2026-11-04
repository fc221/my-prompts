---
zh: 荧光笔划重点
en: Highlighter mark
aka: 荧光笔 划线强调 手绘下划线 高亮动画 highlight underline
order: 220
---

## 是什么

标题里的关键词进入视口时，像被荧光笔从左到右涂一遍，或画出一条手绘下划线；点出一句话里的重点。

## 适合

官网首屏和落地页的卖点句、价格页标题、文章导语里的结论：一句话里只有一两个词需要先被看到。

## 不适合

正文里成段的强调用加粗就够；搜索结果里的命中词要立刻标出，用不带动画的 mark；跟着滚动逐词变深的段落用「读到哪亮到哪」。

## 注意

涂色画在关键词自己的背景上，跟着文字排版走；在标题上另叠一块绝对定位的色块，标题一换行，色块就横跨两行之间的空白，或者只盖住第一行。

## 要点

- 涂色：关键词用 inline 的 span，背景写两个色标同色的 linear-gradient，no-repeat，位置贴左下（0 90%），background-size 从 0% 50% 过渡到 100% 50%；高度只占字的下半部分（35–55%），两头加 0.1em 左右的 padding，笔触略出字边
- 换行：加 box-decoration-break: clone 和 -webkit-box-decoration-break: clone，每一行各自带上两头的留白和圆角、各涂一笔；不加时换行处被切成直角，像一条被剪开的色带
- 下划线：SVG path 画一条略弯的线（从左往右缓缓抬高，末端稍上挑），线帽 round，path 设 pathLength="1"，stroke-dasharray: 1 2，stroke-dashoffset 从 1.02 画到 0（多让一点，开画前不露出线帽的小圆点）；SVG 绝对定位在词下方、宽度跟词走，preserveAspectRatio="none"，aria-hidden；带下划线的词 white-space: nowrap，线不会断成两截
- 节奏：IntersectionObserver 在标题露出 60% 时触发一次，触发后断开，离开视口不复原；每处 600–900ms，先快后慢；几处依次错开 150–200ms
- 颜色：荧光色半透明（不透明度 0.4–0.6），画在文字后面，涂完后字和底色的对比度仍 ≥ 4.5:1；深色背景上降低饱和度，文字保持浅色
- 克制：同一屏只强调 1–3 处，每处一个短词组（2–8 个字）；关键词用 strong 或普通 span，去掉涂色句子照样成立
- 减少动态效果时直接显示涂好的样子

## 提示词

给{标题}里的{关键词}加「荧光笔划重点」：关键词用 inline 的 span，背景是两个色标同为{荧光色}（不透明度 0.5）的 linear-gradient，no-repeat、贴左下，高度占字的 50%，background-size 从 0% 过渡到 100%，加 box-decoration-break: clone（含 -webkit- 前缀）让换行后每一行都涂到，两头留 0.1em；{第二个词}改用手绘下划线：一条略弯的 SVG path，pathLength="1"，stroke-dasharray 为 1 2，stroke-dashoffset 从 1.02 画到 0，线帽 round，SVG 用 preserveAspectRatio="none" 跟着词宽拉伸并设 aria-hidden，这个词不换行；标题露出 60% 时由 IntersectionObserver 触发一次，每处 700ms、先快后慢，依次错开 180ms，离开视口不复原；涂完后文字对比度仍 ≥ 4.5:1；同一屏最多强调 3 处；减少动态效果时直接显示涂好的样子。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{display:flex;flex-direction:column;justify-content:center;gap:8px;padding:16px 20px;background:#fbf9f3;color:#1d1f24}
.kk{margin:0;color:#6f6858;font-size:12px;letter-spacing:.04em}
.tt{margin:0;font-size:20px;line-height:1.5;font-weight:800;letter-spacing:.01em}
.ft{display:flex;align-items:center;gap:12px}
.sub{flex:1;min-width:0;margin:0;color:#57534b;font-size:13px}
.mk{padding:0 .1em;margin:0 -.04em;border-radius:.16em .3em .24em .14em;background:linear-gradient(rgba(255,200,40,.55),rgba(255,200,40,.55)) 0 90%/0% 50% no-repeat;-webkit-box-decoration-break:clone;box-decoration-break:clone;transition:background-size .7s cubic-bezier(.25,.7,.3,1)}
.on .mk{background-size:100% 50%}
.ul{position:relative;white-space:nowrap}
.ul svg{position:absolute;left:-.06em;bottom:-.34em;width:calc(100% + .12em);height:.44em;overflow:visible}
.ul path{fill:none;stroke:#e0533a;stroke-width:3;stroke-linecap:round;stroke-dasharray:1 2;stroke-dashoffset:1.02;transition:stroke-dashoffset .7s cubic-bezier(.25,.7,.3,1) .18s}
.on .ul path{stroke-dashoffset:0}
.rs .mk,.rs .ul path{transition:none}
@container (min-height:220px){.st{gap:12px;padding:28px 44px}
.kk{font-size:13px}
.tt{font-size:32px;line-height:1.45}
.sub{font-size:16px}
.ul path{stroke-width:3.5}
}
</style>

<div class="st"><p class="kk">MyPrompts 团队版</p><h3 class="tt">写过的好提示词，<span class="mk">下次一搜就有</span>，新同事也能<span class="ul">直接复用<svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M2 7.4C22 6.4 46 5.6 70 5.7c10 0 19-.9 28-3"/></svg></span></h3><div class="ft"><p class="sub">按场景整理，复制就能用。</p><button type="button" class="ctl">重播</button></div></div>

<script type="module">
export default function demo(root) {
  const tt = root.querySelector('.tt');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // 先去掉过渡退回未涂的样子，再加回过渡开涂；减少动态效果时一直不带过渡，直接显示涂好的
  const play = () => {
    tt.classList.add('rs');
    tt.classList.remove('on');
    void tt.offsetWidth;
    tt.classList.toggle('rs', still);
    tt.classList.add('on');
  };
  // 标题露出 60% 时只触发一次，之后离开视口也不复原
  const io = new IntersectionObserver((es) => {
    if (!es[0].isIntersecting) return;
    io.disconnect();
    play();
  }, { threshold: 0.6 });
  io.observe(tt);
  root.querySelector('.ctl').addEventListener('click', play);
}
</script>
