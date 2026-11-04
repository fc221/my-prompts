---
zh: 透视网格地平线
en: Retro perspective grid
aka: 复古网格 赛博网格 合成波 霓虹地平线 synthwave grid
order: 110
---

## 是什么

一片霓虹细线画的网格地面朝远处铺到地平线，并一格一格朝观众滚过来；地平线上方是渐变夜空和一轮被横缝切开的落日。复古未来、赛博、游戏和音乐类页面的常见背景。

## 适合

游戏、音乐、电竞和复古主题活动的首屏与预告页；404、倒计时、加载这类要一点气氛的整屏页面。

## 不适合

严肃的业务页面和后台，要纹理改用「点阵渐隐背景」；正文多的区块也不要压在滚动的网格上。

## 注意

网格只铺在地平线以下，标题和按钮放在天空区。滚动是“移动一个格距再跳回”的无缝循环，位移不累加。地平线附近线最密，不淡掉就会闪出摩尔纹。

## 要点

- 结构：舞台 overflow: hidden，地平线在高度 60% 左右，上面天空层、下面地面层；网格是地面层里一个很大的平面，transform: perspective(500px) rotateX(72deg)，从旋转中心往远处伸出约 4 倍 perspective、往近处伸出约一个地面高度，宽约舞台的 5 倍，滚动时四边都不露出来
- 对齐地平线：灭点在旋转中心上方 perspective × cot(角度) 处（500px、72° 约 162px），把旋转中心放在地平线下这个距离，网格才收拢到地平线和落日中心；perspective 约取地面高度的 1.5 倍
- 画线：横线、竖线各一组 linear-gradient，background-size 等于格距（40–64px），竖线用 background-position: 50% 0 左右对称；线芯 1–2px，两侧各 3px 低透明度的同色渐变当微光，不给大平面加 blur 或 drop-shadow
- 滚动：translateY 写在 rotateX 之后，才是沿着地面移动；关键帧只把它从 0 移到一个格距，linear、infinite，一格 0.8–1.5 秒；关键帧里 perspective 和 rotateX 照抄一遍，只写 translateY 的话旋转会被一起插值掉
- 远处：网格层加 mask-image: linear-gradient(transparent 10%, #000 70%)，把线淡到地平线；地面在地平线下方留一段偏亮的雾色，再画一条 1–2px 的亮线加光晕，盖住网格的尽头
- 天空和落日：深紫到洋红的纵向渐变；落日是黄到粉的圆，下半部用 mask 切出 4–5 道越往下越宽的横缝，圆心略高于地平线，下半截藏在地面后面；光晕画进天空渐变里，box-shadow 会被 mask 一起切掉
- 文字放在天空上部，白字加一层同色系 text-shadow，按深色天空核对对比度，不压在落日上；窄屏（< 480px）格距放大 1.5 倍，远处少几条线，也不容易出摩尔纹
- 一直在动的背景给暂停按钮（animation-play-state: paused）；减少动态效果时网格停住，构图不变

## 提示词

给{首屏}做「透视网格地平线」背景：地平线在高度 60% 处，下方地面是{线色}霓虹网格：一个宽约舞台 5 倍的大平面，横线、竖线各用一组 linear-gradient 画（background-size 等于格距 {格距}px，竖线左右对称，线芯 2px，两侧各 3px 低透明度同色微光），transform: perspective(500px) rotateX(72deg)，平面从旋转中心往远处伸出 2000px、往近处伸出一个地面高度；旋转中心放在地平线下 162px（perspective × cot 72°），让网格收拢到地平线；关键帧只把 rotateX 后面的 translateY 从 0 移到一个格距，一格 1.1 秒 linear 循环，关键帧里 perspective 和 rotateX 照抄；网格层用 mask-image: linear-gradient(transparent 10%, #000 70%) 淡到地平线，地平线下留一段雾色，再画一条亮线加光晕；上方天空用{天空渐变}，正中一轮黄到粉的落日，下半部切出 4–5 道越往下越宽的横缝，圆心略高于地平线，光晕画进天空渐变；标题“{标题}”放在天空上部，白字带同色光晕，不压在落日上；窄屏格距放大 1.5 倍；右下角给暂停按钮；减少动态效果时网格静止。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{--f:38cqh;--p:calc(var(--f) * 1.5);--d:calc(var(--p) * .325);--c:calc(var(--f) * .24);--ln:#ff5ad9;--gl:rgba(255,90,217,.32);background:#0b0319;color:#fff}
.sky{position:absolute;inset:0 0 var(--f);overflow:hidden;background:radial-gradient(ellipse 55% 70% at 50% 100%,rgba(255,84,170,.55),transparent 70%),linear-gradient(#0a0626,#28105a 60%,#5c1a6e)}
.sun{position:absolute;left:50%;bottom:calc(var(--s) * -.35);--s:min(44cqh,46cqw);width:var(--s);height:var(--s);margin-left:calc(var(--s) / -2);border-radius:50%;background:linear-gradient(#ffe66d 12%,#ff9f4a 46%,#ff3f8e 78%);-webkit-mask-image:linear-gradient(#000 40%,transparent 40% 42%,#000 42% 47%,transparent 47% 50%,#000 50% 54%,transparent 54% 58%,#000 58% 61%,transparent 61% 66%,#000 66%);mask-image:linear-gradient(#000 40%,transparent 40% 42%,#000 42% 47%,transparent 47% 50%,#000 50% 54%,transparent 54% 58%,#000 58% 61%,transparent 61% 66%,#000 66%)}
.floor{position:absolute;inset:auto 0 0;height:var(--f);background:linear-gradient(#4a1462,#1f0839 35%,#0b0319 85%)}
.floor::after{content:"";position:absolute;inset:0 0 auto;height:2px;background:#ffb3ef;box-shadow:0 0 10px 2px rgba(255,90,217,.7)}
.grid{position:absolute;inset:0;-webkit-mask-image:linear-gradient(transparent 10%,#000 70%);mask-image:linear-gradient(transparent 10%,#000 70%)}
.grid::before{content:"";position:absolute;left:-200%;width:500%;top:calc(var(--d) - var(--p) * 4);height:calc(var(--p) * 4 + var(--f));transform-origin:50% calc(var(--p) * 4);background:linear-gradient(transparent calc(50% - 4px),var(--gl) calc(50% - 1px),var(--ln) calc(50% - 1px) calc(50% + 1px),var(--gl) calc(50% + 1px),transparent calc(50% + 4px)) 50% 0 / var(--c) var(--c),linear-gradient(90deg,transparent calc(50% - 3px),var(--gl) calc(50% - .5px),var(--ln) calc(50% - .5px) calc(50% + .5px),var(--gl) calc(50% + .5px),transparent calc(50% + 3px)) 50% 0 / var(--c) var(--c);transform:perspective(var(--p)) rotateX(72deg);animation:roll 1.1s linear infinite}
@keyframes roll{to{transform:perspective(var(--p)) rotateX(72deg) translateY(var(--c))}
}
.st.paused .grid::before{animation-play-state:paused}
.tx{position:absolute;inset:16px 16px auto;text-align:center}
.k{margin:0;color:#8ff3ff;font-size:12px;letter-spacing:.2em}
.t{margin:2px 0 0;font-size:24px;line-height:1.25;font-weight:800;letter-spacing:.04em;text-shadow:0 0 14px rgba(255,90,217,.85),0 0 2px rgba(255,255,255,.6)}
.pz{position:absolute;right:12px;bottom:12px;display:grid;place-items:center;width:28px;height:28px;padding:0;border:1px solid rgba(255,255,255,.35);border-radius:50%;background:rgba(11,3,25,.6);color:#fff}
.pz:hover{background:rgba(40,16,90,.85)}
.pz:focus-visible{outline-color:#8ff3ff}
.pz svg{width:12px;height:12px;fill:currentColor}
.pz .pl,.paused .pz .pa{display:none}
.paused .pz .pl{display:block}
@container (max-width:320px){.st{--c:calc(var(--f) * .36)}
}
@container (min-height:260px){.tx{top:28px}
.k{font-size:13px}
.t{font-size:32px}
.pz{right:16px;bottom:16px;width:32px;height:32px}
}
@media (prefers-reduced-motion:reduce){.grid::before{animation:none}
.pz{display:none}
}
</style>

<div class="st"><div class="sky" aria-hidden="true"><i class="sun"></i></div><div class="floor" aria-hidden="true"><i class="grid"></i></div><div class="tx"><p class="k">MyPrompts 夜间电台</p><h2 class="t">今夜开往 1987</h2></div><button type="button" class="pz" aria-pressed="false" aria-label="暂停背景动画"><svg class="pa" viewBox="0 0 12 12" aria-hidden="true"><rect x="2" y="1.5" width="3" height="9" rx="1"/><rect x="7" y="1.5" width="3" height="9" rx="1"/></svg><svg class="pl" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5l7 4.5-7 4.5z"/></svg></button></div>

<script type="module">
export default function demo(root) {
  const st = root.querySelector('.st'), b = root.querySelector('.pz');
  b.addEventListener('click', () => b.setAttribute('aria-pressed', String(st.classList.toggle('paused'))));
}
</script>
