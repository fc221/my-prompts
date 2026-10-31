---
zh: 无头组件
en: Headless components
aka: headless 无样式组件 Radix React Aria Reka UI Ark UI Headless UI TanStack Table
order: 50
---

## 是什么

只提供行为、状态和无障碍属性、不带样式的组件或 hook，比如下拉选择、组合框、对话框、菜单、标签页。键盘、焦点、读屏由它负责，外观完全用项目自己的样式和设计令牌。

## 适合

有自己的视觉规范，又需要下拉、组合框、日期选择这类复杂交互；用带样式的组件库时到处覆盖样式、越改越难；自己手写的下拉键盘不能用、焦点乱跳。

## 不适合

内部后台、没有专门视觉要求的工具，直接用一套带样式的组件库更快；按钮、卡片这类没有复杂交互的组件自己写即可；表格的外观规范看「数据表格」。

## 注意

无头组件最大的价值是键盘和读屏逻辑：焦点在框内循环、方向键移动、aria-activedescendant、Esc 关闭、关闭后焦点归还。自己再包一层时，这些行为原样保留，改造只碰外观。

## 要点

- 选型：React 有 Radix Primitives、React Aria、Headless UI、Ark UI；Vue 有 Reka UI、Ark UI、Headless UI。全项目只用一家，混用会让焦点管理和浮层层级互相打架。
- 无头库只在 src/components/ui 里被引用，包成项目自己的 Select、Dialog、Menu；业务代码只引项目组件，将来换库只改这一层。
- 样式挂在库输出的状态属性上：data-state="open"、data-disabled、data-highlighted、aria-selected、aria-expanded，不在脚本里拼 class。
- 两种形态按需选：复合组件（Select.Root、Select.Trigger、Select.Content，Vue 写成 SelectRoot 等）适合大多数情况；hook 形态（React Aria 的 useButton、useComboBox 返回要绑定的属性）适合必须完全掌控 DOM 结构时。
- 封装后的对外接口遵守「组件接口设计」和「受控与非受控」：open / onOpenChange、value / onChange，业务代码看不到无头库的内部类型。
- 浮层统一走库提供的 Portal，项目里定一张层级表并写成令牌（如下拉 1000、对话框 1100、轻提示 1200）。
- 自己从零写之前先数一数：键盘操作、读屏、输入法、触屏这四项里需要两项以上，就用无头库。
- 逻辑很重的组件也有无头方案：表格的排序、分页、列显隐交给 TanStack Table，结构和样式自己写。

## 提示词

把 {产品} 里的 {下拉选择 / 组合框 / 对话框 / 菜单} 改为基于无头组件实现，对外用法不变：
1. 查看已安装的 UI 依赖，列出这些组件现在的实现方式和已知问题（键盘不能操作、焦点不回到触发处、到处覆盖样式）。
2. 项目已有无头库就沿用；没有就在 {Radix Primitives / React Aria / Reka UI / Ark UI} 中推荐一个并说明理由，等我确认后再安装。
3. 在 src/components/ui 下封装项目自己的组件：样式用现有设计令牌，挂在 data-state 和 aria-* 属性上；对外接口与旧组件一致，浮层用库的 Portal。
4. 逐个替换调用处，删掉旧实现。
5. 用键盘逐个验证：Tab 进入、方向键移动、Enter 选中、Esc 关闭、关闭后焦点回到触发按钮，读屏能读出当前选项。汇报改动文件和验证结果。
