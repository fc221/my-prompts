---
zh: 流动渐变背景
en: Flowing gradient
aka: 网格渐变 流动渐变 渐变流动 动态渐变 mesh gradient
order: 12
of: aurora
tab: 流动渐变
---

## 是什么

几团大色块在画面里缓慢游走，彼此融成一片连续的渐变，看不出边界和形状；颜色比极光更饱满，铺满整个区块。

## 适合

支付、金融、AI 工具的首屏，以及想用一整块品牌色铺满气氛的发布页、登录页。

## 不适合

要淡淡的、留白多的光晕用「极光渐变背景」；色块要有清楚的轮廓用「流体形状背景」；数据页和表单页保持背景安静。

## 注意

模糊会把容器外的透明像素一起揉进来：装色团的容器要比画面四周各大 20%，外层 overflow: hidden 裁掉，否则四边会出现一圈发暗的边。

## 要点

- 色团 3–5 个，每个是一个径向渐变（中心实色、边缘透明），直径约为画面宽度的 50–70%；颜色取相邻的 2–3 个色相（如蓝、紫、品红），底色用其中最深的一档。
- 每个色团的横向和纵向位移拆到内外两层，各用一条 ease-in-out、alternate 的动画，周期 12–30 秒，两层不同、各色团也不同，再用负的 animation-delay 错开，合起来是一条不重复的曲线。
- 只动 transform，模糊半径保持固定；background-position 做动画每帧都要重绘整块。
- 色团放进 filter: blur(60–100px) 的容器；色团数量和模糊半径决定开销，手机上减到 3 个、模糊 60px。
- 上面叠一层很淡的噪点（不透明度 0.05–0.1，做法同「噪点颗粒质地」），打散大面积渐变里的色带。
- 文字下面加 20–40% 的深色遮罩，按最亮的那团颜色核对：正文对比度 ≥ 4.5:1，大标题 ≥ 3:1。
- 离开视口时暂停，给一个暂停按钮；减少动态效果时停在一帧好看的构图上，所以不带动画时的初始位置就要排好。

## 提示词

给{首屏区块}做「流动渐变背景」：底色用{品牌色}最深的一档，放 4 个径向渐变色团（中心实色、边缘透明，直径约为画面宽度的 60%），颜色取{品牌色}和它相邻的 1–2 个色相；色团放进一个 filter: blur(80px)、比区块四周各大 20% 的容器，区块 overflow: hidden；每个色团横向、纵向各一层 transform 动画（ease-in-out、alternate，周期 12–30 秒、各不相同，用负的 animation-delay 错开），模糊半径固定，不动画 background-position；上面叠一层不透明度 0.08 的噪点防色带，{标题和正文}下加 30% 深色遮罩，按最亮的色团核对对比度；手机上减到 3 个色团、模糊 60px；离开视口时暂停，提供暂停按钮；减少动态效果时停在初始构图。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;place-content:center;justify-items:center;gap:4px;padding:16px;background:#1d1257;color:#fff;text-align:center}
.fl{position:absolute;inset:-20%;filter:blur(28px)}
.fl i{position:absolute;left:var(--x);top:var(--y);width:var(--s);aspect-ratio:1;animation:fx var(--a) ease-in-out var(--d) infinite alternate}
.fl i::before{content:"";position:absolute;inset:0;border-radius:50%;background:radial-gradient(closest-side,var(--c) 35%,transparent);animation:fy var(--b) ease-in-out var(--d) infinite alternate}
@keyframes fx{from{transform:translateX(-24%)}
to{transform:translateX(24%)}
}
@keyframes fy{from{transform:translateY(-22%)}
to{transform:translateY(22%)}
}
.b1{--x:-6%;--y:4%;--s:54%;--c:#3d5afe;--a:23s;--b:17s;--d:-7s}
.b2{--x:42%;--y:-12%;--s:50%;--c:#8f3dff;--a:29s;--b:13s;--d:-12s}
.b3{--x:20%;--y:36%;--s:56%;--c:#ff3db4;--a:19s;--b:26s;--d:-4s}
.b4{--x:58%;--y:38%;--s:46%;--c:#6a4bff;--a:15s;--b:21s;--d:-10s}
.paused .fl i,.paused .fl i::before,.off .fl i,.off .fl i::before{animation-play-state:paused}
.st::after{content:"";position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.12'/%3E%3C/svg%3E") rgba(18,8,52,.3);pointer-events:none}
.tx{position:relative;z-index:1;display:grid;gap:4px}
.tx small{color:#f4eeff;font-size:12px}
.tx b{font-size:20px;line-height:1.3}
.tx p{margin:0;color:#f4eeff}
.pz.ctl{position:absolute;z-index:1;right:8px;bottom:8px;height:28px;padding:0 12px;border-color:rgba(255,255,255,.35);background:rgba(18,8,52,.55);color:#fff;font-size:12px}
.pz.ctl:hover{background:rgba(18,8,52,.8)}
@container (min-height:260px){.fl{filter:blur(56px)}
.tx{gap:8px}
.tx small{font-size:13px}
.tx b{font-size:32px}
.tx p{font-size:14px}
.pz.ctl{right:12px;bottom:12px}
}
@media (prefers-reduced-motion:reduce){.fl i,.fl i::before{animation:none}
.pz{display:none}
}
</style>

<div class="st"><div class="fl" aria-hidden="true"><i class="b1"></i><i class="b2"></i><i class="b3"></i><i class="b4"></i></div><div class="tx"><small>MyPrompts 团队版</small><b>让提示词在团队里流动起来</b><p>共享、复用，每次修改都能追溯</p></div><button type="button" class="ctl pz">暂停</button></div>

<script type="module">
export default function demo(root) {
  const st = root.querySelector('.st'), pz = root.querySelector('.pz');
  pz.addEventListener('click', () => { const on = st.classList.toggle('paused'); pz.textContent = on ? '继续' : '暂停'; });
  const io = new IntersectionObserver(([e]) => { if (!root.host.isConnected) return io.disconnect(); st.classList.toggle('off', !e.isIntersecting); }); // 离开视口时暂停
  io.observe(st);
}
</script>
