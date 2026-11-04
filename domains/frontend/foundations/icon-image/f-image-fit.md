---
zh: 图片缩放的四种规则
en: Image sizing rules
aka: object-fit cover contain 等比缩放 裁切 留白 瀑布流图片
order: 30
---

## 是什么

图片放进界面只有四种规则：定宽、定高、等比裁切或完整放入、框内完整加纯色留白。比例都不变，差别在谁决定尺寸、哪部分可以牺牲。

## 适合

列表、瀑布流、横向相册、logo 墙、商品图、文章头图，确定图片位时先选规则。

## 不适合

比例取值、加载占位和失败兜底看「图片比例与占位」；瀑布流的列布局看「瀑布流」。

## 注意

宽和高都写死又没写 object-fit，图片会被拉伸变形。框是固定的，就必须说清超出的部分是裁掉还是留白。

## 要点

- 定宽：宽度固定，高度 auto，跟着图片比例走。用于瀑布流、信息流、正文配图；提前按图片尺寸算好高度，加载时不跳动
- 定高：高度固定，宽度 auto。用于横向相册、logo 墙；logo 同高后再按视觉轻重微调，长条形的略缩小
- 等比裁切：框固定，object-fit: cover，铺满后裁掉多余部分。用于商品卡、封面、头像；主体靠边时用 object-position 保住
- 完整放入：框固定，object-fit: contain，整张可见，四周空出来。用于带文字的图、截图、图表、证件
- 纯色留白：框固定且图必须完整时，contain 再配纯色底。用于头图、海报位；底色取图片边缘的主色，或者页面底色
- 选规则的顺序：先问框是不是固定的；固定就问内容能不能裁，不固定就看是竖向列表还是横向排列

## 提示词

给{页面}的图片定缩放规则，图片位有{图片位，如瀑布流卡片、横向相册、封面、顶部头图}。按用途逐个选：瀑布流和信息流定宽，高度随比例，按接口返回的宽高提前占位；横向相册和 logo 墙定高，宽度随比例；能裁的图用 object-fit: cover，并给 object-position 保住主体；带文字、截图、图表用 contain；头图要完整时用 contain 加纯色底，底色取{图片主色 / 页面底色}。列出每个图片位用的规则和尺寸，最后确认没有图片被拉伸。

## 示例

<link rel="stylesheet" href="../../_shared/pick.css">
<style>
.x-w{--ctl:68px;width:100%;max-width:520px;display:flex;align-items:center;gap:10px;font-size:12px;line-height:16px}
.x-w button{border:0;background:none;color:inherit;font:inherit;cursor:pointer}
.x-w button:focus-visible,.x-strip:focus-visible{outline:2px solid #3b5bdb;outline-offset:1px}
.x-main{flex:1;min-width:0}
.x-ctl{flex:none;width:var(--ctl);display:flex;flex-direction:column;gap:5px}
.x-ctl p{margin:0;color:#5b616e;font-size:11px;line-height:14px}
.x-w .x-btn{height:28px;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 1px #d5d9e0;white-space:nowrap}
.x-w .x-btn:hover{background:#eef0f4}
.x-w .x-btn[aria-pressed=true]{background:#e3e9fd;color:#2f49b8;font-weight:600;box-shadow:inset 0 0 0 1px #3b5bdb}
.x-w svg{display:block}
.x-clip{height:104px;overflow:hidden;-webkit-mask-image:linear-gradient(#000 78%,transparent);mask-image:linear-gradient(#000 78%,transparent)}
.x-mas{display:flex;gap:6px}
.x-mc{flex:1;min-width:0;display:flex;flex-direction:column;gap:6px}
.x-mc svg{width:100%;height:auto;border-radius:4px}
.x-strip{display:flex;gap:6px;height:80px;overflow-x:auto;scrollbar-width:none;border-radius:4px}
.x-strip::-webkit-scrollbar{display:none}
.x-strip svg{flex:none;height:100%;width:auto;border-radius:4px}
.x-two{display:flex;gap:6px}
.x-two figure{flex:1;min-width:0;margin:0}
.x-two figcaption{margin-top:3px;color:#5b616e;font-size:11px;line-height:14px;text-align:center;white-space:nowrap}
.x-fr{aspect-ratio:16/9;overflow:hidden;border-radius:4px;background:var(--bg,#dfe2e8)}
.x-fr svg{width:100%;height:100%}
.x-hero{height:100px;aspect-ratio:auto}
@container (min-height:260px){
.x-w{--ctl:96px;gap:16px}
.x-clip{height:216px}
.x-strip{height:130px}
.x-ctl p{font-size:12px;line-height:16px}
.x-two{gap:10px}
.x-two figcaption{font-size:12px;margin-top:6px}
.x-hero{height:200px}
}
</style>

<script type="module">
import { pick } from '../../_shared/pick.ts';

// 用内联 SVG 当照片：preserveAspectRatio 的 slice 等于 cover，meet 等于 contain
const photo = (r, hue, mode = 'slice') => {
  const w = 300, h = Math.round(w / r);
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid ${mode}" aria-hidden="true"><rect width="${w}" height="${h}" fill="hsl(${hue} 70% 80%)"/><circle cx="${w * 0.74}" cy="${h * 0.26}" r="${Math.min(w, h) * 0.12}" fill="hsl(42 95% 66%)"/><path d="M0 ${h}V${h * 0.68}L${w * 0.3} ${h * 0.42}L${w * 0.54} ${h * 0.66}L${w * 0.74} ${h * 0.5}L${w} ${h * 0.72}V${h}Z" fill="hsl(${150 + (hue % 50)} 28% 44%)"/><path d="M0 ${h}V${h * 0.86}L${w * 0.45} ${h * 0.74}L${w} ${h * 0.9}V${h}Z" fill="hsl(${150 + (hue % 50)} 32% 31%)"/></svg>`;
};
const POOL = [[3 / 4, 205], [1, 28], [4 / 3, 262], [2 / 3, 165], [4 / 5, 340], [3 / 2, 50], [1, 190], [3 / 4, 300], [4 / 3, 120]];
const turn = (n, list) => list.map((_, i) => list[(i + n * 4) % list.length]);
const SRC = [['横图 3:2', 3 / 2], ['方图 1:1', 1], ['竖图 2:3', 2 / 3]];
const SWATCH = [['取自图片', 'hsl(205 70% 80%)'], ['白色', '#fff'], ['深色', '#1f2329']];
const ctl = (text, btn) => `<div class="x-ctl"><p class="x-tip">${text}</p>${btn}</div>`;

export default function demo(root) {
  pick(root, [
    {
      name: '定宽',
      fit: '瀑布流：列宽固定，高度随比例',
      html: `<div class="x-w"><div class="x-main x-clip" data-clip><div class="x-mas"></div></div>${ctl('三列同宽，高度各不相同', '<button type="button" class="x-btn">换一批</button>')}</div>`,
      init(el) {
        let n = 0;
        const paint = () => {
          const list = turn(n, POOL);
          el.querySelector('.x-mas').innerHTML = [0, 1, 2].map((c) => `<div class="x-mc">${list.filter((_, i) => i % 3 === c).map(([r, hue]) => photo(r, hue)).join('')}</div>`).join('');
        };
        el.querySelector('.x-btn').addEventListener('click', () => { n++; paint(); });
        paint();
      },
    },
    {
      name: '定高',
      fit: '横向相册、logo 墙：高度齐，宽度随比例',
      html: `<div class="x-w"><div class="x-main x-strip" tabindex="0" role="region" aria-label="横向相册，可滚动"></div>${ctl('一样高，宽度各不相同', '<button type="button" class="x-btn">换一批</button>')}</div>`,
      init(el) {
        let n = 0;
        const paint = () => { el.querySelector('.x-strip').innerHTML = turn(n, POOL).map(([r, hue]) => photo(r, hue)).join(''); };
        el.querySelector('.x-btn').addEventListener('click', () => { n++; paint(); });
        paint();
      },
    },
    {
      name: '裁切或放入',
      fit: '固定的框：要铺满就裁，要看全就放入',
      html: `<div class="x-w"><div class="x-main x-two"><figure><div class="x-fr x-a"></div><figcaption>等比裁切</figcaption></figure><figure><div class="x-fr x-b"></div><figcaption>完整放入</figcaption></figure></div>${ctl('', '<button type="button" class="x-btn">换张图</button>')}</div>`,
      init(el) {
        let n = 2;
        const paint = () => {
          const [label, r] = SRC[n];
          el.querySelector('.x-a').innerHTML = photo(r, 205);
          el.querySelector('.x-b').innerHTML = photo(r, 205, 'meet');
          el.querySelector('.x-tip').textContent = label;
        };
        el.querySelector('.x-btn').addEventListener('click', () => { n = (n + 1) % SRC.length; paint(); });
        paint();
      },
    },
    {
      name: '纯色留白',
      fit: '头图：图要完整，框用纯色补满',
      html: `<div class="x-w"><div class="x-main"><div class="x-fr x-hero">${photo(2 / 3, 205, 'meet')}</div></div><div class="x-ctl" role="group" aria-label="留白颜色">${SWATCH.map(([t, c], i) => `<button type="button" class="x-btn" data-c="${c}" aria-pressed="${!i}">${t}</button>`).join('')}</div></div>`,
      init(el) {
        const btns = [...el.querySelectorAll('[data-c]')], fr = el.querySelector('.x-fr');
        const go = (b) => {
          btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
          fr.style.setProperty('--bg', b.dataset.c);
        };
        btns.forEach((b) => b.addEventListener('click', () => go(b)));
        go(btns[0]);
      },
    },
  ], '缩放规则');
}
</script>
