---
zh: 横滑日期带
en: Date strip
aka: 日期横滑 周历条 日期滑动条 排期日期
of: c-date
tab: 横滑日期带
order: 70
---

## 是什么

手机页面上方一条横向滑动的日期，下面是当天内容，日期和内容同屏；点日期或左右滑内容都能换天，选中态跟着走，今天有标记。

## 适合

课表、排班、赛程、影院场次、预约时段：按天看内容，大多数时候看今天前后几天。

## 不适合

跨月挑任意日期用「日期与时间选择」；按时段看报表用「范围快捷选项」；要看一整月的分布用「日历视图」。

## 注意

滑日期带只是翻看，点了才换内容；左右滑内容会换天，选中项自动滚到日期带中间。两个滚动区要等停下来再同步，程序滚动途中读到的位置不算数。

## 要点

- 组件库没有现成的横滑日期带，在标签页的基础上做：Element Plus el-tabs（el-tab-pane 的 label 插槽放两行，标签多时自带左右滚动），Naive UI n-tabs（n-tab-pane 的 tab 插槽，center-active-tab 让选中项滚到中间），Ant Design Vue a-tabs（a-tab-pane 的 tab 插槽，溢出可滚动，留意溢出的标签会折进 moreIcon 菜单）；一天一个标签，当天内容放对应面板；tablist 角色和左右方向键换天 Element Plus、Ant Design Vue 自带，Naive UI 没有，要自己给标签补 role="tab" 和键盘
- 自己补的只有：两行格子（上面周几、下面日期）、今天把“周几”换成“今天”并加小圆点、顶部月份跟着选中项变、离开今天后出现“回今天”、没有内容的日子数字变灰但可以点（不用 disabled），点开说明原因（“周一休馆”）
- 一屏 6–7 个格子，右边露出半个提示还能滑；选中项滚到日期带中间，只滚动日期带自己（Element Plus 用 tab-nav 的 scrollToActiveTab，Ant Design Vue 自己 scrollIntoView）
- 滑日期带只是翻看，点了才换内容；内容区要左右滑换天的话组件做不到，自己用 scroll-snap 一天一页，约 120ms 没有滚动再更新选中，程序滚动途中读到的位置不算数
- 选中态的滑动和面板切换动画用组件默认

## 提示词

给{课程预约页}顶部加横滑日期带：在项目组件库的标签页上做（Element Plus el-tabs，label 插槽；Naive UI n-tabs center-active-tab，tab 插槽；Ant Design Vue a-tabs，tab 插槽），不从零写日期带（Naive UI 要自己补 tablist 角色和左右方向键）。从今天前 {天数} 天排到后 {天数} 天，一天一个标签，标签两行：上面周几、下面日期，今天写“今天”并加小圆点；一屏 6–7 个，右边露出半个；选中项滚到日期带中间，只滚动日期带自己；下面是当天{课程列表}，放在对应面板里；顶部月份随选中项变化；离开今天时显示“回今天”；没有内容的日子数字变灰但可以点，点开说明原因；{要 / 不要}内容区左右滑换天，要的话用 scroll-snap 一天一页，等滚动停下约 120ms 再更新选中。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.s{padding:0;background:#eef0f4;font-size:12px;line-height:18px}
.w{display:flex;flex-direction:column;width:100%;max-width:390px;height:100%;background:#fff}
.hd{flex:none;display:flex;align-items:center;justify-content:space-between;height:32px;padding:0 12px}
.hd b{font-size:13px;font-weight:600}
.bk{height:24px;padding:0 8px;border:0;border-radius:999px;background:#edf1ff;color:#3b5bdb;font-size:12px;cursor:pointer}
.tr{position:relative;flex:none;display:flex;gap:2px;padding:0 8px 6px;overflow-x:auto;scrollbar-width:none;overscroll-behavior-x:contain;border-bottom:1px solid #eceef1}
.tr::-webkit-scrollbar{display:none}
.pl{position:absolute;left:0;top:0;width:44px;height:50px;border-radius:10px;background:#3b5bdb;transition:transform .22s cubic-bezier(.3,.7,.2,1)}
.dy{position:relative;flex:none;display:flex;flex-direction:column;align-items:center;justify-content:center;width:44px;height:50px;padding:0;border:0;border-radius:10px;background:none;color:#1f2329;cursor:pointer;transition:color .16s}
.dy small{font-size:11px;line-height:15px;color:#5b616e;transition:color .16s}
.dy b{font-size:16px;line-height:20px;font-weight:600;font-variant-numeric:tabular-nums}
.dy i{position:absolute;bottom:4px;width:4px;height:4px;border-radius:50%;background:#3b5bdb}
.dy.rest b{color:#8a909c;font-weight:400}
.dy[aria-selected=true]{color:#fff}
.dy[aria-selected=true] b{color:#fff}
.dy[aria-selected=true] small{color:#dfe6ff}
.dy[aria-selected=true] i{background:#fff}
.dy:focus-visible{outline-offset:-2px}
.pg{flex:1;min-height:0;display:flex;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory;scrollbar-width:none}
.pg::-webkit-scrollbar{display:none}
.pn{flex:none;width:100%;min-height:0;overflow-y:auto;padding:6px 12px;scroll-snap-align:start;scroll-snap-stop:always}
.it{display:grid;grid-template-columns:44px minmax(0,1fr) auto;align-items:center;gap:6px;height:32px;border-bottom:1px solid #f0f1f4}
.it:last-child{border-bottom:0}
.it time{color:#5b616e;font-variant-numeric:tabular-nums}
.it span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.it em{font-style:normal;font-size:11px;color:#5b616e;white-space:nowrap}
.it em.few{color:#b54708}
.no{display:grid;place-items:center;height:100%;min-height:44px;color:#5b616e}
@container (min-height:260px){.hd{height:40px}
.pn{padding:8px 12px}
.it{height:40px}
}
@media (prefers-reduced-motion:reduce){.pl,.dy,.dy small{transition:none}
}
</style>

<div class="s"><div class="w"><div class="hd"><b class="mo" aria-live="polite"></b><button type="button" class="bk" hidden>回今天</button></div><div class="tr" role="tablist" aria-label="选择日期"><span class="pl" aria-hidden="true"></span></div><div class="pg" data-clip></div></div></div>

<script type="module">
export default function demo(root) {
  // 今天是第 3 项（下标 2），日期带前面留两天，往后排到下个月
  const DAY = 864e5, BASE = Date.UTC(2026, 4, 26), TODAY = 2, N = 14, WEEK = '日一二三四五六';
  const dates = Array.from({ length: N }, (_, i) => new Date(BASE + i * DAY));
  const CLS = [['07:30', '晨间流瑜伽', '余 6'], ['12:10', '午休拉伸', '余 2'], ['18:30', '普拉提', '已满'], ['19:45', '阴瑜伽', '余 9'], ['20:30', '冥想放松', '余 4']];
  const list = (i) => (dates[i].getUTCDay() === 1 ? [] : CLS.filter((_, k) => (k + i) % 4 !== 0));
  const $ = (q) => root.querySelector(q), tr = $('.tr'), pg = $('.pg'), pl = $('.pl'), mo = $('.mo'), bk = $('.bk');
  const smooth = () => (matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth');
  let cur = -1;

  tr.insertAdjacentHTML('beforeend', dates.map((d, i) => `<button type="button" class="dy${list(i).length ? '' : ' rest'}" role="tab" id="t${i}" aria-controls="p${i}" aria-selected="false" tabindex="-1" aria-label="${d.getUTCMonth() + 1} 月 ${d.getUTCDate()} 日 周${WEEK[d.getUTCDay()]}${i === TODAY ? '，今天' : ''}，${list(i).length ? `${list(i).length} 节课` : '休馆'}"><small>${i === TODAY ? '今天' : '周' + WEEK[d.getUTCDay()]}</small><b>${d.getUTCDate()}</b>${i === TODAY ? '<i></i>' : ''}</button>`).join(''));
  pg.innerHTML = dates.map((_, i) => `<div class="pn" id="p${i}" role="tabpanel" aria-labelledby="t${i}">${list(i).length ? list(i).map(([t, n, r]) => `<div class="it"><time>${t}</time><span>${n}</span><em class="${r === '余 2' || r === '已满' ? 'few' : ''}">${r}</em></div>`).join('') : '<div class="no">周一休馆</div>'}</div>`).join('');
  const days = [...tr.querySelectorAll('.dy')];

  const select = (i, from) => {
    if (i === cur) return; cur = i;
    days.forEach((b, k) => { b.setAttribute('aria-selected', String(k === i)); b.tabIndex = k === i ? 0 : -1; });
    const b = days[i], how = from === 'init' ? 'auto' : smooth();
    pl.style.transform = `translate(${b.offsetLeft}px,${b.offsetTop}px)`;
    // 选中项停在日期带中间；只滚动日期带自己
    tr.scrollTo({ left: b.offsetLeft - (tr.clientWidth - b.offsetWidth) / 2, behavior: how });
    if (from !== 'swipe') pg.scrollTo({ left: i * pg.clientWidth, behavior: how });
    mo.textContent = `${dates[i].getUTCFullYear()} 年 ${dates[i].getUTCMonth() + 1} 月`;
    bk.hidden = i === TODAY;
  };
  days.forEach((b, i) => b.addEventListener('click', () => select(i, 'tap')));
  tr.addEventListener('keydown', (e) => {
    const m = { ArrowRight: cur + 1, ArrowLeft: cur - 1, Home: 0, End: N - 1 }[e.key]; if (m === undefined) return;
    e.preventDefault(); select(Math.max(0, Math.min(N - 1, m)), 'tap'); days[cur].focus();
  });
  bk.addEventListener('click', () => { select(TODAY, 'tap'); days[TODAY].focus(); });
  // 内容左右滑到哪天，日期带的选中态就跟到哪天
  let idle = 0;
  pg.addEventListener('scroll', () => { clearTimeout(idle); idle = setTimeout(() => { if (root.host.isConnected && pg.clientWidth) select(Math.round(pg.scrollLeft / pg.clientWidth), 'swipe'); }, 120); });
  select(TODAY, 'init');
}
</script>
