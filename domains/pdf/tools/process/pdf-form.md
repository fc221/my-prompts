---
zh: 填写表单
en: Fill PDF forms
aka: AcroForm 表单域 PDF表单 填表 扁平化 flatten XFA
order: 30
---

## 是什么

PDF 里可以带交互表单域（AcroForm）：文本框、勾选框、单选、下拉、签名域。程序按字段名把数据填进去，再决定保留可编辑，还是“扁平化”成普通页面内容。常用在申请表、报销单、入职登记表这类有固定官方模板的文档上。

## 适合

对方给了带表单域的 PDF 模板；同一张表要给很多人各填一份；填完要锁定不让改。

## 不适合

模板没有表单域、只是一张画好格子的页面，按坐标叠加文字，看「代码直接绘制」；表单是自己设计的，直接用 HTML 或 Typst 生成整份文档更省事，看「生成方案怎么选」。

## 注意

先确认表单类型。XFA 表单（老式设计器做的动态表单）在 PDF 2.0 里已被废弃，pdf-lib、pypdf 都填不了；同时带 AcroForm 和 XFA 的混合表单，可以删掉 XFA 部分（pdf-lib 的 form.deleteXFA）只填 AcroForm，纯 XFA 的只能请对方换模板。中文值必须嵌入中文字体并重新生成字段外观，否则显示成空白、方框，或保存时报 WinAnsi 编码错误。

## 要点

- 先列字段：pdf-lib 用 form.getFields() 打印名称和类型，pypdf 用 reader.get_fields()，pdftk 用 dump_data_fields_utf8；把“业务字段 → 表单字段名”的映射写进配置，字段名常是 topmostSubform[0].Page1[0].姓名[0] 这种长名字。
- pdf-lib：getTextField(名).setText、getCheckBox(名).check、getRadioGroup(名).select、getDropdown(名).select；中文先 registerFontkit、embedFont，再调 form.updateFieldAppearances(中文字体)。
- pypdf：PdfWriter(clone_from=reader) 后用 update_page_form_field_values 填值；auto_regenerate 一般设 False，免得阅读器打开时弹出“是否保存更改”。
- 勾选框的值是它的导出值（常见 Yes、On 或自定义名字），先读出可选值再填，直接填 true 不一定生效。
- 扁平化：pdf-lib 用 form.flatten()；pypdf 填值时传 flatten=True，再用 remove_annotations(subtypes="/Widget") 去掉字段。扁平化时字体可以子集化；保留可编辑时要嵌入完整字体，否则用户后来输入的新字显示不出来。
- 长文本：单行框放不下时逐级缩小字号到 7pt，仍放不下就报告该字段，多行框开 multiline；金额、日期在填之前按模板要求格式化（如 1,280.00、2026 年 10 月 29 日）。
- 用户上传的模板先检查：是否加密、是否 XFA、字段数是否为 0（多半是扫描件或没有表单域）；限制大小、设超时、在隔离环境里处理。

## 提示词

写一个脚本把 {数据来源}（如员工入职信息 CSV）填进 {表单模板}（如社保登记表 PDF），每行出一份。
1. 先用 {pdf-lib 或 pypdf} 列出模板里所有字段的名称、类型和勾选框的导出值，生成映射配置 {映射文件}，脚本只按配置填值。
2. 填之前检查模板：加密就要求提供密码；纯 XFA 表单直接报错说明；混合表单删掉 XFA 后再填；没有任何字段时提示“模板没有表单域，需要改用坐标套打”。
3. 中文值嵌入项目里的中文字体并重新生成字段外观；勾选框按导出值勾选；日期写成 {日期格式}，金额保留两位小数。
4. 文本超出字段宽度时逐级缩小字号到 7pt，仍放不下就在结果清单里标出“行号 + 字段名”。
5. 输出方式 {是否扁平化}：扁平化的用子集字体，保留可编辑的嵌入完整字体。
6. 某行缺必填字段时跳过并记录，结束后输出成功数和失败清单；随机抽 3 份用 pdftotext 检查中文能正确复制。
最后说明脚本用法和映射配置的格式。
