---
zh: 健康检查与优雅停机
en: Health checks and graceful shutdown
aka: liveness readiness startupProbe 存活检查 就绪检查 SIGTERM 优雅下线 滚动发布 探针
order: 40
---

## 是什么

健康检查让编排系统知道服务是否活着、能不能接流量；优雅停机让服务收到停止信号后，先摘掉流量，再处理完手上的请求和任务，最后退出。两者配合，滚动发布和扩缩容时用户无感知。

## 适合

部署在 Kubernetes、容器平台或负载均衡后面的服务；发布时偶发 502 或连接被重置；消费消息的服务重启后出现消息重复或丢失。

## 不适合

业务层面的监控告警看「指标与链路追踪」；下游故障时怎么保护自己看「超时、重试与熔断」。

## 注意

在存活检查里查数据库是最常见的错误：数据库抖一下，所有实例的存活检查同时失败、全部被重启，小故障放大成全站宕机。存活检查只看进程自己，依赖放进就绪检查。

## 要点

- 三类检查：/livez（存活）只确认进程能响应、没有卡死，不查任何依赖；/readyz（就绪）检查必需的依赖（数据库连接池能取到连接、必要的预热已完成），失败时摘流量但不重启；启动慢的服务加 startupProbe，避免启动阶段被存活检查杀掉。
- 检查要轻：1 秒内返回，只读不写，依赖检查结果缓存几秒；返回 200 或 503，正文可以列出各依赖状态，不带连接串和版本细节；端点只在内网或管理端口开放。
- Spring Boot 用 Actuator 的 /actuator/health/liveness 和 /actuator/health/readiness（management.endpoint.health.probes.enabled，检测到 Kubernetes 时自动开启）；其他框架写两个独立路由。
- 停机顺序：收到 SIGTERM 后先把就绪状态置为失败，等负载均衡摘除（5–10 秒，可用 preStop 钩子 sleep）；再停止接收新连接，等处理中的请求完成；消费者停止拉取新消息，已拉取的处理完再确认；最后关闭连接池，刷出日志和指标，退出。
- 时间预算：整个停机过程短于 terminationGracePeriodSeconds（Kubernetes 默认 30 秒），超时强制退出。Spring Boot 3.4 起内置 Web 服务器默认优雅停机，等待时长用 spring.lifecycle.timeout-per-shutdown-phase 设置；Go 用 http.Server.Shutdown(ctx)；Node 用 server.close() 并关闭空闲的 keep-alive 连接。
- 信号送达：Dockerfile 的 ENTRYPOINT 用 exec 形式（JSON 数组写法），让应用进程直接收到 SIGTERM；shell 形式会让信号停在 sh 上；需要时用 tini 当 1 号进程。
- 长任务：后台任务记录进度、可以从断点续跑；停机时没做完的任务放回队列，见「后台任务队列」。

## 提示词

为{项目}补齐健康检查和优雅停机，部署在{Kubernetes / 其他平台}，框架是{语言和框架}，服务{是否消费消息或运行后台任务}。
1. 盘点：列出现有健康检查端点和各自检查的内容；部署文件里的 liveness、readiness、startup 探针、terminationGracePeriodSeconds 和 preStop；进程如何处理 SIGTERM；容器启动命令是不是 exec 形式。
2. 按规则改：存活检查只看进程本身；就绪检查覆盖数据库连接池和必需依赖，失败返回 503；启动慢的加 startupProbe；收到 SIGTERM 后先置就绪失败、等 5–10 秒摘流量、停止接收新请求、等处理中的请求和已拉取的消息完成、关闭连接池，总时长短于优雅期限。
3. 验证：持续压测的同时滚动重启服务，5xx 和连接重置次数为 0；手动发送 SIGTERM，日志里停机步骤按顺序出现。
4. 汇报：端点说明、改动的代码和部署文件、验证结果。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, flow } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, flow([
    [{ t: '收到 SIGTERM' }, { t: '就绪置失败', note: '/readyz 返回 503', acc: true }, { t: '等摘流量', note: '5–10 秒' }, { t: '停收新连接', note: '消费者停止拉取' }],
    [{ t: '处理完在途', note: '请求和已拉取的消息' }, { t: '关闭连接池', note: '刷出日志和指标' }, { t: '退出', acc: true }],
    [{ t: '被强制杀掉', note: '整个过程超过 30 秒', bad: true, via: '没走完' }],
  ]), { title: '优雅停机 · /livez 不查依赖，只看进程' });
}
</script>
