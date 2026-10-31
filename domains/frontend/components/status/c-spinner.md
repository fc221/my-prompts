---
zh: 加载指示
en: Spinner / Loading
order: 10
---

## 是什么

一个转动的小圆环，表示正在处理；常放在按钮里、卡片角上或列表底部。

## 适合

按钮内的提交与保存、卡片和小面板的短时刷新、列表底部的“加载更多”。

## 不适合

首次加载整页内容用骨架屏；能算出进度的用进度条；不要用一个大转圈挡住整页。

## 要点

- 尺寸 16 / 20 / 24 / 32px，与所在文字或容器匹配；颜色用次要文字色或强调色，实心按钮里用按钮文字色
- 请求超过 200–300ms 才出现，一旦出现至少保持约 400ms，避免一闪而过
- 按钮加载：转圈放在文字前，文案改“保存中…”，按钮宽度不变，aria-disabled 防重复点击；完成后恢复并给出结果
- 区域刷新保留旧内容：内容半透明，区域右上角放 16px 转圈，区域设 aria-busy="true"
- 列表底部 20px 转圈配“正在加载…”；到底显示“没有更多了”；失败显示“加载失败，重试”
- 同一区域同一时间只放一个加载指示；减少动态效果时转圈放慢但不停（停住像卡死）

## 提示词

在{提交按钮 / 卡片刷新 / 列表加载更多}用「加载指示」：按钮内放 16px 转圈，文案改“{动作}中…”，宽度不变，aria-disabled 防重复，完成后恢复并给结果；区域刷新保留旧内容，内容半透明并在右上角放 16px 转圈，区域 aria-busy="true"；列表底部 20px 转圈配“正在加载…”，到底显示“没有更多了”，失败显示“加载失败，重试”；请求超过 300ms 才显示、至少保持 400ms；减少动态效果时转圈放慢但不停止。

## 示例

<link rel="stylesheet" href="../../_shared/components-overlay.css">
<style>
.row{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:16px}
.card{width:180px;padding:10px 12px 12px 14px;background:#fff;border:1px solid #e3e6eb;border-radius:10px;display:grid}
.hd{display:flex;align-items:center;gap:4px}
.hd .muted{flex:1}
.spin.sm{width:14px;height:14px;color:#5b616e}
.num{font-size:24px;font-variant-numeric:tabular-nums;transition:opacity .16s}
.card[aria-busy="true"] .num{opacity:.45}
.col{display:grid;gap:14px;justify-items:center}
.save{min-width:104px}
.save[aria-disabled]{opacity:1;cursor:progress}
@container (max-width:340px){.row{gap:12px}
.card{width:144px}
}
.more{display:flex;align-items:center;gap:8px;font-size:12px;color:#5b616e}
</style>

<div class="s"><div class="row"><div class="card" aria-busy="false"><div class="hd"><span class="muted">今日访问</span><span class="spin sm" hidden></span><button class="b t sm rf">刷新</button></div><b class="num">12,480</b><span class="muted">较昨日 +6.2%</span></div><div class="col"><button class="b p save"><span class="spin" hidden></span><span class="lb">保存</span></button><p class="more"><span class="spin"></span>正在加载…</p></div></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const save = root.querySelector('.save'), lb = save.querySelector('.lb'), sp = save.querySelector('.spin'), card = root.querySelector('.card'), num = card.querySelector('.num'), cs = card.querySelector('.spin'), sr = root.querySelector('.sr');
  save.addEventListener('click', () => {
    if (save.getAttribute('aria-disabled')) return;
    save.setAttribute('aria-disabled', 'true'); sp.hidden = false; lb.textContent = '保存中…';
    setTimeout(() => { sp.hidden = true; lb.textContent = '已保存 ✓'; sr.textContent = '已保存'; setTimeout(() => { lb.textContent = '保存'; save.removeAttribute('aria-disabled'); }, 1500); }, 1600);
  });
  root.querySelector('.rf').addEventListener('click', () => {
    if (card.getAttribute('aria-busy') === 'true') return;
    card.setAttribute('aria-busy', 'true'); cs.hidden = false;
    setTimeout(() => { num.textContent = (12000 + Math.round(Math.random() * 900)).toLocaleString('en-US'); card.setAttribute('aria-busy', 'false'); cs.hidden = true; sr.textContent = '数据已刷新'; }, 1200);
  });
}
</script>
