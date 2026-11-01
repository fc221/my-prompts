---
zh: 图像生成反馈
en: Image generation feedback
aka: AI 绘图进度 出图过程 文生图 生成中 模糊到清晰
order: 70
---

## 是什么

出图时的整段反馈：画面从噪点和模糊慢慢变清楚，旁边写着排队、打草稿、上色、细化四个阶段和百分比，随时能取消；出完后可以挑一张，也可以重试。

## 适合

文生图、改图、换背景、生成封面和商品图这类要等几秒到几十秒、结果带随机性的功能。

## 不适合

一两秒内出结果时直接显示；文字回复用「流式回复消息」；普通批处理任务用「按实际步骤报进度」。

## 注意

百分比和阶段要来自后端真实事件。接口只能告诉你“还在跑”时，就只写阶段和已等待秒数，别把模拟的进度条做到 99% 再卡住。模糊的中间帧也不能被下载或保存，它只是进度的表现。

## 要点

- 组件库没有现成的出图反馈，自己做；零件用组件库的：进度条用 Element Plus el-progress（percentage，失败 status="exception"）、Naive UI n-progress（percentage，失败 status="error"）、Ant Design Vue a-progress（percent，失败 status="exception"）；取消、重试、“使用这张”用 el-button / n-button / a-button；失败原因用 el-alert / n-alert / a-alert type="error"
- 中间帧：接口能给预览图就显示真实预览，每次替换时淡入；给不了时用占位图做模糊、降饱和、叠噪点，从重到清表现“越来越清楚”；模糊层比容器放大一点并裁切，边缘才不透出背景
- 占位不改尺寸：图格按目标宽高比先占好位，出完不跳，见「图片比例与占位」；一次出多张时各张略有先后更自然
- 阶段：写清当前第几步和名称，已走过的阶段点亮；排队时写“前面 2 个任务”，比转圈更安心；进度和阶段只取接口的真实事件，拿不到百分比时只显示阶段和已等待秒数
- 取消：一直在原位，点了立即响应并通知后端停止计费任务；画面停在当前帧、进度条变灰，写“已取消，停在 37%”，按钮变“重试”
- 完成：图格变成可选按钮（aria-pressed），选中有粗外框和勾；主按钮“使用这张”在没选中时写明“先挑一张”，再加一个“重试”，重试换随机种子
- 失败（内容审核、额度不足、超时）在图格上写原因和下一步，已出的图保留
- 阶段变化时用 role="status" 播报一次，百分比不逐次播报

## 提示词

给{生图功能}做图像生成反馈，组件库没有现成的，自己做，进度条和按钮用项目组件库的（Element Plus el-progress :percentage / Naive UI n-progress :percentage / Ant Design Vue a-progress :percent，失败用各自的异常 status；按钮用 button）：左边 {张数} 个图格按目标比例占位，右边写提示词、当前阶段（第 N / 4 步：排队、打草稿、上色、细化，排队时写前面几个任务）、百分比、进度条和“取消”；接口有预览图时显示真实预览、替换时淡入；没有预览时用占位图做模糊、降饱和、叠噪点从重到清，模糊层放大一点并裁切；进度和阶段只取接口的真实事件，拿不到百分比时只显示阶段和已等待秒数；取消立即响应并通知后端，画面停在当前帧，进度条变灰，写“已取消，停在 N%”，按钮变“重试”；完成后图格变成 aria-pressed 按钮，选中有外框和勾，主按钮“使用这张”，未选时提示“先挑一张”，“重试”换随机种子；失败时在图格上写原因和下一步，保留已出的图；阶段变化用 role="status" 播报一次。接口：{生成接口}。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{padding:10px}
.w{display:grid;grid-template-columns:minmax(0,11fr) minmax(0,9fr);gap:10px;align-items:stretch;width:100%;height:100%;max-width:620px;min-height:0}
.gr{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:repeat(2,minmax(0,1fr));gap:5px;min-width:0;min-height:0}
.tl{position:relative;display:block;min-width:0;min-height:0;padding:0;overflow:hidden;border:0;border-radius:8px;background:#20242f}
.tl:disabled{cursor:default}
.tl:not(:disabled):hover .im{transform:scale(1.04)}
.im{position:absolute;left:-14%;top:-14%;width:128%;height:128%;filter:blur(calc(var(--b,0)*1px)) saturate(var(--a,1));transition:transform .2s}
.nz{position:absolute;inset:0;background-size:80px 80px;image-rendering:pixelated;opacity:var(--n,0);mix-blend-mode:overlay;pointer-events:none}
.tl[aria-pressed=true]{box-shadow:0 0 0 2px #fff,0 0 0 4px #3b5bdb}
.tl[aria-pressed=true]::after{content:"";position:absolute;right:5px;top:5px;width:18px;height:18px;border-radius:50%;background:#3b5bdb}
.ok{position:absolute;right:5px;top:5px;z-index:1;display:none;width:18px;height:18px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.tl[aria-pressed=true] .ok{display:block}
.pn{display:flex;flex-direction:column;gap:6px;min-width:0;min-height:0}
.pm{margin:0;font-size:12.5px;font-weight:500;line-height:1.4}
.stg{min-height:18px;font-size:12px;line-height:18px;color:#475467;white-space:nowrap}
.pb{position:relative;flex:none;height:6px;overflow:hidden;border-radius:3px;background:#e3e6eb}
.pb i{display:block;height:100%;width:100%;border-radius:3px;background:#3b5bdb;transform:scaleX(var(--p,0));transform-origin:0 50%}
.pn.stop .pb i{background:#98a2b3}
.dots{display:flex;gap:3px;margin:0;padding:0;list-style:none}
.dots li{flex:1;min-width:0;padding-top:4px;border-top:2px solid #dfe3e9;color:#667085;font-size:11px;line-height:14px;white-space:nowrap;transition:color .15s,border-color .15s}
.dots li.on{border-color:#3b5bdb;color:#2f49b8;font-weight:600}
.ops{display:flex;gap:6px;margin-top:auto}
.ops .b{flex:1;min-width:0;height:30px;padding:0 6px;font-size:12.5px}
.b[aria-disabled=true]{cursor:not-allowed}
@container (min-width:560px){.w{gap:18px}
.gr{gap:7px}
.pn{gap:9px;padding:4px 0}
.pm{font-size:14px}
.stg{font-size:13px}
.ops .b{height:32px;font-size:13px}
}
@container (max-width:420px){.dots{display:none}
}
</style>

<div class="s"><div class="w"><div class="gr" role="group" aria-label="生成结果，共 4 张"></div><div class="pn"><p class="pm">黄昏海边的灯塔，水彩质感</p><div class="stg"></div><div class="pb" role="progressbar" aria-label="生成进度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i></i></div><ol class="dots" aria-hidden="true"></ol><div class="ops"><button type="button" class="b a"></button><button type="button" class="b p c" hidden></button></div></div><p class="sr" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const ART = [
    { sky1: '#f4a26b', sky2: '#fbdca2', sea1: '#4e7396', sea2: '#2f5273', hill: '#3a3f5c', sun: '#fff1c4', sx: 72, sy: 34, lx: 36 },
    { sky1: '#7a6fb0', sky2: '#f2a9a0', sea1: '#5b6f9b', sea2: '#39457a', hill: '#2c2f4e', sun: '#ffe2b8', sx: 28, sy: 30, lx: 66 },
    { sky1: '#e8775a', sky2: '#f8c56f', sea1: '#35687a', sea2: '#20505f', hill: '#403247', sun: '#fff5cf', sx: 58, sy: 40, lx: 30 },
    { sky1: '#5fa3b8', sky2: '#fbe3b6', sea1: '#3f8a93', sea2: '#2a6f7a', hill: '#34525a', sun: '#fffbe0', sx: 34, sy: 28, lx: 70 },
  ];
  const STAGE = [['排队中', 0, 0.08], ['打草稿', 0.08, 0.42], ['上色', 0.42, 0.78], ['细化', 0.78, 1]];
  const DUR = 2600, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const gr = root.querySelector('.gr'), pn = root.querySelector('.pn'), stg = root.querySelector('.stg'), pb = root.querySelector('.pb'), a = root.querySelector('.a'), c = root.querySelector('.c'), dots = root.querySelector('.dots'), sr = root.querySelector('.sr');
  dots.innerHTML = STAGE.map(([t]) => `<li>${t}</li>`).join('');
  const ds = [...dots.children];
  // 噪点只生成一次，靠透明度从满到无
  const cv = Object.assign(document.createElement('canvas'), { width: 40, height: 40 }), cx = cv.getContext('2d'), nd = cx.createImageData(40, 40);
  for (let i = 0; i < nd.data.length; i += 4) { const v = Math.random() * 255; nd.data.set([v, v, v, 255], i); } cx.putImageData(nd, 0, 0);
  const noise = cv.toDataURL();
  let raf = 0, run = 0, sel = -1, phase = '', seed = 0, shown = -1, user = false;
  const scene = (i) => {
    const s = ART[(i + seed) % ART.length];
    return `<svg class="im" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style="background:linear-gradient(${s.sky1},${s.sky2} 64%)"><circle cx="${s.sx}" cy="${s.sy}" r="16" fill="${s.sun}" opacity=".28"/><circle cx="${s.sx}" cy="${s.sy}" r="9" fill="${s.sun}"/><path d="M0 64C18 52 32 58 48 62S82 52 100 62V70H0z" fill="${s.hill}" opacity=".45"/><rect y="64" width="100" height="36" fill="${s.sea1}"/><path d="M0 80q12-4 25 0t25 0 25 0 25 0v20H0z" fill="${s.sea2}"/><g fill="${s.sun}" opacity=".7"><rect x="${s.sx - 8}" y="68" width="16" height="1.4" rx=".7"/><rect x="${s.sx - 5}" y="73" width="10" height="1.4" rx=".7"/></g><g transform="translate(${s.lx} 0)"><path d="M-26 78Q-8 56 24 78z" fill="${s.hill}"/><path d="M-3.6 63L-2.4 33H2.4L3.6 63z" fill="#f7f4ee"/><path d="M-3 48H3L3.3 54H-3.3z" fill="#d8483c"/><rect x="-3" y="29" width="6" height="4" fill="#4a4f63"/><path d="M-3.6 29L0 24.5 3.6 29z" fill="#d8483c"/><circle cy="31" r="1.3" fill="#ffe9a8"/></g></svg>`;
  };
  const build = () => {
    gr.innerHTML = ART.map((_, i) => `<button type="button" class="tl" disabled aria-pressed="false" aria-label="第 ${i + 1} 张">${scene(i)}<span class="nz" style="background-image:url(${noise})"></span><svg class="ok" viewBox="0 0 18 18" aria-hidden="true"><path d="M5 9.5l3 3 5.5-6"/></svg></button>`).join('');
  };
  const tiles = () => [...gr.querySelectorAll('.tl')];
  const frame = (p) => {
    const k = STAGE.findIndex(([, , e]) => p < e), st = k < 0 ? STAGE.length - 1 : k;
    tiles().forEach((t, i) => {
      const f = p >= 1 ? 1 : still ? STAGE[st][1] : Math.min(1, p / (1 - i * 0.03)), im = t.querySelector('.im'); // 减少动态效果：只在阶段切换时变清楚一档
      im.style.setProperty('--b', (20 * (1 - f) ** 1.4).toFixed(2)); im.style.setProperty('--a', (0.45 + 0.55 * f).toFixed(2)); t.querySelector('.nz').style.setProperty('--n', (Math.max(0, 1 - f * 1.25)).toFixed(2));
    });
    pb.style.setProperty('--p', p.toFixed(3)); pb.setAttribute('aria-valuenow', Math.round(p * 100));
    if (st !== shown) { shown = st; sr.textContent = `第 ${st + 1} 步，共 4 步：${STAGE[st][0]}`; ds.forEach((d, j) => d.classList.toggle('on', j <= st)); }
    stg.textContent = st === 0 ? '排队中 · 前面 2 个' : `${STAGE[st][0]} ${st + 1}/4 · ${Math.round(p * 100)}%`;
  };
  const ops = () => {
    pn.classList.toggle('stop', phase === 'stop');
    a.textContent = phase === 'run' ? '取消' : '重试'; c.hidden = phase !== 'done'; c.textContent = '使用这张'; c.setAttribute('aria-disabled', sel < 0);
    tiles().forEach((t) => { t.disabled = phase !== 'done'; });
  };
  const start = () => {
    cancelAnimationFrame(raf); const id = ++run; sel = -1; shown = -1; phase = 'run'; build(); ops(); frame(0);
    const t0 = performance.now();
    const go = (t) => {
      if (id !== run || !root.host.isConnected) return;
      const p = Math.min(1, (t - t0) / DUR); frame(p);
      if (p < 1) raf = requestAnimationFrame(go);
      else { phase = 'done'; ops(); stg.textContent = '已完成 · 挑一张'; sr.textContent = '生成完成，共 4 张，请挑选'; autoPick(); }
    };
    raf = requestAnimationFrame(go);
  };
  const pick = (i) => { sel = sel === i ? -1 : i; tiles().forEach((t, j) => t.setAttribute('aria-pressed', j === sel)); c.setAttribute('aria-disabled', sel < 0); stg.textContent = sel < 0 ? '已完成 · 挑一张' : `已选第 ${sel + 1} 张`; };
  const autoPick = () => setTimeout(() => { if (root.host.isConnected && !user && phase === 'done' && sel < 0) pick(1); }, 500);
  a.addEventListener('click', () => {
    user = true;
    if (phase !== 'run') { seed++; return start(); }
    run++; cancelAnimationFrame(raf); phase = 'stop'; ops(); stg.textContent = `已取消，停在 ${pb.getAttribute('aria-valuenow')}%`; sr.textContent = '已取消生成'; a.focus();
  });
  c.addEventListener('click', () => { if (sel < 0) { stg.textContent = '先挑一张'; return; } user = true; sr.textContent = stg.textContent = `已使用第 ${sel + 1} 张`; });
  gr.addEventListener('click', (e) => { const t = e.target.closest('.tl'); if (t) { user = true; pick(tiles().indexOf(t)); } });
  start();
}
</script>
