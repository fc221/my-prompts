---
zh: Laravel 项目约定
en: Laravel project conventions
aka: Laravel 项目结构 Eloquent Artisan Form Request API Resource PHP
order: 10
---

## 是什么

Laravel（以 13 为准，要求 PHP 8.3+，沿用 11 起的精简骨架）项目的约定：控制器保持薄，入参用 Form Request 校验，业务放进 Action 或 Service 类，响应用 API Resource 包装，依赖靠服务容器自动注入，表结构走 database/migrations。

## 适合

PHP 团队做业务后台、电商、内容和 SaaS；老 Laravel 项目控制器几百行要拆；让 AI 按新版骨架写代码（已经没有 Http/Kernel.php 和 Exceptions/Handler.php）。

## 不适合

高并发长连接（推送、IM）交给单独的服务承担，选什么看「后端语言与框架怎么选」。

## 注意

env() 只在 config/ 下的配置文件里调用，业务代码一律用 config()。执行 php artisan config:cache 之后不再加载 .env，业务代码里的 env() 会返回 null，本地正常、上线出错。

## 要点

- 目录：app/Http/Controllers/Api/OrderController.php、app/Http/Requests/StoreOrderRequest.php、app/Http/Resources/OrderResource.php、app/Models/Order.php、app/Actions/CreateOrder.php（或 app/Services/OrderService.php）、app/Policies/OrderPolicy.php；routes/api.php 由 php artisan install:api 生成，默认带 /api 前缀；database/ 下的 migrations、factories、seeders；tests/Feature、tests/Unit。
- 依赖注入：服务容器按类型提示自动解析构造函数和控制器方法的参数，具体类不用注册；接口到实现的绑定写在 AppServiceProvider 的 register() 里（bind 或 singleton）；业务代码里不 new 依赖，也不到处调用 app() 取服务。
- 引导配置：Laravel 11 起中间件和异常都在 bootstrap/app.php 里用 withMiddleware、withExceptions 配置；在 withExceptions 里把业务异常 render 成统一 JSON，并用 shouldRenderJsonWhen 让 api/* 路由总是返回 JSON；路由模型绑定找不到记录时自动 404。Laravel 13 起控制器可以用 #[Middleware]、#[Authorize] 属性声明中间件和授权，Job 用 #[Tries]、#[Backoff]、#[Timeout]，和在路由或类属性里配置的旧写法全项目选一种。
- 校验和响应：Form Request 的 rules() 写规则、authorize() 做权限判断，控制器里只用 $request->validated()；校验失败自动返回 422 和 errors；返回值用 OrderResource 或 OrderResource::collection 包装，不直接返回 Model。
- 模型和数据库：Model 用 $fillable 或 Laravel 13 的 #[Fillable] 属性声明可批量赋值的字段（#[Hidden]、#[Table] 同理），两种写法全项目选一种；类型转换写在 casts() 方法里；列表查询用 with() 预加载，在 AppServiceProvider 的 boot() 里对非生产环境开 Model::preventLazyLoading()，提前暴露 N+1；表结构用 make:migration 写，上线执行 php artisan migrate --force，已执行的迁移不再改。
- 配置和日志：.env 只放环境差异，提交 .env.example；配置项写在 config/*.php 里；日志用 Log facade，通道在 config/logging.php 配，按部署方式选 daily 文件或 stderr；队列任务写成 Job，定时任务写在 routes/console.php 的 Schedule 里。
- 测试：新项目默认 Pest（Laravel 13 对应 Pest 4、PHPUnit 12），接口测试放 tests/Feature，用 $this->postJson('/api/orders', ...) 配 assertCreated()、assertUnprocessable() 断言；数据库用 RefreshDatabase，测试数据用 Model Factory 造；外部调用用 Http::fake()、Queue::fake() 替换。
- 命令：composer run dev 或 php artisan serve、php artisan make:model Order -mfc（同时生成迁移、工厂和控制器）、make:request、make:resource、migrate、migrate:rollback、route:list、test、tinker；上线执行 php artisan optimize，缓存配置、路由和事件。

## 提示词

在{项目}（Laravel）里{新建业务模块 / 检查现有代码并纠正}，业务：{模块}（如订单、门店、会员）。
先读 composer.json（Laravel 和 PHP 版本、是否装了 Pest）、bootstrap/app.php、routes/api.php 和一个现有控制器，确认业务类放在 Actions 还是 Services、模型和控制器用类属性还是 PHP 属性（#[...]）声明配置、错误 JSON 的格式，沿用已有写法。按这些约定做：
{{要点}}

新建时：用 make:model -mfc、make:request、make:resource 生成骨架，补上 Action 或 Service、路由和 Policy，写覆盖 201、422、404、403 的 Feature 测试。
检查时：先找业务代码里的 env()、控制器里的校验和查询、直接返回 Model、没有预加载的列表、改过的已执行迁移；逐条列出文件和改法，会改变响应格式的先问我。
最后列出改动的文件和验证命令（php artisan test 等）。
