---
zh: 量得出的版面
en: Measurable layout
order: 40
---

## 是什么

说不清一屏“平庸”在哪时，用五个能从页面上量出来的数判断构图：主体占比、主次比、等大并排、分栏比、留白。先量、再按目标改、改完再量。示例里切换“普通”和“调整后”两版，数值从页面实时算出。

## 适合

官网首屏、落地页、App 首页、作品集这类靠构图取胜的一屏；评审时把“没感觉”变成具体的改法。

## 不适合

后台表格、表单、设置页：这类页面就该整齐重复，等大并排和平均分栏正是对的。官网首屏下方的内容区块也照常用栅格跨度（6 + 6、4 + 4 + 4、三列卡片），这五个数只量首屏主视觉。

## 要点

- 主体占比：最大的一块占画面 ≥ 35%，一屏只有一个主角。
- 主次比：最大一块是第二大的 2 倍以上；几块差不多大，眼睛就不知道先看哪。
- 等大并排：首屏主视觉里同一排同样大小的块不超过 2 个；首屏三张一样的卡片并排是最常见的模板感来源。下方区块的 4 + 4 + 4、三列卡片不在此限。
- 分栏比：首屏主视觉左右两栏约 1.6 : 1 到 3 : 1，不做 1 : 1 平分；官网区块的 6 + 6 不算在内。
- 留白：没被占用的面积 ≥ 45%，一屏 6 块左右；东西多时先删减或挪到下一屏。
- 量不出来但同样有效：主要内容用 2–3 条对齐线代替一条中轴；文字或卡片压住图片边缘 16–40px，前后靠明度差区分。
- 先改尺寸、比例和数量，再动颜色和装饰；1440 和 390 宽各量一次，窄屏单列时只看主体占比和留白。
- 构图从「首屏不对称 / 满版图」「App 首页」里挑，这条负责验收；页面同时像模板时配合「去掉页面模板感」。

## 提示词

{页面或区块}看起来平庸、没有重点。请先量后改：
1. 量现状：在 1440 宽首屏统计五个数，列成表——主体占比（最大的一块占首屏面积）、主次比（最大一块 ÷ 第二大）、等大并排（同一排同样大小的块最多几个）、分栏比（宽栏 ÷ 窄栏）、留白（未被占用的面积占比）。
2. 按目标改：主体占比 ≥ 35%；主次比 ≥ 2；等大并排 ≤ 2；分栏比 1.6–3；留白 ≥ 45%、一屏约 6 块。优先调整尺寸、比例和数量，次要内容可以删掉或挪到下一屏。这五个数只针对首屏主视觉构图，下方区块的 6 + 6、4 + 4 + 4 和三列卡片照常。
3. 加一处层次：文字或卡片压住主图边缘约 24px；主要内容用 2–3 条对齐线，错开的距离全页取同一个值。
4. 改完重新量，给出“改前 → 改后”对照表；390 宽单列时只核对主体占比和留白。
保留{必须保留的内容}；颜色和字体这一轮保持原样。

## 示例

<style>
.s{height:100%;display:grid;grid-template-rows:auto minmax(0,1fr);gap:8px;padding:10px 12px;background:#f5f6f8;color:#1f2329;font:12px/1.35 system-ui,"PingFang SC",sans-serif}
.hd{display:flex;align-items:center;justify-content:space-between;gap:8px}
.sg{display:flex;gap:2px;padding:2px;border-radius:8px;background:#e6e9ef}
.sg button{height:24px;padding:0 10px;border:0;border-radius:6px;background:none;color:#475467;font:inherit;cursor:pointer}
.sg button[aria-pressed="true"]{background:#fff;color:#1f2329;font-weight:600;box-shadow:0 1px 2px rgba(16,24,40,.12)}
.sg button:focus-visible{outline:2px solid #3a5ccc;outline-offset:2px}
.sum{font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap}
.bd{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:10px;min-height:0}
/* 画面：各块按百分比定位，两版只换位置和大小，数值从实际尺寸算 */
.st{position:relative;min-height:0;border-radius:8px;background:#fff;box-shadow:inset 0 0 0 1px #e3e6eb;overflow:hidden}
.k{position:absolute;border-radius:3px}
.img{background:linear-gradient(140deg,#a9bdf0,#4d68c9 70%,#2f4590)}
.h{background:#1f2329}
.p,.p2{background:#c4c9d2}
.b{border-radius:99px;background:#3a5ccc}
.c1,.c2,.c3{background:#e6e9ef}
.plain .h{left:6%;top:6%;width:42%;height:10%}
.plain .p{left:6%;top:20%;width:42%;height:6%}
.plain .p2{left:6%;top:29%;width:34%;height:6%}
.plain .b{left:6%;top:39%;width:18%;height:9%}
.plain .img{left:52%;top:6%;width:42%;height:42%}
.plain .c1{left:6%;top:54%;width:28%;height:40%}
.plain .c2{left:36%;top:54%;width:28%;height:40%}
.plain .c3{left:66%;top:54%;width:28%;height:40%}
.tuned .img{left:36%;top:0;width:64%;height:60%}
.tuned .h{left:6%;top:44%;width:36%;height:12%;box-shadow:0 0 0 2px #fff}
.tuned .p{left:6%;top:62%;width:26%;height:5%}
.tuned .b{left:6%;top:72%;width:16%;height:9%}
.tuned .c1{left:44%;top:68%;width:30%;height:20%;background:#dfe4ee}
.tuned .c2{left:78%;top:68%;width:16%;height:14%}
.tuned .p2,.tuned .c3{display:none}
.m{display:grid;align-content:center;gap:4px;margin:0;padding:0;list-style:none}
.m li{display:grid;grid-template-columns:minmax(0,1fr) auto 14px;align-items:baseline;gap:6px}
.m span{color:#5b616e;white-space:nowrap}
.m b{font-variant-numeric:tabular-nums;white-space:nowrap}
.m i{font-style:normal;font-weight:700}
.m small{display:none;color:#5b616e;white-space:nowrap}
.m li[data-ok="1"] i{color:#0f7352}
.m li[data-ok="0"] i,.m li[data-ok="0"] b{color:#b42318}
@container (min-width:520px){.s{padding:14px 18px;gap:12px}
.bd{gap:18px}
.m{gap:8px}
.m li{grid-template-columns:minmax(0,1fr) auto 64px 14px}
.m small{display:block;order:3}
.m i{order:4}
}
</style>

<div class="s">
  <div class="hd">
    <div class="sg" role="group" aria-label="版面"><button type="button" data-v="plain" aria-pressed="true">普通</button><button type="button" data-v="tuned" aria-pressed="false">调整后</button></div>
    <span class="sum" role="status"></span>
  </div>
  <div class="bd">
    <div class="st plain" data-clip aria-hidden="true"><i class="k img"></i><i class="k h"></i><i class="k p"></i><i class="k p2"></i><i class="k b"></i><i class="k c1"></i><i class="k c2"></i><i class="k c3"></i></div>
    <ul class="m">
      <li data-k="main"><span>主体占比</span><b></b><small>≥ 35%</small><i></i></li>
      <li data-k="lead"><span>主次比</span><b></b><small>≥ 2 倍</small><i></i></li>
      <li data-k="same"><span>等大并排</span><b></b><small>≤ 2 个</small><i></i></li>
      <li data-k="split"><span>分栏比</span><b></b><small>1.6–3</small><i></i></li>
      <li data-k="air"><span>留白</span><b></b><small>≥ 45%</small><i></i></li>
    </ul>
  </div>
</div>

<script type="module">
const near = (a, b) => Math.abs(a - b) < 3;
// 从画面里各块的实际尺寸算五个数
function measure(st) {
  const box = st.getBoundingClientRect(), W = box.width, H = box.height;
  const ks = [...st.querySelectorAll('.k')].map((el) => ({ el, r: el.getBoundingClientRect() })).filter((k) => k.r.width > 0);
  const areas = ks.map((k) => k.r.width * k.r.height).sort((a, b) => b - a);
  let same = 1;
  for (const a of ks) same = Math.max(same, ks.filter((b) => near(a.r.top, b.r.top) && near(a.r.width, b.r.width) && near(a.r.height, b.r.height)).length);
  const img = st.querySelector('.img').getBoundingClientRect().width;
  const text = Math.max(...['.h', '.p', '.b'].map((s) => st.querySelector(s).getBoundingClientRect().width));
  // 留白：按 60 × 40 个采样点看有没有落在某一块里（块之间有重叠，不能直接把面积相加）
  let hit = 0;
  for (let i = 0; i < 60; i++) for (let j = 0; j < 40; j++) {
    const x = box.left + (i + 0.5) * W / 60, y = box.top + (j + 0.5) * H / 40;
    if (ks.some((k) => x >= k.r.left && x <= k.r.right && y >= k.r.top && y <= k.r.bottom)) hit++;
  }
  return { main: areas[0] / (W * H), lead: areas[0] / areas[1], same, split: Math.max(img, text) / Math.min(img, text), air: 1 - hit / 2400 };
}
const RULE = {
  main: [(v) => v >= 0.35, (v) => Math.round(v * 100) + '%'],
  lead: [(v) => v >= 2, (v) => v.toFixed(1) + ' 倍'],
  same: [(v) => v <= 2, (v) => v + ' 个'],
  split: [(v) => v >= 1.6 && v <= 3, (v) => v.toFixed(1) + ' : 1'],
  air: [(v) => v >= 0.45, (v) => Math.round(v * 100) + '%'],
};
export default function demo(root) {
  const st = root.querySelector('.st'), sum = root.querySelector('.sum'), btns = root.querySelectorAll('.sg button');
  const render = () => {
    const v = measure(st); let ok = 0;
    for (const li of root.querySelectorAll('.m li')) {
      const [pass, fmt] = RULE[li.dataset.k], val = v[li.dataset.k], good = pass(val);
      ok += good; li.dataset.ok = good ? '1' : '0';
      li.querySelector('b').textContent = fmt(val);
      li.querySelector('i').textContent = good ? '✓' : '✗';
    }
    sum.textContent = `达标 ${ok} / 5`;
  };
  const set = (name) => {
    st.className = 'st ' + name;
    btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === name)));
    render();
  };
  btns.forEach((b) => (b.onclick = () => set(b.dataset.v)));
  new ResizeObserver(render).observe(st);
  set('plain');
  setTimeout(() => root.host.isConnected && set('tuned'), 800);
}
</script>
