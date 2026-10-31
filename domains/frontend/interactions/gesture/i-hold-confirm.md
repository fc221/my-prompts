---
zh: 按住确认
en: Hold to confirm
order: 110
---

## 是什么

防误触的操作要按住按钮约 1 秒，进度走满才执行，中途松手进度退回。

## 适合

交卷、结束直播、提交打卡、清空草稿等需要防误点、又不至于弹确认框的操作。

## 不适合

不可逆且后果严重的操作（删除账号、清空数据）仍用确认对话框写清后果；高频操作不用。

## 注意

按钮文案直接写“按住 1 秒交卷”，不要让人猜要按多久。

## 要点

- 按住时长 0.8–1.5 秒，进度从左向右填满按钮（或沿边缘画环），走满立即执行。
- 中途松手，进度以约 2.5 倍速度平滑退回，并提示“松手太早，未执行”。
- 键盘按住 Space / Enter 同样生效（忽略按键重复事件），失焦时取消。
- 按住期间按钮设 touch-action: none 并屏蔽长按菜单，防止触发滚动和系统菜单。
- 完成后按钮变成功态（如“已交卷”），并写出结果和时间。
- 填充层上的文字和底色对比 ≥ 4.5:1，填充前后两种状态都核对。
- 手机上的单手确认可以换成「滑到头才执行」。

## 提示词

把{操作按钮}做成「按住确认」：按钮写“按住 1 秒{动作}”，按住时进度从左到右填满按钮，走满立即执行；中途松手进度以 2.5 倍速平滑退回并提示未执行；键盘按住 Space / Enter 同样生效，失焦取消；按住期间屏蔽滚动和长按菜单；完成后按钮变成功态并显示结果；后果严重、不可逆的操作仍用确认对话框。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;place-items:center;padding:12px}
.box{width:100%;max-width:400px;padding:16px;background:#fff;border:1px solid #e3e6eb;border-radius:12px;text-align:center}
.h{display:block;font-size:15px;font-weight:600}
.d{margin:4px 0 12px;color:#5b616e;font-size:12px}
.hold{position:relative;width:200px;max-width:100%;height:40px;overflow:hidden;border:1px solid #3b5bdb;border-radius:999px;background:#edf1ff;color:#3b5bdb;font-weight:600;touch-action:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}
.fill{position:absolute;inset:0;display:grid;place-items:center;background:#3b5bdb;color:#fff;clip-path:inset(0 100% 0 0)}
.hold.done{border-color:#12805c;background:#12805c;color:#fff;cursor:default}
.hold.done .fill{display:none}
.res{min-height:18px;margin:8px 0 0;color:#5b616e;font-size:12px}
.res.ok{color:#12805c}
.res button{padding:0 0 0 6px;border:0;background:none;color:#3b5bdb;font-size:12px}
@container (min-width:560px){.box{max-width:440px;padding:28px}
.hold{width:240px;height:44px}
}
</style>

<div class="st"><div class="box"><b class="h">提前交卷</b><p class="d" id="hold-d">还剩 18 分钟。交卷后不能再修改答案。</p><button class="hold" type="button" aria-describedby="hold-d"><span class="t">按住 1 秒交卷</span><span class="fill" aria-hidden="true"><span class="t">按住 1 秒交卷</span></span></button><p class="res" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const b = root.querySelector('.hold'), fill = root.querySelector('.fill'), res = root.querySelector('.res'), labels = root.querySelectorAll('.t');
  const DUR = 1000, LABEL = labels[0].textContent; let p = 0, holding = false, done = false, last = 0, raf = 0;
  const paint = () => { fill.style.clipPath = `inset(0 ${(1 - p) * 100}% 0 0)`; };
  const finish = () => {
    holding = false; done = true; raf = 0; b.classList.add('done'); labels.forEach((l) => { l.textContent = '已交卷'; });
    res.className = 'res ok'; res.textContent = `已于 ${new Date().toTimeString().slice(0, 5)} 交卷 `;
    const r = document.createElement('button'); r.type = 'button'; r.textContent = '重置示例'; r.onclick = reset; res.append(r);
  };
  const loop = (t) => {
    if (!root.host.isConnected) return;
    const dt = t - last; last = t;
    p = Math.max(0, Math.min(1, p + (holding ? dt / DUR : -dt / (DUR / 2.5)))); paint(); // 松手后 2.5 倍速退回
    if (p >= 1) return finish();
    raf = holding || p > 0 ? requestAnimationFrame(loop) : 0;
  };
  const start = () => { if (done || holding) return; holding = true; res.className = 'res'; res.textContent = '继续按住…'; if (!raf) { last = performance.now(); raf = requestAnimationFrame(loop); } };
  const stop = () => { if (!holding) return; holding = false; if (p < 1) res.textContent = '松手太早，未交卷'; };
  const reset = () => { done = false; p = 0; paint(); b.classList.remove('done'); labels.forEach((l) => { l.textContent = LABEL; }); res.className = 'res'; res.textContent = ''; b.focus(); };
  b.addEventListener('pointerdown', (e) => { if (e.button > 0) return; b.setPointerCapture(e.pointerId); start(); });
  b.addEventListener('pointerup', stop); b.addEventListener('pointercancel', stop); b.addEventListener('blur', stop);
  b.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!e.repeat) start(); } });
  b.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') stop(); });
  b.addEventListener('contextmenu', (e) => e.preventDefault());
}
</script>
