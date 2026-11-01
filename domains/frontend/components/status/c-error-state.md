---
zh: 错误状态与重试
en: Error state & retry
order: 50
---

## 是什么

请求失败时，在出错的那块区域里说明原因，并给一个“重试”按钮。

## 适合

接口超时、服务异常、网络中断导致的区块或页面加载失败。

## 不适合

只影响一个区块时不要整页报错；字段校验错误放在字段下方；不要只写“出错了”。

## 要点

- 用组件库的结果页或警示条拼，行为按下面的要求：区块级用 Element Plus el-result icon="error"（extra 插槽放 el-button :loading）、Naive UI n-result status="error"（footer 插槽放 n-button :loading）、Ant Design Vue a-result status="error"（extra 插槽放 a-button :loading）；行内或窄条用 el-alert type="error"（title、description、:closable="false"）、n-alert type="error"（title、:closable="false"）、a-alert type="error"（message、description，重试放 action 插槽）
- 文案三段：失败类型（网络、服务、超时）+ 下一步 + 错误或请求编号，方便反馈；不只写“出错了”
- 只替换出错的那块，其余区块照常，已加载的数据和已填写的内容保留；整页失败才用「404 与异常页」
- 重试按钮进入 loading，期间不重复发请求；成功后直接换成内容，不再闪一下空状态
- 连续失败 2 至 3 次后出现“联系支持”或“反馈问题”的入口，带上错误编号
- 部分失败（批量操作、多个接口）分别列出成功项和失败项，失败项可单独重试，见「只补跑失败的那几项」
- 读屏：alert 组件自带播报；用 result 拼的区块给容器加 role="alert"，只播报一次

## 提示词

给{区块或页面}做错误状态：用项目组件库的结果页或警示条拼，不手写：区块级用 Element Plus el-result icon="error" + extra 插槽 / Naive UI n-result status="error" + footer 插槽 / Ant Design Vue a-result status="error" + extra 插槽；行内用 el-alert / n-alert / a-alert type="error" 且不可关闭。只在出错的区块内显示，其余区块和已填写内容保持不变；文案写失败类型（网络、服务、超时）+ 下一步 + 错误编号，不只写“出错了”；“重试”用组件按钮的 loading，期间不重复请求，成功后直接显示内容；连续失败 {3} 次后给出联系支持的入口并带错误编号；部分失败时分别列出成功和失败项，失败项可单独重试；用 result 拼时容器加 role="alert"；窄屏按钮占满宽度。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.grid{width:100%;max-width:460px;display:grid;grid-template-columns:1fr 1fr;gap:12px}
.card{min-height:146px;padding:14px;background:#fff;border:1px solid #e3e6eb;border-radius:10px;display:flex;flex-direction:column;justify-content:center;gap:2px}
.num{font-size:24px;font-variant-numeric:tabular-nums}
.fail{display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center}
.fail svg{width:22px;height:22px;color:#d92d20}
.fail b{font-size:14px}
.retry{margin-top:4px}
.retry[aria-disabled]{opacity:1;cursor:progress}
.retry .spin{width:12px;height:12px}
</style>

<div class="s"><div class="grid"><div class="card"><span class="muted">今日订单</span><b class="num">1,284</b><span class="muted">较昨日 +3.1%</span></div><div class="card bad" role="alert"><div class="fail"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/></svg><b>加载失败</b><p class="muted">请求超时，请重试<br>编号 7F3A-21</p><button class="b sm retry">重试</button></div></div></div></div>

<script type="module">
export default function demo(root) {
  const card = root.querySelector('.bad'), btn = card.querySelector('.retry');
  btn.addEventListener('click', () => {
    if (btn.getAttribute('aria-disabled')) return;
    btn.setAttribute('aria-disabled', 'true'); btn.innerHTML = '<span class="spin"></span>重试中…'; card.setAttribute('aria-busy', 'true');
    setTimeout(() => { card.removeAttribute('role'); card.removeAttribute('aria-busy'); card.innerHTML = '<span class="muted">今日退款</span><b class="num">36</b><span class="muted">较昨日 −2 笔</span>'; }, 1200);
  });
}
</script>
