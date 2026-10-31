---
zh: 打字机文字
en: Typewriter text
order: 10
---

## 是什么

文字一个字一个字地打出来，末尾有闪烁的光标，打完一句删掉再打下一句。

## 适合

首屏副标题里轮换展示多个用途（“用 AI 帮你写 / 做 / 画”）。

## 注意

主标题（LCP）不要用；给变化的词设 aria-hidden，另放一份完整文案给读屏。

## 提示词

把{副标题里的关键词}做成「打字机文字」：在 {词1}、{词2}、{词3} 之间轮换，每个字 80ms 打出，停留 1.5 秒后逐字删除，末尾有闪烁的竖线光标；整句的宽度预留好，不让后面的内容跳动；读屏只读完整句子；减少动态效果时直接显示第一个词。

## 示例

<style>
p{height:100%;margin:0;display:grid;place-items:center;font:600 22px system-ui;color:#18181b;background:#faf9f7}
.t{color:#e4572e;border-right:2px solid currentColor;padding-right:2px;animation:caret 1s steps(1) infinite}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
@keyframes caret{50%{border-color:transparent}
}
</style>

<p>用 AI 帮你<span class="t" aria-hidden="true"></span><span class="sr">用 AI 帮你写、做、画</span></p>

<script type="module">
export default function demo(root) {
  const t = root.querySelector('.t'), words = ['写文章', '做网站', '画插画']; if (matchMedia('(prefers-reduced-motion: reduce)').matches) { t.textContent = words[0]; return; }
  let wi = 0, ci = 0, del = false; const tick = () => { const w = words[wi]; ci += del ? -1 : 1; t.textContent = w.slice(0, ci); let d = del ? 40 : 90; if (!del && ci === w.length) { del = true; d = 1500; } else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; d = 300; } if (t.isConnected) setTimeout(tick, d); }; tick();
}
</script>
