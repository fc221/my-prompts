---
zh: 横版作品集
en: Landscape portfolio set
aka: 求职作品集 设计作品集 运营作品集 新媒体作品集 产品作品集 portfolio 16:9 整套模板
order: 50
---

## 是什么

一整本 16:9 横版的求职作品集，黑白灰打底，只加一个亮黄：封面是一块撕纸边的白色块压在黑白照片上，写着大号“个人作品集”和英文副标题；目录把 5 个章节横排，每章一个大号斜体编号和一张缩略图；项目页左边写背景、职责和数据，右边放 2–3 台手机或屏幕样机；最后一页留联系方式。屏幕上看着像一份演示稿，导出 PDF 发给面试官也方便。

## 适合

设计、运营、新媒体、产品、市场岗位的求职作品集，实习和校招的作品展示，自由职业者给客户发的案例集。

## 不适合

只需要一两页的履历，看「简历」；以摄影或插画大图为主的作品集，每页一张满版大图加一行说明，目录可以参考「摄影集目录页」；团队或公司的案例介绍，看「品牌介绍与商业计划书」。

## 注意

面试官平均只翻几十秒，每个项目页第一眼要看到“做了什么、结果是多少”：数据写在左栏最显眼的位置，并写清口径和时间，比如“账号粉丝 3 个月 +10.6 万”。导出前压缩图片，整本控制在 20MB 以内，很多招聘邮箱和网申系统对附件有大小限制。

## 要点

- 页面清单（16:9 横版 297×167mm）：封面 → 目录（5 个章节横排）→ 关于我（照片、简介、3 个数字、技能标签）→ 每章：项目页（左文右样机），项目多时加一张章节过渡页（大号编号和章名）→ 结尾页（联系方式、二维码）。
- 配色：黑 #111111、深灰 #3a3a3a、中灰 #8a8a8a、浅灰 #ececec、白 #ffffff，亮色只用一种黄 #ffd400；黄色只出现在数据高亮底、页码方块、章节编号的下划线这三处。照片统一转黑白，作品截图保留原色。
- 网格与字体：12 栏，边距 14mm，栏间距 5mm；中文标题思源黑体 Heavy 28–40pt，正文思源黑体 Regular 9pt、行距 1.6；英文副标题和编号用开源的 Inter Black Italic，编号 48–60pt。
- 贯穿元素：每页左上角“姓名 / PORTFOLIO 年份”，右上角“章节编号 + 章名”，7pt 中灰；右下角页码放在黄色小方块里，写“05 / 24”；章节编号的斜体样式、样机的圆角和阴影全本一致。
- 封面：黑白照片满版，白色块宽约页面 65%，上下两边做不规则撕纸边并带一层柔和投影；块内依次是“个人作品集”40pt、英文副标题 10pt、细线，再下面姓名、求职方向和联系方式。
- 目录：5 栏等宽，每栏顶部是斜体大编号，下面一条 1mm 黄色短线、一张 4:3 黑白缩略图、章名 12pt 和一行 8pt 说明，底部写页码范围。
- 项目页：左 5 栏依次是项目名、背景、我的职责、数据结果（大号数字 24–28pt，下面压黄色底条），右 7 栏放 2–3 台手机或一台电脑加一台手机样机，样机底边对齐同一条水平线，彼此错开 6–10mm 高度。
- 章节区分：不用章节色，靠斜体编号和章节过渡页区分；数据图表一律黑灰两色，只把要强调的那一项涂黄。

## 提示词

为{姓名}做一整本横版求职作品集 PDF，求职方向是{岗位}，实现方式按{实现方式，如 HTML + 打印 CSS}：
1. 先写全本共用的样式变量：黑 #111111、深灰 #3a3a3a、中灰 #8a8a8a、浅灰 #ececec、白、亮黄 #ffd400；页面 297×167mm，12 栏，边距 14mm；中文思源黑体，编号和英文用 Inter Black Italic；再写页眉（姓名、章节）、黄色页码方块、手机和电脑样机这几个组件，后面每页只引用它们。
2. 封面：黑白照片满版，撕纸边白色块里写“个人作品集”、英文副标题、姓名和联系方式。
3. 目录：5 个章节横排，斜体大编号、黄色短线、缩略图、章名和页码。
4. 关于我：黑白照片、三行简介、3 个数字和技能标签。
5. 项目页：左栏背景、职责和数据（大数字加黄色底条），右栏 2–3 台手机或屏幕样机，截图用{项目截图}。
6. 结尾页：黑底，联系方式和二维码。
每种页各给一个示例页，项目内容用{项目清单}。交付时截一张全部页面的总览图，核对页眉、页码、编号和样机样式全本一致，并报告导出的文件大小。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.mock{background:radial-gradient(100% 90% at 30% 10%,#3b3b3b,#101010 72%)}
.mock .dg-row{justify-content:safe center}
.mock .dg-col{flex:none}
.m-set{display:grid;grid-template-columns:repeat(3,297px);gap:10px 12px}
.m-set figure{margin:0;display:grid;gap:5px;justify-items:center}
.m-set figcaption{color:#b5b5b5;font:500 8px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.12em}
.m-pg{position:relative;width:297px;height:167px;overflow:hidden;background:#fff;color:#111;font-family:system-ui,"PingFang SC",sans-serif;box-shadow:0 14px 30px -12px rgba(0,0,0,.8)}
.dg .m-it{font-style:italic;font-weight:900;letter-spacing:-.04em}
.m-hd{position:absolute;left:14px;right:14px;top:9px;display:flex;justify-content:space-between;color:#8a8a8a;font:600 4px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.14em}
.m-hd b{color:#111;font-weight:800}
.m-pn{position:absolute;right:14px;bottom:8px;padding:2px 3px;background:#ffd400;color:#111;font:800 4px/1 system-ui,sans-serif;letter-spacing:.06em}
.m-hl{background:linear-gradient(transparent 58%,#ffd400 58% 92%,transparent 92%)}
/* 黑白照片 */
.m-bw{background:radial-gradient(40% 60% at 72% 30%,rgba(255,255,255,.55),transparent 70%),repeating-linear-gradient(118deg,#1e1e1e 0 16px,#5d5d5d 16px 19px,#2f2f2f 19px 34px,#8c8c8c 34px 36px),linear-gradient(#444,#1a1a1a)}
.m-bw::after{content:"";position:absolute;left:206px;top:100px;width:8px;height:22px;border-radius:4px 4px 1px 1px;background:#0c0c0c;box-shadow:0 -7px 0 -1.4px #0c0c0c}
/* 封面 */
.m-cv .m-bw{position:absolute;inset:0}
.m-tw{position:absolute;left:-4px;top:30px;width:200px;height:104px;filter:drop-shadow(0 3px 5px rgba(0,0,0,.45))}
.m-tear{position:absolute;inset:0;background:#fff}
.m-tw .m-in{position:absolute;left:18px;top:18px;right:14px}
.m-tw h1{margin:0;font:900 27px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.02em}
.m-tw .m-en{margin-top:5px!important;font-size:8px;color:#111}
.m-tw .m-en span{padding:0 2px}
.m-tw .m-line{margin-top:9px!important;padding-top:6px;border-top:.6px solid #111;display:flex;justify-content:space-between;font-size:4.6px;color:#3a3a3a}
.m-tw .m-line b{color:#111;font-size:6px}
.m-cv .m-yr{position:absolute;right:16px;bottom:14px;color:#fff;font-size:22px;line-height:1}
.m-cv .m-tag{position:absolute;right:16px;top:12px;padding:2px 4px;background:#ffd400;font:800 4.4px/1 system-ui,sans-serif;letter-spacing:.14em}
/* 目录 */
.m-toc h2{position:absolute;left:14px;top:20px;margin:0;font:900 13px/1 system-ui,"PingFang SC",sans-serif}
.m-toc h2 small{margin-left:4px;color:#8a8a8a;font-size:5px;font-weight:700;letter-spacing:.2em}
.m-cols{position:absolute;left:14px;right:14px;top:44px;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:7px}
.m-cols>div{display:grid;gap:3px;align-content:start}
.m-cols .m-it{font-size:24px;line-height:.9}
.m-cols .m-bar{width:12px;height:1.6px;background:#ffd400}
.m-cols .m-th{position:relative;height:38px;overflow:hidden;background:#d6d6d6}
.m-cols p{color:#111;font:800 5.6px/1.2 system-ui,"PingFang SC",sans-serif}
.m-cols span{color:#8a8a8a;font-size:3.8px;line-height:1.4}
.m-cols em{color:#3a3a3a;font:700 3.8px/1 system-ui,sans-serif;letter-spacing:.06em}
.m-t1{background:radial-gradient(circle at 30% 40%,#fff 0 6px,transparent 6.5px),linear-gradient(135deg,#2b2b2b 50%,#6b6b6b 50%)!important}
.m-t2{background:repeating-linear-gradient(90deg,#efefef 0 10px,#bdbdbd 10px 11px),#efefef!important}
.m-t2::after{content:"";position:absolute;left:8px;top:6px;width:14px;height:26px;border-radius:3px;background:#111;box-shadow:18px 4px 0 #3a3a3a}
.m-t3{background:linear-gradient(#ececec 30%,#111 30% 34%,#ececec 34%)!important}
.m-t3::after{content:"";position:absolute;left:6px;right:6px;bottom:6px;height:14px;background:repeating-linear-gradient(90deg,#8a8a8a 0 6px,transparent 6px 8px)}
.m-t4{background:radial-gradient(60% 80% at 50% 100%,#6b6b6b,#1e1e1e)!important}
.m-t4::after{content:"";position:absolute;left:50%;top:9px;width:16px;height:16px;margin-left:-8px;border-radius:50%;background:#ffd400}
.m-t5{background:linear-gradient(90deg,#111 0 40%,#ececec 40%)!important}
.m-t5::after{content:"";position:absolute;left:44%;right:6px;top:8px;bottom:8px;background:repeating-linear-gradient(#8a8a8a 0 2px,transparent 2px 6px)}
/* 关于我 */
.m-por{position:absolute;left:14px;top:24px;width:86px;height:126px;overflow:hidden;background:linear-gradient(#cfcfcf,#9d9d9d)}
.m-por::before{content:"";position:absolute;left:25px;top:28px;width:36px;height:42px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#6d6d6d,#2a2a2a 75%)}
.m-por::after{content:"";position:absolute;left:6px;right:6px;bottom:-10px;height:64px;border-radius:34px 34px 0 0;background:linear-gradient(#222,#111)}
.m-ab .m-name{position:absolute;left:114px;top:26px;font:900 15px/1 system-ui,"PingFang SC",sans-serif}
.m-ab .m-name small{margin-left:5px;color:#8a8a8a;font-size:5px;font-weight:700;letter-spacing:.2em}
.m-ab .m-role{position:absolute;left:114px;top:46px;font:700 5.4px/1 system-ui,"PingFang SC",sans-serif}
.m-ab .m-bio{position:absolute;left:114px;right:16px;top:57px;color:#3a3a3a;font-size:4.4px;line-height:1.7}
.m-ab .m-st{position:absolute;left:114px;right:16px;top:86px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;padding:6px 0;border-top:.6px solid #111;border-bottom:.5px solid #d0d0d0}
.m-ab .m-st b{display:inline-block;font:900 15px/1 system-ui,sans-serif;letter-spacing:-.03em}
.m-ab .m-st b small{margin-left:1px;font-size:5px}
.m-ab .m-st span{display:block;margin-top:2px;color:#8a8a8a;font-size:3.8px}
.m-tags{position:absolute;left:114px;right:16px;top:124px;display:flex;flex-wrap:wrap;gap:3px}
.m-tags span{padding:2px 4px;border:.6px solid #111;border-radius:6px;font:600 3.8px/1 system-ui,sans-serif}
.m-tags span:first-child{background:#111;color:#fff}
/* 项目页 */
.m-pj .m-tx{position:absolute;left:14px;top:22px;width:104px;display:grid;gap:5px}
.m-pj .m-k{display:flex;align-items:baseline;gap:4px}
.m-pj .m-k .m-it{font-size:18px;line-height:.9}
.m-pj .m-k span{color:#8a8a8a;font:700 4px/1 system-ui,sans-serif;letter-spacing:.16em}
.m-pj h3{margin:0;font:900 8.4px/1.3 system-ui,"PingFang SC",sans-serif}
.m-pj dl{display:grid;gap:3px;margin:0;font-size:4px;line-height:1.55;color:#3a3a3a}
.m-pj dt{color:#111;font-weight:800;font-size:4.4px}
.m-pj dd{margin:0}
.m-pj .m-nums{display:flex;gap:9px;padding-top:4px;border-top:.6px solid #111}
.m-pj .m-nums div{display:grid;gap:2px}
.m-pj .m-nums b{font:900 13px/1 system-ui,sans-serif;letter-spacing:-.03em}
.m-pj .m-nums b small{font-size:4.6px;margin-left:1px}
.m-pj .m-nums span{color:#8a8a8a;font-size:3.6px}
.m-stage{position:absolute;left:128px;right:0;top:0;bottom:0;background:#ececec}
.m-stage::after{content:"";position:absolute;left:12px;right:12px;bottom:18px;height:6px;border-radius:50%;background:radial-gradient(rgba(0,0,0,.22),transparent 70%)}
.m-ph{position:absolute;bottom:20px;width:44px;height:90px;padding:2.4px;border-radius:7px;background:#111;box-shadow:4px 6px 10px -4px rgba(0,0,0,.4)}
.m-ph>div{position:relative;height:100%;overflow:hidden;border-radius:5px;background:#fff;display:grid;align-content:start;gap:2.4px;padding:7px 3px 3px}
.m-ph>div::before{content:"";position:absolute;left:50%;top:2px;width:12px;height:2.6px;margin-left:-6px;border-radius:2px;background:#111}
.m-ph .m-bar{height:4px;border-radius:1px;background:#ececec}
.m-ph .m-g{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:2px}
.m-ph .m-g i{display:block;height:17px;border-radius:1px;background:linear-gradient(140deg,#3a3a3a,#8a8a8a)}
.m-ph .m-g i:nth-child(3n){background:linear-gradient(140deg,#bdbdbd,#ececec)}
.m-ph .m-g i.m-y{background:#ffd400}
.m-ph .m-big{height:38px;border-radius:1px;background:radial-gradient(circle at 60% 40%,#ffd400 0 7px,transparent 7.5px),linear-gradient(#2b2b2b,#6b6b6b)}
.m-ph .m-ln{height:2.2px;border-radius:1px;background:#d0d0d0}
.m-ph .m-ln.m-s{width:60%}
.m-ph .m-ch{height:28px;border-radius:1px;background:linear-gradient(transparent 49%,#ececec 49% 51%,transparent 51%),#fafafa;position:relative}
.m-ph .m-ch svg{position:absolute;inset:2px;width:calc(100% - 4px);height:calc(100% - 4px)}
.m-ph .m-kp{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:2px}
.m-ph .m-kp b{display:grid;gap:1px;padding:2px;border-radius:1px;background:#ececec;font:900 5px/1 system-ui,sans-serif}
.m-ph .m-kp b small{color:#8a8a8a;font-size:2.6px;font-weight:600}
.m-lap{position:absolute;left:12px;bottom:26px;width:124px;height:80px;padding:3px;border-radius:4px 4px 0 0;background:#111}
.m-lap>div{height:100%;overflow:hidden;background:#fff;display:grid;grid-template-rows:6px 34px auto;gap:3px}
.m-lap .m-nav{display:flex;align-items:center;gap:1.5px;padding:0 3px;background:#ececec}
.m-lap .m-nav i{width:2px;height:2px;border-radius:50%;background:#8a8a8a}
.m-lap .m-hero{position:relative;margin:0 4px;background:linear-gradient(90deg,#1e1e1e 0 55%,transparent 55%),repeating-linear-gradient(90deg,#d6d6d6 0 2px,#ececec 2px 4px)}
.m-lap .m-hero::before{content:"街角书房";position:absolute;left:5px;top:9px;color:#fff;font:900 7px/1 system-ui,"PingFang SC",sans-serif}
.m-lap .m-hero::after{content:"";position:absolute;left:5px;top:20px;width:18px;height:4px;background:#ffd400}
.m-lap .m-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:3px;margin:0 4px}
.m-lap .m-row i{height:20px;background:linear-gradient(#8a8a8a,#3a3a3a)}
.m-lap .m-row i:nth-child(2){background:linear-gradient(#d6d6d6,#bdbdbd)}
.m-base{position:absolute;left:4px;bottom:20px;width:140px;height:6px;border-radius:0 0 4px 4px;background:linear-gradient(#cfcfcf,#9d9d9d)}
/* 结尾页 */
.m-end{background:#111;color:#fff}
.m-end .m-hd{color:#8a8a8a}
.m-end .m-hd b{color:#fff}
.m-end .m-big{position:absolute;left:14px;top:30px;font-size:27px;line-height:.95;white-space:nowrap}
.m-end .m-big small{display:block;margin-top:6px;color:#ffd400;font:800 7px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.1em;font-style:normal}
.m-end .m-ct{position:absolute;left:14px;top:118px;display:grid;grid-template-columns:repeat(3,auto);gap:14px;font-size:4.2px;color:#bdbdbd}
.m-end .m-ct span{display:grid;gap:2px}
.m-end .m-ct b{color:#fff;font-size:5.4px}
.m-end .m-qr{position:absolute;right:20px;top:42px;display:grid;justify-items:center;gap:4px;color:#8a8a8a;font-size:3.8px}
.m-end .m-qr svg{width:50px;height:50px;padding:3px;background:#fff}
.m-end .m-pn{color:#111}
</style>

<div class="dg mock"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
const fig = (cap, body) => `<figure>${body}<figcaption>${cap}</figcaption></figure>`;
const hd = (r) => `<p class="m-hd"><span><b>MyPrompts</b> / PORTFOLIO 2026</span><span>${r}</span></p>`;
const pn = (n) => `<span class="m-pn">${n} / 24</span>`;
// 撕纸边：上、右、下三边按固定种子抖动
function tear() {
  let s = 3; const r = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const pts = [];
  for (let x = 0; x <= 96; x += 3) pts.push(`${x}% ${(r() * 5).toFixed(1)}%`);
  for (let y = 4; y <= 96; y += 6) pts.push(`${(96 + r() * 4).toFixed(1)}% ${y}%`);
  for (let x = 96; x >= 0; x -= 3) pts.push(`${x}% ${(95 + r() * 5).toFixed(1)}%`);
  return `polygon(${pts.join(',')})`;
}
function qr() {
  let s = 9, out = '';
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const fin = (x, y) => `<rect x="${x}" y="${y}" width="7" height="7" fill="none" stroke="#111"/><rect x="${x + 2}" y="${y + 2}" width="3" height="3"/>`;
  for (let y = 0; y < 21; y++) for (let x = 0; x < 21; x++) {
    if ((x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12)) continue;
    if (rnd() > .52) out += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
  }
  return `<svg viewBox="-.5 -.5 22 22" fill="#111">${out}${fin(0, 0)}${fin(14, 0)}${fin(0, 14)}</svg>`;
}
const chs = [['01', '新媒体运营', '账号从 0 到 10 万粉', '03–08', 'm-t1'], ['02', '品牌视觉', '社区书店的整套视觉', '09–13', 'm-t2'], ['03', '活动策划', '城市市集与快闪店', '14–17', 'm-t3'], ['04', '短视频', '门店探店系列 36 条', '18–21', 'm-t4'], ['05', '数据复盘', '投放与转化的周报', '22–24', 'm-t5']];
const feed = `<div><i class="m-bar"></i><div class="m-g"><i></i><i class="m-y"></i><i></i><i></i><i></i><i></i></div></div>`;
const post = `<div><i class="m-big"></i><i class="m-ln"></i><i class="m-ln"></i><i class="m-ln m-s"></i><i class="m-bar"></i></div>`;
const dash = `<div><div class="m-kp"><b>10.6万<small>粉丝增长</small></b><b>4.2%<small>互动率</small></b></div><div class="m-ch"><svg viewBox="0 0 40 24" preserveAspectRatio="none"><polyline points="0,22 6,20 12,19 18,15 24,13 30,8 36,5 40,2" fill="none" stroke="#111" stroke-width="1.2"/><circle cx="36" cy="5" r="1.6" fill="#ffd400" stroke="#111" stroke-width=".6"/></svg></div><i class="m-ln"></i><i class="m-ln m-s"></i></div>`;
export default function demo(root) {
  draw(root, `<div class="m-set">
${fig('封面', `<div class="m-pg m-cv"><div class="m-bw"></div><span class="m-tag">PORTFOLIO</span>
  <div class="m-tw"><div class="m-tear" style="clip-path:${tear()}"></div><div class="m-in">
    <h1>个人作品集</h1><p class="m-en m-it"><span class="m-hl">PORTFOLIO</span> OF CONTENT &amp; VISUAL</p>
    <p class="m-line"><span><b>MyPrompts</b>　新媒体运营 · 视觉设计</span><span>186 2026 0918　微信 zhixia-design</span></p></div></div>
  <b class="m-yr m-it">2026</b>
</div>`)}
${fig('目录', `<div class="m-pg m-toc">${hd('CONTENTS')}
  <h2>目录<small>CONTENTS</small></h2>
  <div class="m-cols">${chs.map(([n, t, d, p, c]) => `<div><b class="m-it">${n}</b><i class="m-bar"></i><i class="m-th ${c}"></i><p>${t}</p><span>${d}</span><em>P.${p}</em></div>`).join('')}</div>
  ${pn('02')}
</div>`)}
${fig('关于我', `<div class="m-pg m-ab">${hd('ABOUT ME')}<i class="m-por"></i>
  <p class="m-name">MyPrompts<small>VISUAL DESIGNER</small></p><p class="m-role">新媒体运营 · 视觉设计　4 年经验</p>
  <p class="m-bio">做过咖啡、书店和文旅三个行业的账号，从选题、拍摄、排版到投放复盘都自己上手。习惯先看数据再动笔，也能把一条内容做成一整套视觉。</p>
  <div class="m-st"><div><b class="m-hl">4<small>年</small></b><span>新媒体运营</span></div><div><b class="m-hl">120<small>万</small></b><span>累计粉丝增长</span></div><div><b class="m-hl">36<small>个</small></b><span>品牌项目</span></div></div>
  <div class="m-tags"><span>内容策划</span><span>Figma</span><span>Photoshop</span><span>After Effects</span><span>剪映</span><span>数据分析</span></div>
  ${pn('03')}
</div>`)}
${fig('项目页 · 手机', `<div class="m-pg m-pj">${hd('01 新媒体运营')}
  <div class="m-tx"><p class="m-k"><b class="m-it">01</b><span>SOCIAL MEDIA</span></p><h3>山野咖啡种草账号<br>3 个月从 0 到 10 万粉</h3>
    <dl><dt>项目背景</dt><dd>品牌新开 12 家社区店，线上几乎没有声量。</dd><dt>我的职责</dt><dd>定选题方向、拍摄修图、写文案，每周复盘一次投放。</dd></dl>
    <div class="m-nums"><div><b class="m-hl">10.6<small>万</small></b><span>粉丝增长</span></div><div><b class="m-hl">4.2<small>%</small></b><span>平均互动率</span></div><div><b class="m-hl">38<small>篇</small></b><span>千赞笔记</span></div></div></div>
  <div class="m-stage"><div class="m-ph" style="left:18px;bottom:26px">${feed}</div><div class="m-ph" style="left:68px;bottom:18px;transform:scale(1.08);transform-origin:50% 100%">${post}</div><div class="m-ph" style="left:120px;bottom:30px">${dash}</div></div>
  ${pn('05')}
</div>`)}
${fig('项目页 · 屏幕', `<div class="m-pg m-pj">${hd('02 品牌视觉')}
  <div class="m-tx"><p class="m-k"><b class="m-it">02</b><span>BRAND VISUAL</span></p><h3>街角书房<br>官网与小程序视觉改版</h3>
    <dl><dt>项目背景</dt><dd>老官网三年没更新，会员入口藏在第三层菜单。</dd><dt>我的职责</dt><dd>重做视觉规范、首页和活动页，配合开发上线小程序。</dd></dl>
    <div class="m-nums"><div><b class="m-hl">+46<small>%</small></b><span>平均停留时长</span></div><div><b class="m-hl">2.3<small>倍</small></b><span>会员注册</span></div></div></div>
  <div class="m-stage"><div class="m-lap"><div><p class="m-nav"><i></i><i></i><i></i></p><i class="m-hero"></i><p class="m-row"><i></i><i></i><i></i><i></i></p></div></div><i class="m-base"></i><div class="m-ph" style="left:116px;bottom:20px;transform:scale(.92);transform-origin:50% 100%">${post}</div></div>
  ${pn('10')}
</div>`)}
${fig('结尾页', `<div class="m-pg m-end">${hd('CONTACT')}
  <p class="m-big m-it">THANKS<br>FOR WATCHING<small>期待和你一起做点好内容</small></p>
  <div class="m-ct"><span>电话<b>186 2026 0918</b></span><span>微信<b>zhixia-design</b></span><span>所在城市<b>杭州 · 可到岗上海</b></span></div>
  <div class="m-qr">${qr()}<span>扫码看完整案例</span></div>
  ${pn('24')}
</div>`)}
</div>`, { center: true, min: 0.2 });
}
</script>
