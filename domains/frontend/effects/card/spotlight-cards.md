---
zh: 鼠标跟随光晕卡片
en: Spotlight card grid
order: 30
---

## 是什么

一组深色卡片上，鼠标经过的位置亮起一团光，光会照亮附近卡片的边框。

## 适合

深色官网的功能卡片墙、定价卡片。

## 注意

一页只用一处；卡片本身不加额外阴影。

## 提示词

给{深色卡片网格}加「鼠标跟随光晕」：鼠标在网格上移动时，每张卡片的边框和背景在鼠标位置附近亮起半径约 200px 的柔光（径向渐变，低不透明度的白或品牌色），离开网格后淡出；只更新 CSS 变量；只在鼠标设备上启用。

## 示例

<style>
:host{display:block;height:100%;background:#0b0b10}
.grid{height:100%;box-sizing:border-box;padding:18px;display:grid;grid-template-columns:1fr 1fr;gap:10px}
.c{--x:-999px;--y:-999px;position:relative;border-radius:12px;display:grid;place-items:center;font:500 14px system-ui;color:#d4d6dd;background:radial-gradient(200px circle at var(--x) var(--y),rgba(255,255,255,.08),transparent 60%),#15161c}
.c::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1px;background:radial-gradient(200px circle at var(--x) var(--y),rgba(255,255,255,.45),rgba(255,255,255,.06) 60%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
</style>

<div class="grid"><div class="c">实时监控</div><div class="c">统一计费</div><div class="c">任务追踪</div><div class="c">权限隔离</div></div>

<script type="module">
export default function demo(root) {
  const g = root.querySelector('.grid'); g.addEventListener('pointermove', (e) => g.querySelectorAll('.c').forEach((c) => { const r = c.getBoundingClientRect(); c.style.setProperty('--x', e.clientX - r.left + 'px'); c.style.setProperty('--y', e.clientY - r.top + 'px'); })); g.addEventListener('pointerleave', () => g.querySelectorAll('.c').forEach((c) => { c.style.setProperty('--x', '-999px'); c.style.setProperty('--y', '-999px'); }));
}
</script>
