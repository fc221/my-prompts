---
zh: 底部面板
en: Bottom sheet
aka: 底部抽屉 半屏弹窗 动作面板 bottom sheet
order: 40
tab: 底部面板
---

## 是什么

从手机屏幕底部升起的面板，顶部有拖动把手，往下拖就能关掉。

## 适合

移动端的次级内容和操作：筛选、评论、购物车、分享、更多操作。

## 不适合

桌面端用对话框或侧边抽屉；复杂长表单用独立页面；只有几个动作时用动作面板（一列按钮 + 单独的取消）。

## 要点

- 用组件库的抽屉做底部面板：Element Plus el-drawer direction="btt"（size 定高度，可写百分比），Naive UI n-drawer placement="bottom"（height，resizable 可拖高度），Ant Design Vue a-drawer placement="bottom"（height）；遮罩、焦点锁定、滚动锁定、Esc 由组件负责，自己再加顶部圆角、把手、安全区
- 高度必须写：三家的底部抽屉都不会随内容自适应（Element Plus 默认 30%，Naive UI 默认 251px，Ant Design Vue 默认 378px）；按内容时按行数算一个值，或定半屏 60% / 接近全屏 90% 两档
- 只有顶部圆角 12 至 16px，写在面板样式上（Naive UI content-style，Ant Design Vue contentWrapperStyle，Element Plus 用自定义 class 覆盖）；遮罩和面板的动画用组件默认的
- 把手和下拉关闭三家都没有：可拖动时在 header 插槽画 36×4px 把手，自己监听 pointer 事件，下拉超过面板高度 1/3 或快速下滑就关、否则弹回，同时保留关闭按钮；不可拖的确认类面板不画把手
- 底部按钮放 footer 插槽并加 env(safe-area-inset-bottom)；软键盘弹出时内容和按钮仍可见
- 系统返回键先关闭面板：打开时 pushState，popstate 时把 v-model 置 false，三家都没有现成的
- 多步面板（选规格 → 选地址 → 确认）在同一个面板里切换步骤，顶部放返回上一步，返回键先退一步；面板里再开一层见「面板上再叠一层」
- 桌面端同一个组件换方向就是侧边抽屉（direction="rtl" / placement="right"），或改用「对话框」

## 提示词

在{移动端页面}用「底部面板」承载{筛选 / 评论 / 更多操作}：用项目组件库自带的抽屉改成底部（Element Plus el-drawer direction="btt" size；Naive UI n-drawer placement="bottom" height；Ant Design Vue a-drawer placement="bottom" height），不手写面板、遮罩和焦点锁定。高度 {按内容算的值 / 60% / 90%}，三家都不会随内容自适应，必须写；顶部圆角 16px；{可拖动时}在 header 插槽画 36×4px 把手并自己监听下拉，超过面板高度 1/3 或快速下滑关闭，否则弹回，同时保留关闭按钮；底部按钮放 footer 插槽并加 env(safe-area-inset-bottom)，软键盘弹出时不被遮挡；打开时 pushState，系统返回键先关闭面板；桌面端同一组件改成 direction="rtl" / placement="right"，或换「对话框」。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{padding:8px}
.ph{position:relative;width:min(240px,100%);height:100%;display:flex;flex-direction:column;background:#fff;border:1px solid #e3e6eb;border-radius:16px;overflow:hidden}
.nb{flex:none;height:40px;display:grid;place-items:center;font-weight:600;font-size:14px;border-bottom:1px solid #eef0f3}
.ct{padding:8px 12px;display:grid;gap:8px;justify-items:start}
.ln{width:100%}
.ln.w{width:60%}
.sh{place-items:end stretch;padding:0}
.sheet{border-radius:16px 16px 0 0;overscroll-behavior:contain;transform:translateY(100%);transition:transform .22s cubic-bezier(.4,0,1,1)}
.sh[data-open] .sheet{transform:none;transition:transform .3s cubic-bezier(0,0,.2,1)}
.grab{height:20px;display:grid;place-items:center;cursor:grab;touch-action:none}
.grab i{width:36px;height:4px;border-radius:2px;background:#c9ced6}
.hd{display:flex;align-items:center;padding:0 8px 0 16px}
h3{flex:1;font-size:14px}
.chips{display:flex;flex-wrap:wrap;gap:8px;padding:4px 16px 12px}
.chips button{height:32px;padding:0 12px;border:1px solid #e3e6eb;border-radius:999px;background:#fff;font-size:13px}
.chips [aria-pressed="true"]{border-color:#3b5bdb;background:#edf1ff;color:#3b5bdb}
.ft{display:flex;gap:8px;padding:8px 16px calc(8px + env(safe-area-inset-bottom));border-top:1px solid #eef0f3}
.ft .b{flex:1;height:36px}
</style>

<div class="s"><div class="ph"><div class="nb">商品列表</div><div class="ct"><button class="b open">筛选</button><i class="ln"></i><i class="ln"></i><i class="ln w"></i></div><div class="mask sh" role="dialog" aria-modal="true" aria-labelledby="sht"><div class="panel sheet"><div class="grab" aria-hidden="true"><i></i></div><div class="hd"><h3 id="sht">筛选</h3><button class="x" aria-label="关闭" data-close>×</button></div><div class="chips"><button aria-pressed="false">有货</button><button aria-pressed="false">包邮</button><button aria-pressed="false">满减</button></div><div class="ft"><button class="b reset">重置</button><button class="b p ok">确定</button></div></div></div></div></div>

<script type="module">
import { modal } from '../../_shared/components-overlay.ts';

export default function demo(root) {
  const open = root.querySelector('.open'), mk = root.querySelector('.sh'), sheet = mk.querySelector('.sheet'), grab = mk.querySelector('.grab'), chips = [...mk.querySelectorAll('.chips button')];
  const m = modal(root, mk, { scrim: true });
  open.addEventListener('click', () => m.open(open));
  chips.forEach((c) => c.addEventListener('click', () => c.setAttribute('aria-pressed', String(c.getAttribute('aria-pressed') !== 'true'))));
  mk.querySelector('.reset').addEventListener('click', () => chips.forEach((c) => c.setAttribute('aria-pressed', 'false')));
  mk.querySelector('.ok').addEventListener('click', () => { const n = chips.filter((c) => c.getAttribute('aria-pressed') === 'true').length; open.textContent = n ? '筛选 · ' + n : '筛选'; m.close(); });
  // 拖动把手：下拉超过 1/3 或速度 > 0.5px/ms 关闭，否则弹回
  let y0 = 0, t0 = 0, dy = 0, drag = false;
  grab.addEventListener('pointerdown', (e) => { drag = true; grab.setPointerCapture(e.pointerId); y0 = e.clientY; t0 = e.timeStamp; dy = 0; sheet.style.transition = 'none'; });
  grab.addEventListener('pointermove', (e) => { if (!drag) return; dy = Math.max(0, e.clientY - y0); sheet.style.transform = 'translateY(' + dy + 'px)'; });
  const end = (e) => { if (!drag) return; drag = false; const fast = dy / Math.max(1, e.timeStamp - t0) > 0.5; sheet.style.transition = sheet.style.transform = ''; if (e.type === 'pointerup' && (dy > sheet.offsetHeight / 3 || fast)) m.close(); };
  grab.addEventListener('pointerup', end); grab.addEventListener('pointercancel', end);
  // 挂载即打开，不抢焦点；关掉后点“筛选”再打开
  mk.setAttribute('data-open', ''); [...mk.parentNode.children].forEach((n) => { if (n !== mk) n.inert = true; });
}
</script>
