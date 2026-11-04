---
zh: 悬停预览
en: Hover preview
order: 20
---

## 是什么

鼠标停在人名或链接上片刻，浮出摘要卡片；移开有短暂缓冲，不用点进详情。

## 适合

评论和动态里的 @人名、关联单据号、表格中的对象名、文档里的引用链接。

## 不适合

关键信息或必需的操作不能只放在悬停卡里；触屏没有悬停，改为点击打开。

## 注意

打开延迟和离开缓冲都要有，否则鼠标划过时卡片乱闪。

## 要点

- 鼠标停留约 400ms 再打开；已有卡片打开时移到相邻触发点立即换内容。
- 离开触发点后留 150–200ms 缓冲，鼠标移进卡片则保持打开，方便点卡片里的按钮。
- 卡片宽 220–320px，优先出现在触发点下方，空间不够翻到上方，并限制在可视区域内。
- 键盘聚焦触发点时立即显示，Esc 关闭并保持焦点在触发点。
- 触屏：点击打开（卡片里放“查看详情”），点空白处关闭。
- 内容按需加载，加载中显示与卡片同尺寸的骨架；失败只显示名称和“打开详情”。
- 只在 hover: hover 且 pointer: fine 的设备上启用悬停打开。

## 提示词

给{人名 / 单据链接}加「悬停预览卡」：鼠标停留 400ms 后在下方浮出 240px 宽的摘要卡（{头像、名称、角色、关键数据、主要操作}），空间不够翻到上方；离开后有 200ms 缓冲，移进卡片保持打开；键盘聚焦时立即显示，Esc 关闭；触屏改为点击打开、点空白关闭；内容加载中显示骨架；关键操作在详情页也能找到。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:14px 18px}
.feed{display:flex;flex-direction:column;gap:8px;max-width:520px;margin:0 auto}
.feed p{margin:0;padding:10px 12px;background:#fff;border:1px solid #e3e6eb;border-radius:10px;line-height:1.7}
.m{padding:0;border:0;border-radius:4px;background:none;color:#3b5bdb;font-weight:500}
.m:hover,.m[aria-expanded=true]{background:#edf1ff}
.card{position:absolute;z-index:3;width:236px;padding:12px;background:#fff;border:1px solid #e3e6eb;border-radius:10px;box-shadow:0 8px 24px rgba(31,35,41,.16);opacity:0;visibility:hidden;transform:translateY(4px);transition:opacity .16s,transform .16s,visibility 0s .16s}
.card.on{opacity:1;visibility:visible;transform:none;transition-delay:0s}
.hd{display:flex;align-items:center;gap:10px}
.av{display:grid;place-items:center;flex:none;width:34px;height:34px;border-radius:50%;background:#edf1ff;color:#3b5bdb;font-weight:600}
.av.sq{border-radius:8px;font-size:12px}
.hd b{display:block;font-weight:600}
.hd small{color:#5b616e;font-size:12px}
.card p{margin:8px 0;color:#5b616e;font-size:12px}
.card .go{height:28px;padding:0 10px;border:1px solid #e3e6eb;border-radius:6px;background:#fff;font-size:12px}
.card .go:hover{border-color:#c3c9d4}
</style>

<div class="st"><div class="feed"><p><button class="m" type="button" data-p="0">@周以宁</button> 把 <button class="m" type="button" data-p="1">需求单 #2318</button> 的状态改成了“开发中”。</p><p><button class="m" type="button" data-p="2">@林知远</button> 评论：结算页空状态的文案再短一点，按钮写清楚去哪。</p></div><div class="card" id="pv" role="group" aria-label="预览"></div></div>

<script type="module">
export default function demo(root) {
  const P = [['周', '周以宁', '产品经理 · 增长组', '本周处理 12 个需求，今天 18:00 前在线。', '发消息'], ['需', '退款到账提醒优化', '需求单 #2318 · 开发中', '负责人 林知远 · 截止 10-31 · 3 个子任务', '打开需求单'], ['林', '林知远', '前端工程师 · 交易组', '正在开发需求单 #2318。', '发消息']];
  const st = root.querySelector('.st'), card = root.querySelector('.card'), trig = [...root.querySelectorAll('.m')];
  let cur = null, tOpen = 0, tClose = 0;
  const place = (t) => {
    const s = st.getBoundingClientRect(), r = t.getBoundingClientRect(), w = card.offsetWidth, h = card.offsetHeight;
    const x = Math.max(8, Math.min(r.left - s.left, s.width - w - 8));
    const below = r.bottom - s.top + 6, above = r.top - s.top - h - 6; // 下方放不下就翻到上方
    card.style.left = x + 'px'; card.style.top = Math.max(4, below + h <= s.height - 4 || above < 4 ? Math.min(below, s.height - h - 4) : above) + 'px';
  };
  const open = (t) => {
    clearTimeout(tClose); clearTimeout(tOpen);
    if (cur && cur !== t) cur.setAttribute('aria-expanded', 'false');
    cur = t; t.setAttribute('aria-expanded', 'true');
    const [a, n, sub, txt, btn] = P[t.dataset.p];
    card.innerHTML = `<div class="hd"><span class="av${t.dataset.p === '1' ? ' sq' : ''}" aria-hidden="true">${a}</span><div><b>${n}</b><small>${sub}</small></div></div><p>${txt}</p><button type="button" class="go">${btn}</button>`;
    place(t); card.classList.add('on');
  };
  const close = () => { clearTimeout(tOpen); if (cur) cur.setAttribute('aria-expanded', 'false'); cur = null; card.classList.remove('on'); };
  trig.forEach((t) => {
    t.setAttribute('aria-expanded', 'false'); t.setAttribute('aria-controls', 'pv');
    t.addEventListener('pointerenter', (e) => { if (e.pointerType !== 'mouse') return; clearTimeout(tClose); clearTimeout(tOpen); tOpen = setTimeout(() => open(t), cur ? 0 : 400); });
    t.addEventListener('pointerleave', (e) => { if (e.pointerType !== 'mouse') return; clearTimeout(tOpen); tClose = setTimeout(close, 200); });
    t.addEventListener('focus', () => open(t)); // 键盘聚焦立即显示
    t.addEventListener('click', () => open(t)); // 触屏：点击打开
  });
  card.addEventListener('pointerenter', () => clearTimeout(tClose));
  card.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') tClose = setTimeout(close, 200); });
  st.addEventListener('focusout', (e) => { if (cur && !card.contains(e.relatedTarget) && !trig.includes(e.relatedTarget)) close(); });
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && cur) { e.preventDefault(); const t = cur; close(); t.focus(); close(); } });
  root.addEventListener('pointerdown', (e) => { if (cur && !card.contains(e.target) && !e.target.closest('.m')) close(); });
  requestAnimationFrame(() => open(trig[0]));
}
</script>
