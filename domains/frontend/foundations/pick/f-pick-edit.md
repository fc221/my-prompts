---
zh: 编辑入口的六种位置
en: Six places to edit a record
aka: 改东西的六个位置 编辑方式 编辑选型 就地编辑 编辑放哪 弹窗还是抽屉
order: 30
---

## 是什么

同样是“改一条数据”，编辑区可以放在六个位置：字段原地、当前行里、入口旁的浮层、侧边抽屉、居中弹窗、独立页面。离原内容越远，能放的东西越多，打断也越重。

## 适合

列表、详情、后台配置里要加编辑入口，拿不准放哪的时候。一个模块里的改动，先看字段数，再决定位置。

## 不适合

从零新建一份多步骤内容直接走「分步表单」；只有开关一类的单个状态，点一下就生效，用「开关」。

## 注意

选位置看的是字段数和要不要对照，和界面好不好看无关。常见的错配是只改一个名字却弹大窗，或者十几个字段挤在浮层里，改到一半点外面就全丢了。

## 要点

- 就地改：只改一个字段时用，点值变输入框，回车保存，Esc 取消，保存后显示结果；细节见「行内编辑」
- 行内展开：两三个相关字段一起改时用，当前行下方展开，上下行还看得到，同一时间只展开一行，有“保存”按钮
- 入口旁的浮层：改动小、要回到原处时用，贴着触发点出现，打开后焦点进输入框，改完焦点回到入口；细节见「浮层卡片」
- 侧边抽屉：字段十来个、还要对照列表时用，列表和筛选留在原处，切一行就换一条内容，有未保存改动时切换前要问；细节见「抽屉」
- 聚焦弹窗：一次改一批、后果要看清时用，写明影响多少条、有什么例外，确认后才生效；细节见「对话框」
- 独立页面：字段多、分步骤、中途要离开时用，每步自动存草稿，能回到上一步，地址可分享；模板见「新建 / 编辑表单页」
- 跟 AI 说清楚四件事：改几个字段、要不要对照别的内容、怎么提交（失焦、回车、保存按钮）、编辑区放哪

## 提示词

给{产品}的{模块}做编辑功能。用户改的是{对象}，一次改{字段清单}，{是否要对照列表或其他内容}，{单条还是批量}。按这个顺序判断位置：多步骤或要中途保存，用独立页面；批量改或影响别的数据，用聚焦弹窗并写明影响条数和例外；字段十来个且要对照列表，用侧边抽屉，列表和筛选保持可见；两三个相关字段，用行内展开；一个字段且改动小，改完想回到原处用浮层，值就在眼前用就地改。告诉我选了哪一种和理由，然后只实现这一种。

写清提交方式：回车保存、Esc 取消，失焦时{保存 / 放弃}，要校验的字段错误提示放在字段下方并保留已填内容；保存中按钮显示加载并防止重复提交，失败时编辑区留着、内容不丢、给重试。有未保存改动时切走要提示。关闭后焦点回到触发编辑的元素，列表滚动位置和筛选条件保持不变。

## 示例

<link rel="stylesheet" href="../../_shared/pick.css">
<style>
  .x {
    position: relative;
    width: 100%;
    max-width: 300px;
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
    outline-offset: 1px;
  }
  .x-box {
    border: 1px solid #e1e4ea;
    border-radius: 8px;
    background: #fff;
  }
  .x-field {
    display: grid;
    grid-template-columns: 56px minmax(0, 1fr);
    align-items: center;
    min-height: 32px;
    padding: 0 10px;
  }
  .x-field + .x-field {
    border-top: 1px solid #eef0f3;
  }
  .x-field > span {
    color: #5b616e;
  }
  .x-val {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 24px;
    padding: 0 4px;
    border-radius: 4px;
    text-align: left;
  }
  .x-val:hover {
    background: #f1f3f7;
  }
  .x-val svg,
  .x-pen svg {
    width: 12px;
    height: 12px;
    color: #5b616e;
  }
  .x-input {
    width: 100%;
    min-width: 0;
    height: 24px;
    padding: 0 4px;
    border: 1px solid #3b5bdb;
    border-radius: 4px;
    background: #fff;
    color: inherit;
    font: inherit;
  }
  .x-note {
    margin: 6px 0 0;
    color: #5b616e;
    font-size: 11px;
    line-height: 16px;
  }
  .x-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 44px 30px;
    align-items: center;
    height: 26px;
    padding: 0 10px;
  }
  .x-row + .x-row,
  .x-more + .x-row {
    border-top: 1px solid #eef0f3;
  }
  .x-row button,
  .x-link {
    color: #2b45b0;
    text-align: right;
  }
  .x-more {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
    gap: 6px;
    align-items: end;
    padding: 4px 10px 6px;
    background: #f6f7fb;
    font-size: 11px;
    color: #5b616e;
  }
  .x-more label {
    display: block;
    min-width: 0;
  }
  .x-more .x-input {
    color: #1f2329;
    border-color: #cdd2da;
    font-size: 12px;
  }
  .x .x-go {
    flex: none;
    height: 24px;
    padding: 0 10px;
    border-radius: 5px;
    background: #3b5bdb;
    color: #fff;
  }
  .x .x-ghost {
    flex: none;
    height: 24px;
    padding: 0 10px;
    border: 1px solid #cdd2da;
    border-radius: 5px;
    background: #fff;
  }
  .x-pen {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    color: inherit;
  }
  .x-pop {
    position: absolute;
    top: 72px;
    left: 40px;
    right: 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    gap: 6px;
    align-items: center;
    padding: 6px;
    box-shadow: 0 6px 18px rgb(31 35 41 / 16%);
  }
  .x-pop[hidden] {
    display: none;
  }
  .x-pop::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 74px;
    width: 8px;
    height: 8px;
    border-top: 1px solid #e1e4ea;
    border-left: 1px solid #e1e4ea;
    background: #fff;
    transform: rotate(45deg);
  }
  .x-btns {
    display: flex;
    justify-content: flex-end;
    gap: 6px;
  }
  .x-split {
    display: flex;
    height: 108px;
    overflow: hidden;
  }
  .x-split-list {
    flex: 1;
    min-width: 0;
    padding: 6px;
  }
  .x-chip {
    display: inline-block;
    margin-bottom: 4px;
    padding: 0 6px;
    border-radius: 9px;
    background: #eef1fd;
    color: #2b45b0;
    font-size: 11px;
  }
  .x-pickrow {
    display: block;
    width: 100%;
    padding: 2px 6px;
    border-radius: 4px;
    text-align: left;
    white-space: nowrap;
  }
  .x-pickrow.on {
    background: #eef1fd;
    color: #2b45b0;
  }
  .x-side {
    flex: none;
    width: 58%;
    padding: 6px 8px;
    border-left: 1px solid #e1e4ea;
    box-shadow: -6px 0 12px rgb(31 35 41 / 8%);
  }
  .x-side header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    font-weight: 600;
  }
  .x-side label {
    display: grid;
    grid-template-columns: 30px minmax(0, 1fr);
    align-items: center;
    margin-bottom: 3px;
    color: #5b616e;
    font-size: 11px;
  }
  .x-side .x-input {
    color: #1f2329;
    border-color: #cdd2da;
    font-size: 12px;
  }
  .x-side .x-go {
    float: right;
    height: 22px;
  }
  .x-open {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 108px;
  }
  .x-modal {
    position: relative;
    height: 108px;
    overflow: hidden;
    border-radius: 8px;
  }
  .x-bg {
    height: 100%;
    padding: 6px 10px;
  }
  .x-bg div {
    display: flex;
    justify-content: space-between;
    padding: 2px 0;
    border-bottom: 1px solid #eef0f3;
  }
  .x-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 4px;
  }
  .x-scrim {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(31 35 41 / 45%);
  }
  .x-dlg {
    width: 216px;
    padding: 7px 10px;
    box-shadow: 0 8px 22px rgb(31 35 41 / 28%);
  }
  .x-dlg h4 {
    margin: 0;
    font-size: 12px;
  }
  .x-dlg p {
    margin: 0 0 4px;
    color: #a15c00;
    font-size: 11px;
    line-height: 16px;
  }
  .x-dlg .x-btns {
    align-items: center;
  }
  .x-dlg .x-input {
    flex: 1;
    border-color: #cdd2da;
  }
  .x-page {
    padding: 6px 10px;
  }
  .x-crumb {
    display: flex;
    justify-content: space-between;
    color: #5b616e;
    font-size: 11px;
  }
  .x-steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    margin: 2px 0 3px;
    padding: 0;
    list-style: none;
  }
  .x-steps li {
    height: 4px;
    border-radius: 2px;
    background: #e1e4ea;
  }
  .x-steps .on {
    background: #3b5bdb;
  }
  .x-page h4 {
    margin: 0 0 3px;
    font-size: 12px;
  }
  .x-page .x-input {
    display: block;
    border-color: #cdd2da;
    margin-bottom: 5px;
  }
  .x-page .x-btns {
    justify-content: space-between;
  }
  .x-page button:disabled {
    opacity: 0.5;
    cursor: default;
  }
</style>

<script type="module">
import { pick } from '../../_shared/pick.ts';

const PEN =
  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 13l.7-3L10.5 3.2l2.3 2.3L6 12.3 3 13z"/></svg>';

function inlineField(el) {
  const note = el.querySelector('.x-note');
  el.querySelectorAll('.x-val').forEach((btn) => {
    const name = btn.dataset.name;
    const open = () => {
      const old = btn.querySelector('span').textContent;
      const input = Object.assign(document.createElement('input'), { className: 'x-input', value: old });
      input.setAttribute('aria-label', name);
      let done = false;
      const finish = (save) => {
        if (done) return;
        done = true;
        if (save && input.value.trim()) btn.querySelector('span').textContent = input.value.trim();
        input.replaceWith(btn);
        note.textContent = save ? `${name}已保存，全程没离开这一行` : '已取消，内容没变';
        btn.focus();
      };
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') finish(true);
        if (e.key === 'Escape') finish(false);
      });
      input.addEventListener('blur', () => finish(true));
      btn.replaceWith(input);
      input.select();
    };
    btn.addEventListener('click', open);
  });
}

function rowExpand(el) {
  const more = el.querySelector('.x-more');
  const note = el.querySelector('.x-note');
  const toggles = [...el.querySelectorAll('.x-row button')];
  const openAt = (btn) => {
    const opening = btn.getAttribute('aria-expanded') !== 'true';
    toggles.forEach((b) => {
      b.setAttribute('aria-expanded', 'false');
      b.textContent = '编辑';
    });
    more.hidden = !opening;
    if (!opening) return;
    btn.setAttribute('aria-expanded', 'true');
    btn.textContent = '收起';
    btn.closest('.x-row').after(more);
    more.querySelector('[data-k=price]').value = btn.closest('.x-row').dataset.price;
    more.querySelector('[data-k=stock]').value = btn.closest('.x-row').dataset.stock;
  };
  toggles.forEach((b) => b.addEventListener('click', () => openAt(b)));
  more.querySelector('.x-go').addEventListener('click', () => {
    const row = more.previousElementSibling;
    row.dataset.price = more.querySelector('[data-k=price]').value;
    row.dataset.stock = more.querySelector('[data-k=stock]').value;
    row.children[1].textContent = `¥${row.dataset.price}`;
    note.textContent = `${row.children[0].textContent}已保存`;
    const btn = row.querySelector('button');
    openAt(btn);
    btn.focus();
  });
  openAt(toggles[0]);
}

function popEdit(el) {
  const trigger = el.querySelector('.x-pen');
  const pop = el.querySelector('.x-pop');
  const input = pop.querySelector('input');
  const value = trigger.querySelector('span');
  const close = () => {
    pop.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.focus();
  };
  trigger.addEventListener('click', () => {
    pop.hidden = !pop.hidden;
    trigger.setAttribute('aria-expanded', String(!pop.hidden));
    if (!pop.hidden) {
      input.value = value.textContent;
      input.select();
    }
  });
  pop.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
    if (e.key === 'Enter') {
      value.textContent = input.value || value.textContent;
      close();
    }
  });
  pop.querySelector('.x-go').addEventListener('click', () => {
    value.textContent = input.value || value.textContent;
    close();
  });
  pop.querySelector('.x-ghost').addEventListener('click', close);
}

const STAFF = [
  ['林知夏', '华东区', '主管'],
  ['周以安', '华南区', '专员'],
  ['唐亦舟', '西南区', '专员'],
];

function drawer(el) {
  const rows = [...el.querySelectorAll('.x-pickrow')];
  const side = el.querySelector('.x-side');
  const [area, role] = side.querySelectorAll('input');
  const title = side.querySelector('b');
  const show = (i) => {
    rows.forEach((r, k) => r.classList.toggle('on', k === i));
    side.hidden = false;
    title.textContent = STAFF[i][0];
    area.value = STAFF[i][1];
    role.value = STAFF[i][2];
  };
  rows.forEach((r, i) => r.addEventListener('click', () => show(i)));
  const close = () => {
    const cur = rows.find((r) => r.classList.contains('on'));
    side.hidden = true;
    rows.forEach((r) => r.classList.remove('on'));
    cur?.focus();
  };
  side.querySelector('[aria-label="关闭"]').addEventListener('click', close);
  side.querySelector('.x-go').addEventListener('click', close);
  side.addEventListener('keydown', (e) => e.key === 'Escape' && close());
  show(0);
}

function modal(el) {
  const bg = el.querySelector('.x-bg');
  const scrim = el.querySelector('.x-scrim');
  const input = scrim.querySelector('input');
  const open = el.querySelector('[data-open]');
  const label = bg.querySelector('[data-rate]');
  const close = () => {
    scrim.hidden = true;
    bg.inert = false;
    open.focus();
  };
  const show = () => {
    scrim.hidden = false;
    bg.inert = true;
    input.select();
  };
  open.addEventListener('click', show);
  scrim.querySelector('.x-ghost').addEventListener('click', close);
  scrim.addEventListener('keydown', (e) => e.key === 'Escape' && close());
  scrim.querySelector('.x-go').addEventListener('click', () => {
    label.textContent = `已设为 ${input.value} 折`;
    close();
  });
  show();
}

const STEPS = ['基本信息', '适用门店', '优惠规则', '确认发布'];

function page(el) {
  let i = 1;
  const title = el.querySelector('h4');
  const dots = [...el.querySelectorAll('.x-steps li')];
  const state = el.querySelector('[role=status]');
  const prev = el.querySelector('[data-prev]');
  const next = el.querySelector('[data-next]');
  const input = el.querySelector('input');
  const draft = STEPS.map(() => '');
  const render = () => {
    title.textContent = `第 ${i + 1} / 4 步：${STEPS[i]}`;
    input.setAttribute('aria-label', STEPS[i]);
    input.value = draft[i];
    dots.forEach((d, k) => d.classList.toggle('on', k <= i));
    prev.disabled = i === 0;
    next.disabled = i === STEPS.length - 1;
  };
  const go = (d) => {
    draft[i] = input.value;
    i += d;
    render();
    state.textContent = '草稿已保存';
  };
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  render();
}

export default function demo(root) {
  pick(root, [
    {
      name: '就地改',
      fit: '只改一个字段，改完马上生效',
      html: `<div class="x"><div class="x-box">
        <div class="x-field"><span>门店名</span><button type="button" class="x-val" data-name="门店名" aria-label="修改门店名"><span>滨江旗舰店</span>${PEN}</button></div>
        <div class="x-field"><span>营业时间</span><button type="button" class="x-val" data-name="营业时间" aria-label="修改营业时间"><span>09:00–21:00</span>${PEN}</button></div>
        </div><p class="x-note" role="status">点一下值就能改，回车保存，Esc 取消</p></div>`,
      init: inlineField,
    },
    {
      name: '行内展开',
      fit: '改两三个相关字段，还要看着上下行',
      html: `<div class="x"><div class="x-box">
        <div class="x-row" data-price="42" data-stock="120"><span>手冲滤纸</span><span>¥42</span><button type="button" aria-expanded="false">编辑</button></div>
        <div class="x-row" data-price="168" data-stock="36"><span>陶瓷滤杯</span><span>¥168</span><button type="button" aria-expanded="false">编辑</button></div>
        <div class="x-more" hidden>
          <label>售价<input class="x-input" data-k="price" inputmode="numeric"></label>
          <label>库存<input class="x-input" data-k="stock" inputmode="numeric"></label>
          <button type="button" class="x-go">保存</button></div>
        </div><p class="x-note" role="status"></p></div>`,
      init: rowExpand,
    },
    {
      name: '浮层',
      fit: '小改动，改完回到原处',
      html: `<div class="x" style="min-height:112px"><div class="x-box">
        <div class="x-field"><span>商品</span><span style="color:inherit">冷萃咖啡液</span></div>
        <div class="x-field"><span>库存预警</span><span style="color:inherit"><button type="button" class="x-pen" aria-haspopup="dialog" aria-expanded="true" aria-label="修改库存预警">低于 <span>20</span> 件 ${PEN}</button></span></div></div>
        <div class="x-pop x-box" role="dialog" aria-label="修改库存预警"><input class="x-input" aria-label="预警件数" inputmode="numeric" value="20"><button type="button" class="x-ghost">取消</button><button type="button" class="x-go">确定</button></div>
        </div>`,
      init: popEdit,
    },
    {
      name: '抽屉',
      fit: '要对照列表和筛选，字段有十来个',
      html: `<div class="x"><div class="x-box x-split">
        <div class="x-split-list"><span class="x-chip">在职 3</span>
          ${STAFF.map((s) => `<button type="button" class="x-pickrow">${s[0]}</button>`).join('')}</div>
        <div class="x-side" role="dialog" aria-label="编辑成员">
          <header><b></b><button type="button" aria-label="关闭">×</button></header>
          <label>区域<input class="x-input"></label>
          <label>岗位<input class="x-input"></label>
          <button type="button" class="x-go">保存</button></div></div></div>`,
      init: drawer,
    },
    {
      name: '聚焦弹窗',
      fit: '一次改一批，要看清范围再确认',
      html: `<div class="x"><div class="x-box x-modal">
        <div class="x-bg"><div class="x-bar" style="border:0"><span>已选 24 件商品</span><button type="button" data-open style="color:#2b45b0">批量调折扣</button></div>
          <div><span>夏季折扣</span><span data-rate>9 折</span></div><div><span>手冲滤纸</span><span>¥42</span></div></div>
        <div class="x-scrim"><div class="x-dlg x-box" role="dialog" aria-modal="true" aria-label="批量调折扣">
          <h4>调整 24 件商品的折扣</h4><p>将覆盖原折扣，含 3 件参加活动的商品</p>
          <div class="x-btns"><input class="x-input" aria-label="折扣" value="8.5"><button type="button" class="x-ghost">取消</button><button type="button" class="x-go">确认</button></div>
        </div></div></div></div>`,
      init: modal,
    },
    {
      name: '独立页面',
      fit: '字段多、分步骤，中途要能存进度',
      html: `<div class="x"><div class="x-box x-page">
        <div class="x-crumb"><span>优惠活动 / 新建</span><span role="status">草稿已保存</span></div>
        <ol class="x-steps"><li></li><li></li><li></li><li></li></ol>
        <h4></h4><input class="x-input" placeholder="在这里填写，切步骤不会丢">
        <div class="x-btns"><button type="button" class="x-ghost" data-prev>上一步</button><button type="button" class="x-go" data-next>下一步</button></div>
        </div></div>`,
      init: page,
    },
  ]);
}
</script>
