---
zh: 空值显示
en: Empty values
order: 30
---

## 是什么

没有值统一显示“—”，需要时说明原因；0 是真实数据，照常显示。

## 适合

表格单元格、详情字段、统计卡、表单只读态。

## 不适合

不要显示 null、undefined、NaN 或留一块空白；不要把“没有数据”显示成 0。

## 要点

- 空值统一显示一个“—”（U+2014），颜色用次要文字色，对齐方式与该列一致
- 区分“没有值”和“值为 0”：0 照常显示，空值显示“—”
- 需要时说明原因：悬停提示“未填写”“无权限查看”“统计中”
- 整列都为空时考虑隐藏该列或加说明；整张表为空时显示空状态（原因 + 下一步）
- 读屏不要读成“破折号”：空单元格加视觉隐藏的“无”或 aria-label
- 接口返回的 null、undefined、NaN、空字符串统一在格式化函数里处理，不直接渲染

## 提示词

统一{页面}的空值显示：没有值显示“—”（次要文字色，与该列对齐方式一致），值为 0 照常显示 0；需要说明时悬停提示原因（未填写 / 无权限 / 统计中）；读屏给空单元格读“无”；整列为空时隐藏或说明，整表为空时显示空状态：原因 + 下一步操作；接口返回的 null、undefined、NaN、空字符串统一在格式化函数里处理；导出时空值按{导出约定}处理。

## 示例

<style>
.s{height:100%;display:flex;align-items:center;justify-content:center;gap:16px;padding:12px 16px;background:#f5f6f8;color:#1f2329;font:12px/1.4 system-ui,"PingFang SC",sans-serif}
.t{flex:1;min-width:0;max-width:230px;display:grid;gap:6px;padding:12px;border-radius:10px;background:#fff;border:1px solid #e3e6eb}
em{font-style:normal;font-weight:600;white-space:nowrap}
.x{color:#d92d20}
.o{color:#12805c}
table{width:100%;border-collapse:collapse}
th{text-align:left;font-weight:600;color:#5b616e;padding:0 4px 4px}
td{height:26px;padding:0 4px;border-top:1px solid #e3e6eb;white-space:nowrap}
.n{text-align:right;font-variant-numeric:tabular-nums}
.e{color:#5b616e}
.s{container-type:inline-size}
@container (max-width:460px){.s{gap:10px;padding:10px}
.t{padding:10px}
em{white-space:normal}
th:first-child,td:first-child{display:none}
}
</style>

<div class="s"><div class="t"><em class="x">✗ 直接显示接口值</em><table><tr><th>姓名</th><th>部门</th><th class="n">订单</th></tr><tr><td>林晓</td><td>null</td><td class="n">0</td></tr><tr><td>陈晨</td><td></td><td class="n">undefined</td></tr><tr><td>周扬</td><td>设计部</td><td class="n">NaN</td></tr></table></div><div class="t"><em class="o">✓ 统一“—”，0 照常显示</em><table><tr><th>姓名</th><th>部门</th><th class="n">订单</th></tr><tr><td>林晓</td><td class="e" title="未填写">—</td><td class="n">0</td></tr><tr><td>陈晨</td><td class="e" title="未填写">—</td><td class="n e" title="统计中">—</td></tr><tr><td>周扬</td><td>设计部</td><td class="n e" title="统计中">—</td></tr></table></div></div>
