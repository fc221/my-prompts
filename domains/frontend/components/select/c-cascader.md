---
zh: 级联选择
en: Cascader
order: 60
---

## 是什么

逐级展开的多列面板，选完显示完整路径，如“浙江 / 杭州 / 西湖区”。

## 适合

有真实层级的选择：省市区、商品类目、组织架构，层级 2–4 级。

## 不适合

只有一级用普通选择器；超过 4 级或每级很多项时改用带搜索的树选择；用户熟悉的值（如地址）可以直接输入加联想。

## 要点

- 用组件库的级联选择：Element Plus el-cascader（options、props="{ checkStrictly, emitPath, lazy, lazyLoad }"、filterable、show-all-levels、separator、clearable），Naive UI n-cascader（options、check-strategy、show-path、filterable、separator、remote + on-load、clearable），Ant Design Vue a-cascader（options、changeOnSelect、showSearch、displayRender、loadData、allowClear）；面板列宽、高度、键盘和定位用组件默认
- 默认只能选末级；允许选任意级：Element Plus props.checkStrictly，Naive UI check-strategy="all"（只选末级写 "child"），Ant Design Vue changeOnSelect
- 选中后框里显示完整路径“浙江 / 杭州 / 西湖区”（show-all-levels / show-path 默认开，Ant Design Vue 用 displayRender 定格式），过长省略并在悬停显示全文
- 跨级搜索要显式打开（filterable / filterable / showSearch）：输入“西湖”直接列出“浙江 / 杭州 / 西湖区”，匹配字高亮；Ant Design Vue 的 showSearch 和 loadData 不能同时用
- 绑定值和后端对齐：Element Plus 和 Ant Design Vue 默认给整条路径数组，Naive UI 给末级值；只要末级编码时 Element Plus 设 props.emitPath=false，Ant Design Vue 取数组最后一项
- 数据量大时按需加载（lazy + lazyLoad / remote + on-load / loadData），每级只取下一级
- 窄屏改为底部面板逐级推进，顶部显示已选路径：Element Plus 有独立的 el-cascader-panel 可以放进「底部面板」；另两家没有独立面板，要么直接用弹出面板，要么自己做

## 提示词

把{收货地址的“所在地区”}做成级联选择：用项目组件库自带的级联选择（Element Plus el-cascader filterable clearable；Naive UI n-cascader filterable clearable check-strategy="child"；Ant Design Vue a-cascader showSearch allowClear），不手写多列面板。只能选末级；选中后框里显示“省 / 市 / 区”完整路径，过长省略、悬停看全文；顶部可跨级搜索并高亮匹配字；绑定值{整条路径数组 / 只要区县编码（Element Plus props.emitPath=false）}；省市区数据{一次加载 / 按需加载下一级}；手机上改为底部面板逐级推进，顶部显示已选路径（Element Plus 用 el-cascader-panel 放进底部面板，另两家没有独立面板时直接用弹出面板）。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{width:100%;max-width:420px;display:flex;flex-direction:column;gap:6px}
.trg{position:relative;display:flex;align-items:center;height:32px;padding:0 32px 0 12px;border:1px solid #3b5bdb;border-radius:6px;background:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.trg::after{content:"";position:absolute;right:15px;top:14px;width:6px;height:6px;border:solid #5b616e;border-width:0 1.5px 1.5px 0;transform:rotate(225deg)}
.ph{color:#8a909c}
.cols{display:flex;padding:4px 0;background:#fff;border:1px solid #e3e6eb;border-radius:8px;box-shadow:0 6px 16px rgba(31,35,41,.1)}
.cols ul{flex:1;min-width:0;height:112px;margin:0;padding:0 4px;list-style:none;overflow:auto}
.cols ul+ul{border-left:1px solid #e3e6eb}
.cols button{display:flex;align-items:center;justify-content:space-between;width:100%;height:28px;padding:0 8px;border:0;border-radius:4px;background:none;text-align:left;white-space:nowrap;cursor:pointer}
.cols button:hover{background:#f5f6f8}
.cols button:focus-visible{outline-offset:-2px}
.cols .on{background:#edf1ff;color:#3b5bdb}
.cols .sub::after{content:"›";margin-left:4px;color:#8a909c}
.cols .on.sub::after{color:#3b5bdb}
</style>

<div class="s"><div class="w"><div class="trg" id="cv" aria-live="polite"></div><div class="cols"><ul aria-label="省份"></ul><ul aria-label="城市"></ul><ul aria-label="区县"></ul></div></div></div>

<script type="module">
export default function demo(root) {
  const D = { 浙江: { 杭州: ['西湖区', '滨江区', '余杭区', '拱墅区'], 宁波: ['海曙区', '鄞州区'], 温州: ['鹿城区', '瓯海区'] }, 江苏: { 南京: ['玄武区', '鼓楼区'], 苏州: ['姑苏区', '吴中区'] }, 广东: { 广州: ['天河区', '越秀区'], 深圳: ['南山区', '福田区'] }, 四川: { 成都: ['武侯区', '锦江区'] } };
  let p = '浙江', c = '杭州', d = '西湖区';
  const cols = root.querySelector('.cols'), [u1, u2, u3] = cols.querySelectorAll('ul'), cv = root.querySelector('#cv');
  const li = (arr, cur, sub, lv) => arr.map((x) => `<li><button type="button" data-l="${lv}" class="${x === cur ? 'on' : ''}${sub ? ' sub' : ''}">${x}</button></li>`).join('');
  const draw = () => {
    u1.innerHTML = li(Object.keys(D), p, 1, 1); u2.innerHTML = p ? li(Object.keys(D[p]), c, 1, 2) : ''; u3.innerHTML = c ? li(D[p][c], d, 0, 3) : '';
    cv.innerHTML = d ? `${p} / ${c} / ${d}` : '<span class="ph">请选择省 / 市 / 区</span>';
  };
  cols.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return; const v = b.textContent, l = +b.dataset.l;
    if (l === 1) { p = v; c = ''; d = ''; } else if (l === 2) { c = v; d = ''; } else d = v;
    draw(); const nx = l < 3 ? cols.querySelector(`[data-l="${l + 1}"]`) : cols.querySelector('[data-l="3"].on'); if (nx) nx.focus({ preventScroll: true });
  });
  cols.addEventListener('keydown', (e) => {
    const b = e.target.closest('button'); if (!b) return; const l = +b.dataset.l, all = [...cols.querySelectorAll(`[data-l="${l}"]`)], k = all.indexOf(b);
    const go = (el) => { if (el) { e.preventDefault(); el.focus(); } };
    if (e.key === 'ArrowDown') go(all[k + 1]); else if (e.key === 'ArrowUp') go(all[k - 1]);
    else if (e.key === 'ArrowRight' && l < 3) { e.preventDefault(); b.click(); } else if (e.key === 'ArrowLeft' && l > 1) go(cols.querySelector(`[data-l="${l - 1}"].on`));
  });
  draw();
}
</script>
