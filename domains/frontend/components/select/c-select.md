---
zh: 下拉选择
en: Select
aka: 选择器 下拉框 单选下拉 可搜索下拉
tab: 单选
order: 10
---

## 是什么

外观像输入框，点开从列表里选，选项多时加搜索。选一个值时值留在框里；选多个时已选项排成标签。

## 适合

6 个以上互斥选项、空间有限的表单字段和表格上方的筛选条件。

## 不适合

只有 2 个选项用开关或单选；3–5 个选项平铺成单选组或分段控件；点了立即执行的命令（导出、删除）用下拉菜单，外观不能和选择器一样。

## 要点

- 用组件库的选择器，不自己拼输入框加下拉：Element Plus el-select（filterable、clearable、remote + remote-method），Naive UI n-select（filterable、clearable、remote），Ant Design Vue a-select（showSearch、allowClear、filterOption）
- 选型：2–5 个选项用平铺的「单选组与复选组」；6 个以上用下拉；超过约 10 项打开搜索；有层级用「级联选择」或「树形控件」；两边对照挑用「穿梭框」
- 占位写“请选择 X”；可清空的打开 clearable；远程搜索防抖 300ms，面板里给加载中、没有匹配、加载失败三种提示（用组件的 loading 和 empty 插槽，不留一片空白）
- 选项分组用组件的分组选项，组名吸顶
- 改变它时不悄悄重置其他字段，联动清空要提示
- 弹出方向、键盘、读屏由组件负责；窄屏考虑底部面板

## 提示词

把{成员表单的“所属部门”}做成选择器：用项目组件库的选择器（Element Plus el-select filterable clearable；Naive UI n-select filterable clearable；Ant Design Vue a-select show-search allow-clear），不手写下拉面板。占位“请选择部门”；部门按事业群分组（用组件的分组选项）；远程搜索防抖 300ms，面板里有加载中、没有匹配（“没有匹配的部门”）、加载失败（带“重试”）三种提示；选项少于 6 个改平铺单选；改变它要联动清空别的字段时先提示；窄屏改底部面板。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.s{align-items:flex-start;padding-top:16px}
.fld{display:flex;align-items:flex-start;gap:12px}
.fld .lab{line-height:32px;white-space:nowrap}
.cs{position:relative}
.fld{max-width:100%;min-width:0}
.cs{min-width:0;flex:1}
.trg{position:relative;display:flex;align-items:center;width:220px;max-width:100%;height:32px;padding:0 32px 0 12px;border:1px solid #c9ced6;border-radius:6px;background:#fff;text-align:left;cursor:pointer}
.trg:hover{border-color:#8a909c}
.trg[aria-expanded=true]{border-color:#3b5bdb}
.trg::after{content:"";position:absolute;right:15px;top:11px;width:6px;height:6px;border:solid #5b616e;border-width:0 1.5px 1.5px 0;transform:rotate(45deg)}
.trg[aria-expanded=true]::after{top:14px;transform:rotate(225deg)}
.ph{color:#8a909c}
.pop{position:absolute;top:36px;left:0;right:0;z-index:2;padding:4px;background:#fff;border:1px solid #e3e6eb;border-radius:8px;box-shadow:0 6px 16px rgba(31,35,41,.12)}
.q{width:100%;height:28px;padding:0 8px}
ul{position:relative;list-style:none;margin:4px 0 0;padding:0;max-height:84px;overflow:auto}
li{display:flex;align-items:center;justify-content:space-between;height:28px;padding:0 8px;border-radius:4px;cursor:pointer}
li:hover,li.act{background:#f5f6f8}
li[aria-selected=true]{color:#3b5bdb;font-weight:500}
li[aria-selected=true]::after{content:"✓"}
li.none{color:#5b616e;cursor:default;background:none}
</style>

<div class="s"><div class="fld"><span class="lab" id="sl">所属部门</span><div class="cs"><button type="button" class="trg" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="sl tv"><span id="tv" class="ph">请选择部门</span></button><div class="pop" hidden><input class="inp q" placeholder="搜索部门" aria-label="搜索部门" role="combobox" aria-controls="lb" aria-expanded="true" aria-autocomplete="list"><ul role="listbox" id="lb" aria-labelledby="sl"></ul></div></div></div></div>

<script type="module">
export default function demo(root) {
  const D = ['研发部', '设计部', '市场部', '运营部', '财务部', '人事部', '法务部', '客服部'];
  const cs = root.querySelector('.cs'), trg = root.querySelector('.trg'), tv = root.querySelector('#tv'), pop = root.querySelector('.pop'), q = root.querySelector('.q'), lb = root.querySelector('ul');
  let val = '', act = 0, list = D;
  const draw = () => {
    list = D.filter((d) => d.includes(q.value.trim())); act = Math.max(0, Math.min(act, list.length - 1));
    lb.innerHTML = list.length ? list.map((d, k) => `<li role="option" id="o${k}" aria-selected="${d === val}" class="${k === act ? 'act' : ''}">${d}</li>`).join('') : '<li class="none" role="option" aria-disabled="true">没有匹配的部门</li>';
    if (list.length) q.setAttribute('aria-activedescendant', 'o' + act); else q.removeAttribute('aria-activedescendant');
    const el = lb.children[act]; if (el) { if (el.offsetTop < lb.scrollTop) lb.scrollTop = el.offsetTop; else if (el.offsetTop + el.offsetHeight > lb.scrollTop + lb.clientHeight) lb.scrollTop = el.offsetTop + el.offsetHeight - lb.clientHeight; }
  };
  const open = (o, quiet) => { pop.hidden = !o; trg.setAttribute('aria-expanded', String(o)); if (o) { q.value = ''; act = Math.max(0, D.indexOf(val)); draw(); if (!quiet) q.focus(); } };
  const pick = (d) => { val = d; tv.textContent = d; tv.className = ''; open(false); trg.focus(); };
  trg.addEventListener('click', () => open(pop.hidden));
  trg.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown') { e.preventDefault(); open(true); } });
  q.addEventListener('input', () => { act = 0; draw(); });
  q.addEventListener('keydown', (e) => {
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && list.length) { e.preventDefault(); act = (act + (e.key === 'ArrowDown' ? 1 : -1) + list.length) % list.length; draw(); }
    else if (e.key === 'Enter') { e.preventDefault(); if (list[act]) pick(list[act]); }
    else if (e.key === 'Escape') { open(false); trg.focus(); }
  });
  lb.addEventListener('mousedown', (e) => e.preventDefault());
  lb.addEventListener('click', (e) => { const li = e.target.closest('li[id]'); if (li) pick(list[+li.id.slice(1)]); });
  cs.addEventListener('focusout', (e) => { if (!pop.hidden && !cs.contains(e.relatedTarget)) open(false); });
  root.addEventListener('pointerdown', (e) => { if (!pop.hidden && !cs.contains(e.target)) open(false); });
  open(true, true); // 首屏展开面板展示样子，但不抢焦点
}
</script>
