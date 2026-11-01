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

- 用组件库的输入框：Element Plus el-input（clearable、maxlength + show-word-limit、prefix / suffix / prepend / append 插槽、size），Naive UI n-input（clearable、maxlength + show-count、prefix / suffix 插槽，贴边附加块用 n-input-group + n-input-group-label，status），Ant Design Vue a-input（allowClear、maxlength + showCount、prefix / suffix / addonBefore / addonAfter、status）；高度、内边距、聚焦样式用组件默认
- 标签常驻上方，用表单的属性而不是自己排：Element Plus el-form label-position="top"，Naive UI n-form label-placement="top"（默认就是），Ant Design Vue a-form layout="vertical"；帮助文字和错误文字走表单项，不另写一行
- placeholder 只写示例（“如 https://example.com”），不代替标签
- 前后缀分两种：单位、货币符号放框内（prefix / suffix）；https://、.com 这类固定片段放贴边附加块（prepend / append、n-input-group-label、addonBefore / addonAfter）
- 清除按钮要显式打开（clearable / allowClear），三家默认都关着；清除后焦点留在框内，组件已处理
- 字数：设了 maxlength 组件会直接截断，再加 show-word-limit / show-count / showCount 显示“12 / 40”；要“超出标红但不截断”就不设 maxlength，自己算字数并在校验里报错，两种选一种
- 默认、悬停、聚焦、禁用、只读由组件负责；错误态配表单校验（el-form-item 的 error，n-form-item 的 validation-status + feedback，a-form-item 的 validateStatus + help），不要只改边框颜色
- 宽度按内容取档：特短 80–120px、短 160–200px、中 260–360px、长 480–560px 或撑满；窄屏一律撑满；触屏字号 16px，组件默认 14 要覆盖

## 提示词

把{创建项目表单的“访问地址”}做成输入框：用项目组件库自带的输入框（Element Plus el-input clearable；Naive UI n-input clearable；Ant Design Vue a-input allowClear），不手写。标签在上方（label-position="top" / label-placement="top" / layout="vertical"）；前缀“https://”、后缀“{.com}”放贴边附加块（prepend / append、n-input-group-label、addonBefore / addonAfter）；placeholder 只写示例；字数上限 {40}：{用 maxlength + show-word-limit / show-count / showCount 直接截断 / 不设 maxlength，超出标红并在校验里报错}；错误文字走表单项的校验提示，不只改边框颜色；宽度取{中档 260–360px}，窄屏撑满，触屏字号 16px。

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
