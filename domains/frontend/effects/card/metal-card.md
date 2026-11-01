---
zh: 磨砂金属反光卡片
en: Brushed metal card
order: 20
---

## 是什么

一张拉丝金属质感的卡片：指针在上面移动时卡片微微转动，表面的反光和边缘的一圈高光跟着角度滑过去，像手里真的在转一块金属；指针离开后弹回放平。

## 适合

会员卡、礼品卡、邀请函、订阅档位里最高的那一档、作品集封面这类一屏只有一个主角的卡片。

## 不适合

成排的商品卡、列表和表单：同屏多张既抢眼又耗性能，改用「3D 倾斜卡片」（只倾斜加一团高光，更轻）；深色卡片墙想让指针附近亮起来，用「鼠标跟随光晕卡片」。

## 注意

金属感来自“照出了周围的环境”，不是一团跟着鼠标走的白光：先准备一张环境图当反射源，再让倾斜角度同时决定卡片的 3D 变换和反射的位置。两者必须从同一个角度值算出来，不能各自监听指针、各算各的，否则转动和反光对不上，一眼就假。

## 要点

- 环境图：深底上 3–5 块柔和光斑加 1–2 条斜向亮带，模糊 6–10px、去色后作反射层，尺寸是卡片的两倍，用 overlay 或 soft-light 叠在金属底上
- 反射跟着表面朝向走：卡片向右转，反射层向左移，每度约 1.5% 的层宽；边缘做 1–2px 的倒角描边，亮段用 conic-gradient 转到背向指针的一侧，倾斜越大越亮，高光才像沿着边缘弯过去
- 表面叠拉丝和磨砂纹理：canvas 画一次即可（两千来条长短不一的 1px 细横线，再加逐像素 ±5% 的颗粒），透明度 0.5–0.6
- 分层顺序：金属底 → 纹理 → 反射 → 真实的 HTML 文字（品牌、编号、持卡人，刻印感用 1px 浅色 text-shadow）→ 高光描边；文字不画进图里，读屏和复制照常
- 指针位置换算成目标角度，最大 ±12°，用弹簧追过去（刚度约 170、阻尼约 20，回正时有一点点过冲）；指针离开后目标归零；停稳后停掉 requestAnimationFrame
- 用 WebGL 着色器时，每帧比较画布尺寸和 devicePixelRatio，只在变化时重设；卸载时释放纹理、着色器程序和上下文；拿不到 WebGL 时回退为静态的金属渐变
- 触屏没有悬停，默认静止，可选按住拖动或陀螺仪（陀螺仪要用户点按授权）；卡片可聚焦，方向键每次 4°、Esc 回正；减少动态效果时不倾斜，高光固定在左上方

## 提示词

给{会员卡}做「磨砂金属反光卡片」：卡片分五层：银灰金属渐变底、拉丝加磨砂颗粒的纹理（canvas 画一次，overlay 叠加）、反射层、真实的 HTML 文字（{卡面信息}）、1.5px 的高光描边。反射层用一张简单的环境图（几块柔和光斑加一两条斜向亮带），模糊 8px、去色，尺寸为卡片两倍。指针在卡片上移动时换算出目标角度（最大 ±12°），用弹簧（刚度约 170、阻尼约 20）驱动；同一个角度同时写进 rotateX / rotateY（perspective 900px）和反射层的位移（卡片向右转、反射向左移，每度约 1.5%），高光描边用 conic-gradient，亮段转到背向指针的一侧，倾斜越大越亮；指针离开后弹回放平，停稳后停止 requestAnimationFrame。触屏默认静止，可以按住拖动；卡片可聚焦，方向键每次 4°、Esc 回正。如果改用 WebGL，只在尺寸或设备像素比变化时重设画布，卸载时释放资源，没有 WebGL 时显示静态金属渐变。减少动态效果时不倾斜、高光固定。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{display:grid;grid-template-rows:minmax(0,1fr) auto;background:radial-gradient(120% 90% at 50% 0%,#2b303a 0,#121419 72%);color:#c9ced6}
.stage{display:grid;place-items:center;min-height:0}
.wrap{height:min(60cqh,200px);aspect-ratio:1.586;touch-action:none}
.mc{--rx:0;--ry:0;--ea:-45deg;--gl:0;position:relative;width:100%;height:100%;border-radius:4.6%/7.3%;overflow:hidden;isolation:isolate;container-type:size;transform:perspective(900px) rotateX(calc(var(--rx) * 1deg)) rotateY(calc(var(--ry) * 1deg));box-shadow:calc(var(--ry) * -.8px) calc(16px + var(--rx) * .8px) 30px -12px rgba(0,0,0,.7);outline:none}
.mc:focus-visible{box-shadow:0 0 0 2px #121419,0 0 0 4px #8fb4ff,0 16px 30px -12px rgba(0,0,0,.7)}
.mc>*{position:absolute;inset:0}
/* 金属底：几段明暗交替的银灰 */
.base{background:linear-gradient(112deg,#a9b0ba 0%,#d6dae0 26%,#9da4ae 50%,#c8ccd2 72%,#8e959f 100%);box-shadow:inset 0 1px 1px rgba(255,255,255,.55),inset 0 -1px 1px rgba(0,0,0,.35)}
/* 拉丝 + 磨砂颗粒：canvas 画一次，叠在金属底上 */
.tex{width:100%;height:100%;mix-blend-mode:overlay;opacity:.6}
/* 环境图：两条亮带 + 几块柔光，模糊、去色后当反射源；位置只由 --rx / --ry 决定 */
.env{inset:-50%;background:linear-gradient(104deg,transparent 40%,rgba(255,255,255,.9) 46%,transparent 52%),linear-gradient(104deg,transparent 56%,rgba(255,255,255,.45) 58.5%,transparent 61%),radial-gradient(18% 24% at 32% 34%,#ffe7b8,transparent 72%),radial-gradient(22% 22% at 70% 68%,#cfe0ff,transparent 72%),radial-gradient(30% 34% at 62% 26%,#10141c,transparent 72%),radial-gradient(26% 30% at 36% 72%,#1b2029,transparent 72%);filter:blur(6px) grayscale(1);mix-blend-mode:overlay;transform:translate(calc(var(--ry) * -1.5%),calc(var(--rx) * 1.5%))}
.face{display:grid;grid-template-rows:auto minmax(0,1fr) auto;padding:9cqh 7cqw 8cqh;color:#262b33;text-shadow:0 1px 0 rgba(255,255,255,.5)}
.top{display:flex;justify-content:space-between;align-items:flex-start}
.brand{display:flex;align-items:center;gap:2.6cqw;margin:0;font-size:max(11px,10.5cqh);font-weight:700;letter-spacing:.14em;line-height:1.1}
.brand svg{width:14cqh;height:14cqh;flex:none}
.brand small{display:block;margin-top:1.5cqh;font-size:max(9px,6.4cqh);font-weight:500;letter-spacing:.24em;opacity:.78}
.tag{font-size:max(9px,6.4cqh);font-weight:600;letter-spacing:.3em;opacity:.7}
.chip{align-self:center;width:15cqw;height:19cqh;border-radius:2.6cqh;background:repeating-linear-gradient(90deg,transparent 0 31%,rgba(70,50,10,.35) 31% 33%),linear-gradient(0deg,transparent 46%,rgba(70,50,10,.35) 46% 54%,transparent 54%),linear-gradient(135deg,#efe1b4,#b89c5c 45%,#ecdfb6 62%,#a88c4f);box-shadow:inset 0 0 0 1px rgba(80,60,20,.35)}
.no{margin:0;font:600 max(12px,11cqh)/1.1 ui-monospace,"SF Mono",Menlo,monospace;letter-spacing:.1em;font-variant-numeric:tabular-nums}
.bt{display:flex;justify-content:space-between;align-items:flex-end;margin-top:2.5cqh;font-size:max(9px,7cqh);letter-spacing:.12em}
/* 一圈高光描边：亮的那一段转到 --ea 指的方向，倾斜越大越亮 */
.rim{border-radius:inherit;padding:1.5px;background:conic-gradient(from calc(var(--ea) - 70deg),rgba(255,255,255,.12),rgba(255,255,255,calc(.55 + var(--gl) * .45)) 70deg,rgba(255,255,255,.12) 140deg,rgba(0,0,0,.3) 250deg,rgba(255,255,255,.12) 360deg);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
.bar{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:0 12px 12px}
.hint{margin:0;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#9aa1ad;font-size:12px}
@container (min-height:260px){.bar{padding:0 18px 16px}
.hint{font-size:13px}
}
</style>

<div class="st"><div class="stage"><div class="wrap"><div class="mc" tabindex="0" role="group" aria-label="MyPrompts 典藏会员卡，方向键倾斜，Esc 回正"><i class="base"></i><canvas class="tex" width="480" height="300" aria-hidden="true"></canvas><i class="env"></i><div class="face"><div class="top"><p class="brand"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M1.5 19 9 6.5l4.2 6.6 2.8-3.9 6.5 9.8z" fill="currentColor"/></svg><span>MyPrompts<small>典藏会员</small></span></p><span class="tag">MEMBER</span></div><i class="chip" aria-hidden="true"></i><div><p class="no">2604 7731 0958</p><div class="bt"><span>林知夏</span><span>有效至 08/29</span></div></div></div><i class="rim"></i></div></div></div><div class="bar"><p class="hint">指针移上去、拖动或按方向键</p><button type="button" class="ctl">演示倾斜</button></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const wrap = root.querySelector('.wrap'), mc = root.querySelector('.mc'), msg = root.querySelector('[role=status]');
  const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const MAX = 12, K = 170, C = 20; // 弹簧：刚度 170、阻尼 20，略欠阻尼，回正时有一点点过冲
  // 拉丝纹理：很多条长短不一的细横线 + 逐像素颗粒，只画一次
  const tg = root.querySelector('.tex').getContext('2d'), W = 480, H = 300;
  tg.fillStyle = '#808080'; tg.fillRect(0, 0, W, H);
  for (let i = 0; i < 2400; i++) { const l = Math.random() < 0.5 ? 255 : 0; tg.fillStyle = `rgba(${l},${l},${l},${0.04 + Math.random() * 0.1})`; tg.fillRect(Math.random() * W - 60, Math.random() * H | 0, 30 + Math.random() * 240, 1); }
  const px = tg.getImageData(0, 0, W, H), d = px.data;
  for (let i = 0; i < d.length; i += 4) { const n = (Math.random() - 0.5) * 28; d[i] += n; d[i + 1] += n; d[i + 2] += n; }
  tg.putImageData(px, 0, 0);

  // 唯一的状态：当前角度 cur（x = 绕 X 轴，y = 绕 Y 轴，单位度）。变换、反射位置、描边高光都从它算
  let cur = { x: 0, y: 0 }, vel = { x: 0, y: 0 }, tgt = { x: 0, y: 0 }, raf = 0, last = 0, sw = 0;
  const apply = () => {
    const s = mc.style, vx = -cur.y - 3, vy = cur.x - 3; // 描边亮段：指针的反方向，再带一点左上方的常驻光
    s.setProperty('--rx', cur.x.toFixed(2)); s.setProperty('--ry', cur.y.toFixed(2));
    s.setProperty('--ea', (Math.atan2(vx, -vy) * 180 / Math.PI).toFixed(1) + 'deg');
    s.setProperty('--gl', Math.min(1, Math.hypot(cur.x, cur.y) / MAX).toFixed(3));
  };
  const step = (t) => {
    if (!root.host.isConnected) { raf = 0; return; }
    const dt = Math.min(0.032, (t - last) / 1000 || 0.016); last = t;
    for (const k of ['x', 'y']) { vel[k] += (K * (tgt[k] - cur[k]) - C * vel[k]) * dt; cur[k] += vel[k] * dt; }
    if (Math.abs(tgt.x - cur.x) + Math.abs(tgt.y - cur.y) + Math.abs(vel.x) + Math.abs(vel.y) < 0.02) { cur = { ...tgt }; vel = { x: 0, y: 0 }; apply(); raf = 0; return; }
    apply(); raf = requestAnimationFrame(step);
  };
  const cl = (v) => Math.max(-MAX, Math.min(MAX, v));
  const go = (x, y) => { tgt = { x: cl(x), y: cl(y) }; if (!raf) { last = performance.now(); raf = requestAnimationFrame(step); } };
  const say = (t) => { msg.textContent = t; };
  const desc = () => `${tgt.y > 0 ? '右' : tgt.y < 0 ? '左' : ''}倾 ${Math.abs(tgt.y)}°，${tgt.x > 0 ? '上' : tgt.x < 0 ? '下' : ''}仰 ${Math.abs(tgt.x)}°`;

  // 指针：鼠标悬停即倾斜；触屏和笔要按住拖动，松手回正
  const aim = (e) => { const r = wrap.getBoundingClientRect(); go((0.5 - (e.clientY - r.top) / r.height) * 2 * MAX, ((e.clientX - r.left) / r.width - 0.5) * 2 * MAX); };
  wrap.addEventListener('pointerdown', (e) => { if (still() || e.pointerType === 'mouse') return; cancelAnimationFrame(sw); wrap.setPointerCapture(e.pointerId); aim(e); });
  wrap.addEventListener('pointermove', (e) => { if (still() || (e.pointerType !== 'mouse' && !wrap.hasPointerCapture(e.pointerId))) return; cancelAnimationFrame(sw); aim(e); });
  wrap.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse' && !still()) go(0, 0); });
  wrap.addEventListener('lostpointercapture', () => go(0, 0));
  mc.addEventListener('keydown', (e) => {
    const m = { ArrowLeft: [0, -4], ArrowRight: [0, 4], ArrowUp: [4, 0], ArrowDown: [-4, 0] }[e.key];
    if (!m && e.key !== 'Escape') return;
    e.preventDefault();
    if (still()) return say('已开启减少动态效果：卡片保持静止');
    cancelAnimationFrame(sw);
    if (m) go(tgt.x + m[0], tgt.y + m[1]); else go(0, 0);
    say(m ? desc() : '已回正');
  });

  // 演示：目标角度沿一条 8 字形路线走 2.4 秒，最后停在右倾 10°、下仰 5°
  const sweep = () => {
    cancelAnimationFrame(sw);
    if (still()) return say('已开启减少动态效果：卡片保持静止，高光固定');
    const t0 = performance.now();
    const f = (t) => {
      if (!root.host.isConnected) return;
      const k = (t - t0) / 2400;
      if (k >= 1) { go(-5, 10); return say('演示结束：' + desc() + '，按 Esc 回正'); }
      go(Math.sin(k * Math.PI * 4) * 7, Math.sin(k * Math.PI * 2) * MAX);
      sw = requestAnimationFrame(f);
    };
    sw = requestAnimationFrame(f);
  };
  root.querySelector('.ctl').addEventListener('click', sweep);
  if (still()) root.querySelector('.hint').textContent = '已减少动态效果 · 卡片保持静止';
  apply();
  setTimeout(sweep, 300);
}
</script>
