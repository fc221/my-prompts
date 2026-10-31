---
zh: 用样式排版
en: Format with styles
aka: 样式 样式窗格 格式刷 清除格式 正文样式 标题样式 直接格式 Normal.dotm 修改样式
order: 10
---

## 是什么

给每一类段落（正文、标题 1–3、题注、表格文字）各建一个样式，字体、字号、行距、缩进、段前段后都写在样式里，段落只管“套哪个样式”。改一次样式，全文同类段落一起变；目录、多级编号、导航窗格也都靠样式认出层级。

## 适合

超过两三页、要反复修改的文档：报告、方案、制度、标书、论文；多人合写后要统一格式的文档。

## 不适合

一页的便条、领料单直接排即可；已经乱掉的旧文档先用「通配符查找替换」清掉手敲编号和多余空格，再套样式；想让 AI 代劳的看「一键排版文档」。

## 注意

最常见的错是选中文字直接改字体字号（直接格式）：看着一样，样式里却没记下，之后改样式、生成目录时这些段落就掉队。手改过的段落先清除格式（开始 → 清除所有格式，或 Ctrl+Shift+N 套回正文），再套样式。

## 要点

- 先建样式再写内容：开始 → 样式 → 右键“修改”，把“正文”设成小四宋体（12pt）、西文 Times New Roman、1.5 倍行距、首行缩进 2 字符、段前段后 0；这是常见默认值，以单位或学校的要求为准。
- 标题 1 三号黑体（16pt）、标题 2 四号黑体（14pt）、标题 3 小四黑体（12pt），段前段后 0.5 行，勾选“与下段同页”；大纲级别依次是 1、2、3 级，打开视图 → 导航窗格能看到完整层级。
- 每个样式设好“后续段落样式”：标题、题注后面都接“正文”，回车后自动切回正文。
- 自建样式基于“正文”，名字直说用途：表格文字（五号、单倍行距、首行缩进 0）、图片（居中、单倍行距）、题注（五号、居中）、落款（右对齐）；一份文档的自建样式控制在 10 个以内。
- 格式刷只用来补救：单击刷一处，双击可以连续刷多处，按 Esc 退出；Ctrl+Shift+C、Ctrl+Shift+V 复制和粘贴格式。刷完到样式窗格看一眼，段落应显示样式名，而不是“正文 + 加粗”这种带加号的名字。
- 查直接格式：Shift+F1 打开“显示格式”，或在样式窗格底部打开样式检查器；右键样式 →“选择所有 N 个实例”能一次选中同类段落统一处理。
- 外来内容用“只保留文本”粘贴（Ctrl+Alt+V 选无格式文本），再套样式，不把网页和别的文档的样式带进来。
- 定稿后存成模板：修改样式时选“基于该模板的新文档”，或另存为 .dotx 发给合作者；样式库里只留常用的几个，其余在“管理样式”里设为隐藏。

## 提示词

帮我把{文档名称}（用途：{用途，如 项目结项报告}）改成用样式排版，不改文字内容。
1. 先通读全文，列出现有的段落类型（正文、几级标题、题注、表格文字、落款等），以及哪些段落是手改的字体字号。
2. 按下面规格修改或新建样式：正文 {正文字体字号，默认 小四宋体}，西文 Times New Roman，1.5 倍行距，首行缩进 2 字符，段前段后 0；标题 1 三号黑体、标题 2 四号黑体、标题 3 小四黑体，段前段后 0.5 行、与下段同页，大纲级别 1–3；另建 表格文字（五号、单倍行距、无缩进）、图片（居中、单倍行距）、题注（五号、居中）。
3. 标题和题注的后续段落样式设为正文；所有段落先清除直接格式，再套上对应样式，正文里原本加粗强调的词保留加粗。
4. 自建样式不超过 10 个，样式库只显示上面这些。
5. 最后列出你拿不准该套哪个样式的段落（写出段落开头几个字），让我确认。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.m-desk{background:linear-gradient(135deg,#e9ebef,#d9dde3)}
.m-desk .dg-row{justify-content:center}
.m-desk .dg-col{flex:none}
.m-wrap{display:flex;gap:14px;align-items:flex-start}
.m-pg{display:grid;grid-template-columns:66px 330px;padding:24px 30px 22px 0;background:#fff;box-shadow:0 2px 6px rgba(16,24,40,.1),0 12px 28px -10px rgba(16,24,40,.25);color:#111;font-family:"Songti SC","SimSun",serif}
.m-sn{display:flex;align-items:flex-start;padding:4px 8px 0 10px;border-right:1px solid #d0d5dd;color:#667085;font:10px/1.3 system-ui,"PingFang SC",sans-serif;white-space:nowrap}
.m-c{padding-left:16px}
.m-on{background:#eaf1fb}
.m-sn.m-on{color:#2b579a;font-weight:650}
.m-h1{margin:0;padding:2px 0 8px;font:700 16px/1.5 "PingFang SC","SimHei",sans-serif}
.m-h2{margin:0;padding:6px 0 3px;font:700 13.5px/1.5 "PingFang SC","SimHei",sans-serif}
.m-p{margin:0;font-size:11.5px;line-height:1.85;text-indent:2em}
.m-fig{display:flex;align-items:flex-end;justify-content:center;gap:7px;height:58px;margin:6px 0 0;padding:0 60px;border-bottom:1px solid #98a2b3}
.m-fig i{flex:1;border-radius:2px 2px 0 0;background:linear-gradient(#5b8def,#2b579a)}
.m-cap{margin:0;padding:3px 0 2px;font-size:10.5px;line-height:1.5;text-align:center}
.m-pane{width:178px;border:1px solid #c9ced6;border-radius:6px;background:#fff;color:#344054;font:11px/1.35 system-ui,"PingFang SC",sans-serif;overflow:hidden}
.m-pane>p{margin:0;padding:6px 10px;border-bottom:1px solid #e4e7ec;background:#f6f7f9;color:#101828;font-weight:650}
.m-it{display:flex;align-items:center;justify-content:space-between;gap:6px;padding:4px 10px;white-space:nowrap}
.m-it em{color:#98a2b3;font-size:10px}
.m-it.on{background:#dbe8fb;box-shadow:inset 2px 0 #2b579a;color:#101828;font-weight:650}
.m-it.bad{color:#b42318;text-decoration:line-through;text-decoration-color:rgba(180,35,24,.5)}
.m-it.bad em{color:#b42318;text-decoration:none}
.m-pane>.m-spec{margin:0;font-weight:400;background:none;padding:7px 10px;border-top:1px solid #e4e7ec;color:#475467;font-size:10.5px;line-height:1.5}
.m-spec b{display:block;color:#2b579a;font-size:11px}
</style>

<div class="dg m-desk"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  const rows = [
    ['标题 1', '<p class="m-h1">2　实施过程</p>'],
    ['正文', '<p class="m-p">项目自 2026 年 3 月启动，分三批在华东 42 家门店上线新收银和会员系统，比计划提前两周完成。</p>'],
    ['标题 2', '<p class="m-h2">2.1　收银系统切换</p>', true],
    ['正文', '<p class="m-p">首批 12 家门店于 4 月完成切换，单店平均停业 1.5 小时，切换当天的交易全部对平。</p>'],
    ['图片', '<div class="m-fig"><i style="height:38%"></i><i style="height:62%"></i><i style="height:100%"></i></div>'],
    ['题注', '<p class="m-cap">图 2-1　各批次门店上线数量</p>'],
    ['标题 2', '<p class="m-h2">2.2　店员培训</p>', true],
    ['正文', '<p class="m-p">每家门店安排两名种子店员，先在测试环境练完 20 笔模拟交易再上岗。</p>'],
  ];
  const page = rows.map(([s, h, on]) => '<span class="m-sn' + (on ? ' m-on' : '') + '">' + s + '</span><div class="m-c' + (on ? ' m-on' : '') + '">' + h + '</div>').join('');
  const items = [['全部清除', ''], ['正文', '¶'], ['标题 1', '¶a'], ['标题 2', '¶a', 'on'], ['标题 3', '¶a'], ['图片', '¶'], ['题注', '¶'], ['表格文字', '¶'], ['正文 + 加粗', '直接格式', 'bad']];
  const pane = items.map(([n, k, c]) => '<div class="m-it' + (c ? ' ' + c : '') + '"><span>' + n + '</span><em>' + k + '</em></div>').join('');
  draw(root, '<div class="m-wrap"><div class="m-pg">' + page + '</div><div class="m-pane"><p>样式</p>' + pane + '<p class="m-spec"><b>标题 2 · 全文 2 处一起改</b>四号黑体，段前段后 0.5 行，与下段同页，后续段落：正文</p></div></div>', { center: true, min: 0.35 });
}
</script>
