---
zh: 调整随时可撤回
en: Non-destructive adjustments
order: 60
---

## 是什么

滤镜、调色、阴影这类效果作为一项项独立的调整叠在原图上，每项都能单独关掉、改数值、再打开，原图始终不被改动。

## 适合

图片和视频编辑、海报和图表样式、主题配色、文字效果。

## 不适合

本身就是改写内容的操作（剪掉一段音频、合并单元格）用撤销历史；只有一个开关、没有强度可调的效果直接用普通开关。

## 注意

关掉一项只是暂时不应用它，数值要留着：重新打开回到原来的强度，而不是归零。

## 要点

- 存原始素材和一组调整项（类型、数值、开关、顺序），画面每次都由原图按顺序算出来
- 每项一行：开关、名称、滑杆、数值；关闭后整行变浅、滑杆禁用，数值照常显示，画面上不再体现它
- 关掉一项不影响其他项；“对比原图”按住或切换时临时只显示原图，松开回到效果
- “重置”只把这一项恢复默认值，不动其他项
- 导出生成新文件，不覆盖原素材；保存的是调整参数，以后还能接着改
- 开关用 role="switch"，名称写“暖色”；切换后播报“暖色已关闭，数值 40 保留”
- 画面变化只做 150ms 以内的淡变，减少动态效果时直接切换

## 提示词

把{编辑器}里的{效果，如 曝光 / 暖色 / 暗角}改成「调整随时可撤回」：保留原始素材，每项效果单独保存数值、开关和顺序，预览每次由原图加上已开启的调整算出；每项一行：开关 + 名称 + 滑杆 + 数值，关闭后整行变浅、滑杆禁用但保留数值，重新打开恢复原强度；关掉一项不影响其他项；提供“对比原图”（按住或切换）和单项“重置”；导出另存新文件，不覆盖原素材；开关用 role="switch"，切换后用 role="status" 播报“{效果}已关闭，数值保留”。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;grid-template-rows:minmax(0,1fr) auto;gap:6px;padding:8px 12px}
.ed{display:grid;grid-template-columns:minmax(0,.62fr) minmax(0,1.38fr);gap:8px;min-height:0;width:100%;max-width:600px;margin:0 auto}
.cv{position:relative;display:grid;place-items:center;min-height:0;padding:6px;border-radius:10px;background:#1f2329}
.fr{position:relative;width:100%;height:100%;border-radius:4px;overflow:hidden}
.ph,.vg{position:absolute;inset:0}
.ph{background:radial-gradient(circle at 50% 36%,#ffe7b0 0 7%,transparent 8%),linear-gradient(172deg,transparent 60%,#3d5a48 60.5%),linear-gradient(188deg,transparent 66%,#5b7f5e 66.5%),linear-gradient(180deg,#d9784f,#eeae7a 42%,#9fb6bb 62%,#6d968a);transition:filter .12s}
.vg{background:radial-gradient(ellipse at center,transparent 45%,rgba(10,12,16,.85) 100%);transition:opacity .12s}
.orig{position:absolute;left:50%;bottom:10px;display:none;padding:0 8px;border-radius:999px;background:rgba(255,255,255,.9);color:#1f2329;font-size:11px;line-height:20px;white-space:nowrap;transform:translateX(-50%)}
.cmp .orig{display:block}
.pn{display:flex;flex-direction:column;gap:4px;min-width:0;padding:6px 10px;background:#fff;border:1px solid #e3e6eb;border-radius:10px}
.tb{display:flex;align-items:center;gap:6px;min-height:26px}
.tb b{flex:1;min-width:0;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tb b small{color:#5b616e;font-weight:400}
.vs{height:24px;padding:0 8px;border:1px solid #e3e6eb;border-radius:6px;background:#fff;font-size:12px;white-space:nowrap}
.vs:hover{background:#f5f6f8}
.vs[aria-pressed=true]{border-color:#3b5bdb;background:#edf1ff;color:#3b5bdb}
.aj{display:grid;grid-template-columns:auto 26px minmax(0,1fr) 30px;align-items:center;gap:6px;height:30px;font-size:12px;transition:opacity .12s}
.aj .sw i{width:26px;height:15px}
.aj .sw i::after{width:11px;height:11px}
.aj .sw input:checked+i{background:#3b5bdb}
.aj .sw input:checked+i::after{transform:translateX(11px)}
.aj input[type=range]{width:100%;min-width:0;height:16px;margin:0;accent-color:#3b5bdb}
.aj output{text-align:right;font-variant-numeric:tabular-nums;font-weight:600}
.aj.off{opacity:.45}
.aj.off output{text-decoration:line-through}
.msg{margin:0;min-height:18px;color:#5b616e;font-size:12px;text-align:center}
@media (prefers-reduced-motion:reduce){.ph,.vg,.aj{transition:none}
}
@container (min-height:250px){.st{gap:10px;padding:16px 24px}
.pn{gap:8px;padding:12px 14px}
.tb b{font-size:13px}
.aj{height:34px;font-size:13px;grid-template-columns:auto 32px minmax(0,1fr) 36px;gap:10px}
}
</style>

<div class="st"><div class="ed"><div class="cv"><div class="fr"><div class="ph" role="img" aria-label="黄昏山谷照片预览"></div><div class="vg" aria-hidden="true"></div><span class="orig">原图 · 未改动</span></div></div><div class="pn"><div class="tb"><b>调整 <small class="n"></small></b><button type="button" class="vs" aria-pressed="false">对比原图</button></div><div class="list"></div></div></div><p class="msg" role="status"></p></div>

<script type="module">
export default function demo(root) {
  // 原图不动；每项调整单独保存数值和开关，预览每次从原图重新算
  const A = [
    { k: 'exp', name: '曝光', min: -50, max: 50, v: 12, on: true },
    { k: 'warm', name: '暖色', min: 0, max: 100, v: 40, on: true },
    { k: 'vig', name: '暗角', min: 0, max: 100, v: 60, on: true },
  ];
  const ph = root.querySelector('.ph'), vg = root.querySelector('.vg'), cv = root.querySelector('.cv'), vs = root.querySelector('.vs'), n = root.querySelector('.n'), msg = root.querySelector('.msg'), list = root.querySelector('.list');
  list.innerHTML = A.map((a) => `<div class="aj" data-k="${a.k}"><label class="sw"><input type="checkbox" role="switch" checked aria-label="${a.name}"><i></i></label><span>${a.name}</span><input type="range" min="${a.min}" max="${a.max}" value="${a.v}" aria-label="${a.name}强度"><output></output></div>`).join('');
  let cmp = false;
  const fmt = (a) => (a.k === 'exp' && a.v > 0 ? '+' : '') + a.v;
  const render = () => {
    const on = (k) => { const a = A.find((x) => x.k === k); return a.on && !cmp ? a.v : 0; };
    const f = [];
    if (on('exp')) f.push(`brightness(${1 + on('exp') / 100})`);
    if (on('warm')) f.push(`sepia(${on('warm') / 250}) saturate(${1 + on('warm') / 250})`);
    ph.style.filter = f.join(' ') || 'none'; vg.style.opacity = on('vig') / 100;
    cv.classList.toggle('cmp', cmp);
    A.forEach((a) => {
      const row = list.querySelector(`[data-k="${a.k}"]`), r = row.querySelector('input[type=range]');
      row.classList.toggle('off', !a.on); r.disabled = !a.on; r.value = a.v; row.querySelector('output').textContent = fmt(a);
    });
    n.textContent = `· ${A.filter((a) => a.on).length} / ${A.length} 项生效`;
  };
  list.addEventListener('input', (e) => {
    const row = e.target.closest('.aj'), a = A.find((x) => x.k === row.dataset.k);
    if (e.target.type === 'range') { a.v = +e.target.value; render(); }
  });
  list.addEventListener('change', (e) => {
    if (e.target.type !== 'checkbox') return;
    const a = A.find((x) => x.k === e.target.closest('.aj').dataset.k), rest = A.filter((x) => x !== a && x.on).map((x) => x.name);
    a.on = e.target.checked; render();
    msg.textContent = a.on ? `${a.name}已打开，回到原来的 ${fmt(a)}` : `${a.name}已关闭，数值 ${fmt(a)} 保留${rest.length ? `；${rest.join('、')}仍生效` : ''}`;
  });
  vs.addEventListener('click', () => {
    cmp = !cmp; vs.setAttribute('aria-pressed', String(cmp)); render();
    msg.textContent = cmp ? '正在看原图，再点一次回到调整后的效果' : '已回到调整后的效果';
  });
  render();
  msg.textContent = '原图不变，每项调整都能单独关掉再打开';
  setTimeout(() => { if (root.host.isConnected) list.querySelector('[data-k=warm] input[type=checkbox]').click(); }, 700);
}
</script>
