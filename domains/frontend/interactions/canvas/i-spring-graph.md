---
zh: 弹性关系网
en: Spring-linked graph
aka: 力导向图 弹簧连线 物理关系图 节点牵动 force graph
order: 35
---

## 是什么

节点之间的连线是看不见的弹簧：拖动一个节点，相邻节点被一起带走，更远的轻轻晃动；松手后整张网来回摆几下，回到平衡。

## 适合

团队协作关系、知识点地图、角色关系、依赖关系探索这类十几个节点、靠手感理解“谁和谁连着”的页面。

## 不适合

要精确摆放、要导出的流程图用「卡片挪动连线跟着变」；几百个节点用 WebGL 图库配合聚合和缩放；只想看数量关系用图表或表格。

## 注意

物理按固定步长算，把帧间隔累积起来，满一步算一步；直接乘帧间隔或每帧算一次，120Hz 屏幕上会快一倍，掉帧时还可能炸开。网静止后要停掉 requestAnimationFrame。

## 要点

- 模型：连线是弹簧（力 = 系数 × (当前长度 − 静止长度)），静止长度取初始布局里的距离；每个节点再挂一根很弱的弹簧连到自己的原位，网才不会漂走
- 参数起点：60Hz 定步长下，连线系数 0.05、回原位系数 0.012、每步速度 × 0.86；阻尼低于 0.8 像泡在胶水里，高于 0.92 晃个不停
- 推开：两节点靠得比半个身位近时加一点斥力，拖过人群时不叠在一起；几十个节点两两计算就够，上百个再换四叉树
- 拖动：按住位移超过 4px 进入拖动，被拖的节点由指针控制、速度清零，其余节点照常受力；点一下不算拖动，用来选中
- 反馈：线拉得越开越粗越亮，一眼能看出力传到哪里；被牵动的直接邻居描边变强调色
- 选中：点节点或按回车，高亮它和相邻节点，其余淡到约 45%，再点取消；底部写明“连着 N 个：……”
- 松手回到布局原位是默认做法；要让用户自己摆放时，松手把原位改成落点，并给“恢复布局”按钮
- 节点用真实的 button，连线放 SVG 或 canvas；读屏名称写“产品，连到 设计、前端……”，方向键给节点一个速度，推一下就能看到牵动
- 窗口尺寸变化时按比例重算原位和静止长度；最多 60 个节点时直接用 DOM + SVG，再多换 canvas
- 减少动态效果时一次算到平衡，松手直接回到原位，没有来回摆动

## 提示词

做一张{关系网}的「弹性关系网」：{节点列表}是可聚焦的 button，连线画在 SVG 里；每条线是弹簧，静止长度取初始布局距离，力 = 0.05 × (长度 − 静止长度)；每个节点再用 0.012 的弱弹簧连回原位，每步速度 × 0.86；物理用 60Hz 定步长（累积帧间隔，单帧最多算 50ms），静止后停止 requestAnimationFrame；两节点靠得比身位近时加斥力；按住位移超过 4px 开始拖动，被拖节点跟手且不受力，其余节点被牵动，松手后整张网摆动回原位；线越被拉长越粗越亮，直接相邻的节点描边变强调色；点击或回车选中节点，高亮它和相邻节点，其余淡到 45%，底部写“连着 N 个：名称列表”，用 role="status" 播报；方向键给聚焦节点一个速度；窗口变化时按比例重算；节点的读屏名称写清连到谁；减少动态效果时一次算到平衡、没有回弹。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(0,1fr) auto;background:#f3f4f7}
.bd{position:relative;overflow:hidden;background-image:radial-gradient(#d4d8e0 1px,transparent 1.4px);background-size:18px 18px;touch-action:none;user-select:none;-webkit-user-select:none}
svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
line{stroke-linecap:round}
line.dim{opacity:.28}
.nd{position:absolute;left:0;top:0;display:flex;align-items:center;gap:5px;height:28px;padding:0 10px 0 8px;border:1px solid #d5d9e0;border-radius:14px;background:#fff;color:#1f2329;font-size:12px;font-weight:600;white-space:nowrap;box-shadow:0 1px 2px rgba(16,24,40,.1);cursor:grab;will-change:transform;transition:background-color .12s,border-color .12s,color .12s,opacity .12s}
.nd i{flex:none;width:7px;height:7px;border-radius:50%;background:var(--c)}
.nd.tug{border-color:#3b5bdb}
.nd.on{border-color:#3b5bdb;background:#3b5bdb;color:#fff}
.nd.on i{background:#fff}
.nd.dim{opacity:.45}
.nd.drag{cursor:grabbing;box-shadow:0 6px 14px -4px rgba(16,24,40,.35)}
.ft{display:flex;align-items:center;height:28px;padding:0 12px;border-top:1px solid #e3e6eb;background:#fff}
.msg{margin:0;min-width:0;overflow:hidden;color:#5b616e;font-size:12px;white-space:nowrap;text-overflow:ellipsis}
@container (min-width:560px){.nd{height:32px;padding:0 13px 0 10px;border-radius:16px;font-size:13px}
.ft{height:32px;padding:0 16px}
}
</style>

<div class="st"><div class="bd" role="group" aria-label="团队协作关系网：拖动节点或按方向键推一下，相连的节点会被牵动；回车查看它连着谁"><svg aria-hidden="true"></svg></div><div class="ft"><p class="msg" role="status">拖动任一节点，相连的节点会被牵动</p></div></div>

<script type="module">
export default function demo(root) {
  const N = [['产品', '#3b5bdb', 0.5, 0.48], ['设计', '#d6409f', 0.2, 0.16], ['前端', '#0ca678', 0.78, 0.15], ['后端', '#0ca678', 0.91, 0.62], ['测试', '#f08c00', 0.66, 0.88], ['运营', '#7a5af8', 0.1, 0.66], ['客服', '#7a5af8', 0.32, 0.88]];
  const E = [[0, 1], [0, 2], [0, 3], [0, 5], [1, 2], [2, 3], [3, 4], [4, 6], [5, 6], [0, 4]];
  const K = 0.05, HOME = 0.012, DAMP = 0.86, STEP = 1000 / 60; // 物理常数按 60Hz 定步长算，换高刷屏手感不变
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bd = root.querySelector('.bd'), svg = root.querySelector('svg'), msg = root.querySelector('.msg');
  svg.innerHTML = E.map(() => '<line/>').join('');
  const ls = [...svg.children];
  const nodes = N.map(([t, c, fx, fy], id) => {
    const el = document.createElement('button'), near = E.flatMap(([a, b]) => (a === id ? [b] : b === id ? [a] : []));
    el.type = 'button'; el.className = 'nd'; el.style.setProperty('--c', c); el.innerHTML = `<i></i>${t}`; el.setAttribute('aria-label', `${t}，连到 ${near.map((i) => N[i][0]).join('、')}`); bd.append(el);
    return { id, t, el, near, fx, fy, x: 0, y: 0, hx: 0, hy: 0, vx: 0, vy: 0, w: 0, h: 0 };
  });
  let W = 0, H = 0, rest = [], held = null, sel = -1, raf = 0, last = 0, acc = 0, auto = [], drag = null;
  const clampN = (n) => {
    const x = Math.max(n.w / 2 + 2, Math.min(W - n.w / 2 - 2, n.x)), y = Math.max(n.h / 2 + 2, Math.min(H - n.h / 2 - 2, n.y));
    if (x !== n.x) n.vx = 0; if (y !== n.y) n.vy = 0; n.x = x; n.y = y;
  };
  const step = () => {
    const fx = nodes.map(() => 0), fy = nodes.map(() => 0);
    E.forEach(([a, b], i) => { // 连线是弹簧：拉长或压短都有回复力
      const A = nodes[a], B = nodes[b], dx = B.x - A.x, dy = B.y - A.y, len = Math.hypot(dx, dy) || 1, f = K * (len - rest[i]) / len;
      fx[a] += f * dx; fy[a] += f * dy; fx[b] -= f * dx; fy[b] -= f * dy;
    });
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) { // 靠太近互相推开，节点不叠在一起
      const A = nodes[i], B = nodes[j], dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy) || 1, m = (A.w + B.w) / 2 + 4; if (d >= m) continue;
      const f = 0.08 * (m - d) / d; fx[i] -= f * dx; fy[i] -= f * dy; fx[j] += f * dx; fy[j] += f * dy;
    }
    nodes.forEach((n, i) => {
      if (n === held) { n.vx = n.vy = 0; return; }
      n.vx = (n.vx + fx[i] + (n.hx - n.x) * HOME) * DAMP; n.vy = (n.vy + fy[i] + (n.hy - n.y) * HOME) * DAMP; n.x += n.vx; n.y += n.vy; clampN(n);
    });
  };
  const paint = () => {
    const hi = sel >= 0 ? [sel, ...nodes[sel].near] : null, tug = held ? held.near : [];
    nodes.forEach((n) => {
      n.el.style.transform = `translate(${(n.x - n.w / 2).toFixed(2)}px,${(n.y - n.h / 2).toFixed(2)}px)`;
      n.el.classList.toggle('on', n.id === sel || n === held); n.el.classList.toggle('tug', tug.includes(n.id)); n.el.classList.toggle('dim', !!hi && !hi.includes(n.id));
    });
    E.forEach(([a, b], i) => {
      const A = nodes[a], B = nodes[b], l = ls[i], len = Math.hypot(B.x - A.x, B.y - A.y), s = Math.min(1, Math.abs(len - rest[i]) / (rest[i] || 1) * 2.4); // 拉得越开线越粗越亮
      l.setAttribute('x1', A.x); l.setAttribute('y1', A.y); l.setAttribute('x2', B.x); l.setAttribute('y2', B.y);
      l.style.stroke = `rgb(${[176, 182, 194].map((c, k) => Math.round(c + ([59, 91, 219][k] - c) * s)).join()})`; l.style.strokeWidth = 1.5 + s * 1.6;
      l.classList.toggle('dim', !!hi && a !== sel && b !== sel);
    });
  };
  const moving = () => held || nodes.some((n) => Math.abs(n.vx) + Math.abs(n.vy) > 0.02 || Math.hypot(n.x - n.hx, n.y - n.hy) > 0.3);
  const tick = (t) => {
    raf = 0; if (!root.host.isConnected) return;
    acc += Math.min(t - last, 50); last = t;
    while (acc >= STEP) { step(); acc -= STEP; }
    if (moving()) raf = requestAnimationFrame(tick);
    else nodes.forEach((n) => { n.x = n.hx; n.y = n.hy; n.vx = n.vy = 0; });
    paint();
  };
  const kick = () => {
    if (still) { // 减少动态效果：一次算到平衡，没有回弹
      for (let i = 0; i < 90; i++) { step(); nodes.forEach((n) => { n.vx *= 0.6; n.vy *= 0.6; }); }
      if (!held) nodes.forEach((n) => { n.x = n.hx; n.y = n.hy; n.vx = n.vy = 0; });
      return paint();
    }
    if (!raf) { last = performance.now(); acc = 0; raf = requestAnimationFrame(tick); }
  };
  const pick = (id) => {
    sel = sel === id ? -1 : id; paint();
    msg.textContent = sel < 0 ? '拖动任一节点，相连的节点会被牵动' : `${nodes[sel].t}连着 ${nodes[sel].near.length} 个：${nodes[sel].near.map((i) => nodes[i].t).join('、')}`;
  };
  const stopAuto = () => { auto.forEach(clearTimeout); auto = []; if (held) { held.el.classList.remove('drag'); held = null; } };
  const local = (e) => { const r = bd.getBoundingClientRect(), f = bd.clientWidth / r.width; return [(e.clientX - r.left) * f, (e.clientY - r.top) * f]; };
  nodes.forEach((n) => {
    n.el.addEventListener('pointerdown', (e) => {
      if (e.button) return; stopAuto(); const [x, y] = local(e);
      drag = { n, dx: x - n.x, dy: y - n.y, x0: x, y0: y, moved: false }; try { n.el.setPointerCapture(e.pointerId); } catch {}
    });
    n.el.addEventListener('pointermove', (e) => {
      if (drag?.n !== n) return; const [x, y] = local(e);
      if (!drag.moved) { if (Math.hypot(x - drag.x0, y - drag.y0) < 4) return; drag.moved = true; held = n; n.el.classList.add('drag'); }
      n.x = x - drag.dx; n.y = y - drag.dy; clampN(n); kick();
    });
    const end = () => { if (drag?.n !== n) return; const m = drag.moved; drag = null; if (!m) return; held = null; n.el.classList.remove('drag'); n.skip = performance.now(); msg.textContent = `松手了，「${n.t}」和相连的 ${n.near.length} 个节点回到原位`; kick(); };
    n.el.addEventListener('pointerup', end); n.el.addEventListener('pointercancel', end);
    n.el.addEventListener('click', () => { if (performance.now() - n.skip < 300) return; stopAuto(); pick(n.id); });
    n.el.addEventListener('keydown', (e) => {
      const dx = { ArrowLeft: -1, ArrowRight: 1 }[e.key] || 0, dy = { ArrowUp: -1, ArrowDown: 1 }[e.key] || 0;
      if (!dx && !dy) return; e.preventDefault(); stopAuto(); n.vx += dx * 7; n.vy += dy * 7; msg.textContent = `推了一下「${n.t}」，牵动 ${n.near.map((i) => nodes[i].t).join('、')}`; kick();
    });
  });
  const layout = () => {
    W = bd.clientWidth; H = bd.clientHeight; if (!W || !H) return;
    nodes.forEach((n) => { n.w = n.el.offsetWidth; n.h = n.el.offsetHeight; n.hx = n.x = n.w / 2 + 6 + n.fx * (W - n.w - 12); n.hy = n.y = n.h / 2 + 6 + n.fy * (H - n.h - 12); n.vx = n.vy = 0; });
    rest = E.map(([a, b]) => Math.hypot(nodes[a].hx - nodes[b].hx, nodes[a].hy - nodes[b].hy)); paint();
  };
  // 自动演示：把中间的“产品”拖向右上，放开后整张网回稳，再选中它看关系
  const play = () => {
    const n = nodes[0], x0 = n.x, y0 = n.y, tx = n.x + W * 0.2, ty = n.y + H * 0.26;
    auto.push(setTimeout(() => { held = n; n.el.classList.add('drag'); if (still) { held = null; n.el.classList.remove('drag'); pick(0); return; } kick(); }, 300));
    for (let i = 1; i <= 14 && !still; i++) auto.push(setTimeout(() => { if (held !== n || !root.host.isConnected) return; const p = i / 14, e = p * p * (3 - 2 * p); n.x = x0 + (tx - x0) * e; n.y = y0 + (ty - y0) * e; }, 300 + i * 28));
    if (still) return;
    auto.push(setTimeout(() => { if (held !== n) return; held = null; n.el.classList.remove('drag'); kick(); }, 1250));
    auto.push(setTimeout(() => { if (root.host.isConnected && sel < 0) pick(0); }, 2500));
  };
  let first = true;
  const ro = new ResizeObserver(() => { if (!root.host.isConnected) { ro.disconnect(); return; } layout(); if (first && W) { first = false; play(); } });
  ro.observe(bd);
}
</script>
