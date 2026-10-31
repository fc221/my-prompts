---
zh: NestJS 项目约定
en: NestJS project conventions
aka: Nest 项目结构 Module Provider ValidationPipe 装饰器
order: 10
---

## 是什么

NestJS（以 12 为准）服务的约定：一个业务一个 Module，Module 里是 Controller、Service 和 DTO；依赖用构造函数注入，并在 Module 的 providers 里声明；全局 ValidationPipe 校验 DTO，异常用内置 HttpException 加全局过滤器统一格式。

## 适合

TypeScript 团队做中大型 API，需要清楚的模块边界和依赖注入；Express 项目越写越乱，想要一套固定结构；规范 AI 生成的 Nest 代码。

## 不适合

只有几个 API 的小服务、网关和函数，用「Express / Fastify 项目约定」更轻；团队不熟装饰器和依赖注入时也先看那条。

## 注意

模块之间只通过 exports 暴露 Service，别的模块 imports 这个 Module 后再注入。出现循环依赖时，把双方共同依赖的部分拆成第三个模块；forwardRef 只是把问题藏起来。AppModule 只负责 imports 各业务模块，不在里面堆 provider。

## 要点

- 目录：src/main.ts（创建应用、注册全局管道和过滤器、监听端口）、src/app.module.ts；业务模块 src/orders/ 下放 orders.module.ts、orders.controller.ts、orders.service.ts、dto/create-order.dto.ts、dto/update-order.dto.ts、entities/order.entity.ts 和 orders.service.spec.ts；src/common/ 放过滤器、拦截器、守卫和自定义装饰器；test/ 放 e2e 测试。骨架用 nest g resource orders 生成。
- 依赖注入：Service 加 @Injectable()，在所属 Module 的 providers 里声明，Controller 用 constructor(private readonly ordersService: OrdersService) 注入；默认单例，Scope.REQUEST 会让整条依赖链每个请求重建一次，只在必须按请求隔离时用；第三方客户端用自定义 provider（useFactory 加注入令牌）注册，方便测试时替换。
- 配置：ConfigModule.forRoot 设 isGlobal，并用 validationSchema 或 validate 函数在启动时校验环境变量；按功能用 registerAs 分组（database、redis），通过 ConfigService 读取，业务代码不直接读 process.env；用 Joi v18 以上校验时，Joi 自身的选项放进 validationOptions.libraryOptions。
- 校验：DTO 写成 class，用 class-validator 装饰器（IsString、IsInt、Min、IsEnum）；main.ts 里全局 ValidationPipe 打开 whitelist、forbidNonWhitelisted 和 transform；更新 DTO 用 PartialType(CreateOrderDto) 生成；路径参数用 ParseIntPipe、ParseUUIDPipe 转换；校验规则已经用 zod 这类支持 Standard Schema 的库写的，改用 Nest 12 新增的 StandardSchemaValidationPipe，全项目只选一种。
- 错误：Service 抛 NotFoundException、ConflictException 这类内置异常，或继承 HttpException 的业务异常；一个全局 ExceptionFilter（@Catch() 不带参数）统一输出错误码、消息和请求 ID，未知异常返回 500 并记日志；Controller 里不写 try-catch 拼响应。
- 数据库：TypeORM、Prisma、MikroORM、Drizzle 全项目只用一个；TypeORM 关闭 synchronize，用 migration:generate 和 migration:run；Prisma 开发用 prisma migrate dev，上线用 prisma migrate deploy；数据库访问只出现在 Service 或单独的 Repository provider 里。
- 日志：用内置 Logger（private readonly logger = new Logger(OrdersService.name)），或接入 nestjs-pino 输出 JSON；用拦截器记录每个请求的耗时；不用 console.log。
- 测试和命令：单测用 Test.createTestingModule，配合 overrideProvider 或 useValue 换掉依赖；e2e 用 supertest 请求 app.getHttpServer()；Nest 12 的 nest new 让你选 ESM（默认，配 Vitest）或 CommonJS（配 Jest），两种都默认用 oxlint。常用 npm run start:dev、npm run build、npm run test、npm run test:e2e。Nest 12 的包只发布 ESM，CommonJS 项目照常可用，但运行要 Node 20.19+ 或 22.12+；nest new、nest g 这些生成命令要 Node 22.22.3+ 或 24.15+。

## 提示词

在{服务名}（NestJS）里{新建业务模块 / 检查现有代码并纠正}，业务：{模块}（如订单、门店、会员）。
先读 package.json（Nest 版本、ORM、测试框架、ESM 还是 CommonJS）、main.ts、app.module.ts 和一个现有模块，确认全局管道、过滤器和错误格式，沿用已有选择。按这些约定做：
{{要点}}

新建时：用 nest g resource 生成骨架，再按约定补齐 DTO 校验、Service 业务、实体和迁移，在 AppModule 里 imports 新模块，写 Service 单测和覆盖 201、400、404 的 e2e 测试。
检查时：先画出模块依赖关系，标出循环依赖、跨模块直接用别人的 Repository、DTO 没有校验、直接读 process.env、Controller 里 try-catch 的位置；逐条给出改法，会改变对外响应的先问我。
最后列出改动的文件和验证命令。
