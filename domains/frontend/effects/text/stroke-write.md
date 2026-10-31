---
zh: 一笔笔写出来的字
en: Stroke drawing
order: 50
---

## 是什么

标志字或签名的线条像被笔一笔一笔写出来：每一笔从起点画到终点，按笔顺依次出现，写完再盖上一枚印章或浮出副标题。

## 适合

品牌标志、手写签名、两三个字的艺术字，用在开屏、首屏或“关于我们”页，只播一次。

## 不适合

正文和普通标题：把文字转成路径会失去可读性，也没法选中复制；手里只有字体、没有现成路径时，改用「由虚到实的标题」或「标题逐行浮现」。

## 注意

给字体轮廓描边只是描出字的外框，不是在写字；要做出“写出来”的效果，得用沿笔画中线画的路径，并按真实笔顺排好先后。

## 要点

- 每一笔是一条单独的 SVG path，线帽和转角用 round，路径的先后就是笔顺（如“山”：中竖、竖折、右竖）
- 用 getTotalLength() 量每笔长度，stroke-dasharray / stroke-dashoffset 从全长画到 0；圆线帽会在起点露出一个小圆点，起始偏移再多加半个线宽
- 每笔时长按长度算（约 2.5ms / 单位，最短 140ms），笔与笔之间停 60ms 左右，字与字之间停 150ms，整体 2 秒以内
- 写完后印章或副标题 200–300ms 淡入；只播一次，重播前先取消上一轮
- SVG 加 role="img" 和 aria-label 写出字的内容；书写过程不播报
- 减少动态效果时直接显示写完的样子

## 提示词

给{品牌标志字}做「一笔笔写出来的字」：用沿笔画中线绘制的 SVG 路径，每一笔一条 path，按真实笔顺排列，线帽和转角为 round；用 getTotalLength() 取每笔长度，通过 stroke-dashoffset 从全长画到 0，起始偏移多加半个线宽，避免起点露出圆点；每笔时长约 2.5ms × 长度（最短 140ms），笔间停 60ms，字间停 150ms，整体 2 秒以内，写完后{印章或副标题}淡入；只播一次；SVG 加 role="img" 和 aria-label；减少动态效果时直接显示写完的样子。

## 示例

<style>
:host{display:block;height:100%}
.st{position:relative;height:100%;overflow:hidden;container-type:size;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding-bottom:6px;background:radial-gradient(120% 90% at 50% 40%,#fbf7ee,#ece2cf);color:#24201b;font:13px/1.5 system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif}
.art{position:relative;width:190px}
.zi{display:block;width:100%;height:auto;overflow:visible}
.zi path{fill:none;stroke:#24201b;stroke-width:10;stroke-linecap:round;stroke-linejoin:round}
.seal{position:absolute;right:-30px;bottom:0;display:grid;place-items:center;width:28px;height:28px;border-radius:4px;background:#c63b2b;color:#fff6ea;font-size:10px;font-weight:700;line-height:1.05;writing-mode:vertical-rl;letter-spacing:.06em;transform:rotate(-4deg)}
.cap{margin:0;color:#5e5344;font-size:12px;letter-spacing:.04em}
.re{position:absolute;right:12px;top:12px}
@container (min-height:280px){.st{gap:14px}
.art{width:300px}
.zi path{stroke-width:9}
.seal{right:-48px;width:42px;height:42px;font-size:14px}
.cap{font-size:14px}
.re{right:20px;top:16px}
}
</style>

<div class="st"><div class="art"><svg class="zi" viewBox="0 0 240 120" role="img" aria-label="山川"><path d="M60 12C60.6 40 60.6 70 60 97"/><path d="M22 44L23 97H100"/><path d="M99 42L100 97"/><path d="M152 14C152 48 149 76 132 104"/><path d="M182 26L182 90"/><path d="M212 12L212 106"/></svg><span class="seal" aria-hidden="true">远行</span></div><p class="cap">山川徒步 · 2027 春季路线开放报名</p><button type="button" class="ctl re">重播</button></div>

<script type="module">
export default function demo(root) {
  const ps = [...root.querySelectorAll('.zi path')], seal = root.querySelector('.seal'), cap = root.querySelector('.cap');
  const play = () => {
    [...ps, seal, cap].forEach((el) => el.getAnimations().forEach((a) => a.cancel()));
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let t = 0;
    ps.forEach((p, i) => {
      // 每笔按长度算时长；起始偏移多加半个线宽，圆线帽不会在起点露出小圆点
      const len = p.getTotalLength(), dur = Math.max(140, len * 2.5);
      p.style.strokeDasharray = len + ' ' + (len + 12);
      p.animate([{ strokeDashoffset: len + 6 }, { strokeDashoffset: 0 }], { duration: dur, delay: t, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'backwards' });
      t += dur + (i === 2 ? 150 : 60); // 第 3 笔写完是“山”字结束，字间多停一下
    });
    seal.animate([{ opacity: 0, transform: 'rotate(-4deg) scale(1.4)' }, { opacity: 1, transform: 'rotate(-4deg) scale(1)' }], { duration: 220, delay: t, easing: 'cubic-bezier(.3,1.4,.5,1)', fill: 'backwards' });
    cap.animate([{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { duration: 300, delay: t + 100, fill: 'backwards' });
  };
  root.querySelector('.re').addEventListener('click', play);
  play();
}
</script>
