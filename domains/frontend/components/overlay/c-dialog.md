---
zh: 对话框
en: Dialog / Modal
order: 10
---

## 是什么

页面中央弹出的卡片，背后压暗，处理完才能回到页面。

## 适合

短时、集中完成的单一任务：改名、填几项字段、看一段说明。

## 不适合

操作结果用轻提示，不用对话框；在列表里查看或编辑一项用抽屉；长表单和多步骤用独立页面；不叠多层对话框。

## 要点

- 宽度三档：小 400px（确认、少量字段）、常规 560px、大 720px，项目内固定，受视口约束
- 头部内边距 20px 24px，标题 16–18px / 600，关闭按钮点击区 32px（触屏 44px）且与标题垂直居中
- 底部按钮右对齐、主按钮在最右、间距 8px；正文过长时内部滚动，头尾固定
- 打开时焦点进入框内并在框内循环，背景不可交互；关闭后焦点回到触发按钮
- Esc 关闭；含输入的点遮罩不关闭，纯展示的可以；有未保存内容先提示或保留草稿
- 遮罩淡入 + 面板从 0.96 放大，约 240ms，退出更快；窄屏简短内容宽 min(320px, 100% - 48px)，含表单的改全屏或底部面板

## 提示词

为{触发操作}做「对话框」：宽 {400 / 560 / 720}px（受视口约束），头部内边距 20px 24px、标题 16px/600、关闭按钮点击区 32px；底部按钮右对齐、主按钮在最右；正文过长时内部滚动、头尾固定；打开时遮罩淡入、面板从 0.96 放大 240ms，焦点进入第一个输入框并在框内循环，背景不可交互；Esc 关闭，含输入时点遮罩不关闭；关闭后焦点回到触发按钮；提交失败在框内显示错误并保留输入；窄屏含表单的改全屏。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.pg{display:flex;align-items:center;gap:10px;padding:14px 16px;background:#fff;border:1px solid #e3e6eb;border-radius:10px}
.name{font-size:15px;margin-right:8px}
.mask{padding:8px}
.dlg{width:min(400px,100%)}
.hd{display:flex;align-items:center;gap:8px;padding:12px 12px 2px 20px}
h3{flex:1;font-size:16px}
.bd{padding:6px 20px 0}
input{width:100%;height:36px;padding:0 10px;border:1px solid #e3e6eb;border-radius:8px;font-size:14px}
input:focus{outline:none;border-color:#3b5bdb;box-shadow:0 0 0 3px #edf1ff}
input[aria-invalid="true"]{border-color:#d92d20}
.err{margin-top:4px;font-size:12px;color:#d92d20}
.ft{display:flex;justify-content:flex-end;gap:8px;padding:14px 20px 16px}
</style>

<div class="s"><div class="pg"><span class="muted">当前项目</span><b class="name">年度预算</b><button class="b open">重命名</button></div><div class="mask" role="dialog" aria-modal="true" aria-labelledby="dt"><form class="panel dlg" novalidate><div class="hd"><h3 id="dt">重命名项目</h3><button type="button" class="x" aria-label="关闭" data-close>×</button></div><div class="bd"><input aria-label="项目名称" maxlength="20" aria-describedby="de"><p class="err" id="de" hidden>名称不能为空</p></div><div class="ft"><button type="button" class="b" data-close>取消</button><button class="b p">保存</button></div></form></div></div>

<script type="module">
import { modal } from '../../_shared/components-overlay.ts';

export default function demo(root) {
  const f = root.querySelector('form'), inp = f.querySelector('input'), err = f.querySelector('.err'), name = root.querySelector('.name'), btn = root.querySelector('.open');
  const bad = (on) => { err.hidden = !on; on ? inp.setAttribute('aria-invalid', 'true') : inp.removeAttribute('aria-invalid'); };
  const m = modal(root, root.querySelector('.mask'), { first: 'input', onClose: () => bad(false) }); // 含输入：点遮罩不关闭
  btn.addEventListener('click', () => { inp.value = name.textContent; m.open(btn); inp.select(); });
  f.addEventListener('submit', (e) => { e.preventDefault(); const v = inp.value.trim(); if (!v) { bad(true); inp.focus(); return; } name.textContent = v; m.close(); });
}
</script>
