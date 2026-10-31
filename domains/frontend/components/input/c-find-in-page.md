---
zh: 页内查找
en: Find in page
aka: 文内查找 全文定位 高亮匹配 关键词定位
order: 35
---

## 是什么

长文或协议顶部的查找条：高亮全部匹配，当前这处颜色更深，写着“第 3 / 12 处”，上下跳转，Esc 关闭。

## 适合

合同、协议、文档阅读器、日志和代码查看器，尤其是内容在内部滚动、虚拟滚动或折叠区里，浏览器自带查找找不全的时候。

## 不适合

普通网页用浏览器自带查找就够；在一堆记录里按关键词过滤用「搜索框」；跨页面找东西用「命令面板」。

## 注意

跳转时算好偏移量，只滚动内容容器，当前这处停在可视区上方三分之一，上下文都看得见。

## 要点

- 组件库没有现成的页内查找，自己做；查找条里的输入框和图标按钮用组件库的（el-input / n-input / a-input，el-button / n-button / a-button 的图标形态）
- 查找条固定在内容区顶部，打开时内容不跳动；排列是 输入框、计数“第 3 / 12 处”、上一处、下一处、关闭
- 其他匹配浅黄底，当前这处深橙底，两者一眼能分开
- 输入后约 120ms 再查；输入法组字时不查，确认后再查；默认不区分大小写
- Enter 下一处，Shift + Enter 上一处，到末尾回到第一处；跳转时只滚动内容容器
- 按 Esc 或关闭后清掉高亮，焦点回到“查找”按钮，滚动位置留在当前这处
- 焦点在阅读区内时接管 ⌘F / Ctrl+F；打开时若有选中文字，自动填进输入框
- 没有匹配时计数写“没有找到”，输入框给错误态，上下按钮禁用
- 匹配落在折叠段落里时自动展开；虚拟滚动的内容要在数据上查，跳转时再渲染那一段
- 高亮优先用 CSS Custom Highlight API，不改 DOM；环境不支持时退回包 mark 标签；计数用 role="status" 播报

## 提示词

给{协议阅读页}加页内查找（组件库没有现成的，自己做，输入框和按钮用项目组件库的）：内容区顶部的“查找”按钮打开查找条，排列是 输入框、“第 N / M 处”、上一处、下一处、关闭；输入后约 120ms 高亮全部匹配，输入法组字时不查，默认不区分大小写；其他匹配浅黄底，当前这处深橙底；Enter 下一处，Shift + Enter 上一处，到末尾回到第一处；跳转时只滚动内容容器，当前这处停在可视区上方三分之一；无匹配时写“没有找到”、输入框错误态、上下按钮禁用；Esc 关闭并清高亮，焦点回到“查找”按钮，滚动位置保留；焦点在阅读区内时接管 ⌘F / Ctrl+F，有选中文字时自动填入；匹配在折叠段落里时自动展开；高亮用 CSS Custom Highlight API，不支持时退回 mark；计数用 role="status" 播报。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.s{padding:0;align-items:stretch;background:#fff;font-size:12px;line-height:20px}
.w{position:relative;display:flex;flex-direction:column;width:100%;height:100%;max-width:640px;margin:0 auto}
.bar{flex:none;display:flex;align-items:center;gap:4px;height:42px;padding:0 10px;border-bottom:1px solid #e3e6eb;background:#fff}
.tt{flex:1;min-width:0;font-size:13px;font-weight:600;white-space:nowrap}
.open{height:28px;padding:0 10px;font-size:12px}
.fd{flex:1;min-width:0;display:flex;align-items:center;gap:2px}
.fd .inp{flex:1;width:100%;height:28px;padding:0 8px}
.fd .inp.none{background:#fef3f2;border-color:#d92d20}
.ct{flex:none;min-width:58px;padding:0 4px;color:#5b616e;text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
.ic{flex:none;display:grid;place-items:center;width:28px;height:28px;padding:0;border:0;border-radius:5px;background:none;color:#5b616e;cursor:pointer}
.ic:hover{background:#eef0f3;color:#1f2329}
.ic:disabled{color:#c9ced6;cursor:not-allowed;background:none}
.doc{position:relative;flex:1;min-height:0;overflow:auto;padding:8px 14px 12px;scrollbar-width:thin}
.doc h4{margin:8px 0 2px;font-size:12px;font-weight:600}
.doc h4:first-child{margin-top:0}
.doc p{margin:0;color:#3a404b}
mark{background:#fdeaa8;color:inherit;border-radius:2px}
mark.cur{background:#f59f00;color:#1f2329;box-shadow:0 0 0 1px #f59f00}
@container (min-width:560px){.s{padding:0 40px}
.w{border-left:1px solid #e3e6eb;border-right:1px solid #e3e6eb}
.doc{padding:12px 20px 16px}
.doc,.doc h4{font-size:13px}
}
</style>

<div class="s"><div class="w"><div class="bar"><span class="tt">MyPrompts 服务协议</span><button type="button" class="btn open" aria-keyshortcuts="Control+F Meta+F">查找</button><div class="fd" role="search" aria-label="在协议里查找" hidden><input class="inp" type="search" aria-label="查找内容" placeholder="查找" spellcheck="false" enterkeyhint="search"><span class="ct" role="status"></span><button type="button" class="ic pv" aria-label="上一处"><svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10l4-4 4 4"/></svg></button><button type="button" class="ic nx" aria-label="下一处"><svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg></button><button type="button" class="ic cl" aria-label="关闭查找"><svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7"/></svg></button></div></div><div class="doc" tabindex="0" role="region" aria-label="协议正文"></div></div></div>

<script type="module">
export default function demo(root) {
  const DOC = [
    ['一、服务内容', 'MyPrompts 向用户提供提示词的存放、检索和分享服务。用户保存的内容归用户所有，我们只在提供服务所需的范围内处理这些数据。'],
    ['二、账号', '用户应妥善保管账号。因账号外借造成的数据丢失，由用户自行承担；发现异常登录时，可以随时联系我们冻结账号。'],
    ['三、付费', '订阅按月或按年收取，到期前 7 天提醒。退订后已付费用不退，服务持续到当期结束，期间数据照常保留。'],
    ['四、数据保存', '账号注销后，数据保留 30 天用于恢复，期满彻底删除。用户可在注销前导出全部数据，导出文件不含他人分享给你的内容。'],
    ['五、数据安全', '我们对传输和存储的数据加密。发生数据泄露时，会在 72 小时内通知受影响的用户，并说明涉及的数据范围和补救办法。'],
    ['六、服务变更', '协议变更提前 15 天公告。用户不同意的，可以停止使用并导出数据；继续使用视为接受新协议。'],
    ['七、责任限制', '不可抗力造成的中断不承担责任。其他情况下的赔偿以用户最近 12 个月实际支付的费用为限，数据恢复费用另行协商。'],
  ];
  const $ = (q) => root.querySelector(q), doc = $('.doc'), open = $('.open'), fd = $('.fd'), tt = $('.tt'), inp = $('.fd input'), ct = $('.ct'), pv = $('.pv'), nx = $('.nx');
  const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  const smooth = () => (matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth');
  let at = -1, marks = [];

  const render = (kw) => {
    const re = kw ? new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi') : null;
    const hi = (t) => (re ? esc(t).replace(re, (m) => `<mark>${m}</mark>`) : esc(t));
    doc.innerHTML = DOC.map(([h, p]) => `<h4>${hi(h)}</h4><p>${hi(p)}</p>`).join('');
    marks = [...doc.querySelectorAll('mark')];
  };
  const show = (i) => {
    marks[at]?.classList.remove('cur');
    at = marks.length ? (i + marks.length) % marks.length : -1;
    if (at >= 0) {
      const m = marks[at]; m.classList.add('cur');
      // 只滚动正文容器，把这一处放到可视区偏上的位置，上下文看得见
      const top = m.getBoundingClientRect().top - doc.getBoundingClientRect().top + doc.scrollTop - doc.clientHeight * .3;
      doc.scrollTo({ top, behavior: smooth() });
    }
    ct.textContent = !inp.value ? '' : at < 0 ? '没有找到' : `第 ${at + 1} / ${marks.length} 处`;
    inp.classList.toggle('none', !!inp.value && at < 0);
    pv.disabled = nx.disabled = marks.length < 2;
  };
  const search = () => { render(inp.value.trim()); at = -1; show(0); };
  const openBar = (kw) => { tt.hidden = true; open.hidden = true; fd.hidden = false; if (kw !== undefined) inp.value = kw; search(); };
  const closeBar = () => { fd.hidden = true; tt.hidden = false; open.hidden = false; inp.value = ''; render(''); at = -1; open.focus(); };

  open.addEventListener('click', () => { openBar(); inp.focus(); inp.select(); });
  $('.cl').addEventListener('click', closeBar);
  nx.addEventListener('click', () => show(at + 1));
  pv.addEventListener('click', () => show(at - 1));
  let timer = 0;
  inp.addEventListener('input', (e) => { if (e.isComposing) return; clearTimeout(timer); timer = setTimeout(search, 120); });
  inp.addEventListener('compositionend', search);
  inp.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); show(at + (e.shiftKey ? -1 : 1)); } });
  root.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !fd.hidden) { e.preventDefault(); closeBar(); }
    if (e.key.toLowerCase() === 'f' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); if (fd.hidden) openBar(); inp.focus(); inp.select(); }
  });
  // 挂载时演示：查“数据”，停在第 3 处
  openBar('数据'); show(2);
}
</script>
