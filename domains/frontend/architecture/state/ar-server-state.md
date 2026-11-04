---
zh: 服务端状态缓存
en: Server state cache
aka: TanStack Query React Query Vue Query SWR Pinia Colada RTK Query 请求缓存 数据获取 staleTime
order: 20
---

## 是什么

后端来的数据（列表、详情、字典）交给专门的请求缓存层：按查询键缓存、同时发出的相同请求合并、过期后后台刷新、改完数据让相关查询失效。组件不再在 useEffect / onMounted 里自己请求再存进 store。

## 适合

同一份数据多个页面都用；从详情返回列表要立即显示；改完数据后几处列表都要刷新；到处是手写的 loading、error 状态。

## 不适合

只有两三个请求的简单页面，用封装好的请求函数加组件局部状态就够；服务端渲染直出数据的页面先用框架自带的数据获取（见「Next.js 项目约定」「Nuxt 项目约定」）；推送来的数据怎么并入看「实时数据接入」。

## 注意

缓存层的默认值决定了行为：TanStack Query v5 的 staleTime 默认 0，组件挂载、窗口重新聚焦、网络恢复都会在后台重新请求；Pinia Colada 默认 5 秒。按数据变化快慢分档设置，别全局设成永不过期再到处手动刷新。

## 要点

- 选型：React 用 TanStack Query 或 SWR；Vue 用 TanStack Query（@tanstack/vue-query）或 Pinia Colada（已用 Pinia 时更顺手）；已用 Redux Toolkit 的用 RTK Query；Nuxt 先用自带的 useFetch / useAsyncData。引入条件：3 个以上页面共享数据，或者缓存、失效、重试三项里需要两项。
- 查询键用工厂统一生成，每个资源一份，放 src/features/<领域>/queries.ts：orderKeys.all 为 ['orders']，orderKeys.list(filters) 为 ['orders', 'list', filters]，orderKeys.detail(id) 为 ['orders', 'detail', id]；组件里不手写键数组。
- 每个查询包成 hook / 组合式函数：useOrderList(filters)、useOrder(id)，内部调用请求层函数（见「请求层封装」）；组件只用这些封装，不直接调 useQuery。
- staleTime 分档：字典、城市、类目 30 分钟；普通列表 30 秒到 1 分钟；余额、库存、订单状态 0。gcTime 保持默认 5 分钟。
- 写操作用 mutation，成功后让相关键失效：改了订单就失效 ['orders'] 前缀，详情和所有订单列表一起刷新；需要立刻看到结果的轻操作做乐观更新，界面规则见「乐观更新」。
- 重试只针对网络错误、5xx 和 429：在全局 retry 函数里按状态码判断，401、403、404、422 立即失败；写操作默认不自动重试。
- 加载态分两种：首次加载（isPending）显示骨架；后台刷新（isFetching）只给轻量提示、保留旧数据；翻页时保留上一页数据直到新数据到达（TanStack Query 用 placeholderData: keepPreviousData）。
- 服务端数据只存在缓存层；需要换形状用查询的 select 或 computed。

## 提示词

把 {产品} 里手写的请求和加载状态迁到服务端状态缓存层，界面行为保持不变或更好：
1. 盘点：找出在 useEffect / onMounted / watch 里发请求、把结果存进组件状态或全局 store 的地方，按资源（{资源名，如 订单、门店、会员}）分组，标出同一数据被重复请求、改完数据靠手动刷新的位置。
2. 查看项目是否已有 TanStack Query / SWR / Pinia Colada / RTK Query；有就沿用，没有就推荐一个并说明理由，等我确认后再安装。
3. 每个资源建 queries 文件：查询键工厂、useXxxList / useXxx 查询、写操作的 mutation；staleTime 按字典 30 分钟、列表 30 秒、余额库存 0 设置；4xx 不重试。
4. 替换调用处，删除 store 里对应的数据字段和手写的 loading / error；写操作成功后让相关键失效。
5. 验证：列表进详情再返回，列表立即显示；编辑后列表和详情都更新；断网恢复后自动刷新。汇报改动文件和删掉的代码。

## 示例

<link rel="stylesheet" href="../../_shared/diagram.css">

<script type="module">
import { draw, flow } from '../../_shared/diagram.ts';
export default function demo(root) {
  draw(root, flow([
    [{ t: 'useOrderList', note: "键 ['orders', 'list', …]" }, { t: '命中缓存', note: '先显示，不等请求', acc: true }, { t: '后台刷新', note: 'staleTime 30 秒', via: '已过期' }],
    [{ t: '取消订单', note: 'mutation' }, { t: "失效 ['orders']", note: '按前缀匹配', via: '成功后', acc: true }, { t: '详情和列表一起刷新' }],
  ]), { title: '服务端状态缓存 · 读走缓存，写完失效' });
}
</script>
