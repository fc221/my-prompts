---
zh: 链接与文字按钮
en: Link & text button
order: 40
---

## 是什么

无边框的文字型动作：链接负责跳转，文字按钮负责执行。

## 适合

正文里跳到别处用链接；表格行操作、卡片底部“查看详情”、“＋ 添加一项”这类弱操作用文字按钮。

## 不适合

页面主操作不要做成文字按钮；会提交、删除数据的动作不要写成 a 标签；“点击这里”“更多”这类不说明去向的文案换成具体名称。

## 要点

- 用组件库的链接和文字按钮：Element Plus el-link（href、target、type、underline）和 el-button text / link、Naive UI n-button text（跳转时 tag="a" 加 href）、Ant Design Vue a-typography-link（href、target）和 a-button type="link" / type="text"
- 跳转用链接（有 href，可在新标签打开），执行动作用按钮；外观再像也不混用——el-button link 和 a-button type="link" 只是长得像链接，仍是 button，真正跳转用 el-link、router-link 或 a-typography-link
- 正文链接主色 + 下划线（el-link underline="always"）；导航、菜单、表格操作这类一眼可知的位置可去掉下划线，悬停和聚焦时再出现（underline="hover"，Element Plus 的默认值）
- 文字按钮透明底，高度跟随所在行；行内操作用主色文字（type="primary"），工具栏里的中性操作用次要文字色；删除入口用中性色，确认时才用危险色
- 行内最多露出 2 个文字按钮，其余收进「下拉菜单」，每行顺序一致
- 新窗口打开的链接加外链图标和读屏文案“（新窗口打开）”

## 提示词

把{订单表格的行操作和页面说明}里的文字动作分清：用项目组件库自带的链接和文字按钮（Element Plus el-link / el-button text；Naive UI n-button text，跳转时 tag="a" href；Ant Design Vue a-typography-link / a-button type="text"），不手写。跳转用链接（正文里主色带下划线，悬停加深），执行用文字按钮（透明底，悬停浅主色底），不混用；每行最多露出“详情”“发货”两个，其余收进“更多”下拉菜单，各行顺序一致；删除入口用中性色；外链加图标和读屏文案“（新窗口打开）”；文案写具体去向，不写“点击这里”；触屏点击区不小于 44px。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.w{width:100%;max-width:400px;display:flex;flex-direction:column;gap:12px}
.para{margin:0}
a{margin:0 2px;color:#3b5bdb;white-space:nowrap;text-decoration:underline;text-underline-offset:.2em}
a:hover{color:#2a44b0;text-decoration-thickness:2px}
a svg{margin-left:2px;vertical-align:-1px}
.row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 8px 12px 16px;background:#fff;border:1px solid #e3e6eb;border-radius:8px}
.info{display:flex;flex-direction:column;min-width:0}
.info b{font-weight:500}
.info>*{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ops{display:flex;gap:4px;flex:none}
.t{height:28px;padding:0 8px;border:0;border-radius:4px;background:none;color:#3b5bdb;cursor:pointer}
.t:hover{background:#edf1ff}
.n{color:#5b616e}
.n:hover{background:#f5f6f8}
</style>

<div class="s"><div class="w"><p class="para">额度用完后按量计费，规则见<a href="#">计费说明</a>；需要发票请<a href="#" target="_blank">联系财务<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 2.5h4.5V7M13.5 2.5l-6 6M11.5 9.5v3a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3"/></svg><span class="sr">（新窗口打开）</span></a>。</p><div class="row"><div class="info"><b>SO-20931</b><span class="help">¥1,299.00 · 待发货</span></div><div class="ops"><button class="t" type="button">详情</button><button class="t" type="button">发货</button><button class="t n" type="button">更多 ▾</button></div></div><p class="help st" role="status">链接负责跳转，文字按钮负责执行</p></div></div>

<script type="module">
export default function demo(root) {
  const st = root.querySelector('.st');
  root.addEventListener('click', (e) => {
    const a = e.target.closest('a'), b = e.target.closest('.t');
    if (a) { e.preventDefault(); st.textContent = '（示例）将跳转到：' + a.textContent.replace('（新窗口打开）', ''); }
    if (b) st.textContent = '（示例）已执行：' + b.textContent.replace(' ▾', '');
  });
}
</script>
