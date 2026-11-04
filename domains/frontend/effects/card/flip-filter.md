---
zh: 筛选时卡片流动重排
en: Filter reflow animation
aka: FLIP 动画 列表重排动画 卡片补位 筛选过渡 View Transitions
order: 70
---

## 是什么

切换分类时，留下的卡片从旧位置平滑滑到新位置补位，被筛掉的原地淡出，新出现的最后淡入，眼睛能跟住每一张卡去了哪。

## 适合

作品集、模板库、商品网格、成员墙这类几十张以内的卡片网格，常和「快捷筛选标签」搭配。

## 不适合

首次加载的入场用「列表依次进入」；一张卡放大成详情用「共享元素过渡」；几百张的长列表直接切换。

## 注意

FLIP 的顺序是固定的：先量旧位置（First），把布局直接改成最终状态（Last），算出差值用 transform 放回旧位置（Invert），再动画到 none（Play）。打断时先量、后取消旧动画，量到的才是卡片此刻在画面上的位置，连续点击不会闪回。

## 要点

- 时长：留下的卡约 340ms 标准缓出；离开的 170ms 淡出并缩到 .92；新出现的延迟 120ms，240ms 淡入。
- 离开的卡真身直接隐藏，让网格立刻算出新布局；用克隆的副本（aria-hidden）绝对定位在旧位置淡出，结束后删除。
- 新一轮筛选开始时，先清掉残留副本和进行中的动画，再按当前画面重新算。
- 只动 transform 和 opacity；列数变化导致卡片尺寸变时，只做位移，宽度直接到位，文字不被拉伸。
- 行数变少时给网格留最小高度，下面的内容不跟着跳。
- 卡片超过约 60 张时只动可视区里的，其余直接到位。
- View Transitions 写法代码更少：document.startViewTransition(() => 更新列表)，每张卡一个唯一的 view-transition-name，同样要先判断支持。连续切换时上一轮会直接跳到终点，打断手感不如 FLIP。
- 降级：两种 API 都不支持、或减少动态效果时直接切换。
- 筛选按钮用 aria-pressed，切换后用 role="status" 播报“设计，4 张”；焦点所在的卡被筛掉时，焦点移回筛选按钮。

## 提示词

给{卡片网格}的{分类筛选}加「筛选时卡片流动重排」，用 FLIP 实现：切换分类时先记录所有可见卡片的位置和不透明度（包括正在动画的），删掉残留副本、取消进行中的动画，再把被筛掉的卡隐藏、让网格算出最终布局；留下的卡用 Web Animations 从旧位置 transform 回 none（340ms 标准缓出），被筛掉的用克隆副本绝对定位在旧位置淡出并缩到 .92（170ms，结束后删除，副本 aria-hidden），新出现的延迟 120ms 淡入（240ms）；只动 transform 和 opacity；网格保持最小高度，卡片超过 60 张时只动可视区；减少动态效果或不支持时直接切换；筛选按钮用 aria-pressed，切换后用 role="status" 播报分类和数量，焦点所在的卡被筛掉时焦点移回筛选按钮。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:flex;flex-direction:column;gap:8px;padding:10px 12px;background:#f4f4f1}
.fl{flex:none;display:flex;gap:4px}
.fl button{height:28px;padding:0 11px;border:1px solid #d6d6cf;border-radius:999px;background:#fff;color:#44453f;font-size:12px;white-space:nowrap}
.fl button[aria-pressed=true]{border-color:#2d2f28;background:#2d2f28;color:#fff}
.gr{position:relative;flex:1;min-height:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:calc((100% - 12px) / 3);gap:6px}
.cd{display:flex;align-items:center;gap:7px;min-width:0;padding:0 8px;border-radius:9px;background:#fff;box-shadow:0 1px 2px rgba(40,40,30,.1);font-size:12px;font-weight:600;color:#26271f}
.cd i{flex:none;width:20px;height:20px;border-radius:6px;background:var(--c)}
.cd span{min-width:0;white-space:nowrap}
.cd small{display:none;color:#6a6b60;font-size:12px;font-weight:400}
.cd.ghost{position:absolute;margin:0;pointer-events:none}
@container (min-height:260px){.st{gap:12px;padding:14px 18px}
.fl button{height:32px;padding:0 14px;font-size:13px}
.gr{grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:calc((100% - 20px) / 3);gap:10px}
.cd{gap:10px;padding:0 12px;font-size:14px}
.cd i{width:30px;height:30px;border-radius:8px}
.cd small{display:block}
}
</style>

<div class="st"><div class="fl" role="group" aria-label="按分类筛选"></div><div class="gr" aria-label="模板列表"></div><p class="sr" role="status"></p></div>

<script type="module">
const CATS = { 全部: '', 设计: '#e8590c', 开发: '#1c7ed6', 运营: '#2f9e44' };
const ITEMS = [['海报', '设计'], ['接口', '开发'], ['周报', '运营'], ['图标', '设计'], ['部署', '开发'], ['活动', '运营'], ['配色', '设计'], ['日志', '开发'], ['排版', '设计']];
const EASE = 'cubic-bezier(.2,0,0,1)';
export default function demo(root) {
  const fl = root.querySelector('.fl'), gr = root.querySelector('.gr'), say = root.querySelector('[role=status]');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches || !gr.animate;
  gr.innerHTML = ITEMS.map(([t, c]) => `<article class="cd" data-c="${c}" style="--c:${CATS[c]}"><i></i><span>${t}<small>${c}</small></span></article>`).join('');
  fl.innerHTML = Object.keys(CATS).map((c, i) => `<button type="button" aria-pressed="${!i}">${c}</button>`).join('');
  const cards = [...gr.children], btns = [...fl.children];
  const filter = (cat, quiet) => {
    // First：先量旧位置，正在飞的卡量到的就是此刻画面上的位置，打断时不跳
    const was = new Map(cards.filter((c) => !c.hidden).map((c) => [c, { r: c.getBoundingClientRect(), o: +getComputedStyle(c).opacity }]));
    const box = gr.getBoundingClientRect();
    gr.querySelectorAll('.ghost').forEach((g) => g.remove());
    cards.forEach((c) => c.getAnimations().forEach((a) => a.cancel()));
    // Last：直接改成最终布局
    cards.forEach((c) => { c.hidden = cat !== '全部' && c.dataset.c !== cat; });
    if (!quiet) say.textContent = `${cat}，${cards.filter((c) => !c.hidden).length} 张`;
    if (still) return; // 降级：直接切换
    // Invert + Play
    for (const [c, { r, o }] of was) {
      if (c.hidden) { // 离开的卡已经不占位，用一个幽灵副本在原处淡出
        const g = c.cloneNode(true);
        g.hidden = false; g.classList.add('ghost'); g.setAttribute('aria-hidden', 'true');
        g.style.cssText += `left:${r.left - box.left}px;top:${r.top - box.top}px;width:${r.width}px;height:${r.height}px`;
        gr.append(g);
        g.animate([{ opacity: o, transform: 'none' }, { opacity: 0, transform: 'scale(.92)' }], { duration: 170, easing: 'ease-out', fill: 'forwards' }).onfinish = () => g.remove();
        continue;
      }
      const n = c.getBoundingClientRect(), dx = r.left - n.left, dy = r.top - n.top;
      if (dx || dy || o < 1) c.animate([{ transform: `translate(${dx}px,${dy}px)`, opacity: o }, { transform: 'none', opacity: 1 }], { duration: 340, easing: EASE });
    }
    for (const c of cards) if (!c.hidden && !was.has(c)) c.animate([{ opacity: 0, transform: 'scale(.92)' }, { opacity: 1, transform: 'none' }], { duration: 240, delay: 120, easing: EASE, fill: 'backwards' });
  };
  const pick = (b, quiet) => {
    if (b.getAttribute('aria-pressed') === 'true') return;
    btns.forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
    filter(b.textContent, quiet);
  };
  btns.forEach((b) => b.addEventListener('click', () => { clearTimeout(auto); pick(b); }));
  let auto = setTimeout(() => { pick(btns[1], true); auto = setTimeout(() => pick(btns[0], true), 1500); }, 350);
}
</script>
