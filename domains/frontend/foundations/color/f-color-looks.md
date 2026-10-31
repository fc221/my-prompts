---
zh: 看板的几种气质
en: Dashboard looks by color area
order: 95
---

## 是什么

同一套看板结构，换的不只是色值，而是每种颜色占多少面积。先定底色、卡片、文字、强调色各占多少，再挑具体颜色。示例切换四种气质，下方色条是各颜色的面积占比。

## 适合

看板结构已经定了、风格还没定，或者看板说不出哪里不对、就是平的时候。

## 不适合

项目已有设计规范时，配色按规范来，只借这里的面积比例。

## 要点

- 先写面积再选色：底、卡片、文字、强调各占多少写成比例；强调色只给当前项和能操作的东西，面积一旦超过约 5% 就不再是点睛
- 通用配方：浅色后台 底 70–80%、卡片 15–25%、文字 5–8%、强调 ≤ 3%；深色控制台 深色 ≥ 90%、强调 ≤ 2%；以图片为主的页面界面保持中性，颜色交给图片，只留一个强调色表示状态
- 这里的百分比都是看板画面上各颜色实际占的面积：强调 ≤ 3% 说的是画面；「由品牌色生成色阶与语义令牌」里的“约 10%”是整站令牌里强调色的用量上限，两个数各管各的，不冲突
- 纸面：暖白底约 70%、白卡约 25%，强调色只出现在一处，图表用墨色细线
- 主卡领衔：深色底，一张主卡的面积是其他卡片的 3–4 倍，两种撞色只出现在主卡里，其余卡片保持中性
- 灰阶一色：低饱和中性色加一个强调色，只给最重要的那条数据；柱子做成圆头、去掉网格线
- 夜间控制台：深色配方的极端版本，读数用浅灰，强调色只给能点、能处理的地方
- 以照片或渐变铺底时，面板可以错落摆放，但共用一条底边基线；文字放在不透明的面板上
- 每种气质都核对对比度：强调色上的文字、深底上的次要文字都要 ≥ 4.5:1
- 本条只管颜色和面积；版面结构选「主次布局」「中轴布局」等，深色细节见风格「科技深色」

## 提示词

给{看板}定气质，先写面积分配再选色值：
- 气质：{纸面 / 主卡领衔 / 灰阶一色 / 夜间控制台}
- 面积：{如 底 70%、卡片 25%、文字 3%、强调 2%}，强调色只用在{唯一的位置，如 待处理数量和主按钮}
- 色值：底 {色值}、卡片 {色值}、正文 {色值}、次要文字 {色值}、强调 {色值}
- 图表：{如 墨色细线、圆头柱、无网格线}
实现后按实际页面估算一次各颜色的面积，和上面的比例对照；强调色上的文字、深底上的次要文字对比度都 ≥ 4.5:1。

## 示例

<style>
.s{height:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:8px;padding:10px 12px;background:#eef0f3;color:#1f2329;font:12px/1.35 system-ui,"PingFang SC",sans-serif}
.lk{display:flex;gap:2px;align-self:flex-start;padding:2px;border-radius:8px;background:#e1e4e9}
.lk button{height:24px;padding:0 8px;border:0;border-radius:6px;background:none;color:#475467;font:inherit;white-space:nowrap;cursor:pointer}
.lk button[aria-pressed="true"]{background:#fff;color:#1f2329;font-weight:600;box-shadow:0 1px 2px rgba(16,24,40,.12)}
.lk button:focus-visible,.n:focus-visible{outline:2px solid #3b5bdb;outline-offset:1px}
.d{flex:1;min-height:0;display:grid;grid-template-columns:var(--cols,1fr 1fr);grid-template-rows:repeat(3,minmax(0,1fr));gap:6px;padding:8px;border-radius:10px;background:var(--bg);transition:background-color .3s}
.c{display:flex;align-items:center;justify-content:space-between;gap:6px;min-width:0;padding:0 8px;border-radius:7px;background:var(--card);color:var(--ink);transition:background-color .3s,color .3s}
.c small{font-size:10px;color:var(--sub);white-space:nowrap}
.c b{font-size:12px;font-variant-numeric:tabular-nums;white-space:nowrap}
.hero{grid-row:1/4;flex-direction:column;align-items:stretch;justify-content:center;gap:2px;padding:6px 10px;background:var(--hero,var(--card));color:var(--heroInk,var(--ink))}
.hero small{color:var(--heroSub,var(--sub))}
.hero b{font-size:17px}
.hero svg{width:100%;height:34px;overflow:visible}
.ln{fill:none;stroke:var(--line);stroke-width:1.5;stroke-linejoin:round}
.end{stroke:var(--endc,var(--line));stroke-width:6;stroke-linecap:round}
.bars{display:none}
.bars line{stroke:var(--bar);stroke-width:7;stroke-linecap:round;vector-effect:non-scaling-stroke}
.bars line:last-child{stroke:var(--acc)}
.n{min-width:26px;height:18px;padding:0 6px;border:0;border-radius:9px;background:var(--nbg,transparent);color:var(--nc,var(--ink));font:inherit;font-size:12px;font-weight:700;font-variant-numeric:tabular-nums;cursor:pointer}
.share{display:grid;gap:4px}
.bar{display:flex;height:8px;border-radius:4px;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(16,24,40,.08)}
.bar i{transition:flex-basis .3s}
.lg{display:flex;flex-wrap:wrap;gap:2px 10px;margin:0;padding:0;list-style:none;font-size:11px;color:#5b616e}
.lg li{display:flex;align-items:center;gap:4px;white-space:nowrap}
.lg li::before{content:"";width:8px;height:8px;border-radius:2px;background:var(--sw);box-shadow:inset 0 0 0 1px rgba(16,24,40,.15)}
/* 四种气质：同一结构，只换颜色和面积 */
.d[data-look="paper"]{--bg:#f4efe6;--card:#fffdf9;--ink:#2b2620;--sub:#6f655a;--line:#2b2620;--endc:#c2410c;--nc:#c2410c}
.d[data-look="hero"]{--cols:1.4fr 1fr;--bg:#15171d;--card:#22252d;--ink:#e5e7eb;--sub:#9aa3b0;--hero:#ff7a59;--heroInk:#1a1410;--heroSub:#4a2a1f;--line:#1d3fd1}
.d[data-look="gray"]{--bg:#f3f4f6;--card:#fff;--ink:#111827;--sub:#5f6672;--bar:#d1d5db;--acc:#2563eb}
.d[data-look="gray"] .ln,.d[data-look="gray"] .end{display:none}
.d[data-look="gray"] .bars{display:inline}
.d[data-look="night"]{--bg:#0b0f14;--card:#141b24;--ink:#cbd5e1;--sub:#8b95a3;--line:#8b95a3;--nbg:#22c55e;--nc:#052e16}
@container (max-width:300px){.lk button{padding:0 6px}
.c{padding:0 6px}
}
@container (min-width:520px){.s{gap:10px;padding:14px 18px}
.d{gap:10px;padding:12px}
.c small{font-size:12px}
.c b{font-size:15px}
.hero b{font-size:24px}
.hero svg{height:56px}
.end{stroke-width:8}
.bars line{stroke-width:12}
.n{height:22px;font-size:14px}
.lg{font-size:12px}
}
@media (prefers-reduced-motion:reduce){.d,.c,.bar i{transition:none}
}
</style>

<div class="s">
  <div class="lk" role="group" aria-label="看板气质"><button type="button" data-k="paper" aria-pressed="true">纸面</button><button type="button" data-k="hero" aria-pressed="false">主卡领衔</button><button type="button" data-k="gray" aria-pressed="false">灰阶一色</button><button type="button" data-k="night" aria-pressed="false">夜间控制台</button></div>
  <div class="d" data-look="paper">
    <div class="c hero"><small>本月签约</small><b>¥ 82.4 万</b><svg viewBox="0 0 120 34" preserveAspectRatio="none" aria-hidden="true"><polyline class="ln" points="0,28 17,24 34,26 51,17 68,19 85,11 102,13 120,5" vector-effect="non-scaling-stroke"/><line class="end" x1="120" y1="5" x2="120" y2="5" vector-effect="non-scaling-stroke"/><g class="bars"><line x1="8" y1="30" x2="8" y2="22"/><line x1="29" y1="30" x2="29" y2="18"/><line x1="50" y1="30" x2="50" y2="20"/><line x1="71" y1="30" x2="71" y2="13"/><line x1="92" y1="30" x2="92" y2="15"/><line x1="113" y1="30" x2="113" y2="6"/></g></svg></div>
    <div class="c"><small>新客户</small><b>36</b></div>
    <div class="c"><small>回款率</small><b>91%</b></div>
    <div class="c"><small>待处理</small><button type="button" class="n" aria-label="待处理 12 项，去处理">12</button></div>
  </div>
  <div class="share"><div class="bar" aria-hidden="true"></div><ul class="lg" aria-label="面积占比"></ul></div>
</div>

<script type="module">
// 每种气质的面积占比（先定比例，再挑色值）
const SHARE = {
  paper: [['底', '#f4efe6', 70], ['卡片', '#fffdf9', 25], ['文字', '#2b2620', 4], ['强调', '#c2410c', 1]],
  hero: [['底', '#15171d', 48], ['主卡', '#ff7a59', 32], ['小卡', '#22252d', 16], ['撞色', '#1d3fd1', 4]],
  gray: [['底', '#f3f4f6', 60], ['卡片', '#ffffff', 35], ['文字', '#111827', 3], ['强调', '#2563eb', 2]],
  night: [['深底', '#0b0f14', 62], ['深卡', '#141b24', 30], ['文字', '#cbd5e1', 6], ['强调', '#22c55e', 2]],
};
export default function demo(root) {
  const d = root.querySelector('.d'), bar = root.querySelector('.bar'), lg = root.querySelector('.lg'), btns = root.querySelectorAll('.lk button');
  const set = (k) => {
    d.dataset.look = k;
    btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.k === k)));
    bar.innerHTML = SHARE[k].map(([, c, p]) => `<i style="flex:0 0 ${p}%;background:${c}"></i>`).join('');
    lg.innerHTML = SHARE[k].map(([n, c, p]) => `<li style="--sw:${c}">${n} ${p}%</li>`).join('');
  };
  btns.forEach((b) => (b.onclick = () => set(b.dataset.k)));
  set('paper');
  setTimeout(() => root.host.isConnected && set('hero'), 700);
}
</script>
