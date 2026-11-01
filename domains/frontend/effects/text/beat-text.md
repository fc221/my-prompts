---
zh: 踩着节拍变色的标题
en: Beat-synced color title
order: 60
---

## 是什么

标题里的词一拍一个地弹进来，整行文字共用一条从暖到深的渐变，每一拍把颜色往前推一段，最后停在深色收尾，像跟着鼓点一路染过去。

## 适合

活动预告、音乐节、舞蹈或健身课程、品牌短片结尾这类有配乐或强节奏感的首屏标题，两三行、每行两三个词。

## 不适合

正文和需要马上读到的信息（要等几拍才出全）；没有节奏感的页面硬套会显得花哨，改用「标题逐行浮现」；一句话里只有数字在变，用「只动变了的那几个字」。

## 注意

渐变按整行算，不是每个词各给一段：每个词只露出自己在行里的那一截，相邻两个词的颜色才接得上。把 background-clip: text 直接放在行上时，带 transform 或 opacity 的子元素会掉出裁切、整个看不见，所以要么词不做位移和淡入，要么每个词各自裁切、背景位置按它在行里的偏移对齐。

## 要点

- 先写鼓点时间表（单位：拍），每个词对应一拍，换行处空一拍，6–8 个词控制在两小节内；画面只由当前时间算出来，重播就是把时间归零
- 渐变宽度取行宽的 3 倍，从暖色端（金黄、珊瑚）入场，到深色端（深紫、墨色）收尾；每一拍往前推一段，每段用先快后慢的缓动（如 1 − (1 − t)⁴），节奏才有呼吸感
- 词的入场：从下方约 0.45em、透明度 0 到位，时长取 0.42 秒和 0.9 拍里较短的那个，同样先快后慢
- 没有音频时按固定拍速（如 96、128 BPM）推算；有音频时以 audio.currentTime 为准，不用自己的计时器，拖动进度或卡顿后也能对上
- 节拍指示用 4 个点代表一小节，当前拍放大后衰减，第一拍换个颜色；它只是装饰，对读屏隐藏
- 标题是完整的真实文本；播完用 role="status" 播报一次，过程中不播报；提供重播，重播前取消上一轮
- 收尾的深色对页面底色至少 4.5:1；减少动态效果时直接显示全部文字和最终颜色

## 提示词

给{活动页}的{两三行标题}做「踩着节拍变色的标题」：先按{拍速}写出鼓点时间表（单位：拍），每个词踩一拍入场，换行处空一拍，整句在两小节内；入场从下方 0.45em、透明度 0 到位，约 0.4 秒，先快后慢。整行共用一条 3 倍行宽的渐变，从暖色（金黄、珊瑚）到深色（深紫、墨色）：每个词各自 background-clip: text，背景位置按词在行里的偏移对齐，只露出自己那一段，不要每个词一段完整渐变；每一拍把渐变往深色一端推一段，每段先快后慢，最后停在深色。画面只由当前时间计算：有音频时用 audio.currentTime，没有时按固定拍速；旁边放 4 个点的节拍指示（当前拍放大后衰减，对读屏隐藏）；提供重播，重播前取消上一轮；标题保持真实文本，播完用 role="status" 播报一次；减少动态效果时直接显示全部文字和最终颜色。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{display:grid;grid-template-rows:auto minmax(0,1fr) auto;padding:14px 18px;background:radial-gradient(90% 120% at 0% 0%,#fff3e2 0,#f6f1ea 60%);color:#2a2238}
.kk{margin:0;color:#6d6478;font-size:12px;letter-spacing:.08em;white-space:nowrap}
.tt{align-self:center;margin:0;font-size:min(11cqw,17cqh);line-height:1.2;font-weight:800;letter-spacing:.02em}
/* 一行一条很宽的渐变（3 倍行宽）：每个词只露出自己在行里的那一段，--sh 从 0 到 1 把暖色一端推到深色一端 */
.ln{--lw:300px;--sh:0;position:relative;display:block;width:fit-content}
.w{--x:0px;display:inline-block;color:#2a2238}
@supports ((-webkit-background-clip:text) or (background-clip:text)){.w{color:transparent;background:linear-gradient(90deg,#ffc15a 0%,#ff7a3d 15%,#f0386b 31%,#b0309e 46%,#5a2aa0 62%,#2a1c63 80%,#18122e 100%) 0 0/calc(var(--lw) * 3) 100% no-repeat;background-position:calc(-1 * (var(--x) + var(--sh) * var(--lw) * 2)) 0;-webkit-background-clip:text;background-clip:text}
}
.bar{display:flex;align-items:center;justify-content:space-between;gap:10px}
.beat{display:flex;align-items:center;gap:7px;min-width:0;color:#6d6478;font-size:12px;white-space:nowrap}
.beat i{width:7px;height:7px;border-radius:50%;background:#d9cfd9}
.beat i.on{background:#f0386b}
.beat i:first-child.on{background:#ff7a3d}
.btns{display:flex;gap:6px;flex:none}
@container (min-height:260px){.st{padding:20px 28px}
.kk,.beat{font-size:13px}
.beat i{width:9px;height:9px}
}
@container (max-width:270px){.beat b{display:none}
}
</style>

<div class="st"><p class="kk">周五夜场 · 22:00 开门</p><h3 class="tt"><span class="ln"><span class="w">今晚</span><span class="w">不想</span><span class="w">早睡，</span></span><span class="ln"><span class="w">跟着</span><span class="w">鼓点</span><span class="w">走</span></span></h3><div class="bar"><span class="beat" aria-hidden="true"><i></i><i></i><i></i><i></i><b>96 BPM</b></span><div class="btns"><button type="button" class="ctl">重播</button><button type="button" class="ctl">拍速 96</button></div></div><p class="sr" role="status"></p></div>

<script type="module">
// 鼓点时间表（单位：拍）：每个词踩一个鼓点入场，第 4 拍空一下换行，一共两小节 8 拍
const HITS = [0, 1, 2, 4, 5, 6], TOTAL = 8, TEMPOS = [96, 128];
const out = (k) => 1 - (1 - k) ** 4; // 先快后慢
const cl = (v) => Math.max(0, Math.min(1, v));
export default function demo(root) {
  const lines = [...root.querySelectorAll('.ln')], words = [...root.querySelectorAll('.w')], dots = [...root.querySelectorAll('.beat i')];
  const [re, tp] = root.querySelectorAll('.ctl'), label = root.querySelector('.beat b'), msg = root.querySelector('[role=status]');
  const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const first = lines.map((ln) => HITS[words.indexOf(ln.querySelector('.w'))]); // 每行第一个词踩在第几拍
  let bpm = TEMPOS[0], t0 = 0, raf = 0;
  // 渐变按行宽对齐：量一次行宽和每个词在行里的偏移，尺寸变了再量
  const measure = () => { for (const ln of lines) { ln.style.setProperty('--lw', ln.offsetWidth + 'px'); for (const w of ln.querySelectorAll('.w')) w.style.setProperty('--x', w.offsetLeft + 'px'); } };
  // 画面只由时间 t（秒）决定；有音频时把 t 换成 audio.currentTime，不用自己的计时器
  const render = (t) => {
    const spb = 60 / bpm, b = t / spb, enter = Math.min(0.42, spb * 0.9);
    words.forEach((w, i) => { const k = out(cl((t - HITS[i] * spb) / enter)); w.style.opacity = k; w.style.transform = k < 1 ? `translateY(${((1 - k) * 0.45).toFixed(3)}em)` : ''; });
    // 颜色每拍往前推一段，每一段先快后慢
    lines.forEach((ln, i) => { const n = b - first[i], span = TOTAL - first[i]; ln.style.setProperty('--sh', cl(n < 0 ? 0 : (Math.floor(n) + out(n % 1)) / span).toFixed(4)); });
    const on = b >= 0 && b < TOTAL ? Math.floor(b) % 4 : -1, pulse = b < TOTAL ? 1 + 0.7 * (1 - (b % 1)) ** 3 : 1;
    dots.forEach((d, i) => { d.classList.toggle('on', i === on); d.style.transform = i === on ? `scale(${pulse.toFixed(3)})` : ''; });
  };
  const play = () => {
    cancelAnimationFrame(raf); measure();
    if (still()) { render(1e6); msg.textContent = '已开启减少动态效果：直接显示最终颜色'; return; }
    t0 = performance.now();
    const end = TOTAL * 60 / bpm;
    const f = () => {
      if (!root.host.isConnected) return;
      const t = (performance.now() - t0) / 1000;
      render(Math.min(t, end));
      if (t < end) raf = requestAnimationFrame(f); else msg.textContent = `已播完 · ${bpm} BPM`;
    };
    render(0); raf = requestAnimationFrame(f);
  };
  re.addEventListener('click', play);
  tp.addEventListener('click', () => { bpm = TEMPOS[(TEMPOS.indexOf(bpm) + 1) % TEMPOS.length]; tp.textContent = '拍速 ' + bpm; label.textContent = bpm + ' BPM'; play(); });
  new ResizeObserver(measure).observe(root.querySelector('.tt'));
  play();
}
</script>
