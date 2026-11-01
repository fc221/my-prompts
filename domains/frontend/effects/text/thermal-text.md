---
zh: 热成像大字
en: Thermal type
order: 170
---

## 是什么

一行特大的粗体标题像在热像仪里看到的：笔画中心发白发橙，往外是品红和紫色的余温，边缘慢慢晕进深蓝底色；热量在字里缓缓流动，表面带一层细细的传感器噪点。

## 适合

深色背景的活动主视觉、夏季促销、运动赛事、新品首屏上一到四个字的大标题。

## 不适合

正文、按钮、导航和 48px 以下的字（滤镜会把笔画糊成一团）；浅色页面（整块深蓝底很突兀）。只想要一道光掠过，用「文字上的扫光」；字里透出照片，用「大字里透出图片」。

## 注意

色带的第一个颜色就是背景色：滤镜会把整个滤镜区域铺成不透明的底，和页面底色不一致时，字后面会露出一块矩形。标题必须是真实文字加滤镜，不要导出成图片或画进 canvas，读屏和复制都要照常。

## 要点

- 全部用 SVG 滤镜：feFlood 黑底和字形合并成不透明的灰度图 → feGaussianBlur（5–8px）做热量外扩 → feComposite arithmetic 把清晰字形和模糊层按约 0.6 : 1 相加 → 乘上 feTurbulence 噪点 → feComponentTransfer 的 table 把亮度映射成色带
- 字形底图：用 background-clip: text 填一条重复的灰度横向渐变（暗 0.25 → 亮 0.95 → 暗，周期约 1.6em），再乘一层下亮上暗的纵向渐变，笔画里才有冷热分区
- 色带取 4–6 个点：深蓝 → 品红 → 橙 → 近白；R、G、B 三个 feFunc 各写一组 tableValues，换色带只改这三个属性和背景色
- 噪点按热度相乘（arithmetic 的 k1 项），不要直接相加：没有热量的底色就不会起颗粒，看不出滤镜区域的边界
- 动画只改一个值：底图渐变的横向位置，每秒约 0.5em，用 requestAnimationFrame 推进；滤镜区域贴着标题，只比文字框多出 10–25%
- 标题是真实的 h1 / h2，滤镜挂在它自己身上；不支持 SVG 滤镜时显示普通的渐变字，forced-colors 下去掉滤镜、用系统文字色
- 提供暂停 / 播放，暂停时停在当前帧；减少动态效果时不流动，停在静态一帧

## 提示词

把{活动页}的{一到四个字的大标题}做成「热成像大字」：页面底色与色带第一个颜色相同，标题 72px 以上、字重 800 以上，宽度贴合文字。字形用 background-clip: text 填重复的灰度横向渐变（周期约 1.6em），再挂一个 SVG 滤镜：feFlood 黑底合并成不透明灰度图，feGaussianBlur 6px 模拟热量外扩，arithmetic 把清晰字形和模糊层按 0.6 : 1 相加，按热度乘上 feTurbulence 噪点，最后用 feComponentTransfer 的 table 映射成色带（{色带颜色}，默认深蓝 → 品红 → 橙 → 近白）；滤镜区域只比文字框大 10–25%。用 requestAnimationFrame 只推进底图渐变的位置（每秒约 0.5em），提供暂停 / 播放；标题保持真实文本；不支持滤镜时显示普通渐变字，forced-colors 下用系统文字色；减少动态效果时停在静态一帧。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{--bg:#0b1030;display:grid;grid-template-rows:auto minmax(0,1fr) auto;padding:14px 18px;background:var(--bg);color:#e9e4f2}
.fx{position:absolute;width:0;height:0}
.top{display:flex;align-items:center;justify-content:space-between;gap:8px}
.kk{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#b8b0cc;font-size:12px;letter-spacing:.08em}
.btns{display:flex;gap:6px;flex:none}
.hd{align-self:center;width:fit-content;margin:0 0 0 -.06em;padding:0 .06em;font-size:min(18cqw,30cqh);line-height:1.15;font-weight:900;letter-spacing:.04em;color:#ff8b24}
/* 不支持滤镜时：普通渐变字 */
@supports ((-webkit-background-clip:text) or (background-clip:text)){.hd{color:transparent;background:linear-gradient(90deg,#c42379,#ff8b24 60%,#fff5de);-webkit-background-clip:text;background-clip:text}
/* 滤镜版：字形里是重复的灰度横向渐变（底部略亮），由滤镜映射成热成像色带 */
.hd.on{background:linear-gradient(90deg,#3c3c3c,#f4f4f4 50%,#3c3c3c) 0 0/1.6em 100% repeat-x,linear-gradient(0deg,#fff,#9a9a9a);background-blend-mode:multiply;-webkit-background-clip:text;background-clip:text;filter:url(#thermal)}
}
.cap{margin:0;color:#b8b0cc;font-size:12px;white-space:nowrap}
.cap b{color:#ffd6a8;font-weight:600}
@container (min-height:260px){.st{padding:20px 28px}
.kk,.cap{font-size:13.5px}
}
@media (forced-colors:active){.hd,.hd.on{background:none;filter:none;color:CanvasText}
}
</style>

<div class="st"><svg class="fx" aria-hidden="true"><filter id="thermal" x="-10%" y="-25%" width="120%" height="150%" color-interpolation-filters="sRGB"><feFlood flood-color="#000" result="bk"/><feMerge result="flat"><feMergeNode in="bk"/><feMergeNode in="SourceGraphic"/></feMerge><feGaussianBlur in="flat" stdDeviation="6" result="glow"/><feComposite in="flat" in2="glow" operator="arithmetic" k2=".6" k3="1" result="heat"/><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7"/><feColorMatrix values="1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 0 1" result="nz"/><feComposite in="heat" in2="nz" operator="arithmetic" k1=".28" k2=".86"/><feComponentTransfer><feFuncR type="table"/><feFuncG type="table"/><feFuncB type="table"/></feComponentTransfer></filter></svg><div class="top"><span class="kk">城市夜跑 · 七月场</span><div class="btns"><button type="button" class="ctl">暂停</button><button type="button" class="ctl">换色带</button></div></div><h3 class="hd">燃到终点</h3><p class="cap">21:00 鸣枪 · 滨江步道 10 km · 体感 <b>34°C</b></p><p class="sr" role="status"></p></div>

<script type="module">
// 两套色带：亮度 0 → 1 依次对应的颜色；第一个颜色同时是背景色，滤镜区域的边缘才看不出来
const PAL = [
  { name: '铁红', c: ['#0b1030', '#3b1580', '#c42379', '#ff8b24', '#fff5de'] },
  { name: '彩虹', c: ['#061230', '#1f4fd8', '#16c0a6', '#d9e83c', '#ff5733', '#fff1ea'] },
];
export default function demo(root) {
  const st = root.querySelector('.st'), hd = root.querySelector('.hd'), [pp, pal] = root.querySelectorAll('.ctl'), msg = root.querySelector('[role=status]');
  const fn = [...root.querySelectorAll('feFuncR, feFuncG, feFuncB')], still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  let pi = 0, run = false, raf = 0, x = 0, last = 0;
  const usePal = (i) => {
    const c = PAL[i].c.map((h) => [1, 3, 5].map((k) => (parseInt(h.slice(k, k + 2), 16) / 255).toFixed(3)));
    fn.forEach((f, ch) => f.setAttribute('tableValues', c.map((v) => v[ch]).join(' ')));
    st.style.setProperty('--bg', PAL[i].c[0]);
  };
  // 流动只改一个值：字形底图的横向位置（约 0.5em / 秒，1.6em 一个周期）
  const tick = (t) => {
    if (!root.host.isConnected || !run) { raf = 0; return; }
    x = (x + Math.min(0.05, (t - last) / 1000) * 0.5) % 1.6; last = t;
    hd.style.backgroundPosition = x.toFixed(3) + 'em 0, 0 0';
    raf = requestAnimationFrame(tick);
  };
  const play = (on) => {
    run = on; pp.textContent = on ? '暂停' : '播放';
    if (on && !raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
  };
  pp.addEventListener('click', () => {
    if (still()) return (msg.textContent = '已开启减少动态效果：保持静态一帧');
    play(!run); msg.textContent = run ? '热成像流动中' : '已暂停';
  });
  pal.addEventListener('click', () => { pi = (pi + 1) % PAL.length; usePal(pi); msg.textContent = '色带：' + PAL[pi].name; });
  if (!CSS.supports('filter', 'url(#thermal)')) { pp.hidden = pal.hidden = true; return; }
  usePal(0); hd.classList.add('on');
  hd.style.backgroundPosition = '0.5em 0, 0 0';
  if (still()) play(false); else { x = 0.5; play(true); }
}
</script>
