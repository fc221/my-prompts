---
zh: 键盘快捷键
en: Keyboard shortcuts
order: 10
---

## 是什么

高频操作配单键或组合键，界面上标出按键，按 ? 打开快捷键列表；输入框里不触发。

## 适合

邮件、工单、审核、编辑器、看板等每天重复操作上百次的工具型产品。

## 不适合

低频页面、营销页不需要；不要占用浏览器、系统和读屏软件已有的组合键。

## 注意

快捷键只是增强，所有操作都必须能用鼠标和触屏完成。

## 要点

- 单键快捷键（J / K / X / E）只在焦点不在输入框、文本域、可编辑区域时生效。
- 组合键按平台显示 ⌘ 或 Ctrl；不覆盖复制、粘贴、关闭标签页、新开标签页等系统和浏览器快捷键。
- 按 ? 打开快捷键列表，Esc 关闭并把焦点还给原处。
- 在按钮提示和菜单项右侧用键帽样式标出对应按键，让人顺手学会。
- 按 / 聚焦搜索框，在搜索框里按 Esc 退回列表。
- 每次触发都有可见反馈（当前行移动、提示“已归档”）；高频操作不加进出动画。
- 提供关闭或改键的设置，避免与输入法、辅助工具冲突。

## 提示词

给{工具页面}加「键盘快捷键」：{J / K 上下移动、X 选中、E 归档、/ 聚焦搜索}，单键快捷键在输入框聚焦时不触发；按 ? 打开快捷键列表，Esc 关闭并还原焦点；按钮和菜单旁用键帽样式标出按键，组合键按平台显示 ⌘ 或 Ctrl；不占用浏览器和系统已有组合；每次触发都有可见反馈；所有操作仍能用鼠标和触屏完成。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:8px 12px}
.box{position:relative;display:flex;flex-direction:column;gap:6px;max-width:560px;height:100%;margin:0 auto;outline:0}
.box:focus-visible .list{box-shadow:0 0 0 2px #3b5bdb}
.top{flex:none;display:flex;align-items:center;gap:8px}
.q{flex:1;min-width:0;height:28px;padding:0 10px;border:1px solid #e3e6eb;border-radius:8px;background:#fff;font-size:12px}
.q:focus{outline:0;border-color:#3b5bdb;box-shadow:0 0 0 3px #edf1ff}
.last{min-width:72px;color:#3b5bdb;font-size:12px;font-weight:600;text-align:right}
.list{flex:1;min-height:0;margin:0;padding:2px;overflow:auto;list-style:none;background:#fff;border:1px solid #e3e6eb;border-radius:10px}
.list li{display:flex;align-items:center;gap:8px;height:26px;padding:0 8px;border-radius:6px}
.list li.cur{background:#edf1ff}
.ck{flex:none;width:14px;height:14px;border:1.5px solid #c3c9d4;border-radius:4px}
.sel .ck{border-color:#3b5bdb;background:#3b5bdb;box-shadow:inset 0 0 0 2px #fff}
.list b{flex:none;width:48px;overflow:hidden;font-weight:600;white-space:nowrap}
.list span{flex:1;min-width:0;overflow:hidden;color:#5b616e;text-overflow:ellipsis;white-space:nowrap}
.list .none{justify-content:center;height:100%;color:#5b616e}
.none button,.help .close{height:26px;padding:0 10px;border:1px solid #e3e6eb;border-radius:6px;background:#fff;font-size:12px}
.keys{flex:none;display:flex;gap:2px;overflow:hidden}
.keys button{display:inline-flex;align-items:center;gap:4px;height:24px;padding:0 6px 0 2px;border:0;border-radius:6px;background:none;color:#5b616e;font-size:12px;white-space:nowrap}
.keys button:hover{background:#e9ecf1;color:#1f2329}
kbd{display:inline-grid;place-items:center;min-width:20px;height:20px;padding:0 4px;border:1px solid #d5d9e0;border-bottom-width:2px;border-radius:4px;background:#fff;color:#1f2329;font:600 12px/1 ui-monospace,"SF Mono",Menlo,Consolas,monospace}
.help{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;gap:6px;padding:10px 14px;overflow:auto;background:#fff;border:1px solid #e3e6eb;border-radius:10px;box-shadow:0 8px 24px rgba(31,35,41,.14)}
.help dl{display:grid;grid-template-columns:auto minmax(0,1fr);gap:4px 12px;align-items:center;margin:0;font-size:12px}
.help dd{margin:0;color:#5b616e}
.help .close{align-self:flex-end}
@container (min-width:560px){.list li{height:34px}
.help dl{grid-template-columns:auto minmax(0,1fr) auto minmax(0,1fr)}
}
@container (max-width:420px){.keys button[data-k=e]{display:none}
}
</style>

<div class="st"><div class="box" tabindex="0" aria-label="收件箱，按问号查看快捷键"><div class="top"><input class="q" type="search" placeholder="搜索邮件（按 / 聚焦）" aria-label="搜索邮件"><span class="last" aria-hidden="true"></span></div><ul class="list"></ul><div class="keys"><button type="button" data-k="j"><kbd>J</kbd>下一封</button><button type="button" data-k="k"><kbd>K</kbd>上一封</button><button type="button" data-k="x"><kbd>X</kbd>选中</button><button type="button" data-k="e"><kbd>E</kbd>归档</button><button type="button" data-k="?"><kbd>?</kbd>全部</button></div><div class="help" role="dialog" aria-label="快捷键" hidden><b>快捷键</b><dl><dt><kbd>J</kbd> <kbd>K</kbd></dt><dd>下一封 / 上一封</dd><dt><kbd>X</kbd></dt><dd>选中当前邮件</dd><dt><kbd>E</kbd></dt><dd>归档当前邮件</dd><dt><kbd>/</kbd></dt><dd>聚焦搜索</dd><dt><kbd>Esc</kbd></dt><dd>退出搜索或关闭本列表</dd></dl><button type="button" class="close">关闭</button></div><p class="sr" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const D = [['周以宁', 'Q4 预算草案请在周五前确认'], ['林知远', '设计评审改到下午 3 点'], ['财务部', '10 月报销已打款'], ['苏墨', '新版结算页灰度数据'], ['陈一鸣', '客户访谈录音整理好了']];
  const box = root.querySelector('.box'), list = root.querySelector('.list'), q = root.querySelector('.q'), last = root.querySelector('.last'), help = root.querySelector('.help'), live = root.querySelector('.sr');
  const NAME = { j: 'J 下一封', k: 'K 上一封', x: 'X 选中', e: 'E 归档', '/': '/ 搜索', '?': '? 快捷键' };
  let mails = [], cur = 0, lastT = 0;
  const render = () => {
    list.replaceChildren(...mails.map((m, i) => { const li = document.createElement('li'); li.className = (i === cur ? 'cur ' : '') + (m.sel ? 'sel' : ''); li.innerHTML = `<i class="ck"></i><b>${m.from}</b><span>${m.sub}</span>`; li.onclick = () => { cur = i; render(); }; return li; }));
    if (!mails.length) { const li = document.createElement('li'); li.className = 'none'; li.innerHTML = '收件箱已清空 <button type="button">恢复示例</button>'; li.querySelector('button').onclick = () => { reset(); box.focus(); }; list.append(li); }
    const el = list.children[cur]; if (el && (el.offsetTop < list.scrollTop || el.offsetTop + el.offsetHeight > list.scrollTop + list.clientHeight)) list.scrollTop = el.offsetTop - 2;
  };
  const reset = () => { mails = D.map(([from, sub]) => ({ from, sub, sel: false })); cur = 0; render(); };
  const toggleHelp = (on) => { help.hidden = !on; if (on) help.querySelector('.close').focus(); else box.focus(); };
  const act = (k) => {
    last.textContent = NAME[k]; clearTimeout(lastT); lastT = setTimeout(() => { last.textContent = ''; }, 1200);
    if (k === 'j') cur = Math.min(cur + 1, mails.length - 1);
    if (k === 'k') cur = Math.max(cur - 1, 0);
    if (k === 'x' && mails[cur]) mails[cur].sel = !mails[cur].sel;
    if (k === 'e' && mails[cur]) { live.textContent = `已归档「${mails[cur].sub}」`; mails.splice(cur, 1); cur = Math.min(cur, mails.length - 1); }
    if (k === '/') return q.focus();
    if (k === '?') return toggleHelp(help.hidden);
    cur = Math.max(cur, 0); render();
  };
  root.addEventListener('keydown', (e) => {
    if (e.target === q) { if (e.key === 'Escape') { e.preventDefault(); box.focus(); } return; } // 输入框里不触发单键快捷键
    if (e.metaKey || e.ctrlKey || e.altKey) return; // 不碰系统和浏览器的组合键
    if (e.key === 'Escape' && !help.hidden) { e.preventDefault(); return toggleHelp(false); }
    const k = e.key.length === 1 ? e.key.toLowerCase() : ''; if (!NAME[k] || (!help.hidden && k !== '?')) return;
    e.preventDefault(); act(k);
  });
  root.querySelector('.keys').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) act(b.dataset.k); });
  help.querySelector('.close').onclick = () => toggleHelp(false);
  reset();
}
</script>
