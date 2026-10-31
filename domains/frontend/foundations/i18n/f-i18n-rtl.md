---
zh: 从右往左的界面
en: Right-to-left layout
order: 30
---

## 是什么

阿拉伯语、希伯来语界面整体从右往左排：布局和带方向的图标跟着镜像，号码、代码和音视频播放进度保持从左往右。

## 适合

要支持阿拉伯语、希伯来语、波斯语、乌尔都语的产品。

## 不适合

不支持这些语言时，不用专门做镜像，但写样式时用逻辑属性仍然更省事。

## 注意

只在根元素加 dir="rtl" 不够：样式里写死的 left、right、margin-left 和 translateX 不会跟着翻，返回箭头也还指着原来的方向。

## 要点

- 根元素设 dir 和 lang；样式用逻辑属性：margin-inline-start、padding-inline、inset-inline-start、border-start-start-radius、text-align: start
- flex 和 grid 会随 dir 自动反向；横向位移和滑入动画在 :dir(rtl) 下反转方向
- 表示方向的图标（返回、前进、展开箭头、列表缩进）在从右往左时水平翻转；对勾、搜索、播放这类不表示方向的图标不翻
- 电话号码、金额、日期、代码、拉丁字母品牌名用 <bdi> 或 unicode-bidi: isolate 隔离，内部仍然从左往右
- 音视频的播放键和进度条保持从左往右；加载进度、步骤条、轮播跟着界面方向
- 用伪本地化或真实译文截图检查：每个页面在两个方向下都看一遍

## 提示词

让{页面}支持从右往左的语言：根元素按语言设 dir 和 lang；样式里的 left / right / margin-left 等全部换成逻辑属性（margin-inline-start、padding-inline、inset-inline-start、text-align: start），横向位移和滑入动画在 :dir(rtl) 下反转；返回、前进、展开箭头等表示方向的图标在从右往左时水平翻转，对勾、搜索、播放不翻；电话号码、金额、日期、代码和品牌名用 <bdi> 隔离；音视频播放键和进度条保持从左往右，加载进度、步骤条、轮播跟着界面方向；加一个切换方向的开关，两个方向各截一张图对比。
