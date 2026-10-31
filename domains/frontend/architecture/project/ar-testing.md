---
zh: 前端测试分层
en: Frontend testing layers
aka: 单元测试 组件测试 端到端测试 E2E Vitest Playwright Testing Library MSW 测试金字塔
order: 60
---

## 是什么

按成本和信心把前端测试分几层：纯逻辑写单元测试，组件按用户看得到、点得到的方式测，关键业务流程用真实浏览器端到端测，请求在测试里统一用 MSW 拦截。每层测什么、写多少有约定，不追覆盖率数字。

## 适合

新项目定测试方案；改一处坏一处、不敢重构；端到端测试又慢又不稳，想重新分配各层的比重。

## 不适合

后端接口和数据库的测试看「后端测试分层」；截图像素比对的工具选型不在本条展开。

## 注意

测试绑定实现细节（组件内部状态、CSS 类名、调用了哪个内部函数）会让每次重构都得改测试。按用户视角找元素：先按角色和可见文字，最后才用 data-testid。

## 要点

- 单元测试（Vitest）：纯函数、金额和日期格式化、store 和 reducer、校验规则；不渲染 DOM，单个用例毫秒级。
- 组件测试（Vitest 加 Testing Library，或 Vitest 浏览器模式）：用 getByRole、getByLabelText 查元素，用 user-event 操作，断言用户能看到的结果；每个数据组件覆盖加载中、空、错误、成功四种状态。
- 请求统一用 MSW 在网络层拦截，处理函数和真实接口共用类型；业务里的请求函数和 fetch 保持原样不 mock。
- 端到端（Playwright）：只覆盖出错代价最高的主流程（登录、下单、支付结果、报销提交），一般 5–15 条；每条从干净数据开始，依赖自动等待，不写固定 sleep。
- 测试文件放在被测文件旁边：order-list.tsx 配 order-list.test.tsx；端到端用例放 e2e/ 或 tests/ 目录。
- 命令统一：test（单元和组件，watch 模式）、test:run（CI 一次性运行）、test:e2e；CI 先跑类型检查和单元测试，通过后再跑端到端。
- 不稳定的用例当缺陷处理：标记、建单、一周内修好或删除，全局自动重试只作为临时手段。
- 覆盖率作参考：金额计算、权限判断这类核心模块要求 90% 以上，其余不设硬门槛。

## 提示词

请为{产品}整理前端测试。先读现有的测试配置、测试文件和 CI 脚本，统计各层用例数量、运行时长和不稳定的用例。
按分层补齐和调整：
1. 单元测试用 Vitest，覆盖{核心逻辑}这类纯函数和 store。
2. 组件测试用 Testing Library，按角色和可见文字查元素，用 user-event 操作；{重点组件}各自覆盖加载中、空、错误、成功四种状态。
3. 请求统一改用 MSW 拦截，替换掉对请求函数和 fetch 的 mock。
4. 端到端用 Playwright，只写{主流程}这几条，每条独立准备数据，依赖自动等待。
5. 测试文件放在被测文件旁边；package.json 提供 test、test:run、test:e2e 三个命令；CI 先跑类型检查和单元测试，再跑端到端。
6. 现有不稳定用例逐个修复，修不了的标记出来并写明原因。
完成后汇报新增和改动的用例、改了哪些文件、各层运行时长；验证：故意改坏一个核心函数，确认对应测试失败，恢复后全部通过。

## 示例

<link rel="stylesheet" href="../../_shared/diagram.css">

<script type="module">
import { draw, stack, tree } from '../../_shared/diagram.ts';
export default function demo(root) {
  draw(root, [
    stack([
      { t: '端到端', items: ['Playwright'], note: '登录、下单、报销提交，5–15 条' },
      { t: '组件', items: ['Testing Library', 'user-event'], note: 'getByRole 找元素，覆盖加载中、空、错误、成功', acc: true },
      { t: '单元', items: ['Vitest'], note: '纯函数、金额日期格式化、store' },
    ], { arrow: '越往下越多、越快' }),
    tree(`
src/features/orders/
  order-list.tsx
* order-list.test.tsx  放在被测文件旁
src/test/
  handlers.ts          MSW 拦截，和接口共用类型
e2e/
  place-order.spec.ts  从干净数据开始
`),
  ], { title: '按成本分层 · 不追覆盖率数字' });
}
</script>
