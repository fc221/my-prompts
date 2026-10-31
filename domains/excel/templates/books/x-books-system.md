---
zh: 小企业内账工作簿
en: Small business bookkeeping workbook
aka: 内账 财务工作簿 Excel 财务系统 记账系统 导航首页 目录页 超链接跳转 返回首页 做账表格
order: 70
---

## 是什么

把小企业日常要记的账做成一个约 16 张表的工作簿：首页是导航页，按基础设置、数据录入、数据汇总、报表四组排出每张表的图标按钮，点一下跳过去，各表右上角都有“返回首页”；录入表只记原始单据，汇总表和报表全部由公式从录入表算出。

## 适合

没上财务软件的小公司、工作室、门店，老板或兼职会计自己管内账；会计给老板交一份能看懂、点着就能用的账本。

## 不适合

正式报税的账簿用记账软件或「记账凭证与科目汇总」；只记个人或家庭收支用「收支记账表」；分表的一般原则见「工作簿分表」。

## 注意

数据只朝一个方向流：录入表 → 汇总表 → 报表。汇总表和报表里一个手填数字都不放，录入表也不引用报表。超链接指向定义名称而不是写死的“表名!A1”，表改名后链接才不会断。

## 要点

- 16 张表：首页、使用说明；基础设置：科目表、账户表、客户供应商；数据录入：收入登记、支出登记、应收明细、应付明细、销项发票登记、进项发票登记；数据汇总：收入统计、支出统计、应收应付汇总；报表：月度收支、利润简表。标签颜色按组区分，设置灰、录入绿、汇总蓝、报表橙。
- 首页：公司名、所属年度（定义名称 年度）、四个分组区块，每张表一个按钮（图标加表名，用形状或单元格做）；下方放本年收入、本年支出、应收余额、应付余额四个数，公式引用汇总表，和一块校验区。
- 跳转：给每张表的 A1 起定义名称（如 去_收入登记），按钮的超链接选“本文档中的位置”里的这个名称，或在单元格里写 =HYPERLINK("#去_收入登记","收入登记")；各表第 1 行右上角放 =HYPERLINK("#去_首页","返回首页")，冻结前 3 行让它一直看得见，明细超级表从第 3 行表头开始。
- 基础设置：科目表分收入类和支出类，每个科目带“报表项目”列，决定它落在利润简表的哪一行；账户表记账户和期初余额；客户供应商记名称、类型和账期。录入表的下拉全部引用这三张表。
- 录入表手填原始单据：收入登记 日期、单号、客户 ▾、收入科目 ▾、摘要、金额、收款账户 ▾、是否开票 ▾；支出登记 日期、单号、供应商 ▾、支出科目 ▾、摘要、金额、付款账户 ▾、是否收票 ▾；月份 =MONTH([@日期]) 是公式。应收、应付明细的已收付 =SUMIFS(收入登记[金额],收入登记[单号],[@单号]) 按单号从收支登记取；发票登记的价税合计用公式，号码设成文本。
- 汇总：收入统计、支出统计是科目 × 12 个月的矩阵，=SUMIFS(收入登记[金额],收入登记[收入科目],$A3,收入登记[月份],B$2)；应收应付汇总按单位算未收、未付和逾期金额。
- 报表：月度收支按月列收入、支出、结余和累计结余；利润简表按报表项目 =SUMIFS(支出统计列,支出统计[报表项目],$A5) 取数，列营业收入、营业成本、毛利、各项费用、利润总额、净利润，本月和本年累计两栏；内账口径和报税口径的差异写在使用说明里。
- 月底：各账户余额（期初 + 收入登记 − 支出登记，按账户 SUMIFS）和银行、现金实际余额核对；首页校验区检查 收入统计合计 = SUM(收入登记[金额])、支出同理、发票登记的月合计和开票收票清单一致，不相等显示红色“不平”。

## 提示词

帮我做一个{公司类型，如 设计工作室}的小企业内账工作簿 Excel，年度 {年度}：
1. 建 16 张表：首页、使用说明、科目表、账户表、客户供应商、收入登记、支出登记、应收明细、应付明细、销项发票登记、进项发票登记、收入统计、支出统计、应收应付汇总、月度收支、利润简表；标签按设置、录入、汇总、报表四组上色。
2. 首页做导航：四个分组区块，每张表一个图标按钮，超链接指向每张表 A1 的定义名称；各表第 1 行右上角放“返回首页”链接。首页下方放本年收入、支出、应收余额、应付余额和校验区。
3. 科目表带“报表项目”列，先列这些科目：{科目列表}；账户表：{账户列表}。录入表的下拉都引用基础设置。
4. 汇总表用 SUMIFS 从录入表按科目和月份汇总，报表只引用汇总表，不放手填数字。
5. 使用说明写清每张表的用途、谁来填、每月结账步骤。
交付时列出数据流向（哪张录入表进哪张汇总表、哪张报表），标明每张表的手填列和公式列，并各放 3–5 行示例数据验证首页校验区。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.m-home{border:1px solid #c9ced6;border-radius:6px;background:#fff;overflow:hidden}
.m-hd{display:flex;align-items:baseline;gap:8px;padding:6px 10px;border-bottom:1px solid #e1e5ea}
.m-hd b{font-size:13px;color:#101828}
.m-hd span{color:#5d6675;font-size:10.5px}
.m-gs{display:grid;gap:6px;padding:8px 10px 10px}
.m-g{display:grid;grid-template-columns:52px minmax(0,1fr);align-items:start;gap:6px}
.m-g>p{margin:3px 0 0;color:#5d6675;font-size:10.5px;font-weight:650}
.m-bs{display:flex;flex-wrap:wrap;gap:4px}
.m-b{display:inline-flex;align-items:center;gap:4px;padding:2px 7px 2px 3px;border:1px solid #e1e5ea;border-radius:5px;background:#fafbfc;font-size:10.5px;white-space:nowrap}
.m-b i{display:grid;place-items:center;width:16px;height:16px;border-radius:4px;background:var(--c);color:#fff;font-size:9.5px;font-style:normal;font-weight:700}
.m-b.sel{outline:2px solid #1d8348;outline-offset:-1px}
.m-bar{display:flex;justify-content:space-between;align-items:center;padding:4px 8px;border:1px solid #c9ced6;border-bottom:0;border-radius:6px 6px 0 0;background:#fff;font-size:12px;font-weight:700;color:#101828}
.m-bar span{color:#1d6bb8;font-size:10.5px;font-weight:500;text-decoration:underline}
.m-bar+.xs{border-radius:0 0 6px 6px}
</style>

<script type="module">
import { draw, sheet } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  const groups = [
    ['基础设置', '#667085', ['科目表', '账户表', '客户供应商']],
    ['数据录入', '#1d8348', ['收入登记', '支出登记', '应收明细', '应付明细', '销项发票登记', '进项发票登记']],
    ['数据汇总', '#2a6fdb', ['收入统计', '支出统计', '应收应付汇总']],
    ['报表', '#d9480f', ['月度收支', '利润简表']],
  ];
  const btn = (n, c) => '<span class="m-b' + (n === '收入登记' ? ' sel' : '') + '" style="--c:' + c + '"><i>' + n[0] + '</i>' + n + '</span>';
  const home = '<div class="m-home"><div class="xfx"><b>C6</b><i>fx</i><span>=HYPERLINK("#去_收入登记","收入登记")</span></div>'
    + '<div class="m-hd"><b>首页 · 2026 年度内账</b><span>点按钮跳到对应工作表</span></div><div class="m-gs">'
    + groups.map(([t, c, list]) => '<div class="m-g"><p>' + t + '</p><div class="m-bs">' + list.map((n) => btn(n, c)).join('') + '</div></div>').join('')
    + '</div></div>';
  const entry = '<div class="m-bar">收入登记<span>返回首页</span></div>' + sheet({
    head: ['日期', '客户', '收入科目', '金额', '收款账户'],
    widths: [42, 76, 80, 66, 64],
    rows: [
      ['10-09', '青柚茶饮 ▾', '设计费 ▾', '18,000.00', '对公户 ▾'],
      ['10-15', '禾木书店 ▾', '设计费 ▾', '6,500.00', '对公户 ▾'],
      ['10-21', '青柚茶饮 ▾', '印刷代办 ▾', '3,200.00', '对公户 ▾'],
      ['10-27', '散客 ▾', '零星收入 ▾', '460.00', '现金 ▾'],
    ],
    tabs: ['收入登记', '首页', '收入统计'],
    freeze: true,
  });
  draw(root, [home, entry], { title: '小企业内账工作簿 · 录入表 → SUMIFS 汇总 → 报表', min: 0.45 });
}
</script>
