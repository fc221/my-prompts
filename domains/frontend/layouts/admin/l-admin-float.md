---
zh: 悬浮侧栏
en: Floating sidebar
aka: 浮动布局 悬浮卡片侧栏 圆角侧栏 卡片式后台 float layout
of: l-admin-nav
tab: 悬浮侧栏
order: 36
---

## 是什么

侧栏不贴着页面左边，而是一张离页面边 12–16px、带圆角的卡片悬浮在浅色底上；内容区也是同样圆角的卡片。整页看起来轻，像工具而不是系统。

## 适合

菜单不多、风格偏轻的产品后台：SaaS 工作台、创作工具、个人中心类后台。

## 不适合

菜单超过 12 项、要收起成图标栏的密集后台用「侧栏 + 顶栏」；需要深色侧栏压住整页的企业系统也不用。

## 要点

- 侧栏卡片离页面边 12–16px，圆角 12，和内容卡片同一套圆角与阴影（边框或 1 级阴影）
- 页面底色比卡片深一档，卡片白；侧栏可以是深色卡片
- 顶栏可以融进内容卡片的标题行，不再单独一条通栏
- 菜单项圆角 6，当前项浅底；分组之间留 24px
- 窄于 1024px 侧栏收进左侧抽屉，抽屉同样是圆角卡片；侧栏的其他形态见「侧栏的五种形态」

## 提示词

给{产品}的后台做悬浮侧栏：页面底色浅灰，侧栏是离页面边 16px、圆角 12 的卡片，宽 232px，列 {菜单}；内容区是同样圆角的白卡片，标题行放页面级操作和账号；菜单项圆角 6、当前项浅底、分组间 24px；1024px 以下侧栏收进左侧抽屉。

## 示意图

```js
export const wire = {
  cols: '1.5% 23% 1fr 1.5%',
  rows: '3% 1fr 3%',
  areas: ['. . . .', '. side main .', '. . . .'],
  boxes: {
    side: { label: '悬浮侧栏', dark: true, acc: true },
    main: {
      card: true,
      inner: {
        cols: '1fr',
        rows: 'auto 1fr',
        areas: ['head', 'tbl'],
        boxes: { head: { label: '标题 · 新建', kind: 'pagehead' }, tbl: '订单表格' },
      },
    },
  },
};
export const wireMobile = {
  cols: '1fr',
  rows: 'auto 1fr',
  areas: ['top', 'main'],
  boxes: { top: { label: '顶栏 ☰', acc: true }, main: '订单表格' },
  drawer: { size: '70%', box: { label: '侧栏（左侧抽屉）', dark: true, kind: 'nav', acc: true } },
};
```
