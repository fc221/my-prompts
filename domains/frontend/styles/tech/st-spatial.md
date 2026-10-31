---
zh: 空间界面
en: Spatial UI
aka: 空间计算 悬浮窗口 景深界面 头显界面 spatial depth
order: 70
---

## 是什么

几块半透明的窗口悬浮在一片虚化的环境里：远处的窗口更小、更虚，近处的清楚；窗口下方投出柔和的影子和环境光，旁边漂着独立的小工具条，指针一动，各层按远近错开一点。

## 适合

智能家居和影音控制、发布会和展会的产品首屏、沉浸式看房看车和导览、头显或大屏应用的官网展示。

## 不适合

信息密集的后台和长表单：层次和虚化会抢注意力，改用「科技深色」或「Bento 网格」；只要一张磨砂卡片浮在色块上用「玻璃拟态」；要发光的科幻数据屏用「科幻大屏」。

## 注意

层次靠“大小、虚化、影子、视差”四样一起讲清楚，只加模糊不够。最多三层，主窗口始终最近、最清楚；能操作的东西只放在主窗口和它的工具条上，远处的窗口只看不点。

## 要点

- 环境：深色虚化背景（暖灰 #2a2622 到 #4a3f36 的房间，或夜色湖景），用大半径渐变画，亮度中低，让窗口成为画面里最亮的东西
- 窗口材质：rgba(118,118,128,.32) 的中性灰玻璃，backdrop-filter: blur(28–40px) saturate(150%)；顶边 1px rgba(255,255,255,.35) 亮线做环境光；窗口圆角 24–32px，按钮 999px 胶囊
- 层次：最多三层；远层 scale(.86)、filter: blur(1.5–2px)、透明度 .7；主层清晰；工具条贴在主窗口外侧 12–16px，单独成块
- 影子和环境光：主窗口投影 0 30px 60px -12px rgba(0,0,0,.45)，下方再放一团 rgba(255,220,180,.18) 的径向光晕，像窗口照亮了地面；窗口下方 8px 处一根 36×5px 的抓手条
- 文字：system-ui / PingFang SC，标题 17–20px / 600，正文 13–15px；白字 #ffffff，次要信息 rgba(255,255,255,.72)，按灰玻璃最亮处核对对比度 ≥ 4.5:1
- 视差：指针相对画面中心的偏移乘以各层系数（远层 4px、主层 10px、工具条 16px），再加最多 3° 的 rotateX / rotateY，用 300ms 缓动追过去；只动 transform
- 悬停：按钮背景提亮到 rgba(255,255,255,.18) 并放大到 1.04，点击区 ≥ 44px；减少动态效果时去掉视差和放大，prefers-reduced-transparency 时窗口改为 #3a3a40 实底
- 窄屏：只留主窗口和工具条，远层隐藏，工具条从侧边移到窗口下方横排

## 提示词

把{产品}的{首屏或控制面板}做成空间界面风：背景是一片深色虚化的{环境}，用大半径渐变画，亮度中低；画三层悬浮窗口：远层 scale(.86)、blur(2px)、透明度 .7，只展示不操作；主窗口用 rgba(118,118,128,.32) 灰玻璃加 backdrop-filter: blur(32px) saturate(150%)，顶边 1px rgba(255,255,255,.35) 亮线，圆角 28px，投影 0 30px 60px -12px rgba(0,0,0,.45)，下方放一团暖色径向光晕和一根 36×5px 抓手条；工具条单独悬浮在主窗口外侧 14px，胶囊形，按钮至少 44px；白字标题 18px / 600、次要文字 72% 白，对比度 ≥ 4.5:1；指针移动时各层按远近平移 4 / 10 / 16px，加最多 3° 的旋转，300ms 缓动追随，只动 transform；按钮悬停提亮并放大到 1.04；减少动态效果时去掉视差，开启减少透明度时窗口改实底；窄屏隐藏远层，工具条移到窗口下方。

## 示例

<style>
:host{container-type:size}
.s{--px:0;--py:0;position:relative;height:100%;overflow:hidden;background:#2a2622;color:#fff;font:12px/1.35 system-ui,-apple-system,"PingFang SC",sans-serif;perspective:900px;-webkit-tap-highlight-color:transparent}
button,input{font:inherit;color:inherit;margin:0}
button{cursor:pointer}
.env{position:absolute;inset:-24px;background:radial-gradient(ellipse 30% 42% at 16% 34%,rgba(255,186,110,var(--lamp,.55)),transparent 70%),radial-gradient(ellipse 34% 50% at 86% 22%,rgba(120,146,200,.5),transparent 70%),radial-gradient(ellipse 60% 26% at 52% 92%,#5a4636,transparent 72%),linear-gradient(180deg,#3a332c 0%,#4a3f36 55%,#241f1b 100%);filter:blur(8px);transform:translate(calc(var(--px) * -3px),calc(var(--py) * -3px));transition:transform .3s cubic-bezier(.2,.7,.3,1)}
.env::before{content:"";position:absolute;left:8%;right:44%;top:58%;height:22%;border-radius:40px 40px 12px 12px;background:#1d1916;opacity:.75}
.env::after{content:"";position:absolute;left:66%;top:14%;width:16%;height:34%;border-radius:6px;background:linear-gradient(180deg,rgba(170,190,230,.45),rgba(110,130,170,.2))}
.glow{position:absolute;left:50%;bottom:-6%;width:70%;height:40%;margin-left:-35%;border-radius:50%;background:radial-gradient(closest-side,rgba(255,220,180,.2),transparent);pointer-events:none}
.w{position:absolute;border-radius:24px;background:rgba(118,118,128,.32);-webkit-backdrop-filter:blur(32px) saturate(150%);backdrop-filter:blur(32px) saturate(150%);box-shadow:inset 0 1px 0 rgba(255,255,255,.35),inset 0 0 0 1px rgba(255,255,255,.08),0 30px 60px -12px rgba(0,0,0,.45);transition:transform .3s cubic-bezier(.2,.7,.3,1)}
.far{left:12px;top:10px;width:168px;padding:10px;display:flex;gap:10px;align-items:center;opacity:.7;filter:blur(1.5px);transform-origin:0 0;transform:translate(calc(var(--px) * 4px),calc(var(--py) * 4px)) scale(.86)}
.far i{flex:none;width:46px;height:58px;border-radius:12px;background:linear-gradient(160deg,#7fc4d8,#3b6f9a 55%,#1f3a5a)}
.far b{display:block;font-size:13px;font-weight:600}
.far small{color:rgba(255,255,255,.72);font-size:11px}
.main{right:66px;top:42px;width:min(196px,calc(100% - 124px));padding:12px;display:grid;gap:8px;transform:translate(calc(var(--px) * 10px),calc(var(--py) * 10px)) rotateY(calc(var(--px) * 3deg)) rotateX(calc(var(--py) * -3deg))}
.hd{display:flex;justify-content:space-between;align-items:baseline;gap:6px;white-space:nowrap}
.hd b{font-size:14px;font-weight:600}
.hd small,.lt small{color:rgba(255,255,255,.72);font-size:11px}
.lt{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:8px}
.lt input{-webkit-appearance:none;appearance:none;width:100%;height:20px;background:none;cursor:pointer}
.lt input::-webkit-slider-runnable-track{height:6px;border-radius:3px;background:linear-gradient(#fff,#fff) 0/var(--p,30%) 100% no-repeat,rgba(255,255,255,.22)}
.lt input::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;margin-top:-5px;border-radius:50%;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.35)}
.lt input::-moz-range-track{height:6px;border-radius:3px;background:rgba(255,255,255,.22)}
.lt input::-moz-range-progress{height:6px;border-radius:3px;background:#fff}
.lt input::-moz-range-thumb{width:16px;height:16px;border:0;border-radius:50%;background:#fff}
.lt input:focus-visible{outline:2px solid #fff;outline-offset:2px;border-radius:4px}
.pills{display:flex;gap:6px}
.pl{flex:1;min-width:0;height:30px;padding:0 8px;border:0;border-radius:999px;background:rgba(255,255,255,.1);font-size:12px;font-weight:500;white-space:nowrap;transition:background-color .2s,transform .2s}
.pl[aria-pressed=true]{background:rgba(255,255,255,.88);color:#22201d}
.grab{position:absolute;left:50%;bottom:-13px;width:36px;height:5px;margin-left:-18px;border-radius:3px;background:rgba(255,255,255,.5)}
.orn{position:absolute;right:12px;top:52px;display:flex;flex-direction:column;gap:4px;padding:4px;border-radius:999px;background:rgba(118,118,128,.32);-webkit-backdrop-filter:blur(32px) saturate(150%);backdrop-filter:blur(32px) saturate(150%);box-shadow:inset 0 1px 0 rgba(255,255,255,.35),0 18px 36px -10px rgba(0,0,0,.45);transform:translate(calc(var(--px) * 16px),calc(var(--py) * 16px));transition:transform .3s cubic-bezier(.2,.7,.3,1)}
.ob{display:grid;place-items:center;width:32px;height:32px;padding:0;border:0;border-radius:50%;background:none;transition:background-color .2s,transform .2s}
.ob svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.ob[aria-pressed=true]{background:rgba(255,255,255,.88);color:#22201d}
.pl:hover,.ob:hover{background:rgba(255,255,255,.18);transform:scale(1.04)}
.pl[aria-pressed=true]:hover,.ob[aria-pressed=true]:hover{background:#fff}
.pl:focus-visible,.ob:focus-visible{outline:2px solid #fff;outline-offset:2px}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@container (max-width:310px){.far{width:150px}
.main{right:60px;width:calc(100% - 112px)}
}
@container (min-height:260px){.far{left:40px;top:26px;width:270px;padding:14px;gap:14px}
.far i{width:72px;height:90px;border-radius:16px}
.far b{font-size:17px}
.far small{font-size:13px}
.main{right:118px;top:72px;width:330px;padding:20px;gap:14px;border-radius:30px}
.hd b{font-size:19px}
.hd small,.lt small{font-size:13px}
.lt{font-size:14px;gap:12px}
.pl{height:44px;font-size:14px}
.pills{gap:10px}
.grab{bottom:-16px}
.orn{right:44px;top:86px;gap:6px;padding:6px}
.ob{width:44px;height:44px}
.ob svg{width:22px;height:22px}
}
@media (prefers-reduced-motion:reduce){.w,.orn,.env,.pl,.ob{transition:none}
.pl:hover,.ob:hover{transform:none}
}
@media (prefers-reduced-transparency:reduce){.w,.orn{background:#3a3a40;-webkit-backdrop-filter:none;backdrop-filter:none}
}
</style>

<div class="s"><div class="env" aria-hidden="true"></div><div class="glow" aria-hidden="true"></div><div class="w far" aria-hidden="true"><i></i><div><small>正在播放</small><b>海岸线</b><small>第 3 集 · 42:10</small></div></div><section class="w main" aria-label="客厅控制"><div class="hd"><b>客厅 · 观影模式</b><small>4 台设备</small></div><label class="lt"><span>灯光</span><input type="range" min="0" max="100" value="30" aria-label="灯光亮度"><small class="v">30%</small></label><div class="pills"><button type="button" class="pl" aria-pressed="false" data-n="窗帘">窗帘 已关</button><button type="button" class="pl" aria-pressed="true" data-n="空调">空调 24°</button></div><i class="grab" aria-hidden="true"></i></section><div class="orn" role="group" aria-label="快捷操作"><button type="button" class="ob" aria-pressed="true" aria-label="观影模式"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 20h8"/></svg></button><button type="button" class="ob" aria-pressed="false" aria-label="阅读模式"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6c-2-1.3-4.5-1.6-8-1v13c3.5-.6 6-.3 8 1 2-1.3 4.5-1.6 8-1V5c-3.5-.6-6-.3-8 1zM12 6v13"/></svg></button><button type="button" class="ob" aria-pressed="false" aria-label="离家模式"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-5h4v5"/></svg></button></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const s = root.querySelector('.s'), range = root.querySelector('input'), v = root.querySelector('.v'), live = root.querySelector('[role=status]');
  const light = () => { const p = +range.value; v.textContent = p + '%'; range.style.setProperty('--p', p + '%'); s.style.setProperty('--lamp', (0.2 + p / 100 * 0.7).toFixed(2)); };
  range.addEventListener('input', light); range.addEventListener('change', () => { live.textContent = '灯光 ' + range.value + '%'; }); light();
  root.querySelectorAll('.pl').forEach((b) => b.addEventListener('click', () => {
    const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', String(on));
    if (b.dataset.n === '窗帘') b.textContent = on ? '窗帘 已开' : '窗帘 已关'; else b.textContent = on ? '空调 24°' : '空调 已关';
    live.textContent = b.textContent;
  }));
  const obs = [...root.querySelectorAll('.ob')];
  obs.forEach((b) => b.addEventListener('click', () => { obs.forEach((o) => o.setAttribute('aria-pressed', String(o === b))); live.textContent = '已切换到' + b.getAttribute('aria-label'); }));
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // 视差：指针相对画面中心的偏移（-1 到 1）写进 --px / --py，各层按远近乘不同系数，CSS 过渡 300ms 追过去
  const set = (x, y) => { s.style.setProperty('--px', x.toFixed(3)); s.style.setProperty('--py', y.toFixed(3)); };
  s.addEventListener('pointermove', (e) => { if (e.pointerType === 'touch') return; const r = s.getBoundingClientRect(); set(Math.max(-1, Math.min(1, (e.clientX - r.left) / r.width * 2 - 1)), Math.max(-1, Math.min(1, (e.clientY - r.top) / r.height * 2 - 1))); });
  s.addEventListener('pointerleave', () => set(0, 0));
  setTimeout(() => { if (root.host.isConnected && s.style.getPropertyValue('--px') === '') set(0.4, -0.3); }, 300);
}
</script>
