---
zh: 去掉页面模板感
en: Looks templated
aka: 像模板 没个性
tab: 模板感
order: 32
of: p-fix-ai-feel
---

## 是什么

症状：换个品牌名照样能用，居中大标题、三张图标卡、灰色 Logo 墙。

## 要点

- 填品牌气质和记忆点，否则 AI 只会换一套模板。
- 适合官网、落地页、作品集这类展示型页面。
- 标题下挂满解释小字时，先用「删减界面说明文字」清一遍。
- 说不清平庸在哪时，先用「量得出的版面」量一遍，按数字改比例。
- 问题是“一看就是 AI 做的”而不是“像模板”时，用「去掉整页 AI 感」。

## 提示词

页面像模板，没有个性。请在不牺牲可读性的前提下做出辨识度：
1. 定方向：品牌气质 {3 个形容词}；记忆点 {一个整页反复出现的元素，如 品牌切角图形 / 原创插画 / 独特的数字排版}，至少出现在首屏、一个中间区块和收尾区。
2. 打破对称：两栏改成约 7:3 不等宽；同排卡片高度或起点错开 60–80px；不让每节都居中。
3. 去掉命中的套路：标题上方的英文小标签、无意义的 01 / 02 / 03 编号、一排三张彩色图标卡、“大数字 + 小标签”指标模板、灰色 Logo 墙配“深受信赖”。
4. 用真实内容替代装饰：产品截图、真实场景照片、具体数字和客户原话。
5. 字号对比：标题和正文字号比 ≥ 2.5 倍；可用一款有性格的标题字体，正文保持系统字体。
6. 遮名测试：遮住品牌名，页面仍能看出是{产品}；列出你做了哪些让它“不像别人”的决定。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{padding:8px;font-size:10px;line-height:14px}
.h1{font-size:13px;line-height:18px;font-weight:700}
/* 改前：英文小标签 + 居中大标题 + 三张编号图标卡 + 灰 Logo 墙，换个名字照样能用 */
.bad{text-align:center}
.eb{color:#7c3aed;font-size:8px;line-height:12px;letter-spacing:.12em;font-weight:600}
.sb{color:#5b616e;font-size:9px;line-height:12px}
.cs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;margin-top:8px}
.cs div{padding:5px 2px;border:1px solid #e3e6eb;border-radius:6px;font-size:9px;line-height:12px}
.cs i{display:block;width:14px;height:14px;margin:0 auto 3px;border-radius:50%;background:#60a5fa}
.cs div:nth-child(2) i{background:#f472b6}
.cs div:nth-child(3) i{background:#34d399}
.cs small{display:block;color:#8a909c;font-size:8px;line-height:10px}
.lg{display:flex;align-items:center;justify-content:center;gap:4px;margin-top:8px}
.lg i{display:block;width:18px;height:6px;border-radius:2px;background:#d5d9e0}
.lg span{margin-left:2px;color:#8a909c;font-size:8px;line-height:12px}
/* 改后：不等宽首屏放真实截图，切角图形在首屏、中段、收尾反复出现，卡片错开起点，用具体数字和客户原话 */
.hero{display:grid;grid-template-columns:1.6fr 1fr;gap:6px;align-items:start}
.hero .h1{font-size:12px;line-height:16px}
.sn{display:block;width:28px;height:4px;margin-bottom:5px;background:#3b5bdb;clip-path:polygon(0 0,calc(100% - 4px) 0,100% 100%,0 100%)}
.shot{height:44px;padding:5px;background:linear-gradient(160deg,#1e293b,#334155);clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%)}
.shot i{display:block;height:3px;margin-bottom:3px;border-radius:1px;background:rgba(255,255,255,.35)}
.shot i:nth-child(2){width:70%}
.shot i:nth-child(3){width:45%;background:#60a5fa}
.pc{margin:8px 0 0 14px;padding:6px;border:1px solid #e3e6eb}
.ph{height:22px;margin-bottom:4px;background:linear-gradient(135deg,#d6a26b,#8b5a2b);clip-path:polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,0 100%)}
.cap{font-size:9px;line-height:12px}
.cap b{font-weight:600}
.qt{display:flex;align-items:baseline;gap:5px;margin-top:8px;font-size:9px;line-height:12px}
.qt .sn{flex:none;width:8px;height:8px;margin:0;align-self:center}
.qt em{display:block;color:#5b616e;font-style:normal}
</style>

<div class="fx">
  <section class="fx-p"><h4>改前</h4><div class="fx-b"><div class="fx-z c bad"><div class="eb">SOLUTIONS</div><div class="h1">更智能的门店管理</div><div class="sb">一站式解决方案，助力增长</div><div class="cs"><div><i></i><small>01</small>高效</div><div><i></i><small>02</small>智能</div><div><i></i><small>03</small>安全</div></div><div class="lg"><i></i><i></i><i></i><span>深受信赖</span></div></div></div></section>
  <section class="fx-p ok"><h4>改后</h4><div class="fx-b"><div class="fx-z c good"><div class="hero"><div><i class="sn"></i><div class="h1">工单 3 天 → 3 小时</div></div><div class="shot"><i></i><i></i><i></i></div></div><div class="pc"><div class="ph"></div><div class="cap">西湖店收银台，每天 <b>3,200</b> 张工单</div></div><div class="qt"><i class="sn"></i><div>“排班不再靠猜。”<em>— 店长 陈序</em></div></div></div></div></section>
</div>
