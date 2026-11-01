---
zh: 滑动操作
en: Swipe actions
order: 60
---

## 是什么

列表项向左滑露出“归档 / 删除”，滑过一半或快速一甩就吸附打开，否则弹回。

## 适合

移动端消息、邮件、待办、购物车列表里的高频单条操作。

## 不适合

不可逆删除不能靠一次滑到底直接执行；桌面端用行尾的“更多”菜单。

## 注意

手势看不见，同样的操作必须在“更多”按钮或详情页里也能找到。

## 要点

- 列表项设 touch-action: pan-y；横向位移超过 8px 且大于纵向位移才算横滑，避免和滚动抢手势。
- 跟手移动不加过渡；越过按钮总宽后按 0.3 倍阻尼继续跟随。
- 松手判定：位移超过按钮总宽一半，或速度超过 0.5px/ms，就吸附打开，否则弹回（约 240ms）。
- 同一时间只打开一行；点其他地方或开始滚动时自动收回。
- 删除用危险色、归档用中性色，每个按钮宽 64–80px，文字清楚。
- 执行后该行高度收起，并给“撤销”。
- 键盘与鼠标等效：行尾“更多”按钮展开同样的操作；收起时隐藏的按钮不可聚焦（inert）。

## 提示词

给{移动端列表}加「滑动操作」：列表项左滑露出{归档、删除}按钮（各 72px），横向位移大于 8px 且大于纵向时才进入横滑；跟手无过渡，超过按钮宽度后加阻尼；松手时位移过半或速度大于 0.5px/ms 就吸附打开，否则弹回；同时只打开一行，点别处收回；删除后该行收起并给撤销；每行另有“更多”按钮提供同样操作，收起的按钮不可聚焦。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:12px 16px}
.list{max-width:400px;margin:0 auto;padding:0;list-style:none;background:#fff;border:1px solid #e3e6eb;border-radius:12px;overflow:hidden}
.list li{position:relative;height:52px;overflow:hidden;transition:height .24s cubic-bezier(.2,0,0,1)}
.list li+li{border-top:1px solid #e3e6eb}
.list li.out{height:0}
.acts{position:absolute;top:0;right:0;bottom:0;display:flex}
.acts button{width:72px;border:0;color:#fff;font-weight:500}
.ar{background:#5b616e}
.dl{background:#d92d20}
.fg{position:relative;z-index:1;display:flex;align-items:center;gap:10px;height:100%;padding:0 6px 0 12px;background:#fff;touch-action:pan-y;user-select:none;transition:transform .24s cubic-bezier(.2,.9,.22,1)}
.fg.drag{transition:none}
.av{display:grid;place-items:center;flex:none;width:32px;height:32px;border-radius:50%;background:#edf1ff;color:#3b5bdb;font-weight:600}
.tx{display:flex;flex:1;flex-direction:column;min-width:0;line-height:1.35}
.tx b{font-weight:600}
.tx small{overflow:hidden;color:#5b616e;font-size:12px;text-overflow:ellipsis;white-space:nowrap}
time{flex:none;color:#5b616e;font-size:12px}
.more{flex:none;width:28px;height:28px;border:0;border-radius:6px;background:none;color:#5b616e;font-size:16px;line-height:1}
.more:hover{background:#f5f6f8}
.toast{position:absolute;left:50%;bottom:10px;display:flex;align-items:center;gap:8px;max-width:calc(100% - 32px);height:34px;padding:0 6px 0 12px;border-radius:8px;background:#1f2329;color:#fff;font-size:12px;white-space:nowrap;transform:translateX(-50%)}
.toast :focus-visible{outline-color:#a9bbff}
.tt{overflow:hidden;text-overflow:ellipsis}
.un{flex:none;height:26px;padding:0 8px;border:0;border-radius:6px;background:none;color:#a9bbff;font-weight:600}
.empty{margin:44px 0 0;text-align:center;color:#5b616e}
.reset{height:30px;margin-left:10px;padding:0 12px;border:1px solid #e3e6eb;border-radius:8px;background:#fff}
@container (min-width:560px){.st{padding:24px}
.list li{height:60px}
}
</style>

<div class="st"><ul data-clip class="list"></ul><p class="empty" hidden>没有消息了<button type="button" class="reset">恢复示例</button></p><div class="toast" hidden><span class="tt" role="status"></span><button type="button" class="un">撤销</button></div></div>

<script type="module">
export default function demo(root) {
  const D = [['林知远', '周五的评审改到下午 3 点', '09:42'], ['财务部', '10 月报销已打款，请查收', '昨天'], ['苏墨', '新版结算页的灰度数据发你了', '周三']];
  const list = root.querySelector('.list'), toast = root.querySelector('.toast'), tt = root.querySelector('.tt'), empty = root.querySelector('.empty');
  const W = 144; let open = null, last = null, hideT = 0;
  const sync = () => { list.hidden = !list.children.length; empty.hidden = !list.hidden; };
  const setOpen = (li, on) => {
    if (on && open && open !== li) setOpen(open, false);
    li.querySelector('.fg').style.transform = on ? `translateX(-${W}px)` : '';
    li.querySelector('.acts').inert = !on; li.querySelector('.more').setAttribute('aria-expanded', String(on));
    if (on) open = li; else if (open === li) open = null;
  };
  const act = (li, verb) => {
    const index = [...list.children].indexOf(li); setOpen(li, false); li.classList.add('out');
    setTimeout(() => { if (li.classList.contains('out')) { li.remove(); li.classList.remove('out'); sync(); } }, 240);
    last = { li, index }; tt.textContent = `已${verb}「${li.querySelector('b').textContent}」`; toast.hidden = false;
    clearTimeout(hideT); hideT = setTimeout(() => { toast.hidden = true; last = null; }, 5000);
  };
  const row = ([name, msg, time]) => {
    const li = document.createElement('li');
    li.innerHTML = `<div class="acts" inert><button type="button" class="ar">归档</button><button type="button" class="dl">删除</button></div><div class="fg"><span class="av" aria-hidden="true">${name[0]}</span><div class="tx"><b>${name}</b><small>${msg}</small></div><time>${time}</time><button type="button" class="more" aria-label="${name}的更多操作" aria-expanded="false">⋯</button></div>`;
    li.querySelector('.ar').onclick = () => act(li, '归档'); li.querySelector('.dl').onclick = () => act(li, '删除');
    li.querySelector('.more').onclick = () => { setOpen(li, open !== li); if (open === li) li.querySelector('.ar').focus(); };
    return li;
  };
  list.addEventListener('pointerdown', (e) => {
    const fg = e.target.closest('.fg'); if (!fg || e.target.closest('.more') || e.button > 0) return;
    const li = fg.parentNode, base = open === li ? -W : 0, x0 = e.clientX, y0 = e.clientY, id = e.pointerId;
    let x = base, dragging = false, lx = x0, lt = e.timeStamp, v = 0;
    const move = (ev) => {
      if (ev.pointerId !== id) return;
      const dx = ev.clientX - x0, dy = ev.clientY - y0;
      if (!dragging) {
        if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx)) return end(); // 纵向：交给滚动
        if (Math.abs(dx) < 8) return;
        dragging = true; fg.setPointerCapture(id); fg.classList.add('drag'); if (open && open !== li) setOpen(open, false);
      }
      x = base + dx; if (x < -W) x = -W + (x + W) * 0.3; if (x > 0) x *= 0.3; // 越界阻尼
      fg.style.transform = `translateX(${x}px)`;
      v = (ev.clientX - lx) / Math.max(1, ev.timeStamp - lt); lx = ev.clientX; lt = ev.timeStamp;
    };
    const end = () => {
      list.removeEventListener('pointermove', move); list.removeEventListener('pointerup', end); list.removeEventListener('pointercancel', end);
      fg.classList.remove('drag');
      if (!dragging) { if (open) setOpen(open, false); return; }
      setOpen(li, v < -0.5 ? true : v > 0.5 ? false : x < -W / 2); // 速度或位移满足其一
    };
    list.addEventListener('pointermove', move); list.addEventListener('pointerup', end); list.addEventListener('pointercancel', end);
  });
  root.addEventListener('pointerdown', (e) => { if (open && !open.contains(e.target)) setOpen(open, false); });
  root.querySelector('.un').onclick = () => {
    if (!last) return; const { li, index } = last; last = null; toast.hidden = true;
    li.classList.add('out'); list.insertBefore(li, list.children[index] || null); sync(); void li.offsetWidth; li.classList.remove('out');
  };
  root.querySelector('.reset').onclick = () => { list.replaceChildren(...D.map(row)); sync(); };
  list.replaceChildren(...D.map(row)); sync();
  requestAnimationFrame(() => setOpen(list.children[1], true));
}
</script>
