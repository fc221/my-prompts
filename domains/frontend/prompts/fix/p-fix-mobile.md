---
zh: 修复手机端排版
en: Broken on mobile
aka: 手机上排版乱
order: 110
---

## 是什么

症状：手机上出现横向滚动、文字挤成一列、按钮太小点不中、底部被挡住。

## 要点

- 附截图，写清出问题的宽度和浏览器。
- App 内嵌页面要额外说明。
- 改完在 360 / 390 / 430 三个宽度复查。

## 提示词

页面在手机上排版乱，请按窄屏重新组织，而不是把桌面版缩小：
1. 消除横向滚动：网格列改 minmax(0, 1fr)，flex 子项加 min-width: 0，长链接和编号加 overflow-wrap: anywhere，不用 100vw，固定宽度改为最大宽度。
2. 布局变形：后台侧栏改左侧抽屉（☰ 打开、带遮罩；App 式产品才用 3–5 项底部标签栏）；多列改单列；表格保留关键列在容器内横滑，或改成卡片列表；含表单的弹窗改全屏页或底部面板；悬停才出现的操作改为常显或收进“更多”。
3. 触控：可点区域 ≥ 44×44px，相邻可点元素间距 ≥ 8px；主操作放在屏幕下半部分。
4. 固定元素：底部栏加 env(safe-area-inset-bottom)；高度用 100dvh（先写 100vh 回退）；软键盘弹出时当前输入框和提交按钮可见。
5. 文字：正文 ≥ 14px，输入框字号 ≥ 16px（避免聚焦时页面放大）；顶栏标题单行省略，不折行。
6. viewport 写 width=device-width, initial-scale=1，不禁止缩放。
在 360 / 390 / 430 宽逐一检查，列出修了什么。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{padding:6px;display:flex;justify-content:center}
.ph{position:relative;width:96px;height:142px;border:2px solid #2b2f36;border-radius:10px;background:#fff;overflow:hidden;font-size:8px;line-height:11px;color:#1f2329}
.tb{display:flex;align-items:center;gap:4px;height:14px;padding:0 5px;background:#3b5bdb;color:#fff;white-space:nowrap}
.bd{padding:5px}
.card{border:1px solid #e3e6eb;border-radius:4px;padding:4px}
.st{display:grid;gap:2px}
.st span{display:block;color:#5b616e}
.st b{display:block;font-weight:600}
.btn{border-radius:3px;background:#3b5bdb;color:#fff;text-align:center}
/* 改前：桌面版直接缩小 — 顶栏挤满、侧栏占位、文字挤成一列、表格撑出屏幕要横滑、按钮很小 */
.bad .tb{font-size:7px;gap:3px;padding:0 4px}
.bad .bd{display:grid;grid-template-columns:20px minmax(0,1fr);gap:4px}
.bad .sb{display:flex;flex-direction:column;gap:3px;padding-top:2px}
.bad .sb i{display:block;height:5px;border-radius:1px;background:#d4d8df}
.bad .st{grid-template-columns:repeat(3,minmax(0,1fr))}
.bad .st b{overflow-wrap:anywhere}
.bad .tr{display:flex;align-items:center;gap:2px;width:150px;margin-top:4px}
.bad .tr span{flex:none}
.bad .tr i{flex:none;width:30px;height:9px;border-radius:2px;background:#e3e6eb}
.bad .btn{display:inline-block;margin-top:4px;padding:1px 3px;font-size:7px;line-height:9px}
.bad .scr{position:absolute;left:6px;right:6px;bottom:2px;height:3px;border-radius:2px;background:#eef0f3}
.bad .scr::after{content:"";position:absolute;left:0;top:0;width:55%;height:100%;border-radius:2px;background:#8a909c}
/* 改后：按窄屏重排 — 侧栏收进 ☰、标题单行、单列、表格改卡片、吸底大按钮留安全区 */
.good .tb{height:16px}
.good .mn{position:relative;flex:none;width:8px;height:7px;border-top:1.5px solid #fff;border-bottom:1.5px solid #fff}
.good .mn::after{content:"";position:absolute;left:0;right:0;top:50%;height:1.5px;margin-top:-1px;background:#fff}
.good .tb b{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;font-weight:600}
.good .st{grid-template-columns:1fr}
.good .st div{display:flex;justify-content:space-between}
.good .ls{margin-top:4px}
.good .ls div{display:flex;justify-content:space-between;padding:2px 0;border-top:1px solid #eef0f3}
.good .ls div:first-child{padding-top:0;border-top:0}
.good .ls span{color:#5b616e}
.good .ft{position:absolute;left:0;right:0;bottom:0;padding:4px 5px 8px;background:#fff;border-top:1px solid #eef0f3}
.good .btn{height:18px;font-size:9px;line-height:18px}
</style>

<div class="fx">
  <section class="fx-p"><h4>改前</h4><div class="fx-b"><div class="fx-z c bad"><div class="ph"><div class="tb"><span>概览</span><span>会员</span><span>工单</span><span>设置</span><span>帮助</span></div><div class="bd"><div class="sb"><i></i><i></i><i></i><i></i><i></i><i></i></div><div><div class="card"><div class="st"><div><span>新增会员</span><b>1,280</b></div><div><span>到店人数</span><b>3,560</b></div><div><span>待办工单</span><b>12</b></div></div></div><div class="tr"><span>门店</span><i></i><i></i><i></i><i></i></div><div class="btn">新建工单</div></div></div><div class="scr"></div></div></div></div></section>
  <section class="fx-p ok"><h4>改后</h4><div class="fx-b"><div class="fx-z c good"><div class="ph"><div class="tb"><i class="mn"></i><b>门店经营概览</b></div><div class="bd"><div class="card"><div class="st"><div><span>新增会员</span><b>1,280</b></div><div><span>到店人数</span><b>3,560</b></div><div><span>待办工单</span><b>12</b></div></div></div><div class="card ls"><div><span>朝阳店</span><b>32 单</b></div><div><span>望京店</span><b>18 单</b></div></div></div><div class="ft"><div class="btn">新建工单</div></div></div></div></div></section>
</div>
