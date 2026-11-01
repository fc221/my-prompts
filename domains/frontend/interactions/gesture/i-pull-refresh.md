---
zh: 下拉刷新
en: Pull to refresh
order: 70
---

## 是什么

在列表顶部继续往下拉，提示从“下拉刷新”变成“松开刷新”，松手后加载最新内容。

## 适合

移动端信息流、消息列表、订单列表等需要手动拉取最新数据的页面。

## 不适合

桌面端不用下拉手势，放一个刷新按钮；数据实时推送的页面不需要下拉刷新。

## 注意

只在滚动到顶部时接管手势，其他时候保持原生滚动。

## 要点

- 只在列表 scrollTop 为 0 且向下拉时接管；列表设 overscroll-behavior: contain，避免触发浏览器自带的下拉刷新。
- 位移按 0.5 倍阻尼跟随，最多拉到约 80–90px。
- 拉过阈值（约 44–56px）时箭头翻转、文案变“松开刷新”；不到阈值松手回弹。
- 刷新中指示器停在约 44px 高度，显示转圈和“刷新中…”，期间再拉不重复请求。
- 完成后提示“已更新 3 条”或“已是最新”，约 0.7 秒后收起，新条目高亮一下。
- 失败时提示原因，保留旧数据，不清空列表。
- 同时提供可点击的刷新入口（如顶栏按钮），结果用 role="status" 播报。

## 提示词

给{移动端列表}加「下拉刷新」：只在列表滚到顶部且向下拉时接管手势，位移按 0.5 倍阻尼跟随、最多 88px；超过 50px 时箭头翻转并提示“松开刷新”，不到就回弹；刷新中指示器停在顶部显示“刷新中…”，期间不重复请求；完成后提示“已更新 N 条 / 已是最新”并高亮新条目；失败保留旧数据并说明；列表设 overscroll-behavior: contain；顶栏另放刷新按钮。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;place-items:center;padding:10px}
.ph{display:flex;flex-direction:column;width:100%;max-width:340px;height:100%;background:#fff;border:1px solid #e3e6eb;border-radius:14px;overflow:hidden}
.top{flex:none;display:flex;align-items:center;justify-content:space-between;height:38px;padding:0 4px 0 14px;border-bottom:1px solid #e3e6eb}
.rf{display:grid;place-items:center;width:32px;height:32px;border:0;border-radius:8px;background:none;color:#5b616e}
.rf:hover{background:#f5f6f8}
.rf svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.sc{position:relative;flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;touch-action:pan-x pan-down;user-select:none}
.ind{position:absolute;top:0;left:0;right:0;display:flex;align-items:center;justify-content:center;gap:6px;height:44px;color:#5b616e;font-size:12px;transform:translateY(-44px)}
.ind svg{width:14px;height:14px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;transition:transform .2s}
.ready .ind svg{transform:rotate(180deg)}
.busy .ind svg{display:none}
.busy .ind::before{content:"";width:12px;height:12px;border:2px solid #c9ced6;border-top-color:#3b5bdb;border-radius:50%;animation:kbsp .8s linear infinite}
.list{margin:0;padding:0;list-style:none;background:#fff}
.list,.ind{transition:transform .24s cubic-bezier(.2,0,0,1)}
.pull .list,.pull .ind{transition:none}
.list li{display:flex;align-items:center;gap:10px;padding:8px 14px;border-bottom:1px solid #e3e6eb}
.av{display:grid;place-items:center;flex:none;width:28px;height:28px;border-radius:50%;background:#edf1ff;color:#3b5bdb;font-size:12px;font-weight:600}
.tx{flex:1;min-width:0;line-height:1.4}
.tx b{font-weight:600}
.tx span{display:block;overflow:hidden;color:#5b616e;font-size:12px;text-overflow:ellipsis;white-space:nowrap}
.list li.new{animation:fl 1.4s}
@keyframes fl{from{background:#edf1ff}
}
@media (prefers-reduced-motion:reduce){.busy .ind::before{animation-duration:.8s!important;animation-iteration-count:infinite!important}
}
</style>

<div class="st"><div class="ph"><div class="top"><b>动态</b><button type="button" class="rf" aria-label="刷新"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"/></svg></button></div><div class="sc"><div class="ind" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M8 3v10m0 0l-4-4m4 4l4-4"/></svg><span class="lab">下拉刷新</span></div><ul class="list"></ul></div><p class="sr" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const sc = root.querySelector('.sc'), list = root.querySelector('.list'), ind = root.querySelector('.ind'), lab = root.querySelector('.lab'), live = root.querySelector('.sr');
  const FEED = [['苏墨', '发布了新版结算页设计稿 · 3 分钟前'], ['林知远', '把评审改到了周五下午 · 12 分钟前'], ['财务部', '本月报销截止 28 日 · 1 小时前'], ['陈一鸣', '上传了客户访谈录音 · 昨天']];
  const NEW = [[['周以宁', '确认了 Q4 预算草案 · 刚刚'], ['何小满', '回复了你的评论 · 刚刚']]];
  const item = ([n, t], fresh) => { const li = document.createElement('li'); if (fresh) li.className = 'new'; li.innerHTML = `<span class="av" aria-hidden="true">${n[0]}</span><div class="tx"><b>${n}</b><span>${t}</span></div>`; return li; };
  list.append(...FEED.map((f) => item(f)));
  const H = 44, MAX = 88; let y0 = null, id = null, pull = 0, busy = false;
  const setPull = (p) => { pull = p; list.style.transform = p ? `translateY(${p}px)` : ''; ind.style.transform = `translateY(${p - H}px)`; };
  // 在顶部时只放行“向下滚内容”的原生手势，向下拉交给脚本；滚动后恢复正常纵向滚动
  sc.addEventListener('scroll', () => { sc.style.touchAction = sc.scrollTop > 0 ? 'pan-y' : ''; }, { passive: true });
  sc.addEventListener('pointerdown', (e) => { if (busy || sc.scrollTop > 0 || e.button > 0) return; y0 = e.clientY; id = e.pointerId; });
  sc.addEventListener('pointermove', (e) => {
    if (y0 === null || e.pointerId !== id) return;
    const dy = e.clientY - y0;
    if (dy <= 0) { if (pull) setPull(0); return; }
    if (!sc.classList.contains('pull')) { sc.setPointerCapture(id); sc.classList.add('pull'); }
    const p = Math.min(MAX, dy * 0.5), ready = p >= H; setPull(p); // 0.5 倍阻尼
    sc.classList.toggle('ready', ready); lab.textContent = ready ? '松开刷新' : '下拉刷新';
  });
  const refresh = () => {
    if (busy) return; busy = true; sc.scrollTop = 0;
    sc.classList.remove('ready'); sc.classList.add('busy'); lab.textContent = '刷新中…'; setPull(H);
    setTimeout(() => {
      if (!root.host.isConnected) return;
      const batch = NEW.shift() || [];
      list.prepend(...batch.map((f) => item(f, true)));
      lab.textContent = batch.length ? `已更新 ${batch.length} 条` : '已是最新'; live.textContent = lab.textContent; sc.classList.remove('busy');
      setTimeout(() => { if (!root.host.isConnected) return; setPull(0); busy = false; setTimeout(() => { lab.textContent = '下拉刷新'; }, 240); }, 700);
    }, 900);
  };
  const end = () => {
    if (y0 === null) return; y0 = null;
    const was = sc.classList.contains('pull'); sc.classList.remove('pull'); if (!was) return;
    if (pull >= H) refresh(); else { setPull(0); sc.classList.remove('ready'); lab.textContent = '下拉刷新'; }
  };
  sc.addEventListener('pointerup', end); sc.addEventListener('pointercancel', end);
  root.querySelector('.rf').onclick = refresh;
}
</script>
