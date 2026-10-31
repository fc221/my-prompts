---
zh: 收尾行动区
en: Closing CTA
order: 100
---

## 是什么

页脚上方一块整宽色块，一句行动号召和一个主按钮。

## 适合

官网首页、落地页、功能页的结尾，给读完的人一个明确的下一步。

## 不适合

同一页不要放两个以上收尾行动区；首屏行动已经很清楚的短页可以省掉。

## 要点

- 整宽色块（品牌色或深色），内容居中或左文右按钮，上下内边距 clamp(48px, 8vw, 96px)
- 标题一句话写行动带来的结果，不超过 20 个字；可加一行补充（如“免费试用 14 天，无需绑卡”）
- 只放一个主按钮，最多再配一个文字链接
- 色块上的文字对比度 ≥ 4.5 : 1，按钮用反色
- 与上一节和页脚之间留足距离，不和页脚粘在一起
- 窄屏按钮通栏，标题不超过 3 行

## 提示词

{产品}页面结尾加「收尾行动区」：页脚上方一块整宽{品牌色或深色}色块，居中放一句行动号召“{号召语}”、一行补充说明和一个反色主按钮“{主行动}”，可再配一个文字链接；上下内边距 clamp(48px, 8vw, 96px)；文字对比度 ≥ 4.5:1；窄屏按钮通栏，标题不超过 3 行。

## 示意图

```js
export const wire = {
  cols: '1fr',
  rows: '1fr 220px 22%',
  areas: ['prev', 'cta', 'foot'],
  boxes: {
    prev: {
      label: '上一节',
      inner: {
        cols: '1fr 1fr 1fr',
        rows: '1fr',
        areas: ['a b c'],
        boxes: { a: '能力卡片', b: '能力卡片', c: '能力卡片' },
      },
    },
    cta: { label: '整宽色块：号召 + 主按钮', acc: true },
    foot: { label: '页脚', dark: true },
  },
};
export const wireMobile = {
  cols: '1fr',
  rows: '1fr auto 22%',
  areas: ['prev', 'cta', 'foot'],
  boxes: {
    prev: { label: '上一节', kind: 'card', text: '能力卡片' },
    cta: { label: '号召 按钮', acc: true },
    foot: { label: '页脚', dark: true },
  },
};
```
