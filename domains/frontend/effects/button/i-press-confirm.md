---
zh: 按下态与触感确认
en: Press acknowledgement
order: 30
of: press-spring
tab: 触感确认
---

## 是什么

手指一按下按钮就变深、微缩，松手立刻切到新状态；支持的设备再给一下极短的震动。不用看也知道点到了，不会忍不住再点一次。

## 适合

关注、点赞、加购、打卡、开关这类高频、结果立刻可见的点按，尤其是手指会挡住按钮的拇指操作。

## 不适合

提交表单、支付这类要等结果的操作，按下态之后接加载状态和防重复提交，不能用震动表示成功；滚动、输入、普通导航不震。

## 注意

震动只是补充：网页里只有部分安卓浏览器支持 navigator.vibrate，iOS 网页不支持，所以按下态本身必须足够明显。和“按压回弹”的区别：这条讲的是确认链路（按下态、结果态、触感、连点保护），不是装饰动效。

## 要点

- 按下（pointerdown）的同一帧给按下态：背景加深一档并缩到 0.97，不等松手、不等接口
- 按钮设 touch-action: manipulation，去掉移动端的双击缩放延迟
- 松手立即切到结果态（“已订阅”），文字和图标同时变，不只靠颜色
- 支持时在状态切换那一刻轻震 8–12ms（网页 navigator.vibrate(10)，小程序用短振动的轻档，原生用系统轻触反馈），每次切换只震一次
- 切换后 500ms 内的重复点按忽略，避免手快连点又切回去；想取消就再点一次
- 手指会挡住按钮：在按钮外同时给一个看得见的变化（计数加一、头像角标变勾）
- 减少动态效果时不缩放，只换颜色和文字；系统关闭触感时不震

## 提示词

给{页面}的{高频按钮}做「按下态与触感确认」：pointerdown 的同一帧背景加深一档并缩到 0.97，按钮设 touch-action: manipulation；松手立即切到结果态（如“{结果文案}”），文字和图标同时变；支持时在切换那一刻轻震 10ms（网页用 navigator.vibrate，小程序用短振动轻档），其它操作不震；切换后 500ms 内的重复点按忽略；按钮外同步给一个看得见的变化（{计数或角标}）；减少动态效果时不缩放，只换颜色和文字。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:10px 14px}
.box{max-width:440px;height:100%;margin:0 auto;display:grid;align-content:center;gap:8px}
.card{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid #e3e6eb;border-radius:14px;background:#fff}
.av{position:relative;display:grid;place-items:center;flex:none;width:40px;height:40px;border-radius:50%;background:#e0e7ff;color:#3538cd;font-weight:700}
.ok{position:absolute;right:-3px;bottom:-3px;display:grid;place-items:center;width:16px;height:16px;border:2px solid #fff;border-radius:50%;background:#12b76a;color:#fff;font-size:9px;font-style:normal;transform:scale(0);transition:transform .2s cubic-bezier(.34,1.56,.64,1)}
.on .ok{transform:none}
.who{flex:1;min-width:0;display:grid}
.who b{font-size:14px}
.who small{color:#667085;font-size:12px;font-variant-numeric:tabular-nums}
.fol{flex:none;min-width:88px;height:40px;padding:0 16px;border:0;border-radius:20px;background:#101828;color:#fff;font-weight:600;touch-action:manipulation;transition:transform .08s,background-color .08s}
.fol.down{background:#344054;transform:scale(.97)}
.fol[aria-pressed=true]{background:#ecfdf3;color:#067647;box-shadow:inset 0 0 0 1px #abefc6}
.fol[aria-pressed=true].down{background:#d1fadf}
.ch{display:grid;gap:4px;margin:0;padding:8px 12px;border-radius:12px;background:#fff;list-style:none;align-content:center}
.ch li{display:flex;align-items:center;gap:8px;font-size:12px;color:#344054}
.ch em{margin-left:auto;color:#98a2b3;font-style:normal}
.ch li.y em{color:#067647;font-weight:600}
.d{flex:none;width:8px;height:8px;border-radius:50%;background:#d0d5dd}
.y .d{background:#12b76a}
.ft{display:flex;justify-content:flex-end}
.ft .ctl{height:28px;padding:0 10px;font-size:12px}
@media (prefers-reduced-motion:reduce){.fol.down{transform:none}
}
@container (max-height:200px){.ch{padding:4px 12px;gap:0}
}
</style>

<div class="st"><div class="box"><div class="card"><span class="av" aria-hidden="true">林<i class="ok">✓</i></span><div class="who"><b>林知远</b><small>订阅 <span class="fans">1,280</span></small></div><button type="button" class="fol" aria-pressed="false">＋ 订阅</button></div><ul class="ch"><li><i class="d"></i>看得见的按下态<em>等待按下</em></li><li><i class="d"></i>摸得到的触感<em>—</em></li><li><i class="d"></i>连点保护<em>未触发</em></li></ul><div class="ft"><button type="button" class="ctl dbl">模拟连点两下</button></div><p class="sr" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const b = root.querySelector('.fol'), card = root.querySelector('.card'), fans = root.querySelector('.fans'), say = root.querySelector('[role=status]'), rows = [...root.querySelectorAll('.ch li')];
  let on = false, lock = 0, ignored = 0;
  const mark = (i, text) => { rows[i].classList.add('y'); rows[i].querySelector('em').textContent = text; };
  const down = () => { b.classList.add('down'); mark(0, '按下即变深'); };
  const up = () => b.classList.remove('down');
  b.addEventListener('pointerdown', down); ['pointerup', 'pointercancel', 'pointerleave'].forEach((t) => b.addEventListener(t, up));
  b.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') down(); }); b.addEventListener('keyup', up);
  b.addEventListener('click', (e) => {
    const now = performance.now();
    if (now < lock) { ignored++; mark(2, `已忽略 ${ignored} 次连点`); return; }
    on = !on; lock = now + 500;
    b.setAttribute('aria-pressed', String(on)); b.textContent = on ? '✓ 已订阅' : '＋ 订阅';
    card.classList.toggle('on', on); fans.textContent = (1280 + (on ? 1 : 0)).toLocaleString('en-US');
    // 只有真人点击才震（浏览器也要求有用户手势）
    const buzz = e.isTrusted && typeof navigator.vibrate === 'function' && navigator.vibrate(10);
    mark(1, buzz ? '已轻震 10ms' : '此设备不支持，靠按下态');
    say.textContent = on ? '已订阅林知远' : '已取消订阅';
  });
  const press = () => { down(); setTimeout(() => { b.click(); up(); }, 120); };
  root.querySelector('.dbl').addEventListener('click', () => { press(); setTimeout(press, 260); });
  setTimeout(press, 500);
}
</script>
