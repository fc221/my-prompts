---
zh: 子项列表（行内增删）
en: Repeatable rows
order: 30
---

## 是什么

同类子项每条一行，行尾删除；标签行右端“＋ 添加”，删除后原位可撤销。

## 适合

每条 1–3 个字段、彼此独立的重复项：IP 白名单、联系人电话、自定义请求头、价格档位。

## 不适合

每条 2–5 个字段且要逐行对照时用可编辑表格；6–8 个字段用折叠面板；8 个以上用列表摘要 + 抽屉编辑。

## 要点

- Naive UI 有现成的 n-dynamic-input（value、min、max、on-create，默认插槽拿到 value 和 index，preset="pair" 是键值对）；Element Plus、Ant Design Vue 没有现成的，用 v-for 渲染一行行表单项：Element Plus el-form-item :prop="'items.' + index + '.ip'"，Ant Design Vue a-form-item :name="['items', index, 'ip']"，每行的校验才落到对应那一条
- 标签行右端放小号文字按钮“＋ 添加 IP”（按钮的 small 和 text 档，不高于输入框），旁边显示条数和上限“2 / 20”；任何时候只出现一个添加按钮，n-dynamic-input 每行自带的加减号用 action 插槽换掉
- 第一行上方放列标签（12px 次要色）；每个输入有自己的可访问名称“第 2 条 IP”，占位文字不算
- 行内输入同高（同一个 size），行间 8px；行尾删除是与输入同高的图标按钮，名称写“删除第 2 条”
- 删除后原位置留一行“已删除 10.0.0.1 · 撤销”，焦点落在撤销上，保留到提交或离开页面；组件库没有这一步，自己做
- 空列表不显示空白行，只显示一句说明和正常尺寸的“＋ 添加 IP”
- 达到上限禁用添加并说明（n-dynamic-input 的 max 会自动禁用）；只剩必需的最后一条时不允许删除（min）；错误标在对应那一条上
- 窄屏一行放不下时两个输入上下堆叠，删除按钮留在右侧

## 提示词

把{API Key 设置里的“IP 白名单”}做成子项列表：用项目组件库的表单项、输入框和按钮拼（Naive UI 直接用 n-dynamic-input，min / max 控制条数，默认插槽里放两个 n-input；Element Plus 用 v-for + el-form-item :prop="'items.' + index + '.ip'"；Ant Design Vue 用 v-for + a-form-item :name="['items', index, 'ip']"），布局和行为按下面的要求：每条一行（IP 或 CIDR、备注两个输入 + 行尾与输入同高的删除图标按钮），行间 8px，第一行上方有列标签；标签行右端放小号文字按钮“＋ 添加 IP”并显示“{条数} / 20”，整个列表只有这一个添加按钮；新增后焦点进入新行第一个输入；删除后原位显示“已删除 {IP} · 撤销”，焦点落在撤销；空列表只显示说明和一个添加按钮；到上限禁用并说明；错误标在对应那一条；窄屏两个输入上下堆叠。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{width:100%;max-width:380px;display:flex;flex-direction:column;gap:4px}
.hd{display:flex;align-items:center;gap:8px;height:28px}
.cnt{font-variant-numeric:tabular-nums}
.add{margin-left:auto;height:24px;padding:0 8px;border:0;border-radius:4px;background:none;color:#3b5bdb;font-size:12px;cursor:pointer}
.add:hover{background:#edf1ff}
.add:disabled{color:#8a909c;background:none;cursor:not-allowed}
.cols,.r{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr) 28px;gap:8px;align-items:center}
.cols{font-size:12px;line-height:20px;color:#5b616e}
.rows{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
.r .inp{width:100%;height:28px;padding:0 8px}
.del{display:grid;place-items:center;width:28px;height:28px;padding:0;border:0;border-radius:4px;background:none;color:#5b616e;cursor:pointer}
.del:hover{background:#e3e6eb;color:#1f2329}
.und{display:flex;align-items:center;gap:8px;height:28px;padding:0 8px;border-radius:6px;background:#eef0f3;color:#5b616e;font-size:13px}
.t{height:24px;padding:0 4px;border:0;background:none;color:#3b5bdb;cursor:pointer}
.emp{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 12px;border:1px dashed #c9ced6;border-radius:6px;color:#5b616e;font-size:13px}
.emp .btn{height:28px;padding:0 12px}
</style>

<div class="s"><div class="w" role="group" aria-labelledby="hl"><div class="hd"><span class="lab" id="hl">IP 白名单</span><span class="help cnt"></span><button type="button" class="add">＋ 添加 IP</button></div><div class="cols" aria-hidden="true"><span>IP 或 CIDR</span><span>备注</span></div><ol class="rows"></ol></div></div>

<script type="module">
export default function demo(root) {
  const MAX = 3, TR = '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.6 9h5.8l.6-9"/></svg>';
  let R = [{ ip: '10.0.0.0/24', note: '办公网' }, { ip: '203.0.113.8', note: '构建机' }];
  const ol = root.querySelector('.rows'), cnt = root.querySelector('.cnt'), add = root.querySelector('.add'), cols = root.querySelector('.cols');
  const q = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const draw = (focus) => {
    const live = R.filter((x) => !x.gone).length, any = R.length > 0;
    ol.innerHTML = !any ? '<li class="emp">还没有 IP，所有地址都可以调用<button type="button" class="btn" data-a="add">＋ 添加 IP</button></li>' : R.map((x, k) => x.gone
      ? `<li class="und">已删除 ${q(x.ip || '空白行')}<button type="button" class="t" data-u="${k}">撤销</button></li>`
      : `<li class="r"><input class="inp" data-k="${k}" data-f="ip" value="${q(x.ip)}" aria-label="第 ${k + 1} 条 IP 或 CIDR" spellcheck="false"><input class="inp" data-k="${k}" data-f="note" value="${q(x.note)}" aria-label="第 ${k + 1} 条备注"><button type="button" class="del" data-k="${k}" aria-label="删除第 ${k + 1} 条">${TR}</button></li>`).join('');
    cnt.textContent = `${live} / ${MAX}`; add.hidden = !any; cols.hidden = !live; add.disabled = live >= MAX; add.title = live >= MAX ? `最多 ${MAX} 条` : '';
    if (focus) focus();
  };
  const doAdd = () => { R = R.filter((x) => !x.gone); R.push({ ip: '', note: '' }); draw(() => ol.querySelector('li:last-child input').focus()); };
  add.addEventListener('click', doAdd);
  ol.addEventListener('input', (e) => { const i = e.target; if (i.dataset.f) R[+i.dataset.k][i.dataset.f] = i.value; });
  ol.addEventListener('click', (e) => {
    const d = e.target.closest('.del'), u = e.target.closest('[data-u]');
    if (e.target.closest('[data-a="add"]')) doAdd();
    if (d) { const k = +d.dataset.k; R[k].gone = true; draw(() => ol.querySelector(`[data-u="${k}"]`).focus()); }
    if (u) { const k = +u.dataset.u; delete R[k].gone; draw(() => ol.querySelector(`input[data-k="${k}"]`).focus()); }
  });
  draw();
}
</script>
