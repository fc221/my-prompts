---
zh: 代码块与可复制字段
en: Code block & copy field
order: 120
---

## 是什么

等宽字体显示代码或密钥，旁边有复制按钮，复制后短暂显示“已复制”。

## 适合

接入文档里的代码示例、API Key、Webhook 地址、订单号、邀请链接。

## 不适合

不要把大段说明文字放进代码块；密钥不要明文常驻，默认打码；复制按钮不能代替选中文字，文字本身仍要能手动选中。

## 要点

- 代码块等宽字体 13–14px、行高 22px，内边距 12–16px，浅灰底或深色底全站二选一；长行横向滚动，不自动换行（或给换行开关）
- 复制按钮在右上角，图标 + “复制”或带 aria-label 的图标按钮；成功后 1.5–2s 显示“已复制 ✓”再恢复，并用 role="status" 播报
- 按钮预留最小宽度，切换文案时不挤动旁边的内容
- 复制失败（没有剪贴板权限）时自动选中文字并提示手动复制
- 可复制字段：只读样式 + 右侧复制按钮，同高 32px；值过长时省略显示，但复制完整值
- 密钥默认打码只露前后 4 位，“显示”需要确认身份或只在创建时展示一次；不写进 URL、日志和埋点

## 提示词

在{接入指南页}放代码块和密钥字段：代码块浅灰底、等宽 13px、行高 22px、内边距 16px，长行横向滚动；右上角“复制”按钮，成功后 2 秒内显示“已复制 ✓”并用 role="status" 播报，失败时自动选中文字并提示手动复制；上方用标签页切换{cURL / Python / Node}并记住选择；API Key 字段为只读样式，默认打码只露前后 4 位，右侧“显示”“复制”按钮同高 32px，复制的是完整值；窄屏代码块在自身容器内横向滚动。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.s{background:#fff}
.w{width:100%;max-width:420px;display:flex;flex-direction:column;gap:8px}
.kf{display:flex;flex-direction:column;gap:8px}
.row{display:flex;gap:8px}
.key{flex:1;min-width:0;display:block;height:32px;padding:0 12px;border:1px solid #e3e6eb;border-radius:6px;background:#f5f6f8;font:13px/30px ui-monospace,Menlo,Consolas,monospace;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sm{padding:0 12px}
.cpy{min-width:80px}
.cpy.ok{color:#12805c;border-color:#12805c}
.cb{border:1px solid #e3e6eb;border-radius:8px;background:#f5f6f8;overflow:hidden}
.ch{display:flex;align-items:center;justify-content:space-between;height:28px;padding:0 2px 0 12px;border-bottom:1px solid #e3e6eb;font-size:12px;color:#5b616e}
.t.cpy{min-width:72px;height:24px;padding:0 8px;border:0;border-radius:4px;background:none;color:#3b5bdb;font-size:12px;cursor:pointer}
.t.cpy:hover{background:#e3e6eb}
.t.cpy.ok{color:#12805c}
pre{margin:0;padding:6px 12px;overflow-x:auto;font:13px/22px ui-monospace,Menlo,Consolas,monospace}
</style>

<div class="s"><div class="w"><div class="kf"><span class="lab" id="kl">API Key</span><div class="row"><code class="key" aria-labelledby="kl"></code><button type="button" class="btn sm" data-a="show" aria-pressed="false">显示</button><button type="button" class="btn sm cpy" data-a="key">复制</button></div></div><div class="cb"><div class="ch"><span>cURL</span><button type="button" class="t cpy" data-a="code">复制</button></div><pre><code>curl "$BASE_URL/v1/chat" \
  -H "Authorization: Bearer $API_KEY"</code></pre></div><p class="sr" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const FULL = 'sk-4f9a1d7e8b2c6a03c21b', key = root.querySelector('.key'), st = root.querySelector('[role=status]'), show = root.querySelector('[data-a=show]');
  const mask = () => { const on = show.getAttribute('aria-pressed') === 'true'; key.textContent = on ? FULL : FULL.slice(0, 7) + '••••••••' + FULL.slice(-4); };
  show.addEventListener('click', () => { show.setAttribute('aria-pressed', String(show.getAttribute('aria-pressed') !== 'true')); show.textContent = show.getAttribute('aria-pressed') === 'true' ? '隐藏' : '显示'; mask(); });
  root.querySelectorAll('.cpy').forEach((b) => b.addEventListener('click', async () => {
    const isKey = b.dataset.a === 'key', text = isKey ? FULL : root.querySelector('pre code').textContent; let ok = true;
    try { await navigator.clipboard.writeText(text); } catch { ok = false; if (isKey) { show.setAttribute('aria-pressed', 'true'); show.textContent = '隐藏'; mask(); } getSelection().selectAllChildren(isKey ? key : root.querySelector('pre code')); }
    b.textContent = ok ? '已复制 ✓' : '复制失败'; b.classList.toggle('ok', ok); st.textContent = ok ? '已复制到剪贴板' : '已选中文字，请按 ⌘C 复制';
    setTimeout(() => { b.textContent = '复制'; b.classList.remove('ok'); }, 1800);
  }));
  mask();
}
</script>
