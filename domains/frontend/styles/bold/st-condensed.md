---
zh: 长体大标题
en: Condensed display
order: 30
---

## 是什么

冷白底、墨色字，一行行又高又窄的长体大写标题压满左半屏，其中一个词只留轮廓；唯一的亮色是几枚歪着贴上去的小标签。滚动时像翻一张会动的海报：舞台停住、细线自己画出来、数字和柱子长到位。

## 适合

运动与潮流品牌、新品发布、活动报名页、数据年报和展览页。

## 不适合

正文多、要长时间阅读的页面；标题主要是中文又没有长体中文字体时，效果会弱很多。

## 要点

- 配色：冷白 #f3f5f7 底，墨色 #0e1116 文字，次要灰 #5a626e；唯一亮色酸性黄绿 #d4ff3a，只用在 2–4 个小标签上，面积 ≤ 3%，标签里放墨色字
- 字体：标题用长体无衬线（"Avenir Next Condensed"、"Arial Narrow"，再加 font-stretch: 75%）800、全大写、clamp(56px, 12vw, 180px)、行高 0.86；中文标题改粗黑体 900、字距 -0.02em，保持字形原宽
- 轮廓词：一行标题里挑一个词只描边 2px、填充透明，同一行留实心词，整句仍读得通
- 版式：标题贴左占约 58%；另一侧 3–5 张卡片按高度依次递增，顶边连成一道弧线，编号用 12px 等宽字
- 标签倾斜 -6°，贴在标题角上或卡片边上；正文、按钮保持水平
- 线条：1.5px 墨色细线做分隔和指引，圆角 0，不用阴影
- 滚动：参考「滚动钉住叙事」把舞台钉住约 1.5 屏，细线随滚动画出，数字用「数字滚动计数」滚到位，柱子从 0 长出，卡片从倾斜 8° 落正；每段只播一次

## 提示词

把{产品}的{页面}做成长体大标题风：冷白 #f3f5f7 底、墨色 #0e1116 字、次要灰 #5a626e；唯一亮色酸性黄绿 #d4ff3a 只用在 2–4 个倾斜 -6° 的小标签上，标签里用墨色字；标题用长体无衬线（"Avenir Next Condensed", "Arial Narrow", sans-serif，font-stretch: 75%）800、全大写、clamp(56px, 12vw, 180px)、行高 0.86，贴左占约 58%，其中一个词只描边 2px；中文标题用粗黑体 900、字距 -0.02em；另一侧 {3–5} 张卡片按高度递增、顶边连成弧线，编号 12px 等宽字；1.5px 墨色细线分隔，0 圆角、无阴影；滚动时舞台钉住约 1.5 屏，细线随滚动画出、数字滚动到位、柱子从 0 长出、卡片从倾斜 8° 落正，每段只播一次；窄屏标题降到 clamp(44px, 16vw, 72px)、改单列，卡片横向滑动；减少动态效果时直接显示终态；文字对比度 ≥ 4.5:1。

## 示例

<style>
:host{container-type:size}
.s{height:100%;display:grid;grid-template-columns:58fr 42fr;gap:14px;padding:14px 18px;overflow:hidden;background:#f3f5f7;color:#0e1116;font:12px/1.4 system-ui,"PingFang SC",sans-serif}
.l{display:flex;flex-direction:column;justify-content:center;min-width:0}
.mk{align-self:flex-start;padding:1px 6px;background:#d4ff3a;font:700 11px/1.5 ui-monospace,Menlo,monospace;transform:rotate(-6deg)}
h1{margin:8px 0 10px;font:800 clamp(34px,24cqh,96px)/.86 "Avenir Next Condensed","Arial Narrow","Roboto Condensed",sans-serif;font-stretch:75%;text-transform:uppercase;letter-spacing:-.01em}
h1 span{display:block}
.o{color:transparent;-webkit-text-stroke:1.5px #0e1116}
.l p{margin:0;padding-top:6px;border-top:1.5px solid #0e1116;color:#5a626e}
.r{display:flex;align-items:flex-end;gap:6px;min-width:0}
.c{flex:1;min-width:0;display:flex;flex-direction:column;justify-content:space-between;gap:4px;padding:6px;border:1.5px solid #0e1116;background:#fff;transform-origin:50% 100%;animation:land .5s cubic-bezier(.2,.8,.2,1) both}
.c:nth-child(1){height:50%}
.c:nth-child(2){height:66%;animation-delay:.08s}
.c:nth-child(3){height:82%;animation-delay:.16s}
.c small{font:11px/1 ui-monospace,Menlo,monospace;color:#5a626e}
.c b{font:800 clamp(18px,12cqh,40px)/1 "Avenir Next Condensed","Arial Narrow","Roboto Condensed",sans-serif;font-stretch:75%}
.bar{height:4px;background:#0e1116;transform-origin:0 50%;animation:grow .6s .3s both}
.c:nth-child(1) .bar{width:34%}
.c:nth-child(2) .bar{width:62%}
.c:nth-child(3) .bar{width:100%}
@keyframes land{from{opacity:0;transform:translateY(10px) rotate(8deg)}
}
@keyframes grow{from{transform:scaleX(0)}
}
@container (max-width:360px){.s{grid-template-columns:52fr 48fr;gap:10px;padding-inline:14px}
.r{gap:4px}
.c{padding:5px 4px}
.c b{font-size:14px}
}
@media (prefers-reduced-motion:reduce){.c,.bar{animation:none}
}
</style>

<div class="s">
  <div class="l"><span class="mk">第 3 季</span><h1><span>Night</span><span class="o">Miles</span></h1><p>每周五 21:00 · 江堤集合</p></div>
  <div class="r" aria-label="三档距离"><div class="c"><small>01</small><b>5K</b><span class="bar"></span></div><div class="c"><small>02</small><b>10K</b><span class="bar"></span></div><div class="c"><small>03</small><b>21K</b><span class="bar"></span></div></div>
</div>
