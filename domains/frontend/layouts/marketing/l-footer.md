---
zh: 页脚分组
en: Grouped footer
order: 110
---

## 是什么

左侧品牌和联系方式，右侧 4 组竖排链接，底部一行版权与备案。

## 适合

官网、落地页、文档站的页脚。

## 不适合

单页活动页链接很少时，一行居中的版权加 2–3 个链接就够了。

## 要点

- 与正文同一容器宽度；左侧 Logo、一句介绍和联系方式，右侧 3–5 组链接
- 分组如“产品 / 方案 / 资源 / 公司”，组标题沿用正文的标题层级（正文最低到 h2 就用 h3）
- 链接竖排，每项占满一行、行高至少 24px，方便手指点
- 底部一行：版权、隐私政策、用户协议；中国大陆站点放 ICP 备案号
- 辅助文字用次要色，对比度仍 ≥ 4.5 : 1
- 窄屏分组改为两列，或每组折叠成可展开的标题

## 提示词

{产品}页脚：与正文同宽，左侧放 Logo、一句介绍和{联系方式}，右侧 {链接组数} 组竖排链接（{分组名称}），组标题用 h3，每个链接整行可点、行高至少 24px；底部一行放版权、隐私政策和备案号，次要文字对比度 ≥ 4.5:1；窄屏分组改两列，或折叠成可展开的标题。

## 示意图

```js
export const wire = {
  cols: '1fr',
  rows: '1fr 240px auto',
  areas: ['prev', 'up', 'ft'],
  boxes: {
    prev: { label: '上一节', kind: 'logos' },
    up: { label: '收尾行动区', kind: 'cta' },
    ft: {
      dark: true,
      inner: {
        cols: '28% 1fr 1fr 1fr 1fr',
        rows: 'auto auto',
        areas: ['br g1 g2 g3 g4', 'lg lg lg lg lg'],
        boxes: {
          br: 'Logo 联系方式',
          g1: { label: '产品', acc: true, kind: 'linkcol' },
          g2: { label: '方案', acc: true, kind: 'linkcol' },
          g3: { label: '资源', acc: true, kind: 'linkcol' },
          g4: { label: '公司', acc: true, kind: 'linkcol' },
          lg: '版权 · 隐私 · 备案',
        },
      },
    },
  },
};
export const wireMobile = {
  cols: '1fr',
  rows: '1fr auto auto',
  areas: ['prev', 'up', 'ft'],
  boxes: {
    prev: { label: '上一节', kind: 'logos' },
    up: { label: '收尾行动区', kind: 'cta' },
    ft: {
      dark: true,
      inner: {
        cols: '1fr',
        rows: 'auto auto auto auto auto auto',
        areas: ['br', 'g1', 'g2', 'g3', 'g4', 'lg'],
        boxes: {
          br: 'Logo',
          g1: { label: '产品 ＋', acc: true, kind: 'row' },
          g2: { label: '方案 ＋', acc: true, kind: 'row' },
          g3: { label: '资源 ＋', acc: true, kind: 'row' },
          g4: { label: '公司 ＋', acc: true, kind: 'row' },
          lg: '版权 备案',
        },
      },
    },
  },
};
```
