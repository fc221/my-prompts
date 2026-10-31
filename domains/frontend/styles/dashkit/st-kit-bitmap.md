---
zh: 位图风后台
en: Bitmap dashboard kit
aka: 点阵后台 点阵数字 打印机风 dot matrix bitmap dashboard
order: 30
---

## 是什么

把后台做成一张点阵打印的单子：纸色或单色底、圆点拼成的数字和柱状图，一点橙色，动效按帧跳动。

## 适合

开发者工具、物流和仓储看板、硬件设备的状态页、有复古计算机气质的品牌：关键数字少，允许带点机器味。

## 不适合

中文长文和密集表格；点阵只用在大数字、图表和英文短标签上，正文保持系统字体。想要 8 位游戏味用「复古像素」，想要平滑的数字变化用「数字滚动计数」。

## 注意

点阵要落在整数格上：数字和图表各用一套固定点距，放大按整数倍走，否则点会糊、会不齐。未亮的底点要比亮点小且浅，否则数字读不出来。动效全部按帧切换，一旦平滑过渡就没有机器感了。

## 要点

- 底座：纸色 #efe9dc、墨色 #1e1b16、橙 #f2590c；橙只给最新一位数字、当前柱和光标，当文字用时加深到 #b03f05
- 字体：品牌和标签用系统等宽粗体；大数字用 5×7 字模画成圆点，放在 SVG 里；中文用系统字体，12px 起
- 线条：2px 实线或点线，0 圆角，按钮 2px 硬投影；网点用 radial-gradient 平铺，点距 5px
- 点阵数字：每位 35 个点，底点半径 0.2 格、亮点 0.42 格；更新时每位每 60ms 换一个数，个位先停，每往高一位晚 130ms
- 点阵柱：一根柱拆成 8 个圆点，从左到右、从下到上依次硬切亮起（列差 60ms、行差 34ms）；悬停或聚焦一列变橙，顶部读出当天数值
- 碎格换页：旧页面切成 8–12px 方格，按随机顺序在 300ms 内逐格消失，新页面在下方已就位
- 悬停加网：悬停时点距从 5px 跳到 3px，硬切，像多压了一层墨
- 方块光标出字：方块光标 7×13px，每字 34ms 打出，打完 1s 一闪；打字文本对读屏隐藏，用 role="status" 一次报完整句
- 逐格进度：进度条切成 20 格按帧点亮，满格后用 3 帧变成像素对勾
- 减少动态效果：数字直接定格，圆点一次亮起，摘要直接显示，光标常亮

## 提示词

把{产品}的{后台页面}做成位图风后台，像一张点阵打印的数据单。

风格底座：纸色 #efe9dc、墨色 #1e1b16、橙 #f2590c，橙只给最新一位数字、当前柱和光标；品牌和标签用系统等宽粗体，中文用系统字体；大数字用 5×7 字模在 SVG 里画成圆点，底点半径 0.2 格、亮点 0.42 格；线条 2px，0 圆角，按钮 2px 硬投影；动效全部按帧硬切；窄屏点阵按整数倍缩小，图表放到数字下方。

从下面挑要用的交互，没挑的不做：
1. 方块光标出字：方块光标每字 34ms 打出一句摘要，打完 1s 一闪，读屏只播报一次完整句。
2. 逐格进度：进度条切成 20 格按帧点亮，满格后用 3 帧变成像素对勾。
3. 点阵柱状图：每根柱拆成 8 个圆点，从左到右、从下到上依次硬切亮起，列差 60ms、行差 34ms，悬停或聚焦一列时变橙并在顶部读出数值。
4. 逐位翻数：数字更新时每位每 60ms 换一个数，个位最先停，每往高一位晚 130ms。
5. 悬停加网：悬停时网点点距从 5px 硬切到 3px。
6. 碎格换页：切页时旧页面切成 10px 方格，按随机顺序在 300ms 内逐格消失。

减少动态效果时，数字直接定格，圆点一次亮起，摘要直接显示，光标常亮。

## 示例

<style>
:host{container-type:size}
.w{--paper:#efe9dc;--ink:#1e1b16;--soft:#5a5346;--dim:#d8d0bf;--orange:#f2590c;--mono:ui-monospace,"SF Mono",Menlo,monospace;position:relative;height:100%;overflow:hidden;display:flex;flex-direction:column;gap:8px;padding:9px 12px 10px;background:var(--paper);color:var(--ink);font:11px/1.45 var(--mono),"PingFang SC",sans-serif}
.top{display:flex;align-items:center;gap:10px}
.logo{display:flex;align-items:center;gap:6px;font-size:13px;font-weight:800}
.logo i{width:10px;height:10px;background:conic-gradient(var(--orange) 25%,var(--ink) 0 50%,var(--orange) 0 75%,var(--ink) 0)}
.tabs,.note{display:none}
.go{margin-left:auto;height:22px;padding:0 9px;border:2px solid var(--ink);border-radius:0;background:var(--paper);color:var(--ink);font:700 11px/1 var(--mono),"PingFang SC",sans-serif;box-shadow:2px 2px 0 var(--ink);cursor:pointer}
.go:hover{background:var(--ink);color:var(--paper)}
.go:active{transform:translate(2px,2px);box-shadow:none}
.go:focus-visible,.col:focus-visible{outline:2px solid var(--orange);outline-offset:2px}
.mid{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,1fr) 92px;gap:12px}
.hero{position:relative;min-width:0;display:flex;flex-direction:column;justify-content:center;gap:4px;padding:0 0 0 10px;border-left:4px solid var(--ink)}
.hero small,.chart small{font-size:11px;color:var(--soft)}
.dots{display:block;width:100%;height:auto;max-height:100%}
.off{fill:var(--dim)}
.lit{fill:var(--ink)}
.lit.last{fill:var(--orange)}
.chart{min-width:0;display:flex;flex-direction:column;gap:3px}
.chart small{white-space:nowrap}
.chart small b{color:var(--ink)}
.cols{flex:1;min-height:0;display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:2px}
.col{display:flex;flex-direction:column-reverse;justify-content:space-between;align-items:center;min-height:0;padding:0;border:0;background:none;cursor:pointer}
.col i{width:100%;max-width:9px;aspect-ratio:1;border-radius:50%;background:var(--dim)}
.col i.on{background:var(--ink);transition:background-color 0s var(--t,0ms)}
.col:hover i.on,.col:focus-visible i.on,.col.cur i.on{background:var(--orange)}
.sum{margin:0;min-height:32px;font-size:11.5px;line-height:16px}
.cur-b{display:inline-block;width:7px;height:13px;margin-left:2px;background:var(--orange);vertical-align:-2px;animation:blink 1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.sr{position:absolute;width:1px;height:1px;margin:0;overflow:hidden;clip-path:inset(50%)}
@container (min-width:520px){
.w{gap:12px;padding:14px 20px 14px;font-size:12px}
.logo{font-size:15px}
.tabs{display:flex;gap:2px;margin-left:8px}
.tabs span{padding:2px 8px}
.tabs .on{background:var(--ink);color:var(--paper)}
.go{height:26px;padding:0 12px;font-size:12px}
.mid{grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:24px}
.hero{justify-content:space-between;padding-left:16px}
.hero::after{content:"";position:absolute;right:0;top:2px;width:96px;height:16px;background:radial-gradient(circle,var(--ink) 1px,transparent 1.2px) 0 0/5px 5px}
.hero:hover::after{background-size:3px 3px}
.hero small,.chart small{font-size:12px}
.hero .note{display:block}
.note b{color:#b03f05}
.col i{max-width:14px}
.cols{gap:6px}
.sum{min-height:20px;font-size:13px;line-height:20px;padding-top:8px;border-top:2px dotted var(--ink)}
}
@media (prefers-reduced-motion:reduce){
.cur-b{animation:none}
.col i.on{transition:none}
}
</style>

<div class="w">
  <header class="top">
    <b class="logo"><i></i>MyPrompts</b>
    <div class="tabs"><span class="on">今日</span><span>本周</span><span>本月</span></div>
    <button type="button" class="go">刷新</button>
  </header>
  <div class="mid">
    <section class="hero">
      <small>今日订单</small>
      <svg class="dots" viewBox="0 0 30 7" role="img"></svg>
      <small class="note">较昨日 <b>+6.2%</b> · 客单价 ¥86</small>
    </section>
    <section class="chart">
      <small class="read"></small>
      <div class="cols"></div>
    </section>
  </div>
  <p class="sum" aria-hidden="true"><span class="typed"></span><i class="cur-b"></i></p>
  <p class="sr" role="status"></p>
</div>

<script type="module">
export default function demo(root) {
  // 5×7 点阵字模：每个数字 7 行，每行 5 位
  const FONT = [
    [14, 17, 19, 21, 25, 17, 14], [4, 12, 4, 4, 4, 4, 14], [14, 17, 1, 2, 4, 8, 31], [31, 2, 4, 2, 1, 17, 14], [2, 6, 10, 18, 31, 2, 2],
    [31, 16, 30, 1, 1, 17, 14], [6, 8, 16, 30, 17, 17, 14], [31, 1, 2, 4, 8, 8, 8], [14, 17, 17, 14, 17, 17, 14], [14, 17, 17, 15, 1, 2, 12],
  ];
  const DAYS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const SETS = [
    { n: '48216', v: [290, 366, 512, 447, 630, 708, 541], text: '周六到达峰值，华南仓发货比昨天快 11 分钟。' },
    { n: '51390', v: [352, 281, 463, 621, 540, 702, 688], text: '午高峰提前到 11 点，客服排班已经顺延。' },
    { n: '46078', v: [447, 530, 361, 372, 548, 619, 455], text: '退货率回落到 2.3%，周末备货可以减一成。' },
  ];
  const ROWS = 8, UNIT = 90;
  const svg = root.querySelector('.dots'), cols = root.querySelector('.cols'), read = root.querySelector('.read');
  const typed = root.querySelector('.typed'), say = root.querySelector('.sr');
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const spot = (x, y, r = 0.42) => `M${x + 0.5 - r} ${y + 0.5}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;
  const originX = (i) => i * 6 + (i >= 2 ? 1 : 0);
  let set = 0, typing = 0, today = 5, run = 0;

  let bed = '';
  for (let i = 0; i < 5; i++) for (let y = 0; y < 7; y++) for (let x = 0; x < 5; x++) bed += spot(originX(i) + x, y, 0.2);
  svg.innerHTML = `<path class="off" d="${bed}"/>` + [0, 1, 2, 3, 4].map((i) => `<path class="lit${i === 4 ? ' last' : ''}"/>`).join('');
  const lit = [...svg.querySelectorAll('.lit')];
  const paint = (i, d) => {
    let p = '';
    FONT[d].forEach((row, y) => {
      for (let x = 0; x < 5; x++) if (row & (16 >> x)) p += spot(originX(i) + x, y);
    });
    lit[i].setAttribute('d', p);
  };

  cols.innerHTML = DAYS.map((_, c) => `<button type="button" class="col" data-c="${c}">${'<i></i>'.repeat(ROWS)}</button>`).join('');
  const columns = [...cols.children];
  const show = (c) => {
    today = c;
    columns.forEach((b, j) => b.classList.toggle('cur', j === c));
    read.innerHTML = `${DAYS[c]} <b>${SETS[set].v[c]}</b>`;
  };

  // 个位最先停，每往高一位晚 130ms
  function roll(value) {
    const id = ++run, start = performance.now();
    const stop = (i) => 340 + (4 - i) * 130;
    const tick = (now) => {
      if (id !== run || !root.host.isConnected) return;
      const t = Math.max(0, now - start), frame = Math.floor(t / 60);
      lit.forEach((_, i) => paint(i, t < stop(i) ? (frame + i * 3) % 10 : +value[i]));
      if (t < stop(0)) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function light(values) {
    columns.forEach((b, c) => {
      b.setAttribute('aria-label', `${DAYS[c]} ${values[c]} 单`);
      [...b.children].forEach((dot) => dot.classList.remove('on'));
    });
    void cols.offsetWidth;
    columns.forEach((b, c) => {
      [...b.children].forEach((dot, r) => {
        dot.style.setProperty('--t', calm ? '0ms' : c * 60 + r * 34 + 'ms');
        dot.classList.toggle('on', r < Math.round(values[c] / UNIT));
      });
    });
  }

  function type(text) {
    clearInterval(typing);
    if (calm) return void (typed.textContent = text);
    let i = 0;
    typed.textContent = '';
    typing = setInterval(() => {
      typed.textContent = text.slice(0, ++i);
      if (i >= text.length || !root.host.isConnected) clearInterval(typing);
    }, 34);
  }

  function refresh() {
    const s = SETS[set];
    svg.setAttribute('aria-label', '今日订单 ' + s.n);
    say.textContent = `今日订单 ${s.n}。${s.text}`;
    show(today);
    light(s.v);
    type(s.text);
    if (calm) [...s.n].forEach((d, i) => paint(i, +d));
    else roll(s.n);
  }

  root.querySelector('.go').addEventListener('click', () => {
    set = (set + 1) % SETS.length;
    refresh();
  });
  const pick = (e) => {
    const b = e.target.closest('.col');
    if (b) show(+b.dataset.c);
  };
  cols.addEventListener('mouseover', pick);
  cols.addEventListener('focusin', pick);
  cols.addEventListener('click', pick);
  refresh();
}
</script>
