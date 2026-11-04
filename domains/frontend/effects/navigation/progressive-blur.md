---
zh: 渐进模糊
en: Progressive blur
aka: 渐变模糊 分层模糊 边缘模糊 variable blur
order: 50
---

## 是什么

导航或底栏的边缘没有一条硬线：内容滑到栏下时从清楚慢慢变糊，越靠屏幕边缘越模糊，强弱是连续过渡的。

## 适合

相册、视频封面墙、内容图片丰富的 App 式页面的顶栏和底栏，想让边缘消失，内容看起来一直通到屏幕外。

## 不适合

栏下是大段文字时半糊的字更干扰，用「毛玻璃导航栏」或实色栏；用户以中低端安卓机为主时，改用下面的实色渐变。

## 注意

一层 backdrop-filter 只有一个模糊值，渐变要靠多层叠：每层一个模糊值，用遮罩只露一段。这些层放在普通容器里，父级带 opacity、filter 或 mask 时会变成新的背景根，子层就采不到页面内容了。

## 要点

- 4–6 层，模糊半径从强到弱每层减半（如 16、8、4、2、1px），总高度 80–130px。
- 每层遮罩四个停靠点：透明 → 满 → 满 → 透明，相邻层重叠一段，任何位置至少有一层满格，否则过渡处会漏出清晰的原图。
- mask-image 和 backdrop-filter 写在同一个元素上，都带 -webkit- 前缀。
- 文字可读性单独处理：栏内放一层页面底色的渐变，从约 70% 不透明过渡到透明。
- 模糊层 pointer-events: none，内容能滚到栏下，点击穿透。
- 性能取舍：开销约等于模糊面积 × 层数 × 半径，滚动时每帧重算。手机取 3–4 层，过渡略有阶梯但帧率稳；桌面取 5–6 层，过渡最顺。
- 模糊区总高度控制在视口的 20% 以内，全页最多两处，半径固定、不做动画；下面压着视频或 canvas 时每帧都要重新采样，换成实色渐变。
- 降级：不支持 backdrop-filter 或用户开启减少透明效果（prefers-reduced-transparency）时，换成约 95% 不透明的实色底；低配设备减到 1–2 层。

## 提示词

给{顶栏或底栏}的边缘做「渐进模糊」：栏下叠 {层数，手机 3–4、桌面 5–6} 层绝对定位的 backdrop-filter，总高 {100}px，模糊半径从靠边的 16px 起每层减半；每层用 mask-image 的线性渐变只露一段（透明 → 满 → 满 → 透明），相邻层重叠，保证任何位置至少一层满格；这些层放在没有 opacity、filter、mask 的普通容器里，pointer-events: none；栏内文字下面单独放一层页面底色的渐变（约 70% 不透明到透明）；半径固定、不做动画，全页最多两处；不支持 backdrop-filter 或 prefers-reduced-transparency 时换成约 95% 不透明的实色底，低配设备减到 1–2 层。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{--h:92px;background:#fff}
.page{position:absolute;inset:0;overflow-y:auto;scrollbar-width:none;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));align-content:start;gap:8px;padding:44px 10px 60px}
.page:focus-visible{outline-offset:-3px}
.tile{display:flex;align-items:flex-end;height:84px;padding:6px 8px;border-radius:10px;background:var(--bg);color:#fff;font-size:12px;font-weight:600;text-shadow:0 1px 2px rgba(0,0,0,.45)}
.pb{position:absolute;inset:0 0 auto;height:var(--h);pointer-events:none}
.pb i{position:absolute;inset:0}
.top{position:absolute;inset:0 0 auto;display:flex;align-items:center;justify-content:space-between;height:40px;padding:0 14px;color:#14161d;font-size:13px;font-weight:700;background:linear-gradient(rgba(255,255,255,.72),rgba(255,255,255,.34) 70%,transparent);pointer-events:none}
.top span{color:#30343f;font-size:12px;font-weight:500}
.mode{position:absolute;left:50%;bottom:8px;display:flex;gap:2px;padding:3px;border-radius:999px;background:#fff;box-shadow:0 2px 10px rgba(20,24,40,.22);transform:translateX(-50%)}
.mode button{height:26px;padding:0 10px;border:0;border-radius:999px;background:none;color:#454b5a;font-size:12px;white-space:nowrap}
.mode button[aria-pressed=true]{background:#1f2433;color:#fff}
@container (min-height:260px){.st{--h:128px}
.page{grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;padding:56px 14px 70px}
.tile{height:112px;font-size:13px}
.top{height:52px;padding:0 20px;font-size:15px}
.top span{font-size:13px}
.mode{bottom:12px}
.mode button{height:28px;padding:0 12px}
}
@supports not ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))){.pb{display:none}
.top{background:rgba(255,255,255,.94)}
}
@media (prefers-reduced-transparency:reduce){.pb{display:none}
.top{background:rgba(255,255,255,.96)}
}
</style>

<div class="st"><div class="page" tabindex="0" role="region" aria-label="作品列表，可滚动"></div><div class="pb" aria-hidden="true"></div><div class="top"><b>MyPrompts</b><span>作品 · 收藏</span></div><div class="mode" role="group" aria-label="边缘模糊方式"><button type="button" aria-pressed="false" data-n="0">硬边</button><button type="button" aria-pressed="false" data-n="3">3 层</button><button type="button" aria-pressed="true" data-n="6">6 层</button></div><p class="sr" role="status"></p></div>

<script type="module">
const TILES = [
  ['晨雾', '#f97316,#db2777'], ['潮汐', '#06b6d4,#2563eb'], ['麦田', '#facc15,#65a30d'], ['夜航', '#7c3aed,#0f172a'],
  ['砖墙', '#dc2626,#7f1d1d'], ['苔痕', '#22c55e,#0f766e'], ['纸灯', '#fb7185,#f59e0b'], ['雪线', '#93c5fd,#4f46e5'],
  ['铜绿', '#14b8a6,#a16207'], ['枫径', '#ea580c,#991b1b'], ['星砂', '#a855f7,#ec4899'], ['海盐', '#38bdf8,#0d9488'],
  ['灯塔', '#fbbf24,#b91c1c'], ['松烟', '#475569,#0f172a'], ['朝霞', '#f472b6,#fb923c'], ['青瓷', '#2dd4bf,#3b82f6'],
];
export default function demo(root) {
  const page = root.querySelector('.page'), pb = root.querySelector('.pb'), say = root.querySelector('[role=status]'), btns = [...root.querySelectorAll('.mode button')];
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  page.innerHTML = TILES.map(([t, c], i) => `<div class="tile" style="--bg:repeating-linear-gradient(${40 + i * 25}deg,rgba(255,255,255,.14) 0 3px,transparent 3px 11px),linear-gradient(150deg,${c})">${t}</div>`).join('');
  // 每层只管一段：淡入、满格、淡出，相邻两层重叠，任何位置都至少有一层满格；上强下弱，每往下一层模糊减半
  const build = (n) => {
    if (!n) { const l = document.createElement('i'); l.style.cssText = 'height:44%;-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)'; return pb.replaceChildren(l); }
    const p = (k) => (Math.max(0, Math.min(n + 1, k)) / (n + 1)) * 100;
    pb.replaceChildren(...Array.from({ length: n }, (_, i) => {
      const l = document.createElement('i'), b = (16 / 2 ** ((i / (n - 1)) * 4)).toFixed(2);
      const m = `linear-gradient(to bottom,${i ? `transparent ${p(i - 1)}%,` : ''}#000 ${p(i)}%,#000 ${p(i + 1)}%,transparent ${p(i + 2)}%)`;
      l.style.cssText = `-webkit-backdrop-filter:blur(${b}px);backdrop-filter:blur(${b}px);-webkit-mask-image:${m};mask-image:${m}`;
      return l;
    }));
  };
  btns.forEach((b) => b.addEventListener('click', () => {
    btns.forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
    const n = +b.dataset.n; build(n);
    say.textContent = n ? `${n} 层模糊，从强到弱过渡` : '单层模糊，下沿是硬边';
  }));
  build(6);
  page.scrollTop = 16;
  if (still) return;
  let t0 = 0;
  const tick = (t) => {
    if (!root.host.isConnected) return;
    t0 ||= t; const k = Math.min(1, (t - t0) / 800);
    page.scrollTop = 16 + 30 * (1 - (1 - k) ** 3);
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
</script>
