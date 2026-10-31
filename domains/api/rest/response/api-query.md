---
zh: 过滤、排序与字段选择
en: Filtering, sorting & field selection
aka: 查询参数 筛选 sort fields expand 条件查询 搜索
order: 30
---

## 是什么

列表 API 的查询参数约定：用什么参数名过滤、排序、挑选返回字段、展开关联资源。约定统一后，前端的筛选区和 URL 同步可以复用同一套代码。

## 适合

后台列表的筛选区、报表查询、移动端只要几个字段的轻量列表。

## 不适合

全文检索和相关度排序交给专门的搜索服务；结构多变的聚合查询看「GraphQL Schema 设计」；分页参数看「分页」；前端怎么把筛选同步到地址栏看「筛选联动与 URL 同步」。

## 注意

能过滤和排序的字段要走白名单，并且都有索引。把任意字段名拼进 SQL 有注入风险，没索引的排序会拖出慢查询。

## 要点

- 等值过滤直接用字段名：/orders?status=paid&storeId=s_1024；多个取值用逗号：status=paid,shipped。
- 范围用后缀：createdAtFrom、createdAtTo（RFC 3339 时间），amountMin、amountMax；全项目一种写法，From 包含、To 不包含。
- 关键词用 q 参数，只匹配文档列出的字段，如订单号和会员手机号。
- 排序：sort=-createdAt,id，减号表示倒序，可以多字段；默认排序写进文档，最后一个排序键是唯一字段。
- 字段选择：fields=id,status,totalAmount 只返回这些字段，id 总是返回；展开关联：expand=store,member，只展开一层。
- 白名单外的过滤或排序字段返回 400，错误里列出允许的值；悄悄忽略会让调用方以为筛选生效了。
- 数据权限在查询层叠加：店长只能看本门店订单，传了别的 storeId 返回空列表还是 403，全项目统一一种。
- 条件多到超过 URL 长度限制（约 2000 字符）时用 POST /orders/search 传请求体，文档注明它是只读操作。

## 提示词

给{资源名}列表统一查询参数。先读现有列表 API、前端筛选区和 URL 同步逻辑，以及相关索引。
1. 过滤白名单：{可过滤字段}。等值用字段名，多值逗号分隔，范围用 From / To 后缀（From 含、To 不含，时间用 RFC 3339）；关键词用 q，只匹配 {搜索字段}。
2. 排序：sort=字段，减号倒序，可多字段；白名单 {可排序字段}；默认 -createdAt，最后用 id 兜底。
3. 字段选择 fields 和关联展开 expand（只展开一层），id 总是返回。
4. 白名单外的字段返回 400，错误里列出允许的值。
5. 数据权限在查询层统一叠加，不依赖前端传参。
6. 每个可过滤、可排序字段确认有索引，没有的列出来并说明要不要加。
7. 测试：组合过滤、多字段排序、非法字段、传入无权访问的过滤值（如别的门店 ID）。
最后列出改动文件和前端需要跟着改的参数名。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, http } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, http(`
GET /orders
  ?status=paid,shipped
  &storeId=s_1024
  &createdAtFrom=2026-10-01T00:00:00+08:00
  &q=ord_8F3
  &sort=-createdAt,id
  &fields=id,status,totalAmount
  &expand=store
`, `
200 OK

"items": [
  { "id": "ord_8F3k2", "status": "paid",
    "totalAmount": 12990,
    "store": { "id": "s_1024",
               "name": "滨江路店" } }
],
"nextCursor": "eyJjIjoi…"
`), { title: '过滤 · 排序 · 字段选择 · 展开' });
}
</script>
