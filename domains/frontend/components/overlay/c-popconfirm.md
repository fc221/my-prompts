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

- 贴着触发按钮出现、带指向箭头，宽 200–280px；一句话 + 两个 28px 高的小按钮
- 按钮写具体动作（“移除”），危险动作可用危险色；初始焦点在“取消”
- Esc、点外部都等于取消，关闭后焦点回到触发按钮
- 从触发点方向淡入 + 缩放，约 160ms；靠近边缘自动翻转方向
- 同一时间只开一个

## 提示词

给{局部操作，如移除成员}加「气泡确认」：贴着触发按钮弹出、带箭头，宽 240px，一句话说明对象和后果，下面“取消 / {动作}”两个 28px 小按钮，危险动作用危险色；打开后焦点在“取消”，Esc 或点外部等于取消，关闭后焦点回到触发按钮；从触发点方向淡入缩放 160ms，靠近边缘自动翻转；一次只开一个；不可逆、影响大的操作改用确认对话框，可恢复的高频操作直接执行并给撤销。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{place-items:start center;align-content:start;gap:10px}
.list{width:100%;max-width:440px;background:#fff;border:1px solid #e3e6eb;border-radius:10px}
.row{display:flex;align-items:center;gap:10px;height:52px;padding:0 10px 0 14px}
.row+.row{border-top:1px solid #e3e6eb}
.av{width:30px;height:30px;flex:none;border-radius:50%;background:#edf1ff;color:#3b5bdb;display:grid;place-items:center;font-size:12px;font-weight:600}
.nm{flex:1;display:grid;font-size:13px;line-height:1.35}
small{font-size:12px;color:#5b616e}
.anc{position:relative}
.pc{position:absolute;right:0;top:calc(100% + 10px);z-index:3;width:240px;padding:12px;background:#fff;border:1px solid #e3e6eb;border-radius:10px;box-shadow:0 8px 24px rgba(15,17,22,.14);transform-origin:top right}
.pc::before{content:"";position:absolute;top:-6px;right:18px;width:10px;height:10px;background:#fff;border-left:1px solid #e3e6eb;border-top:1px solid #e3e6eb;transform:rotate(45deg)}
.pc p{font-size:13px}
.ac{display:flex;justify-content:flex-end;gap:8px;margin-top:10px}
.out{display:flex;align-items:center;gap:4px}
</style>

<div class="s"><div class="list"><div class="row"><span class="av">周</span><span class="nm">周一鸣<small>编辑者</small></span><span class="anc"><button class="b t sm rm" aria-expanded="false" aria-controls="pc">移除</button><div class="pc pop-in" id="pc" role="dialog" aria-labelledby="pct" hidden><p id="pct">将周一鸣移出项目？移出后他无法再查看项目内容。</p><div class="ac"><button class="b sm" data-no>取消</button><button class="b d sm" data-yes>移除</button></div></div></span></div><div class="row"><span class="av">林</span><span class="nm">林知<small>所有者</small></span><span class="muted">不可移除</span></div></div><p class="muted out" role="status"></p></div>

<script type="module">
import { pop } from '../../_shared/components-overlay.ts';

export default function demo(root) {
  const rm = root.querySelector('.rm'), pc = root.querySelector('.pc'), row = rm.closest('.row'), out = root.querySelector('.out');
  const set = pop(root, rm, pc);
  pc.querySelector('[data-no]').addEventListener('click', () => set(false, true));
  pc.querySelector('[data-yes]').addEventListener('click', () => { set(false); row.hidden = true; out.innerHTML = '已将周一鸣移出项目 <button class="b t sm">恢复示例</button>'; out.querySelector('button').focus(); });
  out.addEventListener('click', (e) => { if (e.target.closest('button')) { row.hidden = false; out.textContent = ''; rm.focus(); } });
}
</script>
