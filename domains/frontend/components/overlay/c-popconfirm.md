---
zh: 气泡确认
en: Popconfirm
order: 50
---

## 是什么

在按钮旁边冒出的小气泡：一句话说明后果，加“取消 / 移除”两个小按钮。

## 适合

影响有限的局部操作的短确认：删除一条草稿、移除成员、撤回申请。

## 不适合

不可逆或影响大的操作用确认对话框；能恢复的高频操作直接执行并给撤销；不放多段解释或表单。

## 要点

- 用组件库的气泡确认：Element Plus el-popconfirm（title、confirm-button-text、cancel-button-text、confirm-button-type、width、@confirm，触发按钮放 reference 插槽），Naive UI n-popconfirm（positive-text、negative-text、positive-button-props、@positive-click，触发按钮放 trigger 插槽），Ant Design Vue a-popconfirm（title、description、ok-text、cancel-text、ok-type、@confirm）；箭头、贴边翻转、点外部关闭、Esc 都由组件负责
- 一句话说明对象和后果：“将周一鸣移出项目？移出后他无法再查看项目内容。”Ant Design Vue 把问句放 title、后果放 description，另两家都写在 title 里
- 按钮写具体动作“移除”，三家默认都是“确定 / 取消”一类的通用词，必须显式传文案；危险动作的确认键用危险色（confirm-button-type="danger" / positive-button-props { type: 'error' } / ok-type="danger"），列表里的触发按钮保持中性色
- 宽 200 至 280px：Element Plus 默认只有 150px，要写 width；Naive UI 用 width，Ant Design Vue 用 overlayStyle 限宽，不然长句子拉成一行
- 执行中确认键加载并防重复：Ant Design Vue okButtonProps: { loading }，Naive UI positive-button-props: { loading }；Element Plus 没有，确认后直接关闭，在那一行显示加载和结果
- Element Plus 默认带橙色问号图标，不合适就 hide-icon 或换 icon；Naive UI 用 show-icon 控制
- 同一时间只开一个；不可逆、影响大的操作改用「确认对话框（危险操作）」，可恢复的高频操作直接执行并给「操作后撤销」

## 提示词

给{局部操作，如移除成员}加「气泡确认」：用项目组件库自带的气泡确认（Element Plus el-popconfirm width="240" confirm-button-type="danger"；Naive UI n-popconfirm :positive-button-props="{ type: 'error' }"；Ant Design Vue a-popconfirm ok-type="danger"），触发按钮放它的 reference / trigger / 默认插槽，不手写气泡和箭头。文案一句话说明对象和后果“{将 X 移出项目？移出后……}”（Ant Design Vue 拆成 title 和 description）；按钮“取消 / {动作}”都显式传文案，确认键用危险色，列表里的触发按钮用中性色；执行中确认键加载（okButtonProps / positive-button-props 的 loading；Element Plus 关闭后在行上显示加载），成功后从列表移除并在旁边说明；不可逆、影响大的操作改用「确认对话框（危险操作）」，可恢复的高频操作直接执行并给「操作后撤销」。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{place-items:start center;align-content:start;gap:8px}
.list{width:100%;max-width:440px;background:#fff;border:1px solid #e3e6eb;border-radius:10px}
.row{display:flex;align-items:center;gap:8px;height:52px;padding:0 8px 0 12px}
.row+.row{border-top:1px solid #e3e6eb}
.av{width:32px;height:32px;flex:none;border-radius:50%;background:#edf1ff;color:#3b5bdb;display:grid;place-items:center;font-size:12px;font-weight:600}
.nm{flex:1;display:grid;font-size:13px;line-height:1.35}
small{font-size:12px;color:#5b616e}
.anc{position:relative}
.pc{position:absolute;right:0;top:calc(100% + 8px);z-index:3;width:240px;padding:12px;background:#fff;border:1px solid #e3e6eb;border-radius:10px;box-shadow:0 8px 24px rgba(15,17,22,.14);transform-origin:top right}
.pc::before{content:"";position:absolute;top:-6px;right:18px;width:10px;height:10px;background:#fff;border-left:1px solid #e3e6eb;border-top:1px solid #e3e6eb;transform:rotate(45deg)}
.pc p{font-size:13px}
.ac{display:flex;justify-content:flex-end;gap:8px;margin-top:8px}
.out{display:flex;align-items:center;gap:4px}
</style>

<div class="s"><div class="list"><div class="row"><span class="av">周</span><span class="nm">周一鸣<small>编辑者</small></span><span class="anc"><button class="b t sm rm" aria-expanded="true" aria-controls="pc">移除</button><div class="pc pop-in" id="pc" role="dialog" aria-labelledby="pct"><p id="pct">将周一鸣移出项目？移出后他无法再查看项目内容。</p><div class="ac"><button class="b sm" data-no>取消</button><button class="b d sm" data-yes>移除</button></div></div></span></div><div class="row"><span class="av">林</span><span class="nm">林知<small>所有者</small></span><span class="muted">不可移除</span></div></div><p class="muted out" role="status"></p></div>

<script type="module">
import { pop } from '../../_shared/components-overlay.ts';

export default function demo(root) {
  const rm = root.querySelector('.rm'), pc = root.querySelector('.pc'), row = rm.closest('.row'), out = root.querySelector('.out');
  const set = pop(root, rm, pc); // 挂载时气泡已经展开（hidden 没写），点外部或“取消”关掉，再点“移除”打开
  pc.querySelector('[data-no]').addEventListener('click', () => set(false, true));
  pc.querySelector('[data-yes]').addEventListener('click', () => { set(false); row.hidden = true; out.innerHTML = '已将周一鸣移出项目 <button class="b t sm">恢复示例</button>'; out.querySelector('button').focus(); });
  out.addEventListener('click', (e) => { if (e.target.closest('button')) { row.hidden = false; out.textContent = ''; rm.focus(); } });
}
</script>
