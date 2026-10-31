---
zh: 认证方式
en: API authentication
aka: API Key OAuth2 OAuth 2.0 PKCE JWT 访问令牌 刷新令牌 客户端凭证 JWKS
order: 10
---

## 是什么

决定调用方怎么证明自己是谁。常见三种：服务端对服务端用 API Key 或 OAuth 2.0 客户端凭证；代表用户访问的第三方应用用授权码 + PKCE；自家前端和 App 用短期访问令牌（常是 JWT）加刷新令牌。

## 适合

开放平台给商户发凭证；App、小程序、后台登录后的接口调用；第三方应用要代表会员读取其订单；内部服务之间的身份认证。

## 不适合

用户登录流程本身（密码、短信验证码、扫码登录）看「登录认证」；认证之后能做什么看「权限模型」；前端怎么存令牌、怎么刷新看「登录态与令牌」。

## 注意

JWT 发出去就收不回来，过期前一直有效。访问令牌有效期要短，撤销靠刷新令牌轮换和黑名单；把一张 7 天有效的 JWT 当会话用，泄露后就只能干等它过期。

## 要点

- 凭证只放在请求头：令牌用 Authorization: Bearer，API Key 用 Authorization 或单独的 X-Api-Key 头；不放 URL 查询参数，免得进访问日志和浏览器历史。
- API Key 带可识别的环境前缀（sk_live_、sk_test_），生成后只显示一次，库里只存 SHA-256 摘要和末 4 位；每把 Key 绑定权限范围和可选的 IP 白名单，允许两把同时有效，方便轮换。
- 第三方应用代表用户访问时用 OAuth 2.0 授权码 + PKCE（code_challenge_method=S256），回调地址与登记值精确匹配；隐式授权和密码授权不再使用。
- 服务对服务用客户端凭证授权，令牌带 scope（orders:read、refunds:write），只申请用得到的范围。
- 访问令牌 5–15 分钟过期；刷新令牌 7–30 天，每次使用都换发新的并作废旧的，发现已作废的刷新令牌再次被使用时，作废整条令牌链并要求重新登录。
- JWT 校验：算法用固定白名单（RS256 或 ES256），拒绝 none，也拒绝和白名单不符的 alg；校验 iss、aud、exp、nbf，允许 60 秒时钟偏差；公钥通过 JWKS 发布，按 kid 选钥。
- 签名密钥轮换：新公钥先加入 JWKS，等过至少一个缓存周期再用它签发；旧公钥保留到最后一张旧令牌过期后再移除。
- 状态码：没带凭证或凭证无效返回 401，并带 WWW-Authenticate 头；凭证有效但范围不够返回 403，错误信息写明缺少哪个 scope。

## 提示词

检查{服务}的接口认证并改正。先读认证中间件、令牌签发和校验代码、API Key 的存储表和网关配置，盘点：有哪些调用方（{调用方列表}），各用什么凭证、凭证放在哪里、有效期多久、怎么撤销、密钥怎么轮换。
按以下规则改：
1. 凭证只从 Authorization 或 X-Api-Key 头读取，去掉从查询参数读取的分支。
2. API Key 改为只存 SHA-256 摘要和末 4 位，带环境前缀，绑定 scope，支持两把并存轮换。
3. 第三方应用代表用户访问时用授权码 + PKCE（S256）；服务对服务用客户端凭证加 scope。
4. 访问令牌有效期 {访问令牌有效期}，刷新令牌每次使用即轮换，检测到重用时作废整条令牌链。
5. JWT 校验用固定算法白名单，校验 iss、aud、exp、nbf，按 kid 从 JWKS 取公钥。
6. 401 带 WWW-Authenticate；scope 不足返回 403 并写明缺少的 scope。
已经发出去的 Key 和令牌要能平滑过渡，先列出迁移步骤给我确认。最后说明改了哪些文件，并写测试覆盖：过期令牌、错误的 aud、alg 为 none、旧刷新令牌被重用、scope 不足。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, seq } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, seq(['第三方应用', 'API', '授权服务'], [
    [0, 2, '授权请求 · code_challenge（S256）'],
    [2, 2, '会员登录并同意 orders:read'],
    [2, 0, '回调登记的 redirect_uri · code', 'r'],
    [0, 2, 'POST /token · code + code_verifier'],
    [2, 0, '访问令牌 15 分钟 + 刷新令牌', 'r'],
    [0, 1, 'Bearer <访问令牌>'],
    [1, 0, 'scope 不够 → 403', 'r'],
  ]), { title: 'OAuth 2.0 授权码 + PKCE' });
}
</script>
