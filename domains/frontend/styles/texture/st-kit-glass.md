---
zh: 液态玻璃后台
en: Liquid glass dashboard kit
aka: 玻璃后台 暖色玻璃 毛玻璃仪表盘 glass dashboard
order: 50
of: st-glass
tab: 后台
---

## 是什么

暖色模糊渐变铺底，半透明磨砂卡片悬在上面，一张深色卡压住画面；高亮胶囊和模块尺寸变化都带水一样的弹性。

## 适合

面向管理者的经营总览、SaaS 首页仪表盘、创作者后台的概览页：模块不超过六块，以看为主。

## 不适合

长表格和密集表单，半透明层叠会拖累阅读，这类页面只在顶栏用玻璃。单块控件的折射做法见「液态玻璃」，磨砂卡的基础参数见「玻璃拟态」，这里讲整页怎么搭、模块之间怎么联动。

## 注意

深色卡是整页的压舱石，一屏一张，只放最重要的指标。暖底容易发脏，渐变用桃、橘、珊瑚这类同色系。用 transform 拉伸胶囊时圆角会跟着变形，拉伸幅度控制在 1.45 倍以内。

## 要点

- 底座：#fbe5d2 打底，叠 3 团桃、橘、珊瑚径向渐变，再放 1–2 个实心色圆给毛玻璃一点可透的东西；文字用深棕 #2b1d14
- 磨砂卡：rgba(255,255,255,.5)，blur(16px) saturate(160%)，1px 白色内描边，圆角 18–24px，投影带棕 rgba(125,70,30,.16)
- 深色卡：rgba(38,24,18,.84) 配奶白字，投影加重
- 高光胶囊：切换菜单时，胶囊中途沿运动方向拉长到 1.42 倍、纵向压到 0.84，到位越过 4px 再回弹，共 460ms，只动 transform
- 光斑：把同一指针坐标写给每张卡的 --x、--y，卡内一团 84px 径向白光，1.5px 边框层用 mask 露出同一位置，相邻卡的边框也会被照亮一段；抬手或离开后消失
- 模块铺开：点模块，它在原位占满这一排，其余收成 40–56px 宽的竖向缩略条，只留竖排标题，420ms；再点一次或点“总览”恢复；用真实 button 和 aria-expanded，菜单高亮跟着同步
- 胶囊分裂：筛选胶囊点开时先鼓到 1.06 倍，再分裂成多枚子胶囊沿水平方向滑出，间隔 40ms，接缝用 SVG 模糊加阈值滤镜；选好后合回一枚，显示已选数量
- 图标坞：底部居中，做法见「靠近就放大的图标栏」，图标下保留当前项名称
- 减少透明度时卡片改实底 #fff3e6，深色卡改 #2b1d14；减少动态效果时胶囊直接到位，模块直接切换，光斑保留

## 提示词

把{产品}的{概览页}做成液态玻璃后台，最重要的指标是{核心指标}。

风格底座：#fbe5d2 打底，叠桃、橘、珊瑚三团径向渐变和 1–2 个实心色圆；卡片 rgba(255,255,255,.5)，blur(16px) saturate(160%)，1px 白色内描边，圆角 20px，投影带棕；{核心指标}放在一张 rgba(38,24,18,.84) 的深色卡上，一屏只有这一张；文字深棕 #2b1d14，深色卡上用奶白；模块不超过六块；开启减少透明度时卡片改实底；窄屏模块上下堆叠。

从下面挑要用的交互，没挑的不做：
1. 图标坞：底部居中放{常用入口}，指针靠近时图标放大到 1.5 倍、相邻项递减，触屏时不放大。
2. 胶囊分裂：筛选胶囊点开时先鼓到 1.06 倍，再分裂成{筛选项数}枚子胶囊水平滑出，间隔 40ms，选好后合回一枚并显示已选数量。
3. 高光胶囊：切换菜单时，胶囊中途沿运动方向拉长到 1.42 倍、纵向压到 0.84，到位越过 4px 再回弹，共 460ms。
4. 模块铺开：点模块时它在原位占满这一排，其余收成 48px 宽的竖向缩略条，420ms，再点一次或点“总览”恢复，菜单高亮同步。
5. 光斑：指针移动时把同一坐标写给每张卡，卡内跟随一团 84px 径向白光，1.5px 边框层在同一位置提亮，相邻卡也被照到。

减少动态效果时胶囊直接到位，模块直接切换。

## 示例

<style>
:host{container-type:size}
.w{--ink:#2b1d14;--soft:#59412f;position:relative;height:100%;overflow:hidden;display:flex;flex-direction:column;gap:9px;padding:10px 12px 12px;background:radial-gradient(60% 80% at 12% 16%,#ffbe94,transparent 72%),radial-gradient(55% 90% at 88% 10%,#ff9a86,transparent 72%),radial-gradient(70% 90% at 62% 104%,#ffd88f,transparent 72%),#fbe5d2;color:var(--ink);font:12px/1.35 system-ui,"PingFang SC",sans-serif}
.blob{position:absolute;border-radius:50%}
.b1{width:120px;height:120px;left:32%;top:36%;background:#f0653f}
.b2{width:84px;height:84px;right:6%;bottom:-16px;background:#f7b53c}
.top{position:relative;display:flex;align-items:center;justify-content:space-between;gap:8px}
.top b{font-size:13px;font-weight:700}
.tabs{position:relative;display:flex;padding:3px;border-radius:999px;background:rgba(255,255,255,.46);-webkit-backdrop-filter:blur(12px) saturate(150%);backdrop-filter:blur(12px) saturate(150%);box-shadow:inset 0 0 0 1px rgba(255,255,255,.72)}
.hl{position:absolute;left:0;top:3px;bottom:3px;border-radius:999px;background:var(--ink)}
.tab{position:relative;height:24px;padding:0 10px;border:0;border-radius:999px;background:none;color:var(--ink);font:600 12px/1 system-ui,"PingFang SC",sans-serif;cursor:pointer;transition:color .18s}
.tab[aria-current]{color:#fff8f0}
.tab:focus-visible,.mod:focus-visible{outline:2px solid var(--ink);outline-offset:2px}
.mods{position:relative;flex:1;min-height:0;display:flex;gap:8px}
.mod{--x:-200px;--y:-200px;position:relative;flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:flex-start;gap:2px;padding:10px 11px;border:0;border-radius:18px;overflow:hidden;background:rgba(255,255,255,.52);-webkit-backdrop-filter:blur(16px) saturate(160%);backdrop-filter:blur(16px) saturate(160%);box-shadow:inset 0 0 0 1px rgba(255,255,255,.66),0 8px 20px rgba(125,70,30,.16);color:var(--ink);font:inherit;text-align:left;cursor:pointer;transition:flex .42s cubic-bezier(.3,1,.4,1)}
.mod.dark{background:rgba(38,24,18,.84);box-shadow:inset 0 0 0 1px rgba(255,255,255,.2),0 12px 26px rgba(70,35,15,.34);color:#fff6ec}
.mod::before,.mod::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none}
.mod::before{background:radial-gradient(84px circle at var(--x) var(--y),rgba(255,255,255,.5),transparent 72%)}
.mod.dark::before{background:radial-gradient(96px circle at var(--x) var(--y),rgba(255,214,170,.26),transparent 72%)}
.mod::after{padding:1.5px;background:radial-gradient(110px circle at var(--x) var(--y),#fff,transparent 72%);mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0)}
.t{position:relative;font-size:11.5px;font-weight:600;opacity:.9;white-space:nowrap}
.v{position:relative;font-size:17px;line-height:1.2;font-weight:700;letter-spacing:-.01em;white-space:nowrap}
.more{position:relative;flex:1;min-height:0;align-self:stretch;display:flex;flex-direction:column;gap:2px;margin-top:2px}
.more svg{flex:1;min-height:0;width:100%}
.more polyline{fill:none;stroke:currentColor;stroke-width:1.8;vector-effect:non-scaling-stroke}
.more polygon{fill:currentColor;opacity:.14}
.mods.has .mod{flex:0 0 40px;align-items:center;padding:12px 0}
.mods.has .mod.open{flex:1 1 0;align-items:flex-start;padding:10px 12px}
.mods.has .mod:not(.open) .t{writing-mode:vertical-rl;letter-spacing:.1em}
.mods.has .mod:not(.open) .v{display:none}
@container (min-width:520px){
.w{gap:12px;padding:14px 18px 18px}
.b1{width:190px;height:190px}
.b2{width:130px;height:130px}
.top b{font-size:15px}
.tab{height:28px;padding:0 15px;font-size:13px}
.mods{gap:12px}
.mod{padding:14px 16px;border-radius:24px}
.t{font-size:13px}
.v{font-size:26px}
.mods.has .mod{flex-basis:56px;padding:16px 0}
.mods.has .mod.open{padding:14px 18px}
.more{font-size:13px}
}
@media (prefers-reduced-motion:reduce){
.mod,.tab{transition:none}
}
@media (prefers-reduced-transparency:reduce){
.tabs{background:#fff3e6}
.mod{background:#fff3e6}
.mod.dark{background:#2b1d14}
}
</style>

<div class="w">
  <i class="blob b1"></i><i class="blob b2"></i>
  <header class="top">
    <b>MyPrompts</b>
    <nav class="tabs" aria-label="模块"><span class="hl"></span></nav>
  </header>
  <div class="mods"></div>
</div>

<script type="module">
export default function demo(root) {
  const MODS = [
    { t: '营收', v: '¥38.6 万', note: '较上周 +8.3%，周四最高', pts: '0,24 18,20 36,22 54,12 72,15 90,8 120,4', dark: true },
    { t: '订单', v: '1,920', note: '履约率 97%，退货 21 单', pts: '0,14 20,18 40,10 60,16 80,9 100,12 120,6' },
    { t: '客户', v: '6,304', note: '本周新增 148，流失 12', pts: '0,26 20,23 40,21 60,17 80,14 100,10 120,8' },
  ];
  const TABS = ['总览', ...MODS.map((m) => m.t)];
  const nav = root.querySelector('.tabs'), hl = root.querySelector('.hl'), box = root.querySelector('.mods');
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cur = 0, ballX = 0;

  nav.insertAdjacentHTML('beforeend', TABS.map((t, i) => `<button type="button" class="tab" data-i="${i}">${t}</button>`).join(''));
  box.innerHTML = MODS.map((m, i) => `<button type="button" class="mod${m.dark ? ' dark' : ''}" data-i="${i + 1}" aria-expanded="false">
    <span class="t">${m.t}</span><span class="v">${m.v}</span>
    <span class="more" hidden><svg viewBox="0 0 120 30" preserveAspectRatio="none" aria-hidden="true"><polygon points="0,30 ${m.pts} 120,30"/><polyline points="${m.pts}"/></svg><span>${m.note}</span></span>
  </button>`).join('');
  const tabs = [...nav.querySelectorAll('.tab')], mods = [...box.children];

  // 高光胶囊：中途沿运动方向拉长压扁，到位时越过一点再弹回
  function slide(i, animate) {
    const t = tabs[i], x = t.offsetLeft, dir = Math.sign(x - ballX);
    hl.style.width = t.offsetWidth + 'px';
    hl.style.transform = `translateX(${x}px)`;
    if (animate && !calm) {
      hl.animate([
        { transform: `translateX(${ballX}px) scale(1,1)` },
        { transform: `translateX(${(ballX + x) / 2}px) scale(1.42,.84)`, offset: 0.42 },
        { transform: `translateX(${x + dir * 4}px) scale(.92,1.08)`, offset: 0.74 },
        { transform: `translateX(${x}px) scale(1,1)` },
      ], { duration: 460, easing: 'cubic-bezier(.3,.7,.4,1)' });
    }
    ballX = x;
  }

  function select(i, animate = true) {
    cur = i;
    slide(i, animate);
    tabs.forEach((t, j) => (j === i ? t.setAttribute('aria-current', 'page') : t.removeAttribute('aria-current')));
    box.classList.toggle('has', i > 0);
    mods.forEach((m, j) => {
      const on = j + 1 === i;
      m.classList.toggle('open', on);
      m.setAttribute('aria-expanded', on);
      m.querySelector('.more').hidden = !on;
    });
  }

  nav.addEventListener('click', (e) => {
    const b = e.target.closest('.tab');
    if (b) select(+b.dataset.i);
  });
  box.addEventListener('click', (e) => {
    const m = e.target.closest('.mod');
    if (m) select(+m.dataset.i === cur ? 0 : +m.dataset.i);
  });

  // 光斑：每张卡都收到同一个指针位置，所以相邻卡的边框也会被照亮一段
  const light = (x, y) => mods.forEach((m) => {
    const r = m.getBoundingClientRect();
    m.style.setProperty('--x', x - r.left + 'px');
    m.style.setProperty('--y', y - r.top + 'px');
  });
  box.addEventListener('pointermove', (e) => light(e.clientX, e.clientY));
  box.addEventListener('pointerleave', () => mods.forEach((m) => {
    m.style.removeProperty('--x');
    m.style.removeProperty('--y');
  }));

  select(0, false);
  setTimeout(() => {
    if (!root.host.isConnected) return;
    select(1);
    const r = mods[0].getBoundingClientRect();
    light(r.left + r.width * 0.3, r.top + r.height * 0.2);
  }, 240);
}
</script>
