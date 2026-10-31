---
zh: 常用开源字体
en: Open-source typefaces
order: 65
---

## 是什么

AI 和模板默认的那几款字体人人都在用，页面一眼就眼熟。按用途备一份开源字体清单（都是 SIL OFL，可商用、可嵌入网页），每个用途给首选和替补，标题和正文各取一款搭配。示例按用途切换，并标出哪些字体本机没装、正在用后备字体显示。

## 适合

新项目定字体；给 AI 写提示词时直接点名字体；页面看着像模板，想先从标题字体换起。

## 不适合

判断一款字体属于哪类、什么气质看「按气质挑字体」；层级看「字号阶梯」「字重与层级」；中英文之间的空格和断行看「中英混排」。

## 注意

中文字体一套就有几 MB，网页上要按页面用到的字做子集，或者用 unicode-range 分包加载。后台和工具类产品，中文正文直接用系统的苹方、微软雅黑就够了，只给标题换字体。

## 要点

- 工具界面：IBM Plex Sans 配 IBM Plex Mono，替补 Geist 配 Geist Mono。中性，小字号清楚，同一家族自带等宽，数字和代码不用另找。
- 产品官网：标题 Bricolage Grotesque 或 Space Grotesk，正文 DM Sans 或 Public Sans。记忆点放在标题上，正文退后。
- 长文阅读：Literata 或 Source Serif 4，标题和正文都用它，靠字重拉开层级。这两款是为屏幕长读设计的衬线，小字也结实。
- 品牌和杂志感：标题 Instrument Serif 或 Fraunces，正文 Instrument Sans。高对比衬线只用在 32px 以上；Instrument Serif 只有常规体，靠字号撑场面。
- 亲和、面向大众：标题 Nunito，正文 Nunito Sans。圆头笔画显得友好，和同家族的正文配起来最省事。
- 中文：正文用思源黑体（Noto Sans SC）；内容类产品的正文可以换思源宋体（Noto Serif SC），想要手写和阅读感用霞鹜文楷；中文大标题可以用得意黑（Smiley Sans）。
- 一个页面最多两种字体家族，等宽另算。只选 2–3 个用得到的字重，自托管 woff2。
- 字体栈的写法：开源字体 → 度量接近的系统字体 → 中文系统字体 → 通用族。后备字体用 size-adjust 对齐度量，font-display: swap，这样加载前后版面不跳。

## 提示词

为{产品}定字体。用途是{工具界面 / 产品官网 / 长文内容 / 品牌杂志 / 亲和的大众产品}，界面语言是{中文 / 中英混排}。
1. 按用途从这份开源字体里挑（先用首选，不合适再换替补），标题、正文各一款，需要等宽时另加一款，并说明理由：
   - 工具界面：IBM Plex Sans + IBM Plex Mono（替补 Geist + Geist Mono）
   - 产品官网：标题 Bricolage Grotesque / Space Grotesk，正文 DM Sans / Public Sans
   - 长文：Literata / Source Serif 4
   - 品牌杂志：标题 Instrument Serif / Fraunces（只用 32px 以上），正文 Instrument Sans
   - 亲和：标题 Nunito，正文 Nunito Sans
   - 中文：正文思源黑体，内容类可换思源宋体或霞鹜文楷，大标题可用得意黑
2. 每款写完整字体栈：开源字体 → 度量接近的系统字体 → 苹方 / 微软雅黑或宋体 → 通用族。
3. 加载：自托管 woff2，只取用到的 2–3 个字重，font-display: swap，后备字体用 size-adjust 对齐度量；中文字体按页面用字做子集，后台类产品的中文正文直接用系统字体。
4. 用同一个标题加两段正文，在 1440 和 390 宽下和原来的字体截图对比，说明观感变在哪里。
全站最多两种字体家族（等宽另算），层级靠字号和字重拉开；只用 SIL OFL 或同等可商用、可嵌入网页许可的字体。
