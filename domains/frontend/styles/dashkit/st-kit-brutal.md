---
zh: 粗野风后台
en: Brutalist dashboard kit
aka: 新粗野后台 硬阴影后台 撞色后台 贴纸后台 neo-brutalist dashboard
order: 40
---

## 是什么

奶油底上的操作台：纯黑粗描边、不模糊的硬阴影、两三种撞色，模块像贴在桌上的贴纸，每个操作都有“砰”的一下。

## 适合

小团队的内部工具、创意机构的项目看板、活动运营台、想让后台有性格的独立产品。

## 不适合

给外部客户看的金融、医疗后台；二十列以上的宽表也放不下粗边框，那类数据用「数据表格」。基础配色和硬投影见「粗野主义」，这里讲进了后台之后怎么交互。

## 注意

粗边框很占地方，行高和内边距要比普通后台大一档。每种撞色只表示一件事，比如抽屉跟随所选行、绿色表示已完成，颜色多了就成了噪音。跑马灯是持续运动的内容，要给暂停按钮。

## 要点

- 底座：奶油 #fff3d6 底，纯黑文字和 2–3px 边框，撞色粉 #ff7ab8、荧光绿 #c9f23c、蓝 #6ea0ff，色块上一律黑字
- 硬阴影：偏移 2–4px、0 模糊；悬停抬起 1px、投影加 1px；选中或按下时元素压到投影位置，投影归零
- 动效：位移 100–160ms，缓出、无回弹，到位就停
- 模块贴纸：模块拖起时旋转 2°、投影加到 8px，松手吸附到 8 列网格，其余模块硬切让位；键盘用 Ctrl + 方向键移动，拖动中 Esc 取消
- 全页同日高亮：悬停图表上的某一天，全页图表这一天保持撞色，其余数据换成灰色网点（radial-gradient），聚焦时同样触发
- 待办滚动条：顶栏黑底荧光字，一圈 20–24s，悬停或聚焦暂停，右端留暂停按钮；内容复制一份拼接，副本 aria-hidden
- 撞色详情栏：点行从右侧 160ms 滑入，颜色跟这一行走；↑↓ 切换行，内容随之替换，焦点留在行上；Esc 或关闭按钮收起并把焦点还给原行；宽屏时表格让出位置，窄屏盖住右侧 58%
- 巨号数字收缩：超大指标随滚动从 96px 压到 28px，整块收成细条钉在顶部，全程由滚动位置决定
- 落印审批：审批通过时印章从 2.6 倍、-20° 砸到 -9°，230ms，落到 0.92 再回 1，抽屉同时震 3px；同一行划掉，待审批数减一，章只盖一次
- 减少动态效果：跑马灯静止并隐藏暂停按钮，抽屉直接出现，印章直接显示

## 提示词

把{产品}的{后台页面}做成粗野风后台，核心对象是{业务对象}。

风格底座：奶油 #fff3d6 底，纯黑文字和 3px 边框，撞色用粉 #ff7ab8、荧光绿 #c9f23c、蓝 #6ea0ff，色块上一律黑字，每种颜色只表示一件事；硬阴影偏移 2–4px、0 模糊，悬停抬起 1px，选中或按下时压到投影位置；0 圆角；标题 900 字重，金额和编号用等宽字体；位移动效 100–160ms，缓出、无回弹；行高比普通后台大一档；窄屏模块上下堆叠。

从下面挑要用的交互，没挑的不做：
1. 落印审批：审批通过时印章从 2.6 倍、-20° 砸到 -9°，230ms，抽屉同时震 3px，该行划掉，待审批数减一，已落印审批的行隐藏审批按钮。
2. 撞色详情栏：点行从右侧 160ms 滑入抽屉，颜色跟这一行走，↑↓ 切换行且焦点留在行上，Esc 收起并把焦点还给原行，宽屏时表格让出位置。
3. 待办滚动条：顶栏黑底荧光字滚动待办，一圈 22s，悬停或聚焦暂停，右端放一个暂停按钮。
4. 模块贴纸：模块拖起时旋转 2°、投影加到 8px，松手吸附到 8 列网格，其余模块硬切让位，键盘用 Ctrl + 方向键移动，Esc 取消。
5. 巨号数字收缩：超大指标随滚动从 96px 压到 28px，收成细条钉在顶部。
6. 全页同日高亮：悬停或聚焦图表上的某一天，全页图表这一天保持撞色，其余数据换成灰色网点。

减少动态效果时，跑马灯静止，抽屉和印章直接出现。

## 示例

<style>
:host{container-type:size}
.w{--cream:#fff3d6;--ink:#000;--pink:#ff7ab8;--lime:#c9f23c;--blue:#6ea0ff;position:relative;height:100%;overflow:hidden;display:flex;flex-direction:column;background:var(--cream);color:var(--ink);font:12px/1.35 system-ui,"PingFang SC",sans-serif}
.mq{flex:none;display:flex;align-items:center;height:24px;background:var(--ink);color:var(--lime);font:700 11px/24px ui-monospace,Menlo,"PingFang SC",monospace}
.view{flex:1;min-width:0;overflow:hidden}
.track{display:flex;width:max-content;animation:run 22s linear infinite}
.track span{padding-right:28px;white-space:nowrap}
.mq:hover .track,.mq:focus-within .track,.mq.stop .track{animation-play-state:paused}
@keyframes run{to{transform:translateX(-50%)}}
.pause{flex:none;width:26px;height:24px;padding:0;border:0;border-left:2px solid var(--lime);background:var(--ink);color:var(--lime);font:700 10px/1 ui-monospace,Menlo,monospace;cursor:pointer}
.pause:focus-visible{outline:2px solid var(--lime);outline-offset:-3px}
.main{position:relative;flex:1;min-height:0;display:flex;gap:10px;padding:8px 10px 10px}
.kpis{display:none}
.table{flex:1;min-width:0;display:flex;flex-direction:column;gap:5px}
.head{display:flex;align-items:baseline;justify-content:space-between;font-weight:900}
.head b{font-size:14px;letter-spacing:-.01em}
.head i{display:none;font-style:normal}
.head span{font:700 11px/1 ui-monospace,Menlo,"PingFang SC",monospace}
.rows{flex:1;min-height:0;display:flex;flex-direction:column;gap:4px;margin:0;padding:0;list-style:none}
.rows li{flex:1;min-height:0;display:flex}
.row{flex:1;min-width:0;display:flex;align-items:center;gap:6px;padding:0 8px;border:2px solid var(--ink);border-radius:0;background:#fff;color:var(--ink);font:700 12px/1.2 system-ui,"PingFang SC",sans-serif;text-align:left;cursor:pointer;box-shadow:2px 2px 0 var(--ink);transition:transform .1s linear,box-shadow .1s linear}
.row span:first-child{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.row em{font:700 11px/1 ui-monospace,Menlo,monospace;font-style:normal;white-space:nowrap}
.row:hover{transform:translate(-1px,-1px);box-shadow:3px 3px 0 var(--ink)}
.row[aria-expanded=true]{background:var(--c);transform:translate(2px,2px);box-shadow:none}
.row.done span:first-child{text-decoration:line-through;text-decoration-thickness:2px}
.row:focus-visible,.seal:focus-visible,.shut:focus-visible{outline:3px solid var(--ink);outline-offset:2px}
.drawer{position:absolute;top:0;right:0;bottom:0;width:58%;display:flex;flex-direction:column;gap:3px;padding:8px 10px;border-left:3px solid var(--ink);background:var(--c,var(--pink));visibility:hidden;transform:translateX(104%);transition:transform .16s cubic-bezier(.2,1,.3,1),visibility 0s .16s}
.drawer.on{visibility:visible;transform:none;transition:transform .16s cubic-bezier(.2,1,.3,1)}
.drawer h3{margin:0;padding-right:22px;font-size:15px;line-height:1.2;font-weight:900}
.drawer p{margin:0;font-weight:600}
.drawer b{font:800 19px/1.1 ui-monospace,Menlo,monospace}
.shut{position:absolute;top:6px;right:6px;width:20px;height:20px;padding:0;border:2px solid var(--ink);background:#fff;color:var(--ink);font:900 12px/1 system-ui,sans-serif;cursor:pointer}
.seal{align-self:flex-start;margin-top:auto;height:26px;padding:0 10px;border:2px solid var(--ink);background:#fff;color:var(--ink);font:800 12px/1 system-ui,"PingFang SC",sans-serif;box-shadow:3px 3px 0 var(--ink);cursor:pointer;transition:transform .1s linear,box-shadow .1s linear}
.seal:active{transform:translate(3px,3px);box-shadow:none}
.seal[disabled]{visibility:hidden}
.stamp{position:absolute;right:10px;bottom:10px;padding:3px 7px;border:3px solid var(--ink);outline:1.5px solid var(--ink);outline-offset:2px;color:var(--ink);font:900 15px/1.1 system-ui,"PingFang SC",sans-serif;letter-spacing:.08em;transform:rotate(-9deg);visibility:hidden}
.drawer.ok .stamp{visibility:visible}
.sr{position:absolute;width:1px;height:1px;margin:0;overflow:hidden;clip-path:inset(50%)}
@container (min-width:520px){
.mq{height:28px;font-size:12px;line-height:28px}
.pause{height:28px;width:30px}
.main{gap:14px;padding:12px 14px 14px}
.kpis{display:flex;flex-direction:column;gap:8px;width:142px}
.kpi{flex:1;display:flex;flex-direction:column;justify-content:center;padding:0 10px;border:3px solid var(--ink);box-shadow:4px 4px 0 var(--ink);font-weight:800}
.kpi strong{font-size:34px;line-height:1;font-weight:900;letter-spacing:-.03em}
.kpi:nth-child(1){background:var(--lime)}
.kpi:nth-child(2){background:var(--blue)}
.head b{font-size:17px}
.head i{display:inline}
.main:has(.drawer.on) .table{margin-right:256px}
.rows{gap:6px}
.row{padding:0 12px;font-size:14px;box-shadow:3px 3px 0 var(--ink)}
.row em{font-size:12px}
.drawer{width:260px;gap:6px;padding:12px 14px}
.drawer h3{font-size:19px}
.drawer b{font-size:26px}
.seal{height:32px;padding:0 14px;font-size:14px}
.stamp{right:14px;bottom:16px;font-size:22px}
}
@media (prefers-reduced-motion:reduce){
.track{animation:none}
.pause{display:none}
.row,.seal,.drawer,.drawer.on{transition:none}
.row:hover{transform:none}
}
</style>

<div class="w">
  <div class="mq" aria-label="待办跑马灯">
    <div class="view" data-clip>
      <div class="track">
        <span>待办 01 → 审批本周退款</span><span>待办 02 → 回复启明咖啡合同</span><span>待办 03 → 下午三点盘库存</span><span>待办 04 → 周五发工资</span>
        <span aria-hidden="true">待办 01 → 审批本周退款</span><span aria-hidden="true">待办 02 → 回复启明咖啡合同</span><span aria-hidden="true">待办 03 → 下午三点盘库存</span><span aria-hidden="true">待办 04 → 周五发工资</span>
      </div>
    </div>
    <button type="button" class="pause" aria-label="暂停跑马灯">||</button>
  </div>
  <div class="main">
    <div class="kpis">
      <div class="kpi"><span>待审批</span><strong class="left">4</strong></div>
      <div class="kpi"><span>本周已批</span><strong class="batch">19</strong></div>
    </div>
    <section class="table">
      <div class="head"><b>MyPrompts<i> 审批台</i></b><span>↑↓ 切换</span></div>
      <ul class="rows"></ul>
    </section>
    <aside class="drawer" aria-label="审批详情">
      <button type="button" class="shut" aria-label="关闭详情">×</button>
      <h3></h3><p class="what"></p><b></b>
      <button type="button" class="seal">盖章通过</button>
      <div class="stamp" aria-hidden="true">已批准</div>
    </aside>
  </div>
  <p class="sr" role="status"></p>
</div>

<script type="module">
export default function demo(root) {
  const ROWS = [
    { who: '启明咖啡', what: '年度续费 · 三店通用', money: '¥12,800', c: 'var(--pink)' },
    { who: '北岸书店', what: '售后退款 · 第二笔', money: '¥3,260', c: 'var(--lime)' },
    { who: '青禾农场', what: '加购席位 · 12 个', money: '¥7,540', c: 'var(--blue)' },
    { who: '小满工作室', what: '合同变更 · 延期半年', money: '¥21,000', c: 'var(--pink)' },
  ];
  const list = root.querySelector('.rows'), drawer = root.querySelector('.drawer'), say = root.querySelector('.sr');
  const seal = root.querySelector('.seal'), stamp = root.querySelector('.stamp'), left = root.querySelector('.left'), batch = root.querySelector('.batch');
  const mq = root.querySelector('.mq'), pause = root.querySelector('.pause');
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let open = -1;

  list.innerHTML = ROWS.map((r, i) => `<li><button type="button" class="row" data-i="${i}" aria-expanded="false" style="--c:${r.c}"><span>${r.who}</span><em>${r.money}</em></button></li>`).join('');
  const rows = [...list.querySelectorAll('.row')];

  function show(i) {
    open = i;
    rows.forEach((b, j) => b.setAttribute('aria-expanded', j === i));
    if (i < 0) return drawer.classList.remove('on');
    const r = ROWS[i];
    drawer.style.setProperty('--c', r.c);
    drawer.querySelector('h3').textContent = r.who;
    drawer.querySelector('.what').textContent = r.what;
    drawer.querySelector('b').textContent = r.money;
    drawer.classList.toggle('ok', !!r.ok);
    seal.disabled = !!r.ok;
    drawer.classList.add('on');
    say.textContent = `${r.who}，${r.what}，${r.money}${r.ok ? '，已批准' : ''}`;
  }

  function approve() {
    const r = ROWS[open];
    if (!r || r.ok) return;
    r.ok = true;
    rows[open].classList.add('done');
    drawer.classList.add('ok');
    seal.disabled = true;
    left.textContent = ROWS.filter((x) => !x.ok).length;
    batch.textContent = +batch.textContent + 1;
    say.textContent = r.who + ' 已批准';
    if (calm) return;
    // 印章砸下来，抽屉跟着震一下
    stamp.animate([
      { transform: 'rotate(-20deg) scale(2.6)', opacity: 0 },
      { transform: 'rotate(-9deg) scale(.92)', opacity: 1, offset: 0.7 },
      { transform: 'rotate(-9deg) scale(1)', opacity: 1 },
    ], { duration: 230, easing: 'cubic-bezier(.5,0,.9,.4)' });
    drawer.animate([{ transform: 'none' }, { transform: 'translate(3px,3px)' }, { transform: 'none' }], { duration: 120, delay: 160 });
  }

  list.addEventListener('click', (e) => {
    const b = e.target.closest('.row');
    if (b) show(+b.dataset.i === open ? -1 : +b.dataset.i);
  });
  seal.addEventListener('click', approve);
  root.querySelector('.shut').addEventListener('click', () => {
    const back = rows[open];
    show(-1);
    back?.focus();
  });
  root.querySelector('.w').addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open >= 0) {
      const back = rows[open];
      show(-1);
      back.focus();
    }
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const base = open >= 0 ? open : rows.indexOf(root.activeElement);
    const to = (base + (e.key === 'ArrowDown' ? 1 : rows.length - 1 + (base < 0 ? 1 : 0))) % rows.length;
    rows[to].focus();
    if (open >= 0) show(to);
  });
  pause.addEventListener('click', () => {
    const stop = mq.classList.toggle('stop');
    pause.textContent = stop ? '>' : '||';
    pause.setAttribute('aria-label', stop ? '继续跑马灯' : '暂停跑马灯');
  });

  const later = (ms, fn) => setTimeout(() => root.host.isConnected && fn(), ms);
  later(260, () => show(1));
  later(620, approve);
}
</script>
