---
zh: 环形快捷菜单
en: Radial menu
order: 100
---

## 是什么

在指针或选中对象周围弹出一圈 4–8 个图标按钮，朝某个方向拖一下松手、或者直接点一下就执行，中间是取消区。

## 适合

白板、画布、绘图、地图、游戏里围绕当前位置的高频快捷操作，触屏和手写笔上尤其顺手。

## 不适合

超过 8 项、或者必须读文字才能分清的命令用右键下拉菜单；它不能是唯一入口，工具栏或菜单里要有同样的操作。

## 注意

在画布边角打开时整圈会被裁掉：要把圆心整体往里挪，让每个按钮都完整可点，而不是只画半圈。

## 要点

- 组件库没有现成的，自己做；工具栏或右键菜单里要有同样的操作，它只是快捷入口
- 4–8 项均分一圈，第一项在正上方、顺时针排；按钮 36–44px，圆心到按钮中心 56–72px，中间留一个取消区
- 圆心离画布边缘不足“半径 + 半个按钮 + 8px”时整体往里挪，菜单任何部分都不越界
- 两种选法：按住朝某个方向拖、松手即执行；原地松手菜单留着，再点选；拖动距离小于 16px 不算选中
- 当前指向的那一项高亮，中心显示它的名字；每个按钮都有 aria-label
- 打开方式：右键、长按 400–500ms（期间移动超过 8px 就取消长按）、键盘按 Q 或菜单键
- 键盘：打开后焦点在第一项，方向键顺时针 / 逆时针移动，Enter 执行，Esc 关闭并回到原焦点；Esc、点空白、在中心松手都不执行任何操作
- 从中心展开 160ms，减少动态效果时只淡入

## 提示词

给{画布 / 白板}加「环形快捷菜单」：组件库没有现成的，自己做。右键、长按 450ms（移动超过 8px 取消）或按 Q 时，在指针或选中对象处弹出 {项数} 个图标按钮，均分一圈、第一项在正上方顺时针排，按钮 40px、圆心到按钮中心 64px；靠近画布边缘时把圆心整体内移，任何按钮都不越界；按住拖向某一项松手即执行，原地松手则菜单保留等待点选，拖动不足 16px 不算选中；指向的项高亮并在中心显示名称，中心是取消区；用 role="menu" / menuitem，方向键移动、Enter 执行、Esc 关闭并回到原焦点；工具栏保留同样的操作作为常规入口；展开 160ms，减少动态效果时只淡入。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{padding:8px 10px;place-items:stretch;container-type:size}
.app{display:grid;grid-template-rows:auto minmax(0,1fr) auto;gap:6px;width:100%;max-width:680px;height:100%;margin:0 auto}
.tb{display:flex;align-items:center;gap:8px}
.hint{flex:1;min-width:0;color:#5b616e;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
kbd{padding:0 5px;border:1px solid #d0d5dd;border-radius:4px;background:#fff;font:11px/16px system-ui;color:#1f2329}
.tb .ctl{height:28px;padding:0 10px;font-size:12px}
.bd{position:relative;min-height:0;border:1px solid #e3e6eb;border-radius:10px;background:#fbfbfa radial-gradient(circle,#d5d9e0 1px,transparent 1.2px) 0 0/14px 14px;overflow:hidden;touch-action:none;user-select:none;-webkit-user-select:none;cursor:default}
.bd:focus-visible{outline-offset:-2px}
.nt{position:absolute;display:grid;place-items:center;padding:4px 8px;border-radius:3px;box-shadow:0 1px 3px rgba(16,24,40,.16);font-size:11px;line-height:1.3;white-space:nowrap}
.n1{left:12px;top:12px;background:#fff4b8;transform:rotate(-2deg)}
.n2{left:76px;top:30px;background:#ffd9d2;transform:rotate(2deg)}
.tk{position:absolute;transform:translate(-50%,-50%);animation:tk .2s ease-out;pointer-events:none}
@keyframes tk{from{opacity:0}
}
.tk.k0{width:40px;height:34px;padding:4px;border-radius:3px;background:#fff4b8;box-shadow:0 1px 3px rgba(16,24,40,.16);font-size:10px}
.tk.k1{font-size:13px;font-weight:700;white-space:nowrap}
.tk.k2{width:46px;height:2px;background:#1f2329}
.tk.k2::after{content:"";position:absolute;right:-1px;top:-4px;border:5px solid transparent;border-left:7px solid #1f2329;border-right:0}
.tk.k3{width:44px;height:28px;border:2px solid #3b5bdb;border-radius:6px}
.tk.k4{width:44px;height:30px;border-radius:4px;background:linear-gradient(160deg,#9ad1d4,#3d7ea6)}
.tk.k5{padding:2px 8px;border-radius:999px;background:#1f2329;color:#fff;font-size:11px;font-variant-numeric:tabular-nums}
.rm{--r:34px;--z:28px;position:absolute;z-index:3;width:0;height:0}
.ring{position:absolute;left:0;top:0;width:calc(var(--r) * 2 + var(--z) + 8px);aspect-ratio:1;border-radius:50%;background:rgba(255,255,255,.78);box-shadow:0 8px 24px rgba(15,17,22,.16),0 0 0 1px rgba(15,17,22,.06);transform:translate(-50%,-50%) scale(.6);opacity:0;transition:transform .16s cubic-bezier(0,0,.2,1),opacity .16s;backdrop-filter:blur(2px)}
.hub{position:absolute;left:0;top:0;display:grid;place-items:center;width:calc(var(--z) + 8px);aspect-ratio:1;border-radius:50%;background:#f0f2f5;color:#5b616e;font-size:10px;line-height:1.2;text-align:center;transform:translate(-50%,-50%);opacity:0;transition:opacity .16s}
.it{position:absolute;left:0;top:0;display:grid;place-items:center;width:var(--z);height:var(--z);padding:0;border:1px solid #e3e6eb;border-radius:50%;background:#fff;color:#1f2329;box-shadow:0 1px 2px rgba(15,17,22,.08);transform:translate(-50%,-50%) scale(.5);opacity:0;transition:transform .16s cubic-bezier(0,0,.2,1),opacity .16s,background-color .1s}
.it svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
.it.hi,.it:focus-visible{background:#3b5bdb;border-color:#3b5bdb;color:#fff;outline:none;box-shadow:0 0 0 3px #dfe6ff}
.rm.on .ring{transform:translate(-50%,-50%);opacity:1}
.rm.on .hub{opacity:1}
.rm.on .it{transform:translate(-50%,-50%) translate(var(--x),var(--y));opacity:1}
.hub.hi{background:#edf1ff;color:#3b5bdb;font-weight:600}
.out{min-height:18px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
@media (prefers-reduced-motion:reduce){.ring,.it,.rm.on .it{transition:opacity .12s}
.ring{transform:translate(-50%,-50%)}
.it{transform:translate(-50%,-50%) translate(var(--x),var(--y))}
.tk{animation:none}
}
@container (min-height:250px){.rm{--r:62px;--z:40px}
.it svg{width:19px;height:19px}
.hub{font-size:12px}
.nt{font-size:12px;padding:6px 10px}
.n2{left:100px;top:40px}
}
</style>

<div class="s"><div class="app"><div class="tb"><span class="hint">在画布上右键、长按，或按 <kbd>Q</kbd></span><button type="button" class="ctl op">打开菜单</button></div><div class="bd" tabindex="0" aria-label="白板画布，按 Q 打开快捷菜单"><span class="nt n1">周会议程</span><span class="nt n2">待解决问题</span><div class="rm" role="menu" aria-label="快捷添加" hidden><i class="ring" aria-hidden="true"></i><span class="hub" aria-hidden="true">取消</span></div></div><p class="muted out" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const sv = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
  const T = [
    ['便签', sv('<path d="M5 4h14v10l-5 6H5z"/><path d="M14 20v-6h5"/>')],
    ['文字', sv('<path d="M5 6V4h14v2M12 4v16M9 20h6"/>')],
    ['连线', sv('<path d="M5 19 19 5M11 5h8v8"/>')],
    ['方框', sv('<rect x="4" y="6" width="16" height="12" rx="2"/>')],
    ['图片', sv('<rect x="3.5" y="5" width="17" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m4 17 5-4 4 3 3-2 4 3"/>')],
    ['计时', sv('<circle cx="12" cy="13" r="7"/><path d="M12 9v4l2.5 2M10 3h4"/>')],
  ];
  const TXT = ['新便签', '标题文字', '', '', '', '05:00'];
  const bd = root.querySelector('.bd'), rm = root.querySelector('.rm'), hub = root.querySelector('.hub'), out = root.querySelector('.out');
  rm.insertAdjacentHTML('beforeend', T.map(([n, ic], i) => `<button type="button" class="it" role="menuitem" tabindex="-1" data-i="${i}" aria-label="${n}">${ic}</button>`).join(''));
  const items = [...rm.querySelectorAll('.it')];
  let isOpen = false, cx = 0, cy = 0, hi = -1, dragging = false, press = 0, start = null, last = null, back = null;
  const geo = () => { const cs = getComputedStyle(rm); return { r: parseFloat(cs.getPropertyValue('--r')), z: parseFloat(cs.getPropertyValue('--z')) }; };
  const setHi = (i) => { hi = i; items.forEach((b, k) => b.classList.toggle('hi', k === i)); hub.textContent = i >= 0 ? T[i][0] : '取消'; hub.classList.toggle('hi', i >= 0); };
  // 在 (x, y) 打开；靠边时圆心整体内移，保证整圈都在画布里
  const open = (x, y, how) => {
    const { r, z } = geo(), m = r + z / 2 + 8, w = bd.clientWidth, h = bd.clientHeight;
    cx = w < m * 2 ? w / 2 : Math.min(Math.max(x, m), w - m); cy = h < m * 2 ? h / 2 : Math.min(Math.max(y, m), h - m);
    items.forEach((b, i) => { const a = (-90 + i * 360 / items.length) * Math.PI / 180; b.style.setProperty('--x', (Math.cos(a) * r).toFixed(1) + 'px'); b.style.setProperty('--y', (Math.sin(a) * r).toFixed(1) + 'px'); });
    rm.style.left = cx + 'px'; rm.style.top = cy + 'px'; rm.hidden = false; isOpen = true; setHi(-1);
    rm.classList.remove('on'); void rm.offsetWidth; rm.classList.add('on');
    back = root.activeElement && root.activeElement !== document.body ? root.activeElement : bd;
    if (how === 'click' || how === 'key') items[0].focus({ preventScroll: true }); // 自动演示不抢焦点
    const moved = Math.round(Math.hypot(cx - x, cy - y));
    out.textContent = moved > 2 ? `靠边了，菜单整体往里挪了 ${moved}px` : how === 'drag' ? '别松手，朝某一项拖过去再松开' : '选一项添加到这里，Esc 取消';
  };
  const close = (msg) => {
    if (!isOpen) return;
    isOpen = false; dragging = false; rm.classList.remove('on'); rm.hidden = true; setHi(-1);
    if (msg) out.textContent = msg;
    if (rm.contains(root.activeElement) || root.activeElement === null) (back || bd).focus({ preventScroll: true });
  };
  const exec = (i) => {
    const el = document.createElement('span'); el.className = 'tk k' + i; el.textContent = TXT[i]; el.style.left = cx + 'px'; el.style.top = cy + 'px';
    bd.insertBefore(el, rm); while (bd.querySelectorAll('.tk').length > 6) bd.querySelector('.tk').remove();
    close(`已在这里添加${T[i][0]}`); bd.focus({ preventScroll: true });
  };
  const local = (e) => { const b = bd.getBoundingClientRect(); return { x: e.clientX - b.left, y: e.clientY - b.top }; };
  // 拖向某一扇区：距中心超过 16px 才算指向
  const aim = (p) => {
    const dx = p.x - cx, dy = p.y - cy;
    if (Math.hypot(dx, dy) < 16) return setHi(-1);
    const n = items.length, a = (Math.atan2(dy, dx) * 180 / Math.PI + 90 + 360) % 360;
    setHi(Math.round(a / (360 / n)) % n);
  };
  bd.addEventListener('contextmenu', (e) => { e.preventDefault(); clearTimeout(press); const p = local(e); last = p; open(p.x, p.y, 'click'); });
  bd.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.it')) return;
    if (isOpen) { close('已取消，没有添加任何内容'); return; }
    if (e.button !== 0) return;
    start = local(e); last = start;
    try { bd.setPointerCapture(e.pointerId); } catch {}
    clearTimeout(press);
    press = setTimeout(() => { if (root.host.isConnected && start) { dragging = true; open(start.x, start.y, 'drag'); } }, 450);
  });
  bd.addEventListener('pointermove', (e) => {
    const p = local(e);
    if (!isOpen && start && Math.hypot(p.x - start.x, p.y - start.y) > 8) { clearTimeout(press); start = null; }
    if (isOpen && dragging) aim(p);
  });
  const up = () => {
    clearTimeout(press); start = null;
    if (!dragging) return;
    dragging = false;
    if (hi >= 0) exec(hi); else { items[0].focus({ preventScroll: true }); out.textContent = '菜单留着，点一项添加，Esc 取消'; }
  };
  bd.addEventListener('pointerup', up); bd.addEventListener('pointercancel', () => { clearTimeout(press); start = null; if (dragging) close('已取消'); });
  rm.addEventListener('click', (e) => { const b = e.target.closest('.it'); if (b) exec(+b.dataset.i); });
  rm.addEventListener('pointerover', (e) => { const b = e.target.closest('.it'); if (b && !dragging) setHi(+b.dataset.i); });
  rm.addEventListener('focusin', (e) => { const b = e.target.closest('.it'); if (b) setHi(+b.dataset.i); });
  rm.addEventListener('keydown', (e) => {
    const i = items.indexOf(root.activeElement), n = items.length;
    const to = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: n - 1 }[e.key];
    if (to !== undefined) { e.preventDefault(); items[(to + n) % n].focus(); }
    else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close('已取消，没有添加任何内容'); }
    else if (e.key === 'Tab') { e.preventDefault(); close('已关闭菜单'); }
  });
  bd.addEventListener('keydown', (e) => {
    if (e.target !== bd || isOpen) return;
    if (e.key.toLowerCase() === 'q' || e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10')) { e.preventDefault(); const p = last || { x: bd.clientWidth / 2, y: bd.clientHeight / 2 }; open(p.x, p.y, 'key'); }
  });
  root.querySelector('.op').addEventListener('click', () => { const p = last || { x: bd.clientWidth / 2, y: bd.clientHeight / 2 }; open(p.x, p.y, 'key'); });
  // 自动演示：在右下角打开（会被内移），停在“便签”高亮
  setTimeout(() => { if (!root.host.isConnected) return; last = { x: bd.clientWidth - 6, y: bd.clientHeight - 6 }; open(last.x, last.y, 'demo'); setHi(0); }, 500);
}
</script>
