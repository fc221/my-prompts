---
zh: 行高与行长
en: Line height & measure
order: 20
---

## 是什么

正文行高 1.5–1.75，一行约 35–45 个汉字；太挤、太长都容易读串行。

## 适合

文章、说明文档、表单帮助文字、官网正文。

## 不适合

不要让正文一行铺满宽屏；按钮、表格等单行界面文字不必套用阅读正文的行高。

## 要点

- 界面正文 14px / 行高 22px；阅读型正文 16px / 行高 1.6–1.75（26–28px）；官网正文 16–18px / 行高约 1.7
- 行长 35–45 个汉字（或 60–80 个英文字符），正文容器用 max-width: 40em 左右限制
- 大标题行高收紧到 1.1–1.25，多行标题才不会散
- 段落之间用 0.75–1em 间距，不用空行撑开
- 中英数混排分别实测行长；长英文单词和链接允许断行（overflow-wrap: anywhere）
- 正文加 text-wrap: pretty 减少末行孤字，标题用 balance

## 提示词

调整{页面}的正文排版：正文 {正文字号}、行高 1.7，段落间距 1em；正文容器 max-width 40em（约 35–45 个汉字），宽屏时对齐到内容列，不铺满；标题行高 1.2 并用 text-wrap: balance，正文用 pretty 避免末行只剩一两个字；长英文和链接允许断行；手机左右留 16px、正文不小于 15px；文字放大到 200% 时不裁切、不出现横向滚动。

## 示例

<style>
.s{height:100%;display:grid;grid-template-columns:repeat(2,minmax(0,17em));justify-content:center;align-content:center;align-items:start;gap:24px;padding:16px 20px;background:#fff;color:#1f2329;font:13px system-ui,"PingFang SC",sans-serif}
.c{display:grid;gap:8px}
h4{margin:0;font-size:12px;font-weight:600}
.x{color:#d92d20}
.o{color:#12805c}
p{margin:0}
.a{line-height:1.3;letter-spacing:-.02em}
.b{line-height:1.75}
@container (max-width:300px){.s{gap:16px;padding:12px;font-size:12px}
}
</style>

<div class="s"><div class="c"><h4 class="x">✗ 行高 1.3，读串行</h4><p class="a">正文的行高决定阅读的呼吸感。行距太紧，视线换行时容易跳错行；行距合适，段落看起来松而不散，读起来也更轻松。</p></div><div class="c"><h4 class="o">✓ 行高 1.75，松而不散</h4><p class="b">正文的行高决定阅读的呼吸感。行距太紧，视线换行时容易跳错行；行距合适，段落看起来松而不散，读起来也更轻松。</p></div></div>
