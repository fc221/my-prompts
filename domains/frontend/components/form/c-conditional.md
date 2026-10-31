---
zh: 条件字段与展开区
en: Conditional fields
order: 40
---

## 是什么

勾选或选中某项后，相关字段在它正下方缩进展开；收起时不校验、不提交。

## 适合

字段只在某个选择之后才有意义：“限制额度”后填额度、“指定日期”后选日期、选“企业”后填税号；以及收起低频项的“高级设置”。

## 不适合

不要一次摆出所有可能用到的字段；弹窗里不用折叠面板或页签藏字段；控制项和展开内容不要分在两处。

## 要点

- 展开内容紧贴在控制项正下方，与上方间距 8–12px，左侧缩进 16px 并带 2px 浅色竖线
- 展开收起用高度过渡（grid-template-rows 0fr → 1fr，160–240ms），减少动态效果时直接切换，不让整页跳动
- 控制项和展开区包在同一个容器里，收起时不占父容器的间距；勾选框用 aria-expanded + aria-controls
- 收起的区域设 inert，不参与校验和提交，但已填的值先保留，切回来还在；确实要清空时在切换处提示
- “高级设置”只是折叠，仍属于表单、照常校验；有改动或错误时标题显示“已修改 2 项”“1 个错误”，提交出错自动展开
- 每做一个决定只展开下一步需要的字段，不要先选一大堆再一次性出现

## 提示词

在{API Key 表单}里做条件字段：勾选“限制额度”后，正下方缩进 16px、带 2px 浅色竖线展开“总额度”输入；单选“有效期”选“指定日期”时下方出现日期框；展开用高度过渡 200ms，减少动态效果时直接切换；勾选框设 aria-expanded / aria-controls，收起的区域 inert、不校验不提交，但保留已填值；末尾“高级设置”默认收起，有改动时标题显示“已修改 N 项”。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{width:100%;max-width:340px;min-height:156px;display:flex;flex-direction:column;gap:12px}
.tg{display:flex;flex-direction:column}
.ch{display:inline-flex;align-items:center;gap:8px;min-height:32px;cursor:pointer}
.rg{display:flex;align-items:center;flex-wrap:wrap;gap:0 24px}
input[type=checkbox],input[type=radio]{width:16px;height:16px;accent-color:#3b5bdb;cursor:pointer}
.rv{display:grid;grid-template-rows:0fr;transition:grid-template-rows .2s cubic-bezier(.2,0,0,1)}
.rv.open{grid-template-rows:1fr}
.ri{min-height:0;overflow:hidden}
.rv.open .ri{margin-top:8px;padding-left:16px;border-left:2px solid #e3e6eb}
.il{display:flex;align-items:center;gap:8px}
.il>span:first-child{color:#5b616e;white-space:nowrap}
.af{position:relative;display:flex}
.af .inp{width:150px;padding-right:72px;font-variant-numeric:tabular-nums}
.af em{position:absolute;right:12px;top:5px;font-style:normal;color:#5b616e}
.il input[type=date]{width:150px}
@media (prefers-reduced-motion:reduce){.rv{transition:none}
}
</style>

<div class="s"><div class="w"><div class="tg"><label class="ch"><input type="checkbox" id="lim" aria-controls="lb" aria-expanded="true" checked>限制额度</label><div class="rv open" id="lb"><div class="ri"><label class="il"><span>总额度</span><span class="af"><input class="inp" inputmode="numeric" value="5000"><em>元</em></span></label></div></div></div><div class="tg"><div class="rg" role="radiogroup" aria-labelledby="el"><span class="lab" id="el">有效期</span><label class="ch"><input type="radio" name="e" value="0" checked>永久</label><label class="ch"><input type="radio" name="e" value="1" aria-controls="db">指定日期</label></div><div class="rv" id="db" inert><div class="ri"><label class="il"><span>到期日</span><input class="inp" type="date" value="2026-12-31"></label></div></div></div></div></div>

<script type="module">
export default function demo(root) {
  const lim = root.querySelector('#lim'), lb = root.querySelector('#lb'), db = root.querySelector('#db');
  const set = (rv, open) => { rv.classList.toggle('open', open); rv.inert = !open; };
  lim.addEventListener('change', () => { set(lb, lim.checked); lim.setAttribute('aria-expanded', String(lim.checked)); });
  root.querySelectorAll('[name=e]').forEach((r) => r.addEventListener('change', () => set(db, root.querySelector('[name=e]:checked').value === '1')));
}
</script>
