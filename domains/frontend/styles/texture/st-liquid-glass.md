---
zh: 液态玻璃
en: Liquid glass
aka: 液体玻璃 透镜玻璃 折射玻璃 lens glass refraction
order: 70
---

## 是什么

像一块有厚度的透明镜片浮在内容上：中间几乎不模糊，看得清背后的画面；边缘一圈把背景折弯、放大，亮边的颜色跟着下面的画面变；按住时它鼓起来，拖动时顺着方向拉长，松手弹回原形。

## 适合

浮在照片、视频、地图上的控件：底部标签栏、播放条、相机界面的控件组、地图上的定位和图层按钮、锁屏或桌面小组件的外框。

## 不适合

承载正文、表单和表格的卡片：边缘折射会让内容变形，改用「玻璃拟态」或实底卡片；背景是纯色或大片浅色时看不出折射，用「玻璃拟态」就够；想要柔软的浮雕按钮用「新拟态（软浮雕）」。

## 注意

折射只做边缘 10–14px 的一圈，中间保持平整，文字和图标都放在平整区里。把 SVG 位移滤镜写进 backdrop-filter 目前只有 Chromium 内核稳定生效，Safari 和 Firefox 按不支持处理：先把普通毛玻璃版本做完整，折射是在它上面加的一层。

## 要点

- 清透：backdrop-filter 只模糊 1–3px，再加 saturate(160–180%) 和 brightness(1.05)；玻璃本身只叠 rgba(255,255,255,.06–.12) 的白，和「玻璃拟态」16–24px 的磨砂拉开
- 折射：SVG 滤镜里 feImage 读一张位移图，交给 feDisplacementMap（scale 30–60，xChannelSelector="R"、yChannelSelector="G"）；filter 上写 color-interpolation-filters="sRGB"，通道值 128 才是不偏移
- 位移图：用 canvas 按控件的实际像素尺寸画，R、G 通道写边缘法线方向的偏移，强度按到圆角边缘的距离平滑衰减到 0；控件尺寸或圆角变了就重画，不拉伸旧图
- 高光：三层内阴影做出厚度：inset 0 1px 0 rgba(255,255,255,.7) 顶边亮线、inset 0 -1px 1px rgba(255,255,255,.25) 底边反光、inset 0 0 14px rgba(255,255,255,.16) 内发光；亮边那层用 mix-blend-mode: overlay 叠上去，颜色随背景变；外投影 0 8px 24px rgba(0,0,0,.22)
- 形状和字：胶囊 999px 或 24–32px 大圆角；标签 system-ui / PingFang SC 12–13px / 600，图标 22–24px；文字白色 #ffffff 加 0 1px 2px rgba(0,0,0,.35)，玻璃下层垫 rgba(16,14,32,.2–.3) 的暗色，按最亮的背景核对对比度 ≥ 4.5:1，不够就加深这层
- 形变：按下 scale(1.12) 鼓起，拖动时沿运动方向拉长（scaleX 最多 1.3，scaleY 同时压到 0.9），松手用弹簧吸附到最近一格（刚度约 320、阻尼约 22，过冲一次）；只动 transform，停稳后停掉 requestAnimationFrame
- 降级：非 Chromium 内核只用 backdrop-filter: blur(14px) saturate(160%) 加 rgba(255,255,255,.18) 的普通毛玻璃；prefers-reduced-transparency 时改成 rgba(28,26,44,.88) 实底；减少动态效果时不鼓起、不拉伸，直接到位
- 用量：一屏最多 3 块，只给浮在内容上的控件；窄屏标签栏贴底，左右留 12px，底部再加 env(safe-area-inset-bottom)

## 提示词

把{产品}的{浮动控件}做成液态玻璃：控件压在{背景内容}（照片、视频或地图）上，backdrop-filter 只模糊 2px，加 saturate(170%) 和 brightness(1.05)，玻璃本身叠 rgba(255,255,255,.08) 的白；用 SVG 滤镜做边缘折射：canvas 按控件实际尺寸画一张位移图（R、G 通道写边缘法线方向的偏移，只在边缘 12px 内有值，其余为 128），feImage 读入后交给 feDisplacementMap（scale 40，color-interpolation-filters="sRGB"），尺寸变化时重画；高光用三层内阴影（顶边 1px 白线、底边淡反光、14px 内发光），亮边用 mix-blend-mode: overlay，外投影 0 8px 24px rgba(0,0,0,.22)；胶囊圆角，标签 13px / 600 白字加淡阴影，玻璃下层垫一层暗色，对比度 ≥ 4.5:1；选中块可拖动：按下鼓到 1.12 倍，拖动时沿方向拉长到最多 1.3 倍、纵向压到 0.9，松手用弹簧（刚度 320、阻尼 22）吸到最近一格，方向键也能切换，用 role="tablist"；位移滤镜只在 Chromium 内核启用，其他浏览器用 blur(14px) 的普通毛玻璃；开启减少透明度时改实底，减少动态效果时直接到位；一屏最多 3 块玻璃。
