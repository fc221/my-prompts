---
zh: 抽屉
en: Drawer
aka: 侧边抽屉 侧滑面板
order: 30
---

## 是什么

从右侧滑出的面板，盖住部分页面，左边的列表仍然看得见。

## 适合

在列表里查看或编辑一项，或连续处理多项而不丢失列表位置。

## 不适合

简单确认用对话框；多层页签、复杂表格、多步依赖用独立页面；手机上的次级面板用底部面板，左右抽屉只用于导航。

## 要点

- 用组件库的抽屉：Element Plus el-drawer（v-model、title、size、direction="rtl"、destroy-on-close、close-on-click-modal、before-close），Naive UI n-drawer（v-model:show、width、placement="right"、mask-closable）加 n-drawer-content（title、closable），Ant Design Vue a-drawer（v-model:open、title、width、placement="right"、maskClosable、destroyOnClose）；滑入动画、遮罩、焦点锁定、Esc 都由组件负责
- 宽 480 至 560px（常用 520px），写进 size / width；窄于 640px 时写 100%，整屏显示
- 头部标题 + 关闭按钮，正文独立滚动，底部固定“取消 / 保存”：三家都有 footer 插槽；Naive UI 的 n-drawer-content 关闭按钮默认不显示，要写 closable；Element Plus 的 size 不写默认只有 30%
- 只读详情点遮罩可以关；有表单且已修改时不直接关：在 before-close、on-mask-click、@close 里先问一句或保留草稿
- 编辑类抽屉开 destroy-on-close / destroyOnClose（Naive UI 默认 display-directive="if"），下一条记录打开时不残留上一条的内容和校验状态
- 关闭后列表的筛选、排序、滚动位置不变；保存成功在原行更新并高亮一下；Element Plus 的 el-drawer 默认渲染在原地，放在带 overflow 的布局里要开 append-to-body
- 需要同时操作列表和详情时去掉遮罩（Element Plus modal=false、Naive UI show-mask=false、Ant Design Vue mask=false），或改成非模态分栏；手机上的导航抽屉用 direction="ltr" / placement="left"

## 提示词

在{列表页}用「抽屉」查看和编辑单项：用项目组件库自带的抽屉（Element Plus el-drawer direction="rtl"；Naive UI n-drawer placement="right" + n-drawer-content closable；Ant Design Vue a-drawer placement="right"），不手写面板和遮罩。宽 520px（size / width），窄于 640px 时 100%；头部标题“{订单 #2041}” + 关闭按钮，正文独立滚动，footer 插槽里固定“取消 / 保存”；只读时点遮罩可关，{有修改时}在 before-close / on-mask-click / @close 里先提示再关；开 destroy-on-close，每次打开都是这条记录的初始值；关闭后焦点回到触发的那一行，列表的筛选、排序、滚动位置不变，保存成功在原行更新；{需要同时操作列表时}去掉遮罩（modal / show-mask / mask 设 false）；内容变成多层页签或多步流程时改用独立页面。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.list{width:100%;max-width:520px;background:#fff;border:1px solid #e3e6eb;border-radius:10px;overflow:hidden}
.row{display:flex;align-items:center;gap:12px;height:44px;padding:0 8px 0 12px;font-size:13px}
.row+.row{border-top:1px solid #e3e6eb}
.row span:first-of-type{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tag{padding:0 8px;border-radius:999px;background:#fff4e5;color:#b54708;font-size:12px;line-height:20px;white-space:nowrap}
.tag.ok{background:#e7f6ef;color:#12805c}
.dw{place-items:stretch end;grid-template-rows:minmax(0,1fr);padding:0}
.side{width:min(280px,82%);height:100%;display:flex;flex-direction:column;border-radius:12px 0 0 12px;transform:translateX(100%);transition:transform .22s cubic-bezier(.4,0,1,1)}
.dw[data-open] .side{transform:none;transition:transform .32s cubic-bezier(0,0,.2,1)}
.hd{display:flex;align-items:center;padding:8px 8px 8px 16px;border-bottom:1px solid #e3e6eb}
h3{flex:1;font-size:14px}
.bd{flex:1;min-height:0;overflow:auto;padding:12px 16px;display:grid;grid-template-columns:auto 1fr;gap:4px 16px;align-content:start;font-size:13px}
dt{color:#5b616e}
.ft{display:flex;justify-content:flex-end;gap:8px;padding:8px 12px;border-top:1px solid #e3e6eb}
</style>

<div class="s"><div class="list"><div class="row"><b>#2041</b><span>林知科技</span><span class="tag">待发货</span><button class="b t sm" data-i="0">查看</button></div><div class="row"><b>#2042</b><span>周记餐饮</span><span class="tag">待发货</span><button class="b t sm" data-i="1">查看</button></div><div class="row"><b>#2043</b><span>北岸书店</span><span class="tag ok">已发货</span><button class="b t sm" data-i="2">查看</button></div></div><div class="mask dw" role="dialog" aria-modal="true" aria-labelledby="dwt"><div class="panel side"><div class="hd"><h3 id="dwt"></h3><button class="x" aria-label="关闭" data-close>×</button></div><dl class="bd"></dl><div class="ft"><button class="b" data-close>关闭</button><button class="b p ship">标记发货</button></div></div></div></div>

<script type="module">
import { modal } from '../../_shared/components-overlay.ts';

export default function demo(root) {
  const D = [['林知科技', '¥ 1,280.00', '杭州 · 西湖区'], ['周记餐饮', '¥ 356.00', '上海 · 徐汇区'], ['北岸书店', '¥ 92.50', '南京 · 鼓楼区']];
  const mk = root.querySelector('.dw'), bd = mk.querySelector('.bd'), ship = mk.querySelector('.ship'), btns = [...root.querySelectorAll('[data-i]')]; let cur;
  const m = modal(root, mk, { scrim: true }); // 只读详情：点遮罩可以关闭
  const fill = (b) => {
    cur = b.closest('.row'); const d = D[b.dataset.i], st = cur.querySelector('.tag');
    mk.querySelector('h3').textContent = '订单 ' + cur.querySelector('b').textContent;
    bd.innerHTML = `<dt>客户</dt><dd>${d[0]}</dd><dt>金额</dt><dd>${d[1]}</dd><dt>状态</dt><dd>${st.textContent}</dd><dt>地区</dt><dd>${d[2]}</dd>`;
    ship.hidden = st.classList.contains('ok');
  };
  btns.forEach((b) => b.addEventListener('click', () => { fill(b); m.open(b); }));
  ship.addEventListener('click', () => { const st = cur.querySelector('.tag'); st.textContent = '已发货'; st.classList.add('ok'); m.close(); });
  // 挂载即打开第一条，不抢焦点；关掉后点任意一行的“查看”再打开
  fill(btns[0]); mk.setAttribute('data-open', ''); [...mk.parentNode.children].forEach((n) => { if (n !== mk) n.inert = true; });
}
</script>
