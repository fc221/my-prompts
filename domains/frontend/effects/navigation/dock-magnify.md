---
zh: 靠近就放大的图标栏
en: Magnifying dock
order: 50
---

## 是什么

一排图标停在页面底部，鼠标靠近时离指针最近的图标放大，两边的几个按距离逐渐变大，移开后全部恢复，像水波一样连续起伏；悬停的图标上方显示名称。

## 适合

桌面端少量高频入口（4–8 个）：创意工具的工具条、作品集或个人主页底部的悬浮导航、桌面风格的展示页。

## 不适合

触屏为主的产品（没有悬停，放大无从触发），手机上改用普通底部标签栏；入口超过 8 个或需要文字说明的导航改用顶栏或侧栏。

## 注意

放大程度按指针到每个图标“原始中心”的距离来算，原始中心从静止布局推出来；不要读放大后的实时位置，否则图标一变大中心就挪、再算又变，指针不动也会抖。

## 要点

- 基础尺寸约 44px，最近的放到 1.6 倍左右，影响半径约 2.5 个图标宽；放大量用余弦曲线从中心平滑衰减到 0
- 监听整条底部区域（比底座高出放大的余量）的 pointermove / pointerleave，不监听底座本身，两端变宽时指针不会反复进出
- 改图标的宽高而不是只做 scale，邻居自然让位；底部对齐向上长，上方预留放大空间和名称提示，提示设 pointer-events: none
- 宽高带 100–150ms 的过渡吸收鼠标抖动，移开后同样平滑恢复
- 每个图标是带 aria-label 的真实链接；键盘聚焦时同样放大并显示名称，左右方向键在图标间移动；当前页用图标下方的小圆点标出，和悬停效果分开
- 触屏（pointerType 为 touch）和减少动态效果时不放大，保持稳定尺寸，只显示名称
- 真实页面底部要留出底座占用的高度，最后一段内容不被盖住

## 提示词

给{产品}底部做「靠近就放大的图标栏」：{入口数}个图标横排在一个半透明圆角底座上，基础 44px；鼠标靠近时按指针到每个图标原始中心的距离放大（最近的约 1.6 倍，影响半径约 2.5 个图标宽，余弦衰减），相邻图标跟着变大并让位，宽高带 120ms 过渡，移开后恢复；距离用静止布局推算的中心来算，监听比底座更高的整条底部区域，避免抖动；悬停或键盘聚焦的图标上方显示名称，左右方向键切换焦点，当前页在图标下方用小圆点标出；图标都是带 aria-label 的真实链接；触屏和减少动态效果时不放大，只显示名称；页面底部留出底座的高度。

## 示例

<style>
:host{display:block;height:100%}
.st{position:relative;height:100%;overflow:hidden;container-type:size;background:linear-gradient(160deg,#c7d6ff 0%,#e6d4ff 48%,#ffd5c8 100%);color:#1d1f2b;font:13px/1.5 system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.blob{position:absolute;right:-30px;top:-40px;width:180px;height:180px;border-radius:50%;background:radial-gradient(circle,#fff6d6,rgba(255,246,214,0) 70%)}
.wg{position:absolute;left:14px;top:14px;width:150px;padding:8px 12px;border-radius:14px;background:rgba(255,255,255,.55);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:0 4px 16px rgba(40,30,80,.08)}
.wg b{display:block;font-size:20px;line-height:1.2;font-variant-numeric:tabular-nums}
.wg span{display:block;color:#4a4f63;font-size:11px}
.re{position:absolute;right:12px;top:12px}
.zone{--b:34px;--m:54px;--g:8px;position:absolute;left:0;right:0;bottom:0;display:flex;align-items:flex-end;justify-content:center;height:calc(var(--m) + 46px);padding-bottom:10px}
.dock{display:flex;align-items:flex-end;gap:var(--g);height:calc(var(--b) + 12px);padding:6px 8px;border-radius:16px;background:rgba(255,255,255,.5);-webkit-backdrop-filter:blur(14px) saturate(1.6);backdrop-filter:blur(14px) saturate(1.6);box-shadow:0 8px 24px rgba(40,30,80,.14),inset 0 0 0 1px rgba(255,255,255,.6)}
.it{position:relative;flex:none;width:var(--s,var(--b));height:var(--s,var(--b));border-radius:24%;transition:width .12s cubic-bezier(.2,0,0,1),height .12s cubic-bezier(.2,0,0,1)}
.it:focus-visible{outline:2px solid #1d1f2b;outline-offset:3px}
.ico{display:grid;place-items:center;width:100%;height:100%;border-radius:inherit;box-shadow:0 2px 6px rgba(20,20,40,.2)}
.ico svg{width:54%;height:54%}
.it.on::after{content:"";position:absolute;left:50%;bottom:-5px;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:#1d1f2b}
.lb{position:absolute;left:50%;bottom:calc(100% + 8px);padding:2px 8px;border-radius:6px;background:rgba(29,31,43,.88);color:#fff;font-size:11px;white-space:nowrap;transform:translateX(-50%);opacity:0;pointer-events:none;transition:opacity .12s}
.it:hover .lb,.it.hot .lb,.it:focus-visible .lb{opacity:1}
.i1{background:linear-gradient(160deg,#6cb6ff,#2f6bff)}
.i2{background:linear-gradient(160deg,#ff8a8a,#ff3d6e)}
.i3{background:linear-gradient(160deg,#ffd76a,#ffa91f)}
.i4{background:linear-gradient(160deg,#63e6b5,#18b184)}
.i5{background:linear-gradient(160deg,#b9a0ff,#7b4dff)}
.i6{background:linear-gradient(160deg,#a8b0c2,#5b6478)}
@container (max-width:310px){.zone{--b:30px;--m:48px;--g:6px}
.wg{width:132px}
}
@container (min-height:280px){.zone{--b:44px;--m:72px;--g:10px;padding-bottom:16px}
.dock{border-radius:20px}
.wg{left:24px;top:24px;width:190px;padding:12px 16px}
.wg b{font-size:28px}
.wg span{font-size:12px}
.lb{font-size:12px;padding:3px 10px}
}
@media (prefers-reduced-motion:reduce){.it{transition:none}
}
</style>

<div class="st"><i class="blob" aria-hidden="true"></i><div class="wg"><b>14:20</b><span>今天还有 2 个日程</span></div><button type="button" class="ctl re">演示划过</button><div class="zone"><nav class="dock" aria-label="常用应用"><a href="#" class="it on" aria-current="page" aria-label="文件"><span class="ico i1"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H9l2 2h8.5A1.5 1.5 0 0 1 21 9.5v8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z"/></svg></span><span class="lb" aria-hidden="true">文件</span></a><a href="#" class="it" aria-label="日历"><span class="ico i2"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/></svg></span><span class="lb" aria-hidden="true">日历</span></a><a href="#" class="it" aria-label="备忘"><span class="ico i3"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M7 8h10M7 12h10M7 16h6"/></svg></span><span class="lb" aria-hidden="true">备忘</span></a><a href="#" class="it" aria-label="照片"><span class="ico i4"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><circle cx="16" cy="8" r="2"/><path d="M3 19l6-7 4 4 3-3 5 6z"/></svg></span><span class="lb" aria-hidden="true">照片</span></a><a href="#" class="it" aria-label="邮件"><span class="ico i5"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="m4 7 8 6 8-6"/></svg></span><span class="lb" aria-hidden="true">邮件</span></a><a href="#" class="it" aria-label="设置"><span class="ico i6"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg></span><span class="lb" aria-hidden="true">设置</span></a></nav></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const zone = root.querySelector('.zone'), its = [...root.querySelectorAll('.it')], msg = root.querySelector('[role=status]'), n = its.length;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let sim = 0;
  const num = (k) => parseFloat(getComputedStyle(zone).getPropertyValue(k));
  // 原始中心：底座在整条区域里水平居中，按静止尺寸推算，不读放大后的位置，指针不动就不会抖
  const center = (i) => { const r = zone.getBoundingClientRect(); return r.left + r.width / 2 + (i - (n - 1) / 2) * (num('--b') + num('--g')); };
  // mark：模拟划过和键盘聚焦时用“原始中心最近”标名称；真实指针交给 :hover，名称跟着眼前这一个走
  const apply = (x, mark) => {
    const b = num('--b'), m = num('--m'), g = num('--g'), R = (b + g) * 2.5;
    let hot = -1, best = Infinity;
    its.forEach((it, i) => {
      const d = x == null ? Infinity : Math.abs(x - center(i));
      if (d < best) { best = d; hot = i; }
      const f = still || d >= R ? 0 : (1 + Math.cos(Math.PI * d / R)) / 2;
      it.style.setProperty('--s', (b + (m - b) * f).toFixed(1) + 'px');
    });
    its.forEach((it, i) => it.classList.toggle('hot', !!mark && i === hot && best < b + g));
  };
  zone.addEventListener('pointermove', (e) => { if (e.pointerType === 'touch') return; sim = 0; apply(e.clientX, false); });
  zone.addEventListener('pointerleave', () => { sim = 0; apply(null); });
  its.forEach((it, i) => {
    it.addEventListener('focus', () => { sim = 0; apply(center(i), true); });
    it.addEventListener('blur', () => apply(null));
    it.addEventListener('keydown', (e) => { if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return; e.preventDefault(); its[(i + (e.key === 'ArrowRight' ? 1 : n - 1)) % n].focus(); });
    it.addEventListener('click', (e) => {
      e.preventDefault();
      its.forEach((x) => { x.classList.toggle('on', x === it); if (x === it) x.setAttribute('aria-current', 'page'); else x.removeAttribute('aria-current'); });
      msg.textContent = '已打开：' + it.getAttribute('aria-label');
    });
  });
  // 演示：模拟指针从最左边慢慢划到第 3、4 个图标之间停住
  const sweep = () => {
    const id = ++sim, a = center(-0.8), z = center(2.6), t0 = performance.now(), dur = 1100;
    const step = (now) => {
      if (id !== sim || !root.host.isConnected) return;
      const p = Math.min(1, (now - t0) / dur), e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      apply(a + (z - a) * e, true);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  root.querySelector('.re').addEventListener('click', sweep);
  setTimeout(sweep, 400);
}
</script>
