---
zh: 拖到另一列
en: Cross-column drag
order: 20
of: i-drag-sort
tab: 跨列
---

## 是什么

把一张卡片从一列拖到另一列（如看板的“待排期”拖到“已上线”）：经过的列边框亮起，能放的位置出现空槽，放不进去的列直接写出原因，松手才真正移动。

## 适合

看板改状态、把任务转给另一位负责人、把文件拖进文件夹、把商品拖进另一个分组。

## 不适合

同一列里调顺序用「拖拽排序」；目标列在屏幕外、或分组有几十个时，用“移动到…”菜单加搜索，不要让人拖着滚很远。

## 注意

能不能放要在拖动中就显示出来，松手时还要再校验一次（目标列可能刚被别人放满）；不能放就让卡片回到原处，不要先移过去再报错回滚。

## 要点

- 拿起时记住手指在卡片上的偏移，卡片跟手、不加过渡，倾斜 2° 并加深阴影；原位置留同高的虚线空槽
- 目标列按指针所在的列判定，插入位置按这一列各卡片的中线算，卡片高度不同也准；空槽出现在插入处，其他卡片 160ms 让位
- 不接受的列（已满、没有权限、状态不能跳转）边框变危险色并写原因，如“已满 3 / 3”，不出空槽
- 松手在合法位置就落进空槽，约 200ms 落位后再提交；不合法或按 Esc 就回到原位
- 看板横向放不下时，拖到容器左右边缘 40px 内自动横向滚动
- 目标是文件夹、分组图标这类小目标时，卡片进入目标周围约 32px 内目标就放大张开迎接；松手后卡片缩小飞进目标，目标的数量角标 +1 并轻弹一下
- 松手后卡片飞进小目标的弧线，做法同「选中项飞入收纳堆」
- 键盘等效：卡片聚焦后空格拿起，←/→ 换列、↑/↓ 换位置，空格放下、Esc 取消；另给“移动到…”菜单
- 每一步用 aria-live 播报“「订单导出」在「已上线」第 1 位”；减少动态效果时让位和落位直接到位，不倾斜

## 提示词

给{看板}做「拖到另一列」：拿起卡片时保留手指偏移，卡片跟手、倾斜 2° 并加深阴影，原位置留虚线空槽；指针所在的列边框高亮，按各卡片中线算出插入位置并在那里显示空槽，其他卡片 160ms 让位；{不能放入的条件}的列边框变危险色并写明原因，不出空槽；松手落进空槽后再提交，提交前再校验一次，不合法或按 Esc 卡片回到原位；横向放不下时拖到容器边缘 40px 内自动滚动；目标是{文件夹 / 分组图标}这类小目标时，卡片靠近到约 32px 内目标放大迎接，松手后卡片缩小飞进去、目标角标 +1；键盘：空格拿起，←/→ 换列，↑/↓ 换位置，空格放下，Esc 取消，另给“移动到…”菜单；每一步用 aria-live 播报卡片在哪一列第几位；减少动态效果时直接到位、不倾斜。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:10px 14px}
.box{display:grid;grid-template-rows:auto minmax(0,1fr);gap:6px;height:100%;max-width:660px;margin:0 auto}
.bar{display:flex;align-items:center;gap:8px;min-width:0}
.bar b{flex:none;font-size:13px}
.msg{flex:1;min-width:0;margin:0;overflow:hidden;color:#475467;font-size:12px;white-space:nowrap;text-overflow:ellipsis}
.msg.bad{color:#b42318}
.bar .ctl{flex:none;height:28px;padding:0 10px;font-size:12px}
.board{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;min-height:0;touch-action:none;user-select:none;-webkit-user-select:none}
.col{display:flex;flex-direction:column;min-width:0;min-height:0;padding:6px;border:1.5px solid transparent;border-radius:10px;background:#eceef2;transition:border-color .12s,background-color .12s}
.col.over{border-color:#3b5bdb;background:#e8edff}
.col.no{border-color:#f04438;background:#fef3f2}
.col h3{display:flex;align-items:center;gap:4px;margin:0 2px 5px;font-size:12px;font-weight:600;white-space:nowrap}
.col h3 span{min-width:0;overflow:hidden;text-overflow:ellipsis}
.col em{flex:none;margin-left:auto;padding:0 4px;border-radius:6px;background:#fff;color:#667085;font-size:11px;font-style:normal;font-variant-numeric:tabular-nums;line-height:16px}
.col.no em{background:#fee4e2;color:#b42318}
.ls{display:flex;flex-direction:column;gap:5px;min-height:0}
.cd{position:relative;display:block;width:100%;padding:5px 8px 5px 11px;border:1px solid #e3e6eb;border-radius:7px;background:#fff;color:#1f2329;font-size:12px;line-height:18px;text-align:left;cursor:grab;box-shadow:0 1px 2px rgba(16,24,40,.05)}
.cd::before{content:"";position:absolute;left:4px;top:6px;bottom:6px;width:3px;border-radius:2px;background:var(--c,#98a2b3)}
.cd span,.cd small{display:block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.cd small{display:none;color:#667085;font-size:11px}
.cd.lift{position:absolute;left:0;top:0;z-index:5;margin:0;cursor:grabbing;box-shadow:0 12px 28px -8px rgba(16,24,40,.35);will-change:transform}
.cd.kb{border-color:#3b5bdb;box-shadow:0 0 0 2px #c7d2fe,0 8px 20px -8px rgba(16,24,40,.3)}
.ph{flex:none;border:1.5px dashed #98a2b3;border-radius:7px;background:rgba(255,255,255,.5)}
.over .ph{border-color:#3b5bdb}
@container (min-width:560px){.col.no em::before{content:"已满 "}
.cd{padding:7px 10px 7px 13px}
.cd small{display:block}
.ls{gap:6px}
.col{padding:8px}
}
@media (prefers-reduced-motion:reduce){.col{transition:none}
}
</style>

<div class="st"><div class="box"><div class="bar"><b>本周迭代</b><p class="msg" role="status"></p><button type="button" class="ctl rp">重播</button></div><div class="board"><section class="col" aria-labelledby="da-c0"><h3><span id="da-c0">待排期</span><em></em></h3><div class="ls"></div></section><section class="col" data-max="3" aria-labelledby="da-c1"><h3><span id="da-c1">进行中</span><em></em></h3><div class="ls"></div></section><section class="col" aria-labelledby="da-c2"><h3><span id="da-c2">已上线</span><em></em></h3><div class="ls"></div></section></div></div><p class="sr" id="da-tip">按空格拿起，←/→ 换列，↑/↓ 换位置，空格放下，Esc 取消</p></div>

<script type="module">
export default function demo(root) {
  const board = root.querySelector('.board'), cols = [...root.querySelectorAll('.col')], msg = root.querySelector('.msg');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DATA = [[['夜间模式', '前端 · 小周', '#7a5af8'], ['订单导出', '后端 · 阿岚', '#f79009']], [['登录改版', '设计 · 木木', '#2e90fa'], ['消息推送', '后端 · 老许', '#12b76a'], ['支付重试', '后端 · 阿岚', '#f04438']], [['搜索联想', '前端 · 小周', '#06aed4']]];
  let d = null, held = null, tm = [];
  const ls = (c) => c.querySelector('.ls'), name = (c) => c.querySelector('h3 span').textContent, cards = (c) => [...ls(c).querySelectorAll('.cd:not(.lift)')];
  const full = (c, from) => c !== from && +c.dataset.max > 0 && cards(c).length >= +c.dataset.max;
  const count = () => cols.forEach((c) => { c.querySelector('em').textContent = c.dataset.max ? `${cards(c).length}/${c.dataset.max}` : String(cards(c).length); });
  const say = (t, bad) => { msg.textContent = t; msg.classList.toggle('bad', !!bad); };
  const reset = () => {
    cols.forEach((c, i) => { ls(c).innerHTML = DATA[i].map(([t, m, color]) => `<button type="button" class="cd" style="--c:${color}" aria-describedby="da-tip"><span>${t}</span><small>${m}</small></button>`).join(''); c.classList.remove('over', 'no'); });
    count();
  };
  const where = (cd) => { const c = cd.closest('.col'); return `「${cd.querySelector('span').textContent}」在「${name(c)}」第 ${cards(c).indexOf(cd) + 1} 位`; };
  // 其他卡片让位：记下移动前的位置，DOM 改完后用 transform 从旧位置过渡回来
  const flip = (fn) => {
    const els = [...board.querySelectorAll('.ls > *')], top = new Map(els.map((e) => [e, e.getBoundingClientRect().top]));
    fn();
    if (still) return;
    els.forEach((e) => {
      const dy = top.get(e) - e.getBoundingClientRect().top; if (!dy || e.classList.contains('ph')) return;
      e.style.transition = 'none'; e.style.transform = `translateY(${dy}px)`; void e.offsetWidth;
      e.style.transition = 'transform .16s cubic-bezier(.2,0,0,1)'; e.style.transform = '';
    });
  };
  const start = () => {
    const { cd } = d, r = cd.getBoundingClientRect();
    d.ph = Object.assign(document.createElement('div'), { className: 'ph' }); d.ph.style.height = r.height + 'px';
    d.from = cd.closest('.col'); d.idx = cards(d.from).indexOf(cd);
    cd.replaceWith(d.ph); cd.style.width = r.width + 'px'; cd.classList.add('lift'); board.append(cd);
    d.on = true;
  };
  const move = (x, y) => {
    const br = board.getBoundingClientRect(), { cd, ph, from } = d;
    cd.style.transform = `translate(${x - br.left - d.ox}px,${y - br.top - d.oy}px)${still ? '' : ' rotate(2deg)'}`;
    const col = cols.find((c) => { const r = c.getBoundingClientRect(); return x >= r.left && x <= r.right; });
    const ok = col && !full(col, from);
    cols.forEach((c) => { c.classList.toggle('over', c === col && ok); c.classList.toggle('no', c === col && !ok); });
    d.bad = col && !ok ? col : null;
    if (d.bad) say(`「${name(col)}」已满 ${col.dataset.max} / ${col.dataset.max}，放不进去`, true);
    else if (col) say(`松手放进「${name(col)}」`);
    const into = ok ? col : from, list = cards(into);
    let i = ok ? list.findIndex((c) => { const r = c.getBoundingClientRect(); return y < r.top + r.height / 2; }) : d.idx; // 按各卡片中线算插入位置
    if (i < 0) i = list.length;
    const before = list[i] ?? null;
    if (ph.parentNode !== ls(into) || ph.nextElementSibling !== before) flip(() => ls(into).insertBefore(ph, before));
  };
  const drop = (cancel) => {
    const g = d; d = null;
    if (!g.on) return;
    const { cd, ph, from } = g;
    if (cancel) flip(() => ls(from).insertBefore(ph, cards(from)[g.idx] ?? null));
    const br = board.getBoundingClientRect(), pr = ph.getBoundingClientRect();
    const done = () => {
      cd.style.cssText = `--c:${cd.style.getPropertyValue('--c')}`; cd.classList.remove('lift'); ph.replaceWith(cd);
      cols.forEach((c) => c.classList.remove('over', 'no')); count();
      const to = cd.closest('.col'), moved = to !== from || cards(to).indexOf(cd) !== g.idx;
      if (cancel) say('已取消，卡片回到原位');
      else if (g.bad) say(`「${name(g.bad)}」已满，${where(cd)}（回到原位）`, true);
      else say(moved ? `已移动：${where(cd)}` : '放回了原位');
    };
    if (still) return done();
    cd.style.transition = 'transform .2s cubic-bezier(.2,0,0,1)';
    cd.style.transform = `translate(${pr.left - br.left}px,${pr.top - br.top}px)`;
    tm.push(setTimeout(done, 210));
  };
  board.addEventListener('pointerdown', (e) => {
    const cd = e.target.closest('.cd'); if (!cd || e.button > 0 || d || held) return;
    const r = cd.getBoundingClientRect();
    d = { cd, x0: e.clientX, y0: e.clientY, ox: e.clientX - r.left, oy: e.clientY - r.top, on: false };
    try { board.setPointerCapture(e.pointerId); } catch {}
  });
  board.addEventListener('pointermove', (e) => {
    if (!d) return;
    if (!d.on) { if (Math.hypot(e.clientX - d.x0, e.clientY - d.y0) < 4) return; start(); }
    move(e.clientX, e.clientY);
  });
  board.addEventListener('pointerup', () => d && drop(false));
  board.addEventListener('pointercancel', () => d && drop(true));
  // 键盘：空格拿起 → 方向键移动 → 空格放下 / Esc 取消
  board.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && d) { e.preventDefault(); return drop(true); }
    const cd = e.target.closest('.cd'); if (!cd) return;
    const k = e.key, c = cd.closest('.col');
    if (k === ' ' || k === 'Enter') {
      e.preventDefault();
      if (!held) { held = { cd, from: c, idx: cards(c).indexOf(cd) }; cd.classList.add('kb'); return say(`已拿起${where(cd)}，←/→ 换列，↑/↓ 换位置，空格放下`); }
      held = null; cd.classList.remove('kb'); count(); return say(`已放下：${where(cd)}`);
    }
    if (!held) return;
    if (k === 'Escape') { e.preventDefault(); const h = held; held = null; cd.classList.remove('kb'); ls(h.from).insertBefore(cd, cards(h.from).filter((x) => x !== cd)[h.idx] ?? null); cd.focus(); count(); return say('已取消，卡片回到原位'); }
    const list = cards(c), i = list.indexOf(cd);
    if (k === 'ArrowUp' || k === 'ArrowDown') {
      e.preventDefault(); const j = k === 'ArrowUp' ? i - 1 : i + 1; if (j < 0 || j >= list.length) return;
      ls(c).insertBefore(cd, k === 'ArrowUp' ? list[j] : list[j].nextSibling); cd.focus(); return say(where(cd));
    }
    if (k === 'ArrowLeft' || k === 'ArrowRight') {
      e.preventDefault(); const step = k === 'ArrowLeft' ? -1 : 1, skipped = [];
      let n = cols.indexOf(c) + step;
      while (cols[n] && full(cols[n], c)) { skipped.push(name(cols[n])); n += step; } // 跳过已满的列
      if (!cols[n]) return say(skipped.length ? `「${skipped[0]}」已满，那边没有能放的列` : '已经是最边上一列', !!skipped.length);
      const t = cards(cols[n]); ls(cols[n]).insertBefore(cd, t[Math.min(i, t.length)] ?? null); cd.focus(); count();
      say((skipped.length ? `跳过已满的「${skipped[0]}」，` : '') + where(cd));
    }
  });
  // 自动演示：把“订单导出”拖过已满的“进行中”，放进“已上线”最上面
  const play = () => {
    tm.forEach(clearTimeout); tm = []; d = null; held = null; reset(); say('');
    const cd = cards(cols[0])[1], r = cd.getBoundingClientRect(), x0 = r.left + r.width / 2, y0 = r.top + r.height / 2;
    const c1 = cols[1].getBoundingClientRect(), c2 = cards(cols[2])[0].getBoundingClientRect(), xm = c1.left + c1.width / 2, x2 = c2.left + c2.width / 2, y2 = c2.top + 4;
    const fire = (type, el, x, y) => el.dispatchEvent(new PointerEvent(type, { bubbles: true, pointerId: 9, button: 0, clientX: x, clientY: y }));
    const path = (a, b, ya, yb, n, t0) => { for (let k = 1; k <= n; k++) tm.push(setTimeout(() => { if (root.host.isConnected && d) fire('pointermove', board, a + (b - a) * k / n, ya + (yb - ya) * k / n); }, t0 + k * 30)); };
    fire('pointerdown', cd, x0, y0);
    path(x0, xm, y0, y0 - 4, 10, 0);
    path(xm, x2, y0 - 4, y2, 10, 300 + 520);
    tm.push(setTimeout(() => { if (root.host.isConnected && d) fire('pointerup', board, x2, y2); }, 300 + 520 + 300 + 260));
  };
  reset();
  root.querySelector('.rp').addEventListener('click', play);
  tm.push(setTimeout(() => { if (root.host.isConnected) play(); }, 400));
}
</script>
