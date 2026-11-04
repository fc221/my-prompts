---
zh: 鼠标聚光背景
en: Cursor spotlight
order: 40
---

## 是什么

深色背景上，鼠标所在的位置亮起一圈柔和的光，跟着鼠标移动。

## 适合

深色官网首屏、作品集、发布会页。

## 注意

只更新一个 CSS 变量（--x/--y），不重绘 DOM；只在精确指针设备上跟随。

## 提示词

给{深色区块}加「鼠标聚光背景」：鼠标位置亮起一圈半径约 300px 的柔光（径向渐变，品牌色、低不透明度），跟随鼠标平滑移动；触屏和减少动态效果时固定在区块中上部。

## 示例

<style>
.stage{--x:50%;--y:30%;height:100%;display:grid;place-items:center;background:radial-gradient(300px circle at var(--x) var(--y),rgba(99,102,241,.35),transparent 70%),#0b0b10}
p{font:500 16px system-ui;color:#c7c9d1;margin:0}
</style>

<div class="stage"><p>移动鼠标看看</p></div>

<script type="module">
export default function demo(root) {
  const s = root.querySelector('.stage'); if (matchMedia('(hover: hover) and (pointer: fine)').matches) s.addEventListener('pointermove', (e) => { const r = s.getBoundingClientRect(); s.style.setProperty('--x', e.clientX - r.left + 'px'); s.style.setProperty('--y', e.clientY - r.top + 'px'); });
}
</script>
