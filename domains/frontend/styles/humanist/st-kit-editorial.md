---
zh: 杂志风后台
en: Editorial dashboard kit
aka: 杂志后台 报刊后台 经营月刊 月报后台 editorial dashboard
order: 10
of: st-editorial
tab: 后台
---

## 是什么

把后台排成一期经营刊物：暖白纸、黑字配一个红、衬线大标题、细线分栏，翻页和读数都按纸质读物的手感来做。

## 适合

月报、季度复盘、给管理层或投资人看的简报、内容团队的选题看板：数据不多，每个数字都要配一句解读。

## 不适合

工单、订单这类要批量操作、频繁筛选的后台，用「数据表格」配普通后台外观更快；实时盯盘也不合适，翻页节奏太慢。字体和版式的基础规矩见「编辑杂志风」，这里只讲放进后台后怎么用。

## 注意

杂志感来自节奏：一页讲一件事，一张主图配一句结论。图注负责讲原因，原始数字仍要能在表格里查到。翻角换页是加分项，目录和方向键才是主路径。

## 要点

- 底座：纸色 #f7f2e8、墨色 #181512，唯一强调色红 #c4261d，只给当前页、选中的数据点和首字
- 骨架：报头写品牌、期号、页码，下压 2px 黑线；下面分目录、正文、图表三栏，栏间 1px 细线 #cfc6b4，版面只靠线条分区，圆角为 0
- 翻角换页：右下角 24–28px 折角，悬停放大到 1.4 倍；点击后沿 45° 折痕从右下角揭到左上角，约 640ms，下一页在折痕下露出，纸背跟着折痕走；← → 键同样翻页，翻完用 role="status" 播报页码和标题
- 数据批注线：悬停、聚焦或点按数据点，1px 红线约 280ms 从点斜拉到图注下方，再沿图注底边走完，图注晚半拍出现；图注放在离点更近且放得下的一侧，图表顶部预留 30px 给它
- 数据点：本体 8px，命中区放大到 24px；用真实 button，aria-label 写月份、数值和解读
- 首字下沉：每页导语第一个字占两行，红色衬线粗体，右侧留 4px，只用于导语
- 自动分栏：用容器查询在三栏、两栏、单栏之间切换，目录最先收起，内容顺序固定为标题、导语、图表；切换后 200ms 淡入
- 金句提亮：每页摘一句结论，放大到正文 1.5 倍，上方压 1px 黑线；滚到时从 0.96 放大到 1，只播一次
- 点线目录：条目名和页码之间用点线连接，悬停和聚焦时红点从左到右填满（约 300ms），当前页保持填满，点击跳到对应页
- 减少动态效果：翻页直接换页，引线和图注直接出现，点线不做过渡

## 提示词

把{产品}的{后台页面}做成杂志风后台，像每月出一期的经营刊物，一页只讲一件事。

风格底座：纸色 #f7f2e8、墨色 #181512，只用一个红 #c4261d，红只给当前页、选中的数据点和首字；报头写品牌、期号、页码，下压 2px 黑线；内容分目录、正文、图表三栏，栏间 1px 细线 #cfc6b4，0 圆角，靠线条分区；标题用系统衬线 700，正文无衬线；窄屏改单栏，顺序为标题、导语、图表、目录。

从下面挑要用的交互，没挑的不做：
1. 首字下沉：每页导语第一个字占两行，红色衬线粗体。
2. 自动分栏：用容器查询在三栏、两栏、单栏之间切换，切换后 200ms 淡入，内容顺序不变。
3. 金句提亮：每页摘一句结论，放大到正文 1.5 倍，上方压 1px 黑线，滚到时从 0.96 放大到 1，只播一次。
4. 点线目录：条目名和页码用点线连接，悬停和聚焦时红点从左到右填满，当前页保持填满，点击跳到对应页。
5. 翻角换页：右下角留 24px 折角，悬停放大到 1.4 倍，点击后沿 45° 折痕从右下角揭到左上角，用时 640ms，纸背跟着折痕走，← → 键同样翻页，翻完播报页码和标题。
6. 数据批注线：悬停、聚焦或点按数据点时，1px 红线 280ms 从点斜拉到图注下方再沿图注底边走完，图注写这个点为什么变化，放在离点更近且放得下的一侧；数据点命中区 24px。

减少动态效果时，翻页直接换页，引线和图注直接出现。

## 示例

<style>
:host{container-type:size}
.w{--paper:#f7f2e8;--ink:#181512;--red:#c4261d;--soft:#5c5448;--line:#cfc6b4;--serif:ui-serif,"Songti SC","Noto Serif CJK SC",serif;position:relative;height:100%;overflow:hidden;background:var(--paper);color:var(--ink);font:11px/1.5 system-ui,"PingFang SC",sans-serif}
.pg{position:absolute;inset:0;display:flex;flex-direction:column;padding:10px 14px;background:var(--paper)}
.next{visibility:hidden}
.mast{display:flex;align-items:baseline;gap:8px;padding-bottom:4px;border-bottom:2px solid var(--ink)}
.mast b{font:700 13px/1.2 var(--serif);letter-spacing:.04em}
.mast span{margin-left:auto;color:var(--soft)}
.body{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);padding-top:8px}
.toc{display:none}
.toc button{display:flex;align-items:baseline;gap:5px;width:100%;padding:4px 0;border:0;background:none;color:inherit;font:inherit;text-align:left;cursor:pointer}
.story{min-width:0;padding-right:12px;border-right:1px solid var(--line)}
.story small{display:block;font-size:11px;font-weight:600;color:var(--red)}
h1{margin:1px 0 4px;font:700 19px/1.22 var(--serif);text-wrap:balance}
.lead{margin:0;color:#3a342c;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden}
.lead::first-letter{float:left;margin:2px 4px 0 0;font:700 27px/1 var(--serif);color:var(--red)}
blockquote{display:none}
.chart{position:relative;min-width:0;min-height:0;margin:0 14px 0 12px}
.chart svg{position:absolute;inset:0;display:block;overflow:visible}
.base{stroke:var(--line)}
.ln{fill:none;stroke:var(--ink);stroke-width:1.5}
.leader{fill:none;stroke:var(--red);stroke-width:1}
.chart svg text{font-size:10px;fill:var(--soft);text-anchor:middle}
figcaption{position:absolute;left:0;bottom:calc(100% - 28px);width:max-content;max-width:100%;padding-bottom:2px;font:600 11px/1.3 var(--serif);color:var(--ink)}
.pt{position:absolute;width:24px;height:24px;margin:-12px 0 0 -12px;padding:0;border:0;border-radius:50%;background:none;cursor:pointer}
.pt::after{content:"";position:absolute;inset:8px;border-radius:50%;background:var(--paper);border:1.5px solid var(--ink);transition:transform .16s}
.pt.on::after{background:var(--red);border-color:var(--red);transform:scale(1.3)}
.pt:focus-visible{outline:2px solid var(--red);outline-offset:-3px}
.flapw{position:absolute;inset:0;pointer-events:none;filter:drop-shadow(-4px -4px 7px rgba(24,21,18,.32))}
.flap{position:absolute;inset:0;background:#e6dcc8;clip-path:polygon(0 0,0 0,0 0)}
.ear{position:absolute;right:0;bottom:0;width:24px;height:24px;padding:0;border:0;background:linear-gradient(135deg,#e6dcc8 0 50%,var(--red) 50%);cursor:pointer;transform-origin:100% 100%;transition:transform .16s}
.ear:hover,.ear:focus-visible{transform:scale(1.4)}
.ear:focus-visible{outline:2px solid var(--ink);outline-offset:-2px}
.sr{position:absolute;width:1px;height:1px;margin:0;overflow:hidden;clip-path:inset(50%)}
@container (min-width:520px){
.w{font-size:12px}
.pg{padding:14px 22px 16px}
.mast b{font-size:16px}
.body{grid-template-columns:128px minmax(0,1fr) minmax(0,1.15fr);padding-top:12px}
.toc{display:block;min-width:0;padding-right:14px;border-right:1px solid var(--line)}
.toc h2{margin:0 0 4px;font:700 13px/1.4 var(--serif)}
.toc i{position:relative;flex:1;height:3px;background:radial-gradient(circle,#a89e8a 1px,transparent 1.2px) 0 0/5px 3px repeat-x}
.toc i::after{content:"";position:absolute;inset:0;background:radial-gradient(circle,var(--red) 1.1px,transparent 1.3px) 0 0/5px 3px repeat-x;clip-path:inset(0 100% 0 0);transition:clip-path .3s}
.toc button:hover i::after,.toc button:focus-visible i::after,.toc [aria-current] i::after{clip-path:inset(0)}
.toc [aria-current]{font-weight:600}
.sum{margin:14px 0 0;padding-top:8px;border-top:1px solid var(--line);color:var(--soft)}
.sum b{display:block;font:700 22px/1.2 var(--serif);color:var(--ink)}
.toc button:focus-visible{outline:2px solid var(--red);outline-offset:1px}
.story{padding:0 16px}
.story small{font-size:12px}
h1{margin:2px 0 8px;font-size:24px}
.lead{-webkit-line-clamp:4}
.lead::first-letter{font-size:36px}
blockquote{display:block;margin:10px 0 0;padding-top:8px;border-top:1px solid var(--ink);font:700 15px/1.35 var(--serif)}
.chart{margin-left:16px;margin-right:12px}
}
@media (prefers-reduced-motion:reduce){
.pt::after,.ear,.toc i::after{transition:none}
}
</style>

<div class="w">
  <div class="pg now"></div>
  <div class="pg next" aria-hidden="true" inert></div>
  <div class="flapw" aria-hidden="true"><div class="flap"></div></div>
  <button type="button" class="ear" aria-label="翻到下一页"></button>
  <p class="sr" role="status"></p>
</div>

<script type="module">
export default function demo(root) {
  const PAGES = [
    { no: '03', kicker: '经营总览', title: '回款追上了订单', lead: '十月净回款 84 万，比上月多出一成，逾期账单压到了三周以内。', quote: '先收到钱，再开庆功会。', sum: ['本月净回款', '84 万'], on: 3,
      pts: [['六月', 41, '六月｜账期调整，回款见底'], ['七月', 52, '七月｜催收专线上线'], ['八月', 48, '八月｜暑期淡季小回落'], ['九月', 76, '九月｜华东大单到账'], ['十月', 84, '十月｜创下全年新高']] },
    { no: '08', kicker: '渠道拆解', title: '推荐成了头号渠道', lead: '推荐带来的新单占到四成，投放预算因此砍掉了一半。', quote: '最便宜的广告，是上一单的售后。', sum: ['推荐新单占比', '44%'], on: 2,
      pts: [['六月', 18, '六月｜推荐计划试运行'], ['七月', 24, '七月｜返券翻倍'], ['八月', 39, '八月｜行业社群集中转介绍'], ['九月', 37, '九月｜节前略有回落'], ['十月', 44, '十月｜占比升到四成']] },
    { no: '14', kicker: '客户来信', title: '差评变少，长评变多', lead: '本月客服收到 312 封来信，超过两百字的长评第一次多过差评。', quote: '愿意写长信的人，还想继续用下去。', sum: ['本月差评', '21 封'], on: 4,
      pts: [['六月', 66, '六月｜改版后差评扎堆'], ['七月', 58, '七月｜补上批量导出'], ['八月', 47, '八月｜客服响应减半'], ['九月', 35, '九月｜差评跌破四十'], ['十月', 21, '十月｜全年最低']] },
  ];
  const TOP = 30, BOTTOM = 16;
  const w = root.querySelector('.w'), now = root.querySelector('.now'), next = root.querySelector('.next');
  const flap = root.querySelector('.flap'), ear = root.querySelector('.ear'), say = root.querySelector('.sr');
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cur = 0, busy = false;

  function fill(el, i) {
    const p = PAGES[i];
    el.innerHTML = `<header class="mast"><b>MyPrompts</b><span>经营月刊 · 第 ${p.no} 页</span></header>
      <div class="body">
        <nav class="toc" aria-label="目录"><h2>目录</h2>${PAGES.map((x, j) => `<button type="button" data-go="${j}"${j === i ? ' aria-current="page"' : ''}><span>${x.kicker}</span><i></i><span>${x.no}</span></button>`).join('')}<p class="sum">${p.sum[0]}<b>${p.sum[1]}</b></p></nav>
        <article class="story"><small>${p.kicker}</small><h1>${p.title}</h1><p class="lead">${p.lead}</p><blockquote>${p.quote}</blockquote></article>
        <figure class="chart"><figcaption></figcaption></figure>
      </div>`;
    plot(el.querySelector('.chart'), p);
  }

  function plot(fig, p) {
    const W = fig.clientWidth, H = fig.clientHeight, vals = p.pts.map((d) => d[1]);
    const lo = Math.min(...vals), hi = Math.max(...vals), span = hi - lo;
    fig.xy = p.pts.map((d, i) => [8 + (i * (W - 16)) / (p.pts.length - 1), TOP + 6 + ((hi - d[1]) / span) * (H - TOP - BOTTOM - 14)]);
    fig.insertAdjacentHTML('afterbegin', `<svg width="${W}" height="${H}" aria-hidden="true">
      <line class="base" x1="0" x2="${W}" y1="${H - BOTTOM + 2}" y2="${H - BOTTOM + 2}"/>
      <polyline class="ln" points="${fig.xy.map((q) => q.join()).join(' ')}"/>
      <polyline class="leader" pathLength="1"/>
      ${p.pts.map((d, i) => `<text x="${fig.xy[i][0]}" y="${H - 2}">${d[0][0]}</text>`).join('')}
    </svg>`);
    fig.insertAdjacentHTML('beforeend', p.pts.map((d, i) => `<button type="button" class="pt" data-pt="${i}" style="left:${fig.xy[i][0]}px;top:${fig.xy[i][1]}px" aria-label="${d[2]}，${d[1]} 万"></button>`).join(''));
    mark(fig, p, p.on, false);
  }

  // 数据批注线：从数据点斜拉到图注下方，再沿图注底边走完
  function mark(fig, p, i, animate) {
    const [px, py] = fig.xy[i], W = fig.clientWidth, cap = fig.querySelector('figcaption'), ln = fig.querySelector('.leader');
    fig.querySelectorAll('.pt').forEach((b, j) => b.classList.toggle('on', j === i));
    cap.textContent = p.pts[i][2];
    const toLeft = px >= W / 2, cw = cap.offsetWidth;
    const left = toLeft ? Math.max(0, px - 14 - cw) : Math.min(W - cw, px + 14);
    const elbow = toLeft ? Math.min(px - 14, left + cw) : Math.max(px + 14, left);
    cap.style.left = left + 'px';
    ln.setAttribute('points', `${px},${py} ${elbow},${TOP} ${toLeft ? left : left + cw},${TOP}`);
    if (!animate || calm) return;
    ln.animate([{ strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDasharray: 1, strokeDashoffset: 0 }], { duration: 280, easing: 'ease-out' });
    cap.animate([{ opacity: 0 }, { opacity: 0, offset: 0.5 }, { opacity: 1 }], { duration: 300 });
  }

  // 翻角换页：下一页从右下角按 45° 折痕露出，折起的纸背跟着折痕走
  function flip(to) {
    if (busy || to === cur) return;
    busy = true;
    const refocus = root.activeElement?.dataset?.go !== undefined;
    fill(next, to);
    const W = w.clientWidth, H = w.clientHeight, S = W + H;
    const shown = (s) => `polygon(${W}px ${H}px,${W}px ${H - s}px,${W - s}px ${H}px)`;
    const fold = (s) => `polygon(${W}px ${H - s}px,${W - s}px ${H}px,${W - s}px ${H - s}px)`;
    const done = () => {
      cur = to;
      next.style.visibility = '';
      ear.style.visibility = '';
      fill(now, to);
      say.textContent = `第 ${PAGES[to].no} 页：${PAGES[to].kicker}`;
      if (refocus) now.querySelector(`[data-go="${to}"]`)?.focus();
      busy = false;
    };
    if (calm) return done();
    next.style.visibility = 'visible';
    ear.style.visibility = 'hidden';
    const opt = { duration: 640, easing: 'cubic-bezier(.45,.05,.4,1)' };
    next.animate([{ clipPath: shown(28) }, { clipPath: shown(S) }], opt);
    flap.animate([{ clipPath: fold(28) }, { clipPath: fold(S) }], opt).finished.then(done);
  }

  const point = (e) => {
    const b = e.target.closest?.('.pt');
    if (b) mark(now.querySelector('.chart'), PAGES[cur], +b.dataset.pt, !b.classList.contains('on'));
  };
  now.addEventListener('mouseover', point);
  now.addEventListener('focusin', point);
  now.addEventListener('click', (e) => {
    point(e);
    const go = e.target.closest('[data-go]');
    if (go) flip(+go.dataset.go);
  });
  ear.addEventListener('click', () => flip((cur + 1) % PAGES.length));
  w.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') flip((cur + 1) % PAGES.length);
    if (e.key === 'ArrowLeft') flip((cur + PAGES.length - 1) % PAGES.length);
  });
  new ResizeObserver(() => {
    if (!busy) fill(now, cur);
  }).observe(w);
}
</script>
