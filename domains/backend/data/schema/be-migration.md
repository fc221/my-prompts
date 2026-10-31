---
zh: 数据库迁移
en: Database migrations
aka: 数据库变更 schema migration Flyway Liquibase Alembic 在线 DDL 零停机 先加后删
order: 30
---

## 是什么

表结构和必要的数据修正都写成按顺序编号的迁移文件，随代码一起评审、一起发布，任何环境都能从空库按顺序重放到最新。线上变更按“先加后删”拆成多次发布，保证发布过程中新旧两版代码都能正常读写。

## 适合

加列、改类型、改名、拆表；给大表加索引或约束；回填历史数据；多实例滚动发布时的结构变化。

## 不适合

表结构本身怎么设计看「表设计约定」；索引怎么选看「索引设计」；跨库搬数据和分片扩容看「读写分离与分库分表」。

## 注意

滚动发布时新旧两版代码同时连着同一个库，直接改名或删列，旧版实例会立刻报错。另一个坑是 DDL 排队等锁：MySQL 的 ALTER 要拿元数据锁（MDL），前面有一个没提交的长事务它就一直等，后面所有读写跟着排队；PostgreSQL 的 ALTER TABLE 拿 ACCESS EXCLUSIVE 锁，情况一样。

## 要点

- 工具：用项目已有的迁移工具（Flyway、Liquibase、Alembic、Django migrations、Prisma Migrate、golang-migrate、Rails migrations），文件名带版本号或时间戳和动作，如 V20261029_1030__add_refund_status_to_orders.sql；在任何共享环境执行过的迁移不再修改，修正写成新文件。
- 先加后删，至少两次发布：第一次加新列（允许 NULL 或带常量默认值），代码双写新旧列，回填历史数据，核对一致后读切到新列；第二次在确认旧列没有任何读写后，删除旧列和相关代码。每一步都能单独回滚。
- 加列：MySQL 8.0.12 起加列默认走 INSTANT（8.0.29 起任意位置都可以），PostgreSQL 11 起带常量默认值的加列不重写表；NOT NULL 约束放到回填完成之后再加。
- 锁超时：迁移会话先设上限，PostgreSQL SET lock_timeout = '5s'，MySQL SET SESSION lock_wait_timeout = 5，拿不到锁就失败、稍后重试；执行前查长事务（information_schema.innodb_trx、pg_stat_activity）。
- 大表：PostgreSQL 建索引用 CREATE INDEX CONCURRENTLY，加外键和 CHECK 先 NOT VALID 再 VALIDATE CONSTRAINT；MySQL 千万行以上的表改结构用 gh-ost 或 pt-online-schema-change。
- 事务性：PostgreSQL 的 DDL 能放进事务、失败整体回滚，但 CONCURRENTLY 必须放在不带事务的单独迁移里（Flyway 关闭该脚本的事务、Django atomic = False、Rails disable_ddl_transaction!）；MySQL 的 DDL 会隐式提交，一个迁移文件只放一条 DDL，失败时能确定停在哪一步。
- 数据回填：和结构迁移分开写；按主键范围每批 1000 行左右推进，批间短暂停顿；可重复执行（WHERE 新列 IS NULL）；回填期间观察主从延迟。
- 发布检查：CI 从空库跑一遍全部迁移再跑测试；每个迁移写明回滚方式（down 脚本，或“不可回滚，由上一步兜底”）；大表变更先在生产规模的副本上量执行时间。

## 提示词

在{项目}里完成这次表结构变更：{变更内容，如把 orders.pay_amount 从 DOUBLE 改成 DECIMAL(18,2)}。数据库是{MySQL 8 / PostgreSQL 16}，服务多实例滚动发布。
1. 盘点：确认项目的迁移工具和命名规则；找出读写这张表这些列的全部代码；估算表行数和峰值写入量，判断是否需要在线变更工具。
2. 按先加后删拆成两次发布：第一次加新列（可空）、代码双写新旧列、分批回填（每批约 1000 行、可重复执行），核对一致后读切到新列；第二次删除旧列的读写代码和旧列本身。
3. 每个迁移会话先设锁超时（lock_timeout / lock_wait_timeout）；PostgreSQL 建索引用 CONCURRENTLY 并放进不带事务的迁移；MySQL 一个文件一条 DDL，大表用在线变更工具。
4. 汇报：每次发布包含的迁移文件和代码改动、回填脚本、每步回滚办法、核对 SQL（新旧列不一致的行数为 0）以及 CI 从空库重放的结果。
