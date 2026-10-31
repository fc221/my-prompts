---
zh: 转账与余额
en: Transfers and balances
aka: 账户余额 转账 记账 复式记账 流水 冻结 解冻 余额扣减 热点账户 钱包 储值卡 冲正
order: 50
---

## 是什么

会员储值、钱包、商户结算户、积分账户之间的余额变动。每一笔变动都记一条只追加、不修改的流水，余额是流水累计的结果；转账就是在同一个事务里写一借一贷两条流水，借贷金额相等。

## 适合

会员储值卡和钱包余额、商户待结算与可提现账户、积分和代金券账户、平台内部账户之间的划拨。

## 不适合

和外部支付渠道之间的收款、退款看「支付与对账」；两个账户在不同服务、不同库里时，用「Saga 长事务」做冻结、扣减、解冻的编排，能放进同一个库的先放进同一个库做本地事务。

## 注意

“读出余额、算好、写回去”在并发下会丢更新，扣减必须是带余额条件的 UPDATE。转账要锁两个账户时一律按 account_id 从小到大加锁，否则 A 转 B 和 B 转 A 同时发生会死锁。错账也不改历史流水，而是再记一笔反向流水。

## 要点

- 量级：单库、没有热点账户时，条件更新加流水表就够，不需要 TCC 或缓冲记账；单账户每秒几十笔以上入账才考虑热点方案。
- 表：account(account_id, user_id, type 储值 / 积分 / 待结算, balance, frozen, currency, version)，account_ledger(ledger_id, txn_no, account_id, direction 借 / 贷, amount, balance_after, biz_type, biz_no, created_at)；金额为分的 BIGINT；(biz_type, biz_no, account_id, direction) 唯一，重复请求返回首次结果（见「幂等键」）。
- 扣款：UPDATE account SET balance = balance − ?, version = version + 1 WHERE account_id = ? AND balance >= ?，影响 0 行返回余额不足；随后插入流水并记 balance_after。
- 转账：同一事务里按 account_id 升序执行两条条件更新（或先按升序 SELECT … FOR UPDATE），写一借一贷两条流水和一条 transfer(txn_no, from_id, to_id, amount, status) 记录；事务里不调外部服务。
- 冻结：提现、待确认交易先冻结，UPDATE … SET balance = balance − ?, frozen = frozen + ? WHERE account_id = ? AND balance >= ?；成功再扣减 frozen，失败解冻；冻结单有状态和超时，超时未确认自动解冻。
- 热点账户：平台收款户、大商户每秒上百笔入账时，入账只写流水，每 1–5 秒按账户汇总一次更新余额；或拆成 8 个子账户随机入账，查询时求和。扣减必须实时，不能缓冲。
- 校验：每日任务按账户核对 balance + frozen = 期初 + 贷方合计 − 借方合计，并核对全平台借贷相等；有差异先冻结该账户再告警。
- 冲正：错账记一笔 biz_type = reversal、关联原流水的反向流水；人工调账要审批并写审计日志。

## 提示词

在{项目}里实现{账户类型，如会员储值、商户结算户}的余额与转账：先确认量级——账户数、日交易笔数、是否有热点账户（单账户每秒几十笔以上入账）、两个账户是否在同一个库；单库且没有热点时，条件更新加流水表就够。再按以下设计：
1. 建 account 和 account_ledger 表，金额为分，流水只追加，(biz_type, biz_no, account_id, direction) 唯一保证幂等。
2. 扣款用 WHERE balance >= 金额 的条件更新，影响 0 行返回余额不足，流水记 balance_after。
3. 转账在同一事务里按 account_id 升序更新两个账户，写一借一贷两条流水，事务内不调外部服务。
4. 提现等待确认的交易先冻结，再扣减或解冻，冻结单带超时。
5. 热点入账账户改为流水先行，每{汇总间隔}秒批量更新余额。
6. 错账只记反向流水。
最后给出压测和对账方法：100 个线程在 10 个账户之间随机互转 10 万次，断言总额不变、没有负余额、没有死锁；写日终任务核对每个账户余额与流水净额一致、全平台借贷相等，差异告警。
