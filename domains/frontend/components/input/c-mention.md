---
zh: "@ 提及与话题"
en: Mentions
order: 25
---

## 是什么

在评论或消息输入框里打 @（或 #），光标处弹出候选；选中的人或文档作为一个整体块插进文字里，一次退格整块删掉，提交时带的是 id。

## 适合

评论、任务描述、聊天输入里提到同事、关联话题或文档，被提到的人要收到通知。

## 不适合

只是给字段选一个人时用选择器或「搜索联想」；不需要通知和关联的纯文本输入用普通文本域。

## 注意

候选列表贴着光标出现，不固定在输入框下方；输入法组字时既不触发候选，也不响应回车。

## 要点

- 触发：@ 或 # 前面不是英文字母和数字时才弹出（中文紧跟 @ 也能触发，邮箱里的 @ 不触发），后面的字作为关键词实时过滤；输入空格、按 Esc 或光标移走后关闭
- 定位：用光标所在的文字矩形（Range.getBoundingClientRect）放候选列表，下方放不下翻到上方，左右不出输入框所在区域
- 候选最多 6 条：头像或图标 + 名称 + 次要信息（部门、所在目录），命中的字高亮；没有匹配时显示“没有找到”并保留已输入的文字
- 键盘同「搜索联想」：↑↓ 移动（首尾循环），Enter 或 Tab 插入，Esc 关闭；焦点始终在输入框，ARIA 按 combobox 写
- 插入的块 contenteditable="false"，强调浅底 + 强调色文字，后面自动补一个空格；光标紧挨块后时按一次 Backspace 删除整块
- 提交时把块转成带类型和 id 的标记（如 <@u_102>、<#d_7>），改名不影响；粘贴只保留纯文本；Enter 换行，⌘/Ctrl + Enter 发送

## 提示词

给{任务评论框}加「@ 提及」：输入 @ 弹出成员候选，输入 # 弹出{文档或话题}，@ 或 # 前面是英文字母或数字时不触发（避开邮箱）；后面的字实时过滤，最多 6 条，显示头像、名称和部门，命中的字高亮，没有匹配显示“没有找到“{关键词}””；候选列表贴着光标出现，下方放不下翻到上方；↑↓ 移动、Enter 或 Tab 插入、Esc 关闭，焦点留在输入框，ARIA 按 combobox 写；输入法组字中不触发、不响应回车；选中后插入不可编辑的提及块（强调浅底），后面补一个空格，光标紧挨块后时一次 Backspace 删掉整块；提交时提及块转成 <@成员 id>，粘贴只保留纯文本；Enter 换行，⌘/Ctrl + Enter 发送。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{position:relative;width:100%;max-width:400px;display:flex;flex-direction:column;gap:8px}
.ed{min-height:52px;max-height:96px;overflow:auto;padding:6px 10px;border:1px solid #c9ced6;border-radius:6px;background:#fff;line-height:22px;outline:none;white-space:pre-wrap;word-break:break-word;cursor:text}
.ed:hover{border-color:#8a909c}
.ed:focus{border-color:#3b5bdb;box-shadow:inset 0 0 0 1px #3b5bdb,0 0 0 3px #dfe6ff}
.ed:empty::before{content:attr(data-ph);color:#8a909c}
.mt{padding:0 4px;border-radius:4px;background:#edf1ff;color:#2f4ac0;font-weight:500;white-space:nowrap}
.mt.doc{background:#e6f4ec;color:#0f6b4a}
.ft{display:flex;align-items:center;justify-content:space-between;gap:8px}
.pop{position:absolute;z-index:2;width:200px;max-height:160px;overflow:auto;margin:0;padding:4px;list-style:none;border:1px solid #e3e6eb;border-radius:8px;background:#fff;box-shadow:0 8px 24px rgba(16,24,40,.14)}
.op{display:flex;align-items:center;gap:8px;height:32px;padding:0 8px;border-radius:6px;font-size:13px;cursor:pointer}
.op[aria-selected="true"]{background:#edf1ff}
.av{display:grid;place-items:center;width:20px;height:20px;flex:none;border-radius:50%;background:#0f6b4a;color:#fff;font-size:11px}
.op b{font-weight:400;white-space:nowrap}
.op mark{background:none;color:#2f4ac0;font-weight:600}
.op small{margin-left:auto;color:#5b616e;font-size:12px;white-space:nowrap}
.none{padding:6px 8px;color:#5b616e;font-size:12px}
.msg{min-height:20px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
@container (max-height:240px){.msg{display:none}
}
</style>

<div class="s"><div class="w">
  <div class="ed" contenteditable="true" spellcheck="false" role="combobox" aria-multiline="true" aria-autocomplete="list" aria-haspopup="listbox" aria-controls="mpop" aria-expanded="false" aria-label="评论" data-ph="写评论，输入 @ 提及成员，# 关联文档"></div>
  <ul class="pop" id="mpop" role="listbox" aria-label="候选" hidden></ul>
  <div class="ft"><span class="help">@ 成员 · # 文档</span><button type="button" class="btn pri" title="⌘/Ctrl + Enter" aria-keyshortcuts="Meta+Enter Control+Enter">发送</button></div>
  <p class="help msg" role="status"></p>
</div></div>

<script type="module">
const PEOPLE = [['u1', '林知夏', '设计', '#7c5cff'], ['u2', '周以宁', '前端', '#0e7fb0'], ['u3', '周牧', '产品', '#b45309'], ['u4', '许一帆', '测试', '#0f766e'], ['u5', '何澄', '运营', '#c2410c'], ['u6', '江遥', '后端', '#475569']];
const DOCS = [['d1', '发布清单', '项目'], ['d2', '周会纪要', '会议'], ['d3', '埋点方案', '数据'], ['d4', '设计走查', '设计']];
const esc = (t) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const hl = (t, q) => { const i = q ? t.indexOf(q) : -1; return i < 0 ? t : `${t.slice(0, i)}<mark>${q}</mark>${t.slice(i + q.length)}`; };
export default function demo(root) {
  const s = root.querySelector('.s'), w = root.querySelector('.w'), ed = root.querySelector('.ed'), pop = root.querySelector('.pop'), msg = root.querySelector('.msg');
  let trig = null, items = [], act = 0;
  const sel = () => (root.getSelection ? root.getSelection() : document.getSelection());
  // 影子树里的光标：Chrome 用 shadowRoot.getSelection，Safari 用 getComposedRanges
  const caret = () => {
    const sl = sel(); if (!sl || !sl.rangeCount) return null;
    let r = sl.getRangeAt(0);
    if (!ed.contains(r.startContainer) && sl.getComposedRanges) {
      let cr; try { cr = sl.getComposedRanges({ shadowRoots: [root] }); } catch { cr = sl.getComposedRanges(root); }
      if (!cr[0]) return null;
      r = document.createRange(); r.setStart(cr[0].startContainer, cr[0].startOffset); r.setEnd(cr[0].endContainer, cr[0].endOffset);
    }
    return ed.contains(r.startContainer) ? r : null;
  };
  const mark = () => {
    pop.querySelectorAll('.op').forEach((o, i) => o.setAttribute('aria-selected', String(i === act)));
    if (items.length) { ed.setAttribute('aria-activedescendant', `mo-${act}`); pop.querySelector(`#mo-${act}`).scrollIntoView({ block: 'nearest' }); } else ed.removeAttribute('aria-activedescendant');
  };
  // 贴着触发字符放：下方放不下就翻到上方
  const place = () => {
    const r = document.createRange(); r.setStart(trig.n, trig.start); r.setEnd(trig.n, trig.start + 1);
    const c = r.getBoundingClientRect(), wr = w.getBoundingClientRect(), sr = s.getBoundingClientRect(), h = pop.offsetHeight;
    let top = c.bottom + 4; if (top + h > sr.bottom - 4) top = Math.max(sr.top + 4, c.top - 4 - h);
    pop.style.top = `${top - wr.top}px`;
    pop.style.left = `${Math.max(0, Math.min(c.left - wr.left, wr.width - pop.offsetWidth))}px`;
  };
  const open = () => {
    const pool = trig.kind === '@' ? PEOPLE : DOCS;
    items = pool.filter((p) => !trig.q || p[1].includes(trig.q) || p[2].includes(trig.q)).slice(0, 6); act = 0;
    pop.innerHTML = items.length
      ? items.map((p, i) => `<li class="op" role="option" id="mo-${i}" aria-selected="false"><span class="av" aria-hidden="true"${p[3] ? ` style="background:${p[3]}"` : ''}>${p[3] ? p[1][0] : '#'}</span><b>${hl(p[1], trig.q)}</b><small>${p[2]}</small></li>`).join('')
      : `<li class="none">没有找到“${esc(trig.q)}”</li>`;
    pop.hidden = false; ed.setAttribute('aria-expanded', 'true'); mark(); place();
  };
  const close = () => { trig = null; pop.hidden = true; ed.setAttribute('aria-expanded', 'false'); ed.removeAttribute('aria-activedescendant'); };
  // @ 或 # 前面是英文字母、数字时不算（避开邮箱）
  const check = () => {
    const r = caret();
    if (!r || !r.collapsed || r.startContainer.nodeType !== 3) return close();
    const n = r.startContainer, m = n.data.slice(0, r.startOffset).match(/(^|[^A-Za-z0-9_.])([@#])([^\s @#，。,]{0,10})$/);
    if (!m) return close();
    trig = { n, kind: m[2], q: m[3], start: r.startOffset - m[3].length - 1, end: r.startOffset };
    open();
  };
  const insert = (p) => {
    const r = document.createRange(); r.setStart(trig.n, trig.start); r.setEnd(trig.n, trig.end); r.deleteContents();
    const b = document.createElement('span');
    b.className = trig.kind === '@' ? 'mt' : 'mt doc'; b.contentEditable = 'false'; b.dataset.k = trig.kind; b.dataset.id = p[0]; b.textContent = trig.kind + p[1];
    const sp = document.createTextNode(' ');
    r.insertNode(sp); r.insertNode(b);
    sel().collapse(sp, 1);
    msg.textContent = `已插入 ${b.textContent}`;
    close();
  };
  const serialize = () => [...ed.childNodes].map((n) => (n.nodeType === 3 ? n.data : n.classList?.contains('mt') ? `<${n.dataset.k}${n.dataset.id}>` : n.nodeName === 'BR' ? '\n' : n.textContent)).join('').replace(/ /g, ' ').trim();
  const send = () => { const t = serialize(); msg.textContent = t ? `将提交：${t}` : '先写点内容再发送'; };

  ed.addEventListener('keydown', (e) => {
    if (e.isComposing || e.keyCode === 229) return;
    if (trig) {
      if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && items.length) { e.preventDefault(); act = (act + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length; mark(); return; }
      if ((e.key === 'Enter' || e.key === 'Tab') && items.length && !e.shiftKey && !e.metaKey && !e.ctrlKey) { e.preventDefault(); insert(items[act]); return; }
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    }
    if (e.key === 'Enter') { e.preventDefault(); if (e.metaKey || e.ctrlKey) send(); else document.execCommand('insertLineBreak'); return; }
    if (e.key === 'Backspace') {
      const r = caret(); if (!r || !r.collapsed) return;
      const c = r.startContainer;
      let prev = c.nodeType === 3 ? (r.startOffset === 0 ? c.previousSibling : null) : c.childNodes[r.startOffset - 1];
      while (prev?.nodeType === 3 && !prev.data) prev = prev.previousSibling; // 插入时拆出的空文字节点
      if (prev?.classList?.contains('mt')) { e.preventDefault(); msg.textContent = `已移除 ${prev.textContent}`; prev.remove(); }
    }
  });
  ed.addEventListener('input', (e) => { if (!e.isComposing) check(); });
  ed.addEventListener('compositionend', check);
  ed.addEventListener('keyup', (e) => { if (/^(ArrowLeft|ArrowRight|Home|End)$/.test(e.key)) check(); });
  ed.addEventListener('click', check);
  ed.addEventListener('blur', close);
  ed.addEventListener('paste', (e) => { e.preventDefault(); document.execCommand('insertText', false, e.clipboardData.getData('text/plain')); });
  pop.addEventListener('mousedown', (e) => e.preventDefault());
  pop.addEventListener('click', (e) => { const o = e.target.closest('.op'); if (o && trig) insert(items[+o.id.slice(3)]); });
  root.querySelector('.btn').addEventListener('click', send);

  // 初始状态：已有一个提及块，末尾正在输入 @周，候选列表打开
  ed.innerHTML = '这版排期请 <span class="mt" contenteditable="false" data-k="@" data-id="u1">@林知夏</span>&nbsp;确认，再抄送 @周';
  const last = ed.lastChild;
  trig = { n: last, kind: '@', q: '周', start: last.data.length - 2, end: last.data.length };
  open();
}
</script>
