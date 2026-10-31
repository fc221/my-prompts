---
zh: 滚动钉住叙事
en: Sticky scroll story
order: 60
---

## 是什么

一侧的主图钉在屏幕上不动，另一侧的文字段落滚过时，主图跟着切换内容或放大局部。

## 适合

官网介绍产品工作方式的那一段（全页唯一的主动效）。

## 注意

用 IntersectionObserver 判断当前段落；这是官网的“主时刻”，同页不再叠加其他滚动特效。

## 提示词

把{产品介绍区}做成「滚动钉住叙事」：左侧主视觉 position: sticky 钉在视口中间，右侧 3–4 段文字依次滚过；哪一段进入视口中部，主视觉就切换到对应的画面（淡入淡出 300ms）并高亮对应部位；窄屏改为文字和图片上下交替；减少动态效果时直接切换。

## 示例

<style>
:host{display:block;height:100%}
.page{height:100%;overflow:auto;background:#fff}
.wrap{display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:0 16px}
.pin{position:sticky;top:30px;height:160px;border-radius:14px;background:#18181b;display:grid;place-items:center}
.v{font:700 56px system-ui;color:#fff;transition:opacity .3s}
.steps p{height:180px;margin:0;display:flex;align-items:center;font:600 15px system-ui;color:#9aa0a6;transition:color .3s}
.steps p.on{color:#18181b}
.steps{padding-bottom:120px}
</style>

<div class="page"><div class="wrap"><div class="pin"><b class="v">1</b></div><div class="steps"><p data-i="1">① 导入订单数据</p><p data-i="2">② 设置发货规则</p><p data-i="3">③ 开启自动对账</p></div></div></div>

<script type="module">
export default function demo(root) {
  const page = root.querySelector('.page'), v = root.querySelector('.v'); const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { root.querySelectorAll('.steps p').forEach((p) => p.classList.toggle('on', p === e.target)); v.style.opacity = 0; setTimeout(() => { v.textContent = e.target.dataset.i; v.style.opacity = 1; }, 150); } }), { root: page, rootMargin: '-45% 0px -45% 0px' }); root.querySelectorAll('.steps p').forEach((p) => io.observe(p));
}
</script>
