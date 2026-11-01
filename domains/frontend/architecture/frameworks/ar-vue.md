---
zh: Vue 3 项目约定
en: Vue 3 project conventions
aka: Vue 3.5 script setup 组合式 API Pinia Vue Router Vite
order: 30
---

## 是什么

用 Vite 搭的 Vue 单页应用的目录、组件、路由、数据、样式和测试约定，以 Vue 3.5 为准（3.6 尚在测试版）：组合式 API 加 script setup 加 TypeScript，全局状态用 Pinia。需要服务端渲染的看「Nuxt 项目约定」。

## 适合

新建 Vue 后台；整理已有 Vue 3 项目：选项式和组合式混写、到处是 mixin、Vuex 还没迁；Vue 2 升级之后的收尾。

## 不适合

要服务端渲染和收录的站点用「Nuxt 项目约定」；小程序看「小程序与跨端」里的 uni-app。

## 注意

Vue 3.5 起 defineProps 解构出的变量保持响应式，默认值可以直接写在解构里；但把解构出的 prop 传给 watch 或组合函数时要包成 getter（() => props 里的值），否则只传进去一个死值。双向绑定用 defineModel，模板引用用 useTemplateRef。

## 要点

- 目录照「目录结构」，Vue 习惯的叫法：src/main.ts 和 src/App.vue（入口，对应 src/app）、src/router（路由表和守卫）、src/views（页面）、src/features/<领域>（components、composables、api.ts、queries.ts、schemas）、src/components/ui（基础组件）、src/api、src/stores（Pinia）、src/composables（通用组合函数）、src/lib、src/assets、src/styles。
- 组件：统一 script setup lang="ts"，块顺序 script → template → style；组件名多个单词、PascalCase（OrderCard.vue），和原生标签区分开；props 和 emits 用基于类型的声明。
- 逻辑复用：抽成 composables/ 下的组合函数（useOrderFilter 这样命名），返回由 ref 组成的普通对象；mixin 全部迁走，见「逻辑复用」。
- 路由：Vue Router，路由组件用动态 import 懒加载；meta 写标题和权限码，在 router.beforeEach 统一检查。
- 数据和状态：服务端数据用 TanStack Query 的 Vue 版或 Pinia Colada 缓存；Pinia store 用 setup 写法，只放跨页面的客户端状态；组件里解构 store 用 storeToRefs，否则失去响应。
- 响应式：基本值用 ref；reactive 对象不整体重新赋值；派生值用 computed，watch 只用于副作用（请求、存储、埋点）。
- 样式：style scoped 或 CSS Modules，深层覆盖子组件用 :deep()；设计令牌用 CSS 变量；组件库主题通过它提供的变量覆盖。
- 命令：dev（vite）、build（vue-tsc -b && vite build）、test（vitest 加 @vue/test-utils 或 Testing Library）、test:e2e（playwright）、lint（eslint 加 eslint-plugin-vue 的扁平配置）、typecheck（vue-tsc --noEmit）。

## 提示词

请按约定整理{产品}的 Vue 项目（Vite + Vue 3.5 + TypeScript）。先读 package.json、src 目录树、路由和 store，列出：Vue、Vue Router、Pinia 的版本，选项式和组合式组件各有多少，mixin、Vuex、全局事件总线这类旧写法在哪些文件。
约定：
1. 组件统一 script setup lang="ts"，props 和 emits 用类型声明，双向绑定用 defineModel，模板引用用 useTemplateRef。
2. mixin 改成 composables 下的组合函数。
3. Vuex 迁到 Pinia 的 setup 写法，store 只放跨页面的客户端状态，服务端数据交给{请求缓存库}。
4. 路由组件懒加载，标题和权限写在 meta，由全局守卫统一处理。
5. 派生值用 computed，watch 只做副作用。
6. 样式用 scoped，覆盖子组件用 :deep()。
7. 提供 dev、build、test、test:e2e、lint、typecheck 命令，类型检查用 vue-tsc。
一次只迁一个功能，迁完跑 vue-tsc 和测试，保证行为不变。
完成后汇报改了哪些文件、迁移的组件和 store 数量、还没迁的部分，以及构建和测试结果。

## 示例

<link rel="stylesheet" href="../../_shared/diagram.css">

<script type="module">
import { draw, tree } from '../../_shared/diagram.ts';
export default function demo(root) {
  draw(root, tree(`
src/
  main.ts             入口
  App.vue             根组件
* router/             路由表，beforeEach 统一检查权限
* views/              页面，动态 import 懒加载
  features/           按领域分
    orders/           components、composables、schemas
      api.ts          本领域请求函数
      queries.ts      查询键
  components/ui/      基础组件，OrderCard.vue 式命名
  stores/             Pinia，setup 写法
* composables/        useOrderFilter，替代 mixin
  api/                请求客户端
  styles/             CSS 变量令牌
`), { title: 'Vite + Vue 3.5 单页应用' });
}
</script>
