---
zh: 数字输入
en: Number input
order: 40
---

## 是什么

只接受数值的输入框，带单位后缀，小范围整数可加步进按钮。

## 适合

数量、金额、百分比、额度、超时时间等有范围和精度的数值。

## 不适合

近似值（音量、透明度）用滑块；手机号、验证码、卡号虽然是数字但不是数值，用普通输入框加 inputmode="numeric"。

## 要点

- 用 type="text" + inputmode="decimal"（整数用 numeric），不用 type="number"：滚轮会误改值，格式也不可控
- 单位写在后缀（元、%、秒、件），离右边框 12px；金额前缀 ¥；数值用等宽数字
- 设置最小、最大、步长；步进按钮只用于小范围整数，宽 32px，到边界时禁用该方向
- 允许直接输入，失焦后按精度格式化千分位，聚焦时去掉千分位方便修改
- 超出范围就地提示“最大 99 件”，不悄悄改成边界值
- 键盘：上下方向键加减一个步长，Shift+方向键加减 10 倍

## 提示词

把{商品编辑页的“库存”和“售价”}做成数字输入：库存是 0–9999 的整数，两侧带“−”“+”步进按钮（各 32px），到边界时禁用对应按钮，上下方向键加减 1、Shift 加减 10；售价前缀“¥”、保留两位小数，失焦后格式化千分位、聚焦时去掉千分位；都用 type="text" 加 inputmode，不用 type="number"；超出范围在框下提示“最大 9999”，不悄悄改值；宽 160–200px，高 32px，触屏 44px。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{display:flex;flex-wrap:wrap;justify-content:center;gap:16px 24px}
.f{display:flex;flex-direction:column;gap:8px;width:128px}
.b{display:flex;flex-direction:column;gap:4px}
.stp{display:flex}
.stp .inp{flex:1;width:0;border-radius:0;text-align:center;font-variant-numeric:tabular-nums}
.sb{width:32px;height:32px;padding:0;border:1px solid #c9ced6;background:#fff;color:#1f2329;font-size:16px;cursor:pointer}
.sb:first-child{border-right:0;border-radius:6px 0 0 6px}
.sb:last-child{border-left:0;border-radius:0 6px 6px 0}
.sb:hover{background:#f5f6f8}
.sb:disabled{color:#c9ced6;background:#fff;cursor:not-allowed}
.af{position:relative;display:flex}
.af span{position:absolute;left:12px;top:5px;color:#5b616e}
.af .inp{flex:1;width:0;padding-left:28px;text-align:right;font-variant-numeric:tabular-nums}
@container (max-width:290px){.w{gap:16px 12px}
.f{width:120px}
}
</style>

<div class="s"><div class="w"><div class="f"><label class="lab" for="q">库存数量</label><div class="b"><div class="stp"><button type="button" class="sb" aria-label="减少" data-d="-1">−</button><input class="inp" id="q" inputmode="numeric" value="3" aria-describedby="qe"><button type="button" class="sb" aria-label="增加" data-d="1">+</button></div><p class="help" id="qe"></p></div></div><div class="f"><label class="lab" for="m">售价</label><div class="b"><div class="af"><span aria-hidden="true">¥</span><input class="inp" id="m" inputmode="decimal" value="1299" aria-describedby="me"></div><p class="help" id="me">自动保留两位小数</p></div></div></div></div>

<script type="module">
export default function demo(root) {
  const q = root.querySelector('#q'), qe = root.querySelector('#qe'), [dn, upb] = root.querySelectorAll('.sb'), m = root.querySelector('#m');
  const check = () => {
    const ok = /^\d+$/.test(q.value), n = +q.value, bad = !ok || n > 99;
    q.classList.toggle('err', bad); q.setAttribute('aria-invalid', String(bad)); qe.classList.toggle('bad', bad);
    qe.textContent = !ok ? '请输入整数' : n > 99 ? '最大 99 件' : '0–99 件';
    dn.disabled = !ok || n <= 0; upb.disabled = !ok || n >= 99;
  };
  const step = (d) => { q.value = Math.min(99, Math.max(0, (parseInt(q.value, 10) || 0) + d)); check(); };
  root.querySelectorAll('.sb').forEach((b) => b.addEventListener('click', () => step(+b.dataset.d)));
  q.addEventListener('input', check);
  q.addEventListener('keydown', (e) => { if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); step((e.shiftKey ? 10 : 1) * (e.key === 'ArrowUp' ? 1 : -1)); } });
  const fmt = () => { const n = parseFloat(m.value.replace(/,/g, '')); if (!isNaN(n)) m.value = n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  m.addEventListener('blur', fmt); m.addEventListener('focus', () => { m.value = m.value.replace(/,/g, ''); });
  fmt(); check();
}
</script>
