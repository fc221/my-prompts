---
zh: 按模板起草文档
en: Draft from a template
aka: 按模板起草 AI写文档 套模板写 按格式起草 照模板写 方案起草 总结起草 填模板
order: 20
---

## 是什么

给 AI 一份现成的模板（章节结构和样式）和一批素材，让它按模板的章节和格式起草正文：每部分写什么、写多长都跟着模板走，没有依据的数字和事实留空标出，不编造。

## 适合

每月要写的周报、月报、季度总结；照着去年的方案、申请书写今年的；按单位模板起草通知、请示；按范本起草合同初稿。

## 要点

- 模板可以是 .docx 文件，也可以把模板的标题层级和每节的填写说明贴进来；把样式名告诉 AI，生成的段落直接套用。
- 素材越具体越好：会议记录、数据表、往来邮件；金额、日期、人名一律以素材为准。
- 缺的信息让它写成“【待补充：××】”并高亮，交付时汇总成清单，比让 AI 猜靠谱。
- 公文、申请类的固定格式参照「公文格式」「申请书通用写法」；合同条款以法务审核为准。

## 提示词

请按我给的模板起草一份 {文档类型，如 2026 年第三季度门店运营总结}。
- 模板：{模板文件或结构}，保留它的章节顺序、标题文字和样式（标题 1–3、正文、表格文字、题注），一级章节不增不减。
- 素材：{素材，如 三季度经营数据表、店长会议纪要、客诉汇总}。
- 读者和用途：{读者，如 区域总监审阅后上报总部}，语气 {语气，如 正式、简洁、用数据说话}。
- 篇幅：{篇幅，如 正文 3000 字左右，每个二级标题下 200–400 字}。
要求：
1. 先列出每一节准备写的要点和对应的素材出处，我确认后再成文。
2. 数字、日期、人名、金额只用素材里有的；素材里没有的写成“【待补充：内容】”并黄色高亮，不推测、不举虚构的例子。
3. 数据对比统一口径（环比还是同比、单位万元、保留两位小数），表格用模板里的表格样式，表题和图题带编号。
4. 正文套模板样式，编号沿用模板的多级列表，不手动改字体字号。
5. 交付 .docx，最后附三份清单：待补充项、引用的素材出处、需要我重点核对的结论。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.m-desk{background:linear-gradient(135deg,#e9ebef,#d9dde3)}
.m-desk .dg-row{justify-content:center}
.m-desk .dg-col{flex:none}
.m-wrap{display:flex;gap:14px;align-items:center}
.m-src{display:grid;gap:6px;width:150px;font:10.5px/1.35 system-ui,"PingFang SC",sans-serif;color:#344054}
.m-src b{color:#101828;font-size:11px}
.m-src span{display:flex;align-items:center;gap:6px;padding:5px 8px;border:1px solid #d0d5dd;border-radius:6px;background:#fff;white-space:nowrap}
.m-src i{display:grid;place-items:center;width:15px;height:17px;border-radius:2px;color:#fff;font:700 8px/1 system-ui;font-style:normal}
.m-ar{color:#ca8a04;font:20px/1 system-ui}
.m-doc{display:grid;grid-template-columns:minmax(0,1fr) 120px;width:450px;background:#fff;box-shadow:0 2px 6px rgba(16,24,40,.1),0 12px 28px -10px rgba(16,24,40,.25)}
.m-pg{padding:16px 18px 16px 24px;color:#111;font-family:"Songti SC","SimSun",serif}
.m-desk .m-t{margin:0 0 8px;text-align:center;font:700 13px/1.4 "PingFang SC","SimHei",sans-serif}
.m-desk .m-h1{margin:2px 0 2px;font:700 11px/1.5 "PingFang SC","SimHei",sans-serif}
.m-desk .m-h2{margin:2px 0 2px;font:700 10px/1.5 "PingFang SC","SimHei",sans-serif}
.m-desk .m-p{margin:0 0 4px;font-size:9.5px;line-height:1.8;text-indent:2em}
.m-tbd{padding:0 2px;background:#fde68a;color:#78350f;font-family:"PingFang SC",sans-serif;font-size:9px}
.m-ref{border-bottom:1.5px solid #f2c94c}
.m-mg{display:grid;align-content:start;gap:7px;padding:44px 8px 10px;border-left:1px solid #eaecf0;background:#fafbfc;font:9.5px/1.35 system-ui,"PingFang SC",sans-serif;color:#475467}
.m-mg p{margin:0;padding:4px 6px;border-left:2px solid #f2c94c;background:#fff}
.m-mg p.t{border-left-color:#d97706;color:#92400e}
</style>

<div class="dg m-desk"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  const src = '<div class="m-src"><b>给 AI 的材料</b><span><i style="background:#2b579a">W</i>季度总结模板.docx</span><span><i style="background:#1d8348">X</i>三季度经营数据.xlsx</span><span><i style="background:#2b579a">W</i>店长会议纪要.docx</span><span><i style="background:#98a2b3">T</i>客诉汇总.txt</span></div>';
  const page = '<div class="m-pg"><p class="m-t">2026 年第三季度门店运营总结</p>'
    + '<p class="m-h1">一、经营概况</p>'
    + '<p class="m-p">三季度华东区 42 家门店实现销售额 <span class="m-ref">3,862.40 万元</span>，环比增长 <span class="m-ref">6.8%</span>；会员消费占比提升到 <span class="m-ref">57%</span>。</p>'
    + '<p class="m-h1">二、重点工作</p><p class="m-h2">（一）收银系统切换</p>'
    + '<p class="m-p">9 月底前全部门店完成切换，单店平均停业 <span class="m-ref">1.5 小时</span>。</p>'
    + '<p class="m-h2">（二）店员培训</p>'
    + '<p class="m-p">累计培训 <span class="m-tbd">【待补充：培训人次】</span>，考核通过率 <span class="m-tbd">【待补充：通过率】</span>。</p>'
    + '<p class="m-h1">三、四季度计划</p><p class="m-p">……</p></div>';
  const mg = '<div class="m-mg"><p>数据表 · 汇总!C12</p><p>数据表 · 会员!B4</p><p>会议纪要 · 第 2 条</p><p class="t">素材里没有，留空待补</p></div>';
  draw(root, '<div class="m-wrap">' + src + '<span class="m-ar">→</span><div class="m-doc">' + page + mg + '</div></div>', { center: true, min: 0.35 });
}
</script>
