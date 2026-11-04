---
zh: 可拖动的 3D 物件
en: Draggable 3D object
aka: 3D 产品展示 拖动旋转 惯性旋转 360 展示 3d viewer
order: 40
---

## 是什么

首屏中央摆着一个立体的产品或抽象物件，按住可以拖着转，看到各个面；松手后它带着惯性继续转一会儿，再慢慢停下。

## 适合

包装盒、音箱、耳机、香水瓶这类外形有看头的单品首屏，品牌官网的抽象主视觉，商品详情页的 360° 查看。

## 不适合

有很多张卡片要翻找用「卡片排成球面」或「环成一圈的画廊」；只要卡片朝指针微微倾斜用「3D 倾斜卡片」；要随滚动一步步拆开内部结构用「滚动拆开结构」。

## 注意

旋转是附加的看法：产品名、价格、卖点写在物件旁边的平面文字里，不印在会转走的面上。拖动区只限物件附近，手机上不能把整屏变成拖动区挡住页面滚动。

## 要点

- CSS 3D 做法：舞台 perspective 800–1200px，物件 transform-style: preserve-3d，盒子的每个面先 rotateY 或 rotateX，再 translateZ(边长的一半)；面数控制在 12 以内
- 拖动：横向拖动转 Y 轴、纵向转 X 轴（X 限制在 ±70°），每 px 0.4–0.6°；拖动区 touch-action: none 并捕获指针，位移超过 4px 才算拖动
- 惯性：松手时取最后 80ms 的角速度继续转，按帧间隔衰减（速度 × 0.95^(帧间隔 ÷ 16ms)），低于 0.01°/ms 停下并停掉 requestAnimationFrame；转动中再次按下立即接住
- 光影：每个面按朝向叠一层明暗（顶面最亮、侧面暗 10–25%），地面放一团随角度轻微伸缩的椭圆影子
- 键盘和替代：物件可聚焦，方向键每次 15°，另有“回正”按钮；停下后用 role="status" 播报正对的面；不默认自转
- 真实模型：用 three.js 的 GLTFLoader 加载 glTF，几何用 Draco 或 Meshopt 压缩，贴图用 KTX2，模型加贴图合计 3MB 以内、三角面 10 万以内；OrbitControls 打开 enableDamping 就有惯性
- 性能预算：先放一张同角度的静态图占位，首屏渲染完或进入视口再加载模型；devicePixelRatio 最多取 2；离开视口或页面隐藏时停止渲染；卸载时释放几何体、材质、贴图和渲染器；拿不到 WebGL 时只显示静态图
- 减少动态效果时没有惯性，松手即停

## 提示词

在{首屏}放一个「可拖动的 3D 物件」：用 CSS 3D 拼出{物件}（舞台 perspective 1000px，物件 preserve-3d，各个面旋转后 translateZ 半个边长，面数不超过 12），每个面按朝向叠一层明暗，地面放一团椭圆影子；按住拖动旋转：横向转 Y 轴、纵向转 X 轴（限制 ±70°），每 px 0.5°，位移超过 4px 才算拖动，拖动区只在物件附近并设 touch-action: none；松手后按最后 80ms 的角速度继续转，按 0.95^(帧间隔 ÷ 16ms) 衰减，足够慢时停下并停止 requestAnimationFrame，转动中再次按下立即接住；物件可聚焦，方向键每次 15°，另有“回正”按钮，停下后用 role="status" 播报正对的面；产品名、价格等关键信息写在旁边的平面文字里；不自动旋转；减少动态效果时没有惯性。如果改用 three.js 加载 glTF：几何压缩、贴图用 KTX2，总量 3MB 以内，先放静态图占位、进入视口再加载，离开视口暂停渲染，卸载时释放资源，没有 WebGL 时只显示静态图。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{background:radial-gradient(circle at 38% 42%,#ffffff,#ebe7e0 64%,#dcd6cc)}
.wrap{display:grid;grid-template-columns:minmax(0,1fr) 118px;height:100%;padding-right:12px}
.stage{position:relative;min-width:0;perspective:900px;touch-action:none;cursor:grab;user-select:none;-webkit-user-select:none;outline-offset:-4px;border-radius:12px}
.stage.drag{cursor:grabbing}
.shadow{position:absolute;left:50%;top:calc(50% + var(--h) * .5 + 10px);width:calc(var(--w) * 1.1);height:18px;margin-left:calc(var(--w) * -.55);border-radius:50%;background:radial-gradient(closest-side,rgba(40,32,20,.32),transparent);transform:scaleX(var(--sx,1))}
.box{position:absolute;left:50%;top:50%;transform-style:preserve-3d}
.box.kb{transition:transform .3s cubic-bezier(.2,.7,.3,1)}
.f{position:absolute;left:0;top:0;display:grid;place-items:center;overflow:hidden;background:#1f4d3a;color:#e6c789;backface-visibility:hidden;font-family:ui-serif,"Songti SC",serif}
.f::after{content:"";position:absolute;inset:0;background:#0c1a14;opacity:var(--sh,0);pointer-events:none}
.box.kb .f::after{transition:opacity .3s}
.fr,.bk{width:var(--w);height:var(--h);margin:calc(var(--h) / -2) 0 0 calc(var(--w) / -2)}
.rt,.lf{width:var(--d);height:var(--h);margin:calc(var(--h) / -2) 0 0 calc(var(--d) / -2)}
.tp,.bt{width:var(--w);height:var(--d);margin:calc(var(--d) / -2) 0 0 calc(var(--w) / -2)}
.fr{transform:translateZ(calc(var(--d) / 2));box-shadow:inset 0 0 0 5px #1f4d3a,inset 0 0 0 6px #c9a35f}
.bk{transform:rotateY(180deg) translateZ(calc(var(--d) / 2));background:#21503c}
.rt{transform:rotateY(90deg) translateZ(calc(var(--w) / 2));background:repeating-linear-gradient(135deg,#24573f 0 6px,#1d4a35 6px 12px)}
.lf{transform:rotateY(-90deg) translateZ(calc(var(--w) / 2));background:#24573f}
.tp{transform:rotateX(90deg) translateZ(calc(var(--h) / 2));background:radial-gradient(circle,#c9a35f 0 17%,#173a2c 18% 21%,#2a6248 22%)}
.bt{transform:rotateX(-90deg) translateZ(calc(var(--h) / 2));background:#173a2c}
.fr b{writing-mode:vertical-rl;font-size:calc(var(--h) * .26);letter-spacing:.1em;line-height:1}
.fr small{position:absolute;bottom:9%;font-size:calc(var(--h) * .075);letter-spacing:.2em;font-family:system-ui,"PingFang SC",sans-serif}
.bk span,.lf span{writing-mode:vertical-rl;font-size:calc(var(--h) * .08);line-height:1.8;letter-spacing:.12em;font-family:system-ui,"PingFang SC",sans-serif}
.tp i{font-style:normal;font-size:calc(var(--d) * .2);color:#173a2c;font-weight:700}
.side{display:flex;flex-direction:column;justify-content:center;gap:6px;min-width:0}
.side b{font-size:14px;line-height:1.3}
.side p{margin:0;color:#5d574c;font-size:12px}
.side .pr{color:#1f2329;font-size:16px;font-weight:600;font-variant-numeric:tabular-nums}
.side .ctl{align-self:flex-start;height:28px;padding:0 12px;font-size:12px}
@container (max-width:310px){.wrap{grid-template-columns:minmax(0,1fr) 100px}
.side .hint{display:none}
}
@container (min-height:260px){.wrap{grid-template-columns:minmax(0,1fr) 200px;padding-right:40px}
.side{gap:10px}
.side b{font-size:18px}
.side p{font-size:13px}
.side .pr{font-size:20px}
.side .ctl{height:32px}
}
</style>

<div class="st"><div class="wrap"><div class="stage" tabindex="0" role="img" aria-roledescription="可旋转的 3D 物件" aria-label="秋茶礼盒，拖动或用方向键旋转"><div class="shadow" aria-hidden="true"></div><div class="box" aria-hidden="true"><div class="f fr"><b>秋茶</b><small>山岩乌龙</small></div><div class="f bk"><span>九十五度水<br>五克茶 一百五十毫升</span></div><div class="f rt"></div><div class="f lf"><span>净含量 250 克</span></div><div class="f tp"><i>秋</i></div><div class="f bt"></div></div></div><div class="side"><b>山岩乌龙<br>秋茶礼盒</b><p class="pr">¥268</p><p class="hint">按住拖动旋转</p><button type="button" class="ctl">回正</button></div></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const stage = root.querySelector('.stage'), box = root.querySelector('.box'), shadow = root.querySelector('.shadow'), live = root.querySelector('[role=status]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // 各面的朝向（物件自身坐标），用 DOMMatrix 转到当前角度后求明暗和正对的面
  const FACES = [['.fr', 'rotateY(0deg)', '正面'], ['.bk', 'rotateY(180deg)', '背面 · 冲泡说明'], ['.rt', 'rotateY(90deg)', '右侧'], ['.lf', 'rotateY(-90deg)', '左侧 · 净含量'], ['.tp', 'rotateX(90deg)', '顶盖'], ['.bt', 'rotateX(-90deg)', '底面']].map(([q, r, n]) => ({ el: root.querySelector(q), m: new DOMMatrix(r), n }));
  const L = (() => { const v = [-0.35, -0.75, 0.55], l = Math.hypot(...v); return v.map((x) => x / l); })();
  let rx = -18, ry = -110, vx = 0, vy = 0, raf = 0, last = 0, drag = null, samples = [], dims = { W: 100 };
  const clampX = (v) => Math.max(-70, Math.min(70, v));
  const paint = () => {
    const m = new DOMMatrix(`rotateX(${rx}deg) rotateY(${ry}deg)`);
    box.style.transform = m.toString();
    let best = null, bz = -2;
    FACES.forEach((f) => {
      const n = m.multiply(f.m).transformPoint(new DOMPoint(0, 0, 1, 0)), b = n.x * L[0] + n.y * L[1] + n.z * L[2];
      f.el.style.setProperty('--sh', (0.5 * (1 - Math.max(0, Math.min(1, b + 0.25)))).toFixed(3));
      if (n.z > bz) { bz = n.z; best = f; }
    });
    const a = ry * Math.PI / 180;
    shadow.style.setProperty('--sx', ((Math.abs(dims.W * Math.cos(a)) + Math.abs(dims.D * Math.sin(a))) / dims.W).toFixed(3));
    return best;
  };
  const settle = () => { live.textContent = '正对：' + paint().n; };
  // 惯性：每帧速度乘 0.95^(dt/16)，低于 0.01°/ms 停下
  const tick = (t) => {
    raf = 0; if (!root.host.isConnected || drag) return;
    const dt = Math.min(48, t - (last || t)); last = t;
    ry += vy * dt; rx = clampX(rx + vx * dt); const k = Math.pow(0.95, dt / 16); vx *= k; vy *= k; paint();
    if (Math.hypot(vx, vy) < 0.01) { last = 0; settle(); return; }
    raf = requestAnimationFrame(tick);
  };
  const spin = () => { if (reduce) { settle(); return; } if (!raf) { last = 0; raf = requestAnimationFrame(tick); } };
  const layout = () => {
    const H = Math.min(stage.clientHeight * 0.56, stage.clientWidth * 0.56), W = H * 0.78, D = H * 0.56; dims = { W, D };
    stage.style.setProperty('--h', H + 'px'); stage.style.setProperty('--w', W + 'px'); stage.style.setProperty('--d', D + 'px'); paint();
  };
  stage.addEventListener('pointerdown', (e) => {
    if (e.button) return; cancelAnimationFrame(raf); raf = 0; vx = vy = 0; box.classList.remove('kb');
    drag = { x: e.clientX, y: e.clientY, rx, ry, moved: false, id: e.pointerId }; samples = [{ t: performance.now(), rx, ry }];
  });
  stage.addEventListener('pointermove', (e) => {
    if (!drag || drag.id !== e.pointerId) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) > 4) { drag.moved = true; stage.classList.add('drag'); try { stage.setPointerCapture(e.pointerId); } catch {} }
    if (!drag.moved) return;
    ry = drag.ry + dx * 0.5; rx = clampX(drag.rx - dy * 0.5); paint();
    const now = performance.now(); samples.push({ t: now, rx, ry }); while (samples.length > 2 && now - samples[0].t > 80) samples.shift();
  });
  const end = (e) => {
    if (!drag || drag.id !== e.pointerId) return;
    const moved = drag.moved; drag = null; stage.classList.remove('drag'); if (!moved) return;
    const a = samples[0], b = samples[samples.length - 1], dt = b.t - a.t;
    if (!reduce && dt > 0 && performance.now() - b.t < 60) { vy = (b.ry - a.ry) / dt; vx = (b.rx - a.rx) / dt; spin(); } else settle();
  };
  stage.addEventListener('pointerup', end); stage.addEventListener('pointercancel', end);
  const kbTo = (x, y) => { cancelAnimationFrame(raf); raf = 0; vx = vy = 0; if (!reduce) box.classList.add('kb'); rx = clampX(x); ry = y; settle(); };
  stage.addEventListener('keydown', (e) => {
    const k = { ArrowLeft: [0, -15], ArrowRight: [0, 15], ArrowUp: [15, 0], ArrowDown: [-15, 0] }[e.key];
    if (k) { e.preventDefault(); kbTo(rx + k[0], ry + k[1]); }
  });
  root.querySelector('.ctl').addEventListener('click', () => kbTo(-18, -32));
  new ResizeObserver(layout).observe(stage);
  layout();
  // 演示：挂载后像被拨了一下，转一段后停下
  if (reduce) { ry = -32; settle(); } else setTimeout(() => { if (root.host.isConnected && !drag) { vy = 0.22; spin(); } }, 150);
}
</script>
