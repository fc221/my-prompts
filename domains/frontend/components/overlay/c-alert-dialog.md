---
zh: 确认对话框（危险操作）
en: Alert dialog
order: 20
---

## 是什么

删除等不可逆操作前弹出的确认框，写清删什么、删多少、能不能恢复。

## 适合

不可逆或影响大的操作：永久删除、批量清除、扣费、停用服务。

## 不适合

可恢复的低风险操作直接执行并给撤销；影响有限的局部操作用气泡确认；普通的成功提示不用它。

## 要点

- 用组件库的确认框：Element Plus ElMessageBox.confirm(message, title, { type: 'warning', confirmButtonText, cancelButtonText, confirmButtonType: 'danger' })，Naive UI useDialog().warning({ title, content, positiveText, negativeText, positiveButtonProps: { type: 'error' } })，Ant Design Vue Modal.confirm({ title, content, okText, cancelText, okType: 'danger' })；遮罩、焦点锁定、Esc、读屏角色由组件负责
- 标题写成问句“删除 3 个文件？”，正文说明影响范围、数量和能否恢复；按钮写具体动作“删除 3 个文件”，不写“确定 / 是”
- 列表里的删除入口用中性色，只有确认框里的确认键用危险色
- 初始焦点不落在危险键上：Ant Design Vue autoFocusButton: 'cancel'；Element Plus 的 autofocus 默认落在确认键，设 autofocus: false；Naive UI 的 autoFocus 默认落在第一个按钮，也就是“取消”
- Esc 和点遮罩都只取消，不确认，三家默认就是这样；不要为了逼人点按钮把 closeOnPressEscape / closeOnEsc / keyboard 关掉
- 执行中确认键加载并防重复：Ant Design Vue 的 onOk 返回 Promise，自动加载、resolve 后关闭；Naive UI 的 onPositiveClick 返回 Promise，配合 loading: true，resolve false 或 reject 时不关闭；Element Plus 在 beforeClose(action, instance, done) 里把 instance.confirmButtonLoading 设 true，成功后 done()；失败在框内说明，不关框
- 极高风险（注销账号、删除工作区）要求输入对象名称后才能确认：Element Plus 用 ElMessageBox.prompt 加 inputValidator、inputErrorMessage；Naive UI 和 Ant Design Vue 没有现成的，在 content 里放输入框，positiveButtonProps / okButtonProps 的 disabled 跟着输入变
- 窄屏仍居中（Ant Design Vue 加 centered: true），两个按钮并排、取消在左

## 提示词

在{删除 / 停用对象}前加确认框：用项目组件库自带的确认框（Element Plus ElMessageBox.confirm(message, title, { type: 'warning', confirmButtonType: 'danger', autofocus: false })；Naive UI useDialog().warning({ positiveButtonProps: { type: 'error' } })；Ant Design Vue Modal.confirm({ okType: 'danger', autoFocusButton: 'cancel' })），不手写对话框。标题写成问句“删除 N 个{对象}？”，正文说明影响范围、数量和能否恢复；按钮“取消”和“删除 N 个{对象}”，只有确认键用危险色，列表里的删除入口用中性色；Esc 和点遮罩都只取消；执行中确认键加载并防重复（Ant Design Vue onOk 返回 Promise；Naive UI onPositiveClick 返回 Promise 并设 loading；Element Plus 在 beforeClose 里设 confirmButtonLoading），失败在框内说明、不关框；极高风险操作要求输入“{对象名称}”后才能确认（Element Plus 用 ElMessageBox.prompt + inputValidator，另两家在 content 里放输入框并控制确认键 disabled）；窄屏仍居中，两个按钮并排、取消在左。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.pg{display:flex;align-items:center;gap:16px;width:min(320px,100%);padding:12px 16px;background:#fff;border:1px solid #e3e6eb;border-radius:10px}
.info{flex:1;display:grid}
.done{flex:1;font-size:13px;color:#12805c}
.dlg{width:min(400px,100%);padding:20px 20px 16px}
h3{font-size:16px;margin-bottom:4px}
#ad{font-size:13px;color:#5b616e}
.ft{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}
</style>

<div class="s"><div class="pg"><div class="info"><b>已选 3 个文件</b><span class="muted">季度报表.xlsx 等</span></div><button class="b open">删除</button><p class="done" hidden>已删除 3 个文件 <button class="b t sm reset">恢复示例</button></p></div><div class="mask" role="alertdialog" aria-modal="true" aria-labelledby="at" aria-describedby="ad"><div class="panel dlg"><h3 id="at">删除 3 个文件？</h3><p id="ad">文件会被永久删除，无法恢复；已分享的链接也会失效。</p><div class="ft"><button class="b" data-close>取消</button><button class="b d go">删除 3 个文件</button></div></div></div></div>

<script type="module">
import { modal } from '../../_shared/components-overlay.ts';

export default function demo(root) {
  const pg = root.querySelector('.pg'), open = root.querySelector('.open'), reset = root.querySelector('.reset'), mk = root.querySelector('.mask');
  const m = modal(root, mk, { first: '[data-close]', scrim: true }); // 初始焦点在“取消”，点遮罩只取消
  const show = (del) => { pg.querySelector('.info').hidden = del; open.hidden = del; pg.querySelector('.done').hidden = !del; };
  open.addEventListener('click', () => m.open(open));
  root.querySelector('.go').addEventListener('click', () => { m.close(); show(true); reset.focus(); });
  reset.addEventListener('click', () => { show(false); open.focus(); });
  // 挂载即打开，不抢焦点；取消后用列表里的“删除”再打开
  mk.setAttribute('data-open', ''); [...mk.parentNode.children].forEach((n) => { if (n !== mk) n.inert = true; });
}
</script>
