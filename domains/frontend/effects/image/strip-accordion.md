---
zh: 竖条展开相册
en: Expanding strips
order: 50
---

## 是什么

5–7 张图并排成等宽的窄竖条，默认去色；指针停在哪条、键盘聚焦到哪条，哪条就变宽到约一半并恢复彩色、露出标题，其余条平分剩下的宽度。

## 适合

作品集、目的地、系列产品、栏目入口这类 5–7 个并列主题的首页区块，每条通向一个页面。

## 不适合

超过 7 项（条太窄看不出是什么图）；商品图这类要完整看清的图；只有 2–3 项时用普通卡片。要把一张图拆开看用「切成条带的照片」。

## 注意

这里过渡的是 flex-grow（宽度），只在 5–7 个元素上做，开销可以接受；标题在条展开过半后才出现，窄条里不放会折行的文字。

## 要点

- 等宽竖条默认 grayscale(1) 并压暗约 15%；当前条 flex-grow 设为“条数 − 1”，正好占一半宽，400ms 缓出，颜色同时恢复
- 标题和一句说明延迟约 150ms 淡入，收起的条只露出编号；离开整组后保留最后展开的那条，始终有一张看得清
- 每条是链接，链接上写替代文字（主题名 + 一句说明）；Tab 聚焦即展开，回车进入
- 触屏没有悬停：第一次点展开，展开状态下再点才进入
- 收起的条不窄于 32px：容器宽小于 2 × (条数 − 1) × 32px 时改成上下排列的横条，按高度展开
- 减少动态效果时直接切换宽度和颜色

## 提示词

把{作品或栏目入口}做成「竖条展开相册」：{条数，5–7} 张图并排成等宽竖条，默认 grayscale(1) 并压暗 15%；指针停留或键盘聚焦的那条 flex-grow 变为“条数 − 1”（正好占一半宽），400ms 缓出过渡，同时恢复彩色，{标题和一句说明}延迟 150ms 淡入，收起的条只显示编号；离开整组后保留最后展开的那条；每条是链接，链接上写主题名和说明作为替代文字，Tab 聚焦即展开、回车进入；触屏第一次点展开、再点进入；容器宽小于 2 × (条数 − 1) × 32px 时改成上下排列的横条，按高度展开；减少动态效果时直接切换。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<link rel="stylesheet" href="../../_shared/app-card-photos.css">
<style>
.row{display:flex;gap:4px;height:100%;padding:10px}
.sp{position:relative;flex:1 1 0;min-width:0;min-height:0;border-radius:10px;overflow:hidden;color:#fff;text-decoration:none;filter:grayscale(1) brightness(.85);transition:flex-grow .4s cubic-bezier(.2,.8,.2,1),filter .4s}
.sp::after{content:"";position:absolute;inset:40% 0 0;background:linear-gradient(transparent,rgba(12,14,20,.62))}
.sp.on{flex-grow:4;filter:none}
.no{position:absolute;left:50%;top:8px;z-index:1;transform:translateX(-50%);font-size:11px;font-weight:600;text-shadow:0 1px 2px rgba(0,0,0,.5)}
.on .no{left:10px;transform:none}
.cap{position:absolute;left:10px;right:10px;bottom:10px;z-index:1;display:grid;visibility:hidden;opacity:0;white-space:nowrap;transition:opacity .2s,visibility 0s .2s}
.on .cap{visibility:visible;opacity:1;transition:opacity .25s .15s,visibility 0s}
.cap b{font-size:14px}
.cap small{font-size:11px;opacity:.85}
@container (min-height:260px){.row{gap:6px;padding:14px}
.cap b{font-size:17px}
.cap small{font-size:12px}
}
/* 收起的条窄于 32px 时改成上下排列（5 条：容器宽 < 256px） */
@container (max-width:256px){.row{flex-direction:column}
}
</style>

<div class="st"><div class="row" role="list"></div><p class="sr" role="status"></p></div>

<script type="module">
const ITEMS = [['海岸线', '18 张 · 清晨'], ['山间小站', '12 张 · 雨后'], ['旧城巷口', '24 张 · 黄昏'], ['麦田边', '9 张 · 正午'], ['夜航', '15 张 · 深夜']];
export default function demo(root) {
  const row = root.querySelector('.row'), msg = root.querySelector('[role=status]');
  ITEMS.forEach(([t, d], i) => {
    const a = document.createElement('a');
    a.className = `sp ph${i + 1}`; a.href = '#'; a.setAttribute('role', 'listitem'); a.setAttribute('aria-label', `${t}，${d}`);
    a.innerHTML = `<span class="no" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><span class="cap" aria-hidden="true"><b>${t}</b><small>${d}</small></span>`;
    row.append(a);
  });
  const strips = [...row.children];
  const set = (a) => strips.forEach((s) => s.classList.toggle('on', s === a));
  let type = 'mouse';
  row.addEventListener('pointerdown', (e) => { type = e.pointerType; });
  row.addEventListener('keydown', () => { type = 'key'; });
  row.addEventListener('pointerover', (e) => { const a = e.target.closest('.sp'); if (a && e.pointerType === 'mouse') set(a); });
  row.addEventListener('focusin', (e) => set(e.target.closest('.sp')));
  row.addEventListener('click', (e) => {
    const a = e.target.closest('.sp'); if (!a) return;
    e.preventDefault(); // 示例里不跳转
    if (type === 'touch' && !a.classList.contains('on')) { set(a); return; } // 触屏：第一次点只展开
    set(a); msg.textContent = `进入「${a.querySelector('b').textContent}」`;
  });
  set(strips[0]);
  setTimeout(() => root.host.isConnected && set(strips[2]), 500);
}
</script>
