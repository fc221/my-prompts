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

- 用组件库输入框的多行类型：Element Plus el-input type="textarea"（autosize="{ minRows: 3, maxRows: 8 }"、maxlength + show-word-limit、resize），Naive UI n-input type="textarea"（autosize="{ minRows: 3, maxRows: 8 }"、maxlength + show-count），Ant Design Vue a-textarea（autosize="{ minRows: 3, maxRows: 8 }"、maxlength + showCount）；行高、内边距用组件默认
- 自动长高要显式开 autosize 并给 maxRows，三家默认都是固定行数；到 maxRows 后内部滚动
- 拉伸只开纵向：Element Plus resize="vertical"；另两家没有属性，用 CSS 给内部 textarea 写 resize: vertical，不让用户拖得比容器还宽
- 字数：设了 maxlength 组件会直接截断；要“超出标红但不截断”就不设 maxlength，自己算字数并在校验里报错，两种选一种；计数用组件默认位置，填写提示走表单项的说明
- Enter 换行、不提交，组件默认如此；只有聊天类输入才改成 Enter 发送、Shift+Enter 换行，并跳过输入法组字中的回车（看 KeyboardEvent.isComposing），见「对话输入框」
- 边框、聚焦、错误、禁用和输入框同一套，不另写样式；窄屏撑满、字号 16px

## 提示词

把{反馈表单的“问题描述”}做成文本域：用项目组件库自带的多行输入（Element Plus el-input type="textarea"；Naive UI n-input type="textarea"；Ant Design Vue a-textarea），不手写。标签在上方；autosize 最少 3 行、最多 8 行，之后内部滚动；只允许纵向拉伸（resize="vertical" 或 CSS）；字数上限 {500}：{用 maxlength + show-word-limit / show-count / showCount 直接截断 / 不设 maxlength，超出标红并在校验里报错}；框下左侧的填写提示走表单项的说明；Enter 只换行不提交；样式和输入框一致；窄屏撑满、字号 16px。

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
