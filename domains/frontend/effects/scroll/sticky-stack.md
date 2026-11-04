---
zh: 往上叠压的卡片
en: Stacking cards on scroll
order: 70
---

## 是什么

往下滚时，每张卡片滚到顶部就停住，下一张从下面滑上来盖住它；被盖住的卡片稍微缩小、变暗，只在上沿露出一道边，越往后叠得越深。

## 适合

有先后顺序、看过就可以压下去的一组内容：行程的每一站、课程章节、年度回顾、功能分步介绍。

## 不适合

要回头对比前面的内容时用普通列表或横向卡片；卡片高矮差别大时叠出来的边参差不齐，改用「滚动钉住叙事」；点一下展开的一摞卡片用「叠卡展开」。

## 注意

停住交给 position: sticky，脚本只算缩放和变暗；每张卡片的 top 依次多 6–10px，露出的边才看得出叠了几层；最后一张后面要留够空白，它才能滚到停靠位置。

## 要点

- 卡片放在同一个父元素里，各自 position: sticky，top = 起始间距 + 序号 × 8px；滚动容器有 padding 时 top 从 padding 内侧算起，计算停靠位置要加上；祖先不能有 overflow: hidden 或 transform，否则吸不住。
- 被盖程度按“后一张从它的底边滑到停靠位置”这段滚动距离算 0–1；每压上来一张，它缩小 4–5%（transform-origin: top center）、加一层 10–12% 的暗色，最多算 3 层。
- 卡片高度、间距在挂载和尺寸变化时量一次；scroll 里只读 scrollTop，用 requestAnimationFrame 合并写入，只动 transform 和遮罩的 opacity。
- 最后一张后面放占位块，高度 = 可视高度 − 卡片高度 − 它的 top，里面可以放“到底了”的收尾文字。
- 卡片高度统一，取可视高度减去顶部叠层和露出下一张所需的空间，窄屏不要让一张卡片占满整屏。
- 滚动容器可聚焦（tabindex="0" 配 aria-label），方向键、空格、PageDown 用原生滚动；被压住的卡片内容仍在文档里，读屏按顺序读到。
- 减少动态效果时保留吸顶叠放（那只是滚动位置），不缩放、不变暗，跳转不做平滑滚动。

## 提示词

把{有顺序的卡片组}做成「往上叠压的卡片」：卡片放在同一个父元素里、高度统一，各自 position: sticky、top = 12px + 序号 × 8px，下一张滚上来时盖住上一张；按“后一张从它底边滑到停靠位置”的滚动距离算被盖程度 0–1，每压上来一张缩小 5%（transform-origin: top center）并加一层 12% 的暗色，最多叠 3 层；卡片高度和间距在挂载和尺寸变化时量一次，scroll 里只读 scrollTop、用 requestAnimationFrame 合并写入，只动 transform 和 opacity；最后一张后面放高度 = 可视高度 − 卡片高度 − 它的 top 的占位块，放收尾文字；祖先不要有 overflow: hidden 或 transform；滚动容器 tabindex="0" 配 aria-label，键盘用原生滚动；减少动态效果时保留叠放，不缩放、不变暗。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{background:linear-gradient(#f3f1ec,#e9eaef)}
.sc{height:100%;padding:12px 12px 0;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none}
.sc::-webkit-scrollbar{display:none}
.sc:focus-visible{outline-offset:-3px}
.cd{--k:0;position:sticky;display:flex;gap:12px;height:min(200px,calc(100cqh - 62px));margin:0 auto 14px;max-width:520px;padding:12px;border-radius:16px;background:var(--bg);box-shadow:inset 0 1px 0 rgba(255,255,255,.7),0 -2px 10px -6px rgba(20,30,50,.3),0 10px 22px -14px rgba(20,30,50,.5);transform:scale(calc(1 - var(--k) * .05));transform-origin:50% 0}
.cd::after{content:"";position:absolute;inset:0;border-radius:inherit;background:#0d1322;opacity:calc(var(--k) * .12);pointer-events:none}
.tx{flex:1;min-width:0;display:flex;flex-direction:column}
.no{color:var(--ink);font-size:11px;font-weight:700;letter-spacing:.04em}
.tx b{font-size:16px;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tx small{color:#5b616e;font-size:12px;font-variant-numeric:tabular-nums}
.tx p{display:-webkit-box;margin:6px 0 0;color:#4a505c;font-size:12px;line-height:1.5;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:2}
.art{flex:none;width:76px;border-radius:12px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}
.a1{background:linear-gradient(transparent 62%,#5d93b5 62%),linear-gradient(90deg,transparent 56%,#2f3e52 56% 61%,transparent 61%) 0 18%/100% 46% no-repeat,linear-gradient(transparent 16%,#2f3e52 16% 21%,transparent 21%) 30% 0/56% 100% no-repeat,linear-gradient(#ffd7a8,#f6a77a)}
.a2{background:radial-gradient(circle at 30% 40%,#6f9f5c 0 22%,transparent 23%),radial-gradient(circle at 72% 32%,#8dbb72 0 24%,transparent 25%),linear-gradient(transparent 72%,#c9a27c 72%),linear-gradient(#eef5df,#cfe3b8)}
.a3{background:linear-gradient(90deg,transparent 12%,#fff 12% 30%,transparent 30% 41%,#fff 41% 59%,transparent 59% 70%,#fff 70% 88%,transparent 88%) 0 48%/100% 10% no-repeat,linear-gradient(transparent 40%,#ef8579 40% 70%,transparent 70%),linear-gradient(transparent 82%,#8a8f99 82% 85%,transparent 85%),linear-gradient(#d4ebf7,#eef6fb)}
.a4{background:linear-gradient(90deg,transparent 43%,#e25b4b 43% 57%,transparent 57%) 0 26%/100% 9% no-repeat,linear-gradient(90deg,transparent 43%,#fff 43% 57%,transparent 57%) 0 26%/100% 46% no-repeat,linear-gradient(transparent 70%,#3f6f8f 70%),linear-gradient(#86bde4,#d4e9f6)}
.a5{background:radial-gradient(circle at 50% 70%,#ffe08a 0 17%,transparent 18%),linear-gradient(transparent 70%,#5a4a7a 70%),linear-gradient(#ff967a,#ffd08c)}
.end{display:grid;align-content:end;padding-bottom:16px;color:#8a909c;font-size:12px;text-align:center}
@container (min-width:560px){.art{width:150px}
.tx b{font-size:18px}
.tx p{-webkit-line-clamp:3}
}
@media (prefers-reduced-motion:reduce){.cd{transform:none}
.cd::after{opacity:0}
}
</style>

<div class="st"><div class="sc" tabindex="0" aria-label="城市漫步路线，共 5 站"><article class="cd" style="--bg:#fff4e6;--ink:#c2410c"><div class="tx"><span class="no">第 1 站 · 起点</span><b>旧船厂码头</b><small>09:30</small><p>老吊车改成的观景平台，早上人少，江面上的雾还没散。</p></div><i class="art a1"></i></article><article class="cd" style="--bg:#eef6e6;--ink:#4d7c0f"><div class="tx"><span class="no">第 2 站 · 步行 12 分钟</span><b>梧桐坡老街</b><small>10:15</small><p>两排老洋房，坡顶的面包店十点出炉，记得早点排队。</p></div><i class="art a2"></i></article><article class="cd" style="--bg:#fdecef;--ink:#be123c"><div class="tx"><span class="no">第 3 站 · 步行 18 分钟</span><b>红色电车站</b><small>11:00</small><p>坐两站观光电车到海边，靠右侧窗户能看到整条海岸线。</p></div><i class="art a3"></i></article><article class="cd" style="--bg:#e8f2fa;--ink:#1d4ed8"><div class="tx"><span class="no">第 4 站 · 电车 2 站</span><b>半岛灯塔</b><small>13:30</small><p>午饭后沿栈道走到灯塔，塔下的小卖部有冰镇酸梅汤。</p></div><i class="art a4"></i></article><article class="cd" style="--bg:#f3ecfb;--ink:#7e22ce"><div class="tx"><span class="no">第 5 站 · 终点</span><b>落日观景台</b><small>17:40</small><p>日落前二十分钟到，台阶上的位置最好，风大带件外套。</p></div><i class="art a5"></i></article><div class="end">路线结束 · 全程约 6.4 公里</div></div></div>

<script type="module">
export default function demo(root) {
  const sc = root.querySelector('.sc'), cards = [...sc.querySelectorAll('.cd')], end = sc.querySelector('.end');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches, S = (i) => 12 + i * 8; // 停靠位置（含容器 12px 内边距，sticky 的 top 从内边距内侧算起），每张依次多 8px
  let H = 0, G = 0, raf = 0;
  cards.forEach((c, i) => (c.style.top = i * 8 + 'px'));
  const T = (i) => S(0) + i * (H + G); // 卡片在滚动内容里的原始位置（高度统一，直接算，不读吸住后的 offsetTop）
  // 被盖程度：后一张从它的底边滑到自己的停靠位置，算 0→1；后面每张都累加，最多 3 层
  const paint = () => {
    raf = 0;
    if (still) return;
    const y = sc.scrollTop;
    cards.forEach((c, i) => {
      let k = 0;
      for (let j = i + 1; j < cards.length; j++) { const a = T(j) - S(i) - H, b = T(j) - S(j); k += Math.min(1, Math.max(0, (y - a) / (b - a))); }
      c.style.setProperty('--k', Math.min(3, k).toFixed(3));
    });
  };
  const measure = () => {
    H = cards[0].offsetHeight; G = parseFloat(getComputedStyle(cards[0]).marginBottom) || 0;
    end.style.height = Math.max(0, sc.clientHeight - H - G - S(cards.length - 1) + 12) + 'px'; // 让最后一张也能滚到停靠位置
    paint();
  };
  sc.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(paint); }, { passive: true });
  new ResizeObserver(measure).observe(sc);
  measure();
  // 演示：滚到第 3 张正压上第 2 张一半，第 1 张已经被压下去
  setTimeout(() => { if (root.host.isConnected) sc.scrollTo({ top: T(2) - S(1) - H + 0.55 * (H - 8), behavior: still ? 'auto' : 'smooth' }); }, 400);
}
</script>
