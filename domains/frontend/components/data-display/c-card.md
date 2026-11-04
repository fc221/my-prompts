---
zh: 卡片
en: Card
order: 40
---

## 是什么

一个独立对象一张卡：封面、标题、简述和元信息，同一行卡片等高。

## 适合

以图片为主或彼此独立的对象：项目、模板、商品、文章、应用，需要网格浏览的场景。

## 不适合

需要比较属性的数据用表格；纯文字条目用列表；不要把所有内容都做成卡片墙，也不要卡片里再套卡片。

## 要点

- 用组件库的卡片：Element Plus el-card（shadow、header / footer 插槽、body-style）、Naive UI n-card（title、cover / header-extra / footer / action 插槽、hoverable、bordered、size）、Ant Design Vue a-card（cover 插槽、a-card-meta 的 title / description / avatar、actions 插槽、hoverable、bordered、size、loading）；不手写一个 div 加阴影
- 普通卡片用 1px 浅边框或背景差，不加阴影：Element Plus 默认 shadow="always"，要显式改成 never；Naive UI、Ant Design Vue 默认有边框无阴影；可点击卡片才开 hoverable 或 shadow="hover"
- 结构统一：封面（cover 插槽，固定比例 16:9 或 4:3；Element Plus 没有 cover 插槽，图片放默认插槽最上方并用 body-style 清零内边距）→ 标题（16px/600，最多两行）→ 描述（14px 次要色，最多 2–3 行）→ 元信息 / 操作（footer / action / actions 插槽，对齐到底部）
- 内边距 16–24px（小卡片 12px，用 size 档），卡片间距 16px，圆角跟组件主题，不逐张改
- 整卡可点时只放一个主链接（标题），用伪元素扩大点击区；卡内其他按钮层级在它之上，不嵌套交互元素；焦点环完整包住卡片
- 网格用 repeat(auto-fill, minmax(280px, 1fr))，同行等高（卡片 height: 100%），窄屏单列
- 图片加载失败显示占位色块和图标；加载中用与卡片同形的骨架（Ant Design Vue 的 a-card loading；其余用 el-skeleton / n-skeleton 照卡片结构摆）

## 提示词

把{模板市场}做成卡片网格：用项目组件库自带的卡片（Element Plus el-card shadow="never"，封面放默认插槽顶部并用 body-style 清零内边距；Naive UI n-card cover 插槽 + footer 插槽；Ant Design Vue a-card cover 插槽 + a-card-meta + actions 插槽），不手写 div 卡片。网格 repeat(auto-fill, minmax(280px, 1fr))，间距 16px，同行等高；每张卡 1px 浅边框、内边距 16px，封面 16:9，标题 16px/600 最多两行，描述 14px 次要色最多两行，底部元信息（作者、使用次数）对齐到底；整卡可点（标题链接用伪元素覆盖整卡），悬停开 hoverable 或 shadow="hover"，焦点环包住整卡；图片失败显示占位色块；首次加载用同形骨架（a-card loading / el-skeleton / n-skeleton）；窄屏单列。

## 示例

<link rel="stylesheet" href="../../_shared/components-core.css">
<style>
.g{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;width:100%;max-width:660px}
.x3{display:none!important}
@container (min-width:560px){.g{grid-template-columns:repeat(3,minmax(0,1fr))}
.x3{display:flex!important}
}
.cd{position:relative;display:flex;flex-direction:column;background:#fff;border:1px solid #e3e6eb;border-radius:12px;overflow:hidden;transition:box-shadow .16s,border-color .16s}
.cd:hover{border-color:#c9ced6;box-shadow:0 4px 12px rgba(31,35,41,.08)}
.cd:focus-within{outline:2px solid #3b5bdb;outline-offset:2px}
.cv{aspect-ratio:3/1;display:grid;place-items:center}
.bd{flex:1;display:flex;flex-direction:column;gap:2px;padding:10px 12px 12px}
h4{margin:0;font-size:14px;line-height:22px;font-weight:600}
h4 a{color:#1f2329;text-decoration:none}
h4 a::after{content:"";position:absolute;inset:0}
h4 a:focus-visible{outline:none}
p{margin:0;font-size:12px;line-height:20px;color:#5b616e;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
.mt{margin-top:auto;padding-top:4px;font-size:12px;line-height:20px;color:#5b616e;font-variant-numeric:tabular-nums}
@container (min-height:260px){p{-webkit-line-clamp:2}
.cv{aspect-ratio:2/1}
}
@media (prefers-reduced-motion:reduce){.cd{transition:none}
}
</style>

<div class="s"><div class="g"><article class="cd"><div class="cv" style="background:#e4e9ff;color:#3b5bdb"><svg viewBox="0 0 16 16" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="2" width="10" height="12" rx="1.5"/><path d="M5.5 5.5h5M5.5 8h5M5.5 10.5h3"/></svg></div><div class="bd"><h4><a href="#">项目周报模板</a></h4><p>每周进度、风险和下周计划，一页写完</p><span class="mt">使用 1.2 万次</span></div></article><article class="cd"><div class="cv" style="background:#e3f4ec;color:#12805c"><svg viewBox="0 0 16 16" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="6" r="2.5"/><path d="M3.5 13.5a4.5 4.5 0 0 1 9 0"/></svg></div><div class="bd"><h4><a href="#">客户访谈记录</a></h4><p>问题清单、原话摘录和结论</p><span class="mt">使用 8,410 次</span></div></article><article class="cd x3"><div class="cv" style="background:#fdefe3;color:#b54708"><svg viewBox="0 0 16 16" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3 3 7-7"/></svg></div><div class="bd"><h4><a href="#">发布检查清单</a></h4><p>上线前逐项核对，避免漏项</p><span class="mt">使用 5,032 次</span></div></article></div></div>

<script type="module">
export default function demo(root) {
  root.addEventListener('click', (e) => { if (e.target.closest('a')) e.preventDefault(); });
}
</script>
