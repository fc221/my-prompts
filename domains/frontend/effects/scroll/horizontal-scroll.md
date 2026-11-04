---
zh: 横向滚动区
en: Pinned horizontal scroll
order: 80
---

## 是什么

一个区块钉在视口里，继续向下滚动时里面的卡片整体向左平移，最后一张走完才继续往下。

## 适合

官网里的“三步上手”、案例或产品线展示，内容 3–6 张卡片。

## 注意

会改变用户的滚动方向，一页最多一处；卡片里不要放需要细读的长文字。

## 提示词

把{3–6 张步骤或案例卡片}做成「横向滚动区」：区块钉在视口里（position: sticky），用户继续向下滚动时卡片整体向左平移，最后一张走完再放开继续向下；平移量 = 卡片总宽 − 视口宽，外层高度 = 视口高 + 平移量；底部细进度条显示走到哪；只动 transform；窄于 768px 和减少动态效果时改成普通的横向滑动列表（scroll-snap），卡片能用 Tab 依次聚焦。

## 示例

<style>
:host{display:block;height:100%}
.page{height:100%;overflow:auto;background:#f4f5f7;color:#1f2329;font:13px/1.5 system-ui,"PingFang SC",sans-serif}
.hint{height:120px;margin:0;display:grid;place-items:center;color:#6b6f76}
.stick{position:sticky;top:0;display:flex;flex-direction:column;justify-content:center;gap:12px;overflow:hidden}
.t{padding:0 24px;font-size:15px}
.track{display:flex;gap:12px;padding:0 24px;will-change:transform}
article{flex:none;display:grid;gap:4px;width:200px;padding:16px;border-radius:14px;background:#fff;box-shadow:0 2px 10px rgba(15,23,42,.07)}
article em{font-style:normal;color:#2563eb;font-weight:700}
article span{color:#5b616e}
.bar{height:3px;margin:4px 24px 0;border-radius:2px;background:#dfe3ea;overflow:hidden}
.bar i{display:block;height:100%;width:100%;background:#2563eb;transform-origin:left;transform:scaleX(0)}
.static .pin{height:auto!important}
.static .stick{position:static;height:auto!important;padding:16px 0}
.static .track{overflow-x:auto;scroll-snap-type:x mandatory;transform:none!important}
.static article{scroll-snap-align:start}
.static .bar{display:none}
article:focus-visible{outline:2px solid #2563eb;outline-offset:2px}
</style>

<div class="page"><p class="hint">向下滚动，卡片会横向移动</p><section class="pin"><div class="stick"><b class="t">三步接入 MyPrompts</b><div class="track"><article tabindex="0"><em>01</em><b>导入订单</b><span>表格或接口导入历史订单</span></article><article tabindex="0"><em>02</em><b>设置发货规则</b><span>按仓库和地区自动分配</span></article><article tabindex="0"><em>03</em><b>接入收款</b><span>绑定账户，自动对账</span></article><article tabindex="0"><em>04</em><b>开启经营日报</b><span>每天早上收到昨日数据</span></article><article tabindex="0"><em>05</em><b>邀请同事</b><span>按角色分配权限</span></article></div><span class="bar"><i></i></span></div></section><p class="hint">继续向下</p></div>

<script type="module">
export default function demo(root) {
  const page = root.querySelector('.page'), pin = root.querySelector('.pin'), stick = root.querySelector('.stick'), track = root.querySelector('.track'), bar = root.querySelector('.bar i');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { page.classList.add('static'); return; }
  let dist = 0; const size = () => { stick.style.height = page.clientHeight + 'px'; dist = Math.max(0, track.scrollWidth - stick.clientWidth); pin.style.height = page.clientHeight + dist + 'px'; move(); };
  const move = () => { const p = dist ? Math.min(1, Math.max(0, (page.scrollTop - pin.offsetTop) / dist)) : 0; track.style.transform = `translateX(${-p * dist}px)`; bar.style.transform = `scaleX(${p})`; };
  page.addEventListener('scroll', move, { passive: true }); new ResizeObserver(size).observe(page); size();
}
</script>
