---
zh: 常用开源字体
en: Open-source typefaces
order: 65
---

## 是什么

AI 和模板默认的那几款字体人人都在用，页面一眼就眼熟。按用途备一份开源字体清单（都是 SIL OFL，可商用、可嵌入网页），每个用途给首选和替补，标题和正文各取一款搭配。示例按用途切换，并标出哪些字体本机没装、正在用后备字体显示。

## 适合

新项目定字体；给 AI 写提示词时直接点名字体；页面看着像模板，想先从标题字体换起。

## 不适合

判断一款字体属于哪类、什么气质看「按气质挑字体」；层级看「字号阶梯」「字重与层级」；中英文之间的空格和断行看「中英混排」。

## 注意

中文字体一套就有几 MB，网页上要按页面用到的字做子集，或者用 unicode-range 分包加载。后台和工具类产品，中文正文直接用系统的苹方、微软雅黑就够了，只给标题换字体。

## 要点

- 工具界面：IBM Plex Sans 配 IBM Plex Mono，替补 Geist 配 Geist Mono。中性，小字号清楚，同一家族自带等宽，数字和代码不用另找。
- 产品官网：标题 Bricolage Grotesque 或 Space Grotesk，正文 DM Sans 或 Public Sans。记忆点放在标题上，正文退后。
- 长文阅读：Literata 或 Source Serif 4，标题和正文都用它，靠字重拉开层级。这两款是为屏幕长读设计的衬线，小字也结实。
- 品牌和杂志感：标题 Instrument Serif 或 Fraunces，正文 Instrument Sans。高对比衬线只用在 32px 以上；Instrument Serif 只有常规体，靠字号撑场面。
- 亲和、面向大众：标题 Nunito，正文 Nunito Sans。圆头笔画显得友好，和同家族的正文配起来最省事。
- 中文：正文用思源黑体（Noto Sans SC）；内容类产品的正文可以换思源宋体（Noto Serif SC），想要手写和阅读感用霞鹜文楷；中文大标题可以用得意黑（Smiley Sans）。
- 一个页面最多两种字体家族，等宽另算。只选 2–3 个用得到的字重，自托管 woff2。
- 字体栈的写法：开源字体 → 度量接近的系统字体 → 中文系统字体 → 通用族。后备字体用 size-adjust 对齐度量，font-display: swap，这样加载前后版面不跳。

## 提示词

为{产品}定字体。用途是{工具界面 / 产品官网 / 长文内容 / 品牌杂志 / 亲和的大众产品}，界面语言是{中文 / 中英混排}。
1. 按用途从这份开源字体里挑（先用首选，不合适再换替补），标题、正文各一款，需要等宽时另加一款，并说明理由：
   - 工具界面：IBM Plex Sans + IBM Plex Mono（替补 Geist + Geist Mono）
   - 产品官网：标题 Bricolage Grotesque / Space Grotesk，正文 DM Sans / Public Sans
   - 长文：Literata / Source Serif 4
   - 品牌杂志：标题 Instrument Serif / Fraunces（只用 32px 以上），正文 Instrument Sans
   - 亲和：标题 Nunito，正文 Nunito Sans
   - 中文：正文思源黑体，内容类可换思源宋体或霞鹜文楷，大标题可用得意黑
2. 每款写完整字体栈：开源字体 → 度量接近的系统字体 → 苹方 / 微软雅黑或宋体 → 通用族。
3. 加载：自托管 woff2，只取用到的 2–3 个字重，font-display: swap，后备字体用 size-adjust 对齐度量；中文字体按页面用字做子集，后台类产品的中文正文直接用系统字体。
4. 用同一个标题加两段正文，在 1440 和 390 宽下和原来的字体截图对比，说明观感变在哪里。
全站最多两种字体家族（等宽另算），层级靠字号和字重拉开；只用 SIL OFL 或同等可商用、可嵌入网页许可的字体。

## 示例

<style>
.st{position:relative;height:100%;display:flex;flex-direction:column;gap:8px;padding:10px 14px 12px;background:#f4f2ee;color:#22201c;font:12px/1.4 system-ui,sans-serif}
button{font:inherit;color:inherit;cursor:pointer}
:focus-visible{outline:2px solid #c2410c;outline-offset:2px}
p,pre{margin:0}
.msg{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.chips{display:flex;gap:3px}
.chips button{flex:1 1 auto;min-width:0;height:26px;padding:0 4px;border:1px solid #dedad2;border-radius:13px;background:#fff;color:#57534c;white-space:nowrap}
.chips button:hover{border-color:#b9b3a8}
.chips [aria-pressed=true]{border-color:#22201c;background:#22201c;color:#fff;font-weight:600}
.card{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:4px;padding:10px 14px;border-radius:14px;background:#fff;box-shadow:0 0 0 1px rgba(34,32,28,.06),0 1px 2px rgba(34,32,28,.06)}
.nm{display:flex;align-items:flex-start;gap:6px;color:#8a847a;font-size:11px}
.nm span{min-width:0}
.nm b{color:#22201c;font-weight:600}
.tag{flex:none;margin-left:auto;padding:1px 6px;border-radius:8px;background:#f4f2ee;font-style:normal}
.tag.miss{background:#fdf0e6;color:#9a3412}
.hl{font-family:var(--fh);font-weight:var(--hw);font-size:21px;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bd{font-family:var(--fb);color:#3d3a35;font-size:12.5px;line-height:1.5;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden}
.bd .m{font-family:var(--fm);font-size:.95em}
.css{display:none;margin-top:6px;padding:8px 10px;border-radius:8px;background:#f4f2ee;color:#57534c;font:11px/1.5 ui-monospace,Menlo,Consolas,monospace;white-space:pre-wrap;user-select:all}
@container (min-height:260px){.st{gap:10px;padding:14px 18px}
.card{padding:14px 20px;gap:6px}
.nm{font-size:12px}
.hl{font-size:36px;line-height:1.15}
.bd{font-size:15px}
.css{display:block}
.msg{position:static;width:auto;height:auto;overflow:visible;clip-path:none;white-space:normal;color:#57534c}
}
</style>

<div class="st"><div class="chips" role="group" aria-label="用途"></div><div class="card"><p class="nm"><span></span><i class="tag"></i></p><p class="hl"></p><p class="bd"></p><pre class="css" aria-label="字体栈"></pre></div><p class="msg" role="status"></p></div>

<script type="module">
export default function demo(root) {
  const $ = (q) => root.querySelector(q);
  const SANS = 'system-ui, -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif';
  const SERIF = 'Georgia, "Songti SC", SimSun, serif';
  const MONO = 'ui-monospace, Menlo, Consolas, monospace';
  const S = [
    { k: '界面', h: 'IBM Plex Sans', hw: 600, b: 'IBM Plex Sans', m: 'IBM Plex Mono', fb: SANS, hl: 'Usage this week', bd: 'Requests <span class="m">1,284</span> · success <span class="m">99.2%</span> · p95 <span class="m">182 ms</span>', why: '中性、小字号清楚，同一家族自带等宽', alt: 'Geist + Geist Mono' },
    { k: '官网', h: 'Bricolage Grotesque', hw: 700, b: 'DM Sans', fb: SANS, hl: 'Ship the dull parts.', bd: 'Set it up once, then let the routine work run on its own.', why: '记忆点放在标题上，正文退后', alt: 'Space Grotesk + Public Sans' },
    { k: '长文', h: 'Literata', hw: 700, b: 'Literata', fb: SERIF, hl: 'Notes on slow reading', bd: 'A sturdy screen serif keeps long paragraphs easy on the eyes, even at small sizes.', why: '为屏幕长读设计，标题和正文同一家族、靠字重分层', alt: 'Source Serif 4' },
    { k: '杂志', h: 'Instrument Serif', hw: 400, hfb: SERIF, b: 'Instrument Sans', fb: SANS, hl: 'The long table, no. 07', bd: 'High-contrast titles at display sizes, plain sans for everything else.', why: '高对比衬线只用在大字号，正文用同源的无衬线', alt: '标题换 Fraunces' },
    { k: '亲和', h: 'Nunito', hw: 800, b: 'Nunito Sans', fb: SANS, hl: 'Plan a lighter week', bd: 'Rounded stroke ends feel friendly without looking childish.', why: '圆头笔画显得友好，配同家族的正文', alt: 'Manrope' },
    { k: '中文', h: 'Smiley Sans', hn: '得意黑', hw: 400, b: 'Noto Sans SC', bn: '思源黑体', fb: SANS, zh: true, hl: '把复杂的事讲简单', bd: '正文用思源黑体，小字号也清楚；后台类产品直接用系统的苹方、微软雅黑。', why: '标题有个性，正文稳', alt: '内容类正文换思源宋体或霞鹜文楷' },
  ];
  // 本机有没有装：同一串字分别用“字体 + 两种通用族”量宽，和只用通用族一样宽就是没装
  const cx = document.createElement('canvas').getContext('2d'), probe = 'mmwiOQ0汉字';
  const has = (f) => ['monospace', 'serif'].some((g) => { cx.font = `40px ${g}`; const a = cx.measureText(probe).width; cx.font = `40px "${f}", ${g}`; return cx.measureText(probe).width !== a; });
  const chips = $('.chips'), card = $('.card'), hl = $('.hl'), bd = $('.bd'), tag = $('.tag'), msg = $('.msg');
  chips.innerHTML = S.map((s, i) => `<button type="button" data-i="${i}" aria-pressed="false">${s.k}</button>`).join('');
  let cur = 0;
  const pick = (i, quiet) => {
    cur = i; const s = S[i];
    chips.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.i === i)));
    const fh = `"${s.h}", ${s.hfb || s.fb}`, fb = `"${s.b}", ${s.fb}`, fm = s.m ? `"${s.m}", ${MONO}` : '';
    card.style.setProperty('--fh', fh); card.style.setProperty('--fb', fb); card.style.setProperty('--fm', fm || 'inherit'); card.style.setProperty('--hw', s.hw);
    const name = (f, n) => `<b>${f}</b>${n ? `（${n}）` : ''}`;
    $('.nm span').innerHTML = s.h === s.b ? `标题正文 ${name(s.h)}${s.m ? ` · 等宽 ${name(s.m)}` : ''}` : `标题 ${name(s.h, s.hn)} · 正文 ${name(s.b, s.bn)}`;
    const miss = [...new Set([s.h, s.b, s.m].filter(Boolean))].filter((f) => !has(f));
    tag.textContent = miss.length ? '后备显示' : '本机已装'; tag.classList.toggle('miss', miss.length > 0);
    hl.lang = bd.lang = s.zh ? 'zh-CN' : 'en';
    hl.textContent = s.hl; bd.innerHTML = s.bd;
    $('.css').textContent = `--font-title: ${fh};\n--font-body: ${fb};${fm ? `\n--font-mono: ${fm};` : ''}`;
    if (!quiet) msg.textContent = `${s.k}：${s.why}。替补 ${s.alt}。${miss.length ? `本机没装 ${miss.join('、')}，现在用后备字体显示。` : ''}`;
  };
  chips.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) pick(+b.dataset.i); });
  chips.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault(); const n = (cur + (e.key === 'ArrowRight' ? 1 : S.length - 1)) % S.length;
    pick(n); chips.children[n].focus();
  });
  pick(0, true);
  // 自动把几种用途过一遍，最后停回第一个（减少动态效果时不轮播）
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let n = 1;
    const step = () => { if (!root.host.isConnected) return; pick(n % S.length, n < S.length); if (++n <= S.length) setTimeout(step, 420); };
    setTimeout(step, 400);
  }
}
</script>
