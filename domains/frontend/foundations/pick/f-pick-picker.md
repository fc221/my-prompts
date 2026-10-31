---
zh: 手机上选数值的五种控件
en: Mobile value pickers compared
aka: 刻度尺 双端滑块 范围滑块 步进器 加减数量 级联 地址选择 日期范围
order: 50
---

## 是什么

手机上让用户定一个值，常用五种控件：刻度尺、双端范围滑块、步进器、级联、日期范围。差别在选的是一个数、一段范围、一条路径，还是两个日期，以及有什么限制。

## 适合

记录体重、筛价格、改数量、选地址、填请假日期，动手前先定用哪一种。

## 不适合

桌面端的单值滑块看「滑块」；键盘直接输入看「数字输入」；桌面级联看「级联选择」；纯选日期的其他形式看「手机上选日期的六种控件」；一把尺调多个参数看「横向刻度尺调参」。

## 注意

控件要跟精度和范围匹配。900 这样的数用步进器要点几百下；步长 1 元、范围上万的滑块，手指根本停不准，这时要配数字输入。

## 要点

- 刻度尺：范围大、步长固定的单个数，如体重、身高。指针不动，尺子滑动，松手吸附到最近一格，大字实时显示；方向键走一格，PageUp、PageDown 走十格
- 双端范围滑块：连续区间，如价格、距离。拖动时实时显示两端和结果数；两端保持最小间隔，顶到时停住，两个手柄不交叉；手柄触控区至少 44px，用原生 range 就有键盘操作
- 步进器：小范围整数，如份数、人数。到下限减号置灰，到上限加号置灰并说明原因；置灰后焦点留在原处
- 级联：选项有层级，下一级取决于上一级，如地址、类目。上一级一变，下级清空重选，顶部实时显示已选路径和还差哪一级；层级多时每级一屏，手机上一屏并排最多三列
- 日期范围：起止两天，常带时长上限，如请假、租车。选好开始日后，超过上限的日期立即置灰，顶部写明“最多 5 天”和已选天数
- 跟 AI 说清楚四件事：用什么控件；选什么（单位、范围、步长、默认值）；怎么操作（拖、点、滚，结果什么时候生效）；限制条件（上下限、最小间隔、联动规则、超限时怎么提示）

## 提示词

在{产品}的{页面}做手机端数值选择，用户要选{选什么}，单位{单位}，范围{最小}到{最大}，步长{步长}，默认{默认值}。先判断用哪一种，说明理由后只实现这一种：范围大的单个数，用刻度尺（指针不动、尺子滑动，松手吸附，大字实时显示）；一段连续区间，用双端范围滑块（实时显示两端和结果数，两端最小间隔{最小间隔}，顶到时停住）；小范围整数，用步进器（到上下限时对应按钮置灰）；有层级的选项，用级联（下一级跟上一级，上一级一变下级清空，显示已选路径）；起止两个日期，用日期范围（超出{时长上限}的日期置灰）。结果在{操作时实时 / 点确认后}生效，写回{字段}；键盘能调整数值，读屏读出当前值和单位；超限时{提示方式}。

## 示例

<link rel="stylesheet" href="../../_shared/pick.css">
<style>
.x-w{--tb:24px;width:100%;max-width:400px;display:flex;flex-direction:column;gap:6px;font-size:12px;line-height:16px}
.x-w button{border:0;background:none;color:inherit;font:inherit;cursor:pointer}
.x-w button:focus-visible,.x-sc:focus-visible{outline:2px solid #3b5bdb;outline-offset:1px}
.x-val{text-align:center;font-size:20px;line-height:26px;font-weight:700;font-variant-numeric:tabular-nums;white-space:nowrap}
.x-val small{margin-left:3px;color:#5b616e;font-size:12px;font-weight:400}
.x-rul{position:relative;height:48px;border-radius:8px;background:#fff;box-shadow:0 0 0 1px #e3e6eb}
.x-rul::after{content:"";position:absolute;left:50%;top:0;width:2px;height:24px;margin-left:-1px;border-radius:1px;background:#3b5bdb;pointer-events:none}
.x-sc{display:flex;height:100%;padding:0 50%;border-radius:8px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;overscroll-behavior:contain;touch-action:pan-x}
.x-sc::-webkit-scrollbar{display:none}
.x-sc i{flex:none;position:relative;width:8px;scroll-snap-align:center}
.x-sc i::before{content:"";position:absolute;left:3.5px;top:0;width:1px;height:10px;background:#a9afba}
.x-sc i.x-m::before{height:15px}
.x-sc i.x-l::before{height:20px;background:#5b616e}
.x-sc i.x-l::after{content:attr(data-n);position:absolute;left:50%;top:26px;transform:translateX(-50%);color:#5b616e;font-size:11px;font-style:normal;line-height:14px}
.x-dual{position:relative;height:36px;margin:0 2px}
.x-dual::before,.x-fill{content:"";position:absolute;top:16px;height:4px;border-radius:2px}
.x-dual::before{left:0;right:0;background:#dde1e8}
.x-fill{background:#3b5bdb}
.x-dual input{position:absolute;left:0;top:0;width:100%;height:36px;margin:0;background:none;pointer-events:none;appearance:none;-webkit-appearance:none}
.x-dual input::-webkit-slider-runnable-track{height:36px;background:none}
.x-dual input::-moz-range-track{background:none}
.x-dual input::-webkit-slider-thumb{-webkit-appearance:none;width:var(--tb);height:var(--tb);margin-top:6px;border:2px solid #3b5bdb;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(15,23,42,.3);pointer-events:auto;cursor:grab}
.x-dual input::-moz-range-thumb{box-sizing:border-box;width:var(--tb);height:var(--tb);border:2px solid #3b5bdb;border-radius:50%;background:#fff;pointer-events:auto;cursor:grab}
.x-dual input:focus-visible{outline:none}
.x-dual input:focus-visible::-webkit-slider-thumb{outline:2px solid #3b5bdb;outline-offset:2px}
.x-dual input:focus-visible::-moz-range-thumb{outline:2px solid #3b5bdb;outline-offset:2px}
.x-note{margin:0;color:#5b616e;text-align:center}
.x-step{align-self:center;display:flex;align-items:center;border-radius:10px;background:#fff;box-shadow:0 0 0 1px #d5d9e0}
.x-w .x-step button{width:40px;height:38px;font-size:18px;line-height:1;color:#3b5bdb}
.x-w .x-step [aria-disabled=true]{color:#a9afba;cursor:not-allowed}
.x-step output{width:44px;text-align:center;font-size:16px;font-weight:700;font-variant-numeric:tabular-nums}
.x-path{font-weight:600;white-space:nowrap}
.x-path span{color:#5b616e;font-weight:400}
.x-cas{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;height:84px;overflow:hidden;border-radius:8px;background:#e3e6eb;box-shadow:0 0 0 1px #e3e6eb}
.x-c{overflow-y:auto;background:#fff;scrollbar-width:none;overscroll-behavior:contain}
.x-c::-webkit-scrollbar{display:none}
.x-w .x-c button{display:block;width:100%;height:28px;padding:0 8px;text-align:left;white-space:nowrap}
.x-w .x-c [aria-pressed=true]{background:#e3e9fd;color:#2f49b8;font-weight:600}
.x-head{display:flex;align-items:baseline;justify-content:space-between;gap:8px;white-space:nowrap}
.x-head b{font-variant-numeric:tabular-nums}
.x-head span{color:#5b616e}
.x-days{display:grid;grid-template-columns:repeat(7,minmax(0,1fr))}
.x-days span{color:#5b616e;font-size:11px;line-height:14px;text-align:center}
.x-w .x-days button{height:28px;border-radius:6px;font-variant-numeric:tabular-nums}
.x-w .x-days button:disabled{color:#a9afba;cursor:not-allowed}
.x-w .x-days .x-in{border-radius:0;background:#e3e9fd}
.x-w .x-days .x-on{background:#3b5bdb;color:#fff;font-weight:600}
@container (min-height:260px){
.x-w{--tb:30px;gap:12px;font-size:13px}
.x-val{font-size:26px;line-height:34px}
.x-rul{height:64px}
.x-rul::after{height:30px}
.x-sc i.x-l::after{top:34px}
.x-w .x-step button{width:52px;height:48px}
.x-step output{width:60px;font-size:18px}
.x-cas{height:140px}
.x-w .x-c button{height:36px}
.x-w .x-days button{height:44px}
.x-dual{height:44px}
.x-dual::before,.x-fill{top:20px}
.x-dual input{height:44px}
.x-dual input::-webkit-slider-runnable-track{height:44px}
.x-dual input::-webkit-slider-thumb{margin-top:7px}
}
</style>

<script type="module">
import { pick } from '../../_shared/pick.ts';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function initRuler(el) {
  const MIN = 30, MAX = 120, STEP = 0.5, W = 8; // 每格 8px、0.5 kg
  const sc = el.querySelector('.x-sc'), val = el.querySelector('.x-val b');
  const count = (MAX - MIN) / STEP;
  sc.innerHTML = Array.from({ length: count + 1 }, (_, i) => `<i class="${i % 10 === 0 ? 'x-l' : i % 2 === 0 ? 'x-m' : ''}"${i % 10 === 0 ? ` data-n="${MIN + i * STEP}"` : ''}></i>`).join('');
  let idx = 77;
  const paint = () => {
    const v = (MIN + idx * STEP).toFixed(1);
    val.textContent = v;
    sc.setAttribute('aria-valuenow', v);
    sc.setAttribute('aria-valuetext', `${v} 公斤`);
  };
  const to = (i) => { idx = clamp(i, 0, count); sc.scrollLeft = idx * W + W / 2; paint(); };
  sc.addEventListener('scroll', () => {
    const i = clamp(Math.round((sc.scrollLeft - W / 2) / W), 0, count);
    if (i !== idx) { idx = i; paint(); }
  }, { passive: true });
  sc.addEventListener('keydown', (e) => {
    const n = { ArrowLeft: idx - 1, ArrowRight: idx + 1, ArrowDown: idx - 1, ArrowUp: idx + 1, PageDown: idx - 10, PageUp: idx + 10, Home: 0, End: count }[e.key];
    if (n === undefined) return;
    e.preventDefault();
    to(n);
  });
  to(idx);
}

function initDual(el) {
  const GAP = 100, MAX = 1000;
  const [lo, hi] = el.querySelectorAll('input'), fill = el.querySelector('.x-fill');
  const val = el.querySelector('.x-val b'), note = el.querySelector('.x-note');
  const paint = () => {
    const a = +lo.value, b = +hi.value;
    const tb = parseFloat(getComputedStyle(el.querySelector('.x-w')).getPropertyValue('--tb'));
    const at = (v) => `calc(${tb / 2}px + (100% - ${tb}px) * ${v / MAX})`;
    fill.style.left = at(a);
    fill.style.right = `calc(100% - ${at(b)})`;
    val.textContent = `¥${a} – ¥${b}`;
    note.textContent = `符合 ${Math.round((b - a) / 12)} 件，两端至少隔 ¥${GAP}`;
  };
  lo.addEventListener('input', () => { lo.value = Math.min(+lo.value, +hi.value - GAP); paint(); });
  hi.addEventListener('input', () => { hi.value = Math.max(+hi.value, +lo.value + GAP); paint(); });
  paint();
}

function initStep(el) {
  const MIN = 1, MAX = 5, PRICE = 38;
  const [minus, plus] = el.querySelectorAll('.x-step button');
  const box = el.querySelector('output'), note = el.querySelector('.x-note');
  let n = 1;
  const paint = () => {
    box.textContent = n;
    minus.setAttribute('aria-disabled', String(n === MIN));
    plus.setAttribute('aria-disabled', String(n === MAX));
    note.textContent = n === MIN ? `最少 1 份 · 小计 ¥${PRICE}` : n === MAX ? `每人限购 ${MAX} 份 · 小计 ¥${PRICE * n}` : `小计 ¥${PRICE * n}`;
  };
  minus.addEventListener('click', () => { n = Math.max(MIN, n - 1); paint(); });
  plus.addEventListener('click', () => { n = Math.min(MAX, n + 1); paint(); });
  paint();
}

const TREE = {
  浙江: { 杭州: ['西湖', '滨江', '余杭'], 宁波: ['海曙', '鄞州'], 温州: ['鹿城', '瓯海'] },
  江苏: { 南京: ['鼓楼', '玄武', '建邺'], 苏州: ['姑苏', '吴中'] },
  四川: { 成都: ['武侯', '锦江', '青羊'], 绵阳: ['涪城', '游仙'] },
  云南: { 昆明: ['五华', '盘龙'], 大理: ['祥云', '宾川'] },
};
function initCascade(el) {
  const cols = el.querySelectorAll('.x-c'), path = el.querySelector('.x-path');
  const cur = ['浙江', '杭州', '西湖'];
  const paint = () => {
    const lists = [Object.keys(TREE), Object.keys(TREE[cur[0]]), cur[1] ? TREE[cur[0]][cur[1]] : []];
    lists.forEach((list, lv) => {
      cols[lv].innerHTML = list.map((t) => `<button type="button" data-lv="${lv}" aria-pressed="${t === cur[lv]}">${t}</button>`).join('');
    });
    const left = ['', '选城市', '选区县'][cur.findIndex((x) => !x)] || '';
    path.innerHTML = cur.filter(Boolean).join(' / ') + (left ? ` / <span>${left}</span>` : '');
  };
  el.querySelector('.x-cas').addEventListener('click', (e) => {
    const b = e.target.closest('[data-lv]');
    if (!b) return;
    const lv = +b.dataset.lv;
    cur[lv] = b.textContent;
    for (let i = lv + 1; i < 3; i++) cur[i] = ''; // 上一级变了，下一级清空重选
    paint();
    el.querySelector(`[data-lv="${lv}"][aria-pressed=true]`).focus();
  });
  paint();
}

function initRange(el) {
  const LIMIT = 5;
  const btns = [...el.querySelectorAll('.x-days button')];
  const head = el.querySelector('.x-head b');
  const date = (i) => 16 + i;
  let a = 2, b = 4;
  const paint = () => {
    btns.forEach((c, i) => {
      c.disabled = b === null && (i < a || i >= a + LIMIT);
      const on = i === a || i === b;
      c.classList.toggle('x-on', on);
      c.classList.toggle('x-in', b !== null && i > a && i < b);
      c.setAttribute('aria-pressed', String(on));
    });
    head.textContent = b === null ? `11月${date(a)}日起，再选结束日` : `11月${date(a)}日–${date(b)}日，共 ${b - a + 1} 天`;
  };
  btns.forEach((c, i) => c.addEventListener('click', () => {
    if (b === null) b = i; else { a = i; b = null; }
    paint();
    if (c.disabled) btns[a].focus();
  }));
  paint();
}

export default function demo(root) {
  pick(root, [
    {
      name: '刻度尺',
      fit: '体重、身高：范围大、一个数，松手吸附',
      html: `<div class="x-w"><div class="x-val"><b></b><small>kg</small></div><div class="x-rul"><div class="x-sc" role="slider" tabindex="0" aria-label="体重" aria-valuemin="30" aria-valuemax="120"></div></div></div>`,
      init: initRuler,
    },
    {
      name: '范围滑块',
      fit: '价格区间：拖两端，结果实时变',
      html: `<div class="x-w"><div class="x-val"><b></b></div><div class="x-dual"><div class="x-fill"></div><input type="range" min="0" max="1000" step="50" value="200" aria-label="最低价"><input type="range" min="0" max="1000" step="50" value="800" aria-label="最高价"></div><p class="x-note" role="status"></p></div>`,
      init: initDual,
    },
    {
      name: '步进器',
      fit: '购买份数：小范围整数，一下一下加',
      html: `<div class="x-w"><div class="x-step"><button type="button" aria-label="减一份">−</button><output aria-label="份数"></output><button type="button" aria-label="加一份">+</button></div><p class="x-note" role="status"></p></div>`,
      init: initStep,
    },
    {
      name: '级联',
      fit: '地址、类目：下一级跟着上一级变',
      html: `<div class="x-w"><div class="x-path" role="status"></div><div class="x-cas"><div class="x-c" aria-label="省"></div><div class="x-c" aria-label="市"></div><div class="x-c" aria-label="区县"></div></div></div>`,
      init: initCascade,
    },
    {
      name: '日期范围',
      fit: '请假、租车：起止两天，有时长上限',
      html: `<div class="x-w"><div class="x-head" role="status"><b></b><span>最多 5 天</span></div><div class="x-days">${[...'一二三四五六日'].map((d) => `<span aria-hidden="true">${d}</span>`).join('')}${Array.from({ length: 14 }, (_, i) => `<button type="button" aria-label="11月${16 + i}日">${16 + i}</button>`).join('')}</div></div>`,
      init: initRange,
    },
  ]);
}
</script>
