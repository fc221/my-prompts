---
zh: 乐观锁与悲观锁
en: Optimistic and pessimistic locking
aka: version 版本号 SELECT FOR UPDATE SKIP LOCKED 分布式锁 超卖 并发更新 CAS
order: 20
---

## 是什么

多个请求同时改同一条数据时防止互相覆盖。乐观锁假设冲突少：更新时带上读到的版本号，被别人改过就失败重来；悲观锁假设冲突多：先锁住行，别人排队。只有跨进程、跨库的互斥才需要分布式锁。

## 适合

库存扣减、积分余额变动、两个客服同时处理一张工单、报销单审批中申请人又去修改。

## 不适合

一条带条件的 UPDATE 就能表达的（qty >= 3）直接条件更新，比加锁简单，见「事务边界与隔离级别」；接口层面的并发编辑提示（If-Match、412）看「缓存与并发控制」；重复提交看「幂等键」。

## 注意

分布式锁不能单独保证正确：持锁进程卡住（GC 停顿、网络抖动）超过锁的过期时间，锁自动释放，另一个进程拿到锁，两边同时写。最终兜底的仍然是数据库里的版本号或条件更新。

## 要点

- 乐观锁：表加 version INT NOT NULL DEFAULT 0，更新写成 UPDATE … SET …, version = version + 1 WHERE id = ? AND version = ?，影响行数为 0 即冲突；优先用 ORM 自带支持（JPA @Version、MyBatis-Plus @Version、ActiveRecord lock_version）。
- 冲突处理：后台任务自动重读重试 3 次并带退避；用户操作（客服编辑工单）返回 409 和最新数据，用户确认后再提交，不静默覆盖。
- 悲观锁：在事务里 SELECT … FOR UPDATE 锁行，条件必须精确命中索引，MySQL 在可重复读下没命中索引会锁住大范围的行；只需防止被改的读用 FOR SHARE（MySQL 8.0 起，旧写法 LOCK IN SHARE MODE）。
- 不等待：抢单、领取工单这类“拿不到就换一个”的场景用 FOR UPDATE NOWAIT 或 SKIP LOCKED（MySQL 8.0、PostgreSQL 9.5 起）；用表做任务队列时，SKIP LOCKED 让多个消费者各取不同的行。
- 选型：读多写少、冲突率低用乐观锁；秒杀、爆款 SKU 冲突率高，乐观锁会大量重试，改用条件更新，或把库存预扣到 Redis 再异步落库；锁持有期间只做数据库操作。
- 分布式锁：Redis 用 SET 锁键 随机值 NX PX 30000 加锁，释放时用 Lua 脚本比对值再删除；锁键带业务含义，如 lock:settle:<门店ID>:<营业日>；任务可能超过过期时间就续期（如 Redisson 的看门狗）。PostgreSQL 项目可以用 pg_advisory_xact_lock，MySQL 可以用 GET_LOCK，少引入一个依赖。
- 防护令牌：分布式锁保护的写入，同时带单调递增的令牌或版本号做条件更新，过期的旧持有者写入时条件不满足而失败。
- 测试：20 个线程同时修改同一个积分账户，断言最终余额等于各笔变动之和，冲突次数被记录下来。

## 提示词

检查{项目}里{资源名，如积分账户、库存、工单}的并发更新，数据库是{MySQL / PostgreSQL}，Redis：{有 / 无}。
1. 盘点：找出这类资源的所有更新路径，标出“先查、再改、再写回”且没有并发控制的、FOR UPDATE 不走索引的、锁内调用外部服务的、分布式锁没有过期时间或释放时不校验持有者的地方。
2. 按规则改：能用一条条件更新表达的改成条件更新并检查影响行数；冲突少的加 version 乐观锁，后台任务冲突重试 3 次带退避，用户操作冲突返回 409 和最新数据；冲突多或必须排队的用 SELECT … FOR UPDATE，精确命中索引、按主键顺序加锁，抢占类场景用 SKIP LOCKED；分布式锁用 SET NX PX 加随机值、Lua 校验后释放，并用版本号兜底。
3. 写并发测试：{并发数}个请求同时修改同一条记录，断言最终数据正确、没有负数、冲突被正确返回。
4. 汇报：每条更新路径原来的问题和现在的方案、改动文件、测试结果。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, seq } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, seq(['客服 A', 'ticket 表', '客服 B'], [
    [0, 1, '读到 version 7'],
    [2, 1, '读到 version 7'],
    [0, 1, 'WHERE version = 7'],
    [1, 0, '1 行，version → 8', 'r'],
    [2, 1, 'WHERE version = 7'],
    [1, 2, '0 行：已被改过', 'rx'],
    [2, 2, '返回 409 和最新数据'],
  ]), { title: '乐观锁 · 两个客服同时改一张工单' });
}
</script>
