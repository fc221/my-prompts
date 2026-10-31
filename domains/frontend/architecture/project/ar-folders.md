---
zh: 目录结构
en: Folder structure
aka: 项目结构 文件夹 按领域分目录 feature folders src 目录
order: 10
---

## 是什么

规定源码按什么分目录。业务代码按领域分（src/features/order、src/features/member），每个领域自带组件、请求、查询和校验；与业务无关的通用代码按用途放在 src/components/ui、src/api、src/stores、src/lib 这几个固定目录。比一个大 components/、一个大 utils/ 装下所有东西更好找，删一个功能时也只删一个目录。

## 适合

新项目定骨架；components/ 里堆了上百个文件找不到；删一个功能要在五六个目录里翻。

## 不适合

框架强制的目录（Next.js 的 app/、Nuxt 的 app/、SvelteKit 的 src/routes）看对应的框架约定条目，那里写了和本条的对应关系；目录之间谁能引用谁看「模块边界与依赖方向」；多个应用和共享包怎么放看「多包仓库」。

## 注意

目录跟着代码长，用到再建。领域少于三个时平铺也行；某段代码出现第二个领域的使用方、并且与业务无关时，再从领域目录提到通用目录。

## 要点

- src/app：入口、全局 provider、路由注册、全局错误边界。src/pages（Vue 项目常叫 src/views）：页面组件，只负责把领域组件组装起来，文件名以 Page 或 View 结尾。
- src/features/<领域>：components/（本领域的业务组件和区块）、hooks/ 或 composables/、api.ts（本领域的请求函数）、queries.ts（查询键和查询）、schemas/（表单校验）、index.ts（对外出口）；用不到的子目录不建。
- 通用目录各管一件事：src/components/ui 放基础组件（按钮、对话框、表格外壳）；src/api 放唯一的请求客户端 client.ts、错误分类和生成的接口类型；src/stores 放跨页面的全局客户端状态；src/hooks（React）或 src/composables（Vue）放通用逻辑；src/lib 放日期、金额格式化这类纯函数；src/config 放环境配置；src/styles 放全局样式和 tokens.css。
- 带“订单”“会员”这类业务词的代码归到对应领域目录，通用目录里只留与业务无关的代码。
- 就近放置：组件的样式、测试、故事文件和组件放在一起，如 OrderCard.tsx、OrderCard.test.tsx、OrderCard.module.css。
- 命名全项目一种：组件文件用 PascalCase（OrderCard.vue），hooks 和组合函数文件与函数同名（useCountdown.ts），其余文件和目录用 kebab-case；helpers、common、misc 这类说不清内容的名字换成具体用途。
- 单个目录超过约 15 个文件或嵌套超过 4 层时拆分或拍平；路径别名只留 @/ 指向 src/ 一种写法（Nuxt 项目沿用框架自带的 ~/ 也可以，全项目统一即可）。

## 提示词

请按领域整理{产品}的源码目录。先读 src 的目录树和 import 关系，列出：现有的业务领域、每个领域的文件散落在哪些目录、通用目录里哪些文件其实只被一个领域使用、哪些通用目录里混着业务代码。
目标结构：src/app 放入口、全局 provider 和路由注册；src/pages 只组装页面；src/features/<领域> 下按需放 components、hooks、api.ts、queries.ts、schemas 和 index.ts；src/components/ui 放基础组件；src/api 放请求客户端和接口类型；src/stores 放跨页面状态；src/lib 放纯函数；src/config 放环境配置。
规则：只被一个领域用的代码移进该领域；带业务词的代码移出通用目录；样式和测试跟着组件走；路径别名统一用 @/。
分批移动，每批只移一个领域并同步更新 import，跑完类型检查和测试再移下一批；只移动文件和调整 import，业务逻辑保持不变。
完成后给出新旧目录对照、移动的文件清单，以及类型检查、测试和构建结果。

## 示例

<link rel="stylesheet" href="../../_shared/diagram.css">

<script type="module">
import { draw, tree } from '../../_shared/diagram.ts';
export default function demo(root) {
  draw(root, tree(`
src/
  app/                入口、全局 provider、路由、错误边界
  pages/              只组装领域组件，OrderListPage
* features/           按业务领域分，对外只走 index.ts
*   orders/
      components/     OrderCard.tsx、OrderCard.test.tsx
      api.ts          本领域的请求函数
      queries.ts      查询键和查询
      index.ts        对外出口
    members/
  components/ui/      无业务的基础组件
  api/                client.ts、错误分类、生成的类型
  stores/             跨页面的全局状态
  lib/                日期、金额等纯函数
  config/             环境配置
`));
}
</script>
