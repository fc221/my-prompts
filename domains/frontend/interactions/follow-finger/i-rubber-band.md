---
zh: 拉过头会回弹
en: Rubber-band overscroll
order: 30
---

## 是什么

拖到内容尽头后还能再拉出一小段，但越拉越拉不动，松手平滑弹回边界。让人感觉到“到头了”，而不是像撞墙一样戛然而止。

## 适合

自己用手势驱动的区域：自定义横滑卡片和转盘的首尾、拉到最高还往上拉的底部面板、放大后平移到边缘的图片、可拖动的地图和画布。

## 不适合

浏览器或系统原生滚动已经自带回弹时（如 iOS 的页面和滚动容器）不要再叠一层，会弹两次；拉过头要触发刷新的是「下拉刷新」；回弹本身不代表加载，到底加载用「无限滚动与加载更多」。

## 注意

越界位移要从 0 开始连续增长：刚越界时内容仍按约 0.6 倍跟着手指，之后才越来越“重”，并且有上限。一越界就跳一下、或者能无限拉出空白，都是做错了。

## 要点

- 记两份数：真实位置夹在 [0, 最大值] 里，超出的部分单独记作“越界量”
- 显示位移 = 上限 × (1 − e^(−越界量 × 0.6 ÷ 上限))：起步约 0.6 倍跟手、越拉越慢、永远到不了上限；上限取容器尺寸的 1/4 左右
- 越界时露出来的区域用和内容区相近的底色，不露出刺眼的空白
- 松手后从当前越界量用 280–360ms 缓出回到边界；回弹途中再按下，从画面上的当前位置接着拖
- 往回拖进正常范围时，越界量归零和正常滚动无缝衔接，不顿一下
- 滚轮、键盘、滚动条只在合法范围内滚动，不触发越界
- 减少动态效果时越界位移减半，松手直接回到边界

## 提示词

给{产品}里的{自定义拖动区域}加「拉过头会回弹」：真实位置夹在合法范围内，超出部分单独记作越界量；显示位移 = 上限 × (1 − e^(−越界量 × 0.6 ÷ 上限))，上限取容器尺寸的 1/4，起步约 0.6 倍跟手、越拉越慢、拉不出上限；越界时露出的区域用接近内容的底色；松手从当前越界量 300ms 缓出回到边界，回弹中再按下从当前位置继续拖；拖回范围内时无缝衔接；滚轮和键盘只在范围内滚动；原生滚动已有回弹的地方不再叠加；减少动态效果时越界减半、松手直接回位。

## 示例

<link rel="stylesheet" href="../../_shared/app-control-base.css">
<style>
.st{display:grid;grid-template-rows:minmax(0,1fr) auto auto;grid-template-areas:'vp' 'side' 'msg';gap:8px;padding:10px 12px;background:linear-gradient(155deg,#ecf3f1,#d7e3df)}
.vp{grid-area:vp;align-self:center;height:min(100%,170px);overflow:auto hidden;overscroll-behavior:contain;scrollbar-width:none;border-radius:14px;background:#e3ece9;touch-action:none;user-select:none;-webkit-user-select:none;cursor:grab}
.vp::-webkit-scrollbar{display:none}
.vp:focus-visible{outline-offset:-2px}
.ct{display:flex;gap:8px;width:max-content;height:100%;margin:0;padding:8px 10px;list-style:none;transition:none}
.ct li{flex:none;display:grid;grid-template-rows:minmax(0,1fr) auto auto;width:112px;padding:6px;border-radius:12px;background:#fff}
.ct i{min-height:0;border-radius:8px;background:var(--g)}
.ct b{margin-top:5px;font-size:11.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ct small{color:#6b7280;font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.side{grid-area:side;display:flex;align-items:center;gap:8px;min-width:0}
.side .ctl{height:28px;padding:0 10px;font-size:12px;white-space:nowrap}
.seg{display:flex;flex:none;padding:2px;border-radius:8px;background:#dde7e3}
.seg button{height:24px;padding:0 7px;border:0;border-radius:6px;background:none;color:#4b5563;font-size:11px;white-space:nowrap}
.seg [aria-pressed=true]{background:#fff;color:#111827;font-weight:600;box-shadow:0 1px 2px rgba(17,24,39,.12)}
.ro{display:flex;gap:4px;align-items:baseline;margin:0 0 0 auto;color:#4b5563;font-size:11px;white-space:nowrap}
.ro b{color:#111827;font:600 12px/1.35 ui-monospace,SFMono-Regular,Menlo,monospace;font-variant-numeric:tabular-nums}
.msg{grid-area:msg;margin:0;min-height:17px;color:#374151;font-size:11.5px;line-height:1.5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ch{display:none;grid-area:ch;align-self:center;width:200px;height:auto}
.ch text{fill:#6b7280;font-size:9px}
@container (min-width:560px){.st{grid-template-columns:minmax(0,1fr) 200px;grid-template-areas:'vp ch' 'side ch' 'msg ch';gap:8px 24px;padding:14px 20px}
.ch{display:block}
.vp{height:min(100%,190px)}
.ct li{width:128px}
.ct b{font-size:12.5px}
.ct small{font-size:11px}
.msg{font-size:12.5px}
}
</style>

<div class="st"><div class="vp" tabindex="0" aria-label="周末好去处，可左右拖动或用方向键滚动"><ul class="ct"></ul></div><div class="side"><button type="button" class="ctl rp">重播</button><div class="seg" role="group" aria-label="越界方式"><button type="button" aria-pressed="true" data-m="band">阻尼</button><button type="button" aria-pressed="false" data-m="hard">硬停</button></div><p class="ro"><span>多拉</span><b class="ov">0px</b><span>露出</span><b class="sh">0px</b></p></div><svg class="ch" viewBox="0 0 200 110" aria-hidden="true"><path d="M24 92H192M24 92V8" stroke="#c4cdd0" fill="none"/><path d="M24 92 80 12" stroke="#9aa4a8" stroke-dasharray="3 3" fill="none"/><path class="cv" stroke="#0f766e" stroke-width="2" fill="none"/><circle class="pk" r="3.5" fill="#fff" stroke="#0f766e" stroke-width="1.5" opacity="0"/><circle class="pt" r="3.5" fill="#0f766e"/><text x="84" y="16">1 : 1 跟手</text><text x="150" y="105">手指多拉</text><text x="2" y="8">露出</text></svg><p class="msg" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const vp = root.querySelector('.vp'), ct = root.querySelector('.ct'), ov = root.querySelector('.ov'), shw = root.querySelector('.sh'), msg = root.querySelector('.msg');
  const cv = root.querySelector('.cv'), pt = root.querySelector('.pt'), pk = root.querySelector('.pk');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const CARDS = [['滨江夜跑', '周五 21:00 · 江堤', '#1e3a8a,#60a5fa'], ['老城咖啡', '步行 15 分钟', '#92400e,#fbbf24'], ['山顶日出', '05:30 出发', '#f97316,#fde68a'], ['市集淘旧书', '周六 10:00', '#4d7c0f,#bef264'], ['江边野餐', '自带餐垫', '#0f766e,#99f6e4'], ['美术馆新展', '免费预约', '#6d28d9,#c4b5fd'], ['露天电影', '周日 19:30', '#111827,#6b7280'], ['骑行环湖', '全程 18 km', '#be123c,#fda4af']];
  ct.innerHTML = CARDS.map(([b, s, g]) => `<li><i style="--g:linear-gradient(160deg,${g})"></i><b>${b}</b><small>${s}</small></li>`).join('');
  // 真实位置用原生 scrollLeft（滚轮、键盘、滚动条天然只在范围内），越界部分用加长的左 / 右内边距画出来；
  // .ct 设了 transition: none，否则减少动态效果的全局过渡会让内边距慢一拍、量到的宽度不对
  const PL = 10, PR = 10;
  let raw = 0, extra = 0, hard = false, d = null, tok = 0, tm = [];
  const M = () => vp.clientWidth / 4 * (still ? 0.5 : 1); // 上限：容器宽度的 1/4，减少动态效果时减半
  const max = () => Math.max(0, ct.offsetWidth - extra - vp.clientWidth);
  const R = (o) => (hard ? 0 : M() * (1 - Math.exp(-0.6 * o / M()))); // 起步约 0.6 倍、越拉越慢、到不了上限
  const inv = (v) => (hard || v <= 0 ? 0 : -(M() / 0.6) * Math.log(1 - Math.min(v, M() * 0.999) / M()));
  const over = () => (raw < 0 ? -raw : raw > max() ? raw - max() : 0);
  const paint = () => {
    const m = max(), o = over(), r = R(o);
    extra = o ? r : 0; ct.style.paddingLeft = PL + (raw < 0 ? r : 0) + 'px'; ct.style.paddingRight = PR + (raw > m ? r : 0) + 'px';
    vp.scrollLeft = raw < 0 ? 0 : raw > m ? m + r : raw;
    ov.textContent = Math.round(o) + 'px'; shw.textContent = Math.round(r) + 'px';
    // 图：横轴手指多拉、纵轴露出，单位都是上限 M
    pt.setAttribute('cx', String(24 + Math.min(168, o / M() * 56))); pt.setAttribute('cy', String(92 - r / M() * 80));
  };
  const curve = () => { let s = 'M24 92'; for (let i = 1; i <= 30; i++) { const o = (i / 30) * 3 * M(); s += ` L${(24 + (o / M()) * 56).toFixed(1)} ${(92 - (R(o) / M()) * 80).toFixed(1)}`; } cv.setAttribute('d', s); };
  const back = () => { // 从当前越界量缓出回到边界
    const id = ++tok, lo = raw < 0, b = lo ? 0 : max(), from = R(over()), ms = still ? 0 : 320, t0 = performance.now();
    const f = (t) => {
      if (id !== tok || !root.host.isConnected) return;
      const k = ms ? Math.min(1, (t - t0) / ms) : 1, v = from * Math.pow(1 - k, 3);
      raw = lo ? -inv(v) : b + inv(v); paint();
      if (k < 1) requestAnimationFrame(f); else { raw = b; paint(); }
    };
    requestAnimationFrame(f);
  };
  vp.addEventListener('pointerdown', (e) => {
    if (e.button > 0) return;
    tok++; // 回弹途中按下：raw 由画面上的位置反推，接着拖不跳
    d = { x0: e.clientX, r0: raw };
    try { vp.setPointerCapture(e.pointerId); } catch {}
  });
  vp.addEventListener('pointermove', (e) => { if (!d) return; raw = d.r0 - (e.clientX - d.x0); paint(); });
  const up = () => {
    if (!d) return;
    const o = over(), r = R(o); d = null;
    if (!o) return;
    pk.setAttribute('cx', pt.getAttribute('cx')); pk.setAttribute('cy', pt.getAttribute('cy')); pk.setAttribute('opacity', '1');
    msg.textContent = hard ? `多拉了 ${Math.round(o)}px，卡片一动不动，像撞墙` : `多拉 ${Math.round(o)}px，卡片只跟了 ${Math.round(r)}px，松手回到${raw < 0 ? '开头' : '末尾'}`;
    back();
  };
  vp.addEventListener('pointerup', up); vp.addEventListener('pointercancel', up);
  vp.addEventListener('scroll', () => { if (!d && !extra) raw = vp.scrollLeft; }); // 滚轮、键盘滚动后同步真实位置
  root.querySelectorAll('.seg button').forEach((b) => b.addEventListener('click', () => {
    hard = b.dataset.m === 'hard'; root.querySelectorAll('.seg button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    curve(); pk.setAttribute('opacity', '0'); paint(); msg.textContent = hard ? '已切到“硬停”，点重播对比' : '已切到“阻尼”';
  }));
  // 自动演示：在开头继续往右拉 150px，停一下，松手弹回
  const play = () => {
    tm.forEach(clearTimeout); tm = []; tok++; d = null; raw = 0; paint(); pk.setAttribute('opacity', '0'); msg.textContent = '';
    const r = vp.getBoundingClientRect(), x0 = r.left + 40, y = r.top + r.height / 2;
    const fire = (type, x) => vp.dispatchEvent(new PointerEvent(type, { bubbles: true, pointerId: 9, button: 0, clientX: x, clientY: y }));
    const at = (fn, t) => tm.push(setTimeout(() => { if (root.host.isConnected) fn(); }, t));
    at(() => fire('pointerdown', x0), 300);
    for (let k = 1; k <= 20; k++) at(() => fire('pointermove', x0 + 150 * k / 20), 300 + k * 30);
    at(() => fire('pointerup', x0 + 150), 300 + 21 * 30 + 700);
  };
  new ResizeObserver(() => { curve(); if (!d) { raw = Math.max(0, Math.min(max(), raw)); paint(); } }).observe(vp);
  root.querySelector('.rp').addEventListener('click', play);
  curve(); paint();
  tm.push(setTimeout(() => { if (root.host.isConnected) play(); }, 60));
}
</script>
