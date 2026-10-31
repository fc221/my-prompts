---
zh: 筛选区
en: Filter bar
order: 50
---

## 是什么

列表上方一排“标签 + 控件”的筛选条件，末尾是查询、重置和展开。

## 适合

查询列表页、后台表格上方，按状态、时间、关键词等条件缩小结果。

## 不适合

只有 1–2 个条件时直接放进表格工具栏；条件超过 8 个时常用的露出、其余收进“展开”或“更多筛选”抽屉；选了就生效的筛选不要“查询”按钮。

## 要点

- 排版全产品二选一：标签在控件左侧的行内筛选（后台默认），或标签在上方的网格（此时按钮行 align-items: end，对齐控件底边）
- 同类控件统一宽度档：下拉 160–240px，搜索框 240–320px；控件间距 12–16px，换行后左边缘对齐
- 默认露出最常用的 3–4 个条件；“展开 / 收起”是带箭头的文字按钮，收起时显示被藏条件里已设置的数量“展开（2）”
- “查询”与控件等高放在最后，“重置”用次按钮或文字按钮
- 选完即查还是点查询，按数据量和查询速度定，见「筛选的查询时机」
- 要点“查询”才生效时，改了条件后查询按钮给出待应用标记；筛选变化后回到第 1 页
- 已应用的条件在表格上方显示为可单独清除的标签；区分“没有数据”和“没有符合筛选的结果”
- 窄屏每个条件一行（标签定宽 4.5em + 控件撑满），或整体收进“筛选”抽屉

## 提示词

给{订单列表}做筛选区：标签在控件左侧的行内排版，“状态”“下单时间”两个下拉各宽 180px，“订单号”搜索框宽 260px，间距 12px，放不下时整组换行且左对齐；末尾“查询”主按钮与控件等高，“重置”次按钮，“展开（{已设置数}）”文字按钮带箭头；控件统一高 32px，下拉自绘箭头离边框 10px；改了条件未查询时查询按钮显示待应用标记；查询后回到第 1 页；窄屏每个条件独占一行，标签定宽。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.fb{display:flex;flex-wrap:wrap;align-items:center;gap:12px 16px;width:100%;max-width:720px}
.fi{display:inline-flex;align-items:center;gap:8px}
.fi>span:first-child{color:#5b616e;white-space:nowrap}
.sel select{width:112px}
.fi .inp{width:132px}
input::-webkit-search-cancel-button{-webkit-appearance:none}
.acts{display:inline-flex;gap:8px}
.go{position:relative}
.go.dirty::after{content:"";position:absolute;top:-4px;right:-4px;width:8px;height:8px;border:2px solid #f5f6f8;border-radius:50%;background:#b54708}
.more svg{transition:transform .16s}
.more[aria-expanded=true] svg{transform:rotate(180deg)}
.st{flex-basis:100%;font-variant-numeric:tabular-nums}
@media (prefers-reduced-motion:reduce){.more svg{transition:none}
}
@container (max-width:320px){.sel select{width:96px}
}
</style>

<div class="s"><div class="fb" role="search" aria-label="筛选订单"><label class="fi"><span>状态</span><span class="sel"><select><option>全部</option><option>待付款</option><option>待发货</option><option>已完成</option></select></span></label><label class="fi"><span>时间</span><span class="sel"><select><option>近 7 天</option><option>近 30 天</option><option>本月</option></select></span></label><label class="fi xh" hidden><span>渠道</span><span class="sel"><select><option>全部</option><option>小程序</option><option>官网</option></select></span></label><label class="fi"><span>订单号</span><input class="inp" type="search" placeholder="输入订单号" spellcheck="false"></label><div class="acts"><button type="button" class="btn pri go">查询</button><button type="button" class="btn rs">重置</button><button type="button" class="btn txt more" aria-expanded="false"><span>展开</span><svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg></button></div><p class="help st" role="status">共 128 条</p></div></div>

<script type="module">
export default function demo(root) {
  const go = root.querySelector('.go'), st = root.querySelector('.st'), more = root.querySelector('.more'), xh = root.querySelector('.xh'), lab = more.querySelector('span'), ctl = [...root.querySelectorAll('select,input')];
  const dirty = (on) => { go.classList.toggle('dirty', on); if (on) go.setAttribute('aria-label', '查询（条件已修改，尚未应用）'); else go.removeAttribute('aria-label'); };
  const ml = () => { const open = !xh.hidden, n = xh.querySelector('select').selectedIndex > 0 ? 1 : 0; lab.textContent = open ? '收起' : n ? `展开（${n}）` : '展开'; more.setAttribute('aria-expanded', String(open)); };
  ctl.forEach((el) => el.addEventListener('input', () => dirty(true)));
  go.addEventListener('click', () => { dirty(false); st.textContent = `共 ${20 + Math.floor(Math.random() * 90)} 条 · 已回到第 1 页`; });
  root.querySelector('.rs').addEventListener('click', () => { ctl.forEach((el) => { if (el.tagName === 'SELECT') el.selectedIndex = 0; else el.value = ''; }); dirty(false); st.textContent = '共 128 条'; ml(); });
  more.addEventListener('click', () => { xh.hidden = !xh.hidden; ml(); });
}
</script>
