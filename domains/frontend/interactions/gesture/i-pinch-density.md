---
zh: 捏合换密度
en: Pinch to change density
order: 140
---

## 是什么

相册、素材这类网格里，双指捏合在三档密度之间切换：大图单列、三列网格、紧凑列表。切换时手指底下那一项留在原处，其余条目从旧位置滑到新位置。桌面用分段按钮、触控板捏合或快捷键做同样的切换。

## 适合

同一批内容需要在“看清一张”和“一屏看全”之间来回切的页面：相册、素材库、商品图墙、作品集管理。

## 不适合

文字为主的列表，用字号设置；卡片、列表、表格这种差别很大的视图切换，用「换视图不丢勾选」里的切换器。

## 注意

只在网格区域内接管双指手势，页面其他地方保留浏览器的缩放；同时一直提供分段按钮这个看得见的入口，捏合只是快捷方式。

## 要点

- 三档：单列大图 / 三列网格 / 列表行（40px 缩略图 + 两行文字）；捏合比例小于约 0.8 变密一档，大于约 1.25 变疏一档，一次手势最多跨一档
- 捏合过程中网格跟着比例轻微缩放（限制在 0.92–1.08）作为跟手反馈，没过阈值就松手则弹回、不切换
- 锚点：两指中点下面的那一项切换后仍在原来的屏幕位置（切换后按它的新位置补偿滚动距离）；用按钮或键盘切换时，以可视区第一项或当前聚焦项为锚点
- 其余条目用 FLIP 从旧位置移到新位置，220–280ms，只动可视区内的条目
- 触控板捏合在浏览器里是带 ctrlKey 的 wheel 事件，在网格上累计 deltaY 过阈值再切换；网格聚焦时 + / − 键也能切换
- 分段按钮用 aria-pressed，切换后用 role="status" 播报“三列网格”；记住用户上次选的档位
- 减少动态效果时直接换档，不做缩放反馈和 FLIP

## 提示词

给{相册 / 素材网格}加「捏合换密度」：三档密度——单列大图、三列网格、列表行（40px 缩略图 + 两行文字）；在网格区域内双指捏合（pointer 事件算两指距离比例），小于 0.8 变密一档、大于 1.25 变疏一档，一次手势最多跨一档，捏合中网格按比例轻微缩放（0.92–1.08）跟手，未过阈值松手弹回；切换时两指中点下的那一项保持在原屏幕位置（换档后补偿滚动距离），其余可视条目用 FLIP 在 250ms 内移到新位置；桌面支持触控板捏合（带 ctrlKey 的 wheel 事件累计过阈值），网格聚焦时 + / − 键切换；工具栏放“大图 / 网格 / 列表”分段按钮（aria-pressed），切换后用 role="status" 播报档位并记住选择；页面其他区域保留浏览器缩放；减少动态效果时直接换档。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:8px 10px}
.app{display:grid;grid-template-rows:auto minmax(0,1fr);height:100%;max-width:440px;margin:0 auto;border:1px solid #e3e6eb;border-radius:12px;background:#fff;overflow:hidden}
.tb{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:5px 6px 5px 12px;border-bottom:1px solid #eef0f3}
.tb b{font-size:13px;white-space:nowrap}
.tb b small{margin-left:4px;color:#5b616e;font-size:11px;font-weight:400}
.seg{display:flex;gap:2px;padding:2px;border-radius:8px;background:#eef0f3}
.seg button{height:26px;padding:0 9px;border:0;border-radius:6px;background:none;color:#5b616e;font-size:12px;white-space:nowrap}
.seg button[aria-pressed="true"]{background:#fff;color:#1f2329;font-weight:600;box-shadow:0 1px 2px rgba(16,24,40,.12)}
.vp{min-height:0;overflow-y:auto;overscroll-behavior:contain;touch-action:pan-y;outline-offset:-2px}
.g{list-style:none;margin:0;padding:8px;display:grid;gap:6px;transform-origin:50% 0}
.g li{min-width:0}
.th{display:block;border-radius:8px;background:var(--c)}
.t b,.t small{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.t b{font-size:12px;font-weight:600}
.t small{color:#5b616e;font-size:11px}
/* 三档密度 */
.d0{grid-template-columns:minmax(0,1fr);gap:10px}
.d0 .th{aspect-ratio:16/9}
.d0 .t{padding:4px 2px 0}
.d1{grid-template-columns:repeat(3,minmax(0,1fr))}
.d1 .th{aspect-ratio:1}
.d1 .t{display:none}
.d2{gap:0;padding-block:4px}
.d2 li{display:flex;align-items:center;gap:10px;padding:4px;border-bottom:1px solid #f1f3f6}
.d2 .th{flex:none;width:40px;height:40px}
.d2 .t{flex:1;min-width:0}
@container (max-width:300px){.tb b small{display:none}
.seg button{padding:0 8px}
}
</style>

<div class="st"><div class="app">
  <div class="tb"><b>相册<small>18 张</small></b><div class="seg" role="group" aria-label="显示密度"><button type="button" aria-pressed="true">大图</button><button type="button" aria-pressed="false">网格</button><button type="button" aria-pressed="false">列表</button></div></div>
  <div class="vp" tabindex="0" role="region" aria-label="照片，双指捏合或按加减号切换密度"><ul class="g d0"></ul></div>
  <p class="sr" role="status"></p>
</div></div>

<script type="module">
const NAMES = ['晨雾湖面', '海盐小镇', '杏仁花开', '苔藓石阶', '暮云山脊', '琥珀街灯', '石墨屋顶', '晴空码头', '珊瑚礁岸', '麦芽田野', '薄荷院子', '砖红长廊', '松针小径', '雪后林场', '灯塔傍晚', '稻田水渠', '渔港清晨', '旧城钟楼'];
const LV = ['大图', '三列网格', '列表'];
export default function demo(root) {
  const g = root.querySelector('.g'), vp = root.querySelector('.vp'), seg = [...root.querySelectorAll('.seg button')], sr = root.querySelector('.sr');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  g.innerHTML = NAMES.map((n, i) => { const h = (i * 47 + 190) % 360; return `<li><span class="th" style="--c:linear-gradient(140deg,hsl(${h} 55% 74%),hsl(${(h + 35) % 360} 45% 50%))"></span><span class="t"><b>${n}</b><small>10 月 ${i + 3} 日 · ${(2 + (i * 7) % 30 / 10).toFixed(1)} MB</small></span></li>`; }).join('');
  let lv = 0, touched = false;
  const inView = () => { const v = vp.getBoundingClientRect(); return [...g.children].filter((li) => { const r = li.getBoundingClientRect(); return r.bottom > v.top && r.top < v.bottom; }); };
  const snap = (li) => { const r = li.getBoundingClientRect(); return { x: r.left, y: r.top, w: li.querySelector('.th').getBoundingClientRect().width }; };

  // 换档：锚点条目留在原屏幕位置，其余可视条目 FLIP 到新位置
  function go(next, anchor) {
    if (next === lv || next < 0 || next > 2) return false;
    anchor ||= inView()[0];
    const a0 = anchor.getBoundingClientRect().top, before = new Map(inView().map((li) => [li, snap(li)]));
    g.className = 'g d' + next; lv = next;
    seg.forEach((b, i) => b.setAttribute('aria-pressed', String(i === next)));
    vp.scrollTop += anchor.getBoundingClientRect().top - a0;
    sr.textContent = LV[next];
    if (still) return true;
    for (const li of inView()) {
      const o = before.get(li), n = snap(li);
      if (!o) { li.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 }); continue; }
      const s = Math.max(0.25, Math.min(4, o.w / n.w));
      li.animate([{ transformOrigin: '0 0', transform: `translate(${o.x - n.x}px,${o.y - n.y}px) scale(${s})` }, { transformOrigin: '0 0', transform: 'none' }], { duration: 250, easing: 'cubic-bezier(.2,0,0,1)' });
    }
    return true;
  }
  const at = (x, y) => root.elementFromPoint(x, y)?.closest('li');

  seg.forEach((b, i) => b.addEventListener('click', () => { touched = true; go(i); }));
  vp.addEventListener('keydown', (e) => {
    if (e.target !== vp) return;
    const d = e.key === '-' ? 1 : e.key === '+' || e.key === '=' ? -1 : 0;
    if (d) { e.preventDefault(); touched = true; go(lv + d); }
  });

  // 双指捏合：只在网格里接管，过阈值才换档，捏合中轻微缩放跟手
  const pts = new Map(); let d0 = 0, mid = null, ratio = 1;
  const dist = () => { const [a, b] = [...pts.values()]; return Math.hypot(a.x - b.x, a.y - b.y); };
  vp.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'touch') return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 2) { touched = true; d0 = dist(); const [a, b] = [...pts.values()]; mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; const r = g.getBoundingClientRect(); g.style.transformOrigin = `${mid.x - r.left}px ${mid.y - r.top}px`; }
  });
  vp.addEventListener('pointermove', (e) => {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 2 && d0) { ratio = dist() / d0; if (!still) g.style.transform = `scale(${Math.max(0.92, Math.min(1.08, ratio))})`; }
  });
  const end = (e) => {
    if (!pts.delete(e.pointerId) || pts.size !== 1 || !d0) return;
    g.style.transform = '';
    const anchor = at(mid.x, mid.y);
    if (ratio < 0.8) go(lv + 1, anchor); else if (ratio > 1.25) go(lv - 1, anchor);
    d0 = 0; ratio = 1;
  };
  vp.addEventListener('pointerup', end); vp.addEventListener('pointercancel', end);

  // 触控板捏合 = 带 ctrlKey 的 wheel
  let acc = 0, accT = 0;
  vp.addEventListener('wheel', (e) => {
    if (!e.ctrlKey) return;
    e.preventDefault(); touched = true; acc += e.deltaY; clearTimeout(accT); accT = setTimeout(() => (acc = 0), 250);
    if (Math.abs(acc) > 40) { const anchor = at(e.clientX, e.clientY); go(lv + Math.sign(acc), anchor); acc = 0; }
  }, { passive: false });

  // 自动演示：从大图捏成网格
  setTimeout(() => !touched && root.host.isConnected && go(1), 700);
}
</script>
