---
zh: 红点与未读的来去
en: Badge & unread flow
order: 30
---

## 是什么

未读角标出现、增减、清空时都有交代：数字在固定宽度的框里上下翻动换数，读掉一条时这一行的角标缩回原处淡出，分组和总数在同一帧一起减；新消息来时数字往上翻，不会突然跳一下。

## 适合

消息列表、通知中心、待办和审批入口这类“还剩几条没处理”要一直看得准的地方。

## 不适合

只需要提示“有新内容”、不在乎具体数量时用 8px 小圆点；顶部临时公告用「页内横幅提示」。

## 要点

- 角标两种：要计数时用数字，只提示有新内容时用圆点；超过 99 显示 99+。
- 分三档用：要用户处理的事给数字，有新内容但不用处理的给圆点，营销内容不配红点，放回正常的内容位置。
- 贴在图标上的徽标锚定图标右上角，右缘固定，位数变多时向左长，到 99+ 为止。
- 数字放在固定宽度、等宽数字的框里：变大往上翻、变小往下翻（约 220ms），框宽按两位预留，换数不挤动旁边的文字。
- 读掉一条：这一行的角标原地缩小到 0 并淡出（约 180ms）；分组角标和总角标在同一帧一起减，不先后跳。
- 点圆点展开详情时，面板以圆点为变换原点长出来，看得出是从那里来的。
- 表示“有动态”的圆点可以轻微呼吸（透明度 0.6–1，约 2 秒一次）；用户进过那个页面后圆点就消失，不必等逐条读完。
- “以下是新消息”分割线：用户滚过它之后才收起，位置不变，不因新消息到达而移动。
- 新消息的横幅从顶部把内容往下推，不盖在列表上（见「页内横幅提示」）；用 + 新建的内容落进列表的位置可以参考「小圆点长成卡片」；“全部已读”这类批量清除配「操作后撤销」。
- 读屏：每一行的名称里带上未读数（“林夕，2 条未读”）；总数变化用 role="status" 播报“还有 N 条未读”，不逐条播每次翻动。
- 减少动态效果时数字直接换、角标直接消失，计数照常同步。

## 提示词

给{消息列表}的未读角标做「来去有交代」：要用户处理的事用数字角标（超过 99 显示 99+），有新内容但不用处理的用 8px 圆点，营销内容不配红点；贴在图标上的徽标锚定图标右上角，位数变多时向左长；数字放在固定宽度（按两位预留）、等宽数字的框里，变大时旧数字向上移出、新数字从下方进来，变小时反过来，约 220ms，框宽不变、不挤动旁边文字；点开一行或标为已读时，这一行的角标原地缩到 0 并淡出（180ms），{分组角标}和总角标在同一帧一起减；点红点展开的面板以红点为变换原点；“有动态”的圆点可轻微呼吸（透明度 0.6–1，约 2 秒一次），用户进过对应页面后消失；“以下是新消息”分割线在用户滚过之后才收起；新消息横幅从顶部把内容往下推；每一行的名称里写明未读数，总数变化用 role="status" 播报“还有 N 条未读”；减少动态效果时直接更新数字、直接移除角标。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:12px 14px}
.box{display:flex;flex-direction:column;justify-content:center;gap:8px;max-width:400px;height:100%;margin:0 auto}
.hd{display:flex;align-items:center;gap:6px;height:30px}
.hd b{font-size:14px}
.hd .fill{flex:1}
.list{list-style:none;margin:0;padding:0;background:#fff;border:1px solid #e3e6eb;border-radius:12px;overflow:hidden}
.row{display:flex;align-items:center;gap:10px;width:100%;height:40px;padding:0 12px;border:0;border-top:1px solid #eef0f3;background:none;text-align:left}
.list li:first-child .row{border-top:0}
.av{flex:none;display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:var(--c);color:#fff;font-style:normal;font-size:12px;font-weight:600}
.tx{flex:1;min-width:0;display:flex;align-items:baseline;gap:8px}
.tx b{flex:none;font-weight:400}
.row.un .tx b{font-weight:600}
.tx small{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#5b616e;font-size:12px}
/* 角标：数字框按两位预留宽度，换数时上下翻动 */
.bg{flex:none;display:grid;place-items:center;height:18px;padding:0 5px;border-radius:9px;background:#d92d20;color:#fff;font-size:11px;font-weight:600;font-variant-numeric:tabular-nums}
.bg.gone{visibility:hidden}
.win{display:grid;justify-items:center;min-width:2ch;height:13px;overflow:hidden;line-height:13px}
.win span{grid-area:1/1}
</style>

<div class="st"><div class="box">
  <div class="hd"><b>收件</b><span class="bg tot" data-v="5" aria-hidden="true"><span class="win" data-clip><span>5</span></span></span><span class="fill"></span><button type="button" class="ctl in">来一条</button><button type="button" class="ctl all">全部已读</button></div>
  <ul class="list">
    <li><button type="button" class="row un"><i class="av" style="--c:#3b5bdb" aria-hidden="true">林</i><span class="tx"><b>林夕</b><small data-clip>周五评审改到下午三点</small></span><span class="bg" data-v="2" aria-hidden="true"><span class="win" data-clip><span>2</span></span></span><span class="sr"></span></button></li>
    <li><button type="button" class="row un"><i class="av" style="--c:#0f7352" aria-hidden="true">周</i><span class="tx"><b>周屿</b><small data-clip>报价单第二版已上传</small></span><span class="bg" data-v="1" aria-hidden="true"><span class="win" data-clip><span>1</span></span></span><span class="sr"></span></button></li>
    <li><button type="button" class="row un"><i class="av" style="--c:#b54708" aria-hidden="true">设</i><span class="tx"><b>设计组</b><small data-clip>新图标请大家过一遍</small></span><span class="bg" data-v="2" aria-hidden="true"><span class="win" data-clip><span>2</span></span></span><span class="sr"></span></button></li>
  </ul>
  <p class="sr" role="status"></p>
</div></div>

<script type="module">
export default function demo(root) {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tot = root.querySelector('.tot'), msg = root.querySelector('[role=status]');
  const rows = [...root.querySelectorAll('.row')];
  const ease = 'cubic-bezier(.2,0,0,1)';
  const label = (v) => (v > 99 ? '99+' : String(v));
  // 换数：变大时旧数字向上移出、新数字从下方进来，变小反过来；框宽不变
  const roll = (bg, to) => {
    const from = +bg.dataset.v, win = bg.querySelector('.win');
    bg.dataset.v = to;
    if (still || from === to) { win.innerHTML = `<span>${label(to)}</span>`; return; }
    const dir = to > from ? 1 : -1, next = document.createElement('span');
    next.textContent = label(to);
    win.querySelectorAll('span').forEach((s) => s.animate([{ transform: 'none' }, { transform: `translateY(${-100 * dir}%)` }], { duration: 220, easing: ease }).finished.then(() => s.remove(), () => s.remove()));
    win.append(next);
    next.animate([{ transform: `translateY(${100 * dir}%)` }, { transform: 'none' }], { duration: 220, easing: ease });
  };
  const total = () => rows.reduce((s, r) => s + +r.querySelector('.bg').dataset.v, 0);
  const name = (r) => { const n = +r.querySelector('.bg').dataset.v; r.querySelector('.sr').textContent = n ? `，${n} 条未读` : '，已读'; r.classList.toggle('un', n > 0); };
  const say = () => { const t = total(); msg.textContent = t ? `还有 ${t} 条未读` : '没有未读了'; };
  // 读掉：这一行角标原地缩小淡出，总数在同一帧一起减
  const read = (r) => {
    const bg = r.querySelector('.bg');
    if (!+bg.dataset.v) return;
    bg.dataset.v = 0;
    const done = () => bg.classList.add('gone');
    if (still) done(); else bg.animate([{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(0)', opacity: 0 }], { duration: 180, easing: 'cubic-bezier(.4,0,1,1)' }).finished.then(done);
    roll(tot, total());
    tot.classList.toggle('gone', total() === 0);
    name(r);
  };
  let k = 2;
  const income = () => {
    const r = rows[k], bg = r.querySelector('.bg');
    k = (k + 2) % rows.length;
    if (bg.classList.contains('gone')) {
      bg.classList.remove('gone'); bg.dataset.v = 1; bg.querySelector('.win').innerHTML = '<span>1</span>';
      if (!still) bg.animate([{ transform: 'scale(0)' }, { transform: 'scale(1.15)' }, { transform: 'scale(1)' }], { duration: 260, easing: ease });
    } else roll(bg, +bg.dataset.v + 1);
    tot.classList.remove('gone');
    roll(tot, total());
    name(r); say();
  };
  rows.forEach((r) => { name(r); r.addEventListener('click', () => { stop(); read(r); say(); }); });
  root.querySelector('.in').addEventListener('click', () => { stop(); income(); });
  root.querySelector('.all').addEventListener('click', () => { stop(); rows.forEach(read); say(); });
  // 自动演示一次：读掉第一行，再来一条新消息
  const timers = [setTimeout(() => root.host.isConnected && (read(rows[0]), say()), 700), setTimeout(() => root.host.isConnected && income(), 1500)];
  const stop = () => timers.forEach(clearTimeout);
}
</script>
