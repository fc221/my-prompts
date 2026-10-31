---
zh: 树形控件
en: Tree view
aka: 树 树形选择 树形单选 树形多选 树选择 目录树 部门选择 组织架构多选 可见范围选择
order: 100
---

## 是什么

可展开收起的层级列表，每级缩进。同一棵树有三种用法：只展示；节点前加单选圈，选一个；节点前加复选框，选多个。多选时选中结果在输入框里收成一行：选了整个部门只显示一个标签，取消其中一个显示“客服中心 19/20”。

## 适合

真实的层级数据：文件目录、组织架构、分类管理、权限树。选通知范围和数据权限、按类目选商品、按地区选门店时用多选，节点几十到几百个也放得下。

## 不适合

只有两级且第二级很少时用分组列表；层级只是为了归类展示时用分组标题；逐级选出一个末级值时用「级联选择」；选项平铺、不到 20 个用「多选与标签输入」；要对照两侧大量数据用「穿梭框」。

## 注意

多选时标签和提交的值要分开想。整部门选中时提交部门编号，之后新建的小组自动包含；展开成小组列表，就只是当时那几十个。两种含义不同，先和后端定下来。

## 要点

- 每级缩进 16–24px，行高 32px（紧凑 28px）；展开箭头 16px，叶子节点留出同宽占位保持对齐
- 三种用法只差节点前面的标记，缩进、展开、键盘和搜索都一样，做成一个控件的三种模式
- 展示：当前节点浅主色底 + 主色文字，悬停浅灰底
- 单选：节点前放单选圈，点行选中，输入框里写完整路径“客服中心 / 在线组 / 在线 2 组”；只能选末级时父节点不放单选圈，点它只展开
- 多选：节点前放复选框，父节点三态（全选打勾、部分选中横杠、未选空框）；点部分选中的父节点变全选，再点清空；父节点后写“已选/总数”，树收起时也看得出选了多少
- 多选的标签按部门收：全选一个标签，部分选中一个标签加计数“客服中心 19/20”，子项不展开成标签；标签上的 × 移除整个部门，焦点到下一个标签，没有就回到树
- 输入框固定 32px 一行，放不下时从后往前收进“+N”，悬停或点开看全部
- 放进下拉面板时最高约 320px，内部滚动
- 节点很多时顶部提供搜索，命中时展开路径；搜索状态下勾父节点只作用于命中的项
- 大部分选中时提交“部门 + 排除项”比列出全部子项更短，含义也更准
- 按需加载子级时箭头位置显示 16px 转圈，失败在该节点下显示“加载失败，重试”；勾选未加载的父节点直接记成整部门
- 名称过长单行省略并悬停显示全文
- role="tree" / "treeitem" / "group"，展开节点设 aria-expanded；单选用 aria-selected，多选用 aria-checked，部分选中写 aria-checked="mixed"；漫游焦点，整棵树只占一个 Tab 位
- 键盘：上下移动，右键展开或进入子级，左键收起或回到父级，Enter 或空格选中，Home / End 到首尾

## 提示词

把{组织架构}做成树形控件，用法选{展示 / 单选 / 多选}，只保留用到的一种。每级缩进 20px，行高 32px，展开箭头 16px，叶子节点留同宽占位；名称过长省略；节点多时顶部搜索，命中时展开路径；子级按需加载时箭头处显示转圈，失败显示“重试”；用 role="tree" / "treeitem" / "group" 和 aria-expanded，漫游焦点只占一个 Tab 位；方向键上下移动、右键展开或进入子级、左键收起或回父级、Enter 或空格选中、Home / End 到首尾；窄屏收进抽屉。

展示：当前节点浅主色底加主色文字，悬停浅灰底。

单选：节点前放单选圈，点行选中，输入框写完整路径，用 aria-selected 表达选中。

多选：节点前放复选框，父节点三态，点部分选中的父节点变全选，再点清空，行尾写“已选/总数”，用 aria-checked 表达三态；输入框固定 32px 一行，下拉面板最高 320px 内滚动；已选结果按{部门}收成标签：全选一个标签，部分选中写“部门名 19/20”，子项不展开成标签，放不下时从后往前收进“+N”，悬停看全部，标签的 × 移除整个部门；提交时全选传部门编号（之后新建的小组自动包含），大部分选中传“部门 + 排除的小组”，少量选中传小组编号。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.s{padding:10px 14px;font-size:12px;line-height:18px}
.w{display:grid;grid-template-columns:minmax(0,1fr);gap:8px;width:100%;height:100%;max-width:620px}
.l{min-width:0;min-height:0;display:flex;flex-direction:column;gap:6px}
.seg{flex:none;align-self:flex-start;display:inline-flex;padding:2px;background:#e8ebf0;border-radius:7px}
.seg label{position:relative;cursor:pointer}
.seg input{position:absolute;inset:0;margin:0;opacity:0;cursor:pointer}
.seg span{display:block;padding:0 10px;border-radius:5px;line-height:22px;color:#5b616e;white-space:nowrap}
.seg input:checked+span{background:#fff;color:#1f2329;font-weight:600;box-shadow:0 1px 2px rgba(31,35,41,.12)}
.seg input:focus-visible+span{outline:2px solid #3b5bdb;outline-offset:1px}
.box{flex:none;display:flex;align-items:center;gap:4px;height:32px;padding:0 6px 0 4px;overflow:hidden;background:#fff;border:1px solid #c9ced6;border-radius:6px}
.tg{flex:none;display:inline-flex;align-items:center;gap:2px;height:24px;padding:0 2px 0 8px;border-radius:4px;background:#eef0f3;white-space:nowrap}
.tg em{font-style:normal;color:#5b616e;font-size:11px;font-variant-numeric:tabular-nums}
.tg button{display:grid;place-items:center;width:18px;height:18px;padding:0;border:0;border-radius:3px;background:none;color:#5b616e;cursor:pointer}
.tg button:hover{background:#d5d9e0;color:#1f2329}
.plus{flex:none;padding:0 6px;line-height:24px;border-radius:4px;background:#eef0f3;color:#5b616e}
.ph{padding-left:4px;color:#8a909c}
.pth{min-width:0;padding-left:4px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.tree{flex:1;min-height:0;overflow:auto;margin:0;padding:4px;list-style:none;background:#fff;border:1px solid #e3e6eb;border-radius:6px}
.tree ul{margin:0;padding:0;list-style:none}
[aria-expanded=false]>ul{display:none}
li{outline:none}
.row{display:flex;align-items:center;gap:6px;height:26px;padding-right:6px;border-radius:4px;white-space:nowrap;cursor:pointer;user-select:none}
.row:hover{background:#f5f6f8}
[aria-selected=true]>.row{background:#edf1ff;color:#3b5bdb}
li:focus-visible>.row{outline:2px solid #3b5bdb;outline-offset:-2px}
.tw{flex:none;display:grid;place-items:center;width:16px;height:16px;color:#5b616e}
.tw svg{transform:rotate(-90deg);transition:transform .16s}
[aria-expanded=true]>.row .tw svg{transform:none}
.cb,.rd{display:none;flex:none;box-sizing:border-box;width:14px;height:14px;background:#fff;border:1.5px solid #8a909c}
[data-m=many] .cb{display:grid;place-items:center;border-radius:3px}
[data-m=one] .rd{display:block;border-radius:50%}
[data-m=one] [aria-selected=true]>.row .rd{border:4.5px solid #3b5bdb}
.cb svg{display:none;width:10px;height:10px;fill:none;stroke:#fff;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
[aria-checked=true]>.row .cb,[aria-checked=mixed]>.row .cb{background:#3b5bdb;border-color:#3b5bdb}
[aria-checked=true]>.row .yes{display:block}
[aria-checked=mixed]>.row .mix{display:block}
.nm{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis}
.ct{display:none;flex:none;color:#5b616e;font-size:11px;font-variant-numeric:tabular-nums}
[data-m=many] .ct{display:block}
.sd{display:none;min-width:0;flex-direction:column;gap:4px}
.sd b{font-weight:600}
.sd code{flex:1;min-height:0;overflow:auto;padding:8px;background:#fff;border:1px solid #e3e6eb;border-radius:6px;font:11px/17px ui-monospace,Menlo,monospace;white-space:pre-wrap;word-break:break-all}
@container (min-width:560px){.s{padding:14px 20px}
.w{grid-template-columns:minmax(0,1fr) 220px}
.sd{display:flex}
}
@media (prefers-reduced-motion:reduce){.tw svg{transition:none}
}
</style>

<div class="s"><div class="w"><div class="l"><div class="seg" role="radiogroup" aria-label="用法"><label><input type="radio" name="m" value="show"><span>展示</span></label><label><input type="radio" name="m" value="one"><span>单选</span></label><label><input type="radio" name="m" value="many" checked><span>多选</span></label></div><div class="box" role="group" aria-label="已选结果"></div><ul class="tree" role="tree" aria-label="组织架构" data-m="many"></ul></div><div class="sd"><b></b><code></code><p class="help" role="status"></p></div></div></div>

<script type="module">
export default function demo(root) {
  const leaf = (...names) => names.map((n) => ({ n }));
  const seq = (name, n) => Array.from({ length: n }, (_, i) => ({ n: `${name} ${i + 1} 组` }));
  const D = [
    { id: 'sales', n: '华东销售', c: leaf('上海组', '杭州组', '南京组', '苏州组', '合肥组', '宁波组', '无锡组', '温州组') },
    { id: 'cs', n: '客服中心', o: 1, c: [{ n: '在线组', o: 1, c: seq('在线', 8) }, { n: '电话组', c: seq('电话', 6) }, { n: '质检组', c: seq('质检', 3) }, { n: '培训组', c: seq('培训', 3) }] },
    { id: 'rd', n: '研发中心', c: leaf('前端组', '后端组', '测试组', '运维组', '数据组', '设计组') },
    { id: 'fin', n: '财务部', c: leaf('应收组', '应付组', '税务组') },
  ];
  const XS = '<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7"/></svg>';
  const CH = '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>';
  const MARK = '<span class="rd"></span><span class="cb"><svg class="yes" viewBox="0 0 12 12"><path d="m2.5 6.2 2.3 2.3 4.7-5"/></svg><svg class="mix" viewBox="0 0 12 12"><path d="M3 6h6"/></svg></span>';
  const box = root.querySelector('.box'), tree = root.querySelector('.tree'), head = root.querySelector('.sd b'), code = root.querySelector('code'), st = root.querySelector('[role=status]');
  const nodes = [];
  const html = (arr, lv, p) => arr.map((x) => { x.p = p; const k = nodes.push(x) - 1; return `<li role="treeitem" data-k="${k}" aria-level="${lv}"${x.c ? ` aria-expanded="${!!x.o}"` : ''} tabindex="${k ? -1 : 0}"><div class="row" style="padding-left:${(lv - 1) * 20 + 2}px"><span class="tw">${x.c ? CH : ''}</span>${MARK}<span class="nm">${x.n}</span>${x.c ? '<span class="ct"></span>' : ''}</div>${x.c ? `<ul role="group">${html(x.c, lv + 1, x)}</ul>` : ''}</li>`; }).join('');
  tree.innerHTML = html(D, 1);
  const all = [...tree.querySelectorAll('[role=treeitem]')], at = (li) => nodes[+li.dataset.k];
  const visible = () => all.filter((x) => x.offsetParent !== null);
  const leaves = (x) => (x.c ? x.c.flatMap(leaves) : [x]);
  const path = (x) => (x.p ? `${path(x.p)} / ` : '') + x.n;
  // 多选只记叶子，父节点的三态和标签都由它算出来
  const on = new Set(leaves(D[0]));
  leaves(D[1]).forEach((x) => { if (x.n !== '在线 3 组') on.add(x); });
  const got = (x) => leaves(x).filter((l) => on.has(l)).length;
  let cur = leaves(D[1])[1];

  // 标签放不下时从后往前收进 +N，框高始终一行
  const fit = () => {
    const tags = [...box.querySelectorAll('.tg')], plus = box.querySelector('.plus'); if (!plus) return;
    tags.forEach((x) => { x.hidden = false; }); plus.hidden = true;
    const off = [];
    for (let i = tags.length - 1; i >= 1 && box.scrollWidth > box.clientWidth; i--) {
      tags[i].hidden = true; off.unshift(tags[i].title);
      plus.hidden = false; plus.textContent = `+${off.length}`; plus.title = off.join('、');
    }
  };
  const payload = () => {
    const inc = [], exc = [];
    D.forEach((d) => {
      const ls = leaves(d), n = got(d);
      if (n === ls.length) inc.push(`dept:${d.id}`);
      else if (n > ls.length / 2) { inc.push(`dept:${d.id}`); exc.push(...ls.filter((l) => !on.has(l)).map((l) => `team:${l.n}`)); }
      else inc.push(...ls.filter((l) => on.has(l)).map((l) => `team:${l.n}`));
    });
    return [...inc.map((x) => `包含 ${x}`), ...exc.map((x) => `排除 ${x}`)].join('\n') || '（未选）';
  };
  const paint = () => {
    const m = tree.dataset.m, many = m === 'many';
    if (many) tree.setAttribute('aria-multiselectable', 'true'); else tree.removeAttribute('aria-multiselectable');
    all.forEach((li) => {
      const x = at(li), n = got(x), t = leaves(x).length, ct = li.querySelector(':scope>.row>.ct');
      li.removeAttribute(many ? 'aria-selected' : 'aria-checked');
      if (many) li.setAttribute('aria-checked', n === t ? 'true' : n ? 'mixed' : 'false'); else li.setAttribute('aria-selected', String(x === cur));
      if (ct) ct.textContent = n ? `${n}/${t}` : `${t}`;
    });
    box.hidden = m === 'show';
    if (m === 'one') box.innerHTML = `<span class="pth">${path(cur)}</span>`;
    if (many) {
      const tags = D.filter(got);
      box.innerHTML = tags.length ? tags.map((d) => { const n = got(d), t = leaves(d).length, full = n === t; return `<span class="tg" title="${d.n}${full ? '' : ` ${n}/${t}`}">${d.n}${full ? '' : `<em>${n}/${t}</em>`}<button type="button" data-k="${D.indexOf(d)}" aria-label="移除 ${d.n}">${XS}</button></span>`; }).join('') + '<span class="plus" hidden></span>' : '<span class="ph">选择部门或小组</span>';
      fit();
      head.textContent = '提交给后端的值'; code.textContent = payload();
      st.textContent = `已选 ${on.size} 个小组，收成 ${tags.length} 个标签。整部门传部门编号，之后新建的小组自动包含。`;
    } else {
      head.textContent = m === 'one' ? '提交给后端的值' : '当前节点'; code.textContent = m === 'one' ? `包含 ${cur.c ? 'dept' : 'team'}:${cur.n}` : path(cur);
      st.textContent = `${m === 'one' ? '已选' : '当前'} ${cur.n}。三种用法只差节点前面的标记。`;
    }
  };
  const go = (x) => { if (!x) return; all.forEach((v) => { v.tabIndex = -1; }); x.tabIndex = 0; x.focus(); };
  const expand = (li, v) => li.setAttribute('aria-expanded', String(v));
  const pick = (li) => {
    const x = at(li), m = tree.dataset.m, ex = li.getAttribute('aria-expanded');
    if (m === 'many') { const ls = leaves(x), fill = got(x) !== ls.length; ls.forEach((l) => { if (fill) on.add(l); else on.delete(l); }); }
    else if (m === 'one' || !ex) cur = x;
    else expand(li, ex !== 'true');
    paint();
  };

  root.querySelector('.seg').addEventListener('change', (e) => { tree.dataset.m = e.target.value; paint(); });
  tree.addEventListener('click', (e) => {
    const li = e.target.closest('[role=treeitem]'); if (!li) return;
    if (e.target.closest('.tw svg')) expand(li, li.getAttribute('aria-expanded') !== 'true'); else pick(li);
    go(li);
  });
  tree.addEventListener('keydown', (e) => {
    const li = e.target.closest('[role=treeitem]'); if (!li) return; const vis = visible(), k = vis.indexOf(li), ex = li.getAttribute('aria-expanded');
    const keys = { ArrowDown: () => go(vis[k + 1]), ArrowUp: () => go(vis[k - 1]), Home: () => go(vis[0]), End: () => go(vis.at(-1)),
      ArrowRight: () => { if (ex === 'false') expand(li, true); else if (ex === 'true') go(li.querySelector('[role=treeitem]')); },
      ArrowLeft: () => { if (ex === 'true') expand(li, false); else go(li.parentElement.closest('[role=treeitem]')); },
      ' ': () => pick(li), Enter: () => pick(li) };
    if (keys[e.key]) { e.preventDefault(); keys[e.key](); }
  });
  box.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-k]'); if (!b) return;
    leaves(D[+b.dataset.k]).forEach((l) => on.delete(l)); paint();
    (box.querySelector('button') || tree.querySelector('[tabindex="0"]')).focus();
  });
  new ResizeObserver(fit).observe(box);
  paint();
}
</script>
