---
zh: 展览图录
en: Exhibition catalogue spread
aka: 图录 展览画册 展陈手册 档案展 品牌史画册 博物馆画册
order: 30
---

## 是什么

展览图录里每个单元的开篇对页：左页只有文字，顶部一行单元编号，下面是两行超大的粗体标题、一段带署名的引言，再往下是两栏正文；右页是一张满版的暖褐色档案照片，角上叠一张带白边的小照片。一边是字，一边是图，像翻开一本馆藏档案。

## 适合

美术馆、博物馆、档案馆的展览图录；企业和老字号的品牌史画册；校史馆、城市更新项目的成果册，每个单元或年代用一组开篇对页。

## 不适合

以展品清单为主、每页好几件作品的图录内页，改成网格排列加编号；现代产品或新品宣传用「产品参数画册」或「明暗对开画册」；照片多、文字少的作品集目录看「摄影集目录页」。

## 注意

档案图统一调色前先留一份原始扫描件，调色只改整体色调，不修补划痕、不改内容，图注写清年代和收藏单位。超大标题只放 2 行、每行 2–4 个字，字多了就压不住整页，宁可把长名字放到副标题。

## 要点

- 页面：两张 A4 竖版组成 420×297mm 跨页，右页档案图出血 3mm、铺满整页；左页上边距 20mm、外侧 18mm、内侧 20mm、下边距 16mm，版心分 2 栏，栏间距 9mm。
- 左页上部：单元名和编号（如 第三单元 · EX-03）一左一右，7pt 无衬线、字距 0.2em，下接 0.5pt 线，都用砖红 #9b4a26；下面是思源宋体 Heavy 140–150pt 的两行标题，行距 0.95，第二行可用砖红，再下一行 8pt 副标题写展览全名和年代。
- 引言：思源宋体 Bold 12–13pt，左侧 1.5pt 砖红竖线，2 行以内；署名 7pt，写人名和身份。
- 正文：贴着左页下边，思源宋体 Regular 8.5–9pt，行距 1.7，两端对齐，段首缩进 2 字，单元导语 300 字以内，长文放到后面的内页。
- 档案图：先转灰度，再整体叠暖褐色调（高光 #d2b187、暗部 #2b1e14），保留颗粒，四角压暗 20%–30%；图注 7pt 放在图片下沿内侧，左写“图号 年代 事件”，右写收藏单位。
- 小图：宽约右页的 1/3，3mm 白边，旋转不超过 3°，加一层柔和投影，放在主图主体以外的角落，和主图讲同一件事（人物、证件、信件）。
- 配色：纸色 #efe7d8、文字深褐 #2e2219、强调砖红 #9b4a26；每个单元换一个开篇对页结构不变，单元编号和图号全书连续。
- 整套页面：封面、目录、前言、单元开篇对页（本条）、展品图版页（每页 1–4 件，带编号和说明）、展品清单页、版权页和封底。封面同样用纸色和砖红细线，上半部放一张暖褐调的档案图版，标题一行横排；图版页沿用 2 栏网格和“图号 年代 事件”的图注格式。

## 提示词

为{机构或品牌}的{展览或项目名}做一整套展览图录 PDF，每个单元一组开篇对页，实现方式按{实现方式，如 HTML + 打印 CSS}：
1. 页面是两张 A4 竖版组成的 420×297mm 跨页，文档设成双页视图、封面单独。
2. 左页只放文字，纸色 #efe7d8：顶部单元名和编号（7pt，砖红 #9b4a26，下接 0.5pt 线）；两行超大标题（思源宋体 Heavy 140–150pt，行距 0.95，第二行砖红）；一行 8pt 副标题；一段带署名的引言（12–13pt，左侧砖红竖线）；底部两栏正文（8.5–9pt，行距 1.7，栏距 9mm）。
3. 右页是满版出血的档案图：灰度后叠暖褐色调，保留颗粒，四角压暗；图注 7pt 放图片下沿，写图号、年代和收藏单位。
4. 右页角上叠一张宽约 1/3 页的小图，3mm 白边，旋转不超过 3°，不遮挡主图主体。
5. 单元内容来自{单元清单}，每个单元重复这一结构，编号和图号全书连续；原始扫描件单独保存，只用调色后的副本排版。
6. 整套页面包括封面、目录、前言、单元开篇对页、展品图版页、展品清单页、版权页和封底，每种页各给一个示例页；封面沿用纸色、砖红细线和思源宋体标题。
交付时列出整套页面清单，给出一个单元的开篇对页截图，并列出每张图的图号、年代和收藏单位，确认和图注一致。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.mock{background:radial-gradient(110% 90% at 25% 15%,#4a3f36,#1c1714 72%)}
.mock .dg-row{justify-content:center}
.mock .dg-col{flex:none}
.m-sp{display:flex;width:420px;height:297px;box-shadow:0 18px 40px -12px rgba(0,0,0,.75);color:#2e2219;font-family:"Songti SC","STSong",serif}
.m-pg{position:relative;width:210px;height:297px;overflow:hidden}
.m-l{display:flex;flex-direction:column;padding:20px 20px 16px 18px;background:#efe7d8}
.m-l::after{content:"";position:absolute;inset:0 0 0 auto;width:16px;background:linear-gradient(90deg,transparent,rgba(60,35,15,.16))}
.m-lab{display:flex;justify-content:space-between;padding-bottom:5px;border-bottom:.5px solid #9b4a26;color:#9b4a26;font:600 4.8px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.2em}
.m-l h1{margin:13px 0 0 -2px;font:900 50px/.96 "Songti SC","STSong",serif;letter-spacing:.02em}
.m-l h1 em{color:#9b4a26}
.m-sub{margin-top:8px!important;color:#6d5643;font:500 5.4px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.18em}
.m-q{margin:14px 0 0;padding-left:7px;border-left:1.5px solid #9b4a26;font:700 8.6px/1.5 "Songti SC","STSong",serif}
.m-q cite{display:block;margin-top:4px;color:#6d5643;font:400 4.8px/1.4 system-ui,"PingFang SC",sans-serif;font-style:normal}
.m-body{margin-top:auto;padding-top:12px;column-count:2;column-gap:9px;color:#3d2f24;font:400 4.6px/1.72 "Songti SC","STSong",serif;text-align:justify}
.m-body p{text-indent:2em}
.m-folio{display:flex;justify-content:space-between;margin-top:9px!important;color:#8b735e;font:500 4.4px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.12em}
.m-r{background:#2f2116}
.m-arch{position:absolute;inset:0;background:linear-gradient(#d2b187,#b58e63 42%,#80603f 60%,#3e2b1d 60.5%,#2b1e14)}
.m-arch::before{content:"";position:absolute;inset:0;z-index:3;background:repeating-linear-gradient(90deg,transparent 0 67px,rgba(255,236,205,.07) 67px 67.5px),repeating-linear-gradient(0deg,rgba(255,236,205,.035) 0 1px,transparent 1px 2px),radial-gradient(95% 80% at 50% 42%,transparent 50%,rgba(28,16,8,.62))}
.m-hull{position:absolute;left:-6px;bottom:102px;width:170px;height:76px;background:linear-gradient(#4b3524,#2a1c12);clip-path:polygon(0 38%,100% 0,90% 100%,6% 100%)}
.m-hull::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 9px,rgba(210,175,130,.18) 9px 9.6px)}
.m-cabin{position:absolute;left:96px;bottom:168px;width:30px;height:20px;background:#3a291b;clip-path:polygon(0 30%,100% 0,100% 100%,0 100%)}
.m-crane{position:absolute;right:26px;top:46px;width:64px;height:132px;border:solid #2a1c12;border-width:6px 4px 0}
.m-crane::before{content:"";position:absolute;inset:0;background:linear-gradient(56deg,transparent 49%,#2a1c12 49% 51%,transparent 51%),linear-gradient(-56deg,transparent 49%,#2a1c12 49% 51%,transparent 51%)}
.m-crane::after{content:"";position:absolute;left:-46px;top:-6px;width:46px;height:5px;background:#2a1c12}
.m-hook{position:absolute;right:104px;top:51px;width:1px;height:58px;background:#2a1c12}
.m-man{position:absolute;bottom:98px;width:4px;height:9px;border-radius:2px 2px 0 0;background:#24180f}
.m-man::before{content:"";position:absolute;left:.5px;top:-3.5px;width:3px;height:3px;border-radius:50%;background:#24180f}
.m-rail{position:absolute;left:0;right:0;bottom:0;height:117px;background:repeating-linear-gradient(-8deg,transparent 0 10px,rgba(214,178,132,.12) 10px 11px),linear-gradient(rgba(0,0,0,0),rgba(20,12,6,.45))}
.m-stack{position:absolute;left:112px;bottom:38px;width:88px;height:18px;background:repeating-linear-gradient(#20160e 0 3px,#4a3423 3px 4px);clip-path:polygon(6% 0,100% 0,100% 100%,0 100%)}
.m-man.m-big{transform:scale(2.4);transform-origin:50% 100%}
.m-cap{position:absolute;left:16px;right:16px;bottom:15px;z-index:4;display:flex;justify-content:space-between;color:#eadcc4;font:500 4.6px/1.4 system-ui,"PingFang SC",sans-serif;letter-spacing:.06em}
.m-inset{position:absolute;right:16px;top:18px;z-index:5;width:72px;height:54px;border:3.5px solid #f6f0e4;background:radial-gradient(80% 70% at 50% 40%,#c7a47a,#8c6845);box-shadow:3px 5px 10px rgba(0,0,0,.5);transform:rotate(3deg);overflow:hidden}
.m-bust{position:absolute;bottom:-6px;width:20px;height:18px;border-radius:50% 50% 0 0;background:#3b2a1b}
.m-bust::before{content:"";position:absolute;left:5.5px;top:-11px;width:9px;height:10px;border-radius:50%;background:#4a3625}
.m-cv{display:flex;flex-direction:column;padding:20px 20px 18px;background:#efe7d8;color:#2e2219;box-shadow:0 18px 40px -12px rgba(0,0,0,.75)}
.m-cv::before{content:"";position:absolute;inset:0 auto 0 0;width:8px;background:linear-gradient(90deg,rgba(60,35,15,.18),transparent)}
.m-plate{position:relative;height:152px;margin-top:14px;overflow:hidden;background:radial-gradient(80% 70% at 50% 35%,#d4b48a,#9a7550 72%,#5e4430)}
.m-plate::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(255,236,205,.04) 0 1px,transparent 1px 2px),radial-gradient(90% 80% at 50% 40%,transparent 50%,rgba(28,16,8,.55))}
.m-gb{position:absolute;bottom:-8px;width:34px;height:34px;border-radius:50% 50% 0 0;background:#3b2a1b}
.m-gb::before{content:"";position:absolute;left:9.5px;top:-18px;width:15px;height:17px;border-radius:50%;background:#4a3625}
.m-gb.m-back{bottom:18px;background:#4f3926;transform:scale(.86)}
.m-gb.m-back::before{background:#5c4430}
.m-plate p{position:absolute;left:8px;bottom:6px;z-index:2;color:#eadcc4;font:500 4.6px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.06em}
.m-cv h2{margin:16px 0 0 -1px;font:900 40px/1 "Songti SC","STSong",serif;letter-spacing:.04em}
.m-cv h2 em{color:#9b4a26}
.m-pub{display:flex;justify-content:space-between;margin-top:auto!important;padding-top:6px;border-top:.5px solid #9b4a26;color:#6d5643;font:500 5px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.14em}
</style>

<div class="dg mock"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, [`<div class="m-pg m-cv"><p class="m-lab"><span>江城市档案馆 · 2026 年度特展</span><span>CATALOGUE</span></p>
      <div class="m-plate"><i class="m-gb m-back" style="left:25px"></i><i class="m-gb m-back" style="left:57px"></i><i class="m-gb m-back" style="left:89px"></i><i class="m-gb m-back" style="left:121px"></i>
        <i class="m-gb" style="left:7px"></i><i class="m-gb" style="left:40px"></i><i class="m-gb" style="left:73px"></i><i class="m-gb" style="left:106px"></i><i class="m-gb" style="left:139px"></i><p>1958 年，二号船台铆工班合影</p></div>
      <h2>船坞<em>百年</em></h2><p class="m-sub">江城造船厂档案展 1926—2026</p>
      <p class="m-pub"><span>展览图录</span><span>江城市档案馆 编</span></p></div>`, `<div class="m-sp">
    <div class="m-pg m-l">
      <p class="m-lab"><span>第三单元 · 船台与码头</span><span>EX-03</span></p>
      <h1>船坞<br><em>百年</em></h1>
      <p class="m-sub">江城造船厂档案展 1926—2026</p>
      <blockquote class="m-q">“铆钉一颗颗打进去，<br>船就一寸寸长出来。”<cite>—— 周广林，1958 年进厂的铆工</cite></blockquote>
      <div class="m-body">
        <p>江城造船厂的第一座木质船台建于 1926 年，就在今天展厅北侧的江滩上。最初只能修理往来的小火轮，工人不足百人，钢板和图纸都靠木船从下游运来。</p>
        <p>1950 年代，船台改成钢筋混凝土结构，二号船台可以承造三千吨级货轮。本单元的 64 件档案来自厂档案室、退休职工家中和市档案馆，有施工日志、下水典礼的请柬、铆工的工作证，还有一批从未公开的玻璃底片。</p>
        <p>底片按原尺寸扫描，没有修补划痕，也没有重新调色，尽量保留它们在档案柜里放了六十年的样子。</p>
      </div>
      <p class="m-folio"><span>046</span><span>船坞百年 · 展览图录</span></p>
    </div>
    <div class="m-pg m-r">
      <div class="m-arch"><i class="m-crane"></i><i class="m-hook"></i><i class="m-cabin"></i><i class="m-hull"></i>
        <i class="m-man" style="left:58px"></i><i class="m-man" style="left:70px"></i><i class="m-man" style="left:128px"></i><i class="m-rail"></i><i class="m-stack"></i><i class="m-man m-big" style="left:44px;bottom:34px"></i></div>
      <div class="m-inset"><i class="m-bust" style="left:8px"></i><i class="m-bust" style="left:26px;bottom:-4px"></i><i class="m-bust" style="left:44px"></i></div>
      <p class="m-cap"><span>图 12　1958 年，二号船台下水前夜</span><span>江城船厂档案室藏</span></p>
    </div>
  </div>`], { center: true, min: 0.25 });
}
</script>
