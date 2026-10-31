---
zh: 图表与表格联动
en: Chart-table linking
order: 30
---

## 是什么

悬停或点选图表里的一根柱子，表格对应行同步高亮；悬停表格行也反向高亮柱子。

## 适合

报表、数据看板、销售分析等同一份数据既有图又有明细的页面。

## 注意

联动只改高亮，不改数据；悬停是临时的，点击才固定选中。

## 要点

- 悬停柱子：该柱保持原色，其余降到 30% 不透明度；表格对应行加浅强调底和左侧 3px 指示条。
- 悬停表格行时反向高亮对应柱子，两边同一帧变化（过渡不超过 160ms）。
- 点击固定选中，再点一次或按 Esc 取消；悬停时优先显示悬停项，离开后回到固定项。
- 柱子可聚焦，左右方向键切换并同步高亮；数值同时以文字显示，不只靠颜色。
- 图和表的颜色、排序、单位保持一致（如都按销售额降序、单位“万元”）。
- 页面上还有其他共用这份数据的区块时，一起高亮同一项。

## 提示词

给{图表}和{明细表格}做「联动高亮」：悬停或聚焦某根柱子时，该柱保持原色、其余降到 30% 不透明度，表格对应行同帧加浅色底和左侧指示条；悬停表格行反向高亮柱子；点击固定选中，再点或按 Esc 取消；柱子可聚焦，方向键切换；图表和表格的排序、单位、颜色保持一致。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:12px}
.box{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px;max-width:640px;height:100%;margin:0 auto;padding:12px;background:#fff;border:1px solid #e3e6eb;border-radius:12px}
.ch{display:flex;align-items:stretch;gap:6px;min-height:0}
.b{display:flex;flex:1;flex-direction:column;align-items:center;gap:2px;min-width:0;padding:0;border:0;border-radius:4px;background:none}
.b em{color:#5b616e;font-size:12px;font-style:normal;font-variant-numeric:tabular-nums;opacity:0;transition:opacity .12s}
.tr{display:flex;flex:1;align-items:flex-end;justify-content:center;width:100%;min-height:0;border-bottom:1px solid #e3e6eb}
.b i{display:block;width:70%;max-width:28px;border-radius:4px 4px 0 0;background:#3b5bdb;transition:opacity .16s}
.b small{color:#5b616e;font-size:12px}
.dim .b i{opacity:.3}
.dim .b.on i{opacity:1}
.b.on em{opacity:1;color:#1f2329;font-weight:600}
.b.on small{color:#1f2329}
table{align-self:center;width:100%;border-collapse:collapse;font-size:12px}
th,td{height:26px;padding:0 6px;border-bottom:1px solid #e3e6eb;text-align:left;white-space:nowrap}
th{color:#5b616e;font-weight:600}
.n{text-align:right;font-variant-numeric:tabular-nums}
tbody tr{cursor:pointer;transition:background .16s}
tbody tr:hover td{background:#f5f6f8}
tbody tr.on td{background:#edf1ff}
tbody tr.on td:first-child{box-shadow:inset 3px 0 #3b5bdb}
@container (min-width:560px){.box{gap:24px;padding:20px}
th,td{height:34px;font-size:13px}
}
@container (max-width:400px){table{font-size:11px}
th,td{padding-left:2px!important;padding-right:2px!important}
}
.b em{max-width:100%;overflow:hidden;text-overflow:clip}
</style>

<div class="st"><div class="box"><div class="ch" role="group" aria-label="各区域销售额（万元），方向键切换"></div><table><caption class="sr">各区域销售额</caption><thead><tr><th>区域</th><th class="n">销售额</th><th class="n">占比</th></tr></thead><tbody></tbody></table></div></div>

<script type="module">
export default function demo(root) {
  const D = [['华东', 428], ['华南', 316], ['华北', 251], ['西南', 142], ['西北', 63]], T = D.reduce((s, d) => s + d[1], 0), M = D[0][1];
  const box = root.querySelector('.box'), ch = root.querySelector('.ch'), tb = root.querySelector('tbody');
  let hover = -1, pin = -1;
  D.forEach(([n, v], i) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'b'; b.tabIndex = i ? -1 : 0; b.setAttribute('aria-label', `${n} ${v} 万元`);
    b.innerHTML = `<em>${v}</em><span class="tr"><i style="height:${(v / M) * 100}%"></i></span><small>${n}</small>`; ch.append(b);
    const tr = document.createElement('tr'); tr.innerHTML = `<td>${n}</td><td class="n">${v} 万</td><td class="n">${((v / T) * 100).toFixed(1)}%</td>`; tb.append(tr);
    [b, tr].forEach((el) => {
      el.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { hover = i; show(); } });
      el.addEventListener('pointerleave', () => { hover = -1; show(); });
      el.addEventListener('click', () => { pin = pin === i ? -1 : i; show(); });
    });
    b.addEventListener('focus', () => { hover = i; show(); }); b.addEventListener('blur', () => { hover = -1; show(); });
  });
  const bars = [...ch.children], rows = [...tb.children];
  const show = () => { // 一个当前值同时驱动图和表
    const k = hover >= 0 ? hover : pin; box.classList.toggle('dim', k >= 0);
    bars.forEach((b, j) => { b.classList.toggle('on', j === k); b.setAttribute('aria-pressed', String(j === pin)); });
    rows.forEach((r, j) => r.classList.toggle('on', j === k));
  };
  ch.addEventListener('keydown', (e) => {
    const i = bars.indexOf(root.activeElement); if (i < 0) return;
    const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (d) { e.preventDefault(); const j = (i + d + bars.length) % bars.length; bars[i].tabIndex = -1; bars[j].tabIndex = 0; bars[j].focus(); }
  });
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && pin >= 0) { e.preventDefault(); pin = -1; show(); } });
  pin = 1; show();
}
</script>
