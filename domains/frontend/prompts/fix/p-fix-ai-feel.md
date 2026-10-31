---
zh: 去掉整页 AI 感
en: De-AI a whole page
tab: 整页
order: 30
---

## 是什么

症状：整页一看就是 AI 生成的。间距随手、渐变和发光、emoji 当图标、文案热情过头、所有图表都是同一种渐变柱。不是哪一处坏了，而是每一处都差一点。按固定顺序过七遍，每遍只改一类。

## 不适合

只有颜色不对用「去掉配色的 AI 味」；只是说明文字太多用「删减界面说明文字」；整个项目的令牌和组件都乱了用「整站翻新」。这条只管一页或一屏的观感。

## 要点

- 顺序：间距 → 颜色 → 图标 → 文案 → 数字 → 图表 → 记忆点。前面改好了，后面的问题往往自己变少。
- 每一步单独出“改前 → 改后”清单，不满意的那一步可以单独退回。
- 间距按「整理页面间距」，颜色按「去掉配色的 AI 味」，文案里的解释性小字按「删减界面说明文字」。
- 字体还是默认那一款时，先只换标题字体（从「常用开源字体」里按用途挑），正文可以不动。
- 等宽字体只给需要对齐的数字（金额、计数、时间），用来对齐，不当“科技感”装饰。
- 最后留一个真实的东西当记忆点（产品实物、真实截图、一个具体数据），它比任何装饰都更像“有人设计过”。

## 提示词

这一页整体有 AI 生成感。请按下面的顺序逐步修改，每步只改这一类，并列出“改前 → 改后”：
1. 间距：先量出纵向间距的实际值，再统一到少数几档（如 8 / 16 / 24 / 40），同一种关系用同一个值。
2. 颜色：去掉渐变底、发光和渐变字；中性色接近纯灰，卡片只比页面底亮一档；强调色只留一个，给主按钮、当前项和最关键的一个数字。
3. 图标：全页只用一套线性图标（同尺寸、同描边粗细），emoji 和彩色圆底图标都换掉；列表前的装饰符号换成小色点或去掉；能展开的项在右侧加一个小箭头 ›。
4. 文案：去掉感叹号、问候语和口号式标题、装饰性的“新”“热门”角标；全大写或带符号的标签改成句首大写的普通写法；标题位置放真正有用的信息（如当前统计周期）；对比数据写成小号次要色的“比上周 +8%”。
5. 数字：金额、计数、时间用等宽数字并右对齐，等宽只用在这里。
6. 图表：按数据选类型（趋势用折线、构成用堆叠、对比用横向条形），用细线条代替粗圆角柱；颜色只用来区分系列，同一指标在各图里同色；图例和分类计数写成“色点 + 名称 + 右对齐的数字”。
7. 记忆点：留一个真实的东西（{产品图 / 真实截图 / 关键数据}）作为这一页唯一的视觉重点，实物图最多一张，其余保持克制。
功能、数据和布局结构保持不变；全部做完后用一句话总结这一页现在的气质。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{padding:8px}
.hd{display:flex;align-items:baseline;justify-content:space-between;gap:6px;font-size:11px;line-height:16px;font-weight:600}
.hd span{color:#5b616e;font-size:10px;font-weight:400}
.ch{display:flex;align-items:flex-end;gap:5px}
.ch i{flex:1;display:block}
.ch svg{display:block;width:100%;height:100%}
/* 改前：渐变字、emoji 当图标、感叹号和 HOT 角标、渐变数字、粗圆角渐变柱，间距随手 */
.bad .hd{margin-bottom:5px;background:linear-gradient(90deg,#6d5dfc,#d946ef);-webkit-background-clip:text;background-clip:text;color:transparent}
.bad .kp{display:flex;align-items:center;gap:5px;margin-top:7px;font-size:10px;line-height:14px}
.bad .kp+.kv+.kp{margin-top:9px}
.bad .ic{display:grid;place-items:center;width:18px;height:18px;border-radius:50%;background:#fde68a;font-size:10px;line-height:1}
.bad .ic.p{background:#c7d2fe}
.bad .tag{padding:0 4px;border-radius:3px;background:#ef4444;color:#fff;font-size:8px;line-height:12px;font-weight:700}
.bad .kv{display:flex;align-items:baseline;gap:6px;margin-top:1px;font-size:10px;line-height:14px}
.bad .kv b{font-size:12px;font-weight:700;background:linear-gradient(90deg,#3b82f6,#a855f7);-webkit-background-clip:text;background-clip:text;color:transparent}
.bad .kv em{font-style:normal;color:#16a34a;font-weight:600}
.bad .ch{height:24px;margin-top:10px}
.bad .ch i{border-radius:7px 7px 2px 2px;background:linear-gradient(180deg,#a78bfa,#3b82f6)}
/* 改后：标题放统计周期，一个强调色，等宽数字右对齐，对比值小号次要色，细折线，间距统一 8 */
.good .hd{margin-bottom:8px}
.good .rw{display:flex;align-items:center;gap:6px;font-size:10px;line-height:14px}
.good .rw+.rw{margin-top:4px}
.good .rw .k{flex:1}
.good .rw b{min-width:40px;text-align:right;font-size:11px;font-weight:600;font-variant-numeric:tabular-nums}
.good .rw .d{min-width:22px;text-align:right;color:#5b616e;font-size:9px;font-variant-numeric:tabular-nums}
.good .ch{height:38px;margin-top:8px}
</style>

<div class="fx">
  <section class="fx-p"><h4>改前</h4><div class="fx-b"><div class="fx-z c bad"><div class="hd">✨ 欢迎回来，店长！</div><div class="kp"><span class="ic">💰</span><span>总营收</span><span class="tag">HOT</span></div><div class="kv"><b>¥12,480</b><em>📈 +8%！</em></div><div class="kp"><span class="ic p">👥</span><span>新会员</span><span class="tag">NEW</span></div><div class="kv"><b>1,284</b><em>🎉 +3%！</em></div><div class="ch"><i style="height:40%"></i><i style="height:70%"></i><i style="height:55%"></i><i style="height:90%"></i><i style="height:65%"></i><i style="height:100%"></i></div></div></div></section>
  <section class="fx-p ok"><h4>改后</h4><div class="fx-b"><div class="fx-z c good"><div class="hd">本周经营<span>第 44 周</span></div><div class="rw"><span class="k">总营收</span><b>¥12,480</b><span class="d">+8%</span></div><div class="rw"><span class="k">新会员</span><b>1,284</b><span class="d">+3%</span></div><div class="ch"><svg viewBox="0 0 100 38" preserveAspectRatio="none" aria-hidden="true"><path d="M0 37H100" fill="none" stroke="#e3e6eb" vector-effect="non-scaling-stroke"/><polyline points="2,30 18,27 34,29 50,20 66,22 82,13 98,9" fill="none" stroke="#3b5bdb" stroke-width="1.5" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg></div></div></div></section>
</div>
