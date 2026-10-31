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

- 放在页面标题上方，12–14px 次要文字，分隔符用“/”或“›”，两侧留 6–8px，分隔符对读屏隐藏
- 末项是当前页：主文字色、不可点击，加 aria-current="page"
- 超过 4 层时把中间层折叠成“…”，点开后展开
- 可选：每层旁边有一个小箭头，点开列出同级页面，选中后跳过去，后面的层级随之替换
- 用 nav aria-label="面包屑" 包一个有序列表
- 窄屏只保留上一层，显示为“‹ 上一层名称”

## 提示词

给{三层以上的页面}加「面包屑」：放在页面标题上方，13px 次要文字，分隔符“/”两侧 8px 且对读屏隐藏；前面每层可点击返回，末项是当前页、主文字色、不可点并加 aria-current="page"；超过 4 层时把中间层折叠成“…”，点开后展开；每层旁的小箭头点开列出同级页面，选中后跳转并替换后面的层级；用 nav aria-label="面包屑" 包一个有序列表；一级页面不显示；窄于 640px 时只显示“‹ 上一层名称”。

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
