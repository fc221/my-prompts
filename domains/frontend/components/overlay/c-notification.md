---
zh: 通知
en: Notification
order: 90
---

## 是什么

右上角滑入的卡片：标题 + 一两行说明，可关闭，几秒后自己收起。

## 适合

需要读一下但不必马上处理的消息：导出完成、有新的审批、后台任务结束。

## 不适合

简短结果用轻提示；需要用户做决定的用对话框；持续存在的状态用页内横幅；不用来推营销内容。

## 要点

- 右上角、顶栏下方 16px，宽 320–380px；新的在上，最多 3–4 条
- 图标 + 标题 14px / 600 + 1–2 行描述 + 可选一个操作（“下载”“查看”）+ 关闭按钮
- 约 5 秒自动收起，悬停或聚焦时暂停；带重要操作或错误类的不自动消失
- 用 role="status" 播报，不抢焦点；同一条在通知中心留存，不是唯一入口
- 从右侧滑入 + 淡入约 240ms；关闭后其余通知平滑补位

## 提示词

给{后台任务完成 / 新审批}做「通知」：在右上角、顶栏下方 16px 滑入，宽 360px，图标 + 标题 14px/600 + 1–2 行描述 + 可选一个操作（如“下载”）+ 关闭按钮；约 5 秒收起，悬停或聚焦时暂停，带重要操作或错误类的不自动消失；新的在上、最多 4 条；role="status" 播报，不抢焦点；同一条在通知中心留存；窄屏改为顶部通栏并避开安全区。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{justify-items:start}
.pg{display:grid;gap:8px;justify-items:start;padding:16px 18px;background:#fff;border:1px solid #e3e6eb;border-radius:10px}
.go{min-width:100px}
.go[aria-disabled]{opacity:1;cursor:progress}
.stack{position:absolute;top:12px;right:12px;z-index:4;width:min(290px,calc(100% - 24px));display:grid;gap:8px}
.nt{display:grid;grid-template-columns:auto 1fr auto;gap:2px 10px;padding:12px 6px 12px 14px;background:#fff;border:1px solid #e3e6eb;border-radius:10px;box-shadow:0 8px 24px rgba(15,17,22,.14);animation:nin .24s cubic-bezier(0,0,.2,1);transition:opacity .16s,transform .16s}
.nt svg{grid-row:span 2;color:#12805c;margin-top:1px}
.nt b{font-size:14px}
.nt p{grid-column:2;font-size:12px;color:#5b616e}
.nt .x{grid-column:3;grid-row:1/span 2;width:28px;height:28px;font-size:18px}
.nt .lk{grid-column:2;justify-self:start;margin-top:2px;padding:0;border:0;background:none;color:#3b5bdb;font-size:13px}
.nt.out{opacity:0;transform:translateX(16px)}
@keyframes nin{from{opacity:0;transform:translateX(24px)}
}
@media (prefers-reduced-motion:reduce){.nt{animation-name:fade}
.nt.out{transform:none}
}
</style>

<div class="s"><div class="pg"><b>订单报表</b><p class="muted">导出全部 1,284 条订单</p><button class="b p go">开始导出</button></div><div class="stack" role="status"></div></div>

<script type="module">
import { I, timed } from '../../_shared/components-overlay.ts';

export default function demo(root) {
  const go = root.querySelector('.go'), stack = root.querySelector('.stack'); let n = 0;
  go.addEventListener('click', () => {
    if (go.getAttribute('aria-disabled')) return;
    go.setAttribute('aria-disabled', 'true'); go.innerHTML = '<span class="spin"></span>导出中…';
    setTimeout(() => {
      go.removeAttribute('aria-disabled'); go.textContent = '开始导出'; n++;
      const el = document.createElement('div'); el.className = 'nt';
      el.innerHTML = I.ok + '<b>导出完成</b><p>订单报表-' + n + '.xlsx 已生成（1.2 MB）</p><button class="lk">下载</button><button class="x" aria-label="关闭通知">×</button>';
      stack.prepend(el); while (stack.children.length > 3) stack.lastChild.remove();
      const bye = () => { el.classList.add('out'); setTimeout(() => el.remove(), 160); };
      const stop = timed(el, 5000, bye);
      el.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => { stop(); bye(); go.focus(); }));
    }, 1000);
  });
}
</script>
