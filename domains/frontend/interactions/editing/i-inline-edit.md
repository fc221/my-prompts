---
zh: 行内编辑
en: Inline edit
order: 10
---

## 是什么

在详情或表格里点一下值，就地变成输入框，回车保存、Esc 取消，不用弹窗。

## 适合

改名、改备注、改单个字段这类 1–4 个字段的轻量修改。

## 不适合

字段之间有依赖、需要一起校验，或超过 4 个字段时，用抽屉或编辑页。

## 注意

输入法选字时按下的回车不能触发保存。

## 要点

- 可编辑的值悬停时显示浅底和铅笔图标；触屏上图标常显。
- 进入编辑后输入框与原值同位置、同高度（如 32px），全选原内容，布局不跳动。
- Enter 保存、Esc 取消并恢复原值、失焦时有修改则保存；isComposing 为真或 keyCode 为 229 时不处理回车。
- 保存中输入框只读并显示“保存中…”；成功后值区闪一下浅绿约 1 秒。
- 校验失败时留在编辑态，边框变危险色并写出原因，不丢输入。
- 用键盘结束编辑后焦点回到该值；鼠标点别处结束时不抢焦点。
- 没有修改时不发请求。

## 提示词

把{详情页 / 表格}里的{字段}做成「行内编辑」：悬停显示铅笔图标，点击后原位变成同高的输入框并全选；Enter 保存、Esc 取消、失焦有修改则保存，输入法选字时的回车不触发；保存中只读并提示“保存中…”，成功后值区闪一下；校验失败留在编辑态并在旁边说明原因；没有修改不发请求；用键盘结束后焦点回到该值。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:12px 16px}
.box{width:100%;max-width:440px;margin:0;padding:4px 8px;background:#fff;border:1px solid #e3e6eb;border-radius:12px}
.r{display:grid;grid-template-columns:72px minmax(0,1fr);align-items:center;gap:8px;min-height:40px}
.r+.r{border-top:1px solid #e3e6eb}
dt{padding-left:6px;color:#5b616e}
dd{min-width:0;margin:0}
.v{display:flex;align-items:center;gap:6px;width:100%;height:32px;padding:0 8px;border:1px solid transparent;border-radius:6px;background:none;text-align:left}
.v span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.v svg{flex:none;width:14px;height:14px;fill:none;stroke:#5b616e;stroke-width:1.5;stroke-linejoin:round;opacity:.45;transition:opacity .1s}
.v:hover{background:#f5f6f8}
.v:hover svg,.v:focus-visible svg{opacity:1}
.v.saved{animation:fl 1.2s}
@keyframes fl{from{background:#e6f4ee}
}
.ed{display:block}
.ed input{width:100%;height:32px;padding:0 8px;border:1px solid #3b5bdb;border-radius:6px;outline:0;background:#fff;box-shadow:0 0 0 3px #edf1ff}
.ed.bad input{border-color:#d92d20;box-shadow:0 0 0 3px #fdecea}
.ed input[readonly]{background:#f5f6f8;color:#5b616e}
.tip{margin:0;color:#5b616e;font-size:12px}
.tip.err{color:#d92d20}
.tip.ok{color:#12805c}
@container (min-width:560px){.box{max-width:500px}
.r{grid-template-columns:96px minmax(0,1fr);min-height:50px}
}
</style>

<div class="st"><dl class="box"><div class="r"><dt>客户名称</dt><dd><button class="v" type="button" data-req="1"><span>杭州云帆科技有限公司</span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10.5 2.5l3 3L6 13H3v-3z"/></svg></button></dd></div><div class="r"><dt>联系电话</dt><dd><button class="v" type="button"><span>0571-8826 3310</span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10.5 2.5l3 3L6 13H3v-3z"/></svg></button></dd></div><div class="r"><dt>备注</dt><dd><button class="v" type="button"><span>每月 5 日前对账</span><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10.5 2.5l3 3L6 13H3v-3z"/></svg></button></dd></div></dl><p class="tip" id="tip" role="status">点值修改 · Enter 保存 · Esc 取消</p></div>

<script type="module">
export default function demo(root) {
  const tip = root.querySelector('.tip'), DEF = tip.textContent;
  const say = (t, c) => { tip.className = 'tip ' + (c || ''); tip.textContent = t; };
  const edit = (v) => {
    const span = v.querySelector('span'), old = span.textContent, label = v.closest('.r').querySelector('dt').textContent;
    const ed = document.createElement('span'); ed.className = 'ed'; ed.innerHTML = '<input aria-describedby="tip">';
    const inp = ed.firstChild; inp.value = old; inp.setAttribute('aria-label', label);
    v.replaceWith(ed); inp.focus({ preventScroll: true }); inp.select();
    let done = false;
    const finish = (save, refocus) => {
      if (done) return;
      const val = inp.value.trim();
      if (!save || val === old) { done = true; ed.replaceWith(v); if (refocus) v.focus(); say(DEF); return; } // 没改就不发请求
      if (v.dataset.req && !val) { ed.classList.add('bad'); inp.setAttribute('aria-invalid', 'true'); say(label + '不能为空', 'err'); return; }
      done = true; inp.readOnly = true; say('保存中…');
      setTimeout(() => {
        if (!root.host.isConnected) return;
        span.textContent = val; ed.replaceWith(v); v.classList.remove('saved'); void v.offsetWidth; v.classList.add('saved');
        if (refocus) v.focus(); say(`已保存「${label}」`, 'ok');
      }, 500);
    };
    inp.addEventListener('keydown', (e) => {
      if (e.isComposing || e.keyCode === 229) return; // 输入法选字中的回车只确认候选词
      if (e.key === 'Enter') { e.preventDefault(); finish(true, true); }
      if (e.key === 'Escape') { e.preventDefault(); finish(false, true); }
    });
    inp.addEventListener('blur', () => setTimeout(() => finish(true, false)));
    inp.addEventListener('input', () => { if (ed.classList.contains('bad')) { ed.classList.remove('bad'); inp.removeAttribute('aria-invalid'); say(DEF); } });
  };
  root.querySelectorAll('.v').forEach((v) => { v.onclick = () => edit(v); });
}
</script>
