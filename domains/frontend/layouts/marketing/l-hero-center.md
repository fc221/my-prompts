---
zh: 首屏居中大标题
en: Centered hero
order: 20
---

## 是什么

超大标题和按钮居中，下方只露出产品画面的上半部分。

## 适合

品牌发布、开发者工具、只有一个核心卖点的产品首页。

## 不适合

标题很长或要并列多个卖点时用左文右图；每节都居中会显得呆板，后面的区块改为左对齐。

## 要点

- 标题居中，每行约 18–22 个汉字以内，字号 clamp(2.5rem, 1.5rem + 4vw, 4.5rem)，行高 1.1–1.2
- 副标题一到两行，最大宽度约 560px；标题到副标题 16–24px，到按钮 32px
- 主次按钮居中并排，窄屏上下堆叠
- 下方放产品画面，首屏只露出上半部分，引导向下滚动
- 上下内边距 clamp(64px, 10vw, 128px)，留白充足
- 只有首屏和收尾行动区居中，其余区块左对齐

## 提示词

{产品}首屏用「居中大标题」：顶部导航下方留白，居中放超大标题“{价值主张}”（不超过 2 行）、一句副标题（最大宽度 560px）和主次两个按钮（“{主行动}”“{次行动}”）；下方放{产品画面}，首屏只露出上半部分；上下内边距 clamp(64px, 10vw, 128px)；窄屏按钮上下堆叠、标题不超过 3 行；后面的区块改为左对齐。

## 示意图

```js
export const wire = {
  cols: '16% 1fr 16%',
  rows: '13% 4% 24% 10% 13% 1fr',
  areas: ['nav nav nav', '. . .', '. t .', '. s .', '. b .', 'img img img'],
  boxes: {
    nav: {
      inner: {
        cols: '18% 1fr 20%',
        rows: '1fr',
        areas: ['logo links cta'],
        boxes: { logo: 'Logo', links: '导航', cta: '按钮' },
      },
    },
    t: { label: '超大标题', acc: true, center: true },
    s: { label: '副标题', center: true },
    b: { label: '主次按钮', center: true },
    img: '产品画面（露出上半）',
  },
};
export const wireMobile = {
  cols: '6% 1fr 6%',
  rows: '10% 5% 25% 11% 11% 1fr',
  areas: ['nav nav nav', '. . .', '. t .', '. s .', '. b .', 'img img img'],
  boxes: {
    nav: 'Logo ☰',
    t: { label: '大标题', acc: true, center: true },
    s: { label: '副标题', center: true },
    b: { label: '按钮', center: true },
    img: '产品画面',
  },
};
```
