---
zh: 网页里预览 PDF
en: In-browser PDF viewer
aka: PDF.js pdfjs-dist 在线预览 PDF查看器 iframe预览 移动端预览PDF
order: 80
---

## 是什么

在网页里直接打开 PDF。最简单的是用 iframe 交给浏览器自带的查看器；要各端表现一致、加水印、控制下载和打印，就用 PDF.js（pdfjs-dist）自己把页面渲染到 canvas，再叠一层可选中的文字层。

## 适合

合同、报告、发票的在线查看；审批流程里边看边批；移动端和小程序里预览附件。

## 不适合

列表里只要一张封面，看「转图片与缩略图」；要在页面上填写内容或签署，看「填写表单」「数字签名」。

## 注意

浏览器自带查看器在桌面端好用，但安卓 Chrome 和不少 App 内置浏览器不能内嵌显示 PDF，只会触发下载，iOS 的内嵌表现也不统一；移动端要稳定就用 PDF.js，或服务端转成图片。PDF.js 要及时升级：4.2.67 以前的版本有可以执行任意 JavaScript 的漏洞（CVE-2024-4367），暂时升不了的至少把 isEvalSupported 设为 false。

## 要点

- 最简方案：iframe 或 object 指向文件地址，响应头 Content-Type: application/pdf、Content-Disposition: inline，中文文件名用 filename* 的 UTF-8 编码写法；同时给一个“下载”按钮兜底。
- PDF.js 初始化：GlobalWorkerOptions.workerSrc 指向同版本的 pdf.worker.mjs；getDocument 传 cMapUrl（以 / 结尾）和 cMapPacked: true，否则没嵌入字体的中文会显示成乱码或空白；standardFontDataUrl 一起配好。
- 只渲染看得见的页：用 IntersectionObserver 渲染视口内和前后各 1 页，离开视口的 canvas 释放；canvas 尺寸 = 视口尺寸 × devicePixelRatio（移动端最多按 2 倍），单个 canvas 不超过约 1670 万像素（iOS Safari 的上限）。
- 文字层（TextLayer）负责选中、复制和页内搜索，链接层负责可点的链接，外部链接在新窗口打开并带 rel="noopener"。
- 大文件分段加载：服务端支持 Range 请求（Accept-Ranges: bytes，返回 206），跨域时在 Access-Control-Expose-Headers 里放出 Accept-Ranges、Content-Range、Content-Length；文件用 qpdf --linearize 线性化，首页能先显示出来。
- 加密文件用 loadingTask.onPassword 弹出密码输入，密码错误给明确提示；文件损坏时显示“文件无法打开”和下载按钮。
- 机密文件：地址用短时效的签名链接，canvas 上叠加用户水印；用户能看到就能截屏，真正的控制在鉴权和审计上。
- 小程序里用 wx.downloadFile 下载后 wx.openDocument 打开；React 项目常用的 react-pdf 查看组件就是 PDF.js 的封装，同样要配好 worker 和 cMap。

## 提示词

给 {产品} 加一个在线预览 PDF 的功能：在 {页面位置}（如合同详情页右侧）打开 {文档类型}，桌面端和移动端表现一致，用 pdfjs-dist。
1. 先读现有前端技术栈和文件下载接口；worker、cmaps、standard_fonts 从同一版本的 pdfjs-dist 复制到静态资源目录，版本不低于 4.2.67。
2. getDocument 传 cMapUrl、cMapPacked: true、standardFontDataUrl；只渲染视口内和前后各 1 页，canvas 按 devicePixelRatio 放大（移动端最多 2 倍），离开视口的页释放。
3. 叠加文字层支持选中和页内搜索；工具栏有页码跳转、缩放（适合宽度、50%–300%）和下载，都能用键盘操作。
4. 文件接口支持 Range 请求；超过 {大小阈值} MB 的文件在上传时用 qpdf --linearize 处理。
5. 边界情况：加密文件弹出密码框，输错提示重试；损坏文件显示“文件无法打开”和下载按钮；加载中显示进度；网络中断可重试。
6. 文件地址用 {时效} 分钟有效的签名链接；需要水印时在每页 canvas 上叠加“{水印文字}”。
最后说明改了哪些文件，并在桌面 Chrome、iOS Safari、安卓 Chrome 各打开一份 50 页的中文 PDF 截图验证。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, flow } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, flow([
    [{ t: '浏览器自带查看器', note: 'Content-Disposition: inline' }, { t: '安卓 / App 内', note: '不能内嵌，只会触发下载', bad: true, via: '移动端' }],
    [{ t: 'worker + cMap', note: '同版本，中文不乱码', acc: true }, { t: 'Range 分段加载', note: '206 · 首页先出' }, { t: '只渲染视口 ±1 页', note: 'canvas 离开就释放', acc: true }, { t: '文字层', note: '选中、复制、搜索' }],
  ], { lanes: ['iframe', 'PDF.js'] }), { title: '网页预览 · 移动端要稳定就用 PDF.js' });
}
</script>
