---
zh: 数字与表格排版
en: Numerals & tables
order: 40
---

## 是什么

金额、计数用等宽数字并右对齐，小数位固定，单位小一半并对齐基线。

## 适合

表格数值列、统计卡、价格、计时器、倒计时。

## 不适合

数值列不要左对齐或居中；不要让实时变化的数字因为宽度变化左右抖动。

## 要点

- 金额、计数、计时加 font-variant-numeric: tabular-nums，数字变化时宽度不跳
- 表格数值列右对齐，表头同样右对齐；同一列小数位固定（金额 2 位）
- 4 位以上数字加千分位，年份、编号、页码除外
- 统计数值 24–32px / 600，单位约为数值字号的 0.4–0.6 倍，与数值基线对齐（align-items: baseline）
- 为位数增长、负号、小数点和单位预留宽度，关键金额不截断
- 等宽字体只用于代码和需要逐位对齐的编号，不当作“科技感”装饰

## 提示词

整理{页面}里的数字排版：金额、计数、计时统一 tabular-nums；表格数值列和表头右对齐，金额固定 2 位小数、4 位以上加千分位，单位写在表头；统计卡数值 28px / 600，单位约为数值的一半并按基线对齐；为位数增长和负号预留宽度，实时变化的数字不左右抖动；窄屏数值不截断，标签可以换行；读屏能读出完整数值和单位。

## 示例

<style>
.s{height:100%;display:flex;align-items:center;justify-content:center;gap:20px;padding:16px;background:#fff;color:#1f2329;font:13px/1.4 system-ui,"PingFang SC",sans-serif}
.t{display:grid;min-width:92px}
.t em{font-style:normal;font-size:12px;font-weight:600;padding-bottom:4px}
.t span{height:28px;line-height:28px;border-top:1px solid #e3e6eb}
.x em{color:#d92d20}
.x span{font-variant-numeric:proportional-nums}
.o em{color:#12805c;text-align:right}
.o span{text-align:right;font-variant-numeric:tabular-nums}
.k{display:grid;gap:2px;padding-left:20px;border-left:1px solid #e3e6eb}
.k small{font-size:12px;color:#5b616e}
.k p{margin:0;display:flex;align-items:baseline;gap:4px}
.k b{font-size:28px;line-height:36px;font-weight:600;font-variant-numeric:tabular-nums}
.k i{font-style:normal;font-size:14px;color:#5b616e}
.k .up{color:#12805c}
.s{container-type:inline-size}
@container (max-width:420px){.k{display:none}
.s{gap:14px}
}
</style>

<div class="s"><div class="t x"><em>✗ 左对齐</em><span>1,111.1</span><span>98,765.40</span><span>7.5</span><span>-1200</span></div><div class="t o"><em>✓ 右对齐等宽</em><span>1,111.10</span><span>98,765.40</span><span>7.50</span><span>-1,200.00</span></div><div class="k"><small>本月营收</small><p><b>128.4</b><i>万元</i></p><small class="up">较上月 +12.4%</small></div></div>
