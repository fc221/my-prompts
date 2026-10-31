---
zh: 打印 CSS 与分页排版引擎
en: Print CSS & paged media engines
aka: Paged.js WeasyPrint @page 分页媒体 paged-media 边距盒 running-header Vivliostyle
order: 40
---

## 是什么

用 CSS 分页媒体的写法（@page、边距盒、counter(page)、break-before、string-set 等）描述版式，再交给支持这些特性的引擎排版：WeasyPrint（Python，不跑 JavaScript）、Paged.js（在浏览器里补齐分页特性，再用无头浏览器打印）、Vivliostyle，或商业的 Prince。适合要像书一样排版、又想继续用 HTML 和 CSS 写模板的场景。

## 适合

产品手册、年度报告、标书、长合同：页眉显示当前章节名、目录自动带页码、封面和章首页版式不同、有脚注。

## 不适合

一两页的单据、只要固定的页脚页码，Chromium 自带的 @page 边距盒就够了，看「无头浏览器打印」；大量数学公式看「LaTeX 排版」；分页规则本身（孤行、表格跨页、强制分页）看「分页控制」「表格跨页」。

## 注意

各引擎支持的特性不一样，先确认再写模板。Chromium 131 起支持 @page 边距盒和 counter(pages)，但 running 元素、string-set、target-counter 和脚注要靠 Paged.js 或 WeasyPrint。WeasyPrint 不执行 JavaScript，图表要先在服务端渲染成 SVG 或图片；它对 flex 和 grid 的支持不如浏览器完整，复杂布局以所用版本的文档为准。

## 要点

- 页面：@page 写 size: A4 和 margin；@page :first 去掉封面的页眉页脚；章首页用命名页（元素上写 page: chapter，再定义 @page chapter）；左右页不同边距用 @page :left / :right。
- 动态页眉：章节标题用 string-set: chapter content() 记下，边距盒里写 content: string(chapter)；页眉要带样式时用 position: running(header) 加 content: element(header)。
- 页码：边距盒里写 content: "第 " counter(page) " 页，共 " counter(pages) " 页"；目录页码用 target-counter(attr(href), page)，书签和链接见「目录、书签与链接」。
- Paged.js：引入 paged.polyfill.js 后，页面在浏览器里先被切成一页页的 DOM，前端可以直接预览；导出时用 Puppeteer 等它的渲染完成回调（PagedConfig 的 after）再调 page.pdf，preferCSSPageSize: true、margin 设 0，页眉页脚全交给 CSS；也可以用 pagedjs-cli 命令行。
- WeasyPrint：HTML(string=...).write_pdf(...)，用了 @font-face 要把同一个 FontConfiguration 同时传给 CSS 和 write_pdf；系统字体靠 fontconfig 查找，镜像里装好中文字体再 fc-cache；依赖系统的 Pango，选基础镜像时先确认能装上。
- 安全：模板里有用户内容时，给 WeasyPrint 传自定义 url_fetcher，只允许 data: 和模板目录下的 file:，拒绝 http(s) 和其他路径，防止 SSRF 和读本机文件。
- 性能量级：WeasyPrint 出几页的单据约 0.2–1 秒，上百页带大表的报告要数秒到几十秒，单线程、内存随页数增长，并发用多进程；Paged.js 在浏览器里排 300 页以上会到几十秒，长文档按章节拆开排版再合并。

## 提示词

给 {产品} 的 {长文档名称}（如产品手册、年度报告）做打印排版，用 {WeasyPrint 或 Paged.js}，模板继续用 HTML + CSS。
1. 先读现有模板和数据来源，列出要实现的版式：封面、目录、章首页、正文、附录。
2. @page 设 A4 和页边距，封面不显示页眉页脚；页眉左侧显示文档名、右侧用 string-set 显示当前章名；页脚居中“第 X 页，共 Y 页”。
3. 目录由标题自动生成，页码用 target-counter，条目可点击跳转；章标题前强制分页，标题不落在页底。
4. 表格跨页重复表头、单行不被切断；图片按版心宽度缩放。
5. 中文字体用 @font-face 指向项目里的字体文件；WeasyPrint 传 FontConfiguration，Paged.js 等渲染完成回调后再用无头浏览器输出（preferCSSPageSize: true、margin 0）。
6. 模板里有用户内容时限制资源加载：WeasyPrint 用自定义 url_fetcher 只放行 data: 和模板目录，Paged.js 拦截外部请求。
7. 用 200 页的样本测耗时和内存，超过 60 秒就按章节分段排版再用 qpdf 合并，并说明分段后页码和目录怎么保持连续。
最后列出改了哪些文件，以及所选引擎不支持的 CSS 特性和你用的替代写法。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, page } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, page({
    pages: [
      { label: '封面：@page :first 不要页眉页脚', blocks: ['gap', 'gap', 'gap', 'title:门店运营手册', 'text:2026 版 · 华东区', 'gap', 'img'] },
      { head: '门店运营手册', foot: '第 2 页，共 86 页', label: '目录：target-counter 填页码', blocks: ['h:目录', 'toc:6'] },
      { head: '门店运营手册 · 第 3 章 收银与对账', foot: '第 17 页，共 86 页', label: '正文：string-set 把章名带进页眉', blocks: ['title:第 3 章 收银与对账', 'p:4', 'table:4', 'p:3'] },
    ],
  }), { center: true, min: 0.3 });
}
</script>
