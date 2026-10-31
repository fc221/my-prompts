---
zh: 错误边界与前端监控
en: Error boundaries and frontend monitoring
aka: Error Boundary 错误上报 前端监控 白屏 source map Sentry
order: 50
---

## 是什么

组件渲染出错时，用错误边界把影响限制在出错的那一块，其他区域照常可用；同时把运行错误、未处理的 Promise 拒绝、资源加载失败和性能指标上报到监控平台，带上版本、页面和用户操作，能还原到源码行。

## 适合

线上偶发白屏、用户说“一点就空白”却复现不了；新项目接入监控；一个图表组件报错拖垮整个看板。

## 不适合

接口错误怎么分层提示（重试、跳登录、字段报错）看「前端错误分层处理」；出错时界面长什么样看「错误状态与重试」。

## 注意

错误边界只接得住渲染阶段的错误，接不住事件处理函数、异步回调和请求里的错误。这些要在代码里 try/catch 处理，再靠全局监听兜底上报。

## 要点

- 边界分三层：根边界整页兜底（提供刷新和回首页）；路由或布局边界保住导航，一个页面坏了还能去别的页面；区块边界包住图表、富文本、第三方组件，坏了只在该块显示错误和重试。
- 用框架自带的机制：React 用错误边界组件（类组件或 react-error-boundary）；Next.js 用 error.tsx 和 global-error.tsx；Vue 用 onErrorCaptured 和 app.config.errorHandler；Nuxt 用 error.vue 和 NuxtErrorBoundary；SvelteKit 用 +error.svelte 和 handleError 钩子；Angular 用自定义 ErrorHandler。
- 全局监听补齐边界之外的：window 上监听 error（用捕获阶段，才能收到图片、脚本等资源加载失败）和 unhandledrejection。
- 上报内容：错误信息和堆栈、release 版本号、路由、浏览器和系统、最近 20 条用户操作面包屑；手机号、身份证号、token、表单原文在上报前过滤掉。
- source map 在构建时上传到监控平台，部署的静态目录里删掉 .map 文件；每次发版用唯一的 release 号，和 source map 一一对应。
- 控制上报量：同一错误在同一会话里只报一次；错误全量上报，性能数据按 10%–20% 采样；已知无害的错误（如 ResizeObserver loop、浏览器插件脚本）加进忽略列表。
- chunk 加载失败单独归类：界面上提示有新版本并刷新，统计时和业务错误分开。
- 告警按影响定级：新版本发布后错误率比上一版翻倍，或受影响用户数超过设定阈值，通知对应模块的负责人。

## 提示词

请为{产品}补齐错误边界和前端监控，监控平台用{监控平台}。先读现有的错误处理：有没有错误边界、全局错误监听、上报 SDK，发版流程里有没有 release 号和 source map 上传。
按规则改：
1. 三层边界：根边界整页兜底（刷新、回首页）；路由或布局边界保住导航；{重点区块}这类独立区块各自加边界，出错只在该块显示错误和重试。用{框架}自带的机制实现。
2. 全局监听 error（捕获阶段，含资源加载失败）和 unhandledrejection。
3. 上报带 release、路由、设备信息和最近 20 条操作面包屑，过滤手机号、token 等敏感字段。
4. 构建时上传 source map 到监控平台，部署产物里删掉 .map 文件。
5. 同一会话同一错误只报一次，性能数据按 10% 采样，已知无害错误加入忽略列表；chunk 加载失败单独处理为提示刷新。
完成后汇报改了哪些文件；验证：在开发环境故意让一个区块组件抛错，确认只有该块显示错误、导航可用；触发一次未处理的 Promise 拒绝，在监控平台看到能还原到源码行的堆栈。

## 示例

<link rel="stylesheet" href="../../_shared/diagram.css">

<script type="module">
import { draw, rings, stack } from '../../_shared/diagram.ts';
export default function demo(root) {
  draw(root, [
    rings([{ t: '根边界', note: '整页兜底：刷新、回首页' }, { t: '路由边界', note: '保住导航' }, { t: '区块边界', note: '图表坏了只这块重试' }], '事件和异步错误靠 window 监听兜底'),
    stack([
      { t: '捕获', items: ['error', 'unhandledrejection'], note: '捕获阶段才收得到资源加载失败' },
      { t: '整理', items: ['release', '路由', '20 条面包屑'], note: '过滤手机号、token', acc: true },
      { t: '上报', note: '同一错误每会话只报一次' },
      { t: '还原', items: ['source map'], note: '构建时上传，部署目录删掉 .map' },
    ]),
  ], { title: '错误边界三层 · 上报能还原到源码行' });
}
</script>
