---
zh: 图片排版
en: Image layout
aka: 图片环绕 嵌入型 图片显示不全 图片只显示一条 图片对齐 多图并排 压缩图片 图片乱跑 子图
order: 30
---

## 是什么

Word 插图的规范做法：正文图片用嵌入型、单独成段居中，宽度按版心统一，多张图用无框线表格并排，图题跟在图下；只有小图配文字时才用环绕。这样增删文字时图片不乱跑，也不会被分页切断。

## 适合

报告、论文、说明书、操作手册里的截图、照片、图表；产品介绍里的图文混排。

## 不适合

封面、海报那种图压字的自由排版看「杂志感排版」；导出 PDF 后的图片分辨率和体积看「图片与分辨率」。

## 注意

图片只显示一窄条、上半截不见了，几乎都是所在段落的行距是“固定值”（比如正文样式设了固定值 20 磅）。图片所在段落用单独的“图片”样式：单倍行距、首行缩进 0、居中。

## 要点

- 环绕方式的取舍：正文插图用“嵌入型”，图片跟着文字走，像一个大字符；小图配说明用“四周型”或“紧密型”，锚点锁定在所属段落；“衬于文字下方”留给背景和水印，“浮于文字上方”留给页眉标识和印章。
- “图片”样式：居中、单倍行距、首行缩进 0、段前 6 磅、与下段同页，图和图题不会分到两页。
- 宽度统一：整宽图等于版心宽，半宽图为（版心宽 − 5mm）÷ 2；在布局选项 → 大小里锁定纵横比，只改宽度。
- 多图对齐：并排用 1 行 N 列的无框线表格，每格一张图加子图题“(a) 改造前”“(b) 改造后”，表格下方再放总图题；浮动图片要对齐时，按住 Shift 多选 → 图片格式 → 对齐 → 顶端对齐、横向分布。
- 题注：图题在图下方，用插入题注生成“图 2-1”，五号居中，做法见「题注与交叉引用」。
- 体积：图片格式 → 压缩图片，打印用 220ppi、屏幕阅读用 150ppi，勾选“删除图片的剪裁区域”；文件 → 选项 → 高级 → 图像大小和质量里可以设默认分辨率。
- 截图：裁掉浏览器边框和无关区域再插入；白底截图加 0.5 磅浅灰边框，和页面区分开；同一份文档里截图的缩放比例保持一致。
- 替代文字：右键 → 查看替代文字，用一句话写清图里是什么，读屏软件和导出无障碍 PDF 时会用到。

## 提示词

帮我整理{文档名称}里的图片排版。
1. 正文插图全部改为嵌入型、单独成段，套“图片”样式：居中、单倍行距、首行缩进 0、段前 6 磅、与下段同页。
2. 宽度统一：整宽图 {整宽，默认 等于版心宽}，半宽图两张并排；锁定纵横比，只按宽度缩放。
3. 需要对比的图（如 {对比内容，如 门店改造前后}）用 1 行 2 列无框线表格并排，子图题写“(a)…”“(b)…”，下方一个总图题。
4. 每张图下方用插入题注生成“图 2-1　{图题}”，五号居中；正文里提到图片的地方改成交叉引用。
5. 压缩图片到 {分辨率，如 220ppi} 并删除剪裁区域，给每张图补一句替代文字；最后列出被拉伸变形、分辨率太低（打印会糊）的图。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.m-desk{background:linear-gradient(135deg,#e9ebef,#d9dde3)}
.m-desk .dg-row{justify-content:center}
.m-desk .dg-col{flex:none}
.m-wrap{display:flex;gap:16px;align-items:center}
.m-pg{width:380px;padding:20px 36px 16px;background:#fff;box-shadow:0 2px 6px rgba(16,24,40,.1),0 12px 28px -10px rgba(16,24,40,.25);color:#111;font-family:"Songti SC","SimSun",serif}
.m-desk .m-p{margin:0;font-size:11px;line-height:1.8;text-indent:2em;color:#333}
.m-im{position:relative;border-radius:1px;overflow:hidden}
.m-shop{height:96px;margin-top:6px;background:linear-gradient(180deg,transparent 58%,#c9b79c 58% 62%,#a88f6e 62%),linear-gradient(90deg,#f3efe6 0 8%,transparent 8% 92%,#f3efe6 92%),repeating-linear-gradient(90deg,#3e6a8a 0 26px,#f6f2ea 26px 30px),linear-gradient(#2f4f66,#4c7896)}
.m-shop::after{content:"";position:absolute;left:38%;top:18%;width:24%;height:40%;background:linear-gradient(#ffe7a8,#f6c25b);border-radius:2px;box-shadow:0 0 0 3px #f6f2ea}
.m-desk .m-cap{margin:0;padding:3px 0 6px;text-align:center;font-size:10px;line-height:1.5}
.m-cap b{font-weight:400;padding:0 1px;background:#e4e7ec}
.m-two{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:4px;outline:1px dashed #c9d6ea;outline-offset:2px}
.m-two figure{margin:0;display:grid;gap:2px}
.m-a{height:64px;background:linear-gradient(160deg,#d8d4cc,#b9b2a6 60%,#9c958a)}
.m-a::after{content:"";position:absolute;left:12%;right:12%;bottom:0;height:46%;background:repeating-linear-gradient(90deg,#8d8579 0 14px,#a49c90 14px 16px)}
.m-b{height:64px;background:linear-gradient(160deg,#e7f0f6,#bcd3e4 60%,#8fb3cf)}
.m-b::after{content:"";position:absolute;left:12%;right:12%;bottom:0;height:46%;background:repeating-linear-gradient(90deg,#f7fafc 0 14px,#5b8def 14px 16px);border-top:3px solid #2b579a}
.m-two figcaption{text-align:center;font-size:9.5px;line-height:1.4}
.m-lbl{display:block;margin:2px 0 0;text-align:right;color:#2b579a;font:9px/1 system-ui,"PingFang SC",sans-serif}
.m-side{display:grid;gap:10px;width:168px}
.m-bad{padding:8px 10px;border:1px solid #f1b5ad;border-radius:6px;background:#fff;font:10.5px/1.35 system-ui,"PingFang SC",sans-serif;color:#b42318}
.m-bad b{display:block;margin-bottom:5px;font-size:11px}
.m-cut{position:relative;height:14px;overflow:hidden;margin:0 0 5px;border-top:1px dashed #f1b5ad;border-bottom:1px dashed #f1b5ad}
.m-cut i{position:absolute;left:10%;right:10%;bottom:0;height:70px;background:linear-gradient(#2f4f66,#4c7896 50%,#c9b79c 50%,#a88f6e)}
.m-ann{display:grid;font:11px/1.35 system-ui,"PingFang SC",sans-serif;color:#344054}
.m-ann p{margin:0;padding:5px 0 5px 10px;border-left:2px solid #2b579a}
.m-ann b{display:block;color:#101828;font-size:11.5px}
.m-ann span{color:#667085}
</style>

<div class="dg m-desk"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  const page = '<div class="m-pg"><p class="m-p">10 月起，湖滨店按新版陈列标准完成门头和货架改造。</p>'
    + '<div class="m-im m-shop"></div><p class="m-cap"><b>图 3-1</b>　湖滨店改造后门头（嵌入型，宽 = 版心）</p>'
    + '<div class="m-two"><figure><div class="m-im m-a"></div><figcaption>(a) 改造前</figcaption></figure><figure><div class="m-im m-b"></div><figcaption>(b) 改造后</figcaption></figure></div>'
    + '<span class="m-lbl">1 行 2 列无框线表格</span><p class="m-cap"><b>图 3-2</b>　货架陈列改造前后对比</p></div>';
  const ann = [['嵌入型', '正文插图默认，跟着文字走'], ['四周型 / 紧密型', '小图配说明时才用'], ['图片样式', '居中、单倍行距、与下段同页'], ['压缩图片', '打印 220ppi，屏幕 150ppi']];
  const side = '<div class="m-side"><div class="m-bad"><b>✕ 段落行距是固定值</b><div class="m-cut"><i></i></div>图片被裁成一窄条</div><div class="m-ann">' + ann.map(([x, y]) => '<p><b>' + x + '</b><span>' + y + '</span></p>').join('') + '</div></div>';
  draw(root, '<div class="m-wrap">' + page + side + '</div>', { center: true, min: 0.35 });
}
</script>
