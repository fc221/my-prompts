---
zh: 单栏对话
en: Single-column chat
order: 10
of: l-ai-page
---

## 是什么

居中一列消息流，底部输入框随内容增高并常驻。

## 适合

通用助手、客服机器人、问答类产品的主界面。

## 不适合

需要来回切换历史会话时用会话列表 + 对话；回答里常有大段代码或文档时用对话 + 产物分栏。

## 要点

- 消息列最大宽度 720–768px 居中；用户消息靠右带浅底，回答靠左不加气泡、按正文排版
- 输入框吸底，随内容增高，到 8–10 行后内部滚动；Enter 发送、Shift+Enter 换行，处理输入法组字
- 等待首字时显示三个点；流式输出只让新增片段渐显
- 贴底时自动跟随；用户上翻立即停止跟随，并显示“回到最新”按钮
- 停止生成后保留已输出内容；每条回答下方有复制、重试
- 空会话显示 3–4 个示例问题，点击直接填入输入框
- 窄屏消息列占满，左右内边距 16px，输入框留出底部安全区

## 提示词

{产品}AI 对话用「单栏对话」：消息列最大宽度 740px 居中，用户消息靠右带浅色底，回答靠左按正文排版；输入框吸底、随内容增高到 8 行后内部滚动，Enter 发送、Shift+Enter 换行，处理输入法组字；等待首字显示三个点，流式只渐显新增片段；贴底时跟随，上翻停止跟随并出现“回到最新”；停止生成后保留已输出内容；空会话给 3–4 个示例问题。

## 示意图

```js
export const wire = {
  cols: '16% 1fr 16%',
  rows: 'auto auto auto auto 1fr auto',
  areas: ['top top top', '. m1 .', '. m2 .', '. m3 .', '. . .', '. inp .'],
  boxes: {
    top: '顶栏 · 模型',
    m1: { inner: { cols: '45% 1fr', rows: 'auto', areas: ['. u'], boxes: { u: '提问' } } },
    m2: { label: '回答（流式）', acc: true },
    m3: { inner: { cols: '45% 1fr', rows: 'auto', areas: ['. u'], boxes: { u: '追问' } } },
    inp: '输入框（自动增高）',
  },
};
export const wireMobile = {
  cols: '1fr',
  rows: 'auto auto auto auto 1fr auto',
  areas: ['top', 'm1', 'm2', 'm3', '.', 'inp'],
  boxes: {
    top: { label: '标题', kind: 'mtop', text: '新对话' },
    m1: { inner: { cols: '25% 1fr', rows: 'auto', areas: ['. u'], boxes: { u: '提问' } } },
    m2: { label: '回答', acc: true },
    m3: { inner: { cols: '25% 1fr', rows: 'auto', areas: ['. u'], boxes: { u: '追问' } } },
    inp: '输入框',
  },
};
```
