---
zh: 画册内页的八种版式
en: Eight inner-page layouts
aka: 内页版式 画册排版 版式选型 单栏 双栏 卡片 错位 全屏图 网格 组合 宣传册内页
order: 10
---

## 是什么

画册内页最常用的 8 种版式：单栏、双栏、卡片、错位、全屏图、自由、网格、组合。拿到一页内容，先数字数和图片数，再按这张表选版式；一本画册在这几种之间轮换，翻起来才有快有慢，不会每页都长一个样。

## 适合

品牌画册、产品手册、企业宣传册、校刊、活动回顾册、年度画册的内页排版；内容已经定了、不知道这一页该怎么排的时候，当选型表用。

## 不适合

封面和目录有专门的做法，看「色块封面」「斜切封面」「目录页的几种做法」；以表格和图表为主的报告内页，看「数据报告」「研究与政务报告」；一整本成套的页面规划，看「品牌介绍与商业计划书」这类整套模板。

## 注意

版式可以换，网格不换：8 种版式都在同一个 12 栏网格、同一组页边距上变化，页眉、页码和图注的位置全本固定。换版式时只动内容块的组合方式，读者才会觉得还是同一本书。

## 要点

- 单栏：一栏文字，栏宽 100–120mm、每行 28–36 字，正文 10–11pt、行距 1.8，四周留白不少于 25mm。适合序言、致辞、品牌故事这类 1,000 字以内、最多配一张小图的页面。注意栏宽不要拉满版心，行太长读着累。
- 双栏：每页两栏、栏间距 5–6mm，上方可以放一张通栏图。适合 1,000–3,000 字、带小标题的长文，比如产品说明、人物报道、项目介绍。注意两栏底边对齐，小标题不落在栏底。
- 卡片：同尺寸卡片按 2×2、2×3 或 3×3 排，每张一张同比例小图、标题和 2–3 行说明。适合 3–9 个并列项目，比如产品系列、服务项目、门店、团队成员。注意各卡片字数相近，字少的补齐说明，图片统一比例和色调。
- 错位：图和文字块按 Z 字形左右交替，图可以压过中缝或彼此叠 5–10mm。适合 3–5 个有先后顺序的内容，比如发展历程、制作工序、一段故事。注意只在网格线上错开，每块至少有一条边对齐网格。
- 全屏图：一张照片铺满跨页、四边出血，只压一小块标题和一两行说明。适合章节开篇、氛围页、场景大片，前提是手里有一张真正好的照片。注意主体避开中缝两侧各 15mm，文字放在照片最平、明暗最统一的区域。
- 自由：大小不一的照片散放，可以带白边、轻微旋转 2–6 度，文字块穿插其间。适合活动回顾、花絮、幕后这类轻松的内容。注意要有一张最大的主图当锚点，一个跨页不超过 6 个元素。
- 网格：严格等分的格子，常用 3×3、4×3，每格一张图加一行图注。适合 9 张以上的同类图片，比如作品档案、产品目录、门店一览。注意格子间距统一 3–4mm，图片按同一比例裁切，图注字号和位置一致。
- 组合：左页一张大图，右页标题、双栏正文和一排 3 张小卡片，左右可以对调。适合图文都中等、既要讲又要看的普通内页，是一本画册里用得最多的版式。注意一组跨页最多组合两种版式。
- 怎么搭配：先数字数和图数——字多图少用单栏或双栏，3–9 个并列项用卡片，9 张以上同类图用网格，只有一张好图用全屏图，有先后顺序用错位，花絮多用自由，其余用组合。同一种版式连续不超过 3 个跨页，每 4–6 个跨页插一个全屏图让读者喘口气。

## 提示词

为{品牌}的{画册名}排内页，实现方式按{实现方式，如 HTML + 打印 CSS}：
1. 先读{内容清单}，给每个跨页数一下字数和图片数，按下面的规则选版式，列一张“跨页、字数、图数、版式、理由”的表。
2. 写全本共用的样式：A4 跨页 420×297mm、12 栏网格、统一页边距、页眉页码位置、字号阶梯和配色变量；8 种版式写成 8 个页面模板，全部基于这套网格。
3. 版式规则：单栏栏宽 100–120mm；双栏栏间距 5–6mm、两栏底边对齐；卡片 3–9 张、同比例图片；错位每块至少一条边对齐网格；全屏图主体避开中缝两侧 15mm；自由版式一个跨页不超过 6 个元素、有一张主图；网格间距 3–4mm、统一裁切；组合一组跨页最多两种版式。
4. 节奏：同一种版式连续不超过 3 个跨页，每 4–6 个跨页插一个全屏图。
交付时给出版式分配表和全部跨页的缩略总览图，说明哪些页因为内容量不合适改了版式。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.mock{background:radial-gradient(100% 90% at 40% 10%,#40444d,#17181c 72%)}
.mock .dg-row{justify-content:safe center}
.mock .dg-col{flex:none}
.m-set{display:grid;grid-template-columns:repeat(4,210px);gap:10px 12px}
.m-set figure{margin:0;display:grid;gap:5px;justify-items:center}
.m-set figcaption{color:#c4cbd8;font:600 8px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.1em}
.m-set figcaption b{margin-right:4px;color:#8fa3c8}
.m-sp{position:relative;display:flex;width:210px;height:148px;overflow:hidden;background:#fff;color:#1f2d50;font-family:system-ui,"PingFang SC",sans-serif;box-shadow:0 12px 26px -10px rgba(0,0,0,.75)}
.m-sp::after{content:"";position:absolute;left:96px;top:0;bottom:0;width:18px;z-index:5;pointer-events:none;background:linear-gradient(90deg,transparent,rgba(31,45,80,.1) 50%,transparent)}
.m-pg{position:relative;width:105px;height:148px;overflow:hidden}
.m-pg>*{position:absolute}
.m-nv{background:#1f2d50;color:#fff}
.m-lt{background:#e9edf4}
/* 文字：标题、导语、正文行 */
.m-t{margin:0;font:900 8px/1.2 system-ui,"PingFang SC",sans-serif;letter-spacing:.02em}
.m-k{margin:0;color:#8e9ab3;font:700 3.4px/1 system-ui,sans-serif;letter-spacing:.2em}
.m-x{display:block;background:repeating-linear-gradient(#9aa6bf 0 1.1px,transparent 1.1px 3.2px)}
.m-nv .m-x,.m-on .m-x{background:repeating-linear-gradient(rgba(255,255,255,.55) 0 1.1px,transparent 1.1px 3.2px)}
.m-x.m-d{background:repeating-linear-gradient(#1f2d50 0 1.2px,transparent 1.2px 3.4px)}
.m-sub{display:block;height:2px;background:#1f2d50}
.dg.narrow .m-x{background:#d5dbe6}
.dg.narrow .m-x.m-d{background:#1f2d50}
/* 藏蓝调照片 */
.m-p{display:block;overflow:hidden;background:linear-gradient(#c8d1e1,#8e9ab3)}
.m-pa{background:radial-gradient(30% 22% at 70% 30%,rgba(255,255,255,.75),transparent 70%),linear-gradient(transparent 58%,#1f2d50 58%),linear-gradient(#cdd6e6,#8e9ab3)}
.m-pa::after{content:"";display:block;width:100%;height:100%;background:linear-gradient(#2c3d66,#1f2d50);clip-path:polygon(0 62%,12% 62%,12% 40%,22% 40%,22% 54%,34% 54%,34% 28%,42% 22%,50% 28%,50% 58%,64% 58%,64% 44%,76% 44%,76% 60%,100% 60%,100% 100%,0 100%)}
.m-pb{background:radial-gradient(circle at 50% 40%,#3b4d78 0 22%,transparent 22.5%),radial-gradient(70% 50% at 50% 108%,#1f2d50 0 70%,transparent 71%),linear-gradient(#dfe5ef,#b4c0d6)}
.m-pc{background:radial-gradient(18% 30% at 50% 62%,#f4f6fa,#c6cfe0 70%,transparent 72%),radial-gradient(40% 10% at 50% 92%,rgba(31,45,80,.35),transparent 70%),linear-gradient(#eef1f6,#cfd7e5)}
.m-pd{background:radial-gradient(60% 40% at 20% 110%,#1f2d50 0 60%,transparent 61%),radial-gradient(70% 50% at 80% 115%,#2c3d66 0 62%,transparent 63%),radial-gradient(90% 60% at 50% 130%,#5a6c91 0 64%,transparent 65%),radial-gradient(20% 14% at 70% 30%,#fff,transparent 70%),linear-gradient(#e3e8f1,#a9b6cf)}
.m-pf{background:radial-gradient(12% 16% at 72% 40%,#fff 0 30%,rgba(255,255,255,.4) 50%,transparent 72%),radial-gradient(70% 34% at 26% 112%,#141e38 0 70%,transparent 71%),radial-gradient(80% 40% at 82% 116%,#1f2d50 0 70%,transparent 71%),radial-gradient(110% 46% at 50% 124%,#3b4d78 0 70%,transparent 71%),linear-gradient(#1f2d50,#3b4d78 40%,#8e9ab3 70%,#c8d1e1)}
.m-pe{background:repeating-linear-gradient(115deg,#1f2d50 0 8px,#3b4d78 8px 10px,#5a6c91 10px 16px),#1f2d50}
/* 01 单栏 */
.m-s1 .m-a .m-k{left:22px;top:22px}
.m-s1 .m-a .m-t{left:22px;top:30px;font-size:11px}
.m-s1 .m-a .m-x{left:22px;width:60px;top:58px;height:66px}
.m-s1 .m-b .m-p{left:22px;top:20px;width:30px;height:22px}
.m-s1 .m-b .m-x{left:22px;width:60px;top:50px;height:76px}
/* 02 双栏 */
.m-s2 .m-a .m-p{left:0;right:0;top:0;height:62px}
.m-s2 .m-a .m-t{left:10px;top:68px}
.m-s2 .m-a .m-x{top:82px;height:54px;width:39px}
.m-s2 .m-b .m-x{top:12px;height:126px;width:39px}
.m-s2 .m-c1{left:10px}.m-s2 .m-c2{left:55px}
.m-s2 .m-b .m-sub{left:55px;top:56px;width:20px}
.m-s2 .m-b .m-bk{left:55px;top:60px;width:39px;height:10px;background:#fff}
/* 03 卡片 */
.m-s3 .m-a .m-k{left:10px;top:10px}
.m-s3 .m-a .m-t{left:10px;top:16px}
.m-cards{left:10px;right:8px;top:32px;bottom:12px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px}
.m-s3 .m-b .m-cards{top:10px;left:8px;right:10px}
.m-card{position:relative!important;display:grid;align-content:start;gap:2px;padding:2px;background:#e9edf4}
.m-card .m-p{height:20px}
.m-card b{display:block;width:60%;height:2px;background:#1f2d50}
.m-card .m-x{height:6px}
/* 04 错位 */
.m-s4 .m-a .m-p{left:10px;top:12px;width:64px;height:58px}
.m-s4 .m-a .m-n{left:80px;top:12px;font:900 10px/1 system-ui,sans-serif}
.m-s4 .m-a .m-tb{left:36px;top:82px;width:58px}
.m-s4 .m-b .m-tb{left:10px;top:12px;width:54px}
.m-s4 .m-b .m-p{left:30px;top:66px;width:66px;height:60px}
.m-s4 .m-b .m-n{left:12px;top:112px;font:900 10px/1 system-ui,sans-serif}
.m-s4 .m-ov{position:absolute;left:84px;top:44px;z-index:2;width:40px;height:34px;box-shadow:0 0 0 2.4px #fff}
.m-tb{display:grid;gap:3px}
.m-tb .m-x{position:static;height:28px}
.m-tb .m-sub{width:60%}
/* 05 全屏图 */
.m-s5 .m-full{position:absolute;inset:0}
.m-s5 .m-box{position:absolute;left:12px;bottom:14px;z-index:2;width:62px;display:grid;gap:3px;padding:6px;background:#fff}
.m-s5 .m-box .m-t{font-size:7px}
.m-s5 .m-box .m-x{height:9px}
.m-s5 .m-cap{position:absolute;right:12px;top:12px;z-index:2;color:#fff;font:700 3.4px/1 system-ui,sans-serif;letter-spacing:.2em}
/* 06 自由 */
.m-s6 .m-pol{position:absolute;padding:2px 2px 6px;background:#fff;box-shadow:0 2px 5px rgba(31,45,80,.3)}
.m-s6 .m-pol .m-p{width:100%;height:100%}
.m-s6 .m-hand{position:absolute;left:12px;top:12px;z-index:3;font:900 10px/1.1 system-ui,"PingFang SC",sans-serif}
.m-s6 .m-n1{left:36px;top:28px;width:70px;height:62px;transform:rotate(-4deg)}
.m-s6 .m-n2{left:12px;top:92px;width:40px;height:40px;transform:rotate(5deg)}
.m-s6 .m-n3{left:112px;top:14px;width:46px;height:38px;transform:rotate(3deg)}
.m-s6 .m-n4{left:150px;top:62px;width:48px;height:56px;transform:rotate(-6deg)}
.m-s6 .m-n5{left:104px;top:96px;width:34px;height:34px;transform:rotate(-2deg)}
.m-s6 .m-f1{position:absolute;left:62px;top:100px;width:30px;height:20px}
.m-s6 .m-f2{position:absolute;left:164px;top:20px;width:34px;height:20px}
/* 07 网格 */
.m-grid{left:8px;right:8px;top:12px;bottom:10px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:minmax(0,1fr);gap:3px}
.m-grid i{position:relative;display:grid;grid-template-rows:minmax(0,1fr) 3px;gap:1.4px}
.m-grid i::after{content:"";width:70%;height:1.2px;align-self:center;background:#9aa6bf}
.m-grid i>.m-p{height:auto}
.m-s7 .m-a .m-t{left:8px;top:4px;font-size:5px}
.m-s7 .m-a .m-grid{top:14px}
/* 08 组合 */
.m-s8 .m-a .m-p{inset:0;width:auto;height:auto}
.m-s8 .m-a .m-cap{left:10px;bottom:10px;color:#fff;font:900 7px/1.2 system-ui,"PingFang SC",sans-serif}
.m-s8 .m-b .m-k{left:10px;top:12px}
.m-s8 .m-b .m-t{left:10px;top:18px}
.m-s8 .m-b>.m-x{top:34px;height:52px;width:39px}
.m-s8 .m-b .m-c1{left:10px}.m-s8 .m-b .m-c2{left:55px}
.m-s8 .m-b .m-mini{left:10px;right:10px;top:96px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:3px}
.m-mini span{display:grid;gap:2px}
.m-mini .m-p{height:22px}
.m-mini b{display:block;height:1.6px;width:70%;background:#1f2d50}
.m-mini .m-x{height:5px}
</style>

<div class="dg mock"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
const fig = (n, cap, body) => `<figure>${body}<figcaption><b>${n}</b>${cap}</figcaption></figure>`;
const card = (c) => `<span class="m-card"><i class="m-p ${c}"></i><b></b><i class="m-x"></i></span>`;
const cells = (n, cs) => Array.from({ length: n }, (_, i) => `<i><span class="m-p ${cs[i % cs.length]}"></span></i>`).join('');
const P = ['m-pa', 'm-pc', 'm-pb', 'm-pd', 'm-pe', 'm-pc'];
export default function demo(root) {
  draw(root, `<div class="m-set">
${fig('01', '单栏', `<div class="m-sp m-s1"><div class="m-pg m-a"><p class="m-k">PREFACE</p><p class="m-t">写在前面</p><i class="m-x m-d" style="height:3.4px;top:48px;left:22px;width:48px"></i><i class="m-x"></i></div><div class="m-pg m-b"><i class="m-p m-pc"></i><i class="m-x"></i></div></div>`)}
${fig('02', '双栏', `<div class="m-sp m-s2"><div class="m-pg m-a"><i class="m-p m-pa"></i><p class="m-t">城市更新的十年</p><i class="m-x m-c1"></i><i class="m-x m-c2"></i></div><div class="m-pg m-b"><i class="m-x m-c1"></i><i class="m-x m-c2"></i><i class="m-bk"></i><i class="m-sub"></i></div></div>`)}
${fig('03', '卡片', `<div class="m-sp m-s3"><div class="m-pg m-a"><p class="m-k">PRODUCTS</p><p class="m-t">六个系列</p><div class="m-cards">${card('m-pc')}${card('m-pb')}${card('m-pd')}${card('m-pc')}</div></div><div class="m-pg m-b"><div class="m-cards">${card('m-pa')}${card('m-pc')}${card('m-pb')}${card('m-pd')}${card('m-pc')}${card('m-pa')}</div></div></div>`)}
${fig('04', '错位', `<div class="m-sp m-s4"><div class="m-pg m-a"><i class="m-p m-pd"></i><b class="m-n">01</b><div class="m-tb"><i class="m-sub"></i><i class="m-x"></i></div></div><div class="m-pg m-b"><div class="m-tb"><i class="m-sub"></i><i class="m-x"></i></div><i class="m-p m-pb"></i><b class="m-n">03</b></div><i class="m-p m-pc m-ov"></i></div>`)}
${fig('05', '全屏图', `<div class="m-sp m-s5"><i class="m-p m-pf m-full"></i><span class="m-cap">CHAPTER 02</span><div class="m-box"><p class="m-k">山与海之间</p><p class="m-t">第二章 · 出发</p><i class="m-x"></i></div></div>`)}
${fig('06', '自由', `<div class="m-sp m-s6"><p class="m-hand">市集<br>花絮</p><span class="m-pol m-n1"><i class="m-p m-pa"></i></span><span class="m-pol m-n2"><i class="m-p m-pb"></i></span><span class="m-pol m-n3"><i class="m-p m-pc"></i></span><span class="m-pol m-n4"><i class="m-p m-pd"></i></span><span class="m-pol m-n5"><i class="m-p m-pe"></i></span><i class="m-x m-f1"></i><i class="m-x m-f2"></i></div>`)}
${fig('07', '网格', `<div class="m-sp m-s7"><div class="m-pg m-a"><p class="m-t">作品档案 2026</p><div class="m-grid" style="grid-template-rows:repeat(3,minmax(0,1fr))">${cells(9, P)}</div></div><div class="m-pg m-b"><div class="m-grid" style="grid-template-rows:repeat(4,minmax(0,1fr))">${cells(12, P.slice().reverse())}</div></div></div>`)}
${fig('08', '组合', `<div class="m-sp m-s8"><div class="m-pg m-a"><i class="m-p m-pa"></i><p class="m-cap">一座城的<br>早晨</p></div><div class="m-pg m-b"><p class="m-k">FEATURE</p><p class="m-t">早餐地图</p><i class="m-x m-c1"></i><i class="m-x m-c2"></i><div class="m-mini"><span><i class="m-p m-pc"></i><b></b><i class="m-x"></i></span><span><i class="m-p m-pb"></i><b></b><i class="m-x"></i></span><span><i class="m-p m-pd"></i><b></b><i class="m-x"></i></span></div></div></div>`)}
</div>`, { center: true, min: 0.2 });
}
</script>
