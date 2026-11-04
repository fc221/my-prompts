---
zh: 点击与滑动让位
en: Tap vs swipe zones
order: 20
of: f-a11y-target
tab: 点击与滑动
---

## 是什么

可横滑的区域里放按钮时，按钮离滑动边缘留出距离，并给点按约 10px 的位移容差：手指带一点滑动也算点中，不会被当成翻页。

## 适合

横滑卡片里的收藏、加购按钮，标签栏旁的按钮，可左滑删除的列表行里的勾选框，轮播里的“了解更多”。

## 不适合

能把按钮挪出滑动区就挪出去（放到卡片下方或标题行），比调阈值更可靠；地图、画布这类整块可拖动的区域，用长按或单独的工具栏放操作。

## 注意

不要为了防误触把按钮做小或加确认弹窗，先把热区和手势区分开。

## 要点

- 按钮热区离可横滑区域的边缘 ≥ 16px，靠边的按钮往里收或挪到滑动区外
- 按下后位移 < 10px 且 300ms 内抬起算点按；超过 10px 才交给滑动，并取消这次点按
- 判定为滑动后锁定方向：移动约 10px 时判一次，横向位移大于纵向 1.5 倍才横滑，否则交给页面纵向滚动；本次手势内方向不再改变，斜着拖也不会一会儿横一会儿竖
- 用原生横向滚动 + scroll-snap 时，按钮上不再自己处理 pointermove，避免和浏览器手势抢
- 左滑删除的列表里，勾选框、开关放在行首，滑动只从行的右半边起手
- 标签栏、底部导航旁边不放可横滑的内容条，中间至少隔 16px 空白或一条分隔线
- 验收：在 390px 宽下对每个靠边按钮做“带一点滑动的点按”，都应识别成点按

## 提示词

{页面}里有可横滑的{卡片或列表}，上面的{按钮}经常点不中或被当成翻页。请这样改：按钮热区离滑动区边缘 ≥ 16px，靠边的往里收或挪到卡片下方；点按判定：按下后位移 < 10px 且 300ms 内抬起算点按，超过 10px 才交给滑动并取消这次点按；滑动先在移动约 10px 时判一次方向，横向位移大于纵向 1.5 倍才横滑，否则交给页面滚动，判定后本次手势内锁定方向；用原生横向滚动 + scroll-snap，按钮上不自己拦截 pointermove；左滑删除的行，勾选框放行首，滑动只从右半边起手；标签栏旁不放横滑内容。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:10px 14px}
.box{max-width:520px;height:100%;margin:0 auto;display:grid;grid-template-rows:auto 1fr auto;gap:8px}
.top{display:flex;align-items:center;gap:8px}
.top .ctl{flex:none;height:28px;padding:0 10px;font-size:12px}
.seg{flex:1;min-width:0;display:flex;padding:2px;border-radius:8px;background:#e9ecf1}
.seg button{flex:1;min-width:0;height:26px;padding:0 6px;border:0;border-radius:6px;background:none;color:#475467;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.seg [aria-pressed=true]{background:#fff;color:#101828;font-weight:600;box-shadow:0 1px 2px rgba(16,24,40,.1)}
.vp{position:relative;min-height:0;overflow:hidden;touch-action:pan-y;border-radius:12px}
.track{display:flex;gap:12px;height:100%;transition:transform .3s cubic-bezier(.2,.8,.2,1)}
.track.drag{transition:none}
.cd{position:relative;flex:none;display:flex;flex-direction:column;width:190px;height:100%;min-height:104px;padding:0 0 8px;border:1px solid #e3e6eb;border-radius:12px;background:#fff;overflow:hidden}
.ph{flex:1;min-height:40px}
.cd b{padding:6px 10px 0;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.p1{background:linear-gradient(180deg,#1e2a4a,#3b4f7d 60%,#f59e0b 61% 63%,#1e2a4a 64%)}
.p2{background:linear-gradient(180deg,#bfe3f2,#e7f4ee 55%,#5fa58f 56%)}
.p3{background:radial-gradient(circle at 70% 70%,#fde68a 0 12%,transparent 13%),linear-gradient(180deg,#fca5a5,#fdba74 55%,#6b4f6e 56%)}
.p4{background:linear-gradient(90deg,#e7c9a5 0 30%,#c98f62 30% 55%,#efdcc2 55%)}
.fav{position:absolute;right:4px;bottom:4px;height:30px;padding:0 10px;border:1px solid #d0d5dd;border-radius:15px;background:#fff;color:#344054;font-size:12px}
.fav::before{content:"";position:absolute;inset:-7px -4px}
.fav[aria-pressed=true]{border-color:#fedf89;background:#fffaeb;color:#b54708}
.m1 .fav{right:16px;bottom:10px}
.st .fav{outline:2px dashed #f04438;outline-offset:3px}
.m1 .fav{outline-color:#12b76a}
.msg{margin:0;min-height:18px;color:#475467;font-size:12px}
.msg b{color:#b42318}
.msg em{color:#067647;font-style:normal;font-weight:600}
@container (min-height:250px){.cd{width:220px}
}
</style>

<div class="st"><div class="box"><div class="top"><div class="seg" role="group" aria-label="对比"><button type="button" aria-pressed="true" data-m="0">贴边 · 0 容差</button><button type="button" aria-pressed="false" data-m="1">让位 · 10px</button></div><button type="button" class="ctl sim">带一点滑动点按</button></div><div data-clip class="vp"><div class="track"><article class="cd"><i class="ph p1"></i><b>江边夜跑 5 公里</b><button type="button" class="fav" aria-pressed="false" aria-label="想去：江边夜跑 5 公里">♡ 想去</button></article><article class="cd"><i class="ph p2"></i><b>湖边骑行一圈</b><button type="button" class="fav" aria-pressed="false" aria-label="想去：湖边骑行一圈">♡ 想去</button></article><article class="cd"><i class="ph p3"></i><b>山顶看日出</b><button type="button" class="fav" aria-pressed="false" aria-label="想去：山顶看日出">♡ 想去</button></article><article class="cd"><i class="ph p4"></i><b>老街早餐地图</b><button type="button" class="fav" aria-pressed="false" aria-label="想去：老街早餐地图">♡ 想去</button></article></div></div><p class="msg" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const st = root.querySelector('.st'), vp = root.querySelector('.vp'), track = root.querySelector('.track'), msg = root.querySelector('.msg'), cards = [...track.children];
  let mode = 0, x = 0, start = null, dragged = false, ignoreClick = false;
  const step = () => cards[0].offsetWidth + 12, max = () => Math.max(0, track.scrollWidth - vp.clientWidth);
  const put = (v) => { x = Math.max(-max() - 24, Math.min(24, v)); track.style.transform = `translateX(${x}px)`; };
  const snap = () => put(-Math.min(max(), Math.round(-x / step()) * step()));
  const setMode = (m) => { mode = m; st.classList.toggle('m1', m === 1); root.querySelectorAll('.seg button').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.m === m))); msg.textContent = m ? '按钮离卡片边缘 16px，按下后移动不到 10px 仍算点按' : '按钮贴着卡片边缘，按下后只要移动就算滑动'; };
  root.querySelectorAll('.seg button').forEach((b) => b.addEventListener('click', () => setMode(+b.dataset.m)));
  const slop = () => (mode ? 10 : 0);
  track.addEventListener('pointerdown', (e) => { start = { x: e.clientX, y: e.clientY, x0: x, fav: e.target.closest('.fav') }; dragged = false; });
  track.addEventListener('pointermove', (e) => {
    if (!start) return;
    const dx = e.clientX - start.x, dy = e.clientY - start.y;
    if (!dragged && Math.abs(dx) > slop() && Math.abs(dx) > Math.abs(dy) * 1.5) { dragged = true; track.classList.add('drag'); try { track.setPointerCapture(e.pointerId); } catch {} }
    if (dragged) put(start.x0 + dx);
  });
  const end = () => {
    if (!start) return;
    const s = start; start = null; track.classList.remove('drag');
    if (dragged) { ignoreClick = true; const moved = Math.round(Math.abs(x - s.x0)); snap(); if (s.fav) msg.innerHTML = `<b>被当成滑动</b>：卡片挪了 ${moved}px，“想去”没生效`; }
  };
  track.addEventListener('pointerup', end); track.addEventListener('pointercancel', end);
  track.addEventListener('click', (e) => {
    const f = e.target.closest('.fav');
    if (ignoreClick) { ignoreClick = false; e.preventDefault(); return; }
    if (!f) return;
    const on = f.getAttribute('aria-pressed') !== 'true';
    f.setAttribute('aria-pressed', String(on)); f.textContent = on ? '♥ 已想去' : '♡ 想去';
    msg.innerHTML = `<em>识别为点按</em>：${on ? '已加入想去' : '已取消想去'}`;
  });
  // 模拟手指在第一张卡的“想去”按钮上按下、带着 6px 横向位移抬起
  const sim = () => {
    const f = cards[0].querySelector('.fav'), r = f.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2, o = { bubbles: true, pointerId: 1 };
    f.dispatchEvent(new PointerEvent('pointerdown', { ...o, clientX: cx, clientY: cy }));
    f.dispatchEvent(new PointerEvent('pointermove', { ...o, clientX: cx - 6, clientY: cy }));
    f.dispatchEvent(new PointerEvent('pointerup', { ...o, clientX: cx - 6, clientY: cy }));
    f.click();
  };
  root.querySelector('.sim').addEventListener('click', sim);
  setMode(0);
  setTimeout(sim, 500);
}
</script>
