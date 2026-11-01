---
zh: 产品参数画册
en: Product spec spread
aka: 产品画册 产品彩页 参数页 卖点页 新品画册 产品目录
order: 20
---

## 是什么

一组讲清一款产品的对页：左页浅灰底，上面是主标题，下面 2/3 是一张大产品图，底边一排 4 个大号参数；右页上半是场景图配一列卖点，下半横排 3 张细节图。读者先看到产品，再用几个数字记住它强在哪，最后在细节里找到理由。

## 适合

家电、数码、小型器械、家居五金的新品画册和展会彩页；经销商招商册里每个型号的介绍页；官网产品页同步出一份可下载的 PDF。

## 不适合

靠质感和气氛卖、几乎不讲参数的产品，改用「明暗对开画册」；完整规格、安装和故障排除写进「产品手册」；多个型号横向比较做成参数表页，不要挤进这组对页。

## 注意

大号数字最多 4 个，挑用户真会比较的指标，和规格表、包装上的数值逐字核对，单位写全；其余参数放到规格页。主图里的产品和左下的数字都要离中缝 10mm 以上，装订后不被吃掉。

## 要点

- 页面：两张 A4 竖版组成 420×297mm 跨页，满版图出血 3mm；每页 6 栏，栏间距 4mm，外边距 15mm、内侧 18mm、上下 15mm。
- 左页：底色 #e9ebee；上 1/3 放 2 行主标题（思源黑体 Heavy 56–64pt，行距 1.05）和一行英文副标题（8pt，字距 0.15em，#6b727c）；下 2/3 是出血的产品图，产品高度约占图高的 70%，放在中线偏外侧。
- 参数行：贴着左页底边，4 等分，上方一条 0.5pt 线，项之间 0.3pt 竖线；数值 36–42pt 粗体，用唯一的点缀色 #f0601e；单位 9pt 黑色紧跟数值，说明 7pt 两行以内、#5b626b。
- 右页：底色 #f7f8fa；上半是占 4 栏的场景图，高约 125mm；旁边 2 栏放 4–5 条卖点，每条小标题 9pt 粗体加一句 7.5pt 说明，上下两端和场景图对齐。
- 细节行：右页下半一个小标题“细节”，3 张 1:1 方图各占 2 栏，图下一行编号加说明，编号 01、02、03 用点缀色。
- 图片：所有产品图同一机位、同一光向（左上 45°）、同一无缝背景；细节图裁到只剩一个部件，场景图里的产品不小于画面高度的 1/3。
- 配色和一致性：只用灰阶加一个点缀色，点缀色只给数值和编号，字号不超过 5 级；多个型号每组对页结构不变，同一指标放在同一位置，翻页就能对比。
- 整套页面：封面、目录、系列扉页、参数对页（本条，每个型号一组）、规格参数表页、封底。封面用同一张浅灰无缝背景放大产品图，型号里的数字是点缀色第一次出现；目录和规格表沿用 6 栏网格和思源黑体，系列扉页只放一张产品图和系列名，封底放品牌信息、服务电话和经销商盖章区。

## 提示词

为{品牌}的{产品名}做一整套产品参数画册 PDF，实现方式按{实现方式，如 HTML + 打印 CSS}：
1. 页面是两张 A4 竖版组成的 420×297mm 跨页，满版图出血 3mm；每页 6 栏、栏间距 4mm，外边距 15mm、内侧 18mm；文档设成双页视图、封面单独。
2. 左页 #e9ebee 底：上 1/3 放 2 行主标题（56–64pt 粗体）和一行英文副标题（8pt）；下 2/3 是出血的产品主图，产品离中缝 10mm 以上。
3. 左页底边一排 4 个参数：{参数清单，如 过滤效率 99.97%}；数值 36–42pt，用点缀色 {点缀色，如 #f0601e}，单位 9pt、说明 7pt，项之间细竖线。
4. 右页 #f7f8fa 底：上半是占 4 栏的场景图，旁边 2 栏放 4–5 条卖点（小标题 9pt 加一句 7.5pt）；下半横排 3 张 1:1 细节图，各带编号和一行说明。
5. 产品图同一机位、光向和背景；多个型号重复这一结构，同一指标放在同一位置。
6. 整套页面包括封面、目录、系列扉页、参数对页、规格参数表页和封底，每种页各给一个示例页；封面用同一浅灰背景放大产品图和型号，内页沿用 6 栏网格、思源黑体和点缀色规则。
交付时列出整套页面清单，逐条核对参数数值和单位与规格表一致，并用双页视图截图确认中缝附近没有文字和产品主体。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.mock{background:radial-gradient(120% 90% at 70% 10%,#4b4f55,#1d1f22 70%)}
.mock .dg-row{justify-content:center}
.mock .dg-col{flex:none}
.m-sp{display:flex;width:420px;height:297px;box-shadow:0 18px 40px -12px rgba(0,0,0,.7);color:#15181c;font-family:system-ui,"PingFang SC",sans-serif}
.m-pg{position:relative;width:210px;height:297px;overflow:hidden}
.m-l{background:#e9ebee}
.m-l::after{content:"";position:absolute;inset:0 0 0 auto;width:16px;background:linear-gradient(90deg,transparent,rgba(0,0,0,.14));z-index:2}
.m-kick{position:absolute;left:18px;top:18px;margin:0;color:#6b727c;font:600 5px/1 system-ui,sans-serif;letter-spacing:.16em}
.m-l h1{position:absolute;left:18px;top:30px;margin:0;font:900 21px/1.08 system-ui,"PingFang SC",sans-serif}
.m-en{position:absolute;left:18px;top:81px;margin:0;color:#6b727c;font:500 5.4px/1 system-ui,sans-serif;letter-spacing:.16em}
.m-shot{position:absolute;left:0;right:0;bottom:0;height:198px;background:radial-gradient(48% 42% at 50% 38%,#f6f7f9,transparent 72%),linear-gradient(#dfe3e8,#cfd4da 70%,#c3c8cf)}
.m-prod{position:absolute;left:72px;bottom:64px;width:66px;height:138px;border-radius:14px 14px 10px 10px;background:linear-gradient(90deg,#d3d7dc,#fbfbfc 28%,#fff 52%,#e6e8eb 82%,#cdd1d6);box-shadow:14px 8px 18px -8px rgba(40,46,54,.35)}
.m-prod::before{content:"";position:absolute;left:8px;right:8px;top:7px;height:10px;border-radius:5px;background:repeating-linear-gradient(90deg,#2b2f34 0 1.4px,#4b5058 1.4px 2.8px)}
.m-grille{position:absolute;left:9px;right:9px;bottom:10px;height:76px;border-radius:6px;background:repeating-linear-gradient(#e2e5e8 0 1px,#f7f8f9 1px 3px)}
.m-ring{position:absolute;left:25px;top:30px;width:16px;height:16px;border-radius:50%;background:radial-gradient(#2b2f34 52%,#f0601e 56% 68%,#2b2f34 72%)}
.m-floor{position:absolute;left:58px;bottom:56px;width:100px;height:14px;border-radius:50%;background:radial-gradient(rgba(40,46,54,.32),transparent 70%)}
.m-data{position:absolute;left:18px;right:18px;bottom:16px;display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;padding-top:7px;border-top:.6px solid rgba(21,24,28,.35)}
.m-data div{display:grid;gap:3px;padding-right:4px}
.m-data div+div{padding-left:6px;border-left:.5px solid rgba(21,24,28,.2)}
.m-data b{color:#f0601e;font:800 14px/1 system-ui,sans-serif;letter-spacing:-.02em;white-space:nowrap}
.m-data b small{margin-left:1px;color:#15181c;font-size:5.4px;font-weight:600;letter-spacing:0}
.m-data span{color:#5b626b;font-size:4.6px;line-height:1.35}
.m-r{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));grid-template-rows:auto auto auto 1fr auto;column-gap:5px;padding:18px 18px 14px 22px;background:#f7f8fa}
.m-r::before{content:"";position:absolute;inset:0 auto 0 0;width:14px;background:linear-gradient(90deg,rgba(0,0,0,.1),transparent)}
.m-head{grid-column:1/-1;display:flex;justify-content:space-between;padding-bottom:8px;color:#6b727c;font-size:5px;letter-spacing:.14em}
.m-hero{grid-column:1/5;position:relative;height:130px;overflow:hidden;background:linear-gradient(100deg,transparent 18%,rgba(255,250,240,.55) 19% 34%,transparent 35%),linear-gradient(#e8ddcf 0 70%,#b79d82 70%)}
.m-sofa{position:absolute;left:8px;bottom:18px;width:66px;height:30px;border-radius:7px 7px 3px 3px;background:linear-gradient(#8e9a95,#76837e)}
.m-sofa::before{content:"";position:absolute;left:-4px;right:-4px;bottom:-4px;height:14px;border-radius:5px;background:#6a7672}
.m-plant{position:absolute;left:82px;bottom:24px;width:14px;height:20px;border-radius:50% 50% 40% 40%;background:radial-gradient(circle at 40% 30%,#7fa071,#4c6b45)}
.m-mini{position:absolute;right:12px;bottom:20px;width:20px;height:44px;border-radius:5px 5px 3px 3px;background:linear-gradient(90deg,#dcdfe2,#fff 45%,#e4e6e9);box-shadow:5px 3px 6px -3px rgba(60,45,30,.4)}
.m-mini::before{content:"";position:absolute;left:3px;right:3px;top:3px;height:3px;border-radius:2px;background:#33373c}
.m-pts{grid-column:5/7;display:grid;align-content:space-between;height:130px}
.m-pts p{display:grid;gap:1.5px;color:#5b626b;font-size:4.6px;line-height:1.4}
.m-pts b{color:#15181c;font-size:6px}
.m-dt{grid-column:1/-1;padding:14px 0 6px;font:800 7.5px/1 system-ui,"PingFang SC",sans-serif}
.m-dt small{margin-left:5px;color:#6b727c;font-size:4.6px;font-weight:500;letter-spacing:.16em}
.m-th{grid-column:span 2;display:grid;gap:4px;align-content:start}
.m-th i{display:block;height:52px;border-radius:2px}
.m-th p{color:#5b626b;font-size:4.6px;line-height:1.4}
.m-th p b{margin-right:3px;color:#f0601e;font-size:5px}
.m-t1{background:repeating-radial-gradient(circle at 50% 50%,#2f3338 0 1.6px,#585e66 1.6px 3.2px);-webkit-mask:radial-gradient(circle at 50% 50%,#000 20px,transparent 20.5px);mask:radial-gradient(circle at 50% 50%,#000 20px,transparent 20.5px)}
.m-tw{background:radial-gradient(70% 70% at 50% 50%,#eef0f2,#d6dade)}
.m-t2{position:relative;overflow:hidden;background:linear-gradient(#e9ecef,#d5d9de)}
.m-t2::before{content:"";position:absolute;left:9px;top:8px;width:26px;height:40px;border-radius:2px;background:repeating-linear-gradient(90deg,#c9d2c8 0 1.5px,#aebaae 1.5px 3px)}
.m-t2::after{content:"";position:absolute;left:20px;top:5px;width:30px;height:46px;border-radius:4px;background:linear-gradient(90deg,#f1f2f4,#fff 40%,#e8eaed);box-shadow:-4px 3px 6px -2px rgba(40,46,54,.35);transform:rotate(-10deg)}
.m-t3{background:radial-gradient(circle at 50% 50%,#22262b 26%,#f0601e 28% 33%,rgba(240,96,30,.25) 36%,#2b2f34 44%)}
.m-foot{grid-column:1/-1;display:flex;justify-content:space-between;padding-top:6px;border-top:.5px solid #d3d7dc;color:#8a919a;font-size:4.4px;letter-spacing:.1em}
.m-cv{box-shadow:0 18px 40px -12px rgba(0,0,0,.7);color:#15181c;font-family:system-ui,"PingFang SC",sans-serif;background:radial-gradient(55% 40% at 50% 62%,#f6f7f9,transparent 72%),linear-gradient(#e4e7eb,#d2d7dd 74%,#c3c8cf)}
.m-cv .m-brand{position:absolute;left:18px;right:18px;top:18px;display:flex;justify-content:space-between;align-items:baseline;font:800 6px/1 system-ui,sans-serif;letter-spacing:.2em}
.m-cv .m-brand span:last-child{color:#6b727c;font-size:5px;font-weight:500}
.m-cv h2{position:absolute;left:15px;top:32px;margin:0;font:900 80px/1 system-ui,sans-serif;letter-spacing:-.05em}
.m-cv h2 em{color:#f0601e}
.m-cv .m-prod{left:72px;bottom:50px;transform:scale(1.12);transform-origin:50% 100%}
.m-cv .m-floor{left:55px;bottom:42px}
.m-cv .m-line{position:absolute;left:18px;right:18px;bottom:16px;display:flex;justify-content:space-between;align-items:end;padding-top:6px;border-top:.6px solid rgba(21,24,28,.35);color:#5b626b;font-size:5px;line-height:1.5}
.m-cv .m-line b{color:#15181c;font-size:7.5px}
</style>

<div class="dg mock"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, [`<div class="m-pg m-cv"><p class="m-brand"><span>MyPrompts</span><span>2026 产品画册</span></p><h2>A<em>7</em></h2><i class="m-floor"></i><div class="m-prod"><i class="m-ring"></i><i class="m-grille"></i></div><p class="m-line"><span><b>A7 空气净化器</b><br>全屋净化系列</span><span>MyPrompts</span></p></div>`, `<div class="m-sp">
    <div class="m-pg m-l">
      <p class="m-kick">MyPrompts A7 · 2026 新品</p>
      <h1>一呼一吸<br>都是新风</h1>
      <p class="m-en">MYPROMPTS A7 AIR PURIFIER</p>
      <div class="m-shot"><i class="m-floor"></i><div class="m-prod"><i class="m-ring"></i><i class="m-grille"></i></div></div>
      <div class="m-data">
        <div><b>99.97<small>%</small></b><span>0.3μm 颗粒<br>过滤效率</span></div>
        <div><b>720<small>m³/h</small></b><span>颗粒物<br>洁净空气量</span></div>
        <div><b>26<small>dB</small></b><span>睡眠档<br>运行噪声</span></div>
        <div><b>86<small>m²</small></b><span>推荐<br>适用面积</span></div>
      </div>
    </div>
    <div class="m-pg m-r">
      <p class="m-head"><span>02 产品亮点</span><span>A7</span></p>
      <div class="m-hero"><i class="m-sofa"></i><i class="m-plant"></i><i class="m-mini"></i></div>
      <div class="m-pts">
        <p><b>四层复合滤网</b>初效、H13、活性炭、除醛层一次装好</p>
        <p><b>环形静音风道</b>同风量下比上代低 4dB</p>
        <p><b>手机远程控制</b>离家前开机，到家空气已换好</p>
        <p><b>滤芯寿命提醒</b>按实际用量估算，不按天数</p>
        <p><b>童锁与倾倒断电</b>有小孩和宠物也放心</p>
      </div>
      <p class="m-dt">细节<small>DETAILS</small></p>
      <div class="m-th"><i class="m-tw"><i class="m-t1" style="height:100%"></i></i><p><b>01</b>顶部 360° 环形出风</p></div>
      <div class="m-th"><i class="m-t2"></i><p><b>02</b>磁吸前盖，单手换滤芯</p></div>
      <div class="m-th"><i class="m-t3"></i><p><b>03</b>空气质量指示环</p></div>
      <p class="m-foot"><span>MyPrompts · 2026 产品画册</span><span>07</span></p>
    </div>
  </div>`], { center: true, min: 0.25 });
}
</script>
