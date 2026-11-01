---
zh: 目录页的几种做法
en: Contents page styles
aka: 目录页设计 目录排版 contents 画册目录 报告目录 作品集目录 目录模板
order: 20
---

## 是什么

目录页的 6 种做法：竖排大字 CONTENTS 贴边、大号章节编号横排、侧边色带加竖排标题、整页色块反白列表、图片目录、两级目录配引导点和页码。内容都是章节名和页码，按章节数和标题层级换一种做法，目录就从一列字变成一页像样的版面。

## 适合

画册、作品集、年报、计划书、校刊、产品手册、论文的目录页；想让目录接上封面的风格，又不知道除了“一列章节加页码”还能怎么排的时候。

## 不适合

几十页以上、三级标题很多的说明书和技术文档，目录以好查为主，直接用两级引导点的做法并配好 PDF 书签，见「目录、书签与链接」；摄影集那种散放照片的目录对页，看「摄影集目录页」。

## 注意

页码从排好的成品里自动取，不要手填，每一项都加跳转链接。目录页的颜色、字体和页眉跟正文用同一套，换的只是排法；整本只挑一种目录做法，不要前后两种混用。

## 要点

- 竖排大字 CONTENTS 贴边：一行 110–150pt 的 CONTENTS 旋转 90 度贴着左边，出血裁掉约三分之一，用主色或主色的 15% 浅色；右侧 60% 宽放章节列表，章名 12–14pt，页码右对齐。适合 4–8 章、只列一级标题的画册和作品集。
- 大号章节编号横排：页面中部横排 3–5 个 48–72pt 的细体编号 01、02、03，每个下面一条 1mm 主色短线、章名 11pt 和两行 8pt 说明，等宽分栏，上方可以放一张通栏图。适合 3–5 章、一级标题，计划书和作品集最常用，超过 5 章改用别的做法。
- 侧边色带加竖排标题：左侧 26–30mm 宽的主色竖带，竖排“目录”两字 22–26pt 反白；右侧一级标题加粗带编号，二级标题缩进 6mm、小一号。适合 5–10 章、两级标题的报告、手册和年鉴。
- 整页色块反白列表：整页主色满版，白色列表，章名 16–20pt，页码对齐右侧一条 0.5pt 白色竖线，页面下方留出约 40% 空白。适合 4–8 章、一级标题，接在深色封面后面最顺；浅色画册里插一页色块目录，也能起到开篇分隔的作用。
- 图片目录：每章一张同比例缩略图（3:2 或 1:1），按 2×3 或 3×2 网格排，图下写编号、章名和页码，图片统一调色。适合 4–6 章、每章都有一张代表图的画册、年鉴和作品集。
- 两级目录配引导点和页码：一级 12pt 加粗带编号，二级 10pt 缩进 6mm，中间引导点，页码右对齐、等宽数字；一页放不下就续到下一页并重复“目录”标题。适合 6 章以上、2–3 级标题的报告、说明书和论文。

## 提示词

为{文档名}做目录页，实现方式按{实现方式，如 HTML + 打印 CSS}：
1. 先读{章节清单}，数一下章数和标题层级，从下面 6 种做法里选一种并说明理由：竖排大字 CONTENTS 贴边（4–8 章、一级）；大号编号横排（3–5 章、一级）；侧边色带加竖排标题（5–10 章、两级）；整页色块反白列表（4–8 章、一级）；图片目录（4–6 章、每章有代表图）；两级引导点目录（6 章以上、2–3 级）。
2. 照选中做法的规则排：编号、章名、说明和页码的字号层级不超过 4 级，页码右对齐、等宽数字。
3. 颜色和字体沿用全本已有的样式变量，只用一个主色；图片目录的缩略图统一比例和调色。
4. 页码从排版结果自动生成，每项加跳转链接，并同步生成 PDF 书签。
交付时截一张目录页，逐项点击核对跳转和页码，并说明章节再增加多少还放得下。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.mock{background:radial-gradient(100% 90% at 50% 0,#4a3a33,#1a1412 72%)}
.mock .dg-row{justify-content:safe center}
.mock .dg-col{flex:none}
.m-set{display:grid;grid-template-columns:repeat(3,210px);gap:10px 12px}
.m-set figure{margin:0;display:grid;gap:5px;justify-items:center}
.m-set figcaption{color:#d6c3b8;font:600 8px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.1em}
.m-set figcaption b{margin-right:4px;color:#e08a73}
.m-pg{position:relative;width:210px;height:297px;overflow:hidden;background:#f6f1e7;color:#1d1b19;font-family:system-ui,"PingFang SC",sans-serif;box-shadow:0 14px 30px -12px rgba(0,0,0,.8)}
.m-pg>*{position:absolute}
.m-ser{font-family:"Songti SC","STSong","Noto Serif SC",serif;font-weight:900}
.m-bk{left:18px;right:18px;top:14px;display:flex;justify-content:space-between;color:#8c857b;font:600 4px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.16em}
.m-pn{color:#8c857b;font:500 4px/1 system-ui,sans-serif;font-variant-numeric:tabular-nums}
/* 赭红调照片 */
.m-p{display:block;overflow:hidden}
.m-ally{background:linear-gradient(90deg,#3a2a24 0 22%,transparent 22% 78%,#4a342b 78%),linear-gradient(#e9d6c4,#c99a82 55%,#8a5a47 55%,#5e3c30)}
.m-ally::after{content:"";display:block;margin:30% auto 0;width:16%;height:40%;border-radius:40% 40% 0 0;background:#b5452f;box-shadow:0 0 0 1.5px #3a2a24}
.m-roof{background:repeating-linear-gradient(160deg,#5e3c30 0 3px,#8a5a47 3px 6px) 0 0/100% 46% no-repeat,linear-gradient(#e9d6c4,#d8b9a3 46%,#f1e6d8 46%)}
.m-roof::after{content:"";display:block;margin:48% 0 0 20%;width:24%;height:30%;background:#3a2a24;box-shadow:40px 0 0 #3a2a24}
.m-hand{background:radial-gradient(28% 22% at 46% 58%,#d9a98d 0 70%,transparent 72%),radial-gradient(20% 30% at 66% 46%,#c58c70 0 70%,transparent 72%),radial-gradient(30% 12% at 50% 80%,#7a4a38,transparent 70%),linear-gradient(#5e3c30,#2e211c)}
.m-door{background:linear-gradient(90deg,transparent 30%,#b5452f 30% 70%,transparent 70%) 0 30%/100% 70% no-repeat,linear-gradient(#e9d6c4,#c99a82)}
.m-door::after{content:"";display:block;margin:52% auto 0;width:2px;height:12%;background:#f1d48a}
.m-night{background:radial-gradient(circle at 20% 34%,#f1b45f 0 4px,rgba(241,180,95,.3) 6px,transparent 9px),radial-gradient(circle at 48% 28%,#f1b45f 0 4px,rgba(241,180,95,.3) 6px,transparent 9px),radial-gradient(circle at 76% 36%,#e0603f 0 4px,rgba(224,96,63,.3) 6px,transparent 9px),linear-gradient(transparent 62%,#3a2a24 62%),linear-gradient(#2e211c,#5e3c30)}
.m-book{background:repeating-linear-gradient(90deg,#b5452f 0 6px,#e9d6c4 6px 7px,#5e3c30 7px 12px,#e9d6c4 12px 13px,#c99a82 13px 19px,#e9d6c4 19px 20px) 0 40%/100% 46% no-repeat,linear-gradient(#f1e6d8,#d8b9a3)}
/* 01 竖排大字 */
.m-a .m-vert{left:-13px;top:50%;margin:0;writing-mode:vertical-rl;transform:translateY(-50%) rotate(180deg);color:#b5452f;font:900 60px/1 system-ui,sans-serif;letter-spacing:-.02em;white-space:nowrap}
.m-a .m-ls{left:96px;right:18px;top:64px;display:grid;gap:0}
.m-a .m-ls p{display:grid;grid-template-columns:12px minmax(0,1fr) auto;align-items:baseline;gap:4px;padding:7px 0;border-bottom:.5px solid #d8cbbb}
.m-a .m-ls p b{color:#b5452f;font:700 4.6px/1 system-ui,sans-serif}
.m-a .m-ls p span{font-size:8.4px;line-height:1}
.m-a .m-ls p span small{display:block;margin-top:3px;color:#8c857b;font:400 4px/1 system-ui,"PingFang SC",sans-serif}
.m-a .m-bk{left:96px}
/* 02 大号编号横排 */
.m-b .m-p{left:0;right:0;top:0;height:120px}
.m-b h2{left:18px;top:132px;margin:0;font-size:14px}
.m-b h2 small{margin-left:5px;color:#8c857b;font:600 4.4px/1 system-ui,sans-serif;letter-spacing:.2em;vertical-align:middle}
.m-b .m-cols{left:18px;right:18px;top:160px;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px}
.m-b .m-cols div{display:grid;gap:3px;align-content:start}
.m-b .m-cols b{color:#1d1b19;font:200 21px/1 system-ui,sans-serif;letter-spacing:-.04em}
.m-b .m-cols i{width:10px;height:1.4px;background:#b5452f}
.m-b .m-cols span{font-size:6.4px}
.m-b .m-cols small{color:#8c857b;font-size:3.8px;line-height:1.5}
.m-b .m-cols em{color:#b5452f;font:700 4px/1 system-ui,sans-serif}
.m-b .m-ft{left:18px;right:18px;bottom:16px;padding-top:5px;border-top:.5px solid #d8cbbb;color:#8c857b;font-size:3.8px;letter-spacing:.1em}
/* 03 侧边色带 */
.m-c .m-band{left:0;top:0;bottom:0;width:30px;display:grid;place-items:center;background:#b5452f;color:#f6f1e7}
.m-c .m-band b{writing-mode:vertical-rl;font-size:15px;letter-spacing:.9em}
.m-c .m-band small{position:absolute;bottom:18px;writing-mode:vertical-rl;color:rgba(246,241,231,.7);font:500 3.6px/1 system-ui,sans-serif;letter-spacing:.3em}
.m-c .m-ls{left:44px;right:18px;top:40px;display:grid;gap:7px}
.m-c .m-ch{display:grid;gap:2.6px}
.m-c .m-r{display:flex;justify-content:space-between;align-items:baseline;font-size:4.2px;color:#5e554c}
.m-c .m-r.m-l1{padding-bottom:2px;border-bottom:.5px solid rgba(181,69,47,.55);color:#1d1b19;font-size:7px}
.m-c .m-r.m-l1 b{margin-right:4px;color:#b5452f;font:700 5px/1 system-ui,sans-serif}
.m-c .m-r.m-l2{padding-left:12px}
.m-c .m-bk{left:44px}
/* 04 整页色块 */
.m-d{background:#b5452f;color:#f6f1e7}
.m-d .m-bk{color:rgba(246,241,231,.7)}
.m-d h2{left:18px;top:32px;margin:0;font-size:22px;letter-spacing:.2em}
.m-d h2 small{display:block;margin-top:5px;color:rgba(246,241,231,.7);font:600 4.4px/1 system-ui,sans-serif;letter-spacing:.3em}
.m-d .m-ls{left:18px;right:18px;top:86px;display:grid;gap:7px}
.m-d .m-ls p{display:grid;grid-template-columns:minmax(0,1fr) 1px 16px;align-items:center;gap:6px}
.m-d .m-ls p span{font-size:10.5px;line-height:1}
.m-d .m-ls p span small{margin-left:5px;color:rgba(246,241,231,.65);font:500 4px/1 system-ui,sans-serif;letter-spacing:.14em}
.m-d .m-ls p i{height:12px;background:rgba(246,241,231,.6)}
.m-d .m-ls p em{font:300 9px/1 system-ui,sans-serif;font-variant-numeric:tabular-nums}
.m-d .m-ft{left:18px;bottom:18px;color:rgba(246,241,231,.75);font-size:4.2px;letter-spacing:.16em}
/* 05 图片目录 */
.m-e h2{left:18px;top:26px;margin:0;font-size:14px}
.m-e h2 small{margin-left:5px;color:#8c857b;font:600 4.4px/1 system-ui,sans-serif;letter-spacing:.2em;vertical-align:middle}
.m-e .m-grid{left:18px;right:18px;top:52px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px 8px}
.m-e .m-grid div{display:grid;gap:3px}
.m-e .m-grid .m-p{height:48px}
.m-e .m-grid p{display:flex;align-items:baseline;gap:3px;font-size:6.4px}
.m-e .m-grid p b{color:#b5452f;font:800 5px/1 system-ui,sans-serif}
.m-e .m-grid p em{margin-left:auto;color:#8c857b;font:500 4px/1 system-ui,sans-serif}
/* 06 两级引导点 */
.m-f h2{left:0;right:0;top:28px;margin:0;text-align:center;font-size:14px;letter-spacing:.6em;text-indent:.6em}
.m-f .m-ls{left:22px;right:22px;top:56px;display:grid;gap:5px}
.m-f .m-ch{display:grid;gap:2.6px}
.m-f .m-r{display:flex;align-items:baseline;gap:3px;color:#5e554c;font-size:4.4px;line-height:1}
.m-f .m-r::after{content:"";order:2;flex:1;border-bottom:.7px dotted #a69a8d}
.m-f .m-r em{order:3;font-variant-numeric:tabular-nums}
.m-f .m-r.m-l1{color:#1d1b19;font-size:6px;font-weight:800}
.m-f .m-r.m-l1 b{color:#b5452f}
.m-f .m-r.m-l2{padding-left:12px}
.m-f .m-ft{left:0;right:0;bottom:14px;text-align:center;color:#8c857b;font-size:4px}
</style>

<div class="dg mock"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
const fig = (n, cap, body) => `<figure>${body}<figcaption><b>${n}</b>${cap}</figcaption></figure>`;
const bk = '<p class="m-bk"><span>老街新生 · 城市更新年鉴</span><span>2026</span></p>';
const ch = [
  ['01', '街巷记忆', 'MEMORY', '04', '七条老街的来历', 'm-ally', [['1.1', '青石巷', '05'], ['1.2', '钟楼街', '09']]],
  ['02', '老房子', 'HOUSES', '14', '修旧如旧的 12 栋楼', 'm-roof', [['2.1', '骑楼修缮', '15'], ['2.2', '院落改造', '20'], ['2.3', '工法笔记', '24']]],
  ['03', '手艺人', 'CRAFTS', '28', '留在街上的老手艺', 'm-hand', [['3.1', '竹编', '29'], ['3.2', '铜器', '33']]],
  ['04', '新邻居', 'NEIGHBORS', '38', '书店、咖啡和工作室', 'm-door', [['4.1', '入驻商户', '39'], ['4.2', '社区共建', '44']]],
  ['05', '夜市', 'NIGHTS', '48', '一条街的晚上', 'm-night', [['5.1', '摊位地图', '49'], ['5.2', '夜市守则', '53']]],
  ['06', '附录', 'APPENDIX', '56', '大事记与致谢', 'm-book', [['6.1', '大事记', '57'], ['6.2', '致谢', '60']]],
];
export default function demo(root) {
  draw(root, `<div class="m-set">
${fig('01', '竖排大字贴边', `<div class="m-pg m-a">${bk}<p class="m-vert">CONTENTS</p>
  <div class="m-ls">${ch.map(([n, t, en, p]) => `<p><b>${n}</b><span class="m-ser">${t}<small>${en}</small></span><em class="m-pn">${p}</em></p>`).join('')}</div>
</div>`)}
${fig('02', '大号编号横排', `<div class="m-pg m-b"><i class="m-p m-ally"></i><h2 class="m-ser">目录<small>CONTENTS</small></h2>
  <div class="m-cols">${ch.slice(0, 5).map(([n, t, , p, d]) => `<div><b>${n}</b><i></i><span class="m-ser">${t}</span><small>${d}</small><em>P.${p}</em></div>`).join('')}</div>
  <p class="m-ft">老街新生 · 城市更新年鉴 2026</p>
</div>`)}
${fig('03', '侧边色带竖排', `<div class="m-pg m-c"><div class="m-band"><b class="m-ser">目录</b><small>CONTENTS</small></div>${bk}
  <div class="m-ls">${ch.map(([n, t, , p, , , subs]) => `<div class="m-ch"><p class="m-r m-l1"><span class="m-ser"><b>${n}</b>${t}</span><em class="m-pn">${p}</em></p>${subs.map(([a, b, c]) => `<p class="m-r m-l2"><span>${a}　${b}</span><em class="m-pn">${c}</em></p>`).join('')}</div>`).join('')}</div>
</div>`)}
${fig('04', '整页色块反白', `<div class="m-pg m-d">${bk}<h2 class="m-ser">目录<small>CONTENTS</small></h2>
  <div class="m-ls">${ch.map(([n, t, en, p]) => `<p><span class="m-ser">${t}<small>${en}</small></span><i></i><em>${p}</em></p>`).join('')}</div>
  <p class="m-ft">老街新生 · 城市更新年鉴 2026</p>
</div>`)}
${fig('05', '图片目录', `<div class="m-pg m-e">${bk}<h2 class="m-ser">目录<small>CONTENTS</small></h2>
  <div class="m-grid">${ch.map(([n, t, , p, , ph]) => `<div><i class="m-p ${ph}"></i><p><b>${n}</b><span class="m-ser">${t}</span><em>${p}</em></p></div>`).join('')}</div>
</div>`)}
${fig('06', '两级引导点', `<div class="m-pg m-f">${bk}<h2 class="m-ser">目录</h2>
  <div class="m-ls"><p class="m-r m-l1"><span>序言</span><em>01</em></p>${ch.map(([n, t, , p, , , subs]) => `<div class="m-ch"><p class="m-r m-l1"><span><b>${n}</b>　${t}</span><em>${p}</em></p>${subs.map(([a, b, c]) => `<p class="m-r m-l2"><span>${a}　${b}</span><em>${c}</em></p>`).join('')}</div>`).join('')}</div>
  <p class="m-ft">— i —</p>
</div>`)}
</div>`, { center: true, min: 0.2 });
}
</script>
