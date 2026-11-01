---
zh: 圆形扩散切换
en: Circular reveal transition
order: 20
---

## 是什么

切换主题或页面时，新画面从点击的位置像水波一样扩散开，铺满整个区域。

## 适合

明暗主题切换、进入一个独立功能（低频操作）。

## 注意

不要用在高频的标签切换上；过渡期间页面不响应点击，时长不要超过 500ms。

## 提示词

给{明暗主题切换按钮}加「圆形扩散切换」：用 View Transitions API 配合 clip-path: circle()，新主题从按钮被点击的位置向外扩散到铺满屏幕（终点半径取圆心到最远一角的距离），约 450ms、缓出；切回浅色时可以反过来，从铺满收缩回按钮；键盘触发（click 事件的 detail 为 0）时以按钮中心为圆心；浏览器不支持、减少动态效果，或切换前后实际明暗相同（如从深色切到“跟随系统”而系统也是深色）时直接切换。主题在页面首次绘制前就应用（head 里的小脚本读本地存储），避免打开时闪一下；带颜色的元素不要加颜色过渡，否则扩散圈里还在慢慢变色。过渡期间浏览器会把点击交给根元素、页面暂时点不动，所以时长控制在 400–500ms，不要加长。

## 示例

<style>
.zone{position:relative;height:100%;display:grid;place-items:center;background:#fff;overflow:hidden}
.layer{position:absolute;inset:0;background:#0f1115;clip-path:circle(0 at var(--x,50%) var(--y,50%));transition:clip-path .45s cubic-bezier(.2,0,0,1)}
.zone.dark .layer{clip-path:circle(150% at var(--x,50%) var(--y,50%))}
button{position:relative;font:600 14px system-ui;padding:9px 16px;border-radius:999px;border:1px solid #d9dbe0;background:#fff;cursor:pointer}
</style>

<div class="zone"><div class="layer"></div><button>切换主题</button></div>

<script type="module">
export default function demo(root) {
  const z = root.querySelector('.zone'); root.querySelector('button').addEventListener('click', (e) => { const r = z.getBoundingClientRect(); const x = e.clientX ? e.clientX - r.left : r.width / 2, y = e.clientY ? e.clientY - r.top : r.height / 2; z.style.setProperty('--x', x + 'px'); z.style.setProperty('--y', y + 'px'); z.classList.toggle('dark'); });
}
</script>
