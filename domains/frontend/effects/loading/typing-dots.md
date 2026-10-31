---
zh: 三点跳动（正在输入）
en: Typing indicator
order: 20
---

## 是什么

三个小圆点依次上下跳动，表示对方正在输入或 AI 正在思考。

## 适合

聊天、AI 对话里等待回复的第一个字。

## 注意

流式内容开始输出后不要再显示三个点。

## 提示词

在{AI 回复气泡的位置}放「三点跳动」：三个 6px 圆点依次上下跳动，周期 1.2 秒、相邻错开 0.15 秒，颜色用次要文字色；第一个字到达后立刻被内容替换；超过 10 秒补一句“仍在生成…”并提供停止；减少动态效果时改为透明度缓慢变化。

## 示例

<style>
.zone{height:100%;display:grid;place-items:center;background:#f7f7f8}
.bubble{display:flex;gap:5px;padding:12px 16px;border-radius:16px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.08)}
i{width:6px;height:6px;border-radius:50%;background:#8a8f98;animation:jp 1.2s ease-in-out infinite}
i:nth-child(2){animation-delay:.15s}
i:nth-child(3){animation-delay:.3s}
@keyframes jp{0%,60%,100%{transform:none;opacity:.5}
30%{transform:translateY(-5px);opacity:1}
}
@media (prefers-reduced-motion:reduce){i{animation-name:fd}
@keyframes fd{50%{opacity:1}
}
}
</style>

<div class="zone"><div class="bubble" role="status" aria-label="正在生成回复"><i></i><i></i><i></i></div></div>
