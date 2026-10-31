---
zh: Go 服务项目布局
en: Go service layout
aka: golang 项目结构 目录结构 cmd internal 分包
order: 10
---

## 是什么

Go 后端服务的目录和包约定：cmd/ 放程序入口，internal/ 下按业务功能分包，每个包里有 handler、service、store 三层；依赖在 main 里用构造函数手动组装，配置读环境变量，迁移是独立的 SQL 文件。

## 适合

新建 Go 服务；仓库里出现 utils、common、models 这类大杂烩包要拆；让 AI 写 Go 代码前先定好包边界和依赖组装方式。

## 不适合

路由、中间件、校验、错误响应和优雅停机看「Go HTTP 服务约定」；只有一个 main.go 的小工具保持单文件，不套这套目录。

## 注意

按功能分包，不按层分包：订单的 handler、service、store 都放 internal/order，而不是在顶层建 handlers/、services/、models/，后者一旦互相引用就会循环 import。接口类型由使用方定义：service.go 里声明它需要的 Store，store.go 返回具体结构体，实现方不提前写大而全的接口。

## 要点

- 目录：cmd/api/main.go 只做读配置、建依赖、启动和退出；业务包 internal/order/（handler.go、service.go、store.go、model.go 和对应的 _test.go）、internal/member/；横切代码放 internal/platform/（db、log、middleware）；migrations/ 放 SQL；根目录放 go.mod、Makefile、.env.example。确实要给外部仓库引用的代码才放 pkg/。
- 组装：每层一个结构体配 New 开头的构造函数，依赖作为参数传入，如 order.NewService(store, logger)；main 里按 db → store → service → handler → 路由的顺序组装；不用包级全局变量，也不在 init() 里建连接。依赖多到手写吃力时，再引入 wire 一类生成工具。
- 接口：在使用方按需定义小接口，只列用到的方法（service 需要的 Store 通常 3–5 个方法）；只有一个实现、测试也不需要替换的地方，直接用具体类型。
- 配置：启动时从环境变量读到一个 Config 结构体（os.Getenv 或 caarlos0/env 这类库），缺必填项立刻退出并打印缺的键名；环境差异只体现在环境变量上，代码里不写 if env == "prod" 分支；本地 .env 不提交，提交 .env.example。
- 数据库：database/sql 配 pgx 驱动，或直接用 pgxpool；SQL 写在 store 层，想要类型安全就用 sqlc 从 SQL 生成代码；迁移用 golang-migrate 或 goose，文件带序号或时间戳并写 up / down，作为部署步骤单独执行，不在应用启动时自动建表。
- 错误：往上返回时用 fmt.Errorf 加 %w 包一层上下文（如 "get order 1024: %w"）；业务错误定义成包级哨兵变量（ErrOrderNotFound）或自定义错误类型，调用方用 errors.Is、errors.As 判断；同一个错误只在最上层记一次日志。
- 日志和 context：用标准库 log/slog，生产用 slog.NewJSONHandler；凡是做 IO 的函数，第一个参数都是 ctx context.Context，一路传到数据库调用，不存进结构体字段；请求 ID 由中间件生成并放进 context，记日志时带上。
- 测试和命令：测试文件和被测代码放同一目录，用表格驱动加 t.Run 子测试；store 层用 testcontainers-go 起真实数据库测；Makefile 收拢 go run ./cmd/api、go test -race ./...、go vet ./...、golangci-lint run 和迁移命令。

## 提示词

在{服务名}（Go 1.22+）里{新建业务包 / 检查现有布局并纠正}，业务：{模块}（如订单、门店、会员）。
先读 go.mod、cmd/ 下的 main.go 和一个现有业务包，确认 Go 版本、数据库驱动、迁移工具和日志库；已经在用的库继续用，不新增同类依赖。按这套布局做：
{{要点}}

新建时：建 internal/{模块}/，写 model、store、service、handler 和表格驱动的 service 单测，在 main.go 里接上组装和路由，在 migrations/ 加一对 up / down 文件。
检查时：先画出现有包之间的依赖关系，标出按层分包、全局变量、init 里建连接、接口定义在实现方这些问题，给出搬迁清单等我确认，再按包分批改，每批跑 go build ./... 和 go test ./...。
最后说明改了哪些文件，以及本地怎么启动和验证。
