---
zh: 开始键拆成暂停 / 结束
en: Start splits to pause & stop
order: 70
---

## 是什么

整宽的“开始”胶囊按钮，点下后从中间裂开成“暂停”和“结束”两个按钮，结束后再合回一个并显示本次结果。

## 适合

计时、录音录屏、运动记录、直播这类“开始之后才需要暂停和结束”的单任务页面。

## 不适合

只提交一次的按钮用提交按钮变形（收成转圈再出对勾）；开始前就要给出几个并列操作时直接平铺按钮。

## 注意

裂开前后是不同的按钮，焦点要跟着移到“暂停”，结束后再移回“开始”；“结束”会终止进行中的记录，误点代价高时给撤销。

## 要点

- 空闲时一个整宽胶囊（高 48px）；开始后同一位置从中间分成左右两半，缝隙从 0 张开到 10px，内侧圆角同时变圆，约 300ms 缓出。
- 两个按钮等宽、位置固定：左边“暂停 / 继续”是同一个按钮换文字，右边“结束”用警示色浅底，两者不要一样重。
- 裂开后焦点移到“暂停”，结束后移回“开始”；藏起来的按钮设 visibility: hidden，Tab 不到。
- 计时数字用等宽数字；状态用文字写出（“计时中”“已暂停”），暂停时数字变淡，不只靠颜色。
- 结束时两半合拢、“开始”淡回，原位写出本次结果（“本次专注 25:00，已记入今日”），用 role="status" 播报一次。
- 录了很久的内容，“结束”后给 5 秒撤销，不要叠两层确认框。
- 减少动态效果时去掉缝隙和圆角过渡，直接换成两个按钮。

## 提示词

给{计时页}的主按钮做「开始键拆成暂停 / 结束」：空闲时是整宽“开始”胶囊（高 48px）；点下后同一位置从中间裂开成“暂停”和“结束”两个等宽按钮，缝隙从 0 张开到 10px、内侧圆角变圆，约 300ms 缓出，同时开始计时；“暂停 / 继续”是同一个按钮换文字，“结束”用警示色浅底；裂开后焦点落在“暂停”，藏起的按钮 visibility: hidden；结束后两个按钮合回“开始”，焦点回到“开始”，原位显示本次结果并用 role="status" 播报；计时数字等宽，状态用文字写出；减少动态效果时直接切换，不做缝隙过渡。

## 示例

<link rel="stylesheet" href="../../_shared/app-control-base.css">
<style>
.st{display:grid;place-items:center;padding:12px 16px}
.box{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;max-width:340px}
.top{display:flex;align-items:center;gap:6px;max-width:100%;color:#5b616e;font-size:12px}
.tag{flex:none;padding:0 6px;border-radius:4px;background:#edf1ff;color:#3b5bdb;line-height:18px}
.task{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.time{display:flex;align-items:baseline;font-size:40px;font-weight:600;line-height:46px;font-variant-numeric:tabular-nums;transition:opacity .2s}
.time small{font-size:22px;font-weight:500;color:#5b616e}
.pause .time{opacity:.5}
.sb{position:relative;display:flex;gap:0;width:100%;height:48px;margin-top:2px;transition:gap .3s cubic-bezier(.2,0,0,1)}
.sb button{border:0;font-size:15px;font-weight:600;white-space:nowrap}
.sb button:active{filter:brightness(.92)}
.h{flex:1 1 0;min-width:0;background:#3b5bdb;color:transparent;visibility:hidden;transition:border-radius .3s cubic-bezier(.2,0,0,1),background-color .3s,color .2s,visibility 0s .3s}
.p{border-radius:24px 0 0 24px}
.e{border-radius:0 24px 24px 0}
.go{position:absolute;inset:0;border-radius:24px;background:#3b5bdb;color:#fff;transition:opacity .15s .28s}
.on .sb{gap:10px}
.on .h{border-radius:24px;visibility:visible;transition-delay:0s}
.on .p{background:#1f2329;color:#fff}
.on .e{background:#fdecea;color:#b42318}
.on .go{opacity:0;visibility:hidden;transition:opacity .12s,visibility 0s .12s}
.res{min-height:18px;margin:0;color:#5b616e;font-size:12px;line-height:18px;text-align:center}
.run .res{color:#12805c}
.pause .res{color:#b54708}
.more{display:none;margin:0;color:#8a8f99;font-size:12px}
@container (min-height:220px){.more{display:block}
.box{gap:8px}
.time{font-size:52px;line-height:60px}
.time small{font-size:26px}
}
@media (prefers-reduced-motion:reduce){.sb,.sb button{transition:none!important}
}
</style>

<div class="st"><div class="box"><div class="top"><span class="tag">专注</span><span class="task">写季度复盘</span></div><div class="time" role="timer" aria-label="已计时"><span class="mm">00:00</span><small>.0</small></div><div class="sb"><button type="button" class="h p">暂停</button><button type="button" class="h e">结束</button><button type="button" class="go">开始</button></div><p class="res" role="status">点“开始”计时</p><p class="more">今天已专注 3 次 · 累计 1 小时 25 分</p></div></div>

<script type="module">
export default function demo(root) {
  const box = root.querySelector('.box'), go = root.querySelector('.go'), p = root.querySelector('.p'), e = root.querySelector('.e'), mm = root.querySelector('.mm'), ds = root.querySelector('.time small'), res = root.querySelector('.res');
  let state = 'idle', acc = 0, since = 0;
  const fmt = (ms) => { const s = Math.floor(ms / 1000); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };
  const now = () => acc + (state === 'run' ? performance.now() - since : 0);
  const paint = () => { const t = now(); mm.textContent = fmt(t); ds.textContent = '.' + (Math.floor(t / 100) % 10); };
  const tick = () => { if (!root.host.isConnected || state !== 'run') return; paint(); requestAnimationFrame(tick); };
  const set = (s, msg) => { state = s; box.className = 'box ' + s + (s === 'idle' ? '' : ' on'); res.textContent = msg; };
  const run = () => { since = performance.now(); set('run', '计时中'); p.textContent = '暂停'; tick(); };
  // 裂开 / 合拢时原来的按钮会藏起来，焦点在它上面才跟着移
  go.onclick = () => { const had = root.activeElement === go; acc = 0; run(); if (had) p.focus(); };
  p.onclick = () => { if (state !== 'run') return run(); acc = now(); set('pause', '已暂停，点“继续”接着计时'); p.textContent = '继续'; paint(); };
  e.onclick = () => { const t = now(), had = root.activeElement === e; acc = t; set('idle', `本次专注 ${fmt(t)}，已记入今日`); paint(); if (had) go.focus(); };
  setTimeout(() => { if (root.host.isConnected && state === 'idle') go.click(); }, 500);
}
</script>
