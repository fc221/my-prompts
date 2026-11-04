---
zh: 自动目录
en: Automatic table of contents
aka: 目录 生成目录 更新目录 目录页码对不齐 前导符 TOC 图表目录 未定义书签
order: 30
---

## 是什么

引用 → 目录按标题样式（或大纲级别）自动生成的目录：标题文字、前导点、右对齐的页码，按住 Ctrl 点击可以跳转；章节改动后右键“更新域”一次刷新，标题和页码一起同步。

## 适合

超过 10 页或有三级章节的文档：论文、报告、标书、制度汇编、产品手册。

## 不适合

三五页的短文档不必放目录；导出 PDF 后的书签和可点目录看「目录、书签与链接」。

## 注意

目录只认样式和大纲级别：手改成黑体加粗的“标题”进不了目录，套了标题样式的空段落会在目录里留下空行。“目录”两个字本身用一个没有大纲级别的样式（如“目录标题”），否则它会出现在自己的目录里。

## 要点

- 插入：引用 → 目录 → 自定义目录，显示级别 3，勾选“显示页码”“页码右对齐”，制表符前导符选点线；在“选项”里确认标题 1–3 对应目录级别 1–3。
- 目录的格式改“目录 1”“目录 2”“目录 3”三个样式（自定义目录 → 修改）：目录 1 小四黑体，目录 2 小四宋体、左缩进 2 字符，目录 3 左缩进 4 字符，行距 1.5 倍；直接选中目录改字体，下次更新就还原了。
- 页码对齐靠目录样式里带前导符的右对齐制表位，位置等于版心宽度；改了页边距要回来同步这个制表位。
- 更新：右键目录 → 更新域 →“只更新页码”或“更新整个目录”（标题改过就选后者），快捷键 F9；文件 → 选项 → 显示 → 勾选“打印前更新域”。
- 目录单独占一页，前后用分节符隔开；摘要、目录这些前置部分的页码用罗马数字，做法见「分节与页码」。
- 只让某些段落进目录：段落 → 大纲级别设为 1–3 级，或在自定义目录的“选项”里把自建样式映射到目录级别；不想进目录的标题，大纲级别改为“正文文本”。
- 图表目录：引用 → 插入表目录，题注标签选“图”或“表”，前提是题注都按「题注与交叉引用」用插入题注生成。
- 目录本质是 TOC 域（常见开关 \o "1-3" \h \z \u），Alt+F9 切换显示域代码；交付前确认目录里没有“错误！未定义书签”，条目和正文标题一字不差。

## 提示词

帮我给{文档名称}生成自动目录。
1. 目录放在{位置，如 摘要之后、正文之前}，单独一页；“目录”两字居中、三号黑体，用不进目录的样式。
2. 目录取标题 1–3，显示页码、页码右对齐、点线前导符，条目可以点击跳转。
3. 修改目录 1–3 样式：目录 1 小四黑体，目录 2 小四宋体、左缩进 2 字符，目录 3 左缩进 4 字符，行距 1.5 倍；页码制表位放在版心右边缘。
4. 生成前先检查：所有标题都套了标题样式，没有套着标题样式的空段落；手改格式、没套样式的“假标题”列出来让我确认。
5. 目录页和正文分节，目录页页码用罗马数字，正文从 1 开始；最后更新整个目录，确认没有“错误！未定义书签”。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.m-desk{background:linear-gradient(135deg,#e9ebef,#d9dde3)}
.m-desk .dg-row{justify-content:center}
.m-desk .dg-col{flex:none}
.m-wrap{display:flex;gap:14px;align-items:flex-start}
.m-pg{width:380px;padding:26px 40px 18px;background:#fff;box-shadow:0 2px 6px rgba(16,24,40,.1),0 12px 28px -10px rgba(16,24,40,.25);color:#111;font-family:"Songti SC","SimSun",serif}
.m-desk .m-tt{margin:0 0 12px;text-align:center;font:700 16px/1.4 "PingFang SC","SimHei",sans-serif;letter-spacing:1em;text-indent:1em}
.m-e{display:flex;align-items:baseline;margin:0;font-size:11.5px;line-height:2;white-space:nowrap}
.m-e i{flex:1;min-width:16px;margin:0 4px;border-bottom:2px dotted #667085;transform:translateY(-3px)}
.m-e b{font-weight:400;font-variant-numeric:tabular-nums}
.m-e.l1{font-family:"PingFang SC","SimHei",sans-serif;font-weight:600}
.m-e.l2{padding-left:2em}
.m-e.l3{padding-left:4em}
.m-e.on{background:#eaf1fb;box-shadow:-8px 0 0 #eaf1fb,8px 0 0 #eaf1fb,-11px 0 0 #2b579a}
.m-desk .m-pn{margin:10px 0 0;text-align:center;font-size:10.5px}
.m-side{display:grid;gap:10px;width:160px}
.m-up{border:1px solid #c9ced6;border-radius:6px;background:#fff;font:11px/1.4 system-ui,"PingFang SC",sans-serif;color:#344054;box-shadow:0 6px 18px -8px rgba(16,24,40,.3);overflow:hidden}
.m-up p{margin:0;padding:5px 10px;border-bottom:1px solid #e4e7ec;background:#f6f7f9;color:#101828;font-weight:650}
.m-up span{display:flex;align-items:center;gap:6px;padding:4px 10px}
.m-up span::before{content:"";width:9px;height:9px;border:1.5px solid #98a2b3;border-radius:50%}
.m-up span.on::before{border:3px solid #2b579a}
.m-ann{display:grid;font:11px/1.35 system-ui,"PingFang SC",sans-serif;color:#344054}
.m-ann p{margin:0;padding:5px 0 5px 10px;border-left:2px solid #2b579a}
.m-ann b{display:block;color:#101828;font-size:11.5px}
.m-ann span{color:#667085}
</style>

<div class="dg m-desk"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  const list = [
    [1, '摘　要', 'I'], [1, 'Abstract', 'II'], [1, '第1章　绪论', '1'], [2, '1.1　研究背景', '1'], [2, '1.2　国内外研究现状', '3', 'on'], [3, '1.2.1　仓储自动化', '3'], [3, '1.2.2　库位优化算法', '5'],
    [1, '第2章　需求分析', '8'], [2, '2.1　业务流程', '8'], [2, '2.2　功能需求', '11'], [1, '第3章　系统设计', '15'],
  ];
  const toc = list.map(([lv, t, p, on]) => '<p class="m-e l' + lv + (on ? ' on' : '') + '"><span>' + t + '</span><i></i><b>' + p + '</b></p>').join('');
  const ann = [['目录 1', '小四黑体，顶格'], ['目录 2 / 目录 3', '左缩进 2 / 4 字符'], ['前导符与页码', '点线，右对齐制表位 = 版心宽'], ['前置部分', '罗马数字页码，单独一节']];
  draw(root, '<div class="m-wrap"><div class="m-pg"><p class="m-tt">目录</p>' + toc + '<p class="m-pn">II</p></div><div class="m-side"><div class="m-up"><p>更新目录</p><span>只更新页码</span><span class="on">更新整个目录</span></div><div class="m-ann">'
    + ann.map(([b, s]) => '<p><b>' + b + '</b><span>' + s + '</span></p>').join('') + '</div></div></div>', { center: true, min: 0.35 });
}
</script>
