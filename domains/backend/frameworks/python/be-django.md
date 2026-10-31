---
zh: Django 项目约定
en: Django project conventions
aka: Django 项目结构 DRF Django REST framework app 拆分 manage.py
order: 20
---

## 是什么

Django 6（以 6.1 为准，还停在 5.2 LTS 的项目同样适用）项目的约定：配置包按环境拆分，业务按 app 划分，写操作和跨表业务放进 services.py，API 用 Django REST framework，表结构变更全部经过 makemigrations 和 migrate。

## 适合

后台管理、内容和运营系统、需要 admin 和用户体系的业务；老项目 views.py 越写越长要拆；规范 AI 生成的 DRF 代码。

## 不适合

只做 API、几乎不用 admin 和模板的轻量服务看「FastAPI 项目约定」；大量长连接推送可以用 ASGI 加 Channels，团队不熟时看「后端语言与框架怎么选」。

## 注意

新项目在第一次 migrate 之前就建自定义用户模型（继承 AbstractUser）并设好 AUTH_USER_MODEL，项目中途再换要手工迁移外键和数据。已经在生产执行过的迁移文件不再修改，改动另写新迁移。

## 要点

- 目录：manage.py 旁边是配置包 config/（settings/base.py、dev.py、prod.py、test.py，以及 urls.py、asgi.py、wsgi.py）和业务 app，如 orders/、members/、stores/；每个 app 含 models.py、admin.py、apps.py、urls.py、views.py、serializers.py、services.py、migrations/、tests/。app 按业务能力划分，一个 app 的 models.py 超过十来张表、或者和别的 app 互相引用很多时再拆。
- 分层：视图（DRF 的 APIView 或 ViewSet）只做鉴权、调序列化器校验、调 services；写操作和跨表业务写成 services.py 里的函数，用 transaction.atomic 包住；复杂查询写成自定义 QuerySet 方法，挂到 Model 的 objects 上。Django 没有 DI 容器，依赖通过函数参数传入，测试时直接替换。发邮件、导出这类请求之外的工作用 Django 6 内置的 django.tasks（@task 定义、enqueue 入队、在 TASKS 里配后端），内置后端只用于开发和测试，生产要另接 worker。
- 配置：DJANGO_SETTINGS_MODULE 切换环境（config.settings.dev、config.settings.prod），base.py 放共用项；SECRET_KEY、数据库地址从环境变量读（os.environ 或 django-environ）；prod 里 DEBUG = False、ALLOWED_HOSTS 写明域名，上线前跑 python manage.py check --deploy。Django 6 要 Python 3.12+；DEFAULT_AUTO_FIELD 默认改为 BigAutoField，老项目的主键依赖 AutoField 时在 settings 里显式写回，避免生成多余迁移。
- 校验：API 入参用 DRF Serializer（字段参数、validate_ 加字段名的方法、validate 做跨字段校验），视图里调用 serializer.is_valid(raise_exception=True)；页面表单用 Form 或 ModelForm；唯一、取值范围这类规则同时写进 Meta.constraints（UniqueConstraint、CheckConstraint）。
- 错误：业务异常继承 DRF 的 APIException，并在 REST_FRAMEWORK 的 EXCEPTION_HANDLER 里统一转换成项目的错误格式；对象不存在用 get_object_or_404；未处理的异常交给 Django 记录日志，客户端只看到通用的 500。
- 数据库：改 Model 后用 makemigrations 生成迁移，和代码一起提交，部署时执行 migrate；数据迁移用 RunPython 并写反向函数；列表接口用 select_related（外键、一对一）和 prefetch_related（反向、多对多）避免 N+1，见「ORM 与 N+1 查询」。
- 日志和测试：在 settings 的 LOGGING 字典里配 handler 和 formatter，代码里 logging.getLogger(__name__)；测试用 django.test.TestCase（每个用例在事务里回滚）或 pytest-django，接口用 DRF 的 APIClient；测试数据用 factory_boy 现造，不依赖开发库里的数据。
- 命令：python manage.py runserver、startapp、makemigrations、migrate、showmigrations、createsuperuser、shell、test（或 pytest）；生产用 gunicorn（WSGI）或 uvicorn（ASGI）运行，部署时执行 collectstatic。

## 提示词

在{项目}（Django 6 + Django REST framework）里{新建业务 app / 检查现有代码并纠正}，业务：{模块}（如订单、门店、会员）。
先确认 Django 和 Python 版本，再读 settings 的组织方式、INSTALLED_APPS、REST_FRAMEWORK 配置和一个现有 app，确认自定义用户模型、异常处理器和分页设置，沿用已有写法。按这些约定做：
{{要点}}

新建时：startapp 后写 models、serializers、services、views、urls、admin，生成并检查迁移，在 tests/ 里用 APIClient 覆盖创建成功、校验失败和无权限三种情况。
检查时：先找视图里堆业务逻辑、列表接口的 N+1、密钥写死在 settings 里、生产开着 DEBUG 这几类；逐条列出文件和改法，涉及迁移和响应格式变化的先问我。
最后列出改动的文件和验证命令（python manage.py test 或 pytest，以及 check --deploy）。
