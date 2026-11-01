---
zh: 一键排整齐
en: One-click tidy
order: 40
---

## 是什么

画布上东一张西一张的卡片，点“排整齐”后按原来大致的先后顺序对齐成整齐的行，间距统一、互不重叠；锁定的卡片原地不动，撤销一次就回到整理前。

## 适合

头脑风暴后的便签墙、随手拖进来的图片素材、看板上被拖散的卡片：内容不用动，只是摆乱了。

## 不适合

有连线关系的流程图用分层或树形自动布局，排成网格会把关系打乱；用户精心摆过的版面不要自动整理，只在用户点按钮时才动。

## 注意

整理要保住用户原来的阅读顺序（从上到下、从左到右），不要按创建时间或随机重排；整次整理算一步操作，撤销一次就完全恢复到原来的位置。

## 要点

- 排序：先按卡片中心的纵坐标分行，相差不到半张卡片高的算同一行，行内再按横坐标排
- 间距统一 8–16px（按卡片大小定），每行高度取这一行最高的卡片，卡片顶端对齐，不压扁内容
- 有选中时只整理选中的卡片，没有选中才整理全部；锁定的卡片不动，其他卡片排到它旁边绕开它
- 卡片从旧位置滑到新位置用 250–300ms；整理中再点一次从当前位置接着走，不叠出第二套动画
- 完成后提示“已整理 N 张，锁定的 M 张没动”并给“撤销”，Ctrl/⌘+Z 一次恢复
- 按钮能用键盘触发，焦点留在按钮上，提示用 role="status" 播报；减少动态效果时卡片直接到位

## 提示词

给{画布}加「一键排整齐」按钮：点击后把{卡片}排成整齐的行——先按卡片中心纵坐标分行（相差不到半张卡片高算同一行），行内按横坐标排，保住原来的阅读顺序；间距统一 12px，行高取该行最高的卡片，顶端对齐，排满一行换行；有选中时只整理选中的，否则整理全部；锁定的卡片原地不动，其他卡片绕开它；移动用 280ms 过渡，整理中再点从当前位置接着走；完成后用 role="status" 提示“已整理 N 张，锁定的 M 张没动”并给“撤销”，整次整理是一步撤销，Ctrl/⌘+Z 一次恢复；减少动态效果时直接到位。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(0,1fr) auto;background:#f3f4f7}
.bd{--cw:58px;--sh:30px;--th:44px}
.bd{position:relative;overflow:hidden;background-image:radial-gradient(#cfd4dc 1px,transparent 1.4px);background-size:20px 20px;touch-action:none;user-select:none}
.cd{position:absolute;left:0;top:0;display:flex;flex-direction:column;justify-content:center;width:var(--cw);height:var(--sh);padding:0 7px;border:1px solid rgba(16,24,40,.08);border-radius:5px;background:var(--c);box-shadow:0 1px 3px rgba(16,24,40,.12);color:#1f2329;text-align:left;cursor:grab;transform:translate(var(--x),var(--y)) rotate(var(--r))}
.cd{transition:none}
.cd.tall{height:var(--th)}
.cd b{font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cd small{color:rgba(31,35,41,.6);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cd.lock{width:calc(var(--cw) * 1.4);border-style:dashed;border-color:#aab0bb;background:#fff;cursor:default}
.cd.lock b{display:flex;align-items:center;gap:4px}
.cd.lock svg{flex:none;width:11px;height:11px;fill:#5b616e}
.anim .cd{transition:transform .28s cubic-bezier(.2,.8,.2,1)}
.ft{display:flex;align-items:center;gap:6px;height:36px;padding:0 8px 0 12px;border-top:1px solid #e3e6eb;background:#fff}
.msg{flex:1;margin:0;min-width:0;color:#5b616e;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bt{display:inline-flex;align-items:center;justify-content:center;flex:none;height:26px;min-width:28px;padding:0 10px;border:1px solid #d0d5dd;border-radius:7px;background:#fff;color:#1f2329;font-size:12px;font-weight:500;white-space:nowrap;box-shadow:0 1px 2px rgba(16,24,40,.05)}
.bt:hover{background:#f5f6f8}
.bt:disabled{opacity:.45;cursor:default;background:#fff}
.bt.go{border-color:#3b5bdb;background:#3b5bdb;color:#fff}
.bt.go:hover{background:#2f4ac0;border-color:#2f4ac0}
.cur{position:absolute;left:0;top:0;z-index:3;display:none;width:16px;height:16px;pointer-events:none;transition:transform .4s cubic-bezier(.3,.7,.3,1)}
@container (min-width:560px){.bd{--cw:84px;--sh:38px;--th:56px}
.cd{padding:0 10px}
.cd b{font-size:13px}
.ft{height:40px;padding:0 10px 0 16px}
}
</style>

<div class="st"><div class="bd" role="group" aria-label="活动筹备便签墙，可拖动或用方向键移动便签"></div><div class="ft"><p class="msg" role="status">便签摆乱了？点“排整齐”</p><button type="button" class="bt un" disabled>撤销</button><button type="button" class="bt go">排整齐</button></div><svg class="cur" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 1.5l10.5 6.8-4.6.9-2.1 4.6z" fill="#1f2329" stroke="#fff" stroke-width="1.2" stroke-linejoin="round"/></svg></div>

<script type="module">
export default function demo(root) {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const st = root.querySelector('.st'), bd = root.querySelector('.bd'), msg = root.querySelector('.msg'), go = root.querySelector('.go'), un = root.querySelector('.un'), cur = root.querySelector('.cur');
  const PIN = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4 1h4l-.6 3.2L9.5 6v1H6.6L6 11l-.6-4H2.5V6l2.1-1.8z"/></svg>';
  const D = [['海报', '周三前', '#ffdeeb', 0.04, 0.55, -4], ['场地', '', '#d0ebff', 0.3, 0.04, 3], ['报名表', '已上线', '#d3f9d8', 0.56, 0.42, -2], ['嘉宾', '', '#fff3bf', 0.12, 0.06, 2], ['物料', '待采购', '#fff3bf', 0.36, 0.94, 4], ['预算', '', '#ffdeeb', 0.8, 0.08, -3], ['主题', '秋日市集', '', 1, 0.96, 0, true]];
  const cards = D.map(([t, s, c, fx, fy, r, lock], i) => {
    const el = document.createElement(lock ? 'div' : 'button'); if (!lock) el.type = 'button'; el.className = 'cd' + (s ? ' tall' : '') + (lock ? ' lock' : ''); el.style.setProperty('--c', c);
    el.innerHTML = `<b>${lock ? PIN : ''}${t}</b>${s ? `<small>${s}</small>` : ''}${lock ? '<span class="sr">（已锁定，整理时不动）</span>' : ''}`; if (!lock) el.setAttribute('aria-label', `${t}${s ? '，' + s : ''}，方向键移动`);
    bd.append(el); return { i, el, t, fx, fy, r, lock: !!lock, x: 0, y: 0, w: 0, h: 0 };
  });
  let bw = 0, bh = 0, snap = null, stop = false, tm = 0;
  const put = (c) => { c.el.style.setProperty('--x', c.x + 'px'); c.el.style.setProperty('--y', c.y + 'px'); c.el.style.setProperty('--r', c.r + 'deg'); };
  const animate = () => { bd.classList.add('anim'); clearTimeout(tm); tm = setTimeout(() => bd.classList.remove('anim'), 320); };
  // 保住阅读顺序：按中心纵坐标分行（差不到半张卡片高算同一行），行内按横坐标；锁定的卡片不动，其余绕开它
  const plan = () => {
    const P = 8, G = bw > 500 ? 12 : 8, rows = [];
    cards.filter((c) => !c.lock).sort((a, b) => a.y + a.h / 2 - (b.y + b.h / 2)).forEach((c) => {
      const cy = c.y + c.h / 2, row = rows.at(-1);
      if (row && Math.abs(cy - row.cy) < c.h / 2) row.items.push(c); else rows.push({ cy, items: [c] });
    });
    const locked = cards.filter((c) => c.lock).map((c) => ({ l: c.x - G, t: c.y - G, r: c.x + c.w + G, b: c.y + c.h + G }));
    const out = new Map(); let x = P, y = P, rh = 0;
    rows.flatMap((r) => r.items.sort((a, b) => a.x - b.x)).forEach((c) => {
      for (let n = 0; n < 20; n++) {
        if (x + c.w > bw - P && x > P) { x = P; y += rh + G; rh = 0; }
        const k = locked.find((q) => x < q.r && x + c.w > q.l && y < q.b && y + c.h > q.t);
        if (!k) break; x = k.r;
      }
      out.set(c, [x, y]); x += c.w + G; rh = Math.max(rh, c.h);
    });
    return out;
  };
  const tidy = () => {
    const out = plan(), moved = [...out].filter(([c, [x, y]]) => Math.abs(c.x - x) > 0.5 || Math.abs(c.y - y) > 0.5 || c.r);
    if (!moved.length) { msg.textContent = '已经很整齐了'; return; }
    snap = cards.map((c) => [c.x, c.y, c.r]); animate();
    out.forEach(([x, y], c) => { c.x = x; c.y = y; c.r = 0; put(c); });
    const L = cards.filter((c) => c.lock).length; un.disabled = false;
    msg.textContent = `已整理 ${out.size} 张${L ? `，锁定的 ${L} 张没动` : ''}`;
  };
  const undo = () => { // 整次整理是一步，撤销一次全部回原位
    if (!snap) return; animate(); cards.forEach((c, i) => { [c.x, c.y, c.r] = snap[i]; put(c); }); snap = null; un.disabled = true; msg.textContent = '已撤销整理，回到原来的位置';
    if (root.activeElement === un) go.focus();
  };
  const manual = (c, x, y) => { c.x = Math.max(0, Math.min(bw - c.w, x)); c.y = Math.max(0, Math.min(bh - c.h, y)); put(c); if (snap) { snap = null; un.disabled = true; } };
  go.addEventListener('click', () => { stop = true; cur.style.display = 'none'; tidy(); });
  un.addEventListener('click', undo);
  root.addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) { e.preventDefault(); undo(); } });
  const local = (e) => { const r = bd.getBoundingClientRect(), f = bd.clientWidth / r.width; return [(e.clientX - r.left) * f, (e.clientY - r.top) * f]; };
  let drag = null;
  cards.filter((c) => !c.lock).forEach((c) => {
    c.el.addEventListener('pointerdown', (e) => { if (e.button) return; stop = true; const [x, y] = local(e); drag = { c, dx: x - c.x, dy: y - c.y }; bd.classList.remove('anim'); try { c.el.setPointerCapture(e.pointerId); } catch {} });
    c.el.addEventListener('pointermove', (e) => { if (drag?.c === c) { const [x, y] = local(e); manual(c, x - drag.dx, y - drag.dy); } });
    ['pointerup', 'pointercancel'].forEach((t) => c.el.addEventListener(t, () => { drag = null; }));
    c.el.addEventListener('keydown', (e) => {
      const s = e.shiftKey ? 40 : 8, dx = { ArrowLeft: -s, ArrowRight: s }[e.key] || 0, dy = { ArrowUp: -s, ArrowDown: s }[e.key] || 0;
      if (dx || dy) { e.preventDefault(); stop = true; manual(c, c.x + dx, c.y + dy); }
    });
  });
  const layout = (init) => {
    bw = bd.clientWidth; bh = bd.clientHeight;
    cards.forEach((c) => { c.w = c.el.offsetWidth; c.h = c.el.offsetHeight; if (init) { c.x = Math.round(6 + c.fx * (bw - c.w - 12)); c.y = Math.round(6 + c.fy * (bh - c.h - 12)); } c.x = Math.max(0, Math.min(bw - c.w, c.x)); c.y = Math.max(0, Math.min(bh - c.h, c.y)); put(c); });
  };
  // 挂载后演示一次：指针移到“排整齐”并点击
  const auto = () => {
    if (still) { tidy(); return; }
    const s = st.getBoundingClientRect(), g = go.getBoundingClientRect();
    cur.style.transform = `translate(${g.left - s.left - 40}px,${g.top - s.top - 50}px)`; cur.style.display = 'block'; void cur.offsetWidth;
    cur.style.transform = `translate(${g.left - s.left + g.width / 2}px,${g.top - s.top + g.height / 2}px)`;
    setTimeout(() => { if (!stop && root.host.isConnected) { tidy(); setTimeout(() => { if (!stop) cur.style.display = 'none'; }, 900); } }, 500);
  };
  let first = true;
  const ro = new ResizeObserver(() => {
    if (!root.host.isConnected) { ro.disconnect(); return; }
    layout(first); if (first) { first = false; setTimeout(() => { if (!stop && root.host.isConnected) auto(); }, 500); }
  });
  ro.observe(bd);
}
</script>
