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

即时生效的单个设置用开关；选项超过 6 个用下拉选择；只有一个“同意条款”时用单个复选框，不做成组。

## 要点

- 默认横排：4 个以内、每项不超过约 6 个字时横排在标签下方，选项之间 24px
- 选项超过 4 个、文字长或每项带一行说明时竖排，选项之间 8–12px（同组间距，不套用字段间的 24px）
- 圆点 / 方框 16px，与文字间距 8px；整行连同文字都是点击区，行高至少 32px（触屏 44px）
- 用 fieldset + legend 包住整组；单选组方向键切换，复选框空格切换
- 没有安全默认值的单选组不预选；“全选”复选框有选中 / 未选 / 部分选中三态
- 用 accent-color 给原生控件着色；禁用项降低对比并说明原因

## 提示词

在{新建 API Key 表单}里放两组选项：“所属环境”单选（生产 / 测试 / 开发）横排在标签下方，选项间距 24px，不预选；“权限范围”复选（读取 / 写入 / 删除）前面带“全选”三态复选框；选项多或每项带说明时改竖排、间距 8px；控件 16px、与文字间距 8px，整行可点、行高 32px（触屏 44px）；用 fieldset 和 legend 分组，单选方向键切换；窄屏横排放不下时自动换行。

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
