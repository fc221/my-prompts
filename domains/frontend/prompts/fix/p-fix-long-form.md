---
zh: 优化长表单
en: Form too long
aka: 表单太长
order: 160
---

## 是什么

症状：字段一屏接一屏平铺下去，不知道哪些必填、填到哪了、还剩多少。

## 要点

- 把字段清单贴进 {字段列表}，AI 会先给减法方案。
- 删不删字段由你拍板，AI 只给建议。
- 减到 7 个以内时，反而要去掉分组和卡片。

## 提示词

这个表单太长，让人头大。请按顺序处理：
第一步：做减法，先列方案再动手。
- 删：不影响本次任务的字段；能从账号、上下文推出来的不再问。
- 延后：创建后才用得到的字段放到详情页补充，并提示“稍后可在设置中补充”。
- 默认：有安全常用值的预填。
- 合并：起止日期 → 日期范围，省市区 → 级联，金额 + 币种 → 一个控件。
- 收起：低频、可选、危险的放进“高级设置”。
第二步：按剩下的字段数排版。≤ 7 个：单列、不分组、不加卡片；8–15 个：单列加组标题；16–30 个：卡片分组 + 吸底操作栏 + 锚点目录；30 个以上：分步填写或“先创建、再补充”。
第三步：细节。标签在上方常驻；必填和可选只标少数的一方；格式和单位写在字段下方；输入框宽度按内容；失焦校验，提交时聚焦第一个错误；提交失败不丢输入；有未保存内容时离开要提示。
当前字段：{字段列表}

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{position:relative;display:flex;flex-direction:column;gap:3px;padding:8px 6px;font-size:8px;line-height:11px}
.f{display:flex;align-items:center;gap:4px}
.f label{flex:none;width:34px;color:#5b616e;white-space:nowrap}
.i{position:relative;flex:1;min-width:0;height:12px;padding:0 3px;border:1px solid #c9ced6;border-radius:3px;color:#3a3f48;font-size:7px;line-height:10px;white-space:nowrap}
/* 改前：字段一屏接一屏平铺（滚动条还在顶部），省市区拆成三项，看不出哪些必填、还剩多少 */
.bad{padding-right:12px;overflow:hidden}
.bad::after{content:"";position:absolute;left:0;right:0;bottom:0;height:30px;background:linear-gradient(transparent,#fff)}
.bad .sc{position:absolute;top:6px;right:3px;bottom:6px;width:3px;border-radius:2px;background:#eef0f3}
.bad .sc::after{content:"";position:absolute;left:0;top:0;width:100%;height:26%;border-radius:2px;background:#8a909c}
/* 改后：删掉能推出来的、合并省市区、低频项收进高级设置，只标必填，格式写在字段下方，保存吸底 */
.good .rq label::after{content:"*";margin-left:1px;color:#e03131}
.good .hp{margin:-1px 0 0 38px;color:#8a909c;font-size:7px;line-height:9px}
.good .i::after{content:"";position:absolute;right:4px;top:3px;width:3px;height:3px;border:solid #5b616e;border-width:0 1px 1px 0;transform:rotate(45deg)}
.good .i.p::after{content:none}
.good .adv{display:flex;justify-content:space-between;margin-top:2px;padding:3px 0;border-top:1px solid #eef0f3;color:#3b5bdb}
.good .ft{display:flex;justify-content:flex-end;margin-top:auto;padding-top:5px;border-top:1px solid #e3e6eb}
.good .btn{height:16px;padding:0 10px;border-radius:3px;background:#3b5bdb;color:#fff;line-height:16px}
</style>

<div class="fx">
  <section class="fx-p"><h4>改前</h4><div class="fx-b"><div class="fx-z c bad"><div class="f"><label>会员姓名</label><div class="i"></div></div><div class="f"><label>手机号</label><div class="i"></div></div><div class="f"><label>性别</label><div class="i"></div></div><div class="f"><label>出生日期</label><div class="i"></div></div><div class="f"><label>省份</label><div class="i"></div></div><div class="f"><label>城市</label><div class="i"></div></div><div class="f"><label>区县</label><div class="i"></div></div><div class="f"><label>详细地址</label><div class="i"></div></div><div class="f"><label>推荐人</label><div class="i"></div></div><div class="sc"></div></div></div></section>
  <section class="fx-p ok"><h4>改后</h4><div class="fx-b"><div class="fx-z c good"><div class="f rq"><label>会员姓名</label><div class="i p"></div></div><div class="f rq"><label>手机号</label><div class="i p"></div></div><div class="hp">11 位数字，用于登录</div><div class="f"><label>出生日期</label><div class="i">年 / 月 / 日</div></div><div class="f"><label>省市区</label><div class="i">北京 / 朝阳区</div></div><div class="f"><label>详细地址</label><div class="i p"></div></div><div class="adv"><span>高级设置（性别、推荐人）</span><span>›</span></div><div class="ft"><span class="btn">保存</span></div></div></div></section>
</div>
