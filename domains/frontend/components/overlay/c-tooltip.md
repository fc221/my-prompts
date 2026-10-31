---
zh: 文字提示
en: Tooltip
order: 60
---

## 是什么

鼠标悬停或键盘聚焦时，元素旁边冒出的一小段深色说明文字。

## 适合

纯图标按钮的名称和快捷键、被截断文字的全文、术语的一句解释。

## 不适合

关键说明直接写在界面上；不放链接、按钮和表单（用浮层卡片）；触屏没有悬停，重要信息不能只放在提示里。

## 要点

- 只挂在可聚焦元素上；悬停约 500ms 后出现，键盘聚焦时立即出现；移开约 100ms 后消失，同组之间移动时即时切换
- 深色底白字 12–13px，圆角 6px，最宽 280px、最多 2 行，带 6px 箭头
- 鼠标可以移进提示本身而不消失；Esc 可关闭
- 图标按钮用 aria-labelledby 指向提示（提示就是名称），补充说明用 aria-describedby
- 默认在上方，空间不够时自动翻到下方；淡入约 160ms

## 提示词

给{纯图标按钮 / 被截断的文字}加「文字提示」：悬停 500ms 后或键盘聚焦时立即出现，离开 100ms 后消失，鼠标可以移进提示里；深色底白字 12px，圆角 6px，最宽 280px、最多 2 行，带 6px 箭头，默认在上方、空间不够翻到下方；Esc 关闭；图标按钮用 aria-labelledby 指向提示，补充说明用 aria-describedby；提示里不放链接和按钮；触屏没有悬停，关键信息直接写在界面上。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.wrap{display:grid;justify-items:center;gap:14px;padding-top:28px}
.tb{display:flex;gap:2px;padding:4px;background:#fff;border:1px solid #e3e6eb;border-radius:10px}
.tw{position:relative}
.ic{width:36px;height:36px;border:0;border-radius:6px;background:none;font:15px Georgia,serif;display:grid;place-items:center}
.ic:hover{background:#f0f2f5}
.tip{position:absolute;bottom:calc(100% + 8px);left:50%;z-index:2;max-width:280px;padding:4px 8px;border-radius:6px;background:#1f2329;color:#fff;font-size:12px;line-height:1.5;white-space:nowrap;opacity:0;visibility:hidden;transform:translate(-50%,4px);transition:opacity .1s,transform .1s,visibility 0s .1s}
.tip::after{content:"";position:absolute;top:100%;left:50%;margin-left:-5px;border:5px solid transparent;border-top-color:#1f2329}
.on .tip{opacity:1;visibility:visible;transform:translate(-50%,0);transition:opacity .16s,transform .16s}
@media (prefers-reduced-motion:reduce){.tip{transform:translate(-50%,0)!important}
}
</style>

<div class="s"><div class="wrap"><div class="tb" role="toolbar" aria-label="文字格式"><span class="tw"><button class="ic" aria-labelledby="tp1" aria-keyshortcuts="Meta+B"><b>B</b></button><span class="tip" role="tooltip" id="tp1">加粗 ⌘B</span></span><span class="tw"><button class="ic" aria-labelledby="tp2" aria-keyshortcuts="Meta+I"><i>I</i></button><span class="tip" role="tooltip" id="tp2">斜体 ⌘I</span></span><span class="tw"><button class="ic" aria-labelledby="tp3"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1"/><path d="M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/></svg></button><span class="tip" role="tooltip" id="tp3">插入链接</span></span><span class="tw"><button class="ic" aria-labelledby="tp4"><s>S</s></button><span class="tip" role="tooltip" id="tp4">删除线</span></span></div><p class="muted">悬停约 0.5 秒，或按 Tab 聚焦</p></div></div>

<script type="module">
export default function demo(root) {
  let t; const show = (w) => root.querySelectorAll('.tw').forEach((x) => x.classList.toggle('on', x === w));
  root.querySelectorAll('.tw').forEach((w) => {
    const b = w.querySelector('button');
    w.addEventListener('pointerenter', () => { clearTimeout(t); t = setTimeout(() => show(w), root.querySelector('.tw.on') ? 0 : 500); });
    w.addEventListener('pointerleave', () => { clearTimeout(t); t = setTimeout(() => show(null), 100); });
    b.addEventListener('focus', () => { if (b.matches(':focus-visible')) show(w); });
    b.addEventListener('blur', () => show(null));
  });
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && root.querySelector('.tw.on')) { e.preventDefault(); e.stopPropagation(); show(null); } });
}
</script>
