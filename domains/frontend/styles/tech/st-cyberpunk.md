---
zh: 赛博霓虹
en: Cyberpunk neon
aka: 赛博朋克 cyberpunk 霓虹 故障风 glitch 夜城
order: 40
---

## 是什么

深紫黑底上品红、青、酸黄三色霓虹，切角面板、斜切标签、红青错位的故障标题和发光描边，配一块竖排招牌和城市剪影，像雨夜街头的电子广告。

## 适合

游戏与电竞活动、音乐节和夜场票务、潮牌联名、科幻题材的作品官网、限时活动的倒计时页。

## 不适合

要长期使用的工具和后台、需要信任感的金融医疗；只要极客感、不要夜城氛围的页面，改用「终端命令行」；数据监控大屏用「科幻大屏」；粉紫色夕阳、复古电脑和希腊雕像那种怀旧梦幻感，用「蒸汽波」。

## 注意

霓虹要有暗处才亮：底色压到接近黑、大面积留暗，三种霓虹色加起来不超过画面 15%，每块区域只亮一种颜色。故障效果只给标题和一两处装饰，正文清晰、静止。

## 要点

- 配色：深紫黑底 #0d0221，正文 #f2eaff（17:1），次要 #b9a7d9（9.2:1）；霓虹品红 #ff2a6d、青 #05d9e8、酸黄 #f9f002，主操作只用其中一种，亮色底上一律配 #0d0221 深色字
- 字体：标题用窄而粗的无衬线，推荐 Rajdhani 或 Orbitron 配得意黑，后备 "DIN Alternate"、"Arial Narrow"、"PingFang SC"、sans-serif，800–900、大写英文字距 0.08em；正文系统无衬线 15–16px / 1.6；编号和读数用等宽
- 形状：面板和按钮用 clip-path 切掉对角 10–14px，标签 transform: skewX(-12deg)；圆角 0，描边 1–2px 霓虹色
- 发光：描边加 0 0 12px 同色 40% 不透明的 box-shadow，标题 text-shadow 两层；同屏发光元素不超过 3 个
- 故障标题：用 ::before 和 ::after 复制文字，分别偏移 -2px 品红、+2px 青，配合 clip-path 切片；每 3–4s 抖动一次、每次 200ms 以内
- 装饰：城市剪影、竖排招牌、黄黑斜纹警示条，每屏最多两种；全部 aria-hidden，不压在正文上
- 动效：抖动和霓虹闪烁都用 steps()，闪烁频率低于每秒 3 次；减少动态效果时关掉抖动和闪烁，保留静态发光
- 窄屏：竖排招牌缩小移到右上角或去掉，标题降到 28px，故障偏移改成 1px

## 提示词

把{产品}的{活动页}做成赛博霓虹风：深紫黑底 #0d0221，正文 #f2eaff、次要 #b9a7d9；霓虹品红 #ff2a6d、青 #05d9e8、酸黄 #f9f002 三色加起来不超过画面 15%，主按钮只用 {主色}，亮色底配 #0d0221 深色字；标题用窄粗无衬线（Rajdhani 配得意黑，后备 DIN Alternate、PingFang SC）900，用 ::before / ::after 做 -2px 品红和 +2px 青的错位，每 4s 抖动一次、200ms 以内；面板和按钮用 clip-path 切掉对角 12px，标签 skewX(-12deg)，描边 2px 并加同色 12px 外发光，同屏发光不超过 3 处；首屏右侧放竖排霓虹招牌和城市剪影，底部一条黄黑斜纹（都 aria-hidden）；闪烁和抖动用 steps()、每秒不超过 3 次，减少动态效果时关掉，只留静态发光；窄屏招牌移到右上角并缩小，标题 28px。

## 示例

<style>
:host{container-type:size}
.s{position:relative;height:100%;display:flex;align-items:center;padding:12px 18px 18px;overflow:hidden;background:radial-gradient(70% 60% at 80% 100%,rgba(255,42,109,.28),transparent 70%),linear-gradient(#0d0221 55%,#1a0638);color:#f2eaff;font:12px/1.6 system-ui,"PingFang SC",sans-serif}
.city{position:absolute;left:0;right:0;bottom:8px;height:30%;background:linear-gradient(#ffd60a 0 0) 18% 58%/3px 3px no-repeat,linear-gradient(#05d9e8 0 0) 22% 72%/3px 3px no-repeat,linear-gradient(#ffd60a 0 0) 61% 40%/3px 3px no-repeat,linear-gradient(#ff2a6d 0 0) 66% 64%/3px 3px no-repeat,linear-gradient(#05d9e8 0 0) 88% 50%/3px 3px no-repeat,#08010f;clip-path:polygon(0 100%,0 62%,8% 62%,8% 40%,14% 40%,14% 20%,20% 20%,20% 52%,28% 52%,28% 70%,36% 70%,36% 30%,40% 30%,40% 8%,44% 8%,44% 30%,50% 30%,50% 60%,58% 60%,58% 24%,66% 24%,66% 46%,74% 46%,74% 66%,82% 66%,82% 34%,90% 34%,90% 56%,100% 56%,100% 100%)}
.hz{position:absolute;left:0;right:0;bottom:0;height:8px;background:repeating-linear-gradient(-45deg,#f9f002 0 8px,#0d0221 8px 16px)}
.tx{position:relative;z-index:1;flex:1;min-width:0}
.tg{display:inline-block;padding:0 8px;background:#f9f002;color:#0d0221;font:800 11px/18px ui-monospace,Menlo,monospace;letter-spacing:.08em;transform:skewX(-12deg)}
h1{position:relative;margin:6px 0 2px;font:900 clamp(24px,15cqh,52px)/1.05 "Rajdhani","DIN Alternate","Arial Narrow","PingFang SC",sans-serif;letter-spacing:.04em;text-shadow:0 0 10px rgba(255,42,109,.55)}
h1::before,h1::after{content:attr(data-t);position:absolute;inset:0;pointer-events:none}
h1::before{color:#ff2a6d;transform:translate(-2px,0);clip-path:inset(0 0 55% 0);mix-blend-mode:screen}
h1::after{color:#05d9e8;transform:translate(2px,0);clip-path:inset(55% 0 0 0);mix-blend-mode:screen}
.s.gl h1::before{transform:translate(-5px,-1px);clip-path:inset(10% 0 60% 0)}
.s.gl h1::after{transform:translate(4px,1px);clip-path:inset(62% 0 8% 0)}
.en{margin:0 0 10px;color:#b9a7d9;font:11px/1.5 ui-monospace,Menlo,monospace;letter-spacing:.06em}
.row{display:flex;align-items:center;gap:12px}
.row b{color:#05d9e8;font:800 13px/1 ui-monospace,Menlo,monospace}
button{height:32px;padding:0 18px;border:0;background:#05d9e8;color:#0d0221;font:800 13px/1 system-ui,"PingFang SC",sans-serif;letter-spacing:.06em;clip-path:polygon(12px 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 12px);filter:drop-shadow(0 0 8px rgba(5,217,232,.55));cursor:pointer;transition:background-color .12s steps(2)}
button:hover{background:#f9f002}
button:focus-visible{outline:2px solid #f9f002;outline-offset:3px}
.sg{position:relative;z-index:1;flex:none;align-self:flex-start;margin:4px 4px 0 12px;padding:8px 4px;border:2px solid #ff2a6d;writing-mode:vertical-rl;font:900 clamp(16px,10cqh,30px)/1 "PingFang SC",sans-serif;letter-spacing:.2em;color:#ff4f8b;box-shadow:0 0 12px rgba(255,42,109,.4),inset 0 0 12px rgba(255,42,109,.3);text-shadow:0 0 8px rgba(255,42,109,.8)}
.sg.off{opacity:.55}
@container (max-width:300px){.sg{font-size:14px;padding:6px 3px}
.en{font-size:10px;letter-spacing:0}
h1{font-size:24px}
}
@container (min-height:260px){.s{padding:20px 32px 28px}
.en{font-size:13px}
.tg{font-size:13px;line-height:22px}
button{height:40px;padding:0 24px;font-size:15px}
.row b{font-size:16px}
}
@media (prefers-reduced-motion:reduce){.s.gl h1::before{transform:translate(-2px,0);clip-path:inset(0 0 55% 0)}
.s.gl h1::after{transform:translate(2px,0);clip-path:inset(55% 0 0 0)}
.sg.off{opacity:1}
}
</style>

<div class="s">
  <div class="city" aria-hidden="true"></div><div class="hz" aria-hidden="true"></div>
  <div class="tx">
    <span class="tg">限时 72H</span>
    <h1 data-t="霓虹夜市">霓虹夜市</h1>
    <p class="en">NIGHT MARKET // 第七区 B3 · 23:00</p>
    <div class="row"><button type="button">立即抢票</button><b>¥88</b></div>
  </div>
  <div class="sg" aria-hidden="true">夜城</div>
</div>

<script type="module">
export default function demo(root) {
  const s = root.querySelector('.s'), sg = root.querySelector('.sg');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // 每 3.6s 抖一下标题、招牌闪一下，200ms 内恢复
  const tick = () => {
    if (!root.host.isConnected) return;
    s.classList.add('gl'); sg.classList.add('off');
    setTimeout(() => { s.classList.remove('gl'); sg.classList.remove('off'); }, 160);
    setTimeout(tick, 3600);
  };
  setTimeout(tick, 600);
}
</script>
