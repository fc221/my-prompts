---
zh: 全局状态库
en: Global store
aka: Pinia Zustand Redux Toolkit Jotai Vuex store 状态管理
order: 30
---

## 是什么

存放跨页面、和后端数据无关的客户端状态（当前用户摘要、主题、侧栏折叠、未登录时的购物车、多步流程的中间结果）的统一仓库，常见的是 Vue 的 Pinia，React 的 Zustand、Redux Toolkit、Jotai。

## 适合

不相邻的多个组件读写同一份客户端状态；Context 层层嵌套或高频更新导致一大片组件重渲染；需要在组件外（请求拦截器、路由守卫）读写状态。

## 不适合

后端数据放「服务端状态缓存」；筛选和页码放「状态放进 URL」；正在填写的输入放「表单状态与校验」；只在一棵子树里用的放 Context / provide。

## 注意

store 不是全局变量收纳箱。每加一个字段先过一遍「状态分类与归属」的判断顺序；大多数项目整理之后，全局 store 只剩十个字段以内。

## 要点

- 选型：Vue 3 用 Pinia（Vuex 已处于维护状态）；React 中小项目用 Zustand，已有 Redux 的继续用 Redux Toolkit（告别手写 action type 和 switch），细粒度依赖多的用 Jotai。一个项目只用一种。
- 按领域拆，一个文件一个 store，放 src/stores：useCartStore、useUiStore、useAuthStore；单个 store 超过 200 行或 15 个字段就拆。
- Pinia 用 setup 写法：defineStore('cart', () => ...)，状态用 ref，getter 用 computed，action 是普通函数并全部 return 出去；组件里解构状态用 storeToRefs，action 可以直接解构。
- Zustand 组件里用 selector 取最小数据：useCartStore((s) => s.count)；取多个字段用 useShallow 包一层；直接拿整个 store 对象会让任何字段变化都触发重渲染。
- 修改只走 action：组件里调用 cart.addItem(sku)，便于搜索调用处和统一加日志。
- store 之间不循环引用：在 action 里调用另一个 store，或在 hook / 组合式函数里组合两个 store。
- 持久化只挑偏好和草稿：用 pinia-plugin-persistedstate 或 Zustand 的 persist 中间件，指定要存的字段，带 version 和 migrate；令牌的存放看「登录态与令牌」。
- 服务端渲染时 store 按请求新建：Nuxt 里的 Pinia 已自动处理；Next.js 里用 createStore 加 Context Provider 为每个请求创建 Zustand store；用户数据放在模块级单例里会让不同用户串数据。

## 提示词

整理 {产品} 的全局状态库（{Pinia / Zustand / Redux Toolkit}），行为保持不变：
1. 列出所有 store 和字段，标出每个字段被哪些文件使用、属于哪一类；服务端数据、URL 状态、表单输入和只有一处在用的字段单独列出，准备迁走。
2. 给出目标结构：按领域拆分的 store 列表（每个不超过 200 行），以及每个迁走字段的去向，等我确认。
3. 按规则修改：Pinia 改为 setup 写法，组件解构用 storeToRefs；Zustand 调用处改为 selector，多字段用 useShallow；组件里直接给 store 字段赋值的改为调用 action。
4. 持久化只保留偏好和草稿并加版本号；令牌如果存在 localStorage，单独列出，交给我决定。
5. 跑类型检查和现有测试，手动走一遍主要流程；汇报删掉的字段、改动的文件和验证方式。

## 示例

<link rel="stylesheet" href="../../_shared/diagram.css">

<script type="module">
import { draw, boxes } from '../../_shared/diagram.ts';
export default function demo(root) {
  draw(root, boxes([
    { t: 'useCartStore', items: ['items、count', 'addItem(sku)'], acc: true },
    { t: 'useUiStore', items: ['theme、sidebar', '持久化带 version'] },
    { t: 'useAuthStore', items: ['user 摘要、status', '令牌不持久化'] },
    { t: '订单列表', items: ['→ 服务端状态缓存'], dash: true },
    { t: '筛选、页码', items: ['→ URL'], dash: true },
    { t: '正在填的表单', items: ['→ 表单库'], dash: true },
  ], { cols: 3, note: '组件用 selector 取最小数据，修改只走 action' }), { title: '全局状态库 · 按领域拆，虚线不放进来' });
}
</script>
