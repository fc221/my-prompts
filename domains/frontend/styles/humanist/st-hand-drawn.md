---
zh: 手绘涂鸦
en: Hand-drawn doodle
aka: 手绘风 涂鸦风 草图风 白板风 sketch doodle
order: 30
---

## 是什么

线框歪歪扭扭，像拿笔画出来的；重点用荧光马克笔刷一道，旁边再画个箭头、圈上两圈，整页像随手记在方格本上的草稿。

## 适合

笔记、白板和脑图类工具，新手引导和教程页，独立开发者的个人站，课程和社群报名页的局部点缀。

## 不适合

金融、医疗、政务这类要显得严谨的产品，改用「企业稳重」；数据表格和密集表单，框线一抖对齐就乱；想要纸张层叠、剪刻出来的立体感，用「纸艺手作」；想要照片和纸片贴满一页的手账感，用「剪贴拼贴」。

## 注意

抖的只是线，不是布局：卡片、文字和按钮照样按网格对齐，否则看着不像手绘，像没做完。手写字体只给标题和批注，正文也换成手写体会很难读。

## 要点

- 配色：纸白 #fdfcf7，可以铺 16–24px 的浅蓝方格线 #e3ebf5；墨色 #1f2328 画线写字（对底 15:1）；荧光黄 #ffe066 只做马克笔高亮；再加一支批注笔，红 #c8302e 或蓝 #2f6fde（对底都 ≥ 4.5:1）
- 线条：描边 2–2.5px、端点圆头；框线用 SVG path 画成略带抖动的矩形，静态框线加 vector-effect: non-scaling-stroke 防止拉伸变粗，或者用不对称圆角模拟，如 border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px；整页抖动幅度一致
- 字体：标题和批注用手写体，中文推荐霞鹜文楷，英文和数字可用 Caveat，后备 "Kaiti SC"、KaiTi、cursive；正文用系统黑体 16px / 1.7
- 阴影：不用模糊阴影，改成错开 3–4px 的第二条线，或者 45° 排线当影子；圆角交给手绘线自己决定，不另设
- 装饰：箭头、圈注、波浪下划线加起来一屏最多 3 处，只给真正的重点；图标统一用同一粗细的手绘线性图标
- 卡片可以旋转 ±1–2°，同一行最多转一张；按钮悬停时线框换一组 border-radius 抖一下，背景填上荧光黄
- 动效：线条用 stroke-dasharray 和 stroke-dashoffset 画出来，路径设 pathLength="1"，两个值都从 1 起算，这类路径不加 non-scaling-stroke（否则会画不全），600–900ms ease-out；马克笔高亮从左往右刷开 400ms；都只播一次，减少动态效果时直接显示画好的样子
- 窄屏：取消旋转，箭头这类指向性装饰隐藏，只留高亮和圈注

## 提示词

把{产品}的{页面}做成手绘涂鸦风：纸白 #fdfcf7 底，可铺 20px 浅蓝 #e3ebf5 方格；墨色 #1f2328 画线写字，荧光黄 #ffe066 只做马克笔高亮，批注用红 #c8302e；卡片和按钮的框用 SVG path 画成略带抖动的矩形（或用不对称 border-radius），描边 2.5px、圆头，不用模糊阴影，用错开 3px 的第二条线当影子；标题和批注用霞鹜文楷（后备 Kaiti SC、KaiTi、cursive），英文和数字用 Caveat，正文系统黑体 16px / 1.7；箭头、圈注、波浪线一屏加起来最多 3 处；卡片可以转 ±1.5°，内容仍按网格对齐；按钮悬停时线框变形、填荧光黄；线条用 stroke-dashoffset 画出 800ms，高亮从左刷开 400ms，只播一次，减少动态效果时直接显示终态；窄屏取消旋转、隐藏箭头。

## 示例

<style>
:host{container-type:size}
.s{--ink:#1f2328;--hd:"HanziPen SC","Hannotate SC","Kaiti SC",STKaiti,KaiTi,"Chalkboard SE",cursive;height:100%;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:center;gap:18px;padding:14px 20px;overflow:hidden;color:var(--ink);font:12px/1.6 system-ui,"PingFang SC",sans-serif;background:linear-gradient(#e3ebf5 1px,transparent 1px) 0 0/20px 20px,linear-gradient(90deg,#e3ebf5 1px,transparent 1px) 0 0/20px 20px,#fdfcf7}
.l{min-width:0}
.note{position:relative;display:inline-block;margin-left:6px;color:#c8302e;font:700 13px/1.4 var(--hd)}
.note svg{position:absolute;inset:-7px -12px -6px -12px;width:calc(100% + 24px);height:calc(100% + 13px);overflow:visible}
h1{margin:6px 0 10px;font:700 clamp(22px,14cqh,44px)/1.2 var(--hd)}
mark{padding:0 2px;color:inherit;background:linear-gradient(transparent 52%,#ffe066 52% 94%,transparent 94%) no-repeat 0 0/100% 100%;animation:brush .4s .7s ease-out both}
.sub{display:none;margin:-4px 0 12px;color:#4a4f57}
.row{display:flex;align-items:center;gap:6px}
.btn{display:inline-flex;align-items:center;height:34px;padding:0 16px;border:2.5px solid var(--ink);border-radius:255px 15px 225px 15px/15px 225px 15px 255px;background:#fdfcf7;box-shadow:3px 3px 0 0 #fdfcf7,3px 3px 0 2.5px var(--ink);color:var(--ink);font:700 14px/1 var(--hd);text-decoration:none;white-space:nowrap;transition:border-radius .2s,background-color .2s}
.btn:hover{border-radius:15px 225px 15px 255px/255px 15px 225px 15px;background:#ffe066}
.btn:focus-visible{outline:2px dashed #2f6fde;outline-offset:5px}
.arr{flex:none;width:44px;height:24px;overflow:visible}
svg path{fill:none;stroke:var(--ink);stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}
.dr{vector-effect:none;stroke-dasharray:1;animation:draw .8s ease-out both}
.note .dr{stroke:#c8302e;animation-delay:.9s}
.arr .dr{animation-delay:1.1s}
.card{position:relative;padding:12px 14px 12px 16px;transform:rotate(-1.5deg)}
.fr{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.fr .sh{stroke-width:1.4;opacity:.45}
.card b{position:relative;display:block;margin-bottom:4px;font:700 15px/1.4 var(--hd)}
ul{position:relative;margin:0;padding:0;list-style:none;display:grid;gap:3px}
li{display:flex;align-items:center;gap:6px;white-space:nowrap}
li svg{flex:none;width:15px;height:15px;overflow:visible}
li .ck{stroke:#c8302e;stroke-width:2.6;animation-delay:1.3s}
li:nth-child(2) .ck{animation-delay:1.5s}
li.more{display:none}
@keyframes draw{from{stroke-dashoffset:1}}
@keyframes brush{from{background-size:0 100%}}
@container (max-width:300px){.s{gap:12px;padding-inline:16px}
.arr{display:none}
.card{transform:none;padding-inline:12px}
}
@container (min-height:260px){.s{padding:24px 40px;gap:36px}
.note{font-size:15px}
.sub{display:block;font-size:14px}
.btn{height:42px;padding:0 22px;font-size:17px}
.arr{width:64px;height:32px}
.card{padding:20px 22px}
.card b{font-size:19px;margin-bottom:8px}
li{font-size:14px;gap:8px}
li svg{width:18px;height:18px}
li.more{display:flex}
}
@media (prefers-reduced-motion:reduce){mark,.dr{animation:none}
.btn{transition:none}
}
</style>

<div class="s">
  <div class="l">
    <span class="note">新手上路<svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path class="dr" pathLength="1" d="M14 6C40 0 90 2 97 16C101 30 62 38 32 36C8 34-2 22 5 12C9 6 18 4 30 3"/></svg></span>
    <h1>三分钟<br>写完<mark>周报</mark></h1>
    <p class="sub">勾完待办，周五 18:00 前自动发给主管</p>
    <div class="row"><a class="btn" href="#">开始记录</a><svg class="arr" viewBox="0 0 44 24" aria-hidden="true"><path class="dr" pathLength="1" d="M3 18C12 6 26 4 40 11M33 5l8 6-8 5"/></svg></div>
  </div>
  <div class="card">
    <svg class="fr" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path class="sh" d="M7 8C34 6 72 9 101 7C102 36 100 72 102 103C72 104 36 101 6 103C8 72 5 38 7 8"/><path d="M3 4C30 2 70 5 97 3C98 30 96 70 98 97C70 98 30 96 2 98C3 70 1 30 3 4"/></svg>
    <b>本周待办</b>
    <ul>
      <li><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 3C6 2 11 2 13 3C13 7 14 11 13 14C9 14 5 14 2 13C2 9 1 6 2 3"/><path class="dr ck" pathLength="1" d="M4 8l3 4 9-12"/></svg>回访客户 6 家</li>
      <li><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 3C6 2 11 2 13 3C13 7 14 11 13 14C9 14 5 14 2 13C2 9 1 6 2 3"/><path class="dr ck" pathLength="1" d="M4 8l3 4 9-12"/></svg>门店巡检 3 次</li>
      <li><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 3C6 2 11 2 13 3C13 7 14 11 13 14C9 14 5 14 2 13C2 9 1 6 2 3"/></svg>交报销单 2 张</li>
      <li class="more"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 3C6 2 11 2 13 3C13 7 14 11 13 14C9 14 5 14 2 13C2 9 1 6 2 3"/></svg>排好下周班表</li>
    </ul>
  </div>
</div>
