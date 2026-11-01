---
zh: 人物专访跨页
en: Portrait interview spread
aka: 人物专访 访谈 员工故事 校友专访 创始人访谈 问答 Q&A 人物稿
order: 70
---

## 是什么

人物专访的开篇对页：左页浅底，一张带白边的大幅人像稍微偏离中心，一行超大的倾斜标题压过照片下沿；右页深灰底，顶部一排 3 张小图，下面是一段导语和两栏问答，中间横插一句放大的引语。左页记住这个人，右页听他说话。

## 适合

企业内刊和品牌刊物的人物专访、员工故事；校友刊、校报的校友和教师访谈；创始人、主理人、手艺人的访谈；年报里的客户或员工故事。

## 不适合

一次介绍好几个人，改用「人物介绍页」；以地点和路线为主的探店、城市稿用「杂志专题跨页」；求职用的个人介绍看「简历」。

## 注意

倾斜标题只压在衣服或背景上，不压脸；整本刊物只用一个倾斜角度，换角度就显得随意。右页是深底反白字，正文不小于 8.5pt，用无衬线或字重偏粗的字体，细宋体反白印出来会糊；印刷时深灰底用以 K 为主的灰，不用四色叠黑，参照「打印颜色与出血」。

## 要点

- 页面：两张 A4 竖版组成 420×297mm 跨页，边距 18mm，内侧 20mm；左页底色 #ebe5db，右页底色 #2a2a2c，右页正文 2 栏、栏间距 9mm。
- 人像：连白边宽约 134mm、高约 180mm，白边 6mm，加一层很淡的投影；中心比页面中心偏外侧和偏上 8–12mm；背景用单一颜色（如赤陶 #b9623f），人物眼睛在照片上 1/3，脸朝向中缝。
- 标题：一行 3–5 个字，思源宋体 Heavy 130–150pt，颜色 #161616，逆时针倾斜 6–10°，压过照片下沿约半个字高；离中缝和页边都不少于 10mm。
- 标题下方：一行 9–10pt 粗体副标题写“对话谁”，再一行 7pt 写姓名、年龄或身份；页码 7pt 灰色 #8d867b。
- 右页顶部：3 张同高小图（约 40mm）、栏间距 5mm，拍工作现场、手部特写、门店或作品，和左页人像不重复。
- 问答：导语 12pt 中等字重 #e8e4dc；问题 9pt 粗体 #ffffff，回答 8.5pt、行距 1.75、#c9c5bd；每组问答不拆到两栏，设 break-inside: avoid。
- 引语：每组对页只放一句，24–28pt 粗体宋体，黄色 #f2c230，横跨两栏，上方一条 1pt 黄线；选受访者原话，20 字以内。
- 整套页面：封面、目录、人物开篇跨页（本条）、问答续页、图片页（一组工作现场照片）、编后记、封底。封面用深灰 #2a2a2c 底，刊名和引语同用黄色 #f2c230，人像抠图放在赤陶色圆形里；续页改回浅底两栏问答，保留黄色引语和页眉，倾斜标题只在开篇出现。

## 提示词

为{刊物或机构}做一整套人物刊物 PDF，重点是人物专访开篇跨页，受访者是{人物和身份}，实现方式按{实现方式，如 HTML + 打印 CSS}：
1. 页面是两张 A4 竖版组成的 420×297mm 跨页，边距 18mm、内侧 20mm；文档设成双页视图、封面单独。
2. 左页 #ebe5db 底：一张带 6mm 白边的大幅人像（约 134×180mm），比页面中心偏外侧和偏上 8–12mm，人物脸朝中缝。
3. 一行 3–5 字的超大标题（思源宋体 Heavy 130–150pt），逆时针倾斜 6–10°，压过照片下沿但不压脸，离中缝和页边 10mm 以上；下面写 9–10pt 副标题和 7pt 姓名身份。
4. 右页 #2a2a2c 底：顶部 3 张同高小图；一段 12pt 导语；两栏问答（问题 9pt 粗体白色，回答 8.5pt 浅灰），每组问答不拆栏；中间横插一句 24–28pt 黄色 #f2c230 引语。
5. 问答内容来自{采访稿}，引语只用受访者原话；深灰底按以 K 为主的灰输出。
6. 整套页面包括封面、目录、人物开篇跨页、问答续页、图片页、编后记和封底，每种页各给一个示例页；封面深灰底配黄色刊名和赤陶色圆形人像，倾斜标题只在开篇出现。
交付时列出整套页面清单，用双页视图截图，确认标题没压到脸、每组问答没有被拆开，并报告右页反白文字的最小字号。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.mock{background:radial-gradient(120% 90% at 35% 15%,#55504a,#1e1c1a 72%)}
.mock .dg-row{justify-content:center}
.mock .dg-col{flex:none}
.m-sp{display:flex;width:420px;height:297px;box-shadow:0 18px 40px -12px rgba(0,0,0,.75);font-family:system-ui,"PingFang SC",sans-serif}
.m-pg{position:relative;width:210px;height:297px;overflow:hidden}
.m-l{background:#ebe5db;color:#161616}
.m-l::after{content:"";position:absolute;inset:0 0 0 auto;width:14px;background:linear-gradient(90deg,transparent,rgba(0,0,0,.1))}
.m-kick{position:absolute;left:18px;right:20px;top:18px;display:flex;justify-content:space-between;font:700 5px/1 system-ui,sans-serif;letter-spacing:.16em}
.m-kick span:last-child{color:#8d867b;font-weight:500}
.m-frame{position:absolute;left:24px;top:34px;width:134px;height:180px;padding:6px;background:#fff;box-shadow:0 6px 14px -6px rgba(60,45,30,.45)}
.m-por{position:relative;height:100%;overflow:hidden;background:radial-gradient(60% 50% at 40% 30%,#e0946c,#b9623f 72%,#8f4730)}
.m-por::before{content:"";position:absolute;inset:0;background:linear-gradient(100deg,rgba(255,235,210,.28),transparent 40%)}
.m-torso{position:absolute;left:12px;bottom:-4px;width:100px;height:64px;border-radius:50px 50px 0 0/44px 44px 0 0;background:linear-gradient(90deg,#3d4a4c,#2a3435 70%)}
.m-torso::before{content:"";position:absolute;left:34px;right:34px;top:8px;bottom:0;background:#ece6dc;clip-path:polygon(18% 0,82% 0,100% 100%,0 100%)}
.m-neck{position:absolute;left:52px;bottom:54px;width:20px;height:20px;border-radius:0 0 8px 8px;background:#c48c6c}
.m-head{position:absolute;left:41px;bottom:68px;width:42px;height:52px;border-radius:50%/54% 54% 46% 46%;background:radial-gradient(circle at 38% 38%,#ecc4a4,#c98f6e 78%)}
.m-head::before{content:"";position:absolute;left:-3px;right:-3px;top:-4px;height:24px;border-radius:50% 50% 24% 30%;background:#2a1f1a}
.m-head::after{content:"";position:absolute;left:13px;top:-14px;width:16px;height:15px;border-radius:50%;background:#2a1f1a}
.m-title{position:absolute;left:26px;top:186px;margin:0;font:900 50px/1 "Songti SC","STSong",serif;letter-spacing:.02em;white-space:nowrap;transform:rotate(-8deg);transform-origin:0 100%}
.m-who{position:absolute;left:18px;bottom:26px;margin:0}
.m-who b{display:block;font:800 6.6px/1.4 system-ui,"PingFang SC",sans-serif}
.m-who span{color:#6d675e;font-size:4.8px;letter-spacing:.06em}
.m-folio{position:absolute;bottom:14px;color:#8d867b;font-size:4.4px;letter-spacing:.1em}
.m-r{padding:18px 18px 14px 22px;background:#2a2a2c;color:#e8e4dc}
.m-r::before{content:"";position:absolute;inset:0 auto 0 0;width:12px;background:linear-gradient(90deg,rgba(0,0,0,.35),transparent)}
.m-pics{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:5px}
.m-pics i{display:block;height:40px}
.m-p1{background:radial-gradient(22% 30% at 30% 55%,#d79a58,#9c5d2c 80%,transparent 82%),radial-gradient(22% 30% at 68% 50%,#cf914f,#93552a 80%,transparent 82%),linear-gradient(#4a3426,#2d1f16)}
.m-p2{background:radial-gradient(circle at 50% 55%,#f6efe2 10px,#e2d6c2 13px,transparent 13.5px),radial-gradient(circle at 20% 30%,#fff 1px,transparent 1.5px),radial-gradient(circle at 75% 25%,#fff 1px,transparent 1.5px),radial-gradient(circle at 82% 78%,#fff 1px,transparent 1.5px),linear-gradient(#cfc5b4,#b7ab97)}
.m-p3{background:linear-gradient(transparent 0 30%,#1a1a1c 30%),repeating-linear-gradient(90deg,#c9a14a 0 5px,#efe6d2 5px 10px);position:relative}
.m-p3::after{content:"";position:absolute;left:12px;right:12px;top:18px;bottom:4px;background:radial-gradient(80% 70% at 50% 60%,#ffd48a,#d98f3c 70%)}
.m-lede{margin-top:12px!important;font:500 6.6px/1.6 system-ui,"PingFang SC",sans-serif}
.m-qa{margin-top:10px;column-count:2;column-gap:9px;font-size:4.8px;line-height:1.75;color:#c9c5bd}
.m-qa b{display:block;margin-top:5px;color:#fff;font-size:5.2px}
.m-qa p{break-inside:avoid}
.m-qa p:first-child b,.m-pull+p b{margin-top:0}
.m-pull{column-span:all;margin:10px 0 8px;padding:7px 0 0;border-top:1px solid #f2c230;color:#f2c230;font:700 14px/1.3 "Songti SC","STSong",serif}
.m-r .m-folio{right:18px}
.m-cv{background:#2a2a2c;color:#e8e4dc;box-shadow:0 18px 40px -12px rgba(0,0,0,.75)}
.m-cv::before{content:"";position:absolute;inset:0 auto 0 0;width:8px;background:linear-gradient(90deg,rgba(255,255,255,.06),transparent)}
.m-cv .m-mast{position:absolute;left:18px;top:16px;margin:0;color:#f2c230;font:900 44px/1 "Songti SC","STSong",serif;letter-spacing:.04em}
.m-cv .m-iss{position:absolute;right:18px;top:20px;color:#a9a59d;font:500 5px/1.5 system-ui,"PingFang SC",sans-serif;letter-spacing:.12em;text-align:right}
.m-disc{position:absolute;left:30px;top:80px;width:150px;height:150px;border-radius:50%;overflow:hidden;background:radial-gradient(60% 50% at 40% 30%,#e0946c,#b9623f 72%,#8f4730)}
.m-fig{position:absolute;left:14px;bottom:-14px;width:122px;height:168px}
.m-cl{position:absolute;left:18px;right:18px;bottom:20px;padding-top:7px;border-top:1px solid #f2c230}
.m-cl b{display:block;color:#fff;font:900 22px/1.1 "Songti SC","STSong",serif}
.m-cl span{display:block;margin-top:3px;font-size:5.4px;line-height:1.5}
</style>

<div class="dg mock"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, [`<div class="m-pg m-cv"><h2 class="m-mast">邻里志</h2><p class="m-iss">2026 冬季刊<br>第 12 期</p>
      <div class="m-disc"><div class="m-fig"><i class="m-torso"></i><i class="m-neck"></i><i class="m-head"></i></div></div>
      <p class="m-cl"><b>慢发酵</b><span>对话社区面包店“麦田小屋”主理人苏念 · P12</span></p></div>`, `<div class="m-sp">
    <div class="m-pg m-l">
      <p class="m-kick"><span>人物 · PEOPLE</span><span>2026 冬季刊</span></p>
      <div class="m-frame"><div class="m-por"><i class="m-torso"></i><i class="m-neck"></i><i class="m-head"></i></div></div>
      <h1 class="m-title">慢发酵</h1>
      <p class="m-who"><b>对话社区面包店“麦田小屋”主理人</b><span>苏念 · 38 岁 · 开店第 7 年</span></p>
      <p class="m-folio" style="left:18px">12</p>
    </div>
    <div class="m-pg m-r">
      <div class="m-pics"><i class="m-p1"></i><i class="m-p2"></i><i class="m-p3"></i></div>
      <p class="m-lede">苏念的店开在老小区底商，只卖六种面包。她每天凌晨四点起床，下午卖完就关门，周一休息。</p>
      <div class="m-qa">
        <p><b>为什么只卖六种？</b>品种多了，每一种都做不好。六种是我和一个学徒从凌晨四点做到上午十点，刚好能做完的量。</p>
        <p><b>开店前在做什么？</b>在一家互联网公司做了九年产品。辞职那年报了烘焙班，第一次把面团揉出筋膜，觉得这件事可以做很久。</p>
        <p class="m-pull">“面包急不得，<br>人也一样。”</p>
        <p><b>最难的是哪段时间？</b>第二年夏天，酵种连着坏了三次。后来我把温度、湿度和时间每天记下来，现在记满了十一本。</p>
        <p><b>一天的节奏是什么样的？</b>四点起床喂酵种，五点开始整形，七点第一炉出来。下午卖完就收拾店面，晚上九点前睡觉。</p>
        <p><b>对来店里的人有什么期待？</b>不用期待什么。有人每周六来买同一种面包，买了五年，这就够了。</p>
        <p><b>接下来想做什么？</b>想在周末开一个小课，教附近的孩子做最简单的吐司，材料费大家平摊。</p>
      </div>
      <p class="m-folio">13</p>
    </div>
  </div>`], { center: true, min: 0.25 });
}
</script>
