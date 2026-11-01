---
zh: 指针后面跟一串图
en: Image trail
order: 80
---

## 是什么

鼠标在一块区域里移动时，每走过一小段距离就在指针处冒出一张作品小图，几张小图沿着轨迹排开，短暂停留后依次缩小淡出。

## 适合

摄影师、设计工作室、品牌的作品集首屏，展览和活动页里“随手一划就能看到很多作品”的预览区。

## 不适合

商品列表、文章页这类要专心读内容的页面；作品本身需要被认真看清时，用网格或「图片预览（灯箱）」；触屏上不要拿手指滑动去模拟，手指滑动是在滚动页面。

## 注意

出图的节奏要跟着“指针走了多远”，不能跟着“来了几个 pointermove”：事件频率随设备从每秒 60 到 240 次不等，按事件出图在高刷屏上会糊成一团。拖尾层 pointer-events: none，下面的链接照常能点。

## 要点

- 指针每累计移动约 80–120px（小区域按短边的 30% 左右）出一张图，图片按顺序轮换，带 ±6° 以内的随机旋转。
- 每张的生命周期约 1 秒：150ms 放大淡入 → 停留约 400ms → 约 450ms 缩小下沉淡出；同时最多 6 张，复用固定的 6 个元素，新图压在旧图上面。
- 指针离开区域或页面失焦后停止出图，已有的图走完退场；组件卸载时停掉所有动画。
- 图片提前加载好，用小尺寸缩略图，不在出图时才请求；只动 transform 和 opacity。
- 触屏不跟随滑动，改成点按处出一张，或者直接显示静态作品网格；提供“演示”按钮或可见的作品链接，键盘用户不靠指针也能看到作品。
- 拖尾只是预览，作品名和入口要有真实的文字链接；减少动态效果时不出拖尾，改成静态排开的 3 张缩略图。

## 提示词

给{作品集首屏}加「指针后面跟一串图」：鼠标在这块区域移动时，每累计移动 100px 在指针处出一张{作品缩略图}（按顺序轮换，随机旋转 ±6°），每张 150ms 放大淡入、停留 400ms、450ms 缩小下沉淡出，同时最多 6 张，复用 6 个元素，新的压在上面；拖尾层 pointer-events: none，不挡下面的链接；指针离开或页面失焦时停止出图，卸载时停掉动画；缩略图提前加载，只动 transform 和 opacity；触屏只在点按处出一张，不跟随滑动；作品入口用真实的文字链接；减少动态效果时改成静态排开的 3 张缩略图。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<link rel="stylesheet" href="../../_shared/app-card-photos.css">
<style>
.st{display:flex;flex-direction:column;justify-content:space-between;padding:14px 16px;background:radial-gradient(120% 90% at 80% 0%,#2a2b33,#141519);color:#f2f0ea}
.ey{margin:0;color:#a7a59f;font-size:11px;letter-spacing:.06em}
.hd{margin:4px 0 0;font-size:22px;font-weight:700;line-height:1.2}
.ft{display:flex;align-items:center;justify-content:space-between;gap:8px}
.ft a{color:#f2f0ea;font-size:12px;text-underline-offset:3px}
.ft a:focus-visible{outline-color:#b9c6ff}
.hint{display:flex;align-items:center;gap:5px;color:#8d8b85;font-size:11px;white-space:nowrap}
.hint svg{width:12px;height:12px}
.demo{position:absolute;right:12px;top:12px}
.demo.ctl{height:28px;padding:0 12px;font-size:12px}
.trail{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.trail i{position:absolute;left:0;top:0;width:58px;height:72px;border:3px solid #f6f3ec;border-radius:6px;box-shadow:0 8px 18px rgba(0,0,0,.4);opacity:0}
.trail.static i:nth-child(-n+3){opacity:1}
.trail.static i:nth-child(1){left:62%;top:46%;transform:translate(-50%,-50%) rotate(-7deg)}
.trail.static i:nth-child(2){left:72%;top:40%;transform:translate(-50%,-50%) rotate(2deg)}
.trail.static i:nth-child(3){left:82%;top:48%;transform:translate(-50%,-50%) rotate(8deg)}
@container (min-height:260px){.st{padding:26px 30px}
.ey{font-size:13px}
.hd{font-size:36px}
.ft a{font-size:14px}
.hint{font-size:13px}
.demo{right:20px;top:20px}
.demo.ctl{height:32px;padding:0 14px;font-size:13px}
.trail i{width:92px;height:114px;border-width:4px;border-radius:8px}
}
</style>

<div class="st"><div><p class="ey">MyPrompts · 摄影</p><h3 class="hd">把光<br>留在路上</h3></div><div class="ft"><a href="#">查看全部 38 组作品 →</a><span class="hint" aria-hidden="true"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y=".8" width="6" height="10.4" rx="3"/><path d="M6 3v1.6"/></svg>移动鼠标看作品</span></div><div class="trail" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div><button type="button" class="ctl demo">演示</button><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const st = root.querySelector('.st'), layer = root.querySelector('.trail'), pool = [...layer.children], btn = root.querySelector('.demo'), msg = root.querySelector('[role=status]');
  root.querySelector('a').addEventListener('click', (e) => e.preventDefault());
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { // 不出拖尾，静态排开 3 张
    pool.forEach((el, i) => { el.className = 'ph' + (i + 1); }); layer.classList.add('static'); btn.hidden = true; return;
  }
  let k = 0, z = 0, n = 0, acc = 0, lx = null, ly = 0, raf = 0;
  const spawn = (x, y) => {
    const el = pool[k++ % pool.length], r = (Math.random() - 0.5) * 12, at = (s, dy = 0) => `translate(${x}px,${y}px) translate(-50%,calc(-50% + ${dy}px)) scale(${s}) rotate(${r}deg)`;
    el.getAnimations().forEach((a) => a.cancel());
    el.className = 'ph' + (n++ % 6 + 1); el.style.zIndex = ++z;
    el.animate([
      { opacity: 0, transform: at(0.6), easing: 'cubic-bezier(.2,0,0,1)' },
      { opacity: 1, transform: at(1), offset: 0.15 },
      { opacity: 1, transform: at(1), offset: 0.55, easing: 'cubic-bezier(.4,0,1,1)' },
      { opacity: 0, transform: at(0.78, 12) },
    ], { duration: 1000, fill: 'both' }); // 150ms 放大淡入 → 停 400ms → 450ms 缩小下沉淡出
  };
  const move = (x, y) => { // 按累计移动距离出图，不按事件次数
    if (lx !== null) acc += Math.hypot(x - lx, y - ly);
    lx = x; ly = y;
    if (acc >= Math.min(layer.clientWidth, layer.clientHeight) * 0.3) { acc = 0; spawn(x, y); }
  };
  const local = (e) => { const r = layer.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const resume = () => pool.forEach((el) => el.getAnimations().forEach((a) => a.playState === 'paused' && a.play()));
  st.addEventListener('pointermove', (e) => { if (e.pointerType === 'touch') return; cancelAnimationFrame(raf); resume(); move(...local(e)); });
  st.addEventListener('pointerleave', () => { lx = null; });
  st.addEventListener('pointerdown', (e) => { if (e.pointerType === 'touch' && !e.target.closest('a,button')) spawn(...local(e)); }); // 触屏：点按处出一张，不跟随滑动
  const play = () => { // 沿一条波浪线走一遍；结束时停住最新的 3 张当缩略图，指针一动再继续退场
    cancelAnimationFrame(raf); resume(); lx = null; acc = 0;
    const W = layer.clientWidth, H = layer.clientHeight; let t0 = 0;
    msg.textContent = '演示：指针划过时沿途浮现作品缩略图';
    const tick = (t) => {
      if (!root.host.isConnected) return;
      t0 ||= t; const p = Math.min(1, (t - t0) / 1600);
      move(W * (0.4 + 0.45 * p), H * (0.5 + 0.16 * Math.sin(p * Math.PI * 2.5)));
      if (p < 1) { raf = requestAnimationFrame(tick); return; }
      lx = null;
      [...pool].sort((a, b) => b.style.zIndex - a.style.zIndex).slice(0, 3).forEach((el) => el.getAnimations().forEach((a) => { a.currentTime = 400; a.pause(); }));
    };
    raf = requestAnimationFrame(tick);
  };
  btn.addEventListener('click', play);
  setTimeout(play, 300);
}
</script>
