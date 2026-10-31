---
zh: Markdown 转 Word
en: Markdown to Word with Pandoc
aka: pandoc md转docx reference-doc 参考文档 Markdown导出Word 公式转Word 参考文献 AI输出转Word
order: 30
---

## 是什么

用 Pandoc 把 Markdown（包括 AI 输出的 Markdown）转成 .docx：标题、列表、表格、代码、公式、脚注都变成 Word 的原生结构，字体、字号、行距这些格式由一份参考文档 reference.docx 里的样式决定。

## 适合

文档先用 Markdown 写（技术方案、接口说明、AI 起草的报告），最后要交 Word 版；同一份内容要同时出网页和 Word；带 LaTeX 公式、要变成可编辑的 Word 公式。

## 不适合

封面、红头、复杂的合并单元格这类精细版式，转完再到 Word 里补，或者直接用「代码生成 Word」；最终只交 PDF 的先看「生成方案怎么选」。

## 注意

不给 reference.docx 时，转出来是 Pandoc 默认的样式（西文字体、蓝色标题），中文排版还得手调。正确做法是先导出默认参考文档，在 Word 里改好样式再保存，之后每次转换都带上它；要改的是样式定义，文档里的示例文字不影响结果。

## 要点

- 参考文档：pandoc -o reference.docx --print-default-data-file reference.docx 导出默认样式表，在 Word 里改 Normal、Body Text、First Paragraph、Heading 1–3、Compact（紧凑列表）、Table Caption、Image Caption、Source Code 和表格样式 Table，中文字体设在“中文字体”一栏；页边距和页眉页脚也从这份文档继承。
- 转换：pandoc 方案.md -o 方案.docx --reference-doc=reference.docx；加 --toc --toc-depth=3 生成目录，Word 打开后按 F9 更新页码。
- 编号：-N（--number-sections）加的是文字编号；想要 Word 的自动编号，就在 reference.docx 里给 Heading 1–3 挂上多级列表（见「多级编号」），生成后打开核对一遍。
- 段落：Pandoc 的正文用 Body Text，标题后的第一段用 First Paragraph，两个样式都要设首行缩进和行距；个别段落要用特殊样式时，用带 custom-style 属性的 div（整段）或 span（几个字），样式名写参考文档里已有的。
- 表格和图片：管道表格转成 Word 表格并套 Table 样式，表格前后写一行“Table: 表题”生成表题；图片用相对路径，图后用 width 属性（如 80%）控制宽度，单独成段的图片会把替代文字变成图题。
- 公式和文献：美元符号包住的 LaTeX 公式转成可编辑的 Word 公式；参考文献用 --citeproc --bibliography refs.bib，著录格式用 --csl 指定（如 GB/T 7714 对应的 CSL 文件）。
- 分页和清理：Markdown 本身没有分页符，需要时用 openxml 原始块或 Lua filter 插入；中英文之间的空格、全角半角标点，在 Markdown 源文件里先统一。
- 批量：整个目录的 .md 用脚本循环转换，参数固定在 Makefile 或 npm script 里，reference.docx 纳入版本管理。

## 提示词

帮我把 {Markdown 文件或目录} 转成 Word，用 Pandoc。格式要求：{格式要求，如 正文小四宋体 1.5 倍行距首行缩进 2 字符、标题黑体、A4 上下 25mm 左右 28mm}。
1. 先导出默认 reference.docx，按格式要求改 Normal、Body Text、First Paragraph、Heading 1–3、Compact、Table Caption、Image Caption、Source Code 和表格样式 Table，中文字体写在东亚字体里；页边距和页眉页脚也在这份文档里设好。
2. 转换命令带 --reference-doc；{是否需要目录}，需要时加 --toc --toc-depth=3；标题编号用 reference.docx 里挂好的多级列表。
3. 检查 Markdown 源文件：表格都有“Table:”表题，图片用相对路径并写宽度，公式用美元符号包住；需要分页的位置用 Lua filter 处理。
4. 参考文献：{文献要求，如 用 refs.bib 和 GB/T 7714 数字顺序编码制的 CSL，没有就跳过}。
5. 写成一个脚本或 Makefile 目标，一条命令转换整个目录，输出到 dist/；最后说明哪些格式 Pandoc 做不到、需要在 Word 里手工补（如封面、合并单元格）。
