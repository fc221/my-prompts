---
zh: 打磨界面细节
en: Small polish details
aka: 细节不够精致
order: 80
---

## 是什么

症状：布局和配色都对，但跳动的数字带着旁边的字晃、圆角套圆角不顺、卡片整块突然冒出来、标题末行只剩一个词、灰边框显得粗糙。

## 要点

- 用在收尾阶段，结构和视觉方向已经定了。
- 五条可以只挑命中的发；整体动效问题改用「优化动效质感」。

## 提示词

页面整体没问题，但细节不够精致。请逐条修，不改布局、配色和文案：
1. 会变化的数字（计时、计数、价格、百分比）加 font-variant-numeric: tabular-nums，数字跳动时宽度不变，旁边的文字不左右晃。
2. 嵌套圆角同心：外层圆角 = 内层圆角 + 两者之间的内边距（内层 8px、间距 6px，外层就是 14px），不要内外一样大。
3. 卡片入场拆开错开：图标、标题、正文、按钮分别从下方 6–8px 淡入，相邻错开 40–60ms，整张卡片 400ms 内出齐；只在首次出现时播，减少动态效果时直接显示。
4. 标题加 text-wrap: balance，最后一行不只剩一个词或一两个字；正文用 text-wrap: pretty。
5. 卡片和浮层去掉生硬的灰色实线边框，改成 box-shadow: 0 0 0 1px rgba(15, 23, 42, .06), 0 1px 2px rgba(15, 23, 42, .06)：一圈极淡的环形阴影加一层贴近的软阴影；暗色下改回 1px 浅色描边。
改完列出每一条改到了哪些组件。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{padding:8px;background:#f5f6f8}
.cd{padding:6px;background:#fff}
.im{height:34px;border-radius:8px;background:linear-gradient(135deg,#c7d2fe,#818cf8)}
.tt{max-width:104px;margin-top:6px;font-size:11px;line-height:15px;font-weight:600}
.nr{display:flex;align-items:baseline;gap:4px;margin-top:4px;color:#5b616e;font-size:10px;line-height:14px}
.nr b{color:#1f2329;font-size:11px;font-weight:600}
/* 改前：灰实线边框，内外圆角一样大，标题末行只剩一个字，数字宽度不一让后面的字左右错位 */
.bad .cd{border:1px solid #c0c5cf;border-radius:8px}
/* 改后：环形淡阴影代替实线，外圆角 = 内圆角 8 + 内边距 6，标题两行均衡，等宽数字 */
.good .cd{border-radius:14px;box-shadow:0 0 0 1px rgba(15,23,42,.06),0 1px 2px rgba(15,23,42,.06)}
.good .tt{text-wrap:balance}
.good .nr b{font-variant-numeric:tabular-nums}
</style>

<div class="fx">
  <section class="fx-p"><h4>改前</h4><div class="fx-b"><div class="fx-z c bad"><div class="cd"><div class="im"></div><div class="tt">门店会员月度活跃报告</div><div class="nr">今日<b>1,111</b>人在线</div><div class="nr">昨日<b>8,888</b>人在线</div></div></div></div></section>
  <section class="fx-p ok"><h4>改后</h4><div class="fx-b"><div class="fx-z c good"><div class="cd"><div class="im"></div><div class="tt">门店会员月度活跃报告</div><div class="nr">今日<b>1,111</b>人在线</div><div class="nr">昨日<b>8,888</b>人在线</div></div></div></div></section>
</div>
