---
zh: 包豪斯
en: Bauhaus
aka: 包豪斯风 三原色 几何构成 现代主义海报 bauhaus
order: 70
---

## 是什么

红、黄、蓝三原色加黑白，只用圆、方、三角三种基本形拼出整张构图，配几何无衬线大字和横竖交错的排版，像一张功能主义海报。

## 适合

设计院校和展览、建筑与家具品牌、文化活动海报、作品集首页、课程封面和讲座报名页。

## 不适合

内容密集的后台；要柔和亲切的生活类产品，改用「温暖生活方式」；以文字排版和网格秩序为主、不放大图形的页面，用「瑞士网格」；想要很多俏皮的小图形散落一地，用「孟菲斯」。

## 注意

图形是构图本身，不是点缀：三种基本形要大，要压住网格线，占到画面的四到六成。只是像图标那样撒几个圆和三角，最后只剩配色像。

## 要点

- 配色：米白底 #f2efe8，近黑 #111 做文字和粗线；三原色红 #d1301f、黄 #f2b705、蓝 #1f4e9c 各占一大块；黄底配黑字，红底、蓝底配白字（5.1:1 和 8:1）；不加别的颜色，不用渐变
- 形状：只用圆、正方形、等边三角形，以及从它们切出来的半圆和四分之一圆；圆角 0（圆本身除外），无阴影、无纹理
- 构图：12 栏网格非对称排布，几何形占画面 40–60%，彼此相切或压叠；6–12px 的黑色粗线做分隔和支撑
- 字体：几何无衬线，开源可用 Jost，后备 Futura、"Century Gothic"、sans-serif；中文用思源黑体 Bold；标题字号至少是正文的 4 倍，英文全大写或全小写二选一
- 排版：可以把一行短标签旋转 90° 贴着边缘竖排，用 writing-mode 或 rotate(-90deg)；正文保持水平、左对齐
- 按钮：直角黑底白字，或一个正圆色块里放箭头；悬停时底色换成三原色之一，150ms
- 动效：几何形依次滑入、旋转 90° 落位，400ms cubic-bezier(.2,.8,.2,1)，相隔 80ms，只播一次；减少动态效果时直接显示终态
- 窄屏：改成上图形、下文字，图形区约占 40% 高，粗线保留

## 提示词

把{产品}的{页面}做成包豪斯风：米白 #f2efe8 底，近黑 #111 文字和 8px 粗线，三原色红 #d1301f、黄 #f2b705、蓝 #1f4e9c 各占一大块，黄底配黑字、红底蓝底配白字，不加别的颜色、不用渐变；图形只用圆、正方形、等边三角形及切出来的半圆和四分之一圆，圆角 0、无阴影无纹理；12 栏非对称网格，几何形占画面 40–60%，彼此相切或压叠；字体用 Jost（后备 Futura、Century Gothic、sans-serif），中文思源黑体 Bold，标题至少是正文的 4 倍，可以把一行短标签旋转 90° 贴边，正文水平左对齐；按钮直角黑底白字，悬停换成三原色之一；几何形依次滑入、旋转 90° 落位，400ms、相隔 80ms，只播一次，减少动态效果时直接显示；窄屏改成上图形、下文字。

## 示例

<style>
:host{container-type:size}
.s{--geo:Jost,Futura,"Century Gothic","Avenir Next",sans-serif;height:100%;display:grid;grid-template-columns:90cqh minmax(0,1fr);overflow:hidden;background:#f2efe8;color:#111;font:12px/1.5 var(--geo),"PingFang SC",sans-serif}
.cp{position:relative;overflow:hidden}
.cp i{position:absolute;animation:in .4s var(--d,0s) cubic-bezier(.2,.8,.2,1) both}
.sq{left:0;top:0;width:58cqh;height:58cqh;background:#1f4e9c;--f:translateX(-40%)}
.ci{left:34cqh;top:30cqh;width:50cqh;height:50cqh;border-radius:50%;background:#d1301f;--f:rotate(90deg) scale(.6);--d:.08s}
.tr{left:4cqh;bottom:0;width:44cqh;height:38cqh;background:#f2b705;clip-path:polygon(50% 0,100% 100%,0 100%);--f:translateY(40%);--d:.16s}
.qc{right:0;top:0;width:22cqh;height:22cqh;border-radius:0 0 0 100%;background:#111;--f:rotate(-90deg);transform-origin:100% 0;--d:.24s}
.bar{left:0;top:62cqh;width:100%;height:4cqh;background:#111;transform-origin:0 50%;--f:scaleX(0);--d:.32s}
.tx{display:grid;grid-template-columns:auto minmax(0,1fr);gap:10px;padding:14px 16px 14px 10px;border-left:8px solid #111}
.vt{margin:0;writing-mode:vertical-rl;transform:rotate(180deg);font:600 10px/1.4 var(--geo);letter-spacing:.3em;text-transform:uppercase}
.mn{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;min-width:0}
.mn small{font-weight:600;letter-spacing:.14em;text-transform:uppercase}
h1{margin:2px 0 6px;font:700 clamp(28px,19cqh,72px)/1 var(--geo),"Noto Sans SC","PingFang SC",sans-serif}
p{margin:0 0 10px;color:#3a3a3a}
.more{display:none}
a{display:inline-flex;align-items:center;gap:8px;height:30px;padding:0 14px;background:#111;color:#fff;font-weight:600;text-decoration:none;transition:background-color .15s}
a:hover{background:#d1301f}
a:focus-visible{outline:3px solid #1f4e9c;outline-offset:3px}
@keyframes in{from{transform:var(--f);opacity:0}}
@container (max-width:300px){.s{grid-template-columns:84cqh minmax(0,1fr)}
.tx{padding-right:12px;gap:8px}
}
@container (min-height:260px){.tx{padding:28px 36px 28px 18px;gap:24px}
.vt{font-size:12px}
.mn small{font-size:13px}
p{font-size:14px;margin-bottom:18px}
.more{display:block}
a{height:40px;padding:0 20px;font-size:15px}
}
@media (prefers-reduced-motion:reduce){.cp i{animation:none}
a{transition:none}
}
</style>

<div class="s">
  <div class="cp" aria-hidden="true"><i class="sq"></i><i class="ci"></i><i class="tr"></i><i class="qc"></i><i class="bar"></i></div>
  <div class="tx">
    <p class="vt" aria-hidden="true">Form · Color · Grid</p>
    <div class="mn">
      <small>公开课 04</small>
      <h1>形<br>与色</h1>
      <p>11.30 周六 14:00<span class="more">构成练习 · 线下 30 人</span></p>
      <a href="#">报名 →</a>
    </div>
  </div>
</div>
