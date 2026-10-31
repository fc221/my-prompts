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

- 触发器是文字按钮或图标按钮（没有输入框边框），带 aria-haspopup="menu" 和 aria-expanded
- 菜单宽 160–240px，项高 32–36px，最多 7–9 项，用分割线分组；快捷键右对齐，禁用项说明原因
- 危险操作放最后、与其他项隔开，可用危险色文字
- 打开后焦点进入第一项，上下方向键移动，Enter 执行，Esc 关闭并回到触发器，点外部关闭
- 从触发器一侧淡入并从 0.96 放大，160ms；靠近视口边缘自动翻转方向
- 对照下拉选择：选择器选完的值留在框里随表单提交；菜单选完立刻执行或跳转

## 提示词

在{表格行 / 卡片右上角}加「下拉菜单」收纳次要操作：触发器是“更多”文字或图标按钮（无输入框边框，aria-haspopup="menu"、aria-expanded）；菜单宽 160–240px，项高 32px，最多 7–9 项并用分割线分组，危险项放最后用危险色；打开后焦点进入第一项，上下键移动、Enter 执行、Esc 关闭并回到触发器，点外部关闭；从触发器一侧淡入缩放 160ms，靠近边缘自动翻转；外观必须和下拉选择（选值、留在框里）区分开。

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
.menu .dg{color:#d92d20}
.rw{display:flex;justify-content:space-between;align-items:center;height:34px;padding:0 12px;background:#fff;border:1px solid #e3e6eb;border-radius:8px;font-size:13px}
.out{text-align:center}
</style>

<div class="s"><div class="box"><div class="tb"><label class="fl">状态<select><option>全部</option><option>待发货</option><option>已完成</option></select></label><div class="anc"><button class="b t more" aria-haspopup="menu" aria-expanded="false" aria-controls="mn">更多操作 <span aria-hidden="true">▾</span></button><div class="menu pop-in" id="mn" role="menu" aria-label="更多操作" hidden><button role="menuitem" tabindex="-1">导出 Excel<kbd>⌘E</kbd></button><button role="menuitem" tabindex="-1">打印</button><div role="separator"></div><button role="menuitem" tabindex="-1" class="dg">清空回收站</button></div></div></div><div class="rw"><span>#2041 林知科技</span><span class="muted">待发货</span></div><div class="rw"><span>#2042 周记餐饮</span><span class="muted">已完成</span></div><p class="muted out" role="status">左边是下拉选择（选一个值），右边是下拉菜单（执行命令）</p></div></div>

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
