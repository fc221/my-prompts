---
zh: 自动保存与保存状态
en: Autosave status
order: 20
---

## 是什么

停止输入片刻就自动保存，旁边始终显示保存中、已保存或保存失败。

## 适合

文档、笔记、长表单、配置页、编辑器等编辑时间长的页面。

## 不适合

需要明确确认才生效的改动（发布、付费变更、对外发送）不要自动保存，用显式按钮。

## 注意

“已保存”必须来自接口真实返回，不能定时显示一个假对勾。

## 要点

- 停止输入 800–1500ms 后保存；连续输入时最长每 10 秒至少保存一次。
- 状态固定在标题旁或工具栏右侧，宽度预留，文字切换不推挤布局。
- 四种状态：有未保存的修改（灰点）→ 保存中…（转圈）→ 已保存 · 14:32（成功色）→ 保存失败 · 重试（危险色）。
- 失败时把内容暂存在本地，网络恢复后自动重试并提示结果。
- 保存期间又有新输入：等当前请求结束再保存最新内容，旧请求的结果不覆盖新状态。
- 有未保存或保存失败的内容时，关闭页面、返回、切换记录前提醒。
- 状态文字放在 role="status" 里，只有失败时才明显提示。

## 提示词

给{编辑页面}加「自动保存」：停止输入 1 秒后自动保存，连续输入时最长 10 秒保存一次；在{标题旁}固定显示保存状态：有未保存的修改 / 保存中… / 已保存 · {时间} / 保存失败 · 重试，宽度预留不推挤布局；“已保存”只在接口成功后显示；失败时内容暂存本地，联网后自动重试；有未保存内容时离开页面先提醒。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{display:grid;place-items:center;padding:12px}
.doc{display:flex;flex-direction:column;width:100%;max-width:460px;height:100%;max-height:250px;padding:8px 14px;background:#fff;border:1px solid #e3e6eb;border-radius:12px;transition:border-color .16s}
.doc:focus-within{border-color:#3b5bdb}
.hd{display:flex;align-items:center;gap:10px;padding-bottom:6px;border-bottom:1px solid #e3e6eb}
.title{flex:1;min-width:0;padding:4px 0;border:0;outline:0;background:none;font-size:15px;font-weight:600}
textarea{flex:1;min-height:0;padding:6px 0;border:0;outline:0;resize:none;background:none;line-height:1.6}
.state{flex:none;display:inline-flex;align-items:center;gap:6px;min-width:96px;justify-content:flex-end;color:#5b616e;font-size:12px;white-space:nowrap}
.ic{width:8px;height:8px;border-radius:50%;background:#c9ced6}
.saving .ic{width:12px;height:12px;border:2px solid #c9ced6;border-top-color:#3b5bdb;background:none;animation:kbsp .8s linear infinite}
.saved{color:#12805c}
.saved .ic{background:#12805c}
.fail{color:#d92d20}
.fail .ic{background:#d92d20}
.state button{padding:0 0 0 4px;border:0;background:none;color:#3b5bdb;font-size:12px}
.ft{display:flex;align-items:center;justify-content:space-between;padding-top:6px;border-top:1px solid #e3e6eb}
.hint{color:#5b616e;font-size:12px}
@media (prefers-reduced-motion:reduce){.saving .ic{animation-duration:.8s!important;animation-iteration-count:infinite!important}
}
@container (min-width:560px){.doc{max-width:540px;padding:12px 20px}
}
.title{flex:1;min-width:0}
.state{flex:none;white-space:nowrap}
.ft{gap:10px}
.ft>:last-child{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.st{grid-template-columns:minmax(0,1fr)}
</style>

<div class="st"><div class="doc"><div class="hd"><input class="title" value="周会纪要 · 10 月 24 日" aria-label="标题"><span class="state" role="status"><i class="ic" aria-hidden="true"></i><span class="tx"></span></span></div><textarea aria-label="正文">1. 新版结算页本周五灰度 10%。
2. 退款入口的问题，下周一前给出方案。
3. 帮助中心改版延后到 11 月。</textarea><div class="ft"><label class="sw"><input type="checkbox" class="off"><i aria-hidden="true"></i>模拟断网</label><span class="hint">改几个字，停一下</span></div></div></div>

<script type="module">
export default function demo(root) {
  const st = root.querySelector('.state'), tx = root.querySelector('.tx'), off = root.querySelector('.off');
  let timer = 0, seq = 0;
  const now = () => new Date().toTimeString().slice(0, 5);
  const show = (cls, text) => { st.className = 'state ' + cls; tx.textContent = text; };
  const save = () => {
    const my = ++seq; show('saving', '保存中…');
    setTimeout(() => {
      if (my !== seq || !root.host.isConnected) return; // 保存期间又改了：这次结果作废，等下一次
      if (off.checked) {
        show('fail', '保存失败 ·');
        const b = document.createElement('button'); b.type = 'button'; b.textContent = '重试'; b.onclick = save; tx.append(b);
      } else show('saved', '已保存 · ' + now());
    }, 700);
  };
  root.querySelectorAll('.title, textarea').forEach((el) => el.addEventListener('input', () => {
    seq++; show('dirty', '有未保存的修改'); clearTimeout(timer); timer = setTimeout(save, 900);
  }));
  off.addEventListener('change', () => { if (!off.checked && st.classList.contains('fail')) save(); }); // 网络恢复后自动重试
  show('saved', '已保存 · ' + now());
}
</script>
