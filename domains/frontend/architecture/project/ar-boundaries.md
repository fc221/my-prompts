---
zh: 模块边界与依赖方向
en: Module boundaries and dependency direction
aka: 依赖规则 循环依赖 分层 import 规则 公共出口 深路径引用
order: 20
---

## 是什么

规定目录之间谁能引用谁：依赖只能单向往下（页面 → 领域 → 通用），领域之间不互相引用，跨领域只走对方 index.ts 这个公共出口，并用 lint 规则在 CI 里自动拦截。目录名沿用「目录结构」。

## 适合

改一个功能牵动一片；出现循环依赖、热更新失灵或模块初始化顺序问题；准备拆多包或微前端之前先理清依赖。

## 不适合

目录先怎么分看「目录结构」；单个组件内部的层次看「组件分层」；包与包之间的版本和发布看「多包仓库」。

## 注意

只写在文档里的规则一定会被打破，必须用 lint 或依赖检查工具在 CI 里拦。老项目先把现有违规记成基线，只拦新增的，再逐步还债。

## 要点

- 依赖方向从上到下：src/app → src/pages → src/features/<领域> → src/stores → src/api → 基础层（src/components/ui、src/hooks 或 src/composables、src/lib、src/config）。每层只引用比自己低的层；基础组件不引用 features、stores、api。
- 领域之间不直接引用：两个领域都要用的接口类型从 src/api/types.ts 引用；与业务无关的组件和函数下沉到 src/components/ui 或 src/lib；需要联动时在页面层组合，或通过路由参数、事件传递。
- src/api 不读 store：令牌由登录态模块注入，401 通过回调交出去，见「请求层封装」和「登录态与令牌」。
- 每个领域用 index.ts 做唯一公共出口：外部从 '@/features/order' 引用，深入内部的路径（'@/features/order/components/...'）报错；index.ts 显式列出导出项，避免 export * 把内部实现和副作用一起带出去。
- 规则写成配置：eslint 的 no-restricted-imports 和 import/no-cycle，或 eslint-plugin-boundaries、dependency-cruiser；CI 中失败即阻断合并。
- 循环依赖为零：用 madge 或 dependency-cruiser 检测；解法是把公共部分下沉，或者反转依赖（传回调、通过参数注入）。
- 服务端专用代码（数据库、密钥、带私钥的第三方调用）放 server 目录或 *.server.ts，配置成客户端代码引用时构建报错。

## 提示词

请为{产品}建立模块边界规则并修复现有违规。先读目录结构和 import 关系（可以用 dependency-cruiser 或 madge 生成依赖图），列出：现有层级、领域清单、跨领域引用、深路径引用和循环依赖。
规则：
1. 依赖方向 app → pages → features → stores → api → 基础层（components/ui、hooks 或 composables、lib、config），只能引用更低的层。
2. 领域之间不直接引用：共用的接口类型从 src/api/types.ts 引用，通用组件和函数下沉到基础层，联动放到页面层组合。
3. 每个领域只通过 index.ts 对外导出，显式列出导出项，禁止深路径引用。
4. 服务端专用代码只能被服务端引用。
5. 把以上写成 lint 或依赖检查规则并加进 CI；已有违规先记为基线，只拦新增。
然后按影响从小到大修复现有违规，每修完一类跑一次类型检查和测试。
完成后汇报：规则配置文件、修掉的违规数量和剩余基线、改了哪些文件；故意写一个跨领域的深路径引用，确认 CI 会失败。
