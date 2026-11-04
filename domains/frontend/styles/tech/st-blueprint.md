---
zh: 蓝图线稿
en: Blueprint
aka: 蓝图风 工程图 线稿 技术图纸 制图风 blueprint
order: 60
---

## 是什么

普鲁士蓝底铺满细网格，白色单线勾出产品结构，带尺寸线、箭头、引线编号和右下角的图框标题栏，像一张工程图纸。

## 适合

硬件和智能设备的产品详情、工业品与建材、建筑和室内方案展示、开源硬件项目、讲解原理和构造的科普页。

## 不适合

没有实物结构可画的软件和服务，改用「科技深色」；要大量读数和实时状态的监控屏，用「科幻大屏」；想要手作、松弛感的草图，用「手绘涂鸦」。

## 注意

图纸感来自制图规矩，不是蓝底本身：线宽分粗细两级、尺寸线两端有箭头和界线、标注数字带单位、虚线表示被遮住的轮廓。随手画的白线放在蓝底上只会像黑板报。

## 要点

- 配色：普鲁士蓝底 #1d4e89，往边缘压暗到 #174177；轮廓线和正文 #f4f8ff（对底 7.9:1），注释 #b8d0ee（5.3:1）；只留一个强调色淡黄 #ffd66b 标出当前讲解的部件
- 网格：两层 linear-gradient，细格 10px、rgba(255,255,255,.07)，粗格 50px、rgba(255,255,255,.16)；网格只铺在底上，不穿过文字块
- 线型：轮廓 2px，尺寸线和引线 1px，被遮挡的轮廓用 4px 4px 虚线，中心线用点划线；SVG 加 vector-effect: non-scaling-stroke，缩放后线宽不变
- 标注：尺寸写成 218 mm、Ø72 这样带单位的数字，两端箭头加 4px 界线；部件用圆圈编号 1、2、3 的引线指出，图例在侧边按编号列名称
- 字体：标注和标题栏用等宽，推荐 IBM Plex Mono，后备 ui-monospace、"SF Mono"、Menlo、monospace，11–13px、大写英文字距 0.1em；正文中文用系统无衬线 15px / 1.6
- 图框：画面外圈 1px 内框，右下角标题栏写图名、图号、比例、日期，像表格一样用 1px 线分格；圆角 0、无阴影
- 动效：线稿用 stroke-dashoffset 从 0 画出，一次 900ms ease-out，标注随后淡入；悬停部件编号时对应轮廓变淡黄；减少动态效果时直接显示完整线稿
- 窄屏：图纸在上、图例改成编号列表放下方，标题栏缩成一行小字；网格尺寸不变，线稿按 viewBox 等比缩放

## 提示词

把{产品}的{产品详情 / 结构介绍}做成蓝图线稿风：普鲁士蓝底 #1d4e89、边缘压暗到 #174177，铺两层网格（10px 细格 rgba(255,255,255,.07)，50px 粗格 .16）；用内联 SVG 画{产品}的侧视结构，轮廓 2px、尺寸线和引线 1px、遮挡轮廓 4px 虚线，颜色 #f4f8ff，加 vector-effect: non-scaling-stroke；标出 {关键尺寸}，带单位和两端箭头；部件用圆圈编号引线指出，侧边图例按编号写名称，当前讲解的部件用淡黄 #ffd66b；标注和标题栏用 IBM Plex Mono（后备 ui-monospace、Menlo）12px、大写字距 0.1em，右下角标题栏写图名、图号、比例、日期；圆角 0、无阴影；线稿 stroke-dashoffset 画出 900ms、标注随后淡入，悬停编号时对应部件变淡黄，减少动态效果时直接显示；窄屏图例改成下方编号列表。

## 示例

<style>
:host{container-type:size}
.s{position:relative;height:100%;display:flex;gap:10px;padding:14px 16px;background:linear-gradient(rgba(255,255,255,.16) 1px,transparent 1px) -1px -1px/50px 50px,linear-gradient(90deg,rgba(255,255,255,.16) 1px,transparent 1px) -1px -1px/50px 50px,linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px) -1px -1px/10px 10px,linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px) -1px -1px/10px 10px,radial-gradient(90% 90% at 40% 45%,#1d4e89 55%,#174177);color:#f4f8ff;font:11px/1.5 "IBM Plex Mono",ui-monospace,"SF Mono",Menlo,"PingFang SC",monospace}
.s::before{content:"";position:absolute;inset:6px;border:1px solid rgba(244,248,255,.5);pointer-events:none}
svg{flex:none;height:100%;width:auto;overflow:visible}
svg *{fill:none;stroke:#f4f8ff;vector-effect:non-scaling-stroke;transition:stroke .2s}
svg .o{vector-effect:none}
.o{stroke-width:2;stroke-dasharray:1;stroke-dashoffset:1;animation:dr .9s ease-out forwards}
.t{stroke-width:1}
.h{stroke-width:1;stroke-dasharray:4 4;stroke:#b8d0ee}
.c{stroke-width:1;stroke-dasharray:10 3 2 3;stroke:#b8d0ee}
.ar{fill:#f4f8ff;stroke:none}
svg text{fill:#f4f8ff;stroke:none;font:10px "IBM Plex Mono",ui-monospace,Menlo,monospace}
.fd{animation:fi .4s .7s both}
.s[data-on="1"] [data-p="1"],.s[data-on="2"] [data-p="2"],.s[data-on="3"] [data-p="3"]{stroke:#ffd66b}
.s[data-on="1"] text[data-p="1"],.s[data-on="2"] text[data-p="2"],.s[data-on="3"] text[data-p="3"]{fill:#ffd66b}
.side{position:relative;flex:1;min-width:0;display:flex;flex-direction:column}
.side b{font:600 14px/1.3 system-ui,"PingFang SC",sans-serif}
.side small{color:#b8d0ee;letter-spacing:.1em}
.ds{display:none;margin:12px 0 0;color:#b8d0ee;font:13px/1.6 system-ui,"PingFang SC",sans-serif}
ul{margin:8px 0 auto;padding:0;list-style:none;display:grid;gap:2px}
button{display:flex;gap:6px;align-items:center;width:100%;padding:1px 4px;border:0;background:none;color:#f4f8ff;font:inherit;text-align:left;cursor:pointer}
button i{display:inline-grid;place-items:center;width:15px;height:15px;border:1px solid currentColor;border-radius:50%;font:10px/1 inherit;font-style:normal}
button[aria-pressed=true]{color:#ffd66b}
button:hover{background:rgba(255,255,255,.08)}
button:focus-visible{outline:1px dashed #ffd66b;outline-offset:1px}
.tb{align-self:flex-start;display:grid;grid-template-columns:repeat(3,auto);border:1px solid rgba(244,248,255,.6);font-size:10px;line-height:1.3}
.tb span{padding:2px 5px;white-space:nowrap}
.tb span+span{border-left:1px solid rgba(244,248,255,.6)}
.tb em{display:block;font-style:normal;color:#b8d0ee;font-size:9px;letter-spacing:.1em}
@container (max-width:300px){.tb span{padding:2px 3px}
.tb{font-size:9px}
}
@keyframes dr{to{stroke-dashoffset:0}
}
@keyframes fi{from{opacity:0}
}
@container (min-height:260px){.s{padding:20px 28px;gap:24px;font-size:12px}
.side b{font-size:18px}
ul{gap:6px;margin-top:14px}
.tb{font-size:11px}
.ds{display:block}
.tb em{font-size:10px}
}
@media (prefers-reduced-motion:reduce){.o{animation:none;stroke-dashoffset:0}
.fd{animation:none}
}
</style>

<div class="s" data-on="1">
  <svg viewBox="0 0 136 182" role="img" aria-label="保温杯侧视结构图，高 218 mm，直径 72 mm">
    <path class="c" d="M60 4v160"/>
    <path class="o" data-p="3" pathLength="1" d="M41 12h38a3 3 0 0 1 3 3v17H38V15a3 3 0 0 1 3-3z"/>
    <path class="o" data-p="2" pathLength="1" d="M36 32h48v6H36z"/>
    <path class="o" pathLength="1" d="M36 38h48v110q0 10-10 10H46q-10 0-10-10z"/>
    <path class="h" data-p="1" d="M42 44v100q0 8 8 8h20q8 0 8-8V44"/>
    <g class="fd">
      <path class="t" d="M34 12H16M34 158H16M22 15v140"/><path class="ar" d="M22 12l-3 6h6zM22 158l-3-6h6z"/>
      <text x="12" y="90" transform="rotate(-90 12 90)" text-anchor="middle">218 mm</text>
      <path class="t" d="M36 160v10M84 160v10M39 166h42"/><path class="ar" d="M36 166l6-3v6zM84 166l-6-3v6z"/>
      <text x="60" y="179" text-anchor="middle">Ø72</text>
      <path class="t" data-p="3" d="M80 20l22-8h10"/><circle class="t" data-p="3" cx="118" cy="12" r="6"/><text data-p="3" x="118" y="15.5" text-anchor="middle">3</text>
      <path class="t" data-p="2" d="M84 35l18 6h10"/><circle class="t" data-p="2" cx="118" cy="41" r="6"/><text data-p="2" x="118" y="44.5" text-anchor="middle">2</text>
      <path class="t" data-p="1" d="M78 96l24-8h10"/><circle class="t" data-p="1" cx="118" cy="88" r="6"/><text data-p="1" x="118" y="91.5" text-anchor="middle">1</text>
    </g>
  </svg>
  <div class="side fd">
    <b>保温杯 T2</b><small>SECTION A-A</small><p class="ds">双层真空结构，保温 12 小时，杯盖可整体拆洗。</p>
    <ul>
      <li><button type="button" data-k="1" aria-pressed="true"><i>1</i>316 不锈钢内胆</button></li>
      <li><button type="button" data-k="2" aria-pressed="false"><i>2</i>硅胶密封圈</button></li>
      <li><button type="button" data-k="3" aria-pressed="false"><i>3</i>旋盖 · PP</button></li>
    </ul>
    <div class="tb"><span><em>图号</em>KB-T2-07</span><span><em>比例</em>1:2</span><span><em>日期</em>26.10</span></div>
  </div>
</div>

<script type="module">
export default function demo(root) {
  const s = root.querySelector('.s'), bs = [...root.querySelectorAll('button')];
  const pick = (b) => { s.dataset.on = b.dataset.k; bs.forEach((x) => x.setAttribute('aria-pressed', String(x === b))); };
  bs.forEach((b) => { b.onclick = () => pick(b); b.onmouseenter = () => pick(b); b.onfocus = () => pick(b); });
}
</script>
