---
zh: 把感觉词翻成设计规格
en: Translate vibe words
aka: 感觉词翻译
order: 20
---

## 是什么

把“高级”“科技感”“可爱”这类形容词翻成可执行的配色、字号、圆角和动效规格。

## 适合

想要某种“感觉”，但说不出具体要改哪里的时候。

## 要点

- 把想要的感觉填进 {感觉词}，可以填两三个。
- 让 AI 先给规格表，挑定一套再改页面。
- 写清“不要什么”比“要什么”更管用。
- 有参考产品时，只说学它哪一点（密度、留白、配色比例）。

## 提示词

我希望{页面}看起来“{感觉词，如 高级 / 科技感 / 可爱}”。请先把这个感觉翻译成具体规格，再按规格修改，不要只加装饰。

对照参考：
- 高级、大气：一个明确的视觉重心；留白充足（区块间距 ≥ 48px）；只用一个强调色，面积约 10%；圆角和间距全站统一；用真实内容。不是加渐变、玻璃和发光。
- 简洁、干净：元素砍掉一半；去掉装饰图标和多余边框；中性色接近纯灰；每屏只留一个主按钮。
- 科技感：深色或大面积留白；1px 细线框、0–6px 小圆角；数字用等宽字体；动效短而线性。不用蓝紫渐变和荧光发光。
- 年轻、可爱：高饱和的品牌色块；12–20px 大圆角；按钮和图标有轻微弹性；正文字号和对比度不降低。
- 专业、稳重：控件高 32px 的规范密度；组件和字段命名一致；配色克制；加载、空、错误状态齐全。
- 好用、顺手：主任务步骤更少；常用操作放在手边；键盘可用；失败可恢复、不丢输入。

请输出：
1. 规格表：背景 / 表面 / 文字 / 强调色的色值和用途，字号阶梯，圆角，间距，阴影，动效时长。
2. 明确不做的 3 件事。
3. 按规格修改后的页面。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{padding:6px 8px}
.say{margin:0;padding:6px 8px;border-radius:8px 8px 8px 2px;background:#eef0f3;font-size:11px;line-height:16px}
.say b{font-weight:600}
.q{margin:6px 0 0;color:#5b616e;font-size:10px;line-height:14px}
/* 左：AI 听到“高级、科技感”后随手堆上去的装饰 */
.bad{margin-top:6px;padding:5px 8px;border-radius:12px;background:linear-gradient(135deg,#6a5cff,#b14bff);box-shadow:0 0 8px rgba(120,80,255,.6);color:#fff;font-size:10px;line-height:14px}
.bad b{display:block;font-size:12px}
/* 右：翻成可执行的规格 */
.sw{display:flex;gap:4px;margin:0 0 5px}
.sw i{flex:1;height:12px;border-radius:3px;border:1px solid #e3e6eb}
.r{display:grid;grid-template-columns:auto minmax(0,1fr);gap:0 6px;margin:0;font-size:10px;line-height:14px}
.r dt{color:#5b616e}
.r dd{margin:0}
.no{margin-top:4px;padding-top:4px;border-top:1px solid #e3e6eb;color:#b42318;font-size:10px;line-height:14px}
</style>

<div class="fx">
  <section class="fx-p"><h4>只说感觉</h4><div class="fx-b"><div class="fx-z c"><p class="say">数据看板要<b>高级</b>一点、有<b>科技感</b>。</p><div class="bad">今日营收<b>¥1,280,400</b></div><p class="q">AI 只好堆装饰：渐变、发光、大圆角。</p></div></div></section>
  <section class="fx-p ok"><h4>翻成规格</h4><div class="fx-b"><div class="fx-z c"><div class="sw"><i style="background:#0f1419"></i><i style="background:#1a2029"></i><i style="background:#e6e9ef"></i><i style="background:#2f6bff"></i></div><dl class="r"><dt>强调色</dt><dd>#2F6BFF 占 10%</dd><dt>字号</dt><dd>12/14/20/32</dd><dt>圆角</dt><dd>4px，1px 细线框</dd><dt>区块距</dt><dd>48px</dd><dt>动效</dt><dd>150ms 线性</dd></dl><div class="no">不做：渐变、发光、玻璃</div></div></div></section>
</div>
