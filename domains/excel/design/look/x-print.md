---
zh: 打印设置
en: Print setup
aka: 打印 页面设置 打印标题 每页表头 顶端标题行 缩放到一页 页眉页脚 打印区域 分页预览
order: 40
---

## 是什么

把电子表格变成能看的纸：设定打印区域、纸张方向、每页重复表头、宽度缩到一页、页码和页脚，打印前用分页预览确认在哪里断页。

## 适合

要打印签字的报销单、盘点表、对账单、工资条；导出 PDF 发给客户或领导的报表。

## 不适合

几千行的明细不打印，发电子版或筛出需要的部分；合同、函件这类需要精细排版的文字材料用 Word。

## 注意

“缩放到一页”只用在宽度上：选“将所有列调整为一页”，高度按内容自动分页；整张表硬缩到一页，字会小到看不清。每页的表头在 页面布局 → 打印标题 → 顶端标题行 里设置，不在每页手动复制表头。

## 要点

- 打印区域：页面布局 → 打印区域 → 设置打印区域，只框需要的列；辅助列放到打印区域外或隐藏。
- 方向：超过 8 列左右用横向 A4；页边距用“常规”或“窄”，装订的一侧额外留宽。
- 缩放：页面设置 → 调整为 1 页宽、页高留空；缩放后字号小于约 8 号时，改横向或删掉不必要的列。
- 每页表头：顶端标题行填 $1:$1，两行表头填 $1:$2；很宽的表在“从左侧重复的列数”里填 $A:$A。
- 页眉页脚：页脚中间“第 &[页码] 页，共 &[总页数] 页”，右侧 &[日期]；页眉左侧写表名或单位名称。
- 分页预览：视图 → 分页预览，拖动蓝色分页线，保证一条记录、一组签字栏不被拆到两页；需要时插入分页符。
- 表格不满一页时在 页边距 里勾选“水平居中”；黑白打印时浅色底纹可能看不出，状态改用加粗或文字标注。
- 打印前先 文件 → 导出 → PDF 检查页数、表头和页码；WPS 的入口同样在 页面布局 里。

## 提示词

帮我设置{工作表名，如 10 月门店销售明细}的打印：
1. 先读表格，确认要打印的列和行数，辅助列移出打印区域。
2. 纸张 A4，方向 {方向，如 横向}，页边距“窄”，调整为 1 页宽、高度自动。
3. 顶端标题行 {标题行，如 $1:$2}，每页重复表头。
4. 页眉左侧写 {页眉文字，如 单位名称 + 表名}，页脚中间写“第 X 页，共 Y 页”，右侧写打印日期。
5. 在分页预览里调整分页，保证签字栏和合计行不被拆开。
交付时说明打印区域、缩放比例和总页数，并导出一份 PDF 供检查。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.m-desk{background:linear-gradient(135deg,#e9ebef,#d9dde3)}
.m-pages{display:flex;gap:16px;align-items:flex-start;justify-content:center}
.m-pg{display:grid;gap:6px;justify-items:center}
.m-page{display:grid;gap:5px;padding:10px 12px 8px;background:#fff;box-shadow:0 1px 2px rgba(16,24,40,.08),0 4px 14px -4px rgba(16,24,40,.14)}
.m-hd,.m-ft{display:flex;justify-content:space-between;color:#667085;font-size:10.5px;white-space:nowrap}
.m-hd{padding-bottom:3px;border-bottom:1px solid #e4e7ec}
.m-ft{padding-top:3px;border-top:1px solid #e4e7ec}
.m-ft b{font-weight:600;color:#344054}
.m-page .xs{border-radius:0}
.m-sign{display:flex;gap:18px;padding:2px 6px 0;color:#344054;font-size:10.5px}
.m-xu{margin-right:4px;padding:0 3px;border-radius:3px;background:var(--ac);color:#fff;font-size:10px;font-weight:700;line-height:1.5}
.m-cap{margin:0;max-width:300px;color:#475467;font-size:11px;line-height:1.4;text-align:center}
.dg.narrow .m-p1{display:none}
</style>

<div class="dg m-desk"></div>

<script type="module">
import { draw, sheet } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  const head = ['日期', '单号', '商品', '数量', '单价', '金额'];
  const widths = [56, 80, 96, 44, 56, 72];
  const page = (cls, body, p, cap, sign = '') =>
    '<div class="m-pg ' + cls + '"><div class="m-page"><p class="m-hd"><span>滨江区门店 · 10 月销售明细</span><span>单位：元</span></p>' + body + sign
    + '<p class="m-ft"><span></span><b>第 ' + p + ' 页，共 2 页</b><span>2026-11-02</span></p></div><p class="m-cap">' + cap + '</p></div>';
  const p1 = page('m-p1', sheet({
    head, widths,
    rows: [
      ['10-02', 'XS-1002-01', '拿铁（大）', '24', '28.00', '672.00'],
      ['10-02', 'XS-1002-02', '美式', '18', '22.00', '396.00'],
      ['10-03', 'XS-1003-01', '牛角包', '30', '12.00', '360.00'],
      ['10-05', 'XS-1005-01', '拿铁（大）', '36', '28.00', '1,008.00'],
      ['10-08', 'XS-1008-01', '挂耳咖啡礼盒', '12', '98.00', '1,176.00'],
      ['10-12', 'XS-1012-01', '冷萃', '20', '26.00', '520.00'],
      ['10-15', 'XS-1015-01', '美式', '25', '22.00', '550.00'],
    ],
  }), 1, '第 1 页：第 1 行是真实表头');
  const p2 = page('m-p2', sheet({
    head, widths,
    rows: [
      ['10-20', 'XS-1020-01', '牛角包', '40', '12.00', '480.00'],
      ['10-23', 'XS-1023-01', '拿铁（大）', '30', '28.00', '840.00'],
      ['10-27', 'XS-1027-01', '会员储值卡', '5', '500.00', '2,500.00'],
      ['10-31', 'XS-1031-01', '冷萃', '16', '26.00', '416.00'],
    ],
    foot: ['合计', '', '', '256', '', '8,918.00'],
  }), 2, '第 2 页：顶端标题行 $1:$1 自动重复，合计和签字栏不拆页', '<p class="m-sign"><span>制表：</span><span>审核：</span><span>店长：</span></p>');
  draw(root, '<div class="m-pages">' + p1 + p2 + '</div>', { title: '打印设置 · 调整为 1 页宽，表头每页重复，页脚 第 &[页码] 页，共 &[总页数] 页', center: true, min: 0.3 });
  // 第 2 页：重复的表头标“续”，行号接着第 1 页往下数
  root.querySelector('.m-p2 .xc.h').insertAdjacentHTML('afterbegin', '<i class="m-xu">续</i>');
  root.querySelectorAll('.m-p2 .xn').forEach((n, i) => { if (i >= 2) n.textContent = String(i + 7); });
}
</script>
