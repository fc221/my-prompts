---
zh: 代码生成 Excel
en: Generating Excel files in code
aka: 导出 Excel 生成报表 openpyxl xlsxwriter pandas ExcelJS SheetJS xlsx Python 写 Excel Node 写 Excel
order: 10
---

## 是什么

用代码直接产出 .xlsx：表头样式、列宽、数字格式、冻结、公式、数据验证、条件格式一次写好，用户打开就能用。Python 常用 openpyxl、xlsxwriter、pandas，JavaScript 常用 ExcelJS、SheetJS。

## 适合

系统里的“导出 Excel”按钮；定时生成的日报、月报；把数据库查询结果整理好交给财务和运营。

## 不适合

已经有设计好的模板、只往里填数，用「模板填充批量出表」；几十万行以上的导出看「大数据量导出」；只是合并清洗几份表格看「用 pandas 清洗合并」。

## 注意

选库先看要不要改已有文件：xlsxwriter 只能新建，不能读也不能改；openpyxl 和 ExcelJS 能读改，但打开再保存会丢掉它们不认识的内容（形状、切片器、迷你图，ExcelJS 还会丢图表）。这些库都不计算公式，写进去的公式要等 Excel 打开时才算，手机和邮件里的预览可能显示 0 或空白；代码里要用到结果的，自己算好写数值。

## 要点

- Python 选库（openpyxl 3.1、xlsxwriter 3.x、pandas 3.x 为准）：只新建、格式要全、要图表和迷你图，用 xlsxwriter；要读或改已有文件，用 openpyxl；数据已在 DataFrame 里，用 to_excel 并指定 engine="xlsxwriter"，再从 writer.sheets 取出 worksheet 补格式。
- JavaScript 选库（ExcelJS 4.4、SheetJS 0.20 为准）：Node 服务端要样式、数据验证、条件格式和流式读写，用 ExcelJS，它不能画图表；浏览器里读各种格式、导出简单数据，用 SheetJS 社区版（json_to_sheet、writeFile），社区版不写单元格样式。npm 公共仓库里的 xlsx 停在 0.18.5，有已公开的安全漏洞，改用 SheetJS 官方发布的 0.20.x 安装包。
- 写入类型：金额和数量写数值，日期写日期对象，再设数字格式（#,##0.00、yyyy-mm-dd）；手机号、身份证号、订单号这类编码写成文本，否则会变成科学计数、丢掉前导 0。
- 公式：函数名用英文，参数用逗号分隔，如 "=SUM(E2:E100)"。xlsxwriter 会自动处理 FILTER、XLOOKUP 这类动态数组函数，TEXTJOIN、IFS、LET 等较新的函数要建 Workbook 时开 use_future_functions；openpyxl 里较新的函数都要手写 _xlfn. 前缀，否则打开显示 #NAME?；需要溢出的动态数组公式用 xlsxwriter 的 write_dynamic_array_formula。
- xlsxwriter 的 write() 默认把以 = 开头的字符串当公式、把网址当超链接；写用户填写的文本用 write_string，或建 Workbook 时传 strings_to_formulas 和 strings_to_urls 为 False。
- 每张表：表头加粗加底色，freeze_panes 冻结首行，开自动筛选，设列宽（中文按每字约 2 个字符宽估）；工作表名不超过 31 个字符，不含 : \ / ? * [ ]。
- 下载：文件名带内容和期间（销售明细_2026-10_华东.xlsx）；Content-Type 用 application/vnd.openxmlformats-officedocument.spreadsheetml.sheet，中文文件名写在 Content-Disposition 的 filename* 里（UTF-8 编码）。
- 生成后读回校验：行数、金额合计和数据库一致；再抽一份用 Excel 和 WPS 打开，看公式、格式和中文是否正常。

## 提示词

给{项目}加一个“导出{报表名，如 门店销售明细}”功能，生成 .xlsx，用{库：xlsxwriter / openpyxl / ExcelJS / SheetJS}。
1. 先读现有的导出和下载代码，沿用它的权限校验和响应写法。
2. 工作表：{工作表清单，如 明细、按门店汇总、说明}。明细列为{列名、类型和格式，如 订单号（文本）、下单日期（yyyy-mm-dd）、门店、金额（#,##0.00）}；汇总表用公式引用明细，不在代码里算好再写死。
3. 类型：金额和数量写数值，日期写日期对象并设格式；{编码列，如 订单号、手机号}写成文本。用户填写的文本按字符串写入，不能被当成公式或超链接（xlsxwriter 用 write_string 或关闭 strings_to_formulas、strings_to_urls）。
4. 格式：表头加粗加底色，冻结首行，开自动筛选，按内容设列宽；{条件格式，如 金额为负标红}；{数据验证，如 状态列下拉}。
5. 文件名“{报表名}_{期间}.xlsx”，用正确的 Content-Type，中文文件名用 filename* 编码。
6. 写一个测试：生成后读回文件，检查工作表名、表头、行数、金额合计，以及编码列仍是文本。
完成后说明改了哪些文件和选库理由；数据超过{行数上限，如 10 万}行时先提示我。
