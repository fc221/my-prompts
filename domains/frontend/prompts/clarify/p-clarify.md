---
zh: 把大白话整理成需求
en: Clarify first
aka: 大白话→结构化需求
order: 10
---

## 是什么

让 AI 先复述理解、补齐缺口、最多问 3 个问题，等你确认后再动手。

## 适合

只有一句“做个好看点的后台首页”“加个有感觉的动画”，自己也说不清要什么的时候。

## 要点

- 原话原样贴进 {我的原话}，不用先整理。
- 能补的背景尽量补：给谁用、设备、品牌色。
- 先看 AI 列的【假设】，不对就改，再让它开工。
- 问题答不上来就回一句“按推荐”。
- 在已有项目里改时，补一句“先读项目里已有的组件和样式”。
- 三个旋钮（构图张力、动效多少、内容密度）先让 AI 按场景给建议值，你只改不同意的那一个。

## 提示词

我有一个前端需求，但说得比较口语：
“{我的原话}”

补充背景（不确定的可以留空）：
- 给谁用、在什么场景：{角色和场景，如“运营每天早上用电脑看”}
- 设备：{电脑 / 手机 / 两者}
- 品牌色或参考：{色值或“没有”}
- 已有项目或组件库：{有就写，没有写“新项目”}

请先不要写代码，按下面五段回复：
【理解】一句话复述：这是什么页面，给谁在什么场景下用，核心要解决的问题或任务是什么；我没写场景时，先从原话推断一个并标明“推断”。
【三个旋钮】各给 1–5 档的建议值和一句理由：构图张力（1 规整对齐，5 大胆错落）、动效多少（1 只有必要反馈，5 处处有动效）、内容密度（1 宽松留白，5 一屏塞满）。后面的风格和布局都按这三个值来。
【结构化需求】依次写清：页面类型；核心问题（这一页回答什么）；内容与数据（字段、指标、文案，没有就给真实可信的示例并标注占位）；关键操作（筛选、编辑、提交、删除等，以及成功和失败后怎样）；布局骨架；风格（配色、圆角、间距、字号的具体值）；必须有的状态（加载、空、错误、无权限）；能力边界（哪些只做前端展示）。
【假设】你替我做的默认选择，逐条列出。
【待确认】最多 3 个会影响结果的问题，每个附上推荐答案；我不回答就按推荐做。

可逆的视觉选择直接给默认值，不要问我；只有真实数据来源、删除能否恢复、权限、费用、是否真的发送这类问题才问。我确认后再开始实现。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{padding:8px}
.say{margin:0;padding:6px 8px;border-radius:8px 8px 8px 2px;background:#eef0f3;font-size:11px;line-height:16px}
.q{margin:6px 0 0;color:#5b616e;font-size:10px;line-height:14px}
.r{display:grid;grid-template-columns:auto minmax(0,1fr);gap:2px 6px;margin:0;font-size:10px;line-height:14px}
.r dt{color:#5b616e}
.r dd{margin:0}
.ask{margin-top:6px;padding-top:4px;border-top:1px solid #e3e6eb;color:#3b5bdb;font-size:10px;line-height:14px}
</style>

<div class="fx">
  <section class="fx-p"><h4>你说的</h4><div class="fx-b"><div class="fx-z c"><p class="say">帮我做个会员积分页，要好看一点，能看积分能兑换东西。</p><p class="q">AI 只好自己猜：谁在用、在哪用、什么算做完。</p></div></div></section>
  <section class="fx-p ok"><h4>AI 先复述</h4><div class="fx-b"><div class="fx-z c"><dl class="r"><dt>给谁</dt><dd>门店会员，手机上用</dd><dt>做什么</dt><dd>看余额、明细，兑换商品</dd><dt>完成</dt><dd>下单成功并扣减积分</dd></dl><div class="ask">确认前先问：积分会过期吗？</div></div></div></section>
</div>
