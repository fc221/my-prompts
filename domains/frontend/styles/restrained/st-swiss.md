---
zh: 瑞士网格
en: Swiss grid
order: 20
---

## 是什么

严格网格对齐、大号无衬线左对齐标题，黑白加一个红，层级极清楚。

## 适合

设计机构、展览与活动页、建筑与文化品牌、年度报告。

## 不适合

不要把网格线画满屏当装饰；不要居中排版和多余装饰，靠对齐和字号对比说话。

## 要点

- 网格：6 或 12 列，所有文字和图形的左边缘落在列线上，主要对齐线不超过 3 条
- 配色：白底、墨黑 #111，一个纯正的红（如 #d6201f）做唯一强调，只用于几何色块或关键数字
- 字体：无衬线粗体大标题（可到 64px 以上），左对齐、右侧参差；正文 14–16px，字号对比 4 倍以上
- 圆角 0；无阴影、无渐变；分隔用留白或 1–3px 黑线
- 版式：不对称，标题跨 4 列、信息栏占 2 列；时间、地点等事实用小字列成清单
- 配图：几何图形、黑白摄影或高对比单色图片
- 动效：几乎没有，进入时沿网格方向 200ms 平移出现一次

## 提示词

把{产品}的{页面}做成瑞士网格风：12 列网格，所有文字和图形左边缘落在列线上；白底、墨黑 #111，唯一强调色 {品牌色}（建议纯红）只用于一个几何色块或关键数字；无衬线粗体大标题左对齐、右侧参差，与 15px 正文对比 4 倍以上；0 圆角、无阴影、无渐变，不画满屏网格线；标题跨 8 列，信息栏占 4 列；窄屏改单列、保持左对齐；只做一次 200ms 平移，减少动态效果时直接显示。

## 示例

<style>
:host{container-type:size}
.s{height:100%;padding:14px 20px;background:#fff;color:#111;font:12px/1.5 system-ui,"PingFang SC",sans-serif}
.g{height:100%;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));grid-template-rows:auto minmax(0,1fr);gap:12px;padding-top:8px;border-top:3px solid #111}
h1{grid-column:1/5;margin:0;font-size:clamp(28px,18cqh,60px);line-height:1;font-weight:900;letter-spacing:-.03em}
.info{grid-column:5/7;display:grid;gap:2px;align-content:start}
.info b{font-weight:700}
.red{grid-column:1/3;background:#d6201f}
p{grid-column:3/5;margin:0;align-self:end}
.no{grid-column:5/7;align-self:end;font-size:clamp(20px,12cqh,44px);line-height:.9;font-weight:900;color:#d6201f}
</style>

<div class="s"><div class="g"><h1>新秩序<br>设计展</h1><div class="info"><b>11 月 8 日 —</b><b>12 月 20 日</b><span>城市美术馆 3F</span><span>周二至周日开放</span></div><div class="red"></div><p>48 位设计师，320 件作品，重新讨论网格与秩序。</p><div class="no">2026</div></div></div>
