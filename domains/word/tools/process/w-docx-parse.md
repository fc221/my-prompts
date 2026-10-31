---
zh: 读取与提取内容
en: Read and extract Word content
aka: 读取docx 解析Word 提取表格 docx转文本 python-docx读取 mammoth docx转html 合并单元格 自动编号丢失 doc转docx 字段抽取
order: 30
---

## 是什么

用程序读出 .docx 里的内容：段落文字和样式、各级标题、表格、页眉页脚、批注、图片，按文档顺序整理成 JSON、Markdown 或数据库记录。.docx 本质是一个 zip 包，正文在 word/document.xml，样式、编号、页眉、批注、图片各有单独的文件。

## 适合

把合同、制度、标书、简历批量入库或做检索；从一批申请表里抽固定字段；把 Word 内容交给 AI 审阅前先转成结构化文本；写格式自查脚本。

## 不适合

扫描件转成的 Word（里面只有图片）要先做文字识别，看「扫描件识别」；PDF 的提取看「提取文字与表格」；只想把 Word 转成 Markdown 看看，用 pandoc 一条命令（pandoc 文件.docx -t gfm）就够了。

## 注意

自动编号（1.1、第一条、（一））不在段落文字里，是 Word 显示时按编号定义现算出来的，直接读 text 会丢，条款号就对不上。要么根据段落的 numPr（编号 id 和级别 ilvl）自己推算，要么先用 pandoc 转 Markdown 保留列表结构。另外 .docx 里没有“第几页”的信息，要按页定位就先转 PDF 再读。

## 要点

- 按顺序读：python-docx 用 doc.iter_inner_content() 按文档顺序拿到段落和表格（doc.paragraphs 会跳过表格），每段记下 style.name 和文字，Heading 1–3 拼成“章 > 节”的路径。
- 表格：用 table.rows、row.cells 逐格读；合并单元格会以同一个单元格重复出现，按底层的 cell._tc 去重；输出成二维数组，同时记下表格前最近的标题和表题。
- 正文以外的部分：页眉页脚用 section.header、section.footer（还有 first_page_header、even_page_header）；文本框在 w:txbxContent 里，脚注在 word/footnotes.xml，这些 doc.paragraphs 都读不到，要单独遍历 XML。
- 批注和修订：python-docx 1.2 起用 doc.comments 读批注；带修订的文档先接受或拒绝全部修订再读，否则删掉的字和新加的字会混在一起。
- 图片：解压后在 word/media/ 下；要知道图片在哪一段，看段落里 a:blip 的关系 id，再到 word/_rels/document.xml.rels 里对应文件名。
- 转 HTML 或 Markdown：mammoth 按样式映射把 docx 转成干净的 HTML（如“标题 1”映射成 h1），字体颜色这类视觉格式会被忽略；pandoc 转 Markdown 能保留标题、列表和简单表格。
- 旧格式和异常：.doc、.wps 先用 soffice --headless --convert-to docx 转换再读；加密文件打开就会报错，跳过并记录，找对方要无密码版本。
- 输出：每个块带上类型（标题、段落、表格、图片）、层级路径和序号，方便回溯原文；全角空格、不间断空格、软回车统一清理后再入库。

## 提示词

帮我写一个从 {文档类型，如 供应商合同} 的 .docx 里提取内容的 Python 脚本，输入是 {目录}，输出 {输出格式，如 每份文件一个 JSON}。
1. 按文档顺序读段落和表格（iter_inner_content），标题按 Heading 1–3 组成层级路径；条款的自动编号根据 numPr 推算出来，拼回条款文字前面。
2. 表格输出成二维数组，合并单元格去重，并记下每张表前面最近的标题和表题。
3. 另外读取页眉页脚、文本框、脚注和批注；带修订的文件先列出来，提示我先处理修订。
4. 从正文中抽取这些字段：{字段清单，如 合同编号、甲乙方名称、合同金额、签订日期、有效期、付款条款}，每个字段同时记下来源段落的路径和原文；找不到的字段留空并标记，不要推测。
5. .doc 和 .wps 先用 LibreOffice 转成 docx；加密或损坏的文件跳过并记录原因。
6. 最后输出处理汇总（成功数、失败数、各字段缺失数），并抽 2 份文件写出提取结果和原文的对照。
