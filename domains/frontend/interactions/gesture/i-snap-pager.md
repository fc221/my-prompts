---
zh: 吸附分页滑动
en: Snap paging
order: 80
---

## 是什么

一排卡片横向滑动，松手吸附到居中，两侧露出相邻卡片，下方圆点显示位置。

## 适合

套餐对比、步骤引导、日程、推荐卡片等同级内容的横向浏览。

## 不适合

需要同时比较全部内容时，用网格或表格平铺，不要藏在横滑里。

## 注意

用原生 scroll-snap 获得惯性和吸附，不要用脚本重写惯性物理。

## 要点

- 容器 scroll-snap-type: x mandatory，卡片 scroll-snap-align: center，两侧露出相邻卡片 10%–20% 宽度作为提示。
- 卡片宽度固定（如 220–280px），容器左右内边距 calc(50% - 卡宽 / 2)，首尾卡片也能居中。
- 位置指示：当前圆点拉长为 18px 胶囊；配上一张 / 下一张按钮，到头时禁用。
- 容器可聚焦，左右方向键切换；程序滚动用 smooth，减少动态效果时直接跳。
- 鼠标拖动时临时关掉吸附，松手按位移过半或速度大于 0.5px/ms 决定翻页。
- 手指还按着时预告落点：按“当前位置 + 速度 × 约 200ms”找最近的一张，提前把它和对应圆点高亮，松手后就停在这一张，预告和结果一致。
- 当前卡 scale 为 1、其余 0.94，只动 transform。
- 卡片之间有连线或指示（时间轴连线、当前项下划线）时，等卡片停稳（scrollend）再画出，不要边滑边画。
- 不自动轮播；确需自动播放时必须可暂停。

## 提示词

把{一组卡片}做成「吸附分页滑动」：用原生横向滚动 + scroll-snap-type: x mandatory，卡片居中吸附，两侧露出相邻卡片；首尾卡片也能居中；下方圆点显示位置（当前项拉长），配上一张 / 下一张按钮，到头禁用；容器可聚焦并支持左右方向键；鼠标拖动时临时关闭吸附，松手按位移过半或快速甩动翻页；拖动中按当前位置加速度预测落点，提前高亮那张卡和对应圆点，松手停在同一张；不自动轮播。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:flex;flex-direction:column;justify-content:center;gap:10px;padding:10px 0}
.sc{display:flex;gap:12px;padding:4px calc(50% - 110px);overflow-x:auto;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;scrollbar-width:none;outline-offset:-2px}
.sc::-webkit-scrollbar{display:none}
.c{flex:0 0 220px;display:flex;flex-direction:column;justify-content:center;gap:2px;height:116px;padding:0 18px;background:#fff;border:1px solid #e3e6eb;border-radius:12px;scroll-snap-align:center;transform:scale(.94);transition:transform .24s cubic-bezier(.2,0,0,1),border-color .24s;user-select:none}
.c.on{transform:none;border-color:#3b5bdb}
.c small{display:flex;align-items:center;gap:6px;color:#5b616e;font-size:12px}
.c em{padding:0 6px;border-radius:4px;background:#edf1ff;color:#3b5bdb;font-style:normal;line-height:18px}
.c b{font-size:24px;font-weight:600;font-variant-numeric:tabular-nums}
.c b i{margin-left:2px;color:#5b616e;font-size:12px;font-style:normal;font-weight:400}
.c span{color:#5b616e;font-size:12px}
.nav{display:flex;align-items:center;justify-content:center;gap:12px}
.nav button{display:grid;place-items:center;width:28px;height:28px;padding:0 0 2px;border:1px solid #e3e6eb;border-radius:50%;background:#fff;font-size:18px;line-height:1}
.nav button:disabled{opacity:.4;cursor:default}
.dots{display:flex;gap:6px}
.dots i{width:6px;height:6px;border-radius:3px;background:#c9ced6;transition:width .24s,background .24s}
.dots i.on{width:18px;background:#3b5bdb}
.sc.grab{scroll-snap-type:none;cursor:grabbing}
@container (min-width:560px){.sc{padding-inline:calc(50% - 130px)}
.c{flex-basis:260px;height:180px;padding:0 24px}
.c b{font-size:32px}
}
</style>

<div class="st"><div class="sc" tabindex="0" aria-label="套餐，左右方向键切换"><div class="c"><small>基础版</small><b>¥0<i>/月</i></b><span>3 个项目 · 1 GB 存储</span></div><div class="c"><small>专业版<em>推荐</em></small><b>¥49<i>/月</i></b><span>不限项目 · 100 GB 存储</span></div><div class="c"><small>团队版</small><b>¥199<i>/月</i></b><span>10 人协作 · 1 TB 存储</span></div><div class="c"><small>企业版</small><b>定制</b><span>私有部署 · 专属支持</span></div></div><div class="nav"><button type="button" class="pv" aria-label="上一张">‹</button><div class="dots" aria-hidden="true"></div><button type="button" class="nx" aria-label="下一张">›</button></div></div>

<script type="module">
export default function demo(root) {
  const sc = root.querySelector('.sc'), cards = [...sc.children], dots = root.querySelector('.dots'), pv = root.querySelector('.pv'), nx = root.querySelector('.nx');
  cards.forEach(() => dots.append(document.createElement('i')));
  let cur = -1, dr = null;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nearest = () => { const mid = sc.scrollLeft + sc.clientWidth / 2; let best = 0, bd = Infinity; cards.forEach((c, i) => { const dd = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid); if (dd < bd) { bd = dd; best = i; } }); return best; };
  const mark = () => { const i = nearest(); if (i === cur) return; cur = i; cards.forEach((c, k) => c.classList.toggle('on', k === i)); [...dots.children].forEach((d, k) => d.classList.toggle('on', k === i)); pv.disabled = i === 0; nx.disabled = i === cards.length - 1; };
  const go = (i, instant) => { const c = cards[Math.max(0, Math.min(cards.length - 1, i))]; sc.scrollTo({ left: c.offsetLeft + c.offsetWidth / 2 - sc.clientWidth / 2, behavior: instant || still ? 'auto' : 'smooth' }); };
  sc.addEventListener('scroll', mark, { passive: true });
  pv.onclick = () => go(cur - 1); nx.onclick = () => go(cur + 1);
  sc.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); go(cur + (e.key === 'ArrowLeft' ? -1 : 1)); } });
  // 触屏用原生滚动和吸附；只给鼠标补一个拖动，拖动时关掉吸附
  sc.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse' || e.button > 0) return; dr = { x: e.clientX, l: sc.scrollLeft, t: e.timeStamp, i: cur }; sc.setPointerCapture(e.pointerId); sc.classList.add('grab'); });
  sc.addEventListener('pointermove', (e) => { if (dr) sc.scrollLeft = dr.l - (e.clientX - dr.x); });
  const up = (e) => { if (!dr) return; const dx = e.clientX - dr.x, v = dx / Math.max(1, e.timeStamp - dr.t), i = Math.abs(v) > 0.5 ? dr.i - Math.sign(dx) : nearest(); dr = null; sc.classList.remove('grab'); go(i); };
  sc.addEventListener('pointerup', up); sc.addEventListener('pointercancel', up);
  requestAnimationFrame(() => { go(1, true); mark(); });
}
</script>
