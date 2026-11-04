---
zh: 单选组与复选组
en: Radio & checkbox group
order: 30
---

## 是什么

选项全部平铺：单选只能选一个，复选可多选；短项横排，长项竖排。

## 适合

2–5 个需要比较的互斥选项（单选）；几个可以同时成立的独立选项（复选）；需要点“保存”才生效的选择。

## 不适合

即时生效的单个设置用开关；选项 6 个以上用下拉选择；只有一个“同意条款”时用单个复选框，不做成组。

## 要点

- 用组件库的单选组和复选组：Element Plus el-radio-group + el-radio、el-checkbox-group + el-checkbox（indeterminate、min / max），Naive UI n-radio-group + n-radio、n-checkbox-group + n-checkbox（indeterminate、min / max），Ant Design Vue a-radio-group + a-radio（或 options）、a-checkbox-group + a-checkbox（indeterminate）；圆点、方框尺寸、整行可点、键盘切换由组件负责
- 默认横排：4 个以内、每项不超过约 6 个字时横排在标签下方；选项超过 4 个、文字长或每项带一行说明时竖排。竖排三家都没有属性，外面套一个纵向容器（n-space vertical、a-space direction="vertical"，Element Plus 用 flex 列），选项之间 8–12px
- 整组的名称用表单项的 label（el-form-item / n-form-item / a-form-item），组件库不会生成 fieldset 和 legend；脱离表单单独用时给组加 aria-label
- 没有安全默认值的单选组不预选；“全选”复选框的三态要自己算：全选了 checked，选了一部分 indeterminate，组件只管画
- 到了 max 上限后未选项自动禁用（min / max 只有 Element Plus 和 Naive UI 有，Ant Design Vue 自己在 change 里处理）；禁用项说明原因
- 窄屏横排放不下时自动换行

## 提示词

在{新建 API Key 表单}里放两组选项，用项目组件库自带的单选组和复选组（Element Plus el-radio-group / el-checkbox-group；Naive UI n-radio-group / n-checkbox-group；Ant Design Vue a-radio-group / a-checkbox-group），不手写圆点和方框：“所属环境”单选（生产 / 测试 / 开发）横排在标签下方，不预选；“权限范围”复选（读取 / 写入 / 删除）前面带“全选”复选框，全选 checked、部分选中 indeterminate，自己算；选项多或每项带说明时改竖排，外面套纵向容器，间距 8px；整组名称用表单项的 label；禁用项说明原因；窄屏横排放不下时自动换行。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{width:100%;max-width:360px;display:flex;flex-direction:column;gap:16px}
fieldset{min-width:0;margin:0;padding:0;border:0}
legend{padding:0;margin-bottom:8px}
.ch{display:flex;flex-wrap:wrap;gap:0 24px}
.ch label{display:inline-flex;align-items:center;gap:8px;min-height:32px;cursor:pointer}
input{width:16px;height:16px;accent-color:#3b5bdb;cursor:pointer}
.dv{align-self:center;width:1px;height:16px;margin:0 -8px;background:#c9ced6}
</style>

<div class="s"><div class="w"><fieldset><legend class="lab">所属环境</legend><div class="ch"><label><input type="radio" name="env">生产</label><label><input type="radio" name="env">测试</label><label><input type="radio" name="env">开发</label></div></fieldset><fieldset><legend class="lab">权限范围</legend><div class="ch"><label><input type="checkbox" id="all">全选</label><span class="dv"></span><label><input type="checkbox" class="it" checked>读取</label><label><input type="checkbox" class="it">写入</label><label><input type="checkbox" class="it">删除</label></div></fieldset></div></div>

<script type="module">
export default function demo(root) {
  const all = root.querySelector('#all'), its = [...root.querySelectorAll('.it')];
  const sync = () => { const n = its.filter((i) => i.checked).length; all.checked = n === its.length; all.indeterminate = n > 0 && n < its.length; };
  all.addEventListener('change', () => { its.forEach((i) => { i.checked = all.checked; }); sync(); });
  its.forEach((i) => i.addEventListener('change', sync)); sync();
}
</script>
