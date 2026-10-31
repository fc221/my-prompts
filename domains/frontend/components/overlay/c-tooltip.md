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

- 用组件库的文字提示：Element Plus el-tooltip（content、placement、show-after、hide-after、enterable、disabled），Naive UI n-tooltip（placement、delay、duration、keep-alive-on-hover，文字放默认插槽、元素放 trigger 插槽），Ant Design Vue a-tooltip（title、placement、mouseEnterDelay、mouseLeaveDelay、arrow）；深色样式、箭头、贴边翻转、鼠标移进提示不消失都由组件负责
- 出现延迟约 500ms，离开后约 100ms 消失：Element Plus show-after 和 hide-after 是毫秒，Naive UI delay 和 duration 是毫秒，Ant Design Vue mouseEnterDelay / mouseLeaveDelay 是秒，写 0.5 不是 500
- 只挂在可聚焦元素上；三家默认只在悬停时出现，键盘聚焦不一定显示，所以图标按钮自己写 aria-label，别把名称只放在提示里；提示只是补充说明
- 禁用按钮收不到鼠标事件，提示不会出现：外面包一层 span 再挂提示，Ant Design Vue 的文档专门提醒了这一点
- 文字最多 2 行、最宽 280px，不放链接和按钮；更长的说明写在界面上或用「浮层卡片」
- 一组图标按钮各自一个提示，不要把整条工具栏包进一个提示里
- 触屏没有悬停，关键信息直接写在界面上，提示只当锦上添花

## 提示词

给{纯图标按钮 / 被截断的文字}加「文字提示」：用项目组件库自带的文字提示（Element Plus el-tooltip content placement="top" :show-after="500"；Naive UI n-tooltip :delay="500"，文字放默认插槽、元素放 trigger 插槽；Ant Design Vue a-tooltip title :mouse-enter-delay="0.5"，单位是秒），不手写气泡。悬停 500ms 后出现、离开 100ms 后消失，样式用组件默认的深色；图标按钮自己写 aria-label“{加粗}”，提示写“{加粗 ⌘B}”，不把名称只放在提示里；禁用按钮外面包一层 span 再挂提示；文字最多 2 行、不放链接和按钮，更长的说明写在界面上或用「浮层卡片」；触屏没有悬停，关键信息直接写在界面上。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.wrap{display:grid;justify-items:center;gap:16px;padding-top:28px}
.tb{display:flex;gap:2px;padding:4px;background:#fff;border:1px solid #e3e6eb;border-radius:10px}
.tw{position:relative}
.ic{width:36px;height:36px;border:0;border-radius:6px;background:none;font:16px Georgia,serif;display:grid;place-items:center}
.ic:hover{background:#f0f2f5}
.tip{position:absolute;bottom:calc(100% + 8px);left:50%;z-index:2;max-width:280px;padding:4px 8px;border-radius:6px;background:#1f2329;color:#fff;font-size:12px;line-height:1.5;white-space:nowrap;opacity:0;visibility:hidden;transform:translate(-50%,4px);transition:opacity .1s,transform .1s,visibility 0s .1s}
.tip::after{content:"";position:absolute;top:100%;left:50%;margin-left:-5px;border:5px solid transparent;border-top-color:#1f2329}
.on .tip{opacity:1;visibility:visible;transform:translate(-50%,0);transition:opacity .16s,transform .16s}
@media (prefers-reduced-motion:reduce){.tip{transform:translate(-50%,0)!important}
}
</style>

<div class="s"><div class="wrap"><div class="tb" role="toolbar" aria-label="文字格式"><span class="tw on"><button class="ic" aria-label="加粗" aria-keyshortcuts="Meta+B"><b>B</b></button><span class="tip" role="tooltip">加粗 ⌘B</span></span><span class="tw"><button class="ic" aria-label="斜体" aria-keyshortcuts="Meta+I"><i>I</i></button><span class="tip" role="tooltip">斜体 ⌘I</span></span><span class="tw"><button class="ic" aria-label="插入链接"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1"/><path d="M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1"/></svg></button><span class="tip" role="tooltip">插入链接</span></span><span class="tw"><button class="ic" aria-label="删除线"><s>S</s></button><span class="tip" role="tooltip">删除线</span></span></div><p class="muted">悬停约 0.5 秒，或按 Tab 聚焦</p></div></div>

<script type="module">
export default function demo(root) {
  // 挂载时第一个提示已经展开（class="on"），悬停到别的按钮或移开后按正常规则切换
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
