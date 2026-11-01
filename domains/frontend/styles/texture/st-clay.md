---
zh: 黏土拟态
en: Claymorphism
aka: 黏土风 clay 软胶 充气感 3D 软萌
order: 40
---

## 是什么

一块块自带颜色的胖乎乎控件，圆角很大，左上有内高光、右下有内暗影，底下压着一团同色系的柔和投影，像捏出来再充了气的彩色黏土。

## 适合

轻松向的消费类 App：习惯打卡、学习和健身、记账、宠物、休闲游戏的落地页，以及功能介绍里的 3D 小图标和插画。

## 不适合

信息密集的后台、表格和长文，改用「柔和渐变」或「纯净文档风」；想要和背景同色、靠两道外阴影压出来的控制面板，用「新拟态（软浮雕）」；面向低龄用户、要更高饱和和更多插画的页面，用「儿童教育」。

## 注意

和新拟态最大的区别是“元素有自己的颜色”：卡片、按钮、图标各是一种色，和背景明显分开，阴影的立体感在元素内部完成。三层阴影要同时出现，少了内高光就只剩一块普通圆角色块。

## 要点

- 配色：浅丁香底 #f1ecff，卡片近白 #ffffff，正文深紫 #2b2452（对白 14.2:1），次要 #5e5685（6.7:1）；黏土色从紫 #6a4cf0、橙 #ffc773、薄荷 #8ee3c8、粉 #ffb3c7 里选 3 个，紫色底配白字（5.4:1），浅色黏土上用深紫字
- 三层阴影：外投影 0 16px 28px -8px 同色 45% 不透明；内暗影 inset -6px -8px 14px rgba(0,0,0,.12)；内高光 inset 6px 8px 14px rgba(255,255,255,.6)；光源统一在左上
- 形状：卡片圆角 28–36px，按钮 999px 或 20px，图标底座做成圆角方块或圆球；不用描边，元素之间留 16–24px 让投影透气
- 字体：圆体或圆头无衬线，推荐 Nunito 或 Baloo 2 配思源黑体，后备 ui-rounded、"PingFang SC"、sans-serif；标题 800、24–40px，正文 16px / 1.6
- 装饰：漂浮的黏土球、圆环、胶囊 2–4 个，做法同上，放在卡片四周且 aria-hidden；3D 图标可以用同样的阴影堆出来，不必找图
- 动效：按下时先压扁到 scale(.94) 再回弹到 1.04、1，总长 360ms，缓动 cubic-bezier(.34,1.56,.64,1)；装饰慢速浮动 4–6px、周期 4s；减少动态效果时只保留颜色变化
- 状态：选中、完成用颜色和图标表示，进度条做成内凹的轨道加一条黏土色填充；焦点环用 3px 紫色外描边、偏移 3px，和阴影分开
- 窄屏：装饰减到 1–2 个并缩小，卡片满宽、圆角降到 24px，按钮高度不低于 44px

## 提示词

把{产品}的{页面}做成黏土拟态风：浅丁香底 #f1ecff，卡片近白，正文深紫 #2b2452、次要 #5e5685；黏土色用紫 #6a4cf0（配白字）、橙 #ffc773、薄荷 #8ee3c8 三种（浅色上配深紫字），每个元素自带一种颜色；所有黏土元素叠三层阴影：外投影 0 16px 28px -8px 同色 45%、inset -6px -8px 14px rgba(0,0,0,.12)、inset 6px 8px 14px rgba(255,255,255,.6)，光源左上，不用描边；卡片圆角 32px，按钮胶囊形；字体 Nunito 配思源黑体（后备 ui-rounded、PingFang SC），标题 800；卡片四周放 2–4 个漂浮的黏土球和圆环（aria-hidden）；按钮按下压扁到 .94 再回弹，360ms、cubic-bezier(.34,1.56,.64,1)，装饰 4s 慢速浮动，减少动态效果时只保留颜色变化；进度条做内凹轨道加黏土色填充；窄屏装饰减到 1–2 个、卡片圆角 24px、按钮高 44px 以上。

## 示例

<style>
:host{container-type:size}
.s{--in:inset -6px -8px 14px rgba(0,0,0,.12),inset 6px 8px 14px rgba(255,255,255,.6);position:relative;height:100%;display:grid;place-items:center;padding:14px;overflow:hidden;background:#f1ecff;color:#2b2452;font:12px/1.5 ui-rounded,"Nunito","PingFang SC",sans-serif}
.bl{position:absolute;animation:fl 4s cubic-bezier(.45,0,.55,1) infinite alternate}
.b1{left:7%;top:12%;width:34px;height:34px;border-radius:50%;background:#ffc773;box-shadow:0 12px 20px -8px rgba(230,150,40,.55),var(--in)}
.b2{right:6%;bottom:10%;width:46px;height:46px;border-radius:50%;background:radial-gradient(circle,transparent 0 34%,#8ee3c8 35%);box-shadow:0 12px 20px -8px rgba(40,170,130,.5),inset -4px -6px 10px rgba(0,0,0,.12),inset 4px 6px 10px rgba(255,255,255,.6);animation-delay:-2s}
.b3{right:10%;top:9%;width:44px;height:20px;border-radius:999px;background:#ffb3c7;box-shadow:0 10px 18px -8px rgba(230,90,130,.5),var(--in);transform:rotate(-24deg);animation-name:fr}
.cd{position:relative;width:min(272px,86%);display:grid;grid-template-columns:auto minmax(0,1fr);gap:12px 14px;align-items:center;padding:16px;border-radius:32px;background:#fff;box-shadow:0 18px 32px -12px rgba(106,76,240,.35),var(--in)}
.ic{width:52px;height:52px;display:grid;place-items:center;border-radius:20px;background:#6a4cf0;box-shadow:0 10px 18px -6px rgba(106,76,240,.55),inset -5px -6px 10px rgba(0,0,0,.18),inset 5px 6px 10px rgba(255,255,255,.35)}
.ic svg{width:28px;fill:#fff}
small{color:#5e5685;font-weight:700}
.in b{display:block;font-size:clamp(16px,9cqh,26px);line-height:1.25;font-weight:800}
.ft{grid-column:1/-1;display:flex;align-items:center;gap:12px}
.pg{flex:1;height:14px;padding:3px;border-radius:999px;background:#f1ecff;box-shadow:inset 2px 3px 6px rgba(43,36,82,.15),inset -2px -2px 5px rgba(255,255,255,.9)}
.pg i{display:block;height:100%;border-radius:999px;background:#8ee3c8;box-shadow:inset 2px 2px 3px rgba(255,255,255,.6),inset -2px -2px 3px rgba(0,0,0,.1);transition:width .36s cubic-bezier(.34,1.56,.64,1)}
.ct{min-width:48px;color:#5e5685;font-weight:700;white-space:nowrap}
button{height:36px;padding:0 16px;border:0;border-radius:999px;background:#6a4cf0;color:#fff;font:inherit;font-size:13px;font-weight:800;white-space:nowrap;cursor:pointer;box-shadow:0 10px 18px -6px rgba(106,76,240,.6),inset -4px -5px 10px rgba(0,0,0,.18),inset 4px 5px 10px rgba(255,255,255,.35)}
button:hover{background:#7658f5}
button:focus-visible{outline:3px solid #6a4cf0;outline-offset:3px}
button.sq{animation:sq .36s cubic-bezier(.34,1.56,.64,1)}
button:disabled{background:#8ee3c8;color:#2b2452;cursor:default}
@keyframes sq{30%{transform:scale(.94,.9)}
70%{transform:scale(1.04)}
}
@keyframes fl{to{transform:translateY(-6px)}
}
@keyframes fr{from{transform:rotate(-24deg)}
to{transform:rotate(-24deg) translateY(-6px)}
}
@container (max-width:300px){.b3{display:none}
.cd{padding:14px;border-radius:24px}
}
@container (min-height:260px){.cd{width:340px;padding:22px;gap:18px}
.ic{width:68px;height:68px;border-radius:24px}
.ic svg{width:36px}
small{font-size:13px}
button{height:44px;padding:0 22px;font-size:15px}
.b1{width:48px;height:48px;left:14%}
.b2{width:64px;height:64px;right:14%}
.b3{right:18%}
}
@media (prefers-reduced-motion:reduce){.bl,button.sq{animation:none}
.pg i{transition:none}
}
</style>

<div class="s">
  <i class="bl b1" aria-hidden="true"></i><i class="bl b2" aria-hidden="true"></i><i class="bl b3" aria-hidden="true"></i>
  <div class="cd">
    <div class="ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M13.5 2 5 13.5h5.5L9 22l9-12h-5.6z"/></svg></div>
    <div class="in"><small>今日打卡 · 第 12 天</small><b>晨跑 5 公里</b></div>
    <div class="ft"><div class="pg" aria-hidden="true"><i style="width:60%"></i></div><span class="ct" role="status">本周 3/5</span><button type="button">打卡 +1</button></div>
  </div>
</div>

<script type="module">
export default function demo(root) {
  const b = root.querySelector('button'), bar = root.querySelector('.pg i'), ct = root.querySelector('.ct');
  let n = 3;
  b.onclick = () => {
    n = Math.min(5, n + 1);
    bar.style.width = n * 20 + '%'; ct.textContent = `本周 ${n}/5`;
    b.classList.remove('sq'); void b.offsetWidth; b.classList.add('sq');
    if (n === 5) { b.textContent = '已完成'; b.disabled = true; }
  };
}
</script>
