---
zh: 新拟态（软浮雕）
en: Neumorphism
order: 30
tab: 基础
---

## 是什么

元素与背景同色，靠一亮一暗两道阴影浮起或凹下，像软塑料压出来的。

## 适合

智能家居控制、播放器、计算器这类控件少的小界面，或作为局部装饰。

## 不适合

不适合表单多、信息密的页面；不要只靠阴影区分状态，对比太弱会让人看不出哪里能点。

## 要点

- 配色：背景与元素同色（如 #e7ebf1），亮阴影 #ffffff，暗阴影比底色深约 15%（#c3cad6）
- 凸起：-6px -6px 12px 亮 + 6px 6px 12px 暗；按下：同参数改为 inset
- 状态必须有阴影以外的提示：选中项用强调色文字或图标；可点控件区分不足时补 1px ≥ 3:1 的边界
- 文字用深灰 #3c4657（对底 ≥ 7:1），不用浅灰
- 圆角 16–24px 或正圆；浮雕只用在控件上，正文区保持平面
- 光源统一在左上；暗色版要重新调阴影，不能直接反相
- 动效：按下时阴影由外切到内 120–160ms，减少动态效果时直接切换

## 提示词

把{产品}的{控制面板}做成新拟态风：背景和控件同为 {底色}，凸起用左上白色 + 右下深 15% 的双阴影（偏移 6px、模糊 12px），按下改为 inset，光源统一左上；选中和开启状态用 {品牌色} 文字或图标标出，不只靠阴影；文字深灰、对比度 ≥ 7:1；圆角 20px 或正圆；只用于控件，正文区保持平面；窄屏控件改两列；按下过渡 140ms，减少动态效果时直接切换；焦点环清晰可见。

## 示例

<style>
  :host {
    container-type: size;
  }
  .s {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(24px, 8cqw, 56px);
    padding: 16px;
    background: #e7ebf1;
    color: #3c4657;
    font:
      12px/1.2 system-ui,
      "PingFang SC",
      sans-serif;
  }
  .dial {
    width: min(140px, 64cqh);
    aspect-ratio: 1;
    display: grid;
    place-items: center;
    border-radius: 50%;
    box-shadow:
      -8px -8px 16px #fff,
      8px 8px 16px #c3cad6;
  }
  .in {
    width: 72%;
    aspect-ratio: 1;
    display: grid;
    place-content: center;
    gap: 4px;
    text-align: center;
    border-radius: 50%;
    box-shadow:
      inset -5px -5px 10px #fff,
      inset 5px 5px 10px #c3cad6;
  }
  .in b {
    font-size: clamp(22px, 14cqh, 38px);
    font-weight: 600;
    color: #1f2a3c;
  }
  .ctl {
    display: grid;
    gap: 12px;
  }
  button {
    width: 88px;
    height: 36px;
    border: 0;
    border-radius: 18px;
    background: #e7ebf1;
    color: #3c4657;
    font: inherit;
    cursor: pointer;
    box-shadow:
      -4px -4px 8px #fff,
      4px 4px 8px #c3cad6;
    transition: box-shadow 0.14s cubic-bezier(0.2, 0, 0, 1);
  }
  button[aria-pressed="true"] {
    color: #2f49b0;
    font-weight: 600;
    box-shadow:
      inset -3px -3px 6px #fff,
      inset 3px 3px 6px #c3cad6;
  }
  button:focus-visible {
    outline: 2px solid #3b5bdb;
    outline-offset: 3px;
  }
  @media (prefers-reduced-motion: reduce) {
    button {
      transition: none;
    }
  }
</style>

<div class="s">
  <div class="dial">
    <div class="in"><b>22°</b><small>客厅 · 制冷</small></div>
  </div>
  <div class="ctl">
    <button type="button" aria-pressed="true">制冷</button
    ><button type="button" aria-pressed="false">送风</button
    ><button type="button" aria-pressed="false">睡眠</button>
  </div>
</div>

<script type="module">
  export default function demo(root) {
    const bs = root.querySelectorAll("button");
    bs.forEach(
      (b) =>
        (b.onclick = () =>
          bs.forEach((x) => x.setAttribute("aria-pressed", String(x === b)))),
    );
  }
</script>
