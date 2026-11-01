---
zh: Typst 排版
en: Typst typesetting
aka: typst 排版语言 typst-compile LaTeX替代 模板编译
order: 60
---

## 是什么

Typst 是一门较新的排版语言和编译器：用简洁的标记写正文，用函数写模板，单个二进制几十 MB，编译一份文档通常几十到几百毫秒。数据可以从 JSON、CSV 读进模板，适合把“模板 + 数据”批量编译成 PDF。

## 适合

报告、手册、合同、证书、简历这类要正经排版的文档；要批量生成又不想背上浏览器的服务；想要接近 LaTeX 的排版质量、但团队不想学 LaTeX。

## 不适合

要和网页长得一模一样，看「无头浏览器打印」；期刊只收 LaTeX 稿件，或已经依赖大量 LaTeX 宏包，看「LaTeX 排版」。

## 注意

字体只从 --font-path 指定的目录、系统字体和内置字体里找，内置字体没有中文；找不到中文字体时只给警告、照样编译，输出里全是方框。服务器上用 --font-path 指向项目里的字体目录并加 --ignore-system-fonts，开发机和服务器的结果才一致；用 typst fonts 查看能找到哪些字体。

## 要点

- 命令：typst compile --root <项目目录> --font-path <字体目录> --ignore-system-fonts main.typ out.pdf；输出文件名写成 - 时写到标准输出，服务可以直接拿字节流。
- 传数据：零散参数用 --input key=value，模板里读 sys.inputs.key（值总是字符串）；整份数据写成 JSON 文件，模板里用 json("data.json") 读成字典和数组。数据按字符串插入，不会被当成标记执行；不要对数据调用 eval。
- 中文：set text(font: "Noto Serif CJK SC", lang: "zh", region: "cn")；中西文用不同字体时，字体列表里给西文字体加 covers: "latin-in-cjk"；首行缩进和两端对齐用 set par 设置。
- 页面和页码：set page(paper: "a4", margin: ..., header: ..., footer: ...)；页脚用 context 读 counter(page).get() 和 counter(page).final() 拼出“第 X 页 / 共 Y 页”，或者 counter(page).display("1 / 1", both: true)。
- 表格：写在 table.header 里的表头跨页默认重复；长表格不要包在 breakable: false 的 block 里，否则整张表会被挤到下一页。
- PDF 标准：默认输出 PDF 1.7 并带结构标签；归档用 --pdf-standard a-2b（无障碍要求用 a-2a 或 ua-1），编译器会按标准检查并报错。
- 部署：第三方包第一次用时会联网下载，离线服务器提前下到 --package-cache-path 指定的目录并打进镜像；Rust 项目可以把 typst 当库嵌入，Python 有 typst 绑定包，省掉起进程的开销。
- 量级：几页的单据单次编译几十毫秒，100 页的报告一两秒；一份文档在单线程里编译，并发靠多进程。

## 提示词

写一个脚本把 {数据来源}（如订单系统导出的 JSON）批量编译成 {文档类型} PDF，用 Typst。
1. 先读现有数据结构；模板放 templates/{模板名}.typ，字体放 fonts/，脚本放 scripts/。
2. 模板用 json() 读数据文件，标题、客户名、金额这些字段按字符串插入；金额保留两位小数并带千分位，日期写成 2026-10-29 这样的格式。
3. 页面 A4，页眉放 {页眉内容}，页脚“第 X 页 / 共 Y 页”；明细表用 table.header 跨页重复表头。
4. 中文字体：set text 指定项目里的中文字体，lang 设 zh；编译命令带 --font-path fonts 和 --ignore-system-fonts；脚本开始时用 typst fonts 确认字体存在，不存在就退出并报错。
5. 收集编译警告，出现字体相关的警告就判定这一份失败。
6. 并发按 CPU 核数起进程，单份超时 20 秒；某份数据缺字段时记录单号、继续跑其他的，结束后输出成功数、失败数和失败原因。
7. 离线环境：用到的第三方包提前下载到项目里的包缓存目录。
最后说明脚本用法，并用一份 300 行明细的数据验证分页。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, flow } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, flow([
    [{ t: 'data.json', note: '订单系统导出' }, { t: 'main.typ', note: 'json() 读成字典', acc: true, via: '读入' }, { t: 'typst compile', note: '--font-path fonts', acc: true }, { t: 'out.pdf', note: '几页几十毫秒' }],
    [{ t: '找不到中文字体', note: '只给警告，照样编译', bad: true }, { t: '收集编译警告', note: '字体警告判这份失败' }, { t: '记录单号', note: '继续跑其他的' }],
  ]), { title: 'Typst · 模板 + 数据批量编译' });
}
</script>
