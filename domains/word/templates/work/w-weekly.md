---
zh: 周报与月报
en: Weekly and monthly report
aka: 周报 月报 工作周报 周总结 周报模板 进度汇报 月度报告
order: 40
---

## 是什么

按周或按月向上级汇报进度的短文档：本期完成了什么（对照上期计划）、关键数据、问题和需要的支持、下期计划。周报控制在一页，月报再加目标达成和费用。

## 适合

个人和团队周报、项目进度周报、门店和销售月报、外包供应商向甲方的定期汇报。

## 不适合

年度和半年回顾用「工作总结与述职」；会上形成的决定用「会议纪要」；指标多、要看趋势的经营月报用 Excel 做看板，Word 里只放结论。

## 注意

拿上期计划逐条对照写完成情况，读的人一眼能看出说过的事做没做。问题一栏写清需要谁、在哪天前、提供什么支持，只写“资源不足”没人能接。

## 要点

- 表头：标题“运营部周报（第 44 周）”，下一行写周期“2026.10.26–11.01”、部门、填报人；周次和日期两样都写。
- 本周完成：对照上周计划逐条列，每条带状态（已完成 / 进行中 70% / 延期）和结果数字；计划外的事项标“新增”。
- 关键数据表：指标、本周、上周、环比、目标进度；环比写成“+8.3%”这种带符号的形式，异常值后面加一句原因。
- 问题与支持：问题、影响、需要谁支持、期望日期，一行一条。
- 下周计划：事项、负责人、预计完成日期，3–6 条，下周就拿它对照。
- 月报增加：月度目标达成（目标、实际、完成率）、费用使用、下月重点；篇幅两页以内。
- 版式：一页 A4，小四或五号宋体，1.25 倍行距；状态除了颜色还写文字，黑白打印也能看清。
- 模板固定章节和表格，每期复制上一期改内容；文件名“2026W44_运营部周报.docx”。

## 提示词

帮我写一份{部门或个人}的{周报 / 月报}，周期{起止日期}，上期计划：{上期计划清单}，本期实际完成：{完成情况和数据}，遇到的问题：{问题}，下期打算：{计划}。
1. 表头写“{部门}{周报 / 月报}（第{周次}周 / {月份}）”、周期、填报人。
2. 本期完成按上期计划逐条对照，每条写状态（已完成 / 进行中百分比 / 延期及原因）和结果数字，计划外事项标“新增”。
3. 关键数据做成表格：指标、本期、上期、环比、目标进度；环比带正负号，保留一位小数。
4. 问题写成表格：问题、影响、需要谁支持、期望日期。
5. 下期计划 3–6 条，写事项、负责人、预计完成日期。
6. 月报再加月度目标达成和费用使用两部分。
7. 周报控制在一页 A4，用短句。
交付时帮我算好环比和完成率，并列出算式供我核对。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.m-desk{background:linear-gradient(135deg,#e9ebef,#d9dde3)}
.m-desk .dg-row{justify-content:center}
.m-desk .dg-col{flex:none}
.m-wrap{display:flex;gap:14px;align-items:flex-start}
.m-pg{position:relative;flex:none;width:470px;padding:18px 32px 14px 36px;background:#fff;box-shadow:0 2px 6px rgba(16,24,40,.1),0 12px 28px -10px rgba(16,24,40,.25);color:#111;font:11px/1.55 "Songti SC","SimSun",serif}
.m-pg .m-title{text-align:center;font:700 16px/1.4 "PingFang SC","STHeiti","SimHei",sans-serif}
.m-pg .m-meta{display:flex;justify-content:space-between;margin:2px 0 6px;padding-bottom:3px;border-bottom:1px solid #999;color:#444;font-size:10px}
.m-pg .m-h1{margin-top:4px;font:700 11.5px/1.55 "PingFang SC","STHeiti","SimHei",sans-serif}
.m-pg .m-li{display:flex;gap:6px;align-items:baseline;padding-left:1em}
.m-st{flex:none;min-width:58px;padding:0 4px;border-radius:3px;font:600 9.5px/1.6 system-ui,"PingFang SC",sans-serif;text-align:center}
.m-ok{background:#e7f6ec;color:#1f7a3d}
.m-go{background:#e8f0ff;color:#1d4ed8}
.m-late{background:#fdecec;color:#b42318}
.m-new{background:#f2f4f7;color:#475467}
.m-tb{width:100%;margin-top:2px;border-collapse:collapse;font-size:10px;line-height:1.4}
.m-tb th,.m-tb td{padding:2px 5px;border:1px solid #444;text-align:right;font-weight:400;font-variant-numeric:tabular-nums}
.m-tb th{background:#eef0f3;font-family:"PingFang SC","SimHei",sans-serif;font-weight:600}
.m-tb th:first-child,.m-tb td:first-child,.m-tb .m-l{text-align:left}
.m-tb .m-dn{color:#b42318}
.m-ann{display:grid;width:150px;padding-top:4px;font:11px/1.35 system-ui,"PingFang SC",sans-serif;color:#344054}
.m-ann p{margin:0;padding:5px 0 5px 12px;border-left:2px solid #7c3aed}
.m-ann b{display:block;color:#101828;font-size:11.5px}
.m-ann span{color:#667085}
</style>

<div class="dg m-desk"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, `<div class="m-wrap"><div class="m-pg">
    <p class="m-title">运营部周报（第 44 周）</p>
    <p class="m-meta"><span>周期：2026.10.26–11.01</span><span>填报人：彭磊</span></p>
    <p class="m-h1">一、本周完成（对照上周计划）</p>
    <p class="m-li"><span class="m-st m-ok">已完成</span><span>会员日物料配送 42 家门店，签收率 100%</span></p>
    <p class="m-li"><span class="m-st m-go">进行中 70%</span><span>店员排班系统培训，已完成 29 家</span></p>
    <p class="m-li"><span class="m-st m-late">延期</span><span>滨江店收银切换，网络改造未完成，改到 11-06</span></p>
    <p class="m-li"><span class="m-st m-new">新增</span><span>配合消防检查，整改 3 处通道堆放</span></p>
    <p class="m-h1">二、关键数据</p>
    <table class="m-tb"><tr><th>指标</th><th>本周</th><th>上周</th><th>环比</th><th class="m-l">说明</th></tr>
      <tr><td>到店客流（人次）</td><td>48,620</td><td>44,890</td><td>+8.3%</td><td class="m-l">会员日预热</td></tr>
      <tr><td>客单价（元）</td><td>86.5</td><td>88.2</td><td class="m-dn">−1.9%</td><td class="m-l">满减拉低客单</td></tr></table>
    <p class="m-h1">三、问题与需要的支持</p>
    <table class="m-tb"><tr><th>问题</th><th class="m-l">需要谁支持</th><th>期望日期</th></tr>
      <tr><td>滨江店网络改造排期</td><td class="m-l">IT 部 许鹏</td><td>11-04</td></tr></table>
    <p class="m-h1">四、下周计划</p>
    <p class="m-li">1. 会员日两天执行和日报汇总（彭磊，11-15）　2. 排班培训收尾（柯蕾，11-06）</p>
  </div><div class="m-ann">
    <p><b>表头</b><span>周次和起止日期都写，填报人</span></p>
    <p><b>本周完成</b><span>按上周计划逐条对照</span></p>
    <p><b>状态</b><span>颜色之外写文字，黑白打印也能分辨</span></p>
    <p><b>关键数据</b><span>本周、上周、带符号环比，异常写原因</span></p>
    <p><b>问题与支持</b><span>需要谁、哪天前</span></p>
    <p><b>下周计划</b><span>事项、负责人、日期，下周拿来对照</span></p>
  </div></div>`, { center: true, min: 0.35 });
}
</script>
