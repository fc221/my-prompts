---
zh: 多列下拉导航
en: Mega menu
order: 90
---

## 是什么

顶栏的某个栏目展开成一整块宽面板，里面按组分成几列，每组一个小标题加几条真实链接，可以带一行说明。

## 适合

栏目多、二级入口有 10–30 个的官网、电商、文档站和后台顶栏。

## 不适合

二级入口少于 7 个用普通下拉；要执行的命令（导出、删除）用下拉菜单；手机上改成抽屉里的折叠分组。

## 注意

鼠标从栏目斜着移向面板时，路上会短暂离开触发区：要有关闭延迟，面板也要紧贴顶栏，否则一移就关。

## 要点

- 面板紧贴顶栏下沿，中间不留缝；宽度和内容区一致，分 2–4 列，每列一个分组标题和 3–7 条链接，底部给“查看全部{类别}”
- 悬停 100–150ms 后再打开，离开“栏目 + 面板”整片区域 300ms 后才关；已打开时移到另一个栏目直接换内容，不先收再开
- 点击也能开关（触屏只有点击）；悬停刚打开的面板，紧接着那一下点击不把它关掉；栏目用 button + aria-expanded + aria-controls，面板里是普通链接，不用 role="menu"
- 键盘：Enter / 空格开关，↓ 打开并聚焦第一条链接，Tab 按顺序走完，Esc 关闭并回到栏目，焦点移出面板时关闭
- 只放真实存在的页面，不用营销卡片把列凑满；当前所在页的链接加 aria-current
- 打开时淡入加 4–6px 下移，160–200ms；关闭直接收起；切换栏目只换内容不加动画；减少动态效果时直接出现
- 窄于 768px 时改成抽屉里的折叠分组，一次展开一组

## 提示词

给{产品}的顶栏做「多列下拉导航」：{栏目，如 产品、方案、资源}各自展开为紧贴顶栏、和内容区等宽的面板，分 {列数} 列，每列一个分组标题加 3–7 条真实链接（可带一行说明），底部“查看全部”；悬停 120ms 打开，离开栏目和面板整片区域 300ms 后关闭，已打开时移到相邻栏目直接换内容；点击也能开关，悬停刚打开时紧接着的点击不关闭；栏目用 button + aria-expanded + aria-controls，面板内是普通链接，不用 role="menu"，当前页链接加 aria-current；Enter / 空格开关，↓ 打开并聚焦第一条，Esc 关闭并回到栏目，焦点移出即关闭；打开淡入下移 180ms，关闭直接收起，切换栏目只换内容不重播动画，减少动态效果时直接出现；窄于 768px 改为抽屉内按栏目折叠的分组，一次展开一组，抽屉里 Esc 关闭整个抽屉。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{padding:10px;place-items:stretch;container-type:size}
.win{position:relative;display:flex;flex-direction:column;width:100%;max-width:680px;height:100%;margin:0 auto;background:#fff;border:1px solid #e3e6eb;border-radius:10px;overflow:hidden}
.bar{position:relative;z-index:3;flex:none;display:flex;align-items:center;gap:2px;height:40px;padding:0 6px 0 12px;background:#fff;border-bottom:1px solid #e3e6eb}
.logo{display:flex;align-items:center;gap:5px;margin-right:8px;font-size:14px;white-space:nowrap}
.logo svg{width:18px;height:18px;color:#12805c}
nav{display:flex;align-self:stretch;min-width:0;margin-right:auto}
.tr,.lk{display:flex;align-items:center;gap:3px;padding:0 8px;border:0;border-bottom:2px solid transparent;background:none;color:#5b616e;font-size:13px;text-decoration:none;white-space:nowrap}
.tr:hover,.lk:hover{color:#1f2329}
.tr svg{width:12px;height:12px;transition:transform .16s}
.tr[aria-expanded=true]{color:#1f2329;border-bottom-color:#12805c}
.tr[aria-expanded=true] svg{transform:rotate(180deg)}
.ic{display:grid;place-items:center;width:32px;height:32px;border:0;border-radius:8px;background:none;color:#5b616e}
.ic:hover{background:#f5f6f8;color:#1f2329}
.mp{position:absolute;z-index:2;left:0;right:0;top:40px;padding:10px 14px 0;background:#fff;border-bottom:1px solid #e3e6eb;box-shadow:0 12px 24px rgba(15,17,22,.12)}
.mp.in{animation:drop .18s cubic-bezier(0,0,.2,1)}
@keyframes drop{from{opacity:0;transform:translateY(-6px)}
}
.cols{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px 14px}
.cols h4{margin:0 0 2px;color:#8a909c;font-size:11px;font-weight:600;line-height:16px}
.cols ul{list-style:none;margin:0;padding:0}
.cols a{display:block;margin:0 -6px;padding:1px 6px;border-radius:6px;color:#1f2329;font-size:12px;line-height:18px;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cols a:hover{background:#f0f5f2;color:#0c6b4b}
.cols a[aria-current=page]{color:#12805c;font-weight:600}
.cols a small{display:none;color:#8a909c;font-size:11px;font-weight:400}
.all{display:flex;margin:6px -14px 0;padding:0 14px;height:26px;align-items:center;border-top:1px solid #eef0f3;background:#fafbfc;color:#12805c;font-size:12px;text-decoration:none}
.all:hover{text-decoration:underline}
.body{flex:1;display:grid;align-content:start;gap:8px;padding:12px 14px}
.crumb{color:#8a909c;font-size:12px}
.h{font-size:15px;outline-offset:3px}
.ln.w{width:60%}
@media (prefers-reduced-motion:reduce){.mp.in{animation:none}
.tr svg{transition:none}
}
@container (max-width:320px){.xl{display:none}
.tr,.lk{padding:0 6px}
}
@container (min-height:250px){.bar{height:48px;padding:0 10px 0 16px}
.mp{top:48px;padding:14px 20px 0}
.cols{gap:8px 24px}
.cols h4{font-size:12px;margin-bottom:4px}
.cols a{padding:3px 6px;font-size:13px}
.cols a small{display:block}
.all{margin:12px -20px 0;padding:0 20px;height:32px}
.body{padding:16px 20px}
}
</style>

<div class="s"><div class="win"><header class="bar"><b class="logo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="m3 19 6-10 4 6 3-4 5 8z"/></svg>山野</b><nav aria-label="主导航"><button type="button" class="tr" data-k="gear" aria-expanded="false" aria-controls="mp">装备<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button><button type="button" class="tr" data-k="route" aria-expanded="false" aria-controls="mp">路线<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button><a href="#" class="lk">社区</a><a href="#" class="lk xl">门店</a></nav><button type="button" class="ic" aria-label="搜索"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg></button></header><div class="mp" id="mp" role="region" hidden></div><main class="body"><p class="crumb">首页</p><b class="h" tabindex="-1">本周推荐</b><i class="ln"></i><i class="ln w"></i><p class="sr" role="status"></p></main></div></div>

<script type="module">
export default function demo(root) {
  // 每个栏目：[分组标题, [[链接, 一行说明], …]]
  const M = {
    gear: { name: '装备', groups: [['露营', [['帐篷', '一到四人'], ['睡袋', '舒适温标 −10 ~ 15°C'], ['炉具餐具', '套锅、气罐、头灯']]], ['徒步', [['登山鞋', '低帮 / 中帮'], ['背包', '20–65 L'], ['登山杖', '折叠 / 伸缩']]], ['服装', [['冲锋衣', '防水透气'], ['速干衣', '长袖 / 短袖'], ['抓绒衣', '中间保暖层']]]] },
    route: { name: '路线', groups: [['按难度', [['入门', '半天、爬升 300 m 内'], ['进阶', '一天、爬升 800 m 内'], ['挑战', '多日重装']]], ['按地区', [['华东', '42 条'], ['西南', '57 条'], ['西北', '31 条']]], ['按季节', [['春季赏花', '3–5 月'], ['秋季红叶', '10–11 月'], ['冬季雪线', '12–2 月']]]] },
  };
  const mp = root.querySelector('.mp'), trs = [...root.querySelectorAll('.tr')], h = root.querySelector('.h'), crumb = root.querySelector('.crumb'), out = root.querySelector('[role=status]'), win = root.querySelector('.win');
  let open = null, openedAt = 0, tOpen = 0, tClose = 0, cur = '';
  const fill = (k) => {
    const m = M[k];
    mp.setAttribute('aria-label', m.name);
    mp.innerHTML = `<div class="cols">${m.groups.map(([g, ls]) => `<div><h4>${g}</h4><ul>${ls.map(([t, d]) => `<li><a href="#" data-g="${g}" ${cur === t ? 'aria-current="page"' : ''}>${t}<small>${d}</small></a></li>`).join('')}</ul></div>`).join('')}</div><a href="#" class="all" data-g="">查看全部${m.name} →</a>`;
  };
  const show = (k) => {
    clearTimeout(tOpen); clearTimeout(tClose);
    if (open === k) return;
    const fresh = !open; open = k; openedAt = performance.now(); fill(k);
    trs.forEach((t) => t.setAttribute('aria-expanded', String(t.dataset.k === k)));
    mp.hidden = false;
    if (fresh) { mp.classList.remove('in'); void mp.offsetWidth; mp.classList.add('in'); } // 已打开时切换栏目只换内容，不重播动画
  };
  const close = (back) => {
    clearTimeout(tOpen); clearTimeout(tClose); if (!open) return;
    const t = trs.find((x) => x.dataset.k === open); open = null; mp.hidden = true;
    trs.forEach((x) => x.setAttribute('aria-expanded', 'false'));
    if (back) t.focus();
  };
  const later = () => { clearTimeout(tClose); tClose = setTimeout(() => { if (root.host.isConnected) close(); }, 300); };
  trs.forEach((t) => {
    t.addEventListener('pointerenter', (e) => { if (e.pointerType !== 'mouse') return; clearTimeout(tClose); if (open) show(t.dataset.k); else tOpen = setTimeout(() => { if (root.host.isConnected) show(t.dataset.k); }, 120); });
    t.addEventListener('pointerleave', (e) => { if (e.pointerType !== 'mouse') return; clearTimeout(tOpen); later(); });
    // 悬停刚打开时紧跟着的点击不收起，避免“一点就关”
    t.addEventListener('click', () => { if (open === t.dataset.k) { if (performance.now() - openedAt > 400) close(); } else show(t.dataset.k); });
    t.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown') { e.preventDefault(); show(t.dataset.k); mp.querySelector('a').focus(); } });
  });
  mp.addEventListener('pointerenter', () => clearTimeout(tClose));
  mp.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') later(); });
  win.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) { e.preventDefault(); close(true); } });
  win.addEventListener('focusout', (e) => { if (open && !(e.relatedTarget && (mp.contains(e.relatedTarget) || trs.includes(e.relatedTarget)))) close(); });
  mp.addEventListener('click', (e) => {
    const a = e.target.closest('a'); if (!a) return;
    e.preventDefault();
    const m = M[open], t = a.firstChild.textContent;
    cur = a.dataset.g ? t : ''; h.textContent = a.dataset.g ? t : `全部${m.name}`;
    crumb.textContent = ['首页', m.name, a.dataset.g].filter(Boolean).join(' › ');
    out.textContent = '已打开：' + h.textContent;
    close(); h.focus();
  });
  root.querySelectorAll('.lk').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); close(); cur = ''; h.textContent = a.textContent; crumb.textContent = '首页 › ' + a.textContent; out.textContent = '已打开：' + a.textContent; }));
  setTimeout(() => { if (root.host.isConnected) show('gear'); }, 400);
}
</script>
