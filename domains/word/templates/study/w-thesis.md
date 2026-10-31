---
zh: 毕业论文排版
en: Thesis formatting
aka: 论文格式 毕业论文格式 论文排版 学位论文 参考文献格式 论文页码 论文目录
order: 10
---

## 是什么

把毕业论文排成学校规定的样子：封面、声明、摘要、目录、正文、参考文献、致谢、附录按顺序排，前置部分和正文分节编页码，章节标题自动编号、目录自动生成，图表和公式按章编号并能交叉引用。

## 适合

本科毕业论文、硕士博士学位论文、课程论文、大创结题报告；任何几十页以上、带图表和参考文献的长文档。

## 不适合

动笔前的选题论证用「开题报告」；投期刊按期刊模板；几页的短报告套「用样式排版」就够，用不着分节和多级编号。

## 注意

先搭骨架再写：样式、多级编号、分节、页码设好后再往里填内容，最后生成目录。从别处复制来的文字用“只保留文本”粘贴，再套样式，带进来的杂乱格式最难清。字号、边距和页眉内容以学校当年发布的规范为准，下面的数字是常见做法。

## 要点

- 顺序：封面 → 原创性声明和授权书 → 中文摘要 → 英文摘要 → 目录 → 正文 → 参考文献 → 致谢 → 附录；每部分从新页开始（插入“下一页”分节符，或给标题样式勾选“段前分页”）。
- 页码：封面和声明不编页码；摘要到目录用罗马数字 I、II；正文从阿拉伯数字 1 起，各节之间取消“链接到前一节”，做法见「分节与页码」。
- 标题样式：章用标题 1（常见三号黑体居中，“第 1 章”），节用标题 2（四号黑体，“1.1”），条用标题 3（小四黑体，“1.1.1”），三级链接到同一个多级列表，见「多级编号」。
- 正文：小四宋体，英文和数字 Times New Roman，1.5 倍行距或固定值 20 磅，首行缩进 2 字符，两端对齐；页边距常见上下 25mm、左右 25–30mm。
- 图表：图题在图下、表题在表上，按章编号“图 2-1”“表 3-2”，五号字居中；用插入题注生成，正文写“如图 2-1 所示”时插交叉引用，见「题注与交叉引用」。
- 公式用公式编辑器输入，公式居中、编号（3-1）右对齐，用三栏无框线表格或制表位排。
- 参考文献按 GB/T 7714 顺序编码制，正文引用处标上标 [1]，文献表五号字、悬挂缩进 2 字符；摘要的关键词 3–5 个，用分号隔开。
- 目录用“引用—目录”生成到三级；交稿前全选按 F9 更新域，导出 PDF 再检查一遍页码、目录和图表编号。

## 提示词

帮我按{学校}的{本科 / 硕士}学位论文规范排版这篇论文，规范要点：{学校规范里的字号、边距、页眉要求}，论文内容在附件里。
1. 按封面、声明、中英文摘要、目录、正文、参考文献、致谢、附录的顺序整理，每部分另起一页，用分节符隔开。
2. 页码：封面和声明不编，摘要到目录用罗马数字，正文从 1 开始；页眉按规范写{页眉内容，如 奇数页章名、偶数页学校和论文题目}。
3. 章、节、条套标题 1–3，接入多级列表“第 1 章 / 1.1 / 1.1.1”，删掉原文手打的编号。
4. 正文小四宋体、西文 Times New Roman、1.5 倍行距、首行缩进 2 字符；规范和这里冲突时以规范为准。
5. 图表题注按章编号（图 2-1、表 3-2），图题在下、表题在上；正文里的“如图××所示”改成交叉引用；公式编号右对齐。
6. 参考文献按 GB/T 7714 顺序编码制整理，正文引用标上标序号，检查序号与文献表一一对应、没有漏引和多引。
7. 生成三级目录。
交付时列出规范里我没给清楚、你按常见做法处理的地方。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.m-desk{background:linear-gradient(135deg,#e9ebef,#d9dde3)}
.m-desk .dg-row{justify-content:center}
.m-desk .dg-col{flex:none}
.m-wrap{display:flex;gap:14px;align-items:flex-start}
.m-strip{display:grid;gap:6px;width:76px}
.m-th{position:relative;height:56px;padding:6px 6px 0;background:#fff;box-shadow:0 1px 3px rgba(16,24,40,.15);font:600 9.5px/1.3 system-ui,"PingFang SC",sans-serif;color:#344054}
.m-th i{position:absolute;right:5px;bottom:4px;color:#7c3aed;font:600 9.5px/1 "Times New Roman",serif}
.m-th s{display:block;margin-top:4px;height:3px;background:#e4e7ec;text-decoration:none}
.m-th.m-on{outline:2px solid #7c3aed}
.m-sec{color:#7c3aed;font:600 9px/1.2 system-ui,"PingFang SC",sans-serif;text-align:center}
.m-pg{position:relative;flex:none;width:420px;padding:14px 36px 12px;background:#fff;box-shadow:0 2px 6px rgba(16,24,40,.1),0 12px 28px -10px rgba(16,24,40,.25);color:#111;font:11.5px/1.68 "Songti SC","SimSun",serif}
.m-pg .m-hd{margin-bottom:10px;padding-bottom:2px;border-bottom:1px solid #333;text-align:center;font-size:9.5px}
.m-pg .m-ch{margin-bottom:6px;text-align:center;font:700 15px/1.5 "PingFang SC","STHeiti","SimHei",sans-serif}
.m-pg .m-h2{font:700 12.5px/1.6 "PingFang SC","STHeiti","SimHei",sans-serif}
.m-pg .m-p{text-indent:2em;text-align:justify}
.m-pg sup{font-size:8px;line-height:0;color:#1d4ed8}
.m-ref{padding:0 2px;border-radius:2px;background:#ede9fe;color:#5b21b6}
.m-fig{display:flex;align-items:flex-end;justify-content:center;gap:10px;height:66px;margin:6px 0 2px;padding-bottom:2px;border-bottom:1px solid #666}
.m-fig span{width:18px;background:#8b8fa3}
.m-fig span:nth-child(1){height:28px}.m-fig span:nth-child(2){height:34px}.m-fig span:nth-child(3){height:31px}.m-fig span:nth-child(4){height:40px}.m-fig span:nth-child(5){height:58px}.m-fig span:nth-child(6){height:45px}
.m-pg .m-cap{text-align:center;font-size:10.5px}
.m-pg .m-pn{margin-top:6px;text-align:center;font:10px "Times New Roman",serif}
.dg.narrow .m-strip{display:none}
.m-ann{display:grid;width:146px;padding-top:2px;font:11px/1.35 system-ui,"PingFang SC",sans-serif;color:#344054}
.m-ann p{margin:0;padding:4px 0 4px 12px;border-left:2px solid #7c3aed}
.m-ann b{display:block;color:#101828;font-size:11.5px}
.m-ann span{color:#667085}
</style>

<div class="dg m-desk"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, `<div class="m-wrap"><div class="m-strip">
    <div class="m-th">封面<s></s></div>
    <div class="m-th">摘要<s></s><i>I</i></div>
    <div class="m-th">目录<s></s><i>II</i></div>
    <p class="m-sec">— 分节符 —</p>
    <div class="m-th m-on">第 2 章<s></s><i>5</i></div>
    <div class="m-th">参考文献<s></s><i>31</i></div>
  </div><div class="m-pg">
    <p class="m-hd">××大学本科毕业论文　第 2 章　社区团购履约现状</p>
    <p class="m-ch">第 2 章　社区团购履约现状</p>
    <p class="m-h2">2.1　订单与自提点概况</p>
    <p class="m-p">2025 年样本城市共有自提点 412 个，日均订单 3.6 万单<sup>[3]</sup>。各月订单量变化<span class="m-ref">如图 2-1 所示</span>，11 月受促销影响达到峰值。</p>
    <div class="m-fig"><span></span><span></span><span></span><span></span><span></span><span></span></div>
    <p class="m-cap">图 2-1　2025 年 7–12 月订单量</p>
    <p class="m-p">订单集中在 18:00–21:00 下单、次日 10:00 前自提……</p>
    <p class="m-pn">5</p>
  </div><div class="m-ann">
    <p><b>页序和分节</b><span>前置部分罗马数字，正文从 1 起</span></p>
    <p><b>页眉</b><span>按规范写学校和章名</span></p>
    <p><b>章标题</b><span>标题 1，三号黑体居中</span></p>
    <p><b>节标题</b><span>标题 2，四号黑体，1.1</span></p>
    <p><b>正文</b><span>小四宋体，西文 Times New Roman</span></p>
    <p><b>引用</b><span>上标 [3]，对应文献表</span></p>
    <p><b>图题</b><span>图下居中，按章编号 图 2-1，交叉引用</span></p>
  </div></div>`, { center: true, min: 0.35 });
}
</script>
