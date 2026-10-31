---
zh: 左图右表单登录
en: Split login
order: 30
---

## 是什么

左半屏品牌图和价值主张，右半屏居中放登录表单。

## 适合

面向客户的产品，需要在登录页强化品牌或介绍新功能时。

## 不适合

内部后台用居中卡片即可；左侧不要放与产品无关的抽象插画。

## 要点

- 左右约 1 : 1 或 5 : 4，左侧品牌图或产品画面，可叠一句价值主张或一条真实评价
- 右侧表单列 360–400px，在右半屏内水平、垂直居中
- 左侧纯装饰时设 aria-hidden，图片延迟加载，不拖慢表单出现
- 表单规则同居中卡片：只放必要字段、通栏主按钮、就地报错、正确的 autocomplete
- 1024px 以下左侧收窄成顶部品牌条（约 120–160px）或直接隐藏
- 窄屏表单铺满宽度，左右内边距 24px

## 提示词

{产品}登录页用「左图右表单」：左半屏放{品牌图或产品画面}，叠一句价值主张；右半屏居中放 380px 宽表单：Logo、标题、账号、密码（可显示 / 隐藏）、“忘记密码”、通栏主按钮“登录”、注册入口；左侧图片延迟加载、不阻塞表单；1024px 以下左侧收成顶部 140px 品牌条，手机上隐藏，表单铺满、左右 24px。

## 示意图

```js
export const wire = {
  cols: '52% 1fr',
  rows: '1fr',
  areas: ['art form'],
  boxes: {
    art: { label: '品牌图 · 价值主张', dark: true },
    form: {
      card: true,
      inner: {
        cols: '12% 1fr 12%',
        rows: '1fr 13% 14% 14% 14% 11% 1fr',
        areas: ['. . .', '. t .', '. f1 .', '. f2 .', '. btn .', '. alt .', '. . .'],
        boxes: {
          t: { label: '标题', text: '欢迎回来' },
          f1: { label: '账号', kind: 'input' },
          f2: { label: '密码', kind: 'input' },
          btn: { label: '登录', acc: true, kind: 'button' },
          alt: { label: '注册', kind: 'link' },
        },
      },
    },
  },
};
export const wireMobile = {
  cols: '1fr',
  rows: '20% 11% 13% 13% 13% 1fr',
  areas: ['art', 't', 'f1', 'f2', 'btn', '.'],
  boxes: {
    art: { label: '品牌条', dark: true },
    t: { label: '标题', text: '欢迎回来' },
    f1: { label: '账号', kind: 'input' },
    f2: { label: '密码', kind: 'input' },
    btn: { label: '登录', acc: true, kind: 'button' },
  },
};
```
