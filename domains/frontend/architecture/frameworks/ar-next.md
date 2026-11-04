---
zh: Next.js 项目约定
en: Next.js project conventions
aka: Next.js 16 App Router 服务端组件 Server Components Server Actions RSC
order: 40
---

## 是什么

Next.js App Router 项目的目录、路由文件、服务端组件和客户端组件的分工、数据获取和缓存、测试和构建约定，以 Next.js 16 为准。

## 适合

新建要收录又有交互的站点（电商、社区、官网加控制台）；从 Pages Router 迁到 App Router；整理满屏 'use client' 的项目。

## 不适合

纯后台单页应用用「React 项目约定」更简单；纯内容站用「Astro 内容站」。

## 注意

app/ 下的组件默认是服务端组件，只有需要状态、事件或浏览器 API 的才加 'use client'，并且加在尽量小的叶子组件上。Next.js 16 起 params、searchParams、cookies()、headers() 只能用 await 异步读取；middleware 改名为 proxy，文件是 proxy.ts，导出函数也叫 proxy。

## 要点

- 目录：src/app 是框架的路由目录，同时承担「目录结构」里 src/app（根布局里的 provider）和 src/pages（页面组装）两层；用路由组 (marketing)、(dashboard) 区分不同外壳；app 下的 api/.../route.ts 只给外部调用和 webhook。其余照通用结构放 src/features/<领域>、src/components/ui、src/api、src/stores、src/lib；服务端专用的数据访问放 src/server（或 src/features/<领域>/server），文件顶部 import 'server-only'。public/、next.config.ts 和 .env 文件留在项目根目录。
- 路由文件：每段按需放 page.tsx、layout.tsx、loading.tsx、error.tsx、not-found.tsx，根目录放 global-error.tsx；动态段 [id]、全匹配 [...slug]；只给本路由用的组件放在该段下的 _components（下划线开头的文件夹不参与路由）。
- 读数据：在服务端组件里直接 await 数据层函数，服务端组件调用自家 /api 路由属于多绕一圈；相互独立的请求用 Promise.all 并行；慢的部分包进 Suspense 流式输出。
- 写数据：用 Server Actions（'use server'，放在 src/features/<领域>/actions.ts）；action 内重新校验输入（zod）和权限；成功后用 updateTag（用户要立即看到自己的改动）、revalidateTag(标签, 'max') 或 revalidatePath 刷新；字段错误通过 useActionState 回到表单。
- 缓存：Next.js 15 起 fetch 默认不缓存，要缓存的数据显式声明。开启 cacheComponents 时用 'use cache' 配 cacheLife、cacheTag；未开启时用 fetch 的 next.revalidate、next.tags 或路由段配置。
- 客户端状态：客户端组件里需要缓存的服务端数据可以用 TanStack Query；筛选和分页优先放 URL，见「状态放进 URL」；跨客户端组件的少量状态用 Context 或 Zustand，provider 放在布局里的客户端组件中。
- 样式和资源：Tailwind CSS 或 CSS Modules；字体用 next/font，图片用 next/image 并写宽高。
- 命令：dev（next dev，16 起默认 Turbopack）、build（next build）、start、lint（直接运行 eslint，16 已移除 next lint）、typecheck（tsc --noEmit）、test（Vitest 测纯函数和客户端组件）、test:e2e（Playwright，异步服务端组件靠它覆盖）。

## 提示词

请按约定整理{产品}的 Next.js 项目（App Router，以 Next.js 16 为准）。先读 package.json、next.config、app 目录树和数据请求代码，列出：版本、仍在 Pages Router 的页面、标了 'use client' 的布局和页面、请求自家 /api 的服务端组件、串行的 await、同步读取 params 或 cookies 的地方。
约定：
1. 'use client' 下推到需要交互的叶子组件。
2. 服务端组件直接调用数据层函数，独立请求并行，慢的部分包 Suspense；服务端模块加 import 'server-only'。
3. 写操作改成 Server Actions：action 内用 zod 校验并检查权限，成功后按标签或路径刷新缓存，字段错误用 useActionState 显示。
4. 要缓存的数据显式声明时长和标签。
5. 路由段按需补 loading、error、not-found。
6. params、searchParams、cookies、headers 一律 await；middleware 改为 proxy；lint 直接用 eslint。
按路由逐段改，每段改完跑 build 和端到端测试。
完成后汇报改了哪些文件、客户端 JS 体积变化，以及 build 输出里每个路由是静态还是动态。

## 示例

<link rel="stylesheet" href="../../_shared/diagram.css">

<script type="module">
import { draw, tree } from '../../_shared/diagram.ts';
export default function demo(root) {
  draw(root, tree(`
src/
* app/                  路由目录，默认服务端组件
    layout.tsx          根布局
*   (dashboard)/        路由组，不影响 URL
      orders/
        page.tsx        直接 await 数据层函数
        loading.tsx     error.tsx、not-found.tsx 同级
        [id]/           动态段
        _components/    下划线开头，不参与路由
    api/.../route.ts    只给外部调用和 webhook
  features/orders/      actions.ts 写 'use server'
  server/               顶部 import 'server-only'
  proxy.ts              原 middleware，16 起改名
next.config.ts          和 public/、.env 留在根目录
`), { title: 'Next.js 16 · App Router' });
}
</script>
