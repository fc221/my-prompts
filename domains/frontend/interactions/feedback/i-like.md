---
zh: 点赞收藏反馈
en: Like & save feedback
order: 10
---

## 是什么

点一下心形，图标立刻变实心并轻轻弹一下，数字加一；请求失败时自动恢复并告诉用户。

## 适合

内容流、评论、商品收藏、文档“有帮助”这类高频、可撤回的小操作。

## 注意

连续快速点击只以最后的状态为准，不要发一串请求；数字用等宽字体，变化时不挤动旁边的元素。

## 要点

- 点击后立刻切换图标和数字（乐观更新），同时发请求；失败时恢复原状，并用一句话说明。
- 图标切换时做 200–300ms 的缩放弹一下（1 → 1.25 → 1），只动 transform；减少动态效果时只换图标。
- 按钮用 aria-pressed 表示状态，名称写清对象（“点赞，当前 128”）；数字变化不需要读屏逐次播报。
- 快速连点时合并请求，只提交最后的状态。
- 数字超过 1 万显示“1.2 万”，悬停或长按显示精确值。

## 提示词

给{内容卡片}的点赞和收藏按钮加「即时反馈」：点击立刻切换实心图标和数字（乐观更新）并发请求，失败时恢复原状并提示“点赞失败，已恢复”；切换时图标 1 → 1.25 → 1 弹一下（250ms，只动 transform），减少动态效果时只换图标；按钮用 aria-pressed；快速连点只提交最后状态；数字等宽、超过 1 万显示“1.2 万”。

## 示例

<link rel="stylesheet" href="../../_shared/interactions-base.css">
<style>
.st{padding:16px 18px}
.box{max-width:440px;margin:0 auto;display:grid;gap:10px}
.post{display:grid;gap:6px;padding:14px 16px;border:1px solid #e3e6eb;border-radius:12px;background:#fff}
.post p{margin:0;color:#5b616e}
.acts{display:flex;gap:8px;margin-top:4px}
.act{display:inline-flex;align-items:center;gap:6px;height:32px;padding:0 12px;border:1px solid #e3e6eb;border-radius:999px;background:#fff;color:#5b616e}
.act .ic{display:inline-block;font-size:16px;line-height:1}
.act .n{font-variant-numeric:tabular-nums;min-width:3ch;text-align:left}
.like[aria-pressed=true]{color:#e11d48;border-color:#fecdd3;background:#fff1f2}
.save[aria-pressed=true]{color:#d97706;border-color:#fde68a;background:#fffbeb}
.pop{animation:pp .25s cubic-bezier(.34,1.56,.64,1)}
@keyframes pp{50%{transform:scale(1.25)}
}
.msg{margin:0;min-height:20px;color:#b42318;font-size:12px}
</style>

<div class="st"><div class="box"><article class="post"><b>十月经营复盘：复购率提升到 42%</b><p>小程序订单首次超过门店，退款率下降 0.4 个百分点……</p><div class="acts"><button type="button" class="act like" aria-pressed="false" data-n="128"><span class="ic">♡</span><span class="n">128</span><span class="sr">点赞</span></button><button type="button" class="act save" aria-pressed="false" data-n="36"><span class="ic">☆</span><span class="n">36</span><span class="sr">收藏</span></button></div></article><label class="sw"><input type="checkbox" class="fail"><i></i>模拟请求失败</label><p class="msg" role="status"></p></div></div>

<script type="module">
export default function demo(root) {
  const fail = root.querySelector('.fail'), msg = root.querySelector('.msg'), still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.querySelectorAll('.act').forEach((b) => { const like = b.classList.contains('like'), ic = b.querySelector('.ic'), n = b.querySelector('.n'); let server = false, timer;
    const paint = (on) => { const base = +b.dataset.n; b.setAttribute('aria-pressed', String(on)); ic.textContent = like ? (on ? '♥' : '♡') : (on ? '★' : '☆'); n.textContent = base + (on ? 1 : 0); if (!still) { ic.classList.remove('pop'); void ic.offsetWidth; ic.classList.add('pop'); } };
    b.addEventListener('click', () => { const on = b.getAttribute('aria-pressed') !== 'true'; paint(on); msg.textContent = ''; clearTimeout(timer); timer = setTimeout(() => { if (fail.checked) { paint(server); msg.textContent = (like ? '点赞' : '收藏') + '失败，已恢复'; } else server = on; }, 500); }); });
}
</script>
