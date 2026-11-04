---
zh: 焦点样式
en: Focus ring
order: 20
---

## 是什么

键盘聚焦时显示 2px 实线焦点环、外偏移 2px，和悬停、选中样式明显不同。

## 适合

所有可交互元素：按钮、链接、输入框、卡片、菜单项、自定义控件。

## 不适合

不要 outline: none 却不给替代样式；不要只用颜色微变或淡淡的光晕当焦点。

## 要点

- 用 :focus-visible 显示焦点：鼠标点击不出现，键盘 Tab 时出现
- 焦点环 2px 实线 focus-ring 色、outline-offset 2px；画在元素内侧时用 3px
- 焦点环对相邻背景 ≥ 3:1；彩色或深色底上改用白色或 focus-ring-on-accent
- 输入框聚焦：边框换成焦点色，再加 1px 同色内环和 3px 浅色光晕（光晕只作装饰），不改变边框宽度
- 焦点环立即出现，不做动画；不被吸顶栏、Toast 遮挡（锚点加 scroll-margin-top）
- 关闭弹窗、删除元素后焦点回到触发点或相邻元素，不落回 body
- 强制颜色模式下用 outline 而不是 box-shadow，保证焦点仍可见

## 提示词

为{项目}统一焦点样式：所有可交互元素用 :focus-visible 显示 2px 实线焦点环（{焦点色}，对相邻背景 ≥ 3:1）、outline-offset 2px；输入框聚焦时边框变为焦点色，加 1px 同色内环和 3px 浅色光晕；深色或品牌色块上的元素用白色焦点环；焦点环不做动画、不被吸顶栏遮挡；删除 outline: none 的写法；弹窗关闭后焦点回到触发按钮；Tab 顺序与视觉顺序一致。

## 示例

<style>
.s{height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:16px;padding:16px;background:#f5f6f8;color:#1f2329;font:13px/1.4 system-ui,"PingFang SC",sans-serif}
p{margin:0;font-size:12px;color:#12805c;font-weight:600}
.r{display:flex;align-items:center;gap:20px;flex-wrap:wrap;justify-content:center}
button,input{height:32px;font:inherit;border-radius:6px}
button{padding:0 16px;border:0;background:#3b5bdb;color:#fff;font-weight:600;cursor:pointer}
input{width:110px;padding:0 12px;border:1px solid #868c98;background:#fff;color:#1f2329}
a{color:#2f49b0;text-underline-offset:.2em;border-radius:2px}
.f:not(input),:focus-visible:not(input){outline:2px solid #3b5bdb;outline-offset:2px}
input.f,input:focus-visible{outline:0;border-color:#3b5bdb;box-shadow:inset 0 0 0 1px #3b5bdb,0 0 0 3px #d6deff}
.x:focus-visible{outline:none}
small{font-size:12px;color:#d92d20}
@media (forced-colors:active){input.f,input:focus-visible{outline:2px solid CanvasText}
}
</style>

<div class="s"><p>✓ 三种元素的焦点样式（按 Tab 可实际切换）</p><div class="r"><button type="button" class="f">保存</button><input class="f" value="订单号" aria-label="订单号"><a href="#focus-demo" class="f">查看详情</a></div><div class="r"><button type="button" class="x">保存</button><small>✗ outline: none，键盘用户找不到焦点</small></div></div>

<script type="module">
export default function demo(root) {
  root.querySelector('a').addEventListener('click', (e) => e.preventDefault());
}
</script>
