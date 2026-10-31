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

- 只有顶部圆角 12–16px；可拖动时显示 36×4px 把手，不可拖动的确认类面板不显示把手
- 高度按内容，或收起约 30% / 半屏约 60% / 接近全屏 80–90% 几档
- 下拉超过面板高度 1/3，或速度超过约 0.5px/ms 就关闭，否则弹回；同时保留关闭按钮等非拖动方式
- 模态面板背景压暗、焦点锁定；内部滚动区 overscroll-behavior: contain，防止滚动穿透
- 底部按钮加 env(safe-area-inset-bottom)；软键盘弹出时内容和按钮仍可见
- 系统返回键先关闭面板（打开时 pushState，popstate 时关闭）
- 多步面板（选规格 → 选地址 → 确认）在同一个面板里左右滑动切换步骤，高度同步过渡到新内容的高度（约 280ms）；顶部有返回上一步，返回键先退一步
- 拉到最高一档时顶部圆角过渡到 0、把手同步淡出，面板变成一页；往下拖回来时一起恢复
- 从下边滑入，和对话框的居中缩放区分开；背后页面可以随面板升起缩到约 0.94 并压暗，关闭时同步复原。面板里再开一层见「面板上再叠一层」

## 提示词

在{移动端页面}用「底部面板」承载{筛选 / 评论 / 更多操作}：从底部升起，顶部圆角 16px，可拖动时显示 36×4px 把手；高度按内容，或半屏 60% / 接近全屏 90% 两档；下拉超过面板高度 1/3 或快速下滑关闭，否则弹回，同时保留关闭按钮；背景压暗、焦点锁在面板内，内部滚动区 overscroll-behavior: contain；底部按钮加安全区，软键盘弹出时不被遮挡；系统返回键先关闭面板；拉到全屏档时顶部圆角过渡到 0、把手淡出；桌面端改为对话框或侧边抽屉。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{padding:10px}
.ph{position:relative;width:min(240px,100%);height:100%;display:flex;flex-direction:column;background:#fff;border:1px solid #e3e6eb;border-radius:18px;overflow:hidden}
.nb{flex:none;height:40px;display:grid;place-items:center;font-weight:600;font-size:15px;border-bottom:1px solid #eef0f3}
.ct{padding:10px 14px;display:grid;gap:8px;justify-items:start}
.ln{width:100%}
.ln.w{width:60%}
.sh{place-items:end stretch;padding:0}
.sheet{border-radius:14px 14px 0 0;overscroll-behavior:contain;transform:translateY(100%);transition:transform .22s cubic-bezier(.4,0,1,1)}
.sh[data-open] .sheet{transform:none;transition:transform .3s cubic-bezier(0,0,.2,1)}
.grab{height:18px;display:grid;place-items:center;cursor:grab;touch-action:none}
.grab i{width:36px;height:4px;border-radius:2px;background:#c9ced6}
.hd{display:flex;align-items:center;padding:0 8px 0 16px}
h3{flex:1;font-size:15px}
.chips{display:flex;flex-wrap:wrap;gap:8px;padding:4px 16px 12px}
.chips button{height:30px;padding:0 12px;border:1px solid #e3e6eb;border-radius:999px;background:#fff;font-size:13px}
.chips [aria-pressed="true"]{border-color:#3b5bdb;background:#edf1ff;color:#3b5bdb}
.ft{display:flex;gap:8px;padding:8px 16px calc(10px + env(safe-area-inset-bottom));border-top:1px solid #eef0f3}
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
}
</script>
