---
zh: 骨架屏
en: Skeleton
aka: 骨架落位 加载占位 骨架屏扫光 shimmer
order: 20
---

## 是什么

内容到来之前，先用灰色块画出头像、标题、文字行的位置，形状和真实内容一致。

## 适合

首次打开的列表、卡片、详情页等布局已知的内容区。

## 不适合

刷新已有数据时保留旧内容加区域提示；300ms 内能完成的请求不显示；布局未知的内容用转圈。

## 要点

- 用组件库的骨架屏：Element Plus el-skeleton（loading、animated、rows、count，template 插槽配 el-skeleton-item variant="text" / "image" / "circle"）、Naive UI n-skeleton（text、repeat、height、width、circle，animated 默认开）、Ant Design Vue a-skeleton（loading、active、avatar、title、paragraph 的 rows）
- 动画默认是关的：Element Plus 要写 animated，Ant Design Vue 要写 active，AI 常漏；扫光还是呼吸由组件决定，不自己写 keyframes
- 形状和真实内容一致：有头像就开 avatar / circle，有图就放 image 变体，文字行数按真实行数定 rows，加载完成不跳动；列表只画 3 至 5 条（count / repeat）
- 骨架和内容互斥：Element Plus、Ant Design Vue 用 loading 切换，真实内容放默认插槽；Naive UI 用 v-if 二选一；骨架屏和转圈不叠加
- 300ms 内返回的不显示：Element Plus 用 throttle（如 { leading: 300 }），其他两家自己延迟再把 loading 置 true
- 表格保留真实表头和列宽，行里放骨架或直接用表格自带的 loading；刷新已有数据时保留旧内容，用「加载指示」的区域刷新，不再回到骨架

## 提示词

{列表 / 卡片 / 详情}首次加载时用骨架屏：用项目组件库自带的骨架屏（Element Plus el-skeleton :loading animated :rows :count，template 插槽配 el-skeleton-item；Naive UI n-skeleton text :repeat 加 circle / height / width 拼形状；Ant Design Vue a-skeleton :loading active :avatar :title :paragraph="{ rows: N }"），不手写。动画一定要开（animated / active）；形状和真实内容一致：头像、标题、文字行数、图片区都按真实布局预留，列表画 {3} 条；加载完成直接替换且不跳动；300ms 内完成的请求不显示（Element Plus 用 throttle，其他两家自己延迟）；刷新已有数据时不用骨架，保留旧内容；表格保留真实表头和列宽；骨架和转圈不叠加。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.s{padding:12px}
.box{width:100%;max-width:440px;padding:6px 14px 8px;background:#fff;border:1px solid #e3e6eb;border-radius:10px}
.hd{display:flex;align-items:center;justify-content:space-between;height:32px}
.it{display:flex;align-items:center;gap:10px;height:38px}
.av{width:30px;height:30px;flex:none;border-radius:50%;background:#edf1ff;color:#3b5bdb;display:grid;place-items:center;font-size:12px;font-weight:600}
.tx{flex:1;min-width:0;display:grid;gap:4px;font-size:12px;line-height:1.3}
.tx b{font-size:13px}
.tx span{color:#5b616e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sk{display:block;background:linear-gradient(90deg,#eceef2 30%,#f7f8fa 50%,#eceef2 70%) 0 0/300% 100%;animation:sh 1.4s linear infinite}
.l1,.l2{height:10px;border-radius:5px}
.l1{width:30%}
.l2{width:72%}
@keyframes sh{from{background-position:100% 0}
to{background-position:0 0}
}
@media (prefers-reduced-motion:reduce){.sk{animation:none}
}
</style>

<div class="s"><div class="box"><div class="hd"><b>消息</b><button class="b t sm again">模拟加载完成</button></div><div class="list" aria-busy="true" aria-label="消息列表"></div></div></div>

<script type="module">
export default function demo(root) {
  const D = [['林', '林知', '合同已签署，请查收附件。'], ['王', '王敏', '评审改到周五下午三点。'], ['周', '周一鸣', '新版本已发布到测试环境。']];
  const list = root.querySelector('.list'); let t;
  const sk = '<div class="it"><i class="sk av"></i><div class="tx"><i class="sk l1"></i><i class="sk l2"></i></div></div>'.repeat(3);
  const real = D.map((d) => `<div class="it"><span class="av">${d[0]}</span><div class="tx"><b>${d[1]}</b><span>${d[2]}</span></div></div>`).join('');
  const btn = root.querySelector('.again');
  const done = () => { list.innerHTML = real; list.setAttribute('aria-busy', 'false'); btn.textContent = '重新加载'; };
  // 默认停在加载中，方便看骨架；点按钮切到内容，再点重新走一遍加载
  btn.addEventListener('click', () => { clearTimeout(t); if (list.getAttribute('aria-busy') === 'true') return done(); list.setAttribute('aria-busy', 'true'); list.innerHTML = sk; btn.textContent = '模拟加载完成'; t = setTimeout(done, 1800); });
  list.innerHTML = sk;
}
</script>
