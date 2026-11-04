---
zh: 字重随动
en: Variable weight follow
aka: 可变字体 字重动画 字体粗细跟随 variable font weight
order: 190
---

## 是什么

一行大标题里每个字母的粗细跟着指针走：指针靠近的字母慢慢变粗，远处的变细，像一道柔和的浪在字里移动；也可以跟着滚动或悬停变化，字宽一起伸缩。

## 适合

品牌首屏、字体和设计工作室官网、活动主视觉里的英文或数字大标题、导航里少量几个悬停变粗的词。

## 不适合

正文、按钮文字和表格：字重变化会让排版抖动；中文系统字体不是可变字体，只能在几档字重之间跳，中文标题改用「标题逐行浮现」或「由虚到实的标题」。

## 注意

字变粗也会变宽，直接改字重整行会左右抖：每个字母放进按最粗字重量好宽度的格子里（inline-block、居中），或者选粗细不改字宽的字体（等宽设计，或带 GRAD 轴的字体）。拆成单个字母后，读屏仍要读到完整的词。

## 要点

- 字体：优先系统自带的可变字体（macOS 的 system-ui、Windows 11 的 Segoe UI Variable），font-weight 写任意数值（如 437）就能连续变化；没有可变字体时落到最近的一档，等于用多字重切换模拟
- 映射：每个字母按与指针的距离 d 算目标字重：最细 + (最粗 − 最细) × max(0, 1 − d ÷ 影响半径)²，最细 200、最粗 900，影响半径约 3 个字宽
- 平滑：每帧向目标插值 15–20%（requestAnimationFrame），所有字母误差 < 1 时停掉循环；指针离开后统一回到静止字重 300
- 宽度轴：字体带 wdth 轴时可以同时把 font-stretch 从 75% 拉到 125%；只改字重和宽度时用 font-weight、font-stretch，要改其他轴才用 font-variation-settings，两种写法不混用
- 滚动和悬停：跟随滚动时字重按区块进入视口的进度插值（scroll-timeline，或 IntersectionObserver 加 rAF）；悬停版只让当前词 200ms 变粗
- 无障碍：标题保留完整文字（视觉隐藏的整词或 aria-label），拆开的字母 aria-hidden；这是装饰效果，不用它表达状态
- 触屏没有悬停：按住拖动时跟手，松手回到静止字重；减少动态效果时固定一个字重（如 700），不随动

## 提示词

给{标题}加「字重随动」：用系统可变字体（system-ui、Segoe UI Variable，后备普通无衬线），把标题拆成单个字母，每个字母放进按 900 字重量好宽度的 inline-block 格子里居中，变粗时整行不抖；标题保留完整文字给读屏，拆开的字母 aria-hidden。指针在标题区域移动时，每个字母按与指针的距离算目标字重（200 到 900，影响半径约 3 个字宽，按距离平方衰减），用 requestAnimationFrame 每帧向目标插值 18%，全部到位后停止循环；指针离开后回到 300。字体有 wdth 轴时可同时把 font-stretch 从 75% 拉到 125%。触屏按住拖动时跟手，松手回到静止字重。只用在{英文或数字大标题}上，正文和按钮不用；减少动态效果时固定为 700。

## 示例

<style>
:host{container-type:size}
.st{position:relative;height:100%;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:12px 16px;background:#f4f1ea;color:#16140f;font:12px/1.4 system-ui,-apple-system,"PingFang SC",sans-serif;touch-action:none;user-select:none;-webkit-user-select:none}
.k{margin:0;color:#6b6457;font:11px/1 ui-monospace,Menlo,monospace;letter-spacing:.14em}
.word{margin:0;font:300 min(18cqw,32cqh)/1 system-ui,-apple-system,"Segoe UI Variable Display","Segoe UI Variable","Helvetica Neue",Arial,sans-serif;letter-spacing:0;white-space:nowrap}
.ls{display:flex}
.c{display:inline-flex;flex-direction:column;align-items:center}
.c i{font-style:normal}
.c small{display:none;margin-top:6px;color:#8a8273;font:10px/1 ui-monospace,Menlo,monospace;font-weight:400;font-variant-numeric:tabular-nums}
.cap{margin:0;color:#4a4437}
.ctl{position:absolute;right:12px;bottom:10px;height:28px;padding:0 10px;font-size:12px}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@container (max-width:310px){.ctl{display:none}
}
@container (min-height:260px){.st{gap:10px}
.k{font-size:12px}
.c small{display:block}
.cap{font-size:14px}
.ctl{right:16px;bottom:14px;height:32px}
}
</style>

<div class="st"><p class="k">AUTUMN DROP · 2026</p><h2 class="word"><span class="sr">GRAVITY</span><span class="ls" aria-hidden="true"></span></h2><p class="cap">指针越靠近，字越有分量</p><button type="button" class="ctl">重播</button></div>

<script type="module">
export default function demo(root) {
  const st = root.querySelector('.st'), ls = root.querySelector('.ls'), MIN = 200, MAX = 900, REST = 300;
  const cells = [...'GRAVITY'].map((ch) => { const c = document.createElement('span'); c.className = 'c'; c.innerHTML = `<i>${ch}</i><small></small>`; ls.appendChild(c); return c; });
  const glyphs = cells.map((c) => c.querySelector('i')), nums = cells.map((c) => c.querySelector('small'));
  const w = cells.map(() => REST), t = cells.map(() => REST);
  const draw = () => glyphs.forEach((g, i) => { g.style.fontWeight = Math.round(w[i]); nums[i].textContent = Math.round(w[i]); });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { w.fill(700); draw(); root.querySelector('.ctl').hidden = true; return; }
  // 每个字母的格子按 900 字重量好宽度，变粗时整行不抖
  const measure = () => { glyphs.forEach((g) => { g.style.fontWeight = MAX; }); cells.forEach((c) => { c.style.width = ''; }); const ws = glyphs.map((g) => g.getBoundingClientRect().width); cells.forEach((c, i) => { c.style.width = ws[i] + 'px'; }); draw(); };
  let raf = 0, virt = null;
  const aim = (x, y) => {
    const rs = cells.map((c) => c.getBoundingClientRect()), R = 3 * (rs.reduce((s, r) => s + r.width, 0) / rs.length);
    rs.forEach((r, i) => { const d = Math.hypot(x - (r.left + r.width / 2), (y - (r.top + r.height / 2)) * 0.6); t[i] = MIN + (MAX - MIN) * Math.max(0, 1 - d / R) ** 2; });
    run();
  };
  const rest = () => { t.fill(REST); run(); };
  // 每帧向目标插值 18%，全部到位就停
  const tick = () => {
    raf = 0; if (!root.host.isConnected) return;
    let moving = false; w.forEach((v, i) => { const d = t[i] - v; if (Math.abs(d) < 1) w[i] = t[i]; else { w[i] = v + d * 0.18; moving = true; } });
    draw(); if (moving) raf = requestAnimationFrame(tick);
  };
  const run = () => { if (!raf) raf = requestAnimationFrame(tick); };
  st.addEventListener('pointermove', (e) => { if (e.pointerType === 'touch' && !e.buttons) return; virt = null; aim(e.clientX, e.clientY); });
  st.addEventListener('pointerdown', (e) => { if (e.pointerType === 'touch') { virt = null; aim(e.clientX, e.clientY); } });
  st.addEventListener('pointerleave', () => { if (!virt) rest(); });
  st.addEventListener('pointerup', (e) => { if (e.pointerType === 'touch') rest(); });
  // 演示：一个看不见的指针从左扫到右，停在第三个字母上
  const sweep = () => {
    const a = cells[0].getBoundingClientRect(), b = cells[6].getBoundingClientRect(), end = cells[2].getBoundingClientRect(), y = a.top + a.height / 2, t0 = performance.now(), me = (virt = {});
    const x0 = a.left, x1 = b.right, xe = end.left + end.width / 2;
    const step = (now) => {
      if (virt !== me || !root.host.isConnected) return;
      const p = Math.min(1, (now - t0) / 1600), x = p < 0.7 ? x0 + (x1 - x0) * (p / 0.7) : x1 + (xe - x1) * ((p - 0.7) / 0.3);
      aim(x, y); if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  root.querySelector('.ctl').addEventListener('click', sweep);
  new ResizeObserver(measure).observe(st);
  measure();
  setTimeout(() => { if (root.host.isConnected) sweep(); }, 200);
}
</script>
