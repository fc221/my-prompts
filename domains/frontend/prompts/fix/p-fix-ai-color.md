---
zh: 去掉配色的 AI 味
en: Generic AI colors
aka: 颜色很AI味
tab: 配色
order: 31
of: p-fix-ai-feel
---

## 是什么

症状：蓝紫渐变、发光描边、渐变文字、彩色图标圆底，一看就是模板生成的。

## 要点

- 有品牌色一定填上；没有就让 AI 推荐一个并说明理由。
- 你明确想要的特效写进最后一行保留。
- 改完遮住品牌名看：还认得出是谁的产品吗。
- 不只是颜色，间距、图标、文案、图表都透着 AI 味时，用「去掉整页 AI 感」从头过一遍。

## 提示词

页面颜色很“AI 味”，请去掉模板化的配色，改成克制、有辨识度的方案：
1. 删除：蓝紫或霓虹渐变背景、发光描边、渐变色文字、彩色圆底图标、emoji 图标、装饰性光晕和网格底纹。
2. 只保留一个强调色 {品牌色}，用在主按钮、当前项、链接和焦点上，面积约 10%；其他彩色改成灰阶。
3. 中性色用接近纯灰（饱和度很低）的一套：背景、卡片、边框、主文字、次要文字各一个值。
4. 状态色只表达状态：成功、警告、危险各一个，用小色点或浅底徽标加文字，不大面积铺色。
5. 图表最多 4–6 个色相，同一维度在所有图表里颜色一致。
6. 暗色模式单独定义一套，不做反相。
7. 对比度：正文 ≥ 4.5:1，图标和边框 ≥ 3:1。
需要保留的效果：{没有就写“无”}。
输出新的颜色变量表和修改后的页面。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{padding:8px}
.cd{padding:8px;border-radius:8px}
.tt{font-size:11px;line-height:16px;font-weight:600}
.rw{display:flex;align-items:center;gap:6px;margin-top:5px;font-size:10px;line-height:14px}
.rw .k{flex:1}
.ic{flex:none;display:grid;place-items:center;width:16px;height:16px}
.ic svg{width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round}
.ft{display:flex;align-items:center;justify-content:space-between;gap:6px;margin-top:8px}
.st{font-size:10px;line-height:14px}
.bt{padding:0 8px;border-radius:4px;color:#fff;font-size:10px;line-height:18px}
/* 改前：整页蓝紫渐变，卡片发光描边，渐变字标题，彩色圆底 emoji 图标，渐变胶囊和发光按钮 */
.bad{background:linear-gradient(135deg,#4f46e5,#9333ea 55%,#db2777)}
.bad .cd{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.6);box-shadow:0 0 0 2px rgba(196,181,253,.6),0 0 16px #a78bfa;color:#fff}
.bad .tt{background:linear-gradient(90deg,#fde68a,#f9a8d4);-webkit-background-clip:text;background-clip:text;color:transparent}
.bad .ic{border-radius:50%;background:#fbbf24;font-size:9px;line-height:1}
.bad .i2{background:#f472b6}
.bad .i3{background:#22d3ee}
.bad .ic svg{display:none}
.bad .st{padding:0 6px;border-radius:999px;background:linear-gradient(90deg,#34d399,#06b6d4);font-size:9px}
.bad .bt{border-radius:999px;background:linear-gradient(90deg,#f472b6,#a855f7);box-shadow:0 0 10px rgba(236,72,153,.8)}
/* 改后：接近纯灰的中性色，强调色只给主按钮，图标单色线性，状态是小色点加文字 */
.good{background:#f5f6f8}
.good .cd{background:#fff;border:1px solid #e3e6eb}
.good .ic{color:#5b616e}
.good .ic em{display:none}
.good .st::before{content:'';display:inline-block;width:6px;height:6px;margin-right:4px;border-radius:50%;background:#1f9d61;vertical-align:1px}
.good .bt{background:#3b5bdb}
</style>

<div class="fx">
  <section class="fx-p"><h4>改前</h4><div class="fx-b"><div class="fx-z c bad"><div class="cd"><div class="tt">金卡会员</div><div class="rw"><span class="ic"><em>🪙</em><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6"/><path d="M6 5.5l2 2.5 2-2.5M8 8v3M6.5 9.5h3"/></svg></span><span class="k">积分</span><b>1,280</b></div><div class="rw"><span class="ic i2"><em>🎫</em><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="4" width="12" height="8" rx="1.5"/><path d="M6 4v8" stroke-dasharray="1.5 1.5"/></svg></span><span class="k">优惠券</span><b>3 张</b></div><div class="rw"><span class="ic i3"><em>📅</em><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2.5" y="3" width="11" height="10" rx="1.5"/><path d="M2.5 6.5h11M5.5 2v2M10.5 2v2"/></svg></span><span class="k">到期</span><b>2027-06</b></div><div class="ft"><span class="st">已激活</span><span class="bt">去兑换</span></div></div></div></div></section>
  <section class="fx-p ok"><h4>改后</h4><div class="fx-b"><div class="fx-z c good"><div class="cd"><div class="tt">金卡会员</div><div class="rw"><span class="ic"><em>🪙</em><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6"/><path d="M6 5.5l2 2.5 2-2.5M8 8v3M6.5 9.5h3"/></svg></span><span class="k">积分</span><b>1,280</b></div><div class="rw"><span class="ic i2"><em>🎫</em><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="4" width="12" height="8" rx="1.5"/><path d="M6 4v8" stroke-dasharray="1.5 1.5"/></svg></span><span class="k">优惠券</span><b>3 张</b></div><div class="rw"><span class="ic i3"><em>📅</em><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="2.5" y="3" width="11" height="10" rx="1.5"/><path d="M2.5 6.5h11M5.5 2v2M10.5 2v2"/></svg></span><span class="k">到期</span><b>2027-06</b></div><div class="ft"><span class="st">已激活</span><span class="bt">去兑换</span></div></div></div></div></section>
</div>
