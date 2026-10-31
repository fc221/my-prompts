---
zh: 多包仓库
en: Monorepo
aka: monorepo pnpm workspace Turborepo Nx 工作区 共享包
order: 30
---

## 是什么

把多个应用（官网、后台、H5）和共享包（组件库、工具函数、接口类型、公共配置）放进同一个仓库，用包管理器的工作区互相引用，用任务编排工具按依赖顺序构建、测试，并缓存结果。

## 适合

多个前端应用共用组件和类型；前后端共用接口类型或校验规则；改一个共享包要同时验证所有使用方。

## 不适合

只有一个应用时按「目录结构」分目录即可；团队完全独立、发布互不相关时用多个仓库加私有 npm 源；要在运行时独立部署、独立加载的看「微前端」。

## 注意

共享包被所有应用依赖，一次改动影响面最大。共享包要有自己的测试和类型检查；CI 可以只跑受影响的应用，但受影响的必须跑全。

## 要点

- 目录：apps/ 放可部署的应用（web、admin、h5），packages/ 放共享包（ui、utils、api-types、eslint-config、tsconfig），根目录放 pnpm-workspace.yaml、根 package.json 和任务编排配置。
- 工作区：pnpm workspace，内部依赖写 workspace:*；根目录只有一份锁文件；用 package.json 的 packageManager 字段和 .nvmrc 锁定包管理器和 Node 版本。
- 任务编排用 Turborepo 或 Nx：声明 build、lint、test、typecheck 的上下游依赖和输出目录，开启本地缓存（团队共享时再开远程缓存）；CI 用 --filter 或 affected 只跑受改动影响的包。
- 包名统一作用域（如 @mall/ui、@mall/utils），每个包写 exports 字段；应用只能按包名引用，不能用相对路径跨包读 ../../packages/ui/src。
- 共享包分两类：只在仓库内部用的直接导出 TypeScript 源码，由使用方的构建工具编译；要发布到 npm 的单独构建出 ESM 和类型声明，并用 changesets 管版本和变更记录。
- 公共配置抽成包：packages/tsconfig 提供 base、react、node 等基础配置，packages/eslint-config 提供共享规则，各应用继承后只写差异。
- 依赖单向：apps 可以依赖 packages，packages 不依赖 apps；packages 之间的依赖也保持单向，用「模块边界与依赖方向」里的检查拦截。

## 提示词

请把{产品}整理成多包仓库（已经是的就按约定整理）。先读现状：有哪些应用和共享代码、包管理器和 Node 版本、现有的构建和 CI 脚本、应用之间是复制代码还是互相引用。
目标：
1. apps/ 放可部署的应用，packages/ 放共享包（ui、utils、api-types、eslint-config、tsconfig）。
2. 用 pnpm workspace，内部依赖写 workspace:*，根目录一份锁文件，用 packageManager 字段锁定包管理器版本。
3. 用{编排工具}声明 build、lint、test、typecheck 的依赖关系和输出目录，开启缓存，CI 只跑受影响的包。
4. 包名统一用 @{作用域}/ 前缀，每个包写 exports，跨包只按包名引用。
5. 共享的 tsconfig 和 eslint 配置抽成包，应用继承。
6. packages 不依赖 apps。
分步迁移，每一步完成后所有应用都能本地启动和构建。
完成后汇报新的目录树和改了哪些文件；验证：全量构建通过，改一个共享包只触发依赖它的应用重新构建，未改动时第二次构建命中缓存。

## 示例

<link rel="stylesheet" href="../../_shared/diagram.css">

<script type="module">
import { draw, tree } from '../../_shared/diagram.ts';
export default function demo(root) {
  draw(root, tree(`
* apps/                 可部署的应用
    web/                官网
    admin/              后台
    h5/
* packages/             共享包，apps 可依赖，反过来不行
    ui/                 @mall/ui，写 exports 字段
    utils/              @mall/utils
    api-types/          前后端共用的接口类型
    eslint-config/      共享规则，应用只写差异
    tsconfig/           base、react、node
  pnpm-workspace.yaml   内部依赖写 workspace:*
  package.json          packageManager 锁定版本
  turbo.json            任务上下游、输出目录、缓存
`), { title: 'pnpm workspace + Turborepo' });
}
</script>
