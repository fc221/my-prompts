---
zh: 优化表格可读性
en: Unreadable table
aka: 表格看不清
order: 150
---

## 是什么

症状：列宽乱、文字换行错位、数字不对齐，看不出重点，找一行要找半天。

## 要点

- 告诉 AI 哪几列最常用，它才能排对顺序。
- 数据量大时补一句“表头吸顶”。
- 指定唯一一列可以换行的描述列。

## 提示词

这个表格看不清，请按下面的规则整理：
1. 列顺序按任务优先级：{最常用的列}放在前面；次要信息放在主信息下一行（12px 次要色），不单独占列。
2. 列宽：编号、日期、金额、状态、操作列按内容定宽、不换行；只留{描述列}一列可伸缩，最多两行，超出省略并可查看全文。
3. 对齐：文字左对齐；数字、金额右对齐，表头跟着右对齐；数字用等宽数字（font-variant-numeric: tabular-nums），金额统一两位小数和千分位。
4. 行：行高 48–56px；悬停行有浅底色；勾选行和当前行样式不同；斑马纹和分割线二选一。
5. 表头：12–14px 次要色 600，不加重底色；只在当前排序列显示排序箭头。
6. 状态用小色点加文字，不用大色块；空值写“—”。
7. 操作列固定在右侧，最多露出 2 个文字按钮，其余收进“更多”；删除用中性色，确认时才用危险色。
8. 数据多时表头吸顶；横向超出时只在表格容器内滚动，并固定首列。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{padding:8px 4px;font-size:8px;line-height:11px}
.g{display:grid;align-items:center}
.g>div{padding:0 3px;min-width:0}
.h{color:#5b616e}
.r{border-top:1px solid #eef0f3}
/* 改前：表头重底加粗，门店列太窄换行、行高错位，数字左对齐格式不一，状态大色块，斑马纹加分割线，空值留白 */
.bad .g{grid-template-columns:30px minmax(0,1fr) auto}
.bad .h{padding:3px 0;background:#dfe3e8;color:#1f2329;font-weight:700}
.bad .r{padding:3px 0}
.bad .r:nth-child(odd){background:#f3f4f6}
.bad .chip{display:inline-block;padding:1px 4px;border-radius:3px;color:#fff;font-size:7px;line-height:10px;white-space:nowrap}
.bad .chip.ok{background:#2f9e44}
.bad .chip.w{background:#e8590c}
/* 改后：表头 7px 次要色不加底，门店列最多两行，金额右对齐、两位小数、等宽数字，状态小色点，空值写 —，只用分割线 */
.good .g{grid-template-columns:minmax(0,1fr) 42px 40px}
.good .g>div:last-child{white-space:nowrap}
.good .h{padding:2px 0;font-size:7px}
.good .r{height:24px}
.good .n{text-align:right;font-variant-numeric:tabular-nums}
.good .t{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;line-height:10px}
.good .dot{display:inline-block;width:5px;height:5px;margin-right:3px;border-radius:50%;background:#2f9e44;vertical-align:1px}
.good .dot.w{background:#e8590c}
</style>

<div class="fx">
  <section class="fx-p"><h4>改前</h4><div class="fx-b"><div class="fx-z c bad"><div class="g h"><div>门店</div><div>金额</div><div>状态</div></div><div class="g r"><div>朝阳大悦城店</div><div>1200</div><div><span class="chip ok">已完成</span></div></div><div class="g r"><div>望京店</div><div>88.5</div><div><span class="chip w">待处理</span></div></div><div class="g r"><div>西单店</div><div>3,060.00</div><div></div></div></div></div></section>
  <section class="fx-p ok"><h4>改后</h4><div class="fx-b"><div class="fx-z c good"><div class="g h"><div>门店</div><div class="n">金额</div><div>状态</div></div><div class="g r"><div class="t">朝阳大悦城店</div><div class="n">1,200.00</div><div><i class="dot"></i>已完成</div></div><div class="g r"><div class="t">望京店</div><div class="n">88.50</div><div><i class="dot w"></i>待处理</div></div><div class="g r"><div class="t">西单店</div><div class="n">3,060.00</div><div class="h">—</div></div></div></div></section>
</div>
