---
zh: 按实际步骤报进度
en: Honest stage progress
order: 70
---

## 是什么

长任务按后端真实的几个步骤列出来：做完的打勾，正在做的那一步转圈并写明名字，能数清的步骤才显示“12 / 36 张”这样的数量。

## 适合

导出、导入、发布、打包、批量生成这类有明确阶段、要等 5 秒以上的任务。

## 不适合

1–2 秒能完成的操作在按钮里转圈就够；只有一个阶段、能拿到字节数的上传下载用进度条；AI 多步调用工具的过程用“思考过程与工具调用”。

## 注意

不要用计时器让步骤自己往前走：界面停在哪一步，必须是后端真的停在哪一步。

## 要点

- 步骤 3–6 个，名字写用户懂的动作（“生成明细表”，不是“step_2”）；每步分未开始 / 进行中 / 完成 / 失败，图标配文字，不只靠颜色
- 步骤只由后端事件或轮询结果推进；能数清的写“12 / 36 张”“3.1 / 8.4 MB”，数不清的只写“处理中”，不编一个总百分比
- 事件带序号，序号比已处理的小就丢弃；任务已完成或失败后，晚到的“处理中”不能把它改回去
- 失败就停在出错那一步，写原因和办法，按钮改成“从这一步重试”，前面完成的步骤不重跑
- role="status" 只在换步骤、失败、完成时播报，数量变化不播报
- 完成后写“导出完成 · 用时 N 秒”并给结果入口；超过 10 秒的任务允许离开页面，回来按任务编号恢复显示
- 减少动态效果时去掉步骤切换的过渡，进行中的转圈保留但放慢

## 提示词

给{长任务，如 导出报表}做「按实际步骤报进度」：列出后端真实的 {步数} 个步骤，每步显示未开始 / 进行中 / 完成 / 失败（图标 + 文字）；步骤只随后端事件或轮询结果推进，不用计时器模拟；能数清数量的步骤显示“已完成数 / 总数”，数不清的写“处理中”，不显示编出来的总百分比；事件带序号，旧序号丢弃，已结束的任务不被晚到事件改回进行中；失败停在对应步骤并写原因，按钮改为“从这一步重试”，已完成步骤不重跑；role="status" 只在换步骤、失败、完成时播报；完成后显示总用时和结果入口。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;align-content:center;padding:8px 12px}
.box{display:flex;flex-direction:column;gap:6px;width:100%;max-width:480px;max-height:100%;margin:0 auto;padding:8px 12px;background:#fff;border:1px solid #e3e6eb;border-radius:12px}
.hd{flex:none;display:flex;align-items:center;gap:8px}
.hd b{flex:1;min-width:0;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.hd .ctl{height:26px;padding:0 10px;font-size:12px}
ol{min-height:0;overflow:auto;list-style:none;margin:0;padding:0;display:grid;align-content:start;gap:2px}
li{display:flex;align-items:center;gap:8px;height:24px;padding:0 6px;border-radius:6px;color:#8a909c;font-size:12px}
.ic{flex:none;display:grid;place-items:center;width:16px;height:16px;border:1.5px solid #c9ced6;border-radius:50%}
.ic svg{width:10px;height:10px;fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;display:none}
.t{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.n{flex:none;color:#5b616e;font-variant-numeric:tabular-nums}
li[data-s=done]{color:#1f2329}
li[data-s=done] .ic{border-color:#12805c;background:#12805c}
li[data-s=done] .ok{display:block}
li[data-s=run]{background:#f3f6ff;color:#1f2329;font-weight:600}
li[data-s=run] .ic{border-color:#c9ced6;border-top-color:#3b5bdb;border-width:2px;animation:kbsp .8s linear infinite}
li[data-s=run] .n{color:#3b5bdb;font-weight:500}
li[data-s=fail]{background:#fef3f2;color:#b42318;font-weight:600}
li[data-s=fail] .ic{border-color:#d92d20;background:#d92d20}
li[data-s=fail] .no{display:block}
li[data-s=fail] .n{color:#b42318;font-weight:400}
.ft{flex:none;display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:18px}
.msg{flex:1;min-width:0;margin:0;color:#5b616e;font-size:12px}
.msg.ok{color:#12805c}
.msg.bad{color:#b42318}
@media (prefers-reduced-motion:reduce){li[data-s=run] .ic{animation-duration:1.6s!important;animation-iteration-count:infinite!important}
}
@container (min-height:250px){.st{padding:16px 24px}
.box{gap:10px;padding:14px 18px}
.hd b{font-size:14px}
li{height:34px;padding:0 10px;font-size:13px}
.ic{width:18px;height:18px}
}
</style>

<div class="st"><div class="box"><div class="hd"><b>导出报销明细</b><label class="sw"><input type="checkbox" class="bad-sw"><i></i>模拟失败</label><button type="button" class="ctl go">重新导出</button></div><ol aria-label="导出步骤"></ol><div class="ft"><p class="msg" role="status"></p></div></div></div>

<script type="module">
export default function demo(root) {
  const S = ['核对 214 条流水', '生成明细表', '压缩打包', '上传到共享盘'], DONE = ['无异常', '36 张', '8.4 MB', '已上传'], NAME = ['核对流水', '生成明细表', '压缩打包', '上传'];
  const LABEL = { wait: '未开始', run: '进行中', done: '已完成', fail: '失败' };
  const ol = root.querySelector('ol'), msg = root.querySelector('.msg'), go = root.querySelector('.go'), bad = root.querySelector('.bad-sw');
  ol.innerHTML = S.map((t) => `<li data-s="wait"><i class="ic" aria-hidden="true"><svg class="ok" viewBox="0 0 12 12"><path d="m2.5 6.2 2.3 2.3 4.7-5"/></svg><svg class="no" viewBox="0 0 12 12"><path d="m3.5 3.5 5 5m0-5-5 5"/></svg></i><span class="t">${t}</span><span class="n"></span><span class="sr"></span></li>`).join('');
  const rows = [...ol.children];
  let job = 0, last = 0, ended = false, failAt = -1, t0 = 0;
  const say = (t, c = '') => { msg.textContent = t; msg.className = 'msg ' + c; };
  const set = (i, s, n) => { const r = rows[i]; r.dataset.s = s; r.querySelector('.n').textContent = n; r.querySelector('.sr').textContent = '，' + LABEL[s]; };
  // 客户端：只认当前任务、序号更大的事件；任务结束后不再接受任何事件
  const onEvent = (ev) => {
    if (ev.job !== job || ev.seq <= last || ended) return;
    last = ev.seq;
    if (ev.end) { ended = true; go.textContent = '重新导出'; return say(`导出完成 · 4 步全部完成，用时 ${((performance.now() - t0) / 1000).toFixed(1)} 秒`, 'ok'); }
    const prev = rows[ev.i].dataset.s; set(ev.i, ev.s, ev.n);
    if (ev.s === 'fail') { ended = true; failAt = ev.i; go.textContent = '从这一步重试'; return say(`「${NAME[ev.i]}」失败：有 1 个附件超过 50 MB，移除后可从这一步重试`, 'bad'); }
    if (ev.s === 'run' && prev !== 'run') say(`正在${NAME[ev.i]}（第 ${ev.i + 1} / 4 步）`);
  };
  // 模拟后端：按真实阶段推送事件；结束后再故意送来一条迟到的旧事件
  const run = (from) => {
    const j = ++job; let seq = 0, t = 0; last = 0; ended = false; failAt = -1; t0 = performance.now();
    rows.forEach((r, i) => { if (i >= from) set(i, 'wait', ''); });
    const at = (ms, ev) => { t += ms; const s = ++seq; setTimeout(() => { if (root.host.isConnected) onEvent({ job: j, seq: s, ...ev }); }, t); };
    for (let i = from; i < 4; i++) {
      at(i === from ? 60 : 180, { i, s: 'run', n: i === 1 ? '0 / 36 张' : i === 3 ? '0 / 8.4 MB' : i === 2 ? '处理中' : '' });
      if (i === 1) for (let k = 6; k <= 36; k += 6) at(200, { i, s: 'run', n: `${k} / 36 张` });
      else if (i === 3) for (let k = 1; k <= 4; k++) at(220, { i, s: 'run', n: `${(2.1 * k).toFixed(1)} / 8.4 MB` });
      else at(i === 2 ? 900 : 600, { i, s: 'run', n: i === 2 ? '处理中' : '' });
      if (i === 2 && bad.checked) { at(500, { i, s: 'fail', n: '附件过大' }); return; }
      at(120, { i, s: 'done', n: DONE[i] });
    }
    at(100, { end: true });
    setTimeout(() => { if (root.host.isConnected) onEvent({ job: j, seq: 3, i: 1, s: 'run', n: '6 / 36 张' }); }, t + 300);
  };
  go.addEventListener('click', () => { if (failAt >= 0 && ended) { bad.checked = false; run(failAt); } else run(0); });
  bad.addEventListener('change', () => say(bad.checked ? '下次导出会在「压缩打包」这一步失败' : '下次导出会正常完成'));
  run(0);
}
</script>
