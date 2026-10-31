---
zh: 提交按钮变形
en: Submit button morph
order: 40
---

## 是什么

点击提交后，宽按钮收缩成一个转圈的圆，完成时画出一个对勾，再恢复成按钮或进入下一步。

## 适合

提交订单、完成打卡、支付等有分量的提交。

## 注意

普通保存不要用；只有动画没有文字结果不算完成。

## 要点

- 默认：收成圆转圈，成功画对勾，再恢复成按钮或进入下一步。
- 结果条变体：收成圆后圆环转 1–2 圈（拿得到进度时按进度画满），再向两侧撑开成比原按钮宽的结果条，条里写清结果（如“已提交，单号 2481”）；结果条的宽度事先在布局里留好，撑开时不推挤周围元素。
- 失败：结果条换危险色，写原因并带“重试”，点重试回到转圈；默认版本失败时恢复原文案并显示原因。
- 圆环和对勾用 SVG 描边画出；结果文字用 role="status" 播报。
- 时间较长、能拿到真实进度时改用「进度按钮」。

## 提示词

把{提交按钮}做成「提交按钮变形」：点击后同一个按钮的宽度收缩成圆形并显示转圈，成功时用 SVG 描边画出对勾（300ms），约 1 秒后恢复或进入下一步；失败时恢复原文案并显示原因；按钮所在位置预留原宽度，不推挤布局；提交中防重复点击。需要把结果留在原处时改用结果条变体：收成圆后圆环转 1–2 圈，再向两侧撑开成事先留好宽度的结果条，写出结果（如“已提交，单号 {单号}”），失败时结果条用危险色、写原因并带“重试”；结果用 role="status" 播报。

## 示例

<style>
.zone{height:100%;display:grid;place-items:center;background:#f4f5f7}
.btn{position:relative;width:180px;height:44px;border:0;border-radius:999px;background:#18181b;color:#fff;font:600 15px system-ui;cursor:pointer;transition:width .3s cubic-bezier(.2,.9,.22,1)}
.btn.busy,.btn.done{width:44px}
.btn.busy .t,.btn.done .t{opacity:0}
.btn.busy::after{content:"";position:absolute;inset:12px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:sp .8s linear infinite}
svg{position:absolute;inset:10px;fill:none;stroke:#fff;stroke-width:2.5;stroke-dasharray:24;stroke-dashoffset:24;transition:stroke-dashoffset .3s}
.btn.done{background:#17864a}
.btn.done svg{stroke-dashoffset:0}
@keyframes sp{to{transform:rotate(360deg)}
}
</style>

<div class="zone"><button class="btn"><span class="t">提交订单</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></button></div>

<script type="module">
export default function demo(root) {
  const b = root.querySelector('.btn'); b.onclick = () => { if (b.classList.contains('busy')) return; b.classList.add('busy'); setTimeout(() => { b.classList.replace('busy', 'done'); setTimeout(() => b.classList.remove('done'), 1400); }, 1200); };
}
</script>
