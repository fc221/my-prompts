---
zh: 字体嵌入与中文
en: Font embedding and CJK text
aka: 中文乱码 方框 豆腐块 字体子集 思源黑体 思源宋体 字号 行距
order: 20
---

## 是什么

PDF 里用到的字体要嵌进文件，对方电脑没装也能原样显示；中文字体只嵌用到的字（子集），再配好正文的字号和行距。

## 适合

服务器上生成的 PDF 中文显示成方框或换了字体；复制出来的文字是乱码；嵌了整套中文字体，几页纸十几 MB。

## 不适合

网页上的字体选择和加载看「常用开源字体」；字体之外的体积问题看「控制文件大小」。

## 注意

服务器和容器里通常没有中文字体，生成器会悄悄换成后备字体或画成方框，本机预览却一切正常。字体文件要随项目或镜像一起部署，生成前确认字体已经加载完。

## 要点

- 字体：正文和标题用思源黑体（Noto Sans SC / Source Han Sans SC）；合同、证书、长文正文可用思源宋体（Noto Serif SC）；金额和编号开 font-variant-numeric: tabular-nums。两款都是 SIL OFL，可嵌入可商用；微软雅黑、方正等字体嵌入商用 PDF 要另买授权。
- 字号：正文 10–11pt（五号 10.5pt），表格和单据 9–10pt，脚注、表注 8–9pt，打印品最小 6pt；h1 18–22pt、h2 14–16pt、h3 12pt。
- 行距：正文 1.4–1.6，单据和表格 1.3–1.4，标题 1.2–1.3；中文段落用首行缩进 2em 或段间距 0.5em，二选一。
- 用静态字重文件，Regular、Bold 各一个，font-synthesis: none 关掉伪粗体；可变字体在部分生成器里会整套嵌入或字重不对。
- 子集：Chromium、WeasyPrint、Typst 默认只嵌用到的字形；用 pdffonts 检查，每款字体 emb、sub、uni 三列都是 yes，uni 为 no 时复制出来就是乱码。
- 部署：字体放在项目 fonts/ 目录，@font-face 指向本地文件（Typst 用 --font-path，LaTeX 用 XeLaTeX 加 ctex 指定字体文件），镜像里另装 fonts-noto-cjk 兜底；Chromium 生成前等 document.fonts.ready，Puppeteer 的 waitForFonts 默认已开，Playwright 要自己等。
- 生僻字和少数民族人名：后备链里加一款覆盖扩展区汉字的字体；批量生成前用字体的字符表比对每份数据，缺字形就报错停下，不输出带方框的文件。

## 提示词

修正{项目}生成的 PDF 里的中文字体，按项目现有的生成方式改：
1. 字体：正文 {正文字体，默认思源黑体}，标题用同家族粗体；合同、证书这类正式文档正文用思源宋体。只用 Regular 和 Bold 两个静态字重文件，放进项目 fonts/ 目录随代码部署，关掉伪粗体。
2. 字号和行距：正文 10.5pt / 1.5，表格 9.5pt / 1.35，脚注 8pt，h1 20pt、h2 15pt、h3 12pt；金额和编号用等宽数字。
3. 生成前确认字体已加载完（document.fonts.ready 或对应工具的字体路径参数），容器镜像补装中文字体兜底。
4. 生成后用 pdffonts 检查：只出现这几款字体，emb、sub、uni 都是 yes；复制一段中文和一行金额粘贴出来核对。
5. 加缺字检查：数据里有字体覆盖不到的字时报错并列出这些字。
最后说明改了哪些文件、字体文件的许可证和生成后的字体列表。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, code } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, code([
    { t: 'fonts/ 随项目部署', text: `
@font-face {
  font-family: "Noto Sans SC";
  src: url(fonts/NotoSansSC-Regular.otf);
}
body { font: 10.5pt/1.5 "Noto Sans SC";
       font-synthesis: none; }
.amount {
  font-variant-numeric: tabular-nums; }
` },
    { t: '生成后检查', text: `
$ pdffonts receipt.pdf
name                       emb sub uni
XKQZAB+NotoSansSC-Regular  yes yes yes
XKQZAB+NotoSansSC-Bold     yes yes yes
# uni 为 no：复制出来是乱码
` },
  ]), { title: '中文字体：子集嵌入 · Regular / Bold 两个静态字重' });
}
</script>
