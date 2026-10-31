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

- 标题写成问句“删除 3 个文件？”，正文说明影响范围、数量和能否恢复
- 按钮写具体动作“删除 3 个文件”，不写“确定 / 是”；危险按钮用危险色实底放最右
- 初始焦点放在“取消”；Esc 和点遮罩都只取消，不确认
- role="alertdialog"，aria-labelledby 指向标题，aria-describedby 指向正文
- 极高风险（注销账号、删除工作区）要求输入对象名称后才能点确认
- 列表里的删除入口用中性色，只有确认框里的按钮用危险色；窄屏仍居中，两个按钮并排、取消在左

## 提示词

在{删除 / 停用对象}前加「确认对话框」：宽 400px，role="alertdialog"；标题写成问句“删除N个{对象}？”，正文说明影响范围、数量和能否恢复；按钮“取消”和“删除N个{对象}”，危险按钮用危险色实底放最右，初始焦点在“取消”；Esc 和点遮罩都只取消；执行中按钮显示加载并防重复，失败在框内说明；极高风险操作要求输入“{对象名称}”后才能确认；窄屏仍居中，宽 min(320px, 100% - 48px)，两个按钮并排。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.pg{display:flex;align-items:center;gap:16px;width:min(320px,100%);padding:14px 16px;background:#fff;border:1px solid #e3e6eb;border-radius:10px}
.info{flex:1;display:grid}
.done{flex:1;font-size:13px;color:#12805c}
.dlg{width:min(400px,100%);padding:20px 22px 16px}
h3{font-size:16px;margin-bottom:6px}
#ad{font-size:13px;color:#5b616e}
.ft{display:flex;justify-content:flex-end;gap:8px;margin-top:18px}
</style>

<div class="s"><div class="pg"><div class="info"><b>已选 3 个文件</b><span class="muted">季度报表.xlsx 等</span></div><button class="b open">删除</button><p class="done" hidden>已删除 3 个文件 <button class="b t sm reset">恢复示例</button></p></div><div class="mask" role="alertdialog" aria-modal="true" aria-labelledby="at" aria-describedby="ad"><div class="panel dlg"><h3 id="at">删除 3 个文件？</h3><p id="ad">文件会被永久删除，无法恢复；已分享的链接也会失效。</p><div class="ft"><button class="b" data-close>取消</button><button class="b d go">删除 3 个文件</button></div></div></div></div>

<script type="module">
import { modal } from '../../_shared/components-overlay.ts';

export default function demo(root) {
  const pg = root.querySelector('.pg'), open = root.querySelector('.open'), reset = root.querySelector('.reset');
  const m = modal(root, root.querySelector('.mask'), { first: '[data-close]', scrim: true }); // 初始焦点在“取消”，点遮罩只取消
  const show = (del) => { pg.querySelector('.info').hidden = del; open.hidden = del; pg.querySelector('.done').hidden = !del; };
  open.addEventListener('click', () => m.open(open));
  root.querySelector('.go').addEventListener('click', () => { m.close(); show(true); reset.focus(); });
  reset.addEventListener('click', () => { show(false); open.focus(); });
}
</script>
