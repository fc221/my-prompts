---
zh: 修正控件对齐
en: Misaligned controls
aka: 按钮没对齐
tab: 对齐
order: 91
of: p-fix-spacing
---

## 是什么

症状：同一行的按钮和输入框高低不齐，下拉箭头贴边，按钮飘在标签和输入框之间。

## 要点

- 截图圈出没对齐的地方一起发，效果更好。
- 适用于筛选区、表单行、工具栏、弹窗底部。
- 位置说不清就留空，让 AI 自己找。

## 提示词

按钮和控件没对齐，请逐条修正：
1. 同一行的按钮、输入框、下拉框等高（统一 32px，手机 40px），文字垂直居中，不靠 padding-top 硬调。
2. 行内有带标签的控件时，没有标签的按钮按控件对齐：容器用 align-items: end，或把标签移到控件左侧做成一行；按钮不能飘在标签和控件之间。
3. 下拉框用 appearance: none 加自绘 16px 箭头，箭头离右边框 12px，右内边距 32px；全产品用同一种箭头。
4. 图标和相邻文字中线对齐，间距 6–8px。
5. 弹窗底部按钮右对齐、主按钮在最右，间距 8px；页面表单的按钮与字段左边缘对齐。
6. 吸底栏里的按钮与内容列对齐，不跑到视口两端。
7. 相邻同类控件宽度一致，换行后左边缘对齐。
需要修的位置：{位置描述，可留空}。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{padding:12px 6px;display:flex;flex-direction:column;gap:16px}
.r{display:flex;gap:3px}
.f{flex:1;min-width:0;display:flex;flex-direction:column;gap:3px}
.l{color:#5b616e;font-size:9px;line-height:12px}
.s{position:relative;height:20px;padding:0 14px 0 4px;border:1px solid #c9ced6;border-radius:4px;font-size:9px;line-height:18px;white-space:nowrap}
.s::after{content:"";position:absolute;top:6px;width:4px;height:4px;border:solid #5b616e;border-width:0 1.5px 1.5px 0;transform:rotate(45deg)}
.b,.g{height:20px;padding:0 6px;border-radius:4px;font-size:9px;line-height:20px;white-space:nowrap}
.b{background:#3b5bdb;color:#fff}
.g{border:1px solid #c9ced6;line-height:18px}
.ft{display:flex;padding-top:8px;border-top:1px solid #e3e6eb}
.tl{display:flex;gap:12px;color:#3a3f48;font-size:9px;line-height:12px}
.tl span{display:inline-flex;gap:5px}
.tl i{display:block;flex:none;width:8px;height:8px;border:1.5px solid currentColor;border-radius:2px}
/* 改前：控件高矮不一，按钮飘在标签和控件之间，下拉箭头贴边，底部按钮没靠右 */
.bad .r{align-items:center}
.bad .s::after{right:1px}
.bad .f+.f .s{height:24px;line-height:22px}
.bad .f+.f .s::after{top:8px}
.bad .b{height:26px;line-height:26px}
.bad .ft{gap:12px}
.bad .ft .g{height:16px;line-height:14px}
.bad .tl span{align-items:flex-start;gap:2px}
.bad .tl span+span{align-items:flex-end;gap:8px}
/* 改后：同一行等高、底边对齐，箭头离边 6px，底部按钮右对齐、主按钮在最右 */
.good .r{align-items:flex-end}
.good .s::after{right:6px}
.good .ft{justify-content:flex-end;gap:6px}
.good .tl span{align-items:center}
</style>

<div class="fx">
  <section class="fx-p"><h4>改前</h4><div class="fx-b"><div class="fx-z c bad"><div class="r"><div class="f"><div class="l">门店</div><div class="s">全部</div></div><div class="f"><div class="l">状态</div><div class="s">全部</div></div><div class="b">查询</div></div><div class="tl"><span><i></i>导出</span><span><i></i>打印</span></div><div class="ft"><div class="g">取消</div><div class="b">保存</div></div></div></div></section>
  <section class="fx-p ok"><h4>改后</h4><div class="fx-b"><div class="fx-z c good"><div class="r"><div class="f"><div class="l">门店</div><div class="s">全部</div></div><div class="f"><div class="l">状态</div><div class="s">全部</div></div><div class="b">查询</div></div><div class="tl"><span><i></i>导出</span><span><i></i>打印</span></div><div class="ft"><div class="g">取消</div><div class="b">保存</div></div></div></div></section>
</div>
