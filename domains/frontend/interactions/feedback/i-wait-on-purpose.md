---
zh: 等待时展示处理步骤
en: Visible work
aka: 看得见的等待 过程可见 比价过程 风控检查过程 让人放心的等待
order: 80
of: i-stage-progress
tab: 展示过程
---

## 是什么

结果分量重的操作，把系统正在做的事一项项亮出来：核对了哪几家、查到什么、排除了谁。结果出来时人知道它是怎么来的，也更愿意相信它。

## 适合

比价、风控审核、额度评估、合规检查、生成体检或分析报告：用户要据此花钱或拍板，过程本身就是依据。

## 不适合

瞬间完成的操作：结果已经在手就直接给，示例里打开“3 分钟前比过”就是这样。导出、打包这类只需要知道进度的长任务用「按实际步骤报进度」。

## 注意

只展示确实在干的活，每一行都对应一次真实的查询或校验。快的活按它实际的速度走完，从不为了显得认真而加延迟。

## 要点

- 列 3–6 项用户听得懂的动作，如“核对 5 家实时价”，写业务对象，不写技术步骤
- 每项回来时亮出查到的东西（价格、理由），用户看到的是证据，不只是时间在走
- 谁先回来谁先亮，顺序由实际结果决定
- 中途就给当前最好的结果（“目前最低 ¥486”），用户可以提前判断
- 被排除的也留在列表里并写原因（“当天无房”），结果才可信
- 完成时高亮胜出的那一项，过程留在结果旁边可回看，一句话写清结论（“比均价省 ¥30”）
- 命中缓存时直接出结果，写明“3 分钟前已核对”，给“重新比价”入口
- 单项超时标“未响应，已跳过”并计入结论，不让一家拖住整体
- role="status" 播报“已核对 2/5”这类节点，单项数值不逐条播
- 减少动态效果时逐项直接亮起，转圈放慢

## 提示词

给{比价流程}做「等待时展示处理步骤」：列出系统实际要核对的 {项数} 项（用业务名称，如 {各报价渠道}），每项由后端事件推进，不用计时器；谁先回来谁先亮，亮起时显示查到的内容（价格或排除原因）；顶部写“已核对 N/M · 目前最低 X”，中途就能看到当前最好结果；完成后高亮胜出项，一句话写结论，过程保留可回看；被排除和超时的项留在列表里并写原因，超时项计入结论；已有结果或命中缓存时直接显示，写明“N 分钟前已核对”，给“重新比价”；全程不加人为延迟；role="status" 播报进度节点；减少动态效果时逐项直接亮起。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;place-items:center;padding:6px 10px;font-size:12px}
.box{display:flex;flex-direction:column;gap:4px;width:100%;max-width:440px;max-height:100%;padding:8px 10px;background:#fff;border:1px solid #e3e6eb;border-radius:12px}
.hd{flex:none;display:flex;align-items:center;justify-content:space-between;gap:8px}
.hd b{min-width:0;font-size:13px;font-weight:600;white-space:nowrap}
.hd .ctl{flex:none;height:26px;padding:0 10px;font-size:12px}
.sw{font-size:11px}
.sw input:checked+i{background:#3b5bdb}
.mid{flex:none;display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:20px}
.rs{min-width:0;margin:0;color:#5b616e;white-space:nowrap}
.rs b{color:#1f2329;font-weight:600}
ul{min-height:0;overflow:auto;list-style:none;margin:0;padding:0;display:grid;gap:1px}
li{display:grid;grid-template-columns:16px minmax(0,1fr) auto;align-items:center;gap:6px;height:22px;padding:0 6px;border-radius:5px;color:#8a909c;transition:background-color .2s}
li .ic{display:grid;place-items:center;width:14px;height:14px}
li .dot{width:5px;height:5px;border-radius:50%;background:#c9ced6}
li .ok{display:none;width:14px;height:14px;fill:none;stroke:#12805c;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
li .sp{display:none;width:12px;height:12px}
li .n{white-space:nowrap}
li .v{font-variant-numeric:tabular-nums;white-space:nowrap}
li[data-s=run]{color:#1f2329}
li[data-s=run] .dot{display:none}
li[data-s=run] .sp{display:block}
li[data-s=done]{color:#1f2329}
li[data-s=done] .dot{display:none}
li[data-s=done] .ok{display:block}
li[data-s=drop]{color:#8a909c}
li[data-s=drop] .dot{background:#b54708}
li[data-s=best]{background:#e8f6f0;color:#0b6b4c;font-weight:600}
li[data-s=best] .dot{display:none}
li[data-s=best] .ok{display:block}
@container (min-height:250px){.box{gap:8px;padding:14px 18px}
li{height:28px;font-size:13px}
.hd b{font-size:14px}
}
@media (prefers-reduced-motion:reduce){li{transition:none}
}
</style>

<div class="st"><div class="box"><div class="hd"><b>西湖店 · 2 晚的最低价</b><button type="button" class="ctl go">重新比价</button></div><div class="mid"><p class="rs" role="status"></p><label class="sw"><input type="checkbox" class="hit"><i></i>3 分钟前比过</label></div><ul aria-label="已核对的报价渠道"></ul></div></div>

<script type="module">
export default function demo(root) {
  // 模拟后端：每家回来一条事件，顺序和用时都不固定；页面只在收到事件时前进
  const SRC = [
    { n: '云栖直连', p: 512, ms: 520 },
    { n: '途悦旅行', p: 486, ms: 900 },
    { n: '海帆商旅', p: null, ms: 1260, why: '当天无房' },
    { n: '会员协议价', p: 498, ms: 1720 },
    { n: '官方门市', p: 568, ms: 2200 },
  ];
  const $ = (q) => root.querySelector(q), ul = $('ul'), rs = $('.rs'), go = $('.go'), hit = $('.hit');
  ul.innerHTML = SRC.map((x) => `<li data-s="wait"><span class="ic"><i class="dot"></i><i class="sp"></i><svg class="ok" viewBox="0 0 14 14"><path d="m3 7.2 2.7 2.7L11 4.2"/></svg></span><span class="n">${x.n}</span><span class="v"></span></li>`).join('');
  const rows = [...ul.children];
  let run = 0;
  const set = (i, s, v) => { rows[i].dataset.s = s; rows[i].querySelector('.v').textContent = v; };
  const finish = (cached) => {
    const ok = SRC.filter((x) => x.p), best = ok.reduce((a, b) => (b.p < a.p ? b : a)), avg = Math.round(ok.reduce((s, x) => s + x.p, 0) / ok.length);
    SRC.forEach((x, i) => { if (x === best) set(i, 'best', `¥${x.p} / 晚`); else if (x.p) set(i, 'done', `¥${x.p}`); else set(i, 'drop', x.why); });
    rs.innerHTML = cached ? `3 分钟前已核对，最低 <b>¥${best.p}</b>` : `最低 <b>¥${best.p}</b>，比均价省 ¥${avg - best.p}`;
    go.disabled = false;
  };
  const start = () => {
    const me = ++run;
    // 命中缓存：结果已经在手，直接给出，不演过程
    if (hit.checked) return finish(true);
    let low = Infinity, done = 0; go.disabled = true; rs.textContent = `正在核对 ${SRC.length} 家实时价`;
    SRC.forEach((_, i) => set(i, 'run', '询价中'));
    SRC.forEach((x, i) => setTimeout(() => {
      if (me !== run || !root.host.isConnected) return;
      done++;
      if (x.p) { set(i, 'done', `¥${x.p}`); low = Math.min(low, x.p); } else set(i, 'drop', x.why);
      rs.innerHTML = `已核对 ${done}/${SRC.length}` + (low < Infinity ? ` · 最低 <b>¥${low}</b>` : '');
      if (done === SRC.length) finish(false);
    }, x.ms));
  };
  go.addEventListener('click', start);
  hit.addEventListener('change', start);
  start();
}
</script>
