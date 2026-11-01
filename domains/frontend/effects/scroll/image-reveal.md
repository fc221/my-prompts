---
zh: 图片滚动揭幕
en: Image reveal on scroll
order: 30
---

## 是什么

图片滚动到视口时像拉开幕布一样从一侧展开，同时轻微缩放回原大小。

## 适合

案例、作品集、品牌故事里少量重点大图。

## 注意

一页最多两三张；商品图、头像这类需要马上看清的图片不要用。

## 提示词

给{文章或案例里的大图}加「滚动揭幕」：图片进入视口 30% 时，用 clip-path: inset() 从左向右（或从下往上）揭开，900ms、缓入缓出；图片本身同时从 1.08 缩放回 1；只播一次，用 IntersectionObserver 监听图片的外层容器（不要监听被 clip-path 裁掉的图片本身，它的可见比例会一直是 0）；首屏的图不做，免得拖慢最大内容绘制；揭开前先占好位，不让页面跳动；减少动态效果时直接显示。

## 示例

<style>
:host{display:block;height:100%}
.page{height:100%;overflow:auto;scrollbar-width:none;padding:14px 20px 0;background:#f7f5f2;color:#1f2329;font:14px/1.5 system-ui,"PingFang SC",sans-serif}
.page::-webkit-scrollbar{display:none}
.hd{margin:0 0 8px;font-weight:600}
figure{margin:0 0 20px}
.img{height:clamp(96px,calc(100cqh - 90px),200px);border-radius:14px;overflow:hidden;clip-path:inset(0 100% 0 0 round 14px);transition:clip-path .9s cubic-bezier(.65,0,.35,1)}
.ph{height:100%;display:grid;place-items:center;background:linear-gradient(135deg,#f6d2a8,#c7d7fb);transform:scale(1.08);transition:transform 1.2s cubic-bezier(.2,.7,.2,1)}
.p2{background:linear-gradient(135deg,#bfe3d0,#f9d9a6)}
.ph svg{width:56px;fill:rgba(255,255,255,.8)}
.img.in{clip-path:inset(0 0 0 0 round 14px)}
.img.in .ph{transform:none}
figcaption{margin-top:8px;color:#5b616e;font-size:13px}
@media (prefers-reduced-motion:reduce){.img{clip-path:none;transition:none}
.ph{transform:none;transition:none}
}
</style>

<div class="page"><p class="hd">新仓启用一个月</p><figure><div class="img"><div class="ph"><svg viewBox="0 0 48 36" aria-hidden="true"><circle cx="34" cy="10" r="5"/><path d="M0 36 L16 16 L26 27 L32 21 L48 36 Z"/></svg></div></div><figcaption>华东区次日达覆盖率提升到 92%</figcaption></figure><figure><div class="img"><div class="ph p2"><svg viewBox="0 0 48 36" aria-hidden="true"><circle cx="34" cy="10" r="5"/><path d="M0 36 L16 16 L26 27 L32 21 L48 36 Z"/></svg></div></div><figcaption>分拣线改造后，日处理量翻了一倍</figcaption></figure></div>

<script type="module">
export default function demo(root) {
  // 监听没被裁剪的外层 figure：图片自己被 clip-path 裁成 0 宽时，浏览器算出的可见比例一直是 0。第一张在首屏里，挂载后就揭开；第二张等滚到它
  const page = root.querySelector('.page');
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.querySelector('.img').classList.add('in'); io.unobserve(e.target); } }), { root: page, threshold: .3 });
  root.querySelectorAll('figure').forEach((f) => io.observe(f));
}
</script>
