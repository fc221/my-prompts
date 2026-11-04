---
zh: 多行标题换场
en: Multi-line title change
order: 70
---

## 是什么

多行大标题换成下一条时，旧标题逐行下沉淡出，新标题再逐行从下方升起，每行都在自己的裁切框里移动。

## 适合

首屏轮播标题、专题 / 案例切换、引导页分步标题这类“同一位置轮换几条大标题”的场景。

## 不适合

只在首次进入时播一次的标题用“标题逐行浮现”；正文段落、表格数据、频繁刷新的数字不要逐行切换，直接替换或用数字滚动。

## 注意

和“标题逐行浮现”的区别：这里是同一位置换内容，要处理旧标题退场、动画中再次点击和读屏播报；首次显示不走切换动画。

## 要点

- 标题按行拆开，每行包一层 overflow: hidden 的裁切框，里层用 translateY(100%) 移动，文字不会越出自己的行。
- 退场：旧标题每行 translateY 0 → 100% 并淡出，180ms，ease-in，从第一行开始、行间错开 60ms。
- 入场：新标题每行从 translateY(100%) 升到原位，260ms，cubic-bezier(.2,0,0,1)，行间错开 60ms；3 行的总时长控制在 700ms 内。
- 动画中再次点击：立刻结束当前切换，直接换成目标标题并只播入场，不排队、不叠加。
- 配上一条 / 下一条按钮和分页点（当前点拉长成胶囊），首尾循环；编号用等宽数字。
- 可见标题不加 aria-live；另放一个读屏可见的 role="status"，切换完成后播报一次“第 N 条，共 M 条”和完整标题。
- 减少动态效果时整块标题 150ms 淡出再淡入，不做位移。

## 提示词

给{首屏轮播标题}做「多行标题换场」：标题按行拆开，每行包一层 overflow: hidden 的裁切框；切换时旧标题每行依次下沉淡出（translateY 0 → 100%，180ms，ease-in，行间错开 60ms），然后新标题每行从下方依次升起（260ms，cubic-bezier(.2,0,0,1)，错开 60ms），总时长不超过 700ms；配上一条 / 下一条按钮和{条数}个分页点，当前点拉长，首尾循环；动画中再次点击时立刻结束当前切换，直接换成目标标题并只播入场；可见标题不加 aria-live，另用一个 role="status" 在切换完成后播报一次新标题全文；首次显示不走切换动画；减少动态效果时整块标题 150ms 淡出再淡入，不做位移。

## 示例

<link rel="stylesheet" href="../../_shared/app-scroll-base.css">
<style>
.st{display:flex;flex-direction:column;justify-content:space-between;padding:16px 18px 14px;background:#faf7f2}
.blob{position:absolute;right:-56px;top:-56px;width:170px;height:170px;border-radius:50%;background:conic-gradient(#ffd8a8,#fcc2d7,#a5d8ff,#b2f2bb,#ffd8a8);opacity:.5;transition:transform .6s cubic-bezier(.2,0,0,1)}
.kk{position:relative;display:flex;align-items:center;gap:8px;margin:0;color:#8a6d3b;font-size:12px;letter-spacing:.04em}
.no{color:#1c1b1a;font-weight:600;font-variant-numeric:tabular-nums}
.tt{position:relative;margin:0;color:#1c1b1a;font-size:24px;font-weight:700;line-height:1.22}
.ln{display:block;overflow:hidden}
.in{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ft{position:relative;display:flex;align-items:center;justify-content:space-between;gap:8px}
.dots{display:flex;margin-left:-9px}
.dot{display:grid;place-items:center;width:24px;height:24px;padding:0;border:0;background:none}
.dot::after{content:"";width:6px;height:6px;border-radius:3px;background:#d6cfc4;transition:width .24s,background .24s}
.dot[aria-current=true]::after{width:18px;background:#1c1b1a}
.arw{display:flex;gap:8px}
.ar{display:grid;place-items:center;width:32px;height:32px;padding:0 0 2px;border:1px solid #e4ddd2;border-radius:50%;background:#fff;color:#1c1b1a;font-size:18px;line-height:1}
.ar:active{background:#f3eee6}
@container (min-height:260px){.st{padding:28px 36px 24px}
.tt{font-size:40px;line-height:1.16}
.kk{font-size:13px}
.blob{right:-60px;top:-90px;width:300px;height:300px}
}
</style>

<div class="st"><i class="blob" aria-hidden="true"></i><p class="kk"><span>城市漫步</span><b class="no">01 / 04</b></p><h3 class="tt"></h3><div class="ft"><div class="dots"></div><div class="arw"><button type="button" class="ar pv" aria-label="上一条">‹</button><button type="button" class="ar nx" aria-label="下一条">›</button></div></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const T = [['沿着旧城墙', '走完一个', '安静的下午'], ['十二家小店', '撑起一条', '老街的早晨'], ['把周末交给', '山脚下的', '一片茶园'], ['夜市收摊后', '我们聊起了', '各自的家乡']];
  const tt = root.querySelector('.tt'), no = root.querySelector('.no'), dots = root.querySelector('.dots'), msg = root.querySelector('[role=status]'), blob = root.querySelector('.blob');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cur = 0, busy = false, seq = 0;
  T.forEach((_, i) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'dot'; b.setAttribute('aria-label', `第 ${i + 1} 条`); b.addEventListener('click', () => go(i)); dots.append(b); });
  const render = (i) => {
    tt.innerHTML = T[i].map((l) => `<span class="ln"><span class="in">${l}</span></span>`).join('');
    no.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(T.length).padStart(2, '0');
    [...dots.children].forEach((d, k) => d.setAttribute('aria-current', String(k === i)));
    blob.style.transform = `rotate(${i * 90}deg)`;
  };
  // 每行一个动画，按行错开；被取消时 finished 会 reject，这里吞掉
  const play = (els, kf, dur, ease) => Promise.all(els.map((el, k) => el.animate(kf, { duration: dur, delay: still ? 0 : k * 60, easing: ease, fill: 'both' }).finished)).catch(() => {});
  const stop = () => tt.getAnimations({ subtree: true }).forEach((a) => a.cancel());
  const go = async (i) => {
    i = (i + T.length) % T.length;
    if (i === cur) return;
    const my = ++seq, skipOut = busy;
    cur = i; busy = true; stop();
    // 动画中再次点击：跳过退场，直接换成目标标题只播入场
    if (!skipOut) await (still ? play([tt], [{ opacity: 1 }, { opacity: 0 }], 150, 'linear') : play([...tt.querySelectorAll('.in')], [{ transform: 'none', opacity: 1 }, { transform: 'translateY(100%)', opacity: 0 }], 180, 'cubic-bezier(.4,0,1,1)'));
    if (my !== seq) return;
    render(i);
    await (still ? play([tt], [{ opacity: 0 }, { opacity: 1 }], 150, 'linear') : play([...tt.querySelectorAll('.in')], [{ transform: 'translateY(100%)', opacity: 0 }, { transform: 'none', opacity: 1 }], 260, 'cubic-bezier(.2,0,0,1)'));
    if (my !== seq) return;
    stop(); busy = false;
    msg.textContent = `第 ${i + 1} 条，共 ${T.length} 条：${T[i].join('')}`;
  };
  root.querySelector('.pv').addEventListener('click', () => go(cur - 1));
  root.querySelector('.nx').addEventListener('click', () => go(cur + 1));
  render(0);
  // 缩略图：自动切到第 2 条
  setTimeout(() => go(1), 400);
}
</script>
