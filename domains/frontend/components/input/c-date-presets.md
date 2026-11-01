---
zh: 范围快捷选项
en: Range presets
aka: 时间范围快捷按钮 时间快捷 日期预设 快捷日期 近七天 时间筛选
of: c-date
tab: 快捷选项
order: 66
---

## 是什么

日期范围面板左侧放一列“今天、昨天、近 7 天、近 30 天、本月”。点一个，框里马上写出起止日期，日历同时选中两端、画出区间，底部写明共几天、含不含今天。

## 适合

报表、看板、后台列表这类大多数时候只查几个固定时段的地方。

## 不适合

选某一个具体日子用单日期；手机上按天翻内容用「横滑日期带」。

## 注意

“近 7 天”含不含今天是最常见的争论：今天没走完，含了今天数字就偏低。定一种口径，写在面板底部，全产品一致。

## 要点

- 快捷选项用组件自带的位置，不在选择器外面另做一排按钮：Element Plus shortcuts（[{ text, value: () => [start, end] }]），Naive UI shortcuts（{ 近 7 天: () => [start, end] }），Ant Design Vue presets（[{ label, value: [dayjs, dayjs] }]）
- 常用 4–6 个：今天、昨天、近 7 天、近 30 天、本月、上月；默认选最常用的一档，不默认空
- 口径只定一种，写在面板底部或框下：“近 N 天”截至昨天，“今天”到当前时刻并标明还没走完，“本月”含今天；全产品一致
- 点快捷选项后框里写出两端日期、日历选中区间，用户看得到选了哪几天；不要只显示“近 7 天”四个字
- 手动改了日期，快捷选项不留选中态
- 范围上限和晚于今天的日期用禁用回调置灰，悬停说明原因；要更长范围时引导用导出
- 时间范围写进地址栏，见「筛选联动与 URL 同步」

## 提示词

给{报表页的时间筛选}做带快捷选项的日期范围：用组件库自带的范围选择器，快捷选项用它自带的位置（Element Plus el-date-picker type="daterange" :shortcuts；Naive UI n-date-picker type="daterange" :shortcuts；Ant Design Vue a-range-picker :presets），不在选择器外面另做一排按钮。快捷选项：今天 / 昨天 / 近 7 天 / 近 30 天 / 本月 / 上月，默认{最常用的一档}；口径：“近 N 天”截至昨天，“今天”到当前时刻并标明还没走完，“本月”含今天，在面板底部或框下写一句；选完框里写出两端日期；自定义最多 {天数} 天，超出和晚于今天的日期用禁用回调置灰并说明；手动改日期后快捷选项取消高亮；时间范围写进地址栏；窄屏改单月底部面板。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<link rel="stylesheet" href="../../_shared/calendar.css">
<style>
.s{padding:8px 10px}
</style>

<div class="s"><div class="rp"></div></div>

<script type="module">
import { addDays, rangePicker, TODAY } from '../../_shared/calendar.ts';
export default function demo(root) {
  const y = addDays(TODAY, -1);
  const presets = [
    { name: '今天', range: [TODAY, TODAY], note: '截至 14:30，今天还没走完' },
    { name: '昨天', range: [y, y] },
    { name: '近 7 天', range: [addDays(y, -6), y] },
    { name: '近 30 天', range: [addDays(y, -29), y] },
    { name: '本月', range: ['2026-10-01', TODAY] },
    { name: '上月', range: ['2026-09-01', '2026-09-30'] },
  ];
  rangePicker(root, { presets, value: presets[2].range, max: TODAY, maxDays: 92 });
}
</script>
