---
zh: 配送进度卡展开
en: Delivery progress reveal
order: 100
---

## 是什么

外卖、快递进度卡平时只显示“约 12 分钟送达”、骑手和联系按钮；点“查看进度”后卡片平滑展开出进度路线，节点依次点亮到当前一步。

## 适合

配送、打车、工单、审批这类“大多时候只关心还要多久，偶尔才想看细节”的状态卡。

## 不适合

要逐条核对的物流明细用单独页面的时间线；只是展开一段长文字用高度平滑展开。

## 注意

收起时也能完成最常做的事（看时间、联系骑手），展开只是补充；节点依次点亮只在展开那一刻播一次。

## 要点

- 收起态只放三样：预计时间（最大字号）、骑手或承运方、联系按钮。
- “查看进度”带 aria-expanded 和 aria-controls，展开后文字改为“收起进度”，箭头转 180°。
- 展开用 grid-template-rows 0fr → 1fr，约 260ms 减速曲线，内层 min-height: 0；收起后内容 visibility: hidden。
- 路线 3–4 个节点；展开后连线和节点按 150ms 间隔依次点亮到当前节点，当前节点加一圈光晕，未到的保持灰色。
- 卡片贴在地图底部时向上长高，不推挤别的内容；节点文字写明状态（“配送中”），不只靠颜色。
- 关键状态变化（骑手已到楼下）用 role="status" 播报一次，位置刷新不播。
- 减少动态效果时直接展开，节点同时点亮。

## 提示词

给{配送进度卡}做「按需展开」：收起时只显示预计送达时间（最大字号）、{骑手信息}和联系按钮；点“查看进度”（带 aria-expanded / aria-controls，展开后变“收起进度”）后卡片用 grid-template-rows 0fr → 1fr 平滑展开（260ms 减速），露出 {节点数} 个节点的进度路线，连线和节点按 150ms 间隔依次点亮到当前节点，当前节点加光晕；收起后内容 visibility: hidden；卡片贴底时向上长高；关键状态变化用 role="status" 播报一次；减少动态效果时直接展开、节点同时点亮。

## 示例

<link rel="stylesheet" href="../../_shared/app-control-base.css">
<style>
.map{position:absolute;inset:0;background:radial-gradient(circle at 80% 26%,#d3ead6 0 30px,transparent 31px),repeating-linear-gradient(0deg,transparent 0 34px,#f8fafb 34px 40px),repeating-linear-gradient(90deg,transparent 0 50px,#f8fafb 50px 56px),#e3e9ee}
.map svg{display:block;width:100%;height:100%}
.map path{fill:none;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}
.dn{stroke:#3b5bdb}
.td{stroke:#8da2ee;stroke-dasharray:2 7}
.shop{fill:#fff;stroke:#3b5bdb;stroke-width:3}
.home{fill:#e8590c;stroke:#fff;stroke-width:2}
.rider{fill:#3b5bdb;stroke:#fff;stroke-width:3}
.cd{position:absolute;left:8px;right:8px;bottom:8px;max-width:420px;margin:0 auto;padding:12px 14px 2px;border-radius:16px;background:#fff;box-shadow:0 -2px 12px rgba(16,24,40,.08),0 1px 2px rgba(16,24,40,.06)}
.hd{display:flex;flex-direction:column}
.eta{font-size:18px;line-height:24px}
.sub{display:none;color:#5b616e;font-size:12px}
.rdr{display:flex;align-items:center;gap:10px;margin-top:8px}
.av{flex:none;width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 50% 40%,#fff1e0 0 22%,transparent 23%),radial-gradient(circle at 50% 112%,#f08c00 0 46%,transparent 47%),#ffd8a8}
.who{display:flex;flex-direction:column;flex:1;min-width:0;line-height:18px}
.who b,.who span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.who b{font-size:13px}
.who span{color:#5b616e;font-size:12px}
.call{flex:none;display:inline-flex;align-items:center;gap:4px;height:32px;padding:0 12px;border:1px solid #d5d9e0;border-radius:999px;background:#fff;font-size:13px}
.call:hover{background:#f5f6f8}
.call svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:1.4;stroke-linejoin:round}
.tg{display:flex;align-items:center;justify-content:center;gap:4px;width:100%;height:32px;margin-top:8px;border:0;border-top:1px solid #eef0f3;background:none;color:#3b5bdb;font-size:13px}
.tg svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;transition:transform .26s cubic-bezier(.2,0,0,1)}
.open .tg svg{transform:rotate(180deg)}
.rv{display:grid;grid-template-rows:0fr;transition:grid-template-rows .26s cubic-bezier(.2,0,0,1)}
.rv>div{min-height:0;overflow:hidden;visibility:hidden;transition:visibility 0s .26s}
.open .rv{grid-template-rows:1fr}
.open .rv>div{visibility:visible;transition:none}
.route{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));margin:0;padding:4px 0 10px;list-style:none}
.nd{position:relative;display:flex;flex-direction:column;align-items:center;gap:2px;min-width:0;text-align:center;--t:calc(120ms + var(--d) * 150ms)}
.nd i{position:relative;z-index:1;width:12px;height:12px;border:2px solid #c9ced6;border-radius:50%;background:#fff;transition:background-color .15s,border-color .15s,box-shadow .2s}
.nd+.nd::before,.nd+.nd::after{content:"";position:absolute;top:5px;right:50%;width:100%;height:2px;background:#e3e6eb}
.nd+.nd::after{background:#3b5bdb;transform:scaleX(0);transform-origin:left;transition:transform .15s linear}
.nd b{max-width:100%;overflow:hidden;color:#8a8f99;font-size:12px;font-weight:500;line-height:16px;text-overflow:ellipsis;white-space:nowrap;transition:color .15s}
.nd small{display:none;color:#8a8f99;font-size:11px;line-height:14px}
.open .lit i{border-color:#3b5bdb;background:#3b5bdb;transition-delay:var(--t)}
.open .lit b{color:#1f2329;transition-delay:var(--t)}
.open .lit::after{transform:none;transition-delay:calc(var(--t) - 150ms)}
.open .now i{box-shadow:0 0 0 4px rgba(59,91,219,.2)}
@container (min-height:220px){.sub{display:block}
.nd small{display:block}
.eta{font-size:20px;line-height:28px}
}
</style>

<div class="st"><div class="map" aria-hidden="true"><svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMin slice"><path class="dn" d="M50 46H134V30"/><path class="td" d="M134 30V18H290"/><circle class="shop" cx="50" cy="46" r="5"/><circle class="home" cx="290" cy="18" r="5"/><circle class="rider" cx="134" cy="30" r="6"/></svg></div><section class="cd" aria-label="订单配送进度"><div class="hd"><b class="eta">约 12 分钟送达</b><span class="sub">预计 12:28 前送达 · 骑手正在配送</span></div><div class="rdr"><i class="av" aria-hidden="true"></i><div class="who"><b>骑手 周师傅</b><span>已取餐 · 距你 1.2 km</span></div><button type="button" class="call"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5.2 2.5l1.6 3-1.3 1.1a8 8 0 0 0 3.9 3.9l1.1-1.3 3 1.6-.6 2.3c-.2.5-.7.8-1.2.7A11 11 0 0 1 2.2 4.3c-.1-.5.2-1 .7-1.2z"/></svg><span>联系</span></button></div><button type="button" class="tg" aria-expanded="false" aria-controls="pe-route"><span>查看进度</span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg></button><div class="rv" id="pe-route"><div><ol class="route"><li class="nd lit" style="--d:0"><i></i><b>已接单</b><small>12:02</small></li><li class="nd lit" style="--d:1"><i></i><b>已出餐</b><small>12:11</small></li><li class="nd lit now" style="--d:2" aria-current="step"><i></i><b>配送中</b><small>12:18</small></li><li class="nd" style="--d:3"><i></i><b>送达</b><small>约 12:28</small></li></ol></div></div><p class="sr" role="status"></p></section></div>

<script type="module">
export default function demo(root) {
  const cd = root.querySelector('.cd'), tg = root.querySelector('.tg'), lab = tg.querySelector('span'), call = root.querySelector('.call span'), st = root.querySelector('[role=status]');
  const set = (open) => { cd.classList.toggle('open', open); tg.setAttribute('aria-expanded', String(open)); lab.textContent = open ? '收起进度' : '查看进度'; };
  tg.onclick = () => set(!cd.classList.contains('open'));
  let t = 0;
  root.querySelector('.call').onclick = () => { clearTimeout(t); call.textContent = '呼叫中…'; st.textContent = '正在呼叫周师傅（示例）'; t = setTimeout(() => { call.textContent = '联系'; }, 2000); };
  setTimeout(() => { if (root.host.isConnected) set(true); }, 400);
}
</script>
