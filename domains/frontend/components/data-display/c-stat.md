---
zh: 统计指标卡
en: Stat card
order: 50
---

## 是什么

指标名、大号数值和单位、与上期的对比；同级指标并排放在一个容器里。

## 适合

看板和后台首页顶部的关键指标：收入、订单数、转化率、活跃用户。

## 不适合

不要给每个指标配彩色圆底图标和迷你趋势线；指标超过 6 个时只留关键的，其余放进表格；要看趋势用单独的图表。

## 要点

- 用组件库的统计数值：Element Plus el-statistic（title、value、precision、suffix、group-separator、value-style）、Naive UI n-statistic（label、value、tabular-nums，prefix / suffix 插槽）、Ant Design Vue a-statistic（title、value、precision、suffix、groupSeparator、valueStyle）；对比那一行组件没有，在它下方自己写
- 结构固定：指标名（14px 次要色）→ 数值（24–32px、600、等宽数字：Naive UI 开 tabular-nums，其余在 value-style / valueStyle 里设字号和 font-variant-numeric）+ 单位（放 suffix，约数值一半大、基线对齐）→ 对比（变化值或百分比 + 箭头）
- 同级指标放进一个容器，用 1px 竖线等分，不每项一张带阴影的卡；同行等高
- 涨跌同时用箭头或正负号和颜色；先按业务定义好坏：利好用成功色，利空用警告色，持平用中性色
- 变化为零照常写 0（“0%”或“持平”），上期为零写“新增 4”，不写“+100%”；只有没有上期数据、无法比较时才显示“—”
- 数值统一千分位（group-separator / groupSeparator，Naive UI 自己格式化后传字符串）和精度（precision）；缩写（12.8 万）时悬停或详情可看精确值；空值写“—”并说明含义
- 共享的时间范围和对比周期在区块标题旁写一次；加载用骨架（el-skeleton / n-skeleton / a-skeleton），单项失败只在该项内显示错误与重试
- 窄屏两列或横向滑动，数值字号不小于 20px

## 提示词

在{运营看板顶部}放 4 个统计指标：用项目组件库自带的统计数值（Element Plus el-statistic title、value、precision、suffix、group-separator；Naive UI n-statistic label、value、tabular-nums + suffix 插槽；Ant Design Vue a-statistic title、value、precision、suffix、groupSeparator），不手写数字排版。今日收入、订单数、转化率、退款率放在同一个白底容器里用竖线等分，不每项一张卡；每项为指标名（14px 次要色）、数值（28px、600、等宽数字，单位一半大小、基线对齐）、下方一行对比“↑ 12.4%”；收入、订单上涨是利好用成功色，退款率上涨是利空用警告色；持平写“0%”用中性色，上期为零写“新增 N”，没有上期数据才显示“—”；区块标题旁写一次“今日 · 较昨日同时段”；切换时间范围时用骨架过渡；单项失败只在该项内重试；窄屏两列，数值不小于 20px。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{width:100%;max-width:520px;display:flex;flex-direction:column;gap:12px}
.hd{display:flex;align-items:center;justify-content:space-between;gap:8px}
.hd>span{display:flex;align-items:baseline;gap:8px}
.v{flex-wrap:wrap;min-width:0}
.seg{display:inline-flex;gap:2px;padding:2px;border-radius:6px;background:#e3e6eb}
.seg label{position:relative}
.seg input{position:absolute;opacity:0;pointer-events:none}
.seg span{display:inline-flex;align-items:center;height:24px;padding:0 10px;border-radius:4px;font-size:13px;color:#5b616e;cursor:pointer}
.seg input:checked+span{background:#fff;color:#1f2329;box-shadow:0 1px 2px rgba(31,35,41,.16)}
.seg input:focus-visible+span{outline:2px solid #3b5bdb}
.row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));padding:16px 0;background:#fff;border:1px solid #e3e6eb;border-radius:12px}
.it{display:flex;flex-direction:column;gap:2px;min-width:0;padding:0 16px}
.it+.it{border-left:1px solid #e3e6eb}
.nm{color:#5b616e}
.v{display:flex;align-items:baseline;gap:4px;white-space:nowrap}
.n{font-size:24px;line-height:32px;font-weight:600;font-variant-numeric:tabular-nums}
.v em{font-style:normal;font-size:12px;color:#5b616e}
.d{font-size:12px;line-height:20px;white-space:nowrap;font-variant-numeric:tabular-nums}
.up{color:#12805c}
.dn{color:#b54708}
.fl{color:#5b616e}
.ld .n,.ld .d{color:transparent;background:#e3e6eb;border-radius:4px}
@container (max-width:340px){.it{padding:0 12px}
.n{font-size:20px}
}
</style>

<div class="s"><div class="w"><div class="hd"><span><b>核心指标</b><span class="help">较上一周期</span></span><div class="seg" role="radiogroup" aria-label="时间范围"><label><input type="radio" name="r" value="0" checked><span>今日</span></label><label><input type="radio" name="r" value="1"><span>本周</span></label></div></div><div class="row" aria-live="polite"></div></div></div>

<script type="module">
export default function demo(root) {
  const row = root.querySelector('.row');
  const S = [
    [['收入', '12.8', '万元', '↑ 12.4%', 'up', '收入上涨 12.4%'], ['订单数', '1,284', '单', '—', 'fl', '订单数持平'], ['退款单', '23', '单', '↑ 4 单', 'dn', '退款单增加 4 单']],
    [['收入', '86.3', '万元', '↑ 8.1%', 'up', '收入上涨 8.1%'], ['订单数', '8,912', '单', '↓ 2.3%', 'dn', '订单数下降 2.3%'], ['退款单', '128', '单', '↓ 12 单', 'up', '退款单减少 12 单']],
  ];
  const draw = (k) => { row.innerHTML = S[k].map(([nm, n, u, d, c, sr]) => `<div class="it"><span class="nm">${nm}</span><span class="v"><b class="n">${n}</b><em>${u}</em></span><span class="d ${c}" aria-hidden="true">${d}</span><span class="sr">${sr}</span></div>`).join(''); };
  root.querySelectorAll('[name=r]').forEach((r) => r.addEventListener('change', () => { row.classList.add('ld'); row.setAttribute('aria-busy', 'true'); setTimeout(() => { draw(+r.value); row.classList.remove('ld'); row.removeAttribute('aria-busy'); }, 400); }));
  draw(0);
}
</script>
