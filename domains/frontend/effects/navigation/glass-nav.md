---
zh: 毛玻璃导航栏
en: Frosted glass navbar
order: 10
---

## 是什么

导航栏半透明，向下滚动时能隐约看到下面的内容，像隔着一层磨砂玻璃。

## 适合

内容图片丰富的官网、作品集的吸顶导航。

## 注意

全页 backdrop-filter 不超过两处；中低端手机上开销大。

## 要点

- 下方区块深浅差别大时，栏里文字和图标跟着换黑白：区块标 data-tone，按导航栏下面是哪个区块切换配色，做法见「跟着背景换黑白」。
- 可选流动高光：栏内一条斜向高光随滚动缓慢平移（滚动驱动动画，只动 transform），像玻璃在动；全页只这一处。

## 提示词

把{顶部导航}做成「毛玻璃导航栏」：吸顶，背景是 70% 不透明度的页面底色加 backdrop-filter: blur(12px) saturate(1.4)，下边一条 1px 的浅色分割线；页面没有滚动时可完全透明，滚动后再出现玻璃效果；不支持 backdrop-filter 时退回为 95% 不透明的实色；文字对比度按最差的背景核对；下方区块深浅差别大时，给区块标 data-tone，按导航栏下方的区块切换文字和图标配色。

## 示例

<style>
:host{display:block;height:100%}
.page{height:100%;overflow:auto;background:#fff}
nav{position:sticky;top:0;z-index:1;display:flex;justify-content:space-between;padding:12px 16px;font:600 14px system-ui;color:#18181b;background:rgba(255,255,255,.7);-webkit-backdrop-filter:blur(12px) saturate(1.4);backdrop-filter:blur(12px) saturate(1.4);border-bottom:1px solid rgba(0,0,0,.06)}
nav span{font-weight:500;color:#3f4147}
.content{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:12px 16px 200px}
.content i{height:70px;border-radius:10px;background:linear-gradient(135deg,#ffb27a,#f472b6)}
.content i:nth-child(2n){background:linear-gradient(135deg,#60a5fa,#a78bfa)}
.content i:nth-child(3n){background:linear-gradient(135deg,#34d399,#fde047)}
</style>

<div class="page"><nav>MyPrompts<span>产品　定价　文档</span></nav><div class="content"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
