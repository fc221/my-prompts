---
zh: 改了条件旧结果作废
en: Discard stale results
order: 110
---

## 是什么

用户换了筛选条件、切了对象或重新提交后，之前还没回来的那次结果直接作废：晚到了也不显示，不会盖掉新条件的结果。

## 适合

切换城市、日期、标签页查数据，连续点“重新生成”，快速切换详情对象，取消后马上重新开始。

## 不适合

用户就是想对比几次结果时，旧结果放进历史列表并写清对应哪个条件，而不是作废；输入联想的请求处理见“搜索联想”。

## 注意

前端取消了请求不代表后台停了，旧结果照样可能晚到：拦截要靠每次查询的编号，不能只靠取消请求。

## 要点

- 每次查询生成新编号并记下当时的条件；结果、进度、报错回来时先比对编号，不是当前这一次就丢弃
- 条件一改，结果区立刻显示“正在查询{新条件}…”（骨架或淡化），不让旧数字顶着新标题
- 结果标题始终写出对应条件（“成都 · 本周营业额”），用户能自己核对
- 能中止的请求同时中止，省流量；但拦截仍以编号为准
- 有“停止”按钮时先显示“正在停止…”，后端确认后才写“已停止”；后端不支持就写“已不再等待结果，后台可能仍在处理”
- 被作废的那次如果失败，不弹报错；报错只针对当前这一次
- 验收：让第 1 次查询故意慢 2 秒、第 2 次先回来，页面必须一直显示第 2 次的结果

## 提示词

给{查询区域，如 门店营业额看板}加「改了条件旧结果作废」：每次查询生成递增编号并记录当时的{筛选条件}，响应、进度和报错回来时先比对编号，不是最新一次就丢弃，不写入界面；条件一改，结果区立即显示“正在查询{新条件}…”的骨架，标题始终写明结果对应的条件；可中止的请求同时中止，但拦截以编号为准；“停止”先显示“正在停止…”，后端确认后才显示“已停止”，不支持停止时如实说明；被作废的请求失败时不提示。验收：第 1 次请求延迟 2 秒、第 2 次先返回，页面始终显示第 2 次的结果。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;align-content:center;padding:8px 12px}
.box{display:grid;gap:6px;width:100%;max-width:520px;margin:0 auto;padding:8px 12px;background:#fff;border:1px solid #e3e6eb;border-radius:12px}
.hd{display:flex;align-items:center;gap:8px}
.seg{flex:1;min-width:0;display:flex;gap:2px;padding:2px;border-radius:8px;background:#eef0f3}
.seg button{flex:1;min-width:0;height:24px;padding:0 4px;border:0;border-radius:6px;background:none;color:#5b616e;font-size:12px;white-space:nowrap}
.seg [aria-pressed=true]{background:#fff;color:#1f2329;font-weight:600;box-shadow:0 1px 2px rgba(16,24,40,.12)}
.hd .ctl{height:28px;padding:0 10px;font-size:12px}
.card{display:grid;gap:1px;padding:7px 10px;border:1px solid #e3e6eb;border-radius:10px;background:#fafbfc;transition:border-color .16s,background-color .16s}
.lb{display:flex;align-items:center;gap:6px;min-width:0;color:#5b616e;font-size:12px;white-space:nowrap}
.lb b{color:#1f2329;font-weight:600}
.tag{margin-left:auto;padding:0 6px;border-radius:4px;background:#eef0f3;color:#5b616e;font-size:11px;line-height:18px;font-variant-numeric:tabular-nums}
.num{justify-self:start;font-size:22px;line-height:28px;font-weight:700;font-variant-numeric:tabular-nums;border-radius:5px}
.sub{justify-self:start;color:#12805c;font-size:12px;line-height:16px;border-radius:4px}
.sub.dn{color:#b42318}
.card.ld .num,.card.ld .sub{color:transparent;background:#eceef2}
.card.bad{border-color:#f04438;background:#fef3f2}
.card.bad .lb b{color:#b42318}
.log{display:none;list-style:none;margin:0;padding:0;font-size:12px}
.log li{display:flex;align-items:center;gap:8px;height:24px;border-top:1px solid #eef0f3;color:#5b616e}
.log li:first-child{border-top:0}
.log .id{width:24px;color:#8a909c;font-variant-numeric:tabular-nums}
.log .c{flex:1}
.log .s{padding:0 6px;border-radius:4px;line-height:18px;background:#eef0f3}
.log [data-s=ok] .s{background:#e6f4ee;color:#12805c}
.log [data-s=drop] .c{text-decoration:line-through;color:#8a909c}
.log [data-s=over] .s{background:#fef3f2;color:#b42318}
.ft{display:flex;align-items:center;min-height:18px}
.msg{margin:0;min-height:18px;color:#5b616e;font-size:12px}
.msg.bad{color:#b42318}
.sw input:checked+i{background:#3b5bdb}
@container (min-height:250px){.st{padding:16px 24px}
.box{gap:10px;padding:14px 16px}
.seg button{height:28px;font-size:13px}
.card{padding:10px 14px}
.num{font-size:26px;line-height:34px}
.log{display:block}
}
</style>

<div class="st"><div class="box"><div class="hd"><div class="seg" role="group" aria-label="城市"><button type="button" data-c="杭州" aria-pressed="false">杭州</button><button type="button" data-c="成都" aria-pressed="false">成都</button><button type="button" data-c="西安" aria-pressed="true">西安</button></div><button type="button" class="ctl fast">快速切换</button></div><div class="card"><div class="lb"><b class="city">西安</b><span>· 本周营业额</span><span class="tag">第 0 次</span></div><div class="num">¥64,180</div><div class="sub">较上周 +3.1%</div></div><ol class="log" aria-label="查询记录"></ol><div class="ft"><label class="sw"><input type="checkbox" class="chk" checked><i></i>按编号丢弃旧结果</label></div><p class="msg" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  // 每个城市的返回数据和模拟耗时（杭州最慢）
  const D = { 杭州: [128640, '+6.2%', 2000], 成都: [86420, '-1.8%', 600], 西安: [64180, '+3.1%', 900] };
  const card = root.querySelector('.card'), city = root.querySelector('.city'), tag = root.querySelector('.tag'), num = root.querySelector('.num'), sub = root.querySelector('.sub');
  const log = root.querySelector('.log'), msg = root.querySelector('.msg'), chk = root.querySelector('.chk'), segs = [...root.querySelectorAll('.seg button')];
  const ST = { wait: '等待中', ok: '已显示', drop: '已丢弃', over: '盖掉了新结果' };
  let seq = 0, cur = 0, want = '西安';
  const say = (t, bad) => { msg.textContent = t; msg.className = bad ? 'msg bad' : 'msg'; };
  const mark = (id, s) => { const li = log.querySelector(`[data-id="${id}"]`); if (li) { li.dataset.s = s; li.querySelector('.s').textContent = ST[s]; } };
  const query = (c) => {
    const id = ++seq; cur = id; want = c;
    segs.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.c === c)));
    card.className = 'card ld'; city.textContent = c; tag.textContent = '查询中';
    say(`正在查询${c}…`);
    log.insertAdjacentHTML('afterbegin', `<li data-id="${id}" data-s="wait"><span class="id">#${id}</span><span class="c">${c}</span><span class="s">${ST.wait}</span></li>`);
    while (log.children.length > 3) log.lastElementChild.remove();
    setTimeout(() => respond(id, c), D[c][2]);
  };
  const respond = (id, c) => {
    if (!root.host.isConnected) return;
    if (chk.checked && id !== cur) { mark(id, 'drop'); return say(`第 ${id} 次（${c}）晚到了，已丢弃，仍显示${want}`); }
    const [v, d] = D[c];
    card.className = c === want ? 'card' : 'card bad';
    city.textContent = c; tag.textContent = `第 ${id} 次`;
    num.textContent = '¥' + v.toLocaleString('en-US'); sub.textContent = '较上周 ' + d; sub.className = d[0] === '-' ? 'sub dn' : 'sub';
    if (c === want) { mark(id, 'ok'); say(`已显示${c}的结果（第 ${id} 次查询）`); }
    else { mark(id, 'over'); say(`选的是${want}，显示的却是${c}：第 ${id} 次晚到盖掉了新结果`, true); }
  };
  // 模拟用户先点杭州（慢），0.3 秒后改选成都（快）
  const fast = () => { query('杭州'); setTimeout(() => { if (root.host.isConnected) query('成都'); }, 300); };
  segs.forEach((b) => b.addEventListener('click', () => query(b.dataset.c)));
  root.querySelector('.fast').addEventListener('click', fast);
  chk.addEventListener('change', () => say(chk.checked ? '已开启：只显示最新一次查询的结果' : '已关闭：晚到的旧结果会直接写进界面'));
  setTimeout(() => { if (root.host.isConnected) fast(); }, 400);
}
</script>
