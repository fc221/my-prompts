---
zh: 大字里透出图片
en: Image-filled type
order: 160
---

## 是什么

特大号的粗体标题里透出一张照片：图片只出现在笔画里面，笔画外是干净的底色；进场时图片在字里缓缓平移一小段，字本身纹丝不动。

## 适合

旅行目的地、摄影作品集、品牌活动页上一到四个字的超大标题，图片本身就是内容的一部分。

## 不适合

细体字、小字号、长句子（笔画太细看不出图，还难读）；正文和按钮；图片色彩杂乱或和底色太接近时，改用普通的彩色大字。

## 注意

一定要有纯色兜底：不支持文字裁切、图片没加载出来、系统开了高对比度时，标题都要以实色显示，不能留下一块透明的空字。

## 要点

- 只用在 80px 以上、字重 600 以上的一到四个字上，笔画越粗图片越看得出来；容器宽度贴合文字（width: fit-content），图片才不会被拉到空白处
- 先给文字一个接近图片主色的实色，只在 @supports (background-clip: text) 里才改成 color: transparent 并裁切背景
- 选主体明确、整体偏深或饱和度高的图，和页面底色拉开明暗；浅色天空这类和底色接近的部分会让笔画“断掉”
- 动效只移动字里的图片：background-position 平移 30% 左右，约 3 秒缓出，只播一次；字形、字距、排版都不动
- 标题仍是真实文本（h1 / h2），读屏照常朗读；图片只是装饰，不另写替代文字
- 可选滚动放大：标题钉在视口里，随滚动进度整体放大（scale 从 1 到约 30，transform-origin 对准一个笔画较宽的字的中心），字里的图片越放越大直到铺满整屏，接着进入下一节；用滚动驱动动画（animation-timeline: view()）只动 transform，不支持时保持静态大字
- forced-colors 模式下去掉背景、回到系统文字色；减少动态效果时图片不平移

## 提示词

把{专题页}的{一到四个字的大标题}做成「大字里透出图片」：标题 80px 以上、字重 700，宽度贴合文字，用{目的地照片}作为背景，通过 background-clip: text 只在笔画里显示；先给文字设一个接近照片主色的实色兜底，只在 @supports (background-clip: text) 时才改成透明；照片选偏深、饱和的，和页面底色拉开明暗；进场时图片在字里平移 30% 左右，3 秒缓出、只播一次，字形不动；forced-colors 下去掉背景用系统文字色；标题保持真实的 h1 文本；减少动态效果时不平移。

## 示例

<style>
:host{display:block;height:100%}
.st{position:relative;height:100%;overflow:hidden;container-type:size;display:flex;flex-direction:column;justify-content:center;padding:0 22px 6px;background:#f5f3ef;color:#1c2540;font:13px/1.5 system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.kk{margin:0;color:#5e6478;font-size:12px;letter-spacing:.08em}
.big{width:fit-content;margin:0;font-size:96px;line-height:1.08;font-weight:900;letter-spacing:.02em;color:#3b4690}
@supports ((-webkit-background-clip:text) or (background-clip:text)){.big{color:transparent;background-image:var(--img);background-size:170% 100%;background-position:0% 50%;-webkit-background-clip:text;background-clip:text}
}
.big.pan{animation:pan 3.2s cubic-bezier(.2,0,0,1) forwards}
@keyframes pan{from{background-position:0% 50%}
to{background-position:60% 50%}
}
.cap{display:flex;align-items:center;gap:8px;margin:4px 0 0;color:#454c63;font-size:12px}
.cap i{width:8px;height:8px;border-radius:50%;background:var(--dot)}
.info{display:none}
.nx{position:absolute;right:14px;bottom:14px}
.st[data-s="0"]{--dot:#e8577e;--img:conic-gradient(from 160deg at 34% 30%,rgba(255,255,255,.5) 0 18deg,transparent 0),conic-gradient(from 122deg at 74% 46%,#232c6b 0 116deg,transparent 0),conic-gradient(from 126deg at 34% 30%,#3d4a9a 0 108deg,transparent 0),radial-gradient(circle at 54% 28%,#ffe08a 0 5%,rgba(255,224,138,0) 13%),linear-gradient(180deg,#ff8a5c 0%,#e8577e 45%,#6b5bd6 100%)}
.st[data-s="1"]{--dot:#3fe0a8;--img:conic-gradient(from 112deg at 62% 64%,#070d26 0 136deg,transparent 0),radial-gradient(38% 50% at 28% 36%,rgba(90,255,190,.95),rgba(90,255,190,0) 70%),radial-gradient(34% 46% at 60% 24%,rgba(130,140,255,.9),rgba(130,140,255,0) 70%),radial-gradient(28% 40% at 86% 42%,rgba(70,220,255,.75),rgba(70,220,255,0) 70%),radial-gradient(circle at 12% 14%,#fff 0 .6%,transparent 1%),radial-gradient(circle at 44% 10%,#fff 0 .5%,transparent .9%),linear-gradient(180deg,#121a44,#1f2c66)}
.st[data-s="2"]{--dot:#1fa3a8;--img:linear-gradient(180deg,transparent 60%,#127a86 60%,#0a4656 100%),conic-gradient(from 108deg at 40% 40%,#1f6b5b 0 144deg,transparent 0),conic-gradient(from 124deg at 80% 34%,#3c9c86 0 112deg,transparent 0),radial-gradient(circle at 62% 24%,#fff2b0 0 5%,rgba(255,242,176,0) 12%),linear-gradient(180deg,#3fb2d6,#2a86b8)}
@media (forced-colors:active){.big{background:none;color:CanvasText}
}
@container (max-width:310px){.big{font-size:88px}
}
@container (min-height:280px){.st{padding:0 44px 10px}
.kk{font-size:13px}
.big{font-size:168px;line-height:1.05}
.cap{font-size:13px}
.info{position:absolute;right:44px;top:50%;display:grid;gap:10px;margin:0;padding:16px 18px;border-radius:14px;background:#fff;box-shadow:0 6px 20px rgba(28,37,64,.08);transform:translateY(-50%)}
.info div{display:grid;gap:0}
.info dt{color:#5e6478;font-size:12px}
.info dd{margin:0;font-size:15px;font-weight:600}
.nx{right:24px;bottom:20px}
}
@media (prefers-reduced-motion:reduce){.big.pan{animation:none;background-position:30% 50%}
}
</style>

<div class="st" data-s="0"><p class="kk">冬季专题 · 阿勒泰 7 日</p><h3 class="big">雪国</h3><p class="cap"><i aria-hidden="true"></i><span class="sn">晨光雪山</span><span>· 12 月 18 日出发</span></p><dl class="info"><div><dt>行程</dt><dd>7 天 6 晚</dd></div><div><dt>路线</dt><dd>禾木 → 喀纳斯</dd></div><div><dt>剩余名额</dt><dd>4 席</dd></div></dl><button type="button" class="ctl nx">换一张</button><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const st = root.querySelector('.st'), big = root.querySelector('.big'), sn = root.querySelector('.sn'), msg = root.querySelector('[role=status]'), N = ['晨光雪山', '极光夜', '湖面'];
  let s = 0;
  // 只移动字里的图片：重新挂上平移动画，字形不动
  const pan = () => { big.classList.remove('pan'); void big.offsetWidth; big.classList.add('pan'); };
  root.querySelector('.nx').addEventListener('click', () => { s = (s + 1) % N.length; st.dataset.s = String(s); sn.textContent = N[s]; pan(); msg.textContent = '标题图片换成：' + N[s]; });
  pan();
}
</script>
