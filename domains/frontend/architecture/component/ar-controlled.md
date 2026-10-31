---
zh: 受控与非受控
en: Controlled vs uncontrolled
aka: controlled uncontrolled defaultValue v-model defineModel useControllableState
order: 30
---

## 是什么

组件里的值（输入内容、开关、选中的标签页、弹窗是否打开）由父组件传入、通过事件回写，叫受控；组件自己保存、只在变化时通知外面，叫非受控。这条定规矩：每类组件支持哪种，两种都支持时怎么写。

## 适合

封装输入框、下拉、开关、标签页、对话框、折叠面板；出现“父组件改了值子组件不跟着变”“值来回跳”的问题。

## 不适合

整张表单的值和校验看「表单状态与校验」；跨组件共享的状态放哪看「状态分类与归属」。

## 注意

“改了 prop 不生效”几乎都来自同一种写法：用 prop 初始化本地状态（React 的 useState(props.value)、Vue 的 ref(props.modelValue)），之后 prop 再变就同步不过去。一个值要么完全受控，要么只用 defaultValue 初始化一次。

## 要点

- 命名：受控用 value / open / activeKey，配 onChange / onOpenChange；非受控用 defaultValue / defaultOpen。Vue 受控用 v-model（modelValue + update:modelValue，具名的写 v-model:open）。
- 两种都支持时只写一份实现：React 抽一个 useControllableState(value, defaultValue, onChange)，以 value 是否为 undefined 判断受控；Vue 用 defineModel，父组件没传时它自动当本地状态用，默认值写在 defineModel 的 default 里。
- 运行中不允许在受控和非受控之间切换：开发环境检测到 value 从 undefined 变为有值（或反过来）时 console.warn。
- 受控时组件只上报、不擅自修正：数字超出范围、格式不对，先把输入值通过 onChange 交给父组件；需要格式化的，在失焦时上报格式化后的值。
- 默认选择：基础组件两种都支持；业务组件默认受控；只影响自身显示的开关（“展开更多”）只做非受控。
- 弹窗、抽屉：open 受控，Esc、点遮罩、关闭按钮都只调用 onOpenChange(false) 或 emit('update:open', false)，由父组件决定是否真的关闭（比如有未保存内容时拦下）。
- 非受控组件要恢复初始值时，换 key 重新挂载（React 的 key、Vue 的 :key），不另加 reset 之类的 prop。
- 自己封装的文本输入要照顾中文输入法：组字期间（compositionstart 到 compositionend）只更新显示，不触发校验和搜索请求；Vue 原生 v-model 在 input 上默认已等组字结束再更新。

## 提示词

检查 {组件目录} 里输入、选择、开关、标签页、弹窗类组件的受控方式，调用处行为不变：
1. 列出每个组件现状：受控、非受控还是混用；找出用 prop 初始化本地状态后不再同步的写法（useState(props.value)、ref(props.modelValue)），以及组件自己直接关闭弹窗、擅自修正输入值的地方。
2. 按规则改：受控用 value + onChange（Vue 用 v-model / defineModel），非受控用 defaultValue；两种都要支持的，React 统一用一个 useControllableState，Vue 统一用 defineModel。
3. 弹窗、抽屉只通过 onOpenChange / update:open 通知关闭；运行中切换受控模式时开发环境警告；文本输入在组字期间不触发校验和请求。
4. 验证：父组件修改值，子组件立即跟着变；只传 defaultValue 时组件能独立工作；用中文输入法输入时，拼音阶段不触发请求。汇报改动的文件和每个组件最终采用的模式。

## 示例

<link rel="stylesheet" href="../../_shared/diagram.css">

<script type="module">
import { draw, seq } from '../../_shared/diagram.ts';
export default function demo(root) {
  draw(root, seq(['用户', '退款弹窗', '父组件'], [
    [0, 1, '按 Esc'],
    [1, 2, 'onOpenChange(false)'],
    [2, 2, '有未保存内容，先拦下'],
    [2, 1, 'open 仍为 true', 'r'],
    [0, 1, '点“放弃修改”'],
    [1, 2, 'onOpenChange(false)'],
    [2, 1, 'open=false，关闭', 'r'],
  ]), { title: '受控 · 值在父组件，子组件只上报' });
}
</script>
