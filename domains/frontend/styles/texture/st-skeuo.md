---
zh: 拟物写实
en: Skeuomorphism
aka: 拟物化 拟物风 写实质感 skeuomorphic 金属拉丝 皮革
order: 50
---

## 是什么

界面照着真实物件做：拉丝金属面板、缝线皮革、带玻璃反光的指针表头、有高光和厚度的圆顶按钮，文字像刻在金属上，一眼就知道每个东西怎么用。

## 适合

音乐和录音类 App、相机与胶片滤镜、计算器和计时器、仪表和遥控面板、复古主题的产品彩蛋，以及想让用户“摸到”质感的单个功能页。

## 不适合

内容和数据为主的页面、要频繁改版的大型产品，改用「柔和渐变」或「企业稳重」；只想要同色软浮雕的极简面板，用「新拟态（软浮雕）」；彩色、圆胖、偏可爱的 3D 控件，用「黏土拟态」。

## 注意

写实感来自统一的光源和材质逻辑：光从正上方来，所有高光在上沿、阴影在下沿，同一种材质的纹理方向一致。每屏只做 2–3 种材质，把精力放在用户会操作的控件上，背景和正文保持简单。

## 要点

- 材质配色：拉丝铝 #c9ced4 到 #b7bdc4 的竖向渐变，叠 1px 宽、间隔 3px 的白色 8% 细纹；皮革 #4a2f22 配 2px 虚线缝线 rgba(241,228,207,.5)、距边 4px；表头米色 #f4ecd6；数码窗 #1b1a17 配琥珀数字 #ffb347
- 文字：金属上用 #2d3238（对铝面 8.2:1），刻字效果 text-shadow: 0 1px 0 rgba(255,255,255,.6)；皮革上用 #f1e4cf（9.7:1）配压印阴影 0 -1px 0 rgba(0,0,0,.5)；标签 11–12px、大写英文字距 0.12em
- 字体：标签用窄体无衬线，推荐 Barlow Condensed 配思源黑体，后备 "DIN Alternate"、"Arial Narrow"、"PingFang SC"、sans-serif；读数用等宽或七段数码风格的 tabular-nums
- 厚度：面板 1px 上沿高光 rgba(255,255,255,.7) 加 1px 下沿暗线 rgba(0,0,0,.35)，外投影 0 2px 3px 加 0 10px 24px 两层；按钮圆顶用径向渐变，高光点偏上
- 状态：按下时高光收进内阴影、整体下沉 1–2px；开启状态加一颗发光指示灯（同色 0 0 8px 外发光），关闭时灯变暗灰，不只靠颜色深浅
- 指针表头：刻度和红区画在米色表面上，指针 transform-origin 在底部中心，转动用 80–160ms 的 ease-out 跟随数值，上面盖一层玻璃反光渐变
- 动效：旋钮和指针按真实惯性走，阻尼回弹不超过 200ms；减少动态效果时指针直接停在数值上、去掉抖动
- 窄屏：控件保持实物比例整体缩放，最小可点尺寸 44px；纹理细节随尺寸降级，小于 320px 去掉拉丝纹只留渐变

## 提示词

把{产品}的{功能页}做成拟物写实风：光源统一在正上方；主面板是拉丝铝（#c9ced4 到 #b7bdc4 竖向渐变，叠 1px 白色 8% 细纹），顶部一条皮革 #4a2f22 带 2px 虚线缝线；金属上文字 #2d3238 加 0 1px 0 白色 60% 的刻字阴影，皮革上文字 #f1e4cf 加压印阴影，标签用 Barlow Condensed 配思源黑体（后备 DIN Alternate、PingFang SC）大写字距 0.12em；面板上沿 1px 高光、下沿 1px 暗线、外投影两层；{核心读数}做成米色表头加指针和红区，盖玻璃反光，指针 120ms ease-out 跟随；主按钮做圆顶径向渐变，按下时下沉 2px、高光收成内阴影，旁边一颗开启时发光的指示灯；计时或读数放进 #1b1a17 数码窗、琥珀色 tabular-nums；每屏最多 3 种材质，背景和正文保持简单；减少动态效果时指针直接定位；窄屏整体等比缩放，可点区域不小于 44px。

## 示例

<style>
:host{container-type:size}
.s{height:100%;display:grid;place-items:center;padding:12px;background:radial-gradient(80% 90% at 50% 40%,#4a423b,#2b2622);color:#2d3238;font:11px/1.3 "Barlow Condensed","DIN Alternate","Arial Narrow","PingFang SC",sans-serif}
.dev{width:min(300px,100%);border-radius:14px;overflow:hidden;box-shadow:0 2px 3px rgba(0,0,0,.5),0 12px 28px rgba(0,0,0,.45)}
.lt{position:relative;display:flex;align-items:baseline;gap:8px;padding:6px 14px;background:radial-gradient(circle at 30% 20%,rgba(255,255,255,.08),transparent 60%),#4a2f22;color:#f1e4cf;text-shadow:0 -1px 0 rgba(0,0,0,.5)}
.lt::after{content:"";position:absolute;inset:4px;border:2px dashed rgba(241,228,207,.5);border-radius:8px;pointer-events:none}
.lt b{font-size:14px;letter-spacing:.2em}
.lt span{letter-spacing:.12em}
.pn{display:flex;align-items:center;gap:14px;padding:12px 14px 14px;border-top:1px solid rgba(255,255,255,.7);background:repeating-linear-gradient(90deg,rgba(255,255,255,.08) 0 1px,transparent 1px 3px),linear-gradient(#d3d7dc,#b7bdc4);box-shadow:inset 0 -1px 0 rgba(0,0,0,.35)}
.vu{position:relative;flex:1;min-width:0;aspect-ratio:12/7;border-radius:6px;background:#f4ecd6;box-shadow:inset 0 2px 6px rgba(0,0,0,.45),0 1px 0 rgba(255,255,255,.7);overflow:hidden}
.vu svg{display:block;width:100%;height:100%}
.vu path,.vu line{fill:none;stroke:#3a3326;stroke-width:1.2}
.vu .rz{stroke:#b3261e;stroke-width:3}
.vu text{fill:#3a3326;font:7px "Barlow Condensed","Arial Narrow",sans-serif;text-anchor:middle}
.vu text.r{fill:#b3261e}
.nd{transform-box:view-box;transform-origin:60px 76px;transform:rotate(-46deg);transition:transform .12s ease-out}
.nd line{stroke:#1b1a17;stroke-width:1.4}
.vu::after{content:"";position:absolute;inset:0;background:linear-gradient(165deg,rgba(255,255,255,.55),rgba(255,255,255,0) 42%);pointer-events:none}
.cl{flex:none;display:flex;flex-direction:column;align-items:center;gap:8px}
.lcd{padding:3px 6px;border-radius:3px;background:#1b1a17;color:#ffb347;font:600 13px/1 ui-monospace,Menlo,monospace;font-variant-numeric:tabular-nums;letter-spacing:.06em;box-shadow:inset 0 1px 3px rgba(0,0,0,.8),0 1px 0 rgba(255,255,255,.7);text-shadow:0 0 6px rgba(255,179,71,.5)}
.rw{display:flex;align-items:center;gap:8px}
.rec{width:44px;height:44px;border:0;border-radius:50%;background:radial-gradient(circle at 50% 28%,#ff9a8c,#d23a2c 45%,#7d140e);cursor:pointer;box-shadow:0 0 0 3px #9aa1a8,0 0 0 4px #5f666d,0 3px 5px 3px rgba(0,0,0,.35);transition:transform .1s ease-out,box-shadow .1s ease-out}
.rec[aria-pressed=true]{transform:translateY(2px);background:radial-gradient(circle at 50% 34%,#f0705f,#b52a1f 50%,#6a100b);box-shadow:0 0 0 3px #9aa1a8,0 0 0 4px #5f666d,0 1px 2px 3px rgba(0,0,0,.3),inset 0 3px 6px rgba(0,0,0,.45)}
.rec:hover{filter:brightness(1.06)}
.rec:focus-visible{outline:2px solid #ffb347;outline-offset:6px}
.led{width:8px;height:8px;border-radius:50%;background:#5a2a26;box-shadow:inset 0 1px 2px rgba(0,0,0,.6)}
.on .led{background:#ff4d3d;box-shadow:0 0 8px #ff4d3d,inset 0 -1px 2px rgba(0,0,0,.3)}
.lb{letter-spacing:.12em;text-shadow:0 1px 0 rgba(255,255,255,.6)}
@container (min-height:260px){.dev{width:430px}
.lt{padding:9px 18px}
.lt b{font-size:17px}
.pn{gap:22px;padding:18px 20px 20px}
.lcd{font-size:18px;padding:5px 9px}
.rec{width:56px;height:56px}
.lb{font-size:13px}
}
@media (prefers-reduced-motion:reduce){.nd,.rec{transition:none}
}
</style>

<div class="s">
  <div class="dev">
    <div class="lt"><b>MyPrompts</b><span>REC-70 · 便携录音机</span></div>
    <div class="pn on">
      <div class="vu" role="img" aria-label="音量表">
        <svg viewBox="0 0 120 70" aria-hidden="true"><path d="M21.7 43.9L15.6 38.7M25.9 35.4L22.7 31.6M35.0 32.7L31.0 25.8M41.9 26.2L40.2 21.5M51.3 26.8L49.9 18.9M60.0 23.0L60.0 18.0M68.7 26.8L70.1 18.9M78.1 26.2L79.8 21.5M85.0 32.7L89.0 25.8M94.1 35.4L97.3 31.6M98.3 43.9L104.4 38.7M15.6 38.7A58 58 0 0 1 79.8 21.5"/><path class="rz" d="M79.8 21.5A58 58 0 0 1 104.4 38.7"/><text x="27" y="52">-20</text><text x="36.5" y="44">-10</text><text x="52.5" y="37">-5</text><text x="67.5" y="37">0</text><text class="r" x="81.5" y="42">+2</text><text class="r" x="93" y="52">+3</text><text x="60" y="60" style="font-size:9px;letter-spacing:1px">VU</text><g class="nd"><line x1="60" y1="76" x2="60" y2="16"/></g><circle cx="60" cy="72" r="5" fill="#2d3238"/></svg>
      </div>
      <div class="cl">
        <span class="lcd" role="timer" aria-label="录音时长">00:12:48</span>
        <div class="rw"><i class="led" aria-hidden="true"></i><button type="button" class="rec" aria-pressed="true" aria-label="录音"></button></div>
        <span class="lb">REC · 录音</span>
      </div>
    </div>
  </div>
</div>

<script type="module">
export default function demo(root) {
  const pn = root.querySelector('.pn'), rec = root.querySelector('.rec'), nd = root.querySelector('.nd'), lcd = root.querySelector('.lcd');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let on = true, sec = 12 * 60 + 48, last = 0, lastSec = performance.now();
  const pad = (n) => String(n).padStart(2, '0');
  rec.onclick = () => { on = !on; rec.setAttribute('aria-pressed', String(on)); pn.classList.toggle('on', on); if (!on || still) nd.style.transform = `rotate(${on ? -12 : -46}deg)`; };
  if (still) { nd.style.transform = 'rotate(-12deg)'; }
  const loop = (now) => {
    if (!root.host.isConnected) return;
    if (on && now - lastSec >= 1000) { sec++; lastSec = now; lcd.textContent = `00:${pad(Math.floor(sec / 60))}:${pad(sec % 60)}`; }
    // 指针每 140ms 跟一次随机电平，偶尔冲进红区
    if (on && !still && now - last > 140) { last = now; const lv = Math.random() ** 1.6; nd.style.transform = `rotate(${-38 + lv * 84}deg)`; }
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}
</script>
