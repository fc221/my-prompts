---
zh: 新拟物控制台
en: Neumorphic console kit
aka: 软浮雕后台 拟物控制台 硬件面板 旋钮面板 neumorphic console
order: 60
of: st-neumorphism
tab: 控制台
---

## 是什么

整页像一块米白色的控制面板：卡片和背景同色，靠一亮一暗两层阴影压出键帽、旋钮和拨杆，蓝色只在按下和关键读数时出现。

## 适合

智能硬件、产线或机房控制台、音频和灯光调音台、家居中控：控件少，每个控件都是要动手操作的实体。

## 不适合

报表和列表后台，同色阴影分不出信息层级，用普通卡片。阴影参数和状态规则见「新拟态（软浮雕）」，旋钮的角度计算见「绕圈拨动的旋钮」。

## 注意

一块面板放 6–8 个控件就够。键帽的“按下”和开关的“开启”要有不同表现：键帽靠内阴影加蓝字，开关靠指示灯加图标。机械感来自吸附和过冲，两者都要短。

## 要点

- 底座：暖米白 #ebe5da，亮影 #fffdf8，暗影 #c8c0b0，光源统一左上；文字 #453f35，蓝 #1f5fbf
- 层次：操作控件凸起（-5px -5px 10px 亮、5px 5px 10px 暗，大尺寸加到 7 / 14），读数放在同参数的 inset 凹槽里
- 键帽菜单：圆角 14–18px，按下时外阴影 140ms 转内阴影，选中后保持内阴影和蓝字，用 aria-pressed 标状态
- 旋钮吸附：-135° 到 135° 共 11 档，每档 27°，拖动时吸到最近刻度（150ms 带过冲），底部 60° 是死区，防止从最大档跳回 0；已过的刻度变蓝；role="slider"，方向键 ±1，Home / End 到两端，touch-action: none
- 拨动开关：拇指滑动 180ms，同时指示灯由灰转蓝并发光，图标由灰转彩，三者读同一个状态；用真实 checkbox 加 role="switch"
- 机械滚轮：每位一列 0–9，用 translateY 滚到目标，600ms，cubic-bezier(.34,1.65,.64,1) 过冲一点，高位依次晚 50ms；滚轮列 aria-hidden，用 role="status" 报数
- 叠卡下沉：抽出一张卡时，后方卡片按重量依次下沉（4px、2px、1px），间隔 40ms，阴影同步变浅，放回时反向
- 减少动态效果：按下和开关直接切换，滚轮直接到位，旋钮不过冲

## 提示词

把{产品}的{控制面板}做成新拟物控制台，要控制的是{设备或参数}。

风格底座：暖米白 #ebe5da，卡片和背景同色，亮影 #fffdf8、暗影 #c8c0b0，光源统一左上；操作控件凸起（偏移 5px、模糊 10px），读数放在 inset 凹槽里；圆角 14–24px 或正圆；文字 #453f35；蓝 #1f5fbf 只给按下态和关键读数；一块面板 6–8 个控件；窄屏控件上下堆叠。

从下面挑要用的交互，没挑的不做：
1. 机械滚轮：读数每位一列 0–9，600ms 滚到目标并轻微过冲，高位依次晚 50ms，用 role="status" 播报结果。
2. 拨动开关：拇指滑动 180ms，同时指示灯由灰转蓝并发光，图标由灰转蓝。
3. 叠卡下沉：抽出一张卡时，后方卡片按 4px、2px、1px 依次下沉，间隔 40ms，放回时反向。
4. 键帽菜单：菜单项做成键帽，按下时外阴影 140ms 转内阴影，选中后保持内阴影和蓝字。
5. 旋钮吸附：-135° 到 135° 共 11 档，拖动时吸到最近刻度并过冲一点，底部 60° 是死区，已过的刻度变蓝；role="slider"，方向键 ±1，Home / End 到两端。

减少动态效果时，按下和开关直接切换，滚轮直接到位。

## 示例

<style>
:host{container-type:size}
.w{--bg:#ebe5da;--hi:#fffdf8;--lo:#c8c0b0;--ink:#453f35;--soft:#6a6254;--blue:#1f5fbf;--up:-5px -5px 10px var(--hi),5px 5px 10px var(--lo);--in:inset 4px 4px 8px var(--lo),inset -4px -4px 8px var(--hi);position:relative;height:100%;overflow:hidden;display:flex;flex-direction:column;gap:8px;padding:10px 14px 12px;background:var(--bg);color:var(--ink);font:12px/1.35 system-ui,"PingFang SC",sans-serif}
.top{display:flex;align-items:baseline;justify-content:space-between}
.top b{font-size:13px;font-weight:700}
.top span{color:var(--soft);font-size:11px}
.grid{flex:1;min-height:0;display:grid;grid-template-columns:42px minmax(0,1fr) 112px;gap:12px}
.keys{display:flex;flex-direction:column;justify-content:space-between;gap:6px}
.key{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;gap:8px;padding:0;border:0;border-radius:14px;background:var(--bg);box-shadow:var(--up);color:var(--ink);font:700 14px/1 system-ui,"PingFang SC",sans-serif;cursor:pointer;transition:box-shadow .14s,color .14s}
.key span{display:none;font-size:13px;font-weight:600}
.key:active,.key[aria-pressed=true]{box-shadow:var(--in);color:var(--blue)}
.key:focus-visible,.knob:focus-visible,input:focus-visible~.track{outline:2px solid var(--blue);outline-offset:3px}
.dial{min-width:0;min-height:0;display:grid;place-items:center;container-type:size}
.ticks,.knob{grid-area:1/1}
.ticks{width:100cqmin;height:100cqmin}
.ticks line{stroke:#a89f8f;stroke-width:2.4;stroke-linecap:round}
.ticks line.on{stroke:var(--blue)}
.knob{--deg:0deg;position:relative;width:70cqmin;height:70cqmin;border-radius:50%;background:linear-gradient(145deg,#f4efe6,#e1dacd);box-shadow:var(--up);cursor:grab;touch-action:none;transform:rotate(var(--deg));transition:transform .15s cubic-bezier(.3,1.7,.5,1)}
.knob:active{cursor:grabbing}
.knob i{position:absolute;left:50%;top:7%;width:4px;height:20%;margin-left:-2px;border-radius:2px;background:var(--blue)}
.side{min-width:0;display:flex;flex-direction:column;gap:10px}
.well{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:1px;padding:0 11px;border-radius:16px;box-shadow:var(--in)}
.well small{font-size:11px;color:var(--soft)}
.wheels{display:flex;align-items:flex-start;height:30px;overflow:hidden;color:var(--blue);font:700 25px/30px system-ui,"PingFang SC",sans-serif;font-variant-numeric:tabular-nums}
.col{display:block;transform:translateY(calc(var(--d)*-10%));transition:transform .6s cubic-bezier(.34,1.65,.64,1) var(--lag)}
.col span{display:block;height:30px}
.sw{display:flex;align-items:center;gap:6px;min-height:34px;cursor:pointer}
.sw input{position:absolute;opacity:0;width:1px;height:1px}
.track{position:relative;flex:none;width:38px;height:22px;border-radius:999px;box-shadow:var(--in)}
.track i{position:absolute;left:3px;top:3px;width:16px;height:16px;border-radius:50%;background:var(--bg);box-shadow:-2px -2px 4px var(--hi),2px 2px 4px var(--lo);transition:transform .18s cubic-bezier(.3,1.4,.5,1)}
input:checked~.track i{transform:translateX(16px)}
.led{flex:none;width:8px;height:8px;border-radius:50%;background:#bdb5a5;box-shadow:inset 1px 1px 2px rgba(0,0,0,.2);transition:background-color .2s,box-shadow .2s}
input:checked~.led{background:var(--blue);box-shadow:0 0 8px 1px rgba(31,95,191,.65)}
.ico{flex:none;width:18px;height:18px;color:#8d8576;transition:color .2s}
input:checked~.ico{color:var(--blue)}
.lb{display:none;font-weight:600}
.sr{position:absolute;width:1px;height:1px;margin:0;overflow:hidden;clip-path:inset(50%)}
@container (max-width:310px){
.grid{grid-template-columns:40px minmax(0,1fr) 100px;gap:9px}
.w{padding-inline:12px}
}
@container (min-width:520px){
.w{--up:-7px -7px 14px var(--hi),7px 7px 14px var(--lo);--in:inset 5px 5px 10px var(--lo),inset -5px -5px 10px var(--hi);gap:12px;padding:14px 22px 20px}
.top b{font-size:15px}
.top span{font-size:12px}
.grid{grid-template-columns:128px minmax(0,1fr) 190px;gap:26px}
.keys{gap:14px}
.key{border-radius:18px;justify-content:flex-start;padding-left:16px}
.key span{display:inline}
.side{justify-content:center;gap:24px}
.well{flex:none;height:128px;padding:0 18px;border-radius:20px}
.well small{font-size:12px}
.wheels{height:50px;font-size:42px;line-height:50px}
.col span{height:50px}
.sw{gap:9px;min-height:44px}
.lb{display:inline}
}
@media (prefers-reduced-motion:reduce){
.key,.knob,.track i,.led,.ico,.col{transition:none}
}
</style>

<div class="w">
  <header class="top"><b>MyPrompts 控制台</b><span class="now"></span></header>
  <div class="grid">
    <nav class="keys" aria-label="选择产线">
      <button type="button" class="key" data-l="0" aria-pressed="false" aria-label="一号线">1<span>一号线</span></button>
      <button type="button" class="key" data-l="1" aria-pressed="false" aria-label="二号线">2<span>二号线</span></button>
      <button type="button" class="key" data-l="2" aria-pressed="false" aria-label="三号线">3<span>三号线</span></button>
    </nav>
    <div class="dial">
      <svg class="ticks" viewBox="-60 -60 120 120" aria-hidden="true"></svg>
      <div class="knob" role="slider" tabindex="0" aria-label="转速档位" aria-valuemin="0" aria-valuemax="10"><i></i></div>
    </div>
    <div class="side">
      <div class="well"><small>转速 rpm</small><div class="wheels" data-clip aria-hidden="true"></div></div>
      <label class="sw">
        <input type="checkbox" role="switch" aria-label="自动调速">
        <span class="track"><i></i></span><span class="led"></span>
        <svg class="ico" viewBox="0 0 20 20" aria-hidden="true"><g fill="currentColor"><ellipse cx="10" cy="5.200" rx="2.500" ry="4.200"/><ellipse cx="10" cy="5.200" rx="2.500" ry="4.200" transform="rotate(120 10 10)"/><ellipse cx="10" cy="5.200" rx="2.500" ry="4.200" transform="rotate(240 10 10)"/></g></svg>
        <span class="lb">自动调速</span>
      </label>
    </div>
  </div>
  <p class="sr" role="status"></p>
</div>

<script type="module">
export default function demo(root) {
  const STEP = 27, START = -135, RPM = 240;
  const NAMES = ['一号线', '二号线', '三号线'];
  const lines = [{ v: 3, auto: false }, { v: 7, auto: true }, { v: 5, auto: false }];
  const knob = root.querySelector('.knob'), ticks = root.querySelector('.ticks'), wheels = root.querySelector('.wheels');
  const sw = root.querySelector('input'), say = root.querySelector('.sr'), now = root.querySelector('.now');
  const keys = [...root.querySelectorAll('.key')];
  let line = 0, drag = false;

  ticks.innerHTML = Array.from({ length: 11 }, (_, i) => `<line y1="-58" y2="-51" transform="rotate(${START + i * STEP})"/>`).join('');
  wheels.innerHTML = [0, 1, 2, 3].map((i) => `<span class="col" style="--lag:${(3 - i) * 50}ms">${'0123456789'.split('').map((d) => `<span>${d}</span>`).join('')}</span>`).join('');
  const marks = [...ticks.children], cols = [...wheels.children];

  function setV(v) {
    lines[line].v = v;
    knob.style.setProperty('--deg', START + v * STEP + 'deg');
    knob.setAttribute('aria-valuenow', v);
    const rpm = v * RPM, text = String(rpm).padStart(4, '0');
    knob.setAttribute('aria-valuetext', `${v} 档，每分钟 ${rpm} 转`);
    marks.forEach((m, i) => m.classList.toggle('on', i <= v));
    cols.forEach((c, i) => c.style.setProperty('--d', text[i]));
    say.textContent = `${NAMES[line]} ${v} 档，${rpm} 转`;
  }

  function setLine(i) {
    line = i;
    keys.forEach((k, j) => k.setAttribute('aria-pressed', j === i));
    now.textContent = NAMES[i] + ' 运行中';
    sw.checked = lines[i].auto;
    setV(lines[i].v);
  }

  // 指针角度吸附到最近的刻度；底部 60° 是死区，防止从最大档跳到 0 档
  function follow(e) {
    const r = knob.getBoundingClientRect();
    const deg = (Math.atan2(e.clientX - (r.left + r.width / 2), r.top + r.height / 2 - e.clientY) * 180) / Math.PI;
    if (Math.abs(deg) <= 150) setV(Math.round((Math.max(START, Math.min(-START, deg)) - START) / STEP));
  }
  knob.addEventListener('pointerdown', (e) => {
    drag = true;
    knob.setPointerCapture(e.pointerId);
    follow(e);
  });
  knob.addEventListener('pointermove', (e) => drag && follow(e));
  knob.addEventListener('pointerup', () => (drag = false));
  knob.addEventListener('pointercancel', () => (drag = false));
  knob.addEventListener('keydown', (e) => {
    const v = lines[line].v;
    const to = { ArrowUp: v + 1, ArrowRight: v + 1, ArrowDown: v - 1, ArrowLeft: v - 1, Home: 0, End: 10 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    setV(Math.max(0, Math.min(10, to)));
  });
  keys.forEach((k) => k.addEventListener('click', () => setLine(+k.dataset.l)));
  sw.addEventListener('change', () => {
    lines[line].auto = sw.checked;
    say.textContent = `自动调速已${sw.checked ? '开启' : '关闭'}`;
  });

  setLine(0);
  setTimeout(() => {
    if (root.host.isConnected) setLine(1);
  }, 220);
}
</script>
