---
zh: 五种对齐怎么用
en: Choosing alignment
aka: 左对齐 居中 基线对齐 两端对齐 右对齐 金额对齐 tabular-nums
order: 50
---

## 是什么

界面里常用五种对齐：长文左对齐、短而集中的信息居中、大小字基线对齐、一行两组两端对齐、金额右对齐。示例里每种都能切到反例对比。

## 适合

写页面时给每块内容定对齐方式，或者排查“看着乱但说不出哪里乱”的版面。

## 不适合

形状的重心微调看「视觉对齐」；数字字体和表格细节看「数字与表格排版」；金额的单位和位数看「金额与单位」。

## 注意

对齐要看内容形状，不是一处居中就处处居中。超过三行的内容居中后，每行起点都不一样，眼睛要重新找行首。

## 要点

- 长文左对齐：两行以上的正文、列表、表单，每行起点一致；从右往左书写的语言相反
- 短信息居中：支付成功、空状态、确认弹窗这类一两行的内容，图标、标题、说明聚成一组后整体居中
- 基线对齐：价格加单位、分数加说明这类大小字同排，用 align-items: baseline，小字踩在大字同一条底线上
- 两端对齐：一行两组内容，一组靠左、一组靠右，用 justify-content: space-between 或 margin-left: auto；屏幕很宽时限制容器宽度，两端别离太远
- 金额右对齐：同列金额右对齐，小数位统一，用 font-variant-numeric: tabular-nums，个十百千上下对齐，表头跟列一起右对齐
- 同一块区域只有一条主要对齐线，图标、标题、说明都贴着它

## 提示词

检查{页面}的对齐并修复，规则：两行以上的文字左对齐；一两行的短信息成组居中；大小字同排用 align-items: baseline；一行两组内容用两端对齐，容器最大宽{最大宽度}；金额列右对齐，小数统一 {小数位数} 位，用 tabular-nums，表头同样右对齐；同一块区域只保留一条主要对齐线。逐块列出原来的对齐方式和改后的方式。

## 示例

<link rel="stylesheet" href="../../_shared/pick.css">
<style>
.x-w{--ctl:70px;width:100%;max-width:480px;display:flex;align-items:center;gap:10px;font-size:12px;line-height:18px}
.x-w button{border:0;background:none;color:inherit;font:inherit;cursor:pointer}
.x-w button:focus-visible{outline:2px solid #3b5bdb;outline-offset:1px}
.x-box{position:relative;flex:1;min-width:0;padding:8px 10px;border-radius:8px;background:#fff;box-shadow:0 0 0 1px #e3e6eb}
.x-seg{flex:none;width:var(--ctl);display:flex;flex-direction:column;gap:5px}
.x-w .x-seg button{height:30px;border-radius:8px;background:#fff;box-shadow:inset 0 0 0 1px #d5d9e0;white-space:nowrap}
.x-w .x-seg [aria-pressed=true]{background:#e3e9fd;color:#2f49b8;font-weight:600;box-shadow:inset 0 0 0 1px #3b5bdb}
.x-txt{margin:0}
.x-box[data-m="1"] .x-txt{text-align:center}
.x-ok{display:flex;flex-direction:column;align-items:center;gap:2px}
.x-ok svg{width:26px;height:26px;fill:none;stroke:#24946a;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.x-ok b{font-size:15px;line-height:20px}
.x-ok span{color:#5b616e}
.x-box[data-m="1"] .x-ok{align-items:flex-start}
.x-pr{display:flex;align-items:baseline;gap:4px;white-space:nowrap}
.x-pr+.x-pr{margin-top:6px}
.x-box[data-m="1"] .x-pr{align-items:center}
.x-pr b{position:relative;font-size:28px;line-height:32px;font-variant-numeric:tabular-nums}
.x-pr span{color:#5b616e}
.x-ends{display:flex;justify-content:space-between;align-items:center;gap:8px;white-space:nowrap}
.x-ends+.x-ends{margin-top:6px;padding-top:6px;border-top:1px solid #eef0f3}
.x-ends span{color:#5b616e}
.x-box[data-m="1"] .x-ends{justify-content:flex-start}
.x-g{display:flex;align-items:center;gap:6px}
.x-w .x-g button{height:26px;padding:0 10px;border-radius:13px;background:#f2f4f7}
.x-w .x-g .x-pri{background:#3b5bdb;color:#fff;font-weight:600}
.x-tb{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 16px;white-space:nowrap}
.x-tb span{color:#5b616e}
.x-tb b{font-weight:600;text-align:right;font-variant-numeric:tabular-nums}
.x-box[data-m="1"] .x-tb b{min-width:64px;text-align:left;font-variant-numeric:normal}
.x-tb .x-tot{padding-top:2px;border-top:1px solid #eef0f3}
.x-box[data-m="0"] .x-bad,.x-box[data-m="1"] .x-good{display:none}
@container (min-height:260px){
.x-w{--ctl:96px;gap:16px;font-size:13px;line-height:21px}
.x-box{padding:14px 16px}
.x-pr b{font-size:36px;line-height:42px}
}
</style>

<script type="module">
import { pick } from '../../_shared/pick.ts';

const item = (name, fit, [good, bad], html) => ({
  name,
  fit,
  html: `<div class="x-w"><div class="x-box" data-m="0">${html}</div><div class="x-seg" role="group" aria-label="对比"><button type="button" aria-pressed="true">${good}</button><button type="button" aria-pressed="false">${bad}</button></div></div>`,
  init(el) {
    const btns = [...el.querySelectorAll('.x-seg button')];
    btns.forEach((b, i) => b.addEventListener('click', () => {
      btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      el.querySelector('.x-box').dataset.m = i;
    }));
  },
});
const money = (label, good, bad, cls = '') => `<span class="${cls}">${label}</span><b class="${cls}"><i class="x-good" style="font-style:normal">${good}</i><i class="x-bad" style="font-style:normal">${bad}</i></b>`;

export default function demo(root) {
  pick(root, [
    item('长文', '长文：左对齐，每行起点一致才好读', ['左对齐', '居中'], '<p class="x-txt">退款会在 3 个工作日内原路退回。超过时间还没到账，请在订单页联系客服，并提供订单号和付款截图。</p>'),
    item('短信息', '短而集中的信息：居中，聚成一组', ['居中', '左对齐'], '<div class="x-ok"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12.5 3 3 5-6"/></svg><b>支付成功</b><span>订单已发给商家</span></div>'),
    item('基线', '大小字同排：按基线对齐', ['基线对齐', '垂直居中'], '<div class="x-pr"><span>¥</span><b>128</b><span>/ 月</span></div><div class="x-pr"><b>4.9</b><span>分 · 2,306 条评价</span></div>'),
    item('两端', '一行两组：一组靠左，一组靠右', ['两端对齐', '挤在一起'], '<div class="x-ends"><span>已选 3 项</span><div class="x-g"><button type="button">清空</button><button type="button" class="x-pri">结算</button></div></div><div class="x-ends"><span>订单号 8240916</span><div class="x-g"><button type="button">复制</button></div></div>'),
    item('金额', '金额：右对齐、小数位统一、等宽数字', ['右对齐', '左对齐'], `<div class="x-tb">${money('咖啡豆', '86.50', '86.5')}${money('手冲壶', '1,280.00', '1280')}${money('滤纸', '12.00', '12')}${money('合计', '1,378.50', '1378.5', 'x-tot')}</div>`),
  ], '对齐方式');
}
</script>
