---
zh: 轻提示 Toast
en: Toast / Snackbar
aka: 状态出现 消息提示 弹出提示
order: 80
---

## 是什么

操作后在顶部短暂出现的一条小提示，几秒后自己消失；可恢复的删除在底部给“撤销”。

## 适合

保存、复制、发送成功等简短结果；删除、归档等可恢复操作的撤销入口。

## 不适合

打断性弱的结果反馈用它，不用对话框；结果在界面上已经看得见时不弹；错误原因和需要用户决策的事用页内提示或对话框；字段错误放字段下方。

## 要点

- 用组件库的消息：Element Plus ElMessage({ message, type, duration, showClose, grouping, offset })，Naive UI n-message-provider（placement、max、duration）包住应用后 useMessage().success(content, { duration, closable, keepAliveOnHover })，Ant Design Vue message.success(content, duration) 加 message.config({ top, duration, maxCount })；位置、堆叠、进出动画、读屏播报由组件负责
- 位置全站固定在内容区顶部居中，三家默认就是顶部居中，距顶栏的距离用 Element Plus offset / Ant Design Vue top，Naive UI 用 placement="top"；带撤销的放底部居中；不放左下、右下角
- 时长：普通提示 3 秒，三家默认都是 3 秒不用改；错误类不自动消失并带关闭按钮，duration 设 0（三家都表示不自动关）加 showClose / closable；悬停或聚焦时暂停计时，Element Plus 默认有，Naive UI 要开 keepAliveOnHover
- 一句话不超过 2 行，用 type 带语义图标，不放链接；同时最多 3 条：Naive UI max、Ant Design Vue maxCount，Element Plus 没有上限，用 grouping 合并相同内容
- 结果在界面上已经看得见时（按钮旁就地显示了“已保存”）不弹
- 带撤销的至少停留 10 秒并显示倒计时，连续删除合并成“已删除 N 个”并重新计时：三家的消息都没有现成的操作按钮，内容传 VNode 放一个“撤销”（Element Plus message 传 h()、Naive UI render 选项、Ant Design Vue content 传 VNode），或自己写一条底部撤销条，做法见「操作后撤销」
- 撤销必须真实恢复数据到原位置；后端没有恢复能力就不显示撤销，改用确认；窄屏撤销条避开底部导航和软键盘

## 提示词

给{保存 / 复制 / 删除}的结果加轻提示：用项目组件库自带的消息（Element Plus ElMessage({ type, message })；Naive UI 用 n-message-provider 包住应用后 useMessage()；Ant Design Vue message.success()），不手写提示条。位置用默认的顶部居中，距顶栏 16px（Element Plus offset / Ant Design Vue message.config 的 top；Naive UI placement="top"）；普通提示用默认 3 秒，结果在界面上已经看得见时（就地显示了“已保存”）不弹；错误 duration 设 0 不自动消失并带关闭按钮（showClose / closable）；悬停时暂停计时（Naive UI 开 keepAliveOnHover）；同时最多 3 条（Naive UI max / Ant Design Vue maxCount；Element Plus 用 grouping 合并相同内容）。可恢复的删除用底部居中的撤销条“已删除{对象} 撤销”，至少保留 10 秒并显示倒计时，连续删除合并成“已删除 N 个{对象}”并重新计时：消息内容传 VNode 放“撤销”按钮（Element Plus h() / Naive UI render / Ant Design Vue content），或自己写一条撤销条；撤销要真实恢复到原位置，可以用 Tab 走到撤销按钮，也支持 ⌘/Ctrl+Z；窄屏避开底部导航和软键盘。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.pg{display:grid;gap:12px;justify-items:center;min-width:min(240px,100%);padding:16px 20px;background:#fff;border:1px solid #e3e6eb;border-radius:10px}
.doc{display:grid;justify-items:center}
.ac{display:flex;gap:8px}
.gone{display:none}
.pg.del .gone{display:block}
.pg.del .doc,.pg.del .ac{display:none}
.top{position:absolute;top:12px;left:50%;z-index:4;transform:translateX(-50%);display:grid;gap:8px;justify-items:center}
.bot{position:absolute;bottom:12px;left:50%;z-index:4;transform:translateX(-50%);width:max-content;max-width:calc(100% - 24px)}
.toast{display:flex;align-items:center;gap:8px;padding:8px 12px;background:#fff;border:1px solid #e3e6eb;border-radius:8px;box-shadow:0 6px 20px rgba(15,17,22,.12);font-size:13px;white-space:nowrap;animation:tin .24s cubic-bezier(0,0,.2,1)}
.toast svg{color:#12805c;flex:none}
.snack{position:relative;display:flex;align-items:center;gap:12px;padding:4px 4px 4px 12px;background:#1f2329;color:#fff;border-radius:8px;font-size:13px;overflow:hidden;animation:bin .24s cubic-bezier(0,0,.2,1)}
.snack button{height:28px;padding:0 8px;border:0;border-radius:6px;background:none;color:#9db2ff;font-weight:600}
.snack button:hover{background:rgba(255,255,255,.12)}
.snack i{position:absolute;left:0;bottom:0;width:100%;height:2px;background:#9db2ff;transform-origin:left;animation:cd 10s linear forwards;animation-play-state:var(--ps,running)}
.out{opacity:0;transition:opacity .16s}
@keyframes tin{from{opacity:0;transform:translateY(-8px)}
}
@keyframes bin{from{opacity:0;transform:translateY(8px)}
}
@keyframes cd{to{transform:scaleX(0)}
}
@media (prefers-reduced-motion:reduce){.toast,.snack{animation-name:fade}
}
</style>

<div class="s"><div class="pg"><div class="doc"><b>周报草稿</b><span class="muted">10-23 编辑</span></div><div class="ac"><button class="b save">保存</button><button class="b del">删除草稿</button></div><p class="gone muted">草稿已删除 <button class="b t sm reset">重置示例</button></p></div><div class="top" role="status"></div><div class="bot" role="status"></div></div>

<script type="module">
import { I, timed } from '../../_shared/components-overlay.ts';

export default function demo(root) {
  const top = root.querySelector('.top'), bot = root.querySelector('.bot'), pg = root.querySelector('.pg'), del = root.querySelector('.del'), reset = root.querySelector('.reset');
  const bye = (el) => { el.classList.add('out'); setTimeout(() => el.remove(), 160); };
  const saved = () => {
    const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = I.ok + '已保存'; top.append(t);
    while (top.children.length > 3) top.firstChild.remove();
    timed(t, 3000, () => bye(t)); // 3 秒消失，悬停或聚焦时暂停
  };
  root.querySelector('.save').addEventListener('click', saved);
  del.addEventListener('click', () => {
    pg.classList.add('del'); reset.focus(); bot.innerHTML = '';
    const s = document.createElement('div'); s.className = 'snack'; s.innerHTML = '已删除“周报草稿”<button>撤销</button><i></i>'; bot.append(s);
    const stop = timed(s, 10000, () => bye(s));
    s.querySelector('button').addEventListener('click', () => { stop(); bye(s); pg.classList.remove('del'); del.focus(); });
  });
  reset.addEventListener('click', () => { pg.classList.remove('del'); bot.innerHTML = ''; del.focus(); });
  saved(); // 挂载时先出一条“已保存”，看得到位置和样式；再点“保存”“删除草稿”重放
}
</script>
