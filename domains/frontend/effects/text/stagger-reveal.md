---
zh: 标题逐行浮现
en: Staggered text reveal
order: 30
---

## 是什么

标题的每一行（或每个词）从下方轻轻升起、依次出现。

## 适合

官网首屏标题、章节标题的入场——全页只用一处。

## 注意

不要给每个区块都套同样的浮现；按行拆分时用 span 包每行，保持语义不变。

## 提示词

让{首屏标题}「逐行浮现」：每一行从下方 16px 处淡入上移到位，相邻行错开 80ms，总时长不超过 800ms，只播一次；如果标题是首屏最大的元素，不要从完全透明开始（从 0.01 不透明度或只做位移）；减少动态效果时直接显示。

## 示例

<style>
:host{display:block;height:100%;background:#faf9f7}
h3{margin:0;padding:28px;font:700 26px/1.3 system-ui;color:#18181b}
span{display:block;opacity:.01;transform:translateY(16px);animation:up .6s cubic-bezier(.2,0,0,1) forwards}
span:nth-child(2){animation-delay:.08s}
span:nth-child(3){animation-delay:.16s}
@keyframes up{to{opacity:1;transform:none}
}
button{margin-left:28px;font:13px system-ui}
@media (prefers-reduced-motion:reduce){span{animation:none;opacity:1;transform:none}
}
</style>

<h3><span>从下单到对账，</span><span>一个工作台</span><span>全部看清。</span></h3><button type="button" class="ctl">重播</button>

<script type="module">
export default function demo(root) {
  root.querySelector('button').onclick = () => root.querySelectorAll('span').forEach((s) => { s.style.animation = 'none'; s.offsetWidth; s.style.animation = ''; });
}
</script>
