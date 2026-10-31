---
zh: 扇形卡片轮换
en: Fanned card carousel
order: 20
---

## 是什么

4–5 张相册卡以底边中点为轴展开成扇形，左右滑动时整把扇子绕轴转动，下一张转到正中最前，上方标题和圆点同步切换。

## 适合

相册、歌单、卡包、会员卡这类 3–6 个、靠封面区分的集合，放在首页或个人页做主入口。

## 不适合

超过 6 个或要逐个看清内容时用「吸附分页滑动」平铺；要一次看到全部时用网格；只是把同类通知收成一摞用「叠卡展开」。

## 注意

后面的卡只露出一角，信息要靠上方的标题和圆点给出；扇角保持在 ±12° 以内，再大封面会斜得难看。

## 要点

- 卡片 transform-origin: 50% 100%，相对当前项每偏一位旋转 6°、横移约 14px、缩小 0.04，扇面在 -12° 到 12° 之间；偏出两位以上的隐藏。
- 当前项在正中最前；切换时所有卡片用弹性曲线（约 450ms，cubic-bezier(.34,1.4,.64,1)）一起绕轴转到新位置，z-index 跟着过渡在中途交换。
- 拖动时扇面跟手转动（约 70px 转一位，到头加 0.3 倍阻尼），松手按位移过半或速度大于 0.4px/ms 切到相邻一张，否则转回。
- 上方的标题、数量和分页圆点同一帧切换，标题做约 200ms 的淡入上移；当前圆点拉长成胶囊。
- 扇面可聚焦，左右方向键切换；两侧放上一个 / 下一个按钮，到头禁用；点露出的侧卡直接转到它。
- 切换后用 role="status" 播报“名称，第 N / {相册数} 个”；不自动轮播。
- 减少动态效果时去掉转动过渡，直接排成新的扇面，标题只换文字。

## 提示词

把{3–6 个相册}做成「扇形卡片轮换」：卡片以底边中点为轴展开成扇形，相对当前项每偏一位旋转 6°、横移 14px、缩小 0.04，扇面限制在 -12° 到 12°，偏出两位以上的隐藏，当前项在正中最前；左右滑动时扇面跟手转动，松手按位移过半或快速甩动切到相邻一张，所有卡片用弹性曲线（450ms）绕轴转到新位置，z-index 在过渡中途交换；上方的{相册标题}、数量和分页圆点同步切换；扇面可聚焦并支持左右方向键，两侧有上一个 / 下一个按钮（到头禁用），点侧卡直接切到它；切换后用 role="status" 播报“名称，第 N / {相册数} 个”；不自动轮播；减少动态效果时直接排成新扇面，不做转动。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<link rel="stylesheet" href="../../_shared/app-card-photos.css">
<style>
.st{display:flex;flex-direction:column;gap:6px;padding:10px 12px 12px}
.hd{flex:none;display:flex;flex-direction:column;align-items:center;gap:4px}
.tl{display:flex;align-items:baseline;gap:6px;max-width:100%;white-space:nowrap}
.tl b{min-width:0;overflow:hidden;font-size:14px;font-weight:600;text-overflow:ellipsis}
.tl small{flex:none;color:#5b616e;font-size:12px;font-variant-numeric:tabular-nums}
.tl.sw{animation:tsw .22s cubic-bezier(.2,0,0,1)}
@keyframes tsw{from{opacity:0;transform:translateY(4px)}
}
.dots{display:flex}
.dots button{display:grid;place-items:center;width:16px;height:12px;padding:0;border:0;background:none}
.dots button::after{content:"";width:6px;height:6px;border-radius:3px;background:#c9ced6;transition:width .24s,background .24s}
.dots button[aria-current=true]::after{width:14px;background:#1f2329}
.row{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;gap:8px}
.nav{flex:none;display:grid;place-items:center;width:32px;height:32px;padding:0 0 2px;border:1px solid #e3e6eb;border-radius:50%;background:#fff;font-size:18px;line-height:1}
.nav:disabled{opacity:.35;cursor:default}
.fan{position:relative;flex:none;width:180px;height:128px;border-radius:12px;touch-action:pan-y;user-select:none;-webkit-user-select:none}
.card{position:absolute;left:50%;bottom:8px;width:88px;height:112px;margin-left:-44px;border:4px solid #fff;border-radius:12px;box-shadow:0 4px 12px rgba(31,35,41,.16);transform-origin:50% 100%;cursor:pointer;transition:transform .45s cubic-bezier(.34,1.4,.64,1),z-index .45s linear,opacity .2s,box-shadow .3s}
.card.on{box-shadow:0 10px 22px rgba(31,35,41,.26)}
.fan.drag .card{transition:none}
@container (min-height:260px){.tl b{font-size:16px}
.fan{width:240px;height:176px}
.card{bottom:12px;width:120px;height:152px;margin-left:-60px;border-width:5px;border-radius:14px}
.nav{width:36px;height:36px}
}
</style>

<div class="st"><div class="hd"><div class="tl"><b>镜湖晨雾</b><small>24 张</small></div><div class="dots"></div></div><div class="row"><button type="button" class="nav pv" aria-label="上一个相册">‹</button><div class="fan" tabindex="0" role="group" aria-label="相册，左右方向键切换"></div><button type="button" class="nav nx" aria-label="下一个相册">›</button></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const A = [['ph2', '青屿湾 · 海边', 36], ['ph1', '镜湖晨雾', 24], ['ph3', '松岭徒步', 58], ['ph5', '星野露营', 17], ['ph6', '南坡花季', 42]];
  const fan = root.querySelector('.fan'), tl = root.querySelector('.tl'), dots = root.querySelector('.dots'), pv = root.querySelector('.pv'), nx = root.querySelector('.nx'), live = root.querySelector('.sr');
  let cur = 1, dr = null;
  const cards = A.map(([c]) => { const el = document.createElement('i'); el.className = 'card ' + c; el.setAttribute('aria-hidden', 'true'); fan.append(el); return el; });
  const place = (drag = 0) => cards.forEach((el, i) => { // drag：跟手时的偏移（单位是“位”）
    const k = i - cur + drag, a = Math.max(-2, Math.min(2, k));
    el.style.transform = `translateX(${a * 14}px) rotate(${a * 6}deg) scale(${1 - Math.abs(a) * 0.04})`;
    el.style.zIndex = 10 - Math.round(Math.abs(k)); el.style.opacity = Math.abs(k) > 2.5 ? 0 : 1; el.classList.toggle('on', i === cur && !drag);
  });
  const go = (i, quiet) => {
    i = Math.max(0, Math.min(A.length - 1, i)); const changed = i !== cur; cur = i; place();
    tl.querySelector('b').textContent = A[i][1]; tl.querySelector('small').textContent = A[i][2] + ' 张';
    if (changed) { tl.classList.remove('sw'); void tl.offsetWidth; tl.classList.add('sw'); if (!quiet) live.textContent = `${A[i][1]}，第 ${i + 1} / ${A.length} 个`; }
    [...dots.children].forEach((d, k) => d.setAttribute('aria-current', String(k === i)));
    pv.disabled = i === 0; nx.disabled = i === A.length - 1;
  };
  A.forEach(([, n], i) => { const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', `第 ${i + 1} 个：${n}`); b.onclick = () => go(i); dots.append(b); });
  pv.onclick = () => go(cur - 1); nx.onclick = () => go(cur + 1);
  fan.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); go(cur + (e.key === 'ArrowRight' ? 1 : -1)); } });
  fan.addEventListener('pointerdown', (e) => { if (e.button > 0) return; dr = { x: e.clientX, lx: e.clientX, t: e.timeStamp, v: 0, p: cur, moved: false, el: e.target.closest('.card') }; fan.setPointerCapture(e.pointerId); });
  fan.addEventListener('pointermove', (e) => {
    if (!dr) return; const dx = e.clientX - dr.x; if (!dr.moved && Math.abs(dx) < 6) return;
    dr.moved = true; fan.classList.add('drag');
    if (e.timeStamp > dr.t) { dr.v = (e.clientX - dr.lx) / (e.timeStamp - dr.t); dr.lx = e.clientX; dr.t = e.timeStamp; }
    let p = cur - dx / 70; if (p < 0) p *= 0.3; if (p > A.length - 1) p = A.length - 1 + (p - A.length + 1) * 0.3; // 到头阻尼
    dr.p = p; place(cur - p);
  });
  const up = (e) => {
    if (!dr) return; const d = dr; dr = null; fan.classList.remove('drag');
    if (!d.moved) { const i = cards.indexOf(d.el); if (i >= 0 && i !== cur) go(i); else if (i === cur) live.textContent = `打开「${A[cur][1]}」`; return; }
    const v = e.timeStamp - d.t > 100 ? 0 : d.v;
    go(Math.abs(v) > 0.4 ? cur - Math.sign(v) : Math.round(d.p));
  };
  fan.addEventListener('pointerup', up); fan.addEventListener('pointercancel', up);
  go(1, true);
  setTimeout(() => { if (root.host.isConnected && cur === 1) go(2, true); }, 350); // 缩略图：转到正中，扇面左右对称
}
</script>
