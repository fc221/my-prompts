---
zh: 索引设计
en: Index design
aka: 联合索引 最左前缀 覆盖索引 区分度 慢查询 EXPLAIN 回表
order: 20
---

## 是什么

按查询建索引：先列出高频和慢的 SQL，再决定建哪些单列、联合和唯一索引，最后用 EXPLAIN 确认确实走上了。索引让读变快，代价是写入、存储和改表都变贵，所以每个索引都要对应到具体的查询。

## 适合

慢查询优化；新功能上线前给新查询配索引；列表页加了筛选和排序；清理重复和闲置的索引。

## 不适合

数据量超出单表承受范围看「读写分离与分库分表」；循环里逐条查询是 N+1，看「ORM 与 N+1 查询」；关键词模糊搜索改用搜索引擎，或 PostgreSQL 的 pg_trgm、全文检索。

## 注意

联合索引的列顺序决定它能服务哪些查询，顺序错了等于没建。另一个高频问题是索引列上套了函数或发生隐式类型转换（手机号列是字符串，却拿数字去比），索引直接失效，EXPLAIN 一看就是全表扫描。

## 要点

- 最左前缀：联合索引 (a, b, c) 能服务 a、a+b、a+b+c 的条件，只查 b 或 c 用不上；范围条件（>、<、BETWEEN、LIKE 前缀）之后的列不再缩小扫描范围。MySQL 8.0.13 和 PostgreSQL 18 起有跳跃扫描，只在前导列取值很少时生效，设计时按没有它来算。
- 列顺序：等值条件列在前，范围列在后，排序列紧跟等值列。等值列之间，先放其他查询也会单独用到的列，其次放区分度高的；区分度 = COUNT(DISTINCT 列) / COUNT(*)，性别、是否启用这类低区分度列只作联合索引的后缀。
- 例子：“会员按下单时间倒序翻订单”建 (member_id, created_at)；“处理人的待办工单按创建时间排”建 (tenant_id, assignee_id, status, created_at)。
- 覆盖索引：查询的列都在索引里就不用回表。InnoDB 的二级索引自带主键，EXPLAIN 的 Extra 出现 Using index；PostgreSQL 用 INCLUDE 带上非键列（11 起），计划里是 Index Only Scan，效果依赖 VACUUM 及时更新可见性映射。
- 失效写法：DATE(created_at) = 某天 改成半开区间范围；隐式类型转换按列类型传参；LIKE '%关键词' 走不了普通索引；不同列的 OR 改成 UNION ALL。PostgreSQL 可以建表达式索引和部分索引（WHERE status = 'PENDING'），MySQL 8.0.13 起有函数索引，没有部分索引。
- 数量：单表索引一般不超过 6 个，联合索引不超过 5 列；(a) 被 (a, b) 的最左前缀覆盖时删掉 (a)，唯一索引除外。
- 验证和清理：每个新索引附上它服务的 SQL 和 EXPLAIN（MySQL type 不是 ALL、rows 合理；PostgreSQL 不是 Seq Scan）；闲置索引用 MySQL 的 sys.schema_unused_indexes、PostgreSQL 的 pg_stat_user_indexes.idx_scan 找，MySQL 8.0 删除前可先设 INVISIBLE 观察一周。
- 大表建索引：PostgreSQL 用 CREATE INDEX CONCURRENTLY（不能在事务里执行），MySQL 8.0 用 ALGORITHM=INPLACE, LOCK=NONE，按「数据库迁移」在低峰执行。

## 提示词

为{项目}的{模块}做索引审查，数据库是{MySQL 8 / PostgreSQL 16}。
1. 盘点：从慢查询日志（MySQL slow_query_log，PostgreSQL pg_stat_statements）和代码里的 Repository / Mapper 找出这个模块的查询，按频率和耗时取前 20 条，逐条跑 EXPLAIN，记下现用索引和扫描行数；列出这些表的现有索引。
2. 按规则改：为每条查询设计索引，等值列在前、范围列在后、排序列跟在等值列后，能覆盖就覆盖；改掉索引列上套函数、隐式类型转换、左模糊这类失效写法；删掉被最左前缀覆盖的重复索引，单表控制在 6 个以内。
3. 索引变更写成迁移，大表用 CREATE INDEX CONCURRENTLY 或 ALGORITHM=INPLACE, LOCK=NONE；删除前确认 idx_scan 为 0 或已设 INVISIBLE 观察过。
4. 汇报：一张清单，每行是 SQL、原索引、新索引、改前改后的 EXPLAIN 关键行和耗时；附新增和删除的索引及迁移文件路径。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, code } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, code([{ t: '会员按下单时间倒序翻订单', text: `
CREATE INDEX idx_member_created
  ON sales_order (member_id, created_at);
-- 用得上：最左列等值，排序列紧跟
WHERE member_id = ? ORDER BY created_at DESC
-- 用不上：跳过了最左列 member_id
WHERE created_at >= '2026-10-01'
-- 失效：列上套函数，改成半开区间
WHERE DATE(created_at) = '2026-10-29'
-- 验证：EXPLAIN 的 type 不是 ALL
` }]), { title: '联合索引 · 最左前缀' });
}
</script>
