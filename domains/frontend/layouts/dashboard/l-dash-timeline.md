---
zh: 时间轴泳道
en: Timeline swimlanes
order: 60
---

## 是什么

顶部时间刻度、左侧资源名，事项按起止时间画成横条。

## 适合

资源与时间排期：人员排班、设备占用、会议室预订、项目计划。

## 不适合

事项只有截止日、没有时间段时用列表或日历；资源只有一两个时用日历视图。

## 要点

- 顶部时间刻度吸顶，默认显示工作时段；左侧泳道名 160–200px 吸左
- 每行一条泳道，行高 40–48px；横条宽度即时长，最短也保证可点击
- 一条竖线标出当前时刻；重叠冲突处用状态色或斜纹标出
- 提供日 / 周 / 月缩放，缩放后当前时刻仍在视野内
- 横条放不下文字时把文字放到条外，或只在悬停与详情里显示
- 窄屏改为按时间分组的列表，或横向滚动并保留吸左的泳道名

## 提示词

{资源}排期用「时间轴泳道」：顶部时间刻度吸顶（{时间范围}），左侧 180px 泳道名吸左，每行一个{资源}、行高 44px；事项按起止时间画成横条，竖线标出当前时刻，重叠处用斜纹标冲突；支持日 / 周 / 月缩放；点横条打开详情；窄屏改为按时间分组的列表。

## 示意图

```js
export const wire = {
  cols: '20% 1fr',
  rows: '40px 80px 80px 80px 80px 80px 80px 1fr',
  areas: ['c0 sc', 'n1 l1', 'n2 l2', 'n3 l3', 'n4 l4', 'n5 l5', 'n6 l6', '. .'],
  boxes: {
    c0: { label: '资源', kind: 'colhead' },
    sc: '时间刻度（吸顶）',
    n1: { label: '泳道', kind: 'avatar' },
    n2: { label: '泳道', kind: 'avatar' },
    n3: { label: '泳道', kind: 'avatar' },
    n4: { label: '泳道', kind: 'avatar' },
    n5: { label: '泳道', kind: 'avatar' },
    n6: { label: '泳道', kind: 'avatar' },
    l1: {
      inner: {
        cols: '4% 34% 6% 26% 1fr',
        rows: '1fr 48px 1fr',
        areas: ['. . . . .', '. a . b .', '. . . . .'],
        boxes: { a: { label: '事项', acc: true, kind: 'event' }, b: { label: '', acc: true, kind: 'event' } },
      },
    },
    l2: {
      inner: {
        cols: '18% 44% 1fr',
        rows: '1fr 48px 1fr',
        areas: ['. . .', '. a .', '. . .'],
        boxes: { a: { label: '', acc: true, kind: 'event' } },
      },
    },
    l3: {
      inner: {
        cols: '8% 22% 14% 40% 1fr',
        rows: '1fr 48px 1fr',
        areas: ['. . . . .', '. a . b .', '. . . . .'],
        boxes: { a: { label: '', acc: true, kind: 'event' }, b: { label: '', acc: true, kind: 'event' } },
      },
    },
    l4: {
      inner: {
        cols: '40% 48% 1fr',
        rows: '1fr 48px 1fr',
        areas: ['. . .', '. a .', '. . .'],
        boxes: { a: { label: '', acc: true, kind: 'event' } },
      },
    },
    l5: {
      inner: {
        cols: '10% 30% 8% 30% 1fr',
        rows: '1fr 48px 1fr',
        areas: ['. . . . .', '. a . b .', '. . . . .'],
        boxes: { a: { label: '', acc: true, kind: 'event' }, b: { label: '', acc: true, kind: 'event' } },
      },
    },
    l6: {
      inner: {
        cols: '28% 36% 1fr',
        rows: '1fr 48px 1fr',
        areas: ['. . .', '. a .', '. . .'],
        boxes: { a: { label: '', acc: true, kind: 'event' } },
      },
    },
  },
};
export const wireMobile = {
  cols: '1fr',
  rows: 'auto auto auto auto auto auto 1fr',
  areas: ['nav', 'top', 'h1', 'e1', 'h2', 'e2', '.'],
  boxes: {
    nav: { label: '顶栏 ☰', text: '排期' },
    top: '日期切换',
    h1: '上午',
    e1: { label: '事项列表', acc: true, text: '上午' },
    h2: '下午',
    e2: { label: '事项列表', acc: true, text: '下午' },
  },
};
```
