---
zh: ASP.NET Core 项目约定
en: ASP.NET Core conventions
aka: .NET Web API Minimal API Controller C# EF Core
order: 30
---

## 是什么

ASP.NET Core（以 .NET 10 LTS 为准，和 .NET 8 不同的地方在要点里注明）Web API 的约定：Program.cs 注册服务和中间件，业务按功能分文件夹；端点用 Minimal API（MapGroup 分组）或 [ApiController] 控制器，一个项目选定一种；配置用 Options 模式，数据库用 EF Core 迁移，错误统一输出 ProblemDetails。

## 适合

.NET 团队做业务 API；从 .NET Framework 或老 MVC 项目迁过来，想对齐新写法；在 Minimal API 和 Controller 之间做选择。

## 不适合

服务端渲染页面用 Razor Pages 或 Blazor，这条只讲 API。

## 注意

服务生命周期别配错：DbContext 是 Scoped，不能注入到 Singleton 里（IExceptionHandler、BackgroundService 都是单例，要用 IServiceScopeFactory 自己建作用域）。异步一路到底，不用 .Result 和 .Wait() 把异步变同步，高并发下会耗尽线程池。

## 要点

- 目录：Program.cs（注册服务、中间件顺序、映射端点）；Features/Orders/ 下放 OrderEndpoints.cs（Minimal API）或 OrdersController.cs，加上 OrderService.cs、CreateOrderRequest.cs、OrderResponse.cs；Data/AppDbContext.cs 和 Data/Migrations/；appsettings.json、appsettings.Development.json；测试放单独的 tests/Mall.Api.Tests 项目。
- 两种写法：Minimal API 用 app.MapGroup("/api/orders") 分组，每个功能写一个 MapOrderEndpoints 扩展方法注册，处理函数返回 TypedResults，签名写 Results<Ok<OrderResponse>, NotFound>，让 OpenAPI 推断出响应；Controller 写法用 [ApiController] 加 [Route("api/orders")]，继承 ControllerBase。新项目选 Minimal API；已有大量 Controller、依赖过滤器和模型绑定扩展的继续用 Controller。OpenAPI 文档用内置的 AddOpenApi 和 MapOpenApi 生成，.NET 10 默认输出 OpenAPI 3.1。
- 依赖注入：用内置容器，如 builder.Services.AddScoped<OrderService>()，有多实现或要替换时才抽接口；每个功能写一个 AddOrders() 扩展方法收拢注册；HTTP 调用用 AddHttpClient 注册类型化客户端，不手动 new HttpClient。
- 配置：appsettings.json 放默认值，appsettings.Production.json 这类环境文件覆盖，ASPNETCORE_ENVIRONMENT 切换环境；环境变量用双下划线覆盖嵌套键（ConnectionStrings__Default）；本地密钥用 dotnet user-secrets；强类型配置用 AddOptions<OrderOptions>().BindConfiguration("Order").ValidateDataAnnotations().ValidateOnStart()，再注入 IOptions<OrderOptions>。
- 校验：Controller 带 [ApiController] 时，DataAnnotations 校验失败自动返回 400 ValidationProblemDetails；Minimal API 从 .NET 10 起调用 builder.Services.AddValidation() 获得同样的自动校验，.NET 8、9 用 FluentValidation 或端点过滤器。
- 错误：builder.Services.AddProblemDetails() 加 AddExceptionHandler<AppExceptionHandler>()，管道最前面调 app.UseExceptionHandler()（不调用它，IExceptionHandler 不会执行）；IExceptionHandler 把业务异常映射成状态码和错误码，其余返回 500；异常详情只在 Development 环境显示。
- 数据库：EF Core 用 AddDbContext 注册；dotnet ef migrations add AddOrderRemark 生成迁移，上线用 dotnet ef migrations script --idempotent 或 migrations bundle 在部署步骤里执行，不让多个实例在启动时各自调用 Database.Migrate()；只读查询加 AsNoTracking()。
- 日志、测试和命令：注入 ILogger<OrderService>，消息模板用命名占位记录 OrderId 这类字段，不用字符串插值；xUnit 写单测，接口测试用 Microsoft.AspNetCore.Mvc.Testing 的 WebApplicationFactory<Program> 起内存服务（.NET 10 起不必再在 Program.cs 末尾声明 public partial class Program）；常用 dotnet new webapi、dotnet run、dotnet watch、dotnet test、dotnet ef database update。

## 提示词

在{项目}（ASP.NET Core，端点写法：{Minimal API / Controller}）里{新建业务功能 / 检查现有代码并纠正}，业务：{模块}（如订单、门店、会员）。
先读 .csproj 的目标框架、Program.cs 的服务注册和中间件顺序、一个现有功能，确认 .NET 版本、端点写法、校验方式和错误格式，沿用已有选择，同一项目不混用两种端点写法。按这些约定做：
{{要点}}

新建时：在 Features/ 下建 {模块} 文件夹，写请求和响应类型、服务、端点或控制器、DbContext 映射和迁移，用 WebApplicationFactory 写覆盖 201、400、404 的接口测试。
检查时：先找生命周期错配、.Result 或 .Wait()、手动 new HttpClient、每个端点各自 try-catch、启动时自动迁移；逐条列出文件和改法，会改变响应的先问我。
最后列出改动的文件和验证命令（dotnet build、dotnet test）。
