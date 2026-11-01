---
zh: 悬停扩散填色
en: Corner fill hover
order: 40
---

## 是什么

鼠标移到卡片或按钮上时，颜色从角落的箭头处扩散开铺满整块，文字同时反色、箭头转向。

## 适合

官网的功能入口卡片、导航大按钮。

## 注意

主色只给当前悬停的这一块。

## 提示词

给{功能入口卡片}加「悬停扩散填色」：以卡片右上角的箭头为圆心，用 clip-path: circle() 在 400ms 内把品牌色扩散到整张卡片，文字同步变成反色，箭头旋转 45°；键盘聚焦时同样触发；两种状态的文字对比度都要达标；只在鼠标设备上启用。

## 示例

<style>
:host{display:grid;place-items:center;height:100%;background:#f7f5f2}
.card{position:relative;display:block;width:220px;padding:20px;border-radius:14px;background:#fff;color:#18181b;text-decoration:none;overflow:hidden;font-family:system-ui;isolation:isolate}
.card::before{content:"";position:absolute;inset:0;background:#18181b;clip-path:circle(0 at calc(100% - 26px) 26px);transition:clip-path .45s cubic-bezier(.2,0,0,1);z-index:-1}
.card:hover::before,.card:focus-visible::before{clip-path:circle(150% at calc(100% - 26px) 26px)}
b{display:block;font-size:17px}
small{color:inherit;opacity:.7}
i{position:absolute;right:16px;top:12px;font-style:normal;transition:transform .45s}
.card:hover,.card:focus-visible{color:#fff}
.card:hover i,.card:focus-visible i{transform:rotate(45deg)}
.card{transition:color .3s}
</style>

<a class="card" href="#"><b>功能总览</b><small>查看全部功能</small><i>↗</i></a>
