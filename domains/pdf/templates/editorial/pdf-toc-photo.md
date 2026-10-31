---
zh: 摄影集目录页
en: Photo book contents spread
aka: 目录页 作品集目录 画册目录 年度画册 摄影画册 contents
order: 40
---

## 是什么

摄影集开头的目录对页：左页上方是一粗一细两行大号标题，下方两栏大号页码，每个页码配一个章节名和作者；整组对页上散放 3–4 张大小不一的黑白照片，右页再放一小段前言和参与者名单。大片留白，只用黑白灰，读者翻到这里先放慢下来。

## 适合

摄影集、多人联展画册、设计或建筑作品集、学校毕业作品集、企业年度画册的目录；章节在 6–12 个之间、每章有一张代表图的书。

## 不适合

层级多、条目上百的说明书和报告目录，按「目录、书签与链接」做成多级目录；彩色产品画册的目录跟着画册本身的色调走，不用这套黑白；只有两三章的小册子不必单独做目录对页。

## 注意

目录页码必须和成书一致：页码从最终排好的文档里取，不要手填，并给每一项加跳转链接。照片少而散才显得讲究，3–4 张就够，每张都对齐网格的某条线，否则“散”会变成“乱”。

## 要点

- 页面：两张 A4 竖版组成 420×297mm 跨页，四周边距 20mm，每页 6 栏、栏间距 5mm；照片不出血，全部落在版心里。
- 标题：左页左上，两行同字号 64–72pt，第一行中文用思源黑体 Heavy，第二行英文用同一字体的 ExtraLight，行距 1.05。
- 页码列表：左页下部 2 栏，每项一行；页码 44–48pt ExtraLight，3 位补零、等宽数字；章节名 9pt Bold，作者 7pt #8a8a86 叠在章节名下面；每项下方一条 0.3pt 灰线，项间距 6–8mm。
- 照片：只用黑白，统一转灰度后调到黑位有细节、白位不过曝；尺寸分大（3–4 栏宽）、中（2 栏）、小（1 栏）三档，整组对页照片总面积不超过 30%。
- 摆放：每张照片至少一条边贴着网格线，彼此不对齐、不并排；左右页各留出一大块完全空白的区域。
- 右页：前言放在外侧 3 栏，9pt、行距 1.8、150 字以内；下面是参与者名单，7.5pt 三列，按出场顺序排。
- 配色：纸色 #f6f5f1，文字 #141414，次要文字 #8a8a86，整本不出现彩色；目录里的页码、章节名和成书逐项对应。
- 整套页面：封面、目录对页（本条）、章节扉页（左页大号页码加章节名，右页一张照片）、作品页（一页一到两张，图注统一放左下）、摄影师简介页、版权页和封底。封面改用黑底 #141414 反白，标题同样一粗一细，配一张偏离中心的黑白照片；内页统一纸色、6 栏网格和同一套字重，章节扉页的页码字体和目录一致。

## 提示词

为{作品集或画册名}做一整套摄影集 PDF，重点是目录对页，实现方式按{实现方式，如 HTML + 打印 CSS}：
1. 页面是两张 A4 竖版组成的 420×297mm 跨页，边距 20mm，每页 6 栏；文档设成双页视图、封面单独。
2. 左页左上两行同字号标题（64–72pt），中文一行用粗体、英文一行用 ExtraLight；左页下部两栏列出 {章节清单，含页码、章节名、作者}，页码 44–48pt 细体、3 位补零、等宽数字，章节名 9pt 粗体，作者 7pt 灰色，每项下方一条细线。
3. 整组对页散放 3–4 张黑白照片（来自 {照片目录}），分大、中、小三档尺寸，每张至少一边贴网格线，彼此不并排，照片总面积不超过 30%。
4. 右页外侧放 150 字以内的前言（9pt，行距 1.8）和三列参与者名单（7.5pt）。
5. 只用 #f6f5f1、#141414、#8a8a86 三种颜色；页码从排好的最终文档里取，每项加跳转到对应页的链接。
6. 整套页面包括封面、目录对页、章节扉页、作品页、摄影师简介页、版权页和封底，每种页各给一个示例页；封面用黑底反白、一粗一细的标题，内页沿用纸色和 6 栏网格。
交付时列出整套页面清单和目录里的每个页码和实际页码的对照，点几项链接确认跳转正确，并用双页视图截图。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.mock{background:radial-gradient(120% 100% at 50% 0%,#5a5a5c,#262628 70%)}
.mock .dg-row{justify-content:center}
.mock .dg-col{flex:none}
.m-sp{display:flex;width:420px;height:297px;box-shadow:0 18px 40px -12px rgba(0,0,0,.7);color:#141414;font-family:system-ui,"PingFang SC",sans-serif}
.m-pg{position:relative;width:210px;height:297px;overflow:hidden;background:#f6f5f1}
.m-pg:first-child::after{content:"";position:absolute;inset:0 0 0 auto;width:14px;background:linear-gradient(90deg,transparent,rgba(0,0,0,.08))}
.m-pg+.m-pg::before{content:"";position:absolute;inset:0 auto 0 0;width:12px;background:linear-gradient(90deg,rgba(0,0,0,.07),transparent)}
.m-t{position:absolute;left:20px;top:22px;margin:0;font:900 25px/1.08 system-ui,"PingFang SC",sans-serif;letter-spacing:.02em}
.m-t span{display:block;font-weight:200;letter-spacing:.06em}
.m-ph{position:absolute}
.m-fog{left:122px;top:82px;width:60px;height:66px;background:linear-gradient(#ececea,#bdbdbb 58%,#8e8e8c);overflow:hidden}
.m-fog::before{content:"";position:absolute;left:0;right:0;bottom:22px;height:30px;background:#6d6d6b;opacity:.55;clip-path:polygon(0 60%,10% 40%,18% 55%,26% 20%,34% 45%,44% 30%,52% 52%,62% 10%,70% 48%,80% 35%,90% 50%,100% 38%,100% 100%,0 100%)}
.m-fog::after{content:"";position:absolute;left:0;right:0;bottom:0;height:24px;background:linear-gradient(#5e5e5c,#3a3a39)}
.m-tiny{left:20px;top:108px;width:30px;height:22px;background:radial-gradient(circle at 70% 35%,#fdfdfd 3px,transparent 3.5px),linear-gradient(#2c2c2c,#555 70%,#1a1a1a)}
.m-toc{position:absolute;left:20px;right:20px;bottom:24px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:14px;row-gap:7px}
.m-toc div{display:grid;grid-template-columns:31px minmax(0,1fr);align-items:end;padding-bottom:4px;border-bottom:.4px solid #c9c8c3}
.m-toc b{font:200 16px/1 system-ui,sans-serif;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.m-toc span{display:grid;gap:1px;padding-bottom:1px;font-size:5.4px;font-weight:700;line-height:1.2}
.m-toc small{color:#8a8a86;font-size:4.4px;font-weight:400}
.m-folio{position:absolute;bottom:10px;color:#8a8a86;font-size:4.4px;letter-spacing:.14em}
.m-ferry{left:22px;top:30px;width:118px;height:76px;background:linear-gradient(#d6d6d4,#a9a9a7 52%,#2f2f2f 52.5%,#5a5a58 70%,#3c3c3b);overflow:hidden}
.m-ferry::before{content:"";position:absolute;left:46px;top:31px;width:34px;height:9px;background:#191919;clip-path:polygon(0 30%,100% 30%,88% 100%,8% 100%)}
.m-ferry::after{content:"";position:absolute;left:58px;top:24px;width:12px;height:7px;background:#191919}
.m-rain{right:20px;top:126px;width:38px;height:38px;overflow:hidden;background:repeating-linear-gradient(100deg,transparent 0 3px,rgba(255,255,255,.16) 3px 3.5px),linear-gradient(#9a9a98,#5c5c5b 70%,#3a3a39)}
.m-rain::before{content:"";position:absolute;left:8px;top:9px;width:22px;height:11px;border-radius:11px 11px 0 0;background:#151515}
.m-rain::after{content:"";position:absolute;left:16px;top:20px;width:6px;height:18px;border-radius:2px 2px 0 0;background:#232323}
.m-pre{position:absolute;left:84px;top:178px;width:104px}
.m-pre h2,.m-who h2{margin:0 0 5px;font:800 6px/1 system-ui,"PingFang SC",sans-serif}
.m-pre h2 small,.m-who h2 small{margin-left:4px;color:#8a8a86;font-size:4.4px;font-weight:400;letter-spacing:.14em}
.m-pre p{color:#3a3a38;font-size:4.7px;line-height:1.8;text-align:justify}
.m-who{position:absolute;left:84px;top:236px;width:104px}
.m-who ul{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:2px 6px;padding:0;list-style:none;color:#3a3a38;font-size:4.6px;line-height:1.5}
.m-cv{background:#141414;color:#f6f5f1;box-shadow:0 18px 40px -12px rgba(0,0,0,.7)}
.m-cv::before{content:"";position:absolute;inset:0 auto 0 0;width:8px;background:linear-gradient(90deg,rgba(255,255,255,.08),transparent)}
.m-roof{left:66px;top:40px;width:124px;height:92px;overflow:hidden;background:linear-gradient(#d4d4d2,#a2a2a0 58%,#777775)}
.m-roof::before{content:"";position:absolute;inset:34px 0 0;background:#262626;clip-path:polygon(0 40%,12% 22%,24% 40%,24% 30%,38% 12%,52% 30%,52% 44%,64% 26%,78% 44%,78% 34%,90% 18%,100% 30%,100% 100%,0 100%)}
.m-roof::after{content:"";position:absolute;left:8px;right:8px;bottom:8px;height:30px;background:repeating-linear-gradient(90deg,transparent 0 9px,rgba(255,255,255,.75) 9px 11px,transparent 11px 23px);-webkit-mask:repeating-linear-gradient(transparent 0 5px,#000 5px 7px,transparent 7px 13px);mask:repeating-linear-gradient(transparent 0 5px,#000 5px 7px,transparent 7px 13px)}
.m-cv h2{position:absolute;left:20px;bottom:50px;margin:0;font:900 28px/1.08 system-ui,"PingFang SC",sans-serif;letter-spacing:.02em}
.m-cv h2 span{display:block;font-weight:200;letter-spacing:.04em}
.m-cv .m-note{position:absolute;left:20px;right:20px;bottom:20px;display:flex;justify-content:space-between;color:#8a8a86;font-size:4.8px;letter-spacing:.14em}
</style>

<div class="dg mock"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, [`<div class="m-pg m-cv"><i class="m-ph m-roof"></i><h2>城市切片<span>CITY SLICES</span></h2><p class="m-note"><span>十二位摄影师的江城</span><span>2026</span></p></div>`, `<div class="m-sp">
    <div class="m-pg">
      <h1 class="m-t">目录<span>CONTENTS</span></h1>
      <i class="m-ph m-tiny"></i>
      <i class="m-ph m-fog"></i>
      <div class="m-toc">
        <div><b>006</b><span>晨雾<small>林知夏</small></span></div>
        <div><b>064</b><span>屋顶<small>沈默言</small></span></div>
        <div><b>018</b><span>菜市<small>陈屿</small></span></div>
        <div><b>080</b><span>雨季<small>宋一苇</small></span></div>
        <div><b>032</b><span>渡口<small>许南星</small></span></div>
        <div><b>096</b><span>旧城<small>唐晚</small></span></div>
        <div><b>048</b><span>夜班<small>周以安</small></span></div>
        <div><b>112</b><span>归途<small>陆遥</small></span></div>
      </div>
      <p class="m-folio" style="left:20px">002</p>
    </div>
    <div class="m-pg">
      <i class="m-ph m-ferry"></i>
      <i class="m-ph m-rain"></i>
      <div class="m-pre"><h2>前言<small>PREFACE</small></h2><p>这本集子收了十二位摄影师在一年里拍下的江城。没有统一的题目，只约定一件事：每人只交自家附近一公里以内的照片。排完才发现，大家拍的是同一座城市的不同时辰。</p></div>
      <div class="m-who"><h2>参与摄影师<small>PHOTOGRAPHERS</small></h2>
        <ul><li>林知夏</li><li>陈屿</li><li>许南星</li><li>周以安</li><li>沈默言</li><li>宋一苇</li><li>唐晚</li><li>陆遥</li><li>何川</li><li>顾青禾</li><li>苏念</li><li>江以宁</li></ul></div>
      <p class="m-folio" style="right:20px">003</p>
    </div>
  </div>`], { center: true, min: 0.25 });
}
</script>
