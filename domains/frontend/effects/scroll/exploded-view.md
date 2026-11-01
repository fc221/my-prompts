---
zh: 滚动拆开结构
en: Exploded view on scroll
order: 110
---

## 是什么

产品停在画面中央，往下滚动时外壳和内部模块按顺序一层层分开，正在移动的那层高亮，旁边同步显示它的名字和一句说明；往回滚就按原路装回去。

## 适合

硬件、设备、家具、包装这类“里面有什么”就是卖点的产品，用来讲清楚分层结构和每层的作用。

## 不适合

只有一张外观照、没有真实分层素材时，不要凭想象画内部；结构不是卖点的软件或服务，改用「滚动钉住叙事」讲步骤；部件超过 6 层时观众记不住，挑最重要的 4–5 层。

## 注意

每层要有自己的进度窗口、依次分开，不要所有部件同时散开；同一时刻只动一层、只高亮一层，观众才知道该看哪里。

## 要点

- 进度窗口：每层各占一段，相邻窗口重叠约 20%（如 0.06–0.3、0.26–0.5……），外壳先走、核心部件后走，底座不动；末尾留 5–10% 的停顿再放开钉住。
- 位移只沿一个轴（通常竖直），拆开后层间距一致；整体随拆开程度往下补偿约一半的升高量，始终停在视觉中心。
- 素材：每个部件一张同角度、同光照的透明渲染图或 SVG，或部件可单独控制的 3D 模型；只有外观照时做的示意图要标明“示意”，不要冒充真实内部。
- 固定角度的拆分用分层图片 + CSS transform 就够；要边拆边转视角、看材质时才上 WebGL 模型，同时准备一张拆开后的静态图做加载失败的回退。
- 说明放在单独的 HTML 层，不跟着部件做 3D 变换；部件名做成按钮，点一下就滚到该层拆开的位置，切换时用 role="status" 播报“第 N 层，共 M 层：名称”。
- 窄于 768px 或开启减少动态效果时不钉住，直接显示拆开后的定格图和完整部件列表；不滚动也能读完所有部件。

## 提示词

把{产品}的结构介绍做成「滚动拆开结构」：外层区块高约 3 个视口，舞台 position: sticky 钉住；左侧（窄屏居中）是由{层数}个部件透明渲染图叠成的{产品}，从外到内依次是{部件列表}；每个部件有自己的进度窗口（相邻重叠约 20%），在窗口里沿竖直方向升起到固定间距，用 smoothstep 缓动，底座不动，整体随拆开程度下移约一半保持居中；同一时刻只高亮正在移动的那层，右侧部件列表同步高亮并显示一句说明，列表项是按钮，点击后滚动到该层拆开的位置；进度由滚动位置算出，用 requestAnimationFrame 更新 transform，不加 transition，往回滚按原路装回；末尾留一小段停顿再放开钉住；说明文字是独立的 HTML 层，层切换时用 role="status" 播报“第 N 层，共 M 层：名称”；窄于 768px 和减少动态效果时不钉住，直接显示拆开后的定格图和完整部件列表。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{background:radial-gradient(120% 90% at 30% 40%,#232836,#12141a);color:#e8eaf0}
.page{position:relative;height:100%;overflow:auto;scrollbar-width:none}
.page::-webkit-scrollbar{display:none}
.page:focus-visible{outline-color:#7dd3fc;outline-offset:-3px}
.pin{position:relative;height:320cqh}
.stage{position:sticky;top:0;height:100cqh;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);overflow:hidden;--s:78px;--g:20px}
.scene{position:relative;perspective:900px}
.stack{position:absolute;left:50%;top:56%;width:var(--s);height:var(--s);margin:calc(var(--s) / -2) 0 0 calc(var(--s) / -2);transform-style:preserve-3d;transform:rotateX(60deg) rotateZ(-45deg)}
.ly{position:absolute;inset:0;border-radius:5px;transform-style:preserve-3d;--t:3px;--e1:#5b6170;--e2:#454a56}
.ly::before,.ly::after{content:"";position:absolute;background:var(--e1)}
.ly::before{left:0;top:100%;width:100%;height:var(--t);transform-origin:50% 0;transform:rotateX(-90deg)}
.ly::after{right:100%;top:0;width:var(--t);height:100%;background:var(--e2);transform-origin:100% 50%;transform:rotateY(-90deg)}
.base{--t:9px;--e1:#3a3e47;--e2:#2c2f37;background:repeating-linear-gradient(90deg,transparent 0 14%,#2a2d34 14% 17%) 50% 82%/70% 10% no-repeat,linear-gradient(135deg,#5a606c,#3b3f48)}
.bat{inset:16%;--t:6px;--e1:#28466e;--e2:#1e3655;background:linear-gradient(90deg,transparent 0 76%,#9fb8dc 76% 80%,transparent 80%),linear-gradient(135deg,#3d6aa8,#28466e)}
.pcb{inset:7%;--t:2px;--e1:#0f5141;--e2:#0b3d31;background:repeating-linear-gradient(0deg,transparent 0 11%,rgba(180,240,210,.25) 11% 12.5%),linear-gradient(135deg,#17775f,#0f5141)}
.pcb i{position:absolute;left:34%;top:34%;width:32%;height:32%;border-radius:3px;background:linear-gradient(135deg,#2a2e36,#121418);box-shadow:0 0 0 2px rgba(210,220,230,.35)}
.ring{inset:4%;--t:0px;background:none}
.ring::before,.ring::after{display:none}
.ring i{position:absolute;inset:6%;border-radius:50%;border:4px solid #7dd3fc;box-shadow:0 0 14px rgba(125,211,252,.75),inset 0 0 10px rgba(125,211,252,.55)}
.gls{--t:3px;--e1:rgba(220,232,250,.4);--e2:rgba(200,214,240,.3);background:linear-gradient(135deg,rgba(255,255,255,.5),rgba(190,205,230,.18) 55%,rgba(255,255,255,.32));box-shadow:inset 0 0 0 1px rgba(255,255,255,.55)}
.ly.on{box-shadow:0 0 0 2px #fbbf24,0 0 22px rgba(251,191,36,.55)}
.ring.on i{border-color:#fbbf24;box-shadow:0 0 16px rgba(251,191,36,.8),inset 0 0 10px rgba(251,191,36,.5)}
.side{display:flex;flex-direction:column;justify-content:center;gap:8px;min-width:0;padding:10px 14px 10px 0}
.parts{display:grid;gap:1px;margin:0;padding:0;list-style:none}
.parts button{display:grid;width:100%;padding:3px 8px;border:0;border-left:2px solid rgba(232,234,240,.12);border-radius:0 6px 6px 0;background:none;color:#8b91a0;text-align:left;line-height:1.35}
.parts b{font-size:12px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.parts span{display:none;color:#c7ccd8;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.parts .on{border-left-color:#fbbf24;background:rgba(251,191,36,.08);color:#fff}
.parts .on b{font-weight:600}
.parts .on span{display:block}
.parts button:hover{color:#e8eaf0}
.parts button:focus-visible,.play:focus-visible{outline-color:#7dd3fc}
.play{align-self:flex-start;height:28px;padding:0 10px;font-size:12px}
.head{color:#8b91a0;font-size:11px;letter-spacing:.04em;white-space:nowrap}
.next{display:grid;place-items:center;height:70cqh;margin:0;background:#1a1d25;color:#8b91a0}
.static .pin{height:auto}
.static .stage{position:relative}
.static .play{display:none}
@container (min-height:260px){.stage{--s:118px;--g:32px;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr)}
.side{gap:12px;padding-right:28px}
.parts{gap:4px}
.parts button{padding:5px 10px}
.parts b{font-size:13px}
.parts span{display:block;color:#6f7686;font-size:12px}
.parts .on span{color:#d6dae3}
}
</style>

<div class="st"><div class="page" tabindex="0" aria-label="结构拆解演示，可上下滚动"><section class="pin"><div class="stage"><div class="scene" aria-hidden="true"><div class="stack"><div class="ly base"></div><div class="ly bat"></div><div class="ly pcb"><i></i></div><div class="ly ring"><i></i></div><div class="ly gls"></div></div></div><div class="side"><span class="head">MyPrompts 家庭中枢 · 5 层结构</span><ol class="parts"><li><button type="button" data-k="0"><b>玻璃面板</b><span>触控玻璃，防指纹镀膜</span></button></li><li><button type="button" data-k="1"><b>灯环</b><span>48 颗灯珠显示设备状态</span></button></li><li><button type="button" data-k="2"><b>主板</b><span>四核芯片，双频无线</span></button></li><li><button type="button" data-k="3"><b>电池</b><span>断电后还能工作 8 小时</span></button></li><li><button type="button" data-k="4"><b>铝合金底壳</b><span>一体成型，底部散热</span></button></li></ol><button type="button" class="ctl play">播放滚动</button></div></div></section><p class="next">下一段：安装与兼容设备</p></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const page = root.querySelector('.page'), pin = root.querySelector('.pin'), stack = root.querySelector('.stack'), msg = root.querySelector('[role=status]');
  const L = [...stack.children].reverse(), B = [...root.querySelectorAll('.parts button')]; // L[0] 是最上面的玻璃
  const clamp = (x) => Math.min(1, Math.max(0, x)), ease = (x) => x * x * (3 - 2 * x);
  // 每层有自己的进度窗口，外层先走、往里依次跟上；底壳不动。窗口互相重叠一点，过渡不断档
  const W = [[0.06, 0.3], [0.26, 0.5], [0.46, 0.7], [0.66, 0.9]], Z = [4, 3, 2, 1, 0];
  let cur = -2, raf = 0;
  const render = (p, mark = true) => {
    const g = parseFloat(getComputedStyle(stack).getPropertyValue('--g'));
    let top = 0;
    L.forEach((el, k) => { const lift = k < 4 ? (4 - k) * g * ease(clamp((p - W[k][0]) / (W[k][1] - W[k][0]))) : 0; if (!k) top = lift; el.style.transform = `translateZ(${Z[k] + lift}px)`; });
    stack.style.transform = `translateY(${top * 0.42}px) rotateX(60deg) rotateZ(${-45 + 8 * p}deg)`; // 整体下移一半升高量，拆开时仍在视觉中心
    if (!mark) return;
    const c = p < W[0][0] ? -1 : p > 0.97 ? 4 : W.findLastIndex((w) => p >= w[0]);
    if (c === cur) return; cur = c;
    L.forEach((el, k) => el.classList.toggle('on', k === c)); B.forEach((b, k) => b.classList.toggle('on', k === c));
    msg.textContent = c < 0 ? '整机状态' : `第 ${c + 1} 层，共 5 层：${B[c].querySelector('b').textContent}，${B[c].querySelector('span').textContent}`;
  };
  const range = () => pin.offsetHeight - page.clientHeight;
  const progress = () => clamp((page.scrollTop - pin.offsetTop) / range());
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { root.querySelector('.st').classList.add('static'); render(1, false); return; }
  let queued = false;
  page.addEventListener('scroll', () => { if (queued) return; queued = true; requestAnimationFrame(() => { queued = false; render(progress()); }); }, { passive: true });
  const stop = () => cancelAnimationFrame(raf);
  // 推进 scrollTop 到目标进度；效果仍由滚动位置驱动
  const go = (to, ms) => {
    stop(); const from = page.scrollTop, end = pin.offsetTop + range() * to, t0 = performance.now(), dur = Math.max(300, ms * Math.abs(end - from) / range());
    const step = (t) => { if (!root.host.isConnected) return; const k = clamp((t - t0) / dur); page.scrollTop = from + (end - from) * (k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2); if (k < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
  };
  ['wheel', 'touchstart', 'keydown'].forEach((t) => page.addEventListener(t, (e) => { if (!e.target.closest?.('button')) stop(); }, { passive: true }));
  root.querySelector('.play').addEventListener('click', () => { if (progress() > 0.98) page.scrollTop = 0; go(1, 3200); });
  B.forEach((b, k) => b.addEventListener('click', () => go(k < 4 ? W[k][1] : 1, 1600))); // 点部件名直接拆到那一层
  render(0); setTimeout(() => root.host.isConnected && go(0.58, 3200), 500);
}
</script>
