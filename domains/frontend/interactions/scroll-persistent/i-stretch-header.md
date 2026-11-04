---
zh: 下拉放大头图
en: Stretchy header
order: 20
---

## 是什么

详情页顶部是一张头图。已经滚到顶还继续往下拉时，头图以顶边为原点跟着放大，正好填满拉出来的空隙，压在图上的标题慢慢淡出；松手后带一点阻尼弹回原样。往上滚时头图照常跟着内容滚走。

## 适合

移动端里头图有分量的详情页：个人主页、店铺、歌单、目的地、活动详情。

## 不适合

后台和表单页；桌面端没有下拉过度滚动的手势，头图保持静态；页面顶部已经有「下拉刷新」时二选一。

## 注意

效果靠“顶部过度滚动”触发：iOS Safari 自带回弹，直接读负的 scrollTop；其他浏览器在 scrollTop 为 0 时用触摸事件自己算下拉距离并加阻尼。滚动容器设 overscroll-behavior-y: none，关掉浏览器自己的回弹和下拉刷新，两套效果才不会叠在一起。

## 要点

- 放大比例 = 1 + 下拉距离 ÷ 头图高度，上限约 1.4；transform-origin 设在顶边中点，只动 transform，放大后的左右溢出由头图外框裁掉
- 自己计算下拉时加阻尼：实际位移 ≈ 手指位移 × 0.45，越往下越拉不动
- 叠在图上的标题和简介透明度 = 1 − 下拉距离 ÷ 120px；返回、分享这类常驻按钮留在原位，不跟着淡出
- 跟手时不加过渡；松手 300ms 弹回（cubic-bezier(.2,.8,.2,1)），弹回途中再按住可以接着拉
- 往上滚时头图跟着内容走，想要层次感可以让头图慢半拍，见「视差滚动」；头图滚走后接「大标题收成导航栏」那样的紧凑导航栏
- 头图是装饰，读屏和键盘操作不受影响；图片照常写 alt
- 减少动态效果时不放大，只让内容正常回弹

## 提示词

给{详情页}的头图加「下拉放大头图」：滚动容器 overscroll-behavior-y: none；页面滚到顶后继续下拉时，头图以顶边中点为原点放大，比例 = 1 + 下拉距离 ÷ 头图高度（上限 1.4），正好填满拉出的空隙，左右溢出由头图外框裁掉；iOS 直接读负的 scrollTop，其他浏览器在 scrollTop 为 0 时用 touchmove 计算下拉距离并加 0.45 的阻尼；叠在图上的标题透明度 = 1 − 下拉距离 ÷ 120px，返回等常驻按钮不动；跟手时无过渡，松手 300ms 弹回；往上滚时头图正常滚走；只动 transform 和 opacity，减少动态效果时不放大。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{background:#e9ecf1}
.scr{position:relative;height:100%;max-width:380px;margin:0 auto;background:#fff;overflow:hidden}
.pg{height:100%;overflow-y:auto;overscroll-behavior-y:none;scrollbar-width:none;outline-offset:-2px;user-select:none}
.pg::-webkit-scrollbar{display:none}
.hero{position:relative;height:clamp(96px,54%,190px)}
.img{position:absolute;inset:0;transform-origin:50% 0;background:#9cc3e6}
.img svg{display:block;width:100%;height:100%}
.img::after{content:"";position:absolute;inset:0;background:linear-gradient(transparent 45%,rgba(10,20,30,.55))}
.cap{position:absolute;left:14px;right:14px;bottom:10px;color:#fff}
.cap b{display:block;font-size:17px;line-height:1.3}
.cap small{font-size:12px;opacity:.9}
.body{position:relative;background:#fff}
.tip{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:0;padding:8px 14px;color:#5b616e;font-size:12px;border-bottom:1px solid #eef0f3}
.tip .ctl{height:28px;padding:0 10px;font-size:12px}
.rows{list-style:none;margin:0;padding:0 14px 16px}
.rows li{display:flex;justify-content:space-between;gap:12px;padding:9px 0;border-bottom:1px solid #f1f3f6;font-size:13px}
.rows span{color:#5b616e}
.back{position:absolute;left:10px;top:10px;display:grid;place-items:center;width:32px;height:32px;padding:0;border:0;border-radius:50%;background:rgba(15,23,42,.38);color:#fff}
.rel .img,.rel .body{transition:transform .3s cubic-bezier(.2,.8,.2,1)}
.rel .cap{transition:opacity .3s}
</style>

<div class="st"><div class="scr" data-clip>
  <div class="pg" tabindex="0" role="region" aria-label="湖边小屋详情">
    <header class="hero">
      <div class="img" role="img" aria-label="湖边小屋插画：远山、湖面和木屋"><svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fb2df"/><stop offset="1" stop-color="#f3d9b8"/></linearGradient></defs><rect width="400" height="220" fill="url(#sk)"/><circle cx="300" cy="78" r="22" fill="#fbe7c2"/><path d="M0 140 90 70l60 48 70-62 90 80 90-40v124H0z" fill="#6f8fb0"/><path d="M0 160 70 118l80 40 90-50 160 70v62H0z" fill="#4f6f8f"/><rect y="168" width="400" height="52" fill="#3e5f80"/><path d="M60 168h46v-20l-23-16-23 16z" fill="#8b5a3c"/><rect x="76" y="154" width="12" height="14" fill="#f6d28b"/></svg></div>
      <div class="cap"><b>北岸湖边小屋</b><small>可住 4 人 · 距市区 42 公里</small></div>
    </header>
    <div class="body">
      <p class="tip">在顶部按住往下拉<button type="button" class="ctl">演示下拉</button></p>
      <ul class="rows"><li><span>入住</span>15:00 以后</li><li><span>退房</span>次日 12:00 以前</li><li><span>设施</span>壁炉 · 露台 · 独立厨房</li><li><span>评分</span>4.8（126 条）</li><li><span>取消</span>入住前 3 天免费</li></ul>
    </div>
  </div>
  <button type="button" class="back" aria-label="返回"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 3.5 5.5 8l4.5 4.5"/></svg></button>
</div></div>

<script type="module">
export default function demo(root) {
  const scr = root.querySelector('.scr'), pg = root.querySelector('.pg'), hero = root.querySelector('.hero'), img = root.querySelector('.img'), cap = root.querySelector('.cap'), body = root.querySelector('.body');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let d = 0, startY = null, base = 0, busy = false;
  // 头图以顶边为原点放大，正好填满内容被拉下来的空隙
  const apply = () => {
    const H = hero.offsetHeight;
    img.style.transform = still ? '' : `scale(${1 + d / H})`;
    body.style.transform = `translateY(${d}px)`;
    cap.style.opacity = still ? '' : String(Math.max(0, 1 - d / 120));
  };
  const max = () => hero.offsetHeight * 0.4;
  const press = (y) => { base = new DOMMatrixReadOnly(getComputedStyle(body).transform).m42; scr.classList.remove('rel'); d = base; apply(); startY = y; };
  const drag = (y) => { d = Math.max(0, Math.min(max(), base + (y - startY) * 0.45)); apply(); };
  const release = () => { startY = null; scr.classList.add('rel'); d = 0; apply(); };

  pg.addEventListener('touchstart', (e) => { if (pg.scrollTop <= 0) press(e.touches[0].clientY); }, { passive: true });
  pg.addEventListener('touchmove', (e) => {
    if (startY === null) return;
    const y = e.touches[0].clientY;
    if (y > startY && pg.scrollTop <= 0) { e.preventDefault(); drag(y); } else if (d === 0) startY = null;
  }, { passive: false });
  pg.addEventListener('touchend', () => startY !== null && release());
  pg.addEventListener('touchcancel', () => startY !== null && release());
  // 桌面：鼠标在顶部按住往下拖，方便在电脑上看效果
  pg.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || pg.scrollTop > 0 || e.target.closest('button')) return;
    e.preventDefault(); pg.setPointerCapture(e.pointerId); press(e.clientY);
    const mv = (ev) => drag(ev.clientY), up = () => { pg.removeEventListener('pointermove', mv); release(); };
    pg.addEventListener('pointermove', mv); pg.addEventListener('pointerup', up, { once: true }); pg.addEventListener('pointercancel', up, { once: true });
  });

  // 演示：拉下约 0.35 个头图高度，停一下再松手
  const show = () => {
    if (busy || !root.host.isConnected) return; busy = true;
    pg.scrollTop = 0; scr.classList.remove('rel');
    const to = hero.offsetHeight * 0.35, t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / 380); d = to * (1 - (1 - k) ** 3); apply();
      if (k < 1) requestAnimationFrame(step); else setTimeout(() => { release(); busy = false; }, 500);
    };
    requestAnimationFrame(step);
  };
  root.querySelector('.ctl').addEventListener('click', show);
  if (!still) setTimeout(show, 500);
}
</script>
