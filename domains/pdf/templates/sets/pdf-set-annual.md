---
zh: 年报与 ESG 报告
en: Annual and ESG report set
aka: ESG 报告 可持续发展报告 社会责任报告 CSR 年度报告 企业年报 年度画册 整套模板
order: 30
---

## 是什么

一整本按章节换色的企业报告：封面和目录用全本统一的石墨灰，往后每章一个主色，环境绿、社会蓝、治理橙、数据紫；章节扉页上半是满版照片，左上角是章节标签和一句导语；内页分指标页（3–4 个大数字、单位和同比，配一列细线图标）和案例页（一张图加文字），最后的数据篇放关键绩效表。全本浅色底、细线图标，翻到哪一章看颜色就知道。

## 适合

企业 ESG 报告、可持续发展报告、社会责任报告、上市公司年报的非财务部分、集团年度画册，以及基金会、学校、医院的年度报告。

## 不适合

政府部门和研究机构的报告，用一个主色更稳重，看「研究与政务报告」；以财务报表为主的年报正文，按财务披露格式排表格；只有几页的经营数据汇报，看「数据报告」。

## 注意

章节色只用来区分章节：标签、编号、图标、图表主系列和页码用它，标题和正文仍是石墨灰，否则四种颜色一起出现会很花。指标页的每个数字都要和数据篇的关键绩效表对得上，同比口径写在表注里，比如“同比按可比口径重述 2024 年数据”。

## 要点

- 页面清单（A4 竖版 210×297mm）：封面 → 目录 → 致辞与关于我们 → 每章一组：章节扉页、指标页、案例页 → 数据篇（关键绩效表、指标索引）→ 封底。封面、目录、致辞和封底用中性主色，章节内的页用章节色。
- 配色：中性主色石墨灰 #262a30，页面浅底 #f7f7f4，正文 #2f333a，次要文字 #7b8089，细线 #dcdcd6；章节色环境 #2f9d62、社会 #2f6fd0、治理 #e07b2c、数据 #7b57c8，每种再取 15% 浅色做底块。
- 网格与字体：12 栏，外边距 18mm，栏间距 5mm；标题思源黑体 Bold 24–28pt，正文思源黑体 Regular 9pt、行距 1.75；大数字思源黑体 Light 36–44pt，单位 10pt，同比 8pt。
- 贯穿元素：页眉左边章节标签（章节色胶囊加白字“01 环境”），右边“公司名 2025 ESG 报告”7pt；页脚外侧页码，页码数字用章节色；图标全本一套 1pt 细线图标，外面套 9mm 圆圈，颜色跟章节。
- 封面和目录：封面石墨灰底，大号年份和报告名，一张拱形照片，底部 4 个章节色小方块；目录浅底，每章一行：章节色编号、章名、2–3 个小节和页码，左侧一条 1.5mm 宽的章节色竖条。
- 章节扉页：上 55% 是满版照片，左上角章节标签和一句 14pt 白色导语，照片下方是章名（章节色 32pt）、英文名和本章小节列表；指标页 3–4 个指标纵向排列，每个指标一行：左边图标、中间大数字和单位、右边同比（上升箭头用章节色，下降用灰）；案例页上半一张图，下半标题、两段正文和一句引语。
- 章节区分：章节色出现在扉页标题、页眉标签、编号、图标、图表主系列和页码这六处；章节之间不共用照片色调，环境章偏绿、社会章偏暖、治理章偏中性。
- 数据页图表与绩效表：本章图表用章节色的 100%、60%、30% 三档，往年数据用灰 #c4c6ca；跨章节对比才同时用四种章节色。关键绩效表表头用数据紫，按环境、社会、治理分组，组名前加该章节色的小方块，三年数据并列、数字右对齐，表注写口径和单位。

## 提示词

为{公司}做一整套{年份} {报告类型，如 ESG 报告} PDF，实现方式按{实现方式，如 HTML + 打印 CSS}：
1. 先写全本共用的样式变量：中性主色 #262a30、浅底 #f7f7f4、正文 #2f333a；章节色环境 #2f9d62、社会 #2f6fd0、治理 #e07b2c、数据 #7b57c8；标题和正文思源黑体，大数字用 Light；A4，12 栏，外边距 18mm。每章页面挂一个章节类名，切换一个 --chapter 变量，页眉标签、编号、图标、图表主系列和页码都读这个变量。
2. 封面：石墨灰底，年份、报告名、一张拱形照片，底部 4 个章节色方块。
3. 目录：每章用自己的章节色标出编号和左侧竖条，列小节和页码。
4. 章节扉页：上半满版照片，左上章节标签和一句导语，下面章名和小节。
5. 指标页：3–4 个大数字，带单位、同比和一列细线图标。
6. 案例页：一张图、标题、两段正文和一句引语。
7. 数据篇：关键绩效表，表头数据紫，按章节分组，三年数据并列。
每种页各给一个示例页，内容用{报告素材}。交付时核对指标页的数字和关键绩效表一致，并截一张全部页面的总览图，检查每章颜色只出现在约定的位置。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.mock{background:radial-gradient(90% 80% at 40% 20%,#e4e5e7,#b9bcc1 80%)}
.mock .dg-row{justify-content:safe center}
.mock .dg-col{flex:none}
.m-set{display:flex;gap:12px;align-items:flex-start}
.dg.narrow .m-set{flex-wrap:wrap;width:654px;row-gap:10px}
.m-set figure{margin:0;display:grid;gap:5px;justify-items:center}
.m-set figcaption{color:#4d525a;font:600 8px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.12em}
.m-pg{--c:#262a30;position:relative;width:210px;height:297px;overflow:hidden;background:#f7f7f4;color:#2f333a;font-family:system-ui,"PingFang SC",sans-serif;box-shadow:0 14px 28px -12px rgba(30,34,40,.55),0 1px 2px rgba(30,34,40,.2)}
.m-env{--c:#2f9d62}.m-soc{--c:#2f6fd0}.m-gov{--c:#e07b2c}.m-dat{--c:#7b57c8}
.m-logo{display:inline-block;width:8px;height:8px;border-radius:50%;background:conic-gradient(#2f9d62 0 25%,#2f6fd0 0 50%,#e07b2c 0 75%,#7b57c8 0);vertical-align:middle}
.m-ic{display:inline-grid;place-items:center;width:12px;height:12px;border:.6px solid var(--c);border-radius:50%;color:var(--c)}
.m-ic svg{width:7px;height:7px;fill:none;stroke:currentColor;stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round}
.m-hd{position:absolute;left:18px;right:18px;top:14px;display:flex;justify-content:space-between;align-items:center;color:#7b8089;font:500 4.2px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.08em}
.m-tag{display:inline-flex;align-items:center;gap:3px;height:8px;padding:0 4px;border-radius:4px;background:var(--c);color:#fff;font:700 4.4px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.08em}
.m-fo{position:absolute;right:18px;bottom:11px;display:flex;align-items:center;gap:4px;color:#7b8089;font:500 3.8px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.08em}
.m-fo b{color:var(--c);font:700 6px/1 system-ui,sans-serif}
.m-h{position:absolute;left:18px;top:32px;margin:0;color:#262a30;font:800 12px/1.25 system-ui,"PingFang SC",sans-serif}
.m-h small{display:block;margin-top:3px;color:#7b8089;font:500 4px/1 system-ui,sans-serif;letter-spacing:.2em}
/* 封面 */
.m-cv{background:#262a30;color:#fff}
.m-cv .m-brand{position:absolute;left:18px;top:18px;display:flex;align-items:center;gap:4px;font:800 5.4px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.1em}
.m-cv .m-brand small{color:rgba(255,255,255,.55);font-size:3.6px;font-weight:500;letter-spacing:.16em}
.m-cv .m-yr{position:absolute;left:16px;top:36px;font:200 48px/1 system-ui,sans-serif;letter-spacing:-.03em}
.m-cv h1{position:absolute;left:18px;top:88px;margin:0;font:800 11.5px/1.3 system-ui,"PingFang SC",sans-serif;letter-spacing:.06em}
.m-cv h1 small{display:block;margin-top:3px;color:rgba(255,255,255,.55);font:500 3.6px/1 system-ui,sans-serif;letter-spacing:.18em}
.m-arch{position:absolute;left:18px;right:18px;top:122px;bottom:40px;overflow:hidden;border-radius:87px 87px 0 0;background:radial-gradient(40% 28% at 64% 34%,rgba(255,240,206,.95),transparent 70%),linear-gradient(#f0c79b,#e9d6b7 38%,#bcd3d6 62%)}
.m-arch::before{content:"";position:absolute;inset:auto 0 0;height:56%;background:radial-gradient(80% 60% at 20% 100%,#2f7a4f 0 60%,transparent 61%),radial-gradient(90% 70% at 85% 105%,#3e8a57 0 62%,transparent 63%),radial-gradient(120% 80% at 50% 120%,#6aa36a 0 62%,transparent 63%),linear-gradient(transparent 30%,#8fb77a 30%)}
.m-arch svg{position:absolute;inset:0;width:100%;height:100%}
.m-cv .m-chs{position:absolute;left:18px;right:18px;bottom:16px;display:flex;justify-content:space-between;align-items:center;color:rgba(255,255,255,.7);font:500 3.8px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.1em}
.m-cv .m-chs div{display:flex;gap:7px}
.m-cv .m-chs i{display:inline-block;width:5px;height:5px;margin-right:2px;vertical-align:-1px}
/* 目录 */
.m-pre{position:absolute;left:18px;right:18px;top:68px;display:flex;gap:16px;padding-bottom:6px;border-bottom:.5px solid #dcdcd6;color:#2f333a;font:600 4.6px/1 system-ui,"PingFang SC",sans-serif}
.m-pre em{margin-left:4px;color:#7b8089;font-weight:500}
.m-chl{position:absolute;left:18px;right:18px;top:84px;display:grid;gap:7px}
.m-chl>div{display:grid;grid-template-columns:20px minmax(0,1fr) 13px;column-gap:6px;padding:5px 0 5px 6px;border-left:1.6px solid var(--c)}
.m-chl .m-n{color:var(--c);font:300 15px/1 system-ui,sans-serif;letter-spacing:-.02em}
.m-chl b{display:flex;align-items:baseline;justify-content:space-between;color:#262a30;font:800 7px/1 system-ui,"PingFang SC",sans-serif}
.m-chl b small{color:var(--c);font:700 5px/1 system-ui,sans-serif}
.m-chl b em{margin-left:4px;margin-right:auto;color:#7b8089;font:500 3.6px/1 system-ui,sans-serif;letter-spacing:.16em}
.m-chl ul{display:grid;gap:2.6px;margin:4px 0 0;padding:0;list-style:none;color:#5b6069;font-size:4.2px}
.m-chl li{display:flex;justify-content:space-between}
.m-chl li span:last-child{color:#7b8089;font-variant-numeric:tabular-nums}
/* 扉页 */
.m-ph{position:absolute;left:0;right:0;top:0;height:164px;overflow:hidden}
.m-solar{background:linear-gradient(#8fc5e3,#d6ebef 48%,#a9cf8f 48%,#7fb06a)}
.m-solar::before{content:"";position:absolute;left:0;right:0;top:44%;height:16px;background:radial-gradient(60% 100% at 30% 100%,#5d9a5c 0 60%,transparent 61%),radial-gradient(50% 100% at 80% 100%,#6aa766 0 60%,transparent 61%)}
.m-solar::after{content:"";position:absolute;left:-60%;right:-60%;top:47%;bottom:-40%;transform:perspective(120px) rotateX(58deg);transform-origin:50% 0;background:repeating-linear-gradient(90deg,transparent 0 9px,rgba(255,255,255,.35) 9px 9.6px),repeating-linear-gradient(#1f3f6e 0 9px,#2c5a8f 9px 12px,#8cbf72 12px 18px)}
.m-ph .m-shade{position:absolute;inset:0;z-index:1;background:linear-gradient(rgba(16,40,28,.55),transparent 46%)}
.m-ph .m-tag{position:absolute;left:18px;top:16px;z-index:2}
.m-ph .m-lede{position:absolute;left:18px;top:30px;z-index:2;width:120px;color:#fff;font:700 9px/1.45 system-ui,"PingFang SC",sans-serif;text-shadow:0 1px 4px rgba(0,0,0,.3)}
.m-op .m-ttl{position:absolute;left:18px;top:178px;display:grid;gap:3px}
.m-op .m-ttl b{color:var(--c);font:800 30px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.06em}
.m-op .m-ttl span{color:#7b8089;font:500 4.4px/1 system-ui,sans-serif;letter-spacing:.3em}
.m-op ul{position:absolute;left:18px;right:18px;top:224px;display:grid;gap:5px;margin:0;padding:6px 0 0;border-top:.5px solid #dcdcd6;list-style:none}
.m-op li{display:flex;align-items:center;gap:5px;color:#2f333a;font:600 5px/1 system-ui,"PingFang SC",sans-serif}
.m-op li em{margin-left:auto;color:#7b8089;font-weight:500}
/* 指标页 */
.m-intro{position:absolute;left:18px;right:18px;top:60px;color:#5b6069;font-size:4.4px;line-height:1.75}
.m-kp{position:absolute;left:18px;right:18px;top:84px;display:grid}
.m-kp>div{display:grid;grid-template-columns:16px minmax(0,1fr) auto;align-items:center;column-gap:7px;padding:5px 0;border-bottom:.5px solid #dcdcd6}
.m-kp>div:first-child{border-top:.5px solid #dcdcd6}
.m-kp .m-ic{width:15px;height:15px}
.m-kp .m-ic svg{width:8.5px;height:8.5px}
.m-kp p{display:grid;gap:2px}
.m-kp p b{color:#262a30;font:300 18px/1 system-ui,sans-serif;letter-spacing:-.03em}
.m-kp p b small{margin-left:2px;font-size:5.4px;font-weight:500;letter-spacing:0}
.m-kp p span{color:#7b8089;font-size:4.2px}
.m-kp em{color:var(--c);font:700 5px/1 system-ui,sans-serif}
.m-kp em.m-flat{color:#7b8089}
.m-stk{position:absolute;left:18px;right:18px;top:242px;display:grid;gap:4px}
.m-stk>p{color:#262a30;font:700 4.8px/1 system-ui,"PingFang SC",sans-serif}
.m-stk>div{display:flex;height:9px;border-radius:1px;overflow:hidden}
.m-stk>div i{display:grid;place-items:center;color:#fff;font:600 3.6px/1 system-ui,sans-serif}
.m-stk .m-lg{display:flex;gap:8px;color:#7b8089;font-size:3.6px}
.m-stk .m-lg span::before{content:"";display:inline-block;width:4px;height:4px;margin-right:2px;background:var(--k);vertical-align:-.5px}
/* 案例页 */
.m-fac{position:absolute;left:18px;right:18px;top:30px;height:108px;overflow:hidden;border-radius:1px;background:radial-gradient(14% 10% at 22% 12%,rgba(255,244,214,.95),transparent 70%),radial-gradient(14% 10% at 52% 10%,rgba(255,244,214,.95),transparent 70%),radial-gradient(14% 10% at 82% 12%,rgba(255,244,214,.95),transparent 70%),repeating-linear-gradient(90deg,transparent 0 28px,rgba(60,54,48,.35) 28px 30px),linear-gradient(#8d8780,#b9b1a6 40%,#9b948b 70%,#6e6962)}
.m-fac::before{content:"";position:absolute;left:0;right:0;top:44px;height:34px;background:repeating-linear-gradient(90deg,#5b6c7c 0 22px,transparent 22px 26px),repeating-linear-gradient(#3e4a56 0 2px,transparent 2px 10px)}
.m-fac::after{content:"";position:absolute;left:0;right:0;bottom:0;height:30px;background:linear-gradient(#6a655e,#4f4b46)}
.m-man{position:absolute;bottom:6px;z-index:1;width:20px;height:44px}
.m-man::before{content:"";position:absolute;left:5px;top:0;width:10px;height:10px;border-radius:50%;background:radial-gradient(circle at 50% 80%,#d7b598 0 3.6px,transparent 3.8px),linear-gradient(#e07b2c 0 50%,transparent 50%)}
.m-man::after{content:"";position:absolute;left:0;top:11px;width:20px;height:33px;border-radius:8px 8px 2px 2px;background:linear-gradient(90deg,#2f3a46,#43505e);box-shadow:inset 0 9px 0 -4px #e07b2c}
.m-cs{position:absolute;left:18px;right:18px;top:146px;display:grid;gap:5px}
.m-cs .m-k{color:var(--c);font:700 4.4px/1 system-ui,sans-serif;letter-spacing:.2em}
.m-cs h3{margin:0;color:#262a30;font:800 9px/1.35 system-ui,"PingFang SC",sans-serif}
.m-cs .m-two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:7px;color:#5b6069;font-size:4.2px;line-height:1.75;text-align:justify}
.m-cs blockquote{margin:2px 0 0;padding:2px 0 2px 6px;border-left:1.4px solid var(--c);color:#262a30;font:600 5.4px/1.55 system-ui,"PingFang SC",sans-serif}
.m-cs blockquote small{display:block;margin-top:2px;color:#7b8089;font-size:3.8px;font-weight:500}
.m-cs .m-mini{display:flex;gap:16px;padding-top:5px;border-top:.5px solid #dcdcd6}
.m-cs .m-mini span{display:grid;gap:2px;color:#7b8089;font-size:3.8px}
.m-cs .m-mini b{color:var(--c);font:300 14px/1 system-ui,sans-serif}
.m-cs .m-mini b small{font-size:4.6px;font-weight:500}
/* 绩效表 */
.m-kpt{position:absolute;left:18px;right:18px;top:62px;width:174px;border-collapse:collapse;font-size:3.9px;font-variant-numeric:tabular-nums}
.m-kpt th{padding:3.2px 2.5px;background:var(--c);color:#fff;font-weight:700;text-align:right}
.m-kpt th:first-child,.m-kpt td:first-child{text-align:left}
.m-kpt td{padding:2.7px 2.5px;border-bottom:.5px solid #e4e4df;color:#2f333a;text-align:right;line-height:1}
.m-kpt td:nth-child(2){color:#7b8089;text-align:left}
.m-kpt td:last-child{font-weight:700;color:#262a30}
.m-kpt tr.m-g td{padding-top:5px;border-bottom:.6px solid #262a30;color:#262a30;font:800 4.6px/1 system-ui,"PingFang SC",sans-serif}
.m-kpt tr.m-g td i{display:inline-block;width:4px;height:4px;margin-right:3px;background:var(--k);vertical-align:0}
.m-kpn{position:absolute;left:18px;right:18px;top:252px;color:#7b8089;font-size:3.6px;line-height:1.6}
</style>

<div class="dg mock"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
const P = {
  leaf: 'M5 19c0-8 5-14 14-14 0 9-6 14-14 14zM5 19l7-7',
  loop: 'M4 12a8 8 0 0 1 14-5l2 2M20 12a8 8 0 0 1-14 5l-2-2M20 4v5h-5M4 20v-5h5',
  tree: 'M12 3l6 9h-4l4 6H6l4-6H6zM12 18v3',
  user: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20c.8-3.5 3.3-5.5 6.5-5.5s5.7 2 6.5 5.5M16 4.5a3.2 3.2 0 0 1 0 6.2M18 14.8c1.8.7 3 2.5 3.5 5.2',
  book: 'M4 5c3-1 6-1 8 1 2-2 5-2 8-1v14c-3-1-6-1-8 1-2-2-5-2-8-1zM12 6v14',
  heart: 'M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z',
  gender: 'M10 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM10 14v7M7 18h6M15 4h5v5M20 4l-5.5 5.5',
};
const ic = (k) => `<i class="m-ic"><svg viewBox="0 0 24 24"><path d="${P[k]}"/></svg></i>`;
const fig = (cap, body) => `<figure>${body}<figcaption>${cap}</figcaption></figure>`;
const hd = (tag) => `<p class="m-hd"><span class="m-tag">${tag}</span><span><i class="m-logo"></i> MyPrompts 2025 ESG 报告</span></p>`;
const fo = (n) => `<p class="m-fo">MyPrompts<b>${n}</b></p>`;
const turbine = (x, y, s, r) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#fbfaf6"><rect x="-1.2" y="0" width="2.4" height="60" rx="1"/><g transform="rotate(${r})"><path d="M0 0 L-1.6 -30 L0 -32 L1.6 -30Z"/><path d="M0 0 L-1.6 -30 L0 -32 L1.6 -30Z" transform="rotate(120)"/><path d="M0 0 L-1.6 -30 L0 -32 L1.6 -30Z" transform="rotate(240)"/></g><circle r="2.4"/></g>`;
const chs = [
  ['m-env', '01', '环境', 'ENVIRONMENT', '12', [['气候行动与碳管理', '14'], ['资源与循环利用', '20'], ['生物多样性', '24']]],
  ['m-soc', '02', '社会', 'SOCIAL', '28', [['员工发展', '30'], ['产品责任', '36'], ['社区公益', '40']]],
  ['m-gov', '03', '治理', 'GOVERNANCE', '44', [['公司治理', '46'], ['合规与反腐败', '50'], ['供应链管理', '54']]],
  ['m-dat', '04', '数据', 'DATA', '58', [['关键绩效表', '60'], ['指标索引', '66'], ['独立鉴证报告', '70']]],
];
const kpi = [
  ['环境', '#2f9d62', [['温室气体排放总量', '万吨 CO₂e', '48.6', '44.2', '39.8'], ['可再生电力占比', '%', '21.4', '30.8', '42.5'], ['单位产值能耗', '吨标煤/万元', '0.082', '0.074', '0.066'], ['工业用水重复利用率', '%', '88.1', '90.3', '92.6']]],
  ['社会', '#2f6fd0', [['员工总数', '人', '15,906', '17,570', '18,642'], ['女性管理者占比', '%', '29.8', '32.2', '34.5'], ['人均培训时长', '小时', '38.2', '41.8', '46.8'], ['公益投入', '万元', '1,920', '2,412', '2,860']]],
  ['治理', '#e07b2c', [['独立董事占比', '%', '36.4', '36.4', '40.0'], ['反腐败培训覆盖率', '%', '96.0', '98.5', '100'], ['一级供应商 ESG 审核', '家', '146', '238', '312']]],
];
export default function demo(root) {
  draw(root, `<div class="m-set">
${fig('封面', `<div class="m-pg m-cv"><p class="m-brand"><i class="m-logo"></i>MyPrompts</p>
  <b class="m-yr">2025</b><h1>环境、社会及治理报告<small>ENVIRONMENTAL, SOCIAL AND GOVERNANCE REPORT</small></h1>
  <div class="m-arch"><svg viewBox="0 0 174 135" preserveAspectRatio="xMidYMax slice">${turbine(46, 52, .9, 12)}${turbine(104, 40, 1.1, 48)}${turbine(146, 66, .7, 80)}</svg></div>
  <div class="m-chs"><div><span><i style="background:#2f9d62"></i>环境</span><span><i style="background:#2f6fd0"></i>社会</span><span><i style="background:#e07b2c"></i>治理</span><span><i style="background:#7b57c8"></i>数据</span></div><span>第 6 份 ESG 报告</span></div>
</div>`)}
${fig('目录', `<div class="m-pg"><p class="m-hd"><span><i class="m-logo"></i> MyPrompts</span><span>2025 ESG 报告</span></p>
  <h2 class="m-h" style="font-size:17px">目录<small>CONTENTS</small></h2>
  <p class="m-pre"><span>董事长致辞<em>02</em></span><span>关于 MyPrompts<em>04</em></span><span>ESG 管理<em>08</em></span></p>
  <div class="m-chl">${chs.map(([c, n, t, en, p, subs]) => `<div class="${c}"><span class="m-n">${n}</span><div><b>${t}<em>${en}</em><small>${p}</small></b><ul>${subs.map(([a, b]) => `<li><span>${a}</span><span>${b}</span></li>`).join('')}</ul></div>${ic(['leaf', 'user', 'tree', 'loop'][+n - 1])}</div>`).join('')}</div>
  <p class="m-fo">MyPrompts<b>01</b></p>
</div>`)}
${fig('章节扉页 · 环境', `<div class="m-pg m-op m-env"><div class="m-ph m-solar"><i class="m-shade"></i><span class="m-tag">01 环境</span><p class="m-lede">让每一度电的来源<br>都更干净一些</p></div>
  <p class="m-ttl"><b>环境</b><span>ENVIRONMENT</span></p>
  <ul><li>${ic('leaf')}气候行动与碳管理<em>14</em></li><li>${ic('loop')}资源与循环利用<em>20</em></li><li>${ic('tree')}生物多样性<em>24</em></li></ul>
  ${fo('12')}
</div>`)}
${fig('指标页 · 社会', `<div class="m-pg m-soc">${hd('02 社会')}
  <h2 class="m-h">员工发展<small>OUR PEOPLE</small></h2>
  <p class="m-intro">2025 年新增岗位 1,072 个，新建两所技能学院，一线员工晋升通道从 3 级扩到 5 级。</p>
  <div class="m-kp">
    <div>${ic('user')}<p><b>18,642<small>人</small></b><span>员工总数</span></p><em>↑ 6.1%</em></div>
    <div>${ic('gender')}<p><b>34.5<small>%</small></b><span>女性管理者占比</span></p><em>↑ 2.3 个百分点</em></div>
    <div>${ic('book')}<p><b>46.8<small>小时</small></b><span>人均培训时长</span></p><em>↑ 12.0%</em></div>
    <div>${ic('heart')}<p><b>2,860<small>万元</small></b><span>公益投入</span></p><em>↑ 18.6%</em></div>
  </div>
  <div class="m-stk"><p>员工年龄结构</p><div><i style="width:38%;background:#2f6fd0">30 岁以下 38%</i><i style="width:34%;background:#6d9ae0">30–40 岁 34%</i><i style="width:19%;background:#a9c3ec">19%</i><i style="width:9%;background:#c4c6ca"></i></div><p class="m-lg"><span style="--k:#a9c3ec">40–50 岁</span><span style="--k:#c4c6ca">50 岁以上</span></p></div>
  ${fo('31')}
</div>`)}
${fig('案例页 · 治理', `<div class="m-pg m-gov">${hd('03 治理')}
  <div class="m-fac"><i class="m-man" style="left:52px"></i><i class="m-man" style="left:78px;transform:scale(.9);transform-origin:50% 100%"></i><i class="m-man" style="left:128px;transform:scale(.8);transform-origin:50% 100%"></i></div>
  <div class="m-cs"><p class="m-k">CASE 案例</p><h3>一级供应商<br>全部走一遍 ESG 现场审核</h3>
    <div class="m-two"><p>2025 年我们把 ESG 条款写进全部采购合同，审核小组走访了 312 家一级供应商，按安全、环保、劳工三类 46 项打分。</p><p>不达标的 27 家拿到整改清单，三个月后复审，其中 4 家因未整改退出合格名录。</p></div>
    <blockquote>“审核不是为了淘汰，是让整条链一起变好。”<small>供应链管理部负责人</small></blockquote>
    <div class="m-mini"><span><b>312<small> 家</small></b>审核供应商</span><span><b>46<small> 项</small></b>审核指标</span><span><b>85<small>%</small></b>首轮达标</span></div></div>
  ${fo('55')}
</div>`)}
${fig('数据篇 · 绩效表', `<div class="m-pg m-dat">${hd('04 数据')}
  <h2 class="m-h">关键绩效表<small>KEY PERFORMANCE INDICATORS</small></h2>
  <table class="m-kpt"><thead><tr><th>指标</th><th style="text-align:left">单位</th><th>2023</th><th>2024</th><th>2025</th></tr></thead><tbody>
  ${kpi.map(([g, k, rows]) => `<tr class="m-g" style="--k:${k}"><td colspan="5"><i></i>${g}</td></tr>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}`).join('')}
  </tbody></table>
  <p class="m-kpn">注：2024 年温室气体排放按可比口径重述；员工数为年末在册人数。完整指标见第 66 页指标索引。</p>
  ${fo('60')}
</div>`)}
</div>`, { center: true, min: 0.2 });
}
</script>
