---
zh: 签到与连续签到
en: Daily check-in and streaks
aka: 签到 打卡 连续签到 补签 bitmap 位图 SETBIT BITCOUNT BITFIELD 签到日历 签到奖励
order: 50
---

## 是什么

用户每天签一次，展示本月签到日历、累计天数和连续天数，按连续天数发奖励。用 Redis 位图存，一个用户一个月只占 4 字节，一条命令就能取出整月的签到情况。

## 适合

App 每日签到领积分、会员打卡、学习打卡、门店员工打卡的日历展示。

## 不适合

考勤要记精确时间、地点和审批，用数据库逐条记录每次打卡；按签到天数排名看「排行榜」。

## 注意

“今天”按业务时区算（Asia/Shanghai 零点），服务器用 UTC 时会在早上 8 点才跨日；签到日期由服务端决定，不信任客户端传的日期。连续天数跨月时只看当月位图会断开，要接着读上个月的位图，或单独存连续天数。

## 要点

- 量级：日活几千、只要“今天签没签”和发奖，sign_in(user_id, sign_date) 表加唯一索引就够；要日历、连续天数、用户量大时再用位图。
- 键：sign:<用户ID>:<yyyyMM>，第 d 天对应 offset d − 1；10 月 29 日签到执行 SETBIT sign:7321:202610 28 1，返回旧值 1 表示今天已签，直接返回，不重复发奖。
- 日历：BITFIELD sign:7321:202610 GET u31 0 一次取出整月 31 位（1 号在最高位），按位展开成日历；本月累计用 BITCOUNT sign:7321:202610。
- 连续天数：BITFIELD … GET u<今天几号> 0 取出 1 号到今天的位，从最低位往高位数连续的 1；数到 1 号仍是 1 就读上月位图接着数。也可以签到时维护 Hash streak:<用户ID>（last_date、days），昨天签过就加 1，否则置 1。
- 奖励：只在 SETBIT 返回 0 时发，发放记录 (user_id, sign_date, reward_type) 唯一；连续 7 天的奖励在第 7 天发一次，断签后重新计数。
- 补签：每月最多 2 次、消耗积分，只能补本月且不早于 7 天前；补签后重算连续天数，补签奖励按单独的规则发。
- 落库：签到同时写 sign_in 表（可以异步），Redis 是查询用的派生数据，丢失时按表重建。
- 全站统计：当天签到人数用位图 sign:all:<yyyyMMdd>，offset 用用户 ID（要求是紧凑的整数，否则改用 HyperLogLog 估算），BITCOUNT 出人数，BITOP AND 求连续几天都签到的用户。

## 提示词

在{项目}里实现每日签到和连续签到奖励：先确认量级——日活、是否要签到日历和连续天数、奖励规则、是否允许补签、业务时区；只要“今天签没签”时，sign_in 表 (user_id, sign_date) 唯一索引就够。再按以下设计：
1. 位图键 sign:<用户ID>:<yyyyMM>，第 d 天 offset 为 d − 1，日期按 Asia/Shanghai 由服务端计算。
2. 签到用 SETBIT，旧值为 1 直接返回已签；奖励只在旧值为 0 时发，发放记录唯一。
3. 日历用 BITFIELD GET u31 0 一次取整月，累计用 BITCOUNT。
4. 连续天数从今天的位往前数到第一个 0，跨月接着读上月位图。
5. 补签每月最多{补签次数}次，补后重算连续天数。
6. 签到同时落库，Redis 丢失可按表重建。
最后给出压测和对账方法：同一用户并发签到 100 次只发一次奖励；构造跨月、跨年、补签和 UTC 与北京时间跨日的用例；每天比对位图 BITCOUNT 合计与数据库签到记录数。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, code } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, code([{ t: 'sign:7321:202610 · 1 号在最高位', text: `
# 1 号 → 29 号：1111 0111 1111 1111 1111 1111 0111 1
SETBIT sign:7321:202610 28 1
# 返回 0：今天首签，发积分；返回 1：已签过
BITCOUNT sign:7321:202610
# 27：本月累计 27 天
BITFIELD sign:7321:202610 GET u29 0
# 从最低位数连续的 1：连续 4 天
` }]), { title: '签到位图 · 一个月 4 字节' });
}
</script>
