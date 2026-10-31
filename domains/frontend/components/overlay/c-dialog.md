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

- 用组件库的对话框：Element Plus el-dialog（v-model、title、width、align-center、destroy-on-close、close-on-click-modal），Naive UI n-modal preset="card"（v-model:show、title、style 定宽、mask-closable、close-on-esc），Ant Design Vue a-modal（v-model:open、title、width、centered、maskClosable、destroyOnClose）；遮罩、焦点锁定、Esc、滚动锁定、动画都由组件负责，不自己写
- 宽度三档，项目内固定：小 400px（确认、少量字段）、常规 560px、大 720px，写进 width 或 style；窄屏含表单的改全屏（Element Plus fullscreen，另两家 width="100%"）或换「底部面板」
- 标题写动作“重命名项目”，主按钮写结果“保存”；底部按钮右对齐、主按钮在最右、间距 8px：Element Plus 和 Naive UI 用 footer 插槽自己放，Ant Design Vue 用 okText / cancelText / confirmLoading，要改布局再用 footer 插槽
- 含输入的点遮罩不关闭：close-on-click-modal / mask-closable / maskClosable 设 false；纯展示的保留默认；有未保存内容时在 before-close、on-mask-click / on-esc、@cancel 里先问一句或保留草稿
- 表单对话框要开 destroy-on-close（Element Plus、Ant Design Vue destroyOnClose）；Naive UI 默认 display-directive="if"，关了就销毁；不开的话第二次打开还是上次填的内容和报错
- Element Plus 的 el-dialog 默认渲染在原地，嵌在表格、带 overflow 的容器或另一个浮层里时开 append-to-body，不然会被裁掉或压在下面；Naive UI 和 Ant Design Vue 默认挂在 body
- 打开后焦点进第一个输入框：Naive UI auto-focus 默认开，Element Plus 在 @opened 里 focus，Ant Design Vue 在打开后 nextTick 里 focus；提交中主按钮加载并防重复，失败在框内显示错误并保留输入
- 正文过长时让正文区滚动、头尾固定，不要整个对话框滚出视口

## 提示词

为{触发操作}做「对话框」：用项目组件库自带的对话框（Element Plus el-dialog；Naive UI n-modal preset="card"；Ant Design Vue a-modal），不手写遮罩和面板。宽 {400 / 560 / 720}px；标题写动作“{重命名项目}”，底部按钮右对齐、主按钮在最右写结果“{保存}”；含输入时点遮罩不关闭（close-on-click-modal / mask-closable / maskClosable 设 false），纯展示的可以关；开 destroy-on-close（Naive UI 保留默认的 display-directive="if"），每次打开都是初始值；Element Plus 嵌在表格或滚动容器里时开 append-to-body；打开后焦点进第一个输入框（Naive UI auto-focus 默认开，另两家在打开后手动 focus）；提交中主按钮加载并防重复，失败在框内显示错误并保留输入；正文过长时正文区滚动、头尾固定；窄屏含表单的改全屏（Element Plus fullscreen）或换「底部面板」。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.pg{display:flex;align-items:center;gap:8px;padding:12px 16px;background:#fff;border:1px solid #e3e6eb;border-radius:10px}
.name{font-size:14px;margin-right:8px}
.mask{padding:8px}
.dlg{width:min(400px,100%)}
.hd{display:flex;align-items:center;gap:8px;padding:12px 12px 4px 20px}
h3{flex:1;font-size:16px}
.bd{padding:4px 20px 0}
input{width:100%;height:36px;padding:0 12px;border:1px solid #e3e6eb;border-radius:8px;font-size:14px}
input:focus{outline:none;border-color:#3b5bdb;box-shadow:0 0 0 3px #edf1ff}
input[aria-invalid="true"]{border-color:#d92d20}
.err{margin-top:4px;font-size:12px;color:#d92d20}
.ft{display:flex;justify-content:flex-end;gap:8px;padding:12px 20px 16px}
</style>

<div class="s"><div class="pg"><span class="muted">当前项目</span><b class="name">年度预算</b><button class="b open">重命名</button></div><div class="mask" role="dialog" aria-modal="true" aria-labelledby="dt"><form class="panel dlg" novalidate><div class="hd"><h3 id="dt">重命名项目</h3><button type="button" class="x" aria-label="关闭" data-close>×</button></div><div class="bd"><input aria-label="项目名称" maxlength="20" aria-describedby="de"><p class="err" id="de" hidden>名称不能为空</p></div><div class="ft"><button type="button" class="b" data-close>取消</button><button class="b p">保存</button></div></form></div></div>

<script type="module">
import { modal } from '../../_shared/components-overlay.ts';

export default function demo(root) {
  const f = root.querySelector('form'), inp = f.querySelector('input'), err = f.querySelector('.err'), name = root.querySelector('.name'), btn = root.querySelector('.open'), mk = root.querySelector('.mask');
  const bad = (on) => { err.hidden = !on; on ? inp.setAttribute('aria-invalid', 'true') : inp.removeAttribute('aria-invalid'); };
  const m = modal(root, mk, { first: 'input', onClose: () => bad(false) }); // 含输入：点遮罩不关闭
  btn.addEventListener('click', () => { inp.value = name.textContent; m.open(btn); inp.select(); });
  f.addEventListener('submit', (e) => { e.preventDefault(); const v = inp.value.trim(); if (!v) { bad(true); inp.focus(); return; } name.textContent = v; m.close(); });
  // 挂载即打开，不抢焦点；关掉后用“重命名”再打开
  inp.value = name.textContent; mk.setAttribute('data-open', ''); [...mk.parentNode.children].forEach((n) => { if (n !== mk) n.inert = true; });
}
</script>
