---
zh: 抢票与库存锁定
en: Ticket booking and inventory hold
aka: 抢票 选座 锁座 库存锁定 预占库存 释放库存 场次 座位 演出票 预约时段 锁定超时
order: 30
---

## 是什么

用户选中具体座位或时段后先锁定一段时间，付款成功才真正卖出，超时自动释放给别人。和秒杀不同，这里的库存有身份（3 排 12 座、周六 14:00 的 2 号技师），要防同一份资源卖给两个人，并管好可售、锁定、已售三种状态。

## 适合

演出和赛事选座、影院选座、景区和场馆分时段预约、门店预约到具体技师和时段。

## 不适合

只按数量卖、不分具体座位的抢购看「秒杀」；下单、扣款、锁库存分在多个服务里的编排看「Saga 长事务」。

## 注意

锁定以服务端的 hold_until 为准，支付成功的通知可能晚于锁定截止才到，这时座位也许已经释放并被别人锁走，不能直接改成已售，要自动退款。释放不能只靠 Redis 键过期：数据库里的锁定记录同样有截止时间，由延迟任务和兜底扫描一起释放。

## 要点

- 量级：热门场次 2000 座、开票瞬间几万人才需要 Redis 前置；普通场次直接用数据库条件更新就够。
- 表：seat_inventory(show_id, seat_id, status 0 可售 1 锁定 2 已售, hold_order_id, hold_until, version)，主键 (show_id, seat_id)；只分票档不分座位的用 ticket_tier(show_id, tier, total, held, sold)。
- 锁座：一条条件更新锁住所选全部座位，UPDATE seat_inventory SET status = 1, hold_order_id = ?, hold_until = NOW() + INTERVAL 10 MINUTE WHERE show_id = ? AND seat_id IN (…) AND (status = 0 OR (status = 1 AND hold_until < NOW()))；影响行数不等于所选座位数就整体回滚，返回已被选走的座位并刷新座位图。
- 限制：单个用户同一场次最多锁 4 座，同时只能有 1 笔待支付订单；倒计时显示服务端返回的 hold_until。
- 释放：锁座成功时投递 10 分钟的延迟任务（见「订单超时取消与延迟任务」），到期订单仍未支付就 UPDATE … SET status = 0, hold_order_id = NULL WHERE hold_order_id = ? AND status = 1；另加每分钟扫描 hold_until 已过的锁定兜底。
- 确认：支付成功时 UPDATE … SET status = 2 WHERE hold_order_id = ? AND status = 1，影响行数小于座位数说明锁已过期，自动原路退款并通知用户。
- 热门场次：开票前把座位状态预热到 Hash seat:<场次ID>（座位号 → 状态），用 Lua 一次检查并锁定多个座位，同时把订单号和截止时间写入有序集合 hold:<场次ID>；数据库异步落锁定记录。
- 座位图：查询走缓存，1–2 秒刷新一次，不追求强一致；真正的判定只在锁座那一步。

## 提示词

在{项目}里实现{场次 / 预约时段}的锁定与售卖：先确认量级——单场座位数、开票峰值人数、选具体座位还是只按票档、锁定时长和支付时限；峰值不高时直接用数据库条件更新锁座，不上 Redis。再按以下设计：
1. 建 seat_inventory 表，主键 (show_id, seat_id)，status 可售 / 锁定 / 已售，带 hold_order_id、hold_until。
2. 锁座用一条条件更新锁住所选全部座位，影响行数不对就回滚并返回被选走的座位；单用户同场次最多{每单座位上限}座。
3. 锁定时投 10 分钟延迟任务，到期未支付按 hold_order_id 释放，另加每分钟兜底扫描。
4. 支付成功按 hold_order_id 改为已售，影响行数不足时自动退款并通知。
5. 热门场次把座位状态预热到 Redis Hash，用 Lua 原子检查并锁定。
最后给出压测和对账方法：1000 个并发抢同一排座位，断言每个座位只属于一个订单；每场结束核对已售座位数 = 已支付订单的座位数，锁定中的座位都还在有效期内。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, seq } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, seq(['用户', '票务服务', '座位表', '支付'], [
    [0, 1, '选 3 排 12、13 座'],
    [1, 2, '锁座 0 → 1'],
    [2, 1, '2 行 · 锁到 20:10', 'r'],
    [1, 1, '投 10 分钟延迟释放'],
    [3, 1, '支付成功通知'],
    [1, 2, '锁定 → 已售'],
    [2, 1, '0 行 → 退款', 'rx'],
  ]), { title: '锁座 · 支付确认 · 超时' });
}
</script>
