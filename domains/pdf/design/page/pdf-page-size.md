---
zh: 页面尺寸与边距
en: Page size and margins
aka: 纸张大小 页边距 A4 装订边 版心 @page 横版
order: 10
---

## 是什么

PDF 的纸张尺寸、方向和四边留白，决定版心（正文可用区域）有多大。尺寸和边距在 @page 里一次定死，所有页面按同一套数值排。

## 适合

新做一类 PDF 时先定纸张和边距；打出来字贴着纸边、装订后被订书钉压住；同一份文档在不同机器上生成的页数不一样。

## 不适合

页眉页脚里放什么看「页眉页脚与页码」；印刷品的出血和裁切看「打印颜色与出血」；门票、名片这类非标尺寸也用这里的写法，只是数值换成成品尺寸。

## 注意

无头浏览器生成时，page.pdf 的 format、margin 参数和 CSS 里的 @page 会互相覆盖：Puppeteer 和 Playwright 的 format 默认是 Letter，不开 preferCSSPageSize 就会把 A4 内容缩放到 Letter 纸上。尺寸和边距只在一处写。

## 要点

- A4 竖版 210×297mm（595×842pt，按 CSS 的 96px/in 是 794×1123px）；横版写 size: A4 landscape；A5 148×210mm 用于小册子；Letter 215.9×279.4mm 只给海外客户的单据用。
- 正文类文档：上下 20–25mm，左右 18–20mm，版心宽约 170–174mm；收据、报销单这类内容密的单据可收到四边 12–15mm。
- 装订侧再加 5mm：单面打印左侧装订写 margin-left 25mm；双面打印用 @page :left 和 @page :right 做镜像，内侧 25mm、外侧 18mm。
- 页眉页脚放在边距区里，上下边距至少留 15mm，其中 8–10mm 给页眉页脚文字，其余是它和正文的间距。
- 尺寸一律用 mm 或 pt，不用 px 和 vh；封面这类整页元素高度写成纸高减上下边距再少 1mm，写满 297mm 会因为取整多出一张空白页。
- Chromium 路线：@page 里写 size 和 margin，调用时开 preferCSSPageSize: true、scale 保持 1，不再传 format 和 margin；WeasyPrint、Prince、Paged.js 直接读 @page。
- Typst 写 set page(paper: "a4", margin: (top: 22mm, bottom: 20mm, x: 18mm))，双面装订把 x 换成 inside / outside；LaTeX 用 geometry 宏包设 a4paper、四边边距和 bindingoffset。
- 封面、横版附表这类特殊页用命名页：分别写 @page cover、@page wide，元素上写 page: cover；WeasyPrint、Prince 和较新的 Chromium 支持，老内核不认就单独生成再拼起来（见「合并、拆分与重排」）。

## 提示词

检查并统一{项目}里{文档类型}的 PDF 页面尺寸和边距，按项目现有的生成方式改（先找到模板和生成调用的位置）：
1. 纸张 {纸张，默认 A4 竖版 210×297mm}；边距上 22mm、下 20mm、左右 18mm；装订方式 {不装订 / 左侧装订 / 双面装订}，装订侧加 5mm，双面装订用左右页镜像。
2. 尺寸和边距只在一处定义：HTML 路线写在 @page，page.pdf 开 preferCSSPageSize、scale 为 1，删掉 format 和 margin 参数；Typst 写在 page 设置里，LaTeX 写在 geometry 里。
3. 样式里的尺寸改用 mm / pt，整页元素高度不超过版心高度，查一遍有没有多出来的空白页。
4. 封面或横版附表需要不同版式时用命名页单独设置，工具不支持就分开生成再合并。
最后列出改了哪些文件，写明版心尺寸（宽×高 mm），并对比改前改后的页数。
