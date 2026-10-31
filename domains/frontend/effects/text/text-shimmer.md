---
zh: 文字上的扫光
en: Shimmering text
order: 150
---

## 是什么

一道窄窄的亮光从左到右掠过标题，像光线扫过金属表面；文字本身一直是清楚的颜色，亮带只是叠在上面路过一两次。

## 适合

新功能发布、品牌口号这类短标题的一次性强调；AI 生成、语音转写“进行中”的状态文字（处理时持续扫，完成立刻停）。

## 不适合

正文、按钮文字、长段落；一屏里同时有好几处在扫。内容占位用「骨架屏」，不要拿扫光文字代替。

## 注意

扫光要有终点：标题只扫 1–2 次就停，进行中的状态在任务结束时立刻停；文字的底色本身就要够清楚，不能靠亮带经过才看得见。

## 要点

- 渐变通过 background-clip: text 裁切到文字里，两侧是可读的文字色，中间一条窄亮带，约占文字宽度的 15–30%
- 渐变铺 300% 宽，用 background-position 从一端平移到另一端；单次 1.2–1.6 秒，两次之间留约 0.3 秒空当
- 标题扫 2 次后停在纯底色；状态文字在任务完成时停止，并换成完成文案（如“已生成”）
- 深色底用接近白色的亮带，浅色底用比文字更深或更饱和的亮带；两种背景都核对一次文字底色的对比度
- 容器宽度贴合文字（width: fit-content），亮带的速度和宽度才跟着文字长短走
- 不支持文字裁切时显示普通文字；读屏只读文字；减少动态效果时不扫光

## 提示词

给{发布页标题}加「文字上的扫光」：文字本身用清楚的颜色（对比度 ≥ 4.5:1），上面用 background-clip: text 叠一条窄亮带（约占文字宽度 20%，深色底用暖白），渐变铺 300% 宽、用 background-position 从左扫到右，单次约 1.4 秒，共扫 2 次，中间停 0.3 秒，结束后停在纯色；容器宽度贴合文字；不支持文字裁切时显示普通文字；减少动态效果时不扫光。

## 示例

<style>
:host{display:block;height:100%}
.st{position:relative;height:100%;overflow:hidden;container-type:size;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:0 22px 8px;background:radial-gradient(120% 90% at 100% 0%,#272b3c 0,#101219 62%);color:#e8eaef;font:13px/1.5 system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif}
.pill{display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 10px;border:1px solid rgba(255,255,255,.12);border-radius:999px;background:rgba(255,255,255,.06);color:#d3d7df;font-size:11.5px}
.pill i{width:6px;height:6px;border-radius:50%;background:#ffcf7a;box-shadow:0 0 8px #ffcf7a}
.sh{width:fit-content;margin:12px 0 6px;font-size:26px;line-height:1.25;font-weight:700;color:#b9bec9}
@supports ((-webkit-background-clip:text) or (background-clip:text)){.sh{color:transparent;background:linear-gradient(100deg,#b9bec9 0 46%,#fff4dc 50%,#b9bec9 54% 100%) 0 0/300% 100% no-repeat;-webkit-background-clip:text;background-clip:text}
.sh.run{animation:sweep 1.7s cubic-bezier(.45,0,.25,1) 2}
}
@keyframes sweep{0%{background-position:100% 0}
82%,100%{background-position:0 0}
}
.sub{margin:0;color:#9aa0ad;font-size:12.5px}
.re{position:absolute;right:14px;bottom:14px}
@container (max-width:310px){.sh{font-size:23px}
}
@container (min-height:280px){.st{padding:0 44px 12px}
.pill{height:28px;font-size:12.5px}
.sh{margin:16px 0 10px;font-size:44px}
.sub{font-size:14px}
.re{right:24px;bottom:20px}
}
@media (prefers-reduced-motion:reduce){.sh.run{animation:none}
}
</style>

<div class="st"><span class="pill"><i aria-hidden="true"></i>新功能 · 会议纪要</span><h3 class="sh">开完会，纪要已经写好</h3><p class="sub">录音转文字、要点和待办，散会前就整理好</p><button type="button" class="ctl re">重播</button></div>

<script type="module">
export default function demo(root) {
  const sh = root.querySelector('.sh');
  // 扫 2 次后动画结束，停在纯底色；重播就重新挂上
  const run = () => { sh.classList.remove('run'); void sh.offsetWidth; sh.classList.add('run'); };
  root.querySelector('.re').addEventListener('click', run);
  run();
}
</script>
