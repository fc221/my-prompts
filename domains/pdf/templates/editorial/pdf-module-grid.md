---
zh: 活动手册网格页
en: Event guide grid page
aka: 活动日历 活动月历 课程表 日程页 色块网格 活动季手册
order: 50
---

## 是什么

一页排完一个周期的活动：顶部压一行很淡的超大标题当底纹，上面是真正的页标题；下面是 4 个等宽的竖向色块，严格占满四栏网格，每块从上到下依次是日期、大号活动名和两三行说明。读者扫一眼就知道这个月哪天有什么。

## 适合

社区、商场、书店的月度活动手册；学校和培训机构的课程表、开放日日程；展览的展期汇总；门店的会员活动月历，每页 4 场左右。

## 不适合

一天好几场、要精确到时段和场地的日程，改成时间乘场地的表格；单场活动需要大段介绍和照片时用「杂志专题跨页」；以数字和图表为主的总结材料看「数据报告」。

## 注意

四个色块只靠明度拉开，饱和度都压低，颜色一鲜艳就显得廉价，块里的文字统一用同一个深色。活动名在每块里的位置要齐：说明区固定 3 行高，文案超了就改短，不靠缩小字号塞进去。

## 要点

- 页面：A4 横版 297×210mm，左右边距 16mm、上 16mm、下 12mm；版心分 4 栏，栏间距 6mm，每块约 61.75mm 宽。
- 底纹标题：页面顶部一行 160–180pt 的思源黑体 Heavy，颜色只比纸色深 5%–8%（纸色 #f3efe6、底纹 #e7e0cf），可以出血被裁掉一部分；真正的页标题 24–28pt 粗体压在它上面，下面一行 9pt 副标题。
- 色块：高约 130mm，圆角 0–3mm；四色依次为灰绿 #a3b59c、土黄 #cba65f、米黄 #e6d8b4、灰蓝 #93aabd，块内文字统一 #26261f。
- 块内结构：内边距 8mm；顶部日期 32–36pt 粗体加一行 8pt 星期和时间；活动名 40–44pt 思源黑体 Heavy，两行、每行 2–3 个字，底边对齐说明区；说明区上方 0.5pt 线，固定 3 行 8pt，最后一行粗体写地点。
- 装饰和页脚：每块可以加一个简单几何形（圆、叶形、书本、月亮），比块色深 10%，放在活动名后面、可以超出块的右边，不压日期；页脚一行写报名方式和页码，8pt 灰色 #6f6a5e。
- 多页：每月一页，四色顺序固定；超过 4 场就排成两行各 4 块，或者翻到下一页；某周停办就留一个纸色虚线框，写“本周休息”。
- 颜色印前转 CMYK 看一次，低饱和色偏得更明显，按「打印颜色与出血」打样。
- 整套页面：整本都用 A4 横版，包括封面、目录或月份总览、每月一张网格页（本条）、单场活动详情页（左半照片、右半文字）、报名须知和地图页、封底。封面把同样的四色做成底部 4 个短色块，对齐内页的四栏网格，标题改成深色实字；所有页沿用纸色 #f3efe6 和思源黑体。

## 提示词

为{机构或门店}做一整套{月份或活动季}活动手册 PDF，核心是网格页，实现方式按{实现方式，如 HTML + 打印 CSS}：
1. 页面 A4 横版 297×210mm，边距左右 16mm、上 16mm、下 12mm；版心 4 栏，栏间距 6mm。
2. 顶部一行 160–180pt 的超大标题做底纹，颜色只比纸色 #f3efe6 深 5%–8%，可以出血；页标题 24–28pt 粗体压在底纹上，下面 9pt 副标题。
3. 下方 4 个等宽竖向色块，高约 130mm，依次用 #a3b59c、#cba65f、#e6d8b4、#93aabd，文字统一 #26261f。
4. 每块：顶部日期 32–36pt 加 8pt 星期和时间；中下部活动名 40–44pt、两行；底部说明区固定 3 行 8pt，最后一行粗体写地点；四块的活动名底边对齐。
5. 活动来自{活动清单，含日期、时间、名称、说明、地点}，超过 4 场换行或翻页，四色顺序不变；页脚写报名方式和页码。
6. 整套页面都用 A4 横版，包括封面、月份总览、网格页、活动详情页、报名须知和地图页、封底，每种页各给一个示例页；封面底部用同样的四色短色块对齐四栏网格。
交付时列出整套页面清单，截图确认四块等宽、活动名对齐、没有文字超出色块，并附一份印刷打样时要核对的色块颜色清单。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.mock{background:radial-gradient(120% 100% at 20% 0%,#cfcac0,#a39d92 75%)}
.mock .dg-row{justify-content:center}
.mock .dg-col{flex:none}
.m-pg{position:relative;width:297px;height:210px;overflow:hidden;padding:16px 16px 12px;background:#f3efe6;color:#26261f;font-family:system-ui,"PingFang SC",sans-serif;box-shadow:0 14px 30px -10px rgba(60,50,35,.55)}
.m-wm{position:absolute;left:10px;top:4px;margin:0;color:#e7e0cf;font:900 60px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.12em;white-space:nowrap}
.m-top{position:relative;display:flex;justify-content:space-between;align-items:end;height:44px;padding-bottom:7px}
.m-top h1{margin:0;font:800 10px/1.2 system-ui,"PingFang SC",sans-serif}
.m-top h1 small{display:block;margin-top:2px;color:#6f6a5e;font-size:5px;font-weight:500}
.m-top p{color:#6f6a5e;font:600 5px/1.3 system-ui,sans-serif;letter-spacing:.16em;text-align:right}
.m-grid{position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;height:132px}
.m-cell{position:relative;display:flex;flex-direction:column;overflow:hidden;padding:9px 8px 8px;border-radius:3px}
.m-cell b{position:relative;font:800 12px/1 system-ui,sans-serif;letter-spacing:-.01em}
.m-cell .m-wk{position:relative;margin-top:3px;font-size:4.6px;font-weight:600;letter-spacing:.08em;opacity:.7}
.m-cell h2{position:relative;margin:auto 0 0;font:900 15px/1.12 system-ui,"PingFang SC",sans-serif}
.m-cell p.m-d{position:relative;height:31px;margin-top:6px;padding-top:5px;border-top:.5px solid rgba(38,38,31,.35);font-size:4.6px;line-height:1.5}
.m-cell p.m-d em{display:block;margin-top:2px;font-weight:700}
.m-c1{background:#a3b59c}
.m-c2{background:#cba65f}
.m-c3{background:#e6d8b4}
.m-c4{background:#93aabd}
.m-shape{position:absolute;right:-10px;top:36px;width:44px;height:44px}
.m-c1 .m-shape{background:radial-gradient(circle at 35% 50%,#8da486 15px,transparent 15.5px),radial-gradient(circle at 70% 50%,rgba(141,164,134,.7) 15px,transparent 15.5px)}
.m-c2 .m-shape{border-radius:3px 0 0 3px;background:linear-gradient(90deg,#b8924c 0 46%,transparent 46% 54%,#b8924c 54%);transform:rotate(-8deg);height:32px;top:42px}
.m-c3 .m-shape{border-radius:0 70% 0 70%;background:#d6c597;transform:rotate(10deg)}
.m-c4 .m-shape{border-radius:50%;background:radial-gradient(circle at 70% 35%,#93aabd 14px,#7e97ac 14.5px)}
.m-foot{position:relative;display:flex;justify-content:space-between;margin-top:8px!important;color:#6f6a5e;font-size:4.6px;letter-spacing:.06em}
.m-cv{display:flex;flex-direction:column}
.m-cv .m-hd{display:flex;justify-content:space-between;color:#6f6a5e;font:600 5px/1 system-ui,sans-serif;letter-spacing:.16em}
.m-cv h2{margin:20px 0 0 -2px;font:900 58px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.12em}
.m-cv .m-tag{margin-top:9px!important;font:800 9px/1.3 system-ui,"PingFang SC",sans-serif}
.m-cv .m-tag small{display:block;margin-top:2px;color:#6f6a5e;font-size:5px;font-weight:500}
.m-tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;height:50px;margin-top:auto}
.m-tabs div{position:relative;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;padding:7px 8px;border-radius:3px 3px 0 0}
.m-tabs b{position:relative;font:800 10px/1 system-ui,sans-serif}
.m-tabs span{position:relative;font-size:5.4px;font-weight:700}
.m-tabs .m-shape{top:8px;right:-14px}
</style>

<div class="dg mock"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, [`<div class="m-pg m-cv"><p class="m-hd"><span>南湖社区</span><span>2026 · JULY</span></p><h2>夏日邻里</h2><p class="m-tag">七月活动手册<small>4 场活动 · 全部免费 · 每周六开场</small></p>
      <div class="m-tabs"><div class="m-c1"><i class="m-shape"></i><b>07.04</b><span>旧物交换集</span></div><div class="m-c2"><i class="m-shape"></i><b>07.11</b><span>亲子绘本会</span></div><div class="m-c3"><i class="m-shape"></i><b>07.18</b><span>屋顶菜园日</span></div><div class="m-c4"><i class="m-shape"></i><b>07.25</b><span>露天电影夜</span></div></div></div>`, `<div class="m-pg">
    <p class="m-wm">夏日邻里</p>
    <div class="m-top"><h1>南湖社区 · 七月活动手册<small>每周六上午开场 · 全部免费 · 提前一周报名</small></h1><p>2026<br>JULY</p></div>
    <div class="m-grid">
      <div class="m-cell m-c1"><b>07.04</b><span class="m-wk">周六 09:30</span><i class="m-shape"></i><h2>旧物<br>交换集</h2><p class="m-d">带一件闲置来，<br>换一件心仪的。<em>社区广场东侧</em></p></div>
      <div class="m-cell m-c2"><b>07.11</b><span class="m-wk">周六 10:00</span><i class="m-shape"></i><h2>亲子<br>绘本会</h2><p class="m-d">志愿者老师领读，<br>4–8 岁，限 20 组。<em>邻里中心二楼</em></p></div>
      <div class="m-cell m-c3"><b>07.18</b><span class="m-wk">周六 08:30</span><i class="m-shape"></i><h2>屋顶<br>菜园日</h2><p class="m-d">认领一格菜地，<br>学种番茄和薄荷。<em>3 号楼屋顶花园</em></p></div>
      <div class="m-cell m-c4"><b>07.25</b><span class="m-wk">周六 19:30</span><i class="m-shape"></i><h2>露天<br>电影夜</h2><p class="m-d">自带小板凳，<br>现场有绿豆汤。<em>南湖公园草坪</em></p></div>
    </div>
    <p class="m-foot"><span>报名：邻里中心一楼前台，或小程序“南湖邻里”</span><span>05</span></p>
  </div>`], { center: true, min: 0.25 });
}
</script>
