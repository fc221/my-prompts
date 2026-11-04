---
zh: 奢华高定
en: Luxury couture
aka: 奢华 奢侈品 高端 高定 珠宝 腕表 luxury
order: 40
---

## 是什么

大片留白或暖黑底，高反差的细衬线大字、字距拉得很开的小号大写字母、几道香槟金细线，一屏只讲一件作品，克制到近乎安静。

## 适合

高级珠宝与腕表、高级定制服装、香水与顶级护肤、精品酒店和私人会所、豪华汽车与地产的品牌页。

## 不适合

要比价、筛选、凑单的商品列表，用「电商大促」或常规电商页；大众快消品；只要黑白加一张大产品图、不要品牌氛围的发布页，用「黑白极简」；作品图才是主角的展陈，用「白墙陈列」。

## 注意

奢华感来自减法：没有折扣角标、倒计时、“热卖”和弹窗，价格可以不标，换成“预约顾问”。高级不等于看不清，正文对比度照样达标，不靠极浅的灰字和极细的字重撑气质。

## 要点

- 配色：深色版用暖黑 #0e0d0c 底、象牙 #f3efe6 字（16.9:1）、次要 #a8a39a（7.7:1），香槟金 #c8a96a 只画细线和小标签；浅色版用象牙白 #f7f4ee 底、墨 #1a1816 字，金色加深到 #7d6233（5.2:1）；全页最多这 3–4 个颜色
- 字体：标题用 Didone 类高对比衬线，开源可用 Bodoni Moda 或 Playfair Display，后备 Didot、"Bodoni 72"、"Times New Roman"、serif，300–400 字重、48–120px；小标签全大写 11–12px、字距 0.3em；中文用思源宋体 300–500、字距 0.1–0.2em；正文 15–16px / 1.8
- 留白：内容宽度不超过画面 40%，四周留白 ≥ 10vw；一屏只放一件作品和一句话；导航只留品牌名、3–4 个入口和“预约”
- 线与形：圆角 0，不用阴影和渐变按钮；分隔用 0.5–1px 金线，长 24–48px，不拉满；作品图满版或大幅居中，统一调色，背景干净
- 行动按钮：做成带 1px 下划线的文字链接，或透明底 1px 细边框按钮（高 48px、字距 0.2em）；悬停时下划线从左向右展开，400ms
- 行业约束：不出现折扣、满减、倒计时、库存紧张、“热卖”这类促销元素；价格可写“价格请咨询顾问”，主要转化是预约到店、私享鉴赏、联系顾问；会员和顾问信息放在次要位置
- 动效：慢而少，淡入 800–1000ms cubic-bezier(.16,1,.3,1)；作品图可做 8s 的 1 → 1.04 缓慢放大；不做弹跳、视差和自动轮播；减少动态效果时只保留淡入
- 窄屏：标题 clamp(40px, 12vw, 120px)，留白收到 24px，依旧一屏一件，作品图在上、文字在下

## 提示词

把{产品}的{页面}做成奢华高定基调：深色版用暖黑 #0e0d0c 底、象牙 #f3efe6 字、次要 #a8a39a，香槟金 #c8a96a 只画 1px 细线和小标签（浅色版用象牙白 #f7f4ee 底、墨 #1a1816 字、金色加深到 #7d6233），全页不超过 4 个颜色；标题用 Bodoni Moda 或 Playfair Display（后备 Didot、Bodoni 72、serif）300–400、clamp(48px, 8vw, 120px)，小标签全大写 12px、字距 0.3em，中文用思源宋体、字距 0.15em，正文 16px / 1.8；内容宽度不超过 40%，四周留白 ≥ 10vw，一屏只放一件作品和一句话；圆角 0，无阴影、无渐变按钮，分隔用 32px 长的金线；主要操作是“预约私享鉴赏”文字链接，1px 下划线悬停时从左展开 400ms；不出现折扣、倒计时、库存紧张和弹窗，价格写“请咨询顾问”；淡入 900ms cubic-bezier(.16,1,.3,1)，作品图 8s 缓慢放大到 1.04，不做轮播和视差，减少动态效果时只留淡入；窄屏留白收到 24px，作品图在上、文字在下。

## 示例

<style>
:host{container-type:size}
.s{--dd:"Bodoni Moda","Playfair Display",Didot,"Bodoni 72","Times New Roman",serif;--cap:Optima,"Avenir Next","Gill Sans",system-ui,sans-serif;height:100%;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.9fr);align-items:center;gap:12px;padding:16px 28px;overflow:hidden;background:radial-gradient(42% 70% at 74% 46%,rgba(243,239,230,.1),transparent 70%),#0e0d0c;color:#f3efe6;font:12px/1.8 system-ui,"PingFang SC",sans-serif}
.tx{min-width:0;animation:fade .9s cubic-bezier(.16,1,.3,1) both}
small{display:block;color:#c8a96a;font:500 10px/1.4 var(--cap);letter-spacing:.32em;text-transform:uppercase}
h1{margin:6px 0 2px;font:300 clamp(22px,min(7cqw,24cqh),92px)/1 var(--dd);letter-spacing:.02em}
.zh{margin:0;color:#a8a39a;font:400 12px/1.6 "Noto Serif SC","Songti SC",STSong,serif;letter-spacing:.2em;white-space:nowrap}
hr{width:32px;margin:12px 0;border:0;border-top:1px solid #c8a96a}
a{position:relative;display:inline-block;color:#f3efe6;font:400 12px/1.6 "Noto Serif SC","Songti SC",serif;letter-spacing:.2em;text-decoration:none}
a::after{content:"";position:absolute;left:0;right:.2em;bottom:-3px;height:1px;background:#c8a96a;transform:scaleX(.35);transform-origin:0 50%;transition:transform .4s cubic-bezier(.16,1,.3,1)}
a:hover::after{transform:none}
a:focus-visible{outline:1px solid #c8a96a;outline-offset:6px}
.pr{display:none;margin:10px 0 0;color:#a8a39a;font-size:12px;letter-spacing:.1em}
.art{position:relative;justify-self:center;width:min(100%,66cqh);aspect-ratio:1;display:grid;place-items:center;animation:slow 8s ease-in-out infinite alternate}
.art::before{content:"";position:absolute;left:14%;right:14%;bottom:16%;height:12%;border-radius:50%;background:radial-gradient(closest-side,rgba(0,0,0,.8),transparent)}
.ring{position:absolute;left:18%;right:18%;top:36%;aspect-ratio:1;border-radius:50%;background:conic-gradient(from 210deg,#f4e2ad,#9a783a,#f7ebc4,#83652c,#e8cd8a,#f4e2ad);-webkit-mask:radial-gradient(farthest-side,transparent 84%,#000 85%);mask:radial-gradient(farthest-side,transparent 84%,#000 85%);transform:rotateX(66deg)}
.gem{position:absolute;left:50%;top:34%;width:17%;aspect-ratio:1;background:conic-gradient(from 45deg,#ffffff,#c9d4dc,#f6f9fb,#9fb0bd,#ffffff);transform:translateX(-50%) rotate(45deg);box-shadow:0 0 18px rgba(243,239,230,.35)}
.gem::after{content:"";position:absolute;inset:22%;background:linear-gradient(135deg,rgba(255,255,255,.9),rgba(160,176,189,.4))}
@keyframes fade{from{opacity:0}}
@keyframes slow{to{transform:scale(1.04)}}
@container (max-width:300px){.s{padding-inline:22px;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr)}
h1{font-size:min(7.5cqw,20cqh)}
small{letter-spacing:.26em}
}
@container (min-height:260px){.s{padding:32px 64px;gap:32px}
small{font-size:11px}
.zh{font-size:14px}
hr{margin:18px 0}
a{font-size:14px}
.pr{display:block}
}
@media (prefers-reduced-motion:reduce){.art{animation:none}
a::after{transition:none}
}
</style>

<div class="s">
  <div class="tx">
    <small>Haute Joaillerie</small>
    <h1>MyPrompts</h1>
    <p class="zh">高级珠宝</p>
    <hr>
    <a href="#">预约私享鉴赏</a>
    <p class="pr">价格请咨询顾问 · 上海 / 北京 / 成都</p>
  </div>
  <div class="art" role="img" aria-label="微光系列单钻戒指"><i class="ring"></i><i class="gem"></i></div>
</div>
