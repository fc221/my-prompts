---
zh: 修复加载时的页面跳动
en: Layout shift
aka: 加载时页面跳动
order: 120
---

## 是什么

症状：图片、数据、字体加载完时内容突然下移，按钮在点之前跑走了。

## 要点

- 说明跳动发生在哪个区域、什么时候。
- 首屏、列表刷新、表格翻页都适用。

## 提示词

页面加载时内容跳动，请消除布局偏移：
1. 图片和视频写明 width / height 或 aspect-ratio，加载前显示同比例占位；头像、Logo 固定尺寸。
2. 骨架屏尺寸和真实内容一致（标题、文字行、图片区、表格列宽），加载完成直接替换，不改变高度。
3. 异步插入的内容（横幅、提示条、推荐位）预留空间，或从不推挤正文的位置出现（浮层、底部）。
4. 加载指示延迟 200–300ms 才出现，一旦出现至少保持 400ms，避免闪一下。
5. 刷新、翻页、筛选时保留旧数据并显示区域加载，不清空再填回。
6. 会变化的数字用等宽数字并预留宽度；按钮进入加载态时宽度不变。
7. 字体用 font-display: swap，并选尺寸接近的后备字体。
8. 首屏主图或主标题不做从透明开始的动画。
目标：布局偏移累计值 CLS ≤ 0.1。列出每处修改。

## 示例

<link rel="stylesheet" href="../../_shared/fix.css">
<style>
.fx{position:relative}
.ctl{position:absolute;top:5px;right:10px;height:22px;padding:0 8px;font-size:11px}
.c{padding:6px}
.pg{position:relative;height:100%;color:#1f2329;font-size:8px;line-height:11px}
.hd{font-size:9px;line-height:14px;font-weight:600}
.bn{overflow:hidden;padding:0 5px;border-radius:3px;background:#fff4e6;color:#b54708;font-size:7px;line-height:16px;white-space:nowrap}
.im{margin-top:4px;border-radius:4px;background:linear-gradient(135deg,#a5d8ff,#3b5bdb)}
.tt{margin-top:4px}
.nm{display:flex;align-items:center;gap:3px;color:#5b616e;white-space:nowrap}
.nm b{color:#1f2329;font-variant-numeric:tabular-nums}
.bt{display:inline-block;margin-top:4px;padding:0 8px;border-radius:3px;background:#3b5bdb;color:#fff;line-height:16px}
.gh{display:none;position:absolute;border:1px dashed #e03131;border-radius:3px;color:#e03131;font-size:7px;line-height:14px;text-align:center;white-space:nowrap}
/* 改前：横幅和图片没占位，数字宽度没预留，加载完把下面的内容往下推，按钮从虚线框的位置跑掉了 */
.bad .bn{height:0;transition:height .35s}
.bad .on .bn{height:16px}
.bad .im{height:0;transition:height .35s}
.bad .on .im{height:40px}
.bad .on .gh{display:block}
.good .gh{border-color:#1f9d61;color:#1f9d61}
.good .on .gh{display:block}
/* 改后：横幅位、图片位、数字位先用同尺寸骨架占好，加载完就地替换，按钮一直没动 */
.good .bn{height:16px;background:#f3f4f6;color:transparent;transition:background .2s,color .2s}
.good .on .bn{background:#fff4e6;color:#b54708}
.good .im{height:40px;background:#eef0f3}
.good .on .im{background:linear-gradient(135deg,#a5d8ff,#3b5bdb)}
.good .nm b{display:inline-block;min-width:28px;border-radius:2px}
.good .sk b{background:#eef0f3;color:transparent}
.rst *{transition:none!important}
@media (prefers-reduced-motion:reduce){.bad .bn,.bad .im,.good .bn{transition:none}}
</style>

<div class="fx">
  <section class="fx-p"><h4>改前</h4><div class="fx-b"><div class="fx-z c bad"><div class="pg"><div class="hd">会员详情</div><div class="bn">本月积分翻倍，兑换更划算</div><div class="im"></div><div class="tt">李雯 · 金卡会员</div><div class="nm">积分 <b>—</b><span>可兑换 3 件</span></div><span class="bt">去兑换</span><div class="gh">刚才在这</div></div></div></div></section>
  <section class="fx-p ok"><h4>改后</h4><div class="fx-b"><div class="fx-z c good"><div class="pg"><div class="hd">会员详情</div><div class="bn">本月积分翻倍，兑换更划算</div><div class="im"></div><div class="tt">李雯 · 金卡会员</div><div class="nm sk">积分 <b>—</b><span>可兑换 3 件</span></div><span class="bt">去兑换</span><div class="gh">一直在这</div></div></div></div></section>
  <button type="button" class="ctl">重播</button>
</div>

<script type="module">
export default function demo(root) {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pgs = [...root.querySelectorAll('.pg')], nums = [...root.querySelectorAll('.nm b')];
  const bts = [...root.querySelectorAll('.bt')], ghs = [...root.querySelectorAll('.gh')], skel = root.querySelector('.good .nm');
  let t = 0;
  const play = () => {
    clearTimeout(t);
    pgs.forEach((p) => { p.classList.add('rst'); p.classList.remove('on'); });
    nums.forEach((b) => { b.textContent = '—'; });
    skel.classList.add('sk');
    void bts[0].offsetHeight; // 先回到加载前的布局，再记下两边按钮当时的位置
    pgs.forEach((p) => p.classList.remove('rst'));
    ghs.forEach((g, i) => { const b = bts[i]; g.style.cssText = `top:${b.offsetTop}px;left:${b.offsetLeft}px;width:${b.offsetWidth}px;height:${b.offsetHeight}px`; });
    const load = () => {
      if (!root.host.isConnected) return;
      pgs.forEach((p) => p.classList.add('on'));
      nums.forEach((b) => { b.textContent = '12,480'; });
      skel.classList.remove('sk');
    };
    if (still) load(); else t = setTimeout(load, 500);
  };
  root.querySelector('.ctl').addEventListener('click', play);
  play();
}
</script>
