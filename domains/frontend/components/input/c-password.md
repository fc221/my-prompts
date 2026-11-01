---
zh: 密码框
en: Password input
order: 50
---

## 是什么

输入显示为圆点，右侧按钮切换明文，下方逐条显示规则是否满足。

## 适合

登录、注册、修改密码、填写需要保密的令牌。

## 不适合

不要用“再输入一次密码”代替显示切换；验证码不用密码框；不要禁止粘贴，会妨碍密码管理器。

## 要点

- 用组件库的密码框：Element Plus el-input type="password" show-password，Naive UI n-input type="password" show-password-on="click"，Ant Design Vue a-input-password（visibilityToggle 默认开）；眼睛按钮、切换后焦点不跳由组件负责
- autocomplete 要自己传，组件不会猜：登录用 current-password，注册和改密用 new-password（Element Plus 直接写 autocomplete，Naive UI 用 input-props，Ant Design Vue 写在 a-input-password 上透传）；同时关掉拼写检查和自动大写（spellcheck="false"、autocapitalize="off"）
- 注册时规则写在框下方（至少 8 位、包含字母和数字），满足一条勾一条，边输入边更新；组件库没有现成的，用表单项的说明区自己列，不要等提交后才报错
- 大写锁定提示组件库没有：监听 keydown 的 getModifierState('CapsLock')，在框下提示“大写锁定已打开”
- 强度提示只做辅助，用“弱 / 中 / 强”文字，不只靠颜色；组件库没有现成的
- 错误文字走表单项的校验提示；允许粘贴

## 提示词

把{注册页的“设置密码”}做成密码框：用项目组件库自带的密码框（Element Plus el-input type="password" show-password；Naive UI n-input type="password" show-password-on="click"；Ant Design Vue a-input-password），不手写眼睛按钮。autocomplete="new-password"（登录页改 current-password），关闭拼写检查和自动大写；框下逐条列出规则（至少 8 位、包含字母和数字），满足一条勾一条，边输入边更新；监听 CapsLock 时提示“大写锁定已打开”；允许粘贴；错误文字走表单项的校验提示；窄屏撑满。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{width:100%;max-width:300px;display:flex;flex-direction:column;gap:8px}
.b{display:flex;flex-direction:column;gap:4px}
.pw{position:relative;display:flex}
.pw .inp{flex:1;padding-right:40px}
.eye{position:absolute;right:4px;top:4px;display:grid;place-items:center;width:24px;height:24px;padding:0;border:0;border-radius:4px;background:none;color:#5b616e;cursor:pointer}
.eye:hover{background:#f5f6f8;color:#1f2329}
.eye[aria-pressed=true]{color:#3b5bdb}
.rules{display:flex;flex-wrap:wrap;gap:0 16px;margin:0;padding:0;list-style:none;font-size:12px;line-height:20px;color:#5b616e}
.rules li::before{content:"○";display:inline-block;width:16px}
.rules .ok{color:#12805c}
.rules .ok::before{content:"✓"}
</style>

<div class="s"><div class="w"><label class="lab" for="p">设置密码</label><div class="b"><div class="pw"><input class="inp" id="p" type="password" autocomplete="new-password" spellcheck="false" autocapitalize="off" aria-describedby="pr pc"><button type="button" class="eye" aria-label="显示密码" aria-pressed="false"><svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8z"/><circle cx="8" cy="8" r="2"/></svg></button></div><ul class="rules" id="pr"><li data-r="len">至少 8 位</li><li data-r="mix">包含字母和数字</li></ul><p class="help warn" id="pc" hidden>大写锁定已打开</p></div></div></div>

<script type="module">
export default function demo(root) {
  const p = root.querySelector('#p'), eye = root.querySelector('.eye'), caps = root.querySelector('#pc');
  const test = { len: (v) => v.length >= 8, mix: (v) => /[a-z]/i.test(v) && /\d/.test(v) };
  p.addEventListener('input', () => root.querySelectorAll('.rules li').forEach((li) => li.classList.toggle('ok', test[li.dataset.r](p.value))));
  const capsCheck = (e) => { if (e.getModifierState) caps.hidden = !e.getModifierState('CapsLock'); };
  p.addEventListener('keydown', capsCheck); p.addEventListener('keyup', capsCheck);
  eye.addEventListener('click', () => { const show = p.type === 'password'; p.type = show ? 'text' : 'password'; eye.setAttribute('aria-pressed', String(show)); eye.setAttribute('aria-label', show ? '隐藏密码' : '显示密码'); });
}
</script>
