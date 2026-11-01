---
zh: 只动变了的那几个字
en: Changed-part transition
order: 90
---

## 是什么

一句带数据的文字更新时，只有真正变了的那部分在动：月份滑一下换成新月份，数字里变了的那几位上下翻过去，没变的字和数位纹丝不动。

## 适合

筛选结果摘要（“已选 N 项”）、看板标题里的月份和总数、购物车合计、预约人数这类一句话里局部刷新的文字。

## 不适合

整句意思都变了的文案直接替换，或用「多行标题换场」；页面首次加载的统计数字用「数字滚动计数」；每秒刷新多次的实时数据直接替换，不做动画。

## 注意

变量要和固定文案拆成各自的节点，更新时只碰有差异的那部分；连续快速更新时取消正在播的动画、以最新值为准，最后显示的一定是最新数据，不能排队慢慢追。

## 要点

- 固定文案（如“共接待”“位客人”）和变量（月份、数值）分开渲染，更新时固定节点保持原样、不重新挂载
- 数字按数位右对齐逐位比较，只有变了的位做翻动：旧数字移出、新数字移入，约 260ms；数值变大向上翻，变小向下翻
- 数字用等宽数字（tabular-nums）；位数增减时，新增或删掉的那一位宽度在 0 和一位宽之间过渡，不用固定宽度裁字
- 月份、单位这类词整体替换，新旧宽度不同就平滑过渡宽度
- 动画用的新旧副本对读屏隐藏，另放一份完整句子；更新停下 500ms 后用 role="status" 播报一次，不逐帧播报
- 减少动态效果时直接替换文字

## 提示词

给{看板标题}做「只动变了的那几个字」：把句子拆成固定文案和变量（{变量字段}），更新时固定文案不重新渲染；月份这类词整体滑动替换，宽度不同时平滑过渡；数字用 tabular-nums，按数位右对齐逐位比较，只有变化的位上下翻动（约 260ms，变大向上、变小向下），位数增减时那一位的宽度平滑展开或收起；连续更新时取消进行中的动画，以最新值为准；动画副本对读屏隐藏，另放完整句子，停止更新 500ms 后用 role="status" 播报一次；减少动态效果时直接替换。

## 示例

<style>
:host{display:block;height:100%}
.st{position:relative;height:100%;overflow:hidden;container-type:size;display:flex;flex-direction:column;padding:14px 16px 12px;background:#f6f7fb;color:#151a2d;font:13px/1.5 system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
:focus-visible{outline:2px solid #4f5bd5;outline-offset:2px}
.top{display:flex;align-items:center;justify-content:space-between;gap:8px}
.top small{color:#596079;font-size:12px}
.nv{display:flex;gap:6px}
.ar{display:grid;place-items:center;width:30px;height:30px;padding:0 0 2px;border:1px solid #dfe2ec;border-radius:9px;background:#fff;color:#151a2d;font:17px/1 system-ui;cursor:pointer}
.ar:hover{background:#eef0f7}
.ar:active{background:#e4e7f2}
.ln{margin:8px 0 0;color:#3a4160;font-size:16px;font-weight:600}
.big{margin:0;font-size:34px;line-height:1.2;font-weight:700;letter-spacing:-.01em;font-variant-numeric:tabular-nums}
.big small{margin-left:4px;color:#3a4160;font-size:15px;font-weight:600;letter-spacing:0}
.sl{position:relative;display:inline-block;overflow:hidden;vertical-align:bottom;white-space:pre}
.sl .o{position:absolute;left:0;top:0}
.bars{display:flex;align-items:flex-end;gap:6px;height:40px;margin-top:auto}
.bars i{flex:1;border-radius:4px 4px 2px 2px;background:#dde1f0;transition:background-color .2s}
.bars i.on{background:#4f5bd5}
@container (min-height:260px){.st{padding:22px 28px 20px}
.top small{font-size:13px}
.ar{width:36px;height:36px}
.ln{margin-top:16px;font-size:20px}
.big{font-size:60px}
.big small{font-size:20px;margin-left:8px}
.bars{gap:10px;height:96px}
}
</style>

<div class="st"><div class="top"><small>南山店 · 2027 年 · 接待人次</small><div class="nv"><button type="button" class="ar pv" aria-label="上个月">‹</button><button type="button" class="ar nx" aria-label="下个月">›</button></div></div><p class="ln" aria-hidden="true"><span class="sl mo">3 月</span>共接待</p><p class="big" aria-hidden="true"><span class="num"></span><small>位客人</small></p><div class="bars" aria-hidden="true"></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const M = [986, 1048, 1312, 1307, 1450, 2016]; // 1–6 月
  const mo = root.querySelector('.mo'), num = root.querySelector('.num'), bars = root.querySelector('.bars'), sr = root.querySelector('[role=status]');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fmt = (n) => n.toLocaleString('en-US');
  M.forEach((v) => { const b = document.createElement('i'); b.style.height = (v / Math.max(...M)) * 100 + '%'; bars.append(b); });
  // 一个格子换内容：旧的移出、新的移入，宽度在新旧之间过渡；再次更新时先取消，直接从最新目标开始
  const swap = (sl, ch, dir, done) => {
    sl.getAnimations({ subtree: true }).forEach((a) => a.cancel());
    const old = sl.dataset.v; sl.dataset.v = ch;
    if (still || old === ch) { sl.textContent = ch; if (done) done(); return; }
    sl.textContent = old; const w0 = sl.getBoundingClientRect().width;
    sl.textContent = ch; const w1 = sl.getBoundingClientRect().width;
    const o = document.createElement('span'), n = document.createElement('span');
    o.className = 'o'; o.textContent = old; n.textContent = ch || '​'; sl.replaceChildren(o, n);
    const opt = { duration: 260, easing: 'cubic-bezier(.2,0,0,1)' };
    o.animate([{ transform: 'none', opacity: 1 }, { transform: `translateY(${-dir * 100}%)`, opacity: 0 }], { ...opt, fill: 'forwards' });
    if (w0 !== w1) sl.animate([{ width: w0 + 'px' }, { width: w1 + 'px' }], opt);
    n.animate([{ transform: `translateY(${dir * 100}%)`, opacity: 0 }, { transform: 'none', opacity: 1 }], opt).onfinish = () => { sl.textContent = ch; if (done) done(); };
  };
  const cell = (ch) => { const s = document.createElement('span'); s.className = 'sl'; s.dataset.v = ch; s.textContent = ch; return s; };
  // 数字右对齐逐位比较，只翻变了的位；多出来的位从 0 宽展开，少掉的位收成 0 宽再删
  const setNum = (str, dir) => {
    [...num.children].forEach((s) => { if (s.dataset.v === '') s.remove(); });
    const cur = [...num.children];
    while (cur.length < str.length) { const s = cell(''); num.prepend(s); cur.unshift(s); }
    const pad = cur.length - str.length;
    cur.forEach((s, i) => { const ch = i < pad ? '' : str[i - pad]; if (s.dataset.v !== ch) swap(s, ch, dir, ch === '' ? () => s.remove() : null); });
  };
  let i = 2, tm = 0;
  const sentence = () => `${i + 1} 月共接待 ${fmt(M[i])} 位客人`;
  const go = (step) => {
    const prev = M[i]; i = (i + step + M.length) % M.length;
    swap(mo, `${i + 1} 月`, step);
    setNum(fmt(M[i]), M[i] >= prev ? 1 : -1);
    [...bars.children].forEach((b, k) => b.classList.toggle('on', k === i));
    clearTimeout(tm); tm = setTimeout(() => { sr.textContent = sentence(); }, 500); // 停下 500ms 再播报一次
  };
  num.append(...[...fmt(M[i])].map(cell));
  mo.dataset.v = mo.textContent;
  bars.children[i].classList.add('on');
  sr.textContent = sentence();
  root.querySelector('.pv').addEventListener('click', () => go(-1));
  root.querySelector('.nx').addEventListener('click', () => go(1));
  setTimeout(() => { if (root.host.isConnected) go(1); }, 500);
}
</script>
