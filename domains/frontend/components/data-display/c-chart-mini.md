---
zh: 小型健康数据图
en: Mini health charts
aka: 健康仪表盘 活动日历 睡眠环 营养环 打卡热力图 mini chart
order: 112
---

## 是什么

一张卡里放几张小图：月度活跃日历、睡眠评分环、营养三色环、分段统计条、打卡热力格。进场时依次长出来，悬停或点一下看具体数值。

## 适合

运动、睡眠、饮食、习惯打卡类 App 的今日概览，小组件，个人主页的数据卡。

## 不适合

要细看趋势、要比较多个时段用「紧凑图表组」或完整图表；单个数字配涨跌用「统计指标卡」；要排日程用「日历视图」。选型和配色的通用规则见「图表选型与规范」。

## 注意

每张小图只回答一个问题，标题就是这个问题，数字写在标题或环心。图上的细节留给悬停；触屏没有悬停，点一下要有同样的结果，键盘也要走得到。

## 要点

- 用项目的图表库（如 ECharts），下面是选型和配置要求；环、格子、分段条都有对应的系列，不自己画 SVG
- 布局：上排三张窄图，下排两张宽图；每格一个实例，容器变化时调 resize()；标题和数字放在 HTML 里，字号不低于 12px
- 月度日历：calendar 坐标系（range 当月，dayLabel.firstDay: 1 周一开头，cellSize 'auto'）+ heatmap 系列（coordinateSystem: 'calendar'），四档深浅用 visualMap 分段（type: 'piecewise'，不显示），空白日也画浅灰格
- 评分环：gauge 系列（progress.show，roundCap，pointer.show: false，axisTick / splitLine / axisLabel 关掉），分数写在环心（detail 或 HTML 覆盖）
- 营养环：同一个 gauge 放三条数据，progress.overlap: false 画成三层同心环，各算各的完成度；旁边写名字，窄的时候只留首字
- 分段条：横向堆叠 bar（同名 stack，各段按时长比例，只给两端圆角），下方写名称；颜色固定对应项目，换周不换色
- 打卡格：calendar + heatmap，一列一周，五档深浅，range 到今天为止；格子间隙用 calendar.itemStyle 的边框做 2px 留白；太窄时减少周数
- 进场：环从 0 画到目标值，条从左长出，格子按索引用 animationDelay 错开，总时长 1.2 秒以内；减少动态效果时 animation: false 直接显示
- 看数值：tooltip 固定格式“10 月 18 日 · 活动 85 分钟”，confine: true 不出卡片，用 position 回调放在图形下方或标题以外，不压住卡片标题；触屏点一下和悬停一样
- 键盘：每张图只占一个 Tab 位，聚焦后方向键 dispatchAction showTip 在图内移动，Esc 收起；aria.enabled 并给每张图 aria.label.description 写一句摘要
- 颜色之外也能读：环配文字、日历配提示

## 提示词

给{健康 App 概览页}做一张「小型健康数据图」卡：用项目的图表库（如 ECharts），每格一个实例，不手画 SVG。上排三格、下排两格。① 月度日历：calendar 坐标系 range 当月、dayLabel.firstDay: 1，heatmap 系列 coordinateSystem: 'calendar'，按{活动时长}用 visualMap 分四档深浅，空白日浅灰；② 评分环：gauge 的 progress，pointer.show: false，环心写分数；③ 三层同心环表示{三项指标}完成度：gauge 放三条数据、progress.overlap: false，旁边写名称，窄时只留首字；④ 分段条：横向 stack 的 bar 按时长比例，下方写名称，颜色固定对应项目；⑤ 打卡格：calendar + heatmap，一列一周、五档深浅，共{周数}周。进场：环从 0 画到目标值，条从左长出，格子按索引用 animationDelay 错开，总时长 1.2 秒内；减少动态效果时 animation: false。悬停或点击时 tooltip 显示“日期 · 数值”，confine: true，用 position 回调让它不压住卡片标题；每张图一个 Tab 位，聚焦后方向键用 dispatchAction showTip 在图内移动、Esc 收起，aria.enabled 并写一句摘要；容器变化时调 resize()，文字不小于 12px。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{background:#eef0f4}
.dash{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));grid-template-rows:repeat(2,minmax(0,1fr));gap:5px;height:100%;max-width:640px;margin:0 auto;padding:7px 8px}
.tl{grid-column:span 2;display:grid;grid-template-rows:auto minmax(0,1fr);gap:2px;min-width:0;min-height:0;padding:5px 7px 6px;border:1px solid #e3e6eb;border-radius:10px;background:#fff}
.tl.w{grid-column:span 3}
.tl h3{display:flex;align-items:baseline;justify-content:space-between;gap:4px;min-width:0;margin:0;color:#475467;font-size:11px;font-weight:600;line-height:15px;white-space:nowrap}
.tl h3 b{color:#1f2329;font-size:11.5px;font-weight:700;font-variant-numeric:tabular-nums}
.ch{position:relative;min-width:0;min-height:0;border-radius:6px}
.ch svg{position:absolute;inset:0;display:block;width:100%;height:100%;overflow:visible}
.r{display:flex;gap:6px;min-width:0;min-height:0}
.r .ch{flex:1}
.lg{flex:none;display:flex;flex-direction:column;justify-content:center;gap:2px;margin:0;padding:0;list-style:none;color:#475467;font-size:11px;line-height:14px;white-space:nowrap}
.lg i{display:inline-block;width:7px;height:7px;margin-right:3px;border-radius:2px;background:var(--c);vertical-align:1px}
.lg .x{display:none}
.m{cursor:pointer;transform-box:fill-box;transform-origin:center;animation:pop .3s cubic-bezier(.2,.9,.3,1.3) both;animation-delay:calc(var(--i,0)*var(--g,10ms))}
.m.act{stroke:#1f2329;stroke-width:1.2}
.l0{fill:#eceef2}.l1{fill:#b8ebd0}.l2{fill:#5fce9a}.l3{fill:#16a36e}.l4{fill:#0b7a50}
@keyframes pop{from{opacity:0;transform:scale(.3)}
}
.tk{fill:none;stroke:#eceef2}
.arc{fill:none;stroke:var(--c);stroke-linecap:round;stroke-dasharray:var(--v) 100;transform:rotate(-90deg);transform-origin:32px 32px;animation:arc .85s cubic-bezier(.2,.7,.2,1) both;animation-delay:calc(var(--i,0)*80ms);cursor:pointer}
.arc.act{filter:brightness(.82)}
@keyframes arc{from{stroke-dasharray:0 100}
}
.num{fill:#1f2329;font-size:19px;font-weight:700;text-anchor:middle;dominant-baseline:central;font-variant-numeric:tabular-nums}
.bars{display:flex;flex-direction:column;justify-content:center;gap:5px;height:100%}
.sg{display:flex;gap:2px;height:13px}
.sg i{flex:var(--v);min-width:0;background:var(--c);transform-origin:0 50%;cursor:pointer;animation:gw .55s cubic-bezier(.2,.7,.2,1) both;animation-delay:calc(var(--i)*90ms)}
.sg i:first-child{border-radius:4px 0 0 4px}
.sg i:last-child{border-radius:0 4px 4px 0}
.sg i.act{box-shadow:0 0 0 1.5px #1f2329}
@keyframes gw{from{opacity:0;transform:scaleX(0)}
}
.lg.h{flex-direction:row;justify-content:space-between;gap:4px}
.tip{position:absolute;left:0;top:0;z-index:5;padding:2px 7px;border-radius:6px;background:#1f2329;color:#fff;font-size:11.5px;line-height:18px;white-space:nowrap;pointer-events:none;font-variant-numeric:tabular-nums}
@container (min-width:560px){.dash{gap:7px;padding:9px 12px}
.tl{padding:7px 10px 8px;gap:4px}
.tl h3{font-size:12px;line-height:17px}
.tl h3 b{font-size:13px}
.lg{gap:4px;font-size:12px;line-height:16px}
.lg .x{display:inline}
.sg{height:18px}
.bars{gap:9px}
}
@media (prefers-reduced-motion:reduce){.m,.arc,.sg i{animation:none}
}
</style>

<div class="st"><div class="dash"><section class="tl"><h3>活跃<b class="days"></b></h3><div class="ch c1" tabindex="0" role="group" data-y="7"></div></section><section class="tl"><h3>昨晚睡眠</h3><div class="ch c2" tabindex="0" role="group" aria-label="昨晚睡眠评分 84 分，时长 7 小时 12 分"></div></section><section class="tl"><h3>今日营养</h3><div class="r"><div class="ch c3" tabindex="0" role="group"></div><ul class="lg ln"></ul></div></section><section class="tl w"><h3>本周运动<b>5 小时 40 分</b></h3><div class="ch c4" tabindex="0" role="group"></div></section><section class="tl w"><h3>喝水打卡<b>近 16 周</b></h3><div class="ch c5" tabindex="0" role="group" data-x="7"></div></section></div><div class="tip" role="status" hidden></div></div>

<script type="module">
export default function demo(root) {
  const st = root.querySelector('.st'), dash = root.querySelector('.dash'), tip = root.querySelector('.tip'), $ = (s) => root.querySelector(s);
  const NUT = [['碳水', 182, 250, '#f59f00'], ['蛋白质', 62, 80, '#3b5bdb'], ['脂肪', 41, 60, '#d6336c']], SPORT = [['跑步', 150, '#16a36e'], ['力量', 100, '#3b5bdb'], ['骑行', 90, '#f59f00']];
  const MIN = [32, 0, 45, 61, 0, 28, 74, 0, 35, 40, 66, 0, 0, 52, 30, 18, 0, 85, 47, 0, 33, 62, 58, 0, 25, 41, 0, 70, 36, 0, 54];
  const lv = (m) => (m ? (m < 30 ? 1 : m < 60 ? 2 : 3) : 0);
  // 日历：10 月 1 日是周四，周一开头空 3 格
  $('.c1').innerHTML = `<svg viewBox="0 0 98 70" aria-hidden="true">${MIN.map((m, i) => { const k = i + 3; return `<circle class="m l${lv(m)}" style="--i:${i}" cx="${(k % 7) * 14 + 7}" cy="${Math.floor(k / 7) * 14 + 7}" r="5.6" data-t="10 月 ${i + 1} 日 · ${m ? `活动 ${m} 分钟` : '没有活动'}"/>`; }).join('')}</svg>`;
  $('.days').textContent = MIN.filter(Boolean).length + ' 天';
  $('.c1').setAttribute('aria-label', `十月日历，活跃 ${MIN.filter(Boolean).length} 天，方向键查看每天的活动时长`);
  $('.c2').innerHTML = '<svg viewBox="0 0 64 64" aria-hidden="true"><circle class="tk" cx="32" cy="32" r="26" stroke-width="7" data-t="睡眠 84 分 · 7 小时 12 分"/><circle class="arc" style="--c:#7a5af8;--v:84" pathLength="100" cx="32" cy="32" r="26" stroke-width="7" data-t="睡眠 84 分 · 7 小时 12 分"/><text class="num" x="32" y="32">84</text></svg>';
  $('.c3').innerHTML = `<svg viewBox="0 0 64 64" aria-hidden="true">${NUT.map(([n, v, g, c], i) => { const r = 28 - i * 8, t = `${n} ${v} / ${g} 克`; return `<circle class="tk" cx="32" cy="32" r="${r}" stroke-width="6" data-t="${t}"/><circle class="arc" style="--c:${c};--v:${Math.round(v / g * 100)};--i:${i}" pathLength="100" cx="32" cy="32" r="${r}" stroke-width="6" data-t="${t}"/>`; }).join('')}</svg>`;
  $('.c3').setAttribute('aria-label', '今日营养：' + NUT.map(([n, v, g]) => `${n} ${v} / ${g} 克`).join('，'));
  $('.ln').innerHTML = NUT.map(([n, , , c]) => `<li style="--c:${c}"><i></i>${n[0]}<span class="x">${n.slice(1)}</span></li>`).join('');
  const total = SPORT.reduce((a, s) => a + s[1], 0);
  $('.c4').innerHTML = `<div class="bars"><div class="sg">${SPORT.map(([n, m, c], i) => `<i style="--v:${m};--c:${c};--i:${i}" data-t="${n} ${m} 分钟 · ${Math.round(m / total * 100)}%"></i>`).join('')}</div><ul class="lg h">${SPORT.map(([n, m, c]) => `<li style="--c:${c}"><i></i>${n}</li>`).join('')}</ul></div>`;
  $('.c4').setAttribute('aria-label', '本周运动：' + SPORT.map(([n, m]) => `${n} ${m} 分钟`).join('，'));
  // 打卡格：今天周六，按列排，最后一列少周日一格
  let s = 7, cells = '';
  for (let i = 0; i < 111; i++) {
    s = (s * 31 + 17) % 97; const cups = i % 7 === 3 && s < 30 ? 0 : 2 + s % 7, day = new Date(2026, 9, 31 - (110 - i));
    cells += `<rect class="m l${cups ? (cups < 4 ? 1 : cups < 6 ? 2 : cups < 8 ? 3 : 4) : 0}" style="--i:${Math.floor(i / 7)};--g:32ms" x="${Math.floor(i / 7) * 10 + 1}" y="${i % 7 * 10 + 1}" width="8" height="8" rx="2" data-t="${day.getMonth() + 1} 月 ${day.getDate()} 日 · ${cups} 杯"/>`;
  }
  $('.c5').innerHTML = `<svg viewBox="0 0 160 70" aria-hidden="true">${cells}</svg>`;
  $('.c5').setAttribute('aria-label', '近 16 周喝水打卡格，方向键查看每天的杯数');
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  let cur = null, auto = true;
  const show = (m) => {
    if (cur === m) return; cur?.classList.remove('act'); cur = m; m.classList.add('act'); tip.hidden = false; tip.textContent = m.dataset.t;
    const r = m.getBoundingClientRect(), b = st.getBoundingClientRect(), c = m.closest('.ch').getBoundingClientRect(), w = tip.offsetWidth, h = tip.offsetHeight;
    // 提示层不压卡片标题：先试图形上方，放不下放图形下方，再不行贴图形区底边
    const above = r.top - h - 4, below = r.bottom + 4, y = above >= c.top ? above : below + h <= c.bottom ? below : c.bottom - h - 2;
    tip.style.transform = `translate(${clamp(r.left - b.left + r.width / 2 - w / 2, 3, b.width - w - 3)}px,${y - b.top}px)`;
  };
  const hide = () => { cur?.classList.remove('act'); cur = null; tip.hidden = true; };
  const hover = (e) => { auto = false; const m = e.target.closest?.('[data-t]:not(.tk)') ?? e.target.closest?.('.tk'); if (m) show(m.classList.contains('tk') ? m.nextElementSibling : m); else if (e.pointerType === 'mouse' && !dash.contains(root.activeElement)) hide(); };
  dash.addEventListener('pointermove', hover); dash.addEventListener('pointerdown', hover);
  dash.addEventListener('pointerleave', () => { if (!dash.contains(root.activeElement)) hide(); });
  // 每张图只占一个 Tab 位，图内用方向键走
  root.querySelectorAll('.ch').forEach((ch) => {
    const ms = [...ch.querySelectorAll('[data-t]:not(.tk)')], X = +ch.dataset.x || 1, Y = +ch.dataset.y || 1; let i = ms.length - 1;
    ch.addEventListener('focus', () => { auto = false; show(ms[i]); }); ch.addEventListener('blur', hide);
    ch.addEventListener('keydown', (e) => {
      const d = { ArrowLeft: -X, ArrowRight: X, ArrowUp: -Y, ArrowDown: Y }[e.key];
      if (e.key === 'Escape') return hide(); if (!d) return; e.preventDefault(); i = clamp(i + d, 0, ms.length - 1); show(ms[i]);
    });
  });
  setTimeout(() => { if (auto && root.host.isConnected) show(root.querySelectorAll('.c5 rect')[79]); }, 1000);
}
</script>
