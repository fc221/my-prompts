---
zh: 进度按钮
en: Progress button
order: 45
---

## 是什么

点了上传、导出之后，按钮本身变成进度条：底色从左往右按真实进度填满，文字显示百分比；完成后变成成功态，失败时停在当前进度、改成重试。

## 适合

上传、导出、同步这类几秒到几十秒、能拿到真实进度、做完还停留在当前页的操作。

## 不适合

一两秒内结束的提交用「提交按钮变形」；分好几个阶段、要说清在做哪一步的长任务用「按实际步骤报进度」。

## 要点

- 进度来自真实数据（已传字节、已处理条数）；拿不到总量时用来回扫动的不确定进度，不显示百分比。
- 文字叠两层：底层深色字、上层白字；填充层和上层白字用同一个 clip-path: inset 按进度裁切、同样的过渡，边界始终对齐，任何进度下文字都看得清。
- 按钮宽度固定，“上传 3 个文件”“上传中 45%”“已上传”换来换去不改变宽度。
- 进行中按钮设 aria-disabled，不能重复触发（见「防重复提交」）；旁边给“取消”。
- 读屏：每走过 25% 在 role="status" 里播报一次，完成和失败各播报一次。
- 完成后填充换成功色并带对勾，停留约 1.5 秒再恢复，或直接变成下一步动作（如“查看”）。
- 失败：填充换危险色，保留已完成的部分，文字改成“失败，重试”。
- 波浪形的液体填充只是装饰变体，波高 4–6px；减少动态效果时用平直填充。

## 提示词

把{上传 / 导出按钮}做成「进度按钮」：按钮宽度固定；点按后按钮内的填充层从左往右按真实进度推进，文字改为“{动作}中 N%”；文字做两层，深色层在下、白色层在上，填充层和白色字层用同一个 clip-path: inset(0 calc(100% - 进度) 0 0) 裁切并用同样的过渡，边界始终对齐；拿不到总量时改为来回扫动的不确定进度、不显示百分比；进行中 aria-disabled 并在旁边提供“取消”；每过 25% 用 role="status" 播报一次；完成后填充变成功色加对勾，文字“已{动作}”，1.5 秒后恢复或变成“查看”；失败时填充变危险色、保留已完成部分，文字“失败，重试”；减少动态效果时去掉填充过渡，只按进度直接更新。

## 示例

<style>
.s{height:100%;display:grid;place-content:center;justify-items:center;gap:10px;padding:12px;background:#f6f7f9;color:#1f2329;font:14px/1.4 system-ui,"PingFang SC",sans-serif}
.row{display:flex;align-items:center;gap:10px}
.pb{--p:0%;position:relative;color:#1f2329;isolation:isolate;overflow:hidden;width:176px;height:42px;padding:0;border:1.5px solid #c9ced6;border-radius:10px;background:#fff;font:inherit;font-weight:600;cursor:pointer}
.pb:focus-visible{outline:2px solid #3a5ccc;outline-offset:3px}
.pb[aria-disabled="true"]{cursor:progress}
/* 填充层和上层白字用同一个裁切、同样的过渡，边界始终对齐 */
.fill,.t.up{clip-path:inset(0 calc(100% - var(--p)) 0 0);transition:clip-path .18s linear,background-color .2s}
.fill{position:absolute;inset:0;z-index:-1;background:#3a5ccc}
.t{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:6px;white-space:nowrap;font-variant-numeric:tabular-nums}
.t.up{color:#fff}
.t svg{display:none}
.pb.done{border-color:#12805c}
.pb.done .fill{background:#12805c}
.pb.done .t svg{display:block}
.no{height:30px;padding:0 10px;border:0;border-radius:8px;background:none;color:#5b616e;font:inherit;font-size:13px;cursor:pointer}
.no:focus-visible{outline:2px solid #3a5ccc;outline-offset:2px}
.no.off{visibility:hidden}
.msg{margin:0;min-height:18px;font-size:12px;color:#5b616e}
@media (prefers-reduced-motion:reduce){.fill,.t.up{transition:none}
}
</style>

<div class="s">
  <div class="row">
    <button type="button" class="pb"><span class="fill"></span><span class="t dn"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 7.5 6 10.5 11 4"/></svg><b></b></span><span class="t up" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7.5 6 10.5 11 4"/></svg><b></b></span></button>
    <button type="button" class="no off">取消</button>
  </div>
  <p class="msg" role="status"></p>
</div>

<script type="module">
export default function demo(root) {
  const pb = root.querySelector('.pb'), no = root.querySelector('.no'), msg = root.querySelector('.msg');
  const labels = root.querySelectorAll('.t b');
  let p = 0, timer = 0, said = 0;
  const text = (s) => labels.forEach((b) => (b.textContent = s));
  const show = () => { pb.style.setProperty('--p', p + '%'); };
  const idle = () => { clearTimeout(timer); p = 0; said = 0; show(); pb.classList.remove('done'); pb.removeAttribute('aria-disabled'); no.classList.add('off'); text('上传 3 个文件'); };
  // 模拟真实上传：每次前进的量和间隔都不均匀，偶尔停一下
  const tick = () => {
    p = Math.min(100, p + 3 + Math.round(Math.random() * 11));
    show(); text(p < 100 ? `上传中 ${p}%` : '已上传');
    if (Math.floor(p / 25) > said && p < 100) { said = Math.floor(p / 25); msg.textContent = `已上传 ${said * 25}%`; }
    if (p >= 100) { pb.classList.add('done'); pb.removeAttribute('aria-disabled'); no.classList.add('off'); msg.textContent = '3 个文件已上传'; return; }
    timer = setTimeout(tick, Math.random() < 0.15 ? 420 : 140);
  };
  const start = () => { idle(); pb.setAttribute('aria-disabled', 'true'); no.classList.remove('off'); msg.textContent = '开始上传'; text('上传中 0%'); timer = setTimeout(tick, 160); };
  pb.addEventListener('click', () => { if (pb.getAttribute('aria-disabled') === 'true') return; if (pb.classList.contains('done')) idle(); else start(); });
  no.addEventListener('click', () => { idle(); msg.textContent = '已取消上传'; pb.focus(); });
  idle();
  setTimeout(() => root.host.isConnected && start(), 400);
}
</script>
