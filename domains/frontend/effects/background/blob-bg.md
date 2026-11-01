---
zh: 流体形状背景
en: Fluid blob background
aka: 流体背景 液态色块 变形色团 有机形状 blob morph
order: 20
---

## 是什么

几团边缘清楚的柔软色块在背景里缓慢变形、漂移，像几滴颜料在水面上慢慢改变轮廓；挨得近时还能像液体一样粘在一起。

## 适合

品牌首屏、创意工作室和教育产品的官网、注册和欢迎页、空状态和活动页的大背景。

## 不适合

要一片朦胧流动的光用「极光渐变背景」；要安静的纹理质感用「噪点颗粒质地」；数据页和表单页不用会动的背景。

## 注意

和极光的区别在有轮廓：模糊最多 4–6px，或者完全不模糊，靠形状本身的变形出效果。文字下面的色块要么颜色浅，要么文字垫一块实底，按压在色块上和压在底色上两种情况都核对对比度。

## 要点

- 形状：3–4 个色块，各是一个元素，border-radius 用 8 值写法（如 42% 58% 63% 37% / 41% 44% 56% 59%）做不规则圆，关键帧之间换 3–4 组数值，一轮 12–20s，ease-in-out、alternate
- 漂移：外层元素只做 translate 和 rotate（一轮 20–30s），和变形的节奏错开，看起来不重复
- 粘连：想让色块相遇时融在一起，给色块的父层挂 SVG 滤镜：feGaussianBlur stdDeviation 10–14，再用 feColorMatrix 把透明度通道写成 0 0 0 18 -7；同色色块效果最好，滤镜只挂在背景层
- 配色：底色 #f3efe8 这类浅暖色，色块用 2–3 个中等饱和的颜色（如珊瑚 #ff7a59、青 #2bb3a3、奶黄 #ffd166），交叠处用 mix-blend-mode: multiply 出第三种颜色
- 性能：border-radius 动画每帧重绘，色块不超过 4 个、单个不超过视口的 60%；更省的做法是固定一组不规则圆角，只做 rotate 加非等比 scale；离开视口时暂停
- 文字：标题压在浅色区或垫半透明实底，正文对比度 ≥ 4.5:1；色块在内容下层，pointer-events: none
- 一直在动的背景提供暂停按钮；减少动态效果时停在一帧静态构图

## 提示词

给{区块}加「流体形状背景」：浅暖底色 #f3efe8 上放 3–4 个色块（{品牌色}和 1–2 个邻近色，中等饱和），每个色块的 border-radius 用 8 值写法做不规则圆，在 3–4 组数值之间变形（12–20s，ease-in-out，alternate），外层只做 translate 和 rotate 慢慢漂移（20–30s），两种节奏错开；色块轮廓保持清楚，模糊不超过 6px；交叠处用 mix-blend-mode: multiply；想要相遇时粘在一起，就给色块父层加 SVG 滤镜（feGaussianBlur 12，再用 feColorMatrix 把透明度写成 18 倍减 7）；色块在内容下层、pointer-events: none，标题和正文按压在色块上和压在底色上两种情况核对对比度 ≥ 4.5:1；色块最多 4 个，离开视口时暂停；提供暂停按钮；减少动态效果时停在静态一帧。

## 示例

<style>
:host{container-type:size}
.st{position:relative;height:100%;overflow:hidden;display:flex;flex-direction:column;justify-content:center;gap:6px;padding:16px 20px;background:#f3efe8;color:#1b1b1f;font:12px/1.5 system-ui,-apple-system,"PingFang SC",sans-serif}
.bo{position:absolute;pointer-events:none;mix-blend-mode:multiply;animation:d1 26s ease-in-out infinite alternate}
.bi{width:100%;height:100%;animation:m1 15s ease-in-out infinite alternate}
.b1{right:-8%;top:-22%;width:46%;aspect-ratio:1}
.b1 .bi{background:#ff7a59}
.b2{right:8%;bottom:-34%;width:38%;aspect-ratio:1;animation-name:d2;animation-duration:22s}
.b2 .bi{background:#5cc6b6;animation-duration:13s;animation-delay:-5s}
.b3{right:-4%;bottom:-6%;width:24%;aspect-ratio:1;animation-name:d3;animation-duration:30s}
.b3 .bi{background:#ffd166;filter:blur(3px);animation-duration:18s;animation-delay:-9s}
@keyframes m1{0%{border-radius:30% 70% 62% 38% / 36% 32% 68% 64%}
33%{border-radius:66% 34% 38% 62% / 60% 30% 70% 40%}
66%{border-radius:37% 63% 52% 48% / 44% 62% 38% 56%}
100%{border-radius:55% 45% 34% 66% / 62% 48% 52% 38%}
}
@keyframes d1{to{transform:translate(-14%,12%) rotate(50deg)}
}
@keyframes d2{to{transform:translate(18%,-14%) rotate(-40deg)}
}
@keyframes d3{to{transform:translate(-30%,-24%) rotate(70deg)}
}
.st.paused .bo,.st.paused .bi{animation-play-state:paused}
.k,.h,.p{position:relative;margin:0;max-width:62%}
.k{color:#6a5f50;font-size:11px;letter-spacing:.12em}
.h{font-size:clamp(20px,12cqh,40px);line-height:1.2;font-weight:700}
.p{color:#3d3830}
.pz{position:absolute;right:10px;bottom:10px;display:grid;place-items:center;width:30px;height:30px;padding:0;border:1px solid rgba(27,27,31,.18);border-radius:50%;background:rgba(255,255,255,.75);color:#1b1b1f;cursor:pointer}
.pz:hover{background:#fff}
.pz:focus-visible{outline:2px solid #1b1b1f;outline-offset:2px}
.pz svg{width:12px;height:12px;fill:currentColor}
.pz .pl,.paused .pz .pa{display:none}
.paused .pz .pl{display:block}
@container (min-height:260px){.st{padding:24px 40px;gap:10px}
.k{font-size:12px}
.p{font-size:14px}
.pz{right:16px;bottom:16px;width:36px;height:36px}
}
@media (prefers-reduced-motion:reduce){.bo,.bi{animation:none}
.pz{display:none}
}
</style>

<div class="st"><div class="bo b1" aria-hidden="true"><div class="bi"></div></div><div class="bo b2" aria-hidden="true"><div class="bi"></div></div><div class="bo b3" aria-hidden="true"><div class="bi"></div></div><p class="k">秋季班 · 招生中</p><h2 class="h">让想法<br>慢慢成形</h2><p class="p">12 周创意设计课，周末小班</p><button type="button" class="pz" aria-pressed="false" aria-label="暂停背景动画"><svg class="pa" viewBox="0 0 12 12" aria-hidden="true"><rect x="2" y="1.5" width="3" height="9" rx="1"/><rect x="7" y="1.5" width="3" height="9" rx="1"/></svg><svg class="pl" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 1.5l7 4.5-7 4.5z"/></svg></button></div>

<script type="module">
export default function demo(root) {
  const st = root.querySelector('.st'), b = root.querySelector('.pz');
  b.addEventListener('click', () => { const on = st.classList.toggle('paused'); b.setAttribute('aria-pressed', String(on)); b.setAttribute('aria-label', on ? '继续背景动画' : '暂停背景动画'); });
  // 离开视口时暂停
  const io = new IntersectionObserver(([e]) => { if (!root.host.isConnected) return io.disconnect(); st.querySelectorAll('.bo,.bi').forEach((el) => { el.style.animationPlayState = e.isIntersecting ? '' : 'paused'; }); });
  io.observe(st);
}
</script>
