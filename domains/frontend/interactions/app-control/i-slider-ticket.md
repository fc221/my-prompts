---
zh: 滑杆弹出票券
en: Slider-driven ticket stack
aka: 滑杆调数量 票券堆叠 时长选择 优惠券滑杆 数量滑块
order: 40
---

## 是什么

拖动滑杆调数量或时长，上方的票券跟着一张张弹出、越叠越厚，票面金额同步变化；松手时滑块吸附到最近的整数。

## 适合

自习室时长、停车时长、活动票张数、充值档位、拼单份数这类有上限、值越大“得到越多”的数量选择，让数字变成一件看得见的东西。

## 不适合

普通设置项用「滑块」；要输入精确数量用「数字输入」；范围超过十几档时票券堆不下，改用「横向刻度尺调参」。

## 注意

票券只是数量的另一种表现：金额和数量以文字为准，整个票堆对读屏隐藏。滑杆拖动时走连续值，但票数和金额只按整数变化，半张票、带小数的金额都不该出现。

## 要点

- 滑杆用原生 input type="range"，step 设 0.01 让拖动连续；触屏拖动和点轨道跳转由浏览器提供，用 ::-webkit-slider-thumb 和 ::-moz-range-thumb 改样式
- 吸附：拖动时滑块跟手，change 事件（松手）时用 180ms 缓出补到最近的整数
- 票堆：最多 8 张，每多一张往上露出 6px、缩小 1.2%、颜色加深一点；新票用带回弹的曲线（如 cubic-bezier(.3,1.7,.5,1)）弹出 320ms
- 金额和数量在跨过整数的那一刻更新，等宽数字，金额放大到 1.14 倍再回弹一次
- 优惠门槛：过 4 小时盖上“9 折”小章，金额按折后算；回退时章要收回
- 填充色算到滑块中心：calc(滑块半径 + (100% − 滑块直径) × 比例)，两端才不露缝；刻度数字用同样的内边距，和滑块位置对齐
- 键盘：滑杆原生步长太细，拦截方向键改成每次 1 档，PageUp / PageDown 2 档，Home / End 到两端
- aria-valuetext 写“5 小时，合计 54 元，已打 9 折”；停下后用 role="status" 播报一次
- 减少动态效果时票券直接出现，吸附直接到位

## 提示词

给{预约页}做「滑杆弹出票券」：下方原生 input type="range"（范围 {最小值}–{最大值}，step 0.01），上方是一张票面（{品牌名}、金额、数量，右侧虚线撕口）；拖动时滑块连续跟手，松手后 180ms 吸附到最近的整数；票数和金额只按整数变：每多 1 档，后面弹出一张票，往上露出 6px、缩小 1.2%、颜色略深，用回弹曲线 320ms 弹出；金额（{单价}×数量）跨过整数时更新并回弹一下；数量达到{优惠门槛}时盖上{折扣}小章并按折后价算，回退时收回；滑杆填充色算到滑块中心，刻度数字和滑块位置对齐；方向键每次 1 档，PageUp / PageDown 2 档，Home / End 到两端；aria-valuetext 写“N {单位}，合计 M 元”，票堆对读屏隐藏，停下后用 role="status" 播报；减少动态效果时直接到位。

## 示例

<link rel="stylesheet" href="../../_shared/app-control-base.css">
<style>
.st{padding:10px 14px}
.box{display:grid;grid-template-rows:minmax(0,1fr) auto;gap:8px;height:100%;max-width:360px;margin:0 auto}
.pile{position:relative;display:grid;align-items:end;justify-items:center;min-height:0}
.tk,.ly{--r:7px;--cut:72%;width:min(100%,250px);height:76px;border-radius:12px;-webkit-mask:radial-gradient(circle var(--r) at var(--cut) 0,#0000 97%,#000) top/100% 51% no-repeat,radial-gradient(circle var(--r) at var(--cut) 100%,#0000 97%,#000) bottom/100% 51% no-repeat;mask:radial-gradient(circle var(--r) at var(--cut) 0,#0000 97%,#000) top/100% 51% no-repeat,radial-gradient(circle var(--r) at var(--cut) 100%,#0000 97%,#000) bottom/100% 51% no-repeat}
.ly{grid-area:1/1;z-index:calc(8 - var(--k));background:var(--b);box-shadow:inset 0 1.5px 0 rgba(255,255,255,.65);opacity:0;transform:translateY(0) scale(.94);transition:transform .32s cubic-bezier(.3,1.7,.5,1),opacity .12s}
.ly.on{opacity:1;transform:translateY(calc(var(--k)*-6px)) scale(calc(1 - var(--k)*.012))}
.tk{grid-area:1/1;position:relative;z-index:9;display:grid;grid-template-columns:72% 28%;background:linear-gradient(120deg,#ffd978,#ffb84d);color:#402600}
.mn{display:flex;flex-direction:column;justify-content:center;gap:1px;min-width:0;padding:0 14px}
.mn small{font-size:11px;font-weight:600;opacity:.78;white-space:nowrap}
.mn b{font-size:27px;font-weight:700;line-height:1.15;font-variant-numeric:tabular-nums}
.stub{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;border-left:1.5px dashed rgba(64,38,0,.4)}
.stub b{font-size:21px;font-weight:700;line-height:1.1;font-variant-numeric:tabular-nums}
.stub small{font-size:11px;opacity:.78}
.off{position:absolute;right:calc(28% + 8px);top:9px;padding:1px 6px;border-radius:6px;background:#b42318;color:#fff;font-size:11px;font-weight:600;line-height:16px;transform:rotate(-6deg) scale(.4);opacity:0;transition:transform .26s cubic-bezier(.3,1.8,.5,1),opacity .12s}
.off.on{opacity:1;transform:rotate(-6deg)}
.sl{display:grid;gap:1px}
input{--t:0;display:block;width:100%;height:24px;margin:0;background:none;cursor:grab;-webkit-appearance:none;appearance:none;touch-action:pan-y}
input:active{cursor:grabbing}
input::-webkit-slider-runnable-track{height:6px;border-radius:3px;background:linear-gradient(90deg,#e8890c calc(11px + (100% - 22px)*var(--t)),#dfe3e9 0)}
input::-moz-range-track{height:6px;border-radius:3px;background:linear-gradient(90deg,#e8890c calc(11px + (100% - 22px)*var(--t)),#dfe3e9 0)}
input::-webkit-slider-thumb{width:22px;height:22px;margin-top:-8px;border:2px solid #e8890c;border-radius:50%;background:#fff;box-shadow:0 2px 6px rgba(16,24,40,.22);-webkit-appearance:none;appearance:none}
input::-moz-range-thumb{width:18px;height:18px;border:2px solid #e8890c;border-radius:50%;background:#fff;box-shadow:0 2px 6px rgba(16,24,40,.22)}
.tc{display:flex;justify-content:space-between;margin:0 5px;color:#667085;font-size:11px;line-height:14px;font-variant-numeric:tabular-nums}
.tc span{width:12px;text-align:center;transition:color .12s}
.tc .on{color:#b35c00;font-weight:700}
@container (min-height:260px){.tk,.ly{width:min(100%,320px);height:116px}
.mn{padding:0 18px}
.mn small{font-size:12px}
.mn b{font-size:38px}
.stub b{font-size:30px}
.stub small{font-size:12px}
.off{top:14px;font-size:12px}
.ly.on{transform:translateY(calc(var(--k)*-8px)) scale(calc(1 - var(--k)*.012))}
}
</style>

<div class="st"><div class="box"><div class="pile" aria-hidden="true"><div class="tk"><div class="mn"><small>MyPrompts 自习室</small><b class="amt"></b></div><div class="stub"><b class="hr"></b><small>小时</small></div><em class="off" style="font-style:normal">9 折</em></div></div><div class="sl"><input type="range" min="1" max="8" step="0.01" value="1" aria-label="自习时长"><div class="tc" aria-hidden="true"></div></div></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const MIN = 1, MAX = 8, RATE = 12, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pile = root.querySelector('.pile'), r = root.querySelector('input'), amt = root.querySelector('.amt'), hr = root.querySelector('.hr'), off = root.querySelector('.off'), tc = root.querySelector('.tc'), sr = root.querySelector('.sr');
  pile.insertAdjacentHTML('afterbegin', Array.from({ length: MAX - 1 }, (_, i) => `<i class="ly" style="--k:${i + 1};--b:hsl(${36 - i * 2} 92% ${i % 2 ? 72 : 64}%)"></i>`).join(''));
  tc.innerHTML = Array.from({ length: MAX }, (_, i) => `<span>${i + 1}</span>`).join('');
  const ls = [...pile.querySelectorAll('.ly')], ts = [...tc.children];
  const price = (n) => Math.round(n * RATE * (n >= 4 ? 0.9 : 1));
  let n = 0, raf = 0, stop = false;
  const bump = (el) => { if (!still) el.animate([{ transform: 'scale(1.14)' }, { transform: 'none' }], { duration: 240, easing: 'cubic-bezier(.3,1.6,.5,1)' }); };
  // 滑杆连续走，票券和金额按四舍五入后的整数跳，松手再吸附到这个整数
  const set = (v) => {
    r.value = v; r.style.setProperty('--t', (v - MIN) / (MAX - MIN));
    const k = Math.round(v); if (k === n) return;
    n = k; ls.forEach((l, i) => l.classList.toggle('on', i < n - 1)); ts.forEach((t, i) => t.classList.toggle('on', i === n - 1));
    amt.textContent = '¥ ' + price(n); hr.textContent = n; off.classList.toggle('on', n >= 4); bump(amt);
    r.setAttribute('aria-valuetext', `${n} 小时，合计 ${price(n)} 元${n >= 4 ? '，已打 9 折' : ''}`);
  };
  const tween = (to, ms) => new Promise((done) => {
    cancelAnimationFrame(raf); if (still) { set(to); return done(); }
    const from = +r.value, t0 = performance.now();
    const go = (t) => { if (!root.host.isConnected) return; const p = Math.min(1, (t - t0) / ms); set(from + (to - from) * (1 - (1 - p) ** 3)); p < 1 ? (raf = requestAnimationFrame(go)) : done(); };
    raf = requestAnimationFrame(go);
  });
  const said = () => { sr.textContent = r.getAttribute('aria-valuetext'); };
  r.addEventListener('pointerdown', () => { stop = true; cancelAnimationFrame(raf); });
  r.addEventListener('input', () => { stop = true; cancelAnimationFrame(raf); set(+r.value); });
  r.addEventListener('change', () => { tween(Math.round(+r.value), 180).then(said); });
  r.addEventListener('keydown', (e) => {
    const to = { ArrowLeft: n - 1, ArrowDown: n - 1, ArrowRight: n + 1, ArrowUp: n + 1, PageDown: n - 2, PageUp: n + 2, Home: MIN, End: MAX }[e.key];
    if (to === undefined) return; e.preventDefault(); stop = true; cancelAnimationFrame(raf); set(Math.max(MIN, Math.min(MAX, to))); said();
  });
  set(1);
  // 自动演示：从 1 小时拖到 5 小时再吸附，途中过 4 小时盖上折扣章
  setTimeout(() => { if (root.host.isConnected && !stop) tween(5.3, 900).then(() => { if (!stop) tween(5, 180); }); }, 300);
}
</script>
