---
zh: 白墙陈列
en: Gallery wall
order: 40
---

## 是什么

纸白底、墨色字，界面自己几乎不带颜色，颜色全部来自作品；作品沿一道弧线扇形排开，离指针最近的那件抬起、摆正，两旁跟着微微放大，像站在白墙前挑画。

## 适合

艺术家和摄影师作品集、画廊与展览、设计工作室、收藏品预展。

## 不适合

手里没有好作品图的产品，空墙会显得寒酸；信息密集、要反复操作的工具页。

## 要点

- 配色：纸白 #f7f6f2 底，墨色 #1a1a1a 文字，次要 #6b6b66；界面本身不用彩色，唯一例外是居中大标题里一个短语用砖红 #b4442c
- 字体：大标题居中，600、clamp(32px, 5vw, 64px)、字距 -0.01em；编号和年份用 12px 等宽字
- 陈列：5–9 件作品配 8px 白卡框和柔和投影 0 10px 24px rgba(26,26,26,.12)，沿弧线扇形排开，越靠两端越低、越斜（±3–12°），彼此略有重叠
- 互动：指针或键盘焦点所在的那件上抬 14px、转正、放大到 1.12，左右邻居放大到 1.04，过渡 280ms；每件是按钮，Enter 打开详情
- 每件作品都有名称、作者和年份，读屏能读到
- 夜间模式只换墙色和字色、作品颜色不变，切换参考「圆形扩散切换」从按钮处扩散
- 滚动展开可选：作品从弧线散成对角阶梯，再有一张放大到满宽；长画廊参考「镜头推近的作品展」
- 和「环成一圈的画廊」的区别：这里是平面陈列，重点在作品本身和留白

## 提示词

把{作品集 / 展览}页做成白墙陈列风：纸白 #f7f6f2 底、墨色 #1a1a1a 字、次要 #6b6b66，界面本身不用彩色，颜色只来自作品；居中大标题 600、clamp(32px, 5vw, 64px)，其中一个短语用砖红 #b4442c；{6–8} 件作品配 8px 白卡框和投影 0 10px 24px rgba(26,26,26,.12)，沿弧线扇形排开，两端更低更斜（±3–12°）、略有重叠；指针或键盘焦点所在的那件上抬 14px、转正并放大到 1.12，左右邻居放大到 1.04，过渡 280ms，Enter 打开详情；每件写名称、作者和年份；夜间模式从切换按钮处圆形扩散，只换墙色和字色；窄屏改横向滑动，居中那件转正；减少动态效果时去掉抬起和倾斜；文字对比度 ≥ 4.5:1。

## 示例

<style>
:host{container-type:size}
.s{height:100%;display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 16px 10px;overflow:hidden;background:#f7f6f2;color:#1a1a1a;font:12px/1.4 system-ui,"PingFang SC",sans-serif}
.cap{font:11px/1.4 ui-monospace,Menlo,monospace;color:#6b6b66;letter-spacing:.06em}
h1{margin:0;font-size:clamp(18px,12cqh,44px);line-height:1.15;font-weight:600;letter-spacing:-.01em;text-align:center}
h1 em{font-style:normal;color:#b4442c}
.wall{position:relative;flex:1;min-height:0;align-self:stretch;display:flex;justify-content:center;align-items:flex-start;padding-top:10px}
.w{flex:none;width:13cqw;aspect-ratio:3/4;margin:0 -1.2cqw;padding:3px;border:0;border-radius:2px;background:#fff;box-shadow:0 10px 24px rgba(26,26,26,.12);transform:translateY(var(--y)) rotate(var(--r));transform-origin:50% 100%;transition:transform .28s cubic-bezier(.2,.8,.2,1),box-shadow .28s;cursor:pointer}
.w i{display:block;height:100%;background:var(--p)}
.w.nb{transform:translateY(var(--y)) rotate(var(--r)) scale(1.04)}
.w.on{position:relative;z-index:2;transform:translateY(-14px) scale(1.12);box-shadow:0 16px 32px rgba(26,26,26,.2)}
.w:focus-visible{outline:2px solid #1a1a1a;outline-offset:3px}
.msg{margin:0;min-height:17px;color:#6b6b66}
@media (prefers-reduced-motion:reduce){.w,.w.nb,.w.on{transform:none;transition:none}
}
</style>

<div class="s">
  <span class="cap">秋季陈列 · 07 件</span>
  <h1>让墙安静，<em>让画说话</em></h1>
  <div class="wall">
    <button type="button" class="w" aria-label="《晚桥》· 林知夏 · 2024" style="--p:linear-gradient(160deg,#e9c46a,#f4a261 55%,#264653)"><i></i></button>
    <button type="button" class="w" aria-label="《白月》· 周砚 · 2023" style="--p:radial-gradient(circle at 32% 34%,#f1faee 0 18%,transparent 19%),linear-gradient(#457b9d,#1d3557)"><i></i></button>
    <button type="button" class="w" aria-label="《三段》· 许南 · 2025" style="--p:linear-gradient(90deg,#e76f51 0 33%,#f4e9d8 33% 66%,#2a9d8f 66%)"><i></i></button>
    <button type="button" class="w" aria-label="《正午》· 林知夏 · 2025" style="--p:conic-gradient(from 200deg at 60% 40%,#ffb703,#fb8500,#8ecae6,#ffb703)"><i></i></button>
    <button type="button" class="w" aria-label="《细雨》· 陈未 · 2022" style="--p:repeating-linear-gradient(45deg,#cdb4db 0 8px,#ffc8dd 8px 16px)"><i></i></button>
    <button type="button" class="w" aria-label="《坡地》· 周砚 · 2024" style="--p:radial-gradient(ellipse at 50% 120%,#606c38 0 42%,#fefae0 43%)"><i></i></button>
    <button type="button" class="w" aria-label="《夜航》· 许南 · 2023" style="--p:linear-gradient(#0b132b 0 60%,#ffd166 60% 64%,#1c2541 64%)"><i></i></button>
  </div>
  <p class="msg" role="status">移到画上看看</p>
</div>

<script type="module">
export default function demo(root) {
  const ws = [...root.querySelectorAll('.w')], mid = (ws.length - 1) / 2, wall = root.querySelector('.wall'), msg = root.querySelector('.msg');
  // 越靠两端越低、越斜
  ws.forEach((w, i) => { const t = (i - mid) / mid; w.style.setProperty('--r', `${t * 11}deg`); w.style.setProperty('--y', `${t * t * 14}px`); });
  const near = (k) => ws.forEach((w, i) => { w.classList.toggle('on', i === k); w.classList.toggle('nb', k >= 0 && Math.abs(i - k) === 1); });
  // 按布局位置（不受变换影响）找离指针最近的一件，放大时不来回跳
  wall.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const x = e.clientX - wall.getBoundingClientRect().left;
    let k = 0; ws.forEach((w, i) => { if (Math.abs(w.offsetLeft + w.offsetWidth / 2 - x) < Math.abs(ws[k].offsetLeft + ws[k].offsetWidth / 2 - x)) k = i; });
    near(k);
  });
  wall.addEventListener('pointerleave', () => near(-1));
  wall.addEventListener('focusin', (e) => near(ws.indexOf(e.target)));
  wall.addEventListener('focusout', () => near(-1));
  ws.forEach((w) => (w.onclick = () => { msg.textContent = '打开 ' + w.getAttribute('aria-label'); }));
}
</script>
