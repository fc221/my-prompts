---
zh: 整洁架构与六边形
en: Clean / Hexagonal architecture
aka: 端口与适配器 Ports Adapters 洋葱架构 Onion 六边形架构
order: 10
---

## 是什么

业务核心（领域模型和用例）放在最里层，不依赖框架、数据库和外部服务；外部能力通过核心定义的端口（接口）接进来，由外层的适配器实现。依赖只能从外向里指。

## 适合

规则复杂、要长期维护的核心系统：结算、计价、库存调度、审批流；同时有多个入口（HTTP、消息、定时任务、命令行）或多个外部渠道（多家支付、多家物流）；5 人以上的团队，希望核心逻辑不连数据库也能快速单测。

## 不适合

以增删改查为主、规则很少的后台，用「三层架构」；还在验证需求的新产品，先用三层把业务跑通，等规则稳定了再把核心抽到里层。

## 注意

依赖方向光靠目录约定守不住，要在 CI 里用工具检查：Java 用 ArchUnit，Go 用 golangci-lint 的 depguard，Node 用 ESLint 的 no-restricted-imports，Python 用 import-linter。核心里一出现框架注解或 ORM 类型，边界就已经破了。

## 要点

- 从里到外四圈：domain（实体、值对象、领域规则）→ application（用例，编排领域对象和端口，管事务）→ adapters（HTTP controller、消息消费者、仓储实现、外部 API 客户端）→ bootstrap（读配置、组装依赖、启动）。
- 依赖方向：adapters → application → domain。domain 只依赖语言标准库；application 只依赖 domain 和自己定义的端口。
- 端口分两种：入口端口（PlaceOrderUseCase，被 controller 和消费者调用）和出口端口（OrderRepository、PaymentGateway、SmsSender），接口都定义在 application 或 domain 里，实现都在 adapters。
- 用例的输入输出是简单的命令和结果对象（PlaceOrderCommand、PlaceOrderResult），用例不接收 HTTP 请求，也不返回 ORM 实体。
- 目录示例：src/order/domain/、src/order/application/（place_order、cancel_order、ports/）、src/order/adapters/in/http/、adapters/in/mq/、adapters/out/persistence/、adapters/out/payment/；src/bootstrap/ 负责组装。
- 测试分层：domain 和 application 用纯单测加内存适配器，毫秒级跑完；adapters 连真实数据库和外部服务的沙箱做集成测试。
- 过度设计的信号：只有一种入口、一个数据库的增删改查也套四圈；每个用例都配一套接口加实现类；同一份数据在四层之间拷贝四次。这时把 application 和 adapters 合并回 service 和 controller。

## 提示词

用整洁架构（端口与适配器）组织{模块，如 结算}。先读现有代码，列出业务规则现在散在哪些 controller、service 和 SQL 里，以及这个模块依赖哪些外部系统（{外部系统，如 支付渠道、短信、库存服务}）。然后按 domain、application、adapters、bootstrap 四层整理：
1. domain 只放实体、值对象和规则，只依赖标准库。
2. application 每个用例一个类或函数，输入命令对象、输出结果对象，事务在这一层；仓储和外部系统在这一层定义成接口。
3. adapters 放 HTTP、消息消费者、仓储实现和外部客户端。
4. 在 CI 里加依赖方向检查（用项目语言常用的工具），domain 引用框架或 ORM 时构建失败。
domain 和 application 的测试用内存实现，不连数据库。分步提交，每一步都能编译、测试通过。最后给出目录树和依赖检查的运行方式。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, rings, tree } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, [
    rings([{ t: '框架与驱动', note: 'Web、数据库、消息' }, { t: '接口适配', note: 'Controller、Repository 实现' }, { t: '用例', note: 'PlaceOrder' }, { t: '实体', note: 'Order、Money' }], '依赖只指向内层'),
    tree(`
order/
* domain/         实体和规则，不引框架
* application/    用例、端口接口
  adapters/
    http/         Controller
    persistence/  Repository 实现
  bootstrap/      装配依赖
`),
  ]);
}
</script>
