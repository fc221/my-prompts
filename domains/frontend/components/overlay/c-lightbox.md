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

- 用组件库的图片预览：Element Plus el-image（src、alt、preview-src-list、initial-index、preview-teleported、hide-on-click-modal、zoom-rate、infinite、@switch），或手动打开的 el-image-viewer（url-list、initial-index）；Naive UI n-image-group 包住 n-image（src、preview-src、alt、lazy、preview-disabled）；Ant Design Vue a-image-preview-group 包住 a-image（src、alt、width、fallback、placeholder、preview）；深色背景、缩放、拖动、左右切换、Esc、焦点由组件负责
- 一组图要成“组”才能左右切换：Element Plus 把整组地址传给每张的 preview-src-list 并给 initial-index，Naive UI 用 n-image-group，Ant Design Vue 用 a-image-preview-group；只传单张就没有切换按钮
- 显示“2 / 8”：Ant Design Vue 自带；Element Plus 和 Naive UI 没有，要的话在 toolbar 插槽 / render-toolbar 里自己写当前序号
- 点深色背景关闭：Element Plus 默认不关，要开 hide-on-click-modal
- Element Plus 的预览层默认渲染在原地（preview-teleported 默认 false），放在带 transform、overflow 或 z-index 的容器里会被裁掉或压住，开 preview-teleported；另两家默认挂到 body
- 缩略图的 alt 写图片内容；加载中和失败有占位：Element Plus placeholder / error 插槽，Naive UI fallback-src，Ant Design Vue placeholder / fallback；列表长时开 lazy（Ant Design Vue 透传 loading="lazy"）
- 移动端左右滑动切换三家都没有自带；系统返回键先关闭预览：打开时 pushState，popstate 时把控制显示的状态置 false（Element Plus 用 v-if 渲染的 el-image-viewer、Naive UI n-image-group 的 show、Ant Design Vue 的 preview.visible）

## 提示词

给{图片列表}做图片预览：用项目组件库自带的预览（Element Plus el-image :preview-src-list :initial-index preview-teleported hide-on-click-modal；Naive UI n-image-group 包住 n-image；Ant Design Vue a-image-preview-group 包住 a-image），不手写灯箱、缩放和切换。整组图片放进同一个组，点第 N 张就从第 N 张开始；左右切换、缩放、Esc 用组件默认；显示“N / 总数”（Ant Design Vue 自带，Element Plus 用 toolbar 插槽、Naive UI 用 render-toolbar 自己写）；点深色背景关闭（Element Plus 开 hide-on-click-modal）；缩略图写 alt“{图片内容}”，加载中显示占位、失败显示“加载失败”（placeholder / error 插槽、fallback-src、fallback）；列表长时开 lazy；移动端系统返回键先关闭预览（popstate 时把控制显示的状态置 false）。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.gal{width:100%;max-width:360px;display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.th{aspect-ratio:4/3;padding:0;border:0;background-color:#e3e6eb;border-radius:8px;background-size:cover;transition:transform .16s}
.th:hover{transform:translateY(-2px)}
.lb{background:rgba(10,11,14,.9);grid-template-columns:44px 1fr 44px;gap:8px;padding:36px 8px 12px}
.pic{width:100%;height:100%;max-width:520px;justify-self:center;border-radius:6px;background-size:cover;background-position:center;transform:scale(.94);transition:transform .24s cubic-bezier(0,0,.2,1);cursor:zoom-in}
.lb[data-open] .pic{transform:none}
.lb .pic.z{transform:scale(1.6);cursor:zoom-out}
.nav{width:44px;height:44px;border:0;border-radius:50%;background:rgba(255,255,255,.12);color:#fff;font-size:24px;line-height:1}
.nav:hover{background:rgba(255,255,255,.22)}
.n{position:absolute;top:8px;left:12px;color:#e8eaee;font-size:13px;font-variant-numeric:tabular-nums}
.lb .x{position:absolute;top:4px;right:8px;color:#e8eaee}
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
  // 挂载即打开第 2 张，不抢焦点；关掉后点任意缩略图再打开
  show(1); mk.setAttribute('data-open', ''); [...mk.parentNode.children].forEach((x) => { if (x !== mk) x.inert = true; });
}
</script>
