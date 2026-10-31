---
zh: 图片预览（灯箱）
en: Lightbox
order: 120
---

## 是什么

点缩略图后，图片在深色背景上放大显示，可以左右切换、缩放，并显示第几张。

## 适合

商品图、相册、附件图片、聊天图片的放大查看。

## 不适合

不在灯箱里放表单和业务导航；很小的装饰图不需要预览。

## 要点

- 深色背景 rgba(0,0,0,.85–.9)，图片按比例缩放居中，四周留 24–48px
- 左右切换按钮 44px，←/→ 键切换；顶部显示“2 / 8”和关闭按钮
- 滚轮或双指缩放、双击放大，放大后可拖动；Esc 或点背景关闭
- 从缩略图位置放大出来，关闭时缩回原处；焦点锁在灯箱内，关闭后回到被点的那张缩略图
- 加载中显示转圈，失败显示“图片加载失败，重试”
- 移动端支持左右滑动切换，系统返回键先关闭预览

## 提示词

给{图片列表}做「图片预览」：点缩略图后从原位置放大到深色背景（rgba(0,0,0,.9)）上，图片按比例居中，顶部显示“2 / 8”和关闭按钮；左右 44px 圆形按钮和 ←/→ 键切换，滚轮或双指缩放、双击放大，放大后可拖动；Esc 或点背景关闭，关闭时缩回原缩略图并把焦点还给它；加载中显示转圈，失败显示“加载失败，重试”；移动端支持左右滑动，系统返回键先关闭。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.gal{width:100%;max-width:360px;display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.th{aspect-ratio:4/3;padding:0;border:0;background-color:#e3e6eb;border-radius:8px;background-size:cover;transition:transform .16s}
.th:hover{transform:translateY(-2px)}
.lb{background:rgba(10,11,14,.9);grid-template-columns:44px 1fr 44px;gap:8px;padding:36px 8px 14px}
.pic{width:100%;height:100%;max-width:520px;justify-self:center;border-radius:6px;background-size:cover;background-position:center;transform:scale(.94);transition:transform .24s cubic-bezier(0,0,.2,1);cursor:zoom-in}
.lb[data-open] .pic{transform:none}
.lb .pic.z{transform:scale(1.6);cursor:zoom-out}
.nav{width:44px;height:44px;border:0;border-radius:50%;background:rgba(255,255,255,.12);color:#fff;font-size:24px;line-height:1}
.nav:hover{background:rgba(255,255,255,.22)}
.n{position:absolute;top:9px;left:14px;color:#e8eaee;font-size:13px;font-variant-numeric:tabular-nums}
.lb .x{position:absolute;top:4px;right:6px;color:#e8eaee}
.lb .x:hover{background:rgba(255,255,255,.12);color:#fff}
@media (prefers-reduced-motion:reduce){.pic,.th{transition:none}
}
</style>

<div class="s"><div class="gal"><button class="th" aria-label="查看图片 1：晨雾"></button><button class="th" aria-label="查看图片 2：海岸"></button><button class="th" aria-label="查看图片 3：麦田"></button><button class="th" aria-label="查看图片 4：夜色"></button></div><div class="mask lb" role="dialog" aria-modal="true" aria-label="图片预览"><span class="n" aria-live="polite"></span><button class="x" data-close aria-label="关闭预览">×</button><button class="nav pv" aria-label="上一张">‹</button><div class="pic" title="双击放大"></div><button class="nav nx" aria-label="下一张">›</button></div></div>

<script type="module">
import { modal } from '../../_shared/components-overlay.ts';

export default function demo(root) {
  const G = ['radial-gradient(circle at 72% 30%,#fff3c4 0 9%,transparent 10%),linear-gradient(170deg,#a9c3e8,#e8dccb 60%,#9fb59a 61%)', 'radial-gradient(circle at 25% 32%,#ffe2b0 0 8%,transparent 9%),linear-gradient(180deg,#f6c89f,#f3a37c 55%,#3c6e8f 56%)', 'radial-gradient(circle at 80% 22%,#fffbe6 0 7%,transparent 8%),linear-gradient(180deg,#bfe0f5 0 45%,#e9c46a 46%,#c99a3f)', 'radial-gradient(circle at 70% 28%,#f4f1de 0 7%,transparent 8%),linear-gradient(180deg,#1d2b4a,#3a4f7a 62%,#14213d 63%)'];
  const mk = root.querySelector('.lb'), pic = mk.querySelector('.pic'), n = mk.querySelector('.n'), ths = [...root.querySelectorAll('.th')]; let i = 0;
  const show = (k) => { i = (k + G.length) % G.length; pic.style.backgroundImage = G[i]; pic.classList.remove('z'); n.textContent = (i + 1) + ' / ' + G.length + ' · ' + ths[i].getAttribute('aria-label').split('：')[1]; };
  const m = modal(root, mk, { first: '.nx', scrim: true, onClose: () => ths[i] }); // 关闭后焦点回到当前这张的缩略图
  ths.forEach((t, k) => { t.style.backgroundImage = G[k]; t.addEventListener('click', () => { show(k); m.open(t); }); });
  mk.querySelector('.pv').addEventListener('click', () => show(i - 1));
  mk.querySelector('.nx').addEventListener('click', () => show(i + 1));
  mk.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); });
  pic.addEventListener('dblclick', () => pic.classList.toggle('z'));
}
</script>
