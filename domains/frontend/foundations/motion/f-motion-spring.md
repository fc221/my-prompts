---
zh: 弹簧动画
en: Spring animation
aka: 弹性动画 spring 物理动画 跟手回弹 刚度 阻尼 linear()
order: 40
---

## 是什么

用弹簧模型算出每一帧：元素被拉向目标，没有固定时长，松手时接着手指的位置和速度继续走，再慢慢停稳。示例里两个球同时跟手，松手后一个走固定时长缓动，一个走弹簧。

## 适合

拖甩、关闭照片、拉面板、卡片回弹、下拉回弹，这类手指刚离开屏幕就要接上的动画。

## 不适合

没有手势的淡入淡出、颜色和悬停变化用「时长与缓动曲线」；动画中途被手指接住看「动画没停也能接住」；连点开关看「可打断、轻退场」。

## 注意

固定时长的曲线自带初速度：手指还在往外甩，松手第一帧就变成往回走，速度一步跳变，手感像断了一下。弹簧的初速度来自松手速度，位置和速度都连续。CSS 的 linear() 曲线起点速度是写死的，只能用于点击触发的场景，跟手场景要用脚本。

## 要点

- 输入三个量：松手位置、松手速度（取最后 50–100ms 的位移算）、目标位置
- 每帧计算：加速度 = −刚度 × 离目标的距离 − 阻尼 × 速度，质量取 1，速度和位置逐帧累加
- 调刚度：决定快慢，越大越干脆；约 120 舒缓，约 180 日常，300 以上利落
- 调阻尼：决定回弹，看阻尼比 = 阻尼 ÷（2 × √刚度）；约 0.8 轻微过冲，手感最自然；1 以上不过冲；0.5 以下明显弹跳
- 调法：先定刚度，再用阻尼比收回弹，要关闭、收起的动作用 1，要活泼的用 0.6–0.7
- 停止条件：离目标小于 0.5px 且速度小于 5px/s 时，直接吸到目标值并结束循环
- 只动 transform，透明度、圆角这类跟随属性按位移换算，全程能被再次按住
- 纯 CSS 近似：脚本算好弹簧曲线，采样二三十个点写成 linear(0, 0.2, 0.6, 1.04, 1.01, 1)，时长取曲线停稳的时间，用于点击触发的动画
- 减少动态效果：跳过弹簧，直接到位或 150ms 淡入，手势本身的跟手保留

## 提示词

把{拖甩关闭、拉面板等手势}的松手动画改成弹簧：拖动时元素一比一跟手；松手时取最后 80ms 的位移算速度，把位置和速度作为弹簧初值，目标是{目标位置}；每帧按“加速度 = −刚度 × 距离 − 阻尼 × 速度”累加，刚度 {刚度，如 180}，阻尼比 {阻尼比，如 0.8}；离目标小于 0.5px 且速度小于 5px/s 时吸到目标值并结束；只动 transform；动画途中再次按下，从当前位置接住；松手速度超过 {关闭速度} 或位移超过{关闭距离}时目标改为关闭位置，否则回到原位；减少动态效果时跳过弹簧直接到位。给出刚度和阻尼两个常量，放在一处方便调。

## 示例

<style>
.st{height:100%;display:flex;flex-direction:column;gap:6px;padding:9px 12px;background:#f5f6f8;color:#1f2329;font:12px/16px system-ui,"PingFang SC",sans-serif}
.top{flex:none;display:flex;align-items:center;justify-content:space-between;gap:8px;color:#5b616e}
.top .ctl{flex:none;height:28px;padding:0 12px;font-size:12px}
.main{flex:none;display:flex;flex-direction:column;gap:6px;min-width:0}
.lane{--c:#8a909c;position:relative;height:40px;border-radius:10px;background:#fff;box-shadow:0 0 0 1px #e3e6eb;touch-action:none;cursor:grab;user-select:none}
.lane.sp{--c:#3b5bdb}
.lane span{position:absolute;right:10px;top:12px;color:var(--c);font-weight:600;pointer-events:none}
.lane.sp span{color:#2f49b8}
.lane.ez span{color:#5b616e}
.ball{position:absolute;left:6px;top:6px;width:28px;height:28px;border-radius:50%;background:var(--c);box-shadow:0 2px 5px rgba(15,23,42,.3);transform:translateX(var(--x,0))}
.mk{position:absolute;top:0;bottom:0;left:calc(20px + var(--m,0px));width:0;border-left:1px dashed #8a909c;opacity:0}
.st.ran .mk{opacity:1}
.msg{flex:1;min-height:0;margin:0;color:#454b57}
.side{display:none}
.plot{height:92px;border-radius:10px;background:#fff;box-shadow:0 0 0 1px #e3e6eb}
.plot svg{display:block;width:100%;height:100%}
.plot line{stroke:#dfe2e8;stroke-width:1;vector-effect:non-scaling-stroke}
.plot polyline{fill:none;stroke-width:2;stroke-linejoin:round;vector-effect:non-scaling-stroke}
.plot .a{stroke:#8a909c}
.plot .b{stroke:#3b5bdb}
.cap{margin:0;color:#5b616e}
.sl{display:grid;grid-template-columns:30px minmax(0,1fr) 28px;align-items:center;gap:6px;font-variant-numeric:tabular-nums}
.sl input{width:100%;margin:0;accent-color:#3b5bdb}
.sl output{text-align:right}
.tip{margin:0;color:#2f49b8;font-weight:600}
@container (min-height:260px){
.st{display:grid;grid-template-columns:minmax(0,1fr) 250px;grid-template-rows:auto auto minmax(0,1fr);column-gap:14px;padding:12px 16px;font-size:13px;line-height:18px}
.top{grid-column:1}
.main{grid-column:1;gap:10px}
.lane{height:56px}
.lane span{top:19px}
.ball{left:10px;top:10px;width:36px;height:36px}
.mk{left:calc(28px + var(--m,0px))}
.msg{grid-column:1}
.side{grid-column:2;grid-row:1/4;display:flex;flex-direction:column;gap:6px;min-height:0}
}
</style>

<div class="st"><div class="top"><span>拖小球甩出去再松手</span><button type="button" class="ctl go">甩一下</button></div><div class="main"><div class="lane ez" aria-label="固定时长缓动"><i class="mk"></i><div class="ball"></div><span>缓动 300ms</span></div><div class="lane sp" aria-label="弹簧"><i class="mk"></i><div class="ball"></div><span>弹簧</span></div></div><p class="msg" role="status">两个球同时跟手，松手后各走各的</p><div class="side"><div class="plot" aria-hidden="true"><svg viewBox="0 0 200 92" preserveAspectRatio="none"><line x1="0" y1="46" x2="200" y2="46"/><line class="t0" x1="20" y1="0" x2="20" y2="92"/><polyline class="a"/><polyline class="b"/></svg></div><p class="cap">速度曲线：竖线是松手。灰线一步跳开，蓝线连着走</p><label class="sl">刚度<input type="range" class="k" min="60" max="400" step="10" value="180"><output class="kv"></output></label><label class="sl">阻尼<input type="range" class="c" min="6" max="40" step="1" value="22"><output class="cv"></output></label><p class="tip"></p></div></div>

<script type="module">
export default function demo(root) {
  const $ = (q) => root.querySelector(q);
  const st = $('.st'), lanes = [...root.querySelectorAll('.lane')], balls = [...root.querySelectorAll('.ball')], msg = $('.msg');
  const DUR = 300, SPAN = 1100;
  const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const room = () => lanes[0].clientWidth - balls[0].offsetWidth - 2 * balls[0].offsetLeft;
  const put = (i, x) => balls[i].style.setProperty('--x', x + 'px');
  let k = 180, c = 22, run = 0, drag = null;

  const tune = () => {
    const z = c / (2 * Math.sqrt(k));
    $('.kv').textContent = k;
    $('.cv').textContent = c;
    $('.tip').textContent = `阻尼比 ${z.toFixed(2)}：${z < 0.55 ? '明显回弹，偏活泼' : z < 0.95 ? '轻微过冲，手感最自然' : '不过冲，慢慢靠拢'}`;
  };

  const plot = (x0, v0, ptsA, ptsB) => {
    const top = Math.max(Math.abs(v0), (3 * x0) / (DUR / 1000), 1);
    const line = (pts) => [[-90, v0], ...pts].map(([t, v]) => `${(20 + (t / SPAN) * 180).toFixed(1)},${(46 - (v / top) * 42).toFixed(1)}`).join(' ');
    $('.a').setAttribute('points', line(ptsA));
    $('.b').setAttribute('points', line(ptsB));
  };

  const release = (x0, v0) => {
    const id = ++run;
    st.classList.add('ran');
    root.querySelectorAll('.mk').forEach((m) => m.style.setProperty('--m', x0 + 'px'));
    if (still()) {
      put(0, 0);
      put(1, 0);
      msg.textContent = '减少动态效果已开启：松手直接回到原位';
      return;
    }
    const t0 = performance.now(), a = [], b = [];
    let x = x0, v = v0, last = t0;
    const tick = (now) => {
      if (id !== run || !root.host.isConnected) return;
      const dt = Math.min(now - last, 32) / 1000, t = now - t0, p = Math.min(t / DUR, 1);
      last = now;
      for (let i = 0; i < 8; i++) {
        v += ((-k * x - c * v) * dt) / 8;
        x += (v * dt) / 8;
      }
      put(0, x0 * (1 - p) ** 3);
      put(1, Math.max(x, -6));
      a.push([t, (-3 * x0 * (1 - p) ** 2 * 1000) / DUR]);
      b.push([t, v]);
      plot(x0, v0, a, b);
      if (p < 1 || Math.abs(x) > 0.3 || Math.abs(v) > 4) return requestAnimationFrame(tick);
      put(1, 0);
    };
    requestAnimationFrame(tick);
    const ez = Math.round((3 * x0 * 1000) / DUR), s = Math.round(v0);
    msg.textContent = `松手速度 ${s} px/s：缓动一下变成 ${-ez} px/s；弹簧接着 ${s} 走`;
  };

  const flick = () => {
    const id = ++run, x0 = room() * 0.5, ms = 130, t0 = performance.now();
    if (still()) return release(x0, 0);
    const tick = (now) => {
      if (id !== run || !root.host.isConnected) return;
      const p = Math.min((now - t0) / ms, 1);
      put(0, x0 * p);
      put(1, x0 * p);
      if (p < 1) return requestAnimationFrame(tick);
      release(x0, (x0 / ms) * 1000);
    };
    requestAnimationFrame(tick);
  };

  const follow = (e) => {
    const r = lanes[0].getBoundingClientRect();
    const x = Math.max(0, Math.min(room(), e.clientX - r.left - balls[0].offsetLeft - balls[0].offsetWidth / 2));
    const t = e.timeStamp;
    drag.pts = [...drag.pts.filter((p) => t - p.t < 80), { t, x }];
    put(0, x);
    put(1, x);
  };
  const speed = (pts) => {
    const a = pts[0], b = pts[pts.length - 1];
    return b.t - a.t < 8 ? 0 : ((b.x - a.x) / (b.t - a.t)) * 1000;
  };
  lanes.forEach((l) => {
    l.addEventListener('pointerdown', (e) => {
      run++;
      l.setPointerCapture(e.pointerId);
      drag = { pts: [] };
      follow(e);
    });
    l.addEventListener('pointermove', (e) => { if (drag) follow(e); });
    const up = () => {
      if (!drag) return;
      const pts = drag.pts;
      drag = null;
      release(pts[pts.length - 1].x, speed(pts));
    };
    l.addEventListener('pointerup', up);
    l.addEventListener('pointercancel', up);
  });
  $('.go').addEventListener('click', flick);
  $('.k').addEventListener('input', (e) => { k = +e.target.value; tune(); });
  $('.c').addEventListener('input', (e) => { c = +e.target.value; tune(); });
  root.querySelectorAll('.sl input').forEach((i) => i.addEventListener('change', flick));
  tune();
  setTimeout(() => { if (root.host.isConnected) flick(); }, 200);
}
</script>
