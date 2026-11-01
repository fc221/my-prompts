---
zh: 部分更新
en: Partial updates (PATCH)
aka: PATCH JSON Merge Patch JSON Patch 局部更新 增量更新
order: 40
---

## 是什么

只改资源的部分字段。PATCH 请求体有两种标准格式：JSON Merge Patch（RFC 7396，传要改的字段，null 表示清空）和 JSON Patch（RFC 6902，传一组 op 操作，按顺序原子执行）。

## 适合

会员资料、门店营业时间、工单指派人这类一次只改一两个字段的编辑；表单自动保存；多人可能同时改同一资源的不同字段。

## 不适合

整体替换配置用 PUT，见「方法与幂等」；提交、审批、取消这类状态迁移用 POST 动作，见「资源命名与路径」；数组成员多、增删频繁的（订单明细、报销明细行）建成子资源单独增删。

## 注意

Merge Patch 里“没传”表示不动，“传了 null”表示清空，后端反序列化成普通对象后这两种情况常被混成一样，必须能区分。数组在 Merge Patch 里整体替换，改标签列表中的一项也要把整个数组传上来。

## 要点

- 默认用 JSON Merge Patch，Content-Type: application/merge-patch+json；只传要改的字段，null 清空可空字段，给不可空字段传 null 返回 422。
- 要对数组元素做插入、移动，或要先断言当前值再改时用 JSON Patch，Content-Type: application/json-patch+json，op 有 add、remove、replace、move、copy、test，path 用 JSON Pointer（/tags/0）；整组原子执行，任一步失败全部不生效。
- 服务端用能区分“缺省”和“null”的方式接收：原始 JSON 节点、可选包装类型或字段存在性标记，合并到已加载的实体上再保存，只更新改动的列。
- 可改字段走白名单；只读字段（id、createdAt、订单金额）和要走流程的字段（status）出现在请求体里返回 422，errors 里点名字段。
- 合并后按完整资源再校验一遍，组合规则（结束时间晚于开始时间）也要过。
- 成功返回 200 和更新后的完整资源，客户端用它覆盖本地状态；内容没有变化也返回 200。
- 多人编辑的资源要求 If-Match 带 ETag，防止覆盖别人的修改，见「缓存与并发控制」。
- 收到不支持的 Content-Type 返回 415，并用 Accept-Patch 响应头列出支持的格式。

## 提示词

给{资源名}实现 PATCH {资源路径}/:id 部分更新。先读现有的更新接口、实体和 DTO，看现在怎么接收和保存。
1. 用 JSON Merge Patch（application/merge-patch+json）：缺省字段不动，null 清空可空字段；后端用能区分“没传”和“传了 null”的方式解析，合并到已加载的实体上。
2. 可改字段白名单：{可改字段}。只读字段和 status 出现在请求体里返回 422，errors 里点名字段。
3. 合并后按完整资源再校验，失败返回 422 和每个字段的原因。
4. 要求 If-Match 带 ETag：不匹配返回 412，没带返回 428。
5. 成功返回 200 和完整资源；只更新改动的列，并写审计记录（操作人、字段、旧值、新值）。
6. 测试：只改一个字段、传 null 清空、传只读字段、ETag 过期、两人先后修改。
最后说明改了哪些文件，并给出一条 curl 示例。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, http } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, http(`
PATCH /members/mbr_93Kd1
Content-Type: application/merge-patch+json
If-Match: "v12"

"nickname": "MyPrompts",
"remark": null
// 没传的字段不动，null 清空
`, `
200 OK
ETag: "v13"

"id": "mbr_93Kd1",
"nickname": "MyPrompts",
"remark": null,
"phone": "138****5678",
"level": "GOLD"
`), { title: 'JSON Merge Patch · 返回完整资源' });
}
</script>
