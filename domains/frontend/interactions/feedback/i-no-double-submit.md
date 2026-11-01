---
zh: 防重复提交
en: Prevent double submit
order: 60
---

## 是什么

点击提交后按钮立刻进入“提交中…”并锁定，连点多次也只发出一次请求。

## 适合

提交表单、下单、支付、发送、创建等会产生新记录或扣费的操作。

## 注意

前端锁按钮只能挡住误点，后端仍要用幂等键防止重复创建。

## 要点

- 点击后同一帧进入加载态：按钮内 14–16px 转圈 + “提交中…”，按钮宽度不变。
- 用 aria-disabled="true" 锁定（保持可聚焦），期间的重复点击直接忽略，不排队。
- 回车提交和点击走同一个入口，同样受锁定保护。
- 请求带幂等键（同一次提交重试时复用），后端据此去重。
- 成功后给出结果（单号、去向）；失败恢复按钮原文案并显示原因，已填内容不清空。
- 超过 10 秒未返回时提示“仍在处理，请勿重复提交”，不要让人以为卡死。

## 提示词

给{提交按钮}加「防重复提交」：点击或回车后同一帧进入加载态（按钮内转圈 + “{动作}中…”，宽度不变），用 aria-disabled 锁定，期间的重复点击直接忽略；请求带幂等键，重试时复用；成功后显示结果和{下一步}，失败恢复原文案并显示原因，不清空已填内容；超过 10 秒提示“仍在处理，请勿重复提交”。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;place-items:center;padding:12px}
.box{display:flex;align-items:center;gap:20px;width:100%;max-width:420px;background:#fff;border:1px solid #e3e6eb;border-radius:12px;padding:16px}
.f{flex:1;min-width:0;display:flex;flex-direction:column;align-items:flex-start}
.lbl{color:#5b616e;font-size:12px}
.amt{margin-bottom:10px;font-size:20px;font-weight:600;font-variant-numeric:tabular-nums}
.go{display:inline-flex;align-items:center;justify-content:center;gap:8px;width:136px;height:36px;border:0;border-radius:8px;background:#3b5bdb;color:#fff;font-weight:600;transition:background .16s}
.go:hover{background:#3451c6}
.go:active{transform:scale(.97)}
.go .sp{display:none;border-color:rgba(255,255,255,.4);border-top-color:#fff}
.go[aria-disabled=true]{background:#6f86e3;cursor:progress}
.go[aria-disabled=true] .sp{display:inline-block}
.res{min-height:18px;margin:6px 0 0;color:#5b616e;font-size:12px}
.res.ok{color:#12805c}
.k{flex:none;display:grid;gap:8px;margin:0}
.k div{min-width:92px;padding:6px 12px;border-radius:8px;background:#f5f6f8}
.k dt{color:#5b616e;font-size:12px}
.k dd{margin:0;font-size:20px;font-weight:600;font-variant-numeric:tabular-nums}
.k .bump{animation:bp .3s}
@keyframes bp{40%{color:#3b5bdb;transform:translateY(-2px)}
}
@container (min-width:560px){.box{max-width:500px;padding:24px 28px}
.go{width:160px;height:40px}
}
</style>

<div class="st"><div class="box"><div class="f"><span class="lbl">开票金额</span><b class="amt">¥3,280.00</b><button class="go" type="button"><i class="sp" aria-hidden="true"></i><span class="t">提交申请</span></button><p class="res" role="status">快速连点几下试试</p></div><dl class="k"><div><dt>点击次数</dt><dd class="clicks">0</dd></div><div><dt>实际请求</dt><dd class="reqs">0</dd></div></dl></div></div>

<script type="module">
export default function demo(root) {
  const go = root.querySelector('.go'), t = root.querySelector('.t'), res = root.querySelector('.res'), c = root.querySelector('.clicks'), r = root.querySelector('.reqs');
  let clicks = 0, reqs = 0, busy = false, no = 17;
  const bump = (el, v) => { el.textContent = v; el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); };
  go.onclick = () => {
    bump(c, ++clicks);
    if (busy) return; // 锁定期间的点击直接忽略
    busy = true; bump(r, ++reqs);
    go.setAttribute('aria-disabled', 'true'); t.textContent = '提交中…'; res.className = 'res'; res.textContent = '请求已发出，按钮已锁定';
    setTimeout(() => {
      if (!root.host.isConnected) return;
      busy = false; go.removeAttribute('aria-disabled'); t.textContent = '提交申请';
      res.className = 'res ok'; res.textContent = `已提交 · 申请单 INV-${String(++no).padStart(4, '0')}`;
    }, 1600);
  };
}
</script>
