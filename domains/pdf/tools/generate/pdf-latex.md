---
zh: LaTeX 排版
en: LaTeX (XeLaTeX + ctex)
aka: LaTeX XeLaTeX ctex latexmk TeX-Live 论文排版 公式 试卷
order: 70
---

## 是什么

用 XeLaTeX（或 LuaLaTeX）加 ctex 宏包编译中文文档。排版质量和公式能力最成熟，宏包生态最大；代价是环境重（完整的 TeX Live 有好几 GB）、编译慢、报错难读。

## 适合

公式多的技术文档、试卷、论文、学术报告；已有现成的 LaTeX 模板要接进系统批量出稿。

## 不适合

一般业务单据和报告用「Typst 排版」，编译快一两个数量级、模板好维护；要和网页一致看「无头浏览器打印」。

## 注意

用户数据拼进 .tex 之前必须转义：反斜杠、花括号、$、&、%、#、_、^、~ 都有特殊含义，不转义轻则编译失败，重则执行任意 TeX 命令。同时关掉 shell escape，并在沙箱里编译，避免模板被注入后用 \input 读取服务器上的文件。

## 要点

- 文档类用 ctexart、ctexrep、ctexbook，或在其他文档类上加载 ctex 宏包；用 latexmk -xelatex -interaction=nonstopmode -halt-on-error 编译，它会自动跑够遍数，让交叉引用和总页数正确。
- 中文字体：ctex 在 Linux 上默认用 Fandol 字体，只覆盖常用字，生僻字和部分人名用字会缺；服务器上设 fontset=none，再用 \setCJKmainfont、\setCJKsansfont 指定装好的思源宋体、思源黑体，字体名用 fc-list :lang=zh 确认。
- 页眉页脚：fancyhdr 宏包设页眉页脚，lastpage 宏包取总页数，页脚写成“第 X 页 共 Y 页”；章首页用 plain 页面样式。
- 长表格用 longtable 或 xltabular，\endhead 之前的行在每页重复；图和表是浮动体，位置不理想时先放宽到 [htbp]，少用强制的 H。
- 环境：TeX Live 用精简安装（scheme-basic 或 scheme-small）再 tlmgr install 用到的宏包，镜像能从几 GB 压到几百 MB；第一次编译会建字体缓存，构建镜像时先编译一份样本把缓存做进去。
- 安全与稳定：命令加 -no-shell-escape；texmf.cnf 里把 openin_any、openout_any 设成 p（paranoid），只允许读写当前目录；单份超时 60 秒，超时杀掉整个进程组；日志里出现 Missing character 警告按失败处理。
- 量级：XeLaTeX 跑一遍 1–3 秒，带目录和交叉引用要两到三遍；并发靠多进程，每个进程一两百 MB 内存。

## 提示词

写一个脚本把 {数据来源}（如题库导出的 JSON）批量编译成 {文档类型}（如单元测验试卷）PDF，用 XeLaTeX + ctex。
1. 先读现有模板和数据；模板里用占位标记，由脚本填入转义后的数据：反斜杠、花括号、$、&、%、#、_、^、~ 全部转义，只有可信来源的公式字段原样放入。
2. 文档类用 ctexart，fontset=none，正文和标题字体指定项目 fonts/ 里的思源宋体和思源黑体；页眉放 {页眉内容}，页脚用 fancyhdr + lastpage 显示“第 X 页 共 Y 页”。
3. 用 latexmk -xelatex -interaction=nonstopmode -halt-on-error -no-shell-escape 编译，只允许读写当前目录；每份在独立临时目录里编译，完成后清理中间文件。
4. 单份超时 60 秒，超时杀掉整个进程组；日志里出现 Missing character 或 Undefined control sequence 判定失败，报告出错行号和数据 id。
5. 给出 Dockerfile：TeX Live 精简安装加用到的宏包、中文字体，构建时先编译一份样本生成字体缓存。
6. 边界情况：题目里有公式、有 & 和 % 这类字符、有超宽表格和图片时都要能出稿。
最后说明脚本用法、镜像大小和单份平均耗时。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, code } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, code([
    { t: 'main.tex 导言区', text: String.raw`
\documentclass[fontset=none]{ctexart}
\setCJKmainfont{Source Han Serif SC}
\setCJKsansfont{Source Han Sans SC}
\usepackage{fancyhdr,lastpage}
\pagestyle{fancy}
\cfoot{第 \thepage{} 页 共 \pageref{LastPage} 页}
` },
    { t: '编译', text: String.raw`
latexmk -xelatex -no-shell-escape \
  -interaction=nonstopmode \
  -halt-on-error main.tex
# texmf.cnf：只读写当前目录
openin_any = p
openout_any = p
` },
  ]), { title: 'XeLaTeX + ctex' });
}
</script>
