---
zh: 黑白极简
en: Monochrome minimal
order: 10
---

## 是什么

黑白灰加大留白，超大标题配一张高质量产品图，几乎没有装饰。

## 适合

奢侈品、设计工作室、作品集、高端单品发布。

## 不适合

内容多、操作复杂的后台不适合；不要靠极浅灰字和极细字重装“高级”。

## 要点

- 配色：墨黑 #18181b、白和 2–3 级灰，强调色最多一个，只用在一两处
- 字体：标题 600–700、48–96px、字距 -0.02em；正文 16–18px / 行高 1.7；字号对比拉大，层级少
- 圆角：统一 0 或统一一个大圆角，二选一全站一致
- 阴影：几乎不用，层次靠留白和 1px 细线
- 版式：留白占一半以上，每屏只讲一件事；左对齐或严格居中二选一
- 配图：大幅高质量产品图或作品，统一色调和裁切比例，不用插画和图标堆砌
- 动效：慢而少，淡入 400–600ms，不做弹跳和视差
- 次要文字对白底仍 ≥ 4.5:1，不用 #999 这类浅灰
- 深色变体：近黑 #111113 底、白字，整页只放一块饱和亮色（如明橙 #ff6a1a）作为产品的底座或背板，这块颜色就是唯一的强调色；按钮和文字仍是黑白

## 提示词

把{产品}的{页面}做成黑白极简风：墨黑 #18181b、白和 2–3 级灰，{品牌色}只出现在一两处；标题 clamp(40px, 6vw, 88px) / 700、字距 -0.02em，正文 17px / 1.7；统一 0 圆角、无阴影，靠留白和 1px 细线分隔，每屏只讲一件事；配大幅产品图并固定比例；动效只做 500ms 淡入；窄屏标题降到 36px、改单列；需要深色时改成近黑 #111113 底白字，只用一块 {亮色} 色块托住产品图；次要文字对比度 ≥ 4.5:1；减少动态效果时直接显示。

## 示例

<style>
:host{container-type:size}
.s{height:100%;display:flex;flex-direction:column;padding:10px 20px 14px;background:#fff;color:#18181b;font:13px/1.5 system-ui,"PingFang SC",sans-serif}
nav{display:flex;gap:16px;align-items:center;padding-bottom:8px;border-bottom:1px solid #e4e4e7;font-size:12px;color:#52525b}
nav b{margin-right:auto;color:#18181b;letter-spacing:.24em}
.h{flex:1;min-height:0;display:flex;gap:24px;align-items:center;padding-top:12px}
.tx{flex:1.4;min-width:0}
h1{margin:0;font-size:clamp(24px,13cqh,52px);line-height:1.1;font-weight:700;letter-spacing:-.02em}
p{margin:6px 0 10px;color:#52525b;font-size:12px}
a{display:inline-flex;height:32px;align-items:center;padding:0 16px;background:#18181b;color:#fff;font-size:12px}
.im{flex:1;align-self:stretch;max-width:240px;background:linear-gradient(90deg,#c4c4c9,#f4f4f5 45%,#b4b4ba) 50% 16%/11% 22% no-repeat,radial-gradient(ellipse 21% 34% at 47% 56%,#fafafa 0 30%,#a1a1aa 98%,transparent),radial-gradient(ellipse 30% 4% at 50% 90%,rgba(24,24,27,.16) 0 90%,transparent),linear-gradient(#ececed,#dcdcdf)}
</style>

<div class="s"><nav><b>MyPrompts</b><span>系列</span><span>工作室</span><span>联系</span></nav><div class="h"><div class="tx"><h1>少一点，<br>好一点。</h1><p>手工陶器 · 第七系列</p><a>查看系列</a></div><div class="im" role="img" aria-label="陶瓶产品图"></div></div></div>
