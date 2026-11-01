---
zh: 噪点颗粒质地
en: Film grain overlay
order: 30
---

## 是什么

整块颜色上覆盖一层细微的颗粒噪点，像胶片或纸张，纯色不再显得廉价。

## 适合

大面积纯色或渐变背景、海报风首屏、深色区块。

## 注意

噪点用一张小尺寸 SVG 平铺，不用大图；pointer-events: none。

## 提示词

给{大面积纯色或渐变背景}叠一层「噪点颗粒质地」：用 SVG feTurbulence 生成的细颗粒噪点，不透明度 6%–10%，铺满且不随滚动移动；只作质感，不影响文字对比度。

## 示例

<style>
.stage{position:relative;height:100%;display:grid;place-items:center;background:linear-gradient(135deg,#ff7a59,#8b5cf6)}
.stage::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.12;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
p{position:relative;font:700 28px system-ui;color:#fff;margin:0}
</style>

<div class="stage"><p>Grain</p></div>
