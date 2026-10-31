---
zh: 阅读进度条
en: Scroll progress bar
order: 10
---

## 是什么

页面顶部一条细线随着滚动从左到右增长，显示读到了哪里。

## 适合

长文章、文档、教程页。

## 注意

只动 transform: scaleX，不动 width。

## 提示词

给{长文章页}加「阅读进度条」：顶部固定一条 3px 高的品牌色细线，宽度随滚动进度从 0 增长到 100%；优先用 CSS 滚动驱动动画（animation-timeline: scroll()），不支持时用 requestAnimationFrame 读取滚动位置；对读屏隐藏。
