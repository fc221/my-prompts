---
zh: 页眉页脚美化
en: Header and footer design
aka: 页眉 页脚 页眉横线 删除页眉横线 页眉显示章标题 StyleRef 水印 机密 样稿 公司标识 页眉logo 第X页共Y页
order: 30
---

## 是什么

页眉页脚放文档名、章名、单位标识、页码和保密标记，用页眉页脚样式、制表位和域来排：每页自动显示当前章名，奇偶页内外侧对称，水印每页都在又不挡字。

## 适合

论文、报告、标书、制度手册、产品说明书；企业对外文件要带标识、文件编号和版本号；内部稿要标“机密”“样稿”。

## 不适合

公文不设页眉，页码按「公文格式」的规定排；分节、页码起始值和格式看「分节与页码」。

## 注意

页眉下的那条横线是“页眉”样式的段落下边框，不是画上去的线：要删就把页眉样式的边框设为无，要改就改这条边框的线型和粗细。页眉里的文字和标识都靠样式、制表位和图片位置固定，用文本框拖出来的位置换一页、换一节就会飘。

## 要点

- 页眉样式：小五或五号宋体（9–10.5pt），颜色深灰 #595959；横线用段落下边框，0.75 磅单线、距文字 1 磅；页脚样式同字号，页码用 Times New Roman。
- 左中右三段：页眉样式自带一个居中、一个右对齐制表位，把它们挪到版心中点和右边缘，左边写文档名、右边写章名，中间用 Tab 隔开。
- 自动章名：插入 → 文档部件 → 域 → StyleRef，样式名选“标题 1”，页眉随所在章自动变化；要带“第2章”这样的编号就勾选“插入段落编号”。
- 奇偶页不同：偶数页页眉靠左写文档名，奇数页页眉靠右写章名；页码放外侧，偶数页靠左、奇数页靠右。
- 标识：图片插在页眉里，高度不超过 10mm，环绕方式选“浮于文字上方”，位置相对页边距固定；要通栏色条就在页眉里放一个铺满页宽的形状，衬于文字下方；封面用“首页不同”不带这些。
- 文件信息：受控文件在页眉右侧写“文件编号 QM-OP-012 · 版本 V2.1”，页脚写“第 X 页 共 Y 页”（PAGE 和 NUMPAGES 域）。
- 水印：设计 → 水印 → 自定义水印；文字水印写“机密”“样稿”“内部资料”，选半透明、斜式；图片水印放公司标识并勾选“冲蚀”。水印存在页眉里，分节后逐节检查每节都带上了。
- 克制：页眉页脚各放 1–2 项信息，字号比正文小两级；装饰色只用一种，和标题色一致。

## 提示词

帮我美化{文档名称}的页眉页脚，文档名“{文档名}”，打印方式 {单面或双面}。
1. 页眉页脚用样式控制：小五宋体、颜色 #595959，页码用 Times New Roman；页眉下方一条 0.75 磅单线（页眉样式的下边框）；封面不带页眉页脚。
2. 页眉内容：单面时左侧文档名、右侧当前章名；双面时偶数页左侧文档名、奇数页右侧当前章名。章名用 StyleRef 域引用标题 1，带章编号。
3. 页脚：“第 X 页 共 Y 页”，用 PAGE 和 NUMPAGES 域；单面居中，双面放外侧。
4. 标识：{标识要求，如 页眉左侧放公司标识，高 8mm}；水印：{水印要求，如 全文加“内部资料”半透明斜式文字水印}，每一节都要有。
5. 用制表位对准版心中点和右边缘来定位，最后逐节说明页眉页脚的内容，以及是否链接到前一节。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.m-desk{background:linear-gradient(135deg,#e9ebef,#d9dde3)}
.m-desk .dg-row{justify-content:center}
.m-desk .dg-col{flex:none}
.m-wrap{display:flex;gap:16px;align-items:center}
.m-pair{display:flex;gap:4px;filter:drop-shadow(0 2px 3px rgba(16,24,40,.12)) drop-shadow(0 10px 14px rgba(16,24,40,.12))}
.m-pg{position:relative;display:flex;flex-direction:column;width:210px;height:290px;padding:14px 22px 12px;background:#fff;overflow:hidden;font-family:"Songti SC","SimSun",serif;color:#111}
.m-hd{display:flex;align-items:center;gap:6px;padding-bottom:3px;border-bottom:.75px solid #595959;color:#595959;font-size:8.5px;line-height:1.3;white-space:nowrap}
.m-hd.r{justify-content:flex-end}
.m-logo{display:grid;place-items:center;width:14px;height:14px;border-radius:3px;background:#2b579a;color:#fff;font:700 7px/1 system-ui}
.m-fd{padding:0 2px;background:#e4e7ec}
.m-bd{display:grid;align-content:start;gap:5px;margin-top:14px}
.m-bd span{display:block;height:3.5px;border-radius:2px;background:#dde1e7}
.m-bd span.i{margin-left:12px}
.m-bd .h{margin:4px 0 2px;color:#111;font:700 10px/1.4 "PingFang SC","SimHei",sans-serif}
.m-bd .tb{height:42px;border-top:1.2px solid #444;border-bottom:1.2px solid #444;background:repeating-linear-gradient(transparent 0 9px,#e4e7ec 9px 10px)}
.m-desk .m-ft{margin-top:auto;display:flex;color:#595959;font:8.5px/1 "Times New Roman","Songti SC",serif;white-space:nowrap}
.m-ft.r{justify-content:flex-end}
.m-wm{position:absolute;left:50%;top:55%;transform:translate(-50%,-50%) rotate(-35deg);color:rgba(180,35,24,.13);font:700 34px/1 "PingFang SC","SimHei",sans-serif;letter-spacing:.12em;white-space:nowrap;pointer-events:none}
.m-tag{position:absolute;padding:1px 5px;border-radius:8px;background:#2b579a;color:#fff;font:9px/1.4 system-ui,"PingFang SC",sans-serif;white-space:nowrap}
.m-ann{display:grid;width:150px;font:11px/1.35 system-ui,"PingFang SC",sans-serif;color:#344054}
.m-ann p{margin:0;padding:6px 0 6px 10px;border-left:2px solid #2b579a}
.m-ann b{display:block;color:#101828;font-size:11.5px}
.m-ann span{color:#667085}
</style>

<div class="dg m-desk"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  const ls = (n) => '<span class="i"></span>' + '<span></span>'.repeat(n);
  const even = '<div class="m-pg"><p class="m-hd"><span class="m-logo">QM</span>门店运营手册（2026 版）</p><div class="m-bd">' + ls(3) + '<div class="tb"></div>' + ls(2) + '<p class="h">2.2　开店检查清单</p>' + ls(3) + '</div><p class="m-ft">第 6 页　共 48 页</p><span class="m-wm">内部资料</span><span class="m-tag" style="left:22px;bottom:30px">偶数页 · 外侧在左</span></div>';
  const odd = '<div class="m-pg"><p class="m-hd r"><span class="m-fd">第2章　门店开闭店流程</span></p><div class="m-bd"><p class="h">2.3　闭店盘点</p>' + ls(4) + ls(3) + ls(3) + '</div><p class="m-ft r">第 7 页　共 48 页</p><span class="m-wm">内部资料</span><span class="m-tag" style="right:22px;bottom:30px">奇数页 · 外侧在右</span></div>';
  const ann = [['页眉横线', '页眉样式的下边框，0.75 磅'], ['章名自动变', 'StyleRef 引用标题 1，灰底是域'], ['奇偶页不同', '文档名在偶数页，章名在奇数页'], ['水印', '半透明斜式，存在页眉里']];
  draw(root, '<div class="m-wrap"><div class="m-pair">' + even + odd + '</div><div class="m-ann">' + ann.map(([b, s]) => '<p><b>' + b + '</b><span>' + s + '</span></p>').join('') + '</div></div>', { center: true, min: 0.35 });
}
</script>
