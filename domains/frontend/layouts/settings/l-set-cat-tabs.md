---
zh: 分类卡片 + 页内 Tab
en: Category cards with tabs
order: 30
of: l-settings-page
---

## 是什么

左侧是几张设置分类卡片（名称、说明、图标），选中的高亮；右侧面板顶部是这个分类下的 Tab，下面是当前 Tab 的表单和“重置 / 提交”。

## 适合

系统配置这类“分类少、每类下又分几块”的后台：应用设置（积分、充值、客服）、系统设置（短信、存储、支付）。

## 不适合

分类超过 6 个时卡片列表太长，改用“分类导航 + 分组卡片”；每个分类下只有一块内容时去掉 Tab。

## 要点

- 左栏宽 280–320px，每张分类卡片放名称（16px）、一句说明（13px 次要色）和一个淡色图标，当前分类用浅主色底
- 分类 2–6 个；卡片整块可点，用链接或按钮实现，当前项加 aria-current
- 右侧面板顶部 Tab 不超过 5 个，切换不刷新页面；Tab 和分类都写进 URL，刷新后停在原处
- 表单单列，标签在上，必填加星号；长说明放进标签括号或字段下方的帮助文字
- 面板底部分割线下放“重置”和主按钮“提交”；有未保存改动时切换 Tab 或分类先提示
- 手机上先进分类列表页，点进去是这个分类的页面，Tab 在顶部横滑，提交按钮吸底

## 提示词

{后台}的{系统配置}用「分类卡片 + 页内 Tab」：左栏 300px 放 {分类列表}，每个分类是一张卡片（名称 16px、一句说明 13px、右侧淡色图标），当前分类浅主色底并加 aria-current；右侧面板（浅色主题下是白色卡片）顶部是该分类下的 Tab（{Tab 列表}，不超过 5 个），下面是当前 Tab 的单列表单，标签在上、必填加星号；面板底部分割线下放“重置”（恢复到上次提交的值）和“提交”，有改动时左侧显示“有未保存的修改”；分类和 Tab 写进 URL；有未保存改动时切换先弹框，选项“保存并切换 / 放弃修改 / 继续编辑”，默认焦点在“继续编辑”；手机上先进分类列表页，点进去后 Tab 横滑、提交按钮吸底。

## 示意图

```js
export const wire = {
  cols: '300px 1fr',
  rows: 'auto 1fr',
  areas: ['cat panel', '. .'],
  boxes: {
    cat: { label: '分类卡片（名称 + 说明 + 图标）', kind: 'catlist' },
    panel: {
      label: '当前分类的设置',
      acc: true,
      card: true,
      inner: {
        cols: '1fr',
        rows: 'auto auto',
        areas: ['tb', 'fm'],
        boxes: {
          tb: { label: '页内 Tab', kind: 'tabs', text: '积分配置|充值配置|客服配置' },
          fm: { label: '表单 · 重置 / 提交', kind: 'form', text: '积分配置' },
        },
      },
    },
  },
};
export const wireMobile = {
  cols: '1fr',
  rows: 'auto auto auto 1fr',
  areas: ['nav', 'tb', 'fm', '.'],
  boxes: {
    nav: { label: '‹ 返回分类', kind: 'mtop', text: '应用设置' },
    tb: { label: '页内 Tab', kind: 'tabs', text: '积分配置|充值配置|客服配置' },
    fm: { label: '表单 · 重置 / 提交', kind: 'form', acc: true, text: '积分配置' },
  },
};
```
