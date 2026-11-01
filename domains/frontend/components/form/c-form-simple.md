---
zh: 简单表单
en: Simple form
order: 10
---

## 是什么

5–7 个字段单列排开，标签在上，底部一个写明动作的主按钮。

## 适合

新建或编辑一个对象的少量字段，放在弹窗、抽屉或页面里。

## 不适合

5 个字段不要加分组标题、卡片和吸底栏；1–4 个字段能就地编辑就别弹窗；超过 15 个字段改用复杂长表单。

## 要点

- 用组件库的表单：Element Plus el-form（model、rules、label-position="top"）+ el-form-item（prop、label）、Naive UI n-form（model、rules、label-placement="top"）+ n-form-item（path、label）、Ant Design Vue a-form（model、rules、layout="vertical"）+ a-form-item（name、label）；不手写 label 加 input
- 单列、标签在上；字段间距页面 24px、弹窗和抽屉 16px，改表单项的外边距变量统一调，不逐个写 margin
- 只有逻辑上一体的 2–3 个短字段才同行（起止日期、区号和电话）：用 el-row / el-col、n-grid + n-form-item-gi、a-row / a-col 分列，同行顶部对齐
- 必填和可选只标少数的一方，全产品一致：多数必填就关掉星号（Element Plus hide-required-asterisk、Naive UI show-require-mark=false、Ant Design Vue hideRequiredMark），在可选字段的标签里写“（可选）”；红色只表示错误
- 输入框宽度按内容取档，给控件设宽度，不让表单项全部拉满；页面里的表单内容宽 560–720px，不随屏幕拉满
- 按钮在底部：页面里左对齐、主按钮在最左；弹窗里右对齐、主按钮在最右；最后一个字段到按钮 24–32px
- 桌面端打开时聚焦第一个字段（输入框的 autofocus 或打开后调 focus()），移动端不自动聚焦；单行输入里按 Enter 提交；校验写法见「表单校验与错误提示」

## 提示词

把{新建成员弹窗}做成简单表单：用项目组件库自带的表单（Element Plus el-form label-position="top" + el-form-item prop；Naive UI n-form label-placement="top" + n-form-item path；Ant Design Vue a-form layout="vertical" + a-form-item name），不手写标签和输入框。姓名、邮箱、手机号、所属部门、角色 5 个字段单列排列，标签在上方，字段间距 16px，宽度按内容取档；多数必填，关掉必填星号，只给可选字段标“（可选）”；格式要求写在字段下方的帮助文字里；底部右对齐“取消”和“{添加成员}”，主按钮在最右；打开时聚焦第一个字段，Enter 提交；失焦和提交时用表单自带的校验，错误显示在字段下方并聚焦第一个错误；窄屏改全屏，按钮撑满。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.s{background:#fff}
.w{width:100%;max-width:380px;display:flex;flex-direction:column;gap:16px}
.f{display:flex;flex-direction:column;gap:8px}
.b{display:flex;flex-direction:column;gap:4px}
.f .inp{width:100%}
.ft{display:flex;align-items:center;justify-content:flex-end;gap:8px;margin-top:8px}
.st{margin-right:auto;color:#12805c}
</style>

<div class="s"><form class="w" novalidate><div class="f xl"><label class="lab" for="nm">姓名</label><input class="inp" id="nm" autocomplete="name" value="王小明"></div><div class="f"><label class="lab" for="em">邮箱</label><div class="b"><input class="inp" id="em" type="email" autocomplete="email" spellcheck="false" autocapitalize="off" placeholder="name@company.com" aria-describedby="eh"><p class="help" id="eh">邀请链接会发到这个邮箱</p></div></div><div class="ft"><span class="help st" role="status"></span><button type="button" class="btn">取消</button><button class="btn pri">添加成员</button></div></form></div>

<script type="module">
export default function demo(root) {
  const f = root.querySelector('form'), em = root.querySelector('#em'), eh = root.querySelector('#eh'), st = root.querySelector('.st'), tip = eh.textContent; let tried = false;
  const check = () => {
    const v = em.value.trim(), msg = !v ? '请填写邮箱' : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : '邮箱格式不对，例如 name@company.com';
    em.classList.toggle('err', !!msg); em.setAttribute('aria-invalid', String(!!msg)); eh.classList.toggle('bad', !!msg); eh.textContent = msg || tip; return !msg;
  };
  em.addEventListener('blur', () => { if (em.value) { tried = true; check(); } });
  em.addEventListener('input', () => { st.textContent = ''; if (tried) check(); });
  f.addEventListener('submit', (e) => { e.preventDefault(); tried = true; if (!check()) { em.focus(); return; } st.textContent = '已发送邀请'; });
}
</script>
