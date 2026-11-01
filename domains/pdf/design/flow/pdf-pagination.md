---
zh: 分页控制
en: Page breaks
aka: 分页 换页 break-inside orphans widows 孤行 寡行 空白页
order: 10
---

## 是什么

决定内容在哪里换页：章节从新页开始，标题不停在页底，图和图注、签章区这类块不被切成两半，段落首尾不只剩一行挂在另一页。

## 适合

报告的标题孤零零停在页底；签名栏一半在上一页、一半在下一页；文件末尾无故多出空白页。

## 不适合

表格的表头和行怎么跨页看「表格跨页」；纸张和边距看「页面尺寸与边距」。

## 注意

break-inside: avoid 只对高度不超过一页的块有效。加在整章或整张长表的外层会被忽略，有的引擎还会把整块挪到下一页，留下大半页空白。只加在小块上。

## 要点

- 强制换页：一级标题或每章容器 break-before: page，封面后 break-after: page；最后一个元素不写 break-after: page，否则末尾多一张空白页。
- 不切断：figure（图加图注）、卡片、合计区、签章区、短列表项加 break-inside: avoid；标题加 break-after: avoid，让标题和后面至少两行正文在一页。
- 孤行寡行：正文段落 orphans: 3、widows: 3。Chromium、WeasyPrint、Prince 支持，Firefox 不支持；Typst 默认会避开，可用 text 的 costs 参数调权重；LaTeX 调 clubpenalty 和 widowpenalty。
- 旧写法 page-break-before、page-break-inside 只有老内核（如 wkhtmltopdf 里的 WebKit）需要，新代码写 break-*，要兼容时两套并写。
- 需要跨页的大块内容放在普通块级流里：用 flex、grid、float 或 position: absolute 包住整页内容时，老内核和部分引擎不在里面分页，会整块挪页或直接裁掉；新版 Chromium 能拆分 flex 和 grid，但块级布局仍然最稳。
- 固定高度的元素（封面、满页底图）留 1mm 余量，高度写 mm；min-height: 100vh 在打印里不可靠。
- Typst 用 pagebreak() 和 block(breakable: false)，空页用 pagebreak(weak: true) 避免；LaTeX 用 clearpage 和 needspace 宏包。
- 检查：转成页面缩略图逐页看（见「转图片与缩略图」），把各组样例数据的期望页数写进测试，数据变化时回归。

## 提示词

整理{项目}里{文档类型} PDF 的分页规则，按项目现有的生成方式实现：
1. 换页：{从新页开始的部分，如每个一级章节、附件} 前强制换页；末尾不留空白页。
2. 不切断：图和图注、卡片、合计区、签章区加 break-inside: avoid；标题加 break-after: avoid；正文段落 orphans 和 widows 都设 3。只加在高度小于一页的块上。
3. 把包住整页内容的 flex、grid、绝对定位改成普通块级布局，避免整块挪页或被裁掉。
4. 准备三组数据（内容很少、刚好超过一页、很多页）分别生成，转成页面图片逐页检查：没有标题落在页底、没有被切开的签章区、没有空白页。
最后列出改动的选择器和文件，以及三组数据各自的页数。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, page } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  const head = '2026 年 10 月经营报告';
  draw(root, page({
    pages: [
      { head, foot: '第 {p} / {n} 页', label: '章末强制换页，不留半截标题', blocks: ['title:一、销售概况', 'p:6', 'img', 'text:图 1-1 各门店营业额（图和图注不切开）', 'p:5', 'break'] },
      { head, foot: '第 {p} / {n} 页', label: '新章从新页开始，签章区整块', blocks: ['title:二、门店分析', 'p:5', 'h:2.1 新开门店', 'p:4', 'total:¥ 1,286,400.00', 'sign'] },
    ],
    notes: ['h1 { break-before: page }', 'figure、签章区 break-inside: avoid', 'p { orphans: 3; widows: 3 }'],
  }), { center: true, min: 0.3 });
}
</script>
