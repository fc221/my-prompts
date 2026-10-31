---
zh: 标签与徽标
en: Tag & badge
order: 70
---

## 是什么

标签是带浅底的小块文字，标状态或分类；徽标是图标角上的数字或小圆点。

## 适合

标签：列表里的状态、分类、属性；徽标：导航和图标上的未读数、新内容提示。

## 不适合

不要把标签当按钮用；一行标签超过 3–4 个时收起为“+N”；多级严重度每级要有不同图标和文字，不只靠颜色深浅。

## 要点

- 标签高 22–24px，左右 8px，圆角 4px 或胶囊；标签间 8px；浅底 + 同色深字，对比度 ≥ 4.5:1
- 颜色语义固定：成功绿、警告橙、进行中主色、中性灰，危险红只给真实的失败和故障；同一含义全产品同色
- 状态标签可带 6px 圆点或 12px 图标，但文字必须在，不只靠颜色
- 可删除的标签带 × 按钮（aria-label“移除 X”），可选的标签用 aria-pressed
- 数字徽标高 16–18px，左右 4–6px，超过 99 显示“99+”，0 不显示；只需提示“有新内容”时用 8px 小圆点
- 徽标压在图标右上角并加 2px 底色描边；图标按钮的 aria-label 带上数量（“通知，3 条未读”）

## 提示词

给{工单列表}统一标签与徽标：状态标签高 22px、左右 8px、圆角 4px，浅底同色深字并带 6px 圆点（待处理警告色、处理中主色、已解决成功色、已关闭中性灰，危险色只给失败）；分类标签用中性灰，超过 3 个收为“+N”；顶栏通知图标右上角放数字徽标（高 18px，超过 99 显示“99+”，0 不显示），按钮 aria-label 写“通知，N 条未读”；只需提示新内容时用 8px 小圆点。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{display:flex;flex-direction:column;align-items:flex-start;gap:16px;max-width:100%}
.row{display:flex;flex-wrap:wrap;align-items:center;gap:8px}
.tg{display:inline-flex;align-items:center;gap:6px;height:22px;padding:0 8px;border-radius:4px;font-size:12px;white-space:nowrap}
.tg i{width:6px;height:6px;border-radius:50%;background:currentColor}
.wa{background:#fdf0e6;color:#b54708}
.pr{background:#edf1ff;color:#3b5bdb}
.ok{background:#e7f5ef;color:#12805c}
.ne{background:#eef0f3;color:#5b616e}
.dg{background:#fdecea;color:#b42318}
.ib{position:relative;display:grid;place-items:center;width:32px;height:32px;padding:0;border:1px solid #e3e6eb;border-radius:6px;background:#fff;color:#5b616e;cursor:pointer}
.ib:hover{color:#1f2329}
.bd{position:absolute;top:-6px;left:20px;min-width:18px;height:18px;padding:0 5px;border-radius:999px;background:#d92d20;color:#fff;font-size:12px;line-height:18px;font-weight:600;text-align:center;box-shadow:0 0 0 2px #f5f6f8;font-variant-numeric:tabular-nums}
.dt{position:absolute;top:-3px;right:-3px;width:8px;height:8px;border-radius:50%;background:#d92d20;box-shadow:0 0 0 2px #f5f6f8}
.add{height:28px;margin-left:8px}
</style>

<div class="s"><div class="w"><div class="row"><span class="tg wa"><i></i>待处理</span><span class="tg pr"><i></i>处理中</span><span class="tg ok"><i></i>已解决</span><span class="tg ne"><i></i>已关闭</span><span class="tg dg"><i></i>失败</span></div><div class="row"><span class="tg ne">账单</span><span class="tg ne">退款</span><span class="tg ne">发票</span><span class="tg ne" title="加急、VIP">+2</span></div><div class="row"><button type="button" class="ib bell" aria-label="通知，3 条未读"><svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11V7a4 4 0 0 1 8 0v4l1.5 1.5h-11zM6.5 14a1.5 1.5 0 0 0 3 0"/></svg><span class="bd" aria-hidden="true">3</span></button><button type="button" class="ib" aria-label="私信，有新内容"><svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3.5" width="12" height="9" rx="1.5"/><path d="M2.5 4.5L8 9l5.5-4.5"/></svg><span class="dt"></span></button><button type="button" class="btn txt add">模拟新消息</button></div></div></div>

<script type="module">
export default function demo(root) {
  const bell = root.querySelector('.bell'), bd = root.querySelector('.bd'); let n = 3;
  const draw = () => { bd.hidden = !n; bd.textContent = n > 99 ? '99+' : n; bell.setAttribute('aria-label', n ? `通知，${n} 条未读` : '通知'); };
  bell.addEventListener('click', () => { n = 0; draw(); });
  root.querySelector('.add').addEventListener('click', () => { n += 37; draw(); });
  root.querySelector('.dt').parentElement.addEventListener('click', (e) => { e.currentTarget.querySelector('.dt').hidden = true; e.currentTarget.setAttribute('aria-label', '私信'); });
}
</script>
