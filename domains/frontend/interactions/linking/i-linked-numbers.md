---
zh: 统计面板同步滚动
en: Synced stats panel
order: 40
---

## 是什么

切换周 / 月 / 年或点某根柱子时，面板里所有数字同一时刻开始滚到新值，柱子高度和涨跌标签一起变。

## 适合

运动、记账、学习时长、店铺经营这类“换一个周期，带动一整组指标”的统计面板。

## 不适合

页面首次出现的单个大数字用数字滚动计数；勾选带动进度用完成反馈；每秒都在刷新的实时数据直接替换，不做滚动。

## 注意

所有数字共用同一个开始时刻和时长，有先有后就显得不同步；中途再切换时从当前显示值接着滚。

## 要点

- 切换后所有数字在同一帧开始，统一 500ms 缓出；用等宽数字并预留宽度，滚动时不挤动旁边的元素。
- 柱子用 transform: scaleY 过渡，时长和曲线与数字一致；柱子数量变化时新柱子从 0 长出。
- 涨跌标签在开始那一刻就换箭头和颜色（涨绿跌红，或按行业习惯反过来），并写“较上期”，不只靠颜色。
- 点柱子查看这一段的数据，再点一次回到周期汇总；柱子是按钮，带 aria-pressed 和“周三 18.2 公里”这样的名称。
- 周期切换用分段控件（原生 radio），方向键可切。
- 只用 role="status" 播报一次最终汇总（“本月 412.6 公里，24 次……”），不要逐帧播报滚动中的数字。
- 减少动态效果时数字和柱子直接变到新值。

## 提示词

给{统计面板}做「统计面板同步滚动」：顶部是{周期选项}分段控件（原生 radio，方向键可切），下面一组指标（{指标列表}）和一组柱状图；切换周期或点某根柱子时，所有数字在同一帧开始滚到新值（统一 500ms 缓出，等宽数字并预留宽度），柱子高度用 transform: scaleY 同步过渡，涨跌标签在开始时换箭头和颜色并写“较上期”；中途再切换从当前显示值接着滚；柱子是按钮（aria-pressed，名称写清日期和数值），再点一次回到汇总；用 role="status" 只播报一次最终汇总；减少动态效果时直接显示新值。

## 示例

<link rel="stylesheet" href="../../_shared/app-control-base.css">
<style>
.st{padding:10px 14px}
.pn{display:flex;flex-direction:column;gap:8px;height:100%;max-width:520px;margin:0 auto}
.top{flex:none;display:flex;align-items:center;justify-content:space-between;gap:8px}
.seg{display:inline-flex;padding:2px;border-radius:8px;background:#e6e9ee}
.seg label{position:relative}
.seg input{position:absolute;width:1px;height:1px;margin:0;opacity:0}
.seg span{display:block;min-width:40px;height:26px;padding:0 10px;border-radius:6px;color:#5b616e;font-size:12px;line-height:26px;text-align:center;cursor:pointer}
.seg input:checked+span{background:#fff;color:#1f2329;font-weight:600;box-shadow:0 1px 2px rgba(16,24,40,.1)}
.seg input:focus-visible+span{outline:2px solid #3b5bdb;outline-offset:1px}
.per{color:#5b616e;font-size:12px;white-space:nowrap}
.kp{flex:none;display:grid;grid-template-columns:minmax(0,1.3fr) repeat(3,minmax(0,1fr));gap:6px;margin:0}
.kp div{min-width:0}
.kp dt{overflow:hidden;color:#5b616e;font-size:11px;line-height:15px;text-overflow:ellipsis;white-space:nowrap}
.kp dd{margin:0;font-size:17px;font-weight:600;line-height:22px;font-variant-numeric:tabular-nums;white-space:nowrap}
.chg{display:flex;align-items:center;gap:2px;color:#12805c}
.chg svg{flex:none;width:11px;height:11px;fill:currentColor}
.chg.dn{color:#c4320a}
.chg.dn svg{transform:rotate(180deg)}
.bars{flex:1;min-height:0;display:grid;grid-template-columns:repeat(var(--n,7),minmax(0,1fr));gap:4px}
.bar{display:flex;flex-direction:column;align-items:center;gap:3px;min-width:0;padding:0;border:0;border-radius:4px;background:none}
.bar i{flex:1;width:100%;max-width:24px;border-radius:4px 4px 2px 2px;background:#3b5bdb;transform:scaleY(var(--h,0));transform-origin:bottom;transition:transform .5s cubic-bezier(.2,0,0,1),background-color .2s}
.bar small{color:#8a8f99;font-size:10px;line-height:12px;white-space:nowrap}
.has .bar i{background:#c5cff7}
.has .bar[aria-pressed=true] i{background:#3b5bdb}
.bar[aria-pressed=true] small{color:#1f2329;font-weight:600}
.bar:hover i{filter:brightness(1.08)}
@container (min-height:220px){.pn{gap:12px}
.kp dt{font-size:12px;line-height:18px}
.kp dd{font-size:22px;line-height:28px}
.bar small{font-size:11px;line-height:14px}
}
</style>

<div class="st"><div class="pn"><div class="top"><div class="seg" role="radiogroup" aria-label="统计周期"><label><input type="radio" name="lp" value="w" checked><span>周</span></label><label><input type="radio" name="lp" value="m"><span>月</span></label><label><input type="radio" name="lp" value="y"><span>年</span></label></div><span class="per">本周</span></div><dl class="kp"><div><dt>总里程 km</dt><dd data-n="0">0</dd></div><div><dt>次数</dt><dd data-n="1">0</dd></div><div><dt>均速 km/h</dt><dd data-n="2">0</dd></div><div><dt>较上期</dt><dd class="chg"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 2l4.5 6h-9z"/></svg><span class="sr dir">增加</span><span data-n="3">0</span>%</dd></div></dl><div class="bars"></div><p class="sr" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const D = {
    w: { name: '本周', lab: ['一', '二', '三', '四', '五', '六', '日'], km: [12.4, 8.6, 18.2, 15.5, 6.3, 38.2, 14.3], n: [1, 1, 1, 1, 1, 1, 1], spd: [19.8, 18.4, 21.2, 22.4, 17.9, 23.1, 20.6], last: 98.6, p0: 16.8 },
    m: { name: '本月', lab: ['第1周', '第2周', '第3周', '第4周'], km: [96.2, 104.3, 98.6, 113.5], n: [5, 6, 6, 7], spd: [21.0, 21.6, 20.2, 21.9], last: 438.9, p0: 101.2 },
    y: { name: '近一年', lab: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], km: [168.2, 142.5, 256.8, 340.1, 398.4, 376.9, 288.3, 335.6, 391.2, 412.6, 236.4, 180.7], n: [10, 9, 15, 19, 22, 21, 16, 19, 22, 24, 14, 11], spd: [19.6, 19.9, 20.8, 21.3, 21.9, 21.5, 20.4, 21.0, 21.6, 21.4, 20.6, 20.1], last: 2986.4, p0: 160.3 },
  };
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bars = root.querySelector('.bars'), per = root.querySelector('.per'), chg = root.querySelector('.chg'), dir = root.querySelector('.dir'), st = root.querySelector('[role=status]'), nums = [...root.querySelectorAll('[data-n]')];
  const sum = (a) => a.reduce((x, y) => x + y, 0);
  let mode = 'w', sel = -1, shown = null, raf = 0;
  const stats = () => {
    const d = D[mode];
    if (sel >= 0) return { name: mode === 'w' ? '周' + d.lab[sel] : mode === 'm' ? d.lab[sel] : d.lab[sel] + '月', km: d.km[sel], n: d.n[sel], spd: d.spd[sel], prev: sel ? d.km[sel - 1] : d.p0 };
    const km = sum(d.km);
    return { name: d.name, km, n: sum(d.n), spd: km / sum(d.km.map((k, i) => k / d.spd[i])), prev: d.last }; // 均速 = 总距离 / 总时长
  };
  const paint = () => { nums.forEach((el, i) => { el.textContent = i === 0 || i === 2 ? shown[i].toFixed(1) : Math.round(shown[i]); }); };
  // 所有数字共用一个起点和 500ms 时长；中途再切换从当前显示值接着滚
  const roll = (to) => {
    cancelAnimationFrame(raf);
    const from = shown.slice(), t0 = performance.now();
    const step = (now) => {
      if (!root.host.isConnected) return;
      const k = still ? 1 : Math.min(1, (now - t0) / 500), e = 1 - (1 - k) ** 3;
      shown = from.map((f, i) => f + (to[i] - f) * e); paint();
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };
  const drawBars = () => {
    const d = D[mode], max = Math.max(...d.km);
    while (bars.children.length < d.km.length) { const b = document.createElement('button'); b.type = 'button'; b.className = 'bar'; b.innerHTML = '<i></i><small></small>'; bars.append(b); }
    while (bars.children.length > d.km.length) bars.lastChild.remove();
    bars.style.setProperty('--n', d.km.length); bars.classList.toggle('has', sel >= 0);
    void bars.offsetWidth; // 新柱子先以 0 高度出现，再长到目标高度
    [...bars.children].forEach((b, i) => {
      b.style.setProperty('--h', d.km[i] / max); b.querySelector('small').textContent = d.lab[i];
      b.setAttribute('aria-pressed', String(i === sel)); b.setAttribute('aria-label', `${mode === 'w' ? '周' + d.lab[i] : mode === 'm' ? d.lab[i] : d.lab[i] + '月'} ${d.km[i]} 公里`);
    });
  };
  const update = () => {
    const s = stats(), pct = Math.round(((s.km - s.prev) / s.prev) * 100), to = [s.km, s.n, s.spd, Math.abs(pct)];
    per.textContent = s.name; chg.classList.toggle('dn', pct < 0); dir.textContent = pct < 0 ? '减少' : '增加';
    drawBars();
    if (!shown) { shown = to; paint(); return; }
    st.textContent = `${s.name}：${s.km.toFixed(1)} 公里，${s.n} 次，平均 ${s.spd.toFixed(1)} 公里每小时，较上期${pct < 0 ? '减少' : '增加'} ${Math.abs(pct)}%`;
    roll(to);
  };
  root.querySelectorAll('.seg input').forEach((r) => r.addEventListener('change', () => { mode = r.value; sel = -1; update(); }));
  bars.addEventListener('click', (e) => { const b = e.target.closest('.bar'); if (!b) return; const i = [...bars.children].indexOf(b); sel = sel === i ? -1 : i; update(); });
  update();
  setTimeout(() => { if (root.host.isConnected && mode === 'w') root.querySelector('input[value=m]').click(); }, 500);
}
</script>
