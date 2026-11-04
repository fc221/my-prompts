---
zh: 对话输入框
en: Chat composer
order: 10
---

## 是什么

对话页底部的多行输入框，左下放附件，右下是发送键，生成中变成停止键。

## 适合

AI 对话、Agent 工作区、客服聊天的消息输入。

## 不适合

单行搜索用普通搜索框；不要让“发送”和“停止”两个按钮同时出现。

## 要点

- 组件库没有现成的对话输入框，自己拼；零件用组件库的：多行输入用 Element Plus el-input type="textarea" :autosize="{ minRows: 1, maxRows: 8 }" resize="none"、Naive UI n-input type="textarea" :autosize="{ minRows: 1, maxRows: 8 }"、Ant Design Vue a-textarea :autosize="{ minRows: 1, maxRows: 8 }"；发送和附件按钮用 el-button circle / n-button circle / a-button shape="circle"；附件卡片上的状态用 el-tag / n-tag / a-tag
- 从 1 行起随内容增高，到 maxRows 后内部滚动；外层卡片自己画：圆角、边框、聚焦时边框变强调色，输入框本身去掉边框，不要出现两层框
- Enter 发送、Shift+Enter 换行，自己监听 keydown 判断，组字中（e.isComposing）按 Enter 不发送；不依赖组件的回车事件
- 发送键三个状态：空内容 disabled；有内容可发；生成中原位变成“停止”，点了立即停止并保留已生成内容，aria-label 跟着变（“发送” / “停止生成”）
- 附件以小卡片排在输入框上方：解析中、已就绪、失败可重试、可移除；上传本身用「上传」
- 占位文字写能做什么（“问我任何问题，或上传文件…”），不是“请输入”
- 窄屏贴底并加 env(safe-area-inset-bottom)，软键盘弹出时保持可见

## 提示词

为{AI 对话页}做对话输入框，组件库没有现成的，自己拼，零件用项目组件库的：多行输入用 Element Plus el-input type="textarea" :autosize="{ minRows: 1, maxRows: 8 }" / Naive UI n-input type="textarea" 同样的 autosize / Ant Design Vue a-textarea 同样的 autosize，去掉输入框自己的边框，外层卡片圆角、聚焦时边框变强调色；左下附件按钮、右下圆形发送键用组件库的圆形按钮；Enter 发送、Shift+Enter 换行，keydown 里判断 isComposing，组字中不发送；空内容发送键 disabled，生成中原位变成“停止”并同步 aria-label；附件以小卡片显示在输入框上方（解析中 / 已就绪 / 失败重试 / 可移除）；占位文字写能做什么；窄屏贴底加底部安全区，软键盘弹出时保持可见。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{align-content:end;justify-items:center;gap:8px;padding:12px}
.cp{width:100%;max-width:560px;padding:8px 8px 6px 12px;background:#fff;border:1px solid #e3e6eb;border-radius:14px;box-shadow:0 2px 8px rgba(15,17,22,.05);transition:border-color .1s}
.cp:focus-within{border-color:#3b5bdb}
textarea{display:block;width:100%;min-height:24px;max-height:88px;padding:4px 0;border:0;outline:0;resize:none;background:none;font-size:15px;line-height:1.5;overflow-y:auto}
@media (pointer:coarse){textarea{font-size:16px}
}
.bar{display:flex;align-items:center;justify-content:space-between;margin-top:4px}
.ic{width:32px;height:32px;border:0;border-radius:8px;background:none;color:#5b616e;display:grid;place-items:center}
.ic:hover{background:#f0f2f5;color:#1f2329}
.send{width:32px;height:32px;border:0;border-radius:50%;background:#3b5bdb;color:#fff;display:grid;place-items:center}
.send:disabled{background:#c9ced6;cursor:not-allowed}
.send.stop{background:#1f2329}
.files{display:flex;flex-wrap:wrap;gap:6px}
.files:not(:empty){margin-bottom:6px}
.fc{display:flex;align-items:center;gap:6px;height:28px;padding:0 2px 0 8px;border:1px solid #e3e6eb;border-radius:8px;background:#f5f6f8;font-size:12px}
.fc .ok{color:#12805c}
.fc .spin{width:12px;height:12px;color:#5b616e}
.fc .x{width:22px;height:22px;font-size:15px}
.st{text-align:center}
</style>

<div class="s"><p class="muted st" role="status">Enter 发送 · Shift+Enter 换行</p><div class="cp"><div class="files"></div><textarea rows="1" placeholder="问点什么，或添加文件" aria-label="输入消息"></textarea><div class="bar"><button class="ic att" aria-label="添加附件"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m20 11-8 8a5 5 0 0 1-7-7l8-8a3.5 3.5 0 0 1 5 5l-8 8a2 2 0 0 1-3-3l7-7"/></svg></button><button class="send" aria-label="发送" disabled><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg></button></div></div></div>

<script type="module">
import { I } from '../../_shared/components-overlay.ts';

export default function demo(root) {
  const ta = root.querySelector('textarea'), send = root.querySelector('.send'), st = root.querySelector('.st'), files = root.querySelector('.files'); let busy = false, t, n = 0;
  const fit = () => { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 88) + 'px'; };
  const sync = () => { send.disabled = !busy && !ta.value.trim(); };
  const done = (msg) => { clearTimeout(t); busy = false; send.classList.remove('stop'); send.innerHTML = I.up; send.setAttribute('aria-label', '发送'); st.textContent = msg; sync(); };
  const go = () => {
    if (busy) return done('已停止，已生成的内容会保留');
    if (!ta.value.trim()) return;
    ta.value = ''; fit(); busy = true; send.classList.add('stop'); send.innerHTML = I.stop; send.setAttribute('aria-label', '停止生成'); st.textContent = '正在生成回复…'; sync();
    t = setTimeout(() => done('回复完成'), 3000);
  };
  ta.addEventListener('input', () => { fit(); sync(); });
  ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); go(); } });
  send.addEventListener('click', go);
  root.querySelector('.att').addEventListener('click', () => {
    if (files.children.length >= 2) return;
    const name = ['需求说明.pdf', '截图.png'][n++ % 2], c = document.createElement('span'); c.className = 'fc';
    c.innerHTML = '<span class="spin"></span>' + name + ' <span class="muted">解析中</span><button class="x" aria-label="移除 ' + name + '">×</button>';
    files.append(c);
    setTimeout(() => { const s = c.querySelector('.spin'); if (s) { s.outerHTML = '<span class="ok" aria-hidden="true">✓</span>'; c.querySelector('.muted').textContent = '已就绪'; } }, 1200);
    c.querySelector('.x').addEventListener('click', () => { c.remove(); ta.focus(); });
  });
}
</script>
