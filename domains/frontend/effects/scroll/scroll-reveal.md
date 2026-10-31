---
zh: 滚动渐显
en: Scroll reveal
order: 20
---

## 是什么

内容滚动到视口里时才轻轻淡入上移，一组卡片依次出现。

## 适合

官网里真正成组出现的列表（不要给每个区块都加）。

## 注意

最容易被滥用的效果；全页只给一两组列表用。

## 提示词

给{一组功能卡片}加「滚动渐显」：卡片进入视口 15% 时从下方 20px 淡入上移到位，500ms，同组相邻错开 80ms，只播一次；用 IntersectionObserver；首屏内容不做；减少动态效果时直接显示。

## 示例

<style>
:host{display:block;height:100%}
.page{height:100%;overflow:auto;background:#f7f5f2}
.hint{height:150px;margin:0;display:grid;place-items:center;font:14px system-ui;color:#6b6f76}
.list{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:0 16px 200px}
i{height:80px;border-radius:12px;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.06);opacity:0;transform:translateY(20px);transition:opacity .5s cubic-bezier(0,0,.2,1),transform .5s cubic-bezier(0,0,.2,1)}
i.in{opacity:1;transform:none}
@media (prefers-reduced-motion:reduce){i{opacity:1;transform:none;transition:none}
}
</style>

<div class="page"><p class="hint">向下滚动</p><div class="list"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>

<script type="module">
export default function demo(root) {
  const page = root.querySelector('.page'); const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { const i = [...e.target.parentNode.children].indexOf(e.target); e.target.style.transitionDelay = (i % 3) * 80 + 'ms'; e.target.classList.add('in'); io.unobserve(e.target); } }), { root: page, threshold: .15 }); root.querySelectorAll('i').forEach((i) => io.observe(i));
}
</script>
