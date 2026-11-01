---
zh: 提升页面层次感
en: Too plain
aka: 页面太素
tab: 层次
order: 60
---

## 是什么

症状：看着像线框稿或半成品，没有层次、没有重点，所有元素一样重。

## 要点

- 用在结构已经对、只是“没做完”的页面。
- 让 AI 先列改动点再改，防止它只加渐变和阴影。
- 补上品牌色效果更稳。

## 提示词

这个页面看起来太素、像半成品。请按下面的方法加层次，不要靠渐变、发光和大阴影：
1. 建立三层表面：页面底色（如 #f5f6f8）、白色卡片、带阴影的浮层；卡片用 1px 浅边框或背景差区分，不用大阴影。
2. 拉开字号对比：页面标题 24–28px/600，区块标题 16px/600，正文 14px，辅助信息 12px 次要色；关键数字 24–32px。
3. 给强调色 {品牌色} 找到位置：主按钮、当前导航、链接、关键数字，面积约 10%。
4. 补齐细节：图标统一线宽和尺寸，按钮有悬停和按下态，表格有表头样式，状态用小色点加文字，空值写“—”。
5. 用真实可信的内容替换“标题 1、测试数据”。
6. 确定一个视觉重心，让最重要的模块面积最大。
动手前先列出要改的 5–8 处。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{padding:6px;font-size:10px;line-height:14px}
.t{font-size:11px;line-height:16px}
.kc{margin-top:6px;padding:6px 8px}
.kl{font-size:10px;line-height:12px}
.kn{font-size:11px;line-height:16px}
.tw{margin-top:6px}
.tb{width:100%;border-collapse:collapse;font-size:10px;line-height:14px}
.tb th,.tb td{padding:1px 4px;text-align:left;font-weight:400}
.tb th:nth-child(2),.tb td:nth-child(2){text-align:right;font-variant-numeric:tabular-nums}
.bs{display:flex;gap:6px;margin-top:6px}
.b{padding:0 8px;border-radius:4px;font-size:10px;line-height:18px}
.dot{display:inline-block;width:6px;height:6px;margin-right:4px;border-radius:50%;background:#1f9d61}
/* 改前：像线框稿，没有表面层次，所有字一样大一样重，两个按钮一个样，状态没标记，空值空着 */
.bad{color:#444}
.bad .kc,.bad .b{border:1px solid #b6bcc6}
.bad .tb th,.bad .tb td{border:1px solid #b6bcc6}
.bad .dot,.bad .em{display:none}
/* 改后：页面底、白卡片、浮层三层表面，字号拉开，强调色只给主按钮，表头有样式，状态小色点，空值写 — */
.good{background:#f5f6f8}
.good .t{font-size:13px;line-height:18px;font-weight:600}
.good .kc{padding:5px 8px;border:1px solid #e3e6eb;border-radius:6px;background:#fff}
.good .kl{color:#5b616e}
.good .kn{font-size:16px;line-height:20px;font-weight:600;font-variant-numeric:tabular-nums}
.good .tw{overflow:hidden;border:1px solid #e3e6eb;border-radius:6px;background:#fff}
.good .tb th{background:#f8f9fb;color:#5b616e;font-size:9px;line-height:13px}
.good .tb td{border-top:1px solid #eef0f3}
.good .em{color:#8a909c}
.good .pr{background:#3b5bdb;color:#fff;box-shadow:0 1px 2px rgba(31,35,41,.16)}
.good .b:not(.pr){border:1px solid #c9ced6;background:#fff}
</style>

<div class="fx">
  <section class="fx-p"><h4>改前</h4><div class="fx-b"><div class="fx-z c bad"><div class="t">今日营业</div><div class="kc"><div class="kl">营收</div><div class="kn">¥12,480</div></div><div class="tw"><table class="tb"><tr><th>门店</th><th>营收</th><th>状态</th></tr><tr><td>西湖店</td><td>8,120</td><td><i class="dot"></i>正常</td></tr><tr><td>滨江店</td><td>4,360</td><td><span class="em">—</span></td></tr></table></div><div class="bs"><span class="b pr">新建订单</span><span class="b">导出</span></div></div></div></section>
  <section class="fx-p ok"><h4>改后</h4><div class="fx-b"><div class="fx-z c good"><div class="t">今日营业</div><div class="kc"><div class="kl">营收</div><div class="kn">¥12,480</div></div><div class="tw"><table class="tb"><tr><th>门店</th><th>营收</th><th>状态</th></tr><tr><td>西湖店</td><td>8,120</td><td><i class="dot"></i>正常</td></tr><tr><td>滨江店</td><td>4,360</td><td><span class="em">—</span></td></tr></table></div><div class="bs"><span class="b pr">新建订单</span><span class="b">导出</span></div></div></div></section>
</div>
