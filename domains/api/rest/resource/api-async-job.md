---
zh: 长任务异步化
en: Async long-running jobs
aka: 202 Accepted 异步任务 任务轮询 异步导出 job
order: 60
---

## 是什么

处理时间超过几秒的操作（导出全年订单、导入会员、生成对账单）先返回 202 和任务地址，后台执行，客户端轮询任务状态拿结果。

## 适合

导入导出、报表生成、批量调价、要调用耗时不稳定的第三方的操作；同步处理会撞上网关 30–60 秒超时的场景。

## 不适合

一两秒内能完成的直接同步返回；要把进度实时推给页面看「SSE 流式输出」或「WebSocket 实时推送」；完成后通知第三方系统看「Webhook 设计」；任务怎么排队、重试看「后台任务队列」。

## 注意

任务状态要持久化，只放在进程内存里的话，重启或多实例部署时轮询会拿到 404。提交本身也要防重复：用户连点两次“导出”，应该拿到同一个任务。

## 要点

- 提交：把操作建成资源，如 POST /order-exports，返回 202，Location 指向 /jobs/:id，响应体带 id、status、createdAt。
- 任务字段：id、type、status（queued、running、succeeded、failed、canceled）、progress（0–100）、createdAt、startedAt、finishedAt，结束后填 result 或 error；error 和同步接口用同一种错误结构。
- 查询：GET /jobs/:id 返回 200 和当前状态，未结束时带 Retry-After 建议轮询间隔（如 2 秒）；成功后 result 给结果地址和过期时间。
- 客户端轮询从 1–2 秒起步，逐步放大到 10–30 秒，设总等待上限；离开页面就停。
- 任务只对创建人和有权限的角色可见，别人查询返回 404。
- 取消：POST /jobs/:id/cancel，已结束的任务返回 409。
- 任务记录和结果文件的保留期写进文档（如 7 天），过期后 GET 返回 410。
- 同一用户、同类型、同参数的任务还在进行时，重复提交返回已有任务（同一个 Location），或用 Idempotency-Key 去重。

## 提示词

把{操作}改成异步任务。先读现有同步实现、项目里的任务队列或定时任务设施，以及前端调用处。
1. 提交：POST {提交路径} 返回 202，Location 指向 /jobs/:id，响应体带 id 和 status。
2. 任务持久化到数据库，字段：id、type、status（queued、running、succeeded、failed、canceled）、progress、创建人、参数、result、error、各阶段时间。
3. GET /jobs/:id 返回当前状态，未结束时带 Retry-After: 2；成功后 result 给结果地址和过期时间。
4. POST /jobs/:id/cancel 取消，已结束返回 409；只有创建人和{可查看的角色}能查看和取消。
5. 同一用户同参数的任务进行中时，重复提交返回已有任务。
6. 执行失败按队列的重试策略重试，最终失败写入 error，结构和同步接口一致。
7. 前端提交后显示进度，轮询 2 秒起步、逐步放大到 15 秒，离开页面停止。
最后列出改动文件，说明结果文件保留多久、怎么清理。
