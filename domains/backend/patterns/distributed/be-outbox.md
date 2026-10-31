---
zh: 发件箱模式
en: Transactional outbox
aka: Outbox 本地消息表 事务消息 可靠消息 CDC
order: 60
---

## 是什么

业务数据和“要发出去的消息”在同一个本地事务里写库：消息先存进 outbox 表，再由单独的投递任务读出来发到消息队列，发成功后打上标记。解决“数据库提交了消息没发出去”和“消息发了事务却回滚了”的双写问题。

## 适合

订单支付成功后必须通知仓库、积分、营销等下游，一条都不能丢；任何“改库 + 发消息”必须一起成功的场景；「Saga 长事务」和「事件驱动与消息队列」里需要可靠投递的那一步。

## 不适合

丢了也无妨的通知（埋点、非关键提醒），事务提交后直接发，失败打日志即可；用的 MQ 自带事务消息（如 RocketMQ）且团队熟悉，可以用它代替 outbox 表；只是进程内的模块联动，用提交后分发的「领域事件」。

## 注意

发件箱只保证至少一次：投递任务发完消息、还没来得及打标记就宕机，重启后会再发一次。下游按 eventId 幂等是它的配套条件。

## 要点

- outbox 表字段：id（自增或有序 ID，便于按顺序扫描）、event_id（唯一）、aggregate_type、aggregate_id、event_type、payload（JSON）、created_at、sent_at（为空表示未发送）、retry_count、last_error。
- 写入：业务修改和插入 outbox 记录在同一个事务里；业务代码只调用“登记事件”，投递交给单独的任务。
- 投递方式二选一：轮询，每 1–2 秒按 id 顺序取 100–500 条未发送记录，多实例用 SELECT … FOR UPDATE SKIP LOCKED 防重复（MySQL 8.0、PostgreSQL 9.5 起支持）；或者用 CDC 工具读数据库日志（如 Debezium、Canal 读 binlog），延迟更低，但多维护一套组件。
- 顺序：同一聚合的事件按 id 顺序发送，用 aggregate_id 做 MQ 分区键；某条一直发不出去时，暂停同一聚合的后续消息，其他聚合照常发送。
- 失败处理：发送失败记录 last_error、retry_count 加一，按退避间隔重试，超过次数告警，记录保留供人工重放。
- 清理：已发送记录保留 7 天后分批删除或归档；监控未发送条数和最老一条的等待时间。
- 目录示例：src/shared/outbox/（outbox_repository、outbox_relay 投递任务、outbox_cleanup）、migrations/ 里一条建表迁移；各模块通过 outbox.record(event) 登记。
- 过度设计的信号：每个模块各建一张 outbox 表和一个投递任务；为了不丢消息再叠二次确认表、对账表，下游却没做幂等。

## 提示词

在{项目}里加发件箱，保证{业务动作，如 订单支付成功}后发给{下游，如 仓库、积分、营销}的消息不丢。先读现有的事务管理、MQ 发送和定时任务写法。然后：
1. 写一条迁移建 outbox 表，字段含 id、event_id（唯一）、aggregate_type、aggregate_id、event_type、payload、created_at、sent_at、retry_count、last_error。
2. 业务修改和插入 outbox 在同一个事务里，业务代码只调用登记方法。
3. 写投递任务：每{轮询间隔}秒按 id 顺序取一批未发送记录，多实例用 FOR UPDATE SKIP LOCKED 防重复，以 aggregate_id 作分区键发送；成功写 sent_at，失败记 last_error 并退避重试，超过{重试次数}次告警。
4. 已发送记录保留{保留天数}天后分批清理。
5. 加未发送条数和最老等待时间两个监控指标。
补测试：业务事务回滚时 outbox 没有记录；投递中途失败后重试，消息不丢。最后列出改动文件，并写明下游需要按 event_id 幂等。
