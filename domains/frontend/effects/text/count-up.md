---
zh: 数字滚动计数
en: Count-up number
aka: 数字滚动 数字翻牌 数字跳动 计数器
order: 100
---

## 是什么

数字从 0 快速增长到目标值，越接近终点越慢，最后稳稳停住。

## 适合

真实的统计数字（不要编造）进入视口时。

## 注意

进度要限制在 0–1；之后的实时更新直接替换，不再反复滚动；没有真实数据就不要做数字区块。

## 提示词

把{真实统计数字}做成「数字滚动计数」：进入视口时从 0 增长到目标值，800ms 内完成，缓出（越接近终点越慢），千分位和单位一直显示；数字用等宽数字（tabular-nums）并预留宽度；只播一次；减少动态效果时直接显示最终值。

## 示例

<style>
:host{display:grid;place-items:center;height:100%;background:#fff}
.n{font:700 34px system-ui;font-variant-numeric:tabular-nums;color:#18181b}
small{font:500 13px system-ui;color:#6b6f76;margin-left:6px}
button{font:13px system-ui}
</style>

<div class="n"><b>0</b><small>笔订单 / 今年</small></div><button type="button" class="ctl">重播</button>

<script type="module">
export default function demo(root) {
  const b = root.querySelector('b'), target = 1284360; const run = () => { const t0 = performance.now(), dur = 800; const step = (now) => { const p = Math.min(1, Math.max(0, (now - t0) / dur)), e = 1 - Math.pow(1 - p, 3); b.textContent = Math.round(target * e).toLocaleString(); if (p < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) b.textContent = target.toLocaleString(); else run(); root.querySelector('button').onclick = run;
}
</script>
