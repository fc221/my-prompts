---
zh: 生成 OpenAPI 契约
en: Generate an OpenAPI contract
aka: OpenAPI 3.1 Swagger 接口契约 接口文档生成 schema
order: 30
---

## 是什么

让 AI 根据接口清单或现有代码生成 OpenAPI 3.1 契约文件：路径、参数、请求体、响应结构、每个响应的示例，以及按 RFC 9457 写的错误响应。

## 适合

接口清单定好后出机器可读的契约，用来生成前端类型、SDK 和 mock；给老项目补文档。

## 不适合

契约先行的流程和流水线检查看「契约优先」；文档站和示例怎么组织看「接口文档与示例」；前端怎么用契约生成类型看「接口类型生成」。

## 要点

- OpenAPI 3.1 的 schema 就是 JSON Schema 2020-12：可空字段写成 type 数组里加 null，nullable 已经去掉；schema 里的示例用 examples 数组。
- 生成后用 OpenAPI 校验工具跑一遍，把报错贴回去让它改。
- 从代码反推时以运行时为准：拿几个真实响应和 schema 对一遍。

## 提示词

为{服务名}生成 OpenAPI 3.1 契约，依据：{接口清单 / 现有代码目录}。先读项目里已有的契约文件、路由和 DTO，已有约定就沿用。
1. openapi 写 3.1.1；servers 写 {环境地址}；按资源分 tags。
2. 每个 API：operationId（如 listOrders、cancelOrder）、summary、参数（类型、范围、默认值）、请求体和全部可能的响应。
3. Schema 放 components/schemas 复用；可空字段写成 type 数组加 null；时刻用 format: date-time；金额和 ID 在 description 里写单位和格式；枚举列全，只读字段标 readOnly。
4. components 里定义 Problem（type、title、status、detail、instance、code、traceId、errors），错误响应用 application/problem+json 引用，按实际列出 400、401、403、404、409、422、429。
5. 请求体、2xx 和主要 4xx 响应都带贴近业务的 examples，不同场景各给一个。
6. 写出用到的请求头 Idempotency-Key、If-Match 和响应头 ETag、Location、Retry-After；securitySchemes 定义认证方式，每个 API 写 security。
7. 用 OpenAPI 校验工具检查并修到没有错误。
最后输出契约文件路径，以及契约和代码不一致的地方。
