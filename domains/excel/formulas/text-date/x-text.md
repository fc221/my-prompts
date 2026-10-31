---
zh: 文本拆分与合并
en: Splitting and joining text
aka: 文本拆分 分列 TEXTSPLIT TEXTBEFORE TEXTAFTER TEXTJOIN CONCAT LEFT MID FIND 快速填充 Ctrl+E 文本函数
order: 10
---

## 是什么

把一格里的几段信息拆成多列（规格“咖啡豆-500g-深烘”拆成品名、克重、烘焙度），或把多列、多行拼成一段文字（收货信息、一个订单的商品清单）。新版用 TEXTSPLIT、TEXTBEFORE、TEXTAFTER、TEXTJOIN，所有版本都能用 LEFT、MID、FIND 和 & 连接。

## 适合

系统导出的“姓名 电话”“省市区”挤在一格；生成发货单的收货信息、短信文案；把一个订单的多个商品合成一格展示；去空格、手机号打码。

## 不适合

一次性整理几千行固定格式的数据，用 数据 → 分列 或 快速填充（Ctrl+E）更快；每次导入都要同样清洗的，用「Power Query 合并整理」。

## 注意

拼接日期和金额前先用 TEXT 定格式：="下单日期："&A2 会得到“下单日期：46300”，要写 ="下单日期："&TEXT(A2,"yyyy-mm-dd")，金额写 TEXT(C2,"#,##0.00")。TEXT 的结果是文本，不能再参与计算。

## 要点

- 拆成多列（新版）：=TEXTSPLIT(B2,"-") 把“咖啡豆-500g-深烘”溢出成三格；只取第一段 =TEXTBEFORE(B2,"-")，只取最后一段 =TEXTAFTER(B2,"-",-1)。
- 拆分（所有版本）：第一段 =LEFT(B2,FIND("-",B2)-1)；最后一段 =TRIM(RIGHT(SUBSTITUTE(B2,"-",REPT(" ",99)),99))；中间段 =MID(B2,FIND("-",B2)+1,FIND("-",B2,FIND("-",B2)+1)-FIND("-",B2)-1)。
- 合并多列：=B2&" "&C2 或 =CONCAT(B2:E2)；带分隔符并跳过空格子 =TEXTJOIN(" ",TRUE,B2:E2)。
- 合并多行：一个订单的全部商品 =TEXTJOIN("、",TRUE,FILTER(明细[商品],明细[订单号]=A2))。
- 低版本合并多行：按订单号排序后，辅助列 D2 =IF(A2=A1,D1&"、"&B2,B2)，每个订单最后一行就是完整清单。
- 清洗：=TRIM(B2) 去掉首尾和多余空格；=CLEAN(B2) 去掉换行等不可见字符；=SUBSTITUTE(B2,CHAR(160),"") 去掉网页复制来的不间断空格；手机号打码 =REPLACE(C2,4,4,"****")。
- 快速填充：在旁边列手写一两个结果，按 Ctrl+E 按规律填完（Excel 2013 及以上，WPS 也有）；规律不统一时要逐行抽查。
- 版本：TEXTJOIN、CONCAT 需要 Excel 2019 或 Microsoft 365；TEXTSPLIT、TEXTBEFORE、TEXTAFTER 需要 Microsoft 365 或 Excel 2024；FILTER 需要 Excel 2021 及以上；WPS 新版支持 TEXTJOIN，TEXTSPLIT 以所用版本的插入函数里能否搜到为准。

## 提示词

帮我处理{工作表名，如 订单导出}里的文本列：
1. 先读数据，说明 {要拆的列，如 商品规格} 的分隔符和段数是否每行一致，列出不一致的行。
2. 把它拆成 {拆出的列，如 品名、克重、烘焙度}：用户版本是 {Excel 版本}，新版用 TEXTSPLIT，低版本用 LEFT、MID、FIND 和 SUBSTITUTE 写法。
3. 生成 {合并列，如 收货信息}，格式为 {格式示例，如 收货人 手机号 省市区 详细地址}，空字段自动跳过；日期和金额用 TEXT 定格式。
4. 清掉首尾空格和不可见字符，手机号在展示列打码，原始列保留。
5. 结果列都用公式，原始数据不覆盖。
交付时说明每个新列的公式和需要的版本，并用 3 行数据演示拆分和合并的结果。
