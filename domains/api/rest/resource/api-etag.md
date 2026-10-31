---
zh: 缓存与并发控制
en: Caching & concurrency control
aka: ETag If-Match If-None-Match 304 412 乐观并发 丢失更新 Cache-Control
order: 80
---

## 是什么

用 ETag 给资源的每个版本一个标识：读的时候带 If-None-Match，没变就拿 304，省流量；写的时候带 If-Match，防止两个人先后保存时，后保存的把先保存的修改整个覆盖掉（丢失更新）。

## 适合

多人会同时编辑的资源（工单、门店信息、报销单草稿）；读多写少、体积大的资源（商品目录、门店列表、配置）；移动端弱网省流量。

## 不适合

数据库层的锁怎么选看「乐观锁与悲观锁」；应用内缓存和 Redis 看「缓存策略」；多人实时协同编辑要用操作合并方案，ETag 只能发现冲突，不能合并。

## 注意

If-Match 用强比较，W/ 开头的弱 ETag 永远匹配不上，所以写操作要配强 ETag。ETag 要跟着资源版本变：用数据库的 version 列生成最稳，响应体哈希容易因为字段顺序、格式化不同而误判。

## 要点

- GET 单个资源返回 ETag: "v12"（由 version 列生成，带双引号）；PATCH、PUT、DELETE 要求请求带 If-Match: "v12"。
- If-Match 不匹配返回 412，错误体带当前 ETag 和资源，前端提示“已被他人修改”，让用户刷新或对比后再提交；要求带却没带返回 428。
- 更新语句带版本条件：UPDATE ... SET ..., version = version + 1 WHERE id = ? AND version = ?，影响 0 行就返回 412，检查和写入之间不留竞争窗口。
- 写成功后响应里带新的 ETag，客户端用它做下一次修改。
- 条件读：客户端带 If-None-Match，资源没变返回 304，不带响应体；列表可以用最大 updatedAt 加总条数生成 ETag。
- Cache-Control 按数据分三类：用户私有数据 private, no-cache（每次用 ETag 校验）；公开的门店列表、商品目录 public, max-age=60；含令牌、支付信息的响应 no-store。
- 响应内容随请求头变化时加 Vary（如 Vary: Accept-Language）；带 Authorization 的请求，共享缓存只在响应写了 public 或 s-maxage 时才会存。
- 跨域调用要在 Access-Control-Expose-Headers 里加上 ETag，前端脚本才读得到。

## 提示词

给{资源名}加 ETag 并发控制，防止多人同时编辑时互相覆盖。先读实体、更新逻辑、表结构和前端的编辑页面。
1. 表里加或复用 version 列；GET {资源路径}/:id 返回带双引号的强 ETag。
2. PATCH、PUT、DELETE 要求 If-Match：没带返回 428，不匹配返回 412，错误体带当前 ETag 和资源；更新语句带 WHERE version = 旧值，影响 0 行时返回 412。
3. 写成功后返回新 ETag 和完整资源。
4. GET 支持 If-None-Match，没变化返回 304；Cache-Control 用 private, no-cache。
5. 跨域时把 ETag 加进 Access-Control-Expose-Headers。
6. 前端：保存时带上 ETag；收到 412 提示“已被他人修改”，提供“刷新”和“对比后再提交”两种处理，已填的内容保留。
7. 测试：两个会话先后修改同一条，后一个得到 412；没带 If-Match 得到 428；未修改时 GET 得到 304。
最后列出改动文件和数据库迁移脚本。
