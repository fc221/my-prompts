---
zh: 多选与标签输入
en: Multi-select & tag input
aka: 标签选择 标签多选 多选下拉 标签输入 可搜索多选 折叠标签 tag input
of: c-select
tab: 多选
order: 20
---

## 是什么

已选项以小标签排在框内，可逐个移除。打字能搜索选项，没有就新建；标签多时可以折叠成“+N”保持一行，也可以不折叠，全部换行显示。

## 适合

给对象打多个标签、选多个成员或城市；输入自由值（邮箱、关键词）并逐个确认。

## 不适合

选项少于 6 个且都要看到时用复选组；部门、类目、地区这类有层级的数据用「树形控件」，选整个部门只占一个标签；需要对照两侧大量数据并批量移动时才考虑穿梭框。

## 要点

- 用组件库选择器的多选模式：Element Plus el-select multiple filterable（新建开 allow-create，上限 multiple-limit），Naive UI n-select multiple filterable（新建开 tag），Ant Design Vue a-select mode="multiple"（新建用 mode="tags"）
- 折叠：筛选区、表格上方这类不能撑高的地方，Element Plus 开 collapse-tags + collapse-tags-tooltip（max-collapse-tags 定露出几个），Naive UI 用 max-tag-count="responsive"，Ant Design Vue 用 maxTagCount；框固定一行，放不下收成 +N，悬停看全部
- 不折叠：表单里要一眼看全已选项时不开这些属性，框随内容长高、标签换行
- 可搜索：打字过滤选项，Enter 勾选或取消，没有匹配时给“新建”
- 上限：到上限后未选项置灰并说明（multiple-limit，或在选项上设 disabled）
- 退格先选中最后一个标签、删除后的焦点，组件已处理，不要重写
- 部门、类目这类有层级的用「树形控件」的多选，选整个部门只占一个标签

## 提示词

把{文章编辑页的“标签”}做成可搜索的多选：用组件库选择器的多选模式（Element Plus el-select multiple filterable allow-create；Naive UI n-select multiple filterable tag；Ant Design Vue a-select mode="tags"），不手写标签输入框。显示方式选{折叠 / 不折叠}：折叠时用 collapse-tags + collapse-tags-tooltip / max-tag-count="responsive" / maxTagCount，框固定一行，放不下收成 +N，悬停看全部；不折叠时不设这些属性，框随内容长高。打字过滤选项，没有匹配时给“新建”；最多 {8} 个，到上限后未选项置灰并说明；重复值不重复添加。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.s{padding:10px 14px}
.w{width:100%;max-width:380px;height:100%;display:flex;flex-direction:column;gap:6px;font-size:13px;line-height:20px}
.lr{flex:none;display:flex;align-items:center;gap:8px}
.cnt{margin-right:auto;color:#5b616e;font-size:12px;font-variant-numeric:tabular-nums}
.chk{display:inline-flex;align-items:center;gap:4px;color:#5b616e;font-size:12px;white-space:nowrap;cursor:pointer}
.chk input{margin:0;accent-color:#3b5bdb}
.box{flex:none;display:flex;flex-wrap:wrap;align-items:center;gap:4px;min-height:32px;padding:3px 4px;border:1px solid #c9ced6;border-radius:6px;background:#fff;cursor:text}
.box.fold{flex-wrap:nowrap;height:32px;padding:0 4px;overflow:hidden}
.box:hover{border-color:#8a909c}
.box:focus-within{border-color:#3b5bdb;box-shadow:inset 0 0 0 1px #3b5bdb,0 0 0 3px #dfe6ff}
.tags{display:contents}
.tg{flex:none;display:inline-flex;align-items:center;gap:2px;height:24px;padding:0 2px 0 8px;border-radius:4px;background:#eef0f3;white-space:nowrap}
.tg.arm,.plus.arm{background:#dfe6ff;box-shadow:inset 0 0 0 1px #3b5bdb}
.tg button{display:grid;place-items:center;width:20px;height:20px;padding:0;border:0;border-radius:3px;background:none;color:#5b616e;cursor:pointer}
.tg button:hover{background:#d5d9e0;color:#1f2329}
.plus{flex:none;height:24px;padding:0 6px;border:0;border-radius:4px;background:#eef0f3;color:#5b616e;font-size:12px;cursor:pointer}
.plus:hover{background:#d5d9e0;color:#1f2329}
.ti{flex:1;min-width:72px;height:24px;padding:0 4px;border:0;outline:0;background:none}
.ti::placeholder{color:#6b7280}
.ti[readonly]{cursor:pointer}
.pop{flex:1;min-height:0;overflow:auto;margin:0;padding:4px;list-style:none;background:#fff;border:1px solid #e3e6eb;border-radius:6px}
.pop li{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:24px;padding:0 8px;border-radius:4px;cursor:pointer}
.pop li:hover,.pop .act{background:#f5f6f8}
.pop [aria-selected=true]{color:#3b5bdb;font-weight:600}
.pop [aria-disabled=true]{color:#6b7280;cursor:not-allowed}
.pop .none{color:#5b616e;cursor:default}
.pop svg{flex:none}
.w>.help{flex:none;margin:0}
</style>

<div class="s"><div class="w"><div class="lr"><label class="lab" for="ti">文章标签</label><span class="cnt"></span><label class="chk"><input type="checkbox" data-k="find" checked>可搜索</label><label class="chk"><input type="checkbox" data-k="fold" checked>折叠</label></div><div class="box"><span class="tags"></span><button type="button" class="plus" hidden></button><input id="ti" class="ti" role="combobox" aria-expanded="true" aria-controls="pop" aria-autocomplete="list" aria-describedby="th" enterkeyhint="done" autocomplete="off"></div><ul class="pop" id="pop" role="listbox" aria-multiselectable="true" aria-label="可选标签"></ul><p class="help" id="th" aria-live="polite"></p></div></div>

<script type="module">
export default function demo(root) {
  const OPT = ['设计', '无障碍', '表单', '性能', '动效', '前端', '图标', '字体', '排版', '配色'], T = OPT.slice(0, 5), MAX = 8;
  const XS = '<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7"/></svg>';
  const CK = '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7"/></svg>';
  const q = (s) => root.querySelector(s), box = q('.box'), tags = q('.tags'), plus = q('.plus'), ti = q('#ti'), pop = q('.pop'), cnt = q('.cnt'), th = q('#th');
  let arm = false, fold = true, find = true, wide = false, open = true, act = 0, items = [];
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // 折叠时框固定一行，放不下的标签从后往前收进 +N；点 +N 展开看全部
  const fit = () => {
    const els = [...tags.children], last = els.at(-1), folded = fold && !wide;
    els.forEach((x) => { x.hidden = false; }); plus.hidden = !(fold && wide); plus.textContent = '收起'; plus.removeAttribute('title'); plus.removeAttribute('aria-label');
    box.classList.toggle('fold', folded);
    if (folded) {
      let n = 0;
      for (let i = els.length - 1; i >= 1 && box.scrollWidth > box.clientWidth; i--) { els[i].hidden = true; n++; plus.hidden = false; plus.textContent = `+${n}`; }
      const off = T.slice(T.length - n);
      if (n) { plus.title = off.join('、'); plus.setAttribute('aria-label', `还有 ${n} 个标签：${off.join('、')}，点开看全部`); }
    }
    last?.classList.toggle('arm', arm && !last.hidden); plus.classList.toggle('arm', arm && !!last?.hidden);
  };
  const list = () => {
    const s = find ? ti.value.trim() : '';
    items = OPT.filter((o) => o.includes(s)).map((v) => ({ v }));
    if (s && !items.length && !T.includes(s)) items.push({ v: s, add: true });
    act = Math.max(0, Math.min(act, items.length - 1));
    pop.hidden = !open; ti.setAttribute('aria-expanded', String(open));
    pop.innerHTML = items.length ? items.map((x, i) => { const on = T.includes(x.v), off = !on && T.length >= MAX; return `<li role="option" id="o${i}" data-i="${i}" aria-selected="${on}"${off ? ' aria-disabled="true"' : ''}${i === act ? ' class="act"' : ''}><span>${x.add ? `新建“${esc(x.v)}”` : esc(x.v)}</span>${on ? CK : ''}</li>`; }).join('') : '<li class="none">没有匹配，换个词试试</li>';
    if (items.length) ti.setAttribute('aria-activedescendant', `o${act}`); else ti.removeAttribute('aria-activedescendant');
  };
  const draw = (msg) => {
    tags.innerHTML = T.map((t, k) => `<span class="tg" data-t="${esc(t)}">${esc(t)}<button type="button" data-k="${k}" aria-label="移除 ${esc(t)}">${XS}</button></span>`).join('');
    const full = T.length >= MAX; cnt.textContent = `${T.length} / ${MAX}`;
    ti.readOnly = !find; ti.placeholder = full ? '已达上限' : find ? '搜索或新建' : '请选择';
    th.textContent = msg || (arm ? `再按一次退格删除“${T.at(-1)}”` : full ? `最多 ${MAX} 个，先移除一个再添加` : find ? '回车添加，逗号可以连续添加' : `最多 ${MAX} 个`);
    th.classList.toggle('warn', !!msg);
    fit(); list();
  };
  const toggle = (v) => {
    v = v.trim(); if (!v) return draw();
    if (T.includes(v)) T.splice(T.indexOf(v), 1); else if (T.length < MAX) T.push(v); else return draw(`最多 ${MAX} 个，先移除一个再添加`);
    arm = false; draw();
  };
  ti.addEventListener('keydown', (e) => {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); open = true; if (items.length) act = (act + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length; list(); return; }
    if (e.key === 'Enter') { e.preventDefault(); const x = items[act]; if (open && x) { toggle(x.v); ti.value = ''; draw(); } return; }
    if (e.key === 'Escape' && open) { open = false; list(); return; }
    if (e.key === 'Backspace' && !ti.value && T.length) { if (arm) { T.pop(); arm = false; } else arm = true; draw(); return; }
    if (arm) { arm = false; draw(); }
  });
  ti.addEventListener('input', (e) => {
    open = true; arm = false;
    if (!e.isComposing && /[,，]/.test(ti.value)) { ti.value.split(/[,，]/).forEach((v) => { if (v.trim() && !T.includes(v.trim())) toggle(v); }); ti.value = ''; }
    list();
  });
  box.addEventListener('click', (e) => {
    if (e.target.closest('.plus')) { wide = !wide; draw(); return; }
    const x = e.target.closest('button[data-k]');
    if (x) {
      const k = +x.dataset.k; T.splice(k, 1); arm = false; draw();
      const next = box.querySelector(`[data-k="${k}"]`);
      if (next && !next.closest('.tg').hidden) { next.focus(); return; }
    }
    open = true; list(); ti.focus();
  });
  pop.addEventListener('click', (e) => { const li = e.target.closest('[data-i]'); if (!li || li.hasAttribute('aria-disabled')) return; act = +li.dataset.i; toggle(items[act].v); ti.value = ''; draw(); ti.focus(); });
  root.querySelectorAll('.chk input').forEach((c) => c.addEventListener('change', () => { if (c.dataset.k === 'find') { find = c.checked; ti.value = ''; } else { fold = c.checked; wide = false; } draw(); }));
  new ResizeObserver(fit).observe(box);
  draw();
}
</script>
