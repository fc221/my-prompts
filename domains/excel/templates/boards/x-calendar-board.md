---
zh: 收支日历看板
en: Income and expense calendar board
aka: 日历看板 收支日历 记账日历 月历看板 每日收支 日历记账
order: 30
---

## 是什么

把一个月的收支画成一张月历：顶部选年份和月份，三张指标卡写本月收入、支出、结余；下面是周一到周日的月历网格，每天一格，写当天的收入（绿）和支出（红），再配一条按支出大小画的数据条，今天高亮、周末浅底。格子里的数全部用 SUMIFS 按日期从明细表取，换个月份整张日历跟着变。

## 适合

个人和家庭记账；小店、工作室的每日流水；想一眼看出哪天花得多、哪几天没进账的场景。

## 不适合

要按类别、账户看构成和趋势的，用「动态看板」；只记逐笔流水和余额的，用「收支记账表」或「现金日记账」。

## 注意

月历第一格不是 1 号，而是 1 号所在那一周的周一：=DATE(年,月,1)-WEEKDAY(DATE(年,月,1),2)+1。WEEKDAY 的第二个参数写 2，周一才算 1；漏写就按周日算 1，整张月历错一天。上月末、下月初那几格要把字调浅，金额留空，否则会被当成本月的数。

## 要点

- 分表：明细（超级表：日期、类别、摘要、收入、支出，日期只存到天）和看板；看板顶部放年份下拉和月份下拉（1–12），定义名称“年”“月”，全表公式都引用它们。
- 指标卡：本月收入 =SUMIFS(明细[收入],明细[日期],">="&DATE(年,月,1),明细[日期],"<="&EOMONTH(DATE(年,月,1),0))，支出同理，结余 = 收入 − 支出；卡片下面一行写入账笔数、日均支出或结余率。
- 网格：7 列 × 6 周，表头写 一 二 三 四 五 六 日；每天占 3 行，依次是日期、收入、支出。第一格用上面的 DATE 和 WEEKDAY 公式，同一周往右每格 +1，下一周的第一格 = 上一周第一格 +7；日期格用自定义格式 d，只显示几号。
- 每天的金额：收入格 =IF(MONTH(日期格)<>月,"",SUMIFS(明细[收入],明细[日期],日期格))，支出格同理；格式用 #,##0.00;-#,##0.00;;@，当天没有发生额就显示空白。明细里的日期带时间时，条件改成 ">="&日期格 和 "<"&日期格+1。
- 颜色：收入字绿、支出字红；支出格加数据条，最小值设数字 0，最大值设公式 =MAX(本月支出区域)，整月用同一把尺子。
- 高亮用条件格式，按“今天、非本月、周末”的顺序排，并勾“如果为真则停止”：今天 =日期格=TODAY() 加粗边框和浅蓝底；非本月 =MONTH(日期格)<>月 字变浅灰；周末 =WEEKDAY(日期格,2)>5 浅灰底。
- 6 周一定要留：31 天且 1 号是周六或周日的月份（如 2026 年 8 月）、30 天且 1 号是周日的月份，都要排到第 6 行；用不到的那行整行显示成浅灰。
- 版式：取消网格线，7 列等宽（列宽约 14），每天的 3 行等高；横向 A4 一页打印，月份和指标卡放在打印区域里。

## 提示词

帮我做一份{用途，如 家庭收支}日历看板 Excel。
数据：超级表“{明细表名}”，列为{列名，如 日期、类别、摘要、收入、支出}，日期只到天。
1. 看板顶部放年份下拉（{起止年份}）和月份下拉（1–12），定义名称“年”“月”。
2. 下面三张指标卡：本月收入、本月支出、本月结余，用 SUMIFS 按“本月 1 日到月末”汇总；卡片下写{补充指标，如 入账笔数、日均支出、结余率}。
3. 月历网格 7 列（周一到周日）× 6 周，每天占 3 行：日期、收入、支出。第一格 =DATE(年,月,1)-WEEKDAY(DATE(年,月,1),2)+1，往右每格 +1，下一周第一格 = 上一周第一格 +7，日期格只显示几号。
4. 收入、支出格用 SUMIFS 按当天日期取数；不属于本月的格子留空；发生额为 0 时显示空白。收入绿字、支出红字，支出格加数据条，最大值用本月单日支出的最大值。
5. 条件格式：今天加粗边框和浅蓝底；非本月字变浅灰；周末浅灰底；按今天、非本月、周末的顺序并勾“如果为真则停止”。
6. 取消网格线，7 列等宽，横向 A4 一页打印。
交付时用 {示例月份，如 2026 年 8 月（要用到第 6 周）} 演示，填 10 笔左右的示例明细，并说明换月份时整张日历怎么跟着变。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.m-x{width:680px;border:1px solid #c9ced6;border-radius:6px;background:#fff;overflow:hidden;font:12px/1.35 system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;color:#1f2329}
.m-in{display:grid;gap:8px;padding:10px 14px 12px}
.m-top{display:flex;align-items:center;gap:8px}
.m-top>b{margin-right:auto;font-size:15px;color:#101828}
.m-dd{display:flex;align-items:center;gap:6px;padding:2px 8px;border:1px solid #c9ced6;border-radius:4px;font-size:11.5px}
.m-dd span{color:#5d6675}
.m-dd em{color:#8a94a6;font-size:10px}
.m-kpis{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.m-k{padding:6px 12px 7px;border:1px solid #e1e5ea;border-radius:6px;background:#fafbfc}
.m-k p{margin:0;color:#5d6675;font-size:11px}
.m-k b{display:block;font-size:20px;font-weight:700;line-height:1.25;font-variant-numeric:tabular-nums}
.m-k span{color:#5d6675;font-size:10.5px}
.m-g{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));border-top:1px solid #dfe3e8;border-left:1px solid #dfe3e8}
.m-wh{padding:3px 0;border-right:1px solid #dfe3e8;border-bottom:1px solid #dfe3e8;background:#f1f3f5;color:#5d6675;font-size:11px;font-weight:650;text-align:center}
.m-d{position:relative;display:grid;grid-template-rows:auto auto auto 1fr;height:52px;padding:3px 6px 4px;border-right:1px solid #dfe3e8;border-bottom:1px solid #dfe3e8;font-variant-numeric:tabular-nums}
.m-d b{font-size:12px;font-weight:650;line-height:1.2}
.m-d span{font-size:10.5px;line-height:1.3;text-align:right;white-space:nowrap}
.m-d .m-i{color:#067647}
.m-d .m-e{color:#b42318}
.m-d i{align-self:end;justify-self:start;width:var(--w);height:4px;border-radius:2px;background:#f3a8a1}
.m-we{background:#f6f7f9}
.m-out b{color:#b7bec9;font-weight:500}
.m-today{outline:2px solid #2a78d6;outline-offset:-2px;background:#eef4fc}
.m-today b::after{content:"今天";margin-left:4px;padding:0 4px;border-radius:3px;background:#2a78d6;color:#fff;font-size:9.5px;font-weight:600}
.m-sel{outline:2px solid #1d8348;outline-offset:-2px}
</style>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  // 2026 年 10 月，截至 10-29；1 号是周四，第一格是 9 月 28 日（周一）
  const exp = [86.5, 1280, 642, 358, 120, 45.8, 210, 63, 98.4, 3500, 156, 72.6, 39, 188, 260, 54, 412, 96, 33.5, 128, 66, 845, 58, 236, 312, 48, 75, 102, 64];
  const inc = { 10: 18500, 15: 2400, 22: 356.2 };
  const money = (v) => v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const max = Math.max(...exp), totalE = exp.reduce((a, b) => a + b, 0), totalI = Object.values(inc).reduce((a, b) => a + b, 0);
  const start = new Date(2026, 8, 28), today = 29;
  const cells = Array.from({ length: 42 }, (_, k) => {
    const d = new Date(start); d.setDate(start.getDate() + k);
    const day = d.getDate(), inMonth = d.getMonth() === 9, we = k % 7 > 4;
    const cls = ['m-d', we && 'm-we', !inMonth && 'm-out', inMonth && day === today && 'm-today', k === 0 && 'm-sel'].filter(Boolean).join(' ');
    let body = '';
    if (inMonth && day <= today) {
      const e = exp[day - 1];
      body = `<span class="m-i">${inc[day] ? '+' + money(inc[day]) : ''}</span><span class="m-e">−${money(e)}</span><i style="--w:${Math.max(4, (e / max) * 100).toFixed(1)}%"></i>`;
    }
    return `<div class="${cls}"><b>${day}</b>${body}</div>`;
  }).join('');
  draw(root, `<div class="m-x">
    <div class="xfx"><b>B6</b><i>fx</i><span>=DATE(年,月,1)-WEEKDAY(DATE(年,月,1),2)+1</span></div>
    <div class="m-in">
      <div class="m-top"><b>2026 年 10 月收支日历</b><p class="m-dd"><span>年份</span>2026<em>▾</em></p><p class="m-dd"><span>月份</span>10<em>▾</em></p></div>
      <div class="m-kpis">
        <div class="m-k"><p>本月收入</p><b style="color:#067647">${money(totalI)}</b><span>3 笔入账</span></div>
        <div class="m-k"><p>本月支出</p><b style="color:#b42318">${money(totalE)}</b><span>日均 ${money(totalE / today)}</span></div>
        <div class="m-k"><p>本月结余</p><b>${money(totalI - totalE)}</b><span>结余率 ${(((totalI - totalE) / totalI) * 100).toFixed(1)}%</span></div>
      </div>
      <div class="m-g">${['一', '二', '三', '四', '五', '六', '日'].map((w) => `<div class="m-wh">${w}</div>`).join('')}${cells}</div>
    </div>
    <div class="xt"><span class="on">日历看板</span><span>明细</span><span>类别</span></div>
  </div>`, { title: '收支日历看板 · 第一格 = 1 号所在那周的周一', min: 0.35 });
}
</script>
