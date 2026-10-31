---
zh: 顶部 Tab 设置页
en: Tabbed settings page
order: 40
---

## 是什么

页面标题下一排 Tab 切换设置分类，下面是限宽居中的分组卡片。

## 适合

分类 3–6 个、每类内容不多的设置：个人设置（资料、安全、通知）、项目设置、团队设置。

## 不适合

分类超过 6 个时 Tab 会挤，改用左侧分类导航；分类之间需要来回对照时也用左侧导航。

## 要点

- 内容限宽 720–800px 居中，Tab 和卡片左边对齐
- Tab 不超过 6 个，当前项下划线 + 主色文字；切换不刷新页面，写进 URL
- 每个 Tab 里按组放卡片：顶部组标题和说明，下面字段；卡片之间 16–24px
- 保存方式同一页统一：每组底部“保存”，或即时生效并就地提示“已保存”
- 离开有未保存改动的 Tab 时提示保存或放弃
- 窄屏 Tab 横滑并露出半个下一项，提示还能滑

## 提示词

{产品}的{设置页}用「顶部 Tab」：页面标题下一排 Tab（{分类列表}，不超过 6 个，当前项下划线 + 主色文字），切换不刷新页面并写进 URL；内容限宽 760px 居中，按组放卡片，卡片顶部写组标题和一句说明，下面放字段，组底部放保存按钮；离开有未保存改动的 Tab 时提示；窄屏 Tab 横滑，露出半个下一项。

## 示意图

```js
export const wire = {
  cols: '1fr 760px 1fr',
  rows: 'auto auto auto auto 1fr',
  areas: ['. hd .', '. tb .', '. f1 .', '. f2 .', '. . .'],
  boxes: {
    hd: { label: '页面标题', kind: 'heading', text: '设置' },
    tb: { label: '分类 Tab', kind: 'tabs', text: '通用|成员与权限|通知|安全|账单与发票' },
    f1: { label: '分组卡片（标题 + 说明 + 字段）', kind: 'form', acc: true, text: '工作区信息' },
    f2: { label: '分组卡片（开关行）', kind: 'switches', acc: true, text: '通知' },
  },
};
export const wireMobile = {
  cols: '1fr',
  rows: 'auto auto auto auto 1fr',
  areas: ['nav', 'tb', 'f1', 'f2', '.'],
  boxes: {
    nav: { label: '‹ 返回', kind: 'mtop', text: '设置' },
    tb: { label: '分类 Tab（横滑）', kind: 'tabs', text: '通用|成员与权限|通知|安全|账单与发票' },
    f1: { label: '分组卡片', kind: 'form', acc: true, text: '工作区信息' },
    f2: { label: '分组卡片（开关行）', kind: 'switches', acc: true, text: '通知' },
  },
};
```
