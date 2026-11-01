---
zh: 极光渐变背景
en: Aurora gradient
order: 10
---

## 是什么

几团柔和的色光在背景里缓慢漂移、互相融合，像极光一样流动。

## 适合

官网首屏、产品发布页、登录页背景。

## 注意

只动 transform，不动 background-position；同屏只用一处；小屏可减少色团数量。

## 提示词

给{首屏区块}加「极光渐变背景」：3–4 团大半径模糊的色光（用品牌色和它的邻近色，饱和度偏低），各自缓慢漂移、相互融合，一轮 20–30 秒；放在内容下层，文字区域的对比度仍要达标；减少动态效果时停在静态画面。

## 示例

<style>
.stage{position:relative;height:100%;overflow:hidden;background:#f7f5f2;display:grid;place-items:center}
.b{position:absolute;width:60%;aspect-ratio:1;border-radius:50%;filter:blur(40px);opacity:.55}
.b1{background:#ffb27a;left:-10%;top:10%;animation:m1 18s ease-in-out infinite alternate}
.b2{background:#a78bfa;right:-10%;top:-10%;animation:m2 22s ease-in-out infinite alternate}
.b3{background:#6ee7b7;left:25%;bottom:-30%;animation:m3 26s ease-in-out infinite alternate}
p{position:relative;font:600 20px/1.4 system-ui;color:#1f1f23;margin:0}
@keyframes m1{to{transform:translate(30%,20%) scale(1.2)}
}
@keyframes m2{to{transform:translate(-25%,30%) scale(.9)}
}
@keyframes m3{to{transform:translate(20%,-25%) scale(1.15)}
}
@media (prefers-reduced-motion:reduce){.b{animation:none}
}
</style>

<div class="stage"><i class="b b1"></i><i class="b b2"></i><i class="b b3"></i><p>把想法，做成产品</p></div>
