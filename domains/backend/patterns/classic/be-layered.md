---
zh: 三层架构
en: Layered architecture
aka: 分层 controller-service-repository Controller Service DAO N 层架构
order: 20
---

## 是什么

按职责分成接口层（controller / handler）、业务层（service）和数据访问层（repository / dao / mapper），上层调用下层，每层只和相邻的一层打交道。国内 Java、Go、Node 后端最常见的就是这种结构。

## 适合

大多数业务系统的默认选择：订单、库存、报销审批这类“增删改查加一些规则”的服务；3–15 人的团队，几十到一两百个接口的规模。

## 不适合

只有几个接口的内部工具或脚本型服务，用框架默认的「MVC」，甚至一个路由文件就够；规则复杂、需要替换数据库和外部渠道来做测试的核心业务，看「整洁架构与六边形」。

## 注意

事务边界放在 service 方法上：一个业务用例对应一个 service 方法、一个事务。最常见的错是 controller 里先后调两个 service 方法，各开一个事务，第二个失败时第一个已经提交，订单建好了库存却没扣。

## 要点

- 接口层：路由、参数绑定和格式校验、鉴权，把业务错误映射成状态码和错误码；业务判断交给下一层。
- 业务层：一个方法对应一个用例，如 createOrder、approveExpense，负责业务校验、事务，编排多个仓储和外部服务；方法名用业务动词，少用 handle、process 这类泛词。
- 数据访问层：只做读写和查询拼装，一个方法对应一条或一组 SQL；“积分不够就拒绝”这类判断属于业务层。
- 依赖只能向下：controller → service → repository。service 之间可以调用但不能成环，出现 A 调 B、B 又调 A 时，把共用部分抽到第三个 service 或领域对象里。
- 目录示例，先按模块再按层：src/order/（order_controller、order_service、order_repository、dto/）、src/inventory/、src/member/、src/common/（错误类型、分页、工具）。比全局 controllers/、services/、repositories/ 三个大目录好找，将来也好整理成「模块化单体」。
- 过度设计的信号：每个 service 都配一个只有单一实现的接口；每层各有一套字段相同的对象来回拷贝；纯展示的列表查询也要穿过三层逐层转调。只读查询可以由 service 直接调用查询方法返回 DTO。

## 提示词

在{项目}里按三层架构新增或整理{模块，如 订单}。先说明项目现在是按模块分包还是按层分包，沿用现有方式。分层要求：
1. controller 只做路由、参数绑定、鉴权和错误映射。
2. service 一个方法对应一个业务用例（{用例清单，如 下单、取消订单、查询订单}），业务校验和事务都在这一层，一个用例只开一个事务。
3. repository 只做数据读写，不放业务判断。
4. 依赖只能 controller → service → repository；发现 service 之间循环调用，就抽出共用部分并说明怎么抽的。
5. 只有一种实现的地方直接用具体类，不加接口。
完成后用文字列出这个模块的调用关系，列出新增和修改的文件，给出每个用例对应的测试名称和运行命令。
