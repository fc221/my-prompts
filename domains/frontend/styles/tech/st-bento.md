---
zh: Bento 网格
en: Bento grid
order: 20
---

## 是什么

大小不一的圆角格子拼成一整块，每格讲一件事，像便当盒一样规整。

## 适合

产品功能总览、发布会亮点、个人主页、数据概览。

## 不适合

不要格子大小全一样（那就成了普通卡片墙）；每格只讲一件事，别塞满文字。

## 要点

- 网格：4–6 列，格子跨 1×1、2×1、2×2，主格面积最大且只有一个；间距 12–16px 统一
- 圆角：格子 20–24px，格内元素 12px；格子之间不加边框，靠底色差区分
- 配色：浅灰底 #f2f3f5 + 白格，1 格用品牌色实底、1 格用深色，其余保持白色
- 每格内容：一个标题 + 一个视觉（数字、截图、图标或小动画），文字不超过两行
- 阴影：无或极轻；可点的格子悬停时升一级阴影或放大到 1.02
- 窄屏改为 2 列，主格占满一行，其余按重要性排序
- 动效：只给 1–2 个格子做与内容相关的小动画，其余静止

## 提示词

把{产品}的{功能总览}做成 Bento 网格：浅灰底 #f2f3f5，4 列网格、间距 12px，格子圆角 24px；主格跨 2×2 讲{核心卖点}并配产品截图，其余格子跨 1×1 或 2×1，每格一个标题 + 一个视觉；1 格用 {品牌色} 实底、1 格深色，其余白色；可点的格子悬停升一级阴影；窄屏改 2 列、主格满宽；只给 1–2 格做小动画，减少动态效果时静止；格内文字对比度 ≥ 4.5:1，不超过两行。

## 示例

<style>
:host{container-type:size}
.s{height:100%;padding:12px;background:#f2f3f5;color:#1f2329;font:12px/1.4 system-ui,"PingFang SC",sans-serif}
.g{height:100%;display:grid;gap:8px;grid-template-columns:repeat(4,minmax(0,1fr));grid-template-rows:repeat(2,minmax(0,1fr));grid-template-areas:"a a b c" "a a d d"}
.g>div{min-width:0;min-height:0;display:flex;flex-direction:column;gap:4px;padding:12px;border-radius:clamp(14px,8cqh,24px);background:#fff;overflow:hidden}
small{color:#5b616e}
.g>.a{grid-area:a}
.a b{font-size:clamp(14px,8cqh,26px);line-height:1.3}
.pv{flex:1;min-height:0;margin:4px 0;border-radius:10px;background:linear-gradient(transparent 60%,rgba(0,0,0,.25)),radial-gradient(circle at 30% 40%,#ffd27a 0 10%,transparent 11%),linear-gradient(160deg,#9ec5ff,#c9b8ff 55%,#7a8fd6)}
.ui{display:grid;gap:4px}
.ui i{height:8px;border-radius:4px;background:#e3e6eb}
.ui i:nth-child(1){width:80%;background:#3b5bdb}
.ui i:nth-child(2){width:55%}
.g>.b{grid-area:b;justify-content:flex-end;background:#3b5bdb;color:#fff}
.b b{font-size:clamp(20px,13cqh,40px);line-height:1}
.b small{color:#e6ecff}
.g>.c{grid-area:c;justify-content:space-between;background:#1f2329;color:#e8eaee}
.c svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.75;stroke-linecap:round}
.c small{color:#c3c8d1}
.g>.d{grid-area:d;justify-content:space-between}
.av{display:flex;align-items:center}
.av i{width:24px;height:24px;margin-right:-6px;border-radius:50%;border:2px solid #fff;background:linear-gradient(135deg,#ffb27a,#e0457b)}
.av i:nth-child(2){background:linear-gradient(135deg,#7fd1c7,#3b5bdb)}
.av i:nth-child(3){background:linear-gradient(135deg,#ffd27a,#f08c00)}
.av span{margin-left:12px;color:#5b616e}
</style>

<div class="s"><div class="g"><div class="a"><small>智能剪辑</small><b>一句话，<br>剪好整条视频</b><div class="pv" aria-hidden="true"></div><div class="ui"><i></i><i></i><i></i></div></div><div class="b"><b>4K</b><small>60 帧导出</small></div><div class="c"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 10.5a2 2 0 1 0 0 3M16 10.5a2 2 0 1 0 0 3"/></svg><small>自动字幕</small></div><div class="d"><small>多人协作 · 实时同步</small><div class="av"><i></i><i></i><i></i><span>+5</span></div></div></div></div>
