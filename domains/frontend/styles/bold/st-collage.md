---
zh: 剪贴拼贴
en: Cut-and-paste collage
aka: 拼贴风 手账风 撕纸 胶带 剪报字 collage scrapbook
order: 80
---

## 是什么

剪下来的照片块、撕边的纸片、半透明胶带、像从不同报纸上剪下来拼成的标题字，再贴一枚圆贴纸，层层叠叠，像一页手账或杂志拼贴。

## 适合

年度回顾和活动回顾、品牌故事页、旅行和手账类产品、潮流品牌的 lookbook、内容社区的话题页。

## 不适合

工具类产品和转化表单；文字多、要连续阅读的页面，改用「编辑杂志风」；只想要线条草图的轻松感，用「手绘涂鸦」；想要纸张折叠、剪刻、层层投影的立体手作感，用「纸艺手作」。

## 注意

拼贴的乱是排出来的：先定好主次，一张主图最大、压在最上层，其余素材围着它错落。正文所在的纸片保持水平或接近水平，所有倾斜和压叠都留给照片、胶带和贴纸。

## 要点

- 配色：底色用灰白新闻纸 #ecebe6；素材各带颜色，但统一调成同一色调（比如都加 sepia(.2) 或同一层暖色 multiply）；强调色只留一个信号红 #c9301c（配白字 5.3:1），给贴纸和标签；正文 #1e1e1e 写在白纸片上
- 素材：撕边用 clip-path: polygon 画不规则锯齿；胶带是 rgba(255,236,170,.75) 的半透明长条，旋转 ±8–15°，两端剪成锯齿；照片块带 6px 白边和 0 2px 6px rgba(0,0,0,.18) 的贴纸投影
- 剪字标题：每个字一块，底色、字体（衬线、黑体、等宽、楷体混搭）和旋转（±6°）各不相同，最多 6 个字；读屏读整句，视觉字块加 aria-hidden
- 层叠：素材旋转 ±2–8°，互相压叠不超过各自面积的 30%；一屏素材最多 7 块（照片、纸片、胶带、贴纸都算）
- 正文：写在白色或浅色纸片上，旋转不超过 1°，系统黑体 15–16px / 1.7；手写批注用楷体，一屏 1 处
- 按钮：做成标签机打出来的黑底白字条，等宽字、全大写或加字距，轻微倾斜 -2°；悬停回正并换成信号红底
- 动效：素材像被一块块贴上去，scale 1.08 → 1、旋转到位、投影收紧，280ms，依次相隔 60ms，只播一次；减少动态效果时直接显示
- 窄屏：素材减到 3–4 块，改成纵向错落；剪字标题换成整行标题，只保留 1–2 个字的剪字块

## 提示词

把{产品}的{页面}做成剪贴拼贴风：灰白新闻纸 #ecebe6 底，所有照片素材统一调成同一色调，强调色只用信号红 #c9301c 给贴纸和标签；照片块带 6px 白边和 0 2px 6px rgba(0,0,0,.18) 投影，旋转 ±2–8°、互相压叠不超过 30%，用 clip-path 做撕边，半透明黄胶带 rgba(255,236,170,.75) 斜贴在角上；标题做成剪报字，每个字一块，底色、字体、旋转各不相同，最多 6 个字，读屏读整句、字块 aria-hidden；正文写在接近水平的白纸片上，16px / 1.7，手写批注一屏 1 处；一屏素材最多 7 块；按钮做成标签机打出的黑底白字条，倾斜 -2°，悬停回正变红；素材依次贴上（scale 1.08 → 1、280ms、相隔 60ms），只播一次，减少动态效果时直接显示；窄屏素材减到 3–4 块、纵向错落，标题改整行。

## 示例

<style>
:host{container-type:size}
.s{position:relative;height:100%;overflow:hidden;background:#ecebe6;color:#1e1e1e;font:12px/1.6 system-ui,"PingFang SC",sans-serif}
.pc{position:absolute;transform:rotate(var(--r));animation:stick .28s var(--d,0s) ease-out both}
.ph{padding:5px;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.18)}
.ph i{display:block;height:100%;filter:sepia(.18)}
.a{right:6cqh;top:6cqh;width:64cqh;height:48cqh;--r:-5deg;--d:.06s}
.a i{background:radial-gradient(circle at 70% 34%,#fff4d6 0 7%,transparent 8%),linear-gradient(#ffc29a 0,#ff8c72 44%,#3d79b0 45%,#5b95c4 66%,#efd6a4 67%)}
.b{right:34cqh;bottom:5cqh;width:44cqh;height:44cqh;--r:6deg;--d:.12s}
.b i{background:linear-gradient(150deg,transparent 52%,#3f6e4f 52%),linear-gradient(210deg,transparent 46%,#5d8c63 46%),linear-gradient(#d6e8ec,#a9cdd6)}
.tp{width:22cqh;height:7cqh;background:rgba(255,236,170,.78);clip-path:polygon(0 10%,6% 0,94% 12%,100% 0,100% 90%,94% 100%,6% 88%,0 100%)}
.t1{right:52cqh;top:3cqh;--r:-28deg;--d:.24s}
.t2{right:30cqh;bottom:41cqh;--r:18deg;--d:.3s}
.stk{right:2cqh;top:44cqh;display:grid;place-items:center;width:24cqh;height:24cqh;border-radius:50%;background:#c9301c;color:#fff;font:800 11px/1.15 system-ui,"PingFang SC",sans-serif;text-align:center;--r:12deg;--d:.36s}
.l{position:absolute;left:16px;top:0;bottom:0;width:calc(100% - 82cqh - 16px);display:flex;flex-direction:column;justify-content:center;gap:8px}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
h1{margin:0;font-size:clamp(17px,10.5cqh,40px);line-height:1.3;white-space:nowrap}
.cut b{display:inline-block;margin:0 1px 3px 0;padding:0 .18em;font-weight:800}
.cut b:nth-child(1){background:#1e1e1e;color:#fff;font-family:"Songti SC",STSong,serif;transform:rotate(-4deg)}
.cut b:nth-child(2){background:#c9301c;color:#fff;font-weight:900;transform:rotate(3deg)}
.cut b:nth-child(3){background:#fff;font-family:ui-monospace,Menlo,monospace;transform:rotate(-2deg) translateY(2px)}
.cut b:nth-child(4){background:#ffd84a;font-family:"Kaiti SC",STKaiti,KaiTi,serif;transform:rotate(5deg)}
.cut b:nth-child(5){background:#2453a6;color:#fff;font-family:"Songti SC",STSong,serif;transform:rotate(-3deg)}
.note{align-self:flex-start;max-width:100%;padding:12px 12px 10px;background:#fff;clip-path:polygon(0 4px,5% 0,10% 3px,15% 1px,20% 4px,25% 0,30% 3px,35% 1px,40% 4px,45% 0,50% 3px,55% 1px,60% 4px,65% 0,70% 3px,75% 1px,80% 4px,85% 0,90% 3px,95% 1px,100% 4px,100% 100%,0 100%);transform:rotate(-.6deg)}
.note p{margin:0 0 8px}
.hw{display:none;color:#c9301c;font:15px/1.3 "Kaiti SC",STKaiti,KaiTi,serif}
a{display:inline-block;padding:2px 10px;background:#1e1e1e;color:#fff;font:700 11px/1.6 ui-monospace,Menlo,monospace;letter-spacing:.12em;text-decoration:none;transform:rotate(-2deg);transition:transform .15s,background-color .15s}
a:hover{transform:none;background:#c9301c}
a:focus-visible{outline:2px solid #2453a6;outline-offset:3px}
@keyframes stick{from{transform:rotate(var(--r)) scale(1.08);opacity:0}}
@container (max-width:300px){.b,.t2{display:none}
.l{width:calc(100% - 74cqh - 16px)}
h1{font-size:9.5cqh}
}
@container (min-height:260px){.l{left:36px;width:calc(100% - 82cqh - 36px);gap:14px}
.note{padding:16px 18px 14px;font-size:14px}
.hw{display:block;margin-bottom:8px}
a{font-size:13px;padding:4px 14px}
.stk{font-size:15px}
}
@media (prefers-reduced-motion:reduce){.pc{animation:none}
a{transition:none}
}
</style>

<div class="s">
  <div class="pc ph a" aria-hidden="true"><i></i></div>
  <div class="pc ph b" aria-hidden="true"><i></i></div>
  <span class="pc tp t1" aria-hidden="true"></span>
  <span class="pc tp t2" aria-hidden="true"></span>
  <span class="pc stk">精选<br>2026</span>
  <div class="l">
    <h1><span class="sr">夏日回忆录</span><span class="cut" aria-hidden="true"><b>夏</b><b>日</b><b>回</b><b>忆</b><b>录</b></span></h1>
    <div class="note"><p>7 月 · 青岛 → 大理<br>12 天，318 张照片</p><p class="hw">海风是咸的，记得带防晒</p><a href="#">翻看相册 →</a></div>
  </div>
</div>
