---
zh: 拆开信封
en: Opening envelope
order: 20
---

## 是什么

一封合着的信封，点开后封口沿上沿向后翻起，信纸从袋口里抽出来停在阅读位置；收起时先把信纸放回去，再合上封口。

## 适合

生日贺卡、邀请函、周年纪念信、店铺手写感谢卡这类不着急、值得留一点仪式感的内容。

## 不适合

错误提示、到期提醒、验证码这类要马上看到的内容直接显示；车票、券码用「票根式展开」；只是展开更多文字用「高度平滑展开」。

## 注意

要拆成四层：信封后片、信纸、前袋、封口。信纸只能夹在后片和前袋之间往上走；封口没翻过一半之前信纸不动，信纸没完全回袋之前封口不合。

## 要点

- 层级从后往前：后片 → 信纸 → 前袋 → 合着的封口；封口翻过 90° 时把它降到信纸后面（z-index 在翻转中点切换，不靠一个很大的 z-index 硬压）
- 封口 transform-origin 在上沿，perspective 600–900px，rotateX 0 → 180°、320–400ms；外面一面带火漆或封贴，里面一面印内衬花纹，两面都设 backface-visibility: hidden
- 封口转过一半（约 180–220ms）后信纸才上移，400–500ms 减速停稳，停下后不再晃；信封同时略往下让出位置，信纸只动 transform、字不缩放
- 收起反过来：信纸先回袋（约 300ms），完全进袋后封口再合上；中途再点从当前位置反向，不从头播、不叠加动画
- “拆开 / 收好”按钮带 aria-expanded 和 aria-controls，点信封本身也能开合；未拆开时信纸设 inert，拆开后用 role="status" 播报“信已拆开”
- 信纸停下时露出完整的称呼、正文前两三行和署名；正文更长时在信纸内滚动或进入阅读页，不缩小字号硬塞
- 内容加载好之前按钮显示加载状态，动画播完不等于已读；减少动态效果时直接切到拆开或收好的状态

## 提示词

给{产品}的{信件或贺卡}做「拆开信封」：信封拆成后片、信纸、前袋、封口四层，信纸夹在后片和前袋之间；点信封或“拆开”按钮（aria-expanded）时，封口以上沿为轴 rotateX 0 → 180°（perspective 700px，360ms），翻过一半时把封口层级降到信纸后面，封口外面带{封贴图案}、里面印内衬花纹；封口翻过一半后信纸才从袋口上移（450ms 减速停稳），信封同时下移让位，停下时露出称呼、正文前几行和署名，长正文在信纸内滚动；收起时信纸先回袋，再合上封口，中途再点从当前位置反向；未拆开时信纸设 inert，拆开后用 role="status" 播报；{信件内容}加载完成前按钮显示加载状态；减少动态效果时直接切换到拆开或收好的状态。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{background:radial-gradient(120% 90% at 50% 0,#f5f0e7,#e2dacb)}
.badge{position:absolute;left:12px;top:12px;display:flex;align-items:center;gap:5px;color:#6f604c;font-size:12px;white-space:nowrap}
.badge::before{content:"";width:7px;height:7px;border-radius:50%;background:#d0543f}
.tg{position:absolute;right:10px;top:10px;z-index:9;min-width:56px;height:30px;padding:0 12px;font-size:12px}
.env{--w:176px;--h:108px;--lw:160px;--lh:100px;--rise:-92px;--drop:64px;position:absolute;left:50%;top:50%;width:var(--w);height:var(--h);margin:calc(var(--h) / -2) 0 0 calc(var(--w) / -2);perspective:700px;cursor:pointer;transition:transform .4s cubic-bezier(.4,0,.2,1)}
.env.open{transform:translateY(var(--drop));transition:transform .5s cubic-bezier(.2,.8,.2,1) .12s}
.back{position:absolute;inset:0;border-radius:6px;background:#d6b98c;box-shadow:0 10px 22px rgba(80,55,25,.22),0 2px 4px rgba(80,55,25,.12)}
.letter{position:absolute;z-index:2;left:calc((var(--w) - var(--lw)) / 2);top:6px;width:var(--lw);height:var(--lh);padding:9px 11px;border-radius:3px;background:#fffdf7;box-shadow:0 1px 3px rgba(80,55,25,.18);color:#3d3329;cursor:auto;overflow:auto;transition:transform .3s cubic-bezier(.4,0,.2,1)}
.env.open .letter{transform:translateY(var(--rise));transition:transform .46s cubic-bezier(.2,.8,.2,1) .2s}
.letter b{display:block;font-size:12px}
.letter p{margin:2px 0 4px;font-size:11px;line-height:1.5}
.letter small{display:block;color:#8a7a66;font-size:10.5px;text-align:right}
.pocket{position:absolute;z-index:3;inset:0;border-radius:6px;background:linear-gradient(90deg,rgba(130,90,40,.1),transparent 30% 70%,rgba(130,90,40,.1)),#efdab6;clip-path:polygon(0 0,50% 54%,100% 0,100% 100%,0 100%)}
.pocket i{position:absolute;inset:0;background:linear-gradient(#e9cfa5,#e3c596);clip-path:polygon(0 100%,50% 46%,100% 100%)}
.flap{position:absolute;z-index:4;left:0;top:0;width:100%;height:58%;transform-origin:50% 0;transform-style:preserve-3d;transition:transform .36s cubic-bezier(.45,0,.25,1) .3s,z-index 0s linear .48s}
.env.open .flap{z-index:1;transform:rotateX(180deg);transition:transform .36s cubic-bezier(.45,0,.25,1),z-index 0s linear .18s}
.fo,.fi{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden}
.fo{background:linear-gradient(#e7cb9b,#dbb983);clip-path:polygon(0 0,100% 0,50% 100%)}
.fi{background:radial-gradient(#7d95b8 1.1px,transparent 1.6px) 0 0/7px 7px,#dce5ef;clip-path:polygon(50% 0,100% 100%,0 100%);transform:rotateX(180deg)}
.seal{position:absolute;left:50%;top:100%;width:24px;height:24px;margin:-16px 0 0 -12px;border-radius:50%;background:radial-gradient(circle at 38% 34%,#e9897a,#c0473a 55%,#97302a);box-shadow:0 1px 2px rgba(80,20,10,.35);backface-visibility:hidden;-webkit-backface-visibility:hidden;transform:translateZ(1px)}
.seal::after{content:"";position:absolute;inset:6px;border:1.5px solid rgba(255,220,210,.55);border-radius:50%}
@container (min-height:260px){.env{--w:250px;--h:150px;--lw:226px;--lh:140px;--rise:-132px;--drop:96px}
.badge{left:18px;top:16px;font-size:13px}
.tg{right:16px;top:14px}
.letter{padding:14px 16px}
.letter b{font-size:14px}
.letter p{margin:4px 0 8px;font-size:13px;line-height:1.6}
.letter small{font-size:12px}
.seal{width:32px;height:32px;margin:-21px 0 0 -16px}
.seal::after{inset:8px}
}
@media (prefers-reduced-motion:reduce){.env,.letter,.flap{transition:none!important}
}
</style>

<div class="st"><span class="badge">1 封来信</span><button type="button" class="ctl tg" aria-expanded="false" aria-controls="lt">拆开</button><div class="env"><i class="back"></i><div class="letter" id="lt" inert><b>小满：</b><p>新展下周六开幕，给你留了两张票，记得带那把蓝伞。</p><small>阿岚 · 10.28</small></div><i class="pocket"><i></i></i><div class="flap" aria-hidden="true"><i class="fo"></i><i class="fi"></i><i class="seal"></i></div></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const env = root.querySelector('.env'), lt = root.querySelector('.letter'), tg = root.querySelector('.tg'), live = root.querySelector('[role=status]');
  const set = (open) => {
    env.classList.toggle('open', open); lt.inert = !open;
    tg.setAttribute('aria-expanded', String(open)); tg.textContent = open ? '收好' : '拆开';
    live.textContent = open ? '信已拆开：阿岚写给小满' : '信已收好';
  };
  const toggle = () => set(!env.classList.contains('open'));
  tg.addEventListener('click', toggle);
  env.addEventListener('click', (e) => { if (!e.target.closest('.letter')) toggle(); });
  setTimeout(() => root.host.isConnected && set(true), 500);
}
</script>
