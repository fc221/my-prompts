---
zh: IM 聊天
en: Instant messaging
aka: 即时通讯 单聊 群聊 客服聊天 消息顺序 seq 已读 未读数 离线消息 消息漫游 长连接 撤回
order: 70
---

## 是什么

用户之间的单聊和群聊：消息实时送达、顺序不乱、不丢不重，离线回来能补齐，有未读数和已读状态。核心是每个会话一个单调递增的消息序号 seq，客户端按 seq 排序、去重、发现缺了哪几条。

## 适合

用户和客服的在线咨询、买家和店铺私信、工单协作群、门店店员群。

## 不适合

服务端单向推送订单状态、看板刷新，用「WebSocket 实时推送」或「SSE 流式输出」就够；只是几条系统通知，用站内信表加轮询。

## 注意

不能用服务器时间戳给消息排序：多台服务器时钟不一致，同一毫秒的两条消息先后也不确定，要用会话内的 seq。送达靠“客户端确认加补拉”，不靠推送一次就算成功：推送只是通知，补拉才可靠。

## 要点

- 量级：客服咨询每天几万条消息、同时在线几千人，单个服务直接持有 WebSocket 连接加数据库消息表就够；百万在线再拆出长连接网关，网关只管连接，用户连在哪台网关记在 Redis 的 route:<用户ID>。
- 消息表：message(conv_id, seq, msg_id, sender_id, client_msg_id, type, content, created_at)，主键 (conv_id, seq)，(conv_id, sender_id, client_msg_id) 唯一；客户端重发同一个 client_msg_id 时返回已有的 seq。
- 发送：客户端带 client_msg_id 发出 → 服务端 INCR conv:seq:<会话ID> 取 seq → 落库 → 给发送方回 ack(seq) → 推给接收方的在线连接；发送方 5 秒没收到 ack 就用同一个 client_msg_id 重发。
- 接收和补拉：客户端按会话记住已收到的最大 seq；收到的 seq 跳号或重连时，调 GET /conversations/:id/messages?after_seq=<n>&limit=50 补齐；写库失败会让 seq 留空洞，以补拉接口返回为准，客户端不无限等待。
- 群聊：消息按会话只存一份（读扩散），每个成员只记 read_seq；500 人以上的大群不逐人推完整消息，只推“有新消息”提示，由客户端来拉。
- 未读数：conv_member(conv_id, user_id, read_seq)，未读 = 会话最新 seq − read_seq，不逐条计数；打开会话时上报 read_seq；已读回执只在单聊和小群做。
- 会话列表：user_conv(user_id, conv_id, last_seq, last_preview, updated_at)，按 updated_at 倒序；新消息更新各成员的这一行，大群异步更新。
- 其他：多端登录时每端各自记 seq 补拉；撤回作为一条 type = 撤回 的新消息下发，2 分钟内允许；图片和文件走对象存储签名链接（见「文件上传与存储」），消息按 conv_id 分表。

## 提示词

在{项目}里实现{单聊 / 群聊 / 客服咨询}：先确认量级——同时在线人数、日消息量、最大群人数、是否多端同时在线、消息保存多久；在线几千人时，单个服务持有 WebSocket 连接加数据库消息表就够。再按以下设计：
1. 每个会话用 Redis INCR 生成单调递增的 seq，message 表主键 (conv_id, seq)，(conv_id, sender_id, client_msg_id) 唯一。
2. 发送：落库后给发送方回 ack(seq)，再推给在线接收方；5 秒未收到 ack 用同一个 client_msg_id 重发。
3. 客户端按会话记最大 seq，跳号或重连时用 after_seq 补拉，推送只当通知。
4. 群聊消息只存一份，成员只记 read_seq，未读数 = 最新 seq − read_seq；{大群人数阈值}人以上只推新消息提示。
5. 会话列表按最后一条消息时间倒序。
最后给出压测和对账方法：{目标在线数}个连接每秒共发 1 万条，测端到端延迟 P99；随机断网重连、重复发送，断言每个客户端收到的消息与消息表一致、无重复、按 seq 有序；每天抽查会话列表的 last_seq 与消息表最大 seq 一致。
