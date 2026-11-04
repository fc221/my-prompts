---
zh: 围绕指针缩放的画布
en: Cursor-anchored zoom
order: 10
tab: 画布
---

## 是什么

在画布上按住 Ctrl/⌘ 滚动滚轮或在触控板上双指捏合时，以指针所在的点为中心放大缩小，指针下的那张卡片始终停在指针下；角落有缩放比例、放大、缩小和“适应全部”。

## 适合

白板、流程图、思维导图、平面图、看板这类比屏幕大、既要看全局又要看细节的工作区。

## 不适合

内容一屏放得下的页面不需要；文档阅读交给浏览器自带的缩放和字号设置；地图有现成地图控件时沿用它的手势约定，不要另起一套。

## 注意

锚点是指针，不是画布左上角，也不是视口中心：按左上角缩放时，用户正盯着的东西会滑出视野，只能缩完再拖回来找。

## 要点

- 视图只用三个数描述：平移 x、平移 y、缩放 z，屏幕点 = 世界点 × z + 平移；缩放前先算出指针下的世界点，缩放后反推新的平移，让这个点回到指针下
- 缩放范围夹在 25%–400%（按内容定），滚轮每格约 1.1 倍；触控板捏合的 deltaY 很小，按比例连续缩放，不按“格”取整
- 普通滚轮和双指滑动用来平移，Ctrl/⌘ + 滚轮或捏合才缩放；在空白处按住拖动也能平移
- 角落工具条：“−”“比例”“＋”“适应全部”；点比例数字回到 100%；按钮缩放以视口中心为锚点
- 画布可聚焦：+/− 缩放，0 回到 100%，1 适应全部，方向键平移；比例停止变化后用 role="status" 播报“缩放 120%”
- 缩放时内容按新比例重新绘制，不放大位图；比例低于约 50% 时卡片只留标题和色块，小字不再画
- 滚轮和捏合直接跟手，不加过渡；“适应全部”这类跳转最多 200ms，减少动态效果时直接到位

## 提示词

给{画布}做「围绕指针缩放的画布」：视图用平移 x、y 和缩放 z 描述，屏幕点 = 世界点 × z + 平移；Ctrl/⌘ + 滚轮或触控板捏合时以指针为锚点缩放（先求指针下的世界点，缩放后反推平移让它回到指针下），滚轮每格约 1.1 倍，捏合按 deltaY 连续缩放，范围 {最小比例}–{最大比例}；普通滚轮和双指滑动平移，空白处按住拖动也能平移；右下角工具条放“−”“比例”“＋”“适应全部”，点比例回到 100%，按钮以视口中心缩放；画布可聚焦，+/− 缩放、0 回 100%、1 适应全部、方向键平移，比例停止变化后用 role="status" 播报；比例低于 50% 时卡片只画标题和色块；滚轮和捏合直接跟手不加过渡，按钮跳转 200ms 以内，减少动态效果时直接到位。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{background:#f3f4f7}
.vp{position:absolute;inset:0;overflow:auto;scrollbar-width:none;cursor:grab;touch-action:pan-x pan-y;user-select:none}
.vp::-webkit-scrollbar{display:none}
.sz,.world{transition:none}
.vp.drag{cursor:grabbing}
.vp:focus-visible{outline-offset:-3px}
.sz{position:relative;background-image:radial-gradient(#cfd4dc 1px,transparent 1.4px);background-size:calc(24px * var(--z,1)) calc(24px * var(--z,1));background-position:1200px 1200px}
.world{position:absolute;left:1200px;top:1200px;width:750px;height:420px;transform-origin:0 0}
.ln{position:absolute;border:1px solid #e1e4ea;border-radius:14px;background:rgba(255,255,255,.55)}
.ln h3{margin:0;padding:12px 16px 0;color:#5b616e;font-size:14px;font-weight:600}
.cd{position:absolute;display:flex;flex-direction:column;justify-content:center;gap:3px;padding:0 14px 0 18px;border:1px solid #e3e6eb;border-radius:10px;background:#fff;box-shadow:0 1px 2px rgba(16,24,40,.06);overflow:hidden}
.cd::before{content:"";position:absolute;left:0;top:0;bottom:0;width:5px;background:var(--c)}
.cd b{font-size:15px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cd small{color:#5b616e;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.nt{position:absolute;padding:10px 12px;border-radius:4px;background:#fff3bf;box-shadow:0 2px 6px rgba(16,24,40,.12);color:#5c4813;font-size:12px;line-height:1.45;transform:rotate(-2deg)}
.lod .cd small,.lod .nt span{visibility:hidden}
.lod .cd b{font-size:22px}
.chip{position:absolute;left:10px;top:10px;padding:0 10px;height:26px;border:1px solid #e3e6eb;border-radius:8px;background:#fff;font-size:12px;font-weight:600;line-height:24px;white-space:nowrap;box-shadow:0 1px 2px rgba(16,24,40,.06)}
.tb{position:absolute;right:10px;bottom:10px;display:flex;align-items:center;padding:2px;border:1px solid #e3e6eb;border-radius:10px;background:#fff;box-shadow:0 4px 12px rgba(16,24,40,.1)}
.tb button{min-width:28px;height:28px;padding:0 6px;border:0;border-radius:8px;background:none;color:#1f2329;font-size:13px;font-variant-numeric:tabular-nums}
.tb button:hover{background:#f5f6f8}
.tb .pct{min-width:48px;font-weight:600}
.tb i{width:1px;height:16px;margin:0 2px;background:#e3e6eb}
.cur{position:absolute;left:0;top:0;display:none;width:18px;height:18px;pointer-events:none}
@container (max-width:400px){.chip{display:none}
}
@container (min-width:560px){.chip{left:14px;top:14px}
.tb{right:14px;bottom:14px}
}
</style>

<div class="st"><div class="vp" tabindex="0" role="group" aria-label="画布：新品上线用户旅程。Ctrl 或 ⌘ 加滚轮缩放，拖动平移；聚焦后 + − 缩放，0 回到 100%，1 适应全部，方向键平移"><div class="sz"><div class="world"></div></div></div><span class="chip">新品上线 · 用户旅程</span><div class="tb" role="toolbar" aria-label="缩放"><button type="button" data-z="out" aria-label="缩小">−</button><button type="button" class="pct" data-z="one" aria-label="回到 100%">100%</button><button type="button" data-z="in" aria-label="放大">＋</button><i></i><button type="button" data-z="fit">适应</button></div><svg class="cur" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 1.5l10.5 6.8-4.6.9-2.1 4.6z" fill="#1f2329" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></svg><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const PAD = 1200, W = 750, H = 420, MIN = 0.25, MAX = 4, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const vp = root.querySelector('.vp'), sz = root.querySelector('.sz'), world = root.querySelector('.world'), pct = root.querySelector('.pct'), sr = root.querySelector('.sr'), cur = root.querySelector('.cur');
  const lanes = [['① 了解', '#3b5bdb', [['看到朋友分享', '社交渠道 · 32%'], ['搜到评测文章', '搜索渠道 · 41%'], ['逛门店体验', '线下 · 27%']]], ['② 试用', '#0ca678', [['领 7 天试用', '试用转化 18%'], ['第一次导入数据', '流失最多的一步'], ['邀请同事加入', '平均 2.4 人']]], ['③ 购买', '#f08c00', [['选择套餐', '年付占 63%'], ['填写开票信息', '平均用时 1 分 40 秒'], ['开通成功', '满意度 4.6 / 5']]]];
  world.innerHTML = lanes.map(([t, c, cards], i) => `<section class="ln" style="left:${10 + i * 250}px;top:10px;width:230px;height:400px"><h3>${t}</h3></section>` + cards.map(([b, s], j) => `<div class="cd" style="--c:${c};left:${25 + i * 250}px;top:${50 + j * 92}px;width:200px;height:76px"><b>${b}</b><small>${s}</small></div>`).join('')).join('')
    + '<div class="nt" style="left:300px;top:322px;width:160px"><span>用户反馈：导入时找不到示例文件，不知道表头该怎么写</span></div>';
  let z = 1, said = 0, stop = false;
  const clamp = (v) => Math.max(MIN, Math.min(MAX, v));
  const apply = () => {
    sz.style.width = 2 * PAD + W * z + 'px'; sz.style.height = 2 * PAD + H * z + 'px'; sz.style.setProperty('--z', z);
    world.style.transform = `scale(${z})`; world.classList.toggle('lod', z < 0.5); pct.textContent = Math.round(z * 100) + '%';
    clearTimeout(said); said = setTimeout(() => { sr.textContent = `缩放 ${Math.round(z * 100)}%`; }, 250);
  };
  // 锚点缩放：先求指针下的世界点，缩放后反推滚动位置，让它回到指针下
  const zoomAt = (z2, px, py) => {
    const wx = (vp.scrollLeft + px - PAD) / z, wy = (vp.scrollTop + py - PAD) / z;
    z = clamp(z2); apply(); vp.scrollLeft = wx * z + PAD - px; vp.scrollTop = wy * z + PAD - py;
  };
  const mid = () => [vp.clientWidth / 2, vp.clientHeight / 2];
  const fit = () => {
    const vw = vp.clientWidth, vh = vp.clientHeight; z = clamp(Math.min((vw - 32) / W, (vh - 40) / H)); apply();
    vp.scrollLeft = PAD + (W * z) / 2 - vw / 2; vp.scrollTop = PAD + (H * z) / 2 - vh / 2 + 4;
  };
  const local = (e) => { const r = vp.getBoundingClientRect(), f = vp.clientWidth / r.width; return [(e.clientX - r.left) * f, (e.clientY - r.top) * f]; };
  const user = () => { stop = true; cur.style.display = 'none'; };

  vp.addEventListener('wheel', (e) => {
    if (!(e.ctrlKey || e.metaKey)) { user(); return; } // 普通滚轮交给原生滚动＝平移
    e.preventDefault(); user();
    const dy = e.deltaY * (e.deltaMode === 1 ? 16 : 1);
    zoomAt(z * Math.min(1.1, Math.max(1 / 1.1, Math.exp(-dy * 0.01))), ...local(e));
  }, { passive: false });
  let drag = null;
  vp.addEventListener('pointerdown', (e) => {
    if (e.button || e.pointerType === 'touch') return; user();
    drag = { x: e.clientX, y: e.clientY, l: vp.scrollLeft, t: vp.scrollTop }; vp.classList.add('drag');
    try { vp.setPointerCapture(e.pointerId); } catch {}
  });
  vp.addEventListener('pointermove', (e) => { if (drag) { vp.scrollLeft = drag.l - (e.clientX - drag.x); vp.scrollTop = drag.t - (e.clientY - drag.y); } });
  const end = () => { drag = null; vp.classList.remove('drag'); };
  vp.addEventListener('pointerup', end); vp.addEventListener('pointercancel', end);
  const act = (k) => { user(); if (k === 'in') zoomAt(z * 1.25, ...mid()); else if (k === 'out') zoomAt(z / 1.25, ...mid()); else if (k === 'one') zoomAt(1, ...mid()); else fit(); };
  root.querySelectorAll('[data-z]').forEach((b) => b.addEventListener('click', () => act(b.dataset.z)));
  vp.addEventListener('keydown', (e) => {
    const k = { '+': 'in', '=': 'in', '-': 'out', _: 'out', 0: 'one', 1: 'fit' }[e.key];
    if (k && !e.ctrlKey && !e.metaKey) { e.preventDefault(); act(k); } else if (e.key.startsWith('Arrow')) user(); // 方向键由原生滚动处理
  });

  // 挂载后演示一次：指针停在“第一次导入数据”上，按住 Ctrl 连续滚动放大
  let first = true;
  const ro = new ResizeObserver(() => {
    if (!root.host.isConnected) { ro.disconnect(); return; }
    if (!first) return; first = false; fit();
    const [wx, wy] = [375, 196], px = wx * z + PAD - vp.scrollLeft, py = wy * z + PAD - vp.scrollTop;
    cur.style.display = 'block'; cur.style.transform = `translate(${px - 3}px,${py - 2}px)`;
    const target = Math.min(1.2, z * 1.8), steps = Math.max(1, Math.ceil(Math.log(target / z) / Math.log(1.1)));
    if (still) { setTimeout(() => { if (!stop) zoomAt(target, px, py); }, 300); return; }
    let n = 0;
    setTimeout(() => {
      const t = setInterval(() => {
        if (!root.host.isConnected || stop) { clearInterval(t); return; }
        zoomAt(++n >= steps ? target : z * 1.1, px, py); if (n >= steps) clearInterval(t);
      }, 70);
    }, 400);
  });
  ro.observe(vp);
}
</script>
