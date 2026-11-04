---
zh: 有厚度的立体字
en: Extruded 3D text
aka: 3D 立体字 立体文字 挤出字 厚度文字 3D text
order: 230
---

## 是什么

大标题后面叠出一层层厚度，像实体字块；鼠标移动时厚度的方向跟着变，像在转动这块字。

## 适合

活动主视觉、游戏和潮玩品牌的首屏大字、海报风落地页里的一两个词、404 这类只放一个大数字的页面。

## 不适合

正文、按钮和导航文字；小于 48px 或字重不够的字，厚度会糊成一团，看着像重影。整块内容跟着鼠标倾斜用「3D 倾斜卡片」，几个词轮换翻面用「文字方块」，能拖着转到侧面和背面的物体用「可拖动的 3D 物件」。

## 注意

厚度、投影和指针讲的是同一个光照：字面最亮，厚度从近到远逐层变暗，投影落在厚度伸出的那一侧；跟随指针时厚度伸向指针的反方向，像字面转过来朝着指针。

## 要点

- 厚度：text-shadow 叠 8–16 层（约字号 ÷ 7），每层沿同一方向多偏 1px、模糊为 0，颜色从比字面深一档的侧面色逐层变暗；最后一层是投影，再往外偏 4–6px，模糊 10–16px，半透明
- 选字：只给一处 48px 以上、字重 800–900 的短标题（2–8 个字），字面和背景的对比度 ≥ 3:1，可读性不靠厚度撑；细体和衬线体不做
- 跟随：指针相对区域中心的偏移按区域半宽、半高归一到 −1…1，厚度方向取反，每层偏移 0.5–1px（越靠边越厚）；指针在中心附近时保持上一个方向，免得来回翻
- 节流：pointermove 只记坐标，requestAnimationFrame 里每帧向目标插值 15–20% 并重写一次 text-shadow，和目标相差不到 0.01px 就停掉循环；离开区域回到静止角度（右下 45°）；text-shadow 不加 transition，否则和插值打架
- 3D 版：同一段字复制 8–12 份叠放，第 i 份 translateZ(−1.5px × i)、颜色逐份变暗，父级 transform-style: preserve-3d、perspective 600–800px，跟鼠标 rotateX / rotateY 最多 ±15°；复制层 aria-hidden，只有最前面一份留给读屏
- text-shadow 版就是原来的标题文字，保持 h1 / h2，读屏照常
- 触屏没有悬停（hover: none）和减少动态效果时固定在静止角度，不跟随、不自转

## 提示词

给{首屏大标题}做「有厚度的立体字」：标题{字号}（48px 以上）、字重 900，字面用{字面色}；用 text-shadow 叠{层数}层厚度（8–16 层），每层沿同一方向多偏 1px、不模糊，颜色从{侧面色}逐层变暗，最后加一层再往外偏 5px、模糊 14px 的半透明投影；静止时厚度朝右下 45°；鼠标在{跟随区域}里移动时，把指针相对区域中心的偏移按半宽、半高归一到 −1…1，厚度朝反方向伸出，每层偏移 0.5–1px（越靠边越厚），中心附近保持上一个方向；pointermove 只记坐标，requestAnimationFrame 里每帧向目标插值 18% 并重写 text-shadow，到位后停止循环，离开区域回到静止角度，text-shadow 不加 transition；标题仍是普通的 h1 文字；触屏和减少动态效果时固定在右下 45°；整页只用这一处。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(120% 110% at 50% 35%,#4554ef,#2630b0);color:#e4e7ff;user-select:none;-webkit-user-select:none}
.kk{position:absolute;left:12px;top:16px;margin:0;font-size:12px;letter-spacing:.08em}
.re{position:absolute;right:12px;top:12px}
.big{margin:0;color:#ffe15c;font:900 64px/1 system-ui,-apple-system,"Helvetica Neue",Arial,sans-serif;letter-spacing:.02em}
.sub{margin:20px 0 0;font-size:12px;letter-spacing:.04em}
@container (min-height:240px){.kk{left:20px;top:20px;font-size:13px}
.re{right:16px;top:16px}
.big{font-size:112px}
.sub{margin-top:32px;font-size:14px}
}
</style>

<div class="st"><p class="kk">MyPrompts 夏日游园会</p><button type="button" class="ctl re">演示转动</button><h3 class="big">PLAY</h3><p class="sub">7 月 12 日 · 城东公园</p></div>

<script type="module">
export default function demo(root) {
  const st = root.querySelector('.st'), t = root.querySelector('.big'), btn = root.querySelector('.re');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const REST = [0.71, 0.71]; // 静止角度：厚度朝右下 45°
  const NEAR = [238, 168, 38], FAR = [122, 50, 18]; // 侧面从近到远逐层变暗
  let cur = REST.slice(), goal = REST.slice(), raf = 0, sim = 0;
  const paint = ([x, y]) => {
    const n = Math.max(8, Math.min(16, Math.round(parseFloat(getComputedStyle(t).fontSize) / 7))), s = [];
    for (let i = 1; i <= n; i++) {
      const k = (i - 1) / (n - 1);
      s.push(`${(x * i).toFixed(2)}px ${(y * i).toFixed(2)}px 0 rgb(${NEAR.map((v, j) => Math.round(v + (FAR[j] - v) * k))})`);
    }
    s.push(`${(x * (n + 5)).toFixed(1)}px ${(y * (n + 5)).toFixed(1)}px 14px rgba(12,16,70,.5)`);
    t.style.textShadow = s.join(',');
  };
  const tick = () => {
    raf = 0;
    if (!root.host.isConnected) return;
    cur = cur.map((v, i) => v + (goal[i] - v) * 0.18);
    paint(cur);
    if (Math.abs(goal[0] - cur[0]) + Math.abs(goal[1] - cur[1]) > 0.01) raf = requestAnimationFrame(tick);
  };
  const aim = (g) => { goal = g; if (!raf) raf = requestAnimationFrame(tick); };
  // nx、ny 是指针相对区域中心、按半宽半高归一的偏移；厚度伸向反方向，越靠边越厚，中心附近保持上一个方向
  const toward = (nx, ny) => {
    const d = Math.hypot(nx, ny);
    if (d < 0.08) return goal;
    const len = Math.min(1, 0.5 + d * 0.6);
    return [(-nx / d) * len, (-ny / d) * len];
  };
  st.addEventListener('pointermove', (e) => {
    if (still || e.pointerType === 'touch') return;
    const r = st.getBoundingClientRect();
    sim++;
    aim(toward((e.clientX - r.left) / (r.width / 2) - 1, (e.clientY - r.top) / (r.height / 2) - 1));
  });
  st.addEventListener('pointerleave', (e) => { if (!still && e.pointerType !== 'touch') aim(REST); });
  // 演示：假装指针从左上出发绕标题转一圈，转完回到静止角度
  const spin = () => {
    const id = ++sim, t0 = performance.now(), dur = 2400;
    const step = (now) => {
      if (id !== sim || !root.host.isConnected) return;
      const p = Math.min(1, (now - t0) / dur), a = Math.PI * 1.25 + p * Math.PI * 2;
      aim(p < 1 ? toward(Math.cos(a) * 0.9, Math.sin(a) * 0.9) : REST);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  paint(REST);
  new ResizeObserver(() => paint(cur)).observe(st); // 字号随容器变，层数跟着重算
  if (still) { btn.hidden = true; return; }
  btn.addEventListener('click', spin);
  setTimeout(() => root.host.isConnected && spin(), 400);
}
</script>
