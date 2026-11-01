---
zh: 滚动渐显
en: Scroll reveal
order: 20
tab: 滚动渐显
---

## 是什么

内容滚动到视口里时才轻轻淡入上移，一组卡片依次出现。

## 适合

官网里真正成组出现的列表（不要给每个区块都加）。

## 注意

最容易被滥用的效果；全页只给一两组列表用。

## 提示词

给{一组功能卡片}加「滚动渐显」：卡片进入视口 15% 时从下方 20px 淡入上移到位，500ms，同组相邻错开 80ms，只播一次；用 IntersectionObserver；首屏内容不做；减少动态效果时直接显示。

## 示例

<style>
:host{display:block;height:100%}
.page{position:relative;height:100%;overflow:auto;scrollbar-width:none;background:#f7f5f2;color:#1f2329;font:13px/1.45 system-ui,"PingFang SC",sans-serif}
.page::-webkit-scrollbar{display:none}
.top{min-height:100%;display:grid;align-content:end;gap:4px;padding:16px}
.top b{font-size:16px}
.top p{margin:0;color:#6b6f76;font-size:12px}
.list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;align-content:start;min-height:100%;padding:12px 16px 24px}
article{display:grid;gap:3px;padding:10px 12px;border-radius:12px;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.06);opacity:0;transform:translateY(20px);transition:opacity .5s cubic-bezier(0,0,.2,1),transform .5s cubic-bezier(0,0,.2,1)}
article.in{opacity:1;transform:none}
article i{width:24px;height:24px;margin-bottom:4px;border-radius:7px;background:var(--c)}
article b{font-size:13px}
article span{color:#6b6f76;font-size:11.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
@container (max-width:340px){.list{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (prefers-reduced-motion:reduce){article{opacity:1;transform:none;transition:none}
}
</style>

<div class="page"><div class="top"><b>一个工作台，管好店里的事</b><p>向下滚动，功能卡片依次浮现</p></div><div class="list"><article><i style="--c:#f59e0b"></i><b>订单同步</b><span>多渠道订单汇总</span></article><article><i style="--c:#3b82f6"></i><b>库存预警</b><span>低库存提前提醒</span></article><article><i style="--c:#10b981"></i><b>自动对账</b><span>每晚核对账单差异</span></article><article><i style="--c:#ec4899"></i><b>发货规则</b><span>按地区自动选快递</span></article><article><i style="--c:#8b5cf6"></i><b>会员分层</b><span>按消费频次自动打标</span></article><article><i style="--c:#f97316"></i><b>经营日报</b><span>每天早上八点推送</span></article></div></div>

<script type="module">
export default function demo(root) {
  const page = root.querySelector('.page'), still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // 同一批进入视口的卡片按先后错开 80ms，只播一次
  const io = new IntersectionObserver((es) => es.filter((e) => e.isIntersecting).forEach((e, k) => { e.target.style.transitionDelay = k * 80 + 'ms'; e.target.classList.add('in'); io.unobserve(e.target); }), { root: page, threshold: .15 });
  root.querySelectorAll('article').forEach((a) => io.observe(a));
  // 自动演示：从首屏滚到列表顶部，前几张依次浮现
  setTimeout(() => { if (root.host.isConnected) page.scrollTo({ top: page.clientHeight, behavior: still ? 'auto' : 'smooth' }); }, 300);
}
</script>
