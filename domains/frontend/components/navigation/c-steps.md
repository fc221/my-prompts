---
zh: 步骤条
en: Steps
order: 50
---

## 是什么

一行带序号的圆点和连线，标出流程走到了第几步、哪些已经完成。

## 适合

3–5 步、有先后顺序的流程：开通服务、填报申请、下单支付。

## 不适合

没有先后关系的同级内容用标签页；只有 2 步，或超过 6 步时先重新拆分任务。

## 要点

- 3–5 步；状态分等待（灰框）、进行中（强调色实心）、已完成（对勾）、出错（危险色 + 图标 + 原因）
- 节点 24–28px，步骤名 14px，可带一行 12px 说明；已完成段的连线用强调色
- 已完成的步骤可以点回去修改，已填数据保留；还没到的步骤不可点
- 完成一步时连线的填充略冲过头约 4% 再回落到位（约 320ms），对勾同时弹出；减少动态效果时直接到位
- 当前步加 aria-current="step"，状态用文字说明（“已完成”），不只靠颜色
- 最后一步的按钮写具体动作（“提交申请”），不写“下一步”
- 窄屏改为竖向排列，或紧凑成“第 2 / 4 步 · 填写资料”

## 提示词

为{流程名}做「步骤条」，共 {3–5} 步：节点 26px + 步骤名 14px，可带一行 12px 说明；完成一步时连线填充略冲过约 4% 再回落（320ms），减少动态效果时直接到位；状态有等待（灰框）、进行中（强调色实心）、已完成（对勾，连线变强调色）、出错（危险色 + 图标 + 原因）；已完成的步骤可点回去修改并保留数据，未到的不可点；当前步加 aria-current="step"，状态用文字说明；底部“上一步 / 下一步”，最后一步按钮写具体动作；窄屏改竖向或“第 2 / 4 步 · 步骤名”。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.box{width:100%;max-width:520px;background:#fff;border:1px solid #e3e6eb;border-radius:10px;padding:18px 16px 14px;display:grid;gap:12px}
.st{display:flex;list-style:none;padding:0}
.st li{flex:1;position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;font-size:12px;color:#5b616e;text-align:center}
.st li+li::before{content:"";position:absolute;top:12px;left:calc(-50% + 20px);right:calc(50% + 20px);height:2px;border-radius:1px;background:#e3e6eb}
.st li.done+li::before{background:#3b5bdb}
.n{width:26px;height:26px;padding:0;border-radius:50%;border:2px solid #c9ced6;background:#fff;display:grid;place-items:center;font-size:12px;font-weight:600;color:#5b616e}
.done .n{border-color:#3b5bdb;color:#3b5bdb}
button.n:hover{background:#edf1ff}
.st .now{color:#1f2329;font-weight:600}
.now .n{background:#3b5bdb;border-color:#3b5bdb;color:#fff}
.cur{text-align:center;font-size:13px;color:#5b616e}
.act{display:flex;justify-content:center;gap:8px}
</style>

<div class="s"><div class="box"><ol class="st"></ol><p class="cur" aria-live="polite"></p><div class="act"><button class="b" data-prev>上一步</button><button class="b p" data-next>下一步</button></div></div></div>

<script type="module">
export default function demo(root) {
  const names = ['选择套餐', '填写资料', '确认支付', '完成']; let cur = 1;
  const ol = root.querySelector('.st'), txt = root.querySelector('.cur'), prev = root.querySelector('[data-prev]'), next = root.querySelector('[data-next]');
  const draw = () => {
    ol.innerHTML = names.map((n, i) => i < cur
      ? `<li class="done"><button class="n" data-i="${i}" aria-label="第 ${i + 1} 步 ${n}，已完成，返回修改">✓</button><span>${n}</span></li>`
      : `<li class="${i === cur ? 'now' : ''}"${i === cur ? ' aria-current="step"' : ''}><span class="n">${i + 1}</span><span>${n}</span></li>`).join('');
    txt.textContent = cur < 3 ? `第 ${cur + 1} / 4 步 · ${names[cur]}` : '已完成开通';
    prev.disabled = cur === 0 || cur === 3; next.textContent = cur === 3 ? '重新开始' : cur === 2 ? '确认支付' : '下一步';
  };
  ol.addEventListener('click', (e) => { const b = e.target.closest('[data-i]'); if (b) { cur = +b.dataset.i; draw(); } });
  prev.addEventListener('click', () => { cur--; draw(); });
  next.addEventListener('click', () => { cur = cur === 3 ? 0 : cur + 1; draw(); });
  draw();
}
</script>
