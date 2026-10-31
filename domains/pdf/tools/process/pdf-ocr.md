---
zh: 扫描件识别
en: OCR for scanned PDFs
aka: OCR 文字识别 扫描件 OCRmyPDF Tesseract 可搜索PDF 双层PDF
order: 60
---

## 是什么

扫描件和拍照转成的 PDF，每页只是一张图片，不能搜索和复制。OCR 识别出文字后，作为一层看不见的文字叠在图片位置上，生成“双层 PDF”：看起来和原来一样，但能搜、能复制、能提取。

## 适合

纸质合同、档案、发票扫描件归档；扫描件要进全文检索，或接着做「提取文字与表格」；手机拍的单据转成可搜索文档。

## 不适合

电子生成、本来就有文字层的 PDF 直接提取，看「提取文字与表格」；要精确的结构化识别（发票字段、复杂表格、手写体），通用 OCR 准确率不够，改用专门的票据或表格识别服务，并保留人工复核。

## 注意

识别效果主要取决于输入：分辨率低于 200dpi、倾斜、阴影、反光都会让中文识别率明显下降。先判断每页是否已有文字层，已有的页跳过；把整份文档强制重新栅格化，会把电子版里的矢量文字也变成图片。

## 要点

- OCRmyPDF（MPL 2.0）：ocrmypdf -l chi_sim+eng --deskew --rotate-pages in.pdf out.pdf；v17 起用 --mode skip / force / redo 控制已有文字层的页（旧参数 --skip-text、--force-ocr、--redo-ocr 仍可用），一般用 skip。
- 引擎是 Tesseract（Apache 2.0），中文要装 chi_sim 语言包，竖排文字用 chi_sim_vert；对中文准确率要求更高时可以换 PaddleOCR 这类中文模型，再自己把文字层写回 PDF。
- 许可证：OCRmyPDF 栅格化和生成 PDF/A 时可能调用 Ghostscript（AGPL）；v17 起可以用 --rasterizer pypdfium 配合 --output-type pdf 不走 Ghostscript，闭源商业服务按这个组合部署，以所用版本的文档为准。
- 预处理：--clean 去噪（需要装 unpaper）、--deskew 纠偏、--rotate-pages 自动转正；300dpi 灰度图识别效果最好，超大图用 --max-ocr-image-mpixels 限制送去识别的像素，显示的图片不受影响。
- 性能：一页 A4 300dpi 的中文单核要几秒，--jobs 按 CPU 核数并行；上百页的扫描件放进后台任务，前端显示进度。
- 体积：--optimize 1 只做无损优化，2、3 允许有损压缩（装了 pngquant、jbig2enc 效果更好）；归档件用 1，外发件用 2，更多做法看「压缩」。
- 结果检查：随机抽页用 pdftotext 看识别结果，统计每页字符数，明显偏少的页标出来人工复核；识别结果不能代替原件，归档时原扫描件一起保留。

## 提示词

写一个脚本把 {输入}（如一批合同扫描件 PDF）处理成可搜索的双层 PDF，并导出每份的全文文本。
1. 工具用 OCRmyPDF + Tesseract，语言 chi_sim+eng；已有文字层的页跳过（--mode skip，旧版本用 --skip-text），开 --deskew、--rotate-pages。
2. 闭源商业部署时用 --rasterizer pypdfium 和 --output-type pdf，不依赖 Ghostscript；脚本开始时检查 tesseract 的 chi_sim 语言包，缺了就退出并提示安装方法。
3. 并行：--jobs 取 CPU 核数，大图用 --max-ocr-image-mpixels 限制内存；单份超时 {超时秒数} 秒。
4. 边界情况：加密文件跳过并记录；损坏文件先用 qpdf 重写一次再试；手机拍照的超大彩色图先缩到约 300dpi；单页识别出的字符少于 {最少字符数} 个的标记“需人工复核”。
5. 输出：原文件不动，结果放到 {输出目录}，文件名加 -ocr 后缀；全文文本按页分隔并带页码。
6. 结束时输出汇总：文件数、页数、跳过的页、复核清单、总耗时。
最后说明脚本用法和需要的系统依赖（附 Dockerfile 片段），并抽一份结果用 pdftotext 展示前 200 字。
