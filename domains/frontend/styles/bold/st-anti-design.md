---
zh: 反设计
en: Anti-design
aka: 反设计风 丑设计 野生网页 原始网页 anti design ugly raw web
order: 90
---

## 是什么

超大的衬线标题互相叠压、故意错位，配上蓝色下划线链接、Times 字体、默认复选框这类“没上过样式”的网页原始元素，黑白强对比，看上去像故意不守规矩。

## 适合

艺术院校毕业展、独立出版和唱片厂牌、设计工作室作品集、潮牌发售页、实验性的活动专题页。

## 不适合

电商下单、后台、表单流程和任何要用户快速办事的页面；想要粗黑框和硬投影的直白冲击力用「粗野主义」；想要剪纸、胶带的拼贴感用「剪贴拼贴」；只想要整齐的大字海报用「长体大标题」。

## 注意

乱只给标题和装饰：正文、链接和按钮保持水平、不被压住、一眼认得出能点。先按正常版式排好内容和阅读顺序（DOM 顺序就是读屏顺序），再用定位和变换把标题挪乱。

## 要点

- 配色：纯白 #ffffff 或纸灰 #f2f1ed 底，纯黑 #000000 字；链接用原始蓝 #0000ee（白底 9.4:1）；一个刺眼的强调色如 #ff2a00 只给超大标题（大字 3:1 起，正文不用）
- 字体：标题用系统衬线 "Times New Roman"、"Songti SC"、serif，400 常规字重，字号 15–25vw，撑满甚至挤出屏外；正文同样用衬线 16–18px / 1.5，标签用 ui-monospace 12px
- 叠压：两到三行标题用 0.8 行距和负边距互相压住 20–40%，可以一行实心、一行描边；叠压只发生在标题和装饰之间
- 错位：标题、日期、小字块故意不对齐，旋转 90° 的竖排条、挤出屏外的单词都可以；正文段落本身水平、左对齐，行长 ≤ 36 字
- 原始元素：蓝色下划线链接、默认复选框、1px 实线 hr、圆点列表、Times 字；不用圆角、阴影和渐变
- 底线不破：正文 ≥ 16px、对比度 ≥ 4.5:1（建议 7:1）；可点元素看得出能点（链接带下划线、按钮带 1–2px 黑框），点击区 ≥ 44×44px；悬停黑白反相，:focus-visible 3px 实线黑框，0ms 硬切
- 动效：几乎不动，最多一条硬切的跑马灯，或悬停时标题错开 4px；减少动态效果时全部静止
- 窄屏：标题改成 18–22vw，只叠两行；竖排条横过来放到顶部；正文单栏满宽

## 提示词

把{产品}的{页面}做成反设计风：纯白 #ffffff 底、纯黑字，链接用原始蓝 #0000ee 加下划线，只给超大标题一个强调色 #ff2a00；标题用系统衬线（Times New Roman、Songti SC）400 字重，字号 15–25vw，两到三行用 0.8 行距和负边距互相叠压 20–40%，一行实心一行描边，可以挤出屏外；日期、小字块和竖排条故意错位，但正文段落水平左对齐、衬线 17px / 1.5、行长不超过 36 字；保留蓝色下划线链接、默认复选框、1px hr、圆点列表这类原始元素，不用圆角、阴影和渐变；叠压只发生在标题和装饰之间，正文和按钮上不压任何东西；可点元素有下划线或黑框，点击区至少 44×44px，悬停黑白反相，:focus-visible 3px 黑框，硬切不做过渡；DOM 按正常阅读顺序写，视觉错位只用定位和变换；窄屏标题缩到 20vw、只叠两行，正文单栏；对比度至少 4.5:1。

## 示例

<style>
:host{container-type:size}
.s{position:relative;height:100%;overflow:hidden;background:#fff;color:#000;font:13px/1.4 "Times New Roman",Times,"Songti SC",serif}
.tag{position:absolute;left:12px;top:8px;margin:0;font:12px/1.2 ui-monospace,Menlo,monospace}
.hd{position:absolute;left:8px;top:22px;right:0;margin:0;font-weight:400;line-height:.8}
.hd span{display:block;white-space:nowrap}
.l1{font-size:min(34cqh,25cqw);letter-spacing:-.04em}
.l2{margin:-.36em 0 0 1.7em;color:#ff2a00;font-size:min(25cqh,18cqw);font-style:italic;mix-blend-mode:multiply}
hr{position:absolute;left:-6px;top:61%;width:58%;margin:0;border:0;border-top:1px solid #000}
.bd{position:absolute;left:12px;top:63%;width:min(186px,57%);margin:0;font-size:12px;line-height:1.45}
.bd mark{background:#ffff00;color:#000}
.ls{display:none}
.act{position:absolute;right:28px;top:55%;display:flex;flex-direction:column;align-items:flex-start;gap:4px}
.act a{display:inline-flex;align-items:center;min-height:30px;padding:0 4px;margin-left:-4px;color:#0000ee;font-size:16px;text-decoration:underline;text-underline-offset:3px;cursor:pointer}
.act a:hover{background:#0000ee;color:#fff}
.act a:focus-visible,.act input:focus-visible{outline:3px solid #000;outline-offset:2px}
.act label{display:flex;align-items:center;gap:4px;min-height:28px;cursor:pointer;font-size:12.5px}
.act input{margin:0;width:14px;height:14px;cursor:pointer}
.vt{position:absolute;right:0;top:0;bottom:0;margin:0;padding:8px 3px;border-left:1px solid #000;writing-mode:vertical-rl;font:11px/1 ui-monospace,Menlo,monospace;letter-spacing:.08em;background:#fff}
@container (max-width:310px){.act{right:24px}
.bd{width:50%}
}
@container (min-height:260px){.tag{left:20px;top:14px;font-size:13px}
.hd{left:14px;top:34px}
.l1{font-size:min(36cqh,20cqw)}
.l2{font-size:min(24cqh,14cqw)}
hr{top:63%;width:44%}
.bd{left:20px;top:66%;width:250px;font-size:16px;line-height:1.5}
.ls{display:block;position:absolute;left:300px;top:66%;margin:0;padding-left:18px;font-size:15px;line-height:1.5}
.act{right:48px;top:44%;gap:8px}
.act a{min-height:44px;font-size:20px}
.act label{min-height:44px;font-size:15px}
.vt{padding:14px 6px;font-size:12px}
}
</style>

<div class="s"><p class="tag">№14 / 美院毕业展</p><h1 class="hd" data-clip><span class="l1">未完成</span><span class="l2">Unfinished</span></h1><hr><p class="bd">112 件<mark>没做完</mark>的作品，<br>11.08—11.23，<br>老纺织厂 3 号仓。</p><ul class="ls"><li>绘画 38 件</li><li>装置 21 件</li><li>影像 53 件</li></ul><div class="act"><a href="#visit">预约入场 →</a><label><input type="checkbox">开展前提醒我</label></div><p class="vt">2026.11.08—11.23</p></div>

<script type="module">
export default function demo(root) {
  // 示例里不真的跳转
  root.querySelector('.act a').addEventListener('click', (e) => e.preventDefault());
}
</script>
