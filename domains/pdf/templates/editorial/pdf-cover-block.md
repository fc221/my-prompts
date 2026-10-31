---
zh: 色块封面
en: Color-block cover
aka: 报告封面 年报封面 海报封面 品牌宣言 撞色封面 剪影封面 年报模板
order: 80
---

## 是什么

一套以红色块为母题的报告模板。封面是竖版单页：右侧一大块品牌红竖向矩形，一个深色剪影（动物、人物或产品）站在色块里，头部高出色块上沿“探”出来；左上三行小字宣言，中部一行粗体副标题，底部一行超大标题横跨色块边线，白底上的字是红色，压在色块上的字变成白色。内页沿用同一个色块位置、剪影和颜色互换的大字。

## 适合

年度报告、品牌宣言册、白皮书、活动手册；一套多册的系列刊物，每册换一个剪影。

## 不适合

要靠现场照片说服人的项目介绍、招商材料，改用「斜切封面」；以图片为主的产品画册用「明暗对开画册」或「产品参数画册」。

## 注意

大字的颜色分界线必须和色块边线严丝合缝：同一行字叠两层，一层红、一层白，按页面坐标裁剪，而不是把字拆成两段分别上色，否则换字体或改字后分界会错开。剪影要一眼认得出：角、耳朵、喙这类标志轮廓完整露出来，不被标题和色块边线切断。

## 要点

- 页面：A4 竖版 210×297mm，内页按 420×297mm 跨页设计；色块和剪影向外出血 3mm，版心边距 14mm（内页正文 16mm）。印刷版的大面积红色另给 CMYK 或专色值并打样，参考「打印颜色与出血」。
- 色块：左边线在页宽 40%（约 84mm），上边线在页高 26%（约 78mm），一直铺到右边和底边；纯色，不加渐变和纹理。
- 剪影：单色 #1b1a19，宽度占色块的 60%–80%，底部出血；头部和角、耳这类标志轮廓高出色块上沿 40–70mm，身体在色块里。素材用去底的 PNG 或 SVG 统一填色。
- 文字：左上品牌名 10pt 加三行宣言 9–10pt、行距 1.7；中部副标题思源黑体 Heavy 28–32pt，只占左侧白区一行；底部主标题思源黑体 Heavy，4 个字约 128pt 铺满 182mm 版心宽，基线距底边约 30mm，分界最好切在第二个字中间。
- 颜色互换：大字叠两层，下层品牌红，上层白色并用 clip-path 从色块边线处裁开；色块右上角一行白色期号（VOL.01）。
- 配色：暖白底 #f6f3ee、品牌红 #d6312a、剪影 #1b1a19，小字用 #3a3835 和 #8a857d；整套只用这几种颜色。
- 整套页面：封面、章节开篇页、正文页、封底。章节开篇页（跨页左页）色块位置和封面完全一样，上沿立一排深色山形或同主题小剪影，章节号 300pt 以上横跨色块边线、同样红白互换，左侧白区放章节名和一段导语；正文页（右页）上半是 13pt 粗体标题加两栏 9pt 正文，下 1/3 是一条通栏红带，放三个白色大号数字，右侧一个缩小的封面剪影从红带里探出来；页眉统一“刊名 · 年份”和页码；封底只留同位置的色块、品牌名和联系方式。
- 系列：每册只换剪影、主标题和宣言，色块位置、标题基线、字号、期号位置全部不动，几册并排像一套。

## 提示词

为{品牌 / 公司 / 个人}的{刊物名称}做一套色块版式的 PDF（封面 + 章节开篇页 + 正文页 + 封底），实现方式按{实现方式，如 HTML + 打印 CSS}：
1. A4 竖版，内页按跨页设计，出血 3mm；品牌色 {品牌色，如 #d6312a} 竖向矩形从页宽 40%、页高 26% 处铺到右边和底边，封面和章节开篇页用同一个位置。
2. 封面：{主体，如 鹿 / 人物 / 产品} 的去底剪影统一填成 #1b1a19，站在色块里、底部出血，头部高出色块上沿 40–70mm；左上品牌名和三行宣言，中部一行 28–32pt 副标题。
3. 封面底部一行 4 个字、约 128pt 的主标题横跨色块边线：同一行字叠两层，下层品牌色、上层白色，用 clip-path 按色块边线裁开。
4. 章节开篇页：色块上沿立一排深色小剪影，300pt 以上的章节号同样红白互换，白区放章节名和导语。正文页：标题加两栏正文，下 1/3 通栏红带放三个白色数字，一个缩小的剪影从红带探出。
5. 整套只用暖白 #f6f3ee、品牌色、#1b1a19 和两档灰；系列每册只换剪影、标题和宣言。
交付时导出带出血的印刷版和屏幕版，放大到 400% 检查所有红白分界线和色块边线是否对齐，并把封面和一组内页跨页并排截图。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.mock{background:radial-gradient(120% 90% at 30% 20%,#3a3a3c,#1d1d1f 70%)}
.mock .dg-row{justify-content:center}
.mock .dg-col{flex:none}
.m-set{display:flex;gap:18px}
.m-sp{display:flex;box-shadow:0 18px 40px -12px rgba(0,0,0,.7)}
.m-pg{position:relative;width:210px;height:297px;overflow:hidden;background:#f6f3ee;color:#3a3835;font-family:system-ui,"PingFang SC",sans-serif}
.m-set>.m-pg{box-shadow:0 18px 40px -12px rgba(0,0,0,.7)}
.m-pg p,.m-pg h2{margin:0}
.m-sp .m-pg:first-child::after{content:"";position:absolute;z-index:5;inset:0 0 0 auto;width:14px;background:linear-gradient(90deg,transparent,rgba(0,0,0,.14))}
.m-sp .m-pg+.m-pg::before{content:"";position:absolute;z-index:5;inset:0 auto 0 0;width:14px;background:linear-gradient(90deg,rgba(0,0,0,.12),transparent)}
.m-blk{position:absolute;left:84px;top:78px;right:0;bottom:0;background:#d6312a}
.m-fig{position:absolute;left:92px;top:0;width:110px;height:297px}
.m-fig *,.m-mt *{fill:#1b1a19}
.m-fig .m-st{fill:none;stroke:#1b1a19;stroke-width:3.4;stroke-linecap:round}
.m-logo{position:absolute;left:14px;top:15px;color:#1b1a19;font:800 7px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.2em}
.m-say{position:absolute;left:14px;top:36px;font:500 6px/1.75 system-ui,"PingFang SC",sans-serif;letter-spacing:.06em}
.m-sub{position:absolute;left:14px;top:146px;color:#1b1a19;font:900 15px/1.2 system-ui,"PingFang SC",sans-serif}
.m-sub small{display:block;margin-top:5px;color:#8a857d;font:600 5px/1.4 system-ui,sans-serif;letter-spacing:.1em}
.m-vol{position:absolute;right:12px;top:86px;color:#fff;font:800 6px/1 system-ui,sans-serif;letter-spacing:.18em}
.m-ttl{position:absolute;left:14px;bottom:26px;width:196px;height:48px}
.m-ttl b{position:absolute;inset:0;color:#d6312a;font:900 45px/48px system-ui,"PingFang SC",sans-serif;letter-spacing:-.01em;white-space:nowrap}
.m-ttl b+b{color:#fff;clip-path:inset(0 0 0 70px)}
.m-ttl.m-no{left:36px;bottom:18px;height:100px}
.m-ttl.m-no b+b{clip-path:inset(0 0 0 48px)}
.m-ttl.m-no b{font-size:112px;line-height:100px;letter-spacing:-.04em}
.m-foot{position:absolute;left:14px;bottom:12px;font:600 5px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.12em;color:#8a857d}
/* 内页 */
.m-mt{position:absolute;left:84px;top:22px;width:126px;height:56px}
.m-eye{position:absolute;left:14px;top:36px;color:#d6312a;font:800 5px/1 system-ui,sans-serif;letter-spacing:.2em}
.m-ch{position:absolute;left:14px;top:48px;color:#1b1a19;font:900 19px/1.15 system-ui,"PingFang SC",sans-serif}
.m-ch+p{position:absolute;left:14px;top:98px;width:62px;font:500 5px/1.75 system-ui,"PingFang SC",sans-serif}
.m-run{position:absolute;left:16px;right:16px;top:14px;display:flex;justify-content:space-between;color:#8a857d;font:600 4.6px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.12em}
.m-h2{position:absolute;left:16px;top:32px;width:150px;color:#1b1a19;font:900 13px/1.3 system-ui,"PingFang SC",sans-serif}
.m-cols{position:absolute;left:16px;right:16px;top:72px;columns:2;column-gap:10px;font:500 4.8px/1.8 system-ui,"PingFang SC",sans-serif;text-align:justify}
.m-cols p+p{margin-top:4px}
.m-band{position:absolute;left:0;right:0;top:188px;bottom:0;background:#d6312a}
.m-nums{position:absolute;left:16px;top:208px;display:flex;gap:12px;color:#fff}
.m-nums b{display:block;font:900 24px/1 system-ui,sans-serif;letter-spacing:-.02em}
.m-nums b small{margin-left:1px;font:800 7px/1 system-ui,"PingFang SC",sans-serif}
.m-nums span{display:block;margin-top:4px;font:600 5px/1.4 system-ui,"PingFang SC",sans-serif;opacity:.85}
.m-deer.m-fig{left:auto;right:6px;top:140px;width:40px;height:157px}
.m-pno{position:absolute;right:16px;bottom:12px;color:#fff;font:800 5px/1 system-ui,sans-serif;letter-spacing:.16em}
</style>

<div class="dg mock"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
const deer = `<path class="m-st" d="M44 56C40 40 32 26 22 10M36 37L20 32M29 24L14 17M56 56C60 40 68 26 78 10M64 37L80 32M71 24L86 17"/>
  <ellipse cx="31" cy="66" rx="12" ry="4.6" transform="rotate(-22 31 66)"/><ellipse cx="69" cy="66" rx="12" ry="4.6" transform="rotate(22 69 66)"/>
  <path d="M50 52C64 52 69 68 65 88C62 104 57 116 50 116C43 116 38 104 35 88C31 68 36 52 50 52Z"/>
  <path d="M39 104C38 120 37 136 33 156C16 172 6 222 2 297H108C104 222 92 172 67 156C63 136 62 120 61 104Z"/>`;
export default function demo(root) {
  draw(root, `<div class="m-set">
  <div class="m-pg">
    <i class="m-blk"></i><svg class="m-fig" viewBox="0 0 110 297">${deer}</svg>
    <p class="m-logo">MyPrompts</p>
    <p class="m-say">走更远的路<br>看更高的山<br>带更少的东西</p>
    <p class="m-sub">年度报告<small>ANNUAL REPORT</small></p>
    <p class="m-vol">VOL.01</p>
    <div class="m-ttl"><b>向野而生</b><b aria-hidden="true">向野而生</b></div>
    <p class="m-foot">MyPrompts · 2026.01</p>
  </div>
  <div class="m-sp">
    <div class="m-pg">
      <i class="m-blk"></i><svg class="m-mt" viewBox="0 0 126 56" preserveAspectRatio="none"><path d="M0 56L20 30L32 38L58 0L80 26L96 14L126 44V56Z"/></svg>
      <p class="m-logo">MyPrompts</p>
      <p class="m-eye">CHAPTER 01</p><h2 class="m-ch">走过<br>的山</h2>
      <p>这一年，我们带 1.2 万名会员走了 46 条线路，其中 11 条第一次对外开放。</p>
      <div class="m-ttl m-no"><b>01</b><b aria-hidden="true">01</b></div>
    </div>
    <div class="m-pg">
      <p class="m-run"><span>向野而生 · 2026 品牌年度报告</span><span>07</span></p>
      <h2 class="m-h2">全年 46 条线路，<br>九成会员第二年还会再来</h2>
      <div class="m-cols"><p>春季我们把徒步线路按体能分成四档，新会员第一次出行默认只开放前两档。报名页加了一道十题的自测，退团率从 8% 降到 3%。</p><p>夏季的重点是高海拔线路的安全：每支队伍配一名领队和一名随队医生，全程带卫星电话，出发前一晚统一检查装备。</p><p>秋冬两季线路减半，团队用这段时间复盘了全年 312 份会员反馈，下一年的新线路有一半来自会员的提议。</p></div>
      <i class="m-band"></i><svg class="m-fig m-deer" viewBox="0 0 110 297">${deer}</svg>
      <div class="m-nums"><div><b>46<small>条</small></b><span>年度线路</span></div><div><b>1.2<small>万</small></b><span>出行会员</span></div><div><b>92<small>%</small></b><span>次年复购</span></div></div>
      <p class="m-pno">MYPROMPTS · 2026</p>
    </div>
  </div></div>`, { center: true, min: 0.25 });
}
</script>
