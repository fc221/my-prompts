---
zh: 孔版印刷
en: Risograph
aka: 孔版 riso 叠印 套印 网点 独立出版 zine
order: 60
---

## 是什么

两三种专色平涂叠印，重叠的地方混出第三种颜色，套色微微错开，再撒一层网点和颗粒，像刚从孔版印刷机里出来的小海报。

## 适合

独立出版与书店、演出和艺术节海报、播客与唱片、设计工作室、文创周边、社区活动招贴。

## 不适合

要精确还原品牌色的企业官网，叠印和错位会让颜色漂；长文阅读和后台；想要粗黑框、硬投影的直白冲击感，用「粗野主义」；想要几何图形撞色更热闹，用「孟菲斯」。

## 注意

荧光专色本身对纸色的对比度不够（#ff48b0 只有 2.7:1），只能做形状和套印层，文字统一用最深的那一色。错位是整层一起偏，不是每个字往不同方向乱偏。

## 要点

- 配色：只用 2–3 种专色，荧光粉 #ff48b0、中蓝 #3255a4，可选亮黄 #ffe800；纸色底 #f2f0eb；文字和按钮只用中蓝（对底 6.2:1），荧光粉和亮黄只做形状、网点和套印层
- 叠印：两色重叠处用 mix-blend-mode: multiply 混出第三色（粉叠蓝出紫），不另调新颜色；不用渐变，深浅变化交给网点
- 套印错位：标题和主图下面复制一层另一种专色，整层偏移 2–4px；全页错位的方向和距离一致；复制层加 aria-hidden
- 网点与颗粒：中间调用 radial-gradient 圆点，间距 4–6px；颗粒用 SVG feTurbulence，opacity .15–.25、multiply，铺在最上层并设 pointer-events: none
- 字体：标题用超粗无衬线，英文可用 Archivo Black，中文思源黑体 Heavy 900，字距 -0.02em；日期、地点这类信息行用等宽 12–14px；正文 15–16px / 1.6
- 圆角 0，不用阴影；照片先转灰度，再 multiply 到专色上做成单色或双色调
- 动效：基本静态；悬停时套印层错位从 0 拉到 3px，150ms；减少动态效果时不位移
- 窄屏：错位缩到 2px，网点间距保持不变，大标题按 clamp 缩小，信息行拆成两行

## 提示词

把{产品}的{页面}做成孔版印刷风：纸色 #f2f0eb 底，只用 2–3 种专色，荧光粉 #ff48b0、中蓝 #3255a4，可选亮黄 #ffe800；文字和按钮只用中蓝，荧光粉只做形状、网点和套印层；色块重叠处用 mix-blend-mode: multiply 混出第三色，不用渐变；标题和主图下面复制一层另一种专色，整层偏移 3px，全页方向一致，复制层 aria-hidden；中间调用间距 5px 的 radial-gradient 网点，最上层铺 feTurbulence 颗粒（opacity 0.2、multiply、不挡点击）；标题用 Archivo Black 或思源黑体 900，日期地点用等宽 13px；圆角 0、无阴影，照片做成双色调；悬停时套印错位从 0 到 3px、150ms，减少动态效果时不动；窄屏错位缩到 2px，信息行拆两行。

## 示例

<style>
:host{container-type:size}
.s{position:relative;height:100%;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);align-items:center;gap:12px;padding:14px 20px;overflow:hidden;background:#f2f0eb;color:#3255a4;font:12px/1.5 ui-monospace,Menlo,monospace}
.gr{position:absolute;inset:0;width:100%;height:100%;opacity:.22;mix-blend-mode:multiply;pointer-events:none;z-index:2}
.tx{position:relative;min-width:0}
.tg{display:inline-block;padding:1px 6px;border:1.5px solid #3255a4;font-weight:700}
h1{position:relative;margin:6px 0 8px;font:900 clamp(28px,17cqh,76px)/.95 "Archivo Black","Noto Sans SC","PingFang SC",system-ui,sans-serif;letter-spacing:-.02em}
h1 span{display:block}
.mis{position:absolute;inset:0;color:#ff48b0;transform:translate(3px,3px);mix-blend-mode:multiply}
.top{position:relative}
.in{margin:0 0 10px}
.in b{display:block}
a{display:inline-flex;align-items:center;height:30px;padding:0 14px;background:#3255a4;box-shadow:0 0 0 #ff48b0;color:#f2f0eb;font:700 13px/1 system-ui,"PingFang SC",sans-serif;text-decoration:none;transition:box-shadow .15s}
a:hover{box-shadow:3px 3px 0 #ff48b0}
a:focus-visible{outline:2px solid #3255a4;outline-offset:3px}
.art{position:relative;justify-self:center;width:min(100%,82cqh);aspect-ratio:1}
.art i{position:absolute;border-radius:50%;mix-blend-mode:multiply}
.p{left:0;top:4%;width:64%;aspect-ratio:1;background:#ff48b0}
.h{right:0;bottom:0;width:66%;aspect-ratio:1;background:radial-gradient(circle,#3255a4 38%,transparent 41%) 0 0/6px 6px}
.m{right:16%;top:6%;width:30%;aspect-ratio:1;background:#3255a4}
.r{left:12%;bottom:6%;width:34%;aspect-ratio:1;border:3px solid #ff48b0;transform:translate(2px,2px)}
.more{display:none}
@container (max-width:300px){.s{gap:8px;padding-inline:16px}
.mis{transform:translate(2px,2px)}
}
@container (min-height:260px){.s{padding:26px 44px;gap:28px}
h1{font-size:clamp(28px,21cqh,76px)}
.tg{font-size:13px}
.in{font-size:14px;margin-bottom:16px}
.more{display:block}
a{height:38px;padding:0 20px;font-size:15px}
}
@media (prefers-reduced-motion:reduce){a{transition:none}
}
</style>

<div class="s">
  <svg class="gr" aria-hidden="true"><filter id="riso"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .2 0 0 0 0 .2 0 0 0 0 .3 0 0 0 1.4 -.3"/></filter><rect width="100%" height="100%" filter="url(#riso)"/></svg>
  <div class="tx">
    <span class="tg">VOL.07 · 现场</span>
    <h1><span class="top"><span>夜航</span><span>LIVE</span></span><span class="mis" aria-hidden="true"><span>夜航</span><span>LIVE</span></span></h1>
    <p class="in"><b>11.16 SAT 20:00</b><span class="more">江边 3 号仓库 · 独立乐队 4 组</span></p>
    <a href="#">购票 ¥120</a>
  </div>
  <div class="art" aria-hidden="true"><i class="p"></i><i class="h"></i><i class="m"></i><i class="r"></i></div>
</div>
