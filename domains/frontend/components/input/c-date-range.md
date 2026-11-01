---
zh: 日期范围
en: Date range
aka: 范围选择 起止日期 双日历 两个月日历 时间范围选择
of: c-date
tab: 日期范围
order: 64
---

## 是什么

一个输入框写两端“开始日期 → 结束日期”，面板并排展开两个月。点第一下定开始日，开始日马上写进框里并选中；点第二下定结束日。

## 适合

筛选一段时间、请假起止、活动有效期、订房入住和离店。

## 不适合

大多数时候只查几个固定时段时加「范围快捷选项」；手机上用底部面板单月滑动，见「手机上选日期的六种控件」。

## 注意

选到一半时用户最容易迷路。开始日要立刻出现在框里、在日历上选中，框里的下划线移到结束日，用户才知道下一下点的是什么。

## 要点

- 用组件库的范围类型，一个控件管两端：Element Plus el-date-picker type="daterange"，Naive UI n-date-picker type="daterange"，Ant Design Vue a-range-picker；不要拼两个单日期框再自己校验先后
- 并排两个月是组件自带的，别改成单月翻页；跨年范围才考虑 Element Plus 的 unlink-panels
- 两端占位“开始日期 / 结束日期”（start-placeholder、end-placeholder 或 placeholder 数组），分隔符用组件默认的，全站一致
- 选到一半的状态组件已处理：开始日先写进框、焦点移到结束端；范围选完或点确认才查询，不用中途的 change 事件提交
- 范围上限和不可选日期用禁用回调：Naive UI 的 is-date-disabled 带 phase 和已选值，能按开始日算上限；Element Plus、Ant Design Vue 在 disabled-date 里读已选的开始日
- 绑定值用两端的 YYYY-MM-DD，提交时按口径写清结束日含不含当天
- 窄屏改单月或底部面板

## 提示词

在{订单列表的筛选区}加日期范围选择：用组件库自带的范围选择器（Element Plus el-date-picker type="daterange" value-format="YYYY-MM-DD"；Naive UI n-date-picker type="daterange"；Ant Design Vue a-range-picker valueFormat="YYYY-MM-DD"），不要拼两个单日期框。保留它默认并排两个月的面板，两端占位“开始日期 / 结束日期”；范围选完或点确认才触发查询，中途不提交；最长 {天数} 天和晚于今天的日期用组件的禁用回调置灰并说明原因；绑定值是两端的 YYYY-MM-DD；提交时写清结束日{含 / 不含}当天；窄屏改单月或底部面板。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<link rel="stylesheet" href="../../_shared/calendar.css">
<style>
.s{padding:8px 10px}
</style>

<div class="s"><div class="rp"></div></div>

<script type="module">
import { rangePicker } from '../../_shared/calendar.ts';
export default function demo(root) {
  rangePicker(root, { value: ['2026-10-19', '2026-11-06'] });
}
</script>
