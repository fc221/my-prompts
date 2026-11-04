---
zh: 拉绳开关灯
en: Pull-cord switch
aka: 拉绳开关 灯绳 拉线开关 开灯切换 深色模式开关 pull cord
order: 120
---

## 是什么

页面边上垂下一根灯绳，往下拉一下松手，绳子弹回去、灯亮起来，页面同时换成浅色；再拉一次灯灭，换回深色。用拟物的方式做主题切换或彩蛋。

## 适合

个人主页、作品集、活动页、儿童和游戏类产品里的主题切换或彩蛋，要的是好玩、让人愿意多拉两下。

## 不适合

后台和高频设置用普通的「开关」；要在浅色、深色、跟随系统三档里选，用「按钮组与分段控件」。

## 注意

灯绳只有开、关两态。产品支持“跟随系统”时，拉一下就按眼前的明暗反过来，并记成手动选择；“跟随系统”留在设置里。

## 要点

- 绳子用 SVG path 画，上端固定，下端是 44×44 的拉手（看得见的绳坠约 12×20）；拉动时下端一比一跟手，最多拉长 80px，横向只跟手指的一半、最多 ±24px；中段用二次贝塞尔微弯，回弹冲过头、绳子变短时多弯一点，像松掉的绳子。
- 拉过 40px 绳坠变色、轻震一次（navigator.vibrate(8)），提示换成“松手开灯”；拉回 40px 以内再松手只回弹不切换，并提示“拉得不够，没开灯”。
- 松手用「弹簧动画」回弹：竖直刚度约 300、阻尼比 0.4，横向刚度约 70、阻尼比 0.18；竖直拉也给一点横向初速度，左右摆 2–3 下衰减到停；回弹途中再按住，从当前位置接着拉。
- 切换的那一刻灯、页面主题和状态文字一起变：灯泡和光晕 240ms 亮起或熄灭，背景和文字颜色 320ms 过渡；状态文字写结果（“灯亮着 · 浅色”），不写“已切换”。
- 拉手是 role="switch" 的按钮，带 aria-checked 和名称，可聚焦；空格 / 回车、点按和读屏双击都走 click，直接切换，绳子自己往下抖一下；拖完松手浏览器还会补发一次 click，按 event.detail 不为 0 把它忽略（键盘触发的是 0）；状态文字用 role="status" 播报。
- touch-action: none 只设在拉手上，并屏蔽长按菜单和文字选择；深色下焦点环换浅一档的颜色，保证看得见。
- 主题存到本地，下次打开在首次绘制前就用上，不闪一下。
- 减少动态效果时绳子照样跟手，松手直接回到原位、不弹不摆，主题直接换、不过渡。

## 提示词

给{个人主页}做「拉绳开关灯」：{页面右上角}垂下一根 SVG 灯绳，上端固定，下端是 44×44 的拉手；拉动时下端一比一跟手，最多拉长 80px，横向跟手指的一半、最多 ±24px，中段用二次贝塞尔微弯；拉过 40px 绳坠变色、轻震一次，提示换成“松手开灯 / 松手关灯”，不到 40px 松手只回弹不切换并提示拉得不够；松手用弹簧回弹（竖直刚度 300、阻尼比 0.4，横向刚度 70、阻尼比 0.18），左右摆 2–3 下停住，回弹途中能再按住接着拉；切换时灯和光晕 240ms 亮起或熄灭，页面在{浅色 / 深色}主题之间切换，颜色 320ms 过渡，状态文字写“灯亮着 · 浅色”这样的结果并用 role="status" 播报；拉手是 role="switch" 的按钮，带 aria-checked，空格 / 回车和点按都直接切换，拖完松手补发的那次 click 不算；touch-action: none 只设在拉手上；产品有“跟随系统”时，拉一下按眼前的明暗反过来并记成手动选择；主题存到本地，首次绘制前应用；减少动态效果时松手直接回原位、主题直接换。

## 示例

<link rel="stylesheet" href="../../_shared/app-control-base.css">
<style>
.st{--bg:#fbf5ea;--ink:#2b2620;--mute:#6b6257;--cord:#8c7a66;--shade:#3a342d;display:grid;grid-template-columns:minmax(0,128px) minmax(0,1fr);background:var(--bg);color:var(--ink);transition:background-color .32s,color .32s}
.st.dark{--bg:#161b24;--ink:#e8ebf1;--mute:#a3abbb;--cord:#7f899c;--shade:#465063}
.scene{position:relative;min-width:0;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}
.lamp{position:absolute;left:-8px;top:0;width:120px;height:180px;overflow:visible}
.wire{stroke:var(--cord);stroke-width:1.5}
.cap,.shade{fill:var(--shade);transition:fill .32s}
.bulb{fill:#ffe39a;transition:fill .24s}
.dark .bulb{fill:#566074}
.lit{transition:opacity .24s}
.dark .lit{opacity:0}
.rig{position:absolute;left:84%;top:0;width:0;height:0}
.cord{position:absolute;left:0;top:0;width:1px;height:1px;overflow:visible}
.cord path{fill:none;stroke:var(--cord);stroke-width:2;stroke-linecap:round}
.cord rect{fill:var(--shade);transition:fill .32s}
.pull{position:absolute;left:-22px;top:-22px;width:44px;height:44px;padding:0;border:0;border-radius:50%;background:none;touch-action:none;cursor:grab;transition:none}
.pull::before{content:"";position:absolute;left:16px;top:12px;width:12px;height:20px;border-radius:6px;background:linear-gradient(90deg,#c99a68,#e6c9a2 45%,#a8784b);box-shadow:0 2px 4px rgba(40,30,20,.25);transition:transform .16s,background .16s}
.dark .pull::before{background:linear-gradient(90deg,#7c869a,#b0b8c8 45%,#687286)}
.pull.arm::before{background:#e8590c;transform:scale(1.15)}
.dark .pull:focus-visible{outline-color:#8da2ff}
.copy{display:grid;align-content:center;gap:4px;min-width:0;padding:16px 16px 16px 4px}
.copy>*{margin:0}
.ey{color:var(--mute);font-size:12px}
.h{font-size:18px;line-height:1.3}
.state{margin-top:4px;font-size:14px;font-weight:600}
.tip{color:var(--mute);font-size:12px;text-wrap:balance}
@container (min-width:560px){.st{grid-template-columns:minmax(0,280px) minmax(0,1fr)}
.lamp{left:24px;width:160px;height:240px}
.copy{gap:8px;padding:24px 32px 24px 8px}
.h{font-size:24px}
.state{font-size:16px}
.tip{font-size:13px}
}
</style>

<div class="st dark">
  <div class="scene">
    <svg class="lamp" viewBox="0 0 120 180" aria-hidden="true"><defs><radialGradient id="pc-g"><stop offset="0" stop-color="#ffd36b" stop-opacity=".8"/><stop offset="1" stop-color="#ffd36b" stop-opacity="0"/></radialGradient><linearGradient id="pc-c" x2="0" y2="1"><stop offset="0" stop-color="#ffc861" stop-opacity=".5"/><stop offset="1" stop-color="#ffc861" stop-opacity="0"/></linearGradient></defs><g class="lit"><path d="M42 62H78L118 180H2Z" fill="url(#pc-c)"/><circle cx="60" cy="66" r="40" fill="url(#pc-g)"/></g><path class="wire" d="M60 0V32"/><rect class="cap" x="55" y="30" width="10" height="7" rx="2"/><path class="shade" d="M36 62C38 47 47 37 60 37S82 47 84 62Z"/><circle class="bulb" cx="60" cy="66" r="7"/></svg>
    <div class="rig"><svg class="cord" aria-hidden="true"><rect x="-5" y="0" width="10" height="4" rx="1"/><path d=""/></svg><button type="button" class="pull" role="switch" aria-checked="false" aria-label="灯（开灯为浅色主题）" aria-describedby="pc-tip"></button></div>
  </div>
  <div class="copy">
    <small class="ey">MyPrompts 的小站</small>
    <b class="h">拉一下灯绳</b>
    <p class="state" role="status">灯关了 · 深色</p>
    <p class="tip" id="pc-tip">往下拉再松手，或按空格</p>
  </div>
</div>

<script type="module">
export default function demo(root) {
  const st = root.querySelector('.st'), scene = root.querySelector('.scene'), path = root.querySelector('.cord path'), pull = root.querySelector('.pull'), state = root.querySelector('.state'), tip = root.querySelector('.tip');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches, TIP = tip.textContent;
  const MAX = 80, PASS = 40, KY = 300, CY = 2 * Math.sqrt(KY) * 0.4, KX = 70, CX = 2 * Math.sqrt(KX) * 0.18; // 竖直阻尼比 0.4 回弹，横向 0.18 摆两三下
  let on = false, x = 0, y = 0, vx = 0, vy = 0, raf = 0, last = 0, d = null, skip = false, side = 1, arm = false;
  const draw = () => {
    const L = Math.min(120, scene.clientHeight * 0.44), ey = L + y, bend = x * 0.3 - vx * 0.03 + Math.sqrt(Math.max(0, -y) * L) * 0.35; // 冲过头绳子变短时多弯一点
    path.setAttribute('d', `M0 2Q${bend.toFixed(1)} ${(ey / 2).toFixed(1)} ${x.toFixed(1)} ${(ey - 8).toFixed(1)}`);
    pull.style.transform = `translate(${x.toFixed(1)}px,${ey.toFixed(1)}px)`;
  };
  const set = (v) => { on = v; st.classList.toggle('dark', !v); pull.setAttribute('aria-checked', String(v)); state.textContent = v ? '灯亮着 · 浅色' : '灯关了 · 深色'; };
  const step = (t) => {
    if (!root.host.isConnected) return;
    const dt = Math.min(0.032, Math.max(0, (t - last) / 1000)); last = t;
    vy += (-KY * y - CY * vy) * dt; y += vy * dt;
    vx += (-KX * x - CX * vx) * dt; x += vx * dt;
    if (Math.abs(y) < 0.5 && Math.abs(vy) < 5 && Math.abs(x) < 0.3 && Math.abs(vx) < 3) { x = y = vx = vy = 0; raf = 0; return draw(); }
    draw(); raf = requestAnimationFrame(step);
  };
  const run = () => { if (still) { x = y = vx = vy = 0; return draw(); } if (!raf) { last = performance.now(); raf = requestAnimationFrame(step); } };
  const release = (moved) => {
    const flip = moved && y >= PASS; arm = false; pull.classList.remove('arm');
    tip.textContent = flip || !moved ? TIP : `拉得不够，没${on ? '关灯' : '开灯'}`;
    if (flip) set(!on);
    if (Math.abs(x) < 4) vx = (side = -side) * 90; // 竖直拉也给一点横向初速度
    run();
  };
  pull.addEventListener('pointerdown', (e) => {
    if (e.button > 0) return;
    cancelAnimationFrame(raf); raf = 0; vx = vy = 0; skip = false; // 回弹途中按住：从当前位置接着拉
    d = { px: e.clientX, py: e.clientY, x0: e.clientX - x * 2, y0: e.clientY - Math.max(0, y), moved: false };
    try { pull.setPointerCapture(e.pointerId); } catch {}
  });
  pull.addEventListener('pointermove', (e) => {
    if (!d) return;
    if (!d.moved && Math.hypot(e.clientX - d.px, e.clientY - d.py) < 4) return;
    d.moved = true;
    y = Math.max(0, Math.min(MAX, e.clientY - d.y0)); x = Math.max(-24, Math.min(24, (e.clientX - d.x0) / 2));
    const a = y >= PASS;
    if (a && !arm && e.isTrusted) navigator.vibrate?.(8);
    arm = a; pull.classList.toggle('arm', a); tip.textContent = a ? `松手${on ? '关灯' : '开灯'}` : '再往下拉一点';
    draw();
  });
  const up = (e) => { if (!d) return; const m = d.moved; skip = m; d = null; release(m && e.type === 'pointerup'); };
  pull.addEventListener('pointerup', up); pull.addEventListener('pointercancel', up);
  // 点按、空格 / 回车、读屏双击都走 click：直接切换，绳子自己往下抖一下；拖动后跟着来的那次 click 不算（键盘的 detail 是 0）
  pull.addEventListener('click', (e) => { if (skip && e.detail) { skip = false; return; } set(!on); tip.textContent = TIP; if (!still) { vy = 520; run(); } });
  pull.addEventListener('contextmenu', (e) => e.preventDefault());
  draw();
  if (still) return set(true);
  // 挂载后演示一次：拉下 56px 松手，开灯
  setTimeout(() => {
    if (!root.host.isConnected || d) return;
    const r = pull.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const fire = (type, dy) => pull.dispatchEvent(new PointerEvent(type, { bubbles: true, pointerId: 9, button: 0, clientX: cx, clientY: cy + dy }));
    fire('pointerdown', 0);
    for (let k = 1; k <= 8; k++) setTimeout(() => { if (root.host.isConnected && d) fire('pointermove', 56 * (1 - (1 - k / 8) ** 2)); }, k * 30);
    setTimeout(() => { if (root.host.isConnected && d) fire('pointerup', 56); }, 400);
  }, 600);
}
</script>
