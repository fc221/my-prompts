---
zh: 错误值处理
en: Handling formula errors
aka: IFERROR IFNA #N/A #DIV/0! #VALUE! #REF! #NAME? #SPILL! 错误值 公式报错 AGGREGATE
order: 40
---

## 是什么

公式出错时显示的 #N/A、#DIV/0!、#VALUE!、#REF!、#NAME?、#SPILL! 各有原因：先按错误类型找到原因并修好，确实属于正常情况的（查不到、分母为 0）再用 IFNA、IF 或 IFERROR 给一个明确的显示。

## 适合

查找公式遇到缺失的编号；比率的分母可能为 0；汇总时明细里混着错误值；交付前检查整本工作簿。

## 不适合

用 IFERROR 把所有错误一律变成空白或 0 来“美化”：引用断了、函数名拼错也会被藏起来，结果悄悄算错，没人发现。

## 注意

IFERROR 吞掉所有错误，查找公式优先用 IFNA，只处理“查不到”这一种；除法用 IF 判断分母：=IF(B2=0,"",C2/B2)。写成 IFERROR(C2/B2,0) 时，这个 0 会被当成真实的 0% 拉低平均值。

## 要点

- #N/A 查不到：检查查找值和查找列的类型、首尾空格，见「XLOOKUP 查找」；确认是正常缺失后写 =IFNA(VLOOKUP(…),"未建档")，或用 XLOOKUP 的第 4 个参数。
- #DIV/0! 分母为 0 或空：=IF(B2=0,"",C2/B2)；结果留空的格子在 AVERAGE 里会被跳过。
- #VALUE! 类型不对：数字列里混了“35元”或空格，用 =ISNUMBER(D2) 找出来改成纯数字，从源头修。
- #REF! 引用失效：删了被引用的行、列或工作表，或跨工作簿链接断了；先撤销，再把引用改成超级表列名，以后删列不会断。
- #NAME? 不认识的名字：函数名拼错、文本没加引号，或用了当前版本没有的函数（如在 Excel 2019 里用 XLOOKUP）。
- #SPILL! 溢出区域被挡住：清空结果下方和右侧的格子，见「动态数组」。
- 汇总时跳过错误值：=AGGREGATE(9,6,D2:D500)，9 表示求和、6 表示忽略错误值；平均用 =AGGREGATE(1,6,D2:D500)。
- 一次找出所有错误：开始 → 查找和选择 → 定位条件 → 公式，只勾“错误”；版本上 IFERROR 需要 Excel 2007 及以上，AGGREGATE 需要 2010 及以上，IFNA 需要 2013 及以上，WPS 都支持。

## 提示词

帮我检查并处理{工作簿名，如 门店月报}里的公式错误：
1. 先用定位条件找出所有错误单元格，按 #N/A、#DIV/0!、#VALUE!、#REF!、#NAME?、#SPILL! 分类，列出位置和原因。
2. 能从源头修的先修：统一查找键的类型和空格、把数字列里的文字清掉、断掉的引用改成超级表列名。
3. 属于正常情况的再处理：查找缺失用 IFNA 显示“{缺失提示，如 未建档}”；比率分母为 0 用 IF 显示空白。
4. 汇总区如果明细里还可能有错误值，用 AGGREGATE 忽略错误求和，并在旁边统计错误个数提醒补数据。
5. 不用 IFERROR 包住整段公式。
交付时列出每处错误的原因和改法，以及修改后还剩哪些错误需要补数据才能消除。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.m-tag{margin:0 0 5px!important;font-size:11.5px;font-weight:650}
.m-no{color:#b42318}
.m-ok{color:#05603a}
.m-gap{height:10px}
</style>

<script type="module">
import { draw, sheet } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  const tag = (t, ok) => '<p class="m-tag ' + (ok ? 'm-ok' : 'm-no') + '">' + t + '</p>';
  const spec = (ok) => ({
    head: ['门店', '目标', '实际', '达成率', '店长'],
    widths: [54, 74, 74, 60, 56],
    rows: [
      ['滨江店', '80,000.00', '86,400.00', '108.0%', '周敏'],
      ['城东店', '', '12,600.00', ok ? '' : '#DIV/0!', ok ? '待任命' : '#N/A'],
      ['西湖店', '60,000.00', '51,300.00', '85.5%', '林涛'],
    ],
    fx: ok ? ['D3', '=IF(B3=0,"",C3/B3)'] : ['D3', '=C3/B3'],
    marks: ok ? { E3: 'warn' } : { D3: 'bad', E3: 'bad' },
  });
  draw(root, tag('✗ 新店没有目标、没有店长', false) + sheet(spec(false)) + '<div class="m-gap"></div>' + tag('✓ 分母用 IF 判断，查不到用 IFNA 给默认值', true) + sheet(spec(true)), { title: '错误值处理 · 店长列 =IFNA(VLOOKUP(A3,门店表!A:C,3,FALSE),"待任命")', min: 0.45 });
}
</script>
