---
zh: 居中卡片登录
en: Centered card
order: 10
of: l-auth
---

## 是什么

浅色背景中间一张登录卡片，上方 Logo，下方切换注册。

## 适合

后台、工具类产品的登录、注册、找回密码页。

## 不适合

要展示品牌和价值主张时用左图右表单；手机上不要保留卡片外框。

## 要点

- 卡片宽 360–420px 居中，内边距 32–40px，垂直位置略偏上
- 只放必要字段：账号、密码（带显示 / 隐藏切换）；“忘记密码”放在密码标签行右侧
- 主按钮通栏，写具体动作（“登录”）；第三方登录放在分隔线下方
- 注册入口放在卡片下方一行（“还没有账号？注册”）
- 错误就地显示在字段下方；账号或密码错误不区分具体是哪一个
- 输入框设对应 autocomplete（username / current-password），不拦截粘贴
- 手机上去掉卡片外框，表单铺满宽度，左右内边距 24px

## 提示词

{产品}登录页用「居中卡片」：浅色背景，中间 400px 卡片（内边距 40px，略偏上），上方 Logo；卡内依次是标题、账号、密码（可显示 / 隐藏，标签行右侧“忘记密码”）、通栏主按钮“登录”和分隔线下的{第三方登录}；卡片下方“还没有账号？注册”；错误就地显示；字段带正确的 autocomplete；手机上去掉卡片外框，表单铺满、左右 24px。

## 示意图

```js
export const wire = {
  cols: '1fr 40% 1fr',
  rows: '1fr auto auto auto 1fr',
  areas: ['. . .', '. logo .', '. card .', '. ft .', '. . .'],
  boxes: {
    logo: { label: 'Logo', center: true },
    card: {
      card: true,
      inner: {
        cols: '1fr',
        rows: 'auto auto auto auto auto',
        areas: ['t', 'f1', 'f2', 'btn', 'alt'],
        boxes: {
          t: { label: '标题', text: '欢迎回来' },
          f1: { label: '账号', kind: 'input' },
          f2: { label: '密码', kind: 'input' },
          btn: { label: '登录', acc: true, kind: 'button' },
          alt: '第三方',
        },
      },
    },
    ft: { label: '注册入口', kind: 'link' },
  },
};
export const wireMobile = {
  cols: '1fr',
  rows: '16% 11% 13% 13% 13% 1fr 10%',
  areas: ['logo', 't', 'f1', 'f2', 'btn', '.', 'alt'],
  boxes: {
    logo: 'Logo',
    t: { label: '标题', text: '欢迎回来' },
    f1: { label: '账号', kind: 'input' },
    f2: { label: '密码', kind: 'input' },
    btn: { label: '登录', acc: true, kind: 'button' },
    alt: { label: '注册', kind: 'link' },
  },
};
```
