---
zh: 进度条
en: Progress bar
order: 30
---

## 是什么

一条横向的进度槽，按真实进度填满，旁边写着百分比和已完成的量。

## 适合

上传、导出、导入、批量处理等能算出进度的任务；拿不到百分比的长任务只有 Element Plus 有不确定样式，另外两家用「加载指示」加阶段文字。

## 不适合

1 秒内完成的操作不用；不知道进度时不编数字；页面切换用「顶部加载条」。

## 要点

- 用组件库的进度条：Element Plus el-progress（percentage、status="success" / "exception"、format、indeterminate）、Naive UI n-progress（percentage、status="success" / "error"、unit、indicator-placement）、Ant Design Vue a-progress（percent、status="success" / "exception"、format）；高度、圆角、颜色用组件默认，全站一致
- 数值和进度条一起显示，用 format（Element Plus、Ant Design Vue）或默认插槽（Naive UI）写成“62% · 12.4 / 20 MB”；长任务加剩余时间和“取消”
- 按真实字节或完成步骤推进，不倒退，不先冲到 90% 再停很久；进度来自后端事件，不用计时器编
- 完成：status 切成功态，随后换成结果（文件名、下载链接）；失败：status 切异常态，旁边写原因和“重试”，已完成的部分保留
- 拿不到百分比：只有 Element Plus 有 indeterminate；Naive UI 的 processing、Ant Design Vue 的 status="active" 只是在已知百分比上加流动动画，不是不确定态。这两家改用「加载指示」加阶段文字（“正在解析…”）或已用时间，不编数字
- 超过 10 秒的任务允许取消或转到后台，完成后用通知告知；多步骤任务见「按实际步骤报进度」

## 提示词

为{上传 / 导出 / 批量处理}做进度条：用项目组件库自带的进度条（Element Plus el-progress :percentage + status；Naive UI n-progress :percentage + status；Ant Design Vue a-progress :percent + status），不手写，高度和颜色用默认值。旁边用 format 或默认插槽显示“62% · 12.4 / 20 MB”和剩余时间，带“取消”；按后端真实进度推进，不倒退、不在 99% 久停；完成时 status 切成功态并替换为结果，失败时 status 切异常态（Element Plus、Ant Design Vue 用 exception，Naive UI 用 error）并写原因和重试；拿不到百分比时 Element Plus 用 indeterminate 加阶段文字，Naive UI 和 Ant Design Vue 改用加载指示加阶段文字或已用时间，不编数字；超过 10 秒允许转后台，完成后通知。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{padding:12px}
.box{width:100%;max-width:440px;padding:14px 16px;background:#fff;border:1px solid #e3e6eb;border-radius:10px;display:grid;gap:14px}
.f{display:grid;gap:6px}
.r{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:28px;font-size:13px}
.r b{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pct,.sz,.el{font-variant-numeric:tabular-nums}
.bar{height:6px;border-radius:3px;background:#eceef2;overflow:hidden}
.bar i{display:block;width:0;height:100%;border-radius:3px;background:#3b5bdb;transition:width .25s linear}
.bar.ok i{background:#12805c}
.ind i{width:36%;animation:ind 1.4s cubic-bezier(.45,0,.55,1) infinite}
@keyframes ind{from{transform:translateX(-100%)}
to{transform:translateX(280%)}
}
@media (prefers-reduced-motion:reduce){.ind i{animation-duration:2.8s}
}
</style>

<div class="s"><div class="box"><div class="f"><div class="r"><b>演示视频.mp4</b><span class="muted pct">等待上传</span></div><div class="bar" role="progressbar" aria-label="演示视频.mp4 上传进度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i></i></div><div class="r"><span class="muted sz">0.0 / 20 MB</span><button class="b t sm go">开始上传</button></div></div><div class="f"><div class="r"><b>整理素材</b><span class="muted el">正在解析… 已用 0 秒</span></div><div class="bar ind" role="progressbar" aria-label="整理素材，进度未知"><i></i></div></div></div></div>

<script type="module">
export default function demo(root) {
  const bar = root.querySelector('.bar'), fill = bar.querySelector('i'), pct = root.querySelector('.pct'), sz = root.querySelector('.sz'), go = root.querySelector('.go'), el = root.querySelector('.el'); let v = 0, tm = 0, sec = 0;
  const draw = () => { fill.style.width = v + '%'; bar.setAttribute('aria-valuenow', Math.round(v)); pct.textContent = v >= 100 ? '上传完成' : Math.round(v) + '%'; sz.textContent = (v / 5).toFixed(1) + ' / 20 MB'; };
  const step = () => { if (!root.host.isConnected) return; v = Math.min(100, v + 2 + Math.random() * 6); draw(); if (v >= 100) { tm = 0; bar.classList.add('ok'); go.textContent = '重新上传'; } else tm = setTimeout(step, 250); };
  go.addEventListener('click', () => {
    if (tm) { clearTimeout(tm); tm = 0; pct.textContent = '已取消'; go.textContent = '重新上传'; return; }
    v = 0; bar.classList.remove('ok'); go.textContent = '取消'; draw(); tm = setTimeout(step, 250);
  });
  const tick = () => { if (!root.host.isConnected) return; el.textContent = '正在解析… 已用 ' + (++sec) + ' 秒'; setTimeout(tick, 1000); };
  setTimeout(tick, 1000);
}
</script>
