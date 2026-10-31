---
zh: 事务边界与隔离级别
en: Transaction boundaries and isolation levels
aka: 事务 隔离级别 脏读 不可重复读 幻读 丢失更新 @Transactional 长事务 死锁
order: 10
---

## 是什么

两件事：哪些读写必须一起成功或一起失败（事务开在哪一层、包多大），以及并发的事务之间能看到彼此多少中间状态（隔离级别）。边界放错，会出现扣了库存却没生成订单；不清楚隔离级别，会出现“明明开了事务还是超卖”。

## 适合

下单扣库存、积分兑换、审批流转这类一次改多张表的业务；排查数据不一致、死锁、锁等待超时；评审 @Transactional 和 atomic 块的用法。

## 不适合

跨服务、跨库的一致性用「Saga 长事务」或「发件箱模式」；同一行被并发修改怎么防覆盖看「乐观锁与悲观锁」；客户端重复提交看「幂等键」。

## 注意

隔离级别只决定读到什么，不会自动阻止“读出来、改完、写回去”的丢失更新：两个请求都读到积分 100，各加 10 后写回 110，就少了 10。读改写要用条件更新或加锁。另一个常见问题是在事务里调用外部接口，网络一慢，连接和行锁就被长时间占着。

## 要点

- 边界放在应用服务层，一个用例一个事务，Controller 和 Repository 不各自开事务。Spring 的 @Transactional 走代理，同类内部 this 调用不生效；默认只在 RuntimeException 和 Error 时回滚，受检异常要写 rollbackFor。
- 事务要短：事务里只做数据库读写，调第三方支付、发短信、发消息放到提交之后（Spring TransactionSynchronization.afterCommit、Django transaction.on_commit，或写进「发件箱模式」的表）；在线请求的单个事务目标 100ms 以内。
- 四个级别各防什么：读未提交基本不防；读已提交防脏读；可重复读再防不可重复读；可串行化再防幻读和写偏斜。两个库的实际行为见下面两条。
- MySQL InnoDB 默认可重复读：普通 SELECT 读第一次读取时建立的快照；SELECT … FOR UPDATE 和 UPDATE 读最新已提交版本，并加 next-key 锁防幻读。所以“普通 SELECT 后按读到的值 UPDATE”依然会丢更新。可串行化会把普通 SELECT 变成加共享锁的读。
- PostgreSQL 默认读已提交：每条语句看到语句开始时已提交的数据。可重复读是快照隔离，并发修改同一行时后提交的一方报 40001（could not serialize access）；可串行化在此基础上还能发现写偏斜。用这两个级别时，业务要捕获 40001 并重试整个事务。
- 怎么选：大多数业务用默认级别，读改写写成条件更新，如 UPDATE sku_stock SET qty = qty - 3 WHERE sku_id = ? AND qty >= 3，再检查影响行数；“先检查多行再写入”的约束（值班排班、额度占用）用可串行化或显式加锁。
- 死锁和锁等待：一次改多行时按主键固定顺序加锁（多个 SKU 按 sku_id 升序扣）。MySQL 死锁报 1213、锁等待超时报 1205，innodb_lock_wait_timeout 默认 50 秒，在线业务调到 5 秒左右；PostgreSQL 死锁报 40P01，用 lock_timeout 限制等待。死锁和序列化失败整体重试 2–3 次，其余错误不重试。
- 长事务监控：MySQL 查 information_schema.innodb_trx，PostgreSQL 查 pg_stat_activity 中 idle in transaction 的会话并设置 idle_in_transaction_session_timeout；超过 5 秒的事务告警。

## 提示词

审查{项目}里{模块}的事务使用，数据库是{MySQL 8 / PostgreSQL 16}，隔离级别{默认 / 已改为某级别}。
1. 盘点：列出所有开事务的位置（注解、手动 begin、atomic 块），标出开在 Controller 或 Repository 层的、事务内调外部 HTTP / 发消息 / 发短信的、同类内部调用导致注解失效的、普通 SELECT 后再 UPDATE 的读改写。
2. 按规则改：事务收到应用服务层，一个用例一个事务；外部调用移到提交之后或写入发件箱；读改写改成条件更新并检查影响行数，或按「乐观锁与悲观锁」加锁；多行加锁按主键固定顺序；用到更高隔离级别的地方捕获 40001 和死锁，整体重试最多 3 次。
3. 为{关键用例，如下单扣库存}写并发测试：50 个并发请求争抢同一 SKU 的 10 件库存，断言成功 10 单、库存为 0 且不为负。
4. 汇报：问题清单、改动文件、并发测试结果、配置改动（锁等待超时、空闲事务超时）。
