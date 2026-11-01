---
zh: 离开前未保存提示
en: Unsaved changes guard
order: 40
---

## 是什么

表单改过还没保存时，标题旁显示“有未保存的修改”；这时点返回或切走，先弹框问“保存 / 不保存 / 继续编辑”。

## 适合

编辑页、设置页、长表单、富文本编辑器等离开会丢内容的地方。

## 注意

只在真的有改动时拦（改回原值就不算）；保存成功或主动放弃后不再拦。

## 要点

- 和初始值逐项比较判断“有改动”；改回原值时恢复成无改动。
- 有改动时标题旁显示“有未保存的修改”，保存按钮可用；无改动时保存按钮不可用但仍可见。
- 站内跳转（返回、点导航、切换 Tab）时弹应用内对话框：“保存并离开 / 不保存 / 继续编辑”，默认焦点在“继续编辑”，Esc 等于继续编辑。
- 刷新、关闭标签页时用 beforeunload 让浏览器弹原生提示（文案浏览器决定），只在有改动时注册。
- “保存并离开”保存失败时留在原页并说明原因，不丢弃内容。
- 自动保存的页面不需要这个提示，改为显示保存状态。

## 提示词

给{编辑页}加「离开前未保存提示」：和初始值逐项比较判断是否有改动（改回原值不算）；有改动时标题旁显示“有未保存的修改”、保存按钮可用；站内跳转（返回、导航、切 Tab）时弹应用内对话框“保存并离开 / 不保存 / 继续编辑”，默认焦点在“继续编辑”，Esc 等于继续编辑；刷新或关闭标签页时只在有改动时用 beforeunload 拦截；保存失败留在原页并说明原因；保存成功或放弃后不再拦。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:14px 18px}
.pg,.left{max-width:440px;margin:0 auto;display:grid;gap:10px}
.left{justify-items:center;padding-top:30px;color:#5b616e}
.left p{margin:0}
.hd{display:flex;align-items:center;justify-content:space-between}
.dirty{color:#b45309;font-size:12px;background:#fef3c7;padding:2px 8px;border-radius:99px}
label{display:grid;gap:4px;font-weight:500}
input{min-width:0;height:34px;padding:0 10px;border:1px solid #c9ced6;border-radius:8px;background:#fff;font-weight:400}
.ft{display:flex;align-items:center;gap:10px}
.save{height:34px;padding:0 16px;border:0;border-radius:8px;background:#3b5bdb;color:#fff;font-weight:600}
.save:disabled{background:#c9d2f0;cursor:not-allowed}
.msg{color:#16a34a}
.mask{position:absolute;inset:0;display:grid;place-items:center;background:rgba(15,23,42,.35)}
.dlg{width:min(340px,90%);display:grid;gap:8px;padding:18px;border-radius:14px;background:#fff;box-shadow:0 24px 48px -16px rgba(15,23,42,.4)}
.dlg p{margin:0;color:#5b616e}
.ops{display:flex;justify-content:flex-end;gap:8px;margin-top:6px}
@container (max-height:240px){.pg{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px 10px}
.hd,.ft{grid-column:1/-1}
}
.ctl.pri{background:#3b5bdb;border-color:#3b5bdb;color:#fff}
</style>

<div class="st"><div class="pg"><div class="hd"><button type="button" class="ctl back">‹ 返回客户列表</button><span class="dirty" hidden>有未保存的修改</span></div><label>客户名称<input class="f" value="林知科技有限公司"></label><label>联系电话<input class="f" value="0571-8826 3310"></label><div class="ft"><button type="button" class="save" disabled>保存</button><span class="msg" role="status"></span></div></div><div class="left" hidden><p>已离开编辑页（示例）</p><button type="button" class="ctl re">回到编辑</button></div><div class="mask" hidden><div class="dlg" role="dialog" aria-modal="true" aria-labelledby="dt"><b id="dt">有未保存的修改</b><p>离开后，刚才填写的内容会丢失。</p><div class="ops"><button type="button" class="ctl" data-a="discard">不保存</button><button type="button" class="ctl" data-a="stay">继续编辑</button><button type="button" class="ctl pri" data-a="save">保存并离开</button></div></div></div></div>

<script type="module">
export default function demo(root) {
  const fs = [...root.querySelectorAll('.f')], init = fs.map((f) => f.value), dirty = root.querySelector('.dirty'), save = root.querySelector('.save'), msg = root.querySelector('.msg'), mask = root.querySelector('.mask'), pg = root.querySelector('.pg'), left = root.querySelector('.left'), back = root.querySelector('.back');
  const isDirty = () => fs.some((f, i) => f.value !== init[i]);
  const sync = () => { const d = isDirty(); dirty.hidden = !d; save.disabled = !d; if (d) msg.textContent = ''; };
  const leave = () => { mask.hidden = true; pg.hidden = true; left.hidden = false; root.querySelector('.re').focus(); };
  const commit = () => { fs.forEach((f, i) => { init[i] = f.value; }); sync(); };
  fs.forEach((f) => f.addEventListener('input', sync));
  save.addEventListener('click', () => { commit(); msg.textContent = '已保存'; });
  back.addEventListener('click', () => { if (!isDirty()) return leave(); mask.hidden = false; mask.querySelector('[data-a=stay]').focus(); });
  mask.addEventListener('click', (e) => { const a = e.target.closest('[data-a]')?.dataset.a; if (!a) return; if (a === 'stay') { mask.hidden = true; back.focus(); } if (a === 'discard') { fs.forEach((f, i) => { f.value = init[i]; }); sync(); leave(); } if (a === 'save') { commit(); leave(); } });
  mask.addEventListener('keydown', (e) => { if (e.key === 'Escape') { mask.hidden = true; back.focus(); } });
  root.querySelector('.re').addEventListener('click', () => { left.hidden = true; pg.hidden = false; msg.textContent = ''; back.focus(); });
}
</script>
