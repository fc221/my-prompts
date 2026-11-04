---
zh: 左右滑卡筛选
en: Card swipe sorting
aka: 卡片抽走 卡片滑走 左滑右滑
order: 10
---

## 是什么

几张卡片叠成一摞，拖动最上面一张会跟手倾斜，甩出去后下一张补到最前；左滑丢弃、右滑保留。

## 适合

一次只看一项、只需二选一的快速分拣：照片去留、候选人初筛、单词卡复习、推荐内容的感兴趣 / 不感兴趣。

## 不适合

需要比较、回看或批量处理时用网格加多选；超过两种去向时用按钮。列表行左滑露出按钮、行本身不飞走的是「滑动操作」；点一下把整摞展开成列表的是特效里的「叠卡展开」。

## 注意

手势看不见、方向也要记，左右两个按钮和撤销必须一直在；“丢弃”先进回收站，不要一甩就永久删除。

## 要点

- 叠放 3 张：后两张以底边为原点缩到 0.94 / 0.88，各下移约 10px，只露出下沿；后面的卡隐藏，补位时才淡入。
- 拖动时卡片跟手、不加过渡，按横向位移倾斜 dx × 0.06°，最多 ±12°；卡片设 touch-action: none 和 user-select: none。
- 松手时位移超过卡宽 30%，或速度大于 0.5px/ms 且方向一致，就带着倾斜飞出（约 300ms 减速）；否则弹回原位（约 320ms，轻微回弹）。
- 飞出的同时后面一张补到最前，缩放和位移过渡约 240ms；拖动中“保留 / 丢弃”标签按位移从 0 淡到 1，到卡宽 30% 时完全显示。
- 两侧放 ✕ / ✓ 按钮作为键盘和单手替代，按钮下显示两边的计数；最上面一张可聚焦，左右方向键等同滑动。
- 提供撤销：卡片从飞出的方向回到最前，计数同步回退；全部处理完显示汇总和“重新开始”。
- 每次分拣用 role="status" 播报“已保留「名称」，还剩 N 张”；减少动态效果时拖动仍跟手，飞出、补位、弹回直接到位。

## 提示词

给{分拣页面}做「左右滑卡筛选」：{卡片}叠放 3 张，后两张缩到 0.94 / 0.88 并各下移 10px；拖动最上面一张时跟手移动，按横向位移倾斜（dx × 0.06°，最多 12°），对应一侧的“{右滑结果} / {左滑结果}”标签按位移淡入；松手时位移超过卡宽 30% 或速度大于 0.5px/ms 就带着倾斜飞出（300ms），后面一张补位到最前（240ms），否则弹回原位；右滑{右滑结果}、左滑{左滑结果}，两侧放 ✕ / ✓ 按钮作为键盘替代并显示计数；最上面一张可聚焦，左右方向键等同滑动；提供撤销，撤回的卡片从飞出方向回到最前；全部处理完显示汇总；每次分拣用 role="status" 播报“已{右滑结果}「名称」，还剩 N 张”；减少动态效果时拖动仍跟手，飞出、补位、弹回直接到位。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<link rel="stylesheet" href="../../_shared/app-card-photos.css">
<style>
.st{display:flex;flex-direction:column;gap:6px;padding:10px 12px 12px}
.hd{flex:none;display:flex;align-items:center;gap:8px;width:100%;max-width:420px;height:24px;margin:0 auto}
.hd b{flex:none;font-weight:600}
.left{flex:1;min-width:0;overflow:hidden;color:#5b616e;font-size:12px;text-overflow:ellipsis;white-space:nowrap;font-variant-numeric:tabular-nums}
.undo{flex:none;height:24px;padding:0 10px;border:1px solid #e3e6eb;border-radius:999px;background:#fff;font-size:12px}
.undo:disabled{color:#a0a6b1;cursor:default}
.row{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;gap:10px}
.side{flex:none;display:flex;flex-direction:column;align-items:center;gap:4px;margin-bottom:20px}
.side small{color:#5b616e;font-size:11px;white-space:nowrap;font-variant-numeric:tabular-nums}
.act{display:grid;place-items:center;width:44px;height:44px;padding:0;border:1px solid #e3e6eb;border-radius:50%;background:#fff;font-size:18px;font-weight:600;line-height:1;box-shadow:0 2px 6px rgba(31,35,41,.08);transition:transform .16s cubic-bezier(.2,.9,.22,1)}
.act:active{transform:scale(.9)}
.act:disabled{opacity:.4;cursor:default;transform:none}
.no{color:#d92d20}
.yes{color:#12805c}
.stage{position:relative;flex:none;padding-bottom:20px}
.deck{position:relative;width:min(calc((100cqh - 72px) * 1.25),calc(100cqw - 140px));aspect-ratio:5/4}
.card{position:absolute;inset:0;overflow:hidden;border-radius:14px;box-shadow:0 6px 18px rgba(31,35,41,.18);transform-origin:50% 100%;touch-action:none;user-select:none;-webkit-user-select:none;transition:transform .24s cubic-bezier(.2,0,0,1),opacity .24s}
.card[data-d="0"]{z-index:4;cursor:grab}
.card[data-d="1"]{z-index:3;transform:translateY(10px) scale(.94)}
.card[data-d="2"]{z-index:2;transform:translateY(20px) scale(.88)}
.card[data-d="3"]{z-index:1;transform:translateY(20px) scale(.88);opacity:0}
.card[data-d="x"]{z-index:5}
.card.drag{cursor:grabbing}
.tag{position:absolute;top:10px;padding:0 8px;border:2px solid;border-radius:6px;background:rgba(255,255,255,.9);font-size:13px;font-weight:700;line-height:20px;letter-spacing:.1em;opacity:0;transition:opacity .2s}
.drag .tag{transition:none}
.keep{left:10px;color:#12805c;transform:rotate(-10deg)}
.drop{right:10px;color:#d92d20;transform:rotate(10deg)}
.cap{position:absolute;left:0;right:0;bottom:0;display:flex;align-items:baseline;gap:6px;padding:18px 10px 8px;background:linear-gradient(transparent,rgba(16,20,28,.5));color:#fff;transition:opacity .2s}
.card:not([data-d="0"]) .cap{opacity:0}
.cap b{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cap small{flex:none;font-size:11px;opacity:.85}
.done{position:absolute;inset:0 0 20px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;border:1.5px dashed #c9ced6;border-radius:14px;text-align:center}
.done span{color:#5b616e;font-size:12px}
.again{height:28px;margin-top:6px;padding:0 12px;border:0;border-radius:999px;background:#1f2329;color:#fff;font-size:12px}
@container (min-width:560px){.cap{padding:28px 14px 12px;font-size:15px}
.cap small{font-size:12px}
.tag{top:16px;font-size:16px;line-height:26px}
.keep{left:16px}
.drop{right:16px}
}
</style>

<div class="st"><div class="hd"><b>整理旅行照片</b><span class="left">剩 6 张</span><button type="button" class="undo" disabled>撤销</button></div><div class="row"><div class="side"><button type="button" class="act no" aria-label="丢弃这张">✕</button><small>丢弃 <span class="cn">0</span></small></div><div class="stage"><div class="deck"></div><div class="done" hidden><b>整理完了</b><span class="sum"></span><button type="button" class="again">重新开始</button></div></div><div class="side"><button type="button" class="act yes" aria-label="保留这张">✓</button><small>保留 <span class="cy">0</span></small></div></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const D = [['ph2', '青屿湾', '10月3日'], ['ph1', '镜湖', '10月4日'], ['ph3', '松岭步道', '10月4日'], ['ph4', '鸣沙台', '10月5日'], ['ph5', '星野营地', '10月5日'], ['ph6', '南坡花田', '10月6日']];
  const deck = root.querySelector('.deck'), left = root.querySelector('.left'), undo = root.querySelector('.undo'), live = root.querySelector('.sr'), done = root.querySelector('.done'), again = root.querySelector('.again');
  const no = root.querySelector('.no'), yes = root.querySelector('.yes'), cn = root.querySelector('.cn'), cy = root.querySelector('.cy'), still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = D.map(([c, n, d]) => {
    const el = document.createElement('div'); el.className = 'card ' + c; el.setAttribute('role', 'img'); el.setAttribute('aria-label', `${n}，${d}。左右方向键分拣`);
    el.innerHTML = `<span class="tag keep" aria-hidden="true">保留</span><span class="tag drop" aria-hidden="true">丢弃</span><div class="cap" aria-hidden="true"><b>${n}</b><small>${d}</small></div>`;
    deck.append(el); return el;
  });
  let idx = 0, hist = [];
  const tags = (el, x) => { const w = deck.offsetWidth * 0.3; el.querySelector('.keep').style.opacity = Math.max(0, Math.min(1, x / w)); el.querySelector('.drop').style.opacity = Math.max(0, Math.min(1, -x / w)); };
  const sync = () => {
    cards.forEach((el, i) => { const d = i - idx; if (d >= 0) { el.dataset.d = Math.min(d, 3); el.hidden = d > 3; } el.tabIndex = d === 0 ? 0 : -1; el.setAttribute('aria-hidden', String(d !== 0)); });
    const k = hist.filter((d) => d > 0).length, end = idx >= cards.length;
    cy.textContent = k; cn.textContent = hist.length - k; undo.disabled = !hist.length; no.disabled = yes.disabled = end;
    left.textContent = end ? '已整理完' : `剩 ${cards.length - idx} 张`;
    done.hidden = !end; done.querySelector('.sum').textContent = `保留 ${k} 张 · 丢弃 ${hist.length - k} 张`;
  };
  const far = () => root.host.clientWidth / 2 + deck.offsetWidth;
  const fly = (dir, y = 0, quiet) => { // 带着当前倾斜飞出，后面一张同时补位
    const el = cards[idx]; if (!el) return;
    const had = root.activeElement === el;
    el.style.transition = 'transform .3s cubic-bezier(.2,.6,.35,1)';
    el.style.transform = `translate(${dir * far()}px,${y + 30}px) rotate(${dir * 16}deg)`;
    el.dataset.d = 'x'; tags(el, dir * deck.offsetWidth); hist.push(dir); idx++; sync();
    setTimeout(() => { if (cards.indexOf(el) < idx) el.hidden = true; }, still ? 0 : 300);
    if (!quiet) live.textContent = `已${dir > 0 ? '保留' : '丢弃'}「${D[idx - 1][1]}」，${idx < cards.length ? `还剩 ${cards.length - idx} 张` : '全部整理完了'}`;
    if (had) (cards[idx] || again).focus();
  };
  deck.addEventListener('pointerdown', (e) => {
    const el = e.target.closest('.card'); if (el !== cards[idx] || e.button > 0) return;
    const x0 = e.clientX, y0 = e.clientY, w = deck.offsetWidth; let x = 0, y = 0, v = 0, lx = x0, lt = e.timeStamp;
    el.setPointerCapture(e.pointerId); el.classList.add('drag'); el.style.transition = 'none';
    const move = (ev) => {
      x = ev.clientX - x0; y = ev.clientY - y0;
      if (ev.timeStamp > lt) { v = (ev.clientX - lx) / (ev.timeStamp - lt); lx = ev.clientX; lt = ev.timeStamp; }
      el.style.transform = `translate(${x}px,${y}px) rotate(${Math.max(-12, Math.min(12, x * 0.06))}deg)`; tags(el, x);
    };
    const up = (ev) => {
      el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); el.classList.remove('drag');
      if (ev.timeStamp - lt > 100) v = 0; // 停住再松手不算甩
      const dir = Math.abs(x) > w * 0.3 ? Math.sign(x) : Math.abs(v) > 0.5 && Math.sign(v) === Math.sign(x) ? Math.sign(v) : 0;
      if (dir && ev.type === 'pointerup') fly(dir, y);
      else { el.style.transition = 'transform .32s cubic-bezier(.34,1.4,.64,1)'; el.style.transform = ''; tags(el, 0); }
    };
    el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  });
  deck.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); fly(e.key === 'ArrowRight' ? 1 : -1); } });
  no.onclick = () => fly(-1); yes.onclick = () => fly(1);
  undo.onclick = () => { // 从飞出的方向回到最前
    const dir = hist.pop(); if (!dir) return; idx--; const el = cards[idx];
    el.hidden = false; el.style.transition = 'none'; el.style.transform = `translate(${dir * far()}px,30px) rotate(${dir * 16}deg)`; void el.offsetWidth;
    el.style.transition = ''; el.style.transform = ''; tags(el, 0); sync();
    live.textContent = `已撤销，「${D[idx][1]}」回到最前`;
  };
  again.onclick = () => { idx = 0; hist = []; cards.forEach((el) => { el.style.transition = 'none'; el.style.transform = ''; tags(el, 0); }); sync(); cards[0].focus(); live.textContent = '重新开始，共 6 张'; };
  sync();
  setTimeout(() => { // 缩略图：先往右拖一点露出“保留”，再甩出去
    if (!root.host.isConnected || idx) return;
    if (still) return fly(1, 0, true);
    const el = cards[0], dx = deck.offsetWidth * 0.22;
    el.style.transition = 'transform .36s cubic-bezier(.2,0,0,1)'; el.style.transform = `translate(${dx}px,4px) rotate(${Math.min(12, dx * 0.06)}deg)`; tags(el, dx);
    setTimeout(() => { if (root.host.isConnected && !idx) fly(1, 4, true); }, 420);
  }, 250);
}
</script>
