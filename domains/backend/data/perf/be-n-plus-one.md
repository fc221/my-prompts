---
zh: ORM 与 N+1 查询
en: ORM and N+1 queries
aka: N+1 懒加载 预加载 JOIN FETCH EntityGraph select_related prefetch_related eager loading
order: 30
---

## 是什么

先查出 N 条主记录，再在循环里为每条记录各查一次关联数据，一共 1+N 次查询。列表页 20 个订单各自去查商品明细和会员信息，就是 41 次查询；数据量和并发一上来，数据库和连接池先撑不住。

## 适合

列表接口、导出、报表、批处理里出现循环查询；“本地很快、线上很慢”的接口；评审用了 ORM 关联的代码。

## 不适合

单条 SQL 本身慢是索引问题，看「索引设计」；一次要查几万行，属于分页和批处理问题，看「分页」。

## 注意

用 JOIN 一次抓取一对多关联再分页，ORM 会把全部结果拉进内存再分页（Hibernate 会打出“在内存里分页”的警告），一对多的列表改为“先分页查主表 ID，再 IN 批量查子表”。最隐蔽的是序列化触发的懒加载：代码里没写查询，JSON 序列化遍历关联属性时一条一条地查。

## 要点

- 规则：列表和批量接口的查询次数与返回条数无关，是一个常数（主表 1 次加每种关联 1 次）；循环体里不出现查询和远程调用。
- 多对一（订单的会员、门店）用 JOIN 一次取回：JPA 的 JOIN FETCH 或 @EntityGraph，Django select_related，SQLAlchemy joinedload，GORM Joins，ActiveRecord eager_load，Laravel with。
- 一对多（订单的商品明细）用第二条 IN 查询批量取：Django prefetch_related，SQLAlchemy selectinload，Hibernate @BatchSize 或 hibernate.default_batch_fetch_size，GORM Preload，ActiveRecord preload，EF Core AsSplitQuery；IN 列表超过 1000 个时分批。
- 默认懒加载：JPA 的 @ManyToOne 默认是 EAGER，统一改为 LAZY，需要时在查询里显式抓取；接口返回 DTO 而不是实体，避免序列化时触发懒加载（见「接口模型与领域模型分开」）。
- 开发期就报错：Rails strict_loading、Laravel Model::preventLazyLoading()、SQLAlchemy lazy='raise'、Hibernate 开 generate_statistics；Spring Boot 项目关闭 spring.jpa.open-in-view（默认开启，启动时会打警告）。
- 测试里断言查询次数：Django assertNumQueries，Java 用 Hibernate Statistics 或数据源代理计数，其他框架用查询日志计数；同一接口在 1 条和 50 条数据下的查询次数相同。
- 跨服务也一样：查 20 个订单的商品信息，调商品服务的批量接口一次传 20 个 ID，在内存里按 ID 组装。
- MyBatis 的 association / collection 用 select 属性做嵌套查询就是 N+1，改用嵌套结果映射（一条 JOIN）或手写 IN 批量查询。

## 提示词

排查并修复{项目}里{模块或接口}的 N+1 查询，ORM 是{JPA / MyBatis / Django ORM / SQLAlchemy / GORM / ActiveRecord / Eloquent / Prisma}。
1. 盘点：打开 SQL 日志，分别用 1 条和 50 条数据调用{列表接口}，记录查询次数；在代码里找出循环内的查询和远程调用、默认 EAGER 的关联、直接序列化实体触发的懒加载。
2. 按规则改：多对一关联用 JOIN 一次取回；一对多先分页取主表 ID，再 IN 批量查子表（超过 1000 个分批），不用 JOIN 抓取集合再分页；跨服务改调批量接口；接口返回 DTO；开发环境打开懒加载检测。
3. 加测试：断言该接口在 1 条和 50 条数据下查询次数相同，并在用例里写明期望次数。
4. 汇报：每个接口改前改后的查询次数和耗时、改动文件、新增测试。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, code } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, code([
    { t: 'N+1：41 次查询', text: `
SELECT … FROM orders
  LIMIT 20;
-- 循环 20 次，每单两条
SELECT … FROM order_item
  WHERE order_id = ?;
SELECT … FROM member
  WHERE id = ?;
-- 1 + 20 × 2 = 41 次
` },
    { t: '批量：2 次查询', text: `
-- 多对一：JOIN 一次取回
SELECT … FROM orders
  JOIN member ON …
  LIMIT 20;
-- 一对多：IN 批量查
SELECT … FROM order_item
  WHERE order_id IN (…);
-- 20 条和 50 条都是 2 次
` },
  ]), { title: '列表页 20 个订单 · 查询次数和条数无关' });
}
</script>
