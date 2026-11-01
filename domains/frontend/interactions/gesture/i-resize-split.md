---
zh: 拖动分隔条改宽度
en: Draggable splitter
order: 50
---

## 是什么

两栏之间有一条能拖的分隔条，拖它同时改变左右两栏的宽度；往里拖过最小宽度整栏收起，双击恢复默认宽度。

## 适合

邮件、笔记、文件管理的“列表 + 正文”，编辑器的“代码 + 预览”，后台的侧栏和详情面板。

## 不适合

手机屏宽放不下两栏，改成两页切换或底部面板；表格里调某一列的宽度用「表格列宽与列显隐」；只需要“宽 / 窄”两档时放一个切换按钮。

## 注意

看得见的线只有 1px，能按住的区域要 8–12px 宽；两侧都要设最小宽度，只限制被拖的那一栏，另一栏会被挤到文字一个字一行。

## 要点

- 分隔线 1px，命中区 10px 骑在线上；悬停或聚焦时线加粗成 2px 主色，光标 col-resize（上下分栏用 row-resize）
- 按下时记住指针到分隔线的偏移，拖动只改左栏宽度，右栏自适应；拖动中不加过渡，旁边显示当前宽度“248px”
- 两栏各有最小宽度（如列表 200px、正文 320px），到最小就停住；继续往里拖超过 40px 时提示“松手收起”，松手整栏收起，原位置留“展开”按钮
- 拖动期间整页 user-select: none，页面里的 iframe 设 pointer-events: none，否则指针一进 iframe 拖动就断了
- 双击分隔线恢复默认宽度；收起、展开用 200ms 过渡，减少动态效果时直接到位
- 键盘：分隔线是 role="separator"、可聚焦，aria-valuenow 用左栏占比（0–100）并带 aria-controls；←/→ 每次 16px，Enter 收起 / 展开，变化用 role="status" 播报
- 宽度按用户记住；窗口变窄放不下两栏的最小宽度时，先收起次要的那一栏

## 提示词

给{两栏页面}的{列表栏}和{正文栏}之间加「拖动分隔条改宽度」：分隔线 1px、命中区 10px，悬停或聚焦时加粗成 2px 主色并显示 col-resize 光标；拖动时保留按下偏移、只改{列表栏}宽度，不加过渡，旁边显示当前宽度；{列表栏}最小 {列表最小宽度}、{正文栏}最小 {正文最小宽度}，到最小停住，继续往里拖超过 40px 提示“松手收起”，松手收起{列表栏}并在原位置留“展开”按钮；双击恢复默认宽度；拖动期间禁止选中文字、iframe 不接收指针；分隔线 role="separator" 可聚焦，aria-valuenow 用左栏占比，←/→ 每次 16px、Enter 收起或展开；宽度按用户记住；减少动态效果时收起和展开直接到位。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:10px 14px}
.win{display:grid;grid-template-rows:30px minmax(0,1fr);height:100%;max-width:640px;margin:0 auto;border:1px solid #e3e6eb;border-radius:12px;background:#fff;overflow:hidden;box-shadow:0 8px 24px -14px rgba(16,24,40,.25)}
.tb{display:flex;align-items:center;gap:6px;padding:0 6px 0 12px;border-bottom:1px solid #eef0f3;background:#fafbfc;color:#5b616e;font-size:12px}
.tb i{width:8px;height:8px;border-radius:50%;background:#e1e4ea}
.tb span{margin-left:6px;font-weight:600;color:#1f2329}
.tb .ctl{height:22px;margin-left:auto;padding:0 9px;border-radius:6px;font-size:11.5px}
.body{position:relative;display:grid;grid-template-columns:var(--w,120px) minmax(0,1fr);min-height:0}
.body.anim{transition:grid-template-columns .2s cubic-bezier(.2,0,0,1)}
.ns{user-select:none;-webkit-user-select:none}
.ls{min-width:0;margin:0;padding:6px;overflow:hidden auto;list-style:none;background:#f7f8fa;scrollbar-width:none}
.ls.off{visibility:hidden}
.ls li{display:grid;padding:5px 8px;border-radius:7px}
.ls li+li{margin-top:2px}
.ls .on{background:#e8edff}
.ls b,.ls small{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.ls b{font-size:12px;font-weight:600}
.ls small{color:#667085;font-size:11px}
.doc{min-width:0;padding:8px 14px;overflow:hidden}
.doc h3{margin:0;overflow:hidden;font-size:14px;white-space:nowrap;text-overflow:ellipsis}
.doc .meta{margin:0 0 6px;color:#8a909c;font-size:11px}
.doc ul{display:grid;gap:2px;margin:0;padding:0;list-style:none}
.doc li{display:flex;align-items:center;gap:6px;min-width:0;font-size:12px;white-space:nowrap}
.doc li::before{content:"";flex:none;width:11px;height:11px;border:1.5px solid #c4cad4;border-radius:3px}
.doc li.ok::before{border-color:#3b5bdb;background:#3b5bdb;box-shadow:inset 0 0 0 2px #fff}
.doc li span{overflow:hidden;text-overflow:ellipsis}
.gut{position:absolute;top:0;bottom:0;left:calc(var(--w,120px) - 5px);z-index:2;width:10px;cursor:col-resize;touch-action:none}
.body.anim .gut,.body.anim .wb{transition:left .2s cubic-bezier(.2,0,0,1)}
.gut::before{content:"";position:absolute;top:0;bottom:0;left:4.5px;width:1px;background:#e3e6eb}
.gut:hover::before,.gut:focus-visible::before,.drag .gut::before{left:4px;width:2px;background:#3b5bdb}
.gut:focus-visible{outline:none}
.fold .gut::before{background:#d92d20}
.wb{position:absolute;bottom:8px;left:var(--w,120px);transform:translateX(-50%);z-index:3;padding:1px 7px;border-radius:6px;background:#1f2329;color:#fff;font-size:11px;font-variant-numeric:tabular-nums;line-height:18px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .15s}
.show .wb{opacity:1}
.fold .wb{background:#b42318}
.exp{position:absolute;top:50%;left:4px;z-index:3;display:grid;place-items:center;width:18px;height:36px;margin-top:-18px;border:1px solid #d0d5dd;border-radius:9px;background:#fff;color:#475467;box-shadow:0 2px 6px rgba(16,24,40,.12)}
.exp svg{width:10px;height:10px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
@container (max-height:230px){.doc li:nth-child(n+5){display:none}
}
@container (min-width:560px){.ls{padding:8px}
.ls li{padding:7px 10px}
.ls b{font-size:13px}
.doc{padding:14px 20px}
.doc h3{font-size:16px}
.doc ul{gap:5px}
.doc li{font-size:13px}
}
@media (prefers-reduced-motion:reduce){.body.anim,.body.anim .gut,.body.anim .wb{transition:none}
}
</style>

<div class="st"><div class="win"><div class="tb"><i></i><i></i><i></i><span>笔记</span><button type="button" class="ctl rp">重播</button></div><div class="body"><ul class="ls" id="rs-ls" aria-label="笔记列表"><li class="on"><b>露营装备清单</b><small>帐篷、睡袋、头灯</small></li><li><b>周三选题会</b><small>三个方向还没定</small></li><li><b>读书笔记 · 第 3 章</b><small>习惯是怎么养成的</small></li><li><b>租房合同要点</b><small>押金和维修条款</small></li><li><b>年底体检预约</b><small>空腹，带身份证</small></li></ul><div class="gut" role="separator" tabindex="0" aria-orientation="vertical" aria-controls="rs-ls" aria-label="调整笔记列表宽度：←/→ 调整，Enter 收起或展开，双击恢复默认" aria-valuemin="0" aria-valuemax="100"></div><span class="wb" aria-hidden="true"></span><button type="button" class="exp" aria-label="展开笔记列表" hidden><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M3.5 2 6.5 5l-3 3"/></svg></button><article class="doc"><h3>露营装备清单</h3><p class="meta">10月26日 · 共 12 项</p><ul><li class="ok"><span>双人帐篷和地钉</span></li><li class="ok"><span>睡袋（舒适温度 5℃）</span></li><li><span>头灯和备用电池</span></li><li><span>折叠桌椅两套</span></li><li><span>保温壶、挂耳咖啡</span></li></ul></article></div></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const st = root.querySelector('.st'), body = root.querySelector('.body'), gut = root.querySelector('.gut'), wb = root.querySelector('.wb'), ls = root.querySelector('.ls'), exp = root.querySelector('.exp'), say = root.querySelector('.sr');
  const MINL = 104, MINR = 140; // 示例框很小，最小宽度按比例缩小；真实页面用 200 / 320
  let w = 0, last = 0, folded = false, d = null, hide = 0, tm = [];
  const max = () => body.clientWidth - MINR, def = () => Math.round(Math.max(MINL, Math.min(max(), body.clientWidth * 0.36)));
  const clamp = (v) => Math.round(Math.max(MINL, Math.min(max(), v)));
  const set = (v, anim) => {
    body.classList.toggle('anim', !!anim); if (anim) void body.offsetWidth;
    w = v; body.style.setProperty('--w', v + 'px');
    gut.setAttribute('aria-valuenow', String(Math.round(v / body.clientWidth * 100)));
    gut.setAttribute('aria-valuetext', folded ? '笔记列表已收起' : `笔记列表宽 ${v}px`);
    if (!body.classList.contains('fold')) wb.textContent = v + 'px';
  };
  const badge = (ms) => { clearTimeout(hide); body.classList.add('show'); if (ms) hide = setTimeout(() => body.classList.remove('show'), ms); };
  const fold = () => {
    folded = true; set(0, true); ls.inert = true; exp.hidden = false; body.classList.remove('show');
    setTimeout(() => { if (folded) ls.classList.add('off'); }, 200);
    say.textContent = '已收起笔记列表';
  };
  const unfold = (v, msg) => {
    folded = false; ls.inert = false; ls.classList.remove('off'); exp.hidden = true;
    set(clamp(v), true); last = w; badge(900); say.textContent = msg ?? `已展开笔记列表，宽 ${w}px`;
  };
  gut.addEventListener('pointerdown', (e) => {
    if (e.button > 0) return;
    e.preventDefault(); if (e.isTrusted) gut.focus({ preventScroll: true });
    const r = body.getBoundingClientRect();
    if (folded) { folded = false; ls.inert = false; ls.classList.remove('off'); exp.hidden = true; }
    d = { left: r.left, off: e.clientX - r.left - w };
    try { gut.setPointerCapture(e.pointerId); } catch {}
    body.classList.remove('anim'); body.classList.add('drag'); st.classList.add('ns'); badge();
  });
  gut.addEventListener('pointermove', (e) => {
    if (!d) return;
    const x = e.clientX - d.left - d.off, f = x < MINL - 40; // 继续往里拖超过 40px 就预告“松手收起”
    body.classList.toggle('fold', f);
    if (f) wb.textContent = '松手收起';
    set(clamp(x));
  });
  const up = () => {
    if (!d) return;
    d = null; st.classList.remove('ns'); body.classList.remove('drag');
    if (body.classList.contains('fold')) { body.classList.remove('fold'); return fold(); }
    last = w; badge(900); say.textContent = `笔记列表宽 ${w}px`;
  };
  gut.addEventListener('pointerup', up); gut.addEventListener('pointercancel', up);
  gut.addEventListener('dblclick', () => { unfold(def(), `已恢复默认宽度 ${def()}px`); });
  exp.addEventListener('click', () => { unfold(last || def()); gut.focus(); });
  gut.addEventListener('keydown', (e) => {
    const k = e.key;
    if (k === 'Enter') { e.preventDefault(); return folded ? unfold(last || def()) : fold(); }
    const v = { ArrowLeft: w - 16, ArrowRight: w + 16, Home: MINL, End: max() }[k];
    if (v === undefined) return;
    e.preventDefault();
    if (folded) return unfold(v);
    set(clamp(v)); last = w; badge(900); say.textContent = `笔记列表宽 ${w}px`;
  });
  new ResizeObserver(() => { if (!folded && w) set(clamp(w)); }).observe(body);
  // 自动演示：按住分隔条往右拖 48px，旁边显示实时宽度
  const play = () => {
    tm.forEach(clearTimeout); tm = [];
    if (folded) unfold(def(), ''); set(def()); last = w; say.textContent = '';
    const r = gut.getBoundingClientRect(), x0 = r.left + 5, y = r.top + r.height / 2, dx = Math.max(16, Math.min(48, max() - w - 4));
    const fire = (type, x) => gut.dispatchEvent(new PointerEvent(type, { bubbles: true, pointerId: 9, button: 0, clientX: x, clientY: y }));
    fire('pointerdown', x0);
    for (let k = 1; k <= 12; k++) tm.push(setTimeout(() => { if (root.host.isConnected) fire('pointermove', x0 + dx * k / 12); }, k * 40));
    tm.push(setTimeout(() => { if (root.host.isConnected) { fire('pointerup', x0 + dx); badge(1600); } }, 13 * 40 + 120));
  };
  set(def()); last = w;
  root.querySelector('.rp').addEventListener('click', play);
  tm.push(setTimeout(() => { if (root.host.isConnected) play(); }, 400));
}
</script>
