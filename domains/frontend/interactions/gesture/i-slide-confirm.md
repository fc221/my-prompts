---
zh: 滑到头才执行
en: Slide to commit
order: 120
of: i-hold-confirm
tab: 滑到头
---

## 是什么

一条圆角轨道里放一个圆钮，要把圆钮拖到轨道尽头才执行；没到头就松手，圆钮弹回起点。比普通按钮多一步，又比弹确认框轻。

## 适合

确认收货、开锁并开始计费、结束一次行程、把任务下发出去这类手机上单手完成、点错了有点麻烦但还能补救的操作。

## 不适合

要把后果写清楚的高风险操作用确认对话框；桌面端以鼠标为主时用「按住确认」或普通按钮。

## 注意

只认水平拖动：轨道设 touch-action: pan-y，竖着划仍然滚动页面；判定看圆钮走了多远，不看手指在哪。

## 要点

- 轨道高 52–56px、全圆角，圆钮比轨道小 8px；圆钮只沿水平方向跟手，不加过渡，拖过头就停在尽头。
- 圆钮走过可移动距离的 85% 时松手才执行，否则 260ms 弹回起点；弹回用 ease-out，不来回晃。
- 到头后圆钮锁住，轨道变成功色，文字换成结果（如“已确认收货”）；提交失败时轨道恢复原样并写原因。
- 轨道里的提示文字带一道缓慢扫过的高光（做法同「文字上的扫光」），拖动时随进度淡出。
- 圆钮本身是按钮：点按、Enter 或空格一次进入“再按一次确认”状态，4 秒内再按一次执行，超时恢复；键盘、读屏、开关控制都走这条路。
- 状态变化用 role="status" 播报；减少动态效果时没有高光，弹回直接到位。

## 提示词

给{操作，如 确认收货}做「滑到头才执行」：高 54px 的全圆角轨道，左端一个比轨道小 8px 的圆钮，轨道里居中写“向右滑动，{动作}”并带一道缓慢扫过的高光；圆钮只沿水平方向跟手，轨道设 touch-action: pan-y，已划过的部分用浅一档的强调色填充，提示文字随进度淡出；圆钮走过可移动距离的 85% 时松手才执行，否则 260ms ease-out 弹回起点；到头后圆钮锁住、轨道变成功色、文字换成结果，提交失败时恢复并写原因；圆钮是按钮，点按或 Enter / 空格进入“再按一次确认”，4 秒内再按执行；用 role="status" 播报；减少动态效果时去掉高光、弹回直接到位。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;place-items:center;padding:12px 16px}
.box{width:100%;max-width:360px;display:grid;gap:10px}
.od{display:flex;align-items:center;gap:10px;min-width:0;padding:10px 12px;border:1px solid #e3e6eb;border-radius:12px;background:#fff}
.pk{flex:none;width:36px;height:36px;border-radius:9px;background:linear-gradient(135deg,#ffe0b3,#f0a35c)}
.od span{min-width:0}
.od b,.od small{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.od small{color:#5b616e;font-size:12px}
.tr{position:relative;height:54px;border-radius:999px;background:#e8edfb;touch-action:pan-y;user-select:none;-webkit-user-select:none;transition:background-color .2s}
.fill{position:absolute;left:0;top:0;bottom:0;width:calc(var(--x,0px) + 54px);border-radius:999px;background:#ccd8fb}
.lb{position:absolute;inset:0;display:grid;place-items:center;padding:0 14px 0 58px;color:#2f4fc4;font-weight:600;white-space:nowrap;opacity:calc(1 - var(--p,0) * 1.6)}
.kn{position:absolute;left:4px;top:4px;display:grid;place-items:center;width:46px;height:46px;padding:0;border:0;border-radius:50%;background:#3b5bdb;color:#fff;box-shadow:0 2px 6px rgba(30,50,120,.3);transform:translateX(var(--x,0px));touch-action:none;cursor:grab}
.kn svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
.back .kn{transition:transform .26s cubic-bezier(.2,.8,.2,1)}
.back .fill{transition:width .26s cubic-bezier(.2,.8,.2,1)}
.armed .tr{background:#dfe6fd}
.done .tr{background:#12805c}
.done .fill{background:#12805c}
.done .lb{opacity:1;color:#fff}
.done .kn{background:#fff;color:#12805c;cursor:default}
.msg{min-height:18px;margin:0;color:#5b616e;font-size:12px;text-align:center}
@media (prefers-reduced-motion:no-preference){.lb{background:linear-gradient(100deg,#2f4fc4 42%,#9fb2f5 50%,#2f4fc4 58%) 0 0/260% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:shine 2.6s linear infinite}
.done .lb,.armed .lb{animation:none;background:none;color:#2f4fc4}
.done .lb{color:#fff}
}
@keyframes shine{from{background-position:100% 0}to{background-position:0 0}
}
@container (max-height:200px){.box{gap:8px}
.od{padding:8px 10px}
}
</style>

<div class="st"><div class="box">
  <div class="od"><i class="pk" aria-hidden="true"></i><span><b>3 件商品 · ¥268.00</b><small>已签收 · 确认后货款打给商家</small></span></div>
  <div class="tr"><i class="fill" aria-hidden="true"></i><span class="lb" aria-hidden="true">向右滑动，确认收货</span><button type="button" class="kn" aria-label="确认收货：拖到右端，或连按两次"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button></div>
  <p class="msg" role="status"></p>
</div></div>

<script type="module">
export default function demo(root) {
  const box = root.querySelector('.box'), tr = root.querySelector('.tr'), kn = root.querySelector('.kn'), lb = root.querySelector('.lb'), msg = root.querySelector('.msg');
  const LABEL = lb.textContent, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let x = 0, max = 0, from = 0, drag = false, moved = false, armed = 0, done = false;
  const set = (v) => { x = Math.max(0, Math.min(max, v)); tr.style.setProperty('--x', x + 'px'); tr.style.setProperty('--p', max ? x / max : 0); };
  const measure = () => { max = tr.clientWidth - kn.offsetWidth - 8; };
  const back = () => { box.classList.add('back'); set(0); setTimeout(() => box.classList.remove('back'), 280); };
  const disarm = () => { clearTimeout(armed); armed = 0; box.classList.remove('armed'); lb.textContent = LABEL; };
  const finish = () => {
    disarm(); done = true; measure(); set(max); box.classList.add('done'); lb.textContent = '已确认收货';
    kn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'; kn.setAttribute('aria-label', '已确认收货');
    msg.textContent = '已确认收货 '; const r = document.createElement('button'); r.type = 'button'; r.className = 'ctl'; r.textContent = '重置示例'; r.onclick = reset; msg.append(r);
  };
  const reset = () => {
    done = false; box.classList.remove('done'); lb.textContent = LABEL; set(0); msg.textContent = '';
    kn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>'; kn.setAttribute('aria-label', '确认收货：拖到右端，或连按两次'); kn.focus();
  };
  kn.addEventListener('pointerdown', (e) => { if (done || e.button > 0) return; measure(); drag = true; moved = false; from = e.clientX - x; kn.setPointerCapture(e.pointerId); box.classList.remove('back'); });
  kn.addEventListener('pointermove', (e) => { if (!drag) return; const v = e.clientX - from; if (Math.abs(v) > 3) moved = true; if (moved) { disarm(); set(v); } });
  kn.addEventListener('pointerup', () => { if (!drag) return; drag = false; if (!moved) return; if (x >= max * 0.85) finish(); else { back(); msg.textContent = '没滑到头，未确认'; } });
  kn.addEventListener('pointercancel', () => { if (drag) { drag = false; back(); } });
  // 点按 / Enter / 空格：先进入“再按一次确认”，4 秒内再按才执行
  kn.addEventListener('click', () => {
    if (done) return; if (moved) { moved = false; return; }
    if (armed) return finish();
    box.classList.add('armed'); lb.textContent = '再按一次确认收货'; msg.textContent = '4 秒内再按一次确认';
    armed = setTimeout(() => { disarm(); msg.textContent = ''; }, 4000);
  });
  kn.addEventListener('keydown', (e) => { if (e.key === 'Escape' && armed) { disarm(); msg.textContent = '已取消'; } });
  // 挂载后演示一次：滑到一半松手弹回
  if (!still) setTimeout(() => { if (!root.host.isConnected || drag || done) return; measure(); box.classList.add('back'); set(max * 0.55); setTimeout(() => { if (root.host.isConnected && !drag && !done) back(); }, 700); }, 500);
}
</script>
