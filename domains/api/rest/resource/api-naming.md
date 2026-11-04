---
zh: 资源命名与路径
en: Resource naming & paths
aka: URL 设计 路由命名 RESTful 路径 URI 规范
order: 10
---

## 是什么

用名词表示资源、用 HTTP 方法表示动作的路径约定：集合是复数名词，单个资源是集合加 :id，如 GET /orders/:id、POST /stores/:storeId/members。路径定下来，前端、网关、文档和日志都按它走。

## 适合

新服务定路由规范；老接口里 /getOrderList、/order/doCancel 这类动词路径要统一；几个团队的服务要挂到同一个网关下。

## 不适合

字段组合多变、以聚合查询为主的页面看「REST、GraphQL、gRPC 怎么选」或「前端专用后端（BFF）」；服务之间的高频内部调用看「gRPC 与 Protobuf」。

## 注意

嵌套只表达“属于”，不表达“从哪里能找到”。工单属于门店，可以写 /stores/:storeId/tickets 来创建和列出，但工单详情直接用 /tickets/:id，调用方不必先知道门店。取消订单、审批报销这类动作是写法最容易分裂的地方，项目里先定一种。

## 要点

- 集合用复数名词，多个单词用 kebab-case：/orders、/member-levels、/expense-reports；全小写，不带动词、文件扩展名和末尾斜杠。
- 单个资源是集合加 :id：/orders/:id；一对一的从属资源用单数：/members/:id/profile、/stores/:id/settings。
- 嵌套最多两层（集合/:id/子集合）：/stores/:storeId/orders 可以；/stores/:storeId/orders/:orderId/items 改成 /orders/:orderId/items。
- 子资源有全局唯一 ID 时同时提供顶层地址 /tickets/:id，嵌套路径只用来按父资源创建和列出。
- 方法表达不了的状态迁移用 POST 加动词子路径：POST /orders/:id/cancel、POST /expense-reports/:id/submit；带自己数据和历史的动作建成子资源，如审批记录 POST /expense-reports/:id/approvals。
- 过滤、排序和分页放查询参数：/orders?status=paid&storeId=s_1024，写法见「过滤、排序与字段选择」。
- 前缀全库统一：/api/v1/资源，或按服务分独立域名，版本放法见「版本管理」。
- JSON 字段名和查询参数用一种大小写（camelCase 或 snake_case，跟着现有接口走），和路径的 kebab-case 分开约定。

## 提示词

按下面的规则整理{服务名}的路由。先读现有的路由注册、控制器和接口文档，列出全部路径。
1. 输出对照清单：原方法和路径 → 新方法和路径 → 改动理由，按资源分组。
2. 规则：集合用复数名词、kebab-case、全小写；单个资源写成 /集合/:id；嵌套最多两层，子资源有全局 ID 时另给顶层地址；动词路径改成对应的 HTTP 方法，状态迁移用 POST /资源/:id/动作；过滤和排序放查询参数。
3. 字段名和查询参数沿用项目已有的大小写风格，不一致的列出来，这次先不改。
4. 旧路径保留并转发到新实现，响应加 Deprecation 头，按「弃用与下线」排下线时间。
5. 最后说明改了哪些文件，并给出新旧路径各一条 curl 验证命令。
需要特别处理的资源：{资源名}。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, tree } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, tree(`
/api/v1/
  orders/            集合用复数名词
    :id/             单个资源
      cancel         POST 动作子路径
      items/         子集合，嵌套最多两层
  stores/
    :storeId/
      tickets/       只用来按门店创建和列出
      settings       一对一从属用单数
* tickets/
*   :id              详情走顶层地址
  expense-reports/   多个单词用 kebab-case
    :id/
      approvals/     带历史的动作建成子资源
`), { title: '名词表示资源，方法表示动作' });
}
</script>
