---
zh: 新中式
en: New Chinese
aka: 国风 中式 新国风 东方美学 中国风
order: 50
---

## 是什么

中轴对称的构图，正中一扇月洞门或扇面框住层层远山，四角压着细细的窗棂纹，配色取自传统色名，用现代的留白和版式把这些元素重新排了一遍。

## 适合

茶室和中式餐饮、文旅景区、博物馆和文创、非遗手艺、节气和传统节日活动页、国风品牌官网。

## 不适合

科技产品和工具后台，改用「企业稳重」；面向海外用户的产品；想要偏在一角、只放一列竖排字的极简东方感，用「日式留白」；只是节日营销做一两天，局部加元素就行，不必整站换皮。

## 注意

新中式难在克制：龙凤、祥云、灯笼、中国结、毛笔字全堆上，就成了节庆模板。选一个框景当主角，纹样只压四角，红色只给一枚印章，其余交给留白。

## 要点

- 配色：用传统色做令牌，并保留色名；月白底 #eef2f0，黛青正文 #233a3f（10.6:1），次要 #4e6266（5.7:1）；天青 #9fc0bd 和苍色 #6f9a98 只画远山与色块；朱砂 #b0342a 只给印章和一处重点，面积 ≤ 3%；赤金 #a8823c 只画细线，不写字
- 构图：中轴对称，主体用月洞门、扇面、方窗这类框景居中，标题压在框景正中或上方；两侧可以放一对竖排短句对称呼应；留白不少于画面四成
- 字体：标题思源宋体 600，后备 "Songti SC"、STSong、SimSun、serif，字距 0.3em；正文思源黑体或系统黑体 15–16px / 1.8；竖排只给两侧短句，每句不超过 7 个字
- 线与框：窗棂、回纹只放在四角或框景边缘，1–1.5px 赤金细线；按钮用 1px 双线框，外框和内框间隔 3px；圆角 0，不用阴影
- 远山：3 层 SVG path 或渐变叠出由浅到深的山形，近山不透明、远山透明度 .4，代替水墨照片和书法素材
- 装饰上限：印章一屏 1 枚，22–40px，朱砂底白字，旋转 -3°；祥云、龙凤、灯笼、中国结这类符号整页最多选 1 种；纹样不铺满底色
- 动效：远山和月亮依次淡入，同时 filter: blur(6px) 到 0，每层 800ms ease-out、相隔 150ms，只播一次；按钮悬停 200ms 填黛青；减少动态效果时直接显示
- 窄屏：两侧竖排短句隐藏，框景缩到宽度 70% 左右，标题和按钮跟在框景下面居中

## 提示词

把{产品}的{页面}做成新中式风：月白 #eef2f0 底，黛青 #233a3f 正文、次要 #4e6266，天青 #9fc0bd 和苍色 #6f9a98 只画远山，朱砂 #b0342a 只给一枚印章（面积 ≤ 3%），赤金 #a8823c 只画 1px 细线，颜色令牌用传统色名；中轴对称，正中放一个{月洞门 / 扇面 / 方窗}框景，里面用 3 层 SVG 山形由浅到深叠出远山，标题思源宋体 600（后备 Songti SC、serif）字距 0.3em 压在框景上，两侧可放一对 7 字以内的竖排短句；窗棂回纹只放四角，按钮用 1px 双线框、圆角 0、无阴影，悬停填黛青；祥云龙凤这类符号最多选 1 种；远山淡入加 blur(6px) 到 0、800ms 依次出现，只播一次，减少动态效果时直接显示；窄屏隐藏竖排短句，框景缩到 70% 宽，标题和按钮放在下面。

## 示例

<style>
:host{container-type:size}
.s{--serif:"Noto Serif SC","Songti SC",STSong,SimSun,serif;position:relative;height:100%;display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:center;padding:12px 16px;overflow:hidden;background:#eef2f0;color:#233a3f;font:12px/1.6 system-ui,"PingFang SC",sans-serif}
.cn{position:absolute;width:20px;height:20px;border:solid #a8823c;border-width:1.5px 0 0 1.5px}
.cn::after{content:"";position:absolute;left:4px;top:4px;width:8px;height:8px;border:solid #a8823c;border-width:1px 0 0 1px}
.cn:nth-of-type(1){left:10px;top:10px}
.cn:nth-of-type(2){right:10px;top:10px;transform:scaleX(-1)}
.cn:nth-of-type(3){left:10px;bottom:10px;transform:scaleY(-1)}
.cn:nth-of-type(4){right:10px;bottom:10px;transform:scale(-1)}
.sd{justify-self:center;margin:0;writing-mode:vertical-rl;color:#4e6266;font:14px/1.5 var(--serif);letter-spacing:.4em}
.c{display:flex;flex-direction:column;align-items:center;gap:6px}
.gate{position:relative;width:62cqh;aspect-ratio:1;border:1.5px solid #a8823c;border-radius:50%;outline:1px solid #a8823c;outline-offset:3px;background:linear-gradient(#f6f8f6,#dfe9e6)}
.gate svg{position:absolute;inset:0;width:100%;height:100%;border-radius:50%}
.ly{animation:ink .8s ease-out both}
.ly:nth-of-type(2){animation-delay:.15s}
.ly:nth-of-type(3){animation-delay:.3s}
.ly:nth-of-type(4){animation-delay:.45s}
h1{position:absolute;left:0;right:0;top:24%;margin:0;padding-left:.3em;text-align:center;font:600 clamp(15px,9cqh,32px)/1.2 var(--serif);letter-spacing:.3em}
.seal{position:absolute;right:2%;bottom:10%;display:grid;place-items:center;width:clamp(20px,11cqh,36px);aspect-ratio:1;border-radius:2px;background:#b0342a;color:#fff;font:600 clamp(11px,6cqh,20px)/1 var(--serif);transform:rotate(-3deg)}
.row{display:flex;align-items:center;gap:10px;white-space:nowrap}
.row span{color:#4e6266}
a{display:inline-flex;align-items:center;height:26px;padding:0 12px;border:1px solid #233a3f;outline:1px solid #233a3f;outline-offset:-4px;color:#233a3f;font:600 12px/1 var(--serif);letter-spacing:.1em;text-decoration:none;transition:background-color .2s,color .2s}
a:hover{background:#233a3f;color:#fff;outline-color:#eef2f0}
a:focus-visible{box-shadow:0 0 0 2px #eef2f0,0 0 0 4px #b0342a}
@keyframes ink{from{opacity:0;filter:blur(6px)}}
@container (max-width:300px){.sd{display:none}
.s{grid-template-columns:1fr}
.c{justify-self:center}
}
@container (min-height:260px){.s{padding:18px 32px}
.cn{width:28px;height:28px}
.sd{font-size:18px}
.c{gap:12px}
.gate{outline-offset:5px}
.row{gap:16px;font-size:14px}
a{height:34px;padding:0 18px;font-size:14px;outline-offset:-5px}
}
@media (prefers-reduced-motion:reduce){.ly{animation:none}
a{transition:none}
}
</style>

<div class="s">
  <i class="cn"></i><i class="cn"></i><i class="cn"></i><i class="cn"></i>
  <p class="sd">一席秋色</p>
  <div class="c">
    <div class="gate">
      <svg viewBox="0 0 200 200" preserveAspectRatio="none" aria-hidden="true"><circle class="ly" cx="158" cy="100" r="11" fill="#ecd59a" fill-opacity=".85"/><path class="ly" fill="#9fc0bd" fill-opacity=".55" d="M0 128C26 110 50 102 78 116S128 96 158 110 188 102 200 106V200H0Z"/><path class="ly" fill="#6f9a98" fill-opacity=".85" d="M0 150C26 130 56 124 86 142S140 120 200 138V200H0Z"/><path class="ly" fill="#3b5c5e" d="M0 176C40 158 72 162 110 174S170 160 200 168V200H0Z"/></svg>
      <h1>山中茶事</h1>
      <span class="seal" aria-hidden="true">茶</span>
    </div>
    <div class="row"><span>秋分 · 九月廿三</span><a href="#">预约茶席</a></div>
  </div>
  <p class="sd">半盏山岚</p>
</div>
