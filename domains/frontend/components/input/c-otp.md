---
zh: 验证码输入框
en: One-time code input
aka: 验证码 短信验证码 OTP 分格输入 一次性密码 动态码
order: 15
---

## 是什么

一排分格的输入框，一格一位，用来填短信或邮件里的一次性验证码；填满就自动校验。

## 适合

登录、注册、换绑手机号，以及付款、改密码前的二次验证，验证码 4–8 位。

## 不适合

更长的激活码、兑换码用普通「输入框」；密码用「密码框」。

## 注意

自己做时用一个 input 接收输入，格子只是画出来的样子。做成 6 个 maxlength="1" 的输入框，短信自动填充和粘贴都会把整串塞进第一格，被截得只剩一位。

## 要点

- 用组件库的验证码输入：Element Plus el-input-otp（2.14.0 起，beta；v-model 是字符串，length 默认 6，inputmode、mask、validator、size、separator，填满触发 finish，暴露 focus(index)），Naive UI n-input-otp（2.41.1 起；值是字符串数组，提交前 join，length 默认 6，allow-input、mask、status、size、block，填满触发 on-finish，2.43.0 起有 focusOnChar）；两家都自带整串粘贴铺满、退格回上一格、方向键换格。Ant Design Vue 4.x 没有，用一个 input 自己画成分格
- 手机键盘：autocomplete="one-time-code" 让键盘上方直接出现短信里的验证码，一点就填满；纯数字码加 inputmode="numeric" 弹数字键盘，不用 type="number"。Element Plus 已自带 autocomplete，inputmode 要自己传；Naive UI 两个都要加：用 default 插槽渲染 n-input，从 input-props 传进去
- 值按字符串存，存成数字会丢掉开头的 0；只放行数字（Element Plus 写 validator，Naive UI 写 allow-input），粘贴“482 915”这类带空格的整串时，空格和横线被跳过，数字从第一格铺满
- 填满就提交，不用再点按钮：提交中整组只读（readonly），下方写“正在验证…”；失败时清空、聚焦第一格（focus(0) / focusOnChar(0)），格子下方写原因并用 role="alert" 播报，如“验证码不对，还能试 2 次”“验证码已过期，请重新获取”，Naive UI 同时给 status="error"
- 上方写发到了哪：“验证码已发送至 138 **** 6025”，只露前三位和后四位，旁边放“换号码”回到上一步
- 重发按钮发送后禁用并倒数：“60 秒后重新获取”，按发送时间算，刷新页面不会从 60 重来；重新获取后清空格子和错误
- 格子 40–48px 见方，手机上不小于 44px，格间 8px，窄屏先把间距收到 4px，不换行；数字 20–24px、等宽；当前格描边加深并显示光标

## 提示词

把{登录页}的短信验证做成验证码输入框：用项目组件库自带的验证码输入（Element Plus el-input-otp，2.14.0 起；Naive UI n-input-otp，2.41.1 起），不手写一排独立的输入框；Ant Design Vue 没有，用一个 input 接收输入，再画成 {6} 格。{6} 位纯数字，值按字符串存，只放行数字（validator / allow-input）；加 autocomplete="one-time-code" 和 inputmode="numeric"（Element Plus 自带前者；Naive UI 用 default 插槽给 n-input 传 input-props）。粘贴或自动填充整串时铺满所有格，退格回到上一格；填满自动提交（finish / on-finish），提交中只读并显示“正在验证…”；失败时清空、聚焦第一格（focus(0) / focusOnChar(0)），在格子下方写原因并用 role="alert" 播报：验证码不对时写还能试几次，过期时提示重新获取。上方写“验证码已发送至 {138 **** 6025}”，旁边放“换号码”；重发按钮倒计时 {60} 秒，按发送时间计算，刷新页面不重来。格子 48px 见方，手机上不小于 44px，间距 8px，窄屏先收间距，不换行。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{width:100%;max-width:336px;display:flex;flex-direction:column;gap:8px}
.w>b{font-size:16px;line-height:24px}
.to{display:flex;flex-wrap:wrap;align-items:center;gap:0 8px}
.lnk{height:20px;padding:0;border:0;background:none;color:#3b5bdb;font-size:12px;cursor:pointer}
.otp{position:relative;display:grid;grid-template-columns:repeat(6,minmax(0,48px));gap:8px}
.otp input{position:absolute;inset:0;width:100%;height:100%;padding:0;border:0;opacity:0;font-size:16px;cursor:text}
.cell{aspect-ratio:1;display:grid;place-items:center;border:1px solid #868c98;border-radius:6px;background:#fff;font-size:20px;font-weight:600;font-variant-numeric:tabular-nums}
.otp:not(.busy,.ok):focus-within .cur{border-color:#3b5bdb;box-shadow:inset 0 0 0 1px #3b5bdb,0 0 0 3px #dfe6ff}
.otp:not(.busy,.ok):focus-within .cur:empty::after{content:"";width:2px;height:20px;background:#3b5bdb;animation:bl 1s steps(1) infinite}
@keyframes bl{50%{opacity:0}}
.busy .cell{background:#f5f6f8;color:#5b616e}
.ok .cell{border-color:#12805c;color:#12805c}
.okc{color:#12805c}
.sp{display:inline-block;width:12px;height:12px;margin-right:6px;border:2px solid #c5cad3;border-top-color:#3b5bdb;border-radius:50%;vertical-align:-2px;animation:r .8s linear infinite}
@keyframes r{to{transform:rotate(1turn)}}
.re{align-self:flex-start;height:28px;padding:0;border:0;background:none;color:#3b5bdb;font-size:13px;cursor:pointer}
.re:disabled{color:#5b616e;cursor:default}
.kb{height:32px;border:0;border-radius:8px;background:#e4e6eb;color:#1f2329;font-size:13px;cursor:pointer}
.kb:hover{background:#d9dce3}
.kb b{margin-left:6px;font-variant-numeric:tabular-nums}
@container (min-height:260px){.cell{font-size:24px}}
@media (prefers-reduced-motion:reduce){.cur:empty::after{animation:none!important}.sp{animation-duration:1.6s}}
</style>

<div class="s"><div class="w"><b class="xl">输入验证码</b><p class="help to"><span id="to">验证码已发送至 138 **** 6025</span><button type="button" class="lnk">换号码</button></p><div class="otp"><input id="code" autocomplete="one-time-code" inputmode="numeric" aria-label="短信验证码，6 位数字" aria-describedby="to msg"><span class="cell" aria-hidden="true"></span><span class="cell" aria-hidden="true"></span><span class="cell" aria-hidden="true"></span><span class="cell" aria-hidden="true"></span><span class="cell" aria-hidden="true"></span><span class="cell" aria-hidden="true"></span></div><p class="help" id="msg" role="alert">验证码 5 分钟内有效</p><button type="button" class="re" disabled></button><button type="button" class="kb xl" aria-label="模拟键盘上方的短信验证码建议">键盘建议 · 来自短信<b>482915</b></button></div></div>

<script type="module">
export default function demo(root) {
  const inp = root.querySelector('#code'), box = root.querySelector('.otp'), cells = [...root.querySelectorAll('.cell')];
  const msg = root.querySelector('#msg'), re = root.querySelector('.re'), kb = root.querySelector('.kb');
  let code = '482915', tries = 3, sec = 56, timer = 0;
  const say = (html, cls = '') => { msg.className = 'help ' + cls; msg.innerHTML = html; };
  const paint = () => cells.forEach((c, i) => { c.textContent = inp.value[i] || ''; c.classList.toggle('cur', i === Math.min(inp.value.length, 5)); });
  const label = () => { re.disabled = sec > 0; re.textContent = sec > 0 ? `${sec} 秒后重新获取` : '重新获取验证码'; };
  const count = () => {
    clearInterval(timer); label();
    timer = setInterval(() => {
      if (!re.isConnected) return clearInterval(timer);
      sec--; label();
      if (sec <= 0) clearInterval(timer);
    }, 1000);
  };
  const check = (v) => {
    inp.readOnly = true; box.classList.add('busy'); say('<span class="sp"></span>正在验证…');
    setTimeout(() => {
      box.classList.remove('busy');
      if (v === code) { box.classList.add('ok'); say('验证通过，正在登录…', 'okc'); return; }
      tries--; inp.value = ''; paint();
      if (!tries) return say('错误次数太多，请重新获取验证码', 'bad');
      inp.readOnly = false; inp.focus(); say(`验证码不对，还能试 ${tries} 次`, 'bad');
    }, 900);
  };
  inp.addEventListener('input', () => {
    inp.value = inp.value.replace(/\D/g, '').slice(0, 6); // 整串粘贴或自动填充时去掉空格和横线
    paint();
    if (inp.value.length === 6) check(inp.value);
  });
  const toEnd = () => inp.setSelectionRange(inp.value.length, inp.value.length); // 只在末尾输入，退格就是回到上一格
  inp.addEventListener('focus', toEnd);
  inp.addEventListener('click', toEnd);
  inp.addEventListener('keydown', (e) => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) e.preventDefault(); });
  kb.addEventListener('click', () => { if (inp.readOnly) return; inp.value = code; inp.dispatchEvent(new Event('input')); });
  re.addEventListener('click', () => {
    code = String(100000 + Math.floor(Math.random() * 900000)); kb.querySelector('b').textContent = code;
    tries = 3; sec = 60; inp.readOnly = false; inp.value = ''; box.classList.remove('ok'); paint(); count();
    say('已重新发送，5 分钟内有效'); inp.focus();
  });
  root.querySelector('.lnk').addEventListener('click', () => say('回到上一步修改手机号，已填的号码保留'));
  paint(); count();
  // 挂载后自动填前 4 位，停在第 5 格
  const head = code.slice(0, 4);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { inp.value = head; return paint(); }
  [...head].forEach((d, i) => setTimeout(() => { if (inp.isConnected && !inp.readOnly && inp.value.length === i) { inp.value += d; paint(); } }, 300 + i * 260));
}
</script>
