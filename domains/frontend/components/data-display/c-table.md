---
zh: 数据表格
en: Data table
order: 10
---

## 是什么

行列对齐的数据网格，可排序、勾选和行操作，带加载、空、错误状态。

## 适合

横向比较多条同类对象的多个属性：订单、用户、日志、账单。

## 不适合

只是逐条浏览、属性很少时用列表；以图片为主的内容用卡片；单个对象的字段用描述列表；不要为了排版用表格。

## 要点

- 用组件库的表格：Element Plus el-table + el-table-column（data、row-key、height、v-loading，列 prop、label、width、min-width、fixed、sortable、align）、Naive UI n-data-table（columns、data、loading、row-key、max-height、scroll-x、remote、pagination，列 key、title、width、fixed、sorter、ellipsis、align）、Ant Design Vue a-table（columns、dataSource、loading、rowKey、scroll、sticky、rowSelection，列 dataIndex、title、width、fixed、sorter、ellipsis、align）；不手写 table 标签
- 密度用表格的 size 档（Element Plus size="small" 是紧凑，Naive UI size="small"，Ant Design Vue size="middle" 或 "small"），不自己改行高；表头次要色、不加重底色
- 文本左对齐，数值和金额用列的 align="right" 右对齐（表头跟着右对齐）并用等宽数字；编号、日期、金额、状态、操作列给定宽 width 且不换行；只留一列描述性文字用 min-width 伸缩，溢出省略并能看全文（Element Plus show-overflow-tooltip、Naive UI ellipsis 配 tooltip、Ant Design Vue ellipsis）；次要信息放主信息下一行，小一号次要色
- 排序走服务端时把排序交回去：Element Plus sortable="custom" + @sort-change，Naive UI remote + on-update:sorter，Ant Design Vue @change 的 sorter 参数；只在当前排序列常显方向箭头是组件默认，不要另画
- 勾选用自带的选择列（Element Plus type="selection"，Naive UI type: 'selection'，Ant Design Vue rowSelection），勾选后表格上方出现批量操作栏“已选 3 条”，区分“全选本页”和“全选筛选结果”；跨页保留勾选（Element Plus reserve-selection + row-key、Naive UI checked-row-keys、Ant Design Vue preserveSelectedRowKeys）
- 行操作最多露出 2 个文字按钮，其余收进“更多”；行内删除用中性色；宽表的操作列固定在右侧（fixed="right" / fixed: 'right'，Naive UI 固定列要给数字 width 并设 scroll-x）
- 加载、空、错误分开：首次加载用骨架行（el-skeleton / n-skeleton / a-skeleton，沿用表头和列宽），翻页用表格的 loading（Element Plus 用 v-loading）不清空旧数据；无数据给新建入口、无筛选结果给清除条件、失败给原因和重试，写在 empty 插槽（Element Plus、Naive UI）或 emptyText 插槽（Ant Design Vue）里，不留组件默认的“暂无数据”
- 宽表横向滚动限制在表格容器内，表头吸顶（Element Plus height、Naive UI max-height、Ant Design Vue scroll.y 或 sticky）；零、未知、不适用分别写作 0、—、不适用

## 提示词

把{订单列表}做成数据表格：用项目组件库自带的表格（Element Plus el-table + el-table-column；Naive UI n-data-table 的 columns；Ant Design Vue a-table 的 columns），不手写 table。列依次为勾选（type="selection" / type: 'selection' / rowSelection）、订单号（定宽、不换行）、商品（min-width 伸缩，溢出省略可看全文）、金额（align="right"、等宽数字）、状态标签、下单时间、操作（fixed="right"，露出“详情”“发货”，其余收进“更多”）；密度用表格的 size 档，表头次要色不加底色；金额和时间排序走服务端（sortable="custom" + @sort-change / remote + on-update:sorter / @change 的 sorter）；勾选后上方出现批量栏“已选 N 条”，跨页保留勾选；首次加载用骨架行，翻页用 loading 不清空旧数据；空数据、无筛选结果、加载失败分别在 empty / emptyText 插槽里给说明和操作，不用默认的“暂无数据”；表头吸顶（height / max-height / scroll.y）；窄屏表格在容器内横向滚动，首列 fixed="left"（Naive UI 配 scroll-x 和列 width）。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.tb{align-items:stretch;padding:12px}
.w{width:100%;max-width:680px;margin:0 auto;display:flex;flex-direction:column;gap:8px;min-height:0}
.tool{display:flex;align-items:center;gap:8px;height:28px;flex:none}
.bulk{display:flex;align-items:center;gap:4px;font-size:13px}
.bulk b{font-weight:500;margin-right:4px}
.seg{margin-left:auto;display:inline-flex;gap:2px;padding:2px;border-radius:6px;background:#e3e6eb}
.seg label{position:relative}
.seg input{position:absolute;opacity:0;pointer-events:none}
.seg span{display:inline-flex;align-items:center;height:22px;padding:0 8px;border-radius:4px;font-size:12px;color:#5b616e;cursor:pointer}
.seg input:checked+span{background:#fff;color:#1f2329;box-shadow:0 1px 2px rgba(31,35,41,.16)}
.seg input:focus-visible+span{outline:2px solid #3b5bdb}
.tw{position:relative;flex:1;min-height:0;overflow:auto;background:#fff;border:1px solid #e3e6eb;border-radius:8px}
table{width:100%;min-width:380px;border-collapse:collapse;table-layout:fixed;font-size:13px;white-space:nowrap}
th,td{height:36px;padding:0 10px;text-align:left;border-bottom:1px solid #e3e6eb;overflow:hidden;text-overflow:ellipsis}
th{position:sticky;top:0;z-index:1;height:32px;background:#fff;color:#5b616e;font-size:12px;font-weight:600}
tbody tr:hover{background:#f5f6f8}
tbody tr.on{background:#edf1ff}
.ck{padding-right:0}
.ck input{width:16px;height:16px;accent-color:#3b5bdb;vertical-align:middle}
.num{text-align:right;font-variant-numeric:tabular-nums}
.sort{all:unset;display:inline-flex;align-items:center;gap:2px;cursor:pointer}
.sort:focus-visible{outline:2px solid #3b5bdb}
.ar{width:10px;opacity:0}
th:hover .ar,[aria-sort=ascending] .ar,[aria-sort=descending] .ar{opacity:1}
.tag{display:inline-flex;align-items:center;height:22px;padding:0 8px;border-radius:4px;font-size:12px}
.ok{background:#e7f5ef;color:#12805c}
.wa{background:#fdf0e6;color:#b54708}
.pr{background:#edf1ff;color:#3b5bdb}
.t{height:24px;padding:0 6px;border:0;border-radius:4px;background:none;color:#3b5bdb;font-size:13px;cursor:pointer}
.t:hover{background:#edf1ff}
.n{color:#5b616e}
.n:hover{background:#f5f6f8}
td .t:first-child{margin-left:-6px}
.stt td{height:96px;text-align:center;color:#5b616e;white-space:normal}
.stt:hover{background:none}
.sk{display:block;height:10px;border-radius:4px;background:#e3e6eb;animation:pl 1.4s ease-in-out infinite}
@keyframes pl{50%{opacity:.5}
}
@media (prefers-reduced-motion:reduce){.sk{animation:none}
}
</style>

<div class="s tb"><div class="w"><div class="tool"><div class="bulk" hidden><b class="sn"></b><button type="button" class="t">批量发货</button><button type="button" class="t n clr">取消选择</button></div><span class="help tot"></span><div class="seg" role="radiogroup" aria-label="演示状态"><label><input type="radio" name="m" value="data" checked><span>数据</span></label><label><input type="radio" name="m" value="load"><span>加载</span></label><label><input type="radio" name="m" value="empty"><span>空</span></label><label><input type="radio" name="m" value="err"><span>出错</span></label></div></div><div class="tw"><table><colgroup><col style="width:32px"><col><col style="width:100px"><col style="width:74px"><col style="width:80px"></colgroup><thead><tr><th class="ck"><input type="checkbox" class="all" aria-label="全选本页"></th><th>订单号</th><th class="num" aria-sort="none"><button type="button" class="sort">金额<span class="ar" aria-hidden="true">↓</span></button></th><th>状态</th><th>操作</th></tr></thead><tbody></tbody></table></div></div></div>

<script type="module">
export default function demo(root) {
  const D = [['SO-20931', 1299, '待发货', 'wa'], ['SO-20930', 86.5, '已完成', 'ok'], ['SO-20928', 12480, '运输中', 'pr'], ['SO-20925', 349, '已完成', 'ok']];
  let dir = 'none', mode = 'data'; const sel = new Set();
  const tb = root.querySelector('tbody'), all = root.querySelector('.all'), th = root.querySelector('th.num'), bulk = root.querySelector('.bulk'), tot = root.querySelector('.tot'), sn = root.querySelector('.sn'), ar = root.querySelector('.ar');
  const money = (v) => '¥' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const draw = () => {
    if (mode !== 'data') {
      all.disabled = true; all.checked = false; all.indeterminate = false; bulk.hidden = true; tot.hidden = false; tot.textContent = mode === 'load' ? '加载中…' : '共 0 条';
      tb.innerHTML = mode === 'load' ? [1, 2, 3].map(() => '<tr><td></td><td><i class="sk" style="width:70%"></i></td><td><i class="sk" style="width:60%;margin-left:auto"></i></td><td><i class="sk" style="width:44px"></i></td><td><i class="sk" style="width:48px"></i></td></tr>').join('')
        : `<tr class="stt"><td colspan="5">${mode === 'empty' ? '还没有订单<br><button type="button" class="t">新建订单</button>' : '加载失败：网络超时<br><button type="button" class="t">重试</button>'}</td></tr>`;
      return;
    }
    all.disabled = false;
    const rows = dir === 'none' ? D : [...D].sort((a, b) => (a[1] - b[1]) * (dir === 'ascending' ? 1 : -1));
    tb.innerHTML = rows.map(([id, v, s, c]) => `<tr class="${sel.has(id) ? 'on' : ''}"><td class="ck"><input type="checkbox" data-id="${id}" ${sel.has(id) ? 'checked' : ''} aria-label="选择 ${id}"></td><td>${id}</td><td class="num">${money(v)}</td><td><span class="tag ${c}">${s}</span></td><td><button type="button" class="t">详情</button><button type="button" class="t n" aria-label="${id} 的更多操作">⋯</button></td></tr>`).join('');
    all.checked = sel.size === D.length; all.indeterminate = sel.size > 0 && sel.size < D.length;
    bulk.hidden = !sel.size; tot.hidden = !!sel.size; sn.textContent = `已选 ${sel.size} 条`; tot.textContent = `共 ${D.length} 条`;
    th.setAttribute('aria-sort', dir); ar.textContent = dir === 'ascending' ? '↑' : '↓';
  };
  tb.addEventListener('change', (e) => { const id = e.target.dataset.id; if (id) { e.target.checked ? sel.add(id) : sel.delete(id); draw(); } });
  all.addEventListener('change', () => { D.forEach(([id]) => (all.checked ? sel.add(id) : sel.delete(id))); draw(); });
  root.querySelector('.clr').addEventListener('click', () => { sel.clear(); draw(); all.focus(); });
  root.querySelector('.sort').addEventListener('click', () => { dir = dir === 'descending' ? 'ascending' : 'descending'; draw(); });
  root.querySelectorAll('[name=m]').forEach((r) => r.addEventListener('change', () => { mode = r.value; draw(); }));
  draw();
}
</script>
