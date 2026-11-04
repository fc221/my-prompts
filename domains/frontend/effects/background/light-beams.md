---
zh: 发布会光束背景
en: Light beams
aka: 舞台光束 聚光束 光柱 体积光 light beams
order: 120
---

## 是什么

几道柔和的光柱从画面上方斜射下来，慢慢摆动、互相交叠，下端渐隐进暗色背景，像发布会舞台的灯光；用来托住首屏的大标题和产品图。

## 适合

产品发布页、新品预告、版本更新公告、线上活动的首屏；深色主题的品牌页。

## 不适合

浅色或信息密集的页面，光束在浅底上看不出来；只要一团柔光慢慢漂用「极光渐变背景」，光跟着鼠标走用「鼠标聚光背景」。

## 注意

光要柔：每道光只在顶端亮（不透明度约 0.8），往下很快降到 0.3 以下，交叠处靠混合模式自然变亮。标题压在光束交汇处时，白字和最亮的背景之间也要够对比度，标题后面垫一层暗色径向渐变。

## 要点

- 形状：每道光是细长的梯形，外层元素高约舞台的 1.2 倍、底宽约为高度的 1/4–1/3，顶端略高出舞台上沿，transform-origin 设在顶边中点；里层用 clip-path: polygon 收成上窄下宽（顶宽约 6%），填 linear-gradient(to bottom) 从亮到透明
- 模糊加在外层：filter: blur 约为光束底宽的 1/20（首屏里 8–20px），太大会把细的顶端抹成一片；clip-path 在滤镜之后生效，blur 和 clip-path 写在同一个元素上，边缘会被裁回硬边
- 叠加：外层 mix-blend-mode: screen（或 plus-lighter），交叠处更亮；光束层 isolation: isolate，混合只发生在光束之间，不会把背景图一起提亮
- 排布：3–6 道，静止角度分布在 −25° 到 25°，左边的往右斜、右边的往左斜，在标题上方交叉；顶端的横向位置错开，不要等距
- 摆动：各自绕顶端 rotate ±6°，来回一趟 8–14 秒（alternate，单程 4–7 秒），ease-in-out，每道时长不同、用负的 animation-delay 错开相位；只动 transform 和 opacity，blur 不做动画
- 配色：背景近黑偏蓝（#05070f–#101a3a），光色 1–2 种（冷白加一个品牌色）；底部用一层从透明到背景色的渐变把光柱收掉，舞台下沿不留亮边
- 一直在动的背景给暂停按钮；减少动态效果时光束停在静止角度

## 提示词

给{发布页首屏}加「发布会光束背景」：背景近黑偏蓝（{背景色}），从上沿斜射下 {光束数} 道光（3–6 道），每道分外层和里层：外层高约舞台 1.2 倍、底宽约为高度的 1/3，transform-origin 在顶边中点，filter: blur 取底宽的 1/20，mix-blend-mode: screen；里层用 clip-path 收成顶宽 6% 的梯形，linear-gradient 从顶端 rgba({光色}, .85) 到 40% 处 .3 再渐到透明；光色最多两种；静止角度分布在 −25° 到 25°，两侧往中间斜、在标题上方交叉；各自绕顶端摆动 ±6°，来回一趟 8–14 秒，每道时长不同、负延迟错开；光束层 isolation: isolate；底部一层渐变收到背景色；只动 transform 和 opacity，blur 不做动画；大标题“{标题}”和{产品图}放在交叉处下方，标题后垫暗色径向渐变保证对比度；右下角给暂停按钮；减少动态效果时光束停在静止角度。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;place-items:center;background:radial-gradient(ellipse 90% 70% at 50% 0%,#101a3a,#05070f 72%);color:#fff}
.bs{position:absolute;inset:0;isolation:isolate;pointer-events:none}
.bm{position:absolute;top:-4%;left:var(--x);width:var(--w,34cqh);height:120%;margin-left:calc(var(--w,34cqh) / -2);transform-origin:50% 0;transform:rotate(var(--a));filter:blur(3px);mix-blend-mode:screen;animation:sway var(--t) ease-in-out var(--dl) infinite alternate}
.bm::before{content:"";position:absolute;inset:0;clip-path:polygon(47% 0,53% 0,100% 100%,0 100%);background:linear-gradient(rgb(var(--c) / .85),rgb(var(--c) / .3) 40%,rgb(var(--c) / .08) 75%,transparent 95%)}
@keyframes sway{from{transform:rotate(calc(var(--a) - 6deg));opacity:.75}
to{transform:rotate(calc(var(--a) + 6deg));opacity:1}
}
.st.paused .bm{animation-play-state:paused}
.st::after{content:"";position:absolute;inset:auto 0 0;height:40%;background:linear-gradient(transparent,#05070f);pointer-events:none}
.tx{position:relative;z-index:1;margin-top:18%;padding:8px 24px;text-align:center;background:radial-gradient(closest-side,rgba(5,7,15,.6),transparent)}
.k{margin:0;color:#b9c8ff;font-size:12px;letter-spacing:.16em}
.t{margin:4px 0 0;font-size:24px;line-height:1.25;font-weight:800;letter-spacing:.02em}
.pz{position:absolute;z-index:1;right:12px;bottom:12px;display:grid;place-items:center;width:28px;height:28px;padding:0;border:1px solid rgba(255,255,255,.3);border-radius:50%;background:rgba(5,7,15,.6);color:#fff}
.pz:hover{background:rgba(30,40,80,.85)}
.pz:focus-visible{outline-color:#b9c8ff}
.pz svg{width:12px;height:12px;fill:currentColor}
.pz .pl,.paused .pz .pa{display:none}
.paused .pz .pl{display:block}
@container (min-height:260px){.bm{filter:blur(5px)}
.k{font-size:13px}
.t{font-size:32px}
.pz{right:16px;bottom:16px;width:32px;height:32px}
}
@media (prefers-reduced-motion:reduce){.bm{animation:none}
.pz{display:none}
}
</style>

<div class="st"><div class="bs" aria-hidden="true"><i class="bm" style="--x:10%;--a:-8deg;--t:6s;--dl:-2s;--c:130 170 255"></i><i class="bm" style="--x:38%;--a:-24deg;--t:5s;--dl:-4s;--c:225 232 255;--w:28cqh"></i><i class="bm" style="--x:50%;--a:2deg;--t:7s;--dl:-1s;--c:130 170 255;--w:42cqh"></i><i class="bm" style="--x:62%;--a:23deg;--t:4.5s;--dl:-3s;--c:225 232 255;--w:30cqh"></i><i class="bm" style="--x:90%;--a:9deg;--t:6.5s;--dl:-5s;--c:130 170 255"></i></div><div class="tx"><p class="k">MyPrompts 发布会 · 11 月 20 日</p><h2 class="t">下一代提示词工作台</h2></div><button type="button" class="pz" aria-pressed="false" aria-label="暂停背景动画"><svg class="pa" viewBox="0 0 12 12" aria-hidden="true"><rect x="2" y="1.5" width="3" height="9" rx="1"/><rect x="7" y="1.5" width="3" height="9" rx="1"/></svg><svg class="pl" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5l7 4.5-7 4.5z"/></svg></button></div>

<script type="module">
export default function demo(root) {
  const st = root.querySelector('.st'), b = root.querySelector('.pz');
  b.addEventListener('click', () => b.setAttribute('aria-pressed', String(st.classList.toggle('paused'))));
}
</script>
