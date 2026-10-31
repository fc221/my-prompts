---
zh: MVC
en: Model-View-Controller
aka: 模型视图控制器 Controller MTV
order: 10
---

## 是什么

把一次请求分给三块代码：Controller 接收请求、调用业务、决定返回什么；Model 承载数据和业务规则；View 负责输出，服务端渲染项目里是模板，API 项目里是序列化出来的 JSON。Rails、Laravel、Spring MVC 的默认骨架都是它，Django 叫 MTV，分法相同。

## 适合

中小型后台和内容站：门店管理后台、工单系统、会员积分查询。1–5 人的团队、几十张表以内，直接用框架脚手架生成的结构。

## 不适合

同一条规则要被接口、定时任务和消息消费者几处调用，或者 Controller 和 Model 都已经上千行时，加一层 service，改成「三层架构」；要守住“库存不能为负”“积分不能透支”这类不变式时，看「实体、值对象与聚合」。

## 注意

最常见的走样是胖 Controller：校验、算价、扣库存、发短信全写在一个 action 里，之后定时任务也要用时只能复制一份。Controller 里只留“解析请求 → 调用一个方法 → 映射响应”三步。

## 要点

- 单个 action 超过 30 行，或者出现两层以上的业务 if，就把逻辑下沉到 Model 或 service。
- Model 放字段、关联、校验和只涉及本表的规则，例如订单的 canCancel()：已支付且未发货才能取消；跨多张表的流程（下单要动订单、库存、积分）放到 service。
- View 在 API 项目里是序列化层（serializer、resource、响应对象），用白名单决定返回哪些字段，手机号、身份证号在这里脱敏。
- 依赖方向：Controller → Model，View 只读 Model；Model 只依赖数据库和其他 Model，拿不到请求对象、会话和状态码，脚本和定时任务才能直接调用它。
- 目录示例，按框架约定放：app/controllers/tickets_controller、app/models/ticket、app/serializers/ticket_serializer（服务端渲染时是 app/views/tickets/）、config/routes 集中注册路由。
- 过度设计的信号：在 MVC 框架里给每张表补一层只会转调 Model 的 service 和接口。出现第二个调用方之前，规则放在 Model 方法里就够了。

## 提示词

按 MVC 整理{项目}里的{模块，如 工单}，框架是{框架}。先列出这个模块的路由、每个 Controller action 的行数，以及写在 Controller 里的业务判断。然后：
1. 每个 action 只留三步：解析并校验参数、调用一个 Model 或 service 方法、映射成响应和状态码。
2. 只涉及本表的规则（如{一条规则，如 工单只有处理中才能转派}）移到 Model 方法；跨表流程放到单独的 service。
3. 返回字段由序列化层用白名单决定，敏感字段在这里脱敏。
4. Model 里不出现请求、会话和状态码。
行为保持不变：每移动一段逻辑，先写一条测试锁住原来的结果。最后列出改了哪些文件、移动了哪些逻辑，以及怎么确认接口返回和原来一致。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, stack } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, stack([
    { t: 'Controller', items: ['TicketsController#transfer'], note: '解析请求 → 调一个方法 → 映射响应' },
    { t: 'Model', items: ['Ticket', 'canTransfer()'], note: '字段、关联、校验和只涉及本表的规则', acc: true },
    { t: 'View', items: ['TicketSerializer'], note: '白名单返回字段，手机号在这里脱敏' },
  ], { arrow: 'Controller 调 Model，View 只读 Model' }), { title: 'MVC · 一次转派工单请求' });
}
</script>
