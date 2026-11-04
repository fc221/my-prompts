---
zh: 理清页面重点
en: No focal point
aka: 没有重点
tab: 重点
order: 61
of: p-fix-plain
---

## 是什么

症状：所有模块一样大、一样重，扫一眼不知道先看哪里、这页想让我做什么。

## 要点

- 一定要填核心模块，AI 不知道你的业务重点。
- 后台、官网、看板都适用。

## 提示词

页面没有重点，看不出先看哪里。请重新分配主次：
1. 这一页最重要的是{核心模块或核心行动}，其他都为它让路。
2. 主次布局：{核心模块}占 8/12 列、跨两行，面积超过首屏一半；其余模块缩小一号排在右侧和下方；全页只有一个视觉重心。
3. 只保留一个实心主按钮，其余降为次按钮或文字按钮，低频操作收进“更多”。
4. 强调色只给核心模块里最关键的 1–2 处（主按钮、关键数字），其他地方去掉彩色。
5. 拉开字号：核心数字 32px，次要数字 20px；标题和正文至少差两档。
6. 次要信息收起：说明文字缩成一行，细节放进详情或展开。
7. 眯眼检查：眯着眼看页面只剩 2–3 个块，最先看到的必须是{核心模块}。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{padding:8px;font-size:10px;line-height:14px}
.g{display:grid;gap:6px}
.m{display:flex;flex-direction:column;min-width:0;padding:5px;border:1px solid #e3e6eb;border-radius:6px;background:#fff}
.m .l{color:#5b616e;font-size:9px;line-height:12px}
.m b{font-size:12px;line-height:16px;font-weight:600;font-variant-numeric:tabular-nums}
.bt{align-self:flex-start;margin-top:4px;padding:0 6px;border-radius:3px;background:#3b5bdb;color:#fff;font-size:9px;line-height:14px}
/* 改前：四块一样大一样重，数字各带一种颜色，每块都有实心按钮 */
.bad .g{grid-template-columns:1fr 1fr}
.bad .m:nth-child(1) b{color:#3b5bdb}
.bad .m:nth-child(2) b{color:#1f9d61}
.bad .m:nth-child(3) b{color:#d97706}
.bad .m:nth-child(4) b{color:#d92d20}
/* 改后：核心模块占大头、跨三行，只剩一个实心按钮，彩色只给核心数字 */
.good{background:#f5f6f8}
.good .g{grid-template-columns:1.5fr 1fr}
.good .m:first-child{grid-row:1/4;padding:6px}
.good .m:first-child .l{color:#1f2329;font-size:10px;line-height:14px}
.good .m:first-child b{margin-top:2px;color:#3b5bdb;font-size:24px;line-height:28px}
.good .m:first-child .bt{margin-top:auto;padding:0 8px;font-size:10px;line-height:18px}
.good .m:not(:first-child) .bt{display:none}
.good .m:not(:first-child) b{font-size:10px;line-height:14px}
</style>

<div class="fx">
  <section class="fx-p"><h4>改前</h4><div class="fx-b"><div class="fx-z c bad"><div class="g"><div class="m"><span class="l">待办工单</span><b>18</b><span class="bt">去处理</span></div><div class="m"><span class="l">营收</span><b>9,860</b><span class="bt">查看</span></div><div class="m"><span class="l">会员</span><b>36</b><span class="bt">查看</span></div><div class="m"><span class="l">缺货</span><b>5</b><span class="bt">补货</span></div></div></div></div></section>
  <section class="fx-p ok"><h4>改后</h4><div class="fx-b"><div class="fx-z c good"><div class="g"><div class="m"><span class="l">待办工单</span><b>18</b><span class="bt">去处理</span></div><div class="m"><span class="l">营收</span><b>9,860</b><span class="bt">查看</span></div><div class="m"><span class="l">会员</span><b>36</b><span class="bt">查看</span></div><div class="m"><span class="l">缺货</span><b>5</b><span class="bt">补货</span></div></div></div></div></section>
</div>
