---
zh: 流光边框按钮
en: Animated gradient border
order: 30
---

## 是什么

按钮的边框上有一道彩色光带沿着边缘缓慢绕圈流动。

## 适合

AI 功能入口、“用 AI 生成”这类需要被注意到的单个按钮。

## 注意

用 @property 动画角度或旋转伪元素；属于“装饰特效”，不要多用。

## 要点

- 光带跟状态走更有意义：平时静止，点击后绕一圈停下，加载中一直绕，完成后停住，流动本身就是反馈。
- 可选背后柔光：按钮或 AI 模块背后放一层同色锥形渐变，模糊 24–40px、不透明度 0.25–0.4，和光带同步转，用来标出 AI 功能区。

## 提示词

给{AI 功能入口按钮}加「流光边框」：边框 1.5px，上面一段品牌色到亮色的锥形渐变沿边缘绕圈流动，一圈 3–4 秒；按钮内部保持实色；{会触发等待的按钮}改为跟状态走：平时静止，点击后绕一圈停下，加载中持续绕，完成停住；可选在背后加一层模糊 32px、不透明度 0.3 的同色柔光；全页只用这一处；减少动态效果时改为静态渐变边框。

## 示例

<style>
@property --a{syntax:"<angle>";initial-value:0deg;inherits:false}
.zone{height:100%;display:grid;place-items:center;background:#f7f5f2}
.btn{--a:0deg;font:600 15px system-ui;color:#fff;border:1.5px solid transparent;border-radius:999px;padding:11px 24px;background:linear-gradient(#18181b,#18181b) padding-box,conic-gradient(from var(--a),#6366f1,#22d3ee,#f472b6,#6366f1) border-box;animation:spin 3.5s linear infinite;cursor:pointer}
@keyframes spin{to{--a:360deg}
}
@media (prefers-reduced-motion:reduce){.btn{animation:none}
}
</style>

<div class="zone"><button class="btn">✦ 用 AI 生成</button></div>
