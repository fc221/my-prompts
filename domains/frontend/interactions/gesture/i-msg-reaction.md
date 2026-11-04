---
zh: 长按消息贴表情
en: Long-press reactions
aka: 消息回应 表情回应 长按表情 消息反应 reactions
order: 105
---

## 是什么

长按一条消息，它轻轻浮起，其他消息暗下去，旁边弹出一排常用表情；手指不抬，滑到某个表情上松手，表情缩小飞到这条消息的角上，和别人贴的同一个表情合成“👍 2”。

## 适合

聊天、群组、评论区、协作文档的批注：想快速表个态，又不想多发一条“收到”“好的”。

## 不适合

要留下文字的回复用引用回复；投票、报名这类要统计结果的用投票组件，不靠数表情；一个列表里长按已经用来多选（「长按多选」）或托起菜单（「长按托起看一眼」）时，表情放进那个菜单的第一排，不再单独占长按。

## 注意

先定每人每条能贴几个：聊天里一般只留一个，选别的就是替换；协作工具可以贴多个，每个表情各算一次。同一个表情的计数和别人的合在一起，不另起一枚。

## 要点

- 触发：按住 450ms；期间手指移动超过 8px 就取消、交给页面滚动；触发后在 touchmove 里 preventDefault（监听设 passive: false），手指接着滑不会滚页面；消息上屏蔽系统长按菜单和文字选择。
- 浮起：支持就轻震一次（navigator.vibrate(10)）；这条消息放大到 1.03 并加阴影，其他消息降到 40% 不透明度。
- 表情条：放在消息上方 8px，离顶部不够就放下方，左右夹在可视范围内；6 个常用表情加“更多”，每格 36–40px（手机 44px），自己已贴的那个带底色。
- 滑选：滑过的表情以底边为基准放大到 1.4 倍，不被手指挡住；判定只看横向落在哪一格，纵向放宽到条外 24px；在表情上松手就贴上，在别处松手表情条留着等点选，点空白或按 Esc 收起。
- 贴上：表情沿弧线 240ms 飞到气泡下角，落地时计数 +1 并弹一下；同一个表情合成“👍 2”，自己贴的那枚描边；再点自己的那枚取消，点别人的那枚就是跟着贴。
- 桌面和键盘：悬停或聚焦消息时旁边出现回应按钮，右键打开同一排表情（触屏长按也会触发 contextmenu，按住计时还在进行就忽略它）；条里 ←/→ 移动、回车选中、Esc 或 Tab 收起，焦点回到回应按钮。
- 按「乐观更新」处理：松手当下就改计数，请求在后台发，连着改只认最后一次；失败时退回原样，这条消息轻抖一下，并提示“回应没发出去，已撤回”。读屏播报“你回应了 👍”“已取消 👍”，表情胶囊的名称写“👍 2 人，含你”。
- 减少动态效果时不浮起、不放大、不飞，滑过的表情只加底色，计数直接变。

## 提示词

给{聊天消息列表}做「长按消息贴表情」：按住消息 450ms 触发，期间移动超过 8px 取消并交给滚动，触发后在 touchmove 里 preventDefault（passive: false）；触发时轻震一次，这条消息放大到 1.03 加阴影，其他消息降到 40% 不透明度；消息上方 8px 弹出表情条（离顶部不够放下方，左右不出屏），放{常用表情，如 👍 ❤️ 😂 🎉 😮 🙏}和“更多”，每格 40px；手指不抬滑过的表情以底边为基准放大 1.4 倍，判定只看横向、纵向放宽 24px；在表情上松手就贴上，在别处松手表情条留着，点空白或 Esc 收起；贴上时表情沿弧线 240ms 飞到气泡下角，落地时计数 +1 并弹一下，同一表情合并计数（“👍 2”），自己贴的描边，再点自己的取消，点别人的跟着贴；每人每条{只留一个，选别的就替换 / 可以贴多个}；桌面端悬停或聚焦消息时出现回应按钮，右键打开同一排表情，←/→ 移动、回车选中、Esc 收起并把焦点还给按钮；乐观更新，失败时退回原样、消息轻抖并提示“回应没发出去，已撤回”；读屏播报“你回应了 👍”；减少动态效果时不浮起、不放大、不飞，计数直接变。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:8px 12px}
.box{display:grid;grid-template-rows:auto minmax(0,1fr);gap:8px;height:100%;max-width:480px;margin:0 auto}
.bar{display:flex;align-items:center;gap:8px;min-width:0;transition:opacity .16s}
.bar b{flex:1;min-width:0;overflow:hidden;font-size:13px;white-space:nowrap;text-overflow:ellipsis}
.bar .ctl{flex:none;height:28px;padding:0 10px;font-size:12px}
.chat{display:flex;flex-direction:column;justify-content:flex-end;gap:4px;min-height:0;margin:0;padding:0;list-style:none}
.row{display:flex;align-items:flex-end;gap:6px;min-width:0;transition:opacity .16s}
.row.me{flex-direction:row-reverse}
.row.has{margin-bottom:12px}
.av{flex:none;display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:hsl(var(--h) 60% 88%);color:hsl(var(--h) 50% 28%);font-size:12px;font-style:normal;font-weight:600}
.bw{position:relative;min-width:0;max-width:75%}
.bb{margin:0;padding:6px 10px;border:1px solid #e3e6eb;border-radius:12px 12px 12px 4px;background:#fff;font-size:13px;line-height:18px;transform-origin:0 50%;transition:transform .16s,box-shadow .16s;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;cursor:default}
.me .bb{border-color:#3b5bdb;border-radius:12px 12px 4px 12px;background:#3b5bdb;color:#fff;transform-origin:100% 50%}
.row.press .bb{transform:scale(.98)}
.row.lift .bb{transform:scale(1.03);box-shadow:0 8px 24px rgba(16,24,40,.18)}
.focus .row:not(.lift),.focus .bar{opacity:.4}
.bb.shake{animation:shk .32s}
@keyframes shk{20%,60%{translate:-3px}
40%,80%{translate:3px}
}
.rx{position:absolute;left:8px;bottom:-16px;display:flex;gap:4px}
.me .rx{left:auto;right:8px}
.rc{display:inline-flex;align-items:center;gap:2px;height:22px;padding:0 6px;border:1px solid #e3e6eb;border-radius:999px;background:#fff;color:#5b616e;font-size:12px;font-weight:600;font-variant-numeric:tabular-nums;box-shadow:0 1px 2px rgba(16,24,40,.08)}
.rc i{font-size:13px;font-style:normal;line-height:1}
.rc.mine{border-color:#3b5bdb;background:#edf1ff;color:#3b5bdb}
.rc.wait{visibility:hidden}
.rc.pop{animation:pop .24s cubic-bezier(.3,1.6,.6,1)}
@keyframes pop{50%{transform:scale(1.25)}
}
.rb{flex:none;display:grid;place-items:center;width:28px;height:28px;padding:0;border:0;border-radius:50%;background:transparent;color:#5b616e;opacity:0;transition:opacity .16s}
.rb:hover{background:#e9ecf1;color:#1f2329}
.rb svg,.more svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round}
.row:hover .rb,.row:focus-within .rb{opacity:1}
.scrim{position:absolute;inset:0;z-index:2}
.tray{position:absolute;left:0;top:0;z-index:3;display:flex;padding:4px;border-radius:999px;background:#fff;box-shadow:0 8px 24px rgba(16,24,40,.2),0 0 0 1px rgba(16,24,40,.06)}
.tray:not([hidden]){animation:tin .16s cubic-bezier(.2,.9,.3,1.2)}
@keyframes tin{from{opacity:0;transform:scale(.7)}
}
.em{display:grid;place-items:center;width:36px;height:36px;padding:0;border:0;border-radius:50%;background:none;font-size:20px;line-height:1;transform-origin:50% 100%;transition:transform .16s,background-color .16s}
.em:hover,.em[aria-pressed=true]{background:#edf1ff}
.em.hot{transform:translateY(-4px) scale(1.4)}
.more{color:#5b616e}
.fly{position:absolute;left:0;top:0;z-index:5;font-size:20px;line-height:1;pointer-events:none}
.ip{display:none;align-items:center;height:36px;padding:0 16px;border:1px solid #e3e6eb;border-radius:999px;background:#fff;color:#6b7280;transition:opacity .16s}
.focus .ip{opacity:.4}
.toast{position:absolute;left:50%;bottom:8px;z-index:6;display:flex;align-items:center;height:32px;padding:0 12px;border-radius:999px;background:#1f2329;color:#fff;font-size:12px;white-space:nowrap;transform:translateX(-50%)}
@container (min-width:560px){.st{padding:12px 16px}
.box{grid-template-rows:auto minmax(0,1fr) auto}
.ip{display:flex}
.chat{gap:12px}
.bb{padding:8px 12px;font-size:14px;line-height:20px}
.av{width:28px;height:28px}
.em{width:40px;height:40px;font-size:22px}
}
@media (prefers-reduced-motion:reduce){.row.press .bb,.row.lift .bb{transform:none}
.em.hot{transform:none;background:#dfe6ff}
}
</style>

<div class="st"><div class="box"><div class="bar"><b>设计组 · 3 人</b><label class="sw"><input type="checkbox" class="fail"><i aria-hidden="true"></i>模拟失败</label><button type="button" class="ctl rp">重播</button></div><ul class="chat" aria-label="设计组的消息：长按或右键消息贴表情"></ul><div class="ip" aria-hidden="true">发消息…</div></div><div class="scrim" hidden></div><div class="tray" role="toolbar" aria-label="选一个表情回应" hidden></div><div class="toast" aria-hidden="true" hidden></div><p class="sr" role="status"></p></div>

<script type="module">
const EM = ['👍', '❤️', '😂', '🎉', '😮', '🙏'];
const MSG = [{ who: '阿岚', h: 200, text: '首页改版的稿子传上去了', r: {} }, { me: true, text: '收到，晚上看', r: {} }, { who: '小周', h: 30, text: '配色比上一版舒服多了', r: { '👍': 1 } }];
const SMILE = '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7.5"/><path d="M7 11.5c.8 1.2 1.8 1.8 3 1.8s2.2-.6 3-1.8"/><path d="M7.5 8h0M12.5 8h0" stroke-width="2.2"/></svg>';
export default function demo(root) {
  const st = root.querySelector('.st'), chat = root.querySelector('.chat'), tray = root.querySelector('.tray'), scrim = root.querySelector('.scrim'), toast = root.querySelector('.toast'), sr = root.querySelector('[role=status]'), fail = root.querySelector('.fail');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  tray.innerHTML = EM.map((e) => `<button type="button" class="em" data-e="${e}" aria-label="回应 ${e}" aria-pressed="false" tabindex="-1">${e}</button>`).join('') + '<button type="button" class="em more" aria-label="更多表情" tabindex="-1"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 5v10M5 10h10"/></svg></button>';
  const ems = [...tray.children];
  let data = [], cur = null, press = null, hot = null, tm = [], tt = 0;
  const rows = () => [...chat.children], bubble = (i) => rows()[i].querySelector('.bb'), chipOf = (i, e) => rows()[i].querySelector(`.rc[data-e="${e}"]`);
  const render = (i) => {
    const m = data[i], row = rows()[i];
    row.querySelector('.rx').innerHTML = Object.entries(m.r).map(([e, n]) => `<button type="button" class="rc${m.my === e ? ' mine' : ''}" data-e="${e}" aria-pressed="${m.my === e}" aria-label="${e} ${n} 人${m.my === e ? '，含你，点按取消' : '，点按跟着贴'}"><i aria-hidden="true">${e}</i>${n}</button>`).join('');
    row.classList.toggle('has', Object.keys(m.r).length > 0);
  };
  const build = () => {
    data = MSG.map((m) => ({ ...m, r: { ...m.r }, my: null, seq: 0 }));
    chat.innerHTML = data.map((m) => `<li class="row${m.me ? ' me' : ''}">${m.me ? '' : `<i class="av" style="--h:${m.h}" aria-hidden="true">${m.who.slice(-1)}</i>`}<div class="bw"><p class="bb"><span class="sr">${m.me ? '我' : m.who}：</span>${m.text}</p><div class="rx"></div></div><button type="button" class="rb" aria-label="回应这条消息">${SMILE}</button></li>`).join('');
    data.forEach((_, i) => render(i));
  };
  const say = (t, show) => { sr.textContent = t; if (!show) return; toast.textContent = t; toast.hidden = false; clearTimeout(tt); tt = setTimeout(() => { toast.hidden = true; }, 2400); };
  const setHot = (el) => { if (el === hot) return; hot?.classList.remove('hot'); hot = el; el?.classList.add('hot'); };
  const open = (i, keys) => {
    close(false); cur = i;
    const row = rows()[i], r = bubble(i).getBoundingClientRect(), s = st.getBoundingClientRect();
    row.classList.add('lift'); st.classList.add('focus'); scrim.hidden = false; tray.hidden = false;
    ems.forEach((b) => b.setAttribute('aria-pressed', String(!!b.dataset.e && b.dataset.e === data[i].my)));
    // 先放消息上方 8px，离顶部不够就放下方；左右夹在框里
    const w = tray.offsetWidth, h = tray.offsetHeight, me = !!data[i].me;
    let y = r.top - s.top - h - 8; const below = y < 8;
    if (below) y = Math.min(s.height - h - 8, r.bottom - s.top + 8 + (row.classList.contains('has') ? 16 : 0));
    tray.style.left = Math.max(8, Math.min(s.width - w - 8, me ? r.right - s.left - w : r.left - s.left)) + 'px'; tray.style.top = y + 'px';
    tray.style.transformOrigin = `${me ? 'right' : 'left'} ${below ? 'top' : 'bottom'}`;
    if (keys) (ems[EM.indexOf(data[i].my)] ?? ems[0]).focus();
  };
  const close = (back = true) => {
    if (cur === null) return;
    const row = rows()[cur], inTray = tray.contains(root.activeElement); cur = null; setHot(null);
    row.classList.remove('lift'); st.classList.remove('focus'); scrim.hidden = true; tray.hidden = true;
    if (back && inTray) row.querySelector('.rb').focus();
  };
  const fly = (a, chip, e, done) => {
    const s = st.getBoundingClientRect(), b = chip.querySelector('i').getBoundingClientRect(), f = document.createElement('span');
    const x0 = a.left + a.width / 2 - s.left, y0 = a.top + a.height / 2 - s.top, x1 = b.left + b.width / 2 - s.left, y1 = b.top + b.height / 2 - s.top;
    const at = (x, y, k) => `translate(${x}px,${y}px) translate(-50%,-50%) scale(${k})`;
    f.className = 'fly'; f.textContent = e; st.append(f);
    f.animate([{ transform: at(x0, y0, 1.4) }, { transform: at((x0 + x1) / 2, Math.min(y0, y1) - 20, 1), offset: 0.45 }, { transform: at(x1, y1, 0.65) }], { duration: 240, easing: 'cubic-bezier(.3,.6,.4,1)', fill: 'forwards' }).finished.then(() => { f.remove(); done(); });
  };
  // 乐观更新：当下改数据、发请求；每人每条只留一个，选别的就是替换
  const react = (i, e, from) => {
    const m = data[i], snap = { my: m.my, r: { ...m.r } }, seq = ++m.seq, prev = m.my, bad = fail.checked;
    if (prev && !--m.r[prev]) delete m.r[prev];
    m.my = prev === e ? null : e;
    if (m.my) m.r[e] = (m.r[e] || 0) + 1;
    say(m.my ? `你回应了 ${e}` : `已取消 ${e}`);
    const land = () => { render(i); const c = chipOf(i, e); if (c && m.my === e && !still) { c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); } };
    if (m.my === e && from && !still) {
      let c = chipOf(i, e);
      if (!c) { render(i); c = chipOf(i, e); c.classList.add('wait'); } // 新的一枚先占好位置，等表情落地再露出来
      fly(from, c, e, land);
    } else land();
    setTimeout(() => { // 模拟请求：只认最后一次的结果，失败就退回原样
      if (!root.host.isConnected || data[i] !== m || m.seq !== seq || !bad) return;
      Object.assign(m, snap); render(i);
      const bb = bubble(i); bb.classList.remove('shake'); void bb.offsetWidth; bb.classList.add('shake');
      say('回应没发出去，已撤回', true);
    }, 700);
  };
  const pick = (b) => {
    const i = cur, a = b.getBoundingClientRect(); close();
    if (b.classList.contains('more')) return say('示例：这里展开全部表情', true);
    react(i, b.dataset.e, a);
  };
  const hit = (x, y) => {
    const t = tray.getBoundingClientRect(); if (y < t.top - 24 || y > t.bottom + 24) return null;
    return ems.find((b) => x >= t.left + b.offsetLeft && x < t.left + b.offsetLeft + b.offsetWidth) ?? null; // 用排版位置，放大后的表情不抢邻格
  };
  const stop = () => { if (!press) return; clearTimeout(press.t); rows()[press.i]?.classList.remove('press'); press = null; };
  const stopDemo = () => { tm.forEach(clearTimeout); tm = []; };
  chat.addEventListener('pointerdown', (e) => {
    const bb = e.target.closest('.bb'); if (!bb || e.button > 0 || cur !== null) return;
    if (e.isTrusted) stopDemo();
    const row = bb.closest('.row'), trusted = e.isTrusted;
    press = { i: rows().indexOf(row), x: e.clientX, y: e.clientY, id: e.pointerId, on: false };
    row.classList.add('press');
    try { bb.setPointerCapture(e.pointerId); } catch {}
    press.t = setTimeout(() => { press.on = true; row.classList.remove('press'); if (trusted) navigator.vibrate?.(10); open(press.i, false); }, 450);
  });
  st.addEventListener('pointermove', (e) => {
    if (!press || e.pointerId !== press.id) return;
    if (press.on) setHot(hit(e.clientX, e.clientY));
    else if (Math.hypot(e.clientX - press.x, e.clientY - press.y) > 8) stop(); // 移动超过 8px：交给滚动
  });
  st.addEventListener('pointerup', (e) => {
    if (!press || e.pointerId !== press.id) return;
    const on = press.on, h = hot; stop();
    if (on && h) pick(h); // 在表情上松手就贴上；在别处松手，表情条留着等点选
  });
  st.addEventListener('pointercancel', stop);
  chat.addEventListener('touchmove', (e) => { if (press?.on) e.preventDefault(); }, { passive: false }); // 长按生效后接着滑不滚动页面
  chat.addEventListener('contextmenu', (e) => {
    const bb = e.target.closest('.bb'); if (!bb) return;
    e.preventDefault(); if (press) return; // 触屏长按也会触发 contextmenu，交给上面的计时
    const i = rows().indexOf(bb.closest('.row')); if (cur !== i) open(i, true);
  });
  chat.addEventListener('click', (e) => {
    const c = e.target.closest('.rc'), rb = e.target.closest('.rb');
    if (c) react(rows().indexOf(c.closest('.row')), c.dataset.e, null);
    else if (rb) open(rows().indexOf(rb.closest('.row')), true);
  });
  tray.addEventListener('click', (e) => { const b = e.target.closest('.em'); if (b && cur !== null) pick(b); });
  tray.addEventListener('keydown', (e) => {
    const i = ems.indexOf(root.activeElement), n = ems.length, to = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
    if (to !== undefined) { e.preventDefault(); ems[to].focus(); } else if (e.key === 'Escape' || e.key === 'Tab') { e.preventDefault(); close(); }
  });
  scrim.addEventListener('click', () => close());
  // 自动演示：长按最后一条，滑到 👍 松手，和别人的 👍 合成 2
  const play = () => {
    stopDemo(); stop(); close(false); build(); say('');
    if (still) { data[2].my = '👍'; data[2].r['👍'] = 2; return render(2); }
    const bb = bubble(2), r = bb.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    const fire = (t, el, px, py) => el.dispatchEvent(new PointerEvent(t, { bubbles: true, composed: true, pointerId: 9, button: 0, clientX: px, clientY: py }));
    tm.push(setTimeout(() => fire('pointerdown', bb, x, y), 400));
    tm.push(setTimeout(() => {
      if (!root.host.isConnected || !press?.on) return;
      const t = ems[0].getBoundingClientRect(), tx = t.left + t.width / 2, ty = t.top + t.height / 2 + 8;
      for (let k = 1; k <= 8; k++) tm.push(setTimeout(() => { if (root.host.isConnected && press) fire('pointermove', st, x + (tx - x) * k / 8, y + (ty - y) * k / 8); }, k * 30));
      tm.push(setTimeout(() => { if (root.host.isConnected && press) fire('pointerup', st, tx, ty); }, 8 * 30 + 450));
    }, 900));
  };
  root.querySelector('.rp').addEventListener('click', play);
  play();
}
</script>
