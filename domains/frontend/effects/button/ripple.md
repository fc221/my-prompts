---
zh: 水波点击
en: Ripple click
aka: 水波按钮 涟漪 波纹
order: 70
---

## 是什么

点击时从手指或鼠标按下的位置扩散出一圈水波，然后淡去。

## 适合

App 风格的按钮、列表项、卡片的点击反馈。

## 注意

水波从按下点出发，不要固定从中心；连续点击各自独立。

## 提示词

给{按钮或列表项}加「水波点击」：从按下的位置放出一个小圆，400ms 内放大到覆盖整个元素并淡出，颜色用当前文字色的 20% 不透明度；元素 overflow: hidden 裁成自身形状；减少动态效果时只做底色变化。

## 示例

<style>
.zone{height:100%;display:grid;place-items:center;background:#f4f5f7}
.btn{position:relative;overflow:hidden;font:600 15px system-ui;color:#18181b;background:#fff;border:1px solid #d9dbe0;border-radius:10px;padding:14px 40px;cursor:pointer}
.r{position:absolute;border-radius:50%;background:currentColor;opacity:.2;transform:scale(0);animation:rp .45s ease-out forwards;pointer-events:none}
@keyframes rp{to{transform:scale(1);opacity:0}
}
</style>

<div class="zone"><button class="btn">点我</button></div>

<script type="module">
export default function demo(root) {
  const b = root.querySelector('.btn'); b.addEventListener('pointerdown', (e) => { if (matchMedia('(prefers-reduced-motion: reduce)').matches) return; const r = b.getBoundingClientRect(), d = Math.hypot(r.width, r.height) * 2, i = document.createElement('i'); i.className = 'r'; i.style.cssText = 'width:' + d + 'px;height:' + d + 'px;left:' + (e.clientX - r.left - d / 2) + 'px;top:' + (e.clientY - r.top - d / 2) + 'px'; b.appendChild(i); setTimeout(() => i.remove(), 500); });
}
</script>
