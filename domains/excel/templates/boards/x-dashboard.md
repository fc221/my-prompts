---
zh: 动态看板
en: Interactive dashboard
aka: 数据看板 仪表盘 驾驶舱 切片器 透视图 收支看板 老板看板 dashboard
order: 10
---

## 是什么

一页工作表上放选择器、指标卡、图表和汇总明细，点一下切片器或改一下月份，整页的数字和图表一起变。数据全部来自明细表，用数据透视表或 SUMIFS 汇总，看板页本身只放结果。

## 适合

老板要看的收支看板（收入、支出、结余、账户余额）；门店经营周报；项目进度看板。每周把新数据追加进明细表，刷新一下就出新的一期。

## 不适合

一张表看十来个指标的目标达成和同环比，用「指标汇总页」；几百万行数据或要很多人同时在线看，用 BI 工具或网页看板；数据源要先合并、清洗的，先做「Power Query 合并整理」。

## 注意

切片器只管连上的透视表：右键切片器 → 报表连接，把该跟着变的透视表都勾上，漏一个就会出现图和数对不上。反过来，月度趋势图对应的透视表只连年份切片器、不连月份切片器，否则选了 10 月趋势图就只剩一根柱子。

## 要点

- 分表：明细（超级表，一行一笔：日期、月份、账户、类别、摘要、收入、支出，月份是公式 =TEXT([@日期],"yyyy-mm")）、透视（放全部透视表，可隐藏）、看板（只放选择器、指标卡、图表和汇总）、参数（期初余额、预算、类别清单）。
- 选择器在顶部排成一行：年份、月份、账户用切片器，切片器列数设成横向排开，样式统一；不用透视表时，改成一个“选定月”下拉单元格，所有 SUMIFS 都引用它，两套机制不混用。
- 指标卡一行 4 张：收入、支出、结余、账户余额。每张是几个放大字号的单元格：名称、本期值（=GETPIVOTDATA("收入",透视!$A$3)）、较上月变化加箭头；支出上涨标红，收入和结余上涨标绿。
- 账户余额这类要用到选中月份的数：再放一个只有月份字段、同样连着月份切片器的小透视表，它的第一格（如 透视!$A$12，定义名称“当前月”）就是当前选中的月份，只在单选时成立；余额 = 期初余额 + 截至该月末的收入合计 − 支出合计，用 SUMIFS 按日期“<=”月末求。
- 图表用透视图才会跟着切片器变：月度收支用簇状柱形图，收入、支出两个系列，颜色全年固定；支出构成用圆环图，不超过 5 类，其余并入“其他”；在透视图上隐藏全部字段按钮。
- 下方左边放按月汇总（月份 × 收入、支出、结余、月末余额），右边放所选月最近的明细；Microsoft 365 里明细可以用 =TAKE(SORT(FILTER(明细,明细[月份]=当前月),1,-1),8) 取最近 8 笔。
- 版式：取消网格线，隐藏不用的行列；颜色只用 2–3 种，红绿只表示好坏；图表按住 Alt 拖动吸附到单元格边上对齐；关键内容在 100% 缩放下一屏看完。
- 刷新：新数据追加进明细超级表，数据 → 全部刷新；透视表选项里勾“打开文件时刷新数据”，取消“更新时自动调整列宽”，否则每次刷新看板都会走样。

## 提示词

帮我在 Excel 里做一份{看板主题，如 公司收支看板}，给{谁看，如 老板}每周看。
数据：超级表“{明细表名}”，列为{列名，如 日期、月份、账户、类别、摘要、收入、支出}；参数表有{参数，如 年初余额}。
1. 工作表分为明细、透视（做完隐藏）、看板、参数。
2. 看板顶部一行放切片器：{切片器字段，如 年份、月份、账户}，横向排开，用“报表连接”连到相关透视表；月度趋势图只连年份切片器。
3. 切片器下面一行 4 张指标卡：{指标，如 收入、支出、结余、账户余额}；每张写本期值（用 GETPIVOTDATA 取）和较上月变化，{越低越好的指标，如 支出}上涨标红。账户余额 = 年初余额 + 截至所选月末的收入 − 支出，所选月份用连着月份切片器的小透视表取出。
4. 中间左边放{趋势图，如 1–12 月收入和支出的簇状柱形图}，右边放{构成图，如 支出类别圆环图，最多 5 类}，都用透视图并隐藏字段按钮。
5. 下面左边是按月汇总表（{汇总列，如 月份、收入、支出、结余、月末余额}），右边是所选月最近 {明细条数} 笔明细。
6. 取消网格线，颜色不超过 3 种，100% 缩放一屏看完；透视表设为打开时刷新、更新时不调整列宽。
交付时说明每个透视表连了哪些切片器、每周怎么更新数据；Excel 版本：{Microsoft 365 / Excel 2016 / WPS}。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.m-x{width:820px;border:1px solid #c9ced6;border-radius:6px;background:#fff;overflow:hidden;font:12px/1.4 system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;color:#1f2329}
.m-in{display:grid;gap:10px;padding:10px 14px 12px}
.m-top{display:flex;align-items:flex-end;gap:12px}
.m-h{margin:0 auto 0 0}
.m-h b{display:block;font-size:16px;font-weight:700;color:#101828;line-height:1.3}
.m-h span{color:#5d6675;font-size:11px}
.m-sl{padding:4px 6px 6px;border:1px solid #d0d7e2;border-radius:4px;background:#fff}
.m-sl>p{margin:0 0 4px;color:#5d6675;font-size:10.5px;font-weight:600}
.m-sl>div{display:flex;gap:4px}
.m-sl button,.m-sl span{min-width:44px;padding:3px 8px;border:1px solid #d0d7e2;border-radius:3px;background:#f4f6f9;color:#5d6675;font:500 11.5px/1.3 system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;text-align:center}
.m-sl button{cursor:pointer}
.m-sl button:hover{border-color:#9db8dc}
.m-sl button:focus-visible{outline:2px solid #2a78d6;outline-offset:1px}
.m-sl [aria-pressed="true"],.m-sl .on{border-color:#6f9fdc;background:#dbe8f8;color:#0b3b75;font-weight:650}
.m-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.m-k{padding:7px 12px 8px;border:1px solid #e1e5ea;border-radius:6px;background:#fafbfc}
.m-k.sel{outline:2px solid #1d8348;outline-offset:-1px}
.m-k p{margin:0;color:#5d6675;font-size:11px}
.m-k b{display:block;color:#101828;font-size:22px;font-weight:700;line-height:1.25;font-variant-numeric:tabular-nums}
.m-k b small{margin-left:3px;color:#5d6675;font-size:11px;font-weight:500}
.m-k em{font-size:11px;font-variant-numeric:tabular-nums}
.m-up{color:#067647}
.m-dn{color:#b42318}
.m-mid{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(0,1fr);gap:10px}
.m-card{padding:7px 12px 8px;border:1px solid #e1e5ea;border-radius:6px}
.m-ct{display:flex;align-items:center;gap:10px;margin:0 0 6px;font-size:12px;font-weight:650}
.m-ct span{margin-left:auto;color:#5d6675;font-size:10.5px;font-weight:500}
.m-ct i{display:inline-block;width:8px;height:8px;margin:0 3px 0 8px;border-radius:2px;background:var(--c)}
.m-bars{display:flex;align-items:flex-end;gap:6px;height:88px;border-bottom:1px solid #c4cad3}
.m-mo{flex:1;display:flex;align-items:flex-end;justify-content:center;gap:2px;height:100%;border-radius:3px 3px 0 0}
.m-mo.on{background:#eef4fc}
.m-mo i{width:9px;height:var(--h);border-radius:3px 3px 0 0;background:#2a78d6}
.m-mo i+i{background:#eb6834}
.m-xl{display:flex;gap:6px;padding-top:3px}
.m-xl span{flex:1;color:#5d6675;font-size:10px;text-align:center}
.m-xl span.on{color:#101828;font-weight:700}
.m-pie{display:flex;align-items:center;gap:14px}
.m-dn-w{position:relative;flex:none;width:96px;height:96px}
.m-ring{position:absolute;inset:0;border-radius:50%;-webkit-mask:radial-gradient(circle,transparent 29px,#000 30px);mask:radial-gradient(circle,transparent 29px,#000 30px)}
.m-mid-t{position:absolute;inset:0;display:grid;place-content:center;text-align:center;line-height:1.2}
.m-mid-t b{font-size:14px;font-variant-numeric:tabular-nums}
.m-mid-t span{color:#5d6675;font-size:10px}
.m-leg{display:grid;flex:1;gap:3px;margin:0;padding:0;list-style:none;font-size:11px}
.m-leg li{display:grid;grid-template-columns:9px 1fr auto auto;align-items:center;gap:6px}
.m-leg li::before{content:"";width:8px;height:8px;border-radius:2px;background:var(--c)}
.m-leg em{color:#5d6675;font-variant-numeric:tabular-nums}
.m-leg b{min-width:30px;font-weight:600;text-align:right;font-variant-numeric:tabular-nums}
.m-bot{display:flex;gap:10px;align-items:flex-start}
.m-bot>div{display:grid;gap:4px}
.m-bot>div>p{margin:0;font-size:12px;font-weight:650}
.m-st{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
</style>

<script type="module">
import { draw, sheet } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  // 单位：万元；1–10 月
  const inc = [18.6, 12.4, 21.3, 19.8, 22.5, 24.1, 20.7, 19.2, 23.6, 25.8];
  const exp = [14.2, 11.8, 15.6, 16.1, 15.9, 17.4, 16.8, 15.1, 17.9, 18.3];
  const bal = [];
  inc.reduce((b, v, i) => (bal[i] = b + v - exp[i]), 30);
  const cats = [['工资', '#6250d6'], ['采购', '#1baf7a'], ['房租', '#eda100'], ['水电网', '#e87ba4'], ['其他', '#98a2b3']];
  const catBy = { 6: [8.4, 4.3, 2.8, 0.6, 0.7], 7: [8.4, 2.9, 2.8, 0.6, 0.4], 8: [8.5, 4.6, 2.8, 0.7, 1.3], 9: [8.6, 5.2, 2.8, 0.7, 1.0] };
  const recent = {
    6: [['07-28', '华庭酒店品牌设计尾款', '主营收入', '56,000.00', ''], ['07-25', '7 月工资', '工资', '', '84,000.00'], ['07-18', '采购展会物料', '采购', '', '12,600.00'], ['07-05', '写字楼 7 月房租', '房租', '', '28,000.00']],
    7: [['08-29', '星河文旅导视设计首款', '主营收入', '42,000.00', ''], ['08-25', '8 月工资', '工资', '', '84,000.00'], ['08-16', '宽带与电费', '水电网', '', '6,120.00'], ['08-05', '写字楼 8 月房租', '房租', '', '28,000.00']],
    8: [['09-27', '山野茶饮包装设计', '主营收入', '38,500.00', ''], ['09-25', '9 月工资', '工资', '', '85,000.00'], ['09-19', '采购打样纸张', '采购', '', '9,860.00'], ['09-05', '写字楼 9 月房租', '房租', '', '28,000.00']],
    9: [['10-28', '星河文旅导视设计尾款', '主营收入', '63,000.00', ''], ['10-25', '10 月工资', '工资', '', '86,000.00'], ['10-21', '采购样品与耗材', '采购', '', '14,300.00'], ['10-05', '写字楼 10 月房租', '房租', '', '28,000.00']],
  };
  const f2 = (v) => v.toFixed(2);
  const delta = (a, b, upGood) => {
    const d = (a / b - 1) * 100;
    return `<em class="${(d >= 0) === upGood ? 'm-up' : 'm-dn'}">较上月 ${d >= 0 ? '▲' : '▼'} ${Math.abs(d).toFixed(1)}%</em>`;
  };
  const months = [6, 7, 8, 9];
  draw(root, `<div class="m-x">
    <div class="xfx"><b>C6</b><i>fx</i><span>=GETPIVOTDATA("收入",透视!$A$3)</span></div>
    <div class="m-in">
      <div class="m-top">
        <p class="m-h"><b>2026 年公司收支看板</b><span>数据截至 10-28 · 金额单位 万元</span></p>
        <div class="m-sl"><p>年份</p><div><span class="on">2026</span><span>2025</span></div></div>
        <div class="m-sl"><p>月份</p><div role="group" aria-label="月份">${months.map((i) => `<button type="button" data-m="${i}" aria-pressed="false">${i + 1} 月</button>`).join('')}</div></div>
        <div class="m-sl"><p>账户</p><div><span class="on">全部</span><span>对公户</span><span>微信</span></div></div>
      </div>
      <div class="m-kpis"></div>
      <div class="m-mid">
        <div class="m-card"><p class="m-ct">月度收支<i style="--c:#2a78d6"></i>收入<i style="--c:#eb6834"></i>支出<span>只连年份切片器</span></p>
          <div class="m-bars">${inc.map((v, i) => `<div class="m-mo" data-i="${i}"><i style="--h:${(v / 28) * 100}%"></i><i style="--h:${(exp[i] / 28) * 100}%"></i></div>`).join('')}</div>
          <div class="m-xl">${inc.map((_, i) => `<span data-i="${i}">${i + 1}月</span>`).join('')}</div>
        </div>
        <div class="m-card"><p class="m-ct">支出构成<span class="m-cm"></span></p>
          <div class="m-pie"><div class="m-dn-w"><div class="m-ring"></div><div class="m-mid-t"></div></div><ul class="m-leg"></ul></div>
        </div>
      </div>
      <div class="m-bot"><div><p>按月汇总</p><div class="m-sum"></div></div><div><p class="m-rt"></p><div class="m-rec"></div></div></div>
    </div>
    <div class="xt"><span class="on">看板</span><span>明细</span><span>透视</span><span>参数</span></div>
    <p class="m-st" role="status"></p>
  </div>`, { title: '动态看板 · 点月份切片器，指标卡、图表和明细一起变', min: 0.35 });

  const $ = (s) => root.querySelector(s);
  const show = (i) => {
    const res = inc[i] - exp[i], prev = inc[i - 1] - exp[i - 1];
    $('.m-kpis').innerHTML = [
      ['收入', inc[i], delta(inc[i], inc[i - 1], true), ' sel'],
      ['支出', exp[i], delta(exp[i], exp[i - 1], false), ''],
      ['结余', res, delta(res, prev, true), ''],
      ['账户余额', bal[i], delta(bal[i], bal[i - 1], true), ''],
    ].map(([t, v, d, s]) => `<div class="m-k${s}"><p>${t}</p><b>${f2(v)}<small>万</small></b>${d}</div>`).join('');
    root.querySelectorAll('[data-m]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.m === i)));
    root.querySelectorAll('.m-mo, .m-xl span').forEach((el) => el.classList.toggle('on', +el.dataset.i === i));
    const parts = catBy[i];
    let acc = 0;
    const stops = parts.map((v, k) => { const a = acc; acc += (v / exp[i]) * 100; return `${cats[k][1]} ${a.toFixed(2)}% ${(acc - 0.8).toFixed(2)}%, #fff 0 ${acc.toFixed(2)}%`; });
    $('.m-ring').style.background = `conic-gradient(${stops.join(', ')})`;
    $('.m-mid-t').innerHTML = `<b>${f2(exp[i])}</b><span>${i + 1} 月支出</span>`;
    $('.m-cm').textContent = `${i + 1} 月 · 5 类`;
    $('.m-leg').innerHTML = parts.map((v, k) => `<li style="--c:${cats[k][1]}"><span>${cats[k][0]}</span><em>${f2(v)}</em><b>${Math.round((v / exp[i]) * 100)}%</b></li>`).join('');
    $('.m-sum').innerHTML = sheet({
      head: ['月份', '收入', '支出', '结余', '月末余额'],
      widths: [50, 54, 54, 50, 64],
      rows: months.map((m) => [`${m + 1} 月`, f2(inc[m]), f2(exp[m]), f2(inc[m] - exp[m]), f2(bal[m])]),
      marks: Object.fromEntries(['A', 'B', 'C', 'D', 'E'].map((c) => [c + (months.indexOf(i) + 2), 'acc'])),
    });
    $('.m-rt').textContent = `${i + 1} 月最近明细（元）`;
    $('.m-rec').innerHTML = sheet({ head: ['日期', '摘要', '类别', '收入', '支出'], widths: [44, 128, 58, 66, 66], rows: recent[i] });
    $('.m-st').textContent = `已选 ${i + 1} 月：收入 ${f2(inc[i])} 万，支出 ${f2(exp[i])} 万`;
  };
  root.querySelector('.m-sl [role="group"]').addEventListener('click', (e) => {
    const b = e.target.closest('[data-m]');
    if (b) show(+b.dataset.m);
  });
  show(9);
}
</script>
