---
zh: 科技深色
en: Dark tech
order: 10
---

## 是什么

近黑底、细线框、一个冷色强调，配真实代码与界面，精确克制不发光。

## 适合

开发者工具、云服务、API 平台、技术产品官网，也可以做深色运营后台和看板。

## 不适合

不要蓝紫渐变、霓虹发光描边和满屏网格；等宽字体不要当装饰到处用。

## 要点

- 配色：底 #0b0d12，表面 #12151c，线 #232834，正文 #e6e8ee，次要 #9aa3b2；一个强调色（如天青 #3fb6ff）只占 2–5% 面积
- 浅色强调色按钮配深色文字（对比度 ≥ 4.5:1），不加外发光
- 字体：系统无衬线，标题 600、字号对比清晰；等宽字体只用于代码、命令和数据读数（后台里也用于 11–12px 的区块小标题和坐标刻度）
- 圆角 0–6px，1px 细线框分隔，阴影几乎不用，层次靠表面明度差
- 版式：左文右图（代码块或产品界面），网格只出现在局部示意图里
- 配图：真实产品界面、架构示意、可复制的代码片段，代码每行 ≤ 56 个字符
- 动效：精确、线性、短促；代码可逐行出现一次，不做循环光效
- 用在后台看板时：卡片表面只比底亮一档；页面标题后半句降成次要色；计数一律右对齐等宽数字；图例用 8px 色点 + 名称 + 右对齐数值；整页留一张真实物件或设备图做记忆点，其余全是数据

## 提示词

把{产品}官网做成科技深色风：底 #0b0d12、表面 #12151c、1px 线 #232834，正文 #e6e8ee、次要 #9aa3b2；只用一个强调色 {品牌色}，面积 ≤ 5%，浅色按钮配深字；无衬线标题 600，等宽字体只用于代码与读数；圆角 ≤ 6px，不发光、不用蓝紫渐变；首屏左侧价值主张 + 主次按钮，右侧可复制的代码块；动效只有代码逐行出现一次；窄屏代码块移到标题下方并可横向滚动；减少动态效果时直接显示。

## 示例

<style>
:host{container-type:size}
.s{height:100%;display:flex;flex-direction:column;padding:10px 20px 14px;background:#0b0d12;color:#e6e8ee;font:13px/1.5 system-ui,"PingFang SC",sans-serif}
nav{display:flex;align-items:center;gap:16px;font-size:12px;color:#9aa3b2}
nav b{margin-right:auto;color:#e6e8ee}
nav em{font-style:normal;color:#3fb6ff}
.h{flex:1;min-height:0;display:flex;align-items:center;gap:16px}
.tx{flex:1;min-width:0}
h1{margin:0;font-size:clamp(20px,11cqh,38px);line-height:1.2;font-weight:600}
p{margin:6px 0 12px;color:#9aa3b2;font-size:12px}
.bt{display:flex;gap:8px}
.bt a{height:30px;padding:0 12px;display:inline-flex;align-items:center;border-radius:6px;border:1px solid #2f3542;font-size:12px;white-space:nowrap}
.bt .p{background:#3fb6ff;border-color:#3fb6ff;color:#0b0d12;font-weight:600}
pre{flex:1;min-width:0;max-width:300px;margin:0;padding:12px;border:1px solid #232834;border-radius:6px;background:#12151c;font:12px/1.8 ui-monospace,Menlo,monospace;color:#c9d1dc;white-space:pre;overflow:hidden}
pre i{font-style:normal;color:#3fb6ff}
pre u{text-decoration:none;color:#5fd4a0}
pre s{text-decoration:none;color:#9aa3b2}
@container (max-width:440px){.bt a:not(.p){display:none}
}
</style>

<div class="s"><nav><b>◆ MyPrompts</b><span>文档</span><span>定价</span><em>控制台</em></nav><div class="h"><div class="tx"><h1>提交代码，<br>42 秒上线</h1><p>28 个边缘节点，自动回滚</p><div class="bt"><a class="p">免费部署</a><a>查看文档</a></div></div><pre><i>$</i> fluxa up --prod
<u>✓</u> 构建完成   8.2s
<u>✓</u> 发布到 28 个节点
<s>→ fluxa.app/v42</s></pre></div></div>
