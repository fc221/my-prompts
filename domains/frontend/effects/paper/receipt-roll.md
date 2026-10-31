---
zh: 收据一行行吐出
en: Receipt roll-out
order: 30
---

## 是什么

一笔记录完成后，一张收据从顶部的出纸口一行一行往下送出：整张早已排好版，出纸口挡住还没送出的部分，送完轻轻一晃停住，再亮起“保存图片”。

## 适合

旅行分账、点单完成、月度消费小结、积分兑换凭证这类已经发生、值得留存或分享的汇总。

## 不适合

还在保存、可能失败的记录先显示真实的保存状态，成功后再出票；实时变化的数据（行情、计时）不要用；只是让列表依次出现用「列表依次进入」。

## 注意

动的是整张排好版的纸：不要让纸的高度从 0 长出来，也不要一行行往里插 DOM；文字从头到尾不变形、不重排。

## 要点

- 收据先按真实数据完整排版、量出高度，放在出纸口下方的裁切窗里，从 translateY(-100%) 走到 0；离出口最近的一行最后露出
- 按行分段送纸：每行 80–130ms，其中前 70% 移动、后 30% 停顿，整张 1–1.6s；超过 14 行时后半段改成连续送出
- 出纸口固定不动，下沿压一条 6–10px 的渐变阴影；纸底做锯齿或波浪撕口
- 送完以纸的上沿为轴轻摆一次（±1.5° 以内、约 400ms）后停住，不来回晃
- 送纸期间“保存图片”禁用；完成后启用，导出时用同一份数据另画一张完整收据，不截当前可见区域；只是触发了下载就提示“已开始下载”，不说“已保存”
- 重播只重放动画，不重新提交记录；送完用 role="status" 播报合计；收据比窗口长时窗口可滚动
- 减少动态效果时跳过送纸和轻摆，直接显示完整收据和保存按钮

## 提示词

{产品}在{记录}保存成功后，用「收据一行行吐出」展示汇总：收据先按真实数据完整排版，放在顶部出纸口下方的裁切窗里，从 translateY(-100%) 按行分段送到 0，每行约 100ms（前 70% 移动、后 30% 停顿），整张不超过 1.6s，行数多时后半段连续送出；出纸口固定，下沿压一条渐变阴影，纸底做锯齿撕口；送完以上沿为轴轻摆一次（±1.5°，400ms）后停稳；送纸期间“保存图片”禁用，完成后启用，导出时用同一份数据画出完整收据，不截视口，触发下载后提示“已开始下载”；保存还没成功时显示真实的保存状态，不出票；重播只重放动画、不重复提交；送完用 role="status" 播报合计；收据比窗口长时窗口可滚动；减少动态效果时直接显示完整收据。

## 示例

<link rel="stylesheet" href="../../_shared/app-card-base.css">
<style>
.st{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px;padding:0 14px;background:linear-gradient(135deg,#efede8,#e3e0d9)}
.info{display:flex;flex-direction:column;justify-content:center;gap:2px;min-width:0}
.ok{display:inline-flex;align-items:center;gap:4px;align-self:flex-start;height:20px;padding:0 8px 0 6px;border-radius:10px;background:#dcf2e4;color:#1f7a45;font-size:11px;font-weight:600;white-space:nowrap}
.ok svg{width:12px;height:12px}
.tt{margin-top:6px;font-size:16px;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.info small{color:#6b665d;font-size:11.5px;line-height:1.4}
.acts{display:flex;flex-direction:column;align-items:flex-start;gap:6px;margin-top:10px}
.acts button{height:30px;padding:0 12px;font-size:12px;white-space:nowrap}
.sv{border:0;border-radius:8px;background:#23262d;color:#fff;font-weight:600}
.sv:disabled{background:#d6d6d2;color:#77746c;cursor:default}
.pr{position:relative;width:172px}
.slot{position:absolute;z-index:2;left:0;right:0;top:8px;height:16px;border-radius:8px;background:linear-gradient(#41444c,#24272d);box-shadow:0 3px 6px rgba(0,0,0,.18),inset 0 1px 0 rgba(255,255,255,.12)}
.slot::after{content:"";position:absolute;left:10px;right:10px;top:9px;height:3px;border-radius:2px;background:#0c0d10}
.lip{position:absolute;z-index:1;left:11px;right:11px;top:24px;height:8px;background:linear-gradient(rgba(40,30,20,.2),transparent);pointer-events:none}
.win{position:absolute;left:11px;right:11px;top:18px;bottom:0;overflow:hidden auto;scrollbar-width:none}
.paper{position:relative;margin-bottom:6px;padding:12px 10px 8px;background:#fffdf7;color:#2b2722;font-size:11px;line-height:1.45;font-variant-numeric:tabular-nums;filter:drop-shadow(0 2px 2px rgba(60,45,25,.14));transform-origin:50% 0}
.paper::after{content:"";position:absolute;left:0;right:0;bottom:-5px;height:5px;background:radial-gradient(circle at 4px 0,#fffdf7 4px,transparent 4.5px) 0 0/8px 5px repeat-x}
.r{display:flex;justify-content:space-between;gap:6px;white-space:nowrap}
.c{justify-content:center}
.b{font-size:12px;font-weight:700}
.m{color:#7a7368;font-size:10px}
.hr{height:9px;margin-top:4px;border-top:1px dashed #b9b2a6}
.bc{height:16px;margin:6px 6px 2px;background:repeating-linear-gradient(90deg,#2b2722 0 1px,transparent 1px 3px,#2b2722 3px 5px,transparent 5px 6px,#2b2722 6px 7px,transparent 7px 10px)}
@container (max-width:310px){.pr{width:156px}
}
@container (min-height:260px){.st{gap:28px;padding:0 32px}
.info small{font-size:13px}
.tt{font-size:22px}
.ok{height:24px;font-size:12px}
.acts{flex-direction:row;margin-top:16px}
.acts button{height:34px;padding:0 16px;font-size:13px}
.pr{width:236px}
.paper{padding:16px 16px 12px;font-size:13px}
.b{font-size:14px}
.m{font-size:11.5px}
}
</style>

<div class="st"><div class="info"><span class="ok"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 6.2 5 8.6l4.5-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>已结清</span><b class="tt">海岛三日</b><small>4 人 · 4 笔开销</small><small>10.03 – 10.05</small><div class="acts"><button type="button" class="sv" disabled>保存图片</button><button type="button" class="ctl re">重新出票</button></div></div><div class="pr"><i class="slot" aria-hidden="true"></i><div class="win"><div class="paper"><div class="r c b">海岛三日 · 分账单</div><div class="r c m">10.03 – 10.05 · 4 人</div><div class="r hr"></div><div class="r"><span>民宿两晚</span><span>¥1,280</span></div><div class="r"><span>环岛包车</span><span>¥460</span></div><div class="r"><span>海鲜晚餐</span><span>¥538</span></div><div class="r"><span>渡轮往返 ×4</span><span>¥140</span></div><div class="r hr"></div><div class="r b"><span>合计</span><span>¥2,418</span></div><div class="r"><span>人均</span><span>¥604.5</span></div><div class="r bc" aria-hidden="true"></div><div class="r c m">一起出发，下次见</div></div></div><i class="lip" aria-hidden="true"></i></div><p class="sr" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const paper = root.querySelector('.paper'), win = root.querySelector('.win'), sv = root.querySelector('.sv'), live = root.querySelector('[role=status]');
  const done = () => { sv.disabled = false; live.textContent = '分账单已出好：合计 ¥2,418，人均 ¥604.5'; };
  const play = () => {
    paper.getAnimations().forEach((a) => a.cancel());
    sv.disabled = true; win.scrollTop = 0; live.textContent = '正在出票';
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return done();
    // 整张纸已排好版：按每行的上沿分段往下送，离出口最近的一行最后露出
    const rows = [...paper.children], H = paper.offsetHeight + 6, m = rows.length;
    const v = [-H, ...rows.slice(1).map((r) => -r.offsetTop).reverse(), 0], kf = [], ty = (y) => `translateY(${y}px)`;
    v.forEach((y, k) => { if (k) kf.push({ transform: ty(y), offset: (k - 0.3) / m }); if (k < m) kf.push({ transform: ty(y), offset: k / m, easing: 'cubic-bezier(.3,0,.2,1)' }); });
    kf.push({ transform: ty(0), offset: 1 });
    const dur = m * 95;
    paper.animate(kf, { duration: dur, delay: 250, fill: 'backwards' });
    paper.animate([{ rotate: '0deg' }, { rotate: '1.4deg', offset: 0.35 }, { rotate: '-0.5deg', offset: 0.7 }, { rotate: '0deg' }], { duration: 420, delay: 250 + dur, easing: 'ease-out' }).onfinish = () => root.host.isConnected && done();
  };
  // 导出：用同一份数据另画一张完整收据，不截可见区域
  sv.addEventListener('click', () => {
    const rows = [...paper.children], W = 300, L = 24, c = document.createElement('canvas'), g = c.getContext('2d');
    const h = rows.reduce((s, r) => s + (r.classList.contains('hr') ? 14 : 24), 40);
    c.width = W * 2; c.height = h * 2; g.scale(2, 2);
    g.fillStyle = '#fffdf7'; g.fillRect(0, 0, W, h); g.fillStyle = '#2b2722'; g.strokeStyle = '#b9b2a6'; g.textBaseline = 'middle';
    let y = 20;
    for (const r of rows) {
      if (r.classList.contains('hr')) { g.setLineDash([4, 3]); g.beginPath(); g.moveTo(L, y + 7); g.lineTo(W - L, y + 7); g.stroke(); y += 14; continue; }
      g.font = (r.classList.contains('b') ? '700 15px' : '13px') + ' system-ui, sans-serif';
      const [a, b] = [...r.children].map((s) => s.textContent);
      if (b) { g.textAlign = 'left'; g.fillText(a, L, y + 12); g.textAlign = 'right'; g.fillText(b, W - L, y + 12); }
      else if (r.classList.contains('bc')) for (let x = L + 30, i = 0; x < W - L - 30; i++) { const w = [1, 2, 1, 3][i % 4]; g.fillRect(x, y + 4, w, 16); x += w + [2, 1, 3, 2][i % 4]; }
      else { g.textAlign = 'center'; g.fillText(r.textContent, W / 2, y + 12); }
      y += 24;
    }
    // 示例里只生成图片、不触发下载；真实产品在这里用 c.toBlob() 交给下载
    live.textContent = `已生成 ${c.width}×${c.height} 的分账单图片（示例不下载）`;
  });
  root.querySelector('.re').addEventListener('click', play);
  play();
}
</script>
