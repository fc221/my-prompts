---
zh: 操作后撤销
en: Undo after action
order: 50
---

## 是什么

删除、归档后先从界面移走，底部出现带倒计时的“撤销”，时间到才真正执行。

## 适合

删除单条记录、归档、移出分组、批量标记等低风险、可恢复的操作，代替“确定要删除吗？”弹窗。

## 不适合

后端不能真正恢复的操作不显示撤销；不可逆、影响范围大的删除改用确认对话框写清数量和后果。

## 注意

唯一的恢复入口不能只放在几秒就消失的提示里，回收站或“最近删除”里也要能找回。

## 要点

- 撤销条在底部居中，文案写清对象：“已删除「设计评审纪要」”+“撤销”。
- 至少保留 10 秒；鼠标悬停或键盘聚焦时暂停倒计时；显示剩余秒数或进度条。
- 被删项先做 200–250ms 的高度收起，下方行跟着上移，不瞬间跳位。
- 撤销后恢复到原位置并高亮约 1 秒；撤销失败要说明真实结果。
- 新的删除发生时，上一条立即生效，撤销条换成新内容，不堆叠多条。
- 删除后焦点移到下一行（没有就上一行），不掉回页面顶部。
- 列表删空时显示空状态和下一步入口。

## 提示词

给{列表}的{删除 / 归档}加「操作后撤销」：点击后该行 200–250ms 收起，底部居中出现撤销条“已删除「{名称}」 撤销”，保留 10 秒并显示剩余时间，悬停或聚焦时暂停；时间到才真正调用删除接口；点撤销恢复到原位置并高亮一下；连续删除时上一条直接生效；删除后焦点移到相邻行；后端无法恢复时不显示撤销，改用确认对话框。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:12px 16px}
.list{list-style:none;margin:0 auto;padding:0;max-width:460px;background:#fff;border:1px solid #e3e6eb;border-radius:12px;overflow:hidden}
.list li{display:grid;grid-template-rows:1fr;transition:grid-template-rows .24s cubic-bezier(.2,0,0,1),opacity .16s}
.list li>div{min-height:0;overflow:hidden}
.row{display:flex;align-items:center;gap:10px;height:34px;padding:0 6px 0 12px;border-top:1px solid #e3e6eb}
.list li:first-child .row{border-top:0}
.row b{flex:1;min-width:0;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.row small{color:#5b616e;font-size:12px;font-variant-numeric:tabular-nums}
.del{height:26px;padding:0 8px;border:0;border-radius:6px;background:none;color:#5b616e}
.del:hover{background:#f5f6f8;color:#1f2329}
.list li.out{grid-template-rows:0fr;opacity:0}
.list li.flash .row{animation:fl 1.2s}
@keyframes fl{from{background:#edf1ff}
}
.bar{position:absolute;left:50%;bottom:12px;display:flex;align-items:center;gap:10px;max-width:calc(100% - 32px);height:38px;padding:0 8px 0 14px;border-radius:10px;background:#1f2329;color:#fff;box-shadow:0 6px 20px rgba(31,35,41,.24);overflow:hidden;white-space:nowrap;transform:translateX(-50%);animation:up .24s cubic-bezier(0,0,.2,1)}
@keyframes up{from{opacity:0;transform:translate(-50%,12px)}
}
.bar :focus-visible{outline-color:#a9bbff}
.txt{min-width:0;overflow:hidden;text-overflow:ellipsis}
.undo{flex:none;height:28px;padding:0 8px;border:0;border-radius:6px;background:none;color:#a9bbff;font-weight:600}
.undo:hover{background:rgba(255,255,255,.1)}
.sec{flex:none;min-width:30px;color:#aab0bb;font-size:12px;font-variant-numeric:tabular-nums}
.prog{position:absolute;left:0;bottom:0;width:100%;height:2px;background:#a9bbff;transform-origin:left}
.empty{margin:44px 0 0;text-align:center;color:#5b616e}
.reset{height:30px;margin-left:10px;padding:0 12px;border:1px solid #e3e6eb;border-radius:8px;background:#fff}
@media (prefers-reduced-motion:reduce){.prog{display:none}
}
@container (min-width:560px){.st{padding:24px}
.row{height:44px;padding-left:16px}
.bar{bottom:20px}
}
</style>

<div class="st"><ul class="list"></ul><p class="empty" hidden>列表已清空<button type="button" class="reset">恢复示例</button></p><div class="bar" hidden><span class="txt" role="status"></span><button type="button" class="undo">撤销</button><span class="sec" aria-hidden="true"></span><i class="prog" aria-hidden="true"></i></div></div>

<script type="module">
export default function demo(root) {
  const D = [['设计评审纪要', '10-24'], ['Q4 预算草案', '10-23'], ['客户访谈录音', '10-22'], ['竞品功能对比', '10-20']];
  const list = root.querySelector('.list'), bar = root.querySelector('.bar'), undo = root.querySelector('.undo'), txt = root.querySelector('.txt'), sec = root.querySelector('.sec'), prog = root.querySelector('.prog'), empty = root.querySelector('.empty');
  const DUR = 10000; let pending = null, left = 0, last = 0, paused = false, raf = 0;
  const sync = () => { list.hidden = !list.children.length; empty.hidden = !list.hidden; };
  const commit = () => { // 时间到或被新的删除顶掉：真正执行删除（示例里只是收起撤销条）
    pending = null; cancelAnimationFrame(raf);
    if (bar.contains(root.activeElement)) (list.querySelector('.del') || root.querySelector('.reset')).focus({ preventScroll: true });
    bar.hidden = true;
  };
  const tick = (t) => {
    if (!root.host.isConnected || !pending) return;
    if (!paused) left -= t - last; last = t;
    if (left <= 0) return commit();
    sec.textContent = Math.ceil(left / 1000) + ' 秒'; prog.style.transform = `scaleX(${left / DUR})`;
    raf = requestAnimationFrame(tick);
  };
  const remove = (li) => {
    if (pending) commit();
    const index = [...list.children].indexOf(li), hadFocus = root.activeElement === li.querySelector('.del');
    const next = li.nextElementSibling || li.previousElementSibling;
    li.classList.add('out');
    setTimeout(() => { if (li.classList.contains('out')) { li.remove(); li.classList.remove('out'); sync(); } }, 240);
    pending = { li, index }; txt.textContent = `已删除「${li.querySelector('b').textContent}」`;
    left = DUR; paused = false; bar.hidden = false; last = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(tick);
    if (hadFocus) (next ? next.querySelector('.del') : undo).focus({ preventScroll: true });
  };
  const row = ([name, date]) => {
    const li = document.createElement('li');
    li.innerHTML = `<div><div class="row"><b>${name}</b><small>${date}</small><button type="button" class="del" aria-label="删除 ${name}">删除</button></div></div>`;
    li.querySelector('.del').onclick = () => remove(li); return li;
  };
  const reset = () => { commit(); list.replaceChildren(...D.map(row)); sync(); };
  undo.onclick = () => {
    if (!pending) return;
    const { li, index } = pending, hadFocus = root.activeElement === undo; pending = null; cancelAnimationFrame(raf); bar.hidden = true;
    li.classList.add('out'); list.insertBefore(li, list.children[index] || null); sync();
    void li.offsetWidth; li.classList.remove('out'); li.classList.add('flash');
    setTimeout(() => li.classList.remove('flash'), 1200);
    if (hadFocus) li.querySelector('.del').focus({ preventScroll: true });
  };
  ['pointerenter', 'focusin'].forEach((t) => bar.addEventListener(t, () => { paused = true; }));
  ['pointerleave', 'focusout'].forEach((t) => bar.addEventListener(t, () => { paused = false; }));
  root.querySelector('.reset').onclick = reset;
  reset(); remove(list.children[1]);
}
</script>
