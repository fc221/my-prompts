---
zh: 弹窗式偏好设置
en: Preferences dialog
order: 70
---

## 是什么

在当前页面上打开一个大弹窗，弹窗左侧是设置分类，右侧是当前分类的设置，关掉就回到原来的页面。

## 适合

个人偏好、编辑器或工具的设置：用户改完要马上回到手上的工作，不想离开当前页面。

## 不适合

团队或系统级配置、需要分享链接或长时间编辑的设置用独立页面；手机上不用弹窗，改成全屏页面。

## 要点

- 弹窗约 820×560px，左侧分类 180–200px，右侧内容区独立滚动；顶部标题和关闭按钮
- 改动即时生效最自然，弹窗里不放“保存”；必须统一保存的放在底部固定栏
- Esc、关闭按钮、点遮罩都能关；有未保存改动时先提示，不静默丢弃
- 打开时焦点进入弹窗，关闭后回到打开它的按钮；背后页面不能滚动
- 分类写进 URL（如 ?settings=通知），刷新或分享后能直接打开到这一类
- 窄于 640px 改成全屏页面，分类变成顶部横滑 Tab

## 提示词

{产品}的{偏好设置}用「弹窗」：在当前页面上打开约 820×560px 的弹窗，顶部标题“{标题}”和关闭按钮，左侧 190px 设置分类（{分类列表}），右侧当前分类的设置独立滚动；改动即时生效，不放保存按钮；Esc、关闭按钮、点遮罩都能关，有未保存内容先提示；打开时焦点进入弹窗、关闭后回到触发按钮，背景不滚动；分类写进 URL；窄于 640px 改成全屏页面，分类变顶部横滑 Tab。

## 示意图

```js
export const wire = {
  cols: '1fr',
  rows: '1fr',
  areas: ['pg'],
  boxes: { pg: { label: '背后的页面', kind: 'content' } },
  drawer: {
    side: 'center',
    size: '820px',
    height: '560px',
    open: true,
    box: {
      label: '设置弹窗',
      inner: {
        cols: '190px 1fr',
        rows: 'auto 1fr',
        areas: ['hd hd', 'nav body'],
        boxes: {
          hd: { label: '标题 · 关闭', kind: 'dlghead', text: '偏好设置' },
          nav: { label: '设置分类', kind: 'nav' },
          body: { label: '分组卡片', kind: 'form', acc: true, text: '工作区信息' },
        },
      },
    },
  },
};
export const wireMobile = {
  cols: '1fr',
  rows: 'auto auto auto auto 1fr',
  areas: ['nav', 'tb', 'f1', 'f2', '.'],
  boxes: {
    nav: { label: '‹ 返回（全屏页面）', kind: 'mtop', text: '偏好设置' },
    tb: { label: '分类 Tab', kind: 'tabs', text: '通用|通知|快捷键|账号' },
    f1: { label: '分组卡片', kind: 'form', acc: true, text: '工作区信息' },
    f2: { label: '分组卡片（开关行）', kind: 'switches', text: '通知' },
  },
};
```
