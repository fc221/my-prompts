---
zh: React 项目约定
en: React project conventions
aka: React 19 Vite React Router TanStack Query 函数组件 Hooks
order: 20
---

## 是什么

用 Vite 搭的 React 19 单页应用（后台、工具、看板）的目录、组件、路由、数据、样式和测试约定。需要服务端渲染和收录的项目看「Next.js 项目约定」。

## 适合

新建 React 后台或工具；整理已有 React 项目：类组件和函数组件混用、在 useEffect 里拉数据、全局 store 什么都往里放。

## 不适合

需要 SSR / SSG 的站点用「Next.js 项目约定」；内容站用「Astro 内容站」；小程序看「小程序与跨端」里的 Taro。

## 注意

React 19 起 ref 可以像普通 prop 一样传给函数组件，新代码不再需要 forwardRef；表单提交可以用 Actions（form 的 action、useActionState、useOptimistic）管理提交中、错误和乐观更新。最常见的旧写法是在 useEffect 里拉数据再 setState，服务端数据交给请求缓存库。

## 要点

- 目录照「目录结构」：src/app（main.tsx、providers.tsx、router.tsx）、src/pages（页面，只组装）、src/features/<领域>（components、hooks、api.ts、queries.ts、schemas）、src/components/ui、src/api、src/stores、src/hooks、src/lib、src/styles，另加 src/test（测试初始化和 MSW handlers）。
- 组件：只写函数组件，一个文件一个导出组件，文件命名全项目统一；props 用 TypeScript 类型声明；怎么拆层见「组件分层」，接口怎么定见「组件接口设计」。
- 路由：React Router（v7，用 createBrowserRouter 的数据模式）或 TanStack Router；页面用 lazy 懒加载，外壳放布局路由，可以在 loader 里提前取数。
- 数据和状态：服务端数据用 TanStack Query，查询键按 [资源, 参数] 组织，修改成功后 invalidateQueries；少量全局客户端状态（主题、当前门店）用 Zustand 或 Context，放 src/stores，见「全局状态库」；组件内状态用 useState / useReducer。
- 副作用：派生值在渲染时直接计算，不用 useEffect 同步到另一个 state；useEffect 只用于和外部系统同步（订阅、DOM、定时器），并返回清理函数。
- 性能：启用 React Compiler 后大部分 useMemo / useCallback 可以不写；没启用时只在测出性能问题的地方加。
- 样式：CSS Modules 或 Tailwind CSS 二选一，设计令牌放 CSS 变量，见「设计令牌落到代码」；全项目只用一种样式方案。
- 命令：dev（vite）、build（tsc -b && vite build）、preview、test（vitest，配 Testing Library 和 MSW）、test:e2e（playwright）、lint（eslint .）、typecheck（tsc --noEmit）。

## 提示词

请按约定整理{产品}的 React 项目（Vite + React 19 + TypeScript）。先读 package.json、路由配置、目录树和典型页面，列出：React 和路由库版本、请求方式、状态库、样式方案、测试现状，以及和约定不一致的地方。
约定：
1. 目录分 src/app、src/pages、src/features/<领域>、src/components/ui、src/api、src/stores、src/lib。
2. 只用函数组件；新代码不写 forwardRef，ref 作为普通 prop 传递。
3. 路由集中在 src/app/router.tsx，页面懒加载，外壳放布局路由。
4. 服务端数据改用 TanStack Query，删掉 useEffect 里拉数据的写法；全局 store 只留主题、当前用户这类少量客户端状态。
5. 派生值在渲染时计算，useEffect 只做外部同步并写清理函数。
6. 表单提交用 Actions 和 useActionState 处理提交中和错误状态。
7. 样式统一为{样式方案}。
8. 提供 dev、build、test、test:e2e、lint、typecheck 命令。
按领域分批改，每批跑类型检查和测试；需要升级依赖时先告诉我。
完成后汇报改了哪些文件、清理掉的旧写法数量，以及构建和测试结果。

## 示例

<link rel="stylesheet" href="../../_shared/diagram.css">

<script type="module">
import { draw, tree } from '../../_shared/diagram.ts';
export default function demo(root) {
  draw(root, tree(`
src/
  app/
    main.tsx          入口
    providers.tsx     QueryClient、主题
*   router.tsx        路由集中，页面 lazy 懒加载
  pages/              页面只组装
* features/           按领域分
*   orders/           components、hooks、schemas
      api.ts          本领域请求函数
      queries.ts      查询键 [资源, 参数]
  components/ui/      基础组件
  api/                请求客户端
  stores/             Zustand：主题、当前门店
  test/               测试初始化、MSW handlers
`), { title: 'Vite + React 19 单页应用' });
}
</script>
