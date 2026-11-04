---
zh: 按住滑过选工具
en: Scrub-to-select toolbar
aka: 滑动工具栏 手指滑选 滑动选择图标 scrub toolbar
order: 52
of: dock-magnify
tab: 手指滑选
---

## 是什么

手机上的一排工具图标，手指按住后左右滑过，经过的图标放大浮起、上方的名称实时换成它，松手就选中；不用抬手一个个点。

## 适合

手机上的编辑器工具条（画笔、橡皮、文字、贴纸）、长按消息弹出的表情回应条、相机的拍摄模式条：5–8 个同类工具，切换很频繁。

## 不适合

页面之间的导航：底部标签栏点一下就换页，用不着滑选；桌面端用鼠标的入口用「靠近就放大的图标栏」；工具多到要横向滚动时，滑选和滚动抢同一个手势，改成分组或二级面板。

## 注意

手指一按下就要接住这次触摸：setPointerCapture 加上工具条的 touch-action: none，否则手指一动浏览器就当成滚动、发来 pointercancel，滑选中途断掉。滑过的图标只是预览，松手那一下才算选中。

## 要点

- 按下即开始：pointerdown 后 setPointerCapture，工具条设 touch-action: none、user-select: none、-webkit-touch-callout: none（长按不弹系统菜单）；按下那一刻就高亮手指下的图标，不等移动
- 当前图标：按手指的 x 找最近的图标中心，中心用静止布局（offsetLeft）算，不读放大后的位置；滑出两端时停在首尾那个
- 放大：当前图标用 transform 放大到 1.3–1.5 倍并上移 8–12px（transform-origin 在底部），左右邻居 1.1 倍左右、再远一个 1.04 倍；只动 transform，工具条宽度和每个图标的点击区不变；过渡约 100ms
- 名称气泡浮在放大后的图标上方 6–8px，位置和文字随当前图标实时换，不做淡入淡出；气泡 aria-hidden
- 触感：换到新图标时调用 navigator.vibrate?.(5)，同一个图标上不重复震；不支持的浏览器直接跳过
- 松手和取消：在范围内松手就选中当前图标并收起；手指离开工具条上下 40px 以外取消高亮，此时松手不改选择，回到范围内恢复；pointercancel 一律当取消；按下不动直接松手同样选中
- 键盘和读屏：工具条 role="toolbar"，图标是带 aria-label、aria-pressed 的按钮，用 roving tabindex；←/→ 移动焦点（聚焦的图标同样浮起、显示名称），Enter / 空格选中；选中和取消用 role="status" 播报
- 减少动态效果时只改高亮底色，不放大、不上移，名称气泡直接换字

## 提示词

给{产品}手机端的{工具条}加「按住滑过选工具」：{工具数}个图标（基础 44px）横排，工具条设 touch-action: none、user-select: none、-webkit-touch-callout: none；pointerdown 时 setPointerCapture 并立刻高亮手指下的图标；pointermove 按手指 x 找最近的图标中心（用 offsetLeft 算的静止位置），当前图标用 transform 放大到 1.4 倍、上移 10px，左右邻居 1.1 倍，过渡 100ms；名称气泡浮在当前图标上方，位置和文字实时换；换到新图标时调用 navigator.vibrate?.(5)；在工具条范围内松手选中当前图标并收起，手指离开工具条上下 40px 以外取消高亮、松手不改选择，pointercancel 也当取消；按下不动直接松手同样选中；工具条 role="toolbar"，图标是带 aria-label 和 aria-pressed 的按钮，←/→ 移动焦点并显示名称，Enter / 空格选中，选中后用 role="status" 播报；减少动态效果时只高亮不放大。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{background:#121419;color:#eef0f4}
.cv{position:absolute;left:12px;right:12px;top:12px;bottom:68px;overflow:hidden;border-radius:12px;background:radial-gradient(circle at 78% 30%,#fff1c4 0 7%,transparent 7.5%),radial-gradient(120% 64% at 28% 104%,#3f6b5a 0 50%,transparent 51%),radial-gradient(110% 72% at 88% 110%,#2d5244 0 52%,transparent 53%),linear-gradient(#8db4ea,#f2cda6)}
.doodle{position:absolute;left:38%;top:24%;width:120px;height:60px;fill:none;stroke:#ff6f91;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.now{position:absolute;left:20px;top:20px;margin:0;padding:2px 8px;border-radius:999px;background:rgba(10,12,16,.62);font-size:12px}
.re{position:absolute;right:20px;top:20px}
.bar{--b:36px;--g:8px;position:absolute;left:50%;bottom:12px;display:flex;gap:var(--g);padding:6px 8px;border-radius:18px;background:#232730;box-shadow:0 6px 18px rgba(0,0,0,.35);transform:translateX(-50%);touch-action:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}
.tl{position:relative;flex:none;display:grid;place-items:center;width:var(--b);height:var(--b);padding:0;border:0;border-radius:12px;background:transparent;color:#c3c8d4;transform:translateY(var(--y,0px)) scale(var(--s,1));transform-origin:50% 100%;transition:transform .1s cubic-bezier(.2,0,0,1),background-color .1s,color .1s}
.tl svg{width:56%;height:56%;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.tl.hot{z-index:2;background:#3b4150;color:#fff;box-shadow:0 4px 10px rgba(0,0,0,.4)}
.tl[aria-pressed="true"]{background:#4b6bff;color:#fff}
.tl:focus-visible{outline:2px solid #a9b9ff;outline-offset:2px}
.tip{position:absolute;left:0;bottom:calc(100% + var(--b) * .4 + 10px);padding:2px 8px;border-radius:6px;background:#fff;color:#16181d;font-size:12px;font-weight:600;line-height:20px;white-space:nowrap;transform:translateX(calc(var(--x,0px) - 50%));opacity:0;pointer-events:none;transition:opacity .1s,transform .1s}
.scrub .tip{opacity:1}
.finger{position:absolute;left:0;top:50%;z-index:3;width:28px;height:28px;margin:-14px 0 0 -14px;border-radius:50%;background:rgba(255,255,255,.3);box-shadow:0 0 0 2px rgba(255,255,255,.75);transform:translateX(var(--fx,0px));pointer-events:none}
@container (min-height:240px){.cv{left:20px;right:20px;top:20px;bottom:92px}
.doodle{width:180px;height:90px}
.now{left:32px;top:32px;font-size:13px}
.re{right:32px;top:32px}
.bar{--b:44px;--g:12px;bottom:20px;padding:8px 10px;border-radius:20px}
.tip{font-size:13px}
}
</style>

<div class="st"><div class="cv" aria-hidden="true"><svg class="doodle" viewBox="0 0 120 60"><path d="M8 42c12-22 28-28 37-16 7 9-5 19-12 9-8-12 14-27 35-21 14 4 21 16 44 9"/></svg></div><p class="now" role="status">当前：画笔</p><button type="button" class="ctl re">演示滑选</button><div class="bar" role="toolbar" aria-label="绘图工具"><button type="button" class="tl" aria-label="画笔" aria-pressed="true" tabindex="0"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.2-4.4L15.6 5.2a2 2 0 0 1 2.8 0l.4.4a2 2 0 0 1 0 2.8L8.4 18.8z"/><path d="M13.5 7.3l3.2 3.2"/></svg></button><button type="button" class="tl" aria-label="马克笔" aria-pressed="false" tabindex="-1"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 13.5l7-7 4 4-7 7h-4z"/><path d="M4 21h16"/></svg></button><button type="button" class="tl" aria-label="橡皮" aria-pressed="false" tabindex="-1"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 20h12"/><path d="M5 14.5L13.5 6a2 2 0 0 1 2.8 0l2.7 2.7a2 2 0 0 1 0 2.8L11.3 20H8.5z"/><path d="M9 10.5l4.5 4.5"/></svg></button><button type="button" class="tl" aria-label="文字" aria-pressed="false" tabindex="-1"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14M12 6v13M9 19h6"/></svg></button><button type="button" class="tl" aria-label="贴纸" aria-pressed="false" tabindex="-1"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-8-8h3l5 5z"/><path d="M15 4v3a2 2 0 0 0 2 2h3"/></svg></button><button type="button" class="tl" aria-label="裁剪" aria-pressed="false" tabindex="-1"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v13a1 1 0 0 0 1 1h13"/><path d="M3 7h13a1 1 0 0 1 1 1v13"/></svg></button><span class="tip" aria-hidden="true"></span><i class="finger" aria-hidden="true" hidden></i></div></div>

<script type="module">
export default function demo(root) {
  const bar = root.querySelector('.bar'), tls = [...bar.querySelectorAll('.tl')], tip = root.querySelector('.tip'), now = root.querySelector('.now'), finger = root.querySelector('.finger');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const n = tls.length, name = (i) => tls[i].getAttribute('aria-label');
  let sel = 0, hot = -1, d = null, sim = 0;
  // 中心按静止布局算：offsetLeft 不受 transform 影响，图标放大时不会挪
  const cx = (i) => tls[i].offsetLeft + tls[i].offsetWidth / 2;
  const nearest = (x) => tls.reduce((k, _, i) => (Math.abs(cx(i) - x) < Math.abs(cx(k) - x) ? i : k), 0);
  const go = (i, buzz) => {
    if (i === hot) return;
    hot = i;
    if (buzz && i >= 0) navigator.vibrate?.(5);
    tls.forEach((t, j) => {
      const dist = i < 0 ? 9 : Math.abs(j - i);
      t.classList.toggle('hot', dist === 0);
      t.style.setProperty('--s', still ? 1 : [1.4, 1.12, 1.04][dist] ?? 1);
      t.style.setProperty('--y', !still && dist === 0 ? '-10px' : '0px');
    });
    bar.classList.toggle('scrub', i >= 0);
    if (i >= 0) { tip.textContent = name(i); tip.style.setProperty('--x', cx(i) + 'px'); }
  };
  const pick = (i) => {
    sel = i;
    tls.forEach((t, j) => t.setAttribute('aria-pressed', String(j === i)));
    now.textContent = '当前：' + name(i);
  };
  // 手指在工具条上下 40px 以内才算数，出了这个范围取消高亮
  const at = (x, y) => {
    const r = bar.getBoundingClientRect();
    return y < r.top - 40 || y > r.bottom + 40 ? -1 : nearest(x - r.left - bar.clientLeft);
  };
  bar.addEventListener('pointerdown', (e) => {
    if (e.button) return;
    e.preventDefault();
    sim++;
    finger.hidden = true;
    try { bar.setPointerCapture(e.pointerId); } catch {}
    d = { buzz: e.pointerType === 'touch' };
    go(at(e.clientX, e.clientY), d.buzz);
  });
  bar.addEventListener('pointermove', (e) => { if (d) go(at(e.clientX, e.clientY), d.buzz); });
  const end = (ok) => {
    if (!d) return;
    d = null;
    const i = hot;
    go(-1);
    if (ok && i >= 0) pick(i);
    else now.textContent = '已取消，还是' + name(sel);
  };
  bar.addEventListener('pointerup', () => end(true));
  bar.addEventListener('pointercancel', () => end(false));
  tls.forEach((t, i) => {
    t.addEventListener('focus', () => {
      tls.forEach((x) => (x.tabIndex = x === t ? 0 : -1));
      if (!d) go(i);
    });
    t.addEventListener('keydown', (e) => {
      const j = { ArrowLeft: (i + n - 1) % n, ArrowRight: (i + 1) % n, Home: 0, End: n - 1 }[e.key];
      if (j === undefined) return;
      e.preventDefault();
      tls[j].focus();
    });
    // 键盘的 Enter / 空格触发的 click 没有点击次数（detail 为 0）；指针点按已在 pointerup 里选过
    t.addEventListener('click', (e) => { if (e.detail === 0) pick(i); });
  });
  bar.addEventListener('focusout', (e) => { if (!d && !bar.contains(e.relatedTarget)) go(-1); });
  // 演示：一根“手指”按在画笔上，滑到文字停一下，松手选中
  const run = () => {
    if (still) return;
    const id = ++sim, a = cx(0), z = cx(3), t0 = performance.now();
    const put = (x) => { finger.style.setProperty('--fx', x + 'px'); go(nearest(x)); };
    pick(0);
    finger.hidden = false;
    put(a);
    const step = (t) => {
      if (id !== sim || !root.host.isConnected) return;
      const k = Math.min(1, Math.max(0, (t - t0 - 250) / 1000)), e = k < 0.5 ? 2 * k * k : 1 - (2 - 2 * k) ** 2 / 2;
      put(a + (z - a) * e);
      if (k < 1) return requestAnimationFrame(step);
      setTimeout(() => {
        if (id !== sim || !root.host.isConnected) return;
        finger.hidden = true;
        const i = hot;
        go(-1);
        pick(i);
      }, 700);
    };
    requestAnimationFrame(step);
  };
  root.querySelector('.re').addEventListener('click', run);
  setTimeout(() => root.host.isConnected && run(), 400);
}
</script>
