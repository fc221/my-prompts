---
zh: 手机上选日期的六种控件
en: Mobile date pickers compared
aka: 日期选择器 手机日历 入住离店 生日滚轮 日期带 月份选择 预约时段
of: c-date
tab: 手机上
order: 72
---

## 是什么

手机上选日期常用的六种控件放在一起比：单日日历、区间、滚轮、横滑日期带、月份网格、时段预约。每一种都能在示例里点，换一种控件，写回的结果也跟着变。

## 适合

表单要填日期、订票订房、排课排班、账单筛选、到店预约，动手前先定用哪一种。

## 不适合

桌面端的日期输入框和弹出日历看「日期与时间选择」；只挑几点几分看「滚轮时间选择」；按周、按月看日程的整页看「日历视图」。

## 注意

先看粒度，再看离今天多远。生日做成日历，要一个月一个月往回翻好几百下；账单月份做成日历，又多问了一个没人关心的“哪一天”。

## 要点

- 单日日历：订票、挂号、约交付日，要对照星期和前后几天。打开时定位到今天或已选日期，今天单独描边，过去的日期显示但不能点
- 区间：订酒店、租车。第一下定开始，第二下定结束，中间连成一片，马上显示“共 N 晚”；第二下早于开始日就改成新的开始日，选完再点从头选
- 滚轮：生日、入职年份，离今天很远、用户心里早有答案。年月日三列，换年月后日的上限跟着变（2 月只到 28 或 29），默认停在常见年龄段
- 横滑日期带：课表、排班、赛程，日期和当天内容在同一屏。点日期内容立刻换，当天没内容时写明“这天没有课”
- 月份网格：账单、月报、工资条，只要整月。一屏 12 个月，左右切年份，还没结束的月份置灰
- 时段预约：理发、门诊、上门服务。约满的时段显示但不能点，底部常驻汇总栏写清日期、时段、时长，确认按钮放在汇总栏里
- 手机上每格高度至少 44px；格子用按钮，读屏念完整日期和星期，滚轮能用方向键逐项移动
- 跟 AI 说清楚四件事：选到什么粒度（一天、一段、整月、时段）；哪些可选（过去、休息日、库存）；怎么操作（点一下、点两下、滚动，选完自动收起还是点确认）；选完写回哪（哪个字段、什么格式、页面内容要不要刷新）

## 提示词

在{产品}的{页面}做手机端日期选择，用户要选{选什么，如入住和离店日期}，用来{用途}。先按顺序判断用哪一种，说明理由后只实现这一种：只要整月，用月份网格（一屏 12 个月，左右切年）；要一天里的时段，用时段预约（约满的置灰，底部汇总栏写日期、时段、时长和确认按钮）；要两个日期，用区间（第一下开始、第二下结束，中间连成一片，显示共 N 晚或共 N 天）；日期和当天内容要同屏，用横滑日期带（点日期内容立刻换，没内容时写明）；离今天很远且用户早知道答案，用滚轮（年月日三列，日的上限跟着年月变）；其余用单日日历（定位到今天，今天单独标记）。粒度到{天 / 月 / 时段}；可选范围是{如今天起 90 天内、周一休息}，不可选的显示但不能点；选完{自动收起 / 点确认才生效}；结果写回{字段}，显示成{如 11月18日 周三}。

## 示例

<link rel="stylesheet" href="../../_shared/pick.css">
<style>
.x-w{--c:22px;--f:11px;--r:30px;--ow:92px;width:100%;max-width:460px;display:flex;flex-direction:column;gap:5px;font-size:12px;line-height:16px}
.x-w button{border:0;background:none;color:inherit;font:inherit;cursor:pointer}
.x-w button:disabled{cursor:not-allowed}
.x-w button:focus-visible,.x-col:focus-visible{outline:2px solid #3b5bdb;outline-offset:1px}
.x-row{display:flex;align-items:center;gap:10px}
.x-out{flex:none;width:var(--ow);padding:6px 8px;border-radius:8px;background:#fff;box-shadow:0 0 0 1px #e3e6eb}
.x-out small{display:block;color:#5b616e;font-size:11px}
.x-out b{display:block;font-size:13px;font-variant-numeric:tabular-nums;white-space:nowrap}
.x-cal{flex:1;min-width:0;display:grid;grid-template-columns:repeat(7,minmax(0,1fr))}
.x-cal span{color:#5b616e;font-size:var(--f);line-height:14px;text-align:center}
.x-cal .x-m{grid-column:1/-1;display:none;font-weight:600;line-height:20px;text-align:left;color:#1f2329}
.x-w .x-cal button{height:var(--c);border-radius:6px;font-size:var(--f);font-variant-numeric:tabular-nums}
.x-w .x-cal button:disabled{color:#a9afba}
.x-w .x-cal .x-today{box-shadow:inset 0 0 0 1px #3b5bdb}
.x-w .x-cal .x-in{border-radius:0;background:#e3e9fd}
.x-w .x-cal .x-on{background:#3b5bdb;color:#fff;font-weight:600}
.x-wheel{position:relative;flex:1;min-width:0;display:flex;gap:2px;height:calc(var(--r) * 3)}
.x-wheel::before{content:"";position:absolute;left:0;right:0;top:var(--r);height:var(--r);border-radius:8px;background:#e3e9fd}
.x-col{position:relative;flex:1;min-width:0;overflow-y:auto;padding:var(--r) 0;border-radius:8px;scroll-snap-type:y mandatory;scrollbar-width:none;overscroll-behavior:contain;text-align:center}
.x-col::-webkit-scrollbar{display:none}
.x-col span{display:block;height:var(--r);line-height:var(--r);color:#5b616e;scroll-snap-align:center;font-variant-numeric:tabular-nums}
.x-col .x-on{color:#1f2329;font-weight:600}
.x-strip{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;scroll-snap-type:x proximity}
.x-strip::-webkit-scrollbar{display:none}
.x-w .x-strip button{flex:none;width:42px;height:44px;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;scroll-snap-align:start;background:#fff;box-shadow:inset 0 0 0 1px #e3e6eb}
.x-strip small{color:#5b616e;font-size:11px;line-height:14px}
.x-strip b{font-size:14px;line-height:18px;font-variant-numeric:tabular-nums}
.x-w .x-strip .x-on{background:#3b5bdb;color:#fff;box-shadow:none}
.x-strip .x-on small{color:#dfe6ff}
.x-list{display:flex;flex-direction:column;gap:3px;min-height:51px}
.x-li{display:flex;justify-content:space-between;gap:8px;margin:0;padding:3px 8px;border-radius:6px;background:#fff;white-space:nowrap}
.x-li span{color:#5b616e}
.x-none{margin:0;padding:3px 8px;color:#5b616e}
.x-yr{display:flex;align-items:center;gap:4px}
.x-w .x-yr button{width:28px;height:26px;border-radius:6px;font-size:15px;line-height:1}
.x-w .x-yr button:disabled{color:#a9afba}
.x-yr b{font-variant-numeric:tabular-nums}
.x-yr output{margin-left:auto;color:#3b5bdb;font-weight:600;white-space:nowrap}
.x-mon{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:4px}
.x-w .x-mon button{height:30px;border-radius:6px;background:#fff;box-shadow:inset 0 0 0 1px #e3e6eb;font-variant-numeric:tabular-nums}
.x-w .x-mon button:disabled{background:none;color:#a9afba;box-shadow:none}
.x-w .x-mon .x-on{background:#3b5bdb;color:#fff;font-weight:600;box-shadow:none}
.x-slots{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px}
.x-w .x-slots button{height:28px;border-radius:6px;background:#fff;box-shadow:inset 0 0 0 1px #e3e6eb;font-variant-numeric:tabular-nums}
.x-w .x-slots button:disabled{background:none;box-shadow:none;color:#8a909c;text-decoration:line-through}
.x-w .x-slots .x-on{background:#3b5bdb;color:#fff;font-weight:600;box-shadow:none}
.x-sum{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:2px 2px 2px 8px;border-radius:8px;background:#fff;box-shadow:0 0 0 1px #e3e6eb;white-space:nowrap}
.x-w .x-sum button{height:28px;padding:0 10px;border-radius:6px;background:#3b5bdb;color:#fff;font-weight:600}
.x-w .x-sum button:disabled{background:#e4e6eb;color:#6b7280}
@container (min-height:260px){
.x-w{--c:34px;--f:13px;--r:44px;--ow:124px;gap:10px;font-size:13px}
.x-cal .x-m{display:block}
.x-cal span{line-height:20px}
.x-w .x-strip button{width:54px;height:56px}
.x-list{min-height:64px;gap:6px}
.x-li{padding:6px 10px}
.x-w .x-mon button{height:44px}
.x-w .x-slots button{height:42px}
.x-w .x-sum button{height:36px;padding:0 14px}
}
</style>

<script type="module">
import { pick } from '../../_shared/pick.ts';

const WD = '日一二三四五六';
const day = (i) => new Date(2026, 10, 2 + i); // 示例日历固定从 11 月 2 日周一排 28 天
const md = (i) => `${day(i).getMonth() + 1}月${day(i).getDate()}日`;
const wk = (i) => '周' + WD[day(i).getDay()];
const TODAY = 9;
const cal = (head) =>
  `<div class="x-cal"><span class="x-m">${head}</span>${[...'一二三四五六日'].map((x) => `<span aria-hidden="true">${x}</span>`).join('')}` +
  Array.from({ length: 28 }, (_, i) =>
    `<button type="button" data-i="${i}" aria-label="${md(i)} ${wk(i)}${i === TODAY ? ' 今天' : ''}"${i < TODAY ? ' disabled' : ''}${i === TODAY ? ' class="x-today"' : ''}>${day(i).getDate()}</button>`,
  ).join('') +
  '</div>';
const out = (label) => `<div class="x-out" role="status"><small>${label}</small><b></b><small class="x-sub"></small></div>`;
const cells = (el) => [...el.querySelectorAll('[data-i]')];
const mark = (b, on, inner) => {
  b.classList.toggle('x-on', on);
  b.classList.toggle('x-in', !!inner);
  b.setAttribute('aria-pressed', String(on));
};

function initSingle(el) {
  let cur = 15;
  const paint = () => {
    cells(el).forEach((b, i) => mark(b, i === cur));
    el.querySelector('.x-out b').textContent = md(cur);
    el.querySelector('.x-sub').textContent = wk(cur);
  };
  el.querySelector('.x-cal').addEventListener('click', (e) => {
    const b = e.target.closest('[data-i]');
    if (!b) return;
    cur = +b.dataset.i;
    paint();
  });
  paint();
}

function initRange(el) {
  let a = 15, b = 18;
  const paint = () => {
    cells(el).forEach((c, i) => mark(c, i === a || i === b, b !== null && i > a && i < b));
    el.querySelector('.x-out b').textContent = b === null ? md(a) : `共 ${b - a} 晚`;
    el.querySelector('.x-sub').textContent = b === null ? '再点离店日' : `${md(a)}–${day(b).getDate()}日`;
  };
  el.querySelector('.x-cal').addEventListener('click', (e) => {
    const c = e.target.closest('[data-i]');
    if (!c) return;
    const i = +c.dataset.i;
    if (b !== null || i <= a) { a = i; b = null; } else b = i;
    paint();
  });
  paint();
}

function column(col, label, onMove) {
  const rowH = () => col.querySelector('span').offsetHeight;
  const api = {
    vals: [],
    idx: 0,
    fill(vals, idx) {
      api.vals = vals;
      api.idx = Math.min(idx, vals.length - 1);
      col.innerHTML = vals.map((v) => `<span>${v}</span>`).join('');
      col.scrollTop = api.idx * rowH();
      api.paint();
    },
    paint() {
      [...col.children].forEach((s, i) => s.classList.toggle('x-on', i === api.idx));
      col.setAttribute('aria-valuenow', api.vals[api.idx]);
      col.setAttribute('aria-valuemin', api.vals[0]);
      col.setAttribute('aria-valuemax', api.vals[api.vals.length - 1]);
    },
  };
  col.tabIndex = 0;
  col.setAttribute('role', 'spinbutton');
  col.setAttribute('aria-label', label);
  col.addEventListener('scroll', () => {
    const i = Math.max(0, Math.min(api.vals.length - 1, Math.round(col.scrollTop / rowH())));
    if (i === api.idx) return;
    api.idx = i;
    api.paint();
    onMove();
  });
  col.addEventListener('keydown', (e) => {
    const step = { ArrowUp: -1, ArrowDown: 1 }[e.key];
    if (!step) return;
    e.preventDefault();
    col.scrollTop = Math.max(0, api.idx + step) * rowH();
  });
  return api;
}

function initWheel(el) {
  const [cy, cm, cd] = el.querySelectorAll('.x-col');
  const span = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
  const paint = () => {
    el.querySelector('.x-out b').textContent = `${y.vals[y.idx]}年`;
    el.querySelector('.x-sub').textContent = `${m.vals[m.idx]}月${d.vals[d.idx]}日`;
  };
  const sync = () => {
    const last = new Date(y.vals[y.idx], m.vals[m.idx], 0).getDate(); // 换年月后，日的上限跟着变
    if (d.vals.length !== last) d.fill(span(1, last), d.idx);
    paint();
  };
  const y = column(cy, '年', sync), m = column(cm, '月', sync), d = column(cd, '日', paint);
  y.fill(span(1950, 2026), 46);
  m.fill(span(1, 12), 2);
  d.fill(span(1, 31), 17);
  paint();
}

const PLANS = [
  [['09:30 流瑜伽', '余 3 位'], ['19:00 普拉提', '余 1 位']],
  [['18:30 搏击操', '余 6 位']],
  [],
  [['10:00 肩颈放松', '余 2 位'], ['20:00 燃脂单车', '约满']],
];
function initStrip(el) {
  const list = el.querySelector('.x-list');
  const btns = [...el.querySelectorAll('.x-strip button')];
  const go = (k) => {
    btns.forEach((b, i) => { b.classList.toggle('x-on', i === k); b.setAttribute('aria-pressed', String(i === k)); });
    const rows = PLANS[k % PLANS.length];
    list.innerHTML = rows.length ? rows.map(([a, b]) => `<p class="x-li">${a}<span>${b}</span></p>`).join('') : '<p class="x-none">这天没有课</p>';
  };
  btns.forEach((b, i) => b.addEventListener('click', () => go(i)));
  go(0);
}

function initMonth(el) {
  let y = 2026, cur = { y: 2026, m: 9 };
  const btns = [...el.querySelectorAll('.x-mon button')];
  const [prev, next] = el.querySelectorAll('.x-yr button');
  const paint = () => {
    el.querySelector('.x-yr b').textContent = `${y} 年`;
    prev.disabled = y === 2025;
    next.disabled = y === 2026;
    btns.forEach((b, i) => {
      b.disabled = y === 2026 && i > 9; // 账单只有已结束的月份
      const on = y === cur.y && i === cur.m;
      b.classList.toggle('x-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
    el.querySelector('output').textContent = `已选 ${cur.y} 年 ${cur.m + 1} 月账单`;
  };
  prev.addEventListener('click', () => { y--; paint(); });
  next.addEventListener('click', () => { y++; paint(); });
  btns.forEach((b, i) => b.addEventListener('click', () => { cur = { y, m: i }; paint(); }));
  paint();
}

const SLOTS = [['09:00', 0], ['09:45', 1], ['10:30', 0], ['11:15', 1], ['14:00', 0], ['14:45', 0], ['15:30', 1], ['16:15', 0]];
function initSlot(el) {
  let cur = 4, booked = false;
  const btns = [...el.querySelectorAll('.x-slots button')];
  const txt = el.querySelector('.x-sum span'), ok = el.querySelector('.x-sum button');
  const paint = () => {
    btns.forEach((b, i) => { b.classList.toggle('x-on', i === cur); b.setAttribute('aria-pressed', String(i === cur)); });
    txt.textContent = booked ? `已约 ${SLOTS[cur][0]}` : `周四 ${SLOTS[cur][0]} · 45 分钟`;
    ok.disabled = booked;
    ok.textContent = booked ? '已确认' : '确认预约';
  };
  btns.forEach((b, i) => b.addEventListener('click', () => { cur = i; booked = false; paint(); }));
  ok.addEventListener('click', () => { booked = true; paint(); });
  paint();
}

export default function demo(root) {
  pick(root, [
    {
      name: '单日日历',
      fit: '订票、挂号：要看星期和前后几天',
      html: `<div class="x-w"><div class="x-row">${cal('2026 年 11 月')}${out('出发日期')}</div></div>`,
      init: initSingle,
    },
    {
      name: '区间',
      fit: '订酒店、租车：点两头，马上算出几晚',
      html: `<div class="x-w"><div class="x-row">${cal('2026 年 11 月')}${out('入住时长')}</div></div>`,
      init: initRange,
    },
    {
      name: '滚轮',
      fit: '生日：离今天很远，翻月太慢',
      html: `<div class="x-w"><div class="x-row"><div class="x-wheel"><div class="x-col"></div><div class="x-col"></div><div class="x-col"></div></div>${out('出生日期')}</div></div>`,
      init: initWheel,
    },
    {
      name: '日期带',
      fit: '课表、排班：日期和当天内容同屏',
      html: `<div class="x-w"><div class="x-strip" role="group" aria-label="选日期">${Array.from({ length: 14 }, (_, i) => `<button type="button" aria-label="${md(TODAY + i)}"><small>${i ? wk(TODAY + i) : '今天'}</small><b>${day(TODAY + i).getDate()}</b></button>`).join('')}</div><div class="x-list" role="status"></div></div>`,
      init: initStrip,
    },
    {
      name: '月份网格',
      fit: '账单、报表：只要整月，不问哪一天',
      html: `<div class="x-w"><div class="x-yr"><button type="button" aria-label="上一年">‹</button><b></b><button type="button" aria-label="下一年">›</button><output></output></div><div class="x-mon">${Array.from({ length: 12 }, (_, i) => `<button type="button">${i + 1}月</button>`).join('')}</div></div>`,
      init: initMonth,
    },
    {
      name: '时段预约',
      fit: '理发、门诊：约满的不能点，底部汇总',
      html: `<div class="x-w"><div class="x-slots">${SLOTS.map(([t, full]) => `<button type="button"${full ? ` disabled aria-label="${t} 已约满"` : ''}>${t}</button>`).join('')}</div><div class="x-sum" role="status"><span></span><button type="button">确认预约</button></div></div>`,
      init: initSlot,
    },
  ]);
}
</script>
