---
zh: GraphQL Schema 设计
en: GraphQL schema design
aka: graphql schema resolver DataLoader 查询复杂度 mutation userErrors
order: 20
---

## 是什么

用类型系统描述一张可查询的数据图，客户端按需挑字段。schema 设计决定三件事：字段怎么命名和分页、业务错误怎么返回、一次查询最多能花多少成本。

## 适合

App、小程序、后台多端共用一份数据；页面要一次拿到订单、门店、会员、商品这种多层关联；已有 GraphQL 服务要补限流和错误规范。

## 不适合

对外开放平台和简单 CRUD 用 REST，见「REST、GraphQL、gRPC 怎么选」；文件上传走单独的 REST 上传接口，再把文件 id 传进 mutation；服务之间的调用用「gRPC 与 Protobuf」。

## 注意

N+1 是默认行为：列表里每个订单都会去查一次门店，所以每个关联字段的 resolver 都要走 DataLoader 批量加载。另一个坑是没有成本限制，一条嵌套十层的查询就能拖垮数据库。

## 要点

- 命名：类型用 PascalCase（Order、StoreConnection），字段和参数用 camelCase，枚举值全大写加下划线（PENDING_PAYMENT）；每个对象类型都有全局唯一的 id 字段，类型 ID!。
- 列表一律用连接分页：参数 first、after（反向用 last、before），返回 edges（每项含 node 和 cursor）、pageInfo（hasNextPage、endCursor），totalCount 按需提供；first 默认 20、上限 100，超出直接报错。
- 防滥用：查询深度上限 8–10 层；复杂度按字段打分（标量 1 分、对象 2 分、列表字段乘以 first），单次上限 1000 分；超限在执行前拒绝，错误码 QUERY_TOO_COMPLEX。生产环境可以只接受事先登记过的持久化查询。
- N+1：关联字段的 resolver 通过 DataLoader 按 id 批量取（storeById、membersByIds），DataLoader 实例按请求新建，不跨请求共享缓存。
- mutation 以动词开头（createOrder、cancelOrder），只收一个 input 参数（类型 CancelOrderInput），返回专用 payload 类型（CancelOrderPayload），里面放变更后的对象和 userErrors 列表。
- 错误分两类：业务校验失败（库存不足、订单已发货）放 userErrors，每项有 field 路径、code、message；未登录、无权限、超时、系统异常走顶层 errors，在 extensions.code 写 UNAUTHENTICATED、FORBIDDEN、INTERNAL 这类错误码。
- 可空性：只有一定存在的字段标非空（id、createdAt）；可能因权限或下游故障取不到的关联字段保持可空，避免一个字段出错把整条查询的结果都冒泡成 null。
- 演进不加版本号：只增不改，停用的字段标 @deprecated(reason: "改用 paidAmount")，用量统计归零后再删；CI 对比 schema 差异，删字段、改类型、输出字段由非空改可空、参数由可空改非空都算破坏性变更。

## 提示词

检查{服务}的 GraphQL schema 和 resolver 并改正。先读 schema 文件、resolver 和入口中间件，列出现状：命名是否统一、列表怎么分页、有没有深度和复杂度限制、哪些关联字段会产生 N+1、mutation 返回什么、错误怎么返回。
然后按以下规则改：
1. 列表字段改为连接分页（first、after，返回 edges 和 pageInfo），first 默认 20、上限 100。
2. 加查询深度上限 {深度上限} 层、复杂度上限 {复杂度上限} 分，超限在执行前拒绝，返回错误码 QUERY_TOO_COMPLEX。
3. 所有关联字段的 resolver 改用 DataLoader，实例按请求创建。
4. mutation 统一为单个 input 参数加专用 payload，业务错误放 userErrors（field、code、message），系统错误走顶层 errors 的 extensions.code。
5. 要改名或删除的字段先加 @deprecated 并写明替代字段，不直接删。
6. 字段级权限在 resolver 里检查，无权访问的字段返回 null，并在 errors 里说明原因。
最后说明改了哪些文件；用一条取 50 个订单及其门店和会员的三层查询，对比改前改后的数据库查询次数，再用一条超深查询证明会被拒绝。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, code } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, code([
    { t: '查询：连接分页', text: `
type Query {
  orders(first: Int = 20, after: String)
    : OrderConnection!
}
type OrderConnection {
  edges: [OrderEdge!]!   # node + cursor
  pageInfo: PageInfo!    # hasNextPage
}
type Order {
  id: ID!
  store: Store           # DataLoader，可空
}
` },
    { t: '变更：payload + userErrors', text: `
type Mutation {
  cancelOrder(input: CancelOrderInput!)
    : CancelOrderPayload!
}
type CancelOrderPayload {
  order: Order
  userErrors: [UserError!]!
}
type UserError {
  field: [String!]
  code: String!    # ORDER_ALREADY_SHIPPED
  message: String!
}
` },
  ]), { title: 'GraphQL Schema' });
}
</script>
