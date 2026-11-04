---
zh: 标签栏播放碟
en: Tab bar player disc
order: 70
---

## 是什么

底部标签栏正中嵌一个凸起的圆形封面碟，播放时缓慢旋转、外圈进度环跟着走；点碟片从原位放大成“正在播放”面板。

## 适合

音乐、播客、有声书、课程音频这类“边听边逛其它页面”的 App。

## 不适合

视频改用“视频悬浮小窗”；标签已经有 5 个以上，或播放不是核心功能时，改用标签栏上方一条细的迷你播放条。

## 注意

碟片挂在标签栏这一层，切换标签只换内容区，不重建播放器；暂停用 animation-play-state 停在当前角度，不要把旋转复位。

## 要点

- 碟片直径 48–56px，向上凸出标签栏约 16px，外圈一圈与底栏同色的白边和向上的阴影；标签栏 56px，再加底部安全区。
- 播放时碟片匀速旋转，一圈 12–20s（linear）；暂停用 animation-play-state: paused 停在当前角度，继续播放时从这个角度接着转。
- 外圈进度环用 SVG stroke-dashoffset，从 12 点方向顺时针走，每 250ms 更新一次并配 linear 过渡。
- 点碟片展开“正在播放”面板：大封面从碟片的位置和尺寸 FLIP 放大到位（320ms，cubic-bezier(.2,0,0,1)，只动 transform），背景 200ms 淡入；收起时反向缩回碟片。
- 面板 role="dialog"，打开后焦点移到“收起”，Esc 也能收起，焦点回到碟片；碟片按钮 aria-expanded 同步，名称写上曲名和播放状态。
- 切换标签只替换内容区，碟片的旋转角度和进度不重置；没有在播内容时显示占位封面且不旋转。
- 减少动态效果时碟片不旋转（进度环照常走），面板直接出现和消失，不做放大。

## 提示词

给{音频 App}做「标签栏播放碟」：底部 56px 标签栏正中嵌一个直径 52px 的圆形封面碟，向上凸出约 16px，外圈白边加向上的阴影；播放时碟片 16s 一圈匀速旋转，暂停用 animation-play-state: paused 停在当前角度、继续时接着转；碟片外圈是 SVG 进度环，从 12 点方向顺时针走；点碟片展开“正在播放”面板，大封面从碟片的位置和尺寸 FLIP 放大到位（320ms，只动 transform），收起时反向缩回碟片；面板 role="dialog"，焦点移到收起按钮，Esc 收起后焦点回到碟片，碟片 aria-expanded 同步、名称带曲名和播放状态；在{标签数}个标签之间切换时只换内容区，碟片的旋转角度和进度不重置；没有在播内容时显示占位封面且不旋转；减少动态效果时碟片不旋转，面板直接出现和消失。

## 示例

<link rel="stylesheet" href="../../_shared/app-scroll-base.css">
<style>
.st{background:#fff}
.ct{position:absolute;inset:0 0 56px;overflow-y:auto;padding:0 14px 20px;scrollbar-width:none}
.ct::-webkit-scrollbar{display:none}
.hd{display:flex;align-items:center;justify-content:space-between;gap:8px;height:38px}
.tt{font-size:17px}
.ls{list-style:none;margin:0;padding:0}
.ls li{display:flex;align-items:center;gap:10px;padding:4px 0}
.ls span{min-width:0}
.ls b,.ls small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ls b{font-weight:500}
.ls small{color:#5b616e;font-size:12px}
.ic{flex:none;width:34px;height:34px;border-radius:8px;background:linear-gradient(135deg,#ffd8a8,#f783ac)}
.ls li:nth-child(2) .ic{background:linear-gradient(135deg,#a5d8ff,#748ffc)}
.ls li:nth-child(3) .ic{background:linear-gradient(135deg,#b2f2bb,#38d9a9)}
.ls li:nth-child(4) .ic{background:linear-gradient(135deg,#eebefa,#9775fa)}
.tb{position:absolute;left:0;right:0;bottom:0;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));height:56px;background:#fff;box-shadow:0 -1px 0 #e6e8ec}
.tab{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;min-width:0;padding:0;border:0;background:none;color:#8a909c;font-size:11px}
.tab svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linejoin:round}
.tab[aria-current=page]{color:#e8590c;font-weight:600}
.mid{position:relative}
.disc{position:absolute;left:50%;top:-16px;width:60px;height:60px;margin-left:-30px;padding:0;border:0;border-radius:50%;background:#fff;box-shadow:0 -3px 10px rgba(20,24,40,.12)}
.ring{position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)}
.ring circle{fill:none;stroke-width:3}
.rb{stroke:#eef0f3}
.rf{stroke:#e8590c;stroke-linecap:round;stroke-dasharray:175.9;stroke-dashoffset:175.9;transition:stroke-dashoffset .25s linear}
.vin{position:absolute;inset:6px;border-radius:50%;background:repeating-radial-gradient(circle,#26262b 0 1.5px,#323238 1.5px 3px);animation:spin 16s linear infinite paused}
.playing .vin{animation-play-state:running}
.art{position:absolute;inset:22%;border-radius:50%;background:var(--art,#c9ced6)}
.art::before{content:"";position:absolute;left:18%;top:14%;width:34%;height:22%;border-radius:50%;background:rgba(255,255,255,.55)}
.art::after{content:"";position:absolute;inset:44%;border-radius:50%;background:#26262b}
@keyframes spin{to{transform:rotate(360deg)}
}
.np{position:absolute;inset:0;z-index:5;color:#fff;visibility:hidden;transition:visibility 0s .32s}
.np *{transition-property:opacity,transform}
.np.open{visibility:visible;transition:none}
.bg{position:absolute;inset:0;background:linear-gradient(160deg,#3b2f5c,#151222);opacity:0;transition:opacity .2s}
.open .bg{opacity:1}
.fd{opacity:0;transition:opacity .16s}
.open .fd{opacity:1;transition:opacity .2s .12s}
.nh{position:relative;display:flex;align-items:center;gap:6px;height:40px;padding:0 10px;font-size:13px}
.cls{display:grid;place-items:center;width:32px;height:32px;padding:0;border:0;border-radius:50%;background:rgba(255,255,255,.12);color:#fff}
.cls svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.nb{position:relative;display:flex;align-items:center;gap:14px;padding:0 16px 12px}
.bw{position:relative;flex:none;width:96px;height:96px;transform-origin:0 0;transition:transform .32s cubic-bezier(.2,0,0,1)}
.bw .vin{inset:0;box-shadow:0 8px 24px rgba(0,0,0,.35)}
.meta{flex:1;min-width:0}
.nm,.ar{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.nm{font-size:16px}
.ar{color:rgba(255,255,255,.72);font-size:12px}
.pr{height:3px;margin-top:10px;border-radius:2px;background:rgba(255,255,255,.2);overflow:hidden}
.pf{display:block;height:100%;background:#fff;transform-origin:left;transform:scaleX(0);transition:transform .25s linear}
.tms{display:flex;justify-content:space-between;color:rgba(255,255,255,.72);font-size:11px;font-variant-numeric:tabular-nums}
.cs{display:flex;align-items:center;gap:12px;margin-top:4px}
.cs button{display:grid;place-items:center;padding:0;border:0;border-radius:50%}
.cs svg{fill:currentColor}
.sk{width:32px;height:32px;background:none;color:#fff}
.sk svg{width:20px;height:20px}
.pl{width:40px;height:40px;background:#fff;color:#1d1a2e}
.pl svg{width:20px;height:20px}
.pl .i2,.playing .pl .i1{display:none}
.playing .pl .i2{display:block}
.cs button:focus-visible,.cls:focus-visible{outline-color:#fff}
@container (min-height:280px){.bw{width:150px;height:150px}
.nb{gap:24px;padding:12px 28px}
.nm{font-size:20px}
.ar{font-size:13px}
.pr{margin-top:16px}
.cs{margin-top:10px;gap:18px}
.pl{width:48px;height:48px}
}
</style>

<div class="st"><main class="ct"><div class="hd"><b class="tt">首页</b><button type="button" class="ctl tog">暂停</button></div><ul class="ls"></ul></main><nav class="tb" aria-label="主导航"><button type="button" class="tab" data-t="首页"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/></svg>首页</button><button type="button" class="tab" data-t="发现"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M15 9l-2 4-4 2 2-4z"/></svg>发现</button><div class="mid"><button type="button" class="disc" aria-expanded="false" aria-label="正在播放"><svg class="ring" viewBox="0 0 60 60" aria-hidden="true"><circle class="rb" cx="30" cy="30" r="28"/><circle class="rf" cx="30" cy="30" r="28"/></svg><i class="vin"><i class="art"></i></i></button></div><button type="button" class="tab" data-t="消息"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg>消息</button><button type="button" class="tab" data-t="我的"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>我的</button></nav><section class="np" role="dialog" aria-modal="true" aria-label="正在播放"><i class="bg"></i><div class="nh fd"><button type="button" class="cls" aria-label="收起"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button><span>正在播放</span></div><div class="nb"><div class="bw"><i class="vin"><i class="art"></i></i></div><div class="meta fd"><b class="nm"></b><small class="ar"></small><div class="pr" aria-hidden="true"><i class="pf"></i></div><div class="tms"><span class="cur"></span><span class="dur"></span></div><div class="cs"><button type="button" class="sk pv" aria-label="上一首"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6h2v12H6zM19 6v12l-9-6z"/></svg></button><button type="button" class="pl" aria-label="暂停"><svg class="i1" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg><svg class="i2" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg></button><button type="button" class="sk nx" aria-label="下一首"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 6h2v12h-2zM5 6v12l9-6z"/></svg></button></div></div></div></section></div>

<script type="module">
export default function demo(root) {
  const $ = (s) => root.querySelector(s), st = $('.st'), ct = $('.ct'), tb = $('.tb'), tt = $('.tt'), ls = $('.ls'), tog = $('.tog'), disc = $('.disc'), sv = disc.querySelector('.vin'), rf = $('.rf'), np = $('.np'), bw = $('.bw'), cls = $('.cls'), pl = $('.pl'), pf = $('.pf'), cur = $('.cur'), dur = $('.dur'), nm = $('.nm'), ar = $('.ar');
  const tabs = [...root.querySelectorAll('.tab')], still = matchMedia('(prefers-reduced-motion: reduce)').matches, C = 175.9;
  const S = [['海边的第七天', '林夏 · 《潮汐》', 245, '#ff9a76,#6a5acd'], ['旧书店', '周屿 · 《纸页》', 198, '#7bd5c4,#2f6f9f'], ['凌晨四点的站台', '南风乐队 · 《夜行》', 272, '#f6d365,#c05a7c']];
  const P = {
    首页: ['今日推荐', [['晨间轻音乐', '32 首 · 适合通勤路上'], ['周末午后', '慵懒爵士精选'], ['专注一小时', '白噪音与钢琴'], ['老歌新唱', '20 首翻唱合集']]],
    发现: ['发现', [['新歌速递', '本周上新 48 首'], ['城市民谣', '12 位独立音乐人'], ['电台 · 夜读', '每晚 22:00 更新'], ['现场录音', '小剧场不插电']]],
    消息: ['消息', [['林夏 回复了你', '“这首我也循环了一整天”'], ['系统通知', '你的歌单被收藏 12 次'], ['活动', '周末线下试听会报名中'], ['周屿 关注了你', '去看看他的歌单']]],
    我的: ['我的', [['我喜欢的音乐', '268 首'], ['最近播放', '今天听了 1 小时 12 分'], ['本地与下载', '36 首 · 1.2 GB'], ['我的电台', '订阅 5 个']]],
  };
  let si = 0, t = 72, playing = false, back;
  const fmt = (s) => String(s / 60 | 0).padStart(2, '0') + ':' + String(s % 60 | 0).padStart(2, '0');
  const prog = () => { const p = t / S[si][2]; rf.style.strokeDashoffset = C * (1 - p); pf.style.transform = `scaleX(${p})`; cur.textContent = fmt(t); };
  const paint = () => {
    const s = S[si];
    st.classList.toggle('playing', playing); st.style.setProperty('--art', `linear-gradient(135deg,${s[3]})`);
    nm.textContent = s[0]; ar.textContent = s[1]; dur.textContent = fmt(s[2]);
    tog.textContent = playing ? '暂停' : '播放'; pl.setAttribute('aria-label', playing ? '暂停' : '播放');
    disc.setAttribute('aria-label', `正在播放：${s[0]}，${playing ? '播放中' : '已暂停'}。展开播放页`); prog();
  };
  const tick = setInterval(() => {
    if (!root.host.isConnected) return clearInterval(tick);
    if (!playing) return;
    t += 0.25; if (t >= S[si][2]) { si = (si + 1) % S.length; t = 0; paint(); } else prog();
  }, 250);
  // 切换标签只换内容区，碟片不动
  const show = (b) => {
    tabs.forEach((x) => (x === b ? x.setAttribute('aria-current', 'page') : x.removeAttribute('aria-current')));
    const [title, rows] = P[b.dataset.t];
    tt.textContent = title; ls.innerHTML = rows.map(([a, c]) => `<li><i class="ic"></i><span><b>${a}</b><small>${c}</small></span></li>`).join('');
  };
  tabs.forEach((b) => b.addEventListener('click', () => show(b)));
  const toggle = () => { playing = !playing; paint(); };
  tog.addEventListener('click', toggle); pl.addEventListener('click', toggle);
  const skip = (d) => { si = (si + d + S.length) % S.length; t = 0; paint(); };
  $('.pv').addEventListener('click', () => skip(-1)); $('.nx').addEventListener('click', () => skip(1));
  // FLIP：大封面先放到碟片的位置和尺寸，再过渡回自己的位置；外层 .bw 负责位移缩放，里层 .vin 负责旋转
  const fromDisc = () => { const a = sv.getBoundingClientRect(), b = bw.getBoundingClientRect(); return `translate(${a.left - b.left}px,${a.top - b.top}px) scale(${a.width / b.width})`; };
  const open = () => {
    clearTimeout(back); bw.style.transition = 'none'; bw.style.transform = '';
    np.classList.add('open'); disc.setAttribute('aria-expanded', 'true'); ct.inert = tb.inert = true;
    if (!still) { bw.style.transform = fromDisc(); bw.getBoundingClientRect(); bw.style.transition = ''; bw.style.transform = ''; }
    cls.focus({ preventScroll: true });
  };
  const close = () => {
    if (!np.classList.contains('open')) return;
    if (!still) { bw.style.transform = fromDisc(); back = setTimeout(() => { bw.style.transition = 'none'; bw.style.transform = ''; }, 340); }
    np.classList.remove('open'); disc.setAttribute('aria-expanded', 'false'); ct.inert = tb.inert = false;
    disc.focus({ preventScroll: true });
  };
  disc.addEventListener('click', open); cls.addEventListener('click', close);
  np.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  // 缩略图：开播，然后切一次标签，碟片和进度保持不变
  playing = true; paint(); show(tabs[0]);
  setTimeout(() => show(tabs[1]), 700);
}
</script>
