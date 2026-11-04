---
zh: 组件分层
en: Component layers
aka: 容器组件 展示组件 智能组件 木偶组件 业务组件 基础组件
order: 10
---

## 是什么

按“依赖什么”把组件分成四层：基础组件（按钮、输入框，只管外观和交互）、业务组件（订单状态标签、会员卡片，认识业务字段但不取数据）、区块（取数据、处理加载和出错，把数据交给业务组件）、页面（路由入口，只拼区块）。引用只能从上往下。

## 适合

组件目录平铺上百个文件，分不清谁是谁；同一种按钮有好几种写法；页面组件上千行，既发请求又写全部模板；AI 新写的界面总是从头造轮子。

## 不适合

一两个页面的小工具、一次性活动页平铺即可。目录具体怎么摆看「目录结构」，模块之间谁能引用谁看「模块边界与依赖方向」，该不该抽出新组件看「什么时候抽组件」。

## 注意

分层看依赖，不看大小：一个 20 行的组件只要调用了请求或读了 store，就属于区块层，不能放进基础组件目录。

## 要点

- 目录对应（以项目「目录结构」为准）：基础组件放 src/components/ui；业务组件放 src/features/<领域>/components；区块放在同一领域目录下，以 Panel 或 Section 结尾（OrderListPanel）；页面放 src/pages 或 src/views，以 Page 或 View 结尾。
- 引用方向固定为 页面 → 区块 → 业务组件 → 基础组件；用 ESLint 的 import/no-restricted-paths 或 eslint-plugin-boundaries 把反向引用设为报错。
- 基础组件只接收 props、事件和插槽 / children：不读 store、不发请求、不出现订单号、状态码这类业务字段名，文案从外部传入。
- 业务组件接收取好的数据（一个订单对象或几个字段），负责格式化以及状态到文案、颜色的映射；需要动作时向外抛事件（React 的 onRefund 回调，Vue 的 emit('refund')），请求和跳路由交给上层。
- 区块调用领域里的 hook / 组合式函数取数据，处理加载、空、出错三种状态；一个区块对应一个数据来源或一个用户任务。
- 页面只做三件事：解析路由参数、拼区块、设置标题和权限；页面文件超过 150 行，说明还有区块没拆出来。
- 拆分信号：一个组件既引用请求层又引用 5 个以上基础组件，且超过 300 行，就拆成区块加业务组件。

## 提示词

整理 {产品} 前端（{React / Vue 3}）的组件分层，按“基础组件 / 业务组件 / 区块 / 页面”四层归位，行为保持不变：
1. 盘点：列出所有组件文件，给每个标上应属的层，并列出跨层问题：基础组件里读 store 或发请求、业务组件里调接口或跳路由、页面文件超过 150 行、单个组件超过 300 行。
2. 给出迁移清单（旧路径 → 新路径 → 原因）和要拆分的组件，先发给我确认。
3. 按清单移动和拆分：基础组件只收 props、事件和插槽；业务组件接收数据、向外抛事件；区块负责取数据和加载、空、出错三种状态；页面只拼区块。导出名不变，更新全部 import。
4. 加 lint 规则，禁止 src/components/ui 引用 features、stores、api 目录。
5. 跑类型检查、lint 和现有测试，汇报改动的文件、拆分了哪些组件、暂不处理的例外及原因。

## 示例

<link rel="stylesheet" href="../../_shared/diagram.css">

<script type="module">
import { draw, stack, tree } from '../../_shared/diagram.ts';
export default function demo(root) {
  draw(root, [
    stack([
      { t: '页面', items: ['OrderListPage'], note: '只拼区块' },
      { t: '区块', items: ['OrderListPanel'], note: '取数据，管加载和出错', acc: true },
      { t: '业务组件', items: ['OrderStatusTag'], note: '收数据，抛 onRefund' },
      { t: '基础组件', items: ['Button', 'Input'], note: '不读 store、不发请求' },
    ], { arrow: '只能从上往下引用' }),
    tree(`
src/
  pages/            页面
  features/orders/
*   OrderListPanel  区块
    components/     业务组件
  components/ui/    基础组件
`),
  ]);
}
</script>
