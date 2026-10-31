---
zh: 手指推着页面切换
en: Scrubbed transition
order: 40
tab: 推着切换
---

## 是什么

页面之间的转场不是点一下就自己播完，而是由手指推着走：往下拉多少，详情页就缩回多少；手停它就停，往回推又展开；松手再决定是走完还是退回。

## 适合

从卡片展开的详情页下拉缩回卡片、图片查看器下拉关闭回到缩略图、底部迷你条上推成全屏页、两个并列页面左右推着切换。

## 不适合

层级页面“退回上一页”用「从屏幕边拖回上一页」；只在两个高度之间切换的面板用「收起面板、主图放大」；两个页面在画面上没有空间关系（设置 → 账号）时用普通转场，不必跟手。

## 注意

转场的两个端点（全屏的详情页、卡片在列表里的位置和尺寸）只定义一次，点按打开、点按关闭、拖动、松手收尾都在这两点之间插值，并且总是从当前画面出发。做成“点按一套动画、手势另一套”，松手那一刻画面就会跳。

## 要点

- 打开前记下来源卡片的位置和尺寸；关闭进度 p 由下拉距离算出（拉 0.5 屏高为 1），详情页按 p 等比缩到约 0.8、以手指为中心跟手移动，圆角从 0 增到卡片圆角，背后的遮罩同步变淡；不用非等比缩放压扁文字
- 只有内容已滚到顶、且向下拖时才接管；横向位移更大时不接管
- 拖动全程不加过渡，可以停住、可以往回推，画面始终和手指同步
- 松手：向下速度 > 0.5px/ms 或 p > 0.35 就从当前画面飞回卡片原位（约 260ms），否则弹回全屏（约 220ms）
- 飞回走完才真正关闭页面，把焦点还给来源卡片；弹回不触发任何关闭逻辑
- 详情页保留关闭按钮，Esc 等同关闭，播放的是同一段转场；打开、关闭结果用 role="status" 播报
- 减少动态效果时拖动只降低透明度不缩放，点按打开和关闭改成 150ms 淡入淡出

## 提示词

给{产品}里从{卡片}展开的{详情页}做「手指推着页面切换」：打开前记下来源卡片的位置和尺寸，打开、关闭和手势都在“全屏详情”和“卡片原位”两个端点之间插值，并总是从当前画面出发；内容滚到顶时向下拖才接管，关闭进度 p = 下拉距离 ÷ 半屏高，详情页按 p 等比缩小到约 0.8、以手指为中心跟手移动，圆角从 0 增到卡片圆角，背后的遮罩同步变淡，全程不加过渡，可停住、可往回推；松手时向下速度大于 0.5px/ms 或 p 超过 0.35 就飞回卡片原位（约 260ms），否则弹回全屏；飞回走完才真正关闭并把焦点还给卡片；保留关闭按钮，Esc 同样关闭并播放同一段转场；用 role="status" 播报；减少动态效果时只淡出不缩放。

## 示例

<link rel="stylesheet" href="../../_shared/app-control-base.css">
<style>
.st{display:flex;justify-content:center;gap:14px;padding:10px 12px 0;background:linear-gradient(155deg,#efeef6,#dcdbe9)}
.dev{position:relative;flex:none;width:188px;height:calc(100% + 30px);padding:5px 5px 0;border-radius:30px 30px 0 0;background:#15171c;box-shadow:0 20px 40px -18px rgba(30,20,60,.5)}
.scr{position:relative;height:100%;overflow:hidden;border-radius:25px 25px 0 0;background:#f6f5fa}
.sbar{position:absolute;left:0;right:0;top:0;z-index:20;display:flex;justify-content:space-between;align-items:center;height:24px;padding:0 16px 0 18px;font-size:10px;font-weight:600;pointer-events:none}
.sbar::after{content:"";position:absolute;left:50%;top:6px;width:44px;height:13px;margin-left:-22px;border-radius:7px;background:#15171c}
.bat{width:18px;height:9px;padding:1px;border:1.3px solid currentColor;border-radius:3px}
.bat::before{content:"";display:block;width:65%;height:100%;border-radius:1px;background:currentColor}
.home{position:absolute;inset:0;padding:24px 10px 30px;overflow:hidden auto;scrollbar-width:none}
.home h3{margin:2px 2px 8px;font-size:15px}
.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.cd{display:flex;flex-direction:column;padding:0;overflow:hidden;border:0;border-radius:12px;background:#fff;text-align:left;box-shadow:0 2px 8px -4px rgba(30,20,60,.25)}
.cd i,.hero{display:block;background:var(--g)}
.cd i{aspect-ratio:4/3}
.cd b,.cd small{display:block;padding:0 7px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.cd b{padding-top:5px;font-size:11.5px}
.cd small{padding-bottom:6px;color:#6b6880;font-size:10px}
.cd.gone{visibility:hidden}
.cd.flash{animation:fl 1.4s ease-out}
@keyframes fl{from{box-shadow:0 0 0 3px #a78bfa}
}
.dim{position:absolute;inset:0;z-index:5;background:#0d0b16;opacity:0;pointer-events:none}
.dt{position:absolute;left:0;top:0;z-index:6;width:100%;height:100%;padding-bottom:30px;overflow:hidden auto;background:#fff;transform-origin:0 0;scrollbar-width:none;touch-action:pan-x pan-y;will-change:transform}
.hero{height:44%;min-height:90px}
.x{position:absolute;left:10px;top:28px;display:grid;place-items:center;width:28px;height:28px;border:0;border-radius:50%;background:rgba(255,255,255,.85);color:#15171c;box-shadow:0 2px 6px rgba(0,0,0,.18)}
.x svg{width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round}
.dt h3{margin:10px 12px 0;font-size:16px}
.dt p{margin:4px 12px 0;color:#5f5c70;font-size:11px;line-height:1.55}
.go{display:block;width:calc(100% - 24px);height:32px;margin:10px 12px 0;border:0;border-radius:10px;background:#5b21b6;color:#fff;font-size:12px;font-weight:600}
.side{display:flex;flex:0 1 220px;flex-direction:column;gap:8px;min-width:0;padding:4px 0 12px}
.side .ctl{align-self:flex-start;height:28px;padding:0 10px;font-size:12px}
.cap{display:none;margin:0;color:#5b616e;font-size:12px}
.ro{display:grid;grid-template-columns:auto minmax(0,1fr);gap:1px 8px;align-items:baseline;margin:0;color:#5b616e;font-size:11px}
.ro b{color:#15171c;font:600 13px/1.35 ui-monospace,SFMono-Regular,Menlo,monospace;font-variant-numeric:tabular-nums}
.u{display:none;font-size:11px;font-weight:400}
.vd{align-self:flex-start;margin:0;padding:0 8px;border-radius:999px;background:#e9e7f1;color:#4b4760;font-size:11px;line-height:20px;white-space:nowrap}
.vd.go2{background:#ede9fe;color:#5b21b6}
.msg{margin:0;color:#344054;font-size:11.5px;line-height:1.5}
@container (max-width:310px){.st{gap:10px;padding:10px 10px 0}
.dev{width:170px}
.msg{font-size:11px}
}
@container (min-width:560px){.st{gap:32px}
.dev{width:236px}
.cap{display:block}
.u{display:inline}
.ro b{font-size:15px}
.msg{font-size:12.5px}
.side .ctl{order:1}
.dt p{font-size:12px}
}
</style>

<div class="st"><div class="dev"><div class="scr"><div class="sbar" aria-hidden="true"><span>14:20</span><span class="bat"></span></div><div class="home"><h3>本周看展</h3><div class="grid"></div></div><i class="dim"></i><section class="dt" role="dialog" aria-modal="true" aria-labelledby="gt-t" hidden><i class="hero" aria-hidden="true"></i><button type="button" class="x" aria-label="关闭详情"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 2l8 8M10 2 2 10"/></svg></button><h3 id="gt-t"></h3><p class="when"></p><p>展期内每周一闭馆，周末建议提前一天预约。往下拉可以把详情推回卡片。</p><button type="button" class="go">预约参观</button></section></div></div><div class="side"><button type="button" class="ctl rp">重播</button><p class="cap">打开一张展览卡片，在详情页往下拉</p><p class="ro"><span>进度</span><b class="vp">0%</b><span>速度</span><b><span class="vv">0.00</span><small class="u"> px/ms</small></b></p><p class="vd">松手会：弹回</p><p class="msg" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const scr = root.querySelector('.scr'), grid = root.querySelector('.grid'), dt = root.querySelector('.dt'), dim = root.querySelector('.dim');
  const vp = root.querySelector('.vp'), vv = root.querySelector('.vv'), vd = root.querySelector('.vd'), msg = root.querySelector('.msg');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SHOWS = [['城市微光', '摄影 · 11.01–12.15', 'linear-gradient(160deg,#1e1b4b,#6d28d9 55%,#f0abfc)'], ['纸上山水', '版画 · 10.20–11.30', 'linear-gradient(180deg,#e7e5e4,#a8a29e 55%,#57534e 56%,#78716c)'], ['海的颜色', '装置 · 11.05–01.10', 'linear-gradient(180deg,#bae6fd,#0ea5e9 60%,#075985)'], ['旧物新生', '设计 · 10.28–12.01', 'radial-gradient(circle at 70% 35%,#fde68a 0 16%,transparent 17%),linear-gradient(150deg,#9a3412,#fb923c)']];
  grid.innerHTML = SHOWS.map(([n, w, g], i) => `<button type="button" class="cd" data-i="${i}" style="--g:${g}"><i></i><b>${n}</b><small>${w}</small></button>`).join('');
  const cards = [...grid.children];
  let cur = -1, g = null, d = null, tok = 0, tm = [];
  const W = () => scr.clientWidth, H = () => scr.clientHeight;
  // 转场的两个端点只定义一次：全屏详情、卡片原位
  const FULL = { x: 0, y: 0, s: 1, cb: 0, r: 0, dim: 0.35, o: 1 };
  const atCard = (i) => { const c = cards[i].getBoundingClientRect(), r = scr.getBoundingClientRect(), s = c.width / W(); return { x: c.left - r.left, y: c.top - r.top, s, cb: H() - c.height / s, r: 12 / s, dim: 0, o: 1 }; };
  const apply = (q) => {
    g = q;
    dt.style.transform = still ? '' : `translate(${q.x}px,${q.y}px) scale(${q.s})`;
    dt.style.clipPath = still ? '' : `inset(0 0 ${Math.max(0, q.cb)}px 0 round ${q.r}px)`;
    dt.style.opacity = String(q.o); dim.style.opacity = String(q.dim);
  };
  const mix = (a, b, k) => Object.fromEntries(Object.keys(a).map((n) => [n, a[n] + (b[n] - a[n]) * k]));
  const go = (to, ms, done, fade) => { // 总是从当前画面出发
    const id = ++tok, from = g, t0 = performance.now(), dur = still ? 150 : ms;
    const f = (t) => {
      if (id !== tok || !root.host.isConnected) return;
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3), q = still ? { ...to, o: fade === 'out' ? 1 - k : fade === 'in' ? k : 1 } : mix(from, to, e);
      if (!still && fade === 'out' && k > 0.7) q.o = 1 - (k - 0.7) / 0.3; // 最后一段淡出，露出真实卡片
      apply(q); if (k < 1) requestAnimationFrame(f); else done?.();
    };
    requestAnimationFrame(f);
  };
  const inside = () => root.activeElement && scr.contains(root.activeElement);
  const show = (p, v) => { vp.textContent = Math.round(p * 100) + '%'; vv.textContent = v.toFixed(2); const c = v > 0.5 || p > 0.35; vd.textContent = '松手会：' + (c ? '缩回' : '弹回'); vd.classList.toggle('go2', c); return c; };
  const openShow = (i) => {
    const had = inside(); cur = i; const [n, w, gr] = SHOWS[i];
    dt.querySelector('h3').textContent = n; dt.querySelector('.when').textContent = w; dt.querySelector('.hero').style.setProperty('--g', gr);
    dt.hidden = false; dt.scrollTop = 0; cards[i].classList.add('gone'); root.querySelector('.home').inert = true;
    apply({ ...atCard(i), o: still ? 0 : 1 }); go(FULL, 300, null, 'in'); show(0, 0);
    if (had) dt.querySelector('.x').focus();
    msg.textContent = `已打开「${n}」`;
  };
  const closeShow = (text) => {
    const i = cur, c = cards[i], had = inside(); c.classList.remove('gone');
    go(atCard(i), 260, () => { // 飞回走完才真正关闭
      dt.hidden = true; cur = -1; root.querySelector('.home').inert = false;
      c.classList.remove('flash'); void c.offsetWidth; c.classList.add('flash');
      if (had) c.focus();
      msg.textContent = text + `，回到「${SHOWS[i][0]}」卡片`;
    }, 'out');
  };
  const vel = (s) => { const a = s[0], b = s[s.length - 1]; return b[0] > a[0] && performance.now() - b[0] < 80 ? (b[1] - a[1]) / (b[0] - a[0]) : 0; };
  dt.addEventListener('pointerdown', (e) => {
    if (cur < 0 || e.button > 0 || e.target.closest('button') || dt.scrollTop > 0) return; // 内容滚到顶才接管
    const r = scr.getBoundingClientRect();
    tok++; d = { x0: e.clientX, y0: e.clientY, fx: e.clientX - r.left, fy: e.clientY - r.top, on: false, id: e.pointerId, s: [[e.timeStamp, e.clientY]] };
  });
  dt.addEventListener('pointermove', (e) => {
    if (!d) return;
    const dx = e.clientX - d.x0, dy = e.clientY - d.y0;
    if (!d.on) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      if (dy <= 0 || Math.abs(dx) > Math.abs(dy)) { d = null; return; } // 只接管向下拖
      d.on = true; try { dt.setPointerCapture(d.id); } catch {}
    }
    d.s.push([e.timeStamp, e.clientY]); while (d.s.length > 2 && e.timeStamp - d.s[0][0] > 80) d.s.shift();
    const p = Math.max(0, Math.min(1, dy / (H() * 0.5))), s = 1 - 0.2 * p; d.p = p;
    // 以手指为中心等比缩小，跟着手指移动；圆角随进度变大
    apply({ x: d.fx + dx - d.fx * s, y: d.fy + dy - d.fy * s, s, cb: 0, r: (24 * p) / s, dim: 0.35 * (1 - p), o: still ? 1 - 0.6 * p : 1 });
    show(p, vel(d.s));
  });
  const up = () => {
    if (!d) return;
    const q = d; d = null; if (!q.on) return;
    const p = q.p ?? 0, v = vel(q.s);
    if (show(p, v)) closeShow(v > 0.5 ? `向下甩得快（${v.toFixed(2)} px/ms）` : `拉过 35%（${Math.round(p * 100)}%）`);
    else { go(FULL, 220); msg.textContent = `只拉到 ${Math.round(p * 100)}%，弹回全屏`; }
  };
  dt.addEventListener('pointerup', up); dt.addEventListener('pointercancel', up);
  dt.querySelector('.x').addEventListener('click', () => closeShow('点了关闭'));
  dt.addEventListener('keydown', (e) => { if (e.key === 'Escape' && cur >= 0) { e.preventDefault(); closeShow('按了 Esc'); } });
  grid.addEventListener('click', (e) => { const c = e.target.closest('.cd'); if (c && cur < 0) openShow(+c.dataset.i); });
  // 自动演示：打开第 1 张 → 往下拉到一半 → 往回推 → 再拉过 35% 松手，详情缩回卡片
  const play = () => {
    tm.forEach(clearTimeout); tm = []; tok++; d = null;
    if (cur >= 0) { cards[cur].classList.remove('gone'); dt.hidden = true; cur = -1; root.querySelector('.home').inert = false; }
    apply({ ...FULL, dim: 0 }); show(0, 0); msg.textContent = '';
    const at = (fn, t) => tm.push(setTimeout(() => { if (root.host.isConnected) fn(); }, t));
    const fire = (type, y) => { const r = scr.getBoundingClientRect(); dt.dispatchEvent(new PointerEvent(type, { bubbles: true, pointerId: 9, button: 0, clientX: r.left + W() * 0.5, clientY: r.top + y })); };
    let y = 0, t = 300;
    at(() => openShow(0), t); t += 600;
    at(() => { y = H() * 0.42; fire('pointerdown', y); }, t);
    const path = (dy, n, gap) => { for (let k = 0; k < n; k++) at(() => fire('pointermove', (y += dy() / n)), (t += gap)); };
    path(() => H() * 0.25, 12, 30); t += 160;
    path(() => -H() * 0.14, 8, 30); t += 160;
    path(() => H() * 0.12, 4, 16);
    at(() => fire('pointerup', y), (t += 16));
  };
  root.querySelector('.rp').addEventListener('click', play);
  tm.push(setTimeout(() => { if (root.host.isConnected) play(); }, 60));
}
</script>
