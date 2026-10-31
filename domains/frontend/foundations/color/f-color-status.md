---
zh: 状态色与分类色
en: Status & categorical colors
order: 30
---

## 是什么

成功、警告、危险、信息各有文字、浅底、实心三种用法，图表分类色另成一组。

## 适合

徽标、提示条、表单校验、涨跌数值、图表系列。

## 不适合

不要用状态色做装饰或当品牌色；分类图表不要用红绿区分类别，免得被读成好坏。

## 要点

- 状态文字（徽标字、校验信息、涨跌数值）用不带后缀的 success / warning / danger / info，对所在底色 ≥ 4.5:1
- 浅色徽标 = -soft 底 + 同色文字（可加 1px -border）；强调场景用 -solid 底 + text-on-*
- -solid 只当实心底色，不放在 -soft 底上当文字用
- 危险色只用于错误信息和危险确认按钮，列表里的“删除”入口先用中性文字
- 状态不能只靠颜色：同时给图标或文字（“已完成”“失败”）
- 分类色 6–8 个，按固定顺序分配，同一对象在不同图表里保持同色
- 状态多的界面（订单、工单、审批）避免绿、红、橙系品牌色，免得和状态混淆

## 提示词

为{项目}定义状态色与分类色：success / warning / danger / info 各给文字色（对所在底色 ≥ 4.5:1）、-soft 浅底、-border 描边、-solid 实心底和 text-on-* 文字；徽标用浅底 + 同色字，强调时用实心；危险色只用于错误和危险确认；状态同时配图标或文字，不只靠颜色；图表分类色 6 个，按固定顺序分配，避开红绿语义；暗色下另取一套并重新核对对比度。

## 示例

<style>
.s{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:12px 16px;background:#fff;color:#1f2329;font:12px/1.4 system-ui,"PingFang SC",sans-serif}
.row{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.b{display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 8px;border-radius:999px;font-weight:600}
.b::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor}
.ok{color:#0f7352;background:#ecf7f2;box-shadow:inset 0 0 0 1px #b8dfcc}
.wn{color:#b54708;background:#fef4ec;box-shadow:inset 0 0 0 1px #f6d2b4}
.dg{color:#b42318;background:#fef1f0;box-shadow:inset 0 0 0 1px #f7c6c1}
.in{color:#3b5bdb;background:#f0f3fe;box-shadow:inset 0 0 0 1px #c7d2f7}
.x{color:#fff;box-shadow:none}
.x::before{background:#fff}
.ok.x{background:#12805c}
.wn.x{background:#b54708}
.dg.x{background:#d92d20}
.in.x{background:#3b5bdb}
.ch{display:flex;align-items:flex-end;gap:8px;height:56px;padding-bottom:2px;border-bottom:1px solid #e3e6eb}
.ch i{width:20px;height:var(--h);border-radius:4px 4px 0 0;background:var(--c)}
small{color:#5b616e;font-size:12px}
</style>

<div class="s"><div class="row"><span class="b ok">已完成</span><span class="b wn">待审核</span><span class="b dg">已驳回</span><span class="b in">处理中</span></div><div class="row"><span class="b ok x">成功</span><span class="b wn x">警告</span><span class="b dg x">危险</span><span class="b in x">信息</span></div><div class="ch"><i style="--h:62%;--c:#3b5bdb"></i><i style="--h:88%;--c:#0f9d8a"></i><i style="--h:45%;--c:#f08c00"></i><i style="--h:70%;--c:#8e5bd8"></i><i style="--h:35%;--c:#e0457b"></i><i style="--h:56%;--c:#7a8b99"></i></div><small>分类色 cat-1 至 cat-6：按固定顺序分配</small></div>
