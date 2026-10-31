---
zh: 百叶翻页
en: Venetian blind flip
aka: 百叶窗翻转 横条翻转 分条翻页 百叶窗切换 blinds transition
order: 40
---

## 是什么

当前页面被切成七八根横条，从上到下依次绕水平轴翻转，每一条的背面正好是下一页的对应部分，翻完拼成新页面，像拨动一扇百叶窗。

## 适合

活动海报轮换、作品集分页、品牌展示页的章节切换，内容以大图大字为主、切换本身就是看点的地方。

## 不适合

频繁切换的工作界面、文字密集的长内容用淡入或直接切换；图片切成块拼换用「方块拼换图片」；图片按竖条分开的展示用「切成条带的照片」；单张卡片翻面用「3D 翻转卡片」。

## 注意

切片是当前页和下一页的副本，只在翻动时存在：翻完立刻换回一份完整的页面，否则文字既不能选中，读屏也会读出好几遍。每条高度要取整后累加，否则条与条之间会露出发丝缝。

## 要点

- 结构：舞台 perspective 约 900px、overflow: hidden；每条 preserve-3d，里面两个面都 backface-visibility: hidden，反面 rotateX(180°)
- 切片：每个面里放一份完整页面，用负的 top 对齐到这一条的位置；条数 6–8，太少像翻门板，太多像闪烁
- 对齐：第 k 条的上边 = round(k × 总高 ÷ 条数)，高度取相邻两条之差
- 节奏：每条翻 640ms，相邻错开约 46ms，总长控制在 1 秒内；下一页从上往下翻，上一页从下往上、方向相反
- 明暗：每条翻到竖直时叠一层黑（最深约 42%），两头透明，这一层决定立体感
- 翻动中再按：只记下最后一次目标，翻完接着走，不并发，也不丢操作
- 操作：上一页 / 下一页按钮、方向键、左右滑动都能翻，点画面翻下一页；窗口尺寸变化时按新高度重建
- 切片设 aria-hidden，翻完用 role="status" 播报“名称，第 N / 总数 页”
- 减少动态效果时不切片，直接换成下一页

## 提示词

给{海报轮换}做「百叶翻页」：{页数}页内容，切换时当前页切成 7 根横条，从上到下依次绕水平轴翻转（每条 640ms，相邻错开 46ms，cubic-bezier(.45,.05,.3,1)），每条背面是下一页的对应部分；舞台 perspective 900px、overflow: hidden；每条 preserve-3d，正反两面 backface-visibility: hidden，反面 rotateX(180°)，每个面放一份完整页面并用负 top 对齐；第 k 条上边 = round(k × 总高 ÷ 7)，高度取相邻差，避免缝隙；每条翻到竖直时叠一层最深 42% 的黑；上一页时从下往上、反向翻；翻完换回一份完整页面（切片设 aria-hidden），用 role="status" 播报“名称，第 N / {页数} 页”；翻动中再按只记最后一次目标，翻完接着走；上一页 / 下一页按钮、方向键、左右滑动都能翻，点画面翻下一页；窗口变化时按新高度重建；减少动态效果时直接换页。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{display:flex;flex-direction:column;gap:6px;padding:8px 10px;background:#12141c;color:#eef1f8}
.st :focus-visible{outline-color:#a9bcff}
.sg{position:relative;flex:1;min-height:0;overflow:hidden;border-radius:12px;background:#07080c;cursor:pointer;perspective:900px;touch-action:pan-y;user-select:none;-webkit-user-select:none}
.pg{position:absolute;left:0;right:0;top:0;display:flex;flex-direction:column;justify-content:flex-end;gap:1px;padding:12px 16px;background:var(--bg);color:#fff;overflow:hidden}
.pg::before{content:"";position:absolute;right:-9%;top:-34%;width:62%;aspect-ratio:1;border-radius:50%;background:rgba(255,255,255,.14)}
.pg::after{content:"";position:absolute;right:16%;top:18%;width:22%;aspect-ratio:1;border-radius:50%;background:rgba(255,255,255,.2)}
.pg small{position:absolute;left:16px;top:12px;font-size:11px;font-weight:600;opacity:.85;white-space:nowrap}
.pg b{font-size:28px;font-weight:700;line-height:1.2;white-space:nowrap}
.pg span{font-size:12px;opacity:.9;white-space:nowrap}
.sl{position:absolute;left:0;right:0;transform-style:preserve-3d;animation:fl .64s cubic-bezier(.45,.05,.3,1) both;animation-delay:calc(var(--k)*46ms)}
.fc{position:absolute;inset:0;overflow:hidden;backface-visibility:hidden}
.fc.bk{transform:rotateX(180deg)}
.fc::after{content:"";position:absolute;inset:0;background:#000;opacity:0;animation:sh .64s both;animation-delay:calc(var(--k)*46ms)}
@keyframes fl{to{transform:rotateX(calc(var(--dir)*-180deg))}
}
@keyframes sh{50%{opacity:.42}
}
.bar{flex:none;display:flex;align-items:center;justify-content:center;gap:10px;height:30px}
.nav{display:grid;place-items:center;width:28px;height:28px;padding:0 0 2px;border:1px solid rgba(255,255,255,.28);border-radius:50%;background:rgba(255,255,255,.06);color:#fff;font-size:17px;line-height:1}
.nav:hover{background:rgba(255,255,255,.14)}
.cnt{min-width:42px;color:#b6bdd0;font-size:12px;text-align:center;font-variant-numeric:tabular-nums}
@container (min-height:260px){.pg{padding:18px 26px}
.pg small{left:26px;top:18px;font-size:12px}
.pg b{font-size:44px}
.pg span{font-size:14px}
}
</style>

<div class="st"><div class="sg" tabindex="0" role="group" aria-roledescription="翻页展示" aria-label="活动海报，左右方向键翻页"></div><div class="bar"><button type="button" class="nav pv" aria-label="上一页">‹</button><span class="cnt" aria-hidden="true"></span><button type="button" class="nav nx" aria-label="下一页">›</button></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const PAGE = [['春日市集', '4 月 12 日 · 河畔广场', 'linear-gradient(135deg,#f76b6b,#c2255c)'], ['夏夜放映', '7 月 20 日 · 天台影院', 'linear-gradient(135deg,#3b5bdb,#5f2eb3)'], ['秋收音乐节', '10 月 3 日 · 南山草地', 'linear-gradient(135deg,#d9730d,#a4400f)'], ['冬至集会', '12 月 22 日 · 老城书店', 'linear-gradient(135deg,#0b8a83,#0f4c6e)']];
  const STRIPS = 7, L = PAGE.length, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sg = root.querySelector('.sg'), cnt = root.querySelector('.cnt'), sr = root.querySelector('[role=status]');
  let cur = 0, dest = 0, busy = false, want = null, touched = false, x0 = null;
  const page = (i, H, y = 0) => { const [t, s, bg] = PAGE[i]; return `<div class="pg" style="--bg:${bg};height:${H}px;top:${-y}px"><small>MyPrompts 活动季</small><b>${t}</b><span>${s}</span></div>`; };
  const show = (i) => { cur = i; sg.innerHTML = page(i, sg.clientHeight); cnt.textContent = `${i + 1} / ${L}`; };
  // 每条放当前页和下一页同一段的切片：正面翻走，反面翻上来；翻完换回完整页面，文字才能选中和读屏
  const flip = (to, dir) => {
    dest = to;
    if (busy) { want = [to, dir]; return; }
    if (still) { show(to); sr.textContent = `${PAGE[to][0]}，第 ${to + 1} / ${L} 页`; return; }
    busy = true;
    const H = sg.clientHeight, top = (k) => Math.round(k * H / STRIPS);
    sg.innerHTML = Array.from({ length: STRIPS }, (_, k) => {
      const y = top(k), o = dir > 0 ? k : STRIPS - 1 - k;
      return `<div class="sl" aria-hidden="true" data-clip style="top:${y}px;height:${top(k + 1) - y}px;--k:${o};--dir:${dir}"><div class="fc">${page(cur, H, y)}</div><div class="fc bk">${page(to, H, y)}</div></div>`;
    }).join('');
    cnt.textContent = `${to + 1} / ${L}`;
    sg.children[dir > 0 ? STRIPS - 1 : 0].addEventListener('animationend', (e) => {
      if (e.target !== e.currentTarget) return;
      busy = false; show(to); sr.textContent = `${PAGE[to][0]}，第 ${to + 1} / ${L} 页`;
      if (want) { const [t, d] = want; want = null; if (t !== cur) flip(t, d); }
    });
  };
  const go = (d) => { touched = true; flip((dest + d + L) % L, d); };
  root.querySelector('.pv').addEventListener('click', () => go(-1));
  root.querySelector('.nx').addEventListener('click', () => go(1));
  sg.addEventListener('keydown', (e) => { const d = { ArrowLeft: -1, ArrowRight: 1 }[e.key]; if (d) { e.preventDefault(); go(d); } });
  sg.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
  sg.addEventListener('pointerup', (e) => { if (x0 === null) return; const dx = e.clientX - x0; x0 = null; go(dx > 30 ? -1 : 1); });
  sg.addEventListener('pointercancel', () => { x0 = null; });
  new ResizeObserver(() => { if (!busy) show(cur); }).observe(sg);
  [450, 2400].forEach((ms) => setTimeout(() => { if (root.host.isConnected && !touched) flip((cur + 1) % L, 1); }, ms));
}
</script>
