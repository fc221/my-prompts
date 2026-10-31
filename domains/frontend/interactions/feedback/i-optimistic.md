---
zh: 乐观更新
en: Optimistic update
order: 40
---

## 是什么

点下去界面立刻显示结果，请求在后台发；失败就退回原样并说明原因。

## 适合

收藏、点赞、关注、勾选、改名、拖动排序等成功率高、可以撤回的轻操作。

## 不适合

支付、下单、给他人发消息、删除不可恢复的数据：等真实结果返回后再显示成功。

## 注意

连续快速点击时只认最后一次请求的结果，过期响应直接丢弃。

## 要点

- 只用于成功率很高且能撤回的操作；涉及钱、对外发送、不可逆的不用。
- 点击后同一帧更新状态、计数和样式，不显示转圈，不锁按钮。
- 请求进行中最多显示一行很轻的“同步中…”文字。
- 连点时给请求编号，只处理最后一次的响应，旧响应丢弃。
- 失败时恢复到操作前的值（不是反向再切一次），原位提示“没保存上，已恢复”和“重试”。
- 回滚可配一次不超过 300ms 的轻微抖动，让人看到是哪里变了。
- 列表、计数、角标等依赖同一条数据的地方一起更新、一起回滚。

## 提示词

把{收藏 / 点赞 / 关注}改成「乐观更新」：点击后同一帧切换状态并更新计数，不显示转圈、不锁按钮；请求在后台发送，连点时只认最后一次请求的结果；失败时把状态和计数恢复到点击前的值，原位提示“没保存上，已恢复”并给“重试”；所有显示这条数据的地方同步更新和回滚。支付、下单、对外发送等操作不要用乐观更新。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;place-items:center;padding:12px}
.box{width:100%;max-width:420px;background:#fff;border:1px solid #e3e6eb;border-radius:12px;padding:2px 14px 8px}
.row{display:flex;align-items:center;gap:12px;height:50px;border-bottom:1px solid #e3e6eb}
.tt{flex:1;min-width:0;display:flex;flex-direction:column;line-height:1.35}
.tt b{font-size:14px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tt small{color:#5b616e;font-size:12px}
.fav{display:inline-flex;align-items:center;gap:4px;height:32px;padding:0 12px 0 10px;border:1px solid #e3e6eb;border-radius:999px;background:#fff;color:#5b616e;font-variant-numeric:tabular-nums;transition:background .16s,border-color .16s,color .16s}
.fav:hover{border-color:#c3c9d4}
.fav svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linejoin:round}
.fav[aria-pressed=true]{color:#3b5bdb;border-color:#c5d0fa;background:#edf1ff}
.fav[aria-pressed=true] svg{fill:currentColor}
.fav.pop svg{animation:pop .36s cubic-bezier(.34,1.4,.64,1)}
.fav.back{animation:shake .3s}
@keyframes pop{50%{transform:scale(1.3)}
}
@keyframes shake{25%{transform:translateX(-3px)}
75%{transform:translateX(3px)}
}
.ft{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:36px;padding-top:6px}
.msg{min-width:0;color:#5b616e;font-size:12px;text-align:right}
.msg.err{color:#d92d20}
.msg.ok{color:#12805c}
.msg button{padding:0 0 0 6px;border:0;background:none;color:#3b5bdb;font-size:12px}
@container (min-width:560px){.box{max-width:500px;padding:6px 20px 12px}
.row{height:62px}
}
</style>

<div class="st"><div class="box"><div class="row"><div class="tt"><b>Q3 增长复盘</b><small>市场部 · 2.4 MB</small></div><button class="fav" type="button" aria-pressed="false" aria-label="收藏 Q3 增长复盘"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/></svg><span class="c">128</span></button></div><div class="row"><div class="tt"><b>新人入职手册</b><small>人事部 · 860 KB</small></div><button class="fav" type="button" aria-pressed="true" aria-label="收藏 新人入职手册"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/></svg><span class="c">57</span></button></div><div class="ft"><label class="sw"><input type="checkbox" class="fail"><i aria-hidden="true"></i>模拟请求失败</label><span class="msg" role="status">点星标试试</span></div></div></div>

<script type="module">
export default function demo(root) {
  const fail = root.querySelector('.fail'), msg = root.querySelector('.msg'); let hide = 0;
  const say = (t, cls) => { clearTimeout(hide); msg.className = 'msg ' + (cls || ''); msg.textContent = t; if (cls === 'ok') hide = setTimeout(() => { msg.textContent = ''; }, 1500); };
  root.querySelectorAll('.fav').forEach((b) => {
    const c = b.querySelector('.c'); let base = null, seq = 0;
    const set = (on, n) => { b.setAttribute('aria-pressed', String(on)); c.textContent = n; };
    const send = () => {
      const cur = { on: b.getAttribute('aria-pressed') === 'true', n: +c.textContent };
      if (!base) base = cur; // 一轮连点只记一次“点之前”的值，失败时回到它
      set(!cur.on, cur.n + (cur.on ? -1 : 1));
      b.classList.remove('pop', 'back'); void b.offsetWidth; if (!cur.on) b.classList.add('pop');
      const my = ++seq; say('同步中…');
      setTimeout(() => {
        if (my !== seq || !root.host.isConnected) return; // 只认最后一次请求
        if (fail.checked) {
          set(base.on, base.n); b.classList.add('back'); say('没保存上，已恢复原状', 'err');
          const r = document.createElement('button'); r.type = 'button'; r.textContent = '重试'; r.onclick = send; msg.append(r);
        } else say('已同步', 'ok');
        base = null;
      }, 800);
    };
    b.onclick = send;
  });
}
</script>
