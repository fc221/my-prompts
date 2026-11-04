---
zh: 补全空状态
en: Blank empty states
aka: 空状态一片白
order: 210
---

## 是什么

症状：没数据、搜不到、出错时只剩一片空白，或一个永远在转的圈。

## 要点

- 列出页面上哪些区域可能没数据。
- 告诉 AI 每种情况下用户最可能想做什么。

## 提示词

页面在没有数据或出错时一片空白，请为每个主要区域补齐非成功状态，每种写清“原因 + 下一步”：
1. 首次加载：与真实内容同形的骨架屏，不用整页转圈。
2. 完全没有数据：说明原因（“还没有{对象}”）+ 主按钮“新建{对象}”或“导入”；此时隐藏搜索和筛选。
3. 搜索或筛选无结果：写出当前条件，给“清除筛选”，保留已输入的关键词。
4. 请求失败：写明原因（网络、服务、超时）+“重试”；保留已有数据和已填内容；只影响一个区块时只在区块内显示。
5. 无权限：说明访问状态和下一步（申请权限、联系管理员）。
6. 部分失败：分别列出成功项和失败项，失败项可单独重试。
样式：区域内居中，48–64px 的简洁线性图标（与产品风格一致，不用通用卡通插画），标题 16px，说明 14px 次要色一到两行，按钮写具体动作。同一区域的几种状态由一个状态变量切换，不会同时出现。
需要覆盖的区域：{区域列表}

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{display:flex;flex-direction:column;padding:8px}
.hd{flex:none;font-size:11px;line-height:16px;font-weight:600}
.in{flex:none;margin-top:5px;height:18px;padding:0 6px;border:1px solid #c9ced6;border-radius:4px;color:#8a909c;font-size:9.5px;line-height:16px}
.bd{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;text-align:center}
/* 改前：一片白，中间一个永远在转的圈 */
.sp{width:16px;height:16px;border:2px solid #e3e6eb;border-top-color:#8a909c;border-radius:50%}
.q{color:#8a909c;font-size:9.5px;line-height:13px}
/* 改后：原因 + 下一步，没数据时不显示搜索框 */
.ic{position:relative;width:26px;height:20px;border:1.5px solid #8a909c;border-radius:4px}
.ic::after{content:"";position:absolute;left:4px;right:4px;top:9px;border-top:1.5px solid #8a909c}
.tt{font-size:11px;line-height:14px;font-weight:600}
.ds{color:#5b616e;font-size:9.5px;line-height:13px}
.bt{margin-top:2px;padding:0 8px;border-radius:4px;background:#3b5bdb;color:#fff;font-size:9.5px;line-height:18px}
</style>

<div class="fx">
  <section class="fx-p"><h4>改前</h4><div class="fx-b"><div class="fx-z c"><div class="hd">我的订单</div><div class="in">搜索订单号</div><div class="bd"><div class="sp"></div><div class="q">一直在转，没数据也不说</div></div></div></div></section>
  <section class="fx-p ok"><h4>改后</h4><div class="fx-b"><div class="fx-z c"><div class="hd">我的订单</div><div class="bd"><div class="ic"></div><div class="tt">还没有订单</div><div class="ds">下单后会显示在这里</div><span class="bt">新建订单</span></div></div></div></section>
</div>
