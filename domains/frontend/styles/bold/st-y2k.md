---
zh: 千禧未来感
en: Y2K futurism
aka: Y2K 千禧风 液态金属 铬银 镭射 果冻按钮 y2k aesthetic
order: 50
---

## 是什么

液态金属一样的铬银字和球体、珍珠般泛彩的浅色渐变底、果冻质感的胶囊按钮，再点上几颗四角星，像 2000 年前后的 MP3、翻盖手机和音乐网站。

## 适合

潮流服饰与美妆、数码配件新品、音乐和演出、年轻向的社交与活动页、限定款发售页。

## 不适合

正文多的页面、后台和工具；要显得稳重的品牌；想要暗色霓虹和故障感，用「赛博霓虹」；想要老式电脑窗口和夕阳网格，用「蒸汽波」。

## 注意

铬银渐变里同时有很深和很浅的段，正文放上去总有一截看不清。铬只给大标题和一个物件，正文和按钮文字一律用纯色。

## 要点

- 配色：珍珠底用 135° 三段浅色渐变 #e8ecf8 → #f5e8f5 → #e2f3f4；正文深靛 #1b1f3b（对底 13:1 以上），次要 #4a4f6e（6.7:1）；强调电光蓝 #2f4dff，四角星点缀荧光粉 #ff4fd8；不用纯黑
- 铬银：多段 linear-gradient(180deg, #fff 0%, #c9ced8 38%, #6e7486 50%, #e9ecf2 62%, #a7adbb 100%)；标题用 background-clip: text，外加 1px 深色描边或 drop-shadow 保住边缘；物件用多层 radial-gradient 画成液态金属球
- 凝胶按钮：胶囊形，底色 #4560f5 到 #1f36d6 的竖向渐变，上半部叠一层 rgba(255,255,255,.55) 到透明的高光，再加 inset 0 -3px 6px 的暗边和 0 6px 14px rgba(47,77,255,.35) 的外投影；白字加 1px 深色文字阴影
- 边框：1px 白色高光边外面再套 1px 灰 #9aa0b4，做出金属框；圆角 20–28px 或胶囊
- 字体：英文标题用宽体几何无衬线，可用 Michroma、Syncopate，全大写、字距 0.06–0.1em、800 以上；中文用思源黑体 Heavy；正文系统字体 15–16px，只用纯色
- 装饰上限：铬质元素一屏最多 2 处（标题加一个物件），四角星最多 4 颗，透明气泡最多 2 个；珍珠渐变只铺背景一层
- 动效：铬面高光从左往右扫过，2.4s ease-in-out，首屏或悬停时播一次；四角星 scale 加 opacity 闪烁，1.6s 循环；减少动态效果时全部停下
- 窄屏：铬字改成深靛纯色字，只留物件是铬的；四角星减到 2 颗

## 提示词

把{产品}的{页面}做成千禧未来感：背景用 135° 珍珠渐变 #e8ecf8 → #f5e8f5 → #e2f3f4，正文深靛 #1b1f3b、次要 #4a4f6e，强调电光蓝 #2f4dff，四角星用荧光粉 #ff4fd8；大标题用宽体几何无衬线（Michroma 或 Syncopate，中文思源黑体 Heavy），全大写、字距 0.08em，填多段铬银渐变（background-clip: text，加 1px 深色描边保边缘），再用 radial-gradient 画一个液态金属球，铬质元素全页最多 2 处；主按钮做成凝胶胶囊：#4560f5 到 #1f36d6 竖向渐变、上半部白色高光、inset 暗边加蓝色外投影，白字；卡片用 1px 白高光边加 1px 灰边、圆角 24px；四角星最多 4 颗、气泡最多 2 个；铬面高光 2.4s 扫过一次，四角星 1.6s 闪烁，减少动态效果时停；正文 16px 只用纯色；窄屏铬字改纯色、四角星减到 2 颗。

## 示例

<style>
:host{container-type:size}
.s{position:relative;height:100%;display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,.75fr);align-items:center;gap:8px;padding:14px 20px;overflow:hidden;background:radial-gradient(50% 70% at 82% 30%,rgba(255,255,255,.85),transparent 70%),linear-gradient(135deg,#e8ecf8,#f5e8f5 50%,#e2f3f4);color:#1b1f3b;font:12px/1.5 system-ui,"PingFang SC",sans-serif}
.tx{position:relative;min-width:0}
.tag{display:inline-flex;align-items:center;gap:6px;height:22px;padding:0 10px;border:1px solid #fff;border-radius:999px;background:rgba(255,255,255,.6);box-shadow:0 0 0 1px #9aa0b4;color:#4a4f6e;font-weight:600}
.tag i{width:6px;height:6px;border-radius:50%;background:#2f4dff}
h1{margin:8px 0 4px;font:900 clamp(24px,16cqh,60px)/1 Michroma,Syncopate,"Avenir Next","Arial Black",sans-serif;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;background:linear-gradient(100deg,transparent 42%,rgba(255,255,255,.95) 50%,transparent 58%) 150% 0/250% 100% no-repeat,linear-gradient(180deg,#fff 0%,#c9ced8 38%,#6e7486 52%,#e9ecf2 64%,#a7adbb 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;-webkit-text-stroke:1px #4a4f6e;filter:drop-shadow(0 2px 0 rgba(27,31,59,.22));animation:sheen 2.4s .4s ease-in-out both}
p{margin:0 0 12px;color:#4a4f6e}
p b{color:#1b1f3b}
.more{display:none}
a{position:relative;display:inline-flex;align-items:center;height:34px;padding:0 20px;border-radius:999px;background:linear-gradient(#4560f5,#1f36d6);box-shadow:inset 0 -3px 6px rgba(0,0,60,.35),0 0 0 1px #fff,0 0 0 2px #9aa0b4,0 6px 14px rgba(47,77,255,.35);color:#fff;font-weight:700;text-shadow:0 1px 1px rgba(0,0,60,.45);text-decoration:none;transition:filter .2s}
a::before{content:"";position:absolute;left:10%;right:10%;top:2px;height:46%;border-radius:999px;background:linear-gradient(rgba(255,255,255,.55),rgba(255,255,255,0))}
a span{position:relative}
a:hover{filter:brightness(1.1) saturate(1.1)}
a:focus-visible{outline:2px solid #ff4fd8;outline-offset:4px}
.art{position:relative;justify-self:center;width:min(100%,64cqh);aspect-ratio:1}
.orb{position:absolute;inset:8%;border-radius:50%;background:radial-gradient(circle at 32% 24%,#fff 0 6%,rgba(255,255,255,0) 15%),linear-gradient(180deg,#fff 0%,#dfe3ea 34%,#7b8194 47%,#2f3445 52%,#8e95a6 72%,#f3f4f7 96%);box-shadow:inset -6px -10px 18px rgba(27,31,59,.3),0 14px 28px rgba(27,31,59,.18)}
.ring{position:absolute;inset:34% -10%;border:3px solid rgba(255,255,255,.95);border-radius:50%;box-shadow:0 0 0 1px #9aa0b4,inset 0 0 0 1px #9aa0b4;transform:rotate(-16deg)}
.bub{position:absolute;left:-4%;bottom:2%;width:24%;aspect-ratio:1;border:1px solid #fff;border-radius:50%;background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.95) 0 10%,rgba(255,255,255,.15) 28%,rgba(186,200,255,.35) 100%);box-shadow:0 0 0 1px rgba(154,160,180,.6)}
.st{position:absolute;width:18%;fill:#ff4fd8;animation:tw 1.6s ease-in-out infinite}
.st:nth-of-type(1){right:-6%;top:0}
.st:nth-of-type(2){left:4%;top:6%;width:11%;fill:#2f4dff;animation-delay:.5s}
.st:nth-of-type(3){right:6%;bottom:2%;width:10%;animation-delay:1s}
@keyframes sheen{to{background-position:-50% 0,0 0}}
@keyframes tw{50%{transform:scale(.55) rotate(20deg);opacity:.5}}
@container (max-width:300px){.s{padding-inline:16px}
.st:nth-of-type(3),.bub{display:none}
}
@container (min-height:260px){.s{padding:24px 44px;gap:24px}
.tag{height:26px;font-size:13px}
p{font-size:14px;margin-bottom:18px}
.more{display:block}
a{height:42px;padding:0 26px;font-size:15px}
}
@media (prefers-reduced-motion:reduce){h1,.st{animation:none}
a{transition:none}
}
</style>

<div class="s">
  <div class="tx">
    <span class="tag"><i></i>11.11 00:00 发售</span>
    <h1>Star<br>Drop</h1>
    <p><b>银河限定 · 无线耳机</b> ¥699<span class="more">首批限量 2000 副，附赠镭射收纳盒</span></p>
    <a href="#"><span>立即预约</span></a>
  </div>
  <div class="art" aria-hidden="true">
    <i class="orb"></i><i class="ring"></i><i class="bub"></i>
    <svg class="st" viewBox="0 0 24 24"><path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z"/></svg>
    <svg class="st" viewBox="0 0 24 24"><path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z"/></svg>
    <svg class="st" viewBox="0 0 24 24"><path d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z"/></svg>
  </div>
</div>
