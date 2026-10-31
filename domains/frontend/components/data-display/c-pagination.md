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

- 放在表格底部右侧，最前面显示“共 1,284 条”
- 页码按钮 32×32px（紧凑 24–28px），间距 4px；当前页主色描边或浅主色底，并设 aria-current="page"
- 页数多时折叠：首页、当前页前后 1–2 页、末页，中间用“…”；“…”可点击前进或后退 5 页
- 首页禁用“上一页”、末页禁用“下一页”；上一页 / 下一页有 aria-label
- 每页条数 10 / 20 / 50 / 100 并记住选择；超过 10 页给跳页输入框，回车跳转，越界就地提示
- 筛选、搜索、排序或每页条数变化后回到第 1 页；翻页时保留旧数据并显示区域加载，不清空成骨架
- 用 nav aria-label="分页" 包住；窄屏只保留“上一页 · 3 / 20 · 下一页”

## 提示词

在{用户表格}底部右侧加分页：最前面“共 {1,284} 条”，页码按钮 32×32px、间距 4px，当前页主色描边并设 aria-current="page"；页数多时显示首页、当前页前后 1 页、末页，中间“…”（点击跳 5 页）；首末页禁用对应方向按钮；右侧每页条数 10 / 20 / 50 / 100 下拉（记住选择）和跳页输入框，越界时提示；筛选或条数变化回到第 1 页；翻页保留旧数据并显示加载；用 nav aria-label="分页"；窄屏只显示“上一页 3 / 20 下一页”。

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
