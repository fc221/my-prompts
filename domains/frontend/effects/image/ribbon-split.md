---
zh: 切成条带的照片
en: Ribbon slices
order: 40
---

## 是什么

一张照片被竖着切成 6–8 条，拖动时各条错开高低、微微转向、彼此拉开缝隙，像一排飘起来的纸条；拖回去或点“拼回”，又严丝合缝地拼成原图。

## 适合

专题、杂志、旅行故事的封面：拆开后每一条对应一章，作品集和品牌页里一张主视觉的互动彩蛋。

## 不适合

商品图、证件照这类要完整看清的图；只想让图片出场时有点动作，用「图片滚动揭幕」；要在几张图之间切换，用「方块拼换图片」。

## 注意

每一条显示的必须是原图对应的那一段（同一张图，背景尺寸等于整张图宽，按条的序号偏移），拼回时不能出现错位和细缝；相邻条重叠 1px，偏移量用整张图的像素宽度算，不要用各条自己的百分比。

## 要点

- 用一个 0–1 的进度 P 驱动所有条：第 i 条横向错开 (i − 中间) × P × 2% 图宽，纵向按预设的高低 ±12% × P，各自带 perspective 绕 Y 轴交替转 ±16° × P；整组同时缩小到 0.88，最外侧的条不出框。
- 向右拖展开、向左拖收回，拖动距离按画面宽度的一半换算成 P，跟手不加过渡；松手时 P ≥ 0.5 展开，否则拼回，用 450ms 缓出过渡到位。
- 容器 touch-action: pan-y，竖着滑仍能滚动；被系统取消（pointercancel）或按 Esc 时直接拼回原图。
- 展开后每条底部淡入章节号（P 过半才出现），背光那一侧的条叠一层 20% 左右的暗色，看得出转向。
- 另给“拆开 / 拼回”按钮（aria-pressed），键盘和读屏用户用它切换；状态变化时 role="status" 播报“已拆成 7 条”“已拼回原图”。
- 原图的替代文字写在容器上，各条对读屏隐藏；减少动态效果时去掉过渡，直接在拆开和拼回之间切换。

## 提示词

把{专题封面图}做成「切成条带的照片」：图片竖切成 {条数} 条，每条用同一张图作背景，背景宽等于整张图的像素宽度、按序号偏移，相邻条重叠 1px，拼回时看不出缝；用一个 0–1 的进度 P 驱动：第 i 条横向错开 (i − 中间) × P × 2% 图宽、纵向按预设高低 ±12% × P、各自带 perspective(520px) 绕 Y 轴交替转 ±16° × P，整组缩到 0.88 不出框，背光的条叠 20% 暗色，P 过半时每条底部淡入{章节号}；向右拖展开、向左拖收回，按画面宽度的一半换算，跟手无过渡，松手 P ≥ 0.5 展开否则拼回（450ms 缓出）；容器 touch-action: pan-y，pointercancel 或 Esc 时拼回；另给“拆开 / 拼回”按钮（aria-pressed），状态变化用 role="status" 播报；替代文字写在容器上；减少动态效果时直接切换。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<link rel="stylesheet" href="../../_shared/app-card-photos.css">
<style>
.st{padding:10px;background:#e9e6e1}
.rb{--p:0;--w:300px;position:relative;height:100%;border-radius:12px;overflow:hidden;background:radial-gradient(120% 100% at 50% 0%,#f7f3ec,#e4ddd1);touch-action:pan-y;cursor:grab;user-select:none;-webkit-user-select:none}
.rb.drag{cursor:grabbing}
.sp{position:absolute;inset:0;transform:scale(calc(1 - var(--p) * .12));transition:transform .45s cubic-bezier(.2,.8,.2,1)}
.sp i{position:absolute;top:0;bottom:0;left:calc(var(--i) * var(--w) / 7);width:calc(var(--w) / 7 + 1px);background-size:var(--w) 100%;background-position:calc(var(--i) * var(--w) / -7) 0;box-shadow:0 6px 14px rgba(40,28,16,calc(var(--p) * .25));transform:perspective(520px) translate(calc((var(--i) - 3) * var(--p) * var(--w) * .02),calc(var(--y) * var(--p) * 100%)) rotateY(calc(var(--r) * var(--p) * 16deg));transition:transform .45s cubic-bezier(.2,.8,.2,1),box-shadow .45s}
.sp i::after{content:"";position:absolute;inset:0;background:rgba(10,12,18,.24);opacity:calc(var(--p) * (var(--r) + 1) / 2);transition:opacity .45s}
.sp b{position:absolute;left:0;right:0;bottom:12%;z-index:1;color:#fff;font-size:11px;font-weight:600;text-align:center;text-shadow:0 1px 3px rgba(0,0,0,.55);opacity:calc(var(--p) * 2 - 1);transition:opacity .3s}
.rb.drag .sp,.rb.drag .sp i,.rb.drag .sp i::after,.rb.drag .sp b{transition:none}
.tt{position:absolute;left:10px;top:10px;margin:0;padding:2px 9px;border-radius:999px;background:rgba(16,18,24,.55);color:#fff;font-size:12px;line-height:18px;white-space:nowrap;pointer-events:none}
.hint{position:absolute;left:10px;bottom:10px;margin:0;padding:2px 8px;border-radius:6px;background:rgba(255,255,255,.85);color:#3a3f48;font-size:11px;line-height:18px;white-space:nowrap;pointer-events:none}
.tg{position:absolute;right:18px;bottom:18px}
.tg.ctl{height:28px;padding:0 12px;font-size:12px}
@container (min-height:260px){.st{padding:14px}
.sp b{font-size:14px}
.tt{left:14px;top:14px;padding:3px 11px;font-size:13px}
.hint{left:14px;bottom:14px;font-size:12px}
.tg{right:26px;bottom:26px}
.tg.ctl{height:32px;padding:0 14px;font-size:13px}
}
</style>

<div class="st"><div class="rb" role="img" aria-label="专题封面：湖边的群山，分为 7 章"><div class="sp" aria-hidden="true"></div><p class="tt" aria-hidden="true">专题 · 沿湖七日</p><p class="hint" aria-hidden="true">向右拖动拆开</p></div><button type="button" class="ctl tg" aria-pressed="false">拆开</button><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const rb = root.querySelector('.rb'), sp = rb.querySelector('.sp'), tg = root.querySelector('.tg'), hint = rb.querySelector('.hint'), msg = root.querySelector('[role=status]');
  [-0.1, 0.07, -0.04, 0.11, -0.08, 0.05, -0.12].forEach((y, i) => { // 每条预设的高低，奇偶条反向转
    const el = document.createElement('i'); el.className = 'ph1'; el.style.cssText = `--i:${i};--y:${y};--r:${i % 2 ? 1 : -1}`;
    el.innerHTML = `<b>${String(i + 1).padStart(2, '0')}</b>`; sp.append(el);
  });
  // 背景偏移按整张图的像素宽度算，拼回时各条严丝合缝
  const size = () => rb.style.setProperty('--w', rb.clientWidth + 'px');
  size(); new ResizeObserver(size).observe(rb);
  let p = 0, open = false, x0 = 0, p0 = 0;
  const set = (v) => { p = Math.max(0, Math.min(1, v)); rb.style.setProperty('--p', p.toFixed(3)); };
  const settle = (o) => {
    rb.classList.remove('drag'); set(o ? 1 : 0);
    tg.setAttribute('aria-pressed', String(o)); tg.textContent = o ? '拼回' : '拆开'; hint.textContent = o ? '向左拖动拼回' : '向右拖动拆开';
    if (o !== open) msg.textContent = o ? '已拆成 7 条，每条一章' : '已拼回原图';
    open = o;
  };
  rb.addEventListener('pointerdown', (e) => { rb.setPointerCapture(e.pointerId); x0 = e.clientX; p0 = p; rb.classList.add('drag'); });
  rb.addEventListener('pointermove', (e) => { if (rb.hasPointerCapture(e.pointerId)) set(p0 + (e.clientX - x0) / (rb.clientWidth * 0.5)); });
  rb.addEventListener('pointerup', () => settle(p >= 0.5));
  rb.addEventListener('pointercancel', () => settle(false)); // 被系统接管（竖向滚动）：拼回原图
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape') settle(false); });
  tg.addEventListener('click', () => settle(!open));
  setTimeout(() => settle(true), 400);
}
</script>
