---
zh: 思考过程与工具调用
en: Reasoning & tool calls
order: 30
---

## 是什么

回答上方一行可展开的摘要，展开后逐条列出每一步、调用了什么工具、参数和结果。

## 适合

Agent 执行多步任务、调用搜索 / 代码 / 文件工具、需要让用户追溯过程的场景。

## 不适合

不要把每个事件打成一行系统文本；简单的一问一答不显示过程；不用计时器假装进度。

## 要点

- 组件库没有现成的过程展示，自己做；零件用组件库的：折叠用 Element Plus el-collapse + el-collapse-item（title 插槽写摘要）、Naive UI n-collapse + n-collapse-item（header 插槽）、Ant Design Vue a-collapse + a-collapse-panel（header 插槽）；每步的状态用 el-tag / n-tag / a-tag，运行中的那步放一个小号「加载指示」
- 摘要一行跟着状态变：运行中写“正在{步骤} · 第 2 / 3 步”并默认展开；完成后自动收起成“已完成 3 步 · 用时 12 秒”；用户手动展开过就不再自动收起
- 同一个工具调用合并成一项：状态 + 工具名 + 参数 + 结果摘要或错误，不把每个事件打成一行
- 状态以后端事件为准，至少区分排队、运行中、完成、出错、已取消；“正在停止”和“已停止”分开显示
- 写入、删除、外发类操作先出授权卡：要执行什么、影响哪些对象，用户确认后才执行，见「确认对话框（危险操作）」
- 展开收起不改变上方内容的位置；计时和计数用 tabular-nums，数字变化时不横跳

## 提示词

为{Agent 执行过程}做思考过程与工具调用展示，组件库没有现成的，自己做，折叠和标签用项目组件库的（Element Plus el-collapse + el-collapse-item / Naive UI n-collapse + n-collapse-item / Ant Design Vue a-collapse + a-collapse-panel，状态用 tag）：回答上方一行摘要，运行中写“正在{步骤} · 第 2 / 3 步”并默认展开，完成后自动收起为“已完成 3 步 · 用时 12 秒”，用户手动展开过就不再自动收起；展开后每步一行：状态（排队 / 运行中 / 完成 / 出错 / 已取消）+ 工具名 + 参数 + 结果摘要，同一调用合并成一项；状态以后端事件为准，“正在停止”和“已停止”分开；写入、删除、外发类操作先出授权卡，确认后才执行；展开收起不挪动上方内容，计时用 tabular-nums。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{padding:12px;place-items:start center;overflow-y:auto}
.msg{width:100%;max-width:520px;display:grid;gap:8px;justify-items:start}
.pc{width:100%;background:#fff;border:1px solid #e3e6eb;border-radius:10px}
.hd{width:100%;height:36px;display:flex;align-items:center;gap:8px;padding:0 10px 0 12px;border:0;background:none;font-size:13px;color:#5b616e;text-align:left}
.hd:hover{color:#1f2329}
.sum{flex:1;font-variant-numeric:tabular-nums}
.ic{width:16px;display:grid;place-items:center;color:#3b5bdb}
.ic.ok{color:#12805c}
.chev{display:grid;transition:transform .24s}
[aria-expanded="true"] .chev{transform:rotate(180deg)}
.cl{display:grid;grid-template-rows:0fr;transition:grid-template-rows .24s cubic-bezier(.2,0,0,1)}
.cl.open{grid-template-rows:1fr}
.in{min-height:0;overflow:hidden}
ol{list-style:none;padding:8px 12px 10px;display:grid;gap:6px;border-top:1px solid #eef0f3}
li{display:flex;align-items:center;gap:8px;min-width:0;font-size:13px}
li b{font-weight:500;white-space:nowrap}
li em{margin-left:auto;font-style:normal;font-size:12px;color:#5b616e;white-space:nowrap}
.dot{width:18px;height:18px;flex:none;border-radius:50%;display:grid;place-items:center;font-size:11px}
.ok .dot{background:#e7f6ef;color:#12805c}
.run .dot{color:#3b5bdb}
.wait .dot{border:1.5px solid #c9ced6}
.wait{color:#5b616e}
code{padding:1px 6px;border-radius:4px;background:#f0f2f5;font:12px ui-monospace,Menlo,monospace;white-space:nowrap}
.spin{width:12px;height:12px}
.ans{font-size:14px;line-height:1.7}
@media (prefers-reduced-motion:reduce){.cl,.chev{transition:none}
}
</style>

<div class="s"><div class="msg"><div class="pc"><button class="hd" aria-expanded="true" aria-controls="stp"><span class="ic"></span><span class="sum"></span><span class="chev"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span></button><div class="cl open" id="stp"><div class="in"><ol></ol></div></div></div><p class="ans" hidden>订单 #2041 签收未满 7 天，可以无理由退款，款项 1–3 个工作日原路退回。</p><button class="b t sm again" hidden>重放演示</button></div></div>

<script type="module">
export default function demo(root) {
  const ST = [['搜索知识库', '退款政策', '3 条结果'], ['查询订单', '#2041', '已签收 3 天'], ['起草回复', '', '完成']];
  const hd = root.querySelector('.hd'), cl = root.querySelector('.cl'), ol = root.querySelector('ol'), sum = root.querySelector('.sum'), ic = root.querySelector('.ic'), ans = root.querySelector('.ans'), again = root.querySelector('.again'); let k = 0, gen = 0;
  const open = (on) => { hd.setAttribute('aria-expanded', String(on)); cl.classList.toggle('open', on); cl.inert = !on; };
  const draw = () => {
    ol.innerHTML = ST.map((s, j) => { const c = j < k ? 'ok' : j === k ? 'run' : 'wait'; return `<li class="${c}"><span class="dot">${c === 'ok' ? '✓' : c === 'run' ? '<span class="spin"></span>' : ''}</span><b>${s[0]}</b>${s[1] ? '<code>' + s[1] + '</code>' : ''}<em>${c === 'ok' ? s[2] : c === 'run' ? '运行中' : '排队'}</em></li>`; }).join('');
    const done = k >= ST.length; ic.className = 'ic' + (done ? ' ok' : ''); ic.innerHTML = done ? '✓' : '<span class="spin"></span>';
    sum.textContent = done ? '已完成 3 步 · 用时 3.6 秒' : '正在' + ST[k][0] + ' · 第 ' + (k + 1) + ' / 3 步';
  };
  const run = () => {
    const id = ++gen; k = 0; ans.hidden = again.hidden = true; open(true); draw();
    const nx = () => { if (id !== gen || !root.host.isConnected) return; k++; draw(); if (k < ST.length) setTimeout(nx, 1200); else { open(false); ans.hidden = again.hidden = false; } };
    setTimeout(nx, 1200);
  };
  hd.addEventListener('click', () => open(hd.getAttribute('aria-expanded') !== 'true'));
  again.addEventListener('click', run);
  run();
}
</script>
