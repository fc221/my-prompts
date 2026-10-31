---
zh: 引导浮层
en: Product tour
order: 110
---

## 是什么

新功能上线时背景压暗，目标区域被“挖空”高亮，旁边的气泡分步讲解。

## 适合

新功能第一次出现、界面改版后的关键变化，1–4 步讲完。

## 不适合

不做强制看完的长教程；能用界面文案或空状态说清的不用引导；同一页面不叠多个引导。

## 要点

- 1–4 步，每步一句标题 + 一句说明，显示“2 / 3”步数
- 目标区域挖空高亮（外扩 4–8px、带圆角），其余压暗；气泡贴着目标、带箭头
- 随时可以“跳过”，Esc 等于跳过；最后一步按钮写“完成”
- 只出现一次并记录已看过；帮助菜单里可以重新查看
- 用户主动打开时焦点进入气泡，切换步骤读屏能听到新内容；自动弹出时不抢焦点
- 目标不在视口时先滚动过去；窄屏气泡改为贴底卡片

## 提示词

为{新功能}做「引导浮层」，共 {1–4} 步：背景压暗，目标区域挖空高亮（外扩 4–8px、圆角），旁边气泡带箭头，写一句标题 + 一句说明，显示“2 / 3”，按钮“跳过 / 下一步”，最后一步写“完成”；Esc 等于跳过；目标不在视口时先滚动过去；用户主动打开时焦点进入气泡，切换步骤读屏能听到新内容；只出现一次并记录已看过，帮助菜单可重看；窄屏气泡改为贴底卡片。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{padding:8px}
.app{width:100%;max-width:560px;height:100%;padding:12px;background:#fff;border:1px solid #e3e6eb;border-radius:10px;display:flex;flex-direction:column;gap:10px}
.tb{display:flex;align-items:center;gap:8px}
.sch{flex:1;min-width:0;display:flex;align-items:center;gap:6px;height:32px;padding:0 10px;border:1px solid #e3e6eb;border-radius:8px;color:#5b616e;font-size:13px;white-space:nowrap}
.ln.w{width:60%}
.start{align-self:flex-start;margin-top:auto}
.hole{position:absolute;z-index:4;border-radius:10px;box-shadow:0 0 0 2px #fff,0 0 0 9999px rgba(15,17,22,.45);pointer-events:none;transition:top .24s,left .24s,width .24s,height .24s}
.bub{position:absolute;z-index:5;width:220px;max-width:calc(100% - 16px);padding:12px 14px;background:#fff;border-radius:10px;box-shadow:0 12px 32px rgba(15,17,22,.2);display:grid;gap:2px;transition:top .24s,left .24s}
.bub::before{content:"";position:absolute;top:-5px;left:var(--ax,24px);width:10px;height:10px;background:#fff;transform:rotate(45deg)}
#bd{font-size:13px;color:#5b616e}
.ft{display:flex;align-items:center;gap:6px;margin-top:8px}
.cnt{margin-right:auto;font-variant-numeric:tabular-nums}
@media (prefers-reduced-motion:reduce){.hole,.bub{transition:none}
}
</style>

<div class="s"><div class="app"><div class="tb"><button class="b p" data-t="0">＋ 新建</button><span class="sch" data-t="1"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>搜索文件</span><button class="b" data-t="2">导出</button></div><i class="ln"></i><i class="ln"></i><i class="ln w"></i><button class="b t sm start">重新查看引导</button></div><div class="hole" hidden></div><div class="bub" role="dialog" aria-labelledby="bt" aria-describedby="bd" hidden><b id="bt"></b><p id="bd"></p><div class="ft"><span class="muted cnt"></span><button class="b t sm skip">跳过</button><button class="b p sm nx">下一步</button></div></div></div>

<script type="module">
export default function demo(root) {
  const T = [['新建项目', '从空白或模板创建项目'], ['全局搜索', '按文件名或内容搜索'], ['一键导出', '导出为 Excel 或 PDF']];
  const st = root.querySelector('.s'), app = root.querySelector('.app'), hole = root.querySelector('.hole'), bub = root.querySelector('.bub'), nx = bub.querySelector('.nx'), start = root.querySelector('.start'); let i = 0;
  const place = () => {
    const t = root.querySelector('[data-t="' + i + '"]').getBoundingClientRect(), b = st.getBoundingClientRect(), x = t.left - b.left - 4, y = t.top - b.top - 4;
    Object.assign(hole.style, { left: x + 'px', top: y + 'px', width: t.width + 8 + 'px', height: t.height + 8 + 'px' });
    const bl = Math.min(Math.max(8, x), b.width - bub.offsetWidth - 8);
    bub.style.left = bl + 'px'; bub.style.top = y + t.height + 18 + 'px'; bub.style.setProperty('--ax', Math.max(12, x + t.width / 2 - bl - 1) + 'px');
    bub.querySelector('.cnt').textContent = (i + 1) + ' / ' + T.length; bub.querySelector('#bt').textContent = T[i][0]; bub.querySelector('#bd').textContent = T[i][1];
    nx.textContent = i === T.length - 1 ? '完成' : '下一步';
  };
  const end = () => { const had = bub.contains(root.activeElement); hole.hidden = bub.hidden = true; app.inert = false; if (had) start.focus(); };
  const run = (focus) => { i = 0; hole.hidden = bub.hidden = false; app.inert = true; place(); if (focus) nx.focus(); };
  nx.addEventListener('click', () => { if (i === T.length - 1) return end(); i++; place(); });
  bub.querySelector('.skip').addEventListener('click', end);
  bub.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); end(); } });
  start.addEventListener('click', () => run(true));
  setTimeout(() => { if (root.host.isConnected) run(false); }, 400); // 首次自动出现，不抢焦点
}
</script>
