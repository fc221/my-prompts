---
zh: 存档点与还原
en: Snapshots and restore
order: 70
---

## 是什么

把当前编辑状态存成一个“方案”，接着改别的；之后可以点开旧方案预览，确认“应用”才还原，点“取消”就回到刚才的样子。

## 适合

海报、主题配色、排版、图表样式、复杂配置这类要“多试几版再挑”的编辑。

## 不适合

只是想退回最近几步用撤销历史；要多人审阅、留作者和说明的正式版本用版本记录。

## 注意

点方案缩略图只是预览，不能悄悄替换当前稿；只有点“应用”才算还原。

## 要点

- 方案保存所有能恢复的参数和素材引用，缩略图只是入口，不能只存一张图
- 预览时显示横幅“正在预览方案 A”和“取消 / 应用”，编辑控件暂时禁用并写明原因，Esc 等于取消
- 取消要一模一样地回到预览前的状态，包括还没存成方案的改动
- 应用也记进撤销：应用后给“撤销”，能回到应用前那一稿
- 之后再改当前稿不会动已存的方案；要覆盖旧方案得点“更新方案 A”
- 引用的素材已被删除时写清“图片 {文件名} 已不存在”并给替换入口，不拿旧缩略图假装还原成功
- 方案显示名称和保存时间；只存在本机的写明“仅保存在此设备”

## 提示词

给{编辑器}加「存档点与还原」：“存为方案”保存当前全部可恢复的参数和素材引用（深拷贝），列成带缩略图、名称和保存时间的方案条；点方案进入预览，显示“正在预览方案 {名称}”横幅和“取消 / 应用”，预览期间编辑控件禁用并说明原因，Esc 等于取消；取消精确回到预览前的状态，包括未保存的改动；应用后记入撤销，可一键回到应用前；继续编辑不会改动已存方案，覆盖需点“更新方案”；素材丢失时说明缺了什么并给替换入口；预览、应用、撤销都用 role="status" 播报。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;grid-template-rows:minmax(0,1fr) auto;gap:6px;padding:8px 12px}
.ed{display:grid;grid-template-columns:minmax(0,.7fr) minmax(0,1.3fr);gap:8px;min-height:0;width:100%;max-width:600px;margin:0 auto}
.cv{display:grid;place-items:center;min-height:0;padding:6px;border-radius:10px;background:#e9ecf1}
.cv>.po{height:100%;max-width:100%;font-size:var(--fs,11px);box-shadow:0 2px 8px rgba(16,24,40,.16)}
.po{--bg:#1f4d3a;--fg:#f2c14e;position:relative;display:flex;flex-direction:column;justify-content:flex-end;gap:.3em;aspect-ratio:3/4;padding:1em;border-radius:.4em;background:radial-gradient(circle at 74% 26%,var(--fg) 0 14%,transparent 14.5%),linear-gradient(160deg,var(--bg),color-mix(in srgb,var(--bg) 70%,#000));color:var(--fg);overflow:hidden;transition:background-color .15s}
.po b{font-size:1.5em;line-height:1.15;letter-spacing:.04em;white-space:nowrap}
.po small{font-size:.62em;line-height:1.3;opacity:.85}
.po.ac{align-items:center;text-align:center;justify-content:center}
.pn{display:flex;flex-direction:column;gap:6px;min-width:0;padding:6px 10px;background:#fff;border:1px solid #e3e6eb;border-radius:10px}
.bn{display:flex;align-items:center;gap:4px;min-height:26px;font-size:12px}
.bn span{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#5b616e}
.bn.pv{margin:0 -4px;padding:0 4px;border-radius:6px;background:#fffaeb}
.bn.pv span{color:#b54708;font-weight:600}
.sb{flex:none;height:24px;padding:0 6px;border:1px solid #e3e6eb;border-radius:6px;background:#fff;font-size:12px;white-space:nowrap}
.sb:hover{background:#f5f6f8}
.sb.p{border-color:#3b5bdb;background:#3b5bdb;color:#fff}
.sb.p:hover{background:#3250c8}
fieldset{display:grid;gap:6px;margin:0;padding:0;border:0;min-width:0}
fieldset:disabled{opacity:.45}
fieldset:disabled button{cursor:not-allowed}
.rw{display:flex;align-items:center;gap:6px;font-size:12px}
.rw>span{flex:none;width:24px;color:#5b616e}
.sw4{display:flex;gap:5px}
.sw4 button{width:20px;height:20px;padding:0;border:2px solid #fff;border-radius:50%;box-shadow:0 0 0 1px #d0d5dd}
.sw4 [aria-pressed=true]{box-shadow:0 0 0 2px #1f2329}
.seg{display:flex;gap:2px;padding:2px;border-radius:7px;background:#eef0f3}
.seg button{height:20px;padding:0 7px;border:0;border-radius:5px;background:none;color:#5b616e;font-size:11px;white-space:nowrap}
.seg [aria-pressed=true]{background:#fff;color:#1f2329;font-weight:600;box-shadow:0 1px 2px rgba(16,24,40,.12)}
.snaps{display:flex;gap:6px;padding-top:6px;border-top:1px solid #eef0f3;overflow-x:auto}
.sn{flex:none;display:grid;justify-items:center;gap:2px;width:34px;padding:0;border:0;background:none;color:#5b616e;font-size:10px;line-height:12px}
.sn .po{width:30px;font-size:3.4px;border-radius:3px;outline:2px solid transparent;outline-offset:1px}
.sn[aria-current=true] .po{outline-color:#f79009}
.sn.add i{display:grid;place-items:center;width:30px;aspect-ratio:3/4;border:1.5px dashed #c9ced6;border-radius:3px;color:#5b616e;font:16px/1 system-ui;font-style:normal}
.sn.add:hover i{border-color:#3b5bdb;color:#3b5bdb}
.msg{margin:0;min-height:18px;color:#5b616e;font-size:12px;text-align:center}
@media (prefers-reduced-motion:reduce){.po{transition:none}
}
@container (max-width:310px){.st{--fs:9px}
}
@container (min-height:250px){.st{gap:10px;padding:16px 24px;--fs:16px}
.pn{gap:10px;padding:12px 14px}
.rw{font-size:13px}
.rw>span{width:30px}
.sw4 button{width:24px;height:24px}
.seg button{height:24px;padding:0 10px;font-size:12px}
.sn{width:44px;font-size:11px;line-height:14px}
.sn .po,.sn.add i{width:40px}
.sn .po{font-size:4.5px}
}
</style>

<div class="st"><div class="ed"><div class="cv"><div class="po main" role="img" aria-label="海报预览"><b>秋日市集</b><small>11.08 周六 · 滨江草坪</small></div></div><div class="pn"><div class="bn"><span class="mode">当前稿</span></div><fieldset aria-label="编辑当前稿"><div class="rw"><span>配色</span><div class="sw4" role="group" aria-label="配色"></div></div><div class="rw"><span>排版</span><div class="seg" role="group" aria-label="排版"><button type="button" data-a="l" aria-pressed="true">左下</button><button type="button" data-a="c" aria-pressed="false">居中</button></div></div></fieldset><div class="snaps" role="group" aria-label="已存方案"><button type="button" class="sn add" aria-label="把当前稿存为方案"><i aria-hidden="true">+</i>存档</button></div></div></div><p class="msg" role="status">先存一个方案，再接着改</p></div>

<script type="module">
export default function demo(root) {
  const C = [['#1f4d3a', '#f2c14e', '墨绿'], ['#7a2e2e', '#f6d7b0', '砖红'], ['#1d3557', '#a8dadc', '深蓝'], ['#3d2c52', '#f4a261', '暮紫']];
  const main = root.querySelector('.main'), bn = root.querySelector('.bn'), fs = root.querySelector('fieldset'), snaps = root.querySelector('.snaps'), add = root.querySelector('.add'), msg = root.querySelector('.msg'), sw4 = root.querySelector('.sw4');
  sw4.innerHTML = C.map(([bg, , n], i) => `<button type="button" data-c="${i}" aria-label="${n}" aria-pressed="${i === 0}" style="background:${bg}"></button>`).join('');
  const NAMES = 'ABC';
  let work = { c: 0, a: 'l' }, saved = [], pv = -1, applied = null;
  const paint = (el, s) => { el.style.setProperty('--bg', C[s.c][0]); el.style.setProperty('--fg', C[s.c][1]); el.classList.toggle('ac', s.a === 'c'); el.dataset.s = `${C[s.c][2]}·${s.a === 'c' ? '居中' : '左下'}`; };
  const say = (t) => { msg.textContent = t; };
  const render = () => {
    const showing = pv >= 0 ? saved[pv].s : work;
    paint(main, showing);
    sw4.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.c === work.c)));
    root.querySelectorAll('.seg button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.a === work.a)));
    fs.disabled = pv >= 0; fs.title = pv >= 0 ? '预览中不能编辑：先应用或取消' : ''; add.disabled = pv >= 0 || saved.length >= NAMES.length;
    bn.classList.toggle('pv', pv >= 0);
    bn.innerHTML = pv >= 0 ? `<span>预览方案 ${saved[pv].name}</span><button type="button" class="sb" data-b="cancel">取消</button><button type="button" class="sb p" data-b="apply">应用</button>`
      : applied ? `<span>已应用方案 ${applied.name}</span><button type="button" class="sb" data-b="undo">撤销</button>` : '<span>当前稿</span>';
    snaps.querySelectorAll('.sn:not(.add)').forEach((b, i) => b.setAttribute('aria-current', String(i === pv)));
  };
  const edit = (patch) => { if (pv >= 0) return; work = { ...work, ...patch }; applied = null; render(); };
  const save = () => {
    if (pv >= 0 || saved.length >= NAMES.length) return;
    const name = NAMES[saved.length], s = { ...work }; saved.push({ name, s });
    const b = document.createElement('button'); b.type = 'button'; b.className = 'sn'; b.setAttribute('aria-label', `预览方案 ${name}`);
    b.innerHTML = `<div class="po" aria-hidden="true"><b>秋日市集</b><small>11.08 周六 · 滨江草坪</small></div>方案 ${name}`;
    paint(b.querySelector('.po'), s); snaps.insertBefore(b, add);
    b.addEventListener('click', () => preview(saved.findIndex((x) => x.name === name)));
    render(); say(`已存为方案 ${name}，可以接着改，方案不会跟着变`);
  };
  const preview = (i) => { pv = i; render(); bn.querySelector('[data-b=cancel]').focus({ preventScroll: true }); say(`正在预览方案 ${saved[i].name}：点“应用”前不会改动当前稿`); };
  const cancel = () => { if (pv < 0) return; const n = saved[pv].name; pv = -1; render(); say(`已取消预览方案 ${n}，回到刚才的编辑`); };
  const apply = () => { const sn = saved[pv]; applied = { name: sn.name, prev: { ...work } }; work = { ...sn.s }; pv = -1; render(); say(`已应用方案 ${sn.name}，点“撤销”可回到应用前`); };
  const undoApply = () => { if (!applied) return; const n = applied.name; work = applied.prev; applied = null; render(); say(`已撤销应用方案 ${n}，回到应用前的稿子`); };
  bn.addEventListener('click', (e) => {
    const b = e.target.closest('[data-b]'); if (!b) return;
    ({ cancel, apply, undo: undoApply })[b.dataset.b]();
    if (b.dataset.b !== 'undo') (snaps.querySelector('.sn:not(.add)') || add).focus({ preventScroll: true });
  });
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && pv >= 0) { e.preventDefault(); cancel(); } });
  sw4.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) edit({ c: +b.dataset.c }); });
  root.querySelector('.seg').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) edit({ a: b.dataset.a }); });
  add.addEventListener('click', save);
  render();
  // 自动演示：存方案 A → 换配色和排版 → 预览方案 A
  const later = (ms, fn) => setTimeout(() => { if (root.host.isConnected) fn(); }, ms);
  later(400, save); later(900, () => edit({ c: 2 })); later(1300, () => edit({ a: 'c' })); later(1800, () => { pv = 0; render(); say('正在预览方案 A：点“应用”前不会改动当前稿'); });
}
</script>
