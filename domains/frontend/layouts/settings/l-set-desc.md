---
zh: 左说明右卡片
en: Described settings sections
order: 20
of: l-settings-page
---

## 是什么

没有分类导航的设置页：每组左边写组标题和一句说明，右边一张卡片放字段，组与组上下排列。

## 适合

设置不多（3–6 组）、一页就能放下，且每组需要解释“这是做什么的”：工作区设置、项目设置、个人资料。

## 不适合

左侧已经有设置分类导航时不要用，会变成三栏、说明列大片留白，改用“分类导航 + 分组卡片”；设置超过 6 组时加分类或改用可搜索列表。

## 要点

- 内容区限宽约 960px 居中：左列约 1/3 放组标题（16px 中粗）和一两句说明，右列约 2/3 放卡片
- 说明写“改了会怎样”，不重复字段名；需要时附一个“了解更多”链接
- 每张卡片底部放这一组的“保存”，或者整页改动即时生效并就地显示“已保存”，同一页不混用
- 危险操作单独一组放最底部，卡片用浅红底和描边按钮，点了再二次确认
- 组与组之间 32–40px；DOM 里组标题在字段之前，读屏按“标题 → 说明 → 字段”的顺序读
- 窄屏改成上下排：组标题和说明在上，卡片在下，字段一列

## 提示词

{产品}的{设置页}用「左说明右卡片」：内容区限宽 960px 居中，按{分组}从上到下排；每组左侧约 1/3 写组标题（16px 中粗）和一句说明（写清改了会怎样），右侧约 2/3 是一张卡片放字段，卡片底部放这一组的保存按钮；组间距 32–40px；最底部单独一组“危险操作”，浅红底卡片 + 描边按钮并二次确认；窄屏组标题和说明移到卡片上方、字段改一列。

## 示意图

```js
export const wire = {
  cols: '1fr 300px 640px 1fr',
  rows: 'auto auto auto auto 1fr',
  areas: ['. hd hd .', '. t1 f1 .', '. t2 f2 .', '. t3 dz .', '. . . .'],
  boxes: {
    hd: { label: '页面标题', kind: 'heading', text: '工作区设置' },
    t1: { label: '组标题 + 说明', kind: 'secdesc', text: '工作区信息' },
    f1: { label: '字段（卡片）', kind: 'form', acc: true, text: '工作区信息' },
    t2: { label: '组标题 + 说明', kind: 'secdesc', text: '通知' },
    f2: { label: '开关行（卡片）', kind: 'switches', acc: true, text: '通知' },
    t3: { label: '组标题 + 说明', kind: 'secdesc', text: '危险操作' },
    dz: '危险操作',
  },
};
export const wireMobile = {
  cols: '1fr',
  rows: 'auto auto auto auto auto 1fr',
  areas: ['nav', 't1', 'f1', 't2', 'f2', '.'],
  boxes: {
    nav: { label: '‹ 返回', kind: 'mtop', text: '工作区设置' },
    t1: { label: '组标题 + 说明', kind: 'secdesc', text: '工作区信息' },
    f1: { label: '字段（卡片）', kind: 'form', acc: true, text: '工作区信息' },
    t2: { label: '组标题 + 说明', kind: 'secdesc', text: '通知' },
    f2: { label: '开关行（卡片）', kind: 'switches', acc: true, text: '通知' },
  },
};
```
