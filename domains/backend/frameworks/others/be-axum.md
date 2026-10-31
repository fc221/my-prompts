---
zh: Rust Axum 项目约定
en: Rust Axum conventions
aka: Rust 后端 axum tokio sqlx tower
order: 40
---

## 是什么

Rust Axum（以 0.8 为准）服务的约定：main.rs 只负责启动，lib.rs 暴露构建 Router 的函数，按功能分模块写 handler，共享依赖放进可 Clone 的 AppState 用 State 提取，错误统一实现 IntoResponse，数据库用 sqlx 加 migrations 目录。

## 适合

对延迟、内存和资源占用敏感的服务；团队有 Rust 经验；网关、推送、计算密集的 API。

## 不适合

团队没有 Rust 经验、业务以 CRUD 为主又要快速迭代时，换团队熟悉的栈，见「后端语言与框架怎么选」。

## 注意

0.8 起路径参数改成用花括号包住参数名（以前是冒号前缀），沿用旧写法注册路由时会直接 panic。提取器有顺序：会消费请求体的 Json、Form、String、Bytes 只能放在 handler 的最后一个参数。

## 要点

- 目录：src/main.rs 读配置、初始化 tracing、建连接池，调用 axum::serve 并接上优雅停机；src/lib.rs 暴露 app(state) 返回 Router，测试直接调用；src/config.rs、src/error.rs、src/state.rs；业务模块 src/orders/ 下放 mod.rs（路由）、handlers.rs、service.rs、repo.rs、model.rs；migrations/ 放 sqlx 迁移；tests/ 放接口测试。
- 状态和依赖：AppState 是 derive(Clone) 的结构体，放 PgPool（本身就能廉价克隆，不用再包 Arc 和 Mutex）、配置和服务对象；顶层 Router 用 with_state(state) 注入，handler 用 State<AppState> 提取；子模块的路由用 Router::nest("/orders", orders::routes()) 合并。
- handler：写成 async fn，参数用 Path、Query、Json 提取（反序列化失败自动返回 4xx），返回 Result<Json<OrderResp>, AppError>；handler 只做提取、调用 service、组装响应，service 不依赖 axum 的类型。
- 校验：反序列化只保证结构，业务规则用 validator crate 的派生宏，或用 newtype 加构造函数校验（如 Phone::parse）；失败转成 AppError 的校验变体，返回 422 和字段错误；要统一提取器的报错格式，用 axum-extra 的 WithRejection 或自己实现提取器。
- 错误：AppError 是 thiserror 派生的 enum，impl IntoResponse 统一映射状态码和错误体；sqlx::Error 等底层错误实现 From 转换，handler 里用 ? 传播；内部错误记日志后只返回通用信息；handler 里不用 unwrap 和 expect。
- 数据库：sqlx 写原生 SQL，query! 和 query_as! 宏在编译期检查 SQL，CI 里用 cargo sqlx prepare 生成离线元数据并设 SQLX_OFFLINE=true；sqlx migrate add 建迁移、sqlx migrate run 执行，或启动时调用 sqlx::migrate!() 宏；PgPoolOptions 设最大连接数和获取超时。
- 中间件和日志：tower-http 的 TraceLayer、TimeoutLayer、CorsLayer、RequestBodyLimitLayer 用 ServiceBuilder 组合后挂到 .layer()（ServiceBuilder 里按书写顺序从上到下执行）；日志用 tracing + tracing-subscriber，生产输出 JSON，service 函数加 #[instrument]；阻塞和 CPU 重的工作放进 tokio::task::spawn_blocking，std::sync::Mutex 的锁不跨 .await 持有。
- 测试和命令：单测写在同文件的 #[cfg(test)] mod tests 里；接口测试在 tests/ 里调用 app(state)，用 tower::ServiceExt::oneshot 发请求，数据库测试用 #[sqlx::test] 为每个用例建临时库；常用 cargo run、bacon 或 cargo watch -x run、cargo test、cargo clippy -- -D warnings、cargo fmt。

## 提示词

在{服务名}（Rust，axum 0.8 + tokio）里{新建业务模块 / 检查现有代码并纠正}，业务：{模块}（如订单、门店、会员）。
先读 Cargo.toml（axum、sqlx、tower-http 的版本）、main.rs、AppState 和错误类型的定义、一个现有模块，确认数据库库、错误体格式和测试写法，沿用已有选择。按这些约定做：
{{要点}}

新建时：建 src/{模块}/，写 model、repo、service、handlers 和路由，在 app() 里 nest 进来，加一条 sqlx 迁移，写覆盖 201、404、422 的 oneshot 接口测试。
检查时：先找 0.7 的冒号路径写法、handler 里的 unwrap、async 里的阻塞调用、跨 .await 持有的同步锁、包在 Arc 和 Mutex 里的连接池；逐条列出文件和改法，会改变响应的先问我。
最后列出改动的文件和验证命令（cargo clippy、cargo test）。
