---
zh: 搜索的六种做法
en: Six ways to build search
aka: 搜索选型 搜索方式 列表过滤 全站搜索 页内查找 高级筛选
of: c-search
tab: 六种做法
order: 41
---

## 是什么

“加个搜索”可能指六件不同的事：缩小眼前的列表、边打边给候选、按维度收窄结果、组合条件查询、跨模块找东西、在一页内容里定位一个词。示例里每一种都能直接试。

## 适合

需求里只写了“要能搜索”，具体做法还没定的时候。先在这里选定一种，再去对应条目看细节。

## 不适合

十几条、一屏看得完的内容排好序就够了；固定的两三个状态用「快捷筛选标签」。

## 注意

同一页摆了两种搜索时，用占位文字写明范围（“过滤本页文件”“搜索全站”）。范围说不清，用户就会在错的框里搜，然后以为东西不存在。

## 要点

- 列表内过滤：数据已经在当前页（几百条以内）时用，边打边缩小，显示“3 / 8 条”，框内一键清空，清空后回到原列表和原滚动位置
- 输入联想：用户大致知道要什么、想少打字时用，输入后约 200ms 出 5–8 条候选，方向键挑、回车去结果页、Esc 收起，细节见「搜索联想」
- 分面筛选：结果上千、要按类型和状态这类维度收窄时用，勾选项放在结果旁并标数量，已选条件排成可单独去掉的标签，条件写进 URL
- 高级查询：条件要组合、查询开销大、用户是熟手时用，改条件不发请求，点“查询”才生效，改了没查时提示“条件已改”，结果上方复述本次条件
- 全局搜索：用户不知道东西在哪个模块时用，结果按类型分组，每组 3–5 条加“查看全部”，用「命令面板」唤起或进「搜索结果页」
- 页内查找：要在一篇长内容里定位某个词时用，命中处全部高亮、当前处深一档，显示“1 / 3”，回车下一处，Shift + 回车上一处，当前处滚进可视区
- 跟 AI 说清楚四件事：在哪搜（页面和入口位置）、搜什么（字段和范围）、什么时候出结果（边打边出还是点按钮）、结果带人去哪（留在原地、结果页还是详情）

## 提示词

我要给{产品}的{页面}加搜索。用户是{谁}，要找的是{对象}，大约{数据量}条，{数据已在页面里 / 要请求接口}。先按这个顺序判断：要在一篇长内容里定位词，用页内查找；东西分散在多个模块，用全局搜索；条件要组合或查询开销大，用高级查询；结果多、要按{维度}收窄，用分面筛选；用户大致知道名称、想少打字，用输入联想；数据已在当前页，用列表内过滤。告诉我选了哪一种和理由，然后只实现这一种。

实现时写清四件事。在哪搜：输入框的位置，占位文字写明范围。搜什么：匹配哪些字段，忽略大小写，中文按包含匹配，命中的词高亮。什么时候出结果：边打边出时防抖 200ms；点“查询”才生效时，改了未查要提示“条件已改”。结果带人去哪：留在原地并显示结果数，或进结果页，或直达详情，点开再返回时保留关键词和滚动位置。无结果时说明搜的范围并给清除入口；Esc 清空或收起；结果数用 role="status" 播报。

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
  .x-in {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 28px;
    padding: 0 8px;
    border: 1px solid #cdd2da;
    border-radius: 6px;
    background: #fff;
  }
  .x-in:focus-within {
    border-color: #3b5bdb;
  }
  .x-in svg {
    flex: none;
    width: 13px;
    height: 13px;
    color: #5b616e;
  }
  .x-in input {
    flex: 1;
    min-width: 0;
    border: 0;
    outline: 0;
    background: none;
    color: inherit;
    font: inherit;
  }
  .x-clear {
    flex: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #e6e9ee;
    color: #5b616e;
    font-size: 11px;
    line-height: 16px;
  }
  .x-count {
    flex: none;
    color: #5b616e;
    font-size: 11px;
    white-space: nowrap;
  }
  .x mark {
    border-radius: 2px;
    background: #ffe58f;
    color: inherit;
  }
  .x mark.on {
    background: #f59f00;
  }
  .x-list {
    height: 72px;
    margin-top: 6px;
    padding: 2px 0;
    overflow-y: auto;
  }
  .x-row {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
    padding: 2px 8px;
    text-align: left;
  }
  .x-row span:last-child {
    color: #5b616e;
    font-size: 11px;
  }
  .x-opts {
    margin-top: 4px;
    padding: 3px;
  }
  .x-opts button {
    display: block;
    width: 100%;
    padding: 2px 6px;
    border-radius: 4px;
    text-align: left;
  }
  .x-opts .on {
    background: #eef1fd;
    color: #2b45b0;
  }
  .x-note {
    margin: 4px 0 0;
    color: #5b616e;
    font-size: 11px;
    line-height: 16px;
  }
  .x-facet {
    display: grid;
    grid-template-columns: 78px minmax(0, 1fr);
    gap: 10px;
  }
  .x-facet label {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 22px;
    white-space: nowrap;
    cursor: pointer;
  }
  .x-facet input {
    margin: 0;
    accent-color: #3b5bdb;
  }
  .x-facet label span {
    color: #5b616e;
    font-size: 11px;
  }
  .x-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    min-height: 22px;
  }
  .x-chip {
    height: 22px;
    padding: 0 6px;
    border-radius: 11px;
    background: #eef1fd;
    color: #2b45b0;
    font-size: 11px;
  }
  .x-res {
    height: 66px;
    margin-top: 4px;
    overflow-y: auto;
  }
  .x-res div {
    padding: 2px 0;
    border-bottom: 1px solid #eef0f3;
  }
  .x-cond {
    display: grid;
    grid-template-columns: 62px 50px minmax(0, 1fr);
    gap: 4px;
    margin-bottom: 4px;
  }
  .x-cond select,
  .x-cond input {
    width: 100%;
    min-width: 0;
    height: 26px;
    padding: 0 4px;
    border: 1px solid #cdd2da;
    border-radius: 6px;
    background: #fff;
    color: inherit;
    font: inherit;
  }
  .x-foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-top: 6px;
  }
  .x .x-go {
    flex: none;
    height: 26px;
    padding: 0 14px;
    border-radius: 6px;
    background: #3b5bdb;
    color: #fff;
  }
  .x-dirty {
    color: #a15c00;
  }
  .x-global {
    padding: 4px;
  }
  .x-global .x-in {
    border-color: transparent;
    border-bottom-color: #e1e4ea;
    border-radius: 0;
    height: 26px;
  }
  .x-g {
    display: grid;
    grid-template-columns: 30px minmax(0, 1fr);
    gap: 6px;
    width: 100%;
    padding: 2px 4px;
    border-radius: 4px;
    text-align: left;
  }
  .x-g:hover {
    background: #f1f3f7;
  }
  .x-g b {
    color: #5b616e;
    font-size: 11px;
    font-weight: 400;
  }
  .x-g span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .x-find {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 6px;
  }
  .x-find .x-in {
    flex: 1;
    min-width: 0;
    height: 26px;
  }
  .x-find button {
    flex: none;
    width: 26px;
    height: 26px;
    border: 1px solid #cdd2da;
    border-radius: 6px;
    background: #fff;
  }
  .x-doc {
    margin: 0;
    padding: 6px 8px;
    font-size: 12px;
    line-height: 19px;
  }
</style>

<script type="module">
import { pick } from '../../_shared/pick.ts';

const ICON =
  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="7" cy="7" r="4.5"/><path d="m10.5 10.5 3.5 3.5"/></svg>';
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hit = (text, q) => (q ? text.replace(new RegExp(esc(q), 'gi'), (m) => `<mark>${m}</mark>`) : text);

const FILES = [
  ['采购合同', '3 月'],
  ['租赁合同续签', '5 月'],
  ['合同模板', '1 月'],
  ['季度报表', '4 月'],
  ['入职须知', '2 月'],
  ['发票汇总', '6 月'],
  ['客户报价单', '7 月'],
  ['周会纪要', '8 月'],
];

function filterList(el) {
  const input = el.querySelector('input');
  const clear = el.querySelector('.x-clear');
  const count = el.querySelector('.x-count');
  const list = el.querySelector('.x-list');
  const render = () => {
    const q = input.value.trim();
    const rows = FILES.filter(([n]) => n.includes(q));
    clear.hidden = !input.value;
    count.textContent = `${rows.length} / ${FILES.length} 条`;
    list.innerHTML = rows.length
      ? rows.map(([n, m]) => `<div class="x-row"><span>${hit(n, q)}</span><span>${m}</span></div>`).join('')
      : '<p class="x-note" style="padding:0 8px">没有匹配的文件</p>';
  };
  input.addEventListener('input', render);
  clear.addEventListener('click', () => {
    input.value = '';
    render();
    input.focus();
  });
  render();
}

const WORDS = ['无线耳机', '无线耳机 降噪', '无线键盘', '无线充电器', '机械键盘', '人体工学椅'];

function suggest(el) {
  const input = el.querySelector('input');
  const opts = el.querySelector('.x-opts');
  const note = el.querySelector('.x-note');
  let cur = -1;
  const close = () => {
    opts.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
  };
  const render = () => {
    const q = input.value.trim();
    const rows = q ? WORDS.filter((w) => w.includes(q)).slice(0, 3) : [];
    cur = -1;
    input.removeAttribute('aria-activedescendant');
    opts.innerHTML = rows
      .map((w, i) => `<button type="button" role="option" id="x-o${i}" tabindex="-1">${hit(w, q)}</button>`)
      .join('');
    opts.hidden = !rows.length;
    input.setAttribute('aria-expanded', String(!!rows.length));
  };
  const choose = (word) => {
    input.value = word;
    close();
    note.textContent = `搜索“${word}”，带到结果页`;
  };
  input.addEventListener('input', render);
  opts.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (b) choose(b.textContent);
  });
  input.addEventListener('keydown', (e) => {
    const btns = [...opts.children];
    if (e.key === 'Escape') return close();
    if (e.key === 'Enter') return choose(btns[cur]?.textContent || input.value.trim());
    const step = { ArrowDown: 1, ArrowUp: -1 }[e.key];
    if (!step || !btns.length) return;
    e.preventDefault();
    cur = (cur + step + btns.length) % btns.length;
    btns.forEach((b, i) => {
      b.classList.toggle('on', i === cur);
      b.setAttribute('aria-selected', String(i === cur));
    });
    input.setAttribute('aria-activedescendant', btns[cur].id);
  });
  render();
}

const DOCS = [
  ['年度框架协议', '合同', '生效'],
  ['门店租赁协议', '合同', '待审'],
  ['二季度利润表', '报表', '生效'],
  ['库存盘点表', '报表', '待审'],
  ['差旅报销规定', '制度', '生效'],
];
const FACETS = [
  ['type', 1, '合同'],
  ['type', 1, '报表'],
  ['type', 1, '制度'],
  ['state', 2, '待审'],
];

function facets(el) {
  const on = new Set(['报表']);
  const left = el.querySelector('.x-left');
  const chips = el.querySelector('.x-chips');
  const res = el.querySelector('.x-res');
  left.innerHTML = FACETS.map(([k, c, v]) => {
    const n = DOCS.filter((d) => d[c] === v).length;
    return `<label><input type="checkbox" value="${v}" ${on.has(v) ? 'checked' : ''}>${v} <span>${n}</span></label>`;
  }).join('');
  const render = () => {
    const types = FACETS.filter(([k, , v]) => k === 'type' && on.has(v)).map((f) => f[2]);
    const rows = DOCS.filter((d) => (!types.length || types.includes(d[1])) && (!on.has('待审') || d[2] === '待审'));
    left.querySelectorAll('input').forEach((i) => (i.checked = on.has(i.value)));
    chips.innerHTML = on.size
      ? [...on].map((v) => `<button type="button" class="x-chip" data-v="${v}" aria-label="去掉条件 ${v}">${v} ×</button>`).join('')
      : '<span class="x-note" style="margin:2px 0 0">全部 5 条，勾选左侧收窄</span>';
    res.innerHTML = rows.length ? rows.map((d) => `<div>${d[0]}</div>`).join('') : '<p class="x-note">这组条件下没有结果</p>';
  };
  left.addEventListener('change', (e) => {
    on[e.target.checked ? 'add' : 'delete'](e.target.value);
    render();
  });
  chips.addEventListener('click', (e) => {
    const b = e.target.closest('.x-chip');
    if (!b) return;
    on.delete(b.dataset.v);
    render();
  });
  render();
}

const ORDERS = [
  [800, '已付款'],
  [2600, '待付款'],
  [3200, '已付款'],
  [5400, '已付款'],
  [7800, '待付款'],
  [9200, '已付款'],
  [12500, '已付款'],
];

function advanced(el) {
  const [cmp, min, state] = el.querySelectorAll('select, input');
  const note = el.querySelector('.x-note');
  const run = () => {
    const n = ORDERS.filter(
      ([a, s]) => (cmp.value === '大于' ? a > +min.value : a < +min.value) && (state.value === '不限' || s === state.value),
    ).length;
    note.className = 'x-note';
    note.textContent = `已查询，共 ${n} 笔订单`;
  };
  el.querySelector('.x-form').addEventListener('input', () => {
    note.className = 'x-note x-dirty';
    note.textContent = '条件已改，点查询后生效';
  });
  el.querySelector('.x-form').addEventListener('submit', (e) => {
    e.preventDefault();
    run();
  });
  run();
}

const ALL = [
  ['客户', '北辰物流', '客户详情页'],
  ['客户', '北辰文创', '客户详情页'],
  ['订单', '#20418 北辰物流', '订单详情页'],
  ['文档', '北辰合作方案', '文档预览'],
  ['成员', '陈北辰', '成员主页'],
  ['文档', '南区周报', '文档预览'],
];

function globalSearch(el) {
  const input = el.querySelector('input');
  const list = el.querySelector('.x-glist');
  const note = el.querySelector('.x-note');
  const render = () => {
    const q = input.value.trim();
    const rows = q ? ALL.filter((r) => r[1].includes(q)) : [];
    const seen = new Set();
    list.innerHTML = rows.length
      ? rows
          .slice(0, 3)
          .map((r) => {
            const label = seen.has(r[0]) ? '' : r[0];
            seen.add(r[0]);
            return `<button type="button" class="x-g" data-to="${r[2]}"><b>${label}</b><span>${hit(r[1], q)}</span></button>`;
          })
          .join('')
      : `<p class="x-note" style="padding:0 4px">${q ? '全站都没有找到' : '试试“北辰”'}</p>`;
    note.textContent = `${rows.length} 条，来自 ${new Set(rows.map((r) => r[0])).size} 类内容`;
  };
  input.addEventListener('input', render);
  list.addEventListener('click', (e) => {
    const b = e.target.closest('.x-g');
    if (b) note.textContent = `跳到${b.dataset.to}`;
  });
  render();
}

const TEXT = '订单签收后 7 天内可申请退款。退款原路返回，到账约 1 到 3 个工作日。已开发票的订单，退款前先把发票寄回。';

function find(el) {
  const input = el.querySelector('input');
  const count = el.querySelector('.x-count');
  const doc = el.querySelector('.x-doc');
  let cur = 0;
  const render = () => {
    doc.innerHTML = hit(TEXT, input.value.trim());
    const marks = [...doc.querySelectorAll('mark')];
    cur = marks.length ? (cur + marks.length) % marks.length : 0;
    marks[cur]?.classList.add('on');
    count.textContent = marks.length ? `${cur + 1} / ${marks.length}` : '0 / 0';
  };
  const go = (d) => {
    cur += d;
    render();
  };
  input.addEventListener('input', () => {
    cur = 0;
    render();
  });
  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    go(e.shiftKey ? -1 : 1);
  });
  el.querySelector('[data-d="-1"]').addEventListener('click', () => go(-1));
  el.querySelector('[data-d="1"]').addEventListener('click', () => go(1));
  render();
}

export default function demo(root) {
  pick(root, [
    {
      name: '列表内过滤',
      fit: '数据就在当前页，只想把列表缩小',
      html: `<div class="x">
        <div class="x-in">${ICON}<input aria-label="过滤文件" value="合同" placeholder="过滤文件"><button type="button" class="x-clear" aria-label="清空">×</button><span class="x-count" role="status"></span></div>
        <div class="x-list x-box"></div></div>`,
      init: filterList,
    },
    {
      name: '输入联想',
      fit: '大致知道要找什么，想少打几个字',
      html: `<div class="x" style="min-height:104px">
        <div class="x-in">${ICON}<input role="combobox" aria-label="搜索商品" aria-expanded="false" aria-controls="x-ol" aria-autocomplete="list" value="无线" placeholder="搜索商品"></div>
        <div class="x-opts x-box" id="x-ol" role="listbox" aria-label="联想词"></div>
        <p class="x-note" role="status">方向键挑一条，回车去结果页</p></div>`,
      init: suggest,
    },
    {
      name: '分面筛选',
      fit: '结果多，要按几个维度一层层收窄',
      html: `<div class="x x-facet"><div class="x-left" role="group" aria-label="筛选条件"></div>
        <div><div class="x-chips"></div><div class="x-res"></div></div></div>`,
      init: facets,
    },
    {
      name: '高级查询',
      fit: '条件复杂，点了查询才出结果',
      html: `<form class="x x-form">
        <div class="x-cond"><span style="line-height:26px">订单金额</span>
          <select aria-label="比较方式"><option>大于</option><option>小于</option></select>
          <input type="number" aria-label="金额" value="5000" step="500"></div>
        <div class="x-cond"><span style="line-height:26px">付款状态</span>
          <select aria-label="付款状态" style="grid-column:span 2"><option>已付款</option><option>待付款</option><option>不限</option></select></div>
        <div class="x-foot"><p class="x-note" role="status" style="margin:0"></p><button type="submit" class="x-go">查询</button></div></form>`,
      init: advanced,
    },
    {
      name: '全局搜索',
      fit: '不知道东西在哪个模块，全站一起找',
      html: `<div class="x"><div class="x-box x-global">
        <div class="x-in">${ICON}<input aria-label="全站搜索" value="北辰" placeholder="搜索全站"></div>
        <div class="x-glist" style="margin-top:3px"></div></div><p class="x-note" role="status"></p></div>`,
      init: globalSearch,
    },
    {
      name: '页内查找',
      fit: '在一篇长内容里定位某个词',
      html: `<div class="x"><div class="x-find">
        <div class="x-in">${ICON}<input aria-label="在本页查找" value="退款" placeholder="在本页查找"><span class="x-count" role="status"></span></div>
        <button type="button" data-d="-1" aria-label="上一处">↑</button><button type="button" data-d="1" aria-label="下一处">↓</button></div>
        <p class="x-doc x-box"></p></div>`,
      init: find,
    },
  ]);
}
</script>
