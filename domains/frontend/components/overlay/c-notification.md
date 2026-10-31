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

- 用组件库的通知：Element Plus ElNotification({ title, message, type, duration, position, showClose, offset, onClick })，Naive UI n-notification-provider（placement、max）包住应用后 useNotification().create({ title, content, meta, action, duration, closable, keepAliveOnHover })，Ant Design Vue notification.open({ message, description, btn, duration, placement, key, onClick }) 加 notification.config({ top, maxCount })；滑入、堆叠补位、关闭按钮、宽度由组件负责
- 位置右上角、顶栏下方 16px：三家默认都是右上角，距顶栏的距离用 Element Plus offset / Ant Design Vue top，Naive UI 用 container-style
- 内容：图标 + 标题 + 1 至 2 行描述 + 可选一个操作（“下载”“查看”）+ 关闭按钮；操作按钮放 Naive UI 的 action、Ant Design Vue 的 btn，Element Plus 的 message 传 VNode
- 时长约 5 秒：Element Plus 和 Ant Design Vue 默认 4.5 秒；Naive UI 不传 duration 就永远不关，要显式写 duration: 5000 并开 keepAliveOnHover；悬停暂停 Element Plus 默认开（pauseOnHover）
- 带重要操作或错误类的不自动消失：Element Plus duration: 0，Ant Design Vue duration: null，Naive UI 不传 duration
- 新的在上、最多 3 至 4 条：Naive UI max、Ant Design Vue maxCount；Element Plus 没有上限，自己控制发出的条数
- 点卡片跳到对应页面并关闭：Element Plus、Ant Design Vue 用 onClick，Naive UI 在 content 或 action 里放链接；同一条在通知中心留存，卡片不是唯一入口
- 窄屏改为顶部通栏：Naive UI、Ant Design Vue placement="top"；Element Plus 没有顶部通栏，窄屏改用「轻提示 Toast」

## 提示词

给{后台任务完成 / 新审批}做「通知」：用项目组件库自带的通知（Element Plus ElNotification({ title, message, duration })；Naive UI 用 n-notification-provider 包住应用后 useNotification().create({ title, content, action, duration })；Ant Design Vue notification.open({ message, description, btn, duration })），不手写卡片和堆叠。位置用默认的右上角、顶栏下方 16px（Element Plus offset / Ant Design Vue notification.config 的 top）；内容：标题“{导出完成}” + 1 至 2 行描述 + 一个操作“{下载}”（Naive UI action / Ant Design Vue btn / Element Plus message 传 VNode）+ 关闭按钮；约 5 秒收起、悬停暂停（Naive UI 必须写 duration 并开 keepAliveOnHover，不写永远不关）；带重要操作或错误类的不自动消失（duration 0 / null / 不传）；新的在上、最多 4 条（max / maxCount）；点卡片跳到对应页面并关闭；同一条在通知中心留存；窄屏改为顶部通栏（placement="top"）或「轻提示 Toast」。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{justify-items:start}
.pg{display:grid;gap:8px;justify-items:start;padding:16px;background:#fff;border:1px solid #e3e6eb;border-radius:10px}
.ac{display:flex;gap:8px}
.go{min-width:100px}
.go[aria-disabled]{opacity:1;cursor:progress}
.stack{position:absolute;top:12px;right:12px;z-index:4;width:min(288px,calc(100% - 24px));display:grid;gap:8px}
.nt{display:grid;grid-template-columns:auto 1fr auto;gap:2px 8px;padding:12px 8px 12px 12px;background:#fff;border:1px solid #e3e6eb;border-radius:10px;box-shadow:0 8px 24px rgba(15,17,22,.14);animation:nin .24s cubic-bezier(0,0,.2,1);transition:opacity .16s,transform .16s}
.nt svg{grid-row:span 2;color:#12805c;margin-top:1px}
.nt.info svg{color:#3b5bdb}
.nt b{font-size:14px}
.nt p{grid-column:2;font-size:12px;color:#5b616e}
.nt .x{grid-column:3;grid-row:1/span 2;width:28px;height:28px;font-size:18px}
.nt .lk{grid-column:2;justify-self:start;margin-top:4px;padding:0;border:0;background:none;color:#3b5bdb;font-size:13px}
.nt.out{opacity:0;transform:translateX(16px)}
@keyframes nin{from{opacity:0;transform:translateX(24px)}
}
@media (prefers-reduced-motion:reduce){.nt{animation-name:fade}
.nt.out{transform:none}
}
</style>

<div class="s"><div class="pg"><b>订单报表</b><p class="muted">导出全部 1,284 条订单</p><div class="ac"><button class="b p go">开始导出</button><button class="b sync">同步数据</button></div></div><div class="stack" role="status"></div></div>

<script type="module">
import { I, timed } from '../../_shared/components-overlay.ts';

export default function demo(root) {
  const go = root.querySelector('.go'), stack = root.querySelector('.stack'); let n = 0;
  const bye = (el) => { el.classList.add('out'); setTimeout(() => el.remove(), 160); };
  // 新的在上，最多 3 条；带“下载”这种重要操作的不自动消失，普通的 5 秒收起、悬停或聚焦时暂停
  const push = (html, cls, ms) => {
    const el = document.createElement('div'); el.className = 'nt ' + cls; el.innerHTML = html;
    stack.prepend(el); while (stack.children.length > 3) stack.lastChild.remove();
    const stop = ms ? timed(el, ms, () => bye(el)) : () => {};
    el.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => { stop(); bye(el); go.focus(); }));
  };
  const done = () => { n++; push(I.ok + '<b>导出完成</b><p>订单报表-' + n + '.xlsx 已生成（1.2 MB）</p><button class="lk">下载</button><button class="x" aria-label="关闭通知">×</button>', '', 0); };
  go.addEventListener('click', () => {
    if (go.getAttribute('aria-disabled')) return;
    go.setAttribute('aria-disabled', 'true'); go.innerHTML = '<span class="spin"></span>导出中…';
    setTimeout(() => { go.removeAttribute('aria-disabled'); go.textContent = '开始导出'; done(); }, 1000);
  });
  root.querySelector('.sync').addEventListener('click', () => push(I.info + '<b>同步完成</b><p>1,284 条订单已更新到最新状态</p><button class="x" aria-label="关闭通知">×</button>', 'info', 5000));
  done(); // 挂载时先出一条带“下载”的通知，看得到位置和样式；再点按钮继续发
}
</script>
