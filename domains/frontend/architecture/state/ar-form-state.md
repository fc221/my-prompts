---
zh: 表单状态与校验
en: Form state & validation
aka: React Hook Form TanStack Form VeeValidate Zod Valibot schema 表单库 dirty touched
order: 50
---

## 是什么

表单的值、改动标记（dirty）、触碰标记（touched）、错误和提交状态交给统一的表单方案管理；校验规则写成一份 schema，类型从 schema 推导，能和后端共用就共用。

## 适合

字段超过 5 个、有联动或动态增删行、编辑页要回填并判断“改没改过”的表单；每个表单都手写一堆 useState / ref 和 if 校验的项目。

## 不适合

一两个字段的搜索框、登录框，受控组件加简单校验即可。错误什么时候提示、显示在哪看「表单校验与错误提示」；长表单分段看「复杂长表单」；离开提醒看「离开前未保存提示」；自动保存看「自动保存与保存状态」。

## 注意

编辑页的初始值来自服务端缓存，表单里是一份独立的草稿：数据到达后 reset(初始值) 一次。表单值和查询缓存双向绑定时，后台刷新会冲掉用户正在输入的内容。

## 要点

- 选型：React 用 React Hook Form 或 TanStack Form；Vue 用 VeeValidate 或 TanStack Form（@tanstack/vue-form）；字段少、只要校验的，用 schema 库手动校验即可。一个项目只用一种。
- schema 单独成文件，和表单放在同一领域：src/features/<领域>/schemas/reimburse-form.ts，用 Zod 或 Valibot；表单值类型由 schema 推导（z.infer），不再手写一份。
- 前后端共用：同仓库的 TypeScript 后端直接共用 schema；后端是其他语言时以后端校验为准，前端 schema 负责格式和必填，提交后把后端返回的字段错误（details 里的 field 和 message）回填到对应字段。
- 表单值和接口数据分开：提交前用 toPayload(values) 转换（去首尾空格、字符串转数字、日期转 ISO 字符串、金额按接口约定转单位），回填时用 fromDto(dto)；两个函数和 schema 放在一起，并写单元测试。
- 状态只用表单库提供的：isDirty、isSubmitting、errors、touched；提交按钮的加载和防重复提交用 isSubmitting，不另起 loading。
- 动态行（报销明细、商品规格）用表单库的数组字段（React Hook Form 和 VeeValidate 的 useFieldArray、TanStack Form 的数组字段），每行用稳定 id 作 key，不用下标。
- 联动规则写进 schema：选了“企业发票”才需要税号，用 Zod 的 discriminatedUnion 或 superRefine；隐藏的字段不参与校验，也不进提交数据。
- 性能：React Hook Form 默认非受控，只在需要实时显示的字段上用 useWatch；Vue 只 watch 用到的字段，避免对整个表单对象 deep watch。

## 提示词

统一 {产品} 的表单实现，先从 {目标表单，如 报销单编辑页} 开始，显示效果不变：
1. 盘点所有表单：字段数、现在怎么管理值和校验（手写状态、表单库、组件库自带）、有无编辑回填、动态行和联动字段。
2. 确认使用的表单方案（{React Hook Form / TanStack Form / VeeValidate}）和 schema 库：项目已有就沿用，没有就推荐并等我确认。
3. 改目标表单：schema 放在对应领域目录，类型由 schema 推导；toPayload / fromDto 负责和接口数据互转；编辑页数据到达后 reset 一次；提交状态用 isSubmitting；后端返回的字段错误回填到对应字段；隐藏字段不校验、不提交。
4. 错误显示的样式和时机保持现状，只替换状态管理。
5. 验证：必填和格式校验、联动字段隐藏后不提交、未改动时 isDirty 为 false、后端字段错误能回填。汇报改动文件，并列出其余表单的迁移顺序。

## 示例

<link rel="stylesheet" href="../../_shared/diagram.css">

<script type="module">
import { draw, flow } from '../../_shared/diagram.ts';
export default function demo(root) {
  draw(root, flow([
    [{ t: '查询缓存', note: '报销单详情' }, { t: 'fromDto', note: '数据到达后 reset 一次' }, { t: '表单草稿', note: 'isDirty、errors、touched', acc: true }, { t: 'schema 校验', note: 'Zod，类型 z.infer' }],
    [{ t: 'toPayload', note: '去空格、金额转单位' }, { t: '提交', note: 'isSubmitting 防重复' }, { t: '422 字段错误', note: 'details 回填到字段', via: '后端拒绝', bad: true }],
  ]), { title: '表单状态 · 草稿和缓存分开' });
}
</script>
