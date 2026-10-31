---
zh: Express / Fastify 项目约定
en: Express / Fastify conventions
aka: Express 5 Fastify 5 Node 后端 Node.js API 中间件
order: 20
---

## 是什么

用 Express 5 或 Fastify 5 写 Node.js API 时补上的结构约定：按功能分模块（routes、schema、service、repo），构建应用和监听端口分开，入参用 schema 校验，错误统一交给一个错误处理器。两个框架都不规定目录，这条把它定下来。

## 适合

中小型 API、BFF 和网关；Express 4 项目升级到 5；想要比 NestJS 更轻的结构；对吞吐敏感、想要内置 schema 校验和 pino 日志时选 Fastify。

## 不适合

模块多、团队大、需要依赖注入容器的服务看「NestJS 项目约定」；要不要给前端单独做一层看「前端专用后端（BFF）」。

## 注意

只有 Express 5 会把 async 处理函数里抛出的错误和被拒绝的 Promise 自动交给错误中间件，同样的代码在 Express 4 里会让请求一直挂着。升到 5 还要改三处：通配路由必须命名（写成 /*splat），可选参数改用花括号语法，没挂解析器时 req.body 是 undefined。

## 要点

- 目录：src/app.ts 导出 buildApp()，只注册插件、路由和错误处理，不监听端口；src/server.ts 调 buildApp() 后 listen，并处理 SIGTERM；业务模块 src/modules/orders/ 下放 orders.routes.ts、orders.schema.ts、orders.service.ts、orders.repo.ts、orders.test.ts；src/config.ts 读取并校验环境变量；src/lib/ 放数据库、日志这类共用代码。
- 依赖：service 用工厂函数接收依赖（如 createOrderService 接收 repo 和 logger），在 buildApp 里组装，测试时传假实现；Fastify 按插件封装模块，需要全局共享的 db、redis 用 fastify-plugin 包装后 decorate 到实例上，不用模块级单例。
- 配置：启动时用 zod 或 env-schema（Fastify 可用 @fastify/env）校验 process.env，得到类型完整的 config 对象，缺项直接退出；其余代码只 import config；本地 .env 用 Node 20.6+ 的 --env-file 或 dotenv 加载。
- 校验：Fastify 在路由 schema 里写 body、querystring、params 和 response 的 JSON Schema（v5 起必须是带 type 的完整 schema），配 TypeBox 或 Zod 类型提供器得到 TS 类型，response schema 还会过滤掉没声明的字段；Express 用 zod 写校验中间件处理 req.body、req.query、req.params，失败统一返回 400 加字段错误。
- 错误：定义 AppError（statusCode、code、message）；Express 在所有路由之后注册一个四参数错误中间件（err, req, res, next）统一输出，再加一个兜底 404；Fastify 用 setErrorHandler（error.validation 存在时转 400）和 setNotFoundHandler；未知错误一律 500，只记日志，不回传堆栈。
- 数据库：Prisma、Drizzle、Knex 选一个，迁移文件提交到仓库，在部署步骤里执行（prisma migrate deploy、drizzle-kit migrate、knex migrate:latest）；连接池随应用启动创建，关闭时释放（Fastify 用 onClose 钩子）。
- 日志：Fastify 自带 pino（创建实例时打开 logger，request.log 自动带请求 ID）；Express 用 pino-http 中间件；authorization 头、密码、手机号用 redact 脱敏；不用 console.log。
- 测试和命令：vitest 或 node:test 写单测；接口测试 Fastify 用 app.inject() 不占端口，Express 用 supertest(app)；常用 npm run dev（tsx watch 或 node --watch）、npm test、npm run build、npm run migrate。Express 5 要 Node 18+，Fastify 5 要 Node 20+。

## 提示词

在{服务名}（{Express 5 / Fastify 5}，TypeScript）里{新建业务模块 / 检查现有代码并纠正}，业务：{模块}（如订单、门店、会员）。
先读 package.json、应用入口、错误处理和一个现有路由文件，确认框架版本、校验库、ORM 和测试框架；已有的继续用，不再加同类库。按这些约定做：
{{要点}}

新建时：在 src/modules/ 下建 {模块} 目录，写 schema、repo、service、routes，在 buildApp 里注册，补上覆盖 201、400、404 的接口测试。
检查时：先确认构建应用和监听端口是否分开、有没有统一的错误处理、入参是否都经过 schema；还停在 Express 4 的，列出升级到 5 要改的路由和中间件。逐条列出位置和改法，会改变对外响应的先问我。
最后列出改动的文件和验证命令。
