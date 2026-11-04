---
zh: 面板上再叠一层
en: Stacked sheets
order: 70
---

## 是什么

底部面板里的某一项要再选一次（确认订单时换地址、换优惠券），第二层面板从下边升起盖住大半，第一层往后退：略缩小、上移、变暗，像一叠卡片；选完或返回，第二层落下，第一层回到原位，填过的内容和滚动位置都还在。

## 适合

第二步是第一步的附属选择、选完要回第一层接着做：选地址、选优惠券、选规格、补备注。

## 不适合

要叠第三层时改成面板内翻页或独立页面；第二层本身是一件独立任务（新建地址要填一整张表）时直接进新页面。

## 注意

返回键、Esc、下拉、点露出的第一层，都只关最上面这一层；关闭后焦点回到第一层里打开它的那一行。

## 要点

- 第一层退后：scale(0.94)、上移 10px、盖一层约 14% 的暗色，240ms 缓出；背后的页面再暗一档
- 第二层的顶边落在第一层标题栏下沿，露出第一层的标题，看得出后面还有一层、是从哪儿来的；最多叠两层
- 第二层打开期间第一层设 inert；第二层选完自动落下，把结果写回第一层对应那一行并让这一行底色闪一下
- 每一层都单独响应返回：打开第二层时再 pushState 一次，popstate 只关最上层
- 单层面板的高度档位、下拉关闭见「底部面板」；减少动态效果时去掉缩放和位移，只保留压暗

## 提示词

在{确认订单面板}里点{收货地址}时用「面板上再叠一层」：第二层面板从下边升起，顶边落在第一层标题栏下沿，露出第一层的标题；第一层同时 scale(0.94)、上移 10px 并盖一层约 14% 的暗色，背后页面再暗一档，240ms 缓出；第二层打开时第一层 inert、焦点进入第二层的当前选项；选中后第二层自动落下，结果写回第一层那一行并让这一行底色闪一下；返回键、Esc、下拉、点露出的第一层都只关第二层（打开时 pushState，popstate 时关最上层），关闭后焦点回到打开它的那一行；第一层的输入和滚动位置保持；最多叠两层；减少动态效果时去掉缩放和位移，只保留压暗。

## 示例

<link rel="stylesheet" href="../../_shared/app-sheet-base.css">
<style>
.st{background:#dfe4ea}
.pg{padding:10px 16px;color:#5b616e;font-size:12px}
.pg b{display:block;color:#1f2329;font-size:15px}
.scr,.cov{position:absolute;inset:0}
.scr{background:rgba(16,24,40,.28);transition:background-color .24s}
.two .scr{background:rgba(16,24,40,.42)}
.cov{display:none}
.two .cov{display:block}
.sh{position:absolute;left:0;right:0;bottom:0;max-width:420px;margin:0 auto;border-radius:16px 16px 0 0;background:#fff;box-shadow:0 -6px 20px rgba(16,24,40,.14);transform-origin:50% 0;transition:transform .24s cubic-bezier(.2,.8,.2,1)}
.s1{top:40px}
.s1::after{content:"";position:absolute;inset:0;border-radius:inherit;background:rgba(16,24,40,.14);opacity:0;pointer-events:none;transition:opacity .24s}
.two .s1{transform:translateY(-10px) scale(.94)}
.two .s1::after{opacity:1}
.s2{top:70px;transform:translateY(105%)}
.two .s2{transform:none}
.hd{display:flex;align-items:center;gap:6px;height:40px;padding:0 16px;border-bottom:1px solid #eef0f3;font-size:14px;font-weight:600}
.s2 .hd{padding-left:6px}
.bk{display:grid;place-items:center;width:32px;height:32px;border:0;border-radius:8px;background:none;color:#5b616e}
.row{display:flex;align-items:center;gap:10px;width:100%;height:38px;padding:0 16px;border:0;border-bottom:1px solid #f1f3f6;background:none;text-align:left}
.row span{flex:none;width:48px;color:#5b616e}
.row em{flex:1;min-width:0;overflow:hidden;font-style:normal;white-space:nowrap;text-overflow:ellipsis}
.row i{flex:none;color:#98a1ad;font-style:normal}
.fl{animation:fl 1s ease-out}
@keyframes fl{from{background:#e6edff}
}
.op{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;height:36px;padding:0 16px;border:0;border-bottom:1px solid #f1f3f6;background:none;text-align:left}
.op[aria-current]{color:#1f4fd6;font-weight:600}
.op[aria-current]::after{content:"✓"}
@container (max-height:240px){.s1{top:36px}
.s2{top:55px}
.hd{height:34px;font-size:13px}
.row{height:32px}
.op{height:30px}
.pg b{font-size:14px}
}
@media (prefers-reduced-motion:reduce){.two .s1{transform:none}
}
</style>

<div class="st">
  <div class="pg" aria-hidden="true"><b>购物车</b>3 件商品</div>
  <div class="scr" aria-hidden="true"></div>
  <section class="sh s1" role="dialog" aria-label="确认订单">
    <div class="hd">确认订单</div>
    <button type="button" class="row" data-k="addr" aria-haspopup="dialog"><span>收货地址</span><em>云杉路 6 号 3 栋</em><i aria-hidden="true">›</i></button>
    <button type="button" class="row"><span>送达</span><em>今天 18:00–18:30</em><i aria-hidden="true">›</i></button>
    <button type="button" class="row"><span>优惠</span><em>满 99 减 10</em><i aria-hidden="true">›</i></button>
  </section>
  <div class="cov" aria-hidden="true"></div>
  <section class="sh s2" role="dialog" aria-label="选择收货地址" inert>
    <div class="hd"><button type="button" class="bk" aria-label="返回确认订单"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M10 3.5 5.5 8l4.5 4.5"/></svg></button>选择收货地址</div>
    <button type="button" class="op" aria-current="true">云杉路 6 号 3 栋</button>
    <button type="button" class="op">临湖街 22 号</button>
    <button type="button" class="op">科创大厦 9 层前台</button>
  </section>
  <button type="button" class="ctl rp">重播</button>
  <p class="sr" role="status"></p>
</div>

<script type="module">
export default function demo(root) {
  const st = root.querySelector('.st'), s1 = root.querySelector('.s1'), s2 = root.querySelector('.s2'), addr = root.querySelector('[data-k=addr]'), say = root.querySelector('.sr');
  const ops = [...s2.querySelectorAll('.op')];
  let tm;
  const open = (focus) => {
    st.classList.add('two'); s1.inert = true; s2.inert = false; say.textContent = '已打开选择收货地址';
    if (focus) s2.querySelector('[aria-current]').focus();
  };
  const close = (pick) => {
    if (!st.classList.contains('two')) return;
    const back = s2.contains(root.activeElement);
    st.classList.remove('two'); s2.inert = true; s1.inert = false;
    if (pick) { addr.querySelector('em').textContent = pick; addr.classList.remove('fl'); void addr.offsetWidth; addr.classList.add('fl'); }
    say.textContent = pick ? `收货地址已改为 ${pick}` : '已返回确认订单';
    if (back) addr.focus();
  };
  addr.onclick = () => open(true);
  ops.forEach((b) => (b.onclick = () => { ops.forEach((o) => o.removeAttribute('aria-current')); b.setAttribute('aria-current', 'true'); close(b.textContent); }));
  s2.querySelector('.bk').onclick = () => close();
  root.querySelector('.cov').onclick = () => close();
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && st.classList.contains('two')) { e.preventDefault(); close(); } });
  // 自动演示：停在两层叠起的状态
  const play = () => { clearTimeout(tm); close(); tm = setTimeout(() => root.host.isConnected && open(false), 700); };
  root.querySelector('.rp').onclick = play;
  play();
}
</script>
