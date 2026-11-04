---
zh: 游戏界面
en: Game UI
aka: 游戏 UI 手游界面 抽卡 奖励弹窗 RPG 界面 稀有度
order: 40
---

## 是什么

深靛蓝底上转着放射光，顶栏挂着金币、钻石、体力的资源条，中间一张金边稀有度卡片配星级，下方是有厚度的大号亮黄按钮，像手游里领奖励的那一屏。

## 适合

手游和小游戏的官网、预约和抽卡活动页、签到与任务奖励弹窗、会员等级和成就系统、带积分玩法的电商活动。

## 不适合

8 位机方块像素那种复古味，改用「复古像素」；科幻仪表和数据读数，用「科幻大屏」；需要克制、可信的日常工具，用「企业稳重」或「北欧柔和」。

## 注意

游戏界面热闹但有主次：一屏只有一个亮黄主按钮，资源条和装饰都比它暗；稀有度颜色是一套固定规则（N 灰、R 蓝、SR 紫、SSR 金），全站同一含义，不拿来当普通装饰色。

## 要点

- 配色：深靛蓝底 #1b1446 向外压暗到 #0c0a24，正文白（17:1），次要 #c9c2ff（10.2:1），金色字 #ffd76a；稀有度 N #9aa3b5、R #4aa3ff、SR #b46bff、SSR #ffc93c，只用在卡框、光效和标签上
- 主按钮：亮黄渐变 #ffe27a 到 #ffb020，底部 4px 深一档的厚边 #c97a00，上沿 2px 内高光，文字深棕 #4a2300 900（7.5:1 以上）；按下时厚边收到 1px、整体下沉 3px；次按钮同样做法换成蓝 #6fb6ff 配深蓝字 #0b2a66
- 卡框：SSR 卡用 3px 金色渐变边加 1px 内暗线，四角放小宝石装饰，背后一圈同色径向光晕；星级 ★ 用金色加 1px 深色描边阴影
- 资源条：顶栏一排半透明深色胶囊 rgba(12,10,36,.6)，左边图标、右边 tabular-nums 数字和一个 + 号小按钮，数字超过 5 位用“12.8万”缩写
- 字体：标题和数字用粗圆或粗黑体，推荐 Baloo 2 或 Rubik 配得意黑，后备 "PingFang SC"、"Microsoft YaHei"、sans-serif，900；白色标题加 2px 深靛描边阴影保证压在光效上也清楚
- 动效：背后放射光 repeating-conic-gradient 20s 一圈；卡面每 3s 扫过一道斜向高光 600ms；获得时卡片 scale(.6 → 1.08 → 1) 400ms，星星依次弹出间隔 80ms；减少动态效果时光效静止，卡片直接出现
- 声音和震动要有开关，默认跟随系统静音；所有图标按钮有文字标签或 aria-label
- 窄屏：资源条只留 2 项，卡片和按钮上下排列，主按钮满宽、高 48px 以上

## 提示词

把{游戏名}的{奖励 / 抽卡页}做成游戏界面风：深靛蓝底 #1b1446 向外压暗到 #0c0a24，背后一圈 repeating-conic-gradient 放射光 20s 慢转；顶栏放{资源}的半透明深色胶囊，图标加 tabular-nums 数字和 + 号按钮；中间是稀有度卡片，稀有度固定为 N 灰 #9aa3b5、R 蓝 #4aa3ff、SR 紫 #b46bff、SSR 金 #ffc93c，SSR 用 3px 金色渐变边、四角小宝石和同色光晕，下方金色星级；标题用 Baloo 2 配得意黑（后备 PingFang SC）900，白字加 2px 深靛描边阴影；一屏只有一个亮黄主按钮：#ffe27a 到 #ffb020 渐变、4px 深色厚边、深棕字，按下厚边收到 1px 并下沉 3px，次按钮换成蓝色同款；卡面每 3s 扫一道高光，获得时卡片 400ms 弹出、星星间隔 80ms 依次出现，减少动态效果时全部静止直接显示；窄屏资源条留 2 项、按钮满宽 48px 高。

## 示例

<style>
:host{container-type:size}
.s{position:relative;height:100%;display:flex;flex-direction:column;gap:8px;padding:8px 12px 12px;overflow:hidden;background:radial-gradient(70% 80% at 30% 55%,#2a1f6b,#1b1446 45%,#0c0a24);color:#fff;font:12px/1.4 "Baloo 2","Rubik","PingFang SC","Microsoft YaHei",sans-serif}
.ray{position:absolute;left:30%;top:56%;width:150cqw;aspect-ratio:1;margin:-75cqw 0 0 -75cqw;background:repeating-conic-gradient(rgba(255,201,60,.16) 0 7deg,transparent 7deg 18deg);-webkit-mask:radial-gradient(closest-side,#000 10%,transparent 60%);mask:radial-gradient(closest-side,#000 10%,transparent 60%);animation:rot 20s linear infinite}
.bar{position:relative;display:flex;justify-content:flex-end;gap:6px}
.rs{display:flex;align-items:center;gap:4px;height:22px;padding:0 3px 0 4px;border-radius:999px;background:rgba(12,10,36,.6);box-shadow:inset 0 0 0 1px rgba(201,194,255,.25)}
.rs svg{width:16px;height:16px}
.rs b{min-width:40px;font-weight:800;font-variant-numeric:tabular-nums}
.rs button{width:16px;height:16px;padding:0;border:0;border-radius:50%;background:linear-gradient(#8fe38f,#3fb950);color:#0c3a14;font:900 13px/16px sans-serif;cursor:pointer}
.main{position:relative;flex:1;min-height:0;display:flex;align-items:center;gap:16px;padding-left:6px}
.cd{position:relative;flex:none;width:min(86px,30cqw);aspect-ratio:3/4;display:grid;place-items:center;overflow:hidden;border-radius:10px;background:radial-gradient(circle at 50% 40%,#5a3fb0,#24185e 70%);box-shadow:0 0 0 3px #ffc93c,0 0 0 4px #7a4a00,0 0 24px 4px rgba(255,201,60,.45);animation:pop .4s cubic-bezier(.34,1.56,.64,1) both}
.cd::after{content:"";position:absolute;inset:-20% -60%;background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.55) 50%,transparent 60%);transform:translateX(-60%);animation:sh 3s 1s ease-in-out infinite}
.cd svg{width:72%}
.rr{position:absolute;left:4px;top:4px;padding:0 5px;border-radius:4px;background:#ffc93c;color:#4a2300;font-size:10px;font-weight:900;line-height:15px}
.gm{position:absolute;width:8px;height:8px;background:#4aa3ff;transform:rotate(45deg);box-shadow:0 0 0 1.5px #ffc93c;z-index:1}
.info{min-width:0}
small{color:#c9c2ff;font-weight:700}
h1{margin:0;font-size:clamp(18px,11cqh,34px);line-height:1.2;font-weight:900;text-shadow:2px 0 #120e33,-2px 0 #120e33,0 2px #120e33,0 -2px #120e33,0 3px 0 #120e33}
.stars{display:flex;gap:1px;margin:2px 0;color:#ffd76a;font-size:14px;text-shadow:0 1px 0 #7a4a00}
.stars i{font-style:normal;animation:pop .3s cubic-bezier(.34,1.56,.64,1) both}
.stars i:nth-child(2){animation-delay:.08s}
.stars i:nth-child(3){animation-delay:.16s}
.stars i:nth-child(4){animation-delay:.24s}
.stars i:nth-child(5){animation-delay:.32s}
p{margin:0 0 8px;color:#c9c2ff}
.bt{display:flex;flex-wrap:wrap;gap:8px}
.k{height:32px;padding:0 16px;border:0;border-radius:10px;font:inherit;font-size:14px;font-weight:900;cursor:pointer;transition:transform .08s,box-shadow .08s}
.pri{background:linear-gradient(#ffe27a,#ffb020);color:#4a2300;box-shadow:inset 0 2px 0 rgba(255,255,255,.6),0 4px 0 #c97a00,0 6px 10px rgba(0,0,0,.35)}
.sec{background:linear-gradient(#a6d4ff,#6fb6ff);color:#0b2a66;box-shadow:inset 0 2px 0 rgba(255,255,255,.6),0 4px 0 #2f6fe0,0 6px 10px rgba(0,0,0,.35)}
.k:hover,.rs button:hover{filter:brightness(1.08)}
.pri:active{transform:translateY(3px);box-shadow:inset 0 2px 0 rgba(255,255,255,.6),0 1px 0 #c97a00}
.sec:active{transform:translateY(3px);box-shadow:inset 0 2px 0 rgba(255,255,255,.6),0 1px 0 #2f6fe0}
button:focus-visible{outline:2px solid #fff;outline-offset:3px}
.msg{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
@keyframes rot{to{transform:rotate(1turn)}
}
@keyframes pop{from{transform:scale(.6);opacity:0}
}
@keyframes sh{0%{transform:translateX(-60%)}
20%,100%{transform:translateX(60%)}
}
@container (max-width:300px){.rs.en{display:none}
.k{padding:0 12px}
}
@container (min-height:260px){.s{padding:12px 20px 18px}
.rs{height:28px}
.rs svg{width:20px;height:20px}
.main{gap:28px;padding-left:24px}
.cd{width:150px}
.stars{font-size:20px}
p{font-size:14px}
.k{height:42px;padding:0 24px;font-size:16px}
}
@media (prefers-reduced-motion:reduce){.ray,.cd,.cd::after,.stars i{animation:none}
.k{transition:none}
}
</style>

<div class="s">
  <div class="ray" aria-hidden="true"></div>
  <div class="bar">
    <span class="rs"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="7" fill="#ffc93c" stroke="#b36b00"/><path d="M8 4v8M6 6h3a1.5 1.5 0 0 1 0 3H7" fill="none" stroke="#7a4a00" stroke-width="1.4"/></svg><b>128.4万</b><button type="button" aria-label="购买金币">+</button></span>
    <span class="rs"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2h8l3 4-7 9-7-9z" fill="#4aa3ff" stroke="#0b2a66"/><path d="M1 6h14M5 2l3 13 3-13" fill="none" stroke="#a6d4ff" stroke-width=".8"/></svg><b>2,360</b><button type="button" aria-label="购买钻石">+</button></span>
    <span class="rs en"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M9 1 3 9h4l-1 6 6-8H8z" fill="#8fe38f" stroke="#0c3a14" stroke-linejoin="round"/></svg><b>86/120</b></span>
  </div>
  <div class="main">
    <div class="cd" role="img" aria-label="SSR 星辉之剑卡面">
      <span class="rr">SSR</span>
      <i class="gm" style="right:4px;top:4px"></i><i class="gm" style="left:4px;bottom:4px"></i><i class="gm" style="right:4px;bottom:4px"></i>
      <svg viewBox="0 0 60 80" aria-hidden="true"><circle cx="30" cy="34" r="22" fill="#ffc93c" opacity=".25"/><path d="M30 6l6 8v34h-12V14z" fill="#e6f1ff" stroke="#4aa3ff" stroke-width="2"/><path d="M30 10v36" stroke="#a6d4ff" stroke-width="2"/><path d="M16 48h28v5H16z" fill="#ffc93c" stroke="#7a4a00" stroke-width="1.5"/><path d="M27 53h6v14h-6z" fill="#b46bff"/><circle cx="30" cy="70" r="4" fill="#ffc93c" stroke="#7a4a00" stroke-width="1.5"/></svg>
    </div>
    <div class="info">
      <small>恭喜获得</small>
      <h1>星辉之剑</h1>
      <div class="stars" role="img" aria-label="五星"><i>★</i><i>★</i><i>★</i><i>★</i><i>★</i></div>
      <p>攻击 +1,280 · 暴击 +12%</p>
      <div class="bt"><button type="button" class="k pri">领取</button><button type="button" class="k sec">再抽 ×10</button></div>
    </div>
  </div>
  <p class="msg" role="status"></p>
</div>

<script type="module">
export default function demo(root) {
  const msg = root.querySelector('.msg'), pri = root.querySelector('.pri');
  pri.onclick = () => { pri.textContent = '已领取'; msg.textContent = '星辉之剑已放入背包'; };
  root.querySelector('.sec').onclick = () => { msg.textContent = '消耗 1,600 钻石，十连抽开始'; };
  root.querySelectorAll('.rs button').forEach((b) => (b.onclick = () => { msg.textContent = '打开商店：' + b.getAttribute('aria-label').slice(2); }));
}
</script>
