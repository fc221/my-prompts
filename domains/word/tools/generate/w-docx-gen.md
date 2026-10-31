---
zh: 代码生成 Word
en: Generate Word documents with code
aka: python-docx docx.js docx npm Apache POI Open XML SDK 生成docx 导出Word 报告自动生成
order: 10
---

## 是什么

在程序里直接生成 .docx：Python 用 python-docx，Node 和浏览器用 docx（npm 包），Java 用 Apache POI，.NET 用 Open XML SDK。推荐先在 Word 里做好一个带样式的空白模板，代码打开模板只写内容、只引用样式名，格式全由模板决定。

## 适合

系统里的“导出 Word”按钮（巡检报告、合同草稿、周报）；结构固定、按数据生成段落和表格的文档；不能装 Office 的服务器。

## 不适合

版式固定、只替换几个字段的套表文档（录用通知、证明、合同），用「模板填充与批量生成」更省事；内容已经是 Markdown 的用「Markdown 转 Word」；最终只要 PDF 的先看「生成方案怎么选」。

## 注意

代码里设的中文字体经常不生效：python-docx 的 font.name 只改西文字体，中文还要设东亚字体（rFonts 的 w:eastAsia 属性）。最省事的是在模板样式里设好字体，代码只写样式名。目录、页码、交叉引用这些域，代码只能写入域代码，页码数字要等 Word 打开更新后才有。

## 要点

- 模板优先：在 Word 里建好正文、标题 1–3、题注、表格样式（如“三线表”）以及页面设置、页眉页脚，存成 template.docx；python-docx 用 Document('template.docx') 打开，删掉示例段落再写。
- 样式名：内置样式在代码里用英文名（Heading 1、List Number、Caption），中文 Word 里显示为“标题 1”等；自建样式按模板里的名字原样引用，名字不存在会直接报 KeyError。
- python-docx 常用：add_heading(文字, level=1)、add_paragraph(文字, style=…)、add_table(rows, cols, style='三线表')、add_picture(路径, width=Mm(150))、add_page_break()；长度用 Pt、Mm 换算，小四正文的首行缩进 2 字符是 Pt(24)。
- 表格：表头跨页重复要写 XML（行属性 w:tblHeader）；数字在代码里先格式化成千分位、固定小数位的字符串再写入，单元格里段落的 alignment 设为右对齐。
- docx（npm）：new Document 时在 styles 里定义默认字体和 paragraphStyles；字号单位是半磅（size: 24 即 12pt），间距和边距单位是缇（1/20 磅，可用 convertMillimetersToTwip 换算）；Node 里 Packer.toBuffer 写文件，浏览器里 Packer.toBlob 后下载。
- 目录与页码：docx 包用 TableOfContents，并开启 features 里的 updateFields，Word 打开时会提示更新；页脚用 PageNumber.CURRENT 和 PageNumber.TOTAL_PAGES。python-docx 要自己写 TOC、PAGE 域的 XML，再在 settings 里加 w:updateFields。
- 分节和横版：python-docx 用 add_section(WD_SECTION.NEW_PAGE) 新起一节，改 orientation 为横向后还要对调 page_width 和 page_height。
- 验收：生成的文件分别用 Word 和 WPS 打开，样式窗格里显示的是样式名而不是一堆直接格式；再用 LibreOffice 转一次 PDF，核对页数和字体。

## 提示词

给 {项目} 加一个“导出 Word”功能，生成 {文档类型，如 门店巡检报告}，用 {库，如 python-docx 或 docx（npm）}。
1. 先读现有代码：数据从哪来、有没有现成的导出逻辑和模板文件；没有模板就先列出需要在 Word 里建的样式，我来做 template.docx。
2. 代码打开模板写内容，只引用样式名（内置样式用英文名 Normal、Heading 1–3、Caption，自建样式如 {表格样式名}），不在代码里设字体字号；中文字体由模板样式的东亚字体决定。
3. 文档结构：{结构，如 封面信息、巡检概况、问题清单表、整改建议、签字栏}；问题清单表的表头跨页重复，金额和数量先格式化再写入，并右对齐。
4. 需要目录和页码时写入 TOC、PAGE 域，并设置打开时更新域；有横排宽表的单独分节改为横向。
5. 文件名用 {命名规则，如 巡检报告_门店编号_日期.docx}；接口直接返回文件流时设好 Content-Disposition，中文文件名按 RFC 5987 编码。
6. 加一个测试：用一份示例数据生成文件，再读回来检查标题数量、表格行数和样式名。最后说明改了哪些文件，以及怎么在本地生成一份看效果。
