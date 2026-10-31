---
zh: 玻璃拟态
en: Glassmorphism
order: 20
tab: 基础
---

## 是什么

半透明磨砂卡片浮在彩色背景上，透出模糊的底色，边缘一圈亮边。

## 适合

品牌展示、音乐与天气等小组件、大屏展示页、少量浮层。

## 不适合

不要全页都是玻璃卡片；文字区不要压在图案复杂的背景上；数据密集的后台不适合。

## 要点

- 背景：鲜明但不刺眼的大块柔和形状（2–3 色色团、云），中等对比；细节很碎的照片或纹理模糊后会糊成一团，颜色太杂显乱，纯色背景又看不出玻璃
- 磨砂：backdrop-filter: blur(16–24px) saturate(140–180%)，提高饱和度补回模糊后发灰的颜色；再叠一层很淡的白，纯装饰的玻璃 rgba(255,255,255,.15–.3)，承载文字的卡片提高到 .5–.75；边缘 1px rgba(255,255,255,.7) 亮边
- 模糊全页不超过 2 处，其余卡片用不透明近白模拟
- 卡片文字按透出的最深、最浅背景分别核对，对比度 ≥ 4.5:1，不够就提高卡片不透明度
- 圆角 16–24px；阴影一层大半径、低浓度，配合亮边表现厚度；重色只给 1–2 处，比如唯一的实心主按钮
- 可选折射：用 SVG 位移滤镜（feDisplacementMap）让玻璃边缘透出的背景轻微弯折；只在部分浏览器生效，当作渐进增强，不支持时就是普通磨砂
- 开启“减少透明度”（prefers-reduced-transparency）或不支持 backdrop-filter 时回退为实底
- 动效：背景色团可缓慢漂移，卡片本身不动；减少动态效果时静止

## 提示词

把{产品}的{区块}做成玻璃拟态：背景用 {品牌色} 和两个邻近色的大块柔和色团，中等对比，不用细节很碎的照片或纹理，也不用纯色；主卡片 backdrop-filter: blur(20px) saturate(160%)，叠一层白（承载正文的用 rgba(255,255,255,.6)，纯装饰的用 .2），加 1px 半透明白亮边，圆角 20px，阴影一层大半径低浓度；全页模糊不超过 2 处，其余卡片用不透明近白；卡片文字按最浅背景核对对比度 ≥ 4.5:1；开启减少透明度或不支持模糊时改为实底；色团可慢速漂移，减少动态效果时静止；窄屏卡片满宽。

## 示例

<style>
  :host {
    container-type: size;
  }
  .s {
    position: relative;
    height: 100%;
    display: grid;
    place-items: center;
    overflow: hidden;
    background: #e8edf7;
    color: #14213d;
    font:
      12px/1.4 system-ui,
      "PingFang SC",
      sans-serif;
  }
  .s > i {
    position: absolute;
    border-radius: 50%;
    filter: blur(4px);
  }
  .b1 {
    width: 46%;
    aspect-ratio: 1;
    left: 6%;
    top: -24%;
    background: #ff9f7a;
  }
  .b2 {
    width: 40%;
    aspect-ratio: 1;
    right: 6%;
    bottom: -30%;
    background: #4fc3b0;
  }
  .b3 {
    width: 24%;
    aspect-ratio: 1;
    left: 38%;
    top: 44%;
    background: #7aa7ff;
  }
  .g {
    position: relative;
    width: min(240px, 72%);
    display: grid;
    gap: 4px;
    padding: 16px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.55);
    -webkit-backdrop-filter: blur(18px);
    backdrop-filter: blur(18px);
    border: 1px solid rgba(255, 255, 255, 0.75);
    box-shadow: 0 12px 32px rgba(20, 33, 61, 0.15);
  }
  .top {
    display: flex;
    justify-content: space-between;
    color: #2a3655;
  }
  .g b {
    font-size: clamp(28px, 18cqh, 52px);
    line-height: 1;
    font-weight: 600;
  }
  .g p {
    margin: 0;
    color: #2a3655;
  }
  .wk {
    display: flex;
    justify-content: space-between;
    margin-top: 4px;
    padding-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.8);
    text-align: center;
    color: #2a3655;
  }
  @media (prefers-reduced-transparency: reduce) {
    .g {
      background: #f6f8fc;
      -webkit-backdrop-filter: none;
      backdrop-filter: none;
    }
  }
</style>

<div class="s">
  <i class="b1"></i><i class="b2"></i><i class="b3"></i>
  <div class="g">
    <div class="top"><span>上海 · 徐汇</span><span>14:30</span></div>
    <b>23°</b>
    <p>多云转晴 · 湿度 62%</p>
    <div class="wk">
      <span>周六<br />25°</span><span>周日<br />21°</span
      ><span>周一<br />19°</span>
    </div>
  </div>
</div>
