---
zh: 四档关系间距
en: Proximity tiers
order: 20
---

## 是什么

越相关越近：一体 4–8、同组 8–16、组间 24–32、区块 40–64。

## 适合

表单、设置页、卡片内部、页面区块排布；页面“乱、散、挤”时先查这一条。

## 不适合

不要所有间距都用同一个值；相邻两档不要只差一点（组内 16、组间 20 看不出分组）。

## 要点

- 一体（图标与文字、标签与输入框、数值与单位、标题与说明）4–8px
- 同组（表单字段、列表项、卡片内元素）8–16px，页面级表单字段 24px
- 组间（卡片之间、表单分组、筛选区到表格）24–32px；只靠留白分组时 40px
- 区块（页头到主体、页面大区域）40–64px；官网区块 clamp(56px, 8vw, 112px)
- 每档至少是上一档的 1.5–2 倍；不够区分时加一条分割线，不在两个相邻值之间各取一点
- 标题归属下方：标题上方间距至少是下方的 2 倍（区块标题上 32、下 12–16）
- 同一种关系全页只用一个值

## 提示词

按四档关系间距重排{页面}：一体（图标与文字、标签与输入框、标题与说明）8px，同组（字段、列表项、卡片内元素）16px（页面表单 24px），组间（卡片之间、表单分组、筛选区到表格）32px，区块（页头到主体、大区域之间）48px；标题上方间距是下方的 2 倍；同一种关系全页一个值；用父容器 gap 实现，组件不带外边距；小于 768px 时组间 24、区块 32，其余不变。

## 示例

<style>
.s{height:100%;display:flex;align-items:center;justify-content:center;gap:24px;padding:12px 16px;background:#f5f6f8;font:12px/1.2 system-ui,"PingFang SC",sans-serif}
.p{flex:1;max-width:220px;display:grid;gap:8px;align-content:start;padding:12px;border-radius:12px;background:#fff;border:1px solid #e3e6eb}
em{font-style:normal;font-weight:600}
.x{color:#d92d20}
.o{color:#12805c}
.f,.g{display:flex;flex-direction:column}
.f.eq{gap:12px}
.f:not(.eq){gap:32px}
.g{gap:8px}
b,i{display:block;border-radius:3px}
b{height:6px;width:40%;background:#1f2329}
i{height:6px;background:#d5d9e0}
i:nth-of-type(2){width:70%}
</style>

<div class="s"><div class="p"><em class="x">✗ 全部 12px，看不出分组</em><div class="f eq"><b></b><i></i><i></i><b></b><i></i><i></i></div></div><div class="p"><em class="o">✓ 组内 8 · 组间 32</em><div class="f"><div class="g"><b></b><i></i><i></i></div><div class="g"><b></b><i></i><i></i></div></div></div></div>
