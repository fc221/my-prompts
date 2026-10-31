---
zh: 跟着背景换黑白
en: Auto-contrast overlay
order: 20
---

## 是什么

吸顶导航、悬浮按钮、角落的标志这类浮在内容上的元素，滚到深色区块时自动变成白字，滚到浅色区块时变回深字，交界处平滑过渡，任何时候都看得清。

## 适合

深浅区块交替的官网、作品集、长图文专题，导航背景透明或半透明、直接压在内容上的页面。

## 不适合

导航本身有实色底的页面，底色已经保证了对比度，不需要跟着换。

## 要点

- 推荐做法：每个区块标 data-tone="dark" 或 "light"，用 IntersectionObserver 只观察浮动元素中线那 1px 高的一条（rootMargin 把上下都收到这条线），哪个区块压在线上就用哪个区块的 tone；颜色过渡约 200ms。
- tone 由写页面的人按“这个区块上哪种字更清楚”标注：照片区块按导航所在那一条的明暗来标，明暗不稳定的照片在顶部加一层渐变压暗。
- 两套颜色（深字、白字）分别在对应区块最不利的位置核对对比度 ≥ 4.5:1；图标、标志都用 currentColor，跟文字一起换。
- 另一种做法是给白色元素加 mix-blend-mode: difference，背景纯黑纯白时能自动反色；压在彩色、中灰或照片上会算出意料之外的颜色，中灰上几乎看不见，品牌色也会被反掉，所以只适合纯黑白的版面。
- 不在运行时读取背景像素或截图算亮度：开销大，跨域图片也读不到。
- 一个浮动元素横跨交界线时以它的中线为准，切换只发生一次，不来回闪。
- 毛玻璃导航上的用法见「毛玻璃导航栏」；减少动态效果时直接切换颜色，不过渡。

## 提示词

给{透明吸顶导航 / 悬浮按钮}加「跟着背景换黑白」：页面每个区块标 data-tone="dark" 或 "light"（照片区块按导航所在高度的明暗来标，明暗不稳的加顶部渐变压暗）；用 IntersectionObserver 观察各区块，rootMargin 把观察范围收成浮动元素中线那 1px 高的一条，压在线上的区块决定浮动元素的 data-tone；dark 时文字和图标用白色、light 时用深色，图标和标志都用 currentColor，颜色过渡 200ms；两套颜色分别在对应区块最不利的位置核对对比度 ≥ 4.5:1；版面只有纯黑纯白时也可以用 mix-blend-mode: difference，有彩色或照片区块时用 data-tone 做法；不在运行时读取背景像素；减少动态效果时直接切换。

## 示例

<style>
.s{height:100%;display:grid;grid-template-rows:minmax(0,1fr) auto;gap:8px;padding:12px;box-sizing:border-box;background:#e9ebef;font:13px/1.4 system-ui,"PingFang SC",sans-serif}
.pg{position:relative;overflow-y:auto;border-radius:10px;scrollbar-width:none;background:#f3efe7}
.pg::-webkit-scrollbar{display:none}
.pg:focus-visible{outline:2px solid #3b5bdb;outline-offset:2px}
.nav{--ink:#1f2329;position:sticky;top:0;z-index:2;display:flex;align-items:center;justify-content:space-between;height:32px;margin-bottom:-32px;padding:0 12px;color:var(--ink);transition:color .2s}
.nav[data-tone="dark"]{--ink:#fff}
.nav b{font-size:14px;letter-spacing:.04em}
.nav span{display:flex;gap:12px}
.nav a{color:inherit;text-decoration:none;font-size:12px}
.nav a:focus-visible{outline:2px solid currentColor;outline-offset:2px;border-radius:2px}
/* 对比用：混合模式。纯黑白上能反色，彩色和中灰上颜色发怪 */
.blend .nav{--ink:#fff;mix-blend-mode:difference;transition:none}
section{display:grid;align-content:end;gap:2px;height:96px;padding:0 12px 12px;box-sizing:border-box}
section h3{margin:0;font-size:15px}
section p{margin:0;font-size:12px}
.t1{background:#f3efe7;color:#1f2329}
.t2{background:#1c1f26;color:#fff}
.t3{background:#8d929b;color:#1f2329}
.t4{background:#b5531f;color:#fff}
.t5{background:#f6f6f4;color:#1f2329}
.bar{display:flex;align-items:center;gap:10px;min-width:0}
.msg{margin:0;min-width:0;font-size:12px;color:#4a5060}
@container (max-height:240px){.msg{display:none}
}
@container (min-height:260px){section{height:150px;padding-bottom:16px}
section h3{font-size:18px}
}
@media (prefers-reduced-motion:reduce){.nav{transition:none}
}
</style>

<div class="s">
  <div class="pg" tabindex="0" aria-label="示例页面，可滚动">
    <nav class="nav" data-tone="light" aria-label="示例导航"><b>MyPrompts</b><span><a href="#">系列</a><a href="#">展厅</a><a href="#">联系</a></span></nav>
    <section class="t1" data-tone="light"><h3>MyPrompts 家具</h3><p>实木与布艺，慢慢用旧</p></section>
    <section class="t2" data-tone="dark"><h3>夜间展厅</h3><p>周五开放到 22:00</p></section>
    <section class="t3" data-tone="light"><h3>灰调样板间</h3><p>中灰墙面上深字更清楚</p></section>
    <section class="t4" data-tone="dark"><h3>陶土色系列</h3><p>暖色底上用白字</p></section>
    <section class="t5" data-tone="light"><h3>到店预约</h3><p>每周二至周日</p></section>
  </div>
  <div class="bar"><button type="button" class="ctl">换成混合模式</button><p class="msg" role="status"></p></div>
</div>

<script type="module">
export default function demo(root) {
  const pg = root.querySelector('.pg'), nav = root.querySelector('.nav'), btn = root.querySelector('.ctl'), msg = root.querySelector('.msg');
  const secs = [...pg.querySelectorAll('section')];
  // 只观察导航中线那 1px：压在线上的区块决定导航用深字还是白字
  let io;
  const watch = () => {
    io?.disconnect();
    const mid = nav.offsetHeight / 2, h = pg.clientHeight;
    io = new IntersectionObserver((es) => { for (const e of es) if (e.isIntersecting) nav.dataset.tone = e.target.dataset.tone; }, { root: pg, rootMargin: `-${mid}px 0px -${Math.max(0, h - mid - 1)}px 0px` }); // 还没排版（高度为 0）时不能出现负值
    secs.forEach((s) => io.observe(s));
  };
  watch();
  new ResizeObserver(watch).observe(pg);
  const say = () => { msg.textContent = pg.classList.contains('blend') ? '混合模式：灰色和陶土色区块上导航发怪、看不清' : '按区块标注切换：每段都用对比够的颜色'; };
  nav.addEventListener('click', (e) => e.preventDefault());
  btn.addEventListener('click', () => { const on = pg.classList.toggle('blend'); btn.textContent = on ? '换回区块标注' : '换成混合模式'; say(); });
  say();
  // 自动滚一遍，看导航在交界处换色；一碰就停
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let i = 0, timer = 0;
  const step = () => { if (!root.host.isConnected || ++i >= secs.length) return; pg.scrollTo({ top: secs[i].offsetTop, behavior: 'smooth' }); timer = setTimeout(step, 1100); };
  const stop = () => clearTimeout(timer);
  ['pointerdown', 'wheel', 'keydown', 'touchstart'].forEach((t) => pg.addEventListener(t, stop, { passive: true }));
  timer = setTimeout(step, 700);
}
</script>
