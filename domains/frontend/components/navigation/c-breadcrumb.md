---
zh: 面包屑
en: Breadcrumb
order: 40
---

## 是什么

一行“首页 / 客户 / 合同详情”，告诉用户在第几层，前面每层都能点回去。

## 适合

三层及以上的层级页面：详情页、深层设置、文件目录。

## 不适合

一级页面不显示；只有两层时用返回按钮；不是层级关系的流程用步骤条。

## 要点

- 用组件库的面包屑：Element Plus el-breadcrumb（separator、separator-icon）+ el-breadcrumb-item（to）、Naive UI n-breadcrumb（separator）+ n-breadcrumb-item（href、clickable）、Ant Design Vue a-breadcrumb（separator、routes、itemRender）+ a-breadcrumb-item（href、overlay）
- 层级从路由生成（matched 里每层的 meta.title），不在每个页面手写一份；详情页的末项换成对象名“林知科技”，不写“详情”
- 放在页面标题上方，13px 次要文字色；分隔符全站只用一种，用组件默认的“/”就不用改
- 末项是当前页：不给 to / href（Naive UI 再关掉 clickable），组件就按不可点的当前项渲染，用主文字色
- 超过 4 层时把中间层收成一项“…”，点开后展开；三家都没有自动折叠，这一项自己处理
- 要在同级页面间切换时，层级旁加下拉：Ant Design Vue 用 a-breadcrumb-item 的 overlay，Element Plus、Naive UI 在条目插槽里放下拉菜单
- 一级页面不显示；窄屏只保留上一层，显示为“‹ 上一层名称”

## 提示词

给{三层以上的页面}加「面包屑」：用项目组件库自带的面包屑（Element Plus el-breadcrumb + el-breadcrumb-item to；Naive UI n-breadcrumb + n-breadcrumb-item href；Ant Design Vue a-breadcrumb + a-breadcrumb-item href），不手写。放在页面标题上方，13px 次要文字色；分隔符用组件默认的“/”，全站一致；层级按路由的 matched 和 meta.title 自动生成，详情页末项换成对象名；末项是当前页，不给链接、不可点；超过 4 层时把中间层收成一项“…”，点开展开；需要在同级页面间切换时，层级旁加下拉（Ant Design Vue 用 overlay，Element Plus / Naive UI 在条目里放下拉菜单）；一级页面不显示；窄于 640px 只显示“‹ 上一层名称”。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.pg{width:100%;max-width:520px;background:#fff;border:1px solid #e3e6eb;border-radius:10px;padding:18px 20px}
ol{display:flex;flex-wrap:wrap;align-items:center;list-style:none;padding:0;font-size:13px;color:#5b616e}
li+li::before{content:"/";content:"/" / "";margin:0 8px;color:#9aa0ab}
a{color:#5b616e;text-decoration:none;border-radius:4px}
a:hover{color:#3b5bdb;text-decoration:underline}
[aria-current]{color:#1f2329}
.more button{height:20px;padding:0 6px;border:0;border-radius:4px;background:#f0f2f5;line-height:20px;color:#5b616e}
.more button:hover{background:#e3e6eb}
h4{margin:12px 0 2px;font-size:18px}
</style>

<div class="s"><div class="pg"><nav aria-label="面包屑"><ol><li><a href="#">首页</a></li><li class="more"><button aria-label="展开 2 个隐藏层级">…</button></li><li hidden><a href="#">客户管理</a></li><li hidden><a href="#">华东区</a></li><li><a href="#">林知科技</a></li><li><span aria-current="page">合同详情</span></li></ol></nav><h4>合同详情</h4><p class="muted">合同编号 HT-2026-0412 · 生效中</p></div></div>

<script type="module">
export default function demo(root) {
  root.querySelectorAll('a').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
  const m = root.querySelector('.more');
  m.querySelector('button').addEventListener('click', () => { root.querySelectorAll('li[hidden]').forEach((li) => (li.hidden = false)); const f = m.nextElementSibling.querySelector('a'); m.remove(); f.focus(); });
}
</script>
