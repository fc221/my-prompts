---
zh: Rails 项目约定
en: Rails project conventions
aka: Ruby on Rails 项目结构 ActiveRecord 约定优于配置 strong params
order: 20
---

## 是什么

Rails 8（以 8.1 为准）项目的约定：照 Rails 的目录和命名走（模型单数、表名复数、控制器复数），业务规则放模型，流程复杂时加 service 对象，入参走 strong params，表结构走 db/migrate；默认技术栈用 Solid Queue、Solid Cache 和 Minitest。

## 适合

小团队快速做完整业务（电商、SaaS、内部系统）；老项目升到 Rails 8 后统一写法；让 AI 按 Rails 约定生成代码，而不是自造目录。

## 不适合

团队没有 Ruby 经验、又要长期招人维护的项目，先看「后端语言与框架怎么选」；CPU 密集的计算拆到独立服务。

## 注意

别和约定对着干：自定义表名、主键名和目录会让生成器、自动加载、关联推断一起失效。模型回调里做副作用（after_save 里发短信、调外部 API）最容易出事故，这类动作放进 service 或 Job 里显式调用。

## 要点

- 目录：app/models/order.rb、app/controllers/orders_controller.rb（API 项目可放 app/controllers/api/v1/）、app/jobs/、app/mailers/、app/models/concerns/；流程复杂时加 app/services/create_order.rb，一个类只有一个公开的 call 方法；config/routes.rb 用 resources :orders；db/migrate/ 和 db/schema.rb；test/models、test/controllers、test/integration、test/fixtures。纯 API 项目用 rails new 加 --api 生成。
- 依赖：Rails 没有 DI 容器，Zeitwerk 按文件名自动加载（create_order.rb 对应 CreateOrder），不手写 require；需要替换的依赖（如支付网关客户端）作为构造参数传入并给默认值，测试时换成假对象。
- 配置：环境差异写在 config/environments/ 下的 development.rb、test.rb、production.rb；密钥放加密的 credentials（bin/rails credentials:edit，可按环境分文件），用 Rails.application.credentials 读取；部署变量用 ENV.fetch("DATABASE_URL")，缺失直接报错。
- 参数和校验：控制器用 strong params，Rails 8 写成 params.expect(order: [:store_id, :remark])，结构不对直接返回 400；数据规则写在模型的 validates 里，唯一、非空、外键同时在迁移里加数据库约束；保存失败返回 422 和 errors。
- 错误：ApplicationController 里用 rescue_from 把 ActiveRecord::RecordNotFound 映射成 404，业务异常映射成 422 或 409，统一输出 JSON；不 rescue_from StandardError 吞掉所有异常。
- 数据库：bin/rails generate migration AddRemarkToOrders remark:string 生成迁移，bin/rails db:migrate 执行，db/schema.rb 一起提交；列表用 includes 预加载，开发和测试环境打开 strict_loading 抓 N+1；后台任务继承 ApplicationJob，Rails 8 默认用 Solid Queue（以数据库做队列，不必另装 Redis）。
- 日志和测试：Rails.logger 输出，config.log_tags 带上 request_id，filter_parameters 过滤密码和令牌；默认 Minitest + fixtures，接口测试继承 ActionDispatch::IntegrationTest，模型测试继承 ActiveSupport::TestCase。
- 命令：bin/setup、bin/dev 或 bin/rails server、bin/rails console、bin/rails test、bin/rails db:prepare、bin/rails routes、bin/rubocop、bin/brakeman（安全扫描）；Rails 8 默认用 Kamal 部署（bin/kamal deploy）；8.1 起新项目带 bin/ci 和 config/ci.rb，本地和 CI 按同一份步骤跑测试、代码风格和安全检查。

## 提示词

在{项目}（Rails 8）里{新建业务资源 / 检查现有代码并纠正}，业务：{模块}（如订单、门店、会员）。
先读 Gemfile、config/routes.rb、ApplicationController，以及一个现有资源的模型、控制器和测试，确认是不是 API 模式、错误 JSON 的格式、测试用 Minitest 还是 RSpec，沿用已有选择。按这些约定做：
{{要点}}

新建时：用 bin/rails generate 生成模型和迁移，写控制器、路由、strong params 和模型校验，流程复杂的放进 service，补上覆盖创建成功、422、404 的集成测试。
检查时：先找有副作用的模型回调、缺少 strong params、列表的 N+1、明文密钥、被改过的已执行迁移；逐条列出文件和改法，会改变响应的先问我。
最后列出改动的文件和验证命令（有 bin/ci 的跑 bin/ci，否则 bin/rails test 和 bin/rubocop）。
