---
zh: 图片周围的氛围光
en: Ambient image glow
order: 110
---

## 是什么

图片背后透出一圈同色调的柔光，颜色像从图片里溢到周围的底色上；换一张图，光的颜色跟着平滑过渡。

## 适合

播放页封面、视频详情、商品主图、相册大图这类一张主图撑起整屏气氛的地方，深色底上效果最好。

## 不适合

列表里的小图（几十团光糊成一片）；要准确判断颜色的商品图（光会影响对颜色的感知）；文字密集的阅读页。

## 注意

主色在上传或构建时提取 2–3 个存进数据，运行时直接用；浏览器里用 canvas 读图片像素既慢，又读不了跨域图片。

## 要点

- 两种画法：图片背后放一份模糊副本（blur 40–80px、放大 1.1 倍、不透明度 0.5–0.7），颜色最像；或者用预存的主色画几团径向渐变再整体模糊，开销最小，手机端用这种
- 光向四周溢出 24–48px，边缘渐隐到底色；容器留足内边距，光不被裁掉
- 换图时新旧两层光交叉淡化 400–600ms，图片本身可以直接换
- 浅色底上不透明度降到 0.3–0.45，否则发脏
- 光上压文字时按光最亮处核对对比度，必要时给文字区垫一层半透明底
- 模糊层固定不动，过渡只动 opacity；减少动态效果时换图直接切换
- 轮播的背景整体跟着当前图换色见「轮播」；卡片边缘的流动光见「流光边框按钮」

## 提示词

给{播放页封面 / 商品主图}加「图片周围的氛围光」：主色在上传时提取 2–3 个存进数据（{字段名}），运行时不读图片像素；图片背后放一层用这几个主色画的径向渐变并整体模糊约 28px（或图片的模糊副本：blur 60px、scale 1.1、opacity 0.6），向四周溢出 32px 并渐隐到页面底色，容器留足内边距；浅色底时不透明度降到 0.4；切换图片时新旧两层光交叉淡化 500ms，只动 opacity；光上的文字按最亮处核对对比度；减少动态效果时直接切换。

## 示例

<style>
.s{--cv:100px;--sp:28px;height:100%;box-sizing:border-box;display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:28px;padding:20px 24px 20px 36px;background:#121418;color:#f2f3f5;font:13px/1.45 system-ui,"PingFang SC",sans-serif}
.art{position:relative;width:var(--cv);height:var(--cv)}
/* 两层光交叉淡化：颜色来自数据里预存的主色，不读图片像素 */
.gl{position:absolute;inset:calc(var(--sp) * -1);border-radius:30%;filter:blur(calc(var(--sp) * .9));opacity:0;transition:opacity .5s ease}
.gl.on{opacity:.9}
.cv{position:relative;width:100%;height:100%;border-radius:12px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
.meta{display:grid;gap:4px;min-width:0}
.t{margin:0;font-size:16px;font-weight:600}
.a{margin:0;color:#a9aeb8}
.nav{display:flex;gap:8px;margin-top:10px}
.nb{display:grid;place-items:center;width:34px;height:34px;padding:0;border:1px solid rgba(255,255,255,.22);border-radius:50%;background:rgba(255,255,255,.06);color:#f2f3f5;cursor:pointer}
.nb:focus-visible{outline:2px solid #9db4ff;outline-offset:2px}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@container (max-width:300px){.s{--cv:88px;--sp:22px;gap:24px;padding:16px 16px 16px 28px}
.t{font-size:15px}
}
@container (min-height:280px){.s{--cv:168px;--sp:44px;gap:56px;padding:32px 48px 32px 72px}
.t{font-size:20px}
.a{font-size:14px}
}
@media (prefers-reduced-motion:reduce){.gl{transition:none}
}
</style>

<div class="s">
  <div class="art">
    <div class="gl" aria-hidden="true"></div><div class="gl" aria-hidden="true"></div>
    <div class="cv" role="img"></div>
  </div>
  <div class="meta">
    <p class="t"></p>
    <p class="a"></p>
    <div class="nav"><button type="button" class="nb" data-d="-1" aria-label="上一张"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M8.5 3 4.5 7l4 4"/></svg></button><button type="button" class="nb" data-d="1" aria-label="下一张"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5.5 3l4 4-4 4"/></svg></button></div>
  </div>
  <p class="sr" role="status"></p>
</div>

<script type="module">
// 每张封面的主色是上传时提取好存进数据的，这里直接用
const ITEMS = [
  { t: '海盐汽水', a: '晚潮 · 夏末现场', c: ['#2bb3c0', '#f3d36b', '#1d4e89'] },
  { t: '砖红色的下午', a: '旧城散步 · 第二辑', c: ['#d9573b', '#f2a65a', '#6b2d3a'] },
  { t: '雾里的松林', a: '林间录音 · 清晨', c: ['#5f9e6e', '#c6d8a8', '#28443a'] },
];
const cover = ([a, b, c]) => `radial-gradient(circle at 72% 28%, ${b} 0 16%, transparent 17%), radial-gradient(120% 90% at 20% 100%, ${c} 0 45%, transparent 46%), linear-gradient(150deg, ${a}, ${c})`;
const glow = ([a, b, c]) => `radial-gradient(circle at 25% 30%, ${a}, transparent 72%), radial-gradient(circle at 80% 25%, ${b}, transparent 66%), radial-gradient(circle at 55% 85%, ${c}, transparent 72%)`;
export default function demo(root) {
  const gls = root.querySelectorAll('.gl'), cv = root.querySelector('.cv'), sr = root.querySelector('.sr');
  let i = 0, front = 0;
  const show = (n, say) => {
    i = (n + ITEMS.length) % ITEMS.length;
    const it = ITEMS[i];
    // 新颜色画在后面那层，再把两层的透明度对调
    front = 1 - front;
    gls[front].style.background = glow(it.c);
    gls[front].classList.add('on'); gls[1 - front].classList.remove('on');
    cv.style.background = cover(it.c);
    cv.setAttribute('aria-label', `${it.t}的封面`);
    root.querySelector('.t').textContent = it.t;
    root.querySelector('.a').textContent = it.a;
    if (say) sr.textContent = `第 ${i + 1} 张，共 ${ITEMS.length} 张：${it.t}`;
  };
  root.querySelectorAll('.nb').forEach((b) => (b.onclick = () => show(i + Number(b.dataset.d), true)));
  show(0);
  setTimeout(() => root.host.isConnected && show(1), 700);
}
</script>
