---
zh: 限流与配额
en: Rate limiting and quotas
aka: rate limit 429 Retry-After 令牌桶 配额 QPS 频率限制 RateLimit
order: 30
---

## 是什么

限流限制单位时间内的请求数（每秒、每分钟），保护服务不被突发流量打垮；配额限制一个周期内的总量（每天、每月），对应套餐和计费。超限返回 429，并告诉调用方还剩多少、多久后恢复。

## 适合

开放平台按商户、按套餐限制调用；登录、发短信验证码这类容易被刷的接口；导出、报表这种很重的接口；保护下游数据库和第三方接口。

## 不适合

服务自身过载时的保护和熔断看「超时、重试与熔断」；防重复提交用「幂等键」；恶意流量要先在 WAF、CDN 层拦，应用层限流只是最后一道。

## 注意

维度选错等于没限：按 IP 限会误伤共用一个出口 IP 的整家门店，也挡不住换 IP 的刷子。对外接口按 API Key 或商户限，登录类接口按账号和 IP 两个维度同时限。

## 要点

- 维度：已认证请求按调用方（API Key、商户 id、用户 id），未认证按 IP；登录和短信接口再加按手机号或账号的限制（如同一手机号 60 秒 1 次、每天 10 次）。
- 算法：一般接口用令牌桶，允许小突发（如每秒补 10 个、桶容量 20）；配额按自然日、自然月计数，时区写明（Asia/Shanghai）。
- 多实例的计数放 Redis，用 Lua 脚本或原子命令一步完成“检查加扣减”；Redis 不可用时一般接口放行并告警，登录和短信接口改为拒绝。
- 超限返回 429 Too Many Requests 加 Retry-After（秒数）；错误码区分 RATE_LIMITED（频率超限，稍后自动恢复）和 QUOTA_EXCEEDED（配额用完，等下个周期或升级套餐）。
- 正常响应也带限流头。标准草案的新写法是两个头：RateLimit-Policy: "default";q=600;w=60 和 RateLimit: "default";r=598;t=42（q 配额、w 窗口秒数、r 剩余、t 距重置秒数）；不少网关仍输出 RateLimit-Limit、RateLimit-Remaining、RateLimit-Reset 三个头。项目内选一种写进文档，并加进 CORS 的 Access-Control-Expose-Headers。
- 重接口按成本计数：导出一次扣 10 个令牌，或单独设并发上限（每个商户同时最多 2 个导出任务）。
- 各档位的限额写在配置里：免费版、标准版、企业版各自的每分钟限额和每日配额，支持给单个商户临时提额。
- 网关先做粗粒度限流，应用里再按业务维度细分；健康检查和内部调用走白名单。

## 提示词

给{服务}加上限流与配额（已有就检查并改正）。先读网关配置和应用里的限流代码，盘点：哪些接口有限流、按什么维度、用什么算法、计数存在哪里、超限返回什么、响应里有没有剩余次数。
按以下规则改：
1. 已认证请求按 {限流维度，如 商户 id} 限，未认证按 IP；登录和短信接口同时按账号和 IP 限。
2. 一般接口用令牌桶，档位从配置读取：{套餐档位和限额}；每日配额按 Asia/Shanghai 自然日重置。
3. 计数放 Redis 并原子扣减；Redis 故障时一般接口放行并告警，登录和短信接口拒绝。
4. 超限返回 429 加 Retry-After，错误码区分 RATE_LIMITED 和 QUOTA_EXCEEDED。
5. 所有响应带 RateLimit-Policy 和 RateLimit 头，并加进 Access-Control-Expose-Headers。
6. 导出类重接口单独限制并发。
最后说明改了哪些文件，并用脚本连续请求演示：第几次开始返回 429、Retry-After 的值、等待后恢复，以及两个商户的计数互不影响。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, http } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, http(`
GET /orders?storeId=s_1024
X-Api-Key: sk_live_…8f3a
`, `
429 Too Many Requests
Retry-After: 42
RateLimit-Policy: "default";q=600;w=60
RateLimit: "default";r=0;t=42
Content-Type: application/problem+json

"status": 429,
"code": "RATE_LIMITED",
"detail": "每分钟 600 次已用完，42 秒后恢复"
`), { title: '限流 · 429 带 RateLimit 和 Retry-After' });
}
</script>
