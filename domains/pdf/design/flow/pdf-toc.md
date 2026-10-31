---
zh: 目录、书签与链接
en: TOC, bookmarks and links
aka: 目录页 书签 大纲 outline 内部跳转 超链接 元数据
order: 30
---

## 是什么

长文档的目录页、阅读器侧栏里的书签（大纲），以及点了能跳转的内部和外部链接。三者都从 h1–h3 标题生成，标题写对了，目录和书签就有了来源。

## 适合

超过 6 页的报告、手册、合同；需要在阅读器里快速跳到某一章。

## 不适合

一两页的单据不做目录；标签和读屏顺序看「无障碍 PDF」。

## 注意

目录里的页码最难。WeasyPrint、Prince、Paged.js 用 target-counter 自动取页码；Chromium 不支持 target-counter，要么两遍生成（先出一版读出各标题所在页，填回目录再生成，并确认页数没变），要么目录只放可点击的标题、不放页码。

## 要点

- 标题层级：h1 章、h2 节、h3 小节，不跳级，不用加粗段落冒充标题；每个标题带稳定 id（sec-3-2），目录项写成指向 #sec-3-2 的链接。
- 书签：WeasyPrint、Prince 默认按 h1–h6 生成，用 bookmark-level 只保留到 h3；Puppeteer 开 outline: true（实验选项），Playwright 1.42 起也有 outline；Typst 按标题自动生成；LaTeX 用 hyperref 加 bookmark 宏包。
- 目录页码：WeasyPrint / Prince / Paged.js 写 content: target-counter(attr(href url), page)，配点线引导，页码右对齐、等宽数字。
- 内部链接：Chromium 会把 #id 链接转成 PDF 内跳转，前提是目标元素存在且 id 不重复；外部链接写完整的 https 地址。
- 打印版要看到网址时，在 @media print 里用 attr(href) 把地址显示在外链后面；屏幕版不显示。
- 元数据：HTML 的 title 会成为 PDF 标题，html 的 lang 设 zh-CN；WeasyPrint 还会读 author、description、keywords 这些 meta，Chromium 不写作者，需要时在后处理里补。
- 打开文件时直接显示书签面板：后处理里把 PageMode 设为 UseOutlines（pikepdf、pdf-lib 都能改）。

## 提示词

给{项目}的{文档类型} PDF 加目录、书签和链接，按项目现有的生成方式实现：
1. 梳理标题：h1 章、h2 节、h3 小节，不跳级，每个标题生成稳定 id。
2. 目录页放在封面后，列到 {目录层级，默认 h2}，目录项可点击跳转；工具支持 target-counter 就显示右对齐页码和点线，Chromium 路线用两遍生成填页码，填完确认页数没变。
3. 书签到 h3，按工具开启：Puppeteer / Playwright 的 outline、WeasyPrint 的 bookmark-level、Typst 默认生成、LaTeX 的 hyperref。
4. 元数据：标题 {文档标题}，语言 zh-CN，作者 {编制部门}。
5. 检查：在阅读器里点每个目录项都能跳到对应标题，书签层级和标题一致，外链能打开。
最后说明目录页码是怎么得到的、改了哪些文件。
