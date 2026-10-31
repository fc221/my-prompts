---
zh: 换视图不丢勾选
en: View switch keeps state
order: 70
---

## 是什么

同一批数据可以在卡片、列表、表格之间切换；切过去之后搜索词、筛选、勾选、排序和正在看的位置都还在。

## 适合

素材库、文件管理、商品后台、网盘这类既要挑图、又要找文件、还要比数据的页面：挑图片看卡片，找文件看列表，比字段看表格。

## 不适合

只有一种看法合适时不要硬加切换（纯数字对比只给表格）；条目少于 10 个时一种视图就够。

## 注意

视图只管“怎么画”，搜索、筛选、勾选、排序管“看什么”，两者分开存：切视图只换前者，一切换就清空勾选是最常见的错。

## 要点

- 默认视图按内容定：图片为主用卡片，文件为主用列表，数字字段多用表格；切换器放工具栏右侧，3 个带文字提示的图标按钮，当前项 aria-pressed
- 切换时保留搜索词、筛选、勾选、排序和已加载的条数，不重新请求数据
- 滚动位置按“第一个可见的条目”恢复：切换后把它滚到顶部，不按像素值恢复（三种视图行高不同）
- 卡片和列表互切时，可视区里的条目从旧位置滑到新位置（FLIP，≤ 300ms），一眼看出谁变成了谁；条目超过约 60 个或开启减少动态效果时直接切换
- 同一视图里列数变化（如窗口变窄，4 列变 3 列）时，换行的条目沿一段小弧线移到新位置，各条目错开 20–30ms 依次出发，读得出谁去了哪里；捏合切换密度见「捏合换密度」
- 勾选按条目 id 记；被筛掉的已选项仍然算数，写明“已选 3 项（1 项不在当前结果里）”
- 卡片视图也能排序：工具栏的排序下拉和表格表头排序是同一个状态
- 切换后焦点落到同一条目的对应位置，用 role="status" 播报“已切到表格，保留已选 2 项”
- 记住用户最后选的视图（按页面分开记），下次进来直接用

## 提示词

给{列表页，如 素材库}加「卡片 / 列表 / 表格」视图切换，并保证切换不丢状态：搜索词、筛选、勾选（按条目 id 记）、排序和已加载条数存在视图之外，切换只换渲染方式，不重新请求；切换前记下第一个可见条目，切换后把它滚到顶部；卡片和列表互切时可视区条目用 FLIP 从旧位置滑到新位置（≤ 300ms，超过 60 个或减少动态效果时直接切换），列数变化时换行的条目沿小弧线移动、错开 20–30ms 依次出发；被筛掉的已选项仍计入“已选 N 项”并注明有几项不在当前结果里；卡片视图提供排序下拉，与表格表头排序共用同一状态；切换器在工具栏右侧，用带文字提示的图标按钮和 aria-pressed，切换后用 role="status" 播报保留了什么；默认视图{卡片 / 列表 / 表格}，并记住用户上次的选择。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:8px 12px}
.box{display:grid;grid-template-rows:auto minmax(0,1fr) auto;gap:6px;height:100%;max-width:620px;margin:0 auto}
.tb{display:flex;align-items:center;gap:6px}
.sq{flex:1;min-width:0;display:flex;align-items:center;gap:6px;height:28px;padding:0 8px;border:1px solid #d0d5dd;border-radius:8px;background:#fff;color:#8a909c}
.sq:focus-within{border-color:#3b5bdb;box-shadow:0 0 0 3px #dfe6ff}
.sq svg{flex:none;width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round}
.sq input{flex:1;min-width:0;height:100%;padding:0;border:0;outline:0;background:none;font-size:12px;color:#1f2329}
.seg{flex:none;display:flex;gap:2px;padding:2px;border-radius:8px;background:#e9ecf1}
.seg button{display:grid;place-items:center;width:28px;height:24px;padding:0;border:0;border-radius:6px;background:none;color:#5b616e}
.seg svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linejoin:round;stroke-linecap:round}
.seg [aria-pressed=true]{background:#fff;color:#3b5bdb;box-shadow:0 1px 2px rgba(16,24,40,.12)}
.vw{position:relative;min-height:0;overflow:auto;border:1px solid #e3e6eb;border-radius:10px;background:#fff}
input[type=checkbox]{width:14px;height:14px;margin:0;accent-color:#3b5bdb;cursor:pointer}
.th{display:block;border-radius:4px;background:var(--g)}
.th.doc{background:#f1f3f6;position:relative}
.th.doc::after{content:"";position:absolute;left:32%;top:22%;width:36%;height:56%;border-radius:2px;background:#fff;box-shadow:0 0 0 1px #d0d5dd,inset 0 3px 0 -1px #fff,inset 0 4px 0 0 var(--c,#98a2b3)}
.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;padding:6px}
.cd{position:relative;display:grid;gap:3px;padding:4px;border:1px solid #eef0f3;border-radius:8px;font-size:11px}
.cd .th{height:40px}
.cd input{position:absolute;left:7px;top:7px}
.cd.on{border-color:#3b5bdb;background:#f3f6ff}
.cd span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ls{list-style:none;margin:0;padding:2px 0}
.ls li{display:flex;align-items:center;gap:8px;height:28px;padding:0 10px;font-size:12px}
.ls li.on{background:#f3f6ff}
.ls .th{flex:none;width:20px;height:20px}
.ls .nm{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ls .dt{color:#8a909c;font-variant-numeric:tabular-nums}
table{width:100%;border-collapse:collapse;font-size:12px}
th,td{height:26px;padding:0 8px;border-bottom:1px solid #eef0f3;text-align:left;white-space:nowrap}
th{position:sticky;top:0;z-index:1;background:#fafbfc;color:#5b616e;font-weight:600}
th:first-child,td:first-child{width:30px;padding-right:0}
th button{padding:0;border:0;background:none;color:inherit;font:inherit}
th button[data-dir]::after{content:attr(data-dir);margin-left:3px;color:#3b5bdb}
td.nm{max-width:0;width:100%;overflow:hidden;text-overflow:ellipsis}
.num{text-align:right;font-variant-numeric:tabular-nums}
tr.on td{background:#f3f6ff}
.ty{color:#5b616e}
.msg{margin:0;min-height:18px;color:#5b616e;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.msg b{color:#3b5bdb;font-weight:600}
.empty{padding:24px 0;text-align:center;color:#8a909c;font-size:12px}
@container (max-width:340px){.ty,.c-ty{display:none}
}
@container (min-height:250px){.st{padding:14px 24px}
.box{gap:10px}
.grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;padding:8px}
.cd .th{height:64px}
.cd{font-size:12px}
.ls li{height:34px}
th,td{height:32px}
}
</style>

<div class="st"><div class="box"><div class="tb"><label class="sq"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><input type="search" value="新品" aria-label="搜索素材" placeholder="搜索素材"></label><div class="seg" role="group" aria-label="视图"><button type="button" data-v="card" aria-pressed="true" aria-label="卡片视图" title="卡片：挑图片"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg></button><button type="button" data-v="list" aria-pressed="false" aria-label="列表视图" title="列表：找文件"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r=".8"/><circle cx="4.5" cy="12" r=".8"/><circle cx="4.5" cy="18" r=".8"/></svg></button><button type="button" data-v="table" aria-pressed="false" aria-label="表格视图" title="表格：比数据"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15" rx="1.5"/><path d="M3.5 9.5h17M3.5 14.5h17M9.5 9.5v10"/></svg></button></div></div><div class="vw"></div><p class="msg" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  // [id, 名称, 类型, 大小 KB, 修改日期, 缩略图配色]
  const D = [
    [1, '新品主图-正面', '图片', 2460, '10-26', 'linear-gradient(135deg,#f6c28b,#e07a5f)'],
    [2, '新品主图-侧面', '图片', 2150, '10-26', 'linear-gradient(135deg,#9ad1d4,#3d7ea6)'],
    [3, '新品详情长图', '图片', 6960, '10-25', 'linear-gradient(180deg,#f4e1c1,#c9a27e)'],
    [4, '新品价格表', '表格', 48, '10-25', '#12805c'],
    [5, '新品发布会流程', '文档', 120, '10-24', '#3b5bdb'],
    [6, '新品短视频封面', '图片', 1330, '10-23', 'radial-gradient(circle at 30% 30%,#ffe29a,#f08a5d 60%,#b83b5e)'],
    [7, '新品陈列示意', '图片', 3270, '10-22', 'linear-gradient(160deg,#c3e6cb,#5c9e7a)'],
    [8, '门店外立面', '图片', 4090, '10-21', 'linear-gradient(180deg,#a7c5eb,#6a8caf)'],
    [9, '新品物料清单', '表格', 32, '10-19', '#12805c'],
    [10, '秋季海报竖版', '图片', 2970, '10-18', 'linear-gradient(160deg,#e9b872,#a23e48)'],
    [11, '新品试用反馈', '文档', 64, '10-17', '#3b5bdb'],
  ];
  const NAME = { card: '卡片', list: '列表', table: '表格' };
  const vw = root.querySelector('.vw'), q = root.querySelector('input[type=search]'), msg = root.querySelector('.msg'), segs = [...root.querySelectorAll('.seg button')];
  // 视图之外的状态：切视图时只换 view，其余都不动
  const S = { view: 'card', q: q.value, sel: new Set(), sort: { k: 'date', dir: -1 } };
  const size = (kb) => (kb >= 1024 ? (kb / 1024).toFixed(1) + ' MB' : kb + ' KB');
  const thumb = (d) => (d[2] === '图片' ? `<i class="th" style="--g:${d[5]}"></i>` : `<i class="th doc" style="--c:${d[5]}"></i>`);
  const rows = () => {
    const k = { name: 1, size: 3, date: 4 }[S.sort.k];
    return D.filter((d) => d[1].includes(S.q.trim())).sort((a, b) => (a[k] > b[k] ? 1 : a[k] < b[k] ? -1 : 0) * S.sort.dir);
  };
  const box = (d) => `<input type="checkbox" data-id="${d[0]}" ${S.sel.has(d[0]) ? 'checked' : ''} aria-label="选择 ${d[1]}">`;
  const arrow = (k) => (S.sort.k === k ? `data-dir="${S.sort.dir > 0 ? '↑' : '↓'}"` : '');
  const render = () => {
    const R = rows(), on = (d) => (S.sel.has(d[0]) ? 'on' : '');
    if (!R.length) vw.innerHTML = '<p class="empty">没有匹配的素材</p>';
    else if (S.view === 'card') vw.innerHTML = `<div class="grid">${R.map((d) => `<div class="cd ${on(d)}" data-id="${d[0]}">${thumb(d)}${box(d)}<span>${d[1]}</span></div>`).join('')}</div>`;
    else if (S.view === 'list') vw.innerHTML = `<ul class="ls">${R.map((d) => `<li class="${on(d)}" data-id="${d[0]}">${box(d)}${thumb(d)}<span class="nm">${d[1]}</span><span class="dt">${d[4]}</span></li>`).join('')}</ul>`;
    else vw.innerHTML = `<table><thead><tr><th><span class="sr">选择</span></th><th><button type="button" data-k="name" ${arrow('name')}>名称</button></th><th class="c-ty">类型</th><th class="num"><button type="button" data-k="size" ${arrow('size')}>大小</button></th><th><button type="button" data-k="date" ${arrow('date')}>修改</button></th></tr></thead><tbody>${R.map((d) => `<tr class="${on(d)}" data-id="${d[0]}"><td>${box(d)}</td><td class="nm">${d[1]}</td><td class="ty">${d[2]}</td><td class="num">${size(d[3])}</td><td>${d[4]}</td></tr>`).join('')}</tbody></table>`;
    segs.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === S.view)));
  };
  const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const hidden = () => [...S.sel].filter((id) => !rows().some((d) => d[0] === id)).length;
  const summary = () => `已选 <b>${S.sel.size}</b> 项${hidden() ? `（${hidden()} 项不在当前结果里）` : ''} · 搜索“${esc(S.q.trim()) || '全部'}”`;
  // 第一个可见条目：切换前记下，切换后滚到顶部（三种视图行高不同，不按像素恢复）
  const stickyH = () => vw.querySelector('thead')?.offsetHeight || 0;
  const firstVisible = () => [...vw.querySelectorAll('[data-id]:not(input)')].find((el) => el.getBoundingClientRect().bottom - vw.getBoundingClientRect().top > stickyH() + 4);
  const scrollTo = (id) => { const el = vw.querySelector(`[data-id="${id}"]:not(input)`); if (el) vw.scrollTop += el.getBoundingClientRect().top - vw.getBoundingClientRect().top - stickyH() - (S.view === 'card' ? 6 : 0); };
  const setView = (v) => {
    if (v === S.view) return;
    const anchor = firstVisible()?.dataset.id; S.view = v; render(); if (anchor) scrollTo(anchor);
    msg.innerHTML = `已切到${NAME[v]} · ` + summary() + ' · 位置不变';
  };
  segs.forEach((b) => b.addEventListener('click', () => setView(b.dataset.v)));
  q.addEventListener('input', () => { S.q = q.value; render(); msg.innerHTML = summary(); });
  vw.addEventListener('change', (e) => {
    const id = +e.target.dataset.id; if (!id) return;
    e.target.checked ? S.sel.add(id) : S.sel.delete(id);
    e.target.closest('[data-id]:not(input)').classList.toggle('on', e.target.checked);
    msg.innerHTML = summary();
  });
  vw.addEventListener('click', (e) => {
    const b = e.target.closest('th button'); if (!b) return;
    S.sort = { k: b.dataset.k, dir: S.sort.k === b.dataset.k ? -S.sort.dir : b.dataset.k === 'name' ? 1 : -1 };
    render(); vw.querySelector(`th button[data-k="${b.dataset.k}"]`).focus();
    msg.innerHTML = `按${b.textContent}排序，切到卡片和列表也保持这个顺序`;
  });
  render(); msg.innerHTML = summary();
  // 自动演示：卡片里勾两项并往下滚一行 → 切列表 → 切表格
  const later = (ms, fn) => setTimeout(() => { if (root.host.isConnected) fn(); }, ms);
  later(300, () => { [2, 6].forEach((id) => vw.querySelector(`input[data-id="${id}"]`).click()); scrollTo(4); });
  later(1100, () => setView('list'));
  later(1900, () => setView('table'));
}
</script>
