---
zh: 磨砂玻璃面板
en: Glass panel rise
order: 10
---

## 是什么

点开后一块半透明磨砂面板从下方淡入上浮、轻微放大到位，透出背后被模糊的照片；面板里是大数字、逐格填满的分段进度和主按钮。

## 适合

打卡成就、运动或健康日报、会员权益、天气等背景本身是照片、插画或地图的轻量结果面板。

## 不适合

普通确认（删除、退出登录）用对话框；背景是白底列表或纯色时玻璃看不出来，改用实色底部面板；面板里有表单或大段文字时用实色面板或新页面，模糊背景会拖累可读性。

## 注意

文字只放在不透明度 60% 以上的玻璃上，并按背景最亮处实测对比度；玻璃面积别铺满整屏，大面积 backdrop-filter 在低端机上掉帧。

## 要点

- 面板底色白色 60–70% 不透明 + backdrop-filter: blur(20px) saturate(1.4)，1px rgba(255,255,255,.7) 描边、圆角 20px，四周留 10–12px 不贴边。
- 打开：从下方 24px、scale(.96)、透明度 0 浮到原位，320ms、cubic-bezier(.2,.8,.2,1)；关闭反向、200ms、缓入曲线。
- 分段进度约 20 格，面板落定后按 30ms 间隔一格一格填到当前进度，总时长不超过 700ms；大数字用等宽数字。
- 用 @supports not (backdrop-filter: blur(1px)) 退回 92% 白色实底；文字与玻璃最浅处的对比度 ≥ 4.5:1。
- 遮罩只压暗 15–20%，保留背后图像；点遮罩、按 Esc、点关闭按钮都能关，关闭后焦点回到触发按钮。
- 打开时用 role="status" 播报一次核心数字，如“已坚持 87 天，本月完成 21 / 30 天”。
- 减少动态效果时面板直接出现、进度直接填满，不做上浮、放大和逐格填充。

## 提示词

给{产品}的{打卡结果}做「磨砂玻璃面板」：点触发后一块磨砂玻璃面板（白色 64% 不透明、backdrop-filter: blur(20px)、1px 浅色描边、圆角 20px、四周留 10px）从下方 24px、scale(.96) 淡入上浮到原位（320ms 缓出），遮罩只轻压 15–20%，透出背后的{背景图}；面板里放{核心指标}大数字（等宽数字）、约 20 格的分段进度（面板落定后按 30ms 一格填到当前进度）、{信息块数}个信息块和一个主按钮；不支持 backdrop-filter 时退回 92% 白色实底；点遮罩、Esc、关闭按钮都能关，焦点回到触发按钮；打开时用 role="status" 播报核心数字；减少动态效果时直接显示面板和填满的进度。

## 示例

<link rel="stylesheet" href="../../_shared/app-sheet-base.css">
<style>
.st{background:#2e2a6e}
.app{position:absolute;inset:0}
.sky{position:absolute;inset:0;background:radial-gradient(circle at 70% 62%,#fff1c9 0 5%,#ffc98a 7%,rgba(255,170,120,0) 30%),linear-gradient(#2e2a6e,#7b3f8f 36%,#e06a78 60%,#ffb27a 78%)}
.sky i{position:absolute;left:0;right:0;bottom:0}
.m1{height:46%;background:linear-gradient(#5a3d8f,#33265f);clip-path:polygon(0 55%,14% 30%,28% 48%,46% 8%,62% 42%,78% 20%,100% 46%,100% 100%,0 100%)}
.m2{height:30%;background:linear-gradient(#2a1f52,#140f2c);clip-path:polygon(0 35%,20% 8%,38% 46%,58% 18%,76% 52%,100% 22%,100% 100%,0 100%)}
.top{position:absolute;left:16px;top:10px;color:#fff}
.top b{display:block;font-size:16px}
.top span{font-size:12px;opacity:.85}
.open{position:absolute;left:50%;bottom:18px;transform:translateX(-50%);height:36px;padding:0 20px;border:1px solid rgba(255,255,255,.55);border-radius:999px;background:rgba(255,255,255,.2);color:#fff;font-weight:600;white-space:nowrap;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
.scrim{position:absolute;inset:0;background:rgba(20,14,44,.18);opacity:0;visibility:hidden;transition:opacity .3s,visibility 0s .3s}
.on .scrim{opacity:1;visibility:visible;transition:opacity .3s}
.gl{position:absolute;left:10px;right:10px;bottom:10px;max-width:400px;margin:0 auto;padding:16px;border:1px solid rgba(255,255,255,.7);border-radius:20px;background:rgba(255,255,255,.64);-webkit-backdrop-filter:blur(20px) saturate(1.4);backdrop-filter:blur(20px) saturate(1.4);box-shadow:0 12px 32px rgba(30,20,70,.25);opacity:0;visibility:hidden;transform:translateY(24px) scale(.96);transform-origin:50% 100%;transition:opacity .2s,transform .2s cubic-bezier(.4,0,1,1),visibility 0s .2s}
.on .gl{opacity:1;visibility:visible;transform:none;transition:opacity .32s cubic-bezier(.2,.8,.2,1),transform .32s cubic-bezier(.2,.8,.2,1)}
@supports not ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))){.gl{background:rgba(255,255,255,.92)}
}
.hd{display:flex;align-items:center;justify-content:space-between;gap:8px}
h3{font-size:14px;font-weight:600;white-space:nowrap}
.n{display:inline-block;min-width:3ch;margin:0 4px;font-size:32px;line-height:1;text-align:center;font-variant-numeric:tabular-nums}
.x{flex:none;width:28px;height:28px;padding:0;border:0;border-radius:50%;background:rgba(31,35,41,.08);font-size:16px;line-height:1}
.bar{display:flex;align-items:center;gap:10px;margin-top:10px}
.seg{flex:1;display:grid;grid-template-columns:repeat(20,minmax(0,1fr));gap:3px}
.seg i{height:8px;border-radius:2px;background:rgba(31,35,41,.12);transition:background .16s}
.seg i.f{background:#e8552f}
.cap{flex:none;font-size:12px;color:#3d424c;font-variant-numeric:tabular-nums}
.row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:12px}
.k{min-width:0;padding:6px 10px;border-radius:12px;background:rgba(255,255,255,.55)}
.k small{display:block;overflow:hidden;color:#3d424c;font-size:11px;white-space:nowrap;text-overflow:ellipsis}
.k b{display:block;font-size:14px;white-space:nowrap}
.go{grid-column:1/-1;height:40px;border:0;border-radius:12px;background:#1f2329;color:#fff;font-weight:600;white-space:nowrap}
.go[aria-pressed=true]{background:#12805c}
@container (max-height:260px){.top{display:flex;align-items:baseline;gap:8px;top:8px}
.gl{padding:12px;border-radius:18px}
.n{font-size:26px}
.bar{margin-top:8px}
.seg i{height:6px}
.row{grid-template-columns:minmax(0,1fr) minmax(0,1fr) auto;margin-top:10px}
.k3{display:none}
.k{padding:4px 8px}
.go{grid-column:auto;height:auto;padding:0 14px}
}
</style>

<div class="st"><div class="app"><div class="sky" aria-hidden="true"><i class="m1"></i><i class="m2"></i></div><div class="top"><b>晨跑</b><span>今日日出 6:42</span></div><button type="button" class="open" aria-haspopup="dialog">查看打卡</button></div><div class="scrim"></div><section class="gl" role="dialog" aria-modal="true" aria-labelledby="gl-t"><div class="hd"><h3 id="gl-t">已坚持<b class="n">87</b>天</h3><button type="button" class="x" aria-label="关闭">×</button></div><div class="bar"><div class="seg" aria-hidden="true"></div><span class="cap">本月 21/30</span></div><div class="row"><div class="k"><small>本周</small><b>5 次</b></div><div class="k"><small>最长连续</small><b>42 天</b></div><div class="k k3"><small>累计</small><b>618 km</b></div><button type="button" class="go" aria-pressed="false">今天打卡</button></div></section><button type="button" class="ctl rp">重播</button><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const st = root.querySelector('.st'), app = root.querySelector('.app'), open = root.querySelector('.open'), seg = root.querySelector('.seg'), n = root.querySelector('.n'), cap = root.querySelector('.cap'), go = root.querySelector('.go'), x = root.querySelector('.x'), say = root.querySelector('.sr');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches, cells = [];
  let tm = [], done = false;
  for (let i = 0; i < 20; i++) cells.push(seg.appendChild(document.createElement('i')));
  const month = () => 21 + done, lit = () => Math.round(20 * month() / 30);
  const paint = () => { n.textContent = 87 + done; cap.textContent = `本月 ${month()}/30`; cells.forEach((c, i) => c.classList.toggle('f', i < lit())); go.setAttribute('aria-pressed', String(done)); go.textContent = done ? '今天已打卡' : '今天打卡'; };
  const show = (focus) => {
    tm.forEach(clearTimeout); tm = []; cells.forEach((c) => c.classList.remove('f'));
    st.classList.add('on'); app.inert = true;
    if (focus) x.focus({ preventScroll: true });
    // 面板落定（320ms）后一格一格填
    for (let i = 0; i < lit(); i++) tm.push(setTimeout(() => { if (root.host.isConnected) cells[i].classList.add('f'); }, still ? 0 : 320 + i * 30));
    say.textContent = `已坚持 ${87 + done} 天，本月完成 ${month()} / 30 天`;
  };
  const hide = () => { tm.forEach(clearTimeout); st.classList.remove('on'); app.inert = false; open.focus({ preventScroll: true }); };
  open.onclick = () => show(true); x.onclick = hide; root.querySelector('.scrim').onclick = hide;
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && st.classList.contains('on')) hide(); });
  go.onclick = () => { done = !done; paint(); say.textContent = done ? `打卡成功，已坚持 ${87 + done} 天` : '已取消今天的打卡'; };
  root.querySelector('.rp').onclick = () => { st.classList.add('nt'); st.classList.remove('on'); void st.offsetWidth; st.classList.remove('nt'); void st.offsetWidth; show(false); };
  setTimeout(() => { if (root.host.isConnected) show(false); }, 200);
}
</script>
