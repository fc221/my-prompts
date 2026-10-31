---
zh: 描述列表
en: Description list
order: 60
---

## 是什么

只读的“标签 + 值”成对排列，宽屏多列、窄屏一列，空值显示“—”。

## 适合

详情页、抽屉里展示一个对象的只读字段：订单信息、用户资料、配置摘要。

## 不适合

需要编辑时切成表单（标签和顺序保持一致）；多条对象对比用表格；只有 2–3 个字段直接写成一句话。

## 要点

- 用组件库的描述列表：Element Plus el-descriptions + el-descriptions-item（column、direction="vertical" 是标签在上、border、size、title / extra，子项 label、span）、Naive UI n-descriptions + n-descriptions-item（column、label-placement="top" / "left"、bordered、size、title，子项 label、span）、Ant Design Vue a-descriptions + a-descriptions-item（column 可按断点写对象、layout="vertical"、bordered、size、title / extra，子项 label、span）；不手写 dl 网格
- 标签在上（多列）或标签在左（单列），全产品二选一；标签次要色 12–14px、值 14px 跟组件默认，不逐个改
- 宽屏 3 列、中屏 2 列、窄屏 1 列：Ant Design Vue 用 column 的响应式对象，Element Plus、Naive UI 按容器宽度切 column 的值
- 空值统一显示“—”，必要时说明含义；0 照常显示；地址、备注这类长文本用 span 占满一行
- 可复制的值（订单号、ID）旁放复制图标按钮并给“已复制”反馈；状态用标签；金额、时间用等宽数字
- 分组时每组一个描述列表，用 title 做 16px/600 的小标题
- 按组编辑时只把这一组切成输入框，其余保持只读，字段顺序不变

## 提示词

把{订单详情抽屉的基本信息}做成描述列表：用项目组件库自带的描述列表（Element Plus el-descriptions direction="vertical" :column + el-descriptions-item label / span；Naive UI n-descriptions label-placement="top" :column + n-descriptions-item label / span；Ant Design Vue a-descriptions layout="vertical" + column 按断点写对象 + a-descriptions-item label / span），不手写 dl。标签在上、值在下，宽屏 3 列、中屏 2 列、窄屏 1 列；订单号旁有复制按钮，复制后显示“已复制”并播报；状态用标签；金额和时间用等宽数字；空值显示“—”，0 照常显示；收货地址和备注用 span 占满一行；每组一个描述列表，title 做分组标题；进入编辑时只把当前组切成表单，字段顺序不变。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.s{background:#fff}
.w{margin:0;width:100%;max-width:600px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px 24px}
.w>div{min-width:0}
.full{grid-column:1/-1}
dt{font-size:12px;line-height:20px;color:#5b616e}
dd{margin:0;line-height:22px;overflow-wrap:anywhere}
.num{font-variant-numeric:tabular-nums}
.cp{display:flex;align-items:center;gap:4px}
.ci{display:grid;place-items:center;width:24px;height:24px;padding:0;border:0;border-radius:4px;background:none;color:#5b616e;cursor:pointer}
.ci:hover{background:#f5f6f8;color:#1f2329}
.ci.ok{color:#12805c}
.tag{display:inline-flex;align-items:center;height:22px;padding:0 8px;border-radius:4px;background:#fdf0e6;color:#b54708;font-size:12px}
@container (max-width:340px){.w{grid-template-columns:repeat(2,minmax(0,1fr))}
.nw{display:none}
}
</style>

<div class="s"><dl class="w"><div><dt>订单号</dt><dd class="cp"><span>SO-20931</span><button type="button" class="ci" aria-label="复制订单号"><svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5"/><path d="M10.5 5.5V4A1.5 1.5 0 0 0 9 2.5H4A1.5 1.5 0 0 0 2.5 4v5A1.5 1.5 0 0 0 4 10.5h1.5"/></svg></button></dd></div><div><dt>状态</dt><dd><span class="tag">待发货</span></dd></div><div><dt>实付金额</dt><dd class="num">¥1,299.00</dd></div><div><dt>下单时间</dt><dd class="num">10-23 14:12</dd></div><div class="nw"><dt>支付方式</dt><dd>微信支付</dd></div><div class="nw"><dt>备注</dt><dd>—</dd></div><div class="full"><dt>收货地址</dt><dd>浙江省杭州市西湖区文三路 90 号 3 幢 501 室</dd></div></dl><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const b = root.querySelector('.ci'), st = root.querySelector('[role=status]'), icon = b.innerHTML;
  b.addEventListener('click', async () => {
    let ok = true; try { await navigator.clipboard.writeText('SO-20931'); } catch { ok = false; getSelection().selectAllChildren(b.previousElementSibling); }
    b.classList.toggle('ok', ok); b.innerHTML = ok ? '✓' : icon; st.textContent = ok ? '已复制订单号' : '已选中订单号，请按 ⌘C 复制';
    setTimeout(() => { b.classList.remove('ok'); b.innerHTML = icon; }, 1800);
  });
}
</script>
