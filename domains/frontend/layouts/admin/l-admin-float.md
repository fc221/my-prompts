---
zh: 浮动布局
en: Float layout
aka: 浮动侧栏 图标栏加悬浮子菜单 收起侧栏布局 悬浮菜单 float layout
of: l-admin-nav
tab: 浮动
order: 36
---

## 是什么

侧栏只留一根 64px 的图标栏贴在左边，悬停或点击某个模块时它的子菜单浮出一块面板，移开就收回；内容区因此比「侧栏 + 顶栏」宽约 170px。

## 适合

要尽量把宽度留给内容的后台：报表、看板、编辑器、表格很宽的业务页；用户熟悉模块图标、不需要一直看着菜单。

## 不适合

新用户多、要靠菜单文字找功能的系统用「侧栏 + 顶栏」；模块超过 10 个图标栏就记不住，改用「分栏导航」。

## 要点

- 图标栏固定 64px，图标 20px，当前模块实心强调底 + 白色图标；只有图标时每个图标都要有名称提示（悬停、聚焦显示）
- 悬停模块弹出该模块的子菜单面板，面板贴着图标栏右侧、与模块对齐，宽约 200px，页面多时可排成两列；移出后约 200ms 再收起，点击可固定
- 弹出的面板挂到顶层，不被图标栏或内容区裁切；减少动态效果时只淡入
- 顶栏和页签栏从图标栏右边开始，不横贯图标栏
- 就是组件库菜单的收起态加弹出子菜单，做法见「图标窄栏导航」，不手写菜单
- 窄于 1024px 图标栏收进左侧抽屉，抽屉里展开成完整菜单树

## 提示词

给{产品}的后台做浮动布局：左侧固定 64px 图标栏放 {模块清单} 的图标，当前模块实心强调底 + 白色图标，悬停或聚焦显示名称；悬停模块时在图标栏右侧弹出该模块的子菜单面板（挂到顶层，宽约 200px，页面多时两列），移出后延迟约 200ms 收起，点击可固定；顶栏和页签栏从图标栏右边开始；用项目组件库菜单的收起态实现（Element Plus el-menu collapse、Naive UI n-menu collapsed、Ant Design Vue a-menu inlineCollapsed），不手写菜单；1024px 以下图标栏收进左侧抽屉并展开成完整菜单树。

## 示意图

```js
export const wire = {
  cols: '64px 1fr',
  rows: '14% 1fr',
  areas: ['rail top', 'rail main'],
  boxes: {
    rail: {
      label: '图标栏',
      dark: true,
      acc: true,
      pop: { size: '208px', y: '128px', box: { label: '悬停弹出的页面列表', kind: 'nav', acc: true } },
    },
    top: '顶栏',
    main: '订单表格',
  },
};
export const wireMobile = {
  cols: '1fr',
  rows: 'auto 1fr',
  areas: ['top', 'main'],
  boxes: { top: { label: '顶栏 ☰', acc: true }, main: '订单表格' },
  drawer: { size: '70%', box: { label: '导航树（左侧抽屉）', dark: true, kind: 'nav', acc: true } },
};
```
