---
zh: 揭起贴纸
en: Sticker lift
order: 10
---

## 是什么

页面上的贴纸平时平贴在纸面；按住时一角卷起、露出白色背面，拖动时整张离开纸面、投影变大变虚，松手后在落点重新贴平。

## 适合

阅读打卡页、相册拼贴、个人主页装扮、徽章墙这类可以随手摆放的装饰层。

## 不适合

提交按钮、表单、业务列表里的卡片不要做成贴纸；要精确排先后的内容用「拖拽排序」；只要按住时的立体反馈用「立体分层卡片」。

## 注意

卷起的那一角要先从正面裁掉，再画出背面，不能在完整的贴纸上再叠一块三角形；卷角大小、背面面积和投影都从同一个揭起进度算出来。

## 要点

- 按下后 120–180ms 内卷起一角 12–16px；位移超过 6px 才算拖动，卷角加大到贴纸短边的 25–30%，整张放大 1.04、转 2–4°
- 正面用 clip-path 切掉卷起的三角，背面是沿折线翻过来的同样大小的三角，靠折线一侧深、靠角尖一侧浅；投影贴平时 1–2px，拿起后模糊 8–12px、下移 6–8px
- 拖动时保持按下点相对贴纸的偏移，贴纸跟手、不跳到指针中心；落点超出纸面只推回边内，不弹回起点
- 松手 200ms 内卷角归零、投影收紧，带一下轻按（缩放 1.02 → 1）；pointercancel 时回到拿起前的位置
- 位置只在松手后保存一次，不要每帧写存储；保存失败退回原位并提示；容器尺寸变化时按比例重新放置，不让贴纸跑出纸面
- 贴纸是可聚焦的按钮：Enter / 空格拿起，方向键每次移动 8px（Shift 24px），再按 Enter 贴下、Esc 放回原处；拿起、贴下都用 role="status" 播报位置
- 减少动态效果时不卷角、不转动，只用虚线描边和加深的投影表示“已拿起”

## 提示词

给{产品}的{装饰页面}加「揭起贴纸」：{贴纸}平时平贴在纸面，投影 1–2px；按下时一角在 150ms 内卷起约 14px，正面用 clip-path 切掉这个三角，背面画成沿折线翻过来的三角（折线一侧深、角尖一侧浅）；位移超过 6px 进入拖动，卷角加大到短边的 28%，贴纸放大 1.04、转 3°，投影模糊 10px、下移 8px，按下点相对贴纸的偏移保持不变；松手 200ms 内卷角归零、投影收紧并轻按一下，超出纸面的推回边内，位置只在松手后保存一次，pointercancel 时回到拿起前的位置；贴纸可聚焦，Enter / 空格拿起，方向键移动 8px（Shift 24px），Enter 贴下，Esc 放回，用 role="status" 播报位置；减少动态效果时不卷角不转动，只用虚线描边表示已拿起。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{padding:10px;background:#eadfcd}
.pg{position:relative;height:100%;border-radius:10px;background:radial-gradient(circle,#dccfb8 1px,transparent 1.5px) 7px 7px/14px 14px,#fbf7ef;box-shadow:0 1px 2px rgba(90,60,30,.14),0 8px 20px rgba(90,60,30,.1);overflow:hidden}
.hd{position:absolute;left:14px;top:11px;line-height:1.35;white-space:nowrap}
.hd b{display:block;color:#4a3826;font-size:14px}
.hd small{color:#8a7560;font-size:11px}
.tape{position:absolute;left:50%;top:-5px;width:58px;height:18px;margin-left:-29px;background:repeating-linear-gradient(45deg,rgba(236,158,140,.72) 0 5px,rgba(248,206,192,.72) 5px 10px);transform:rotate(-4deg)}
.msg{position:absolute;left:14px;right:84px;bottom:9px;margin:0;color:#8a7560;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.re{position:absolute;right:8px;bottom:6px;z-index:99;height:28px;padding:0 10px;font-size:12px}
.sk{position:absolute;left:0;top:0;--p:0px;border-radius:12px;touch-action:none;cursor:grab;user-select:none;-webkit-user-select:none;filter:drop-shadow(0 1px 1px rgba(70,45,20,.3));transition:filter .2s,transform .2s cubic-bezier(.2,.8,.2,1)}
.sk.up{cursor:grabbing;transform:scale(1.04) rotate(3deg);filter:drop-shadow(0 8px 9px rgba(70,45,20,.24))}
.sk.auto{transition:filter .2s,transform .2s cubic-bezier(.2,.8,.2,1),left .8s cubic-bezier(.3,.7,.2,1),top .8s cubic-bezier(.3,.7,.2,1)}
.face{position:absolute;inset:0;display:grid;place-items:center;border:3px solid #fff;border-radius:12px;clip-path:polygon(0 0,100% 0,100% calc(100% - var(--p)),calc(100% - var(--p)) 100%,0 100%);transition:clip-path .18s cubic-bezier(.2,.8,.2,1)}
.fw{position:absolute;left:calc(100% - var(--p));top:calc(100% - var(--p));width:var(--p);height:var(--p);filter:drop-shadow(-1px -1px 1.5px rgba(70,45,20,.28));transition:left .18s cubic-bezier(.2,.8,.2,1),top .18s cubic-bezier(.2,.8,.2,1),width .18s cubic-bezier(.2,.8,.2,1),height .18s cubic-bezier(.2,.8,.2,1)}
.fw i{position:absolute;inset:0;border-top-left-radius:9px;background:linear-gradient(135deg,#fffdf9 0,#f1ebe1 36%,#d3c9ba 50%,transparent 50%)}
.s1{width:58px;height:58px}
.s1 .face{background:radial-gradient(circle at 64% 36%,#ffd75e 0 20%,#ffeaa6 21% 26%,transparent 27%),radial-gradient(ellipse 34% 18% at 34% 72%,#fff 0 97%,transparent 100%),radial-gradient(ellipse 26% 16% at 54% 66%,#fff 0 97%,transparent 100%),linear-gradient(#86c3ee,#cde8fb)}
.s2{width:96px;height:36px}
.s2 .face{background:#ffd9e0;color:#9b2c4a;font-size:13px;font-weight:700;white-space:nowrap}
.s3{width:50px;height:50px}
.s3 .face{background:#d3efdf}
.s3 svg{width:60%;height:60%}
@container (min-height:260px){.hd{left:20px;top:16px}
.hd b{font-size:17px}
.hd small{font-size:12px}
.msg{left:20px;bottom:14px;font-size:12px}
.re{right:12px;bottom:10px}
.s1{width:88px;height:88px}
.s2{width:136px;height:50px}
.s2 .face{font-size:17px}
.s3{width:74px;height:74px}
}
@media (prefers-reduced-motion:reduce){.sk{--p:0px!important}
.sk.up{transform:none;outline:2px dashed #b08d57;outline-offset:3px}
}
</style>

<div class="st"><div class="pg"><i class="tape" aria-hidden="true"></i><div class="hd"><b>十一月 · 读书打卡</b><small>第 3 周 · 读完 2 本</small></div><div class="sk s1" tabindex="0" role="button" aria-roledescription="可移动贴纸" aria-pressed="false" aria-label="贴纸：晴天" data-n="晴天" data-x=".6" data-y=".06"><div class="face"></div><i class="fw"><i></i></i></div><div class="sk s2" tabindex="0" role="button" aria-roledescription="可移动贴纸" aria-pressed="false" aria-label="贴纸：读完 7 本" data-n="读完 7 本" data-x=".05" data-y=".62"><div class="face">读完 7 本</div><i class="fw"><i></i></i></div><div class="sk s3" tabindex="0" role="button" aria-roledescription="可移动贴纸" aria-pressed="false" aria-label="贴纸：叶子" data-n="叶子" data-x=".94" data-y=".42"><div class="face"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 19.5C4.5 10 10 4.5 20 4.5c0 10-5.5 15.5-15.5 15z" fill="#3f9a6b"/><path d="M6 18 15 9" stroke="#e8f7ee" stroke-width="1.6" stroke-linecap="round"/></svg></div><i class="fw"><i></i></i></div><p class="msg" role="status">按住贴纸拖动，或聚焦后按 Enter 拿起</p><button type="button" class="ctl re">重播</button></div></div>

<script type="module">
export default function demo(root) {
  const pg = root.querySelector('.pg'), msg = root.querySelector('.msg');
  const S = [...root.querySelectorAll('.sk')].map((el) => ({ el, name: el.dataset.n, fx: +el.dataset.x, fy: +el.dataset.y, x: 0, y: 0 }));
  let z = 10; const T = [];
  const room = (s) => [pg.clientWidth - s.el.offsetWidth, pg.clientHeight - s.el.offsetHeight];
  const put = (s, x, y) => { const [w, h] = room(s); s.x = Math.max(0, Math.min(w, x)); s.y = Math.max(0, Math.min(h, y)); s.el.style.left = s.x + 'px'; s.el.style.top = s.y + 'px'; };
  const layout = () => S.forEach((s) => { const [w, h] = room(s); put(s, s.fx * w, s.fy * h); });
  const where = (s) => { const [w, h] = room(s), a = s.x / w, b = s.y / h, H = a < .34 ? '左' : a > .66 ? '右' : '', V = b < .34 ? '上' : b > .66 ? '下' : ''; return H && V ? H + V + '角' : H ? H + '侧' : V ? V + '方' : '中间'; };
  const peel = (s, p) => s.el.style.setProperty('--p', p + 'px');
  const lift = (s) => { s.ox = s.x; s.oy = s.y; s.el.style.zIndex = ++z; s.el.classList.add('up'); s.el.setAttribute('aria-pressed', 'true'); peel(s, Math.round(Math.min(s.el.offsetWidth, s.el.offsetHeight) * 0.28)); };
  const drop = (s, text) => {
    s.el.classList.remove('up', 'auto'); s.el.setAttribute('aria-pressed', 'false'); peel(s, 0);
    const [w, h] = room(s); s.fx = w ? s.x / w : 0; s.fy = h ? s.y / h : 0; // 真实产品在这里保存一次位置
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) s.el.animate([{ scale: '1.02' }, { scale: '1' }], 160);
    msg.textContent = text || `「${s.name}」贴到了${where(s)}`;
  };
  S.forEach((s) => {
    const el = s.el; let d = null;
    el.addEventListener('pointerdown', (e) => {
      if (e.button) return;
      d = { x: e.clientX, y: e.clientY, x0: s.x, y0: s.y, drag: false };
      try { el.setPointerCapture(e.pointerId); } catch {}
      el.style.zIndex = ++z; peel(s, 14);
    });
    el.addEventListener('pointermove', (e) => {
      if (!d) return;
      const dx = e.clientX - d.x, dy = e.clientY - d.y;
      if (!d.drag && Math.hypot(dx, dy) > 6) { d.drag = true; lift(s); }
      if (d.drag) put(s, d.x0 + dx, d.y0 + dy);
    });
    el.addEventListener('pointerup', () => { if (!d) return; const was = d.drag; d = null; if (was) drop(s); else { peel(s, 0); msg.textContent = '按住拖动，就能把它挪个地方'; } });
    el.addEventListener('pointercancel', () => { if (!d) return; const was = d.drag; put(s, d.x0, d.y0); d = null; if (was) drop(s, `已取消，「${s.name}」回到原处`); else peel(s, 0); });
    el.addEventListener('keydown', (e) => {
      const up = el.classList.contains('up');
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (up) drop(s); else { lift(s); msg.textContent = `拿起「${s.name}」：方向键移动，Enter 贴下，Esc 放回`; } return; }
      if (!up) return;
      if (e.key === 'Escape') { put(s, s.ox, s.oy); drop(s, `「${s.name}」放回了原处`); return; }
      const k = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
      if (k) { e.preventDefault(); const n = e.shiftKey ? 24 : 8; put(s, s.x + k[0] * n, s.y + k[1] * n); }
    });
    el.addEventListener('blur', () => { if (el.classList.contains('up') && !d) drop(s); });
  });
  const later = (f, ms) => T.push(setTimeout(() => root.host.isConnected && f(), ms));
  const play = () => {
    T.forEach(clearTimeout); T.length = 0;
    S.forEach((s) => { s.fx = +s.el.dataset.x; s.fy = +s.el.dataset.y; s.el.classList.remove('up', 'auto'); peel(s, 0); });
    layout();
    const s = S[0];
    later(() => { s.el.style.zIndex = ++z; peel(s, 14); }, 350);
    later(() => { lift(s); s.el.classList.add('auto'); msg.textContent = `拿起「${s.name}」`; }, 600);
    later(() => { const [w, h] = room(s); put(s, w * 0.45, h * 0.5); }, 680);
    later(() => drop(s), 1900);
  };
  new ResizeObserver(layout).observe(pg);
  root.querySelector('.re').addEventListener('click', play);
  play();
}
</script>
