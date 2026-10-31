---
zh: 吸边悬浮球
en: Edge-docked floating button
order: 90
---

## 是什么

页面边上的圆形悬浮按钮（客服、反馈、活动入口），可以拖到任意高度，松手自动贴到较近的左边或右边；滚动页面时缩进屏幕边一半，停下后再滑出来。

## 适合

App 和 H5 里需要随时找得到、又不能长期挡住内容的入口：在线客服、意见反馈、活动入口。

## 不适合

页面的主要操作用固定在底部的按钮或「标签栏正中的主按钮」；桌面网页的客服入口固定在右下角即可，不需要拖动。

## 注意

悬浮球总会挡住一部分内容，页面里还要有一个常规入口（如“我的”页里的“联系客服”）；它的活动范围避开顶栏、底部操作栏和安全区。

## 要点

- 直径 44–48px，圆形带阴影；默认停在右侧、距底约 1/3 屏，记住上次的位置
- 按下后移动超过 6px 才算拖动，否则当作点击；拖动时跟手，不加过渡
- 松手按中心点吸到较近的一侧，距边 12px（再加左右安全区），上下限制在顶栏以下、底栏和底部安全区以上；240ms 缓出，只动 transform
- 页面滚动时向所在一侧缩进半个按钮、不透明度降到 0.6，停止滚动 200ms 后滑回
- 键盘：聚焦后 ←/→ 换到左侧或右侧，↑/↓ 每次移 24px；按钮有明确的名称，如“联系客服”
- 换边和打开时用 role="status" 播报；减少动态效果时直接到位，不做滑动
- 和「视频悬浮小窗」同时出现时分开停靠，互不遮挡

## 提示词

给{H5 / App 页面}加「吸边悬浮球」：{客服}入口做成 48px 圆形按钮，默认在右侧距底约 1/3 屏，记住上次位置；按下移动超过 6px 才算拖动，拖动时跟手；松手按中心点吸到较近的左侧或右侧，距边 12px 并让出安全区，上下不进入顶栏、底栏和底部安全区，240ms 缓出只动 transform；页面滚动时向所在一侧缩进半个按钮、不透明度 0.6，停止滚动 200ms 后滑回；聚焦时 ←/→ 换边、↑/↓ 移 24px，按钮有可读名称；换边和打开用 role="status" 播报；页面里另外保留一个常规入口；减少动态效果时直接到位。

## 示例

<link rel="stylesheet" href="../../_shared/app-scroll-base.css">
<style>
.st{background:#e9ecf1}
.scr{position:relative;height:100%;max-width:400px;margin:0 auto;background:#fff;overflow:hidden}
.hd{display:flex;align-items:center;height:36px;padding:0 14px;border-bottom:1px solid #eef0f3;font-weight:600}
.pg{position:absolute;top:36px;left:0;right:0;bottom:0;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none}
.pg::-webkit-scrollbar{display:none}
.it{display:flex;gap:10px;padding:10px 14px;border-bottom:1px solid #f1f3f6}
.th{flex:none;width:40px;height:40px;border-radius:8px;background:var(--g)}
.tx{flex:1;min-width:0;display:grid;align-content:center;gap:2px}
.tx b{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tx small{color:#5b616e;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fab{position:absolute;left:0;top:0;z-index:2;display:grid;place-items:center;width:44px;height:44px;padding:0;border:0;border-radius:50%;background:#3b5bdb;color:#fff;box-shadow:0 6px 16px rgba(30,40,90,.3);touch-action:none;cursor:grab;transition:transform .24s cubic-bezier(.2,0,0,1),opacity .2s}
.fab.drag{transition:none;cursor:grabbing}
.fab.tuck{opacity:.6}
.fab svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linejoin:round;stroke-linecap:round}
.tst{position:absolute;left:50%;bottom:14px;z-index:3;transform:translateX(-50%);padding:6px 12px;border-radius:999px;background:#1f2329;color:#fff;font-size:12px;white-space:nowrap}
</style>

<div class="st"><div class="scr">
  <div class="hd">附近的话题</div>
  <div class="pg"></div>
  <button type="button" class="fab" aria-label="联系客服（可拖动，←/→ 换边，↑/↓ 移动）"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12.5a7.5 7.5 0 1 1 3.2 6.1L4 19.5l.9-3.4a7.4 7.4 0 0 1-.4-3.6Z"/><path d="M9 11.5h.01M12 11.5h.01M15 11.5h.01"/></svg></button>
  <p class="tst" hidden>客服对话已打开</p>
  <p class="sr" role="status"></p>
</div></div>

<script type="module">
const POSTS = [['周末绕湖骑行，路线和补给点', '86 条回复 · 2 小时前', '#ffd8a8,#ffa94d'], ['第一次做手冲，水温到底多少', '41 条回复 · 3 小时前', '#d3f9d8,#69db7c'], ['阳台番茄种到第 40 天', '57 条回复 · 今天', '#ffe3e3,#ff8787'], ['修好了一台旧胶片机', '23 条回复 · 昨天', '#e5dbff,#9775fa'], ['下班后的半小时慢跑', '64 条回复 · 昨天', '#d0ebff,#4dabf7'], ['两百块改造出租屋的灯', '112 条回复 · 2 天前', '#fff3bf,#ffd43b'], ['小区新开的面包店', '35 条回复 · 3 天前', '#ffe8cc,#ff922b'], ['给猫搭了个纸箱城堡', '208 条回复 · 3 天前', '#f3d9fa,#da77f2'], ['雨天适合听的歌', '19 条回复 · 4 天前', '#c5f6fa,#3bc9db'], ['读完一本很厚的小说', '27 条回复 · 5 天前', '#e9ecef,#adb5bd']];
export default function demo(root) {
  const scr = root.querySelector('.scr'), pg = root.querySelector('.pg'), fab = root.querySelector('.fab'), tst = root.querySelector('.tst'), msg = root.querySelector('.sr');
  pg.innerHTML = POSTS.map(([t, s, g]) => `<div class="it"><i class="th" style="--g:linear-gradient(135deg,${g})"></i><div class="tx"><b>${t}</b><small>${s}</small></div></div>`).join('');
  const S = fab.offsetWidth, M = 12, TOP = 36 + 8, W = scr.clientWidth, H = scr.clientHeight;
  let side = 'r', x = 0, y = 0, tucked = false, drag = null, dragged = false, idle = 0, toast = 0;
  const clampY = (v) => Math.max(TOP, Math.min(H - S - M, v));
  const dockX = () => (side === 'l' ? M : W - S - M);
  // 拖动时跟手；停靠时贴边；滚动时向所在一侧缩进半个按钮
  const render = () => { const tx = drag?.moved ? x : tucked ? (side === 'l' ? -S / 2 : W - S / 2) : dockX(); fab.style.transform = `translate(${tx}px,${y}px)`; fab.classList.toggle('tuck', tucked && !drag?.moved); };
  const say = (t) => { msg.textContent = t; };
  y = clampY(H * 0.62 - S / 2); render();

  pg.addEventListener('scroll', () => { if (drag?.moved) return; tucked = true; render(); clearTimeout(idle); idle = setTimeout(() => { tucked = false; render(); }, 200); }, { passive: true });

  const dock = (to) => { side = to; y = clampY(y); render(); say(`已停靠到${side === 'l' ? '左' : '右'}侧`); };
  fab.addEventListener('pointerdown', (e) => {
    if (e.button) return; stopAuto(); dragged = false; const r = scr.getBoundingClientRect(), f = W / r.width;
    drag = { sx: e.clientX, sy: e.clientY, r, f, ox: (e.clientX - r.left) * f - dockX(), oy: (e.clientY - r.top) * f - y, moved: false };
    try { fab.setPointerCapture(e.pointerId); } catch {}
  });
  fab.addEventListener('pointermove', (e) => {
    if (!drag) return;
    if (!drag.moved) { if (Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) < 6) return; drag.moved = true; tucked = false; fab.classList.add('drag'); }
    const { r, f } = drag; x = Math.max(0, Math.min(W - S, (e.clientX - r.left) * f - drag.ox)); y = Math.max(0, Math.min(H - S, (e.clientY - r.top) * f - drag.oy)); render();
  });
  const end = () => { if (!drag) return; const d = drag; drag = null; dragged = d.moved; fab.classList.remove('drag'); if (d.moved) dock(x + S / 2 < W / 2 ? 'l' : 'r'); };
  fab.addEventListener('pointerup', end); fab.addEventListener('pointercancel', end);
  fab.addEventListener('click', () => {
    if (dragged) { dragged = false; return; }
    tst.hidden = false; say('客服对话已打开'); clearTimeout(toast); toast = setTimeout(() => (tst.hidden = true), 1600);
  });
  fab.addEventListener('keydown', (e) => {
    dragged = false;
    const k = { ArrowLeft: 'l', ArrowRight: 'r' }[e.key];
    if (k) { e.preventDefault(); stopAuto(); side = k; render(); say(`已停靠到${k === 'l' ? '左' : '右'}侧`); }
    else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); stopAuto(); y = clampY(y + (e.key === 'ArrowUp' ? -24 : 24)); render(); }
  });

  // 自动演示：先滚动列表（悬浮球缩进再滑回），再把它拖到左边松手吸边
  let auto = true, raf = 0; const tms = [];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function stopAuto() { if (!auto) return; auto = false; cancelAnimationFrame(raf); tms.forEach(clearTimeout); if (drag && !drag.r) { drag = null; fab.classList.remove('drag'); dock(side); } }
  const tween = (ms, f, done) => { const t0 = performance.now(); const step = (now) => { if (!auto || !root.host.isConnected) return; const k = reduce ? 1 : Math.min(1, (now - t0) / ms); f(1 - (1 - k) ** 3); if (k < 1) raf = requestAnimationFrame(step); else done?.(); }; raf = requestAnimationFrame(step); };
  const at = (ms, f) => tms.push(setTimeout(() => auto && root.host.isConnected && f(), reduce ? 0 : ms));
  at(100, () => tween(350, (e) => { pg.scrollTop = 120 * e; }));
  at(950, () => {
    const x0 = dockX(), y0 = y; drag = { moved: true }; fab.classList.add('drag');
    tween(250, (e) => { x = x0 + (W * 0.3 - x0) * e; y = y0 - 30 * e; render(); }, () => { drag = null; fab.classList.remove('drag'); dock('l'); auto = false; });
  });
  scr.addEventListener('wheel', stopAuto, { passive: true });
  scr.addEventListener('pointerdown', stopAuto);
}
</script>
