---
zh: 撤销重做按动作合并
en: Grouped undo history
order: 50
---

## 是什么

一次拖动滑杆、拖动对象或连着按方向键的调整，只在历史里记一步：撤销一次回到动手前，重做一次回到调整后的结果。

## 适合

图片和视频编辑器、白板、表单设计器、样式面板、排版工具这类有大量连续调整的编辑界面。

## 不适合

删除、归档后的反悔用“操作后撤销”；多人同时编辑的文档要按“只撤销自己的操作”另行设计。

## 注意

不要每个 input 事件都推一条历史，也不要把两次各自独立的拖动合成一条。

## 要点

- 按下时记起始值，拖动中只更新预览，松手时把“起始 → 最终”记成一步；前后没变化就不记
- 连着按方向键算一组，停手 600–800ms 或焦点离开时结束这一组
- 拖动途中按 Esc 或指针被系统取消，回到起始值，不留下半步历史；按 Esc 后释放指针捕获，之后的移动不再改值；拖动区域设 touch-action: none
- 撤销后又做了新改动，重做列表清空
- 方向键微调每次 1 个单位，Shift+方向键 10 个
- ⌘Z / Ctrl+Z 撤销，⇧⌘Z / Ctrl+Shift+Z / Ctrl+Y 重做；焦点在文字输入框里时交给浏览器自己的文字撤销，输入框的改动在失焦或回车时作为一步记入编辑器历史
- 历史条目写清对象和前后值（“亮度 0 → 24”）；没有可撤销的步骤时按钮禁用（焦点在被禁用的按钮上时移到另一个按钮），撤销和重做后用 role="status" 播报做了什么
- 每一步存前后值或深拷贝，不存之后还会被改动的对象引用

## 提示词

给{编辑器}的撤销 / 重做加「按动作合并」：一次从按下到松手的拖动（滑杆、移动、缩放）只记一步，按下时记起始值，拖动中只更新预览，松手时提交“起始 → 最终”，没有变化不记；连续按方向键在停手 700ms 或失焦时合并为一步；拖动中按 Esc 或指针被取消时恢复起始值、释放指针捕获且不记历史（拖动区域设 touch-action: none）；方向键每次 1、Shift+方向键 10；撤销后有新改动就清空重做；⌘Z / Ctrl+Z 撤销，⇧⌘Z / Ctrl+Shift+Z / Ctrl+Y 重做，焦点在文字输入框内时交给浏览器自己的撤销，输入框的改动在失焦或回车时记为一步；历史条目写“{属性} 旧值 → 新值”，无可撤销时按钮禁用，撤销和重做后用 role="status" 播报；每步保存前后值的副本。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;grid-template-rows:minmax(0,1fr) auto;gap:6px;padding:10px 12px}
.ed{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:10px;min-height:0;max-width:600px;width:100%;margin:0 auto}
.cv{display:grid;place-items:center;min-height:0;border-radius:10px;background:#e9ecf1;padding:10px}
.ph{width:100%;max-width:220px;aspect-ratio:4/3;max-height:100%;background:radial-gradient(circle at 72% 30%,#fff3c4 0 9%,transparent 10%),linear-gradient(160deg,transparent 58%,#2f5d50 58.5%),linear-gradient(205deg,transparent 62%,#4a8a70 62.5%),linear-gradient(180deg,#86bfe6,#d4e9f3 56%,#9fcbb6 57%,#5f9d86);box-shadow:0 2px 8px rgba(16,24,40,.14)}
.pn{display:flex;flex-direction:column;gap:6px;min-width:0;min-height:0;padding:8px 10px;background:#fff;border:1px solid #e3e6eb;border-radius:10px}
.tb{display:flex;align-items:center;gap:4px}
.ib{display:grid;place-items:center;width:28px;height:28px;border:1px solid #e3e6eb;border-radius:7px;background:#fff;color:#1f2329}
.ib:hover{background:#f5f6f8}
.ib:disabled{color:#c9ced6;cursor:not-allowed;background:#fff}
.ib svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.cnt{flex:1;min-width:0;text-align:right;color:#5b616e;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-variant-numeric:tabular-nums}
.rg{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;column-gap:8px;font-size:12px}
.rg span{color:#5b616e}
.rg output{justify-self:end;font-variant-numeric:tabular-nums;font-weight:600}
.rg input{grid-column:1/-1;width:100%;height:18px;margin:0;accent-color:#3b5bdb}
.hist{display:none;list-style:none;margin:0;padding:6px 0 0;border-top:1px solid #eef0f3;font-size:12px;overflow:auto;min-height:0}
.hist li{display:flex;align-items:center;gap:6px;height:22px;padding:0 6px;border-radius:5px;color:#1f2329;font-variant-numeric:tabular-nums}
.hist li.cur{background:#edf1ff;color:#3b5bdb;font-weight:600}
.hist li.rd{color:#8a909c}
.hist li.rd::after{content:"可重做";margin-left:auto;font-size:11px}
.hist .none{color:#8a909c}
.msg{margin:0;min-height:18px;color:#5b616e;font-size:12px;text-align:center}
@container (min-height:250px){.st{gap:10px;padding:16px 24px}
.pn{gap:10px;padding:12px 14px}
.rg{font-size:13px}
.hist{display:block}
}
</style>

<div class="st"><div class="ed"><div class="cv"><div class="ph" role="img" aria-label="正在编辑的湖边照片"></div></div><div class="pn"><div class="tb"><button type="button" class="ib un" aria-label="撤销（⌘Z / Ctrl+Z）" title="撤销 ⌘Z / Ctrl+Z"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/></svg></button><button type="button" class="ib re" aria-label="重做（⇧⌘Z / Ctrl+Y）" title="重做 ⇧⌘Z / Ctrl+Y"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 14 5-5-5-5"/><path d="M20 9H9a5 5 0 0 0 0 10h3"/></svg></button><span class="cnt"></span></div><label class="rg"><span>亮度</span><output class="ob"></output><input type="range" data-k="b" min="-50" max="50" value="0"></label><label class="rg"><span>圆角</span><output class="or"></output><input type="range" data-k="r" min="0" max="40" value="8"></label><ol class="hist" aria-label="历史记录"></ol></div></div><p class="msg" role="status">拖动滑杆试试：一次拖动只记一步</p></div>

<script type="module">
export default function demo(root) {
  const NAME = { b: '亮度', r: '圆角' }, V = { b: 0, r: 8 }, undo = [], redo = [];
  const ph = root.querySelector('.ph'), msg = root.querySelector('.msg'), cnt = root.querySelector('.cnt'), hist = root.querySelector('.hist');
  const un = root.querySelector('.un'), re = root.querySelector('.re'), R = {}, O = { b: root.querySelector('.ob'), r: root.querySelector('.or') };
  root.querySelectorAll('input[type=range]').forEach((r) => (R[r.dataset.k] = r));
  const fmt = (k, v) => (k === 'b' ? (v > 0 ? '+' : '') + v : v + 'px');
  const line = (e) => `${NAME[e.k]} ${fmt(e.k, e.from)} → ${fmt(e.k, e.to)}`;
  let sess = null, down = false, idle = 0;
  const say = (t) => { msg.textContent = t; };
  const apply = () => {
    ph.style.filter = `brightness(${1 + V.b / 100})`; ph.style.borderRadius = V.r + 'px';
    for (const k in V) { R[k].value = V[k]; O[k].textContent = fmt(k, V[k]); }
  };
  const render = () => {
    un.disabled = !undo.length; re.disabled = !redo.length;
    cnt.textContent = `历史 ${undo.length} 步` + (redo.length ? ` · 可重做 ${redo.length}` : '');
    hist.innerHTML = undo.length + redo.length ? undo.map((e, i) => `<li class="${i === undo.length - 1 ? 'cur' : ''}">${line(e)}</li>`).join('') + [...redo].reverse().map((e) => `<li class="rd">${line(e)}</li>`).join('') : '<li class="none">还没有历史</li>';
  };
  // 一组调整：第一次 input 时打开，松手 / 键盘停手 700ms / 失焦时提交；没有变化不记
  const commit = () => {
    clearTimeout(idle); if (!sess) return;
    const s = sess, to = V[s.k]; sess = null;
    if (to === s.from) return;
    undo.push({ k: s.k, from: s.from, to }); redo.length = 0; render();
    say(`经过 ${s.n} 个中间值，记为 1 步：${line({ k: s.k, from: s.from, to })}`);
  };
  const cancel = () => { if (!sess) return; clearTimeout(idle); V[sess.k] = sess.from; sess = null; down = false; apply(); say('已取消这次调整，没有记入历史'); };
  for (const k in R) {
    const r = R[k];
    r.addEventListener('pointerdown', () => { commit(); down = true; });
    r.addEventListener('input', () => {
      if (sess && sess.k !== k) commit();
      if (!sess) sess = { k, from: V[k], n: 0 };
      V[k] = +r.value; sess.n++; apply();
      if (!down) { clearTimeout(idle); idle = setTimeout(commit, 700); }
    });
    r.addEventListener('pointerup', () => { if (down) { down = false; commit(); } });
    r.addEventListener('change', () => { if (down) { down = false; commit(); } });
    r.addEventListener('pointercancel', cancel);
    r.addEventListener('blur', () => { down = false; commit(); });
    r.addEventListener('keydown', (e) => { if (e.key === 'Escape' && sess) { e.preventDefault(); cancel(); } });
  }
  const step = (from, to, verb) => {
    commit(); const e = from.pop(); if (!e) return;
    V[e.k] = verb === '撤销' ? e.from : e.to; to.push(e); apply(); render();
    say(`已${verb}：${NAME[e.k]}回到 ${fmt(e.k, V[e.k])}`);
  };
  un.addEventListener('click', () => step(undo, redo, '撤销'));
  re.addEventListener('click', () => step(redo, undo, '重做'));
  root.addEventListener('keydown', (e) => {
    if (!(e.metaKey || e.ctrlKey)) return;
    const k = e.key.toLowerCase();
    if (k === 'z') { e.preventDefault(); e.shiftKey ? step(redo, undo, '重做') : step(undo, redo, '撤销'); }
    else if (k === 'y') { e.preventDefault(); step(redo, undo, '重做'); }
  });
  // 自动演示：模拟两次拖动（第一次来回拖过头再拉回），每次只记一步
  const drag = (k, path) => new Promise((done) => {
    const vals = []; let v = V[k];
    for (const to of path) while (v !== to) { v += v < to ? 1 : -1; vals.push(v); }
    down = true; let i = 0;
    const tick = () => {
      if (!root.host.isConnected) return;
      R[k].value = vals[i++]; R[k].dispatchEvent(new Event('input', { bubbles: true }));
      if (i < vals.length) setTimeout(tick, 14); else { down = false; commit(); done(); }
    };
    tick();
  });
  apply(); render();
  setTimeout(async () => { if (!root.host.isConnected) return; await drag('b', [30, 24]); setTimeout(() => root.host.isConnected && drag('r', [20]), 500); }, 500);
}
</script>
