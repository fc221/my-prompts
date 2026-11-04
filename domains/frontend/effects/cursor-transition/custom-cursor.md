---
zh: 情境光标
en: Contextual cursor
order: 10
---

## 是什么

在大图区域里，光标变成一个跟随的小圆，移到图片上时放大成带“查看”字样的圆。

## 适合

作品集、图片墙、案例展示区（只在这些区域里）。

## 注意

不要全站隐藏系统光标；触屏不出现。

## 提示词

给{作品图片区}加「情境光标」：在这个区域内用一个带缓动跟随鼠标的 10px 小圆点替代系统光标，悬停在图片上时放大到 72px、填充品牌色并淡入“查看”字样；离开区域恢复系统光标；按钮和文字上保留系统光标；只在鼠标设备上启用。

## 示例

<style>
.zone{position:relative;height:100%;display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:16px;box-sizing:border-box;background:#f7f5f2;overflow:hidden}
@media (hover:hover) and (pointer:fine){.zone{cursor:none}
}
.img{border-radius:12px}
.a{background:linear-gradient(135deg,#fbbf24,#f97316)}
.b{background:linear-gradient(135deg,#60a5fa,#6366f1)}
.cur{position:absolute;left:0;top:0;width:72px;height:72px;margin:-36px 0 0 -36px;border-radius:50%;background:#18181b;display:grid;place-items:center;pointer-events:none;transform:translate(-200px,-200px) scale(.14);transition:transform .2s cubic-bezier(.2,0,0,1);z-index:2}
.cur span{font:600 13px system-ui;color:#fff;opacity:0;transition:opacity .2s}
.cur.big span{opacity:1}
</style>

<div class="zone"><i class="cur"><span>查看</span></i><div class="img a"></div><div class="img b"></div></div>

<script type="module">
export default function demo(root) {
  const z = root.querySelector('.zone'), c = root.querySelector('.cur'); if (!matchMedia('(hover: hover) and (pointer: fine)').matches) { c.remove(); return; } let big = false;
  z.addEventListener('pointermove', (e) => { const r = z.getBoundingClientRect(); big = !!e.target.closest('.img'); c.classList.toggle('big', big); c.style.transform = 'translate(' + (e.clientX - r.left) + 'px,' + (e.clientY - r.top) + 'px) scale(' + (big ? 1 : .14) + ')'; });
  z.addEventListener('pointerleave', () => { c.style.transform = 'translate(-200px,-200px) scale(.14)'; });
}
</script>
