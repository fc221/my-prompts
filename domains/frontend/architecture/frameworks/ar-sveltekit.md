---
zh: SvelteKit 项目约定
en: SvelteKit project conventions
aka: SvelteKit 3 Svelte 5 runes $state load 表单 actions #lib
order: 60
---

## 是什么

SvelteKit 3 加 Svelte 5 项目的路由文件、load 函数、表单 actions、runes 写法和测试约定，以 SvelteKit 3 为准。路由就是 src/routes 下的目录，每个目录用 + 开头的文件声明页面、数据和接口。

## 适合

新建中小型全栈应用或站点；想要样板代码少、包体积小；SvelteKit 2 项目升级到 3，或 Svelte 4 的组件迁到 runes。

## 不适合

需要大量现成复杂组件的后台考虑「React 项目约定」或「Vue 3 项目约定」；纯内容站可以用「Astro 内容站」。

## 注意

Svelte 5 用 runes 管状态：$state 声明状态、$derived 派生、$effect 处理副作用、$props 接收属性；事件写成 onclick 这样的普通属性，插槽改用 snippet。派生值一律用 $derived，在 $effect 里改另一个状态是最常见的错误。SvelteKit 3 不再自动生成 $lib 别名，网上和旧项目里的 $lib 写法要换成 #lib。

## 要点

- 目录：src/routes 是页面层（对应「目录结构」里的 src/pages），其余通用目录放进 src/lib：src/lib/components/ui、src/lib/features/<领域>、src/lib/api、src/lib/stores（.svelte.ts 文件）、src/lib/server；另有 src/hooks.server.ts（handle、handleError）、src/params（路由参数匹配器）、src/app.html、src/app.d.ts（App.Locals、App.PageData 等类型）、static/、tests/（端到端用例）。
- 引用 src/lib 用 #lib：在 package.json 的 imports 字段声明 #lib 指向 ./src/lib/index.js、#lib/* 指向 ./src/lib/*，引用时写上扩展名（#lib/api/client.ts）。src/routes 和 static 以外任意位置的 server 目录（如 src/lib/server、src/lib/features/order/server）都只能被服务端代码引用，客户端引入会直接构建报错。
- 配置：adapter、compilerOptions 等写在 vite.config.ts 里 sveltekit() 插件的参数中，svelte.config.js 不再使用；最低版本 Node 22.17、TypeScript 6、Svelte 5.57.1、Vite 8。
- 路由文件：+page.svelte（页面）、+page.ts（通用 load，服务端和浏览器都会运行）、+page.server.ts（只在服务端运行的 load 和表单 actions）、+layout.svelte 和 +layout.server.ts（共享外壳和数据）、+server.ts（GET、POST 等接口）、+error.svelte；用 (app)、(marketing) 这样的括号目录分组而不影响 URL。
- 读数据：首屏数据在 load 里取，用 load 参数里的 fetch；要访问数据库或密钥就放进 +page.server.ts；结果通过 data 属性进页面，类型从 ./$types 导入；当前页面信息从 $app/state 读（page.url、page.data，不带 $ 前缀），$app/stores 已移除；onMount 只处理浏览器专属的事。
- 写数据：表单 actions 配 use:enhance 做渐进增强，校验失败用 fail(400, 字段错误) 返回，成功后自动重新运行 load；登录态在 hooks.server.ts 的 handle 里解析进 event.locals，受保护分组在 +layout.server.ts 检查；cookies.set 不写 path 时默认是 /，只给某个路由用的 cookie 要显式写 path；重定向到外部地址要给 redirect 传 external 选项。
- 状态和样式：组件内用 $state，跨组件共享用 .svelte.ts 导出的 $state 对象或 context，用户相关的状态不放模块顶层，避免服务端不同请求之间串数据；组件 style 默认只作用于本组件，全局样式用 :global() 或 app.css，令牌用 CSS 变量。
- 命令和升级：dev（vite dev）、build（vite build）、preview、check（svelte-kit sync && svelte-check）、test（vitest）、test:e2e（playwright）、lint。2.x 项目先升到最新 2.x 处理掉弃用警告，再运行 npx sv migrate sveltekit-3，然后逐项核对上面几条；远程函数（remote functions）仍是实验特性，要显式开启。

## 提示词

请按约定整理{产品}的 SvelteKit 项目（SvelteKit 3 + Svelte 5）。先读 package.json、src/routes 和 hooks，列出：仍用 export let、on:click、slot、$: 的组件，$lib 和 $app/stores 的引用，在 onMount 里拉首屏数据的页面，客户端引用服务端代码处。
2.x 项目先单独升级：升到最新 2.x 清掉弃用警告，再跑 npx sv migrate sveltekit-3。
约定：
1. 组件用 runes，事件写 onclick，插槽改 snippet；$effect 只做外部同步。
2. 引用改为 #lib 并写扩展名，页面信息从 $app/state 读。
3. 首屏数据放进 load，涉及数据库或密钥的放 +page.server.ts。
4. 写操作用表单 actions 加 use:enhance，校验失败用 fail 返回字段错误。
5. 登录态在 hooks.server.ts 解析进 event.locals，受保护分组在 +layout.server.ts 检查。
6. 服务端代码放 server 目录；跨组件状态用 .svelte.ts 里的 $state。
完成后汇报改动的文件；验证：svelte-check 无错误，禁用 JS 时表单能提交，构建通过。
