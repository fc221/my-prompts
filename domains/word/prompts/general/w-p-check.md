---
zh: 检查文档格式
en: Format self-check before delivery
aka: 格式自查 格式检查 排版检查 交付前检查 打印前检查 Word检查清单 孤行控制 字体嵌入 导出PDF检查 统稿
order: 30
---

## 是什么

交付或打印前，让 AI 按一张清单把文档格式查一遍：样式、编号、目录、分节页码、表格图片、题注引用、对齐、分页和孤行，再导出 PDF 核对字体和页数，输出问题清单和修改顺序。

## 适合

论文、标书、报告、合同交付前；多人合写后的统稿；改了很多轮、担心有遗漏的文档。

## 要点

- 能运行代码的 AI 可以用 python-docx 扫一遍样式和直接格式，再转 PDF 看分页；只能对话的，上传 .docx 让它逐项给出检查结论和检查方法。
- 有格式要求文件的（学校规范、招标文件的格式章节）一起给它，逐条对照。
- 分页类问题靠段落设置解决：段落 → 换行和分页 里的“孤行控制”“与下段同页”“段中不分页”，不要用回车往下顶。
- 先改影响页码和编号的（分节、编号、目录），再改样式细节；改完重新导出 PDF，用打印预览从头翻一遍。

## 提示词

请帮我检查 {文档名称} 的格式，交付对象是 {交付对象，如 招标方或学院}，格式要求见 {格式要求，如 附件里的论文格式规范，没有就按常规正式文档}。逐项检查，输出问题清单（位置、问题、怎么改、严重程度），先不要改文档：
1. 样式：正文和各级标题是否都套了样式；有没有“正文 + 加粗”这类直接格式和手改字号的段落；中文、西文字体是否各自统一。
2. 编号和目录：标题编号是否自动生成、连续无跳号；目录是否最新，页码和正文一致，没有“错误！未定义书签”。
3. 分节和页码：封面、目录、正文的页码格式和起始值；页眉页脚有没有因为链接到前一节而错位；奇偶页设置是否正确。
4. 表格和图片：表头是否跨页重复、行有没有跨页断开；图片是否超出版心或被固定行距裁切；题注编号连续，交叉引用没有“错误！未找到引用源”。
5. 对齐和空白：连续空格、靠空段落顶位置、手动换行、用空格对齐的下划线。
6. 分页：标题孤零零落在页底、段落只剩一行在页首或页尾（孤行）、表题和表格分在两页、多余的空白页。
7. 交付件：导出 PDF，检查页数和 Word 一致、字体全部嵌入、修订和批注已清除、文档属性里没有个人信息；需要打印的，写明纸张、单双面和装订边。
最后按“先结构、后细节”给出修改顺序。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.m-desk{background:linear-gradient(135deg,#e9ebef,#d9dde3)}
.m-desk .dg-row{justify-content:center}
.m-desk .dg-col{flex:none}
.m-wrap{display:flex;gap:16px;align-items:center}
.m-pg{position:relative;width:270px;height:310px;padding:16px 24px;background:#fff;box-shadow:0 2px 6px rgba(16,24,40,.1),0 12px 28px -10px rgba(16,24,40,.25);color:#111;font-family:"Songti SC","SimSun",serif}
.m-desk .m-h1{margin:0 0 3px;font:700 11.5px/1.5 "PingFang SC","SimHei",sans-serif}
.m-desk .m-p{margin:0 0 4px;font-size:9.5px;line-height:1.75;text-indent:2em}
.m-ln{display:grid;gap:5px;margin:2px 0 7px}
.m-ln span{display:block;height:3.5px;border-radius:2px;background:#e3e6eb}
.m-ln span:first-child{margin-left:18px}
.m-im{height:52px;margin:0 30px;overflow:hidden;border-top:1px dashed #f1b5ad;border-bottom:1px dashed #f1b5ad}
.m-im i{display:block;height:120px;margin-top:-40px;background:linear-gradient(#5b8def,#2b579a)}
.m-desk .m-cap{margin:2px 0 6px;text-align:center;font-size:8.5px}
.m-desk .m-orph{position:absolute;left:24px;right:24px;bottom:30px;margin:0;font:700 11.5px/1.5 "PingFang SC","SimHei",sans-serif}
.m-ft{position:absolute;left:0;right:0;bottom:10px;text-align:center;color:#595959;font:8px/1 "Songti SC",serif}
.m-n{position:absolute;display:grid;place-items:center;width:15px;height:15px;border-radius:50%;background:#d92d20;color:#fff;font:700 9px/1 system-ui;box-shadow:0 0 0 2px #fff}
.m-list{display:grid;width:250px;border:1px solid #c9ced6;border-radius:6px;background:#fff;font:10.5px/1.4 system-ui,"PingFang SC",sans-serif;color:#344054;overflow:hidden}
.m-list>p{margin:0;padding:6px 10px;border-bottom:1px solid #e4e7ec;background:#f6f7f9;color:#101828;font-weight:650}
.m-it{display:grid;grid-template-columns:16px minmax(0,1fr) auto;gap:7px;align-items:start;padding:6px 10px;border-bottom:1px solid #f0f2f5}
.m-it i{display:grid;place-items:center;width:15px;height:15px;border-radius:50%;background:#d92d20;color:#fff;font:700 9px/1 system-ui;font-style:normal}
.m-it b{display:block;color:#101828;font-weight:600}
.m-it span{color:#667085}
.m-it em{padding:0 6px;border-radius:8px;font-style:normal;font-size:9.5px;line-height:16px;white-space:nowrap}
.m-it em.h{background:#fde8e6;color:#b42318}
.m-it em.m{background:#fff4d6;color:#93370d}
.m-pdf{display:flex;gap:10px;padding:6px 10px;color:#067647;font-size:10px}
</style>

<div class="dg m-desk"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  const ln = '<div class="m-ln"><span></span><span></span><span></span></div>';
  const page = '<div class="m-pg"><p class="m-h1">2　实施过程</p>' + ln
    + '<p class="m-p">首批 12 家门店于 4 月完成切换，如<b style="font-weight:400;color:#b42318">错误！未找到引用源。</b></p>'
    + '<div class="m-im"><i></i></div><p class="m-cap">图 2-3　切换当天交易量</p>' + ln
    + '<p class="m-orph">2.2　店员培训</p><p class="m-ft">— 7 —</p>'
    + '<span class="m-n" style="left:6px;top:58px">1</span><span class="m-n" style="left:6px;top:96px">2</span><span class="m-n" style="left:6px;top:163px">3</span><span class="m-n" style="left:6px;bottom:30px">4</span></div>';
  const items = [
    ['交叉引用断了', '第 7 页：引用的题注被删，重新插入交叉引用', '高', 'h'],
    ['图片被裁切', '第 7 页：图片段落行距是固定值，改单倍行距', '高', 'h'],
    ['题注跳号', '图 2-1 后直接是图 2-3：编号是手打的，改用插入题注', '中', 'm'],
    ['标题落在页底', '“2.2 店员培训”设与下段同页', '中', 'm'],
  ];
  const list = '<div class="m-list"><p>检查结果 · 先结构后细节</p>' + items.map(([b, s, lv, c], i) => '<div class="m-it"><i>' + (i + 1) + '</i><div><b>' + b + '</b><span>' + s + '</span></div><em class="' + c + '">' + lv + '</em></div>').join('')
    + '<div class="m-pdf"><span>✓ PDF 页数一致</span><span>✓ 字体已嵌入</span><span>✓ 无修订批注</span></div></div>';
  draw(root, '<div class="m-wrap">' + page + list + '</div>', { center: true, min: 0.35 });
}
</script>
