---
zh: 评论与楼中楼
en: Comments and nested replies
aka: 评论 回复 楼中楼 二级评论 盖楼 评论树 热评 评论分页 子评论 root_id
order: 30
---

## 是什么

内容下面的评论区：一级评论按时间或热度排列，每条一级评论下面挂着回复（楼中楼），回复里标明回复的是谁。设计重点是只存两层而不是无限层的树，分页和计数都在两层上做。

## 适合

帖子、商品评价、文章、工单的评论区和讨论区。

## 不适合

实时对话用「IM 聊天」；必须无限层嵌套展示的讨论（文档逐段批注）用路径枚举或闭包表存树，这里讲两层结构。

## 注意

无限层嵌套靠 parent_id 递归查询，层数一深就是多次查询或递归 CTE，分页也很难做。多数产品只展示两层：所有回复都挂到所属的一级评论下（root_id），用 reply_to_user_id 表示回复的是谁。另一个坑是列表页给每条一级评论再单独查一次回复，就是 N+1，见「ORM 与 N+1 查询」。

## 要点

- 量级：后台工单这类单个对象最多几百条评论的，用 parent_id 一次查全量、在内存里组树就够；单个对象几万条以上才需要下面的两层分页。
- 表：comment(id, subject_type, subject_id, root_id 一级为 0, parent_id, user_id, reply_to_user_id, content, like_count, reply_count, status 正常 / 待审 / 已删除, created_at)；索引 (subject_type, subject_id, root_id, created_at) 和 (root_id, created_at)。
- 一级评论：WHERE subject_type = ? AND subject_id = ? AND root_id = 0 AND status = 正常，按 created_at 倒序游标分页，每页 20；按热度排时用定时更新的 hot_score 列，ORDER BY hot_score DESC, id DESC。
- 楼中楼预览：每条一级评论带最多 3 条回复和 reply_count，用一次 WHERE root_id IN (本页 20 个 ID) 查出后在内存分组，或用 ROW_NUMBER() OVER (PARTITION BY root_id ORDER BY created_at) <= 3；点“查看全部 128 条回复”再按 root_id 游标分页。
- 计数：发回复时同一事务 UPDATE comment SET reply_count = reply_count + 1 WHERE id = <root_id>；内容的总评论数走异步计数，见「点赞与计数」。
- 删除：有回复的一级评论软删除，保留楼层显示“该评论已删除”；没有回复的直接隐藏；删除回复时 reply_count 减 1。
- 审核：先审后发的新评论 status = 待审，只对作者本人可见；命中敏感词直接拒绝或进人工审核队列。
- 热门和防刷：热门内容的前 3 页一级评论 ID 缓存到 Redis，新评论写入后删除第一页缓存；每个用户每分钟最多 10 条，按用户加内容哈希去重，60 秒内相同内容拒绝。

## 提示词

在{项目}里实现{内容对象}的评论区和楼中楼：先确认量级——单个对象最多评论数、日新增评论、按时间还是按热度排序、是否先审后发；单个对象只有几百条评论时，用 parent_id 一次查全量在内存组树就够。再按以下设计：
1. 建 comment 表，两层结构：回复都挂在 root_id 下，reply_to_user_id 记回复对象，带 reply_count 和 status。
2. 一级评论按 (subject_type, subject_id, root_id, created_at) 索引游标分页，每页 20。
3. 每条一级评论附最多 3 条回复，用一次 root_id IN 查询分组，不逐条查。
4. 查看全部回复按 root_id 游标分页。
5. 发回复同事务给一级评论 reply_count 加 1；有回复的一级评论删除后保留楼层。
6. 每用户每分钟最多 10 条，60 秒内相同内容拒绝。
最后给出压测和对账方法：给一个对象灌 10 万条一级评论和 50 万条回复，测首屏和翻到第 100 页的耗时；每天抽查 reply_count 与实际回复数是否一致，不一致的修正并记录。
