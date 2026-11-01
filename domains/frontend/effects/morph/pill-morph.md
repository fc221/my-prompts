---
zh: 小圆点长成卡片
en: Dot to card morph
order: 20
---

## 是什么

屏幕顶部一个表示“正在进行”的小圆点，点一下长成带文字的胶囊，再点一下长成有数据和按钮的卡片；收起时按相反顺序缩回，自始至终是同一个外壳在变形。

## 适合

后台一直在跑、偶尔想看一眼的状态入口：运动记录、专注计时、录音、导航、配送进度。

## 不适合

内容要长时间阅读或编辑时进独立页面或底部面板；按钮提交后的等待用「提交按钮变形」；列表卡片点开进详情用「共享元素过渡」。

## 注意

变的是外壳，不是文字：外壳的宽、高、圆角按测量到的内容尺寸过渡，里面的文字和按钮按真实排版淡入，不能用 scale 把胶囊里的字拉成卡片。

## 要点

- 三档尺寸都来自测量：圆点 12–16px；胶囊高 32–40px，宽 = 文字自然宽度 + 两侧内边距；卡片宽 min(300px, 容器宽 − 24px)，高按内容；锚定在顶部中点，向两侧和下方长。
- 圆角用 px 跟着尺寸走：圆点 = 直径一半，胶囊 = 高度一半，卡片 20–24px；胶囊不要写 999px，否则过渡大半程都被夹成胶囊形，最后一刻才突然变方。
- 展开：外壳 300–360ms、带一点回弹的减速曲线；旧内容 100ms 内先淡出，新内容等外壳长到七八成，再按标题 → 数据 → 按钮的顺序错开 40–60ms 淡入。
- 收起反过来：内容先退，外壳延后约 100ms 再缩；半路反悔从当前尺寸接着变，不从头重播；胶囊闲置 4–6s 自动缩回圆点（有焦点时不缩），Esc 每次退一档。
- 圆点和胶囊是带 aria-expanded 的按钮，热区用伪元素补到 ≥ 44px；不在场的那层内容设 inert；展开成卡片后焦点移到卡片里的“收起”，收起后回到胶囊。
- 会跳动的数字（计时、距离）用 tabular-nums，免得胶囊每秒抖一下；展开、收起、暂停各用 role="status" 播报一次，计时本身不播。
- 减少动态效果时直接切到目标尺寸，内容同时出现，圆点的呼吸光圈停掉。

## 提示词

给{后台进行中的状态}做「小圆点长成卡片」：同一个外壳有三档：14px 小圆点（带缓慢呼吸的光圈）→ 高 36px 的胶囊（显示{简短状态}，宽 = 测量到的文字宽度 + 两侧 14px）→ 宽 min(300px, 容器宽 − 24px)、高按内容的卡片（{详细数据}和{操作按钮}）；外壳锚定在顶部中点，宽、高、圆角一起用 340ms 带轻微回弹的减速曲线过渡，圆角用 px（胶囊 = 高度一半，不写 999px）；展开时旧内容 100ms 淡出，新内容在外壳长到七八成后按标题、数据、按钮的顺序错开 50ms 淡入，不用 scale 拉伸文字；收起时内容先退、外壳延后 100ms 再缩，半路反悔从当前尺寸接着变；胶囊闲置 5s 且没有焦点时缩回圆点，Esc 每次退一档；圆点和胶囊是带 aria-expanded 的按钮，热区 ≥ 44px，不在场的层设 inert，展开成卡片后焦点移到“收起”，收起后回到胶囊；会变的数字用 tabular-nums；展开、收起、暂停用 role="status" 播报一次；减少动态效果时直接切到目标尺寸、内容同时出现、光圈不动。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{--e:cubic-bezier(.3,1.2,.4,1);--w:14px;--h:14px;--r:7px;background:#e7eee5}
.map{position:absolute;inset:0;width:100%;height:100%}
.is,.tap{position:absolute;left:50%;top:12px;width:var(--w);height:var(--h);border-radius:var(--r);transform:translateX(-50%)}
.is{z-index:2;overflow:hidden;background:#16181d;color:#fff;box-shadow:0 12px 28px -12px rgba(12,18,24,.6);transition:width .34s var(--e),height .34s var(--e),border-radius .34s var(--e),background-color .2s}
.is[data-s="0"]{background:#22c55e;box-shadow:0 0 0 0 rgba(34,197,94,.25);animation:breathe 2.4s ease-in-out infinite}
.is.paused[data-s="0"]{background:#f59e0b;animation:none}
@keyframes breathe{50%{box-shadow:0 0 0 7px rgba(34,197,94,.25)}
}
.tap{z-index:3;padding:0;border:0;background:none;transition:width .34s var(--e),height .34s var(--e),border-radius .34s var(--e)}
.tap::before{content:"";position:absolute;inset:min(0px,calc(var(--h) / 2 - 22px)) min(0px,calc(var(--w) / 2 - 22px))}
.tap:focus-visible{outline-offset:3px}
.back .is,.back .tap{transition-delay:.1s}
.l{position:absolute;top:0}
.l1{left:50%;display:flex;align-items:center;gap:6px;height:36px;padding:0 14px 0 10px;transform:translateX(-50%);white-space:nowrap;opacity:0;transition:opacity .1s}
.l1.on{opacity:1;transition:opacity .18s .2s}
.back .l1.on{transition-delay:.34s}
.l1 svg,.ic svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.l1 svg{color:#4ade80}
.paused .l1 svg{color:#fbbf24}
.l1 b,.ch small,.nm b{font-variant-numeric:tabular-nums}
.l1 b{font-weight:600}
.l2{left:0;width:min(300px,calc(100cqw - 24px));padding:12px}
.l2>*{opacity:0;transform:translateY(4px);transition:opacity .1s,transform .1s}
.l2.on>*{opacity:1;transform:none;transition:opacity .2s,transform .26s var(--e);transition-delay:calc(.2s + var(--i) * .05s)}
.ch{display:flex;align-items:center;gap:10px}
.ic{flex:none;display:grid;place-items:center;width:34px;height:34px;border-radius:10px;background:#22c55e;color:#062b14}
.paused .ic{background:#f59e0b}
.ch span{flex:1;min-width:0}
.ch b,.ch small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ch b{font-size:14px;font-weight:600}
.ch small{color:#a7aeb9;font-size:12px}
.fold{position:relative;flex:none;display:grid;place-items:center;width:30px;height:30px;padding:0;border:0;border-radius:50%;background:rgba(255,255,255,.1);color:#fff}
.fold::before{content:"";position:absolute;inset:-7px}
.fold svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.rw{display:flex;align-items:center;gap:8px;margin-top:12px}
.nm{flex:1;min-width:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}
.nm span{min-width:0;line-height:1.25}
.nm b{display:block;font-size:17px;font-weight:700;white-space:nowrap}
.nm b small{margin-left:2px;color:#a7aeb9;font-size:11px;font-weight:500}
.nm i{color:#a7aeb9;font-size:11px;font-style:normal}
.bt{flex:none;height:32px;padding:0 12px;border:0;border-radius:16px;font-size:13px;font-weight:600}
.ps{background:rgba(255,255,255,.12);color:#fff}
.lp{background:#22c55e;color:#062b14}
.bt:focus-visible,.fold:focus-visible{outline-color:#93c5fd}
.sp{display:none;margin-top:12px}
.sp i{display:block;color:#a7aeb9;font-size:11px;font-style:normal}
.sp svg{display:block;width:100%;height:36px;margin-top:4px}
.msg{position:absolute;left:12px;bottom:14px;z-index:1;max-width:calc(100% - 104px);margin:0;padding:2px 8px;border-radius:10px;background:rgba(255,255,255,.78);color:#2f3a45;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.msg:empty{display:none}
.re{position:absolute;right:10px;bottom:10px;z-index:4}
.nt *{transition:none!important}
@container (max-width:320px){.nm b{font-size:15px}
.bt{padding:0 10px}
}
@container (min-height:260px){.sp{display:block}
}
@media (prefers-reduced-motion:reduce){.is,.tap,.l1,.l2>*{transition-delay:0s!important}
}
</style>

<div class="st"><svg class="map" viewBox="0 0 360 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="M0 0h130c-8 42-52 66-96 60C12 57 0 44 0 30z" fill="#d2e5cc"/><path d="M262 120c26-18 70-14 98 2v40h-112c-6-16 0-32 14-42z" fill="#d2e5cc"/><path d="M-20 170C60 140 124 198 204 162S322 112 380 134v80H-20z" fill="#cde1ec"/><path d="M46-10L112 210M-10 98H370M244-10L292 210" stroke="#fff" stroke-width="8" fill="none"/><path d="M58 152C88 124 120 112 152 104S232 84 262 62" stroke="#bbf7d0" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M58 152C88 124 120 112 152 104S232 84 262 62" stroke="#16a34a" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="262" cy="62" r="6" fill="#16a34a" stroke="#fff" stroke-width="3"/></svg><div data-clip class="is" data-s="0"><div class="l l1" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="6" cy="16" r="4"/><circle cx="18" cy="16" r="4"/><path d="M6 16l4-8h5l3 8M10 8l3 8"/></svg>骑行中 <b class="tm">08:42</b></div><div class="l l2" inert><div class="ch" style="--i:0"><i class="ic"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="16" r="4"/><circle cx="18" cy="16" r="4"/><path d="M6 16l4-8h5l3 8M10 8l3 8"/></svg></i><span><b>晨骑 · 滨江绿道</b><small><span class="tm">08:42</span> · <span class="seg">第 1 段</span></small></span><button type="button" class="fold" aria-label="收起"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 15l6-6 6 6"/></svg></button></div><div class="rw" style="--i:1"><div class="nm"><span><b><span class="km">3.1</span><small>km</small></b><i>距离</i></span><span><b>21.6<small>km/h</small></b><i>均速</i></span></div><button type="button" class="bt ps">暂停</button><button type="button" class="bt lp">分段</button></div><div class="sp" style="--i:2"><i>近 10 分钟速度</i><svg viewBox="0 0 280 36" preserveAspectRatio="none" aria-hidden="true"><path d="M0 26L20 22L40 24L60 16L80 18L100 12L120 15L140 9L160 14L180 11L200 6L220 10L240 8L260 13L280 9" fill="none" stroke="#4ade80" stroke-width="2" vector-effect="non-scaling-stroke"/></svg></div></div></div><button type="button" class="tap" aria-expanded="false" aria-label="正在骑行，展开"></button><p class="msg" role="status"></p><button type="button" class="ctl re">重播</button></div>

<script type="module">
export default function demo(root) {
  const $ = (q) => root.querySelector(q), st = $('.st'), is = $('.is'), tap = $('.tap'), l1 = $('.l1'), l2 = $('.l2'), fold = $('.fold'), ps = $('.ps'), msg = $('.msg'), km = $('.km'), seg = $('.seg'), tms = root.querySelectorAll('.tm');
  let s = 0, sec = 522, run = true, n = 1, idle, tm = [];
  const fmt = (t) => String(t / 60 | 0).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0');
  const paint = () => { tms.forEach((e) => (e.textContent = fmt(sec))); km.textContent = (sec * 0.006).toFixed(1); };
  // 每档尺寸都量真实内容：胶囊量文字宽度，卡片量排好版的宽高；圆角跟着高度走
  const apply = () => {
    const [w, h, r] = s === 0 ? [14, 14, 7] : s === 1 ? [l1.offsetWidth, 36, 18] : [l2.offsetWidth, l2.offsetHeight, 22];
    st.style.setProperty('--w', w + 'px'); st.style.setProperty('--h', h + 'px'); st.style.setProperty('--r', r + 'px');
  };
  const set = (k, say) => {
    if (k === s) return;
    const f = root.activeElement;
    st.classList.toggle('back', k < s); // 收起：内容先退，外壳延后再缩
    s = k; clearTimeout(idle);
    is.dataset.s = k;
    l1.classList.toggle('on', k === 1); l2.classList.toggle('on', k === 2); l2.inert = k !== 2;
    tap.hidden = k === 2;
    tap.setAttribute('aria-expanded', String(k > 0)); tap.setAttribute('aria-label', k ? '骑行中，展开详情' : '正在骑行，展开');
    apply();
    if (k === 2 && f === tap) fold.focus();
    if (k < 2 && l2.contains(f)) tap.focus();
    // 胶囊闲置 5 秒缩回圆点；键盘停在上面时不缩
    if (k === 1) idle = setTimeout(() => { if (s === 1 && root.activeElement !== tap && root.host.isConnected) set(0, '已缩回圆点'); }, 5000);
    if (say) msg.textContent = say;
  };
  tap.addEventListener('click', () => set(s + 1, s ? '已展开详情卡片' : '已展开成胶囊'));
  fold.addEventListener('click', () => set(1, '已收起成胶囊'));
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && s > 0) { e.preventDefault(); set(s - 1, s === 2 ? '已收起成胶囊' : '已缩回圆点'); } });
  ps.addEventListener('click', () => { run = !run; ps.textContent = run ? '暂停' : '继续'; is.classList.toggle('paused', !run); msg.textContent = run ? '已继续计时' : '已暂停计时'; });
  $('.lp').addEventListener('click', () => { n++; seg.textContent = `第 ${n} 段`; msg.textContent = `已分段：第 ${n} 段`; });
  const iv = setInterval(() => { if (!root.host.isConnected) return clearInterval(iv); if (run) { sec++; paint(); } }, 1000);
  new ResizeObserver(apply).observe(st);
  const play = () => {
    tm.forEach(clearTimeout);
    st.classList.add('nt'); set(0, ''); void st.offsetWidth; st.classList.remove('nt');
    tm = [setTimeout(() => set(1, '已展开成胶囊'), 500), setTimeout(() => set(2, '已展开详情卡片'), 1400)];
  };
  $('.re').addEventListener('click', play);
  paint(); play();
}
</script>
