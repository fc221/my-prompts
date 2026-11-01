---
zh: 模板填充与批量生成
en: Template filling and batch generation
aka: docxtpl 邮件合并 批量生成Word Jinja2 模板占位符 录用通知批量 证明批量 合同批量 docxtemplater
order: 20
---

## 是什么

先在 Word 里把文档排好，把要变的地方写成占位标签（docxtpl 用 Jinja2 语法，变量是用双花括号包住的名字），程序读一份 Excel 或数据库，每行数据渲染出一份 .docx，版式完全沿用模板。不写代码的话，Word 自带的“邮件合并”也能按 Excel 批量出文档。

## 适合

录用通知、在职证明、收入证明、合同、授权委托书、培训证书、催款函、成绩单这类版式固定、几十到几千份只换字段的文档。

## 不适合

结构随数据大幅变化（章节、段落数量都不固定）的报告，用「代码生成 Word」；只要 PDF 的证书套打，看「代码直接绘制」。

## 注意

标签必须是一段连续、格式统一的文字：在 Word 里敲到一半改了格式、被拼写检查标红、自动更正把直引号换成弯引号，都会把标签拆成几段，渲染时报语法错误，或者原样留在文档里。标签一次打完或从纯文本粘贴，并在自动更正选项里关掉“直引号替换为弯引号”。

## 要点

- 模板：用 Word 排好版式和样式，在要替换的位置写变量标签，变量名用英文或拼音（name、dept、start_date），和数据列名一一对应；用 tpl.get_undeclared_template_variables() 列出模板里的全部变量，和数据列逐个核对。
- 表格行循环：tr 前缀的 for 标签和 endfor 标签各占一行，中间一行写单元格变量，渲染时按数据复制成多行，标签所在的行会被删掉；段落级的条件和循环用 p 前缀，整段删除或重复。
- 渲染：每份新建一个 DocxTemplate('模板.docx')，调用 render(数据, autoescape=True) 后 save；数据里可能出现 & < > 时一定开 autoescape，否则生成的文件 Word 打不开。
- 格式在代码里算好：金额转成千分位两位小数的字符串，日期写成“2026 年 10 月 9 日”，合同金额同时给出大写（如“壹万贰仟元整”），模板只负责替换。
- 图片和富文本：照片、签名用 InlineImage(tpl, 路径, width=Mm(25))；局部变色、加粗的文字用 RichText；整段插入另一份文档用 Subdoc。
- 批量：用 openpyxl 或 pandas 读取 Excel，每行一份，文件名用“编号_姓名.docx”，去掉文件名里的 \ / : * ? " < > |；某行出错就记录下来跳过，跑完输出成功和失败清单。
- 合并与转换：需要一个总文件时用 docxcompose 按顺序拼接，或者整批转成 PDF 再合并，见「批量转 PDF」。
- 不写代码：邮件 → 开始邮件合并 → 选择收件人（Excel）→ 插入合并域 → 完成并合并 →“编辑单个文档”，一次得到每人一页；数字和日期先在 Excel 里处理成文本，否则会显示成 12000.5 这种原始值。

## 提示词

帮我写一个批量生成{文档类型，如 录用通知书}的 Python 脚本：模板是 {模板文件}，数据在 {数据文件，如 offers.xlsx 的“名单”工作表}，用 docxtpl。
1. 先读模板，列出里面所有变量（get_undeclared_template_variables），和 Excel 列名对照，缺的、多的都列出来。
2. 字段处理在代码里完成：{字段规则，如 月薪转成千分位两位小数、入职日期写成“2026 年 11 月 3 日”、试用期写成“三个月”}；金额同时生成人民币大写。
3. {明细和图片，如 薪资构成表用 tr 行循环标签，签名图片用 InlineImage，宽 25mm}。
4. 每行数据新建模板对象渲染，开启 autoescape；输出到 output/ 目录，文件名 {命名规则，如 录用通知_工号_姓名.docx}，去掉非法字符，重名时加序号。
5. 某行出错就记录行号和原因并跳过；结束后打印成功份数和失败清单，同时写一份 result.csv。
6. 附上运行方法（依赖、命令），并告诉我抽查生成结果时重点看哪几处。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg{--sec:#0891b2}
.m-wrap{display:flex;gap:14px;align-items:center}
.m-pg{width:250px;padding:16px 20px 14px;background:#fff;box-shadow:0 2px 6px rgba(16,24,40,.1),0 10px 22px -10px rgba(16,24,40,.25);color:#111;font-family:"Songti SC","SimSun",serif}
.dg .m-t{margin:0 0 10px;text-align:center;font:700 13px/1.4 "PingFang SC","SimHei",sans-serif;letter-spacing:.3em}
.dg .m-p{margin:0 0 5px;font-size:9px;line-height:1.75}
.dg .m-p.i{text-indent:2em}
.dg .m-p.r{text-align:right}
.m-v{padding:0 3px;border-radius:3px;background:#fff1c2;color:#8a5a00;font:600 8.5px/1.5 ui-monospace,Menlo,Consolas,monospace;white-space:nowrap}
.m-lb{display:block;margin:0 0 6px;color:#0e7490;font:600 10px/1.3 system-ui,"PingFang SC",sans-serif}
.m-mid{display:grid;gap:8px;width:336px}
.m-ar{text-align:center;color:#98a2b3;font:13px/1 system-ui}
.m-ar b{display:block;margin-top:2px;color:#475467;font:500 10px/1.3 ui-monospace,Menlo,monospace}
.m-files{display:grid;gap:5px}
.m-f{display:flex;align-items:center;gap:7px;padding:5px 8px;border:1px solid #d0d5dd;border-radius:6px;background:#fff;font:10.5px/1.3 system-ui,"PingFang SC",sans-serif;color:#101828;white-space:nowrap}
.m-f i{display:grid;place-items:center;width:16px;height:18px;border-radius:2px;background:#2b579a;color:#fff;font:700 8px/1 system-ui;font-style:normal}
.m-f em{margin-left:auto;color:#067647;font-style:normal;font-size:10px}
.m-f.bad{border-color:#f1b5ad;background:#fff4f2}
.m-f.bad em{color:#b42318}
</style>

<div class="dg"></div>

<script type="module">
import { draw, sheet } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  const v = (s) => '<span class="m-v">{{ ' + s + ' }}</span>';
  const tpl = '<div><span class="m-lb">模板.docx · 版式在 Word 里排好</span><div class="m-pg"><p class="m-t">录用通知书</p>'
    + '<p class="m-p">' + v('name') + '：</p>'
    + '<p class="m-p i">经面试评估，我司决定录用您为 ' + v('dept') + ' ' + v('title') + '，月薪 ' + v('salary') + ' 元（大写 ' + v('salary_cn') + '）。</p>'
    + '<p class="m-p i">请于 ' + v('start_date') + ' 到岗报到，试用期 ' + v('probation') + '。</p>'
    + '<p class="m-p r">MyPrompts 有限公司<br>人力资源部</p></div></div>';
  const data = sheet({
    head: ['工号', 'name', 'dept', 'salary', 'start_date'],
    widths: [46, 50, 54, 66, 76],
    rows: [['A1023', '林知夏', '运营部', '12,000.00', '2026-11-03'], ['A1024', '许乐', '商品部', '9,500.00', '2026-11-10'], ['A1025', '周敏', '门店部', '8,800.00', '']],
    marks: { E4: 'bad' },
    tabs: ['名单', '说明'],
  });
  const files = [['录用通知_A1023_林知夏.docx', '✓'], ['录用通知_A1024_许乐.docx', '✓'], ['第 4 行 start_date 为空', '已跳过', 'bad']];
  const mid = '<div class="m-mid"><span class="m-lb">offers.xlsx · 列名对应变量名</span>' + data + '<p class="m-ar">↓<b>render(row, autoescape=True)</b></p><div class="m-files">'
    + files.map(([n, s, c]) => '<p class="m-f' + (c ? ' ' + c : '') + '"><i>W</i>' + n + '<em>' + s + '</em></p>').join('') + '</div></div>';
  draw(root, '<div class="m-wrap">' + tpl + mid + '</div>', { center: true, min: 0.4 });
}
</script>
