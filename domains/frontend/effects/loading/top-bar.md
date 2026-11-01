---
zh: 顶部加载条
en: Top loading bar
order: 30
---

## 是什么

切换页面时，屏幕最顶上出现一条细线，先快速走到大半，再慢慢推进，完成时走满并消失。

## 适合

单页应用的路由切换、整页数据刷新。

## 注意

不要用在页面内的局部请求上。

## 提示词

给{单页应用的页面切换}加「顶部加载条」：切换超过 300ms 才出现，贴在视口最顶端，高 2–3px、品牌色；先快速走到约 75%，再缓慢推进，加载完成时走满并淡出；失败时停止并在页面内说明；层级在顶栏之上。

## 示例

<style>
.zone{position:relative;height:100%;display:grid;place-items:center;background:#fff;overflow:hidden}
.bar{position:absolute;top:0;left:0;right:0;height:3px;background:#2f6bff;transform-origin:left;transform:scaleX(0);opacity:0}
button{font:14px system-ui;padding:8px 14px}
</style>

<div class="zone"><i class="bar"></i><button type="button" class="ctl">模拟切换页面</button></div>

<script type="module">
export default function demo(root) {
  const bar = root.querySelector('.bar'); root.querySelector('button').onclick = () => { bar.style.transition = 'none'; bar.style.opacity = 1; bar.style.transform = 'scaleX(0)'; bar.offsetWidth; bar.style.transition = 'transform 1.2s cubic-bezier(.1,.7,.3,1)'; bar.style.transform = 'scaleX(.75)'; setTimeout(() => { bar.style.transition = 'transform .25s ease, opacity .3s ease .25s'; bar.style.transform = 'scaleX(1)'; bar.style.opacity = 0; }, 1600); };
}
</script>
