# 提示词知识库

给人浏览、复制提示词交给 AI 用的网页。按领域组织（目前有前端、后端、API、PDF、Word、Excel），每个领域分若干板块，每条有示例、要点和可复制的提示词；“组合”可以把几条合成一段提示词，⌘K / Ctrl+K 全局搜索。

技术栈：Vue 3 + TypeScript + Vite，打包成单个 HTML 文件。

## 使用

```
npm install          # 第一次
npm run dev          # 本地开发，浏览器打开终端里显示的地址
npm run build        # 类型检查（网页 + 内容）+ 打包，输出 dist/index.html（单文件，双击即可打开，可直接发给别人）
npm run typecheck    # 只做类型检查
npm run check        # 校验数据和目录结构
npm run artifact     # 打包并生成发布用的 dist/artifact.html
npm run format       # 统一代码格式
```

## 目录

```
index.html                 Vite 入口
src/
  App.vue                  页面框架：侧栏、顶栏、板块头、卡片网格、详情、组合、搜索
  components/              侧栏、顶栏、卡片、详情抽屉、组合面板、全局搜索、实时示例宿主、图标
  mock/                    布局示意图：WireMock（窗口框 + 手机框）、WireGrid（网格）、MockBlock（各种迷你界面）、infer（由标签推断画什么）
  styles/                  设计令牌（亮暗两套）、全局样式
  adapter/content.ts       内容解析：条目 Markdown、示例 HTML、目录说明文件 → 网页数据（网页和校验脚本共用）
  adapter/index.ts         内容适配层入口 '#kb'：解析函数和类型
  types.ts                 数据结构
  kb.ts                    按目录自动发现 domains/ 下的内容、搜索、组合提示词
  state.ts                 当前领域与板块、详情、组合、主题，地址栏同步
domains/<领域>/
  _domain.md                     领域：名称、顺序、说明、通用要求
  <板块>/_section.md             板块：名称、图标、颜色、顺序、介绍
  <板块>/<分类>/_category.md     分类：名称、顺序
  <板块>/<分类>/<id>.md          条目文字：一条一个文件，文件名就是条目 id
  <板块>/<分类>/<id>.html        实时示例（可选）：共用样式、样式、结构、脚本写在一个文件里
  <板块>/<分类>/<id>.wire.ts     布局示意图（可选）
  _shared/                       示例共用的样式（.css）和小工具（.ts）
scripts/
  validate.mjs             校验数据和目录结构；--browser 无头挂载示例并截图
  demo-harness.mjs         示例测试台：测一条或一个分类（不用打包）
  fragment.mjs             生成发布用片段
vite.config.ts             打包成单文件；kb-demo 插件把示例 HTML 拆成结构、样式、脚本
tsconfig.json              网页代码的类型检查（严格）
tsconfig.domains.json      内容里 .ts 的类型检查（示意图结构严格，共用脚本放宽）
```

文件放进对应目录就会出现在网页上，不用在任何地方登记；顺序按各文件头部的 `order`。

## 参与贡献

加条目、分类、板块、领域的写法，示例和提示词的约定，以及提交前的自测命令，见 [CONTRIBUTING.md](CONTRIBUTING.md)。
