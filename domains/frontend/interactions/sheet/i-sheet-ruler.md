---
zh: 日期刻度面板
en: Date scale panel
order: 30
---

## 是什么

面板升起后，一条日期刻度尺从左侧滑入并减速，“今天”正好停在固定的中心指针下，随后被遮住的编号原地展开成完整编号；之后刻度尺可拖动、按天吸附。

## 适合

取件码与保管期、预约改期、账单周期、打卡记录这类“一个编号或凭证 + 按日期看状态”的面板。

## 不适合

要跨月挑日期或选时间段时用日历或日期选择器；只展示一个码、不需要看日期时用普通面板直接显示；范围超过一两个月别用刻度尺，拖起来太长。

## 注意

拖动和吸附交给原生横向滚动 + scroll-snap（触屏自带惯性）；入场动画期间先关掉 scroll-snap，到位后再打开，否则会被吸附打断。

## 要点

- 面板 360ms 升起后，刻度尺内容从左侧滑入，约 900ms、缓出（easeOutCubic）、不回弹，正好停在“今天”对准中心指针。
- 中心指针固定、pointer-events: none；每天一个主刻度 + 两个次刻度，选中日期的标签加粗变深，两端渐隐提示还能滑。
- 编号先显示“KD•• ••••”，刻度尺到位后按 30–40ms 间隔逐字原地展开；旁边“复制”按钮成功后显示“已复制” 1.5 秒，失败提示长按手动复制。
- 拖动：overflow-x: auto + scroll-snap-type: x mandatory，每天 scroll-snap-align: center；鼠标拖动时临时关吸附，松手滚到最近一天。
- 键盘：刻度尺 role="slider" 可聚焦，左右方向键前后一天，aria-valuetext 写完整日期和状态。
- 下方一行说明随选中日期变化（“保管第 3 天，免费”“超期 2 天，需付 ¥2”），停稳 250ms 后用 role="status" 播报。
- 减少动态效果时刻度尺直接定位到今天，编号直接完整显示。

## 提示词

给{产品}的{凭证面板}做「日期刻度面板」：底部面板升起后，一条横向日期刻度尺从左侧滑入并减速（约 900ms 缓出、不回弹），停在“今天”正好落在固定的中心指针下；随后遮住的{编号}（如“KD•• ••••”）按 30–40ms 逐字原地展开成完整编号，旁边有复制按钮（成功显示“已复制”，失败提示手动复制）；刻度尺用原生横向滚动 + scroll-snap 按天吸附，入场动画期间先关闭吸附；鼠标可拖动，刻度尺 role="slider" 可聚焦、左右方向键切换一天；下方一行说明随选中日期显示{日期状态}，停稳后用 role="status" 播报；减少动态效果时直接定位到今天并显示完整编号。

## 示例

<link rel="stylesheet" href="../../_shared/app-sheet-base.css">
<style>
.app{max-width:440px;margin:0 auto;padding:12px 16px}
.top b{font-size:16px}
.open{display:flex;align-items:center;gap:12px;width:100%;margin-top:10px;padding:12px;border:1px solid #e3e6eb;border-radius:14px;background:#fff;text-align:left}
.box{flex:none;width:36px;height:36px;border-radius:10px;background:linear-gradient(90deg,transparent 44%,#c98a4b 44% 56%,transparent 56%),linear-gradient(135deg,#f6c58a,#e39a52)}
.open span{display:grid;min-width:0}
.open b,.open small{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.open small{color:#5b616e;font-size:12px}
.scrim{position:absolute;inset:0;background:rgba(17,20,28,.4);opacity:0;visibility:hidden;transition:opacity .3s,visibility 0s .3s}
.on .scrim{opacity:1;visibility:visible;transition:opacity .3s}
.sh{position:absolute;left:0;right:0;bottom:0;max-width:440px;margin:0 auto;padding:0 16px 16px;border-radius:20px 20px 0 0;background:#fff;transform:translateY(100%);visibility:hidden;transition:transform .24s cubic-bezier(.4,0,1,1),visibility 0s .24s}
.on .sh{transform:none;visibility:visible;transition:transform .36s cubic-bezier(.2,.8,.2,1)}
.grab{display:block;width:36px;height:4px;margin:8px auto 10px;border-radius:2px;background:#d5d9e0}
.hd{display:flex;align-items:center;gap:8px}
.lab{flex:1;min-width:0;display:grid}
.lab h3{color:#5b616e;font-size:12px;font-weight:400}
.code{font:600 22px/1.25 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.04em;white-space:pre;user-select:all}
.code span{display:inline-block}
.code .up{animation:up .26s cubic-bezier(.2,.8,.2,1) both}
@keyframes up{from{opacity:0;transform:translateY(60%)}
}
.cp{flex:none;height:30px;padding:0 14px;border:1px solid #d0d5dd;border-radius:999px;background:#fff;font-size:12px;font-weight:600;white-space:nowrap}
.x{flex:none;width:30px;height:30px;padding:0;border:0;border-radius:50%;background:#f0f2f5;font-size:16px;line-height:1}
.rl{position:relative;margin-top:10px}
.sc{display:flex;overflow-x:auto;padding:12px calc(50% - 20px) 0;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;scrollbar-width:none;opacity:0;-webkit-mask-image:linear-gradient(90deg,transparent,#000 18%,#000 82%,transparent);mask-image:linear-gradient(90deg,transparent,#000 18%,#000 82%,transparent);outline-offset:-2px;border-radius:8px;cursor:grab;user-select:none;touch-action:pan-x}
.sc::-webkit-scrollbar{display:none}
.sc.in{opacity:1;transition:opacity .3s}
.sc.drag{scroll-snap-type:none;cursor:grabbing}
.d{position:relative;flex:0 0 40px;height:44px;scroll-snap-align:center;color:#c9ced6;background:linear-gradient(currentColor 0 0) 10px 0/1px 8px no-repeat,linear-gradient(currentColor 0 0) 30px 0/1px 8px no-repeat}
.d::before{content:"";position:absolute;left:19px;top:0;width:2px;height:16px;border-radius:1px;background:#9aa1ad}
.d em{position:absolute;left:0;right:0;top:20px;color:#656b76;font-size:11px;font-style:normal;text-align:center;white-space:nowrap}
.d.pre::before{background:#d5d9e0}
.d.late{color:#f3cfaa}
.d.late::before{background:#ec9a52}
.d.on em{color:#1f2329;font-weight:600}
.ptr{position:absolute;left:50%;top:2px;width:2px;height:28px;margin-left:-1px;border-radius:1px;background:#e5484d;pointer-events:none}
.ptr::before{content:"";position:absolute;left:-4px;top:-4px;border:5px solid transparent;border-top-color:#e5484d}
.day{margin-top:2px;overflow:hidden;color:#5b616e;font-size:12px;text-align:center;white-space:nowrap;text-overflow:ellipsis;font-variant-numeric:tabular-nums}
@container (max-height:260px){.sh{padding:0 16px 10px}
.grab{margin:6px auto 8px}
.code{font-size:20px}
.rl{margin-top:6px}
.sc{padding-top:10px}
.d{height:38px}
.d em{top:17px}
.ptr{height:24px}
}
</style>

<div class="st"><div class="app"><div class="top"><b>我的快递</b></div><button type="button" class="open" aria-haspopup="dialog"><i class="box" aria-hidden="true"></i><span><b>星屿书店 · 3 本书</b><small>已到驿站，点开查看取件码</small></span></button></div><div class="scrim"></div><section class="sh" role="dialog" aria-modal="true" aria-labelledby="ru-t"><i class="grab" aria-hidden="true"></i><div class="hd"><div class="lab"><h3 id="ru-t">取件码</h3><b class="code"></b></div><button type="button" class="cp">复制</button><button type="button" class="x" aria-label="关闭">×</button></div><div class="rl"><div class="sc" tabindex="0" role="slider" aria-label="保管日期，左右方向键切换" aria-valuemin="0" aria-valuemax="13"></div><i class="ptr" aria-hidden="true"></i></div><p class="day"></p></section><button type="button" class="ctl rp">重播</button><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const st = root.querySelector('.st'), app = root.querySelector('.app'), open = root.querySelector('.open'), sc = root.querySelector('.sc'), code = root.querySelector('.code'), cp = root.querySelector('.cp'), x = root.querySelector('.x'), day = root.querySelector('.day'), say = root.querySelector('.sr');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches, CODE = 'KD27 3816', W = 40, LAST = 13, TODAY = 4, ARRIVE = 2, HOLD = 7;
  const base = new Date(); base.setHours(12, 0, 0, 0);
  const dates = Array.from({ length: LAST + 1 }, (_, k) => { const d = new Date(base); d.setDate(base.getDate() + k - TODAY); return d; });
  sc.innerHTML = dates.map((d, k) => `<span class="d${k < ARRIVE ? ' pre' : k >= ARRIVE + HOLD ? ' late' : ''}"><em>${k === TODAY ? '今天' : d.getDate() === 1 ? d.getMonth() + 1 + '月' : d.getDate()}</em></span>`).join('');
  const days = [...sc.children];
  const text = (k) => { const d = dates[k], s = `${d.getMonth() + 1}月${d.getDate()}日 周${'日一二三四五六'[d.getDay()]}`; if (k < ARRIVE) return s + ' · 还未到站'; if (k < ARRIVE + HOLD) return s + ` · 保管第 ${k - ARRIVE + 1} 天，免费`; const late = k - ARRIVE - HOLD + 1; return s + ` · 超期 ${late} 天，需付 ¥${late}`; };
  let cur = -1, anim = 0, dr = null, tm = [], tSay = 0, tCp = 0;
  const at = () => Math.max(0, Math.min(LAST, Math.round(sc.scrollLeft / W)));
  const mark = () => {
    const k = at(); if (k === cur) return; cur = k;
    days.forEach((c, i) => c.classList.toggle('on', i === k)); day.textContent = text(k);
    sc.setAttribute('aria-valuenow', k); sc.setAttribute('aria-valuetext', text(k));
    clearTimeout(tSay); if (!anim) tSay = setTimeout(() => { say.textContent = text(k); }, 250);
  };
  const go = (k) => sc.scrollTo({ left: Math.max(0, Math.min(LAST, k)) * W, behavior: still ? 'auto' : 'smooth' });
  const mask = () => { code.innerHTML = [...CODE].map((c, i) => `<span>${i < 2 || c === ' ' ? c : '•'}</span>`).join(''); };
  const reveal = () => {
    [...CODE].forEach((c, i) => { if (i < 2 || c === ' ') return; tm.push(setTimeout(() => { if (!root.host.isConnected) return; const s = code.children[i]; s.textContent = c; s.className = still ? '' : 'up'; }, still ? 0 : (i - 2) * 35)); });
    say.textContent = `取件码 ${CODE}，${text(TODAY)}`;
  };
  // 入场：先关吸附，用 rAF 把 scrollLeft 从右侧缓出到“今天”（内容从左滑入），到位再开吸附
  const intro = () => {
    const to = TODAY * W, from = to + 8 * W; sc.classList.add('in');
    if (still) { sc.scrollLeft = to; mark(); reveal(); return; }
    sc.style.scrollSnapType = 'none'; sc.scrollLeft = from; let t0;
    const step = (t) => { if (!root.host.isConnected) return; t0 ??= t; const p = Math.min(1, (t - t0) / 900); sc.scrollLeft = from + (to - from) * (1 - (1 - p) ** 3); if (p < 1) anim = requestAnimationFrame(step); else { anim = 0; sc.style.scrollSnapType = ''; mark(); reveal(); } };
    anim = requestAnimationFrame(step);
  };
  const reset = () => { tm.forEach(clearTimeout); tm = []; cancelAnimationFrame(anim); anim = 0; sc.style.scrollSnapType = ''; sc.classList.remove('in'); mask(); };
  const show = (focus) => { reset(); st.classList.add('on'); app.inert = true; if (focus) sc.focus({ preventScroll: true }); tm.push(setTimeout(intro, still ? 0 : 360)); };
  const hide = () => { reset(); st.classList.remove('on'); app.inert = false; open.focus({ preventScroll: true }); };
  sc.addEventListener('scroll', mark, { passive: true });
  sc.addEventListener('keydown', (e) => { const d = { ArrowLeft: -1, ArrowRight: 1 }[e.key]; if (d) { e.preventDefault(); go(cur + d); } });
  // 触屏走原生滚动；鼠标补一个拖动，拖动中关吸附
  sc.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse' || e.button > 0 || anim) return; dr = { x: e.clientX, l: sc.scrollLeft }; sc.setPointerCapture(e.pointerId); sc.classList.add('drag'); });
  sc.addEventListener('pointermove', (e) => { if (dr) sc.scrollLeft = dr.l - (e.clientX - dr.x); });
  const up = () => { if (!dr) return; dr = null; sc.classList.remove('drag'); go(at()); };
  sc.addEventListener('pointerup', up); sc.addEventListener('pointercancel', up);
  cp.onclick = async () => {
    clearTimeout(tCp);
    try { await navigator.clipboard.writeText(CODE.replace(' ', '')); cp.textContent = '已复制'; say.textContent = '取件码已复制'; } catch { cp.textContent = '复制失败'; say.textContent = '复制失败，请长按编号手动复制'; }
    tCp = setTimeout(() => { cp.textContent = '复制'; }, 1500);
  };
  open.onclick = () => show(true); x.onclick = hide; root.querySelector('.scrim').onclick = hide;
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && st.classList.contains('on')) hide(); });
  root.querySelector('.rp').onclick = () => { st.classList.add('nt'); st.classList.remove('on'); void st.offsetWidth; st.classList.remove('nt'); void st.offsetWidth; show(false); };
  mask(); day.textContent = text(TODAY);
  setTimeout(() => { if (root.host.isConnected) show(false); }, 80);
}
</script>
