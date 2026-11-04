---
zh: 收起面板、主图放大
en: Collapsible sheet with hero
order: 60
---

## 是什么

上方是主角（封面或照片叠），下方面板放详情；把面板往下拖，面板随手下滑到只露把手和标题，上方主角同步放大并下移占满空出的空间，松手吸附到展开或收起。

## 适合

相册回忆、音乐和播客封面、商品大图、地图上的地点详情——让人在“看主角”和“看详情”之间来回切换的页面。

## 不适合

详情才是主要内容、图只是配图时用普通详情页；要把面板彻底关掉时用可关闭的底部面板；面板里内容要长滚动时，先处理好滚动与拖动的冲突，处理不了就改用独立页面。

## 注意

面板位移和主角缩放由同一个进度值 p（0 展开、1 收起）算出；拖动时去掉过渡逐帧跟手，松手再加过渡吸附。

## 要点

- 收起时面板只露 64px（把手 + 标题 + 一行副标题）；展开高度按内容，约占 55%–60% 屏高。
- 拖动中：面板 translateY(range × p)，主角 translateY(range × p / 2) scale(1 + 0.2p)，range = 面板高度 − 64px，只动 transform。
- 松手：速度 > 0.5px/ms 按方向吸附，否则 p > 0.5 收起、反之展开；300ms、cubic-bezier(.2,.8,.2,1)。
- 把手区是真按钮（aria-expanded），点按切换展开 / 收起，是拖动的键盘替代；touch-action: none 只设在把手区。
- 拖动结束后紧跟着的那次 click 要忽略，否则拖完又被切换回去。
- 收起后详情区设 inert，不能被 Tab 到；状态变化用 role="status" 播报一次。
- 减少动态效果时点按直接切到终态；拖动仍然跟手，松手不做过渡。

## 提示词

给{产品}的{详情页}做「收起面板、主图放大」：上方是{主角}，下方面板放{详情}；向下拖面板（或点把手按钮，aria-expanded）时面板随手下滑到只露 64px 的把手和标题，同时主角按同一进度 p 放大（1→1.2）并下移 range×p/2 占满空出的空间（range = 面板高度 − 64px），只动 transform；松手按速度（>0.5px/ms）和位置（过半）吸附到展开或收起，300ms 缓出；向上拖恢复；拖动后忽略随之而来的 click；收起后详情设 inert；用 role="status" 播报状态；减少动态效果时直接切到终态。

## 示例

<link rel="stylesheet" href="../../_shared/app-sheet-base.css">
<style>
.st{background:linear-gradient(#efe7dc,#dcd3c6)}
.hero{position:absolute;left:0;right:0;top:0;bottom:190px;display:grid;place-items:center;transform-origin:50% 50%}
.stk{position:relative;width:140px;height:94px}
.stk i{position:absolute;inset:0;border:3px solid #fff;border-radius:10px;box-shadow:0 6px 18px rgba(60,40,20,.22)}
.stk .a{transform:translateX(-26px) rotate(-9deg);background:linear-gradient(160deg,#a9cbb0,#4f7f62)}
.stk .b{transform:translateX(26px) rotate(8deg);background:radial-gradient(circle at 70% 30%,#ffe2a6 0 10%,transparent 11%),linear-gradient(#f2b880,#c4663e)}
.stk .c{background:radial-gradient(circle at 28% 32%,#fff3cf 0 8%,transparent 9%),linear-gradient(transparent 58%,#7a4a2a 58% 64%,#5c3a22 64%),linear-gradient(#f6c177,#e0703f)}
.sh{position:absolute;left:0;right:0;bottom:0;height:190px;max-width:440px;margin:0 auto;border-radius:18px 18px 0 0;background:#fff;box-shadow:0 -8px 24px rgba(60,40,20,.14);transform:translateY(100%)}
.hd{position:relative;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;column-gap:10px;width:100%;height:64px;padding:14px 16px 6px;border:0;border-radius:18px 18px 0 0;background:none;text-align:left;touch-action:none;user-select:none}
.hd:focus-visible{outline-offset:-2px}
.grab{position:absolute;left:50%;top:7px;width:36px;height:4px;margin-left:-18px;border-radius:2px;background:#d5d9e0}
.tt{display:grid;min-width:0}
.tt b,.tt small{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.tt b{font-size:16px;line-height:1.3}
.tt small{color:#5b616e;font-size:12px}
.hint{color:#3b5bdb;font-size:12px;font-weight:600}
.bd{padding:0 16px 14px}
.bd p{display:-webkit-box;overflow:hidden;color:#3a3f48;-webkit-box-orient:vertical;-webkit-line-clamp:3}
.acts{display:flex;gap:8px;margin-top:10px}
.acts button{height:34px;padding:0 16px;border-radius:999px;font-weight:600;white-space:nowrap}
.pri{border:0;background:#1f2329;color:#fff}
.sec{border:1px solid #d0d5dd;background:#fff}
.min .bd{visibility:hidden;transition:visibility 0s .3s}
@container (max-height:260px){.hero{bottom:112px}
.sh{height:112px}
.stk{width:96px;height:62px}
.stk .a{transform:translateX(-18px) rotate(-9deg)}
.stk .b{transform:translateX(18px) rotate(8deg)}
.bd p{display:none}
.acts{margin-top:2px}
.acts button{height:30px;padding:0 14px}
}
</style>

<div class="st"><div class="hero" aria-hidden="true"><div class="stk"><i class="a"></i><i class="b"></i><i class="c"></i></div></div><section class="sh" aria-labelledby="ds-t"><button type="button" class="hd" aria-expanded="true" aria-controls="ds-b"><i class="grab" aria-hidden="true"></i><span class="tt"><b id="ds-t">秋日徒步</b><small>10月19日 · 北岭 · 24 张</small></span><span class="hint">收起</span></button><div class="bd" id="ds-b"><p>沿溪谷走了 11 公里，枫叶刚红到半山腰。系统按时间挑了 24 张，配好了 40 秒的回忆短片。</p><div class="acts"><button type="button" class="pri">播放回忆</button><button type="button" class="sec">分享</button></div></div></section><button type="button" class="ctl rp">重播</button><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const hero = root.querySelector('.hero'), sh = root.querySelector('.sh'), hd = root.querySelector('.hd'), bd = root.querySelector('.bd'), hint = root.querySelector('.hint'), say = root.querySelector('.sr');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let p = 0, d = null, dragged = false, tm = [];
  // 位移按当下面板高度算成 px，示例框尺寸变化后要等下一次拖动或点按才重算
  const range = () => sh.offsetHeight - 64;
  const apply = (q, ms) => {
    const r = range(), tr = ms && !still ? `transform ${ms}ms cubic-bezier(.2,.8,.2,1)` : 'none';
    sh.style.transition = hero.style.transition = tr;
    sh.style.transform = `translateY(${r * q}px)`; hero.style.transform = `translateY(${r * q / 2}px) scale(${1 + 0.2 * q})`;
  };
  const snap = (q, quiet, ms = 300) => {
    p = q; apply(q, ms); const min = q === 1;
    sh.classList.toggle('min', min); hd.setAttribute('aria-expanded', String(!min)); hint.textContent = min ? '展开' : '收起'; bd.inert = min;
    if (!quiet) say.textContent = min ? '已收起详情，封面放大' : '已展开详情';
  };
  hd.addEventListener('pointerdown', (e) => { if (e.button > 0) return; dragged = false; d = { y: e.clientY, p0: p, ly: e.clientY, lt: e.timeStamp, v: 0, id: e.pointerId, on: false }; });
  hd.addEventListener('pointermove', (e) => {
    if (!d) return; const dy = e.clientY - d.y;
    if (!d.on) { if (Math.abs(dy) < 4) return; d.on = true; hd.setPointerCapture(d.id); sh.classList.remove('min'); bd.inert = false; }
    d.v = (e.clientY - d.ly) / Math.max(1, e.timeStamp - d.lt); d.ly = e.clientY; d.lt = e.timeStamp;
    p = Math.max(0, Math.min(1, d.p0 + dy / range())); apply(p, 0);
  });
  const up = () => { if (!d) return; const g = d; d = null; if (!g.on) return; dragged = true; snap(g.v > 0.5 ? 1 : g.v < -0.5 ? 0 : p > 0.5 ? 1 : 0); };
  hd.addEventListener('pointerup', up); hd.addEventListener('pointercancel', up);
  hd.addEventListener('click', () => { if (dragged) { dragged = false; return; } snap(p > 0.5 ? 0 : 1); });
  // 自动演示：面板升起 → 模拟往下拖到收起，主角跟着放大
  const play = () => {
    tm.forEach(clearTimeout); tm = []; p = 0; snap(0, true, 0);
    sh.style.transform = 'translateY(100%)'; void sh.offsetWidth; apply(0, 360);
    tm.push(setTimeout(() => { if (root.host.isConnected) snap(1, true, 520); }, still ? 0 : 820));
  };
  root.querySelector('.rp').onclick = play;
  setTimeout(() => { if (root.host.isConnected) play(); }, 100);
}
</script>
