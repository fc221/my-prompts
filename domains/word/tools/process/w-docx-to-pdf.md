---
zh: 批量转 PDF
en: Batch convert Word to PDF
aka: Word转PDF docx转pdf LibreOffice soffice headless 批量导出PDF 字体替换 PDF/A docx2pdf ExportAsFixedFormat
order: 10
---

## 是什么

把一批 .docx 转成 PDF：服务器上用 LibreOffice 无界面模式（soffice --headless --convert-to pdf），装了 Word 的 Windows 或 macOS 上用 Word 自动化导出，效果和手点“另存为 PDF”一样。关键是字体、目录页码和修订标记在转换前处理好，转换后核对页数。

## 适合

批量合同、录用通知、证明转 PDF 后发送或归档；系统生成的 Word 报告提供 PDF 下载；投标文件、论文定稿交 PDF。

## 不适合

本来就从数据生成、不需要 Word 中间稿的单据，直接生成 PDF 更快，看「生成方案怎么选」；转完还要合并、加水印、加密的，接着看「合并、拆分与重排」「加水印」「加密与权限」。

## 注意

服务器缺少文档用到的中文字体时，LibreOffice 会换成别的字体，行宽一变，分页和目录页码全跟着变，PDF 和 Word 里看到的不一样。先装好字体（宋体、黑体、仿宋、楷体，或许可允许的替代字体），用 fc-list :lang=zh 确认装上，再开始转换。

## 要点

- 命令：soffice --headless --convert-to pdf --outdir out/ in/*.docx；一次传多个文件，比逐个启动快得多。
- 并发：同一个用户配置目录同时只能跑一个 soffice 实例，并行时每个进程用独立的配置目录（-env:UserInstallation=file:///tmp/lo-1、lo-2…）；单个文件设 60 秒超时，超时就结束进程并记为失败。
- 字体：容器镜像里装中文字体后执行 fc-cache；文档里写的字体名（如“仿宋_GB2312”）在服务器上找不到就会被替换，转换后用 pdffonts 看嵌入的字体名，出现意料之外的字体就告警。
- 有 Word 的机器：Windows 用 COM 打开文档后调用 ExportAsFixedFormat（导出格式 17 即 PDF，书签选按标题创建）；也可以用 docx2pdf 包（Windows、macOS，需装 Word）。手动导出时在 另存为 PDF → 选项 里勾选“使用标题创建书签”，归档件勾选 PDF/A。
- 转换前：更新目录和全部域（Ctrl+A、F9），接受或拒绝全部修订、删除批注，审阅视图切到“无标记”，否则修订和批注框会印进 PDF。
- 页数核对：Word 保存时把页数写进 docProps/app.xml 的 Pages，转换后用 pdfinfo 读 PDF 页数，两者对不上就标出来人工检查。
- 输出：文件名和原文件一致，只换扩展名；整批写一份清单（文件名、页数、耗时、结果）；失败的文件原样保留、单独列出。
- 体积：图片多的文档先在 Word 里压缩图片再转；PDF 还嫌大时看「压缩」。

## 提示词

帮我写一个把 {目录} 下所有 .docx 批量转成 PDF 的脚本，运行环境是 {环境，如 Linux 服务器上的 Docker 容器，或 装了 Word 的 Windows 电脑}。
1. Linux 用 LibreOffice 无界面模式，并行 {并发数} 个进程，每个进程用独立的 UserInstallation 目录，单个文件超时 60 秒就结束进程并记为失败；Windows 有 Word 时用 COM 的 ExportAsFixedFormat，按标题创建书签。
2. 容器里安装文档用到的中文字体（{字体清单，如 宋体、黑体、仿宋、楷体}，或许可允许的替代字体），构建时用 fc-list :lang=zh 检查。
3. 转换前检查：含修订或批注的文件先列出来、不直接转；能用 Word 时先更新全部域。
4. 转换后用 pdfinfo 读页数，和 docProps/app.xml 里的 Pages 对比；用 pdffonts 检查嵌入字体，出现替换字体的文件单独标出。
5. 输出到 {输出目录}，文件名与原文件一致；最后生成 report.csv（文件名、页数、耗时、结果、问题）。说明怎么运行，并估算 100 份文件的大致耗时。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">
<style>
.dg{--sec:#0891b2}
.m-col{display:grid;gap:10px;width:600px}
</style>

<div class="dg"></div>

<script type="module">
import { draw, flow, code } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  const f = flow([
    [{ t: '整理 docx', note: '更新域、清修订和批注' }, { t: '检查字体', note: 'fc-list :lang=zh' }, { t: 'soffice 转换', note: '每进程独立配置目录', acc: true }, { t: '核对页数', note: 'app.xml 的 Pages = pdfinfo' }],
    [{ t: '缺字体被替换', note: '行宽变 → 分页、目录页码变', bad: true, via: '页数对不上' }, { t: '装字体后重转', note: 'pdffonts 看嵌入字体', via: '修正' }, { t: '写进 report.csv', note: '文件名、页数、耗时、结果' }],
  ]);
  const c = code([{ t: '命令', text: `
soffice --headless --convert-to pdf --outdir out/ in/*.docx

# 并行时每个进程用自己的配置目录，单个文件 60 秒超时
soffice -env:UserInstallation=file:///tmp/lo-2 --headless \\
  --convert-to pdf --outdir out/ in/batch2/*.docx

pdfinfo out/合同_0012.pdf | grep Pages    # 和 docx 里记录的页数对比
pdffonts out/合同_0012.pdf                 # 嵌入的应是宋体、黑体等原字体
` }]);
  draw(root, '<div class="m-col">' + f + c + '</div>', { title: '批量转 PDF · 先装字体，转完核对页数', min: 0.45 });
}
</script>
