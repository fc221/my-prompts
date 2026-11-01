---
zh: 图表怎么选
en: Choosing a chart type
aka: 图表选型 选图表 柱形图 条形图 折线图 饼图 圆环图 瀑布图 散点图 组合图
order: 10
---

## 是什么

先想清楚这张图要回答哪类问题：比大小、看趋势、看构成、看增减来源、看分布、看关系，再选对应的图表。Excel 的“推荐的图表”只按数据形状猜，不知道你想说明什么。

## 适合

周报、月报里的配图；看板上的图表区；汇报材料里需要一眼看出结论的那一页。

## 不适合

一个数字就说得清的（本月收入 25.8 万）用指标卡，见「指标汇总页」；每行一条的小趋势用「迷你图与数据条」；要点选筛选、整页联动的见「动态看板」。

## 注意

饼图和圆环图只放一个系列，各块加起来是一个整体，不超过 5 块，其余合并为“其他”；块多了或要比大小，改用排好序的条形图。单位不同的两个指标（销售额和增长率）拆成上下两张图、横轴对齐，不用次坐标轴把它们叠在一起。

## 要点

- 比大小：类别少于 12 个、名称短用簇状柱形图；名称长或类别多用条形图，并按数值从大到小排序（先排序作图数据，或用 SORTBY 生成作图区）。
- 看趋势：时间放横轴，用折线图，至少 6 个时间点；只有两三个时间点用柱形图。缺数据的月份留空，在“隐藏和空单元格”里选“空距”，不当成 0 画。
- 看构成：一个整体分几块用饼图或圆环图；构成随时间怎么变用百分比堆积柱形图，系列不超过 5 个。
- 看增减来源：从期初到期末是哪些项目加上去、减下来的，用瀑布图（Excel 2016 起有），期初和期末两根柱设为汇总柱，增加和减少各用一种颜色。
- 看分布和关系：价格带、年龄段的分布用直方图，箱宽设成整数（如每 50 元一档）；两个指标的关系（推广费和销售额）用散点图，需要时加趋势线并显示 R²。
- 柱形图和条形图的数值轴从 0 开始；去掉 3D、阴影、渐变和多余网格线；数据标签只标最新值或最大值；系列不超过 4 个时直接标在线尾或柱旁，代替图例。
- 标题写结论，如“10 月支出环比增加 2.2%，主要是采购”，不写“支出图表”；坐标轴标题写单位（万元、%）。
- 作图数据单独放在一个区域（透视表或公式汇总好），图表只引用这个区域；源数据会增加时用超级表或透视图，图表范围才会跟着扩展。

## 提示词

帮我为{报表名，如 11 月门店经营月报}选图表并做出来。数据在工作表“{工作表名}”，列为：{列名和示例值}。这份报表要回答的问题：{问题清单，如 哪个门店卖得最好；近 12 个月销售趋势；支出由哪些类别构成；利润从上月到本月是怎么变化的}。
1. 每个问题先判断属于比大小、看趋势、看构成、看增减来源、看分布还是看关系，再选图表：比大小用排序后的条形图或柱形图，趋势用折线图，构成用饼图或圆环图（不超过 5 块，其余并入“其他”）或百分比堆积柱形图，增减来源用瀑布图，分布用直方图，关系用散点图。单位不同的两个指标拆成两张图，不用次坐标轴。
2. 每张图的作图数据单独放在“作图数据”工作表，用 SUMIFS 或数据透视表从源数据汇总；源数据会增加，范围要能自动扩展。
3. 格式：柱形图数值轴从 0 开始；去掉 3D、阴影和渐变；只给最新值或最大值加数据标签；标题写一句结论，坐标轴标题写单位；同一个类别在各张图里颜色一致。
4. 缺数据的月份显示为空距。
交付时列出每个问题对应的图表类型和选择理由、作图数据的位置和公式；我的 Excel 版本是 {Microsoft 365 / Excel 2016 / WPS}，版本不支持的图表（如瀑布图、直方图）给出替代做法。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.m-g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;width:620px}
.m-c{display:grid;grid-template-rows:auto 76px;gap:6px;padding:8px 10px 10px;border:1px solid #d8dce2;border-radius:8px;background:#fff}
.m-q{display:flex;align-items:baseline;gap:6px;margin:0;font-size:12px;line-height:1.3}
.m-q b{font-weight:700;color:#101828}
.m-q span{color:#5d6675;font-size:11px}
.m-q span::before{content:"→ ";color:#98a2b3}
.m-v{position:relative;min-width:0}
.m-v svg{display:block;width:100%;height:100%}
.m-bars{display:grid;gap:4px;align-content:center;height:100%}
.m-bars p{display:grid;grid-template-columns:40px minmax(0,1fr) 26px;align-items:center;gap:5px;margin:0;font-size:9.5px;color:#344054;line-height:1}
.m-bars i{display:block;height:9px;border-radius:0 3px 3px 0;background:#2a78d6}
.m-bars em{color:#5d6675;font-variant-numeric:tabular-nums;text-align:right}
.m-donut{display:flex;align-items:center;gap:10px;height:100%}
.m-ring{flex:none;width:66px;height:66px;border-radius:50%;background:conic-gradient(#2a78d6 0 47%,#fff 0 47.6%,#eb6834 0 75%,#fff 0 75.6%,#1baf7a 0 90%,#fff 0 90.6%,#eda100 0 99.4%,#fff 0);-webkit-mask:radial-gradient(circle,transparent 19px,#000 20px);mask:radial-gradient(circle,transparent 19px,#000 20px)}
.m-leg{display:grid;gap:2px;margin:0;padding:0;list-style:none;font-size:9.5px;color:#344054;line-height:1.3}
.m-leg li{display:flex;align-items:center;gap:4px}
.m-leg li::before{content:"";width:7px;height:7px;border-radius:2px;background:var(--c)}
.m-wf{display:flex;gap:5px;height:62px;padding:0 2px;border-bottom:1px solid #c4cad3}
.m-wf span{position:relative;flex:1}
.m-wf i{position:absolute;left:0;right:0;bottom:var(--b);height:var(--h);border-radius:2px;background:var(--c,#2a78d6)}
.m-wl{display:flex;gap:5px;padding:2px 2px 0;font-size:9px;color:#5d6675}
.m-wl span{flex:1;text-align:center;white-space:nowrap}
.m-hist{display:flex;align-items:flex-end;gap:1px;height:62px;border-bottom:1px solid #c4cad3}
.m-hist i{flex:1;height:var(--h);background:#2a78d6;border-radius:2px 2px 0 0}
.m-hl{display:flex;justify-content:space-between;padding-top:2px;font-size:9px;color:#5d6675}
</style>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  const card = (q, name, body) => `<div class="m-c"><p class="m-q"><b>${q}</b><span>${name}</span></p><div class="m-v">${body}</div></div>`;
  const bars = [['春熙路', 100, '58.2'], ['交子大道', 81, '47.1'], ['天府广场', 66, '38.4'], ['太古里', 52, '30.3'], ['双流机场', 34, '19.8']]
    .map(([n, w, v]) => `<p><span>${n}</span><i style="width:${w}%"></i><em>${v}</em></p>`).join('');
  const pts = [18.6, 12.4, 21.3, 19.8, 22.5, 24.1, 20.7, 19.2, 23.6, 25.8];
  const xy = pts.map((v, i) => [8 + i * 16, 58 - (v - 10) * 2.9]);
  const line = `<svg viewBox="0 0 170 66" aria-hidden="true"><line x1="4" y1="62" x2="166" y2="62" stroke="#c4cad3"/><polyline points="${xy.map((p) => p.join(',')).join(' ')}" fill="none" stroke="#2a78d6" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${xy[9][0]}" cy="${xy[9][1]}" r="3.5" fill="#2a78d6" stroke="#fff" stroke-width="1.5"/><text x="${xy[9][0] - 6}" y="${xy[9][1] - 7}" font-size="9" fill="#344054" text-anchor="end">10 月 25.8</text></svg>`;
  const donut = `<div class="m-donut"><div class="m-ring"></div><ul class="m-leg"><li style="--c:#2a78d6">工资 47%</li><li style="--c:#eb6834">采购 28%</li><li style="--c:#1baf7a">房租 15%</li><li style="--c:#eda100">其他 10%</li></ul></div>`;
  const wf = [['0', '60%'], ['60%', '26%', '#1baf7a'], ['56%', '30%', '#eb6834'], ['44%', '12%', '#eb6834'], ['0', '44%']]
    .map(([b, h, c]) => `<span><i style="--b:${b};--h:${h}${c ? ';--c:' + c : ''}"></i></span>`).join('');
  const waterfall = `<div class="m-wf">${wf}</div><div class="m-wl"><span>期初</span><span>+收入</span><span>−工资</span><span>−采购</span><span>期末</span></div>`;
  const hist = `<div class="m-hist">${[12, 28, 52, 80, 96, 74, 46, 24, 10].map((h) => `<i style="--h:${h}%"></i>`).join('')}</div><div class="m-hl"><span>0</span><span>客单价 · 每 50 元一档</span><span>450</span></div>`;
  const dots = [[14, 52], [24, 48], [32, 50], [40, 41], [52, 40], [60, 33], [70, 36], [82, 27], [92, 28], [104, 21], [116, 20], [128, 13], [140, 15], [152, 9]];
  const scatter = `<svg viewBox="0 0 170 66" aria-hidden="true"><line x1="6" y1="62" x2="166" y2="62" stroke="#c4cad3"/><line x1="6" y1="2" x2="6" y2="62" stroke="#c4cad3"/><line x1="10" y1="55" x2="160" y2="9" stroke="#98a2b3" stroke-dasharray="3 3"/>${dots.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" fill="#2a78d6" fill-opacity=".85" stroke="#fff" stroke-width="1"/>`).join('')}<text x="164" y="58" font-size="8.5" fill="#5d6675" text-anchor="end">推广费</text><text x="10" y="9" font-size="8.5" fill="#5d6675">销售额 R² 0.91</text></svg>`;
  draw(root, `<div class="m-g">
    ${card('比大小', '条形图，从大到小排', `<div class="m-bars">${bars}</div>`)}
    ${card('看趋势', '折线图，≥ 6 个点', line)}
    ${card('看构成', '圆环图，≤ 5 块', donut)}
    ${card('看增减来源', '瀑布图', waterfall)}
    ${card('看分布', '直方图', hist)}
    ${card('看关系', '散点图 + 趋势线', scatter)}
  </div>`, { title: '图表怎么选 · 先问这张图要回答什么', min: 0.45 });
}
</script>
