---
zh: 色块打卡墙
en: Color tile dashboard
order: 40
of: l-app-home
---

## 是什么

超粗的中英两行标题下，一块饱和色的大色块放今天最重要的数字，其余小色块用同一明度的浅色两列拼满。

## 适合

习惯打卡、健康记录、学习进度、记账这类“看一眼今天进度”的个人工具首页。

## 不适合

指标之间要精确比较时用列表或图表；超过 6 个小块会变成杂乱的色卡墙，低频的收进二级页。

## 注意

只有主块用饱和色，小块同明度、低饱和；每块只放一个数字和一行说明，不塞图表和长文字。

## 要点

- 标题两行：中文 30–34px、900 字重，下面英文 18–20px 粗体，左对齐
- 主色块跨两列，高约 140–160px，放今天最重要的数字（如 8/11）和一个进度环
- 小色块两列、间距 10–12px、圆角 20–22px，拼满矩形不留空洞，最多 4–6 块
- 小块用同一明度的浅色（浅蓝、浅粉、浅绿、浅紫），文字统一深色；只有主块用饱和色
- 每块一行 12–13px 名称 + 一个 20–24px 数字，可选一条细进度条
- 点小块就地打卡，主块的数字和进度环同步变化
- 底部标签栏中间可以放一个深色圆形“+”作为主入口

## 提示词

{产品}首页用「色块打卡墙」：标题两行，中文“{中文标题}”32px、900 字重，下面英文“{英文标题}”20px 粗体，左对齐；下面是两列网格（间距 12px、圆角 22px）：第一块跨两列、用饱和的{主色}，放今天最重要的数字（{核心数字}）和一个进度环；其余 {小块数} 个小块用同一明度的浅色，每块一行名称 + 一个大数字 + 细进度条，拼满不留空洞；点小块就地打卡，主块数字和进度环同步变化（减少动态效果时直接跳到新值）；底部标签栏中间放深色圆形“+”。

## 示例

<link rel="stylesheet" href="../../_shared/app-phone.css">
<style>
.ph{background:#f7f5ef}
.tb{background:#f7f5ef;border-top-color:#ebe7dc}
.ttl{display:grid;margin:12px 20px 0}
.ttl b{font:900 34px/1.1 system-ui,"PingFang SC",sans-serif}
.ttl span{font:800 20px/1.3 system-ui,sans-serif;letter-spacing:-.3px}
.bg{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:16px 16px 0}
.blk{display:grid;align-content:start;gap:2px;min-height:96px;padding:14px;border-radius:22px;text-align:left;color:#15171c}
.blk .lb{font-size:12px;font-weight:600;opacity:.75}
.blk b{font-size:20px;font-variant-numeric:tabular-nums}
.blk .sub{font-size:11px;opacity:.7}
.y{grid-column:1/-1;display:flex;gap:12px;justify-content:space-between;align-items:center;min-height:140px;padding:18px 20px;background:#ffd84d}
.y>div{display:grid;min-width:0}
.y .num{font-size:52px;line-height:1.05;font-weight:900}
.y small{font-size:22px;font-weight:800}
.ring{width:84px;height:84px;flex:none}
.ring .on{transition:stroke-dashoffset .5s cubic-bezier(.2,.8,.2,1)}
.b{background:#cfe6ff}
.p{background:#ffd9e6}
.g{background:#d4f0dc}
.l{background:#e3dcff}
.bar{display:block;height:6px;margin-top:8px;border-radius:3px;background:rgba(0,0,0,.1);overflow:hidden}
.bar i{display:block;height:100%;border-radius:3px;background:#15171c;transform-origin:0 50%;transition:transform .3s}
.wkd{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px;margin:14px 16px 20px;padding:12px;border-radius:20px;background:#fff}
.wkd span{display:grid;place-items:center;height:30px;border-radius:50%;color:#8a8f99;font-size:12px}
.wkd .on{background:#15171c;color:#fff}
</style>

<div class="st"><div class="fr"><div class="ph"><div class="sb" aria-hidden="true"><span>9:41</span><span class="bat"></span></div><div class="scr"><div class="hd"><span class="brand">早上好，林</span><span class="av" aria-hidden="true">林</span></div><p class="ttl"><b>小目标</b><span>Tiny Goals.</span></p><div class="bg"><div class="blk y"><div><span class="lb">今日完成</span><b class="num"><span class="d">8</span><small>/11</small></b><span class="sub">再完成 3 项就全勤</span></div><svg class="ring" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="26" fill="none" stroke="rgba(0,0,0,.12)" stroke-width="7"/><circle class="on" cx="32" cy="32" r="26" fill="none" stroke="#15171c" stroke-width="7" stroke-linecap="round" transform="rotate(-90 32 32)"/><text class="pct" x="32" y="37" text-anchor="middle" font-size="14" font-weight="800">73%</text></svg></div><button type="button" class="blk b" data-k="water"><span class="lb">喝水</span><b><span class="v">6</span> / 8 杯</b><i class="bar"><i></i></i></button><div class="blk p"><span class="lb">阅读</span><b>20 分钟</b><span class="sub">已完成</span></div><div class="blk g"><span class="lb">睡眠</span><b>7.5 小时</b><span class="sub">比昨天多 40 分钟</span></div><div class="blk l"><span class="lb">步数</span><b>8,214</b><span class="sub">目标 10,000</span></div></div><div class="wkd" aria-label="本周打卡：5 天"><span class="on">一</span><span class="on">二</span><span class="on">三</span><span class="on">四</span><span class="on">五</span><span class="">六</span><span class="">日</span></div></div><nav class="tb" aria-label="底部导航"><button type="button" aria-current="page"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11l8-7 8 7v8.5a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z"/></svg>今天</button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>统计</button><button type="button" class="plus" aria-label="新建"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6v12M6 12h12"/></svg></button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.2a4.2 4.2 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/></svg>提醒</button><button type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c1.2-3.8 4.2-5.6 7.5-5.6s6.3 1.8 7.5 5.6"/></svg>我的</button></nav></div></div><ol class="lg" aria-label="版式要点"><li><b>01</b><span>超粗的中英两行标题</span></li><li><b>02</b><span>一块饱和色大块放今天最重要的数字</span></li><li><b>03</b><span>小色块两列拼满，不留空洞</span></li><li><b>04</b><span>小块同一明度的浅色，只有主块饱和</span></li><li><b>05</b><span>点小块打卡，大块数字同步变化</span></li></ol><p class="sr" role="status"></p></div>

<script type="module">
import { fit } from '../../_shared/app-phone.ts';

export default function demo(root) {
  fit(root);
  const w = root.querySelector('[data-k=water]'), v = w.querySelector('.v'), bar = w.querySelector('.bar i'), num = root.querySelector('.num .d'), ring = root.querySelector('.ring .on'), pct = root.querySelector('.pct'), st = root.querySelector('[role=status]');
  const C = 2 * Math.PI * 26, total = 11;
  let water = 6, done = 8;
  ring.style.strokeDasharray = C;
  const paint = () => { v.textContent = water; bar.style.transform = `scaleX(${water / 8})`; num.textContent = done; ring.style.strokeDashoffset = C * (1 - done / total); pct.textContent = Math.round(done / total * 100) + '%'; w.setAttribute('aria-label', water < 8 ? `喝水 ${water} / 8 杯，点一下记一杯` : '喝水 8 / 8 杯，今天已完成'); };
  w.addEventListener('click', () => { if (water >= 8) { st.textContent = '今天的喝水目标已经完成'; return; } water++; if (water === 8) done++; paint(); st.textContent = water === 8 ? `喝水完成，今日完成 ${done} / ${total}` : `已记一杯，${water} / 8`; });
  paint();
}
</script>
