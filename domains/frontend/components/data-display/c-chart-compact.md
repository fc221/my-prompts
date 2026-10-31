---
zh: 紧凑图表组
en: Compact chart set
aka: 小图表 卡片图表 迷你图 散点图 柱线组合 步数柱状图 阶段条形图
order: 115
---

## 是什么

散点图、柱线组合图、条形列表、阶段条形图、日柱图，各自压到一张卡片大小：图上只留必要的东西，具体数值放在卡片标题行，随悬停变化。

## 适合

看板侧栏、详情页的小卡、移动端概览，一屏要摆好几张图、每张只有二三百像素宽的地方。

## 不适合

选哪种图、配色和标注的通用规则见「图表选型与规范」，这里只讲小尺寸下的取舍；单个指标用「统计指标卡」；健康类的环形和打卡格用「小型健康数据图」。

## 注意

小尺寸下浮动提示很容易被卡片裁掉，也遮住图本身。把读数固定在标题行右侧：平时显示最重要的一项，悬停时换成指针处的值，离开后恢复。

## 要点

- 删什么：纵轴、网格线、图例、大部分刻度先删，留首尾两个横轴标签或单字星期；有比较基准（目标线）就留
- 高亮：默认高亮最新值或最值，其余压成灰；用颜色说清“看这一个”，其他都是背景
- 命中：小图不要求指针精确压到标记，柱状和条形按所在列或行算，散点取最近的点；触屏按下即显示，横向滑动可连续查看
- 散点：点半径 3.5px，当前点 5px，不超过 30 个；只标坐标范围，点名放进读数
- 柱线组合：柱和线量纲不同，线放在上方四成、柱放在下方七成，各用各的比例，不画两条纵轴；两个数字都写进读数
- 条形列表：一行“名称、条、数值”，既是图也是表；类目不超过 5 个，多的并入“其他”；条的长度以最大值为 100%
- 阶段条形：下一步的长度相对第一步算，浅色底是上一步的规模，看得出每一步掉了多少；读数写“上一步的 30%”
- 日柱图：一根虚线表示目标，达标实色、未达标减淡；颜色之外还有高度和目标线，不靠红绿区分
- 尺寸：图按真实像素重绘（ResizeObserver），线宽和文字不随比例变形；文字不小于 11px
- 键盘：每张图一个 Tab 位，方向键移动当前项，读数同步，role="status" 播报；图的 aria-label 写一句结论

## 提示词

做一组「紧凑图表组」放在{看板侧栏}，每张卡片宽{卡片宽度}：包含{图表列表}（可选散点图、柱线组合图、条形列表、阶段条形图、日柱图）。通用规则：标题行左边写指标，右边固定显示读数，默认是最新值或最值，悬停显示指针处的值，离开恢复；删掉纵轴、网格线和图例，横轴只留首尾标签；当前项用品牌色，其余压成灰；柱和条按所在列或行命中，散点取最近的点；触屏按下即显示；用 ResizeObserver 按真实像素重绘，文字不小于 11px；每张图一个 Tab 位，方向键移动当前项，role="status" 播报，aria-label 写一句结论。分图：柱线组合的线放上方四成，柱放下方七成，各用各的比例，读数写两个值；条形列表一行“名称、条、数值”，超过 5 类并入“其他”；阶段条形的浅色底是上一步的规模，读数写占上一步的百分比；日柱图画目标虚线（目标是{目标值}），未达标减淡。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:7px 10px;background:#eef0f4}
.w{display:grid;grid-template-rows:auto minmax(0,1fr);gap:5px;height:100%;max-width:680px;margin:0 auto}
.tabs{display:flex;gap:2px;padding:2px;border-radius:8px;background:#e1e4ea}
.tabs button{flex:1;min-width:0;height:24px;padding:0;border:0;border-radius:6px;background:none;color:#475467;font-size:12px;white-space:nowrap}
.tabs button[aria-pressed=true]{background:#fff;color:#1f2329;font-weight:600;box-shadow:0 1px 2px rgba(16,24,40,.12)}
.gr{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));grid-template-rows:minmax(0,1fr);min-height:0}
.cd{grid-column:1/-1;display:none;grid-template-rows:auto minmax(0,1fr);gap:3px;min-width:0;min-height:0;padding:6px 10px 7px;border:1px solid #e3e6eb;border-radius:10px;background:#fff}
.cd.on{display:grid}
.hd{display:flex;align-items:baseline;justify-content:space-between;gap:8px;min-width:0;line-height:18px}
.hd h3{flex:none;margin:0;color:#475467;font-size:12px;font-weight:600;white-space:nowrap}
.rd{min-width:0;overflow:hidden;color:#1f2329;font-size:12.5px;font-weight:700;white-space:nowrap;text-overflow:ellipsis;font-variant-numeric:tabular-nums}
.ch{position:relative;min-width:0;min-height:0;border-radius:4px;cursor:crosshair;touch-action:pan-y}
.ch svg{position:absolute;inset:0;display:block;width:100%;height:100%;overflow:visible}
.ch text{fill:#667085;font-size:11px;font-variant-numeric:tabular-nums}
.ch .e{text-anchor:end}
.mu{fill:#c3cad9}
.pt{fill:#a6b2cc}
.hi{fill:#3b5bdb}
.gd{stroke:#e6e9ee;stroke-width:1}
.lnn{fill:none;stroke:#e8590c;stroke-width:2;stroke-linejoin:round;stroke-linecap:round}
.dt{fill:#fff;stroke:#e8590c;stroke-width:2}
.go{stroke:#667085;stroke-width:1;stroke-dasharray:3 3}
.rows{display:grid;grid-auto-rows:minmax(0,1fr);align-items:center;height:100%}
.rw{display:grid;grid-template-columns:52px minmax(0,1fr) 44px;gap:6px;align-items:center;min-width:0;height:100%;border-radius:4px;font-size:12px;line-height:16px}
.rw.q{grid-template-columns:30px minmax(0,1fr) 44px}
.rw b{font-weight:500;white-space:nowrap}
.rw.act b{font-weight:700}
.rw u{display:block;height:9px;border-radius:0 4px 4px 0;background:#eceef2;text-decoration:none;overflow:hidden}
.rw u i{display:block;height:100%;border-radius:0 4px 4px 0;background:#b3bdd3}
.rw.act u i{background:#3b5bdb}
.rw span{color:#475467;font-size:11.5px;text-align:right;font-variant-numeric:tabular-nums}
@container (min-width:560px){.tabs{display:none}
.w{grid-template-rows:minmax(0,1fr)}
.gr{grid-template-rows:repeat(2,minmax(0,1fr));gap:6px}
.cd{display:grid;grid-column:span 2}
.cd:nth-child(n+4){grid-column:span 3}
}
</style>

<div class="st"><div class="w"><div class="tabs" role="group" aria-label="切换图表"></div><div class="gr"></div></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const fmt = (n) => n.toLocaleString('en-US');
  const col = (x, w, n) => Math.max(0, Math.min(n - 1, Math.floor(x / w * n))), row = (y, h, n) => Math.max(0, Math.min(n - 1, Math.floor(y / h * n)));
  const STORE = [['静安店', 86, 22], ['滨江店', 112, 27], ['南门店', 64, 18], ['东湖店', 138, 33], ['老城店', 92, 30], ['西站店', 75, 16], ['大学城店', 58, 26], ['望京店', 156, 35], ['天河店', 124, 24], ['高新店', 101, 21], ['河西店', 143, 29], ['城北店', 70, 20], ['湖滨店', 118, 38], ['五一店', 97, 25]].sort((a, b) => a[1] - b[1]);
  const MON = ['11', '12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], ORD = [820, 760, 910, 980, 1120, 1060, 1180, 1240, 1310, 1290, 1420, 1510], RATE = [2.4, 2.2, 2.6, 2.7, 3.0, 2.9, 3.1, 3.2, 3.4, 3.3, 3.6, 3.8];
  const SRC = [['自然搜索', 4120], ['社群分享', 2860], ['付费广告', 2310], ['邮件', 980], ['其他', 460]], SUM = SRC.reduce((a, s) => a + s[1], 0);
  const FUN = [['访问', 12400], ['注册', 3720], ['下单', 1190], ['复购', 410]];
  const DAY = ['日', '一', '二', '三', '四', '五', '六'], STEP = [5310, 6240, 9180, 7420, 10350, 8120, 12040], GOAL = 8000;
  const px = (v, a, b, s) => (v - a) / (b - a) * s;
  const C = [
    { tab: '散点', t: '门店复购', n: STORE.length, def: STORE.findIndex((s) => s[0] === '湖滨店'), sum: '14 家门店的客单价和复购率，客单价越高复购率大体越高，湖滨店最高', txt: (i) => `${STORE[i][0]} ¥${STORE[i][1]} · ${STORE[i][2]}%`,
      xy: (i, w, h) => [8 + px(STORE[i][1], 50, 165, w - 16), 8 + (h - 26) - px(STORE[i][2], 12, 40, h - 26)],
      hit(x, y, w, h) { let b = 0, m = 1e9; STORE.forEach((_, i) => { const [a, c] = this.xy(i, w, h), d = (a - x) ** 2 + (c - y) ** 2; if (d < m) { m = d; b = i; } }); return b; },
      html(w, h, a) { return `<line class="gd" x1="0" x2="${w}" y1="${h - 15}" y2="${h - 15}"/>` + STORE.map((_, i) => { const [x, y] = this.xy(i, w, h); return `<circle class="${i === a ? 'hi' : 'pt'}" cx="${x}" cy="${y}" r="${i === a ? 5 : 3.5}"/>`; }).join('') + `<text x="0" y="${h - 2}">¥50</text><text class="e" x="${w}" y="${h - 2}">客单价 ¥165</text><text x="0" y="9">复购率 40%</text>`; } },
    { tab: '柱线', t: '月度订单', n: 12, def: 11, sum: '近 12 个月订单量从 820 单升到 1510 单，转化率从 2.4% 升到 3.8%', txt: (i) => `${MON[i]} 月 ${fmt(ORD[i])} 单 · ${RATE[i]}%`, hit: (x, y, w) => col(x, w, 12),
      html(w, h, a) { const b = h - 16, s = w / 12, bw = Math.max(4, s * 0.62), y = (r) => 4 + (b * 0.42 - 4) * (1 - px(r, 2, 4, 1)), pts = RATE.map((r, i) => `${(i + 0.5) * s},${y(r)}`).join(' '); return ORD.map((v, i) => { const t = px(v, 0, 1700, b * 0.72); return `<rect class="${i === a ? 'hi' : 'mu'}" x="${i * s + (s - bw) / 2}" y="${b - t}" width="${bw}" height="${t}" rx="2"/>`; }).join('') + `<polyline class="lnn" points="${pts}"/><circle class="dt" cx="${(a + 0.5) * s}" cy="${y(RATE[a])}" r="3.5"/><text x="0" y="${h - 2}">11 月</text><text class="e" x="${w}" y="${h - 2}">10 月</text>`; } },
    { tab: '条形', t: '流量来源', n: SRC.length, def: 0, sum: '流量来源：' + SRC.map(([k, v]) => `${k} ${v}`).join('，'), txt: (i) => `${SRC[i][0]} 占 ${Math.round(SRC[i][1] / SUM * 100)}%`, hit: (x, y, w, h) => row(y, h, SRC.length),
      html: (w, h, a) => `<div class="rows">${SRC.map(([k, v], i) => `<div class="rw${i === a ? ' act' : ''}"><b>${k}</b><u><i style="width:${v / SRC[0][1] * 100}%"></i></u><span>${fmt(v)}</span></div>`).join('')}</div>` },
    { tab: '阶段', t: '注册转化', n: FUN.length, def: 1, sum: '转化阶段：' + FUN.map(([k, v]) => `${k} ${v}`).join('，'), txt: (i) => (i ? `${FUN[i][0]} · 上一步的 ${Math.round(FUN[i][1] / FUN[i - 1][1] * 100)}%` : `${FUN[0][0]} ${fmt(FUN[0][1])}`), hit: (x, y, w, h) => row(y, h, FUN.length),
      html: (w, h, a) => `<div class="rows">${FUN.map(([k, v], i) => `<div class="rw q${i === a ? ' act' : ''}"><b>${k}</b><u style="width:${(i ? FUN[i - 1][1] : v) / FUN[0][1] * 100}%"><i style="width:${v / (i ? FUN[i - 1][1] : v) * 100}%"></i></u><span>${fmt(v)}</span></div>`).join('')}</div>` },
    { tab: '步数', t: '近 7 天步数', n: 7, def: 6, sum: '近 7 天步数，有 4 天达到 8000 步目标，周六最高 12040 步', txt: (i) => `周${DAY[i]} ${fmt(STEP[i])} 步`, hit: (x, y, w) => col(x, w, 7),
      html(w, h, a) { const b = h - 16, s = w / 7, bw = Math.min(26, s * 0.6), H = (v) => px(v, 0, 12600, b), g = b - H(GOAL); return STEP.map((v, i) => `<rect class="${i === a ? 'hi' : v >= GOAL ? 'mu' : 'pt'}" style="${v < GOAL && i !== a ? 'opacity:.55' : ''}" x="${i * s + (s - bw) / 2}" y="${b - H(v)}" width="${bw}" height="${H(v)}" rx="3"/><text x="${(i + 0.5) * s}" y="${h - 2}" text-anchor="middle">${DAY[i]}</text>`).join('') + `<line class="go" x1="0" x2="${w}" y1="${g}" y2="${g}"/><text x="0" y="${g - 4}">目标 8,000</text>`; } },
  ];
  const tabs = root.querySelector('.tabs'), gr = root.querySelector('.gr'), sr = root.querySelector('.sr');
  tabs.innerHTML = C.map((c, i) => `<button type="button" aria-pressed="${i === 1}">${c.tab}</button>`).join('');
  gr.innerHTML = C.map((c, i) => `<section class="cd${i === 1 ? ' on' : ''}"><div class="hd"><h3>${c.t}</h3><span class="rd"></span></div><div class="ch" tabindex="0" role="img" aria-label="${c.sum}。方向键查看每一项"></div></section>`).join('');
  const cards = [...gr.children], tbs = [...tabs.children];
  const draw = (k) => {
    const c = C[k], el = cards[k].querySelector('.ch'), w = el.clientWidth, h = el.clientHeight; if (!w || !h) return;
    const inner = c.html(w, h, c.a ?? c.def); el.innerHTML = inner.startsWith('<div') ? inner : `<svg aria-hidden="true">${inner}</svg>`;
    cards[k].querySelector('.rd').textContent = c.txt(c.a ?? c.def);
  };
  const set = (k, a) => { if ((C[k].a ?? C[k].def) === a) return; C[k].a = a; draw(k); };
  cards.forEach((cd, k) => {
    const el = cd.querySelector('.ch'), c = C[k];
    const at = (e) => { const r = el.getBoundingClientRect(); set(k, c.hit(e.clientX - r.left, e.clientY - r.top, r.width, r.height)); };
    el.addEventListener('pointermove', at); el.addEventListener('pointerdown', at);
    el.addEventListener('pointerleave', (e) => { if (root.activeElement !== el && e.pointerType === 'mouse') set(k, c.def); });
    el.addEventListener('blur', () => set(k, c.def));
    el.addEventListener('keydown', (e) => {
      const n = c.a ?? c.def, to = { ArrowLeft: n - 1, ArrowUp: n - 1, ArrowRight: n + 1, ArrowDown: n + 1, Home: 0, End: c.n - 1 }[e.key];
      if (to === undefined) return; e.preventDefault(); set(k, Math.max(0, Math.min(c.n - 1, to))); sr.textContent = c.txt(c.a);
    });
  });
  tbs.forEach((b, i) => b.addEventListener('click', () => { tbs.forEach((x, j) => x.setAttribute('aria-pressed', j === i)); cards.forEach((c, j) => c.classList.toggle('on', j === i)); draw(i); }));
  const ro = new ResizeObserver(() => { if (!root.host.isConnected) return ro.disconnect(); C.forEach((_, k) => draw(k)); });
  ro.observe(gr);
}
</script>
