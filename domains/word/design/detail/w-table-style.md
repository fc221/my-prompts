---
zh: 表格排版
en: Table formatting
aka: 三线表 表格跨页 标题行重复 重复标题行 允许跨页断行 表格样式 根据窗口调整表格 单元格边距 表格文字对齐 续表
order: 20
---

## 是什么

Word 表格的版式规范：用表格样式统一线条和底色，表头跨页自动重复，一行不被拆到两页，宽度贴合版心，文字和数字按类型对齐。论文和报告常用三线表，业务表单用浅灰底纹加细框线。

## 适合

报告、论文、方案、标书里的数据表和对比表；制度里的职责分工表；跨好几页的物料、设备清单。

## 不适合

要计算、筛选、经常改数据的表在 Excel 里做好，再粘贴或链接到 Word；封面信息栏这类拿表格当对齐工具的做法看「填空下划线与对齐」。

## 注意

表格里的文字会继承正文样式，带着首行缩进 2 字符和 1.5 倍行距，单元格内容看着歪、行高也虚高。给表格单独建一个“表格文字”样式（五号、单倍行距、首行缩进 0、段前段后 0），表格内容统一套它。

## 要点

- 三线表：顶线和底线 1.5 磅，表头下的栏目线 0.75 磅，不画竖线；在 表设计 → 新建表格样式 里存成“三线表”，后面的表直接套用。
- 标题行跨页重复：表头黑体或加粗、居中；表格属性 → 行 → 勾选“在各页顶端以标题行形式重复出现”，换页后表头自动出现；只有表格最上面连续的几行能设为标题行。
- 不拆行：表格属性 → 行 → 取消“允许跨页断行”，一行内容不会分到两页；表题段落设“与下段同页”，表题不和表格分家。
- 宽度：布局 → 自动调整 →“根据窗口自动调整表格”，表格宽度等于版心宽；序号、金额这类关键列再在表格属性里指定列宽（如序号 12mm、金额 28mm）。
- 对齐：表头居中；文字列左对齐；数字列右对齐、小数位数一致，金额加千分位；单元格垂直居中。
- 单元格边距：表格属性 → 选项，默认上下 0、左右 0.19cm，想让表格透气就把上下加到 0.5–1mm，整表一致；行高用“最小值”，内容多时行会自动长高。
- 表题在上、表注在下：表题用「题注与交叉引用」里的插入题注；表注如“注：销售额为含税金额”，小五号、左对齐，紧贴表格下方。
- 宽表和长表：比版心宽的表单独分节改横向（见「分节与页码」）；合并单元格只用在表头，数据区一格一个值，以后转到 Excel 也不费事。

## 提示词

帮我把{文档名称}里的表格统一排版，这些表是{用途，如 项目报告里的数据表}。
1. 新建表格样式“{表格样式名，默认 三线表}”：顶线、底线 1.5 磅，表头下栏目线 0.75 磅，无竖线；所有数据表套用它。
2. 表格内文字套“表格文字”样式：五号宋体、单倍行距、首行缩进 0、段前段后 0；表头黑体居中，文字列左对齐，数字列右对齐、统一小数位，金额加千分位，单元格垂直居中。
3. 每张表根据窗口调整到版心宽；表头设为跨页重复的标题行，取消“允许跨页断行”，行高用最小值。
4. 表题放在表格上方，用插入题注生成“表 2-1”格式；有数据来源或口径说明的，在表格下方加小五号表注。
5. 最后列出超过一页或比版心宽的表，建议哪些改横向分节、哪些拆分；数据区里的合并单元格标出来让我确认。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg.m-desk{background:linear-gradient(135deg,#e9ebef,#d9dde3)}
.m-desk .dg-row{justify-content:center}
.m-desk .dg-col{flex:none}
.m-wrap{display:flex;gap:16px;align-items:center}
.m-st{display:grid;gap:0;width:400px}
.m-pg{position:relative;padding:12px 34px;background:#fff;box-shadow:0 2px 6px rgba(16,24,40,.1),0 10px 22px -10px rgba(16,24,40,.25);color:#111;font-family:"Songti SC","SimSun",serif}
.m-pg.a{padding-top:14px;clip-path:inset(-30px -30px 0 -30px)}
.m-pg.b{padding-bottom:14px;clip-path:inset(0 -30px -30px -30px)}
.m-desk .m-gap{display:flex;align-items:center;gap:8px;height:30px;padding:0 6px;color:#b54708;font:600 10.5px/1 system-ui,"PingFang SC",sans-serif}
.m-desk .m-gap::before,.m-gap::after{content:"";flex:1;border-top:1.5px dashed #e7a663}
.m-desk .m-p{margin:0 0 4px;font-size:11px;line-height:1.8;text-indent:2em;color:#333}
.m-desk .m-cap{margin:2px 0 4px;text-align:center;font-size:10.5px;line-height:1.4}
.m-cap b{font-weight:400;padding:0 1px;background:#e4e7ec}
.m-tb{width:100%;table-layout:fixed;border-collapse:collapse;font-size:10.5px;line-height:1.55;border-top:1.5px solid #111;border-bottom:1.5px solid #111}
.m-tb th{padding:2px 6px;border-bottom:.75px solid #111;font:700 10.5px/1.55 "PingFang SC","SimHei",sans-serif;text-align:center;white-space:nowrap}
.m-tb td{padding:2px 6px;white-space:nowrap}
.m-tb td.n{text-align:right;font-variant-numeric:tabular-nums}
.m-tb td.c{text-align:center}
.m-tb tr.rep th{background:#eaf1fb}
.m-tb tr.sum td{border-top:.75px solid #111;font-weight:700}
.m-desk .m-note{margin:4px 0 0;font-size:9px;line-height:1.5;color:#333}
.m-desk .m-pn{margin:8px 0 0;text-align:center;font:9.5px/1 "Times New Roman",serif;color:#555}
.m-desk .m-hd{margin:0 0 8px;padding-bottom:2px;border-bottom:.75px solid #595959;color:#595959;font-size:8.5px;text-align:right;display:flex;align-items:center}
.m-flag{margin-right:auto;padding:0 6px;border-radius:8px;background:#2b579a;color:#fff;font:9px/1.5 system-ui,"PingFang SC",sans-serif;white-space:nowrap}
.m-ann{display:grid;width:150px;font:11px/1.35 system-ui,"PingFang SC",sans-serif;color:#344054}
.m-ann p{margin:0;padding:6px 0 6px 10px;border-left:2px solid #2b579a}
.m-ann b{display:block;color:#101828;font-size:11.5px}
.m-ann span{color:#667085}
</style>

<div class="dg m-desk"></div>

<script type="module">
import { draw } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  const cols = '<colgroup><col style="width:12%"><col style="width:30%"><col style="width:13%"><col style="width:27%"><col style="width:18%"></colgroup>';
  const head = (cls) => cols + '<tr' + (cls ? ' class="' + cls + '"' : '') + '><th>序号</th><th>门店</th><th>区域</th><th>销售额（万元）</th><th>同比</th></tr>';
  const row = (r) => '<tr><td class="c">' + r[0] + '</td><td>' + r[1] + '</td><td class="c">' + r[2] + '</td><td class="n">' + r[3] + '</td><td class="n">' + r[4] + '</td></tr>';
  const a = [['1', '杭州湖滨店', '华东', '268.30', '+12.4%'], ['2', '苏州园区店', '华东', '228.30', '+8.1%'], ['3', '南京新街口店', '华东', '241.06', '+5.7%']];
  const b = [['4', '合肥天鹅湖店', '华东', '156.92', '−2.3%'], ['5', '宁波天一店', '华东', '183.45', '+9.6%']];
  const p1 = '<div class="m-pg a"><p class="m-p">5 家门店三季度合计销售 1,078.03 万元，明细见表 3-2。</p><p class="m-cap"><b>表 3-2</b>　2026 年三季度门店销售汇总</p><table class="m-tb">' + head() + a.map(row).join('') + '</table><p class="m-pn">— 5 —</p></div>';
  const p2 = '<div class="m-pg b"><p class="m-hd"><span class="m-flag">↓ 表头自动重复</span>门店运营分析报告</p><table class="m-tb" style="border-top-width:1.5px">' + head('rep') + b.map(row).join('') + '<tr class="sum"><td></td><td>合计</td><td></td><td class="n">1,078.03</td><td class="n">+7.2%</td></tr></table><p class="m-note">注：销售额为含税金额，数据截至 2026 年 9 月 30 日。</p></div>';
  const ann = [['三线表', '顶线底线 1.5 磅，栏目线 0.75 磅'], ['跨页', '标题行重复，行不允许跨页断行'], ['宽度与对齐', '根据窗口调整；数字右对齐'], ['表题在上，表注在下', '表注小五号，左对齐']];
  draw(root, '<div class="m-wrap"><div class="m-st">' + p1 + '<p class="m-gap">第 5 页 ↓ 第 6 页</p>' + p2 + '</div><div class="m-ann">' + ann.map(([x, y]) => '<p><b>' + x + '</b><span>' + y + '</span></p>').join('') + '</div></div>', { center: true, min: 0.35 });
}
</script>
