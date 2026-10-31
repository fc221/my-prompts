---
zh: 拖动对比前后
en: Before-after slider
order: 10
---

## 是什么

同一位置叠着处理前、处理后两张图，中间一条带圆形把手的分割线，左右拖动它，左边露出原图、右边露出处理结果。

## 适合

修图、调色、去背景、AI 增强这类“效果好不好一眼比出来”的功能介绍；装修翻新、产品改版的前后案例。

## 不适合

两张图构图对不齐（机位、裁切不同）时没法逐点对比，改成左右并排或上下两张；要比较三种以上方案时用缩略图切换；只是想让图片好看地出场，用「图片滚动揭幕」。

## 注意

常见写法是把上层容器的宽度设成 P%，结果图片被压窄或跟着左右滑，两边的景物对不上。上层图片保持整幅大小、和下层完全重合，只用 clip-path 剪掉右边那一块。

## 要点

- 两张图同尺寸、同裁切叠放，上层用 clip-path: inset(0 calc(100% - P) 0 0) 露出左边 P；分割线 2px 白线 + 36–44px 圆形把手，默认停在 50%。
- 左上、右上各一个标签写明“原片”“调色后”，标签跟着各自那一半被遮住，不浮在另一边。
- 按下画面任意处分割线就跳过去并开始拖动，用 setPointerCapture 接住移出画面后的移动；横向对比时容器 touch-action: pan-y，竖着滑仍能滚动页面。
- 把手是 role="slider"，aria-valuenow 0–100，aria-valuetext 写“原片 40%，调色后 60%”；←/→ 每次 2%，Shift 加大到 10%，Home / End 到两端。
- 拖动结束后用 role="status" 播报一次当前比例，拖动过程中不连续播报。
- 首次出现可以自动左右摆一次（约 1.5 秒）提示能拖，用户一碰就停；减少动态效果时不摆，直接停在中间。

## 提示词

给{图片处理功能}的介绍区做「拖动对比前后」：{处理前图片}和{处理后图片}同尺寸、同裁切叠放，上层用 clip-path 只露出左边一部分，拖动时两张图都不移动、不缩放；中间一条 2px 白色分割线和 40px 圆形把手，默认在 50%；左上标“{处理前名称}”、右上标“{处理后名称}”，各自跟着那一半被遮住；按下画面任意处分割线跳过去并可继续拖，用 pointer capture，容器 touch-action: pan-y；把手是 role="slider"，aria-valuetext 写清两边各占多少，←/→ 每次 2%、Shift 10%、Home / End 到两端；松手后用 role="status" 播报一次比例；首次出现自动左右摆一次提示可拖，用户操作即停，减少动态效果时不摆。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<link rel="stylesheet" href="../../_shared/app-card-photos.css">
<style>
.st{padding:10px;background:#eceef2}
.ba{--p:50%;position:relative;height:100%;border-radius:12px;overflow:hidden;touch-action:pan-y;cursor:ew-resize;user-select:none;-webkit-user-select:none}
.im{position:absolute;inset:0}
.bf{clip-path:inset(0 calc(100% - var(--p)) 0 0);filter:saturate(.18) contrast(.82) brightness(1.06)}
.tag{position:absolute;top:10px;padding:2px 9px;border-radius:999px;background:rgba(18,20,26,.52);color:#fff;font-size:12px;font-weight:500;line-height:18px;white-space:nowrap}
.bf .tag{left:10px}
.af .tag{right:10px}
.bar{position:absolute;top:0;bottom:0;left:var(--p);width:2px;margin-left:-1px;background:#fff;box-shadow:0 0 6px rgba(0,0,0,.25);outline:none}
.knob{position:absolute;top:50%;left:50%;display:grid;place-items:center;width:36px;height:36px;margin:-18px 0 0 -18px;border-radius:50%;background:#fff;color:#1f2329;box-shadow:0 2px 10px rgba(0,0,0,.28)}
.knob svg{width:20px;height:20px}
.bar:focus-visible .knob{outline:2px solid #3b5bdb;outline-offset:2px}
.cap{position:absolute;left:10px;bottom:10px;padding:2px 8px;border-radius:6px;background:rgba(255,255,255,.86);color:#3a3f48;font-size:11px;line-height:18px;white-space:nowrap}
@container (min-height:260px){.st{padding:14px}
.tag{top:14px;padding:3px 11px;font-size:13px}
.bf .tag{left:14px}
.af .tag{right:14px}
.knob{width:44px;height:44px;margin:-22px 0 0 -22px}
.cap{left:14px;bottom:14px;font-size:12px}
}
</style>

<div class="st"><div class="ba"><div class="im af ph6"><span class="tag">调色后</span></div><div class="im bf ph6"><span class="tag">原片</span></div><div class="bar" role="slider" tabindex="0" aria-label="前后对比分割线" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-valuetext="原片 50%，调色后 50%"><i class="knob" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7.5 5 2.5 10l5 5M12.5 5l5 5-5 5"/></svg></i></div><span class="cap" aria-hidden="true">滤镜 · 春野 07</span></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const ba = root.querySelector('.ba'), bar = root.querySelector('.bar'), msg = root.querySelector('[role=status]');
  let p = 50, raf = 0;
  const set = (v) => {
    p = Math.max(0, Math.min(100, v)); const n = Math.round(p);
    ba.style.setProperty('--p', p + '%');
    bar.setAttribute('aria-valuenow', n); bar.setAttribute('aria-valuetext', `原片 ${n}%，调色后 ${100 - n}%`);
  };
  const at = (e) => { const r = ba.getBoundingClientRect(); set((e.clientX - r.left) / r.width * 100); };
  const say = () => { msg.textContent = bar.getAttribute('aria-valuetext'); };
  ba.addEventListener('pointerdown', (e) => { cancelAnimationFrame(raf); ba.setPointerCapture(e.pointerId); at(e); });
  ba.addEventListener('pointermove', (e) => { if (ba.hasPointerCapture(e.pointerId)) at(e); });
  ba.addEventListener('lostpointercapture', say); // 松手、被系统取消（竖向滚动）都会走这里
  bar.addEventListener('keydown', (e) => {
    const k = { ArrowLeft: -2, ArrowDown: -2, ArrowRight: 2, ArrowUp: 2, PageDown: -10, PageUp: 10 }[e.key];
    if (k !== undefined) set(p + (e.shiftKey ? k * 5 : k));
    else if (e.key === 'Home') set(0);
    else if (e.key === 'End') set(100);
    else return;
    e.preventDefault(); cancelAnimationFrame(raf);
  });
  // 首次出现左右摆一次提示能拖：50 → 78 → 22 → 50
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const t0 = performance.now();
  const tick = (t) => {
    if (!root.host.isConnected) return;
    const k = Math.min(1, (t - t0) / 1500);
    set(50 + 28 * Math.sin(k * Math.PI * 2));
    if (k < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
}
</script>
