---
zh: 快捷筛选标签
en: Filter chips
order: 25
---

## 是什么

列表上方一排圆角小标签，每个是一个条件，点一下就按它筛选：选中时填色并长出对勾，结果和数量立即更新。

## 适合

条件是少量固定值（状态、类型、主题），想一眼看到全部可选项、点了就生效：订单、任务、商品、文章列表的快速筛选。

## 不适合

条件超过 10 个、要输入值或要“设好再查询”时用「筛选区」；表单里选值（不是筛选列表）用复选组或「多选与标签输入」。

## 注意

只有对勾或只有颜色都不够：选中态要同时有填色和对勾，读屏靠 aria-pressed 知道状态。

## 要点

- 高 32px，左右 12px，全圆角，标签间 8px；未选是白底描边，选中是强调浅底 + 强调色文字 + 14px 对勾
- 对勾宽度从 0 过渡到 14px（约 160ms），标签跟着变宽，相邻标签顺势让位；减少动态效果时直接切换
- 多选时每个标签是 button + aria-pressed；只能选一个时改成 radiogroup（role="radio" + aria-checked，方向键切换）
- 点一下立即生效，没有“确定”；同组多选按“或”合并；结果数量就地更新，用 role="status" 播报“共 N 条”
- 有选中项时末尾出现“清除”文字按钮；桌面放不下就换行，手机单行横向滚动，两端渐隐提示还有更多
- 选中条件写进地址栏，刷新和分享后保留，见「筛选联动与 URL 同步」

## 提示词

给{订单列表}上方加「快捷筛选标签」：{条件，如 待付款、待发货、已完成、退款中} 每个一枚，高 32px、左右 12px、全圆角、间距 8px；可多选，每个标签是 button 并用 aria-pressed，同组多选按“或”合并；未选白底描边，选中强调浅底 + 强调色文字，左侧对勾宽度从 0 过渡到 14px（约 160ms），相邻标签顺势让位，减少动态效果时直接切换；点一下立即筛选，不要确定按钮，列表上方“共 N 条”同步更新并用 role="status" 播报；有选中项时末尾出现“清除”文字按钮；桌面放不下换行，手机单行横向滚动并在两端渐隐；选中条件写进 URL，刷新后保留。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{width:100%;max-width:460px;display:flex;flex-direction:column;gap:10px}
.cs{display:flex;flex-wrap:wrap;align-items:center;gap:8px}
.ch{display:inline-flex;align-items:center;height:32px;padding:0 12px;border:1px solid #c9ced6;border-radius:999px;background:#fff;font-size:13px;white-space:nowrap;cursor:pointer;transition:background-color .16s,border-color .16s,color .16s}
.ch:hover{border-color:#8a909c}
.ch[aria-pressed="true"]{background:#edf1ff;border-color:#a9b8f5;color:#2f4ac0;font-weight:500}
.ck{display:inline-grid;place-items:center start;width:0;margin-right:0;overflow:hidden;transition:width .16s cubic-bezier(.2,0,0,1),margin .16s cubic-bezier(.2,0,0,1)}
.ch[aria-pressed="true"] .ck{width:14px;margin-right:4px}
.ch small{margin-left:4px;color:#5b616e;font-size:12px;font-variant-numeric:tabular-nums}
.ch[aria-pressed="true"] small{color:#2f4ac0}
.clr{height:32px}
.hd{display:flex;align-items:baseline;justify-content:space-between}
.n{display:inline-block;font-weight:600;font-variant-numeric:tabular-nums}
.n.bump{animation:bump .22s cubic-bezier(.2,0,0,1)}
@keyframes bump{40%{transform:translateY(-2px) scale(1.12)}
}
.ls{list-style:none;margin:0;padding:0;display:grid;gap:4px}
.ls li{display:flex;justify-content:space-between;gap:8px;padding:4px 10px;border-radius:6px;background:#fff;font-size:13px}
.ls li span{color:#5b616e;font-size:12px;white-space:nowrap}
@container (max-height:240px){.ls{display:none}
}
@container (max-width:310px){.cs{gap:6px}
.ch{padding:0 10px}
}
@media (prefers-reduced-motion:reduce){.ch,.ck{transition:none}
.n.bump{animation:none}
}
</style>

<div class="s"><div class="w">
  <div class="cs" role="group" aria-label="按订单状态筛选"></div>
  <div class="hd"><p class="help" role="status">共 <b class="n"></b> 条订单</p><span class="help">点一下立即生效，可多选</span></div>
  <ul class="ls"></ul>
</div></div>

<script type="module">
const ST = ['待付款', '待发货', '已完成', '退款中'];
const ROWS = [['雾蓝保温杯', '待发货'], ['亚麻抱枕套', '已完成'], ['竹纤维毛巾', '待付款'], ['陶瓷手冲壶', '待发货'], ['羊毛围巾', '退款中'], ['橡木杯垫', '已完成'], ['帆布收纳篮', '已完成'], ['玻璃密封罐', '待发货']];
const CK = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';
export default function demo(root) {
  const cs = root.querySelector('.cs'), n = root.querySelector('.n'), ls = root.querySelector('.ls');
  const on = new Set();
  const draw = () => {
    const rows = on.size ? ROWS.filter((r) => on.has(r[1])) : ROWS;
    n.textContent = rows.length;
    n.classList.remove('bump'); void n.offsetWidth; n.classList.add('bump');
    ls.innerHTML = rows.slice(0, 5).map(([a, b]) => `<li>${a}<span>${b}</span></li>`).join('');
    const clr = cs.querySelector('.clr');
    if (on.size && !clr) cs.insertAdjacentHTML('beforeend', '<button type="button" class="btn txt clr">清除</button>');
    if (!on.size && clr) { if (root.activeElement === clr) cs.querySelector('.ch').focus(); clr.remove(); }
  };
  cs.innerHTML = ST.map((s) => `<button type="button" class="ch" aria-pressed="false" data-s="${s}"><span class="ck">${CK}</span>${s}<small>${ROWS.filter((r) => r[1] === s).length}</small></button>`).join('');
  const toggle = (b) => { const s = b.dataset.s; on.has(s) ? on.delete(s) : on.add(s); b.setAttribute('aria-pressed', String(on.has(s))); draw(); };
  cs.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.classList.contains('clr')) { on.clear(); cs.querySelectorAll('.ch').forEach((c) => c.setAttribute('aria-pressed', 'false')); draw(); return; }
    toggle(b);
  });
  draw();
  // 自动演示：依次选中两个条件
  setTimeout(() => root.host.isConnected && toggle(cs.querySelector('[data-s="待发货"]')), 500);
  setTimeout(() => root.host.isConnected && toggle(cs.querySelector('[data-s="已完成"]')), 1100);
}
</script>
