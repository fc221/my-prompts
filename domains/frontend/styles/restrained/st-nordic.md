---
zh: 北欧柔和
en: Nordic soft
aka: 北欧风 斯堪的纳维亚 Scandinavian hygge
order: 60
---

## 是什么

雾白底上铺鼠尾草绿、雾蓝、桦木色这类灰调浅色块，圆头无衬线字、大圆角和拱门形状，配扁平的家具与植物插画，安静又有温度。

## 适合

家居与家具品牌、生活方式电商、母婴用品、咖啡与面包店、记账日程这类日常 App 的官网和商品页。

## 不适合

要大面积留空、只放几个字的品牌故事页，改用「日式留白」；面向企业客户的服务官网，用「企业稳重」；需要照片和人物场景撑起氛围的本地生活页，用「温暖生活方式」。

## 注意

颜色要灰：几个浅色块的饱和度都压在 15–30%，放在一起像同一块布料的不同染色；直接用马卡龙色会变成儿童风。插画不描边，只用调色板里的颜色。

## 要点

- 配色：雾白底 #f1f0eb，炭灰正文 #2e3336（对底 11.2:1），次要 #5d6468（5.3:1）；色块从鼠尾草 #b9c8b4、雾蓝 #c5d3de、桦木 #e3d3bd 里选 2–3 个，木色 #b8916a 只做家具和小点缀；主按钮炭灰实底配白字
- 字体：圆头无衬线，推荐 Nunito 配思源黑体，后备 ui-rounded、"PingFang SC"、"Microsoft YaHei"、sans-serif；标题 600–700、28–44px、行高 1.3，正文 16px / 1.7，价格和数字 600
- 形状：卡片圆角 20–24px，按钮和色板圆点 999px，插画底板用拱门形 border-radius: 999px 999px 16px 16px；不用描边，阴影最多一层 0 6px 16px rgba(46,51,54,.06)
- 插画：扁平几何的拱窗、圆灯罩、细木腿家具、松枝和陶罐，每张 3–5 色，全部取自调色板
- 版式：左文右图或 2–3 列商品卡，卡片间距 24px，区块间距 80–112px；每张卡片一个色块底，相邻卡片换色
- 色板切换：商品颜色用 28px 圆点按钮，选中时加 2px 炭灰外圈、偏移 2px，插画底色跟着换，用 aria-pressed 标出选中项
- 动效：颜色和位置过渡 280ms ease-out，卡片悬停上移 2px；减少动态效果时颜色直接切换、不位移
- 窄屏：改单列、插画在上，标题降到 26px，色板圆点保持 28px 便于点按

## 提示词

把{产品}的{页面}做成北欧柔和风：雾白底 #f1f0eb，炭灰正文 #2e3336、次要 #5d6468，色块从鼠尾草 #b9c8b4、雾蓝 #c5d3de、桦木 #e3d3bd 中选 2–3 个，饱和度保持偏灰，木色 #b8916a 只做点缀；字体用 Nunito 配思源黑体（后备 ui-rounded、PingFang SC、sans-serif），标题 600、clamp(28px, 4vw, 44px)，正文 16px / 1.7；卡片圆角 24px，按钮胶囊形，插画底板做成拱门形（上半圆、下角 16px），不描边，阴影最多 0 6px 16px rgba(46,51,54,.06)；插画用扁平几何的家具、灯和植物，只用调色板里的颜色；{商品}的颜色选项做成 28px 圆点按钮，选中加 2px 炭灰外圈并同步切换插画底色；过渡 280ms ease-out，卡片悬停上移 2px，减少动态效果时直接切换；窄屏单列、插画在上。

## 示例

<style>
:host{container-type:size}
.s{--t:#b9c8b4;height:100%;display:flex;align-items:center;gap:clamp(14px,5cqw,40px);padding:14px clamp(16px,6cqw,48px);background:#f1f0eb;color:#2e3336;font:12px/1.6 ui-rounded,"Nunito","PingFang SC","Microsoft YaHei",sans-serif}
.tx{flex:1;min-width:0}
small{color:#4f6b5a;font-weight:600}
h1{margin:2px 0 4px;font-size:clamp(17px,10.5cqh,36px);line-height:1.3;font-weight:700}
p{margin:0 0 10px;color:#5d6468}
.row{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px}
.row b{font-size:15px;font-weight:700;white-space:nowrap}
.buy{height:30px;padding:0 14px;border:0;border-radius:999px;background:#2e3336;color:#fff;font:inherit;font-weight:600;white-space:nowrap;cursor:pointer;transition:transform .28s ease-out,background-color .28s ease-out}
.buy:hover{background:#454c50;transform:translateY(-2px)}
.art{position:relative;flex:0 0 auto;width:min(136px,40cqw);height:min(160px,82cqh);border-radius:999px 999px 16px 16px;background:var(--t);transition:background-color .28s ease-out}
.art svg{position:absolute;inset:auto 0 0;width:100%}
.sw{position:absolute;left:50%;bottom:-12px;display:flex;gap:4px;padding:4px;border-radius:999px;background:#fff;box-shadow:0 6px 16px rgba(46,51,54,.08);transform:translateX(-50%)}
.sw button{width:20px;height:20px;padding:0;border:0;border-radius:50%;background:var(--c);cursor:pointer;transition:box-shadow .28s ease-out}
.sw button[aria-pressed=true]{box-shadow:0 0 0 2px #fff,0 0 0 4px #2e3336}
button:focus-visible{outline:2px solid #2e3336;outline-offset:3px}
.msg{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
@container (min-height:260px){.art{width:min(190px,30cqw);height:230px}
.sw button{width:28px;height:28px}
.row b{font-size:20px}
.buy{height:36px;padding:0 18px;font-size:14px}
p{font-size:14px}
}
@media (prefers-reduced-motion:reduce){.buy,.art,.sw button{transition:none}
.buy:hover{transform:none}
}
</style>

<div class="s">
  <div class="tx"><small>客厅 · 冬季新品</small><h1>冬天，<br>把灯调暖一点</h1><p>橡木落地灯 · 三档暖光</p><div class="row"><b>¥1,280</b><button type="button" class="buy">加入购物车</button></div></div>
  <div class="art">
    <svg viewBox="0 0 136 150" aria-hidden="true"><ellipse cx="66" cy="140" rx="58" ry="7" fill="#e3d3bd"/><path d="M40 32h36l8 26H32z" fill="#f1f0eb"/><circle cx="58" cy="66" r="16" fill="#f7e7c6" opacity=".6"/><path d="M57 58v80M44 138h26" stroke="#b8916a" stroke-width="3" stroke-linecap="round"/><rect x="86" y="102" width="32" height="6" rx="3" fill="#b8916a"/><path d="M92 108l-4 30M112 108l4 30" stroke="#b8916a" stroke-width="3" stroke-linecap="round"/><path d="M96 102c-2-10 2-16 6-16s8 6 6 16z" fill="#f1f0eb"/><path d="M102 86c0-10-6-14-10-20M102 86c2-9 8-12 12-17" fill="none" stroke="#4f6b5a" stroke-width="2.5" stroke-linecap="round"/></svg>
    <div class="sw"><button type="button" aria-label="鼠尾草绿" aria-pressed="true" style="--c:#b9c8b4"></button><button type="button" aria-label="雾蓝" aria-pressed="false" style="--c:#c5d3de"></button><button type="button" aria-label="桦木" aria-pressed="false" style="--c:#e3d3bd"></button></div>
  </div>
  <p class="msg" role="status"></p>
</div>

<script type="module">
export default function demo(root) {
  const s = root.querySelector('.s'), bs = [...root.querySelectorAll('.sw button')], msg = root.querySelector('.msg');
  bs.forEach((b) => (b.onclick = () => {
    bs.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    s.style.setProperty('--t', b.style.getPropertyValue('--c'));
    msg.textContent = '已选 ' + b.getAttribute('aria-label');
  }));
}
</script>
