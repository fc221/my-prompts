---
zh: 揭开卡片一角
en: Peel-back corner
aka: 卡片揭角 卷角 翻角看信息 page curl
order: 12
of: sticker-lift
tab: 揭角看背面
---

## 是什么

卡片右下角像纸一样微微翘起，按住拖动时这一角卷得更大，露出藏在下面的信息（使用规则、券码），松手卷回去。

## 适合

优惠券、礼品卡、门票、会员卡上“翻过来才看”的信息，如券码、使用规则、有效期；也适合抽奖结果这类先藏一下的小惊喜。

## 不适合

背面内容多、要整张翻过来读的，用「3D 翻转卡片」；要把整张拿起来挪位置，用「揭起贴纸」。

## 注意

折线保持 45°，只让拖动距离决定折线的位置：手指往哪个方向拖，都投影到对角线上换成揭开量。折线角度跟着手指自由转，每帧都要重新算反射，正面切口和背面三角很容易对不上。

## 要点

- 平时右下角露 12–16px 的小卷角（背面浅色），提示这里能揭；只有角上至少 44×44 的热区接手势（touch-action: none），卡片其他地方照常点击和滚动
- 揭开量 p = 起始值 + (−dx − dy) ÷ 2，限制在 0 到卡片短边；正面 clip-path: polygon(0 0, 100% 0, 100% calc(100% - p), calc(100% - p) 100%, 0 100%) 切掉三角，背面是右下角 p×p 的方块，用 135° 渐变只显示左上一半（角尖浅、折线处深），向正面投 2px 的影
- 藏的信息放在卡片下面同样大小的一层，最要紧的（券码）贴着右下角、越往上越短，揭开一半就先露出来；下层靠折线处画一道渐变阴影，像被翘起的纸挡住了光
- 正面的主要文字放在左半边：揭到最大时，翻过来的背面会盖住右半边
- 拖动时关掉过渡、跟手；松手时揭开超过 60% 停在打开状态（p 等于短边），否则 240–320ms 带一点回弹卷回小卷角；pointercancel 也卷回；点一下卷角同样能打开或收起
- 卡片下方放“查看背面”按钮（aria-expanded，aria-controls 指向下层），点按卷开、再点卷回；下层合上时 aria-hidden，打开后用 role="status" 播报露出的券码
- 减少动态效果时点按直接切换正反面，不做卷角动画

## 提示词

给{产品}的{卡片}加「揭开卡片一角」：右下角平时露一个 14px 的小卷角（背面浅色）；角上 44×44 的热区按住拖动时，把位移投影到对角线上换成揭开量 p = 起始值 + (−dx − dy) ÷ 2，限制在 0 到卡片短边，折线始终 45°；正面用 clip-path 切掉直角边为 p 的三角，背面是右下角 p×p 方块的左上一半（135° 渐变，角尖浅、折线处深，向正面投 2px 的影）；{藏起来的信息}放在卡片下面同样大小的一层，最要紧的{券码}贴着右下角，下层靠折线处加渐变阴影；正面主要文字放左半边；拖动时关掉过渡，松手时揭开超过 60% 停在打开状态，否则 320ms 带一点回弹卷回小卷角，pointercancel 也卷回，点一下卷角同样能打开或收起；卡片下方放“查看背面”按钮（aria-expanded、aria-controls），点按卷开、再点卷回，下层合上时 aria-hidden，打开后用 role="status" 播报露出的券码；减少动态效果时点按直接切换正反面。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{display:flex;flex-direction:column;justify-content:center;gap:12px;padding:12px 16px;background:#ebe4d6}
.cp{--p:14px;--tr:.32s cubic-bezier(.3,1.45,.55,1);position:relative;flex:none;width:100%;max-width:300px;height:120px;margin:0 auto;filter:drop-shadow(0 2px 3px rgba(70,50,20,.2));user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}
.cp.opening{--tr:.32s cubic-bezier(.2,.8,.2,1)}
.cp.drag{--tr:0s}
.back{position:absolute;inset:0;overflow:hidden;border-radius:12px;background:repeating-linear-gradient(-45deg,#f7f2e7 0 6px,#f2ecdf 6px 12px);color:#3f3424}
.back::after{content:"";position:absolute;right:0;bottom:0;width:var(--p);height:var(--p);background:linear-gradient(to top left,transparent 20%,rgba(70,50,20,.22) 50%,transparent 50%);transition:width var(--tr),height var(--tr)}
.note{position:absolute;left:16px;top:12px;margin:0;color:#6a5b45;font-size:12px;line-height:1.6}
.note b{display:block;color:#3f3424;font-size:13px}
.code{position:absolute;right:8px;bottom:8px;display:flex;flex-direction:column;align-items:flex-end;gap:2px}
.code small{color:#6a5b45;font-size:12px;line-height:16px}
.code span{padding:2px 6px;border-radius:6px;background:#fff;box-shadow:inset 0 0 0 1px #d8cab2;font:700 12px/18px ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.04em}
.face{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:12px 16px;border-radius:12px;background:radial-gradient(circle,rgba(255,255,255,.08) 1px,transparent 1.5px) 0 0/10px 10px,linear-gradient(135deg,#237661,#13503f);color:#fff6e4;clip-path:polygon(0 0,100% 0,100% calc(100% - var(--p)),calc(100% - var(--p)) 100%,0 100%);transition:clip-path var(--tr)}
.amt{font-size:28px;font-weight:800;line-height:1.15}
.amt small{margin-right:2px;font-size:16px}
.cond{color:#d4e9de;font-size:12px}
.nm{margin-top:8px;color:#b9ddcd;font-size:12px;letter-spacing:.06em}
.fw{position:absolute;left:calc(100% - var(--p));top:calc(100% - var(--p));width:var(--p);height:var(--p);filter:drop-shadow(-2px -2px 2px rgba(30,25,10,.28));pointer-events:none;transition:left var(--tr),top var(--tr),width var(--tr),height var(--tr)}
.fw i{position:absolute;inset:0;border-top-left-radius:10px;background:linear-gradient(135deg,#fffdf8 0,#f0e8da 36%,#d3c6b0 50%,transparent 50%)}
.grip{position:absolute;right:0;bottom:0;width:clamp(44px,calc(var(--p) + 12px),100%);height:clamp(44px,calc(var(--p) + 12px),100%);touch-action:none;cursor:grab}
.flip .face,.flip .fw,.flip .back::after{visibility:hidden}
.ft{display:flex;align-items:center;gap:12px;width:100%;max-width:300px;margin:0 auto}
.msg{flex:1;min-width:0;margin:0;color:#5f513c;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.peek{flex:none;height:32px;padding:0 12px;border:1px solid #8c7c64;border-radius:6px;background:#fffdf8;color:#3f3424;font-size:13px;font-weight:600}
.peek:hover{background:#fff}
@container (min-height:240px){.cp{max-width:400px;height:180px}
.ft{max-width:400px}
.face{padding:20px 24px}
.amt{font-size:32px}
.amt small{font-size:18px}
.cond,.nm{font-size:13px}
.note{left:20px;top:16px;font-size:13px}
.note b{font-size:14px}
.code{right:12px;bottom:12px}
.code small{font-size:12px;line-height:18px}
.code span{padding:2px 8px;font-size:14px;line-height:22px}
}
</style>

<div class="st"><div class="cp"><div class="back" id="pk-back" aria-hidden="true"><p class="note"><b>使用说明</b>满 99 元可用，每单限用 1 张<br>有效期至 12 月 31 日</p><div class="code"><small>券码</small><span>MP7Q4K27</span></div></div><div class="face"><b class="amt"><small>¥</small>20</b><span class="cond">满 99 元可用</span><span class="nm">MyPrompts 会员券</span></div><i class="fw" aria-hidden="true"><i></i></i><div class="grip" aria-hidden="true"></div></div><div class="ft"><p class="msg" role="status"></p><button type="button" class="peek" aria-expanded="false" aria-controls="pk-back">查看背面</button></div></div>

<script type="module">
export default function demo(root) {
  const cp = root.querySelector('.cp'), grip = root.querySelector('.grip'), back = root.querySelector('.back'), btn = root.querySelector('.peek'), msg = root.querySelector('.msg');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const code = back.querySelector('.code span').textContent;
  const H = () => cp.clientHeight, rest = () => (H() > 150 ? 16 : 14);
  let p = 0, open = false, d = null, sim = 0;
  const set = (v) => { p = v; cp.style.setProperty('--p', v.toFixed(1) + 'px'); };
  // 打开时 p 等于卡片短边（这里就是高度）；减少动态效果时不卷角，直接换成背面
  const show = (o, text) => {
    open = o;
    cp.classList.remove('drag');
    cp.classList.toggle('opening', o);
    cp.classList.toggle('flip', still && o);
    set(o && !still ? H() : rest());
    btn.textContent = o ? '收起' : '查看背面';
    btn.setAttribute('aria-expanded', String(o));
    back.setAttribute('aria-hidden', String(!o));
    msg.textContent = text || (o ? `券码 ${code}，结算时填写` : '已收起');
  };
  grip.addEventListener('pointerdown', (e) => {
    if (e.button) return;
    sim++;
    try { grip.setPointerCapture(e.pointerId); } catch {}
    d = { x: e.clientX, y: e.clientY, p0: p, moved: false };
  });
  grip.addEventListener('pointermove', (e) => {
    if (!d || still) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (!d.moved && Math.hypot(dx, dy) < 4) return;
    d.moved = true;
    cp.classList.add('drag');
    // 往哪拖都投影到对角线上，换成揭开量，折线始终 45°
    set(Math.max(0, Math.min(H(), d.p0 - (dx + dy) / 2)));
  });
  grip.addEventListener('pointerup', () => {
    if (!d) return;
    const moved = d.moved;
    d = null;
    if (!moved) show(!open);
    else if (p > H() * 0.6) show(true);
    else show(false, '揭开超过六成才会停住');
  });
  grip.addEventListener('pointercancel', () => { if (d) { d = null; show(false); } });
  btn.addEventListener('click', () => { sim++; show(!open); });
  new ResizeObserver(() => { if (!d) set(open && !still ? H() : rest()); }).observe(cp);
  // 演示：模拟手指把角揭到七成多再松手，停在打开状态
  const auto = () => {
    const id = ++sim, t0 = performance.now(), from = p, to = H() * 0.74;
    cp.classList.add('drag');
    const step = (now) => {
      if (id !== sim || !root.host.isConnected) return;
      const k = Math.min(1, (now - t0) / 700);
      set(from + (to - from) * (1 - (1 - k) ** 3));
      if (k < 1) requestAnimationFrame(step);
      else setTimeout(() => id === sim && root.host.isConnected && show(true), 160);
    };
    requestAnimationFrame(step);
  };
  show(false, '按住右下角往左上揭开');
  if (!still) setTimeout(() => root.host.isConnected && auto(), 500);
}
</script>
