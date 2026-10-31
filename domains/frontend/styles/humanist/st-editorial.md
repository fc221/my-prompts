---
zh: 编辑杂志风
en: Editorial
order: 10
---

## 是什么

衬线大标题、粗细分隔线、多栏正文和图注，像一本排得讲究的杂志。

## 适合

内容品牌、媒体、深度报道、年度报告、作品集长文。

## 不适合

不要用“米色底 + 衬线大标题 + 陶土色”的套路组合；中文不要用斜体装文艺。

## 要点

- 配色：近白纸色 #fcfcfa、墨色 #161616，一个有辨识度的强调色（如墨绿 #1f5f4a）只用于期号、引文和链接
- 字体：标题用系统衬线（宋体类）700、32–64px、行高 1.15；正文无衬线 16–17px / 行高 1.8；最多两种字体家族
- 圆角 0；不用阴影；用 2px 粗线 + 1px 细线组织版面层级
- 版式：不对称多栏（如 7 : 5）；图注、期号、作者等 12px 小字贴着对应内容；长文开头可用首字下沉
- 正文行长 35–40 个汉字，段落间距 1em；引文放大 1.5 倍单独成段
- 配图：大幅摄影或插画，统一色调，每张都配图注
- 动效：几乎没有，只做 300ms 淡入；不劫持滚动

## 提示词

把{产品}的{内容页}做成编辑杂志风：近白纸色 #fcfcfa、墨色 #161616，强调色 {品牌色}只用于期号、引文和链接；标题用系统衬线 700、clamp(32px, 5vw, 64px)，正文无衬线 17px / 1.8、行长约 38 字；0 圆角、无阴影，用 2px 粗线和 1px 细线分区，不对称 7 : 5 两栏，配大图和 12px 图注；窄屏改单栏，图注跟在图下；只做 300ms 淡入，减少动态效果时去掉；文字对比度 ≥ 4.5:1。

## 示例

<style>
:host{container-type:size}
.s{height:100%;display:flex;flex-direction:column;padding:12px 20px 14px;background:#fcfcfa;color:#161616;font:12px/1.7 system-ui,"PingFang SC",sans-serif}
header{display:flex;justify-content:space-between;align-items:baseline;padding-bottom:6px;border-bottom:2px solid #161616}
header b{font:700 14px/1.2 ui-serif,"Songti SC",serif;letter-spacing:.12em}
header span{color:#1f5f4a}
.h{flex:1;min-height:0;display:grid;grid-template-columns:7fr 5fr;gap:16px;padding-top:10px}
.l{min-width:0;padding-right:16px;border-right:1px solid #d8d8d2}
h1{margin:0 0 8px;font:700 clamp(19px,11cqh,40px)/1.15 ui-serif,"Songti SC",serif}
p{margin:0;color:#3b3b3b}
.dc{float:left;margin:3px 6px 0 0;font:700 30px/1 ui-serif,"Songti SC",serif;color:#1f5f4a}
figure{margin:0;min-height:0;display:flex;flex-direction:column;gap:4px}
.im{flex:1;min-height:0;background:radial-gradient(circle at 72% 28%,#f3ead2 0 8%,transparent 9%),linear-gradient(172deg,#d5e0d9,#a9bfb2 50%,#6f8f7d 51%,#3f5a4c)}
figcaption{color:#5b5b5b}
@container (max-width:300px){.h{grid-template-columns:3fr 2fr;gap:12px}
.l{padding-right:12px}
p{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden}
}
</style>

<div class="s"><header><b>MyPrompts</b><span>第 42 期 · 2026 秋</span></header><div class="h"><div class="l"><h1>城市边缘的<br>慢生活实验</h1><p><span class="dc">在</span>城市扩张最快的十年里，一群年轻人反向搬到城郊，用菜园和木工房重新安排时间。</p></div><figure><div class="im" role="img" aria-label="清晨的共享菜园"></div><figcaption>图｜清晨的共享菜园</figcaption></figure></div></div>
