---
zh: Astro 内容站
en: Astro content sites
aka: Astro 6 内容集合 Content Collections 孤岛 静态站 文档站 博客
order: 80
---

## 是什么

用 Astro 做官网、文档、博客、活动页这类内容站的约定：页面默认输出不带 JS 的 HTML，内容用内容集合加类型校验管理，只给需要交互的组件水合。以 Astro 6 为准：旧版内容集合 API 已移除，集合统一用 Astro 5 引入的内容层（加载器）写法，schema 用 Zod 4。

## 适合

内容为主、对首屏速度和收录要求高的站点；用 Markdown / MDX 写作的文档和博客；营销页里只有少量交互（搜索、表单、轮播）。

## 不适合

登录后交互密集的后台用「React 项目约定」或「Vue 3 项目约定」；交互多又要服务端渲染的业务站看「Next.js 项目约定」「Nuxt 项目约定」。

## 注意

.astro 组件的前置脚本只在服务端或构建时运行，写在里面的点击处理不会生效。需要交互时要么写原生 script 标签，要么用 React / Vue / Svelte 组件并加 client:* 指令；没加指令的框架组件只输出静态 HTML，这是 Astro 项目里“点了没反应”最常见的原因。

## 要点

- 目录：src/pages（文件路由，.astro、.md、.mdx，以及 .ts 写的接口端点）、src/layouts（页面外壳，BaseLayout.astro 负责 head 和 SEO 元信息）、src/components（.astro 静态组件和框架交互组件）、src/content.config.ts（集合定义）、src/content/<集合名> 或 src/data（内容文件）、src/assets（需要优化的图片）、src/styles、public/（原样输出：favicon、robots.txt）。
- 内容集合：在 src/content.config.ts 用 defineCollection 配 glob() 或 file() 加载器，schema 用从 astro/zod 引入的 z 定义 title、description（不超过 160 字）、pubDate、draft、cover；页面用 getCollection / getEntry 读取并过滤 draft，用 render() 渲染正文。
- 动态路由：src/pages/blog/[...slug].astro 用 getStaticPaths 从集合生成，列表分页用 paginate()。
- 交互：首屏要立刻用的用 client:load，其余用 client:idle 或 client:visible，完全不能在服务端渲染的用 client:only；每个页面水合的组件越少越好，见「水合与孤岛」。
- 动态内容：默认整站静态；个别页面要按请求渲染时安装 adapter，并在该页 export const prerender = false；静态页里的少量个性化内容用服务端孤岛（server:defer）并提供 fallback 占位。
- 图片和 SEO：图片用 astro:assets 的 Image / Picture 组件，自动输出宽高和多尺寸；每页有唯一的 title、description、canonical 和 Open Graph；用 @astrojs/sitemap 生成站点地图。
- 表单和配置：提交用 Astro Actions（src/actions/index.ts，defineAction 配 zod 校验）或直接提交到外部接口；环境变量用 astro:env 声明类型和公开范围。
- 命令：dev（astro dev）、build（astro build）、preview、check（astro check，检查类型和内容 schema）；Vitest 测工具函数，Playwright 测页面。

## 提示词

请按约定搭建或整理{产品}的 Astro 内容站（以 Astro 6 为准）。先读 astro.config、package.json、src 目录树、内容文件和带 client:* 指令的组件，列出：Astro 版本、内容是否已用 src/content.config.ts 加加载器的写法、每个页面水合了哪些组件、缺 title / description / canonical 的页面。
约定：
1. 内容进集合：用 glob() 加载器和 zod schema 定义 title、description、pubDate、draft、cover，校验不通过时构建失败。
2. 列表页和详情页从集合生成，详情页用 getStaticPaths，过滤 draft。
3. 默认零 JS：只有{交互组件}这类确实需要交互的组件加 client:*，首屏以下用 client:visible。
4. 图片改用 astro:assets 的 Image 组件，补齐每页 SEO 元信息和站点地图。
5. 需要按请求渲染的页面单独关闭预渲染，其余保持静态。
6. 提供 dev、build、preview、check 命令。
完成后汇报改了哪些文件、改前改后每个页面的 JS 体积；验证：astro check 通过，构建产物里纯内容页面不带多余脚本，故意删掉一篇内容的 title 时构建报错。
