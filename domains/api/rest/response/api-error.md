---
zh: 错误响应格式
en: Error response format
aka: problem+json RFC 9457 RFC 7807 Problem Details 错误体 错误码
order: 10
---

## 是什么

所有失败响应用同一种结构。推荐 RFC 9457 的 Problem Details（Content-Type: application/problem+json）：type、title、status、detail、instance 五个标准字段，再加 code、traceId、errors 这类扩展字段。

## 适合

新服务定错误规范；几个服务的错误格式各不相同，前端要写好几套解析；表单要把服务端的校验错误标到具体字段上。

## 不适合

状态码本身怎么选看「状态码怎么选」；业务错误码怎么编号、怎么在代码里抛看「错误处理与错误码」；前端怎么分层展示看「前端错误分层处理」。

## 注意

detail 是给人看的，文案会改；客户端的分支判断只认 code 或 type。500 的 detail 只写通用提示，堆栈、SQL、内部主机名只进日志，靠 traceId 关联。

## 要点

- type：错误类型的 URI，指向这类错误的说明文档，如 /problems/order-not-cancelable；没有专门文档时用 about:blank，这时 title 就写状态码的标准短语。
- title：这类错误的简短说明，同一个 type 下固定不变；detail：这一次的具体情况，如“订单 ord_8F3k2 已发货，不能取消”。
- status：和 HTTP 状态码相同的数字；instance：这次出错的请求或资源标识，如 /orders/ord_8F3k2 或请求 ID。
- code：稳定的机器错误码，全大写加下划线，如 ORDER_ALREADY_SHIPPED、MEMBER_FROZEN；traceId：查日志用。
- 字段级错误放 errors 数组，每项含 field（如 items[0].quantity，全项目一种路径写法）、code、message；一次校验返回全部字段的错误，前端能一次标完。
- 错误码只增不改：已发布的 code 不改名、不改含义；文档列出每个 code 对应的状态码、含义和客户端该怎么处理。
- 多语言二选一：detail 和 message 按 Accept-Language 返回，或者只认 code、由前端翻译。
- 框架和网关的默认错误（路由不存在、请求体过大、超时）也转成同一结构，客户端不会收到 HTML 错误页。

## 提示词

把{服务名}的错误响应统一成 RFC 9457 Problem Details。先读全局异常处理、现有错误码定义和前端解析错误的代码。
1. 所有 4xx、5xx 返回 Content-Type: application/problem+json，字段 type、title、status、detail、instance，扩展字段 code（全大写下划线）和 traceId；校验错误加 errors 数组，每项 field、code、message。
2. 校验失败一次返回所有字段的错误。
3. 500 的 detail 只写通用提示，异常详情只进日志，带同一个 traceId。
4. 框架和网关的默认错误（路由不存在、请求体过大、方法不允许）也转成这个结构。
5. 整理错误码清单：code、状态码、title、客户端处理方式，写进接口文档。
6. 同步改前端请求层：按 code 分支，按 errors 把消息标到表单字段上。
7. 每类错误一条测试，断言状态码、Content-Type 和 code。
最后列出改动文件，并说明旧错误格式怎么过渡（兼容期内是否两种都支持）。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, http } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, http(`
POST /orders/ord_8F3k2/cancel
Authorization: Bearer <token>
Accept-Language: zh-CN
`, `
409 Conflict
Content-Type: application/problem+json

"type": "/problems/order-not-cancelable",
"title": "订单当前状态不能取消",
"status": 409,
"detail": "订单 ord_8F3k2 已发货，不能取消",
"instance": "/orders/ord_8F3k2",
"code": "ORDER_ALREADY_SHIPPED",
"traceId": "4bf92f3577b34da6"
`), { title: 'Problem Details · 客户端只认 code' });
}
</script>
