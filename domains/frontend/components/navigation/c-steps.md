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

- 用组件库的步骤条：Element Plus el-steps（active、finish-status、process-status、direction、simple、align-center）+ el-step（title、description、status）、Naive UI n-steps（current、status、vertical、size）+ n-step（title、description、status）、Ant Design Vue a-steps（current、status、direction、labelPlacement、size、responsive）+ a-step（title、subTitle、description、status、disabled）
- 3–5 步，步骤名 2–6 个字，说明一行以内；当前步由 active / current 决定，等待、进行中、已完成的颜色、连线和对勾组件自带，不改
- 出错：Element Plus 设 process-status="error"，Naive UI、Ant Design Vue 设 status="error"，说明里写原因和怎么改，不只靠颜色
- 已完成的步骤可以点回去修改：Ant Design Vue 绑 change 事件，Naive UI 绑 on-update:current（一绑就能点），Element Plus 的 el-step 没有点击事件，自己包一层；未到的步骤不响应；返回修改时保留已填数据
- 最后一步的按钮写具体动作（“提交申请”），不写“下一步”；上一步 / 下一步按钮放在表单底部，步骤条只负责显示进度，见「分步表单」
- 连线填充冲过头再回落、对勾弹出这类动效是可选项，不进默认要求，用组件默认过渡就好
- 窄屏改竖向（direction="vertical" / vertical；Ant Design Vue 的 responsive 默认在 532px 以下自动转），或紧凑成“第 2 / 4 步 · 填写资料”

## 提示词

为{流程名}做「步骤条」，共 {3–5} 步：用项目组件库自带的步骤条（Element Plus el-steps :active + el-step；Naive UI n-steps :current + n-step；Ant Design Vue a-steps :current + a-step），不手写。步骤名 2–6 个字，可带一行说明；等待 / 进行中 / 已完成的颜色、连线和对勾用组件默认的；出错时把状态设为 error 并在说明里写原因；已完成的步骤可以点回去修改（Ant Design Vue 用 change、Naive UI 用 on-update:current、Element Plus 自己包点击），返回时保留已填数据，未到的步骤不可点；底部“上一步 / 下一步”，最后一步按钮写具体动作“{提交申请}”；窄于 640px 改竖向或紧凑成“第 2 / 4 步 · 步骤名”。

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
