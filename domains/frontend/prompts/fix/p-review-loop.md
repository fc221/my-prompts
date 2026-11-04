---
zh: 先诊断后定点修改
en: Review, fix, recheck
order: 20
---

## 是什么

症状：每次让 AI“优化一下”，它都会顺手改坏你本来满意的地方。改成三轮：先只诊断、列编号，你挑几条，它只改这几条，改完按同样的路径再走一遍确认。

## 要点

- 写清页面给谁用、最希望他们先做什么，AI 才分得清问题轻重。
- 第一轮明确“不改代码”，看完清单再决定改哪几条。
- 挑选时直接回编号，如“只改 1 和 3”。
- {要保留的文案、图片、配色和功能}写具体：哪段文案、哪张图、哪种配色、哪个功能。

## 提示词

{页面地址或文件}是给{角色}用的，最希望他们先{主要任务}。请分三轮，每轮结束停下等我：

第一轮 只诊断，不改代码：沿着{浏览路径，如 首页 → 详情 → 返回列表}实际走一遍，先列最影响主要任务的问题，不超过 5 条。每条按这个格式：编号｜位置和状态（哪一页、哪个区域、什么宽度或做了什么操作之后）｜看到了什么｜对任务的影响｜最小改法｜改完怎么验证。功能错误、层级问题、个人风格偏好分开标注，没把握的写“推测”。没能真的打开页面，就说明你只看了代码或截图；没发现问题就直说，不要为了凑数提改动。

第二轮 定点修改：只改我选中的编号，只动相关的区域和状态；保留{要保留的文案、图片、配色和功能}；沿用项目里已有的组件和样式，不换技术栈、不顺手重做别的页面。改之前记下可以回退的差异；发现必须超出范围才能改好时，先停下来说明原因。

第三轮 复查：按第一轮同样的路径再走一遍，逐条说明问题是否解决，并检查直接相关的点击、切换、返回、焦点和窄屏表现。最后分三类列出：实际操作验证过的、只看了代码或截图的、还没验证的。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{padding:8px;font-size:10px;line-height:14px}
.say{display:inline-block;margin:0;padding:3px 7px;border-radius:8px 8px 8px 2px;background:#eef0f3}
.rd{margin-top:6px;color:#5b616e}
.rd:first-child{margin-top:0}
.say.m{margin-top:6px}
.rd b{display:inline-block;margin-right:4px;padding:0 4px;border-radius:3px;background:#e6ebff;color:#3b5bdb;font-weight:600}
.ls{margin:2px 0 0;padding:0;list-style:none;counter-reset:k}
.ls li{display:flex;gap:4px}
.ls li::before{flex:none;width:10px;color:#1f9d61;font-weight:600;content:'✓'}
.ls li.x{color:#d92d20}
.ls li.x::before{content:'✕';color:#d92d20}
.ls.n li::before{content:counter(k);counter-increment:k;color:#5b616e}
.nt{margin-top:6px;color:#d92d20}
.ok2{color:#1f9d61}
</style>

<div class="fx">
  <section class="fx-p"><h4>直接“优化一下”</h4><div class="fx-b"><div class="fx-z c"><p class="say">优化一下这个页面</p><div class="rd">AI 一口气改了 12 处：</div><ul class="ls"><li>标题字号改大了</li><li class="x">品牌色换成了蓝紫</li><li class="x">首页横幅被删了</li><li class="x">导航顺序重排了</li></ul><div class="nt">满意的地方也被改了</div></div></div></section>
  <section class="fx-p ok"><h4>分三轮</h4><div class="fx-b"><div class="fx-z c"><div class="rd"><b>第一轮</b>只看，不改</div><ol class="ls n"><li>标题太小</li><li>按钮太多分不清主次</li><li>表格太挤</li></ol><p class="say m">只改 1 和 3</p><div class="rd"><b>第二轮</b>只改 1、3</div><div class="rd"><b>第三轮</b>同路径复查 <span class="ok2">✓</span></div></div></div></section>
</div>
