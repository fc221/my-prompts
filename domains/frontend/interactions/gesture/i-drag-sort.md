---
zh: 拖拽排序
en: Drag to reorder
order: 10
---

## 是什么

按住把手拖动条目，其他条目实时让位，松手落到新位置；键盘也能调整顺序。

## 适合

自定义菜单、优先级列表、看板卡片、表单字段顺序、播放列表。

## 不适合

条目上百或需要精确定位时，提供“移到第 N 位”“置顶 / 置底”，不要只靠拖。

## 注意

拖动过程中只改 transform，不改 DOM 顺序，松手后再提交新顺序。

## 要点

- 有把手时按下把手即可拖；整行可拖时长按约 250ms 才拿起，避免和滚动、点击冲突。
- 被拖条目无过渡地跟手，阴影升一级并放大约 1.02 倍；其他条目用 200ms 过渡让位。
- 拖动中只改 transform，松手后约 200ms 落位，再一次性更新 DOM 和数据。
- 把手设 touch-action: none，列表其他区域保留纵向滚动。
- 网格里大小不一的模块（看板小组件、首页卡片）也能拖：按格子吸附，其余模块按格子重新排开、不重叠；另给“恢复默认布局”。
- 键盘等效：把手可聚焦，上下方向键移动一位；或提供“上移 / 下移”菜单。
- 用 aria-live 播报“「首页改版」现在是第 2 项，共 4 项”。
- 保存失败时恢复原顺序并提示。

## 提示词

给{列表}做「拖拽排序」：每项左侧放拖动把手，按下把手即可拖（整行拖动需长按 250ms）；被拖项跟手、阴影升一级，其他项 200ms 过渡让位；拖动中只改 transform，松手落位后再更新顺序并保存；把手可聚焦，上下方向键移动一位，用 aria-live 播报新位置；保存失败恢复原顺序并提示；{网格里大小不一的模块}拖动时按格子吸附、其余模块按格子让位，另给“恢复默认布局”。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;place-items:center;padding:12px 16px}
.list{display:grid;gap:6px;width:100%;max-width:400px;margin:0;padding:0;list-style:none;counter-reset:i}
.list li{position:relative;display:flex;align-items:center;gap:10px;height:34px;padding:0 12px 0 4px;background:#fff;border:1px solid #e3e6eb;border-radius:8px;counter-increment:i;transition:transform .2s cubic-bezier(.2,0,0,1),box-shadow .2s;user-select:none}
.h{display:grid;place-items:center;flex:none;width:28px;height:28px;border:0;border-radius:6px;background:none;color:#8a909c;cursor:grab;touch-action:none}
.h:hover{background:#f5f6f8;color:#1f2329}
.h svg{width:14px;height:14px;fill:currentColor}
.no{display:grid;place-items:center;flex:none;width:20px;height:20px;border-radius:50%;background:#edf1ff;color:#3b5bdb;font-size:12px;font-weight:600;font-variant-numeric:tabular-nums}
.no::before{content:counter(i)}
.list b{flex:1;min-width:0;overflow:hidden;font-weight:500;text-overflow:ellipsis;white-space:nowrap}
.list small{color:#5b616e;font-size:12px}
.list li.lift{z-index:2;border-color:#c5d0fa;box-shadow:0 8px 24px rgba(31,35,41,.16);transition:box-shadow .2s}
.list li.lift .h{cursor:grabbing}
.list.snap li{transition:none}
.list li.moved{animation:fl 1s}
@keyframes fl{from{background:#edf1ff}
}
@container (min-width:560px){.list{gap:8px;max-width:460px}
.list li{height:48px}
}
</style>

<div class="st"><ol class="list"></ol><p class="sr" aria-live="assertive"></p></div>

<script type="module">
export default function demo(root) {
  const list = root.querySelector('.list'), live = root.querySelector('.sr');
  const DOT = '<svg viewBox="0 0 14 14" aria-hidden="true">' + [3, 7, 11].map((y) => `<circle cx="4.5" cy="${y}" r="1.3"/><circle cx="9.5" cy="${y}" r="1.3"/>`).join('') + '</svg>';
  [['首页改版', '设计'], ['支付回调重试', '后端'], ['埋点补齐', '数据'], ['帮助中心改版', '内容']].forEach(([t, g]) => {
    const li = document.createElement('li');
    li.innerHTML = `<button class="h" type="button" aria-label="拖动或用上下方向键调整「${t}」的顺序">${DOT}</button><span class="no" aria-hidden="true"></span><b>${t}</b><small>${g}</small>`;
    list.append(li);
  });
  const say = (li) => {
    live.textContent = `「${li.querySelector('b').textContent}」现在是第 ${[...list.children].indexOf(li) + 1} 项，共 ${list.children.length} 项`;
    li.classList.remove('moved'); void li.offsetWidth; li.classList.add('moved');
  };
  let d = null;
  list.addEventListener('pointerdown', (e) => {
    const h = e.target.closest('.h'); if (!h || d || e.button > 0) return;
    e.preventDefault(); h.setPointerCapture(e.pointerId);
    const li = h.parentNode, items = [...list.children], i = items.indexOf(li);
    d = { li, items, i, to: i, y0: e.clientY, step: li.offsetHeight + parseFloat(getComputedStyle(list).rowGap) };
    li.classList.add('lift'); li.style.transform = 'scale(1.02)';
  });
  list.addEventListener('pointermove', (e) => {
    if (!d) return;
    const { li, items, i, step } = d, dy = Math.max(-i * step, Math.min((items.length - 1 - i) * step, e.clientY - d.y0));
    li.style.transform = `translateY(${dy}px) scale(1.02)`; // 被拖项跟手，不加过渡
    d.to = Math.round(i + dy / step);
    items.forEach((it, k) => { // 其他项只改 transform 让位，不动 DOM
      if (it === li) return;
      const s = i < d.to && k > i && k <= d.to ? -step : i > d.to && k < i && k >= d.to ? step : 0;
      it.style.transform = s ? `translateY(${s}px)` : '';
    });
  });
  const drop = () => {
    if (!d) return;
    const { li, items, i, to, step } = d; d = null;
    li.classList.remove('lift'); li.style.transform = `translateY(${(to - i) * step}px)`;
    setTimeout(() => { // 落位后一次性更新 DOM
      list.classList.add('snap'); items.forEach((it) => { it.style.transform = ''; });
      list.insertBefore(li, to > i ? items[to].nextSibling : items[to]);
      void list.offsetWidth; list.classList.remove('snap');
      if (to !== i) say(li);
    }, 200);
  };
  list.addEventListener('pointerup', drop); list.addEventListener('pointercancel', drop);
  list.addEventListener('keydown', (e) => {
    const h = e.target.closest('.h'); if (!h || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return;
    e.preventDefault();
    const li = h.parentNode, sib = e.key === 'ArrowUp' ? li.previousElementSibling : li.nextElementSibling; if (!sib) return;
    if (e.key === 'ArrowUp') list.insertBefore(li, sib); else list.insertBefore(sib, li);
    h.focus(); say(li);
  });
}
</script>
