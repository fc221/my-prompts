---
zh: 凹槽底部导航
en: Notched tab bar
aka: 弧形底部导航 曲线导航 凹陷导航栏 curved tab bar
order: 40
---

## 是什么

底部导航条的上沿在当前项处挖出一个圆弧凹槽，圆形按钮托着当前图标浮在凹槽里；切换时凹槽和按钮一起沿导航条滑到新位置，条身的轮廓连续变化，看不到接缝。

## 适合

音乐、健身、打卡、社区这类消费 App 和活动型 H5 的一级导航：3–5 个入口，想在导航上留一点品牌记忆。

## 不适合

工具类产品入口密集、切换频繁，用「底部标签栏」更省空间；正中要常驻“新建”用「标签栏正中的主按钮」；桌面宽度换成侧栏或顶栏。

## 注意

凹槽是导航条形状的一部分：用一条 SVG 路径画出整条导航条，切换时重算路径。叠一个和背景同色的圆“盖”出来的凹槽，背景一变就露馅，肩部也是硬角。首尾两项要算够余量：第一项中心到条身边缘的距离 ≥ 凹槽半宽 + 条身圆角，不够时加大导航条的左右内边距。

## 要点

- 尺寸参考：圆按钮直径 44–52px，凹槽半径 = 按钮半径 + 5px，上沿和圆弧之间留 7–8px 的肩部曲线；导航条高 60–64px，再加 env(safe-area-inset-bottom)。
- 路径按“上沿 → 左肩贝塞尔 → 圆弧（A 命令）→ 右肩贝塞尔 → 上沿 → 圆角和底边”拼成，写成 shape(w, h, x) 一个函数，每帧只有凹槽中心 x 在变。
- 凹槽和圆按钮共用一个 x，用 requestAnimationFrame 里的弹簧追目标（刚度约 300、阻尼约 30，约 350ms 到位）；连点时从当前位置和速度接着追，停稳就结束循环。
- 目标 x 取按钮实际的 offsetLeft + offsetWidth / 2；画路径前把 x 夹到可用范围里，过冲也碰不到圆角；尺寸变化时直接对齐。
- 当前图标用 transform 升进圆里并反白（约 260ms），文字留在条身里，用强调色加粗。
- 阴影用 filter: drop-shadow，才会贴着凹槽轮廓走；模糊半径控制在 12px 左右，路径每帧都在变，半径越大越费。
- 每项是按钮或链接，当前项 aria-current="page"，焦点框画在标签上；页面立即切换，切换后用 role="status" 播报页面名。
- 减少动态效果时凹槽和按钮直接到位。

## 提示词

给{App 式页面}做「凹槽底部导航」：{入口列表，3–5 项}等分宽度，导航条高 62px 并加 env(safe-area-inset-bottom)，左右内边距 20px，保证首尾项的凹槽碰不到条身圆角；整条导航条用一条 SVG path 画，当前项处向下挖半径 27px 的圆弧凹槽，上沿和圆弧之间用 7–8px 的贝塞尔肩部过渡；直径 44px 的{品牌色}圆按钮和凹槽同心，向上凸出导航条约 15px；当前图标上移进圆里并反白，文字留在条身里用强调色；切换时凹槽中心和圆按钮共用一个 x，用 requestAnimationFrame 里的弹簧（刚度 300、阻尼 30）滑到目标项中心，每帧重算路径，连续点击从当前位置和速度接着追，停稳后结束循环；尺寸变化时直接对齐；页面内容立即切换；阴影用 filter: drop-shadow；每项是按钮，当前项 aria-current="page"，切换后用 role="status" 播报页面名；减少动态效果时直接到位。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:flex;justify-content:center;background:linear-gradient(150deg,#c3cffb,#d3c9fb 55%,#f7c4dc)}
.ph{display:flex;flex-direction:column;width:min(100%,380px);height:100%;padding:12px 8px 8px}
.pg{flex:1;min-height:0;padding:0 8px 18px}
.pg h3{margin:0;font-size:18px;line-height:1.3;font-weight:700;color:#1e2140}
.pg p{margin:2px 0 0;color:#3f4363;font-size:12px}
.tiles{display:none}
.bar{position:relative;flex:none;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));height:62px;padding:0 20px}
.shape{position:absolute;inset:0;width:100%;height:100%;overflow:visible;filter:drop-shadow(0 4px 12px rgba(44,48,92,.16))}
.ball{position:absolute;left:0;top:-15px;z-index:1;width:44px;height:44px;margin-left:-22px;border-radius:50%;background:linear-gradient(160deg,#6366f1,#4338ca);box-shadow:0 6px 12px -4px rgba(67,56,202,.6)}
.tab{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:2px;min-width:0;padding:0 0 8px;border:0;border-radius:12px;background:none;color:#5c617a;font-size:11px;line-height:14px}
.tab:focus-visible{outline-offset:-3px}
.ic{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;transition:transform .26s cubic-bezier(.2,0,0,1),color .2s}
.tab[aria-current]{color:#4338ca;font-weight:600}
.tab[aria-current] .ic{color:#fff;transform:translateY(-20px)}
@container (min-height:260px){.ph{padding-top:18px}
.pg h3{font-size:22px}
.pg p{font-size:13px}
.tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:14px}
.tiles i{height:92px;border-radius:12px;background:linear-gradient(150deg,var(--a),var(--b))}
}
</style>

<div class="st"><div class="ph"><div class="pg"><h3 class="tt">首页</h3><p class="sub">今天有 3 件待办</p><div class="tiles" aria-hidden="true"><i style="--a:#a5b4fc;--b:#6366f1"></i><i style="--a:#f9a8d4;--b:#db2777"></i><i style="--a:#fcd34d;--b:#ea580c"></i></div></div><nav class="bar" aria-label="主导航"><svg class="shape" aria-hidden="true"><path fill="#fff"/></svg><i class="ball" aria-hidden="true"></i><button type="button" class="tab" aria-current="page"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/></svg><span>首页</span></button><button type="button" class="tab"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg><span>探索</span></button><button type="button" class="tab"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10a1 1 0 0 1 1 1v15l-6-4-6 4V5a1 1 0 0 1 1-1z"/></svg><span>收藏</span></button><button type="button" class="tab"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg><span>我的</span></button></nav></div><p class="sr" role="status"></p></div>

<script type="module">
const CORNER = 14, R = 27, SY = 7, SX = 8, HALF = R + SX; // 条身圆角、凹槽半径、肩部的高和宽、凹槽半宽
// 整条导航条是一条路径：左上角 → 肩 → 圆弧 → 肩 → 右上角 → 底边
const shape = (w, h, x) => {
  const a = x - R, b = x + R;
  return `M0 ${CORNER}Q0 0 ${CORNER} 0H${a - SX}C${a - SX * 0.3} 0 ${a} ${SY * 0.3} ${a} ${SY}A${R} ${R} 0 0 0 ${b} ${SY}C${b} ${SY * 0.3} ${b + SX * 0.3} 0 ${b + SX} 0H${w - CORNER}Q${w} 0 ${w} ${CORNER}V${h - CORNER}Q${w} ${h} ${w - CORNER} ${h}H${CORNER}Q0 ${h} 0 ${h - CORNER}Z`;
};
const PAGES = [['首页', '今天有 3 件待办'], ['探索', '本周上新 12 个模板'], ['收藏', '已收藏 28 条'], ['我的', 'MyPrompts 专业版']];
export default function demo(root) {
  const bar = root.querySelector('.bar'), path = bar.querySelector('path'), ball = bar.querySelector('.ball'), tabs = [...bar.querySelectorAll('.tab')];
  const tt = root.querySelector('.tt'), sub = root.querySelector('.sub'), say = root.querySelector('[role=status]');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cur = 0, x = 0, v = 0, to = 0, raf = 0, last = 0;
  const centre = (i) => tabs[i].offsetLeft + tabs[i].offsetWidth / 2;
  const paint = () => {
    const w = bar.clientWidth, c = Math.max(CORNER + HALF, Math.min(w - CORNER - HALF, x)); // 过冲时也不撞条身圆角
    path.setAttribute('d', shape(w, bar.clientHeight, c));
    ball.style.transform = `translateX(${c}px)`;
  };
  const step = (now) => {
    raf = 0;
    if (!root.host.isConnected) return;
    for (let dt = Math.min(0.033, (now - last) / 1000); dt > 0; dt -= 1 / 240) {
      const h = Math.min(dt, 1 / 240);
      v += ((to - x) * 300 - v * 30) * h; x += v * h;
    }
    last = now;
    if (Math.abs(to - x) > 0.3 || Math.abs(v) > 0.3) raf = requestAnimationFrame(step);
    else { x = to; v = 0; }
    paint();
  };
  const snap = () => { cancelAnimationFrame(raf); raf = 0; x = to = centre(cur); v = 0; paint(); };
  const select = (i) => {
    if (i === cur) return;
    tabs[cur].removeAttribute('aria-current'); tabs[i].setAttribute('aria-current', 'page');
    cur = i; to = centre(i);
    [tt.textContent, sub.textContent] = PAGES[i];
    say.textContent = PAGES[i][0];
    if (still) return snap();
    if (!raf) { last = performance.now(); raf = requestAnimationFrame(step); } // 连点时从当前位置和速度接着追
  };
  tabs.forEach((t, i) => t.addEventListener('click', () => select(i)));
  new ResizeObserver(snap).observe(bar);
  snap();
  setTimeout(() => select(2), 350);
}
</script>
