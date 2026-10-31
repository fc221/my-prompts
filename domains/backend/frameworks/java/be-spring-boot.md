---
zh: Spring Boot 项目结构
en: Spring Boot project layout
aka: SpringBoot 分包 包结构 目录结构 profile Flyway
order: 10
---

## 是什么

Spring Boot 4（Java 17+）服务的目录、分包和配置约定：主类放在根包，业务按功能分包，每个功能包里是 Controller、Service、Repository 和 DTO；环境差异用 profile 配置文件区分，表结构用 Flyway 脚本管理。

## 适合

新建 Spring Boot 服务或业务模块；老项目按层分包、controller 包里堆了几十个类，想按功能整理；让 AI 生成代码前先固定包结构和配置方式。

## 不适合

注入、事务、校验、异常和日志的写法看「Spring 常见约定」；多个团队共用一个大单体、模块之间要强边界看「模块化单体」；分层本身的道理看「三层架构」。

## 注意

带 @SpringBootApplication 的主类必须放在最上层的包：组件扫描只扫它所在的包和子包，放错位置会报找不到 Bean。按功能分包后，一个功能只调用另一个功能的 Service，不直接用对方的 Repository 和实体，否则分包形同虚设。

## 要点

- 分包：根包（如 com.mall）下放主类 MallApplication；按功能建 order、member、store 包，包里放 OrderController、OrderService、OrderRepository、Order 实体和 dto 子包（CreateOrderRequest、OrderResponse）；共用代码只放 common（异常、统一返回、工具）和 config（配置类）两个包。
- 分层：依赖方向固定为 Controller → Service → Repository；Controller 只做接收、校验和 DTO 转换，业务和事务在 Service，Repository 继承 JpaRepository 或写 MyBatis Mapper（XML 放 resources/mapper/）；实体不出 Service 层，API 的出入参一律是 DTO，用 Java record 写。
- 配置文件：src/main/resources/application.yml 放公共配置，application-dev.yml、application-test.yml、application-prod.yml 只放差异，用环境变量 SPRING_PROFILES_ACTIVE 切换；密码和密钥在 yml 里只写环境变量占位，由部署环境注入。
- 配置绑定：一组业务配置写成一个 @ConfigurationProperties(prefix = "mall.order") 的 record，加 @Validated，缺项或非法值在启动时就失败；同一组配置不在代码里散落成多处 @Value。
- 迁移：Flyway 脚本放 src/main/resources/db/migration/，命名 V1__init.sql、V2__add_order_remark.sql，应用启动时自动执行；spring.jpa.hibernate.ddl-auto 设为 validate 或 none；spring.jpa.open-in-view 设为 false，懒加载只发生在 Service 的事务里。
- 日志：默认 SLF4J + Logback，级别用 logging.level 加包名配置；生产输出 JSON，Spring Boot 3.4 起设 logging.structured.format.console=ecs 或 logstash 即可，不用手写 Logback 配置。
- 测试：测试放 src/test/java 下的同名包；Service 单测用 JUnit 5 + Mockito 直接 new；Web 层用 @WebMvcTest + MockMvc，依赖用 @MockitoBean（@MockBean 自 3.4 起废弃）；数据层用 @DataJpaTest；4.x 里这两个切片注解分别在 spring-boot-webmvc-test 和 spring-boot-data-jpa-test 模块，@WebMvcTest 的包名改为 org.springframework.boot.webmvc.test.autoconfigure；集成测试用 @SpringBootTest + Testcontainers，容器上加 @ServiceConnection 自动接入数据源。
- 命令：./mvnw spring-boot:run（Gradle 为 ./gradlew bootRun）、./mvnw test、./mvnw verify、./mvnw package 打可执行 jar、./mvnw spring-boot:build-image 打镜像。以 Spring Boot 4.x 为准（最低 Java 17）：自动配置按技术拆成独立模块，依赖引对应的 starter（Web 是 spring-boot-starter-webmvc），测试切片也在各自的 -test 模块里；Jackson 3 成为默认并自动配置 JsonMapper，Jackson 2 已废弃。从 3.x 升级时分包和配置约定不变，改的是依赖名和 import。

## 提示词

在{服务名}（Spring Boot 4，Java 17+）里{新建业务模块 / 检查现有结构并纠正}，模块：{模块}（如订单、门店、会员）。
先读 pom.xml 或 build.gradle、主类所在的包、application*.yml 和一个现有业务包，确认 Spring Boot 是 3.x 还是 4.x（决定 starter 名和测试注解的 import）、用 JPA 还是 MyBatis、迁移工具是 Flyway 还是 Liquibase。按这套结构做：
{{要点}}

新建时：在根包下建 {模块} 功能包，写好 Controller、Service、Repository、实体、请求和响应 DTO，加一条迁移脚本，再各写一个 Service 单测和 @WebMvcTest。项目已有写法和上面不一致的（比如已经在用 Liquibase），跟项目走，并在最后列出差异。
检查时：逐条对照，列出偏离的位置、问题和改法；移动包、改配置键、动迁移这类影响大的先列清单等我确认，确认后分批改，每批跑一次 ./mvnw test。
最后说明改了哪些文件、新增了哪些配置项，以及本地怎么启动和验证。
