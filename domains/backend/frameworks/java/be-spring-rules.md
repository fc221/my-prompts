---
zh: Spring 常见约定
en: Spring coding conventions
aka: Spring 规范 构造器注入 事务 全局异常 RestControllerAdvice
order: 20
---

## 是什么

Spring Boot 代码里反复出现的写法约定：构造器注入、事务只放在 Service、请求 DTO 用 Bean Validation、一个 @RestControllerAdvice 统一出错误响应，以及日志、外部调用和 JPA 实体的写法。以 Spring Boot 4（Spring Framework 7）为准，和「Spring Boot 项目结构」配合使用。

## 适合

新写 Controller 和 Service；代码审查时逐条对照；AI 生成的 Spring 代码风格不统一（字段注入、到处 try-catch、直接返回实体），需要收拢。

## 不适合

分包、配置文件、迁移和测试骨架看「Spring Boot 项目结构」；错误码怎么编排看「错误处理与错误码」；隔离级别和长事务看「事务边界与隔离级别」。

## 注意

@Transactional 靠代理生效：同一个类里用 this 调用带注解的方法、注解写在 private 方法上、对象是自己 new 出来的，这三种情况事务都不会开启。默认只有 RuntimeException 和 Error 会回滚，抛受检异常要写 rollbackFor。

## 要点

- 注入：一律构造器注入，依赖字段写成 private final，只有一个构造器时不写 @Autowired（可配 Lombok @RequiredArgsConstructor）；Service 只有一个实现时直接写类，有多实现或要替换时才抽接口，多实现用 @Qualifier 或注入 Map 按名字取。
- 事务：@Transactional 只加在 Service 的 public 方法上，只读查询用 readOnly = true；事务里不调外部 HTTP、不发消息，提交后才做的事交给 @TransactionalEventListener（默认在提交后执行）或发件箱；Controller 和 Repository 不加事务。
- 校验：请求 DTO 写成 record，字段用 jakarta.validation 注解（@NotBlank、@Size、@Positive、@Email），Controller 参数写 @Valid @RequestBody；路径和查询参数直接加约束注解（Spring 6.1 起内置方法校验）；跨字段和要查库的规则放 Service，失败抛业务异常；空值约定用 JSpecify 的 @NullMarked 和 @Nullable（Spring Framework 7 起取代 org.springframework.lang 下的注解）。
- 异常：定义 BizException（错误码加 HTTP 状态），Service 直接抛；一个 @RestControllerAdvice 统一处理 BizException、MethodArgumentNotValidException 和 HandlerMethodValidationException（后两个都转 400 加字段错误列表），以及兜底的 Exception（500，记日志，不回传堆栈）；Controller 里不写 try-catch 拼响应。
- 响应格式：要么用 ProblemDetail（Spring 6 起内置，开 spring.mvc.problemdetails.enabled），要么用项目已有的统一返回体，全项目只用一种；分页返回自己的分页 DTO（列表、总数、页码、每页条数），不直接序列化 Spring Data 的 Page。
- 实体：Controller 不返回 JPA 实体；DTO 和实体的转换用 MapStruct 或 DTO 上的静态 from 方法；实体不用 Lombok @Data（生成的 equals、hashCode、toString 会触发懒加载和循环引用）；关联默认 LAZY，列表查询用 fetch join 或 @EntityGraph，见「ORM 与 N+1 查询」。
- 日志：SLF4J 用占位符传参，不拼字符串；业务关键节点打 info，并带订单号、会员 ID 这类业务键；异常要么处理掉，要么带上异常对象记一次 error 再抛出，不用 e.printStackTrace()；请求 ID 放进 MDC，每行日志自动带上。
- 外部调用：HTTP 用 RestClient 或 @HttpExchange 声明式客户端（Spring Framework 7 可用 @ImportHttpServices 按组注册），统一配置连接和读取超时；RestTemplate 从 Framework 7.0 起废弃，新代码不用，老代码逐步迁到 RestClient；Java 21 上可开 spring.threads.virtual.enabled=true，让阻塞 IO 跑在虚拟线程上（Boot 3.2+）。

## 提示词

在{服务名}（Spring Boot 4）里{按约定实现新模块的 API / 审查现有代码并纠正}，模块：{模块}。
先看构建文件确认 Spring Boot 是 3.x 还是 4.x，再读一个现有的 Controller 和 Service、全局异常处理类和统一返回结构，确认项目用 ProblemDetail 还是自定义返回体、DTO 转换用 MapStruct 还是手写，后面沿用同一种。按这些约定写：
{{要点}}

实现时：给 {模块} 写创建、详情、分页列表三个 API，含请求和响应 DTO、校验注解和业务异常，并用 @WebMvcTest 覆盖 200、400 字段错误、404 三种情况。
审查时：逐条列出违规位置（类、方法、问题、改法），先改事务失效、异常被吞这类会出错的，再改注入方式、日志和命名；会改变响应格式或状态码的单独标出，等我确认再改。
最后列出改动的文件和验证命令。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, tree } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, tree(`
src/main/java/com/mall/
  order/
    OrderController.java     @Valid @RequestBody，不写 try-catch
*   OrderService.java        private final 构造器注入，@Transactional
    OrderRepository.java     不加事务
    dto/
      CreateOrderRequest.java  record + @NotBlank、@Size
      OrderResponse.java       不返回 JPA 实体
  common/
    BizException.java        错误码 + HTTP 状态
*   GlobalExceptionHandler.java  @RestControllerAdvice，统一出错误响应
src/main/resources/
  application.yml          problemdetails、虚拟线程开关
`), { title: 'Spring 常见约定 · 每层写什么' });
}
</script>
