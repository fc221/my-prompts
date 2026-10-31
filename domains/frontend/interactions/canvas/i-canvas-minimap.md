---
zh: 小地图跳转
en: Minimap jump
order: 50
---

## 是什么

画布角落放一张缩小的全局图，所有内容画成小色块，当前看到的范围是一个框；点小地图上任意位置，画布就跳过去，拖动这个框可以实时平移。

## 适合

内容远大于屏幕的白板、流程图、平面图或关卡编辑器、很长的时间线，用户容易“迷路”、要在几块区域之间来回跳的场景。

## 不适合

内容只比一屏多一点时，“适应全部”按钮就够了；文档类内容用目录或大纲导航；小屏上小地图会挡住内容，默认收起。

## 注意

小地图和主画布读写同一份视图状态：主画布平移时框跟着动，拖框时主画布跟着动；只有一个数据源，不要让两边互相监听、来回触发。

## 要点

- 小地图的范围取所有内容的包围盒并留 5%–10% 边距，按长边等比缩放，不拉伸
- 视口框的位置和大小由主画布当前的平移和缩放换算；框外加一层淡灰遮罩，一眼看出“我在哪”
- 点小地图：以点到的位置为中心跳转，用约 200ms 缓动；按住视口框拖动：主画布实时跟随，不加过渡
- 小地图宽 96–200px（随画布大小），贴右下角，可收起成一个按钮；增删内容、窗口尺寸变化后重算
- 小地图可聚焦，方向键按视口的四分之一移动；跳转后用 role="status" 播报“已移到 预算 区域”
- 减少动态效果时点击直接跳到位

## 提示词

给{画布}加「小地图跳转」：右下角放一张宽 {小地图宽度}px 的小地图，范围是所有{内容}的包围盒加 8% 边距，等比缩放，内容画成小色块；当前视口画成一个框，框外加淡灰遮罩，位置和大小由主画布的平移和缩放换算；点小地图以该点为中心跳转（200ms 缓动），按住视口框拖动时主画布实时跟随；主画布和小地图共用一份视图状态，不互相监听；小地图可收起，内容或窗口变化时重算；小地图可聚焦，方向键按视口四分之一移动，跳转后用 role="status" 播报当前区域；减少动态效果时直接跳到位。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{background:#f3f4f7}
.vp{position:absolute;inset:0;overflow:auto;scrollbar-width:none;cursor:grab;user-select:none}
.vp::-webkit-scrollbar{display:none}
.vp.drag{cursor:grabbing}
.vp:focus-visible{outline-offset:-3px}
.world{position:relative;width:820px;height:500px;background-image:radial-gradient(#cfd4dc 1px,transparent 1.4px);background-size:20px 20px}
.zn{position:absolute;width:220px;height:140px;padding:10px 12px;border:1px solid color-mix(in srgb,var(--c) 30%,#fff);border-radius:12px;background:color-mix(in srgb,var(--c) 7%,#fff)}
.zn h3{margin:0 0 8px;color:var(--c);font-size:13px}
.zn ul{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:0;padding:0;list-style:none}
.zn li{height:36px;padding:0 8px;border-radius:6px;background:#fff;box-shadow:0 1px 2px rgba(16,24,40,.08);font-size:12px;line-height:36px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mm{position:absolute;right:8px;bottom:8px;width:96px;aspect-ratio:820/500;border:1px solid #d5d9e0;border-radius:6px;background:#fff;box-shadow:0 4px 12px rgba(16,24,40,.14);overflow:hidden;cursor:pointer;touch-action:none}
.mm:focus-visible{outline-offset:2px}
.mm b{position:absolute;border-radius:2px;background:color-mix(in srgb,var(--c) 45%,#fff)}
.vw{position:absolute;border:1.5px solid #1f2329;border-radius:2px;box-shadow:0 0 0 999px rgba(31,35,41,.12);cursor:grab}
.vw{transition:none}
.cur{position:absolute;left:0;top:0;display:none;width:16px;height:16px;pointer-events:none;transition:transform .4s cubic-bezier(.3,.7,.3,1)}
@container (min-width:560px){.mm{width:160px;right:12px;bottom:12px}
}
</style>

<div class="st"><div class="vp" tabindex="0" role="group" aria-label="年会筹备白板，拖动或滚动平移"><div class="world"></div></div><div class="mm" tabindex="0" role="group" aria-label="小地图：点击跳转，拖动视野框平移，方向键移动视野"><i class="vw"></i></div><svg class="cur" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 1.5l10.5 6.8-4.6.9-2.1 4.6z" fill="#1f2329" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></svg><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const W = 820, H = 500, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const Z = [['节目', '#d6336c', 30, 30, ['开场舞', '抽奖环节', '乐队返场']], ['场地', '#3b5bdb', 300, 20, ['宴会厅 A', '签到台', '灯光音响']], ['物料', '#e8590c', 570, 60, ['胸牌', '背景板', '伴手礼']], ['嘉宾', '#0ca678', 110, 300, ['名单确认', '接送安排', '座次表']], ['预算', '#7048e8', 470, 320, ['场地 4.2 万', '餐饮 3.6 万', '礼品 1.5 万']]];
  const st = root.querySelector('.st'), vp = root.querySelector('.vp'), world = root.querySelector('.world'), mm = root.querySelector('.mm'), vw = root.querySelector('.vw'), sr = root.querySelector('.sr'), cur = root.querySelector('.cur');
  world.innerHTML = Z.map(([n, c, x, y, items]) => `<section class="zn" style="--c:${c};left:${x}px;top:${y}px"><h3>${n}</h3><ul>${items.map((t) => `<li>${t}</li>`).join('')}</ul></section>`).join('');
  // 小地图用百分比画，和世界坐标等比，不随尺寸重算
  const pc = (v, t) => (v / t) * 100 + '%';
  mm.insertAdjacentHTML('afterbegin', Z.map(([, c, x, y]) => `<b style="--c:${c};left:${pc(x, W)};top:${pc(y, H)};width:${pc(220, W)};height:${pc(140, H)}"></b>`).join(''));
  let stop = false, raf = 0;
  // 唯一的视图状态就是主画布的滚动位置；视口框只读它
  const frame = () => { vw.style.cssText = `left:${pc(vp.scrollLeft, W)};top:${pc(vp.scrollTop, H)};width:${pc(Math.min(W, vp.clientWidth), W)};height:${pc(Math.min(H, vp.clientHeight), H)}`; };
  vp.addEventListener('scroll', frame, { passive: true });
  const seen = (z) => Math.max(0, Math.min(z[2] + 220, vp.scrollLeft + vp.clientWidth) - Math.max(z[2], vp.scrollLeft)) * Math.max(0, Math.min(z[3] + 140, vp.scrollTop + vp.clientHeight) - Math.max(z[3], vp.scrollTop));
  const where = () => Z.reduce((a, z) => (seen(z) > seen(a) ? z : a))[0]; // 视野里露出面积最大的区域
  const jump = (wx, wy) => { // 以 (wx, wy) 为中心跳转
    cancelAnimationFrame(raf);
    const l0 = vp.scrollLeft, t0 = vp.scrollTop, l1 = Math.max(0, Math.min(W - vp.clientWidth, wx - vp.clientWidth / 2)), t1 = Math.max(0, Math.min(H - vp.clientHeight, wy - vp.clientHeight / 2));
    const done = () => { sr.textContent = `已移到 ${where()} 区域`; };
    if (still) { vp.scrollLeft = l1; vp.scrollTop = t1; frame(); done(); return; }
    const s = performance.now();
    const step = (t) => {
      if (!root.host.isConnected) return;
      const p = Math.min(1, (t - s) / 220), e = 1 - (1 - p) ** 3; vp.scrollLeft = l0 + (l1 - l0) * e; vp.scrollTop = t0 + (t1 - t0) * e; frame();
      if (p < 1) raf = requestAnimationFrame(step); else done();
    };
    raf = requestAnimationFrame(step);
  };
  const mmPoint = (e) => { const r = mm.getBoundingClientRect(); return [((e.clientX - r.left) / r.width) * W, ((e.clientY - r.top) / r.height) * H]; };
  const user = () => { stop = true; cur.style.display = 'none'; };
  let mdrag = null;
  mm.addEventListener('pointerdown', (e) => {
    if (e.button) return; user(); e.preventDefault(); mm.focus({ preventScroll: true });
    const [wx, wy] = mmPoint(e);
    if (e.target === vw) { cancelAnimationFrame(raf); mdrag = { ox: wx - vp.scrollLeft, oy: wy - vp.scrollTop }; try { mm.setPointerCapture(e.pointerId); } catch {} }
    else jump(wx, wy);
  });
  mm.addEventListener('pointermove', (e) => { if (!mdrag) return; const [wx, wy] = mmPoint(e); vp.scrollLeft = wx - mdrag.ox; vp.scrollTop = wy - mdrag.oy; frame(); }); // 拖框实时跟随
  ['pointerup', 'pointercancel'].forEach((t) => mm.addEventListener(t, () => { if (mdrag) { mdrag = null; sr.textContent = `已移到 ${where()} 区域`; } }));
  mm.addEventListener('keydown', (e) => {
    const dx = { ArrowLeft: -1, ArrowRight: 1 }[e.key] || 0, dy = { ArrowUp: -1, ArrowDown: 1 }[e.key] || 0;
    if (!dx && !dy) return; e.preventDefault(); user();
    jump(vp.scrollLeft + vp.clientWidth / 2 + (dx * vp.clientWidth) / 4, vp.scrollTop + vp.clientHeight / 2 + (dy * vp.clientHeight) / 4);
  });
  let drag = null;
  vp.addEventListener('pointerdown', (e) => { if (e.button || e.pointerType === 'touch') return; user(); cancelAnimationFrame(raf); drag = { x: e.clientX, y: e.clientY, l: vp.scrollLeft, t: vp.scrollTop }; vp.classList.add('drag'); try { vp.setPointerCapture(e.pointerId); } catch {} });
  vp.addEventListener('pointermove', (e) => { if (drag) { vp.scrollLeft = drag.l - (e.clientX - drag.x); vp.scrollTop = drag.t - (e.clientY - drag.y); } });
  ['pointerup', 'pointercancel'].forEach((t) => vp.addEventListener(t, () => { drag = null; vp.classList.remove('drag'); }));
  vp.addEventListener('wheel', user, { passive: true });

  // 挂载后演示一次：在小地图上点“预算”区域，主画布跳过去
  let first = true;
  const ro = new ResizeObserver(() => {
    if (!root.host.isConnected) { ro.disconnect(); return; }
    frame(); if (!first) return; first = false;
    setTimeout(() => {
      if (stop || !root.host.isConnected) return;
      const s = st.getBoundingClientRect(), m = mm.getBoundingClientRect(), k = m.width / W, tx = m.left - s.left + (470 + 110) * k, ty = m.top - s.top + (320 + 70) * k;
      cur.style.transform = `translate(${tx - 50}px,${ty - 40}px)`; cur.style.display = 'block'; void cur.offsetWidth; cur.style.transform = `translate(${tx - 2}px,${ty - 1}px)`;
      setTimeout(() => { if (!stop && root.host.isConnected) jump(470 + 110, 320 + 70); }, still ? 0 : 450);
    }, 400);
  });
  ro.observe(vp);
}
</script>
