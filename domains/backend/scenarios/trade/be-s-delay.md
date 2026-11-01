---
zh: 订单超时取消与延迟任务
en: Order timeout and delayed jobs
aka: 延迟队列 延时任务 订单超时 自动取消 超时关单 时间轮 Redis ZSET 延迟消息 定时消息 死信 自动确认收货
order: 60
---

## 是什么

让一件事在指定时间之后执行：下单 30 分钟未支付自动关闭并释放库存、发货 7 天后自动确认收货、预约前 1 小时提醒。核心是“到点触发，触发时再查一次状态”，触发早几秒、晚几秒、重复触发都不能出错。

## 适合

订单超时关闭、锁座释放、优惠券到期、自动好评、工单超时升级、预约提醒。

## 不适合

按固定时刻跑批（每天凌晨对账）用「定时任务」；要马上执行的异步工作用「后台任务队列」。

## 注意

延迟任务只是提醒“该检查了”，执行时必须重新查状态并用条件更新：UPDATE orders SET status = 'CLOSED' WHERE order_no = ? AND status = 'PENDING'。用户在第 29 分 59 秒付款、关单任务在第 30 分钟到达，两边只有一个能成功；关单后又收到支付成功通知的，走自动退款（见「支付与对账」）。任何延迟方案都可能丢或晚到，要有兜底扫描。

## 要点

- 量级：每天几千单、误差 1 分钟可接受，每分钟扫一次就够：SELECT order_no FROM orders WHERE status = 'PENDING' AND expire_at < NOW() LIMIT 500，建 (status, expire_at) 索引；每天几万单以上或要秒级准时再上延迟队列。进程内的 DelayQueue、setTimeout 重启就丢，只用于可丢的短超时。
- Redis 有序集合：下单时 ZADD delay:order_close <到期毫秒时间戳> <订单号>；消费者每秒用一条 Lua 执行 ZRANGEBYSCORE delay:order_close 0 <当前时间> LIMIT 0 100，取出后从原集合 ZREM 并写入 delay:processing（分数为当前时间），处理成功再删；多实例同时取也不会重复，processing 里超过 60 秒的由巡检放回。
- 消息队列：RocketMQ 5.x 的定时消息可以指定投递时间（最长时长受 broker 配置限制），4.x 只有 18 个固定延迟等级；RabbitMQ 用消息 TTL 加死信交换机时，同一队列里的消息要用相同 TTL（按时长分队列），否则队头的长 TTL 消息会挡住后面的；Kafka 没有原生延迟投递。
- 执行：消费者按订单号查状态，PENDING 才关单，在同一事务里（或经「发件箱模式」）释放库存、退回优惠券；已支付或已关闭直接确认消息，不报错。
- 兜底：每 5 分钟扫描 expire_at 已过 10 分钟仍为 PENDING 的订单补关，补关数量作为延迟队列是否健康的指标，大于 0 就告警。
- 长延迟：7 天后确认收货这类任务不往队列里塞 7 天的消息，先写 scheduled_task(biz_type, biz_no, run_at, status) 表，run_at 建索引，由扫描任务把未来 10 分钟内到期的搬进延迟队列。
- 临界：时间以订单上的 expire_at 为准，前端倒计时只展示；距 expire_at 不足 1 分钟时不再拉起支付，减少和关单撞车。

## 提示词

在{项目}里实现{业务对象}超时{动作，如关闭、确认收货}：先确认量级——每天新增多少待超时的单、超时时长、允许误差；日均几千单且误差 1 分钟可接受时，每分钟按 (status, expire_at) 索引扫描就够。再按以下设计：
1. 创建时写 expire_at，并投递延迟任务：{Redis 有序集合 / 消息队列定时消息}；Redis 方案 ZADD 到期时间戳，消费者每秒用 Lua 取出到期成员并移入处理中集合，处理成功再删。
2. 执行时重新查状态，WHERE status = 'PENDING' 条件更新关单，同事务释放库存和优惠券；状态已变直接确认。
3. 每 5 分钟兜底扫描超时 10 分钟仍未关闭的单，有补关就告警。
4. 7 天这类长延迟先存表，到期前 10 分钟再搬进延迟队列。
5. 关单后又收到支付成功，走自动退款。
最后给出压测和对账方法：一次投递 10 万个 1 分钟后到期的任务，统计触发延迟 P99 和重复执行次数；杀掉消费者再启动，确认不丢；每天核对 expire_at 已过仍为 PENDING 的单数为 0。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, flow } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, flow([
    [{ t: '下单', note: 'expire_at = 下单 + 30 分钟' }, { t: 'ZADD 延迟集合', note: '分数 = 到期毫秒数' }, { t: '每秒取到期', note: 'Lua 取出移入处理中', acc: true }, { t: '条件关单', note: "仅 status = 'PENDING'" }],
    [{ t: '消费者崩溃', note: '处理中超 60 秒', bad: true, via: '失败时' }, { t: '巡检放回', note: '重新投递' }, { t: '兜底扫描', note: '每 5 分钟，补关就告警' }, { t: '已支付 · 0 行', note: '确认消息，不关单' }],
  ]), { title: '订单 30 分钟未支付自动关闭' });
}
</script>
