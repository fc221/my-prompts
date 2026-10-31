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

- 宽 480–560px（常用 520px），窄于 640px 全屏；从右侧滑入约 320ms，先快后慢，退出更快
- 头部标题 + 关闭按钮，正文独立滚动，底部固定操作栏（取消 / 保存）
- 模态抽屉：焦点锁在内部，Esc 关闭，关闭后焦点回到触发的那一行；有未保存修改时点遮罩不直接关闭
- 关闭后列表的筛选、排序、滚动位置不变；保存成功在原行更新
- 需要同时操作列表和详情时改用非模态分栏，不锁背景
- 手机上的导航抽屉可用推开式：抽屉从左侧进来时页面右移约 80%、缩到 0.92 并加 16px 圆角，点露出的页面关闭；减少动态效果时只做平移

## 提示词

在{列表页}用「抽屉」查看和编辑单项：从右侧滑入（320ms，先快后慢），宽 520px，窄于 640px 全屏；头部标题 + 关闭按钮，正文独立滚动，底部固定“取消 / 保存”操作栏；焦点进入抽屉并锁定，Esc 关闭，有未保存修改时点遮罩不直接关闭而是提示；关闭后焦点回到触发的那一行，列表的筛选、排序、滚动位置不变，保存成功在原行更新；内容变成多层页签或多步流程时改用独立页面。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.list{width:100%;max-width:520px;background:#fff;border:1px solid #e3e6eb;border-radius:10px;overflow:hidden}
.row{display:flex;align-items:center;gap:12px;height:44px;padding:0 8px 0 14px;font-size:13px}
.row+.row{border-top:1px solid #e3e6eb}
.row span:first-of-type{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tag{padding:0 8px;border-radius:999px;background:#fff4e5;color:#b54708;font-size:12px;line-height:20px;white-space:nowrap}
.tag.ok{background:#e7f6ef;color:#12805c}
.dw{place-items:stretch end;grid-template-rows:minmax(0,1fr);padding:0}
.side{width:min(280px,82%);height:100%;display:flex;flex-direction:column;border-radius:12px 0 0 12px;transform:translateX(100%);transition:transform .22s cubic-bezier(.4,0,1,1)}
.dw[data-open] .side{transform:none;transition:transform .32s cubic-bezier(0,0,.2,1)}
.hd{display:flex;align-items:center;padding:8px 8px 8px 18px;border-bottom:1px solid #e3e6eb}
h3{flex:1;font-size:15px}
.bd{flex:1;min-height:0;overflow:auto;padding:12px 18px;display:grid;grid-template-columns:auto 1fr;gap:6px 16px;align-content:start;font-size:13px}
dt{color:#5b616e}
.ft{display:flex;justify-content:flex-end;gap:8px;padding:10px 14px;border-top:1px solid #e3e6eb}
</style>

<div class="s"><div class="list"><div class="row"><b>#2041</b><span>林知科技</span><span class="tag">待发货</span><button class="b t sm" data-i="0">查看</button></div><div class="row"><b>#2042</b><span>周记餐饮</span><span class="tag">待发货</span><button class="b t sm" data-i="1">查看</button></div><div class="row"><b>#2043</b><span>北岸书店</span><span class="tag ok">已发货</span><button class="b t sm" data-i="2">查看</button></div></div><div class="mask dw" role="dialog" aria-modal="true" aria-labelledby="dwt"><div class="panel side"><div class="hd"><h3 id="dwt"></h3><button class="x" aria-label="关闭" data-close>×</button></div><dl class="bd"></dl><div class="ft"><button class="b" data-close>关闭</button><button class="b p ship">标记发货</button></div></div></div></div>

<script type="module">
import { modal } from '../../_shared/components-overlay.ts';

export default function demo(root) {
  const D = [['林知科技', '¥ 1,280.00', '杭州 · 西湖区'], ['周记餐饮', '¥ 356.00', '上海 · 徐汇区'], ['北岸书店', '¥ 92.50', '南京 · 鼓楼区']];
  const mk = root.querySelector('.dw'), bd = mk.querySelector('.bd'), ship = mk.querySelector('.ship'); let cur;
  const m = modal(root, mk, { scrim: true }); // 只读详情：点遮罩可以关闭
  root.querySelectorAll('[data-i]').forEach((b) => b.addEventListener('click', () => {
    cur = b.closest('.row'); const d = D[b.dataset.i], st = cur.querySelector('.tag');
    mk.querySelector('h3').textContent = '订单 ' + cur.querySelector('b').textContent;
    bd.innerHTML = `<dt>客户</dt><dd>${d[0]}</dd><dt>金额</dt><dd>${d[1]}</dd><dt>状态</dt><dd>${st.textContent}</dd><dt>地区</dt><dd>${d[2]}</dd>`;
    ship.hidden = st.classList.contains('ok'); m.open(b);
  }));
  ship.addEventListener('click', () => { const st = cur.querySelector('.tag'); st.textContent = '已发货'; st.classList.add('ok'); m.close(); });
}
</script>
