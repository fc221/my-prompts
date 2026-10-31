---
zh: 文本域
en: Textarea
order: 20
---

## 是什么

多行文字输入，随内容长高到上限后内部滚动，带字数计数。

## 适合

描述、备注、反馈意见、提示词等可能超过一行的文字。

## 不适合

一行能写完的用输入框；需要加粗、列表、图片时用富文本编辑器；多个联系人这类结构化内容拆成子项列表。

## 要点

- 最小高度约 3 行（72–80px），上下内边距 8px、左右 12px，行高 22px
- 随内容自动长高（field-sizing: content 或脚本兜底），到约 8–10 行后内部滚动
- 只开纵向拉伸（resize: vertical），不让用户把它拖得比容器还宽
- 有上限时在框下右侧显示计数，超出变危险色并提示，不截断已输入内容
- Enter 换行、不提交；只有聊天类输入才用 Enter 发送、Shift+Enter 换行，并处理输入法组字
- 边框、聚焦、错误、禁用样式与输入框同一套；窄屏宽度撑满、字号 16px

## 提示词

把{反馈表单的“问题描述”}做成文本域：标签在上方，最小 3 行（约 80px），随内容自动长高，最多 8 行后内部滚动，只允许纵向拉伸；上下内边距 8px、左右 12px；框下左侧写填写提示，右侧显示“{已输入} / 500”，超出变红并提示，不截断；Enter 只换行不提交；边框、聚焦、错误、禁用样式与输入框一致，提示和错误用 aria-describedby 关联；窄屏宽度撑满、字号 16px。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{width:100%;max-width:340px;display:flex;flex-direction:column;gap:8px}
.b{display:flex;flex-direction:column;gap:4px}
.ta{display:block;width:100%;height:auto;min-height:80px;max-height:100px;padding:8px 12px;line-height:22px;resize:vertical;field-sizing:content}
.meta{display:flex;justify-content:space-between;gap:12px}
.cnt{flex:none;font-variant-numeric:tabular-nums}
</style>

<div class="s"><div class="w"><label class="lab" for="t">问题描述</label><div class="b"><textarea class="inp ta" id="t" rows="3" placeholder="例如：导出报表时页面卡住，等了 1 分钟没有反应" aria-describedby="th"></textarea><div class="meta"><p class="help" id="th">写清操作步骤和看到的现象</p><span class="help cnt">0 / 80</span></div></div></div></div>

<script type="module">
export default function demo(root) {
  const t = root.querySelector('textarea'), c = root.querySelector('.cnt'), h = root.querySelector('#th'), tip = h.textContent;
  const fit = !CSS.supports('field-sizing', 'content');
  t.addEventListener('input', () => {
    if (fit) { t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight + 2, 100) + 'px'; }
    const n = [...t.value].length, over = n > 80;
    c.textContent = n + ' / 80'; c.classList.toggle('bad', over); h.classList.toggle('bad', over); t.classList.toggle('err', over); t.setAttribute('aria-invalid', String(over));
    h.textContent = over ? `超出 ${n - 80} 字，请精简` : tip;
  });
}
</script>
