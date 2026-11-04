---
zh: 分页
en: Pagination
order: 20
---

## 是什么

表格底部右侧的页码条：总条数、上下页、页码、每页条数和跳页。

## 适合

需要定位、比较、批量处理的数据列表和表格。

## 不适合

信息流、动态、聊天记录用无限滚动或“加载更多”；总共不到一页时隐藏页码，只显示总数。

## 要点

- 用组件库的分页：Element Plus el-pagination（total、v-model:current-page、v-model:page-size、page-sizes、layout="total, sizes, prev, pager, next, jumper"、background）、Naive UI n-pagination（item-count、v-model:page、v-model:page-size、page-sizes、show-size-picker、show-quick-jumper，总数写在 prefix 插槽）、Ant Design Vue a-pagination（total、v-model:current、v-model:pageSize、pageSizeOptions、showSizeChanger、showQuickJumper、showTotal）；表格自带分页时直接用它的 pagination 属性（n-data-table、a-table），不再放一个
- 放在表格底部右侧，最前面显示“共 1,284 条”（layout 里的 total / prefix 插槽 / showTotal）
- 每页条数 10 / 20 / 50 / 100 要显式写：Element Plus page-sizes 默认是六档，Naive UI 默认只有 [10]，Ant Design Vue 默认总数超过 50 才显示切换器；记住用户的选择
- 页数多时折叠成首页、当前页前后、末页加“…”是组件默认（pager-count / page-slot / showLessItems），不要改；超过 10 页才开跳页（layout 的 jumper / show-quick-jumper / showQuickJumper），越界就地提示
- 当前页高亮、首末页禁用上一页 / 下一页由组件处理；相邻页码至少隔 8px，组件默认挤在一起时改它的间距变量
- 总共不到一页时隐藏页码只显示总数（hide-on-single-page / hideOnSinglePage；Naive UI 的 n-data-table 用 paginate-single-page=false）
- 筛选、搜索、排序或每页条数变化后回到第 1 页（在 size-change / on-update:page-size / showSizeChange 里把页码置 1）；翻页时保留旧数据并显示区域加载，不清空成骨架
- 窄屏用简洁模式（Naive UI、Ant Design Vue 的 simple；Element Plus 改 layout="prev, pager, next" 并缩小 pager-count），只剩“上一页 · 3 / 20 · 下一页”

## 提示词

在{用户表格}底部右侧加分页：用项目组件库自带的分页（Element Plus el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100]"；Naive UI n-pagination item-count、show-size-picker、:page-sizes="[10, 20, 50, 100]"、show-quick-jumper，总数写在 prefix 插槽；Ant Design Vue a-pagination showTotal、showSizeChanger、:pageSizeOptions="['10', '20', '50', '100']"、showQuickJumper；表格自带 pagination 属性的直接用它），不手写页码。最前面“共 {1,284} 条”；页码折叠和首末页禁用用组件默认；每页条数记住选择；跳页越界时提示；筛选或条数变化回到第 1 页；翻页保留旧数据并显示加载；不到一页时隐藏页码只留总数；相邻页码至少隔 8px；窄屏用 simple 模式（Element Plus 改 layout="prev, pager, next"）。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{width:100%;display:flex;flex-direction:column;align-items:center;gap:16px}
.rng{font-variant-numeric:tabular-nums}
.pg{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px 12px}
.tot{font-variant-numeric:tabular-nums}
.pg{max-width:100%}
.nb,.nums{display:inline-flex;align-items:center;gap:4px}
.nb button{min-width:28px;height:28px;padding:0 6px;border:1px solid transparent;border-radius:6px;background:none;cursor:pointer;font-variant-numeric:tabular-nums}
.nb button:hover{background:#e9ecf0}
.nums [aria-current]{border-color:#3b5bdb;background:#fff;color:#3b5bdb;font-weight:600}
.pb{font-size:16px}
.pb:disabled{color:#c9ced6;background:none!important;cursor:not-allowed}
.dots{color:#5b616e;letter-spacing:1px}
.ex{display:inline-flex;align-items:center;gap:12px}
.sel select{height:28px;font-size:13px}
.jp{display:inline-flex;align-items:center;gap:6px;color:#5b616e;font-size:13px}
.jp .inp{width:48px;height:28px;padding:0 6px;text-align:center;color:#1f2329}
@container (max-width:400px){.nb,.nums{gap:2px}
.nb button{min-width:24px;padding:0 3px}
}
</style>

<div class="s"><div class="w"><p class="help rng" aria-live="polite"></p><nav class="pg" aria-label="分页"><span class="help tot">共 1,284 条</span><span class="nb"><button type="button" class="pb prev" aria-label="上一页">‹</button><span class="nums"></span><button type="button" class="pb next" aria-label="下一页">›</button></span><span class="ex"><span class="sel"><select aria-label="每页条数"><option value="10">10 条/页</option><option value="20" selected>20 条/页</option><option value="50">50 条/页</option><option value="100">100 条/页</option></select></span><label class="jp">跳至<input class="inp" inputmode="numeric" aria-label="跳转到页码">页</label></span></nav></div></div>

<script type="module">
export default function demo(root) {
  const T = 1284; let size = 20, cur = 5;
  const nums = root.querySelector('.nums'), prev = root.querySelector('.prev'), next = root.querySelector('.next'), rng = root.querySelector('.rng'), jp = root.querySelector('.jp input'), sz = root.querySelector('select');
  const P = () => Math.ceil(T / size);
  const draw = () => {
    const n = P(); cur = Math.min(Math.max(1, cur), n);
    let a = Math.max(2, cur - 1), b = Math.min(n - 1, cur + 1); if (cur <= 3) { a = 2; b = Math.min(n - 1, 5); } if (cur >= n - 2) { a = Math.max(2, n - 4); b = n - 1; }
    const L = [1]; if (a > 2) L.push('l'); for (let k = a; k <= b; k++) L.push(k); if (b < n - 1) L.push('r'); if (n > 1) L.push(n);
    nums.innerHTML = L.map((k) => typeof k === 'number' ? `<button type="button" data-p="${k}" ${k === cur ? 'aria-current="page"' : ''} aria-label="第 ${k} 页">${k}</button>` : `<button type="button" class="dots" data-p="${k === 'l' ? cur - 5 : cur + 5}" aria-label="${k === 'l' ? '向前' : '向后'} 5 页">…</button>`).join('');
    prev.disabled = cur === 1; next.disabled = cur === n;
    rng.textContent = `第 ${cur} / ${n} 页 · 显示第 ${(cur - 1) * size + 1}–${Math.min(cur * size, T)} 条`;
  };
  const go = (p, focusCur) => { cur = p; draw(); if (focusCur) nums.querySelector('[aria-current]').focus(); };
  nums.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) go(+b.dataset.p, true); });
  prev.addEventListener('click', () => go(cur - 1)); next.addEventListener('click', () => go(cur + 1));
  sz.addEventListener('change', () => { size = +sz.value; go(1); });
  jp.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return; const p = parseInt(jp.value, 10), bad = !(p >= 1 && p <= P());
    jp.classList.toggle('err', bad); jp.setAttribute('aria-invalid', String(bad)); jp.title = bad ? `请输入 1–${P()}` : '';
    if (bad) rng.textContent = `页码超出范围，请输入 1–${P()}`; else { jp.value = ''; go(p); }
  });
  draw();
}
</script>
