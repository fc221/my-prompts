---
zh: SSE 流式输出
en: Server-Sent Events
aka: server-sent events EventSource text/event-stream 流式响应 打字机效果 AI 流式
order: 20
---

## 是什么

服务端在一个普通 HTTP 响应里持续写出事件，Content-Type 是 text/event-stream，每条事件由 event、id、retry、data 几行组成，以空行结束。只能服务端往下推，断线后浏览器会带上 Last-Event-ID 自动重连续传。AI 对话的逐字输出就是最典型的用法。

## 适合

AI 回答逐字输出；订单、工单状态变化提醒；长任务进度（报表导出 35%）；排队叫号、库存变化这类只需服务端下发的数据。

## 不适合

客户端要频繁上行（协同编辑、在线聊天的输入状态）用「WebSocket 实时推送」；系统之间的通知用「Webhook 设计」；结果要几分钟才出来、用户可能离开页面的，用「长任务异步化」。

## 注意

中间层缓冲是第一大坑：Nginx、网关、压缩中间件把输出攒满一块才发，前端看到的是等十秒后一次性出现。第二个坑是响应已经以 200 开始写出，中途出错改不了状态码，只能发一条 error 事件。

## 要点

- 响应头：Content-Type: text/event-stream、Cache-Control: no-cache、X-Accel-Buffering: no；Nginx 对该路由关闭 proxy_buffering，不做 gzip；每条事件写完立即 flush。
- 事件格式：event: 行写类型，data: 行写 JSON，多行数据拆成多个 data: 行，最后跟一个空行；可续传的流每条带 id:，开头发一次 retry: 3000 设定重连间隔（毫秒）。
- 续传：断线后 EventSource 自动重连并带 Last-Event-ID 请求头，服务端补发该 id 之后的事件；不支持续传的流（如单次 AI 回答）不发 id，重连请求返回 204，浏览器收到后停止重连。
- 保活：每 15 秒写一行以冒号开头的注释（: ping），防止代理和负载均衡按空闲超时断开。
- AI 流式输出的事件类型固定为 delta（增量文本）、tool（工具调用，可选）、done（结束，附 finish_reason 和用量）、error（错误码和说明）；客户端以收到 done 或 error 判断结束，不以连接关闭为准。
- 取消：用户点“停止生成”或关闭页面时连接断开，服务端监听断开事件并取消上游模型调用，避免继续生成和计费。
- EventSource 只能发 GET、不能带自定义头：要 POST 提交对话内容或带 Authorization 时，前端用 fetch 读取 ReadableStream 自己解析事件；鉴权走 Cookie 的可以直接用 EventSource。
- HTTP/1.1 下浏览器对同一域名最多 6 个并发连接，多个标签页各开一条 SSE 会把普通请求堵住；部署走 HTTP/2，或一个页面只保留一条 SSE 连接。

## 提示词

给{服务}的{流式功能，如 AI 客服回答}做 SSE 流式输出（已有就检查并改正）。先读现在的响应写法、网关和 Nginx 配置、前端的读取代码，盘点：响应头是否正确、中间有没有缓冲或压缩、事件格式、出错怎么通知、用户中途停止后服务端会不会继续算。
按以下规则改：
1. 响应头设 text/event-stream、Cache-Control: no-cache、X-Accel-Buffering: no；该路由关闭代理缓冲和 gzip，每条事件立即 flush。
2. 事件类型统一为 delta、done、error，需要时加 tool；done 带 finish_reason 和用量；中途出错发 error 事件后关闭。
3. 每 15 秒写一行 : ping 注释保活。
4. 客户端断开时取消上游调用和后续计算。
5. 需要 POST 或自定义头时，前端用 fetch 读 ReadableStream 解析事件，以 done 或 error 判断结束。
6. 可续传的流（{可续传的流，如 工单状态通知}）每条带 id，开头发 retry: 3000，按 Last-Event-ID 补发。
最后说明改了哪些文件，用 curl -N 演示事件逐条到达而不是最后一次性出现，再演示点击停止后服务端日志里上游调用被取消。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, seq } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, seq(['浏览器 EventSource', '服务端'], [
    [0, 1, 'GET /order-events'],
    [1, 0, '200 text/event-stream', 'r'],
    [1, 0, 'id: 41 · event: status', 'r'],
    [0, 0, '断线 → 按 retry 3 秒后重连'],
    [0, 1, 'GET · Last-Event-ID: 41'],
    [1, 0, '补发 id 42 之后的事件', 'r'],
    [1, 0, ': ping（每 15 秒保活）', 'r'],
  ]), { title: 'SSE 断线续传 · 带 Last-Event-ID 补发' });
}
</script>
