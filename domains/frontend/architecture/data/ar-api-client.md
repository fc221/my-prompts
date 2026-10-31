---
zh: 请求层封装
en: API client layer
aka: axios fetch ofetch ky 拦截器 请求封装 api 模块 http client MSW
order: 10
---

## 是什么

全项目只有一个发请求的出口：统一的基础地址、超时、鉴权头、请求编号、错误归一和取消；每个资源一组 API 函数（listOrders、getOrder、updateOrder），组件和 hook 只调用这些函数。

## 适合

fetch 和 axios 混用，各处自己拼地址、自己处理 401；要统一加请求头、埋点或模拟数据；接口改个路径要全局搜索。

## 不适合

类型从哪来看「接口类型生成」；缓存、去重、失效看「服务端状态缓存」；错误在界面上怎么分层展示看「前端错误分层处理」；令牌过期续期看「登录态与令牌」。

## 注意

请求层只管传输：地址、头、超时、错误归一、取消。弹提示、跳路由、改 store 放到上层，请求层只为 401 这类事件留回调入口，这样它在单元测试和服务端渲染里也能直接用。

## 要点

- 分两层：src/api/client.ts 放唯一的客户端实例（原生 fetch 封装、ofetch、ky、axios 选一个）；每个资源一组函数，放 src/api/<资源>.ts 或 src/features/<领域>/api.ts，命名用动词加资源：listOrders、getOrder、createOrder、updateOrder、cancelOrder。
- src/api 以外不出现 fetch、axios 调用和接口路径字符串；用 ESLint 的 no-restricted-imports 和 no-restricted-globals 在其他目录报错。
- 统一配置：baseURL 读环境变量；默认超时 10 秒，上传和导出单独放宽；每个请求带 X-Request-Id 并在错误里带回；查询参数里数组的格式（status=a,b 还是 status=a&status=b）和后端约定一次，全项目一致。
- 错误归一：非 2xx、网络错误、超时，以及“HTTP 200 但业务码失败”的响应，都转成同一个 ApiError，带 status、code、message、details、requestId；上层只认这一种错误。
- 每个 API 函数接受可选的 signal 并传给底层（fetch 和 axios 都支持 AbortSignal），缓存层切换条件时用它中止旧请求。
- 统一解包：后端外层包了 data 的，在 client 里解掉，API 函数直接返回业务数据；分页统一返回 items 和 total（或 nextCursor）。
- 拦截点只留三处：发出前加头；响应后解包和归一错误；遇到 401 时交给「登录态与令牌」里的刷新流程。
- 模拟数据用 MSW 在网络层拦截，开发和测试共用一套处理函数；API 函数里不写模拟分支。

## 提示词

统一 {产品} 前端的请求层，接口行为不变：
1. 盘点：搜索所有 fetch、axios 等调用和硬编码的接口路径，列出位置、是否带鉴权头、超时、错误处理方式，以及直接在组件里发请求的地方。
2. 在 src/api/client.ts 建立唯一的客户端（沿用项目已装的库）：baseURL 读环境变量，默认超时 10 秒，带 X-Request-Id；非 2xx、网络错误和业务失败码统一抛 ApiError（status、code、message、details、requestId）；支持 signal 取消；401 通过回调交给登录态模块。
3. 按资源建 API 模块（{资源名，如 订单、门店、工单}），函数命名 listXxx / getXxx / createXxx / updateXxx / deleteXxx，返回解包后的业务数据。
4. 把调用处全部换成这些函数；加 lint 规则，src/api 以外禁止直接使用 fetch 和 axios。
5. 跑类型检查和测试，汇报新增和改动的文件、替换了多少处、哪些接口的返回格式不统一需要和后端确认。
