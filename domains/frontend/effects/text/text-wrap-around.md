---
zh: 文字绕开移动物体
en: Text wrapping around a moving object
aka: 文字环绕 动态绕排 文字避让 绕排 text reflow
order: 200
---

## 是什么

一段正文里有个会动的物体（圆形摆件、插图、可拖动的卡片），它走到哪，那几行字就重新断行，从两边绕过去，像水绕开石头。

## 适合

杂志式长文的开篇、品牌故事、作品集里的一屏展示，想让读者停下来玩一下的排版彩蛋。

## 不适合

要连续阅读的正文主体，字一直在动读不下去；物体静止时用 CSS 的 float 加 shape-outside 就够；手机窄栏两边留不出宽度，把物体放到文字上方。

## 注意

断行自己算，别让浏览器每帧重新量字：canvas measureText 把每段宽度量一次存下来，之后每帧只做加法。物体两边的空隙窄到放不下 3 个字时直接跳过，否则会出现一列竖着的单字。

## 要点

- 预处理：按字切段，英文单词和数字连写算一段，句中标点粘在前一个字上，不落到行首；宽度缓存到字体或容器变化时才重量。
- canvas 的 font 取正文的计算样式，和页面保持同一字体；用 Web 字体时等 document.fonts.ready 再量；正文有字距时同步设 ctx.letterSpacing。
- 每行算可用区间：行带（y 到 y + 行高）到圆心的最短距离 d，d ≥ R（物体半径 + 8px）时整行可用，否则以圆心为中心挖掉 ±√(R² − d²)，得到左右两段。
- 文字从上到下、先左段后右段往里填，段内放到放不下为止，读序始终从左到右。
- 矩形物体更简单：行带和物体的上下范围相交时，挖掉物体宽度加间距。
- 渲染用绝对定位的行元素配 transform，元素复用，内容变了才写 textContent。
- 文字层 aria-hidden，另放一份完整正文给读屏。
- 物体能拖动（touch-action: none 只加在物体上），能用方向键移动，Shift 加速；自动漂移时给暂停按钮，拖动后停止漂移，离开视口时暂停。
- 减少动态效果时物体不自动漂移，文字静态绕排，用户拖动时直接重排。

## 提示词

给{长文开篇}做「文字绕开移动物体」：{物体，默认圆形}在正文里缓慢漂移，每帧重新计算每行的可用宽度，让文字绕开它。实现：正文按字切段（英文单词和数字连写不拆，句中标点粘在前一个字上），用 canvas measureText 配正文同样的字体把每段宽度量一次并缓存，字体或容器变化时才重量，用 Web 字体时等 document.fonts.ready；每行用行带到圆心的最短距离 d 算出挖掉的半宽 √(R² − d²)（R = 物体半径 + 8px），得到左右两段，窄于 3 个字的一段跳过，文字先填左段再填右段；每段渲染成绝对定位的行元素，用 transform 放置，元素复用，内容变了才写 textContent；文字层 aria-hidden，另放完整正文给读屏；物体能拖动（touch-action: none 只加在物体上），能用方向键移动，Shift 加速；提供暂停按钮，拖动后停止漂移，离开视口时暂停；减少动态效果时物体不自动漂移，文字静态绕排。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:flex;flex-direction:column;gap:6px;padding:10px 16px 0;background:#f6f1e6;color:#2b2720}
.hd{flex:none;display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12px;color:#6d6455}
.hd b{color:#2b2720;font-size:14px}
.pa.ctl{flex:none;height:28px;padding:0 10px;font-size:12px}
.art{position:relative;flex:1;min-height:0;font:13px/22px "Songti SC","Noto Serif CJK SC",serif}
.tx{position:absolute;inset:0;overflow:hidden;-webkit-mask-image:linear-gradient(#000 calc(100% - 26px),transparent);mask-image:linear-gradient(#000 calc(100% - 26px),transparent)}
.ln{position:absolute;left:0;top:0;white-space:pre}
.ob{position:absolute;left:0;top:0;width:var(--d);height:var(--d);margin:calc(var(--d) / -2) 0 0 calc(var(--d) / -2);padding:0;border:0;border-radius:50%;background:radial-gradient(circle at 34% 30%,#ffd9a0,#f08a3c 55%,#c2410c);box-shadow:0 6px 14px -4px rgba(150,70,20,.55);cursor:grab;touch-action:none;--d:64px}
.ob:active{cursor:grabbing}
.ob:focus-visible{outline-color:#7c2d12;outline-offset:3px}
@container (min-height:260px){.st{gap:10px;padding:16px 28px 0}
.art{font-size:15px;line-height:26px}
.ob{--d:92px}
}
</style>

<div class="st"><div class="hd"><b>渡口的早晨</b><button type="button" class="ctl pa" aria-pressed="false">暂停</button></div><div class="art"><div class="tx" aria-hidden="true"></div><button type="button" class="ob" aria-label="圆形摆件，拖动或用方向键移动，文字会绕开它"></button></div><p class="sr tp"></p></div>

<script type="module">
const TEXT = '清晨六点，渡口的第一班船还没有靠岸，卖豆浆的阿婆已经把炉火生旺了。雾从海面慢慢退回去，码头上的绳索还挂着水珠，几只海鸥在栏杆上换了三次位置，最后都站回原处。修船的老周说，这片水域的潮水比钟表还准，他每天看一眼水线，就知道今天的渔获够不够卖到中午。七点过后，上学的孩子一路小跑着穿过鱼市，书包上的铃铛和卖货的吆喝混在一起。等太阳爬上灯塔的肩膀，整条街才算真正醒来，晾在二楼窗外的渔网开始滴水，巷口的理发店卷起了帘子，老板娘照例先给门前的两盆茉莉浇水，再去翻昨天没看完的小说。午后最安静，连狗都趴在石板路的阴影里不肯挪窝，只有邮差的自行车偶尔摇一下铃。到了傍晚，这些声音又会一件一件收回去，归港的船把灯一盏盏点亮，阿婆收起炉子，老周擦干净扳手，码头上只剩潮水还在下面慢慢地数着石阶，一级，又一级，像是替这座小城记下今天的账。';
const GAP = 8, MIN = 44; // 文字离物体的距离；窄过约 3 个字的空隙直接跳过
export default function demo(root) {
  const art = root.querySelector('.art'), tx = root.querySelector('.tx'), ob = root.querySelector('.ob'), pa = root.querySelector('.pa');
  root.querySelector('.tp').textContent = TEXT;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (still) pa.hidden = true;
  const ctx = document.createElement('canvas').getContext('2d');
  // 切成不可拆的小段：字母数字连写算一段，句中标点粘在前一个字后面，不让它跑到行首
  const parts = [];
  for (const t of TEXT.match(/[A-Za-z0-9]+|./gu)) { if (/[，。、；：！？）》”]/.test(t) && parts.length) parts[parts.length - 1] += t; else parts.push(t); }
  let T = [], LH = 22, W = 0, H = 0, cx = 0, cy = 0, R = 0;
  const pool = [];
  const measure = () => {
    const cs = getComputedStyle(art);
    ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`; // 和正文同一个字体，量一次就够，之后每帧只做加法
    T = parts.map((t) => ({ t, w: ctx.measureText(t).width }));
    LH = parseFloat(cs.lineHeight);
  };
  // 这一行的高度带和圆最近的距离决定挖掉多宽，左右两段都够宽就都用
  const slots = (y) => {
    const d = Math.max(0, Math.abs(cy - (y + LH / 2)) - LH / 2);
    if (d >= R) return [[0, W]];
    const h = Math.sqrt(R * R - d * d), out = [];
    if (cx - h >= MIN) out.push([0, cx - h]);
    if (W - cx - h >= MIN) out.push([cx + h, W]);
    return out;
  };
  const put = (n, s, x, y) => {
    let el = pool[n];
    if (!el) { el = pool[n] = tx.appendChild(document.createElement('div')); el.className = 'ln'; }
    if (el.textContent !== s) el.textContent = s;
    el.hidden = false;
    el.style.transform = `translate(${x}px,${y}px)`;
  };
  const layout = () => {
    let i = 0, n = 0;
    for (let y = 0; y < H && i < T.length; y += LH) {
      for (const [a, b] of slots(y)) {
        let w = 0, s = '';
        while (i < T.length && w + T[i].w <= b - a) { w += T[i].w; s += T[i].t; i++; }
        if (s) put(n++, s, a, y);
      }
    }
    for (; n < pool.length; n++) pool[n].hidden = true;
    ob.style.transform = `translate(${cx}px,${cy}px)`;
  };
  const moveTo = (x, y) => { cx = Math.max(0, Math.min(W, x)); cy = Math.max(0, Math.min(H, y)); layout(); };
  const fit = () => {
    const was = W; W = art.clientWidth; H = art.clientHeight;
    R = ob.offsetWidth / 2 + GAP;
    measure();
    if (!was) { cx = W * 0.62; cy = H * 0.46; }
    moveTo(cx * (was ? W / was : 1), cy);
  };
  let auto = !still, off = false, t0 = 0, ax = 0.5, ay = 0.46; // 漂移中心，按画框宽高的比例记
  const hold = () => { auto = false; pa.textContent = '继续'; pa.setAttribute('aria-pressed', 'true'); };
  const tick = (now) => {
    if (!root.host.isConnected) return;
    if (auto && !off) {
      const t = (now - t0) / 1000 + 0.9;
      moveTo(W * (ax + 0.27 * Math.sin(t * 0.7)), H * (ay + 0.3 * Math.sin(t * 1.1)));
    } else t0 += 16.7; // 暂停期间时间不走，继续时不跳位
    requestAnimationFrame(tick);
  };
  pa.addEventListener('click', () => {
    auto = !auto;
    if (auto) { ax = cx / W - 0.27 * Math.sin(0.63); ay = cy / H - 0.3 * Math.sin(0.99); t0 = performance.now(); }
    pa.textContent = auto ? '暂停' : '继续'; pa.setAttribute('aria-pressed', String(!auto));
  });
  ob.addEventListener('pointerdown', (e) => { ob.setPointerCapture(e.pointerId); hold(); });
  ob.addEventListener('pointermove', (e) => { if (!ob.hasPointerCapture(e.pointerId)) return; const r = art.getBoundingClientRect(); moveTo(e.clientX - r.left, e.clientY - r.top); });
  ob.addEventListener('keydown', (e) => {
    const s = e.shiftKey ? 30 : 10, m = { ArrowLeft: [-s, 0], ArrowRight: [s, 0], ArrowUp: [0, -s], ArrowDown: [0, s] }[e.key];
    if (!m) return;
    e.preventDefault(); hold(); moveTo(cx + m[0], cy + m[1]);
  });
  new IntersectionObserver(([e]) => { off = !e.isIntersecting; }).observe(root.host);
  new ResizeObserver(fit).observe(art);
  fit();
  if (!still) { t0 = performance.now(); requestAnimationFrame(tick); }
}
</script>
