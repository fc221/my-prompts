---
zh: 横向刻度尺调参
en: Horizontal scale dial
order: 20
---

## 是什么

中心指针不动，下面的刻度尺左右滑动改数值，每格吸附，指针上方实时显示“+0.35”，几个参数共用一把尺。

## 适合

修图调色、滤镜强度、曝光补偿、播放倍速这类要细调、一边看预览一边改的数值。

## 不适合

粗略的音量、亮度用普通滑块；要输入精确值（金额、数量）用数字输入；桌面端以鼠标为主时普通滑块更顺手。

## 注意

尺子动、指针不动，和滑块“圆钮动”正好相反；切换参数时尺子要滚到该参数自己的值，途中经过的数不能写进新参数。

## 要点

- 横向原生滚动 + scroll-snap-type: x mandatory，每格 8–10px、scroll-snap-align: center，左右内边距 calc(50% - 半格)，两端值也能对准指针。
- 每 5 格一根长刻度并标数字，其余是短刻度；尺子两端用 mask-image 渐隐。
- 指针固定在正中，上方显示带正负号的当前值（等宽数字）；改过的参数在图标上加一个小圆点。
- 拖动时预览实时变化（CSS filter 或画布），不需要再点确认。
- role="slider"，aria-label 写当前参数名，aria-valuetext 如“曝光 +0.35”；左右键一格、PageUp / PageDown 五格、Home / End 到两端。
- 切换参数时平滑滚到新值，途中的中间值不写入；用户中途拖动立即接管；鼠标拖动时临时关掉吸附。
- 减少动态效果时切换参数直接跳到位。

## 提示词

给{修图页}做「横向刻度尺调参」：上方预览图，下方一排参数按钮（{参数列表}，aria-pressed 表示当前项），再下方是横向刻度尺，中心指针固定不动；刻度尺用原生横向滚动 + scroll-snap-type: x mandatory，每格 10px 吸附，每 5 格一根长刻度带数字，两端渐隐；指针上方实时显示带正负号的数值（如 +0.35，等宽数字），拖动时预览实时变化；切换参数时刻度尺平滑滚到该参数当前值，途中的中间值不写入；role="slider"，aria-valuetext 写“参数名 + 数值”，左右键一格、PageUp / PageDown 五格；鼠标拖动时临时关掉吸附；减少动态效果时直接跳到位。

## 示例

<link rel="stylesheet" href="../../_shared/app-control-base.css">
<style>
.st{padding:10px 14px}
.ed{display:flex;flex-direction:column;gap:6px;height:100%;max-width:440px;margin:0 auto}
.ph{position:relative;flex:1 1 0;min-height:0;border-radius:12px;overflow:hidden;background:linear-gradient(180deg,#ffd29a 0%,#f7a072 32%,#d97b84 54%,#5b6f95 54.5%,#34496b 100%)}
.ph::after{content:"";position:absolute;left:0;right:0;top:54.5%;bottom:0;background:radial-gradient(ellipse 9% 40% at 72% 20%,rgba(255,226,170,.55),transparent),repeating-linear-gradient(180deg,rgba(255,255,255,.1) 0 1px,transparent 1px 6px)}
.sun{position:absolute;left:66%;top:22%;height:30%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#fff6d5 0 42%,rgba(255,232,170,.5) 44% 62%,transparent 64%)}
.m1,.m2{position:absolute;left:0;right:0;bottom:45.5%}
.m1{height:30%;background:#8e6a8f;clip-path:polygon(0 100%,0 62%,12% 34%,24% 58%,38% 12%,52% 52%,64% 28%,80% 60%,92% 30%,100% 44%,100% 100%)}
.m2{height:16%;background:#5a4a72;clip-path:polygon(0 100%,0 56%,18% 18%,34% 64%,50% 30%,68% 72%,84% 22%,100% 58%,100% 100%)}
.ps{flex:none;display:flex;justify-content:center;gap:6px}
.pa{position:relative;display:inline-flex;align-items:center;gap:4px;height:30px;padding:0 10px;border:0;border-radius:999px;background:transparent;color:#5b616e;font-size:12px}
.pa:hover{background:#e9ecf1}
.pa svg{flex:none;width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.4;stroke-linecap:round}
.pa .fl{fill:currentColor;stroke:none}
.pa[aria-pressed=true]{background:#1f2329;color:#fff}
.pa small{display:none;font-size:11px;font-variant-numeric:tabular-nums}
.pa.chg::after{content:"";position:absolute;top:4px;right:6px;width:5px;height:5px;border-radius:50%;background:#e8590c}
.rl{position:relative;flex:none;padding-top:20px;border-radius:8px}
.rl:has(.ru:focus-visible){outline:2px solid #3b5bdb;outline-offset:2px}
.val{position:absolute;top:0;left:50%;transform:translateX(-50%);color:#3b5bdb;font-size:13px;font-weight:600;line-height:18px;font-variant-numeric:tabular-nums;white-space:nowrap}
.rl::after{content:"";position:absolute;left:50%;top:19px;width:2px;height:22px;margin-left:-1px;border-radius:1px;background:#3b5bdb;pointer-events:none}
.ru{display:flex;height:38px;padding:0 calc(50% - 5px);overflow-x:auto;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;scrollbar-width:none;touch-action:pan-x;cursor:grab;-webkit-mask-image:linear-gradient(90deg,transparent,#000 18%,#000 82%,transparent);mask-image:linear-gradient(90deg,transparent,#000 18%,#000 82%,transparent)}
.ru:focus-visible{outline:none}
.ru::-webkit-scrollbar{display:none}
.ru.grab{scroll-snap-type:none;cursor:grabbing}
.ru i{position:relative;flex:none;width:10px;height:100%;font-style:normal;scroll-snap-align:center}
.ru i::before{content:"";position:absolute;left:4.5px;top:4px;width:1px;height:9px;background:#a3a9b4}
.ru i.lg::before{top:2px;height:16px;background:#5b616e}
.ru b{position:absolute;top:21px;left:50%;transform:translateX(-50%);color:#5b616e;font-size:10px;font-weight:400;line-height:12px;white-space:nowrap;font-variant-numeric:tabular-nums;user-select:none}
@container (min-height:220px){.pa{flex-direction:column;gap:0;height:auto;padding:4px 14px;border-radius:10px}
.pa small{display:block}
.pa.chg::after{top:5px;right:10px}
}
</style>

<div class="st"><div class="ed"><div class="ph" aria-hidden="true"><i class="sun"></i><i class="m1"></i><i class="m2"></i></div><div class="ps" role="group" aria-label="调整项"><button type="button" class="pa" aria-pressed="true"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="3"/><path d="M8 1.5v1.6M8 12.9v1.6M1.5 8h1.6M12.9 8h1.6M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M3.4 12.6l1.1-1.1M11.5 4.5l1.1-1.1"/></svg><span>曝光</span><small></small></button><button type="button" class="pa" aria-pressed="false"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6"/><path class="fl" d="M8 2a6 6 0 0 1 0 12z"/></svg><span>对比</span><small></small></button><button type="button" class="pa" aria-pressed="false"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.2c2.4 2.8 4.2 5 4.2 7.2a4.2 4.2 0 0 1-8.4 0C3.8 7.2 5.6 5 8 2.2z"/></svg><span>饱和</span><small></small></button></div><div class="rl"><span class="val" aria-hidden="true"></span><div class="ru" role="slider" tabindex="0" aria-label="曝光" aria-valuemin="-1" aria-valuemax="1"></div></div></div></div>

<script type="module">
export default function demo(root) {
  const STEP = 10, MID = 20, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ru = root.querySelector('.ru'), val = root.querySelector('.val'), ph = root.querySelector('.ph'), btns = [...root.querySelectorAll('.pa')];
  const P = btns.map((b) => ({ b, n: b.querySelector('span').textContent, v: MID }));
  const sign = (v) => (v > 0 ? '+' : v < 0 ? '−' : '');
  const fmt = (i) => { const v = (i - MID) / MID; return sign(v) + Math.abs(v).toFixed(2); };
  const clamp = (i) => Math.max(0, Math.min(MID * 2, i));
  ru.innerHTML = Array.from({ length: MID * 2 + 1 }, (_, i) => (i % 5 ? '<i></i>' : `<i class="lg"><b>${sign(i - MID) + Math.abs((i - MID) / MID)}</b></i>`)).join('');
  let cur = 0, lock = null, drag = null;
  const apply = () => {
    const [e, c, s] = P.map((p) => (p.v - MID) / MID), p = P[cur];
    ph.style.filter = `brightness(${1 + e * 0.45}) contrast(${1 + c * 0.5}) saturate(${1 + s})`;
    val.textContent = fmt(p.v); ru.setAttribute('aria-valuenow', ((p.v - MID) / MID).toFixed(2)); ru.setAttribute('aria-valuetext', `${p.n} ${fmt(p.v)}`);
    P.forEach((q) => { q.b.querySelector('small').textContent = fmt(q.v); q.b.classList.toggle('chg', q.v !== MID); });
  };
  const set = (i) => { P[cur].v = clamp(i); apply(); };
  // 程序滚动（切换参数、按键）途中锁住，经过的刻度不写入；到位或用户接手时解锁
  const go = (i, instant) => { const x = clamp(i) * STEP; lock = Math.abs(ru.scrollLeft - x) > 1 ? x : null; ru.scrollTo({ left: x, behavior: instant || still ? 'auto' : 'smooth' }); };
  ru.addEventListener('scroll', () => {
    if (lock !== null) { if (Math.abs(ru.scrollLeft - lock) > 1) return; lock = null; }
    const i = clamp(Math.round(ru.scrollLeft / STEP)); if (i !== P[cur].v) set(i);
  }, { passive: true });
  btns.forEach((b, k) => b.addEventListener('click', () => { cur = k; btns.forEach((x, j) => x.setAttribute('aria-pressed', String(j === k))); ru.setAttribute('aria-label', P[k].n); apply(); go(P[k].v); }));
  ru.addEventListener('keydown', (e) => {
    const v = P[cur].v, to = { ArrowLeft: v - 1, ArrowDown: v - 1, ArrowRight: v + 1, ArrowUp: v + 1, PageDown: v - 5, PageUp: v + 5, Home: 0, End: MID * 2 }[e.key];
    if (to === undefined) return; e.preventDefault(); set(to); go(to);
  });
  ru.addEventListener('wheel', () => { lock = null; }, { passive: true });
  ru.addEventListener('pointerdown', (e) => { lock = null; if (e.pointerType !== 'mouse' || e.button > 0) return; drag = { x: e.clientX, l: ru.scrollLeft }; ru.setPointerCapture(e.pointerId); ru.classList.add('grab'); });
  ru.addEventListener('pointermove', (e) => { if (drag) ru.scrollLeft = drag.l - (e.clientX - drag.x); });
  const up = () => { if (!drag) return; drag = null; ru.classList.remove('grab'); go(Math.round(ru.scrollLeft / STEP)); };
  ru.addEventListener('pointerup', up); ru.addEventListener('pointercancel', up);
  requestAnimationFrame(() => {
    go(MID, true); apply();
    // 演示：曝光滑到 +0.35，不加锁，数值跟着滚动实时变化
    setTimeout(() => { if (root.host.isConnected && cur === 0 && P[0].v === MID) ru.scrollTo({ left: 27 * STEP, behavior: still ? 'auto' : 'smooth' }); }, 350);
  });
}
</script>
