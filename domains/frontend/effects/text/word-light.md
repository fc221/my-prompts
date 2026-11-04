---
zh: 读到哪亮到哪
en: Scroll-lit words
order: 140
---

## 是什么

一段话先以浅灰色完整显示，随着往下滚动，文字按阅读顺序一个词一个词变成深色；手停下就停在那里，往回滚又一点点变浅。

## 适合

官网里的品牌理念、“关于我们”、产品宣言这类三五行的短段落，想让人放慢速度读完。

## 不适合

正文、文档、说明这类需要快速扫读的长文，直接正常显示；价格、条款、表单说明这类要马上看清的内容不要做。

## 注意

点亮程度必须由当前滚动位置直接决定：停下就停，倒回就退；不要滚到某处就触发一段自己播到底的动画，也不要加长过渡让颜色追着滚动跑。

## 要点

- 段落拆成词或短语（中文用 Intl.Segmenter 按词切，标点单独一段），文字始终在原位，只改颜色，不位移、不改字重
- 起止区间写清楚：段落顶部到达视口 85% 处开始，段落底部到达视口 45% 处全部点亮；视口尺寸变化后重算
- 交界处 3–5 个词按进度在浅色和深色之间插值，过渡是连续的，不一跳一跳
- 未点亮的颜色也要可读：20px 以上的粗体字对比度至少 3:1，点亮后用正文色
- 优先用 CSS 滚动驱动动画：段落用 view() 时间线驱动一个 @property 注册的进度变量，每个词按自己的序号从这个进度算颜色（每个词各用 view() 会变成每行各亮各的）；不支持时在 scroll 事件里用 requestAnimationFrame 计算；监听真正在滚动的那个容器
- 文字是完整的真实文本，读屏照常朗读，不加 aria-live；可滚动区域能用键盘聚焦和方向键滚动
- 减少动态效果时直接全部显示为正文色

## 提示词

把{关于我们页}里的{理念段落}做成「读到哪亮到哪」：段落按词或短语拆开（中文用 Intl.Segmenter 按词切），先整体显示为浅灰（20px 以上粗体，对比度仍 ≥ 3:1），随着页面滚动按阅读顺序逐词变成正文色；进度从段落顶部到达视口 85% 开始，到段落底部到达视口 45% 时全部点亮，交界处 3–5 个词按进度插值；颜色只由当前滚动位置决定，停下就停、往回滚就回退，不加过渡、不自己播放，也不移动文字；优先用 animation-timeline: view() 让段落驱动一个 @property 注册的进度变量，每个词按序号从它算颜色，不支持时用 requestAnimationFrame 读取滚动位置并写同一个变量；减少动态效果时直接全部显示为正文色。

## 示例

<style>
:host{display:block;height:100%}
.st{position:relative;display:flex;flex-direction:column;height:100%;overflow:hidden;container-type:size;background:#f7f3ec;color:#1f1b16;font:13px/1.5 system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif}
.hd{flex:none;display:flex;align-items:center;gap:10px;height:42px;padding:0 10px 0 18px;border-bottom:1px solid #e8dfd1}
.hd b{font-size:12px;letter-spacing:.08em;color:#8a6d3b}
.pc{margin-left:auto;color:#6f675c;font-size:11px;font-variant-numeric:tabular-nums}
.hd .ctl{height:28px;padding:0 10px;font-size:12px}
.page{position:relative;flex:1;min-height:0;overflow-y:auto;padding:0 20px;scrollbar-width:none}
.page::-webkit-scrollbar{display:none}
.page:focus-visible{outline:2px solid #8a6d3b;outline-offset:-2px}
.hint{display:flex;align-items:center;gap:6px;height:calc((100cqh - 42px) * .9);margin:0;color:#6f675c;font-size:12px}
.hint svg{width:14px;height:14px}
.tx{margin:0;font-size:20px;font-weight:700;line-height:1.55}
.sig{margin:14px 0 0;color:#6f675c;font-size:12px}
.pad{height:55cqh}
@container (min-height:280px){.hd{height:48px;padding:0 14px 0 32px}
.page{padding:0 32px}
.hint{height:calc((100cqh - 48px) * .9)}
.tx{max-width:30em;font-size:26px;line-height:1.5}
.sig{font-size:13px}
}
</style>

<div class="st"><div class="hd"><b>关于 MyPrompts</b><span class="pc" aria-hidden="true">0%</span><button type="button" class="ctl re">重播</button></div><div class="page" tabindex="0" aria-label="书店介绍，可滚动"><p class="hint"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3v10M4 9l4 4 4-4"/></svg>向下滚动这一块</p><p class="tx">MyPrompts 不追畅销榜。我们每周只上新十二本书，每一本都有店员从头读完，再写一张手写卡片夹在扉页里。你可以慢慢挑，也可以什么都不买，只是坐一个下午。</p><p class="sig">— 店长手记，第 41 期</p><div class="pad"></div></div></div>

<script type="module">
export default function demo(root) {
  const page = root.querySelector('.page'), tx = root.querySelector('.tx'), pc = root.querySelector('.pc');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // 中文按词切；没有 Intl.Segmenter 时退回逐字
  const text = tx.textContent;
  const parts = typeof Intl.Segmenter === 'function' ? [...new Intl.Segmenter('zh', { granularity: 'word' }).segment(text)].map((s) => s.segment) : [...text];
  tx.textContent = '';
  const ws = parts.map((s) => { const el = document.createElement('span'); el.textContent = s; tx.append(el); return el; });
  const DIM = [128, 120, 110], INK = [31, 27, 22]; // 未点亮色在底色上约 3.8:1
  const paint = () => {
    const vh = page.clientHeight, top = tx.offsetTop - page.scrollTop, a = vh * 0.85;
    // 段落顶部到 85% 处为 0，段落底部到 45% 处为 1
    const p = still ? 1 : Math.min(1, Math.max(0, (a - top) / (vh * 0.4 + tx.offsetHeight))), lit = p * ws.length;
    ws.forEach((w, i) => { const t = Math.min(1, Math.max(0, lit - i)); w.style.color = 'rgb(' + DIM.map((v, k) => Math.round(v + (INK[k] - v) * t)).join(',') + ')'; });
    pc.textContent = '已点亮 ' + Math.round(p * 100) + '%';
  };
  let raf = 0;
  page.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; paint(); }); }, { passive: true });
  new ResizeObserver(paint).observe(page);
  // 演示：回到顶部，再平滑滚到一半点亮的位置
  const half = () => { const vh = page.clientHeight; return tx.offsetTop - (vh * 0.85 - 0.55 * (vh * 0.4 + tx.offsetHeight)); };
  const play = () => { page.scrollTop = 0; paint(); requestAnimationFrame(() => page.scrollTo({ top: half(), behavior: still ? 'auto' : 'smooth' })); };
  root.querySelector('.re').addEventListener('click', play);
  paint();
  setTimeout(play, 400);
}
</script>
