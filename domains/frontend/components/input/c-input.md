---
zh: 输入框
en: Text input
order: 10
---

## 是什么

单行文字输入，可带前后缀、清除按钮和字数计数。

## 适合

名称、邮箱、链接、金额等单行短文本。

## 不适合

可能超过一行的内容用文本域；选项固定的值用选择控件；生日、年份这类倒背如流的值直接输入，不做成长下拉。

## 要点

- 高 32px（紧凑 28px、宽松 40px、触屏 44px），左右内边距 12px；字号同正文，触屏 16px 防止页面缩放
- 标签常驻在上方，距输入框 8px；帮助文字在下方 4px、12px 次要色；placeholder 只写示例，不代替标签
- 前后缀（¥、https://、.com、单位）放在框内或贴边的灰底附加块里，离边框 12px，不随输入滚走
- 有内容时显示清除按钮，离右边框 8px，aria-label“清除”，清除后焦点留在输入框
- 有长度上限时在标签行右端或框下右侧显示“12 / 40”，超出变危险色并提示，不截断已输入内容
- 状态：默认、悬停（边框加深）、聚焦（主色边框 + 浅色光晕）、禁用、只读、错误（危险色边框 + 下方错误文字）
- 宽度按内容取档：特短 80–120px、短 160–200px、中 260–360px、长 480–560px 或撑满；窄屏一律撑满

## 提示词

把{创建项目表单的“访问地址”}做成输入框：标签在上方，框内前缀“https://”、后缀“{.com}”，高 32px（触屏 44px、字号 16px），左右内边距 12px；有内容时显示清除按钮（aria-label“清除”，清除后焦点留在框内）；标签行右端显示“已输入 / 上限”，超出变红但不截断；默认、悬停、聚焦、禁用、只读、错误六态齐全，错误文字在框下方并用 aria-describedby 关联；窄屏宽度撑满。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{width:100%;max-width:320px;display:flex;flex-direction:column;gap:16px}
.f{display:flex;flex-direction:column;gap:8px}
.lr{display:flex;justify-content:space-between;align-items:baseline}
.cnt{font-variant-numeric:tabular-nums}
.box{position:relative;display:flex}
.box .inp{flex:1;padding-right:36px}
.clr{position:absolute;right:4px;top:4px;display:grid;place-items:center;width:24px;height:24px;padding:0;border:0;border-radius:4px;background:none;color:#8a909c;cursor:pointer}
.clr:hover{color:#1f2329;background:#f5f6f8}
.grp{display:flex}
.grp .inp{flex:1;width:0;border-radius:0}
.ad{display:inline-flex;align-items:center;padding:0 12px;border:1px solid #c9ced6;background:#f5f6f8;color:#5b616e}
.ad:first-child{border-right:0;border-radius:6px 0 0 6px}
.ad:last-child{border-left:0;border-radius:0 6px 6px 0}
</style>

<div class="s"><div class="w"><div class="f"><div class="lr"><label class="lab" for="n">项目名称</label><span class="help cnt" aria-live="polite"></span></div><div class="box"><input class="inp" id="n" value="官网改版" autocomplete="off"><button class="clr" type="button" aria-label="清除"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7"/></svg></button></div></div><div class="f"><label class="lab" for="u">访问地址</label><div class="grp"><span class="ad">https:&#47;&#47;</span><input class="inp" id="u" placeholder="my-site" spellcheck="false" autocapitalize="off"><span class="ad">.com</span></div></div></div></div>

<script type="module">
export default function demo(root) {
  const i = root.querySelector('#n'), c = root.querySelector('.cnt'), x = root.querySelector('.clr');
  const up = () => { const n = [...i.value].length, over = n > 20; c.textContent = over ? `${n} / 20，超出 ${n - 20} 字` : `${n} / 20`; c.classList.toggle('bad', over); i.classList.toggle('err', over); i.setAttribute('aria-invalid', String(over)); x.hidden = !n; };
  i.addEventListener('input', up);
  x.addEventListener('click', () => { i.value = ''; up(); i.focus(); });
  up();
}
</script>
