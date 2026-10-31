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

- 用组件库自带的快捷选项位（Element Plus、Naive UI 的 shortcuts，Ant Design Vue 的 presets），快捷选项放在面板里，页面上只占一个输入框的位置，不在选择器外面另做一排按钮；常用 4–6 个，默认选最常用的一档，不默认空
- 点快捷选项后框里写出两端日期，日历选中两端并滚到结束日所在的月，用户看得到选了哪几天
- 底部写“共 7 天，不含今天”，用户不用心算
- “近 N 天”截至昨天，保证 N 个完整的天；“今天”写到当前时刻（“截至 14:30”）并标明还没走完；“本月”含今天
- 手动改了日期，快捷选项取消高亮，不留着一个对不上的选中态
- 设范围上限：选了开始日后，超出上限和晚于今天的日期变灰，悬停说明原因；要更长范围时引导用导出
- 快捷选项用 aria-pressed；灰色日期用 aria-disabled，键盘路过时能听到原因
- 时间范围写进地址栏，见「筛选联动与 URL 同步」

## 提示词

给{报表页的时间筛选}做带快捷选项的日期范围：用项目组件库自带的日期范围选择器，快捷选项用它自带的 shortcuts / presets 放进面板，不在选择器外面另做一排按钮。页面上只放一个触发框，写“开始日期 → 结束日期”；点开面板左侧是快捷选项“今天 / 昨天 / 近 7 天 / 近 30 天 / 本月 / 上月”，右侧并排两个月，默认{最常用的一档}。点快捷选项后框里写出两端日期，日历选中两端并画出区间，滚到结束日所在的月；底部写“共 N 天，含今天 / 不含今天”，“清除”清空，“确认”才应用。“近 N 天”截至昨天，“今天”写“截至 HH:mm，还没走完”，“本月”含今天。自定义范围最多 {天数} 天，选了开始日后超出的日期和晚于今天的日期变灰，悬停说明原因；手动改日期后快捷选项取消高亮；快捷选项用 aria-pressed，灰色日期用 aria-disabled；时间范围写进地址栏；窄屏改成单月底部面板。

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
