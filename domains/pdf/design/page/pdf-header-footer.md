---
zh: 页眉页脚与页码
en: Headers, footers and page numbers
aka: 页码 第几页共几页 counter(page) 页脚 running header 边距区
order: 30
---

## 是什么

每页顶部和底部重复出现的文档名、编号和“第 3 页 / 共 12 页”。它们写在页边距区里，不占正文流，换页时自动重复。

## 适合

多页的报告、合同、长单据；打印后散页要能排回顺序；每页都要带合同编号或单据号。

## 不适合

单页的门票、证书一般不放页码；“作废”“样张”这类字样看「加水印」。

## 注意

各工具的实现差别很大。Chromium 131 起支持 @page 的边距区（@top-center、@bottom-right 等）和 counter(page)、counter(pages)；更早的版本只能用 page.pdf 的 headerTemplate / footerTemplate。两套机制同时开会叠在一起，只选一套。

## 要点

- 内容：页眉左侧文档名或单据号，右侧 logo（高不超过 8mm）或密级；页脚中间或外侧放“第 3 页 / 共 12 页”，左侧放生成时间或版本号。字号 8–9pt，颜色不浅于 #666。
- CSS 写法：在 @page 里写 @bottom-center 边距区，content 用字面文字拼接 counter(page) 和 counter(pages)；WeasyPrint、Prince、Paged.js、Chromium 131+ 都认。边距区高度就是对应方向的页边距，边距太小内容会被挤掉。
- headerTemplate / footerTemplate：用 class 为 pageNumber、totalPages、date、title 的 span 取值；只认内联样式，不加载外部图片和字体，logo 用 base64；默认字号极小，要显式写 9px 左右；margin 参数里要留出页眉页脚的高度。
- 封面不放页眉页码：@page :first 里把各边距区的 content 设为 none。封面不计页码、前言用罗马数字时，WeasyPrint / Prince 在正文起点 counter-reset: page；Chromium 做不到，就把封面单独生成再合并。
- 页眉跟着当前章节名变（running header）：WeasyPrint、Prince、Paged.js 用 string-set 和 string()，Chromium 不支持；Typst 在 header 里用 context 查询当前标题。
- Typst：set page(numbering: "第 1 页 / 共 1 页") 同时显示当前页和总页数，自定义 footer 时用 counter(page).display 加 both: true；LaTeX 用 fancyhdr 加 lastpage 宏包取总页数。
- 双面打印页码放外侧：@page :left 放左下，@page :right 放右下。

## 提示词

给{项目}的{文档类型} PDF 加页眉页脚和页码，按项目现有的生成方式实现：
1. 页眉：左侧 {页眉文字，如合同编号}，右侧 logo（高 6–8mm）；页脚：居中“第 X 页 / 共 Y 页”，左侧生成时间（yyyy-MM-dd HH:mm）。字号 8.5pt，颜色 #555，和正文之间留 4–6mm。
2. 先确认生成工具和版本：Chromium 131 以上、WeasyPrint、Prince、Paged.js 用 @page 边距区加 counter(page)、counter(pages)；更老的 Chromium 用 footerTemplate 的 pageNumber / totalPages，写内联样式和显式字号；Typst 用 page 的 numbering 或 footer。两套机制只留一套。
3. 封面（如有）不显示页眉页码；打印方式 {单面 / 双面}，双面时页码放外侧。
4. 上下边距留够页眉页脚的高度，正文不被盖住。
最后说明用的是哪种机制、改了哪些文件，并截图第 1 页、中间页和最后一页核对页码。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, page } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  const head = 'HT-2026-0158 · 年度保洁服务合同';
  const foot = '2026-10-29 14:35 · 第 {p} 页 / 共 {n} 页';
  draw(root, page({
    pages: [
      { label: '封面：@page :first 不显示', blocks: ['gap', 'gap', 'gap', 'gap', 'title:年度保洁服务合同', 'text:合同编号 HT-2026-0158'] },
      { head, foot, label: '第 2 页', blocks: ['h:第一条 服务内容与标准', 'p:6', 'h:第二条 服务期限', 'p:4', 'h:第三条 费用与支付', 'p:6', 'p:5'] },
      { head, foot, label: '第 3 页：页码随页变化', blocks: ['h:第七条 违约责任', 'p:5', 'h:第八条 变更与解除', 'p:6', 'text:（以下无正文）'] },
    ],
  }), { title: '@page 边距区 · counter(page) / counter(pages)', center: true, min: 0.3 });
}
</script>
