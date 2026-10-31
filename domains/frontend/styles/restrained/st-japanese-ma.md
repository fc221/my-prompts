---
zh: 日式留白
en: Japanese ma
aka: 和风 日系 侘寂 间 留白构图
order: 50
---

## 是什么

生成色纸底上只放很少的东西：一列竖排的宋体标题、几行细小的墨色字和一枚朱红印章，主体偏在一角，空出来的大片底色本身就是构图。

## 适合

茶室、民宿、手作器物、香与花艺、文创品牌，以及想让节奏慢下来的品牌故事页和单品介绍页。

## 不适合

商品多、要筛选比价的电商列表和后台，改用「企业稳重」；只想要黑白加一张大产品图的高端发布，用「黑白极简」；作品图才是主角的作品集，用「白墙陈列」；要暖色、圆润、更热闹的家居生活页，用「北欧柔和」。

## 注意

留白靠构图挣来：主体压在三分线附近，四周空出大小不等的空白，才有“间”的感觉；把内容居中再缩小字号，只会像页面没写完。竖排只给标题和短句，正文照常横排。

## 要点

- 配色：生成色底 #f3efe6，墨色正文 #2a2925（对底 12.7:1），次要 #5f5b52（5.9:1），朱红 #b8432f 只给一枚印章或一个小记号，面积不超过画面 1%
- 字体：标题用宋体类，推荐 Noto Serif SC（思源宋体），后备 "Songti SC"、"SimSun"、serif，字重 400–500、字距 0.24–0.3em；正文用系统无衬线 15px / 行高 2，注释小字 11–12px、字距 0.12em
- 竖排：标题用 writing-mode: vertical-rl，2–8 个字，里面的数字改用汉字或加 text-combine-upright；竖排块贴着页面一侧，旁边可以跟一列更小的竖排地点或日期
- 留白：内容只占画面三到四成，主体放在三分线交点附近；区块之间 120–160px，页边距不小于 8vw，同一屏只讲一件事
- 线与形：圆角 0，无阴影、无渐变；分隔只用 1px 细线 #d8d2c4，长度不拉满；装饰不超过两处，一枚印章，加一个淡墨圆或一枝线描植物
- 按钮做成文字链接：14px、下划线 1px 偏移 6px，悬停时文字变朱红，焦点用 1px 墨色描边、偏移 4px
- 动效：元素依次淡入，每个 800ms、相隔 120ms，缓动 cubic-bezier(.2,.6,.2,1)，不做位移和视差；减少动态效果时直接显示
- 窄屏：竖排标题缩到 4 个字以内放在右上，页边距收到 24px，正文行长 18–22 个汉字，留白比例不变

## 提示词

把{产品}的{页面}做成日式留白风：生成色底 #f3efe6，墨色正文 #2a2925、次要 #5f5b52，朱红 #b8432f 只用于一枚印章，面积不超过 1%；标题用 Noto Serif SC（后备 Songti SC、serif）400–500、字距 0.26em，writing-mode: vertical-rl 竖排 2–8 个字并贴近右侧，旁边可配一列 12px 竖排的地点或日期；正文无衬线 15px / 行高 2；内容只占画面三到四成，主体偏在三分线附近，区块间距 120px 以上，页边距不小于 8vw；圆角 0、无阴影无渐变，只用 1px 细线 #d8d2c4，装饰最多一枚印章加一个淡墨圆；主要操作做成带 1px 下划线的文字链接，悬停变朱红；元素依次淡入（800ms，相隔 120ms），不做位移，减少动态效果时直接显示；窄屏竖排标题缩到 4 个字放右上，页边距 24px。

## 示例

<style>
:host{container-type:size}
.s{position:relative;height:100%;overflow:hidden;background:#f3efe6;color:#2a2925;font:12px/2 system-ui,"PingFang SC",sans-serif}
.s>*{animation:in .8s cubic-bezier(.2,.6,.2,1) both}
.s>:nth-child(2){animation-delay:.12s}
.s>:nth-child(3){animation-delay:.24s}
.s>:nth-child(4){animation-delay:.36s}
.s>:nth-child(5){animation-delay:.48s}
.cap{position:absolute;left:8%;top:10%;margin:0;font-size:11px;letter-spacing:.14em;color:#5f5b52}
.en{position:absolute;left:40%;top:14%;width:38cqh;height:38cqh}
.v{position:absolute;right:11%;top:11%;margin:0;writing-mode:vertical-rl;font:500 clamp(18px,11cqh,34px)/1.3 "Noto Serif SC",ui-serif,"Songti SC","SimSun",serif;letter-spacing:.28em}
.sub{position:absolute;right:calc(11% + clamp(26px,15cqh,46px));top:12%;margin:0;writing-mode:vertical-rl;font-size:11px;line-height:1.4;letter-spacing:.24em;color:#5f5b52}
.seal{position:absolute;right:calc(11% + clamp(26px,15cqh,46px));bottom:24%;display:grid;place-items:center;width:18px;height:18px;background:#b8432f;color:#fff;font:600 11px/1 ui-serif,"Songti SC",serif}
.ft{position:absolute;left:8%;bottom:11%;display:flex;flex-direction:column;align-items:flex-start;gap:2px}
.ft p{margin:0;font-size:12px;letter-spacing:.1em}
.ft p+p{display:none;color:#5f5b52;font-size:11px}
.ft i{display:block;width:28px;height:1px;margin:4px 0 6px;background:#d8d2c4}
button{padding:0 0 2px;border:0;border-bottom:1px solid currentColor;background:none;color:#2a2925;font:inherit;font-size:12px;letter-spacing:.12em;cursor:pointer;transition:color .3s}
button:hover{color:#b8432f}
button:focus-visible{outline:1px solid #2a2925;outline-offset:4px}
@keyframes in{from{opacity:0}
}
@container (min-height:260px){.cap{font-size:12px}
.ft p{font-size:14px}
.ft p+p{display:block}
button{font-size:14px}
}
@media (prefers-reduced-motion:reduce){.s>*{animation:none}
}
</style>

<div class="s">
  <p class="cap">茶事 · 二〇二六 秋</p>
  <svg class="en" viewBox="0 0 100 100" aria-hidden="true"><path d="M62 9C34 4 10 26 12 54s28 40 50 36 30-28 26-48C85 28 77 19 68 15" fill="none" stroke="#d3cab8" stroke-width="2.6" stroke-linecap="round"/></svg>
  <h1 class="v">秋日茶事</h1>
  <p class="sub">杭州 · 满觉陇</p>
  <span class="seal" aria-hidden="true">庵</span>
  <div class="ft"><p>一席八人，一期一会。</p><p>桂花落时，煮一壶陈年岩茶。</p><i></i><button type="button">预约席位</button></div>
</div>
