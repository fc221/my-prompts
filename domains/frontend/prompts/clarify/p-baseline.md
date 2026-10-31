---
zh: 前端质量底线
en: Quality baseline
aka: 通用底线
order: 40
---

## 是什么

附在任何前端需求后面的一段质量要求，补上 AI 最容易漏的状态、适配和无障碍。

## 适合

每次让 AI 写或改页面时，粘在需求最后。

## 要点

- 直接粘在需求末尾，基本不用改。
- 有品牌色就替换 {品牌色}，没有就删掉这半句。
- 只做手机页时，把宽度改成 375 / 390 / 430。
- 交付时让 AI 按 7 条逐条回报是否做到。

## 提示词

通用质量要求（逐条遵守，交付时逐条说明是否做到）：
1. 颜色与字号：颜色统一用变量（背景、表面、边框、文字、次要文字、强调色、危险色、成功色），强调色用 {品牌色}，只给主按钮、当前项、链接和焦点；字号只取 12/14/16/18/20/24/32，最小 12px；间距用 4 的倍数。
2. 状态：每个主要区域都做加载（骨架或转圈，延迟 200–300ms 出现）、空状态（原因 + 下一步按钮）、错误（原因 + 重试，保留已填内容）、无权限；按钮有默认、悬停、按下、聚焦、禁用、加载六态。
3. 适配：1440 / 1280 / 768 / 390 宽都不出现整页横向滚动；网格列用 minmax(0, 1fr)；窄屏后台侧栏改左侧抽屉，多列改单列；触屏可点区域 ≥ 44×44px，输入框字号 ≥ 16px。
4. 无障碍：用语义标签；所有操作键盘可达，焦点环清楚；图标按钮有 aria-label；文字对比度 ≥ 4.5:1，大字和图形 ≥ 3:1；动态结果用 role="status" 播报。
5. 动效：只动 transform 和 opacity（按钮等控件自身形变除外）；时长 150–300ms；支持 prefers-reduced-motion。
6. 内容：示例数据真实可信，包含 0、超长文本、缺字段等边界值，不用“张三、测试 1”；不虚构后端能力和客户背书；不用 emoji 当图标，不用蓝紫渐变、发光描边、渐变文字。
7. 复用：先查项目里已有的组件、样式变量和工具函数，能复用就不新写。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.c{padding:6px 8px}
/* 左：只画了有数据的样子 */
.pg{border:1px solid #e3e6eb;border-radius:6px;overflow:hidden;font-size:9.5px;line-height:13px}
.hd{padding:3px 6px;background:#f7f8fa;font-size:10px;font-weight:600}
.rw{display:flex;justify-content:space-between;gap:4px;padding:3px 6px;border-top:1px solid #eef0f3;white-space:nowrap}
.rw b{font-weight:500;color:#1f7a4d}
.q{margin:6px 0 0;color:#5b616e;font-size:10px;line-height:14px}
/* 右：补上的非成功态和底线 */
.g{display:grid;grid-template-columns:1fr 1fr;gap:5px}
.k{padding:4px;border:1px solid #e3e6eb;border-radius:5px;font-size:9.5px;line-height:13px;text-align:center}
.k small{display:block;margin-bottom:3px;color:#5b616e;font-size:9px;line-height:11px;text-align:left}
.sk{height:6px;border-radius:3px;background:#e9ebef}
.sk+.sk{width:60%;margin-top:3px}
.bt{display:inline-block;margin-top:2px;padding:0 6px;border-radius:3px;background:#3b5bdb;color:#fff;font-size:9px;line-height:13px}
.bt.dis{background:#e3e6eb;color:#9aa0ab}
.er{color:#b42318}
.ln{color:#3b5bdb}
.mo{margin-top:5px;color:#5b616e;font-size:9.5px;line-height:13px}
</style>

<div class="fx">
  <section class="fx-p"><h4>只有成功态</h4><div class="fx-b"><div class="fx-z c"><div class="pg"><div class="hd">订单列表</div><div class="rw"><span>#2041</span><b>已发货</b><span>¥268</span></div><div class="rw"><span>#2040</span><b>已发货</b><span>¥1,280</span></div><div class="rw"><span>#2039</span><b>已完成</b><span>¥96</span></div></div><p class="q">没数据、出错、加载中长什么样？没人说，AI 就不画。</p></div></div></section>
  <section class="fx-p ok"><h4>补上底线状态</h4><div class="fx-b"><div class="fx-z c"><div class="g"><div class="k"><small>加载</small><div class="sk"></div><div class="sk"></div></div><div class="k"><small>空</small>暂无订单<br><span class="bt">新建</span></div><div class="k"><small>错误</small><span class="er">加载失败</span><br><span class="ln">重试</span></div><div class="k"><small>禁用</small><span class="bt">提交</span> <span class="bt dis">提交</span></div></div><p class="mo">另补：390 宽、对比度、键盘</p></div></div></section>
</div>
