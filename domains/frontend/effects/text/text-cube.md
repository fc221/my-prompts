---
zh: 文字方块
en: Rotating word block
aka: 3D 文字方块 关键词轮换 翻转词 旋转标语 文字立方体
order: 80
---

## 是什么

标语里嵌一根四面印字的长方块，每隔约 2.4 秒绕水平轴转 90°，转到哪一面就读哪一面的词，一句话轮换出四个关键词。

## 适合

首屏标语、活动页主视觉、产品能力轮播：一句固定的话配几个可替换的词，比如“帮你搞定____”。

## 不适合

词要被认真读完、或超过 4 个时用「多行标题换场」；只是换几个字用「只动变了的那几个字」；正文和表单里不放会自己动的东西。

## 注意

被转走的词读屏读不到，也可能错过：完整的一句话要以文字放在页面里（四个词都写全），方块本身对读屏隐藏。超过 5 秒的自动变化要有暂停按钮。

## 要点

- 结构：四个面叠在同一个格子里，宽度自动取最宽的词；每面 rotateX(序号 × −90°) translateZ(高度 ÷ 2)，整块先 translateZ(−高度 ÷ 2)，正面保持原大
- 左右两端各贴一块方形端面（rotateY(±90°) translateZ(宽度 ÷ 2)，宽度用 JS 量），方块才有体积
- 静止时保持一点俯视和侧转（rotateY(−17°)、rotateX(−9°)），露出顶面和端面，正面文字仍然好读
- 角度只累加不回绕，每次 +90°，转完最后一面继续往前；取余数算当前词
- 节奏：停留约 2.4 秒，转动约 0.8 秒，曲线两头带一点回摆（如 cubic-bezier(.62,-.12,.24,1.14)）
- 四个词长度尽量一致，长短悬殊时短词左右空得难看；每面一个颜色，同时用于下方的圆点
- 下方圆点可直接跳到某个词，点方块转下一面，方向键上下也能转；悬停或聚焦方块时暂停，另有常驻的暂停按钮
- 只有手动切换时用 role="status" 播报当前词，自动轮换不播报
- 减少动态效果时不自动转，方块放平，只在手动切换时直接换面

## 提示词

在{首屏标语}里嵌一个「文字方块」：固定文字“{固定文字}”后面跟一根四面印字的长方块，四面是{关键词列表}（词长尽量一致），每面一个颜色；四个面叠在同一格子里取最宽词为宽度，各面 rotateX(序号 × −90°) translateZ(高度 ÷ 2)，整块 translateZ(−高度 ÷ 2)，外层 perspective 620px；左右加两块方形端面；静止时 rotateY(−17°)、rotateX(−9°) 略带俯视；每停 2.4 秒角度累加 90°（只累加不回绕），转动 0.8 秒，两头带一点回摆；下方圆点对应四个词，可点击跳转，点方块转下一面，聚焦方块时上下方向键也能转；悬停或聚焦暂停，另有暂停按钮；完整句子以读屏可读的文字写全四个词，方块对读屏隐藏，手动切换时 role="status" 播报当前词；减少动态效果时不自动转，方块放平，手动切换直接换面。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{--h:58px;--fs:27px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:12px;background:radial-gradient(ellipse 80% 80% at 50% 30%,#2a3148,#10131b 78%);color:#eef1f8}
.st :focus-visible{outline-color:#a9bcff}
.ln{margin:0;font-size:15px;font-weight:600;letter-spacing:.02em}
.sc{display:block;padding:6px 18px;border:0;border-radius:12px;background:none;color:inherit;cursor:pointer;perspective:620px}
.bx{position:relative;display:grid;height:var(--h);transform-style:preserve-3d;transform:translateZ(calc(var(--h)/-2)) rotateY(-17deg) rotateX(calc(-9deg + var(--a,0)*1deg));transition:transform .78s cubic-bezier(.62,-.12,.24,1.14)}
.f{grid-area:1/1;display:grid;place-items:center;height:var(--h);padding:0 22px;background:var(--c);color:#fff;font-size:var(--fs);font-weight:700;letter-spacing:.04em;white-space:nowrap;backface-visibility:hidden;box-shadow:inset 0 0 0 1px rgba(255,255,255,.14);transform:rotateX(calc(var(--i)*-90deg)) translateZ(calc(var(--h)/2))}
.e{position:absolute;left:50%;top:0;width:var(--h);height:var(--h);margin-left:calc(var(--h)/-2);background:#1b2133;backface-visibility:hidden;transform:rotateY(var(--y)) translateZ(calc(var(--w,160px)/2))}
.nv{display:flex;align-items:center;gap:2px}
.d{display:grid;place-items:center;width:24px;height:24px;padding:0;border:0;border-radius:50%;background:none}
.d::after{content:"";width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.3);transition:background-color .2s,transform .2s}
.d:hover::after{background:rgba(255,255,255,.55)}
.d[aria-current=true]::after{background:var(--c);transform:scale(1.25)}
.pz{display:grid;place-items:center;width:24px;height:24px;margin-left:4px;padding:0;border:1px solid rgba(255,255,255,.28);border-radius:50%;background:none;color:#fff}
.pz svg{width:10px;height:10px;fill:currentColor}
.pz:hover{background:rgba(255,255,255,.12)}
@container (min-height:260px){.st{--h:84px;--fs:40px;gap:18px}
.ln{font-size:20px}
.f{padding:0 34px}
}
@media (prefers-reduced-motion:reduce){.bx{transform:translateZ(calc(var(--h)/-2)) rotateX(calc(var(--a,0)*1deg))}
.e{display:none}
}
</style>

<div class="st"><p class="sr">MyPrompts 帮你搞定首屏文案、配色方案、接口文档、发布公告</p><p class="ln" aria-hidden="true">MyPrompts 帮你搞定</p><button type="button" class="sc" aria-label="转到下一个关键词"><span class="bx" aria-hidden="true"></span></button><div class="nv"><button type="button" class="pz" aria-label="暂停轮换"></button></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const W = [['首屏文案', '#3b5bdb'], ['配色方案', '#d6336c'], ['接口文档', '#0b7a75'], ['发布公告', '#c2570c']];
  const N = W.length, HOLD = 2400, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const P = '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 1h2.6v8H1.5zM5.9 1h2.6v8H5.9z"/></svg>', G = '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 .8l7 4.2-7 4.2z"/></svg>';
  const st = root.querySelector('.st'), sc = root.querySelector('.sc'), bx = root.querySelector('.bx'), nv = root.querySelector('.nv'), pz = root.querySelector('.pz'), sr = root.querySelector('[role=status]');
  bx.innerHTML = W.map(([t, c], i) => `<span class="f" style="--i:${i};--c:${c}">${t}</span>`).join('') + '<i class="e" style="--y:90deg"></i><i class="e" style="--y:-90deg"></i>';
  pz.insertAdjacentHTML('beforebegin', W.map(([t, c]) => `<button type="button" class="d" style="--c:${c}" aria-label="${t}"></button>`).join(''));
  const ds = [...nv.querySelectorAll('.d')];
  let ang = 0, cur = 0, paused = still, near = false;
  // 角度只累加不回绕：永远朝同一方向转，到最后一面也不会倒转回去
  const go = (i, speak) => {
    const k = ((i - cur) % N + N) % N; ang += k * 90; cur = (cur + k) % N;
    bx.style.setProperty('--a', ang); ds.forEach((d, j) => d.setAttribute('aria-current', j === cur));
    if (speak) sr.textContent = W[cur][0];
  };
  const size = () => { st.style.setProperty('--w', bx.offsetWidth + 'px'); };
  const tick = () => { if (!root.host.isConnected) return; if (!paused && !near && !document.hidden) go(cur + 1); setTimeout(tick, HOLD); };
  const icon = () => { pz.innerHTML = paused ? G : P; pz.setAttribute('aria-label', paused ? '继续轮换' : '暂停轮换'); };
  sc.addEventListener('click', () => go(cur + 1, true));
  ds.forEach((d, i) => d.addEventListener('click', () => go(i, true)));
  pz.addEventListener('click', () => { paused = !paused; icon(); });
  sc.addEventListener('keydown', (e) => { const k = { ArrowUp: 1, ArrowDown: -1 }[e.key]; if (k) { e.preventDefault(); go(cur + k, true); } });
  [['pointerenter', true], ['pointerleave', false], ['focusin', true], ['focusout', false]].forEach(([t, v]) => sc.addEventListener(t, () => { near = v; }));
  new ResizeObserver(size).observe(bx);
  size(); go(0); icon();
  if (still) pz.hidden = true;
  setTimeout(tick, 900);
}
</script>
