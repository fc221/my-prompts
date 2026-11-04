---
zh: 空白处拉框多选
en: Rubber-band selection
order: 130
tab: 拉框
---

## 是什么

在网格的空白处按下拖动，拉出一个半透明的矩形框，框碰到的项目实时高亮，松手后成为选中集合；往哪个方向拉都可以。

## 适合

桌面端的素材库、文件夹图标视图、相册网格、附件墙这类整齐排列的网格，一次要选一片挨在一起的项目。

## 不适合

手机上用「长按多选」；线性列表里选连续一段用「Shift 范围多选」；画布上框住后还要整组拖动、编组的，用「框住几张卡一起挪」；项目之间几乎没有空白、框选无处起手时，在工具栏放一个“框选”模式开关。

## 注意

在项目上按下是点选或拖动这个项目，只有在空白处按下才拉框。起手判定错了，用户想挪一张图却拉出了一个框。

## 要点

- 按下后移动超过 4px 才出框；不到 4px 就松手算点空白，清空选择
- 框由按下点和当前点两个角算出，向左上、右下拉结果一样；框内浅主色填充、1px 主色描边
- 判定规则全站统一：网格里用“碰到就选”，框只要擦到项目的边就算；不要这个页面“碰到就选”、那个页面“完全框住才选”
- 拖动中只是预览，松手才提交；拖动中按 Esc 取消，恢复成拉框前的选择
- 不按键时框选替换原有选择；按住 Shift 追加，按住 ⌘ / Ctrl 把框到的项目反选
- 容器能滚动时，框拉到上下边缘 32px 内自动滚动，越靠边越快，坐标按滚动后的内容位置算
- 键盘等效：方向键移动焦点、空格切换选中、⌘ / Ctrl + A 全选、Esc 清空；“已选 N 项”放在 role="status" 里；选中态用勾和描边，不只靠底色

## 提示词

给{素材网格}加「空白处拉框多选」：在网格空白处按下并移动超过 4px 时出现选框（浅主色填充 + 1px 主色描边），框由按下点和当前点两角算出，向任意方向拉都行；框碰到的项目实时高亮，松手才提交为选中，拖动中按 Esc 取消并恢复原来的选择；不到 4px 就松手视为点空白，清空选择；在项目上按下仍是点选或拖动项目，不出框；不按键替换选择，按住 Shift 追加，按住 ⌘ / Ctrl 反选框到的项目；容器可滚动时拉到上下边缘 32px 内自动滚动；键盘用方向键移动焦点、空格切换、⌘ / Ctrl + A 全选、Esc 清空；顶部显示“已选 N 项”并用 role="status" 播报；选中项带勾和描边。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:10px 14px}
.box{display:grid;grid-template-rows:auto minmax(0,1fr);gap:6px;height:100%;max-width:640px;margin:0 auto}
.bar{display:flex;align-items:center;gap:8px;min-width:0}
.bar b{flex:none;font-size:13px}
.cnt{flex:none;padding:0 8px;border-radius:999px;background:#edf1ff;color:#3b5bdb;font-size:12px;font-weight:600;line-height:20px;font-variant-numeric:tabular-nums}
.tip{flex:1;min-width:0;overflow:hidden;color:#667085;font-size:12px;white-space:nowrap;text-overflow:ellipsis}
.bar .ctl{flex:none;height:28px;margin-left:auto;padding:0 10px;font-size:12px}
.area{position:relative;min-height:0;overflow-y:auto;border:1px solid #e3e6eb;border-radius:12px;background:#fff;touch-action:none;user-select:none;-webkit-user-select:none;scrollbar-width:thin;cursor:crosshair}
.area:focus{outline:none}
.in{position:relative;padding:10px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(44px,1fr));gap:10px}
.t{position:relative;aspect-ratio:1;border-radius:8px;cursor:pointer;transition:box-shadow .12s,transform .12s}
.t:nth-child(7n+1){background:linear-gradient(180deg,#9bd0f5,#e9f6ff 58%,#5f9c73 59%)}
.t:nth-child(7n+2){background:radial-gradient(circle at 70% 32%,#fff2c2 0 12%,transparent 13%),linear-gradient(180deg,#f7a072,#f6d38a 60%,#7c5a4a 61%)}
.t:nth-child(7n+3){background:linear-gradient(135deg,#2b3a67,#556cb0 55%,#a7b4e6)}
.t:nth-child(7n+4){background:radial-gradient(circle at 35% 40%,#f3d9b1 0 22%,transparent 23%),linear-gradient(160deg,#c08457,#7a4b2f)}
.t:nth-child(7n+5){background:linear-gradient(180deg,#d4ecd9,#9fcfae 50%,#3f7d5b 51%)}
.t:nth-child(7n+6){background:linear-gradient(120deg,#f4c6d6,#e889a8 55%,#9a4a6d)}
.t:nth-child(7n){background:linear-gradient(180deg,#1b2636,#33475f 62%,#e6b34a 63% 66%,#1b2636 67%)}
.t::after{content:"";position:absolute;top:4px;right:4px;display:grid;place-items:center;width:14px;height:14px;border:1.5px solid rgba(255,255,255,.9);border-radius:50%;background:rgba(16,24,40,.18);color:#fff;font-size:9px;font-weight:700;line-height:1;opacity:0;transition:opacity .12s}
.t:hover::after{opacity:1}
.t[aria-selected=true]{box-shadow:0 0 0 2px #fff,0 0 0 4px #3b5bdb;transform:scale(.94)}
.t[aria-selected=true]::after{content:"✓";border-color:#fff;background:#3b5bdb;opacity:1}
.t:focus-visible{outline-offset:3px}
.mq{position:absolute;border:1px solid #3b5bdb;border-radius:2px;background:rgba(59,91,219,.12);pointer-events:none}
@container (max-width:310px){.tip{display:none}
}
@container (min-width:560px){.grid{grid-template-columns:repeat(auto-fill,minmax(64px,1fr));gap:12px}
.in{padding:12px}
}
@media (prefers-reduced-motion:reduce){.t{transition:none}
.t[aria-selected=true]{transform:none}
}
</style>

<div class="st"><div class="box"><div class="bar"><b>素材库</b><span class="cnt">已选 0 项</span><span class="tip">空白处拖动框选 · Shift 追加 · ⌘ / Ctrl 反选</span><button type="button" class="ctl rp">重播</button></div><div class="area" tabindex="-1"><div class="in"><div class="grid" role="listbox" aria-multiselectable="true" aria-label="素材，方向键移动，空格选择，Ctrl 或 ⌘ 加 A 全选，Esc 清空"></div><i class="mq" hidden></i></div></div></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const area = root.querySelector('.area'), inn = root.querySelector('.in'), grid = root.querySelector('.grid'), mq = root.querySelector('.mq'), cnt = root.querySelector('.cnt'), say = root.querySelector('.sr');
  grid.innerHTML = Array.from({ length: 24 }, (_, i) => `<div class="t" role="option" aria-selected="false" tabindex="${i ? -1 : 0}" aria-label="素材 ${i + 1}"></div>`).join('');
  const tiles = [...grid.children];
  let sel = new Set(), base = new Set(), d = null, raf = 0, tm = [];
  const paint = (s) => { tiles.forEach((t, i) => t.setAttribute('aria-selected', String(s.has(i)))); cnt.textContent = `已选 ${s.size} 项`; };
  const commit = (s, msg) => { sel = s; paint(s); say.textContent = msg ?? `已选 ${s.size} 项`; };
  // 内容坐标：.in 跟着滚动走，所以减去它的位置就等于“滚动后的内容位置”
  const pt = (cx, cy) => { const r = inn.getBoundingClientRect(); return [cx - r.left, cy - r.top]; };
  const update = () => {
    const [x, y] = pt(d.cx, d.cy), l = Math.min(x, d.x), t = Math.min(y, d.y), w = Math.abs(x - d.x), h = Math.abs(y - d.y);
    Object.assign(mq.style, { left: l + 'px', top: t + 'px', width: w + 'px', height: h + 'px' });
    const s = d.mode === 'set' ? new Set() : new Set(base);
    tiles.forEach((el, i) => { // 碰到就选
      if (el.offsetLeft < l + w && el.offsetLeft + el.offsetWidth > l && el.offsetTop < t + h && el.offsetTop + el.offsetHeight > t) d.mode === 'flip' && base.has(i) ? s.delete(i) : s.add(i);
    });
    d.s = s; paint(s);
  };
  const edge = () => { // 拉到上下边缘 32px 内自动滚动，越靠边越快
    cancelAnimationFrame(raf);
    const loop = () => {
      if (!d || !d.on || !root.host.isConnected) return;
      const r = area.getBoundingClientRect(), z = 32, v = d.cy < r.top + z ? d.cy - r.top - z : d.cy > r.bottom - z ? d.cy - r.bottom + z : 0;
      if (!v) return;
      const before = area.scrollTop; area.scrollTop += v / 4;
      if (area.scrollTop !== before) update();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
  };
  area.addEventListener('pointerdown', (e) => {
    if (e.button > 0 || e.target.closest('.t')) return; // 在项目上按下走点选，不出框
    const [x, y] = pt(e.clientX, e.clientY);
    d = { x, y, cx: e.clientX, cy: e.clientY, x0: e.clientX, y0: e.clientY, on: false, mode: e.shiftKey ? 'add' : e.metaKey || e.ctrlKey ? 'flip' : 'set' };
    base = new Set(sel);
    try { area.setPointerCapture(e.pointerId); } catch {}
    if (e.isTrusted) area.focus({ preventScroll: true }); // 自动演示的模拟事件不抢页面焦点
  });
  area.addEventListener('pointermove', (e) => {
    if (!d) return;
    d.cx = e.clientX; d.cy = e.clientY;
    if (!d.on) { if (Math.hypot(d.cx - d.x0, d.cy - d.y0) < 4) return; d.on = true; mq.hidden = false; }
    update(); edge();
  });
  const end = (e) => {
    if (!d) return;
    const g = d; d = null; cancelAnimationFrame(raf); mq.hidden = true;
    if (!g.on) { if (e.type === 'pointerup' && sel.size) commit(new Set(), '已清空选择'); return; }
    commit(g.s);
  };
  area.addEventListener('pointerup', end); area.addEventListener('pointercancel', end);
  const focusTile = (i) => { tiles.forEach((t) => (t.tabIndex = -1)); tiles[i].tabIndex = 0; tiles[i].focus(); };
  grid.addEventListener('click', (e) => {
    const t = e.target.closest('.t'); if (!t) return;
    const i = tiles.indexOf(t), s = e.metaKey || e.ctrlKey || e.shiftKey ? new Set(sel) : new Set();
    s.has(i) ? s.delete(i) : s.add(i);
    commit(s); focusTile(i);
  });
  root.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (d) { d = null; cancelAnimationFrame(raf); mq.hidden = true; commit(base, '已取消框选，恢复原来的选择'); }
      else if (sel.size) commit(new Set(), '已清空选择');
      return;
    }
    const t = e.target.closest?.('.t'); if (!t) return;
    const i = tiles.indexOf(t), cols = tiles.filter((x) => x.offsetTop === tiles[0].offsetTop).length;
    const go = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: cols, ArrowUp: -cols }[e.key];
    if (go !== undefined) { e.preventDefault(); focusTile(Math.max(0, Math.min(tiles.length - 1, i + go))); }
    else if (e.key === ' ') { e.preventDefault(); const s = new Set(sel); s.has(i) ? s.delete(i) : s.add(i); commit(s); }
    else if (e.key === 'a' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); commit(new Set(tiles.map((_, k) => k)), '已全选 24 项'); }
  });
  // 自动演示：从第 2 行第 4 张右下角的空白处，往左上拉到第 1 行第 2 张，框住 2 × 3 张
  const play = () => {
    tm.forEach(clearTimeout); tm = []; area.scrollTop = 0; commit(new Set(), '');
    const cols = tiles.filter((x) => x.offsetTop === tiles[0].offsetTop).length, a = tiles[cols + 3] || tiles[tiles.length - 1], b = tiles[1];
    const r = inn.getBoundingClientRect(), gap = parseFloat(getComputedStyle(grid).columnGap) / 2;
    const x0 = r.left + a.offsetLeft + a.offsetWidth + gap, y0 = r.top + a.offsetTop + a.offsetHeight + gap, x1 = r.left + b.offsetLeft + 10, y1 = r.top + b.offsetTop + 10;
    const fire = (type, el, x, y) => el.dispatchEvent(new PointerEvent(type, { bubbles: true, pointerId: 9, button: 0, clientX: x, clientY: y }));
    fire('pointerdown', inn, x0, y0);
    for (let k = 1; k <= 14; k++) tm.push(setTimeout(() => { if (root.host.isConnected) fire('pointermove', area, x0 + (x1 - x0) * k / 14, y0 + (y1 - y0) * k / 14); }, k * 32));
    tm.push(setTimeout(() => { if (root.host.isConnected) fire('pointerup', area, x1, y1); }, 15 * 32 + 260));
  };
  root.querySelector('.rp').addEventListener('click', play);
  tm.push(setTimeout(() => { if (root.host.isConnected) play(); }, 400));
}
</script>
