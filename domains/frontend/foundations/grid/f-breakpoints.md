---
zh: 断点与内容宽度
en: Breakpoints & max width
order: 20
---

## 是什么

按宽度分档变形：手机单列、平板两列、桌面多列，宽屏限制内容宽度。

## 适合

响应式页面、官网、后台在不同屏幕上的布局切换。

## 不适合

不要按设备型号写一堆断点，也不要把一行文字拉满整屏；窄屏不要按比例缩小所有间距。

## 要点

- 常用断点：< 640 手机、640–1023 平板、1024–1439 桌面、≥ 1440 宽屏；按内容需要增减
- 内容宽度：阅读正文约 720px，单列表单 560–720px，官网内容 1200–1280px
- 超宽屏多出的空间留给侧栏、详情或留白，不拉长文字行
- 断点处间距降一档：页面内边距 24 → 16，卡片 24 → 16，区块 48 → 32
- 窄屏：单列、控件宽 100% 左对齐，多列卡片改单列或横滑，表格改卡片列表或容器内横向滚动
- 在 1440 / 768 / 390 三个宽度截图检查，不出现横向滚动
- 组件自身的变形优先用容器查询（@container），不依赖整页宽度

## 提示词

让{页面}适配四档宽度：≥ 1440 内容最大宽 {内容宽度，默认 1200px} 居中；1024–1439 三列；640–1023 两列，侧栏收成抽屉；< 640 单列，控件宽 100%，页面内边距 24 → 16、区块间距 48 → 32；正文行宽不超过 720px；卡片等组件内部用 @container 按自身宽度变形；1440 / 768 / 390 宽度下都不出现横向滚动；文字放大 200% 时不溢出。

## 示例

<style>
.s{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:12px 16px;background:#f5f6f8;color:#5b616e;font:12px/1.2 system-ui,"PingFang SC",sans-serif}
.fr{container-type:inline-size;width:100%;min-width:120px;max-width:100%;height:min(calc(100% - 28px),150px);overflow:hidden;resize:horizontal;padding:8px;border:1px solid #d5d9e0;border-radius:8px;background:#fff;animation:w 6s ease-in-out infinite alternate}
@keyframes w{from{width:130px}
to{width:100%}
}
.bar{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px}
.bar b{width:28px;height:8px;border-radius:4px;background:#1f2329}
.tag{padding:2px 8px;border-radius:999px;background:#e7ecfd;color:#2f49b0;font-weight:600;white-space:nowrap}
.tag::after{content:"手机 · 单列"}
.in{display:grid;grid-template-columns:1fr;gap:6px}
.in i{height:24px;border-radius:4px;background:#e3e6eb}
.in i:nth-child(n+4){display:none}
@container (min-width:220px){.in{grid-template-columns:1fr 1fr}
.in i:nth-child(n+4){display:block}
.tag::after{content:"平板 · 两列"}
}
@container (min-width:330px){.in{grid-template-columns:repeat(3,1fr)}
.tag::after{content:"桌面 · 三列"}
}
@container (min-width:520px){.in{max-width:440px;margin:0 auto}
.tag::after{content:"宽屏 · 内容限宽居中"}
}
.r{display:none}
@media (prefers-reduced-motion:reduce){.fr{animation:none}
.a{display:none}
.r{display:inline}
}
</style>

<div class="s"><div class="fr"><div class="bar"><b></b><span class="tag"></span></div><div class="in"><i></i><i></i><i></i><i></i><i></i><i></i></div></div><p><span class="a">宽度自动变化，演示各档布局</span><span class="r">拖动右下角改变宽度</span></p></div>
