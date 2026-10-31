---
zh: 列表依次进入
en: Staggered list enter
order: 50
---

## 是什么

数据加载好时，骨架屏换成真实内容，列表项从上到下一项接一项轻轻浮现。

## 适合

列表、卡片网格首次加载或切换筛选后；让人看清内容是刚换上的。

## 注意

错开太久会让人干等；超过 8 项不要逐个播。

## 要点

- 切换筛选时分三段：被筛掉的项缩小淡出（150ms），留下的项从旧位置滑到新位置补位（FLIP，约 250ms），新出现的项最后依次进入；留下的项不重新播入场
- 列表和网格互相切换时的位置过渡同理，见「换视图不丢勾选」

## 提示词

数据加载完成后让{列表或卡片网格}「依次进入」：先用骨架屏占位，数据到了替换成真实内容，每项从下方 8px 淡入上移，260ms，相邻错开 40ms，只错开前 8 项（后面的一起出现），整体不超过 600ms；只在首次加载和切换筛选时播；切换筛选时被筛掉的项先缩小淡出（150ms），留下的项用 FLIP 从旧位置滑到新位置（250ms），新出现的项再依次进入；“加载更多”追加的新项不播；减少动态效果时直接显示。

## 示例

<style>
:host{display:block;height:100%}
.st{height:100%;overflow:auto;padding:12px 18px;background:#f5f6f8;color:#1f2329;font:13px/1.5 system-ui,"PingFang SC",sans-serif}
.hd{display:flex;align-items:center;justify-content:space-between;max-width:560px;margin:0 auto 8px}
.ls{list-style:none;max-width:560px;margin:0 auto;padding:0;display:grid;gap:8px}
.ls li{display:flex;align-items:center;gap:10px;height:44px;padding:0 12px;border-radius:10px;background:#fff;box-shadow:0 1px 3px rgba(15,23,42,.06)}
.ls li b{flex:1}
.ls li span{color:#5b616e}
.sk{background:linear-gradient(90deg,#eef0f3 25%,#f7f8fa 50%,#eef0f3 75%)!important;background-size:200% 100%!important;animation:sh 1.2s linear infinite;box-shadow:none!important}
@keyframes sh{to{background-position:-200% 0}
}
.in{animation:up .26s cubic-bezier(0,0,.2,1) both}
@keyframes up{from{opacity:0;transform:translateY(8px)}
}
.av{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:#dbe4ff;color:#3b4ea8;font-size:12px;font-weight:600}
@media (prefers-reduced-motion:reduce){.in,.sk{animation:none}
}
</style>

<div class="st"><div class="hd"><b>最新订单</b><button type="button" class="ctl re">重新加载</button></div><ul class="ls" aria-live="polite" aria-busy="true"></ul></div>

<script type="module">
export default function demo(root) {
  const ls = root.querySelector('.ls'), D = [['林知科技', '¥1,299'], ['陈一鸣', '¥356'], ['杭州云帆', '¥8,420'], ['周以宁', '¥89'], ['星河传媒', '¥2,990']];
  const load = () => { ls.setAttribute('aria-busy', 'true'); ls.innerHTML = '<li class="sk"></li>'.repeat(5); setTimeout(() => { if (!root.host.isConnected) return; ls.innerHTML = D.map((d, i) => `<li class="in" style="animation-delay:${Math.min(i, 7) * 40}ms"><i class="av">${d[0][0]}</i><b>${d[0]}</b><span>${d[1]}</span></li>`).join(''); ls.setAttribute('aria-busy', 'false'); }, 700); };
  root.querySelector('.re').addEventListener('click', load); load();
}
</script>
