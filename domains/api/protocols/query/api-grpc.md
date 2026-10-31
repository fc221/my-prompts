---
zh: gRPC 与 Protobuf
en: gRPC and Protocol Buffers
aka: grpc protobuf proto3 服务间调用 buf deadline
order: 30
---

## 是什么

用 .proto 文件定义消息和服务，生成多语言的客户端和服务端代码，基于 HTTP/2 传二进制。规则集中在三处：字段编号的兼容、deadline 的传递、状态码的使用。

## 适合

内部服务之间的同步调用；多语言团队需要强类型契约；需要服务端流或双向流（批量导出、实时价格、设备上报）。

## 不适合

浏览器和小程序直接调用（改用 REST，或经 gRPC-Web、网关转码）；对外开放平台用 REST + OpenAPI；跨团队的异步通知用消息队列，见「事件驱动与消息队列」。

## 注意

字段编号就是线上数据格式的一部分。改编号或复用删掉的编号，老客户端会把新字段按旧含义解析，不报错但数据错乱，这是最难查的一类故障。

## 要点

- 包名带版本：package order.v1，文件放 proto/order/v1/order.proto；不兼容的改动另开 order.v2，新旧版本并存一段时间。
- 字段编号发布后永不修改、永不复用；删字段时把编号和名字都写进 reserved（如 reserved 4, 7; 和 reserved "coupon_code";）。编号 1–15 只占 1 字节，留给高频字段。
- 每个 RPC 用专属的请求和响应消息（CreateOrderRequest、CreateOrderResponse），不直接收发 Order，以后加参数不影响别的方法。
- 枚举第一个值固定为 ORDER_STATUS_UNSPECIFIED = 0，值名带枚举前缀；需要区分“没传”和“传了 0”的字段加 optional；时间用 google.protobuf.Timestamp，金额用 int64 表示分。
- deadline：每次调用都设，入口按接口预算定（如下单 800ms），下游调用沿用上游 context 里剩余的时间，不另起更长的超时；收到 DEADLINE_EXCEEDED 立即返回，不再继续调下游。
- 状态码按含义用：参数错 INVALID_ARGUMENT、不存在 NOT_FOUND、已存在 ALREADY_EXISTS、当前状态不允许 FAILED_PRECONDITION、并发冲突 ABORTED、限流 RESOURCE_EXHAUSTED、未登录 UNAUTHENTICATED、无权限 PERMISSION_DENIED、下游暂不可用 UNAVAILABLE；业务错误码放在 status details 的 ErrorInfo.reason 里。
- 网关转 HTTP：OK 200；INVALID_ARGUMENT、FAILED_PRECONDITION、OUT_OF_RANGE 400；UNAUTHENTICATED 401；PERMISSION_DENIED 403；NOT_FOUND 404；ALREADY_EXISTS、ABORTED 409；RESOURCE_EXHAUSTED 429；UNIMPLEMENTED 501；UNAVAILABLE 503；DEADLINE_EXCEEDED 504；其余 500。
- 自动重试只针对幂等方法的 UNAVAILABLE；CI 用 buf lint 检查风格，用 buf breaking 和主分支对比，有破坏性变更不让合并。

## 提示词

检查{服务}的 proto 定义和 gRPC 调用代码并改正。先读 proto 目录、代码生成配置和调用处，盘点：包名有没有版本、字段编号有没有被改过或复用（对照 git 历史）、请求响应消息是否专用、枚举零值、哪些调用没设 deadline、错误用了哪些状态码。
按以下规则改：
1. 包名改为 {包名}.v1；删过的字段补 reserved，编号和名字都写。
2. 每个 RPC 用专属的 Request 和 Response 消息；枚举零值改为带前缀的 UNSPECIFIED。
3. 所有出站调用设 deadline，入口预算 {入口超时}，下游沿用上游 context 的剩余时间。
4. 错误统一用标准状态码，业务错误码放 ErrorInfo.reason，网关按标准对应表转 HTTP 状态码。
5. 只对幂等方法的 UNAVAILABLE 重试，最多 {重试次数} 次，带退避。
6. CI 加 buf lint 和对主分支的 buf breaking 检查。
改编号、改字段类型这类会破坏线上兼容的改动先列出来给我确认。最后说明改了哪些文件，跑一次 buf breaking，再用一个超时用例证明 deadline 能传到下游。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, code } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, code([
    { t: 'proto/order/v1/order.proto', text: `
package order.v1;

service OrderService {
  rpc CreateOrder(CreateOrderRequest)
    returns (CreateOrderResponse);
}
message Order {
  reserved 4, 7;
  reserved "coupon_code";
  string id = 1;
  OrderStatus status = 2;
  int64 amount_fen = 3;
}
` },
    { t: '枚举与调用', text: `
enum OrderStatus {
  ORDER_STATUS_UNSPECIFIED = 0;
  ORDER_STATUS_PAID = 1;
}
// 每次调用都设 deadline
// 下单入口 800ms，下游用剩余时间
// FAILED_PRECONDITION → 400
// UNAVAILABLE → 503，幂等方法才重试
// DEADLINE_EXCEEDED → 504
` },
  ]), { title: 'gRPC 与 Protobuf · 字段编号永不修改、永不复用' });
}
</script>
