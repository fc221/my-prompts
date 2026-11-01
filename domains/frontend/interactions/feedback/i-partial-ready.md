---
zh: 先好的先能用
en: Use results as they land
order: 90
tab: 先好先用
---

## 是什么

一次要出好几份结果时，哪一份先完成就先能预览、下载，其余的在各自的格子里继续显示进度，不用等全部做完。

## 适合

批量导出多尺寸图片、一次生成几份报表、多段录音转文字、一次出好几张图、批量上传。

## 不适合

几份结果互相依赖、单独拿出来没意义的（一份合同的几页、要整体校验的数据导入），等全部完成再一起给；只有一份结果时用按步骤报进度。

## 注意

收到一部分数据不等于这一项完成：只有这一项完整、能直接用了，才开放预览和下载。

## 要点

- 每项按固定 id 原地更新自己的格子，不按完成先后重排，也不整块重新渲染（会丢焦点和勾选）
- 每项分排队 / 生成中 / 可用 / 失败；没好的按钮写“生成中…”并设 aria-disabled，点了也不执行
- 占位先按最终尺寸留好（比例框或骨架），结果出来原地替换，不挤动别的格子和正在看的位置
- 第一项可用时播报“方图已就绪（1 / 4），可以先下载”，之后每项就绪播报一次，数量变化不刷屏
- 一项失败只标这一项，其他项照常可用；“打包下载”这类整批操作等全部结束才开放，并写明还差几项
- 新结果只做 150–200ms 淡入，减少动态效果时直接出现
- 流式输出的文字区分“草稿”和“最终版”，最终版到了才能复制或导出

## 提示词

把{批量任务，如 导出 4 个尺寸的海报}改成「先好的先能用」：每份结果一个固定格子，按结果 id 原地更新，不按完成先后重排；每项显示排队 / 生成中 / 可用 / 失败，占位按最终比例预留，完成后原地替换；某一项完整可用后立即开放这一项的预览和下载，没完成的按钮显示“生成中…”且不可执行；一项失败只影响这一项；“打包下载”等整批操作等全部结束再开放并写明还差几项；每项就绪时用 role="status" 播报一次“{名称}已就绪（已就绪数 / 总数）”。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;align-content:center;padding:8px 12px;--h:50px}
.box{display:flex;flex-direction:column;gap:8px;width:100%;max-width:560px;margin:0 auto;padding:8px 10px;background:#fff;border:1px solid #e3e6eb;border-radius:12px}
.hd{display:flex;align-items:center;gap:6px}
.hd b{flex:1;min-width:0;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.hd .ctl{height:26px;padding:0 10px;font-size:12px}
.zip{height:26px;padding:0 10px;border:1px solid #3b5bdb;border-radius:8px;background:#3b5bdb;color:#fff;font-size:12px;white-space:nowrap}
.zip:hover{background:#3250c8}
.zip[aria-disabled=true]{border-color:#e3e6eb;background:#f5f6f8;color:#8a909c;cursor:not-allowed}
ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}
li{display:flex;flex-direction:column;gap:3px;min-width:0;padding:5px;border:1px solid #eef0f3;border-radius:8px;background:#fafbfc}
.th{display:grid;place-items:center;height:var(--h);border-radius:5px;background:#f1f3f6}
.shape{display:block;position:relative;width:min(100%,calc(var(--h) * var(--ar)));aspect-ratio:var(--ar);border:1.5px dashed #c9ced6;border-radius:3px;overflow:hidden}
li[data-s=run] .shape{border-style:solid;border-color:#dfe3ea;background:linear-gradient(100deg,#eceef2 30%,#f8f9fb 50%,#eceef2 70%) 0 0/300% 100%;animation:sh 1.2s linear infinite}
@keyframes sh{to{background-position:-150% 0}
}
li[data-s=ready] .shape{border:0;background:radial-gradient(circle at 72% 30%,#ffd88a 0 13%,transparent 14%),linear-gradient(165deg,#f08a4b,#c2413c 60%,#6e2340);animation:in .2s ease-out}
li[data-s=ready] .shape::after{content:"";position:absolute;left:12%;bottom:16%;width:46%;height:9%;border-radius:2px;background:rgba(255,255,255,.88);box-shadow:0 calc(var(--h) * -.14) 0 -1px rgba(255,255,255,.6)}
@keyframes in{from{opacity:0}
}
.nm{display:flex;align-items:baseline;gap:4px;min-width:0;font-size:12px;line-height:16px}
.nm b{flex:none;font-weight:600}
.nm small{display:none;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#8a909c;font-size:10px;font-variant-numeric:tabular-nums}
.dl{display:inline-flex;align-items:center;justify-content:center;gap:4px;height:24px;padding:0 4px;border:1px solid #3b5bdb;border-radius:6px;background:#fff;color:#3b5bdb;font-size:12px;white-space:nowrap;overflow:hidden}
.dl:hover{background:#edf1ff}
.dl[aria-disabled=true]{border-color:#e3e6eb;background:#f5f6f8;color:#8a909c;cursor:not-allowed}
.dl .sp{display:none;width:10px;height:10px;border-width:1.5px}
.msg{margin:0;min-height:18px;color:#5b616e;font-size:12px}
.msg.ok{color:#12805c}
@container (min-height:250px){.st{padding:16px 24px;--h:104px}
.box{gap:12px;padding:14px 16px}
.hd b{font-size:14px}
ul{gap:10px}
li{gap:6px;padding:8px}
.nm{font-size:13px}
.nm small{display:block;font-size:11px}
.dl{height:28px}
.dl .sp{display:inline-block}
}
</style>

<div class="st"><div class="box"><div class="hd"><b>秋季市集海报</b><button type="button" class="zip" aria-disabled="true">打包下载</button><button type="button" class="ctl go">重新导出</button></div><ul aria-label="导出结果"></ul><p class="msg" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  // 按显示顺序排列；完成先后和显示顺序无关（ready 是就绪时刻，start 是开始生成的时刻，竖版要排队）
  const D = [
    { id: 'sq', name: '方图', size: '1080×1080', ar: 1, start: 100, ready: 800 },
    { id: 'wide', name: '横版', size: '1920×1080', ar: 16 / 9, start: 100, ready: 2600 },
    { id: 'tall', name: '竖版', size: '1080×1920', ar: 9 / 16, start: 800, ready: 6500 },
    { id: 'band', name: '横幅', size: '1500×500', ar: 3, start: 100, ready: 1400 },
  ];
  const ul = root.querySelector('ul'), msg = root.querySelector('.msg'), zip = root.querySelector('.zip');
  ul.innerHTML = D.map((d) => `<li data-id="${d.id}"><div class="th"><i class="shape" style="--ar:${d.ar}"></i></div><div class="nm"><b>${d.name}</b><small>${d.size}</small></div><button type="button" class="dl"></button></li>`).join('');
  const el = (id) => ul.querySelector(`[data-id="${id}"]`), state = {};
  let run = 0;
  const left = () => D.filter((d) => state[d.id] !== 'ready').length;
  const set = (d, s) => {
    state[d.id] = s; const li = el(d.id), b = li.querySelector('.dl'); li.dataset.s = s;
    b.setAttribute('aria-disabled', String(s !== 'ready'));
    b.innerHTML = s === 'ready' ? '下载' : s === 'run' ? '<i class="sp" aria-hidden="true"></i>生成中' : '排队中';
    b.setAttribute('aria-label', `${s === 'ready' ? '下载' : s === 'run' ? '生成中' : '排队中'}：${d.name} ${d.size}`);
    const n = left(); zip.setAttribute('aria-disabled', String(n > 0));
  };
  const start = () => {
    const r = ++run;
    D.forEach((d) => set(d, 'wait'));
    msg.className = 'msg'; msg.textContent = '开始导出 4 个尺寸，哪个先好就先能下载';
    D.forEach((d) => {
      setTimeout(() => { if (root.host.isConnected && r === run) set(d, 'run'); }, d.start);
      setTimeout(() => {
        if (!root.host.isConnected || r !== run) return;
        set(d, 'ready'); const done = 4 - left();
        msg.className = done === 4 ? 'msg ok' : 'msg';
        msg.textContent = done === 4 ? '4 个尺寸全部就绪，可以打包下载' : `${d.name}已就绪（${done} / 4），可以先下载`;
      }, d.ready);
    });
  };
  ul.addEventListener('click', (e) => {
    const b = e.target.closest('.dl'); if (!b) return;
    const d = D.find((x) => x.id === b.closest('li').dataset.id), n = left();
    msg.className = 'msg';
    msg.textContent = state[d.id] === 'ready' ? `已下载${d.name} ${d.size}${n ? `；其余 ${n} 个仍在生成` : ''}` : `${d.name}还在生成，好了会提示`;
  });
  zip.addEventListener('click', () => {
    const n = left();
    msg.className = n ? 'msg' : 'msg ok';
    msg.textContent = n ? `还差 ${n} 个尺寸，全部完成后才能打包下载` : '已打包下载 4 个尺寸';
  });
  root.querySelector('.go').addEventListener('click', start);
  start();
}
</script>
