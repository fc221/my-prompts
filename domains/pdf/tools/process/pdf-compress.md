---
zh: 压缩
en: Compress PDF
aka: PDF压缩 减小体积 Ghostscript PDFSETTINGS 图片降采样 瘦身
order: 110
---

## 是什么

把已有的 PDF 变小。无损的做法是重新压缩数据流、合并重复对象、删掉没用的资源；有损的做法是图片降采样、重新编码 JPEG。大多数“几十 MB 的 PDF”，大头都在图片上。

## 适合

用户上传的扫描件、手机拍照合成的 PDF 太大；邮件和小程序有附件大小限制；归档存储成本高。

## 不适合

自己生成的文件太大，应该从源头控制（字体子集、图片分辨率），看「控制文件大小」「图片与分辨率」。

## 注意

先找出大在哪里再动手：pdfimages -list 列出每张图片的尺寸和 dpi，pdffonts 看有没有嵌入完整字体，合并来的文件常有重复的字体和图片。压缩后比原文件还大或几乎没变时，直接保留原文件。

## 要点

- 无损（qpdf，Apache 2.0）：qpdf in.pdf out.pdf --object-streams=generate --compress-streams=y --recompress-flate --compression-level=9，一般能省 5%–20%；pypdf 的 compress_identical_objects 去掉重复对象，适合合并来的文件。
- 有损（Ghostscript，AGPL）：gs -sDEVICE=pdfwrite -dPDFSETTINGS=/ebook -dNOPAUSE -dBATCH -dSAFER -sOutputFile=out.pdf in.pdf；/screen 约 72dpi、/ebook 约 150dpi、/printer 和 /prepress 约 300dpi；闭源商业服务要先解决授权。
- 不用 Ghostscript 的有损方案：pikepdf（MPL 2.0）遍历图片，用 Pillow 把超过目标分辨率的图缩到 150dpi、重新编码成质量 75–85 的 JPEG；pypdf 的 img.replace(img.image, quality=80) 也能做简单的重新编码。
- 扫描件：黑白文字页转成 1 位图，用 JBIG2 或 CCITT G4 编码，体积能降一个数量级；OCRmyPDF 的 --optimize 2 / 3 可以顺带做。
- Ghostscript 会重写整个文件：数字签名失效，表单、结构标签、部分书签和链接可能丢失；带签名或有「无障碍 PDF」要求的文件只做无损压缩。
- 验收：输出页数和原文件一致；首页和抽查页按 100dpi 渲染，和原文件对比；pdftotext 抽出的字符数和原文件相差不超过 1%；报告压缩前后大小和压缩比。
- 用户上传的文件：限制大小和页数，单个任务设超时（如 120 秒）；Ghostscript 一定带 -dSAFER 并在隔离容器里跑，它出过不少能被恶意文件利用的漏洞。

## 提示词

给 {服务} 加一个压缩 PDF 的功能：用户上传的 {文档类型}（如报销附件扫描件）超过 {体积阈值} MB 时自动压缩，目标是 {目标体积} MB 以内且文字清晰可读。
1. 先读现有上传和存储代码；压缩在后台任务里做，原文件保留，结果另存。
2. 先用 pdfimages -list 和 pdffonts 判断体积主要来自图片还是字体，写进任务日志。
3. 先做无损：qpdf --object-streams=generate --recompress-flate --compression-level=9；仍超过目标再做有损：能用 AGPL 时用 Ghostscript 的 /ebook，否则用 pikepdf + Pillow 把图片降到 150dpi、JPEG 质量 80。
4. 有数字签名的文件只做无损压缩并说明原因；体积不降反升或降幅小于 5% 时保留原文件。
5. 验收：页数一致；pdftotext 字符数相差不超过 1%；首页按 100dpi 渲染和原文件对比。
6. 边界情况：加密文件要求密码；损坏文件先用 qpdf 重写，再失败就拒绝；超过 {页数上限} 页或处理超过 {超时秒数} 秒就中止；在隔离容器里处理，Ghostscript 带 -dSAFER。
最后说明改了哪些文件，并报告三份样本（扫描件、电子版、合并来的文件）压缩前后的大小。
