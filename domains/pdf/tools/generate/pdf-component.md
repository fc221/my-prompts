---
zh: 组件式生成
en: Component-based PDF (react-pdf, pdfmake)
aka: react-pdf @react-pdf/renderer pdfmake QuestPDF jsPDF 前端生成PDF 浏览器生成PDF
order: 50
---

## 是什么

用组件或声明式结构描述文档，由库自己计算布局并输出 PDF，不经过浏览器排版。React 里是 @react-pdf/renderer（Document、Page、View、Text、Image 组件，样式是 CSS 的子集，布局只有 flexbox）；JavaScript 里还有用一份文档定义对象描述内容的 pdfmake；.NET 里有 QuestPDF。浏览器和 Node 都能跑。

## 适合

React 项目里的简历、证书、小票、几页的报价单；数据已在前端、点按钮直接下载；服务端不想装浏览器。

## 不适合

要复用现有网页样式（grid、浮动、复杂表格）看「无头浏览器打印」；上百页、以表格为主的报告看「Typst 排版」或「代码直接绘制」；在现成 PDF 底版上套打看「代码直接绘制」里的 pdf-lib 用法。

## 注意

中文要做两步。一是用 Font.register 注册中文字体：只认 TTF 和 WOFF，可变字体不行，每个字重单独注册一个文件。二是中文句子没有空格，默认断词会让整段不换行或溢出，要用 Font.registerHyphenationCallback 把中文按单字拆开、英文单词保持整体。完整的中文字体有十几 MB，浏览器端生成时字体按需加载，不打进主包。

## 要点

- 结构：Document > Page（size="A4"，wrap 默认开，内容自动续页）> View / Text；样式用 StyleSheet.create，数值单位默认是 pt。
- 页眉页脚和页码：元素加 fixed 会在每页重复；Text 的 render 回调拿到 pageNumber 和 totalPages，渲染成“第 X 页 / 共 Y 页”。
- 分页：break 强制换页，wrap=false 让一块内容不被拆开，标题加 minPresenceAhead 避免落在页底；没有 table 元素，表格用 View 拼，跨页表头设 fixed（整页只有这张表时）或按每页行数自己切分。
- 服务端：renderToBuffer、renderToStream、renderToFile；布局是同步的 CPU 计算，几十页以上放到 worker_threads 或单独进程，别卡住 HTTP 主线程。
- 浏览器端：PDFDownloadLink、usePDF 或 pdf(...).toBlob()；库和字体都动态 import，生成期间按钮显示进度并禁止重复点击。
- 名字容易混：npm 上叫 react-pdf 的查看组件是 PDF.js 的封装，用于「网页里预览 PDF」，和生成用的 @react-pdf/renderer 是两个库。
- 其他选择：pdfmake 的中文字体要打进它的虚拟文件系统（vfs），包体会大一圈；jsPDF 的 html() 靠 html2canvas 还原版式，复杂样式容易失真，中文还要额外 addFont，正式文档少用。
- 量级：@react-pdf/renderer 出 1–5 页约 100–500 毫秒，100 页以上到数秒；QuestPDF 在企业年营收超过一定额度后要买商业授权，按它的许可条款核对。

## 提示词

给 {产品} 加一个 {文档类型}（如会员权益卡、报价单）的 PDF 下载功能，用 @react-pdf/renderer，在 {浏览器端或 Node 服务端} 生成。
1. 先读现有组件和数据结构，PDF 组件单独放在 src/pdf/。
2. 中文字体：Font.register 注册项目里的 TTF（常规和粗体各一个文件，不用可变字体）；用 Font.registerHyphenationCallback 把中文按单字拆开、英文单词保持整体，拿 300 字无空格的中文测换行。
3. 页面 A4，页眉页脚用 fixed，页脚 Text 用 render 回调显示“第 X 页 / 共 Y 页”；明细行加 wrap=false，标题加 minPresenceAhead。
4. 浏览器端：库和字体动态 import，生成中按钮禁用并显示“正在生成”；服务端：renderToBuffer 放在 worker_threads 里跑，单份超时 20 秒。
5. 文件名按 {文件名规则}（如 报价单-客户名-日期.pdf），响应头带 Content-Disposition 和 UTF-8 编码的文件名。
6. 边界情况：明细 0 条、200 条、单条备注 500 字、图片加载失败时显示占位。
最后说明改了哪些文件，以及在 Chrome 和 iOS Safari 各下载一份的检查结果。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, code } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, code([{ t: '@react-pdf/renderer', text: `
Font.register({ family: 'SourceHanSans', src: '/fonts/SourceHanSansSC-Regular.ttf' })
// 中文按单字拆开，英文单词保持整体
Font.registerHyphenationCallback((w) =>
  /^[A-Za-z0-9]+$/.test(w) ? [w] : Array.from(w))
<Page size="A4">
  <Text fixed>报价单 · 杭州西湖店</Text>
  <View wrap={false}>…一行明细…</View>
  <Text fixed render={({ pageNumber, totalPages }) =>
    '第 ' + pageNumber + ' 页 / 共 ' + totalPages + ' 页'} />
</Page>
` }]), { title: '组件式生成 · fixed 每页重复' });
}
</script>
