---
zh: 磁吸按钮
en: Magnetic button
order: 20
---

## 是什么

鼠标靠近时按钮像被磁铁吸住一样朝鼠标偏移，离开后带一点回弹回到原位。

## 适合

官网首屏的主行动按钮（只用在一两个最重要的按钮上）。

## 注意

全站回弹力度统一；不要给所有按钮都加。

## 提示词

给{页面上最重要的那个按钮}加「磁吸按钮」效果：鼠标进入按钮周围约 60px 时，按钮朝鼠标方向偏移（偏移量为鼠标相对按钮中心距离的 0.3 倍，最多 8px），按钮里的文字或图标再多跟一点；离开后用回弹曲线 cubic-bezier(.34,1.56,.64,1) 回到原位；只在鼠标设备上启用，触屏和减少动态效果时不动。

## 示例

<style>
:host{display:block;height:100%}
.zone{height:100%;display:grid;place-items:center;background:#f7f5f2}
.btn{font:600 15px system-ui;color:#fff;background:#18181b;border:0;border-radius:999px;padding:12px 26px;transition:transform .5s cubic-bezier(.34,1.56,.64,1);cursor:pointer}
.btn span{display:inline-block;transition:transform .5s cubic-bezier(.34,1.56,.64,1)}
</style>

<div class="zone"><button class="btn"><span>开始使用</span></button></div>

<script type="module">
export default function demo(root) {
  const z = root.querySelector('.zone'), b = root.querySelector('.btn'), s = b.querySelector('span'); if (!matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  z.addEventListener('pointermove', (e) => { const r = b.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2, dx = e.clientX - cx, dy = e.clientY - cy; const near = Math.abs(dx) < r.width / 2 + 60 && Math.abs(dy) < r.height / 2 + 60; const k = near ? .3 : 0, clamp = (v) => Math.max(-8, Math.min(8, v)); b.style.transform = 'translate(' + clamp(dx * k) + 'px,' + clamp(dy * k) + 'px)'; s.style.transform = 'translate(' + clamp(dx * k * .5) + 'px,' + clamp(dy * k * .5) + 'px)'; });
  z.addEventListener('pointerleave', () => { b.style.transform = s.style.transform = ''; });
}
</script>
