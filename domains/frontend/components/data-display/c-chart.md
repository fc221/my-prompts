---
zh: 图表选型与规范
en: Chart choice & style
order: 110
---

## 是什么

按要表达的关系选图：趋势用折线、比较用条形、占比用环形，配色克制、标注完整。

## 适合

看板、报表、详情页里需要看趋势、比较或构成的数据。

## 不适合

只有一两个数字时直接写数字；要查精确值时用表格；不用 3D 图和彩虹配色；分类超过 5–6 个的饼图改成条形图。

## 要点

- 选型：趋势用折线，比较用条形或柱状（类目名长时用横向条形），占比用环形（≤ 5 类，多的合并为“其他”），分布用直方图
- 标注完整：标题写指标、单位和时间范围，必要时注明数据来源和口径
- 折线 2px、不平滑、默认不画数据点；网格线 3–5 条且很淡，不画 y 轴线；单系列不放图例
- 只有两组对比（本期 / 上期）用品牌色 + 中性灰；多分类按固定顺序取色，同一维度在所有图表同色，一屏不超过 4–6 个色相
- 颜色之外用线型、标签或形状区分；数值大小用单色相深浅，不用彩虹渐变
- 悬停提示有键盘和触屏等效（聚焦图表后左右键移动）；图表有文字摘要给读屏；空图表画零线并写一句说明
- 和上期对比：上期是等长的前一段，本月对比上月同期，今天比到同一时刻，并写出上期的起止日期；本期 2px 品牌色实线，上期 1–1.5px 灰色虚线，不做面积填充
- 环形图用细环，扇区上不写标签，旁边列出数值和占比
- 计划、预测、待定的数值用同色 45° 斜纹（条纹间隔 4–6px），实际值用实心；折线的预测段用同色虚线；图例画同样的斜纹或虚线色块
- 环形图点某一段，这一段沿半径外移 6–8px，中心显示它的名称和占比；仪表盘分三段色区，载入时指针从 0 扫到读数（约 600ms）；完成度圆环超过 100% 时用深一档的颜色画第二圈
- 切换周 / 月这类维度时，已有的柱和点平滑过渡到新值，不清空重画；按住某根柱子时其余柱子变淡，松手恢复；减少动态效果时直接换

## 提示词

在{销售看板}里画“近 7 天订单量”折线图：标题写指标、单位（单）和时间范围；本期用品牌色 2px 实线，上期用中性灰虚线，不平滑、不画数据点；横向网格线 3 条且很淡，不画 y 轴线；悬停或聚焦后按左右键移动时显示竖向参考线、两期数值和日期；图例写在标题旁；有预测值时预测段用同色虚线，图例画同样的虚线样；图表有一句文字摘要给读屏；空数据画零线并写“这段时间没有订单”；宽度自适应，窄屏减少横轴刻度。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{width:100%;max-width:640px;display:flex;flex-direction:column;gap:8px;padding-right:12px}
.hd{display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap}
.hd b{font-weight:600}
.lg{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:#5b616e}
.lg i{width:14px;height:0;border-top:2px solid #3b5bdb}
.lg i.b{margin-left:8px;border-top:2px dashed #8a909c}
.body{display:flex;gap:8px}
.ya{flex:none;width:32px;display:flex;flex-direction:column;justify-content:space-between;margin:-8px 0;font-size:12px;line-height:16px;color:#5b616e;text-align:right;font-variant-numeric:tabular-nums}
.ch{position:relative;flex:1;height:92px;cursor:crosshair}
.ch:focus-visible{outline-offset:4px}
svg{display:block;width:100%;height:100%;overflow:visible}
.gr{stroke:#eceef2;stroke-width:1;vector-effect:non-scaling-stroke}
.base{stroke:#c9ced6;stroke-width:1;vector-effect:non-scaling-stroke}
polyline{fill:none;stroke-width:2;stroke-linejoin:round;vector-effect:non-scaling-stroke}
.pa{stroke:#3b5bdb}
.pb{stroke:#8a909c;stroke-dasharray:5 4}
.cx{stroke:#8a909c;stroke-width:1;vector-effect:non-scaling-stroke}
.dot{position:absolute;display:none;width:8px;height:8px;margin:-4px 0 0 -4px;border-radius:50%;border:2px solid #fff;pointer-events:none}
.da{background:#3b5bdb}
.db{background:#8a909c}
.tip{position:absolute;top:-4px;padding:4px 8px;border-radius:6px;background:#1f2329;color:#fff;font-size:12px;line-height:18px;white-space:nowrap;pointer-events:none;font-variant-numeric:tabular-nums}
.tip:empty{display:none}
.xa{position:relative;height:20px;margin-left:40px;font-size:12px;line-height:20px;color:#5b616e;font-variant-numeric:tabular-nums}
.xa span{position:absolute;transform:translateX(-50%);white-space:nowrap}
@container (max-width:360px){.xa span:nth-child(even){visibility:hidden}
}
@container (min-height:260px){.ch{height:150px}
}
</style>

<div class="s"><div class="w"><div class="hd"><b>订单量（单）· 近 7 天</b><span class="lg"><i class="a"></i>本期<i class="b"></i>上期</span></div><div class="body"><div class="ya" aria-hidden="true"><span>200</span><span>100</span><span>0</span></div><div class="ch" tabindex="0" aria-label="近 7 天订单量折线图：本期从 120 单升到 186 单，上期在 110 到 150 单之间。聚焦后用左右方向键查看每天的数值"><svg viewBox="0 0 600 100" preserveAspectRatio="none" aria-hidden="true"><path class="gr" d="M0 0.5H600M0 50H600"/><path class="base" d="M0 99.5H600"/><polyline class="pb"/><polyline class="pa"/><line class="cx" y1="0" y2="100" style="display:none"/></svg><i class="dot da"></i><i class="dot db"></i><div class="tip" role="status"></div></div></div><div class="xa" aria-hidden="true"><span style="left:0">10-19</span><span style="left:16.667%">10-20</span><span style="left:33.333%">10-21</span><span style="left:50%">10-22</span><span style="left:66.667%">10-23</span><span style="left:83.333%">10-24</span><span style="left:100%">10-25</span></div></div></div>

<script type="module">
export default function demo(root) {
  const A = [120, 132, 128, 151, 160, 172, 186], Bv = [118, 124, 110, 135, 142, 150, 138], L = ['10-19', '10-20', '10-21', '10-22', '10-23', '10-24', '10-25'];
  const pts = (d) => d.map((v, i) => `${i * 100},${100 - v / 2}`).join(' ');
  root.querySelector('.pa').setAttribute('points', pts(A)); root.querySelector('.pb').setAttribute('points', pts(Bv));
  const ch = root.querySelector('.ch'), cx = root.querySelector('.cx'), tip = root.querySelector('.tip'), da = root.querySelector('.da'), db = root.querySelector('.db'); let k = -1;
  const show = (i) => {
    k = Math.max(0, Math.min(6, i)); const x = k / 6 * 100;
    cx.setAttribute('x1', k * 100); cx.setAttribute('x2', k * 100); cx.style.display = '';
    tip.style.left = x + '%'; tip.style.transform = `translateX(${k < 2 ? 8 : k > 4 ? -100 : -50}%)` + (k > 4 ? ' translateX(-8px)' : '');
    tip.textContent = `${L[k]}　本期 ${A[k]} · 上期 ${Bv[k]}`;
    da.style.cssText = `display:block;left:${x}%;top:${100 - A[k] / 2}%`; db.style.cssText = `display:block;left:${x}%;top:${100 - Bv[k] / 2}%`;
  };
  const hide = () => { k = -1; cx.style.display = 'none'; tip.textContent = ''; da.style.display = db.style.display = 'none'; };
  ch.addEventListener('pointermove', (e) => { const r = ch.getBoundingClientRect(); show(Math.round((e.clientX - r.left) / r.width * 6)); });
  ch.addEventListener('pointerleave', () => { if (root.activeElement !== ch) hide(); });
  ch.addEventListener('focus', () => { if (k < 0) show(6); }); ch.addEventListener('blur', hide);
  ch.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); show((k < 0 ? 6 : k) + (e.key === 'ArrowRight' ? 1 : -1)); } else if (e.key === 'Escape') hide(); });
}
</script>
