---
zh: 生成式界面卡片
en: Generative UI card
aka: 生成式界面 生成式 UI 富卡片回复 可操作卡片 generative ui
order: 50
---

## 是什么

AI 在对话里直接回一块能操作的界面，而不只是一段文字：可调日期的行程卡、可勾选的清单、可改数量的订单卡。用户在卡片上核对、修改、确认，事情当场办完。

## 适合

下单、补货、订票、排班、报销这类结构固定、参数需要用户再核对一遍的任务；AI 起草、人来拍板的场景。

## 不适合

纯问答和解释用「流式回复消息」；结构每次都不同的长内容，回文字并配「引用与来源标注」；转账、批量删除这类不可逆的大额操作，卡片里只放“去办理”入口，跳到正式页面走完整流程。

## 注意

卡片是 AI 起草的草稿：模型只输出结构化数据（预先注册的卡片类型和字段），界面用自己的组件渲染，不执行模型生成的 HTML 或脚本。AI 给的值和用户改的值，前端和服务端都要各校验一遍，提交前必须二次确认。

## 要点

- 卡片类型提前注册：行程卡、清单卡、订单卡等，每种写好字段定义（类型、范围、必填）；模型返回卡片类型和字段数据，校验不过时整块退回成文字，写明“这部分没能生成卡片”
- 来源标识：卡片左上角固定一枚“AI 生成”标签，副标题写依据（如“按近 7 天销量估算”）；用户改过的字段旁标“已改”，卡头显示“已改 N 处”
- 可编辑：数量用步进器加输入框，日期用日期选择，勾选用复选框；字段即时校验，超出范围时输入框标红、下方写原因（如“单品 1–50 箱”），提交按钮禁用
- 可撤销：卡头放“撤销”撤回上一步修改，“恢复 AI 原稿”回到初始值；没有修改时两个都禁用
- 二次确认：点“提交”后卡片底部换成确认条，复述对象和后果（“向徐汇店提交 3 项，共 ¥1,284”），按钮为“返回修改”和“确认提交”；提交中按钮禁用防重复，成功后卡片变只读并显示单号，失败保留修改并写原因
- 以服务端数据为准：价格、库存、门店在提交时重新取，和卡片上不一致时先列出差异，再让用户确认
- 读屏和键盘：卡片 role="group" 带 aria-label，字段都有可见标签，状态变化（已改、校验失败、已提交）用 role="status" 播报
- 窄屏卡片满宽，字段一行一个，操作按钮固定在卡片底部

## 提示词

在{产品}的 AI 对话里加「生成式界面卡片」：先注册卡片类型（{卡片类型}，如订单卡、行程卡、清单卡），每种定义字段的类型、范围和必填；模型只返回卡片类型和字段数据，前端用现有组件渲染，不执行模型生成的 HTML 或脚本，校验不过时整块退回成文字并说明。卡片左上角固定“AI 生成”标签，副标题写生成依据；用户改过的字段标“已改”，卡头显示“已改 N 处”。字段即时校验，超出范围时标红并写原因，提交按钮禁用。卡头提供“撤销”（撤回上一步）和“恢复 AI 原稿”，没有修改时禁用。点“提交”后卡片底部换成确认条，复述对象、数量和金额，按钮为“返回修改”和“确认提交”；提交中禁用防重复，成功后卡片只读并显示单号，失败保留修改并写原因；提交时服务端重新取价格和库存，有差异先提示。卡片 role="group" 带 aria-label，状态变化用 role="status" 播报。改完说明动了哪些文件，并走一遍“生成、修改、撤销、确认提交”验证。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{padding:12px;font-size:13px}
.wrap{width:100%;max-width:460px;display:grid;gap:8px}
.me,.say{display:none}
.me{justify-self:end;max-width:80%;padding:6px 12px;border-radius:12px 12px 4px 12px;background:#edf1ff}
.gc{display:grid;gap:6px;padding:8px 12px 10px;border:1px solid #e3e6eb;border-radius:12px;background:#fff;box-shadow:0 2px 8px rgba(15,17,22,.05)}
.top{display:flex;align-items:center;gap:6px;min-width:0;height:24px}
.ai{flex:none;display:inline-flex;align-items:center;gap:3px;height:20px;padding:0 6px;border-radius:5px;background:#f1edff;color:#5b3fd0;font-size:11px;font-weight:600}
.top b{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px}
.chg{margin-left:4px;color:#b54708;font-size:11px;white-space:nowrap}
.top .b{flex:none}
.top b{margin-right:auto}
.why{display:none}
.rows{display:grid;gap:2px;margin:0;padding:0;list-style:none}
.row{display:grid;grid-template-columns:minmax(0,1fr) auto 52px;align-items:center;gap:8px;height:26px}
.nm{display:flex;align-items:baseline;gap:4px;min-width:0;white-space:nowrap}
.nm span{overflow:hidden;text-overflow:ellipsis}
.nm small{flex:none;color:#5b616e;font-size:11px}
.nm em{flex:none;font-style:normal;color:#b54708;font-size:11px}
.stp{display:flex;align-items:center;border:1px solid #e3e6eb;border-radius:7px;overflow:hidden}
.stp button{width:24px;height:22px;padding:0;border:0;background:#f5f6f8;color:#1f2329;font-size:14px;line-height:1}
.stp button:hover:not(:disabled){background:#e9ecf1}
.stp button:disabled{color:#a3a9b4;cursor:not-allowed}
.stp input{width:32px;height:22px;padding:0;border:0;border-inline:1px solid #e3e6eb;text-align:center;font-variant-numeric:tabular-nums;font-size:12px;background:#fff}
.stp input:focus-visible{outline:none;box-shadow:inset 0 0 0 2px #3b5bdb}
.stp.err{border-color:#d92d20}
.stp.err input{background:#fdecea;color:#b42318}
.sum{text-align:right;font-variant-numeric:tabular-nums;font-size:12px;color:#5b616e}
.ft{display:flex;align-items:center;gap:6px;min-height:30px;padding-top:6px;border-top:1px dashed #e3e6eb}
.ft p{min-width:0;margin-right:auto;font-size:12px;line-height:1.3}
.ft p strong{font-size:14px;font-variant-numeric:tabular-nums}
.ft p.bad{color:#d92d20}
.ft .ok{color:#067647;font-weight:600}
.ft .b{flex:none}
.rst{display:none}
@container (max-width:310px){.nm small{display:none}
}
@container (min-height:260px){.s{place-items:end center;padding:14px 16px}
.me,.say{display:block}
.say{color:#3a3f4a}
.gc{gap:8px;padding:12px 14px}
.why{display:block;margin-top:-4px;color:#5b616e;font-size:12px}
.row{height:30px}
.rst{display:inline-flex}
.top b{font-size:14px}
}
</style>

<div class="s"><div class="wrap"><p class="me">帮我拟一下明天徐汇店的补货单</p><p class="say">按近 7 天销量拟好了，数量可以直接改：</p><section class="gc" role="group" aria-label="AI 生成的补货单，可编辑"><div class="top"><span class="ai"><svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" fill="currentColor"/></svg>AI 生成</span><b>明日补货单 · 徐汇店</b><button type="button" class="b t sm rst" disabled>恢复 AI 原稿</button><button type="button" class="b sm und" disabled>撤销</button></div><p class="why">按近 7 天销量和当前库存估算，提交前请核对</p><ul class="rows"></ul><div class="ft"></div></section></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const ITEMS = [['鲜牛奶 950ml', '12 盒/箱', 86, 8, '箱'], ['全麦吐司', '20 袋/箱', 64, 5, '箱'], ['鸡蛋', '30 枚/托', 23, 12, '托']];
  const MAX = 50, $ = (q) => root.querySelector(q);
  const rows = $('.rows'), ft = $('.ft'), und = $('.und'), rst = $('.rst'), live = $('[role=status]');
  const ai = ITEMS.map((it) => it[3]);
  let qty = [...ai], hist = [], mode = 'edit', bad = new Set();
  const yuan = (n) => '¥' + n.toLocaleString('en-US');
  rows.innerHTML = ITEMS.map(([n, spec, p], i) => `<li class="row"><span class="nm"><span>${n}</span><small>${yuan(p)}/${ITEMS[i][4]}</small><em hidden>已改</em></span><span class="stp"><button type="button" data-d="-1" aria-label="${n}减 1">−</button><input inputmode="numeric" aria-label="${n}数量（0–${MAX}）" value="${qty[i]}"><button type="button" data-d="1" aria-label="${n}加 1">+</button></span><span class="sum"></span></li>`).join('');
  const lis = [...rows.children];
  const total = () => qty.reduce((s, q, i) => s + q * ITEMS[i][2], 0);
  const footer = (edits) => {
    const n = qty.filter((q) => q > 0).length;
    if (mode === 'confirm') ft.innerHTML = `<p>向徐汇店提交 ${n} 项，共 <strong>${yuan(total())}</strong>？</p><button type="button" class="b sm back">返回修改</button><button type="button" class="b p sm go">确认提交</button>`;
    else if (mode === 'sending') ft.innerHTML = `<p>正在提交…</p><button type="button" class="b p sm" disabled><span class="spin"></span>提交中</button>`;
    else if (mode === 'done') ft.innerHTML = `<p><span class="ok">已提交</span> · 单号 BH261029-07</p>`;
    else if (bad.size) ft.innerHTML = `<p class="bad">每项 0–${MAX} 的整数，改好后才能提交</p><button type="button" class="b p sm sub" disabled>提交</button>`;
    else ft.innerHTML = `<p>合计 <strong>${yuan(total())}</strong>${edits ? `<span class="chg">已改 ${edits} 处</span>` : ''}</p><button type="button" class="b p sm sub"${n ? '' : ' disabled'}>提交</button>`;
  };
  const paint = () => {
    const edits = qty.filter((q, i) => q !== ai[i]).length;
    lis.forEach((li, i) => {
      const inp = li.querySelector('input'), [m, p] = li.querySelectorAll('.stp button');
      if (!bad.has(i) && document.activeElement !== inp && root.activeElement !== inp) inp.value = qty[i];
      li.querySelector('.stp').classList.toggle('err', bad.has(i));
      inp.setAttribute('aria-invalid', String(bad.has(i)));
      li.querySelector('em').hidden = qty[i] === ai[i] || bad.has(i);
      li.querySelector('.sum').textContent = yuan(qty[i] * ITEMS[i][2]);
      const ro = mode !== 'edit'; inp.readOnly = ro; m.disabled = ro || qty[i] <= 0; p.disabled = ro || qty[i] >= MAX;
    });
    und.disabled = mode !== 'edit' || !hist.length; rst.disabled = mode !== 'edit' || !edits;
    footer(edits);
  };
  const setQ = (i, v, speak) => { if (v === qty[i]) return; hist.push([i, qty[i]]); qty[i] = v; bad.delete(i); paint(); if (speak) live.textContent = `${ITEMS[i][0]}改为 ${v}${ITEMS[i][4]}`; };
  rows.addEventListener('click', (e) => { const b = e.target.closest('.stp button'); if (!b || mode !== 'edit') return; const i = lis.indexOf(b.closest('li')); setQ(i, Math.max(0, Math.min(MAX, qty[i] + +b.dataset.d)), true); });
  // 即时校验：只收 0–50 的整数；不合法时标红、禁用提交，合法时记入撤销历史
  rows.addEventListener('input', (e) => {
    const i = lis.indexOf(e.target.closest('li')), t = e.target.value.trim();
    if (/^\d{1,3}$/.test(t) && +t <= MAX) { bad.delete(i); setQ(i, +t, false); paint(); }
    else { bad.add(i); paint(); live.textContent = `${ITEMS[i][0]}数量要在 0–${MAX} 之间`; }
  });
  rows.addEventListener('focusout', (e) => { if (e.target.matches('input') && !bad.has(lis.indexOf(e.target.closest('li')))) paint(); });
  und.addEventListener('click', () => { const h = hist.pop(); if (!h) return; qty[h[0]] = h[1]; bad.delete(h[0]); paint(); live.textContent = `已撤销：${ITEMS[h[0]][0]}回到 ${h[1]}${ITEMS[h[0]][4]}`; });
  rst.addEventListener('click', () => { hist = []; qty = [...ai]; bad.clear(); paint(); live.textContent = '已恢复 AI 原稿'; });
  ft.addEventListener('click', (e) => {
    if (e.target.closest('.sub')) { mode = 'confirm'; paint(); ft.querySelector('.go').focus(); }
    else if (e.target.closest('.back')) { mode = 'edit'; paint(); ft.querySelector('.sub').focus(); }
    else if (e.target.closest('.go')) {
      mode = 'sending'; paint(); live.textContent = '正在提交补货单';
      setTimeout(() => { if (!root.host.isConnected) return; mode = 'done'; paint(); live.textContent = '补货单已提交，单号 BH261029-07'; }, 800);
    }
  });
  paint();
  // 自动演示：把吐司加 1 箱，露出“已改”和可撤销的状态
  setTimeout(() => { if (root.host.isConnected && mode === 'edit' && !hist.length) setQ(1, qty[1] + 1, false); }, 500);
}
</script>
