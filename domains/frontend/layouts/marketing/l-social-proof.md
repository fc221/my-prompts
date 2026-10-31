---
zh: 客户评价 / Logo 墙
en: Logos & testimonials
order: 80
---

## 是什么

一行统一单色的客户 Logo，下面 2–3 条带姓名和职位的评价。

## 适合

已有真实客户、并获得授权展示的信任背书区。

## 不适合

没有真实客户或没有授权时整块删掉，不做占位、不编造；只放一排灰 Logo 配“深受信赖”没有说服力。

## 注意

Logo、评价、用户数等事实内容必须真实且经授权，不得虚构客户、署名或数据。

## 要点

- Logo 统一单色、统一视觉高度（约 24–32px），5–8 个一行，间距均匀
- 评价卡写具体结果（数字或前后对比）、客户姓名、职位和公司，可配头像
- 评价 2–3 条并排，窄屏横向滑动并露出下一条
- Logo 墙这类过渡条，上下留白可以是常规区块的一半
- 默认静态排列；确需自动滚动时可暂停，减少动态效果时静止
- 有案例页时，每条评价链接到对应案例

## 提示词

{产品}信任背书区（只使用真实且已授权的内容）：上方一行 {Logo 数} 个客户 Logo，统一单色、视觉高度 28px、间距均匀、静态排列；下方 3 条评价卡并排，每条写具体结果、客户姓名、职位和公司，可链接到案例；没有真实评价时只保留 Logo 行，没有 Logo 时整块删除；窄屏 Logo 两列、评价横向滑动。

## 示意图

```js
export const wire = {
  cols: '1fr 1fr 1fr 1fr 1fr 1fr',
  rows: '1fr auto auto auto auto 1fr',
  areas: ['. . . . . .', '. . h h . .', 'l1 l2 l3 l4 l5 l6', 'st st st st st st', 'q1 q1 q2 q2 q3 q3', '. . . . . .'],
  boxes: {
    h: { label: '标题', text: '2,000+ 团队在用 MyPrompts', center: true },
    st: { label: '口碑数据', kind: 'strip' },
    l1: { label: 'Logo', kind: 'wordmark' },
    l2: { label: 'Logo', kind: 'wordmark' },
    l3: { label: 'Logo', kind: 'wordmark' },
    l4: { label: 'Logo', kind: 'wordmark' },
    l5: { label: 'Logo', kind: 'wordmark' },
    l6: { label: 'Logo', kind: 'wordmark' },
    q1: { label: '评价 + 署名', acc: true },
    q2: { label: '评价 + 署名', acc: true },
    q3: { label: '评价 + 署名', acc: true },
  },
};
export const wireMobile = {
  cols: '1fr 1fr',
  rows: 'auto auto auto auto auto 1fr',
  areas: ['h h', 'l1 l2', 'l3 l4', 'st st', 'q q', '. .'],
  boxes: {
    h: { label: '标题', text: '2,000+ 团队在用 MyPrompts' },
    st: { label: '口碑数据', kind: 'strip' },
    l1: { label: 'Logo', kind: 'wordmark' },
    l2: { label: 'Logo', kind: 'wordmark' },
    l3: { label: 'Logo', kind: 'wordmark' },
    l4: { label: 'Logo', kind: 'wordmark' },
    q: { label: '评价横滑', acc: true },
  },
};
```
