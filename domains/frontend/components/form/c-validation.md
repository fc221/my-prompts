---
zh: 表单校验与错误提示
en: Form validation
order: 60
---

## 是什么

失焦时就地校验，错误写在字段下方；提交出错时聚焦第一个错误。

## 适合

所有收集输入的表单，尤其是有格式要求（邮箱、手机号）或需要服务端检查（重名、余额）的字段。

## 不适合

不要在用户还没输完时就标红；不要只在顶部弹一句“表单有误”；网络、权限故障不要伪装成字段错误，用区域提示。

## 要点

- 用组件库表单自带的校验，不自己比对正则再拼错误文字：Element Plus el-form rules + el-form-item prop（规则写 required、message、trigger: 'blur'，自定义用 validator(rule, value, callback) 或 asyncValidator）、Naive UI n-form rules + n-form-item path（规则写 required、message、trigger，validator 返回 boolean 或 Error，异步用 asyncValidator）、Ant Design Vue a-form rules + a-form-item name（规则写 required、message、trigger: 'blur'，validator 返回 Promise）
- 时机：规则的 trigger 只写 blur，不写 change 或 input，否则第一次输入到一半就标红；出错后要边输入边重新检查、修正后立刻消除，在输入事件里对已经出错的字段调 validateField(prop)（Element Plus）、validateFields([name])（Ant Design Vue）或 n-form-item 的 validate()（Naive UI）
- 错误写在组件自带的字段下方错误区，文案写清“发生了什么 + 怎么改”（“手机号应为 11 位数字”），边框变色由组件处理；预留一行高度不跳动：Naive UI 的 show-feedback 默认预留，Element Plus 的错误文字不占位，Ant Design Vue 出错会撑高，给 help 区留固定高度
- 服务端返回的字段错误直接塞回字段：Element Plus el-form-item error、Naive UI validation-status="error" + feedback、Ant Design Vue validateStatus="error" + help
- 服务端检查（名称重复）在字段内显示“检查中”，通过时给轻量对勾：Element Plus status-icon + validate-status（validating / success），Ant Design Vue hasFeedback + validateStatus（validating / success）；Naive UI 没有 validating 态，在 feedback 里写“检查中”，通过后 validation-status="success"
- 提交按钮不禁用（极简表单除外）：点提交调 validate()，失败后滚动并聚焦第一个错误（Element Plus scroll-to-error、Ant Design Vue scrollToFirstError；Naive UI 在回调里拿 errors 自己滚）；3 个以上错误时顶部给可点击的汇总
- 网络、权限故障不要伪装成字段错误，用区域提示；提交失败保留全部输入，不调 resetFields

## 提示词

给{注册表单}加校验：用项目组件库表单自带的校验（Element Plus el-form rules + el-form-item prop；Naive UI n-form rules + n-form-item path；Ant Design Vue a-form rules + a-form-item name），不手写比对和错误文字。规则 trigger 只写 blur，首次输入未完成不报错；出错后边输入边重新检查、修正立即消除（在输入事件里对已出错的字段调 validateField / validateFields / n-form-item 的 validate）；错误显示在组件自带的字段下方错误区，文案写“发生了什么 + 怎么改”，并预留一行高度防止跳动；“用户名”失焦后请求查重，期间显示检查中（validate-status / validateStatus 设 validating，Naive UI 在 feedback 写“检查中”），可用时显示对勾；服务端返回的字段错误用 error / feedback / help 塞回对应字段；点“注册”不禁用按钮，调 validate()，失败后滚动并聚焦第一个错误（scroll-to-error / scrollToFirstError），3 个以上错误时顶部显示可点击汇总；提交失败保留全部输入。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.s{background:#fff}
.w{width:100%;max-width:320px;display:flex;flex-direction:column;gap:16px}
.f{display:flex;flex-direction:column;gap:8px}
.b{display:flex;flex-direction:column;gap:4px}
.f .inp{width:100%}
.ib{position:relative}
.ib .inp{padding-right:36px}
.ic{position:absolute;right:12px;top:9px;width:14px;height:14px}
.ic.sp{border:2px solid #e3e6eb;border-top-color:#3b5bdb;border-radius:50%;animation:r .8s linear infinite}
.ic.yes::before{content:"✓";position:absolute;top:-5px;color:#12805c;font-weight:700}
@keyframes r{to{transform:rotate(1turn)}
}
@media (prefers-reduced-motion:reduce){.ic.sp{animation-duration:1.6s}
}
.b .bad::before{content:"!";display:inline-grid;place-items:center;width:14px;height:14px;margin-right:4px;border-radius:50%;background:#d92d20;color:#fff;font-size:12px;font-weight:700;line-height:1;vertical-align:-2px}
.ft{display:flex;align-items:center;gap:12px}
.ok{color:#12805c}
</style>

<div class="s"><form class="w" novalidate><div class="f"><label class="lab" for="u">用户名</label><div class="b"><div class="ib"><input class="inp" id="u" autocomplete="username" spellcheck="false" autocapitalize="off" aria-describedby="um"><span class="ic"></span></div><p class="help" id="um">4–16 位字母或数字（试试 admin）</p></div></div><div class="f xl"><label class="lab" for="ph">手机号</label><div class="b"><input class="inp" id="ph" inputmode="numeric" autocomplete="tel" aria-describedby="pm"><p class="help" id="pm">用于登录和找回密码</p></div></div><div class="ft"><button class="btn pri">注册</button><span class="help ok" role="status"></span></div></form></div>

<script type="module">
export default function demo(root) {
  const f = root.querySelector('form'), u = root.querySelector('#u'), um = root.querySelector('#um'), ic = root.querySelector('.ic'), ph = root.querySelector('#ph'), pm = root.querySelector('#pm'), ok = root.querySelector('.ok');
  const H = { u: um.textContent, p: pm.textContent }, touched = new Set(); let seq = 0;
  const mark = (inp, msg, text, err) => { inp.classList.toggle('err', err); inp.setAttribute('aria-invalid', String(err)); msg.classList.toggle('bad', err); msg.textContent = text; };
  const vu = () => { const v = u.value.trim(); return !v ? '请填写用户名' : /^[A-Za-z0-9]{4,16}$/.test(v) ? '' : '用户名需为 4–16 位字母或数字'; };
  const vp = () => { const v = ph.value.trim(); return !v ? '请填写手机号' : /^1\d{10}$/.test(v) ? '' : '手机号应为 11 位数字，以 1 开头'; };
  const checkU = (remote) => {
    const e = vu(); ic.className = 'ic'; if (e) { mark(u, um, e, true); return false; }
    if (u.value.trim().toLowerCase() === 'admin' && !remote) { mark(u, um, '“admin”已被占用，换一个试试', true); return false; }
    mark(u, um, H.u, false);
    if (remote) { const my = ++seq; ic.className = 'ic sp'; um.textContent = '检查中…'; setTimeout(() => { if (my !== seq || !root.host.isConnected) return; if (u.value.trim().toLowerCase() === 'admin') { ic.className = 'ic'; mark(u, um, '“admin”已被占用，换一个试试', true); } else { ic.className = 'ic yes'; um.textContent = '可以使用'; } }, 700); }
    return true;
  };
  const checkP = () => { const e = vp(); mark(ph, pm, e || H.p, !!e); return !e; };
  u.addEventListener('blur', () => { if (u.value) touched.add('u'); if (touched.has('u')) checkU(true); });
  u.addEventListener('input', () => { ok.textContent = ''; seq++; if (touched.has('u')) checkU(false); });
  ph.addEventListener('blur', () => { if (ph.value) touched.add('p'); if (touched.has('p')) checkP(); });
  ph.addEventListener('input', () => { ok.textContent = ''; if (touched.has('p')) checkP(); });
  f.addEventListener('submit', (e) => {
    e.preventDefault(); touched.add('u'); touched.add('p'); seq++;
    const okU = checkU(false), okP = ph.offsetParent ? checkP() : true;
    if (!okU) u.focus(); else if (!okP) ph.focus(); else ok.textContent = '注册成功（示例）';
  });
}
</script>
