---
zh: 页面设置与版心
en: Page setup and type area
aka: 页边距 纸张大小 装订线 对称页边距 文档网格 版心 每页行数 每行字数 对齐到网格 页眉距边界
order: 10
---

## 是什么

布局 → 页面设置里定的纸张、方向、页边距、装订线和文档网格。纸张减去四边页边距剩下的区域叫版心，正文、表格、图片的宽度都以版心为准；版心定了，每页排多少行、每行多少字也就定了。

## 适合

新建任何正式文档的第一步；论文、标书、公文、合同这类对边距和行数有明确要求的文档；要双面打印、装订成册的文档。

## 不适合

页眉页脚里放什么、怎么排看「页眉页脚美化」；同一份文档里有几页要横排或换边距，看「分节与页码」。

## 注意

先定页面再排内容：写完再改边距，表格宽度、图片大小、目录的页码制表位都要跟着返工。另一个常见坑是“对齐到网格”：定义了文档网格后，段落会被吸到网格线上，实际行距比设的大，改字号时行距忽大忽小。

## 要点

- 纸张 A4（210×297mm）纵向；Word 中文版的“常规”边距是上下 2.54cm、左右 3.18cm，版心宽 14.64cm。
- 边距先照单位或学校的规定；没有规定时，报告类用上下 25mm、左右 25–30mm；公文是上 37mm、左 28mm、版心 156×225mm，见「公文格式」。
- 版心宽 = 纸宽 − 左边距 − 右边距；表格“根据窗口调整”后的宽度、图片的最大宽度都等于版心宽，改边距后整篇检查一次。
- 装订：单面打印用左侧装订线 5–10mm；双面打印选“多页：对称页边距”，左右边距变成内侧和外侧，内侧比外侧多 5mm 左右。
- 页眉页脚：默认页眉距边界 1.5cm、页脚距边界 1.75cm；页眉内容的高度要留在上边距以内，放了大标识或多行文字时正文会被往下推。
- 文档网格：公文和要求“每页 X 行、每行 Y 字”的文档用“指定行和字符网格”；其余文档选“无网格”，或在正文样式的段落设置里取消“如果定义了文档网格，则对齐到网格”。
- 单位：文件 → 选项 → 高级 → 显示 → 度量单位选毫米或厘米，标尺和对话框都用同一单位，避免磅、字符、厘米混着算。
- 定好后在页面设置里点“设为默认值”或存进模板；整篇只有一种版式时，“应用于”选“整篇文档”。

## 提示词

帮我把{文档名称}的页面设置成：{纸张，默认 A4 纵向}，上 {上边距} mm、下 {下边距} mm、左 {左边距} mm、右 {右边距} mm，{装订方式，如 单面打印左侧装订线 5mm，或 双面打印对称页边距}。
1. 页眉距边界 15mm、页脚距边界 17.5mm；度量单位统一用毫米。
2. 文档网格：{网格要求，如 每页 22 行、每行 28 字，或 无网格}；不用网格时，正文样式取消“对齐到网格”。
3. 按新的版心宽度调整：表格设为根据窗口调整，超出版心的图片等比缩到版心宽，目录和页眉里的右对齐制表位挪到版心右边缘。
4. 页面设置应用于整篇文档；需要横排的页面先问我是哪几页，再用分节单独设置。
5. 最后告诉我版心尺寸（宽×高 mm）、每页大约多少行，以及调整前后的总页数。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.m-desk{background:linear-gradient(135deg,#e9ebef,#d9dde3)}
.m-desk .dg-row{justify-content:center}
.m-desk .dg-col{flex:none}
.m-wrap{display:flex;gap:18px;align-items:center}
.m-sp{display:grid;gap:6px;justify-items:center}
.m-pair{display:flex;gap:3px;filter:drop-shadow(0 2px 3px rgba(16,24,40,.12)) drop-shadow(0 10px 14px rgba(16,24,40,.12))}
.m-pg{position:relative;width:189px;height:267px;background:#fff;font:9.5px/1 system-ui,"PingFang SC",sans-serif;color:#2b579a}
.m-ba{position:absolute;top:22.5px;bottom:22.5px;display:grid;align-content:start;gap:5px;padding:8px 8px 0;border:1px dashed #2b579a;background:rgba(43,87,154,.05)}
.m-pg.l .m-ba{left:22.5px;right:27px}
.m-pg.r .m-ba{left:27px;right:22.5px}
.m-ba span{display:block;height:4px;border-radius:2px;background:#d5dae2}
.m-ba span.h{width:46%;height:6px;background:#8a94a6}
.m-ba span.i{text-indent:0;margin-left:9px}
.m-ba .m-tb{height:34px;border-radius:1px;background:repeating-linear-gradient(#fff 0 7px,#d5dae2 7px 8px),#fff;border:1px solid #b9c2cf}
.m-ba .m-im{height:44px;border-radius:2px;background:linear-gradient(135deg,#c9d7ee,#e7edf6 55%,#d6dfeb)}
.m-w{position:absolute;left:-1px;right:-1px;bottom:7px;border-top:1px solid #2b579a;text-align:center}
.m-w::before,.m-w::after{content:"";position:absolute;top:-4px;height:7px;border-left:1px solid #2b579a}
.m-w::before{left:0}
.m-w::after{right:0}
.m-w b{position:relative;top:-6px;padding:0 4px;background:#f3f6fb;font-weight:650}
.m-m{position:absolute;font-weight:600;white-space:nowrap}
.m-m.t{top:7px;left:50%;transform:translateX(-50%)}
.m-m.b{bottom:7px;left:50%;transform:translateX(-50%)}
.m-m.v{top:50%;writing-mode:vertical-rl;transform:translateY(-50%)}
.m-pg.l .m-m.o,.m-pg.r .m-m.n{left:6px}
.m-pg.l .m-m.n,.m-pg.r .m-m.o{right:6px}
.m-m.n{color:#b54708}
.m-cap{margin:0;color:#475467;font:11px/1.3 system-ui,"PingFang SC",sans-serif}
.m-ann{display:grid;width:168px;font:11px/1.35 system-ui,"PingFang SC",sans-serif;color:#344054}
.m-ann p{margin:0;padding:6px 0 6px 10px;border-left:2px solid #2b579a}
.m-ann b{display:block;color:#101828;font-size:11.5px}
.m-ann span{color:#667085}
.m-ann p.w{border-left-color:#d92d20}
</style>

<div class="dg m-desk"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  const body = '<span class="h"></span><span class="i"></span><span></span><span></span><div class="m-tb"></div><span class="i"></span><span></span><div class="m-im"></div><span></span><span></span>';
  const pg = (side, no) => '<div class="m-pg ' + side + '"><span class="m-m t">上 25</span><span class="m-m b">下 25 · ' + no + '</span><span class="m-m v o">外侧 25</span><span class="m-m v n">内侧 30</span><div class="m-ba">' + body + '<p class="m-w"><b>版心 155</b></p></div></div>';
  const ann = [['A4 · 210×297mm', '常规默认：上下 2.54、左右 3.18cm'], ['版心宽 = 纸宽 − 左 − 右', '表格、图片最宽就到这里'], ['双面打印', '对称页边距，内侧多约 5mm'], ['页眉 / 页脚距边界', '15mm / 17.5mm'], ['对齐到网格', '不用网格就取消，行距才准', 'w']];
  draw(root, '<div class="m-wrap"><div class="m-sp"><div class="m-pair">' + pg('l', '第 2 页') + pg('r', '第 3 页') + '</div><p class="m-cap">双面打印 · 对称页边距（单位 mm）</p></div><div class="m-ann">'
    + ann.map(([b, s, c]) => '<p' + (c ? ' class="' + c + '"' : '') + '><b>' + b + '</b><span>' + s + '</span></p>').join('') + '</div></div>', { center: true, min: 0.35 });
}
</script>
