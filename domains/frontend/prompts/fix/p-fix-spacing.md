---
zh: 整理页面间距
en: Messy spacing
aka: 间距乱 看着挤
tab: 间距
order: 90
---

## 是什么

症状：元素挤在一起，间距忽大忽小，分不清哪些是一组。

## 要点

- 直接发；页面密度不同只改基准数值。
- 不许 AI 靠缩小字号解决“挤”。
- 改完在 1440 和 390 宽各截一张图对比。

## 提示词

页面间距乱、看着挤。请统一间距体系，不要靠缩小字号解决：
1. 基准 4px，只用 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64，删掉 10、14、18、22 这类尺度外的值。
2. 按关系定档，同一种关系全页同一个值：图标与文字 6–8px；标签到输入框 8px；同组元素之间 12–16px；表单项之间 24px；区块之间 32–48px。组内间距明显小于组间间距，一眼看得出分组。
3. 标题离下方内容近、离上方内容远（如上 32px、下 12px）。
4. 卡片内边距统一 20–24px，卡片之间 16–24px；不要卡片套卡片。
5. 组件本身不带外边距，由父容器的 gap 控制间距。
6. 内容太多时先删减或收进下一层（详情、展开、更多），而不是压缩间距。
7. 同一行的控件等高、垂直居中。
改完列出调整了哪些间距。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{padding:8px}
.h{font-size:12px;line-height:16px;font-weight:600}
.l{color:#5b616e;font-size:10px;line-height:14px}
.i{height:20px;border:1px solid #c9ced6;border-radius:4px}
.b{display:inline-block;padding:2px 10px;border-radius:4px;background:#3b5bdb;color:#fff;font-size:10px;line-height:14px}
/* 改前：同一种关系用了不同的距离，看不出谁和谁一组 */
.bad .h{margin-bottom:3px}
.bad .l{margin-top:7px}
.bad .i{margin-top:5px}
.bad .i+.l{margin-top:3px}
.bad .b{margin-top:5px}
/* 改后：同组 4、组间 12，标题离内容近 */
.good .h{margin-bottom:8px}
.good .l{margin-bottom:4px}
.good .i{margin-bottom:12px}
</style>

<div class="fx">
  <section class="fx-p"><h4>改前</h4><div class="fx-b"><div class="fx-z c bad"><div class="h">收货信息</div><div class="l">收货人</div><div class="i"></div><div class="l">手机号</div><div class="i"></div><div class="b">保存</div></div></div></section>
  <section class="fx-p ok"><h4>改后</h4><div class="fx-b"><div class="fx-z c good"><div class="h">收货信息</div><div class="l">收货人</div><div class="i"></div><div class="l">手机号</div><div class="i"></div><div class="b">保存</div></div></div></section>
</div>
