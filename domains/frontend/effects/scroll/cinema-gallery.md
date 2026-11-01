---
zh: 镜头推近的作品展
en: Camera-walk gallery
order: 120
---

## 是什么

作品像挂在一条走廊里，前后错开排列；往下滚动时镜头沿走廊往前推，每走到一件作品正前方就停一下，叠出标题和“查看案例”；点作品或从列表里选，镜头直接推到它面前。

## 适合

个人作品集、设计或影像工作室首页：作品 4–8 件，每件都有像样的封面，访客愿意“逛一逛”。

## 不适合

作品几十件、访客要按类别筛选或快速对比时，用普通网格或列表；招聘、电商、文档这类任务型页面不用。只想让卡片横着走一遍，用「横向滚动区」。

## 注意

镜头在每件作品前要有一段“停稳区”（继续滚动但画面不动），否则画面一直在漂，标题读不完；同时必须有不经过镜头的普通作品列表。

## 要点

- 摆放：作品沿 z 轴等距排开（间距约 2 倍作品宽），左右交错约 ±0.6 倍宽；镜头就是把整个“世界”反向平移，容器 perspective 约 2.5 倍作品宽。
- 停稳：每两件之间的滚动距离里，前后各约 20% 镜头不动，中间 60% 用 smoothstep 推进；停在正前方的就是当前作品，序号、类别、标题和“查看案例”用 HTML 叠在画面上。
- 走过的作品在离镜头半个间距内淡出并设 pointer-events: none，不挡点击；远处的作品降低不透明度做景深。
- 作品本身是按钮：Tab 聚焦到哪件镜头就走到哪件，点已经停稳的作品或按 Enter 进入案例；另放“全部作品”列表，Esc 关闭并回到触发按钮，切换时用 role="status" 播报“第 N 件，共 M 件：标题”。
- 素材：每件作品一张统一比例的封面（如 3:2，长边 1200px 以上）；只要前后纵深时 CSS 3D 就够，要绕到背面、做灯光反射或空间里的摆件时才上 WebGL，限制设备像素比，页面隐藏时停止渲染。
- 窄于 768px、减少动态效果或 3D 初始化失败时，直接显示作品网格（同样的标题和链接），不钉住、不推镜头；读屏和搜索引擎拿到的也是这份列表。

## 提示词

把{作品集首页}的作品区做成「镜头推近的作品展」：{作品数}件作品的封面沿 z 轴等距排开（间距约 2 倍作品宽），左右交错，放在 perspective 约 2.5 倍作品宽的容器里；外层区块每件作品约 1 个视口高，舞台 position: sticky 钉住；滚动时整个“世界”反向平移，镜头沿走廊往前推，每两件之间前后各留约 20% 的停稳区，中间用 smoothstep 推进；停在作品正前方时叠出它的序号、类别、标题和“查看案例”链接（HTML 叠层，用 role="status" 播报“第 N 件，共 M 件：标题”）；走过的作品在半个间距内淡出且不接收点击；作品本身是按钮，Tab 聚焦或点击时把镜头推到它面前，再点或按 Enter 进入案例；右上角“全部作品”按钮打开普通列表，Esc 关闭并回到按钮；进度由滚动位置算出，用 requestAnimationFrame 更新 transform，不加 transition；窄于 768px、减少动态效果或 3D 不可用时直接显示作品网格。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{background:radial-gradient(90% 70% at 50% 35%,#3a3129,#15120f 75%);color:#f3ede6}
.page{position:relative;height:100%;overflow:auto;scrollbar-width:none}
.page::-webkit-scrollbar{display:none}
.page:focus-visible{outline-color:#fcd34d;outline-offset:-3px}
.pin{position:relative;height:340cqh}
.stage{position:sticky;top:0;height:100cqh;overflow:hidden;--w:132px;--h:88px}
.view{position:absolute;inset:0;perspective:calc(var(--w) * 2.6);perspective-origin:50% 38%}
.world{position:absolute;left:50%;top:42%;width:0;height:0;transform-style:preserve-3d}
.floor{position:absolute;left:calc(var(--w) * -3);top:calc(var(--h) / 2 + 16px);width:calc(var(--w) * 6);height:calc(var(--w) * 12);transform-origin:50% 0;background:repeating-linear-gradient(180deg,rgba(252,211,77,.2) 0 1px,transparent 1px calc(var(--w) * .45));-webkit-mask:linear-gradient(90deg,transparent,#000 30% 70%,transparent);mask:linear-gradient(90deg,transparent,#000 30% 70%,transparent)}
.work{position:absolute;left:calc(var(--w) / -2);top:calc(var(--h) / -2);width:var(--w);height:var(--h);padding:4px;border:0;border-radius:3px;background:#f6f1ea;box-shadow:0 10px 24px rgba(0,0,0,.45);cursor:pointer}
.work.on{box-shadow:0 0 0 2px #fcd34d,0 14px 30px rgba(0,0,0,.55)}
.work:focus-visible{outline:2px solid #fcd34d;outline-offset:4px}
.art{display:block;height:100%;border-radius:1px}
.a0{background:radial-gradient(circle at 72% 30%,#fde68a 0 11%,transparent 11.5%),linear-gradient(155deg,transparent 58%,#2f6f5e 58.5%),linear-gradient(205deg,transparent 52%,#4c9a7f 52.5%),linear-gradient(180deg,#e9f4ee,#cfe6d8)}
.a1{background:radial-gradient(circle at 26% 70%,#1e3a8a 0 6%,transparent 6.5%),radial-gradient(circle at 74% 32%,#f97316 0 7%,transparent 7.5%),repeating-linear-gradient(0deg,rgba(30,58,138,.14) 0 1px,transparent 1px 16%),repeating-linear-gradient(90deg,rgba(30,58,138,.14) 0 1px,transparent 1px 11%),linear-gradient(135deg,#e0ecff,#a9c8fb)}
.a2{background:radial-gradient(circle at 50% 64%,#fb923c 0 15%,transparent 15.5%),linear-gradient(180deg,#1c1917 0 64%,#57534e 64%)}
.a3{background:repeating-radial-gradient(circle at 50% 55%,#f9a8d4 0 7%,#a78bfa 7% 14%)}
.cap{position:absolute;left:16px;bottom:12px;right:96px;display:grid;line-height:1.35;pointer-events:none}
.cap small{color:#cdbfae;font-size:11px;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cap b{font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.go{position:absolute;right:16px;bottom:13px;color:#fcd34d;font-size:12px;font-weight:600;text-decoration:none;white-space:nowrap}
.go:hover{text-decoration:underline}
.tools{position:absolute;right:12px;top:12px;display:flex;gap:6px}
.tools .ctl{height:28px;padding:0 10px;font-size:12px}
.all{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;gap:6px;padding:12px 16px;background:rgba(21,18,15,.94);overflow:auto}
.all header{display:flex;align-items:center;justify-content:space-between;gap:8px;font-weight:600}
.all ul{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;margin:0;padding:0;list-style:none}
.all li button{display:flex;align-items:center;gap:8px;width:100%;padding:4px;border:1px solid rgba(243,237,230,.14);border-radius:8px;background:rgba(243,237,230,.04);color:#f3ede6;text-align:left}
.all li button:hover{background:rgba(243,237,230,.1)}
.all li button:focus-visible{outline-color:#fcd34d}
.all .art{flex:none;width:44px;height:30px;border-radius:4px}
.all b{display:block;font-size:12px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.all small{display:block;color:#a89a89;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.all span{min-width:0}
.next{display:grid;place-items:center;height:70cqh;margin:0;background:#1d1915;color:#a89a89}
.static .pin{height:auto}
.static .stage{position:relative}
.static .view,.static .cap,.static .go,.static .tools,.static .close{display:none}
.static .all{position:static;background:none}
@container (min-height:260px){.stage{--w:220px;--h:146px}
.cap{left:28px;bottom:22px}
.cap small{font-size:12px}
.cap b{font-size:19px}
.go{right:28px;bottom:24px;font-size:13px}
.tools{right:20px;top:20px}
.all{padding:20px 28px;gap:10px}
.all ul{gap:10px}
.all li button{padding:6px}
.all .art{width:72px;height:48px}
.all b{font-size:13px}
}
</style>

<div class="st"><div class="page" tabindex="0" aria-label="作品展，可上下滚动浏览"><section class="pin"><div class="stage"><div class="view"><div class="world"><i class="floor" aria-hidden="true"></i></div></div><div class="cap" aria-hidden="true"><small></small><b></b></div><a class="go" href="#">查看案例 →</a><section class="all" hidden aria-label="全部作品"><header><span>全部作品 · 4 件</span><button type="button" class="ctl close">关闭</button></header><ul></ul></section></div></section><p class="next">下一段：合作流程</p></div><div class="tools"><button type="button" class="ctl list" aria-expanded="false">全部作品</button><button type="button" class="ctl play">播放滚动</button></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const D = [['山屿茶饮', '品牌包装', '2025'], ['慢车骑行 App', '产品设计', '2025'], ['北纬 31°', '纪录片海报', '2024'], ['回声', '展览视觉', '2024']], n = D.length;
  const st = root.querySelector('.st'), page = root.querySelector('.page'), pin = root.querySelector('.pin'), world = root.querySelector('.world'), floor = root.querySelector('.floor'), cap = root.querySelector('.cap'), go = root.querySelector('.go'), all = root.querySelector('.all'), listBtn = root.querySelector('.list'), msg = root.querySelector('[role=status]');
  const works = D.map(([t, c], i) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'work'; b.setAttribute('aria-label', `${t}，${c}`); b.innerHTML = `<i class="art a${i}"></i>`; world.appendChild(b); return b; });
  root.querySelector('.all ul').innerHTML = D.map(([t, c, y], i) => `<li><button type="button" data-i="${i}"><i class="art a${i}"></i><span><b>${t}</b><small>${c} · ${y}</small></span></button></li>`).join('');
  const clamp = (x) => Math.min(1, Math.max(0, x)), ease = (x) => x * x * (3 - 2 * x);
  let cur = -1, raf = 0;
  const say = (i) => { cap.querySelector('small').textContent = `0${i + 1} / 0${n} · ${D[i][1]} · ${D[i][2]}`; cap.querySelector('b').textContent = D[i][0]; go.setAttribute('aria-label', `查看案例：${D[i][0]}`); };
  // 镜头沿 z 轴往前走：作品之间各留一段“停稳”区（每段前后 22% 镜头不动），停在作品正前方时它就是当前作品
  const render = (p) => {
    const W = works[0].offsetWidth, Dz = W * 2.2, X = W * 0.62, s = p * (n - 1), i = Math.min(n - 2, Math.floor(s)), f = ease(clamp((s - i - 0.22) / 0.56)), cam = i + f;
    const xi = i % 2 ? X : -X, cx = xi * (1 - 2 * f); // 作品左右交错挂，镜头 x 跟着从这件挪到下一件
    world.style.transform = `translate3d(${-cx}px,0,${cam * Dz}px)`;
    floor.style.transform = `translate3d(${cx}px,0,${Dz}px) rotateX(-90deg)`;
    works.forEach((w, k) => { const rel = (cam - k) * Dz; w.style.transform = `translate3d(${k % 2 ? X : -X}px,0,${-k * Dz}px)`; w.style.opacity = rel > 0 ? 1 - clamp(rel / (Dz * 0.45)) : 1 - 0.55 * clamp(-rel / (Dz * 2.4)); w.style.pointerEvents = rel > Dz * 0.2 ? 'none' : ''; }); // 走过的作品淡出，也不再挡住点击
    const c = Math.round(cam);
    if (c === cur) return; cur = c;
    works.forEach((w, k) => w.classList.toggle('on', k === c)); say(c);
    msg.textContent = `第 ${c + 1} 件，共 ${n} 件：${D[c][0]}，${D[c][1]}`;
  };
  const range = () => pin.offsetHeight - page.clientHeight;
  const progress = () => clamp((page.scrollTop - pin.offsetTop) / range());
  const open = (i) => { msg.textContent = `打开案例：${D[i][0]}`; }; // 真实项目里这里进入案例详情页
  go.addEventListener('click', (e) => { e.preventDefault(); open(cur); });
  const show = (on, back = true) => { all.hidden = !on; listBtn.setAttribute('aria-expanded', String(on)); if (on) all.querySelector('li button').focus({ preventScroll: true }); else if (back) listBtn.focus({ preventScroll: true }); };
  listBtn.addEventListener('click', () => show(all.hidden));
  root.querySelector('.close').addEventListener('click', () => show(false));
  st.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !all.hidden && !st.classList.contains('static')) show(false); });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { // 不走镜头：直接给出普通作品列表，点哪件就打开哪件
    st.classList.add('static'); all.hidden = false; all.querySelectorAll('li button').forEach((b) => b.addEventListener('click', () => open(+b.dataset.i))); return;
  }
  let queued = false;
  page.addEventListener('scroll', () => { if (queued) return; queued = true; requestAnimationFrame(() => { queued = false; render(progress()); }); }, { passive: true });
  const stop = () => cancelAnimationFrame(raf);
  const walk = (to, ms) => {
    stop(); const from = page.scrollTop, end = pin.offsetTop + range() * to, t0 = performance.now(), dur = Math.max(350, ms * Math.abs(end - from) / range());
    const step = (t) => { if (!root.host.isConnected) return; const k = clamp((t - t0) / dur); page.scrollTop = from + (end - from) * (k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2); if (k < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
  };
  const to = (i) => walk(i / (n - 1), 2400);
  ['wheel', 'touchstart', 'keydown'].forEach((t) => page.addEventListener(t, (e) => { if (!e.target.closest?.('button')) stop(); }, { passive: true }));
  // 点作品：不是当前作品就把镜头推到它面前；已经停在面前再点就打开。Tab 聚焦到哪件，镜头就走到哪件
  works.forEach((w, k) => { w.addEventListener('click', () => (k === cur ? open(k) : to(k))); w.addEventListener('focus', () => to(k)); });
  all.querySelectorAll('li button').forEach((b) => b.addEventListener('click', () => { show(false, false); to(+b.dataset.i); works[+b.dataset.i].focus({ preventScroll: true }); }));
  root.querySelector('.play').addEventListener('click', () => { if (progress() > 0.98) page.scrollTop = 0; walk(1, 5200); });
  new ResizeObserver(() => { cur = -1; render(progress()); }).observe(page);
  render(0); setTimeout(() => root.host.isConnected && to(1), 500);
}
</script>
