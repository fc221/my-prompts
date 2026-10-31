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

- 点击打开（不是悬停），宽 240–320px，与触发器间距 8px，可带箭头
- 非模态：不压暗背景、不锁焦点；打开后焦点进入卡片，焦点移出卡片时自动关闭
- Esc、点外部关闭，焦点回到触发器；触发器带 aria-expanded 和 aria-controls
- 从触发点方向淡入 + 从 0.96 放大，约 160ms；靠近边缘自动翻转
- 窄屏改为底部面板

## 提示词

给{头像 / 人名 / 字段}加「浮层卡片」：点击打开（不是悬停），贴着触发器下方 8px，宽 280px，内容放{资料或轻操作}，最多 2 个按钮；非模态，不压暗背景；打开时焦点进入卡片，Esc 或点外部关闭并把焦点还给触发器，焦点移出卡片时自动关闭；触发器 aria-expanded + aria-controls；从触发点方向淡入缩放 160ms，靠近边缘自动翻转；窄屏改为底部面板。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{place-items:start center}
.cm{width:100%;max-width:460px;padding:12px 16px;background:#fff;border:1px solid #e3e6eb;border-radius:10px;display:grid;gap:6px}
.meta{display:flex;align-items:center;gap:8px}
.anc{position:relative}
.who{height:26px;padding:0 8px;border:0;border-radius:6px;background:#f0f2f5;font-size:13px;font-weight:600}
.who:hover,.who[aria-expanded="true"]{background:#e3e6eb}
.tx{font-size:13px}
.pv{position:absolute;left:0;top:calc(100% + 8px);z-index:3;width:250px;padding:12px;background:#fff;border:1px solid #e3e6eb;border-radius:12px;box-shadow:0 8px 24px rgba(15,17,22,.14);display:grid;gap:8px;transform-origin:top left}
.top{display:flex;gap:10px;align-items:center}
.top div{display:grid;line-height:1.4}
.av{width:36px;height:36px;border-radius:50%;background:#edf1ff;color:#3b5bdb;display:grid;place-items:center;font-weight:600}
.ac{display:flex;gap:8px}
.ac .b{flex:1}
</style>

<div class="s"><div class="cm"><div class="meta"><span class="anc"><button class="who" aria-expanded="false" aria-controls="pv">王敏</button><div class="pv pop-in" id="pv" role="dialog" aria-label="王敏的资料" hidden><div class="top"><span class="av">王</span><div><b>王敏</b><span class="muted">产品经理 · 增长组</span></div></div><p class="muted">wangmin@example.com · 当地 14:20</p><div class="ac"><button class="b sm">查看主页</button><button class="b p sm">发消息</button></div></div></span><span class="muted">评论于 10-23 14:20</span></div><p class="tx">首页的数据卡片可以再精简一些，我在原型里标出来了。</p></div></div>

<script type="module">
import { pop } from '../../_shared/components-overlay.ts';

export default function demo(root) {
  const who = root.querySelector('.who'), pv = root.querySelector('.pv'), anc = root.querySelector('.anc');
  const set = pop(root, who, pv);
  anc.addEventListener('focusout', (e) => { if (!pv.hidden && e.relatedTarget && !anc.contains(e.relatedTarget)) set(false); });
}
</script>
