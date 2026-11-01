---
zh: 用状态机管流程
en: State machines for flows
aka: 状态机 XState useReducer 有限状态机 FSM 可辨识联合 状态图
order: 60
---

## 是什么

把有多个阶段、状态互斥的流程（支付、上传、多步提交、工单审批、扫码登录）写成“当前状态 + 事件 → 下一个状态”的明确规则，取代一堆 isLoading、isError、isSuccess 布尔值。

## 适合

一个流程有 4 个以上状态、状态之间有严格先后；出现“既在加载又显示成功”“取消后又弹出成功”这类本不该出现的组合；有超时、重试、取消。

## 不适合

普通请求的加载、成功、失败交给「服务端状态缓存」；两三个状态的开关用一个枚举字段就够；多步表单的界面布局看「分步表单」。

## 注意

先用一个 status 联合类型替换多个布尔值，往往就能解决大部分问题。出现嵌套状态、并行任务、超时和取消时，再引入状态机库。

## 要点

- 第一步：多个布尔值合并成一个 status，取值是字面量联合类型（'idle' | 'uploading' | 'processing' | 'done' | 'failed'）；和状态相关的数据跟着状态走，用可辨识联合表达：failed 才有 error，done 才有 fileUrl。
- 转换写成纯函数 reducer：(state, event) => 下一个 state；React 用 useReducer，Vue 用 ref 加一个 send 函数封装成组合式函数；事件处理函数只发事件，不直接改多个字段。
- 当前状态不接受的事件原样返回（uploading 时再点“开始”无效）；按钮是否可用从 status 推导，不另存 disabled。
- 引入库的条件：超过 6 个状态、有嵌套（支付中又分等待扫码和等待确认）、有定时或并行任务；这时用 XState v5（setup 加 createMachine，@xstate/react 或 @xstate/vue 的 useMachine）。
- 异步任务挂在状态上（XState 的 invoke 配 fromPromise）：离开状态自动取消，取消后晚到的结果不会再改状态。
- 超时、自动重试用延迟转换（after）写在状态定义里，组件里不另起 setTimeout。
- 状态定义单独成文件：src/features/<领域>/machines/payment.machine.ts（或 payment.reducer.ts），旁边写测试，逐条覆盖“状态 + 事件 → 结果”。

## 提示词

把 {流程名，如 门店报销单提交} 改成状态机管理，界面表现不变：
1. 读现有代码，列出这个流程用到的布尔值和状态字段、所有修改它们的位置；用文字列出实际存在的状态和转换，标出可能出现的矛盾组合。
2. 设计目标状态表：状态名、每个状态接受的事件、下一个状态、进入时执行的任务、状态携带的数据，等我确认。
3. 不超过 6 个状态且没有嵌套的，用 status 联合类型加 reducer（React useReducer / Vue 组合式函数）；更复杂的用项目已有的状态机库，没有就提议 XState v5 并说明理由。
4. 组件只发送事件、按 status 渲染，按钮可用性从 status 推导；取消或离开状态时中止进行中的请求，晚到的结果不改状态。
5. 为每条转换写单元测试；汇报改动的文件和测试结果。

## 示例

<link rel="stylesheet" href="../../_shared/diagram.css">

<script type="module">
import { draw, boxes } from '../../_shared/diagram.ts';
export default function demo(root) {
  draw(root, boxes([
    { t: 'idle', items: ['START → uploading'] },
    { t: 'uploading', items: ['UPLOADED → processing', 'FAIL → failed', 'CANCEL → idle'], acc: true },
    { t: 'processing', items: ['DONE → done', 'after 超时 → failed'] },
    { t: 'done', items: ['带 fileUrl'] },
    { t: 'failed', items: ['带 error', 'RETRY → uploading'] },
    { t: '其他事件', items: ['原样返回', 'uploading 时再点 START 无效'], dash: true },
  ], { cols: 3, note: '一个 status 替代 isLoading、isError、isSuccess' }), { title: '上传流程 · 状态 + 事件 → 下一个状态' });
}
</script>
