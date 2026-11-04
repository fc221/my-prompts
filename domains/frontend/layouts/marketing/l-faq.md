---
zh: 常见问题
en: FAQ
order: 90
---

## 是什么

左侧区块标题和联系入口，右侧一列可展开的问答。

## 适合

价格页、产品页底部，回答购买前的顾虑。

## 不适合

问题超过 15 个时做独立的帮助中心并提供搜索；只有两三个问题时直接写成段落。

## 要点

- 宽屏左 1/3 放标题和“没找到答案？联系我们”，右 2/3 放问答；也可单列居中，宽约 720px
- 每项问题一行，右侧 ＋ / － 或箭头，整行可点，按钮带 aria-expanded
- 默认全部收起或只展开第一项；允许同时展开多项
- 展开用高度过渡（grid-template-rows 0fr → 1fr），收起后内容不可聚焦
- 问题 6–10 个，按购买顾虑排序：价格、试用、数据安全、迁移
- 窄屏改单列，联系入口放在列表下方

## 提示词

{产品}常见问题区：左侧 1/3 放区块标题和“联系{支持渠道}”入口，右侧 2/3 放 {问题数} 个可展开问答（{问题列表}）；每项整行可点，右侧 ＋ / － 图标，按钮带 aria-expanded；展开用高度过渡，收起的内容不可聚焦；默认只展开第一项；窄屏改单列，联系入口放在列表下方。

## 示意图

```js
export const wire = {
  cols: '32% 1fr',
  rows: '1fr auto auto auto auto auto auto auto 1fr',
  areas: ['. .', 'h q1', 'ct q2', '. a2', '. q3', '. q4', '. q5', '. q6', '. .'],
  boxes: {
    h: { label: '区块标题', text: '常见问题' },
    ct: { label: '联系入口', text: '联系客服' },
    q1: '问题 ＋',
    q2: { label: '问题 －', acc: true },
    a2: { label: '展开的回答', kind: 'answer' },
    q3: '问题 ＋',
    q4: '问题 ＋',
    q5: '问题 ＋',
    q6: '问题 ＋',
  },
};
export const wireMobile = {
  cols: '1fr',
  rows: 'auto auto auto auto auto auto 1fr',
  areas: ['h', 'q1', 'q2', 'a2', 'q3', 'ct', '.'],
  boxes: {
    h: { label: '标题', text: '常见问题' },
    q1: '问题 ＋',
    q2: { label: '问题 －', acc: true },
    a2: { label: '回答', kind: 'answer' },
    q3: '问题 ＋',
    ct: { label: '联系', text: '联系客服' },
  },
};
```
