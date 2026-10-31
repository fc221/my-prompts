---
zh: 错误处理与错误码
en: Error handling and error codes
aka: 异常处理 业务异常 系统异常 全局异常处理 错误码表 error code 吞异常
order: 10
---

## 是什么

服务内部怎么区分、传递和转换错误：业务规则不满足（库存不足、审批人不匹配）用带错误码的业务异常，系统故障（数据库超时、下游 500）用系统异常，统一在边界处转成对外的错误响应并记录日志。

## 适合

新服务搭错误处理骨架；老项目到处 try-catch 吞异常、返回 null、把错误信息原样透给前端；多个服务要统一错误码。

## 不适合

对外返回的 JSON 结构和 HTTP 状态码看「错误响应格式」「状态码怎么选」；日志字段看「结构化日志」；调下游失败要不要重试看「超时、重试与熔断」。

## 注意

吞异常（catch 之后只打印或返回默认值）是最难排查的 bug 来源：调用方以为成功了，数据却没写进去。异常要么被真正处理（有明确的补救动作），要么带上上下文继续往上抛。

## 要点

- 两类异常：业务异常（BizException、DomainError）带错误码和可以给用户看的提示，属于预期情况，记 INFO 或 WARN、不告警；系统异常保留原始 cause，记 ERROR 带堆栈，计入错误率。
- 错误码：大写字符串，领域_原因，如 ORDER_STOCK_INSUFFICIENT、EXPENSE_APPROVER_MISMATCH、POINTS_BALANCE_NOT_ENOUGH（项目已有数字错误码就沿用，按服务分号段）；全部登记在一个枚举或错误码文件里，附中文说明和对应的 HTTP 状态码；发布后含义不变、编号不复用。
- 统一出口：只在一处把异常转成响应（Spring @RestControllerAdvice、NestJS ExceptionFilter、FastAPI exception_handler、Go 的错误处理中间件），业务代码不自己拼错误 JSON；识别不了的异常一律 500 加通用提示，响应里带 trace_id 方便用户报障。
- 包装保留原因：跨层转换时带上 cause（Java 构造异常时传入 cause，Go 用 fmt.Errorf 的 %w 加 errors.Is / errors.As，Python raise … from e）；消息写清操作和关键 ID，如“扣减库存失败 sku_id=10086 qty=3”。
- 只记一次：在处理异常的那一层记录日志，中间层只包装不打印，一个错误只留一份堆栈。
- 查不到不是异常：仓储层返回空（Optional、nil），由应用层决定是 404 还是正常分支；参数校验失败在边界统一返回字段级错误，见「入参校验」。
- 内部信息只进日志：SQL、堆栈、类名、内网地址不出现在响应里；下游服务的错误码不原样透传，转换成本服务的错误码。
- 资源和部分成功：用 try-with-resources、defer、with、finally 释放连接和文件；批量操作逐项返回结果，已经成功的部分如实返回。

## 提示词

整理{项目}的错误处理，语言和框架是{语言和框架}。
1. 盘点：搜出所有 catch、except、recover 和 if err != nil 的处理，标出吞异常（只打印或返回默认值）、丢失原始原因、多层重复打日志、手动拼错误响应、把 SQL 或堆栈返回给调用方的地方；列出现有错误码的定义位置和格式。
2. 按规则改：区分业务异常（带错误码、不告警）和系统异常（保留 cause、记 ERROR）；错误码统一为 领域_原因 的大写字符串（已有体系则沿用），集中登记并附说明和 HTTP 状态码；只在全局异常处理里转换成「错误响应格式」规定的结构并带 trace_id；中间层包装时保留原因。
3. 补测试：每个新错误码至少一个用例；未知异常返回 500 且响应里没有内部信息。
4. 汇报：问题清单、新的错误码表、改动文件、测试结果。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, flow } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, flow([
    [{ t: '库存不足', note: '抛业务异常，带错误码' }, { t: '统一出口', note: '记 INFO，不告警', acc: true }, { t: '409', note: '用户看得懂的提示' }],
    [{ t: '数据库超时', note: '包装时带上 cause', bad: true }, { t: '统一出口', note: '记 ERROR 带堆栈', acc: true }, { t: '500', note: '通用提示 + trace_id', bad: true }],
  ], { lanes: ['业务异常', '系统异常'] }), { title: '错误处理 · 错误码如 ORDER_STOCK_INSUFFICIENT' });
}
</script>
