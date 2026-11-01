---
zh: 滚动钉住叙事
en: Sticky scroll story
order: 60
---

## 是什么

一侧的主图钉在屏幕上不动，另一侧的文字段落滚过时，主图跟着切换内容或放大局部。

## 适合

官网介绍产品工作方式的那一段（全页唯一的主动效）。

## 注意

用 IntersectionObserver 判断当前段落；这是官网的“主时刻”，同页不再叠加其他滚动特效。

## 提示词

把{产品介绍区}做成「滚动钉住叙事」：左侧主视觉 position: sticky 钉在视口中间，右侧 3–4 段文字依次滚过；哪一段进入视口中部，主视觉就切换到对应的画面（淡入淡出 300ms）并高亮对应部位；窄屏改为文字和图片上下交替；减少动态效果时直接切换。

## 示例

<style>
:host{display:block;height:100%}
.page{position:relative;height:100%;overflow:auto;scrollbar-width:none;background:#fff;color:#18181b;font:13px/1.45 system-ui,"PingFang SC",sans-serif}
.page::-webkit-scrollbar{display:none}
.wrap{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px;padding:12px 16px 0}
.pin{position:sticky;top:12px;display:grid;grid-template-rows:minmax(0,1fr) auto;gap:6px;height:calc(100cqh - 24px);max-height:220px;padding:12px;border-radius:14px;background:#1d2026}
.cam{width:100%;height:100%;min-height:0}
.part{opacity:.55;transition:opacity .3s}
.part.on{opacity:1}
.part.on>:first-child{stroke:#fbbf24;stroke-width:3}
.v{color:#fff;font-size:13px;font-weight:600;text-align:center;transition:opacity .3s}
.steps{padding-bottom:12px}
.steps p{display:grid;align-content:center;gap:4px;min-height:calc(100cqh - 24px);margin:0;color:#9aa0a6;transition:color .3s}
.steps b{font-size:15px}
.steps span{font-size:12px}
.steps p.on{color:#18181b}
@media (prefers-reduced-motion:reduce){.part,.v,.steps p{transition:none}
}
</style>

<div class="page"><div class="wrap"><div class="pin"><svg class="cam" viewBox="0 0 200 130" aria-hidden="true"><rect x="18" y="34" width="164" height="84" rx="14" fill="#262a31"/><rect x="62" y="20" width="56" height="20" rx="5" fill="#262a31"/><circle cx="150" cy="30" r="5" fill="#9aa3ad"/><g class="part" data-p="0"><circle cx="80" cy="76" r="32" fill="#3b4049"/><circle cx="80" cy="76" r="22" fill="#15181d"/><circle cx="72" cy="68" r="5" fill="#6b7280" opacity=".6"/></g><g class="part" data-p="1"><rect x="124" y="50" width="46" height="34" rx="4" fill="#3b4049"/><rect x="128" y="54" width="38" height="26" rx="2" fill="#8fb4d9"/></g><g class="part" data-p="2"><rect x="18" y="34" width="28" height="84" rx="14" fill="#3b4049"/><path d="M24 52h16M24 64h16M24 76h16M24 88h16M24 100h16" stroke="#262a31" stroke-width="2"/></g></svg><b class="v">一英寸传感器</b></div><div class="steps"><p><b>① 一英寸传感器</b><span>弱光下噪点更少</span></p><p><b>② 可翻转触摸屏</b><span>自拍和低角度都看得见</span></p><p><b>③ 加深的握持手柄</b><span>单手拍摄更稳</span></p></div></div></div>

<script type="module">
export default function demo(root) {
  const page = root.querySelector('.page'), v = root.querySelector('.v'), steps = [...root.querySelectorAll('.steps p')], parts = [...root.querySelectorAll('.part')];
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cur = -1;
  const show = (i) => {
    if (i === cur) return; cur = i;
    steps.forEach((p, j) => p.classList.toggle('on', j === i));
    parts.forEach((g) => g.classList.toggle('on', +g.dataset.p === i));
    const name = steps[i].querySelector('b').textContent.slice(2);
    if (still) { v.textContent = name; return; }
    v.style.opacity = 0; setTimeout(() => { if (root.host.isConnected) { v.textContent = name; v.style.opacity = 1; } }, 150);
  };
  // 哪一段进入视口中部（上下各留 45%），主视觉就高亮对应部位
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) show(steps.indexOf(e.target)); }), { root: page, rootMargin: '-45% 0px -45% 0px' });
  steps.forEach((p) => io.observe(p));
  // 自动演示：滚到第二段居中
  setTimeout(() => { if (!root.host.isConnected) return; const p = steps[1]; page.scrollTo({ top: p.offsetTop - (page.clientHeight - p.offsetHeight) / 2, behavior: still ? 'auto' : 'smooth' }); }, 400);
}
</script>
