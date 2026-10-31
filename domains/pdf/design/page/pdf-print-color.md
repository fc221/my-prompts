---
zh: 打印颜色与出血
en: Print color and bleed
aka: CMYK 出血 裁切线 PDF/X 四色黑 打印背景色 印刷
order: 40
---

## 是什么

交印刷厂的 PDF 要用 CMYK 颜色，并在成品尺寸外每边多留 3mm 出血，裁切后边缘不露白；只在屏幕看或办公室打印的 PDF 用 sRGB 就行。

## 适合

宣传册、证书、门票要交印刷厂；底色或图片铺满到纸边；打出来背景色全没了。

## 不适合

日常办公打印的单据和报告用 sRGB、不加出血；图片本身的清晰度看「图片与分辨率」。

## 注意

浏览器路线只能输出 RGB，也没有出血和裁切线：Chromium 不认 @page 的 bleed、marks，CSS 颜色也到不了 CMYK。要么换支持的引擎，要么出 RGB 文件后再转 CMYK，或者按印厂要求交 RGB 由他们转，事先问清楚。

## 要点

- 先分用途：屏幕和普通打印用 sRGB；交印刷厂用 CMYK，按印厂要求出 PDF/X-1a 或 PDF/X-4，ICC 用印厂指定的（国内胶印常见 Japan Color 2001 Coated 或 FOGRA39）。
- 出血每边 3mm：文档尺寸等于成品加 6mm，A4 成品对应 216×303mm；铺满的底色和图片画到出血线，文字、二维码、印章离裁切线至少 3–5mm（安全区）。
- 出血支持：WeasyPrint、Prince、Paged.js 认 @page 的 bleed: 3mm 和 marks: crop cross；Chromium 和 Typst 只能把页面尺寸直接设成含出血的尺寸，裁切线由印厂拼版时加。
- CMYK 颜色：Prince 和 WeasyPrint 支持 device-cmyk()，WeasyPrint 用 @color-profile 指定 ICC；Typst 有 cmyk() 颜色；Chromium 生成后用 Ghostscript 设 ColorConversionStrategy=CMYK 转换，转完核对品牌色数值。
- 品牌色同时给 sRGB 和 CMYK 两组值，以设计稿为准，不让工具自动换算；正文黑字用单色黑 K100，大面积黑底用四色黑（如 C60 M40 Y40 K100），总墨量不超过 300%。
- 细线不细于 0.25pt，反白小字不小于 8pt 并加粗，灰色字不浅于 K60。
- 屏幕版背景色打不出来：Puppeteer / Playwright 开 printBackground: true，CSS 加 print-color-adjust: exact（老版本 Chromium 用 -webkit- 前缀）。

## 提示词

把{项目}里的{印刷品}改成能直接交印刷厂的 PDF，按项目现有的生成方式实现：
1. 成品尺寸 {成品尺寸，如 A4 210×297mm}，每边出血 3mm，文档尺寸为成品加 6mm；底色和满版图片画到出血线，文字、印章、二维码离裁切线至少 5mm。
2. 工具支持 bleed、marks 和 device-cmyk（WeasyPrint、Prince）就直接用并加裁切线；Chromium 路线把页面尺寸设成含出血的尺寸，生成 RGB 后用 Ghostscript 按 {ICC 配置} 转成 CMYK，输出 {PDF/X-1a / PDF/X-4}。
3. 品牌色用设计给的 CMYK 值 {品牌色 CMYK}；正文黑字用 K100 单色黑，大面积黑底用四色黑，总墨量不超过 300%；细线不细于 0.25pt。
4. 另外保留一份 sRGB 屏幕版，不带出血，背景色正常打印。
最后说明两份文件的尺寸和颜色空间是怎么核实的，以及改了哪些文件。
