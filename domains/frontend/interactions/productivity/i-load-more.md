---
zh: 无限滚动与加载更多
en: Load more
order: 30
---

## 是什么

信息流滚到底自动加载；要定位、要看页脚的列表用按钮加载，底部都有三种状态。

## 适合

自动加载用于信息流、推荐、聊天记录；“加载更多”用于搜索结果、评论、有页脚的页面；后台表格用分页。

## 不适合

需要定位、比较、批量处理或回到某一条的数据不要用无限滚动，用分页。

## 注意

无限滚动的页面不要把重要链接放在页脚，用户永远滚不到。

## 要点

- 选择：信息流用自动加载；需要看到页脚或控制节奏的用“加载更多”按钮；需要跳页、批量处理的表格用分页。
- 自动加载用 IntersectionObserver 监听底部哨兵，提前 200–400px 触发，不在 scroll 事件里计算位置。
- 底部三态：正在加载…（转圈）/ 没有更多了 · 共 N 条 / 加载失败，点击重试；失败后不自动无限重试。
- 按钮写明剩余量：“加载更多（还剩 8 条）”。
- 同一时间只发一个请求；加载完成后哨兵仍在可视区则继续加载。
- 从详情返回时恢复已加载的条数和滚动位置。
- 超过约 200 条时考虑虚拟列表，并保留搜索和定位能力。

## 提示词

给{列表}选择合适的加载方式：{信息流}用滚动自动加载（IntersectionObserver 监听底部，提前 300px 触发），{需要看页脚 / 定位}的用“加载更多（还剩 N 条）”按钮，需要跳页或批量处理的用分页；底部有正在加载 / 没有更多了 / 加载失败点击重试三态，失败不自动重试；同时只发一个请求；从详情返回时恢复已加载条数和滚动位置。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:10px 12px}
.box{display:flex;flex-direction:column;gap:8px;max-width:520px;height:100%;margin:0 auto}
.top{flex:none;display:flex;align-items:center;justify-content:space-between;gap:8px}
.seg{display:flex;padding:2px;border-radius:8px;background:#e9ecf1}
.seg button{height:26px;padding:0 10px;border:0;border-radius:6px;background:none;color:#5b616e;font-size:12px;white-space:nowrap}
.seg button[aria-checked=true]{background:#fff;color:#1f2329;font-weight:600;box-shadow:0 1px 2px rgba(31,35,41,.12)}
.sc{flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;background:#fff;border:1px solid #e3e6eb;border-radius:10px}
.list{margin:0;padding:0 12px;list-style:none}
.list li{display:flex;align-items:center;gap:8px;height:30px;border-bottom:1px solid #e3e6eb}
.list li.new{animation:fl .8s}
@keyframes fl{from{background:#edf1ff}
}
.no{flex:none;width:22px;color:#8a909c;font-size:12px;font-variant-numeric:tabular-nums}
.list b{flex:1;min-width:0;overflow:hidden;font-weight:500;text-overflow:ellipsis;white-space:nowrap}
.list small{color:#5b616e;font-size:12px}
.foot{display:flex;align-items:center;justify-content:center;gap:8px;min-height:40px;color:#5b616e;font-size:12px}
.foot button{height:28px;padding:0 12px;border:1px solid #e3e6eb;border-radius:999px;background:#fff;font-size:12px}
.foot button:hover{border-color:#c3c9d4}
.foot .retry{border-color:#f3c3be;color:#d92d20}
@container (min-width:560px){.list li{height:38px}
}
</style>

<div class="st"><div class="box"><div class="top"><div class="seg" role="radiogroup" aria-label="加载方式"><button type="button" role="radio" aria-checked="true" data-m="btn">按钮加载</button><button type="button" role="radio" aria-checked="false" data-m="auto">滚动自动加载</button></div><label class="sw"><input type="checkbox" class="fail"><i aria-hidden="true"></i>模拟失败</label></div><div class="sc"><ul class="list"></ul><div class="foot" role="status"></div></div></div></div>

<script type="module">
export default function demo(root) {
  const T = ['新版结算页上线复盘', '如何写好空状态文案', '表格列宽的取舍', '一次弱网排查记录', '移动端表单的减法', '图表配色的五条规则', '加载指示的时机', '从需求到验收的清单', '撤销比确认更好用', '快捷键设计小记', '筛选状态写进地址栏', '拖拽排序的键盘替代'];
  const sc = root.querySelector('.sc'), list = root.querySelector('.list'), foot = root.querySelector('.foot'), fail = root.querySelector('.fail'), segs = [...root.querySelectorAll('.seg button')];
  const PAGE = 3; let n = 0, mode = 'btn', loading = false, failed = false;
  const append = () => { for (let i = 0; i < PAGE && n < T.length; i++, n++) { const li = document.createElement('li'); if (n >= PAGE) li.className = 'new'; li.innerHTML = `<span class="no">${n + 1}</span><b>${T[n]}</b><small>${(n * 7) % 50 + 2} 分钟前</small>`; list.append(li); } };
  const drawFoot = () => {
    foot.replaceChildren();
    const btn = (text, cls) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = text; if (cls) b.className = cls; b.onclick = load; foot.append(b); };
    if (loading) { foot.innerHTML = '<i class="sp" aria-hidden="true"></i>正在加载…'; return; }
    if (failed) return btn('加载失败，点击重试', 'retry');
    if (n >= T.length) { foot.textContent = `没有更多了 · 共 ${T.length} 条`; return; }
    if (mode === 'btn') btn(`加载更多（还剩 ${T.length - n} 条）`);
  };
  const nearBottom = () => foot.getBoundingClientRect().top - sc.getBoundingClientRect().bottom < 120; // 与观察器的 rootMargin 一致
  const load = () => {
    if (loading || n >= T.length) return; // 同一时间只发一个请求
    loading = true; failed = false; drawFoot();
    setTimeout(() => {
      if (!root.host.isConnected) return;
      loading = false; if (fail.checked) failed = true; else append();
      drawFoot(); if (mode === 'auto' && !failed && nearBottom()) load(); // 加载完哨兵还在可视区就继续
    }, 700);
  };
  new IntersectionObserver((es) => { if (es[0].isIntersecting && mode === 'auto' && !failed && root.host.isConnected) load(); }, { root: sc, rootMargin: '0px 0px 120px 0px' }).observe(foot);
  const setMode = (m) => { mode = m; segs.forEach((b) => { b.setAttribute('aria-checked', String(b.dataset.m === m)); b.tabIndex = b.dataset.m === m ? 0 : -1; }); n = 0; failed = false; list.replaceChildren(); append(); sc.scrollTop = 0; drawFoot(); if (m === 'auto' && nearBottom()) load(); }; // 切到自动模式时哨兵可能已在可视区，观察器不会再触发
  segs.forEach((b) => { b.onclick = () => setMode(b.dataset.m); });
  root.querySelector('.seg').addEventListener('keydown', (e) => { if (['ArrowLeft', 'ArrowRight'].includes(e.key)) { e.preventDefault(); const m = mode === 'btn' ? 'auto' : 'btn'; setMode(m); segs.find((b) => b.dataset.m === m).focus(); } });
  setMode('btn');
}
</script>
