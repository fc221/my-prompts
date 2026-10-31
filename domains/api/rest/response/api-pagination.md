---
zh: 分页
en: Pagination
aka: 游标分页 offset 分页 cursor 翻页 nextCursor 加载更多 keyset
order: 20
---

## 是什么

列表 API 每次只返回一页。两种常用方式：offset 分页（page、pageSize，能跳页、能给总数）和游标分页（cursor、limit，从上一页最后一条的位置接着取，数据变动时不漏不重）。

## 适合

所有列表 API。后台表格要跳页、要总数时用 offset；消息流、订单流水、操作日志这类持续增长、按时间倒序看的列表，以及百万行以上的大表，用游标。

## 不适合

一次拿全量做导出看「长任务异步化」；过滤和排序参数看「过滤、排序与字段选择」；前端滚动加载的交互看「无限滚动与加载更多」。

## 注意

offset 越往后越慢（OFFSET 100000 要先扫过前面所有行），翻页期间有新增或删除时会重复或漏掉条目。游标分页的排序必须唯一且稳定：只按 createdAt 排，时间相同的记录会在分页边界丢失，要加 id 作第二排序键。

## 要点

- offset：参数 page（从 1 开始）和 pageSize（默认 20，上限 100，超出时截到上限还是返回 400，全项目统一一种）；返回 items、page、pageSize、total。
- 大表上 COUNT 很慢时，total 改成估算值或只返回 hasMore，并在文档写明。
- offset 设最大深度（如只允许翻到前 10000 条），更深的引导用户加筛选条件或改用游标。
- 游标：参数 cursor 和 limit；返回 items、nextCursor（没有下一页时为 null）和 hasMore；需要往回翻时加 prevCursor。
- 游标是不透明字符串：服务端把最后一条的排序值和 id 编码成 base64url，客户端原样传回；游标里带上排序和过滤条件，条件变了还用旧游标返回 400。
- 游标查询写成 WHERE (createdAt, id) < (上一页最后一条的值) ORDER BY createdAt DESC, id DESC LIMIT limit+1，多取的一条用来判断 hasMore；配套联合索引见「索引设计」。
- 空列表返回 200 和空的 items 数组。
- 分页信息放在响应体；要兼容通用的 HTTP 客户端时，可以同时给 Link 头（rel="next"）。

## 提示词

给{资源名}列表加分页。先读现有列表 API、查询语句、索引和前端调用方式。
1. 方式：{offset / 游标}。后台表格要跳页、看总数用 offset；持续增长的流水和日志用游标。
2. offset：page 从 1 开始，pageSize 默认 20、上限 100；返回 items、page、pageSize、total；最多翻到前 10000 条。
3. 游标：cursor、limit；按 {排序字段} 倒序，id 作第二排序键；游标是 base64url 编码的不透明字符串，带上排序和过滤条件，条件变了返回 400；返回 items、nextCursor、hasMore，查询多取一条判断 hasMore。
4. 确认排序字段有联合索引，贴出查询的执行计划。
5. 空列表返回 200 和空数组。
6. 测试：第一页、最后一页、翻页期间插入新数据时不重复不遗漏、非法游标。
最后列出改动文件和前端需要配合改的地方。
