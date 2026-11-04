---
zh: 状态放进 URL
en: URL as state
aka: 查询参数 search params query 路由状态 nuqs useRouteQuery 深链接
order: 40
---

## 是什么

决定“用户看到什么”的状态——筛选、排序、页码、当前标签页、打开的详情、搜索词——放进 URL 的路径和查询参数，由路由当唯一来源：组件从 URL 解析出来读，修改就是导航。

## 适合

列表页、搜索结果、报表、带标签页的详情页；需要刷新不丢、能分享链接、返回键能回到上一个视图的页面。

## 不适合

下拉是否展开、悬停这类临时界面状态；手机号、令牌这类敏感信息；序列化后超过约 2000 字符的复杂条件，改为保存到服务端，URL 里只放它的 id。界面上的联动效果（防抖、回到第 1 页、无结果文案）看「筛选联动与 URL 同步」。

## 注意

URL 和组件状态各存一份、再用 watch / useEffect 互相同步，会出现循环更新和返回键错乱。URL 就是状态本身：读取靠解析，修改靠 push 或 replace。

## 要点

- 路径放身份，查询参数放视图：/orders/:id 表示哪个订单，?status=paid&page=2 表示怎么看。
- 每个页面一份参数 schema（Zod、Valibot 均可），写清参数名、类型、默认值和合法取值；缺失或非法的值回退默认值，页面照常渲染。
- 写法统一：默认值不写进 URL；参数名用短的小写英文（q、page、size、sort、status）；多选用逗号拼接（status=paid,refunded）；排序写成 sort=createdAt.desc。
- push 还是 replace：切标签页、打开详情这类用户会想退回去的用 push；输入搜索词、拖滑块、改筛选用 replace。
- 实现：React Router 用 useSearchParams；TanStack Router 用 validateSearch 绑定 schema；Next.js App Router 用 useSearchParams 读、router.replace 写；参数多的 React 项目可用 nuqs 这类类型化查询参数库。Vue Router 读 route.query、写 router.replace，可用 VueUse 的 useRouteQuery 得到可写的 ref。
- 每个页面封装一个读写参数的 hook / 组合式函数（useOrderListParams），返回类型化的参数对象和 setParams；改筛选时同时把 page 重置为 1。
- 解析后的参数直接作为查询键交给「服务端状态缓存」，筛选条件不再另存一份。
- 搜索框保留本地草稿值，防抖后才写 URL；URL 因后退变化时把值同步回输入框。

## 提示词

把 {列表页} 的筛选、排序、分页和标签页状态改为以 URL 为准：
1. 读现状：列出这些状态现在存在哪（组件状态、store、URL）以及相互同步的代码。
2. 为页面写参数 schema：参数名、类型、默认值、合法取值（{筛选项}）；非法值回退默认值，默认值不写进 URL，多选用逗号拼接。
3. 封装一个读写参数的 hook / 组合式函数（如 useOrderListParams）：从 URL 解析出类型化对象；改筛选用 replace 并把页码重置为 1，切换标签页和打开详情用 push；搜索框防抖 300ms 后再写 URL。
4. 请求直接用解析后的参数做查询键，删掉旧的筛选状态和同步代码。
5. 验证：刷新、复制链接到新标签页、前进后退、手动把参数改成非法值，页面都能还原或回退默认。汇报改动文件。

## 示例

<link rel="stylesheet" href="../../_shared/diagram.css">

<script type="module">
import { draw, flow } from '../../_shared/diagram.ts';
export default function demo(root) {
  draw(root, flow([
    [{ t: 'URL', note: 'status=paid page=2', acc: true }, { t: 'schema 解析', note: '非法值回退默认' }, { t: '查询键', note: '交给缓存层，不另存' }],
    [{ t: '点“已退款”' }, { t: 'setParams', note: 'page 重置为 1' }, { t: '写回 URL', note: 'router.replace', acc: true }],
  ]), { title: '状态放进 URL · 读靠解析，改靠导航' });
}
</script>
