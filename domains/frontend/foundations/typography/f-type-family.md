---
zh: 按气质挑字体
en: Choosing a typeface
order: 60
---

## 是什么

先分有无衬线，再看骨架：无衬线分几何、中性、人文三类，衬线看粗细对比，另有等宽；按要传达的气质和使用字号挑，一个页面最多两种字体家族。

## 适合

定品牌字体、Logo 和大标题字体，给官网或落地页搭标题与正文，给中文字体配西文。

## 不适合

层级不靠换字体拉开，看「字号阶梯」「字重与层级」；行距和行宽看「行高与行长」；中英文之间的空格和断行看「中英混排」；数字对齐看「数字与表格排版」；具体用哪几款开源字体、怎么搭配看「常用开源字体」。

## 注意

气质主要落在标题和 Logo 上：同一行字换一款字体，看起来就像换了一家公司。正文先保证好读，别让有个性的标题字体蔓延到正文、按钮和表格里。

## 要点

- 几何无衬线：O 接近正圆，骨架由圆和直线搭成，显得现代、干净、略冷，适合 Logo 和大标题；x 高度偏小、字形相似，长段小字不如人文无衬线好读
- 中性（新怪诞）无衬线：笔画均匀、开口收得紧、表情克制，几乎什么都能配，适合界面和信息密集的页面，缺点是没有记忆点
- 人文无衬线：骨架来自手写，笔画有轻微粗细、字怀开放，亲和又好认，适合正文和面向大众的产品
- 衬线先看粗细对比：高对比（细线极细）精致、时尚，只放在 28px 以上的标题；低对比衬线和粗衬线（Slab）笔画结实，小字也耐读，适合长文和带复古、工具感的品牌
- 等宽字体只给代码、命令和需要逐位对齐的编号、计时，不当作“科技感”的正文字体
- 辨认看三处：大写 O 圆不圆、小写 g 是单层还是双层、y 的尾巴是直线还是带弯钩；再看笔画末端是平切、斜切还是带衬线
- 中文按黑体 / 宋体 / 圆体选，配骨架相近的西文：黑体配中性或人文无衬线，宋体配衬线，圆体配圆头或几何无衬线；一个页面最多两种字体家族，层级用同一家族的字重和字号拉开

## 提示词

为{产品}挑字体，品牌气质是{3 个形容词}：先给出 2–3 个候选方向（从几何无衬线、中性无衬线、人文无衬线、高对比衬线、低对比或粗衬线里选），每个方向说明为什么贴合气质，并用同一句{品牌标语}各排一行标题对比；标题和 Logo 用最能体现气质的那款，正文用易读的中性或人文无衬线（或低对比衬线），一个页面最多两种字体家族，层级靠同一家族的字重和字号拉开；代码、编号和计时用等宽字体；中文按气质选黑体、宋体或圆体，并配骨架相近的西文；写出完整字体栈，用度量接近的系统字体兜底，字体加载前后版面不跳。

## 示例

<style>
.st{position:relative;height:100%;display:flex;flex-direction:column;gap:8px;padding:10px 14px 12px;background:#f4f2ee;color:#22201c;font:12px/1.4 system-ui,sans-serif}
button{font:inherit;color:inherit;cursor:pointer}
:focus-visible{outline:2px solid #c2410c;outline-offset:2px}
p,dl,dd{margin:0}
.msg{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.chips{display:flex;gap:3px}
.chips button{flex:1 1 auto;min-width:0;height:26px;padding:0 4px;border:1px solid #dedad2;border-radius:13px;background:#fff;color:#57534c;white-space:nowrap}
.chips button:hover{border-color:#b9b3a8}
.chips [aria-pressed=true]{border-color:#22201c;background:#22201c;color:#fff;font-weight:600}
.card{flex:1;min-height:0;display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:14px;background:#fff;box-shadow:0 0 0 1px rgba(34,32,28,.06),0 1px 2px rgba(34,32,28,.06)}
.spec{flex:1;min-width:0}
.kind{color:#8a847a;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.kind b{color:#c2410c;font-weight:600}
.hl{margin-top:2px;font-size:23px;line-height:1.15;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.zh{margin-top:3px;color:#57534c;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.zh i{margin-left:4px;padding:1px 6px;border-radius:8px;background:#f4f2ee;color:#8a847a;font:11px/16px system-ui,sans-serif;font-style:normal}
.use{display:none;margin-top:8px;color:#57534c}
.gl{flex:none;width:66px;height:58px}
.feat{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
.feat div{min-width:0;padding:4px 8px;border-radius:8px;background:#fff;box-shadow:0 0 0 1px rgba(34,32,28,.06)}
.feat dt{color:#c2410c;font-size:11px;font-weight:600}
.feat dd{color:#3d3a35;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
@container (min-height:260px){.st{gap:10px;padding:14px 18px}
.card{padding:14px 20px;gap:20px}
.hl{font-size:40px}
.zh{font-size:15px}
.use{display:block}
.gl{width:132px;height:104px}
.feat dt,.feat dd{font-size:12px}
.msg{position:static;width:auto;height:auto;overflow:visible;clip-path:none;color:#57534c}
}
</style>

<div class="st"><div class="chips" role="group" aria-label="字体气质"></div><div class="card"><div class="spec"><p class="kind"><b class="nm"></b> · <span class="mood"></span></p><p class="hl" lang="en">Foggy Oyster</p><p class="zh">雾湾生蚝馆<i class="pair"></i></p><p class="use"></p></div><canvas class="gl" aria-hidden="true"></canvas></div><dl class="feat"></dl><p class="msg" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const $ = (q) => root.querySelector(q);
  const HEI = 'system-ui,sans-serif', SONG = '"Songti SC",STSong,SimSun,serif';
  // 只用系统里常见的字体，后面都有通用族兜底
  const S = [
    { k: '几何', nm: '几何无衬线', mood: '现代、干净、略冷', f: 'Futura,"Century Gothic","Avenir Next",sans-serif', w: 500, zh: HEI, pair: '配黑体', use: '适合 Logo、大标题；长段小字不如人文无衬线好读', ft: [['O', '近正圆'], ['g', '单层'], ['末端', '平直、等粗']] },
    { k: '中性', nm: '中性无衬线', mood: '均匀、克制、百搭', f: '"Helvetica Neue",Helvetica,Arial,sans-serif', w: 600, zh: HEI, pair: '配黑体', use: '适合界面和信息密集的页面；放到标题上缺少记忆点', ft: [['O', '椭圆偏方'], ['g', '单层'], ['末端', '水平切']] },
    { k: '人文', nm: '人文无衬线', mood: '亲和、开放、好读', f: '"Gill Sans","Gill Sans MT",Seravek,Calibri,"Segoe UI",sans-serif', w: 500, zh: HEI, pair: '配黑体', use: '适合正文和面向大众的产品；小字也认得清', ft: [['O', '圆带粗细'], ['g', '常见双层'], ['末端', '斜切']] },
    { k: '衬线', nm: '高对比衬线', mood: '精致、时尚', f: 'Didot,"Bodoni 72","Bodoni MT","Times New Roman",serif', w: 400, zh: SONG, pair: '配宋体', use: '适合 28px 以上的大标题；细线在小字号会消失', ft: [['O', '竖轴、对比大'], ['g', '双层'], ['末端', '发丝衬线']] },
    { k: '粗衬线', nm: '粗衬线 Slab', mood: '结实、复古', f: 'Rockwell,"Rockwell Nova","American Typewriter",Georgia,serif', w: 700, zh: SONG, pair: '配粗宋', use: '适合有工具感、复古感的品牌和长文', ft: [['O', '粗细一致'], ['衬线', '和笔画等粗'], ['末端', '方块']] },
    { k: '等宽', nm: '等宽', mood: '工整、工具感', f: 'ui-monospace,Consolas,"Courier New",monospace', w: 500, zh: HEI, pair: '配黑体', use: '只给代码、命令和需要逐位对齐的数字', ft: [['宽度', '字母同宽'], ['i / m', '占同一格'], ['用途', '代码、编号']] },
  ];
  const chips = $('.chips'), hl = $('.hl'), zh = $('.zh'), cv = $('.gl'), msg = $('.msg');
  chips.innerHTML = S.map((s, i) => `<button type="button" data-i="${i}" aria-pressed="false">${s.k}</button>`).join('');
  let cur = 0;
  // 画大号的 O 和 g：O 外面套一个以字高为直径的虚线圆，看它圆不圆；虚线是基线，看 g 的尾巴
  const draw = () => {
    const s = S[cur], W = cv.clientWidth, H = cv.clientHeight, d = devicePixelRatio || 1;
    if (!W || !H) return;
    cv.width = W * d; cv.height = H * d;
    const c = cv.getContext('2d');
    c.setTransform(d, 0, 0, d, 0, 0); c.clearRect(0, 0, W, H);
    c.font = `${s.w} ${Math.round(H * 0.6)}px ${s.f}`;
    const mo = c.measureText('O'), mg = c.measureText('g'), base = Math.round(H * 0.7);
    const x = (W - mo.width - mg.width) / 2;
    const l = x - mo.actualBoundingBoxLeft, r = x + mo.actualBoundingBoxRight, t = base - mo.actualBoundingBoxAscent, b = base + mo.actualBoundingBoxDescent;
    c.strokeStyle = '#d6d1c7'; c.lineWidth = 1; c.setLineDash([3, 3]);
    c.beginPath(); c.moveTo(0, base + 0.5); c.lineTo(W, base + 0.5); c.stroke();
    c.fillStyle = '#22201c'; c.fillText('O', x, base); c.fillText('g', x + mo.width, base);
    c.strokeStyle = '#c2410c'; c.lineWidth = 1.2;
    c.beginPath(); c.arc((l + r) / 2, (t + b) / 2, (b - t) / 2, 0, Math.PI * 2); c.stroke();
  };
  const pick = (i, quiet) => {
    cur = i; const s = S[i];
    chips.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.i === i)));
    $('.nm').textContent = s.nm; $('.mood').textContent = s.mood; $('.pair').textContent = s.pair; $('.use').textContent = s.use;
    hl.style.fontFamily = s.f; hl.style.fontWeight = s.w;
    zh.style.fontFamily = s.zh; zh.style.fontWeight = s.w > 600 ? '600' : '400';
    $('.feat').innerHTML = s.ft.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('');
    draw();
    if (!quiet) msg.textContent = `${s.nm}：${s.ft.map(([a, b]) => a + ' ' + b).join('，')}。${s.use}`;
  };
  chips.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) pick(+b.dataset.i); });
  chips.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault(); const n = (cur + (e.key === 'ArrowRight' ? 1 : S.length - 1)) % S.length;
    pick(n); chips.children[n].focus();
  });
  new ResizeObserver(draw).observe(cv);
  pick(0, true);
  // 自动把几种字体过一遍，最后停回几何（减少动态效果时不轮播）
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let n = 1;
    const step = () => { if (!root.host.isConnected) return; pick(n % S.length, n < S.length); if (++n <= S.length) setTimeout(step, 380); };
    setTimeout(step, 400);
  }
}
</script>
