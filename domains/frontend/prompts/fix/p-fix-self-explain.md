---
zh: 删减界面说明文字
en: Over-explained UI
aka: 界面在自我解释
tab: 说明文字
order: 33
of: p-fix-ai-feel
---

## 是什么

症状：每个标题下挂一行小字，字段旁有提示，卡片里写着“这里显示……”，界面读起来像说明书。AI 生成的页面尤其常见。

## 要点

- 先列清单再删，比笼统地让 AI“精简文案”可控。
- 留下的只有两类：格式要求（如“支持 PDF，最大 20MB”）和无法撤销的后果（如“删除后无法恢复”）。
- 删完看分组和层级能否说明含义；说明不了就调结构，而不是把字加回来。
- 页面同时“像模板”时和「去掉页面模板感」一起用。

## 提示词

界面上的解释性文字太多，读起来像说明书。请：
1. 列出页面上所有说明文字：标题下的副标题、字段旁的提示、卡片里的描述、空白处的引导语，每条标出位置。
2. 逐条判断：删掉后用户会不会填错、点错或看不懂结果；不会就删。
3. 必须保留的只有格式要求和无法撤销的后果，各压到一句，放在出错之前看得到的位置。
4. 删掉之后靠结构表达含义：相关内容放进同一组，标题直接写对象（“发票信息”，而不是“在这里填写发票相关信息”），主次靠字号和位置拉开。
5. 最后列出删了哪些、留了哪些，留下的写理由。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{padding:8px}
.h{font-size:11px;line-height:16px;font-weight:600}
.s{margin-top:2px;color:#5b616e;font-size:9px;line-height:12px}
.l{margin-top:7px;font-size:10px;line-height:14px}
.t{color:#8a909c;font-size:9px;line-height:12px}
.i{height:18px;margin-top:3px;border:1px solid #c9ced6;border-radius:4px}
.u{display:grid;place-items:center;height:18px;margin-top:3px;border:1px dashed #c9ced6;border-radius:4px;color:#5b616e;font-size:9px}
.k{margin-top:3px;color:#5b616e;font-size:9px;line-height:12px}
</style>

<div class="fx">
  <section class="fx-p"><h4>改前</h4><div class="fx-b"><div class="fx-z c"><div class="h">在这里填写发票信息</div><div class="s">填写后将用于开具发票</div><div class="l">公司名称</div><div class="t">请输入公司全称</div><div class="i"></div><div class="l">附件</div><div class="t">点击下方区域上传文件</div><div class="u">点击上传</div></div></div></section>
  <section class="fx-p ok"><h4>改后</h4><div class="fx-b"><div class="fx-z c"><div class="h">发票信息</div><div class="l">公司名称</div><div class="i"></div><div class="l">附件</div><div class="u">上传</div><div class="k">支持 PDF，最大 20MB</div></div></div></section>
</div>
