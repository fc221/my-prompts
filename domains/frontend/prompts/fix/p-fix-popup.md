---
zh: 优化弹窗质感
en: Plain popup
aka: 弹窗像白框盖上来
tab: 弹窗
order: 231
of: p-fix-motion
---

## 是什么

症状：App 或小程序里的弹窗、面板都是一个白框直接盖上来，内容一次全部出现，没有层次和质感。

## 要点

- 适合 App / 小程序里的详情面板、凭证、结果页、打卡面板。
- 普通确认、表单报错这类弹窗不要加戏，保持对话框即可。
- 每个面板只选一种打开方式，对应条目见交互板块「浮层面板」。

## 提示词

{产品}里的{面板名称}现在是一个白框直接盖上来，显得生硬。请按下面改，只改打开和收起的方式，内容不变：
1. 面板从它的来源长出来：从底部升起（translateY 100%→0，约 360ms 缓出），或从被点的卡片位置放大展开；关闭沿原路收回，退出比进入快约 30%。
2. 打开方式按内容选一种：带图的详情用“照片先铺满、面板再贴着图片下沿升起”；进度、打卡类用“面板落定后进度格或圆环再走到当前值，数字同步滚动”；凭证、票据用“先出摘要，再向下展开票根”或“点按翻面出示核销码”；背景有图时可以用磨砂玻璃面板。
3. 内容分两拍出现：先是面板和标题，100–150ms 后再是数字、进度这类需要被注意的元素；不要所有东西一起蹦出来。
4. 面板后面加 40% 左右的深色遮罩，点遮罩、下拉把手、按返回都能关；有未保存内容时先确认。
5. 面板顶部有把手或关闭按钮，高度不超过屏高 90%，内容多就在面板内滚动，底部留出安全区。
6. 只动 transform 和 opacity；开启减少动态效果时直接显示终态，数字直接显示结果。
这次的面板和内容：{面板里有什么}。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.fx{position:relative}
.ctl{position:absolute;top:5px;right:10px;height:22px;padding:0 8px;font-size:11px}
.c{padding:6px;display:flex;justify-content:center}
.ph{position:relative;width:96px;height:142px;border:2px solid #2b2f36;border-radius:10px;background:#f5f6f8;overflow:hidden;color:#1f2329;font-size:8px;line-height:11px}
.tb{height:16px;padding:0 6px;background:#fff;font-size:9px;line-height:16px;font-weight:600}
.cd{margin:6px;padding:6px;border-radius:5px;background:#fff}
.cd b{display:block;font-size:9px}
.cd span{color:#5b616e}
.cd .go{display:inline-block;margin-top:4px;padding:0 6px;border-radius:3px;background:#3b5bdb;color:#fff;line-height:14px}
.pn{position:absolute;padding:6px 8px;background:#fff}
.pn h5{margin:0;font-size:9px;line-height:12px}
.big{display:flex;align-items:baseline;gap:2px;margin-top:3px}
.big b{font-size:16px;line-height:18px;font-variant-numeric:tabular-nums}
.big span{color:#5b616e}
.bar{height:4px;margin-top:4px;border-radius:2px;background:#eef0f3;overflow:hidden}
.bar i{display:block;width:60%;height:100%;border-radius:2px;background:#3b5bdb}
.pn p{margin:4px 0 0;color:#5b616e}
/* 改前：白框凭空盖在屏幕中间，没有遮罩，标题、数字、进度一次全出现 */
.bad .pn{display:none;left:8px;right:8px;top:36px;border:1px solid #e3e6eb}
.bad .on .pn{display:block}
/* 改后：40% 遮罩，面板从底部升起（360ms 缓出），落定后数字滚动、进度条再走到当前值 */
.good .mk{position:absolute;inset:0;background:rgba(15,23,42,.4);opacity:0;transition:opacity .36s}
.good .on .mk{opacity:1}
.good .pn{left:0;right:0;bottom:0;padding-bottom:10px;border-radius:10px 10px 0 0;transform:translateY(100%);transition:transform .36s cubic-bezier(.2,.8,.2,1)}
.good .pn::before{content:"";display:block;width:18px;height:3px;margin:0 auto 5px;border-radius:2px;background:#d4d8df}
.good .on .pn{transform:none}
.good .big,.good .bar{opacity:0;transform:translateY(4px);transition:opacity .25s,transform .25s}
.good .two .big,.good .two .bar{opacity:1;transform:none}
.good .bar i{width:0;transition:width .5s cubic-bezier(.2,.8,.2,1)}
.good .two .bar i{width:60%}
.rst *{transition:none!important}
@media (prefers-reduced-motion:reduce){.good .mk,.good .pn,.good .big,.good .bar,.good .bar i{transition:none}}
</style>

<div class="fx">
  <section class="fx-p"><h4>改前</h4><div class="fx-b"><div class="fx-z c bad"><div class="ph"><div class="tb">打卡</div><div class="cd"><b>今日打卡</b><span>已连续 6 天</span><br><span class="go">查看进度</span></div><div class="pn"><h5>本月打卡</h5><div class="big"><b>18</b><span>/ 30 天</span></div><div class="bar"><i></i></div><p>再坚持 12 天拿满勋章</p></div></div></div></div></section>
  <section class="fx-p ok"><h4>改后</h4><div class="fx-b"><div class="fx-z c good"><div class="ph"><div class="tb">打卡</div><div class="cd"><b>今日打卡</b><span>已连续 6 天</span><br><span class="go">查看进度</span></div><div class="mk"></div><div class="pn"><h5>本月打卡</h5><div class="big"><b>0</b><span>/ 30 天</span></div><div class="bar"><i></i></div><p>再坚持 12 天拿满勋章</p></div></div></div></div></section>
  <button type="button" class="ctl">重播</button>
</div>

<script type="module">
export default function demo(root) {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const phs = [...root.querySelectorAll('.ph')], good = root.querySelector('.good .ph'), num = root.querySelector('.good .big b');
  let ts = [], raf = 0;
  const later = (fn, ms) => ts.push(setTimeout(() => { if (root.host.isConnected) fn(); }, ms));
  const count = () => {
    const t0 = performance.now();
    const step = (t) => {
      if (!root.host.isConnected) return;
      const k = Math.min(1, (t - t0) / 500);
      num.textContent = Math.round(18 * (1 - (1 - k) ** 2));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };
  const play = () => {
    ts.forEach(clearTimeout); ts = []; cancelAnimationFrame(raf);
    phs.forEach((p) => { p.classList.add('rst'); p.classList.remove('on', 'two'); void p.offsetHeight; p.classList.remove('rst'); });
    num.textContent = '0';
    if (still) { phs.forEach((p) => p.classList.add('on', 'two')); num.textContent = '18'; return; }
    later(() => phs.forEach((p) => p.classList.add('on')), 300);
    later(() => { good.classList.add('two'); count(); }, 780);
  };
  root.querySelector('.ctl').addEventListener('click', play);
  play();
}
</script>
