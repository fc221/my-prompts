---
zh: Nuxt 项目约定
en: Nuxt project conventions
aka: Nuxt 4 useFetch useAsyncData Nitro 服务端路由 自动导入
order: 50
---

## 是什么

Nuxt 4 项目的目录、自动导入、路由、数据获取、服务端接口和测试约定（Nuxt 5 仍在开发中，可用 future.compatibilityVersion: 5 提前试）。Nuxt 4 起应用代码默认放在 app/ 目录（srcDir 默认是 app/），server/、shared/、public/ 和 nuxt.config.ts 留在项目根目录。

## 适合

新建要服务端渲染的 Vue 站点（电商、门店官网、会员中心）；Nuxt 3 升级到 4；整理 useFetch 乱用、首屏数据重复请求的项目。

## 不适合

纯后台单页应用用「Vue 3 项目约定」更轻；纯内容站也可以考虑「Astro 内容站」。

## 注意

首屏数据用 useFetch / useAsyncData：它们在服务端取数，再通过 payload 交给浏览器，水合时不会再请求一次；点击、提交这类交互触发的请求用 $fetch。Nuxt 4 中两者返回的 data 默认是 shallowRef，没有数据时是 undefined；同一个 key 的多次调用共享同一份 data，传入的选项要一致。

## 要点

- 目录：app/ 对应「目录结构」里的 src/。app/pages（文件路由，即页面层）、app/layouts、app/components（自动导入，子目录名会拼进组件名，基础组件放 app/components/ui）、app/composables（通用组合函数）、app/stores（Pinia）、app/utils、app/middleware（路由中间件）、app/plugins、app/app.vue、app/error.vue；按领域的代码放 app/features/<领域>，这里不在自动导入范围内，显式 import；浏览器端的请求层放 app/api，和 Nitro 的 server/api 不是一回事。根目录的 server/api、server/routes、server/middleware、server/utils 由 Nitro 处理；shared/utils 和 shared/types 放前后端共用的代码并会被自动导入；public/ 放原样输出的文件。
- 路由：pages 下 [id].vue 是动态段，[...slug].vue 是全匹配；页面元信息和中间件用 definePageMeta 声明；登录检查写成具名路由中间件 app/middleware/auth.ts 由页面引用，需要全站生效时命名为 auth.global.ts。
- 数据：useFetch 的 key 会按 URL 和参数自动生成，复杂场景用 useAsyncData 显式写 key；用 pick 或 transform 只保留页面用到的字段来缩小 payload；需要深层响应时显式传 deep: true。
- 状态：跨组件的简单共享状态用 useState（SSR 安全）；复杂的客户端状态用 Pinia（@pinia/nuxt）；在模块顶层定义的 ref 会在服务端的不同请求之间共享，造成用户数据串号，所以共享状态只能走这两种方式。
- 服务端接口：server/api 下文件名带方法后缀（orders.get.ts、orders.post.ts），用 defineEventHandler 配合 readValidatedBody、getValidatedQuery 和 zod 校验入参；密钥只从 runtimeConfig 的私有部分读取。
- 渲染：在 nuxt.config 的 routeRules 里按路由配置 prerender、swr、ssr: false，见「渲染模式选型」；只能在浏览器运行的组件用 ClientOnly 包裹或加 .client.vue 后缀。
- 样式和资源：组件用 scoped 或 CSS Modules，全局样式在 nuxt.config 的 css 里引入；字体和图片用 @nuxt/fonts、@nuxt/image 模块。
- 命令：dev（nuxt dev）、build（nuxt build）、generate（全静态站点时）、preview、typecheck（nuxt typecheck）、test（vitest 加 @nuxt/test-utils）、test:e2e（playwright）、lint（@nuxt/eslint 生成的扁平配置）。

## 提示词

请按约定整理{产品}的 Nuxt 项目（以 Nuxt 4 为准）。先读 nuxt.config.ts、目录树、数据请求调用和 server 目录，列出：Nuxt 版本、是否已是 app/ 目录结构、首屏用 $fetch 造成重复请求的地方、点击事件里调用 useFetch 的地方、模块顶层的共享 ref、缺少入参校验的 server 接口。
约定：
1. 目录按 Nuxt 4 默认：应用代码进 app/，server、shared、public 留在根目录。
2. 首屏数据用 useFetch / useAsyncData 并用 pick 只取用到的字段；交互触发的请求用 $fetch。
3. 共享状态改用 useState 或 Pinia，删掉模块顶层的共享 ref。
4. 登录检查写成路由中间件，页面用 definePageMeta 引用。
5. server/api 按方法后缀命名，入参用 zod 校验，密钥从私有 runtimeConfig 读取。
6. 渲染方式写进 routeRules；提供 dev、build、typecheck、test、lint 命令。
还是 Nuxt 3 目录结构的，先单独提交一次目录迁移。
完成后汇报改了哪些文件；验证：nuxt typecheck 通过，首屏页面在网络面板里没有重复的数据请求，刷新和站内跳转都能拿到数据。

## 示例

<link rel="stylesheet" href="../../_shared/diagram.css">

<script type="module">
import { draw, tree } from '../../_shared/diagram.ts';
export default function demo(root) {
  draw(root, tree(`
* app/                  应用代码，srcDir 默认就是它
*   pages/              文件路由，[id].vue 是动态段
    components/ui/      自动导入，子目录拼进组件名
    composables/        自动导入
    middleware/         auth.ts，全站用 auth.global.ts
    features/orders/    不在自动导入范围，显式 import
    api/                浏览器端请求层
    stores/             Pinia
    app.vue             error.vue 同级
* server/               Nitro 处理
    api/orders.get.ts   方法后缀，zod 校验入参
* shared/               前后端共用，自动导入
  public/               原样输出
  nuxt.config.ts        routeRules 写渲染方式
`), { title: 'Nuxt 4 · app/ 目录结构' });
}
</script>
