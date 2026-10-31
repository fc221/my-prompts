---
zh: 优化点击热区
en: Hard to tap
aka: 按钮点不中 老误触
order: 200
---

## 是什么

症状：小图标要点好几次，头像和名字中间点了没反应，横滑卡片上的按钮一点就翻页，点完不确定点没点上又点一次。

## 要点

- 适合手机和触屏页面。
- 附上出问题的截图或位置。
- 鼠标为主的桌面后台，热区按 24–32px 检查即可。

## 提示词

{页面}在手机上经常点不中或误触。请逐项检查并修改：
1. 所有可点元素热区 ≥ 44×44px：小图标视觉尺寸不变，用 padding 或 ::before 把热区撑大；相邻两个目标的热区不重叠，间隔 ≥ 8px。
2. 指向同一个去处的头像、名称、副标题包成一个链接，热区覆盖中间的空隙；块里的独立按钮放在链接外面。
3. 可横滑区域里的按钮离滑动边缘 ≥ 16px，或挪到滑动区外；按下后位移 < 10px 且 300ms 内抬起算点按，超过才算滑动。
4. 按下的同一帧给按下态（加深 + 缩到 0.97），按钮设 touch-action: manipulation；松手立即切到结果态，支持时轻震 10ms；500ms 内的重复点按忽略。
5. 删除、退出这类危险按钮和常用按钮拉开距离，不放在拇指最常落的位置旁边。
6. 在 390px 宽下给可点元素加描边显示热区，逐个点一遍，列出修改前后的热区尺寸。
出问题的地方：{位置或截图说明}。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{padding:6px;display:flex;justify-content:center}
.ph{position:relative;width:96px;height:142px;border:2px solid #2b2f36;border-radius:10px;background:#fff;overflow:hidden;font-size:8px;line-height:10px;color:#1f2329}
.hd{height:16px;padding:0 6px;border-bottom:1px solid #eef0f3;font-size:9px;line-height:16px;font-weight:600}
.row{display:flex;align-items:center;gap:3px;padding:3px;border-bottom:1px solid #f1f3f6}
.av{display:block;flex:none;width:12px;height:12px;border-radius:50%;background:linear-gradient(135deg,#f0b35a,#d9480f)}
.row:nth-child(3) .av{background:linear-gradient(135deg,#74c0fc,#3b5bdb)}
.row:nth-child(4) .av{background:linear-gradient(135deg,#8ce99a,#2f9e44)}
.nm{min-width:0}
.nm b{display:block;font-size:9px;font-weight:600;white-space:nowrap}
.nm small{display:block;color:#5b616e;font-size:7px;white-space:nowrap}
.ic{display:grid;place-items:center;flex:none}
.star{width:7px;height:7px;background:#8a909c;clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)}
.more{width:8px;height:2px;background:radial-gradient(circle,#8a909c 1px,transparent 1.2px) 0 0/3px 2px}
.hit{outline:1px dashed #d9480f;outline-offset:-1px;border-radius:2px}
.bar{position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;padding:4px 6px 6px;border-top:1px solid #eef0f3}
.btn{border-radius:3px;text-align:center;white-space:nowrap}
/* 改前：热区只有图标那么大且挨在一起，头像和名字是两个点击区，中间点了没反应，删除紧贴保存 */
.bad .av,.bad .nm{outline:1px dashed #d9480f;outline-offset:1px}
.bad .nm{flex:none}
.bad .sp{flex:1}
.bad .ic{width:7px;height:7px;margin-left:2px}
.bad .bar{justify-content:flex-end;gap:2px}
.bad .btn{padding:1px 4px;font-size:7px;line-height:9px;color:#fff}
.bad .del{background:#e03131}
.bad .ok{background:#3b5bdb}
/* 改后：热区撑到 44（虚线框），头像、名字、副标题包成一个链接，图标热区间隔 8，删除远离保存 */
.good .hit{outline-color:#1f9d61}
.good .lk{display:flex;flex:1;align-items:center;gap:3px;min-width:0;height:16px;padding:0 2px;margin-left:-2px}
.good .ic{width:14px;height:14px;margin-left:3px}
.good .bar{justify-content:space-between}
.good .del{height:16px;padding:0 3px;line-height:16px;color:#5b616e}
.good .ok{width:46px;height:18px;line-height:18px;background:#3b5bdb;color:#fff;font-size:9px}
</style>

<div class="fx">
  <section class="fx-p"><h4>改前</h4><div class="fx-b"><div class="fx-z c bad"><div class="ph"><div class="hd">会员</div><div class="row"><span class="av"></span><span class="nm"><b>李雯</b><small>昨天到店</small></span><span class="sp"></span><span class="hit ic"><i class="star"></i></span><span class="hit ic"><i class="more"></i></span></div><div class="row"><span class="av"></span><span class="nm"><b>周海</b><small>3 天前</small></span><span class="sp"></span><span class="hit ic"><i class="star"></i></span><span class="hit ic"><i class="more"></i></span></div><div class="row"><span class="av"></span><span class="nm"><b>陈曦</b><small>上周到店</small></span><span class="sp"></span><span class="hit ic"><i class="star"></i></span><span class="hit ic"><i class="more"></i></span></div><div class="bar"><span class="btn del">删除</span><span class="btn ok">保存</span></div></div></div></div></section>
  <section class="fx-p ok"><h4>改后</h4><div class="fx-b"><div class="fx-z c good"><div class="ph"><div class="hd">会员</div><div class="row"><span class="hit lk"><span class="av"></span><span class="nm"><b>李雯</b><small>昨天到店</small></span></span><span class="hit ic"><i class="star"></i></span><span class="hit ic"><i class="more"></i></span></div><div class="row"><span class="hit lk"><span class="av"></span><span class="nm"><b>周海</b><small>3 天前</small></span></span><span class="hit ic"><i class="star"></i></span><span class="hit ic"><i class="more"></i></span></div><div class="row"><span class="hit lk"><span class="av"></span><span class="nm"><b>陈曦</b><small>上周到店</small></span></span><span class="hit ic"><i class="star"></i></span><span class="hit ic"><i class="more"></i></span></div><div class="bar"><span class="hit btn del">删除</span><span class="hit btn ok">保存</span></div></div></div></div></section>
</div>
