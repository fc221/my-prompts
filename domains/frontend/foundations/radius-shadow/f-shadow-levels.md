---
zh: 阴影层级与边框
en: Elevation
order: 20
---

## 是什么

0 级只用边框（或极淡的环形阴影），1 级悬停与吸顶，2 级下拉与 Toast，3 级弹窗。

## 适合

卡片、浮层、弹窗、吸顶栏的层级表达。

## 不适合

不要卡片同时用粗边框和大阴影；不要每张卡片都挂大片柔和阴影，也不要用纯黑阴影。

## 要点

- 0 级：普通卡片、表格、面板不加投影，边界二选一：表格和密集面板用 1px border-subtle 或背景差；想让卡片和背景自然融合时，用 0 0 0 1px 的极淡环形阴影（如 rgba(15,23,42,.06)）加一层 1–2px 的近阴影代替实色灰边框；同一页的 0 级卡片只用一种
- 1 级 shadow-1：可点击卡片悬停（配合上移 1–2px）、滚动后的吸顶栏；2 级 shadow-2：下拉、Popover、Toast；3 级 shadow-3：Modal、Drawer
- 每级阴影由一层贴近较浓 + 一层扩散较淡组成，只向下偏移，颜色带品牌色相，不用纯黑
- 浮层有阴影时只留 1px border-subtle 或不加边框；边框、阴影、背景三者不同时加重
- 暗色里阴影几乎看不见，层级改靠更亮的表面色加 1px 浅边框
- 同一层级全站用同一个阴影令牌；彩色发光阴影只给品牌特殊时刻

## 提示词

为{项目}定义阴影层级：0 级不加投影，表格和密集面板用 1px border-subtle，想和背景融合的卡片改用 0 0 0 1px 极淡环形阴影加一层 1–2px 近阴影，同一页只用一种；shadow-1 用于可点击卡片悬停（同时上移 2px）与滚动后的吸顶栏；shadow-2 用于下拉、Popover、Toast；shadow-3 用于弹窗、抽屉；每级两层（贴近较浓 + 扩散较淡），只向下偏移，颜色用带品牌色相的深色；浮层不再加粗边框；暗色下改用更亮的表面色 + 1px 浅边框；阴影过渡用伪元素的 opacity，减少动态效果时不位移。

## 示例

<style>
.s{height:100%;display:flex;align-items:center;justify-content:center;gap:16px;padding:16px 20px;background:#f5f6f8;color:#1f2329;font:12px/1.4 system-ui,"PingFang SC",sans-serif}
.c{flex:1;max-width:140px;height:min(120px,72%);display:flex;flex-direction:column;justify-content:space-between;padding:12px;border-radius:12px;background:#fff;transition:transform .16s cubic-bezier(.2,0,0,1),box-shadow .16s cubic-bezier(.2,0,0,1)}
.c b{font-size:24px;line-height:1;font-weight:600;color:#3b5bdb}
.c span{color:#5b616e}
.l0{box-shadow:0 0 0 1px #e3e6eb;cursor:pointer}
.l1,.l0:hover{box-shadow:0 1px 2px rgba(24,36,80,.06),0 2px 8px rgba(24,36,80,.08)}
.l0:hover{transform:translateY(-2px)}
.l2{box-shadow:0 2px 4px rgba(24,36,80,.06),0 8px 20px rgba(24,36,80,.12)}
.l3{box-shadow:0 4px 8px rgba(24,36,80,.08),0 20px 40px rgba(24,36,80,.18)}
@media (prefers-reduced-motion:reduce){.l0:hover{transform:none}
}
</style>

<div class="s"><div class="c l0"><b>0</b><span>边框<br>悬停试试</span></div><div class="c l1"><b>1</b><span>悬停卡片<br>吸顶栏</span></div><div class="c l2"><b>2</b><span>下拉<br>Toast</span></div><div class="c l3"><b>3</b><span>弹窗<br>抽屉</span></div></div>
