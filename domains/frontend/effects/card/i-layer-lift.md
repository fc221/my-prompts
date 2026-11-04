---
zh: 立体分层卡片
en: Depth layered card
order: 30
of: tilt
tab: 分层
---

## 是什么

按住卡片时它在 3D 里微微后仰，背景、照片、文字、按钮分成几层依次抬高，手指移动时朝指针方向倾斜，松手合回一张平卡。

## 适合

门票、会员卡、活动卡、作品封面这类少量主角卡片的按压反馈，或在引导页里展示“这张卡由哪几部分组成”。

## 不适合

长列表里的每张卡、表单和表格都不要用；普通按钮的按压用「按压回弹」；只在鼠标悬停时整张倾斜、表面加高光、不分层的是特效里的「3D 倾斜卡片」。

## 注意

分层只是按住时的反馈，松手必须合回原样；抬高的层要有投影，否则看不出高度差；卡片和祖先不能有 overflow: hidden、filter，否则 3D 会被压平。

## 要点

- 外层 perspective: 800px，卡片 transform-style: preserve-3d；背景、照片、文字、按钮各是一层，平时都在 translateZ(0)，圆角裁切放在各层自己身上。
- 按下后卡片后仰 rotateX 约 10°，各层抬高：背景 0、照片 30px、文字 50px、按钮 60px；过渡约 360ms、cubic-bezier(.2,.8,.2,1)，抬高的层加投影。
- 按住时朝指针方向倾斜：rotateY = (x − 0.5) × 16°，rotateX 在 8–12° 之间，偏转最多约 8°；跟随时过渡缩短到 80ms。
- 松手、pointercancel 时各层同时合回平卡；位移小于 8px 的松手才算点击（打开详情）。
- 卡片可聚焦，按住空格同样分层，松开合回并打开；另给一个“分层查看”开关（aria-pressed），给不方便长按的人和演示用。
- 同屏只给一张主角卡片用；卡片设 touch-action: pan-y，页面开始纵向滚动（pointercancel）时立即合回，不和滚动抢手势。
- 减少动态效果时不倾斜也不抬高，按下只加深一档阴影。

## 提示词

给{主角卡片}加「立体分层卡片」：外层 perspective 800px，卡片 transform-style: preserve-3d，把{背景、照片、文字、按钮}拆成独立的层，圆角裁切放在各层上（卡片和祖先不能 overflow: hidden）；按住卡片时卡片后仰约 10°（rotateX），各层分别抬高 translateZ 0 / 30px / 50px / 60px，抬高的层加投影，过渡 360ms；按住时随指针位置朝指针方向倾斜，最多约 8°；松手或指针取消时各层合回一张平卡，位移小于 8px 才算点击；卡片可聚焦，按住空格同样分层；另给一个“分层查看”开关（aria-pressed）；减少动态效果时不倾斜不抬高，按下只加深阴影。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<link rel="stylesheet" href="../../_shared/app-card-photos.css">
<style>
.st{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:10px 12px}
.wrap{display:flex;align-items:center;gap:40px}
.scene{perspective:800px}
.card{position:relative;display:block;width:min(288px,calc(100cqw - 24px));height:128px;border-radius:16px;transform-style:preserve-3d;transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .36s cubic-bezier(.2,.8,.2,1);cursor:pointer;touch-action:pan-y;user-select:none;-webkit-user-select:none}
.card.follow{transition-duration:.08s}
.ly{position:absolute;display:block;transform:translateZ(0);transition:transform .36s cubic-bezier(.2,.8,.2,1),box-shadow .36s,text-shadow .36s}
.l0{inset:0;border-radius:16px;background:radial-gradient(circle at 92% 0,rgba(255,255,255,.14) 0 30%,transparent 30.5%),linear-gradient(135deg,#1f3a5c,#33597f);box-shadow:0 4px 12px rgba(31,35,41,.18)}
.l1{left:10px;top:10px;bottom:10px;width:92px;border-radius:10px}
.l2{left:114px;top:12px;right:12px;display:flex;flex-direction:column;color:#fff;line-height:1.45}
.l2 b{overflow:hidden;font-size:14px;font-weight:600;text-overflow:ellipsis;white-space:nowrap}
.l2 small{overflow:hidden;color:rgba(255,255,255,.78);font-size:11px;text-overflow:ellipsis;white-space:nowrap}
.l3{right:12px;bottom:12px;height:28px;padding:0 12px;border-radius:999px;background:#ffd27a;color:#1f2329;font-size:12px;font-weight:600;line-height:28px}
.up .l0{box-shadow:0 18px 30px rgba(31,35,41,.24)}
.up .l1{transform:translateZ(30px);box-shadow:0 10px 18px rgba(8,15,30,.4)}
.up .l2{transform:translateZ(50px);text-shadow:0 6px 10px rgba(8,15,30,.6)}
.up .l3{transform:translateZ(60px);box-shadow:0 10px 16px rgba(8,15,30,.4)}
.legend{display:none;margin:0;padding:0;list-style:none;color:#5b616e;font-size:12px}
.legend li{display:flex;align-items:center;gap:8px;height:26px;white-space:nowrap}
.legend i{width:10px;height:10px;border-radius:3px}
.c3{background:#ffd27a}
.c2{background:#fff;box-shadow:inset 0 0 0 1.5px #33597f}
.c1{background:#5d6ea0}
.c0{background:#1f3a5c}
@container (min-width:560px){.legend{display:block}
.card{width:300px;height:136px}
}
@media (prefers-reduced-motion:reduce){.card{transform:none!important}
.up .ly{transform:none!important;box-shadow:none;text-shadow:none}
.up .l0{box-shadow:0 10px 26px rgba(31,35,41,.32)}
}
</style>

<div class="st"><div class="wrap"><div class="scene"><div class="card" tabindex="0" role="button" aria-label="湖畔秋日音乐会门票，按住查看分层"><span class="ly l0"></span><span class="ly l1 ph5"></span><span class="ly l2"><b>湖畔秋日音乐会</b><small>11月8日 周六 19:30</small><small>湖滨剧场 · 2 排 12 座</small></span><span class="ly l3">查看座位</span></div></div><ul class="legend" aria-hidden="true"><li><i class="c3"></i>按钮 60px</li><li><i class="c2"></i>文字 50px</li><li><i class="c1"></i>照片 30px</li><li><i class="c0"></i>背景 0</li></ul></div><button type="button" class="ctl tog" aria-pressed="false">分层查看</button><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const card = root.querySelector('.card'), scene = root.querySelector('.scene'), tog = root.querySelector('.tog'), live = root.querySelector('.sr');
  let held = false, sticky = false, sx = 0, sy = 0;
  const tilt = (x, y) => { card.style.setProperty('--rx', (10 + (0.5 - y) * 4).toFixed(1) + 'deg'); card.style.setProperty('--ry', ((x - 0.5) * 16).toFixed(1) + 'deg'); }; // 朝指针方向倾斜，最多约 8°
  const set = () => { const on = held || sticky; card.classList.toggle('up', on); if (!on) { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); } tog.setAttribute('aria-pressed', String(sticky)); };
  const at = (e) => { const r = scene.getBoundingClientRect(); return [Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)), Math.max(0, Math.min(1, (e.clientY - r.top) / r.height))]; };
  card.addEventListener('pointerdown', (e) => { if (e.button > 0) return; card.setPointerCapture(e.pointerId); held = true; sticky = false; sx = e.clientX; sy = e.clientY; tilt(...at(e)); set(); });
  card.addEventListener('pointermove', (e) => { if (!held) return; card.classList.add('follow'); tilt(...at(e)); });
  const up = (e) => { if (!held) return; held = false; card.classList.remove('follow'); set(); if (e.type === 'pointerup' && Math.hypot(e.clientX - sx, e.clientY - sy) < 8) live.textContent = '打开门票详情'; };
  card.addEventListener('pointerup', up); card.addEventListener('pointercancel', up);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { live.textContent = '打开门票详情'; return; }
    if (e.key !== ' ') return; e.preventDefault(); if (e.repeat) return;
    held = true; sticky = false; tilt(0.5, 0.35); set();
  });
  card.addEventListener('keyup', (e) => { if (e.key === ' ' && held) { held = false; set(); live.textContent = '打开门票详情'; } });
  tog.onclick = () => { sticky = !sticky; if (sticky) tilt(0.125, 0.5); set(); };
  setTimeout(() => { if (root.host.isConnected && !held) { sticky = true; tilt(0.125, 0.5); set(); } }, 300); // 缩略图停在分层状态
}
</script>
