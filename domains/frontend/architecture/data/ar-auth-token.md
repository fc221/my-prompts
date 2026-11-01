---
zh: 登录态与令牌
en: Auth state & tokens
aka: token 访问令牌 刷新令牌 refresh token HttpOnly Cookie 路由守卫 权限 401 登出 多标签页
order: 50
---

## 是什么

前端怎么保存登录凭证、怎么带上请求、过期了怎么续、退出时清什么、多个标签页怎么同步，以及路由和按钮怎么按登录态和权限显示。

## 适合

新项目接登录；令牌存在 localStorage 被安全检查指出；几个请求同时 401 导致重复刷新甚至被挤下线；多个标签页的登录状态不一致；退出后还能看到上一个账号的数据。

## 不适合

后端怎么认证、令牌怎么签发看「登录认证」「认证方式」；没有权限时界面怎么显示看「无权限」；登录页的布局看「居中卡片登录」「左图右表单登录」。

## 注意

能让浏览器管凭证就让它管：同站部署时用 HttpOnly、Secure、SameSite=Lax 的 Cookie 保存会话或刷新令牌，脚本读不到，XSS 也偷不走。必须用 Bearer 令牌时，访问令牌只放内存，刷新令牌放 HttpOnly Cookie。把长期令牌存进 localStorage 是最常见的错误。

## 要点

- 访问令牌放内存（模块变量或不持久化的 store 字段），有效期 5–15 分钟；刷新令牌放 HttpOnly Cookie，Path 限制在刷新接口；页面刷新后先调刷新接口换访问令牌，再渲染需要登录的页面。
- 用 Cookie 认证时写操作要防 CSRF：SameSite=Lax 加上后端校验 Origin，或者带 CSRF 令牌头。
- 刷新只发一次：请求层遇到 401 时发起刷新，同时到来的其他 401 请求等待同一个刷新 Promise，成功后依次重放；刷新本身失败就清空登录态，跳登录页并带 redirect，redirect 只接受站内路径。
- 续期方式二选一：过期前 1 分钟静默刷新，或只在 401 时刷新，全项目只用一种。
- 登录态只有一个来源：useAuth（React Context 或 Pinia 的 useAuthStore）提供 user、status（'unknown' | 'authenticated' | 'anonymous'）、login、logout；status 为 unknown 时显示启动骨架，避免登录页闪一下。
- 路由守卫只负责跳转：Vue Router 在 beforeEach 里读 meta.requiresAuth 和 meta.permissions，React Router 用 loader 或外层守卫组件；按钮显隐用 can('order:refund') 这类权限函数，权限码随用户信息一次拉取。前端判断只为体验，每个接口仍由后端鉴权。
- 登出和切换账号：清空服务端状态缓存和用户相关的 store，用 BroadcastChannel（或 storage 事件）通知其他标签页一起退出；切换账号或租户后整页重新加载最稳妥。

## 提示词

检查并整理 {产品} 前端的登录态处理（后端方案：{Cookie 会话 / Bearer 访问令牌 + 刷新令牌}）：
1. 盘点：令牌存在哪（localStorage、Cookie、内存），请求层怎么加鉴权头、怎么处理 401，有几处在判断登录态，路由守卫和按钮权限怎么写，登出时清了哪些数据。列出安全问题和重复逻辑。
2. 给出目标方案：凭证存放位置、刷新流程（并发 401 只刷新一次、失败跳登录并带站内 redirect）、唯一的 useAuth、路由守卫和 can() 权限函数、多标签页同步方式；需要后端配合的改动单独列出，等我确认。
3. 按方案修改，登录页和登录接口保持不变。
4. 验证：令牌过期时同时发 5 个请求只刷新一次且都成功重放；刷新失败回到登录页，登录后回到原页面；一个标签页登出，其他标签页 2 秒内跟着退出；登出后按返回键看不到上一个账号的数据。汇报改动文件。

## 示例

<link rel="stylesheet" href="../../_shared/diagram.css">

<script type="module">
import { draw, seq } from '../../_shared/diagram.ts';
export default function demo(root) {
  draw(root, seq(['订单页', '请求层', '后端'], [
    [0, 1, '同时发出 3 个请求'],
    [1, 2, '带内存里的令牌'],
    [2, 1, '401 × 3', 'rx'],
    [1, 2, '刷新一次（Cookie）'],
    [2, 1, '新访问令牌', 'r'],
    [1, 2, '重放 3 个请求'],
    [1, 0, '正常返回', 'r'],
  ]), { title: '登录态与令牌 · 同时 401 只刷新一次' });
}
</script>
