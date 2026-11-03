---
zh: 通栏顶栏 + 侧栏
en: Full-width header + sidebar
aka: 常规布局 顶栏通栏 顶栏在上侧栏在下 header 通栏
of: l-admin-nav
tab: 通栏顶栏
order: 34
---

## 是什么

顶栏横贯整个页面宽度，Logo、工作区切换、全局搜索、通知和账号都在顶栏；侧栏从顶栏下方开始，列完整菜单；内容区在侧栏右侧。和「侧栏 + 顶栏」的区别是顶栏压在侧栏上面，而不是侧栏通到页面底部。

## 适合

品牌或工作区切换要放在最显眼的左上角；顶栏要放全局搜索和一排工具；几个产品共用一条顶栏。

## 不适合

侧栏要通到页面底部、顶栏只放页面级操作时用「侧栏 + 顶栏」；一级模块要在顶栏里切换时用「混合导航」。

## 要点

- 顶栏 56px 通栏、吸顶：左 Logo 或工作区切换，中间全局搜索，右侧通知和账号
- 侧栏从顶栏下方开始，宽 220–240px，可收起成 64px 图标栏，收起状态记住
- 内容区的标题行放页面级操作，不往顶栏塞
- 页签栏（如果有）放在侧栏右侧、内容区顶部，不横贯侧栏
- 窄于 1024px 侧栏收进左侧抽屉，顶栏只留菜单按钮、搜索图标和账号

## 提示词

给{产品}的后台做通栏顶栏加侧栏：顶栏 56px 横贯整页、吸顶，左放 Logo 和{工作区切换}，中间全局搜索，右侧通知和账号；侧栏从顶栏下方开始，宽 232px，列 {菜单}，可收起到 64px 并记住状态；内容区标题行放页面级操作；1024px 以下侧栏收进左侧抽屉，顶栏只留菜单按钮、搜索图标和账号。

## 示意图

```js
export const wire = {
  cols: '232px 1fr',
  rows: '14% 1fr',
  areas: ['top top', 'side main'],
  boxes: {
    top: {
      acc: true,
      inner: {
        cols: '18% 1fr 18%',
        rows: '1fr',
        areas: ['logo search acct'],
        boxes: { logo: 'Logo', search: '全局搜索', acct: '账号' },
      },
    },
    side: { label: '侧栏导航', dark: true, acc: true },
    main: '订单表格',
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
