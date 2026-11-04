---
zh: 金额与单位
en: Numbers & units
order: 20
---

## 是什么

金额固定两位小数、千分位分隔，大数用万 / 亿，同列单位写在表头。

## 适合

价格、订单金额、报表、统计卡、百分比和计数。

## 不适合

不要在每个单元格重复“元”；不要同一列小数位不一致；关键金额不截断、不省略。

## 要点

- 金额 ¥1,234.56 固定两位小数，负数写 -¥1,234.56；4 位以上加千分位（年份、编号、页码除外）
- 表格金额列表头写“金额（元）”，单元格只写数字；各行单位不同时才写在单元格里
- 中文界面的大数用“万 / 亿”：12.8 万、3.46 亿；同一组卡片用同一单位
- 百分比按指标固定 0–2 位小数，同一列一致；涨跌同时用符号、颜色和图标，不只靠颜色
- 数值列右对齐、tabular-nums，为位数增长和负号预留宽度
- 数字与单位之间空不空全项目统一（如“12 件”“3.5 GB”）

## 提示词

统一{页面}的数字格式：金额 ¥ 加千分位、固定两位小数，负数写 -¥1,234.56；表格金额列表头写“金额（元）”，单元格只写数字并右对齐、tabular-nums；超过 10 万的统计值用“万 / 亿”保留 1–2 位小数；百分比同列小数位一致，涨跌同时用符号、颜色和图标；数字与单位之间的空格全站统一；悬停或详情显示精确值；窄屏不截断金额，必要时字号降一档。

## 示例

<style>
.s{height:100%;display:flex;align-items:center;justify-content:center;gap:24px;padding:16px;background:#fff;color:#1f2329;font:13px/1.4 system-ui,"PingFang SC",sans-serif}
table{border-collapse:collapse;font-variant-numeric:tabular-nums}
th{padding:0 8px 6px;font-size:12px;font-weight:600;color:#5b616e;text-align:left;white-space:nowrap}
td{height:32px;padding:0 8px;border-top:1px solid #e3e6eb;white-space:nowrap}
.n{text-align:right}
.e{color:#5b616e}
.k{display:grid;gap:2px}
.k small{font-size:12px;color:#5b616e}
.k p{margin:0;display:flex;align-items:baseline;gap:4px}
.k b{font-size:28px;line-height:36px;font-weight:600;font-variant-numeric:tabular-nums}
.k i{font-style:normal;font-size:14px;color:#5b616e}
.k .up{color:#12805c;font-weight:600}
.s{container-type:inline-size}
@container (max-width:360px){.s{gap:14px;padding:12px}
.k b{font-size:24px}
}
.k p,.k .up{white-space:nowrap}
@container (max-width:400px){.s{gap:12px}
.k b{font-size:22px}
}
@container (max-width:340px){.k{display:none}
}
</style>

<div class="s"><table><thead><tr><th>区域</th><th class="n">金额（元）</th><th class="n">占比</th></tr></thead><tbody><tr><td>华东</td><td class="n">98,765.40</td><td class="n">62.40%</td></tr><tr><td>华南</td><td class="n">1,234.50</td><td class="n">7.80%</td></tr><tr><td>退款</td><td class="n">-1,200.00</td><td class="n e">—</td></tr></tbody></table><div class="k"><small>年度营收</small><p><b>3.46</b><i>亿元</i></p><small class="up">▲ 12.4% 同比</small></div></div>
