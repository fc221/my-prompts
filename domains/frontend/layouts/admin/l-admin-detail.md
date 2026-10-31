---
zh: 详情页（概要 + 分区）
en: Detail page
order: 50
---

## 是什么

顶部对象名、状态和操作，下方描述列表与关联记录分区。

## 适合

查看和处理单个对象：订单详情、客户档案、合同、工单。

## 不适合

只有几个字段时用抽屉展示，不跳页；要连续处理多条时用主从分栏。

## 要点

- 页头：面包屑或返回 → 对象名 + 状态标签，右侧 1 个主操作，其余收进“更多”
- 基本信息用描述列表：宽屏 3 列、中屏 2 列、窄屏 1 列；空值写“—”，长文本独占一行
- 关联记录用 Tabs（不超过 6 个，当前 Tab 写进 URL）或带标题的分区，分区间 24–32px
- 阅读区最大宽度约 1200px；需要时右侧加 280–320px 窄栏放负责人、时间线、操作记录
- 页头滚出视口后压缩成吸顶单行：对象名 + 主操作
- 骨架屏预留标题和描述列表的尺寸；对象不存在、无权限各有状态和返回入口
- 窄屏：右侧窄栏移到底部，主操作放进底部操作栏

## 提示词

{对象}详情页：页头为面包屑 → {对象名} + 状态标签，右侧主操作“{主操作}”，其余收进“更多”；基本信息用描述列表，宽屏 3 列、中屏 2 列、窄屏 1 列，空值“—”；下方用 Tabs 展示{关联内容}，当前 Tab 写进 URL；右侧 300px 窄栏放负责人和操作时间线，窄屏移到底部；页头滚出后压缩成吸顶单行；加载用骨架屏，不存在或无权限显示对应状态。

## 示意图

```js
export const wire = {
  cols: '1fr 27%',
  rows: 'auto auto auto 1fr',
  areas: ['head head', 'desc side', 'tabs side', 'sec side'],
  boxes: {
    head: { inner: { cols: '1fr 24%', rows: '1fr', areas: ['t op'], boxes: { t: '名称 · 状态', op: '操作' } } },
    desc: { label: '字段（3 列）', kind: 'field' },
    tabs: 'Tabs',
    sec: { label: '关联记录', acc: true },
    side: '时间线',
  },
};
export const wireMobile = {
  cols: '1fr',
  rows: 'auto auto auto auto 1fr auto',
  areas: ['nav', 'head', 'desc', 'tabs', 'sec', 'bar'],
  boxes: {
    nav: { label: '‹ 返回', kind: 'mtop', text: '订单详情' },
    head: '名称 状态',
    desc: { label: '字段单列', kind: 'field' },
    tabs: 'Tabs',
    sec: { label: '关联', acc: true },
    bar: '主操作',
  },
};
```
