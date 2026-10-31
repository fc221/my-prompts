---
zh: 下拉控件的七种类型
en: Seven controls that drop down
aka: 会往下展开的七种控件 下拉选型 下拉框 下拉怎么选 选择器 拆分按钮 大菜单 日期下拉
of: c-select
tab: 七种下拉
order: 30
---

## 是什么

点一下往下展开的控件有七种常见形态：单选、多选、分组选择、级联、拆分按钮、大菜单、日期。外形相近，用途分两类：一类是填表选值，一类是执行动作。示例右上角的小标记写着它属于哪一类。

## 适合

表单、筛选区、工具栏里要放一个“点开选”的控件，拿不准用哪种的时候。

## 不适合

只有两个选项用「开关」；三到五个选项平铺成「单选组与复选组」或「按钮组与分段控件」，用户一眼看全，少点一次。

## 注意

「下拉选择」和「下拉菜单」是两回事。前者是填表选值，选完值留在框里，表格顶部的筛选条件用它；后者是执行动作，点了立刻发生，表格行里的“更多”用它。两者长得一样时，用户会以为选完还要提交，或者随手一点就把数据删了。

## 要点

- 单选：六到十五个互斥选项时用，外观同输入框，选完收起，值留在框里
- 多选：要同时选几个时用，面板不随点选收起，已选项写回框内，框高固定一行，放不下时收成“+N”；细节见「多选与标签输入」
- 分组选择：选项多且能归类时用，组名吸顶，用户先找组再找项
- 级联：选项有上下级时用（省市、类目），左列选完右列才出现，框内显示完整路径；细节见「级联选择」
- 拆分按钮：有一个最常用动作、其余偶尔才用时用，主体直接执行默认动作，右侧箭头展开其他，两块各自有焦点和名称
- 大菜单：顶部入口多时用，一次铺开几列真实链接；细节见「多列下拉导航」
- 日期：选日子时用，面板能切月，框里也能直接输入；细节见「日期与时间选择」
- 选型判断：选项极少就平铺或用开关；选项很多就加搜索并分组；用户熟悉的内容（生日、手机号、邮编）让他直接输入
- 跟 AI 说清楚四件事：选值还是执行动作、有多少选项、单选还是多选、选项之间有没有层级

## 提示词

我要在{产品}的{位置}放一个下拉控件，用途是{选一个值随表单提交 / 选了就执行动作 / 跳转到别的页面}，选项有{选项清单或数量}。先判断类别：选了就执行动作，用下拉菜单，有一个最常用动作时做成拆分按钮；跳转且入口多，用大菜单；其余都是下拉选择。再判断形态：选项不超过 5 个改成平铺，不做下拉；要选多个用多选；有上下级用级联；选的是日期用日期面板；能归类用分组；超过 15 个顶部加搜索；用户熟悉的内容改成直接输入。告诉我选了哪一种和理由，然后只实现这一种。

外观要说明类别：选择器和输入框同高同边框，值留在框里；菜单触发器是按钮样式，文字不随选择改变。键盘：下方向键打开并进入第一项，上下键移动，Enter 选中，Esc 关闭并把焦点还给触发器，点外面关闭。选择器用 listbox / option，菜单用 menu / menuitem。面板宽度不小于触发器，靠近视口底部时向上翻。

## 示例

<link rel="stylesheet" href="../../_shared/pick.css">
<style>
  .x {
    position: relative;
    width: 100%;
    max-width: 300px;
    min-height: 114px;
    font-size: 12px;
    line-height: 18px;
  }
  @container (min-height: 260px) {
    .x {
      zoom: 1.5;
    }
  }
  :where(.x) button {
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
  }
  .x :focus-visible {
    outline: 2px solid #3b5bdb;
    outline-offset: -1px;
  }
  .x-head {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .x-kind {
    flex: none;
    padding: 1px 6px;
    border-radius: 4px;
    background: #eef1fd;
    color: #2b45b0;
    font-size: 11px;
    white-space: nowrap;
  }
  .x-kind.act {
    background: #fff1d6;
    color: #7a4d00;
  }
  .x-field {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    width: 148px;
    height: 28px;
    padding: 0 8px;
    border: 1px solid #cdd2da;
    border-radius: 6px;
    background: #fff;
    text-align: left;
    white-space: nowrap;
  }
  .x-field span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .x-field i,
  .x-tri {
    flex: none;
    width: 0;
    height: 0;
    border: 4px solid transparent;
    border-top: 5px solid #5b616e;
    border-bottom: 0;
    transition: transform 0.16s;
  }
  [aria-expanded='true'] > i,
  [aria-expanded='true'] > .x-tri {
    transform: rotate(180deg);
  }
  .x-pop {
    position: absolute;
    z-index: 2;
    top: 32px;
    left: 0;
    width: 148px;
    padding: 3px;
    border: 1px solid #e1e4ea;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 6px 16px rgb(31 35 41 / 12%);
    transform-origin: top left;
    animation: x-in 0.14s ease-out;
  }
  @keyframes x-in {
    from {
      opacity: 0;
      transform: scaleY(0.96);
    }
  }
  .x-o {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 19px;
    padding: 0 6px;
    border-radius: 4px;
    text-align: left;
    white-space: nowrap;
  }
  .x-o:hover,
  .x-o:focus-visible {
    background: #f1f3f7;
  }
  .x-o[aria-selected='true'] {
    color: #2b45b0;
    font-weight: 600;
  }
  .x-o[aria-selected='true']::after {
    content: '✓';
  }
  .x-scroll {
    height: 80px;
    overflow-y: auto;
  }
  .x-g {
    position: sticky;
    top: 0;
    padding: 0 6px;
    background: #fff;
    color: #5b616e;
    font-size: 11px;
    line-height: 16px;
  }
  .x-cas {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 188px;
  }
  .x-cas > div + div {
    border-left: 1px solid #eef0f3;
    padding-left: 3px;
  }
  .x-o.cur {
    background: #eef1fd;
  }
  .x-note {
    margin: 0;
    color: #5b616e;
    font-size: 11px;
  }
  .x-splitbtn {
    display: inline-flex;
    flex: none;
    height: 28px;
    border-radius: 6px;
    background: #3b5bdb;
    color: #fff;
  }
  .x-splitbtn button {
    height: 28px;
    color: #fff;
  }
  .x-splitbtn button:first-child {
    padding: 0 12px;
    border-right: 1px solid rgb(255 255 255 / 40%);
    white-space: nowrap;
  }
  .x-splitbtn button:last-child {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
  }
  .x-splitbtn .x-tri {
    border-top-color: #fff;
  }
  .x-splitbtn button:focus-visible {
    outline-color: #fff;
    outline-offset: -3px;
  }
  .x-nav {
    display: flex;
    gap: 14px;
    height: 28px;
    padding: 0 10px;
    border-radius: 8px;
    align-items: center;
    background: #fff;
    border: 1px solid #e1e4ea;
  }
  .x-nav b {
    margin-right: 2px;
  }
  .x-nav button {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .x-nav .x-kind {
    margin-left: auto;
  }
  .x-mega {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 4px;
    padding: 6px;
  }
  .x-mega h5 {
    margin: 0;
    padding: 0 6px;
    color: #5b616e;
    font-size: 11px;
    font-weight: 400;
    line-height: 16px;
  }
  .x-date {
    display: grid;
    grid-template-columns: 90px 162px;
    gap: 6px;
  }
  .x-date input {
    width: 100%;
    height: 28px;
    padding: 0 6px;
    border: 1px solid #cdd2da;
    border-radius: 6px;
    background: #fff;
    color: inherit;
    font: inherit;
  }
  .x-date .x-kind {
    display: inline-block;
    margin-top: 6px;
  }
  .x-date .x-note {
    margin-top: 4px;
    line-height: 16px;
  }
  .x-cal {
    padding: 3px 4px;
    border: 1px solid #e1e4ea;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 6px 16px rgb(31 35 41 / 12%);
  }
  .x-cal header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 18px;
    font-size: 11px;
    font-weight: 600;
  }
  .x-cal header button {
    width: 20px;
    height: 18px;
    color: #5b616e;
  }
  .x-days {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
  .x-days button {
    height: 15px;
    border-radius: 3px;
    font-size: 11px;
    line-height: 15px;
  }
  .x-days button:hover {
    background: #f1f3f7;
  }
  .x-days button[aria-pressed='true'] {
    background: #3b5bdb;
    color: #fff;
  }
  @media (prefers-reduced-motion: reduce) {
    .x-pop,
    .x-field i,
    .x-tri {
      animation: none;
      transition: none;
    }
  }
</style>

<script type="module">
import { pick } from '../../_shared/pick.ts';

// 共用的开合：点触发器、点外面、Esc、方向键在面板里移动
function drop(el) {
  const wrap = el.firstElementChild;
  const trig = el.querySelector('[aria-expanded]');
  const pop = el.querySelector('.x-pop');
  const set = (on, focus) => {
    pop.hidden = !on;
    trig.setAttribute('aria-expanded', String(on));
    if (focus) trig.focus();
  };
  const focusable = () => [...pop.querySelectorAll('button')];
  trig.addEventListener('click', () => set(pop.hidden));
  trig.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowDown') return;
    e.preventDefault();
    set(true);
    focusable()[0].focus();
  });
  pop.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') return set(false, true);
    const d = { ArrowDown: 1, ArrowUp: -1 }[e.key];
    if (!d) return;
    e.preventDefault();
    const list = focusable();
    list[(list.indexOf(e.target) + d + list.length) % list.length].focus();
  });
  wrap.addEventListener('pointerdown', (e) => {
    if (!pop.contains(e.target) && !trig.contains(e.target)) set(false);
  });
  return { set, trig, pop };
}

const opt = (t, on) => `<button type="button" class="x-o" role="option" aria-selected="${!!on}">${t}</button>`;
const field = (v) =>
  `<button type="button" class="x-field" aria-haspopup="listbox" aria-expanded="true" aria-label="选择，当前 ${v}"><span>${v}</span><i></i></button>`;
const VAL = '<span class="x-kind">选值 · 留在框里</span>';
const ACT = '<span class="x-kind act">动作 · 点了就执行</span>';

function single(el) {
  const { set, trig } = drop(el);
  el.querySelector('.x-pop').addEventListener('click', (e) => {
    const b = e.target.closest('.x-o');
    if (!b) return;
    el.querySelectorAll('.x-o').forEach((o) => o.setAttribute('aria-selected', String(o === b)));
    trig.querySelector('span').textContent = b.textContent;
    trig.setAttribute('aria-label', `选择，当前 ${b.textContent}`);
    set(false, true);
  });
}

function multi(el) {
  const { trig } = drop(el);
  const text = trig.querySelector('span');
  const render = () => {
    const on = [...el.querySelectorAll('.x-o[aria-selected="true"]')].map((b) => b.textContent);
    text.textContent = on.length ? on.join('、') : '请选择标签';
    trig.setAttribute('aria-label', `多选，已选 ${on.length} 项`);
  };
  el.querySelector('.x-pop').addEventListener('click', (e) => {
    const b = e.target.closest('.x-o');
    if (!b) return;
    b.setAttribute('aria-selected', String(b.getAttribute('aria-selected') !== 'true'));
    render();
  });
  render();
}

const AREAS = { 浙江: ['杭州', '宁波', '温州'], 广东: ['广州', '深圳'], 四川: ['成都', '绵阳'] };

function cascade(el) {
  const { set, trig } = drop(el);
  const [a, b] = el.querySelectorAll('.x-cas > div');
  let prov = '浙江';
  const render = () => {
    a.innerHTML = Object.keys(AREAS)
      .map((p) => `<button type="button" class="x-o ${p === prov ? 'cur' : ''}" role="option" aria-selected="false">${p} ›</button>`)
      .join('');
    b.innerHTML = AREAS[prov].map((c) => opt(c)).join('');
  };
  a.addEventListener('click', (e) => {
    const t = e.target.closest('.x-o');
    if (!t) return;
    prov = t.textContent.split(' ')[0];
    render();
    b.querySelector('button').focus();
  });
  b.addEventListener('click', (e) => {
    const t = e.target.closest('.x-o');
    if (!t) return;
    trig.querySelector('span').textContent = `${prov} / ${t.textContent}`;
    trig.setAttribute('aria-label', `选择，当前 ${prov} / ${t.textContent}`);
    set(false, true);
  });
  render();
}

function split(el) {
  const { set } = drop(el);
  const note = el.querySelector('.x-note');
  const run = (t) => (note.textContent = `已执行：${t}`);
  el.querySelector('[data-main]').addEventListener('click', () => run('导出 PDF'));
  el.querySelector('.x-pop').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    run(b.textContent);
    set(false, true);
  });
}

function mega(el) {
  const { set } = drop(el);
  const note = el.querySelector('.x-note');
  el.querySelector('.x-pop').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    note.textContent = `跳到“${b.textContent}”页`;
    set(false, true);
  });
}

const pad = (n) => String(n).padStart(2, '0');

function date(el) {
  const input = el.querySelector('input');
  const label = el.querySelector('[data-month]');
  const days = el.querySelector('.x-days');
  const note = el.querySelector('.x-note');
  let view = new Date(2026, 11, 1);
  let cur = '2026-12-18';
  const render = () => {
    const y = view.getFullYear();
    const m = view.getMonth();
    label.textContent = `${y} 年 ${m + 1} 月`;
    const blank = (new Date(y, m, 1).getDay() + 6) % 7;
    const n = new Date(y, m + 1, 0).getDate();
    days.innerHTML =
      '<span></span>'.repeat(blank) +
      Array.from({ length: n }, (_, i) => {
        const v = `${y}-${pad(m + 1)}-${pad(i + 1)}`;
        return `<button type="button" data-v="${v}" aria-pressed="${v === cur}">${i + 1}</button>`;
      }).join('');
  };
  days.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    cur = input.value = b.dataset.v;
    note.textContent = '已写回输入框';
    render();
  });
  input.addEventListener('input', () => {
    const m = input.value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    const d = m && new Date(+m[1], m[2] - 1, +m[3]);
    if (!d || d.getMonth() !== m[2] - 1) return (note.textContent = '格式：2026-12-18');
    cur = `${m[1]}-${pad(+m[2])}-${pad(+m[3])}`;
    view = new Date(d.getFullYear(), d.getMonth(), 1);
    note.textContent = '已跳到这一天';
    render();
  });
  el.querySelectorAll('[data-step]').forEach((b) =>
    b.addEventListener('click', () => {
      view = new Date(view.getFullYear(), view.getMonth() + +b.dataset.step, 1);
      render();
    }),
  );
  render();
}

export default function demo(root) {
  pick(
    root,
    [
      {
        name: '单选',
        fit: '六到十五个选项，挑一个值随表单提交',
        html: `<div class="x"><div class="x-head">${field('华东一仓')}${VAL}</div>
          <div class="x-pop" role="listbox" aria-label="发货仓库">${opt('华东一仓', 1)}${opt('华南二仓')}${opt('西南三仓')}${opt('华北四仓')}</div></div>`,
        init: single,
      },
      {
        name: '多选',
        fit: '能同时选几个，已选的要看得到',
        html: `<div class="x"><div class="x-head">${field('')}${VAL}</div>
          <div class="x-pop" role="listbox" aria-multiselectable="true" aria-label="商品标签">${opt('新品', 1)}${opt('包邮', 1)}${opt('限时')}${opt('预售')}</div></div>`,
        init: multi,
      },
      {
        name: '分组',
        fit: '选项多，按类别分开更好找',
        html: `<div class="x"><div class="x-head">${field('杭州')}${VAL}</div>
          <div class="x-pop x-scroll" role="listbox" aria-label="城市">
            <div role="group" aria-label="华东"><div class="x-g">华东</div>${opt('上海')}${opt('杭州', 1)}</div>
            <div role="group" aria-label="华南"><div class="x-g">华南</div>${opt('广州')}${opt('深圳')}</div>
            <div role="group" aria-label="西南"><div class="x-g">西南</div>${opt('成都')}${opt('昆明')}</div></div></div>`,
        init: single,
      },
      {
        name: '级联',
        fit: '选项有上下级，先选大类再选小类',
        html: `<div class="x"><div class="x-head">${field('浙江 / 杭州')}${VAL}</div>
          <div class="x-pop x-cas"><div role="listbox" aria-label="省份"></div><div role="listbox" aria-label="城市"></div></div></div>`,
        init: cascade,
      },
      {
        name: '拆分按钮',
        fit: '有一个最常用动作，其余收进箭头',
        html: `<div class="x"><div class="x-head"><div class="x-splitbtn"><button type="button" data-main>导出 PDF</button><button type="button" aria-haspopup="menu" aria-expanded="true" aria-label="更多导出方式"><i class="x-tri"></i></button></div>${ACT}</div>
          <div class="x-pop" role="menu" aria-label="更多导出方式" style="width:128px">
            <button type="button" class="x-o" role="menuitem">导出 Excel</button>
            <button type="button" class="x-o" role="menuitem">导出长图</button>
            <button type="button" class="x-o" role="menuitem">发到群里</button></div>
          <p class="x-note" role="status" style="position:absolute;left:136px;top:34px"></p></div>`,
        init: split,
      },
      {
        name: '大菜单',
        fit: '顶部入口多，一次铺开看全',
        html: `<div class="x"><div class="x-nav"><b>MyPrompts</b><button type="button" aria-expanded="true" aria-haspopup="true">产品<i class="x-tri"></i></button><span>价格</span>${ACT.replace('动作 · 点了就执行', '跳转')}</div>
          <div class="x-pop x-mega">
            <div><h5>搭建</h5><button type="button" class="x-o">页面</button><button type="button" class="x-o">表单</button></div>
            <div><h5>分析</h5><button type="button" class="x-o">报表</button><button type="button" class="x-o">看板</button></div>
            <div><h5>协作</h5><button type="button" class="x-o">评论</button><button type="button" class="x-o">审批</button></div></div>
          <p class="x-note" role="status" style="position:absolute;left:4px;top:34px"></p></div>`,
        init: mega,
      },
      {
        name: '日期',
        fit: '选日子，能切月，也能直接输入',
        html: `<div class="x x-date"><div><input aria-label="到期日" value="2026-12-18"><span class="x-kind">选值</span><p class="x-note" role="status">到期日</p></div>
          <div class="x-cal"><header><button type="button" data-step="-1" aria-label="上个月">‹</button><span data-month></span><button type="button" data-step="1" aria-label="下个月">›</button></header><div class="x-days"></div></div></div>`,
        init: date,
      },
    ],
    '控件种类',
  );
}
</script>
