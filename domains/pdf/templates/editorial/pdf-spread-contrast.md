---
zh: 明暗对开画册
en: Dark-light spread
aka: 产品画册 品牌画册 跨页 对页 高级感画册
order: 10
---

## 是什么

翻开是一组左右对页，左暗右亮：左页是满版的深色产品图，上面压一行反白的大标题；右页留白，只放一张小图、产品名、几行说明和价格。读者先被暗页的气氛抓住，再到亮页上看清信息。

## 适合

家居器物、香氛、茶酒、首饰这类靠质感卖的产品画册；品牌手册里每个系列的开篇页；门店的季度新品册。

## 不适合

参数多、要横向比较型号时，改用「产品参数画册」；以文字和数据为主的经营材料看「数据报告」。

## 注意

标题压在照片上时，文字下面那块要够暗、够平，不够时加一层 40%–60% 的深色渐变，标题不要压在产品主体上。PDF 阅读器默认一页一页显示，跨页设计要在文档里设成双页视图、封面单独，左右页才会拼在一起看。

## 要点

- 页面：两张 A4 竖版组成 420×297mm 的跨页；满版图四周出血 3mm，靠中缝两侧各 10mm 不放文字和产品主体。
- 左页：暖黑满版图（底色接近 #1c1b19，不用纯黑），产品放在下半部；标题放在上 1/3，粗体无衬线 36–48pt，反白，行距 1.0–1.1，最多 3 行。
- 右页：米白底（如 #f5f3ef），版心 6 栏网格；上部小一号标题 20–24pt，中部一张占 4 栏的主图，旁边 2 栏放说明 8.5–9.5pt、产品编号和价格。
- 配色只用黑、灰、米白加产品本身的颜色，不加装饰色；价格这类数字用同一字体的粗体，不换颜色。
- 字体：标题思源黑体 Heavy 或同类粗体无衬线，正文常规体；整份画册字号不超过 4 级（标题、副标题、正文、注释）。
- 左右两页的上边线、正文首行对齐同一条水平线，跨页看起来是一个整体。
- 每个系列重复同一结构，只换图和文字；连续的暗页之间插一组全亮的细节页，免得整本太闷。
- 整套页面：封面（暖黑满版图、品牌名、季度）→ 目录（米白底，系列名和页码）→ 每个系列一组明暗对开 → 细节页（全亮，3–4 张局部图）→ 封底（暖黑，门店地址和联系方式）。封面、封底用暗页的暖黑，目录和细节页用亮页的米白，全本只有这两种底色。

## 提示词

为{品牌}的{产品系列}做一份明暗对开的画册 PDF，实现方式按{实现方式，如 HTML + 打印 CSS}：
1. 页面是两张 A4 竖版组成的跨页，满版图出血 3mm，中缝两侧 10mm 不放文字和主体；文档设成双页视图、封面单独。
2. 左页：暖黑满版产品图，产品在下半部；上 1/3 放 2–3 行反白粗体标题（36–48pt，行距 1.0–1.1），文字下方不够暗就加深色渐变。
3. 右页：米白底、6 栏网格；小标题 20–24pt，一张占 4 栏的主图，2 栏放说明、编号和价格（8.5–9.5pt）。
4. 只用黑、灰、米白和产品本色；字号最多 4 级；左右页上边线和正文首行对齐。
5. 每个系列重复这一结构，{系列数} 个系列之间插一组亮色细节页。
6. 整套页面：封面、目录、系列对开页、细节页、封底各给一个示例页，全本只用暖黑和米白两种底色；先定好颜色、字体、间距的样式变量，所有页面共用。
交付时在阅读器里用双页视图截图，确认左右页拼合正确、整本前后一致。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.mock{background:radial-gradient(120% 90% at 30% 20%,#3a3a3c,#1d1d1f 70%)}
.mock .dg-row{justify-content:center}
.mock .dg-col{flex:none}
.m-set{display:flex;gap:18px;align-items:flex-start}
.m-set figure{margin:0;display:grid;gap:6px;justify-items:center}
.m-set figcaption{color:#a8a29a;font:500 8px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.1em}
.m-cover{position:relative;width:210px;height:297px;overflow:hidden;box-shadow:0 18px 40px -12px rgba(0,0,0,.7);background:radial-gradient(60% 40% at 50% 78%,#4a4743,transparent 70%),linear-gradient(#1c1b19,#262421)}
.m-cover b{position:absolute;left:0;right:0;top:44px;text-align:center;color:#f5f3ef;font:900 25px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.06em;text-indent:.06em}
.m-cover small{position:absolute;left:0;right:0;top:92px;text-align:center;color:#a8a29a;font:500 6.5px/1.6 system-ui,sans-serif;letter-spacing:.24em}
.m-cover .m-vase{left:78px;width:54px;height:96px}
.m-cover .m-foot{position:absolute;left:0;right:0;bottom:16px;text-align:center;color:#8a847a;font:500 5.5px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.2em}
.m-sp{display:flex;width:420px;height:297px;box-shadow:0 18px 40px -12px rgba(0,0,0,.7)}
.m-pg{position:relative;width:210px;height:297px;overflow:hidden}
.m-dark{background:radial-gradient(70% 45% at 40% 80%,#4a4743,transparent 70%),linear-gradient(#1c1b19,#2a2825)}
.m-dark::after{content:"";position:absolute;inset:0 0 0 auto;width:18px;background:linear-gradient(90deg,transparent,rgba(0,0,0,.35))}
.m-vase{position:absolute;bottom:0;border-radius:48% 48% 40% 40%/58% 58% 36% 36%;background:radial-gradient(60% 50% at 35% 30%,#d9d3c9,#8c857a 70%,#5b564f)}
.m-v1{left:30px;width:70px;height:120px}
.m-v2{left:96px;width:52px;height:88px;opacity:.85}
.m-v3{left:140px;width:44px;height:150px;border-radius:40% 40% 30% 30%/30% 30% 20% 20%;opacity:.7}
.m-dark h1{position:absolute;left:20px;top:26px;margin:0;color:#f5f3ef;font:900 25px/1.02 system-ui,"PingFang SC",sans-serif;letter-spacing:.01em}
.m-dark small{position:absolute;left:20px;top:110px;color:#a8a29a;font:500 6.5px/1.5 system-ui,"PingFang SC",sans-serif;letter-spacing:.12em}
.m-lite{background:#f5f3ef;color:#1c1b19;padding:24px 20px 18px 24px;display:grid;grid-template-columns:repeat(6,1fr);grid-template-rows:auto auto 1fr auto;column-gap:6px;font-family:system-ui,"PingFang SC",sans-serif}
.m-lite::before{content:"";position:absolute;inset:0 auto 0 0;width:14px;background:linear-gradient(90deg,rgba(0,0,0,.12),transparent)}
.m-lite h2{grid-column:1/-1;margin:0;font:800 14px/1.15 system-ui,"PingFang SC",sans-serif}
.m-lite .m-en{grid-column:1/-1;margin:3px 0 12px;color:#8a847a;font:500 6px/1.4 system-ui,sans-serif;letter-spacing:.14em}
.m-photo{grid-column:1/5;height:118px;background:radial-gradient(40% 55% at 50% 62%,#e8e3da,#cfc8bd 60%,#bdb5a8)}
.m-photo::after{content:"";display:block;width:34%;height:62%;margin:22% auto 0;border-radius:46% 46% 40% 40%/56% 56% 38% 38%;background:radial-gradient(60% 50% at 35% 30%,#fbfaf7,#d8d1c6 70%)}
.m-side{grid-column:5/7;align-self:end;display:grid;gap:3px;font-size:5.6px;line-height:1.55;color:#5a554e}
.m-side b{color:#1c1b19;font-size:6.5px}
.m-price{grid-column:1/-1;display:flex;justify-content:space-between;align-items:baseline;padding-top:6px;border-top:.6px solid #1c1b19;font-size:6px;color:#5a554e}
.m-price b{color:#1c1b19;font:800 11px/1 system-ui,sans-serif}
</style>

<div class="dg mock"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, `<div class="m-set"><figure><div class="m-cover"><b>MyPrompts</b><small>STILL OBJECTS<br>2026 秋季新品册</small><i class="m-vase"></i><span class="m-foot">MyPrompts · 杭州 · 上海</span></div><figcaption>封面</figcaption></figure><figure><div class="m-sp">
    <div class="m-pg m-dark"><h1>MyPrompts<br>一室安静</h1><small>STILL OBJECTS · 2026 秋季</small><i class="m-vase m-v1"></i><i class="m-vase m-v2"></i><i class="m-vase m-v3"></i></div>
    <div class="m-pg m-lite"><h2>月白长颈瓶</h2><p class="m-en">MOON WHITE VASE · NO.07</p><div class="m-photo"></div>
      <div class="m-side"><b>手拉坯 · 哑光釉</b><span>高 26cm，口径 6cm。釉面带细小气孔，每一只略有不同。</span><span>适合单枝插花或空放。</span></div>
      <p class="m-price"><span>编号 SO-2607</span><b>¥ 680</b></p></div>
  </div><figcaption>系列对开页</figcaption></figure></div>`, { center: true, min: 0.25 });
}
</script>
