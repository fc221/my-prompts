---
zh: 题注与交叉引用
en: Captions and cross-references
aka: 图表编号 图题 表题 插入题注 交叉引用 图2-1 错误！未找到引用源 公式编号 包含章节号 图目录
order: 40
---

## 是什么

用“插入题注”给图、表、公式自动编号（图 2-1、表 3-2），正文里用“交叉引用”指向它们（如图 2-1 所示）。增删一张图后全选更新域，编号和正文里的引用一起变。

## 适合

图表超过 3 个的报告、论文、标书、技术方案；需要图目录、表目录的文档。

## 不适合

只有一两张配图的通知、简报直接写“如下图”即可；从 Markdown 生成的文档按「Markdown 转 Word」里的写法出题注。

## 注意

手打的“图 3”不会跟着变，删一张图后面全部错位；交叉引用指向的题注被删掉时，正文会显示“错误！未找到引用源”。交付前 Ctrl+A、F9 更新一遍，再查找“错误！”确认没有残留。

## 要点

- 插入：选中图片或表格 → 引用 → 插入题注，标签新建“图”“表”（需要时加“公式”）；位置：图选“所选项目下方”，表选“所选项目上方”。
- 编号带章节号：题注 → 编号 → 勾选“包含章节号”，章节起始样式选标题 1，分隔符选连字符，得到“图 2-1”；前提是标题 1 用了「多级编号」，否则会显示“错误！文档中没有指定样式的文字”。
- 题注样式：五号宋体、居中、段前 6 磅段后 12 磅；编号和图题之间一个全角空格，图题末尾不加句号。
- 防拆页：图片所在段落和表题段落都勾选“与下段同页”，图和图题、表题和表格不会被分到两页。
- 交叉引用：引用 → 交叉引用，引用类型选“图”，引用内容选“仅标签和编号”，勾选“插入为超链接”；正文写“如图 2-1 所示”，“图 2-1”整体是域，不再手补“图”字。
- 公式编号：公式所在段落设一个居中制表位（版心中点）和一个右对齐制表位（版心右边缘），公式居中、编号靠右；编号用插入题注生成，标签“公式”，勾选“题注中不包含标签”，手输括号得到“(2-1)”。
- 更新：Ctrl+A 后按 F9；文件 → 选项 → 显示 → 勾选“打印前更新域”。题注编号是 SEQ 域，章节号来自 STYLEREF 域，Alt+F9 可以查看域代码。
- 图表目录：引用 → 插入表目录，题注标签分别选“图”“表”，各生成一份，放在正文目录之后。

## 提示词

帮我给{文档名称}里的图、表、公式加自动题注和交叉引用。
1. 图题在图下方、表题在表上方，格式“图 2-1　{图题}”“表 3-2　{表题}”，编号包含标题 1 的章节号、用连字符分隔；公式居中，编号“(2-1)”靠右对齐。
2. 题注统一用题注样式：五号宋体、居中、段前 6 磅段后 12 磅，图题末尾不加句号；图片段落和表题段落都设“与下段同页”。
3. 把正文里手写的“图 3”“下表”“见表 2”改成交叉引用（仅标签和编号，插入为超链接），句子改成“如图 2-1 所示”这种说法。
4. 全选更新域，查找“错误！”确认为零；在目录之后插入图目录和表目录。
5. 最后列出原文中找不到对应图表的引用，以及没有被任何地方引用的图表。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.m-desk{background:linear-gradient(135deg,#e9ebef,#d9dde3)}
.m-desk .dg-row{justify-content:center}
.m-desk .dg-col{flex:none}
.m-wrap{display:flex;gap:14px;align-items:flex-start}
.m-pg{width:390px;padding:22px 40px 18px;background:#fff;box-shadow:0 2px 6px rgba(16,24,40,.1),0 12px 28px -10px rgba(16,24,40,.25);color:#111;font-family:"Songti SC","SimSun",serif}
.m-p{margin:0;font-size:11.5px;line-height:1.85;text-indent:2em}
.m-x{padding:0 2px;border-radius:2px;background:#e4e7ec;color:#1d3f75;text-decoration:underline;text-decoration-color:#9fb4d6;text-underline-offset:2px}
.m-fig{position:relative;display:flex;align-items:flex-end;justify-content:center;gap:12px;height:64px;margin:8px 70px 0;border-left:1px solid #98a2b3;border-bottom:1px solid #98a2b3}
.m-fig i{width:22px;border-radius:2px 2px 0 0;background:linear-gradient(#7aa2e3,#2b579a)}
.m-cap{margin:0;padding:4px 0 8px;text-align:center;font-size:10.5px;line-height:1.5}
.m-cap b{font-weight:400;padding:0 1px;background:#e4e7ec}
.m-cap.t{padding:6px 0 3px}
.m-tb{width:100%;border-collapse:collapse;font-size:10.5px;line-height:1.6;border-top:1.5px solid #111;border-bottom:1.5px solid #111}
.m-tb th{font-weight:700;font-family:"PingFang SC","SimHei",sans-serif;border-bottom:.75px solid #111;padding:1px 6px}
.m-tb td{padding:1px 6px;text-align:right;font-variant-numeric:tabular-nums}
.m-tb td:first-child,.m-tb th:first-child{text-align:left}
.m-desk .m-eq{position:relative;display:flex;align-items:center;margin:18px 0 0;font:italic 12.5px/1.8 "Times New Roman","Songti SC",serif;border-top:1px dashed #c9d6ea}
.m-eq span{flex:1;text-align:center}
.m-eq b{font:400 11.5px/1.8 "Songti SC","SimSun",serif}
.m-eq sub{font-size:8.5px}
.m-eq em{position:absolute;top:-12px;font:9px/1 system-ui;color:#2b579a;font-style:normal}
.m-ann{display:grid;width:150px;padding-top:12px;font:11px/1.35 system-ui,"PingFang SC",sans-serif;color:#344054}
.m-ann p{margin:0;padding:6px 0 6px 10px;border-left:2px solid #2b579a}
.m-ann b{display:block;color:#101828;font-size:11.5px}
.m-ann span{color:#667085}
</style>

<div class="dg m-desk"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  const page = '<p class="m-p">三季度客流比二季度增长 18%，以周末增幅最大，如<span class="m-x">图 2-1</span>所示。</p>'
    + '<div class="m-fig"><i style="height:44%"></i><i style="height:58%"></i><i style="height:86%"></i><i style="height:70%"></i></div>'
    + '<p class="m-cap"><b>图 2-1</b>　2026 年各季度门店客流</p>'
    + '<p class="m-p">各门店销售额见<span class="m-x">表 2-1</span>。</p>'
    + '<p class="m-cap t"><b>表 2-1</b>　华东区门店三季度销售汇总（万元）</p>'
    + '<table class="m-tb"><tr><th>门店</th><th>7 月</th><th>8 月</th><th>9 月</th></tr><tr><td>杭州湖滨店</td><td>86.4</td><td>91.2</td><td>88.7</td></tr><tr><td>苏州园区店</td><td>72.9</td><td>75.1</td><td>80.3</td></tr></table>'
    + '<p class="m-eq"><em style="left:50%">┴ 居中</em><em style="right:0">右对齐 ┘</em><span>R = (S<sub>2</sub> − S<sub>1</sub>) / S<sub>1</sub></span><b>(2-1)</b></p>';
  const ann = [['图题在下，表题在上', '五号宋体，居中'], ['包含章节号', '标题 1 的号 + 连字符'], ['交叉引用', '灰底是域，仅标签和编号'], ['公式编号', '居中 + 右对齐两个制表位']];
  draw(root, '<div class="m-wrap"><div class="m-pg">' + page + '</div><div class="m-ann">' + ann.map(([b, s]) => '<p><b>' + b + '</b><span>' + s + '</span></p>').join('') + '</div></div>', { center: true, min: 0.35 });
}
</script>
