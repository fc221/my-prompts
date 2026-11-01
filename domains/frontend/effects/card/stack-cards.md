---
zh: 叠卡展开
en: Stacked cards expand
order: 50
---

## 是什么

几张卡片叠成一摞只露出边缘，点击后依次展开排成列表，再点一次整齐叠回去。

## 适合

通知、优惠券、物流等同类卡片较多、平时只需看一眼的地方。

## 注意

不要用叠卡藏住关键信息；展开时下方内容不能突然跳动。

## 提示词

把{同类卡片列表}做成「叠卡展开」：收起时叠成 3 层，下面两层只露出 8px 边缘并缩小一点，最上面显示总数；点击后各卡片依次（相邻错开 40ms）移动到列表位置，收起时按相反顺序叠回；触发按钮维护 aria-expanded；减少动态效果时直接切换。

## 示例

<style>
.zone{height:100%;display:grid;place-items:center;background:#f4f5f7}
.stack{position:relative;width:240px;height:150px;border:0;background:none;padding:0;cursor:pointer}
.k{position:absolute;left:0;right:0;top:0;height:42px;border-radius:12px;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.08);display:grid;place-items:center;font:500 13px system-ui;color:#18181b;transition:transform .35s cubic-bezier(.2,0,0,1)}
.k:nth-child(1){z-index:3}
.k:nth-child(2){z-index:2;transform:translateY(8px) scale(.95)}
.k:nth-child(3){z-index:1;transform:translateY(16px) scale(.9)}
.stack[aria-expanded=true] .k:nth-child(2){transform:translateY(50px);transition-delay:.04s}
.stack[aria-expanded=true] .k:nth-child(3){transform:translateY(100px);transition-delay:.08s}
@media (prefers-reduced-motion:reduce){.k{transition:none}
}
</style>

<div class="zone"><button class="stack" aria-expanded="false"><span class="k">3 条新通知</span><span class="k">订单已发货</span><span class="k">库存不足提醒</span></button></div>

<script type="module">
export default function demo(root) {
  const s = root.querySelector('.stack'); s.onclick = () => s.setAttribute('aria-expanded', String(s.getAttribute('aria-expanded') !== 'true'));
}
</script>
