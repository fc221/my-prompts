---
zh: 日期时间
en: Date & time format
order: 10
---

## 是什么

日期 YYYY-MM-DD，时间 HH:mm，范围写“至”，近期用相对时间。

## 适合

列表时间列、消息与通知、日志、筛选的日期范围。

## 不适合

不要同一产品里混用 2026/10/25、10月25日、Oct 25 等多种写法；不用 12 小时制加 AM/PM。

## 要点

- 日期 YYYY-MM-DD，时间 HH:mm（需要秒再加 :ss），日期与时间之间空一格；同年可省略年份
- 范围在文字里写“至”：2026-10-01 至 2026-10-23，同年可写 03-11 至 03-17，“至”两侧各一个空格，不用波浪号；日期范围控件用组件库默认的分隔符，不另改
- 相对时间：1 分钟内“刚刚”，1 小时内“N 分钟前”，24 小时内“N 小时前”，更早显示具体日期时间
- 相对时间悬停或在详情里显示准确时间，并用 <time datetime> 标注
- 时长：24 小时内写“时 分 秒”，超过写“天 时 分”
- 日历和周视图从周一开始；跨时区的产品标明时区
- 正文叙述可写“10 月 25 日”，列表、表格、字段统一用 YYYY-MM-DD

## 提示词

统一{产品}的日期时间格式：列表和字段用 YYYY-MM-DD HH:mm（24 小时制，同年可省略年份），范围在文字里写“开始 至 结束”，“至”两侧空格，不用波浪号，日期范围控件保留组件库默认分隔符；24 小时内用相对时间（刚刚 / N 分钟前 / N 小时前），悬停显示准确时间并用 <time datetime> 标注；时长按“时 分 秒”或“天 时 分”；日历从周一开始；时间列用 tabular-nums 并预留宽度；窄屏可只显示日期，详情里给完整时间。

## 示例

<style>
.s{height:100%;display:grid;place-items:center;padding:12px 16px;background:#fff;color:#1f2329;font:13px/1.3 system-ui,"PingFang SC",sans-serif}
.g{display:grid;grid-template-columns:auto auto auto;gap:6px 20px;align-items:center}
span{font-size:12px;color:#5b616e;white-space:nowrap}
em{font-style:normal;font-size:12px;font-weight:600}
em.x{color:#d92d20}
.o{color:#12805c}
p{margin:0;white-space:nowrap;font-variant-numeric:tabular-nums}
p.x{color:#5b616e;text-decoration:line-through;text-decoration-color:rgba(217,45,32,.6)}
.s{container-type:inline-size}
@container (max-width:440px){.g{grid-template-columns:auto auto;gap:6px 14px}
.g>span{display:none}
}
</style>

<div class="s"><div class="g"><span></span><em class="x">✗ 不推荐</em><em class="o">✓ 推荐</em><span>日期时间</span><p class="x">2026/10/25 2:30 PM</p><p>2026-10-25 14:30</p><span>范围</span><p class="x">10.1-10.23</p><p>10-01 至 10-23</p><span>1 分钟内</span><p class="x">0 分钟前</p><p title="2026-10-25 14:30:12">刚刚</p><span>超过 24 小时</span><p class="x">36 小时前</p><p>10-24 09:12</p><span>时长</span><p class="x">3725 秒</p><p>1 小时 2 分 5 秒</p></div></div>
