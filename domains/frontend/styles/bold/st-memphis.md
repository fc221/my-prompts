---
zh: 孟菲斯
en: Memphis
aka: 孟菲斯风 几何撞色 80年代 后现代 memphis design
order: 40
---

## 是什么

奶白底上散落着撞色的三角、圆点、波浪线和锯齿条，黑色粗描边，色块里填着黑白图案，热闹、俏皮，带着 80 年代后现代的味道。

## 适合

年轻向的活动页和快闪、潮玩与文创、音乐节、创意营销 H5、社交产品的活动皮肤、设计类课程招生。

## 不适合

正文多、要长时间阅读的页面；金融、医疗这类要信任感的产品，改用「企业稳重」；想要粗黑框、黑色硬投影、更直白粗糙的感觉，用「粗野主义」；面向低龄孩子的产品，用「儿童教育」。

## 注意

孟菲斯最容易做乱。先定好装饰的数量和位置，文字永远放在纯色卡片上，几何图形只待在卡片四周和留白里。

## 要点

- 配色：奶白底 #fff8ec，近黑 #1a1a1a 做文字和 3px 描边；4 个撞色：珊瑚粉 #ff6f91、明黄 #ffd23f、湖蓝 #2ec4d6、薰衣草紫 #a98bff；色块上一律放黑字（对比度都在 6.5:1 以上），不放白字
- 几何元素：三角、圆、半圆、波浪线（SVG 描边 4–5px、圆头）、锯齿条、点阵、斜纹；图案填充用 repeating-linear-gradient 和 radial-gradient 画，不用位图
- 装饰上限：一屏最多 6 个几何装饰，同一种形状最多 2 个；全部放在内容卡片四周和留白里，离文字至少 24px；正文和按钮下面只用纯色底
- 卡片：白底或单色底、3px 黑框、圆角 0；投影用彩色硬投影 8px 8px 0（如薰衣草紫，外圈再描一道黑边），和黑色硬投影拉开区别
- 字体：标题用几何感粗无衬线 800–900，英文可用 Poppins 或 Rubik，中文思源黑体 Heavy；正文 16px / 1.7；标题里可以挑一两个字单独垫一块撞色底
- 按钮：胶囊形、3px 黑框、撞色底黑字；悬停上跳 3px、投影加大，160ms，按下回到原位
- 动效：装饰缓慢漂浮或自转，6–10s linear 循环，同时在动的不超过 3 个；减少动态效果时全部静止
- 窄屏：装饰减到 3 个并缩小，退到四角；卡片满宽，彩色投影缩到 6px

## 提示词

把{产品}的{页面}做成孟菲斯风：奶白 #fff8ec 底，近黑 #1a1a1a 文字和 3px 描边，撞色用珊瑚粉 #ff6f91、明黄 #ffd23f、湖蓝 #2ec4d6、薰衣草紫 #a98bff，色块上只放黑字；几何装饰（三角、圆点、波浪线、锯齿条、斜纹）用 SVG 和 CSS 渐变画，一屏最多 6 个、同一种形状最多 2 个，只放在内容卡片四周，离文字至少 24px；内容放在白底、3px 黑框、圆角 0 的卡片里，投影用薰衣草紫硬投影 8px 8px 0 再描一道黑边；标题用几何粗无衬线 900（Poppins 或思源黑体 Heavy），可以给一两个字垫撞色底，正文 16px / 1.7；按钮胶囊形、黑框、撞色底，悬停上跳 3px、160ms；装饰 6–10s 缓慢漂浮，同时动的不超过 3 个，减少动态效果时静止；窄屏装饰减到 3 个、退到四角。

## 示例

<style>
:host{container-type:size}
.s{--k:#1a1a1a;position:relative;height:100%;display:flex;align-items:center;padding:14px 20px;overflow:hidden;background:#fff8ec;color:var(--k);font:12px/1.6 system-ui,"PingFang SC",sans-serif}
.d{position:absolute;pointer-events:none}
.d path,.d polygon{fill:none;stroke-linecap:round;stroke-linejoin:round}
.sq{right:5%;top:10%;width:24%}
.sq path{stroke:#2ec4d6;stroke-width:5}
.tri{right:3%;bottom:6%;width:14%;animation:spin 10s linear infinite}
.tri polygon{fill:#ffd23f;stroke:var(--k);stroke-width:3}
.dot{right:10%;top:36%;width:16%;aspect-ratio:1;border:3px solid var(--k);border-radius:50%;background:radial-gradient(circle,var(--k) 22%,transparent 26%) 0 0/9px 9px,#ff6f91;animation:float 6s ease-in-out infinite alternate}
.zz{display:none;left:40px;bottom:12px;width:150px;height:12px;background:linear-gradient(135deg,#a98bff 25%,transparent 25%) -6px 0/12px 12px,linear-gradient(225deg,#a98bff 25%,transparent 25%) -6px 0/12px 12px}
.half{left:-27px;top:-27px;width:54px;aspect-ratio:1;border:3px solid var(--k);border-radius:50%;background:#2ec4d6}
.stp{right:24%;bottom:-8px;width:11%;aspect-ratio:1;border:3px solid var(--k);background:repeating-linear-gradient(45deg,var(--k) 0 3px,#fff 3px 8px);animation:float 8s ease-in-out infinite alternate-reverse}
.card{position:relative;max-width:min(60%,330px);padding:12px 16px 14px;border:3px solid var(--k);background:#fff;box-shadow:8px 8px 0 #a98bff,8px 8px 0 3px var(--k)}
.ey{display:inline-block;padding:0 10px;border:2px solid var(--k);border-radius:999px;background:#ff6f91;font-weight:800}
h1{margin:6px 0 4px;font:900 clamp(22px,14cqh,48px)/1.15 Poppins,"Noto Sans SC","PingFang SC",system-ui,sans-serif;white-space:nowrap}
h1 span{padding:0 4px;background:#ffd23f}
p{margin:0 0 10px;color:#3a3a3a;white-space:nowrap}
.more{display:none}
a{display:inline-flex;align-items:center;height:32px;padding:0 16px;border:3px solid var(--k);border-radius:999px;background:#a98bff;box-shadow:3px 3px 0 var(--k);color:var(--k);font-weight:800;text-decoration:none;transition:transform .16s,box-shadow .16s}
a:hover{transform:translateY(-3px);box-shadow:4px 6px 0 var(--k)}
a:active{transform:none;box-shadow:3px 3px 0 var(--k)}
a:focus-visible{outline:3px dashed #2ec4d6;outline-offset:4px}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes float{to{transform:translateY(-10%)}}
@container (max-width:300px){.zz,.stp,.dot{display:none}
.card{max-width:66%;box-shadow:6px 6px 0 #a98bff,6px 6px 0 3px var(--k)}
.sq{width:22%}
}
@container (min-height:260px){.s{padding:24px 40px}
.card{padding:20px 26px 22px}
.ey{font-size:13px}
p{font-size:14px;margin-bottom:16px}
a{height:40px;padding:0 22px;font-size:14px}
.half{width:90px;left:-45px;top:-45px}
.zz{display:block}
.more{display:inline}
}
@media (prefers-reduced-motion:reduce){.tri,.dot,.stp{animation:none}
a{transition:none}
a:hover{transform:none}
}
</style>

<div class="s">
  <i class="d half" aria-hidden="true"></i>
  <svg class="d sq" viewBox="0 0 100 30" aria-hidden="true"><path d="M4 18C14 4 22 4 30 16S46 28 54 16 70 4 78 16 92 26 96 14"/></svg>
  <i class="d dot" aria-hidden="true"></i>
  <svg class="d tri" viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,8 94,88 6,88"/></svg>
  <i class="d zz" aria-hidden="true"></i>
  <i class="d stp" aria-hidden="true"></i>
  <div class="card">
    <span class="ey">周末快闪</span>
    <h1>色彩<span>派对</span></h1>
    <p>11.23–24 · 静安<span class="more"> · 免费入场</span></p>
    <a href="#">预约入场</a>
  </div>
</div>
