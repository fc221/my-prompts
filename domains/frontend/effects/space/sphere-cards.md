---
zh: 卡片排成球面
en: Sphere of cards
order: 20
---

## 是什么

二三十张小卡片均匀铺在一个球面上，整个球可以上下左右拖着转，朝向你的那几张最清楚；点其中一张，它的内容在球前方的平面卡片里展开。

## 适合

素材收藏、配色库、标签和话题、成员墙这类数量多、没有固定先后、适合随手翻找的集合。

## 不适合

有明确顺序或要逐个比较时用网格或列表；少于 15 张时球面太稀，用「环成一圈的画廊」；手机上不要把整屏都做成拖动区，把球限制在一块固定区域里，留出页面滚动的位置。

## 注意

用黄金角（斐波那契）分布把卡片铺开，不要按经纬度等分，否则两极挤成一团、赤道稀稀拉拉；详情正文要放在平面层里，不能贴在球面上跟着转。

## 要点

- 第 i 张（共 N 张）：y = 1 − 2(i + 0.5)/N，纬度 = asin(y)，经度 = i × 137.5°；每张 rotateY(经度) rotateX(纬度) translateZ(R)，整球 rotateX(俯仰) rotateY(方位)
- 横向拖动转方位、纵向拖动转俯仰（俯仰限制在 ±60°），每 px 0.3–0.5°；拖动区设 touch-action: none，位移超过 5px 才算拖动，不吞掉点击
- 按每张的朝向调透明度：正对约 1、侧面 0.4、背面 0.15；朝向背面的卡 pointer-events: none，不抢前面的点击
- 点朝前的卡：球停在当前角度，内容在球前方的平面层展开（名称、说明、操作），焦点移到“关闭”；Esc 或“关闭”收起，焦点回到球，角度不变
- 变体「螺旋」：有先后的内容（时间、色相、阶段）按顺序排成上升的螺旋，第 i 张 rotateY(i × 30–40°)、升高卡高的 25–35%，螺旋比窗口高时上一张 / 下一张同时转角和上下平移，让当前那张停在正中，第一张和最后一张都能转到正前方，到头禁用按钮；两种排布都写成 rotateY() translateY() rotateX() translateZ(R) 这一组函数（球面 translateY 为 0，螺旋 rotateX 为 0），切换时 600ms 过渡
- 方向键转动（每次 20–30°），Enter 打开正对的那张；停下后用 role="status" 播报正对的卡；不默认自转
- 减少动态效果时不做过渡，转动和切换排布都直接到位

## 提示词

把{灵感卡片}做成「卡片排成球面」：{卡片数}张卡用黄金角分布铺在半径 R 的球面上（y = 1 − 2(i + 0.5)/卡片数，纬度 asin(y)，经度 i × 137.5°），每张 rotateY(经度) rotateX(纬度) translateZ(R)；整球可拖动旋转，横向转方位、纵向转俯仰（限制 ±60°），位移超过 5px 才算拖动，方向键每次转 25°；每张按朝向调透明度，背面的卡 pointer-events: none；点朝前的卡时球停在当前角度，内容在球前方的平面层展开，焦点移到“关闭”，Esc 或“关闭”收起并把焦点还给球；另给一个“球面 / 螺旋”切换（aria-pressed），螺旋按{排序依据}把卡排成上升螺旋（每张转 36°、升高卡高的 30%），上一张 / 下一张同时转角和上下平移、让当前那张停在正中，到头禁用；两种排布都写成 rotateY() translateY() rotateX() translateZ(R)，切换时 600ms 过渡；停下后用 role="status" 播报正对的卡；不自动旋转；减少动态效果时直接到位。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{background:radial-gradient(circle at 36% 50%,#ffffff,#eeece7 62%)}
.wrap{display:grid;grid-template-columns:minmax(0,1fr) 124px;gap:4px;height:100%;padding-right:12px}
.scene{position:relative;min-width:0;border-radius:12px;touch-action:none;cursor:grab;user-select:none;-webkit-user-select:none;outline-offset:-3px}
.globe{position:absolute;left:50%;top:50%;transform-style:preserve-3d;transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.cd{position:absolute;left:-13px;top:-16px;width:26px;height:32px;padding:0;border:0;border-radius:6px;background:linear-gradient(150deg,color-mix(in srgb,var(--c) 55%,#fff),var(--c) 72%);box-shadow:0 2px 5px rgba(40,35,30,.18),inset 0 0 0 1px rgba(255,255,255,.35);cursor:pointer;transition:transform .6s cubic-bezier(.2,.8,.2,1),opacity .6s}
.globe.drag,.globe.drag .cd{transition:none}
.side{display:flex;flex-direction:column;justify-content:center;gap:10px;min-width:0}
.seg{display:flex;padding:2px;border-radius:8px;background:#e4e2dc}
.seg button{flex:1;min-width:0;height:26px;padding:0;border:0;border-radius:6px;background:none;color:#5d5a54;font-size:12px}
.seg [aria-pressed=true]{background:#fff;color:#1f2329;font-weight:600;box-shadow:0 1px 2px rgba(40,35,30,.14)}
.cap{display:flex;flex-direction:column;line-height:1.35;white-space:nowrap}
.cap small{color:#7a766e;font-size:11px;font-variant-numeric:tabular-nums}
.cap b{display:flex;align-items:center;gap:6px;font-size:15px}
.cap b::before{content:"";flex:none;width:12px;height:12px;border-radius:4px;background:var(--c)}
.navs{display:flex;align-items:center;gap:8px}
.nav{display:grid;place-items:center;width:30px;height:30px;padding:0 0 2px;border:1px solid #d8d5ce;border-radius:50%;background:#fff;color:#1f2329;font-size:18px;line-height:1}
.nav:disabled{opacity:.35;cursor:default}
.navs small{min-width:0;color:#8a867e;font-size:11px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dt{position:absolute;inset:0;z-index:5;display:grid;place-items:center;padding:12px;background:rgba(240,238,233,.62);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)}
.pn{display:flex;align-items:center;gap:14px;width:min(300px,100%);padding:14px;border-radius:14px;background:#fff;box-shadow:0 12px 32px rgba(40,35,30,.2);animation:pop .18s cubic-bezier(.2,.8,.2,1)}
@keyframes pop{from{opacity:0;transform:scale(.96)}
}
.pn .sw{flex:none;width:68px;height:68px;border-radius:12px;background:linear-gradient(150deg,color-mix(in srgb,var(--c) 55%,#fff),var(--c) 72%)}
.pn div{display:flex;flex-direction:column;align-items:flex-start;min-width:0;line-height:1.4}
.pn b{font-size:16px}
.pn code{font:12px ui-monospace,Menlo,monospace;color:#4b4842}
.pn small{color:#7a766e;font-size:11px;white-space:nowrap}
.x{height:28px;margin-top:6px;padding:0 12px;border:1px solid #d8d5ce;border-radius:8px;background:#fff;font-size:12px}
.x:hover{background:#f5f4f1}
@container (max-width:310px){.wrap{grid-template-columns:minmax(0,1fr) 112px}
.navs small{display:none}
}
@container (min-height:260px){.wrap{grid-template-columns:minmax(0,1fr) 200px;padding-right:40px}
.cd{left:-22px;top:-28px;width:44px;height:56px;border-radius:9px}
.side{gap:14px}
.cap b{font-size:18px}
.cap small,.navs small{font-size:12px}
.nav{width:34px;height:34px}
.pn{width:min(340px,100%)}
}
</style>

<div class="st"><div class="wrap"><div class="scene" tabindex="0" role="group" aria-roledescription="可旋转的卡片球" aria-label="24 种配色，方向键转动，Enter 打开正对的一张"><div class="globe"></div></div><div class="side"><div class="seg" role="group" aria-label="排布"><button type="button" aria-pressed="true" data-m="s">球面</button><button type="button" aria-pressed="false" data-m="h">螺旋</button></div><div class="cap"></div><div class="navs"><button type="button" class="nav pv" aria-label="上一张">‹</button><button type="button" class="nav nx" aria-label="下一张">›</button><small>拖动旋转</small></div></div></div><div class="dt" hidden><div class="pn" role="dialog"><i class="sw" aria-hidden="true"></i><div><b></b><code></code><small></small><button type="button" class="x">关闭</button></div></div></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const C = [['胭脂', '#b4304a'], ['海棠', '#e0607e'], ['珊瑚', '#f08a6c'], ['赭石', '#a65a34'], ['杏黄', '#f2b35b'], ['鹅黄', '#f3d36a'], ['秋香', '#bfb34a'], ['柳绿', '#9cbf5a'], ['竹青', '#5f9e6e'], ['松绿', '#2f7d64'], ['薄荷', '#8fd3bf'], ['青瓷', '#7fb7ae'], ['天青', '#8ab6d6'], ['湖蓝', '#3f8fc0'], ['靛青', '#2f4d8a'], ['群青', '#4a5fc1'], ['黛蓝', '#3b4a6b'], ['丁香', '#b8a1d9'], ['藕荷', '#c49bb7'], ['紫檀', '#6b3a4a'], ['月白', '#d7e3ee'], ['银灰', '#b8bcc4'], ['烟墨', '#4a4a52'], ['象牙', '#efe7d4']];
  const N = C.length, RAD = Math.PI / 180, HS = 36, $ = (s) => root.querySelector(s);
  const scene = $('.scene'), globe = $('.globe'), side = $('.side'), cap = $('.cap'), pv = $('.pv'), nx = $('.nx'), dt = $('.dt'), pn = $('.pn'), live = $('[role=status]');
  const cards = C.map(([n, hex]) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'cd'; b.tabIndex = -1; b.style.setProperty('--c', hex); b.setAttribute('aria-label', n); globe.appendChild(b); return b; });
  let mode = 's', yaw = 0, pitch = -12, ty = 0, idx = 0, hb = 0, R = 60, dy = 4, d = null, lastDrag = 0, t = 0;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  // 两种排布共用 rotateY() translateY() rotateX() translateZ()：球面用黄金角分布，螺旋每张转 36°、升高卡高的 30%
  const pos = (i) => (mode === 's' ? [i * 137.508, 0, Math.asin(1 - (2 * (i + 0.5)) / N) / RAD] : [i * HS, -(i - (N - 1) / 2) * dy, 0]);
  const facing = (i) => {
    const [a, , b] = pos(i), A = a * RAD, B = b * RAD, Y = yaw * RAD, P = pitch * RAD;
    const x = Math.cos(B) * Math.sin(A), y = -Math.sin(B), z = Math.cos(B) * Math.cos(A);
    return y * Math.sin(P) + (z * Math.cos(Y) - x * Math.sin(Y)) * Math.cos(P);
  };
  const front = () => { if (mode === 'h') return idx; let f = 0, v = -2; cards.forEach((_, i) => { const z = facing(i); if (z > v) { v = z; f = i; } }); return f; };
  const paint = (speak = true) => {
    globe.style.transform = `translateZ(${-R}px) rotateX(${pitch}deg) translateY(${ty}px) rotateY(${yaw}deg)`;
    cards.forEach((c, i) => { const z = facing(i); c.style.opacity = (0.15 + 0.85 * Math.max(0, z) ** 1.5).toFixed(3); c.style.pointerEvents = z < 0.2 ? 'none' : ''; });
    const f = front(), [n, hex] = C[f];
    cap.style.setProperty('--c', hex); cap.innerHTML = `<small>正对 · ${f + 1} / ${N}</small><b>${n}</b><small>${hex}</small>`;
    pv.disabled = mode === 'h' && idx === 0; nx.disabled = mode === 'h' && idx === N - 1;
    clearTimeout(t); if (speak) t = setTimeout(() => { if (root.host.isConnected) live.textContent = `正对：${n}，${hex}`; }, 650);
  };
  const place = () => cards.forEach((c, i) => { const [a, y, b] = pos(i); c.style.transform = `rotateY(${a}deg) translateY(${y}px) rotateX(${b}deg) translateZ(${R}px)`; });
  const layout = () => { R = Math.min(scene.clientWidth, scene.clientHeight) * 0.36; dy = cards[0].offsetHeight * 0.3; scene.style.perspective = R * 4 + 'px'; place(); if (mode === 'h') ty = (idx - (N - 1) / 2) * dy; paint(false); };
  const toIdx = (i) => { idx = clamp(i, 0, N - 1); yaw = hb - idx * HS; ty = (idx - (N - 1) / 2) * dy; paint(); };
  const step = (k) => (mode === 'h' ? toIdx(idx + k) : ((yaw -= k * 25), paint()));
  const tilt = (k) => (mode === 'h' ? toIdx(idx + k) : ((pitch = clamp(pitch - k * 20, -60, 60)), paint()));
  const setMode = (m) => {
    if (m === mode) return;
    const f = front(); mode = m;
    root.querySelectorAll('.seg button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.m === m)));
    place();
    if (m === 'h') { pitch = -12; hb = Math.round((yaw + f * HS) / 360) * 360; toIdx(f); } else { pitch = -12; ty = 0; paint(); }
  };
  const open = (i) => {
    const [n, hex] = C[i], v = [1, 3, 5].map((k) => parseInt(hex.slice(k, k + 2), 16));
    pn.style.setProperty('--c', hex); pn.setAttribute('aria-label', n);
    pn.querySelector('b').textContent = n; pn.querySelector('code').textContent = hex; pn.querySelector('small').textContent = `R ${v[0]} · G ${v[1]} · B ${v[2]} · 第 ${i + 1} / ${N} 张`;
    dt.hidden = false; scene.inert = side.inert = true; pn.querySelector('.x').focus(); live.textContent = `已打开：${n}`;
  };
  const close = () => { dt.hidden = true; scene.inert = side.inert = false; scene.focus(); live.textContent = '已关闭，球保持原来的角度'; };
  scene.addEventListener('pointerdown', (e) => { if (!e.button) d = { x: e.clientX, y: e.clientY, yaw, pitch, moved: false }; });
  scene.addEventListener('pointermove', (e) => {
    if (!d) return;
    const dx = e.clientX - d.x, dv = e.clientY - d.y;
    if (!d.moved && Math.hypot(dx, dv) > 5) { d.moved = true; globe.classList.add('drag'); try { scene.setPointerCapture(e.pointerId); } catch {} }
    if (!d.moved) return;
    yaw = d.yaw + dx * 0.4;
    if (mode === 's') pitch = clamp(d.pitch - dv * 0.4, -60, 60);
    else { idx = Math.round(clamp((hb - yaw) / HS, 0, N - 1)); ty = (clamp((hb - yaw) / HS, 0, N - 1) - (N - 1) / 2) * dy; }
    paint(false);
  });
  const end = () => { if (!d) return; const m = d.moved; d = null; globe.classList.remove('drag'); if (m) { lastDrag = performance.now(); mode === 'h' ? toIdx(idx) : paint(); } };
  scene.addEventListener('pointerup', end); scene.addEventListener('pointercancel', end);
  scene.addEventListener('click', (e) => { const c = e.target.closest('.cd'); if (c && performance.now() - lastDrag > 300) open(cards.indexOf(c)); });
  scene.addEventListener('keydown', (e) => {
    const k = { ArrowLeft: () => step(-1), ArrowRight: () => step(1), ArrowUp: () => tilt(1), ArrowDown: () => tilt(-1), Enter: () => open(front()), ' ': () => open(front()) }[e.key];
    if (k) { e.preventDefault(); k(); }
  });
  dt.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  dt.addEventListener('click', (e) => { if (e.target === dt) close(); });
  $('.x').addEventListener('click', close);
  pv.addEventListener('click', () => step(-1)); nx.addEventListener('click', () => step(1));
  root.querySelectorAll('.seg button').forEach((b) => b.addEventListener('click', () => setMode(b.dataset.m)));
  new ResizeObserver(layout).observe(scene);
  layout();
  setTimeout(() => { if (root.host.isConnected) { yaw = -64; pitch = -20; paint(); } }, 400);
}
</script>
