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

- 位置全站固定：普通提示在内容区顶部居中，距顶栏 12–16px；带撤销的放底部居中，距底 24px；不放左下、右下角
- 时长：普通约 3 秒；带撤销至少 10 秒并显示倒计时；鼠标悬停或焦点在内时暂停计时；错误类不自动消失
- 一句话不超过 2 行，带语义图标，不放链接；多条向下堆叠，最多 3 条
- 撤销必须真实恢复数据；后端没有恢复能力就不显示撤销
- 用 role="status" 播报（错误用 role="alert"），不抢焦点
- 从出现的边缘滑入 + 淡入约 240ms；减少动态效果时只淡入；窄屏避开底部导航和软键盘

## 提示词

给{保存 / 复制 / 删除}的结果加「轻提示」：普通 Toast 在内容区（不含侧栏）顶部居中、距顶栏 16px，一句话带语义图标，3 秒消失；结果在界面上已经看得到时（如就地显示了“已保存”）不弹普通 Toast；同时最多 3 条，超出先挤掉最早的非错误提示。可恢复的删除用底部居中的撤销条“已删除{对象} 撤销”，至少保留 10 秒并显示倒计时，连续删除合并成“已删除 N 个{对象}”并重新计时；撤销要真实恢复到原位置，可以用 Tab 走到撤销按钮，也支持 ⌘/Ctrl+Z。Toast 和撤销条在悬停或聚焦时都暂停计时；错误不自动消失、带关闭按钮、用 role="alert"，其余用 role="status"，都不抢焦点；从出现的边缘滑入 240ms；窄屏避开底部导航（有的话）和软键盘。

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
.toast{display:flex;align-items:center;gap:8px;padding:8px 14px;background:#fff;border:1px solid #e3e6eb;border-radius:8px;box-shadow:0 6px 20px rgba(15,17,22,.12);font-size:13px;white-space:nowrap;animation:tin .24s cubic-bezier(0,0,.2,1)}
.toast svg{color:#12805c;flex:none}
.snack{position:relative;display:flex;align-items:center;gap:12px;padding:6px 6px 6px 14px;background:#1f2329;color:#fff;border-radius:8px;font-size:13px;overflow:hidden;animation:bin .24s cubic-bezier(0,0,.2,1)}
.snack button{height:28px;padding:0 10px;border:0;border-radius:6px;background:none;color:#9db2ff;font-weight:600}
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
  root.querySelector('.save').addEventListener('click', () => {
    const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = I.ok + '已保存'; top.append(t);
    while (top.children.length > 3) top.firstChild.remove();
    timed(t, 3000, () => bye(t));
  });
  del.addEventListener('click', () => {
    pg.classList.add('del'); reset.focus(); bot.innerHTML = '';
    const s = document.createElement('div'); s.className = 'snack'; s.innerHTML = '已删除“周报草稿”<button>撤销</button><i></i>'; bot.append(s);
    const stop = timed(s, 10000, () => bye(s));
    s.querySelector('button').addEventListener('click', () => { stop(); bye(s); pg.classList.remove('del'); del.focus(); });
  });
  reset.addEventListener('click', () => { pg.classList.remove('del'); bot.innerHTML = ''; del.focus(); });
}
</script>
