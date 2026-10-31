---
zh: 完成反馈与勾选联动
en: Completion feedback
order: 20
---

## 是什么

勾选一项后，进度环、完成数和状态标签在同一帧一起变化，全部完成时给一次轻反馈。

## 适合

待办、任务清单、学习打卡、新手引导步骤这类“完成一项就离目标更近”的场景。

## 不适合

每天操作上百次的勾选（如表格多选）不加动效，只做即时状态变化。

## 注意

汇总和原位状态同帧开始变化，不等接口返回；失败时全部回滚并说明原因。

## 要点

- 点击后原位立即变化（打勾、划线、文字变灰），不等接口返回。
- 相关汇总（进度环、完成数、标题状态）同一帧开始过渡，时长 300–400ms，缓出曲线。
- 进度环用 stroke-dashoffset 过渡；数字用等宽数字，变化时不挤动旁边的元素。
- 全部完成时切到成功色，加一次不超过 400ms 的轻微回弹；不放满屏彩带。
- 接口失败：勾选和所有汇总一起回滚，在该行旁说明“没保存上”并给重试。
- 进度变化用 role="status" 播报，如“还剩 1 项”。
- 减少动态效果时直接切到终态，不做回弹。

## 提示词

给{待办列表}做「完成反馈与勾选联动」：勾选一项后原位立即打勾并划线，{进度环}、{完成数}和{标题状态}在同一帧开始变化（300–400ms 缓出），数字用等宽字体；全部完成时进度环变成功色并轻微回弹一次；接口失败时勾选和所有汇总一起回滚，并在该行说明原因和重试；用 role="status" 播报进度；减少动态效果时直接显示终态。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;place-items:center;padding:12px}
.card{display:flex;align-items:center;gap:20px;width:100%;max-width:420px;background:#fff;border:1px solid #e3e6eb;border-radius:12px;padding:12px 16px}
.ring{position:relative;flex:none;width:84px;height:84px}
.ring svg{width:100%;height:100%;transform:rotate(-90deg)}
.ring circle{fill:none;stroke-width:7}
.bg{stroke:#edf1ff}
.fg{stroke:#3b5bdb;stroke-linecap:round;stroke-dasharray:213.6;stroke-dashoffset:213.6;transition:stroke-dashoffset .4s cubic-bezier(.2,0,0,1),stroke .24s}
.n{position:absolute;inset:0;display:grid;place-items:center;font-size:20px;font-weight:600;font-variant-numeric:tabular-nums}
.n small{font-size:12px;font-weight:400;color:#5b616e}
.main{flex:1;min-width:0}
.hd{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:2px}
.pill{flex:none;padding:0 8px;border-radius:999px;background:#edf1ff;color:#3b5bdb;font-size:12px;line-height:22px;transition:background .24s,color .24s}
ul{list-style:none;margin:0;padding:0}
label{display:flex;align-items:center;gap:8px;height:28px;cursor:pointer}
input{flex:none;width:16px;height:16px;margin:0;accent-color:#3b5bdb}
label span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;transition:color .2s}
input:checked+span{color:#5b616e;text-decoration:line-through}
.done .fg{stroke:#12805c}
.done .pill{background:#e6f4ee;color:#12805c}
.done .n{animation:pop .4s cubic-bezier(.34,1.4,.64,1)}
@keyframes pop{50%{transform:scale(1.12)}
}
@container (min-width:560px){.card{max-width:500px;gap:32px;padding:24px 28px}
.ring{width:120px;height:120px}
.n{font-size:26px}
label{height:36px;font-size:14px}
}
</style>

<div class="st"><div class="card"><div class="ring"><svg viewBox="0 0 80 80" aria-hidden="true"><circle class="bg" cx="40" cy="40" r="34"/><circle class="fg" cx="40" cy="40" r="34"/></svg><b class="n"><span><span class="d">2</span><small>/4</small></span></b></div><div class="main"><div class="hd"><strong>今日待办</strong><span class="pill" role="status">还剩 2 项</span></div><ul><li><label><input type="checkbox" checked><span>回复客户邮件</span></label></li><li><label><input type="checkbox" checked><span>审核 3 张报销单</span></label></li><li><label><input type="checkbox"><span>更新周报数据</span></label></li><li><label><input type="checkbox"><span>确认下周排期</span></label></li></ul></div></div></div>

<script type="module">
export default function demo(root) {
  const boxes = [...root.querySelectorAll('input')], fg = root.querySelector('.fg'), d = root.querySelector('.d'), pill = root.querySelector('.pill'), card = root.querySelector('.card'), C = 213.6;
  const sync = () => {
    const n = boxes.filter((b) => b.checked).length, all = n === boxes.length;
    fg.style.strokeDashoffset = C * (1 - n / boxes.length); fg.style.opacity = n ? 1 : 0;
    d.textContent = n; pill.textContent = all ? '全部完成' : `还剩 ${boxes.length - n} 项`;
    card.classList.toggle('done', all);
  };
  boxes.forEach((b) => b.addEventListener('change', sync));
  requestAnimationFrame(sync);
}
</script>
