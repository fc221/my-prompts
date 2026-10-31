---
zh: 下拉菜单
en: Dropdown menu
order: 60
---

## 是什么

点“更多”弹出一列操作，选一项立刻执行，触发按钮的文字不变。

## 适合

收起次要操作：表格行的“更多”、卡片右上角、工具栏溢出的命令。

## 不适合

要选一个值并随表单提交时用下拉选择（像输入框，有边框和当前值）；只有 2–3 个操作直接平铺按钮；不要把两者做成一个样子。

## 要点

- 用组件库的下拉菜单：Element Plus el-dropdown（trigger、placement、hide-on-click、split-button）+ el-dropdown-item（command、divided、disabled）、Naive UI n-dropdown（options、trigger、placement、on-select）、Ant Design Vue a-dropdown（trigger、placement）+ 插槽里的 a-menu / a-menu-item / a-menu-divider
- 触发方式定成点击：三家默认都是悬停（el-dropdown trigger="click"、n-dropdown trigger="click"、a-dropdown :trigger="['click']"），表格行和卡片角落的“更多”悬停会误触
- 触发器是文字按钮或图标按钮，没有输入框边框；选完立刻执行，触发器文字不变——这是它和「下拉选择」的区别，两者不要做成一个样子
- 最多 7–9 项，用分割线分组（divided、{ type: 'divider' }、a-menu-divider）；禁用项保留并写原因，不直接藏掉
- 删除这类危险项放最后、单独一组，文字用中性色；点了进「确认对话框（危险操作）」，确认按钮才用危险色；Ant Design Vue 的 a-menu-item danger 菜单里不开
- 执行集中在一个事件里按 key 分发：Element Plus 的 command 事件配每项的 command、Naive UI 的 on-select、Ant Design Vue 在 a-menu 的 click 里读 key，不在每一项上单独绑点击
- 位置翻转、键盘移动、Esc 关闭和焦点回到触发器组件已处理，不重写

## 提示词

在{表格行 / 卡片右上角}加「下拉菜单」收纳次要操作：用项目组件库自带的下拉菜单（Element Plus el-dropdown trigger="click" + el-dropdown-item command；Naive UI n-dropdown trigger="click" :options @select；Ant Design Vue a-dropdown :trigger="['click']" + a-menu），不手写。触发器是“更多”文字按钮或图标按钮，点击打开，不用悬停；菜单项 {列出操作}，最多 7–9 项并用分割线分组，禁用项保留并写原因；“删除”放最后单独一组，用中性色文字，点击后弹确认对话框，确认按钮才用危险色；选中后立即执行并关闭，触发器文字不变；所有项的执行集中在 command / on-select / click 事件里按 key 分发；外观要和「下拉选择」区分开。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{place-items:start center}
.box{width:100%;max-width:520px;display:grid;gap:10px}
.tb{display:flex;align-items:center;justify-content:space-between;gap:8px}
.fl{display:flex;align-items:center;gap:8px;font-size:13px;color:#5b616e}
select{height:32px;min-width:110px;padding:0 8px;border:1px solid #e3e6eb;border-radius:8px;background:#fff;font-size:13px;color:#1f2329}
.anc{position:relative}
.menu{position:absolute;right:0;top:calc(100% + 4px);z-index:3;min-width:168px;padding:4px;background:#fff;border:1px solid #e3e6eb;border-radius:10px;box-shadow:0 8px 24px rgba(15,17,22,.14);display:grid;transform-origin:top right}
.menu button{display:flex;align-items:center;justify-content:space-between;gap:16px;height:32px;padding:0 10px;border:0;border-radius:6px;background:none;font-size:13px;text-align:left}
.menu button:hover,.menu button:focus-visible{background:#f0f2f5;outline:none}
kbd{font:12px system-ui;color:#5b616e}
[role=separator]{height:1px;margin:4px 0;background:#e3e6eb}
.rw{display:flex;justify-content:space-between;align-items:center;height:34px;padding:0 12px;background:#fff;border:1px solid #e3e6eb;border-radius:8px;font-size:13px}
.out{text-align:center}
</style>

<div class="s"><div class="box"><div class="tb"><label class="fl">状态<select><option>全部</option><option>待发货</option><option>已完成</option></select></label><div class="anc"><button class="b t more" aria-haspopup="menu" aria-expanded="true" aria-controls="mn">更多操作 <span aria-hidden="true">▾</span></button><div class="menu pop-in" id="mn" role="menu" aria-label="更多操作"><button role="menuitem" tabindex="-1">导出 Excel<kbd>⌘E</kbd></button><button role="menuitem" tabindex="-1">打印</button><div role="separator"></div><button role="menuitem" tabindex="-1">清空回收站</button></div></div></div><div class="rw"><span>#2041 林知科技</span><span class="muted">待发货</span></div><div class="rw"><span>#2042 周记餐饮</span><span class="muted">已完成</span></div><p class="muted out" role="status">左边是下拉选择（选一个值），右边是下拉菜单（执行命令）</p></div></div>

<script type="module">
import { pop } from '../../_shared/components-overlay.ts';

export default function demo(root) {
  const btn = root.querySelector('.more'), menu = root.querySelector('[role=menu]'), out = root.querySelector('.out'), items = [...menu.querySelectorAll('[role=menuitem]')];
  const set = pop(root, btn, menu);
  menu.addEventListener('click', (e) => { const it = e.target.closest('[role=menuitem]'); if (!it) return; out.textContent = '已执行：' + it.firstChild.textContent; set(false, true); });
  menu.addEventListener('keydown', (e) => {
    const i = items.indexOf(root.activeElement), n = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: items.length - 1 }[e.key];
    if (n !== undefined) { e.preventDefault(); items[(n + items.length) % items.length].focus(); } else if (e.key === 'Tab') set(false);
  });
  btn.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown' && menu.hidden) { e.preventDefault(); set(true); } });
}
</script>
