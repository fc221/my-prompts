---
zh: 高度平滑展开
en: Smooth height expand
order: 50
---

## 是什么

点一下标题，内容区的高度从 0 平滑展开到正好合适，收起时同样平滑，没有跳动。

## 适合

折叠面板、常见问题、“展开更多”、筛选区的高级条件。

## 注意

不要用 max-height: 9999px 的写法，收起时会先停顿一下再动。

## 提示词

给{折叠面板 / 展开更多}加「高度平滑展开」：用 grid-template-rows 从 0fr 过渡到 1fr（内层 min-height: 0; overflow: hidden），约 260ms、减速曲线，不写死高度；支持的浏览器也可以用 interpolate-size: allow-keywords 直接过渡 height: auto；收起后内容 visibility: hidden，不能被 Tab 聚焦；触发按钮带 aria-expanded 和 aria-controls；减少动态效果时直接显示和隐藏。
