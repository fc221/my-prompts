---
zh: 跨域（CORS）
en: CORS
aka: cors 跨域 预检 OPTIONS Access-Control-Allow-Origin 跨域请求
order: 40
---

## 是什么

浏览器默认不让网页读取别的源（协议、域名、端口任一不同）返回的数据，服务端用 Access-Control-* 响应头声明允许哪些来源、方法和头。非简单请求会先发一次 OPTIONS 预检，通过后才发正式请求。

## 适合

管理后台（admin.example.cn）和 API（api.example.cn）不同域；开放给合作方网页直接调用的接口；本地开发时前端 dev server 调测试环境接口。

## 不适合

服务对服务、App 原生请求不受 CORS 约束，它也不是访问控制；能同源部署时优先用反向代理或「前端专用后端（BFF）」把 API 挂到同一个域名下，连预检都省了。

## 注意

CORS 只管浏览器能不能读到响应，拦不住请求到达服务端。带 Cookie 的跨域请求不能用 Access-Control-Allow-Origin: *；而把请求里的 Origin 原样回写，等于对所有网站开放，必须对照白名单。

## 要点

- 来源按环境配置白名单，精确匹配完整 Origin（https://admin.example.cn）；不用后缀或包含匹配（按 example.cn 结尾判断会放过 evil-example.cn），不放行 null。
- 命中白名单时回写该 Origin，同时加 Vary: Origin，避免 CDN 把给某个来源的响应缓存给别的来源；没命中就不带任何 CORS 头。
- 带凭证（Cookie、HTTP 认证）时加 Access-Control-Allow-Credentials: true，此时 Allow-Origin、Allow-Headers、Allow-Methods 都不能写 *；跨站 Cookie 还要设 SameSite=None; Secure。
- 预检：OPTIONS 直接返回 204，不走鉴权和业务逻辑；Access-Control-Allow-Methods 和 Access-Control-Allow-Headers 明确列出（如 GET, POST, PATCH, DELETE 和 Authorization, Content-Type, Idempotency-Key）。
- 触发预检的常见原因：PUT、PATCH、DELETE 方法，Authorization 或自定义头，Content-Type: application/json。
- Access-Control-Max-Age 设 600–7200 秒，Chromium 最多认 2 小时，减少预检次数。
- 前端要读的响应头列进 Access-Control-Expose-Headers：X-Request-Id、ETag、Location、RateLimit、Retry-After，否则 JS 读不到。
- 只在一处处理：网关、Nginx、框架中间件选一层；两层都加会出现重复的 Allow-Origin，浏览器直接判失败。401、500 这类错误响应同样要带 CORS 头，否则前端只能看到一个模糊的网络错误。

## 提示词

检查{服务}的跨域（CORS）配置并改正。先找出所有设置 Access-Control-* 头的地方（网关、Nginx、框架中间件、单个路由里手写的），确认实际由哪一层生效；再列出需要跨域访问的前端来源 {允许的来源列表}，以及哪些请求带 Cookie。
按以下规则改：
1. 只保留一处 CORS 处理，删掉其他地方的重复设置。
2. 来源按环境配置白名单精确匹配，命中时回写 Origin 并加 Vary: Origin，不命中不带 CORS 头；不用 *，也不原样回写。
3. 带 Cookie 时加 Allow-Credentials: true，Cookie 设 SameSite=None; Secure。
4. 预检 OPTIONS 直接返回 204，明确列出允许的方法和头，Max-Age 设 {预检缓存秒数}。
5. 前端要读的 X-Request-Id、ETag、Location、RateLimit、Retry-After 加进 Expose-Headers。
6. 401、403、500 这类错误响应同样带 CORS 头。
最后说明改了哪些文件，并用 curl 分别带白名单内、白名单外、伪造后缀的 Origin 发预检和正式请求，贴出响应头对比。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, code } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, code([{ t: '预检请求和响应', text: `
OPTIONS /orders/ord_8F3k2
Origin: <管理后台的源>
Access-Control-Request-Method: PATCH
Access-Control-Request-Headers: authorization, content-type

204 No Content
Access-Control-Allow-Origin: <同一个源，白名单精确匹配才回写>
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PATCH, DELETE
Access-Control-Allow-Headers: Authorization, Content-Type, Idempotency-Key
Access-Control-Max-Age: 7200
Vary: Origin
` }]), { title: 'CORS 预检 · 带凭证时都不能写 *' });
}
</script>
