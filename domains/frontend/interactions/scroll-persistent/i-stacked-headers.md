---
zh: 分组标题依次顶住
en: Stacked section headers
order: 30
---

## 是什么

封面下沿压着一张摘要卡。往上滚时，封面退到导航栏下面，摘要卡停在导航栏下沿，按日期分的分组标题再停在摘要卡下沿，下一个分组上来时把上一个推走。顶部始终是“导航 → 摘要 → 当前分组”三层。

## 适合

账单、收支流水、运动记录、积分明细这类手机页面：上面一组总数要一直能看到，下面按日期分组，列表很长。

## 不适合

只有一层分组时，普通的分组标题吸顶就够了；分类要来回跳时用「左分类右列表联动」；摘要超过两行或带好几个按钮时不要吸顶，滚走后在导航栏里放一个精简数字就行。

## 注意

每一层的 top 是上面几层实际高度的和，要量出来写进 CSS 变量，不能写死；sticky 只对最近的滚动容器生效，中间任何一层祖先带 overflow 或 transform，吸顶就会失效或被裁掉。

## 要点

- 顶部三层：导航 44px（示例框里收到 36px），摘要卡一行 44–56px，分组标题 26–32px；三层加起来不超过屏高的 40%，给正文留够位置。
- 摘要卡用约 20–28px 的负 margin 压住封面下沿，但仍然占布局位置，下面列表的第一行不会被它盖住。
- 导航栏 top: 0，摘要卡 top: var(--nav)，分组标题 top: calc(var(--nav) + var(--card))；两个变量用 ResizeObserver 量出来写入，字号变大或文字换行时跟着变。
- 分组标题放在各自的分组里吸顶，分组滚完时自然被下一个推走，从摘要卡下面滑出去；层级是导航 > 摘要卡 > 分组标题。
- 摘要卡停靠后加阴影、两侧补上底色：在封面里放一个哨兵，用 IntersectionObserver 判断它滚过顶部，不在 scroll 事件里逐帧算；停靠时文字不缩放、排版不变。
- 跳到某个分组（“今天”、选日期）时，分组的 scroll-margin-top 设成上面两层的高度和，正好落在摘要卡下面；最后一个分组至少要高到它的标题能顶到位。
- 跳转结果用 role="status" 播报一次；减少动态效果时跳转不做平滑滚动，阴影直接出现。

## 提示词

给{账单页}做「分组标题依次顶住」：顶部是封面，{摘要卡}（本月总数 + 预算进度条，一行高）用负 margin 压住封面下沿约 24px，仍保留布局位置；往上滚时封面退到导航栏下面，摘要卡 sticky 停在导航栏下沿（top: var(--nav)），按日期分的分组标题 sticky 停在摘要卡下沿（top: calc(var(--nav) + var(--card))）；每个标题只在自己的分组里吸顶，下一组上来时把它推走，从摘要卡下面滑出；--nav、--card 用 ResizeObserver 量出来写入，不写死；先确认吸顶元素的滚动容器是哪一个，中间的祖先不加 overflow 和 transform；摘要卡停靠后加阴影、补齐两侧底色，用封面里的哨兵 + IntersectionObserver 判断，不在 scroll 里逐帧算，文字不缩放；“今天”这类跳转靠 scroll-margin-top（等于导航 + 摘要卡高度）落在摘要卡下面，结果用 role="status" 播报；最后一个分组至少一屏高；减少动态效果时直接跳转。

## 示例

<link rel="stylesheet" href="../../_shared/app-scroll-base.css">
<style>
.st{background:#e9ecf1}
.scr{position:relative;height:100%;max-width:400px;margin:0 auto;background:#fff;overflow:hidden}
.pg{position:relative;height:100%;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:none;outline-offset:-2px;--ov:24px}
.pg::-webkit-scrollbar{display:none}
.nav{position:sticky;top:0;z-index:4;display:flex;align-items:center;gap:8px;height:36px;padding:0 8px 0 14px;background:#17614f;color:#fff}
.nav b{flex:1;min-width:0;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.today{flex:none;height:24px;padding:0 10px;border:1px solid rgba(255,255,255,.45);border-radius:12px;background:rgba(255,255,255,.12);color:#fff;font-size:12px}
.today:focus-visible{outline-color:#fff}
.cv{position:relative;height:96px;padding:6px 14px 0;overflow:hidden;color:#fff;background:radial-gradient(circle at 86% 18%,rgba(255,255,255,.16) 0 17%,transparent 17.5%),radial-gradient(circle at 70% 78%,rgba(255,255,255,.1) 0 12%,transparent 12.5%),linear-gradient(170deg,#17614f,#2c8569 62%,#57a888)}
.cv small,.cv b{display:block;white-space:nowrap}
.cv small{font-size:11px;opacity:.8}
.cv b{font-size:21px;line-height:1.3}
.sen{position:absolute;left:0;bottom:calc(var(--ov) + var(--nav,36px) + 1px);width:1px;height:1px}
.band{position:sticky;top:var(--nav,36px);z-index:3;margin-top:calc(-1 * var(--ov));padding:0 12px 8px;background:linear-gradient(transparent var(--ov),#fff 0)}
.stuck .band{background:#fff}
.card{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:baseline;gap:4px 8px;padding:7px 12px 8px;border-radius:12px;background:#fff;box-shadow:0 0 0 1px #e8ecee,0 2px 6px -2px rgba(16,24,40,.12);transition:box-shadow .2s}
.stuck .card{box-shadow:0 0 0 1px #e8ecee,0 8px 18px -8px rgba(16,24,40,.38)}
.lb{color:#5b616e;font-size:11px;white-space:nowrap}
.am{font-size:16px;font-variant-numeric:tabular-nums;white-space:nowrap}
.lf{color:#5b616e;font-size:12px;white-space:nowrap}
.lf em{color:#17805f;font-style:normal;font-weight:600;font-variant-numeric:tabular-nums}
.pb{grid-column:1/-1;display:block;height:4px;border-radius:2px;background:#e9eeec;overflow:hidden}
.pb i{display:block;width:86%;height:100%;border-radius:2px;background:linear-gradient(90deg,#2c8569,#e8a33d)}
.ex{display:none;grid-column:1/-1;color:#5b616e;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sec{scroll-margin-top:calc(var(--nav,36px) + var(--band,53px))}
.sec:last-child{min-height:calc(100cqh - var(--nav,36px) - var(--band,53px))}
.sec h3{position:sticky;top:calc(var(--nav,36px) + var(--band,53px));z-index:2;display:flex;justify-content:space-between;gap:8px;height:26px;margin:0;padding:0 14px;background:#f2f4f5;color:#5b616e;font-size:12px;font-weight:600;line-height:26px;white-space:nowrap}
.sec h3 span{font-weight:400;font-variant-numeric:tabular-nums}
.row{display:flex;align-items:center;gap:10px;height:42px;padding:0 14px;box-shadow:inset 0 -1px #f1f2f4}
.ic{flex:none;display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:var(--c);color:#fff;font-size:12px;font-style:normal;font-weight:600}
.row span{flex:1;min-width:0}
.row b,.row small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.row b{font-weight:500;line-height:1.3}
.row small{color:#8a909c;font-size:11px;line-height:1.3}
.row em{flex:none;font-style:normal;font-weight:600;font-variant-numeric:tabular-nums}
.end{margin:10px 0;color:#9aa0aa;font-size:12px;text-align:center}
@container (max-width:320px){.card{padding:6px 10px 7px;gap:3px 6px}
.am{font-size:15px}
.row{gap:8px;padding:0 12px}
}
@container (min-height:280px){.nav{height:44px}
.nav b{font-size:15px}
.cv{height:128px;padding:10px 16px 0}
.cv b{font-size:24px}
.ex{display:block}
.am{font-size:18px}
.row{height:48px}
}
</style>

<div class="st"><div class="scr"><div class="pg" tabindex="0" aria-label="十月账单"><div class="nav"><b>账单明细</b><button type="button" class="today">今天</button></div><div class="cv"><small>生活账本</small><b>十月</b><small>已连续记账 214 天</small><i class="sen" aria-hidden="true"></i></div><div class="band"><div class="card"><span class="lb">十月支出</span><b class="am">¥4,286.50</b><span class="lf">剩 <em>¥713.50</em></span><i class="pb" aria-hidden="true"><i></i></i><small class="ex">预算 ¥5,000 · 日均 ¥153 · 比九月少 8%</small></div></div><div class="list"></div></div><p class="sr" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const pg = root.querySelector('.pg'), nav = root.querySelector('.nav'), band = root.querySelector('.band'), list = root.querySelector('.list'), msg = root.querySelector('[role=status]');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const C = { 餐: '#ee8a45', 行: '#4a78d6', 购: '#d65a8c', 娱: '#8762cf', 住: '#2a9a8a' };
  const D = [
    ['10月28日 周二', [['餐', '早餐 · 豆浆葱油饼', '08:10', 12], ['行', '地铁 2 号线', '08:42', 4], ['餐', '午饭 · 番茄牛腩', '12:20', 32], ['购', '超市 · 水果和牛奶', '19:05', 48.4]]],
    ['10月27日 周一', [['行', '打车 · 加班回家', '22:31', 36], ['餐', '咖啡 · 燕麦拿铁', '15:10', 18], ['住', '电费 · 十月', '10:02', 96.5]]],
    ['10月26日 周日', [['娱', '电影 · 两张票', '19:40', 78], ['餐', '晚饭 · 火锅', '18:05', 186], ['行', '商场停车', '17:50', 15]]],
    ['10月25日 周六', [['购', '菜市场', '09:15', 63.5], ['娱', '书店 · 两本小说', '15:30', 59], ['餐', '奶茶', '16:02', 16]]],
    ['10月24日 周五', [['住', '话费', '09:00', 58], ['餐', '午饭 · 牛肉面', '12:12', 26], ['行', '公交', '18:40', 2]]],
  ];
  const yuan = (n) => '¥' + n.toFixed(2);
  list.innerHTML = D.map(([d, rows], i) => `<section class="sec"><h3>${d}<span>支出 ${yuan(rows.reduce((s, r) => s + r[3], 0))}</span></h3>${rows.map(([c, n, t, a]) => `<div class="row"><i class="ic" style="--c:${C[c]}" aria-hidden="true">${c}</i><span><b>${n}</b><small>${t}</small></span><em>−${yuan(a)}</em></div>`).join('')}${i === D.length - 1 ? '<p class="end">十月的账到这里</p>' : ''}</section>`).join('');
  const secs = [...list.querySelectorAll('.sec')];
  // 各层的 top = 上面几层的实际高度，量出来写进变量
  const measure = () => { pg.style.setProperty('--nav', nav.offsetHeight + 'px'); pg.style.setProperty('--band', band.offsetHeight + 'px'); };
  const ro = new ResizeObserver(measure); ro.observe(nav); ro.observe(band);
  // 哨兵在封面里，离开滚动区顶部的那一刻正好是摘要卡停靠的时刻
  new IntersectionObserver(([e]) => pg.classList.toggle('stuck', !e.isIntersecting && e.boundingClientRect.top < e.rootBounds.top), { root: pg }).observe(root.querySelector('.sen'));
  // 跳转落点按 scroll-margin-top 让出导航和摘要卡
  const go = (i, extra = 0) => pg.scrollTo({ top: secs[i].offsetTop - parseFloat(getComputedStyle(secs[i]).scrollMarginTop) + extra, behavior: still ? 'auto' : 'smooth' });
  root.querySelector('.today').addEventListener('click', () => { go(0); msg.textContent = '已跳到今天，10月28日的分组停在摘要卡下面'; });
  // 缩略图：滚到封面退出、摘要卡停靠、第二个分组标题顶住
  setTimeout(() => { if (root.host.isConnected) go(1, 22); }, 300);
}
</script>
