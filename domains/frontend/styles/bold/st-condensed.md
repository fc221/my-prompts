---
zh: 长体大标题
en: Condensed display
order: 30
---

## 是什么

冷白底、墨色字，一行行又高又窄的长体大写标题压满左半屏，其中一个词只留轮廓；唯一的亮色是几枚歪着贴上去的小标签。

## 适合

运动与潮流品牌、新品发布、活动报名页、数据年报和展览页。

## 不适合

正文多、要长时间阅读的页面；标题主要是中文又没有长体中文字体时，效果会弱很多。

## 要点

- 配色：冷白 #f3f5f7 底，墨色 #0e1116 文字，次要灰 #5a626e；唯一亮色酸性黄绿 #d4ff3a，只用在 2–4 个小标签上，面积 ≤ 3%，标签里放墨色字
- 字体：标题用长体无衬线（"Avenir Next Condensed"、"Arial Narrow"，再加 font-stretch: 75%）800、全大写、clamp(56px, 12vw, 180px)、行高 0.86；中文标题改粗黑体 900、字距 -0.02em，保持字形原宽
- 轮廓词：一行标题里挑一个词只描边 2px、填充透明，同一行留实心词，整句仍读得通
- 版式：标题贴左占约 58%，右侧留白或放一张图；编号、日期这类小字用 12px 等宽字
- 标签倾斜 -6°，贴在标题角上或卡片边上；正文、按钮保持水平
- 线条：1.5px 墨色细线做分隔和指引，圆角 0，不用阴影

## 提示词

把{产品}的{页面}做成长体大标题风：冷白 #f3f5f7 底、墨色 #0e1116 字、次要灰 #5a626e；唯一亮色酸性黄绿 #d4ff3a 只用在 2–4 个倾斜 -6° 的小标签上，标签里用墨色字；标题用长体无衬线（"Avenir Next Condensed", "Arial Narrow", sans-serif，font-stretch: 75%）800、全大写、clamp(56px, 12vw, 180px)、行高 0.86，贴左占约 58%，其中一个词只描边 2px；中文标题用粗黑体 900、字距 -0.02em；编号、日期这类小字用 12px 等宽字；1.5px 墨色细线分隔，0 圆角、无阴影；窄屏标题降到 clamp(44px, 16vw, 72px)；文字对比度 ≥ 4.5:1。

## 示例

<style>
.s{height:100%;display:grid;align-content:center;gap:8px;padding:12px 18px;overflow:hidden;background:#f3f5f7;color:#0e1116;font:12px/1.4 system-ui,"PingFang SC",sans-serif}
.mk{display:inline-block;padding:1px 6px;background:#d4ff3a;color:#0e1116;font:700 11px/1.5 ui-monospace,Menlo,monospace;font-style:normal;letter-spacing:0;text-transform:none;-webkit-text-stroke:0;transform:rotate(-6deg)}
.s>.mk{justify-self:start}
h1{margin:0;font:800 clamp(44px,30cqh,150px)/.86 "Avenir Next Condensed","Arial Narrow","Roboto Condensed",sans-serif;font-stretch:75%;text-transform:uppercase;letter-spacing:-.01em}
h1 span{display:block}
h1 .mk{vertical-align:top;margin:.1em 0 0 .14em}
.o{color:transparent;-webkit-text-stroke:1.5px #0e1116}
.s p{display:flex;justify-content:space-between;align-items:center;gap:8px;margin:0;padding-top:6px;border-top:1.5px solid #0e1116;color:#5a626e}
</style>

<div class="s"><i class="mk">第 3 季</i><h1><span>Night</span><span class="o">Miles<i class="mk">11.07 开跑</i></span></h1><p>每周五 21:00 · 江堤集合<i class="mk">报名中</i></p></div>
