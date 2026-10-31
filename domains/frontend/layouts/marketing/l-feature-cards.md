---
zh: 三列卡片功能区
en: Three-column cards
order: 60
---

## 是什么

区块标题在上，下面三张等宽卡片，每张讲一个能力。

## 适合

3 个并列、分量相近的核心价值或服务项。

## 不适合

一排三张“图标 + 标题 + 一句话”很容易显得模板化，能放截图或数字就放；有主次时用 Bento。

## 要点

- 区块标题和一句说明左对齐或居中，到卡片 32–48px
- 三列等宽，间距 24px；卡片内边距 24–32px，高度对齐
- 每张卡写“结果 + 证据”：标题写结果，正文写数字或做法，可配小截图
- 不用彩色圆底图标凑数；可点击的卡片才加悬停效果
- 多于 3 项时用 repeat(auto-fill, minmax(280px, 1fr)) 自动换行
- 窄屏单列堆叠，或横向滑动并露出下一张的一部分

## 提示词

{产品}价值区用「三列卡片」：区块标题“{区块标题}”加一句说明，下面三张等宽卡片（间距 24px，内边距 28px，高度对齐），分别讲{三个能力}，每张标题写结果、正文给具体数字或做法，可配小截图；不用彩色圆底图标；只有可点击的卡片才有悬停效果；窄屏改为单列。

## 示意图

```js
export const wire = {
  cols: '1fr 1fr 1fr',
  rows: '1fr auto auto 8px 400px 1fr',
  areas: ['. . .', '. h .', '. s .', '. . .', 'c1 c2 c3', '. . .'],
  boxes: {
    h: { label: '区块标题', center: true },
    s: { label: '一句说明', center: true },
    c1: { label: '能力卡片', acc: true },
    c2: { label: '能力卡片', acc: true },
    c3: { label: '能力卡片', acc: true },
  },
};
export const wireMobile = {
  cols: '1fr',
  rows: '13% 1fr 1fr 1fr',
  areas: ['h', 'c1', 'c2', 'c3'],
  boxes: {
    h: '区块标题',
    c1: { label: '能力卡片', acc: true },
    c2: { label: '能力卡片', acc: true },
    c3: { label: '能力卡片', acc: true },
  },
};
```
