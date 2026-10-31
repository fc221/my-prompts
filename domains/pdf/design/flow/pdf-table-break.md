---
zh: 表格跨页
en: Tables across pages
aka: 重复表头 thead 跨页 表格断行 续表 承上页 明细表
order: 20
---

## 是什么

长表格跨过多页时，每页顶部重复表头，单行不被拦腰切开，合计只在最后出现一次。

## 适合

订单明细、对账单、报销明细、报告附表这类几十到几千行的表格。

## 不适合

屏幕上的表格交互看「数据表格」；三五行的小表直接整体 break-inside: avoid。

## 注意

多数引擎会把 tfoot 也在每页底部重复一次，合计放进 tfoot 就会每页都出现“合计”。合计写成 tbody 的最后一行，或者放在表格下方单独一块。

## 要点

- 结构用真正的 table、thead、tbody，表头留在 thead（display: table-header-group），Chromium、WeasyPrint、Prince、Paged.js 都会每页重复；给 table 设 display: block、overflow: hidden，或放进 flex / grid 容器，都可能让重复失效。
- 行不切断：tr 加 break-inside: avoid；单行高过一页时只能切开，长文本单元格控制在 3–4 行，更多内容移到附注。
- 列宽：table-layout: fixed，列宽写百分比或 mm；金额、数量右对齐并开 tabular-nums；编号和长链接加 overflow-wrap: anywhere，不撑破版心。
- 单元格内边距上下 3–4pt、左右 4–6pt，行分隔线 0.5pt；表格标题（表 2-1 门店销售明细）加 break-after: avoid，和表头、前两行数据在同一页。
- 每页小计、“承上页 / 转下页”这类按页计算的内容，HTML 路线算不准；需要时用 Typst / LaTeX，或先按每页行数把数据切好再分页渲染。
- 列太多放不下：附表章节改横版命名页（A4 landscape）或拆成两张表，字号不压到 8pt 以下。
- Typst：table.header 默认 repeat: true，表尾用 table.footer；LaTeX：longtable 用 endhead 定义续页表头、endfoot 定义页尾。

## 提示词

修正{项目}里{表格名称}在 PDF 中跨页的效果，按项目现有的生成方式实现：
1. 改成标准的 table、thead、tbody 结构，外层不用 flex、grid、overflow: hidden，让表头每页重复。
2. tr 加 break-inside: avoid；表格标题、表头和前两行数据不分开。
3. 列：{列定义，如 序号、商品、规格、数量、单价、金额}，table-layout: fixed，列宽用百分比；金额和数量右对齐、等宽数字、保留两位小数；长编号允许任意位置换行。
4. 合计只出现一次：放在 tbody 最后一行或表格下方，不放 tfoot。
5. 用 3 行、40 行、800 行三组数据生成，检查每页表头、有没有被切开的行、合计是否只出现一次。
最后说明改了哪些文件和每组数据的页数。
