---
zh: Go HTTP 服务约定
en: Go HTTP service conventions
aka: net/http ServeMux Gin 路由 中间件 优雅停机
order: 20
---

## 是什么

用 Go 写 HTTP API 的约定。Go 1.22 起标准库 ServeMux 支持按方法和路径参数匹配，多数服务不再需要第三方路由；已经在用 Gin 的项目按 Gin 的惯用写法统一。覆盖路由、中间件、解码和校验、错误响应、超时和优雅停机、测试。

## 适合

新建 Go API；在标准库和 Gin 之间做取舍；统一现有 handler 的绑定、校验和错误写法。

## 不适合

目录、分包和依赖组装看「Go 服务项目布局」；服务之间用 gRPC 调用时看「gRPC 与 Protobuf」。

## 注意

直接用 http.ListenAndServe 没有任何超时，慢客户端能把连接占满，要自己建 http.Server 并设超时。Gin 里绑定请求体用 ShouldBindJSON 自己处理错误；BindJSON 失败时会直接写 400 纯文本，之后再改状态码只会得到一条告警。

## 要点

- 标准库路由（go.mod 里的 go 版本不低于 1.22）：模式写成方法加路径，如 GET /orders/<id>（实际写法是用花括号包住参数名），handler 里用 r.PathValue("id") 取值；路径匹配但方法不对时自动返回 405 并带 Allow 头；每个业务包写一个 Routes(mux *http.ServeMux) 注册自己的路由，路径写全（/api/v1/orders），不为分组再引第三方路由。
- Gin：用 gin.New() 加自己挑的中间件（gin.Default() 自带 Logger 和 Recovery）；按 r.Group("/api/v1") 分组，路径参数写 :id，用 c.Param、c.Query 取值，c.JSON 输出；*gin.Context 不传进 service，只传 c.Request.Context() 和普通参数。同一个服务只用一套路由。
- 中间件：标准库写成 func(http.Handler) http.Handler 层层包裹，从外到内依次是恢复 panic、请求 ID、访问日志、超时、鉴权、业务 handler；Gin 用 r.Use 按同样顺序注册。
- 解码：请求体先用 http.MaxBytesReader 限制大小（如 1MB），再用 json.NewDecoder(r.Body) 并开 DisallowUnknownFields；Gin 用 ShouldBindJSON、ShouldBindQuery、ShouldBindUri。响应统一走一个 writeJSON(w, status, v) 辅助函数，设好 Content-Type。
- 校验：请求结构体用 go-playground/validator 的 validate 标签（Gin 的 binding 标签底层就是它）写 required、min、max、oneof 等规则，或者给请求结构体写 Validate() error 方法；失败统一返回 400 和字段错误列表，字段名用 JSON 字段名（给 validator 注册 RegisterTagNameFunc）。
- 错误：handler 写成返回 error 的函数类型，由一个适配器统一把 error 写成响应；Gin 里调用 c.Error(err) 后交给错误中间件；用 errors.As 把业务错误映射成状态码和错误码，其他错误一律 500，记日志，不把内部信息返回给客户端。
- 服务器：http.Server 设 ReadHeaderTimeout（如 5s）、ReadTimeout、WriteTimeout 和 IdleTimeout；用 signal.NotifyContext 监听 SIGINT、SIGTERM，收到后调用 srv.Shutdown，给 10–30 秒宽限，再关数据库连接池；r.Context() 一路传到数据库调用，客户端断开后查询能被取消。
- 测试：用 httptest.NewRequest 加 httptest.NewRecorder 直接调用 mux.ServeHTTP（Gin 的 engine 同样实现了 ServeHTTP），覆盖 2xx、400、404、500；端到端测试用 httptest.NewServer；service 依赖的 Store 用手写的假实现替换。

## 提示词

在{服务名}（Go 1.22+，路由用{标准库 net/http / Gin}）里{新增一组 API / 检查现有 HTTP 层并纠正}，业务：{模块}（如订单、门店、会员）。
先读 main.go 里 http.Server 的创建和中间件注册、一个现有 handler 和错误响应的写法，确认错误体结构和已有的辅助函数，沿用它们。按这些约定做：
{{要点}}

新增时：为 {模块} 写创建、详情、列表三个 API，含请求结构体、校验规则、错误映射，以及覆盖 201、400、404 的 handler 测试。
检查时：逐条列出偏离的地方（文件、问题、改法），先修没设超时、没有优雅停机、请求体不限大小、错误泄露内部信息这几类，再统一写法；状态码或响应体会变的先告诉我。
最后列出改动的文件，以及用 curl 验证的命令。
