---
zh: 拖到回收区
en: Drag to trash zone
aka: 拖拽删除 拖到垃圾桶 回收站 删除区
order: 30
---

## 是什么

拖起一项时屏幕底部升起一块回收区；拖近时它放大、变成危险色并写“松手删除”，松手后这一项飞进去，其余内容补上空位，同时留下一条可撤销的提示。

## 适合

相册、便签墙、桌面图标、仪表盘小组件这类本来就靠拖动整理的界面；平时不想常驻删除按钮、删除又不算高频的地方。

## 不适合

列表里高频删除用「滑动操作」；一次清掉很多项用「长按多选」或「空白处拉框多选」；账号、付款记录这类删了无法恢复的内容走带确认的流程。

## 注意

回收区只在拖起后出现，松手前什么都没发生，松手后也先进撤销窗口，窗口结束才真正删除。命中判定看指针位置：拖着的缩略图缩小后边界一直在变，用它算会忽进忽出。

## 要点

- 拿起：位移超过 4px 才算拖动，触屏滚动列表里先长按约 300ms；原位留 22% 透明度的占位，手里的缩略图跟手、不加过渡，倾斜约 2.5°
- 出现：回收区贴底居中，拖起后约 180ms 升起，同时铺一层底部暗色渐变，把它和下面的内容分开；放下或取消后退回
- 靠近：按指针到回收区边缘的距离线性放大，90px 内开始变化，贴上时到 1.25 倍；以底边中点为基准往上长，贴边不被裁掉
- 热区：回收区外扩 16px；进入后变危险色，文案换成“松手删除”，桶盖掀开，缩略图缩到 0.55 倍；手机上可加 navigator.vibrate(10)
- 松手：热区内缩略图约 180ms 缩小飞进回收区，其余项 200ms 补位；热区外约 200ms 回到原位，Esc 取消同样回原位
- 撤销：底部提示 6 秒，带一条倒计时细线，悬停或聚焦时暂停；窗口内连删合并成“已删除 N 张”，撤销一次全部回到原位；窗口结束后才发删除请求，或者先做软删除
- 键盘和替代：每项有 × 按钮（悬停、聚焦时显示，触屏常显）；聚焦时 Delete 删除，⌘Z / Ctrl+Z 撤销；删除后焦点移到相邻项，撤销后回到恢复的那一项
- 删除和撤销用 role="status" 播报；减少动态效果时回收区只变色不放大，补位和飞入直接到位

## 提示词

给{相册}做「拖到回收区」：拖起{照片}（位移超过 4px 才算拖动）后，底部居中升起回收区（180ms），同时铺一层底部暗色渐变；原位留 22% 透明度的占位，缩略图跟手并倾斜 2.5°；按指针到回收区边缘的距离放大回收区，90px 内开始，贴上时 1.25 倍；回收区外扩 16px 是热区，指针进入后变危险色、文案换成“松手删除”、缩略图缩到 0.55 倍；热区内松手，缩略图 180ms 缩小飞入，其余项 200ms 补位，并显示“已删除 N {单位}”和“撤销”；提示停留 6 秒，带倒计时细线，悬停或聚焦时暂停，窗口内连删合并成一条，撤销一次全部回到原位，窗口结束后才调用{删除接口}；热区外松手或按 Esc，缩略图 200ms 回到原位；每项另有 × 按钮（悬停、聚焦显示，触屏常显），聚焦时 Delete 删除、⌘Z / Ctrl+Z 撤销，删除后焦点移到相邻项，撤销后回到恢复的项；用 role="status" 播报；减少动态效果时回收区不放大，只变色，补位直接到位。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<link rel="stylesheet" href="../../_shared/app-card-photos.css">
<style>
.st{padding:8px 12px 10px}
.box{display:grid;grid-template-rows:auto minmax(0,1fr);gap:6px;height:100%;max-width:520px;margin:0 auto}
.bar{display:flex;align-items:center;gap:8px;min-width:0}
.bar b{flex:none;font-size:13px}
.bar span{flex:1;min-width:0;overflow:hidden;color:#5b616e;font-size:12px;white-space:nowrap;text-overflow:ellipsis}
.bar .ctl{flex:none;height:26px;padding:0 9px;font-size:12px}
.grid{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:calc(50% - 3px);gap:6px;min-height:0;margin:0;padding:0;list-style:none;touch-action:none;user-select:none;-webkit-user-select:none}
.tl{position:relative;min-width:0;min-height:0}
.pic{display:block;width:100%;height:100%;padding:0;border:0;border-radius:10px;cursor:grab;box-shadow:inset 0 0 0 1px rgba(16,24,40,.08)}
.tl.hole .pic{opacity:.22}
.rm{position:absolute;top:4px;right:4px;display:grid;place-items:center;width:22px;height:22px;padding:0 0 1px;border:0;border-radius:50%;background:rgba(16,24,40,.62);color:#fff;font-size:14px;line-height:1;opacity:0;transition:opacity .12s}
.tl:hover .rm,.tl:focus-within .rm{opacity:1}
.none{grid-column:1/-1;grid-row:1/3;place-self:center;margin:0;color:#5b616e;font-size:13px}
.scrim{position:absolute;left:0;right:0;bottom:0;z-index:2;height:92px;background:linear-gradient(transparent,rgba(16,24,40,.5));opacity:0;pointer-events:none;transition:opacity .16s}
.bin{--s:1;position:absolute;left:50%;bottom:9px;z-index:3;display:flex;align-items:center;justify-content:center;gap:6px;width:132px;height:44px;border-radius:14px;background:#1f2329;color:#fff;font-size:12px;font-weight:600;box-shadow:0 8px 20px -6px rgba(16,24,40,.5);transform:translate(-50%,calc(100% + 16px)) scale(var(--s));transform-origin:50% 100%;transition:transform .14s,background-color .12s;pointer-events:none}
.bin svg{flex:none;width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.bin .lid{transform-origin:18px 5px;transition:transform .14s}
.dr .scrim{opacity:1}
.dr .bin{transform:translate(-50%,0) scale(var(--s));transition:transform .18s cubic-bezier(.2,.9,.3,1.2),background-color .12s}
.bin.near{background:#d92d20}
.bin.near .lid{transform:rotate(16deg)}
.gh{position:absolute;left:0;top:0;z-index:4;pointer-events:none;will-change:transform}
.gh i{display:block;width:100%;height:100%;border-radius:10px;box-shadow:0 12px 26px -8px rgba(16,24,40,.5);transform:rotate(-2.5deg) scale(1.04);transition:transform .14s,opacity .14s}
.gh.near i{transform:scale(var(--z,.55))}
.gh.fly i{transform:scale(.18);opacity:0;transition:transform .18s,opacity .18s}
.toast{position:absolute;left:50%;bottom:10px;z-index:3;display:flex;align-items:center;gap:6px;height:36px;padding:0 4px 0 12px;overflow:hidden;border-radius:10px;background:#1f2329;color:#fff;font-size:12.5px;white-space:nowrap;box-shadow:0 8px 20px -6px rgba(16,24,40,.5);transform:translateX(-50%);transition:opacity .14s}
.toast span{white-space:nowrap}
.toast button{height:28px;padding:0 10px;border:0;border-radius:7px;background:transparent;color:#a9bcff;font-size:12.5px;font-weight:600}
.toast button:hover{background:rgba(255,255,255,.12)}
.toast :focus-visible{outline-color:#a9bcff;outline-offset:-2px}
.toast i{position:absolute;left:0;bottom:0;width:100%;height:2px;background:#a9bcff;transform-origin:0 50%;animation:cd 6s linear both}
.toast.pause i,.toast.hold i{animation-play-state:paused}
.dr .toast{opacity:0;pointer-events:none}
@keyframes cd{to{transform:scaleX(0)}
}
@media (hover:none){.rm{opacity:1}
}
@media (prefers-reduced-motion:reduce){.gh i,.gh.near i,.gh.fly i{transform:none}
.bin .lid,.bin.near .lid{transform:none}
}
</style>

<div class="st"><div class="box"><div class="bar"><b>旅行相册</b><span>拖到底部回收区删除</span><button type="button" class="ctl rp">重播</button></div><ul class="grid" aria-label="照片：拖到回收区删除；聚焦后按 Delete 也能删除"></ul></div><i class="scrim"></i><div class="bin" aria-hidden="true"><svg viewBox="0 0 20 20"><path class="lid" d="M3 5h14M8 5V3.5h4V5"/><path d="M5 5l.8 11.5h8.4L15 5M8.5 8.5v5M11.5 8.5v5"/></svg><span>拖到这里删除</span></div><div class="toast" hidden><span class="tx"></span><button type="button" class="un">撤销</button><i></i></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const P = [['ph1', '湖边清晨'], ['ph2', '海湾日落'], ['ph3', '松林步道'], ['ph4', '沙丘午后'], ['ph5', '营地星空'], ['ph6', '山坡花田']];
  const st = root.querySelector('.st'), grid = root.querySelector('.grid'), bin = root.querySelector('.bin'), lab = bin.querySelector('span'), toast = root.querySelector('.toast'), tx = root.querySelector('.tx'), un = root.querySelector('.un'), bar = toast.querySelector('i'), sr = root.querySelector('.sr');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let d = null, gone = [], tm = [], left = 0, t0 = 0, to = 0;
  const list = () => [...grid.querySelectorAll('.tl')], name = (li) => li.dataset.n;
  const make = ([c, n]) => { const li = document.createElement('li'); li.className = 'tl'; li.dataset.n = n; li.dataset.c = c; li.innerHTML = `<button type="button" class="pic ${c}" aria-label="${n}"></button><button type="button" class="rm" aria-label="删除${n}">×</button>`; return li; };
  const blank = () => { if (list().length) return grid.querySelector('.none')?.remove(); if (!grid.querySelector('.none')) grid.insertAdjacentHTML('beforeend', '<li class="none">相册空了</li>'); };
  // 其余照片补位：记下旧位置，DOM 改完后用 transform 从旧位置过渡回来
  const flip = (fn) => {
    const at = new Map(list().map((e) => [e, e.getBoundingClientRect()]));
    fn(); blank();
    if (still) return;
    list().forEach((e) => {
      const a = at.get(e); if (!a) return;
      const b = e.getBoundingClientRect(), dx = a.left - b.left, dy = a.top - b.top; if (!dx && !dy) return;
      e.style.transition = 'none'; e.style.transform = `translate(${dx}px,${dy}px)`; void e.offsetWidth;
      e.style.transition = 'transform .2s cubic-bezier(.2,0,0,1)'; e.style.transform = '';
    });
  };
  // 撤销窗口：6 秒，悬停或聚焦提示时暂停；窗口内连删合并成一条
  const run = () => { if (toast.classList.contains('hold')) return; t0 = performance.now(); to = setTimeout(commit, left); toast.classList.remove('pause'); };
  const pause = () => { if (toast.hidden || toast.classList.contains('hold')) return; clearTimeout(to); left -= performance.now() - t0; toast.classList.add('pause'); };
  const commit = () => { clearTimeout(to); const back = root.activeElement === un; gone = []; toast.hidden = true; if (back) list()[0]?.querySelector('.pic').focus(); };
  const remove = (li, hold) => {
    const i = list().indexOf(li), next = list()[i + 1] ?? list()[i - 1];
    li.classList.remove('hole'); flip(() => li.remove()); gone.push({ li, i });
    tx.textContent = `已删除 ${gone.length} 张`; sr.textContent = `已删除「${name(li)}」，可以撤销`;
    clearTimeout(to); left = 6000; toast.hidden = false; toast.classList.remove('pause'); toast.classList.toggle('hold', !!hold);
    bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = ''; run();
    return next;
  };
  const undo = () => {
    if (!gone.length) return;
    const back = gone; clearTimeout(to); gone = []; toast.hidden = true;
    flip(() => back.reverse().forEach(({ li, i }) => grid.insertBefore(li, list()[i] ?? null)));
    back.at(-1).li.querySelector('.pic').focus({ preventScroll: true }); sr.textContent = `已撤销，恢复 ${back.length} 张`;
  };
  const center = () => { const s = st.getBoundingClientRect(), h = bin.offsetHeight; return { s, cx: s.left + s.width / 2, cy: s.bottom - 9 - h / 2, w: bin.offsetWidth / 2, h: h / 2 }; };
  const begin = () => {
    const { li } = d, r = li.getBoundingClientRect(), g = document.createElement('div');
    g.className = 'gh'; g.style.width = r.width + 'px'; g.style.height = r.height + 'px'; g.style.setProperty('--z', Math.min(0.55, 64 / r.width).toFixed(3)); g.innerHTML = `<i class="${li.dataset.c}"></i>`;
    st.append(g); li.classList.add('hole'); st.classList.add('dr'); d.g = g; d.on = true;
  };
  const move = (x, y) => {
    const { s, cx, cy, w, h } = center();
    d.g.style.transform = `translate(${x - s.left - d.ox}px,${y - s.top - d.oy}px)`;
    const gap = Math.max(Math.abs(x - cx) - w, Math.abs(y - cy) - h, 0), near = gap < 16; // 判定看指针，回收区外扩 16px 是热区
    d.near = near; bin.classList.toggle('near', near); d.g.classList.toggle('near', near);
    bin.style.setProperty('--s', still ? 1 : (1 + 0.25 * Math.max(0, 1 - gap / 90)).toFixed(3)); lab.textContent = near ? '松手删除' : '拖到这里删除';
  };
  const reset = () => { st.classList.remove('dr'); bin.classList.remove('near'); bin.style.setProperty('--s', 1); lab.textContent = '拖到这里删除'; };
  const drop = (cancel, hold) => {
    const g = d; d = null; if (!g.on) return;
    const { li, g: el } = g, s = st.getBoundingClientRect();
    if (g.near && !cancel) {
      const { cx, cy } = center(), w = el.offsetWidth, h = el.offsetHeight;
      el.classList.add('fly'); el.style.transition = 'transform .18s cubic-bezier(.4,0,1,1)'; el.style.transform = `translate(${cx - s.left - w / 2}px,${cy - s.top - h / 2}px)`;
      const next = remove(li, hold); if (!hold) next?.querySelector('.pic').focus({ preventScroll: true });
      tm.push(setTimeout(() => { el.remove(); reset(); }, still ? 0 : 230));
      return;
    }
    const r = li.getBoundingClientRect(); reset(); if (cancel) sr.textContent = '已取消';
    const end = () => { el.remove(); li.classList.remove('hole'); };
    if (still) return end();
    el.classList.remove('near'); el.style.transition = 'transform .2s cubic-bezier(.2,0,0,1)'; el.style.transform = `translate(${r.left - s.left}px,${r.top - s.top}px)`;
    tm.push(setTimeout(end, 210));
  };
  grid.addEventListener('pointerdown', (e) => {
    if (e.isTrusted && tm.length) { tm.forEach(clearTimeout); tm = []; if (d) drop(true); st.querySelector('.gh')?.remove(); list().forEach((l) => l.classList.remove('hole')); reset(); }
    const pic = e.target.closest('.pic'); if (!pic || e.button > 0 || d) return;
    const li = pic.closest('.tl'), r = li.getBoundingClientRect();
    d = { li, x0: e.clientX, y0: e.clientY, ox: e.clientX - r.left, oy: e.clientY - r.top, on: false };
    try { grid.setPointerCapture(e.pointerId); } catch {}
  });
  grid.addEventListener('pointermove', (e) => {
    if (!d) return;
    if (!d.on) { if (Math.hypot(e.clientX - d.x0, e.clientY - d.y0) < 4) return; begin(); }
    move(e.clientX, e.clientY);
  });
  grid.addEventListener('pointerup', (e) => d && drop(false, !e.isTrusted));
  grid.addEventListener('pointercancel', () => d && drop(true));
  grid.addEventListener('click', (e) => { const b = e.target.closest('.rm'); if (b) remove(b.closest('.tl'))?.querySelector('.pic').focus(); });
  root.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && d) { e.preventDefault(); return drop(true); }
    if ((e.metaKey || e.ctrlKey) && e.key === 'z' && gone.length) { e.preventDefault(); return undo(); }
    const pic = e.target.closest?.('.pic');
    if (pic && (e.key === 'Delete' || e.key === 'Backspace')) { e.preventDefault(); remove(pic.closest('.tl'))?.querySelector('.pic').focus(); }
  });
  un.addEventListener('click', undo);
  ['pointerenter', 'focusin'].forEach((t) => toast.addEventListener(t, pause));
  ['pointerleave', 'focusout'].forEach((t) => toast.addEventListener(t, () => { if (!toast.hidden && toast.classList.contains('pause')) run(); }));
  // 自动演示：把上排中间那张拖到回收区，停在可撤销的状态
  const play = () => {
    tm.forEach(clearTimeout); tm = []; d = null; clearTimeout(to); gone = []; toast.hidden = true; st.querySelector('.gh')?.remove(); reset();
    grid.replaceChildren(...P.map(make)); blank();
    const pic = list()[1].querySelector('.pic'), r = pic.getBoundingClientRect(), x0 = r.left + r.width / 2, y0 = r.top + r.height / 2, { cx, cy: cb } = center(), cy = cb - 30;
    const fire = (t, el, x, y) => el.dispatchEvent(new PointerEvent(t, { bubbles: true, composed: true, pointerId: 9, button: 0, clientX: x, clientY: y }));
    tm.push(setTimeout(() => fire('pointerdown', pic, x0, y0), 300));
    for (let k = 1; k <= 16; k++) tm.push(setTimeout(() => { if (root.host.isConnected && d) { const p = k / 16, e = p * p * (3 - 2 * p); fire('pointermove', grid, x0 + (cx - x0) * e, y0 + (cy - y0) * e); } }, 300 + k * 26));
    tm.push(setTimeout(() => { if (root.host.isConnected && d) { fire('pointerup', grid, cx, cy); } }, 1500));
  };
  root.querySelector('.rp').addEventListener('click', play);
  play();
}
</script>
