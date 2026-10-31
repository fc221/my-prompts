---
zh: 共享元素过渡
en: Shared element transition
order: 30
---

## 是什么

点列表里的一张卡片，缩略图平滑放大、移动成详情页顶部的大图，其余内容淡入；返回时再缩回原位。

## 适合

商品、作品、文章、相册从列表进详情；让人清楚“我点的就是这一个”。

## 注意

列表很长时不要给每一项都设名字；示例在隔离的容器里，用位置计算模拟同样的效果。

## 提示词

从{列表}进入{详情页}时加「共享元素过渡」：被点的缩略图平滑放大、移动成详情页顶部的大图，约 400ms、减速曲线，详情里的文字晚 100ms 左右再淡入；返回时文字先淡出，大图再缩回列表里原来的位置；用 View Transitions API（两边的图设同一个 view-transition-name，同一时刻页面上只能有一个同名元素，所以只给被点的那一项设名字），不支持时直接切换；返回后列表的滚动位置和焦点回到原来那一项；减少动态效果时直接切换。

## 示例

<style>
:host{display:block;height:100%}
.st{position:relative;height:100%;background:#f5f6f8;color:#1f2329;font:13px/1.5 system-ui,"PingFang SC",sans-serif;overflow:hidden}
.list{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:18px}
.card{display:grid;gap:4px;padding:10px;border:1px solid #e3e6eb;border-radius:14px;background:#fff;text-align:left;font:inherit;color:inherit;cursor:pointer}
.card span{color:#c2410c;font-weight:600}
.th{display:block;aspect-ratio:4/3;border-radius:10px}
.t0{background:linear-gradient(135deg,#f6d2a8,#e9a86b)}
.t1{background:linear-gradient(135deg,#d1fae5,#a7f3d0)}
.t2{background:linear-gradient(135deg,#dbeafe,#a5b4fc)}
.dt{position:absolute;inset:0;display:flex;flex-direction:column;background:#fff}
.dt[hidden]{display:none}
.hero{display:block;height:55%;transform-origin:0 0}
.body{display:grid;gap:6px;padding:14px 18px;align-content:start}
.body p{margin:0;color:#5b616e}
.name{font-size:16px}
.back{justify-self:start;margin-top:4px}
.fade{animation:fd .3s .12s both}
@keyframes fd{from{opacity:0;transform:translateY(6px)}
}
.card:focus-visible,.back:focus-visible{outline:2px solid #2563eb;outline-offset:2px}
@media (prefers-reduced-motion:reduce){.fade{animation:none}
}
.card{grid-template-columns:minmax(0,1fr)}
.th{width:100%}
.card b{overflow-wrap:anywhere}
</style>

<div class="st"><div class="list"><button type="button" class="card" data-i="0"><i class="th t0"></i><b>咖啡豆</b><span>¥128</span></button><button type="button" class="card" data-i="1"><i class="th t1"></i><b>滤纸</b><span>¥19</span></button><button type="button" class="card" data-i="2"><i class="th t2"></i><b>手冲壶</b><span>¥169</span></button></div><section class="dt" hidden><i class="hero"></i><div class="body"><b class="name"></b><p>云南保山产区，中深烘焙，适合手冲和冷萃。下单后 48 小时内发货。</p><button type="button" class="ctl back">‹ 返回列表</button></div></section></div>

<script type="module">
export default function demo(root) {
  const dt = root.querySelector('.dt'), hero = root.querySelector('.hero'), body = root.querySelector('.body'), name = root.querySelector('.name'), still = matchMedia('(prefers-reduced-motion: reduce)').matches; let from = null;
  const fly = (a, b, rev) => { const dx = a.left - b.left, dy = a.top - b.top, sx = a.width / b.width, sy = a.height / b.height; const k = [{ transform: `translate(${dx}px,${dy}px) scale(${sx},${sy})`, borderRadius: '24px' }, { transform: 'none', borderRadius: '0px' }]; return hero.animate(rev ? k.reverse() : k, { duration: 400, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'both' }); };
  root.querySelectorAll('.card').forEach((c) => c.addEventListener('click', () => { from = c; const th = c.querySelector('.th'); hero.className = 'hero ' + th.classList[1]; name.textContent = c.querySelector('b').textContent; dt.hidden = false; if (!still) { body.classList.remove('fade'); void body.offsetWidth; body.classList.add('fade'); fly(th.getBoundingClientRect(), hero.getBoundingClientRect()); } root.querySelector('.back').focus({ preventScroll: true }); }));
  root.querySelector('.back').addEventListener('click', () => { const done = () => { dt.hidden = true; hero.getAnimations().forEach((a) => a.cancel()); from?.focus({ preventScroll: true }); }; if (still || !from) return done(); fly(from.querySelector('.th').getBoundingClientRect(), hero.getBoundingClientRect(), true).finished.then(done); });
}
</script>
