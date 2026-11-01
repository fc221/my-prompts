---
zh: 一键排版文档
en: One-shot formatting prompt
aka: 一键排版提示词 一键排版 AI排版 Word排版提示词 格式统一 整理格式 排版规格
order: 10
---

## 是什么

把一份格式混乱的 Word（或一段纯文字）交给 AI，按一整套排版规格一次整理好：页面、样式、多级编号、目录、分节页码、页眉页脚、表格、图片和题注，交付 .docx 和改动清单。

## 适合

接手别人写的报告、方案、制度，格式五花八门；从网页、聊天记录、PDF 拷来的内容要变成正式文档；同一类文档每次都按同一套规格排。

## 要点

- 规格能给全就给全：单位或学校有格式要求的，把要求原文贴进来替换括号里的默认值；没有要求就用默认值。
- 能运行代码的 AI 助手会用 python-docx 直接改文件；只能对话的，让它输出逐条操作步骤或一个 VBA 宏。
- 先让它交“现状诊断”再动手：哪些段落判成标题、哪些是题注、哪里有手敲编号，结构判断错了后面全错。
- 拿到结果后按「检查文档格式」逐项过一遍，重点看编号、目录页码和分节页码。

## 提示词

帮我把附件 {文档名称} 排版成正式的 {文档类型，如 项目结项报告}，文字内容一个字都不改。排版规格如下，没写到的按括号里的默认值：
1. 页面：{页面要求}（A4 纵向，上下 25mm、左右 28mm，页眉 15mm、页脚 17.5mm，无文档网格）。
2. 样式：正文 {正文字体字号}（小四宋体，西文 Times New Roman，1.5 倍行距，首行缩进 2 字符）；标题 1–3 {标题字体字号}（三号、四号、小四黑体，段前段后 0.5 行，与下段同页）；另建表格文字、图片、题注样式。
3. 编号：标题用一个多级列表 {编号格式}（第1章 / 1.1 / 1.1.1），链接到标题 1–3；删掉原文手敲的编号。
4. 结构：{前置部分}（封面、目录）单独分节，封面无页码，目录页用罗马数字，正文从 1 开始；目录取标题 1–3。
5. 页眉页脚：{页眉页脚内容}（页眉左侧文档名、右侧当前章名；页脚居中“第 X 页 共 Y 页”）。
6. 表格用三线表、表头跨页重复；图片嵌入型居中、宽不超过版心；图表题注带章节号，正文里的引用改成交叉引用。
7. 清理：去掉连续空格、空段落、手动换行和直接格式，对齐改用制表位或表格。
先给我一份现状诊断（段落类型、手敲编号、要拆分或横排的表格），我确认后再改；改完交付 .docx，并列出改动清单和你拿不准的地方。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.m-desk{background:linear-gradient(135deg,#e9ebef,#d9dde3)}
.m-desk .dg-row{justify-content:center}
.m-desk .dg-col{flex:none}
.m-wrap{display:flex;gap:10px;align-items:center}
.m-side{display:grid;gap:6px;justify-items:center}
.m-lab{font:650 11px/1.3 system-ui,"PingFang SC",sans-serif;color:#475467}
.m-lab.ok{color:#1d3f75}
.m-pg{position:relative;width:250px;height:300px;padding:18px 22px;background:#fff;box-shadow:0 2px 6px rgba(16,24,40,.1),0 12px 28px -10px rgba(16,24,40,.25);color:#111;overflow:hidden}
.m-desk .m-x{margin:0 0 5px;font-size:10px;line-height:1.6;white-space:nowrap;overflow:hidden}
.m-sp{color:#e0857c;letter-spacing:-.05em}
.m-bad{position:relative}
.m-bad::after{content:"";position:absolute;left:-3px;right:-3px;top:-1px;bottom:-1px;border:1.2px dashed #e0857c;border-radius:3px}
.m-ar{display:grid;justify-items:center;gap:4px;color:#ca8a04;font:600 10.5px/1.3 system-ui,"PingFang SC",sans-serif}
.m-ar b{font-size:20px;line-height:1}
.m-ok .m-row{display:grid;grid-template-columns:40px minmax(0,1fr);gap:6px;align-items:baseline}
.m-ok .m-row span{color:#2b579a;font:9px/1.2 system-ui,"PingFang SC",sans-serif;white-space:nowrap}
.m-desk .m-t{margin:0 0 8px;text-align:center;font:700 14px/1.4 "PingFang SC","SimHei",sans-serif}
.m-desk .m-h1{margin:2px 0 2px;font:700 11.5px/1.5 "PingFang SC","SimHei",sans-serif}
.m-desk .m-h2{margin:2px 0 2px;font:700 10.5px/1.5 "PingFang SC","SimHei",sans-serif}
.m-desk .m-p{margin:0 0 3px;font:9.5px/1.75 "Songti SC","SimSun",serif;text-indent:2em}
.m-tb{width:100%;border-collapse:collapse;font:8.5px/1.5 "Songti SC","SimSun",serif;border-top:1.2px solid #111;border-bottom:1.2px solid #111}
.m-tb th{border-bottom:.6px solid #111;font-family:"PingFang SC","SimHei",sans-serif;padding:0 3px}
.m-tb td{padding:0 3px;text-align:center}
.m-desk .m-cap{margin:0 0 2px;text-align:center;font:8.5px/1.4 "Songti SC","SimSun",serif}
.m-ft{position:absolute;left:0;right:0;bottom:10px;text-align:center;color:#595959;font:8px/1 "Songti SC",serif}
</style>

<div class="dg m-desk"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  const sp = (n) => '<span class="m-sp">' + '·'.repeat(n) + '</span>';
  const before = '<div class="m-side"><span class="m-lab">排版前 · 手敲、手改、空格顶位置</span><div class="m-pg">'
    + '<p class="m-x" style="font:15px/1.5 serif">' + sp(8) + '<span class="m-bad">项目结项报告</span></p>'
    + '<p class="m-x"><span class="m-bad" style="font:700 12px/1.5 sans-serif">一、项目背景</span></p>'
    + '<p class="m-x" style="font:10.5px/1.6 serif">' + sp(4) + '2026 年 3 月起，项目在 42 家门店</p><p class="m-x" style="font:9px/1.6 sans-serif">上线新收银系统，比计划提前两周完成。</p>'
    + '<p class="m-x"><span class="m-bad" style="font:700 10px/1.5 serif">1.1 收银切换</span></p>'
    + '<p class="m-x" style="font:10px/1.6 serif">首批 12 家门店 4 月完成切换。</p><p class="m-x">&nbsp;</p><p class="m-x">&nbsp;</p>'
    + '<p class="m-x" style="font:10px/1.6 serif">门店' + sp(6) + '上线' + sp(5) + '停业时长</p><p class="m-x" style="font:10px/1.6 serif">湖滨店' + sp(4) + '4 月' + sp(6) + '1.5 小时</p>'
    + '<p class="m-x" style="font:9px/1.6 serif">' + sp(22) + '第 1 页</p></div></div>';
  const row = (s, h) => '<div class="m-row"><span>' + s + '</span>' + h + '</div>';
  const after = '<div class="m-side m-ok"><span class="m-lab ok">排版后 · 样式、编号、表格各管各的</span><div class="m-pg">'
    + row('标题', '<p class="m-t">项目结项报告</p>')
    + row('标题 1', '<p class="m-h1">第1章　项目背景</p>')
    + row('正文', '<p class="m-p">2026 年 3 月起，项目在 42 家门店上线新收银系统，比计划提前两周完成。</p>')
    + row('标题 2', '<p class="m-h2">1.1　收银切换</p>')
    + row('正文', '<p class="m-p">首批 12 家门店 4 月完成切换，见表 1-1。</p>')
    + row('题注', '<p class="m-cap">表 1-1　首批门店切换情况</p>')
    + row('三线表', '<table class="m-tb"><tr><th>门店</th><th>上线</th><th>停业时长</th></tr><tr><td>湖滨店</td><td>4 月</td><td>1.5 小时</td></tr><tr><td>园区店</td><td>4 月</td><td>1.2 小时</td></tr></table>')
    + '<p class="m-ft">第 1 页　共 18 页</p></div></div>';
  draw(root, '<div class="m-wrap">' + before + '<div class="m-ar"><b>→</b>一键排版</div>' + after + '</div>', { center: true, min: 0.35 });
}
</script>
