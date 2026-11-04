---
zh: 组件接口设计
en: Component API design
aka: props 设计 事件命名 插槽 children 复合组件 v-model defineModel
order: 20
---

## 是什么

约定组件的 props、事件、插槽 / children 和 ref 怎么命名、怎么拆，让同类组件用法一致：别人和 AI 看一眼类型就会用，组件也不容易越改越臃肿。

## 适合

编写和整理基础组件、业务组件；props 越加越多；几个弹窗、卡片的参数名各不相同（visible、show、open 混用）。

## 不适合

值由谁管看「受控与非受控」；逻辑复用看「逻辑复用」；交互复杂、想把行为和样式分开的看「无头组件」。

## 注意

来一个新需求就加一个布尔 prop（showFooter、hideIcon、isCompact）是 props 膨胀的主因。先看能否用插槽 / children 或一个 variant 枚举解决。

## 要点

- 同一含义全项目同一个名字：开关用 open，禁用 disabled，加载 loading，变体 variant（'primary' | 'secondary' | 'danger'），尺寸 size（'sm' | 'md' | 'lg'）。布尔 prop 用肯定式，默认 false。
- 事件按“发生了什么”命名：React 用 onChange、onSelect、onClose 回调，Vue 用 defineEmits 声明带类型的 change、select、close；双向绑定 React 用 value + onChange，Vue 用 v-model（Vue 3.4 起用 defineModel 声明）。
- props 超过 8 个，或有 3 个以上 prop 只为控制某一块的显隐和文案，就把这块改成插槽 / children：Vue 用具名插槽 header、footer，React 用 ReactNode 类型的 header、footer prop，或复合组件（Card.Header、Card.Body）。
- 互斥的参数用 TypeScript 可辨识联合表达：比如 as 为 'link' 时才允许 href，错误组合在类型检查阶段就被拦住。
- 基础组件把未声明的原生属性透传到真正的元素上：React 把剩余 props 展开到根元素；Vue 默认继承 attrs，包了一层的输入框设 inheritAttrs: false 后把 $attrs 绑到 input。class / className 与内部样式合并。
- 命令式能力只暴露必要的方法：React 19 起 ref 可以直接作为 prop 传（旧版本用 forwardRef），配 useImperativeHandle 只暴露 focus、scrollToTop 这类；Vue 用 defineExpose。
- props 类型写在组件文件顶部，必填在前；默认值让最常见的用法零配置。
- 改名或删参数时旧名保留一个版本，开发环境 console.warn 提示新名，再一次性替换调用处。

## 提示词

统一 {组件目录，如 src/components/ui} 里组件的接口，调用处行为不变：
1. 列出每个组件的 props、事件、插槽 / children 和暴露的方法，标出：同义不同名（visible / show / open）、布尔 prop 超过 3 个、props 超过 8 个、互斥参数没有类型约束、未透传原生属性、覆盖了外部 class。
2. 出一份命名表（open、disabled、loading、variant、size、value + onChange 或 v-model、事件名）和每个组件的改法，等我确认。
3. 按表修改组件和全部调用处；props 过多的组件把可选区域改成插槽 / children；互斥参数改为可辨识联合类型。
4. 旧参数名保留一个版本，开发环境给出警告。
5. 跑类型检查和现有测试，汇报每个组件改了什么、调用处改了几处、哪些旧名待下个版本删除。

## 示例

<link rel="stylesheet" href="../../_shared/diagram.css">

<script type="module">
import { draw, code } from '../../_shared/diagram.ts';
export default function demo(root) {
  draw(root, code([
    { t: '改前：同义不同名，布尔越加越多', text: `
<RefundDialog
  visible={show}
  showFooter
  hideIcon
  isCompact
  footerText="确认退款"
/>
` },
    { t: '改后：统一命名，可选区域用 children', text: `
<RefundDialog
  open={open}
  onOpenChange={setOpen}
  size="sm">
  <RefundDialog.Footer>
    <Button variant="danger">
      确认退款
    </Button>
  </RefundDialog.Footer>
</RefundDialog>
` },
  ]), { title: '组件接口 · open / size / variant' });
}
</script>
