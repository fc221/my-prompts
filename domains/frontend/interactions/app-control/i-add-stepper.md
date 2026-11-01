---
zh: 加入后原地变加减
en: Add button to stepper
order: 50
---

## 是什么

列表里每件商品右侧一个“加入”，点一下它原地展开成“− 1 +”，接着在原处加减数量；减到 0 收回成“加入”。底部购物车的件数和金额跟着变，角标跳一下。

## 适合

外卖、点单、生鲜、团购这类一次买好几件、在列表里直接定数量的场景。

## 不适合

要先选规格（杯型、尺码、口味）的商品，先弹规格面板，选好再加入；课程、会员这类只能买一份的，用“加入 / 已加入”两态就够。

## 注意

每次点按都立刻更新界面并提交，请求失败时数量退回上一个值并就地说明（做法见「乐观更新」）；连续快点合并成一次请求，按最后的数量提交。

## 要点

- 同一位置、同一高度（32px）：宽度从“加入”过渡到加减器（约 200ms），右边缘不动、向左长出，同一行的商品名不跟着跳
- 数字换值时上下滚一下：加时新数从下方进入，减时从上方进入，等宽数字
- 到库存上限时 + 置灰（aria-disabled，保留焦点），商品名下写“仅剩 2 份”；减到 0 收回“加入”，焦点留在这个按钮上
- − / + 是不小于 32px 的真按钮，名称带商品名（“减少一份 燕麦拿铁”）；数量变化用 role="status" 播报
- 底部合计同步：件数角标 scale 1 → 1.2 → 1 跳一次，金额直接换成新值
- 想让商品“飞进”购物车时，飞行弧线用「选中项飞入收纳堆」里的两层嵌套写法：外层横向匀速、内层纵向缓出，落点角标 +1
- 减少动态效果时去掉宽度过渡和数字滚动，直接换

## 提示词

给{商品列表}每一行右侧做「加入后原地变加减」：默认是 32px 高的“加入”按钮，点一下原地展开成“− 数量 +”（宽度约 200ms 过渡，右边缘不动、向左长出）；数字换值时上下滚动一下（加从下方进、减从上方进），用等宽数字；减到 0 收回“加入”且焦点留在原处；到库存上限时 + 用 aria-disabled 置灰，商品名下写“仅剩 {n} 份”；− / + 的名称带商品名，数量变化用 role="status" 播报；底部购物车的件数角标跳一下（scale 1→1.2→1），金额同步更新；每次点按立刻更新界面，连续快点合并成一次请求，失败时退回上一个数量并就地提示；需要选规格的商品先弹规格面板；减少动态效果时去掉宽度过渡和数字滚动。

## 示例

<link rel="stylesheet" href="../../_shared/app-control-base.css">
<style>
.st{display:flex;flex-direction:column;padding:8px 14px 10px}
.ls{flex:1;display:flex;flex-direction:column;justify-content:center;max-width:440px;width:100%;margin:0 auto}
.it{display:flex;align-items:center;gap:10px;height:44px;border-bottom:1px solid #e9ecf0}
.pic{flex:none;width:30px;height:30px;border-radius:8px}
.nm{flex:1;min-width:0;display:grid;line-height:1.3}
.nm b{overflow:hidden;font-weight:600;white-space:nowrap;text-overflow:ellipsis}
.nm small{color:#5b616e;font-size:12px;font-variant-numeric:tabular-nums}
.nm small em{margin-left:6px;color:#b54708;font-style:normal}
.ad{position:relative;flex:none;width:56px;height:32px;border-radius:999px;background:#2f54d6;transition:width .2s cubic-bezier(.2,.8,.2,1),background-color .2s}
.ad.on{width:96px;background:#edf1ff}
.ad button{position:absolute;top:0;height:32px;padding:0;border:0;border-radius:999px;background:none;font-weight:600}
.pl{right:0;width:100%;color:#fff;transition:width .2s cubic-bezier(.2,.8,.2,1)}
.on .pl{width:32px;color:#2f54d6;font-size:17px}
.pl[aria-disabled=true]{color:#a8b3cf;cursor:not-allowed}
.mi{left:0;width:32px;color:#2f54d6;font-size:17px;visibility:hidden}
.on .mi{visibility:visible}
.n{position:absolute;inset:0 32px;display:grid;place-items:center;overflow:hidden;color:#1f2329;font-weight:600;font-variant-numeric:tabular-nums;visibility:hidden}
.on .n{visibility:visible}
.bar{flex:none;display:flex;align-items:center;gap:10px;max-width:440px;width:100%;height:36px;margin:8px auto 0;padding:0 6px 0 12px;border-radius:999px;background:#1f2329;color:#fff}
.cart{position:relative;display:grid;place-items:center;width:22px;height:22px}
.cart b{position:absolute;top:-5px;right:-8px;min-width:16px;height:16px;padding:0 4px;border-radius:8px;background:#e5484d;font-size:11px;line-height:16px;text-align:center;font-variant-numeric:tabular-nums}
.sum{flex:1;font-weight:600;font-variant-numeric:tabular-nums}
.go{height:28px;padding:0 14px;border:0;border-radius:999px;background:#ffd84d;color:#1f2329;font-weight:600}
.bump{animation:bump .3s}
@keyframes bump{50%{transform:scale(1.2)}
}
@container (max-height:240px){.it{height:38px}
.pic{width:26px;height:26px}
.st{padding-top:2px}
}
@container (max-width:300px){.pic{display:none}
}
</style>

<div class="st">
  <div class="ls">
    <div class="it" data-p="18"><i class="pic" style="background:linear-gradient(140deg,#f3e3c8,#c89b6a)"></i><span class="nm"><b>燕麦拿铁</b><small>¥18</small></span><div class="ad"><button type="button" class="mi">−</button><span class="n" aria-hidden="true"><b>0</b></span><button type="button" class="pl">加入</button></div></div>
    <div class="it" data-p="26"><i class="pic" style="background:linear-gradient(140deg,#d9eabf,#7da35a)"></i><span class="nm"><b>牛油果吐司</b><small>¥26</small></span><div class="ad"><button type="button" class="mi">−</button><span class="n" aria-hidden="true"><b>0</b></span><button type="button" class="pl">加入</button></div></div>
    <div class="it" data-p="22" data-max="2"><i class="pic" style="background:linear-gradient(140deg,#cfd6e6,#4a5a7a)"></i><span class="nm"><b>冷萃</b><small>¥22<em>仅剩 2 份</em></small></span><div class="ad"><button type="button" class="mi">−</button><span class="n" aria-hidden="true"><b>0</b></span><button type="button" class="pl">加入</button></div></div>
  </div>
  <div class="bar"><span class="cart" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2l2.2 10.5h10.6L20 7H6.2"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/></svg><b>0</b></span><span class="sum">¥0</span><button type="button" class="go">去结算</button></div>
  <p class="sr" role="status"></p>
</div>

<script type="module">
export default function demo(root) {
  const items = [...root.querySelectorAll('.it')], badge = root.querySelector('.cart b'), sum = root.querySelector('.sum'), say = root.querySelector('.sr');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const qty = new Map(items.map((it) => [it, 0]));
  const total = () => {
    let n = 0, m = 0; qty.forEach((q, it) => { n += q; m += q * +it.dataset.p; });
    badge.textContent = n; sum.textContent = `¥${m}`;
    badge.classList.remove('bump'); void badge.offsetWidth; if (!still) badge.classList.add('bump');
  };
  const set = (it, q, quiet) => {
    const old = qty.get(it), max = +(it.dataset.max || 99), name = it.querySelector('.nm b').textContent;
    q = Math.max(0, Math.min(max, q)); if (q === old) return;
    qty.set(it, q);
    const ad = it.querySelector('.ad'), pl = it.querySelector('.pl'), num = it.querySelector('.n b');
    const leaving = q === 0 && ad.contains(root.activeElement);
    ad.classList.toggle('on', q > 0);
    pl.textContent = q ? '+' : '加入';
    pl.setAttribute('aria-label', q ? `增加一份 ${name}` : `加入 ${name}`);
    pl.setAttribute('aria-disabled', String(q >= max));
    num.textContent = q;
    if (!still && q && old) num.animate([{ transform: `translateY(${q > old ? 70 : -70}%)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 180, easing: 'ease-out' });
    if (leaving) pl.focus();
    total();
    if (!quiet) say.textContent = q ? `${name} ${q} 份${q >= max ? '，已到库存上限' : ''}` : `已移除 ${name}`;
  };
  items.forEach((it) => {
    it.querySelector('.pl').onclick = (e) => { if (e.currentTarget.getAttribute('aria-disabled') !== 'true') set(it, qty.get(it) + 1); };
    it.querySelector('.mi').onclick = () => set(it, qty.get(it) - 1);
    const name = it.querySelector('.nm b').textContent;
    it.querySelector('.pl').setAttribute('aria-label', `加入 ${name}`); it.querySelector('.mi').setAttribute('aria-label', `减少一份 ${name}`);
  });
  root.querySelector('.go').onclick = () => { say.textContent = '示例里不跳转'; };
  // 自动演示：第一件加到 2，第三件加到上限
  const steps = [[0, 1], [0, 2], [2, 1], [2, 2]];
  steps.forEach(([i, q], k) => setTimeout(() => root.host.isConnected && set(items[i], q, true), 300 + k * 280));
}
</script>
