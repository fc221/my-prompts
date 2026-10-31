---
zh: 离线与弱网
en: Offline & slow network
order: 80
---

## 是什么

网络断开时顶部出现提示，说明哪些还能用；恢复后告诉用户修改已经同步。

## 适合

移动端和 H5、需要在弱网下使用的表单与编辑器、实时协作页面。

## 不适合

不要在断网时清空页面或丢掉没提交的输入；不要只放一个一直转的圈。

## 要点

- 用组件库的警示条、轻提示和通知拼，行为按下面的要求：断网横幅用 Element Plus el-alert type="warning" :closable="false" show-icon、Naive UI n-alert type="warning" :closable="false"、Ant Design Vue a-alert banner type="warning"；恢复提示用 ElMessage / useMessage() / message；同步失败清单用 ElNotification / useNotification() / notification
- 横幅在页面顶部常驻，写“网络已断开，修改会暂存在本机，恢复后自动同步”，不可关闭、不自动消失，网络恢复才撤掉
- 已加载的内容照常看；未提交的输入存本地，见「自动保存与保存状态」；依赖网络的按钮 disabled 并用「文字提示」说明原因
- 恢复后用轻提示“已恢复连接，3 处修改已同步”，约 3 秒消失；注意单位：Ant Design Vue 的 duration 是秒，Element Plus、Naive UI 是毫秒
- 同步失败不用轻提示，用通知逐条列出并设为不自动关闭（Element Plus duration: 0，Naive UI 不传 duration，Ant Design Vue duration: null），每条带“重试”
- 请求超过 3 秒出一条可手动关闭、不自动消失的提示“网络较慢，正在重试…”，自动重试间隔逐次加长，成功后把它关掉
- 监听 online / offline 事件只用来切横幅，以真实请求的结果为准：连着 Wi-Fi 没网也是断网

## 提示词

给{编辑器 / 表单 / H5 页面}加离线与弱网处理，用项目组件库的现成件拼，不手写提示条：断网时顶部用警示条（Element Plus el-alert type="warning" :closable="false" show-icon；Naive UI n-alert type="warning" :closable="false"；Ant Design Vue a-alert banner type="warning"）常驻“网络已断开，修改会暂存在本机，恢复后自动同步”，恢复才撤掉；已加载内容可继续查看，输入暂存本地，依赖网络的按钮 disabled 并用文字提示说明原因；恢复后用轻提示（ElMessage / useMessage / message）显示“已恢复连接，N 处修改已同步”，3 秒消失（Ant Design Vue 的 duration 单位是秒）；同步失败用通知（ElNotification / useNotification / notification）逐条列出，不自动关闭，每条带“重试”；请求超过 3 秒出“网络较慢，正在重试…”，可手动关、成功后自动关，自动重试间隔逐次加长；online / offline 事件只切横幅，以真实请求结果为准；不清空页面，不只显示转圈。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{padding:12px}
.ed{width:100%;max-width:520px;height:100%;padding:10px 12px;background:#fff;border:1px solid #e3e6eb;border-radius:10px;display:flex;flex-direction:column;gap:8px}
.live:empty{display:none}
.bn{padding:6px 10px;border-radius:6px;font-size:12px;line-height:1.45;animation:fade .2s}
.bn.off{background:#fff6e8;color:#7a3306}
.bn.on{background:#e7f6ef;color:#0c5e43}
.hd{display:flex;align-items:baseline;justify-content:space-between}
.sv{font-variant-numeric:tabular-nums}
textarea{flex:1;min-height:0;resize:none;padding:8px 10px;border:1px solid #e3e6eb;border-radius:8px;font-size:13px;line-height:1.6}
textarea:focus{outline:none;border-color:#3b5bdb}
.tg{display:flex;align-items:center;gap:6px;font-size:12px;color:#5b616e;cursor:pointer}
</style>

<div class="s"><div class="ed"><div class="live" role="status"></div><div class="hd"><b>会议纪要</b><span class="muted sv">已保存</span></div><textarea aria-label="纪要内容">1. 确认下周上线范围</textarea><label class="tg"><input type="checkbox"> 模拟断网</label></div></div>

<script type="module">
import { sv } from '../../_shared/components-overlay.ts';

export default function demo(root) {
  const live = root.querySelector('.live'), sv = root.querySelector('.sv'), ta = root.querySelector('textarea'), net = root.querySelector('input'); let off = false, pend = 0, t, h;
  const say = (cls, txt) => { clearTimeout(h); live.innerHTML = txt ? '<div class="bn ' + cls + '">' + txt + '</div>' : ''; };
  ta.addEventListener('input', () => {
    clearTimeout(t);
    if (off) { pend++; sv.textContent = '离线 · ' + pend + ' 处修改待同步'; return; }
    sv.textContent = '保存中…'; t = setTimeout(() => (sv.textContent = '已保存'), 600);
  });
  net.addEventListener('change', () => {
    off = net.checked; clearTimeout(t);
    if (off) { say('off', '网络已断开，修改会暂存在本机，恢复后自动同步。'); sv.textContent = '离线'; return; }
    say('on', pend ? '已恢复连接，' + pend + ' 处修改已同步' : '已恢复连接'); pend = 0; sv.textContent = '已保存';
    h = setTimeout(() => say(), 3000);
  });
}
</script>
