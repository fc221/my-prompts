---
zh: 转图片与缩略图
en: PDF to image & thumbnails
aka: PDF转图片 PDF转PNG 缩略图 封面图 pdftoppm 预览图 栅格化
order: 70
---

## 是什么

把 PDF 页面渲染成 PNG、JPEG、WebP 图片：文件列表里的封面缩略图、移动端的逐页预览图、给 OCR 用的高分辨率图、分享到聊天软件的长图。

## 适合

文件列表显示首页缩略图；不方便装 PDF 查看器的端上按图片预览；OCR 和图像比对之前的栅格化。

## 不适合

在线查看要能选中文字、搜索、点链接，看「网页里预览 PDF」；只想取出 PDF 里嵌入的原始图片，用 pdfimages 直接导出，不用整页渲染。

## 注意

输出像素 = 页面宽高（pt）÷ 72 × dpi，一定要设上限。A0 图纸按 300dpi 渲染约 9933 × 14043 像素，单张 RGBA 约 560MB 内存，几张并发就能把服务撑爆。先读页面尺寸，按目标宽度反算缩放比例，不要对所有页用固定 dpi。

## 要点

- pdftoppm（Poppler，GPL）：pdftoppm -png -r 150 -f 1 -l 1 in.pdf out 出第一页；缩略图用 -scale-to 640 按长边缩放；-jpeg -jpegopt quality=80 出 JPEG；要矢量图用 pdftocairo -svg。
- pypdfium2（Apache / BSD，PDFium 的 Python 绑定）：page.render(scale=dpi/72) 后调 to_pil()，速度快、许可证宽松；PDFium 不是线程安全的，并发用多进程。
- Ghostscript（-sDEVICE=png16m -r150）和 MuPDF 的 mutool draw 也能渲染，都是 AGPL 或商业授权，闭源服务注意。
- 按用途定参数：列表缩略图长边 320 或 640px、WebP 质量 75；移动端逐页预览 150dpi；OCR 用 300dpi 灰度；打印校样 300dpi。
- 字体：PDF 没有嵌入字体时，渲染器会找系统里的替代字体，服务器缺中文字体就出方框；镜像里装中文字体和 poppler-data。
- 缓存：缓存键用 文件 SHA-256 + 页码 + 宽度，首次访问时生成；原文件一变摘要就变，旧缓存自然不再命中。
- 用户上传的文件：限制大小和页数、单页像素上限（如 4000 万）和单个任务超时（如 30 秒），渲染进程在隔离环境里跑；加密文件在没有密码时返回默认占位图，损坏文件记录后同样用占位图。

## 提示词

给 {服务} 加一个 PDF 缩略图功能：用户上传 {文档类型} 后生成首页缩略图（长边 {缩略图长边} px，WebP），文件详情页再按需生成每页 150dpi 的预览图。
1. 先读现有上传、存储和后台任务代码；缩略图在后台任务里生成，上传接口不等待。
2. 工具用 {pypdfium2 或 pdftoppm}；先读页面尺寸，按目标长边反算缩放比例，单页像素超过 4000 万时降到上限。
3. 缓存键用 文件 SHA-256 + 页码 + 宽度，存到对象存储；原文件更新后清理旧缓存。
4. 边界情况：加密文件、损坏文件、0 页文件用默认占位图并记录原因；横版页和带旋转的页方向要正确；超过 {页数上限} 页的文件只生成前 {预览页数} 页的预览。
5. 渲染进程限制内存，单个任务超时 30 秒，在隔离环境里跑；镜像里装中文字体，用一份没有嵌入字体的中文 PDF 测试不出方框。
6. 前端：缩略图还没生成好时显示骨架占位，生成失败显示文件类型图标。
最后说明改了哪些文件，以及处理一份 200 页文件的耗时和内存峰值。

## 示例

<link rel="stylesheet" href="../../../frontend/_shared/diagram.css">

<script type="module">
import { draw, code } from '../../../frontend/_shared/diagram.ts';
export default function demo(root) {
  draw(root, code([{ t: 'pdftoppm', text: `
# 列表缩略图：只出第 1 页，长边 640px
pdftoppm -png -f 1 -l 1 -scale-to 640 in.pdf thumb
# 移动端逐页预览：150dpi JPEG
pdftoppm -jpeg -jpegopt quality=80 -r 150 in.pdf page
# OCR 用：300dpi 灰度
pdftoppm -gray -r 300 in.pdf ocr
# 输出像素 = 页面宽高（pt）÷ 72 × dpi，先算再渲染
# A0 按 300dpi ≈ 9933 × 14043，单张 RGBA 约 560MB
` }]), { title: '转图片 · 一定要设像素上限' });
}
</script>
