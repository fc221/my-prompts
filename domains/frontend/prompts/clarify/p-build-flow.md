---
zh: 先定规则再画页面
en: Rules-first build flow
order: 50
---

## 是什么

让 AI 按“全局规则 → 页面结构 → 功能状态 → 首屏样板 → 铺开其余页面”的顺序做一整套界面，每一步先交一份短结果，你点头了再往下走。

## 适合

从零做一个新产品或新模块、要出好几个页面，不想让 AI 一上来就写出风格各异、状态缺一半的页面时。

## 要点

- 已有设计规范、组件库或品牌色就写进 {现有规范}，AI 只补缺的部分，不另起一套。
- 前三步只看文字结果，回复“继续”或直接改它的【假设】。
- 首屏样板看顺眼了，再让它照着铺开，返工最少。
- 只改一个已有页面时用“页面精修”里对应的条目；整个已有项目变乱了用「整站翻新」。

## 提示词

我要做{产品}的界面，主要给{角色}用来{核心任务}，大约 {页面数} 个页面。已有：{现有规范、组件库或品牌色，没有就写“无”}。

请分 5 步做，每步交付后停下，等我回复“继续”再进行下一步：
1. 全局规则：定一小套令牌——颜色角色（背景、表面、边框、文字、次要文字、强调、危险、成功）、字号阶梯、间距基准、圆角、阴影、内容最大宽度；再写按钮、输入框、卡片在默认 / 悬停 / 聚焦 / 禁用 / 出错时的样子。有现成规范就沿用，只列出你新增或改动的项和理由。
2. 页面结构：列页面清单、公共布局（导航放哪、主区怎么分）、页面之间怎么跳，以及核心数据对象和字段；每页写一句“用户来这里主要做什么”。
3. 功能状态：每个关键操作（新建、编辑、删除、搜索、保存等）写清 触发 → 进行中 → 成功 → 失败 → 取消或再来一次；每个列表写空状态、加载中、超长文字和条目很多时的样子。没有后端的写明“只改前端状态”，不显示假成功。
4. 首屏样板：只用第 1 步的令牌和真实组件实现最有代表性的一页（{主工作页}），把第 3 步里这一页的状态都做出来；文字和按钮都是真元素，不用整张图片铺底再盖按钮。
5. 铺开：照样板实现其余页面，复用同一批组件和令牌，不另做第二套按钮、弹窗；窄屏重新安排层级，不把桌面版整体缩小。

只在答案会改变页面安排时才问我（例如“以浏览为主还是以编辑为主”），其余直接给默认值，写进【假设】。每步结尾写三行：这一步做完了什么；哪些还只是文字方案、没有实现；需要我决定的事。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{padding:6px 8px}
/* 左：三页一口气画完，各长各样 */
.pg{display:flex;align-items:center;justify-content:space-between;gap:4px;height:24px;padding:0 6px;border:1px solid #e3e6eb;border-radius:4px;font-size:9.5px;line-height:13px;color:#5b616e}
.pg+.pg{margin-top:4px}
.b{padding:0 6px;color:#fff;font-size:9px;line-height:14px;white-space:nowrap}
.b1{background:#3b5bdb;border-radius:2px}
.b2{background:#1f9d61;border-radius:7px}
.b3{background:#8b5cf6;border-radius:4px;padding:0 10px}
.q{margin:6px 0 0;color:#5b616e;font-size:10px;line-height:14px}
/* 右：五步，每步先交短结果 */
.st{margin:0;padding:0;list-style:none;font-size:10px;line-height:14px}
.st li{display:flex;align-items:center;gap:5px;padding:2px 0}
.st i{flex:none;width:14px;height:14px;border-radius:50%;background:#3b5bdb;color:#fff;font-style:normal;font-size:9px;line-height:14px;text-align:center}
.st span{flex:1}
.st small{color:#5b616e;font-size:9px;line-height:12px;padding:0 4px;border-radius:3px;background:#eef0f3;white-space:nowrap}
.mo{margin:4px 0 0;padding-top:4px;border-top:1px solid #e3e6eb;color:#1f7a4d;font-size:9.5px;line-height:13px}
</style>

<div class="fx">
  <section class="fx-p"><h4>一口气全画</h4><div class="fx-b"><div class="fx-z c"><div class="pg">订单列表 <span class="b b1">新建</span></div><div class="pg">客户详情 <span class="b b2">保存</span></div><div class="pg">设置 <span class="b b3">确定</span></div><p class="q">三页三套按钮和圆角，空、错误状态一个没有。</p></div></div></section>
  <section class="fx-p ok"><h4>分步先交短结果</h4><div class="fx-b"><div class="fx-z c"><ol class="st"><li><i>1</i><span>全局规则</span><small>文字</small></li><li><i>2</i><span>页面结构</span><small>文字</small></li><li><i>3</i><span>功能状态</span><small>文字</small></li><li><i>4</i><span>首屏样板</span><small>一页</small></li><li><i>5</i><span>铺开其余页面</span><small>复用</small></li></ol><p class="mo">每步停下，你点头再往下</p></div></div></section>
</div>
