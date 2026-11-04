---
zh: 滚轮时间选择
en: Scroll-snap time wheel
order: 10
---

## 是什么

时、分两列竖向滚轮，手指一甩带惯性滚动并吸附到整格，中间高亮带是选中值，离中心越远的项越小越淡。

## 适合

手机上选时间、时长、日期、身高体重这类有顺序的值，每列 10–100 项。

## 不适合

桌面表单用原生 input type="time" 或可输入的文本框；少于 5 个选项用分段控件；没有顺序的选项（城市、类别）用列表加搜索。

## 注意

惯性和吸附交给原生 overflow: auto + scroll-snap，不要用脚本模拟物理；选中值以滚动位置为准，不靠点击记录。

## 要点

- 每列 overflow-y: auto + scroll-snap-type: y mandatory，每项高 34–40px、scroll-snap-align: center；上下内边距各留 2 项高度，首尾项也能停到中间。
- 一次露出 5 项，中间一条高亮带，单位（时 / 分）固定在带里，不跟着滚。
- 按离中心的距离缩放和变淡：每远一项缩小约 12%、透明度降约 30%，在 scroll 事件里用 requestAnimationFrame 更新，只动 transform 和 opacity。
- 每列 role="spinbutton"，带 aria-valuemin / max / now 和 aria-valuetext（“7 点”“30 分”）；上下键一格、PageUp / PageDown 一大步、Home / End 到两端。
- 点上下露出的项直接滚到它；鼠标拖动时临时关掉吸附，松手再吸附到最近一项。
- 结果文字（“每天 07:30 响铃，距现在约 8 小时”）跟着选中值更新；需要首尾循环时在两端复制若干项。
- 减少动态效果时，按键和点选直接跳到位，手指滚动保持原生。

## 提示词

给{设置页}做「滚轮时间选择」，共 {列数} 列（如时、分）：每列 overflow-y: auto + scroll-snap-type: y mandatory，每项 34px 居中吸附，上下各留 2 项高度的内边距，一次露出 5 项；中间一条高亮带，单位固定在带里；按离中心的距离缩放（每远一项小 12%）和变淡（透明度每项降 30%），用 requestAnimationFrame 更新；每列 role="spinbutton"，带 aria-valuenow 和 aria-valuetext，上下键一格、PageUp / PageDown 一大步、Home / End 到两端；点露出的项直接滚过去；鼠标拖动时临时关掉吸附；旁边显示结果文字；减少动态效果时按键和点选直接跳到位。

## 示例

<link rel="stylesheet" href="../../_shared/app-control-base.css">
<style>
.st{display:grid;place-items:center;padding:8px 16px}
.wrap{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%}
.info{display:none;text-align:center}
.info b{font-size:15px}
.info p{margin:0;color:#5b616e;font-size:12px}
.info .sum{color:#1f2329;font-size:13px;font-variant-numeric:tabular-nums}
.wheel{position:relative;flex:none;display:flex;justify-content:center;gap:4px;width:100%;max-width:240px}
.band{position:absolute;left:0;right:0;top:68px;height:34px;border:1px solid #e3e6eb;border-radius:10px;background:#fff;box-shadow:0 1px 2px rgba(16,24,40,.05)}
.cw{position:relative;flex:1 1 0;min-width:0}
.col{height:170px;padding:68px 0;overflow-y:auto;scroll-snap-type:y mandatory;overscroll-behavior:contain;scrollbar-width:none;touch-action:pan-y;border-radius:10px;outline-offset:-2px;cursor:grab}
.col::-webkit-scrollbar{display:none}
.col.grab{scroll-snap-type:none;cursor:grabbing}
.col span{display:block;height:34px;padding-right:20px;line-height:34px;text-align:center;font-size:20px;font-variant-numeric:tabular-nums;scroll-snap-align:center;user-select:none}
.col span.on{font-weight:600}
.u{position:absolute;right:16px;top:50%;transform:translateY(-50%);color:#5b616e;font-size:12px;pointer-events:none}
@container (min-height:220px){.info{display:block}
}
@container (min-width:560px){.wrap{flex-direction:row;justify-content:center;gap:56px}
.info{min-width:180px;text-align:left}
.info b{font-size:17px}
.info .sum{font-size:15px}
}
</style>

<div class="st"><div class="wrap"><div class="info"><b>起床闹钟</b><p class="sum">每天 07:30 响铃</p><p class="left"></p></div><div class="wheel"><div class="band" aria-hidden="true"></div><div class="cw"><div class="col" role="spinbutton" tabindex="0" aria-label="小时" aria-valuemin="0" aria-valuemax="23" data-say="点" data-big="6"></div><span class="u" aria-hidden="true">时</span></div><div class="cw"><div class="col" role="spinbutton" tabindex="0" aria-label="分钟" aria-valuemin="0" aria-valuemax="59" data-say="分" data-big="10"></div><span class="u" aria-hidden="true">分</span></div></div></div></div>

<script type="module">
export default function demo(root) {
  const H = 34, still = matchMedia('(prefers-reduced-motion: reduce)').matches, two = (n) => String(n).padStart(2, '0');
  const sum = root.querySelector('.sum'), left = root.querySelector('.left'), cols = [];
  const show = () => {
    if (cols.some((c) => c.v < 0)) return;
    const [h, m] = cols.map((c) => c.v), n = new Date(), t = new Date(n);
    t.setHours(h, m, 0, 0); if (t <= n) t.setDate(t.getDate() + 1);
    const mins = Math.round((t - n) / 60000);
    sum.textContent = `每天 ${two(h)}:${two(m)} 响铃`; left.textContent = `距现在约 ${Math.floor(mins / 60)} 小时 ${mins % 60} 分`;
  };
  root.querySelectorAll('.col').forEach((el) => {
    const max = +el.getAttribute('aria-valuemax'), c = { v: -1, want: null };
    el.innerHTML = Array.from({ length: max + 1 }, (_, i) => `<span>${two(i)}</span>`).join('');
    const items = [...el.children], clamp = (i) => Math.max(0, Math.min(max, i));
    let raf = 0, drag = null;
    c.paint = () => {
      raf = 0; const pos = el.scrollTop / H, i = clamp(Math.round(pos));
      items.forEach((it, k) => { const d = Math.min(Math.abs(k - pos), 3); it.style.transform = `scale(${1 - d * 0.12})`; it.style.opacity = 1 - d * 0.3; });
      if (c.want !== null && Math.abs(el.scrollTop - c.want * H) < 1) c.want = null;
      if (i === c.v) return;
      c.v = i; el.setAttribute('aria-valuenow', i); el.setAttribute('aria-valuetext', i + ' ' + el.dataset.say);
      items.forEach((it, k) => it.classList.toggle('on', k === i)); show();
    };
    c.go = (i, instant) => { c.want = clamp(i); el.scrollTo({ top: c.want * H, behavior: instant || still ? 'auto' : 'smooth' }); };
    el.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(c.paint); }, { passive: true });
    el.addEventListener('wheel', () => { c.want = null; }, { passive: true });
    el.addEventListener('keydown', (e) => {
      const base = c.want ?? c.v, big = +el.dataset.big;
      const to = { ArrowUp: base - 1, ArrowDown: base + 1, PageUp: base - big, PageDown: base + big, Home: 0, End: max }[e.key];
      if (to === undefined) return; e.preventDefault(); c.go(to);
    });
    // 触屏：原生滚动 + 点选；鼠标：补一个拖动，拖动时关掉吸附
    el.addEventListener('click', (e) => { const s = e.target.closest('span'); if (s) c.go(items.indexOf(s)); });
    el.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse' || e.button > 0) return; c.want = null; drag = { y: e.clientY, top: el.scrollTop, moved: false }; el.setPointerCapture(e.pointerId); el.classList.add('grab'); });
    el.addEventListener('pointermove', (e) => { if (!drag) return; const dy = e.clientY - drag.y; if (Math.abs(dy) > 3) drag.moved = true; el.scrollTop = drag.top - dy; });
    const up = (e) => { if (!drag) return; const tap = !drag.moved, y = e.clientY - el.getBoundingClientRect().top + el.scrollTop; drag = null; el.classList.remove('grab'); c.go(tap ? Math.floor((y - 2 * H) / H) : Math.round(el.scrollTop / H)); };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    cols.push(c);
  });
  requestAnimationFrame(() => {
    cols[0].go(5, true); cols[1].go(0, true); cols.forEach((c) => c.paint());
    setTimeout(() => { if (root.host.isConnected) { cols[0].go(7); cols[1].go(30); } }, 300);
  });
}
</script>
