---
zh: 国风计划书
en: Chinese-style proposal set
aka: 国潮计划书 中国风模板 乡村振兴计划书 项目申报书 竞赛计划书 茶文化 非遗 书法标题 整套模板
order: 40
---

## 是什么

一整套绿色国风的计划书：主色从墨绿渐变到浅茶绿，标题是书法感的大字，远山、茶园梯田、祥云和一枚朱红印章是全套共用的插画元素。成套给出三种封面（标题居中、左右分栏、上图下文）、两种内页（章节页、正文页）和一张封底，三种封面任选一种，内页和封底全套通用。

## 适合

乡村振兴、农业、茶叶、文旅、非遗、中医药类的竞赛计划书和项目申报书，以及县域文旅推介册、农产品品牌手册、传统文化活动方案。

## 不适合

科技、互联网、金融类项目，国风元素会显得不搭，用「品牌介绍与商业计划书」或「研究与政务报告」的版式；需要大量图表和财务测算的融资材料，看「数据报告」。

## 注意

国风最容易做成“满屏祥云”：插画只放在封面、章节页、封底和正文页的页角，正文区保持干净的宣纸色底。书法字体和插画素材先确认可以商用；标题用书法字时，转成矢量路径嵌入，避免对方电脑缺字体时变回宋体。

## 要点

- 页面清单（A4 竖版 210×297mm）：封面 A 标题居中（上浅下深的渐变、远山茶园、居中书法标题）、封面 B 左右分栏（左 37% 墨绿竖排标题，右侧插画）、封面 C 上图下文（上 58% 插画，下面标题和申报信息）→ 目录 → 章节页（墨绿底、大号“壹贰叁”、章名和小节）→ 正文页 → 封底（墨绿底、“感谢垂阅”、联系方式）。
- 配色：墨绿 #1f4d3a、茶绿 #4f8a5b、嫩绿 #a9cf9a、浅绿 #e3efdc、宣纸 #f6f3ea，点缀只用印章红 #b8432f；渐变一律从上到下由浅入深（#e3efdc → #6fa56a → #1f4d3a），整套只用这一条渐变。
- 字体：标题用书法字或楷体，开源可选霞鹜文楷，书法字体要确认商用授权；封面标题 60–80pt，章节页编号 120pt；小标题霞鹜文楷 Bold 14pt；正文思源宋体 10.5pt、行距 1.8；英文和数字跟正文同一套衬线。
- 插画元素：远山 3 层（远浅、近深，层间留一道白雾渐变）、茶园梯田（弧形条纹，茶绿和嫩绿交替）、祥云（1pt 线描，浅绿或白色 40%）、印章（12mm 见方、圆角 1mm、朱红底白字）；每页最多出现两种，印章全套只出现在封面和封底。
- 正文页：上边距 22mm，页眉一条 0.5pt 茶绿细线，线上左边“章序 · 章名”、右边项目名，霞鹜文楷 8pt；版心 170mm 宽单栏；小标题前一个 4mm 的祥云小图标；页角放一块不超过 40×30mm、透明度 30% 的远山，正文不压在它上面；页码居中，写成“· 05 ·”。
- 章节区分：章节页用中文大写“壹、贰、叁”配一轮浅色圆月，编号写在月中；正文页眉写同一个章序，翻到哪一章都对得上。全套不加章节色，靠章序和章节页区分。
- 数据和图表：柱和饼的颜色按墨绿、茶绿、嫩绿、浅绿四档取，强调值用印章红标一个点；表格表头浅绿底、墨绿字，不用竖线，只留横向细线。

## 提示词

为{项目名}做一整套国风{文档类型，如 乡村振兴项目计划书} PDF，实现方式按{实现方式，如 HTML + 打印 CSS}：
1. 先写全套共用的样式和插画：颜色变量墨绿 #1f4d3a、茶绿 #4f8a5b、嫩绿 #a9cf9a、浅绿 #e3efdc、宣纸 #f6f3ea、印章红 #b8432f，一条从浅绿到墨绿的渐变；标题用书法字或霞鹜文楷，正文思源宋体 10.5pt；再用 CSS 或 SVG 写好远山、茶园梯田、祥云、印章四个可复用的插画组件。之后每页只组合这些组件。
2. 三种封面各一页：标题居中、左右分栏（左侧墨绿竖排标题）、上图下文；都带项目名、申报单位和日期。
3. 章节页：墨绿底，浅色圆月里写“壹”，下面章名和小节。
4. 正文页：页眉一条细线写章序和章名，单栏正文，小标题前加祥云小图标，只在页角放一块淡远山，页码居中。
5. 封底：墨绿底，“感谢垂阅”、联系方式和印章。
每种页各给一个示例页，内容用{计划书提纲}。书法标题转成矢量路径嵌入。交付时截一张全部页面的总览图，核对插画元素、颜色和页眉页码是否全套一致，并确认正文区没有压插画。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.mock{background:radial-gradient(100% 90% at 50% 10%,#33463b,#121a15 75%)}
.mock .dg-row{justify-content:safe center}
.mock .dg-col{flex:none}
.m-set{display:flex;gap:12px;align-items:flex-start}
.dg.narrow .m-set{flex-wrap:wrap;width:654px;row-gap:10px}
.m-set figure{margin:0;display:grid;gap:5px;justify-items:center}
.m-set figcaption{color:#a9c4ad;font:500 8px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.12em}
.m-pg{position:relative;width:210px;height:297px;overflow:hidden;background:#f6f3ea;color:#1f4d3a;font-family:"Songti SC","STSong",serif;box-shadow:0 16px 34px -12px rgba(0,0,0,.75)}
.m-cal{font-family:"Xingkai SC","STXingkai","Kaiti SC","STKaiti","KaiTi",serif;font-weight:400}
.m-kai{font-family:"Kaiti SC","STKaiti","KaiTi",serif}
.m-pg svg.m-art{position:absolute;left:0;width:100%;display:block}
.m-seal{display:inline-grid;place-items:center;width:13px;height:13px;border-radius:1px;background:#b8432f;color:#f6f3ea;font:700 4.6px/1.05 "Kaiti SC","STKaiti",serif;writing-mode:vertical-rl;letter-spacing:.05em;box-shadow:inset 0 0 0 .7px rgba(246,243,234,.6),inset 0 0 0 1.4px #b8432f}
.m-yun{position:absolute;fill:none;stroke-width:1;stroke-linecap:round}
.m-deep{background:linear-gradient(#1f4d3a,#2c6447 70%,#3b7653);color:#e3efdc}
/* 封面 A：标题居中 */
.m-ca{background:linear-gradient(#eef4e8,#e3efdc 30%,#a9cf9a 58%,#4f8a5b 78%,#1f4d3a)}
.m-ca .m-sun{position:absolute;left:62px;top:40px;width:86px;height:86px;border-radius:50%;background:radial-gradient(#fbfcf6,#eef4e3 60%,rgba(238,244,227,0) 72%)}
.m-ca .m-kick{position:absolute;left:0;right:0;top:22px;text-align:center;color:#4f8a5b;font-size:4.6px;letter-spacing:.4em}
.m-ca h1{position:absolute;left:0;right:0;top:62px;margin:0;text-align:center;color:#1f4d3a;font-size:38px;line-height:1;letter-spacing:.06em}
.m-ca .m-seal{position:absolute;left:162px;top:58px}
.m-ca .m-sub{position:absolute;left:0;right:0;top:110px;display:flex;justify-content:center;align-items:center;gap:6px;color:#1f4d3a;font-size:6.4px;letter-spacing:.2em}
.m-ca .m-sub::before,.m-ca .m-sub::after{content:"";width:18px;border-top:.5px solid #4f8a5b}
.m-ca .m-en{position:absolute;left:0;right:0;top:122px;text-align:center;color:#4f8a5b;font:500 3.6px/1 system-ui,sans-serif;letter-spacing:.3em}
.m-ca .m-team{position:absolute;left:0;right:0;bottom:9px;display:grid;gap:3px;text-align:center;color:#e3efdc;font-size:4.4px;letter-spacing:.16em}
/* 封面 B：左右分栏 */
.m-cb .m-left{position:absolute;left:0;top:0;bottom:0;width:78px;background:linear-gradient(#1f4d3a,#2c6447);color:#e3efdc}
.m-cb h1{position:absolute;left:22px;top:30px;margin:0;writing-mode:vertical-rl;font-size:34px;line-height:1;letter-spacing:.12em}
.m-cb .m-left .m-seal{position:absolute;left:30px;top:196px}
.m-cb .m-vsub{position:absolute;left:62px;top:30px;writing-mode:vertical-rl;color:#a9cf9a;font-size:4.8px;letter-spacing:.4em}
.m-cb .m-right{position:absolute;left:78px;right:0;top:0;bottom:0;background:linear-gradient(#f6f3ea,#eef4e8 50%,#e3efdc)}
.m-cb .m-moon{position:absolute;left:64px;top:36px;width:42px;height:42px;border-radius:50%;background:radial-gradient(#fff 40%,#e3efdc);box-shadow:0 0 0 .6px rgba(79,138,91,.35)}
.m-cb .m-info{position:absolute;left:14px;right:12px;top:240px;display:grid;gap:3px;color:#1f4d3a;font-size:4.2px}
.m-cb .m-info b{font-size:6.4px;letter-spacing:.06em}
.m-cb .m-info span{color:#4f8a5b;letter-spacing:.06em}
/* 封面 C：上图下文 */
.m-cc .m-top{position:absolute;left:0;right:0;top:0;height:172px;overflow:hidden;background:linear-gradient(#eef4e8,#d7e8cf 60%,#a9cf9a)}
.m-cc .m-sun{position:absolute;right:30px;top:24px;width:30px;height:30px;border-radius:50%;background:radial-gradient(#fff 55%,rgba(255,255,255,0) 72%)}
.m-cc h1{position:absolute;left:20px;top:186px;margin:0;color:#1f4d3a;font-size:32px;line-height:1;letter-spacing:.04em}
.m-cc .m-seal{position:absolute;left:156px;top:186px}
.m-cc .m-sub{position:absolute;left:21px;top:226px;color:#4f8a5b;font-size:6px;letter-spacing:.14em}
.m-cc dl{position:absolute;left:21px;right:20px;top:242px;display:grid;grid-template-columns:auto minmax(0,1fr);gap:3.4px 8px;margin:0;padding-top:6px;border-top:.5px solid #4f8a5b;font-size:4.2px}
.m-cc dt{color:#4f8a5b}
.m-cc dd{margin:0;color:#1f4d3a}
/* 章节页 */
.m-chp .m-moon{position:absolute;left:55px;top:52px;width:100px;height:100px;border-radius:50%;background:radial-gradient(rgba(227,239,220,.2),rgba(227,239,220,.08) 68%,transparent 70%);box-shadow:0 0 0 .6px rgba(227,239,220,.3)}
.m-chp .m-num{position:absolute;left:0;right:0;top:66px;text-align:center;color:#e3efdc;font-size:62px;line-height:1}
.m-chp h2{position:absolute;left:0;right:0;top:166px;margin:0;text-align:center;font-size:17px;letter-spacing:.3em;text-indent:.3em;font-weight:700}
.m-chp .m-en{position:absolute;left:0;right:0;top:190px;text-align:center;color:#a9cf9a;font:500 3.8px/1 system-ui,sans-serif;letter-spacing:.3em}
.m-chp ul{position:absolute;left:58px;right:58px;top:204px;display:grid;gap:4px;margin:0;padding:6px 0 0;border-top:.5px solid rgba(169,207,154,.5);list-style:none;font-size:4.8px;letter-spacing:.08em}
.m-chp li{display:flex;justify-content:space-between;color:rgba(227,239,220,.9)}
.m-chp li em{color:#a9cf9a}
/* 正文页 */
.m-hd{position:absolute;left:20px;right:20px;top:16px;display:flex;justify-content:space-between;padding-bottom:3px;border-bottom:.5px solid #4f8a5b;color:#4f8a5b;font-size:4.4px;letter-spacing:.1em}
.m-hd b{color:#1f4d3a;font-weight:700}
.m-bd{position:absolute;left:20px;right:20px;top:30px;display:grid;gap:5px}
.m-h2{display:flex;align-items:center;gap:3px;margin-top:2px!important;color:#1f4d3a;font-size:7.4px;font-weight:700;letter-spacing:.06em}
.m-h2 svg{width:9px;height:5px;fill:none;stroke:#4f8a5b;stroke-width:1.6;stroke-linecap:round}
.m-p{color:#2c3a31;font-size:4.4px;line-height:1.85;text-align:justify;text-indent:2em}
.m-nums{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));padding:5px 0;border-top:.5px solid #a9cf9a;border-bottom:.5px solid #a9cf9a}
.m-nums span{display:grid;gap:2px;justify-items:center;color:#4f8a5b;font-size:3.9px}
.m-nums b{color:#1f4d3a;font-size:12px;font-weight:700;line-height:1}
.m-nums b small{font-size:4.4px;margin-left:1px}
.m-ol{display:grid;gap:3.4px;margin:0;padding:0;list-style:none;color:#2c3a31;font-size:4.4px;line-height:1.6}
.m-ol li{display:grid;grid-template-columns:7px minmax(0,1fr);gap:3px}
.m-ol li i{display:grid;place-items:center;width:6px;height:6px;margin-top:.6px;border-radius:50%;background:#4f8a5b;color:#f6f3ea;font:700 3.6px/1 system-ui,sans-serif}
.m-ol li b{color:#1f4d3a}
.m-note{padding:5px 7px;border-left:1.2px solid #4f8a5b;background:#e3efdc;color:#1f4d3a;font-size:4.6px;line-height:1.7}
.m-corner{position:absolute;right:0;bottom:0;width:84px;height:48px;opacity:.32}
.m-pn{position:absolute;left:0;right:0;bottom:12px;text-align:center;color:#4f8a5b;font-size:4.6px;letter-spacing:.2em}
/* 封底 */
.m-bk h2{position:absolute;left:0;right:0;top:76px;margin:0;text-align:center;font-size:26px;line-height:1;letter-spacing:.14em;text-indent:.14em}
.m-bk .m-seal{position:absolute;left:98px;top:114px}
.m-bk .m-ct{position:absolute;left:0;right:0;top:140px;display:grid;gap:4px;text-align:center;color:rgba(227,239,220,.85);font-size:4.4px;letter-spacing:.12em}
</style>

<div class="dg mock"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
let uid = 0;
// 远山三层：远浅近深，层间一道白雾
function mount({ h = 120, top, deep = '#1f4d3a', mist = '#f6f3ea', cls = '' } = {}) {
  const k = ++uid;
  return `<svg class="m-art ${cls}" style="top:${top}px;height:${h}px" viewBox="0 0 210 120" preserveAspectRatio="xMidYMax slice">
  <defs><linearGradient id="gf${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9cf9a" stop-opacity=".75"/><stop offset="1" stop-color="#a9cf9a" stop-opacity="0"/></linearGradient>
  <linearGradient id="gm${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f8a5b"/><stop offset="1" stop-color="#6fa56a" stop-opacity=".3"/></linearGradient>
  <linearGradient id="gn${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c6447"/><stop offset="1" stop-color="${deep}"/></linearGradient>
  <linearGradient id="gw${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mist}" stop-opacity="0"/><stop offset=".5" stop-color="${mist}" stop-opacity=".7"/><stop offset="1" stop-color="${mist}" stop-opacity="0"/></linearGradient></defs>
  <path d="M0 58C18 44 30 30 46 40C58 18 74 12 90 34C104 22 118 18 134 36C150 26 170 22 210 46V120H0Z" fill="url(#gf${k})"/>
  <rect x="0" y="50" width="210" height="22" fill="url(#gw${k})"/>
  <path d="M0 78C22 60 40 56 62 70C80 50 100 46 120 66C138 56 158 54 178 68C192 62 202 60 210 64V120H0Z" fill="url(#gm${k})"/>
  <rect x="0" y="76" width="210" height="18" fill="url(#gw${k})"/>
  <path d="M0 98C30 82 58 84 88 96C118 84 160 78 210 92V120H0Z" fill="url(#gn${k})"/></svg>`;
}
// 茶园梯田：山包里一圈圈弧形茶垄
function terrace({ top, h = 90, cls = '' } = {}) {
  const k = ++uid;
  const rows = Array.from({ length: 16 }, (_, i) => `<ellipse cx="112" cy="200" rx="${(166 - i * 4) * 1.5}" ry="${166 - i * 4}" fill="none" stroke="${i % 2 ? '#8fc27f' : '#4f8a5b'}" stroke-width="2.2"/>`).join('');
  return `<svg class="m-art ${cls}" style="top:${top}px;height:${h}px" viewBox="0 0 210 90" preserveAspectRatio="xMidYMax slice">
  <defs><clipPath id="ct${k}"><path d="M-10 90C10 52 50 30 104 34C150 37 186 52 220 74V90Z"/></clipPath></defs>
  <path d="M-10 90C10 52 50 30 104 34C150 37 186 52 220 74V90Z" fill="#6fa56a"/>
  <g clip-path="url(#ct${k})">${rows}</g>
  <path d="M-10 90C10 52 50 30 104 34C150 37 186 52 220 74" fill="none" stroke="#2c6447" stroke-width="1"/></svg>`;
}
const CLOUD = 'M3 15h32M6 15a4.5 4.5 0 0 1 3-8.4 6 6 0 0 1 11-1.6 5 5 0 0 1 9 2.6 4 4 0 0 1 3.4 7.4M12 11a2.4 2.4 0 1 1 3 2.2M25 10.4a2 2 0 1 0-2.2 2';
const yun = (x, y, w, color, op = 1) => `<svg class="m-yun" style="left:${x}px;top:${y}px;width:${w}px;opacity:${op}" viewBox="0 0 38 18" stroke="${color}"><path d="${CLOUD}"/></svg>`;
const mini = `<svg viewBox="0 0 38 18"><path d="${CLOUD}"/></svg>`;
const seal = (t) => `<span class="m-seal">${t}</span>`;
const fig = (cap, body) => `<figure>${body}<figcaption>${cap}</figcaption></figure>`;
export default function demo(root) {
  draw(root, `<div class="m-set">
${fig('封面 A · 标题居中', `<div class="m-pg m-ca"><i class="m-sun"></i>${yun(14, 30, 34, '#4f8a5b', .55)}${yun(162, 92, 30, '#4f8a5b', .45)}
  <p class="m-kick m-kai">乡村振兴创意大赛 · 二〇二六</p>
  <h1 class="m-cal">云上茶乡</h1>${seal('青岚')}
  <p class="m-sub m-kai">青岚村茶旅融合发展项目计划书</p><p class="m-en">TEA VILLAGE IN THE CLOUDS</p>
  ${mount({ top: 136, h: 110, deep: '#2c6447', mist: '#e3efdc' })}${terrace({ top: 192, h: 74 })}
  <div class="m-team m-kai"><span>参赛团队　MyPrompts</span><span>二〇二六年五月</span></div>
</div>`)}
${fig('封面 B · 左右分栏', `<div class="m-pg m-cb"><div class="m-right"><i class="m-moon"></i>${yun(90, 92, 30, '#4f8a5b', .5)}${yun(168, 20, 26, '#4f8a5b', .4)}${mount({ top: 100, h: 110, mist: '#eef4e8' })}${terrace({ top: 168, h: 64 })}
    <div class="m-info m-kai"><b>青岚村茶旅融合发展项目计划书</b><span>申报单位　MyPrompts</span><span>二〇二六年五月</span></div></div>
  <div class="m-left"><h1 class="m-cal">云上茶乡</h1><p class="m-vsub m-kai">茶旅融合 · 乡村振兴</p>${seal('青岚')}${yun(8, 250, 40, '#a9cf9a', .5)}</div>
</div>`)}
${fig('封面 C · 上图下文', `<div class="m-pg m-cc"><div class="m-top"><i class="m-sun"></i>${yun(20, 22, 36, '#4f8a5b', .5)}${mount({ top: 30, h: 110, mist: '#d7e8cf' })}${terrace({ top: 96, h: 76 })}</div>
  <h1 class="m-cal">云上茶乡</h1>${seal('青岚')}
  <p class="m-sub m-kai">青岚村茶旅融合发展项目计划书</p>
  <dl class="m-kai"><dt>项目类别</dt><dd>乡村振兴 · 农文旅融合</dd><dt>申报单位</dt><dd>MyPrompts</dd><dt>项目负责人</dt><dd>林舒禾</dd><dt>日　　期</dt><dd>二〇二六年五月</dd></dl>
</div>`)}
${fig('章节页', `<div class="m-pg m-deep m-chp"><i class="m-moon"></i>${yun(18, 40, 36, '#a9cf9a', .45)}${yun(156, 118, 32, '#a9cf9a', .35)}
  <p class="m-num m-cal">壹</p><h2 class="m-kai">项目背景</h2><p class="m-en">PROJECT BACKGROUND</p>
  <ul class="m-kai"><li><span>一、青岚村概况</span><em>03</em></li><li><span>二、存在的问题</span><em>05</em></li><li><span>三、政策与机遇</span><em>07</em></li></ul>
  <div style="position:absolute;left:0;right:0;bottom:0;height:54px;opacity:.5">${mount({ top: 0, h: 54, mist: '#2c6447' })}</div>
</div>`)}
${fig('正文页', `<div class="m-pg"><p class="m-hd m-kai"><b>壹 · 项目背景</b><span>云上茶乡 · 项目计划书</span></p>
  <div class="m-bd">
    <p class="m-h2 m-kai">${mini}一、青岚村概况</p>
    <p class="m-p">青岚村位于浙西山区，平均海拔 680 米，常年云雾缭绕，种茶已有三百余年。全村现有茶园 3,200 亩，茶农 186 户，“青岚云雾”是省级地理标志产品。</p>
    <div class="m-nums"><span><b>3,200<small>亩</small></b>生态茶园</span><span><b>186<small>户</small></b>在册茶农</span><span><b>680<small>米</small></b>平均海拔</span></div>
    <p class="m-h2 m-kai">${mini}二、存在的问题</p>
    <ol class="m-ol"><li><i>1</i><span><b>卖原料多，卖品牌少。</b>九成鲜叶按斤卖给外地茶厂，收购价随行就市。</span></li><li><i>2</i><span><b>游客来了留不住。</b>周末有自驾游客，但没有住宿和体验项目，人均停留不到 3 小时。</span></li><li><i>3</i><span><b>年轻人外出务工。</b>45 岁以下劳动力占比不到三成。</span></li></ol>
    <p class="m-note m-kai">本项目以“一片茶叶串起一条游线”为思路，把采茶、制茶、品茶做成可预约的体验。</p>
  </div>
  <div class="m-corner">${mount({ top: 0, h: 48 })}</div>
  <p class="m-pn">· 05 ·</p>
</div>`)}
${fig('封底', `<div class="m-pg m-deep m-bk">${yun(24, 34, 38, '#a9cf9a', .45)}${yun(150, 54, 30, '#a9cf9a', .35)}
  <h2 class="m-cal">感谢垂阅</h2>${seal('青岚')}
  <div class="m-ct m-kai"><span>MyPrompts</span><span>联系人　林舒禾　135 7186 2026</span><span>浙江省青岚村茶旅服务中心</span></div>
  ${mount({ top: 177, h: 120, mist: '#2c6447' })}
</div>`)}
</div>`, { center: true, min: 0.2 });
}
</script>
