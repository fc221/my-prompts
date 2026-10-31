---
zh: 栅格与列间距
en: Column grid
order: 10
---

## 是什么

12 列网格，列间距宽屏 24、窄屏 16，区块按列数跨度排布。

## 适合

后台工作区、官网区块、Dashboard 模块排布。

## 不适合

不要每个区块各自算宽度；网格列不要写 1fr（会被宽内容撑开），用 minmax(0, 1fr)。

## 要点

- 12 列，数据密集的后台可用 24 列；列宽 minmax(0, 1fr)，flex 子项加 min-width: 0
- 列间距 < 1024px 时 16px，≥ 1024px 时 24px；行间距与列间距相同
- 常用跨度：8 + 4（主次）、6 + 6、4 + 4 + 4、3 × 4；主模块面积超过首屏一半
- 卡片墙的基准写法是 repeat(auto-fill, minmax(280px, 1fr))，最小列宽全站统一取 280px，不手写每行几张
- 所有区块边缘落在同一套列线上，主要内容的文字起点不超过 3 条对齐线
- 窄屏改为单列或 2 列，网格间距同步降档

## 提示词

用 12 列网格重排{页面}：grid-template-columns: repeat(12, minmax(0, 1fr))，列间距 ≥ 1024px 时 24px、以下 16px；{主模块}跨 8 列、{次要模块}跨 4 列，下方 3 个模块各跨 4 列；所有区块边缘对齐列线；卡片墙用 auto-fill + minmax(280px, 1fr)；768–1023px 改为 6 列、主模块占满一行，小于 768px 单列；子项加 min-width: 0，防止被宽内容撑开。

## 示例

<style>
.s{height:100%;display:flex;flex-direction:column;justify-content:center;gap:8px;padding:12px 16px;background:#fff;font:12px/1.2 system-ui,"PingFang SC",sans-serif;color:#5b616e}
.g{position:relative;flex:1;max-height:140px;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));grid-auto-rows:1fr;gap:8px}
.cols{position:absolute;inset:0;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:8px}
.cols i{background:#fdecea}
.b{position:relative;display:grid;place-items:center;border-radius:6px;background:rgba(59,91,219,.12);box-shadow:inset 0 0 0 1px #8ea2f2;color:#2f49b0;font-weight:600}
p{margin:0;text-align:center}
</style>

<div class="s"><div class="g"><div class="cols"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="b" style="grid-column:span 8">8</div><div class="b" style="grid-column:span 4">4</div><div class="b" style="grid-column:span 4">4</div><div class="b" style="grid-column:span 4">4</div><div class="b" style="grid-column:span 4">4</div><div class="b" style="grid-column:span 6">6</div><div class="b" style="grid-column:span 6">6</div></div><p>12 列 · 列间距 24（窄屏 16）· 区块边缘都落在列线上</p></div>
