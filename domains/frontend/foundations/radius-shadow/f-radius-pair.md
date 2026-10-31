---
zh: 圆角配对
en: Radius pairing
order: 10
---

## 是什么

控件 6、卡片 12、胶囊 999；嵌套贴边时外圆角 = 内圆角 + 间距。

## 适合

定义圆角令牌；分段控件、输入框内按钮、卡片内贴边图片。

## 不适合

不要每个组件各写一个圆角；不要所有元素都用大圆角配大片阴影。

## 要点

- 控件（按钮、输入框、下拉）在 4 / 6 / 8 中选一档全站统一；容器（卡片、弹窗）在 12 / 16 中选一档
- 风格化页面可以统一定义一对更大的圆角（如 20 / 14、24 / 16），全站只用这一对
- 标签、头像、开关、徽标等胶囊形用 999px
- 同心圆角只用于贴得很近的嵌套：外圆角 = 内圆角 + 两者之间的内边距（分段控件：内 5 + 槽内边距 2 = 外 7）
- 大卡片里的普通按钮照常用控件圆角，不跟着卡片放大
- 卡片内贴边的图片只圆上方两个角，与卡片外圆角一致

## 提示词

为{项目}统一圆角令牌：--radius-control {控件圆角，默认 6px}（按钮、输入框、下拉），--radius-container {容器圆角，默认 12px}（卡片、弹窗、抽屉），--radius-pill 999px（标签、头像、开关）；贴得很近的嵌套用同心圆角：外圆角 = 内圆角 + 内边距，例如分段控件外 7、内 5、槽内边距 2；卡片内贴边图片圆角与卡片一致；替换现有散落的圆角数值；强制颜色模式下保留可见边框。

## 示例

<style>
.s{height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:20px;padding:16px;background:#f5f6f8;color:#1f2329;font:13px/1.2 system-ui,"PingFang SC",sans-serif}
.r{display:flex;gap:24px;align-items:flex-end}
.it{display:flex;flex-direction:column;align-items:center;gap:8px}
small{font-size:12px;color:#5b616e;white-space:nowrap}
.o{color:#12805c}
.no{color:#d92d20}
.bt{height:32px;padding:0 16px;display:inline-flex;align-items:center;border-radius:6px;background:#3b5bdb;color:#fff;font-weight:600}
.cd{width:64px;height:44px;border-radius:12px;background:#fff;border:1px solid #d5d9e0}
.pl{height:24px;padding:0 12px;display:inline-flex;align-items:center;border-radius:999px;background:#e7ecfd;color:#2f49b0}
.sg{display:flex;padding:2px;border-radius:7px;background:#dfe3ea}
.sg b,.sg span{height:28px;padding:0 12px;display:inline-flex;align-items:center}
.sg b{border-radius:5px;background:#fff;box-shadow:0 1px 2px rgba(25,35,60,.14)}
.sg.x b{border-radius:7px}
</style>

<div class="s"><div class="r"><div class="it"><span class="bt">按钮</span><small>控件 6</small></div><div class="it"><span class="cd"></span><small>卡片 12</small></div><div class="it"><span class="pl">标签</span><small>胶囊 999</small></div></div><div class="r"><div class="it"><div class="sg"><b>日</b><span>周</span><span>月</span></div><small class="o">✓ 外 7 = 内 5 + 间距 2</small></div><div class="it"><div class="sg x"><b>日</b><span>周</span><span>月</span></div><small class="no">✗ 内外都是 7</small></div></div></div>
