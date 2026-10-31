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
.page{height:100%;overflow:auto;scrollbar-width:none;background:#fff;color:#18181b;font:13px/1.4 system-ui,"PingFang SC",sans-serif}
.page::-webkit-scrollbar{display:none}
nav{position:sticky;top:0;z-index:1;display:flex;justify-content:space-between;padding:12px 16px;font-weight:600;font-size:14px;background:rgba(255,255,255,.7);-webkit-backdrop-filter:blur(12px) saturate(1.4);backdrop-filter:blur(12px) saturate(1.4);border-bottom:1px solid rgba(0,0,0,.06)}
nav span{font-weight:500;color:#3f4147}
.content{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;padding:12px 16px 120px}
figure{margin:0}
.content i{display:block;height:84px;border-radius:12px;background:linear-gradient(135deg,#ffb27a,#f472b6)}
.content figure:nth-child(2n) i{background:linear-gradient(135deg,#60a5fa,#a78bfa)}
.content figure:nth-child(3n) i{background:linear-gradient(135deg,#34d399,#fde047)}
figcaption{margin-top:5px;font-size:12px;color:#3f4147;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
</style>

<div class="page"><nav>MyPrompts<span>产品　定价　文档</span></nav><div class="content"><figure><i></i><figcaption>春季系列</figcaption></figure><figure><i></i><figcaption>夜跑装备</figcaption></figure><figure><i></i><figcaption>露营套装</figcaption></figure><figure><i></i><figcaption>通勤背包</figcaption></figure><figure><i></i><figcaption>海岛假期</figcaption></figure><figure><i></i><figcaption>城市骑行</figcaption></figure></div></div>

<script type="module">
export default function demo(root) {
  // 自动演示：往下滚一点，让第一排图片压到导航栏下面，透出磨砂效果
  const page = root.querySelector('.page'), still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(() => { if (root.host.isConnected) page.scrollTo({ top: 64, behavior: still ? 'auto' : 'smooth' }); }, 300);
}
</script>
