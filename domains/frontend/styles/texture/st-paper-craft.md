---
zh: 纸艺手作
en: Paper craft
aka: 剪纸风 纸雕 层叠纸 立体纸艺 paper cut 手帐风
order: 60
---

## 是什么

画面由一层层剪好的彩纸叠出来：同一色系由浅到深的山、浪或云，每层下面一道短投影，再用半透明和纸胶带贴上一张微斜的便签卡，像摆在桌上的手作纸雕。

## 适合

文创与手帐品牌、旅行和户外内容、绘本与亲子阅读、节日活动页、手工课程报名，以及想要温柔立体感的空状态和引导页插图。

## 不适合

数据和表单为主的页面，改用「纯净文档风」或「企业稳重」；想要铅笔线、涂鸦笔触的随性感，用「手绘涂鸦」；照片、报刊字块和撞色混搭的拼贴海报，用「剪贴拼贴」。

## 注意

纸艺的立体感只靠“层与层之间的短投影”，投影要短、方向一致、颜色带一点底色的暖褐，长而灰的投影会把纸变成塑料。层数控制在 3–5 层，越靠前越深，文字放在单独的便签纸上，不压在图案层上。

## 要点

- 配色：纸底奶油 #f6efe4，便签纸 #fffdf8，正文墨褐 #3b3127（对便签 12.5:1），次要 #6b5d4f（6.3:1）；图案层取一个色系 4 档，如 #d5e4d3、#a9c7ae、#7fa98a、#3f6b55，再加一个点缀色珊瑚 #f2b8a2 给太阳或花
- 层叠投影：每层 filter: drop-shadow(0 -2px 2px rgba(80,60,30,.18)) 加 drop-shadow(0 3px 4px rgba(80,60,30,.12))，方向统一；便签卡投影 0 1px 1px rgba(80,60,30,.1)、0 8px 16px rgba(80,60,30,.16)
- 形状：图案层用 SVG 路径剪出圆润的波浪或山形，边缘不描边；便签卡圆角 2–4px、旋转 ±1–3°，右下角可以折一个 14px 的纸角
- 胶带：48–64px 宽、16px 高，半透明 rgba(242,184,162,.6) 加 45° 细条纹，两端用 clip-path 剪成锯齿，压在便签上沿
- 字体：标题用圆润手写感的字体，推荐霞鹜文楷，后备 "Kaiti SC"、"STKaiti"、"PingFang SC"、serif，700、24–40px；正文系统无衬线 15px / 1.7
- 按钮：做成吊牌，深色 #3f6b55 纸底配奶油字（6:1），左侧打一个 6px 圆孔，悬停时轻微转正并抬起 2px
- 动效：进入时各层从下往上依次弹出 8px，每层间隔 80ms、时长 500ms，缓动 cubic-bezier(.2,.8,.3,1.2)；减少动态效果时直接显示叠好的状态
- 窄屏：图案层减到 3 层并降低高度，便签卡取消旋转、满宽放在图案上方，胶带保留

## 提示词

把{产品}的{页面}做成纸艺手作风：纸底奶油 #f6efe4，用 3–5 层 SVG 剪纸叠出{主题图形}（同一色系由浅到深，如 #d5e4d3、#a9c7ae、#7fa98a、#3f6b55），点缀色珊瑚 #f2b8a2；每层加 drop-shadow(0 -2px 2px rgba(80,60,30,.18)) 和 drop-shadow(0 3px 4px rgba(80,60,30,.12))，投影短、方向统一、带暖褐；文字放在单独的便签卡上：#fffdf8 底、圆角 3px、旋转 -2°、右下折角，用半透明条纹和纸胶带贴住上沿；标题用霞鹜文楷（后备 Kaiti SC、serif）700，正文 #3b3127、15px / 1.7；主按钮做成 #3f6b55 底奶油字的吊牌、左侧打圆孔，悬停转正并抬起 2px；进入时各层依次弹起 8px（间隔 80ms、500ms），减少动态效果时直接显示；窄屏减到 3 层、便签卡不旋转并满宽。

## 示例

<style>
:host{container-type:size}
.s{position:relative;height:100%;overflow:hidden;background:#f6efe4;color:#3b3127;font:12px/1.6 system-ui,"PingFang SC",sans-serif}
.sun{position:absolute;right:16%;top:12%;width:16cqh;height:16cqh;border-radius:50%;background:#f2b8a2;box-shadow:0 3px 4px rgba(80,60,30,.16),inset 0 -2px 3px rgba(80,60,30,.08);animation:pop .5s cubic-bezier(.2,.8,.3,1.2) both}
.ly{position:absolute;left:-2%;width:104%;bottom:0;height:var(--h);fill:var(--c);filter:drop-shadow(0 -2px 2px rgba(80,60,30,.18)) drop-shadow(0 3px 4px rgba(80,60,30,.12));animation:pop .5s var(--d) cubic-bezier(.2,.8,.3,1.2) both}
.nw{position:absolute;left:7%;top:10%;width:min(196px,58%);filter:drop-shadow(0 1px 1px rgba(80,60,30,.1)) drop-shadow(0 8px 12px rgba(80,60,30,.16));transform:rotate(-2deg);animation:pop .5s .32s cubic-bezier(.2,.8,.3,1.2) both}
.nt{padding:12px 14px 14px;border-radius:3px;background:linear-gradient(135deg,transparent 50%,#e6dac6 50%) 100% 100%/14px 14px no-repeat,#fffdf8;clip-path:polygon(0 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%)}
.tp{position:absolute;left:50%;top:-8px;width:56px;height:16px;background:repeating-linear-gradient(45deg,rgba(255,255,255,.35) 0 3px,transparent 3px 7px),rgba(242,184,162,.65);transform:translateX(-50%) rotate(4deg);clip-path:polygon(0 0,4% 25%,0 50%,4% 75%,0 100%,100% 100%,96% 75%,100% 50%,96% 25%,100% 0);z-index:1}
small{color:#6b5d4f}
h1{margin:2px 0 4px;font:700 clamp(17px,10cqh,32px)/1.25 "LXGW WenKai","Kaiti SC","STKaiti","KaiTi","PingFang SC",serif}
p{margin:0 0 10px;color:#6b5d4f}
button{position:relative;isolation:isolate;height:28px;padding:0 14px 0 22px;border:0;background:none;color:#fffdf8;font:inherit;font-weight:600;cursor:pointer;transform:rotate(-2deg);transition:transform .2s cubic-bezier(.2,.8,.3,1.2)}
button::after{content:"";position:absolute;inset:0;z-index:-1;background:#3f6b55;clip-path:polygon(8px 0,100% 0,100% 100%,8px 100%,0 50%)}
button::before{content:"";position:absolute;left:9px;top:50%;width:6px;height:6px;margin-top:-3px;border-radius:50%;background:#fffdf8}
button:hover{transform:translateY(-2px) rotate(0)}
button:focus-visible{outline:2px solid #3b3127;outline-offset:2px}
@keyframes pop{from{opacity:0;translate:0 8px}
}
@container (max-width:300px){.nw{width:64%;transform:none}
}
@container (min-height:260px){.nw{width:250px;left:9%;top:16%}
.nt{padding:18px 20px 20px}
small,p{font-size:13px}
button{height:34px;font-size:14px;padding:0 18px 0 26px}
}
@media (prefers-reduced-motion:reduce){.sun,.ly,.nw{animation:none}
button{transition:none}
}
</style>

<div class="s">
  <div class="sun" aria-hidden="true"></div>
  <svg class="ly" style="--h:62%;--c:#d5e4d3;--d:0s" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40C30 10 60 8 92 30s58 8 84-12 64-22 92 2 32 26 32 26V100H0z"/></svg>
  <svg class="ly" style="--h:46%;--c:#a9c7ae;--d:.08s" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 50c26-26 58-34 88-16s46 26 74 8 52-38 86-26 52 30 52 30V100H0z"/></svg>
  <svg class="ly" style="--h:30%;--c:#7fa98a;--d:.16s" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 46c34-30 70-30 104-6s58 22 90 0 68-30 106 8V100H0z"/></svg>
  <svg class="ly" style="--h:14%;--c:#3f6b55;--d:.24s" viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40c40-26 80-24 120 0s70 22 100 2 60-20 80 0V100H0z"/></svg>
  <div class="nw"><span class="tp" aria-hidden="true"></span><div class="nt"><small>山居手帐 · 秋季限定</small><h1>把秋天<br>折进口袋里</h1><p>纸雕书签 12 张 · ¥68</p><button type="button">加入购物袋</button></div></div>
</div>
