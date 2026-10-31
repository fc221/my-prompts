---
zh: 文字乱码解码
en: Text scramble
order: 110
---

## 是什么

文字先显示成快速跳动的乱码，再一个字符一个字符地“解码”成正确内容。

## 适合

科技感标题、数据类产品的强调词、悬停时的链接文字。

## 注意

更适合英文和数字；中文乱码观感差，可改用逐字浮现。

## 提示词

让{英文标题或关键词}做「文字乱码解码」效果：先用随机字母和符号快速跳动，然后从左到右逐个字符定格成正确文字，总时长约 900ms；字体用等宽字体防止宽度抖动；读屏只读最终文字；减少动态效果时直接显示。

## 示例

<style>
:host{display:grid;place-items:center;height:100%;background:#0b0b10}
p{font:600 20px ui-monospace,Menlo,monospace;color:#a7f3d0;letter-spacing:.06em;margin:0}
button{font:13px system-ui}
</style>

<p aria-label="EVERY ORDER IN SYNC">EVERY ORDER IN SYNC</p><button type="button" class="ctl">重播</button>

<script type="module">
export default function demo(root) {
  const p = root.querySelector('p'), final = p.getAttribute('aria-label'), chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+<>/'; const run = () => { let f = 0; const total = 36; const id = setInterval(() => { f++; const fixed = Math.floor(final.length * f / total); p.textContent = final.split('').map((ch, i) => (i < fixed || ch === ' ') ? ch : chars[Math.floor(Math.random() * chars.length)]).join(''); if (f >= total) { clearInterval(id); p.textContent = final; } }, 25); };
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) run(); root.querySelector('button').onclick = run;
}
</script>
