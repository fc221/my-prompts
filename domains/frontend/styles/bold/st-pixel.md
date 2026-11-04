---
zh: 复古像素
en: Retro pixel
order: 20
---

## 是什么

8 位游戏机的像素图形、阶梯边框和限定调色板，按钮像游戏菜单。

## 适合

独立游戏、复古主题活动页、开发者彩蛋、怀旧类社区。

## 不适合

中文正文不要用像素字体（小字号难读）；不要全页像素化，正文和表单保持清晰。

## 要点

- 配色：深藏蓝底 #1b1d3a，限定 4–6 色调色板（如亮黄 #f8d838、红 #e04848、青 #38c8a8、白 #f8f8f8），不用渐变
- 形状：直角加 4px 阶梯切角（用多层 box-shadow 或 clip-path），描边取 4px 整像素
- 图形：像素画用 SVG 矩形并加 shape-rendering: crispEdges，或用 image-rendering: pixelated 放大小图，尺寸取 4 的倍数
- 字体：英文和数字可用等宽粗体模拟像素感；中文标题用系统粗体，正文系统字体 16px
- 阴影：硬投影 4px 4px 0，不用模糊阴影
- 动效：steps() 逐帧，光标闪烁、角色两帧踏步；循环离开视口暂停，减少动态效果时停止
- 色块上的文字逐个核对对比度：深底上的红字不够亮时改用亮黄或白

## 提示词

把{游戏名}的{页面}做成复古像素风：深藏蓝底 #1b1d3a，限定 5 色调色板（{品牌色}、亮黄、红、青、白），不用渐变和模糊阴影；按钮和面板直角加 4px 阶梯切角，硬投影 4px 4px 0；像素图标用 SVG 矩形并加 crispEdges；英文数字用等宽粗体，中文用系统粗体，正文 16px；动效用 steps() 逐帧（光标闪烁、两帧踏步），离开视口暂停，减少动态效果时停止；窄屏像素图按整数倍缩放；文字对比度 ≥ 4.5:1。

## 示例

<style>
:host{container-type:size}
.s{position:relative;height:100%;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:24px 20px;overflow:hidden;background:#1b1d3a;color:#f8f8f8;font:700 12px/1.4 ui-monospace,Menlo,monospace}
.s::before{content:"";position:absolute;left:0;top:0;width:2px;height:2px;background:#f8f8f8;box-shadow:60px 40px #f8f8f8,140px 96px #f8d838,220px 30px #f8f8f8,300px 120px #f8f8f8,260px 70px #38c8a8,380px 50px #f8f8f8,460px 110px #f8d838,540px 36px #f8f8f8,620px 90px #f8f8f8,180px 150px #f8f8f8}
.hud{position:absolute;top:10px;left:20px;right:20px;display:flex;justify-content:space-between;align-items:center;color:#f8d838}
.hp{display:flex;gap:4px}
.hp svg{width:14px;height:12px;fill:#e04848;shape-rendering:crispEdges}
.hp .e{fill:#4a4d7a}
h1{position:relative;margin:8px 0 14px;font:900 clamp(20px,12cqh,40px)/1.2 system-ui,"PingFang SC",sans-serif;text-shadow:3px 3px 0 #e04848}
.menu{position:relative;display:flex;gap:20px;padding-left:4px}
button{--c:#f8f8f8;height:28px;padding:0 8px;border:0;background:var(--c);color:#1b1d3a;font:inherit;cursor:pointer;box-shadow:0 -4px 0 var(--c),0 4px 0 var(--c),-4px 0 0 var(--c),4px 0 0 var(--c),4px 8px 0 #0c0d1f,8px 4px 0 #0c0d1f}
button.on{--c:#f8d838}
button:focus-visible{outline:2px dashed #38c8a8;outline-offset:8px}
.slime{position:absolute;right:24px;bottom:16px;width:min(96px,42cqh);shape-rendering:crispEdges;animation:hop .8s steps(1) infinite}
.blink{position:absolute;left:24px;bottom:8px;margin:0;color:#f8d838;animation:bl 1s steps(1) infinite}
@keyframes hop{50%{transform:translateY(-8%)}
}
@keyframes bl{50%{opacity:0}
}
@media (prefers-reduced-motion:reduce){.slime,.blink{animation:none}
}
</style>

<div class="s"><div class="hud"><span>SCORE 001200</span><span class="hp" aria-label="生命 2/3"><svg viewBox="0 0 7 6"><path d="M1 0h2v1h1V0h2v1h1v2H6v1H5v1H4v1H3V5H2V4H1V3H0V1h1z"/></svg><svg viewBox="0 0 7 6"><path d="M1 0h2v1h1V0h2v1h1v2H6v1H5v1H4v1H3V5H2V4H1V3H0V1h1z"/></svg><svg viewBox="0 0 7 6" class="e"><path d="M1 0h2v1h1V0h2v1h1v2H6v1H5v1H4v1H3V5H2V4H1V3H0V1h1z"/></svg></span></div><h1>勇者，<br>该出发了</h1><div class="menu"><button type="button" class="on">▶ 开始游戏</button><button type="button">继续</button></div><svg class="slime" viewBox="0 0 10 8" aria-hidden="true"><path fill="#38c8a8" d="M3 0h4v1h1v1h1v1h1v4H9v1H1V7H0V3h1V2h1V1h1z"/><path fill="#1b1d3a" d="M3 3h1v2H3zM6 3h1v2H6z"/><path fill="#a8f0dc" d="M3 1h2v1H3z"/></svg><p class="blink">PRESS START</p></div>
