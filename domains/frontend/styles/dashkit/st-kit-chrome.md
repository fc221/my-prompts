---
zh: 铬金属后台
en: Chrome dashboard kit
aka: 镀铬后台 金属后台 银色后台 镭射后台 chrome dashboard holographic
order: 20
---

## 是什么

整个后台像一块抛光金属：银色渐变铺底、大圆角胶囊做容器，镭射色只在重点上闪一下，卡片和数字都会随光变化。

## 适合

硬件产品控制台、发布会大屏、创意工具和数字藏品类产品的总览页、想留下记忆点的活动数据页：看的人多，录入的人少。

## 不适合

要长时间办公的表格和表单后台，反光会和数据抢注意力，改用普通卡片；需要亲近感的产品也不合适。单张卡片的反光做法见「磨砂金属反光卡片」，倾斜手感见「3D 倾斜卡片」。

## 注意

金属感全靠明暗分界：渐变中段要有一道突变的亮暗交界，均匀的灰渐变只会像塑料。镭射色一屏最多两处，铺开就廉价了。文字压在最暗的那条带上也要够对比，近黑字配 #b4bcc7 以上的亮度。

## 要点

- 底座：页面底 170° 银色渐变（#f1f3f6 → #a8b1bd → #dfe3e9），文字近黑 #14171c，次级文字 #39414c
- 镀铬：面板用 180° 多段渐变，在 44%–50% 之间从 #e4e7ec 突降到 #b4bcc7 再回亮，做出一道地平线；顶边 1px 白色内阴影、底边 1px 暗色内阴影，外加一层柔和投影
- 形状：导航、按钮、小指标都是 999px 胶囊，主卡圆角 24–30px；数字用 800 字重和 tabular-nums
- 镭射色：粉、紫、青、绿、黄五色 conic-gradient，只用在主卡 2px 描边、选中态和四角星迸发
- 指针倾斜：指针位置映射到 rotateY ±12°、rotateX ±9°（perspective 约 560px），同一组坐标同时驱动镭射色相和高光位置；离开后 500ms 弹回一个微倾的静止姿态，带一次过冲；卡片可聚焦，方向键每次改 25% 的倾斜量
- 新数字：先以哑光灰出现 300ms，再让一道白色高光从左到右扫过（560ms），扫完变成上暗下亮的金属字；用 background-clip: text 实现，role="status" 播报新值
- 逐层上镀：首次进入时面板只有 1px 线框，按底板、导航、主卡、小卡分层淡入金属层，层间隔 120ms，总时长控制在 900ms 内
- 抬起倒映：小卡上移 3px、投影加深，下方出现渐隐的镜面倒影（-webkit-box-reflect，不支持时只保留抬起）
- 银线地球：加载超过 300ms 才出现，SVG 经纬线球 6–8s 转一圈，数据回来后淡出
- 四角星迸发：点击关键按钮迸出 5–7 枚四角星（clip-path 画），飞出 24–50px，约 720ms 消失，只给同步、发布这类完成动作
- 减少动态效果：卡片不倾斜、只留颜色变化；数字直接替换；关掉四角星迸发

## 提示词

把{产品}的{后台页面}做成铬金属后台，主角是{核心指标}这一张卡。

风格底座：页面底 170° 银色渐变（#f1f3f6、#a8b1bd、#dfe3e9），文字近黑 #14171c；面板用 180° 多段渐变，在 44%–50% 之间从 #e4e7ec 突降到 #b4bcc7 再回亮，顶边白色内阴影、底边暗色内阴影，外加柔和投影；导航、按钮、小指标都是 999px 胶囊，主卡圆角 28px；镭射色用粉、紫、青、绿、黄五色 conic-gradient，一屏最多两处，首选主卡 2px 描边。

从下面挑要用的交互，没挑的不做：
1. 逐层上镀：首次进入时面板先是 1px 线框，按底板、导航、主卡、小卡分层淡入金属层，层间隔 120ms，只播一次。
2. 新值抛光：数字更新时先以哑光灰显示 300ms，再让白色高光从左到右扫过 560ms，扫完变成金属字，并用 role="status" 播报新值。
3. 四角星迸发：点击{完成类按钮}时迸出 6 枚四角星，飞出 24–50px，720ms 消失。
4. 指针倾斜：指针位置映射到 rotateY ±12°、rotateX ±9°，同一组坐标同时改变镭射色相和高光位置，离开后 500ms 弹回微倾的静止姿态，卡片可聚焦，方向键也能调整倾斜。
5. 银线地球：加载超过 300ms 时显示 SVG 经纬线球，7s 转一圈，数据回来后淡出。
6. 抬起倒映：小卡上移 3px、投影加深，下方出现渐隐的镜面倒影，不支持倒影的浏览器只保留抬起。

减少动态效果时，卡片不倾斜，数字直接替换，关掉四角星迸发。

## 示例

<style>
:host{container-type:size}
.w{--ink:#14171c;--soft:#39414c;--holo:#ff9ad5,#b9a2ff,#7fdcff,#8dffc8,#fff3a0,#ff9ad5;position:relative;height:100%;overflow:hidden;display:flex;flex-direction:column;gap:10px;padding:10px 12px 12px;background:linear-gradient(170deg,#f1f3f6 0%,#cfd5dd 34%,#a8b1bd 52%,#dfe3e9 72%,#b7bfca 100%);color:var(--ink);font:12px/1.4 system-ui,"PingFang SC",sans-serif}
.plate{background:linear-gradient(180deg,#fdfefe 0%,#e4e7ec 44%,#b4bcc7 50%,#e9ecf0 76%,#d3d8df 100%);box-shadow:inset 0 1px 0 #fff,inset 0 -1px 0 rgba(20,23,28,.28),0 4px 10px rgba(35,44,58,.26)}
.bar{display:flex;align-items:center;gap:8px;height:34px;padding:0 5px 0 14px;border-radius:999px}
.logo{font-size:13px;font-weight:800;letter-spacing:-.01em}
.nav{display:none}
.sync{position:relative;margin-left:auto;height:24px;padding:0 13px;border:0;border-radius:999px;background:var(--ink);color:#f3f5f8;font:600 12px/1 system-ui,"PingFang SC",sans-serif;cursor:pointer;transition:transform .14s}
.sync:hover{transform:translateY(-1px)}
.sync:active{transform:scale(.96)}
.sync:focus-visible,.card:focus-visible{outline:2px solid var(--ink);outline-offset:2px}
.grid{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,1fr) 88px;gap:10px}
.stage{min-width:0;perspective:560px;touch-action:none}
.card{--rx:0deg;--ry:0deg;--a:200deg;--gx:50%;--gy:50%;position:relative;display:flex;flex-direction:column;height:100%;padding:11px 14px;border-radius:24px;transform:rotateX(var(--rx)) rotateY(var(--ry));transition:transform .5s cubic-bezier(.3,1.5,.5,1)}
.card.live{transition:transform .08s linear}
.ring,.sheen{position:absolute;inset:0;border-radius:inherit;pointer-events:none}
.ring{padding:2px;background:conic-gradient(from var(--a),var(--holo));mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0)}
.sheen{background:radial-gradient(circle at var(--gx) var(--gy),rgba(255,255,255,.85),transparent 42%),conic-gradient(from var(--a) at var(--gx) var(--gy),var(--holo));opacity:.42;mix-blend-mode:soft-light}
.card small{position:relative;font-size:12px;color:var(--soft)}
.num{position:relative;align-self:flex-start;margin-top:1px;font-size:26px;line-height:1.2;font-weight:800;letter-spacing:-.02em;font-variant-numeric:tabular-nums;background:linear-gradient(100deg,transparent 42%,#fff 50%,transparent 58%) -30% 0/300% 100%,linear-gradient(180deg,#0e1115 0 50%,#3a424d 54% 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
.num.matte{background:none;color:#5b636e}
.spark{position:relative;flex:1;min-height:0;width:100%;margin-top:2px}
.spark polyline{fill:none;stroke:var(--ink);stroke-width:1.5;vector-effect:non-scaling-stroke}
.delta{position:relative;align-self:flex-start;font-weight:700}
.stats{display:flex;flex-direction:column;gap:9px;margin:0;padding:0;list-style:none}
.stat{flex:1;display:flex;flex-direction:column;justify-content:center;padding:0 14px;border-radius:999px;transition:transform .18s,box-shadow .18s}
.stat span{color:var(--soft);font-size:11px}
.stat b{font-size:15px;line-height:1.15;font-variant-numeric:tabular-nums}
.stat:nth-child(3){display:none}
.stat:hover{transform:translateY(-3px);box-shadow:inset 0 1px 0 #fff,inset 0 -1px 0 rgba(20,23,28,.28),0 9px 16px rgba(35,44,58,.32)}
.star{position:absolute;width:22px;height:22px;margin:-11px 0 0 -11px;background:conic-gradient(#ff4fb8,#7d5cff,#20b8ff,#22d68f,#ffc933,#ff4fb8);clip-path:polygon(50% 0,58% 42%,100% 50%,58% 58%,50% 100%,42% 58%,0 50%,42% 42%);pointer-events:none}
.sr{position:absolute;width:1px;height:1px;margin:0;overflow:hidden;clip-path:inset(50%)}
@container (min-width:520px){
.w{gap:14px;padding:14px 18px 18px}
.bar{height:42px;padding:0 7px 0 20px;gap:18px}
.logo{font-size:15px}
.nav{display:flex;gap:4px;color:var(--soft)}
.nav span{padding:4px 12px;border-radius:999px}
.nav .on{background:var(--ink);color:#f3f5f8}
.sync{height:28px;padding:0 16px}
.grid{grid-template-columns:minmax(0,1fr) 150px;gap:16px}
.card{padding:18px 24px;border-radius:30px}
.card small{font-size:13px}
.num{font-size:42px}
.stats{gap:14px}
.stat{padding:0 22px}
.stat span{font-size:12px}
.stat b{font-size:20px}
.stat:nth-child(3){display:flex}
.stat:hover{-webkit-box-reflect:below 3px linear-gradient(transparent 58%,rgba(0,0,0,.28))}
}
@media (prefers-reduced-motion:reduce){
.card,.card.live,.sync,.stat{transition:none}
.stat:hover,.sync:hover,.sync:active{transform:none}
}
@media (prefers-reduced-transparency:reduce){
.sheen{display:none}
}
</style>

<div class="w">
  <header class="bar plate">
    <b class="logo">MyPrompts</b>
    <div class="nav"><span class="on">总览</span><span>订单</span><span>报表</span></div>
    <button type="button" class="sync">同步</button>
  </header>
  <div class="grid">
    <div class="stage">
      <section class="card plate" tabindex="0" aria-label="本月净收入卡片，方向键可倾斜">
        <span class="sheen"></span><span class="ring"></span>
        <small>本月净收入</small>
        <strong class="num">¥1,284,060</strong>
        <svg class="spark" viewBox="0 0 120 30" preserveAspectRatio="none" aria-hidden="true"><polyline points="0,25 16,21 32,23 48,14 64,17 80,9 96,11 120,3"/></svg>
        <span class="delta">较上月 +12.4%</span>
      </section>
    </div>
    <ul class="stats">
      <li class="stat plate"><span>新客</span><b>2,418</b></li>
      <li class="stat plate"><span>留存</span><b>86%</b></li>
      <li class="stat plate"><span>待办</span><b>37</b></li>
    </ul>
  </div>
  <p class="sr" role="status"></p>
</div>

<script type="module">
export default function demo(root) {
  const VALUES = ['¥1,309,480', '¥1,352,915', '¥1,284,060'];
  const REST = [0.55, -0.35];
  const w = root.querySelector('.w'), stage = root.querySelector('.stage'), card = root.querySelector('.card');
  const num = root.querySelector('.num'), sync = root.querySelector('.sync'), say = root.querySelector('.sr');
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let tilt = [...REST], step = 0, timer = 0;

  // 倾斜角、镭射色相、高光位置都从同一组指针坐标算出来，减少动态效果时只留颜色变化
  function pose(nx, ny) {
    tilt = [nx, ny];
    const s = card.style;
    s.setProperty('--a', 200 + nx * 130 + ny * 70 + 'deg');
    s.setProperty('--gx', 50 + nx * 46 + '%');
    s.setProperty('--gy', 50 + ny * 46 + '%');
    if (calm) return;
    s.setProperty('--ry', nx * 12 + 'deg');
    s.setProperty('--rx', -ny * 9 + 'deg');
  }

  stage.addEventListener('pointermove', (e) => {
    const r = stage.getBoundingClientRect();
    card.classList.add('live');
    pose(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
  });
  stage.addEventListener('pointerleave', () => {
    card.classList.remove('live');
    pose(...REST);
  });
  const NUDGE = { ArrowLeft: [-0.25, 0], ArrowRight: [0.25, 0], ArrowUp: [0, -0.25], ArrowDown: [0, 0.25] };
  card.addEventListener('keydown', (e) => {
    const d = NUDGE[e.key];
    if (!d) return;
    e.preventDefault();
    pose(Math.max(-1, Math.min(1, tilt[0] + d[0])), Math.max(-1, Math.min(1, tilt[1] + d[1])));
  });

  // 新数字先以哑光出现，高光扫过后才变成金属
  function update(value) {
    clearTimeout(timer);
    num.getAnimations().forEach((a) => a.cancel());
    num.textContent = value;
    say.textContent = '本月净收入已更新为 ' + value;
    if (calm) return;
    num.classList.add('matte');
    timer = setTimeout(() => {
      num.classList.remove('matte');
      num.animate([{ backgroundPosition: '130% 0, 0 0' }, { backgroundPosition: '-30% 0, 0 0' }], { duration: 560, easing: 'ease-in-out' });
    }, 300);
  }

  function burst() {
    if (calm) return;
    const a = w.getBoundingClientRect(), b = sync.getBoundingClientRect();
    for (let i = 0; i < 7; i++) {
      const star = document.createElement('i'), turn = (i / 7) * Math.PI * 2 + Math.random() * 0.5, far = 24 + Math.random() * 26;
      star.className = 'star';
      star.setAttribute('aria-hidden', 'true');
      star.style.left = b.left - a.left + b.width / 2 + 'px';
      star.style.top = b.top - a.top + b.height / 2 + 'px';
      w.append(star);
      const to = `translate(${Math.cos(turn) * far}px,${Math.sin(turn) * far}px)`;
      star.animate([
        { transform: 'scale(0) rotate(0deg)', easing: 'cubic-bezier(.2,.7,.3,1)' },
        { transform: `${to} scale(1) rotate(40deg)`, offset: 0.45 },
        { transform: `${to} scale(.9) rotate(70deg)`, offset: 0.75 },
        { transform: `${to} scale(0) rotate(100deg)` },
      ], { duration: 720 }).finished.then(() => star.remove());
    }
  }

  sync.addEventListener('click', () => {
    burst();
    update(VALUES[step++ % VALUES.length]);
  });
  pose(...REST);
  setTimeout(() => {
    if (root.host.isConnected) update('¥1,284,060');
  }, 80);
}
</script>
