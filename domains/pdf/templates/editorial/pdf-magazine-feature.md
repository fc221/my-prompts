---
zh: 杂志专题跨页
en: Magazine feature spread
aka: 杂志内页 专题报道 特稿 品牌刊物 会员杂志 内刊 首字下沉
order: 60
---

## 是什么

杂志专题的开篇对页：左页上方是 2–3 行粗体大标题和一行导语，下方是三栏长正文，第一段首字下沉；右页上 2/3 是一张大图，下面并排一张小图和一段带强调标题的短文。左页让人读，右页让人停下来看。

## 适合

城市、旅行、生活方式杂志的专题；品牌会员刊、企业内刊、商场季刊里的探店和项目故事；年报里讲某个业务或某个地方的专题章节。

## 不适合

以一个人为主角的采访，改用「人物专访跨页」；介绍产品和参数用「产品参数画册」；几百字以内的短资讯，排单栏简讯，撑不起三栏。

## 注意

三栏的行很短，最容易出现段末只剩一个字、三栏底边高低不齐，排完要逐栏检查，靠改稿解决，不要拉字距硬撑。首字下沉要正好占 3 行，顶部和第一行齐平、底部和第三行基线齐平。

## 要点

- 页面：两张 A4 竖版组成 420×297mm 跨页；上边距 18mm、外侧 18mm、内侧 20mm、下边距 14mm；左页正文 3 栏，栏间距 5mm，每栏约 16–18 个字。
- 左页上方：栏目名 7pt 粗体、字距 0.16em、钴蓝 #2440c9，期号灰色放右侧；标题思源黑体 Heavy 64–72pt，最多 3 行，行距 1.1；导语 12–13pt，2 行以内；署名 7pt 灰色 #8b8a85。
- 正文：和标题区之间一条 0.75pt 黑线；思源宋体 Regular 9pt，行距 1.7，两端对齐；第一段首字下沉 3 行，用钴蓝；之后段首缩进 2 字；小标题 9.5pt 粗体无衬线、不缩进、不落在栏底。
- 右页：大图从顶边、外侧和中缝三边出血，高度约 198mm（页面的 2/3）；图注 7pt 白字压在图片底部较暗的地方。
- 右页下方：左边一张 4:5 小图，宽约 2 栏；右边依次是 7pt 灰色小标签、16–18pt 钴蓝粗体强调标题、9pt 宋体短文，80 字以内。
- 配色：纸色 #fbfaf6，文字 #111111，钴蓝只给栏目名、首字和强调标题；大图和小图选同一时段、色温相近的照片。
- 正文设 orphans 和 widows 为 2，三栏底边对齐；一组对页放不下时在栏末写“转第 N 页”，后续对页沿用三栏和页眉，首字下沉只出现在开篇。
- 整套页面：封面、目录、专题开篇跨页（本条）、专题续页（三栏正文加中图）、短讯栏目页、封底。封面用满版照片，刊名用思源黑体 Heavy 白字，钴蓝只给“专题”标签；目录和续页沿用页眉栏目名、页码样式和 3 栏网格，全刊照片保持同一季节的色调。

## 提示词

为{刊物名}的{专题名}做一整套杂志 PDF，重点是专题开篇跨页，实现方式按{实现方式，如 HTML + 打印 CSS}：
1. 页面是两张 A4 竖版组成的 420×297mm 跨页，上 18mm、外侧 18mm、内侧 20mm、下 14mm；文档设成双页视图、封面单独。
2. 左页上方：栏目名（7pt，钴蓝 #2440c9）和期号；2–3 行标题（思源黑体 Heavy 64–72pt，行距 1.1）；一行 12–13pt 导语和 7pt 署名。
3. 左页下方：一条 0.75pt 黑线后是三栏正文（思源宋体 9pt，行距 1.7，栏间距 5mm），第一段首字下沉 3 行、钴蓝，小标题 9.5pt 粗体；正文用 {正文稿件}。
4. 右页：上 2/3 是三边出血的大图，图注 7pt 白字；下方左边一张 4:5 小图，右边一个强调标题（16–18pt 钴蓝粗体）和 80 字以内的短文。
5. 钴蓝只用在栏目名、首字和强调标题；正文 orphans、widows 设为 2，放不下就续到下一组对页并注明转页。
6. 整套页面包括封面、目录、专题开篇跨页、专题续页、短讯栏目页和封底，每种页各给一个示例页；封面满版照片配白色刊名和钴蓝专题标签，内页沿用页眉和 3 栏网格。
交付时列出整套页面清单，用双页视图截图，并逐栏检查：没有段末孤字，三栏底边对齐，首字下沉正好占 3 行。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.mock{background:radial-gradient(120% 90% at 60% 10%,#3d4250,#17191f 72%)}
.mock .dg-row{justify-content:center}
.mock .dg-col{flex:none}
.m-sp{display:flex;width:420px;height:297px;box-shadow:0 18px 40px -12px rgba(0,0,0,.75);color:#111;font-family:system-ui,"PingFang SC",sans-serif}
.m-pg{position:relative;width:210px;height:297px;overflow:hidden;background:#fbfaf6}
.m-l{display:flex;flex-direction:column;padding:18px 20px 14px 18px}
.m-l::after{content:"";position:absolute;inset:0 0 0 auto;width:14px;background:linear-gradient(90deg,transparent,rgba(0,0,0,.09))}
.m-kick{display:flex;justify-content:space-between;font:700 5px/1 system-ui,sans-serif;letter-spacing:.16em}
.m-kick span:first-child{color:#2440c9}
.m-kick span:last-child{color:#8b8a85;font-weight:500}
.m-l h1{margin:12px 0 0;font:900 24px/1.1 system-ui,"PingFang SC",sans-serif;letter-spacing:-.01em}
.m-lede{margin-top:8px!important;color:#3b3a36;font:500 6.4px/1.55 system-ui,"PingFang SC",sans-serif}
.m-by{margin-top:5px!important;color:#8b8a85;font-size:4.6px;letter-spacing:.06em}
.m-body{margin-top:10px;padding-top:8px;border-top:.6px solid #111;column-count:3;column-gap:7px;color:#26251f;font:400 4.4px/1.72 "Songti SC","STSong",serif;text-align:justify}
.m-body p+p{text-indent:2em}
.m-body p:first-child::first-letter{float:left;margin:1px 2px 0 0;color:#2440c9;font:900 22px/.8 "Songti SC","STSong",serif}
.m-body h3{margin:4px 0 2px;font:800 5.2px/1.4 system-ui,"PingFang SC",sans-serif;break-after:avoid}
.m-folio{margin-top:auto!important;padding-top:6px;color:#8b8a85;font-size:4.4px;letter-spacing:.1em}
.m-r::before{content:"";position:absolute;inset:0 auto 0 0;z-index:2;width:12px;background:linear-gradient(90deg,rgba(0,0,0,.12),transparent)}
.m-big{position:absolute;left:0;top:0;right:0;height:198px;overflow:hidden;background:radial-gradient(40% 30% at 72% 58%,rgba(255,226,170,.9),transparent 70%),linear-gradient(#f6c48c,#ec9a6c 36%,#9a86ad 68%,#4c5683)}
.m-bld{position:absolute;left:0;right:0;bottom:30px;height:92px;background:#2b3048;clip-path:polygon(0 30%,14% 30%,14% 12%,22% 0,30% 12%,30% 34%,44% 34%,44% 20%,58% 20%,58% 8%,66% 8%,66% 26%,80% 26%,80% 14%,88% 4%,96% 14%,96% 30%,100% 30%,100% 100%,0 100%)}
.m-win{position:absolute;left:4px;right:4px;bottom:36px;height:58px;background:repeating-linear-gradient(90deg,transparent 0 6px,#ffd387 6px 10px,transparent 10px 18px,#4b5272 18px 22px,transparent 22px 29px,#ffc56e 29px 33px,transparent 33px 44px);-webkit-mask:repeating-linear-gradient(transparent 0 6px,#000 6px 13px,transparent 13px 20px);mask:repeating-linear-gradient(transparent 0 6px,#000 6px 13px,transparent 13px 20px);opacity:.9}
.m-road{position:absolute;left:0;right:0;bottom:0;height:30px;background:radial-gradient(30% 60% at 70% 0,rgba(255,210,140,.45),transparent 70%),linear-gradient(#232740,#15182a)}
.m-tree{position:absolute;left:-24px;top:-22px;width:100px;height:112px;background:radial-gradient(circle at 30px 43px,#1d2236 26px,transparent 26.5px),radial-gradient(circle at 58px 29px,#1d2236 22px,transparent 22.5px),radial-gradient(circle at 55px 62px,#1d2236 23px,transparent 23.5px),radial-gradient(circle at 22px 78px,#1d2236 19px,transparent 19.5px),radial-gradient(circle at 80px 50px,#1d2236 15px,transparent 15.5px),radial-gradient(circle at 40px 20px,#1d2236 18px,transparent 18.5px);opacity:.95}
.m-trunk{position:absolute;left:30px;top:70px;bottom:20px;width:4px;background:#1a1e30}
.m-lamp{position:absolute;left:150px;bottom:30px;width:1.6px;height:86px;background:#171a2b}
.m-lamp::before{content:"";position:absolute;left:-9px;top:-9px;width:20px;height:20px;border-radius:50%;background:radial-gradient(#fff1c9 18%,rgba(255,210,140,.5) 40%,transparent 70%)}
.m-bike{position:absolute;left:96px;bottom:14px;width:26px;height:12px;background:radial-gradient(circle at 5px 7px,transparent 3.2px,#0f1120 3.4px 4.6px,transparent 4.8px),radial-gradient(circle at 21px 7px,transparent 3.2px,#0f1120 3.4px 4.6px,transparent 4.8px)}
.m-bike::before{content:"";position:absolute;left:10px;top:-11px;width:6px;height:14px;border-radius:3px 3px 1px 1px;background:#0f1120}
.m-cap{position:absolute;left:22px;top:186px;z-index:3;color:rgba(255,255,255,.85);font-size:4.4px;letter-spacing:.06em}
.m-low{position:absolute;left:22px;right:18px;top:212px;display:grid;grid-template-columns:62px minmax(0,1fr);column-gap:10px}
.m-shop{height:68px;background:radial-gradient(circle at 50% 46%,#f4efe4 12px,#b98a52 12.5px 14.5px,transparent 15px),radial-gradient(70% 60% at 50% 40%,#8a5d36,#3a2516)}
.m-shop::before{content:"";display:block;width:1.2px;height:9px;margin:23px 0 0 30.4px;background:#2b1d12;transform-origin:50% 100%;transform:rotate(-40deg)}
.m-low h2{margin:0;color:#2440c9;font:900 9.6px/1.2 system-ui,"PingFang SC",sans-serif}
.m-low h2 small{display:block;margin-bottom:3px;color:#8b8a85;font-size:4.6px;font-weight:600;letter-spacing:.14em}
.m-low p{margin-top:5px!important;color:#26251f;font:400 4.6px/1.72 "Songti SC","STSong",serif;text-align:justify}
.m-r .m-folio{position:absolute;right:18px;bottom:14px}
.m-cv{color:#fff;box-shadow:0 18px 40px -12px rgba(0,0,0,.75);background:radial-gradient(18% 6% at 62% 54%,rgba(255,214,160,.85),transparent 70%),linear-gradient(#f4b780,#e88f63 34%,#c08a8c 51%,#4f64a0 51.5%,#3a4c86 72%,#2b3868)}
.m-bank{position:absolute;left:0;right:0;top:132px;height:22px;background:#2b3048;clip-path:polygon(0 50%,8% 50%,8% 20%,16% 0,24% 20%,24% 45%,40% 45%,40% 25%,52% 25%,52% 50%,64% 50%,64% 10%,72% 0,80% 10%,80% 40%,100% 40%,100% 100%,0 100%)}
.m-ripple{position:absolute;left:0;right:0;top:156px;height:60px;background:repeating-linear-gradient(transparent 0 5px,rgba(255,255,255,.12) 5px 6px)}
.m-steps{position:absolute;left:0;right:0;bottom:0;height:92px;background:repeating-linear-gradient(#a49c91 0 7px,#6a645d 7px 9px);clip-path:polygon(0 24%,58% 0,100% 34%,100% 100%,0 100%)}
.m-sit{position:absolute;left:120px;bottom:72px;width:7px;height:10px;border-radius:3px 3px 0 0;background:#1d2030}
.m-sit::before{content:"";position:absolute;left:1px;top:-5px;width:5px;height:5px;border-radius:50%;background:#1d2030}
.m-mast{position:absolute;left:14px;top:12px;margin:0;font:900 44px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:-.03em;text-shadow:0 1px 6px rgba(120,50,20,.25)}
.m-iss{position:absolute;left:16px;top:62px;font:600 5px/1 system-ui,sans-serif;letter-spacing:.16em}
.m-lines{position:absolute;left:16px;bottom:34px;width:130px;text-shadow:0 1px 4px rgba(10,15,40,.5)}
.m-lines em{display:inline-block;padding:2px 4px;background:#2440c9;font:800 5px/1 system-ui,sans-serif;letter-spacing:.1em;text-shadow:none}
.m-lines h3{margin:5px 0 3px;font:900 14px/1.15 system-ui,"PingFang SC",sans-serif}
.m-lines p{font-size:5px;opacity:.9}
.m-side{position:absolute;right:16px;top:84px;width:60px;text-align:right;font:800 6.4px/1.3 system-ui,"PingFang SC",sans-serif;text-shadow:0 1px 4px rgba(120,50,20,.35)}
.m-side small{display:block;font-size:4.6px;font-weight:500}
.m-bar{position:absolute;right:14px;bottom:14px;width:28px;height:17px;background:repeating-linear-gradient(90deg,#111 0 1px,#fff 1px 2px,#111 2px 4px,#fff 4px 5px),#fff;border:2px solid #fff;border-bottom-width:4px}
</style>

<div class="dg mock"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, [`<div class="m-pg m-cv"><i class="m-bank"></i><i class="m-ripple"></i><i class="m-steps"></i><i class="m-sit"></i>
      <h2 class="m-mast">江城周末</h2><p class="m-iss">NO.48 · 2026.11 · ¥25</p>
      <p class="m-side">早餐地图<small>12 家值得早起的铺子</small></p>
      <div class="m-lines"><em>专题 · 城市漫游</em><h3>在老城区<br>慢慢走完一个下午</h3><p>梧桐街到河埠头的 2.6 公里 · P48</p></div><i class="m-bar"></i></div>`, `<div class="m-sp">
    <div class="m-pg m-l">
      <p class="m-kick"><span>城市漫游 · CITY WALK</span><span>NO.48 · 2026.11</span></p>
      <h1>在老城区<br>慢慢走完<br>一个下午</h1>
      <p class="m-lede">从梧桐街到河埠头，全程 2.6 公里。我们找到了九家开了二十年以上的小店，和店主们聊了一下午。</p>
      <p class="m-by">文 / 何川　摄影 / 陈屿</p>
      <div class="m-body">
        <p>秋天的梧桐街，下午四点以后才热闹起来。放学的孩子在杂货铺门口挑汽水，理发店把椅子搬到人行道上，老板一边剪头一边和对面裁缝铺的阿姨聊天。这条街不到四百米，开了二十年以上的店有九家，最老的修表铺从 1987 年开到现在。</p>
        <h3>从杂货铺开始</h3>
        <p>我们从街口的杂货铺出发。店主姓顾，货架是她父亲亲手钉的，最上一层还摆着玻璃瓶装的橘子汽水。她说现在一天卖不出几瓶，留着是因为老街坊会专门来找。</p>
        <p>往前两百米是只做早点的面馆，门口黑板写着第二天的浇头，七点半之前基本卖完。</p>
        <p>再往南就是河埠头。石阶一直伸到水面，傍晚有人洗菜、钓鱼，也有来拍照的年轻人。修表铺就在埠头边上，门面只有一米多宽，玻璃柜里的零件按大小排得整整齐齐。</p>
        <p>走完全程用了三个多小时，比地图估计的多了一倍，大部分时间花在站着聊天上。</p>
      </div>
      <p class="m-folio">48　城市漫游</p>
    </div>
    <div class="m-pg m-r">
      <div class="m-big"><i class="m-trunk"></i><i class="m-tree"></i><i class="m-bld"></i><i class="m-win"></i><i class="m-lamp"></i><i class="m-road"></i><i class="m-bike"></i></div>
      <p class="m-cap">梧桐街 17 号，傍晚五点半</p>
      <div class="m-low"><i class="m-shop"></i>
        <div><h2><small>第 6 站</small>河埠头的修表铺</h2><p>林师傅今年六十八岁，修了四十年表。他只修机械表和石英表，换一块电池十五元。问他什么时候退休，他说等柜台里这批零件用完。</p></div>
      </div>
      <p class="m-folio">49</p>
    </div>
  </div>`], { center: true, min: 0.25 });
}
</script>
