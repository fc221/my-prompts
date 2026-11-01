---
zh: 筛选的查询时机
en: When filters trigger a query
aka: 选完就刷新 还是点查询 即时筛选 查询按钮 筛选生效方式 点查询 并发请求
tab: 筛选
order: 181
of: p-fix-admin-query
---

## 是什么

用户改完筛选条件后，什么时候发请求。数据少、结果秒回时，选完就查；数据多、查询慢时，等用户选好再点“查询”，一次查完。示例可以切换数据量和查询方式，连改三个条件就能看出差别。

## 注意

查询慢时每改一个条件都要等，刷新中下一个控件还点不了，连改几次还会堆起并发请求。

## 要点

- 按数据量和查询速度定：结果 1 秒内回来，选完即查；超过 1 秒，或用户常连改多个条件，放查询按钮
- 同类页面用同一种方式，用户才不用每页猜要不要点查询
- 选完即查时控件全程可操作：新请求取消旧请求，只显示最后一次的结果，见「改了条件旧结果作废」
- 文字输入和滑块这类连续变化的控件，停手 300ms 后再查；下拉、勾选立即查
- 点查询时，改了条件还没查，按钮带待应用圆点，结果上方写“N 处未查询”，旧结果保留；Enter 也能查询
- 结果数量用 role="status" 播报，焦点留在刚改的控件上

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.s{padding:12px 16px}
.w{display:flex;flex-direction:column;gap:8px;width:100%;max-width:520px;font-size:12px;line-height:18px}
.hd{display:flex;align-items:center;justify-content:space-between;gap:8px}
.seg{display:inline-flex;padding:2px;background:#e8ebf0;border-radius:7px}
.seg label{position:relative;cursor:pointer}
.seg input{position:absolute;inset:0;margin:0;opacity:0;cursor:pointer}
.seg span{display:block;padding:0 10px;border-radius:5px;line-height:26px;color:#5b616e;white-space:nowrap}
.seg input:checked+span{background:#fff;color:#1f2329;font-weight:600;box-shadow:0 1px 2px rgba(31,35,41,.12)}
.seg input:focus-visible+span{outline:2px solid #3b5bdb;outline-offset:1px}
.fs select:disabled{cursor:not-allowed;background:#eef0f3;color:#8a909c}
.fs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
.fs .sel{display:grid}
.fs .sel>select{width:100%;height:30px;padding:0 20px 0 8px}
.fs .sel::after{margin:0 9px 3px 0}
.rs{display:flex;align-items:center;gap:6px;height:30px}
.tot{flex:1;min-width:0;margin:0;font-size:13px;font-weight:500;white-space:nowrap}
.tot.wait{color:#5b616e;font-size:12px;font-weight:400}
.sp{flex:none;width:14px;height:14px;border:2px solid #c9ced6;border-top-color:#3b5bdb;border-radius:50%;animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}
}
.go{position:relative;height:30px;padding:0 14px;font-size:12px}
.go.dirty::after{content:"";position:absolute;top:-3px;right:-3px;width:8px;height:8px;border:2px solid #f5f6f8;border-radius:50%;background:#b54708}
.tl{display:flex;flex-direction:column;gap:2px;padding-top:6px;border-top:1px solid #e3e6eb}
.ln{display:grid;grid-template-columns:62px minmax(0,1fr) auto;align-items:center;gap:6px;color:#5b616e;font-size:11px;line-height:16px}
.ln.on{color:#1f2329;font-weight:500}
.ch{display:flex;align-items:center;gap:2px;overflow:hidden;height:10px}
.ch i{flex:none;display:block;height:10px;border-radius:2px;width:8px;background:#a8afba}
.ch .q{background:#3b5bdb}
.ch .w{width:20px;background:#f0b35a}
.sm{white-space:nowrap}
.leg{display:flex;gap:10px;font-size:11px;color:#5b616e}
.leg i{display:inline-block;width:8px;height:8px;margin-right:4px;border-radius:2px;background:#a8afba}
.leg .q{background:#3b5bdb}
.leg .w{background:#f0b35a}
@container (max-width:310px){.seg span{padding:0 8px}
}
@media (prefers-reduced-motion:reduce){.sp{animation-duration:1.6s}
}
</style>

<div class="s"><div class="w"><div class="hd"><div class="seg" role="radiogroup" aria-label="查询时机"><label><input type="radio" name="m" value="auto" checked><span>选完即查</span></label><label><input type="radio" name="m" value="manual"><span>点查询</span></label></div><div class="seg" role="radiogroup" aria-label="数据量"><label><input type="radio" name="v" value="few"><span>数据少</span></label><label><input type="radio" name="v" value="many" checked><span>数据多</span></label></div></div><div class="fs" role="group" aria-label="工单筛选"><span class="sel"><select aria-label="状态" data-f="st"><option value="">全部状态</option><option value="0">待处理</option><option value="1">处理中</option><option value="2">已解决</option></select></span><span class="sel"><select aria-label="渠道" data-f="ch"><option value="">全部渠道</option><option value="0">电话</option><option value="1">在线</option><option value="2">邮件</option></select></span><span class="sel"><select aria-label="等级" data-f="lv"><option value="">全部等级</option><option value="0">紧急</option><option value="1">普通</option></select></span></div><div class="rs"><span class="sp" hidden></span><p class="tot" role="status"></p><button type="button" class="btn pri go" hidden>查询</button></div><div class="tl"><div class="ln" data-m="auto"><span>选完即查</span><span class="ch" data-clip aria-hidden="true"></span><span class="sm"></span></div><div class="ln" data-m="manual"><span>点查询</span><span class="ch" data-clip aria-hidden="true"></span><span class="sm"></span></div></div><div class="leg xl" aria-hidden="true"><span><i></i>改一个条件</span><span><i class="q"></i>点查询</span><span><i class="w"></i>等结果</span></div><p class="help xl">数据多时每次查询要 1.2 秒，查询中控件点不了。连改三个条件试试，再切到“点查询”改一遍；切到“数据少”时两种都很快。</p></div></div>

<script type="module">
export default function demo(root) {
  const $ = (q) => root.querySelector(q);
  const LOAD = { few: 150, many: 1200 }, SCALE = { few: 1, many: 640 };
  const ROWS = Array.from({ length: 186 }, (_, i) => { const h = Math.imul(i + 1, 2654435761) >>> 8; return { st: h % 3, ch: (h >> 3) % 3, lv: (h >> 6) % 4 ? 1 : 0 }; });
  const sels = [...root.querySelectorAll('.fs select')], modes = [...root.querySelectorAll('[name=m]')], vols = [...root.querySelectorAll('[name=v]')];
  const tot = $('.tot'), spin = $('.sp'), go = $('.go'), lines = { auto: $('[data-m=auto]'), manual: $('[data-m=manual]') };
  let mode = 'auto', vol = 'many', fresh = true, dirty = 0;
  // 每种方式记一串步骤：c 改条件，q 点查询，w 等结果；默认值是连改三个条件的情况
  const base = () => ({ auto: { s: 'cwcwcw', ms: LOAD[vol] * 3 }, manual: { s: 'cccqw', ms: LOAD[vol] } });
  let tally = base();

  const count = () => ROWS.filter((r) => sels.every((x) => !x.value || r[x.dataset.f] === +x.value)).length * SCALE[vol];
  const paint = () => {
    for (const m in lines) {
      const t = tally[m], req = t.s.replace(/[^w]/g, '').length;
      lines[m].classList.toggle('on', m === mode);
      lines[m].querySelector('.ch').innerHTML = [...t.s].map((c) => `<i class="${c}"></i>`).join('');
      lines[m].querySelector('.sm').textContent = `${req} 次请求 · 等 ${(t.ms / 1000).toFixed(1)} 秒`;
    }
    go.hidden = mode === 'auto';
    go.classList.toggle('dirty', dirty > 0);
    go.setAttribute('aria-label', dirty ? `查询，${dirty} 处改动未应用` : '查询');
  };
  const lock = (on) => sels.forEach((x) => { x.disabled = on; });
  const show = () => { tot.className = 'tot'; tot.textContent = `共 ${count().toLocaleString('en-US')} 条工单` + (dirty ? ` · ${dirty} 处未查询` : ''); };
  const refresh = () => {
    const had = root.activeElement, t = tally[mode], wait = LOAD[vol], slow = mode === 'auto' && vol === 'many';
    t.s += 'w'; t.ms += wait; dirty = 0; lock(slow); spin.hidden = false; go.disabled = true;
    tot.className = 'tot wait'; tot.textContent = slow ? '查询中，下一个条件要等' : '查询中…';
    paint();
    setTimeout(() => {
      if (!root.host.isConnected) return;
      lock(false); spin.hidden = true; go.disabled = false; show();
      if (had && slow) had.focus();
    }, wait);
  };
  const begin = () => { if (fresh) { tally[mode] = { s: '', ms: 0 }; fresh = false; } };
  const changed = () => {
    begin();
    tally[mode].s += 'c';
    if (mode === 'auto') refresh(); else { dirty++; show(); paint(); }
  };

  sels.forEach((x) => x.addEventListener('change', changed));
  go.addEventListener('click', () => { begin(); tally.manual.s += 'q'; refresh(); });
  modes.forEach((r) => r.addEventListener('change', () => {
    mode = r.value; fresh = true;
    if (mode === 'auto' && dirty) { dirty = 0; show(); }
    paint();
  }));
  vols.forEach((r) => r.addEventListener('change', () => {
    vol = r.value; fresh = true; dirty = 0; tally = base();
    show(); paint();
  }));
  show(); paint();
}
</script>
