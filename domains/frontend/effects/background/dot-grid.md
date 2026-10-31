---
zh: 点阵渐隐背景
en: Dot grid fade
order: 50
---

## 是什么

细小的圆点排成网格，中间清楚、四周渐渐淡出。

## 适合

开发者工具、技术产品的首屏或功能区背景，显得精确克制。

## 注意

纯 CSS（radial-gradient + mask），零性能开销；暗色下改用浅色点并降低不透明度。

## 提示词

给{区块}加「点阵渐隐背景」：1.5px 的圆点、间距 20px 排成网格，颜色用很浅的中性灰；用径向遮罩让中间清楚、四周淡出；只做背景纹理，不动。

## 示例

<style>
.stage{position:relative;height:100%;display:grid;place-items:center;background:#fff}
.stage::before{content:"";position:absolute;inset:0;background-image:radial-gradient(#c9ccd3 1.5px,transparent 1.5px);background-size:20px 20px;-webkit-mask-image:radial-gradient(ellipse 70% 60% at 50% 50%,#000 40%,transparent 100%);mask-image:radial-gradient(ellipse 70% 60% at 50% 50%,#000 40%,transparent 100%)}
p{position:relative;font:600 18px system-ui;color:#18181b;margin:0}
</style>

<div class="stage"><p>每一笔订单，都清清楚楚</p></div>
