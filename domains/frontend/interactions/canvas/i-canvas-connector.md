---
zh: 卡片挪动连线跟着变
en: Sticky connectors
order: 30
---

## 是什么

卡片之间的箭头连线绑在卡片上：拖动任何一张卡时连线实时重算，自动挑离对方最近的那条边接上，走带圆角的折线，箭头始终指向目标卡片。

## 适合

流程图、用户旅程、系统架构图、状态机、组织关系图，节点关系要随着布局调整一直保持正确的画布。

## 不适合

关系固定不变的示意图直接画成静态 SVG；节点上百、关系很密时改用自动布局的关系图，不让用户手动摆每一张卡。

## 注意

连线只存“从哪张卡到哪张卡”，端点每次从卡片当前的位置和尺寸算出来；把端点坐标存死的话，卡片一挪，线还断在原地。

## 要点

- 每条线存起点卡片 id、终点卡片 id（需要时加上接哪条边），渲染时从卡片几何实时算端点
- 端点按两卡的相对位置选边：水平间距大于垂直间距时接左右边中点，否则接上下边中点；两卡重叠时先不画线
- 路径用直角折线，中段放在两卡之间的中线上，拐角圆角 6–8px；线宽 1.5–2px，终点带箭头，离卡片边留约 3px
- 拖动卡片时连线和卡片同一帧更新，不加过渡；松手后只保存一次新位置
- 拖动或聚焦某张卡时，和它相连的线换成强调色，其他线保持灰色
- 卡片可聚焦，方向键每次移 8px，Shift+方向键移 40px；每张卡给读屏写明“连到：签约”这类关系
- 删除卡片时一并删掉它的连线，并提示“同时删除了 2 条连线 · 撤销”

## 提示词

给{画布}的连线做「卡片挪动连线跟着变」：每条连线只存起点和终点的{节点} id，端点在每次渲染时从节点当前位置和尺寸算出；水平间距大于垂直间距时连左右边中点，否则连上下边中点，两节点重叠时不画线；路径用直角折线，中段在两节点之间的中线上，拐角圆角 6px，终点带箭头，离节点边 3px；拖动节点时连线同帧重算、不加过渡，松手后保存一次位置；拖动或聚焦的节点相连的线高亮；节点可聚焦，方向键移 8px、Shift+方向键移 40px，移动后用 role="status" 播报；每个节点给读屏写明连到哪些节点；删除节点时一并删除它的连线并提示数量，可撤销。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(0,1fr) auto;background:#f3f4f7}
.bd{--nw:84px;--nh:30px}
.bd{position:relative;overflow:hidden;background-image:radial-gradient(#cfd4dc 1px,transparent 1.4px);background-size:20px 20px;touch-action:none;user-select:none}
svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.e{fill:none;stroke:#9aa1ad;stroke-width:1.6}
.a{fill:#9aa1ad}
.hot .e{stroke:#3b5bdb;stroke-width:2}
.hot .a{fill:#3b5bdb}
.nd{position:absolute;left:0;top:0;display:flex;align-items:center;gap:6px;width:var(--nw);height:var(--nh);padding:0 8px;border:1px solid #d5d9e0;border-radius:8px;background:#fff;box-shadow:0 1px 2px rgba(16,24,40,.08);color:#1f2329;font-size:12px;font-weight:600;white-space:nowrap;cursor:grab}
.nd i{flex:none;width:7px;height:7px;border-radius:50%;background:var(--c)}
.nd span{min-width:0;overflow:hidden;text-overflow:ellipsis}
.nd{transition:none}
.nd.on{border-color:#3b5bdb;box-shadow:0 0 0 3px rgba(59,91,219,.16),0 4px 10px rgba(16,24,40,.12)}
.nd.drag{cursor:grabbing}
.ft{display:flex;align-items:center;height:28px;padding:0 12px;border-top:1px solid #e3e6eb;background:#fff}
.msg{margin:0;min-width:0;color:#5b616e;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cur{position:absolute;left:0;top:0;z-index:3;display:none;width:16px;height:16px;pointer-events:none;transition:transform .35s cubic-bezier(.3,.7,.3,1)}
.cur.quick{transition:none}
@container (min-width:560px){.bd{--nw:112px;--nh:38px}
.nd{padding:0 12px;font-size:13px}
.ft{height:32px;padding:0 16px}
}
</style>

<div class="st"><div class="bd" role="group" aria-label="租客跟进流程图：拖动或用方向键移动节点，连线会跟着重算"><svg aria-hidden="true"></svg><svg class="cur" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 1.5l10.5 6.8-4.6.9-2.1 4.6z" fill="#1f2329" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></svg></div><div class="ft"><p class="msg" role="status">拖动任一节点，连线会跟着换边重算</p></div></div>

<script type="module">
export default function demo(root) {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bd = root.querySelector('.bd'), svg = root.querySelector('svg'), msg = root.querySelector('.msg'), cur = root.querySelector('.cur');
  const N = [['提交意向', '#3b5bdb', 0, 0.08], ['电话回访', '#3b5bdb', 0.5, 0.08], ['预约带看', '#f08c00', 1, 0.08], ['签约', '#0ca678', 1, 0.96], ['暂不考虑', '#8a909c', 0, 0.96]];
  const E = [[0, 1], [1, 2], [2, 3], [1, 4]]; // 连线只存起点、终点 id
  const nodes = N.map(([t, c, fx, fy], id) => {
    const el = document.createElement('button'); el.type = 'button'; el.className = 'nd'; el.style.setProperty('--c', c); el.innerHTML = `<i></i><span>${t}</span>`;
    const to = E.filter(([a, b]) => a === id || b === id).map(([a, b]) => N[a === id ? b : a][0]);
    el.setAttribute('aria-label', `${t}，连到：${to.join('、')}。方向键移动`); bd.insertBefore(el, cur); return { id, el, t, fx, fy, x: 0, y: 0 };
  });
  const NS = 'http://www.w3.org/2000/svg';
  let bw = 0, bh = 0, nw = 0, nh = 0, act = -1, stop = false, said = 0;
  const unit = (p, q) => { const l = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1; return [(q[0] - p[0]) / l, (q[1] - p[1]) / l]; };
  const rounded = (p, r) => { // 折线拐角做圆角
    let d = `M${p[0][0]} ${p[0][1]}`;
    for (let i = 1; i < p.length - 1; i++) {
      const [a, b, c] = [p[i - 1], p[i], p[i + 1]], k = Math.min(r, Math.hypot(b[0] - a[0], b[1] - a[1]) / 2, Math.hypot(c[0] - b[0], c[1] - b[1]) / 2), u = unit(b, a), v = unit(b, c);
      d += `L${b[0] + u[0] * k} ${b[1] + u[1] * k}Q${b[0]} ${b[1]} ${b[0] + v[0] * k} ${b[1] + v[1] * k}`;
    }
    return d + `L${p.at(-1)[0]} ${p.at(-1)[1]}`;
  };
  // 端点每次从节点当前几何算：水平间距大就接左右边，否则接上下边
  const route = (A, B) => {
    const G = 3, hg = Math.max(B.x - A.x - nw, A.x - B.x - nw), vg = Math.max(B.y - A.y - nh, A.y - B.y - nh);
    if (hg <= 0 && vg <= 0) return null;
    if (hg >= vg) {
      const s = B.x > A.x ? 1 : -1, sx = A.x + nw / 2 + s * (nw / 2 + G), ex = B.x + nw / 2 - s * (nw / 2 + G), sy = A.y + nh / 2, ey = Math.abs(B.y - A.y) < 2 ? sy : B.y + nh / 2, m = (sx + ex) / 2;
      return { d: rounded(sy === ey ? [[sx, sy], [ex, ey]] : [[sx, sy], [m, sy], [m, ey], [ex, ey]], 7), a: `M${ex} ${ey}l${-7 * s} -4v8z` };
    }
    const s = B.y > A.y ? 1 : -1, sy = A.y + nh / 2 + s * (nh / 2 + G), ey = B.y + nh / 2 - s * (nh / 2 + G), sx = A.x + nw / 2, ex = Math.abs(B.x - A.x) < 2 ? sx : B.x + nw / 2, m = (sy + ey) / 2;
    return { d: rounded(sx === ex ? [[sx, sy], [ex, ey]] : [[sx, sy], [sx, m], [ex, m], [ex, ey]], 7), a: `M${ex} ${ey}l-4 ${-7 * s}h8z` };
  };
  const render = () => {
    nodes.forEach((n) => { n.el.style.transform = `translate(${n.x}px,${n.y}px)`; n.el.classList.toggle('on', n.id === act); });
    svg.replaceChildren();
    E.forEach(([a, b]) => {
      const r = route(nodes[a], nodes[b]); if (!r) return;
      const g = document.createElementNS(NS, 'g'); if (a === act || b === act) g.setAttribute('class', 'hot');
      g.innerHTML = `<path class="e" d="${r.d}"/><path class="a" d="${r.a}"/>`; act >= 0 && (a === act || b === act) ? svg.append(g) : svg.prepend(g);
    });
  };
  const place = (n, x, y) => { n.x = Math.max(0, Math.min(bw - nw, x)); n.y = Math.max(0, Math.min(bh - nh, y)); render(); };
  const lines = (n) => E.filter(([a, b]) => a === n.id || b === n.id).length;
  const local = (e) => { const r = bd.getBoundingClientRect(), f = bd.clientWidth / r.width; return [(e.clientX - r.left) * f, (e.clientY - r.top) * f]; };
  let drag = null;
  nodes.forEach((n) => {
    n.el.addEventListener('pointerdown', (e) => { if (e.button) return; stop = true; cur.style.display = 'none'; const [x, y] = local(e); drag = { n, dx: x - n.x, dy: y - n.y }; act = n.id; n.el.classList.add('drag'); try { n.el.setPointerCapture(e.pointerId); } catch {} render(); });
    n.el.addEventListener('pointermove', (e) => { if (drag?.n === n) { const [x, y] = local(e); place(n, x - drag.dx, y - drag.dy); } }); // 同帧重算，不加过渡
    const end = () => { if (drag?.n !== n) return; drag = null; n.el.classList.remove('drag'); if (root.activeElement !== n.el) act = -1; render(); msg.textContent = `「${n.t}」已移动，${lines(n)} 条连线已重算`; };
    n.el.addEventListener('pointerup', end); n.el.addEventListener('pointercancel', end);
    n.el.addEventListener('focus', () => { act = n.id; render(); });
    n.el.addEventListener('blur', () => { if (!drag) { act = -1; render(); } });
    n.el.addEventListener('keydown', (e) => {
      const s = e.shiftKey ? 40 : 8, dx = { ArrowLeft: -s, ArrowRight: s }[e.key] || 0, dy = { ArrowUp: -s, ArrowDown: s }[e.key] || 0;
      if (!dx && !dy) return; e.preventDefault(); stop = true; place(n, n.x + dx, n.y + dy);
      clearTimeout(said); said = setTimeout(() => { msg.textContent = `「${n.t}」已移动，${lines(n)} 条连线已重算`; }, 300);
    });
  });
  const layout = (init) => {
    bw = bd.clientWidth; bh = bd.clientHeight; nw = nodes[0].el.offsetWidth; nh = nodes[0].el.offsetHeight;
    nodes.forEach((n) => { if (init) { n.x = Math.round(8 + n.fx * (bw - nw - 16)); n.y = Math.round(8 + n.fy * (bh - nh - 16)); } n.x = Math.max(0, Math.min(bw - nw, n.x)); n.y = Math.max(0, Math.min(bh - nh, n.y)); }); render();
  };
  // 挂载后演示一次：把“预约带看”往下拖，和“电话回访”的连线从左右边换到上下边
  const auto = async () => {
    const wait = (ms) => new Promise((r) => setTimeout(r, still ? 0 : ms)), live = () => root.host.isConnected && !stop, n = nodes[2];
    const tx = n.x, ty = Math.round(8 + 0.55 * (bh - nh - 16)), at = (x, y) => { cur.style.transform = `translate(${x + nw / 2}px,${y + nh / 2}px)`; };
    cur.classList.add('quick'); at(n.x + 30, n.y + 40); cur.style.display = 'block'; void cur.offsetWidth; cur.classList.remove('quick');
    await wait(60); if (!live()) return; at(n.x, n.y); await wait(420); if (!live()) return;
    act = n.id; n.el.classList.add('drag'); if (!still) cur.classList.add('quick');
    const x0 = n.x, y0 = n.y;
    for (let i = 1; i <= 12; i++) { if (!live()) return; const p = i / 12, e = p * p * (3 - 2 * p); place(n, x0 + (tx - x0) * e, y0 + (ty - y0) * e); at(n.x, n.y); await wait(45); }
    n.el.classList.remove('drag'); msg.textContent = `「${n.t}」已移动，${lines(n)} 条连线已重算`;
  };
  let first = true;
  const ro = new ResizeObserver(() => {
    if (!root.host.isConnected) { ro.disconnect(); return; }
    layout(first); if (first) { first = false; setTimeout(() => { if (!stop && root.host.isConnected) auto(); }, 300); }
  });
  ro.observe(bd);
}
</script>
