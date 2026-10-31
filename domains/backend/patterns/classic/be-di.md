---
zh: 依赖注入
en: Dependency injection
aka: DI IoC 控制反转 构造器注入 容器
order: 40
---

## 是什么

对象需要的协作者（仓储、支付客户端、时钟）从外面传进来，而不是在内部 new 出来或读全局变量；由框架容器或启动代码在一处把对象组装好。

## 适合

需要替换实现来测试（假的支付渠道、固定的当前时间）；同一能力有多个实现、按配置切换（短信走阿里云或腾讯云）；框架本身以容器为中心（Spring、NestJS、ASP.NET Core）。

## 不适合

脚本、小工具和只有几个函数的服务，直接函数传参或用模块级单例；Go 这类没有主流容器的语言，在 main 里逐个调用构造函数组装，比引入运行时反射容器更清楚。

## 注意

用构造器注入：依赖一眼可见，对象创建后就完整可用。字段注入和到处调用 getBean、服务定位器会把依赖藏起来，测试时只能起整个容器。构造参数超过 5–6 个，说明这个类做的事太多，先拆类。

## 要点

- 依赖字段设为只读（final / readonly）。Spring 只有一个构造器时不用写 @Autowired；NestJS 在 constructor 参数里声明；FastAPI 用 Depends；Go 写 NewOrderService(repo, clock) 这样的构造函数。
- 组装只在一处（composition root）：容器配置，或 src/bootstrap/、cmd/server/main 这样的启动代码；业务代码里不出现容器 API。
- 生命周期：无状态的 service 和仓储用单例；持有当前用户、租户、事务这类请求上下文的用请求作用域；单例里不持有请求作用域的对象。
- 当前时间、随机数、ID 生成器也注入（Clock、IdGenerator），测试“订单 30 分钟未支付自动取消”时才能把时间固定住。
- 多实现按配置在组装处选择：src/infra/sms/ 下放 aliyun_sms、tencent_sms 两个实现，按 sms.provider 注入其中一个，业务代码里没有 if provider。
- 接口只为两类东西定义：有多个实现的，和测试时要替换的外部系统（支付、短信、对象存储）；内部 service 直接注入具体类。
- 出现循环依赖说明职责划错了，把共用逻辑抽到第三个类或改成事件通知；@Lazy、setter 注入只是把问题藏起来。过度设计的信号还有：自研容器、给纯函数工具类也走注入。

## 提示词

把{模块}改成依赖注入。先列出这个模块里在内部 new、读全局变量或通过服务定位器拿到的依赖：数据库、仓储、{外部客户端，如 短信、支付}、当前时间、ID 生成。然后：
1. 全部改成构造器注入，依赖字段只读。
2. 组装放到项目现有的组装位置（{容器配置或启动代码}），业务代码里不出现容器 API。
3. 当前时间和 ID 生成各抽一个可替换的小接口，测试里用固定值。
4. 只给外部系统和有多个实现的依赖定义接口，内部 service 直接注入具体类；多实现按配置项在组装处选择。
5. 构造参数超过 6 个或出现循环依赖时，先停下来给出拆分建议。
最后列出改动文件，并补一条用固定时间验证{时间相关规则，如 30 分钟未支付自动取消}的测试。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, stack, tree } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, [
    stack([
      { t: '组装处', items: ['src/bootstrap/'], note: '只在这里组装，按 sms.provider 选实现', acc: true },
      { t: '依赖', items: ['OrderRepository', 'Clock', 'IdGenerator', 'aliyun_sms'] },
      { t: '业务类', items: ['OrderService(repo, clock)'], note: '构造器注入，依赖字段只读' },
    ], { arrow: '从外面传进来' }),
    tree(`
src/
* bootstrap/        唯一组装处
  order/
    order_service   无容器 API
  infra/sms/
    aliyun_sms
    tencent_sms     按配置二选一
`),
  ], { title: '依赖注入 · 组装只在一处' });
}
</script>
