---
zh: FastAPI 项目约定
en: FastAPI project conventions
aka: FastAPI 项目结构 Pydantic v2 Depends SQLAlchemy Alembic
order: 10
---

## 是什么

FastAPI + Pydantic v2 服务的约定：按业务分包，每个包有 router、schemas、service、models；依赖用 Depends 配合 Annotated 注入，配置用 pydantic-settings，数据库用 SQLAlchemy 2.0 加 Alembic 迁移，测试用 pytest 加 dependency_overrides。

## 适合

新建 FastAPI 服务；单个 main.py 写到上千行要拆；AI 生成的代码混着 Pydantic v1 写法（orm_mode、validator、.dict()），要统一升级。

## 不适合

需要后台管理、表单页面和完整用户体系的业务看「Django 项目约定」；耗时或 CPU 密集的任务放进队列，看「后台任务队列」。

## 注意

async def 路由里不能调用阻塞代码（requests、同步数据库驱动、time.sleep），会卡住整个事件循环，所有请求一起变慢。要么全链路用异步库（httpx、asyncpg），要么把路由写成普通 def，FastAPI 会把它放进线程池执行。

## 要点

- 目录：app/main.py 创建应用、注册路由和异常处理；app/core/config.py 放 Settings，app/core/db.py 放 engine 和会话；业务包 app/orders/ 下放 router.py、schemas.py（Pydantic）、service.py、models.py（SQLAlchemy）、dependencies.py；tests/ 按同样的包结构放；Alembic 迁移在 alembic/versions/。
- 依赖注入：数据库会话、当前用户、分页参数都写成依赖函数，用类型别名复用，如 SessionDep = Annotated[AsyncSession, Depends(get_session)]；会话依赖用 yield，请求结束自动关闭；service 是普通函数或类，会话作为参数传入，不 import 全局会话对象。
- 配置：Settings 继承 pydantic-settings 的 BaseSettings，model_config = SettingsConfigDict(env_file=".env")，字段写类型和默认值，缺必填项启动即失败；用 @lru_cache 包一个 get_settings() 作为依赖提供，测试时覆盖；环境差异只靠环境变量，不写多份配置分支。
- 模型：请求和响应分开定义（OrderCreate、OrderUpdate、OrderRead）；响应模型设 model_config = ConfigDict(from_attributes=True)，路由用 response_model 或返回类型注解过滤字段；统一用 v2 写法：field_validator、model_validator、model_dump()、model_validate()；FastAPI 0.128 起不再支持 pydantic.v1，残留的 v1 模型会直接报错。
- 错误：业务异常定义成 AppError（code、message、status_code），service 里直接抛，main.py 用 @app.exception_handler(AppError) 统一转成错误响应；入参校验失败默认返回 422 和 detail 列表，要统一格式就为 RequestValidationError 注册处理器；HTTPException 只在路由层用。
- 数据库：用 SQLAlchemy 2.0 写法（Mapped、mapped_column、select()），异步用 create_async_engine 配 asyncpg；改表用 alembic revision --autogenerate -m "add order remark" 生成，人工检查后再 alembic upgrade head；启动时不调用 create_all。连接池、HTTP 客户端这类资源在 lifespan 里创建和关闭（on_event 已废弃）。
- 日志和测试：logging 在启动时配置一次（要 JSON 可用 structlog），模块里 logger = logging.getLogger(__name__)；pytest 写测试，接口测试用 TestClient，异步测试用 httpx.AsyncClient 配 ASGITransport；用 app.dependency_overrides 换掉会话和外部服务，测试库每个用例在事务里回滚。
- 命令：fastapi dev app/main.py 本地热重载，上线用 fastapi run 或 uvicorn app.main:app --workers 4；依赖用 uv 锁版本（uv sync、uv run pytest），ruff check 和 ruff format 做检查和格式化，mypy 或 pyright 做类型检查。

## 提示词

在{服务名}（FastAPI + Pydantic v2）里{新建业务包 / 检查现有代码并纠正}，业务：{模块}（如订单、门店、会员）。
先读 app/main.py、配置和数据库会话的写法、一个现有业务包，确认 SQLAlchemy 是同步还是异步、迁移工具和错误响应格式，沿用现有选择。按这些约定做：
{{要点}}

新建时：建 app/{模块}/，写 schemas、models、service、router 和 dependencies，在 main.py 注册路由，用 Alembic 生成迁移并检查内容，补上覆盖 201、404、422 的接口测试。
检查时：先找三类会直接出问题的：async 路由里的阻塞调用、全局共享的会话、返回 ORM 对象却没有 response_model；再找 Pydantic v1 写法和散落各处的配置读取。逐条列出位置和改法，改动响应字段或状态码的先问我。
最后列出改动的文件，以及跑测试和本地启动的命令。
