---
zh: 拖进文件夹
en: Drag into folder
aka: 拖入文件夹 文件夹打开 拖放归档 拖到文件夹
of: i-drag-sort
tab: 拖进文件夹
order: 35
---

## 是什么

把文件拖到文件夹上，文件夹盖子张开迎接；在上面停一会儿，文件夹自己弹开，露出里面的子文件夹，可以接着往里放；松手文件缩小飞进去，拖走盖子就合上，什么也不发生。

## 适合

网盘、素材库、邮件归档、笔记分组：把零散的文件归到文件夹或分组里，目标和文件在同一屏。

## 不适合

目标不在同一屏或层级很深时用“移动到…”菜单加搜索；同一列里调顺序用「拖拽排序」，看板换列用「拖到另一列」。

## 注意

文件夹是小目标，判定看指针，不看拖着的卡片边缘。放得进放不进在拖动中就显示出来；松手时再按服务端的规则校验一次，没通过就让文件直接弹回原处。

## 要点

- 拿起：位移超过 4px 才算拖，触屏里列表能滚动时先长按 300ms；文件变成一张半透明的小卡片（小图标 + 名称，不透明度 0.9）跟手、不加过渡，原位留 30% 透明的占位；拖完松手浏览器补发的那次 click 不当成点选。
- 靠近：指针进入文件夹外 24px 内，离得最近的那个底色高亮、盖子张开，其他的保持合上；拖走就合上。
- 弹开：在同一个文件夹上停 700ms，旁边弹出它的子文件夹面板，可以继续往子文件夹里放，放在面板空白处就是放进这一层，被面板盖住的文件夹这时不参与判定；指针离开文件夹和面板就收起。
- 松手：文件缩小飞进文件夹图标（240ms），文件夹的数量 +1 并弹一下，后面的文件 240ms 补上空位。
- 放不进去（只读、没有权限、已有同名文件）：拖动中文件夹描红、盖子不张开，并写出原因；在上面松手，文件夹左右轻抖一下，文件 240ms 飞回原处，提示写清原因。
- 撤销：做法同「操作后撤销」，移动后底部提示“已移到 设计稿 · 撤销”，至少留 10 秒，悬停或聚焦时暂停；⌘Z / Ctrl+Z 也能撤销，撤销后文件回到原位并获得焦点。
- 键盘：文件可聚焦，回车或空格选中，再用“移动到…”菜单选目标；放不进去的目标置灰并写原因；移动后自动选中下一个文件。拖动中按 Esc 取消，文件回原处。
- 每一步用 role="status" 播报；减少动态效果时盖子不翻、不飞、不抖、不补位动画，文件直接移走并提示。

## 提示词

给{网盘文件列表}做「拖进文件夹」：位移超过 4px 才拿起（触屏能滚动时先长按 300ms），文件变成半透明的小卡片（小图标 + 名称）跟手，原位留 30% 透明的占位；指针进入文件夹外 24px 内时，最近的那个文件夹底色高亮、盖子张开，拖走就合上；在同一个文件夹上停 700ms，旁边弹出它的子文件夹面板，可以继续往子文件夹里放，放在面板空白处就是放进这一层，离开就收起；松手后文件缩小飞进文件夹（240ms），数量 +1 并弹一下，后面的文件补位；{只读 / 没有权限 / 已有同名文件}的文件夹拖动中就描红并写原因，松手时轻抖、文件飞回原处；移动后底部提示“已移到 {文件夹} · 撤销”，至少 10 秒，悬停或聚焦时暂停，⌘Z / Ctrl+Z 也能撤销；键盘用户选中文件后用“移动到…”菜单，放不进去的目标置灰并写原因；Esc 取消拖动；每一步用 role="status" 播报；减少动态效果时不翻盖、不飞、不抖，直接移动并提示。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:8px 12px}
.box{display:grid;grid-template-rows:auto minmax(0,1fr);gap:8px;height:100%;max-width:480px;margin:0 auto}
.bar{display:flex;align-items:center;gap:8px;min-width:0}
.bar b{flex:1;min-width:0;overflow:hidden;font-size:13px;white-space:nowrap;text-overflow:ellipsis}
.mv{flex:none;width:88px;height:28px;padding:0 20px 0 8px;border:1px solid #d0d5dd;border-radius:6px;background:linear-gradient(45deg,transparent 50%,#5b616e 50%) calc(100% - 12px) 50%/5px 5px no-repeat,linear-gradient(135deg,#5b616e 50%,transparent 50%) calc(100% - 7px) 50%/5px 5px no-repeat,#fff;font-size:12px;appearance:none;-webkit-appearance:none;cursor:pointer}
.mv:disabled{opacity:.55;cursor:not-allowed}
.bar .ctl{flex:none;height:28px;padding:0 10px;font-size:12px}
.grid{position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-template-rows:repeat(2,minmax(0,1fr));gap:8px;min-height:0;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}
.tile{position:relative;display:grid;justify-items:center;align-content:center;gap:4px;min-width:0;padding:4px 2px;border:0;border-radius:12px;background:none;color:#1f2329;font-size:12px;line-height:16px;transition:background-color .16s,box-shadow .16s}
.nm{max-width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.fl{cursor:grab;touch-action:none}
.fl:hover{background:#eceef2}
.fl[aria-pressed=true]{background:#e8edff;box-shadow:inset 0 0 0 1px #9fb2f5}
.fl.hole{opacity:.3}
.fd.hot,.fd.open,.pop.hot{background:#edf1ff;box-shadow:inset 0 0 0 2px #3b5bdb}
.fd.no{background:#fef3f2;box-shadow:inset 0 0 0 2px #f04438}
.fi{position:relative;display:block;width:40px;height:32px;perspective:120px}
.fi::before{content:"";position:absolute;left:0;top:0;width:16px;height:8px;border-radius:3px 3px 0 0;background:#e5a823}
.fi::after{content:"";position:absolute;left:0;right:0;top:3px;bottom:0;border-radius:4px;background:#e5a823}
.pp{position:absolute;left:5px;right:5px;top:7px;z-index:1;height:16px;border-radius:2px;background:#fff}
.lid{position:absolute;left:0;right:0;bottom:0;z-index:2;display:grid;place-items:center;height:23px;border-radius:4px;background:#f7c548;color:#8a5a00;transform-origin:50% 100%;transition:transform .16s}
.lid svg{width:10px;height:12px}
.hot .lid,.open .lid{transform:rotateX(-42deg)}
.n{position:absolute;right:-12px;top:-6px;z-index:3;min-width:20px;height:18px;padding:0 4px;border-radius:999px;background:#fff;box-shadow:0 0 0 1px #e3e6eb;color:#5b616e;font-size:12px;font-style:normal;line-height:18px;text-align:center;font-variant-numeric:tabular-nums}
.fc{position:relative;display:block;width:28px;height:34px;border-radius:4px;background:#fff;box-shadow:inset 0 0 0 1px #d5d9e0}
.fc::before{content:"";position:absolute;left:6px;right:6px;top:8px;height:10px;background:repeating-linear-gradient(#d5d9e0 0 2px,transparent 2px 4px)}
.fc::after{content:"";position:absolute;left:5px;right:5px;bottom:5px;height:5px;border-radius:2px;background:var(--c)}
.pop{position:absolute;z-index:4;display:grid;gap:4px;padding:8px;border-radius:12px;background:#fff;box-shadow:0 12px 28px -8px rgba(16,24,40,.35),0 0 0 1px rgba(16,24,40,.06);transform-origin:0 24px}
.pop:not([hidden]){animation:pin .16s cubic-bezier(.2,.9,.3,1.2)}
@keyframes pin{from{opacity:0;transform:scale(.6)}
}
.pop.hot{box-shadow:inset 0 0 0 2px #3b5bdb,0 12px 28px -8px rgba(16,24,40,.35)}
.pt{padding:0 4px;font-size:12px;line-height:18px}
.ps{display:grid;grid-template-columns:repeat(2,64px);gap:4px}
.ps .tile{height:60px}
.gh{position:absolute;left:0;top:0;z-index:5;display:flex;align-items:center;gap:6px;height:32px;padding:0 10px 0 6px;border-radius:8px;background:#fff;box-shadow:0 8px 20px -6px rgba(16,24,40,.4),0 0 0 1px rgba(16,24,40,.06);opacity:.9;font-size:12px;white-space:nowrap;pointer-events:none}
.gh .fc{flex:none;width:16px;height:20px}
.gh .fc::before{left:3px;right:3px;top:4px;height:6px}
.gh .fc::after{left:3px;right:3px;bottom:3px;height:3px}
.toast{position:absolute;left:50%;bottom:8px;z-index:6;display:flex;align-items:center;gap:4px;max-width:calc(100% - 16px);height:32px;padding:0 4px 0 12px;border-radius:999px;background:#1f2329;color:#fff;font-size:12px;white-space:nowrap;transform:translateX(-50%);box-shadow:0 8px 20px -6px rgba(16,24,40,.5)}
.toast.nu{padding-right:12px}
.toast.bad{background:#b42318}
.tx{min-width:0;overflow:hidden;text-overflow:ellipsis}
.un{flex:none;height:24px;padding:0 8px;border:0;border-radius:999px;background:transparent;color:#a9bcff;font-size:12px;font-weight:600}
.un:hover{background:rgba(255,255,255,.12)}
.toast :focus-visible{outline-color:#a9bcff}
@container (min-width:560px){.st{padding:12px 16px}
.box{gap:12px}
.grid{grid-template-rows:repeat(2,96px);align-content:start;gap:12px}
.tile{gap:8px}
.tile>.fi,.tile>.fc{scale:1.3;margin:4px 0}
.ps{grid-template-columns:repeat(2,80px)}
.ps .tile{height:72px}
}
@media (prefers-reduced-motion:reduce){.hot .lid,.open .lid{transform:none}
}
</style>

<div class="st"><div class="box"><div class="bar"><b>项目文件</b><select class="mv" aria-label="先选中一个文件再移动" disabled></select><button type="button" class="ctl rp">重播</button></div><div class="grid" role="group" aria-label="文件：拖到文件夹上移入；也可以选中后用“移动到…”"><div class="pop" hidden><b class="pt"><span></span> /</b><div class="ps"></div></div></div></div><div class="toast" hidden><span class="tx"></span><button type="button" class="un">撤销</button></div><p class="sr" role="status"></p></div>

<script type="module">
const TREE = [{ name: '设计稿', n: 12, subs: [{ name: '终稿', n: 3 }, { name: '草稿', n: 5, has: ['首页.png'] }] }, { name: '合同', n: 6, lock: true }, { name: '归档', n: 40 }];
const FILES = [['首页.png', '#7a5af8'], ['需求.docx', '#2e90fa'], ['报价.xlsx', '#12b76a'], ['纪要.md', '#667085'], ['图标.svg', '#f79009']];
const LOCK = '<svg viewBox="0 0 10 12" aria-hidden="true"><rect x="1" y="5" width="8" height="6.5" rx="1.2" fill="currentColor"/><path d="M3 5V3.6a2 2 0 0 1 4 0V5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>';
export default function demo(root) {
  const st = root.querySelector('.st'), grid = root.querySelector('.grid'), pop = root.querySelector('.pop'), mv = root.querySelector('.mv'), toast = root.querySelector('.toast'), tx = root.querySelector('.tx'), un = root.querySelector('.un'), sr = root.querySelector('[role=status]');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let tree = [], d = null, sel = null, last = null, skip = false, tm = [], tt = 0;
  const files = () => [...grid.querySelectorAll('.fl')], folders = () => [...grid.querySelectorAll(':scope > .fd')], subs = () => [...pop.querySelectorAll('.fd')];
  const fdHtml = (f) => `<div class="tile fd"><span class="fi"><i class="pp"></i><i class="lid">${f.lock ? LOCK : ''}</i><em class="n">${f.n}</em></span><span class="nm">${f.name}</span></div>`;
  const targets = () => tree.flatMap((f, k) => [{ ref: f, path: f.name, k }, ...(f.subs || []).map((s) => ({ ref: s, path: `${f.name} / ${s.name}`, k }))]);
  const reason = (f, name) => (f.lock ? '只读' : f.has?.includes(name) ? '已有同名文件' : '');
  const dist = (r, x, y) => Math.hypot(Math.max(r.left - x, 0, x - r.right), Math.max(r.top - y, 0, y - r.bottom));
  const mid = (el) => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
  const hide = () => { clearTimeout(tt); toast.hidden = true; };
  // 底部提示：拖动中写去向和原因；放下后写结果，能撤销的留 10 秒，悬停或聚焦时暂停
  const show = (t, bad, undo) => { tx.textContent = t; un.hidden = !undo; toast.classList.toggle('bad', !!bad); toast.classList.toggle('nu', !undo); toast.hidden = false; clearTimeout(tt); if (!d) tt = setTimeout(hide, undo ? 10000 : 3000); };
  const bump = (el) => { if (el && !still) el.animate([{ scale: 1 }, { scale: 1.35 }, { scale: 1 }], { duration: 240, easing: 'ease-out' }); };
  const paint = () => { folders().forEach((el, k) => { el.querySelector('.n').textContent = tree[k].n; }); subs().forEach((el) => { el.querySelector('.n').textContent = el._f.ref.n; }); };
  // 其余文件补位：DOM 改完后从旧位置过渡回来
  const flip = (fn) => {
    const at = new Map(files().map((e) => [e, e.getBoundingClientRect()]));
    fn();
    if (still) return;
    files().forEach((e) => { const a = at.get(e); if (!a) return; const b = e.getBoundingClientRect(), dx = a.left - b.left, dy = a.top - b.top; if (dx || dy) e.animate([{ transform: `translate(${dx}px,${dy}px)` }, { transform: 'none' }], { duration: 240, easing: 'cubic-bezier(.2,0,0,1)' }); });
  };
  const ghost = (li) => { const g = document.createElement('div'); g.className = 'gh'; g.innerHTML = li.querySelector('.fc').outerHTML + `<span>${li.dataset.n}</span>`; st.append(g); return g; };
  const place = (g, x, y) => { const s = st.getBoundingClientRect(); return `translate(${x - s.left - 14}px,${y - s.top - 16}px)`; };
  const fly = (g, x, y, into, done) => { if (still) { g.remove(); return done(); } g.animate([{ transform: g.style.transform, opacity: 0.9 }, { transform: place(g, x, y) + (into ? ' scale(.2)' : ''), opacity: into ? 0 : 0.9 }], { duration: 240, easing: into ? 'cubic-bezier(.4,0,1,1)' : 'cubic-bezier(.2,0,0,1)', fill: 'forwards' }).finished.then(() => { g.remove(); done(); }); };
  const select = (li) => {
    sel = li; files().forEach((f) => f.setAttribute('aria-pressed', String(f === li)));
    mv.disabled = !li; mv.setAttribute('aria-label', li ? `把「${li.dataset.n}」移动到` : '先选中一个文件再移动');
    mv.innerHTML = '<option value="">移动到…</option>' + targets().map((t, i) => { const why = li && reason(t.ref, li.dataset.n); return `<option value="${i}"${why ? ' disabled' : ''}>${t.path}${why ? `（${why}）` : ''}</option>`; }).join('');
  };
  const move = (li, t) => {
    const name = li.dataset.n, i = files().indexOf(li);
    t.ref.n++; if (t.ref !== tree[t.k]) tree[t.k].n++; (t.ref.has ||= []).push(name);
    flip(() => li.remove()); li.classList.remove('hole'); paint();
    bump(folders()[t.k].querySelector('.n')); subs().forEach((el) => { if (el._f.ref === t.ref) bump(el.querySelector('.n')); });
    last = { li, i, t, name };
    show(`已移到 ${t.path}`, false, true); sr.textContent = `已把 ${name} 移到 ${t.path}，可以撤销`;
  };
  const undo = () => {
    if (!last) return; const { li, i, t, name } = last; last = null;
    t.ref.n--; if (t.ref !== tree[t.k]) tree[t.k].n--; t.ref.has.pop(); paint();
    flip(() => grid.insertBefore(li, files()[i] ?? pop)); hide();
    select(sel); li.focus(); sr.textContent = `已撤销，${name} 回到原处`;
  };
  const closePop = () => { pop.hidden = true; pop.classList.remove('hot'); grid.querySelector('.open')?.classList.remove('open'); };
  // 在文件夹上停 700ms：旁边弹出子文件夹面板
  const openPop = (el) => {
    if (!d) return;
    const f = el._f.ref, g = grid.getBoundingClientRect(), r = el.getBoundingClientRect();
    pop.querySelector('.pt span').textContent = f.name; pop.querySelector('.ps').innerHTML = f.subs.map(fdHtml).join('');
    subs().forEach((x, k) => { x._f = { ref: f.subs[k], path: `${f.name} / ${f.subs[k].name}`, k: el._f.k }; });
    pop._f = el._f; pop.hidden = false; el.classList.remove('hot'); el.classList.add('open');
    const w = pop.offsetWidth, right = r.right - g.left + 4;
    pop.style.left = (right + w <= g.width ? right : Math.max(0, r.left - g.left - 4 - w)) + 'px';
    pop.style.top = Math.max(0, Math.min(g.height - pop.offsetHeight, r.top - g.top)) + 'px';
    d.t = null; aim(d.x, d.y);
  };
  const aim = (x, y) => {
    d.x = x; d.y = y; d.gh.style.transform = place(d.gh, x, y);
    let t = null;
    if (!pop.hidden) {
      const parent = grid.querySelector('.open');
      if (dist(pop.getBoundingClientRect(), x, y) <= 8) t = subs().find((el) => dist(el.getBoundingClientRect(), x, y) === 0) ?? pop;
      else if (dist(parent.getBoundingClientRect(), x, y) <= 24) t = parent;
      else closePop(); // 离开文件夹和面板就收起
    }
    if (!t) { let best = 24.5; folders().forEach((el) => { const v = dist(el.getBoundingClientRect(), x, y); if (v < best) { best = v; t = el; } }); }
    if (t === d.t) return;
    d.t?.classList.remove('hot', 'no'); clearTimeout(d.timer); d.t = t;
    if (!t) return show('拖到文件夹上');
    const why = reason(t._f.ref, d.li.dataset.n);
    t.classList.add(why ? 'no' : 'hot');
    show(why ? `「${t._f.ref.name}」${why}，放不进去` : `松手放进「${t._f.path}」`, !!why);
    if (!why && t._f.ref.subs && !t.classList.contains('open')) d.timer = setTimeout(() => openPop(t), 700);
  };
  const drop = (cancel) => {
    const g = d; d = null; clearTimeout(g.timer);
    if (!g.on) return;
    skip = true;
    const { li, gh } = g, t = cancel ? null : g.t, f = t?._f, why = f && reason(f.ref, li.dataset.n);
    t?.classList.remove('hot', 'no');
    if (f && !why) {
      const [x, y] = mid(t === pop ? pop.querySelector('.pt') : t.querySelector('.fi'));
      return fly(gh, x, y, true, () => { move(li, f); if (!pop.hidden) setTimeout(closePop, still ? 0 : 480); });
    }
    if (why) {
      if (!still) t.animate([{ translate: '0' }, { translate: '-4px' }, { translate: '4px' }, { translate: '-3px' }, { translate: '3px' }, { translate: '0' }], { duration: 320 });
      show(`「${f.ref.name}」${why}，${li.dataset.n} 回到原处`, true); sr.textContent = `「${f.ref.name}」${why}，没有移动`;
    } else { hide(); if (cancel) sr.textContent = '已取消，文件回到原处'; }
    setTimeout(closePop, why && !still ? 320 : 0);
    const [x, y] = mid(li); fly(gh, x, y, false, () => li.classList.remove('hole'));
  };
  const stopDemo = () => { tm.forEach(clearTimeout); tm = []; if (d) drop(true); };
  grid.addEventListener('pointerdown', (e) => {
    const li = e.target.closest('.fl'); if (!li || e.button > 0) return;
    if (e.isTrusted) stopDemo();
    if (d) return;
    skip = false; d = { li, x0: e.clientX, y0: e.clientY, id: e.pointerId, on: false };
    try { li.setPointerCapture(e.pointerId); } catch {}
  });
  st.addEventListener('pointermove', (e) => {
    if (!d || e.pointerId !== d.id) return;
    if (!d.on) { if (Math.hypot(e.clientX - d.x0, e.clientY - d.y0) < 4) return; d.on = true; d.li.classList.add('hole'); d.gh = ghost(d.li); }
    aim(e.clientX, e.clientY);
  });
  st.addEventListener('pointerup', (e) => { if (d && e.pointerId === d.id) drop(false); });
  st.addEventListener('pointercancel', () => { if (d) drop(true); });
  // 点按 / 回车 / 空格选中文件；拖完跟着来的那次 click 不算（键盘的 detail 是 0）
  grid.addEventListener('click', (e) => { const li = e.target.closest('.fl'); if (!li) return; if (skip && e.detail) { skip = false; return; } select(sel === li ? null : li); });
  mv.addEventListener('change', () => {
    const t = targets()[mv.value], li = sel; if (!t || !li) return;
    const i = files().indexOf(li), [x, y] = mid(li), g = ghost(li), [fx, fy] = mid(folders()[t.k].querySelector('.fi'));
    li.classList.add('hole'); g.style.transform = place(g, x, y);
    fly(g, fx, fy, true, () => { move(li, t); select(files()[i] ?? files()[i - 1] ?? null); mv.focus(); });
  });
  un.addEventListener('click', undo);
  root.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && d) { e.preventDefault(); drop(true); }
    else if ((e.metaKey || e.ctrlKey) && e.key === 'z' && last) { e.preventDefault(); undo(); }
  });
  ['pointerenter', 'focusin'].forEach((k) => toast.addEventListener(k, () => clearTimeout(tt)));
  ['pointerleave', 'focusout'].forEach((k) => toast.addEventListener(k, () => { if (!toast.hidden && !un.hidden) tt = setTimeout(hide, 10000); }));
  const reset = () => {
    tree = TREE.map((f) => ({ ...f, subs: f.subs?.map((s) => ({ ...s, has: [...(s.has || [])] })) }));
    grid.querySelectorAll(':scope > .tile').forEach((t) => t.remove()); closePop(); hide(); last = null;
    pop.insertAdjacentHTML('beforebegin', tree.map(fdHtml).join('') + FILES.map(([n, c]) => `<button type="button" class="tile fl" data-n="${n}" aria-pressed="false"><span class="fc" style="--c:${c}" aria-hidden="true"></span><span class="nm">${n}</span></button>`).join(''));
    folders().forEach((el, k) => { el._f = { ref: tree[k], path: tree[k].name, k }; });
    select(null);
  };
  // 自动演示：首页.png 经过「归档」（张开）、「合同」（只读，描红），停在「设计稿」上弹开，放进「终稿」
  const play = () => {
    stopDemo(); st.querySelectorAll('.gh').forEach((g) => g.remove()); reset(); sr.textContent = '';
    if (still) return;
    const li = files()[0], [x0, y0] = mid(li), [ax, ay] = mid(folders()[2]), [bx, by] = mid(folders()[1]), [cx, cy] = mid(folders()[0]);
    const fire = (t, el, x, y) => el.dispatchEvent(new PointerEvent(t, { bubbles: true, composed: true, pointerId: 9, button: 0, clientX: x, clientY: y }));
    const path = (x1, y1, x2, y2, t0, n = 8) => { for (let k = 1; k <= n; k++) tm.push(setTimeout(() => { if (root.host.isConnected && d) fire('pointermove', st, x1 + (x2 - x1) * k / n, y1 + (y2 - y1) * k / n); }, t0 + k * 30)); };
    tm.push(setTimeout(() => { if (root.host.isConnected) fire('pointerdown', li, x0, y0); }, 400));
    path(x0, y0, ax, ay, 400); path(ax, ay, bx, by, 900); path(bx, by, cx, cy, 1700);
    tm.push(setTimeout(() => {
      if (!root.host.isConnected || !d || pop.hidden) return;
      const [sx, sy] = mid(subs()[0]); path(cx, cy, sx, sy, 0, 6);
      tm.push(setTimeout(() => { if (root.host.isConnected && d) fire('pointerup', st, sx, sy); }, 6 * 30 + 500));
    }, 2800));
  };
  root.querySelector('.rp').addEventListener('click', play);
  play();
}
</script>
