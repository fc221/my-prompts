---
zh: 图标尺寸与线宽
en: Icon sizing
order: 10
---

## 是什么

一套风格与线宽，视觉 16 / 20 / 24，点击区域单独放大到 32–44。

## 适合

按钮图标、导航、工具栏、表单控件内的图标。

## 不适合

不要混用线性和面性、粗细不同的图标；不要用 emoji 当图标。

## 要点

- 视觉尺寸三档：16（控件内、行内）、20（按钮、导航）、24（独立图标、空状态小图）
- 同一套图标统一线宽（24 网格上 1.5–2px）、端点和风格，不混用线性与面性
- 图标按钮是正方形，与控件同高（32 / 40），图标居中；触屏点击区域 ≥ 44px
- 纯图标按钮必须有可访问名称（aria-label），装饰图标加 aria-hidden="true"
- 行内图标用 vertical-align: -0.125em 左右对齐文字视觉中心，flex 布局里用 align-items: center
- 图标颜色跟随文字（currentColor），次要图标用 text-secondary
- 同屏持续动的图标不超过 1 个，减少动态效果时静止

## 提示词

统一{项目}的图标：只用一套线性图标，24 网格、线宽 {线宽，默认 1.75px}、圆角端点，颜色用 currentColor；尺寸三档 16（控件内）/ 20（按钮、导航）/ 24（独立图标）；图标按钮为正方形、与控件同高，触屏点击区域 ≥ 44px；纯图标按钮加 aria-label 和悬停提示，装饰图标 aria-hidden；行内图标与文字视觉居中；替换现有的 emoji 图标；菜单 ↔ 关闭等状态切换用形变过渡，减少动态效果时直接切换。

## 示例

<style>
.s{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;padding:16px;background:#fff;color:#1f2329;font:12px/1.2 system-ui,"PingFang SC",sans-serif}
.r{display:flex;align-items:flex-end;gap:28px}
.it{display:flex;flex-direction:column;align-items:center;gap:8px}
small{color:#5b616e;white-space:nowrap}
.o{color:#12805c}
.x{color:#d92d20}
svg{display:block;fill:none;stroke:currentColor;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}
.i16 svg{width:16px;height:16px}
.i20 svg{width:20px;height:20px}
.i24 svg{width:24px;height:24px}
button{width:40px;height:40px;display:grid;place-items:center;border:0;border-radius:8px;background:#f0f2f5;color:#1f2329;outline:1px dashed #8ea2f2;outline-offset:2px;cursor:pointer}
button:hover{background:#e3e6eb}
button:focus-visible{outline:2px solid #3b5bdb}
.set{display:flex;gap:12px}
.set svg{width:20px;height:20px}
.bad svg:nth-child(1){stroke-width:1}
.bad svg:nth-child(2){stroke-width:3}
.bad svg:nth-child(3){fill:currentColor}
</style>

<div class="s"><div class="r"><div class="it"><span class="i16"></span><small>16</small></div><div class="it"><span class="i20"></span><small>20</small></div><div class="it"><span class="i24"></span><small>24</small></div><div class="it"><button aria-label="通知" class="i20"></button><small>点击区 40</small></div></div><div class="r"><div class="it"><div class="set ok"></div><small class="o">✓ 同一套线宽</small></div><div class="it"><div class="set bad"></div><small class="x">✗ 粗细、线面混用</small></div></div></div>

<script type="module">
export default function demo(root) {
  const P = { bell: 'M6 9a6 6 0 0 1 12 0c0 6 2.5 8 2.5 8h-17S6 15 6 9ZM10 20.5a2 2 0 0 0 4 0', search: 'M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14ZM16 16l4 4', home: 'M4 11l8-7 8 7v9h-5v-6H9v6H4Z' };
  const svg = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
  root.querySelectorAll('.i16,.i20,.i24').forEach((el) => (el.innerHTML = svg(P.bell)));
  root.querySelectorAll('.set').forEach((el) => (el.innerHTML = [P.bell, P.search, P.home].map(svg).join('')));
}
</script>
