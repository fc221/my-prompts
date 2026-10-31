---
zh: 视差滚动
en: Parallax layers
order: 40
---

## 是什么

滚动时前景和背景以不同速度移动，远处的走得慢，产生纵深感。

## 适合

官网首屏的插画或产品图分层、品牌故事页。

## 注意

只动 transform；手机上减弱或关闭；不要让文字层参与视差。

## 要点

- 加景深：越远的层走得越慢，同时模糊 2–6px、亮度降到 0.85–0.9，最近的层保持清晰；模糊值固定写在层上，滚动时只动 transform。
- 大面积模糊开销大：模糊层控制在一屏以内，手机上去掉模糊只留速度差。

## 提示词

给{首屏插画}做「视差滚动」：分成 2–3 层，滚动时背景层移动速度是前景的 0.3–0.5 倍；优先用 CSS 滚动驱动动画，否则用 requestAnimationFrame 更新 transform；位移不超过 80px；远层同时模糊 4px、亮度 0.88，近层清晰（手机上去掉模糊）；减少动态效果时所有层同速。

## 示例

<style>
:host{display:block;height:100%}
.page{height:100%;overflow:auto;background:#0f172a}
.hero{position:relative;height:220px;overflow:hidden}
.far,.near{position:absolute;left:50%;border-radius:50%}
.far{width:260px;height:260px;margin-left:-130px;top:20px;background:radial-gradient(circle,#6366f1,transparent 70%);opacity:.6}
.near{width:90px;height:90px;margin-left:30px;top:90px;background:#f472b6}
b{position:absolute;bottom:14px;left:16px;font:600 14px system-ui;color:#e2e8f0}
.rest{height:400px}
</style>

<div class="page"><div class="hero"><i class="far"></i><i class="near"></i><b>向下滚动</b></div><div class="rest"></div></div>

<script type="module">
export default function demo(root) {
  const page = root.querySelector('.page'), far = root.querySelector('.far'), near = root.querySelector('.near'); if (matchMedia('(prefers-reduced-motion: reduce)').matches) return; page.addEventListener('scroll', () => requestAnimationFrame(() => { const y = page.scrollTop; far.style.transform = 'translateY(' + y * .6 + 'px)'; near.style.transform = 'translateY(' + y * .15 + 'px)'; }));
}
</script>
