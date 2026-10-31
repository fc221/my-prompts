---
zh: 滚轮时间选择
en: Scroll-snap time wheel
order: 10
---

## 是什么

时、分两列竖向滚轮，手指一甩带惯性滚动并吸附到整格，中间高亮带是选中值，离中心越远的项越小越淡。

## 适合

手机上选时间、时长、日期、身高体重这类有顺序的值，每列 10–100 项。

## 不适合

桌面表单用原生 input type="time" 或可输入的文本框；少于 5 个选项用分段控件；没有顺序的选项（城市、类别）用列表加搜索。

## 注意

惯性和吸附交给原生 overflow: auto + scroll-snap，不要用脚本模拟物理；选中值以滚动位置为准，不靠点击记录。

## 要点

- 每列 overflow-y: auto + scroll-snap-type: y mandatory，每项高 34–40px、scroll-snap-align: center；上下内边距各留 2 项高度，首尾项也能停到中间。
- 一次露出 5 项，中间一条高亮带，单位（时 / 分）固定在带里，不跟着滚。
- 按离中心的距离缩放和变淡：每远一项缩小约 12%、透明度降约 30%，在 scroll 事件里用 requestAnimationFrame 更新，只动 transform 和 opacity。
- 每列 role="spinbutton"，带 aria-valuemin / max / now 和 aria-valuetext（“7 点”“30 分”）；上下键一格、PageUp / PageDown 一大步、Home / End 到两端。
- 点上下露出的项直接滚到它；鼠标拖动时临时关掉吸附，松手再吸附到最近一项。
- 结果文字（“每天 07:30 响铃，距现在约 8 小时”）跟着选中值更新；需要首尾循环时在两端复制若干项。
- 减少动态效果时，按键和点选直接跳到位，手指滚动保持原生。

## 提示词

给{设置页}做「滚轮时间选择」，共 {列数} 列（如时、分）：每列 overflow-y: auto + scroll-snap-type: y mandatory，每项 34px 居中吸附，上下各留 2 项高度的内边距，一次露出 5 项；中间一条高亮带，单位固定在带里；按离中心的距离缩放（每远一项小 12%）和变淡（透明度每项降 30%），用 requestAnimationFrame 更新；每列 role="spinbutton"，带 aria-valuenow 和 aria-valuetext，上下键一格、PageUp / PageDown 一大步、Home / End 到两端；点露出的项直接滚过去；鼠标拖动时临时关掉吸附；旁边显示结果文字；减少动态效果时按键和点选直接跳到位。
