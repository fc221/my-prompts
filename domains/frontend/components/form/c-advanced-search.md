---
zh: 高级查询
en: Advanced search
aka: 组合查询 条件构造器 查询构建器 保存查询条件
order: 56
---

## 是什么

默认只有一个搜索框，展开后用“字段 + 关系 + 值”拼多条条件，点查询才生效；查过的组合可以存下来，下次一点就查。

## 适合

合同、工单、客户、日志这类字段多、每个人查法都不一样的专业后台。

## 不适合

大多数人只用三五个固定条件时用「筛选区」；边看结果边收窄用「分面筛选」。

## 注意

结果上方写出这次查询的完整说法，如“金额 ≥ 50 万，且 30 天内到期”，用户才能核对结果是怎么来的；收起面板后条件继续生效，按钮写“高级（2）”。

## 要点

- 用组件库的表单控件拼，没有现成的查询构造器：每行三个控件，字段和关系用 el-select / n-select / a-select，值按字段类型换成输入框、数字框、日期选择或选项下拉（Element Plus el-input、el-input-number、el-date-picker；Naive UI n-input、n-input-number、n-date-picker；Ant Design Vue a-input、a-input-number、a-date-picker），值按字段类型校验；范围关系写成“介于 A 至 B”
- 条件之间用一个“满足全部 / 满足任一”切换，用按钮式单选（el-radio-group + el-radio-button / n-radio-group + n-radio-button / a-radio-group + a-radio-button）；确实需要括号嵌套时再做条件分组
- 改条件不动结果，改过后查询按钮带待应用圆点；在值输入框按 Enter 等于点查询
- 搜索框的关键词和高级条件同时生效，两者都写进结果说明；值为空的行跳过
- 新增一行后焦点落到新行的字段；删除后焦点到下一行的删除按钮，没有就回到“+ 条件”
- 保存时起名，存的是条件本身，不是当时的结果；常用条件排在搜索框下方，点一下填入并查询
- 字段下线后，存过的条件要标出失效的那一条，其余照常可用
- 查询条件写进地址栏，方便发给同事
- 窄屏每条条件竖排，字段和关系一行、值一行

## 提示词

给{合同列表}加高级查询：用项目组件库的表单控件拼（Element Plus el-select、el-input、el-input-number、el-date-picker、el-radio-group + el-radio-button；Naive UI n-select、n-input、n-input-number、n-date-picker、n-radio-group + n-radio-button；Ant Design Vue a-select、a-input、a-input-number、a-date-picker、a-radio-group + a-radio-button），布局和行为按下面的要求：默认只有一个搜索框，旁边“高级”按钮展开面板，有生效条件时写“高级（N）”；面板里每行是 字段下拉、关系下拉、值，字段有{字段，如 金额、到期日、负责人、状态}，换字段时关系和值控件跟着换，范围关系写“介于 A 至 B”；条件之间一个“满足全部 / 满足任一”按钮式单选；“+ 条件”加一行并聚焦新行，每行有删除按钮；改条件不影响结果，点“查询”或在输入框按 Enter 才生效，改过未查询时按钮带 8px 圆点；结果上方写“N 份合同 · 金额 ≥ 50 万，且 30 天内到期”；“保存”时起名，存条件本身，保存后出现在搜索框下方的常用条件里，点一下填入并查询；值为空的行不参与查询；0 条结果时建议放宽条件；查询条件写进 URL；窄屏每条条件竖排。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.s{padding:8px 12px;font-size:12px;line-height:18px}
.w{display:grid;grid-template-columns:minmax(0,1fr);gap:12px;width:100%;height:100%;max-width:660px}
.l{min-width:0;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:5px}
.sb{display:flex;gap:6px}
.sb .inp{flex:1;width:100%;height:30px;padding:0 8px}
.tg{flex:none;height:30px;padding:0 8px;font-size:12px}
.tg svg{transition:transform .16s}
.tg[aria-expanded=true] svg{transform:rotate(180deg)}
.pn,.cds{display:flex;flex-direction:column;gap:4px}
.cd{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.8fr) minmax(0,1fr) 24px;gap:4px}
.cd .sel{display:grid}
.cd .sel>select,.cd .inp{width:100%;height:28px}
.cd .sel>select{padding:0 18px 0 8px}
.cd .sel::after{margin:0 8px 3px 0}
.cd .inp{padding:0 8px}
.rm{display:grid;place-items:center;width:24px;height:28px;padding:0;border:0;border-radius:4px;background:none;color:#5b616e;cursor:pointer}
.rm:hover{background:#eef0f3;color:#1f2329}
.ac{display:flex;align-items:center;gap:4px;flex-wrap:nowrap}
.ac .sel>select{height:28px;padding:0 18px 0 8px}
.ac .sel::after{margin:0 8px 3px 0}
.ac .btn{height:28px;padding:0 10px;font-size:12px}
.ac .add{padding:0 6px}
.ac .sp{flex:1}
.go{position:relative}
.go.dirty::after{content:"";position:absolute;top:-3px;right:-3px;width:8px;height:8px;border:2px solid #f5f6f8;border-radius:50%;background:#b54708}
.nm{display:flex;gap:4px}
.nm .inp{flex:1;width:100%;height:28px;padding:0 8px}
.nm .btn{height:28px;padding:0 10px;font-size:12px}
.sv{display:flex;flex-wrap:wrap;align-items:center;gap:4px}
.sv button{height:24px;padding:0 8px;border:1px solid #d5d9e0;border-radius:999px;background:#fff;font-size:12px;cursor:pointer;white-space:nowrap}
.sv button:hover{border-color:#3b5bdb;color:#3b5bdb}
.rs{margin:0;min-height:18px;color:#1f2329}
.rs b{font-weight:600}
.rs span{color:#5b616e}
.ls{display:none;min-height:0;overflow:auto;margin:0;padding:0;list-style:none;flex-direction:column;gap:4px;align-self:stretch}
.ls li{display:grid;grid-template-columns:minmax(0,1fr) auto;padding:5px 8px;background:#fff;border:1px solid #e3e6eb;border-radius:6px}
.ls span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ls em{font-style:normal;color:#5b616e;font-size:11px;grid-column:1/-1}
.ls b{font-weight:500;font-variant-numeric:tabular-nums}
.ls .none{color:#5b616e;display:block}
.w.open .sv{display:none}
@container (min-width:560px){.s{padding:12px 16px}
.w{grid-template-columns:minmax(0,1fr) 210px}
.ls{display:flex}
.w.open .sv{display:flex}
.l{justify-content:flex-start;gap:6px}
.sb .inp,.tg{height:32px}
}
@container (max-width:310px){.ac .btn{padding:0 8px}
.ac .sel>select{padding-left:6px}
}
@media (prefers-reduced-motion:reduce){.tg svg{transition:none}
}
</style>

<div class="s"><div class="w open"><div class="l"><div class="sb" role="search" aria-label="查询合同"><input class="inp q" type="search" placeholder="搜合同名称，回车查询" aria-label="搜合同名称" spellcheck="false"><button type="button" class="btn tg" aria-expanded="true" aria-controls="pn"><span></span><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg></button></div><div class="sv" role="group" aria-label="常用条件"></div><div class="pn" id="pn"><div class="cds" role="group" aria-label="查询条件"></div><div class="ac"><button type="button" class="btn txt add">+ 条件</button><span class="sel"><select class="mt" aria-label="条件关系"><option value="all">满足全部</option><option value="any">满足任一</option></select></span><span class="sp"></span><button type="button" class="btn save">保存</button><button type="button" class="btn pri go">查询</button></div></div><div class="nm" hidden><input class="inp" aria-label="给这组条件起名" maxlength="12"><button type="button" class="btn pri ok">存下</button></div><p class="rs" role="status"></p></div><ul class="ls" aria-label="查询结果"></ul></div></div>

<script type="module">
export default function demo(root) {
  const PEOPLE = ['周岚', '陈序', '何屿', '林知夏'], ST = ['履行中', '待续签', '已终止'];
  const NAMES = ['云图设备采购', '华景物业服务', '启航软件授权', '海帆物流框架', '青禾食材供应', '远山厂房租赁', '星河广告投放', '衡石审计服务', '北辰数据服务', '南风保洁外包', '嘉木办公家具', '长川仓储租赁'];
  const DATA = NAMES.map((n, i) => ({ n, amt: [86, 12, 240, 58, 33, 410, 95, 18, 150, 9, 27, 64][i], due: [12, 240, 25, 88, 9, 60, 21, 300, 18, 45, 150, 27][i], owner: PEOPLE[i % 4], st: ST[i % 5 === 4 ? 2 : i % 3 === 1 ? 1 : 0] }));
  const F = {
    amt: { t: '金额', ops: { '≥': (a, b) => a >= b, '≤': (a, b) => a <= b }, unit: ' 万', ph: '万元' },
    due: { t: '到期', ops: { '内': (a, b) => a <= b, '后': (a, b) => a > b }, unit: ' 天', ph: '天' },
    owner: { t: '负责人', ops: { '是': (a, b) => a === b, '不是': (a, b) => a !== b }, opts: PEOPLE },
    st: { t: '状态', ops: { '是': (a, b) => a === b, '不是': (a, b) => a !== b }, opts: ST },
  };
  const XS = '<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7"/></svg>';
  const $ = (q) => root.querySelector(q), w = $('.w'), q = $('.q'), tg = $('.tg'), cds = $('.cds'), mt = $('.mt'), pn = $('.pn'), go = $('.go'), rs = $('.rs'), ls = $('.ls'), sv = $('.sv'), nm = $('.nm'), nmIn = $('.nm input');
  const opt = (arr, cur) => arr.map((x) => `<option value="${x}"${x === cur ? ' selected' : ''}>${x}</option>`).join('');
  let conds = [{ f: 'amt', op: '≥', v: '50' }, { f: 'due', op: '内', v: '30' }], match = 'all', dirty = false, saved = [{ n: '快到期的大合同', conds: [{ f: 'amt', op: '≥', v: '50' }, { f: 'due', op: '内', v: '30' }], match: 'all' }, { n: '待续签', conds: [{ f: 'st', op: '是', v: '待续签' }], match: 'all' }];

  const label = (c) => { const f = F[c.f]; return f.opts ? `${f.t}${c.op}${c.v}` : c.f === 'due' ? (c.op === '内' ? `${c.v} 天内到期` : `${c.v} 天后到期`) : `${f.t} ${c.op} ${c.v} 万`; };
  const row = (c, i) => { const f = F[c.f]; return `<div class="cd" data-i="${i}"><span class="sel"><select class="f" aria-label="第 ${i + 1} 条的字段">${Object.entries(F).map(([k, x]) => `<option value="${k}"${k === c.f ? ' selected' : ''}>${x.t}</option>`).join('')}</select></span><span class="sel"><select class="o" aria-label="第 ${i + 1} 条的关系">${opt(Object.keys(f.ops), c.op)}</select></span>${f.opts ? `<span class="sel"><select class="v" aria-label="第 ${i + 1} 条的值">${opt(f.opts, c.v)}</select></span>` : `<input class="inp v" inputmode="numeric" value="${c.v}" placeholder="${f.ph}" aria-label="第 ${i + 1} 条的值，单位${f.ph}">`}<button type="button" class="rm" aria-label="删除第 ${i + 1} 条">${XS}</button></div>`; };
  const drawForm = () => { cds.innerHTML = conds.map(row).join(''); mt.value = match; };
  const drawSaved = () => { sv.innerHTML = saved.map((s, i) => `<button type="button" data-i="${i}">${s.n}</button>`).join(''); };
  const mark = (on) => { dirty = on; go.classList.toggle('dirty', on); go.setAttribute('aria-label', on ? '查询，条件已修改，尚未生效' : '查询'); };
  const toggleLabel = () => { tg.querySelector('span').textContent = pn.hidden && conds.length ? `高级（${conds.length}）` : '高级'; };
  // 只有这里读取条件：改表单不影响结果，点查询或回车才生效
  const run = () => {
    const kw = q.value.trim(), test = (x, c) => { const f = F[c.f], val = f.opts ? c.v : +c.v; return f.ops[c.op](x[c.f], val); };
    const use = conds.filter((c) => c.v !== '');
    const hit = DATA.filter((x) => (!kw || x.n.includes(kw)) && (!use.length || (match === 'all' ? use.every((c) => test(x, c)) : use.some((c) => test(x, c)))));
    const why = [kw && `名称含“${kw}”`, use.map(label).join(match === 'all' ? '，且 ' : '，或 ')].filter(Boolean).join('，');
    rs.innerHTML = `<b>${hit.length} 份合同</b>${why ? `<span> · ${why}</span>` : ''}`;
    ls.innerHTML = hit.length ? hit.map((x) => `<li><span>${x.n}</span><b>${x.amt} 万</b><em>${x.owner} · ${x.due} 天后到期 · ${x.st}</em></li>`).join('') : '<li class="none">没有符合的合同，放宽一个条件试试</li>';
    mark(false);
  };
  const openName = (on) => { nm.hidden = !on; rs.hidden = on; if (on) { nmIn.value = ''; nmIn.placeholder = '起个名字，如 本季到期'; nmIn.focus(); } else $('.save').focus(); };

  cds.addEventListener('input', (e) => {
    const box = e.target.closest('.cd'); if (!box) return; const c = conds[+box.dataset.i];
    if (e.target.classList.contains('f')) { c.f = e.target.value; const f = F[c.f]; c.op = Object.keys(f.ops)[0]; c.v = f.opts ? f.opts[0] : ''; drawForm(); cds.children[+box.dataset.i].querySelector('.f').focus(); } else if (e.target.classList.contains('o')) c.op = e.target.value; else c.v = e.target.value;
    mark(true);
  });
  cds.addEventListener('click', (e) => {
    const b = e.target.closest('.rm'); if (!b) return; const i = +b.parentElement.dataset.i;
    conds.splice(i, 1); drawForm(); mark(true); (cds.querySelectorAll('.rm')[Math.min(i, conds.length - 1)] || $('.add')).focus();
  });
  $('.add').addEventListener('click', () => {
    if (conds.length >= 3) { rs.textContent = '卡片里最多放 3 条，先删一条'; return; }
    conds.push({ f: 'owner', op: '是', v: PEOPLE[0] }); drawForm(); mark(true); cds.lastElementChild.querySelector('.f').focus();
  });
  mt.addEventListener('change', () => { match = mt.value; mark(true); });
  go.addEventListener('click', run);
  q.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.isComposing) run(); });
  tg.addEventListener('click', () => { pn.hidden = !pn.hidden; w.classList.toggle('open', !pn.hidden); tg.setAttribute('aria-expanded', String(!pn.hidden)); toggleLabel(); });
  sv.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return; const s = saved[+b.dataset.i];
    conds = s.conds.map((c) => ({ ...c })); match = s.match; drawForm(); toggleLabel(); run();
  });
  $('.save').addEventListener('click', () => openName(true));
  const commit = () => { const n = nmIn.value.trim(); if (!n) return nmIn.focus(); saved.push({ n, conds: conds.map((c) => ({ ...c })), match }); drawSaved(); openName(false); rs.textContent = `已保存“${n}”，下次一点就查`; };
  $('.ok').addEventListener('click', commit);
  nmIn.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.isComposing) commit(); if (e.key === 'Escape') openName(false); });
  drawForm(); drawSaved(); toggleLabel(); run();
}
</script>
