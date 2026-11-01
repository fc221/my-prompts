---
zh: 浮层卡片
en: Popover
order: 70
---

## 是什么

点击某个元素后贴着它弹出的卡片，放补充信息或一两个轻操作。

## 适合

人名的资料卡、几个快捷设置、某个字段的详细说明。

## 不适合

只有一句解释用文字提示；长流程或复杂编辑用抽屉或页面；危险操作的确认用气泡确认或确认对话框。

## 要点

- 用组件库的浮层卡片：Element Plus el-popover（trigger="click"、width、placement、title，触发器放 reference 插槽），Naive UI n-popover（trigger="click"、placement、width，触发器放 trigger 插槽，header / footer 插槽），Ant Design Vue a-popover（trigger="click"、title、content 插槽、placement）；箭头、贴边翻转、点外部关闭、Esc 由组件负责
- 三家默认都是悬停触发，要显式写 trigger="click"；悬停只配一句解释，那是「文字提示」
- 宽 240 至 320px：Element Plus 默认只有 150px，要写 width；Naive UI 用 width，Ant Design Vue 用 overlayStyle
- 内容放资料或轻操作，最多 2 个按钮；点了按钮要把卡片关掉，用受控的 v-model:visible / v-model:show / v-model:open 置 false
- 非模态：不压暗背景、不锁焦点，页面其他地方照常可点
- 卡片默认挂在 body 上（Element Plus teleported、Naive UI to、Ant Design Vue getPopupContainer），组件里的 scoped 样式作用不到它，改样式用 popper-class / content-class / overlayClassName；不要为了样式改成就地渲染，会被滚动容器裁掉
- 窄屏改为「底部面板」

## 提示词

给{头像 / 人名 / 字段}加「浮层卡片」：用项目组件库自带的浮层卡片（Element Plus el-popover trigger="click" width="280"；Naive UI n-popover trigger="click"；Ant Design Vue a-popover trigger="click"），触发器放 reference / trigger / 默认插槽，不手写卡片和定位。三家默认悬停触发，必须写 trigger="click"；宽 280px（Element Plus 和 Naive UI 用 width，Ant Design Vue 用 overlayStyle）；内容放{资料或轻操作}，最多 2 个按钮，点按钮后用 v-model:visible / v-model:show / v-model:open 关掉；非模态，不压暗背景；卡片挂在 body 上，改样式用 popper-class / content-class / overlayClassName，不用 scoped 样式；窄屏改为「底部面板」。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{place-items:start center}
.cm{width:100%;max-width:460px;padding:12px 16px;background:#fff;border:1px solid #e3e6eb;border-radius:10px;display:grid;gap:8px}
.meta{display:flex;align-items:center;gap:8px}
.anc{position:relative}
.who{height:28px;padding:0 8px;border:0;border-radius:6px;background:#f0f2f5;font-size:13px;font-weight:600}
.who:hover,.who[aria-expanded="true"]{background:#e3e6eb}
.tx{font-size:13px}
.pv{position:absolute;left:0;top:calc(100% + 8px);z-index:3;width:248px;padding:12px;background:#fff;border:1px solid #e3e6eb;border-radius:12px;box-shadow:0 8px 24px rgba(15,17,22,.14);display:grid;gap:8px;transform-origin:top left}
.top{display:flex;gap:8px;align-items:center}
.top div{display:grid;line-height:1.4}
.av{width:36px;height:36px;border-radius:50%;background:#edf1ff;color:#3b5bdb;display:grid;place-items:center;font-weight:600}
.ac{display:flex;gap:8px}
.ac .b{flex:1}
</style>

<div class="s"><div class="cm"><div class="meta"><span class="anc"><button class="who" aria-expanded="true" aria-controls="pv">王敏</button><div class="pv pop-in" id="pv" role="dialog" aria-label="王敏的资料"><div class="top"><span class="av">王</span><div><b>王敏</b><span class="muted">产品经理 · 增长组</span></div></div><p class="muted">wangmin@example.com · 当地 14:20</p><div class="ac"><button class="b sm">查看主页</button><button class="b p sm">发消息</button></div></div></span><span class="muted">评论于 10-23 14:20</span></div><p class="tx">首页的数据卡片可以再精简一些，我在原型里标出来了。</p></div></div>

<script type="module">
import { pop } from '../../_shared/components-overlay.ts';

export default function demo(root) {
  const who = root.querySelector('.who'), pv = root.querySelector('.pv'), anc = root.querySelector('.anc');
  const set = pop(root, who, pv); // 挂载时卡片已经展开（hidden 没写），点外部关掉，再点人名打开
  anc.addEventListener('focusout', (e) => { if (!pv.hidden && e.relatedTarget && !anc.contains(e.relatedTarget)) set(false); });
}
</script>
