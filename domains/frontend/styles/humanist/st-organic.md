---
zh: 自然有机
en: Organic natural
aka: 有机风 自然风 植物风 森系 blob organic
order: 40
---

## 是什么

不规则的卵石形色块、低饱和的苔绿和雾绿、一层细细的颗粒，主图像被装进一块会慢慢变形的石头里，整页安静、松弛。

## 适合

护肤与个护、有机食品和茶饮、瑜伽冥想、园艺花店、户外露营、可持续和环保品牌。

## 不适合

工具后台和数据密集的页面，改用「企业稳重」；要暖色、以人物和生活场景为主的本地生活页，用「温暖生活方式」；要浅木色和柔和几何的北欧家居感，用「北欧柔和」。

## 注意

有机感来自形状和颜色的不规整，不靠堆植物插画。不规则形状只给主图和一两块色块，按钮、输入框、列表仍然规整，用户才知道哪里能点。

## 要点

- 配色：雾绿底 #eef1e6，深苔绿正文 #2f3d2c（10:1），次要 #4f6343（5.7:1）；主色苔绿 #4f6b40 做按钮，配白字 6:1；姜黄 #c8962e 只做小面积点缀，不承载文字；不用纯白和纯黑
- 形状：主图和色块放进不规则 blob，用 SVG path 或 8 值 border-radius，如 62% 38% 46% 54% / 60% 44% 56% 40%；卡片圆角 24–32px，按钮胶囊；分区用波浪线或留白，少用直线
- 纹理：全页叠一层 SVG feTurbulence 颗粒，opacity .06–.1、mix-blend-mode: multiply、pointer-events: none；文字区域不再叠第二层纹理
- 字体：标题用柔和衬线，中文思源宋体 600，英文 Fraunces，后备 "Songti SC"、serif，32–56px / 1.25；正文系统黑体 16–17px / 1.8
- 装饰：叶片、卵石这类自然形状一屏最多 2 个，从画面边缘伸进来，不压在文字上；配图用自然光实拍，统一偏暖绿的色调
- 阴影：基本不用；需要浮起时用带绿调的 0 12px 30px rgba(47,61,44,.10)
- 动效：blob 用 border-radius 关键帧缓慢变形，12–20s ease-in-out 往返；叶片 ±3° 轻摆 6s；同时在动的不超过 2 个，减少动态效果时全部静止
- 窄屏：blob 缩小，退到标题后面当底图；正文区回到普通矩形，行长 18–24 个字

## 提示词

把{产品}的{页面}做成自然有机风：雾绿 #eef1e6 底，正文深苔绿 #2f3d2c、次要 #4f6343，主按钮苔绿 #4f6b40 配白字、胶囊形，姜黄 #c8962e 只做小面积点缀；主图放进不规则 blob（8 值 border-radius 或 SVG path），卡片圆角 28px，分区用波浪线或留白，按钮和表单保持规整；全页叠一层 feTurbulence 颗粒，透明度 0.08、不挡点击；标题思源宋体 600（英文 Fraunces，后备 Songti SC、serif），40px 左右、行高 1.25，正文 17px / 1.8；叶片、卵石装饰一屏最多 2 个，从边缘伸进来、不压字；阴影只用 0 12px 30px rgba(47,61,44,.10)；blob 16s 缓慢变形、叶片 ±3° 轻摆，同时动的不超过 2 个，减少动态效果时静止；窄屏 blob 退到标题后面，正文行长 18–24 字。

## 示例

<style>
:host{container-type:size}
.s{position:relative;height:100%;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);align-items:center;gap:16px;padding:14px 22px;overflow:hidden;background:radial-gradient(70% 90% at 100% 100%,#e2e8d6,transparent 70%),#eef1e6;color:#2f3d2c;font:12px/1.7 system-ui,"PingFang SC",sans-serif}
.gr{position:absolute;inset:0;width:100%;height:100%;opacity:.1;mix-blend-mode:multiply;pointer-events:none}
.bgb{position:absolute;left:-14%;top:-38%;width:62%;aspect-ratio:1;border-radius:58% 42% 38% 62%/52% 60% 40% 48%;background:#e0e8d2}
.tx{position:relative;min-width:0}
.wv{display:block;width:64px;height:8px;margin:6px 0 2px}
.wv path{fill:none;stroke:#5b7a4b;stroke-width:1.6;stroke-linecap:round}
small{color:#4f6343;letter-spacing:.12em}
h1{margin:2px 0 8px;font:600 clamp(20px,13cqh,44px)/1.25 "Noto Serif SC","Songti SC",STSong,serif}
.ds{display:none;margin:0 0 12px;color:#4f6343}
.buy{display:flex;align-items:center;gap:12px;white-space:nowrap}
.pr{font:600 16px/1 "Noto Serif SC","Songti SC",serif}
.pr span{display:none;margin-left:2px;color:#4f6343;font:12px/1 system-ui,"PingFang SC",sans-serif}
a{display:inline-flex;align-items:center;height:32px;padding:0 16px;border-radius:999px;background:#4f6b40;color:#fff;font-weight:600;text-decoration:none;transition:background-color .2s}
a:hover{background:#3f5833}
a:focus-visible{outline:2px solid #2f3d2c;outline-offset:3px}
.art{position:relative;justify-self:center;width:min(100%,80cqh);aspect-ratio:1}
.blob{position:absolute;inset:6%;display:grid;place-items:center;border-radius:62% 38% 46% 54%/60% 44% 56% 40%;background:linear-gradient(150deg,#d5e0c6,#9db58a 70%,#86a273);box-shadow:0 12px 30px rgba(47,61,44,.1);animation:morph 16s ease-in-out infinite alternate}
.bt{position:relative;width:30%;height:52%;margin-top:12%;border-radius:14px 14px 22px 22px/14px 14px 28px 28px;background:linear-gradient(90deg,#e6e0cb,#fbf9f1 42%,#e1dbc4)}
.bt::before{content:"";position:absolute;left:28%;right:28%;top:-16%;height:18%;border-radius:6px 6px 2px 2px;background:#4f6b40}
.bt::after{content:"";position:absolute;left:18%;right:18%;top:38%;height:22%;border-radius:40% 60% 50% 50%;background:#c8962e;opacity:.85}
.pb{position:absolute;right:2%;bottom:6%;width:22%;aspect-ratio:1.3;border-radius:58% 42% 50% 50%/62% 58% 42% 38%;background:#dcc28c}
.lf{position:absolute;left:-4%;top:2%;width:38%;transform:rotate(-18deg);transform-origin:20% 100%;animation:sway 6s ease-in-out infinite alternate}
.lf path:first-child{fill:#5f7f4c}
.lf path+path{fill:none;stroke:#d5e0c6;stroke-width:2;stroke-linecap:round}
.tg{display:none;gap:8px;margin-top:14px;padding:0;list-style:none;color:#4f6343}
.tg li{padding:2px 10px;border-radius:999px;background:rgba(255,255,255,.55)}
@keyframes morph{to{border-radius:42% 58% 60% 40%/46% 56% 44% 54%}}
@keyframes sway{to{transform:rotate(-12deg)}}
@container (max-width:300px){.s{padding-inline:18px;gap:10px}
.buy{gap:8px}
a{padding:0 12px}
}
@container (min-height:260px){.s{padding:28px 48px;gap:32px}
small{font-size:13px}
.ds{display:block;font-size:14px}
.pr{font-size:22px}
.pr span{display:inline;font-size:13px}
a{height:40px;padding:0 22px;font-size:14px}
.tg{display:flex}
}
@media (prefers-reduced-motion:reduce){.blob,.lf{animation:none}
}
</style>

<div class="s">
  <svg class="gr" aria-hidden="true"><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .18 0 0 0 0 .24 0 0 0 0 .17 0 0 0 1 0"/></filter><rect width="100%" height="100%" filter="url(#grain)"/></svg>
  <i class="bgb" aria-hidden="true"></i>
  <div class="tx">
    <small>山茶籽 · 植物洁面</small>
    <svg class="wv" viewBox="0 0 64 8" aria-hidden="true"><path d="M1 4C6 0 10 0 15 4S24 8 29 4 38 0 43 4 52 8 57 4 62 1 63 2"/></svg>
    <h1>像雨后的<br>一片叶子</h1>
    <p class="ds">冷压山茶籽油，pH 5.5，洗完不紧绷</p>
    <div class="buy"><span class="pr">¥128<span>/ 120ml</span></span><a href="#">加入购物袋</a></div>
    <ul class="tg"><li>无添加香精</li><li>可回收瓶身</li><li>江西产地</li></ul>
  </div>
  <div class="art" role="img" aria-label="山茶籽洁面乳">
    <div class="blob"><div class="bt"></div></div>
    <i class="pb"></i>
    <svg class="lf" viewBox="0 0 100 100" aria-hidden="true"><path d="M8 94C6 44 46 6 96 4C98 54 58 94 8 94Z"/><path d="M10 92C38 64 60 38 88 12"/></svg>
  </div>
</div>
