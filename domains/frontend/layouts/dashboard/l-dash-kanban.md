---
zh: 看板分列
en: Kanban columns
order: 50
---

## 是什么

按状态分成等宽列，卡片在列内纵向堆叠，可拖到下一列。

## 适合

按流程状态推进的事项：任务、工单、招聘流程、内容审核。

## 不适合

事项没有明确阶段时用列表页；状态超过 7 个时合并状态，或改用表格加状态筛选。

## 要点

- 每列 240–300px 等宽，列头写状态名和数量，有在制上限时一并显示
- 卡片在列内纵向堆叠，列内独立滚动；列多时只在看板容器内横向滚动，整页不横向溢出
- 卡片只放标题、负责人、截止时间和 1–2 个标签，详情点开抽屉看
- 拖动换列时显示落点占位；同时提供“移动到…”菜单作为键盘等效
- 空列保留并显示占位提示，不自动收起
- 窄屏状态改成分段控件或标签，一次显示一列，或整列横滑吸附

## 提示词

{对象}用「看板分列」：按{状态列表}分等宽列，每列 260px，列头写状态名和数量；卡片显示标题、负责人、截止时间，列内独立滚动；列多时只在看板容器内横向滚动；拖动换列有落点占位，并提供“移动到…”菜单作为键盘等效；点卡片从右侧滑出详情抽屉；空列显示占位提示；窄屏改为顶部状态切换，一次显示一列。

## 示意图

```js
export const wire = {
  cols: '1fr 1fr 1fr 1fr',
  rows: '1fr',
  areas: ['c1 c2 c3 c4'],
  boxes: {
    c1: {
      inner: {
        cols: '1fr',
        rows: 'auto auto auto auto auto 1fr',
        areas: ['h', 'a', 'b', 'c', 'd', '.'],
        boxes: {
          h: '待办 4',
          a: { label: '卡片', kind: 'task' },
          b: { label: '卡片', kind: 'task' },
          c: { label: '卡片', kind: 'task' },
          d: { label: '卡片', kind: 'task' },
        },
      },
    },
    c2: {
      inner: {
        cols: '1fr',
        rows: 'auto auto auto auto 1fr',
        areas: ['h', 'a', 'b', 'c', '.'],
        boxes: {
          h: '进行 3',
          a: { label: '卡片', kind: 'task' },
          b: { label: '拖动中', acc: true, kind: 'task' },
          c: { label: '卡片', kind: 'task' },
        },
      },
    },
    c3: {
      inner: {
        cols: '1fr',
        rows: 'auto auto auto 1fr',
        areas: ['h', 'a', 'b', '.'],
        boxes: { h: '验收 2', a: { label: '卡片', kind: 'task' }, b: { label: '卡片', kind: 'task' } },
      },
    },
    c4: { inner: { cols: '1fr', rows: 'auto 120px 1fr', areas: ['h', 'a', '.'], boxes: { h: '完成', a: '空列提示' } } },
  },
};
export const wireMobile = {
  cols: '1fr',
  rows: 'auto auto auto auto auto 1fr',
  areas: ['top', 'seg', 'a', 'b', 'c', '.'],
  boxes: {
    top: { label: '顶栏 ☰', text: '任务看板' },
    seg: { label: '状态切换', acc: true },
    a: { label: '卡片', kind: 'task' },
    b: { label: '卡片', kind: 'task' },
    c: { label: '卡片', kind: 'task' },
  },
};
```
