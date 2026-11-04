---
zh: 图片比例与占位
en: Image ratio & placeholder
order: 20
---

## 是什么

图片固定宽高比，加载前显示同比例占位，失败时给中性兜底。

## 适合

商品图、文章封面、头像、相册、首屏主图。

## 不适合

不要让图片按原始尺寸撑开布局造成跳动；不要拉伸变形，也不要缺图时留一块空白。

## 要点

- 同一列表统一一种比例：封面 16:9，商品 1:1 或 4:3，人像 3:4，用 aspect-ratio 固定
- 图片 object-fit: cover 裁切，重要主体用 object-position 保持在画面内
- 加载前显示同比例骨架或主色占位，加载完成淡入 150–240ms，不改变布局（CLS ≤ 0.1）
- 加载失败显示中性底 + 图标 + 可选“重试”，不显示浏览器的破图标
- 用 srcset / sizes 按显示尺寸供图，首屏主图 fetchpriority="high"，其余 loading="lazy"
- 有意义的图片写 alt，装饰图 alt 为空；卡片内贴边图片的圆角与卡片一致

## 提示词

统一{列表或页面}的图片：{封面}用 16:9、{商品}用 1:1，aspect-ratio 固定比例，object-fit: cover；加载中显示同比例骨架（微光 1.4s 一轮，减少动态效果时静止），加载完成淡入 200ms，布局不跳动；失败时显示中性底 + 图片图标 + 重试按钮；用 srcset 按尺寸供图，首屏主图优先加载、其余懒加载；有意义的图写 alt，装饰图 alt 为空；窄屏比例不变，只改列数。

## 示例

<style>
:host{container-type:size}
.s{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:12px 16px;background:#fff;color:#5b616e;font:12px/1.2 system-ui,"PingFang SC",sans-serif}
.r{display:flex;align-items:flex-end;gap:12px}
figure{margin:0;display:flex;flex-direction:column;align-items:center;gap:4px}
small{white-space:nowrap}
.im,.sk,.er{height:clamp(44px,21cqh,92px);border-radius:6px}
.im{background:radial-gradient(circle at 72% 30%,#ffd27a 0 9%,transparent 10%),linear-gradient(165deg,#a9cbff,#d8e8ff 55%,#8bbf95 56%,#5e9a6c)}
.sk{position:relative;overflow:hidden;background:#eceef2}
.sk::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.75),transparent);transform:translateX(-100%);animation:sh 1.4s linear infinite}
@keyframes sh{to{transform:translateX(100%)}
}
.er{display:grid;place-items:center;background:#eceef2}
.er svg{width:22px;height:22px;fill:none;stroke:#8a909c;stroke-width:1.75;stroke-linejoin:round}
@media (prefers-reduced-motion:reduce){.sk::after{animation:none;opacity:0}
}
</style>

<div class="s"><div class="r"><figure><div class="im" style="aspect-ratio:16/9"></div><small>16:9 封面</small></figure><figure><div class="im" style="aspect-ratio:4/3"></div><small>4:3</small></figure><figure><div class="im" style="aspect-ratio:1"></div><small>1:1 商品</small></figure><figure><div class="im" style="aspect-ratio:3/4"></div><small>3:4 人像</small></figure></div><div class="r"><figure><div class="sk" style="aspect-ratio:16/9"></div><small>加载中：同比例骨架</small></figure><figure><div class="er" style="aspect-ratio:16/9"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 16 5-5 4 4 3-3 6 6"/></svg></div><small>失败：中性兜底</small></figure></div></div>
