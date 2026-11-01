---
zh: 蒸汽波
en: Vaporwave
aka: vaporwave 蒸汽波风 复古未来 夕阳网格 低保真 retrowave
order: 60
---

## 是什么

粉紫色的夕阳渐变、一轮被横条切开的太阳、一路延伸到远处的透视网格地面，前面浮着一扇老式电脑窗口，夹几个全角英文和片假名，怀旧、梦幻、带点低保真。

## 适合

音乐与电台、播客、复古主题活动、潮牌联名、个人站的彩蛋页、独立游戏宣传页。

## 不适合

需要转化和信任感的商业页面；正文多的页面；想要暗色都市霓虹和故障感，用「赛博霓虹」；想要 8 位游戏的像素块和限定调色板，用「复古像素」；想要浅色铬银和果冻按钮，用「千禧未来感」。

## 注意

渐变天空和网格只当舞台背景，正文和按钮放进不透明的老式窗口里才看得清。元素一多就成了贴纸墙，太阳、网格、窗口各一个就够撑起画面。

## 要点

- 配色：天空从深紫 #2b1055 经 #6a2c91 过渡到粉 #ff71ce，地面深紫 #1a0b3b，网格线粉 #ff71ce 或青 #01cdfe；点缀薄荷 #05ffa1、柠檬 #fffb96；窗口底 #ddd8ee，正文 #1a1033（13:1）
- 网格地面：两组 1.5px 的 linear-gradient 铺成 28px 方格，父元素 perspective: 140px，网格 rotateX(62deg)；地平线加一道粉色发光线，box-shadow 0 0 12px #ff71ce
- 太阳：圆形渐变 #fffb96 → #ff71ce，用 mask 切出 3–4 道由细到粗的横条缺口，下沿压在地平线后面
- 窗口：老式系统窗口，2px 凸起边框（左上 #fff、右下 #5a5470），标题栏 #2d1b69 → #8e3fb0 渐变配白字，右上一个方块关闭钮；按钮同样凸起，按下时两色边框互换；圆角 0
- 字体：标题用全角英文（如 ＮＩＧＨＴ）或等宽粗体，白字加青、粉两色 2px 错位 text-shadow；片假名或全角字母点缀最多 1 行；窗口里用系统字体 14–16px
- 装饰上限：一屏只放 1 个太阳、1 片网格、1–2 个窗口，漂浮物最多 2 个（棕榈树剪影、线框立方体、石膏像剪影里选）；除了扫描线不再叠别的纹理
- 动效：网格用 translateY 移动一格的距离做无缝循环，2–4s linear；太阳和漂浮物静止，或 8s 缓慢上下浮；减少动态效果时网格停住
- 窄屏：网格降到画面高度的 30%，太阳缩小、退到窗口后面，窗口满宽

## 提示词

把{产品}的{页面}做成蒸汽波风：天空用深紫 #2b1055 → #6a2c91 → 粉 #ff71ce 的竖向渐变，地面深紫 #1a0b3b 上铺 1.5px 粉色 28px 方格，父元素 perspective: 140px、网格 rotateX(62deg)，地平线加粉色发光线；一轮 #fffb96 → #ff71ce 渐变的太阳，用 mask 切出 3–4 道横条缺口；正文和按钮放进老式系统窗口：底色 #ddd8ee、正文 #1a1033，2px 凸起边框（左上白、右下 #5a5470），标题栏 #2d1b69 → #8e3fb0 渐变配白字，按钮凸起、按下时边框互换，圆角 0；标题用全角英文或等宽粗体白字，加青 #01cdfe、粉两色 2px 错位阴影，片假名点缀最多 1 行；一屏只放 1 个太阳、1 片网格、最多 2 个漂浮物；网格用 translateY 一格无缝循环、3s，减少动态效果时停住；窄屏网格降到 30% 高、窗口满宽。

## 示例

<style>
:host{container-type:size}
.s{position:relative;height:100%;overflow:hidden;background:linear-gradient(#2b1055 0%,#6a2c91 38%,#c04fa8 54%,#ff71ce 62%);color:#fff;font:12px/1.5 system-ui,"PingFang SC",sans-serif}
.sun{position:absolute;right:9%;bottom:30%;width:46cqh;aspect-ratio:1;border-radius:50%;background:linear-gradient(#fffb96 10%,#ffb0d9 60%,#ff71ce);-webkit-mask:linear-gradient(#000 50%,transparent 50% 55%,#000 55% 65%,transparent 65% 71%,#000 71% 80%,transparent 80% 87%,#000 87%);mask:linear-gradient(#000 50%,transparent 50% 55%,#000 55% 65%,transparent 65% 71%,#000 71% 80%,transparent 80% 87%,#000 87%)}
.floor{position:absolute;left:0;right:0;bottom:0;height:38%;overflow:hidden;perspective:140px;perspective-origin:50% 0;background:linear-gradient(#2d0f57,#1a0b3b);box-shadow:0 -1px 0 #ff9de2,0 -2px 12px #ff71ce}
.grid{position:absolute;left:-80%;right:-80%;top:-28px;height:300%;transform-origin:50% 0;transform:rotateX(62deg);background:linear-gradient(#ff71ce 1.5px,transparent 1.5px) 0 0/28px 28px,linear-gradient(90deg,#ff71ce 1.5px,transparent 1.5px) 0 0/28px 28px;animation:run 3s linear infinite}
.palm{position:absolute;right:2%;bottom:30%;width:15cqh;fill:#1a0b3b}
.palm path:first-child{fill:none;stroke:#1a0b3b;stroke-width:4;stroke-linecap:round}
.fg{position:relative;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:6px;padding:12px 18px}
h1{margin:0;font:800 clamp(18px,12cqh,44px)/1.1 ui-monospace,Menlo,monospace;letter-spacing:.04em;text-shadow:2px 2px 0 #01cdfe,-2px -2px 0 #ff71ce}
.jp{margin:0;color:#01cdfe;letter-spacing:.2em}
.win{width:min(100%,214px);border:2px solid;border-color:#fff #5a5470 #5a5470 #fff;background:#ddd8ee;color:#1a1033;box-shadow:4px 4px 0 rgba(26,11,59,.45)}
.bar{display:flex;align-items:center;justify-content:space-between;height:20px;padding:0 3px 0 6px;background:linear-gradient(90deg,#2d1b69,#8e3fb0);color:#fff;font:700 11px/1 ui-monospace,Menlo,monospace}
.bar i{width:12px;height:12px;border:2px solid;border-color:#fff #5a5470 #5a5470 #fff;background:#ddd8ee}
.bd{padding:6px 8px 8px}
.bd p{margin:0 0 4px;white-space:nowrap}
.bd small{color:#4a3f66}
.pg{height:8px;margin-bottom:8px;border:1px solid;border-color:#5a5470 #fff #fff #5a5470;background:#fff}
.pg i{display:block;width:62%;height:100%;background:repeating-linear-gradient(90deg,#8e3fb0 0 6px,transparent 6px 8px)}
a{display:inline-flex;align-items:center;height:24px;padding:0 10px;border:2px solid;border-color:#fff #5a5470 #5a5470 #fff;background:#ddd8ee;color:#1a1033;font-weight:600;text-decoration:none}
a:hover{background:#e9e5f6}
a:active{border-color:#5a5470 #fff #fff #5a5470}
a:focus-visible{outline:1px dotted #1a1033;outline-offset:-5px}
.more{display:none}
@keyframes run{to{transform:rotateX(62deg) translateY(28px)}}
@container (max-width:300px){.palm{display:none}
.sun{right:4%}
}
@container (min-height:260px){.fg{padding:20px 36px;gap:10px}
.jp{font-size:14px}
.win{width:300px}
.bar{height:24px;font-size:13px}
.bd{padding:10px 12px 12px;font-size:14px}
.more{display:inline}
a{height:30px;padding:0 14px;font-size:13px}
}
@media (prefers-reduced-motion:reduce){.grid{animation:none}
}
</style>

<div class="s">
  <i class="sun" aria-hidden="true"></i>
  <div class="floor" aria-hidden="true"><i class="grid"></i></div>
  <svg class="palm" viewBox="0 0 60 100" aria-hidden="true"><path d="M30 100C32 80 34 60 30 40"/><path d="M30 40C22 28 10 26 0 34C10 24 24 24 30 38Z"/><path d="M30 40C38 28 50 26 60 34C50 24 36 24 30 38Z"/><path d="M30 40C24 36 14 40 8 52C14 38 24 34 30 40Z"/><path d="M30 40C36 36 46 40 52 52C46 38 36 34 30 40Z"/><path d="M30 40C28 30 30 20 36 12C32 22 32 30 31 40Z"/></svg>
  <div class="fg">
    <h1>ＮＩＧＨＴ ＦＭ</h1>
    <p class="jp">ナイト・ラジオ 24h</p>
    <div class="win">
      <div class="bar"><span>夜间电台.exe</span><i aria-hidden="true"></i></div>
      <div class="bd">
        <p>正在播放 · 城市流行 04<span class="more"> · 主播 阿遥</span></p>
        <div class="pg" role="progressbar" aria-label="播放进度" aria-valuenow="62" aria-valuemin="0" aria-valuemax="100"><i></i></div>
        <a href="#">▶ 开始收听</a>
      </div>
    </div>
  </div>
</div>
