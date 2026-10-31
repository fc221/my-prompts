---
zh: 无头浏览器打印
en: Headless browser PDF (Puppeteer / Playwright)
aka: Puppeteer Playwright page.pdf HTML转PDF 网页转PDF Chrome打印 Chromium
order: 30
---

## 是什么

用 Puppeteer 或 Playwright 打开一个 HTML 页面，调用 page.pdf 按打印样式输出 PDF。排版能力就是 Chromium 的排版能力：flex、grid、SVG 图表、Web 字体都能用，模板是普通 HTML 加打印 CSS。

## 适合

前端已有的报表、订单详情、合同预览要“所见即所得”导出；模板由前端维护；几十页以内的单据和报告。

## 不适合

页眉随章节变化、目录带页码、脚注这类书籍级需求看「打印 CSS 与分页排版引擎」或「Typst 排版」；部署环境装不了浏览器、或者要每秒上百份，看「代码直接绘制」。

## 注意

页眉页脚有两种做法，选一种。一是 displayHeaderFooter 加 headerTemplate / footerTemplate，模板里用 class 为 pageNumber、totalPages 的 span 填页码；这两个模板和正文样式隔离，默认字号很小要自己写 font-size，加载不了外部图片和 Web 字体（图片用 data URI，字体要是系统已安装的），还必须用 margin 给它留出位置。二是 Chromium 131 起支持的 @page 边距盒（@top-center、@bottom-right 等，content 里写 counter(page) 和 counter(pages)），样式和正文写在一起，更好维护；用它时 page.pdf 设 preferCSSPageSize: true，不开 displayHeaderFooter。

## 要点

- 调用：page.pdf 传 format: 'A4'、printBackground: true（不开时背景色和底纹都不印）、preferCSSPageSize: true 让 CSS 里的 @page size 和 margin 生效；默认按 print 媒体渲染，要屏幕样式时先调 page.emulateMedia。
- Playwright 的 page.pdf 只在无头 Chromium 下可用，Firefox、WebKit 会直接报错；Puppeteer 的 tagged 默认开（带结构标签，见「无障碍 PDF」），Playwright 默认关，需要时显式传 tagged: true；按标题生成书签可以试 outline: true（实验性）。
- 等内容就绪再打印：setContent 或 goto 时等 networkidle0（Playwright 是 networkidle），再确认 document.fonts.ready（Puppeteer 的 waitForFonts 默认已经在等）；有图表就等表示“渲染完成”的标记元素出现，动画全部关掉。
- 中文字体：镜像里装 Noto Sans CJK SC 等字体并执行 fc-cache，或用 @font-face 指向项目里的 ttf / woff2；font-family 明确写字体名，不依赖系统回退。开发机正常、服务器出现方框（豆腐块），几乎都是服务器缺字体。
- 部署：Docker 默认 /dev/shm 只有 64MB，给 --shm-size=1g 或浏览器加 --disable-dev-shm-usage；以非 root 运行并保留沙箱，--no-sandbox 只在容器本身已隔离时用；固定 TZ 和 LANG。
- 内存与并发：Chromium 常驻 100–200MB，每页再占几十到几百 MB；复用同一个浏览器、每份新开页面用完关闭，并发不超过 CPU 核数。热浏览器出 1–5 页的单据约 100–500 毫秒，冷启动浏览器另加 0.5–2 秒。
- 安全：HTML 里的用户输入先转义；Puppeteer 用 page.setRequestInterception、Playwright 用 page.route，只放行模板自己的资源，拦掉外网和 file:// 请求，防止被注入的标签读内网或本地文件；模板不需要脚本就用 page.setJavaScriptEnabled(false) 关掉。

## 提示词

给 {服务} 加一个导出 PDF 功能：把 {页面或模板}（如订单详情页）导出成 A4 PDF，用 {Puppeteer 或 Playwright}。
1. 先读现有代码：数据来源、已有的打印样式、镜像里有没有 Chromium 和中文字体。
2. 模板在服务端填好数据再 setContent，用户输入先转义；拦截模板以外的网络和 file:// 请求；用不到脚本就关掉 JavaScript。
3. @page 的 size 和页边距写在 CSS 里，page.pdf 的 preferCSSPageSize 和 printBackground 设为 true；页脚用 @page 边距盒写“第 X 页 / 共 Y 页”，Chromium 低于 131 时改用 footerTemplate 并显式写 font-size。
4. 中文字体用 @font-face 指向项目里的字体文件；Dockerfile 装字体后 fc-cache，再用 fc-list :lang=zh 检查。
5. 等 networkidle 和 document.fonts.ready 后再输出；复用浏览器实例、每份用完关闭页面，并发上限取 CPU 核数；单份超时 30 秒，超时返回 504 并记录单号。
6. 边界情况：数据为空输出一页“暂无数据”；明细超过 1000 行测分页和耗时；超长字段不撑破版面。
最后说明改了哪些文件，以及本地和容器里各出一份样本的命令。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, code } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, code([
    { t: 'print.css', text: `
@page {
  size: A4;
  margin: 16mm 14mm;
  @bottom-center {
    content: "第 " counter(page)
      " 页 / 共 " counter(pages) " 页";
  }
}
` },
    { t: 'page.pdf', text: `
await page.setContent(html,
  { waitUntil: 'networkidle0' })
await page.evaluate(
  () => document.fonts.ready)
await page.pdf({
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
})
` },
  ]), { title: '无头浏览器打印 · 页脚写在 @page 里' });
}
</script>
