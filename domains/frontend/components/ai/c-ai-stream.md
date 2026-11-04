---
zh: 流式回复消息
en: Streaming message
order: 20
---

## 是什么

AI 的回答一段段地出现，下方有停止、重新生成和复制按钮。

## 适合

大模型对话、写作助手、Agent 的文字输出。

## 不适合

很短的结果（分类标签、是否）直接整段显示；不要给已经显示的文字重复做动画。

## 要点

- 组件库没有现成的流式消息，自己做；零件用组件库的：停止、重新生成、复制用 el-button text / n-button text / a-button type="text"，“已停止”标记用 el-tag / n-tag / a-tag；等待首字的三个圆点见「三点跳动（正在输入）」
- 首字到达前在回复位置显示三点跳动，首字到达立即替换；按词或片段批量追加，只有新片段淡入，已显示的文字不重播
- 生成中只显示“停止”；停止后保留已生成内容并标“已停止”，之后才出现“重新生成”和“复制”；三个按钮不同时出现
- 复制成功后按钮短暂变“已复制”，1.5 至 2 秒后恢复，不另弹轻提示
- 只在用户贴底（距底 24px 内）时自动跟随；上滑后停止跟随，底部出现“回到最新”，点了再贴底
- 读屏不逐字播报，完成后提示一次

## 提示词

为{AI 回复}做流式回复消息，组件库没有现成的，自己做，按钮和标签用项目组件库的（停止 / 重新生成 / 复制用 el-button text、n-button text、a-button type="text"，“已停止”用 tag）：等待首字时在回复位置显示三点跳动，首字到达立即替换；按片段追加文字，只有新片段淡入，已显示文字不重播；生成中只显示“停止”，停止后保留已生成内容并标“已停止”，随后出现“重新生成”和“复制”（成功时按钮短暂变“已复制”）；用户贴底时自动跟随，上滑后停止跟随并显示“回到最新”；读屏不逐字播报，完成后提示一次。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{padding:12px}
.chat{width:100%;max-width:560px;height:100%;overflow-y:auto;overscroll-behavior:contain;display:flex;flex-direction:column;gap:10px}
.me{align-self:flex-end;max-width:80%;padding:7px 12px;border-radius:12px 12px 4px 12px;background:#edf1ff;font-size:13px}
.ai{display:grid;gap:8px;justify-items:start}
.txt{min-height:24px;font-size:14px;line-height:1.7}
.nw{animation:fade .15s cubic-bezier(0,0,.2,1)}
.dots{display:inline-flex;gap:5px;padding:9px 0}
.dots i{width:7px;height:7px;border-radius:50%;background:#8a909c;animation:dot 1.2s ease-in-out infinite}
.dots i:nth-child(2){animation-delay:.15s}
.dots i:nth-child(3){animation-delay:.3s}
@keyframes dot{0%,60%,100%{transform:none;opacity:.5}
30%{transform:translateY(-4px);opacity:1}
}
.ops{display:flex;gap:6px}
.tag{margin-left:6px;font-size:12px;color:#5b616e}
@media (prefers-reduced-motion:reduce){.nw{animation:none}
.dots i{animation:none;opacity:.6}
}
</style>

<div class="s"><div class="chat"><div class="me">帮我写一句新品发布会的开场白</div><div class="ai"><div class="txt"></div><div class="ops"><button class="b sm stop"><svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2" fill="currentColor"/></svg>停止</button><button class="b sm re" hidden>重新生成</button><button class="b sm cp" hidden>复制</button></div></div></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const T = '各位来宾，欢迎来到今天的发布会。过去一年，我们把三万条用户反馈，做成了一件更轻、更快、也更懂你的产品。';
  const chat = root.querySelector('.chat'), txt = root.querySelector('.txt'), stop = root.querySelector('.stop'), re = root.querySelector('.re'), cp = root.querySelector('.cp'), sr = root.querySelector('.sr');
  let pos = 0, gen = 0, live = false;
  const fin = (stopped) => { live = false; txt.textContent = T.slice(0, pos); if (stopped) txt.insertAdjacentHTML('beforeend', '<span class="tag">已停止</span>'); stop.hidden = true; re.hidden = cp.hidden = false; sr.textContent = stopped ? '已停止生成' : '回复完成'; };
  const step = (id) => {
    if (id !== gen || !live || !root.host.isConnected) return;
    const near = chat.scrollHeight - chat.scrollTop - chat.clientHeight < 24; // 只在贴底时跟随
    const k = 2 + Math.floor(Math.random() * 3), s = document.createElement('span');
    if (!pos) txt.textContent = '';
    s.className = 'nw'; s.textContent = T.slice(pos, pos + k); pos = Math.min(T.length, pos + k); txt.append(s);
    if (near) chat.scrollTop = chat.scrollHeight;
    pos >= T.length ? fin(false) : setTimeout(() => step(id), 80);
  };
  const start = () => { pos = 0; live = true; const id = ++gen; txt.innerHTML = '<span class="dots" role="img" aria-label="正在生成"><i></i><i></i><i></i></span>'; stop.hidden = false; re.hidden = cp.hidden = true; sr.textContent = ''; setTimeout(() => step(id), 900); };
  stop.addEventListener('click', () => { if (live) fin(true); re.focus(); });
  re.addEventListener('click', start);
  cp.addEventListener('click', async () => { try { await navigator.clipboard.writeText(T.slice(0, pos)); cp.textContent = '已复制 ✓'; } catch { cp.textContent = '复制失败'; } setTimeout(() => (cp.textContent = '复制'), 1600); });
  start();
}
</script>
