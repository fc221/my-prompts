---
zh: 时间线
en: Timeline
order: 90
---

## 是什么

竖线串起按时间排列的事件节点，每个节点有标题、时间和说明。

## 适合

订单物流、审批流转、操作记录、版本历史等需要看先后顺序的事件。

## 不适合

用户要逐步完成的流程用步骤条；只关心最新状态时用状态标签；事件很多、需要筛选比较时用表格。

## 要点

- 节点圆点 8–10px，竖线 2px 浅色，圆点中心对齐标题首行；节点之间 12–20px
- 每个节点：标题（14px 主色）+ 时间（12px 次要色、等宽数字）+ 可选说明；全列时间格式统一
- 最新或当前节点主色实心，已完成灰色，异常用危险色并带图标；状态写在标题文字里，不只靠颜色
- 默认倒序（最新在上）或正序，二选一并在标题处说明；超过 5–6 条折叠中间，提供“展开全部”
- 用 ol 语义；展开按钮用 aria-expanded
- 窄屏时间放到标题下方，不左右分栏

## 提示词

在{订单详情}里加物流时间线：倒序排列，2px 浅灰竖线串起节点，圆点 10px 与标题首行居中对齐，节点间距 16px；最新节点主色实心并写“派送中”，已完成节点灰色，异常节点危险色加感叹号图标并写原因；每个节点显示标题、时间（12px 次要色、等宽数字、MM-DD HH:mm）和说明；超过 5 条折叠中间并显示“展开全部（N）”，按钮设 aria-expanded；用 ol；窄屏时间放到标题下方。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{width:100%;max-width:360px;max-height:100%;overflow:auto;display:flex;flex-direction:column;align-items:flex-start;gap:4px}
.tl{width:100%;margin:0;padding:0;list-style:none}
.tl li{position:relative;padding:0 0 14px 24px}
.tl li.last{padding-bottom:0}
.tl li::before{content:"";position:absolute;left:3px;top:6px;width:10px;height:10px;border-radius:50%;background:#c9ced6}
.tl li::after{content:"";position:absolute;left:7px;top:20px;bottom:0;width:2px;background:#e3e6eb}
.tl li.last::after{display:none}
.cur::before{background:#3b5bdb!important;box-shadow:0 0 0 3px #dfe6ff}
.cur b{color:#3b5bdb}
.err::before{content:"!"!important;left:1px!important;top:4px!important;width:14px!important;height:14px!important;display:grid;place-items:center;background:#d92d20!important;color:#fff;font-size:12px;font-weight:700;line-height:1}
.err b{color:#d92d20}
.hd{display:flex;justify-content:space-between;gap:12px}
.hd b{font-weight:500;min-width:0}
time{flex:none;font-size:12px;color:#5b616e;font-variant-numeric:tabular-nums}
p{margin:0;font-size:12px;line-height:20px;color:#5b616e}
.t{height:24px;margin-left:16px;padding:0 8px;border:0;border-radius:4px;background:none;color:#3b5bdb;font-size:13px;cursor:pointer}
.t:hover{background:#edf1ff}
</style>

<div class="s"><div class="w"><ol class="tl"><li class="cur"><div class="hd"><b>派送中 · 快递员 张师傅</b><time>10-25 09:12</time></div><p>预计今天 18:00 前送达</p></li><li class="err"><div class="hd"><b>转运延误 · 恶劣天气</b><time>10-24 21:40</time></div></li><li><div class="hd"><b>已发货 · 杭州仓</b><time>10-24 16:03</time></div></li><li class="x" hidden><div class="hd"><b>已付款</b><time>10-23 14:15</time></div></li><li class="x" hidden><div class="hd"><b>已下单</b><time>10-23 14:12</time></div></li></ol><button type="button" class="t more" aria-expanded="false">展开更早的 2 条</button></div></div>

<script type="module">
export default function demo(root) {
  const b = root.querySelector('.more'), xs = [...root.querySelectorAll('.x')], lis = [...root.querySelectorAll('.tl li')];
  const mark = () => { const vis = lis.filter((l) => !l.hidden); lis.forEach((l) => l.classList.toggle('last', l === vis[vis.length - 1])); };
  b.addEventListener('click', () => { const open = b.getAttribute('aria-expanded') !== 'true'; xs.forEach((x) => { x.hidden = !open; }); b.setAttribute('aria-expanded', String(open)); b.textContent = open ? '收起' : '展开更早的 2 条'; mark(); });
  mark();
}
</script>
