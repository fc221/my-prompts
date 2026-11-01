---
zh: 分面筛选
en: Faceted filter
aka: 侧边筛选 左侧筛选 属性筛选 商品筛选
order: 54
---

## 是什么

结果旁边一栏筛选项，按品类、价格、发货等分组，每项后面写当前能筛出多少条；勾一下结果立刻更新，已选条件在结果上方排成标签，可以单独去掉，也能一键清空。

## 适合

商品、模板、职位、资料库这类属性多、用户边看结果边收窄的页面。

## 不适合

后台表格按固定条件查询用「筛选区」；条件要长期复用、拼“且 / 或”时用「高级查询」；结果不到二三十条时直接列出来。

## 注意

算某一组的数量时，不计这一组自己的勾选，只计其他组。否则勾了“键盘”，“耳机”的数量就变成 0，用户以为没货。

## 要点

- 用组件库的复选组、标签、抽屉拼，布局和行为按下面的要求：每组一个 el-checkbox-group / n-checkbox-group / a-checkbox-group，选项文字后跟数量；已选条件用 el-tag / n-tag / a-tag 开 closable；没有现成的分面组件，分组、数量、展开收起自己排
- 同组内是“或”，组之间是“且”；组的顺序按用户决策先后排，不按数据库字段排；价格这类区间选项写成“100 至 300 元”
- 数量随其他组的勾选实时变；数量为 0 的项用选项的 disabled 置灰、位置不动，已勾的项即使变成 0 也不设 disabled，始终能取消
- 每组默认露出 5–6 项，其余收进“展开 N 项”；选项上百时组内加搜索
- 勾选即更新是因为分面结果快；查询慢于 1 秒时按「筛选的查询时机」改成点查询
- 已选标签的顺序跟分组顺序一致，在标签的 close / on-close 里移除条件，移除后焦点到下一个标签，没有就回到第一个筛选项；“清空”只在有已选条件时出现，点后焦点回到第一个筛选项
- 结果数和各项数量由同一次请求返回，两边才对得上；请求慢时结果区淡化（v-loading / n-spin / a-spin），并按「改了条件旧结果作废」处理晚到的响应；结果数变化用 role="status" 播报
- 0 条结果时写“这些条件没有商品”（el-empty / n-empty / a-empty 的 description），并给出去掉哪个条件最省事
- 窄屏收进底部抽屉（el-drawer direction="btt" / n-drawer placement="bottom" / a-drawer placement="bottom"）：按钮写已选数量，面板里数量实时变，底部主按钮写“看 N 件结果”
- 已选条件写进地址栏，见「筛选联动与 URL 同步」

## 提示词

给{商品列表}加分面筛选：用项目组件库的复选组、标签和抽屉拼（Element Plus el-checkbox-group + el-tag closable + el-drawer direction="btt"；Naive UI n-checkbox-group + n-tag closable + n-drawer placement="bottom"；Ant Design Vue a-checkbox-group + a-tag closable + a-drawer placement="bottom"），布局和行为按下面的要求：左侧 {分组，如 品类、价格、发货} 三组复选框，宽 160px，每项右侧写数量（等宽数字），区间选项写“100 至 300 元”；同组内“或”、组之间“且”；算某组的数量时不计该组自己的勾选，只计其他组；数量为 0 的项 disabled 且位置不动，已勾的项始终可取消；每组露出 6 项，其余“展开 N 项”；勾选即更新结果，不要确定按钮，查询慢于 1 秒再改成点查询；结果上方写“N 件商品”并用 role="status" 播报，下方是可单独关闭的已选标签，有已选时显示“清空”；移除标签后焦点到下一个标签，没有就回第一个筛选项；0 条结果时用空状态组件说明并建议去掉哪个条件；窄屏收进底部抽屉，主按钮写“看 N 件结果”；已选条件写进 URL。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.s{padding:10px 12px;font-size:12px;line-height:18px}
.w{display:grid;grid-template-columns:108px minmax(0,1fr);gap:8px;width:100%;height:100%;max-width:640px}
.fc{min-height:0;overflow:auto;padding:6px 8px;background:#fff;border:1px solid #e3e6eb;border-radius:8px}
fieldset{margin:0;padding:0;border:0}
fieldset+fieldset{margin-top:6px;padding-top:6px;border-top:1px solid #eceef1}
legend{padding:0;color:#5b616e;font-size:11px}
.fc label{display:flex;align-items:center;gap:6px;min-height:23px;cursor:pointer;white-space:nowrap}
.fc input{flex:none;margin:0;accent-color:#3b5bdb}
.fc span{flex:1;min-width:0}
.fc em{font-style:normal;color:#5b616e;font-size:11px;font-variant-numeric:tabular-nums}
.fc label:has(input:disabled){color:#8a909c;cursor:not-allowed}
.fc label:has(input:disabled) em{color:#8a909c}
.r{min-width:0;min-height:0;display:flex;flex-direction:column;gap:6px}
.hd{flex:none;display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:22px}
.hd b{font-size:13px;font-weight:600}
.cl{height:22px;padding:0 6px;border:0;border-radius:4px;background:none;color:#3b5bdb;cursor:pointer;white-space:nowrap}
.cl:hover{background:#edf1ff}
.chips{flex:none;display:flex;flex-wrap:wrap;gap:4px}
.chip{display:inline-flex;align-items:center;gap:2px;height:22px;padding:0 2px 0 8px;border-radius:999px;background:#edf1ff;color:#2f47b0;white-space:nowrap;font-size:12px}
.chip button{display:grid;place-items:center;width:18px;height:18px;padding:0;border:0;border-radius:50%;background:none;color:inherit;cursor:pointer}
.chip button:hover{background:#dfe6ff}
.ls{flex:1;min-height:0;overflow:auto;margin:0;padding:0;list-style:none;display:grid;grid-template-columns:minmax(0,1fr);align-content:start;gap:4px}
.ls li{display:flex;justify-content:space-between;gap:8px;padding:3px 8px;background:#fff;border:1px solid #e3e6eb;border-radius:6px}
.ls span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ls b{flex:none;font-weight:500;font-variant-numeric:tabular-nums}
.none{padding:12px 8px;color:#5b616e;text-align:center}
@container (min-width:560px){.s{padding:14px 18px}
.w{grid-template-columns:150px minmax(0,1fr);gap:14px}
.ls{grid-template-columns:repeat(2,minmax(0,1fr))}
.ls li{padding:6px 10px}
}
</style>

<div class="s"><div class="w"><div class="fc" role="group" aria-label="筛选条件"></div><div class="r"><div class="hd"><b role="status"></b><button type="button" class="cl">清空</button></div><div class="chips" role="group" aria-label="已选条件"></div><ul class="ls" aria-label="筛选结果"></ul></div></div></div>

<script type="module">
export default function demo(root) {
  const ITEMS = [
    ['27 寸 4K 显示器', '显示器', 2399], ['24 寸护眼显示器', '显示器', 899], ['32 寸曲面显示器', '显示器', 1699],
    ['静音矮轴键盘', '键盘', 399], ['三模机械键盘', '键盘', 549], ['便携折叠键盘', '键盘', 189], ['数字小键盘', '键盘', 129],
    ['降噪头戴耳机', '耳机', 1299], ['开放式耳机', '耳机', 699], ['入耳式耳机', '耳机', 249], ['会议耳麦', '耳机', 459],
    ['轻量无线鼠标', '鼠标', 299], ['人体工学鼠标', '鼠标', 359], ['静音办公鼠标', '鼠标', 89],
  ].map(([n, cat, p], i) => ({ n, p, cat, band: p < 300 ? '¥300 以下' : p <= 1000 ? '¥300–1000' : '¥1000 以上', ship: i % 4 === 3 ? '预订' : '现货' }));
  const F = [{ k: 'cat', t: '品类', v: ['显示器', '键盘', '耳机', '鼠标'] }, { k: 'band', t: '价格', v: ['¥300 以下', '¥300–1000', '¥1000 以上'] }, { k: 'ship', t: '发货', v: ['现货', '预订'] }];
  const XS = '<svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7"/></svg>';
  const sel = { cat: new Set(['键盘', '耳机']), band: new Set(['¥300–1000']), ship: new Set() };
  const $ = (q) => root.querySelector(q), fc = $('.fc'), head = $('.hd b'), cl = $('.cl'), chips = $('.chips'), ls = $('.ls');
  // 同一组内是“或”，组之间是“且”；算某一组的数量时不计它自己的勾选，勾了键盘，耳机的数量才不会变成 0
  const pass = (x, skip) => F.every((f) => f.k === skip || !sel[f.k].size || sel[f.k].has(x[f.k]));

  fc.innerHTML = F.map((f) => `<fieldset><legend>${f.t}</legend>${f.v.map((v) => `<label><input type="checkbox" data-k="${f.k}" value="${v}"><span>${v}</span><em></em></label>`).join('')}</fieldset>`).join('');
  const boxes = [...fc.querySelectorAll('input')];

  const draw = () => {
    boxes.forEach((b) => {
      const k = b.dataset.k, n = ITEMS.filter((x) => pass(x, k) && x[k] === b.value).length;
      b.checked = sel[k].has(b.value); b.disabled = !n && !b.checked; b.parentElement.querySelector('em').textContent = n;
    });
    const hit = ITEMS.filter((x) => pass(x)), picked = F.flatMap((f) => [...sel[f.k]].map((v) => ({ k: f.k, v })));
    head.textContent = `${hit.length} 件商品`;
    cl.hidden = !picked.length; chips.hidden = !picked.length;
    chips.innerHTML = picked.map((p) => `<span class="chip">${p.v}<button type="button" data-k="${p.k}" data-v="${p.v}" aria-label="移除 ${p.v}">${XS}</button></span>`).join('');
    ls.innerHTML = hit.length ? hit.map((x) => `<li><span>${x.n}</span><b>¥${x.p}</b></li>`).join('') : '<li class="none">这些条件没有商品，去掉一个试试</li>';
  };
  fc.addEventListener('change', (e) => { const b = e.target; if (b.checked) sel[b.dataset.k].add(b.value); else sel[b.dataset.k].delete(b.value); draw(); });
  chips.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    const i = [...chips.querySelectorAll('button')].indexOf(b);
    sel[b.dataset.k].delete(b.dataset.v); draw();
    const rest = [...chips.querySelectorAll('button')]; (rest[Math.min(i, rest.length - 1)] || boxes[0]).focus();
  });
  cl.addEventListener('click', () => { F.forEach((f) => sel[f.k].clear()); draw(); boxes[0].focus(); });
  draw();
}
</script>
