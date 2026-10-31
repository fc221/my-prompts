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

- 写清原因类型（网络、服务、超时）和下一步，附错误编号或请求编号，方便反馈
- 只在出错的区块内显示，其余区块照常；已有数据和已填写的内容保留
- 点“重试”后按钮进入加载态并防重复；多次失败后给出联系支持的入口
- 错误区块用 role="alert" 播报一次
- 部分失败时分别列出成功项和失败项，失败项可单独重试

## 提示词

给{区块或页面}设计「错误状态」：只在出错的区块内显示，图标 + “加载失败” + 原因（网络、服务、超时）+ 错误编号 + “重试”按钮；重试时按钮进入加载态并防重复，成功后直接显示内容；连续失败给出联系支持的入口；其余区块和已填写内容保持不变；用 role="alert" 播报一次；部分失败时分别列出成功和失败项，失败项可单独重试；窄屏按钮占满宽度。

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
