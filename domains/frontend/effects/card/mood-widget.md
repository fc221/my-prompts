---
zh: 情绪天气卡
en: Mood weather widget
aka: 天气小组件 动态天气卡 状态氛围卡 weather widget ambient
order: 80
---

## 是什么

天气或状态小组件的背景和图形跟着状态变：晴天是暖色光斑缓缓浮动，雨天有细雨斜斜落下，夜里铺一层闪烁的星点；切换状态时整块氛围平滑过渡。

## 适合

天气、出行和户外类 App 的首页小组件，智能家居的“家里此刻”状态卡，门店或园区大屏的环境卡，健康类 App 的心情、睡眠打卡卡片。

## 不适合

同屏有多张卡片时只给一张做氛围，其余用静态底色；需要精确读数的气象数据用正常图表；只想要磨砂质感的天气卡用「玻璃拟态」。

## 注意

状态先用文字说清楚（“小雨 · 降水概率 80%”），图形只是加强，读屏和色弱用户不依赖画面；每种状态的文字颜色单独定，和背景最亮处核对对比度，切换背景时文字色一起过渡。

## 要点

- 状态映射：天气接口返回的天气代码加日出日落时间决定状态（晴、多云、雨、雪、夜），状态名、渐变、图形和文字色写成一张表，新增状态只加一行
- 晴：#ffd27a 到 #ff9f5a 的暖色渐变，3–4 个 blur(12–20px) 的光斑缓慢漂移（8–14s 一轮），文字 #3a1c00
- 雨：#4b5d78 到 #2c3a50 的冷灰蓝，20–30 条 1px × 14px 的雨丝倾斜 12° 下落（0.6–1s 一轮，随机延迟），文字 #ffffff
- 夜：#141a3a 到 #26305e，20–40 个 1–2px 星点各自闪烁（2–5s，透明度 .3 到 1），加一枚月亮，文字 #ffffff
- 切换：两层背景交叉淡入 600ms，图形层先淡出再换；只动 opacity 和 transform；同时在动的图形元素不超过 40 个，没显示的状态层暂停动画
- 省电：卡片离开视口或页面隐藏时暂停动画（animation-play-state: paused），图形层 aria-hidden
- 减少动态效果时图形静止：光斑不漂、雨丝画成静止的斜线、星点不闪，切换直接替换

## 提示词

给{天气或状态小组件}做「情绪天气卡」：按{状态来源}（如天气代码加日出日落时间）映射成晴、雨、夜等状态，每种状态在一张表里定义背景渐变、图形和文字色；晴天 #ffd27a 到 #ff9f5a，3–4 个模糊光斑 8–14s 缓慢漂移，深棕字 #3a1c00；雨天 #4b5d78 到 #2c3a50，20–30 条倾斜 12° 的细雨丝 0.6–1s 下落，白字；夜晚 #141a3a 到 #26305e，20–40 个星点 2–5s 闪烁加一枚月亮，白字；状态文字（天气、温度、降水概率）始终写全，图形层 aria-hidden；切换时两层背景交叉淡入 600ms，文字色一起过渡，只动 opacity 和 transform；同时在动的图形元素不超过 40 个，没显示的状态层暂停动画；离开视口或页面隐藏时暂停动画；减少动态效果时图形静止、切换直接替换；文字对比度按背景最亮处核对。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{display:grid;place-items:center;padding:12px;background:#e9ecf1}
.wd{--fg:#3a1c00;--chip:rgba(255,255,255,.4);position:relative;width:100%;max-width:440px;height:100%;max-height:300px;overflow:hidden;border-radius:22px;color:var(--fg);box-shadow:0 10px 28px rgba(30,40,60,.18);transition:color .6s}
.wd[data-s=rain],.wd[data-s=night]{--fg:#fff;--chip:rgba(255,255,255,.16)}
.bg{position:absolute;inset:0;opacity:0;transition:opacity .6s}
.bg.on{opacity:1}
.bg:not(.on) *{animation-play-state:paused!important}
.wd.off .bg *{animation-play-state:paused!important}
.sun{background:linear-gradient(150deg,#ffd27a,#ff9f5a)}
.sun .core{position:absolute;right:-8%;top:-30%;width:58%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#fff7dc 0 22%,rgba(255,240,190,.7) 40%,transparent 70%)}
.sun .sp{position:absolute;border-radius:50%;background:rgba(255,248,214,.55);filter:blur(14px);animation:drift 11s ease-in-out infinite alternate}
@keyframes drift{to{transform:translate(18%,22%) scale(1.15)}
}
.rain{background:linear-gradient(170deg,#4b5d78,#2c3a50)}
.rain .cl{position:absolute;border-radius:50%;background:rgba(255,255,255,.14);filter:blur(10px)}
.rain i:not(.cl){position:absolute;top:-16px;width:1px;height:14px;background:linear-gradient(rgba(255,255,255,0),rgba(255,255,255,.75));transform:rotate(12deg);animation:fall .8s linear infinite}
@keyframes fall{from{transform:translate(0,0) rotate(12deg)}
to{transform:translate(-64px,320px) rotate(12deg)}
}
.night{background:linear-gradient(170deg,#141a3a,#26305e)}
.night i:not(.moon){position:absolute;width:2px;height:2px;border-radius:50%;background:#fff;animation:tw 3s ease-in-out infinite alternate}
@keyframes tw{from{opacity:.3}
to{opacity:1}
}
.moon{position:absolute;right:14%;top:14%;width:30px;height:30px;border-radius:50%;box-shadow:inset -9px 3px 0 0 #f4efd8;transform:rotate(-20deg)}
.tx{position:relative;display:grid;gap:2px;padding:14px 16px}
.loc{font-size:12px;font-weight:500}
.tmp{font-size:44px;line-height:1;font-weight:300;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.ds{font-size:13px;font-weight:500}
.hl{display:none;font-size:12px}
.sw{position:absolute;left:12px;bottom:10px;display:flex;gap:4px;padding:3px;border-radius:999px;background:var(--chip);transition:background-color .6s}
.sw button{height:26px;padding:0 12px;border:0;border-radius:999px;background:none;color:inherit;font-size:12px;font-weight:500;transition:background-color .15s}
.sw button:hover{background:rgba(255,255,255,.25)}
.sw [aria-pressed=true]{background:rgba(255,255,255,.88);color:#1f2329}
.sw button:focus-visible{outline:2px solid var(--fg);outline-offset:1px}
@container (min-height:260px){.wd{border-radius:28px}
.tx{padding:22px 26px;gap:4px}
.loc{font-size:14px}
.tmp{font-size:72px}
.ds{font-size:15px}
.hl{display:block}
.sw{left:22px;bottom:20px}
.sw button{height:32px;padding:0 16px;font-size:13px}
.moon{width:40px;height:40px;box-shadow:inset -12px 4px 0 0 #f4efd8}
}
@media (prefers-reduced-motion:reduce){.bg *{animation:none!important}
.rain i:not(.cl){top:var(--y)}
}
</style>

<div class="st"><section class="wd" data-s="sun" aria-label="天气小组件"><div class="bg sun on" aria-hidden="true"><i class="core"></i></div><div class="bg rain" aria-hidden="true"><i class="cl" style="left:-10%;top:-20%;width:60%;height:50%"></i><i class="cl" style="left:40%;top:-26%;width:70%;height:48%"></i></div><div class="bg night" aria-hidden="true"><i class="moon"></i></div><div class="tx"><span class="loc">杭州 · 西湖区</span><span class="tmp">24°</span><span class="ds">晴 · 紫外线中等</span><span class="hl">最高 26° · 最低 15°</span></div><div class="sw" role="group" aria-label="切换天气"><button type="button" data-s="sun" aria-pressed="true">晴</button><button type="button" data-s="rain" aria-pressed="false">雨</button><button type="button" data-s="night" aria-pressed="false">夜</button></div></section><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  // 状态表：新增状态只加一行
  const S = { sun: ['24°', '晴 · 紫外线中等', '最高 26° · 最低 15°'], rain: ['18°', '小雨 · 降水概率 80%', '最高 19° · 最低 14°'], night: ['14°', '晴夜 · 湿度 72%', '明早 6:18 日出'] };
  const wd = root.querySelector('.wd'), live = root.querySelector('[role=status]'), rnd = (a, b) => a + Math.random() * (b - a);
  const add = (sel, n, fn, cls = '') => { const p = root.querySelector(sel); for (let i = 0; i < n; i++) { const e = document.createElement('i'); e.className = cls; fn(e.style, i); p.appendChild(e); } };
  add('.sun', 3, (s, i) => Object.assign(s, { width: [46, 34, 28][i] + '%', aspectRatio: '1', left: [4, 46, 18][i] + '%', top: [30, 46, 4][i] + '%', animationDuration: [9, 13, 11][i] + 's', animationDelay: -i * 3 + 's' }), 'sp');
  add('.rain', 22, (s) => { Object.assign(s, { left: rnd(4, 118) + '%', animationDuration: rnd(0.6, 1).toFixed(2) + 's', animationDelay: -rnd(0, 1).toFixed(2) + 's' }); s.setProperty('--y', rnd(10, 90).toFixed(0) + '%'); });
  add('.night', 24, (s) => { Object.assign(s, { left: rnd(2, 98) + '%', top: rnd(4, 70) + '%', animationDuration: rnd(2, 5).toFixed(1) + 's', animationDelay: -rnd(0, 5).toFixed(1) + 's', opacity: rnd(0.4, 1).toFixed(2) }); });
  const tx = root.querySelectorAll('.tx span'), btns = root.querySelectorAll('.sw button');
  const set = (k) => {
    wd.dataset.s = k; root.querySelectorAll('.bg').forEach((b) => b.classList.toggle('on', b.classList.contains(k)));
    [, tx[1].textContent, tx[2].textContent, tx[3].textContent] = [0, ...S[k]];
    btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.s === k)));
    live.textContent = '当前天气：' + S[k][1] + '，' + S[k][0];
  };
  btns.forEach((b) => b.addEventListener('click', () => set(b.dataset.s)));
  // 离开视口时暂停图形动画
  const io = new IntersectionObserver(([e]) => { if (!root.host.isConnected) return io.disconnect(); wd.classList.toggle('off', !e.isIntersecting); });
  io.observe(wd);
  setTimeout(() => { if (root.host.isConnected && wd.dataset.s === 'sun') set('rain'); }, 500);
}
</script>
