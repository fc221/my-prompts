---
zh: 字重与层级
en: Weight & hierarchy
order: 30
---

## 是什么

只用 400 / 500 / 600 三种字重，配合字号和颜色拉开主次。

## 适合

卡片、列表、表单、详情页的信息分层。

## 不适合

不要所有文字一样粗一样大；不要用极细字重，也不要只靠 500 表达强调。

## 要点

- 正文 400，轻强调 500，标题和统计数值 600；官网大标题可用 700，不用 100–300 的极细字重
- 部分系统的中文字体只有常规和粗体两档，500 会显示成常规：必须看得出的强调（表头、当前项、按钮）用 600
- 层级靠三件事叠加：字号差一档以上、字重 400 → 600、颜色主要 → 次要，至少两项同时变化
- 一个区块只有一个最重的元素，标题和数值不同时用最大最粗
- 中文不用斜体；强调用字重或颜色，不用下划线（下划线留给链接）
- 深色底上同字重显得更粗，暗色主题的大段正文不用 600 以上

## 提示词

整理{页面}的文字层级：只用 400（正文）、500（轻强调）、600（标题、数值、表头、当前项）三种字重；每个区块只有一个最重的元素；层级靠字号差一档以上、字重、主次文字色至少两项同时变化；次要信息用 12–14px 的 text-secondary；中文不用斜体，强调不用下划线；在只有两档字重的系统上检查 500 是否还能分辨；暗色下大段正文不超过 500。

## 示例

<style>
.s{height:100%;display:flex;align-items:center;justify-content:center;gap:16px;padding:16px;background:#f5f6f8;color:#1f2329;font:14px/20px system-ui,"PingFang SC",sans-serif}
.k{flex:1;max-width:200px;display:grid;gap:4px;padding:12px 16px;border-radius:12px;background:#fff;border:1px solid #e3e6eb}
em{font-style:normal;font-size:12px;font-weight:600}
.x em{color:#d92d20}
.o em{color:#12805c}
p{margin:0}
.x p{font-weight:500}
.t{font-size:13px;color:#5b616e}
.v{font-size:26px;line-height:32px;font-weight:600;font-variant-numeric:tabular-nums}
.u{font-size:13px;color:#5b616e}
.u b{color:#12805c;font-weight:600}
.m{font-size:12px;color:#5b616e}
</style>

<div class="s"><div class="k x"><em>✗ 一样大一样粗</em><p>本月营收</p><p>¥128,400</p><p>较上月 +12.4%</p><p>统计到 10-25 18:00</p></div><div class="k o"><em>✓ 主次分明</em><p class="t">本月营收</p><p class="v">¥128,400</p><p class="u">较上月 <b>+12.4%</b></p><p class="m">统计到 10-25 18:00</p></div></div>
