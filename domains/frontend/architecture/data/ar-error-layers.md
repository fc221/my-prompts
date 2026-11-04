---
zh: 前端错误分层处理
en: Layered error handling
aka: 错误处理 拦截器 401 处理 错误码映射 全局错误 重复提示
order: 30
---

## 是什么

按来源和影响范围分层处理错误：请求层把各种失败归一成同一种错误，缓存层统一决定要不要重试，界面按字段、区块、页面、全局四个范围展示，没预料到的异常交给错误边界和监控。

## 适合

到处 try/catch 之后只 console.log，或者只弹一句“操作失败”；同一个错误弹出两三次提示；每个页面各写一遍 401 处理。

## 不适合

各类错误的界面样式看「错误状态与重试」「表单校验与错误提示」「无权限」「404 与异常页」「离线与弱网」；渲染崩溃的兜底和上报看「错误边界与前端监控」；后端返回什么格式看「错误响应格式」。

## 注意

一个错误只在一个地方展示。全局拦截器弹了提示，页面区块又显示一遍，用户就会看到两次。全局拦截器只处理全局类错误（401、断网、5xx 维护），其余交给发起请求的地方。

## 要点

- 分类看 status 和 code，不看 message 文本：网络或超时（没有 status）、401 未登录、403 无权限、404 不存在、409 冲突、422 字段校验、429 限流、5xx 服务异常。分类函数只有一份，放 src/api/errors.ts。
- 展示位置对应分类：422 回填到表单字段；查询失败在出错的区块里显示并给重试；写操作失败在原位或对话框内提示并保留输入；403、404 用页面级状态；401 全局跳登录并带回跳地址；断网用全局横幅。
- 文案按错误码映射成中文（src/api/error-messages.ts），后端 message 只做兜底；界面上的错误都附 requestId，方便用户反馈。
- 重试统一在缓存层：网络错误、5xx、429（按 Retry-After）自动重试，其他 4xx 不重试；界面上的“重试”按钮调用 refetch。
- 查询的错误从缓存层的 error 状态读取渲染；写操作的错误由调用处处理（mutation 的 onError，或 try/catch 包住 await mutateAsync）。
- 没预料到的异常交给兜底：React 用 Error Boundary 包住区块，Vue 用 onErrorCaptured 和 app.config.errorHandler，再加 unhandledrejection 监听；统一上报到监控，带路由和 requestId。
- 主动取消的请求（AbortError）和被作废的旧请求不算错误，直接忽略，规则见「改了条件旧结果作废」。

## 提示词

整理 {产品} 前端的错误处理，让每个错误只在一个合适的位置提示一次：
1. 盘点：请求拦截器里的错误处理、所有 try/catch 和 .catch、所有弹错误提示的地方；标出重复提示（拦截器和页面都弹）、吞掉错误（只打日志）、按 message 文本做判断的代码。
2. 建 src/api/errors.ts：按状态码和业务码把错误分成网络、401、403、404、409、422、429、5xx，并按 {后端错误码清单} 写出错误码到中文文案的映射。
3. 按范围改：全局拦截器只处理 401、断网和 5xx 维护；查询错误在区块内显示并可重试；写操作错误在调用处提示并保留输入；422 回填到表单字段；AbortError 忽略。
4. 未捕获异常接入错误边界和现有监控，上报带路由和 requestId。
5. 逐类模拟（断网、401、403、422、500、请求被取消），确认每类只提示一次、位置正确。汇报改动文件。

## 示例

<link rel="stylesheet" href="../../_shared/diagram.css">

<script type="module">
import { draw, stack } from '../../_shared/diagram.ts';
export default function demo(root) {
  draw(root, stack([
    { t: '请求层', items: ['ApiError'], note: '各种失败归一，带 status、code、requestId' },
    { t: '缓存层', items: ['网络错误', '5xx', '429'], note: '只这几类自动重试，其他 4xx 不重试' },
    { t: '界面', items: ['422 → 字段', '查询 → 区块', '403/404 → 页面', '401 → 全局'], note: '一个错误只在一处展示', acc: true },
    { t: '兜底', items: ['Error Boundary', 'errorHandler'], note: '没预料到的异常，上报监控' },
  ]), { title: '前端错误分层 · 按来源和范围' });
}
</script>
