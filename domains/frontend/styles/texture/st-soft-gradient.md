---
zh: 柔和渐变
en: Soft gradient
order: 10
---

## 是什么

低饱和的邻近色渐变做底，白色大圆角卡片浮在上面，轻盈温和。

## 适合

消费类 App 官网、效率工具、健康与生活服务、订阅产品落地页。

## 不适合

不要用高饱和蓝紫渐变；渐变不要铺到文字和按钮上，也不要每个区块换一种渐变。

## 要点

- 配色：2–3 个相邻的低饱和色（如蜜桃 #ffd8c2、薄荷 #c8f0e0、天空 #cfe3ff）在浅底上做大半径径向渐变，只用在首屏或一个区块
- 文字放在白色实底卡片或纯色区域上，正文 #1e2235，对比度 ≥ 4.5:1
- 主按钮用深色或品牌色实心胶囊，不用渐变按钮和渐变文字
- 圆角：卡片 20–24px，按钮 999px，内部元素 12px
- 阴影：一层大半径低浓度（0 12px 32px，6–10% 不透明），带一点底色色相
- 版式：首屏居中或左文右卡，留白宽松，区块间距 clamp(56px, 8vw, 112px)
- 动效：渐变色团可以极慢漂移（20s 以上），只动 transform；减少动态效果时静止

## 提示词

把{产品}的{页面}做成柔和渐变风：浅底上用 2–3 个低饱和邻近色（{品牌色}的浅色加邻近色）做大半径径向渐变，只用在首屏；内容放在白色卡片上，圆角 24px，阴影 0 12px 32px、带底色色相、约 8% 浓度；主按钮为深色实心胶囊，不用渐变按钮和渐变文字；正文 #1e2235、16px / 1.7；色团可 24s 极慢漂移，只动 transform，减少动态效果时静止；窄屏卡片满宽；文字对比度 ≥ 4.5:1。

## 示例

<style>
:host{container-type:size}
.s{height:100%;display:flex;align-items:center;justify-content:center;gap:24px;padding:16px 24px;color:#1e2235;font:12px/1.6 system-ui,"PingFang SC",sans-serif;background:radial-gradient(60% 80% at 8% 15%,#ffd8c2,transparent 70%),radial-gradient(50% 70% at 92% 8%,#cfe3ff,transparent 70%),radial-gradient(60% 70% at 70% 105%,#c8f0e0,transparent 70%),#fbfbfd}
.tx{flex:1;min-width:0;max-width:320px}
h1{margin:0;font-size:clamp(20px,11cqh,36px);line-height:1.25;font-weight:700}
p{margin:6px 0 12px;color:#4a5068}
a{display:inline-flex;height:32px;align-items:center;padding:0 16px;border-radius:999px;background:#1e2235;color:#fff;font-weight:600}
.cd{flex:0 0 auto;width:min(160px,40%);display:grid;gap:4px;padding:16px;border-radius:20px;background:#fff;box-shadow:0 12px 32px rgba(60,70,120,.12)}
.cd small{color:#5b6178}
.cd b{font-size:clamp(16px,9cqh,24px);font-variant-numeric:tabular-nums;white-space:nowrap}
.bars{display:flex;align-items:flex-end;gap:6px;height:clamp(32px,20cqh,64px)}
.bars i{flex:1;border-radius:4px;background:#cfe3ff}
.bars i:nth-child(4){background:#1e2235}
.cd span{color:#0f7352;white-space:nowrap}
.cd{padding:14px}
.cd b{font-size:clamp(15px,min(9cqh,6cqw),24px)}
.cd span{white-space:normal}
.cd{width:min(170px,48%)}
h1{font-size:clamp(16px,min(11cqh,6cqw),36px)}
</style>

<div class="s"><div class="tx"><h1>记账，像聊天<br>一样轻松</h1><p>说一句话记一笔，月底出报告</p><a>免费试用</a></div><div class="cd"><small>本月结余</small><b>¥3,280.50</b><div class="bars"><i style="height:40%"></i><i style="height:70%"></i><i style="height:55%"></i><i style="height:90%"></i><i style="height:65%"></i></div><span>比上月多存 ¥420</span></div></div>
