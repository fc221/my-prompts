---
zh: 软删除与审计字段
en: Soft delete and audit columns
aka: 逻辑删除 deleted_at created_by updated_at 操作日志 审计日志 留痕
order: 50
---

## 是什么

每张业务表固定带一组公共列，记下谁在什么时候建的、改的；需要找回和对账的数据用软删除，只打删除标记不物理删除；关键操作另写一份只追加、不可改的操作记录。

## 适合

订单、报销单、合同这类要追溯的数据；后台误删要能恢复；合规要求留痕，比如查出是谁把一张报销单的金额从 800 改成了 1800。

## 不适合

日志、埋点、过期令牌这类到期就清的数据直接物理删除或按分区清理；用户要求注销时软删除不算删除，个人信息要真正清除或脱敏；接口调用记录看「调用日志与审计」。

## 注意

软删除最容易出问题的是唯一约束和查询过滤：已删除会员的手机号还占着唯一索引，同一个号码再也注册不了；某条查询漏了删除条件，已删除的工单又出现在列表里。

## 要点

- 公共列：created_at、updated_at（UTC，见「表设计约定」）、created_by、updated_by（操作人 ID，系统任务写固定的系统账号 ID，如 0）；由框架统一填充（Spring Data JPA Auditing、MyBatis-Plus 自动填充、ORM 保存钩子），业务代码不手动赋值。
- updated_at：MySQL 可以用 ON UPDATE CURRENT_TIMESTAMP(3)，PostgreSQL 没有这个语法，用触发器或应用层填充；全项目选一种，批量 UPDATE 也要带上。
- 删除标记：用 deleted_at（MySQL DATETIME(3)、PostgreSQL timestamptz），NULL 表示未删除，另加 deleted_by；只有 is_deleted 布尔列会丢掉删除时间。查询由 ORM 全局过滤（Hibernate 6.3 起 @SQLRestriction、Laravel SoftDeletes、GORM 的 gorm.DeletedAt、Django 自定义 Manager）。
- 唯一约束：PostgreSQL 建部分唯一索引 CREATE UNIQUE INDEX … ON member (tenant_id, phone) WHERE deleted_at IS NULL；MySQL 没有部分索引，加 delete_token BIGINT NOT NULL DEFAULT 0，删除时写入该行 id，唯一索引建在 (tenant_id, phone, delete_token)。
- 关联和恢复：删除主单时子表一起软删除；报表写明是否包含已删除数据；恢复做成正式功能，有权限控制和操作记录。
- 操作记录：关键变更写入只追加的审计表，列有 resource_type、resource_id、action（CREATE、UPDATE、DELETE、APPROVE）、operator_id、变化字段的前值和后值（JSON）、trace_id、created_at；与业务修改同一事务写入，或经「发件箱模式」可靠异步写入。
- 审计表只追加：应用账号只授 INSERT 和 SELECT，不提供修改删除入口；按月分区或定期归档到冷存储，保留期按合规要求写明（如 3 年）。
- 清理：软删除超过保留期（如 180 天）的数据由「定时任务」物理删除或归档；删除时对手机号、身份证号等个人信息脱敏。

## 提示词

给{项目}的{模块}补齐审计字段和软删除，数据库是{MySQL / PostgreSQL}。
1. 盘点：列出模块内每张表的 created_at、updated_at、created_by、updated_by 和删除标记列，标出缺失、类型不统一和由业务代码手动赋值的地方；列出现有唯一索引和所有物理 DELETE。
2. 按规则改：公共列通过迁移补齐，由框架统一填充；需要追溯的表改为 deleted_at 加 deleted_by 软删除，ORM 全局过滤已删除数据；唯一索引按数据库改造（PostgreSQL 部分唯一索引，MySQL 加 delete_token）；{关键操作，如报销金额修改和审批}写入只追加的审计表，含操作人、前后值和 trace_id。
3. 补测试：删除后列表查不到；同一手机号删除后能重新注册；恢复后可见；审计表记下了前后值。
4. 汇报：改了哪些表和文件、迁移路径、仍保留物理删除的地方及原因、验证结果。
