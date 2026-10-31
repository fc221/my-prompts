---
zh: 整站翻新
en: Overhaul an existing site
order: 10
---

## 是什么

已有项目越改越乱：颜色、字号、间距各写各的，同一种按钮有好几版。按“体检 → 收令牌 → 收组件 → 按页面类型改版式 → 加护栏”五步整体翻新，每步停下确认，功能和数据保持不变。

## 适合

写了一段时间、页面不少、风格开始不统一的项目，想整体变整齐，而不只是修某一处。

## 不适合

只有一两处问题时用「先诊断后定点修改」或“页面精修”里对应的条目；从零做新项目用「先定规则再画页面」。

## 要点

- 先量后改：第一步只出数字（颜色、字号、间距、圆角各几种，按钮有几种实现），翻新后用同一组数字对比。
- 先换值、后动结构：第二步只把散落的值换成令牌，页面应该基本不变样，这时截图对比最容易发现误伤。
- 同类页面一批改：列表页一批、表单页一批，比一页一页改更容易统一。
- 想要的样子用「组合」附上，比如字号阶梯、间距、侧栏 + 顶栏、表格，翻新时按附上的条目取值。
- 每一步单独提交，哪步不满意就退回那一步。
- 最后一步把规则变成会报错的检查，否则过几轮又会乱回去。

## 提示词

这个项目的界面越改越乱，请整体翻新。项目给{角色}用来{主要任务}，主要页面：{页面清单，如 列表、详情、表单、看板}。要保留：{功能、文案、品牌色等}。参照规范：{和这条一起组合复制的其他条目，没有就写“无”}。

分 5 步，每步结束停下，等我回复“继续”：
1. 体检，只看不改：把项目跑起来，在 1440 / 768 / 390 宽截主要页面；统计源码里颜色值、字号、间距、圆角、阴影各用了多少种，同类组件（按钮、输入框、弹窗、卡片、表格、空状态）各有几种实现、分别在哪些文件；列出最影响观感的 5 个问题，每条写页面、位置和截图。
2. 收令牌：定一小套令牌（颜色角色、字号阶梯、间距基准、圆角、阴影），有参照规范就按规范取值；给出“旧值 → 令牌”对照表，然后只做替换、结构不动；完成后按第 1 步的宽度重新截图，列出看起来变了的地方。
3. 收组件：每类组件只留一个实现，补齐默认、悬停、聚焦、禁用、加载、出错状态，其余用法都改成它；列出删掉和改动的文件。
4. 改版式：按页面类型分批，同一类页面套同一套布局（导航位置、标题区、筛选区、内容宽度、操作按钮位置）；每批交前后截图，窄屏重新安排层级。
5. 加护栏：加上会报错的检查（令牌以外的色值和间距、绕开项目组件直接写原生控件），并在项目根目录写一份简短的 DESIGN.md：令牌、组件清单（名字、用途、路径）、每类页面用哪套布局。

全程沿用现有技术栈和数据接口，页面行为保持原样；每一步单独提交；要超出当前这一步的范围才能改好时，先停下说明。每步结尾写三行：做完了什么、实际截图验证了什么、需要我决定什么。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{display:flex;flex-direction:column;gap:6px;padding:8px}
.n{color:#5b616e;font-size:10px;line-height:14px}
.pg{display:flex;align-items:center;justify-content:space-between;gap:6px;padding:6px 8px;border:1px solid #e3e6eb;border-radius:6px}
.pg b{display:block;font-size:11px;line-height:14px;font-weight:600}
.pg i{display:block;width:48px;height:4px;margin-top:4px;border-radius:2px;background:#e3e6eb}
.bt{flex:none;padding:0 8px;border-radius:4px;background:#3b5bdb;color:#fff;font-size:10px;line-height:18px}
/* 翻新前：三个页面各写各的颜色、字号、间距、圆角，同一种按钮有三版 */
.bad .p1 b{font-size:12px;color:#111}
.bad .p1 .bt{border-radius:2px;background:#2f6fed}
.bad .p2{padding:10px 8px 6px;border-color:#d5d9e0;border-radius:12px;background:#f8f9fb}
.bad .p2 b{font-size:10px;font-weight:500;color:#444}
.bad .p2 i{width:60px;background:#d5d9e0}
.bad .p2 .bt{border-radius:9px;background:#2f9e62;font-size:9px;line-height:16px}
.bad .p3{padding:4px 8px;border-color:#c9ced6;border-radius:0}
.bad .p3 b{font-size:12px;font-weight:700;color:#000}
.bad .p3 i{width:36px;margin-top:2px}
.bad .p3 .bt{padding:0 9px;border:1px solid #7c3aed;border-radius:0;background:#fff;color:#7c3aed;line-height:20px}
/* 翻新后：同一套令牌，同一个按钮组件，三页一个样 */
</style>

<div class="fx">
  <section class="fx-p"><h4>翻新前</h4><div class="fx-b"><div class="fx-z c bad"><div class="n">颜色 23 种 · 按钮 3 版</div><div class="pg p1"><div><b>门店列表</b><i></i></div><span class="bt">新建</span></div><div class="pg p2"><div><b>新建门店</b><i></i></div><span class="bt">保存</span></div><div class="pg p3"><div><b>门店详情</b><i></i></div><span class="bt">编辑</span></div></div></div></section>
  <section class="fx-p ok"><h4>翻新后</h4><div class="fx-b"><div class="fx-z c"><div class="n">颜色 6 种 · 按钮 1 版</div><div class="pg"><div><b>门店列表</b><i></i></div><span class="bt">新建</span></div><div class="pg"><div><b>新建门店</b><i></i></div><span class="bt">保存</span></div><div class="pg"><div><b>门店详情</b><i></i></div><span class="bt">编辑</span></div></div></div></section>
</div>
