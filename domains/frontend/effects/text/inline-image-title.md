---
zh: 标题里嵌小图
en: Inline image in a headline
order: 180
---

## 是什么

大标题的两个词之间嵌一枚胶囊形的小图，和文字一样高、跟着文字一起换行；点一下，小图变宽把前后的字推开，同时在标题下方展开成一张完整的大图，再点一下收回。

## 适合

官网首屏、专题页、作品集的大标题，图片能替一个词说话（地点、产品、人物）的时候。

## 不适合

正文、按钮文字、需要逐字朗读准确的标题；一个标题里嵌两三张以上，标题会变成相册。

## 要点

- 小图高约 0.8em、宽约 1.8em，圆角 999px，vertical-align 微调到和文字视觉居中；一个标题只嵌 1–2 枚。
- 小图是真实的按钮：aria-label 写图片内容，aria-expanded 表示是否展开，aria-controls 指向下方的大图；Enter / 空格切换，Esc 收起。
- 展开时小图宽度在约 260ms 内拉到约 3.2em，把前后的字推开；这是全条唯一动布局的地方，其余只动 transform 和 opacity。
- 下方大图用 grid-template-rows 0fr → 1fr 展开，图片从 0.92 倍淡入放大到原大；收起按相反顺序。
- 大图和小图是同一张图的不同裁切（object-fit: cover / background-size: cover），看起来是“放大了它”；想做成真正从小图飞出去的效果，见「共享元素过渡」。
- 标题仍是完整可读的文本，去掉小图不影响意思；图片的意思由 aria-label 补充，不靠图片传达关键信息。
- 窄屏字号变小时小图跟着 em 缩放，不单独设像素尺寸；减少动态效果时直接切换，不过渡。
- 同样是“图和大字结合”，图片铺进笔画里的做法见「大字里透出图片」。

## 提示词

给{首屏大标题}加「标题里嵌小图」：在“{前半句}”和“{后半句}”之间嵌一枚胶囊形小图（高 0.8em、宽 1.8em、圆角 999px，用{图片内容}，background-size: cover），它是带 aria-label、aria-expanded、aria-controls 的真实按钮；点击或 Enter / 空格后小图宽度在 260ms 内拉到 3.2em 把前后文字推开，同时标题下方用 grid-template-rows 0fr → 1fr 展开同一张图的 16:9 大图，图片从 0.92 倍淡入到原大；再点或按 Esc 收起，顺序相反；尺寸都用 em，跟着字号缩放；标题文本去掉小图仍然完整；减少动态效果时直接切换。

## 示例

<style>
.s{--pic:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23f7cf94'/%3E%3Cstop offset='1' stop-color='%23e7896b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='160' height='90' fill='url(%23a)'/%3E%3Ccircle cx='108' cy='40' r='11' fill='%23fff4da'/%3E%3Cpath d='M0 68 38 40 66 58 98 30 160 70V90H0Z' fill='%236e5a7c'/%3E%3Cpath d='M0 80 48 60 86 76 128 56 160 68V90H0Z' fill='%233d3350'/%3E%3C/svg%3E");height:100%;display:grid;align-content:center;gap:8px;padding:12px 16px;box-sizing:border-box;background:#faf8f4;color:#1c1b22;font-family:system-ui,"PingFang SC",sans-serif}
.tt{margin:0;font-size:24px;line-height:1.3;font-weight:700;letter-spacing:.01em}
.chip{display:inline-block;width:1.8em;height:.8em;margin:0 .12em;padding:0;border:0;border-radius:999px;vertical-align:-.04em;background:var(--pic) center/cover;cursor:pointer;transition:width .26s cubic-bezier(.2,0,0,1)}
.chip[aria-expanded="true"]{width:3.2em}
.chip:focus-visible{outline:2px solid #3b5bdb;outline-offset:3px}
.fig{display:grid;grid-template-rows:0fr;transition:grid-template-rows .3s cubic-bezier(.2,0,0,1)}
.fig.open{grid-template-rows:1fr}
.in{overflow:hidden;min-height:0}
.big{width:168px;aspect-ratio:16/9;border-radius:10px;background:var(--pic) center/cover;opacity:0;transform:scale(.92);transform-origin:left top;transition:opacity .26s,transform .3s cubic-bezier(.2,0,0,1)}
.fig.open .big{opacity:1;transform:none}
@container (min-width:520px){.s{padding:16px 28px;gap:12px}
.tt{font-size:34px}
.big{width:300px}
}
@media (prefers-reduced-motion:reduce){.chip,.fig,.big{transition:none}
}
</style>

<div class="s">
  <h2 class="tt">把周末<button type="button" class="chip" aria-label="晚霞下的两道山脊（图片）" aria-expanded="false" aria-controls="ig-fig"></button>交给山野和晚霞</h2>
  <div class="fig" id="ig-fig"><div class="in" data-clip><div class="big" role="img" aria-label="晚霞下的两道山脊"></div></div></div>
</div>

<script type="module">
export default function demo(root) {
  const chip = root.querySelector('.chip'), fig = root.querySelector('.fig');
  const set = (open) => { chip.setAttribute('aria-expanded', String(open)); fig.classList.toggle('open', open); };
  chip.addEventListener('click', () => set(chip.getAttribute('aria-expanded') !== 'true'));
  chip.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
  setTimeout(() => root.host.isConnected && chip.getAttribute('aria-expanded') === 'false' && set(true), 700);
}
</script>
