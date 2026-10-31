---
zh: 卡片内分栏登录
en: Split card login
order: 20
---

## 是什么

页面中间一张大卡片，左半边品牌与卖点，右半边登录表单；手机上只留表单卡片。

## 适合

开发者平台、SaaS 产品的登录注册：既要讲清产品价值，又不想做成铺满屏幕的营销页。

## 不适合

有大图、视频想营造强烈氛围时用左图右表单铺满屏幕；没有卖点可讲时用居中卡片。

## 要点

- 卡片最大宽 1040–1120px、最小高约 560px，圆角 16–20px、浅阴影；页面背景用很淡的渐变把卡片托起来。
- 左右约 1 : 1，中间 1px 分隔线；左栏 Logo、两行主标语（第二行可用品牌色）、3 条卖点（勾选图标 + 一句话），底部放产品画面或终端预览。
- 右栏标题“欢迎回来”+ 一句说明，标签在上；账号、密码（可切换显示）、人机验证、记住登录、主按钮、其他登录方式、注册入口自上而下。
- 主按钮整宽、高 44px；提交中禁用并显示加载，失败在表单顶部说明原因，不清空已填内容。
- 其他登录方式用次要按钮并排；按钮上写的权益（如“首次登录赠送体验金”）只在真实存在时写。
- 窄于 900px 时去掉左栏，表单卡片居中、宽 100%（最多 420px），Logo 移到表单卡片顶部。

## 提示词

把{登录页}做成「卡片内分栏登录」：浅色渐变背景上居中一张大卡片（最大宽 1080px、圆角 20px、浅阴影），中间 1px 分隔线分成左右两半。左半边：{品牌 Logo}、两行主标语（第二行用品牌色）、3 条带勾选图标的卖点、底部一块{终端或产品画面预览}。右半边：标题“欢迎回来”和一句说明，账号、密码（可切换显示）、{人机验证}、记住登录、整宽主按钮（提交中显示加载，失败在顶部说明原因且不清空输入）、其他登录方式、注册入口。窄于 900px 时只保留右侧表单卡片，Logo 放到卡片顶部。

## 示意图

```js
export const wire = {
  cols: '7% 1fr 7%',
  rows: '7% 1fr 7%',
  areas: ['. . .', '. cd .', '. . .'],
  boxes: {
    cd: {
      acc: true,
      card: true,
      inner: {
        cols: '1fr 1fr',
        rows: '1fr',
        areas: ['art frm'],
        boxes: {
          art: {
            dark: true,
            inner: {
              cols: '1fr',
              rows: '13% 22% 30% 1fr',
              areas: ['lg', 'hl', 'ft', 'pv'],
              boxes: {
                lg: 'Logo',
                hl: { label: '主标语', kind: 'heading', text: '每一笔订单，都清清楚楚' },
                ft: { label: '卖点 ×3', kind: 'bullets' },
                pv: { label: '终端预览', kind: 'code' },
              },
            },
          },
          frm: {
            inner: {
              cols: '1fr',
              rows: '15% 14% 14% 12% 12% 12% 1fr',
              areas: ['t', 'f1', 'f2', 'cap', 'btn', 'alt', 'reg'],
              boxes: {
                t: { label: '欢迎回来', kind: 'heading' },
                f1: { label: '账号', kind: 'input' },
                f2: { label: '密码', kind: 'input' },
                cap: '人机验证',
                btn: { label: '登录', kind: 'button' },
                alt: '第三方',
                reg: { label: '注册入口', kind: 'link' },
              },
            },
          },
        },
      },
    },
  },
};
export const wireMobile = {
  cols: '1fr',
  rows: 'auto 1fr',
  areas: ['cd', '.'],
  boxes: {
    cd: {
      acc: true,
      card: true,
      inner: {
        cols: '1fr',
        rows: 'auto auto auto auto auto auto auto auto',
        areas: ['lg', 't', 'f1', 'f2', 'cap', 'btn', 'alt', 'reg'],
        boxes: {
          lg: 'Logo',
          t: { label: '欢迎回来', kind: 'heading' },
          f1: { label: '账号', kind: 'input' },
          f2: { label: '密码', kind: 'input' },
          cap: '验证',
          btn: { label: '登录', kind: 'button' },
          alt: '第三方',
          reg: { label: '注册', kind: 'link' },
        },
      },
    },
  },
};
```
