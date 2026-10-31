---
zh: 契约优先
en: Contract-first API
aka: contract first API first openapi.yaml 契约测试 mock 兼容性检查
order: 10
---

## 是什么

先写 OpenAPI 契约、评审通过再写代码，契约是前后端、测试和文档共同的依据。契约文件进仓库，改接口就是改契约，CI 负责检查兼容性、检查实现和契约是否一致。

## 适合

前后端并行开发，前端要先对着 mock 开工；多个团队或外部合作方依赖同一组 API；接口经常被改坏、文档和实现对不上。

## 不适合

一次性的内部脚本和原型；gRPC 和 GraphQL 有各自的 schema 文件，思路相同、工具不同，见「gRPC 与 Protobuf」「GraphQL Schema 设计」。从需求写出契约的整段提示词见「生成 OpenAPI 契约」。

## 注意

契约和实现之间必须有自动检查，否则几周后契约就成了又一份过期文档。用代码注解生成契约的项目也可以走这套流程，但生成出来的文件同样要提交进仓库，PR 里才看得到差异。

## 要点

- 文件位置固定：api/openapi.yaml（OpenAPI 3.1），大了按资源拆到 api/paths/ 和 api/schemas/，用 $ref 引用；每次改动走 PR 评审，前后端各至少一人通过。
- 公共部分放 components 复用：错误响应、分页参数、通用请求头全部引用同一份定义。
- 每个 operation 写 operationId（动词加资源，如 listOrders、cancelOrder）、tags、security，每个状态码都有响应 schema 和至少一个 example。
- CI 第一步 lint：Spectral 或 Redocly CLI 加团队规则（路径小写加连字符、字段大小写统一、必须有 example），不通过不能合并。
- CI 第二步兼容性：用 oasdiff 和主分支对比，删接口、删响应字段、新增必填参数、改字段类型都算破坏性变更，要按「版本管理」处理才放行，判断标准见「向后兼容规则」。
- 契约合并后自动起 mock 服务（如 Prism），按 example 返回，前端和测试直接对着它开发。
- 实现对齐契约：集成测试里按契约 schema 校验真实响应，或用 Schemathesis 按契约生成请求做测试；服务端和客户端的类型都从契约生成，不手写。

## 提示词

把{服务}改为契约优先。先盘点现状：有没有 OpenAPI 文件、放在哪里、是手写还是由代码注解生成、和实际实现差多少（抽查 {抽查数量} 个接口，对比路径、参数、响应字段和状态码）。
按以下步骤改：
1. 契约放到 api/openapi.yaml（OpenAPI 3.1）；和实现对不上的地方，以线上实际行为为准修正契约，差异列表先给我确认。
2. 错误响应、分页参数、通用请求头抽到 components 复用；每个 operation 补齐 operationId、tags、security 和 example。
3. CI 加 lint（Spectral 或 Redocly CLI）和对主分支的 oasdiff 破坏性变更检查，任一失败都阻止合并。
4. 加一条启动契约 mock 服务的命令，写进 README。
5. 集成测试里按契约校验真实响应；服务端和 {客户端语言} 客户端的类型改为从契约生成。
最后说明改了哪些文件，并故意删掉一个响应字段，证明 CI 会拦住。
