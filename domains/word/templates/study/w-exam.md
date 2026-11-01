---
zh: 试卷排版
en: Exam paper layout
aka: 试卷模板 试卷格式 密封线 A3 试卷 选择题对齐 答题卡 出卷
order: 20
---

## 是什么

考试卷的版式：卷头写学校、学年学期、考试名称、年级科目和考试说明，左侧装订线里是学校、班级、姓名、考号，下面是得分表和按大题编排的试题。常见 A3 横向分两栏，对折后每面相当于两张 A4。

## 适合

中小学和高校的期中期末试卷、单元测验、模拟卷；技能考核笔试；企业培训考试的纸质卷。

## 不适合

线上考试和问卷用表单工具；题库管理和组卷统计用 Excel 或专门的组卷系统，Word 只负责最后的版面。

## 注意

选项用制表位对齐：按选项长短排成一行四个、一行两个或一行一个，制表位分别放在版心宽度的 1/4、1/2、3/4 处，改字号也不会错位。大题标题写清题量和分值，所有小题分值加起来要等于满分。

## 要点

- 纸张：A3 横向分两栏（栏间距 2–3 字符），或 A4、8 开竖排；左侧留 25–30mm 装订区，以学校要求为准。
- 密封线：左侧竖排文本框写“学校＿＿ 班级＿＿ 姓名＿＿ 考号＿＿”，旁边一条虚线和“密 封 线 内 不 要 答 题”，放在页眉页脚层里，每页都出现。
- 卷头：标题“××中学 2026–2027 学年第一学期期中考试 八年级数学”小二黑体居中；下一行考试说明“满分 120 分，考试时间 120 分钟”。
- 得分表：题号（一、二、三……总分）、得分、评卷人三行，居中，五号字。
- 大题标题黑体：“一、选择题（本大题共 10 小题，每小题 3 分，共 30 分）”；小题用自动编号“1.”，跨大题连续编号。
- 选项“A.”“B.”用制表位对齐；填空横线用带下划线的制表位画，长度统一，见「填空下划线与对齐」；解答题按分值在题后留作答空白。
- 公式用公式编辑器，配图设为嵌入型放在题干右侧；页脚“第 1 页（共 4 页）”，A3 两栏时每栏各编一个页码，用域公式：左栏是当前页码×2−1，右栏是当前页码×2。
- 正文五号或小四宋体，西文和公式 Times New Roman，行距固定值 18–20 磅，题与题之间段前 3–6 磅。

## 提示词

帮我排一份{学校}{学年学期}{考试名称}{年级科目}试卷，满分{满分}分，时长{分钟}分钟，纸张{A3 横向两栏 / A4 竖排}，题目如下：{题目}。
1. 左侧装订线：竖排“学校、班级、姓名、考号”和下划线，加“密封线内不要答题”和虚线，放在页眉页脚层里，每页出现。
2. 卷头标题居中，下一行考试说明；接得分表：题号、得分、评卷人。
3. 大题标题写“一、选择题（本大题共×小题，每小题×分，共×分）”，帮我核对各题分值之和等于满分。
4. 小题自动编号、跨大题连续；选项按长度排成一行四个、两个或一个，用制表位对齐；填空横线长度统一。
5. 公式用公式编辑器；配图嵌入型放在题干右侧；解答题按分值留作答空白。
6. 页脚“第×页（共×页）”，A3 两栏时左右栏分别编页码。
7. 另出一份参考答案和评分标准，题号与试卷一致。
交付时说明密封线和分栏页码是怎么做的。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.m-desk{background:linear-gradient(135deg,#e9ebef,#d9dde3)}
.m-desk .dg-row{justify-content:center}
.m-desk .dg-col{flex:none}
.m-wrap{display:flex;gap:14px;align-items:flex-start}
.m-pg{position:relative;flex:none;display:grid;grid-template-columns:44px 1fr 1fr;column-gap:16px;width:620px;height:430px;padding:16px 18px 12px 8px;background:#fff;box-shadow:0 2px 6px rgba(16,24,40,.1),0 12px 28px -10px rgba(16,24,40,.25);color:#111;font:10.5px/1.6 "Songti SC","SimSun",serif}
.m-bind{display:flex;gap:6px;justify-content:center;border-right:1px dashed #666}
.m-bind p{writing-mode:vertical-rl;font-size:10px;letter-spacing:.1em;white-space:nowrap}
.m-bind .m-seal{color:#555;letter-spacing:.6em}
.m-col{position:relative;min-width:0}
.m-pg .m-title{text-align:center;font:700 12.5px/1.5 "PingFang SC","STHeiti","SimHei",sans-serif}
.m-pg .m-tip{margin-bottom:4px;text-align:center;font-size:9.5px;color:#333}
.m-sc{width:100%;margin-bottom:6px;border-collapse:collapse;font-size:9.5px;line-height:1.5;text-align:center}
.m-sc th,.m-sc td{height:17px;border:1px solid #333;font-weight:400}
.m-pg .m-q{font:700 10.5px/1.6 "PingFang SC","STHeiti","SimHei",sans-serif}
.m-op{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));padding-left:1.5em}
.m-op.m-2{grid-template-columns:repeat(2,minmax(0,1fr))}
.m-op span{border-left:1px dotted #a78bfa}
.m-pg .m-blank{display:inline-block;width:64px;border-bottom:1px solid #111}
.m-tri{float:right;margin:2px 0 2px 6px}
.m-pg .m-pn{position:absolute;left:0;right:0;bottom:-2px;text-align:center;font-size:9px;color:#333}
.m-ann{display:grid;width:146px;padding-top:2px;font:11px/1.35 system-ui,"PingFang SC",sans-serif;color:#344054}
.m-ann p{margin:0;padding:4px 0 4px 12px;border-left:2px solid #7c3aed}
.m-ann b{display:block;color:#101828;font-size:11.5px}
.m-ann span{color:#667085}
</style>

<div class="dg m-desk"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, `<div class="m-wrap"><div class="m-pg">
    <div class="m-bind"><p>学校＿＿＿　班级＿＿＿　姓名＿＿＿　考号＿＿＿＿</p><p class="m-seal">密封线内不要答题</p></div>
    <div class="m-col">
      <p class="m-title">××中学 2026–2027 学年第一学期期中考试<br>八年级数学</p>
      <p class="m-tip">满分 120 分，考试时间 120 分钟</p>
      <table class="m-sc"><tr><td>题号</td><td>一</td><td>二</td><td>三</td><td>总分</td></tr><tr><td>得分</td><td></td><td></td><td></td><td></td></tr><tr><td>评卷人</td><td></td><td></td><td></td><td></td></tr></table>
      <p class="m-q">一、选择题（本大题共 10 小题，每小题 3 分，共 30 分）</p>
      <p>1. 下列长度的三条线段能组成三角形的是（　　）</p>
      <p class="m-op m-2"><span>A. 2，3，5</span><span>B. 3，4，8</span><span>C. 4，6，9</span><span>D. 5，5，11</span></p>
      <p>2. 下列各数中，是无理数的是（　　）</p>
      <p class="m-op"><span>A. 0.5</span><span>B. √2</span><span>C. 1/3</span><span>D. −4</span></p>
      <p class="m-pn">第 1 页（共 4 页）</p>
    </div>
    <div class="m-col">
      <p class="m-q">二、填空题（本大题共 6 小题，每小题 4 分，共 24 分）</p>
      <svg class="m-tri" width="66" height="50" viewBox="0 0 66 50" aria-hidden="true"><path d="M6 44 L58 44 L22 6 Z" fill="none" stroke="#111" stroke-width="1.2"/><text x="0" y="49" font-size="8">B</text><text x="59" y="49" font-size="8">C</text><text x="18" y="6" font-size="8">A</text></svg>
      <p>11. 如图，在 △ABC 中，∠A＝70°，∠B＝45°，则 ∠C＝<span class="m-blank"></span>°。</p>
      <p>12. 一个多边形的内角和是 720°，它是<span class="m-blank"></span>边形。</p>
      <p class="m-q">三、解答题（本大题共 6 小题，共 66 分）</p>
      <p>17.（8 分）计算：（−2）² ＋ |−3| − 4 ÷ 2</p>
      <p class="m-pn">第 2 页（共 4 页）</p>
    </div>
  </div><div class="m-ann">
    <p><b>纸张</b><span>A3 横向两栏，左侧留装订区</span></p>
    <p><b>密封线</b><span>竖排文本框＋虚线，放页眉页脚层</span></p>
    <p><b>卷头和得分表</b><span>标题、考试说明，题号 / 得分 / 评卷人</span></p>
    <p><b>大题标题</b><span>黑体，写题量和分值</span></p>
    <p><b>选项</b><span>制表位 1/4、1/2、3/4，按长短排一行 4 个或 2 个</span></p>
    <p><b>填空和配图</b><span>横线等长，图嵌入型放题干右侧</span></p>
    <p><b>分栏页码</b><span>左栏 页码×2−1，右栏 页码×2</span></p>
  </div></div>`, { center: true, min: 0.35 });
}
</script>
