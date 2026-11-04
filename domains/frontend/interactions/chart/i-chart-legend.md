---
zh: 点图例显隐系列
en: Legend toggles
order: 30
---

## 是什么

图例的每一项是一个开关按钮，点一下隐藏或显示对应的线，纵轴按剩下的系列重新算范围；双击或 Alt+点击只看这一条。

## 适合

一张图里有 3–8 条系列、需要临时排除一两条再比较：各渠道拉新、各产品线收入、几个版本的转化率，大的系列把小的压成一条贴底线时尤其有用。

## 不适合

只有 1–2 条系列时不需要；超过 8 条时改成可搜索的系列选择器或分面小图（每个系列一张小图）；百分比堆叠图隐藏系列会改变“合计 100%”的口径，要么不开放显隐，要么写明当前合计只含可见系列。

## 注意

颜色跟着系列走、不跟着位置走：隐藏一条后其余系列不能换色；纵轴重算范围时要让人看得出尺度变了，不然会误以为数值涨了。

## 要点

- 图例项是设了 aria-pressed 的按钮，显示色块 + 系列名（宽时加最新值）；隐藏时色块变空心、文字变灰，不只靠颜色区分
- 点一下切换显隐；双击或 Alt+点击只看这一条，对已经“只看”的那条再做一次则恢复全部；有隐藏项时出现“全部显示”
- 不能把最后一条也关掉：点最后一条时保持显示并提示“至少保留一条”
- 纵轴按可见系列重算，刻度和线一起用 250–300ms 过渡到新范围；用 role="status" 播报“已隐藏 应用商店，纵轴改为 0–600”
- 悬停或聚焦图例项时，对应的线加粗、其他线变淡，帮人对上颜色
- 显隐状态和其他筛选一起保存（URL 或本地），刷新后保持；导出图片或数据时按当前显隐
- 减少动态效果时刻度和线直接跳到新范围

## 提示词

给{多系列折线图}的图例做「点图例显隐系列」：每个图例项是 aria-pressed 的按钮，显示色块、系列名，宽度够时加最新值；点一下隐藏或显示该系列，隐藏时色块空心、文字变灰；双击或 Alt+点击只看这一条，再做一次恢复全部；有隐藏项时显示“全部显示”；最后一条不能关掉，提示“至少保留一条”；系列颜色固定，不因隐藏而重新分配；纵轴按可见系列重算范围，刻度和线用 280ms 过渡，用 role="status" 播报“已隐藏 X，纵轴改为 0–N”；悬停或聚焦图例项时对应线加粗、其余变淡；显隐状态随筛选条件一起保存；减少动态效果时直接切换。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:10px 12px}
.box{display:grid;grid-template-rows:auto minmax(0,1fr) auto;gap:6px;max-width:640px;height:100%;margin:0 auto;padding:8px 12px;border:1px solid #e3e6eb;border-radius:12px;background:#fff}
.hd{display:flex;align-items:center;gap:8px;min-width:0}
.u{display:none;flex:none;margin-left:auto;color:#5b616e;font-size:12px}
.lg{display:flex;gap:4px;min-width:0;margin:0 -6px}
.lg button{display:inline-flex;align-items:center;gap:5px;min-width:0;height:26px;padding:0 6px;border:0;border-radius:6px;background:none;color:#1f2329;font-size:12px;white-space:nowrap;transition:color .16s,background .16s}
.lg button:hover{background:#f5f6f8}
.lg i{flex:none;width:10px;height:10px;border:2px solid var(--c);border-radius:3px;background:var(--c)}
.lg small{color:#5b616e;font-size:11px;font-variant-numeric:tabular-nums}
.lg [aria-pressed=false]{color:#8a909c}
.lg [aria-pressed=false] i{background:none}
.lg [aria-pressed=false] small{color:#aab0bb}
.v{display:none}
.ch{position:relative;min-height:0}
svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.gl{stroke:#eceef2}
.ax{fill:#5b616e;font-size:11px;font-variant-numeric:tabular-nums}
.ln{fill:none;stroke-width:2;stroke-linejoin:round;transition:opacity .2s,stroke-width .12s}
.ln.off{opacity:0}
.focus .ln{opacity:.18}
.focus .ln.hot{opacity:1;stroke-width:3}
.focus .ln.off{opacity:0}
.ft{display:flex;align-items:center;gap:8px;min-width:0;height:20px}
.msg{flex:1;min-width:0;margin:0;color:#5b616e;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.all{flex:none;height:22px;padding:0 6px;border:0;border-radius:6px;background:none;color:#3b5bdb;font-size:12px;font-weight:600}
.all:hover{background:#edf1ff}
@container (min-width:560px){.box{padding:12px 16px}
.lg{gap:8px}
.u{display:block}
.v{display:inline}
}
</style>

<div class="st"><div class="box"><div class="hd"><div class="lg" role="group" aria-label="系列：点击显示或隐藏，Alt+点击或双击只看这一条"></div><span class="u">每周新增用户（人）</span></div><div class="ch"><svg role="img" aria-label="近 12 周各渠道每周新增用户折线图"></svg></div><div class="ft"><p class="msg" role="status">每周新增用户（人）· 近 12 周</p><button type="button" class="all" hidden>全部显示</button></div></div></div>

<script type="module">
export default function demo(root) {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let seed = 3; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const line = (a, b, j) => Array.from({ length: 12 }, (_, i) => Math.round(a + ((b - a) * i) / 11 + (rnd() - 0.5) * j));
  // 颜色固定跟着系列走
  const S = [['应用商店', '#3b5bdb', line(1180, 1520, 120)], ['搜索', '#0ca678', line(420, 540, 60)], ['社交', '#f08c00', line(170, 380, 50)], ['邀请', '#ae3ec9', line(80, 200, 30)]].map(([n, c, d]) => ({ n, c, d, on: true }));
  const lg = root.querySelector('.lg'), svg = root.querySelector('svg'), ch = root.querySelector('.ch'), msg = root.querySelector('.msg'), all = root.querySelector('.all');
  const NS = 'http://www.w3.org/2000/svg', mk = (t, a) => { const n = document.createElementNS(NS, t); for (const k in a) n.setAttribute(k, a[k]); svg.append(n); return n; };
  const nice = (v) => { const h = (v * 1.05) / 2, p = 10 ** Math.floor(Math.log10(h)); return 2 * p * [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find((m) => m * p >= h); }; // 中线和上限都取整
  const target = () => nice(Math.max(...S.filter((s) => s.on).flatMap((s) => s.d)));
  let W = 0, H = 0, L = 36, T = 6, R = 0, B = 0, max = target(), raf = 0, stop = false, grid = [], paths = [];

  S.forEach((s, i) => {
    const b = document.createElement('button'); b.type = 'button'; b.style.setProperty('--c', s.c); b.setAttribute('aria-pressed', 'true');
    b.innerHTML = `<i></i>${s.n}<small class="v">${s.d[11].toLocaleString()}</small>`; lg.append(b); s.b = b;
    b.addEventListener('click', (e) => { stop = true; if (e.altKey) solo(i); else toggle(i); });
    b.addEventListener('dblclick', () => solo(i));
    b.addEventListener('keydown', (e) => { if (e.altKey && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); stop = true; solo(i); } });
    ['pointerenter', 'focus'].forEach((t) => b.addEventListener(t, () => hot(i)));
    ['pointerleave', 'blur'].forEach((t) => b.addEventListener(t, () => hot(-1)));
  });
  const hot = (i) => { ch.classList.toggle('focus', i >= 0); paths.forEach((p, j) => p.classList.toggle('hot', j === i)); };

  const draw = () => {
    svg.replaceChildren(); R = W - 4; B = H - 18;
    grid = [0, 0.5, 1].map((f) => { const y = B - (B - T) * f; mk('line', { class: 'gl', x1: L, x2: R, y1: y, y2: y }); return mk('text', { class: 'ax', x: L - 6, y: y + 4, 'text-anchor': 'end' }); });
    [0, 3, 6, 9].forEach((i) => { mk('text', { class: 'ax', x: L + (i / 11) * (R - L), y: H - 3, 'text-anchor': i ? 'middle' : 'start' }).textContent = `第 ${i + 1} 周`; });
    paths = S.map((s) => mk('path', { class: 'ln', stroke: s.c }));
    paint();
  };
  const paint = () => { // 按当前纵轴上限画刻度和线
    grid.forEach((t, j) => { t.textContent = Math.round((max * j) / 2 / 10) * 10; });
    S.forEach((s, j) => { paths[j].classList.toggle('off', !s.on); paths[j].setAttribute('d', s.d.map((v, i) => `${i ? 'L' : 'M'}${L + (i / 11) * (R - L)} ${B - (v / max) * (B - T)}`).join('')); });
  };
  const rescale = (text) => {
    S.forEach((s) => s.b.setAttribute('aria-pressed', String(s.on)));
    const hidden = S.filter((s) => !s.on); all.hidden = !hidden.length;
    const from = max, to = target(); cancelAnimationFrame(raf);
    msg.textContent = text + (from !== to ? `，纵轴改为 0–${to.toLocaleString()}` : '');
    if (still || from === to || !W) { max = to; paint(); return; }
    const t0 = performance.now();
    const step = (t) => {
      if (!root.host.isConnected) return;
      const p = Math.min(1, (t - t0) / 280), e = 1 - (1 - p) ** 3; max = from + (to - from) * e; paint();
      if (p < 1) raf = requestAnimationFrame(step); else { max = to; paint(); }
    };
    raf = requestAnimationFrame(step);
  };
  const toggle = (i) => {
    const s = S[i];
    if (s.on && S.filter((x) => x.on).length === 1) { msg.textContent = '至少保留一条系列'; return; }
    s.on = !s.on; rescale(`已${s.on ? '显示' : '隐藏'} ${s.n}`);
  };
  const solo = (i) => {
    const only = S.every((s, j) => s.on === (j === i));
    S.forEach((s, j) => { s.on = only || j === i; }); rescale(only ? '已显示全部系列' : `只看 ${S[i].n}`);
  };
  all.addEventListener('click', () => { S.forEach((s) => { s.on = true; }); rescale('已显示全部系列'); lg.querySelector('button').focus(); });

  let first = true;
  const ro = new ResizeObserver(() => {
    if (!root.host.isConnected) { ro.disconnect(); return; }
    W = ch.clientWidth; H = ch.clientHeight; svg.setAttribute('viewBox', `0 0 ${W} ${H}`); draw();
    // 挂载后演示一次：隐藏最大的系列，小渠道的走势被放大
    if (first) { first = false; setTimeout(() => { if (!stop && root.host.isConnected) toggle(0); }, 500); }
  });
  ro.observe(ch);
}
</script>
