---
zh: 代码直接绘制
en: Programmatic PDF drawing (pdf-lib, PDFKit, ReportLab)
aka: pdf-lib PDFKit ReportLab PDFBox 坐标绘制 套打 叠加文字
order: 80
---

## 是什么

不经过 HTML 和排版语言，直接在代码里调用 PDF 库：设字体、在坐标上写字、画线、贴图、翻页。最常用的三个：pdf-lib（JavaScript，擅长修改现有 PDF、在底版上叠加内容）、PDFKit（Node，有自动换行和续页的流式文本）、ReportLab（Python，Platypus 能排段落和跨页表格）。

## 适合

在设计好的 PDF 底版上套打证书、票据、快递面单；版式固定、量很大的单据；不能装浏览器的运行环境；位置要精确到毫米。

## 不适合

大段图文混排和复杂表格用代码画很费劲，看「无头浏览器打印」或「Typst 排版」；底版已有表单域的看「填写表单」。

## 注意

PDF 的坐标单位是 pt（1pt = 1/72 英寸 ≈ 0.353mm），A4 是 595.28 × 841.89pt。PDF 本身和 pdf-lib 的原点在左下角，PDFKit 换成了左上角，混用时最容易把内容画到页面外。pdf-lib 的 drawText 不会自动换行，要用 font.widthOfTextAtSize 量宽自己断行，中文要能逐字断开。

## 要点

- pdf-lib：PDFDocument.load 打开底版，或 PDFDocument.create 新建；中文先 registerFontkit(fontkit)，再 embedFont 并开 subset: true，只嵌入用到的字；写字用 page.drawText，传 x、y、size、font、color，旋转用 degrees(角度)。
- pdf-lib 不能加密也不能解密：PDFDocument.load 遇到加密文件会抛错，ignoreEncryption 只是跳过检查，内容照样读不对；加密文件先按「加密与权限」处理。
- PDFKit：new PDFDocument 时传 size: 'A4'、bufferPages: true；doc.registerFont 注册中文字体（TTF、OTF 都行）；内容写完后用 bufferedPageRange 和 switchToPage 回到每页补页码；输出是流，直接 pipe 到文件或 HTTP 响应。
- ReportLab：pdfmetrics.registerFont(TTFont(...)) 注册中文字体，只支持 TrueType 轮廓的 .ttf，CFF 轮廓的 .otf（不少思源字体发行版就是）会报错，要换 TTF 版本；段落样式设 wordWrap='CJK' 才会按中文断行；Table 传 repeatRows=1 跨页重复表头。
- ReportLab 的页眉页脚在 build 的 onFirstPage、onLaterPages 回调里画；“共 Y 页”要两遍构建，或用自定义 Canvas 在保存前统一补写。
- 套打：先在底版上量出每个字段的坐标框（左下角 x、y 和宽高），写进配置文件，代码按配置画；文字超出框宽时逐级缩小字号到 8pt，仍放不下就截断并记录。
- Java 用 Apache PDFBox（Apache 2.0）或 OpenPDF；iText 是 AGPL 或商业授权，闭源商业服务要先解决授权。
- 量级：单页单据几毫秒到几十毫秒，单核每秒几十到上百份；几千页的报表 ReportLab 也在数秒内。

## 提示词

给 {服务} 加一个 {文档类型}（如培训结业证书）套打功能：在设计稿导出的 PDF 底版 {底版文件} 上填入 {字段列表}（如姓名、课程名、日期、证书编号），用 {pdf-lib 或 ReportLab + pypdf}。
1. 先读现有代码和底版，量出每个字段的坐标框（左下角为原点，单位 pt），写进 {配置文件}，代码只读配置、不写死坐标。
2. 中文字体用项目里的字体文件：pdf-lib 先 registerFontkit 再 embedFont 并开 subset；ReportLab 用 TTF 版本的字体。
3. 每个字段支持左对齐、居中、右对齐；超出框宽时逐级缩小字号到 8pt，仍放不下就截断，并在结果里标出这条记录。
4. 底版是加密文件、页数不是 1 页、页面带旋转（/Rotate）时，先报错说明，不输出错位的结果。
5. 批量模式：输入一份 CSV，每行出一份 PDF，文件名用证书编号；单行出错跳过并记录，结束后输出成功和失败清单。
6. 生成后抽 3 份用 pdftotext 检查文字能正确复制出来。
最后说明改了哪些文件，并附一张调试图：调试模式下把每个字段框画成红色细线叠在底版上。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, code } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, code([{ t: 'pdf-lib 套打结业证书', text: `
const pdf = await PDFDocument.load(底版)
pdf.registerFontkit(fontkit)
const font = await pdf.embedFont(字体, { subset: true })
const page = pdf.getPage(0)  // A4 = 595.28 × 841.89 pt
// 原点在左下角；每个字段的坐标框写在 fields.json
for (const f of fields) {
  const t = row[f.key]; let size = f.size
  while (font.widthOfTextAtSize(t, size) > f.w && size > 8) size--
  page.drawText(t, { x: f.x, y: f.y, size, font })
}
` }]), { title: '代码直接绘制 · 按坐标写字' });
}
</script>
