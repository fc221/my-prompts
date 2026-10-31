---
zh: 选中项飞入收纳堆
en: Selection fly-to-stack
order: 40
---

## 是什么

在照片网格里多选几张，点“移到相册”后，选中的缩略图依次飞进底部栏的小堆，错开角度叠成一叠，角上显示数量。

## 适合

相册、文件、收藏夹里把多项移进某个相册 / 文件夹 / 清单，需要让人看清“这几张去了哪里”。

## 不适合

只移动一项时用「共享元素过渡」或一句提示；怎么进入多选看「长按多选」，这里只管执行后的去向反馈；一次上百项时不逐张飞，只飞前 4 张，其余直接计数。

## 注意

飞行只是反馈，点击时就提交数据；没选中的照片保持原位不动，移走的格子留空，撤销后原样回来。

## 要点

- 长按约 400ms 进入多选并选中这一张，移动超过 8px 或提前松手就取消；底部栏另有“选择”按钮作为看得见的入口。
- 多选时所有缩略图出现勾选圈，点击只切换选中；底部栏显示“已选 N 张”，N 为 0 时执行按钮禁用。
- 执行时用 FLIP：先在小堆里放好每张的终点，再从缩略图原位置反向变换播放过去；约 450ms、cubic-bezier(.2,.8,.2,1)，相邻错开 50ms。
- 飞行弧线用两层嵌套元素拆开：外层只做横向位移、匀速（linear），内层只做纵向位移、缓出，合起来就是一条抛物线，不用算路径；缩放和旋转放在内层。「加入后原地变加减」里商品飞进购物车用的是同一种弧线，落下时目标轻弹、角标 +1。
- 落进小堆的缩略图缩到约 34px，各自错开 −10° 到 10° 叠放，只显示最上面 4 张；每落一张角标 +1 并轻弹一下。
- 没选中的缩略图不动，移走的格子留浅色空位；执行后退出多选并给“撤销”。
- 键盘：缩略图是按钮，空格切换选择（未进入多选时直接进入），Esc 退出；结果用 role="status" 播报“已把 N 张移到「相册」”。
- 减少动态效果时不飞行，选中项直接移走，小堆和角标直接到终态。

## 提示词

给{照片网格}做「选中项飞入收纳堆」：长按约 400ms 进入多选并选中该项（移动超过 8px 取消），底部栏另有“选择”按钮；多选时所有缩略图出现勾选圈，点击切换选中，底部栏显示“已选 N 张”，未选时执行按钮禁用；点“移到{目标相册}”后用 FLIP 让选中的缩略图依次（错开 50ms，约 450ms）沿抛物线飞进底部栏的小堆（外层元素横向匀速、内层元素纵向缓出，两层合成弧线），缩小并错开 −10° 到 10° 叠成一叠，只显示最上面 4 张，角标数字逐张 +1；没选中的保持原位，移走的格子留空；执行后退出多选并提供撤销；空格切换选择、Esc 退出；结果用 role="status" 播报；减少动态效果时不飞行，直接更新到终态。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<link rel="stylesheet" href="../../_shared/app-card-photos.css">
<style>
.st{display:flex;flex-direction:column;gap:8px;padding:10px 12px}
.grid{flex:1;min-height:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-template-rows:repeat(2,minmax(0,1fr));gap:4px;width:100%;max-width:400px;margin:0 auto}
.t{position:relative;padding:0;border:0;border-radius:8px;touch-action:manipulation;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;transition:transform .2s cubic-bezier(.2,.9,.22,1)}
.t:nth-child(n+9){display:none}
.alt{filter:hue-rotate(-24deg) saturate(1.15)}
.t.press{transform:scale(.95)}
.sel .t{transform:scale(.92)}
.t::after{content:"";position:absolute;top:5px;right:5px;width:16px;height:16px;border:2px solid #fff;border-radius:50%;background:rgba(31,35,41,.25) center/10px no-repeat;opacity:0;transform:scale(.6);transition:opacity .16s,transform .2s cubic-bezier(.34,1.4,.64,1)}
.sel .t::after{opacity:1;transform:none}
.t[aria-pressed=true]{box-shadow:0 0 0 2px #fff,0 0 0 4px #3b5bdb}
.t[aria-pressed=true]::after{background-color:#3b5bdb;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2.5 6.2l2.3 2.3 4.7-4.9' fill='none' stroke='white' stroke-width='1.8'/%3E%3C/svg%3E")}
.t.gone{background:#e9ebef!important;filter:none;box-shadow:inset 0 0 0 1px #dde1e7;transform:none;cursor:default}
.t.gone::after{display:none}
.bar{position:relative;z-index:2;flex:none;display:flex;align-items:center;gap:8px;width:100%;max-width:400px;height:50px;margin:0 auto;padding:0 8px 0 10px;border:1px solid #e3e6eb;border-radius:12px;background:#fff;box-shadow:0 4px 14px rgba(31,35,41,.08)}
.pile{position:relative;flex:none;width:34px;height:34px;border:1.5px dashed #c9ced6;border-radius:8px}
.pile.has{border-color:transparent}
.m{position:absolute;inset:-1.5px;border:2px solid #fff;border-radius:6px;box-shadow:0 2px 6px rgba(31,35,41,.28)}
.m:nth-last-of-type(n+5){display:none}
.badge{position:absolute;z-index:9;top:-8px;right:-9px;min-width:18px;height:18px;padding:0 5px;border-radius:9px;background:#d92d20;color:#fff;font-size:11px;font-weight:700;line-height:18px;text-align:center;font-variant-numeric:tabular-nums;box-shadow:0 0 0 2px #fff}
.badge.pop{animation:bp .24s cubic-bezier(.34,1.56,.64,1)}
@keyframes bp{50%{transform:scale(1.3)}
}
.info{flex:1;min-width:0;display:flex;flex-direction:column;line-height:1.35}
.info b,.info small{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.info b{font-weight:600}
.info small{color:#5b616e;font-size:11px}
.go,.ghost{flex:none;height:32px;padding:0 12px;border-radius:8px;font-size:12px;white-space:nowrap}
.go{border:0;background:#1f2329;color:#fff}
.go:disabled{background:#c9ced6;cursor:default}
.ghost{border:1px solid #e3e6eb;background:#fff}
@container (max-width:320px){.go,.ghost{padding:0 10px}
}
@container (min-height:260px){.grid{grid-template-rows:repeat(3,minmax(0,1fr))}
.t:nth-child(n+9){display:block}
}
</style>

<div class="st"><div class="grid" role="group" aria-label="照片，长按或按空格多选"></div><div class="bar"><div class="pile" aria-hidden="true"><b class="badge" hidden>0</b></div><div class="info"><b class="tt">相册「旅行」</b><small class="sub">长按照片开始多选</small></div><button type="button" class="ghost" hidden>取消</button><button type="button" class="go">选择</button></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const N = [['ph2', '海边'], ['ph1', '湖山'], ['ph3', '松林'], ['ph4', '沙丘'], ['ph5', '夜山'], ['ph6', '花田'], ['ph3 alt', '山谷'], ['ph2 alt', '黄昏'], ['ph6 alt', '草坡'], ['ph1 alt', '晨雾'], ['ph4 alt', '红岩'], ['ph5 alt', '星空']];
  const ANG = [-8, 6, -3, 10, -10, 4, -6, 8];
  const st = root.querySelector('.st'), grid = root.querySelector('.grid'), pile = root.querySelector('.pile'), badge = root.querySelector('.badge'), tt = root.querySelector('.tt'), sub = root.querySelector('.sub'), go = root.querySelector('.go'), ghost = root.querySelector('.ghost'), live = root.querySelector('.sr');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tiles = N.map(([c, n], i) => { const t = document.createElement('button'); t.type = 'button'; t.className = 't ' + c; t.dataset.c = c; t.dataset.n = n; t.setAttribute('aria-label', `照片 ${i + 1}：${n}`); grid.append(t); return t; });
  let mode = false, count = 0, last = null, timer = 0, sx = 0, sy = 0, fired = false;
  const picked = () => tiles.filter((t) => t.getAttribute('aria-pressed') === 'true');
  const sync = () => {
    const n = picked().length;
    tt.textContent = mode ? `已选 ${n} 张` : '相册「旅行」';
    sub.textContent = mode ? '移到「旅行」' : last ? `刚移入 ${last.tiles.length} 张` : count ? `共 ${count} 张` : '长按照片开始多选';
    go.textContent = mode ? '移到相册' : '选择'; go.disabled = mode && !n;
    ghost.hidden = !(mode || last); ghost.textContent = mode ? '取消' : '撤销';
  };
  const setMode = (on) => {
    mode = on; st.classList.toggle('sel', on); if (on) last = null;
    tiles.forEach((t) => { if (on && !t.disabled) t.setAttribute('aria-pressed', 'false'); else t.removeAttribute('aria-pressed'); });
    sync();
  };
  const toggle = (t, v) => { if (!mode || t.disabled) return; t.setAttribute('aria-pressed', String(v ?? t.getAttribute('aria-pressed') !== 'true')); sync(); };
  const land = () => { count++; badge.hidden = false; badge.textContent = count; pile.classList.add('has'); if (!still) { badge.classList.remove('pop'); void badge.offsetWidth; badge.classList.add('pop'); } };
  const gather = (auto) => { // FLIP：终点先放进小堆，再从缩略图原位置反向变换播放过去
    const sel = picked(); if (!sel.length) return;
    const pr = pile.getBoundingClientRect(), minis = [];
    sel.forEach((t, i) => {
      const r = t.getBoundingClientRect(), a = ANG[(count + i) % ANG.length], m = document.createElement('i');
      m.className = 'm ' + t.dataset.c; m.style.transform = `rotate(${a}deg)`; pile.insertBefore(m, badge); minis.push(m);
      t.classList.add('gone'); t.disabled = true;
      if (still) return land();
      const dx = r.left + r.width / 2 - (pr.left + pr.width / 2), dy = r.top + r.height / 2 - (pr.top + pr.height / 2);
      m.animate([{ transform: `translate(${dx}px,${dy}px) scale(${r.width / pr.width},${r.height / pr.height}) rotate(0deg)` }, { transform: `translate(0px,0px) scale(1,1) rotate(${a}deg)` }], { duration: 450, delay: i * 50, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' }).finished.then(land, () => {});
    });
    setMode(false); last = { tiles: sel, minis }; sync();
    if (auto === true) return; // 自动演示不抢焦点、不播报
    go.focus({ preventScroll: true }); live.textContent = `已把 ${sel.length} 张移到「旅行」`;
  };
  const undo = () => {
    if (!last) return; const { tiles: ts, minis } = last; last = null;
    minis.forEach((m) => { const a = m.getAnimations(); if (a.length) count++; a.forEach((x) => x.cancel()); m.remove(); }); // 还在飞的那张没计数，抵消下面的减法
    count -= ts.length; ts.forEach((t) => { t.classList.remove('gone'); t.disabled = false; });
    badge.hidden = !count; badge.textContent = count; pile.classList.toggle('has', count > 0); sync();
    live.textContent = `已撤销，${ts.length} 张回到原位`;
  };
  const cancel = () => { clearTimeout(timer); tiles.forEach((t) => t.classList.remove('press')); };
  grid.addEventListener('pointerdown', (e) => {
    const t = e.target.closest('.t'); if (!t || mode || t.disabled || e.button > 0) return;
    sx = e.clientX; sy = e.clientY; fired = false; t.classList.add('press');
    timer = setTimeout(() => { fired = true; t.classList.remove('press'); setMode(true); toggle(t, true); live.textContent = '已进入多选，点照片选择'; }, 400);
  });
  grid.addEventListener('pointermove', (e) => { if (Math.hypot(e.clientX - sx, e.clientY - sy) > 8) cancel(); });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach((n) => grid.addEventListener(n, cancel));
  grid.addEventListener('contextmenu', (e) => e.preventDefault());
  grid.addEventListener('click', (e) => {
    const t = e.target.closest('.t'); if (!t) return;
    if (fired) { fired = false; return; } // 长按触发后的那次松手不算点击
    if (mode) toggle(t); else live.textContent = `打开「${t.dataset.n}」`;
  });
  grid.addEventListener('keydown', (e) => {
    const t = e.target.closest('.t'); if (!t || e.key !== ' ') return; e.preventDefault();
    if (!mode) { setMode(true); live.textContent = '已进入多选'; } toggle(t);
  });
  grid.addEventListener('keyup', (e) => { if (e.key === ' ') e.preventDefault(); });
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && mode) { e.preventDefault(); setMode(false); go.focus(); } });
  go.onclick = () => { if (mode) gather(false); else { setMode(true); live.textContent = '已进入多选，点照片选择'; } };
  ghost.onclick = () => { if (mode) setMode(false); else undo(); };
  sync();
  // 缩略图：自动选 3 张并收进小堆
  const later = (ms, f) => setTimeout(() => { if (root.host.isConnected) f(); }, still ? 0 : ms);
  later(250, () => { setMode(true); toggle(tiles[0], true); });
  later(420, () => toggle(tiles[3], true));
  later(590, () => toggle(tiles[5], true));
  later(780, () => gather(true));
}
</script>
