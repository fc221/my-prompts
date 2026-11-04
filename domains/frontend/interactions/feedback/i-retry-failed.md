---
zh: 只补跑失败的那几项
en: Retry only failures
order: 100
of: i-partial-ready
tab: 只重试失败
---

## 是什么

批量任务部分失败时，成功的照常保留、照常能用，只在失败项上写原因和“重试”；顶部的“重试失败的 N 项”也只补跑这几项。

## 适合

批量开票、导入、上传、发送通知、生成多份文件、同步多家门店的价格。

## 不适合

失败是因为数据本身有错（格式不对、没有权限），重试没用，改成“去修改”入口；必须整批一起成功的操作（转账、库存调拨）整体回滚，不做局部重试。

## 注意

请求超时不等于失败，那一项可能其实已经成功了：先查状态，查不到就标“待确认”，绝不自动再提交一次。

## 要点

- 顶部汇总“已完成 3 / 5 · 1 项失败 · 1 项待确认”，每个失败项在原位置写原因和“重试”，不跳到别的页面
- 重试只重新提交失败项，成功项不重跑，结果和完成时间保持原样
- 正在重试的项按钮锁定并显示“重试中…”，同一项同时只发一次请求，并带上同一个幂等键让后端去重
- 超时项显示“待确认”和“查询结果”：查到已成功就标成功，查到失败才开放重试；扣费、开票、对外发送类操作不自动重提
- 自动重试最多 2–3 次，间隔逐次拉长（如 1、3、9 秒），超过就停下交给用户
- 输入或条件变了，受影响的成功项标为“已过期”并重新处理，不拿旧结果顶用
- role="status" 播报汇总变化（“重试成功，已完成 4 / 5”），不逐项刷屏

## 提示词

给{批量任务，如 批量开票}做「只补跑失败的那几项」：顶部汇总“已完成数 / 总数 · 失败数 · 待确认数”；每项在原位置显示状态，失败项写具体原因和“重试”，数据有误的失败给“去修改”而不是重试；“重试失败的 N 项”只重新提交失败项，成功项不重跑、不改动；重试中的项锁定按钮并带同一幂等键，同一项同时只发一次；超时的项标“待确认”并提供“查询结果”，查到成功就标成功，查不到不自动重提；自动重试最多 3 次且间隔递增；汇总变化用 role="status" 播报。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;align-content:center;gap:6px;padding:8px 12px}
.st>*{width:100%;max-width:520px;margin:0 auto}
.hd{display:flex;align-items:center;gap:6px}
.sum{flex:1;min-width:0;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-variant-numeric:tabular-nums}
.sum small{display:none;margin-left:6px;color:#5b616e;font-size:12px;font-weight:400}
.hd .ctl{height:26px;padding:0 10px;font-size:12px}
.rt{height:26px;padding:0 10px;border:1px solid #3b5bdb;border-radius:8px;background:#3b5bdb;color:#fff;font-size:12px;white-space:nowrap}
.rt:hover{background:#3250c8}
.rt[aria-disabled=true]{border-color:#e3e6eb;background:#f5f6f8;color:#8a909c;cursor:not-allowed}
ul{list-style:none;margin:0 auto;padding:0 10px;background:#fff;border:1px solid #e3e6eb;border-radius:10px}
li{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,auto);align-items:center;gap:10px;height:22px;border-top:1px solid #eef0f3;font-size:12px}
li:first-child{border-top:0}
.nm{justify-self:start;max-width:100%;border-radius:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.amt{color:#5b616e;font-variant-numeric:tabular-nums}
.s{display:flex;align-items:center;justify-content:flex-end;gap:4px;min-width:0;white-space:nowrap;color:#8a909c}
.s svg{flex:none;width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
.s .sp{width:11px;height:11px;border-width:1.5px}
.s small{display:none;color:#8a909c;font-size:11px;font-variant-numeric:tabular-nums}
[data-s=ok] .s{color:#12805c}
[data-s=fail] .s{color:#b42318}
[data-s=unk] .s{color:#b54708}
[data-s=run] .s,[data-s=chk] .s{color:#3b5bdb}
.act{height:18px;margin-left:2px;padding:0 6px;border:1px solid currentColor;border-radius:4px;background:#fff;color:inherit;font-size:11px;line-height:16px}
.act:hover{background:#fef3f2}
[data-s=unk] .act:hover{background:#fffaeb}
.msg{margin:0 auto;min-height:18px;color:#5b616e;font-size:12px}
.msg.ok{color:#12805c}
@container (min-height:250px){.st{gap:10px;padding:16px 24px}
.sum{font-size:14px}
.sum small{display:inline}
ul{padding:0 14px}
li{height:34px;font-size:13px}
.s small{display:inline}
.act{height:22px;padding:0 8px;font-size:12px}
}
</style>

<div class="st"><div class="hd"><b class="sum"></b><button type="button" class="rt" aria-disabled="true">重试失败项</button><button type="button" class="ctl go">重来</button></div><ul aria-label="批量开票结果"></ul><p class="msg" role="status"></p></div>

<script type="module">
export default function demo(root) {
  // 第一次提交的结果：ok 成功、fail 服务繁忙（可重试）、unk 超时（状态未知，可能已经成功）
  const D = [['林间咖啡', 2380, 'ok'], ['南山书屋', 960, 'ok'], ['青禾花艺', 1450, 'fail'], ['北岸健身', 3600, 'ok'], ['白鹭民宿', 5200, 'unk']];
  const ul = root.querySelector('ul'), sum = root.querySelector('.sum'), rt = root.querySelector('.rt'), msg = root.querySelector('.msg');
  const ic = { ok: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="m2.5 6.2 2.3 2.3 4.7-5"/></svg>', fail: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="m3.5 3.5 5 5m0-5-5 5"/></svg>', unk: '<svg viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="4.5"/><path d="M6 3.8v2.6M6 8.4h.01"/></svg>' };
  let run = 0;
  const rows = () => [...ul.children];
  const set = (li, s, note = '') => {
    li.dataset.s = s; const nm = li.querySelector('.nm').textContent;
    li.querySelector('.s').innerHTML = {
      wait: '排队',
      run: '<i class="sp" aria-hidden="true"></i>' + (note || '开具中'),
      chk: '<i class="sp" aria-hidden="true"></i>查询中…',
      ok: ic.ok + (note || '已开具') + ` <small>${li.dataset.t}</small>`,
      fail: ic.fail + `服务繁忙<button type="button" class="act" data-a="retry" aria-label="重试 ${nm}">重试</button>`,
      unk: ic.unk + `超时待确认<button type="button" class="act" data-a="check" aria-label="查询 ${nm} 的开票结果">查询</button>`,
    }[s];
    sync();
  };
  const count = (s) => rows().filter((li) => li.dataset.s === s).length;
  const sync = () => {
    const ok = count('ok'), f = count('fail'), u = count('unk'), busy = count('run') + count('chk');
    sum.innerHTML = `已开 ${ok} / ${D.length} 张<small>${f ? f + ' 张失败' : ''}${f && u ? ' · ' : ''}${u ? u + ' 张待确认' : ''}</small>`;
    rt.setAttribute('aria-disabled', String(!f || busy > 0));
    rt.textContent = rows().some((li) => li.dataset.s === 'run' && li.dataset.n > 1) ? '重试中…' : '重试失败项';
  };
  const later = (ms, r, fn) => setTimeout(() => { if (root.host.isConnected && r === run) fn(); }, ms);
  const say = (t, ok) => { msg.textContent = t; msg.className = ok ? 'msg ok' : 'msg'; };
  const start = () => {
    const r = ++run;
    ul.innerHTML = D.map(([n, a], i) => `<li data-n="0" data-t="10:0${2 + i}"><span class="nm">${n}</span><span class="amt">¥${a.toLocaleString('en-US')}</span><span class="s"></span></li>`).join('');
    rows().forEach((li) => set(li, 'wait'));
    say('正在开具 5 张发票…');
    rows().forEach((li, i) => {
      later(150 + i * 180, r, () => { li.dataset.n = 1; set(li, 'run'); });
      later(650 + i * 260, r, () => {
        set(li, D[i][2]);
        if (i === D.length - 1) say(`${count('fail')} 张失败可重试；${count('unk')} 张超时，先查询再决定`);
      });
    });
  };
  // 只重试失败项：成功项和待确认项都不动；按钮在重试期间锁定，同一项不会发第二次
  const retry = (only) => {
    const r = run, list = (only ? [only] : rows()).filter((li) => li.dataset.s === 'fail');
    if (!list.length) return;
    list.forEach((li) => { li.dataset.n = +li.dataset.n + 1; set(li, 'run', '重试中…'); });
    say(`正在重试 ${list.length} 张，其余不重新提交`);
    later(900, r, () => { list.forEach((li) => set(li, 'ok', '重试成功')); say(`${list.map((li) => li.querySelector('.nm').textContent).join('、')}重试成功，已开 ${count('ok')} / ${D.length} 张`, !count('unk')); });
  };
  const check = (li) => {
    const r = run; set(li, 'chk');
    later(700, r, () => { set(li, 'ok', '已开具'); say(`${li.querySelector('.nm').textContent}：查到超时那次其实已开具，没有重复开票`, !count('fail')); });
  };
  rt.addEventListener('click', () => { if (rt.getAttribute('aria-disabled') !== 'true') retry(); });
  ul.addEventListener('click', (e) => {
    const b = e.target.closest('.act'); if (!b) return;
    const li = b.closest('li'), nm = li.querySelector('.nm');
    if (b.dataset.a === 'retry') retry(li); else check(li);
    nm.tabIndex = -1; nm.focus({ preventScroll: true }); // 按钮被替换后焦点留在这一行，不掉回页面顶部
  });
  root.querySelector('.go').addEventListener('click', start);
  start();
}
</script>
