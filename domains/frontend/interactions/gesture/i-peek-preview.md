---
zh: 长按托起看一眼
en: Press to peek
order: 100
---

## 是什么

长按网格或列表里的一项，它在原位稍微放大、阴影加深，像被托起来；其余内容暗下去并变模糊，旁边弹出这一项的操作菜单。松手菜单留着，点别处一切还原。

## 适合

相册、文件、收藏夹、会话列表：想对某一项做快捷操作（收藏、分享、移动、删除），又不想先进详情页。

## 不适合

一个列表里长按只做一件事：已经用长按进入多选（「长按多选」）的列表不再加这个；桌面端的主入口是右键菜单和每项的“更多”按钮。

## 注意

托起的是原位置的那一项，菜单贴着它出现，不把它挪到屏幕中间；被托起的项和菜单要在遮罩上面，其余内容在遮罩下面。

## 要点

- 按住 450ms 托起；按住期间手指移动超过 8px 就取消，交给页面滚动；不到 450ms 松手按普通点按处理。
- 托起：该项放大到 1.04、阴影加深；遮罩 160ms 淡入，带 8px 背景模糊和一层浅黑；只动 transform 和 opacity。
- 菜单贴着该项：优先放下方，放不下放上方，上下都不够放侧边，并保持在可视范围内；菜单项高 40–44px，危险项放最后、用危险色。
- 松手菜单保留；点遮罩、Esc 或选了一项后还原，焦点回到这一项。
- 桌面右键、键盘的菜单键或 Shift+F10 打开同一个菜单，焦点进第一项，↑/↓ 移动；菜单用 role="menu" / menuitem。
- 只在这块区域屏蔽系统长按菜单和文字选择；可选托起时 10ms 轻震动。
- 减少动态效果时不放大、不模糊，只出现遮罩和菜单。

## 提示词

给{相册 / 文件网格}加「长按托起看一眼」：按住某项 450ms 后它在原位放大到 1.04、阴影加深，其余内容盖一层 160ms 淡入的浅黑遮罩并带 8px 背景模糊，被托起的项和菜单在遮罩之上；按住期间移动超过 8px 取消并交给滚动，不到 450ms 松手按普通点按；菜单贴着该项弹出（优先下方，其次上方，再其次侧边，始终留在可视范围），包含{操作列表}，危险项放最后用危险色；松手菜单保留，点遮罩、Esc 或选择后还原并把焦点还给该项；桌面右键、菜单键或 Shift+F10 打开同一菜单，role="menu"，↑/↓ 移动；只在该区域屏蔽系统长按菜单；减少动态效果时只出遮罩和菜单。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:10px 12px;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}
.hd{display:flex;justify-content:space-between;align-items:baseline;margin:0 0 8px}
.hd b{font-size:13px}
.hd small{color:#5b616e;font-size:12px}
.g{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px}
.t:nth-child(n+11){display:none}
.t{position:relative;aspect-ratio:1;padding:0;border:0;border-radius:10px;background:linear-gradient(160deg,hsl(var(--h) 60% 78%),hsl(calc(var(--h) + 30) 55% 52%));box-shadow:0 1px 2px rgba(16,24,40,.12);transition:transform .16s,box-shadow .16s;touch-action:manipulation}
.t::after{content:"";position:absolute;left:14%;right:14%;bottom:16%;height:28%;border-radius:50% 50% 8px 8px;background:rgba(255,255,255,.35)}
.t.lift{z-index:3;transform:scale(1.04);box-shadow:0 12px 28px rgba(16,24,40,.35)}
.t.press{transform:scale(.97)}
.mask{position:absolute;inset:0;z-index:2;background:rgba(18,22,30,.28);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);opacity:0;pointer-events:none;transition:opacity .16s}
.mask.on{opacity:1;pointer-events:auto}
.menu{position:absolute;z-index:4;width:132px;margin:0;padding:4px;list-style:none;border-radius:12px;background:#fff;box-shadow:0 10px 30px rgba(16,24,40,.25)}
.menu button{display:flex;align-items:center;width:100%;height:30px;padding:0 10px;border:0;border-radius:8px;background:none;text-align:left;font-size:13px}
.menu button:hover,.menu button:focus-visible{background:#f1f3f6}
.menu .dg{color:#c4320a}
.msg{margin:8px 0 0;min-height:18px;color:#5b616e;font-size:12px}
@container (min-width:560px){.g{grid-template-columns:repeat(6,minmax(0,1fr));gap:10px}
.t:nth-child(n+11){display:block}
.menu{width:160px}
.menu button{height:40px}
}
@media (prefers-reduced-motion:reduce){.t.lift,.t.press{transform:none}
.mask{-webkit-backdrop-filter:none;backdrop-filter:none}
}
</style>

<div class="st">
  <p class="hd"><b>最近照片</b><small>长按或右键照片</small></p>
  <div class="g"></div>
  <p class="msg" role="status"></p>
  <div class="mask"></div>
  <ul class="menu" role="menu" aria-label="照片操作" hidden></ul>
</div>

<script type="module">
const HUES = [18, 200, 140, 280, 40, 330, 100, 220, 0, 170, 260, 60];
const ACTS = [['收藏', ''], ['分享', ''], ['移到相册', ''], ['删除', 'dg']];
export default function demo(root) {
  const st = root.querySelector('.st'), g = root.querySelector('.g'), mask = root.querySelector('.mask'), menu = root.querySelector('.menu'), msg = root.querySelector('.msg');
  g.innerHTML = HUES.map((h, i) => `<button type="button" class="t" style="--h:${h}" aria-label="照片 ${i + 1}" aria-haspopup="menu"></button>`).join('');
  menu.innerHTML = ACTS.map(([t, c]) => `<li role="none"><button type="button" role="menuitem" class="${c}" tabindex="-1">${t}</button></li>`).join('');
  const items = [...menu.querySelectorAll('button')];
  let cur = null, timer = 0, x0 = 0, y0 = 0, lifted = false;
  const place = (t) => {
    const s = st.getBoundingClientRect(), r = t.getBoundingClientRect(), mw = menu.offsetWidth, mh = menu.offsetHeight, gap = 6;
    const L = r.left - s.left, T = r.top - s.top, R = r.right - s.left, B = r.bottom - s.top;
    const clampX = (v) => Math.max(8, Math.min(s.width - mw - 8, v)), clampY = (v) => Math.max(8, Math.min(s.height - mh - 8, v));
    let x, y;
    if (B + gap + mh <= s.height - 8) { x = clampX(L); y = B + gap; }
    else if (T - gap - mh >= 8) { x = clampX(L); y = T - gap - mh; }
    else if (R + gap + mw <= s.width - 8) { x = R + gap; y = clampY(T); }
    else { x = Math.max(8, L - gap - mw); y = clampY(T); }
    menu.style.left = x + 'px'; menu.style.top = y + 'px';
  };
  const open = (t, focus) => {
    close(false); cur = t; t.classList.remove('press'); t.classList.add('lift'); mask.classList.add('on'); menu.hidden = false; place(t);
    navigator.vibrate?.(10);
    if (focus) items[0].focus();
  };
  const close = (back = true) => {
    if (!cur) return; const t = cur; cur = null; t.classList.remove('lift'); mask.classList.remove('on'); menu.hidden = true;
    if (back && root.activeElement && (menu.contains(root.activeElement) || root.activeElement === t)) t.focus();
  };
  g.addEventListener('pointerdown', (e) => {
    const t = e.target.closest('.t'); if (!t || e.button > 0) return;
    x0 = e.clientX; y0 = e.clientY; lifted = false; t.classList.add('press');
    timer = setTimeout(() => { lifted = true; open(t, false); }, 450);
  });
  g.addEventListener('pointermove', (e) => { if (timer && Math.hypot(e.clientX - x0, e.clientY - y0) > 8) { clearTimeout(timer); timer = 0; g.querySelector('.press')?.classList.remove('press'); } });
  const up = () => { clearTimeout(timer); timer = 0; g.querySelector('.press')?.classList.remove('press'); };
  g.addEventListener('pointerup', up); g.addEventListener('pointercancel', up);
  g.addEventListener('click', (e) => {
    const t = e.target.closest('.t'); if (!t) return;
    if (lifted) { lifted = false; return; }
    msg.textContent = `示例：这里会打开${t.getAttribute('aria-label')}`;
  });
  g.addEventListener('contextmenu', (e) => { const t = e.target.closest('.t'); if (!t) return; e.preventDefault(); if (cur !== t) open(t, false); });
  g.addEventListener('keydown', (e) => { const t = e.target.closest('.t'); if (t && (e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10'))) { e.preventDefault(); open(t, true); } });
  mask.addEventListener('click', () => close());
  menu.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b || !cur) return; msg.textContent = `已${b.textContent}：${cur.getAttribute('aria-label')}`; close(); });
  menu.addEventListener('keydown', (e) => {
    const i = items.indexOf(root.activeElement), n = items.length;
    const to = { ArrowDown: (i + 1) % n, ArrowUp: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
    if (to !== undefined) { e.preventDefault(); items[to].focus(); } else if (e.key === 'Escape' || e.key === 'Tab') { e.preventDefault(); close(); }
  });
  st.addEventListener('keydown', (e) => { if (e.key === 'Escape' && cur) close(); });
  // 挂载后演示：托起第 2 张
  setTimeout(() => { if (root.host.isConnected && !cur) open(g.children[1], false); }, 500);
}
</script>
