---
zh: 不挡地图的底部面板
en: Non-blocking sheet
order: 80
---

## 是什么

压在地图上的底部面板，但不是弹窗：没有遮罩，地图上的点位照样能点，点了面板里就切到那一项；面板里拖滑杆，地图上的范围圈跟着变。面板有“只露标题条”和“半屏”两档。

## 适合

找充电桩、停车场、门店、自习室，看房源分布，规划骑行范围，这类要一边看地图一边在列表里比较、调条件的页面。

## 不适合

要用户专心做完一件事（确认订单、填表）时用模态的「底部面板」；地图只是背景装饰、不需要操作时，普通的列表页更简单；面板内容多到要占满全屏，直接用列表页，地图做成一个入口。

## 注意

非模态就要彻底：不加遮罩、不设 aria-modal、不把焦点锁在面板里，点地图不关面板；拖动只能从把手和标题条起手，否则滑杆和列表的手势会被当成拖面板。

## 要点

- 两档：收起只露 44–52px 的把手和标题条（写清“范围内 N 个”），半屏约占屏高 50–60%；用 transform 在两档之间移动，松手按位置和速度吸附（约 280ms 减速曲线）。
- 面板用 role="region" 加名称，不用 dialog；把手是一个按钮，带 aria-expanded，点按、Enter / 空格切换两档，方向键上下也能切换。
- 只有把手和标题条响应拖动，移动超过 4px 才算拖；滑杆、列表的触摸和滚动交给它们自己，列表滚到顶时也不带动面板。
- 点地图上的点位：选中该点，面板切到对应那一项并滚到可见位置；面板收起时自动升到半屏，不关闭面板，也不移动地图。
- 滑杆拖动时实时改范围圈的半径和“范围内 N 个”的计数，松手后用 role="status" 播报一次结果，拖动过程中不逐帧播报。
- 收起时面板内容设 inert，如果焦点原本在里面，就移到把手上；地图点位露在面板上方的部分仍能点。
- 减少动态效果时两档之间直接切换，范围圈直接变到新大小。

## 提示词

在{地图页}上做「不挡地图的底部面板」：面板压在地图上，无遮罩、不设 aria-modal、不锁焦点，用 role="region" 加名称；两档：收起只露 48px 的把手和标题条（“{范围} 内 N 个{地点}”），半屏约 55%，用 transform 切换，松手按位置和速度吸附（280ms 减速）；只从把手和标题条起手拖动，移动超过 4px 才算拖，滑杆和列表的手势不被拖动抢走；把手按钮带 aria-expanded，点按、Enter / 空格、方向键上下都能切换；点地图上的点位时选中该点、面板切到对应项并滚到可见，面板收起时自动升到半屏，不关面板；面板里的{筛选滑杆}实时改地图上的范围圈和计数，松手后用 role="status" 播报一次；收起时面板内容 inert，焦点在里面就移到把手；减少动态效果时直接切换。

## 示例

<link rel="stylesheet" href="../../_shared/app-scroll-base.css">
<style>
.st{background:#e9ecf1}
.scr{position:relative;height:100%;max-width:400px;margin:0 auto;overflow:hidden;background:#eaeee4}
.map{position:absolute;inset:0;--k:18px;--cy:30%;--r:1.5}
.map svg.bg{position:absolute;inset:0;width:100%;height:100%}
.lbl{position:absolute;color:#6f8a64;font-size:10px;font-style:normal;white-space:nowrap;pointer-events:none}
.ring{position:absolute;left:50%;top:var(--cy);width:calc(var(--r) * var(--k) * 2);aspect-ratio:1;border:1.5px solid rgba(37,99,235,.55);border-radius:50%;background:rgba(37,99,235,.1);transform:translate(-50%,-50%);transition:width .12s;pointer-events:none}
.me{position:absolute;left:50%;top:var(--cy);width:14px;height:14px;margin:-7px;border-radius:50%;background:#2563eb;box-shadow:0 0 0 3px #fff,0 1px 6px rgba(15,23,42,.35);pointer-events:none}
.pin{position:absolute;left:calc(50% + var(--x) * var(--k));top:calc(var(--cy) + var(--y) * var(--k));z-index:1;display:grid;place-items:center;width:26px;height:26px;margin:-13px;padding:0;border:2px solid #16a34a;border-radius:50%;background:#fff;color:#16a34a;box-shadow:0 2px 6px rgba(15,23,42,.2);transition:transform .16s,opacity .16s}
.pin::before{content:"";position:absolute;inset:-9px}
.pin svg{width:14px;height:14px;fill:currentColor}
.pin.full{border-color:#98a2b3;color:#98a2b3}
.pin.out{opacity:.45}
.pin[aria-pressed=true]{z-index:2;background:#16a34a;color:#fff;opacity:1;transform:scale(1.2)}
.pin.full[aria-pressed=true]{background:#667085;border-color:#667085}
.sh{position:absolute;left:0;right:0;bottom:0;z-index:3;display:flex;flex-direction:column;height:56cqh;border-radius:16px 16px 0 0;background:#fff;box-shadow:0 -6px 24px rgba(15,23,42,.16);transition:transform .28s cubic-bezier(.2,.8,.2,1);--hd:46px}
.sh.min{transform:translateY(calc(100% - var(--hd)))}
.hd{position:relative;flex:none;display:flex;align-items:center;gap:8px;height:var(--hd);padding:8px 14px 0;touch-action:none;cursor:grab}
.grab{position:absolute;inset:0;z-index:1;padding:0;border:0;border-radius:16px 16px 0 0;background:none;cursor:inherit;outline-offset:-3px}
.grab::before{content:"";position:absolute;left:50%;top:6px;width:36px;height:4px;margin-left:-18px;border-radius:2px;background:#d0d5dd}
.tt{flex:1;min-width:0;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hd small{flex:none;color:#667085;font-size:11px}
.bd{flex:1;min-height:0;display:flex;flex-direction:column}
.rg{flex:none;display:flex;align-items:center;gap:8px;height:30px;padding:0 14px;color:#475467;font-size:12px}
.rg input{flex:1;min-width:0;height:24px;margin:0;accent-color:#2563eb}
.rg output{flex:none;min-width:44px;color:#1f2329;font-weight:600;font-variant-numeric:tabular-nums;text-align:right}
.ls{position:relative;flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;margin:0;padding:0 6px 8px;list-style:none;scrollbar-width:none}
.ls::-webkit-scrollbar{display:none}
.ls button{display:flex;align-items:center;gap:8px;width:100%;padding:6px 8px;border:0;border-radius:10px;background:none;text-align:left}
.ls button[aria-current=true]{background:#ecfdf3}
.ls span{flex:1;min-width:0}
.ls b,.ls small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ls b{font-weight:500;line-height:1.35}
.ls small{color:#667085;font-size:11px;line-height:1.35}
.ls small i{display:none;font-style:normal}
.ls .out b{color:#98a2b3}
.ls .out small i{display:inline}
.ls em{flex:none;height:22px;padding:0 8px;border-radius:11px;background:#f2f4f7;color:#667085;font-size:11px;font-style:normal;line-height:22px;white-space:nowrap}
.ls em.ok{background:#dcfae6;color:#067647;font-weight:600}
@container (max-height:230px){.sh{height:60cqh;--hd:42px}
.hd{padding-top:6px}
.rg{height:28px}
.ls button{padding:4px 8px}
}
@container (min-height:280px){.map{--k:28px}
}
</style>

<div class="st"><div class="scr"><div class="map"><svg class="bg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="M10 30 Q90 0 150 40 T165 130 Q100 165 30 125 Z" fill="#cfe2c0"/><path d="M-10 236 C80 206 160 262 250 214 S380 176 420 194" fill="none" stroke="#bdd7ea" stroke-width="26"/><g fill="#e0e4da"><rect x="232" y="34" width="56" height="40" rx="4"/><rect x="300" y="34" width="74" height="40" rx="4"/><rect x="232" y="102" width="56" height="34" rx="4"/><rect x="186" y="168" width="84" height="26" rx="4"/><rect x="20" y="150" width="90" height="28" rx="4"/></g><g fill="none" stroke-linecap="round"><g stroke="#d6dbd0" stroke-width="12"><path d="M-10 88H410M214-10V310M-10 186L410 152M296-10Q286 120 330 310"/></g><g stroke="#fff" stroke-width="9"><path d="M-10 88H410M214-10V310M-10 186L410 152M296-10Q286 120 330 310"/></g></g></svg><i class="lbl" style="left:12%;top:14%">湖畔公园</i><i class="lbl" style="right:6%;top:52%">滨江路</i><i class="ring"></i><i class="me"></i></div><section class="sh" aria-label="附近充电站"><div class="hd"><button type="button" class="grab" aria-expanded="true" aria-label="收起列表"></button><b class="tt"></b><small>按距离</small></div><div class="bd"><label class="rg">范围<input type="range" min="0.5" max="3" step="0.5" value="1.5"><output>1.5 km</output></label><ul class="ls"></ul></div></section><p class="sr" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const $ = (s) => root.querySelector(s), map = $('.map'), sh = $('.sh'), hd = $('.hd'), grab = $('.grab'), bd = $('.bd'), tt = $('.tt'), rg = $('.rg input'), out = $('output'), ls = $('.ls'), msg = $('[role=status]');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const S = [['樱花路充电站', 0.5, -0.4, 4, '快充 · ¥1.2/度'], ['湖畔公园停车场', -1.1, -0.3, 2, '慢充 · ¥0.9/度'], ['星河广场 B2', 1.4, -0.9, 7, '快充 · ¥1.4/度'], ['体育中心东门', -0.5, -1.7, 0, '快充 · ¥1.3/度'], ['老码头仓库', 2.3, 0.4, 3, '慢充 · ¥0.8/度'], ['科创园南区', -2.6, -0.6, 5, '快充 · ¥1.1/度']]
    .map(([n, x, y, free, kind]) => ({ n, x, y, free, kind, d: Math.hypot(x, y) })).sort((a, b) => a.d - b.d);
  const km = (v) => v.toFixed(1) + ' km', left = (s) => (s.free ? '空闲 ' + s.free + ' 个' : '已满');
  map.insertAdjacentHTML('beforeend', S.map((s) => `<button type="button" class="pin${s.free ? '' : ' full'}" style="--x:${s.x};--y:${s.y}" aria-pressed="false" aria-label="${s.n}，${km(s.d)}，${left(s)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg></button>`).join(''));
  ls.innerHTML = S.map((s) => `<li><button type="button"><span><b>${s.n}</b><small>${km(s.d)} · ${s.kind}<i> · 超出范围</i></small></span><em class="${s.free ? 'ok' : ''}">${s.free ? '空闲 ' + s.free : '已满'}</em></button></li>`).join('');
  const pins = [...map.querySelectorAll('.pin')], items = [...ls.querySelectorAll('button')];
  let open = true, d = null, dragged = false, y = 0;
  // 滑杆实时改范围圈和计数；松手后播报一次
  const setR = (v) => {
    map.style.setProperty('--r', v); out.textContent = km(v);
    S.forEach((s, i) => { pins[i].classList.toggle('out', s.d > v); items[i].classList.toggle('out', s.d > v); });
    tt.textContent = `${km(v)} 内 ${S.filter((s) => s.d <= v).length} 个充电站`;
  };
  rg.addEventListener('input', () => setR(+rg.value));
  rg.addEventListener('change', () => { msg.textContent = tt.textContent; });
  // 两档：去掉拖动时的内联位移，交回 CSS 的 .min 和过渡
  const snap = (o, say) => {
    open = o; sh.style.transform = sh.style.transition = '';
    sh.classList.toggle('min', !o); grab.setAttribute('aria-expanded', String(o)); grab.setAttribute('aria-label', o ? '收起列表' : '展开列表'); bd.inert = !o;
    if (!o && bd.contains(root.activeElement)) grab.focus();
    if (say) msg.textContent = o ? '列表已展开到半屏' : '列表已收起，只露标题条';
  };
  // 点地图点位：选中并在面板里切到那一项；面板收起时升到半屏，不关闭
  const pick = (i, say = true) => {
    pins.forEach((p, k) => p.setAttribute('aria-pressed', String(k === i)));
    items.forEach((b, k) => (k === i ? b.setAttribute('aria-current', 'true') : b.removeAttribute('aria-current')));
    if (!open) snap(true);
    ls.scrollTo({ top: items[i].parentElement.offsetTop - 4, behavior: still ? 'auto' : 'smooth' });
    if (say) msg.textContent = `已选中 ${S[i].n}：${km(S[i].d)}，${left(S[i])}`;
  };
  pins.forEach((p, i) => p.addEventListener('click', () => pick(i)));
  items.forEach((b, i) => b.addEventListener('click', () => pick(i)));
  // 只从把手和标题条起手拖动；移动超过 4px 才算拖
  const range = () => sh.offsetHeight - hd.offsetHeight;
  hd.addEventListener('pointerdown', (e) => { if (e.button > 0) return; dragged = false; d = { y: e.clientY, y0: open ? 0 : range(), ly: e.clientY, lt: e.timeStamp, v: 0, id: e.pointerId, on: false }; });
  hd.addEventListener('pointermove', (e) => {
    if (!d) return;
    const dy = e.clientY - d.y;
    if (!d.on) { if (Math.abs(dy) < 4) return; d.on = true; hd.setPointerCapture(d.id); }
    d.v = (e.clientY - d.ly) / Math.max(1, e.timeStamp - d.lt); d.ly = e.clientY; d.lt = e.timeStamp;
    y = Math.max(0, Math.min(range(), d.y0 + dy)); sh.style.transition = 'none'; sh.style.transform = `translateY(${y}px)`;
  });
  const up = () => { if (!d) return; const g = d; d = null; if (!g.on) return; dragged = true; snap(g.v > 0.4 ? false : g.v < -0.4 ? true : y < range() / 2, true); };
  hd.addEventListener('pointerup', up); hd.addEventListener('pointercancel', up);
  grab.addEventListener('click', () => { if (dragged) { dragged = false; return; } snap(!open, true); });
  grab.addEventListener('keydown', (e) => { if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); snap(e.key === 'ArrowUp', true); } });
  setR(+rg.value);
  // 缩略图：范围拉到 2 km，再点地图上的星河广场
  setTimeout(() => { if (!root.host.isConnected) return; rg.value = 2; setR(2); }, 300);
  setTimeout(() => { if (root.host.isConnected) pick(2, false); }, 700);
}
</script>
