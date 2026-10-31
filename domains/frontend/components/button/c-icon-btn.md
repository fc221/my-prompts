---
zh: 图标按钮
en: Icon button
order: 20
---

## 是什么

只有图标的正方形按钮，靠可访问名称和同名提示说明用途。

## 适合

工具栏、表格行尾、卡片右上角这类空间紧、图标含义约定俗成的位置：编辑、复制、刷新、更多。

## 不适合

含义不直观或有风险的操作（删除、发布）不要只放图标，改用带文字的按钮；一排超过 5 个时把低频的收进“更多”。

## 要点

- 正方形，边长等于控件高度（32px，紧凑 28px，触屏 44px），图标 16–20px 居中
- 必须有 aria-label，并配同名提示：悬停约 500ms 或键盘聚焦时出现，Esc 可关闭
- 工具栏里默认无边框、次要文字色，悬停出现浅灰底；放在有边框的容器里不再给按钮加边框
- 切换类（加粗、收藏、置顶）用 aria-pressed 表示状态，按下时主色图标 + 浅主色底
- 同一组用同一套线性图标、同一线宽，不用 emoji 当图标
- 危险操作不做成纯图标按钮；视觉尺寸小于 44px 的触屏按钮用伪元素把点击区扩到 44px

## 提示词

给{编辑器工具栏}做一组图标按钮：每个 32×32px（触屏 44×44px），16px 线性图标、次要文字色，默认无边框，悬停浅灰底，聚焦显示 2px 焦点环；每个按钮有 aria-label 和同名提示（悬停 500ms 或键盘聚焦出现，Esc 关闭）；加粗、斜体这类切换按钮用 aria-pressed，按下时主色图标加浅主色底；删除等危险操作改用带文字的按钮；窄屏超过 4 个时其余收进“更多”菜单。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{position:relative;display:flex;flex-direction:column;align-items:center;gap:44px}
.bar{display:flex;align-items:center;gap:4px;padding:4px;background:#fff;border:1px solid #e3e6eb;border-radius:8px}
.ib{display:inline-grid;place-items:center;width:32px;height:32px;padding:0;border:0;border-radius:6px;background:none;color:#5b616e;cursor:pointer;font-size:16px}
.ib:hover{background:#f5f6f8;color:#1f2329}
.ib[aria-pressed=true]{background:#edf1ff;color:#3b5bdb}
.ib i{font-family:Georgia,serif}
.ib b{font-weight:700}
.sep{width:1px;height:20px;margin:0 4px;background:#e3e6eb}
.tip{position:absolute;padding:6px 8px;border-radius:6px;background:#1f2329;color:#fff;font-size:12px;line-height:20px;white-space:nowrap;transform:translateX(-50%);pointer-events:none}
</style>

<div class="s"><div class="w"><div class="bar" role="group" aria-label="文本格式"><button class="ib" type="button" aria-label="加粗" aria-pressed="false"><b>B</b></button><button class="ib" type="button" aria-label="斜体" aria-pressed="true"><i>I</i></button><span class="sep"></span><button class="ib" type="button" aria-label="插入链接"><svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 9.5l3-3M7.5 4.5l.8-.8a2.5 2.5 0 0 1 3.5 3.5l-.8.8M8.5 11.5l-.8.8a2.5 2.5 0 0 1-3.5-3.5l.8-.8"/></svg></button><button class="ib" type="button" aria-label="复制格式"><svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5"/><path d="M10.5 5.5V4A1.5 1.5 0 0 0 9 2.5H4A1.5 1.5 0 0 0 2.5 4v5A1.5 1.5 0 0 0 4 10.5h1.5"/></svg></button><button class="ib" type="button" aria-label="更多操作">⋯</button></div><div class="tip" role="tooltip" hidden></div><p class="help">悬停或用 Tab 聚焦看提示；B、I 可切换</p></div></div>

<script type="module">
export default function demo(root) {
  const w = root.querySelector('.w'), tip = root.querySelector('.tip'); let t;
  const show = (b) => { tip.textContent = b.getAttribute('aria-label'); const r = b.getBoundingClientRect(), o = w.getBoundingClientRect(); tip.style.left = r.left - o.left + r.width / 2 + 'px'; tip.style.top = r.bottom - o.top + 6 + 'px'; tip.hidden = false; };
  const hide = () => { clearTimeout(t); tip.hidden = true; };
  root.querySelectorAll('.ib').forEach((b) => {
    b.addEventListener('pointerenter', () => { clearTimeout(t); t = setTimeout(() => show(b), 500); });
    b.addEventListener('pointerleave', hide);
    b.addEventListener('focus', () => { if (b.matches(':focus-visible')) show(b); });
    b.addEventListener('blur', hide);
    b.addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(); });
    if (b.hasAttribute('aria-pressed')) b.addEventListener('click', () => b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true')));
  });
}
</script>
