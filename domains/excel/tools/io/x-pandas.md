---
zh: 用 pandas 清洗合并
en: Cleaning and merging Excel files with pandas
aka: pandas read_excel to_excel 合并多个 Excel 多表合并 批量合并工作簿 Python 处理 Excel 数据清洗
order: 30
---

## 是什么

用 pandas 把多份 Excel（每月一个文件、每个门店一张表）读进来，统一列名和类型、去空格去重、按关联键补字段、汇总，再写回一个干净的 Excel。脚本留着，下个月换个目录接着跑。

## 适合

每月合并 30 家门店上报的销售表；把系统导出的订单表和会员表按手机号对上；一次性整理几万到几百万行的历史数据。

## 不适合

不写代码、每月在 Excel 里点一下刷新就行的，用「Power Query 合并整理」；只要按维度汇总看看的，用「数据透视表」；整理结果要导进业务系统的，在系统侧做「导入校验」。

## 注意

读入时就把编码列指定成文本（dtype），否则手机号、门店编码 0012 会被读成数字、丢掉前导 0，之后再转回文本也补不回来。合并前先确认关联键唯一：merge 时传 validate="many_to_one"，会员表里同一手机号出现两次就直接报错；不加的话一对多会悄悄放大行数，金额被重复计算。

## 要点

- 读：pd.read_excel(路径, sheet_name=None) 一次读出全部工作表，得到“表名 → DataFrame”的字典；多个文件用 Path.glob 循环读，每块加一列“来源”（文件名加表名）；装了 python-calamine 可以传 engine="calamine"，读得更快。
- 类型（以 pandas 3.x 为准，文本列默认就是 str 类型）：dtype 把编码列设成 str；日期用 pd.to_datetime(列, errors="coerce")，金额先去掉“¥”“,”“元”再 pd.to_numeric(errors="coerce")；转换失败变成 NaT 或 NaN 的行单独导出给人看，不直接删。
- 列名：维护一份映射（“手机号码”“联系电话”都改成“手机号”），df.rename(columns=映射)；先去掉列名前后的空格和换行；某个文件缺必需列时报错，并说出是哪个文件、缺哪列。
- 清洗：str.strip() 去空格；unicodedata.normalize("NFKC", 文本) 把全角数字和字母转半角；空字符串换成缺失值；去重用 drop_duplicates(subset=业务键, keep="last")，去重前先把重复的行另存一份。
- 合并：上下拼用 pd.concat(列表, ignore_index=True)；左右关联用 merge(how="left", validate="many_to_one", indicator=True)，_merge 为 left_only 的行就是没对上的，单独输出。
- 汇总：groupby 加 agg（销售额 sum、订单号 nunique），或 pivot_table；比率类指标汇总后用分子合计除以分母合计。
- 写：with pd.ExcelWriter(输出路径, engine="xlsxwriter") as w 一次写多张表（明细、汇总、未匹配、异常值），index=False；再用 w.sheets[表名] 设列宽、冻结首行、数字格式。往已有文件里追加或替换工作表，用 engine="openpyxl"、mode="a"、if_sheet_exists="replace"。
- 核对：每一步打印行数，合并前后的金额合计要一致；输入目录和输出文件名做成参数，脚本里不写死月份。

## 提示词

帮我写一个 Python 脚本，用 pandas 合并清洗 Excel：输入是 {输入目录，如 门店上报/2026-10} 下的所有 .xlsx，每个文件{结构，如 一个门店一个文件，每个文件里按周分了几张表}，列为{列名，如 日期、门店编码、手机号、商品、数量、金额}。
1. 读取全部文件的全部工作表，每行加“来源”列（文件名/表名）；{编码列，如 门店编码、手机号}按文本读。
2. 列名统一：{列名映射，如 联系电话 → 手机号、销售金额 → 金额}；缺必需列时报错并说明文件和列名。
3. 清洗：去前后空格，全角转半角；日期和金额转换失败的行放进“异常值”表；按{去重键，如 日期、门店编码、单号}去重，重复行另存“重复记录”表。
4. 关联：和 {关联表，如 会员表.xlsx} 按 {关联键，如 手机号} 左连接，validate="many_to_one"；没对上的行放进“未匹配”表。
5. 汇总：按{汇总维度，如 门店编码、商品}汇总{指标，如 数量合计、金额合计、订单数}。
6. 输出 {输出文件}，工作表为明细、汇总、未匹配、异常值、重复记录；用 xlsxwriter 设列宽、冻结首行、金额两位小数加千分位。
7. 运行结束打印：读入文件数、各步骤行数、合并前后的金额合计。
输入目录和输出文件用命令行参数传入；以 pandas 3.x 为准，说明要安装的包和运行命令。
