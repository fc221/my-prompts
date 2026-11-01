---
zh: 接口类型生成
en: Generated API types
aka: OpenAPI openapi-typescript openapi-fetch orval Hey API GraphQL Codegen 类型生成 代码生成
order: 20
---

## 是什么

前端请求参数和返回值的类型由后端契约（OpenAPI、GraphQL Schema）自动生成，而不是照着文档手写；契约一变就重新生成，类型检查直接指出要改的调用处。

## 适合

后端能导出 OpenAPI 或 GraphQL Schema；接口多、改得勤；出现过后端改了字段名前端没跟上的线上问题。

## 不适合

后端还没有契约，先推动「契约优先」；同仓库全栈 TypeScript 项目可以直接共享类型，或用 tRPC 这类端到端类型方案；对外发布的 SDK 看「SDK 与客户端生成」。

## 注意

生成的文件只描述“接口长什么样”，每次生成都会被覆盖，所以不手改。界面需要的形状（金额分转元、时间字符串转日期）在请求层或查询的 select 里转换。

## 要点

- 按需选工具：只要类型，用 openapi-typescript 生成 paths 类型，配 openapi-fetch 发类型安全的请求；要连请求函数和 TanStack Query、SWR、Vue Query 的 hook 一起生成，用 orval 或 Hey API（@hey-api/openapi-ts）；GraphQL 用 GraphQL Code Generator。一个项目只用一种。
- 生成到固定目录 src/api/generated/，文件头写“自动生成，勿手改”，并加入 ESLint 和格式化工具的忽略列表。
- 契约来源固定：从后端仓库或部署环境的 /openapi.json 拉取，契约文件本身提交进仓库，接口变化能在 diff 里看到；生成命令写成 npm run gen:api。
- CI 里重新生成并比对，有差异就失败，防止改了契约没生成或手改了生成文件。
- 业务代码只从 src/api/types.ts 引用类型别名（Order、OrderStatus），不深引生成目录；手写类型只有两种：前端独有的视图模型（OrderRow），以及对生成类型的 Pick、Omit 等收窄。
- 后端枚举生成为字面量联合类型；界面文案用 Record<OrderStatus, string> 映射，后端新增枚举值时类型检查会提示缺文案。
- 类型只在编译期有效：金额、支付这类关键接口或不稳定的第三方接口，在请求层用 Zod 等 schema 校验响应，失败按接口错误处理并上报（orval 和 Hey API 都能生成 Zod schema）。

## 提示词

为 {产品} 前端接入接口类型生成：
1. 确认契约来源：后端是否提供 {OpenAPI / GraphQL} 文件或地址；没有就列出现在手写的接口类型文件，停下来告诉我。
2. 看项目已用的请求层和缓存层，选生成方式：只生成类型（openapi-typescript + openapi-fetch），或连同请求函数和 hook 一起生成（orval / Hey API），说明理由，等我确认。
3. 生成到 src/api/generated/，加 npm run gen:api 脚本，生成目录加入 lint 和格式化忽略；在 src/api/types.ts 导出常用类型别名。
4. 把手写的接口类型逐个替换为生成类型，修好类型检查报出的所有调用处；对不上的字段列成清单（可能是前端写错，也可能是契约过时），保留真实类型，不用 any 糊过去。
5. 在 CI 加“重新生成后没有差异”的检查。汇报替换了哪些类型、发现了哪些不一致。

## 示例

<link rel="stylesheet" href="../../_shared/diagram.css">

<script type="module">
import { draw, flow } from '../../_shared/diagram.ts';
export default function demo(root) {
  draw(root, flow([
    [{ t: 'openapi.json', note: '契约提交进仓库' }, { t: 'generated/', note: '自动生成，勿手改', via: 'gen:api', acc: true }, { t: 'types.ts', note: 'Order、OrderStatus' }, { t: '业务代码', note: '只引 types.ts' }],
    [{ t: '后端改字段名' }, { t: '重新生成', note: '契约 diff 可见' }, { t: '类型检查报错', note: '指出要改的调用处', bad: true }, { t: 'CI 比对', note: '没生成或手改就失败' }],
  ]), { title: '接口类型生成 · 契约一变就重新生成' });
}
</script>
