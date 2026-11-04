---
zh: 动画没停也能接住
en: Catch mid-animation
order: 20
---

## 是什么

元素还在滑行、回弹或归位时，手指一按就从它此刻在屏幕上的位置接住，跟着手指走；不会先闪到终点（或起点）再跳回手指下面。

## 适合

能甩出去的悬浮球、悬浮计时器、画中画小窗，回弹中的面板和卡片，惯性转动中的转盘——凡是“动画还没停就可能再被摸到”的东西。

## 不适合

已经提交的操作（删除飞出、支付完成）不能靠“接住”撤销，用明确的撤销按钮；不能拖的纯展示动画不用处理。

## 注意

接住时读的必须是画面上的当前位置，而不是动画的目标值或起点。用 CSS transition 做的动画，状态变量里存的早就是终点：要么用 getComputedStyle 读出此刻的 transform 再写回，要么自己用 requestAnimationFrame 驱动、随时保存当前位置。

## 要点

- 按下时先停掉旧动画（取消 rAF，或把 transition 设为 none 并写回当前 transform），再记录手指与元素的偏移
- 每段动画带一个编号，新拖动开始时编号加一，旧动画的回调和结束事件发现编号对不上就直接丢弃
- 同一时刻只让一个来源写位置：拖动中只有指针写，松手后只有动画写
- 再次松手用这一次手势的速度（最近约 80ms 的样本）决定去向，不沿用上一段的惯性
- 动画中的元素用 transform 移动，命中区自然跟着画面走；不要在动画期间关掉它的指针事件
- 键盘等效：元素可聚焦，←/→ 停靠到左 / 右；停靠结果用 role="status" 播报
- 减少动态效果时松手直接到位，没有滑行，也就没有需要接住的中间态

## 提示词

给{产品}的{悬浮元素}做「动画没停也能接住」：用 requestAnimationFrame 自己驱动滑行和停靠，随时保存当前位置；在动画途中按下时先停掉旧动画，从元素此刻画面上的位置开始跟手，保留手指偏移，不跳到终点或起点；每段动画带编号，开始新拖动后旧动画的回调全部作废；同一时刻只有一个来源写位置；松手按这次手势最近 80ms 的速度决定停靠到哪一边，不沿用旧惯性；元素可聚焦，←/→ 停靠左 / 右，用 role="status" 播报停靠结果；减少动态效果时松手直接到位。

## 示例

<link rel="stylesheet" href="../../_shared/app-control-base.css">
<style>
.st{display:flex;justify-content:center;gap:14px;padding:10px 12px 0;background:linear-gradient(155deg,#f3efe9,#e3dcd2)}
.dev{position:relative;flex:none;width:188px;height:calc(100% + 30px);padding:5px 5px 0;border-radius:30px 30px 0 0;background:#15171c;box-shadow:0 20px 40px -18px rgba(40,25,10,.55)}
.scr{position:relative;height:100%;overflow:hidden;border-radius:25px 25px 0 0;background:#fffaf5}
.sbar{position:absolute;left:0;right:0;top:0;z-index:20;display:flex;justify-content:space-between;align-items:center;height:24px;padding:0 16px 0 18px;font-size:10px;font-weight:600;pointer-events:none}
.sbar::after{content:"";position:absolute;left:50%;top:6px;width:44px;height:13px;margin-left:-22px;border-radius:7px;background:#15171c}
.bat{width:18px;height:9px;padding:1px;border:1.3px solid currentColor;border-radius:3px}
.bat::before{content:"";display:block;width:65%;height:100%;border-radius:1px;background:currentColor}
.pg{position:absolute;inset:0;padding:24px 0 30px;overflow:hidden auto;scrollbar-width:none}
.nav{display:flex;align-items:center;gap:4px;height:32px;padding:0 12px}
.nav h3{margin:0;font-size:14px}
.nav svg{width:16px;height:16px;fill:none;stroke:#15171c;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.hero{height:52px;margin:0 10px;border-radius:14px;background:radial-gradient(120% 90% at 85% 10%,rgba(255,255,255,.28) 0 30%,transparent 31%),linear-gradient(135deg,#9a3412,#ea580c 55%,#fdba74)}
.steps{display:grid;gap:6px;margin:8px 10px 0;padding:0;list-style:none;counter-reset:s}
.steps li{display:grid;grid-template-columns:18px minmax(0,1fr);gap:6px;color:#3f3a35;font-size:11px;line-height:1.45;counter-increment:s}
.steps li::before{content:counter(s);display:grid;place-items:center;width:18px;height:18px;border-radius:50%;background:#ffedd5;color:#c2410c;font-size:10px;font-weight:700}
.fx{position:absolute;inset:0;z-index:8;pointer-events:none}
.fx i{position:absolute;width:5px;height:5px;margin:-2.5px 0 0 -2.5px;border-radius:50%;background:#1d4ed8;opacity:.55}
.ring{position:absolute;z-index:9;width:30px;height:30px;margin:-15px 0 0 -15px;border:2px solid #f59e0b;border-radius:50%;pointer-events:none}
.ring::after{content:"接住";position:absolute;left:50%;top:100%;margin-top:2px;color:#b45309;font-size:9px;font-weight:700;white-space:nowrap;transform:translateX(-50%)}
.jump{position:absolute;z-index:9;height:0;border-top:2px dashed #d92d20;transform-origin:0 0;pointer-events:none}
.pill{position:absolute;left:0;top:0;z-index:10;display:flex;align-items:center;gap:4px;height:30px;padding:0 10px 0 8px;border:0;border-radius:15px;background:#ea580c;color:#fff;font-size:12px;font-weight:700;font-variant-numeric:tabular-nums;box-shadow:0 8px 18px -6px rgba(154,52,18,.6);cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none;will-change:transform}
.pill svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round}
.pill.pause{background:#57534e}
.pill:focus-visible{outline-offset:3px}
.side{display:flex;flex:0 1 220px;flex-direction:column;gap:8px;min-width:0;padding:4px 0 12px}
.side .ctl{align-self:flex-start;height:28px;padding:0 10px;font-size:12px}
.cap{display:none;margin:0;color:#5b616e;font-size:12px}
.seg{display:flex;padding:2px;border-radius:8px;background:#e7e1d8}
.seg button{flex:1;min-width:0;height:24px;padding:0 4px;border:0;border-radius:6px;background:none;color:#57534e;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.seg [aria-pressed=true]{background:#fff;color:#1c1917;font-weight:600;box-shadow:0 1px 2px rgba(28,25,23,.12)}
.ro{margin:0;color:#57534e;font-size:11px}
.ro b{color:#1c1917;font:600 13px/1.3 ui-monospace,SFMono-Regular,Menlo,monospace;font-variant-numeric:tabular-nums}
.ro.bad b{color:#d92d20}
.msg{margin:0;color:#44403c;font-size:11.5px;line-height:1.5}
@container (max-width:310px){.st{gap:10px;padding:10px 10px 0}
.dev{width:170px}
.msg{font-size:11px}
}
@container (min-width:560px){.st{gap:32px}
.dev{width:236px}
.cap{display:block}
.hero{height:84px}
.steps li{font-size:12px}
.ro b{font-size:15px}
.msg{font-size:12.5px}
.side .ctl{order:1}
}
</style>

<div class="st"><div class="dev"><div class="scr"><div class="sbar" aria-hidden="true"><span>18:42</span><span class="bat"></span></div><div class="pg"><div class="nav"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5"/></svg><h3>番茄牛腩</h3></div><div class="hero"></div><ol class="steps"><li>牛腩切块冷水下锅，焯 3 分钟捞出</li><li>番茄炒到出沙，加热水没过肉</li><li>小火炖 40 分钟，中途别揭盖</li><li>大火收汁，撒一把葱花</li></ol></div><div class="fx" aria-hidden="true"></div><button type="button" class="pill" aria-label="炖煮计时，拖动或按 ←/→ 停靠到左右，点按暂停"><svg viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7.5" r="5"/><path d="M7 5v2.6M5.5 1h3"/></svg><span class="tm">38:20</span></button></div></div><div class="side"><button type="button" class="ctl rp">重播</button><p class="cap">胶囊滑向屏幕边时，半路用手按住它</p><div class="seg" role="group" aria-label="接住时读取"><button type="button" aria-pressed="true" data-m="now">读当前</button><button type="button" aria-pressed="false" data-m="end">读终点</button></div><p class="ro">接住偏差 <b class="dv">—</b></p><p class="msg" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const st = root.querySelector('.st'), scr = root.querySelector('.scr'), pill = root.querySelector('.pill'), fx = root.querySelector('.fx'), tmEl = root.querySelector('.tm');
  const dv = root.querySelector('.dv'), ro = root.querySelector('.ro'), msg = root.querySelector('.msg');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const K = 0.00004, C = 2 * Math.sqrt(K) * 0.72; // 弹簧：约 800ms 停稳，略有过冲
  const S = { x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0, side: 1, moving: false };
  let note = '', mode = 'now', tok = 0, d = null, moved = false, left = 38 * 60 + 20, paused = false, tm = [], lastDot = 0;
  const box = () => { const w = scr.clientWidth, vis = st.getBoundingClientRect().bottom - scr.getBoundingClientRect().top; return { w, bw: pill.offsetWidth, bh: pill.offsetHeight, minY: 30, maxY: vis - pill.offsetHeight - 12 }; };
  const put = () => { pill.style.transform = `translate(${S.x}px,${S.y}px)`; };
  const dot = () => { const i = document.createElement('i'), b = box(); i.style.left = S.x + b.bw / 2 + 'px'; i.style.top = S.y + b.bh / 2 + 'px'; fx.append(i); if (fx.querySelectorAll('i').length > 40) fx.querySelector('i').remove(); };
  const clearFx = () => { fx.replaceChildren(); };
  const docked = () => { S.moving = false; msg.textContent = (note ? note + '；' : '') + `已停靠${S.side ? '右' : '左'}侧`; note = ''; };
  const fly = (side, vx, vy) => {
    const id = ++tok, b = box();
    S.side = side; S.tx = side ? b.w - b.bw - 8 : 8; S.ty = Math.max(b.minY, Math.min(b.maxY, S.y + vy * 150)); S.vx = vx; S.vy = vy;
    if (still) { S.x = S.tx; S.y = S.ty; put(); return docked(); }
    S.moving = true; let last = performance.now();
    const f = (t) => {
      if (id !== tok || !root.host.isConnected) return; // 编号对不上：这段动画已被新拖动取代
      let dt = Math.min(48, t - last); last = t;
      for (; dt > 0; dt -= 4) { const h = Math.min(4, dt); S.vx += (-K * (S.x - S.tx) - C * S.vx) * h; S.vy += (-K * (S.y - S.ty) - C * S.vy) * h; S.x += S.vx * h; S.y += S.vy * h; if (S.x < 2 || S.x > b.w - b.bw - 2) { S.x = Math.max(2, Math.min(b.w - b.bw - 2, S.x)); S.vx = 0; } } // 不越出屏幕边
      put(); if (t - lastDot > 36) { lastDot = t; dot(); }
      if (Math.abs(S.x - S.tx) + Math.abs(S.y - S.ty) < 0.6 && Math.abs(S.vx) + Math.abs(S.vy) < 0.02) { S.x = S.tx; S.y = S.ty; put(); docked(); }
      else requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  };
  const mark = (x, y, jx, jy) => {
    const b = box(), cx = x + b.bw / 2, cy = y + b.bh / 2, ring = Object.assign(document.createElement('i'), { className: 'ring' });
    ring.style.left = cx + 'px'; ring.style.top = cy + 'px'; fx.append(ring);
    if (jx === undefined) return;
    const ex = jx + b.bw / 2, ey = jy + b.bh / 2, line = Object.assign(document.createElement('i'), { className: 'jump' });
    line.style.cssText = `left:${cx}px;top:${cy}px;width:${Math.hypot(ex - cx, ey - cy)}px;transform:rotate(${Math.atan2(ey - cy, ex - cx)}rad)`; fx.append(line);
  };
  const vel = () => { const s = d.s, a = s[0], b = s[s.length - 1]; return b[0] > a[0] && performance.now() - b[0] < 80 ? [(b[1] - a[1]) / (b[0] - a[0]), (b[2] - a[2]) / (b[0] - a[0])] : [0, 0]; };
  pill.addEventListener('pointerdown', (e) => {
    if (e.button > 0) return;
    const caught = S.moving; tok++; S.moving = false; moved = caught; // 先停掉旧动画；接住后松手不算点按
    if (caught) {
      if (mode === 'end') { // 错误做法：读动画的终点当作当前位置，元素会先跳过去
        const jump = Math.round(Math.hypot(S.tx - S.x, S.ty - S.y)); mark(S.x, S.y, S.tx, S.ty); S.x = S.tx; S.y = S.ty; put();
        dv.textContent = jump + 'px'; ro.classList.add('bad'); msg.textContent = note = '读的是动画终点：胶囊先跳到了屏幕边，不在手指下';
      } else { mark(S.x, S.y); dv.textContent = '0px'; ro.classList.remove('bad'); msg.textContent = note = '半路接住，从画面上的位置开始跟手，没有跳'; }
    } else clearFx();
    const r = scr.getBoundingClientRect();
    d = { ox: e.clientX - r.left - S.x, oy: e.clientY - r.top - S.y, x0: e.clientX, y0: e.clientY, on: caught, s: [[e.timeStamp, e.clientX, e.clientY]] };
    try { pill.setPointerCapture(e.pointerId); } catch {}
  });
  pill.addEventListener('pointermove', (e) => {
    if (!d) return;
    if (!d.on) { if (Math.hypot(e.clientX - d.x0, e.clientY - d.y0) < 4) return; d.on = true; }
    moved = true; const r = scr.getBoundingClientRect();
    S.x = e.clientX - r.left - d.ox; S.y = e.clientY - r.top - d.oy; put();
    d.s.push([e.timeStamp, e.clientX, e.clientY]); while (d.s.length > 2 && e.timeStamp - d.s[0][0] > 80) d.s.shift();
  });
  const up = () => {
    if (!d) return;
    const on = d.on, [vx, vy] = vel(); d = null; if (!on) return;
    const b = box(); fly(S.x + b.bw / 2 + vx * 200 > b.w / 2 ? 1 : 0, vx, vy); // 用这一次手势的速度决定去向
  };
  pill.addEventListener('pointerup', up); pill.addEventListener('pointercancel', up);
  pill.addEventListener('click', () => { if (moved) { moved = false; return; } paused = !paused; pill.classList.toggle('pause', paused); msg.textContent = paused ? '计时已暂停' : '计时继续'; });
  pill.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); clearFx(); note = ''; msg.textContent = ''; fly(e.key === 'ArrowRight' ? 1 : 0, 0, 0); } });
  root.querySelectorAll('.seg button').forEach((b) => b.addEventListener('click', () => { mode = b.dataset.m; root.querySelectorAll('.seg button').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); msg.textContent = mode === 'end' ? '已切到“读终点”，点重播看差别' : '已切到“读当前位置”'; }));
  const clock = setInterval(() => { if (!root.host.isConnected) return clearInterval(clock); if (!paused && left > 0) { left--; tmEl.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`; } }, 1000);
  // 自动演示：向左甩出胶囊 → 滑到半路时按住 → 再往右一甩
  const play = () => {
    tm.forEach(clearTimeout); tm = []; tok++; d = null; note = ''; clearFx(); dv.textContent = '—'; ro.classList.remove('bad'); msg.textContent = '';
    const b = box(); S.side = 1; S.x = b.w - b.bw - 8; S.y = Math.round(b.minY + (b.maxY - b.minY) * 0.8); S.moving = false; put();
    const fire = (type, x, y) => { const r = scr.getBoundingClientRect(); pill.dispatchEvent(new PointerEvent(type, { bubbles: true, pointerId: 9, button: 0, clientX: r.left + x, clientY: r.top + y })); };
    const at = (fn, t) => tm.push(setTimeout(() => { if (root.host.isConnected) fn(); }, t));
    const c = () => [S.x + b.bw / 2, S.y + b.bh / 2];
    let gx = 0, gy = 0;
    at(() => { [gx, gy] = c(); fire('pointerdown', gx, gy); }, 300);
    for (let k = 1; k <= 4; k++) at(() => fire('pointermove', (gx -= 6), (gy -= 2)), 300 + k * 16);
    at(() => fire('pointerup', gx, gy), 300 + 5 * 16);
    at(() => { [gx, gy] = c(); fire('pointerdown', gx, gy); }, 300 + 5 * 16 + 220);
    for (let k = 1; k <= 3; k++) at(() => fire('pointermove', (gx += 12), gy), 300 + 5 * 16 + 220 + 360 + k * 16);
    at(() => { fire('pointerup', gx, gy); if (still) msg.textContent = '减少动态效果：松手直接停靠，没有中间态要接'; }, 300 + 5 * 16 + 220 + 360 + 4 * 16);
  };
  root.querySelector('.rp').addEventListener('click', play);
  put();
  tm.push(setTimeout(() => { if (root.host.isConnected) play(); }, 60));
}
</script>
