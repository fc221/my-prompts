---
zh: 图表原地放大
en: Focus a chart in place
order: 60
---

## 是什么

看板上点某个图表的“放大”，它从原来的位置长大、占满看板，其余模块缩成一排缩略条停在下方；点缩略条直接换成那张图放大，关闭时沿原路缩回原位。

## 适合

看板上的单张图要细看（完整坐标轴、图例、数值标签），又想随时切到旁边的图对照。

## 不适合

只想看清某个点的数值时用十字线读数；放大后要做筛选、编辑等一整套操作时，打开独立页面。

## 注意

放大状态写进地址（如 ?focus=orders），刷新或分享出去直接打开放大视图；Esc 或“收起”回到看板，焦点回到原模块的“放大”按钮。

## 要点

- 共享元素式过渡：先记下每个模块的位置和尺寸，切换布局后用 transform 从旧位置过渡到新位置（FLIP），约 300ms；放大的和缩小的模块同时动
- 缩略条每格 56–80px 高：标题 + 迷你图，整格是按钮，可 Tab、可点，当前放大的那张不在条里
- 放大后多给信息：完整坐标轴、图例、最新值；缩回后恢复看板里的精简样式
- 与「点柱子看下一层」不同：这里不换数据层级，只换视图大小；同页多张图的读数联动见「十字线跟随读数」
- 减少动态效果时直接切换布局，不做位移和缩放

## 提示词

给{看板}的每个图表模块加「图表原地放大」：模块右上角“放大”按钮，点后该模块从原位置长大占满看板，其余模块缩成下方一排 56–80px 高的缩略条（标题 + 迷你图，整格是按钮），点缩略条换成那张图放大；用 FLIP 做过渡：切换布局前记下各模块位置，切换后用 transform 从旧位置过渡到新位置，约 300ms，放大和缩小的模块同时动；放大后显示完整坐标轴、图例和最新值；放大状态写进地址 ?focus={模块 id}，刷新后直接打开；Esc 或“收起”沿原路缩回，焦点回到原模块的“放大”按钮；切换时用 role="status" 播报“已放大 {模块名}”；减少动态效果时直接切换。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:10px 12px}
.bd{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:minmax(0,1fr);gap:8px;max-width:640px;height:100%;margin:0 auto}
.fx{grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:minmax(0,1fr) 56px}
.m{position:relative;display:flex;flex-direction:column;gap:4px;min-width:0;min-height:0;padding:6px 10px 8px;border:1px solid #e3e6eb;border-radius:10px;background:#fff}
.big{grid-column:1/-1;grid-row:1;padding:8px 12px 8px}
.hd{display:flex;align-items:center;gap:8px;min-width:0;height:22px}
.hd b{flex:1;min-width:0;overflow:hidden;font-size:12px;font-weight:600;white-space:nowrap;text-overflow:ellipsis}
.v{color:#5b616e;font-size:12px;font-variant-numeric:tabular-nums;white-space:nowrap}
.zm{display:grid;place-items:center;flex:none;min-width:24px;height:24px;padding:0 4px;border:0;border-radius:6px;background:none;color:#5b616e;font-size:12px;white-space:nowrap}
.zm .t,.big .zm svg{display:none}
.big .zm .t{display:inline}
.big .zm{padding:0 8px;background:#f1f3f6;color:#1f2329}
.cv{position:relative;flex:1;min-height:0}
svg.ch{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.ch rect{fill:var(--c)}
.ch polyline{fill:none;stroke:var(--c);stroke-width:2;stroke-linejoin:round;vector-effect:non-scaling-stroke}
.ch .cmp{stroke:#c3c8d1;stroke-dasharray:4 3;display:none}
.big .ch .cmp{display:inline}
.ax,.lg{display:none;justify-content:space-between;color:#5b616e;font-size:11px}
.big .ax{display:flex}
.big .lg{display:flex;justify-content:flex-start;gap:12px}
.lg i{display:inline-block;width:10px;height:2px;margin-right:4px;vertical-align:middle;background:var(--c)}
.lg i.d{background:repeating-linear-gradient(90deg,#c3c8d1 0 4px,transparent 4px 7px)}
.fx .m:not(.big){padding:4px 8px 6px;gap:2px}
.fx .m:not(.big) .v{display:none}
.fx .m:not(.big) .hd{height:16px}
.fx .m:not(.big) .zm{position:absolute;inset:0;width:auto;height:auto;border-radius:inherit;color:transparent}
.fx .m:not(.big) .zm svg{display:none}
@media (hover:hover){.zm:hover{background:#f1f3f6}
.fx .m:not(.big) .zm:hover{background:rgba(59,91,219,.06)}
}
@container (max-height:240px){.st{padding:8px 10px}
.bd{gap:6px}
.fx{grid-template-rows:minmax(0,1fr) 48px}
.big .lg{display:none}
}
</style>

<div class="st"><div class="bd">
  <section class="m" data-k="orders" style="--c:#3b5bdb"><div class="hd"><b>订单量</b><span class="v">1,284</span><button type="button" class="zm"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5 9 7M2.5 13.5 7 9"/></svg><span class="t">收起</span></button></div><div class="lg"><span><i></i>本周</span><span><i class="d"></i>上周</span></div><div class="cv"><svg class="ch" viewBox="0 0 70 40" preserveAspectRatio="none" aria-hidden="true"><rect x="2" y="18" width="6" height="22"/><rect x="12" y="12" width="6" height="28"/><rect x="22" y="15" width="6" height="25"/><rect x="32" y="8" width="6" height="32"/><rect x="42" y="20" width="6" height="20"/><rect x="52" y="5" width="6" height="35"/><rect x="62" y="10" width="6" height="30"/><polyline class="cmp" points="5,22 15,18 25,21 35,15 45,24 55,14 65,17"/></svg></div><div class="ax"><span>周一</span><span>周三</span><span>周五</span><span>周日</span></div></section>
  <section class="m" data-k="users" style="--c:#0f9d76"><div class="hd"><b>新增用户</b><span class="v">316</span><button type="button" class="zm"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5 9 7M2.5 13.5 7 9"/></svg><span class="t">收起</span></button></div><div class="lg"><span><i></i>本周</span><span><i class="d"></i>上周</span></div><div class="cv"><svg class="ch" viewBox="0 0 60 40" preserveAspectRatio="none" aria-hidden="true"><polyline class="cmp" points="0,30 10,28 20,29 30,24 40,26 50,22 60,23"/><polyline points="0,32 10,26 20,28 30,18 40,20 50,10 60,6"/></svg></div><div class="ax"><span>周一</span><span>周三</span><span>周五</span><span>周日</span></div></section>
  <section class="m" data-k="refund" style="--c:#d9480f"><div class="hd"><b>退款率</b><span class="v">2.4%</span><button type="button" class="zm"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5 9 7M2.5 13.5 7 9"/></svg><span class="t">收起</span></button></div><div class="lg"><span><i></i>本周</span><span><i class="d"></i>上周</span></div><div class="cv"><svg class="ch" viewBox="0 0 60 40" preserveAspectRatio="none" aria-hidden="true"><polyline class="cmp" points="0,20 10,22 20,18 30,21 40,19 50,22 60,20"/><polyline points="0,14 10,18 20,12 30,22 40,26 50,24 60,28"/></svg></div><div class="ax"><span>周一</span><span>周三</span><span>周五</span><span>周日</span></div></section>
  <section class="m" data-k="aov" style="--c:#7048e8"><div class="hd"><b>客单价</b><span class="v">¥86</span><button type="button" class="zm"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5 9 7M2.5 13.5 7 9"/></svg><span class="t">收起</span></button></div><div class="lg"><span><i></i>本周</span><span><i class="d"></i>上周</span></div><div class="cv"><svg class="ch" viewBox="0 0 70 40" preserveAspectRatio="none" aria-hidden="true"><rect x="2" y="14" width="6" height="26"/><rect x="12" y="16" width="6" height="24"/><rect x="22" y="10" width="6" height="30"/><rect x="32" y="13" width="6" height="27"/><rect x="42" y="9" width="6" height="31"/><rect x="52" y="12" width="6" height="28"/><rect x="62" y="7" width="6" height="33"/><polyline class="cmp" points="5,18 15,19 25,16 35,18 45,15 55,17 65,14"/></svg></div><div class="ax"><span>周一</span><span>周三</span><span>周五</span><span>周日</span></div></section>
</div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const bd = root.querySelector('.bd'), mods = [...root.querySelectorAll('.m')], say = root.querySelector('.sr');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cur = null;
  const name = (m) => m.querySelector('.hd b').textContent;
  const label = () => mods.forEach((m) => m.querySelector('.zm').setAttribute('aria-label', m === cur ? `收起 ${name(m)}` : cur ? `切换到 ${name(m)}` : `放大 ${name(m)}`));
  // FLIP：记下旧位置 → 换布局 → 用 transform 从旧位置过渡到新位置
  const flip = (change) => {
    const first = new Map(mods.map((m) => [m, m.getBoundingClientRect()]));
    change();
    if (still) return;
    mods.forEach((m) => {
      const a = first.get(m), b = m.getBoundingClientRect();
      if (!b.width || !b.height) return;
      m.animate([{ transformOrigin: '0 0', transform: `translate(${a.left - b.left}px,${a.top - b.top}px) scale(${a.width / b.width},${a.height / b.height})` }, { transformOrigin: '0 0', transform: 'none' }], { duration: 300, easing: 'cubic-bezier(.2,.8,.2,1)' });
    });
  };
  const focus = (m, quiet) => {
    flip(() => { mods.forEach((x) => x.classList.toggle('big', x === m)); bd.classList.toggle('fx', !!m); cur = m; label(); });
    if (!quiet) say.textContent = m ? `已放大 ${name(m)}` : '已回到看板';
  };
  mods.forEach((m) => (m.querySelector('.zm').onclick = () => focus(cur === m ? null : m)));
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && cur) { e.preventDefault(); const m = cur; focus(null); m.querySelector('.zm').focus(); } });
  label();
  setTimeout(() => root.host.isConnected && focus(mods[1], true), 700);
}
</script>
