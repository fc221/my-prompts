---
zh: 表设计约定
en: Table design conventions
aka: 建表规范 字段类型 命名规范 schema 设计 金额字段 时间字段
order: 10
---

## 是什么

建表时统一命名、主键、字段类型和约束的一套规则：表名列名怎么起、金额和时间用什么类型、哪些列必须 NOT NULL、唯一性靠什么保证。规则定下来，新表照着建，老表通过迁移逐步对齐。

## 适合

新项目的第一批表；新增订单、库存流水、积分账户、报销单这类业务表；评审建表语句；老库字段类型混乱要统一。

## 不适合

索引怎么建看「索引设计」；created_at、deleted_at 这些公共列看「软删除与审计字段」；按租户隔离看「多租户数据隔离」；接口里时间和金额怎么传看「时间、金额与 ID 格式」。

## 注意

金额用浮点、时间存本地时区是最难回头的两个错误：数据写进去以后再改类型，要全表迁移再对账。另一个是唯一性只在代码里“先查后插”，并发下一定会出重复，唯一性要落成数据库的唯一索引。

## 要点

- 命名：表名列名用小写 snake_case，单复数全库统一一种；避开保留字（order、user、group、desc），订单表叫 sales_order 或 orders；布尔列用 is_ 或 has_ 开头，外键列写成 关联表名_id，如 member_id。
- 主键：列名统一 id，用 BIGINT 自增或时间有序的 ID（雪花算法、UUIDv7）。InnoDB 的主键就是聚簇索引，随机 UUIDv4 做主键会频繁页分裂；对外展示的单号（SO2026102900017）另设唯一列，自增 id 不当业务单号用。
- 金额：DECIMAL(18,2) 或 BIGINT 存“分”，全库只用其中一种，存分时列名带单位（pay_amount_cent）；FLOAT / DOUBLE 不用于金额，PostgreSQL 的 money 类型受 lc_monetary 影响也不用；多币种另加 currency CHAR(3)。积分、库存用整数。
- 时间：一律存 UTC。PostgreSQL 用 timestamptz；MySQL 用 DATETIME(3)，连接参数把 time_zone 设为 '+00:00'；MySQL 的 TIMESTAMP 只到 2038-01-19，新表不用。生日、营业日这类没有时区含义的日期用 DATE。
- 字符：MySQL 用 utf8mb4（utf8 即 utf8mb3，存不了 emoji 和部分生僻字），排序规则全库统一（8.0 默认 utf8mb4_0900_ai_ci）；PostgreSQL 用 text 或 varchar(n)。手机号、身份证号、邮编用字符串存。
- 状态：用 VARCHAR(32) 存大写英文值（PENDING_PAYMENT、PAID、CANCELLED）或 SMALLINT 对应代码里的枚举，列注释写全取值；MySQL 的 ENUM 类型加值要改表，用字符串代替。
- 约束：能 NOT NULL 就 NOT NULL 并给默认值；业务唯一性（同租户的员工工号、同一订单里的 SKU 行）建唯一索引；外键是否落库全项目定一种，不落库时在列注释写清指向哪张表。
- 每张表每一列都写注释（MySQL COMMENT，PostgreSQL COMMENT ON）；长文本和大 JSON 拆到附表；JSON 列只放不参与筛选的扩展属性，要查的字段升成普通列。

## 提示词

检查{项目}的表结构是否符合「表设计约定」，数据库是{MySQL 8 / PostgreSQL 16}，范围是{模块或表名}。
1. 盘点：逐表列出命名、主键、金额、时间、字符集、状态列、NOT NULL 和唯一约束的现状，标出不合规的列和当前类型。
2. 按规则改：snake_case 并避开保留字；主键 BIGINT 或时间有序 ID，对外单号另设唯一列；金额统一 DECIMAL(18,2) 或 BIGINT 分（沿用项目已有的那种）；时间存 UTC（PostgreSQL timestamptz，MySQL DATETIME(3) 加连接 time_zone '+00:00'）；MySQL 用 utf8mb4；状态用字符串或小整数并在注释写全取值；业务唯一性建唯一索引；每列补注释。
3. 已上线的表按「数据库迁移」的先加后删分步改，附数据回填和核对 SQL。
4. 汇报：每张表改了什么、迁移文件路径、哪些改动需要回填或停写窗口，以及核对结果（新旧列抽样一致、金额合计与改前相等）。
